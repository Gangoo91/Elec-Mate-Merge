/**
 * ELE-1815 weak-spots mock, end to end as the FICTIONAL fixture learner.
 *
 *   node scripts/college-demo/targeted-flow.mjs targeted|targeted-desktop <outDir>
 *
 * Needs a pile first: `node scripts/college-demo/mock-history-flow.mjs sit <dir>`.
 * targeted — open /study-centre/mock-exams/targeted, start, answer every
 *            question (first option), wait past 30s, Finish.
 * targeted-desktop — the start panel at 1440.
 */
import { chromium, devices } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';

const [phase, outDir] = process.argv.slice(2);
const BASE = 'http://localhost:8080';
const fixture = JSON.parse(fs.readFileSync('e2e/.auth/college-demo-learner.json', 'utf8'));
const sb = createClient(
  'https://jtwygbeceundfgnkirof.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8',
  { auth: { persistSession: false } }
);
const { data } = await sb.auth.signInWithPassword({ email: fixture.email, password: fixture.password });
if (!data?.session) throw new Error('sign-in failed');
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext(
  phase === 'targeted-desktop' ? { viewport: { width: 1440, height: 900 } } : { ...devices['iPhone 14'] }
);
await ctx.addInitScript(
  ([k, v]) => {
    try {
      if (!localStorage.getItem(k)) localStorage.setItem(k, v);
      // Answer the cookie banner (essential only) so it doesn't sit over the exam controls.
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
page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 300)));
page.on('pageerror', (e) => errors.push(String(e).slice(0, 300)));
page.on('response', (r) => {
  if (r.status() >= 400) errors.push(`[${r.status()}] ${r.request().method()} ${r.url().slice(0, 220)}`);
});
const shot = async (name, full = true) => {
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(outDir, `${phase}_${name}.png`), fullPage: full });
  console.log('shot', name);
};
const go = async (u) => {
  await page.goto(BASE + u, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(2500);
};

if (phase === 'targeted' || phase === 'targeted-desktop') {
  await go('/study-centre/mock-exams/targeted');
  await page.getByRole('button', { name: /Start exam|Sit it again/ }).first().waitFor({ timeout: 60000 });
  await shot('start', false);
  const startText = await page.locator('main').innerText().catch(() => '');
  console.log('start panel:', startText.replace(/\s+/g, ' ').slice(0, 400));
  if (phase === 'targeted') {
    const t0 = Date.now();
    await page.getByRole('button', { name: /Start exam|Sit it again/ }).first().click();
    await page.waitForTimeout(1500);
    const counter = await page.getByText(/of \d+/).first().innerText().catch(() => '');
    console.log('counter:', counter);
    for (let q = 0; q < 20; q++) {
      await page.locator('button[aria-pressed]').first().click();
      await page.waitForTimeout(150);
      const next = page.getByRole('button', { name: /^Next$/ });
      if (await next.count()) await next.first().click().catch(() => {});
      await page.waitForTimeout(150);
    }
    const wait = 33000 - (Date.now() - t0);
    if (wait > 0) await page.waitForTimeout(wait);
    await page.getByRole('button', { name: /^Finish/ }).first().click();
    await page.waitForTimeout(4500);
    await shot('results', false);
  }
}

fs.writeFileSync(path.join(outDir, `${phase}_console.txt`), errors.join('\n'));
console.log(`${phase}: ${errors.length} console errors`);
await browser.close();
