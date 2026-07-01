# Experimental Plugins

These are not in the stable OskarLink profile because they can add conflicts, require paid credentials, or have already failed in runtime tests.

Latest research pass: `docs/WEB_RESEARCH_2026-07-01.md`.

## PulseLink Rejected

Repository: https://github.com/ItzRandom23/PulseLink

PulseLink is not shipped as a profile because it does not work with the current lavaclient integration. It also overlaps LavaSrc source ownership and search prefixes, which makes it a poor fit for this distribution.

## DuncteBot Skybot Source Plugin

Repository: https://github.com/DuncteBot/skybot-lavalink-plugin

Profile: `profiles/experimental-dunctebot-sources.yml`

Adds sources such as Mixcloud, OCR Remix, Clyp.it, Reddit, GetYarn, TikTok, Soundgasm, Pixeldrain, Tumblr, and some others.

Stable OskarLink does not include it by default because previous Lavalink v4.2 startup testing hit runtime class failures. Use it only in a separate test node after validating startup and real track loads.

## Gaana

Repository: https://github.com/bongo-devs/gaana-plugin

Profile: `profiles/experimental-gaana.yml`

Adds `gaanasearch:` plus Gaana song, album, playlist, and artist URLs. The artifact is reachable, but the plugin has low adoption and should pass real playback checks before it becomes stable.

## Google Cloud TTS Plugin

Repository: https://github.com/DuncteBot/tts-plugin

Requires Google Cloud credentials and can fail hard when credentials are missing. OskarLink already enables Flowery TTS by default, so Google Cloud TTS belongs in a separate credentials-backed profile.

## Java Timed Lyrics

Repository: https://github.com/DuncteBot/java-timed-lyrics

Adds timed YouTube lyrics and optional Genius fallback. It is not included by default because prior testing failed against this runtime, and the LavaLyrics bridge mode conflicts with running the main plugin at the same time.

## Standalone JioSaavn Plugin

Repository: https://github.com/bongo-devs/jiosaavn-plugin

The advertised Maven host did not resolve during validation, so this is rejected from stable. Keep JioSaavn through LavaSrc instead.

## soundy

Repository: https://github.com/infnibor/soundy

Adds a SoundCloud source plugin for Lavalink and exposes `scsearch:` plus SoundCloud URL handling. It is not in the stable profile because Lavalink already has SoundCloud, OskarLink already includes discovery-go for SoundCloud Go+, and `scsearch:` ownership can collide.

The README advertises:

```yaml
lavalink:
  plugins:
    - dependency: "com.waris4ly.soundy:plugin:1.0.0"
      repository: "https://maven.lavalink.dev/releases"

plugins:
  soundy:
    enabled: true
```

As of this pass, the published jar URL for that coordinate returned `404`, so treat it as build-from-source until the artifact is published.

## Rule

Do not add experimental source plugins to the stable egg until all of these pass:

- Lavalink starts and prints `Lavalink is ready to accept connections.`
- Plugin jars are downloaded without empty or stale files.
- A bot opens a websocket connection.
- Real loads work for `ytsearch:`, `ytmsearch:`, `scsearch:`, and one URL from each new source.
