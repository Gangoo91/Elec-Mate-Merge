import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageFrame } from '@/components/college/primitives';
import { useUnifiedInbox, type InboxItem, type InboxKind } from '@/hooks/useUnifiedInbox';
import { cn } from '@/lib/utils';

/* ==========================================================================
   UnifiedInboxPage — /college/inbox

   Single inbox combining portfolio comments awaiting reply, OTJ pending
   verification, IQA samples pending verdict, and unread message threads.
   Click any row to deep-link to the source surface.

   ELE-940 / [M4].
   ========================================================================== */

type Filter = 'all' | InboxKind;

const FILTER_DEFS: Array<{ key: Filter; label: string; tone: string }> = [
  { key: 'all', label: 'All', tone: 'white' },
  { key: 'portfolio', label: 'Comments', tone: 'amber' },
  { key: 'otj', label: 'OTJ', tone: 'emerald' },
  { key: 'iqa', label: 'IQA', tone: 'purple' },
  { key: 'message', label: 'Messages', tone: 'blue' },
];

const KIND_META: Record<InboxKind, { label: string; tone: string }> = {
  portfolio: { label: 'Comment', tone: 'amber' },
  otj: { label: 'OTJ', tone: 'emerald' },
  iqa: { label: 'IQA', tone: 'purple' },
  message: { label: 'Message', tone: 'blue' },
};

function isFilter(v: string | null): v is Filter {
  return v === 'all' || v === 'portfolio' || v === 'otj' || v === 'iqa' || v === 'message';
}

