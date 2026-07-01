import { execFile } from "node:child_process";

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

export async function inspectWithYtDlp(identifier, options = {}) {
  const ytdlp = options.ytdlp || process.env.OSKAR_SOURCE_YTDLP || "yt-dlp";
  const timeout = options.timeoutMs || 30000;
  const stdout = await execFilePromise(
    ytdlp,
    ["-q", "--no-warnings", "--skip-download", "--no-playlist", "-J", identifier],
    { timeout, windowsHide: true, maxBuffer: 1024 * 1024 * 8 }
  );

  const data = JSON.parse(stdout);
  return {
    title: data.title || null,
    extractor: data.extractor || data.extractor_key || null,
    webpageUrl: data.webpage_url || data.original_url || identifier,
    duration: data.duration || null,
    liveStatus: data.live_status || null,
    identifier: data.webpage_url || data.original_url || identifier
  };
}
