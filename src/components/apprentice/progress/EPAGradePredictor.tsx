/**
 * EPAGradePredictor
 *
 * Apprentice-facing predicted EPA grade band based on current learning
 * performance — quiz average × flashcard mastery, weighted slightly by
 * the most recent quiz scores so a clear upward (or downward) trend
 * shifts the prediction.
 *
 * The bands map to the published EPA grade descriptors used by the
 * major UK EPAOs (NET / C&G / EAL):
 *   • Distinction  — ≥ 80% blended
 *   • Merit        — 65–79
 *   • Pass         — 50–64
 *   • Fail         — < 50
 *
 * The card shows:
 *   - The most-likely band (mono headline)
 *   - A 4-segment probability strip across the bands
 *   - One-line "lift X to push Y" actionable nudge
 */

import { cn } from '@/lib/utils';
import { Eyebrow } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

interface EPAGradePredictorProps {
  /** Avg quiz score 0-100 from useQuizResults.getOverallStats. */
  quizAverage: number;
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

function deriveBand(blended: number): Band {
  if (blended >= 80) return 'distinction';
  if (blended >= 65) return 'merit';
  if (blended >= 50) return 'pass';
  return 'fail';
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
  flashcardMasteryPct,
  recentQuizScore,
  trend,
  weakestTopic,
}: EPAGradePredictorProps) {
  const haveAnyData = quizAverage > 0 || flashcardMasteryPct > 0;

  // Blended baseline: 65% quiz performance × 35% flashcard mastery
  const baseline = quizAverage * 0.65 + flashcardMasteryPct * 0.35;

  // Trajectory adjustment: ± 5 points on a clear trend with recent quiz data
  let blended = baseline;
  if (typeof recentQuizScore === 'number') {
    const drift = recentQuizScore - quizAverage;
    if (Math.abs(drift) > 5) blended += Math.sign(drift) * 4;
  }
  blended = Math.max(0, Math.min(100, Math.round(blended)));

  const band = deriveBand(blended);
  const probs = bandProbabilities(blended);

  const headlineTone =
    band === 'distinction'
      ? 'text-elec-yellow'
      : band === 'fail'
        ? 'text-red-300'
        : 'text-white';

  const nextBandTarget =
    band === 'fail' ? 50 : band === 'pass' ? 65 : band === 'merit' ? 80 : null;
  const nextBandLabel =
    band === 'fail'
      ? 'Pass'
      : band === 'pass'
        ? 'Merit'
        : band === 'merit'
          ? 'Distinction'
          : null;

  const trendCopy =
    trend === 'improving'
      ? 'Trend improving — keep the pace.'
      : trend === 'declining'
        ? 'Recent scores have dipped — focus matters now.'
        : trend === 'stable'
          ? 'Consistent — push for a step change next.'
          : '';

  const actionCopy =
    !haveAnyData
      ? 'Take a quiz or run a flashcard session — we need a few data points to project a grade.'
      : nextBandTarget && weakestTopic
        ? `Lift ${weakestTopic} from your weakest area to push above ${nextBandTarget}% — that lifts ${nextBandLabel} probability sharply.`
        : nextBandTarget
          ? `Lift the blended score above ${nextBandTarget}% to land ${nextBandLabel}.`
          : 'You\'re on track for the top band — keep cementing depth across topics.';

  return (
    <section className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-5 sm:p-6 space-y-4">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <div className="space-y-1">
          <Eyebrow>Predicted EPA grade</Eyebrow>
          <div className="flex items-baseline gap-3">
            <span
              className={cn(
                'text-[40px] sm:text-[48px] font-semibold tracking-tight leading-none',
                headlineTone
              )}
            >
              {haveAnyData ? BAND_LABEL[band] : '—'}
            </span>
            {haveAnyData && (
              <span className="text-[14px] text-white/55 font-mono">{blended}/100 blended</span>
            )}
          </div>
        </div>
        {trendCopy && (
          <span className="text-[11px] uppercase tracking-[0.18em] text-white/55 max-w-[180px] text-right">
            {trendCopy}
          </span>
        )}
      </div>

      {/* Probability strip */}
      <div className="space-y-2">
        <div className="flex h-2.5 w-full rounded-full overflow-hidden bg-white/[0.04]">
          {(['distinction', 'merit', 'pass', 'fail'] as Band[]).map((b) => {
            const pct = probs[b];
            if (pct < 1) return null;
            const tone =
              b === 'distinction'
                ? 'bg-elec-yellow'
                : b === 'merit'
                  ? 'bg-elec-yellow/55'
                  : b === 'pass'
                    ? 'bg-white/40'
                    : 'bg-red-400/70';
            return (
              <div
                key={b}
                className={cn('h-full transition-all duration-700', tone)}
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
                  b === band
                    ? b === 'fail'
                      ? 'text-red-300'
                      : 'text-elec-yellow'
                    : 'text-white/55'
                )}
              >
                {probs[b]}%
              </div>
              <div className="text-white/45">{BAND_LABEL[b]}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[13px] text-white/85 leading-relaxed">{actionCopy}</p>
    </section>
  );
}

export default EPAGradePredictor;
