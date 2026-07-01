import test from "node:test";
import assert from "node:assert/strict";
import { resolveIdentifier, isPassThroughIdentifier } from "../src/resolver.mjs";
import { listSourceDefinitions } from "../src/source-registry.mjs";

test("passes through Lavalink identifiers", () => {
  const resolved = resolveIdentifier("ytsearch:alan walker faded");
  assert.equal(resolved.identifier, "ytsearch:alan walker faded");
  assert.equal(resolved.kind, "prefixed");
});

test("passes through URLs", () => {
  const resolved = resolveIdentifier("https://www.youtube.com/watch?v=60ItHLz5WEA");
  assert.equal(resolved.identifier, "https://www.youtube.com/watch?v=60ItHLz5WEA");
  assert.equal(resolved.kind, "url");
});

test("maps explicit sources to Lavalink prefixes", () => {
  assert.equal(resolveIdentifier("alan walker", { source: "spotify" }).identifier, "spsearch:alan walker");
  assert.equal(resolveIdentifier("alan walker", { source: "apple_music" }).identifier, "amsearch:alan walker");
  assert.equal(resolveIdentifier("GBARL9300135", { source: "qobuz_isrc" }).identifier, "qbisrc:GBARL9300135");
});

test("maps PulseLink-style mirror sources without requiring PulseLink", () => {
  assert.equal(resolveIdentifier("alan walker", { source: "amazonmusic" }).identifier, "ytmsearch:alan walker amazon music");
  assert.equal(resolveIdentifier("alan walker", { source: "audiomack" }).identifier, "ytmsearch:alan walker audiomack");
  assert.equal(resolveIdentifier("alan walker", { source: "shazam" }).identifier, "ytmsearch:alan walker shazam");
  assert.equal(resolveIdentifier("alan walker", { source: "pandora" }).identifier, "ytmsearch:alan walker pandora");
});

test("maps extended long-tail sources through stable fallbacks", () => {
  assert.equal(resolveIdentifier("live set", { source: "beatport" }).identifier, "ytmsearch:live set beatport");
  assert.equal(resolveIdentifier("lecture", { source: "ted" }).identifier, "ytsearch:lecture ted talk");
  assert.equal(resolveIdentifier("clip", { source: "instagram" }).identifier, "ytsearch:clip instagram");
  assert.equal(resolveIdentifier("archive audio", { source: "archiveorg" }).identifier, "ytsearch:archive audio internet archive");
});

test("defaults text queries to YouTube search", () => {
  const resolved = resolveIdentifier("alan walker");
  assert.equal(resolved.identifier, "ytsearch:alan walker");
  assert.equal(resolved.source, "youtube");
  assert.ok(resolved.alternates.length >= 60);
});

test("builds Flowery TTS identifiers", () => {
  const resolved = resolveIdentifier("hello world", { source: "flowerytts" });
  assert.equal(resolved.identifier, "ftts://hello%20world");
  assert.equal(resolved.kind, "tts");
});

test("recognizes pass-through prefixes", () => {
  assert.equal(isPassThroughIdentifier("jssearch:track"), true);
  assert.equal(isPassThroughIdentifier("admsearch:track"), true);
  assert.equal(isPassThroughIdentifier("plain track"), false);
});

test("registry exposes a broad curated source set", () => {
  const sources = listSourceDefinitions();
  assert.ok(sources.length >= 60);
  assert.ok(sources.some((source) => source.id === "applemusic"));
  assert.ok(sources.some((source) => source.id === "amazonmusic"));
  assert.ok(sources.some((source) => source.id === "archive"));
});
