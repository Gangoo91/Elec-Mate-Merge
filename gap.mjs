import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewportSize: { width: 1280, height: 720 } });
await p.goto('file://' + process.argv[2], { waitUntil: 'networkidle' });
const r = await p.evaluate(() => [...document.querySelectorAll('section.s')].map((s, i) => {
  const f = s.querySelector('.fill');
  return { n: i + 1, gap: f ? Math.round(f.getBoundingClientRect().height) : null };
}));
r.forEach(x => console.log(`slide ${String(x.n).padStart(2)}  fill gap ${x.gap === null ? '—' : x.gap + 'px' + (x.gap > 45 ? '   <-- dead space' : '')}`));
await b.close();
