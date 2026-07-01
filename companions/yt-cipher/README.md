# yt-cipher Companion

`yt-cipher` can help youtube-source when YouTube signature deciphering changes faster than the plugin can be updated.

Repository:

```text
https://github.com/infnibor/yt-cipher
```

## Runtime Variables

Set these in the yt-cipher service:

```text
API_TOKEN=change-this
PORT=8001
HOST=0.0.0.0
MAX_THREADS=2
PREPROCESSED_CACHE_SIZE=150
```

## OskarLink Config

Enable this block in `config/application.example.yml` or your live `application.yml`:

```yaml
plugins:
  youtube:
    remoteCipher:
      url: "http://YOUR_YT_CIPHER_HOST:8001"
      password: "change-this"
      userAgent: "OskarLink"
```

Keep yt-cipher private. If it is in another container, use the container network address, not `localhost`.

