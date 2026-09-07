import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useEpaCalibration } from '@/hooks/useEpaCalibration';
import { CalibrationSessionSheet } from '@/components/college/sheets/CalibrationSessionSheet';

/* ==========================================================================
   EpaCalibrationCard — the AI's track record on a college's EPA predictions,
   so a tutor can decide how much weight to give its verdict.
   Once there are ≥3 sealed outcomes it shows real numbers.

   Also used on CohortEpaPage — the `collegeId` prop is unchanged.
   ========================================================================== */

export function EpaCalibrationCard({ collegeId }: { collegeId?: string | null }) {
  const cal = useEpaCalibration({ collegeId });
  const [sessionsOpen, setSessionsOpen] = useState(false);

  const insufficient = cal.total < 3;
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE)}>
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.10] px-4 py-1.5 sm:px-5">
        <div className="min-w-0 text-[13px] font-semibold text-white">
          AI calibration
          <span className="ml-2 font-normal tabular-nums">
            {cal.total} sealed outcome{cal.total === 1 ? '' : 's'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setSessionsOpen(true)}
          className="-mr-2 inline-flex h-11 shrink-0 items-center px-2 text-[12px] font-semibold text-elec-yellow transition-colors touch-manipulation"
        >
          Tutor calibration
        </button>
      </div>
      <CalibrationSessionSheet open={sessionsOpen} onOpenChange={setSessionsOpen} />

      {cal.loading ? (
        <div className="px-4 py-4 sm:px-5">
          <div className="h-12 animate-pulse rounded-xl bg-white/[0.06]" />
        </div>
      ) : insufficient ? (
        <p className="px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
          Not enough data yet. Record EPA outcomes from Student 360 and the AI builds a track record
          against real grades.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 px-4 py-4 sm:px-5">
            <Stat
              label="Exact match"
              value={`${cal.exact_pct}%`}
              detail={`${cal.exact_matches}/${cal.total}`}
              accent
            />
            <Stat
              label="Within 1 band"
              value={`${cal.inclusive_pct}%`}
              detail={`${cal.exact_matches + cal.near_misses}/${cal.total}`}
            />
            <Stat label="Near misses" value={`${cal.near_misses}`} detail="±1 grade band" />
          </div>

          {cal.recent.length > 0 && (
            <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
              {cal.recent.slice(0, 5).map((r, i) => (
                <li key={i} className="flex items-center gap-3 px-4 py-2.5 text-[12.5px] sm:px-5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-6 w-[3px] shrink-0 rounded-full',
                      r.matched ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                    )}
                  />
                  <span className="min-w-0 flex-1 truncate text-white">{r.student_name}</span>
                  <span className="capitalize tabular-nums text-white">
                    {r.predicted_grade ?? '?'} → {r.actual_outcome ?? '?'}
                  </span>
                  <span
                    className={cn(
                      'w-10 shrink-0 text-right text-[12px] font-semibold',
                      r.matched ? 'text-elec-yellow' : 'text-white'
                    )}
                  >
                    {r.matched ? 'Match' : 'Miss'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  detail,
  accent = false,
}: {
  label: string;
  value: string;
  detail: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[11px] font-medium text-white">{label}</div>
      <div
        className={cn(
          'mt-1 text-[20px] font-semibold leading-none tabular-nums',
          accent ? 'text-elec-yellow' : 'text-white'
        )}
      >
        {value}
      </div>
      <div className="mt-1 text-[11.5px] tabular-nums text-white">{detail}</div>
    </div>
  );
}
