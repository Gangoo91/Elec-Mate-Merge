import { LC_FRAME } from '@/components/apprentice-hub/college-hub/learnerUi';
import { useEffect, useMemo, useState } from 'react';
import { aiProvenanceLine } from '@/hooks/portfolio/usePortfolioAcState';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMyIlp } from '@/hooks/useMyIlp';
import type { IlpGoal, GoalStatus } from '@/hooks/useStudentIlp';
import { MyGoalSheet } from './MyGoalSheet';
import { ProposeIlpGoalSheet } from './ProposeIlpGoalSheet';

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

function formatDate(iso: string | null): string {
  if (!iso) return 'No date';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function MyCollegePlanCard() {
  const hook = useMyIlp();
  const { ilp, goals, rollUp, loading, hasCollegeLink } = hook;
  const [openGoal, setOpenGoal] = useState<IlpGoal | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [proposing, setProposing] = useState(false);

  const visibleGoals = useMemo(() => (expanded ? goals : goals.slice(0, 4)), [goals, expanded]);

  // ?goal=<id> (the "Do next" item, ELE-1896) opens that goal once loaded.
  const [searchParams, setSearchParams] = useSearchParams();
  const goalParam = searchParams.get('goal');
  useEffect(() => {
    if (!goalParam || loading) return;
    const g = goals.find((x) => x.id === goalParam);
    if (g) setOpenGoal(g);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('goal');
        return next;
      },
      { replace: true }
    );
  }, [goalParam, goals, loading, setSearchParams]);

  if (loading && !ilp) return <Skeleton />;
  if (!ilp) return <PlaceholderCard hasCollegeLink={hasCollegeLink} />;

  return (
    <section className={LC_FRAME}>
      <div className="px-4 sm:px-5 py-4 sm:py-5">
        {/* Header — eyebrow + headline + tutor */}
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="text-[15px] font-semibold tracking-tight text-white">
            Your learning plan
          </div>
          {rollUp.unread_tutor_comments > 0 && (
            <span className="text-[12px] tabular-nums text-white">
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
          <p className="mt-1 text-[12px] text-white">Set by {ilp.tutor_name_snapshot}</p>
        )}
        {aiProvenanceLine(
          ilp.narrative_source,
          ilp.narrative_confirmed_by_name,
          ilp.narrative_confirmed_at
        ) && (
          <p className="mt-0.5 text-[12px] text-white">
            {aiProvenanceLine(
              ilp.narrative_source,
              ilp.narrative_confirmed_by_name,
              ilp.narrative_confirmed_at
            )}
          </p>
        )}

        {/*
         * Progress + meta strip.
         *
         * 🔴 The ring used to render unconditionally. With no goals on the
         * plan that is a 112px dial reading "0%" above "Goals — 0 of 0 done":
         * a progress indicator for progress that cannot exist, and the most
         * prominent thing on the card. It reads as failure to a learner whose
         * tutor simply hasn't written the goals yet — which is the tutor's
         * job, not theirs. Show the dial once there is something to fill it.
         */}
        {rollUp.total_goals === 0 ? (
          <div className="mt-4 space-y-1.5">
            <p className="text-[13px] font-medium text-white">No goals on your plan yet</p>
            <p className="text-[12.5px] leading-relaxed text-white">
              Your tutor sets these at review. The dates below are what they've agreed so far.
              Nothing here needs anything from you.
            </p>
            <dl className="pt-1.5 text-[12px] leading-relaxed sm:text-[12.5px] space-y-1">
              {ilp.target_completion_date && (
                <Row label="Target" value={formatDate(ilp.target_completion_date)} />
              )}
              {ilp.review_date && <Row label="Next review" value={formatDate(ilp.review_date)} />}
            </dl>
          </div>
        ) : (
          // Words, not a dial: "1 of 2 goals done" says what a ring reading
          // "50% DONE" only implies (College Hub design language, 8 Oct).
          <div className="mt-4 space-y-1.5">
            <p className="text-[18px] font-semibold leading-snug text-white">
              {rollUp.completed} of {rollUp.total_goals}{' '}
              {rollUp.total_goals === 1 ? 'goal' : 'goals'} done
            </p>
            <dl className="flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] leading-relaxed">
              {ilp.target_completion_date && (
                <Row label="Target" value={formatDate(ilp.target_completion_date)} />
              )}
              {ilp.review_date && <Row label="Next review" value={formatDate(ilp.review_date)} />}
            </dl>
          </div>
        )}

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
            <h4 className="text-[13px] font-medium text-white">Your goals</h4>
            <span className="text-[12px] tabular-nums text-white">{rollUp.total_goals} total</span>
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
              className="mt-2 inline-flex h-11 items-center text-[13px] font-medium text-white touch-manipulation"
            >
              {expanded ? 'Show fewer' : `Show all ${goals.length} →`}
            </button>
          )}
        </div>
      )}

      {/* The learner's side of the plan: suggest a goal; the tutor accepts,
          changes or comes back on it (propose_ilp_goal, source='student'). */}
      <div className="flex flex-col gap-2 border-t border-white/[0.06] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-[13px] leading-snug text-white">
          Something you want to work on? Suggest it and your tutor can add it to your plan.
        </p>
        <button
          type="button"
          onClick={() => setProposing(true)}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.14] px-4 text-[13.5px] font-semibold text-white touch-manipulation transition-colors hover:border-elec-yellow"
        >
          Suggest a goal
        </button>
      </div>

      <ProposeIlpGoalSheet
        open={proposing}
        onOpenChange={setProposing}
        onSubmitted={() => void hook.refresh()}
      />

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
      {/* w-14 fitted "Goals"/"Target"/"Review" and broke "Next review"
          across two lines. Sized to the longest label instead. */}
      <dt className="w-24 flex-shrink-0 text-white">{label}</dt>
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
        /*
         * Was emerald for strengths and amber for focus areas. Neither
         * colour appears anywhere else in the app, and a learner does not
         * need a hue to tell "what's going well" from "what to work on" —
         * the two headings say so. Weight carries it: the thing to act on
         * gets volt, the reassurance stays white.
         */
        className={cn(
          'text-[13px] font-medium mb-1',
          tone === 'emerald' ? 'text-white' : 'text-elec-yellow'
        )}
      >
        {label}
      </div>
      <p className="text-[12.5px] sm:text-[13px] text-white leading-relaxed">{text}</p>
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

  // Volt for done, red reserved for genuinely overdue, white for the rest.
  const statusCls =
    status === 'completed'
      ? 'font-semibold text-emerald-300'
      : status === 'overdue' || status === 'blocked'
        ? 'font-semibold text-orange-300'
        : 'text-white';

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
        className="-ml-2.5 -mt-2 flex h-11 w-11 flex-shrink-0 items-center justify-center touch-manipulation"
      >
        <span
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-full border transition-all',
            isComplete
              ? 'border-emerald-400/60 text-emerald-300'
              : 'border-white/25 text-transparent active:scale-95 hover:border-white/55'
          )}
        >
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
      </button>

      <button
        type="button"
        onClick={() => {
          onTap();
          if (!goal.student_acknowledged) onAcknowledge();
        }}
        className="min-h-11 min-w-0 flex-1 text-left touch-manipulation"
      >
        <div className="flex items-start justify-between gap-2">
          <h5
            className={cn(
              'text-[13.5px] sm:text-[13px] font-medium leading-snug',
              isComplete ? 'text-white line-through' : 'text-white'
            )}
          >
            {goal.title}
          </h5>
          <ChevronRight className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
        </div>
        <p className="mt-1 text-[12px] tabular-nums leading-relaxed">
          <span className={statusCls}>{STATUS_LABEL[status]}</span>
          {goal.target_date && (
            <>
              <Sep />
              <span className={overdue ? 'text-red-300' : 'text-white'}>
                Due {formatDate(goal.target_date)}
              </span>
            </>
          )}
          {goal.priority === 'high' && !isComplete && (
            <>
              <Sep />
              <span className="text-red-300">High priority</span>
            </>
          )}
          {hasUnreadTutor && (
            <>
              <Sep />
              <span className="text-white">New comment</span>
            </>
          )}
          {goal.source === 'ai_suggested' && (
            <>
              <Sep />
              <span className="text-white">Drafted with AI, confirmed by your tutor</span>
            </>
          )}
          {!goal.student_acknowledged && (
            <>
              <Sep />
              <span className="text-white">Unread</span>
            </>
          )}
        </p>
      </button>
    </div>
  );
}

