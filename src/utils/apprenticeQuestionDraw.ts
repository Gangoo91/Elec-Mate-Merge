/**
 * apprenticeQuestionDraw — difficulty-weighted paper selection for the
 * apprentice course mock exams (C&G 2365-02 / 2365-03).
 *
 * WHY THIS EXISTS
 * ---------------
 * Every question in these banks carries a `difficulty` tag, and the exam pages
 * are written as though the draw honours it. Measured 2026-08-24: it did not.
 * All seven Level 3 module banks, plus both mixed banks, AM2, HNC, MOET and
 * Level 2 module 5, drew papers like this:
 *
 *     const shuffled = [...questions].sort(() => Math.random() - 0.5);
 *     return shuffled.slice(0, count);
 *
 * Two separate defects in two lines.
 *
 * 1. NO DIFFICULTY CONTROL. The tags were decorative. A Level 3 paper's
 *    difficulty was whatever the draw happened to land on, so the same paper
 *    could be trivial one sitting and brutal the next, and re-tagging questions
 *    from real telemetry would have changed nothing at all.
 *
 * 2. THE SHUFFLE IS BIASED. `sort(() => Math.random() - 0.5)` is not a uniform
 *    permutation — the comparator is inconsistent, so the result depends on the
 *    sort implementation and some positions are systematically favoured. It is
 *    a well-known broken idiom. Taking the first 60 of 249 that way means some
 *    questions are quietly more likely to be examined than others.
 *
 * Level 2 modules 1-4 already had a correct weighted draw. This module is that
 * logic, generic and shared, so every paper behaves the same way.
 */

export interface DifficultyWeights {
  /** Percentages. Need not sum to 100 — they are normalised. */
  basic: number;
  intermediate: number;
  advanced: number;
}

/** Level 3 sits a level above Level 2, so the default leans harder. */
export const LEVEL3_WEIGHTS: DifficultyWeights = { basic: 30, intermediate: 45, advanced: 25 };

/** Level 2 default, matching the weighting already used by modules 1-4. */
export const LEVEL2_WEIGHTS: DifficultyWeights = { basic: 40, intermediate: 45, advanced: 15 };

type Difficulty = 'basic' | 'intermediate' | 'advanced';

interface Drawable {
  id: number;
  difficulty?: Difficulty | string;
}

/** Fisher-Yates. Every permutation equally likely, unlike the sort() idiom. */
export function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Draws `count` questions, honouring the difficulty split.
 *
 * Backfills from the rest of the bank if a difficulty band holds fewer
 * questions than its weight demands. Without that, a paper asking for more
 * advanced questions than the bank contains comes back SHORT — no error, no
 * warning, just a paper with missing questions, which is exactly the sort of
 * failure nobody notices until a candidate reports it.
 */
export function drawWeighted<T extends Drawable>(
  pool: readonly T[],
  count: number,
  weights: DifficultyWeights = LEVEL3_WEIGHTS
): T[] {
  if (count <= 0 || pool.length === 0) return [];
  if (count >= pool.length) return shuffle(pool);

  const total = weights.basic + weights.intermediate + weights.advanced;
  if (total <= 0) return shuffle(pool).slice(0, count);

  const basicCount = Math.round((weights.basic / total) * count);
  const intermediateCount = Math.round((weights.intermediate / total) * count);
  // Advanced takes the remainder so rounding can never overshoot `count`.
  const advancedCount = Math.max(0, count - basicCount - intermediateCount);

  const byDifficulty = (d: Difficulty) => shuffle(pool.filter((q) => q.difficulty === d));

  const selected: T[] = [
    ...byDifficulty('basic').slice(0, basicCount),
    ...byDifficulty('intermediate').slice(0, intermediateCount),
    ...byDifficulty('advanced').slice(0, advancedCount),
  ];

  if (selected.length < count) {
    const chosen = new Set(selected.map((q) => q.id));
    selected.push(...shuffle(pool.filter((q) => !chosen.has(q.id))).slice(0, count - selected.length));
  }

  // Shuffle again so the paper does not run basic-then-intermediate-then-advanced.
  return shuffle(selected).slice(0, count);
}
