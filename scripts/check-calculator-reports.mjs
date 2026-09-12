#!/usr/bin/env node
/**
 * Guards the 65 calculator -> client PDF reports (ELE-1699).
 *
 *   npm run check:calc-reports
 *
 * WHY THIS EXISTS
 * Every calculator describes its result as a `CalcReport` and one PDFMonkey
 * template renders it, so a defect in a `buildReport` is not a crash — it is a
 * wrong document in a client's inbox. `tsc` and eslint are clean on all of the
 * faults below, and the six that mattered most were found only by reading all
 * 65 by hand:
 *
 *   - a report cited "BS 7671 Reg 643.8", which does not exist in A4:2026
 *   - another displayed "Table 4F1 — Minimum Internal Bend Radii"; there is no
 *     such table, and 522.8.3 deliberately gives no numeric radius
 *   - two calculators produced PDFs with the SAME title, indistinguishable in
 *     the saved-reports drawer
 *   - 17 titles ended in "Calculator", so the PDF said "AC Power Calculator"
 *     where every other one said the subject
 *
 * Hand-reading does not survive the next edit. This does.
 *
 * The checks are deliberately narrow. An earlier loose version of the
 * restatement rule flagged 26 calculators of which only 2 were real — a row
 * that repeats a headline LABEL but adds a permissible limit, more precision or
 * a different basis is good practice, not a defect. So a restatement is only
 * reported when the label AND the value expression are byte-identical AND the row
 * carries no `note` — which is what an actual copy-paste looks like. A row that
 * restates a figure while adding its permissible limit, its basis or what it
 * means is earning its place; so is a running total in an itemised build-up.
 *
 * Static analysis on purpose: `buildReport` closes over component state, so
 * running one means rendering a React tree. Reading the source catches these
 * classes without a test framework, in about a second.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const CALC_DIR = 'src/components/apprentice/calculators';
const REGISTRY = 'src/components/calculators/shared/calculatorComponents.ts';

const problems = [];
const fail = (file, rule, detail) => problems.push({ file, rule, detail });

/**
 * A string-literal property in either quote style. Titles like "Ohm's Law" are
 * double-quoted because they contain an apostrophe; a single-quote-only pattern
 * silently reports them as missing.
 */
const STR = (key, flags = '') => new RegExp(`${key}:\\s*(['"])((?:(?!\\1).)*)\\1`, flags);

/** Returns the substring starting at the first `open` at/after `from`, brace-matched. */
function balanced(src, from, open, close) {
  const start = src.indexOf(open, from);
  if (start === -1) return null;
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) return { start, end: i + 1, text: src.slice(start, i + 1) };
    }
  }
  return null;
}

/** The body of `buildReport`, or null when the file has none. */
function buildReportBody(src) {
  // Word-boundary: a prefix match treats `buildReportDisabled` as present.
  const i = src.search(/\bconst buildReport\b/);
  if (i === -1) return null;
  const block = balanced(src, i, '{', '}');
  return block ? block.text : null;
}

/** `[{ label: 'x', value: expr, ... }, ...]` entries as {label, value} pairs. */
function entries(arrayText) {
  if (!arrayText) return [];
  const out = [];
  const re = /\{[^{}]*\}/g;
  let m;
  while ((m = re.exec(arrayText))) {
    const label = STR('label').exec(m[0])?.[2];
    const value = /value:\s*([^,\n]+)/.exec(m[0])?.[1]?.trim();
    // A row carrying a `note` is doing work the headline does not — a permissible
    // limit, the basis, what the figure means — so it is not a restatement.
    const hasNote = /\bnote:/.test(m[0]);
    if (label && value) out.push({ label, value, hasNote });
  }
  return out;
}

