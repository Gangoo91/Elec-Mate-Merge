import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import {
  useStudentPortfolio,
  type PortfolioSubmission,
  type SubmissionStatus,
  type IqaOutcome,
  type StudentPortfolio,
} from '@/hooks/useStudentPortfolio';
import { PortfolioSubmissionDrawer } from '@/components/college/sheets/PortfolioSubmissionDrawer';

/* ==========================================================================
   SectionPortfolio — apprentice-side portfolio submissions + IQA verdicts.
   Tap a submission to open the drawer.

   Hub language: heading, a four-figure strip, requirements card, and ONE
   submissions card with divided rows (each submission used to be its own
   card with a coloured spine — twelve of them was twelve rectangles).
   Colour only where it encodes state: red for returned/rejected/overdue,
   emerald for approved/signed-off/IQA-verified. Everything awaiting a
   tutor is volt text.

   `data` lets a parent that already runs `useStudentPortfolio` share the
   instance; when supplied the section's own hook is given a null id (its
   no-fetch path).
   ========================================================================== */

const STATUS_LABEL: Record<SubmissionStatus, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  in_review: 'In review',
  under_review: 'In review',
  feedback_given: 'Feedback given',
  resubmitted: 'Resubmitted',
  approved: 'Approved',
  signed_off: 'Signed off',
  iqa_sampled: 'IQA sampled',
  iqa_verified: 'IQA verified',
  rejected: 'Rejected',
  returned: 'Returned',
};

const GOOD_STATUS: ReadonlySet<string> = new Set(['approved', 'signed_off', 'iqa_verified']);
const BAD_STATUS: ReadonlySet<string> = new Set(['rejected', 'returned']);
const WAITING_STATUS: ReadonlySet<string> = new Set([
  'submitted',
  'resubmitted',
  'in_review',
  'under_review',
]);

const IQA_LABEL: Record<NonNullable<IqaOutcome>, string> = {
  verified: 'IQA verified',
  not_verified: 'IQA rejected',
  requires_action: 'IQA action',
};

const CHIP =
  'inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-semibold tabular-nums';
const CHIP_NEUTRAL = 'border-white/[0.14] bg-white/[0.06] text-white';
const CHIP_RED = 'border-red-400/30 bg-red-500/[0.08] text-red-300';
const CHIP_GOOD = 'border-emerald-400/30 bg-emerald-500/[0.08] text-emerald-300';
const CHIP_VOLT = 'border-elec-yellow/35 text-elec-yellow';

const CARD = cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE);

function formatRelative(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  const now = new Date();
  const days = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
}

