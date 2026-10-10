import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewportSize: { width: 1280, height: 720 } });
await p.goto('file://' + process.argv[2], { waitUntil: 'networkidle' });
const out = await p.evaluate(() => [...document.querySelectorAll('section.s')].map(s => {
  const bits = [];
  const walk = document.createTreeWalker(s, NodeFilter.SHOW_TEXT);
  let n; while ((n = walk.nextNode())) {
    const t = n.textContent.trim();
    if (t.length >= 25) bits.push(t);
  }
  return bits;
}));
writeFileSync('/tmp/leaves.json', JSON.stringify(out));
console.log('slides', out.length, 'text runs', out.flat().length);
await b.close();