// ── registry ───────────────────────────────────────────────────────────────
const registrySrc = readFileSync(REGISTRY, 'utf8');
// Keys are a MIX of quoted and unquoted — matching only quoted ones reported
// 58 of 65 entries covered when 6 had no report at all.
const registry = [
  ...registrySrc.matchAll(
    /['"]?([A-Za-z0-9_-]+)['"]?\s*:\s*lazy\(\s*\(\)\s*=>\s*import\(['"]([^'"]+)['"]/g
  ),
].map(([, slug, target]) => ({ slug, name: target.split('/').pop() }));

const titles = new Map();

for (const { slug, name } of registry) {
  const file = join(CALC_DIR, `${name}.tsx`);
  let src;
  try {
    src = readFileSync(file, 'utf8');
  } catch {
    fail(file, 'coverage', `registry entry '${slug}' points at a file that does not exist`);
    continue;
  }

  const body = buildReportBody(src);
  if (!body) {
    fail(file, 'coverage', `'${slug}' has no buildReport, so it offers no PDF to a client`);
    continue;
  }

  // ── meta ────────────────────────────────────────────────────────────────
  const metaIdx = body.indexOf('meta:');
  const meta = metaIdx === -1 ? null : balanced(body, metaIdx, '{', '}')?.text;
  const title = meta && STR('title').exec(meta)?.[2];

  if (title) {
    if (/\s(Calculator|Tool)$/i.test(title)) {
      fail(file, 'title-suffix', `meta.title '${title}' — the PDF should name the subject`);
    }
    const seen = titles.get(title);
    if (seen) fail(file, 'title-collision', `shares the report title '${title}' with ${seen}`);
    else titles.set(title, name);
  } else {
    fail(file, 'title-missing', 'buildReport has no meta.title');
  }

  // ── standards must be grounded in the component itself ──────────────────
  const standard = meta && STR('standard').exec(meta)?.[2];
  if (standard) {
    const rest = meta ? src.replace(meta, '') : src;
    // A document token ("BS 7671", "BS EN 60228", "IEEE 1584") or a regulation
    // number must appear OUTSIDE the meta block — i.e. the component actually
    // states the basis, rather than the report asserting it.
    // EVERY specific citation must appear, not merely the document name. An
    // earlier version accepted "BS 7671 — Reg 999.99.9" because "BS 7671"
    // appears all over the file — which means it would have waved through the
    // "Reg 643.8" that motivated this script. The regulation number, clause or
    // table is the claim; the document name is not.
    const specific = [
      ...standard.matchAll(/\b\d{3}(?:\.\d+)+\b/g),
      ...standard.matchAll(/\bTable\s+\d+[A-Za-z0-9.]*/g),
      ...standard.matchAll(/\bApp(?:endix)?\.?\s+\d+[A-Za-z0-9.]*/gi),
    ].map((t) => t[0]);
    const documents = [
      ...standard.matchAll(/\b(?:BS\s?EN|BS|IEC|ISO|IEEE|EN)\s?\d+(?:-\d+)?/g),
    ].map((t) => t[0]);

    const present = (t) => rest.includes(t) || rest.includes(t.replace(/\s+/g, ''));
    const ungrounded = [...specific, ...(specific.length ? [] : documents)].filter(
      (t) => !present(t)
    );
    if (ungrounded.length) {
      fail(
        file,
        'standard-ungrounded',
        `meta.standard '${standard}' cites ${ungrounded.map((t) => `"${t}"`).join(', ')}, ` +
          `which the component never states — cite only what the calculator's own code says`
      );
    }
  }

  // ── section headings are sentence case ──────────────────────────────────
  for (const [, , heading] of body.matchAll(STR('heading', 'g'))) {
    const words = heading.split(/\s+/).filter(Boolean);
    const capitalised = words.filter((w) => /^[A-Z][a-z]{2,}$/.test(w));
    if (words.length > 1 && capitalised.length > 1) {
      fail(file, 'heading-case', `section heading '${heading}' is Title Case; use sentence case`);
    }
  }

  // ── a section row that is a byte-identical copy of a headline entry ──────
  const hIdx = body.indexOf('headline');
  const sIdx = body.indexOf('sections');
  if (hIdx !== -1 && sIdx !== -1 && hIdx < sIdx) {
    const headline = entries(body.slice(hIdx, sIdx));
    const rows = entries(body.slice(sIdx));
    for (const h of headline) {
      const dupe = rows.find((r) => r.label === h.label && r.value === h.value && !r.hasNote);
      if (dupe) {
        fail(
          file,
          'headline-restated',
          `'${h.label}' appears in the headline and again below with the identical value ` +
            `— the sections should show the working, not repeat the answer`
        );
      }
    }
  }
}

// ── report ─────────────────────────────────────────────────────────────────
const checked = registry.length;
if (problems.length === 0) {
  console.log(`✔ ${checked} calculator reports checked — all clean`);
  process.exit(0);
}

const byRule = new Map();
for (const p of problems) byRule.set(p.rule, [...(byRule.get(p.rule) ?? []), p]);

console.error(`\n✖ ${problems.length} problem(s) across ${checked} calculator reports\n`);
for (const [rule, list] of byRule) {
  console.error(`  ${rule} (${list.length})`);
  for (const p of list) console.error(`    ${p.file}\n      ${p.detail}`);
  console.error('');
}
process.exit(1);
