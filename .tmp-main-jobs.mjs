import { chromium } from 'playwright';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
const R = '/Users/andrewmoore/elec-mate-merge/';
const env = Object.fromEntries(fs.readFileSync(R+'.env','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const acc = JSON.parse(fs.readFileSync(R+'e2e/demo-accounts.local','utf8'));
const sb = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY);
const { data, error } = await sb.auth.signInWithPassword({ email: acc.worker_email, password: acc.worker_password });
if (error) throw error;
const [OUT, sizes, ...secs] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome' });
const errs = [];
for (const tag of sizes.split(',')) {
  const vp = tag==='d'?{width:1440,height:900}:{width:390,height:844};
  const ctx = await browser.newContext({ viewport: vp, isMobile: tag==='m' });
  await ctx.addInitScript(([s]) => { localStorage.setItem('sb-jtwygbeceundfgnkirof-auth-token', s); localStorage.setItem('elec-mate-cookie-consent','true'); localStorage.setItem('elec-mate-cookie-preferences', JSON.stringify({essential:true,analytics:false,marketing:false})); }, [JSON.stringify(data.session)]);
  const page = await ctx.newPage();
  page.on('pageerror', e => errs.push(e.message.slice(0,120)));
  for (const s of secs) {
    await page.goto(`http://localhost:8080/employer?section=${s}`,{waitUntil:'domcontentloaded',timeout:60000});
    await page.waitForTimeout(5000);
    await page.screenshot({ path: `${OUT}/${s}-${tag}.png`, fullPage: true });
  }
  await ctx.close();
}
await browser.close(); console.log('ok', errs.slice(0,5));
