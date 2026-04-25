import { cn } from '@/lib/utils';
import { useStudentProgress } from '@/hooks/useStudentProgress';

/* ==========================================================================
   SectionCourseProgress — apprentice-side qualification + module progress.
   Surfaces overall %, units evidenced/verified, KSB roll-up, recent modules.
   ========================================================================== */

function fmtMins(m: number): string {
  if (m < 60) return `${Math.round(m)}m`;
  const h = m / 60;
  return h < 10 ? `${h.toFixed(1)}h` : `${Math.round(h)}h`;
}

function formatRelative(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  const now = new Date();
  const days = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (days < 0) return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
}

export function SectionCourseProgress({
  id,
  studentName,
  userId,
}: {
  id: string;
  studentName: string;
  userId: string | null;
}) {
  const { activeQualification, unitCoverage, modules, ksb, totals, loading } =
    useStudentProgress(userId);

  if (!userId) {
    return (
      <section id={id} className="scroll-mt-6">
        <Header />
        <div className="mt-5 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-8 text-center">
          <p className="text-[12.5px] text-white/65 max-w-md mx-auto leading-relaxed">
            No linked apprentice account — connect this learner's app sign-in to
            see qualification + module progress.
          </p>
        </div>
      </section>
    );
  }

  const overall = totals.overall_percent;
  const ringColour =
    overall >= 80
      ? 'stroke-emerald-400'
      : overall >= 50
        ? 'stroke-elec-yellow'
        : overall >= 25
          ? 'stroke-amber-400'
          : 'stroke-red-400';

  return (
    <section id={id} className="scroll-mt-6">
      <Header />

      <div className="mt-5 grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-4">
        {/* Headline progress card */}
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Overall
          </div>
          <div className="mt-3 flex items-center gap-4">
            <div className="relative h-[88px] w-[88px] flex-shrink-0">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  strokeWidth="2.5"
                  className="stroke-white/[0.08]"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={`${(overall / 100) * 97.4} 97.4`}
                  className={cn('transition-all duration-500', ringColour)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[18px] font-semibold text-white tabular-nums leading-none">
                  {overall}
                  <span className="text-[11px] text-white/65">%</span>
                </div>
                <div className="text-[9.5px] uppercase tracking-[0.14em] text-white/50 mt-0.5">
                  qualification
                </div>
              </div>
            </div>
            <div className="min-w-0 flex-1 text-[11px] text-white/65 leading-snug">
              {activeQualification?.target_completion_date && (
                <div>
                  <span className="text-white/45">Target:</span>{' '}
                  <span className="text-white tabular-nums">
                    {new Date(activeQualification.target_completion_date).toLocaleDateString(
                      'en-GB',
                      { day: 'numeric', month: 'short', year: 'numeric' }
                    )}
                  </span>
                </div>
              )}
              <div className="mt-1">
                <span className="text-white/45">Studied:</span>{' '}
                <span className="text-white tabular-nums">
                  {fmtMins(totals.total_minutes_studied)}
                </span>
              </div>
              <div className="mt-1">
                <span className="text-white/45">Units:</span>{' '}
                <span className="text-white tabular-nums">
                  {totals.units_complete}/{unitCoverage.length} done
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Criteria evidenced" value={`${totals.total_evidenced}`} sub={`of ${totals.total_criteria}`} />
            <Stat label="Verified" value={`${totals.total_verified}`} sub="signed off" tone="emerald" />
            <Stat
              label="KSBs verified"
              value={`${ksb.verified}`}
              sub={`${ksb.verified_percent}%`}
              tone={ksb.verified_percent >= 80 ? 'emerald' : ksb.verified_percent >= 40 ? 'amber' : undefined}
            />
            <Stat label="Active KSBs" value={`${ksb.in_progress + ksb.evidenced}`} sub={`of ${ksb.total}`} />
          </div>
        </div>
      </div>

      {/* Unit coverage table */}
      {loading && unitCoverage.length === 0 ? (
        <Skeleton />
      ) : unitCoverage.length === 0 ? (
        <div className="mt-5 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-8 text-center">
          <p className="text-[12.5px] text-white/65 max-w-md mx-auto leading-relaxed">
            No unit coverage rows for {studentName.split(' ')[0]} yet. They'll appear as the
            learner makes progress in the app.
          </p>
        </div>
      ) : (
        <div className="mt-5 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Unit coverage
            </div>
            <div className="text-[11px] text-white/55 tabular-nums">{unitCoverage.length} units</div>
          </div>
          <ul className="divide-y divide-white/[0.04]">
            {unitCoverage.slice(0, 10).map((u) => {
              const pct = u.completion_percentage ?? 0;
              const status = u.status ?? (pct >= 100 ? 'complete' : pct > 0 ? 'in_progress' : 'not_started');
              return (
                <li key={u.id} className="px-5 py-3 flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] text-white truncate">
                      {u.category_name ?? u.qualification_title ?? 'Unit'}
                    </div>
                    <div className="mt-1 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[10.5px] text-white/55 tabular-nums">
                      {u.qualification_code && (
                        <span className="font-mono text-white/65">{u.qualification_code}</span>
                      )}
                      {u.qualification_code && <span className="text-white/25">·</span>}
                      <span>{u.evidenced_criteria}/{u.total_criteria} evidenced</span>
                      <span className="text-white/25">·</span>
                      <span>{u.verified_criteria} verified</span>
                      {u.last_updated && (
                        <>
                          <span className="text-white/25">·</span>
                          <span>{formatRelative(u.last_updated)}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="w-24 flex-shrink-0">
                    <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          status === 'complete' ? 'bg-emerald-400' :
                          pct > 50 ? 'bg-elec-yellow' :
                          pct > 0 ? 'bg-amber-400' : 'bg-white/15'
                        )}
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                    <div className="mt-1 text-[10px] text-white/65 tabular-nums text-right">
                      {pct}%
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Recent module activity */}
      {modules.length > 0 && (
        <div className="mt-4 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.06]">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Recent modules
            </div>
          </div>
          <ul className="divide-y divide-white/[0.04]">
            {modules.slice(0, 6).map((m, i) => (
              <li key={`${m.course}-${m.module}-${i}`} className="px-5 py-3 flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] text-white truncate">
                    {m.module || m.course}
                  </div>
                  <div className="mt-0.5 text-[10.5px] text-white/55 tabular-nums">
                    {fmtMins(m.time_spent_minutes)} · {formatRelative(m.last_accessed)}
                  </div>
                </div>
                <div className="text-[12px] font-semibold text-white tabular-nums flex-shrink-0">
                  {Math.round(m.completion_percentage)}%
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function Header() {
  return (
    <div className="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Apprentice progress
        </div>
        <h2 className="mt-1.5 text-xl sm:text-[26px] font-semibold text-white tracking-tight leading-tight">
          Course progress
        </h2>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: 'emerald' | 'amber';
}) {
  return (
    <div>
      <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
        {label}
      </div>
      <div
        className={cn(
          'mt-1 text-[18px] font-semibold tabular-nums leading-none',
          tone === 'emerald' ? 'text-emerald-300' : tone === 'amber' ? 'text-amber-300' : 'text-white'
        )}
      >
        {value}
      </div>
      {sub && <div className="mt-1 text-[10.5px] text-white/55 tabular-nums">{sub}</div>}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="mt-5 space-y-2 animate-pulse">
      {[0, 1, 2].map((i) => (
        <div key={i} className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-3.5">
          <div className="h-3 w-2/3 rounded bg-white/[0.06]" />
          <div className="mt-2 h-2 w-1/3 rounded bg-white/[0.04]" />
        </div>
      ))}
    </div>
  );
}
