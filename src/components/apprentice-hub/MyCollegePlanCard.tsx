import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMyIlp } from '@/hooks/useMyIlp';
import type { IlpGoal, GoalStatus } from '@/hooks/useStudentIlp';
import { MyGoalSheet } from './MyGoalSheet';

/* ==========================================================================
   MyCollegePlanCard — editorial. Typography-led, no decorative icons.
   Single neutral panel with quiet dividers, progress ring kept (info-
   bearing), only functional icons (checkbox tick, chevron affordance).
   ========================================================================== */

const STATUS_LABEL: Record<GoalStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  completed: 'Done',
  blocked: 'Blocked',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
};

const PLACEHOLDER_GOALS: Array<{ title: string; category: string; due: string }> = [
  {
    title: 'Master three-phase voltage drop calculations',
    category: 'Academic',
    due: 'Due in 3 weeks',
  },
  { title: 'Submit Unit 4 portfolio evidence', category: 'Skills', due: 'Due in 2 weeks' },
  { title: 'Attend the Site Safety workshop', category: 'Employability', due: 'Due in 1 week' },
];

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function MyCollegePlanCard() {
  const hook = useMyIlp();
  const { ilp, goals, rollUp, loading, hasCollegeLink } = hook;
  const [openGoal, setOpenGoal] = useState<IlpGoal | null>(null);
  const [expanded, setExpanded] = useState(false);

  const visibleGoals = useMemo(() => (expanded ? goals : goals.slice(0, 4)), [goals, expanded]);

  if (loading && !ilp) return <Skeleton />;
  if (!ilp) return <PlaceholderCard hasCollegeLink={hasCollegeLink} />;

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
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5">
        {/* Header — eyebrow + headline + tutor */}
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-purple-300/85">
            Your ILP
          </div>
          {rollUp.unread_tutor_comments > 0 && (
            <span className="text-[10.5px] tabular-nums text-blue-300">
              {rollUp.unread_tutor_comments} new from your tutor
            </span>
          )}
        </div>

        {ilp.headline_focus && (
          <h3 className="mt-2 text-[16px] sm:text-[18px] lg:text-[20px] font-semibold text-white leading-tight tracking-tight">
            {ilp.headline_focus}
          </h3>
        )}
        {ilp.tutor_name_snapshot && (
          <p className="mt-1 text-[12px] text-white/85">Set by {ilp.tutor_name_snapshot}</p>
        )}

        {/* Progress + meta strip */}
        <div className="mt-4 sm:mt-5 grid grid-cols-[88px_minmax(0,1fr)] sm:grid-cols-[112px_minmax(0,1fr)] gap-4 sm:gap-5 items-center">
          <div className="relative h-[88px] w-[88px] sm:h-[112px] sm:w-[112px]">
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
              <div className="text-[20px] sm:text-[24px] font-semibold text-white tabular-nums leading-none">
                {pct}
                <span className="text-[12px] sm:text-[13px] text-white/85">%</span>
              </div>
              <div className="mt-0.5 text-[9.5px] sm:text-[10px] uppercase tracking-[0.16em] text-white/90">
                done
              </div>
            </div>
          </div>
          <dl className="text-[12px] sm:text-[12.5px] leading-relaxed space-y-1">
            <Row label="Goals" value={`${rollUp.completed} of ${rollUp.total_goals} done`} />
            {ilp.target_completion_date && (
              <Row label="Target" value={formatDate(ilp.target_completion_date)} />
            )}
            {ilp.review_date && <Row label="Review" value={formatDate(ilp.review_date)} />}
          </dl>
        </div>

        {/* Narrative */}
        {(ilp.headline_strengths || ilp.headline_areas) && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {ilp.headline_strengths && (
              <Narrative label="Strengths" tone="emerald" text={ilp.headline_strengths} />
            )}
            {ilp.headline_areas && (
              <Narrative label="Focus areas" tone="amber" text={ilp.headline_areas} />
            )}
          </div>
        )}
      </div>

      {/* Goals — editorial list under a hairline */}
      {goals.length > 0 && (
        <div className="border-t border-white/[0.06] px-4 sm:px-5 py-4">
          <div className="flex items-baseline justify-between gap-3 mb-3">
            <h4 className="text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-white">
              Your goals
            </h4>
            <span className="text-[10.5px] tabular-nums text-white/85">
              {rollUp.total_goals} total
            </span>
          </div>
          <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            <AnimatePresence initial={false}>
              {visibleGoals.map((g) => (
                <motion.li
                  key={g.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                >
                  <GoalRow
                    goal={g}
                    onTap={() => setOpenGoal(g)}
                    onToggleComplete={(complete) => hook.toggleComplete(g.id, complete)}
                    onAcknowledge={() => {
                      if (!g.student_acknowledged) hook.acknowledge(g.id, true);
                    }}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          {goals.length > 4 && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 text-[12px] font-medium text-white/90 hover:text-white touch-manipulation"
            >
              {expanded ? 'Show fewer' : `Show all ${goals.length} →`}
            </button>
          )}
        </div>
      )}

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
    </section>
  );
}

/* ──────────────────── primitives ──────────────────── */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="text-white/85 w-14 sm:w-16 flex-shrink-0">{label}</dt>
      <dd className="text-white tabular-nums truncate">{value}</dd>
    </div>
  );
}