export function SectionPortfolio({
  id,
  studentName,
  userId,
  data: shared,
}: {
  id: string;
  studentName: string;
  userId: string | null;
  data?: StudentPortfolio;
}) {
  const own = useStudentPortfolio(shared ? null : userId);
  const { submissions, requirements, rollUp, loading } = shared ?? own;
  const [openSubmission, setOpenSubmission] = useState<PortfolioSubmission | null>(null);
  const first = studentName.split(' ')[0];

  if (!userId) {
    return (
      <section id={id} className="scroll-mt-20 space-y-3">
        <HubSectionHeading>Portfolio</HubSectionHeading>
        <div className={cn(CARD, 'px-4 py-5 sm:px-5')}>
          <p className="text-[12.5px] leading-relaxed text-white">
            No linked apprentice account — connect this learner's app sign-in to see their
            portfolio submissions.
          </p>
        </div>
      </section>
    );
  }

  const waiting = submissions.filter((s) => WAITING_STATUS.has(s.status)).length;

  return (
    <section id={id} className="scroll-mt-20 space-y-3">
      <HubSectionHeading>Portfolio</HubSectionHeading>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
        <StatCell
          label="Submissions"
          value={String(rollUp.total_submissions)}
          sub={waiting > 0 ? `${waiting} awaiting review` : 'None awaiting review'}
          alert={waiting > 0}
        />
        <StatCell label="Approved" value={String(rollUp.by_status.approved)} good={rollUp.by_status.approved > 0} />
        <StatCell
          label="IQA verified"
          value={String(rollUp.iqa_verified)}
          sub={`${rollUp.iqa_sampled} sampled`}
          good={rollUp.iqa_verified > 0}
        />
        <StatCell
          label="Evidence items"
          value={String(rollUp.total_items)}
          sub={`${rollUp.items_supervisor_verified} supervisor-verified`}
        />
      </div>

      {/* Tutor-set requirements */}
      {requirements.length > 0 && (
        <div className={CARD}>
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.10] px-4 py-3 sm:px-5">
            <div className="text-[13px] font-semibold text-white">Evidence requirements you set</div>
            {rollUp.overdue_requirements > 0 && (
              <span className="text-[11px] font-semibold tabular-nums text-red-300">
                {rollUp.overdue_requirements} overdue
              </span>
            )}
          </div>
          <ul className="divide-y divide-white/[0.10]">
            {requirements.slice(0, 6).map((r) => {
              // due_date is `timestamp with time zone` — parse to Date so we
              // can compare reliably (string compare on ISO with TZ suffix
              // against a YYYY-MM-DD prefix gave wrong answers).
              const dueMs = r.due_date ? new Date(r.due_date).getTime() : null;
              const done = r.status === 'completed';
              const overdue = dueMs != null && dueMs < Date.now() && !done;
              return (
                <li key={r.id} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                  <span
                    aria-hidden
                    className={cn(
                      'h-8 w-[3px] shrink-0 rounded-full',
                      overdue ? 'bg-red-400' : r.is_mandatory && !done ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <div className={cn('text-[13px] font-medium text-white', done && 'line-through opacity-70')}>
                      {r.title}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[11px] tabular-nums text-white">
                      <span>Need {r.quantity_required}</span>
                      {r.due_date && (
                        <span className={cn(overdue && 'font-semibold text-red-300')}>
                          {overdue ? 'Overdue · ' : 'Due '}
                          {new Date(r.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </span>
                      )}
                      {r.is_mandatory && <span className="font-semibold text-elec-yellow">Mandatory</span>}
                    </div>
                  </div>
                  {done && <span className="text-[11px] font-semibold text-emerald-300">Done</span>}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Submissions */}
      {loading && submissions.length === 0 ? (
        <Skeleton />
      ) : submissions.length === 0 ? (
        <div className={cn(CARD, 'px-4 py-5 sm:px-5')}>
          <p className="text-[12.5px] leading-relaxed text-white">
            {first} hasn't submitted any portfolio entries yet. They appear here as they come
            through the app.
          </p>
        </div>
      ) : (
        <div className={CARD}>
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.10] px-4 py-3 sm:px-5">
            <div className="text-[13px] font-semibold text-white">Submissions</div>
            <div className="text-[11px] tabular-nums text-white">{submissions.length} total</div>
          </div>
          <ul className="divide-y divide-white/[0.10]">
            {submissions.slice(0, 12).map((s) => (
              <SubmissionRow key={s.id} submission={s} onOpen={() => setOpenSubmission(s)} />
            ))}
          </ul>
          {submissions.length > 12 && (
            <div className="border-t border-white/[0.10] px-4 py-2.5 text-center text-[11px] tabular-nums text-white">
              {submissions.length - 12} more in the learner's app
            </div>
          )}
        </div>
      )}

      <PortfolioSubmissionDrawer
        open={openSubmission !== null}
        onOpenChange={(o) => {
          if (!o) setOpenSubmission(null);
        }}
        studentUserId={userId}
        studentName={studentName}
        submission={openSubmission}
      />
    </section>
  );
}

function SubmissionRow({
  submission,
  onOpen,
}: {
  submission: PortfolioSubmission;
  onOpen: () => void;
}) {
  const status = submission.status as SubmissionStatus;
  const good = GOOD_STATUS.has(status);
  const bad = BAD_STATUS.has(status);
  const waiting = WAITING_STATUS.has(status);
  const iqa = submission.iqa_outcome;

  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
      >
        <span
          aria-hidden
          className={cn(
            'h-8 w-[3px] shrink-0 rounded-full',
            bad ? 'bg-red-400' : waiting ? 'bg-elec-yellow' : 'bg-white/[0.25]'
          )}
        />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-1.5">
            <span className={cn(CHIP, bad ? CHIP_RED : good ? CHIP_GOOD : waiting ? CHIP_VOLT : CHIP_NEUTRAL)}>
              {STATUS_LABEL[status] ?? submission.status}
            </span>
            {submission.grade && (
              <span className="text-[11px] font-semibold tabular-nums text-white">{submission.grade}</span>
            )}
            {submission.iqa_sampled && !iqa && <span className={cn(CHIP, CHIP_NEUTRAL)}>IQA sampled</span>}
            {iqa && (
              <span
                className={cn(
                  CHIP,
                  iqa === 'verified' ? CHIP_GOOD : iqa === 'not_verified' ? CHIP_RED : CHIP_VOLT
                )}
              >
                {IQA_LABEL[iqa]}
              </span>
            )}
            {submission.action_required && (
              <span className="text-[11px] font-semibold text-elec-yellow">Action required</span>
            )}
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-x-2 text-[11px] tabular-nums text-white">
            <span>Submitted {formatRelative(submission.submitted_at)}</span>
            {submission.submission_count && submission.submission_count > 1 && (
              <span>Attempt {submission.submission_count}</span>
            )}
            {submission.reviewed_at && <span>Reviewed {formatRelative(submission.reviewed_at)}</span>}
          </span>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
      </button>
    </li>
  );
}

function StatCell({
  label,
  value,
  sub,
  alert,
  good,
}: {
  label: string;
  value: string;
  sub?: string;
  alert?: boolean;
  good?: boolean;
}) {
  return (
    <div className={cn(CARD, 'px-4 py-3.5')}>
      <div className="text-[12px] font-medium text-white">{label}</div>
      <div
        className={cn(
          'mt-1 text-[22px] font-semibold leading-none tabular-nums tracking-tight',
          alert ? 'text-elec-yellow' : good ? 'text-emerald-300' : 'text-white'
        )}
      >
        {value}
      </div>
      {sub && <div className="mt-1 text-[11px] tabular-nums text-white">{sub}</div>}
    </div>
  );
}

function Skeleton() {
  return (
    <div className={cn(CARD, 'space-y-3 px-4 py-4 animate-pulse sm:px-5')}>
      {[0, 1, 2].map((i) => (
        <div key={i}>
          <div className="h-3 w-1/2 rounded bg-white/[0.08]" />
          <div className="mt-2 h-2 w-1/3 rounded bg-white/[0.05]" />
        </div>
      ))}
    </div>
  );
}
