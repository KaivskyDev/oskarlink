# Startup Logs

OskarLink adds an English preflight launcher before Lavalink starts.

The launcher prints:

- selected OskarLink profile,
- Java version,
- Lavalink jar check,
- application.yml check,
- configured plugin dependency count,
- yt-dlp version,
- selected Java memory percentages,
- startup command handoff.

Example:

```text
[2026-07-01T18:00:00Z] [OskarLink] [BOOT] OskarLink startup sequence initialized
[2026-07-01T18:00:00Z] [OskarLink] [INFO] Profile: balanced
[2026-07-01T18:00:00Z] [OskarLink] [OK] Found OskarLink.jar
[2026-07-01T18:00:00Z] [OskarLink] [OK] Found application.yml
[2026-07-01T18:00:00Z] [OskarLink] [INFO] Configured plugin dependencies: 11
[2026-07-01T18:00:00Z] [OskarLink] [OK] yt-dlp helper: 2026.06.30
[2026-07-01T18:00:00Z] [OskarLink] [BOOT] Handing off to Lavalink runtime
```

The official Lavalink readiness line still matters:

```text
Lavalink is ready to accept connections.
```

OskarLink logs make startup easier to read, but Lavalink readiness confirms the
node is available for clients.
