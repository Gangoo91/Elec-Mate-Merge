/**
 * College Hub demo walkthrough — headless screenshots as a given account.
 *
 *   node scripts/college-demo/shoot.mjs e2e/.auth/college-demo-learner.json out-dir phone|desktop url [url…]
 *
 * Signs in with supabase-js (anon key) using the fixture file's email/password,
 * seeds the session into localStorage for localhost:8080 (same key shape the app
 * uses), then opens each URL and saves a full-page screenshot plus the page's
 * console errors. Phone = 390×844 (iPhone 14), desktop = 1440×900.
 *
 * The fixture file is under e2e/.auth/ (gitignored). Never prints the password.
 */
import { chromium, devices } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';

const [fixturePath, outDir, mode, ...urls] = process.argv.slice(2);
if (!fixturePath || !outDir || !mode || urls.length === 0) {
  console.error('usage: shoot.mjs <fixture.json> <outDir> phone|desktop <url…>');
  process.exit(2);
}
const SUPABASE_URL = 'https://jtwygbeceundfgnkirof.supabase.co';
const ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';
const BASE = 'http://localhost:8080';

const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
const sb = createClient(SUPABASE_URL, ANON, { auth: { persistSession: false } });
const { data, error } = await sb.auth.signInWithPassword({
  email: fixture.email,
  password: fixture.password,
});
if (error || !data.session) {
  console.error('sign-in failed:', error?.message);
  process.exit(1);
}
const storageKey = `sb-jtwygbeceundfgnkirof-auth-token`;
const sessionJson = JSON.stringify(data.session);

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext(
  mode === 'phone'
    ? { ...devices['iPhone 14'], locale: 'en-GB' }
    : { viewport: { width: 1440, height: 900 }, locale: 'en-GB' }
);
await context.addInitScript(
  ([k, v]) => {
    try {
      if (!window.localStorage.getItem(k)) window.localStorage.setItem(k, v);
    } catch {}
  },
  [storageKey, sessionJson]
);

const page = await context.newPage();
const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`[console] ${m.text().slice(0, 300)}`);
});
page.on('response', async (r) => {
  if (r.status() >= 400) {
    let body = '';
    try { body = (await r.text()).slice(0, 400); } catch {}
    errors.push(`[http ${r.status()}] ${r.request().method()} ${r.url().slice(0, 300)} :: ${body}`);
  }
});
page.on('pageerror', (e) => errors.push(`[pageerror] ${String(e).slice(0, 300)}`));

for (const u of urls) {
  errors.length = 0;
  const full = u.startsWith('http') ? u : BASE + u;
  await page.goto(full, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(8000);
  // Nudge framer-motion entrance animations (background tabs stall them).
  await page.mouse.wheel(0, 200);
  await page.waitForTimeout(400);
  await page.mouse.wheel(0, -200);
  await page.waitForTimeout(600);
  const name = u.replace(/^https?:\/\/[^/]+/, '').replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'root';
  const file = path.join(outDir, `${mode}_${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  const text = (await page.locator('main').innerText().catch(() => '')).slice(0, 4000);
  fs.writeFileSync(path.join(outDir, `${mode}_${name}.txt`), text + '\n\n--- console errors ---\n' + errors.join('\n'));
  console.log(`${mode} ${u} → ${file} (${errors.length} console errors) final=${page.url()}`);
}
await browser.close();
