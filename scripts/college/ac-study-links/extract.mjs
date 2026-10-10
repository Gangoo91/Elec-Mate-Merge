#!/usr/bin/env node
/**
 * ELE-1904 — criterion → the Study Centre page that teaches it, and the
 * practice questions that test it. EXTRACTS mappings people already wrote;
 * it never judges content itself.
 *
 * Source 1 (Study): every Level 2 / Level 3 lesson page opens with a header
 * its author wrote, e.g.
 *     * Maps to C&G 2365-03 / Unit 304 / LO1 / AC 1.1
 *     * Layered depth: 2357 Unit 607 ELTK06 / AC 1.1; 2366-03 Unit 302 / AC 1.1
 * Each (qualification, unit, AC) named there becomes a Study link to that
 * page's route. Lines marked "supplementary" (no direct AC tag) are skipped.
 * Every key is checked against qualification_requirements (valid_acs.json);
 * anything that isn't a real criterion is dropped and counted.
 *
 * Source 2 (Practise): the question → page table the mock exams already use
 * (studyLinkFor over src/data/study-centre/mockTopicLessons.ts, content-
 * matched by hand, ELE-1815). countBankSections.ts counts the questions that
 * table sends to each section page; a criterion taught on a page in that
 * section gets "Practise" on those questions (only when there are 5 or more).
 *
 * Usage:
 *   node scripts/college/ac-study-links/extract.mjs <valid_acs.json> <bank_counts.json> <out.sql>
 * valid_acs.json: { "2365-03|304|1.1": 1, ... } (qualification|unit|ac → LO)
 * bank_counts.json: output of countBankSections.ts (see its header).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../..');
const [validPath, countsPath, outPath] = process.argv.slice(2);
if (!validPath || !countsPath || !outPath) {
  console.error('usage: extract.mjs <valid_acs.json> <bank_counts.json> <out.sql>');
  process.exit(1);
}
const VALID = JSON.parse(fs.readFileSync(validPath, 'utf8'));
const COUNTS = JSON.parse(fs.readFileSync(countsPath, 'utf8'));
const MIN_PRACTISE = 5;
const WPM = 200;

/* ── routes: page file → URL ─────────────────────────────────────────── */
function routesFrom(file, base) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const nameToFile = new Map();
  const lazy = /const (\w+) = lazyWithRetry\([\s\S]*?import\('(@\/pages\/[^']+)'\)/g;
  for (const m of src.matchAll(lazy)) nameToFile.set(m[1], m[2].replace('@/', 'src/') + '.tsx');
  const out = new Map();
  for (const m of src.matchAll(/<Route path="([^"]+)" element={<(\w+) \/>}/g)) {
    const f = nameToFile.get(m[2]);
    if (f && !out.has(f)) out.set(f, `${base}${m[1]}`);
  }
  return out;
}
const ROUTES = new Map([
  ...routesFrom('src/routes/Level3Routes.tsx', '/study-centre/apprentice/'),
  ...routesFrom('src/routes/Level2Routes.tsx', '/study-centre/apprentice/level2/'),
]);

/* ── header parsing ──────────────────────────────────────────────────── */
const AC_NUM = /\d+\.\d+/;

