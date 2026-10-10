import { useMemo, useState } from 'react';
import { CreateQuizSheet } from '@/components/college/sheets/CreateQuizSheet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { inputCn } from '@/components/forms/fieldStyles';
import { CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import {
  StatusChip,
  TEACH_BTN,
  TEACH_BTN_PRIMARY,
  TEACH_LIST,
  TEACH_ROW,
  TeachingEmpty,
  TeachTabs,
  TeachToggle,
  TeachingHeader,
  plural,
} from '@/components/college/teaching/TeachingKit';
import {
  useTutorQuizzes,
  type TutorQuizListItem,
  type TutorQuizKind,
  type TutorQuizScope,
} from '@/hooks/useTutorQuizzes';
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

   8 Oct 2026: the four figure tiles went into the header sentence; New quiz
   is the one solid action, the marking queue an outline button that says how
   many answers wait. Rows lost their coloured left bar: status is a chip in
   words (orange to mark or overdue, green when everyone has done it).
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
  { key: 'all', label: 'All' },
  { key: 'quiz', label: 'Quizzes' },
  { key: 'assessment', label: 'Assessments' },
  { key: 'mock_exam', label: 'Mocks' },
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

const HELP: PageHelpContent = {
  id: 'college-quizzes',
  title: 'Quizzes and assessments',
  what: 'Every quiz, assessment and mock exam you have set, with how many learners have done it, the average score and the pass rate.',
  steps: [
    {
      title: 'Set one',
      body: 'New quiz drafts the questions from BS 7671 and the qualification criteria for a cohort or one learner. Check them, then publish.',
    },
    {
      title: 'Check the written answers',
      body: 'Written answers get a suggested mark. Open the marking queue to confirm or change each one.',
    },
    {
      title: 'Chase and review',
      body: "Overdue shows homework past its due date. Open a quiz to see each learner's attempt and the hardest questions.",
    },
  ],
  notes: [
    {
      title: 'Export',
      body: 'Export CSV downloads the list as it is filtered, for a quality review or a team meeting.',
    },
  ],
  legend: [
    {
      swatch: 'bg-orange-400',
      label: 'Orange',
      body: 'overdue homework or written answers waiting for you',
    },
  ],
};

function matchesStatus(q: TutorQuizListItem, status: StatusFilter): boolean {
  if (status === 'published') return q.is_published;
  if (status === 'draft') return !q.is_published;
  if (status === 'overdue') return q.overdue_count > 0;
  if (status === 'needs_review') return q.pending_ai_grade_count > 0;
  return true;
}

export default function TutorQuizzesPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  // ELE-1895: "Mine" (default) or every quiz set at the college, read-only
  // where another tutor set it.
  const [scope, setScope] = useState<TutorQuizScope>('mine');
  const { quizzes, loading, refresh: reload } = useTutorQuizzes(scope);
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
      { key: 'ai_marks_pending', header: 'Written answers to mark' },
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
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title="Quizzes and assessments"
        backTo="/college?section=curriculumhub"
      />
      <CreateQuizSheet
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSaved={() => void reload()}
      />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        <TeachingHeader
          eyebrow="Assessment"
          title="Quizzes and assessments"
          help={HELP}
          summary={
            loading ? (
              'Loading your quizzes…'
            ) : counts.total === 0 ? (
              'Nothing set yet. New quiz drafts one for a cohort or a learner.'
            ) : (
              <>
                {plural(counts.total, 'quiz', 'quizzes')} set
                {counts.draft > 0 ? `, ${counts.draft} still a draft` : ''}.{' '}
                {counts.needs_review === 0 && counts.overdue === 0 ? (
                  'Nothing is waiting on you.'
                ) : (
                  <span className="font-semibold text-orange-400">
                    {[
                      counts.needs_review > 0
                        ? `${plural(counts.needs_review, 'written answer')} wait${counts.needs_review === 1 ? 's' : ''} for your mark`
                        : null,
                      counts.overdue > 0
                        ? `${plural(counts.overdue, 'learner')} ${counts.overdue === 1 ? 'is' : 'are'} past a due date`
                        : null,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                    .
                  </span>
                )}
              </>
            )
          }
          sub={
            !loading && completionPct != null
              ? `${counts.completed} of ${plural(counts.assigned, 'assignment')} done (${completionPct}%).`
              : undefined
          }
          actions={
            <>
              <button
                type="button"
                onClick={() => navigate('/college/marking')}
                className={cn(TEACH_BTN, 'flex-1 sm:flex-none')}
              >
                {counts.needs_review > 0 ? `${counts.needs_review} to mark` : 'Marking queue'}
              </button>
              <button
                type="button"
                onClick={handleExportCsv}
                disabled={loading || filtered.length === 0}
                className={cn(TEACH_BTN, 'flex-1 sm:flex-none')}
              >
                Export CSV
              </button>
              <button
                type="button"
                onClick={() => setCreateOpen(true)}
                className={cn(TEACH_BTN_PRIMARY, 'w-full sm:w-auto')}
              >
                New quiz
              </button>
            </>
          }
        />

        <section className="space-y-4">
          <CollegeSectionTitle
            title={scope === 'mine' ? 'Your quizzes' : 'Quizzes across the college'}
            sub={plural(filtered.length, 'quiz', 'quizzes')}
            action={
              <TeachToggle
                label="Whose quizzes"
                value={scope}
                onChange={setScope}
                options={[
                  { value: 'mine', label: 'Mine' },
                  { value: 'college', label: 'Whole college' },
                ]}
              />
            }
          />

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <TeachTabs
              label="Status"
              value={status}
              onChange={setStatus}
              tabs={STATUS_DEFS.map((f) => ({
                value: f.key,
                label: f.label,
                count: statusCount(f.key),
              }))}
            />
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[auto_auto_minmax(0,1fr)] lg:items-center">
              <TeachToggle
                label="Kind"
                value={kind}
                onChange={setKind}
                options={KIND_DEFS.map((f) => ({ value: f.key, label: f.label }))}
              />
              <button
                type="button"
                onClick={() => setSort(NEXT_SORT[sort])}
                className={cn(TEACH_BTN, 'justify-self-start')}
              >
                Sort: {SORT_LABEL[sort]}
              </button>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by title, cohort or qualification"
                aria-label="Filter quizzes"
                className={cn(inputCn, 'lg:ml-auto lg:w-[360px]')}
              />
            </div>
          </motion.div>

          {loading ? (
            <div className={cn(TEACH_LIST, 'animate-pulse')}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-16" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <TeachingEmpty
              title={quizzes.length === 0 ? 'Nothing set yet' : 'No quizzes match this filter'}
              body={
                quizzes.length === 0
                  ? 'New quiz drafts questions for a cohort or one learner. Nothing reaches a learner until you publish it.'
                  : 'Pick All, or clear the search.'
              }
              action={
                quizzes.length === 0 ? (
                  <button type="button" onClick={() => setCreateOpen(true)} className={TEACH_BTN}>
                    New quiz
                  </button>
                ) : undefined
              }
            />
          ) : (
            <motion.ul
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className={TEACH_LIST}
            >
              {filtered.map((q) => (
                <li key={q.id}>
                  <QuizRow q={q} onClick={() => navigate(`/college/quizzes/${q.id}`)} />
                </li>
              ))}
            </motion.ul>
          )}
        </section>
      </HubBody>
    </HubPage>
  );
}

/* ────────────────────────── row ────────────────────────── */

function QuizRow({ q, onClick }: { q: TutorQuizListItem; onClick: () => void }) {
  const total = Math.max(q.assigned_count, q.completed_count);
  const allDone = total > 0 && q.completed_count >= total;

  const reason = [
    KIND_LABEL[q.kind],
    q.is_homework ? 'Homework' : null,
    plural(q.questions_count, 'question'),
    q.cohort_name,
    q.qualification_code,
    q.due_date
      ? `Due ${new Date(q.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
      : null,
    q.mine ? null : 'Another tutor, read only',
  ]
    .filter(Boolean)
    .join(' · ');

  const detail = [
    total > 0 ? `${q.completed_count} of ${total} done` : 'Not sent to anyone yet',
    q.in_progress_count > 0 ? `${q.in_progress_count} in progress` : null,
    q.avg_percentage != null ? `${q.avg_percentage}% average` : null,
    q.pass_rate_percent != null ? `${q.pass_rate_percent}% passed` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const chips: { label: string; tone: 'done' | 'action' | 'neutral' }[] = [];
  if (!q.is_published) chips.push({ label: 'Draft', tone: 'neutral' });
  if (q.pending_ai_grade_count > 0)
    chips.push({ label: `${q.pending_ai_grade_count} to mark`, tone: 'action' });
  if (q.overdue_count > 0) chips.push({ label: `${q.overdue_count} overdue`, tone: 'action' });
  if (chips.length === 0 && allDone) chips.push({ label: 'All done', tone: 'done' });

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(TEACH_ROW, 'items-start sm:items-center')}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[14.5px] font-semibold leading-snug text-white">{q.title}</span>
        <span className="mt-0.5 block text-[12.5px] leading-snug text-white">{reason}</span>
        <span className="mt-0.5 block text-[12.5px] leading-snug text-white">{detail}</span>
        {chips.length > 0 && (
          <span className="mt-2 flex flex-wrap gap-1.5 sm:hidden">
            {chips.map((c) => (
              <StatusChip key={c.label} tone={c.tone}>
                {c.label}
              </StatusChip>
            ))}
          </span>
        )}
      </span>
      {chips.length > 0 && (
        <span className="hidden shrink-0 gap-1.5 sm:flex">
          {chips.map((c) => (
            <StatusChip key={c.label} tone={c.tone}>
              {c.label}
            </StatusChip>
          ))}
        </span>
      )}
      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-white sm:mt-0" aria-hidden="true" />
    </button>
  );
}

function completionRatio(q: TutorQuizListItem): number {
  return q.assigned_count > 0 ? q.completed_count / q.assigned_count : 0;
}
