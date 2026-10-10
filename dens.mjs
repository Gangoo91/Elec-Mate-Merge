import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewportSize: { width: 1280, height: 720 } });
await p.goto('file://' + process.argv[2], { waitUntil: 'networkidle' });
const r = await p.evaluate(() => [...document.querySelectorAll('section.s')].map((s, i) => {
  const t = s.getBoundingClientRect();
  let ink = 0, last = 0;
  for (const el of s.querySelectorAll('*')) {
    const b = el.getBoundingClientRect();
    if (!b.height || !b.width) continue;
    if (el.children.length === 0) ink += b.width * b.height;
    last = Math.max(last, b.bottom - t.top);
  }
  const words = (s.textContent || '').trim().split(/\s+/).length;
  return { n: i + 1, words, fillTo: Math.round(last), pct: Math.round(ink / (1280 * 720) * 100) };
}));
r.forEach(x => console.log(`slide ${String(x.n).padStart(2)}  ${String(x.words).padStart(4)} words   content ends ${String(x.fillTo).padStart(3)}px   ink ${String(x.pct).padStart(2)}%`));
await b.close();
