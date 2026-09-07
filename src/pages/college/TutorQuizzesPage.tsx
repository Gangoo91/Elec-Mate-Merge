import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubKpi,
  HubKpiRow,
  HubSectionHeading,
} from '@/components/hub/HubPrimitives';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { chipBase, chipOff, inputCn } from '@/components/forms/fieldStyles';
import { useTutorQuizzes, type TutorQuizListItem, type TutorQuizKind } from '@/hooks/useTutorQuizzes';
import { rowsToCsv, downloadCsv } from '@/lib/csv';
import { useToast } from '@/hooks/use-toast';

/* ==========================================================================
   TutorQuizzesPage — /college/quizzes

   Every quiz / assessment / mock exam the tutor has authored, with attempt
   stats, filters and click-through to the per-quiz page.

   Rebuilt on the shared hub shell. What went: the hero (eyebrow, 32px
   headline and a paragraph), two rows of count tiles that restated one
   another, a completion ring per row, and a five-colour badge system
   (blue / cyan / orange / purple / amber) that encoded nothing a word
   couldn't. Rows now speak HubWorkList: rule, words, figure, chevron.

   The one solid volt control is the marking queue — pending AI marks are
   the only thing on this page that is waiting on the tutor.
   ========================================================================== */

type StatusFilter = 'all' | 'published' | 'draft' | 'overdue' | 'needs_review';
type KindFilter = 'all' | TutorQuizKind;
type SortKey = 'recent' | 'completion' | 'avg' | 'pass_rate';

const STATUS_DEFS: { key: StatusFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'published', label: 'Published' },
  { key: 'draft', label: 'Drafts' },
  { key: 'overdue', label: 'Overdue' },
  { key: 'needs_review', label: 'Needs review' },
];

const KIND_DEFS: { key: KindFilter; label: string }[] = [
  { key: 'all', label: 'All kinds' },
  { key: 'quiz', label: 'Quizzes' },
  { key: 'assessment', label: 'Assessments' },
  { key: 'mock_exam', label: 'Mock exams' },
];

const SORT_LABEL: Record<SortKey, string> = {
  recent: 'Most recent',
  completion: 'Completion',
  avg: 'Average score',
  pass_rate: 'Pass rate',
};

const NEXT_SORT: Record<SortKey, SortKey> = {
  recent: 'completion',
  completion: 'avg',
  avg: 'pass_rate',
  pass_rate: 'recent',
};

const KIND_LABEL: Record<TutorQuizKind, string> = {
  quiz: 'Quiz',
  assessment: 'Assessment',
  mock_exam: 'Mock exam',
};

const neutralButtonCn =
  'inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.10] active:scale-[0.98] disabled:bg-white/[0.03] disabled:opacity-60';

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

function matchesStatus(q: TutorQuizListItem, status: StatusFilter): boolean {
  if (status === 'published') return q.is_published;
  if (status === 'draft') return !q.is_published;
  if (status === 'overdue') return q.overdue_count > 0;
  if (status === 'needs_review') return q.pending_ai_grade_count > 0;
  return true;
}

