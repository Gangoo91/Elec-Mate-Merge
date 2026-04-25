import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Pill, type Tone } from '@/components/college/primitives';
import {
  useStudentPortfolio,
  type PortfolioSubmission,
  type SubmissionStatus,
  type IqaOutcome,
} from '@/hooks/useStudentPortfolio';
import { PortfolioSubmissionDrawer } from '@/components/college/sheets/PortfolioSubmissionDrawer';

/* ==========================================================================
   SectionPortfolio — apprentice-side portfolio submissions + IQA verdicts.
   Mobile-first, tap a submission to expand inline detail.
   ========================================================================== */

const STATUS_TONE: Record<SubmissionStatus, Tone> = {
  draft: 'cyan',
  submitted: 'blue',
  in_review: 'amber',
  under_review: 'amber',
  feedback_given: 'orange',
  resubmitted: 'blue',
  approved: 'emerald',
  signed_off: 'emerald',
  iqa_sampled: 'purple',
  iqa_verified: 'emerald',
  rejected: 'red',
  returned: 'orange',
};

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

const IQA_TONE: Record<NonNullable<IqaOutcome>, Tone> = {
  verified: 'emerald',
  not_verified: 'red',
  requires_action: 'amber',
};

const IQA_LABEL: Record<NonNullable<IqaOutcome>, string> = {
  verified: 'IQA verified',
  not_verified: 'IQA rejected',
  requires_action: 'IQA action',
};

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
}: {
  id: string;
  studentName: string;
  userId: string | null;
}) {
  const { submissions, items, requirements, rollUp, loading } = useStudentPortfolio(userId);
  const [openSubmission, setOpenSubmission] = useState<PortfolioSubmission | null>(null);

  if (!userId) {
    return (
      <section id={id} className="scroll-mt-6">
        <Header />
        <div className="mt-5 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-8 text-center">
          <p className="text-[12.5px] text-white/65 max-w-md mx-auto leading-relaxed">
            No linked apprentice account — connect this learner's app sign-in to see their
            portfolio submissions.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="scroll-mt-6">
      <Header />

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <StatCard
          label="Submissions"
          value={String(rollUp.total_submissions)}
          sub={`${rollUp.by_status.in_review + rollUp.by_status.submitted} pending`}
        />
        <StatCard
          label="Approved"
          value={String(rollUp.by_status.approved)}
          tone="emerald"
        />
        <StatCard
          label="IQA verified"
          value={String(rollUp.iqa_verified)}
          sub={`${rollUp.iqa_sampled} sampled`}
          tone={rollUp.iqa_requires_action > 0 ? 'amber' : 'emerald'}
        />
        <StatCard
          label="Evidence items"
          value={String(rollUp.total_items)}
          sub={`${rollUp.items_supervisor_verified} supervisor-verified`}
        />
      </div>

      {/* Tutor requirements panel — only show open ones */}
      {requirements.length > 0 && (
        <div className="mt-4 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Tutor-set evidence requirements
            </div>
            {rollUp.overdue_requirements > 0 && (
              <span className="inline-flex items-center h-5 px-1.5 rounded-md bg-red-500/[0.1] border border-red-500/30 text-[10px] font-semibold tracking-[0.06em] uppercase text-red-200">
                {rollUp.overdue_requirements} overdue
              </span>
            )}
          </div>
          <ul className="divide-y divide-white/[0.04]">
            {requirements.slice(0, 6).map((r) => {
              // due_date is `timestamp with time zone` — parse to Date so we
              // can compare reliably (string compare on ISO with TZ suffix
              // against a YYYY-MM-DD prefix gave wrong answers).
              const dueMs = r.due_date ? new Date(r.due_date).getTime() : null;
              const overdue =
                dueMs != null && dueMs < Date.now() && r.status !== 'completed';
              return (
                <li key={r.id} className="px-5 py-3 flex items-start gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      'mt-1.5 inline-block h-2 w-2 rounded-full flex-shrink-0',
                      r.status === 'completed' ? 'bg-emerald-400' :
                      overdue ? 'bg-red-400' :
                      r.is_mandatory ? 'bg-elec-yellow' : 'bg-white/30'
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] text-white">{r.title}</div>
                    <div className="mt-0.5 text-[10.5px] text-white/55 tabular-nums">
                      Need {r.quantity_required}
                      {r.due_date && (
                        <>
                          <span className="text-white/25 mx-1.5">·</span>
                          <span className={overdue ? 'text-red-300' : ''}>
                            Due {new Date(r.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                          </span>
                        </>
                      )}
                      {r.is_mandatory && (
                        <>
                          <span className="text-white/25 mx-1.5">·</span>
                          <span className="text-amber-300">Mandatory</span>
                        </>
                      )}
                    </div>
                  </div>
                  {r.status === 'completed' && (
                    <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">
                      ✓
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Submissions list */}
      <div className="mt-4">
        {loading && submissions.length === 0 ? (
          <Skeleton />
        ) : submissions.length === 0 ? (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-8 text-center">
            <p className="text-[12.5px] text-white/65 max-w-md mx-auto leading-relaxed">
              {studentName.split(' ')[0]} hasn't submitted any portfolio entries yet.
              They'll appear here as they go through the app.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {submissions.slice(0, 12).map((s) => (
              <SubmissionCard
                key={s.id}
                submission={s}
                itemsCount={items.length}
                onOpen={() => setOpenSubmission(s)}
              />
            ))}
            {submissions.length > 12 && (
              <div className="text-center text-[11px] text-white/45 tabular-nums pt-1">
                + {submissions.length - 12} more submissions
              </div>
            )}
          </div>
        )}
      </div>

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

function Header() {
  return (
    <div className="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Evidence portfolio
        </div>
        <h2 className="mt-1.5 text-xl sm:text-[26px] font-semibold text-white tracking-tight leading-tight">
          Portfolio
        </h2>
      </div>
    </div>
  );
}

function SubmissionCard({
  submission,
  itemsCount,
  onOpen,
}: {
  submission: PortfolioSubmission;
  itemsCount: number;
  onOpen: () => void;
}) {
  void itemsCount;
  const tone = STATUS_TONE[submission.status as SubmissionStatus] ?? 'cyan';
  const accent =
    submission.status === 'approved' ? 'bg-emerald-400/80' :
    submission.status === 'rejected' ? 'bg-red-400/80' :
    submission.status === 'in_review' ? 'bg-amber-400/80' :
    submission.status === 'returned' ? 'bg-orange-400/80' :
    submission.status === 'submitted' ? 'bg-blue-400/80' :
    'bg-cyan-400/60';
  const iqa = submission.iqa_outcome;

  return (
    <div className="relative bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.14] transition-colors">
      <span aria-hidden className={cn('absolute left-0 top-3 bottom-3 w-[3px] rounded-full', accent)} />
      <button
        type="button"
        onClick={onOpen}
        className="w-full text-left px-5 sm:px-6 py-4 touch-manipulation"
      >
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Pill tone={tone}>{STATUS_LABEL[submission.status as SubmissionStatus] ?? submission.status}</Pill>
              {submission.grade && (
                <span className="text-[11px] font-medium text-elec-yellow/85 tabular-nums">
                  {submission.grade}
                </span>
              )}
              {submission.iqa_sampled && (
                <span className="inline-flex items-center h-5 px-1.5 rounded-md bg-purple-500/[0.1] border border-purple-500/30 text-[10px] font-semibold tracking-[0.06em] uppercase text-purple-200">
                  IQA sampled
                </span>
              )}
              {iqa && <Pill tone={IQA_TONE[iqa]}>{IQA_LABEL[iqa]}</Pill>}
              {submission.action_required && (
                <span className="inline-flex items-center h-5 px-1.5 rounded-md bg-amber-500/[0.1] border border-amber-500/30 text-[10px] font-semibold tracking-[0.06em] uppercase text-amber-200">
                  Action required
                </span>
              )}
            </div>
            <div className="mt-1.5 flex items-center flex-wrap gap-x-2.5 gap-y-0.5 text-[11px] text-white/65 tabular-nums">
              <span>Submitted {formatRelative(submission.submitted_at)}</span>
              {submission.submission_count && submission.submission_count > 1 && (
                <>
                  <span className="text-white/25">·</span>
                  <span>Attempt {submission.submission_count}</span>
                </>
              )}
              {submission.reviewed_at && (
                <>
                  <span className="text-white/25">·</span>
                  <span>Reviewed {formatRelative(submission.reviewed_at)}</span>
                </>
              )}
            </div>
          </div>
          <span className="text-[14px] text-white/35 leading-none">→</span>
        </div>
      </button>
    </div>
  );
}

function StatCard({
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
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-4 py-3.5">
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
    <div className="space-y-2.5 animate-pulse">
      {[0, 1, 2].map((i) => (
        <div key={i} className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4">
          <div className="h-3 w-1/2 rounded bg-white/[0.06]" />
          <div className="mt-2 h-2 w-1/3 rounded bg-white/[0.04]" />
        </div>
      ))}
    </div>
  );
}
