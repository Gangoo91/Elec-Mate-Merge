// One-off visual capture of the redesigned Worker Tools hub + every sheet.
// Signs in as the dev-whitelisted founder account, seeds the session into the
// dev server origin, then screenshots the hub and each tool sheet at phone width.
import { chromium, devices } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';

// Credentials come from env, or are read from the project's existing e2e test
// fixture at runtime — never hardcoded in this file.
function resolveCreds() {
  const src = fs.readFileSync(new URL('../e2e/fixtures/auth.ts', import.meta.url), 'utf8');
  const defEmail = src.match(/TEST_EMAIL\s*=[\s\S]*?\|\|\s*'([^']+)'/)?.[1];
  const defPass = src.match(/TEST_PASSWORD\s*=[\s\S]*?\|\|\s*'([^']+)'/)?.[1];
  // All { email, password } literal pairs in AUTH_CREDENTIALS
  const pairs = [...src.matchAll(/email:\s*'([^']+)'\s*,\s*password:\s*'([^']+)'/g)].map((m) => ({
    email: m[1],
    password: m[2],
  }));
  const list = [];
  if (process.env.TEST_EMAIL && process.env.TEST_PASSWORD)
    list.push({ email: process.env.TEST_EMAIL, password: process.env.TEST_PASSWORD });
  if (defEmail && defPass) list.push({ email: defEmail, password: defPass });
  list.push(...pairs);
  if (list.length === 0) throw new Error('Could not resolve test credentials');
  return list;
}

const BASE = 'http://localhost:8081';
const OUT = '/tmp/wt-shots';
const SUPABASE_URL = 'https://jtwygbeceundfgnkirof.supabase.co';
const ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';
const STORAGE_KEY = 'sb-jtwygbeceundfgnkirof-auth-token';

const CARDS = [
  'My Status',
  'Timesheets',
  'My Pay',
  'Leave',
  'Team Comms',
  'My Jobs',
  'My Tasks',
  'Sign-offs',
  'Credentials',
  'My Equipment',
  'Progress Notes',
  'Expenses',
  'Reports',
  'QS Reviews',
];

fs.mkdirSync(OUT, { recursive: true });
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const sb = createClient(SUPABASE_URL, ANON, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});
let data = null;
for (const creds of resolveCreds()) {
  const res = await sb.auth.signInWithPassword(creds);
  if (!res.error && res.data.session) {
    data = res.data;
    break;
  }
  console.log('auth try failed:', creds.email, '-', res.error?.message);
}
if (!data?.session) {
  console.error('AUTH FAILED for all credentials');
  process.exit(1);
}
console.log('signed in as', data.user.email);

const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices['iPhone 13'] });
const page = await ctx.newPage();

// Seed the session into the dev origin's localStorage.
await page.goto(`${BASE}/auth/signin`, { waitUntil: 'domcontentloaded' });
await page.evaluate(
  ({ key, session }) => window.localStorage.setItem(key, JSON.stringify(session)),
  { key: STORAGE_KEY, session: data.session }
);

await page.goto(`${BASE}/electrician/worker-tools`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}/00-hub.png`, fullPage: true });
console.log('captured: hub');

let i = 1;
for (const label of CARDS) {
  const card = page.getByRole('button', { name: new RegExp(label, 'i') }).first();
  try {
    if ((await card.count()) === 0) {
      console.log('skip (not present):', label);
      continue;
    }
    await card.click({ timeout: 4000 });
    await page.waitForTimeout(1400);
    await page.screenshot({ path: `${OUT}/${String(i).padStart(2, '0')}-${slug(label)}.png` });
    console.log('captured:', label);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(700);
    i++;
  } catch (e) {
    console.log('FAILED:', label, '-', e.message.split('\n')[0]);
    await page.keyboard.press('Escape').catch(() => {});
    await page.waitForTimeout(500);
  }
}

await browser.close();
console.log('done ->', OUT);
