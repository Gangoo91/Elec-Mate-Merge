/**
 * Andrzej's auto-refresh (7 Oct 2026), end to end against two PRODUCTION
 * builds, as the FICTIONAL fixture learner.
 *
 *   node scripts/college-demo/update-reload-flow.mjs <scratchDir>
 *
 * Needs a server on :4173 that serves the dist named in <scratchDir>/current.txt
 * the way Vercel does (a missing /assets file is a 404). Build A is live first;
 * the script swaps to build B mid-paper (a deploy) and checks:
 *
 *   1. the hourly update check finding B does NOT reload the paper, and no
 *      update card shows mid-paper;
 *   2. a stale-chunk failure mid-paper does NOT reload either — it offers one;
 *   3. finishing, reviewing and opening Drill all still work on the old build;
 *   4. a reload on the results screen brings the results back (with Drill);
 *   5. off the paper, the update card shows, and Update switches to B.
 */
import { chromium, devices } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';

const [SP] = process.argv.slice(2);
const BASE = 'http://localhost:4173';
const PAPER = '/study-centre/apprentice/level3-module8-mock-exam3';
const setBuild = (b) => fs.writeFileSync(path.join(SP, 'current.txt'), path.join(SP, `dist${b}`));
setBuild('A');

const fixture = JSON.parse(fs.readFileSync('e2e/.auth/college-demo-learner.json', 'utf8'));
const sb = createClient(
  'https://jtwygbeceundfgnkirof.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8',
  { auth: { persistSession: false } }
);
const { data } = await sb.auth.signInWithPassword({ email: fixture.email, password: fixture.password });
if (!data?.session) throw new Error('sign-in failed');

const out = path.join(SP, 'update-flow');
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices['iPhone 14'] });
await ctx.addInitScript(
  ([k, v]) => {
    try {
      if (!localStorage.getItem(k)) localStorage.setItem(k, v);
      localStorage.setItem('elec-mate-cookie-consent', 'true');
      localStorage.setItem(
        'elec-mate-cookie-preferences',
        JSON.stringify({ essential: true, analytics: false, marketing: false })
      );
    } catch {}
  },
  ['sb-jtwygbeceundfgnkirof-auth-token', JSON.stringify(data.session)]
);
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e).slice(0, 300)));
let loads = 0;
page.on('load', () => loads++);

const results = [];
const check = (name, ok, detail = '') => {
  results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
  console.log(results.at(-1));
};
const shot = (n) => page.screenshot({ path: path.join(out, `${n}.png`) });
const mark = () => page.evaluate(() => (window.__notReloaded = true));
const stillSamePage = () => page.evaluate(() => window.__notReloaded === true).catch(() => false);
const card = () => page.getByText(/New version ready|This page is out of date/).count();
const build = () =>
  page.evaluate(() =>
    [...document.scripts].map((s) => s.src).find((s) => /\/assets\/index-.*\.js/.test(s)) ?? ''
  );

const answer = async (n) => {
  for (let q = 0; q < n; q++) {
    await page.locator('button[aria-pressed]').first().click();
    await page.waitForTimeout(120);
    await page.getByRole('button', { name: /^Next$/ }).first().click();
    await page.waitForTimeout(120);
  }
};

