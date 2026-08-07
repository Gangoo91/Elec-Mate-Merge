#!/usr/bin/env node
/**
 * verify-key-integrity — prove a distractor rewrite did not touch any answer.
 *
 * The distractor work rewrites wrong options at scale to remove the "correct
 * answer is always the longest" tell. The one thing that must never happen is
 * a correct answer being edited: a previous pass trimmed a comparison key down
 * to half the comparison and made it factually wrong on a question asking for
 * the difference between two things.
 *
 * apply-distractor-patch.mjs refuses to write a changed key, but that is the
 * tool vouching for itself. This checks the FILE against git HEAD instead, so
 * it catches a hand-edit, a bad merge, or anything that bypassed the tool.
 *
 * Compares, per question id: the text of the option at `correctAnswer`, the
 * `correctAnswer` index itself, and the set of ids present.
 *
 * ⚠️ IT COMPARES AGAINST HEAD, SO IT IS ONLY MEANINGFUL WHEN HEAD IS CURRENT.
 * On 2026-08-07 it reported 61 changed keys in asbestos / firstAid / mewp /
 * pasma. None came from that day's work: they were the 2026-08-06 pass's
 * uncommitted key TRIMS, still sitting in the working tree. Before treating a
 * failure as damage, check whether the change is a trim from earlier
 * uncommitted work — and read the actual before/after text rather than the
 * count. (The 62nd is a deliberate correctness fix to mewp #163, whose key
 * answered only half a comparison question.)
 *
 * Usage: node scripts/verify-key-integrity.mjs [<file> ...]
 *        no args = every bank a public mock exam imports
 *        exit 0 = every key identical to HEAD; exit 1 = something moved
 */
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * With no arguments, check EVERY bank a public mock exam imports.
 *
 * This used to require an explicit file list, and package.json carried a
 * hand-written one. It covered 14 of 36 live banks, so the gate passed while
 * 22 banks — including asbestos, first aid and MEWP — were never examined at
 * all. A hand-maintained list of files to check has the same failure mode as
 * the hand-maintained topic registry did: it silently goes stale.
 */
function discoverBanks() {
  const dir = join(ROOT, 'src/pages/mock-exams');
  const banks = new Set();
  if (!existsSync(dir)) return [];
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.tsx'))) {
    for (const m of readFileSync(join(dir, f), 'utf-8').matchAll(/from '(@\/data\/[^']+)'/g)) {
      const p = m[1].replace('@/data', 'src/data') + '.ts';
      if (existsSync(join(ROOT, p))) banks.add(p);
    }
  }
  return [...banks].sort();
}

const files = process.argv.slice(2).length ? process.argv.slice(2) : discoverBanks();
if (!files.length) {
  console.error('no bank files found');
  process.exit(2);
}

/**
 * Compare the string VALUE, not the source text.
 *
 * A key written "the organisation's policy" in double quotes and rewritten as
 * 'the organisation\'s policy' in single quotes is the same answer. Comparing
 * raw source flagged 13 of those as changed keys on the first run — a false
 * alarm that would have sent agents to "fix" answers that were already right.
 */
function decode(s) {
  return s.replace(/\\(['"\\])/g, '$1');
}

/** id -> { key, index } for every question in a bank source. */
function extractKeys(text) {
  const out = new Map();
  for (const block of text.split(/\n\s{2}\{/)) {
    const id = block.match(/id:\s*(\d+)/);
    // `\n?` matters: short banks write the whole array on one line
    // (`options: ['Section 7', 'Section 5', …],`). Requiring a newline before
    // the closing bracket silently dropped those questions, which then read as
    // "LOST IDS" — a false alarm on ids that were perfectly intact.
    const opts = block.match(/options:\s*\[([\s\S]*?)\n?\s*\],/);
    const ca = block.match(/correctAnswer:\s*(\d+)/);
    if (!id || !opts || !ca) continue;
    const options = [...opts[1].matchAll(/'((?:[^'\\]|\\.)*)'|"([^"]*)"/g)].map((m) =>
      decode(m[1] ?? m[2])
    );
    const idx = Number(ca[1]);
    if (idx < options.length) out.set(id[1], { key: options[idx], index: idx });
  }
  return out;
}

let failed = false;
for (const file of files) {
  let headSrc;
  try {
    headSrc = execFileSync('git', ['show', `HEAD:${file}`], { encoding: 'utf-8' });
  } catch {
    console.error(`? ${file}: not in HEAD (new file) — skipping`);
    continue;
  }
  const before = extractKeys(headSrc);
  const after = extractKeys(readFileSync(file, 'utf-8'));

  const changed = [];
  const moved = [];
  for (const [id, a] of before) {
    const b = after.get(id);
    if (!b) continue;
    if (a.key !== b.key) changed.push(id);
    if (a.index !== b.index) moved.push(id);
  }
  const lost = [...before.keys()].filter((id) => !after.has(id));
  const added = [...after.keys()].filter((id) => !before.has(id));

  const ok = !changed.length && !moved.length && !lost.length && !added.length;
  if (!ok) failed = true;
  console.log(
    `${ok ? '✅' : '❌'} ${file}\n` +
      `    ${before.size} -> ${after.size} questions · keys changed ${changed.length} · index moved ${moved.length} · lost ${lost.length} · added ${added.length}`
  );
  if (changed.length) console.error(`    CHANGED KEYS: ${changed.slice(0, 20).join(', ')}`);
  if (moved.length) console.error(`    MOVED INDEX:  ${moved.slice(0, 20).join(', ')}`);
  if (lost.length) console.error(`    LOST IDS:     ${lost.slice(0, 20).join(', ')}`);
  if (added.length) console.error(`    ADDED IDS:    ${added.slice(0, 20).join(', ')}`);
}
process.exit(failed ? 1 : 0);
