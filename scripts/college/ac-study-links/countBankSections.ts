/**
 * ELE-1904 helper: how many questions each Study Centre section page has in
 * its module's question bank, using the SAME question → page mapping the mock
 * exams use (studyLinkFor, built on the content-matched tables in
 * src/data/study-centre/mockTopicLessons.ts). Nothing here judges content:
 * it only counts what those human-made tables already say.
 *
 * Bundle with esbuild and run under node; its JSON output is extract.mjs's
 * second argument:
 *   npx esbuild scripts/college/ac-study-links/countBankSections.ts --bundle \
 *     --platform=node --format=esm --tsconfig=tsconfig.app.json --outfile=/tmp/count.mjs \
 *     '--external:@/data/upskilling/*' '--external:@/data/general-upskilling/*'
 *   node /tmp/count.mjs > bank_counts.json
 * Prints { "<section landing route>": { slug, count } }.
 */
import { loadBank } from '@/lib/study-centre/mockBankRegistry';
import { studyLinkFor } from '@/lib/study-centre/mockStudyLinks';

// Runs under node (bundled by esbuild); the app tsconfig has no node types.
declare const process: { stdout: { write(s: string): void } };

async function main() {
  const out: Record<string, { slug: string; count: number }> = {};
  const papers = [
    ...[1, 2, 3, 4, 5, 6, 7].map((m) => `level3-module8-mock${m}`),
    ...[1, 2, 3, 4, 5].map((m) => `level2-module8-mock${m}`),
  ];
  for (const slug of papers) {
    const bank = await loadBank(slug);
    for (const q of bank) {
      const link = studyLinkFor(slug, q.section, q.module, q.topic ?? q.category);
      // Only section pages (".../section3" or "-section3"), never a module fallback.
      if (!link || !/section\d+$/.test(link.to)) continue;
      const hit = (out[link.to] ??= { slug, count: 0 });
      if (hit.slug === slug) hit.count += 1;
    }
  }
  process.stdout.write(JSON.stringify(out));
}

void main();
