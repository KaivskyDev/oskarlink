param(
  [Parameter(Mandatory = $true)]
  [string]$BaseUrl,

  [Parameter(Mandatory = $true)]
  [string]$Password,

  [int]$TimeoutSec = 15
)

$ErrorActionPreference = "Stop"

$base = $BaseUrl.TrimEnd("/")
$headers = @{ Authorization = $Password }

$checks = @(
  @{ Name = "version"; Path = "/version"; Auth = $false },
  @{ Name = "info"; Path = "/v4/info"; Auth = $true },
  @{ Name = "stats"; Path = "/v4/stats"; Auth = $true },
  @{ Name = "failover"; Path = "/v4/failover/health"; Auth = $true },
  @{ Name = "metrics"; Path = "/metrics"; Auth = $false }
)

$failed = 0

foreach ($check in $checks) {
  $uri = "$base$($check.Path)"
  try {
    $args = @{
      Uri = $uri
      Method = "GET"
      TimeoutSec = $TimeoutSec
      UseBasicParsing = $true
    }
    if ($check.Auth) {
      $args.Headers = $headers
    }

    $response = Invoke-WebRequest @args
    "{0}: {1}" -f $check.Name, $response.StatusCode
  } catch {
    $status = ""
    if ($_.Exception.Response) {
      $status = $_.Exception.Response.StatusCode.value__
    }
    "{0}: failed {1} {2}" -f $check.Name, $status, $_.Exception.Message

    if ($check.Name -in @("info", "stats")) {
      $failed++
    }
  }
}

if ($failed -gt 0) {
  throw "Core Lavalink checks failed: $failed"
}

