import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  ChevronRight,
  Check,
  MessageCircle,
  Sparkles,
  Target,
  Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMyIlp } from '@/hooks/useMyIlp';
import type { IlpGoal, GoalStatus } from '@/hooks/useStudentIlp';
import { MyGoalSheet } from './MyGoalSheet';

/* ==========================================================================
   MyCollegePlanCard — apprentice-side ILP card on the home dashboard.

   Always renders. Adapts to four states:
     1. No college link  → invitation card with placeholder goals
     2. Linked, no ILP   → "tutor will set goals" with placeholder goals
     3. Linked, has ILP  → live ILP with real goals, ticks, comments
     4. Loading          → shape-matched skeleton

   Desktop uses a two-column hero (progress ring + narrative) with a wide
   goal list below. Mobile stacks.
   ========================================================================== */

const STATUS_LABEL: Record<GoalStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  completed: 'Done',
  blocked: 'Blocked',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
};

const PLACEHOLDER_GOALS: Array<{
  title: string;
  category: string;
  due: string;
}> = [
  {
    title: 'Master three-phase voltage drop calculations',
    category: 'Academic',
    due: 'Due in 3 weeks',
  },
  {
    title: 'Submit Unit 4 portfolio evidence',
    category: 'Skills',
    due: 'Due in 2 weeks',
  },
  {
    title: 'Attend the Site Safety workshop',
    category: 'Employability',
    due: 'Due in 1 week',
  },
];

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

