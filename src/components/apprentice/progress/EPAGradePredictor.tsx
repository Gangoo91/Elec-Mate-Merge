/**
 * EPAGradePredictor
 *
 * Apprentice-facing projected EPA grade band, from quiz average blended
 * with flashcard mastery and nudged by recent trajectory.
 *
 * The bands map to the published EPA grade descriptors used by the major
 * UK EPAOs (NET / C&G / EAL):
 *   • Distinction  — ≥ 80% blended
 *   • Merit        — 65–79
 *   • Pass         — 50–64
 *   • Below pass   — < 50
 *
 * 🔴 TWO THINGS THIS USED TO GET WRONG, both of which mattered.
 *
 * 1. IT PREDICTED FROM ALMOST NOTHING. The gate was `quizAverage > 0`, so
 *    a learner three quizzes into their first week got "Below pass" —
 *    rendered at 52px, in red, as the first thing on the page. Three
 *    attempts is noise, not a trajectory, and an apprentice cannot tell a
 *    confident projection from a thin one. Evidence is now tiered: nothing
 *    is projected below MIN_FOR_INDICATION, and the band is not called a
 *    prediction until MIN_FOR_PREDICTION. Below the bar we say what would
 *    lift it, which is the only useful thing we can say.
 *
 * 2. IT PENALISED UNUSED FEATURES. The blend was a flat
 *    `quiz × 0.65 + mastery × 0.35`, applied whether or not the learner had
 *    ever opened a flashcard set. Someone averaging 80% on quizzes with no
 *    flashcard activity scored 52 — "Pass" — when their actual evidence
 *    says Distinction. The weights are now renormalised over the components
 *    that have data, so never touching flashcards costs you nothing.
 *
 * Red is gone from this card. A band below Pass is where every apprentice
 * starts; it is a starting point, not an error, and colouring it like a
 * fault reads as "you have failed" to someone who has not yet sat anything.
 */

import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { Eyebrow } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

interface EPAGradePredictorProps {
  /** Avg quiz score 0-100 from useQuizResults.getOverallStats. */
  quizAverage: number;
  /** Number of quiz attempts behind that average — drives confidence. */
  quizCount: number;
  /** % of flashcards mastered across all sets. */
  flashcardMasteryPct: number;
  /** Most recent quiz score (0-100) — used for trajectory adjustment. */
  recentQuizScore?: number | null;
  /** Trend direction. */
  trend?: 'improving' | 'declining' | 'stable' | 'no-data';
  /** Worst-performing category (label) for the actionable nudge. */
  weakestTopic?: string | null;
}

type Band = 'distinction' | 'merit' | 'pass' | 'fail';

const BAND_LABEL: Record<Band, string> = {
  distinction: 'Distinction',
  merit: 'Merit',
  pass: 'Pass',
  fail: 'Below pass',
};

/**
 * Evidence thresholds.
 *
 * Not published by any EPAO — nobody states "you need N quizzes before a
 * mock projection means anything". These are ours, chosen so the number of
 * attempts is enough for one bad morning not to move the band, and stated
 * to the learner rather than hidden.
 */
const MIN_FOR_INDICATION = 3;
const MIN_FOR_PREDICTION = 8;

function deriveBand(blended: number): Band {
  if (blended >= 80) return 'distinction';
  if (blended >= 65) return 'merit';
  if (blended >= 50) return 'pass';
  return 'fail';
}

/**
 * Blend only over components the learner has actually used.
 *
 * Weights are renormalised across the present components, so a quiz-only
 * learner is scored on quizzes alone rather than being averaged against a
 * zero they never earned.
 */
function blendAvailable(quizAverage: number, quizCount: number, masteryPct: number): number {
  const parts: Array<{ value: number; weight: number }> = [];
  if (quizCount > 0) parts.push({ value: quizAverage, weight: 0.65 });
  if (masteryPct > 0) parts.push({ value: masteryPct, weight: 0.35 });
  if (!parts.length) return 0;
  const totalWeight = parts.reduce((s, p) => s + p.weight, 0);
  return parts.reduce((s, p) => s + p.value * p.weight, 0) / totalWeight;
}

/** Soft-probability distribution across bands so the strip animates
 *  meaningfully rather than just snapping between buckets. */
