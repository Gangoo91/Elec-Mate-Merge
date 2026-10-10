/**
 * Journey 56 — performance budget on every College Hub and apprentice-college
 * screen (ELE-1912). Read-only: nothing is written.
 *
 * METHOD (what this measures, and what it does not)
 * -------------------------------------------------
 * Runs against the DEV server (http://localhost:8080) as the fixture tutor and
 * the fixture learner, with Chrome's network throttled through CDP to college
 * wi-fi: 10 Mbps down, 5 Mbps up, 40 ms added round trip.
 *
 * Each screen is loaded once unthrottled (to prime the HTTP cache and Vite's
 * transform cache), then PERF_RUNS times (default 3) throttled on that warm
 * cache. For each throttled load the page itself records, on one clock
 * (performance.now, 0 = navigation start):
 *
 *   readyMs     the main content is on screen: a visible heading, no skeleton
 *               or spinner, and no Supabase data request in flight, held for
 *               600 ms (a page that paints a heading and THEN starts loading
 *               is not ready). Same rule as scripts/perf/college-perf.mjs.
 *   dataPathMs  readyMs minus the start of the first Supabase data request.
 *               Everything before the first query is the app booting; on the
 *               dev server that is hundreds of unbundled source modules, which
 *               a production bundle does not fetch.
 *   networkMs   THE BUDGETED NUMBER. The time between the first data request
 *               and ready during which at least one Supabase data request was
 *               in flight (the union of their intervals). It is what the
 *               screen's own data costs on college wi-fi: the request
 *               waterfall, query time and payload transfer. The rest of
 *               dataPathMs (gapMs) is the browser fetching lazy modules and
 *               rendering, which the dev server inflates several times over
 *               (unminified React, one request per source file), so it is
 *               reported but not budgeted here.
 *   requests    Supabase REST / RPC / edge-function data loads before ready
 *   chain       the longest request waterfall: the most requests in a row where
 *               each started only after the one before it had finished (an
 *               upper bound: a request held back by a lazy module also counts)
 *   kb          decoded JSON payload of those requests
 *   dupes       identical requests (same method, URL and body) made more than
 *               once on one load: the N+1 / double-fetch signal
 *
 * The budget: median networkMs over the throttled runs <= PERF_BUDGET_MS
 * (default 1000). Whole-page time on a PRODUCTION bundle (boot, modules and
 * render included) is the CI `perf` job in .github/workflows/college.yml
 * (scripts/perf/college-perf.mjs against a Vercel-like static server, budget
 * 1 s warm p75); it is not measured here because a local production build is
 * not run.
 *
 * Results: PERF_OUT (default <scratchpad>/w2-trust/perf-56.json, else
 * test-results/perf-56.json). PERF_ONLY=<substring> limits the screens;
 * PERF_SKIP=<n> resumes a run after its first n screens.
 */
import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { haveCreds, signedInPage, type Who } from './support';
// The single list of budgeted screens, shared with the CI production run.
import { TUTOR_ROUTES, LEARNER_ROUTES } from '../../scripts/perf/routes.mjs';

test.skip(!haveCreds(), 'College fixture credentials are not available');

const BUDGET = Number(process.env.PERF_BUDGET_MS || 1000);
const RUNS = Math.max(1, Number(process.env.PERF_RUNS || 3));
const ONLY = process.env.PERF_ONLY || '';
/** Resume a long run part-way: skip the first N screens of each role. */
const SKIP = Number(process.env.PERF_SKIP || 0);
const STABLE_MS = 600;
const TIMEOUT_MS = 25_000;
const SCRATCH =
  '/private/tmp/claude-501/-Users-andrewmoore/a73037d4-0ce1-4cd1-8b1e-969a86bdc1a6/scratchpad/w2-trust';
const OUT =
  process.env.PERF_OUT ||
  (fs.existsSync(SCRATCH)
    ? path.join(SCRATCH, 'perf-56.json')
    : path.resolve('test-results/perf-56.json'));

