import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewportSize: { width: 1280, height: 720 } });
await p.goto('file://' + process.argv[2], { waitUntil: 'networkidle' });
const r = await p.evaluate(n => {
  const s = document.querySelectorAll('section.s')[n - 1];
  const top = s.getBoundingClientRect().top;
  return [...s.querySelectorAll('*')].map(el => {
    const b = el.getBoundingClientRect();
    return { b: Math.round(b.bottom - top), t: (el.textContent || '').trim().slice(0, 40), tag: el.tagName };
  }).filter(x => x.b > 685).sort((a, c) => c.b - a.b).slice(0, 6);
}, Number(process.argv[3]));
r.forEach(x => console.log(`  bottom ${x.b}px  <${x.tag}>  ${x.t}`));
await b.close();
