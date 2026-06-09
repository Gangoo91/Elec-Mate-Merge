import { cn } from '@/lib/utils';
import { useAssessorStandardisation } from '@/hooks/useAssessorStandardisation';

/**
 * Surfaces assessors drifting from the agreed standard across calibration
 * sessions. Reads the shared useAssessorStandardisation signal (the same one
 * Student 360 and IQA sampling consume). Renders nothing until there's enough
 * calibration history and at least one flagged assessor, so it never clutters
 * an empty/early state.
 */
export function CalibrationDriftCard() {
  const { outliers, hasEnoughData, closedSessionCount, loading } = useAssessorStandardisation();

  if (loading || !hasEnoughData || outliers.length === 0) return null;

  return (
    <div className="rounded-xl border border-amber-400/30 bg-amber-500/[0.06] px-4 py-3.5 space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-amber-200/90">
          Standardisation watch
        </div>
        <span className="text-[10px] tabular-nums text-white/45">
          {closedSessionCount} closed session{closedSessionCount === 1 ? '' : 's'}
        </span>
      </div>
      <p className="text-[11.5px] text-white/55 leading-snug">
        These assessors drift from the agreed standard across calibration sessions — prioritise
        them for standardisation and IQA sampling.
      </p>
      <ul className="space-y-1.5">
        {outliers.map((a) => (
          <li
            key={a.assessorId}
            className="flex items-center justify-between gap-3 rounded-lg bg-black/20 px-3 py-2"
          >
            <div className="min-w-0">
              <div className="text-[12.5px] font-semibold text-white truncate">
                {a.assessorName ?? 'Unknown assessor'}
              </div>
              <div className="text-[10.5px] text-white/50 tabular-nums">
                {a.consensusAlignmentPct}% consensus
                {a.referenceAccuracyPct != null && ` · ${a.referenceAccuracyPct}% vs reference`}
                {` · ${a.sessions} sessions`}
              </div>
            </div>
            <span
              className={cn(
                'shrink-0 inline-flex items-center h-5 px-1.5 rounded-md text-[9.5px] font-semibold uppercase tracking-[0.05em]',
                a.driftLabel === 'lenient' && 'bg-amber-500/15 border border-amber-400/40 text-amber-200',
                a.driftLabel === 'harsh' && 'bg-sky-500/15 border border-sky-400/40 text-sky-200',
                a.driftLabel === 'aligned' && 'bg-white/[0.05] border border-white/10 text-white/50'
              )}
            >
              {a.driftLabel === 'aligned'
                ? 'off-consensus'
                : `${a.driftLabel} +${Math.abs(a.avgSignedDrift).toFixed(1)}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
