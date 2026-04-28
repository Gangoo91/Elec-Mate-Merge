import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Filter,
  Brain,
  Sparkles,
  FileText,
  Users,
  Clock,
  AlertTriangle,
  Check,
  TrendingUp,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageFrame, LoadingState } from '@/components/college/primitives';
import { useTutorQuizzes, type TutorQuizListItem, type TutorQuizKind } from '@/hooks/useTutorQuizzes';
import { rowsToCsv, downloadCsv } from '@/lib/csv';
import { useToast } from '@/hooks/use-toast';

/* ==========================================================================
   TutorQuizzesPage — /college/quizzes
   Every quiz / assessment / mock-exam the tutor has created, with attempt
   stats, filters, and click-through to a per-quiz detail page.
   ========================================================================== */

type StatusFilter = 'all' | 'published' | 'draft' | 'overdue' | 'needs_review';
type KindFilter = 'all' | TutorQuizKind;
type SortKey = 'recent' | 'completion' | 'avg' | 'pass_rate';

export default function TutorQuizzesPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { quizzes, loading } = useTutorQuizzes();
  const [status, setStatus] = useState<StatusFilter>('all');
  const [kind, setKind] = useState<KindFilter>('all');
  const [sort, setSort] = useState<SortKey>('recent');

  const handleExportCsv = () => {
    const list = filtered;
    if (list.length === 0) {
      toast({ title: 'Nothing to export', description: 'Filter matches no quizzes.' });
      return;
    }
    const rows = list.map((q) => ({
      title: q.title,
      kind: q.kind,
      status: q.is_published ? 'published' : 'draft',
      qualification: q.qualification_code ?? '',
      cohort: q.cohort_name ?? '',
      questions: q.questions_count,
      time_limit_minutes: q.time_limit_minutes ?? '',
      pass_mark_percent: q.pass_mark ?? '',
      is_homework: q.is_homework ? 'yes' : 'no',
      due_date: q.due_date ?? '',
      assigned: q.assigned_count,
      completed: q.completed_count,
      in_progress: q.in_progress_count,
      overdue: q.overdue_count,
      ai_marks_pending: q.pending_ai_grade_count,
      avg_score_percent: q.avg_percentage ?? '',
      pass_rate_percent: q.pass_rate_percent ?? '',
      source: q.source ?? '',
      from_document: q.source_document_id ? 'yes' : 'no',
      created_at: q.created_at ?? '',
      published_at: q.published_at ?? '',
      quiz_id: q.id,
    }));
    const csv = rowsToCsv(rows, [
      { key: 'title', header: 'Title' },
      { key: 'kind', header: 'Kind' },
      { key: 'status', header: 'Status' },
      { key: 'qualification', header: 'Qualification' },
      { key: 'cohort', header: 'Cohort' },
      { key: 'questions', header: 'Questions' },
      { key: 'time_limit_minutes', header: 'Time limit (min)' },
      { key: 'pass_mark_percent', header: 'Pass mark %' },
      { key: 'is_homework', header: 'Homework' },
      { key: 'due_date', header: 'Due date' },
      { key: 'assigned', header: 'Assigned' },
      { key: 'completed', header: 'Completed' },
      { key: 'in_progress', header: 'In progress' },
      { key: 'overdue', header: 'Overdue' },
      { key: 'ai_marks_pending', header: 'AI marks pending' },
      { key: 'avg_score_percent', header: 'Avg score %' },
      { key: 'pass_rate_percent', header: 'Pass rate %' },
      { key: 'source', header: 'Source' },
      { key: 'from_document', header: 'From document' },
      { key: 'created_at', header: 'Created at' },
      { key: 'published_at', header: 'Published at' },
      { key: 'quiz_id', header: 'Quiz ID' },
    ]);
    const stamp = new Date().toISOString().slice(0, 10);
    downloadCsv(csv, `tutor-quizzes-${stamp}.csv`);
    toast({ title: 'CSV exported', description: `${rows.length} quizzes` });
  };

  const filtered = useMemo(() => {
    let list = [...quizzes];
    if (status === 'published') list = list.filter((q) => q.is_published);
    else if (status === 'draft') list = list.filter((q) => !q.is_published);
    else if (status === 'overdue') list = list.filter((q) => q.overdue_count > 0);
    else if (status === 'needs_review') list = list.filter((q) => q.pending_ai_grade_count > 0);
    if (kind !== 'all') list = list.filter((q) => q.kind === kind);

    if (sort === 'recent') {
      list.sort(
        (a, b) =>
          new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime()
      );
    } else if (sort === 'completion') {
      list.sort((a, b) => completionRatio(b) - completionRatio(a));
    } else if (sort === 'avg') {
      list.sort((a, b) => (b.avg_percentage ?? -1) - (a.avg_percentage ?? -1));
    } else if (sort === 'pass_rate') {
      list.sort((a, b) => (b.pass_rate_percent ?? -1) - (a.pass_rate_percent ?? -1));
    }
    return list;
  }, [quizzes, status, kind, sort]);

  const counts = useMemo(() => {
    return {
      total: quizzes.length,
      published: quizzes.filter((q) => q.is_published).length,
      draft: quizzes.filter((q) => !q.is_published).length,
      overdue: quizzes.reduce((s, q) => s + q.overdue_count, 0),
      needs_review: quizzes.reduce((s, q) => s + q.pending_ai_grade_count, 0),
      assigned: quizzes.reduce((s, q) => s + q.assigned_count, 0),
      completed: quizzes.reduce((s, q) => s + q.completed_count, 0),
    };
  }, [quizzes]);

  return (
    <PageFrame className="max-w-[1280px] pb-24">
      <button
        onClick={() => navigate(-1)}
        className="text-[12px] font-medium text-white hover:text-elec-yellow transition-colors"
      >
        ← Back
      </button>

      <div className="mt-4">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Cohort assessments
        </div>
        <h1 className="mt-1.5 text-[26px] sm:text-[32px] font-semibold text-white tracking-tight leading-tight">
          Quizzes &amp; assessments
        </h1>
        <p className="mt-2 text-[13px] text-white max-w-2xl leading-relaxed">
          Every quiz, assessment and mock exam you've authored, with live attempt stats and
          one-tap drill-down to AI grades you can override.
        </p>
      </div>

      {/* Counts strip */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <CountTile label="Total" value={counts.total} />
        <CountTile label="Published" value={counts.published} tone="emerald" />
        <CountTile label="Drafts" value={counts.draft} tone="amber" />
        <CountTile
          label="AI marks pending"
          value={counts.needs_review}
          tone={counts.needs_review > 0 ? 'amber' : undefined}
        />
      </div>

      <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <CountTile
          label="Assignments"
          value={counts.assigned}
          sub={`${counts.completed} completed`}
        />
        <CountTile
          label="Overdue"
          value={counts.overdue}
          tone={counts.overdue > 0 ? 'red' : undefined}
        />
      </div>

      {/* Filter toolbar */}
      <div className="mt-6 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          <Filter className="h-3.5 w-3.5" />
          Status
        </div>
        <FilterPill active={status === 'all'} onClick={() => setStatus('all')}>
          All ({quizzes.length})
        </FilterPill>
        <FilterPill active={status === 'published'} onClick={() => setStatus('published')}>
          Published
        </FilterPill>
        <FilterPill active={status === 'draft'} onClick={() => setStatus('draft')}>
          Drafts
        </FilterPill>
        <FilterPill active={status === 'overdue'} onClick={() => setStatus('overdue')}>
          Overdue
        </FilterPill>
        <FilterPill active={status === 'needs_review'} onClick={() => setStatus('needs_review')}>
          Needs review
        </FilterPill>
      </div>

      <div className="mt-2 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Kind
        </div>
        <FilterPill active={kind === 'all'} onClick={() => setKind('all')}>All</FilterPill>
        <FilterPill active={kind === 'quiz'} onClick={() => setKind('quiz')}>Quizzes</FilterPill>
        <FilterPill active={kind === 'assessment'} onClick={() => setKind('assessment')}>
          Assessments
        </FilterPill>
        <FilterPill active={kind === 'mock_exam'} onClick={() => setKind('mock_exam')}>
          Mock exams
        </FilterPill>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleExportCsv}
            disabled={loading || filtered.length === 0}
            title="Export the visible quizzes to CSV"
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08] text-[11px] touch-manipulation disabled:opacity-50"
          >
            <Download className="h-3 w-3" />
            Export CSV
          </button>
          <button
            type="button"
            onClick={() =>
              setSort(
                sort === 'recent'
                  ? 'completion'
                  : sort === 'completion'
                    ? 'avg'
                    : sort === 'avg'
                      ? 'pass_rate'
                      : 'recent'
              )
            }
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08] text-[11px] touch-manipulation"
          >
            <TrendingUp className="h-3 w-3" />
            Sort:{' '}
            {sort === 'recent'
              ? 'Most recent'
              : sort === 'completion'
                ? 'Completion'
                : sort === 'avg'
                  ? 'Avg score'
                  : 'Pass rate'}
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <LoadingState />
      ) : filtered.length === 0 ? (
        <div className="mt-6 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-10 text-center">
          <Brain className="h-8 w-8 text-white/35 mx-auto mb-2" />
          <p className="text-[13px] text-white max-w-md mx-auto leading-relaxed">
            {quizzes.length === 0
              ? "You haven't authored any quizzes yet. Open a Student 360 page and tap Quiz or From doc."
              : 'No quizzes match this filter.'}
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-2.5">
          {filtered.map((q) => (
            <li key={q.id}>
              <button
                type="button"
                onClick={() => navigate(`/college/quizzes/${q.id}`)}
                className="w-full text-left bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4 hover:bg-white/[0.02] hover:border-white/[0.10] transition-colors touch-manipulation"
              >
                <QuizListRow q={q} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </PageFrame>
  );
}

/* ────────────────────────── row ────────────────────────── */

function QuizListRow({ q }: { q: TutorQuizListItem }) {
  return (
    <div className="flex items-start gap-4 flex-wrap">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 flex-wrap mb-1">
          <KindBadge kind={q.kind} />
          {!q.is_published && (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-amber-500/[0.10] border border-amber-400/30 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-amber-200">
              Draft
            </span>
          )}
          {q.source === 'ai_authored' && (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-elec-yellow/[0.10] border border-elec-yellow/30 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-elec-yellow gap-0.5">
              <Sparkles className="h-2.5 w-2.5" />
              AI
            </span>
          )}
          {q.source_document_id && (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-white/[0.04] border border-white/[0.10] text-[9.5px] font-semibold tracking-[0.06em] uppercase text-white gap-0.5">
              <FileText className="h-2.5 w-2.5" />
              From doc
            </span>
          )}
          {q.is_homework && (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-purple-500/[0.10] border border-purple-400/30 text-[9.5px] font-semibold tracking-[0.06em] uppercase text-purple-200">
              Homework
            </span>
          )}
          {q.qualification_code && (
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-white/[0.04] border border-white/[0.10] text-[9.5px] font-semibold tracking-[0.06em] uppercase text-white">
              {q.qualification_code}
            </span>
          )}
        </div>

        <h3 className="text-[14px] font-semibold text-white leading-tight tracking-tight">
          {q.title}
        </h3>
        <div className="mt-1 text-[11px] text-white tabular-nums flex items-center gap-x-2 gap-y-0.5 flex-wrap">
          <span>{q.questions_count} questions</span>
          {q.time_limit_minutes && (
            <>
              <span className="text-white/35">·</span>
              <span>{q.time_limit_minutes}m</span>
            </>
          )}
          {q.pass_mark != null && (
            <>
              <span className="text-white/35">·</span>
              <span>{q.pass_mark}% pass</span>
            </>
          )}
          {q.cohort_name && (
            <>
              <span className="text-white/35">·</span>
              <span className="inline-flex items-center gap-1">
                <Users className="h-3 w-3" />
                {q.cohort_name}
              </span>
            </>
          )}
          {q.due_date && (
            <>
              <span className="text-white/35">·</span>
              <span className={cn(q.overdue_count > 0 && 'text-red-300')}>
                Due {q.due_date}
              </span>
            </>
          )}
        </div>

        {/* Stats strip */}
        <div className="mt-2 flex items-center gap-2 flex-wrap text-[10.5px] tabular-nums">
          <Stat
            icon={<Users className="h-3 w-3" />}
            label={`${q.completed_count}/${q.assigned_count} done`}
            tone={
              q.assigned_count > 0 && q.completed_count === q.assigned_count
                ? 'emerald'
                : undefined
            }
          />
          {q.in_progress_count > 0 && (
            <Stat
              icon={<Clock className="h-3 w-3" />}
              label={`${q.in_progress_count} in progress`}
              tone="amber"
            />
          )}
          {q.avg_percentage != null && (
            <Stat
              icon={<TrendingUp className="h-3 w-3" />}
              label={`${q.avg_percentage}% avg`}
              tone={
                q.avg_percentage >= 75 ? 'emerald' : q.avg_percentage >= 50 ? 'amber' : 'red'
              }
            />
          )}
          {q.pass_rate_percent != null && (
            <Stat
              icon={<Check className="h-3 w-3" />}
              label={`${q.pass_rate_percent}% pass`}
              tone={
                q.pass_rate_percent >= 80
                  ? 'emerald'
                  : q.pass_rate_percent >= 50
                    ? 'amber'
                    : 'red'
              }
            />
          )}
          {q.overdue_count > 0 && (
            <Stat
              icon={<AlertTriangle className="h-3 w-3" />}
              label={`${q.overdue_count} overdue`}
              tone="red"
            />
          )}
          {q.pending_ai_grade_count > 0 && (
            <Stat
              icon={<Brain className="h-3 w-3" />}
              label={`${q.pending_ai_grade_count} need AI marks`}
              tone="amber"
            />
          )}
        </div>
      </div>

      {/* Big completion ring */}
      <div className="flex-shrink-0 flex flex-col items-end justify-center">
        <CompletionRing
          completed={q.completed_count}
          total={Math.max(q.assigned_count, q.completed_count, 1)}
        />
      </div>
    </div>
  );
}

function KindBadge({ kind }: { kind: TutorQuizKind }) {
  const meta =
    kind === 'mock_exam'
      ? { label: 'Mock exam', cls: 'bg-orange-500/[0.10] border-orange-400/30 text-orange-200' }
      : kind === 'assessment'
        ? { label: 'Assessment', cls: 'bg-cyan-500/[0.10] border-cyan-400/30 text-cyan-200' }
        : { label: 'Quiz', cls: 'bg-blue-500/[0.10] border-blue-400/30 text-blue-200' };
  return (
    <span
      className={cn(
        'inline-flex items-center h-4 px-1.5 rounded-md border text-[9.5px] font-semibold tracking-[0.06em] uppercase',
        meta.cls
      )}
    >
      {meta.label}
    </span>
  );
}

function Stat({
  icon,
  label,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  tone?: 'emerald' | 'amber' | 'red';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 h-5 px-2 rounded-full border text-[10.5px] tabular-nums',
        tone === 'emerald'
          ? 'bg-emerald-500/[0.08] border-emerald-400/30 text-emerald-200'
          : tone === 'amber'
            ? 'bg-amber-500/[0.08] border-amber-400/30 text-amber-200'
            : tone === 'red'
              ? 'bg-red-500/[0.08] border-red-400/30 text-red-200'
              : 'bg-white/[0.04] border-white/[0.10] text-white'
      )}
    >
      {icon}
      {label}
    </span>
  );
}

