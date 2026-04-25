import { useEffect, useMemo, useRef, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  Pill,
  type Tone,
} from '@/components/college/primitives';
import {
  usePortfolioComments,
  type PortfolioComment,
} from '@/hooks/usePortfolioComments';
import {
  type PortfolioSubmission,
  type SubmissionStatus,
  type IqaOutcome,
} from '@/hooks/useStudentPortfolio';

/* ==========================================================================
   PortfolioSubmissionDrawer — full submission detail + live comment thread.
   Two-way: college staff can reply, mark requires_action, resolve.
   Realtime so the apprentice sees comments land instantly.
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

function formatDateTime(iso: string | null): string {
  if (!iso) return '—';
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

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentUserId: string | null;
  studentName: string;
  submission: PortfolioSubmission | null;
}

export function PortfolioSubmissionDrawer({
  open,
  onOpenChange,
  studentUserId,
  studentName,
  submission,
}: Props) {
  const { toast } = useToast();
  const { comments, loading, post, toggleResolved, remove } = usePortfolioComments({
    studentUserId,
    submissionId: submission?.id ?? null,
  });

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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[92vh] sm:max-w-3xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow="Portfolio submission"
          title={STATUS_LABEL[submission.status as SubmissionStatus] ?? submission.status}
          description={`${studentName.split(' ')[0]} · ${formatDateTime(submission.submitted_at)}`}
          footer={
            <div className="w-full">
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setRequiresAction((v) => !v)}
                  className={cn(
                    'h-8 px-2.5 rounded-full text-[11px] font-medium border transition-colors touch-manipulation',
                    requiresAction
                      ? 'border-amber-500/40 bg-amber-500/[0.1] text-amber-200'
                      : 'border-white/[0.1] bg-white/[0.03] text-white/65 hover:text-white'
                  )}
                >
                  {requiresAction ? '✓ Requires action' : 'Mark as action'}
                </button>
              </div>
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
                  placeholder={`Reply to ${studentName.split(' ')[0]}…`}
                  rows={2}
                  className="flex-1 min-h-[44px] max-h-[160px] px-3 py-2.5 text-[13px] text-white bg-white/[0.04] border border-white/[0.1] rounded-xl resize-none touch-manipulation focus:border-elec-yellow/50 focus:outline-none focus:ring-1 focus:ring-elec-yellow/30"
                />
                <PrimaryButton
                  onClick={handleSend}
                  disabled={!draft.trim() || posting || !studentUserId}
                  size="md"
                >
                  {posting ? 'Sending…' : 'Send'}
                </PrimaryButton>
              </div>
              <div className="mt-1.5 text-[10.5px] text-white/40">
                ⌘ + Enter to send · This appears live in the apprentice's portfolio
              </div>
            </div>
          }
        >
          {/* Submission summary card */}
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Pill tone={STATUS_TONE[submission.status as SubmissionStatus] ?? 'cyan'}>
                {STATUS_LABEL[submission.status as SubmissionStatus] ?? submission.status}
              </Pill>
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
              {submission.iqa_outcome && <Pill tone={IQA_TONE[submission.iqa_outcome]}>{IQA_LABEL[submission.iqa_outcome]}</Pill>}
              {submission.action_required && (
                <span className="inline-flex items-center h-5 px-1.5 rounded-md bg-amber-500/[0.1] border border-amber-500/30 text-[10px] font-semibold tracking-[0.06em] uppercase text-amber-200">
                  Action required
                </span>
              )}
            </div>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
              <Detail label="Submitted" value={formatDateTime(submission.submitted_at)} />
              <Detail label="Reviewed" value={formatDateTime(submission.reviewed_at)} />
              <Detail
                label="Attempt"
                value={submission.submission_count ? String(submission.submission_count) : '1'}
              />
              <Detail label="Last feedback" value={formatDateTime(submission.last_feedback_at)} />
            </div>
            {(submission.assessor_feedback ||
              submission.strengths_noted ||
              submission.areas_for_improvement ||
              submission.iqa_feedback ||
              submission.action_required) && (
              <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3">
                {submission.assessor_feedback && (
                  <FeedbackBlock label="Assessor feedback" tone="blue" text={submission.assessor_feedback} />
                )}
                {submission.strengths_noted && (
                  <FeedbackBlock label="Strengths" tone="emerald" text={submission.strengths_noted} />
                )}
                {submission.areas_for_improvement && (
                  <FeedbackBlock label="Areas for development" tone="amber" text={submission.areas_for_improvement} />
                )}
                {submission.action_required && (
                  <FeedbackBlock label="Action required" tone="amber" text={submission.action_required} />
                )}
                {submission.iqa_feedback && (
                  <FeedbackBlock label="IQA feedback" tone="purple" text={submission.iqa_feedback} />
                )}
              </div>
            )}
          </div>

          {/* Comment thread */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                Live discussion
              </div>
              {comments.length > 0 && (
                <div className="text-[10.5px] text-white/55 tabular-nums">
                  {comments.length} {comments.length === 1 ? 'message' : 'messages'}
                </div>
              )}
            </div>

            {loading && comments.length === 0 ? (
              <ThreadSkeleton />
            ) : comments.length === 0 ? (
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-6 text-center">
                <p className="text-[12.5px] text-white/65 leading-relaxed max-w-sm mx-auto">
                  No comments yet. Start the conversation — your message will appear in
                  {' '}{studentName.split(' ')[0]}'s app instantly.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
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
          </div>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

/* ──────────────────────────────────────────────────────── */

function CommentBubble({
  comment,
  currentUid,
  onResolve,
  onDelete,
}: {
  comment: PortfolioComment & { replies?: PortfolioComment[] };
  currentUid: string | null;
  onResolve: (id: string, resolved: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const isStaff =
    comment.author_role === 'tutor' ||
    comment.author_role === 'assessor' ||
    comment.author_role === 'iqa' ||
    comment.author_role === 'admin';
  // Delete RLS now allows author OR learner (the comment.user_id) — only show
  // the button to those who will actually be able to perform it.
  const canDelete =
    !!currentUid &&
    (comment.author_id === currentUid || comment.user_id === currentUid);

  const ringTone = comment.requires_action
    ? 'border-amber-500/30 bg-amber-500/[0.04]'
    : isStaff
      ? 'border-blue-500/[0.18] bg-blue-500/[0.03]'
      : 'border-white/[0.06] bg-[hsl(0_0%_12%)]';

  return (
    <div className={cn('rounded-2xl border px-4 py-3', ringTone)}>
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-semibold tabular-nums flex-shrink-0',
            isStaff
              ? 'bg-blue-500/20 text-blue-200'
              : 'bg-elec-yellow/15 text-elec-yellow'
          )}
        >
          {comment.author_initials ?? '·'}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[12.5px] font-medium text-white">
              {comment.author_name ?? 'Unknown'}
            </span>
            {comment.author_role && (
              <span className="text-[10px] uppercase tracking-[0.12em] text-white/45">
                {comment.author_role}
              </span>
            )}
            <span className="text-[10.5px] text-white/45 tabular-nums">
              {formatRelative(comment.created_at)}
            </span>
            {comment.requires_action && !comment.is_resolved && (
              <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-amber-500/[0.1] border border-amber-500/30 text-[9px] font-semibold tracking-[0.06em] uppercase text-amber-200">
                Action
              </span>
            )}
            {comment.is_resolved && (
              <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-emerald-500/[0.1] border border-emerald-500/30 text-[9px] font-semibold tracking-[0.06em] uppercase text-emerald-200">
                Resolved{comment.resolved_by_name ? ` · ${comment.resolved_by_name}` : ''}
              </span>
            )}
          </div>
          <p className="mt-1 text-[13px] text-white/90 leading-relaxed whitespace-pre-line">
            {comment.content}
          </p>
          {(comment.requires_action || canDelete) && (
            <div className="mt-2 flex items-center gap-2">
              {comment.requires_action && (
                <button
                  type="button"
                  onClick={() => onResolve(comment.id, !comment.is_resolved)}
                  className="h-7 px-2.5 rounded-full text-[10.5px] font-medium border border-white/[0.1] bg-white/[0.03] text-white/75 hover:text-white hover:border-white/[0.22] transition-colors touch-manipulation"
                >
                  {comment.is_resolved ? 'Reopen' : 'Mark resolved'}
                </button>
              )}
              {canDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(comment.id)}
                  className="h-7 px-2.5 rounded-full text-[10.5px] font-medium text-white/45 hover:text-red-300 hover:bg-red-500/[0.06] transition-colors touch-manipulation"
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
        <div className="mt-3 ml-11 space-y-2 pl-3 border-l border-white/[0.06]">
          {comment.replies.map((r) => (
            <CommentBubble
              key={r.id}
              comment={r}
              currentUid={currentUid}
              onResolve={onResolve}
              onDelete={onDelete}
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
      <div className="text-[10px] uppercase tracking-[0.16em] text-white/55">{label}</div>
      <div className="mt-1 text-white tabular-nums">{value}</div>
    </div>
  );
}

function FeedbackBlock({
  label,
  tone,
  text,
}: {
  label: string;
  tone: 'emerald' | 'amber' | 'blue' | 'purple';
  text: string;
}) {
  return (
    <div>
      <div
        className={cn(
          'text-[10px] font-medium uppercase tracking-[0.18em] mb-1',
          tone === 'emerald' ? 'text-emerald-300/85' :
          tone === 'amber' ? 'text-amber-300/85' :
          tone === 'blue' ? 'text-blue-300/85' :
          'text-purple-300/85'
        )}
      >
        {label}
      </div>
      <p className="text-[12.5px] text-white/85 leading-relaxed whitespace-pre-line">{text}</p>
    </div>
  );
}

function ThreadSkeleton() {
  return (
    <div className="space-y-2.5 animate-pulse">
      {[0, 1].map((i) => (
        <div key={i} className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-4 py-3 flex gap-3">
          <div className="h-8 w-8 rounded-full bg-white/[0.06] flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-2.5 w-1/3 rounded bg-white/[0.06]" />
            <div className="h-2 w-2/3 rounded bg-white/[0.04]" />
          </div>
        </div>
      ))}
    </div>
  );
}
