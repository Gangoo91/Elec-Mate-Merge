import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, PenLine, Search } from 'lucide-react';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { COLLEGE_BTN_PRIMARY } from '@/components/college/ui/CollegeUi';
import {
  AiMarker,
  TEACH_BTN,
  TEACH_PANEL,
  TeachingEmpty,
  TeachingHeader,
  plural,
} from '@/components/college/teaching/TeachingKit';
import {
  Bars,
  BulkBar,
  KeyHint,
  QueueGroup,
  QueueRow,
  SwipeRow,
  daysSince,
  useQueueKeys,
  useSelection,
} from '@/components/college/assessment/AssessmentKit';
import {
  useMarkingQueue,
  type MarkingQueueItem,
  type MarkingStatus,
} from '@/hooks/useMarkingQueue';
import { TextTabs } from '@/components/college/assessment/AssessmentTabs';
import { QuizAttemptReviewSheet } from '@/components/college/sheets/QuizAttemptReviewSheet';
import { cn } from '@/lib/utils';
import { useCollegeScope } from '@/components/college/scope/useCollegeScope';
import { CollegeScopeTabs } from '@/components/college/scope/CollegeScopeSwitch';
import { AGE_BAND_LABEL, FigureLine, bandRows } from '@/components/college/QueueFigures';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

/* ==========================================================================
   MarkingQueuePage — /college/marking. Written quiz answers to sign off.

   Redesigned 7 Oct 2026 on the College Hub kit (ELE-1889): the College
   inbox's row, verbs and order (waiting longest first), statuses down the
   left on a wide screen, tick boxes to approve several at once, and a
   keyboard on desktop (j/k move, Enter or v opens to decide, Shift+A
   approves, x ticks), swipe on a phone (right to mark, left to tick). Shows
   quizzes you set, narrowed by the one College Hub scope (ELE-1886). Data unchanged: useMarkingQueue, the
   per-attempt review sheet, the ai-grade-free-response function.

   8 Oct 2026: the four figure tiles became the header sentence; one solid
   yellow at most (the focused row's Mark, or Approve when ticked), every
   other row's Mark is outlined; "Score all" says what it does and that it
   uses AI. The keyboard flow is unchanged.
   ========================================================================== */

type Filter = 'needs_mark' | 'all' | 'awaiting_review' | 'awaiting_ai' | 'signed_off' | 'auto';

const FILTER_DEFS: Array<{ key: Filter; label: string; hint: string }> = [
  { key: 'needs_mark', label: 'Needs a human mark', hint: 'Written answers not signed off' },
  { key: 'awaiting_review', label: 'To sign off', hint: 'Pre-scored, waiting for you' },
  { key: 'awaiting_ai', label: 'Still to score', hint: 'Not pre-scored yet' },
  { key: 'signed_off', label: 'Approved', hint: 'Signed off by a tutor' },
  { key: 'auto', label: 'Auto-marked', hint: 'Multiple choice and sums, no marking' },
  { key: 'all', label: 'Everything', hint: 'Every attempt on your quizzes' },
];

const STATUS_LABEL: Record<MarkingStatus, string> = {
  awaiting_review: 'To sign off',
  awaiting_ai: 'Still to score',
  signed_off: 'Approved',
  no_free_response: 'Auto-marked',
};

