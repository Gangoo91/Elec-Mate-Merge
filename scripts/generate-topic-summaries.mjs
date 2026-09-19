#!/usr/bin/env node
/**
 * generate-topic-summaries — precompute the per-exam topic lists so the public
 * mock exam pages stop shipping 2 MB of question banks to count them.
 *
 * WHY THIS EXISTS
 * `mockExamTopicRegistry.ts` statically imports 32 question banks. Every mock
 * exam page renders `<PublicMockExamPage>`, which imports that registry for one
 * function — `getTopicsForExam()` — and that function returns
 * `{category, slug, qCount}`. It counts questions per category and never reads
 * a question.
 *
 * So the 2391 Inspection & Testing page was downloading the banks for confined
 * spaces, fire safety, working at height and first aid. Measured on production
 * against a throttled Pixel 5 (4x CPU, 1.6 Mbps — roughly what Google scores):
 * 71 JS files, 2,553 KB, and an LCP of 13,248 ms against a 2,500 ms "good"
 * threshold. Unthrottled desktop was 428 ms, which is why it never showed up.
 *
 * The counts are derived from the same runtime code that used to do it in the
 * browser — bundled with esbuild and run under Node, the trick
 * `check-topic-registry.mjs` already uses — so this cannot drift from the
 * registry's own logic. It is the same function, moved off the critical path.
 *
 * Output: src/data/seo/mockExamTopicSummaries.json
 * Guarded by: npm run check:topic-registry (compares runtime vs build counts)
 */
import { execFileSync } from 'child_process';
import { writeFileSync, mkdtempSync, rmSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { tmpdir } from 'os';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'src/data/seo/mockExamTopicSummaries.json');

function runInNode(source) {
  const dir = mkdtempSync(join(tmpdir(), 'topic-summaries-'));
  try {
    const entry = join(dir, 'entry.ts');
    const bundle = join(dir, 'bundle.cjs');
    writeFileSync(entry, source);
    execFileSync(
      'npx',
      [
        'esbuild',
        entry,
        '--bundle',
        '--platform=node',
        '--format=cjs',
        `--alias:@=${join(ROOT, 'src')}`,
        `--outfile=${bundle}`,
        '--log-level=error',
      ],
      { cwd: ROOT, stdio: ['ignore', 'ignore', 'inherit'] }
    );
    return JSON.parse(execFileSync('node', [bundle], { encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 }));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// Ask the registry itself, so the numbers are by construction the ones the
// browser used to compute.
const routes = runInNode(
  `import { getAllTopicRoutes } from '@/components/seo/mockExamTopicRegistry';\n` +
    `console.log(JSON.stringify(getAllTopicRoutes()));\n`
);

/** { examSlug: [{ category, slug, qCount }, …] }, ordered as the registry orders them. */
const byExam = {};
for (const r of routes) {
  (byExam[r.examSlug] ??= []).push({ category: r.category, slug: r.topicSlug, qCount: r.qCount });
}

const next = JSON.stringify(byExam, null, 2) + '\n';
const prev = existsSync(OUT) ? readFileSync(OUT, 'utf-8') : '';
if (prev === next) {
  console.log(`  topic summaries unchanged (${Object.keys(byExam).length} exams)`);
} else {
  writeFileSync(OUT, next);
  const topics = Object.values(byExam).reduce((n, v) => n + v.length, 0);
  console.log(
    `  wrote ${OUT.replace(ROOT + '/', '')} — ${Object.keys(byExam).length} exams, ${topics} topics`
  );
}
