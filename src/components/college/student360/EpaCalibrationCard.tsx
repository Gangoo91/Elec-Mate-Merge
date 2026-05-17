import { useState } from 'react';
import { Bot, CheckCircle2, AlertCircle, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEpaCalibration } from '@/hooks/useEpaCalibration';
import { CalibrationSessionSheet } from '@/components/college/sheets/CalibrationSessionSheet';

/* ==========================================================================
   EpaCalibrationCard — surfaces the AI's track record on a college's EPA
   predictions. Builds tutor trust over time.
   Renders compactly. Once we have ≥3 sealed outcomes, shows real numbers.
   ========================================================================== */

export function EpaCalibrationCard({ collegeId }: { collegeId?: string | null }) {
  const cal = useEpaCalibration({ collegeId });
  const [sessionsOpen, setSessionsOpen] = useState(false);

  const insufficient = cal.total < 3;
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Bot className="h-3.5 w-3.5 text-purple-200" />
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            AI calibration
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[10.5px] text-white/45 tabular-nums">
            {cal.total} sealed outcome{cal.total === 1 ? '' : 's'}
          </div>
          <button
            type="button"
            onClick={() => setSessionsOpen(true)}
            className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-purple-500/[0.12] border border-purple-400/40 text-purple-200 text-[11px] font-semibold hover:bg-purple-500/[0.18] touch-manipulation"
          >
            <Users className="h-3 w-3" /> Tutor calibration →
          </button>
        </div>
      </div>
      <CalibrationSessionSheet open={sessionsOpen} onOpenChange={setSessionsOpen} />

      {cal.loading ? (
        <div className="mt-3 h-12 animate-pulse rounded-xl bg-white/[0.04]" />
      ) : insufficient ? (
        <div className="mt-3 rounded-xl bg-white/[0.03] border border-dashed border-white/[0.10] px-4 py-3">
          <div className="flex items-center gap-2 text-[12px] text-white/65">
            <AlertCircle className="h-3.5 w-3.5 text-white/45" />
            Insufficient data — record EPA outcomes from the Student 360 page so the AI can build a track record.
          </div>
        </div>
      ) : (
        <>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Stat
              label="Exact match"
              value={`${cal.exact_pct}%`}
              detail={`${cal.exact_matches}/${cal.total}`}
              tone="emerald"
            />
            <Stat
              label="Within 1 band"
              value={`${cal.inclusive_pct}%`}
              detail={`${cal.exact_matches + cal.near_misses}/${cal.total}`}
              tone="amber"
            />
            <Stat
              label="Near misses"
              value={`${cal.near_misses}`}
              detail={`±1 grade band`}
              tone="white"
            />
          </div>

          {cal.recent.length > 0 && (
            <div className="mt-4 border-t border-white/[0.04] pt-3">
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/45 mb-2">
                Recent
              </div>
              <ul className="space-y-1.5">
                {cal.recent.slice(0, 5).map((r, i) => (
                  <li key={i} className="flex items-center gap-2 text-[11.5px]">
                    <CheckCircle2
                      className={cn('h-3 w-3 flex-shrink-0', r.matched ? 'text-emerald-400' : 'text-white/25')}
                    />
                    <span className="min-w-0 flex-1 truncate text-white/85">{r.student_name}</span>
                    <span className="text-white/55 capitalize tabular-nums">
                      {r.predicted_grade ?? '?'} → {r.actual_outcome ?? '?'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
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
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  tone: 'emerald' | 'amber' | 'white';
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.16em] text-white/55">{label}</div>
      <div
        className={cn(
          'mt-1 text-[18px] font-semibold tabular-nums leading-none',
          tone === 'emerald' && 'text-emerald-300',
          tone === 'amber' && 'text-amber-300',
          tone === 'white' && 'text-white'
        )}
      >
        {value}
      </div>
      <div className="mt-0.5 text-[10.5px] text-white/55 tabular-nums">{detail}</div>
    </div>
  );
}