// ── Build A: install the worker, start a paper ──────────────────────────────
await page.goto(BASE + PAPER, { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForFunction(() => navigator.serviceWorker?.controller, null, { timeout: 30000 }).catch(() => {});
// First visit isn't controlled until a reload; make sure the A worker controls.
if (!(await page.evaluate(() => !!navigator.serviceWorker.controller))) {
  await page.reload({ waitUntil: 'networkidle' });
}
check('build A worker in control', await page.evaluate(() => !!navigator.serviceWorker.controller));
const buildA = await build();

await page.getByRole('button', { name: /Start exam|Sit it again/ }).first().click();
await page.waitForTimeout(1500);
const startedAt = Date.now();
await answer(6);
await mark();

// ── Deploy B; the hourly check runs ─────────────────────────────────────────
setBuild('B');
await page.evaluate(async () => {
  const r = await navigator.serviceWorker.getRegistration();
  await r?.update();
});
await page.waitForTimeout(8000);
const waiting = await page.evaluate(async () => !!(await navigator.serviceWorker.getRegistration())?.waiting);
check('new version found and WAITING (not taken over)', waiting);
check('paper NOT reloaded by the update', await stillSamePage());
check('no update card mid-paper', (await card()) === 0);
await shot('1_mid_paper_after_deploy');

// ── A stale-chunk failure mid-paper ─────────────────────────────────────────
await page.evaluate(() => {
  const err = new TypeError('Failed to fetch dynamically imported module: http://localhost:4173/assets/Gone-x.js');
  window.dispatchEvent(new PromiseRejectionEvent('unhandledrejection', { promise: Promise.reject(err).catch(() => {}) || Promise.resolve(), reason: err }));
});
await page.waitForTimeout(3000);
check('stale chunk mid-paper does NOT reload', await stillSamePage());
check('…and offers a Reload instead', (await page.getByText('This page is out of date').count()) > 0);
await shot('2_stale_chunk_offer');
await page.getByRole('button', { name: 'Not now' }).click().catch(() => {});

// ── Finish on the old build; review; drill ──────────────────────────────────
await answer(4);
const wait = 33000 - (Date.now() - startedAt);
if (wait > 0) await page.waitForTimeout(wait);
await page.getByRole('button', { name: /^Finish/ }).first().click();
await page.waitForTimeout(1200);
// Some papers confirm the finish.
const confirm = page.getByRole('button', { name: /^(Finish|Submit)( exam| paper|  anyway)?$/ });
if (await confirm.count()) await confirm.last().click().catch(() => {});
await page.waitForTimeout(5000);
check('results shown, still the same page', await stillSamePage());
const badge = () =>
  page.getByText(/^(Not completed|Not passed yet|Passed)$/i).first().textContent().catch(() => null);
const badgeBefore = await badge();
check('no update card on the results', (await page.getByText('New version ready').count()) === 0);
await shot('3_results_old_build');

const review = page.getByRole('button', { name: /Review/ }).first();
if (await review.count()) {
  await review.click();
  await page.waitForTimeout(1500);
  check('review opens on the old build', await stillSamePage());
  await shot('4_review');
  await page.getByRole('button', { name: /Back|Results/ }).first().click().catch(() => {});
  await page.waitForTimeout(1000);
}

// ── Reload on the results screen (what a deploy used to do) ────────────────
await page.reload({ waitUntil: 'domcontentloaded' });
const note = await page
  .getByText('Your results are still here')
  .waitFor({ timeout: 15000 })
  .then(() => true, () => false);
await page.waitForTimeout(2500);
const badgeAfter = await badge();
check('reload brings the results back', !!badgeAfter, String(badgeAfter));
check('…exactly as they were', badgeAfter === badgeBefore, `${badgeBefore} → ${badgeAfter}`);
check('…with the "still here" note', note);
const drill = page.getByRole('button', { name: /^Drill the \d+ you missed/ });
check('…and Drill is back', (await drill.count()) > 0);
await shot('5_results_after_reload');
const attemptsBefore = await sb
  .from('seo_mock_attempts')
  .select('id', { count: 'exact', head: true })
  .eq('user_id', data.session.user.id)
  .gte('created_at', new Date(startedAt).toISOString());

if (await drill.count()) {
  await drill.first().click();
  await page.waitForTimeout(3000);
  check('Drill opens this attempt', /mock-exams\/revise\?attempt=/.test(page.url()), page.url().replace(BASE, ''));
  await shot('6_drill');
}

// ── The reload put this page on B: the offline copy switches QUIETLY ──────
await page.goto(BASE + '/study-centre', { waitUntil: 'networkidle' });
await mark();
await page.waitForTimeout(6000);
check('page already on B → no update card', (await page.getByText('New version ready').count()) === 0);
check('…no reload either', await stillSamePage());
const switched = await page.evaluate(async () => {
  const r = await navigator.serviceWorker.getRegistration();
  return !r?.waiting;
});
check('…and the offline copy switched to B in the background', switched);
await shot('7_quiet_switch');

// ── Another deploy while this page is open: NOW it's behind → card ─────────
setBuild('A'); // "build C" — any different build will do
await page.evaluate(async () => (await navigator.serviceWorker.getRegistration())?.update());
await page.waitForTimeout(8000);
const hasCard = (await page.getByText('New version ready').count()) > 0;
check('page behind → update card shows', hasCard);
check('…and nothing reloaded on its own', await stillSamePage());
await shot('8_update_card');
if (hasCard) {
  const before = loads;
  const was = await build();
  await page.getByRole('button', { name: 'Update' }).click();
  await page.waitForTimeout(8000);
  check('Update reloads into the new build', loads > before && (await build()) !== was, await build());
}

// Clean the fixture: this run's attempts and their revision state.
const { count } = attemptsBefore;
const fresh = await sb
  .from('seo_mock_attempts')
  .select('id')
  .eq('user_id', data.session.user.id)
  .gte('created_at', new Date(startedAt).toISOString());
fs.writeFileSync(path.join(out, 'attempt_ids.json'), JSON.stringify((fresh.data ?? []).map((r) => r.id)));
fs.writeFileSync(path.join(out, 'meta.json'), JSON.stringify({ startedAt, attempts: count }, null, 2));
check('one attempt recorded (no double on restore)', count === 1, `count=${count}`);

fs.writeFileSync(path.join(out, 'results.txt'), results.join('\n') + '\n\nerrors:\n' + errors.join('\n'));
console.log(`\n${results.filter((r) => r.startsWith('FAIL')).length} failed, page errors: ${errors.length}`);
await browser.close();
