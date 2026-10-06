import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  INBOX_KIND_LABEL,
  INBOX_KIND_ORDER,
  useUnifiedInbox,
  type InboxItem,
  type InboxKind,
} from '@/hooks/useUnifiedInbox';

/* ==========================================================================
   UnifiedInboxPage — /college/inbox. Everything a tutor has to act on.

   Rebuilt 6 Oct 2026 (Andrew: "we need this to be designed excellent… make
   sure it all works, everything will come through this"). One list from
   get_college_inbox plus quiz marking: hours to verify, app learning to
   approve, evidence to assess, comments and messages to answer, IQA
   verdicts, progress reviews, check-ins and marking. Each row opens the
   exact item. Doing the work clears it; the dot only means "not seen yet".

   Layout: kinds down the left on a wide screen (chips on a phone), the list
   on the right, waiting-too-long first. "My learners" narrows to the
   cohorts you tutor.
   ========================================================================== */

type Filter = 'all' | 'urgent' | InboxKind;

const KIND_HINT: Record<InboxKind, string> = {
  hours: 'Off-the-job entries to verify',
  app_learning: 'Learning in the app to approve',
  evidence: 'Portfolio evidence to assess',
  comment: 'Learner replies on their portfolio',
  message: 'Learner messages to answer',
  iqa: 'Samples waiting for your verdict',
  review: 'Progress reviews to book, write up or sign',
  checkin: 'Learners the risk check flags',
  marking: 'Written quiz answers to sign off',
};

// Old links (?tab=otj etc.) still land somewhere sensible.
const TAB_ALIAS: Record<string, Filter> = { otj: 'hours', portfolio: 'evidence' };

const HELP: PageHelpContent = {
  id: 'college-inbox',
  title: 'Your inbox',
  what: 'Everything at your college that needs a tutor, in one list: hours, app learning, evidence, comments, messages, IQA, progress reviews, check-ins and marking. Each one opens exactly where it is done, and leaves the inbox when it is.',
  steps: [
    { title: 'Start at the top', body: 'Anything that has waited too long comes first, marked orange. A learner’s hours and evidence start to cost them after a week.' },
    { title: 'Open and act', body: 'The button says what to do: Verify, Assess, Reply, Book. It takes you straight to that item, not just the learner.' },
    { title: 'Narrow it down', body: 'Pick a kind on the left, search for a learner, or switch to My learners for the cohorts you tutor.' },
  ],
  legend: [
    { swatch: 'bg-orange-500', label: 'Waiting too long', body: 'Hours or evidence over a week, a message over two days, a review overdue.' },
    { swatch: 'bg-elec-yellow', label: 'Not seen yet', body: 'A dot until you open it. Doing the work is what clears it.' },
  ],
  notes: [
    { title: 'The same list everywhere', body: 'The home page’s Needs you and the bell read this list, so the counts always match.' },
  ],
};

const waitingText = (i: InboxItem) => {
  if (i.kind === 'review') return i.waitingDays > 0 ? `${i.waitingDays} days overdue` : 'Coming up';
  if (i.kind === 'checkin') return 'Flagged today';
  return i.waitingDays <= 0 ? 'Today' : i.waitingDays === 1 ? 'Waiting since yesterday' : `Waiting ${i.waitingDays} days`;
};

const initialsOf = (i: InboxItem) => {
  if (i.kind === 'marking') return 'Q';
  if (i.kind === 'iqa') return 'IQ';
  const name = (i.learner ?? i.title).replace(/\(.*?\)/g, '');
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
};

