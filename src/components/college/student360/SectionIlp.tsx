import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import {
  useStudentIlp,
  type IlpGoal,
  type GoalCategory,
  type GoalStatus,
  type StudentIlpHook,
} from '@/hooks/useStudentIlp';
import { IlpEditorSheet } from '@/components/college/sheets/IlpEditorSheet';
import { IlpGoalSheet } from '@/components/college/sheets/IlpGoalSheet';
import { IlpGenerateSheet } from '@/components/college/sheets/IlpGenerateSheet';

/* ==========================================================================
   SectionIlp — bidirectional Individual Learning Plan panel.
   Tutors edit headline + goals; learners can tick off goals + comment back.

   Hub language: HubSectionHeading with quiet volt text actions, two
   CARD_SURFACE cards (plan headline, goals). Status is TEXT — red only for
   overdue/blocked, emerald only for done. The cyan/blue/purple chips that
   used to tell apart "not started", "in progress", "AI suggested" and
   "apprentice proposed" said nothing the words didn't.

   `hook` lets a parent that already runs `useStudentIlp` (the dashboard's
   Student 360 needs the roll-up for its KPI row and "Needs you" list) share
   the instance instead of fetching twice. When it is supplied the section's
   own hook is given a null id, which is the hook's no-fetch, no-subscribe
   path.
   ========================================================================== */

const STATUS_LABEL: Record<GoalStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  completed: 'Done',
  blocked: 'Blocked',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
};

const CATEGORY_LABEL: Record<GoalCategory, string> = {
  academic: 'Academic',
  behavioural: 'Behaviour',
  skills: 'Skills',
  employability: 'Employability',
  wellbeing: 'Wellbeing',
  attendance: 'Attendance',
  other: 'Other',
};

const ACTION_BTN =
  '-my-2 flex h-11 shrink-0 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation';

const CHIP =
  'inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-semibold tabular-nums';
