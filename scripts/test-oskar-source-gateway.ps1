param(
  [string]$BaseUrl = "http://127.0.0.1:2444",
  [string]$QueryFile = ".\source-tests\oskar-source-gateway-queries.jsonl",
  [int]$TimeoutSec = 15
)

$ErrorActionPreference = "Stop"

$base = $BaseUrl.TrimEnd("/")
$failed = 0

$health = Invoke-RestMethod -Uri "$base/health" -Method GET -TimeoutSec $TimeoutSec
if (-not $health.ok) {
  throw "OskarSource Gateway health check failed"
}

Get-Content -Path $QueryFile |
  Where-Object { $_.Trim() -and -not $_.Trim().StartsWith("#") } |
  ForEach-Object {
    $case = $_ | ConvertFrom-Json
    $body = @{
      source = $case.source
      query = $case.query
    } | ConvertTo-Json

    try {
      $response = Invoke-RestMethod -Uri "$base/resolve" -Method POST -ContentType "application/json" -Body $body -TimeoutSec $TimeoutSec
      if ($response.identifier -ne $case.expected) {
        "{0}: expected '{1}', got '{2}'" -f $case.source, $case.expected, $response.identifier
        $script:failed++
      } else {
        "{0}: {1}" -f $case.source, $response.identifier
      }
    } catch {
      "{0}: failed {1}" -f $case.source, $_.Exception.Message
      $script:failed++
    }
  }

if ($failed -gt 0) {
  throw "OskarSource Gateway tests failed: $failed"
}

"oskar-source-gateway-ok"