export default function UnifiedInboxPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const { items, stats, loading, error, refresh, markSeen, markAllAsRead } = useUnifiedInbox();

  const [filter, setFilter] = useState<Filter>(() => {
    const t = searchParams.get('tab');
    if (!t) return 'all';
    if (t in TAB_ALIAS) return TAB_ALIAS[t];
    return t === 'urgent' || (INBOX_KIND_ORDER as string[]).includes(t) ? (t as Filter) : 'all';
  });
  const [mineOnly, setMineOnly] = useState(false);
  const [search, setSearch] = useState('');

  // Keep the filter in the URL so a link (or Back) lands on the same view.
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    if (filter === 'all') next.delete('tab');
    else next.set('tab', filter);
    if (next.toString() !== searchParams.toString()) setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const scoped = useMemo(() => (mineOnly ? items.filter((i) => i.mine) : items), [items, mineOnly]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: scoped.length, urgent: scoped.filter((i) => i.urgent).length };
    for (const k of INBOX_KIND_ORDER) c[k] = scoped.filter((i) => i.kind === k).length;
    return c;
  }, [scoped]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return scoped.filter(
      (i) =>
        (filter === 'all' || (filter === 'urgent' ? i.urgent : i.kind === filter)) &&
        (!q ||
          [i.learner, i.title, i.body, i.cohort].some((v) => (v ?? '').toLowerCase().includes(q)))
    );
  }, [scoped, filter, search]);

  const urgentRows = visible.filter((i) => i.urgent);
  const otherRows = visible.filter((i) => !i.urgent);

  const open = (i: InboxItem) => {
    if (i.unread && i.kind !== 'marking') void markSeen([i.key]).catch(() => undefined);
    navigate(i.href);
  };

  const markAll = async () => {
    try {
      const n = await markAllAsRead();
      toast({ title: n ? `${n} marked as seen` : 'Nothing new to mark' });
    } catch (e) {
      toast({ title: 'Not marked', description: (e as Error).message, variant: 'destructive' });
    }
  };

  const kindsWithItems = INBOX_KIND_ORDER.filter((k) => counts[k] > 0);
  const filterOptions: Array<{ key: Filter; label: string; hint?: string }> = [
    { key: 'all', label: 'Everything' },
    { key: 'urgent', label: 'Waiting too long' },
    ...kindsWithItems.map((k) => ({ key: k as Filter, label: INBOX_KIND_LABEL[k], hint: KIND_HINT[k] })),
  ];

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title="Inbox"
        backTo="/college"
        trailing={<PageHelpButton help={HELP} compact />}
      />
      <HubBody pushContext="Get notified the moment something lands in your inbox">
        {/* Hero */}
        <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">Inbox</p>
            <h1 className="mt-2 text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[36px]">
              {loading ? 'Gathering your work…' : counts.all === 0 ? 'You’re clear' : `${counts.all} ${counts.all === 1 ? 'thing needs' : 'things need'} you`}
            </h1>
            <p className="mt-2 text-[15px] leading-relaxed text-white">
              {loading
                ? 'Hours, evidence, messages, reviews and marking from across your college.'
                : counts.all === 0
                  ? 'Nothing is waiting. New hours, evidence, messages and reviews land here as they arrive.'
                  : [
                      counts.urgent ? `${counts.urgent} waiting too long` : 'nothing overdue',
                      `${stats.mine} in your cohorts`,
                      stats.unread ? `${stats.unread} not seen yet` : null,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2.5">
            <div className="inline-flex rounded-xl border border-white/[0.12] p-1" role="tablist" aria-label="Whose work">
              {[
                [false, 'Everyone'],
                [true, 'My learners'],
              ].map(([v, label]) => (
                <button
                  key={String(v)}
                  type="button"
                  role="tab"
                  aria-selected={mineOnly === v}
                  onClick={() => setMineOnly(v as boolean)}
                  className={cn(
                    'h-10 rounded-lg px-4 text-[13px] font-semibold touch-manipulation',
                    mineOnly === v ? 'bg-white text-black' : 'text-white'
                  )}
                >
                  {label as string}
                </button>
              ))}
            </div>
            {stats.unread > 0 && (
              <button
                type="button"
                onClick={() => void markAll()}
                className="h-11 shrink-0 rounded-xl border border-white/[0.14] px-3.5 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
              >
                Mark seen
              </button>
            )}
          </div>
        </header>

        {error && (
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-orange-500/40 px-4 py-3">
            <p className="text-[13.5px] text-white">Couldn’t load the inbox: {error}</p>
            <button type="button" onClick={() => void refresh()} className="h-11 px-3 text-[13px] font-semibold text-elec-yellow">
              Try again
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
          {/* Kinds: a rail on a wide screen, chips on a phone */}
          <nav aria-label="Inbox filters" className="lg:sticky lg:top-16">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
              {filterOptions.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={filter === f.key}
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    'inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[12.5px] font-semibold touch-manipulation',
                    filter === f.key ? 'border-white bg-white text-black' : 'border-white/[0.14] text-white'
                  )}
                >
                  {f.label}
                  <span className="tabular-nums">{counts[f.key] ?? 0}</span>
                </button>
              ))}
            </div>
            <ul className="hidden overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-2 lg:block">
              {filterOptions.map((f, idx) => (
                <li key={f.key}>
                  {idx === 2 && <div className="mx-3 my-2 border-t border-white/[0.08]" />}
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
                      {f.hint && (
                        <span className={cn('block truncate text-[11.5px]', filter === f.key ? 'text-black' : 'text-white')}>
                          {f.hint}
                        </span>
                      )}
                    </span>
                    <span
                      className={cn(
                        'shrink-0 rounded-full px-2 py-0.5 text-[12px] font-bold tabular-nums',
                        f.key === 'urgent' && (counts.urgent ?? 0) > 0
                          ? 'bg-orange-500 text-black'
                          : filter === f.key
                            ? 'bg-black text-white'
                            : 'bg-white/[0.1] text-white'
                      )}
                    >
                      {counts[f.key] ?? 0}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* The list */}
          <section className="min-w-0 space-y-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find a learner, cohort or entry"
                aria-label="Find a learner, cohort or entry"
                className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
              />
            </div>

            {loading ? (
              <div className="space-y-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-[84px] animate-pulse rounded-2xl bg-white/[0.04]" />
                ))}
              </div>
            ) : visible.length === 0 ? (
              <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] px-6 py-10 text-center">
                <p className="text-[18px] font-semibold text-white">
                  {counts.all === 0 ? 'Nothing needs you' : 'Nothing matches this view'}
                </p>
                <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-white">
                  {counts.all === 0
                    ? 'When a learner logs hours, submits evidence, sends a message or a review falls due, it lands here.'
                    : 'Try another kind on the left, clear the search, or switch to Everyone.'}
                </p>
              </div>
            ) : (
              <>
                {urgentRows.length > 0 && (
                  <Group title="Waiting too long" tone="urgent" rows={urgentRows} onOpen={open} />
                )}
                {otherRows.length > 0 && (
                  <Group title={urgentRows.length ? 'Everything else' : 'To do'} rows={otherRows} onOpen={open} />
                )}
              </>
            )}
          </section>
        </div>
      </HubBody>
    </HubPage>
  );
}

