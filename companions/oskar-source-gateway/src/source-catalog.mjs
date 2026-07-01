import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

function execFilePromise(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    execFile(command, args, options, (error, stdout, stderr) => {
      if (error) {
        error.stderr = stderr;
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

function parseDocsCatalog(content) {
  const countMatch = content.match(/yt-dlp extractor count:\s*(\d+)/i);
  const extractors = [];

  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^- ([A-Za-z0-9][A-Za-z0-9_.:+-]*)$/);
    if (match) {
      extractors.push(match[1]);
    }
  }

  return {
    source: "docs-cache",
    count: countMatch ? Number.parseInt(countMatch[1], 10) : extractors.length,
    extractors
  };
}

async function readDocsFallback() {
  const docsUrl = new URL("../../../docs/SOURCES.md", import.meta.url);
  const content = await readFile(fileURLToPath(docsUrl), "utf8");
  return parseDocsCatalog(content);
}

export async function getSourceCatalog(options = {}) {
  const ytdlp = options.ytdlp || process.env.OSKAR_SOURCE_YTDLP || "yt-dlp";
  const timeout = options.timeoutMs || 15000;

  try {
    const stdout = await execFilePromise(ytdlp, ["--list-extractors"], {
      timeout,
      windowsHide: true
    });
    const extractors = stdout
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    return {
      source: "yt-dlp",
      count: extractors.length,
      extractors
    };
  } catch (error) {
    const fallback = await readDocsFallback();
    return {
      ...fallback,
      warning: `yt-dlp extractor list unavailable: ${error.message}`
    };
  }
}
