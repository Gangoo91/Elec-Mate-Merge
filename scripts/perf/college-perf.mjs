/**
 * College Hub performance measurement (ELE-1912).
 *
 *   node scripts/perf/college-perf.mjs [--base http://localhost:4173] [--role tutor|learner|both]
 *        [--runs 4] [--out perf-college.json] [--only <substring>] [--mode desktop|phone] [--cpu 1]
 *
 * Opens every College Hub screen (as the fixture tutor) and every
 * apprentice-college screen (as the fixture learner) on a throttled link that
 * looks like college wi-fi (10 Mbps down, 5 Mbps up, 40 ms added RTT), and for
 * each screen records:
 *   readyMs     time from navigation start until the main content is visible:
 *               a visible heading (h1–h3), no skeletons/spinners on screen, and no
 *               Supabase request in flight — held for 600 ms so a page that
 *               paints a heading and THEN starts its queries is not "ready".
 *   headingMs   first visible heading (for diagnosis)
 *   supabase    number of Supabase REST/RPC/function calls, and the calls
 *               grouped by endpoint (an endpoint called 20× is an N+1)
 *   bytes       total transferred bytes; jsBytes on the cold run
 *   slowest     the five slowest requests
 *   chunks      the JS chunks the screen loaded (cold run)
 *
 * Run 1 of each screen starts with an empty HTTP cache (cold); runs 2..N are
 * warm (a tutor who used the app this morning). The budget check uses the p75
 * of the warm runs; the cold time is reported alongside.
 *
 * Accounts: COLLEGE_E2E_{TUTOR,LEARNER}_{EMAIL,PASSWORD} env vars, else the
 * gitignored fixture files e2e/.auth/college-demo-{tutor,learner}.json.
 * Measure a PRODUCTION build served like Vercel:
 *   npx vite build && node scripts/perf/serve-dist.mjs dist 4173
 * (the dev server ships unminified, unbundled modules and is 3–10× slower;
 * `vite preview` sends no-cache, so every warm load re-validates every chunk).
 * Chrome talks HTTP/1.1 to a local server (6 connections), so cold loads of
 * chunk-heavy screens read slower here than over Vercel's HTTP/2.
 */
import { chromium, devices } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import { TUTOR_ROUTES, TUTOR_UNBUDGETED, LEARNER_ROUTES } from './routes.mjs';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith('--')) acc.push([a.slice(2), arr[i + 1]?.startsWith('--') ? 'true' : arr[i + 1] ?? 'true']);
    return acc;
  }, [])
);
const BASE = (args.base || 'http://localhost:4173').replace(/\/$/, '');
const ROLE = args.role || 'both';
const RUNS = Math.max(2, Number(args.runs || 4));
const OUT = args.out || 'perf-college.json';
const ONLY = args.only || '';
const MODE = args.mode || 'desktop';
const CPU = Number(args.cpu || 1);
const STABLE_MS = 600;
const TIMEOUT_MS = 20000;

const SUPABASE_URL = 'https://jtwygbeceundfgnkirof.supabase.co';
const ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';
const STORAGE_KEY = 'sb-jtwygbeceundfgnkirof-auth-token';

/** College wi-fi: 10 Mbps down / 5 Mbps up / 40 ms added round trip. */
const NETWORK = { offline: false, latency: 40, downloadThroughput: (10e6 / 8), uploadThroughput: (5e6 / 8) };

function creds(role) {
  const R = role.toUpperCase();
  const email = process.env[`COLLEGE_E2E_${R}_EMAIL`];
  const password = process.env[`COLLEGE_E2E_${R}_PASSWORD`];
  if (email && password) return { email, password };
  const f = `e2e/.auth/college-demo-${role}.json`;
  if (fs.existsSync(f)) return JSON.parse(fs.readFileSync(f, 'utf8'));
  return null;
}

/** Runs in the page before any app code: counts Supabase fetches in flight and
 *  keeps a "ready since" clock. */
