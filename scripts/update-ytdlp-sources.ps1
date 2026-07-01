$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $PSCommandPath)
$docs = Join-Path $root "docs"
$target = Join-Path $docs "SOURCES.md"
$url = "https://raw.githubusercontent.com/yt-dlp/yt-dlp/master/supportedsites.md"

New-Item -ItemType Directory -Force -Path $docs | Out-Null

$content = (Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 30).Content
$extractors = [regex]::Matches($content, '\*\*([^*]+)\*\*') | ForEach-Object {
  $_.Groups[1].Value.Trim()
} | Where-Object {
  $_ -and $_ -notmatch 'Currently broken'
} | Select-Object -Unique

$sample = $extractors | Select-Object -First 300

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("# Sources")
$lines.Add("")
$lines.Add("Generated from yt-dlp supported sites on $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz').")
$lines.Add("")
$lines.Add("yt-dlp extractor count: $($extractors.Count)")
$lines.Add("")
$lines.Add("## Native And Plugin Sources")
$lines.Add("")
$lines.Add("- YouTube")
$lines.Add("- YouTube Music")
$lines.Add("- SoundCloud")
$lines.Add("- SoundCloud Go+")
$lines.Add("- Bandcamp")
$lines.Add("- Twitch")
$lines.Add("- Vimeo")
$lines.Add("- NicoNico")
$lines.Add("- HTTP URLs")
$lines.Add("- Flowery TTS")
$lines.Add("- Spotify metadata/search")
$lines.Add("- Apple Music metadata/search")
$lines.Add("- Deezer direct playback when credentials are set")
$lines.Add("- Yandex Music")
$lines.Add("- VK Music")
$lines.Add("- Tidal metadata/search")
$lines.Add("- Qobuz")
$lines.Add("- JioSaavn")
$lines.Add("- Jellyfin via Jellylink")
$lines.Add("- Bilibili via lavabili")
$lines.Add("- Tracker modules via lava-xm")
$lines.Add("- Lyrics via LavaLyrics")
$lines.Add("- SponsorBlock chapters and segment skipping")
$lines.Add("")
$lines.Add("## First 300 yt-dlp Extractors")
$lines.Add("")
foreach ($name in $sample) {
  $lines.Add("- $name")
}
$lines.Add("")
$lines.Add("The full current list is maintained by yt-dlp:")
$lines.Add("")
$lines.Add("https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md")

Set-Content -Path $target -Value $lines -Encoding UTF8
"Wrote $target with $($extractors.Count) extractors."

