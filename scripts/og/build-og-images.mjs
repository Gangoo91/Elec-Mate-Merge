/**
 * Link-preview cards (Open Graph) — 4 Oct 2026.
 *
 *   public/og-image.jpg              homepage + every page without its own
 *   public/images/og-referral.jpg    /r/:code invite links (api/og/referral.ts)
 *
 * WhatsApp shows these about 480px wide on a phone, so everything on the card
 * is sized to read at 40%: an 80px headline, 28px body, one button. Tokens
 * match the app: ground #1c1c1c (--background), volt #FFC800 (--elec-yellow),
 * Inter, eyebrow 0.16em, headline -0.035em, phone fading out like the landing. The phone is the certificates screen, not the
 * dashboard — the dashboard carries dated banners (Referral Race, Oct 2026).
 *
 * Run: node scripts/og/build-og-images.mjs   (needs Chrome; uses Playwright)
 * Then bump ?v= on og:image in index.html and src/hooks/useSEO.ts, or
 * WhatsApp/Facebook keep serving their cached copy.
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const pub = `file://${root}/public`;

const CARDS = [
  {
    out: 'public/og-image.jpg',
    eyebrow: 'For UK electricians &amp; apprentices',
    headline: 'The whole job.<br>One app.',
    sub: 'Certs, quotes, invoices and an AI that knows the regs.',
    button: '7 days free',
    tail: '<span class="stars">★★★★★</span>5.0 on Google Play',
  },
  {
    out: 'public/images/og-referral.jpg',
    eyebrow: 'You’ve been invited',
    headline: 'Your first<br>month’s free.',
    sub: 'Certs, quotes, invoices and an AI that knows the regs. Built by an electrician.',
    button: 'Claim your free month',
    tail: 'iOS · Android · Web',
  },
];

const page = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Inter;src:url(${pub}/fonts/inter-500.woff2);font-weight:500}
@font-face{font-family:Inter;src:url(${pub}/fonts/inter-600.woff2);font-weight:600}
@font-face{font-family:Inter;src:url(${pub}/fonts/inter-700.woff2);font-weight:700}
*{margin:0;box-sizing:border-box}html,body{width:1200px;height:630px;overflow:hidden}
body{font-family:Inter,-apple-system,sans-serif;color:#fff;position:relative;
  background:radial-gradient(ellipse 600px 500px at 905px 340px,#262626 0%,#1c1c1c 72%),#1c1c1c}
.l{position:absolute;left:72px;top:64px;width:640px}
.brand{display:flex;align-items:center;gap:16px}.brand img{width:64px;height:64px;border-radius:15px}
.brand span{font-size:30px;font-weight:700;letter-spacing:-.5px}.brand b{color:#FFC800;font-weight:700}
.eye{margin-top:52px;font-size:22px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#FFC800}
h1{margin-top:14px;font-size:80px;line-height:.98;font-weight:700;letter-spacing:-.035em}
p{margin-top:22px;font-size:28px;line-height:1.3;font-weight:500;max-width:600px;text-wrap:balance}
.row{position:absolute;left:72px;bottom:56px;display:flex;align-items:center;gap:22px}
.btn{background:#FFC800;color:#000;font-size:28px;font-weight:700;padding:16px 30px;border-radius:16px}
.tail{font-size:24px;font-weight:600}
.phone{position:absolute;right:58px;top:52px;width:370px;-webkit-mask-image:linear-gradient(to bottom,#000 72%,transparent 99%);mask-image:linear-gradient(to bottom,#000 72%,transparent 99%)}
.stars{color:#FFC800;letter-spacing:.12em;margin-right:8px}
</style></head><body>
<div class="l"><div class="brand"><img src="${pub}/images/landing/v5/logo-96.webp"><span>Elec-<b>Mate</b></span></div>
<div class="eye">${c.eyebrow}</div><h1>${c.headline}</h1><p>${c.sub}</p></div>
<div class="row"><span class="btn">${c.button}</span><span class="tail">${c.tail}</span></div>
<img class="phone" src="${pub}/images/landing/v5/certs-phone.webp">
</body></html>`;

const browser = await chromium.launch({ channel: 'chrome' });
const tab = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const c of CARDS) {
  // Loaded from a file so the file:// fonts and images are allowed.
  const html = resolve(tmpdir(), 'elec-mate-og.html');
  writeFileSync(html, page(c));
  await tab.goto(`file://${html}`, { waitUntil: 'networkidle' });
  rmSync(html);
  await tab.evaluate(() => document.fonts.ready);
  const png = `${root}/${c.out}.png`;
  await tab.screenshot({ path: png });
  // JPEG keeps WhatsApp happy (it drops previews over ~600 KB).
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '88', png, '--out', `${root}/${c.out}`], { stdio: 'ignore' });
  execFileSync('rm', [png]);
  console.log('wrote', c.out);
}
await browser.close();
