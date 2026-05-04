import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { Check, MessageCircle, Calendar, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { IlpGoal, GoalCategory, GoalStatus } from '@/hooks/useStudentIlp';

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
  if (!iso) return '—';
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
      setReply(goal.student_comment ?? '');
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
        description: !isComplete ? 'Nice one — your tutor will see this.' : undefined,
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
        description: 'Your tutor will see it in the College Hub.',
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] sm:max-w-2xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10 bg-[hsl(0_0%_8%)]"
      >
        <div className="flex flex-col h-full">
          {/* Drag handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-purple-300/85">
              College plan goal
            </div>
            <h2
              className={cn('mt-1.5 text-[20px] font-semibold leading-tight',
                isComplete ? 'text-white/85 line-through' : 'text-white'
              )}
            >
              {goal.title}
            </h2>
            <div className="mt-2 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-white/85 tabular-nums">
              <span className="inline-flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {CATEGORY_LABEL[goal.category]}
              </span>
              <span className="text-white/25">·</span>
              <span
                className={cn(
                  isComplete
                    ? 'text-emerald-300/85'
                    : goal.status === 'overdue'
                      ? 'text-red-300'
                      : goal.status === 'blocked'
                        ? 'text-white/85'
                        : 'text-white/90'
                )}
              >
                {STATUS_LABEL[goal.status]}
              </span>
              {goal.target_date && (
                <>
                  <span className="text-white/25">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Due {formatDate(goal.target_date)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
            {goal.description && (
              <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 py-3">
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/85 mb-1.5">
                  What success looks like
                </div>
                <p className="text-[13px] text-white/85 leading-relaxed whitespace-pre-line">
                  {goal.description}
                </p>
              </div>
            )}

            {goal.acceptance_criteria && (
              <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 py-3">
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/85 mb-1.5">
                  How we'll know it's done
                </div>
                <p className="text-[13px] text-white/85 leading-relaxed whitespace-pre-line">
                  {goal.acceptance_criteria}
                </p>
              </div>
            )}

            {/* Tutor comment */}
            {goal.tutor_comment && (
              <div
                className={cn('rounded-2xl border px-4 py-3',
                  hasNewTutor
                    ? 'border-white/[0.06] bg-white/[0.02]'
                    : 'border-white/[0.06] bg-white/[0.02]'
                )}
              >
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-blue-300/85">
                    From your tutor
                  </div>
                  {goal.tutor_comment_at && (
                    <div className="text-[10.5px] text-white/95 tabular-nums">
                      {formatRelative(goal.tutor_comment_at)}
                    </div>
                  )}
                </div>
                <p className="text-[13px] text-white/90 leading-relaxed whitespace-pre-line">
                  {goal.tutor_comment}
                </p>
              </div>
            )}

            {/* Existing student comment */}
            {goal.student_comment && goal.student_comment !== reply && (
              <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 py-3">
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-300/85">
                    Your last reply
                  </div>
                  {goal.student_comment_at && (
                    <div className="text-[10.5px] text-white/95 tabular-nums">
                      {formatRelative(goal.student_comment_at)}
                    </div>
                  )}
                </div>
                <p className="text-[13px] text-white/85 leading-relaxed whitespace-pre-line">
                  {goal.student_comment}
                </p>
              </div>
            )}

            {/* Reply box */}
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/85 mb-1.5 flex items-center gap-1.5">
                <MessageCircle className="h-3 w-3" />
                Reply to your tutor
              </div>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Let your tutor know how it's going, ask a question, or share progress."
                rows={4}
                className="w-full px-3 py-2.5 text-[13px] text-white bg-white/[0.04] border border-white/[0.1] rounded-xl resize-none touch-manipulation focus:border-white/[0.06] focus:outline-none focus:ring-1 focus:ring-white/10"
              />
              <div className="mt-1 text-[10.5px] text-white/40">⌘ + Enter to send</div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 border-t border-white/[0.06] p-4 flex flex-row gap-2 pb-[max(16px,env(safe-area-inset-bottom))]">
            <Button
              type="button"
              onClick={handleTick}
              disabled={busy !== null}
              variant="outline"
              className={cn('flex-1 h-11 rounded-full border touch-manipulation transition-colors',
                isComplete
                  ? 'border-white/[0.15] text-white/95 hover:bg-white/[0.06]'
                  : 'border-white/[0.06] bg-white/[0.02] text-white/85 hover:bg-white/[0.02]'
              )}
            >
              <Check className="h-4 w-4 mr-1.5" strokeWidth={3} />
              {busy === 'tick' ? 'Saving…' : isComplete ? 'Mark not done' : 'Mark done'}
            </Button>
            <Button
              type="button"
              onClick={handleSend}
              disabled={!reply.trim() || busy !== null}
              className="flex-1 h-11 rounded-full bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 touch-manipulation"
            >
              {busy === 'send' ? 'Sending…' : 'Send reply'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
