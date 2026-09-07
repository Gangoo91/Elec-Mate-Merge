import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
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
import {
  useMarkingQueue,
  type MarkingQueueItem,
  type MarkingStatus,
} from '@/hooks/useMarkingQueue';
import { QuizAttemptReviewSheet } from '@/components/college/sheets/QuizAttemptReviewSheet';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

/* ==========================================================================
   MarkingQueuePage — /college/marking

   The tutor's marking queue. Lists every completed attempt across all their
   quizzes that has free-response work, sorted by what needs human eyes
   first. Tap a row to open the existing per-attempt review sheet.

   Rebuilt on the shared hub shell. The 30px headline and paragraph went;
   the four stat tiles are now KPIs with a verdict each (how long the oldest
   attempt has waited, not just how many). The amber / blue / emerald chips
   and pills are gone — a status is a word on the row, volt only while it is
   waiting on the tutor, red only when the score is below the pass mark.

   Two solid volt buttons could sit on one screen before ("Grade all
   pending" at the top and "Approve N" in the sticky bar). Approve — the
   human sign-off — keeps the volt; bulk AI grading is a volt TEXT action on
   the heading row, since it is best-effort and fires on its own.

   ELE-936 / [H1].
   ========================================================================== */

type Filter = 'all' | 'awaiting_review' | 'awaiting_ai' | 'signed_off';

const FILTER_DEFS: Array<{ key: Filter; label: string }> = [
  { key: 'awaiting_review', label: 'To sign off' },
  { key: 'awaiting_ai', label: 'AI grading' },
  { key: 'signed_off', label: 'Approved' },
  { key: 'all', label: 'All' },
];

const DAY_MS = 86_400_000;

function daysOld(iso: string | null): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return null;
  return Math.max(0, Math.floor((Date.now() - t) / DAY_MS));
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

