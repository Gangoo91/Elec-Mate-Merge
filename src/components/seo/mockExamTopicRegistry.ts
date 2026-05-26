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
 * SCOPE: only includes the 12 exams whose banks carry a `category` field
 * (asbestos, COSHH, CSCS, confined spaces, fire safety, first aid, IPAF,
 * PASMA, manual handling, working at height, AM2, 2391/I&T). Level 2/3
 * banks use `section` numbers — those would need human-readable topic
 * names before they make good landing pages.
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
}

const REGISTRY: TopicExamEntry[] = [
  {
    examSlug: 'am2-online-knowledge-test',
    examShortName: 'AM2 Online Knowledge Test',
    subject: 'AM2 questions',
    signupRef: 'am2',
    questionsPerExam: 15,
    timeLimitMinutes: 25,
    passThreshold: 70,
    bank: am2QuestionBank as unknown as SEOMockExamQuestion[],
  },
  {
    examSlug: '2391-inspection-testing',
    examShortName: 'C&G 2391 Inspection & Testing',
    subject: 'inspection and testing questions',
    signupRef: '2391',
    questionsPerExam: 20,
    timeLimitMinutes: 25,
    passThreshold: 70,
    bank: inspectionTestingQuestionBank as unknown as SEOMockExamQuestion[],
  },
  {
    examSlug: 'asbestos-awareness',
    examShortName: 'Asbestos Awareness',
    subject: 'asbestos awareness questions',
    signupRef: 'asbestos',
    questionsPerExam: 15,
    timeLimitMinutes: 20,
    passThreshold: 70,
    bank: asbestosQuestionBank as unknown as SEOMockExamQuestion[],
  },
  {
    examSlug: 'confined-spaces',
    examShortName: 'Confined Spaces',
    subject: 'confined spaces questions',
    signupRef: 'confined-spaces',
    questionsPerExam: 15,
    timeLimitMinutes: 20,
    passThreshold: 70,
    bank: confinedSpacesQuestionBank as unknown as SEOMockExamQuestion[],
  },
  {
    examSlug: 'coshh',
    examShortName: 'COSHH',
    subject: 'COSHH questions',
    signupRef: 'coshh',
    questionsPerExam: 15,
    timeLimitMinutes: 20,
    passThreshold: 70,
    bank: coshhQuestionBank as unknown as SEOMockExamQuestion[],
  },
  {
    examSlug: 'cscs-card',
    examShortName: 'CSCS Card HS&E Test',
    subject: 'CSCS test questions',
    signupRef: 'cscs',
    questionsPerExam: 15,
    timeLimitMinutes: 20,
    passThreshold: 70,
    bank: cscsCardQuestionBank as unknown as SEOMockExamQuestion[],
  },
  {
    examSlug: 'fire-safety',
    examShortName: 'Fire Safety',
    subject: 'fire safety questions',
    signupRef: 'fire-safety',
    questionsPerExam: 15,
    timeLimitMinutes: 20,
    passThreshold: 70,
    bank: fireSafetyQuestionBank as unknown as SEOMockExamQuestion[],
  },
  {
    examSlug: 'first-aid',
    examShortName: 'First Aid at Work',
    subject: 'first aid questions',
    signupRef: 'first-aid',
    questionsPerExam: 15,
    timeLimitMinutes: 20,
    passThreshold: 70,
    bank: firstAidQuestionBank as unknown as SEOMockExamQuestion[],
  },
  {
    examSlug: 'ipaf',
    examShortName: 'IPAF MEWP Operator',
    subject: 'IPAF questions',
    signupRef: 'ipaf',
    questionsPerExam: 15,
    timeLimitMinutes: 20,
    passThreshold: 70,
    bank: ipafQuestionBank as unknown as SEOMockExamQuestion[],
  },
  {
    examSlug: 'manual-handling',
    examShortName: 'Manual Handling',
    subject: 'manual handling questions',
    signupRef: 'manual-handling',
    questionsPerExam: 15,
    timeLimitMinutes: 20,
    passThreshold: 70,
    bank: manualHandlingQuestionBank as unknown as SEOMockExamQuestion[],
  },
  {
    examSlug: 'pasma',
    examShortName: 'PASMA Towers for Users',
    subject: 'PASMA questions',
    signupRef: 'pasma',
    questionsPerExam: 15,
    timeLimitMinutes: 20,
    passThreshold: 70,
    bank: pasmaQuestionBank as unknown as SEOMockExamQuestion[],
  },
  {
    examSlug: 'working-at-height',
    examShortName: 'Working at Height',
    subject: 'working at height questions',
    signupRef: 'working-at-height',
    questionsPerExam: 15,
    timeLimitMinutes: 20,
    passThreshold: 70,
    bank: workingAtHeightQuestionBank as unknown as SEOMockExamQuestion[],
  },
];

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
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface TopicSummary {
  category: string;
  slug: string;
  qCount: number;
}

/** Return the list of topic landings available for a given exam, sorted
 * by question count desc so the most substantial topics come first. */
export function getTopicsForExam(examSlug: string): TopicSummary[] {
  const entry = REGISTRY_BY_SLUG[examSlug];
  if (!entry) return [];
  const counts = new Map<string, number>();
  for (const q of entry.bank) {
    const cat = q.category;
    if (!cat) continue;
    counts.set(cat, (counts.get(cat) ?? 0) + 1);
  }
  return [...counts.entries()]
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
  const filteredBank = entry.bank.filter((q) => q.category === topic.category);
  if (filteredBank.length < 5) return null; // too thin to be a useful exam
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
