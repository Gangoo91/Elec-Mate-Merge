import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import {
  AlertTriangle,
  ArrowLeft,
  Camera,
  ShieldCheck,
  Inbox,
  MessageCircle,
  Phone,
  Search,
  Settings2,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  cardCn,
  eyebrowCn,
  statValueCn,
  primaryButtonCn,
  ghostButtonCn,
  containerVariants,
  itemVariants,
} from '@/components/shared/surfaceStyles';
import {
  type Enquiry,
  SOURCE_LABEL,
  enquiryPageUrl,
  useEnquiries,
  useEnquiry,
  useEnquiryInbox,
  showJunkWarning,
  useDismissJunkWarning,
  useUpdateEnquiry,
} from '@/hooks/useEnquiries';
import EnquiryDetailSheet from '@/components/electrician/enquiries/EnquiryDetailSheet';
import { SwipeableRow } from '@/components/ui/swipeable-row';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { toast as sonner } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { formatGBP, useEnquiryValue } from '@/hooks/useEnquiryValue';

/**
 * Enquiries inbox (ELE-2022).
 *
 * Website forms, forwarded Gmail and lead-site emails land here already read:
 * one tap turns an enquiry into a customer, a quote or a site visit.
 *
 * Phone: list + bottom sheet. Desktop (lg+): two panes, list left and the open
 * enquiry right, like a mail app.
 */

type Tab = 'todo' | 'replied' | 'done' | 'spam';

const PAGE_WIDTH = 'lg:mx-auto lg:max-w-[1400px] lg:px-8';

