import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageFrame } from '@/components/college/primitives';
import {
  useMarkingQueue,
  type MarkingQueueItem,
  type MarkingStatus,
} from '@/hooks/useMarkingQueue';
import { QuizAttemptReviewSheet } from '@/components/college/sheets/QuizAttemptReviewSheet';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   MarkingQueuePage — /college/marking

   The tutor's marking copilot. Lists every completed attempt across all
   their quizzes that has free-response work, sorted by what needs human
   eyes first. Click a row to open the existing per-attempt review sheet.

   ELE-936 / [H1].
   ========================================================================== */

type Filter = 'all' | 'awaiting_review' | 'awaiting_ai' | 'signed_off';

const FILTER_DEFS: Array<{ key: Filter; label: string; tone: string }> = [
  { key: 'awaiting_review', label: 'Pending review', tone: 'amber' },
  { key: 'awaiting_ai', label: 'AI grading', tone: 'blue' },
  { key: 'signed_off', label: 'Approved', tone: 'emerald' },
  { key: 'all', label: 'All', tone: 'white' },
];

export default function MarkingQueuePage() {
  const navigate = useNavigate();
  const { items, stats, loading, refresh } = useMarkingQueue();
  const [bulkGrading, setBulkGrading] = useState<{ done: number; total: number } | null>(null);

  // ELE-925 (H1) — bulk-grade every free-response answer that's still waiting.
  // Iterates the currently visible queue rows and fires the per-attempt grader
  // for any row with n_ai_pending > 0. Fire-and-await sequentially so we don't
  // batter the model with parallel calls; surface progress to the tutor.
  const handleBulkGrade = async () => {
    const targets = items.filter((it) => (it.n_ai_pending ?? 0) > 0);
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

  return (
    <PageFrame>
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-5 sm:py-7">
        {/* Header */}
        <button
          type="button"
          onClick={() => navigate('/college')}
          className="text-[11px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
        >
          ← Back to College Hub
        </button>
        <div className="mt-3 flex items-end justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
              Marking copilot
            </div>
            <h1 className="mt-1 text-[26px] sm:text-[30px] font-semibold tracking-tight text-white leading-tight">
              {stats.total_pending > 0
                ? `${stats.total_pending} attempt${stats.total_pending === 1 ? '' : 's'} need your eyes`
                : 'You\u2019re all caught up'}
            </h1>
            <p className="mt-1 text-[13px] text-white max-w-prose">
              The AI has pre-scored every free-response answer with a rationale. Tap a row to review
              and sign off — or override.
            </p>
          </div>
          {/* Bulk grade pending attempts — H1 ELE-925 */}
          {(stats.awaiting_ai > 0 || bulkGrading) && (
            <button
              type="button"
              onClick={handleBulkGrade}
              disabled={!!bulkGrading}
              className="inline-flex items-center h-10 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold disabled:opacity-50 touch-manipulation"
            >
              {bulkGrading
                ? `Grading… ${bulkGrading.done} / ${bulkGrading.total}`
                : `Grade all pending (${stats.awaiting_ai})`}
            </button>
          )}
        </div>

        {/* Stats strip */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <Stat label="Pending review" value={stats.awaiting_review} tone="amber" />
          <Stat label="AI grading" value={stats.awaiting_ai} tone="blue" />
          <Stat label="Approved (24h)" value={stats.approved_today} tone="emerald" />
          <Stat
            label="Avg score"
            value={stats.avg_pct == null ? '—' : `${stats.avg_pct}%`}
            tone="white"
          />
        </div>

        {/* Filter chips */}
        <div className="mt-5 flex sm:flex-wrap overflow-x-auto snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 pb-1">
          {FILTER_DEFS.map((f) => {
            const count =
              f.key === 'all' ? items.length : items.filter((i) => i.status === f.key).length;
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={cn(
                  'shrink-0 snap-start h-9 px-3.5 rounded-full text-[12px] font-semibold border transition-colors touch-manipulation inline-flex items-center gap-2',
                  active
                    ? f.tone === 'amber'
                      ? 'bg-amber-400 text-black border-amber-400'
                      : f.tone === 'blue'
                        ? 'bg-blue-400 text-black border-blue-400'
                        : f.tone === 'emerald'
                          ? 'bg-emerald-400 text-black border-emerald-400'
                          : 'bg-white text-black border-white'
                    : 'bg-transparent text-white border-white/[0.12] hover:border-white/30'
                )}
              >
                {f.label}
                <span
                  className={cn(
                    'tabular-nums text-[11px] px-1.5 rounded',
                    active ? 'bg-black/20' : 'bg-white/[0.08]'
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="mt-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by student, quiz, or cohort"
            className="w-full h-11 px-3.5 rounded-lg bg-[hsl(0_0%_10%)] border border-white/[0.08] text-[13px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 touch-manipulation"
          />
        </div>

        {/* List */}
        <div className="mt-5">
          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[88px] rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06] animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState filter={filter} hasAny={items.length > 0} />
          ) : (
            <>
              <ul className="space-y-2">
                {visible.map((item) => (
                  <li key={item.attempt_id}>
                    <QueueRow item={item} onOpen={() => openItem(item)} />
                  </li>
                ))}
              </ul>
              {canLoadMore && (
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-[11.5px] text-white/60 tabular-nums">
                    Showing {visible.length} of {filtered.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => setVisibleCount((n) => n + 50)}
                    className="h-11 px-4 text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                  >
                    Load more →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

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
    </PageFrame>
  );
}

/* ───────────────── stat card ───────────────── */

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number | string;
  tone: 'amber' | 'blue' | 'emerald' | 'white';
}) {
  const valueClass =
    tone === 'amber'
      ? 'text-amber-300'
      : tone === 'blue'
        ? 'text-blue-300'
        : tone === 'emerald'
          ? 'text-emerald-300'
          : 'text-white';
  const isZero = typeof value === 'number' && value === 0;
  return (
    <div className="bg-[hsl(0_0%_10%)] border border-white/[0.06] rounded-xl px-3.5 py-3">
      <div
        className={cn(
          'text-[22px] font-semibold tabular-nums leading-none',
          isZero ? 'text-white' : valueClass
        )}
      >
        {value}
      </div>
      <div className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-white">{label}</div>
    </div>
  );
}

/* ───────────────── row ───────────────── */

const STATUS_META: Record<MarkingStatus, { label: string; tone: string }> = {
  awaiting_review: { label: 'Review', tone: 'amber' },
  awaiting_ai: { label: 'AI grading', tone: 'blue' },
  signed_off: { label: 'Approved', tone: 'emerald' },
  no_free_response: { label: 'Auto', tone: 'white' },
};

function QueueRow({ item, onOpen }: { item: MarkingQueueItem; onOpen: () => void }) {
  const { tone, label } = STATUS_META[item.status];
  const dotClass =
    tone === 'amber'
      ? 'bg-amber-400'
      : tone === 'blue'
        ? 'bg-blue-400'
        : tone === 'emerald'
          ? 'bg-emerald-400'
          : 'bg-white';
  const pillClass =
    tone === 'amber'
      ? 'bg-amber-500/[0.10] text-amber-200 border-amber-500/30'
      : tone === 'blue'
        ? 'bg-blue-500/[0.10] text-blue-200 border-blue-500/30'
        : tone === 'emerald'
          ? 'bg-emerald-500/[0.10] text-emerald-200 border-emerald-500/30'
          : 'bg-white/[0.06] text-white border-white/[0.12]';
  const submittedRel = item.submitted_at ? formatRel(item.submitted_at) : '—';

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group w-full text-left bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_12%)] active:bg-[hsl(0_0%_14%)] border border-white/[0.06] hover:border-white/[0.12] rounded-xl px-4 py-3.5 transition-colors touch-manipulation"
    >
      <div className="flex items-start gap-3">
        <span className={cn('mt-1.5 h-2 w-2 rounded-full shrink-0', dotClass)} aria-hidden />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[14px] font-semibold text-white truncate">
              {item.student_name}
            </span>
            <span
              className={cn(
                'inline-flex items-center h-5 px-2 rounded-md border text-[10px] font-semibold uppercase tracking-[0.06em]',
                pillClass
              )}
            >
              {label}
            </span>
          </div>
          <div className="mt-1 text-[12.5px] text-white truncate">{item.quiz_title}</div>
          <div className="mt-1 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-white">
            {item.cohort_name && <span className="truncate">{item.cohort_name}</span>}
            {item.cohort_name && <span className="text-white/30">·</span>}
            <span>Submitted {submittedRel}</span>
            {item.status === 'awaiting_review' && (
              <>
                <span className="text-white/30">·</span>
                <span className="text-amber-200">
                  {item.n_awaiting_review} answer{item.n_awaiting_review === 1 ? '' : 's'} to sign
                  off
                </span>
              </>
            )}
            {item.status === 'awaiting_ai' && (
              <>
                <span className="text-white/30">·</span>
                <span className="text-blue-200">{item.n_awaiting_ai} awaiting AI</span>
              </>
            )}
          </div>
        </div>
        <div className="shrink-0 text-right pl-2">
          {item.pct != null ? (
            <>
              <div
                className={cn(
                  'text-[18px] font-semibold tabular-nums leading-none',
                  item.passed_by_score === false
                    ? 'text-rose-300'
                    : item.passed_by_score === true
                      ? 'text-emerald-300'
                      : 'text-white'
                )}
              >
                {item.pct}%
              </div>
              {item.quiz_pass_mark != null && (
                <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white">
                  Pass {item.quiz_pass_mark}%
                </div>
              )}
            </>
          ) : (
            <div className="text-[11px] text-white">No score</div>
          )}
        </div>
      </div>
    </button>
  );
}

function EmptyState({ filter, hasAny }: { filter: Filter; hasAny: boolean }) {
  if (!hasAny) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-5 py-10 text-center">
        <div className="text-[14px] font-semibold text-white">Nothing to mark yet</div>
        <p className="mt-1.5 text-[12px] text-white max-w-sm mx-auto">
          When learners submit attempts on your quizzes, they'll land here for AI pre-scoring and
          your sign-off.
        </p>
      </div>
    );
  }
  const note =
    filter === 'awaiting_review'
      ? 'No attempts waiting for your sign-off — nice.'
      : filter === 'awaiting_ai'
        ? 'No attempts queued for AI grading right now.'
        : filter === 'signed_off'
          ? 'No approved attempts in the current view.'
          : 'No attempts match the current search.';
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-5 py-8 text-center">
      <div className="text-[13px] font-medium text-white">{note}</div>
    </div>
  );
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
