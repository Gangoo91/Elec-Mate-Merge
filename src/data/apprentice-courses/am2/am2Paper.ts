/**
 * Builds one AM2 Section E practice paper (ELE-1808).
 *
 * The old draw took the same number of questions from every category, so the
 * 119 Inspection & Testing questions got four slots while Fault Finding's 20 —
 * only seven of them above basic — came round again and again. It also had no
 * memory: a learner's second sitting was drawn as if the first never happened.
 *
 * This one:
 *  - weights the paper towards what Section E examines (BS 7671, testing,
 *    cable and device selection) — see PLAN;
 *  - fills part of each technical category with GENERATED questions whose
 *    numbers change every sitting (generatedQuestions.ts);
 *  - prefers questions this learner has not seen in their recent sittings;
 *  - brings back a few they got wrong, so the paper teaches as well as tests.
 *
 * Generated questions come back with options in bank order (key first) and
 * every caller must shuffle — the AM2 pages all do.
 */
import { am2QuestionBank, type AM2Question } from './questionBank';
import {
  am2GeneratedFamilies,
  generateFamilyQuestion,
  type AM2Category,
  type AM2Family,
  type Rng,
} from './generatedQuestions';

/** Per 30 questions: total slots per category, and how many are generated. */
export const AM2_PAPER_PLAN: { category: AM2Category; total: number; generated: number }[] = [
  { category: 'Health & Safety', total: 4, generated: 0 },
  { category: 'Safe Isolation', total: 3, generated: 1 },
  { category: 'BS 7671 Fundamentals', total: 3, generated: 0 },
  { category: 'BS 7671 Selection & Erection', total: 5, generated: 2 },
  { category: 'BS 7671 Inspection & Testing', total: 8, generated: 4 },
  { category: 'Building Regulations', total: 3, generated: 0 },
  { category: 'Fault Finding', total: 4, generated: 2 },
];

/** Most wrong answers brought back into one paper. */
const MAX_RETURNS = 3;

export interface AM2PaperOptions {
  count?: number;
  weights?: { basic: number; intermediate: number; advanced: number };
  /** Question ids served in the learner's recent sittings. */
  recentIds?: Iterable<number>;
  /** Ids they got wrong and have not since got right. */
  missedIds?: Iterable<number>;
  rng?: Rng;
  /** Leave generated questions out (a caller that cannot shuffle options). */
  fixedOnly?: boolean;
}

const shuffle = <T>(items: T[], rng: Rng): T[] => {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Plan scaled to `count`, summing exactly to it. */
export function scaledPlan(count: number) {
  const plan = AM2_PAPER_PLAN.map((p) => ({
    ...p,
    total: Math.round((p.total * count) / 30),
    generated: Math.round((p.generated * count) / 30),
  }));
  let diff = count - plan.reduce((s, p) => s + p.total, 0);
  // Absorb rounding in the biggest category first.
  const order = [...plan].sort((a, b) => b.total - a.total);
  for (let i = 0; diff !== 0; i = (i + 1) % order.length) {
    const p = order[i];
    if (diff > 0) {
      p.total++;
      diff--;
    } else if (p.total > 0) {
      p.total--;
      diff++;
    }
  }
  for (const p of plan) p.generated = Math.min(p.generated, p.total);
  return plan;
}

/** `need` questions from `pool`, spread over difficulty by `weights`. */
function pickByDifficulty(
  pool: AM2Question[],
  need: number,
  weights: NonNullable<AM2PaperOptions['weights']>,
  rng: Rng
): AM2Question[] {
  const out: AM2Question[] = [];
  const left = shuffle(pool, rng);
  for (const d of ['advanced', 'intermediate', 'basic'] as const) {
    const want = Math.round(need * weights[d]);
    for (let i = 0; i < left.length && out.length < need && want > 0; ) {
      if (left[i].difficulty === d && out.filter((q) => q.difficulty === d).length < want) {
        out.push(left.splice(i, 1)[0]);
      } else i++;
    }
  }
  while (out.length < need && left.length) out.push(left.shift()!);
  return out;
}

export function buildAM2Paper(opts: AM2PaperOptions = {}): AM2Question[] {
  const {
    count = 30,
    weights = { basic: 0.35, intermediate: 0.45, advanced: 0.2 },
    rng = Math.random,
    fixedOnly = false,
  } = opts;
  const recent = new Set(opts.recentIds ?? []);
  const missed = new Set(opts.missedIds ?? []);
  let returnsLeft = MAX_RETURNS;
  const paper: AM2Question[] = [];

  for (const slot of scaledPlan(count)) {
    // Families first, so a category short of families gives its slots back to
    // the fixed bank instead of coming up short.
    const families: AM2Family[] = fixedOnly
      ? []
      : am2GeneratedFamilies.filter((f) => f.verified && f.category === slot.category);
    const rank = (f: AM2Family) => (missed.has(f.id) ? 0 : recent.has(f.id) ? 2 : 1);
    const chosenFamilies = shuffle(families, rng)
      .sort((a, b) => rank(a) - rank(b))
      .slice(0, slot.generated);
    for (const f of chosenFamilies) {
      if (missed.has(f.id) && returnsLeft > 0) returnsLeft--;
      paper.push(generateFamilyQuestion(f, rng));
    }

    const fixedNeed = slot.total - chosenFamilies.length;
    const pool = am2QuestionBank.filter((q) => q.category === slot.category);
    const back = shuffle(
      pool.filter((q) => missed.has(q.id)),
      rng
    ).slice(0, Math.min(fixedNeed, returnsLeft, 1));
    returnsLeft -= back.length;
    const taken = new Set(back.map((q) => q.id));
    const unseen = pool.filter((q) => !taken.has(q.id) && !recent.has(q.id));
    const seen = pool.filter((q) => !taken.has(q.id) && recent.has(q.id));
    const fresh = pickByDifficulty(unseen, fixedNeed - back.length, weights, rng);
    const topUp = shuffle(seen, rng).slice(0, fixedNeed - back.length - fresh.length);
    paper.push(...back, ...fresh, ...topUp);
  }
  return shuffle(paper, rng);
}

/** How many families can appear on a paper, for the start screen. */
export const verifiedFamilyCount = am2GeneratedFamilies.filter((f) => f.verified).length;