export default function MarkingQueuePage() {
  const { toast } = useToast();
  const { items, stats, loading, refresh } = useMarkingQueue();
  const [bulkGrading, setBulkGrading] = useState<{ done: number; total: number } | null>(null);

  // ─── Human sign-off multi-select (separate from AI "Grade all pending") ───
  // A tutor can select rows that are waiting on their eyes and approve them in
  // one go: accept the AI score on every awaiting-review answer, then re-tally.
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [approving, setApproving] = useState<{ done: number; total: number } | null>(null);

  const toggleSelect = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const clearSelection = () => setSelected(new Set());

  // Sign off one attempt: write the AI score as the tutor override for every
  // answer that's still awaiting review, then re-tally via the same edge fn.
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
    // Re-tally the attempt total (idempotent — no ungraded rows, so no model call).
    await supabase.functions
      .invoke('ai-grade-free-response', { body: { attempt_id: attemptId } })
      .catch(() => undefined);
  };

  const handleApproveSelected = async () => {
    const ids = items
      .filter((it) => selected.has(it.attempt_id) && it.status === 'awaiting_review')
      .map((it) => it.attempt_id);
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
      clearSelection();
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

  // ELE-925 (H1) — bulk-grade every free-response answer that's still waiting.
  // Iterates the currently visible queue rows and fires the per-attempt grader
  // for any row with n_ai_pending > 0. Fire-and-await sequentially so we don't
  // batter the model with parallel calls; surface progress to the tutor.
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
          // best-effort; continue to next
        }
        setBulkGrading({ done: i + 1, total: targets.length });
      }
      await refresh();
    } finally {
      setBulkGrading(null);
    }
  };
  const [filter, setFilter] = useState<Filter>('awaiting_review');
  const [search, setSearch] = useState('');
  const [openAttemptId, setOpenAttemptId] = useState<string | null>(null);
  const [openStudentName, setOpenStudentName] = useState<string | undefined>();
  const [visibleCount, setVisibleCount] = useState(50);

  const filtered = useMemo(() => {
    let list = items;
    if (filter !== 'all') list = list.filter((i) => i.status === filter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (i) =>
          i.student_name.toLowerCase().includes(q) ||
          i.quiz_title.toLowerCase().includes(q) ||
          (i.cohort_name ?? '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [items, filter, search]);

  // Reset paging when filter or search changes — avoids "stuck on page 5" UX.
  useEffect(() => {
    setVisibleCount(50);
  }, [filter, search]);

  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const canLoadMore = filtered.length > visibleCount;

  const openItem = (item: MarkingQueueItem) => {
    setOpenAttemptId(item.attempt_id);
    setOpenStudentName(item.student_name);
  };

  const selectedCount = useMemo(
    () =>
      items.filter((it) => selected.has(it.attempt_id) && it.status === 'awaiting_review').length,
    [items, selected]
  );

  // The queue is sorted oldest-first inside the review bucket, so the first
  // awaiting-review row is the one that has waited longest.
  const oldestReviewDays = useMemo(() => {
    const first = items.find((i) => i.status === 'awaiting_review');
    return first ? daysOld(first.submitted_at) : null;
  }, [items]);

  const listLabel = FILTER_DEFS.find((f) => f.key === filter)?.label ?? 'Queue';

  return (
    <HubPage>
      <HubMasthead section="College" title="Marking" backTo="/college" />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        {/* Four KPIs. The first is the accent and the one that matters —
            attempts waiting on a human. Tapping a count applies its filter. */}
        <HubKpiRow>
          <HubKpi
            accent
            label="To sign off"
            value={loading ? '—' : String(stats.awaiting_review)}
            verdict={
              loading
                ? undefined
                : stats.awaiting_review === 0
                  ? 'Nothing waiting on you'
                  : oldestReviewDays !== null && oldestReviewDays >= 3
                    ? `Oldest has waited ${oldestReviewDays} days`
                    : 'AI has pre-scored — review and sign off'
            }
            sentiment={oldestReviewDays !== null && oldestReviewDays >= 3 ? 'bad' : 'neutral'}
            onClick={() => setFilter('awaiting_review')}
          />
          <HubKpi
            label="AI grading"
            value={loading ? '—' : String(stats.awaiting_ai)}
            verdict={
              loading
                ? undefined
                : stats.awaiting_ai > 0
                  ? 'Still to be scored'
                  : 'Everything scored'
            }
            onClick={() => setFilter('awaiting_ai')}
          />
          <HubKpi
            label="Approved (24h)"
            value={loading ? '—' : String(stats.approved_today)}
            verdict={
              loading
                ? undefined
                : stats.approved_total > 0
                  ? `${plural(stats.approved_total, 'attempt')} signed off in all`
                  : 'None signed off yet'
            }
            direction={stats.approved_today > 0 ? 'up' : 'flat'}
            sentiment={stats.approved_today > 0 ? 'good' : 'neutral'}
            onClick={() => setFilter('signed_off')}
          />
          <HubKpi
            label="Average score"
            value={loading ? '—' : stats.avg_pct == null ? '—' : `${stats.avg_pct}%`}
            verdict={
              loading
                ? undefined
                : stats.avg_pct == null
                  ? 'No scored attempts yet'
                  : 'Across every attempt in the queue'
            }
          />
        </HubKpiRow>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn('space-y-3', selectedCount > 0 && 'pb-24')}
        >
          <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
            <HubSectionHeading>{listLabel}</HubSectionHeading>
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-[11px] font-semibold tabular-nums text-white">
                {plural(filtered.length, 'attempt')}
              </span>
              {/* Bulk AI grade — a volt text action, not a second volt button. */}
              {(stats.awaiting_ai > 0 || bulkGrading) && (
                <button
                  type="button"
                  onClick={() => void handleBulkGrade()}
                  disabled={!!bulkGrading}
                  className="-my-2 -mr-2 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation"
                >
                  {bulkGrading
                    ? `Grading ${bulkGrading.done} of ${bulkGrading.total}…`
                    : `Grade all pending (${stats.awaiting_ai})`}
                </button>
              )}
            </div>
          </motion.div>

          {/* Filter chips — active is solid white so volt stays with Approve. */}
          <motion.div
            variants={itemVariants}
            className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {FILTER_DEFS.map((f) => {
              const count =
                f.key === 'all' ? items.length : items.filter((i) => i.status === f.key).length;
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  aria-pressed={active}
                  className={cn(
                    chipBase,
                    'inline-flex shrink-0 snap-start items-center gap-2 px-3.5 text-[12.5px]',
                    active ? 'border-white bg-white font-semibold text-black' : chipOff
                  )}
                >
                  {f.label}
                  <span className="tabular-nums">{count}</span>
                </button>
              );
            })}
          </motion.div>

          <motion.div variants={itemVariants}>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by learner, quiz or cohort"
              aria-label="Filter the marking queue"
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
              <ul className="divide-y divide-white/[0.10]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <li key={i} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                    <span className="h-8 w-[3px] rounded-full bg-white/[0.15]" />
                    <span className="flex-1 space-y-1.5">
                      <span className="block h-3.5 w-40 animate-pulse rounded bg-white/[0.10]" />
                      <span className="block h-3 w-64 animate-pulse rounded bg-white/[0.07]" />
                    </span>
                  </li>
                ))}
              </ul>
            ) : filtered.length === 0 ? (
              <EmptyState filter={filter} hasAny={items.length > 0} searching={!!search.trim()} />
            ) : (
              <>
                <ul className="divide-y divide-white/[0.10]">
                  {visible.map((item) => (
                    <QueueRow
                      key={item.attempt_id}
                      item={item}
                      onOpen={() => openItem(item)}
                      selectable={item.status === 'awaiting_review'}
                      selected={selected.has(item.attempt_id)}
                      onToggleSelect={() => toggleSelect(item.attempt_id)}
                    />
                  ))}
                </ul>
                {canLoadMore && (
                  <button
                    type="button"
                    onClick={() => setVisibleCount((n) => n + 50)}
                    className="flex h-11 w-full items-center justify-center border-t border-white/[0.10] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09]"
                  >
                    {filtered.length - visible.length} more
                  </button>
                )}
              </>
            )}
          </motion.div>
        </motion.section>
      </HubBody>

      {/* Sticky sign-off bar — only when rows are selected. Approve is the
          page's one solid volt control. */}
      {selectedCount > 0 && (
        <div
          className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.10] bg-elec-dark/95 backdrop-blur-sm"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 pt-3 lg:px-8">
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold tabular-nums text-white">
                {selectedCount} selected
              </div>
              <div className="text-[11.5px] text-white">Accept the AI scores and sign off</div>
            </div>
            <button
              type="button"
              onClick={clearSelection}
              disabled={!!approving}
              className="flex h-11 items-center px-3 text-[12.5px] font-semibold text-white touch-manipulation disabled:opacity-60"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => void handleApproveSelected()}
              disabled={!!approving}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white"
            >
              {approving
                ? `Approving ${approving.done} of ${approving.total}…`
                : `Approve ${selectedCount}`}
            </button>
          </div>
        </div>
      )}

      <QuizAttemptReviewSheet
        open={openAttemptId != null}
        onOpenChange={(o) => {
          if (!o) {
            setOpenAttemptId(null);
            setOpenStudentName(undefined);
          }
        }}
        attemptId={openAttemptId}
        studentName={openStudentName}
      />
    </HubPage>
  );
}

