/**
 * ELE-1891 phone audit: for each College Hub URL at 390px as the fixture tutor,
 * report horizontal overflow, tables wider than the screen, and tap targets
 * under 44px.   node scripts/college-demo/phone-audit.mjs <url…>
 */
import { chromium, devices } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
const ANON = fs.readFileSync('scripts/college-demo/shoot.mjs', 'utf8').match(/'(eyJ[^']+)'/)[1];
const fx = JSON.parse(fs.readFileSync('e2e/.auth/college-demo-tutor.json', 'utf8'));
const sb = createClient('https://jtwygbeceundfgnkirof.supabase.co', ANON, { auth: { persistSession: false } });
const { data } = await sb.auth.signInWithPassword({ email: fx.email, password: fx.password });
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices['iPhone 14'], locale: 'en-GB' });
await ctx.addInitScript(([k, v]) => { try { if (!localStorage.getItem(k)) localStorage.setItem(k, v); localStorage.setItem('cookie-consent', JSON.stringify({ necessary: true, analytics: false, marketing: false, timestamp: Date.now() })); } catch {} }, ['sb-jtwygbeceundfgnkirof-auth-token', JSON.stringify(data.session)]);
const page = await ctx.newPage();
for (const u of process.argv.slice(2)) {
  await page.goto('http://localhost:8080' + u, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(3500);
  const r = await page.evaluate(() => {
    const vw = window.innerWidth;
    const main = document.querySelector('main') || document.body;
    const overflow = document.documentElement.scrollWidth - vw;
    const tables = [...main.querySelectorAll('table')].filter((t) => t.getBoundingClientRect().width > vw).map((t) => `${Math.round(t.getBoundingClientRect().width)}px table: ${(t.innerText || '').slice(0, 60).replace(/\s+/g, ' ')}`);
    const small = [...main.querySelectorAll('button, a[href], [role=button], input, select')]
      .filter((el) => { const b = el.getBoundingClientRect(); const s = getComputedStyle(el); return b.width > 0 && b.height > 0 && b.height < 40 && s.visibility !== 'hidden' && el.type !== 'checkbox' && el.type !== 'hidden'; })
      .map((el) => `${Math.round(el.getBoundingClientRect().height)}px ${el.tagName.toLowerCase()} "${(el.innerText || el.getAttribute('aria-label') || el.getAttribute('placeholder') || '').trim().slice(0, 40).replace(/\s+/g, ' ')}"`);
    return { overflow, tables, small: [...new Set(small)].slice(0, 25), smallCount: small.length };
  });
  console.log(`\n== ${u}\n overflow=${r.overflow}px tables=${JSON.stringify(r.tables)}\n small(${r.smallCount}): ${r.small.join(' | ')}`);
}
await browser.close();
