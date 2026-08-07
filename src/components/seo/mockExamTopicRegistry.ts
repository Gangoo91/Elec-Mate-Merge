/**
 * mockExamTopicRegistry — single source of truth for /mock-exams/:slug/:topic pages.
 *
 * For each exam with `category`-tagged questions, this file:
 *   1. Exposes the underlying bank
 *   2. Derives an array of `{ category, slug, qCount }` from the bank
 *   3. Provides the page-level meta (title prefix, intro template, etc.)
 *
 * The dynamic route `/mock-exams/:examSlug/:topicSlug` (see MockExamRoutes)
 * resolves an entry from here, filters the bank to the matching category,
 * and renders <PublicMockExamPage> with topic-specific copy.
 *
 * A topic comes from one of two places (see `topicOf`):
 *   • `category` on the question — the 13 upskilling/H&S banks
 *   • `sectionNames[section]` on the entry — the Level 2/3 apprentice banks,
 *     whose questions carry section CODES ('3.1') rather than names
 *
 * The per-exam metadata lives in `src/data/seo/mockExamTopics.json`, which
 * `scripts/generate-seo-html.mjs` reads too. It used to be duplicated: a TS
 * array here and a hand-kept mirror in the build script, with a comment
 * telling you to update both. They had already drifted — `pat-testing` was
 * present here and missing there, so its topic pages resolved in the browser
 * but got no static HTML and were never indexable. Hence one JSON file: the
 * only thing that stays in TypeScript is `BANKS`, because those are imports.
 */
import { am2QuestionBank } from '@/data/apprentice-courses/am2/questionBank';
import { asbestosQuestionBank } from '@/data/general-upskilling/asbestosMockExamData';
import { confinedSpacesQuestionBank } from '@/data/general-upskilling/confinedSpacesMockExamData';
import { coshhQuestionBank } from '@/data/general-upskilling/coshhMockExamData';
import { cscsCardQuestionBank } from '@/data/general-upskilling/cscsCardMockExamData';
import { fireSafetyQuestionBank } from '@/data/general-upskilling/fireSafetyMockExamData';
import { firstAidQuestionBank } from '@/data/general-upskilling/firstAidMockExamData';
import { ipafQuestionBank } from '@/data/general-upskilling/ipafMockExamData';
import { manualHandlingQuestionBank } from '@/data/general-upskilling/manualHandlingMockExamData';
import { pasmaQuestionBank } from '@/data/general-upskilling/pasmaMockExamData';
import { workingAtHeightQuestionBank } from '@/data/general-upskilling/workingAtHeightMockExamData';
import { inspectionTestingQuestionBank } from '@/data/upskilling/inspectionTestingMockExamData';
import { patTestingQuestionBank } from '@/data/upskilling/patTestingMockExamData';
// The 18th Edition bank. Its questions already carried `category` values but the
// exam was never registered here, so the site's highest-demand exam had no topic
// landings at all while smaller ones had eight.
import { mockExamQuestions } from '@/data/upskilling/mockExamQuizData';
// Nine more specialist banks that already carried `category` values and were
// never registered — 67 topic landings that existed as data but not as pages.
import { emergencyLightingQuestionBank } from '@/data/upskilling/emergencyLightingMockExamData';
import { fireAlarmQuestionBank } from '@/data/upskilling/fireAlarmMockExamData';
import { evChargingQuestionBank } from '@/data/upskilling/evChargingMockExamData';
import { dataCablingQuestionBank } from '@/data/upskilling/dataCablingMockExamData';
import { renewableEnergyQuestionBank } from '@/data/upskilling/renewableEnergyMockExamData';
import { smartHomeQuestionBank } from '@/data/upskilling/smartHomeMockExamData';
import { industrialElectricalQuestionBank } from '@/data/upskilling/industrialElectricalMockExamData';
import { instrumentationMockExamQuestions } from '@/data/upskilling/instrumentationMockExamData';
import { fiberOpticsQuestionBank } from '@/data/upskilling/fiberOpticsMockExamData';
// Level 2/3 apprentice banks — these tag questions with `section` codes, so
// they reach topic pages through `sectionNames` rather than `category`.
// NOTE: `@/data/apprentice-courses/…` is the LIVE tree. `@/data/apprentice/level*`
// is orphaned (zero imports anywhere in src/) — never source a bank from it.
import { module5QuestionBank } from '@/data/apprentice-courses/level2/module5/questionBank';
import { module1Questions } from '@/data/apprentice-courses/level3/module1/questionBank';
import { module2Questions } from '@/data/apprentice-courses/level3/module2/questionBank';
import { module3Questions } from '@/data/apprentice-courses/level3/module3/questionBank';
import { module4Questions } from '@/data/apprentice-courses/level3/module4/questionBank';
import { module6Questions } from '@/data/apprentice-courses/level3/module6/questionBank';
import { module7Questions } from '@/data/apprentice-courses/level3/module7/questionBank';