function bandProbabilities(blended: number): Record<Band, number> {
  // Triangular distribution centred on the blended score, σ ≈ 12 points
  const centres: Record<Band, number> = {
    distinction: 90,
    merit: 72,
    pass: 57,
    fail: 35,
  };
  const sigma = 12;
  const raw: Record<Band, number> = {
    distinction: Math.exp(-Math.pow((blended - centres.distinction) / sigma, 2)),
    merit: Math.exp(-Math.pow((blended - centres.merit) / sigma, 2)),
    pass: Math.exp(-Math.pow((blended - centres.pass) / sigma, 2)),
    fail: Math.exp(-Math.pow((blended - centres.fail) / sigma, 2)),
  };
  const total = raw.distinction + raw.merit + raw.pass + raw.fail || 1;
  return {
    distinction: Math.round((raw.distinction / total) * 100),
    merit: Math.round((raw.merit / total) * 100),
    pass: Math.round((raw.pass / total) * 100),
    fail: Math.round((raw.fail / total) * 100),
  };
}

export function EPAGradePredictor({
  quizAverage,
  quizCount,
  flashcardMasteryPct,
  recentQuizScore,
  trend,
  weakestTopic,
}: EPAGradePredictorProps) {
  const hasMastery = flashcardMasteryPct > 0;

  /* Confidence: how much of a claim are we entitled to make? */
  const confidence: 'none' | 'indicative' | 'predicted' =
    quizCount >= MIN_FOR_PREDICTION
      ? 'predicted'
      : quizCount >= MIN_FOR_INDICATION || (quizCount > 0 && hasMastery)
        ? 'indicative'
        : 'none';

  const baseline = blendAvailable(quizAverage, quizCount, flashcardMasteryPct);

  // Trajectory adjustment: ± 4 points on a clear drift, and only once there
  // is a real average to drift away from.
  let blended = baseline;
  if (typeof recentQuizScore === 'number' && quizCount >= MIN_FOR_INDICATION) {
    const drift = recentQuizScore - quizAverage;
    if (Math.abs(drift) > 5) blended += Math.sign(drift) * 4;
  }
  blended = Math.max(0, Math.min(100, Math.round(blended)));

  const band = deriveBand(blended);
  const probs = bandProbabilities(blended);

  /*
   * When one band takes essentially all the probability the strip is a
   * single full-width bar — which reads as a completed progress bar, and
   * a solid volt bar sitting beside "Below pass · 100%" looks like an
   * achievement. It also tells the learner nothing they cannot read from
   * the headline. Drop it and let the headline take the full width.
   */
  const degenerate = Math.max(...Object.values(probs)) >= 90;

  /* ─── Not enough evidence: say what would earn a projection ─────────── */
  if (confidence === 'none') {
    const remaining = Math.max(0, MIN_FOR_INDICATION - quizCount);
    return (
      <section className={cn('rounded-2xl border border-elec-yellow/35 p-5 sm:p-6', CARD_SURFACE)}>
        <div className="space-y-2.5 max-w-2xl">
          <Eyebrow>Predicted EPA grade</Eyebrow>
          <p className="text-[26px] sm:text-[32px] font-semibold tracking-tight leading-none text-white">
            Not enough to project yet
          </p>
          <p className="text-[13px] text-white leading-relaxed">
            {quizCount === 0
              ? 'Sit a quiz and we will start tracking a grade band. Flashcard mastery feeds in too, but quizzes carry most of the weight.'
              : `${remaining} more ${remaining === 1 ? 'quiz' : 'quizzes'} and we can show an early indication. Projecting off ${quizCount} would tell you more about one morning than about your trajectory.`}
          </p>
          <EvidenceMeter count={quizCount} target={MIN_FOR_INDICATION} />
        </div>
      </section>
    );
  }

  const isIndicative = confidence === 'indicative';

  const nextBandTarget = band === 'fail' ? 50 : band === 'pass' ? 65 : band === 'merit' ? 80 : null;
  const nextBandLabel =
    band === 'fail' ? 'Pass' : band === 'pass' ? 'Merit' : band === 'merit' ? 'Distinction' : null;

  const trendCopy =
    !isIndicative && trend === 'improving'
      ? 'Trend improving — keep the pace.'
      : !isIndicative && trend === 'declining'
        ? 'Recent scores have dipped — focus matters now.'
        : !isIndicative && trend === 'stable'
          ? 'Consistent — push for a step change next.'
          : '';

  const actionCopy =
    nextBandTarget && weakestTopic
      ? `Lift ${weakestTopic}, your weakest area, to push the blended score above ${nextBandTarget}% — that shifts ${nextBandLabel} sharply.`
      : nextBandTarget
        ? `Lift the blended score above ${nextBandTarget}% to land ${nextBandLabel}.`
        : "You're on track for the top band — keep cementing depth across topics.";

  return (
    <section className={cn('rounded-2xl border border-elec-yellow/35 p-5 sm:p-6', CARD_SURFACE)}>
      <div className={cn('grid gap-5 lg:gap-10 lg:items-center', !degenerate && 'lg:grid-cols-2')}>
        {/* Left — grade headline + actionable nudge */}
        <div className={cn('space-y-3', degenerate && 'max-w-3xl')}>
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div className="space-y-1">
              <Eyebrow>{isIndicative ? 'Early indication' : 'Predicted EPA grade'}</Eyebrow>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span
                  className={cn(
                    'font-semibold tracking-tight leading-none',
                    isIndicative ? 'text-[30px] sm:text-[38px]' : 'text-[40px] sm:text-[52px]',
                    // Volt is earned by the top band. Everything else is
                    // white — a band is a position, not a fault.
                    band === 'distinction' ? 'text-elec-yellow' : 'text-white'
                  )}
                >
                  {BAND_LABEL[band]}
                </span>
                <span className="text-[14px] text-white font-mono">{blended}/100 blended</span>
              </div>
            </div>
            {trendCopy && (
              <span className="text-[11px] uppercase tracking-[0.18em] text-white max-w-[180px] text-right">
                {trendCopy}
              </span>
            )}
          </div>

          <p className="text-[13px] text-white leading-relaxed">{actionCopy}</p>

          {isIndicative && (
            <div className="space-y-1.5 pt-0.5">
              <p className="text-[12px] text-white leading-relaxed">
                Based on {quizCount} {quizCount === 1 ? 'quiz' : 'quizzes'}
                {hasMastery ? ' and your flashcard mastery' : ''} — treat it as a direction of
                travel, not a forecast. {MIN_FOR_PREDICTION} quizzes firms it up.
              </p>
              <EvidenceMeter count={quizCount} target={MIN_FOR_PREDICTION} />
            </div>
          )}
        </div>

        {/* Right — probability strip across the bands.
            One solid volt segment marks where you are likely to land; the
            rest are quiet white. Four tinted segments read as a chart to be
            decoded, and translucent volt over near-black goes muddy. */}
        {!degenerate && (
          <div className={cn('space-y-2', isIndicative && 'opacity-90')}>
            <div className="flex h-2.5 w-full rounded-full overflow-hidden bg-white/[0.04]">
              {(['distinction', 'merit', 'pass', 'fail'] as Band[]).map((b) => {
                const pct = probs[b];
                if (pct < 1) return null;
                return (
                  <div
                    key={b}
                    className={cn(
                      'h-full transition-all duration-700',
                      b === band ? 'bg-elec-yellow' : 'bg-white/20'
                    )}
                    style={{ width: `${pct}%` }}
                    title={`${BAND_LABEL[b]} · ${pct}%`}
                  />
                );
              })}
            </div>
            <div className="grid grid-cols-4 gap-2 text-[10px] uppercase tracking-[0.14em]">
              {(['distinction', 'merit', 'pass', 'fail'] as Band[]).map((b) => (
                <div key={b} className="text-center space-y-0.5">
                  <div
                    className={cn(
                      'font-mono text-[12px] tabular-nums',
                      b === band ? 'text-elec-yellow' : 'text-white'
                    )}
                  >
                    {probs[b]}%
                  </div>
                  <div className="text-white">{BAND_LABEL[b]}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * How close the learner is to earning a firmer projection. Shown rather
 * than hidden, so "not enough yet" is a countable distance instead of a
 * refusal.
 */
function EvidenceMeter({ count, target }: { count: number; target: number }) {
  const pct = Math.min(100, Math.round((count / target) * 100));
  return (
    <div className="flex items-center gap-3 max-w-xs">
      <div className="h-1 flex-1 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full bg-elec-yellow transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] font-mono tabular-nums text-white shrink-0">
        {count}/{target} quizzes
      </span>
    </div>
  );
}

export default EPAGradePredictor;