export default function UnifiedInboxPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { items, stats, loading, error, refresh } = useUnifiedInbox();
  // Deep-linkable: /college/inbox?tab=otj lands on the OTJ filter directly,
  // so dashboard CTAs (e.g. TutorToday OTJ row) can route here precisely.
  const initialFilter: Filter = (() => {
    const t = searchParams.get('tab');
    return isFilter(t) ? t : 'all';
  })();
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [search, setSearch] = useState('');

  // Keep URL in sync when the user clicks a chip — preserves shareable state.
  useEffect(() => {
    const current = searchParams.get('tab') ?? 'all';
    if (filter === current) return;
    const next = new URLSearchParams(searchParams);
    if (filter === 'all') next.delete('tab');
    else next.set('tab', filter);
    setSearchParams(next, { replace: true });
  }, [filter, searchParams, setSearchParams]);

  const filtered = useMemo(() => {
    let list = items;
    if (filter !== 'all') list = list.filter((i) => i.kind === filter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.body.toLowerCase().includes(q) ||
          (i.context ?? '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [items, filter, search]);

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
              Inbox
            </div>
            <h1 className="mt-1 text-[26px] sm:text-[30px] font-semibold tracking-tight text-white leading-tight">
              {stats.total > 0
                ? `${stats.total} item${stats.total === 1 ? '' : 's'} need attention`
                : 'You\u2019re all caught up'}
            </h1>
            <p className="mt-1 text-[13px] text-white max-w-prose">
              Everything that's waiting on you — comments, OTJ, IQA verdicts, messages — in one
              place. Tap to jump straight to the source.
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <Stat label="Comments" value={stats.portfolio} tone="amber" />
          <Stat label="OTJ pending" value={stats.otj} tone="emerald" />
          <Stat label="IQA pending" value={stats.iqa} tone="purple" />
          <Stat label="Unread messages" value={stats.message} tone="blue" />
        </div>

        {/* Filter chips */}
        <div className="mt-5 flex sm:flex-wrap overflow-x-auto snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 pb-1">
          {FILTER_DEFS.map((f) => {
            const count =
              f.key === 'all' ? items.length : items.filter((i) => i.kind === f.key).length;
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
                      : f.tone === 'emerald'
                        ? 'bg-emerald-400 text-black border-emerald-400'
                        : f.tone === 'purple'
                          ? 'bg-purple-400 text-black border-purple-400'
                          : f.tone === 'blue'
                            ? 'bg-blue-400 text-black border-blue-400'
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
            placeholder="Filter by name, content, or cohort"
            className="w-full h-11 px-3.5 rounded-lg bg-[hsl(0_0%_10%)] border border-white/[0.08] text-[13px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 touch-manipulation"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-xl border border-rose-300/30 bg-rose-500/[0.06] px-4 py-3 text-[13px] text-rose-200 flex items-center justify-between gap-3">
            <span>{error}</span>
            <button
              onClick={refresh}
              className="text-[12px] font-medium text-rose-100 hover:text-white underline-offset-2 hover:underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* List */}
        <div className="mt-5">
          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[78px] rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06] animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState filter={filter} hasAny={items.length > 0} />
          ) : (
            <ul className="space-y-2">
              {filtered.map((item) => (
                <li key={item.key}>
                  <InboxRow item={item} onOpen={() => navigate(item.href)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
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
  value: number;
  tone: 'amber' | 'blue' | 'emerald' | 'purple';
}) {
  const valueClass =
    tone === 'amber'
      ? 'text-amber-300'
      : tone === 'blue'
        ? 'text-blue-300'
        : tone === 'emerald'
          ? 'text-emerald-300'
          : 'text-purple-300';
  const isZero = value === 0;
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

function InboxRow({ item, onOpen }: { item: InboxItem; onOpen: () => void }) {
  const meta = KIND_META[item.kind];
  const dotClass =
    meta.tone === 'amber'
      ? 'bg-amber-400'
      : meta.tone === 'blue'
        ? 'bg-blue-400'
        : meta.tone === 'emerald'
          ? 'bg-emerald-400'
          : 'bg-purple-400';
  const pillClass =
    meta.tone === 'amber'
      ? 'bg-amber-500/[0.10] text-amber-200 border-amber-500/30'
      : meta.tone === 'blue'
        ? 'bg-blue-500/[0.10] text-blue-200 border-blue-500/30'
        : meta.tone === 'emerald'
          ? 'bg-emerald-500/[0.10] text-emerald-200 border-emerald-500/30'
          : 'bg-purple-500/[0.10] text-purple-200 border-purple-500/30';

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
            <span
              className={cn(
                'inline-flex items-center h-5 px-2 rounded-md border text-[10px] font-semibold uppercase tracking-[0.06em]',
                pillClass
              )}
            >
              {meta.label}
            </span>
            <span className="text-[14px] font-semibold text-white truncate">{item.title}</span>
          </div>
          {item.body && (
            <div className="mt-1 text-[12.5px] text-white line-clamp-2 leading-snug">
              {item.body}
            </div>
          )}
          <div className="mt-1 flex items-center gap-x-2 gap-y-0.5 text-[11px] text-white flex-wrap">
            {item.context && (
              <>
                <span className="truncate">{item.context}</span>
                <span className="text-white/30">·</span>
              </>
            )}
            <span>{formatRel(item.occurred_at)}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function EmptyState({ filter, hasAny }: { filter: Filter; hasAny: boolean }) {
  if (!hasAny) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-5 py-10 text-center">
        <div className="text-[14px] font-semibold text-white">Inbox zero</div>
        <p className="mt-1.5 text-[12px] text-white max-w-sm mx-auto">
          When learners reply, OTJ entries land for verification, IQA samples need a verdict, or
          someone messages you, it'll show up here.
        </p>
      </div>
    );
  }
  const note =
    filter === 'portfolio'
      ? 'No portfolio comments waiting on you.'
      : filter === 'otj'
        ? 'No OTJ entries pending verification.'
        : filter === 'iqa'
          ? 'No IQA samples awaiting verdict.'
          : filter === 'message'
            ? 'No unread messages.'
            : 'No items match the current search.';
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
  if (diff < 60_000) return 'just now';
  const min = Math.round(diff / 60000);
  if (min < 60) return `${min}m ago`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.round(h / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
