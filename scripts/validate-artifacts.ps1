$ErrorActionPreference = "Stop"

$artifacts = @(
  @{ Name = "Lavalink 4.2.2"; Url = "https://github.com/lavalink-devs/Lavalink/releases/download/4.2.2/Lavalink.jar" },
  @{ Name = "youtube-source"; Url = "https://maven.lavalink.dev/releases/dev/lavalink/youtube/youtube-plugin/1.18.1/youtube-plugin-1.18.1.jar" },
  @{ Name = "LavaSrc"; Url = "https://maven.lavalink.dev/releases/com/github/topi314/lavasrc/lavasrc-plugin/4.8.3/lavasrc-plugin-4.8.3.jar" },
  @{ Name = "LavaSrc Failover"; Url = "https://repo1.maven.org/maven2/io/github/lavalink-addons/lavasrc-failover-plugin/1.1.3/lavasrc-failover-plugin-1.1.3.jar" },
  @{ Name = "LavaSearch"; Url = "https://maven.lavalink.dev/releases/com/github/topi314/lavasearch/lavasearch-plugin/1.0.0/lavasearch-plugin-1.0.0.jar" },
  @{ Name = "LavaLyrics"; Url = "https://maven.lavalink.dev/releases/com/github/topi314/lavalyrics/lavalyrics-plugin/1.1.0/lavalyrics-plugin-1.1.0.jar" },
  @{ Name = "SponsorBlock"; Url = "https://maven.lavalink.dev/releases/com/github/topi314/sponsorblock/sponsorblock-plugin/3.0.1/sponsorblock-plugin-3.0.1.jar" },
  @{ Name = "LavaDSPX"; Url = "https://jitpack.io/com/github/Devoxin/LavaDSPX-Plugin/0.0.5/LavaDSPX-Plugin-0.0.5.jar" },
  @{ Name = "Jellylink"; Url = "https://jitpack.io/com/github/Myxelium/Jellylink/v0.2.1/Jellylink-v0.2.1.jar" },
  @{ Name = "discovery-go"; Url = "https://jitpack.io/com/github/dubistmutig/discovery-go/0.1.0/discovery-go-0.1.0.jar" },
  @{ Name = "lavabili"; Url = "https://jitpack.io/com/github/ParrotXray/lavabili-plugin/1.3.1/lavabili-plugin-1.3.1.jar" },
  @{ Name = "lava-xm"; Url = "https://repo.projectlounge.pw/maven/releases/net/esmbot/lava-xm-plugin/0.2.8/lava-xm-plugin-0.2.8.jar" }
)

foreach ($artifact in $artifacts) {
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $artifact.Url -Method Head -TimeoutSec 30
    "{0}: {1}" -f $artifact.Name, $response.StatusCode
  } catch {
    $status = ""
    if ($_.Exception.Response) {
      $status = $_.Exception.Response.StatusCode.value__
    }
    throw ("{0}: failed {1} {2}" -f $artifact.Name, $status, $_.Exception.Message)
  }
}

$experimental = @(
  @{ Name = "PulseLink experimental"; Url = "https://jitpack.io/com/github/ItzRandom23/PulseLink/v1.6.2/PulseLink-v1.6.2.jar" },
  @{ Name = "DuncteBot Skybot experimental"; Url = "https://maven.lavalink.dev/releases/com/dunctebot/skybot-lavalink-plugin/1.7.1/skybot-lavalink-plugin-1.7.1.jar" },
  @{ Name = "Gaana experimental"; Url = "https://jitpack.io/com/github/notdeltaxd/gaana-plugin/1.0.2/gaana-plugin-1.0.2.jar" },
  @{ Name = "Java Timed Lyrics experimental"; Url = "https://maven.lavalink.dev/releases/me/duncte123/java-lyrics-plugin/1.6.6/java-lyrics-plugin-1.6.6.jar" },
  @{ Name = "Google Cloud TTS experimental"; Url = "https://jitpack.io/com/github/DuncteBot/tts-plugin/1.0.1/tts-plugin-1.0.1.jar" },
  @{ Name = "JioSaavn standalone unavailable"; Url = "https://maven.appujet.site/releases/com/github/appujet/jiosaavn-plugin/1.0.6/jiosaavn-plugin-1.0.6.jar" },
  @{ Name = "soundy experimental unavailable"; Url = "https://maven.lavalink.dev/releases/com/waris4ly/soundy/plugin/1.0.0/plugin-1.0.0.jar" }
)

foreach ($artifact in $experimental) {
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $artifact.Url -Method Head -TimeoutSec 30
    "{0}: {1}" -f $artifact.Name, $response.StatusCode
  } catch {
    $status = ""
    if ($_.Exception.Response) {
      $status = $_.Exception.Response.StatusCode.value__
    }
    "{0}: skipped, unavailable ({1})" -f $artifact.Name, $status
  }
}
