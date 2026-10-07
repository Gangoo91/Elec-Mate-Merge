/**
 * Serve a production build the way Vercel does, for performance runs (ELE-1912).
 *
 *   node scripts/perf/serve-dist.mjs [dist] [port=4173]
 *
 * `vite preview` sends `Cache-Control: no-cache` for every asset, so a warm
 * reload re-validates every chunk (dozens of 304 round trips) — production
 * serves /assets/* as `immutable` (vercel.json) and never asks again. This
 * server matches production: immutable hashed assets, the pre-compressed
 * .br/.gz files the build writes, and the SPA fallback to index.html.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || 'dist');
const port = Number(process.argv[3] || 4173);
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.wasm': 'application/wasm',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

function send(req, res, file, cache) {
  const ext = path.extname(file);
  const accept = String(req.headers['accept-encoding'] || '');
  let body = file;
  let encoding = null;
  if (accept.includes('br') && fs.existsSync(file + '.br')) {
    body = file + '.br';
    encoding = 'br';
  } else if (accept.includes('gzip') && fs.existsSync(file + '.gz')) {
    body = file + '.gz';
    encoding = 'gzip';
  }
  const headers = {
    'Content-Type': TYPES[ext] || 'application/octet-stream',
    'Cache-Control': cache,
    'Content-Length': fs.statSync(body).size,
    Vary: 'Accept-Encoding',
  };
  if (encoding) headers['Content-Encoding'] = encoding;
  res.writeHead(200, headers);
  if (req.method === 'HEAD') return res.end();
  fs.createReadStream(body).pipe(res);
}

http
  .createServer((req, res) => {
    const url = new URL(req.url || '/', 'http://x');
    const rel = decodeURIComponent(url.pathname).replace(/^\/+/, '');
    const file = path.join(root, rel);
    if (!file.startsWith(root)) {
      res.writeHead(403).end();
      return;
    }
    if (rel && fs.existsSync(file) && fs.statSync(file).isFile()) {
      const cache = rel.startsWith('assets/') ? 'public, max-age=31536000, immutable' : 'no-cache';
      return send(req, res, file, cache);
    }
    if (rel.startsWith('assets/')) {
      res.writeHead(404).end();
      return;
    }
    send(req, res, path.join(root, 'index.html'), 'no-cache');
  })
  .listen(port, () => console.log(`[serve-dist] ${root} on http://localhost:${port}`));
