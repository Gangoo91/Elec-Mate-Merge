#!/usr/bin/env node

/**
 * seo-prerender.mjs
 *
 * Real-browser pre-render for every SEO route.
 *
 * Pipeline:
 *   1. vite build (must have already run — produces dist/)
 *   2. generate-seo-html.mjs (fallback meta-only HTML per route)
 *   3. THIS SCRIPT — spawns vite preview, drives Chromium against every
 *      SEO route, captures the fully-hydrated DOM, writes it to
 *      dist/<route>/index.html (replacing the fallback).
 *
 * After this runs, the static HTML for every SEO route contains:
 *   - Correct <title>, <meta name=description>, <link rel=canonical>, OG
 *   - All JSON-LD schemas emitted by useSEO / <Helmet>
 *   - The fully rendered body content, H1, internal links
 *
 * That gives Googlebot, Bingbot, LLM crawlers (Perplexity / ClaudeBot /
 * GPTBot — none of which reliably execute JS), and social unfurlers
 * (Twitterbot / facebookexternalhit / LinkedInBot) the complete page.
 *
 * Usage:
 *   node scripts/seo-prerender.mjs                # all routes
 *   node scripts/seo-prerender.mjs --limit 20     # canary: first 20 routes
 *   node scripts/seo-prerender.mjs --route /tools/adiabatic-equation-calculator
 *   node scripts/seo-prerender.mjs --concurrency 3   # default 5
 *
 * Output:
 *   dist/<path>/index.html for each successful route
 *   dist/_seo-prerender-manifest.json summary
 */

import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import {
  mkdirSync,
  writeFileSync,
  readFileSync,
  existsSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const SEO_ROUTES_FILE = join(ROOT, 'src/routes/SEORoutes.tsx');

const args = process.argv.slice(2);
const argValue = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : null;
};
const PORT = Number(argValue('--port')) || 4173;
const CONCURRENCY = Number(argValue('--concurrency')) || 5;
const LIMIT = argValue('--limit') ? Number(argValue('--limit')) : null;
const SINGLE_ROUTE = argValue('--route');
const VERBOSE = args.includes('--verbose');

const NAV_TIMEOUT_MS = 45_000;
const HYDRATION_TIMEOUT_MS = 20_000;
const POST_HYDRATION_WAIT_MS = 700; // give JSON-LD injection a beat to settle

// Hard wall-clock budget. With ~1,400 routes a pathological timeout tail could
// otherwise push past Vercel's build limit and fail the WHOLE build (no dist).
// When the deadline hits we stop pulling new routes and ship whatever rendered;
// the rest keep their meta-only fallback. Routes are prioritised by GSC traffic
// (below) so a truncated run always covers the highest-value pages first.
const MAX_PRERENDER_MS = Number(argValue('--max-ms')) || 30 * 60_000; // 30 min

const BASE_URL = `http://localhost:${PORT}`;

// ---------------------------------------------------------------------------
// Browser launch — Vercel/CI builds run on Amazon Linux, where Playwright's
// bundled Chromium is missing system shared libs and `playwright install
// --with-deps` can't run (dnf, not apt). @sparticuz/chromium ships a
// self-contained Linux Chromium (v149, matching Playwright 1.60's Chromium 148)
// that runs there with no system deps. Locally (macOS/Windows) the bundled
// Chromium works fine, so we only reach for @sparticuz on Linux.
// ---------------------------------------------------------------------------
async function launchBrowser() {
  if (process.platform === 'linux') {
    const mod = await import('@sparticuz/chromium');
    const sparticuz = mod.default || mod;
    const executablePath = await sparticuz.executablePath();
    // Drop --single-process: it crashes when driving multiple parallel browser
    // contexts (our worker pool), which is exactly how we render.
    const launchArgs = (sparticuz.args || []).filter((a) => a !== '--single-process');
    console.log(`[prerender] launching @sparticuz/chromium (linux) at ${executablePath}`);
    return chromium.launch({ executablePath, args: launchArgs, headless: true });
  }
  console.log('[prerender] launching Playwright bundled Chromium (local)');
  return chromium.launch();
}

