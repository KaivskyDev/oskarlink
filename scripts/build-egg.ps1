$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $PSCommandPath)
$configPath = Join-Path $root "config/application.example.yml"
$outDir = Join-Path $root "pterodactyl"
$outPath = Join-Path $outDir "egg-oskarlink.json"

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$application = (Get-Content -Raw -Path $configPath).TrimEnd()

$installScript = @"
#!/bin/bash
set -euo pipefail

printf '%s\n' '[OskarLink] Installing packages'
apt-get update -qq >/dev/null
apt-get install -y -qq curl ca-certificates >/dev/null

cd /mnt/server
mkdir -p plugins logs bin

if [ "`${CLEAN_PLUGIN_JARS:-true}" = 'true' ]; then
  printf '%s\n' '[OskarLink] Cleaning stale plugin jars'
  find ./plugins -maxdepth 1 -type f -name '*.jar' -delete
fi

version="`${LAVALINK_VERSION:-4.2.2}"
if [ -n "`${OSKARLINK_JAR_URL:-}" ]; then
  lavalink_url="`${OSKARLINK_JAR_URL}"
elif [ "`$version" = 'latest' ]; then
  lavalink_url='https://github.com/lavalink-devs/Lavalink/releases/latest/download/Lavalink.jar'
else
  lavalink_url="https://github.com/lavalink-devs/Lavalink/releases/download/`${version}/Lavalink.jar"
fi

printf '%s\n' "[OskarLink] Downloading Lavalink core (`${version})"
curl -fL --retry 5 --retry-delay 2 "`$lavalink_url" -o OskarLink.jar

arch="`$(uname -m)"
case "`$arch" in
  x86_64|amd64) ytdlp_asset='yt-dlp_linux' ;;
  aarch64|arm64) ytdlp_asset='yt-dlp_linux_aarch64' ;;
  *) ytdlp_asset='yt-dlp' ;;
esac

printf '%s\n' '[OskarLink] Installing yt-dlp helper'
curl -fL --retry 5 --retry-delay 2 "https://github.com/yt-dlp/yt-dlp/releases/latest/download/`${ytdlp_asset}" -o ./bin/yt-dlp
chmod +x ./bin/yt-dlp

if [ ! -f application.yml ]; then
  if [ -n "`${OSKARLINK_CONFIG_URL:-}" ]; then
    printf '%s\n' '[OskarLink] Downloading application.yml from OSKARLINK_CONFIG_URL'
    curl -fL --retry 5 --retry-delay 2 "`${OSKARLINK_CONFIG_URL}" -o application.yml
  elif [ -n "`${OSKARLINK_RAW_BASE_URL:-}" ]; then
    printf '%s\n' '[OskarLink] Downloading application.yml from OSKARLINK_RAW_BASE_URL'
    curl -fL --retry 5 --retry-delay 2 "`${OSKARLINK_RAW_BASE_URL%/}/config/application.example.yml" -o application.yml
  else
    printf '%s\n' '[OskarLink] Writing embedded application.yml'
    cat > application.yml <<'YAML'
$application
YAML
  fi
else
  printf '%s\n' '[OskarLink] Keeping existing application.yml'
fi

printf '%s\n' '[OskarLink] Installation completed'
"@

function New-VariableDef {
  param(
    [string]$Name,
    [string]$Description,
    [string]$Env,
    [string]$Default = "",
    [bool]$Viewable = $true,
    [string]$Rules = "nullable|string|max:4096",
    [string]$Type = "text"
  )

  [ordered]@{
    name = $Name
    description = $Description
    env_variable = $Env
    default_value = $Default
    user_viewable = $Viewable
    user_editable = $true
    rules = $Rules
    field_type = $Type
  }
}

