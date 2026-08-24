#!/usr/bin/env node
/**
 * recalibrate-difficulty — re-tag question difficulty from observed answers.
 *
 * Every question carries a `difficulty` of basic/intermediate/advanced, and the
 * papers draw to a target mix of those (AM2 for instance draws 35/45/20). Until
 * now that tag was whatever the author guessed when they wrote the question.
 *
 * We now have real answers. On the first run (2026-08-24, 1,100 questions with
 * a >=30 sample) the tag agreed with observed difficulty only **73%** of the
 * time, and the disagreements were lopsided: 223 questions were tagged HARDER
 * than they actually play versus 74 tagged easier. Because papers draw by tag,
 * that made every paper systematically easier than its own difficulty curve
 * intends — which is the mechanism behind a 74% average pass rate on papers
 * meant to predict a real assessment.
 *
 * Bands are standard facility (proportion answering correctly):
 *   basic        <20% wrong
 *   intermediate 20-50% wrong
 *   advanced     >=50% wrong
 *
 * ⚠️ Only `difficulty:` is ever written. Question text, options and
 * `correctAnswer` are never touched — run `npm run check:key-integrity`
 * afterwards to prove it.
 *
 * ⚠️ Stats are merged per (bank file, question id), NOT per exam slug. Several
 * slugs share a bank — `2391-inspection-testing` and
 * `2391-51-periodic-inspection` are the same file — so tagging per slug would
 * write two different difficulties to the same line.
 *
 * Usage:
 *   1. Export stats (Supabase):
 *        select json_agg(json_build_array(exam_slug, question_id, times_shown, times_wrong))
 *        from seo_mock_question_stats where times_shown >= 15;
 *      Save the array of arrays as stats.json.
 *   2. node scripts/recalibrate-difficulty.mjs stats.json            # dry run
 *      node scripts/recalibrate-difficulty.mjs stats.json --apply    # write
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const APPLY = process.argv.includes('--apply');
const statsPath = process.argv.slice(2).find((a) => !a.startsWith('--'));

if (!statsPath || !existsSync(statsPath)) {
  console.error('usage: recalibrate-difficulty.mjs <stats.json> [--apply]');
  process.exit(2);
}

/**
 * slug -> bank file, read from the public exam pages themselves rather than a
 * hand-kept list. A hand-maintained mapping goes stale silently, which is how
 * the topic registry lost `pat-testing` for a month.
 */
function slugToBank() {
  const dir = join(ROOT, 'src/pages/mock-exams');
  const map = {};
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.tsx'))) {
    const src = readFileSync(join(dir, f), 'utf-8');
    const slug = src.match(/slug="([^"]+)"/)?.[1];
    if (!slug) continue;
    const bank = [...src.matchAll(/from '(@\/data\/[^']+)'/g)]
      .map((m) => m[1].replace('@/data', 'src/data') + '.ts')
      .find((p) => existsSync(join(ROOT, p)));
    if (bank) map[slug] = bank;
  }
  return map;
}

/**
 * Buffer zones round the band edges. With n=30 the standard error near p=0.2 is
 * about 7 points, so a question sitting at 19% versus 21% wrong is noise rather
 * than a different difficulty. Anything in a buffer keeps the tag it has —
 * on the first run that left 318 questions deliberately untouched.
 */
function confidentBand(wrongPct) {
  if (wrongPct < 15) return 'basic';
  if (wrongPct >= 25 && wrongPct < 45) return 'intermediate';
  if (wrongPct >= 55) return 'advanced';
  return null;
}

const MIN_SAMPLE = 30;
const slugBank = slugToBank();
const stats = JSON.parse(readFileSync(statsPath, 'utf-8'));

const merged = new Map();
for (const [slug, qid, shown, wrong] of stats) {
  const file = slugBank[slug];
  if (!file) continue;
  const k = `${file}::${qid}`;
  const cur = merged.get(k) ?? { file, qid, shown: 0, wrong: 0 };
  cur.shown += shown;
  cur.wrong += wrong;
  merged.set(k, cur);
}

const byFile = new Map();
for (const v of merged.values()) {
  if (v.shown < MIN_SAMPLE) continue;
  if (!byFile.has(v.file)) byFile.set(v.file, []);
  byFile.get(v.file).push(v);
}

let changed = 0;
let unchanged = 0;
let borderline = 0;
let notFound = 0;
const log = [];

for (const [file, items] of byFile) {
  const path = join(ROOT, file);
  let text = readFileSync(path, 'utf-8');
  const before = text;

  for (const it of items) {
    const wrongPct = Math.round((100 * it.wrong) / it.shown);
    const want = confidentBand(wrongPct);
    if (!want) {
      borderline++;
      continue;
    }
    // Anchored to this question's own block so the rewrite cannot leak into a
    // neighbouring question's difficulty field.
    const re = new RegExp(`(\\n  \\{[\\s\\S]*?\\bid:\\s*${it.qid}\\b[\\s\\S]*?difficulty:\\s*')([a-z]+)(')`);
    const m = text.match(re);
    if (!m) {
      notFound++;
      continue;
    }
    if (m[2] === want) {
      unchanged++;
      continue;
    }
    log.push({ file, qid: it.qid, from: m[2], to: want, wrongPct, shown: it.shown });
    text = text.replace(re, `$1${want}$3`);
    changed++;
  }

  if (APPLY && text !== before) writeFileSync(path, text);
}

console.log(`questions with >=${MIN_SAMPLE} impressions, merged across slugs`);
console.log(`  re-tagged:        ${changed}`);
console.log(`  already correct:  ${unchanged}`);
console.log(`  borderline, left: ${borderline}`);
console.log(`  id not in bank:   ${notFound}`);

const dir = {};
for (const l of log) {
  const k = `${l.from} -> ${l.to}`;
  dir[k] = (dir[k] ?? 0) + 1;
}
if (log.length) {
  console.log('\n  direction:');
  for (const [k, v] of Object.entries(dir).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${String(v).padStart(4)}  ${k}`);
  }
}

// Log goes wherever the caller asks, not into the repo root — an untracked
// artefact there just waits to be committed by accident.
const logPath = process.argv.find((a) => a.startsWith('--log='))?.slice(6);
if (logPath) writeFileSync(logPath, JSON.stringify(log, null, 1));
console.log(`\n${APPLY ? 'APPLIED' : 'DRY RUN — pass --apply to write'}${logPath ? ` · log: ${logPath}` : ''}`);
if (APPLY) console.log('now run: npm run check:key-integrity');
