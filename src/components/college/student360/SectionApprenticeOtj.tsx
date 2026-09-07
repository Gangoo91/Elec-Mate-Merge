import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import { useApprenticeOtj, type OtjEntry, type OtjSource } from '@/hooks/useApprenticeOtj';
import { OtjVerificationPanel } from '@/components/college/student360/OtjVerificationPanel';
import { OtjTrajectoryChart } from '@/components/college/student360/OtjTrajectoryChart';

/* ==========================================================================
   SectionApprenticeOtj — cross-hub off-the-job training panel.
   Surfaces apprentice-side activity (videos, study sessions, learning log)
   alongside college-recorded entries (workshops, 1-2-1s, mentoring).

   Data honesty. Everything `useApprenticeOtj` totals is LOGGED, not verified:
   learning-log rows, study sessions and site-diary entries are written by
   the learner's own device, and the college rows are counted whatever their
   verification status. So the two figure cards say "logged", the verified
   picture is the verification panel's job, and the only row that may say
   "Verified" is a college entry — the one kind whose verified_at a learner
   cannot set (guarded by tg_guard_otj_self_edit). A site-diary row used to
   show "Verified" off `time_entries.is_supervisor_verified`, a boolean on the
   learner's own row that nothing in the app but the learner's client writes.
   ========================================================================== */

const SOURCE_LABEL: Record<OtjSource, string> = {
  learning_activity: 'In-app learning',
  study_session: 'Study session',
  video_watch: 'Video',
  college: 'College-led',
  time_entry: 'Site diary',
};

const CARD = cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE);
const CARD_TITLE = 'text-[13px] font-semibold text-white';
const TEXT_BTN =
  'inline-flex h-11 shrink-0 items-center px-2 text-[12px] font-semibold transition-colors touch-manipulation';

function formatRelativeOrDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 0) return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
}

function fmtMins(m: number): string {
  if (m < 60) return `${Math.round(m)}m`;
  const h = m / 60;
  return h < 10 ? `${h.toFixed(1)}h` : `${Math.round(h)}h`;
}