// ---------------------------------------------------------------------------
// 1. Discover SEO routes
// ---------------------------------------------------------------------------
function discoverRoutes() {
  if (SINGLE_ROUTE) return [SINGLE_ROUTE];
  if (!existsSync(SEO_ROUTES_FILE)) {
    throw new Error(`SEO routes file not found: ${SEO_ROUTES_FILE}`);
  }
  const source = readFileSync(SEO_ROUTES_FILE, 'utf-8');
  const out = [];
  const re = /path="([^"]+)"/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    if (m[1].startsWith('/')) out.push(m[1]);
  }

  // Mock-exam surface (hub + exams + topic landings) lives in MockExamRoutes.tsx
  // with relative paths and a dynamic :examSlug/:topicSlug route, so the route
  // file can't be parsed for concrete URLs. sitemap-mock-exams.xml is the
  // source of truth for every concrete mock-exam URL — prerender from there.
  const mockSitemap = join(ROOT, 'public/sitemap-mock-exams.xml');
  if (existsSync(mockSitemap)) {
    const xml = readFileSync(mockSitemap, 'utf-8');
    const locRe = /<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g;
    let count = 0;
    while ((m = locRe.exec(xml)) !== null) {
      out.push(m[1]);
      count++;
    }
    console.log(`[prerender] added ${count} mock-exam routes from sitemap-mock-exams.xml`);
  }

  // Dedupe + stable sort (prioritisation + LIMIT applied by the caller)
  return Array.from(new Set(out)).sort();
}

// Order routes by GSC impressions (highest-traffic first) so that, if the
// wall-clock deadline truncates the run, the most valuable pages are already
// rendered. Routes with no GSC history sort after, alphabetically (stable).
function prioritiseRoutes(routes) {
  const impressions = new Map();
  try {
    const gscPath = join(ROOT, 'scripts/seo-engine/gsc-pages-90d.json');
    if (existsSync(gscPath)) {
      const gsc = JSON.parse(readFileSync(gscPath, 'utf-8'));
      // The export carries one row per (host, slug) — both www and apex appear,
      // so a slug can repeat. Sum impressions across duplicates rather than
      // letting the last (often tiny apex) row clobber the real www figure.
      for (const row of gsc) {
        if (row && row.slug) {
          impressions.set(row.slug, (impressions.get(row.slug) || 0) + (row.impressions || 0));
        }
      }
      console.log(`[prerender] prioritising by GSC impressions (${impressions.size} pages with history)`);
    }
  } catch (err) {
    console.warn(`[prerender] could not load GSC priorities, using alpha order: ${err.message}`);
  }
  return [...routes].sort((a, b) => {
    const diff = (impressions.get(b) || 0) - (impressions.get(a) || 0);
    return diff !== 0 ? diff : a.localeCompare(b);
  });
}

// ---------------------------------------------------------------------------
// 2. Start vite preview in the background
// ---------------------------------------------------------------------------
async function startPreviewServer() {
  if (!existsSync(join(DIST, 'index.html'))) {
    throw new Error('dist/index.html missing. Run vite build first.');
  }
  console.log(`[prerender] starting vite preview on port ${PORT}...`);
  const proc = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('vite preview did not start within 30s'));
    }, 30_000);

    const onData = (chunk) => {
      const s = chunk.toString();
      if (VERBOSE) process.stdout.write(`[preview] ${s}`);
      if (s.includes('Local:') || s.includes('localhost')) {
        clearTimeout(timer);
        resolve();
      }
    };
    proc.stdout.on('data', onData);
    proc.stderr.on('data', (c) => {
      if (VERBOSE) process.stderr.write(`[preview-err] ${c}`);
    });
    proc.once('exit', (code) => {
      if (code !== 0) {
        clearTimeout(timer);
        reject(new Error(`vite preview exited with code ${code}`));
      }
    });
  });

  // Small additional settle — preview reports ready before it's actually accepting connections sometimes
  await new Promise((r) => setTimeout(r, 1_000));
  console.log(`[prerender] vite preview ready at ${BASE_URL}`);
  return proc;
}

