param(
  [string]$OutPath
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $PSCommandPath)
$sourcePath = Join-Path $root "config/application.example.yml"

if (-not $OutPath) {
  $OutPath = Join-Path $root "config/application.lavaclient-max.yml"
}

$config = Get-Content -Raw -Path $sourcePath

$providerBlock = @'
    providers:
      - "dzisrc:%ISRC%"
      - "qbisrc:%ISRC%"
      - "ytsearch:\"%ISRC%\""
      - "ytmsearch:\"%ISRC%\""
      - "dzsearch:%QUERY%"
      - "qbsearch:%QUERY%"
      - "tdsearch:%QUERY%"
      - "amsearch:%QUERY%"
      - "spsearch:%QUERY%"
      - "ymsearch:%QUERY%"
      - "vksearch:%QUERY%"
      - "jssearch:%QUERY%"
      - "ytmsearch:%QUERY%"
      - "ytsearch:%QUERY%"
      - "scsearch:%QUERY%"
    sources:
'@

$pattern = '(?ms)^    providers:\r?\n(?:      - .*\r?\n)+    sources:\r?\n'
$updated = [regex]::Replace($config, $pattern, $providerBlock + [Environment]::NewLine, 1)

if ($updated -eq $config) {
  throw "Could not replace LavaSrc providers block in $sourcePath"
}

$header = @"
# Generated from config/application.example.yml by scripts/new-lavaclient-max-config.ps1.
# Use with lavaclient when you want the broad OskarSource resolver order without PulseLink.

"@

Set-Content -Path $OutPath -Value ($header + $updated.TrimStart()) -Encoding UTF8
"Wrote $OutPath"
