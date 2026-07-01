# Security

## Secrets

Never commit:

- Lavalink passwords,
- OAuth refresh tokens,
- Spotify secrets,
- `sp_dc` cookies,
- Deezer ARL,
- Yandex tokens,
- VK tokens,
- Tidal tokens,
- Qobuz tokens,
- JioSaavn secrets,
- Jellyfin credentials,
- SoundCloud OAuth tokens,
- Bilibili cookies,
- yt-cipher API tokens.

Use Pterodactyl variables or your host secret manager.

## Rotation

Rotate a secret immediately if it was:

- pasted into a chat,
- committed to GitHub,
- shown in screenshots,
- uploaded in logs,
- shared with another person.

## Network Exposure

Do not expose these publicly:

- Lavalink without strong password and firewall rules,
- yt-cipher without `API_TOKEN`,
- yt-dlp-web-ui without auth,
- Jellyfin credentials.

## Reports

Security fixes should prioritize:

1. leaked credentials,
2. public unauthenticated services,
3. broken updater scripts,
4. plugin supply-chain problems.

