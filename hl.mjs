import { chromium } from 'playwright';
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewportSize: { width: 1280, height: 720 } });
await p.goto('file://' + process.argv[2], { waitUntil: 'networkidle' });
const r = await p.evaluate(() => [...document.querySelectorAll('section.s')].map((s, i) => {
  const h = s.querySelector('h1,h2'); if (!h) return null;
  const cs = getComputedStyle(h);
  const lines = Math.round(h.getBoundingClientRect().height / parseFloat(cs.lineHeight));
  const brs = h.querySelectorAll('br').length;
  return { n: i + 1, lines, brs, txt: h.textContent.trim().slice(0, 46) };
}).filter(Boolean));
r.forEach(x => console.log(`slide ${String(x.n).padStart(2)}  ${x.lines} line(s), ${x.brs} <br>  ${x.lines > x.brs + 1 ? '<-- WRAPS beyond its breaks' : ''}  "${x.txt}"`));
await b.close();
