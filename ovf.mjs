import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewportSize: { width: 1280, height: 720 } });
await p.goto('file://' + process.argv[2], { waitUntil: 'networkidle' });
await p.emulateMedia({ media: 'print' });
const r = await p.evaluate(() => [...document.querySelectorAll('section.s')].map((s, i) => {
  const t = s.getBoundingClientRect().top;
  let max = 0, who = '';
  for (const el of s.querySelectorAll('*')) {
    const b = el.getBoundingClientRect();
    if (!b.height) continue;
    if (b.bottom - t > max) { max = b.bottom - t; who = (el.textContent || '').trim().slice(-58); }
  }
  return { n: i + 1, h: Math.round(max), who };
}));
r.filter(x => x.h > 721).forEach(x => console.log(`slide ${x.n}: content ${x.h}px — ${x.h - 720}px OVER · ends "...${x.who}"`));
console.log('checked', r.length, 'slides');
await b.close();