// ---------------------------------------------------------------------------
// 3. Render one route to static HTML
// ---------------------------------------------------------------------------
const HOMEPAGE_HOLDING = []; // homepage rendered last to avoid breaking preview fallback

async function renderRoute(browser, routePath, stats) {
  const isHomepage = routePath === '/';
  if (isHomepage) {
    HOMEPAGE_HOLDING.push(routePath);
    return;
  }

  const ctx = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (ElecMate SEO Prerender; +https://www.elec-mate.com) Chrome/Playwright',
    serviceWorkers: 'block', // never let sw.js intercept during prerender
    bypassCSP: true,
    javaScriptEnabled: true,
  });

  // Block analytics, Sentry, PostHog, RUM beacons — they slow the crawl and
  // we don't want prerender traffic showing up in real product analytics.
  await ctx.route('**/*', (route) => {
    const url = route.request().url();
    const blocked = [
      'sentry.io',
      'posthog.com',
      'i.posthog.com',
      'eu.i.posthog.com',
      'google-analytics.com',
      'googletagmanager.com',
      'doubleclick.net',
      'facebook.net',
      'linkedin.com/li',
    ];
    if (blocked.some((b) => url.includes(b))) return route.abort();
    return route.continue();
  });

  const page = await ctx.newPage();

  let html = null;
  let warnings = [];

  try {
    await page.goto(`${BASE_URL}${routePath}`, {
      waitUntil: 'networkidle',
      timeout: NAV_TIMEOUT_MS,
    });

    // Wait for the React mount marker that main.tsx sets when render completes
    await page.waitForSelector('[data-react-mounted="1"]', {
      timeout: HYDRATION_TIMEOUT_MS,
    });

    // Give Helmet / useSEO a beat to flush late schema injection
    await page.waitForTimeout(POST_HYDRATION_WAIT_MS);

    html = await page.content();

    // Sanity checks: did we capture meaningful content?
    if (!html.includes('<title>') || /<title>\s*<\/title>/.test(html)) {
      warnings.push('empty_title');
    }
    if (!/<meta[^>]*name="description"[^>]*content="[^"]+"/i.test(html)) {
      warnings.push('empty_meta_description');
    }
    if (!html.includes('<h1')) {
      warnings.push('no_h1');
    }
    if (!html.includes('application/ld+json')) {
      warnings.push('no_jsonld');
    }

    const outDir = join(DIST, routePath);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html, 'utf-8');

    stats.succeeded.push({ route: routePath, warnings });
    if (warnings.length === 0) {
      console.log(`  ok   ${routePath}`);
    } else {
      console.log(`  ok*  ${routePath}  warnings=${warnings.join(',')}`);
    }
  } catch (err) {
    stats.failed.push({ route: routePath, error: String(err?.message || err) });
    console.error(`  FAIL ${routePath}: ${err?.message || err}`);
  } finally {
    await ctx.close();
  }
}

