/**
 * ELE-1815 end to end as the FICTIONAL fixture learner.
 *
 *   node scripts/college-demo/mock-history-flow.mjs <phase> <outDir>
 *   phase: sit | screens | revise | desktop
 *
 * sit     — Level 3 mock 3: answer 15 questions (first option), leave the
 *           rest, wait past the 30s minimum, Finish. Writes one attempt.
 * screens — Study Centre card, history page, the latest attempt's review (phone).
 * revise  — a revision round: answer every card (first option shown).
 * desktop — the three screens at 1440.
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
  phase === 'desktop' || phase === 'weak-desktop' ? { viewport: { width: 1440, height: 900 } } : { ...devices['iPhone 14'] }
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
const shot = async (name, full = true) => {
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(outDir, `${phase}_${name}.png`), fullPage: full });
  console.log('shot', name);
};
const go = async (u) => {
  await page.goto(BASE + u, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(2500);
};

if (phase === 'sit') {
  await go('/study-centre/apprentice/level3-module8-mock-exam3');
  await page.getByRole('button', { name: /Start exam|Sit it again/ }).first().click();
  await page.waitForTimeout(1500);
  for (let q = 0; q < 15; q++) {
    await page.locator('button[aria-pressed]').first().click();
    await page.waitForTimeout(150);
    await page.getByRole('button', { name: /^Next$/ }).first().click();
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(32000); // RLS: attempts under 30s are dropped
  await page.getByRole('button', { name: /^Finish/ }).first().click();
  await page.waitForTimeout(4000);
  await shot('results', false);
  const drill = page.getByRole('button', { name: /^Drill the \d+ you missed/ });
  console.log('drill button shown:', await drill.count());
  if (await drill.count()) {
    await drill.first().click();
    await page.waitForTimeout(2500);
    console.log('drill url:', page.url().replace(BASE, ''));
    await shot('drill', false);
  }
} else if (phase === 'screens' || phase === 'desktop') {
  await go('/study-centre');
  const card = page.getByText('Your mock exams').first();
  await card.scrollIntoViewIfNeeded().catch(() => {});
  await shot('index');
  await go('/study-centre/mock-exams/history');
  await shot('history');
  await page.getByRole('button', { name: /Last attempt/ }).first().click();
  await page.waitForTimeout(2500);
  await shot('attempt');
} else if (phase === 'weak' || phase === 'weak-desktop') {
  await go('/study-centre/mock-exams/history');
  const ws = page.getByText('Your weak spots').first();
  await ws.scrollIntoViewIfNeeded().catch(() => {});
  await shot('history', false);
  await page.getByRole('button', { name: /^Revise \d+$/ }).first().click();
  await page.waitForTimeout(2500);
  await shot('topic_round', false);
} else if (phase === 'revise') {
  await go('/study-centre/mock-exams/revise');
  await shot('first', false);
  for (let n = 0; n < 12; n++) {
    const opts = page.getByRole('group', { name: 'Answers' }).getByRole('button');
    if (!(await opts.count())) break;
    await opts.first().click();
    await page.waitForTimeout(800);
    if (n === 0) await shot('answered', false);
    const next = page.getByRole('button', { name: /Next question|Finish/ });
    if (!(await next.count())) break;
    await next.first().click();
    await page.waitForTimeout(500);
  }
  await shot('done', false);
}

fs.writeFileSync(path.join(outDir, `${phase}_console.txt`), errors.join('\n'));
console.log(`${phase}: ${errors.length} console errors`);
await browser.close();