function Narrative({
  label,
  tone,
  text,
}: {
  label: string;
  tone: 'emerald' | 'amber';
  text: string;
}) {
  return (
    <div>
      <div
        className={cn(
          'text-[10px] font-medium uppercase tracking-[0.16em] mb-1',
          tone === 'emerald' ? 'text-emerald-300/85' : 'text-amber-300/85'
        )}
      >
        {label}
      </div>
      <p className="text-[12.5px] sm:text-[13px] text-white/85 leading-relaxed">{text}</p>
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

  const statusCls =
    status === 'completed'
      ? 'text-emerald-300/85'
      : status === 'overdue'
        ? 'text-red-300'
        : status === 'blocked'
          ? 'text-amber-300'
          : 'text-white/90';

  return (
    <div className="py-3 flex items-start gap-3">
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
          <h5
            className={cn(
              'text-[13.5px] sm:text-[13px] font-medium leading-snug',
              isComplete ? 'text-white/85 line-through' : 'text-white'
            )}
          >
            {goal.title}
          </h5>
          <ChevronRight className="h-4 w-4 text-white/25 flex-shrink-0 mt-0.5" />
        </div>
        <p className="mt-1 text-[10.5px] tabular-nums leading-relaxed">
          <span className={cn('capitalize', statusCls)}>{STATUS_LABEL[status]}</span>
          {goal.target_date && (
            <>
              <Sep />
              <span className={overdue ? 'text-red-300' : 'text-white/90'}>
                Due {formatDate(goal.target_date)}
              </span>
            </>
          )}
          {goal.priority === 'high' && !isComplete && (
            <>
              <Sep />
              <span className="text-red-300/85">High priority</span>
            </>
          )}
          {hasUnreadTutor && (
            <>
              <Sep />
              <span className="text-blue-300">New comment</span>
            </>
          )}
          {!goal.student_acknowledged && (
            <>
              <Sep />
              <span className="text-amber-300">Unread</span>
            </>
          )}
        </p>
      </button>
    </div>
  );
}

function Sep() {
  return <span className="mx-1.5 text-white/25">·</span>;
}

/* ──────────────────── placeholder + skeleton ──────────────────── */

function PlaceholderCard({ hasCollegeLink }: { hasCollegeLink: boolean }) {
  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-4 sm:px-5 py-4 sm:py-5">
      <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-purple-300/85">
        Your ILP
      </div>
      <h3 className="mt-2 text-[16px] sm:text-[18px] font-semibold text-white leading-tight tracking-tight">
        {hasCollegeLink ? 'Your tutor will set goals here' : 'Get goals direct from your tutor'}
      </h3>
      <p className="mt-2 text-[12.5px] sm:text-[13px] text-white/90 leading-relaxed max-w-prose">
        {hasCollegeLink
          ? "Once your tutor publishes a learning plan, it'll show up here with goals you can tick off and a comment thread back to them — all live."
          : 'Connect with your college and your tutor will be able to set personalised goals here. Tick them off as you complete them, reply to leave a comment back.'}
      </p>

      <div className="mt-5 border-t border-white/[0.06] pt-4">
        <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/85 mb-2">
          Example goals
        </div>
        <ul className="divide-y divide-white/[0.04] border-y border-white/[0.04]">
          {PLACEHOLDER_GOALS.map((g, i) => (
            <li key={i} className="py-3 flex items-start gap-3 opacity-60">
              <div className="mt-0.5 h-6 w-6 rounded-full border border-dashed border-white/15 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-[13px] text-white/95 leading-tight">{g.title}</div>
                <p className="mt-1 text-[10.5px] tabular-nums text-white/95">
                  {g.category}
                  <Sep />
                  {g.due}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Skeleton() {
  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-5 animate-pulse">
      <div className="h-3 w-1/4 rounded bg-white/[0.05]" />
      <div className="mt-3 h-5 w-3/4 rounded bg-white/[0.06]" />
      <div className="mt-2 h-2.5 w-1/3 rounded bg-white/[0.04]" />
      <div className="mt-5 grid grid-cols-[88px_minmax(0,1fr)] gap-4 items-center">
        <div className="h-[88px] w-[88px] rounded-full bg-white/[0.06]" />
        <div className="space-y-2">
          <div className="h-2 w-1/2 rounded bg-white/[0.05]" />
          <div className="h-2 w-1/3 rounded bg-white/[0.04]" />
        </div>
      </div>
    </section>
  );
}
