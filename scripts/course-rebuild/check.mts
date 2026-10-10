import { readFileSync, existsSync } from 'node:fs';
const M = Number(process.argv[2]);
const CATS: Record<number, string> = {1:'What a BMS is, and the rules around it',2:'Field devices and signals',3:'Controlling heating, ventilation and air conditioning',4:'Lighting, access, blinds and metering',5:'Networks and protocols',6:'Alarms, data and monitoring',7:'Design, installation, commissioning and handover'};
const SECTIONS: Record<number, number> = {1:6,2:7,3:6,4:5,5:6,6:6,7:7};
const mod = await import(`./module${M}.ts`);
const qs = mod[`bmsMockModule${M}`] as any[];
const errs: string[] = [];
if (!qs) { console.log('no export'); process.exit(1); }
if (qs.length !== 30) errs.push(`count ${qs.length}`);
const ids = new Set<number>(); const pos = [0,0,0,0]; const diff: Record<string, number> = {}; const sec: Record<string, number> = {};
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
const pageStems: string[] = [];
for (let s = 1; s <= SECTIONS[M]; s++) {
  const f = `/Users/andrewmoore/elec-mate-merge/src/pages/upskilling/BMSModule${M}Section${s}.tsx`;
  if (existsSync(f)) for (const m of readFileSync(f, 'utf8').matchAll(/question:\s*\n?\s*['"`]([^'"`]+)/g)) pageStems.push(norm(m[1]));
}
for (const q of qs) {
  if (ids.has(q.id)) errs.push(`dup id ${q.id}`); ids.add(q.id);
  if (q.id < M * 1000 + 1 || q.id > M * 1000 + 30) errs.push(`id out of range ${q.id}`);
  if (!Array.isArray(q.options) || q.options.length !== 4) errs.push(`${q.id} options`);
  if (!(q.correctAnswer >= 0 && q.correctAnswer <= 3)) errs.push(`${q.id} answer`); else pos[q.correctAnswer]++;
  if (q.category !== CATS[M]) errs.push(`${q.id} category "${q.category}"`);
  if (!/^\d\.\d$/.test(q.section) || +q.section.split('.')[0] !== M || +q.section.split('.')[1] > SECTIONS[M]) errs.push(`${q.id} section ${q.section}`);
  diff[q.difficulty] = (diff[q.difficulty] || 0) + 1; sec[q.section] = (sec[q.section] || 0) + 1;
  if (!q.explanation || q.explanation.length < 40) errs.push(`${q.id} explanation`);
  const lens = q.options.map((o: string) => o.length); const right = lens[q.correctAnswer];
  if (right > Math.max(...lens.filter((_: number, i: number) => i !== q.correctAnswer)) * 1.5) errs.push(`${q.id} right answer much longer`);
  if (/all of the above|none of the above/i.test(q.options.join(' '))) errs.push(`${q.id} all/none`);
  if (pageStems.includes(norm(q.question))) errs.push(`${q.id} copies a section quiz question`);
  if (/\b(analog|color|center|optimiz|organiz|grounding|lockout)\b/i.test(q.question + q.options.join(' ') + q.explanation)) errs.push(`${q.id} US term`);
}
for (let s = 1; s <= SECTIONS[M]; s++) if ((sec[`${M}.${s}`] || 0) < 4) errs.push(`section ${M}.${s} only ${sec[`${M}.${s}`] || 0}`);
console.log(`module ${M}: ${qs.length} qs, positions ${pos.join('/')}, diff ${JSON.stringify(diff)}, sections ${JSON.stringify(sec)}`);
console.log(errs.length ? 'ISSUES: ' + errs.join(' | ') : 'OK');
