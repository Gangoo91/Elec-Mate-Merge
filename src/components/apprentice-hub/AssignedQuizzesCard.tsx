import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LC_FRAME, lcChip } from '@/components/apprentice-hub/college-hub/learnerUi';
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
  if (!iso) return 'No date';
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
  const [showAll, setShowAll] = useState(false);

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
    return <div className={cn(LC_FRAME, 'h-[180px] animate-pulse')} aria-hidden />;
  }

  if (quizzes.length === 0) {
    return (
      <Section eyebrow="Quizzes and assessments" subtle="Nothing yet">
        <p className="text-[13px] sm:text-[13.5px] text-white leading-relaxed">
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
  const visible = showAll ? sorted : sorted.slice(0, 6);
  const overflow = sorted.length - visible.length;

  return (
    <Section
      eyebrow="Quizzes and assessments"
      subtle={
        overdueCount > 0
          ? `${pendingCount} to do, ${overdueCount} overdue`
          : pendingCount > 0
            ? `${pendingCount} to do`
            : 'All done'
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
          onClick={() => setShowAll(true)}
          className="inline-flex h-11 items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
        >
          Show all {sorted.length}
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
    <section className={cn(LC_FRAME, accent && 'sm:border-white/[0.16]')}>
      <header className="flex items-start justify-between gap-3 px-4 pb-2 pt-4 sm:px-5">
        {/* Typography only, like every College Hub card title. */}
        <h3 className="text-[15px] font-semibold tracking-tight text-white">{eyebrow}</h3>
        {subtle && (
          <span className={lcChip(subtleTone === 'red' ? 'action' : 'neutral')}>{subtle}</span>
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
    <div className="mb-1 flex items-center justify-between gap-3">
      <p className="text-[13px] font-semibold leading-snug text-white">{headline}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="inline-flex h-11 flex-shrink-0 items-center px-1 text-[13px] font-semibold text-white touch-manipulation"
      >
        Got it
      </button>
    </div>
  );
}

function QuizRow({ q, isNew, onClick }: { q: AssignedQuiz; isNew: boolean; onClick: () => void }) {
  const statusMeta = (() => {
    if (q.status === 'overdue')
      return { label: 'Overdue', cls: 'text-orange-300 font-semibold', accentLabel: 'Open' };
    if (q.status === 'completed') {
      /*
       * A completed quiz below the pass mark used to read exactly like one
       * above it — "33%" and "67%" both in plain white, both labelled "View".
       * The score is the whole signal on this row, so a below-pass result
       * takes volt: the app's "this needs you" colour.
       *
       * The label stays neutral. Every row navigates to the same quiz page
       * whatever its status, and that page decides whether a retake is
       * offered — so promising "Retake" here could be a lie.
       */
      const belowPass =
        q.best_percentage != null && q.pass_mark != null && q.best_percentage < q.pass_mark;
      return {
        label: q.best_percentage != null ? `${q.best_percentage}%` : 'Completed',
        cls: belowPass ? 'text-orange-300 font-semibold' : 'text-white',
        accentLabel: 'Open',
      };
    }
    if (q.status === 'in_progress')
      return { label: 'In progress', cls: 'text-white', accentLabel: 'Resume' };
    return { label: kindWord(q.kind), cls: 'text-white', accentLabel: 'Start' };
  })();

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group -mx-4 flex min-h-[60px] w-[calc(100%+2rem)] items-center gap-4 px-4 py-3.5 text-left transition-colors touch-manipulation sm:-mx-5 sm:w-[calc(100%+2.5rem)] sm:px-5',
        'hover:bg-white/[0.04] active:bg-white/[0.07]'
      )}
    >
      <div className="min-w-0 flex-1">
        {/* Title */}
        <h3 className="text-[14.5px] sm:text-[14px] font-medium text-white leading-snug tracking-tight">
          <span className="break-words">{q.title}</span>
          {isNew && <span className={cn(lcChip('action'), 'ml-2 align-middle')}>New</span>}
        </h3>

        {/* Meta line — single sentence rather than chips */}
        <p className="mt-1 text-[12.5px] text-white tabular-nums leading-relaxed">
          <span className={statusMeta.cls}>{statusMeta.label}</span>
          <Sep />
          <span>
            {q.questions_count} {q.questions_count === 1 ? 'question' : 'questions'}
          </span>
          {q.time_limit_minutes ? (
            <>
              <Sep />
              <span>{q.time_limit_minutes} min</span>
            </>
          ) : null}
          {q.pass_mark != null && q.status !== 'completed' && (
            <>
              <Sep />
              <span>{q.pass_mark}% to pass</span>
            </>
          )}
          {q.due_date && q.status !== 'completed' && (
            <>
              <Sep />
              <span className={cn(q.status === 'overdue' && 'text-orange-300 font-semibold')}>
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
          {q.status === 'completed' && q.marking === 'awaiting' && (
            <>
              <Sep />
              <span>Waiting for your tutor to mark</span>
            </>
          )}
          {q.status === 'completed' && q.marking === 'marked' && (
            <>
              <Sep />
              <span className="text-emerald-300">Marked by your tutor</span>
            </>
          )}
        </p>
      </div>

      <span className="inline-flex h-11 flex-shrink-0 items-center gap-1 whitespace-nowrap rounded-xl border border-white/[0.14] px-3 text-[13.5px] font-semibold text-white">
        {statusMeta.accentLabel}
        <ChevronRight className="h-4 w-4" aria-hidden />
      </span>
    </button>
  );
}

function Sep() {
  return <span className="mx-1.5 text-white">·</span>;
}