export function SectionApprenticeOtj({
  id,
  studentName,
  userId,
  collegeStudentId,
  weeklyTargetMinutes,
  onAdd,
}: {
  id: string;
  studentName: string;
  userId: string | null;
  collegeStudentId?: string | null;
  weeklyTargetMinutes?: number;
  onAdd: () => void;
}) {
  const navigate = useNavigate();
  const { entries, breakdown, loading } = useApprenticeOtj(userId, weeklyTargetMinutes);
  const [expanded, setExpanded] = useState(false);

  const visible = useMemo(() => (expanded ? entries : entries.slice(0, 6)), [entries, expanded]);

  const noLink = !userId;
  const firstName = studentName.split(' ')[0];

  return (
    <section id={id} className="scroll-mt-6 space-y-3">
      <div className="flex items-end justify-between gap-3">
        <HubSectionHeading>Off-the-job training</HubSectionHeading>
        <div className="no-print -my-2 -mr-2 flex items-center">
          <button
            type="button"
            onClick={() => navigate('/college/otj/inbox')}
            className={cn(TEXT_BTN, 'text-white')}
          >
            Verification inbox
          </button>
          <button
            type="button"
            onClick={onAdd}
            disabled={noLink}
            title={noLink ? 'Needs a linked apprentice account' : undefined}
            className={cn(TEXT_BTN, noLink ? 'text-white opacity-50' : 'text-elec-yellow')}
          >
            Log college activity
          </button>
        </div>
      </div>

      {noLink ? (
        <div className={cn(CARD, 'px-4 py-6 sm:px-5')}>
          <p className="text-[13px] leading-relaxed text-white">
            This learner has no linked apprentice account yet, so cross-hub activity can&apos;t be
            pulled in. Once they sign in to the app with the same email, off-the-job training will
            appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[260px_minmax(0,1fr)]">
            <ProgressCard breakdown={breakdown} loading={loading} />
            <BreakdownCard breakdown={breakdown} />
          </div>

          {/* Cumulative trajectory — required line vs logged and verified */}
          {collegeStudentId && (
            <OtjTrajectoryChart collegeStudentId={collegeStudentId} userId={userId} />
          )}

          {/* Verification panel — the apprentice's pending submissions land
              here for one-tap sign-off. */}
          <OtjVerificationPanel studentUserId={userId} />

          {/* The full timeline — the history view to the panel's action view. */}
          {loading && entries.length === 0 ? (
            <Skeleton />
          ) : (
            <div className={CARD}>
              <div className="flex items-center justify-between gap-3 border-b border-white/[0.10] px-4 py-3 sm:px-5">
                <div className={CARD_TITLE}>Everything logged</div>
                <div className="text-[12px] tabular-nums text-white">
                  {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                </div>
              </div>
              {entries.length === 0 ? (
                <p className="px-4 py-5 text-[12.5px] leading-relaxed text-white sm:px-5">
                  Nothing logged for {firstName} yet. Activity in the app and college-led sessions
                  will appear here as they happen.
                </p>
              ) : (
                <>
                  <ul className="divide-y divide-white/[0.10]">
                    {visible.map((e) => (
                      <EntryRow key={e.id} entry={e} />
                    ))}
                  </ul>
                  {entries.length > 6 && (
                    <button
                      type="button"
                      onClick={() => setExpanded((v) => !v)}
                      className="flex h-11 w-full items-center justify-center border-t border-white/[0.10] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09]"
                    >
                      {expanded ? 'Show fewer' : `${entries.length - 6} more`}
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */

function ProgressCard({
  breakdown,
  loading,
}: {
  breakdown: ReturnType<typeof useApprenticeOtj>['breakdown'];
  loading: boolean;
}) {
  const pct = breakdown.weekly_progress_percent;
  const short = breakdown.weekly_target_minutes - breakdown.this_week_minutes;

  return (
    <div className={cn(CARD, 'px-4 py-4 sm:px-5')}>
      <div className={CARD_TITLE}>Logged this week</div>
      <div className="mt-3 flex items-center gap-4">
        <div className="relative h-[88px] w-[88px] shrink-0">
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              strokeWidth="2.5"
              className="stroke-white/[0.25]"
            />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${(pct / 100) * 97.4} 97.4`}
              className="stroke-elec-yellow transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[18px] font-semibold leading-none tabular-nums text-white">
              {pct}
              <span className="text-[11px]">%</span>
            </div>
            <div className="mt-0.5 text-[10px] text-white">of target</div>
          </div>
        </div>
        <div className="min-w-0">
          <div className="text-[15px] font-semibold tabular-nums text-white">
            {fmtMins(breakdown.this_week_minutes)}
            <span className="ml-1 text-[11px] font-normal">
              / {fmtMins(breakdown.weekly_target_minutes)}
            </span>
          </div>
          {!loading && pct < 100 && (
            <div className="mt-1 text-[12px] font-semibold tabular-nums text-elec-yellow">
              {fmtMins(short)} short
            </div>
          )}
          {!loading && pct >= 100 && (
            <div className="mt-1 text-[12px] font-semibold text-white">Target met</div>
          )}
          <div className="mt-1 text-[11.5px] leading-tight text-white">
            Everything logged, verified or not. Weekly minimum for an apprenticeship is 6h.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function BreakdownCard({
  breakdown,
}: {
  breakdown: ReturnType<typeof useApprenticeOtj>['breakdown'];
}) {
  const sources: OtjSource[] = [
    'college',
    'learning_activity',
    'study_session',
    'video_watch',
    'time_entry',
  ];
  const total = breakdown.total_minutes;

  return (
    <div className={cn(CARD, 'px-4 py-4 sm:px-5')}>
      <div className="flex items-baseline justify-between gap-3">
        <div className={CARD_TITLE}>Logged all time</div>
        <div className="text-[15px] font-semibold tabular-nums text-white">{fmtMins(total)}</div>
      </div>
      <div className="mt-3 space-y-2.5">
        {sources.map((s) => {
          const stat = breakdown.by_source[s];
          const widthPct = total > 0 ? (stat.minutes / total) * 100 : 0;
          return (
            <div key={s}>
              <div className="flex items-center justify-between gap-3 text-[12px] text-white">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate">{SOURCE_LABEL[s]}</span>
                  <span className="tabular-nums">{stat.entries}</span>
                </div>
                <span className="tabular-nums">{fmtMins(stat.minutes)}</span>
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.10]">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    // College-led hours are the ones a tutor put there.
                    s === 'college' ? 'bg-elec-yellow' : 'bg-white'
                  )}
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-white/[0.10] pt-3 text-[12px] text-white">
        <div>
          Last 7 days
          <span className="ml-1.5 font-semibold tabular-nums">
            {fmtMins(breakdown.last_7_days_minutes)}
          </span>
        </div>
        <div>
          Last 30 days
          <span className="ml-1.5 font-semibold tabular-nums">
            {fmtMins(breakdown.last_30_days_minutes)}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function EntryRow({ entry }: { entry: OtjEntry }) {
  // Only a college entry's verified_at is set by staff. A site-diary row's
  // comes from a boolean on the learner's own record — not a verification.
  const verified = entry.source === 'college' && !!entry.verified_at;
  const reason = [
    formatRelativeOrDate(entry.occurred_at),
    SOURCE_LABEL[entry.source],
    entry.category && entry.source === 'college' ? entry.category.replace(/_/g, ' ') : null,
    entry.recorded_by_name ? `by ${entry.recorded_by_name}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <li className="flex items-center gap-3 px-4 py-3 sm:px-5">
      <span
        aria-hidden="true"
        className={cn(
          'h-8 w-[3px] shrink-0 rounded-full',
          verified ? 'bg-elec-yellow' : 'bg-white/[0.25]'
        )}
      />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-semibold leading-tight text-white">
          {entry.title}
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] leading-tight text-white">
          <span className="truncate capitalize tabular-nums">{reason}</span>
          {verified && <span className="font-semibold text-elec-yellow">Verified</span>}
        </div>
        {entry.unit_codes.length > 0 && (
          <div className="mt-1.5 flex flex-wrap items-center gap-1">
            {entry.unit_codes.slice(0, 4).map((u) => (
              <span
                key={u}
                className="inline-flex h-5 items-center rounded-md border border-white/[0.14] px-1.5 font-mono text-[10.5px] tabular-nums text-white"
              >
                {u}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
        {entry.duration_minutes > 0 ? fmtMins(entry.duration_minutes) : '—'}
      </div>
    </li>
  );
}

/* ──────────────────────────────────────────────────────── */

function Skeleton() {
  return (
    <div className={cn(CARD, 'animate-pulse')}>
      <ul className="divide-y divide-white/[0.10]">
        {[0, 1, 2].map((i) => (
          <li key={i} className="px-4 py-3.5 sm:px-5">
            <div className="h-3 w-2/3 rounded bg-white/[0.10]" />
            <div className="mt-2 h-2 w-1/3 rounded bg-white/[0.06]" />
          </li>
        ))}
      </ul>
    </div>
  );
}
