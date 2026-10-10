import { chromium } from 'playwright';
const f = process.argv[2];
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewportSize: { width: 1280, height: 720 } });
await p.goto('file://' + f, { waitUntil: 'networkidle' });
const rows = await p.evaluate(() => [...document.querySelectorAll('section.s')].map((s, i) => {
  // deepest bottom of any child relative to the section
  const top = s.getBoundingClientRect().top;
  let max = 0, worst = '';
  for (const el of s.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.height === 0 || r.width === 0) continue;
    const bottom = r.bottom - top;
    if (bottom > max) { max = bottom; worst = (el.tagName + '.' + (el.className || '')).slice(0, 44) + ' :: ' + (el.textContent || '').trim().slice(0, 52); }
  }
  return { n: i + 1, bottom: Math.round(max), worst };
}));
for (const r of rows) {
  const over = r.bottom - 720;
  console.log(`${String(r.n).padStart(2)}  bottom ${String(r.bottom).padStart(4)}  ${over > 2 ? 'OVER by ' + over + '  ' + r.worst : 'ok'}`);
}
await b.close();
