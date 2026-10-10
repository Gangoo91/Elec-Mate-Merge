import { useState } from 'react';
import { Bell, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { INBOX_KIND_LABEL, useUnifiedInbox, type InboxItem } from '@/hooks/useUnifiedInbox';

/* ==========================================================================
   NotificationCenter — the Alerts button in the College Hub masthead.

   8 Oct 2026: a short preview of the college inbox, in the inbox's own row
   (initials, kind, how long it has waited, orange when too long) and order
   (waiting too long first), so the bell, Today, the home page and the inbox
   speak one language and count the same rows.

   What went: the All / Inbox / Marking tabs and the per-kind coloured dots,
   and a second copy of quiz attempts still being scored. useUnifiedInbox
   already carries those (ELE-1895), so they were counted twice here.
   The badge is how many the tutor has not seen yet.
   ========================================================================== */

interface NotificationCenterProps {
  /** Unused (was for legacy section navigation). Kept so CollegeDashboard compiles. */
  onNavigate?: (section: string) => void;
}

const SHOWN = 8;

const waitingText = (i: InboxItem) => {
  if (i.kind === 'review') return i.waitingDays > 0 ? `${i.waitingDays} days overdue` : 'Coming up';
  if (i.kind === 'checkin') return 'Flagged today';
  return i.waitingDays <= 0
    ? 'Today'
    : i.waitingDays === 1
      ? 'Waiting since yesterday'
      : `Waiting ${i.waitingDays} days`;
};

const initialsOf = (i: InboxItem) => {
  if (i.kind === 'marking') return 'Q';
  if (i.kind === 'iqa') return 'IQ';
  return (
    (i.learner ?? i.title)
      .replace(/\(.*?\)/g, '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join('') || '?'
  );
};

export function NotificationCenter(_props: NotificationCenterProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, stats, loading, error, refresh, markSeen, markAllAsRead } = useUnifiedInbox();
  const [open, setOpen] = useState(false);
  const [marking, setMarking] = useState(false);
  const isPhone = useMediaQuery('(max-width: 639px)');

  const unread = stats.unread;
  const shown = items.slice(0, SHOWN);

  const go = (to: string) => {
    setOpen(false);
    navigate(to);
  };

  const openItem = (i: InboxItem) => {
    if (i.unread && i.kind !== 'marking') void markSeen([i.key]).catch(() => undefined);
    go(i.href);
  };

  const markAll = async () => {
    setMarking(true);
    try {
      const n = await markAllAsRead();
      toast({ title: n ? `${n} marked as seen` : 'Nothing new to mark' });
    } catch (e) {
      toast({ title: 'Not marked', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setMarking(false);
    }
  };

  const trigger = (
    <button
      type="button"
      onClick={isPhone ? () => setOpen(true) : undefined}
      aria-label={unread > 0 ? `Alerts, ${unread} not seen yet` : 'Alerts'}
      className={cn(
        'relative inline-flex h-11 items-center gap-1.5 whitespace-nowrap px-2 text-[12.5px] font-medium transition-colors touch-manipulation max-sm:w-11 max-sm:justify-center',
        open ? 'text-elec-yellow' : 'text-white hover:text-elec-yellow'
      )}
    >
      {/* Phone: a bell with its count on it, so the masthead's Act button stays on screen. */}
      <Bell className="h-[18px] w-[18px] sm:hidden" aria-hidden />
      <span className="sr-only sm:not-sr-only">Alerts</span>
      {unread > 0 && (
        <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-elec-yellow px-1 text-[12px] font-semibold tabular-nums text-black max-sm:absolute max-sm:right-0 max-sm:top-0.5 max-sm:h-[18px] max-sm:min-w-[18px] max-sm:text-[12px] max-sm:leading-none">
          {unread > 9 ? '9+' : unread}
        </span>
      )}
    </button>
  );

  const heading =
    loading && items.length === 0
      ? 'Checking…'
      : stats.total === 0
        ? 'Nothing needs you'
        : `${stats.total} ${stats.total === 1 ? 'thing needs' : 'things need'} you`;
  const summary =
    stats.total > 0
      ? [
          stats.urgent ? `${stats.urgent} waiting too long` : 'nothing overdue',
          unread ? `${unread} not seen yet` : null,
        ]
          .filter(Boolean)
          .join(' · ')
      : null;

  const header = (
    <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] py-3 pl-5 pr-2">
      <div className="min-w-0 pt-1">
        <p className="text-[17px] font-semibold leading-tight text-white">{heading}</p>
        {summary && <p className="mt-1 text-[13px] leading-snug text-white">{summary}</p>}
      </div>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Close"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
      >
        <X className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );

  const list = error ? (
    <div className="px-5 py-8 text-center">
      <p className="text-[14px] font-semibold text-white">Couldn’t load the inbox</p>
      <p className="mt-1 break-words text-[12.5px] text-white">{error}</p>
      <button
        type="button"
        onClick={() => void refresh()}
        className="mt-2 h-11 px-3 text-[13.5px] font-semibold text-elec-yellow touch-manipulation"
      >
        Try again
      </button>
    </div>
  ) : loading && items.length === 0 ? (
    <div className="divide-y divide-white/[0.06]">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-[84px] animate-pulse bg-white/[0.02]" />
      ))}
    </div>
  ) : items.length === 0 ? (
    <div className="px-5 py-10 text-center">
      <p className="text-[15px] font-semibold text-white">You’re clear</p>
      <p className="mt-1 text-[13px] text-white">
        Hours, evidence, messages and reviews land here as they arrive.
      </p>
    </div>
  ) : (
    <ul className="divide-y divide-white/[0.06]">
      {shown.map((i) => (
        <li key={i.key}>
          <button
            type="button"
            onClick={() => openItem(i)}
            className="flex w-full items-start gap-3 px-5 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07]"
          >
            <span className="relative mt-0.5 shrink-0">
              <span
                aria-hidden
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full text-[12.5px] font-bold',
                  'bg-white/[0.1] text-white'
                )}
              >
                {initialsOf(i)}
              </span>
              {i.unread && (
                <span
                  className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[hsl(0_0%_12%)] bg-elec-yellow"
                  aria-label="Not seen yet"
                />
              )}
            </span>
            {/* Name gets the whole line; the kind sits with the wait below,
                so a phone never cuts the name down to "Andrew Moore (gan…". */}
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[15px] font-semibold leading-snug text-white">
                {i.learner ?? i.title}
              </span>
              <span className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-white">
                {i.learner ? [i.title, i.body].filter(Boolean).join(' · ') : i.body}
              </span>
              <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span
                  className={cn(
                    'text-[12.5px] font-semibold',
                    i.urgent ? 'text-orange-300' : 'text-white'
                  )}
                >
                  {waitingText(i)}
                </span>
                <span className="rounded-full border border-white/[0.16] px-2 py-px text-[12px] font-medium text-white">
                  {INBOX_KIND_LABEL[i.kind]}
                </span>
              </span>
            </span>
            <span className="hidden shrink-0 self-center text-[12.5px] font-semibold text-white sm:inline">
              {i.action}
            </span>
            <ChevronRight
              className="h-4 w-4 shrink-0 self-center text-white sm:hidden"
              aria-hidden
            />
          </button>
        </li>
      ))}
    </ul>
  );

  const footer =
    items.length > 0 ? (
      <div className="flex gap-2 border-t border-white/[0.06] p-3">
        {unread > 0 && (
          <button
            type="button"
            onClick={() => void markAll()}
            disabled={marking}
            className="h-11 shrink-0 rounded-xl px-3.5 text-[13.5px] font-semibold text-elec-yellow touch-manipulation hover:bg-white/[0.04] disabled:opacity-50"
          >
            {marking ? 'Marking…' : 'Mark all seen'}
          </button>
        )}
        <button
          type="button"
          onClick={() => go('/college/inbox')}
          className="inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1 rounded-xl border border-white/[0.14] text-[13.5px] font-semibold text-white touch-manipulation hover:border-elec-yellow"
        >
          {items.length > SHOWN ? `All ${items.length} in the inbox` : 'Open the inbox'}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    ) : null;

  // Phone: a bottom sheet the full width of the screen, like the rest of the
  // hub's sheets. A popover squeezed into 375px clipped names and left a
  // strip of the page showing beside it.
  if (isPhone) {
    return (
      <>
        {trigger}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="bottom"
            hideCloseButton
            aria-describedby={undefined}
            className="flex max-h-[88dvh] flex-col gap-0 rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_12%)] p-0 pb-[env(safe-area-inset-bottom)] text-white"
          >
            <SheetTitle className="sr-only">Inbox</SheetTitle>
            <div
              className="mx-auto mt-2.5 h-1 w-12 shrink-0 rounded-full bg-white/15"
              aria-hidden
            />
            {header}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{list}</div>
            {footer}
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={6}
        className="z-50 w-[440px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-0 text-white"
      >
        {header}
        <div className="max-h-[min(60vh,480px)] overflow-y-auto">{list}</div>
        {footer}
      </PopoverContent>
    </Popover>
  );
}