import topicMeta from '@/data/seo/mockExamTopics.json';

import type { SEOMockExamQuestion } from '@/components/seo/SEOMockExam';

interface TopicExamEntry {
  /** Exam slug — matches the parent /mock-exams/<slug> route. */
  examSlug: string;
  /** Human display name used in titles ("AM2 Online Knowledge Test"). */
  examShortName: string;
  /** Plural noun used in copy ("AM2 questions", "asbestos awareness questions"). */
  subject: string;
  /** Auth-signup CTA query param fragment ("am2", "asbestos"). */
  signupRef: string;
  /** Per-topic exam length defaults. */
  questionsPerExam: number;
  timeLimitMinutes: number;
  passThreshold: number;
  /** Underlying bank — `category` field is what gets sliced for topics. */
  bank: SEOMockExamQuestion[];
  /**
   * For banks whose questions carry a `section` CODE ('3.1', '5.2.4') instead
   * of a human-readable `category`. Maps the code to the topic name used in
   * the URL, H1, title and description.
   *
   * The names are not invented — they are lifted from each bank's own section
   * banners (`// Section 3.1: Ohm's Law & Power`, `// §5.1.1 — AC 1.1 Site
   * management team & roles`) or from the `topic` field where every question
   * in the section agrees on one. Two sections carried an internal build
   * label rather than a topic name and were renamed from their content; both
   * are flagged at their entry below.
   *
   * Only sections listed here become landing pages. Sections are deliberately
   * omitted where the bank splits a module into 40–96 fragments of 3–7
   * questions — too thin to make a mock exam worth ranking.
   */
  sectionNames?: Record<string, string>;
}

/**
 * The topic a question belongs to: an explicit `category` when the bank has
 * one, otherwise the name mapped from its `section` code. Returns undefined
 * for questions in sections we deliberately didn't name, which keeps them out
 * of the topic listings while leaving them in the parent exam's full bank.
 */
function topicOf(q: SEOMockExamQuestion, entry: TopicExamEntry): string | undefined {
  if (typeof q.category === 'string' && q.category) return q.category;
  const section = typeof q.section === 'string' ? q.section.trim() : '';
  return section ? entry.sectionNames?.[section] : undefined;
}

/**
 * Bank lookup — the ONE thing that cannot live in JSON, because these are
 * module imports. Keyed by the `examSlug` in mockExamTopics.json; every slug
 * there must appear here or the entry is dropped with a console warning.
 */
const BANKS: Record<string, SEOMockExamQuestion[]> = {
  '18th-edition-bs-7671': mockExamQuestions as unknown as SEOMockExamQuestion[],
  'emergency-lighting': emergencyLightingQuestionBank as unknown as SEOMockExamQuestion[],
  'fire-alarm': fireAlarmQuestionBank as unknown as SEOMockExamQuestion[],
  'ev-charging': evChargingQuestionBank as unknown as SEOMockExamQuestion[],
  'data-cabling': dataCablingQuestionBank as unknown as SEOMockExamQuestion[],
  'renewable-energy': renewableEnergyQuestionBank as unknown as SEOMockExamQuestion[],
  'smart-home': smartHomeQuestionBank as unknown as SEOMockExamQuestion[],
  'industrial-electrical': industrialElectricalQuestionBank as unknown as SEOMockExamQuestion[],
  'instrumentation': instrumentationMockExamQuestions as unknown as SEOMockExamQuestion[],
  'fibre-optics': fiberOpticsQuestionBank as unknown as SEOMockExamQuestion[],
  'am2-online-knowledge-test': am2QuestionBank as unknown as SEOMockExamQuestion[],
  '2391-inspection-testing': inspectionTestingQuestionBank as unknown as SEOMockExamQuestion[],
  'pat-testing': patTestingQuestionBank as unknown as SEOMockExamQuestion[],
  'asbestos-awareness': asbestosQuestionBank as unknown as SEOMockExamQuestion[],
  'confined-spaces': confinedSpacesQuestionBank as unknown as SEOMockExamQuestion[],
  coshh: coshhQuestionBank as unknown as SEOMockExamQuestion[],
  'cscs-card': cscsCardQuestionBank as unknown as SEOMockExamQuestion[],
  'fire-safety': fireSafetyQuestionBank as unknown as SEOMockExamQuestion[],
  'first-aid': firstAidQuestionBank as unknown as SEOMockExamQuestion[],
  ipaf: ipafQuestionBank as unknown as SEOMockExamQuestion[],
  'manual-handling': manualHandlingQuestionBank as unknown as SEOMockExamQuestion[],
  pasma: pasmaQuestionBank as unknown as SEOMockExamQuestion[],
  'working-at-height': workingAtHeightQuestionBank as unknown as SEOMockExamQuestion[],
  'level-2-communications-career': module5QuestionBank as unknown as SEOMockExamQuestion[],
  'level-3-electrical-health-safety': module1Questions as unknown as SEOMockExamQuestion[],
  'level-3-environmental-technologies': module2Questions as unknown as SEOMockExamQuestion[],
  'level-3-electrical-science': module3Questions as unknown as SEOMockExamQuestion[],
  'level-3-fault-diagnosis': module4Questions as unknown as SEOMockExamQuestion[],
  'level-3-systems-design': module6Questions as unknown as SEOMockExamQuestion[],
  'level-3-career-development': module7Questions as unknown as SEOMockExamQuestion[],
};