export function MyCollegePlanCard() {
  const hook = useMyIlp();
  const { ilp, goals, rollUp, loading, hasCollegeLink } = hook;
  const [openGoal, setOpenGoal] = useState<IlpGoal | null>(null);
  const [expanded, setExpanded] = useState(false);

  const visibleGoals = useMemo(
    () => (expanded ? goals : goals.slice(0, 4)),
    [goals, expanded]
  );

  // Loading state — shape-matched skeleton
  if (loading && !ilp) {
    return <Skeleton />;
  }

  // No real ILP — show educational placeholder ("here's what this will look like")
  if (!ilp) {
    return <PlaceholderCard hasCollegeLink={hasCollegeLink} />;
  }

  const pct = rollUp.completion_percent;
  const ringColour =
    pct >= 80
      ? 'stroke-emerald-400'
      : pct >= 50
        ? 'stroke-elec-yellow'
        : pct >= 25
          ? 'stroke-amber-400'
          : 'stroke-purple-400';

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)]">
      {/* Top accent gradient */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 opacity-70" />

      <div className="p-5 sm:p-6 lg:p-7">
        {/* Hero — two-column on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-5 lg:gap-7">
          {/* Progress + meta */}
          <div className="flex items-center gap-4 lg:items-start lg:flex-col lg:gap-5">
            <div className="relative h-[88px] w-[88px] lg:h-[112px] lg:w-[112px] flex-shrink-0">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  strokeWidth="2.5"
                  className="stroke-white/[0.08]"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={`${(pct / 100) * 97.4} 97.4`}
                  className={cn('transition-all duration-500', ringColour)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[18px] lg:text-[24px] font-semibold text-white tabular-nums leading-none">
                  {pct}
                  <span className="text-[11px] lg:text-[13px] text-white/85">%</span>
                </div>
                <div className="text-[9.5px] lg:text-[10px] uppercase tracking-[0.14em] text-white/75 mt-0.5">
                  done
                </div>
              </div>
            </div>
            <div className="min-w-0 lg:w-full text-[11px] lg:text-[12px] leading-snug space-y-1 lg:space-y-2">
              <div>
                <span className="text-white/70">Goals: </span>
                <span className="text-white tabular-nums">
                  {rollUp.completed}/{rollUp.total_goals} done
                </span>
              </div>
              {ilp.target_completion_date && (
                <div>
                  <span className="text-white/70">Target: </span>
                  <span className="text-white tabular-nums">
                    {formatDate(ilp.target_completion_date)}
                  </span>
                </div>
              )}
              {ilp.review_date && (
                <div>
                  <span className="text-white/70">Review: </span>
                  <span className="text-white tabular-nums">
                    {formatDate(ilp.review_date)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Narrative */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-purple-300/85">
                College plan
              </div>
              {rollUp.unread_tutor_comments > 0 && (
                <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-blue-500/[0.1] border border-blue-500/30 text-[9px] font-semibold tracking-[0.06em] uppercase text-blue-200">
                  {rollUp.unread_tutor_comments} new
                </span>
              )}
            </div>
            {ilp.headline_focus && (
              <h3 className="mt-1.5 text-[16px] sm:text-[18px] lg:text-[20px] font-semibold text-white leading-tight tracking-tight">
                {ilp.headline_focus}
              </h3>
            )}
            {ilp.tutor_name_snapshot && (
              <div className="mt-1 text-[11px] lg:text-[12px] text-white/85">
                Set by {ilp.tutor_name_snapshot}
              </div>
            )}
            {(ilp.headline_areas || ilp.headline_strengths) && (
              <div className="mt-3 lg:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                {ilp.headline_strengths && (
                  <NarrativeBlock
                    label="Strengths"
                    tone="emerald"
                    text={ilp.headline_strengths}
                  />
                )}
                {ilp.headline_areas && (
                  <NarrativeBlock
                    label="Focus areas"
                    tone="amber"
                    text={ilp.headline_areas}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Goals */}
        {goals.length > 0 && (
          <div className="mt-6 lg:mt-7">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-purple-300/85" />
              <h4 className="text-[12.5px] lg:text-[13px] font-semibold text-white uppercase tracking-[0.12em]">
                Your goals
              </h4>
              <span className="text-[11px] text-white/70 tabular-nums ml-auto">
                {rollUp.total_goals} total
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-2.5">
              <AnimatePresence initial={false}>
                {visibleGoals.map((g) => (
                  <motion.div
                    key={g.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    <GoalRow
                      goal={g}
                      onTap={() => setOpenGoal(g)}
                      onToggleComplete={(complete) =>
                        hook.toggleComplete(g.id, complete)
                      }
                      onAcknowledge={() => {
                        if (!g.student_acknowledged) hook.acknowledge(g.id, true);
                      }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {goals.length > 4 && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="w-full mt-3 h-10 rounded-xl border border-white/[0.08] text-[12px] font-medium text-white/70 hover:text-white hover:border-white/[0.18] transition-colors touch-manipulation"
              >
                {expanded ? 'Show fewer' : `Show all ${goals.length} goals`}
              </button>
            )}
          </div>
        )}
      </div>

      <MyGoalSheet
        open={openGoal !== null}
        onOpenChange={(o) => {
          if (!o) setOpenGoal(null);
        }}
        goal={openGoal}
        toggleComplete={hook.toggleComplete}
        postComment={hook.postComment}
        acknowledge={hook.acknowledge}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function PlaceholderCard({ hasCollegeLink }: { hasCollegeLink: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)]">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 opacity-60" />

      <div className="p-5 sm:p-6 lg:p-7">
        {/* Hero with placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-5 lg:gap-7">
          <div className="flex items-center gap-4 lg:items-start lg:flex-col lg:gap-5">
            <div className="relative h-[88px] w-[88px] lg:h-[112px] lg:w-[112px] flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-purple-500/10 flex items-center justify-center">
                <GraduationCap className="h-10 w-10 lg:h-14 lg:w-14 text-purple-300/70" />
              </div>
            </div>
            <div className="min-w-0 lg:w-full text-[11px] lg:text-[12px] leading-snug space-y-1 lg:space-y-2 text-white/70">
              <div>Your tutor sets goals</div>
              <div>You tick them off</div>
              <div>You reply, they see it live</div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-purple-300/85">
              College plan
            </div>
            <h3 className="mt-1.5 text-[16px] sm:text-[18px] lg:text-[20px] font-semibold text-white leading-tight tracking-tight">
              {hasCollegeLink
                ? 'Your tutor will set goals here'
                : 'Get goals direct from your tutor'}
            </h3>
            <p className="mt-2 text-[12.5px] lg:text-[13px] text-white/85 leading-relaxed max-w-xl">
              {hasCollegeLink
                ? "Once your tutor publishes an ILP for you, it'll show up here with goals you can tick off and a comment thread back to them — all live."
                : 'Connect with your college and your tutor will be able to set personalised goals here. Tick them off as you complete them, reply to leave a comment back.'}
            </p>
          </div>
        </div>

        {/* Placeholder goals */}
        <div className="mt-6 lg:mt-7">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-4 w-4 text-purple-300/40" />
            <h4 className="text-[12.5px] lg:text-[13px] font-semibold text-white/75 uppercase tracking-[0.12em]">
              Example goals
            </h4>
            <span className="ml-auto inline-flex items-center h-4 px-1.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[9px] font-semibold tracking-[0.06em] uppercase text-white/75">
              Preview
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-2.5">
            {PLACEHOLDER_GOALS.map((g, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl bg-white/[0.015] border border-white/[0.04] border-dashed px-3 py-2.5 opacity-70"
              >
                <div className="mt-0.5 h-6 w-6 rounded-full border border-white/15 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h5 className="text-[13px] font-medium text-white/75 leading-tight">
                    {g.title}
                  </h5>
                  <div className="mt-1 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[10.5px] tabular-nums text-white/70">
                    <span>{g.category}</span>
                    <span className="text-white/20">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {g.due}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function NarrativeBlock({
  label,
  tone,
  text,
}: {
  label: string;
  tone: 'emerald' | 'amber';
  text: string;
}) {
  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] px-3 py-2.5">
      <div
        className={cn(
          'text-[10px] font-medium uppercase tracking-[0.16em] mb-1',
          tone === 'emerald' ? 'text-emerald-300/85' : 'text-amber-300/85'
        )}
      >
        {label}
      </div>
      <p className="text-[12px] lg:text-[12.5px] text-white/85 leading-relaxed line-clamp-3">
        {text}
      </p>
    </div>
  );
}

function GoalRow({
  goal,
  onTap,
  onToggleComplete,
  onAcknowledge,
}: {
  goal: IlpGoal;
  onTap: () => void;
  onToggleComplete: (complete: boolean) => void;
  onAcknowledge: () => void;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const overdue =
    goal.target_date != null &&
    goal.target_date < today &&
    goal.status !== 'completed' &&
    goal.status !== 'cancelled';
  const status: GoalStatus = overdue && goal.status !== 'overdue' ? 'overdue' : goal.status;
  const isComplete = goal.status === 'completed';
  const hasUnreadTutor =
    goal.tutor_comment_at &&
    (!goal.student_comment_at || goal.tutor_comment_at > goal.student_comment_at);

  return (
    <div className="flex items-start gap-3 rounded-xl bg-white/[0.02] border border-white/[0.04] px-3 py-2.5 hover:border-white/[0.12] transition-colors h-full">
      <button
        type="button"
        aria-label={isComplete ? 'Mark not done' : 'Mark done'}
        onClick={(e) => {
          e.stopPropagation();
          onToggleComplete(!isComplete);
          if (!goal.student_acknowledged) onAcknowledge();
        }}
        className={cn(
          'mt-0.5 h-6 w-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-all touch-manipulation',
          isComplete
            ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200'
            : 'border-white/25 text-transparent active:scale-95 hover:border-white/55'
        )}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </button>

      <button
        type="button"
        onClick={() => {
          onTap();
          if (!goal.student_acknowledged) onAcknowledge();
        }}
        className="min-w-0 flex-1 text-left touch-manipulation"
      >
        <div className="flex items-start justify-between gap-2">
          <h4
            className={cn(
              'text-[13px] font-medium leading-tight',
              isComplete ? 'text-white/70 line-through' : 'text-white'
            )}
          >
            {goal.title}
          </h4>
          <ChevronRight className="h-4 w-4 text-white/25 flex-shrink-0 mt-0.5" />
        </div>
        <div className="mt-1 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[10.5px] tabular-nums">
          <span
            className={cn(
              'capitalize',
              status === 'completed'
                ? 'text-emerald-300/85'
                : status === 'overdue'
                  ? 'text-red-300'
                  : status === 'blocked'
                    ? 'text-amber-300'
                    : 'text-white/85'
            )}
          >
            {STATUS_LABEL[status]}
          </span>
          {goal.target_date && (
            <>
              <span className="text-white/25">·</span>
              <span className={overdue ? 'text-red-300' : 'text-white/85'}>
                Due {formatDate(goal.target_date)}
              </span>
            </>
          )}
          {hasUnreadTutor && (
            <>
              <span className="text-white/25">·</span>
              <span className="inline-flex items-center gap-1 text-blue-300">
                <MessageCircle className="h-3 w-3" />
                New
              </span>
            </>
          )}
          {!goal.student_acknowledged && (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-amber-500/[0.1] border border-amber-500/30 text-[9px] font-semibold tracking-[0.06em] uppercase text-amber-200">
              Unread
            </span>
          )}
          {goal.priority === 'high' && !isComplete && (
            <span className="inline-flex items-center gap-0.5 text-red-300/85">
              <Sparkles className="h-3 w-3" />
              High
            </span>
          )}
        </div>
      </button>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-5 sm:p-6 lg:p-7 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-5 lg:gap-7">
        <div className="flex items-center gap-4 lg:items-start lg:flex-col lg:gap-5">
          <div className="h-[88px] w-[88px] lg:h-[112px] lg:w-[112px] rounded-full bg-white/[0.06]" />
          <div className="flex-1 lg:w-full space-y-2">
            <div className="h-2.5 w-1/2 rounded bg-white/[0.05]" />
            <div className="h-2 w-1/3 rounded bg-white/[0.04]" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-3 w-1/4 rounded bg-white/[0.05]" />
          <div className="h-5 w-3/4 rounded bg-white/[0.06]" />
          <div className="h-2.5 w-1/2 rounded bg-white/[0.04]" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-2.5">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="h-[64px] rounded-xl border border-white/[0.04] bg-white/[0.015]"
          />
        ))}
      </div>
    </div>
  );
}
