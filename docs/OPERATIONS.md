# Operations

## Startup Signals

Treat the node as booted only after:

```text
Lavalink is ready to accept connections.
```

Useful secondary signals:

- plugin jars download successfully,
- OskarLink preflight checks pass,
- `/v4/info` responds,
- `/v4/stats` responds,
- a bot opens a websocket connection,
- real `/v4/loadtracks` requests return tracks.

## Pterodactyl Startup Command

OskarLink servers should start with:

```text
bash ./start-oskarlink.sh --server.port={{SERVER_PORT}} --lavalink.server.password={{LAVALINK_PASSWORD}}
```

If the console instead shows:

```text
java -Xms128M -XX:MaxRAMPercentage=95.0 -Dterminal.jline=false -Dterminal.ansi=true -jar ${SERVER_JARFILE}
```

and Java prints:

```text
Error: -jar requires jar file specification
```

then the server is still using a generic Java startup command or the `SERVER_JARFILE` variable is empty. Set the server egg to OskarLink, reinstall the server, and verify `SERVER_JARFILE=OskarLink.jar` if you keep the generic fallback startup.

## Smoke Test

Run after deployment:

```powershell
.\scripts\test-loadtracks.ps1 -BaseUrl "http://127.0.0.1:2333" -Password "your-password"
```

You can also load identifiers from a file:

```powershell
.\scripts\test-loadtracks.ps1 -BaseUrl "http://127.0.0.1:2333" -Password "your-password" -IdentifierFile ".\source-tests\smoke-identifiers.txt"
```

Minimum identifiers:

- `ytsearch:alan walker faded`
- `ytmsearch:alan walker faded`
- `scsearch:alan walker faded`
- one direct YouTube URL
- one SoundCloud URL

## Doctor

Run:

```powershell
.\scripts\doctor.ps1 -BaseUrl "http://127.0.0.1:2333" -Password "your-password"
```

The doctor checks:

- `/version`
- `/v4/info`
- `/v4/stats`
- `/v4/failover/health`
- `/metrics`

Some endpoints can be disabled depending on config. That is fine as long as core info and stats respond.

## Lavaclient Max Test

For the OskarSource Stack profile, run the broad test in reporting mode:

```powershell
.\scripts\test-loadtracks.ps1 -BaseUrl "http://127.0.0.1:2333" -Password "your-password" -IdentifierFile ".\source-tests\lavaclient-max-identifiers.txt" -AllowFailures
```

Failures are expected for optional sources until their credentials are enabled.

## OskarSource Gateway

Run the owned source resolver companion:

```powershell
.\scripts\start-oskar-source-gateway.ps1 -Port 2444 -YtDlpPath ".\bin\yt-dlp"
```

Check it:

```powershell
Invoke-RestMethod http://127.0.0.1:2444/health
Invoke-RestMethod http://127.0.0.1:2444/registry
Invoke-RestMethod http://127.0.0.1:2444/sources?limit=20
```

The bot can call `/resolve`, then pass the returned `identifier` into
`lavalink.rest.loadTracks(identifier)`.

Run gateway mapping tests:

```powershell
.\scripts\test-oskar-source-gateway.ps1
```

## Updating

1. Run `scripts/validate-artifacts.ps1`.
2. Run `scripts/update-ytdlp-sources.ps1`.
3. Run `scripts/build-egg.ps1`.
4. Import the new egg or push the repo and reinstall through Pterodactyl.
5. Run doctor and loadtracks smoke tests.

## When A Source Breaks

First classify it:

- Startup blocker: node does not reach ready state.
- Load blocker: node is ready, but one source fails.
- Warning: node is ready and traffic works.

Do not remove working sources because of warnings. Disable only the failing source or plugin.

## Calibration

Generate a calibrated config before release:

```powershell
.\scripts\calibrate-oskarlink.ps1 -Preset balanced
```

See `docs/CALIBRATION.md` and `docs/STARTUP_LOGS.md`.
