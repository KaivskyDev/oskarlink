# Upload Guide

## GitHub Folder

Upload only this folder:

```text
upload-to-github/OskarLink
```

The current GitHub repository is:

```text
https://github.com/KaivskyDev/oskarlink
```

## Do Not Upload

Do not upload:

```text
application.yml
logs/
plugins/
bin/
OskarLink.jar
*.jar
*.env
```

## Pterodactyl Raw URL

After pushing to GitHub, set this variable in the egg/server:

```text
OSKARLINK_RAW_BASE_URL=https://raw.githubusercontent.com/KaivskyDev/oskarlink/main
```

Then reinstall. The egg will download:

```text
config/application.example.yml
```

from your GitHub repo.

For the broader lavaclient-compatible OskarSource Stack config, set:

```text
OSKARLINK_CONFIG_URL=https://raw.githubusercontent.com/KaivskyDev/oskarlink/main/config/application.lavaclient-max.yml
```

Use this only after pushing `config/application.lavaclient-max.yml` to GitHub.

## Local Secrets

Set secrets in Pterodactyl variables, not in GitHub:

- `LAVALINK_PASSWORD`
- `YOUTUBE_OAUTH_REFRESH_TOKEN`
- `YOUTUBE_POT_TOKEN`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_SP_DC`
- `APPLE_MUSIC_TOKEN`
- `DEEZER_MASTER_KEY`
- `DEEZER_ARL`
- `YANDEX_ACCESS_TOKEN`
- `VK_USER_TOKEN`
- `TIDAL_TOKEN`
- `QOBUZ_USER_OAUTH_TOKEN`
- `JIOSAAVN_SECRET`
- `JELLYFIN_PASSWORD`
- `SOUNDCLOUD_OAUTH_TOKEN`