// Render homepage AFTER all other routes — overwriting dist/index.html breaks
// the SPA fallback that vite preview relies on for unknown routes.
async function renderHomepageLast(browser, stats) {
  for (const routePath of HOMEPAGE_HOLDING) {
    const ctx = await browser.newContext({
      userAgent: 'Mozilla/5.0 (ElecMate SEO Prerender) Chrome/Playwright',
      serviceWorkers: 'block',
      bypassCSP: true,
    });
    await ctx.route('**/*', (route) => {
      const url = route.request().url();
      if (['sentry.io', 'posthog.com', 'eu.i.posthog.com'].some((b) => url.includes(b))) {
        return route.abort();
      }
      return route.continue();
    });
    const page = await ctx.newPage();
    try {
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT_MS });
      await page.waitForSelector('[data-react-mounted="1"]', { timeout: HYDRATION_TIMEOUT_MS });
      await page.waitForTimeout(POST_HYDRATION_WAIT_MS);
      const html = await page.content();
      writeFileSync(join(DIST, 'index.html'), html, 'utf-8');
      stats.succeeded.push({ route: routePath, warnings: [] });
      console.log(`  ok   ${routePath} (homepage)`);
    } catch (err) {
      stats.failed.push({ route: routePath, error: String(err?.message || err) });
      console.error(`  FAIL ${routePath} (homepage): ${err?.message || err}`);
    } finally {
      await ctx.close();
    }
  }
}

// ---------------------------------------------------------------------------
// 4. Main
// ---------------------------------------------------------------------------
(async () => {
  let routes = prioritiseRoutes(discoverRoutes());
  if (LIMIT) routes = routes.slice(0, LIMIT);
  console.log(`[prerender] discovered ${routes.length} routes${LIMIT ? ` (limited to top ${LIMIT} by traffic)` : ''}`);

  const preview = await startPreviewServer();
  const browser = await launchBrowser();

  const stats = { succeeded: [], failed: [], startedAt: new Date().toISOString() };

  // Worker pool — stop pulling new routes once the wall-clock budget is spent.
  const deadline = Date.now() + MAX_PRERENDER_MS;
  let deadlineHit = false;
  let nextIdx = 0;
  async function worker() {
    while (nextIdx < routes.length) {
      if (Date.now() > deadline) {
        deadlineHit = true;
        break;
      }
      const i = nextIdx++;
      await renderRoute(browser, routes[i], stats);
      // Tiny throttle so we don't saturate
      await new Promise((r) => setTimeout(r, 25));
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  if (deadlineHit) {
    const done = stats.succeeded.length + stats.failed.length;
    console.warn(
      `[prerender] ⏱  wall-clock budget (${(MAX_PRERENDER_MS / 60000).toFixed(0)}m) reached — ` +
        `rendered ${done}/${routes.length}; remaining ${routes.length - done} keep meta-only fallback.`,
    );
  }

  await renderHomepageLast(browser, stats);

  await browser.close();
  try {
    preview.kill('SIGTERM');
  } catch {
    /* ignore */
  }

  const renderedCount = stats.succeeded.length + stats.failed.length;
  const manifest = {
    generatedAt: new Date().toISOString(),
    durationMs: Date.now() - new Date(stats.startedAt).getTime(),
    concurrency: CONCURRENCY,
    total: routes.length,
    succeeded: stats.succeeded.length,
    failed: stats.failed.length,
    deadlineHit,
    skippedForDeadline: deadlineHit ? routes.length - renderedCount : 0,
    warningsSummary: stats.succeeded.reduce((acc, r) => {
      for (const w of r.warnings) acc[w] = (acc[w] || 0) + 1;
      return acc;
    }, {}),
    failures: stats.failed,
  };

  mkdirSync(DIST, { recursive: true });
  writeFileSync(
    join(DIST, '_seo-prerender-manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf-8',
  );

  console.log(
    `\n[prerender] done: ${manifest.succeeded}/${manifest.total} ok, ${manifest.failed} failed in ${(manifest.durationMs / 1000).toFixed(1)}s`,
  );
  if (Object.keys(manifest.warningsSummary).length > 0) {
    console.log(`[prerender] warnings: ${JSON.stringify(manifest.warningsSummary)}`);
  }
  if (manifest.failed > 0) {
    console.log(`[prerender] failures written to dist/_seo-prerender-manifest.json`);
    process.exit(1);
  }
})().catch((err) => {
  console.error(`[prerender] fatal:`, err);
  process.exit(2);
});
