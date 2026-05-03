import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useUnifiedInbox, type InboxKind } from '@/hooks/useUnifiedInbox';
import { useMarkingQueue } from '@/hooks/useMarkingQueue';

/* ==========================================================================
   NotificationCenter — header bell for the College Hub. Surfaces real
   signals from the unified inbox + marking copilot in one popover. Click
   any row to deep-link straight to the source surface.

   Was previously wired to mock useCollege() data — replaced with live
   hooks so the bell actually reflects what needs the tutor's attention.

   ELE-941 / [M5].
   ========================================================================== */

interface NotificationCenterProps {
  /** Unused now (was for legacy section navigation). Left in place so the
      existing CollegeDashboard wiring keeps compiling. */
  onNavigate?: (section: string) => void;
}

type NotifTab = 'all' | 'inbox' | 'marking';

interface NotifItem {
  key: string;
  source: 'inbox' | 'marking';
  inboxKind?: InboxKind;
  title: string;
  description: string;
  href: string;
  timestamp: string;
  toneClass: string;
  pillLabel: string;
  pillClass: string;
}

const KIND_LABEL: Record<InboxKind, string> = {
  portfolio: 'Comment',
  otj: 'OTJ',
  iqa: 'IQA',
  message: 'Message',
};

const KIND_PILL_CLASS: Record<InboxKind, string> = {
  portfolio: 'bg-amber-500/[0.10] text-amber-200 border-amber-500/30',
  otj: 'bg-emerald-500/[0.10] text-emerald-200 border-emerald-500/30',
  iqa: 'bg-purple-500/[0.10] text-purple-200 border-purple-500/30',
  message: 'bg-blue-500/[0.10] text-blue-200 border-blue-500/30',
};

const KIND_DOT: Record<InboxKind, string> = {
  portfolio: 'bg-amber-400',
  otj: 'bg-emerald-400',
  iqa: 'bg-purple-400',
  message: 'bg-blue-400',
};