interface TopicExamMeta extends Omit<TopicExamEntry, 'bank'> {
  /** Path used by the build script to read the bank; unused at runtime. */
  bankFile: string;
}

const REGISTRY: TopicExamEntry[] = (topicMeta as TopicExamMeta[]).flatMap((meta) => {
  const bank = BANKS[meta.examSlug];
  if (!bank) {
    // Loud rather than silent: a slug in the JSON with no bank here means the
    // topic pages 404 in the browser while the prerender still emits HTML.
    console.warn(`[mockExamTopicRegistry] no bank for "${meta.examSlug}" — skipped`);
    return [];
  }
  return [{ ...meta, bank }];
});

const REGISTRY_BY_SLUG: Record<string, TopicExamEntry> = Object.fromEntries(
  REGISTRY.map((e) => [e.examSlug, e])
);

/** URL-safe slug for a category string. Deterministic + reversible enough
 * that we don't need to store both — slug-to-category lookup happens by
 * re-slugifying every category in the bank and matching. */
export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, 'and')
    // Drop apostrophes rather than letting them become separators, so
    // "Ohm's Law & Power" slugs to `ohms-law-and-power` and not the
    // stranded-letter `ohm-s-law-and-power`. Safe to change: only one
    // category in the whole registry contains an apostrophe and its page
    // is new, so no already-indexed URL moves.
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface TopicSummary {
  category: string;
  slug: string;
  qCount: number;
}

/**
 * Fewest questions a topic needs before it gets its own landing page.
 *
 * This threshold existed in `resolveTopicPage` and again in
 * generate-seo-html.mjs, but NOT in `getTopicsForExam` — so a thin category
 * appeared in the "Practice by topic" strip and the sitemap while resolving to
 * nothing and never being prerendered. It never fired because no registered
 * exam had a category under five, until the 18th Edition was added on
 * 2026-08-07 with "Special Locations" holding a single question.
 * `npm run check:topic-registry` caught it.
 */
export const MIN_TOPIC_QUESTIONS = 5;

/** Return the list of topic landings available for a given exam, sorted
 * by question count desc so the most substantial topics come first. */
export function getTopicsForExam(examSlug: string): TopicSummary[] {
  const entry = REGISTRY_BY_SLUG[examSlug];
  if (!entry) return [];
  const counts = new Map<string, number>();
  for (const q of entry.bank) {
    const cat = topicOf(q, entry);
    if (!cat) continue;
    counts.set(cat, (counts.get(cat) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, qCount]) => qCount >= MIN_TOPIC_QUESTIONS)
    .map(([category, qCount]) => ({ category, slug: categoryToSlug(category), qCount }))
    .sort((a, b) => b.qCount - a.qCount);
}

/** Resolve `(examSlug, topicSlug)` to a filtered bank + page meta.
 *
 * Returns null when either the exam or the topic slug doesn't exist —
 * caller should redirect to the parent /mock-exams/<exam> page.
 */
export function resolveTopicPage(
  examSlug: string,
  topicSlug: string
): {
  entry: TopicExamEntry;
  topic: TopicSummary;
  filteredBank: SEOMockExamQuestion[];
} | null {
  const entry = REGISTRY_BY_SLUG[examSlug];
  if (!entry) return null;
  const topics = getTopicsForExam(examSlug);
  const topic = topics.find((t) => t.slug === topicSlug);
  if (!topic) return null;
  const filteredBank = entry.bank.filter((q) => topicOf(q, entry) === topic.category);
  if (filteredBank.length < MIN_TOPIC_QUESTIONS) return null; // too thin to be a useful exam
  return { entry, topic, filteredBank };
}

/** All known (examSlug, topicSlug) pairs — used by the sitemap generator
 * and the "Practice by topic" strip on the parent exam page. */
export function getAllTopicRoutes(): Array<{
  examSlug: string;
  topicSlug: string;
  category: string;
  qCount: number;
}> {
  return REGISTRY.flatMap((entry) =>
    getTopicsForExam(entry.examSlug).map((t) => ({
      examSlug: entry.examSlug,
      topicSlug: t.slug,
      category: t.category,
      qCount: t.qCount,
    }))
  );
}
