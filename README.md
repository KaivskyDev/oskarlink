# OskarLink

OskarLink is a private, Lavalink-compatible audio node distribution curated by Oskar Trzaskawka.

It keeps Lavalink as the runtime and layers a pinned plugin stack on top. That gives you a custom branded node without merging random source repositories into one unstable jar.

## What To Upload

Upload this folder to GitHub:

```text
upload-to-github/OskarLink
```

Do not upload local runtime output:

```text
application.yml
logs/
plugins/
bin/
OskarLink.jar
*.jar
*.env
```

The `.gitignore` already blocks those files.

## Stable Plugin Stack

- Lavalink `4.2.2` by default.
- youtube-source `1.18.1`.
- LavaSrc `4.8.3`.
- LavaSrc Failover `1.1.3`.
- LavaSearch `1.0.0`.
- LavaLyrics `1.1.0`.
- SponsorBlock `3.0.1`.
- LavaDSPX `0.0.5`.
- Jellylink `v0.2.1`.
- discovery-go `0.1.0`.
- lavabili `1.3.1`.
- lava-xm `0.2.8`.
- yt-dlp helper installed into `./bin/yt-dlp`.

## Source Model

Native and plugin sources cover YouTube, YouTube Music, SoundCloud, SoundCloud Go+, Bandcamp, Twitch, Vimeo, Nico, HTTP URLs, Flowery TTS, Spotify, Apple Music, Deezer, Yandex Music, VK Music, Tidal, Qobuz, JioSaavn, Jellyfin, Bilibili, tracker modules, LavaLyrics, SponsorBlock, and broad URL support through yt-dlp.

The real 200+ source count comes from yt-dlp. On July 1, 2026, the current yt-dlp supported-sites document listed 1727 extractors. That is the stable way to get hundreds of resolvable sites without stacking fragile Lavalink plugins.

Extra infnibor repositories are tracked in `docs/INFNIBOR_REPOS.md`. `yt-cipher` is useful as a separate companion service, while `soundy`, `Rustalink`, `libdave-jvm`, `yt-dlp-web-ui`, and `amazon-music-api` are not part of stable startup.

The July 1, 2026 web research pass added separate experimental profiles for PulseLink, DuncteBot source managers, and Gaana. See `docs/WEB_RESEARCH_2026-07-01.md` and `docs/EXPERIMENTAL_PLUGINS.md`. These are intentionally not merged into stable because source prefixes can collide.

## Pterodactyl

Import:

```text
pterodactyl/egg-oskarlink.json
```

Set `OSKARLINK_RAW_BASE_URL` after uploading the repo, for example:

```text
https://raw.githubusercontent.com/YOUR_USERNAME/OskarLink/main
```

The egg will download `config/application.example.yml` from that repo. If the raw URL is not set, the egg uses its embedded fallback config.

## Secrets

Never commit real tokens, cookies, passwords, ARL values, OAuth refresh tokens, Apple Music JWTs, VK tokens, Yandex tokens, Jellyfin passwords, or remote-cipher passwords.

Use Pterodactyl variables for secrets. If a token was ever pasted into a prompt, public chat, or committed file, rotate it.

## Validation

Before pushing a release:

```powershell
.\scripts\scan-secrets.ps1
.\scripts\validate-artifacts.ps1
.\scripts\build-egg.ps1
```

After deployment:

```powershell
.\scripts\doctor.ps1 -BaseUrl "http://127.0.0.1:2333" -Password "your-password"
.\scripts\test-loadtracks.ps1 -BaseUrl "http://127.0.0.1:2333" -Password "your-password"
```

Architecture, operations, plugin decisions, and source policy are documented under `docs/`.