/** College wi-fi: 10 Mbps down / 5 Mbps up / 40 ms added round trip. */
const NETWORK = {
  offline: false,
  latency: 40,
  downloadThroughput: 10e6 / 8,
  uploadThroughput: 5e6 / 8,
};
const NO_THROTTLE = { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 };

interface Req {
  key: string;
  url: string;
  start: number;
  end: number | null;
  bytes: number;
}
interface Probe {
  inflight: number;
  readySince: number | null;
  reqs: Req[];
  now: number;
}

/** Runs in the page before any app code. */
function probe() {
  const w = window as unknown as { __perf: Omit<Probe, 'now'>; fetch: typeof fetch };
  w.__perf = { inflight: 0, readySince: null, reqs: [] };
  const orig = w.fetch.bind(window);
  w.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    const method = String(
      init?.method || (input instanceof Request ? input.method : 'GET')
    ).toUpperCase();
    const isRest = url.includes('/rest/v1/');
    const isRpc = url.includes('/rest/v1/rpc/');
    // AI suggestions fill in after the screen is usable; the subscription
    // check is app-wide. Neither holds the screen up.
    const isFn =
      url.includes('/functions/v1/') &&
      !url.includes('check-subscription') &&
      !url.includes('/functions/v1/ai-');
    const tracked =
      url.includes('.supabase.co/') &&
      ((isRest && (method === 'GET' || method === 'HEAD' || isRpc)) || isFn);
    if (!tracked) return orig(input, init);
    const body = typeof init?.body === 'string' ? init.body : '';
    const rec: Req = {
      key: `${method} ${url} ${body}`,
      url,
      start: performance.now(),
      end: null,
      bytes: 0,
    };
    w.__perf.reqs.push(rec);
    w.__perf.inflight++;
    return orig(input, init)
      .then((res) => {
        res
          .clone()
          .text()
          .then((t) => (rec.bytes = t.length))
          .catch(() => {});
        return res;
      })
      .finally(() => {
        rec.end = performance.now();
        w.__perf.inflight--;
      });
  };
  const visible = (el: Element) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0 || r.bottom < 0 || r.top > window.innerHeight * 3)
      return false;
    const s = getComputedStyle(el);
    return s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0.05;
  };
  const tick = () => {
    const p = w.__perf;
    const heading = Array.from(document.querySelectorAll('h1, h2, h3, [role="heading"]')).some(
      (h) => (h.textContent || '').trim().length > 1 && visible(h) && !h.closest('[role="dialog"]')
    );
    const loaders = Array.from(
      document.querySelectorAll(
        '.animate-pulse, .animate-spin, [aria-busy="true"], [data-loading="true"]'
      )
    ).some((el) => {
      if (!visible(el)) return false;
      const r = el.getBoundingClientRect();
      return r.width >= 12 && r.height >= 12;
    });
    if (heading && !loaders && p.inflight === 0) {
      if (p.readySince === null) p.readySince = performance.now();
    } else p.readySince = null;
    setTimeout(tick, 25);
  };
  setTimeout(tick, 0);
}

interface Run {
  readyMs: number;
  dataPathMs: number;
  networkMs: number;
  requests: number;
  chain: number;
  kb: number;
  dupes: string[];
  timedOut: boolean;
  timeline: { url: string; s: number; e: number | null; kb: number }[];
}

function shortUrl(u: string) {
  try {
    const x = new URL(u);
    const sel = x.searchParams.get('select');
    return `${x.pathname.replace('/rest/v1/', 'rest:').replace('/functions/v1/', 'fn:')}${sel ? ` select=${sel.slice(0, 50)}` : ''}`;
  } catch {
    return u.slice(0, 100);
  }
}

