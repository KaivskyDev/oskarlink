import test from "node:test";
import assert from "node:assert/strict";
import { getSourceCatalog } from "../src/source-catalog.mjs";

test("falls back to repository source catalog when yt-dlp is unavailable", async () => {
  const catalog = await getSourceCatalog({ ytdlp: "definitely-not-ytdlp", timeoutMs: 1000 });
  assert.equal(catalog.source, "docs-cache");
  assert.ok(catalog.count >= 200);
  assert.ok(catalog.extractors.includes("YouTube"));
  assert.match(catalog.warning, /yt-dlp extractor list unavailable/);
});
