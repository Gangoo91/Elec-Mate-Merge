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
    <div className="card-surface space-y-3 rounded-2xl border-orange-400/40 p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[15px] font-semibold text-white">Standardisation watch</h3>
        <span className="text-[12px] tabular-nums text-white">
          {closedSessionCount} closed session{closedSessionCount === 1 ? '' : 's'}
        </span>
      </div>
      <p className="text-[13px] leading-snug text-white">
        These assessors drift from the agreed standard across calibration sessions. Put them first
        for standardisation and IQA sampling.
      </p>
      <ul className="divide-y divide-white/[0.06]">
        {outliers.map((a) => (
          <li key={a.assessorId} className="flex items-center justify-between gap-3 py-2.5">
            <div className="min-w-0">
              <div className="truncate text-[13px] font-semibold text-white">
                {a.assessorName ?? 'Unknown assessor'}
              </div>
              <div className="text-[12px] tabular-nums text-white">
                {a.consensusAlignmentPct}% consensus
                {a.referenceAccuracyPct != null && ` · ${a.referenceAccuracyPct}% vs reference`}
                {` · ${a.sessions} sessions`}
              </div>
            </div>
            <span
              className={cn(
                'inline-flex h-6 shrink-0 items-center rounded-full border px-2 text-[12px] font-semibold text-white',
                a.driftLabel === 'lenient' && 'border-orange-400/60',
                a.driftLabel === 'harsh' && 'border-sky-400/60',
                a.driftLabel === 'aligned' && 'border-white/[0.16]'
              )}
            >
              {a.driftLabel === 'aligned'
                ? 'Off consensus'
                : `${a.driftLabel === 'lenient' ? 'Lenient' : 'Harsh'} +${Math.abs(a.avgSignedDrift).toFixed(1)}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
