import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { useUnifiedInbox, type InboxItem, type InboxKind } from '@/hooks/useUnifiedInbox';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

/* ==========================================================================
   UnifiedInboxPage — /college/inbox

   Single inbox combining portfolio comments awaiting reply, off-the-job
   entries pending verification, IQA samples pending verdict, and unread
   message threads. Tap any row to deep-link to the source surface.

   Rebuilt on the shared hub shell. The 30px headline ("7 items need
   attention") and its paragraph went — the count is now the KPI row, which
   also says how long the oldest of each kind has been waiting, which is the
   thing the headline never told you. The four coloured stat tiles (amber,
   emerald, purple, blue) and the matching coloured chips and dots are gone:
   the kind is a word at the start of the row's reason line.

   The filter chips still drive `?tab=` so dashboard links land on the right
   filter. "Mark all read" is the hook's own `markAllAsRead`, which existed
   but nothing on this page called.

   ELE-940 / [M4].
   ========================================================================== */

type Filter = 'all' | InboxKind;

const FILTER_DEFS: Array<{ key: Filter; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'portfolio', label: 'Comments' },
  { key: 'otj', label: 'Off-the-job' },
  { key: 'iqa', label: 'IQA' },
  { key: 'message', label: 'Messages' },
];

const KIND_LABEL: Record<InboxKind, string> = {
  portfolio: 'Comment',
  otj: 'Off-the-job',
  iqa: 'IQA',
  message: 'Message',
};

const DAY_MS = 86_400_000;

function isFilter(v: string | null): v is Filter {
  return v === 'all' || v === 'portfolio' || v === 'otj' || v === 'iqa' || v === 'message';
}

function daysOld(iso: string): number {
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return 0;
  return Math.max(0, Math.floor((Date.now() - t) / DAY_MS));
}

function oldestDays(items: InboxItem[], kind: InboxKind): number | null {
  const ages = items.filter((i) => i.kind === kind).map((i) => daysOld(i.occurred_at));
  return ages.length ? Math.max(...ages) : null;
}

function waitingVerdict(n: number, oldest: number | null, noun: string): string {
  if (n === 0) return `No ${noun} waiting`;
  if (oldest !== null && oldest >= 7) return `Oldest has sat ${oldest} days`;
  if (oldest !== null && oldest >= 1) return `Oldest waiting ${oldest}d`;
  return 'All from today';
}

