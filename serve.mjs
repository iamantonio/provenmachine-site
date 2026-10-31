// Local preview that mimics GitHub Pages clean URLs (/x → /x.html, /dir/ → /dir/index.html).
// Usage: node serve.mjs [port]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "public");
const port = Number(process.argv[2] || 4321);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".xml": "application/xml", ".txt": "text/plain" };

async function resolve(path) {
  const base = join(root, normalize(decodeURIComponent(path)).replace(/^(\.\.[/\\])+/, ""));
  for (const c of [base, base + ".html", join(base, "index.html")]) {
    try { if ((await stat(c)).isFile()) return c; } catch {}
  }
  return null;
}

createServer(async (req, res) => {
  const path = new URL(req.url, "http://x").pathname;
  const file = await resolve(path);
  const target = file || join(root, "404.html");
  res.writeHead(file ? 200 : 404, { "content-type": types[extname(target)] || "application/octet-stream" });
  res.end(await readFile(target));
}).listen(port, () => console.log(`http://localhost:${port}`));