const HELP: PageHelpContent = {
  id: 'college-marking',
  title: 'Marking',
  what: 'Written answers on your quizzes. Each one is pre-scored against your mark scheme; you read it, change the score if you disagree, and sign it off. Nothing counts until you do.',
  steps: [
    {
      title: 'Quizzes you set',
      body: 'Every attempt on a quiz you created lands here, whichever cohort the learner is in. "Needs a human mark" shows only the ones with written answers still to sign off; "Everything" shows auto-marked ones too. The switch at the top (Mine, My cohorts, Whole college) narrows it to those learners.',
    },
    {
      title: 'Start at the top',
      body: 'The attempt that has waited longest comes first. Over a week is orange.',
    },
    {
      title: 'Open and mark',
      body: 'Tap Mark to read each answer with its suggested score. Change any score, add feedback, and approve.',
    },
    {
      title: 'Approve several at once',
      body: 'Tick attempts whose suggested scores you accept and press Approve. Every answer on them is signed off at that score.',
    },
    {
      title: 'Use the keyboard',
      body: 'On a computer: j and k move, Enter opens, Shift+A approves, x ticks, Esc clears.',
    },
    {
      title: 'Suggested marks use AI',
      body: 'An AI model reads each written answer against your mark scheme and suggests a score with its reasons. It is a suggestion: you change it or approve it.',
    },
  ],
  legend: [
    { swatch: 'bg-orange-500', label: 'Waiting a week or more', body: 'Sign these off first.' },
    {
      swatch: 'bg-orange-400',
      label: 'Below the pass mark',
      body: 'The score is under the quiz pass mark.',
    },
  ],
  notes: [
    {
      title: 'Still to score',
      body: 'Answers not pre-scored yet. Suggest marks runs the AI scoring for every one; you still sign each off.',
    },
  ],
};

