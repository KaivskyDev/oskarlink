# Infnibor Repositories

These repositories are useful references, but they should not all be merged into the stable OskarLink egg.

## soundy

Repository: https://github.com/infnibor/soundy

Use case: experimental SoundCloud source plugin for Lavalink.

Decision: not added to stable. It overlaps with Lavalink SoundCloud, LavaSrc `scsearch`, and discovery-go. The documented Maven coordinate also returned `404` during validation, so it should be tested as a manual build first.

## yt-cipher

Repository: https://github.com/infnibor/yt-cipher

Use case: companion service for youtube-source `remoteCipher`.

Decision: useful. Keep it as a separate service, then enable this block in `config/application.example.yml` after setting a private token:

```yaml
plugins:
  youtube:
    remoteCipher:
      url: "${YOUTUBE_REMOTE_CIPHER_URL:}"
      password: "${YOUTUBE_REMOTE_CIPHER_PASSWORD:}"
      userAgent: "OskarLink"
```

Do not expose yt-cipher publicly without `API_TOKEN`.

## yt-dlp-web-ui

Repository: https://github.com/infnibor/yt-dlp-web-ui

Use case: companion UI/RPC service for yt-dlp downloads and livestream monitoring.

Decision: not in the audio path. Useful as a separate admin/download service, not as a Lavalink plugin.

## Rustalink

Repository: https://github.com/infnibor/Rustalink

Use case: possible future Rust audio node or Lavalink-compatible alternative.

Decision: not merged into the Java Lavalink distribution. Treat it as a future backend experiment for an `OskarLink Engine`, not as a plugin.

## libdave-jvm

Repository: https://github.com/infnibor/libdave-jvm

Use case: low-level Java implementation of Discord DAVE crypto support.

Decision: not a source plugin. Lavalink `4.2.2` already includes DAVE-era core support, so OskarLink should inherit this through Lavalink/Koe rather than bundle a separate crypto library.

## amazon-music-api

Repository: https://github.com/infnibor/amazon-music-api

Use case: Amazon Music metadata/search/playback research.

Decision: research only. The repo advertises stream URL extraction and Widevine key handling, which is too high-risk for a stable Lavalink distribution. A safe path would be metadata-only resolution and mirroring to legal direct providers, not DRM bypass playback.

