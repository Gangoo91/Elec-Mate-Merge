// Level 2 Mixed Question Bank — C&G 2365-02 Mock Exam (Mock 8)
// 60-question mixed bank drawn ONLY from L2 syllabus units (201, 202, 203, 204, 210).
// Off-syllabus L3 banks (Module 6 Inspect/Test, Module 7 Fault-finding) are NOT used.
//
// Distribution mirrors C&G 2365-02 unit weighting:
//   Module 1 (Unit 201 — Health & Safety):            12 questions
//   Module 2 (Unit 202 — Electrical Science):          14 questions
//   Module 3 (Unit 203 — Installation Tech):           16 questions
//   Module 4 (Unit 204 — Wiring Systems Install):      12 questions
//   Module 5 (Unit 210 — Communicate with Others):      6 questions
//                                              Total: 60 questions

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
import { module2QuestionBank } from '../module2/questionBank';
import { module3QuestionBank } from '../module3/questionBank';
import { module4QuestionBank } from '../module4/questionBank';
import { module5QuestionBank } from '../module5/questionBank';

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

const normalisedM1: Question[] = module1Questions.map((q, idx) =>
  normalise(
    q,
    { section: '1.0', topic: 'Health and Safety', module: 'Module 1' },
    idx < module1Questions.length / 3
      ? 'basic'
      : idx < (2 * module1Questions.length) / 3
        ? 'intermediate'
        : 'advanced'
  )
);
const normalisedM2: Question[] = module2QuestionBank.map((q) =>
  normalise(q, { section: '2.0', topic: 'Electrical Science', module: 'Module 2' })
);
const normalisedM3: Question[] = module3QuestionBank.map((q) =>
  normalise(q, { section: '3.0', topic: 'Installation Technology', module: 'Module 3' })
);
const normalisedM4: Question[] = module4QuestionBank.map((q) =>
  normalise(q, { section: '4.0', topic: 'Wiring Systems Installation', module: 'Module 4' })
);
const normalisedM5: Question[] = module5QuestionBank.map((q) =>
  normalise(q, { section: '5.0', topic: 'Communicate with Others', module: 'Module 5' })
);

// ---------------------------------------------------------------------------
// C&G 2365-02 distribution — 60 questions total.
// ---------------------------------------------------------------------------
export const MIXED_EXAM_DISTRIBUTION = {
  module1: 12, // Unit 201 — Health & Safety
  module2: 14, // Unit 202 — Electrical Science
  module3: 16, // Unit 203 — Installation Tech
  module4: 12, // Unit 204 — Wiring Systems Install
  module5: 6, //  Unit 210 — Communicate with Others
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
  let m5Count = count - m1Count - m2Count - m3Count - m4Count;
  if (m5Count < 0) m5Count = 0;

  const slice = (bank: Question[], n: number, offset: number) =>
    shuffle(bank, seed === undefined ? undefined : seed + offset).slice(0, n);

  const picks: Question[] = [
    ...slice(normalisedM1, m1Count, 1),
    ...slice(normalisedM2, m2Count, 2),
    ...slice(normalisedM3, m3Count, 3),
    ...slice(normalisedM4, m4Count, 4),
    ...slice(normalisedM5, m5Count, 5),
  ];

  return shuffle(picks, seed === undefined ? undefined : seed + 99).map((q, index) => ({
    ...q,
    id: index + 1,
  }));
};

// Dev-only validation helper. Safe to call in production but designed to be
// gated behind `import.meta.env.DEV` by callers — produces console output.
export const validateQuestionBank = (): void => {
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

  // eslint-disable-next-line no-console
  console.log('[Mixed Question Bank] Total:', bank.length);
  // eslint-disable-next-line no-console
  console.log('[Mixed Question Bank] By module:', moduleDistribution);
  // eslint-disable-next-line no-console
  console.log('[Mixed Question Bank] By difficulty:', difficultyDistribution);
};

export default mixedQuestionBank;
