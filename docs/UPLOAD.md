# Upload Guide

## GitHub Folder

Upload only this folder:

```text
upload-to-github/OskarLink
```

You can rename the repository to `OskarLink`.

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
OSKARLINK_RAW_BASE_URL=https://raw.githubusercontent.com/YOUR_USERNAME/OskarLink/main
```

Then reinstall. The egg will download:

```text
config/application.example.yml
```

from your GitHub repo.

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

