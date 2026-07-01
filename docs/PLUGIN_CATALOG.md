# Plugin Catalog

## Stable

| Plugin | Version | Purpose | Risk |
| --- | --- | --- | --- |
| youtube-source | 1.18.1 | YouTube and YouTube Music source manager | Medium, YouTube changes often |
| LavaSrc | 4.8.3 | Spotify, Apple Music, Deezer, Yandex, VK, Tidal, Qobuz, yt-dlp, JioSaavn, lyrics sources | Medium, many sources require tokens |
| LavaSrc Failover | 1.1.3 | Source health and failover visibility | Low |
| LavaSearch | 1.0.0 | Advanced search endpoint | Low |
| LavaLyrics | 1.1.0 | Lyrics API and live lyrics events | Low |
| SponsorBlock | 3.0.1 | Sponsor segments and chapters | Low |
| LavaDSPX | 0.0.5 | Additional audio filters | Low |
| Jellylink | v0.2.1 | Jellyfin source | Medium, requires private Jellyfin credentials |
| discovery-go | 0.1.0 | SoundCloud Go+ playback with OAuth | Medium, token-dependent |
| lavabili | 1.3.1 | Bilibili source | Medium, region/account behavior may vary |
| lava-xm | 0.2.8 | Tracker module formats | Low |

## Companion

| Project | Purpose | Stable Behavior |
| --- | --- | --- |
| yt-cipher | YouTube remote cipher service | Optional. Lavalink must boot without it. |
| yt-dlp-web-ui | yt-dlp UI/RPC service | Optional. Not in audio path. |

## Experimental

| Plugin | Reason |
| --- | --- |
| soundy | SoundCloud overlap and current Maven artifact unavailable during validation |
| PulseLink | Very broad source resolver, but overlaps LavaSrc prefixes and should replace rather than stack with LavaSrc |
| DuncteBot Skybot | Adds many niche sources but previously failed runtime class loading |
| Gaana | Dedicated Gaana source with reachable artifact, but low adoption and needs real playback validation |
| Google Cloud TTS | Requires paid credentials and fails when credentials are missing |
| Java Timed Lyrics | Previously failed against this runtime with route-planner class issues |

## Rejected From Stable

| Project | Reason |
| --- | --- |
| Standalone JioSaavn plugin | Advertised Maven host was unavailable during validation; use LavaSrc/PulseLink paths instead |
| Amazon Music streaming APIs with Widevine paths | Legal and operational risk. Use metadata-only research at most. |
| Random public node configs | Usually unpinned, secret-heavy, or incompatible with current Lavalink |
| Physical stale jars in `plugins/` | They load even if removed from YAML, so the egg cleans them during install |
