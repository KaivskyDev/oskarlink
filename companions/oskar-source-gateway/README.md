# OskarSource Gateway

OskarSource Gateway is OskarLink's own source resolver companion. It does not
copy PulseLink and it does not replace Lavalink's audio engine. It provides a
small HTTP API that maps user source choices to normal Lavalink identifiers for
`lavaclient`.

## Why This Exists

PulseLink is rejected for this distribution because it does not work with the
current `lavaclient` integration and overlaps LavaSrc prefixes.

OskarSource Gateway keeps the bot flow simple:

1. Bot asks this gateway to resolve a query/source.
2. Gateway returns a Lavalink identifier such as `ytsearch:query`,
   `spsearch:query`, `ftts://text`, or a direct URL.
3. Bot calls `lavalink.rest.loadTracks(identifier)` as usual.

## Run

```powershell
cd companions/oskar-source-gateway
npm test
npm start
```

Defaults:

```text
OSKAR_SOURCE_HOST=0.0.0.0
OSKAR_SOURCE_PORT=2444
OSKAR_SOURCE_YTDLP=yt-dlp
```

## API

Health:

```text
GET /health
```

List sources from installed `yt-dlp`, falling back to `docs/SOURCES.md`:

```text
GET /sources?limit=300
```

List OskarSource Registry entries:

```text
GET /registry
```

Resolve a query:

```http
POST /resolve
content-type: application/json

{
  "source": "spotify",
  "query": "alan walker faded"
}
```

Response:

```json
{
  "identifier": "spsearch:alan walker faded"
}
```

Inspect a URL with yt-dlp:

```http
POST /inspect
content-type: application/json

{
  "identifier": "https://vimeo.com/148751763"
}
```

## Supported Source Keys

- `youtube`
- `youtubemusic`
- `soundcloud`
- `spotify`
- `applemusic`
- `deezer`
- `deezer_isrc`
- `yandexmusic`
- `vkmusic`
- `tidal`
- `qobuz`
- `qobuz_isrc`
- `jiosaavn`
- `gaana`
- `amazonmusic`
- `audiomack`
- `shazam`
- `pandora`
- `bandcamp`
- `vimeo`
- `twitch`
- `niconico`
- `bilibili`
- `mixcloud`
- `reddit`
- `tiktok`
- `pixeldrain`
- `napster`
- `iheart`
- `anghami`
- `boomplay`
- `bandlab`
- `beatport`
- `beatsource`
- `lastfm`
- `musixmatch`
- `genius`
- `dailymotion`
- `facebook`
- `instagram`
- `x`
- `odysee`
- `rumble`
- `peertube`
- `archive`
- `kick`
- `soundgasm`
- `clypit`
- `ocremix`
- `getyarn`
- `tumblr`
- `streamdeckaudio`
- `ted`
- `coursera`
- `soundclick`
- `audius`
- `hearthis`
- `mixupload`
- `applepodcasts`
- `spotifyepisodes`
- `flowerytts`
- `jellyfin`

The registry is intentionally broad, while the real 200+ URL support comes from yt-dlp. OskarSource Gateway exposes that
catalog and lets the bot validate URLs without loading extra Lavalink plugins.
