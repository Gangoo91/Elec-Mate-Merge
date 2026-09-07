import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import { useStudentProgress } from '@/hooks/useStudentProgress';

/* ==========================================================================
   SectionCourseProgress — apprentice-side qualification + module progress.
   Surfaces overall %, units evidenced/verified, KSB roll-up, recent modules.

   Hub language: one heading, CARD_SURFACE cards, all text white. The
   traffic-light ring went — a 96px ring said the same thing as a 30px
   figure. Emerald is kept ONLY for "verified" (assessor-confirmed), which
   is the one genuinely good state here; "evidenced" is the learner's own
   claim and stays white.
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

const CARD = cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE);

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
  const first = studentName.split(' ')[0];

  if (!userId) {
    return (
      <section id={id} className="scroll-mt-20 space-y-3">
        <HubSectionHeading>Course progress</HubSectionHeading>
        <div className={cn(CARD, 'px-4 py-5 sm:px-5')}>
          <p className="text-[12.5px] leading-relaxed text-white">
            No linked apprentice account — connect this learner's app sign-in to see qualification
            and module progress.
          </p>
        </div>
      </section>
    );
  }

  const overall = totals.overall_percent;

  return (
    <section id={id} className="scroll-mt-20 space-y-3">
      <HubSectionHeading>Course progress</HubSectionHeading>

      {/* Headline + metrics */}
      <div className={CARD}>
        <div className="grid grid-cols-1 divide-y divide-white/[0.10] md:grid-cols-[260px_minmax(0,1fr)] md:divide-x md:divide-y-0">
          <div className="px-4 py-4 sm:px-5">
            <div className="text-[12px] font-medium text-white">Qualification</div>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-[30px] font-semibold leading-none tabular-nums tracking-tight text-white">
                {overall}%
              </span>
              <span className="text-[12px] tabular-nums text-white">
                {totals.units_complete} / {unitCoverage.length} units done
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-elec-yellow transition-all duration-500"
                style={{ width: `${Math.min(100, overall)}%` }}
              />
            </div>
            <dl className="mt-4 space-y-1.5 text-[12px]">
              <MetaRow
                label="Target"
                value={
                  activeQualification?.target_completion_date
                    ? new Date(activeQualification.target_completion_date).toLocaleDateString(
                        'en-GB',
                        { day: 'numeric', month: 'short', year: 'numeric' }
                      )
                    : '—'
                }
              />
              <MetaRow label="Studied" value={fmtMins(totals.total_minutes_studied)} />
            </dl>
          </div>

          <div className="px-4 py-4 sm:px-5">
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
              <Metric label="Evidenced" value={totals.total_evidenced} of={totals.total_criteria} />
              <Metric
                label="Verified"
                value={totals.total_verified}
                of={totals.total_criteria}
                good
              />
              <Metric label="KSBs verified" value={ksb.verified} of={ksb.total} good />
              <Metric label="KSBs active" value={ksb.in_progress + ksb.evidenced} of={ksb.total} />
            </div>
          </div>
        </div>
      </div>

      {/* Unit coverage */}
      {loading && unitCoverage.length === 0 ? (
        <Skeleton />
      ) : unitCoverage.length === 0 ? (
        <div className={cn(CARD, 'px-4 py-5 sm:px-5')}>
          <p className="text-[12.5px] leading-relaxed text-white">
            No unit coverage rows for {first} yet. They appear as the learner makes progress in
            the app.
          </p>
        </div>
      ) : (
        <div className={CARD}>
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.10] px-4 py-3 sm:px-5">
            <div className="text-[13px] font-semibold text-white">Unit coverage</div>
            <div className="text-[11px] tabular-nums text-white">{unitCoverage.length} units</div>
          </div>
          <ul className="divide-y divide-white/[0.10]">
            {unitCoverage.slice(0, 10).map((u) => {
              const pct = u.completion_percentage ?? 0;
              const status =
                u.status ?? (pct >= 100 ? 'complete' : pct > 0 ? 'in_progress' : 'not_started');
              return (
                <li key={u.id} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium text-white">
                      {u.category_name ?? u.qualification_title ?? 'Unit'}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] tabular-nums text-white">
                      {u.qualification_code && <span className="font-mono">{u.qualification_code}</span>}
                      <span>
                        {u.evidenced_criteria}/{u.total_criteria} evidenced
                      </span>
                      <span>{u.verified_criteria} verified</span>
                      {u.last_updated && <span>{formatRelative(u.last_updated)}</span>}
                    </div>
                  </div>
                  <div className="w-24 shrink-0">
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          status === 'complete' ? 'bg-emerald-400' : 'bg-white/[0.45]'
                        )}
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                    <div className="mt-1 text-right text-[11px] tabular-nums text-white">{pct}%</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Recent module activity */}
      {modules.length > 0 && (
        <div className={CARD}>
          <div className="border-b border-white/[0.10] px-4 py-3 sm:px-5">
            <div className="text-[13px] font-semibold text-white">Recent modules</div>
          </div>
          <ul className="divide-y divide-white/[0.10]">
            {modules.slice(0, 6).map((m, i) => (
              <li key={`${m.course}-${m.module}-${i}`} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium text-white">{m.module || m.course}</div>
                  <div className="mt-0.5 text-[11px] tabular-nums text-white">
                    {fmtMins(m.time_spent_minutes)} · {formatRelative(m.last_accessed)}
                  </div>
                </div>
                <div className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
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

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-white">{label}</dt>
      <dd className="tabular-nums text-white">{value}</dd>
    </div>
  );
}

function Metric({
  label,
  value,
  of,
  good,
}: {
  label: string;
  value: number;
  of?: number;
  good?: boolean;
}) {
  const pct = of && of > 0 ? Math.round((value / of) * 100) : null;
  return (
    <div className="flex flex-col">
      <div className="text-[12px] font-medium leading-none text-white">{label}</div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span
          className={cn(
            'text-[24px] font-semibold leading-none tabular-nums',
            good && value > 0 ? 'text-emerald-300' : 'text-white'
          )}
        >
          {value}
        </span>
        {of !== undefined && (
          <span className="text-[12px] leading-none tabular-nums text-white">/ {of}</span>
        )}
      </div>
      {pct !== null && (
        <>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                good ? 'bg-emerald-400' : 'bg-white/[0.45]'
              )}
              style={{ width: `${Math.min(100, pct)}%` }}
            />
          </div>
          <div className="mt-1 text-[11px] tabular-nums text-white">{pct}%</div>
        </>
      )}
    </div>
  );
}

function Skeleton() {
  return (
    <div className={cn(CARD, 'space-y-3 px-4 py-4 animate-pulse sm:px-5')}>
      {[0, 1, 2].map((i) => (
        <div key={i}>
          <div className="h-3 w-2/3 rounded bg-white/[0.08]" />
          <div className="mt-2 h-2 w-1/3 rounded bg-white/[0.05]" />
        </div>
      ))}
    </div>
  );
}
