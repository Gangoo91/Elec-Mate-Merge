import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewportSize: { width: 1280, height: 720 } });
await p.goto('file://' + process.argv[2], { waitUntil: 'networkidle' });
const r = await p.evaluate(() => {
  const s = document.querySelectorAll('section.s')[13];
  const top = s.getBoundingClientRect().top;
  const grid = s.querySelector('div[style*="grid-template-columns"]');
  const cards = [...grid.children].map(c => Math.round(c.getBoundingClientRect().height));
  const last = s.lastElementChild.getBoundingClientRect();
  return { gridTop: Math.round(grid.getBoundingClientRect().top - top),
           gridH: Math.round(grid.getBoundingClientRect().height),
           cards, sectionEnd: Math.round(last.bottom - top) };
});
console.log(JSON.stringify(r));
await b.close();