function pagePerfProbe() {
  const w = window;
  w.__perf = { inflight: 0, readySince: null, headingAt: null, loadersClearAt: null };
  const origFetch = w.fetch.bind(w);
  w.fetch = (input, init) => {
    const url = typeof input === 'string' ? input : input?.url || String(input);
    const method = String(init?.method || (typeof input === 'object' && input?.method) || 'GET').toUpperCase();
    // Data loads only: REST reads, RPCs, edge functions. Background writes
    // (activity/presence inserts), auth refreshes and the subscription check
    // don't hold the screen up, so they don't count as "in flight".
    const isRest = url.includes('/rest/v1/');
    const isRpc = url.includes('/rest/v1/rpc/');
    // AI suggestions (functions named ai-*) fill in progressively after the
    // screen is usable — the OTJ inbox's "suggested check" takes 3 s — so
    // they are reported in the timeline but don't hold "ready".
    const isFn =
      url.includes('/functions/v1/') && !url.includes('check-subscription') && !url.includes('/functions/v1/ai-');
    const tracked = url.includes('.supabase.co/') && ((isRest && (method === 'GET' || method === 'HEAD' || isRpc)) || isFn);
    if (!tracked) return origFetch(input, init);
    w.__perf.inflight++;
    return origFetch(input, init).finally(() => {
      w.__perf.inflight--;
    });
  };
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return false;
    if (r.bottom < 0 || r.top > window.innerHeight * 3) return false;
    const s = getComputedStyle(el);
    return s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0.05;
  };
  const tick = () => {
    const p = w.__perf;
    const now = performance.now();
    const heading = Array.from(document.querySelectorAll('h1, h2, h3, [role="heading"]')).some(
      (h) => (h.textContent || '').trim().length > 1 && visible(h) && !h.closest('[role="dialog"]')
    );
    const loaders = Array.from(
      document.querySelectorAll('.animate-pulse, .animate-spin, [aria-busy="true"], [data-loading="true"]')
    ).some((el) => {
      if (!visible(el)) return false;
      const r = el.getBoundingClientRect();
      return r.width >= 12 && r.height >= 12;
    });
    if (heading && p.headingAt === null) p.headingAt = now;
    if (heading && !loaders && p.loadersClearAt === null) p.loadersClearAt = now;
    const ready = heading && !loaders && p.inflight === 0;
    if (ready) {
      if (p.readySince === null) p.readySince = now;
    } else p.readySince = null;
    setTimeout(tick, 25);
  };
  setTimeout(tick, 0);
}

function pct(arr, p) {
  if (!arr.length) return null;
  const s = [...arr].sort((a, b) => a - b);
  const idx = Math.min(s.length - 1, Math.ceil((p / 100) * s.length) - 1);
  return s[Math.max(0, idx)];
}

function slowestOf(list, rel) {
  return list
    .filter((r) => r.end !== null)
    .map((r) => ({ url: shortUrl(r.url), ms: Math.round((r.end - r.start) * 1000), startMs: rel(r.start), bytes: r.bytes }))
    .sort((a, b) => b.ms - a.ms)
    .slice(0, 6);
}

function shortUrl(u) {
  try {
    const x = new URL(u);
    if (x.host.endsWith('supabase.co')) {
      const sel = x.searchParams.get('select');
      return `${x.pathname.replace('/rest/v1/', 'rest:').replace('/functions/v1/', 'fn:')}${sel ? ` select=${sel.slice(0, 60)}` : ''}`;
    }
    return x.pathname;
  } catch {
    return u.slice(0, 120);
  }
}
function endpoint(u) {
  try {
    const x = new URL(u);
    return x.pathname.replace('/rest/v1/', 'rest:').replace('/functions/v1/', 'fn:');
  } catch {
    return u;
  }
}

