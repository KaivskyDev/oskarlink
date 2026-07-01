param(
  [Parameter(Mandatory = $true)]
  [string]$BaseUrl,

  [Parameter(Mandatory = $true)]
  [string]$Password,

  [string[]]$Identifiers = @(
    "ytsearch:alan walker faded",
    "ytmsearch:alan walker faded",
    "scsearch:alan walker faded",
    "https://www.youtube.com/watch?v=60ItHLz5WEA",
    "https://soundcloud.com/alanwalker/faded-slushii-remix-1"
  ),

  [string]$IdentifierFile,

  [switch]$AllowFailures,

  [int]$TimeoutSec = 30
)

$ErrorActionPreference = "Stop"

$base = $BaseUrl.TrimEnd("/")
$headers = @{ Authorization = $Password }
$failed = 0

if ($IdentifierFile) {
  $Identifiers = Get-Content -Path $IdentifierFile |
    ForEach-Object { $_.Trim() } |
    Where-Object { $_ -and -not $_.StartsWith("#") }
}

foreach ($identifier in $Identifiers) {
  $encoded = [System.Uri]::EscapeDataString($identifier)
  $uri = "$base/v4/loadtracks?identifier=$encoded"

  try {
    $response = Invoke-RestMethod -Uri $uri -Method GET -Headers $headers -TimeoutSec $TimeoutSec
    $loadType = $response.loadType
    $count = 0

    if ($response.data -is [array]) {
      $count = $response.data.Count
    } elseif ($response.data.tracks) {
      $count = $response.data.tracks.Count
    } elseif ($response.data.encoded) {
      $count = 1
    }

    "{0}: {1}, tracks={2}" -f $identifier, $loadType, $count

    if ($loadType -in @("empty", "error")) {
      $failed++
    }
  } catch {
    "{0}: failed {1}" -f $identifier, $_.Exception.Message
    $failed++
  }
}

if ($failed -gt 0 -and -not $AllowFailures) {
  throw "Loadtracks smoke test failed: $failed"
}

if ($failed -gt 0) {
  "Loadtracks completed with allowed failures: $failed"
}
