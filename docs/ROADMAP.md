# Roadmap

## Phase 1: Stable Distribution

Status: done.

- Pinned Lavalink and plugin versions.
- Pterodactyl egg.
- GitHub-ready folder.
- yt-dlp source breadth.
- No secrets committed.

## Phase 2: Production Validation

Status: added.

- CI validation.
- artifact checks.
- secret scan.
- live doctor.
- loadtracks smoke tests.

## Phase 3: Source Expansion Without Collisions

Status: planned.

Candidates:

- soundy as a separate SoundCloud profile once the artifact is published or source build is automated.
- DuncteBot Skybot only in a sandbox node.
- Amazon Music metadata-only resolver that mirrors playback to legal direct providers.
- yt-cipher companion as an optional side service.

## Phase 4: OskarLink Engine

Status: research.

This would be a real fork or separate engine, not only a distribution:

- custom branding in runtime info,
- custom health endpoints,
- source router service,
- automatic source fallback scores,
- optional Rustalink evaluation,
- external metadata resolver API.

Do this only after the Lavalink-compatible distribution is stable under real bot traffic.