function CompletionRing({ completed, total }: { completed: number; total: number }) {
  const pct = total > 0 ? completed / total : 0;
  const radius = 22;
  const circ = 2 * Math.PI * radius;
  const dash = pct * circ;
  return (
    <div className="relative h-14 w-14">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth="4" fill="none" />
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          className={cn(
            pct >= 1
              ? 'text-emerald-400'
              : pct >= 0.5
                ? 'text-elec-yellow'
                : 'text-blue-400'
          )}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[12px] font-semibold tabular-nums text-white leading-none">
          {Math.round(pct * 100)}%
        </div>
        <div className="text-[8px] text-white/55 tabular-nums leading-none mt-0.5">
          {completed}/{total}
        </div>
      </div>
    </div>
  );
}

function CountTile({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: number;
  sub?: string;
  tone?: 'emerald' | 'amber' | 'red';
}) {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.16em] text-white/85">{label}</div>
      <div
        className={cn(
          'mt-1 text-[24px] font-semibold tabular-nums leading-none',
          tone === 'emerald' && 'text-emerald-300',
          tone === 'amber' && 'text-amber-300',
          tone === 'red' && 'text-red-300',
          !tone && 'text-white'
        )}
      >
        {value}
      </div>
      {sub && <div className="mt-1 text-[10.5px] text-white tabular-nums">{sub}</div>}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-8 px-3 rounded-full text-[11.5px] font-semibold tracking-tight transition-colors touch-manipulation border',
        active
          ? 'bg-elec-yellow/[0.14] border-elec-yellow/40 text-elec-yellow'
          : 'bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]'
      )}
    >
      {children}
    </button>
  );
}

function completionRatio(q: TutorQuizListItem): number {
  return q.assigned_count > 0 ? q.completed_count / q.assigned_count : 0;
}
