# Web Research - 2026-07-01

This pass searched the public Lavalink plugin ecosystem and validated reachable
jar URLs where possible. Stable OskarLink stays conservative; new risky sources
are documented as separate experimental profiles only when they fit the current
lavaclient integration.

## Sources Checked

- Lavalink plugin documentation: https://lavalink.dev/plugins.html
- youtube-source: https://github.com/lavalink-devs/youtube-source
- LavaSrc: https://github.com/topi314/LavaSrc
- PulseLink: https://github.com/ItzRandom23/PulseLink
- DuncteBot Skybot plugin: https://github.com/DuncteBot/skybot-lavalink-plugin
- DuncteBot Google TTS plugin: https://github.com/DuncteBot/tts-plugin
- DuncteBot Java Timed Lyrics: https://github.com/DuncteBot/java-timed-lyrics
- Gaana plugin: https://github.com/bongo-devs/gaana-plugin
- JioSaavn plugin: https://github.com/bongo-devs/jiosaavn-plugin
- NodeLink comparison research: https://github.com/PerformanC/NodeLink

## Candidate Decisions

| Candidate | New coverage | Artifact check | Decision |
| --- | --- | --- | --- |
| PulseLink `v1.6.2` | Spotify, Amazon Music, Apple Music, Tidal, Qobuz, Deezer, Yandex, VK, JioSaavn, Audiomack, Gaana, Shazam, Pandora, SoundCloud, yt-dlp, FloweryTTS, YouTube | `200` from JitPack | Rejected. It does not work with the current lavaclient integration and overlaps LavaSrc prefixes. |
| DuncteBot Skybot `1.7.1` | Mixcloud, OCR Remix, Clyp.it, Reddit, GetYarn, TTS `speak:`, TikTok, Soundgasm, Pixeldrain, Tumblr | `200` from Lavalink Maven | Experimental only. Previous runtime testing hit class-loading failures and TikTok/Tumblr are fragile. |
| Gaana `1.0.2` | `gaanasearch:` plus Gaana songs, albums, playlists, artist pages | `200` from JitPack | Experimental profile added. Dedicated prefix, but low adoption and needs real loadtracks testing. |
| Java Timed Lyrics `1.6.6` | YouTube lyrics, timed lyrics, optional Genius fallback, LavaLyrics bridge | `200` from Lavalink Maven | Not added to stable because prior testing failed against this Lavalink runtime and it conflicts with LavaLyrics mode choices. |
| Google Cloud TTS `1.0.1` | `tts://` Google Cloud TTS | `200` from JitPack | Not added to stable because it requires paid credentials and fails when service-account fields are absent. |
| JioSaavn standalone plugin `1.0.6` | JioSaavn direct source | Maven host failed DNS | Rejected. Keep LavaSrc JioSaavn only. |
| soundy `1.0.0` | Alternative SoundCloud source | Lavalink Maven returned `404` | Build-from-source research only until a jar is published. |
| NodeLink | Alternative node engine with overlapping goals | Not a Lavalink plugin | Comparison research only; not part of OskarLink stable Lavalink distribution. |

## Practical Result

The best stable broad-source path is still:

1. `yt-dlp` for hundreds of URL extractors.
2. LavaSrc for music-service metadata and direct sources where credentials allow it.
3. Small, pinned source plugins only when they do not claim the same prefixes.

The new experimental profiles are intentionally separate:

- `profiles/experimental-dunctebot-sources.yml`
- `profiles/experimental-gaana.yml`

Use one test profile at a time, then verify startup logs and `/v4/loadtracks`
before promoting anything into the stable egg.