function analyse(p: Probe, timedOut: boolean): Run {
  const readyMs = timedOut || p.readySince === null ? TIMEOUT_MS : Math.round(p.readySince);
  const reqs = p.reqs.filter((r) => r.start <= readyMs).sort((a, b) => a.start - b.start);
  const first = reqs[0]?.start ?? readyMs;
  // Longest waterfall: depth(r) = 1 + max depth of any request that finished before r started.
  const depth: number[] = [];
  reqs.forEach((r, i) => {
    let d = 1;
    for (let j = 0; j < i; j++) {
      const q = reqs[j];
      if (q.end !== null && q.end <= r.start + 1) d = Math.max(d, depth[j] + 1);
    }
    depth.push(d);
  });
  const counts = new Map<string, number>();
  for (const r of reqs) counts.set(r.key, (counts.get(r.key) || 0) + 1);
  const dupes = [...counts.entries()]
    .filter(([, n]) => n > 1)
    .map(([k, n]) => `${n}× ${k.split(' ')[0]} ${shortUrl(k.split(' ')[1])}`);
  // Union of in-flight intervals, clipped to [first request, ready].
  let networkMs = 0;
  let curS = -1;
  let curE = -1;
  for (const r of reqs) {
    const e = Math.min(r.end ?? readyMs, readyMs);
    if (r.start > curE) {
      if (curE > curS) networkMs += curE - curS;
      curS = r.start;
      curE = e;
    } else curE = Math.max(curE, e);
  }
  if (curE > curS) networkMs += curE - curS;
  return {
    readyMs,
    dataPathMs: Math.max(0, Math.round(readyMs - first)),
    networkMs: Math.round(networkMs),
    timeline: reqs.map((r) => ({
      url: shortUrl(r.url),
      s: Math.round(r.start),
      e: r.end === null ? null : Math.round(r.end),
      kb: Math.round(r.bytes / 1024),
    })),
    requests: reqs.length,
    chain: depth.length ? Math.max(...depth) : 0,
    kb: Math.round(reqs.reduce((s, r) => s + r.bytes, 0) / 1024),
    dupes,
    timedOut,
  };
}

async function load(page: Page, route: string): Promise<{ probe: Probe; timedOut: boolean }> {
  await page.goto('about:blank');
  await page.goto(route, { waitUntil: 'commit', timeout: 60_000 }).catch(() => {});
  const t = Date.now();
  for (;;) {
    await page.waitForTimeout(100);
    const p = (await page
      .evaluate(() => ({
        ...(window as unknown as { __perf: Omit<Probe, 'now'> }).__perf,
        now: performance.now(),
      }))
      .catch(() => null)) as Probe | null;
    if (p && p.readySince !== null && p.now - p.readySince >= STABLE_MS)
      return { probe: p, timedOut: false };
    if (Date.now() - t > TIMEOUT_MS)
      return { probe: p ?? { inflight: 0, readySince: null, reqs: [], now: 0 }, timedOut: true };
  }
}

const median = (xs: number[]) => [...xs].sort((a, b) => a - b)[Math.floor((xs.length - 1) / 2)];

interface Row {
  role: Who;
  route: string;
  networkMs: number;
  dataPathMs: number;
  readyMs: number;
  requests: number;
  chain: number;
  kb: number;
  dupes: string[];
  timedOut: boolean;
  slowest: { url: string; ms: number; startMs: number }[];
  runs: Run[];
}

function save(rows: Row[]) {
  let prev: { results?: Row[] } = {};
  try {
    prev = JSON.parse(fs.readFileSync(OUT, 'utf8'));
  } catch {
    /* first write */
  }
  // Keep other roles' rows from the same file; replace this role's screens.
  const merged = new Map<string, Row>();
  for (const r of prev.results ?? []) merged.set(`${r.role} ${r.route}`, r);
  for (const r of rows) merged.set(`${r.role} ${r.route}`, r);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(
    OUT,
    JSON.stringify(
      {
        method:
          'dev server, warm HTTP cache, CDP 10/5 Mbps 40 ms RTT; budget on networkMs (median of runs)',
        budgetMs: BUDGET,
        runs: RUNS,
        at: new Date().toISOString(),
        results: [...merged.values()],
      },
      null,
      2
    )
  );
}

