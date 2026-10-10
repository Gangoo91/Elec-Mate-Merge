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
  // Showcase pass (10 Oct): with too few real results there is nothing to
  // chart yet, so the card is one quiet line rather than an empty panel.
  if (insufficient && !cal.loading) {
    return (
      <div
        className={cn(
          '-mx-4 flex flex-col gap-1 border-y border-white/[0.08] px-4 py-3 sm:mx-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:rounded-2xl sm:border-x sm:px-5',
          CARD_SURFACE
        )}
      >
        <p className="min-w-0 text-[13px] leading-snug text-white">
          <span className="font-semibold">How accurate the prediction is</span>
          <span>
            {' '}
            shows once 3 real EPA grades are recorded on Student 360 ({cal.total} so far).
          </span>
        </p>
        <button
          type="button"
          onClick={() => setSessionsOpen(true)}
          className="-ml-1 inline-flex h-11 shrink-0 items-center self-start px-1 text-[13px] font-semibold text-elec-yellow transition-colors touch-manipulation sm:self-auto"
        >
          Tutor standardisation
        </button>
        <CalibrationSessionSheet open={sessionsOpen} onOpenChange={setSessionsOpen} />
      </div>
    );
  }
  return (
    <div
      className={cn(
        'overflow-hidden -mx-4 border-y border-white/[0.08] sm:mx-0 sm:rounded-3xl sm:border-x',
        CARD_SURFACE
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.10] px-4 py-1.5 sm:px-5">
        <div className="min-w-0 text-[13px] font-semibold text-white">
          How accurate the readiness prediction is
          <span className="ml-2 font-normal tabular-nums">
            {cal.total} real result{cal.total === 1 ? '' : 's'} so far
          </span>
        </div>
        <button
          type="button"
          onClick={() => setSessionsOpen(true)}
          className="-mr-2 inline-flex h-11 shrink-0 items-center px-2 text-[12px] font-semibold text-elec-yellow transition-colors touch-manipulation"
        >
          Tutor standardisation
        </button>
      </div>
      <CalibrationSessionSheet open={sessionsOpen} onOpenChange={setSessionsOpen} />

      {cal.loading ? (
        <div className="px-4 py-4 sm:px-5">
          <div className="h-12 animate-pulse rounded-xl bg-white/[0.06]" />
        </div>
      ) : insufficient ? (
        <p className="px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
          Not enough results yet. Record each apprentice's real EPA grade on Student 360 and this
          shows how often the readiness prediction got it right.
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
                  <span className="min-w-0 flex-1 line-clamp-2 text-white">{r.student_name}</span>
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
      <div className="text-[12px] font-medium text-white">{label}</div>
      <div
        className={cn(
          'mt-1 text-[20px] font-semibold leading-none tabular-nums',
          accent ? 'text-elec-yellow' : 'text-white'
        )}
      >
        {value}
      </div>
      <div className="mt-1 text-[12px] tabular-nums text-white">{detail}</div>
    </div>
  );
}