function Sep() {
  return <span className="mx-1.5 text-white">·</span>;
}

/* ──────────────────── placeholder + skeleton ──────────────────── */

function PlaceholderCard({ hasCollegeLink }: { hasCollegeLink: boolean }) {
  return (
    <section className={cn(LC_FRAME, 'px-4 sm:px-5 py-4 sm:py-5')}>
      <div className="text-[15px] font-semibold tracking-tight text-white">Your learning plan</div>
      {/*
       * No example goals. This card used to list three invented goals
       * ("Master three-phase voltage drop calculations · Due in 3 weeks")
       * under a LINKED learner's real college name, dimmed to 60%. A
       * learner — or a tutor looking over their shoulder — reads those as
       * the plan, not as a mock-up, and then asks why the dates are wrong.
       * Say what the plan is and who writes it; show nothing that isn't real.
       */}
      <h3 className="mt-2 text-[16px] sm:text-[18px] font-semibold text-white leading-tight tracking-tight">
        {hasCollegeLink ? 'Your tutor hasn’t published your plan yet' : 'Your learning plan'}
      </h3>
      <p className="mt-2 text-[12.5px] sm:text-[13px] text-white leading-relaxed max-w-prose">
        {hasCollegeLink
          ? 'When they do, your goals appear here for you to tick off and reply to.'
          : 'An individual learning plan is the set of goals your college tutor agrees with you at review. Link your college and they appear here for you to tick off and reply to.'}
      </p>
    </section>
  );
}

function Skeleton() {
  return (
    <section className={cn(LC_FRAME, 'p-5 animate-pulse')}>
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