export default function TutorQuizzesPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { quizzes, loading } = useTutorQuizzes();
  const [status, setStatus] = useState<StatusFilter>('all');
  const [kind, setKind] = useState<KindFilter>('all');
  const [sort, setSort] = useState<SortKey>('recent');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    let list = quizzes.filter((q) => matchesStatus(q, status));
    if (kind !== 'all') list = list.filter((q) => q.kind === kind);
    if (needle) {
      list = list.filter((q) =>
        [q.title, q.cohort_name, q.qualification_code]
          .filter(Boolean)
          .some((s) => (s as string).toLowerCase().includes(needle))
      );
    }

    if (sort === 'recent') {
      list.sort(
        (a, b) => new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime()
      );
    } else if (sort === 'completion') {
      list.sort((a, b) => completionRatio(b) - completionRatio(a));
    } else if (sort === 'avg') {
      list.sort((a, b) => (b.avg_percentage ?? -1) - (a.avg_percentage ?? -1));
    } else if (sort === 'pass_rate') {
      list.sort((a, b) => (b.pass_rate_percent ?? -1) - (a.pass_rate_percent ?? -1));
    }
    return list;
  }, [quizzes, status, kind, sort, search]);

  const counts = useMemo(
    () => ({
      total: quizzes.length,
      published: quizzes.filter((q) => q.is_published).length,
      draft: quizzes.filter((q) => !q.is_published).length,
      overdue: quizzes.reduce((s, q) => s + q.overdue_count, 0),
      needs_review: quizzes.reduce((s, q) => s + q.pending_ai_grade_count, 0),
      assigned: quizzes.reduce((s, q) => s + q.assigned_count, 0),
      completed: quizzes.reduce((s, q) => s + q.completed_count, 0),
    }),
    [quizzes]
  );

  const statusCount = (key: StatusFilter) =>
    key === 'all' ? quizzes.length : quizzes.filter((q) => matchesStatus(q, key)).length;

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

  const completionPct =
    counts.assigned > 0 ? Math.round((counts.completed / counts.assigned) * 100) : null;

  return (
    <HubPage>
      <HubMasthead
        section="College"
        title="Quizzes & assessments"
        backTo="/college?section=curriculumhub"
      />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        {/* The one solid volt control. Marking is where pending AI marks are
            cleared; export is a neutral secondary beside it. */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-2.5 sm:flex-row sm:items-center"
        >
          <button
            type="button"
            onClick={() => navigate('/college/marking')}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 sm:w-auto"
          >
            {counts.needs_review > 0
              ? `Marking queue · ${plural(counts.needs_review, 'AI mark')} pending`
              : 'Marking queue'}
          </button>
          <button
            type="button"
            onClick={handleExportCsv}
            disabled={loading || filtered.length === 0}
            className={cn(neutralButtonCn, 'w-full sm:w-auto')}
          >
            Export CSV
          </button>
        </motion.div>

        <HubKpiRow>
          <HubKpi
            accent
            label="Authored"
            value={loading ? '—' : String(counts.total)}
            verdict={
              loading
                ? undefined
                : counts.total === 0
                  ? 'Nothing authored yet'
                  : `${counts.published} published · ${counts.draft} in draft`
            }
            onClick={() => setStatus('all')}
          />
          <HubKpi
            label="AI marks pending"
            value={loading ? '—' : String(counts.needs_review)}
            verdict={
              loading
                ? undefined
                : counts.needs_review > 0
                  ? 'Free-response answers waiting for a mark'
                  : 'Nothing waiting'
            }
            sentiment={counts.needs_review > 0 ? 'bad' : 'neutral'}
            onClick={() => setStatus('needs_review')}
          />
          <HubKpi
            label="Overdue"
            value={loading ? '—' : String(counts.overdue)}
            verdict={
              loading
                ? undefined
                : counts.overdue > 0
                  ? 'Homework past its due date, not handed in'
                  : 'No homework overdue'
            }
            sentiment={counts.overdue > 0 ? 'bad' : 'neutral'}
            onClick={() => setStatus('overdue')}
          />
          <HubKpi
            label="Completion"
            value={loading ? '—' : completionPct == null ? '—' : `${completionPct}%`}
            verdict={
              loading
                ? undefined
                : completionPct == null
                  ? 'Nothing assigned yet'
                  : `${counts.completed} of ${plural(counts.assigned, 'assignment')} done`
            }
          />
        </HubKpiRow>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
            <HubSectionHeading>Your quizzes</HubSectionHeading>
            <span className="text-[11px] font-semibold tabular-nums text-white">
              {plural(filtered.length, 'quiz', 'quizzes')}
            </span>
          </motion.div>

          {/* Status chips — active is solid white so volt stays with the
              marking button above. */}
          <motion.div
            variants={itemVariants}
            className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {STATUS_DEFS.map((f) => {
              const active = status === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setStatus(f.key)}
                  aria-pressed={active}
                  className={cn(
                    chipBase,
                    'inline-flex shrink-0 snap-start items-center gap-2 px-3.5 text-[12.5px]',
                    active ? 'border-white bg-white font-semibold text-black' : chipOff
                  )}
                >
                  {f.label}
                  <span className="tabular-nums">{statusCount(f.key)}</span>
                </button>
              );
            })}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {KIND_DEFS.map((f) => {
              const active = kind === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setKind(f.key)}
                  aria-pressed={active}
                  className={cn(
                    chipBase,
                    'inline-flex shrink-0 snap-start items-center px-3.5 text-[12.5px]',
                    active ? 'border-white bg-white font-semibold text-black' : chipOff
                  )}
                >
                  {f.label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setSort(NEXT_SORT[sort])}
              className={cn(
                chipBase,
                chipOff,
                'inline-flex shrink-0 snap-start items-center px-3.5 text-[12.5px] sm:ml-auto'
              )}
            >
              Sort: {SORT_LABEL[sort]}
            </button>
          </motion.div>

          <motion.div variants={itemVariants}>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by title, cohort or qualification"
              aria-label="Filter quizzes"
              className={inputCn}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={cn(
              '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
              CARD_SURFACE
            )}
          >
            {loading ? (
              <div className="space-y-px animate-pulse">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-white/[0.04]" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <p className="px-4 py-8 text-center text-[13px] text-white sm:px-5">
                {quizzes.length === 0
                  ? 'Nothing authored yet. Open a learner in Student 360 and tap Quiz or From doc.'
                  : 'No quizzes match this filter.'}
              </p>
            ) : (
              <ul className="divide-y divide-white/[0.10]">
                {filtered.map((q) => (
                  <li key={q.id}>
                    <QuizRow q={q} onClick={() => navigate(`/college/quizzes/${q.id}`)} />
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </motion.section>
      </HubBody>
    </HubPage>
  );
}

/* ────────────────────────── row ────────────────────────── */

function QuizRow({ q, onClick }: { q: TutorQuizListItem; onClick: () => void }) {
  const urgent = q.overdue_count > 0 || q.pending_ai_grade_count > 0;
  const total = Math.max(q.assigned_count, q.completed_count);

  const reason = [
    KIND_LABEL[q.kind],
    !q.is_published ? 'Draft' : null,
    q.is_homework ? 'Homework' : null,
    plural(q.questions_count, 'question'),
    q.cohort_name,
    q.qualification_code,
    q.due_date ? `Due ${q.due_date}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const detail = [
    q.in_progress_count > 0 ? `${q.in_progress_count} in progress` : null,
    q.avg_percentage != null ? `${q.avg_percentage}% average` : null,
    q.pass_rate_percent != null ? `${q.pass_rate_percent}% pass` : null,
    q.overdue_count > 0 ? `${q.overdue_count} overdue` : null,
    q.pending_ai_grade_count > 0 ? `${q.pending_ai_grade_count} need AI marks` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
    >
      <span
        aria-hidden="true"
        className={cn(
          'h-8 w-[3px] shrink-0 rounded-full',
          urgent ? 'bg-elec-yellow' : 'bg-white/[0.25]'
        )}
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
          {q.title}
        </span>
        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">{reason}</span>
        {detail && (
          <span
            className={cn(
              'mt-0.5 block truncate text-[12px] leading-tight',
              urgent ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {detail}
          </span>
        )}
      </span>
      <span className="shrink-0 text-right">
        <span
          className={cn(
            'block text-[13px] font-semibold tabular-nums',
            urgent ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {q.completed_count}/{total}
        </span>
        <span className="mt-0.5 block text-[11px] tabular-nums text-white">done</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
    </button>
  );
}

function completionRatio(q: TutorQuizListItem): number {
  return q.assigned_count > 0 ? q.completed_count / q.assigned_count : 0;
}
