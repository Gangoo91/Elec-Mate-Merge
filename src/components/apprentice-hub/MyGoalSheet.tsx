import { useEffect, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import { useToast } from '@/hooks/use-toast';
import { Check, MessageCircle, Calendar, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IlpGoal, GoalCategory, GoalStatus } from '@/hooks/useStudentIlp';
import { buttonPrimaryCn, buttonSecondaryCn, textareaCn } from '@/components/forms/fieldStyles';

/* ==========================================================================
   MyGoalSheet — apprentice-side bottom sheet showing one goal in full.
   Lets the learner read tutor detail, tick complete, and post a reply
   that lands instantly in the College Hub via realtime.
   ========================================================================== */

const CATEGORY_LABEL: Record<GoalCategory, string> = {
  academic: 'Academic',
  behavioural: 'Behaviour',
  skills: 'Skills',
  employability: 'Employability',
  wellbeing: 'Wellbeing',
  attendance: 'Attendance',
  other: 'Other',
};

const STATUS_LABEL: Record<GoalStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  completed: 'Done',
  blocked: 'Blocked',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
};

function formatDate(iso: string | null): string {
  if (!iso) return 'No date';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatRelative(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const minutes = Math.floor((now.getTime() - d.getTime()) / 60000);
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
  goal: IlpGoal | null;
  toggleComplete: (id: string, complete: boolean) => Promise<void>;
  postComment: (id: string, comment: string) => Promise<void>;
  acknowledge: (id: string, ack: boolean) => Promise<void>;
}

export function MyGoalSheet({
  open,
  onOpenChange,
  goal,
  toggleComplete,
  postComment,
  acknowledge,
}: Props) {
  const { toast } = useToast();
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState<'tick' | 'send' | null>(null);

  useEffect(() => {
    if (open && goal) {
      // Start blank: the last reply shows above the box. Pre-filling it
      // made the sheet open looking half-written.
      setReply('');
      // Auto-acknowledge on open if there's a new tutor comment
      if (
        !goal.student_acknowledged ||
        (goal.tutor_comment_at &&
          (!goal.student_comment_at || goal.tutor_comment_at > goal.student_comment_at))
      ) {
        void acknowledge(goal.id, true);
      }
    }
  }, [open, goal, acknowledge]);

  if (!goal) return null;

  const isComplete = goal.status === 'completed';
  const hasNewTutor =
    goal.tutor_comment_at &&
    (!goal.student_comment_at || goal.tutor_comment_at > goal.student_comment_at);

  const handleTick = async () => {
    setBusy('tick');
    try {
      await toggleComplete(goal.id, !isComplete);
      toast({
        title: isComplete ? 'Marked not done' : 'Goal complete',
        description: !isComplete ? 'Nice one. Your tutor will see this.' : undefined,
      });
    } catch (e) {
      toast({
        title: 'Could not update',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  const handleSend = async () => {
    if (!reply.trim() || busy) return;
    setBusy('send');
    try {
      await postComment(goal.id, reply);
      toast({
        title: 'Reply sent',
        description: 'Your tutor will see it on your learning plan.',
      });
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not send',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setBusy(null);
    }
  };

  const panel = 'rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3';
  const panelHead = 'mb-1.5 text-[13px] font-medium text-white';

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Learning plan goal"
      width="wide"
      title={<span className={cn(isComplete && 'line-through')}>{goal.title}</span>}
      description={
        <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5 tabular-nums">
          <span className="inline-flex items-center gap-1">
            <Tag className="h-3.5 w-3.5" aria-hidden />
            {CATEGORY_LABEL[goal.category]}
          </span>
          <span aria-hidden>·</span>
          <span
            className={cn(
              isComplete
                ? 'font-semibold text-emerald-300'
                : goal.status === 'overdue' || goal.status === 'blocked'
                  ? 'font-semibold text-orange-300'
                  : 'text-white'
            )}
          >
            {STATUS_LABEL[goal.status]}
          </span>
          {goal.target_date && (
            <>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" aria-hidden />
                Due {formatDate(goal.target_date)}
              </span>
            </>
          )}
        </span>
      }
      bodyClassName="space-y-5 lg:grid lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-start lg:gap-10 lg:space-y-0"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleTick}
            disabled={busy !== null}
            className={cn(buttonSecondaryCn, 'inline-flex items-center justify-center gap-1.5')}
          >
            <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
            {busy === 'tick' ? 'Saving…' : isComplete ? 'Mark not done' : 'Mark done'}
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={!reply.trim() || busy !== null}
            className={buttonPrimaryCn}
          >
            {busy === 'send' ? 'Sending…' : 'Send reply'}
          </button>
        </div>
      }
    >
      {/* Left: the goal as the tutor wrote it, and the thread so far. */}
      <div className="space-y-4">
        {goal.description && (
          <div className={panel}>
            <div className={panelHead}>What success looks like</div>
            <p className="whitespace-pre-line text-[14px] leading-relaxed text-white">
              {goal.description}
            </p>
          </div>
        )}

        {goal.acceptance_criteria && (
          <div className={panel}>
            <div className={panelHead}>How you will know it is done</div>
            <p className="whitespace-pre-line text-[14px] leading-relaxed text-white">
              {goal.acceptance_criteria}
            </p>
          </div>
        )}

        {goal.tutor_comment && (
          <div className={cn(panel, hasNewTutor && 'border-elec-yellow/60')}>
            <div className="mb-1.5 flex items-baseline justify-between gap-2">
              <div className="text-[13px] font-medium text-elec-yellow">
                {hasNewTutor ? 'New from your tutor' : 'From your tutor'}
              </div>
              {goal.tutor_comment_at && (
                <div className="text-[12px] tabular-nums text-white">
                  {formatRelative(goal.tutor_comment_at)}
                </div>
              )}
            </div>
            <p className="whitespace-pre-line text-[14px] leading-relaxed text-white">
              {goal.tutor_comment}
            </p>
          </div>
        )}

        {goal.student_comment && (
          <div className={panel}>
            <div className="mb-1.5 flex items-baseline justify-between gap-2">
              <div className={cn(panelHead, 'mb-0')}>Your last reply</div>
              {goal.student_comment_at && (
                <div className="text-[12px] tabular-nums text-white">
                  {formatRelative(goal.student_comment_at)}
                </div>
              )}
            </div>
            <p className="whitespace-pre-line text-[14px] leading-relaxed text-white">
              {goal.student_comment}
            </p>
          </div>
        )}

        {!goal.description &&
          !goal.acceptance_criteria &&
          !goal.tutor_comment &&
          !goal.student_comment && (
            <p className="text-[14px] leading-relaxed text-white">
              Your tutor has not added any detail to this goal yet. Ask them below what they would
              like to see.
            </p>
          )}
      </div>

      {/* Right: reply to the tutor. */}
      <div>
        <label
          htmlFor="goal-reply"
          className="mb-1.5 flex items-center gap-1.5 text-[13px] font-medium text-white"
        >
          <MessageCircle className="h-3.5 w-3.5" aria-hidden />
          Reply to your tutor
        </label>
        <textarea
          id="goal-reply"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Let your tutor know how it's going, ask a question, or share progress."
          rows={6}
          className={cn(textareaCn, 'w-full resize-none')}
        />
        <p className="mt-1.5 text-[12px] leading-snug text-white">
          Your tutor sees this on your learning plan. Tick Mark done when you have finished, and
          they will check it at your next review.
        </p>
      </div>
    </FormSheet>
  );
}