async function measureRole(role, routes, unbudgeted, onResult = () => {}) {
  const c = creds(role);
  if (!c) {
    console.warn(`[perf] no credentials for ${role} — skipped`);
    return [];
  }
  const sb = createClient(SUPABASE_URL, ANON, { auth: { persistSession: false } });
  const { data, error } = await sb.auth.signInWithPassword({ email: c.email, password: c.password });
  if (error || !data.session) throw new Error(`sign-in failed for ${role}: ${error?.message}`);
  const sessionJson = JSON.stringify(data.session);

  const browser = await chromium.launch();
  const context = await browser.newContext(
    MODE === 'phone'
      ? { ...devices['Pixel 7'], locale: 'en-GB', serviceWorkers: 'block' }
      : { viewport: { width: 1440, height: 900 }, locale: 'en-GB', serviceWorkers: 'block' }
  );
  await context.addInitScript(
    ([k, v]) => {
      try {
        if (!window.localStorage.getItem(k)) window.localStorage.setItem(k, v);
      } catch {}
    },
    [STORAGE_KEY, sessionJson]
  );
  await context.addInitScript(pagePerfProbe);
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', NETWORK);
  if (CPU > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: CPU });

  let reqs = new Map();
  let t0 = null;
  cdp.on('Network.requestWillBeSent', (e) => {
    if (t0 === null && e.type === 'Document') t0 = e.timestamp;
    reqs.set(e.requestId, { url: e.request.url, method: e.request.method, type: e.type, start: e.timestamp, end: null, bytes: 0, status: null, cached: false });
  });
  cdp.on('Network.responseReceived', (e) => {
    const r = reqs.get(e.requestId);
    if (r) {
      r.status = e.response.status;
      r.cached = !!(e.response.fromDiskCache || e.response.fromMemoryCache || e.response.fromServiceWorker);
      r.type = e.type || r.type;
    }
  });
  cdp.on('Network.requestServedFromCache', (e) => {
    const r = reqs.get(e.requestId);
    if (r) r.cached = true;
  });
  cdp.on('Network.loadingFinished', (e) => {
    const r = reqs.get(e.requestId);
    if (r) {
      r.end = e.timestamp;
      r.bytes = e.encodedDataLength;
    }
  });
  cdp.on('Network.loadingFailed', (e) => {
    const r = reqs.get(e.requestId);
    if (r) r.end = e.timestamp;
  });
  const consoleErrors = [];
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text().slice(0, 200)));
  page.on('pageerror', (e) => consoleErrors.push(String(e).slice(0, 200)));

  // Warm-up: sign the session in, let the app refresh its token once.
  await page.goto(BASE + routes[0], { waitUntil: 'load', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(3000);

  const results = [];
  const all = [...routes.map((u) => [u, true]), ...unbudgeted.map((u) => [u, false])].filter(([u]) => !ONLY || u.includes(ONLY));
  for (const [route, budgeted] of all) {
    const runs = [];
    let coldDetail = null;
    let warmDetail = null;
    for (let i = 0; i < RUNS; i++) {
      await page.goto('about:blank');
      if (i === 0) await cdp.send('Network.clearBrowserCache');
      reqs = new Map();
      t0 = null;
      consoleErrors.length = 0;
      const wallStart = Date.now();
      await page.goto(BASE + route, { waitUntil: 'commit', timeout: 60000 }).catch(() => {});
      let perf = null;
      let timedOut = false;
      while (true) {
        await page.waitForTimeout(100);
        perf = await page.evaluate(() => ({ ...window.__perf, now: performance.now() })).catch(() => null);
        if (perf && perf.readySince !== null && perf.now - perf.readySince >= STABLE_MS) break;
        if (Date.now() - wallStart > TIMEOUT_MS) {
          timedOut = true;
          break;
        }
      }
      const list = [...reqs.values()].filter((r) => !r.url.startsWith('data:') && !r.url.startsWith('about:'));
      const rel = (ts) => (t0 === null || ts === null ? null : Math.round((ts - t0) * 1000));
      const sbReqs = list.filter((r) => r.url.includes('.supabase.co/') && !r.url.includes('/realtime/') && !r.url.includes('/storage/v1/object') && r.method !== 'OPTIONS');
      const run = {
        readyMs: timedOut ? TIMEOUT_MS : Math.round(perf.readySince),
        timedOut,
        headingMs: perf?.headingAt != null ? Math.round(perf.headingAt) : null,
        loadersClearMs: perf?.loadersClearAt != null ? Math.round(perf.loadersClearAt) : null,
        supabase: sbReqs.length,
        bytes: list.reduce((s, r) => s + (r.bytes || 0), 0),
        jsBytes: list.filter((r) => r.type === 'Script').reduce((s, r) => s + (r.bytes || 0), 0),
        consoleErrors: consoleErrors.length,
        finalUrl: page.url().replace(BASE, ''),
      };
      runs.push(run);
      const failed = consoleErrors.some((e) => /BOOT FAILED|Failed to fetch dynamically imported module/i.test(e));
      if (failed) run.failed = true;
      if (i === 0) {
        coldDetail = {
          chunks: list
            .filter((r) => r.type === 'Script' && r.url.startsWith(BASE))
            .map((r) => ({ url: new URL(r.url).pathname, bytes: r.bytes }))
            .sort((a, b) => b.bytes - a.bytes),
          coldSlowest: slowestOf(list, rel),
        };
      }
      if (i === 1) {
        const byEndpoint = {};
        for (const r of sbReqs) byEndpoint[endpoint(r.url)] = (byEndpoint[endpoint(r.url)] || 0) + 1;
        warmDetail = {
          slowest: slowestOf(list, rel),
          supabaseTimeline: sbReqs
            .map((r) => ({ url: shortUrl(r.url), startMs: rel(r.start), endMs: rel(r.end), bytes: r.bytes }))
            .sort((a, b) => a.startMs - b.startMs),
          scriptTimeline: list
            .filter((r) => r.type === 'Script' && r.url.startsWith(BASE))
            .map((r) => ({ url: new URL(r.url).pathname, startMs: rel(r.start), endMs: rel(r.end), bytes: r.bytes }))
            .sort((a, b) => a.startMs - b.startMs),
          byEndpoint: Object.fromEntries(Object.entries(byEndpoint).sort((a, b) => b[1] - a[1])),
          consoleErrors: [...consoleErrors].slice(0, 5),
        };
      }
    }
    const warm = runs.slice(1).map((r) => r.readyMs);
    const res = {
      role,
      route,
      budgeted,
      coldMs: runs[0].readyMs,
      warmP75: pct(warm, 75),
      warmMedian: pct(warm, 50),
      supabase: runs[1]?.supabase ?? runs[0].supabase,
      coldBytes: runs[0].bytes,
      coldJsBytes: runs[0].jsBytes,
      warmBytes: runs[1]?.bytes ?? null,
      timedOut: runs.some((r) => r.timedOut),
      finalUrl: runs[0].finalUrl,
      runs,
      failed: runs.some((r) => r.failed),
      ...coldDetail,
      ...warmDetail,
    };
    results.push(res);
    onResult(res);
    console.log(
      `${role.padEnd(7)} ${route.slice(0, 70).padEnd(70)} cold ${String(res.coldMs).padStart(5)}ms  warm p75 ${String(res.warmP75).padStart(5)}ms  sb ${String(res.supabase).padStart(3)}  js ${(res.coldJsBytes / 1024).toFixed(0).padStart(5)}KB${res.timedOut ? '  TIMEOUT' : ''}${res.failed ? '  BOOT-FAIL' : ''}`
    );
  }
  await browser.close();
  return results;
}

const out = { base: BASE, mode: MODE, cpu: CPU, network: NETWORK, runs: RUNS, at: new Date().toISOString(), results: [] };
// Written after every screen so a long run can be read (or resumed) part-way.
const save = (r) => {
  out.results.push(r);
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
};
if (ROLE === 'tutor' || ROLE === 'both') await measureRole('tutor', TUTOR_ROUTES, TUTOR_UNBUDGETED, save);
if (ROLE === 'learner' || ROLE === 'both') await measureRole('learner', LEARNER_ROUTES, [], save);
fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(`[perf] ${out.results.length} screens → ${OUT}`);
