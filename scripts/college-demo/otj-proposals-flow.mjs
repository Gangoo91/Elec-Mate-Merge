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

const [fixturePath, outDir, mode, phase] = process.argv.slice(2);
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
page.on('console', (m) => { if (m.type() === 'error') errors.push(`[console] ${m.text().slice(0, 300)}`); });
page.on('pageerror', (e) => errors.push(`[pageerror] ${String(e).slice(0, 300)}`));
const shot = async (name) => {
  await page.screenshot({ path: path.join(outDir, `${mode}_${phase}_${name}.png`), fullPage: name !== 'sheet' });
};
const card = () => page.locator('section#confirm');

if (phase === 'tutor') {
  await page.goto(BASE + '/college/otj', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(3500);
  await shot('page');
  const sec = page.locator('section[aria-label="Confirmed by apprentices"]');
  console.log('tutor section:', (await sec.innerText().catch(() => 'MISSING')).slice(0, 1200));
} else {
  await page.goto(BASE + '/apprentice/ojt-hub#confirm', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(4000);
  console.log('card:', (await card().innerText().catch(() => 'MISSING')).slice(0, 1500));
  await shot('before');
  if (phase === 'confirm') {
    const row = card().locator('li', { hasText: 'Initial verification' });
    await row.getByRole('button', { name: 'Confirm' }).click();
    await page.waitForTimeout(3500);
    console.log('after confirm:', (await card().innerText().catch(() => 'MISSING')).slice(0, 1500));
    await shot('after');
  }
  if (phase === 'reject') {
    const row = card().locator('li', { hasText: 'College session' });
    await row.getByRole('button', { name: 'Not right' }).click();
    await page.waitForTimeout(1200);
    await shot('sheet');
    console.log('sheet:', (await page.getByRole('dialog').innerText().catch(() => 'NO DIALOG')).slice(0, 900));
    await page.getByRole('button', { name: 'I already logged it' }).click();
    await page.getByRole('button', { name: 'Turn down' }).click();
    await page.waitForTimeout(3500);
    await card().getByRole('button', { name: /Answered recently/ }).click().catch(() => {});
    await page.waitForTimeout(600);
    console.log('after reject:', (await card().innerText().catch(() => 'MISSING')).slice(0, 1500));
    await shot('after');
  }
  if (phase === 'change') {
    const row = card().locator('li').first();
    await row.getByRole('button', { name: 'Change' }).click();
    await page.waitForTimeout(1500);
    await shot('sheet');
  }
}
console.log(`${mode} ${phase} console errors: ${errors.length}`); for (const e of errors) console.log(e);
await browser.close();
