import {
  getFallbackPrefix,
  getSourceDefinition,
  listSourceDefinitions,
  normalizeSource
} from "./source-registry.mjs";

export const passThroughPrefixes = [
  "ytsearch:",
  "ytmsearch:",
  "scsearch:",
  "spsearch:",
  "sprec:",
  "amsearch:",
  "dzsearch:",
  "dzisrc:",
  "dzrec:",
  "ymsearch:",
  "ymrec:",
  "vksearch:",
  "vkrec:",
  "tdsearch:",
  "tdrec:",
  "qbsearch:",
  "qbisrc:",
  "qbrec:",
  "jssearch:",
  "jsrec:",
  "gaanasearch:",
  "gnsearch:",
  "admsearch:",
  "amzsearch:",
  "szsearch:",
  "pdsearch:",
  "jfsearch:",
  "ftts://",
  "http://",
  "https://"
];

export { normalizeSource };

export function isPassThroughIdentifier(value) {
  const identifier = String(value || "").trim().toLowerCase();
  return passThroughPrefixes.some((prefix) => identifier.startsWith(prefix));
}

export function isUrl(value) {
  try {
    const url = new URL(String(value || "").trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function encodeTts(text) {
  return encodeURIComponent(text).replace(/%20/g, "%20");
}

function makeIdentifier(sourceDefinition, query) {
  const source = typeof sourceDefinition === "string" ? getSourceDefinition(sourceDefinition) : sourceDefinition;

  if (!source) {
    return null;
  }

  if (source.strategy === "tts") {
    return `${source.prefix}${encodeTts(query)}`;
  }

  if (source.strategy === "native-prefix") {
    return `${source.prefix}${query}`;
  }

  if (source.strategy === "mirror-search") {
    const prefix = getFallbackPrefix(source.fallbackSource || "youtube");
    const hint = source.mirrorHint ? ` ${source.mirrorHint}` : "";
    return `${prefix}${query}${hint}`;
  }

  return query;
}

export function buildAlternates(query) {
  return listSourceDefinitions()
    .filter((source) => source.id !== "generic")
    .map((source) => ({
      source: source.id,
      label: source.label,
      strategy: source.strategy,
      identifier: makeIdentifier(source, query),
      requiresCredentials: Boolean(source.requiresCredentials),
      requiresPlugin: source.requiresPlugin || null,
      experimental: Boolean(source.experimental)
    }));
}

export function resolveIdentifier(input, options = {}) {
  const query = String(input ?? options.query ?? "").trim();
  if (!query) {
    throw new Error("query is required");
  }

  const requestedSource = normalizeSource(options.source);

  if (isPassThroughIdentifier(query) || isUrl(query)) {
    return {
      input: query,
      source: "passthrough",
      kind: isUrl(query) ? "url" : "prefixed",
      identifier: query,
      requiresCredentials: false,
      alternates: []
    };
  }

  const source = requestedSource === "auto" ? getSourceDefinition("youtube") : getSourceDefinition(requestedSource);

  if (!source) {
    throw new Error(`unsupported source: ${requestedSource}`);
  }

  const identifier = makeIdentifier(source, query);

  return {
    input: query,
    source: source.id,
    label: source.label,
    kind: source.strategy === "tts" ? "tts" : source.strategy === "mirror-search" ? "mirror" : "search",
    strategy: source.strategy,
    identifier,
    playback: source.playback || "unknown",
    requiresCredentials: Boolean(source.requiresCredentials),
    requiresPlugin: source.requiresPlugin || null,
    experimental: Boolean(source.experimental),
    urlSupport: source.urlSupport || null,
    alternates: buildAlternates(query)
  };
}
