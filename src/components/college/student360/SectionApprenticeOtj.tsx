import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { CollegeHeading } from '@/components/college/ui/CollegeUi';
import { useApprenticeOtj, type OtjEntry, type OtjSource } from '@/hooks/useApprenticeOtj';
import { OtjVerificationPanel } from '@/components/college/student360/OtjVerificationPanel';
import { OtjTrajectoryChart } from '@/components/college/student360/OtjTrajectoryChart';
import { OtjStaffOverview } from '@/components/college/student360/OtjStaffOverview';

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

const CARD = cn(
  'overflow-hidden -mx-4 border-y border-white/[0.08] sm:mx-0 sm:rounded-3xl sm:border-x',
  CARD_SURFACE
);
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
  const { entries, loading } = useApprenticeOtj(userId, weeklyTargetMinutes);
  const [expanded, setExpanded] = useState(false);

  const visible = useMemo(() => (expanded ? entries : entries.slice(0, 6)), [entries, expanded]);

  const noLink = !userId;
  const firstName = studentName.split(' ')[0];

  return (
    <section id={id} className="scroll-mt-6 space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
        <CollegeHeading>Off-the-job training</CollegeHeading>
        <div className="no-print -my-2 -mr-2 flex flex-wrap items-center">
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
          {/* The same figures the learner and employer see, the app learning
              with one-tap approval, and the planned-versus-actual statement. */}
          <OtjStaffOverview userId={userId} studentName={studentName} />

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

function EntryRow({ entry }: { entry: OtjEntry }) {
  // Only a college entry's verified_at is set by staff. A site-diary row's
  // comes from a boolean on the learner's own record — not a verification.
  const verified = entry.source === 'college' && !!entry.verified_at;
  const reason = [
    formatRelativeOrDate(entry.occurred_at),
    entry.submitted_by_apprentice ? 'Sent by the apprentice' : SOURCE_LABEL[entry.source],
    entry.category && entry.source === 'college'
      ? (([c, ...rest]) => c.toUpperCase() + rest.join(''))(entry.category.replace(/_/g, ' '))
      : null,
    entry.recorded_by_name && !entry.submitted_by_apprentice
      ? `by ${entry.recorded_by_name}`
      : null,
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
        <div className="line-clamp-2 text-[14px] font-semibold leading-snug text-white">
          {entry.title}
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] leading-tight text-white">
          <span className="line-clamp-2 tabular-nums">{reason}</span>
          {verified && <span className="font-semibold text-elec-yellow">Verified</span>}
        </div>
        {entry.unit_codes.length > 0 && (
          <div className="mt-1.5 flex flex-wrap items-center gap-1">
            {entry.unit_codes.slice(0, 4).map((u) => (
              <span
                key={u}
                className="inline-flex h-5 items-center rounded-md border border-white/[0.14] px-1.5 font-mono text-[12px] tabular-nums text-white"
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