function median(values: number[]): number | null {
  if (!values.length) return null;
  const s = [...values].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function formatMinutes(mins: number | null): string {
  if (mins == null) return '–';
  if (mins < 60) return `${Math.round(mins)} min`;
  if (mins < 60 * 24) return `${Math.round(mins / 60)} hr`;
  return `${Math.round(mins / 60 / 24)} days`;
}

function dayLabel(iso: string) {
  const d = new Date(iso);
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  return 'Earlier';
}

const EnquiriesPage = () => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [params, setParams] = useSearchParams();
  const { data: enquiries = [], isLoading, isError: listFailed, refetch } = useEnquiries();
  const qc = useQueryClient();
  const updateEnquiry = useUpdateEnquiry();

  // Swipe on a row (phones): right = call, left = dismiss with Undo
  const tap = () => Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
  const swipeCall = (e: Enquiry) => {
    if (!e.phone) return;
    tap();
    if (!e.first_actioned_at) {
      updateEnquiry.mutate({ id: e.id, patch: { first_actioned_at: new Date().toISOString() } });
    }
    window.location.href = `tel:${e.phone.replace(/\s+/g, '')}`;
  };
  const swipeDismiss = (e: Enquiry) => {
    tap();
    updateEnquiry.mutate({ id: e.id, patch: { status: 'dismissed' } });
    sonner(`Dismissed ${e.name ?? 'enquiry'}`, {
      action: {
        label: 'Undo',
        onClick: () => updateEnquiry.mutate({ id: e.id, patch: { status: 'new' } }),
      },
    });
  };
  const { data: inbox, isError: inboxFailed } = useEnquiryInbox();
  const [tab, setTab] = useState<Tab>('todo');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  // Deep link from a push / bell: /electrician/enquiries?open=<id>
  useEffect(() => {
    const id = params.get('open');
    if (id) {
      setOpenId(id);
      params.delete('open');
      setParams(params, { replace: true });
    }
  }, [params, setParams]);

  const groups = useMemo(() => {
    // Urgent first, then jobs that fit the business, then newest. Out-of-area
    // and not-our-work sink to the bottom rather than vanish.
    const open = enquiries
      .filter((e) => e.status === 'new')
      .sort(
        (a, b) =>
          Number(b.urgency === 'emergency') - Number(a.urgency === 'emergency') ||
          Number(!!a.fit_note) - Number(!!b.fit_note) ||
          b.received_at.localeCompare(a.received_at)
      );
    return {
      // To reply = nobody has called / texted / WhatsApped them yet
      todo: open.filter((e) => !e.first_actioned_at),
      // Replied but not yet a customer, a quote or dismissed
      replied: open.filter((e) => !!e.first_actioned_at),
      done: enquiries.filter((e) => e.status === 'converted' || e.status === 'dismissed'),
      spam: enquiries.filter((e) => e.status === 'spam'),
    };
  }, [enquiries]);

  // Waiting = nobody has replied yet, tests aside
  const waiting = groups.todo.filter((e) => !e.is_test);

  const stats = useMemo(() => {
    const monthAgo = Date.now() - 30 * 24 * 3600 * 1000;
    const recent = enquiries.filter(
      (e) => e.status !== 'spam' && !e.is_test && new Date(e.received_at).getTime() >= monthAgo
    );
    const replyMins = recent
      .filter((e) => e.first_actioned_at)
      .map((e) =>
        Math.max(
          0,
          (new Date(e.first_actioned_at!).getTime() - new Date(e.received_at).getTime()) / 60000
        )
      );
    const bySource = recent.reduce<Record<string, number>>((acc, e) => {
      const label = SOURCE_LABEL[e.source];
      acc[label] = (acc[label] ?? 0) + 1;
      return acc;
    }, {});
    const won = recent.filter((e) => e.status === 'converted').length;
    return {
      month: recent.length,
      won,
      winRate: recent.length ? Math.round((won / recent.length) * 100) : null,
      reply: formatMinutes(median(replyMins)),
      sources: Object.entries(bySource).sort((a, b) => b[1] - a[1]),
    };
  }, [enquiries]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = groups[tab];
    if (!q) return base;
    // "07700900123" finds "07700 900123"; "+447700…" finds it too
    const qDigits = q.replace(/\D/g, '').replace(/^44/, '0');
    const compact = q.replace(/\s+/g, '');
    return base.filter(
      (e) =>
        [e.name, e.email, e.phone, e.address, e.postcode, e.summary, e.job_description, e.job_type]
          .filter(Boolean)
          .some((v) => {
            const t = String(v).toLowerCase();
            return t.includes(q) || t.replace(/\s+/g, '').includes(compact);
          }) ||
        (qDigits.length >= 5 &&
          (e.phone ?? '').replace(/\D/g, '').replace(/^44/, '0').includes(qDigits))
    );
  }, [groups, tab, query]);

  // Desktop: keep something open in the right pane. Only fills an EMPTY pane —
  // a deep-linked id that isn't in the cached list yet is fetched, never replaced.
  useEffect(() => {
    if (!isDesktop || openId) return;
    if (list[0]) setOpenId(list[0].id);
  }, [isDesktop, list, openId]);

  // After Add / Dismiss / Spam on desktop, move to the next one in the list
  // The row may already have left the list (optimistic update), so use the order
  // as it was before: the next one after it that's still here.
  const lastOrder = useRef<string[]>([]);
  useEffect(() => {
    if (list.some((e) => e.id === openId)) lastOrder.current = list.map((e) => e.id);
  }, [list, openId]);
  const closeAndAdvance = (id: string | null) => {
    if (!isDesktop || !id) return setOpenId(null);
    const order = lastOrder.current.length ? lastOrder.current : list.map((e) => e.id);
    const i = order.indexOf(id);
    const still = new Set(list.map((e) => e.id));
    const next =
      order.slice(i + 1).find((x) => x !== id && still.has(x)) ??
      order
        .slice(0, Math.max(i, 0))
        .reverse()
        .find((x) => x !== id && still.has(x));
    setOpenId(next ?? null);
  };

  const value = useEnquiryValue(enquiries).data;
  const dismissJunk = useDismissJunkWarning();
  const junkThisWeek = enquiries.filter(
    (e) => e.status === 'spam' && Date.now() - new Date(e.received_at).getTime() < 7 * 24 * 3600_000
  ).length;

  // Desktop: ↑/↓ or J/K moves through the list (not while typing)
  useEffect(() => {
    if (!isDesktop) return;
    const onKey = (ev: KeyboardEvent) => {
      const t = ev.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
      const down = ev.key === 'ArrowDown' || ev.key === 'j';
      const up = ev.key === 'ArrowUp' || ev.key === 'k';
      if (!down && !up) return;
      ev.preventDefault();
      const i = list.findIndex((e) => e.id === openId);
      const next = list[Math.min(list.length - 1, Math.max(0, i + (down ? 1 : -1)))];
      if (next) setOpenId(next.id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isDesktop, list, openId]);

  // Deep links can point past the newest 300; fall back to fetching the one row
  const { data: openFetched } = useEnquiry(openId);
  const open = enquiries.find((e) => e.id === openId) ?? openFetched ?? null;
  // A failed load must never look like "you have no enquiries, set it up"
  const loadFailed = listFailed && enquiries.length === 0;
  const neverReceived =
    !isLoading && !loadFailed && !inboxFailed && enquiries.length === 0 && !inbox?.last_received_at;

  return (
    <div className="-mt-3 min-h-screen bg-background pb-24 sm:-mt-4 md:-mt-6 lg:pb-10">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-white/[0.10] bg-background/95 backdrop-blur-sm">
        <div className={cn('px-4 py-2', PAGE_WIDTH)}>
          <div className="flex h-11 items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/business')}
              aria-label="Back to Business Hub"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="min-w-0 flex-1 truncate text-[19px] font-semibold tracking-tight text-white">
              Enquiries
            </h1>
            {waiting.length > 0 && (
              <span className="hidden shrink-0 px-2 text-[13px] font-semibold tabular-nums text-elec-yellow sm:inline">
                {waiting.length} waiting
              </span>
            )}
            <button
              type="button"
              onClick={() => navigate('/electrician/enquiries/setup')}
              className="flex h-11 shrink-0 items-center gap-2 rounded-xl px-3 text-[13px] font-medium text-white transition-colors hover:bg-white/10 touch-manipulation active:scale-[0.98]"
            >
              <Settings2 className="h-5 w-5" />
              <span className="hidden sm:inline">Connect sources</span>
            </button>
          </div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn('mt-4 px-4 lg:mt-6', PAGE_WIDTH)}
      >
        <PullToRefresh
          disabled={isDesktop}
          onRefresh={async () => {
            await qc.invalidateQueries({ queryKey: ['enquiries'] });
            tap();
          }}
        >
          {loadFailed ? (
            <div className={cn('px-4 py-16 text-center', PAGE_WIDTH)}>
              <p className="text-[16px] font-semibold text-white">Couldn't load your enquiries</p>
              <p className="mt-1 text-[14px] text-white">
                {navigator.onLine ? 'Something went wrong.' : "You're offline."} Pull down or tap to
                try again.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 h-11 rounded-xl border border-white/[0.15] px-5 text-[14px] font-semibold text-white touch-manipulation"
              >
                Try again
              </button>
            </div>
          ) : neverReceived ? (
            <FirstRun
              onSetup={() => navigate('/electrician/enquiries/setup')}
              pageUrl={inbox ? enquiryPageUrl(inbox) : null}
            />
          ) : (
            <div className="space-y-5">
              {/* Junk guard: someone is forwarding their whole inbox */}
              {showJunkWarning(inbox) && (
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col gap-3 rounded-2xl border border-orange-500/40 bg-orange-500/[0.10] p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
                >
                  <AlertTriangle className="h-6 w-6 shrink-0 text-orange-300" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold text-white">
                      Lots of junk is reaching your enquiries
                    </p>
                    <p className="mt-1 text-[13.5px] leading-snug text-white">
                      {junkThisWeek > 0
                        ? `${junkThisWeek} emails this week weren't enquiries. `
                        : ''}
                      It looks like all your email is being forwarded. A Gmail filter sends only
                      enquiries. We've written it for you, it takes a minute.
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => navigate('/electrician/enquiries/setup#gmail')}
                      className={primaryButtonCn}
                    >
                      Fix it
                    </button>
                    <button
                      type="button"
                      onClick={() => dismissJunk.mutate()}
                      className={ghostButtonCn}
                    >
                      Not now
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className={cn(cardCn, 'grid grid-cols-2 lg:grid-cols-4')}
              >
                <Stat
                  className="border-b border-r border-white/[0.10] lg:border-b-0"
                  label="Waiting for a reply"
                  value={String(waiting.length)}
                  highlight={waiting.length > 0}
                />
                <Stat
                  className="border-b border-white/[0.10] lg:border-b-0 lg:border-r"
                  label="Last 30 days"
                  value={String(stats.month)}
                />
                <Stat
                  className="border-r border-white/[0.10]"
                  label={value && value.won > 0 ? 'Won from enquiries' : 'Became customers'}
                  value={value && value.won > 0 ? formatGBP(value.won) : String(stats.won)}
                  sub={
                    value && value.quoted > 0
                      ? `${formatGBP(value.quoted)} quoted · ${value.wins} of ${value.quotes} won`
                      : stats.winRate != null
                        ? `${stats.winRate}% of enquiries`
                        : undefined
                  }
                />
                <Stat
                  label="Typical reply"
                  value={stats.reply}
                  sub="Faster replies win more jobs"
                />
              </motion.div>

              {/* Inbox */}
              <motion.div
                variants={itemVariants}
                className="lg:grid lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:items-start lg:gap-6"
              >
                {/* List */}
                <div className="space-y-3">
                  <div
                    role="tablist"
                    aria-label="Enquiry lists"
                    className="grid grid-cols-4 gap-1 rounded-2xl border border-white/[0.10] bg-white/[0.04] p-1"
                  >
                    {(
                      [
                        ['todo', 'To reply', groups.todo.length],
                        ['replied', 'Replied', groups.replied.length],
                        ['done', 'Done', 0],
                        ['spam', 'Spam', groups.spam.length],
                      ] as [Tab, string, number][]
                    ).map(([key, label, n]) => (
                      <button
                        key={key}
                        type="button"
                        role="tab"
                        aria-selected={tab === key}
                        onClick={() => {
                          setTab(key);
                          if (isDesktop) setOpenId(null);
                        }}
                        className={cn(
                          'flex h-11 min-w-0 items-center justify-center gap-1 whitespace-nowrap rounded-xl px-1 text-[12.5px] font-semibold transition-colors touch-manipulation sm:gap-1.5 sm:text-[13px]',
                          tab === key
                            ? 'bg-elec-yellow text-black'
                            : 'text-white hover:bg-white/[0.06]'
                        )}
                      >
                        {label}
                        {n > 0 && (
                          <span
                            className={cn(
                              'min-w-[18px] rounded-full px-1 text-[11px] tabular-nums',
                              tab === key ? 'bg-black/15' : 'bg-white/[0.1]'
                            )}
                          >
                            {n}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                    <input
                      value={query}
                      onChange={(ev) => setQuery(ev.target.value)}
                      placeholder="Search name, postcode or job"
                      aria-label="Search enquiries"
                      className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base font-medium text-white placeholder:text-white/40 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 touch-manipulation"
                    />
                  </div>

                  <div
                    className={cn(
                      cardCn,
                      'overflow-hidden lg:max-h-[calc(100vh-330px)] lg:overflow-y-auto'
                    )}
                  >
                    {isLoading ? (
                      <div className="space-y-px">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="h-[92px] animate-pulse bg-white/[0.03]" />
                        ))}
                      </div>
                    ) : list.length === 0 ? (
                      <EmptyList tab={tab} searching={!!query.trim()} />
                    ) : (
                      <>
                        {tab === 'spam' && junkThisWeek > 0 && (
                          <p className="flex items-center gap-2 border-b border-white/[0.08] bg-emerald-500/[0.08] px-4 py-3 text-[13px] font-medium text-white sm:px-5">
                            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" />
                            {junkThisWeek} junk {junkThisWeek === 1 ? 'email' : 'emails'} filtered
                            this week. None of them sent you an alert.
                          </p>
                        )}
                        <EnquiryList
                          items={list}
                          selectedId={isDesktop ? openId : null}
                          onOpen={setOpenId}
                          swipe={isDesktop ? null : { call: swipeCall, dismiss: swipeDismiss }}
                        />
                      </>
                    )}
                  </div>
                  {stats.sources.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className={cn(eyebrowCn, 'mr-1')}>Where they came from</span>
                      {stats.sources.map(([label, n]) => {
                        const won = value?.bySource.find((b) => b.label === label)?.won ?? 0;
                        return (
                          <span
                            key={label}
                            className="rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-1 text-[12.5px] font-medium text-white"
                          >
                            {label} <span className="tabular-nums text-elec-yellow">{n}</span>
                            {won > 0 && (
                              <span className="tabular-nums text-emerald-300">
                                {' '}
                                · {formatGBP(won)} won
                              </span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Detail pane (desktop) */}
                {isDesktop && (
                  <div
                    className={cn(
                      cardCn,
                      'sticky top-[76px] h-[calc(100vh-290px)] min-h-[540px] overflow-hidden'
                    )}
                  >
                    {open ? (
                      <EnquiryDetailSheet
                        key={open.id}
                        variant="panel"
                        enquiry={open}
                        onOpenChange={(o) => !o && closeAndAdvance(open.id)}
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                        <Inbox className="h-8 w-8 text-white" />
                        <p className="mt-3 text-[15px] font-semibold text-white">Pick an enquiry</p>
                        <p className="mt-1 max-w-xs text-[13px] leading-snug text-white">
                          It opens here with the reply buttons, the details and one-tap quote.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </PullToRefresh>
      </motion.div>

      {!isDesktop && (
        <EnquiryDetailSheet enquiry={open} onOpenChange={(o) => !o && setOpenId(null)} />
      )}
    </div>
  );
};

// ── Pieces ──────────────────────────────────────────────────────────────────

function Stat({
  label,
  value,
  sub,
  highlight,
  className,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('px-4 py-4 sm:px-5', className)}>
      <p className={eyebrowCn}>{label}</p>
      <p className={cn(statValueCn, 'text-[24px]', highlight ? 'text-elec-yellow' : 'text-white')}>
        {value}
      </p>
      {sub && <p className="mt-1.5 hidden text-[12px] text-white sm:block">{sub}</p>}
    </div>
  );
}

function EmptyList({ tab, searching }: { tab: Tab; searching: boolean }) {
  const text = searching
    ? 'Nothing matches that search.'
    : tab === 'todo'
      ? "You're all caught up. New enquiries appear here the moment they arrive."
      : tab === 'replied'
        ? 'People you have called or messaged, waiting for a quote or a visit, show here.'
        : tab === 'spam'
          ? 'No spam. Anything that looks like junk mail is parked here.'
          : 'Enquiries you have added as customers or dismissed show here.';
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <Inbox className="h-7 w-7 text-white" />
      <p className="mt-3 max-w-xs text-[14px] leading-snug text-white">{text}</p>
    </div>
  );
}

function EnquiryList({
  items,
  selectedId,
  onOpen,
  swipe,
}: {
  items: Enquiry[];
  selectedId: string | null;
  onOpen: (id: string) => void;
  swipe: { call: (e: Enquiry) => void; dismiss: (e: Enquiry) => void } | null;
}) {
  let lastLabel = '';
  return (
    <div>
      {items.map((e) => {
        const label =
          e.status === 'new' && e.urgency === 'emergency' ? 'Urgent' : dayLabel(e.received_at);
        const header = label !== lastLabel;
        lastLabel = label;
        return (
          <div key={e.id}>
            {header && (
              <p
                className={cn(
                  eyebrowCn,
                  'border-b border-white/[0.08] bg-white/[0.02] px-4 py-2 sm:px-5',
                  label === 'Urgent' && 'text-red-300'
                )}
              >
                {label}
              </p>
            )}
            {swipe && e.status === 'new' ? (
              <SwipeableRow
                contentClassName="bg-[#252525]"
                leftAction={
                  e.phone
                    ? {
                        icon: <Phone className="h-5 w-5" />,
                        label: 'Call',
                        variant: 'success',
                        onClick: () => swipe.call(e),
                      }
                    : undefined
                }
                rightAction={{
                  icon: <Inbox className="h-5 w-5" />,
                  label: 'Dismiss',
                  variant: 'destructive',
                  onClick: () => swipe.dismiss(e),
                }}
              >
                <EnquiryRow enquiry={e} selected={false} onOpen={() => onOpen(e.id)} />
              </SwipeableRow>
            ) : (
              <EnquiryRow enquiry={e} selected={e.id === selectedId} onOpen={() => onOpen(e.id)} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function EnquiryRow({
  enquiry: e,
  selected,
  onOpen,
}: {
  enquiry: Enquiry;
  selected: boolean;
  onOpen: () => void;
}) {
  const waitingHours = (Date.now() - new Date(e.received_at).getTime()) / 3600000;
  const waiting = e.status === 'new' && !e.first_actioned_at && !e.is_test && waitingHours >= 2;
  const replied = e.status === 'new' && !!e.first_actioned_at;
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        'relative flex w-full items-start gap-3 border-b border-white/[0.08] px-4 py-3.5 text-left transition-colors touch-manipulation last:border-b-0 hover:bg-white/[0.04] active:bg-white/[0.06] sm:px-5',
        selected && 'bg-white/[0.07] hover:bg-white/[0.07]'
      )}
    >
      {selected && <span className="absolute inset-y-0 left-0 w-[3px] bg-elec-yellow" />}
      <div
        className={cn(
          'mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full',
          e.status !== 'new' || e.is_test
            ? 'bg-white/20'
            : replied
              ? 'border-2 border-elec-yellow bg-transparent'
              : e.urgency === 'emergency'
                ? 'bg-red-400'
                : 'bg-elec-yellow'
        )}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-[15px] font-semibold text-white">
            {e.name || e.email || e.phone || 'Unknown sender'}
          </p>
          <span className="shrink-0 text-[12px] text-white">
            {formatDistanceToNow(new Date(e.received_at), { addSuffix: false })}
          </span>
        </div>
        <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-white">
          {e.summary || e.job_description || e.raw_subject || 'No details'}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11.5px] font-medium">
          {e.is_test && (
            <span className="rounded-full bg-elec-yellow/20 px-2 py-0.5 text-elec-yellow">
              Test
            </span>
          )}
          {e.job_type && e.job_key !== 'other' && e.job_key !== 'not_electrical' && (
            <span className="rounded-full bg-elec-yellow/15 px-2 py-0.5 text-elec-yellow">
              {e.job_type}
            </span>
          )}
          <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-white">
            {SOURCE_LABEL[e.source]}
          </span>
          {e.urgency === 'emergency' && (
            <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-red-300">
              {e.photo_danger ? 'Danger in photo' : 'Urgent'}
            </span>
          )}
          {e.fit_note && (
            <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-orange-300">
              {e.fit_note}
            </span>
          )}
          {(() => {
            // Only a suggestion that's still ahead (same rule as the sheet)
            const next =
              e.status === 'new' && e.visit_status === 'proposed'
                ? (e.proposed_slots ?? []).find(
                    (p) => new Date(p.start).getTime() > Date.now() + 30 * 60_000
                  )
                : undefined;
            return next ? (
              <span className="rounded-full bg-elec-yellow/15 px-2 py-0.5 text-elec-yellow">
                Free {next.label.split(',')[0]}
              </span>
            ) : null;
          })()}
          {e.visit_status === 'booked' && e.visit_start && (
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-300">
              Visit booked
            </span>
          )}
          {e.contact_hidden && (
            <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-white">
              Details hidden
            </span>
          )}
          {e.work_category && e.work_category !== 'domestic' && (
            <span className="rounded-full bg-sky-400/15 px-2 py-0.5 capitalize text-sky-300">
              {e.work_category}
            </span>
          )}
          {e.distance_miles != null && (
            <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-white">
              {e.distance_miles} mi
            </span>
          )}
          {e.photos?.length > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.08] px-2 py-0.5 text-white">
              <Camera className="h-3 w-3" />
              {e.photos.length}
            </span>
          )}
          {e.matched && e.status === 'new' && (
            <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-white">
              Existing customer
            </span>
          )}
          {e.status === 'converted' && (
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-300">
              Customer
            </span>
          )}
          {replied && (
            <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-white">Replied</span>
          )}
          {waiting && (
            <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-orange-300">
              Waiting {Math.floor(waitingHours)}h
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

// ── First run ───────────────────────────────────────────────────────────────

const SOURCES = [
  'Your website form',
  'Lovable, Wix, WordPress…',
  'Gmail',
  'Checkatrade',
  'MyBuilder',
  'Bark',
  'Facebook page',
  'QR code on the van',
];

const STEPS = [
  {
    n: '1',
    title: 'Connect',
    body: 'Point your website form or Gmail at your Elec-Mate address, or share your own enquiry page.',
  },
  {
    n: '2',
    title: 'We read it',
    body: 'Name, phone, postcode, the job, how urgent it is and any photos. Existing customers are spotted.',
  },
  {
    n: '3',
    title: 'One tap',
    body: 'Reply on WhatsApp with your booking link, book a visit, or open a quote already filled in.',
  },
];

function FirstRun({ onSetup, pageUrl }: { onSetup: () => void; pageUrl: string | null }) {
  return (
    <motion.div
      variants={itemVariants}
      className="grid gap-8 py-2 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:py-10"
    >
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
          Enquiries inbox
        </p>
        <h2 className="mt-3 text-[30px] font-bold leading-[1.08] tracking-tight text-white sm:text-[38px] xl:text-[46px]">
          <span className="block">Every enquiry, one inbox.</span>
          <span className="block text-elec-yellow">Already filled in.</span>
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white sm:text-[16px]">
          Stop copying enquiries into the app. Your website, Gmail and lead sites land here, read
          for you, ready to quote. Whoever replies first usually wins the job.
        </p>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onSetup}
            className={cn(primaryButtonCn, 'h-12 px-6 text-[15px]')}
          >
            Set it up (5 minutes)
          </button>
          {pageUrl && (
            <a
              href={pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                ghostButtonCn,
                'flex h-12 items-center justify-center px-5 text-[14px]'
              )}
            >
              See your enquiry page
            </a>
          )}
        </div>

        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="border-t border-white/[0.12] pt-4">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-elec-yellow text-[13px] font-bold text-black">
                {s.n}
              </span>
              <p className="mt-3 text-[15px] font-semibold text-white">{s.title}</p>
              <p className="mt-1 text-[13px] leading-snug text-white">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8">
          <p className={eyebrowCn}>Works with</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SOURCES.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-1.5 text-[12.5px] font-medium text-white"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ExamplePreview />
    </motion.div>
  );
}

/** Decorative: what an enquiry looks like once it lands. Not real data. */
function ExamplePreview() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[460px] select-none">
      <div className="absolute -inset-6 rounded-[32px] bg-elec-yellow/[0.06] blur-2xl" />

      {/* Card behind */}
      <div className="relative translate-x-4 rounded-2xl border border-white/[0.10] bg-[hsl(0_0%_11%)] px-5 py-4 opacity-70">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <p className="flex-1 text-[14px] font-semibold text-white">Tom Hughes</p>
          <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[11px] font-medium text-red-300">
            Urgent
          </span>
        </div>
        <p className="ml-[22px] mt-1 text-[12.5px] text-white">No power and a burning smell, LS4</p>
      </div>

      {/* Main card */}
      <div className="relative -mt-2 rounded-2xl border border-white/[0.14] bg-[hsl(0_0%_13%)] shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
            Example
          </span>
          <span className="text-[12px] text-white">2 min ago</span>
        </div>
        <div className="px-5 py-4">
          <p className="text-[18px] font-semibold tracking-tight text-white">Sarah Jones</p>
          <p className="mt-0.5 text-[13.5px] text-white">
            Consumer unit replacement, 3-bed semi, LS6
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5 text-[11.5px] font-medium">
            <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-white">Website</span>
            <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-white">4.2 mi</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.08] px-2 py-0.5 text-white">
              <Camera className="h-3 w-3" />2
            </span>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-white/[0.08] pt-3 text-[12.5px]">
            <div>
              <dt className="text-white">Phone</dt>
              <dd className="font-medium text-white">07700 900123</dd>
            </div>
            <div>
              <dt className="text-white">Postcode</dt>
              <dd className="font-medium text-white">LS6 2AB</dd>
            </div>
          </dl>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { icon: Phone, label: 'Call' },
              { icon: MessageCircle, label: 'WhatsApp' },
              { icon: MessageSquare, label: 'Text' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex h-14 flex-col items-center justify-center gap-1 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[11.5px] font-medium text-white"
              >
                <Icon className="h-4 w-4" />
                {label}
              </div>
            ))}
          </div>
          <div className="mt-3 flex h-11 items-center justify-center rounded-xl bg-elec-yellow text-[14px] font-semibold text-black">
            Add & quote
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnquiriesPage;