function formatRel(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.round(diff / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.round(h / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export default function MarkingQueuePage() {
  const { toast } = useToast();
  const { allItems, stats, loading, refresh } = useMarkingQueue();
  const [bulkGrading, setBulkGrading] = useState<{ done: number; total: number } | null>(null);
  const [approving, setApproving] = useState<{ done: number; total: number } | null>(null);
  const [filter, setFilter] = useState<Filter>('needs_mark');
  const [search, setSearch] = useState('');
  const [openAttemptId, setOpenAttemptId] = useState<string | null>(null);
  const [openStudentName, setOpenStudentName] = useState<string | undefined>();
  const [visibleCount, setVisibleCount] = useState(50);

  // useMarkingQueue returns only quizzes this tutor set.
  // ELE-1886: the one College Hub scope. On Mine or My cohorts, only those
  // learners' attempts on your quizzes; on Whole college, every attempt.
  const scope = useCollegeScope();
  const items = useMemo(
    () => (scope.set ? allItems.filter((i) => scope.inScope({ userId: i.student_id })) : allItems),
    [allItems, scope]
  );

  // Sign off one attempt: write the suggested score as the tutor override for
  // every answer still awaiting review, then re-tally via the same function.
  const signOffAttempt = async (attemptId: string) => {
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData?.user?.id ?? null;
    const { data: rows } = await supabase
      .from('tutor_quiz_answer_grades')
      .select('id, ai_score, tutor_override_score')
      .eq('attempt_id', attemptId);
    const pending = (rows ?? []).filter(
      (r) => r.ai_score != null && r.tutor_override_score == null
    );
    for (const r of pending) {
      await supabase
        .from('tutor_quiz_answer_grades')
        .update({
          tutor_override_score: r.ai_score,
          tutor_override_by: uid,
          tutor_override_at: new Date().toISOString(),
        })
        .eq('id', r.id);
    }
    await supabase.functions
      .invoke('ai-grade-free-response', { body: { attempt_id: attemptId } })
      .catch(() => undefined);
  };

  const approveIds = async (ids: string[]) => {
    if (ids.length === 0) return;
    setApproving({ done: 0, total: ids.length });
    let failed = 0;
    try {
      for (let i = 0; i < ids.length; i++) {
        try {
          await signOffAttempt(ids[i]);
        } catch {
          failed += 1;
        }
        setApproving({ done: i + 1, total: ids.length });
      }
      await refresh();
      sel.clear();
      toast({
        title:
          failed === 0
            ? `Approved ${ids.length}`
            : `Approved ${ids.length - failed} of ${ids.length}`,
        description: failed === 0 ? 'Sign-off recorded.' : `${failed} could not be signed off.`,
        variant: failed === 0 ? undefined : 'destructive',
      });
    } finally {
      setApproving(null);
    }
  };

  // ELE-925: score every free-response answer still waiting, one at a time.
  const handleBulkGrade = async () => {
    const targets = items.filter((it) => (it.n_awaiting_ai ?? 0) > 0);
    if (targets.length === 0) return;
    setBulkGrading({ done: 0, total: targets.length });
    try {
      for (let i = 0; i < targets.length; i++) {
        try {
          await supabase.functions.invoke('ai-grade-free-response', {
            body: { attempt_id: targets[i].attempt_id },
          });
        } catch {
          // best-effort; continue
        }
        setBulkGrading({ done: i + 1, total: targets.length });
      }
      await refresh();
    } finally {
      setBulkGrading(null);
    }
  };

  const filtered = useMemo(() => {
    let list = items;
    if (filter === 'needs_mark')
      list = list.filter((i) => i.status === 'awaiting_review' || i.status === 'awaiting_ai');
    else if (filter === 'auto') list = list.filter((i) => i.status === 'no_free_response');
    else if (filter !== 'all') list = list.filter((i) => i.status === filter);
    const q = search.trim().toLowerCase();
    if (q)
      list = list.filter(
        (i) =>
          i.student_name.toLowerCase().includes(q) ||
          i.quiz_title.toLowerCase().includes(q) ||
          (i.cohort_name ?? '').toLowerCase().includes(q)
      );
    return list;
  }, [items, filter, search]);

  useEffect(() => setVisibleCount(50), [filter, search]);

  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const canLoadMore = filtered.length > visibleCount;

  const openItem = useCallback((item: MarkingQueueItem) => {
    setOpenAttemptId(item.attempt_id);
    setOpenStudentName(item.student_name);
  }, []);

  // ?attempt=<id> (from the college inbox) opens that attempt straight away.
  const [deepLinked, setDeepLinked] = useState(false);
  useEffect(() => {
    if (deepLinked || loading) return;
    const id = new URLSearchParams(window.location.search).get('attempt');
    const hit = id ? allItems.find((i) => i.attempt_id === id) : null;
    if (hit) openItem(hit);
    // Already signed off (or set by someone else): it is not in the queue,
    // but the notification still opens that attempt, not the list.
    else if (id) setOpenAttemptId(id);
    setDeepLinked(true);
  }, [allItems, deepLinked, openItem, loading]);

  const reviewable = useMemo(
    () => new Set(visible.filter((i) => i.status === 'awaiting_review').map((i) => i.attempt_id)),
    [visible]
  );
  const keys = useMemo(() => visible.map((i) => i.attempt_id), [visible]);
  const sel = useSelection(keys);
  const selectedIds = Array.from(sel.selected).filter((k) => reviewable.has(k));

  const kb = useQueueKeys({
    keys,
    onOpen: (k) => {
      const it = visible.find((i) => i.attempt_id === k);
      if (it) openItem(it);
    },
    onToggle: (k) => reviewable.has(k) && sel.toggle(k),
    onClear: () => sel.clear(),
    extra: useMemo(
      () => ({
        // Shift+A, not a bare key: approving is a final decision.
        A: (k: string) => {
          if (reviewable.has(k)) void approveIds([k]);
        },
        // v opens the attempt to decide (mark), the same verb as the inbox.
        v: (k: string) => {
          const it = visible.find((i) => i.attempt_id === k);
          if (it) openItem(it);
        },
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [reviewable, visible, openItem]
    ),
  });

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      needs_mark: 0,
      all: items.length,
      awaiting_review: 0,
      awaiting_ai: 0,
      signed_off: 0,
      auto: 0,
    };
    for (const i of items) {
      if (i.status === 'no_free_response') c.auto += 1;
      else c[i.status] += 1;
    }
    c.needs_mark = c.awaiting_review + c.awaiting_ai;
    return c;
  }, [items]);

  const review = items.filter((i) => i.status === 'awaiting_review');
  const reviewAges = review.map((i) => daysSince(i.submitted_at));
  const oldest = reviewAges.reduce<number | null>(
    (m, d) => (d === null ? m : m === null ? d : Math.max(m, d)),
    null
  );
  const overWeek = reviewAges.filter((d) => d !== null && d >= 7).length;
  const scored = items.filter((i) => i.pct != null);
  const bands = [0, 0, 0, 0];
  for (const i of scored) {
    const p = i.pct as number;
    bands[p < 40 ? 0 : p < 60 ? 1 : p < 80 ? 2 : 3] += 1;
  }
  const belowPass = scored.filter((i) => i.passed_by_score === false).length;

  // Age bands for what is waiting on a tutor, oldest first; anything else
  // (approved, auto-marked, still to score) in one group under it.
  const waitingBands = bandRows(
    visible.filter((i) => i.status === 'awaiting_review'),
    (i) => daysSince(i.submitted_at)
  );
  const otherRows = visible.filter((i) => i.status !== 'awaiting_review');
  const listLabel = FILTER_DEFS.find((f) => f.key === filter)?.label ?? 'Queue';

  const renderRow = (item: MarkingQueueItem) => {
    const age = daysSince(item.submitted_at);
    const waiting = item.status === 'awaiting_review';
    const scoreBit =
      item.pct != null ? (
        <span className={cn('font-semibold', item.passed_by_score === false && 'text-orange-300')}>
          {item.pct}%
        </span>
      ) : null;
    return (
      <li key={item.attempt_id} data-qkey={item.attempt_id}>
        <SwipeRow
          right={{
            label: waiting ? 'Mark' : 'Open',
            icon: <PenLine className="h-5 w-5" aria-hidden />,
            tone: 'go',
            onAction: () => openItem(item),
          }}
          left={
            waiting
              ? {
                  label: sel.has(item.attempt_id) ? 'Untick' : 'Tick',
                  icon: <Check className="h-5 w-5" aria-hidden />,
                  onAction: () => sel.toggle(item.attempt_id),
                }
              : undefined
          }
        >
          <QueueRow
            name={item.student_name}
            kind={filter === 'all' ? STATUS_LABEL[item.status] : undefined}
            title={item.quiz_title}
            body={
              <>
                {scoreBit}
                {scoreBit ? ' · ' : ''}
                {waiting
                  ? `${plural(item.n_awaiting_review, 'answer')} to sign off`
                  : item.status === 'awaiting_ai'
                    ? `${item.n_awaiting_ai} still to score`
                    : item.last_signed_off_at
                      ? `Approved ${formatRel(item.last_signed_off_at)}`
                      : STATUS_LABEL[item.status]}
              </>
            }
            meta={[
              waiting
                ? age !== null
                  ? `Sent ${age <= 0 ? 'today' : age === 1 ? 'yesterday' : `${age} days ago`}`
                  : null
                : item.submitted_at
                  ? `Sent ${formatRel(item.submitted_at)}`
                  : null,
              (item.cohort_name ?? '').replace(/\s*\(.*\)$/, '') || null,
            ]
              .filter(Boolean)
              .join(' · ')}
            // Neutral avatar and an outlined verb: the waiting days carry the
            // urgency. Only the focused row's verb is solid (one per screen).
            urgent={false}
            trailing={
              <span
                aria-hidden="true"
                className={cn(
                  'hidden h-11 min-w-[104px] shrink-0 items-center justify-center rounded-xl px-3 text-[13px] font-bold sm:inline-flex',
                  kb.focus === item.attempt_id
                    ? 'bg-elec-yellow text-black'
                    : 'border border-white/[0.18] text-white'
                )}
              >
                {waiting ? 'Mark' : 'Open'}
              </span>
            }
            onOpen={() => openItem(item)}
            selectable={waiting}
            selected={sel.has(item.attempt_id)}
            onToggle={() => sel.toggle(item.attempt_id)}
            focused={kb.focus === item.attempt_id}
          />
        </SwipeRow>
      </li>
    );
  };

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Marking" backTo="/college" />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        <TeachingHeader
          eyebrow="Assessment"
          title="Marking"
          help={HELP}
          actions={<CollegeScopeTabs />}
          summary={
            loading ? (
              'Gathering written answers on your quizzes…'
            ) : counts.awaiting_review === 0 && counts.awaiting_ai === 0 ? (
              'Nothing to sign off. Written answers on your quizzes land here pre-scored for you to check.'
            ) : (
              <FigureLine
                className="mt-1"
                items={[
                  { n: counts.awaiting_review, label: 'to sign off' },
                  overWeek > 0
                    ? { n: overWeek, label: 'over a week', tone: 'warn' }
                    : oldest !== null
                      ? { n: oldest === 0 ? 'Today' : `${oldest} days`, label: 'the oldest' }
                      : { n: null, label: '' },
                  stats.avg_pct != null
                    ? { n: `${stats.avg_pct}%`, label: 'average score' }
                    : { n: null, label: '' },
                  belowPass
                    ? { n: belowPass, label: 'below the pass mark' }
                    : { n: null, label: '' },
                ]}
              />
            )
          }
          sub={
            loading
              ? undefined
              : `Nothing counts until you approve it. ${stats.approved_today} approved in the last 24 hours, ${stats.approved_total} in all.${
                  counts.awaiting_ai > 0
                    ? ` ${plural(counts.awaiting_ai, 'attempt')} not pre-scored yet.`
                    : ''
                }`
          }
        />

        {/* Who and what: the College Hub scope, and the AI pre-scoring. Its
            own row so the header sentence keeps its width. */}
        <div
          className={cn(
            '-mt-4 flex-wrap items-center justify-end gap-3 sm:-mt-6',
            counts.awaiting_ai > 0 || bulkGrading ? 'flex' : 'hidden'
          )}
        >
          {(counts.awaiting_ai > 0 || bulkGrading) && (
            <span className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => void handleBulkGrade()}
                disabled={!!bulkGrading}
                className={TEACH_BTN}
              >
                {bulkGrading
                  ? `Suggesting ${bulkGrading.done} of ${bulkGrading.total}…`
                  : `Suggest marks for ${plural(counts.awaiting_ai, 'attempt')}`}
              </button>
              <AiMarker />
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:grid-rows-[auto_1fr] xl:grid-cols-[320px_minmax(0,1fr)]">
          <nav aria-label="Marking filters" className="lg:col-start-1 lg:row-start-1">
            <TextTabs
              className="lg:hidden"
              ariaLabel="Which attempts to show"
              value={filter}
              onChange={setFilter}
              items={FILTER_DEFS.map((f) => ({ key: f.key, label: f.label, count: counts[f.key] }))}
            />
            <ul className="hidden overflow-hidden card-surface rounded-2xl !border-white/[0.08] p-2 lg:block">
              {FILTER_DEFS.map((f) => (
                <li key={f.key}>
                  <button
                    type="button"
                    aria-pressed={filter === f.key}
                    onClick={() => setFilter(f.key)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left touch-manipulation transition-colors',
                      filter === f.key ? 'bg-white text-black' : 'text-white hover:bg-white/[0.05]'
                    )}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-semibold">{f.label}</span>
                      <span
                        className={cn(
                          'block truncate text-[12px]',
                          filter === f.key ? 'text-black' : 'text-white'
                        )}
                      >
                        {f.hint}
                      </span>
                    </span>
                    <span
                      className={cn(
                        'shrink-0 rounded-full px-2 py-0.5 text-[12px] font-bold tabular-nums',
                        filter === f.key ? 'bg-black text-white' : 'bg-white/[0.1] text-white'
                      )}
                    >
                      {counts[f.key]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <section className="min-w-0 space-y-4 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find a learner, quiz or cohort"
                aria-label="Find a learner, quiz or cohort"
                className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              {reviewable.size > 0 ? (
                <button
                  type="button"
                  onClick={() =>
                    selectedIds.length === reviewable.size
                      ? sel.clear()
                      : sel.setAll(Array.from(reviewable))
                  }
                  className="h-11 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                >
                  {selectedIds.length === reviewable.size
                    ? 'Untick all'
                    : `Tick all ${reviewable.size} to sign off`}
                </button>
              ) : (
                <span />
              )}
              <KeyHint
                items={[
                  ['j k', 'move'],
                  ['Enter v', 'mark'],
                  ['Shift A', 'approve'],
                  ['x', 'tick'],
                ]}
              />
            </div>

            {loading ? (
              <div className="space-y-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-[84px] animate-pulse rounded-2xl bg-white/[0.04]" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <TeachingEmpty
                title={
                  items.length === 0
                    ? 'Nothing to mark yet'
                    : search.trim()
                      ? 'Nothing matches that search'
                      : filter === 'awaiting_review' || filter === 'needs_mark'
                        ? 'Nothing waiting for a human mark'
                        : 'Nothing in this view'
                }
                body={
                  items.length === 0
                    ? 'When learners finish one of your quizzes, the attempt lands here. Written answers arrive pre-scored for you to sign off.'
                    : 'Try another status on the left, or clear the search.'
                }
              />
            ) : (
              <>
                {waitingBands.map((g) => (
                  <QueueGroup
                    key={g.band}
                    title={AGE_BAND_LABEL[g.band]}
                    urgent={g.band !== 'recent'}
                    count={g.rows.length}
                  >
                    {g.rows.map(renderRow)}
                  </QueueGroup>
                ))}
                {otherRows.length > 0 && (
                  <QueueGroup
                    title={waitingBands.length ? 'Everything else' : listLabel}
                    count={otherRows.length}
                  >
                    {otherRows.map(renderRow)}
                  </QueueGroup>
                )}
                {canLoadMore && (
                  <button
                    type="button"
                    onClick={() => setVisibleCount((n) => n + 50)}
                    className="flex h-12 w-full items-center justify-center rounded-2xl border border-white/[0.1] text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.04]"
                  >
                    {filtered.length - visible.length} more
                  </button>
                )}
              </>
            )}
          </section>
          {!loading && scored.length > 0 && (
            // Showcase pass (10 Oct): the two charts sit under the filters on a
            // wide screen so the queue starts at the top; after it on a phone.
            <section
              className={cn(
                TEACH_PANEL,
                'order-last grid gap-6 p-5 sm:grid-cols-2 lg:order-none lg:col-start-1 lg:row-start-2 lg:grid-cols-1'
              )}
            >
              <div className="min-w-0">
                <p className="mb-3 text-[13px] font-semibold text-white">Scores across attempts</p>
                <Bars
                  labelWidth="6.5rem"
                  rows={[
                    { label: 'Under 40%', n: bands[0], cls: 'bg-orange-500' },
                    { label: '40 to 59%', n: bands[1], cls: 'bg-elec-yellow' },
                    { label: '60 to 79%', n: bands[2], cls: 'bg-white' },
                    { label: '80% and over', n: bands[3], cls: 'bg-emerald-500' },
                  ]}
                />
              </div>
              <div className="min-w-0">
                <p className="mb-3 text-[13px] font-semibold text-white">
                  How long sign-offs have waited
                </p>
                <Bars
                  labelWidth="6.5rem"
                  rows={[
                    {
                      label: 'Today',
                      n: reviewAges.filter((d) => (d ?? 0) <= 0).length,
                      cls: 'bg-emerald-500',
                    },
                    {
                      label: '1 to 3 days',
                      n: reviewAges.filter((d) => d !== null && d >= 1 && d <= 3).length,
                      cls: 'bg-white',
                    },
                    {
                      label: '4 to 6 days',
                      n: reviewAges.filter((d) => d !== null && d >= 4 && d <= 6).length,
                      cls: 'bg-elec-yellow',
                    },
                    { label: 'A week or more', n: overWeek, cls: 'bg-orange-500' },
                  ]}
                />
              </div>
            </section>
          )}
        </div>
      </HubBody>

      <BulkBar count={selectedIds.length} onClear={sel.clear}>
        <span className="hidden text-[12.5px] text-white sm:inline">
          Accept the suggested scores and sign off
        </span>
        <button
          type="button"
          onClick={() => void approveIds(selectedIds)}
          disabled={!!approving}
          className={COLLEGE_BTN_PRIMARY}
        >
          {approving
            ? `Approving ${approving.done} of ${approving.total}…`
            : `Approve ${selectedIds.length}`}
        </button>
      </BulkBar>

      <QuizAttemptReviewSheet
        open={openAttemptId != null}
        onOpenChange={(o) => {
          if (!o) {
            setOpenAttemptId(null);
            setOpenStudentName(undefined);
            void refresh();
          }
        }}
        attemptId={openAttemptId}
        studentName={openStudentName}
      />
    </HubPage>
  );
}
