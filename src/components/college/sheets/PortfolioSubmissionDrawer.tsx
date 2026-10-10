import { useEffect, useMemo, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { AiUseRecord } from '@/components/college/ui/AiUseRecord';
import { FormSheet } from '@/components/forms/FormSheet';
import { textareaCn } from '@/components/forms/fieldStyles';
import { COLLEGE_BTN_PRIMARY, chipCn } from '@/components/college/ui/CollegeUi';
import {
  usePortfolioCommentThread as usePortfolioComments,
  type PortfolioCommentRow as PortfolioComment,
} from '@/hooks/portfolio/usePortfolioComments';
import { AiAssessorPanel } from './AiAssessorPanel';
import { AcDecisionSheet } from '@/components/assessment/AcDecisionSheet';
import { usePortfolioAcState, aiProvenanceLine } from '@/hooks/portfolio/usePortfolioAcState';
import {
  useSubmissionSignOffChain,
  type PortfolioSignature,
} from '@/hooks/useSubmissionSignOffChain';
import {
  type PortfolioSubmission,
  type SubmissionStatus,
  type IqaOutcome,
} from '@/hooks/useStudentPortfolio';
import { keyLabel } from '@/lib/college/labels';

/* ==========================================================================
   PortfolioSubmissionDrawer — one submission for staff: what was sent, the
   learner's declaration and the fingerprints of what they signed, the
   decisions recorded against it, the sign-off chain, the AI draft, and a
   live comment thread with the learner.

   Hub language (7 Oct): FormSheet wide; two columns on desktop (record on
   the left, conversation on the right), one on a phone. Plain white
   headings, hairline separators, colour only where it encodes state.

   The portfolio model (ELE-1864/1865/1875/1893):
     • an item-level submission may have category_id null — never assume one
     • decisions are per criterion in portfolio_assessment_decisions. "Record
       decisions" here opens the one decision sheet (AcDecisionSheet →
       record_ac_decisions) on the criteria claimed on what was sent, filed
       against this submission (ELE-1867 / ELE-1863). No whole-submission grade.
     • the AI draft is held, not written onto the submission, until a decision
       is recorded with it (ELE-1926).
     • the learner's declaration is a portfolio_signatures row with
       signature_type 'declaration', bound to each item's content hash and
       file SHA-256s (signed_hashes, bundle_hash)
     • portfolio_audit_events is readable by assessing staff
   ========================================================================== */

type StateTone = 'good' | 'bad' | 'volt' | 'plain';

const STATUS_TONE: Record<SubmissionStatus, StateTone> = {
  draft: 'plain',
  submitted: 'volt',
  in_review: 'volt',
  under_review: 'volt',
  feedback_given: 'plain',
  resubmitted: 'volt',
  approved: 'good',
  signed_off: 'good',
  iqa_sampled: 'plain',
  iqa_verified: 'good',
  rejected: 'bad',
  returned: 'bad',
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

const IQA_TONE: Record<NonNullable<IqaOutcome>, StateTone> = {
  verified: 'good',
  not_verified: 'bad',
  requires_action: 'volt',
};

const IQA_LABEL: Record<NonNullable<IqaOutcome>, string> = {
  verified: 'IQA verified',
  not_verified: 'IQA rejected',
  requires_action: 'IQA action',
};

const TONE_CHIP: Record<StateTone, string> = {
  good: 'border-emerald-400/30 bg-emerald-500/[0.08] text-emerald-300',
  bad: 'border-red-400/30 bg-red-500/[0.08] text-red-300',
  volt: 'border-elec-yellow/35 text-elec-yellow',
  plain: 'border-white/[0.14] text-white',
};

const DECISION_LABEL: Record<string, { label: string; tone: StateTone }> = {
  passed: { label: 'Passed', tone: 'good' },
  referred: { label: 'Needs more', tone: 'volt' },
  not_yet: { label: 'Not yet', tone: 'bad' },
};

const H3 = 'text-[15px] font-semibold tracking-tight text-white';
const SECTION = 'space-y-3 border-t border-white/[0.08] pt-5';

function StateChip({ tone, children }: { tone: StateTone; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center rounded-full border px-2.5 text-[12px] font-semibold',
        TONE_CHIP[tone]
      )}
    >
      {children}
    </span>
  );
}

