# Architecture

OskarLink has three layers.

## Stable Core

Stable core is Lavalink `4.2.2` plus the pinned plugin stack in `config/application.example.yml`.

This layer must boot reliably, download every artifact, and pass smoke tests before it changes.

## Broad Source Layer

Broad source coverage comes from yt-dlp. This is the only sane way to reach hundreds or thousands of supported URLs without installing dozens of fragile Lavalink plugins.

OskarLink keeps yt-dlp as an external helper at `./bin/yt-dlp`, so it can be updated independently from Lavalink.

## OskarSource Stack

OskarSource Stack is the lavaclient-compatible replacement for PulseLink. It is not a new jar. It is a controlled LavaSrc provider order plus yt-dlp and feature flags.

Files:

- `profiles/lavaclient-oskar-source-stack.yml`
- `config/application.lavaclient-max.yml`
- `docs/LAVACLIENT_COMPAT.md`
- `companions/oskar-source-gateway`

This keeps the bot on standard Lavalink `/v4/loadtracks` behavior while still giving broad source coverage.

The gateway is OskarLink-owned code. It maps source choices to normal Lavalink
identifiers and exposes the yt-dlp extractor catalog without adding another
Lavalink plugin conflict.

## Companion Layer

Companions are side services:

- `yt-cipher` for YouTube signature deciphering.
- `yt-dlp-web-ui` for admin downloads and monitoring.
- Future metadata resolvers such as Amazon Music metadata-only services.

Companions should not block Lavalink startup. If a companion is down, the core node should still boot and serve the remaining sources.

## Experimental Layer

Experimental plugins live in `profiles/` and are documented in `docs/EXPERIMENTAL_PLUGINS.md`.

They are not merged into stable until they pass startup, artifact, and real load tests.

## Release Rule

Every stable change needs:

- JSON validation for the egg.
- YAML validation for every profile.
- artifact availability check.
- no committed secrets.
- live `/v4/loadtracks` smoke test after deployment.
