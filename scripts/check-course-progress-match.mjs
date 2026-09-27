/**
 * Regression guard for `src/lib/courseProgressMatch.ts`.
 *
 * The matcher reconciles eight historical (course_key, section_key) formats
 * (ELE-1045), so any change to it risks silently emptying the progress on a
 * course nobody thought to check. There is no unit-test runner in this repo —
 * `npm test` is Playwright — so this is a standalone script.
 *
 *   node scripts/check-course-progress-match.mjs
 *
 * The Welsh cases exist because `welsh-level3` tokenised to ['welsh','level3']
 * and the matcher is bidirectional, so the English Level 3 row matched every
 * Welsh module and vice versa. Both courses displayed the other's progress.
 */

import { execFileSync } from 'node:child_process';
import { writeFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const out = join(tmpdir(), `cpm-${process.pid}.cjs`);
execFileSync('npx', ['esbuild', 'src/lib/courseProgressMatch.ts', '--bundle',
  '--platform=node', '--format=cjs', '--log-level=error', `--outfile=${out}`],
  { stdio: ['ignore', 'ignore', 'inherit'] });
const { moduleProgress } = await import(`file://${out}`);
unlinkSync(out);

const rows = [
  // Bare course-level rows — the ones that caused the cross-course leak.
  { course_key: 'apprentice', section_key: 'level3', progress_pct: 50, completed: false },
  { course_key: 'apprentice', section_key: 'level2', progress_pct: 50, completed: false },
  { course_key: 'apprentice', section_key: 'am2', progress_pct: 50, completed: false },
  // Welsh, in the current URL shape.
  { course_key: 'apprentice', section_key: 'welsh-level3/module2/section1/303-1-1',
    progress_pct: 50, completed: false },
  // Historical formats the matcher exists to reconcile.
  { course_key: 'am2-module1', section_key: 'section1-quiz', progress_pct: 70, completed: true },
  { course_key: 'bs7671', section_key: 'module-1-section-1', progress_pct: 40, completed: false },
  { course_key: 'unknown', section_key: '/study-centre/apprentice/level2/module1/1-1',
    progress_pct: 60, completed: false },
];

const cases = [
  ['Welsh module 1 does not inherit the English level3 row',
   '/study-centre/apprentice/welsh-level3/module1', 0],
  ['Welsh module 2 shows its own row',
   '/study-centre/apprentice/welsh-level3/module2', 50],
  ['Welsh module 8 does not inherit the English level3 row',
   '/study-centre/apprentice/welsh-level3/module8', 0],
  ['Welsh final paper does not inherit anything',
   '/study-centre/apprentice/welsh-level3/mock-exam', 0],
  ['English Level 3 still reads its own bare row',
   '/study-centre/apprentice/level3/module2', 50],
  ['apprentice-derived format still matches (am2-module1 / section1-quiz)',
   '/study-centre/apprentice/am2/module1', 70],
  ['upskilling hyphenated format still matches (bs7671 / module-1-section-1)',
   '/study-centre/upskilling/bs7671/module-1', 40],
  ['the "unknown" full-path fallback still matches',
   '/study-centre/apprentice/level2/module1', 60],
];

let failed = 0;
for (const [label, path, expected] of cases) {
  const { pct } = moduleProgress(rows, path);
  const ok = pct === expected;
  if (!ok) failed++;
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${label}${ok ? '' : `  — got ${pct}%, expected ${expected}%`}`);
}
console.log(`\n  ${cases.length - failed}/${cases.length} passed`);
process.exit(failed ? 1 : 0);
