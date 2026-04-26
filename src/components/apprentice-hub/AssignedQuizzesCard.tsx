import { useNavigate } from 'react-router-dom';
import { Brain, Check, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMyAssignedQuizzes, type AssignedQuiz } from '@/hooks/useMyAssignedQuizzes';

/* ==========================================================================
   AssignedQuizzesCard — apprentice-side card listing every quiz a tutor or
   assessor has sent. Sorted by: overdue → due soon → not_started → in_progress
   → completed. One-tap "Take quiz" / "Resume" / "View results".
   ========================================================================== */

const STATUS_PRIORITY: Record<AssignedQuiz['status'], number> = {
  overdue: 0,
  in_progress: 1,
  not_started: 2,
  completed: 3,
};

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  const today = new Date();
  const diffDays = Math.round((d.getTime() - today.setHours(0, 0, 0, 0)) / 86_400_000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function AssignedQuizzesCard() {
  const navigate = useNavigate();
  const { quizzes, loading } = useMyAssignedQuizzes();

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4 animate-pulse h-[140px]" />
    );
  }

  if (quizzes.length === 0) return null;

  const sorted = [...quizzes].sort(
    (a, b) =>
      STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status] ||
      (a.due_date ?? '9999').localeCompare(b.due_date ?? '9999')
  );

  const pendingCount = quizzes.filter((q) => q.status !== 'completed').length;
  const overdueCount = quizzes.filter((q) => q.status === 'overdue').length;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] overflow-hidden">
      <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-blue-500/[0.14] border border-blue-400/30 flex items-center justify-center">
            <Brain className="h-4 w-4 text-blue-200" />
          </div>
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              From your tutor
            </div>
            <div className="mt-0.5 text-[11px] text-white/85 tabular-nums">
              {pendingCount} pending
              {overdueCount > 0 && (
                <>
                  <span className="mx-1.5 text-white/35">·</span>
                  <span className="text-red-300">{overdueCount} overdue</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <ul className="divide-y divide-white/[0.04]">
        {sorted.slice(0, 6).map((q) => (
          <li key={q.id}>
            <QuizRow
              q={q}
              onClick={() => navigate(`/apprentice/college/quiz/${q.id}`)}
            />
          </li>
        ))}
      </ul>

      {sorted.length > 6 && (
        <button
          type="button"
          onClick={() => navigate('/apprentice/quizzes')}
          className="w-full px-5 py-3 text-[11.5px] font-medium text-white hover:bg-white/[0.03] border-t border-white/[0.04] touch-manipulation"
        >
          View all {sorted.length} quizzes →
        </button>
      )}
    </div>
  );
}

function QuizRow({ q, onClick }: { q: AssignedQuiz; onClick: () => void }) {
  const statusMeta = (() => {
    if (q.status === 'overdue')
      return {
        icon: <AlertTriangle className="h-3.5 w-3.5 text-red-300" />,
        label: 'Overdue',
        cls: 'bg-red-500/[0.10] border-red-500/30 text-red-200',
      };
    if (q.status === 'completed')
      return {
        icon: <Check className="h-3.5 w-3.5 text-emerald-300" strokeWidth={3} />,
        label:
          q.best_percentage != null
            ? `Done · ${q.best_percentage}%`
            : 'Completed',
        cls: 'bg-emerald-500/[0.10] border-emerald-400/30 text-emerald-200',
      };
    if (q.status === 'in_progress')
      return {
        icon: <Clock className="h-3.5 w-3.5 text-amber-300" />,
        label: 'Resume',
        cls: 'bg-amber-500/[0.10] border-amber-400/30 text-amber-200',
      };
    return {
      icon: <ArrowRight className="h-3.5 w-3.5 text-blue-200" />,
      label: 'Start',
      cls: 'bg-blue-500/[0.10] border-blue-400/30 text-blue-200',
    };
  })();

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full px-5 py-3 flex items-center gap-3 text-left hover:bg-white/[0.02] transition-colors touch-manipulation"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[13px] font-medium text-white truncate">{q.title}</span>
          {q.kind === 'assessment' && (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-cyan-500/[0.10] border border-cyan-400/30 text-[9px] font-semibold tracking-[0.06em] uppercase text-cyan-200">
              Assessment
            </span>
          )}
          {q.kind === 'mock_exam' && (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-orange-500/[0.10] border border-orange-400/30 text-[9px] font-semibold tracking-[0.06em] uppercase text-orange-200">
              Mock exam
            </span>
          )}
          {q.source === 'ai_authored' && (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-elec-yellow/[0.10] border border-elec-yellow/30 text-[9px] font-semibold tracking-[0.06em] uppercase text-elec-yellow">
              AI
            </span>
          )}
          {q.is_homework && (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-purple-500/[0.10] border border-purple-400/30 text-[9px] font-semibold tracking-[0.06em] uppercase text-purple-200">
              Homework
            </span>
          )}
        </div>
        <div className="mt-0.5 text-[10.5px] text-white tabular-nums">
          {q.questions_count} questions
          {q.time_limit_minutes && (
            <>
              <span className="mx-1.5 text-white/35">·</span>
              <span>{q.time_limit_minutes}m</span>
            </>
          )}
          {q.pass_mark != null && (
            <>
              <span className="mx-1.5 text-white/35">·</span>
              <span>{q.pass_mark}% to pass</span>
            </>
          )}
          {q.due_date && (
            <>
              <span className="mx-1.5 text-white/35">·</span>
              <span className={cn(q.status === 'overdue' && 'text-red-300')}>
                Due {formatDate(q.due_date)}
              </span>
            </>
          )}
        </div>
      </div>
      <span
        className={cn(
          'inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full border text-[11px] font-semibold tracking-tight whitespace-nowrap',
          statusMeta.cls
        )}
      >
        {statusMeta.icon}
        {statusMeta.label}
      </span>
    </button>
  );
}
