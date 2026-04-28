// Level 3 Mixed Question Bank — C&G 2365-03 Mock Exam (Mock 8)
// 60-question mixed bank drawn from all 7 L3 module banks.
//
// Distribution mirrors C&G 2365-03 unit weighting:
//   Module 1 (Unit 201 — Health & Safety):                8 questions
//   Module 2 (Unit 301 — Environmental Technologies):     8 questions
//   Module 3 (Unit 302 — Electrical Science):            10 questions
//   Module 4 (Unit 303 — Fault Diagnosis):                8 questions
//   Module 5 (Unit 304 — Inspection & Testing):          12 questions
//   Module 6 (Unit 305 — Systems Design):                10 questions
//   Module 7 (Unit 308 — Career Awareness):               4 questions
//                                              Total:   60 questions

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  topic: string;
  module: string;
}

import { module1Questions } from '../module1/questionBank';
import { module2Questions } from '../module2/questionBank';
import { module3Questions } from '../module3/questionBank';
import { module4Questions } from '../module4/questionBank';
import { module5Questions } from '../module5/questionBank';
import { module6Questions } from '../module6/questionBank';
import { module7Questions } from '../module7/questionBank';

// ---------------------------------------------------------------------------
// Deterministic Fisher-Yates shuffle (mulberry32 PRNG when a seed is given,
// Math.random when not). Pure — does not mutate input.
// ---------------------------------------------------------------------------
const mulberry32 = (seed: number): (() => number) => {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const shuffle = <T>(input: readonly T[], seed?: number): T[] => {
  const arr = [...input];
  const rand = seed === undefined ? Math.random : mulberry32(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// ---------------------------------------------------------------------------
// Per-module normalisers — every source question is coerced to the unified
// `Question` interface so downstream consumers can rely on section, topic,
// difficulty and module being present.
// ---------------------------------------------------------------------------
type RawModuleQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  section?: string;
  topic?: string;
  difficulty?: 'basic' | 'intermediate' | 'advanced';
};

const normalise = (
  q: RawModuleQuestion,
  defaults: { section: string; topic: string; module: string },
  fallbackDifficulty: 'basic' | 'intermediate' | 'advanced' = 'intermediate'
): Question => ({
  id: q.id,
  question: q.question,
  options: q.options,
  correctAnswer: q.correctAnswer,
  explanation: q.explanation || 'Answer explanation available in course materials.',
  section: q.section || defaults.section,
  difficulty: q.difficulty || fallbackDifficulty,
  topic: q.topic || defaults.topic,
  module: defaults.module,
});

const normalisedM1: Question[] = (module1Questions as RawModuleQuestion[]).map((q) =>
  normalise(q, { section: '1.0', topic: 'Health and Safety', module: 'Module 1' })
);
const normalisedM2: Question[] = (module2Questions as RawModuleQuestion[]).map((q) =>
  normalise(q, { section: '2.0', topic: 'Environmental Technologies', module: 'Module 2' })
);
const normalisedM3: Question[] = (module3Questions as RawModuleQuestion[]).map((q) =>
  normalise(q, { section: '3.0', topic: 'Electrical Science', module: 'Module 3' })
);
const normalisedM4: Question[] = (module4Questions as RawModuleQuestion[]).map((q) =>
  normalise(q, { section: '4.0', topic: 'Fault Diagnosis', module: 'Module 4' })
);
const normalisedM5: Question[] = (module5Questions as RawModuleQuestion[]).map((q) =>
  normalise(q, { section: '5.0', topic: 'Inspection and Testing', module: 'Module 5' })
);
const normalisedM6: Question[] = (module6Questions as RawModuleQuestion[]).map((q) =>
  normalise(q, { section: '6.0', topic: 'Systems Design', module: 'Module 6' })
);
const normalisedM7: Question[] = (module7Questions as RawModuleQuestion[]).map((q) =>
  normalise(q, { section: '7.0', topic: 'Career Awareness', module: 'Module 7' })
);

// ---------------------------------------------------------------------------
// C&G 2365-03 distribution — 60 questions total.
// ---------------------------------------------------------------------------
export const MIXED_EXAM_DISTRIBUTION = {
  module1: 8, //  Unit 201 — Health & Safety
  module2: 8, //  Unit 301 — Environmental Technologies
  module3: 10, // Unit 302 — Electrical Science
  module4: 8, //  Unit 303 — Fault Diagnosis
  module5: 12, // Unit 304 — Inspection & Testing
  module6: 10, // Unit 305 — Systems Design
  module7: 4, //  Unit 308 — Career Awareness
} as const;

export const TOTAL_MIXED_QUESTIONS = Object.values(MIXED_EXAM_DISTRIBUTION).reduce(
  (a, b) => a + b,
  0
);

// ---------------------------------------------------------------------------
// Build the mixed bank: shuffle each module bank, slice the spec'd count.
// Optional seed gives deterministic test runs while production calls remain
// random (different question order each attempt).
// ---------------------------------------------------------------------------
const buildMixedBank = (seed?: number): Question[] => {
  const slice = (bank: Question[], count: number, offset: number) =>
    shuffle(bank, seed === undefined ? undefined : seed + offset).slice(0, count);

  const picks: Question[] = [
    ...slice(normalisedM1, MIXED_EXAM_DISTRIBUTION.module1, 1),
    ...slice(normalisedM2, MIXED_EXAM_DISTRIBUTION.module2, 2),
    ...slice(normalisedM3, MIXED_EXAM_DISTRIBUTION.module3, 3),
    ...slice(normalisedM4, MIXED_EXAM_DISTRIBUTION.module4, 4),
    ...slice(normalisedM5, MIXED_EXAM_DISTRIBUTION.module5, 5),
    ...slice(normalisedM6, MIXED_EXAM_DISTRIBUTION.module6, 6),
    ...slice(normalisedM7, MIXED_EXAM_DISTRIBUTION.module7, 7),
  ];

  // Reshuffle the combined picks so questions aren't grouped by module.
  return shuffle(picks, seed === undefined ? undefined : seed + 99).map((q, index) => ({
    ...q,
    id: index + 1,
  }));
};

// Default export: a fresh 60-question mixed bank (random each module load).
// Note this is computed once on import. Use getRandomQuestions() to draw a
// fresh random selection on each exam attempt.
export const mixedQuestionBank: Question[] = buildMixedBank();

// Backwards-compatible alias used by older callers.
export const mixedQuestions: Question[] = mixedQuestionBank;

// ---------------------------------------------------------------------------
// Public API — kept compatible with existing callers.
//
// `count` and `weights` parameters are accepted for backwards compatibility
// with the previous mixed bank, but the C&G distribution above is the source
// of truth: when count === 60 (the standard mock) the per-module counts are
// honoured exactly. For other counts the modules are scaled proportionally.
// ---------------------------------------------------------------------------
export const getRandomQuestions = (
  count: number = TOTAL_MIXED_QUESTIONS,
  _weights?: { basic: number; intermediate: number; advanced: number },
  seed?: number
): Question[] => {
  if (count === TOTAL_MIXED_QUESTIONS) {
    return buildMixedBank(seed);
  }

  // Proportional fallback for non-standard counts — preserves the unit
  // weighting but scales totals.
  const ratio = count / TOTAL_MIXED_QUESTIONS;
  const m1Count = Math.max(1, Math.round(MIXED_EXAM_DISTRIBUTION.module1 * ratio));
  const m2Count = Math.max(1, Math.round(MIXED_EXAM_DISTRIBUTION.module2 * ratio));
  const m3Count = Math.max(1, Math.round(MIXED_EXAM_DISTRIBUTION.module3 * ratio));
  const m4Count = Math.max(1, Math.round(MIXED_EXAM_DISTRIBUTION.module4 * ratio));
  const m5Count = Math.max(1, Math.round(MIXED_EXAM_DISTRIBUTION.module5 * ratio));
  const m6Count = Math.max(1, Math.round(MIXED_EXAM_DISTRIBUTION.module6 * ratio));
  let m7Count = count - m1Count - m2Count - m3Count - m4Count - m5Count - m6Count;
  if (m7Count < 0) m7Count = 0;

  const slice = (bank: Question[], n: number, offset: number) =>
    shuffle(bank, seed === undefined ? undefined : seed + offset).slice(0, n);

  const picks: Question[] = [
    ...slice(normalisedM1, m1Count, 1),
    ...slice(normalisedM2, m2Count, 2),
    ...slice(normalisedM3, m3Count, 3),
    ...slice(normalisedM4, m4Count, 4),
    ...slice(normalisedM5, m5Count, 5),
    ...slice(normalisedM6, m6Count, 6),
    ...slice(normalisedM7, m7Count, 7),
  ];

  return shuffle(picks, seed === undefined ? undefined : seed + 99).map((q, index) => ({
    ...q,
    id: index + 1,
  }));
};

// ---------------------------------------------------------------------------
// Backwards-compatible helpers — preserved for the existing Mock 8 page and
// any other callers that import the older API surface.
// ---------------------------------------------------------------------------

// Equal-from-each-module helper kept for older callers (Mock 8 originally
// used this name). Internally now defers to getRandomQuestions which honours
// the C&G unit weighting.
export const getBalancedRandomQuestions = (
  count: number = TOTAL_MIXED_QUESTIONS,
  seed?: number
): Question[] => getRandomQuestions(count, undefined, seed);

export const getQuestionsByModule = (moduleName: string): Question[] => {
  return mixedQuestionBank.filter((q) => q.module === moduleName);
};

export const getQuestionsByDifficulty = (
  difficulty: 'basic' | 'intermediate' | 'advanced'
): Question[] => mixedQuestionBank.filter((q) => q.difficulty === difficulty);

// ---------------------------------------------------------------------------
// Category labels for results display (shorter names for UI)
// ---------------------------------------------------------------------------
export const CATEGORY_LABELS: Record<string, string> = {
  'Module 1': 'Health & Safety',
  'Module 2': 'Environmental Tech',
  'Module 3': 'Electrical Science',
  'Module 4': 'Fault Diagnosis',
  'Module 5': 'Inspection & Testing',
  'Module 6': 'Systems Design',
  'Module 7': 'Career Awareness',
};

export const getCategoryBreakdown = (
  examQuestions: Question[],
  selectedAnswers: number[] | { [key: number]: number }
): { category: string; label: string; total: number; correct: number; percent: number }[] => {
  const breakdown: Record<string, { total: number; correct: number }> = {};

  const lookup = (idx: number): number | undefined =>
    Array.isArray(selectedAnswers) ? selectedAnswers[idx] : selectedAnswers[idx];

  examQuestions.forEach((q, index) => {
    const category = q.module || 'General';
    if (!breakdown[category]) {
      breakdown[category] = { total: 0, correct: 0 };
    }
    breakdown[category].total++;
    if (lookup(index) === q.correctAnswer) {
      breakdown[category].correct++;
    }
  });

  return Object.entries(breakdown)
    .sort((a, b) => b[1].total - a[1].total)
    .map(([category, stats]) => ({
      category,
      label: CATEGORY_LABELS[category] || category,
      ...stats,
      percent: stats.total === 0 ? 0 : Math.round((stats.correct / stats.total) * 100),
    }));
};

// ---------------------------------------------------------------------------
// Dev-only validation helper. Safe to call in production but designed to be
// gated behind `import.meta.env.DEV` by callers — produces console output.
// ---------------------------------------------------------------------------
export const validateQuestionBank = (): {
  isValid: boolean;
  total: number;
  byModule: Record<string, number>;
  byDifficulty: Record<string, number>;
} => {
  const bank = mixedQuestionBank;
  const moduleDistribution = bank.reduce(
    (acc, q) => {
      acc[q.module] = (acc[q.module] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const difficultyDistribution = bank.reduce(
    (acc, q) => {
      acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const isValid =
    bank.length === TOTAL_MIXED_QUESTIONS &&
    moduleDistribution['Module 1'] === MIXED_EXAM_DISTRIBUTION.module1 &&
    moduleDistribution['Module 2'] === MIXED_EXAM_DISTRIBUTION.module2 &&
    moduleDistribution['Module 3'] === MIXED_EXAM_DISTRIBUTION.module3 &&
    moduleDistribution['Module 4'] === MIXED_EXAM_DISTRIBUTION.module4 &&
    moduleDistribution['Module 5'] === MIXED_EXAM_DISTRIBUTION.module5 &&
    moduleDistribution['Module 6'] === MIXED_EXAM_DISTRIBUTION.module6 &&
    moduleDistribution['Module 7'] === MIXED_EXAM_DISTRIBUTION.module7;

  // eslint-disable-next-line no-console
  console.log('[L3 Mixed Question Bank] Total:', bank.length);
  // eslint-disable-next-line no-console
  console.log('[L3 Mixed Question Bank] By module:', moduleDistribution);
  // eslint-disable-next-line no-console
  console.log('[L3 Mixed Question Bank] By difficulty:', difficultyDistribution);

  return {
    isValid,
    total: bank.length,
    byModule: moduleDistribution,
    byDifficulty: difficultyDistribution,
  };
};

export const getQuestionBankStats = () => ({
  total: mixedQuestionBank.length,
  byModule: {
    'Module 1: Health & Safety': module1Questions.length,
    'Module 2: Environmental Technologies': module2Questions.length,
    'Module 3: Electrical Science': module3Questions.length,
    'Module 4: Fault Diagnosis': module4Questions.length,
    'Module 5: Inspection & Testing': module5Questions.length,
    'Module 6: Systems Design': module6Questions.length,
    'Module 7: Career Awareness': module7Questions.length,
  },
  byDifficulty: {
    basic: mixedQuestionBank.filter((q) => q.difficulty === 'basic').length,
    intermediate: mixedQuestionBank.filter((q) => q.difficulty === 'intermediate').length,
    advanced: mixedQuestionBank.filter((q) => q.difficulty === 'advanced').length,
  },
});

export default mixedQuestionBank;