export function NotificationCenter(_props: NotificationCenterProps) {
  const navigate = useNavigate();
  const {
    items: inbox,
    stats: inboxStats,
    loading: inboxLoading,
    error: inboxError,
  } = useUnifiedInbox();
  const { items: marking, stats: markingStats } = useMarkingQueue();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<NotifTab>('all');

  const all: NotifItem[] = useMemo(() => {
    const out: NotifItem[] = [];

    for (const i of inbox) {
      out.push({
        key: i.key,
        source: 'inbox',
        inboxKind: i.kind,
        title: i.title,
        description: i.body,
        href: i.href,
        timestamp: i.occurred_at,
        toneClass: KIND_DOT[i.kind],
        pillLabel: KIND_LABEL[i.kind],
        pillClass: KIND_PILL_CLASS[i.kind],
      });
    }

    for (const m of marking) {
      // Only surface awaiting_review + awaiting_ai in the bell — signed_off
      // attempts aren't notification-worthy.
      if (m.status !== 'awaiting_review' && m.status !== 'awaiting_ai') continue;
      const action =
        m.status === 'awaiting_review'
          ? `${m.n_awaiting_review} answer${m.n_awaiting_review === 1 ? '' : 's'} ready to sign off`
          : 'AI grading in progress';
      out.push({
        key: `marking:${m.attempt_id}`,
        source: 'marking',
        title: `${m.student_name} — ${m.quiz_title}`,
        description: action,
        href: '/college/marking',
        timestamp: m.submitted_at ?? new Date().toISOString(),
        toneClass: 'bg-amber-400',
        pillLabel: 'Marking',
        pillClass: 'bg-amber-500/[0.10] text-amber-200 border-amber-500/30',
      });
    }

    out.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return out;
  }, [inbox, marking]);

  const filtered = useMemo(() => {
    if (tab === 'all') return all;
    if (tab === 'inbox') return all.filter((n) => n.source === 'inbox');
    return all.filter((n) => n.source === 'marking');
  }, [all, tab]);

  const totalUnread = inboxStats.total + markingStats.total_pending;
  const inboxCount = inboxStats.total;
  const markingCount = markingStats.total_pending;

  const handleClick = (n: NotifItem) => {
    setOpen(false);
    navigate(n.href);
  };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              'text-[12.5px] font-medium transition-colors touch-manipulation whitespace-nowrap inline-flex items-center gap-1.5',
              open ? 'text-elec-yellow' : 'text-white hover:text-white'
            )}
          >
            Alerts
            {totalUnread > 0 && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-elec-yellow text-black text-[10px] font-semibold tabular-nums">
                {totalUnread > 9 ? '9+' : totalUnread}
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[calc(100vw-1rem)] sm:w-96 p-0 z-50 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-2xl"
          align="end"
        >
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white">
                Notifications
              </div>
              <div className="mt-0.5 text-[13px] font-semibold text-white">
                {totalUnread > 0 ? `${totalUnread} need attention` : 'All caught up'}
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-[11.5px] font-medium text-white hover:text-white transition-colors touch-manipulation"
            >
              Close
            </button>
          </div>

          <Tabs value={tab} onValueChange={(v) => setTab(v as NotifTab)} className="w-full">
            <TabsList className="w-full justify-start gap-0 h-auto p-0 bg-transparent rounded-none border-b border-white/[0.06]">
              <TabsTrigger
                value="all"
                className="flex-1 h-10 touch-manipulation text-[12px] font-medium text-white data-[state=active]:text-elec-yellow data-[state=active]:bg-transparent rounded-none inline-flex items-center gap-1.5"
              >
                All
                {totalUnread > 0 && (
                  <span className="text-[10px] tabular-nums opacity-70">{totalUnread}</span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="inbox"
                className="flex-1 h-10 touch-manipulation text-[12px] font-medium text-white data-[state=active]:text-elec-yellow data-[state=active]:bg-transparent rounded-none inline-flex items-center gap-1.5"
              >
                Inbox
                {inboxCount > 0 && (
                  <span className="text-[10px] tabular-nums opacity-70">{inboxCount}</span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="marking"
                className="flex-1 h-10 touch-manipulation text-[12px] font-medium text-white data-[state=active]:text-elec-yellow data-[state=active]:bg-transparent rounded-none inline-flex items-center gap-1.5"
              >
                Marking
                {markingCount > 0 && (
                  <span className="text-[10px] font-semibold text-amber-400 tabular-nums">
                    {markingCount}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="max-h-[420px]">
              <TabsContent value={tab} className="m-0">
                {inboxError ? (
                  <div className="py-10 px-5 text-center">
                    <div className="text-[13px] font-medium text-red-400">
                      Could not load notifications
                    </div>
                    <div className="mt-1 text-[11.5px] text-white/60 break-words">
                      {inboxError}
                    </div>
                  </div>
                ) : inboxLoading && filtered.length === 0 ? (
                  <div className="divide-y divide-white/[0.06]">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="px-5 py-3.5 animate-pulse">
                        <div className="flex gap-3 items-start">
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-white/10 shrink-0" />
                          <div className="min-w-0 flex-1 space-y-2">
                            <div className="h-3 w-1/3 bg-white/10 rounded" />
                            <div className="h-3 w-3/4 bg-white/10 rounded" />
                            <div className="h-3 w-1/2 bg-white/10 rounded" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="text-[13px] font-medium text-white">All caught up</div>
                    <div className="mt-1 text-[11.5px] text-white">Nothing here right now.</div>
                  </div>
                ) : (
                  <div className="divide-y divide-white/[0.06]">
                    {filtered.slice(0, 30).map((n) => (
                      <button
                        key={n.key}
                        type="button"
                        onClick={() => handleClick(n)}
                        className="w-full text-left px-5 py-3.5 hover:bg-white/[0.03] active:bg-white/[0.05] transition-colors touch-manipulation"
                      >
                        <div className="flex gap-3 items-start">
                          <span
                            aria-hidden
                            className={cn('mt-1.5 h-2 w-2 rounded-full shrink-0', n.toneClass)}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={cn(
                                  'inline-flex items-center h-5 px-2 rounded-md border text-[10px] font-semibold uppercase tracking-[0.06em]',
                                  n.pillClass
                                )}
                              >
                                {n.pillLabel}
                              </span>
                              <span className="text-[12.5px] font-medium text-white truncate">
                                {n.title}
                              </span>
                            </div>
                            {n.description && (
                              <div className="mt-0.5 text-[11.5px] text-white line-clamp-2 leading-snug">
                                {n.description}
                              </div>
                            )}
                            <div className="mt-1 text-[10.5px] text-white tabular-nums">
                              {formatTime(n.timestamp)}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </TabsContent>
            </ScrollArea>
          </Tabs>

          {totalUnread > 0 && (
            <div className="border-t border-white/[0.06] px-5 py-3 flex items-center gap-3">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate('/college/inbox');
                }}
                className="flex-1 text-[12px] font-medium text-elec-yellow hover:text-elec-yellow/80 transition-colors touch-manipulation text-center"
              >
                Open inbox →
              </button>
              {markingCount > 0 && (
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate('/college/marking');
                  }}
                  className="flex-1 text-[12px] font-medium text-amber-300 hover:text-amber-200 transition-colors touch-manipulation text-center"
                >
                  Open marking →
                </button>
              )}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}

function formatTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const min = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  if (min < 1) return 'now';
  if (min < 60) return `${min}m`;
  if (h < 24) return `${h}h`;
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
