import http from "node:http";
import { resolveIdentifier } from "./resolver.mjs";
import { listSourceDefinitions } from "./source-registry.mjs";
import { getSourceCatalog } from "./source-catalog.mjs";
import { inspectWithYtDlp } from "./ytdlp.mjs";

function sendJson(response, status, payload) {
  const body = JSON.stringify(payload, null, 2);
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  response.end(body);
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 65536) {
        reject(new Error("request body too large"));
        request.destroy();
      }
    });
    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("invalid json body"));
      }
    });
    request.on("error", reject);
  });
}

async function handleRequest(request, response) {
  const url = new URL(request.url || "/", "http://localhost");

  try {
    if (request.method === "GET" && url.pathname === "/health") {
      sendJson(response, 200, {
        ok: true,
        service: "oskar-source-gateway",
        version: "0.1.0"
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/sources") {
      const limit = Number.parseInt(url.searchParams.get("limit") || "300", 10);
      const catalog = await getSourceCatalog();
      sendJson(response, 200, {
        ...catalog,
        extractors: catalog.extractors.slice(0, Math.max(0, limit))
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/registry") {
      sendJson(response, 200, {
        count: listSourceDefinitions().length,
        sources: listSourceDefinitions()
      });
      return;
    }

    if ((request.method === "GET" || request.method === "POST") && url.pathname === "/resolve") {
      const body = request.method === "POST" ? await readBody(request) : {};
      const query = body.query || body.identifier || url.searchParams.get("query") || url.searchParams.get("identifier");
      const source = body.source || url.searchParams.get("source") || "auto";
      const resolved = resolveIdentifier(query, { source });
      sendJson(response, 200, resolved);
      return;
    }

    if (request.method === "POST" && url.pathname === "/inspect") {
      const body = await readBody(request);
      const identifier = body.identifier || body.url;
      if (!identifier) {
        sendJson(response, 400, { ok: false, error: "identifier is required" });
        return;
      }
      const inspected = await inspectWithYtDlp(identifier);
      sendJson(response, 200, { ok: true, ...inspected });
      return;
    }

    sendJson(response, 404, {
      ok: false,
      error: "not found"
    });
  } catch (error) {
    sendJson(response, 400, {
      ok: false,
      error: error.message
    });
  }
}

export function createServer() {
  return http.createServer((request, response) => {
    handleRequest(request, response);
  });
}

export function startServer({ port = 2444, host = "0.0.0.0" } = {}) {
  const server = createServer();
  server.listen(port, host, () => {
    console.log(`[OskarSource] listening on http://${host}:${port}`);
  });
  return server;
}
