/**
 * Per-question option shuffling — kills the "always B" position tell.
 *
 * Banks were AI-generated with the correct answer pinned to index 1 (≈74%
 * across 21k questions audited). Renderers run questions through these
 * helpers so option order is randomised per question, while keeping
 * `correctAnswer` consistent with what the user actually sees.
 *
 * Why seeded:
 *  - Re-renders during an attempt must not re-shuffle (would shift the
 *    correct answer mid-question).
 *  - Retakes should feel fresh — different salt per attempt → different
 *    order.
 *
 * Usage at the renderer:
 *   const [salt] = useState(createShuffleSalt);
 *   const shuffled = useMemo(() => shuffleAllQuestionOptions(qs, salt), [qs, salt]);
 *
 * For exam start-style flows (StandardMockExam, SEOMockExam) shuffle the
 * selected array once inside the start handler and store it in state.
 */

export interface ShuffleableQuestion {
  id?: number | string;
  question: string;
  options: string[];
  correctAnswer: number | string;
  [key: string]: unknown;
}

function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Fresh random salt for a quiz/exam attempt. Call once at the start of an
 * attempt and reuse for every question in that attempt.
 */
export function createShuffleSalt(): number {
  return (Math.random() * 0xffffffff) >>> 0;
}

/**
 * Returns a copy of `question` with options reordered and `correctAnswer`
 * remapped to a numeric index pointing at the same option text.
 *
 * Deterministic per (question.id ⊕ salt) — pass the same salt across an
 * attempt for stable in-attempt ordering, change salt on retake.
 *
 * Also normalises string-form correctAnswer ("Earth fault") to a numeric
 * index so renderers don't have to handle both shapes.
 */
export function shuffleQuestionOptions<T extends ShuffleableQuestion>(
  question: T,
  salt: number = 0
): T {
  const opts = question.options;
  if (!Array.isArray(opts) || opts.length < 2) return question;

  let correctIdx: number;
  if (typeof question.correctAnswer === 'number') {
    correctIdx = question.correctAnswer;
  } else {
    const found = opts.findIndex((o) => o === question.correctAnswer);
    correctIdx = found >= 0 ? found : 0;
  }
  if (correctIdx < 0 || correctIdx >= opts.length) correctIdx = 0;

  const seedBase =
    typeof question.id === 'number'
      ? (question.id as number) >>> 0
      : hashString(String(question.id ?? question.question));

  const rng = mulberry32((seedBase ^ salt) >>> 0);

  const order = opts.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  return {
    ...question,
    options: order.map((i) => opts[i]),
    correctAnswer: order.indexOf(correctIdx),
  };
}

/**
 * Shuffle every question in an array with the same salt.
 */
export function shuffleAllQuestionOptions<T extends ShuffleableQuestion>(
  questions: T[],
  salt: number = 0
): T[] {
  return questions.map((q) => shuffleQuestionOptions(q, salt));
}
