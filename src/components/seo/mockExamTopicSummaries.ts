/**
 * Topic lists for the public mock exam pages — without the question banks.
 *
 * WHY THIS IS SEPARATE FROM `mockExamTopicRegistry`
 * That module statically imports 32 question banks, because `resolveTopicPage`
 * genuinely needs the questions. But `getTopicsForExam` — which is all
 * `PublicMockExamPage` and `RevisionPlan` ever wanted — returns
 * `{category, slug, qCount}`. It counts questions per category and never reads
 * one.
 *
 * Since `PublicMockExamPage` renders EVERY mock exam page, that single import
 * put every exam's bank on every exam page. /mock-exams/2391-inspection-testing
 * was downloading the banks for confined spaces, fire safety, working at height
 * and first aid. Measured on production against a throttled Pixel 5 (4x CPU,
 * 1.6 Mbps — roughly what Google scores): 71 JS files, 2,553 KB, LCP 13,248 ms
 * against a 2,500 ms "good" threshold, with FCP equal to LCP because nothing
 * paints until the JS runs. The same page unthrottled on desktop was 428 ms,
 * which is how it stayed invisible.
 *
 * The counts here are generated FROM the registry by
 * `scripts/generate-topic-summaries.mjs`, so they cannot drift from its logic —
 * it is the same function, run at build time instead of in the browser. The
 * JSON is committed so a dev build needs no generate step.
 *
 * 🔴 Import THIS from anything that only needs topic names and counts. Import
 * `mockExamTopicRegistry` only where real questions are used — which today is
 * `MockExamTopicPage` alone, via `resolveTopicPage`.
 */
import summaries from '@/data/seo/mockExamTopicSummaries.json';

export interface TopicSummary {
  category: string;
  slug: string;
  qCount: number;
}

/**
 * Fewest questions a topic needs before it gets its own landing page.
 *
 * Re-declared here rather than imported from the registry: importing anything
 * from that module would pull the banks back in and undo the entire point of
 * this file. The generator applies the same threshold on its side, and
 * `npm run check:topic-registry` compares the two counts.
 */
export const MIN_TOPIC_QUESTIONS = 5;

const BY_EXAM = summaries as Record<string, TopicSummary[]>;

/** Topic landings for an exam, most substantial first (as generated). */
export function getTopicsForExam(examSlug: string): TopicSummary[] {
  return BY_EXAM[examSlug] ?? [];
}

/** All known (examSlug, topicSlug) pairs. */
export function getAllTopicRoutes(): Array<{
  examSlug: string;
  topicSlug: string;
  category: string;
  qCount: number;
}> {
  return Object.entries(BY_EXAM).flatMap(([examSlug, topics]) =>
    topics.map((t) => ({
      examSlug,
      topicSlug: t.slug,
      category: t.category,
      qCount: t.qCount,
    }))
  );
}
