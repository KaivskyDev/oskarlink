# Own Core Strategy

Building a full Lavalink replacement from zero is a separate engine project:
voice sessions, WebSocket state, Discord UDP audio, REST API compatibility,
track encoding, filters, reconnect behavior, metrics, and every client edge
case all have to match Lavalink.

OskarLink's practical path is different:

1. Keep Lavalink as the proven audio transport.
2. Keep plugin jars pinned and conflict-aware.
3. Put Oskar-owned logic in companion services and profiles.
4. Use open-source projects by dependency or process boundary, not by copying
   code and pretending it is original.
5. Promote only behavior that passes real `/v4/loadtracks` checks.

## OskarSource Gateway

The first owned component is:

```text
companions/oskar-source-gateway
```

It is written from scratch for this repo. It resolves source names and queries
to normal Lavalink identifiers, exposes the yt-dlp source catalog, and can
inspect URLs with yt-dlp.

It can use upstream projects as dependencies, protocols, and documented
integration targets. It must not copy third-party source code without preserving
license notices and ownership.

This is better than PulseLink for the current stack because:

- it works with standard `lavaclient` calls,
- it does not install a conflicting Lavalink plugin,
- it does not claim LavaSrc prefixes inside Lavalink,
- it can report 200+ yt-dlp extractors without making Lavalink boot depend on
  every source,
- it lets the bot choose a source before calling `loadTracks`.
- it supports PulseLink-like names such as Amazon Music, Audiomack, Shazam, and
  Pandora as mirror strategies without installing PulseLink.

## 200+ Source Model

The broad source count comes from yt-dlp. OskarLink should not maintain 200
hand-written source managers. That would be fragile and slow to repair.

The target shape is:

- Lavalink handles playback and Discord audio.
- LavaSrc handles music-service metadata and selected direct sources.
- OskarSource Gateway handles source selection, fallback order, catalog checks,
  and URL inspection.
- yt-dlp handles the long tail of supported URLs.

## Future Native Plugin

If this gateway proves useful, the next step can be an OskarSource Lavalink
plugin that calls the gateway internally. That should happen only after the
gateway behavior is stable and covered by tests.
