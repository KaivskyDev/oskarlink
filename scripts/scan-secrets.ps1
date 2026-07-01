$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $PSCommandPath)
$patterns = @(
  '1//[A-Za-z0-9_\-]+',
  'xox[baprs]-[A-Za-z0-9\-]+',
  'eyJ0eXAi',
  'sp_dc=',
  'arl=',
  'OAuth\s+[A-Za-z0-9_\-]{24,}',
  'password:\s*"[A-Za-z0-9_\-]{24,}"',
  'token:\s*"[A-Za-z0-9_\-]{24,}"',
  'refreshToken:\s*"[A-Za-z0-9_\-]{24,}"'
)

$allowedFiles = @(
  "scripts/scan-secrets.ps1",
  "SECURITY.md",
  "docs/UPLOAD.md"
)

$findings = New-Object System.Collections.Generic.List[string]

Get-ChildItem -Path $root -Recurse -File |
  Where-Object {
    $_.FullName -notmatch '\\.git\\' -and
    $_.Extension -notin @(".jar", ".png", ".jpg", ".jpeg", ".gif", ".webp")
  } |
  ForEach-Object {
    $relative = $_.FullName.Substring($root.Length + 1).Replace("\", "/")
    if ($allowedFiles -contains $relative) {
      return
    }

    $content = Get-Content -Raw -Path $_.FullName -ErrorAction SilentlyContinue
    foreach ($pattern in $patterns) {
      if ($content -match $pattern) {
        $findings.Add("$relative matched $pattern")
      }
    }
  }

if ($findings.Count -gt 0) {
  $findings | ForEach-Object { Write-Host $_ }
  throw "Potential secrets found: $($findings.Count)"
}

"secret-scan-ok"
