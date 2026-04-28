import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useMyAssignedQuizzes, type AssignedQuiz } from '@/hooks/useMyAssignedQuizzes';

/* ==========================================================================
   AssignedQuizzesCard — editorial.

   No decorative icons, no badges-everywhere. Typographic hierarchy carries
   the meaning: section eyebrow → list of items, each with a title, a meta
   line, and one subtle status pill. Yellow only shows up when something
   genuinely new arrives. Designed to read like a college reading list.
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

function kindWord(kind: AssignedQuiz['kind']): string {
  if (kind === 'mock_exam') return 'Mock exam';
  if (kind === 'assessment') return 'Assessment';
  return 'Quiz';
}

const SEEN_KEY = 'em_seen_assigned_quizzes';
const NEW_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

function loadSeen(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(SEEN_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function saveSeen(set: Set<string>): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SEEN_KEY, JSON.stringify(Array.from(set)));
  } catch {
    /* ignore */
  }
}

export function AssignedQuizzesCard() {
  const navigate = useNavigate();
  const { quizzes, loading } = useMyAssignedQuizzes();
  const [seen, setSeen] = useState<Set<string>>(() => loadSeen());

  useEffect(() => {
    saveSeen(seen);
  }, [seen]);

  const newQuizzes = useMemo(() => {
    const now = Date.now();
    return quizzes.filter((q) => {
      if (q.status !== 'not_started') return false;
      if (seen.has(q.id)) return false;
      if (!q.published_at) return false;
      const t = new Date(q.published_at).getTime();
      return Number.isFinite(t) && now - t < NEW_WINDOW_MS;
    });
  }, [quizzes, seen]);

  const dismissAllNew = () => {
    setSeen((prev) => {
      const next = new Set(prev);
      for (const q of newQuizzes) next.add(q.id);
      return next;
    });
  };

  const openQuiz = (id: string) => {
    setSeen((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    navigate(`/apprentice/college/quiz/${id}`);
  };

  if (loading) {
    return <div className="h-[180px] animate-pulse rounded-2xl bg-[hsl(0_0%_12%)]/60" />;
  }

  if (quizzes.length === 0) {
    return (
      <Section eyebrow="Quizzes & assessments" subtle="Nothing yet">
        <p className="text-[13px] sm:text-[13.5px] text-white/90 leading-relaxed">
          Quizzes and assessments will appear here when your tutor sends them.
        </p>
      </Section>
    );
  }

  const sorted = [...quizzes].sort(
    (a, b) =>
      STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status] ||
      (a.due_date ?? '9999').localeCompare(b.due_date ?? '9999')
  );

  const pendingCount = quizzes.filter((q) => q.status !== 'completed').length;
  const overdueCount = quizzes.filter((q) => q.status === 'overdue').length;
  const visible = sorted.slice(0, 6);
  const overflow = sorted.length - visible.length;

  return (
    <Section
      eyebrow="Quizzes & assessments"
      subtle={
        overdueCount > 0
          ? `${pendingCount} pending · ${overdueCount} overdue`
          : `${pendingCount} pending`
      }
      subtleTone={overdueCount > 0 ? 'red' : undefined}
      accent={newQuizzes.length > 0}
    >
      {newQuizzes.length > 0 && (
        <NewArrivalsBanner newQuizzes={newQuizzes} onDismiss={dismissAllNew} />
      )}

      <ul className="divide-y divide-white/[0.06]">
        {visible.map((q) => {
          const isNew = newQuizzes.some((n) => n.id === q.id);
          return (
            <li key={q.id}>
              <QuizRow q={q} isNew={isNew} onClick={() => openQuiz(q.id)} />
            </li>
          );
        })}
      </ul>

      {overflow > 0 && (
        <button
          type="button"
          onClick={() => navigate('/apprentice/quizzes')}
          className="w-full px-1 py-3 text-left text-[12px] font-medium text-white/90 hover:text-white touch-manipulation transition-colors"
        >
          View all {sorted.length} →
        </button>
      )}
    </Section>
  );
}

/* ────────────────── Editorial primitives ────────────────── */

function Section({
  eyebrow,
  subtle,
  subtleTone,
  accent,
  children,
}: {
  eyebrow: string;
  subtle?: string;
  subtleTone?: 'red';
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        'rounded-2xl border bg-[hsl(0_0%_10%)] overflow-hidden',
        accent ? 'border-elec-yellow/30' : 'border-white/[0.06]'
      )}
    >
      <header className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-white">
          {eyebrow}
        </h2>
        {subtle && (
          <span
            className={cn(
              'text-[11px] tabular-nums whitespace-nowrap',
              subtleTone === 'red' ? 'text-red-300' : 'text-white/85'
            )}
          >
            {subtle}
          </span>
        )}
      </header>
      <div className="px-4 sm:px-5 pb-2 sm:pb-3">{children}</div>
    </section>
  );
}

