param(
  [int]$Port = 2444,
  [string]$HostName = "0.0.0.0",
  [string]$YtDlpPath = "yt-dlp"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $PSCommandPath)
$gateway = Join-Path $root "companions/oskar-source-gateway"

$env:OSKAR_SOURCE_PORT = [string]$Port
$env:OSKAR_SOURCE_HOST = $HostName
$env:OSKAR_SOURCE_YTDLP = $YtDlpPath

Push-Location $gateway
try {
  npm start
} finally {
  Pop-Location
}