$variables = @(
  New-VariableDef "Lavalink Version" "Pinned Lavalink release tag. Use latest only after testing plugin compatibility." "LAVALINK_VERSION" "4.2.2" $true "required|string|max:32"
  New-VariableDef "OskarLink Raw Base URL" "Optional raw GitHub base URL, for example https://raw.githubusercontent.com/user/OskarLink/main." "OSKARLINK_RAW_BASE_URL" "" $true "nullable|string|max:512"
  New-VariableDef "OskarLink Config URL" "Optional direct URL to application.yml. Overrides OSKARLINK_RAW_BASE_URL." "OSKARLINK_CONFIG_URL" "" $true "nullable|string|max:512"
  New-VariableDef "OskarLink Jar URL" "Optional direct custom jar URL. Leave empty to download Lavalink release." "OSKARLINK_JAR_URL" "" $true "nullable|string|max:512"
  New-VariableDef "Clean Plugin Jars" "Deletes stale plugin jars during install." "CLEAN_PLUGIN_JARS" "true" $true "required|string|in:true,false"
  New-VariableDef "Lavalink Password" "Authorization password used by your bot client." "LAVALINK_PASSWORD" "youshallnotpass" $false "required|string|max:256"
  New-VariableDef "Music Country" "Country code used by source APIs." "MUSIC_COUNTRY" "US" $true "required|string|size:2"
  New-VariableDef "Enable HTTP Source" "Allows direct HTTP audio URLs." "ENABLE_HTTP_SOURCE" "true" $true "required|string|in:true,false"
  New-VariableDef "Enable Local Source" "Allows local file playback." "ENABLE_LOCAL_SOURCE" "false" $true "required|string|in:true,false"
  New-VariableDef "Enable Spotify" "Enables Spotify through LavaSrc." "ENABLE_SPOTIFY" "false" $true "required|string|in:true,false"
  New-VariableDef "Spotify Client ID" "Spotify client ID." "SPOTIFY_CLIENT_ID"
  New-VariableDef "Spotify Client Secret" "Spotify client secret." "SPOTIFY_CLIENT_SECRET" "" $false
  New-VariableDef "Spotify sp_dc" "Spotify sp_dc cookie. Use a separate account." "SPOTIFY_SP_DC" "" $false "nullable|string|max:4096" "textarea"
  New-VariableDef "Spotify Custom Token Endpoint" "Optional Spotify anonymous token endpoint." "SPOTIFY_CUSTOM_TOKEN_ENDPOINT"
  New-VariableDef "Enable Apple Music" "Enables Apple Music through LavaSrc." "ENABLE_APPLE_MUSIC" "false" $true "required|string|in:true,false"
  New-VariableDef "Apple Music Token" "Apple Music media API token." "APPLE_MUSIC_TOKEN" "" $false "nullable|string|max:8192" "textarea"
  New-VariableDef "Enable Deezer" "Enables Deezer. Requires master key and ARL." "ENABLE_DEEZER" "false" $true "required|string|in:true,false"
  New-VariableDef "Deezer Master Key" "Deezer master decryption key." "DEEZER_MASTER_KEY" "" $false
  New-VariableDef "Deezer ARL" "Deezer ARL cookie." "DEEZER_ARL" "" $false "nullable|string|max:4096" "textarea"
  New-VariableDef "Enable Yandex Music" "Enables Yandex Music." "ENABLE_YANDEX_MUSIC" "false" $true "required|string|in:true,false"
  New-VariableDef "Yandex Access Token" "Yandex Music access token." "YANDEX_ACCESS_TOKEN" "" $false "nullable|string|max:4096" "textarea"
  New-VariableDef "Enable VK Music" "Enables VK Music." "ENABLE_VK_MUSIC" "false" $true "required|string|in:true,false"
  New-VariableDef "VK User Token" "VK user token. Use a separate account." "VK_USER_TOKEN" "" $false "nullable|string|max:8192" "textarea"
  New-VariableDef "Enable Tidal" "Enables Tidal through LavaSrc." "ENABLE_TIDAL" "false" $true "required|string|in:true,false"
  New-VariableDef "Tidal Token" "Tidal token." "TIDAL_TOKEN" "" $false "nullable|string|max:4096" "textarea"
  New-VariableDef "Enable Qobuz" "Enables Qobuz." "ENABLE_QOBUZ" "false" $true "required|string|in:true,false"
  New-VariableDef "Qobuz OAuth Token" "Qobuz x-user-auth-token." "QOBUZ_USER_OAUTH_TOKEN" "" $false "nullable|string|max:4096" "textarea"
  New-VariableDef "Enable JioSaavn" "Enables JioSaavn. Requires secret." "ENABLE_JIOSAAVN" "false" $true "required|string|in:true,false"
  New-VariableDef "JioSaavn Secret" "JioSaavn decryption secret." "JIOSAAVN_SECRET" "" $false
  New-VariableDef "Enable Flowery TTS" "Enables Flowery TTS." "ENABLE_FLOWERY_TTS" "true" $true "required|string|in:true,false"
  New-VariableDef "YouTube OAuth Enabled" "Enables youtube-source OAuth." "YOUTUBE_OAUTH_ENABLED" "false" $true "required|string|in:true,false"
  New-VariableDef "YouTube OAuth Refresh Token" "youtube-source refresh token." "YOUTUBE_OAUTH_REFRESH_TOKEN" "" $false "nullable|string|max:4096" "textarea"
  New-VariableDef "YouTube PoToken" "Optional YouTube poToken." "YOUTUBE_POT_TOKEN" "" $false "nullable|string|max:4096" "textarea"
  New-VariableDef "YouTube Visitor Data" "Required when using poToken." "YOUTUBE_VISITOR_DATA" "" $false "nullable|string|max:4096" "textarea"
  New-VariableDef "Enable Jellylink" "Enables Jellyfin source through Jellylink." "ENABLE_JELLYLINK" "false" $true "required|string|in:true,false"
  New-VariableDef "Jellyfin Server" "Jellyfin server URL." "JELLYFIN_SERVER"
  New-VariableDef "Jellyfin Username" "Jellyfin username." "JELLYFIN_USERNAME"
  New-VariableDef "Jellyfin Password" "Jellyfin password." "JELLYFIN_PASSWORD" "" $false
  New-VariableDef "Enable Discovery Go" "Enables SoundCloud Go+ support." "ENABLE_DISCOVERY_GO" "false" $true "required|string|in:true,false"
  New-VariableDef "SoundCloud OAuth Token" "SoundCloud OAuth token for discovery-go." "SOUNDCLOUD_OAUTH_TOKEN" "" $false "nullable|string|max:4096" "textarea"
  New-VariableDef "Enable Lavabili" "Enables Bilibili support." "ENABLE_LAVABILI" "true" $true "required|string|in:true,false"
  New-VariableDef "Enable Bilibili Auth" "Enables authenticated Bilibili mode." "BILIBILI_AUTH_ENABLED" "false" $true "required|string|in:true,false"
  New-VariableDef "Bilibili SESSDATA" "Bilibili SESSDATA cookie." "BILIBILI_SESSDATA" "" $false "nullable|string|max:4096" "textarea"
  New-VariableDef "Bilibili bili_jct" "Bilibili bili_jct cookie." "BILIBILI_BILI_JCT" "" $false
  New-VariableDef "Bilibili buvid3" "Bilibili buvid3 cookie." "BILIBILI_BUVID3" "" $false
  New-VariableDef "Enable Prometheus" "Enables Prometheus metrics endpoint." "ENABLE_PROMETHEUS" "true" $true "required|string|in:true,false"
  New-VariableDef "Sentry DSN" "Optional Sentry DSN." "SENTRY_DSN" "" $false
  New-VariableDef "Sentry Environment" "Sentry environment label." "SENTRY_ENVIRONMENT" "production"
)