const CHIP_NEUTRAL = 'border-white/[0.14] bg-white/[0.06] text-white';
const CHIP_RED = 'border-red-400/30 bg-red-500/[0.08] text-red-300';
const CHIP_GOOD = 'border-emerald-400/30 bg-emerald-500/[0.08] text-emerald-300';
const CHIP_VOLT = 'border-elec-yellow/35 text-elec-yellow';

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function SectionIlp({
  id,
  studentName,
  collegeStudentId,
  hook: shared,
}: {
  id: string;
  studentName: string;
  collegeStudentId: string | null;
  hook?: StudentIlpHook;
}) {
  const own = useStudentIlp({ collegeStudentId: shared ? null : collegeStudentId });
  const hook = shared ?? own;
  const { ilp, goals, rollUp, loading } = hook;
  const first = studentName.split(' ')[0];

  const [editorOpen, setEditorOpen] = useState(false);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [goalSheetOpen, setGoalSheetOpen] = useState<{
    mode: 'add' | 'edit';
    goal?: IlpGoal;
    acContext?: { unit_code: string; ac_code: string };
  } | null>(null);

  // Cross-section bridge: an AC cell can dispatch this event to open the
  // goal sheet pre-filled in from_ac AI mode.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as
        | { unit_code: string; ac_code: string }
        | undefined;
      if (!detail) return;
      setGoalSheetOpen({ mode: 'add', acContext: detail });
    };
    window.addEventListener('ilp:suggest-from-ac', handler);
    return () => window.removeEventListener('ilp:suggest-from-ac', handler);
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const reviewOverdue = !!ilp?.review_date && ilp.review_date.slice(0, 10) < today;

  if (!collegeStudentId) {
    return (
      <section id={id} className="scroll-mt-20 space-y-3">
        <HubSectionHeading>Individual learning plan</HubSectionHeading>
        <div className={cn('rounded-2xl border border-elec-yellow/35 px-4 py-5 sm:px-5', CARD_SURFACE)}>
          <p className="text-[12.5px] leading-relaxed text-white">
            No college record for this learner yet, so there is no plan to show.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="scroll-mt-20 space-y-3">
      <div className="flex items-end justify-between gap-4">
        <HubSectionHeading>Individual learning plan</HubSectionHeading>
        {ilp && (
          <div className="flex items-center gap-1 no-print">
            <button type="button" onClick={() => setGenerateOpen(true)} className={ACTION_BTN}>
              Refine with AI
            </button>
            <button type="button" onClick={() => setEditorOpen(true)} className={ACTION_BTN}>
              Edit
            </button>
          </div>
        )}
      </div>

      {!ilp && !loading ? (
        <div className={cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE)}>
          <p className="px-4 pt-4 text-[12.5px] leading-relaxed text-white sm:px-5">
            No ILP yet for {first}. Generate one from cross-hub data, or start a blank plan and
            write it yourself.
          </p>
          <ul className="mt-3 divide-y divide-white/[0.10] border-t border-white/[0.10]">
            <li>
              <ActionRow
                title="Generate with AI"
                reason="Drafts the focus, strengths, support strategies and first goals"
                urgent
                onClick={() => setGenerateOpen(true)}
              />
            </li>
            <li>
              <ActionRow
                title="Create a blank plan"
                reason="Write the headline and goals yourself"
                onClick={() => setEditorOpen(true)}
              />
            </li>
          </ul>
        </div>
      ) : ilp ? (
        <>
          <HeadlineCard ilp={ilp} rollUp={rollUp} reviewOverdue={reviewOverdue} />
          <GoalsList
            goals={goals}
            loading={loading}
            first={first}
            onAddGoal={() => setGoalSheetOpen({ mode: 'add' })}
            onEditGoal={(g) => setGoalSheetOpen({ mode: 'edit', goal: g })}
            onToggleComplete={(g) => hook.toggleGoalComplete(g.id, g.status !== 'completed')}
          />
        </>
      ) : (
        <div className={cn('rounded-2xl border border-elec-yellow/35', CARD_SURFACE)}>
          <Skeleton />
        </div>
      )}

      <IlpEditorSheet
        open={editorOpen}
        onOpenChange={setEditorOpen}
        existingIlp={ilp}
        collegeStudentId={collegeStudentId}
        studentName={studentName}
        upsertIlp={hook.upsertIlp}
        updateIlp={hook.updateIlp}
      />

      <IlpGoalSheet
        open={goalSheetOpen !== null}
        onOpenChange={(o) => {
          if (!o) setGoalSheetOpen(null);
        }}
        mode={goalSheetOpen?.mode ?? 'add'}
        goal={goalSheetOpen?.goal ?? null}
        addGoal={hook.addGoal}
        updateGoal={hook.updateGoal}
        removeGoal={hook.removeGoal}
        collegeStudentId={collegeStudentId}
        acContext={goalSheetOpen?.acContext ?? null}
      />

      <IlpGenerateSheet
        open={generateOpen}
        onOpenChange={setGenerateOpen}
        studentId={collegeStudentId}
        studentName={studentName}
        hookActions={{ upsertIlp: hook.upsertIlp, addGoal: hook.addGoal }}
        onSaved={hook.refresh}
      />
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */

function ActionRow({
  title,
  reason,
  urgent,
  onClick,
}: {
  title: string;
  reason: string;
  urgent?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
    >
      <span
        aria-hidden
        className={cn('h-8 w-[3px] shrink-0 rounded-full', urgent ? 'bg-elec-yellow' : 'bg-white/[0.25]')}
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-semibold leading-tight text-white">{title}</span>
        <span className="mt-0.5 block text-[12px] leading-tight text-white">{reason}</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
    </button>
  );
}

function HeadlineCard({
  ilp,
  rollUp,
  reviewOverdue,
}: {
  ilp: NonNullable<StudentIlpHook['ilp']>;
  rollUp: StudentIlpHook['rollUp'];
  reviewOverdue: boolean;
}) {
  const pct = rollUp.completion_percent;
  const hasNarrative =
    !!ilp.headline_focus ||
    !!ilp.headline_strengths ||
    !!ilp.headline_areas ||
    !!ilp.support_strategies ||
    !!ilp.accessibility_adjustments;

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE)}>
      <div className="grid grid-cols-1 divide-y divide-white/[0.10] md:grid-cols-[240px_minmax(0,1fr)] md:divide-x md:divide-y-0">
        {/* Progress + meta */}
        <div className="px-4 py-4 sm:px-5">
          <div className="text-[12px] font-medium text-white">Plan progress</div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-[30px] font-semibold leading-none tabular-nums tracking-tight text-white">
              {pct}%
            </span>
            <span className="text-[12px] tabular-nums text-white">
              {rollUp.completed}/{rollUp.total_goals} goals done
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-elec-yellow transition-all duration-500"
              style={{ width: `${Math.min(100, pct)}%` }}
            />
          </div>
          <dl className="mt-4 space-y-1.5 text-[12px]">
            <MetaRow label="Version" value={`v${ilp.version}`} />
            {ilp.target_completion_date && (
              <MetaRow label="Target" value={formatDate(ilp.target_completion_date)} />
            )}
            {ilp.review_date && (
              <MetaRow
                label={reviewOverdue ? 'Review overdue' : 'Next review'}
                value={formatDate(ilp.review_date)}
                tone={reviewOverdue ? 'bad' : undefined}
              />
            )}
            {rollUp.unread_student_comments > 0 && (
              <MetaRow
                label="From learner"
                value={`${rollUp.unread_student_comments} new`}
                tone="volt"
              />
            )}
          </dl>
        </div>

        {/* Headline narrative */}
        <div className="space-y-3.5 px-4 py-4 sm:px-5">
          {ilp.headline_focus && <Block label="Focus" text={ilp.headline_focus} />}
          {ilp.headline_strengths && <Block label="Strengths" text={ilp.headline_strengths} />}
          {ilp.headline_areas && (
            <Block label="Areas for development" text={ilp.headline_areas} />
          )}
          {ilp.support_strategies && (
            <Block label="Support strategies" text={ilp.support_strategies} />
          )}
          {ilp.accessibility_adjustments && (
            <Block label="Accessibility" text={ilp.accessibility_adjustments} />
          )}
          {!hasNarrative && (
            <p className="text-[12.5px] leading-relaxed text-white">
              No headline narrative yet. Edit the ILP to set focus, strengths and support
              strategies.
            </p>
          )}
          {ilp.tutor_name_snapshot && (
            <div className="border-t border-white/[0.10] pt-2.5 text-[11px] text-white">
              Owned by {ilp.tutor_name_snapshot}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetaRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: 'bad' | 'volt';
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className={cn('text-white', tone === 'bad' && 'text-red-300')}>{label}</dt>
      <dd
        className={cn(
          'tabular-nums text-white',
          tone === 'bad' && 'font-semibold text-red-300',
          tone === 'volt' && 'font-semibold text-elec-yellow'
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="text-[11px] font-semibold text-elec-yellow">{label}</div>
      <p className="mt-0.5 whitespace-pre-line text-[12.5px] leading-relaxed text-white">{text}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function GoalsList({
  goals,
  loading,
  first,
  onAddGoal,
  onEditGoal,
  onToggleComplete,
}: {
  goals: IlpGoal[];
  loading: boolean;
  first: string;
  onAddGoal: () => void;
  onEditGoal: (g: IlpGoal) => void;
  onToggleComplete: (g: IlpGoal) => void;
}) {
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE)}>
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.10] px-4 py-3 sm:px-5">
        <div className="text-[13px] font-semibold text-white">
          Goals{goals.length > 0 ? ` · ${goals.length}` : ''}
        </div>
        <button type="button" onClick={onAddGoal} className={ACTION_BTN}>
          Add goal
        </button>
      </div>
      {loading && goals.length === 0 ? (
        <Skeleton />
      ) : goals.length === 0 ? (
        <p className="px-4 py-6 text-[12.5px] leading-relaxed text-white sm:px-5">
          No goals on this plan yet. Add the first one — it appears in {first}'s app for them to
          acknowledge and work on.
        </p>
      ) : (
        <ul className="divide-y divide-white/[0.10]">
          {goals.map((g) => (
            <GoalRow
              key={g.id}
              goal={g}
              onEdit={() => onEditGoal(g)}
              onToggleComplete={() => onToggleComplete(g)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function GoalRow({
  goal,
  onEdit,
  onToggleComplete,
}: {
  goal: IlpGoal;
  onEdit: () => void;
  onToggleComplete: () => void;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const overdue =
    goal.target_date != null &&
    goal.target_date < today &&
    goal.status !== 'completed' &&
    goal.status !== 'cancelled';
  const status: GoalStatus = overdue && goal.status !== 'overdue' ? 'overdue' : goal.status;
  const isComplete = goal.status === 'completed';
  const isProblem = status === 'overdue' || status === 'blocked';
  const newComment =
    !!goal.student_comment_at &&
    (!goal.tutor_comment_at || goal.student_comment_at > goal.tutor_comment_at);

  return (
    <li className="flex items-start gap-1 pl-2 pr-4 sm:pr-5">
      {/* 44px tap area around a 20px tick */}
      <button
        type="button"
        aria-label={isComplete ? 'Mark not done' : 'Mark done'}
        onClick={(e) => {
          e.stopPropagation();
          onToggleComplete();
        }}
        className="mt-1.5 flex h-11 w-11 shrink-0 items-center justify-center touch-manipulation"
      >
        <span
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold transition-colors',
            isComplete
              ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300'
              : 'border-white/40 text-transparent'
          )}
        >
          ✓
        </span>
      </button>
      <button
        type="button"
        onClick={onEdit}
        className="min-w-0 flex-1 py-3.5 text-left touch-manipulation"
      >
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={cn(
              CHIP,
              isProblem ? CHIP_RED : isComplete ? CHIP_GOOD : CHIP_NEUTRAL
            )}
          >
            {STATUS_LABEL[status]}
          </span>
          <span className="text-[11px] text-white">{CATEGORY_LABEL[goal.category]}</span>
          {goal.priority === 'high' && !isComplete && (
            <span className="text-[11px] font-semibold text-elec-yellow">High priority</span>
          )}
          {goal.target_date && (
            <span
              className={cn(
                'text-[11px] tabular-nums',
                overdue ? 'font-semibold text-red-300' : 'text-white'
              )}
            >
              {overdue ? 'Overdue · ' : 'Due '}
              {formatDate(goal.target_date)}
            </span>
          )}
          {goal.source === 'student' && (
            <span className={cn(CHIP, CHIP_VOLT)} title="Apprentice proposed this goal — review and accept, edit, or reject.">
              Apprentice proposed
            </span>
          )}
          {goal.source === 'ai_suggested' && <span className={cn(CHIP, CHIP_NEUTRAL)}>AI suggested</span>}
          {!goal.student_acknowledged && !isComplete && (
            <span className={cn(CHIP, CHIP_NEUTRAL)}>Not yet seen by learner</span>
          )}
          {newComment && <span className={cn(CHIP, CHIP_VOLT)}>New comment</span>}
        </div>
        <h3
          className={cn(
            'mt-1.5 text-[13.5px] font-semibold leading-tight text-white',
            isComplete && 'line-through opacity-70'
          )}
        >
          {goal.title}
        </h3>
        {goal.description && (
          <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-white">
            {goal.description}
          </p>
        )}
        {goal.student_comment && (
          <div className="mt-2 border-l-2 border-white/[0.25] pl-3">
            <div className="text-[10.5px] font-semibold text-white">Learner reply</div>
            <p className="mt-0.5 whitespace-pre-line text-[12px] leading-snug text-white">
              {goal.student_comment}
            </p>
          </div>
        )}
      </button>
    </li>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3 px-4 py-4 animate-pulse sm:px-5">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="h-5 w-5 shrink-0 rounded-full bg-white/[0.08]" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-2/3 rounded bg-white/[0.08]" />
            <div className="h-2 w-1/3 rounded bg-white/[0.05]" />
          </div>
        </div>
      ))}
    </div>
  );
}