/** "1.1, 1.2 + 1.4", "1.1-1.5", "2.1 (regs) and AC 2.2" → ['1.1', ...] */
function acList(text) {
  const out = [];
  const clean = text.replace(/\([^)]*\)/g, ' ').replace(/["“][^"”]*["”]/g, ' ');
  for (const m of clean.matchAll(/(\d+)\.(\d+)(?:\s*[-–]\s*(?:\1\.)?(\d+))?/g)) {
    const major = m[1];
    const from = Number(m[2]);
    const to = m[3] ? Number(m[3]) : from;
    if (to < from || to - from > 15) continue;
    for (let n = from; n <= to; n++) out.push(`${major}.${n}`);
  }
  return out;
}

/** One "<qual> / Unit N / LO n / AC …" run → [{qual, unit, ac}] */
function parseRun(qual, run) {
  const out = [];
  if (/supplementary/i.test(run)) return out;
  // Drop author's commentary after an em dash or a colon.
  const body = run.split(/\s[—–]\s|:\s/)[0];
  let unit = null;
  for (const seg of body.split(/\s\+\s|;|\s\/\s(?=Unit)/)) {
    const u = seg.match(/Unit\s+(\d{3})/);
    if (u) unit = u[1];
    const acAt = seg.search(/\bAC\b|\bACs\b/);
    if (!unit || acAt === -1) continue;
    for (const ac of acList(seg.slice(acAt))) out.push({ qual, unit, ac });
  }
  // Bare continuations like "AC 5.4 + AC 5.5" / "AC 4.4 + 4.5" were split on "+".
  if (unit) {
    for (const seg of body.split(/\s\+\s/).slice(1)) {
      if (/Unit|\bLO\d/.test(seg) || /\bAC\b/.test(seg)) continue;
      if (AC_NUM.test(seg)) for (const ac of acList(seg)) out.push({ qual, unit, ac });
    }
  }
  return out;
}

function headerOf(src) {
  const m = src.match(/^\s*\/\*\*([\s\S]*?)\*\//);
  return m ? m[1].split('\n').map((l) => l.replace(/^\s*\*\s?/, '').trimEnd()) : [];
}

/** Lines starting at `start` until a blank / quoted AC text / new keyword. */
function block(lines, start) {
  const out = [lines[start]];
  for (let i = start + 1; i < lines.length; i++) {
    const l = lines[i].trim();
    if (!l || /^(AC\s+\d|["“]|Layered|Maps to|Frame|Note|SUPPLEMENTARY)/i.test(l)) break;
    out.push(l);
  }
  return out.join(' ');
}

function titleOf(lines, src) {
  const first = lines.find((l) => /—/.test(l));
  if (first) return first.split(/\s—\s/).slice(1).join(' — ').trim();
  const seo = src.match(/useSEO\(\s*['"`]([^'"`]+)['"`]/);
  return seo ? seo[1].split('|')[0].trim() : null;
}

function minutesOf(src) {
  const body = src.replace(/^[\s\S]*?\*\//, '').replace(/^import .*$/gm, '');
  const strings = [...body.matchAll(/(['"`])((?:(?!\1)[^\\\n]|\\.){12,})\1/g)].map((m) => m[2]);
  const jsxText = [...body.matchAll(/>\s*([^<>{}]{12,})\s*</g)].map((m) => m[1]);
  const words = [...strings, ...jsxText]
    .join(' ')
    .split(/\s+/)
    .filter((w) => /[a-z]/i.test(w));
  return Math.max(1, Math.round(words.length / WPM));
}

/** "/study-centre/apprentice/level3-module5-section1-3" → its section landing route. */
function sectionRouteOf(route) {
  const l3 = route.match(/^(\/study-centre\/apprentice\/level3-module\d+-section\d+)-\d+$/);
  if (l3) return l3[1];
  const l2 = route.match(/^(\/study-centre\/apprentice\/level2\/module\d+\/section\d+)\/[^/]+$/);
  if (l2) return l2[1];
  return null;
}

/* ── walk ────────────────────────────────────────────────────────────── */
const links = new Map(); // key → row
const stats = { pages: 0, pagesWithMaps: 0, unrouted: [], dropped: [], study: 0, practise: 0 };

for (const [file, route] of ROUTES) {
  if (!/\/level[23]\//.test(file)) continue;
  const abs = path.join(ROOT, file);
  if (!fs.existsSync(abs)) continue;
  stats.pages++;
  const src = fs.readFileSync(abs, 'utf8');
  const lines = headerOf(src);
  const found = [];
  lines.forEach((l, i) => {
    const maps = l.match(/^Maps to (?:C&G|City & Guilds)\s+(\d{4}(?:-\d{2})?)\s*\/\s*(.*)$/);
    if (maps) {
      const run = block(lines, i).replace(/^Maps to (?:C&G|City & Guilds)\s+\S+\s*\/\s*/, '');
      found.push(...parseRun(maps[1], run).map((x) => ({ ...x, source: 'page_header' })));
    }
    if (/^Layered depth/i.test(l)) {
      const text = block(lines, i).replace(/^Layered depth[^:]*:?\s*/i, '');
      for (const part of text.split(';')) {
        const q = part.match(/(\d{4}(?:-\d{2})?)\s+Unit\s+(\d{3})/);
        if (!q) continue;
        found.push(
          ...parseRun(q[1], part.slice(part.indexOf('Unit'))).map((x) => ({
            ...x,
            source: 'page_header_layered',
          }))
        );
      }
    }
  });
  if (!found.length) continue;
  stats.pagesWithMaps++;
  const title = titleOf(lines, src);
  const minutes = minutesOf(src);
  const sectionRoute = sectionRouteOf(route);
  for (const f of found) {
    const k = `${f.qual}|${f.unit}|${f.ac}`;
    if (!(k in VALID)) {
      stats.dropped.push(`${k} (${file})`);
      continue;
    }
    const sk = `${k}|study|${route}`;
    if (!links.has(sk)) {
      links.set(sk, {
        qualification_code: f.qual,
        unit_code: f.unit,
        lo_number: VALID[k],
        ac_code: f.ac,
        kind: 'study',
        route,
        title,
        minutes,
        question_count: null,
        bank_slug: null,
        source: f.source,
        source_ref: file,
      });
      stats.study++;
    }
    const bank = sectionRoute ? COUNTS[sectionRoute] : null;
    if (bank && bank.count >= MIN_PRACTISE) {
      const pk = `${k}|practise|${sectionRoute}`;
      if (!links.has(pk)) {
        links.set(pk, {
          qualification_code: f.qual,
          unit_code: f.unit,
          lo_number: VALID[k],
          ac_code: f.ac,
          kind: 'practise',
          route: sectionRoute,
          // The practice paper covers the whole section, not this one lesson.
          title: null,
          minutes: null,
          question_count: bank.count,
          bank_slug: bank.slug,
          source: 'mock_topic_lessons',
          source_ref: 'src/data/study-centre/mockTopicLessons.ts',
        });
        stats.practise++;
      }
    }
  }
}

/* ── SQL ─────────────────────────────────────────────────────────────── */
const lit = (v) =>
  v == null ? 'null' : typeof v === 'number' ? String(v) : `'${String(v).replace(/'/g, "''")}'`;
const rows = [...links.values()];
const values = rows
  .map(
    (r) =>
      `(${[r.qualification_code, r.unit_code, r.lo_number, r.ac_code, r.kind, r.route, r.title, r.minutes, r.question_count, r.bank_slug, r.source, r.source_ref].map(lit).join(', ')})`
  )
  .join(',\n');
const sql = `-- Generated by scripts/college/ac-study-links/extract.mjs (ELE-1904). Do not edit by hand:
-- re-run the script. ${stats.study} study links, ${stats.practise} practise links from ${stats.pagesWithMaps} pages.
insert into public.ac_study_links
  (qualification_code, unit_code, lo_number, ac_code, kind, route, title, minutes, question_count, bank_slug, source, source_ref)
values
${values}
on conflict (qualification_code, unit_code, ac_code, kind, route) do update set
  lo_number = excluded.lo_number, title = excluded.title, minutes = excluded.minutes,
  question_count = excluded.question_count, bank_slug = excluded.bank_slug,
  source = excluded.source, source_ref = excluded.source_ref;
`;
fs.writeFileSync(outPath, sql);
const byQual = {};
for (const r of rows)
  byQual[`${r.qualification_code} ${r.kind}`] =
    (byQual[`${r.qualification_code} ${r.kind}`] ?? 0) + 1;
console.log(
  JSON.stringify(
    {
      ...stats,
      dropped: stats.dropped.length,
      droppedSample: process.env.ALL_DROPPED ? stats.dropped : stats.dropped.slice(0, 15),
      byQual,
      routes: ROUTES.size,
    },
    null,
    1
  )
);