for (const [role, routes] of [
  ['tutor', TUTOR_ROUTES],
  ['learner', LEARNER_ROUTES],
] as [Who, string[]][]) {
  test(`${role} screens load their data in under ${BUDGET} ms on college wi-fi`, async ({
    browser,
  }) => {
    const list = routes.filter((r) => !ONLY || r.includes(ONLY)).slice(SKIP);
    test.skip(!list.length, 'No screens match PERF_ONLY');
    test.setTimeout(list.length * (RUNS + 1) * 40_000 + 60_000);
    const { context, page } = await signedInPage(browser, role);
    await context.addInitScript(probe);
    const cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    // Sign-in warm-up: let the app refresh its token once.
    await page.goto(list[0], { waitUntil: 'load', timeout: 90_000 }).catch(() => {});
    await page.waitForTimeout(2500);

    const rows: Row[] = [];
    for (const route of list) {
      await cdp.send('Network.emulateNetworkConditions', NO_THROTTLE);
      await load(page, route); // prime caches
      await cdp.send('Network.emulateNetworkConditions', NETWORK);
      const runs: Run[] = [];
      let last: Probe | null = null;
      for (let i = 0; i < RUNS; i++) {
        // A load with no data requests at all is a broken page (the dev
        // server mid-reload, a compile error), never a fast one: every
        // signed-in screen reads at least the profile. Try it again.
        let attempt = 0;
        let res = await load(page, route);
        while (res.probe.reqs.length === 0 && attempt++ < 3) {
          await page.waitForTimeout(3000);
          res = await load(page, route);
        }
        runs.push(analyse(res.probe, res.timedOut || res.probe.reqs.length === 0));
        last = res.probe;
      }
      const mid = runs.find((r) => r.networkMs === median(runs.map((x) => x.networkMs))) ?? runs[0];
      const row: Row = {
        role,
        route,
        networkMs: mid.networkMs,
        dataPathMs: mid.dataPathMs,
        readyMs: median(runs.map((r) => r.readyMs)),
        requests: mid.requests,
        chain: mid.chain,
        kb: mid.kb,
        dupes: mid.dupes,
        timedOut: runs.every((r) => r.timedOut),
        slowest: (last?.reqs ?? [])
          .filter((r) => r.end !== null)
          .map((r) => ({
            url: shortUrl(r.url),
            ms: Math.round((r.end as number) - r.start),
            startMs: Math.round(r.start),
          }))
          .sort((a, b) => b.ms - a.ms)
          .slice(0, 5),
        // The median run's request timeline, for diagnosis; the others without it.
        runs: runs.map((r) => (r === mid ? r : { ...r, timeline: [] })),
      };
      rows.push(row);
      save(rows);
      console.log(
        `${role.padEnd(7)} ${route.slice(0, 64).padEnd(64)} net ${String(row.networkMs).padStart(5)}ms  data ${String(row.dataPathMs).padStart(5)}ms  ready ${String(row.readyMs).padStart(5)}ms  req ${String(row.requests).padStart(3)}  chain ${String(row.chain).padStart(2)}  ${String(row.kb).padStart(4)}KB${row.dupes.length ? `  dupes ${row.dupes.length}` : ''}${row.timedOut ? '  TIMEOUT' : ''}`
      );
    }
    await cdp.send('Network.emulateNetworkConditions', NO_THROTTLE).catch(() => {});
    await context.close();

    const over = rows.filter((r) => r.timedOut || r.networkMs > BUDGET);
    expect(
      over.map(
        (r) =>
          `${r.route}: ${r.timedOut ? 'never ready' : `${r.networkMs} ms on the network`} (chain ${r.chain}, ${r.requests} requests)`
      ),
      `screens over the ${BUDGET} ms network budget (results in ${OUT})`
    ).toEqual([]);
  });
}
