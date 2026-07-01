# Calibration

OskarLink keeps calibration simple by using presets instead of asking you to
tune dozens of Lavalink values manually.

## Presets

| Preset | Best For | Tradeoff |
| --- | --- | --- |
| `safe` | Small VPS, low RAM, first deployment | Lower limits, fewer surprises |
| `balanced` | Normal production node | Default recommended preset |
| `throughput` | More queues, more playlist loads, stronger CPU/RAM | Higher memory and request pressure |
| `low-latency` | Faster interaction and smaller queues | Less buffering headroom |

Generate a calibrated config:

```powershell
.\scripts\calibrate-oskarlink.ps1 -Preset balanced
```

Use a different base config:

```powershell
.\scripts\calibrate-oskarlink.ps1 -Preset throughput -SourcePath ".\config\application.lavaclient-max.yml" -OutPath ".\config\application.throughput.yml"
```

## Pterodactyl Runtime Knobs

The egg exposes runtime knobs for startup behavior:

- `OSKARLINK_PROFILE`
- `OSKARLINK_PRESTART_CHECKS`
- `OSKARLINK_JAVA_MAX_RAM`
- `OSKARLINK_JAVA_INITIAL_RAM`
- `OSKARLINK_EXTRA_JAVA_FLAGS`

Recommended values:

```text
OSKARLINK_PROFILE=balanced
OSKARLINK_PRESTART_CHECKS=true
OSKARLINK_JAVA_MAX_RAM=95.0
OSKARLINK_JAVA_INITIAL_RAM=25.0
```

## What The Presets Tune

- HTTP thread count.
- Async request timeout.
- Spring codec memory limit.
- Lavalink buffer and frame buffer.
- Opus quality.
- Track stuck threshold.
- Player update interval.
- Playlist and search limits.

## Stability Rules

- Keep PulseLink disabled.
- Keep experimental profiles outside stable startup.
- Enable credential-heavy sources one at a time.
- Treat startup readiness as the source of truth:

```text
Lavalink is ready to accept connections.
```

- After readiness, run:

```powershell
.\scripts\doctor.ps1 -BaseUrl "http://127.0.0.1:2333" -Password "your-password"
.\scripts\test-loadtracks.ps1 -BaseUrl "http://127.0.0.1:2333" -Password "your-password"
```
