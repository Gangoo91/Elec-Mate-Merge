import { chromium } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const R = '/Users/andrewmoore/elec-mate-merge/';
const env = Object.fromEntries(fs.readFileSync(R+'.env','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const acc = JSON.parse(fs.readFileSync(R+'e2e/demo-accounts.local','utf8'));
const sb = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY);
const { data, error } = await sb.auth.signInWithPassword({ email: acc.worker_email, password: acc.worker_password });
if (error) throw new Error('sign-in failed');
const [OUT, sizes, ...secs] = process.argv.slice(2);
// EMPTY=1: answer the hub data calls with empty results (tables -> [], RPCs -> null / {}).
const EMPTY = process.env.EMPTY === '1';
const MOCKS = process.env.MOCK ? JSON.parse(fs.readFileSync(process.env.MOCK,'utf8')) : null;
const TAG = process.env.TAG ?? (EMPTY ? '-empty' : '');
const KEEP_TABLES = /(employer_admins|employers|profiles|subscribers|employer_settings|user_roles|employer_firm|company_profiles|feature_flags)/;
const browser = await chromium.launch({ channel: 'chrome' });
const errs = [];
for (const tag of sizes.split(',')) {
  const vp = tag==='d'?{width:1440,height:900}:{width:390,height:844};
  const ctx = await browser.newContext({ viewport: vp, isMobile: tag==='m', deviceScaleFactor: tag==='m'?2:1 });
  await ctx.addInitScript(([s]) => { localStorage.setItem('sb-jtwygbeceundfgnkirof-auth-token', s); localStorage.setItem('elec-mate-cookie-consent','true'); localStorage.setItem('elec-mate-cookie-preferences', JSON.stringify({essential:true,analytics:false,marketing:false})); }, [JSON.stringify(data.session)]);
  await ctx.routeWebSocket(/localhost:8080/, () => {});
  await ctx.route('**/functions/v1/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{}' }));
  const merge = (a, b) => { if (b && typeof b === 'object' && !Array.isArray(b) && a && typeof a === 'object' && !Array.isArray(a)) { const o = { ...a }; for (const k of Object.keys(b)) o[k] = merge(a[k], b[k]); return o; } return b; };
  await ctx.route('**/rest/v1/**', async (r) => {
    const req = r.request();
    const m = req.method();
    const url = req.url();
    const isRpc = url.includes('/rest/v1/rpc/');
    if (m !== 'GET' && m !== 'HEAD' && !isRpc) return r.fulfill({ status: 201, contentType: 'application/json', body: '[]' });
    const nm = isRpc ? url.split('/rpc/')[1].split('?')[0] : url.split('/rest/v1/')[1].split('?')[0];
    if (MOCKS && MOCKS[nm] && MOCKS[nm].__merge) { const res = await r.fetch(); const real = await res.json().catch(() => ({})); return r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(merge(real, MOCKS[nm].__merge)) }); }
    if (MOCKS && MOCKS[nm] !== undefined) return r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(MOCKS[nm]) });
    if (EMPTY) {
      const name = isRpc ? url.split('/rpc/')[1].split('?')[0] : url.split('/rest/v1/')[1].split('?')[0];
      const keepRpc = /(my_employer|employer_role|can_see|is_|get_my|scope|feature|subscription|entitlement|get_employer_role)/;
      if (isRpc && !keepRpc.test(name)) return r.fulfill({ status: 200, contentType: 'application/json', body: 'null' });
      if (!isRpc && !KEEP_TABLES.test(name)) return r.fulfill({ status: 200, contentType: 'application/json', headers: { 'content-range': '*/0' }, body: '[]' });
    }
    return r.continue();
  });
  const page = await ctx.newPage();
  page.on('pageerror', e => errs.push((e.stack||e.message).slice(0,600)));
  for (const s of secs) {
    await page.goto(`http://localhost:8080/employer?section=${s}`,{waitUntil:'domcontentloaded',timeout:60000});
    await page.waitForTimeout(Number(process.env.WAIT ?? 7000));
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    if (sw > vp.width + 1) errs.push(`${s}-${tag} scrollWidth ${sw}`);
    await page.screenshot({ path: `${OUT}/${s}-${tag}${TAG}.png`, fullPage: true });
  }
  await ctx.close();
}
await browser.close(); console.log('ok', errs.slice(0,10));
