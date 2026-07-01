# OskarSource Registry

OskarSource Registry is the source map used by `companions/oskar-source-gateway`.
It is OskarLink-owned code. It uses upstream projects as documented integration
targets, not copied source code.

## Design

The registry has four strategies:

- `native-prefix`: return a Lavalink/LavaSrc/plugin prefix directly.
- `mirror-search`: search the requested platform through a stable playback
  provider, usually YouTube Music or YouTube.
- `tts`: build a Flowery TTS identifier.
- `passthrough`: keep direct URLs and already-prefixed identifiers unchanged.

This lets the bot expose PulseLink-like source names while keeping Lavalink
stable and compatible with `lavaclient`.

## Core Sources

| Source | Strategy | Identifier Example | Notes |
| --- | --- | --- | --- |
| YouTube | native-prefix | `ytsearch:query` | Stable |
| YouTube Music | native-prefix | `ytmsearch:query` | Stable |
| SoundCloud | native-prefix | `scsearch:query` | Stable |
| Spotify | native-prefix | `spsearch:query` | LavaSrc, credentials recommended |
| Apple Music | native-prefix | `amsearch:query` | LavaSrc, token recommended |
| Deezer | native-prefix | `dzsearch:query` | Credentials required for direct playback |
| Yandex Music | native-prefix | `ymsearch:query` | Region and token dependent |
| VK Music | native-prefix | `vksearch:query` | Region and token dependent |
| Tidal | native-prefix | `tdsearch:query` | Token dependent |
| Qobuz | native-prefix | `qbsearch:query` | Token dependent |
| JioSaavn | native-prefix | `jssearch:query` | Secret/region dependent |
| Flowery TTS | tts | `ftts://text` | Stable |
| Jellyfin | native-prefix | `jfsearch:query` | Requires Jellylink credentials |
| Gaana | native-prefix | `gaanasearch:query` | Experimental plugin profile |

## PulseLink-Like Sources Without PulseLink

| Source | Strategy | Returned Identifier |
| --- | --- | --- |
| Amazon Music | mirror-search | `ytmsearch:query amazon music` |
| Audiomack | mirror-search | `ytmsearch:query audiomack` |
| Shazam | mirror-search | `ytmsearch:query shazam` |
| Pandora | mirror-search | `ytmsearch:query pandora` |
| Napster | mirror-search | `ytmsearch:query napster` |
| Anghami | mirror-search | `ytmsearch:query anghami` |
| Boomplay | mirror-search | `ytmsearch:query boomplay` |
| Beatport | mirror-search | `ytmsearch:query beatport` |
| Beatsource | mirror-search | `ytmsearch:query beatsource` |
| Audius | mirror-search | `ytmsearch:query audius` |

These are not native playback from those platforms. They are platform-aware
mirror searches that keep `lavaclient` compatibility.

## URL And Long-Tail Sources

The gateway exposes `/sources`, backed by `yt-dlp --list-extractors` when
available and by `docs/SOURCES.md` as a fallback. The current cached catalog has
1727 extractors, so this is the 200+ source layer.

Use direct URLs for services where search is not reliable:

- Bandcamp
- Vimeo
- Twitch
- NicoNico
- Bilibili
- Mixcloud
- Reddit
- TikTok
- Pixeldrain
- Dailymotion
- Facebook
- Instagram
- X / Twitter
- Odysee
- Rumble
- PeerTube
- Internet Archive
- Kick
- TED
- Coursera
- HearThis.at
- SoundClick
- Apple Podcasts

## API

Registry:

```text
GET /registry
```

Resolve:

```http
POST /resolve
content-type: application/json

{"source":"amazonmusic","query":"alan walker faded"}
```

Response:

```json
{
  "source": "amazonmusic",
  "strategy": "mirror-search",
  "identifier": "ytmsearch:alan walker faded amazon music"
}
```

## Test

```powershell
.\scripts\test-oskar-source-gateway.ps1
```
