import { cn } from '@/lib/utils';
import { useStudentEpa } from '@/hooks/useStudentEpa';

/* ==========================================================================
   SectionEpaReadiness — End-Point Assessment gateway readiness for one
   learner. Composite score, gateway checklist, mock attempts, gaps.
   ========================================================================== */

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const GATEWAY_LABELS: { key: keyof NonNullable<ReturnType<typeof useStudentEpa>['checklist']>; label: string }[] = [
  { key: 'portfolio_complete', label: 'Portfolio complete' },
  { key: 'portfolio_signed_off', label: 'Portfolio signed off' },
  { key: 'ojt_hours_verified', label: 'OTJ hours verified' },
  { key: 'english_level2_achieved', label: 'English Level 2' },
  { key: 'maths_level2_achieved', label: 'Maths Level 2' },
  { key: 'employer_satisfied', label: 'Employer declaration' },
  { key: 'provider_satisfied', label: 'Provider declaration' },
];

export function SectionEpaReadiness({
  id,
  studentName,
  userId,
  collegeStudentId,
}: {
  id: string;
  studentName: string;
  userId: string | null;
  collegeStudentId: string | null;
}) {
  const { checklist, latestSnapshot, mocks, collegeEpa, rollUp, loading } = useStudentEpa(
    userId,
    collegeStudentId
  );

  if (!userId && !collegeStudentId) {
    return (
      <section id={id} className="scroll-mt-6">
        <Header />
        <div className="mt-5 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-8 text-center">
          <p className="text-[12.5px] text-white/65 max-w-md mx-auto leading-relaxed">
            No EPA data linked to this learner yet.
          </p>
        </div>
      </section>
    );
  }

  const composite = rollUp.composite_score;
  const ringColour =
    composite >= 80
      ? 'stroke-emerald-400'
      : composite >= 50
        ? 'stroke-elec-yellow'
        : composite >= 25
          ? 'stroke-amber-400'
          : 'stroke-red-400';

  const hasNoData = !checklist && !latestSnapshot && !mocks.length && !collegeEpa;

  if (hasNoData && !loading) {
    return (
      <section id={id} className="scroll-mt-6">
        <Header />
        <div className="mt-5 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-8 text-center">
          <p className="text-[12.5px] text-white/65 max-w-md mx-auto leading-relaxed">
            No EPA gateway record yet for {studentName.split(' ')[0]}. The gateway checklist
            opens once they're approaching the end of their qualification.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="scroll-mt-6">
      <Header />

      <div className="mt-5 grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-4">
        {/* Composite readiness */}
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Composite readiness
          </div>
          <div className="mt-3 flex items-center gap-4">
            <div className="relative h-[88px] w-[88px] flex-shrink-0">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" strokeWidth="2.5" className="stroke-white/[0.08]" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={`${(composite / 100) * 97.4} 97.4`}
                  className={cn('transition-all duration-500', ringColour)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[18px] font-semibold text-white tabular-nums leading-none">
                  {composite}
                </div>
                <div className="text-[9.5px] uppercase tracking-[0.14em] text-white/50 mt-0.5">
                  composite
                </div>
              </div>
            </div>
            <div className="min-w-0 flex-1 text-[11px] leading-snug">
              <div>
                <span className="text-white/45">Gateway:</span>{' '}
                <span className="text-white tabular-nums">
                  {rollUp.gateway_items_complete}/{rollUp.gateway_items_total}
                </span>
              </div>
              {rollUp.ready_for_gateway && !checklist?.gateway_passed && (
                <div className="mt-1.5 inline-flex items-center h-5 px-1.5 rounded-md bg-emerald-500/[0.1] border border-emerald-500/30 text-[10px] font-semibold tracking-[0.06em] uppercase text-emerald-200">
                  Ready for gateway
                </div>
              )}
              {checklist?.gateway_passed && (
                <div className="mt-1.5 inline-flex items-center h-5 px-1.5 rounded-md bg-emerald-500/[0.1] border border-emerald-500/30 text-[10px] font-semibold tracking-[0.06em] uppercase text-emerald-200">
                  Gateway passed
                </div>
              )}
              {checklist?.epa_booked && (
                <div className="mt-1.5 inline-flex items-center h-5 px-1.5 rounded-md bg-purple-500/[0.1] border border-purple-500/30 text-[10px] font-semibold tracking-[0.06em] uppercase text-purple-200">
                  EPA booked
                </div>
              )}
              {!rollUp.ready_for_gateway && rollUp.blocking_items.length > 0 && (
                <div className="mt-1.5 text-[10.5px] text-white/55">
                  {rollUp.blocking_items.length} blocking
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Subscores */}
        {latestSnapshot && (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5">
            <div className="flex items-baseline justify-between gap-3">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Latest snapshot
              </div>
              {latestSnapshot.calculated_at && (
                <div className="text-[10.5px] text-white/45 tabular-nums">
                  {formatDate(latestSnapshot.calculated_at)}
                </div>
              )}
            </div>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Sub label="Portfolio" pct={latestSnapshot.portfolio_coverage_pct} />
              <Sub label="KSBs" pct={latestSnapshot.ksb_completion_pct} />
              <Sub label="Evidence" pct={latestSnapshot.evidence_quality_avg} />
              <Sub label="Mocks" pct={Math.round(((latestSnapshot.mock_discussion_avg ?? 0) + (latestSnapshot.mock_knowledge_avg ?? 0)) / 2) || null} />
            </div>
          </div>
        )}
      </div>

      {/* Gateway checklist */}
      {checklist && (
        <div className="mt-4 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.06]">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Gateway checklist
            </div>
          </div>
          <ul className="divide-y divide-white/[0.04]">
            {GATEWAY_LABELS.map(({ key, label }) => {
              const complete = Boolean((checklist as Record<string, unknown>)[key]);
              return (
                <li key={String(key)} className="px-5 py-3 flex items-center gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      'inline-flex items-center justify-center h-5 w-5 rounded-full text-[10px] font-bold flex-shrink-0',
                      complete
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-white/[0.04] text-white/35'
                    )}
                  >
                    {complete ? '✓' : '·'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className={cn('text-[12.5px]', complete ? 'text-white' : 'text-white/65')}>
                      {label}
                    </div>
                  </div>
                  {key === 'ojt_hours_verified' && checklist.ojt_hours_required != null && (
                    <div className="text-[10.5px] text-white/55 tabular-nums">
                      {Math.round(checklist.ojt_hours_completed ?? 0)}h / {Math.round(checklist.ojt_hours_required)}h
                    </div>
                  )}
                </li>
              );
            })}
            {checklist.gateway_meeting_scheduled && (
              <li className="px-5 py-3 flex items-center gap-3 bg-white/[0.02]">
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center h-5 px-2 rounded-md bg-blue-500/20 text-blue-200 text-[9px] font-bold tracking-[0.08em] uppercase flex-shrink-0"
                >
                  Gateway
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] text-white">Meeting scheduled</div>
                  <div className="text-[10.5px] text-white/55 tabular-nums">
                    {formatDate(checklist.gateway_meeting_scheduled)}
                    {checklist.gateway_meeting_outcome && (
                      <>
                        <span className="text-white/25 mx-1.5">·</span>
                        <span className="capitalize">{checklist.gateway_meeting_outcome}</span>
                      </>
                    )}
                  </div>
                </div>
              </li>
            )}
            {checklist.epa_booking_date && (
              <li className="px-5 py-3 flex items-center gap-3 bg-white/[0.02]">
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center h-5 px-2 rounded-md bg-purple-500/20 text-purple-200 text-[9px] font-bold tracking-[0.08em] uppercase flex-shrink-0"
                >
                  EPA
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] text-white">Assessment booked</div>
                  <div className="text-[10.5px] text-white/55 tabular-nums">
                    {formatDate(checklist.epa_booking_date)}
                    {checklist.epa_provider && (
                      <>
                        <span className="text-white/25 mx-1.5">·</span>
                        <span>{checklist.epa_provider}</span>
                      </>
                    )}
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Gaps from latest snapshot */}
      {latestSnapshot && latestSnapshot.gaps.length > 0 && (
        <div className="mt-4 bg-amber-500/[0.04] border border-amber-500/[0.18] rounded-2xl px-5 py-4">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-300/85 mb-2">
            Gaps to close
          </div>
          <ul className="space-y-2">
            {latestSnapshot.gaps.slice(0, 6).map((g, i) => {
              const dot =
                g.priority === 'high'
                  ? 'bg-red-400/85'
                  : g.priority === 'medium'
                    ? 'bg-amber-400/85'
                    : 'bg-white/40';
              return (
                <li key={i} className="text-[12px] leading-snug pl-4 relative">
                  <span
                    aria-hidden
                    className={cn('absolute left-0 top-[7px] inline-block h-1.5 w-1.5 rounded-full', dot)}
                  />
                  <span className="text-white font-medium">{g.area}</span>
                  {g.description && <span className="text-white/65"> — {g.description}</span>}
                  {g.action && (
                    <div className="mt-0.5 text-[11px] text-white/55">→ {g.action}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Mock sessions */}
      {mocks.length > 0 && (
        <div className="mt-4 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Mock EPA attempts
            </div>
            <div className="text-[11px] text-white/55 tabular-nums">{mocks.length} sessions</div>
          </div>
          <ul className="divide-y divide-white/[0.04]">
            {mocks.slice(0, 5).map((m) => (
              <li key={m.id} className="px-5 py-3 flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] text-white">
                    {m.session_type ? m.session_type.replace(/_/g, ' ') : 'Mock'}
                    {m.predicted_grade && (
                      <span className="ml-2 text-[11px] font-medium text-elec-yellow/85">
                        {m.predicted_grade}
                      </span>
                    )}
                  </div>
                  <div className="text-[10.5px] text-white/55 tabular-nums capitalize">
                    {m.qualification_code} · {m.status} · {formatDate(m.completed_at)}
                  </div>
                </div>
                {m.overall_score != null && (
                  <div className="text-[14px] font-semibold text-white tabular-nums">
                    {m.overall_score}%
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* College-side EPA record */}
      {collegeEpa && (
        <div className="mt-4 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-2">
            College EPA record
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11.5px]">
            <Detail label="Status" value={collegeEpa.status ?? '—'} />
            <Detail label="Gateway" value={formatDate(collegeEpa.gateway_date)} />
            <Detail label="EPA date" value={formatDate(collegeEpa.epa_date)} />
            <Detail label="Result" value={collegeEpa.result ?? '—'} />
          </div>
          {collegeEpa.notes && (
            <p className="mt-3 text-[12px] text-white/85 whitespace-pre-line">{collegeEpa.notes}</p>
          )}
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
          End-Point Assessment
        </div>
        <h2 className="mt-1.5 text-xl sm:text-[26px] font-semibold text-white tracking-tight leading-tight">
          EPA readiness
        </h2>
      </div>
    </div>
  );
}

function Sub({ label, pct }: { label: string; pct: number | null }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.16em] text-white/55">{label}</div>
      <div className="mt-1 text-[15px] font-semibold text-white tabular-nums leading-none">
        {pct != null ? `${pct}%` : '—'}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.16em] text-white/55">{label}</div>
      <div className="mt-1 text-white capitalize">{value}</div>
    </div>
  );
}