export default function UnifiedInboxPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const { items, stats, loading, error, refresh, markAllAsRead } = useUnifiedInbox();
  // Deep-linkable: /college/inbox?tab=otj lands on the OTJ filter directly,
  // so dashboard CTAs (e.g. Today's OTJ rows) can route here precisely.
  const initialFilter: Filter = (() => {
    const t = searchParams.get('tab');
    return isFilter(t) ? t : 'all';
  })();
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [search, setSearch] = useState('');
  const [marking, setMarking] = useState(false);

  // Keep URL in sync when the user taps a chip — preserves shareable state.
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

  const oldest = useMemo(
    () => ({
      portfolio: oldestDays(items, 'portfolio'),
      otj: oldestDays(items, 'otj'),
      iqa: oldestDays(items, 'iqa'),
      message: oldestDays(items, 'message'),
    }),
    [items]
  );

  const handleMarkAllRead = async () => {
    setMarking(true);
    try {
      const n = await markAllAsRead();
      toast({ title: n > 0 ? `Marked ${n} as read` : 'Nothing unread' });
    } catch (e) {
      toast({
        title: 'Could not mark as read',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setMarking(false);
    }
  };

  const listLabel =
    filter === 'all'
      ? 'Needs you'
      : (FILTER_DEFS.find((f) => f.key === filter)?.label ?? 'Needs you');

  return (
    <HubPage>
      <HubMasthead section="College" title="Inbox" backTo="/college" />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        {error && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              'flex min-h-11 items-center justify-between gap-3 rounded-2xl border border-red-400/40 px-4 py-3',
              CARD_SURFACE
            )}
          >
            <span className="text-[13px] font-medium text-white">
              Could not load the inbox — {error}
            </span>
            <button
              type="button"
              onClick={refresh}
              className="-my-2 flex h-11 shrink-0 items-center px-2 text-[12px] font-bold text-elec-yellow touch-manipulation"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* Four live counts, one per source, each saying how long its oldest
            item has waited. Tapping one applies the matching filter. */}
        <HubKpiRow>
          <HubKpi
            accent
            label="Comments"
            value={loading ? '—' : String(stats.portfolio)}
            verdict={
              loading ? undefined : waitingVerdict(stats.portfolio, oldest.portfolio, 'replies')
            }
            sentiment={oldest.portfolio !== null && oldest.portfolio >= 7 ? 'bad' : 'neutral'}
            onClick={() => setFilter('portfolio')}
          />
          <HubKpi
            label="Off-the-job"
            value={loading ? '—' : String(stats.otj)}
            verdict={loading ? undefined : waitingVerdict(stats.otj, oldest.otj, 'entries')}
            sentiment={oldest.otj !== null && oldest.otj >= 7 ? 'bad' : 'neutral'}
            onClick={() => setFilter('otj')}
          />
          <HubKpi
            label="IQA verdicts"
            value={loading ? '—' : String(stats.iqa)}
            verdict={loading ? undefined : waitingVerdict(stats.iqa, oldest.iqa, 'samples')}
            sentiment={oldest.iqa !== null && oldest.iqa >= 7 ? 'bad' : 'neutral'}
            onClick={() => setFilter('iqa')}
          />
          <HubKpi
            label="Messages"
            value={loading ? '—' : String(stats.message)}
            verdict={loading ? undefined : waitingVerdict(stats.message, oldest.message, 'threads')}
            onClick={() => setFilter('message')}
          />
        </HubKpiRow>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
            <HubSectionHeading>{listLabel}</HubSectionHeading>
            <div className="flex shrink-0 items-center gap-3">
              <span
                className={cn(
                  'text-[11px] font-semibold tabular-nums',
                  filtered.some((i) => daysOld(i.occurred_at) >= 7)
                    ? 'text-elec-yellow'
                    : 'text-white'
                )}
              >
                {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
              </span>
              {stats.unread > 0 && (
                <button
                  type="button"
                  onClick={() => void handleMarkAllRead()}
                  disabled={marking}
                  className="-my-2 -mr-2 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation"
                >
                  {marking ? 'Marking…' : 'Mark all read'}
                </button>
              )}
            </div>
          </motion.div>

          {/* Filter chips — the active one is solid white, not volt, so the
              page keeps its single volt control for an action. Scrolls on a
              phone, wraps from sm. */}
          <motion.div
            variants={itemVariants}
            className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {FILTER_DEFS.map((f) => {
              const count =
                f.key === 'all' ? items.length : items.filter((i) => i.kind === f.key).length;
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
              placeholder="Filter by name, content or cohort"
              aria-label="Filter the inbox"
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
                {Array.from({ length: 5 }).map((_, i) => (
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
              <ul className="divide-y divide-white/[0.10]">
                {filtered.map((item) => (
                  <InboxRow key={item.key} item={item} onOpen={() => navigate(item.href)} />
                ))}
              </ul>
            )}
          </motion.div>
        </motion.section>
      </HubBody>
    </HubPage>
  );
}

/* ───────────────── row ───────────────── */

function InboxRow({ item, onOpen }: { item: InboxItem; onOpen: () => void }) {
  const age = daysOld(item.occurred_at);
  // A week unanswered is a real cost — to the learner's hours record, to a
  // reply they are waiting on — so that is what earns the volt rule.
  const urgent = age >= 7;
  const reason = [KIND_LABEL[item.kind], item.body.replace(/\s+/g, ' ').trim(), item.context]
    .filter(Boolean)
    .join(' · ');
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full min-h-11 items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
      >
        <span
          aria-hidden="true"
          className={cn(
            'h-8 w-[3px] shrink-0 rounded-full',
            urgent ? 'bg-elec-yellow' : 'bg-white/[0.25]'
          )}
        />
        <span className="min-w-0 flex-1">
          <span
            className={cn(
              'block truncate text-[14px] leading-tight text-white',
              item.unread ? 'font-semibold' : 'font-medium'
            )}
          >
            {item.title}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {reason}
          </span>
        </span>
        <span
          className={cn(
            'shrink-0 text-[13px] font-semibold tabular-nums',
            urgent ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {formatRel(item.occurred_at)}
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
        <div className="text-[14px] font-semibold text-white">Inbox clear</div>
        <p className="mt-1 max-w-prose text-[12.5px] leading-snug text-white">
          When a learner replies, an off-the-job entry lands for verification, an IQA sample needs a
          verdict or someone messages you, it shows up here.
        </p>
      </div>
    );
  }
  const note = searching
    ? 'Nothing matches that search.'
    : filter === 'portfolio'
      ? 'No comments waiting for a reply.'
      : filter === 'otj'
        ? 'No off-the-job entries waiting for verification.'
        : filter === 'iqa'
          ? 'No IQA samples awaiting a verdict.'
          : filter === 'message'
            ? 'No unread messages.'
            : 'Nothing outstanding.';
  return <p className="px-4 py-5 text-[13px] font-medium text-white sm:px-5">{note}</p>;
}

/* ───────────────── helpers ───────────────── */

function formatRel(iso: string): string {
  const d = new Date(iso).getTime();
  const now = Date.now();
  const diff = now - d;
  if (diff < 60_000) return 'just now';
  const min = Math.round(diff / 60000);
  if (min < 60) return `${min}m`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h}h`;
  const days = Math.round(h / 24);
  if (days < 7) return `${days}d`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
