export const sourceDefinitions = Object.freeze([
  {
    id: "youtube",
    label: "YouTube",
    aliases: ["yt", "youtube_video"],
    strategy: "native-prefix",
    prefix: "ytsearch:",
    playback: "direct",
    stable: true
  },
  {
    id: "youtubemusic",
    label: "YouTube Music",
    aliases: ["youtube_music", "ytmusic", "ytm"],
    strategy: "native-prefix",
    prefix: "ytmsearch:",
    playback: "direct",
    stable: true
  },
  {
    id: "soundcloud",
    label: "SoundCloud",
    aliases: ["sc"],
    strategy: "native-prefix",
    prefix: "scsearch:",
    playback: "direct",
    stable: true
  },
  {
    id: "spotify",
    label: "Spotify",
    aliases: ["sp"],
    strategy: "native-prefix",
    prefix: "spsearch:",
    playback: "mirror",
    requiresCredentials: true,
    stable: true
  },
  {
    id: "applemusic",
    label: "Apple Music",
    aliases: ["apple_music", "apple", "am"],
    strategy: "native-prefix",
    prefix: "amsearch:",
    playback: "mirror",
    requiresCredentials: true,
    stable: true
  },
  {
    id: "deezer",
    label: "Deezer",
    aliases: ["dz"],
    strategy: "native-prefix",
    prefix: "dzsearch:",
    playback: "direct",
    requiresCredentials: true,
    stable: true
  },
  {
    id: "deezer_isrc",
    label: "Deezer ISRC",
    aliases: ["dzisrc"],
    strategy: "native-prefix",
    prefix: "dzisrc:",
    playback: "direct",
    requiresCredentials: true,
    stable: true
  },
  {
    id: "yandexmusic",
    label: "Yandex Music",
    aliases: ["yandex", "ym"],
    strategy: "native-prefix",
    prefix: "ymsearch:",
    playback: "direct",
    requiresCredentials: true,
    regionDependent: true,
    stable: true
  },
  {
    id: "vkmusic",
    label: "VK Music",
    aliases: ["vk", "vk_music"],
    strategy: "native-prefix",
    prefix: "vksearch:",
    playback: "direct",
    requiresCredentials: true,
    regionDependent: true,
    stable: true
  },
  {
    id: "tidal",
    label: "Tidal",
    aliases: ["td"],
    strategy: "native-prefix",
    prefix: "tdsearch:",
    playback: "mirror",
    requiresCredentials: true,
    stable: true
  },
  {
    id: "qobuz",
    label: "Qobuz",
    aliases: ["qb"],
    strategy: "native-prefix",
    prefix: "qbsearch:",
    playback: "direct",
    requiresCredentials: true,
    stable: true
  },
  {
    id: "qobuz_isrc",
    label: "Qobuz ISRC",
    aliases: ["qbisrc"],
    strategy: "native-prefix",
    prefix: "qbisrc:",
    playback: "direct",
    requiresCredentials: true,
    stable: true
  },
  {
    id: "jiosaavn",
    label: "JioSaavn",
    aliases: ["js", "saavn"],
    strategy: "native-prefix",
    prefix: "jssearch:",
    playback: "direct",
    requiresCredentials: true,
    regionDependent: true,
    stable: true
  },
  {
    id: "flowerytts",
    label: "Flowery TTS",
    aliases: ["tts", "flowery"],
    strategy: "tts",
    prefix: "ftts://",
    playback: "direct",
    stable: true
  },
  {
    id: "jellyfin",
    label: "Jellyfin",
    aliases: ["jf"],
    strategy: "native-prefix",
    prefix: "jfsearch:",
    playback: "direct",
    requiresCredentials: true,
    stable: true
  },
  {
    id: "gaana",
    label: "Gaana",
    aliases: ["gn"],
    strategy: "native-prefix",
    prefix: "gaanasearch:",
    playback: "direct",
    requiresPlugin: "gaana-plugin",
    experimental: true
  },
  {
    id: "amazonmusic",
    label: "Amazon Music",
    aliases: ["amazon", "amazon_music", "amz"],
    strategy: "mirror-search",
    mirrorHint: "amazon music",
    fallbackSource: "youtubemusic",
    playback: "mirror",
    stable: true
  },
  {
    id: "audiomack",
    label: "Audiomack",
    aliases: ["adm"],
    strategy: "mirror-search",
    mirrorHint: "audiomack",
    fallbackSource: "youtubemusic",
    playback: "mirror",
    urlSupport: "yt-dlp",
    stable: true
  },
  {
    id: "shazam",
    label: "Shazam",
    aliases: ["sz"],
    strategy: "mirror-search",
    mirrorHint: "shazam",
    fallbackSource: "youtubemusic",
    playback: "mirror",
    stable: true
  },
  {
    id: "pandora",
    label: "Pandora",
    aliases: ["pd"],
    strategy: "mirror-search",
    mirrorHint: "pandora",
    fallbackSource: "youtubemusic",
    playback: "mirror",
    stable: true
  },
  {
    id: "bandcamp",
    label: "Bandcamp",
    aliases: ["bc"],
    strategy: "mirror-search",
    mirrorHint: "bandcamp",
    fallbackSource: "youtube",
    playback: "direct-url",
    urlSupport: "native"
  },
  {
    id: "vimeo",
    label: "Vimeo",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "vimeo",
    fallbackSource: "youtube",
    playback: "direct-url",
    urlSupport: "native"
  },
  {
    id: "twitch",
    label: "Twitch",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "twitch",
    fallbackSource: "youtube",
    playback: "direct-url",
    urlSupport: "native"
  },
  {
    id: "niconico",
    label: "NicoNico",
    aliases: ["nico"],
    strategy: "mirror-search",
    mirrorHint: "niconico",
    fallbackSource: "youtube",
    playback: "direct-url",
    urlSupport: "native"
  },
  {
    id: "bilibili",
    label: "Bilibili",
    aliases: ["bili"],
    strategy: "mirror-search",
    mirrorHint: "bilibili",
    fallbackSource: "youtube",
    playback: "direct-url",
    requiresPlugin: "lavabili",
    stable: true
  },
  {
    id: "mixcloud",
    label: "Mixcloud",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "mixcloud",
    fallbackSource: "youtube",
    playback: "direct-url",
    requiresPlugin: "DuncteBot Skybot or yt-dlp URL",
    experimental: true
  },
  {
    id: "reddit",
    label: "Reddit",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "reddit",
    fallbackSource: "youtube",
    playback: "direct-url",
    requiresPlugin: "DuncteBot Skybot or yt-dlp URL",
    experimental: true
  },
  {
    id: "tiktok",
    label: "TikTok",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "tiktok",
    fallbackSource: "youtube",
    playback: "direct-url",
    urlSupport: "yt-dlp",
    experimental: true
  },
  {
    id: "pixeldrain",
    label: "Pixeldrain",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "pixeldrain",
    fallbackSource: "youtube",
    playback: "direct-url",
    requiresPlugin: "DuncteBot Skybot or direct HTTP URL",
    experimental: true
  },
  {
    id: "napster",
    label: "Napster",
    aliases: ["rhapsody"],
    strategy: "mirror-search",
    mirrorHint: "napster",
    fallbackSource: "youtubemusic",
    playback: "mirror"
  },
  {
    id: "iheart",
    label: "iHeart",
    aliases: ["iheartradio"],
    strategy: "mirror-search",
    mirrorHint: "iheartradio",
    fallbackSource: "youtube",
    playback: "mirror"
  },
  {
    id: "anghami",
    label: "Anghami",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "anghami",
    fallbackSource: "youtubemusic",
    playback: "mirror"
  },
  {
    id: "boomplay",
    label: "Boomplay",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "boomplay",
    fallbackSource: "youtubemusic",
    playback: "mirror"
  },
  {
    id: "bandlab",
    label: "BandLab",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "bandlab",
    fallbackSource: "youtube",
    playback: "mirror"
  },
  {
    id: "beatport",
    label: "Beatport",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "beatport",
    fallbackSource: "youtubemusic",
    playback: "mirror"
  },
  {
    id: "beatsource",
    label: "Beatsource",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "beatsource",
    fallbackSource: "youtubemusic",
    playback: "mirror"
  },
  {
    id: "lastfm",
    label: "Last.fm",
    aliases: ["last_fm"],
    strategy: "mirror-search",
    mirrorHint: "lastfm",
    fallbackSource: "youtubemusic",
    playback: "mirror"
  },
  {
    id: "musixmatch",
    label: "Musixmatch",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "musixmatch",
    fallbackSource: "youtubemusic",
    playback: "mirror"
  },
  {
    id: "genius",
    label: "Genius",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "genius lyrics",
    fallbackSource: "youtubemusic",
    playback: "mirror"
  },
  {
    id: "dailymotion",
    label: "Dailymotion",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "dailymotion",
    fallbackSource: "youtube",
    playback: "direct-url",
    urlSupport: "yt-dlp"
  },
  {
    id: "facebook",
    label: "Facebook",
    aliases: ["fb"],
    strategy: "mirror-search",
    mirrorHint: "facebook",
    fallbackSource: "youtube",
    playback: "direct-url",
    urlSupport: "yt-dlp"
  },
  {
    id: "instagram",
    label: "Instagram",
    aliases: ["ig"],
    strategy: "mirror-search",
    mirrorHint: "instagram",
    fallbackSource: "youtube",
    playback: "direct-url",
    urlSupport: "yt-dlp"
  },
  {
    id: "x",
    label: "X / Twitter",
    aliases: ["twitter"],
    strategy: "mirror-search",
    mirrorHint: "twitter",
    fallbackSource: "youtube",
    playback: "direct-url",
    urlSupport: "yt-dlp"
  },
  {
    id: "odysee",
    label: "Odysee",
    aliases: ["lbry"],
    strategy: "mirror-search",
    mirrorHint: "odysee",
    fallbackSource: "youtube",
    playback: "direct-url",
    urlSupport: "yt-dlp"
  },
  {
    id: "rumble",
    label: "Rumble",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "rumble",
    fallbackSource: "youtube",
    playback: "direct-url",
    urlSupport: "yt-dlp"
  },
  {
    id: "peertube",
    label: "PeerTube",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "peertube",
    fallbackSource: "youtube",
    playback: "direct-url",
    urlSupport: "yt-dlp"
  },
  {
    id: "archive",
    label: "Internet Archive",
    aliases: ["archiveorg", "internet_archive"],
    strategy: "mirror-search",
    mirrorHint: "internet archive",
    fallbackSource: "youtube",
    playback: "direct-url",
    urlSupport: "yt-dlp"
  },
  {
    id: "kick",
    label: "Kick",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "kick stream",
    fallbackSource: "youtube",
    playback: "direct-url",
    urlSupport: "yt-dlp"
  },
  {
    id: "soundgasm",
    label: "Soundgasm",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "soundgasm",
    fallbackSource: "youtube",
    playback: "direct-url",
    requiresPlugin: "DuncteBot Skybot or yt-dlp URL",
    experimental: true
  },
  {
    id: "clypit",
    label: "Clyp.it",
    aliases: ["clyp"],
    strategy: "mirror-search",
    mirrorHint: "clypit",
    fallbackSource: "youtube",
    playback: "direct-url",
    requiresPlugin: "DuncteBot Skybot",
    experimental: true
  },
  {
    id: "ocremix",
    label: "OC ReMix",
    aliases: ["ocr"],
    strategy: "mirror-search",
    mirrorHint: "ocremix",
    fallbackSource: "youtube",
    playback: "direct-url",
    requiresPlugin: "DuncteBot Skybot",
    experimental: true
  },
  {
    id: "getyarn",
    label: "GetYarn",
    aliases: ["yarn"],
    strategy: "mirror-search",
    mirrorHint: "getyarn",
    fallbackSource: "youtube",
    playback: "direct-url",
    requiresPlugin: "DuncteBot Skybot",
    experimental: true
  },
  {
    id: "tumblr",
    label: "Tumblr",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "tumblr",
    fallbackSource: "youtube",
    playback: "direct-url",
    requiresPlugin: "DuncteBot Skybot",
    experimental: true
  },
  {
    id: "streamdeckaudio",
    label: "StreamDeck Audio",
    aliases: ["streamdeck"],
    strategy: "mirror-search",
    mirrorHint: "streamdeck audio",
    fallbackSource: "youtube",
    playback: "direct-url",
    requiresPlugin: "DuncteBot Skybot",
    experimental: true
  },
  {
    id: "ted",
    label: "TED",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "ted talk",
    fallbackSource: "youtube",
    playback: "direct-url",
    urlSupport: "yt-dlp"
  },
  {
    id: "coursera",
    label: "Coursera",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "coursera",
    fallbackSource: "youtube",
    playback: "direct-url",
    urlSupport: "yt-dlp"
  },
  {
    id: "soundclick",
    label: "SoundClick",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "soundclick",
    fallbackSource: "youtube",
    playback: "mirror",
    urlSupport: "yt-dlp"
  },
  {
    id: "audius",
    label: "Audius",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "audius",
    fallbackSource: "youtubemusic",
    playback: "mirror",
    urlSupport: "yt-dlp"
  },
  {
    id: "hearthis",
    label: "HearThis.at",
    aliases: ["hearthisat"],
    strategy: "mirror-search",
    mirrorHint: "hearthis",
    fallbackSource: "youtube",
    playback: "direct-url",
    urlSupport: "yt-dlp"
  },
  {
    id: "mixupload",
    label: "Mixupload",
    aliases: [],
    strategy: "mirror-search",
    mirrorHint: "mixupload",
    fallbackSource: "youtube",
    playback: "mirror",
    urlSupport: "yt-dlp"
  },
  {
    id: "applepodcasts",
    label: "Apple Podcasts",
    aliases: ["apple_podcasts"],
    strategy: "mirror-search",
    mirrorHint: "apple podcast",
    fallbackSource: "youtube",
    playback: "mirror"
  },
  {
    id: "spotifyepisodes",
    label: "Spotify Episodes",
    aliases: ["spotify_episode", "spotify_podcast"],
    strategy: "mirror-search",
    mirrorHint: "spotify episode",
    fallbackSource: "youtube",
    playback: "mirror",
    requiresCredentials: true
  },
  {
    id: "generic",
    label: "Generic URL",
    aliases: ["url", "direct"],
    strategy: "passthrough",
    playback: "direct-url",
    urlSupport: "yt-dlp"
  }
]);

const sourceByAlias = new Map();

for (const source of sourceDefinitions) {
  sourceByAlias.set(source.id, source);
  for (const alias of source.aliases || []) {
    sourceByAlias.set(alias, source);
  }
}

export function normalizeSource(source) {
  return String(source || "auto").trim().toLowerCase().replace(/[\s-]+/g, "_");
}

export function getSourceDefinition(source) {
  return sourceByAlias.get(normalizeSource(source));
}

export function listSourceDefinitions() {
  return sourceDefinitions.map((source) => ({ ...source }));
}

export function getFallbackPrefix(source) {
  const fallback = getSourceDefinition(source || "youtube");
  return fallback?.prefix || "ytsearch:";
}
