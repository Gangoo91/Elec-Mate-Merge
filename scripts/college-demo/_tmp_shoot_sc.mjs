import { chromium, devices } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
const [outDir, ...routes] = process.argv.slice(2);
const fixture = JSON.parse(fs.readFileSync('e2e/.auth/college-demo-learner.json', 'utf8'));
const sb = createClient('https://jtwygbeceundfgnkirof.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8',{ auth: { persistSession: false } });
const { data } = await sb.auth.signInWithPassword({ email: fixture.email, password: fixture.password });
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
for (const [name, opts] of [['phone', { ...devices['iPhone 14'] }], ['desktop', { viewport: { width: 1440, height: 900 } }]]) {
  const ctx = await browser.newContext(opts);
  await ctx.addInitScript(([k, v]) => { try { localStorage.setItem(k, v); localStorage.setItem('elec-mate-cookie-consent','true'); localStorage.setItem('elec-mate-cookie-preferences', JSON.stringify({essential:true,analytics:false,marketing:false})); } catch {} }, ['sb-jtwygbeceundfgnkirof-auth-token', JSON.stringify(data.session)]);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 300)));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 200)));
  for (const r of routes) {
    await page.goto('http://localhost:8080' + r, { waitUntil: 'networkidle', timeout: 90000 }).catch(() => {});
    await page.waitForTimeout(4000);
    const f = `${outDir}/${name}_${r.replace(/[^a-z0-9]+/gi, '_')}.png`;
    await page.screenshot({ path: f, fullPage: true });
    console.log('shot', f);
  }
  console.log(name, 'errors:', errors.filter(e=>!/favicon|Failed to load resource|posthog|sentry/i.test(e)).slice(0,6));
  await ctx.close();
}
await browser.close();
