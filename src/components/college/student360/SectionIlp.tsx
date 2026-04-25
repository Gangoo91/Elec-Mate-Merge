import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Pill, type Tone } from '@/components/college/primitives';
import {
  useStudentIlp,
  type IlpGoal,
  type GoalCategory,
  type GoalPriority,
  type GoalStatus,
} from '@/hooks/useStudentIlp';
import { IlpEditorSheet } from '@/components/college/sheets/IlpEditorSheet';
import { IlpGoalSheet } from '@/components/college/sheets/IlpGoalSheet';

/* ==========================================================================
   SectionIlp — bidirectional Individual Learning Plan panel.
   Tutors edit headline + goals; learners can tick off goals + comment back.
   ========================================================================== */

const STATUS_TONE: Record<GoalStatus, Tone> = {
  not_started: 'cyan',
  in_progress: 'blue',
  completed: 'emerald',
  blocked: 'red',
  overdue: 'amber',
  cancelled: 'cyan',
};

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

const PRIORITY_DOT: Record<GoalPriority, string> = {
  low: 'bg-white/30',
  medium: 'bg-elec-yellow/85',
  high: 'bg-red-400/85',
};

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
}: {
  id: string;
  studentName: string;
  collegeStudentId: string | null;
}) {
  const hook = useStudentIlp({ collegeStudentId });
  const { ilp, goals, rollUp, loading } = hook;

  const [editorOpen, setEditorOpen] = useState(false);
  const [goalSheetOpen, setGoalSheetOpen] = useState<{
    mode: 'add' | 'edit';
    goal?: IlpGoal;
  } | null>(null);

  if (!collegeStudentId) {
    return (
      <section id={id} className="scroll-mt-6">
        <Header onEdit={null} />
      </section>
    );
  }

  return (
    <section id={id} className="scroll-mt-6">
      <Header
        onEdit={() => setEditorOpen(true)}
        rollUp={rollUp}
        hasIlp={!!ilp}
      />

      {!ilp && !loading ? (
        <div className="mt-5 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-8 text-center">
          <p className="text-[12.5px] text-white/65 max-w-md mx-auto leading-relaxed">
            No ILP yet for {studentName.split(' ')[0]}. Create one to set personalised
            goals and support strategies that {studentName.split(' ')[0]} can see in their
            app and tick off as they complete them.
          </p>
          <button
            type="button"
            onClick={() => setEditorOpen(true)}
            className="mt-4 inline-flex items-center justify-center h-10 px-4 rounded-full bg-elec-yellow text-black text-[12.5px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation"
          >
            Create ILP
          </button>
        </div>
      ) : ilp ? (
        <>
          <HeadlineCard ilp={ilp} rollUp={rollUp} />
          <GoalsList
            goals={goals}
            loading={loading}
            studentName={studentName}
            onAddGoal={() => setGoalSheetOpen({ mode: 'add' })}
            onEditGoal={(g) => setGoalSheetOpen({ mode: 'edit', goal: g })}
            onToggleComplete={(g) => hook.toggleGoalComplete(g.id, g.status !== 'completed')}
          />
        </>
      ) : (
        <Skeleton />
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
      />
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */

function Header({
  onEdit,
  rollUp,
  hasIlp,
}: {
  onEdit: (() => void) | null;
  rollUp?: ReturnType<typeof useStudentIlp>['rollUp'];
  hasIlp?: boolean;
}) {
  return (
    <div className="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Individual learning plan
        </div>
        <h2 className="mt-1.5 text-xl sm:text-[26px] font-semibold text-white tracking-tight leading-tight">
          ILP
        </h2>
        {rollUp && rollUp.total_goals > 0 && (
          <div className="mt-1 text-[11px] text-white/55 tabular-nums">
            {rollUp.completed}/{rollUp.total_goals} complete
            {rollUp.unread_student_comments > 0 && (
              <span className="ml-2 text-amber-300">
                · {rollUp.unread_student_comments} new from learner
              </span>
            )}
          </div>
        )}
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="text-[12px] font-medium text-elec-yellow/85 hover:text-elec-yellow transition-colors touch-manipulation no-print"
        >
          {hasIlp ? 'Edit ILP →' : 'Create ILP →'}
        </button>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function HeadlineCard({
  ilp,
  rollUp,
}: {
  ilp: NonNullable<ReturnType<typeof useStudentIlp>['ilp']>;
  rollUp: ReturnType<typeof useStudentIlp>['rollUp'];
}) {
  const pct = rollUp.completion_percent;
  const ringColour =
    pct >= 80
      ? 'stroke-emerald-400'
      : pct >= 50
        ? 'stroke-elec-yellow'
        : pct >= 25
          ? 'stroke-amber-400'
          : 'stroke-red-400';

  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-4">
      {/* Progress ring + meta */}
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Plan progress
        </div>
        <div className="mt-3 flex items-center gap-4">
          <div className="relative h-[88px] w-[88px] flex-shrink-0">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" strokeWidth="2.5" className="stroke-white/[0.08]" />
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
              <div className="text-[18px] font-semibold text-white tabular-nums leading-none">
                {pct}
                <span className="text-[11px] text-white/65">%</span>
              </div>
              <div className="text-[9.5px] uppercase tracking-[0.14em] text-white/50 mt-0.5">
                done
              </div>
            </div>
          </div>
          <div className="min-w-0 flex-1 text-[11px] leading-snug">
            <div className="text-white/45">Version</div>
            <div className="text-white tabular-nums">v{ilp.version}</div>
            {ilp.target_completion_date && (
              <>
                <div className="text-white/45 mt-1.5">Target</div>
                <div className="text-white tabular-nums">{formatDate(ilp.target_completion_date)}</div>
              </>
            )}
            {ilp.review_date && (
              <>
                <div className="text-white/45 mt-1.5">Next review</div>
                <div className="text-white tabular-nums">{formatDate(ilp.review_date)}</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Headline narrative */}
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5 space-y-3">
        {ilp.headline_focus ? (
          <Block label="Focus" tone="yellow" text={ilp.headline_focus} />
        ) : null}
        {ilp.headline_strengths && (
          <Block label="Strengths" tone="emerald" text={ilp.headline_strengths} />
        )}
        {ilp.headline_areas && (
          <Block label="Areas for development" tone="amber" text={ilp.headline_areas} />
        )}
        {ilp.support_strategies && (
          <Block label="Support strategies" tone="blue" text={ilp.support_strategies} />
        )}
        {ilp.accessibility_adjustments && (
          <Block label="Accessibility" tone="purple" text={ilp.accessibility_adjustments} />
        )}
        {!ilp.headline_focus &&
          !ilp.headline_strengths &&
          !ilp.headline_areas &&
          !ilp.support_strategies &&
          !ilp.accessibility_adjustments && (
            <p className="text-[12px] text-white/55">
              No headline narrative yet. Edit the ILP to set focus, strengths and support
              strategies.
            </p>
          )}
        {ilp.tutor_name_snapshot && (
          <div className="pt-2 border-t border-white/[0.06] text-[10.5px] text-white/45 tabular-nums">
            Owned by {ilp.tutor_name_snapshot}
          </div>
        )}
      </div>
    </div>
  );
}

function Block({
  label,
  tone,
  text,
}: {
  label: string;
  tone: 'emerald' | 'amber' | 'blue' | 'purple' | 'yellow';
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
          tone === 'purple' ? 'text-purple-300/85' :
          'text-elec-yellow/85'
        )}
      >
        {label}
      </div>
      <p className="text-[12.5px] text-white/85 leading-relaxed whitespace-pre-line">{text}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function GoalsList({
  goals,
  loading,
  studentName,
  onAddGoal,
  onEditGoal,
  onToggleComplete,
}: {
  goals: IlpGoal[];
  loading: boolean;
  studentName: string;
  onAddGoal: () => void;
  onEditGoal: (g: IlpGoal) => void;
  onToggleComplete: (g: IlpGoal) => void;
}) {
  return (
    <div className="mt-4">
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Goals
          </div>
          <button
            type="button"
            onClick={onAddGoal}
            className="text-[11.5px] font-medium text-elec-yellow/85 hover:text-elec-yellow transition-colors touch-manipulation"
          >
            Add goal +
          </button>
        </div>
        {loading && goals.length === 0 ? (
          <Skeleton />
        ) : goals.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="text-[12.5px] text-white/65 max-w-md mx-auto leading-relaxed">
              No goals on this ILP yet. Add the first one — it'll appear in
              {' '}{studentName.split(' ')[0]}'s app for them to acknowledge and work on.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.04]">
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

  return (
    <li className="px-5 py-3.5 flex items-start gap-3">
      <button
        type="button"
        aria-label={isComplete ? 'Mark not done' : 'Mark done'}
        onClick={(e) => {
          e.stopPropagation();
          onToggleComplete();
        }}
        className={cn(
          'mt-0.5 h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-colors touch-manipulation',
          isComplete
            ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300'
            : 'border-white/25 text-transparent hover:border-white/55'
        )}
      >
        ✓
      </button>
      <button
        type="button"
        onClick={onEdit}
        className="min-w-0 flex-1 text-left touch-manipulation"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span aria-hidden className={cn('inline-block h-1.5 w-1.5 rounded-full', PRIORITY_DOT[goal.priority])} />
          <Pill tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Pill>
          <span className="text-[10.5px] uppercase tracking-[0.12em] text-white/55">
            {CATEGORY_LABEL[goal.category]}
          </span>
          {goal.target_date && (
            <span
              className={cn(
                'text-[10.5px] tabular-nums',
                overdue ? 'text-red-300' : 'text-white/55'
              )}
            >
              {overdue ? 'Overdue · ' : 'Due '}
              {formatDate(goal.target_date)}
            </span>
          )}
          {!goal.student_acknowledged && (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-amber-500/[0.1] border border-amber-500/30 text-[9px] font-semibold tracking-[0.06em] uppercase text-amber-200">
              Unread
            </span>
          )}
          {goal.student_comment_at && (!goal.tutor_comment_at || goal.student_comment_at > goal.tutor_comment_at) && (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-blue-500/[0.1] border border-blue-500/30 text-[9px] font-semibold tracking-[0.06em] uppercase text-blue-200">
              New comment
            </span>
          )}
        </div>
        <h3 className={cn('mt-1.5 text-[13.5px] font-medium leading-tight', isComplete ? 'text-white/55 line-through' : 'text-white')}>
          {goal.title}
        </h3>
        {goal.description && (
          <p className="mt-0.5 text-[11.5px] text-white/65 leading-snug line-clamp-2">
            {goal.description}
          </p>
        )}
        {goal.student_comment && (
          <div className="mt-2 px-3 py-2 rounded-lg bg-blue-500/[0.05] border border-blue-500/[0.18]">
            <div className="text-[9.5px] uppercase tracking-[0.14em] text-blue-300/85 mb-0.5">
              Learner reply
            </div>
            <p className="text-[11.5px] text-white/85 leading-snug whitespace-pre-line">
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
    <div className="px-5 py-4 space-y-2.5 animate-pulse">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="h-5 w-5 rounded-full bg-white/[0.06] flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-2/3 rounded bg-white/[0.06]" />
            <div className="h-2 w-1/3 rounded bg-white/[0.04]" />
          </div>
        </div>
      ))}
    </div>
  );
}
