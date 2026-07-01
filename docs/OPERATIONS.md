# Operations

## Startup Signals

Treat the node as booted only after:

```text
Lavalink is ready to accept connections.
```

Useful secondary signals:

- plugin jars download successfully,
- `/v4/info` responds,
- `/v4/stats` responds,
- a bot opens a websocket connection,
- real `/v4/loadtracks` requests return tracks.

## Smoke Test

Run after deployment:

```powershell
.\scripts\test-loadtracks.ps1 -BaseUrl "http://127.0.0.1:2333" -Password "your-password"
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