/* ───────────────── row ───────────────── */

const STATUS_LABEL: Record<MarkingStatus, string> = {
  awaiting_review: 'To sign off',
  awaiting_ai: 'AI grading',
  signed_off: 'Approved',
  no_free_response: 'Auto-marked',
};

function QueueRow({
  item,
  onOpen,
  selectable,
  selected,
  onToggleSelect,
}: {
  item: MarkingQueueItem;
  onOpen: () => void;
  selectable: boolean;
  selected: boolean;
  onToggleSelect: () => void;
}) {
  const submittedRel = item.submitted_at ? formatRel(item.submitted_at) : null;
  const waiting = item.status === 'awaiting_review';
  const reason = [
    item.quiz_title,
    item.cohort_name,
    submittedRel ? `Submitted ${submittedRel}` : null,
    waiting ? `${plural(item.n_awaiting_review, 'answer')} to sign off` : null,
    item.status === 'awaiting_ai' ? `${item.n_awaiting_ai} awaiting AI` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  // Long-press on touch enters selection (in addition to the always-visible
  // checkbox), matching the PeopleListRow batch-mode pattern.
  let pressTimer: ReturnType<typeof setTimeout> | null = null;
  const startPress = () => {
    if (!selectable) return;
    pressTimer = setTimeout(() => {
      onToggleSelect();
      pressTimer = null;
    }, 450);
  };
  const cancelPress = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      pressTimer = null;
    }
  };

  return (
    <li
      className={cn(
        'flex items-stretch transition-colors',
        selected ? 'bg-white/[0.08]' : 'hover:bg-white/[0.06]'
      )}
      onTouchStart={startPress}
      onTouchEnd={cancelPress}
      onTouchMove={cancelPress}
      onTouchCancel={cancelPress}
    >
      {selectable && (
        <button
          type="button"
          aria-label={selected ? 'Deselect attempt' : 'Select attempt'}
          aria-pressed={selected}
          onClick={onToggleSelect}
          className="flex w-11 shrink-0 items-center justify-center self-stretch pl-3 touch-manipulation sm:pl-4"
        >
          <span
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-md border-2 transition-colors',
              selected ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/[0.35]'
            )}
          >
            {selected && <span className="text-[13px] font-semibold leading-none">✓</span>}
          </span>
        </button>
      )}
      <button
        type="button"
        onClick={onOpen}
        className="flex min-w-0 flex-1 min-h-11 items-center gap-3 px-4 py-3.5 text-left touch-manipulation active:bg-white/[0.09] sm:px-5"
      >
        {/* The rule is volt while the attempt waits on a human. */}
        <span
          aria-hidden="true"
          className={cn(
            'h-8 w-[3px] shrink-0 rounded-full',
            waiting ? 'bg-elec-yellow' : 'bg-white/[0.25]'
          )}
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {item.student_name}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {reason}
          </span>
        </span>
        <span className="shrink-0 text-right">
          {item.pct != null ? (
            <>
              <span
                className={cn(
                  'block text-[15px] font-semibold tabular-nums leading-none',
                  // Red only when the score is below the pass mark — a real
                  // problem. A pass is plain white.
                  item.passed_by_score === false ? 'text-red-300' : 'text-white'
                )}
              >
                {item.pct}%
              </span>
              <span
                className={cn(
                  'mt-1 block text-[11px] font-semibold leading-none',
                  waiting ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {STATUS_LABEL[item.status]}
              </span>
            </>
          ) : (
            <span
              className={cn(
                'block text-[12px] font-semibold',
                waiting ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {STATUS_LABEL[item.status]}
            </span>
          )}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    </li>
  );
}

function EmptyState({
  filter,
  hasAny,
  searching,
}: {
  filter: Filter;
  hasAny: boolean;
  searching: boolean;
}) {
  if (!hasAny) {
    return (
      <div className="px-4 py-6 sm:px-5">
        <div className="text-[14px] font-semibold text-white">Nothing to mark yet</div>
        <p className="mt-1 max-w-prose text-[12.5px] leading-snug text-white">
          When learners submit attempts on your quizzes, they land here for AI pre-scoring and your
          sign-off.
        </p>
      </div>
    );
  }
  const note = searching
    ? 'Nothing matches that search.'
    : filter === 'awaiting_review'
      ? 'No attempts waiting for your sign-off.'
      : filter === 'awaiting_ai'
        ? 'No attempts queued for AI grading.'
        : filter === 'signed_off'
          ? 'No approved attempts yet.'
          : 'Nothing in the queue.';
  return <p className="px-4 py-5 text-[13px] font-medium text-white sm:px-5">{note}</p>;
}

/* ───────────────── helpers ───────────────── */

function formatRel(iso: string): string {
  const d = new Date(iso).getTime();
  const now = Date.now();
  const diff = now - d;
  const min = Math.round(diff / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.round(h / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