function Group({
  title,
  rows,
  tone,
  onOpen,
}: {
  title: string;
  rows: InboxItem[];
  tone?: 'urgent';
  onOpen: (i: InboxItem) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between px-1">
        <h2 className={cn('text-[13px] font-semibold', tone === 'urgent' ? 'text-orange-300' : 'text-white')}>{title}</h2>
        <span className="text-[12px] tabular-nums text-white">{rows.length}</span>
      </div>
      <ul className="-mx-4 divide-y divide-white/[0.06] overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x">
        {rows.map((i) => (
          <li key={i.key}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => onOpen(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpen(i);
                }
              }}
              className="flex w-full cursor-pointer items-center gap-4 px-4 py-4 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:px-5"
            >
              <span className="relative shrink-0">
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-full text-[13.5px] font-bold',
                    i.urgent ? 'bg-orange-500 text-black' : 'bg-white/[0.1] text-white'
                  )}
                >
                  {initialsOf(i)}
                </span>
                {i.unread && (
                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[hsl(0_0%_14%)] bg-elec-yellow" aria-label="Not seen yet" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="truncate text-[15px] font-semibold text-white">{i.learner ?? i.title}</span>
                  <span className="shrink-0 rounded-full border border-white/[0.16] px-2 py-0.5 text-[10.5px] font-semibold text-white">
                    {INBOX_KIND_LABEL[i.kind]}
                  </span>
                  {i.mine && (
                    <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10.5px] font-bold text-black">Yours</span>
                  )}
                </span>
                <span className="mt-1 line-clamp-2 block text-[13px] leading-snug text-white">
                  {i.learner ? (
                    <>
                      <span className="font-semibold">{i.title}</span>
                      {i.body ? <> · {i.body}</> : null}
                    </>
                  ) : (
                    i.body
                  )}
                </span>
                <span className="mt-1 block text-[12px] text-white">
                  <span className={cn('font-semibold', i.urgent && 'text-orange-300')}>{waitingText(i)}</span>
                  {i.cohort ? ` · ${i.cohort}` : ''}
                </span>
              </span>
              <span
                className={cn(
                  'hidden h-11 w-[104px] shrink-0 items-center justify-center rounded-xl text-[13px] font-bold sm:inline-flex',
                  i.urgent ? 'bg-elec-yellow text-black' : 'border border-white/[0.18] text-white'
                )}
              >
                {i.action}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-white sm:hidden" aria-hidden="true" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