$egg = [ordered]@{
  _comment = "Custom Pterodactyl egg for OskarLink. Generated from upload-to-github/OskarLink."
  meta = [ordered]@{
    version = "PTDL_v2"
    update_url = $null
  }
  exported_at = (Get-Date -Format "yyyy-MM-ddTHH:mm:sszzz")
  name = "OskarLink"
  author = "Oskar Trzaskawka"
  description = "OskarLink is a private Lavalink-compatible audio node distribution by Oskar Trzaskawka with a pinned, conflict-aware plugin stack and broad yt-dlp source coverage."
  features = @()
  docker_images = [ordered]@{
    "ghcr.io/parkervcp/yolks:java_21" = "ghcr.io/parkervcp/yolks:java_21"
    "ghcr.io/parkervcp/yolks:java_17" = "ghcr.io/parkervcp/yolks:java_17"
    "ghcr.io/parkervcp/yolks:java_25" = "ghcr.io/parkervcp/yolks:java_25"
  }
  file_denylist = @()
  startup = "java -XX:MaxRAMPercentage=95.0 -XX:InitialRAMPercentage=25.0 -jar OskarLink.jar --server.port={{SERVER_PORT}} --lavalink.server.password={{LAVALINK_PASSWORD}}"
  config = [ordered]@{
    files = "{`n  `"application.yml`": {`n    `"parser`": `"yml`"`n  }`n}"
    startup = "{`n  `"done`": `"Lavalink is ready to accept connections.`"`n}"
    logs = "{`n  `"location`": `"logs/`"`n}"
    stop = "^^C"
  }
  scripts = [ordered]@{
    installation = [ordered]@{
      script = $installScript
      container = "ghcr.io/parkervcp/installers:debian"
      entrypoint = "bash"
    }
  }
  variables = $variables
}

$json = $egg | ConvertTo-Json -Depth 20
Set-Content -Path $outPath -Value $json -Encoding UTF8
Copy-Item -Path $outPath -Destination (Join-Path (Split-Path -Parent $root) "..\egg-oskarlink.json") -Force
"Wrote $outPath"