function formatDateTime(iso: string | null): string {
  if (!iso) return 'Not yet';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatRelative(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/** A SHA-256 shortened for reading: first 10 and last 4 hex characters. */
function shortHash(h: string | null | undefined): string | null {
  if (!h) return null;
  return h.length > 16 ? `${h.slice(0, 10)}…${h.slice(-4)}` : h;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentUserId: string | null;
  studentName: string;
  submission: PortfolioSubmission | null;
  /** Called after a write to portfolio_submissions (e.g. AI Apply) so the
   * parent can re-fetch immediately rather than wait for realtime. */
  onSubmissionUpdated?: () => void;
}

export function PortfolioSubmissionDrawer({
  open,
  onOpenChange,
  studentUserId,
  studentName,
  submission,
  onSubmissionUpdated,
}: Props) {
  const { toast } = useToast();
  const { comments, loading, post, toggleResolved, remove } = usePortfolioComments({
    studentUserId,
    submissionId: submission?.id ?? null,
  });

  const [deciding, setDeciding] = useState(false);
  const [decisionsVersion, setDecisionsVersion] = useState(0);
  const [draft, setDraft] = useState('');
  const [requiresAction, setRequiresAction] = useState(false);
  const [posting, setPosting] = useState(false);
  const [currentUid, setCurrentUid] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const threadEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    void supabase.auth.getUser().then(({ data }) => {
      if (!cancelled) setCurrentUid(data.user?.id ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Reset on open
  useEffect(() => {
    if (open) {
      setDraft('');
      setRequiresAction(false);
    }
  }, [open, submission?.id]);

  // Scroll to bottom when new comments arrive
  useEffect(() => {
    if (open && threadEndRef.current) {
      threadEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [comments.length, open]);

  const threaded = useMemo(() => buildThreads(comments), [comments]);

  if (!submission) return null;

  const first = studentName.split(' ')[0] || 'the learner';
  const statusLabel = STATUS_LABEL[submission.status as SubmissionStatus] ?? submission.status;
  const statusTone = STATUS_TONE[submission.status as SubmissionStatus] ?? 'plain';

  const handleSend = async () => {
    if (!draft.trim() || posting) return;
    setPosting(true);
    try {
      await post({
        content: draft.trim(),
        requires_action: requiresAction,
      });
      setDraft('');
      setRequiresAction(false);
    } catch (e) {
      toast({
        title: 'Could not post comment',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setPosting(false);
    }
  };

  const handleResolve = async (id: string, resolved: boolean) => {
    try {
      await toggleResolved(id, resolved);
    } catch (e) {
      toast({
        title: 'Could not update',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm('Delete this comment? It will be removed for everyone.');
    if (!ok) return;
    try {
      await remove(id);
    } catch (e) {
      toast({
        title: 'Could not delete',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    }
  };

  const hasFeedback =
    submission.assessor_feedback ||
    submission.strengths_noted ||
    submission.areas_for_improvement ||
    submission.iqa_feedback ||
    submission.action_required;

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Portfolio submission"
      title={`${studentName} · ${statusLabel}`}
      description={`Sent ${formatDateTime(submission.submitted_at)}`}
      footer={
        <div className="w-full">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={`Reply to ${first}`}
              rows={2}
              aria-label={`Reply to ${first}`}
              className={cn(textareaCn, 'min-h-[48px] max-h-[160px] flex-1 py-2.5')}
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!draft.trim() || posting || !studentUserId}
              className={cn(COLLEGE_BTN_PRIMARY, 'h-12 shrink-0 px-5')}
            >
              {posting ? 'Sending…' : 'Send'}
            </button>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <button
              type="button"
              aria-pressed={requiresAction}
              onClick={() => setRequiresAction((v) => !v)}
              className={cn(chipCn(requiresAction), 'h-11 px-3.5 text-[12.5px]')}
            >
              {requiresAction ? 'Needs action: on' : 'Mark as needing action'}
            </button>
            <span className="hidden text-[12px] text-white sm:inline">
              {first} sees this in their portfolio straight away. ⌘ + Enter sends.
            </span>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        {/* ── The record ─────────────────────────────────────────── */}
        <div className="min-w-0 space-y-5">
          <section className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <StateChip tone={statusTone}>{statusLabel}</StateChip>
              {submission.grade && <StateChip tone="plain">{submission.grade}</StateChip>}
              {submission.iqa_sampled && <StateChip tone="plain">IQA sampled</StateChip>}
              {submission.iqa_outcome && (
                <StateChip tone={IQA_TONE[submission.iqa_outcome]}>
                  {IQA_LABEL[submission.iqa_outcome]}
                </StateChip>
              )}
              {submission.action_required && <StateChip tone="volt">Action required</StateChip>}
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
              <Detail label="Sent" value={formatDateTime(submission.submitted_at)} />
              <Detail label="Reviewed" value={formatDateTime(submission.reviewed_at)} />
              <Detail
                label="Attempt"
                value={submission.submission_count ? String(submission.submission_count) : '1'}
              />
              <Detail label="Last feedback" value={formatDateTime(submission.last_feedback_at)} />
            </dl>
          </section>

          <EvidenceAndDeclaration submissionId={submission.id} />

          <DecisionsBlock
            key={decisionsVersion}
            submissionId={submission.id}
            first={first}
            onRecord={studentUserId ? () => setDeciding(true) : undefined}
          />

          {hasFeedback && (
            <section className={SECTION}>
              <h3 className={H3}>Feedback</h3>
              {aiProvenanceLine(
                submission.feedback_source,
                submission.feedback_confirmed_by_name,
                submission.feedback_confirmed_at
              ) && (
                <p className="text-[12.5px] text-white">
                  {aiProvenanceLine(
                    submission.feedback_source,
                    submission.feedback_confirmed_by_name,
                    submission.feedback_confirmed_at
                  )}
                </p>
              )}
              <div className="space-y-4">
                {submission.assessor_feedback && (
                  <FeedbackBlock label="Assessor feedback" text={submission.assessor_feedback} />
                )}
                {submission.strengths_noted && (
                  <FeedbackBlock label="Strengths" text={submission.strengths_noted} />
                )}
                {submission.areas_for_improvement && (
                  <FeedbackBlock
                    label="Areas for development"
                    text={submission.areas_for_improvement}
                  />
                )}
                {submission.action_required && (
                  <FeedbackBlock label="Action required" text={submission.action_required} />
                )}
                {submission.iqa_feedback && (
                  <FeedbackBlock label="IQA feedback" text={submission.iqa_feedback} />
                )}
              </div>
            </section>
          )}

          {/* Sign-off chain — who signed, when, and in what role */}
          <SignOffChainBlock submissionId={submission.id} />

          {/* AI draft — drafts feedback the human reviews before copying in */}
          <section className={SECTION}>
            <AiAssessorPanel
              submissionId={submission.id}
              learnerId={studentUserId}
              studentName={studentName}
              hasExistingFeedback={Boolean(
                submission.assessor_feedback ||
                submission.strengths_noted ||
                submission.areas_for_improvement
              )}
              onApplied={() => {
                onSubmissionUpdated?.();
                if (studentUserId) setDeciding(true);
              }}
            />
          </section>

          <AuditTrail submissionId={submission.id} />
        </div>

        {/* ── The conversation ───────────────────────────────────── */}
        <section className="min-w-0 space-y-3 border-t border-white/[0.08] pt-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className={H3}>Conversation with {first}</h3>
            {comments.length > 0 && (
              <span className="text-[12px] tabular-nums text-white">
                {comments.length} {comments.length === 1 ? 'message' : 'messages'}
              </span>
            )}
          </div>

          {loading && comments.length === 0 ? (
            <ThreadSkeleton />
          ) : comments.length === 0 ? (
            <p className="text-[13px] leading-relaxed text-white">
              No messages yet. Anything you write below appears in {first}'s app straight away.
            </p>
          ) : (
            <div className="divide-y divide-white/[0.06]">
              {threaded.map((c) => (
                <CommentBubble
                  key={c.id}
                  comment={c}
                  currentUid={currentUid}
                  onResolve={handleResolve}
                  onDelete={handleDelete}
                />
              ))}
              <div ref={threadEndRef} />
            </div>
          )}
        </section>
      </div>
      {deciding && studentUserId && (
        <DecideFromSubmission
          submissionId={submission.id}
          learnerId={studentUserId}
          learnerName={studentName}
          onClose={() => setDeciding(false)}
          onRecorded={() => {
            setDecisionsVersion((v) => v + 1);
            onSubmissionUpdated?.();
          }}
        />
      )}
    </FormSheet>
  );
}

/* ────────────────────────────────────────────────────────
   Record decisions straight from the drawer (ELE-1863 / ELE-1867): the
   criteria claimed on the items that were sent, their evidence ticked, the
   decision filed against this submission. Mounted only when opened, so the
   drawer does not read the whole criteria list just to be looked at.
   ──────────────────────────────────────────────────────── */

/**
 * The evidence a submission carries (ELE-1863): its portfolio_submission_items,
 * or, for a submission sent as a whole category before those existed, the
 * learner's items in that category (the queue's own fallback).
 */
async function submissionItemIds(
  submissionId: string,
  known?: string[]
): Promise<{ ids: string[]; legacy: boolean }> {
  let ids = known;
  if (!ids) {
    const { data: links } = await supabase
      .from('portfolio_submission_items' as never)
      .select('portfolio_item_id')
      .eq('submission_id', submissionId);
    ids = ((links ?? []) as Array<{ portfolio_item_id: string }>).map((l) => l.portfolio_item_id);
  }
  if (ids.length > 0) return { ids, legacy: false };
  const { data: sub } = await supabase
    .from('portfolio_submissions')
    .select('user_id, category_id')
    .eq('id', submissionId)
    .maybeSingle();
  const row = sub as { user_id: string; category_id: string | null } | null;
  if (!row?.category_id) return { ids: [], legacy: false };
  const { data: old } = await supabase
    .from('portfolio_items')
    .select('id')
    .eq('user_id', row.user_id)
    .eq('category', row.category_id)
    .limit(100);
  const legacyIds = ((old ?? []) as Array<{ id: string }>).map((r) => r.id);
  return { ids: legacyIds, legacy: legacyIds.length > 0 };
}

function DecideFromSubmission({
  submissionId,
  learnerId,
  learnerName,
  onClose,
  onRecorded,
}: {
  submissionId: string;
  learnerId: string;
  learnerName: string;
  onClose: () => void;
  onRecorded: () => void;
}) {
  const { rows, loading, recordDecisions } = usePortfolioAcState(learnerId);
  const [itemIds, setItemIds] = useState<string[] | null>(null);
  const [claimed, setClaimed] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { ids } = await submissionItemIds(submissionId);
      let keys = new Set<string>();
      if (ids.length) {
        const { data: crit } = await supabase
          .from('portfolio_item_criteria' as never)
          .select('unit_code, ac_code, source')
          .in('portfolio_item_id', ids)
          .neq('source', 'ai_suggested');
        keys = new Set(
          ((crit ?? []) as Array<{ unit_code: string; ac_code: string }>).map(
            (c) => `${c.unit_code}:${c.ac_code}`
          )
        );
      }
      if (!cancelled) {
        setItemIds(ids);
        setClaimed(keys);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [submissionId]);

  // Undecided first: what was sent and is still waiting. Already passed ones
  // are left out so a resend does not re-pass what stands.
  const target = useMemo(
    () =>
      rows.filter(
        (r) =>
          claimed.has(`${r.unit_code}:${r.ac_code}`) &&
          r.state !== 'passed' &&
          r.state !== 'iqa_confirmed'
      ),
    [rows, claimed]
  );
  const ready = !loading && itemIds !== null;

  if (ready && target.length === 0) {
    return (
      <FormSheet
        open
        onOpenChange={(o) => !o && onClose()}
        width="wide"
        eyebrow={`Record a decision · ${learnerName}`}
        title="Nothing waiting on this submission"
        description="Every criterion claimed on what was sent already has a pass, or nothing was claimed."
      >
        <p className="text-[13.5px] leading-relaxed text-white">
          To decide on other criteria, open Assess criteria in{' '}
          {learnerName.split(' ')[0] || 'their'} Student 360.
        </p>
      </FormSheet>
    );
  }

  return (
    <AcDecisionSheet
      open={ready}
      onOpenChange={(o) => !o && onClose()}
      learnerId={learnerId}
      learnerName={learnerName}
      rows={target}
      submissionId={submissionId}
      initialEvidenceIds={itemIds ?? []}
      record={recordDecisions}
      onRecorded={onRecorded}
    />
  );
}

/* ────────────────────────────────────────────────────────
   Open the drawer from anywhere with just a submission id (Work Queue,
   inbox). Loads the row and the learner's name, then renders the drawer.
   ──────────────────────────────────────────────────────── */

export function SubmissionDrawerById({
  submissionId,
  onOpenChange,
  onChanged,
}: {
  submissionId: string | null;
  onOpenChange: (open: boolean) => void;
  onChanged?: () => void;
}) {
  const [row, setRow] = useState<{ sub: PortfolioSubmission; userId: string; name: string } | null>(
    null
  );
  const [version, setVersion] = useState(0);
  useEffect(() => {
    if (!submissionId) {
      setRow(null);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('portfolio_submissions')
        .select(
          'id, user_id, qualification_id, category_id, status, submitted_at, reviewed_at, signed_off_at, signed_off_by, assessor_id, assessor_feedback, grade, action_required, strengths_noted, areas_for_improvement, iqa_sampled, iqa_sampled_at, iqa_sampled_by, iqa_verified_at, iqa_verified_by, iqa_feedback, iqa_outcome, submission_count, last_feedback_at, created_at, updated_at, feedback_source, feedback_confirmed_at, feedback_confirmed_by_name' as never
        )
        .eq('id', submissionId)
        .maybeSingle();
      const sub = data as unknown as (PortfolioSubmission & { user_id: string }) | null;
      if (!sub) {
        if (!cancelled) setRow(null);
        return;
      }
      const { data: prof } = await supabase
        .from('public_profiles')
        .select('full_name')
        .eq('id', sub.user_id)
        .maybeSingle();
      if (!cancelled)
        setRow({
          sub,
          userId: sub.user_id,
          name: (prof as { full_name: string | null } | null)?.full_name ?? 'Learner',
        });
    })();
    return () => {
      cancelled = true;
    };
  }, [submissionId, version]);

  return (
    <PortfolioSubmissionDrawer
      open={!!submissionId && !!row}
      onOpenChange={onOpenChange}
      studentUserId={row?.userId ?? null}
      studentName={row?.name ?? ''}
      submission={row?.sub ?? null}
      onSubmissionUpdated={() => {
        setVersion((v) => v + 1);
        onChanged?.();
      }}
    />
  );
}

/* ──────────────────────────────────────────────────────── */

function CommentBubble({
  comment,
  currentUid,
  onResolve,
  onDelete,
  nested = false,
}: {
  comment: PortfolioComment & { replies?: PortfolioComment[] };
  currentUid: string | null;
  onResolve: (id: string, resolved: boolean) => void;
  onDelete: (id: string) => void;
  nested?: boolean;
}) {
  const isStaff =
    comment.author_role === 'tutor' ||
    comment.author_role === 'assessor' ||
    comment.author_role === 'iqa' ||
    comment.author_role === 'admin';
  // Delete RLS now allows author OR learner (the comment.user_id) — only show
  // the button to those who will actually be able to perform it.
  const canDelete =
    !!currentUid && (comment.author_id === currentUid || comment.user_id === currentUid);

  return (
    <div className={cn(nested ? 'pt-3' : 'py-3.5')}>
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-semibold tabular-nums',
            isStaff ? 'bg-white/[0.1] text-white' : 'bg-elec-yellow text-black'
          )}
        >
          {comment.author_initials ?? '·'}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-[13px] font-semibold text-white">
              {comment.author_name ?? 'Unknown'}
            </span>
            {comment.author_role && (
              <span className="text-[12px] text-white">{keyLabel(comment.author_role)}</span>
            )}
            <span className="text-[12px] tabular-nums text-white">
              {formatRelative(comment.created_at)}
            </span>
            {comment.requires_action && !comment.is_resolved && (
              <span className="text-[12px] font-semibold text-elec-yellow">Needs action</span>
            )}
            {comment.is_resolved && (
              <span className="text-[12px] font-semibold text-emerald-300">
                Resolved{comment.resolved_by_name ? ` by ${comment.resolved_by_name}` : ''}
              </span>
            )}
          </div>
          <p className="mt-1 whitespace-pre-line text-[13.5px] leading-relaxed text-white">
            {comment.content}
          </p>
          {(comment.requires_action || canDelete) && (
            <div className="mt-1.5 flex items-center gap-1">
              {comment.requires_action && (
                <button
                  type="button"
                  onClick={() => onResolve(comment.id, !comment.is_resolved)}
                  className="inline-flex h-11 items-center px-1 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
                >
                  {comment.is_resolved ? 'Reopen' : 'Mark resolved'}
                </button>
              )}
              {canDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(comment.id)}
                  className="ml-2 inline-flex h-11 items-center px-1 text-[12.5px] font-medium text-white hover:text-red-300 touch-manipulation"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 mt-2 space-y-1 border-l border-white/[0.08] pl-3">
          {comment.replies.map((r) => (
            <CommentBubble
              key={r.id}
              comment={r}
              currentUid={currentUid}
              onResolve={onResolve}
              onDelete={onDelete}
              nested
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function buildThreads(
  flat: PortfolioComment[]
): (PortfolioComment & { replies: PortfolioComment[] })[] {
  const byId = new Map<string, PortfolioComment & { replies: PortfolioComment[] }>();
  for (const c of flat) byId.set(c.id, { ...c, replies: [] });
  const roots: (PortfolioComment & { replies: PortfolioComment[] })[] = [];
  for (const c of flat) {
    const node = byId.get(c.id)!;
    if (c.parent_id && byId.has(c.parent_id)) {
      byId.get(c.parent_id)!.replies.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[12px] font-medium text-white">{label}</dt>
      <dd className="mt-0.5 text-[13.5px] font-semibold tabular-nums text-white">{value}</dd>
    </div>
  );
}

function FeedbackBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[12px] font-semibold text-white">{label}</p>
      <p className="mt-1 whitespace-pre-line text-[13.5px] leading-relaxed text-white">{text}</p>
    </div>
  );
}

function ThreadSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[0, 1].map((i) => (
        <div key={i} className="flex gap-3">
          <div className="h-8 w-8 flex-shrink-0 rounded-full bg-white/[0.06]" />
          <div className="flex-1 space-y-2">
            <div className="h-2.5 w-1/3 rounded bg-white/[0.06]" />
            <div className="h-2 w-2/3 rounded bg-white/[0.04]" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Evidence + declaration (ELE-1865 / ELE-1875 / ELE-1893).

   What was sent (portfolio_submission_items → portfolio_items), the
   learner's declaration (portfolio_signatures, signature_type
   'declaration') and the fingerprints they signed. When an item's
   content hash today differs from the one in the declaration, it has been
   edited since it was signed, and we say so.
   ──────────────────────────────────────────────────────── */

interface SentItem {
  id: string;
  title: string;
  content_hash: string | null;
  files: { name: string; sha256: string | null }[];
  /** ELE-2048: AI drafted words in this item, and the record of it. */
  ai_assisted: boolean;
  ai_use: unknown;
  /** ELE-1863: the criteria the learner claimed on this item, with where each stands now. */
  criteria: { unit_code: string; ac_code: string; decision: string | null }[];
}

interface Declaration {
  id: string;
  signer_id: string | null;
  signer_name: string | null;
  signature_text: string | null;
  signature_image: string | null;
  declaration_text: string | null;
  signed_at: string | null;
  bundle_hash: string | null;
  signed: Map<
    string,
    { content_hash: string | null; files: { name: string; sha256: string | null }[] }
  >;
}

function filesFrom(storage: unknown): { name: string; sha256: string | null }[] {
  if (!Array.isArray(storage)) return [];
  return storage.map((f, i) => {
    const o = (f ?? {}) as Record<string, unknown>;
    const url = typeof o.url === 'string' ? o.url : '';
    const name =
      (typeof o.name === 'string' && o.name) ||
      (url ? decodeURIComponent(url.split('?')[0].split('/').pop() ?? '') : '') ||
      `File ${i + 1}`;
    return { name, sha256: typeof o.sha256 === 'string' ? o.sha256 : null };
  });
}

function useSubmissionEvidence(submissionId: string) {
  const [state, setState] = useState<{
    loading: boolean;
    items: SentItem[];
    declaration: Declaration | null;
    /** The items were found by the old whole-category match, not the junction. */
    legacy?: boolean;
  }>({ loading: true, items: [], declaration: null });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setState((s) => ({ ...s, loading: true }));
      const [{ data: links }, { data: decls }] = await Promise.all([
        supabase
          .from('portfolio_submission_items' as never)
          .select('portfolio_item_id')
          .eq('submission_id', submissionId),
        supabase
          .from('portfolio_signatures')
          .select(
            'id, signer_id, signature_text, signature_image, declaration_text, signed_at, signed_hashes, bundle_hash'
          )
          .eq('submission_id', submissionId)
          .eq('signature_type', 'declaration')
          .order('signed_at', { ascending: false })
          .limit(1),
      ]);
      const { ids, legacy } = await submissionItemIds(
        submissionId,
        ((links ?? []) as Array<{ portfolio_item_id: string }>).map((l) => l.portfolio_item_id)
      );
      let items: SentItem[] = [];
      if (ids.length > 0) {
        const [{ data: rows }, { data: crit }] = await Promise.all([
          supabase
            .from('portfolio_items')
            .select('id, user_id, title, content_hash, storage_urls, ai_assisted, ai_use')
            .in('id', ids),
          supabase
            .from('portfolio_item_criteria' as never)
            .select('portfolio_item_id, unit_code, ac_code')
            .in('portfolio_item_id', ids)
            .neq('source', 'ai_suggested'),
        ]);
        const typed = (rows ?? []) as unknown as Array<{
          id: string;
          user_id: string;
          title: string | null;
          content_hash: string | null;
          storage_urls: unknown;
          ai_assisted: boolean | null;
          ai_use: unknown;
        }>;
        const claims = (crit ?? []) as unknown as Array<{
          portfolio_item_id: string;
          unit_code: string;
          ac_code: string;
        }>;
        // Where each claimed criterion stands now: the current decision, if any.
        const decided = new Map<string, string>();
        const learner = typed[0]?.user_id;
        if (learner && claims.length > 0) {
          const { data: decs } = await supabase
            .from('portfolio_assessment_decisions' as never)
            .select('unit_code, ac_code, decision, decided_at')
            .eq('learner_id', learner)
            .is('superseded_at', null)
            .in('unit_code', [...new Set(claims.map((c) => c.unit_code))]);
          // A decision made before this submission was sent is history: the
          // learner sent the criterion again, so it is waiting, not "needs more".
          const { data: sub } = await supabase
            .from('portfolio_submissions')
            .select('submitted_at, created_at')
            .eq('id', submissionId)
            .maybeSingle();
          const sentAt =
            (sub as { submitted_at: string | null; created_at: string } | null)?.submitted_at ??
            (sub as { created_at: string } | null)?.created_at;
          for (const d of (decs ?? []) as unknown as Array<{
            unit_code: string;
            ac_code: string;
            decision: string;
            decided_at: string;
          }>) {
            if (d.decision !== 'passed' && sentAt && Date.parse(d.decided_at) < Date.parse(sentAt)) continue;
            decided.set(`${d.unit_code}:${d.ac_code}`, d.decision);
          }
        }
        items = typed.map((r) => ({
          id: r.id,
          title: r.title ?? 'Untitled evidence',
          content_hash: r.content_hash,
          files: filesFrom(r.storage_urls),
          ai_assisted: !!r.ai_assisted,
          ai_use: r.ai_use ?? null,
          criteria: claims
            .filter((c) => c.portfolio_item_id === r.id)
            .sort((a, b) =>
              `${a.unit_code}:${a.ac_code}`.localeCompare(
                `${b.unit_code}:${b.ac_code}`,
                undefined,
                { numeric: true }
              )
            )
            .map((c) => ({
              unit_code: c.unit_code,
              ac_code: c.ac_code,
              decision: decided.get(`${c.unit_code}:${c.ac_code}`) ?? null,
            })),
        }));
      }

      let declaration: Declaration | null = null;
      const d = (
        (decls ?? []) as unknown as Array<{
          id: string;
          signer_id: string | null;
          signature_text: string | null;
          signature_image: string | null;
          declaration_text: string | null;
          signed_at: string | null;
          signed_hashes: unknown;
          bundle_hash: string | null;
        }>
      )[0];
      if (d) {
        let signerName: string | null = null;
        if (d.signer_id) {
          const { data: prof } = await supabase
            .from('public_profiles')
            .select('full_name')
            .eq('id', d.signer_id)
            .maybeSingle();
          signerName = (prof as { full_name: string | null } | null)?.full_name ?? null;
        }
        const signed = new Map<
          string,
          { content_hash: string | null; files: { name: string; sha256: string | null }[] }
        >();
        if (Array.isArray(d.signed_hashes)) {
          for (const h of d.signed_hashes as Array<Record<string, unknown>>) {
            if (typeof h.item_id !== 'string') continue;
            signed.set(h.item_id, {
              content_hash: typeof h.content_hash === 'string' ? h.content_hash : null,
              files: filesFrom(h.files),
            });
          }
        }
        declaration = {
          id: d.id,
          signer_id: d.signer_id,
          signer_name: signerName,
          signature_text: d.signature_text,
          signature_image: d.signature_image,
          declaration_text: d.declaration_text,
          signed_at: d.signed_at,
          bundle_hash: d.bundle_hash,
          signed,
        };
      }
      if (!cancelled) setState({ loading: false, items, declaration, legacy });
    })();
    return () => {
      cancelled = true;
    };
  }, [submissionId]);

  return state;
}

function Hash({ value }: { value: string | null | undefined }) {
  const short = shortHash(value);
  if (!short) return <span className="text-[12px] text-white">No fingerprint</span>;
  return (
    <code title={value ?? undefined} className="font-mono text-[12px] text-white">
      {short}
    </code>
  );
}

function EvidenceAndDeclaration({ submissionId }: { submissionId: string }) {
  const { loading, items, declaration, legacy } = useSubmissionEvidence(submissionId);

  if (loading) {
    return <div className={cn(SECTION, 'h-[120px] animate-pulse')} />;
  }

  return (
    <>
      <section className={SECTION}>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className={H3}>Evidence sent</h3>
          {items.length > 0 && (
            <span className="text-[12px] tabular-nums text-white">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>
        {items.length === 0 ? (
          <p className="text-[13px] leading-snug text-white">
            No evidence is linked to this submission, and the learner has nothing in the category it
            was sent under. Ask them to send the evidence again from their portfolio.
          </p>
        ) : (
          <>
            {legacy && (
              <p className="mb-2 text-[12.5px] leading-snug text-white">
                Sent as a whole category before item-level sending existed. These are the learner's
                items in that category.
              </p>
            )}
            <ul className="divide-y divide-white/[0.06]">
              {items.map((it) => {
                const signed = declaration?.signed.get(it.id);
                const changed =
                  !!signed &&
                  !!signed.content_hash &&
                  !!it.content_hash &&
                  signed.content_hash !== it.content_hash;
                return (
                  <li key={it.id} className="py-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <p className="min-w-0 text-[13.5px] font-semibold text-white">{it.title}</p>
                      {changed ? (
                        <span className="text-[12px] font-semibold text-red-300">
                          Changed since it was signed
                        </span>
                      ) : signed ? (
                        <span className="text-[12px] font-semibold text-emerald-300">
                          Matches what was signed
                        </span>
                      ) : null}
                    </div>
                    {it.criteria.length > 0 ? (
                      <ul
                        className="mt-2 flex flex-wrap gap-1.5"
                        aria-label="Criteria claimed on this evidence"
                      >
                        {it.criteria.map((c) => (
                          <li
                            key={`${c.unit_code}:${c.ac_code}`}
                            className={cn(
                              'rounded-full border px-2 py-0.5 text-[12px] font-semibold tabular-nums',
                              c.decision === 'passed'
                                ? 'border-emerald-400/40 bg-emerald-500/[0.12] text-emerald-300'
                                : c.decision === 'referred' || c.decision === 'not_yet'
                                  ? 'border-orange-500/40 bg-orange-500/10 text-orange-300'
                                  : 'border-white/[0.2] bg-white/[0.06] text-white'
                            )}
                            title={
                              c.decision === 'passed'
                                ? 'Passed'
                                : c.decision === 'referred'
                                  ? 'Needs more'
                                  : c.decision === 'not_yet'
                                    ? 'Not yet'
                                    : 'Waiting for your decision'
                            }
                          >
                            {c.unit_code} AC {c.ac_code}
                            {c.decision === 'passed'
                              ? ' · passed'
                              : c.decision
                                ? ' · needs more'
                                : ''}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1 text-[12px] text-white">
                        No criteria claimed on this item.
                      </p>
                    )}
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[12px] text-white">
                      <span>Fingerprint</span>
                      <Hash value={it.content_hash} />
                    </div>
                    <AiUseRecord aiAssisted={it.ai_assisted} aiUse={it.ai_use} className="mt-2" />
                    {it.files.length > 0 && (
                      <ul className="mt-1.5 space-y-0.5">
                        {it.files.map((f, i) => (
                          <li
                            key={`${f.name}-${i}`}
                            className="flex flex-wrap items-center gap-x-2 text-[12px] text-white"
                          >
                            <span className="min-w-0 truncate">{f.name}</span>
                            <Hash value={f.sha256} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </section>

      <section className={SECTION}>
        <h3 className={H3}>Learner declaration</h3>
        {declaration ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold text-white">
                  Signed by {declaration.signature_text || declaration.signer_name || 'the learner'}
                </p>
                <p className="text-[12.5px] text-white">{formatDateTime(declaration.signed_at)}</p>
              </div>
              {declaration.signature_image && (
                <img
                  src={declaration.signature_image}
                  alt="Learner's signature"
                  className="h-12 max-w-[200px] rounded-lg border border-white/[0.12] bg-black/40 object-contain p-1.5"
                />
              )}
            </div>
            {declaration.declaration_text && (
              <p className="whitespace-pre-line text-[13px] leading-relaxed text-white">
                “{declaration.declaration_text}”
              </p>
            )}
            {declaration.bundle_hash && (
              <p className="flex flex-wrap items-center gap-x-2 text-[12px] text-white">
                <span>Signed bundle fingerprint</span>
                <Hash value={declaration.bundle_hash} />
              </p>
            )}
          </div>
        ) : (
          <p className="text-[13px] leading-snug text-white">
            No declaration on this submission. It was sent before learners signed a declaration with
            each send.
          </p>
        )}
      </section>
    </>
  );
}

/* ────────────────────────────────────────────────────────
   Decisions recorded against this submission, per criterion
   (portfolio_assessment_decisions, current rows only). Decisions are
   made in Student 360 → Assess criteria; this only shows them.
   ──────────────────────────────────────────────────────── */

interface DecisionRow {
  id: string;
  unit_code: string;
  ac_code: string;
  decision: string;
  assessor_name: string | null;
  decided_at: string | null;
  iqa_verdict: string | null;
}

function DecisionsBlock({
  submissionId,
  first,
  onRecord,
}: {
  submissionId: string;
  first: string;
  onRecord?: () => void;
}) {
  const [rows, setRows] = useState<DecisionRow[] | null>(null);

  useEffect(() => {
    // Same guard as AuditTrail: a late response for a previous submission
    // must not land under the one now open.
    let cancelled = false;
    setRows(null);
    (async () => {
      const { data } = await supabase
        .from('portfolio_assessment_decisions' as never)
        .select('id, unit_code, ac_code, decision, assessor_name, decided_at, iqa_verdict')
        .eq('submission_id', submissionId)
        .is('superseded_at', null)
        .order('unit_code', { ascending: true })
        .order('ac_code', { ascending: true });
      if (!cancelled) setRows((data ?? []) as DecisionRow[]);
    })();
    return () => {
      cancelled = true;
    };
  }, [submissionId]);

  return (
    <section className={SECTION}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className={H3}>Decisions</h3>
        {onRecord && (
          <button
            type="button"
            onClick={onRecord}
            className="inline-flex h-11 items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            Record decisions
          </button>
        )}
      </div>
      {rows === null ? (
        <div className="h-10 animate-pulse rounded-lg bg-white/[0.04]" />
      ) : rows.length === 0 ? (
        <p className="text-[13px] leading-snug text-white">
          Nothing decided on this submission yet. Record decisions takes you through each criterion
          claimed on what was sent, and {first} sees each one straight away.
        </p>
      ) : (
        <ul className="divide-y divide-white/[0.06]">
          {rows.map((r) => {
            const meta = DECISION_LABEL[r.decision] ?? {
              label: r.decision,
              tone: 'plain' as StateTone,
            };
            return (
              <li
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-2.5"
              >
                <div className="min-w-0">
                  <p className="text-[13.5px] font-semibold text-white">
                    {r.unit_code} AC {r.ac_code}
                  </p>
                  <p className="text-[12px] text-white">
                    {r.assessor_name ?? 'Assessor'}
                    {r.decided_at ? ` · ${formatDateTime(r.decided_at)}` : ''}
                    {r.iqa_verdict === 'confirmed'
                      ? ' · IQA confirmed'
                      : r.iqa_verdict === 'not_confirmed'
                        ? ' · IQA not confirmed'
                        : ''}
                  </p>
                </div>
                <StateChip tone={meta.tone}>{meta.label}</StateChip>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   Audit trail (ELE-1865). portfolio_audit_events is append-only and
   readable by assessing staff. Shows events on this submission and the
   ones that name it (items sent, signatures).
   ──────────────────────────────────────────────────────── */

interface AuditRow {
  id: number;
  action: string;
  actor_role: string;
  created_at: string;
}

const AUDIT_LABEL: Record<string, string> = {
  submission_submitted: 'Sent for assessment',
  submission_resubmitted: 'Sent again',
  item_submitted: 'Evidence included',
  signed_declaration: 'Declaration signed',
};

function auditLabel(action: string): string {
  if (AUDIT_LABEL[action]) return AUDIT_LABEL[action];
  const t = action.replace(/_/g, ' ');
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function AuditTrail({ submissionId }: { submissionId: string }) {
  const [rows, setRows] = useState<AuditRow[] | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('portfolio_audit_events' as never)
        .select('id, action, actor_role, created_at')
        .or(`object_id.eq.${submissionId},summary->>submission_id.eq.${submissionId}`)
        .order('created_at', { ascending: false })
        .limit(40);
      if (!cancelled) setRows(error ? [] : ((data ?? []) as AuditRow[]));
    })();
    return () => {
      cancelled = true;
    };
  }, [submissionId]);

  if (!rows || rows.length === 0) return null;
  const shown = showAll ? rows : rows.slice(0, 5);

  return (
    <section className={SECTION}>
      <h3 className={H3}>Audit trail</h3>
      <ul className="divide-y divide-white/[0.06]">
        {shown.map((r) => (
          <li key={r.id} className="flex flex-wrap items-baseline justify-between gap-x-3 py-2">
            <span className="text-[13px] text-white">
              {auditLabel(r.action)}
              <span className="ml-1.5 text-[12px] text-white">· {keyLabel(r.actor_role)}</span>
            </span>
            <span className="text-[12px] tabular-nums text-white">
              {formatDateTime(r.created_at)}
            </span>
          </li>
        ))}
      </ul>
      {rows.length > 5 && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="inline-flex h-11 items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
        >
          {showAll ? 'Show fewer' : `Show all ${rows.length}`}
        </button>
      )}
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   Sign-off chain — who signed this submission (employer /
   supervisor / tutor / IQA), so the college side has the same
   visibility as the apprentice. The learner's declaration is
   shown in its own section above, so it is left out here.
   ──────────────────────────────────────────────────────── */

function SignOffChainBlock({ submissionId }: { submissionId: string }) {
  const chain = useSubmissionSignOffChain(submissionId);

  if (chain.loading) {
    return <div className={cn(SECTION, 'h-[100px] animate-pulse')} />;
  }

  const signatures = chain.signatures.filter((s) => s.signature_type !== 'declaration');
  const hasAnything = signatures.length > 0 || chain.signedOff.at || chain.iqaVerified.at;

  const roles: Array<{ label: string; active: boolean }> = [
    {
      label: 'Apprentice',
      active: chain.signatures.some((s) => {
        const r = (s.signer_role ?? '').toLowerCase();
        return r === 'apprentice' || r === 'learner' || s.signature_type === 'declaration';
      }),
    },
    { label: 'Employer', active: chain.hasEmployer },
    { label: 'Supervisor', active: chain.hasSupervisor },
    { label: 'Tutor', active: Boolean(chain.signedOff.at) || chain.hasTutor },
    { label: 'IQA', active: Boolean(chain.iqaVerified.at) },
  ];

  return (
    <section className={SECTION}>
      <h3 className={H3}>Sign-off</h3>
      <div className="flex flex-wrap gap-1.5">
        {roles.map((r) => (
          <span
            key={r.label}
            className={cn(
              'inline-flex h-7 items-center rounded-full border px-2.5 text-[12px] font-semibold',
              r.active
                ? 'border-emerald-400/30 bg-emerald-500/[0.08] text-emerald-300'
                : 'border-dashed border-white/[0.18] text-white'
            )}
          >
            {r.label}
            {r.active ? ' · signed' : ''}
          </span>
        ))}
      </div>
      {!hasAnything ? (
        <p className="text-[13px] leading-snug text-white">
          No sign-offs yet. They appear here when the employer, supervisor, tutor or IQA signs in
          their app.
        </p>
      ) : (
        <ul className="divide-y divide-white/[0.06]">
          {signatures.map((s) => (
            <li key={s.id} className="py-2.5">
              <SignatureRow sig={s} />
            </li>
          ))}
          {chain.signedOff.at && (
            <li className="py-2.5">
              <RowLine
                roleLabel="Tutor sign-off"
                actor={chain.signedOff.by_name ?? 'Tutor'}
                when={chain.signedOff.at}
              />
            </li>
          )}
          {chain.iqaVerified.at && (
            <li className="py-2.5">
              <RowLine
                roleLabel="IQA verified"
                actor={chain.iqaVerified.by_name ?? 'IQA'}
                when={chain.iqaVerified.at}
              />
            </li>
          )}
        </ul>
      )}
    </section>
  );
}

function SignatureRow({ sig }: { sig: PortfolioSignature }) {
  const role = (sig.signer_role ?? 'signer').replace(/_/g, ' ');
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="min-w-0 flex-1">
        <RowLine
          roleLabel={`${role.charAt(0).toUpperCase() + role.slice(1)} signed`}
          actor={sig.signer_name ?? sig.signature_text ?? 'Signed'}
          when={sig.signed_at}
        />
      </div>
      {sig.signature_image && (
        <img
          src={sig.signature_image}
          alt={`${role} signature`}
          className="h-8 max-w-[120px] flex-shrink-0 rounded-md bg-white object-contain p-1"
        />
      )}
      {!sig.signature_image && sig.signature_type === 'typed' && sig.signature_text && (
        <span className="font-serif text-[13px] italic tracking-tight text-white">
          {sig.signature_text}
        </span>
      )}
    </div>
  );
}

function RowLine({
  roleLabel,
  actor,
  when,
}: {
  roleLabel: string;
  actor: string;
  when: string | null;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span className="text-[13px] font-semibold text-white">{roleLabel}</span>
      <span className="text-[13px] text-white">{actor}</span>
      {when && (
        <span className="ml-auto text-[12px] tabular-nums text-white">
          {new Date(when).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      )}
    </div>
  );
}
