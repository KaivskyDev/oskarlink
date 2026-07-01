# Lavaclient Compatibility

OskarLink should behave like a normal Lavalink v4 node for `lavaclient`.
The bot should keep using the standard REST path:

```ts
const results = await lavalink.rest.loadTracks("ytsearch:alan walker faded");
```

## OskarSource Stack

PulseLink is rejected because it does not work with the current lavaclient
integration and it overlaps LavaSrc. OskarSource Stack is the replacement
strategy:

- no extra PulseLink jar,
- no custom client-side protocol,
- no duplicate prefix owner,
- normal `/v4/loadtracks` identifiers only,
- yt-dlp remains the broad URL layer,
- LavaSrc remains the music-service metadata and resolver layer,
- optional sources are guarded by Pterodactyl variables.

The overlay profile is:

```text
profiles/lavaclient-oskar-source-stack.yml
```

The generated full config is:

```text
config/application.lavaclient-max.yml
```

Use the full config through:

```text
OSKARLINK_CONFIG_URL=https://raw.githubusercontent.com/KaivskyDev/oskarlink/main/config/application.lavaclient-max.yml
```

## Source Tiers

Always-on sources:

- `ytsearch:`
- `ytmsearch:`
- `scsearch:`
- YouTube URLs
- SoundCloud URLs
- Vimeo/Bandcamp/Twitch/Nico/http URLs where Lavalink or yt-dlp can resolve them
- `ftts://` Flowery TTS

Optional credential-backed sources:

- `spsearch:` Spotify
- `amsearch:` Apple Music
- `dzsearch:` and `dzisrc:` Deezer
- `ymsearch:` Yandex Music
- `vksearch:` VK Music
- `tdsearch:` Tidal
- `qbsearch:` and `qbisrc:` Qobuz
- `jssearch:` JioSaavn
- Jellyfin through `jfsearch:`
- SoundCloud Go+ through discovery-go

## Testing

Baseline strict test:

```powershell
.\scripts\test-loadtracks.ps1 -BaseUrl "http://127.0.0.1:2333" -Password "your-password" -IdentifierFile ".\source-tests\smoke-identifiers.txt"
```

Broad optional test:

```powershell
.\scripts\test-loadtracks.ps1 -BaseUrl "http://127.0.0.1:2333" -Password "your-password" -IdentifierFile ".\source-tests\lavaclient-max-identifiers.txt" -AllowFailures
```

Promote an optional source only after it returns a non-empty load result on the
real deployed node.
