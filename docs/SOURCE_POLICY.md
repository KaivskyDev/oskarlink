# Source Policy

OskarLink optimizes for working playback, not inflated marketing counts.

## Stable Source Rules

A source can be stable when:

- it does not block node startup without credentials,
- required credentials are variables, not committed files,
- the plugin artifact is reachable,
- it does not claim the same search prefix as another enabled plugin,
- it passes real `/v4/loadtracks` tests.

## Optional Source Rules

A source is optional when:

- it needs account tokens,
- it is region-dependent,
- it can be disabled without affecting core playback.

## Experimental Source Rules

A source is experimental when:

- the artifact is unavailable,
- it must be built from source,
- it collides with an existing prefix,
- it previously failed startup,
- it touches DRM or internal/private APIs.

## Mirror Source Rules

Mirror sources are allowed only when the node resolves metadata and plays audio
through an already configured provider such as YouTube, YouTube Music, Deezer,
JioSaavn, Gaana, Audiomack, Bandcamp, SoundCloud, or yt-dlp. Do not treat mirror
metadata as proof that the original platform is being streamed directly.

If two plugins claim the same search prefix, keep only one enabled in a node.
PulseLink is rejected for this distribution because it does not work with the
current lavaclient integration and overlaps LavaSrc source ownership.

## Amazon Music

Amazon Music is research-only in OskarLink. Metadata/search can be investigated. DRM bypass playback and Widevine key handling do not belong in the stable distribution.
