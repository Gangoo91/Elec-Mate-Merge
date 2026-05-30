/**
 * OjtGoalsSection — apprentice-set OTJ goals, rebuilt for the OJT hub.
 *
 * Replaces the legacy /apprentice/ojt "Goals & progress" tab. Reads the same
 * ojt_goals table via useOJTGoals, but renders in the hub's editorial dark
 * style and lives alongside the verified-hours loop rather than on a
 * separate, time_entries-based page.
 */

import { useState } from 'react';
import { Plus, Loader2, Target, Trash2, Minus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useOJTGoals, type OJTGoal } from '@/hooks/time-tracking/useOJTGoals';
import AddGoalDialog from '@/components/apprentice/ojt/AddGoalDialog';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const STATUS_TONE: Record<OJTGoal['status'], string> = {
  completed: 'border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow',
  in_progress: 'border-white/[0.10] bg-white/[0.04] text-white/85',
  pending: 'border-white/[0.10] bg-white/[0.04] text-white/70',
  cancelled: 'border-white/[0.08] bg-white/[0.02] text-white/45',
};

const STATUS_LABEL: Record<OJTGoal['status'], string> = {
  completed: 'Completed',
  in_progress: 'In progress',
  pending: 'Not started',
  cancelled: 'Cancelled',
};

const PRIORITY_TONE: Record<OJTGoal['priority'], string> = {
  high: 'bg-elec-yellow',
  medium: 'bg-white/55',
  low: 'bg-white/30',
};

const fmtDate = (iso: string | null) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  } catch {
    return '';
  }
};

interface GoalPayload {
  title: string;
  description: string;
  targetValue: number;
  unit: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  deadline: string;
}

export function OjtGoalsSection() {
  const { goals, isLoading, addGoal, updateProgress, deleteGoal } = useOJTGoals();
  const [showAdd, setShowAdd] = useState(false);

  const activeGoals = goals.filter((g) => g.status !== 'cancelled');
  const completed = goals.filter((g) => g.status === 'completed').length;

  const handleAdd = (payload: GoalPayload) => {
    void addGoal({
      title: payload.title,
      description: payload.description,
      target_value: payload.targetValue,
      unit: payload.unit,
      priority: payload.priority,
      category: payload.category,
      deadline: payload.deadline,
    });
    setShowAdd(false);
  };

  return (
    <section className="space-y-3">
      <SectionHeader
        eyebrow="Goals"
        title="Your OTJ goals"
        meta={
          goals.length > 0
            ? `${completed}/${goals.length} complete · personal targets you set`
            : 'Set personal targets to keep your training on pace'
        }
        action={
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-elec-yellow text-black text-[12px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.97] transition-all touch-manipulation"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            Add goal
          </button>
        }
      />

      {isLoading ? (
        <div className="flex items-center gap-3 py-6">
          <Loader2 className="h-4 w-4 animate-spin text-white/55" />
          <Eyebrow>Loading…</Eyebrow>
        </div>
      ) : activeGoals.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-6 text-center space-y-2">
          <Target className="h-7 w-7 text-white/25 mx-auto" />
          <p className="text-[13px] text-white/85 leading-relaxed">
            No goals yet. Set a target — e.g. "20 portfolio entries this term" — and track it
            here alongside your hours.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {activeGoals.map((goal) => {
            const target = goal.target_value || 0;
            const current = goal.current_value ?? 0;
            const pct = target > 0 ? Math.min(Math.round((current / target) * 100), 100) : 0;
            const done = goal.status === 'completed';
            return (
              <li
                key={goal.id}
                className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={cn(
                          'inline-flex h-1.5 w-1.5 rounded-full flex-shrink-0',
                          PRIORITY_TONE[goal.priority]
                        )}
                        title={`${goal.priority} priority`}
                      />
                      <span
                        className={cn(
                          'text-[9.5px] font-medium uppercase tracking-[0.14em] px-1.5 py-[1px] rounded-md border whitespace-nowrap',
                          STATUS_TONE[goal.status]
                        )}
                      >
                        {STATUS_LABEL[goal.status]}
                      </span>
                      {goal.category && (
                        <span className="text-[10px] uppercase tracking-[0.14em] text-white/45">
                          {goal.category}
                        </span>
                      )}
                    </div>
                    <p className="text-[14px] font-medium text-white leading-snug break-words">
                      {goal.title}
                    </p>
                    {goal.description && (
                      <p className="text-[12px] text-white/55 leading-snug break-words">
                        {goal.description}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => void deleteGoal(goal.id)}
                    aria-label="Delete goal"
                    className="flex-shrink-0 h-8 w-8 inline-flex items-center justify-center rounded-md text-white/30 hover:text-red-300 hover:bg-red-500/[0.06] transition-colors touch-manipulation"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Progress */}
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[11.5px] text-white/70 tabular-nums">
                      {current} / {target} {goal.unit}
                    </span>
                    <span
                      className={cn(
                        'text-[11.5px] tabular-nums',
                        done ? 'text-elec-yellow' : 'text-white/70'
                      )}
                    >
                      {pct}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-500',
                        done ? 'bg-elec-yellow' : 'bg-white/55'
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Footer — stepper + deadline */}
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => void updateProgress(goal.id, Math.max(0, current - 1))}
                      disabled={current <= 0}
                      aria-label="Decrease progress"
                      className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.02] text-white/85 hover:bg-white/[0.04] disabled:opacity-30 transition-colors touch-manipulation"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => void updateProgress(goal.id, current + 1)}
                      aria-label="Increase progress"
                      className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.02] text-white/85 hover:bg-white/[0.04] transition-colors touch-manipulation"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                    {!done && (
                      <button
                        type="button"
                        onClick={() => void updateProgress(goal.id, target)}
                        className="inline-flex items-center gap-1 h-8 px-2.5 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow text-[11px] font-semibold hover:bg-elec-yellow/[0.12] transition-colors touch-manipulation"
                      >
                        <Check className="h-3 w-3" />
                        Done
                      </button>
                    )}
                  </div>
                  {goal.deadline && (
                    <span className="text-[11px] text-white/45 whitespace-nowrap">
                      Due {fmtDate(goal.deadline)}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <AddGoalDialog open={showAdd} onOpenChange={setShowAdd} onAddGoal={handleAdd} />
    </section>
  );
}

export default OjtGoalsSection;