function NewArrivalsBanner({
  newQuizzes,
  onDismiss,
}: {
  newQuizzes: AssignedQuiz[];
  onDismiss: () => void;
}) {
  const headline = (() => {
    if (newQuizzes.length === 1) {
      const q = newQuizzes[0];
      const who = q.tutor_name ? q.tutor_name.split(' ')[0] : 'Your tutor';
      return `${who} has sent you a new ${kindWord(q.kind).toLowerCase()}`;
    }
    const tutors = Array.from(
      new Set(newQuizzes.map((q) => q.tutor_name?.split(' ')[0]).filter((n): n is string => !!n))
    );
    if (tutors.length === 1) {
      return `${tutors[0]} has sent you ${newQuizzes.length} new items`;
    }
    return `${newQuizzes.length} new items from your tutor`;
  })();

  return (
    <div className="-mt-1 mb-2 flex items-baseline justify-between gap-3 border-l-2 border-elec-yellow pl-3">
      <p className="text-[12.5px] sm:text-[13px] font-medium text-white leading-snug">{headline}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="text-[11px] text-white/85 hover:text-white touch-manipulation flex-shrink-0"
      >
        Got it
      </button>
    </div>
  );
}

function QuizRow({ q, isNew, onClick }: { q: AssignedQuiz; isNew: boolean; onClick: () => void }) {
  const statusMeta = (() => {
    if (q.status === 'overdue')
      return { label: 'Overdue', cls: 'text-red-300', accentLabel: 'Open' };
    if (q.status === 'completed')
      return {
        label: q.best_percentage != null ? `${q.best_percentage}%` : 'Completed',
        cls: 'text-emerald-300',
        accentLabel: 'View',
      };
    if (q.status === 'in_progress')
      return { label: 'In progress', cls: 'text-amber-300', accentLabel: 'Resume' };
    return { label: kindWord(q.kind), cls: 'text-white/90', accentLabel: 'Start' };
  })();

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group w-full -mx-4 sm:-mx-5 px-4 sm:px-5 py-3.5 flex items-baseline gap-4 text-left transition-colors touch-manipulation',
        'hover:bg-white/[0.02] active:bg-white/[0.04]'
      )}
    >
      <div className="min-w-0 flex-1">
        {/* Title */}
        <h3 className="text-[14.5px] sm:text-[14px] font-medium text-white leading-snug tracking-tight">
          <span className="break-words">{q.title}</span>
          {isNew && (
            <span className="ml-2 align-middle text-[9.5px] font-bold tracking-[0.12em] uppercase text-elec-yellow">
              New
            </span>
          )}
        </h3>

        {/* Meta line — single sentence rather than chips */}
        <p className="mt-1 text-[11.5px] sm:text-[11px] text-white/85 tabular-nums leading-relaxed">
          <span className={statusMeta.cls}>{statusMeta.label}</span>
          <Sep />
          <span>{q.questions_count} questions</span>
          {q.time_limit_minutes && (
            <>
              <Sep />
              <span>{q.time_limit_minutes} min</span>
            </>
          )}
          {q.pass_mark != null && q.status !== 'completed' && (
            <>
              <Sep />
              <span>{q.pass_mark}% to pass</span>
            </>
          )}
          {q.due_date && q.status !== 'completed' && (
            <>
              <Sep />
              <span className={cn(q.status === 'overdue' && 'text-red-300 font-medium')}>
                Due {formatDate(q.due_date)}
              </span>
            </>
          )}
          {q.is_homework && (
            <>
              <Sep />
              <span>Homework</span>
            </>
          )}
        </p>
      </div>

      <span className="text-[12px] sm:text-[11.5px] font-medium text-elec-yellow whitespace-nowrap flex-shrink-0 group-hover:text-elec-yellow group-hover:underline underline-offset-4">
        {statusMeta.accentLabel} →
      </span>
    </button>
  );
}

function Sep() {
  return <span className="mx-1.5 text-white/25">·</span>;
}
