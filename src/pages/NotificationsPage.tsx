/**
 * Notifications
 *
 * Everything the app has told this user, in one list. Three things drive the
 * design:
 *
 * 1. A notification list is read in a glance, standing up, usually to answer
 *    "is there anything here I have to deal with". So the only visual
 *    distinction that survives is urgent vs not — `categoryTone` decides, and
 *    the volt rule is reserved for the rows with a clock or a regulator behind
 *    them. Everything else is white on white, and the label carries the rest.
 *
 * 2. The old page dimmed four different things — timestamps at white/40,
 *    bodies at white/60, read titles at white/85 — which on this ground reads
 *    as grey and is banned outright. Hierarchy here comes from weight and
 *    size, never from opacity.
 *
 * 3. Dismissing was instant and final. It is a one-thumb gesture on a list
 *    that scrolls, so it is now undoable: the row goes, a toast offers it
 *    back, and the delete only reaches the server if the toast times out.
 *
 * Swipe left to dismiss on touch; the same control is a button on a pointer.
 */

import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, CheckCheck, ChevronRight, FolderPlus, Settings, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { isToday, isYesterday } from 'date-fns';

import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { useUserNotifications, type UserNotification } from '@/hooks/useUserNotifications';
import { categoryTone, compactAge } from '@/lib/notificationCategory';
import {
  bookingProjectUrl,
  isBookingNotification,
  type BookingNotificationMetadata,
} from '@/lib/bookingToProject';
import { cn } from '@/lib/utils';

/** How long a dismissed row can be brought back before it is really deleted. */
const UNDO_MS = 5000;

type Bucket = 'Today' | 'Yesterday' | 'Earlier';

const bucketOf = (iso: string): Bucket => {
  const d = new Date(iso);
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  return 'Earlier';
};

// ─────────────────────────────────────────────────────────────────────────
// Row
// ─────────────────────────────────────────────────────────────────────────

function NotificationRow({
  n,
  onOpen,
  onDismiss,
  onConvertToProject,
}: {
  n: UserNotification;
  onOpen: () => void;
  onDismiss: () => void;
  onConvertToProject: () => void;
}) {
  const tone = categoryTone(n.type, n.title, n.message);
  const isBooking = isBookingNotification(n.type);
  const [offset, setOffset] = useState(0);

  const swipe = useSwipeable({
    onSwiping: (e) => setOffset(Math.min(0, e.deltaX)),
    onSwipedLeft: (e) => (Math.abs(e.deltaX) > 96 ? onDismiss() : setOffset(0)),
    onSwiped: () => setOffset(0),
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  return (
    <motion.li
      layout
      exit={{ opacity: 0, x: -60, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.18 }}
      className="relative list-none overflow-hidden rounded-2xl"
    >
      {/* Only rendered while the row is actually being dragged. It used to be
          always present, sitting behind a card whose background is translucent
          — so it showed through as a permanent red block on every row. */}
      {offset < 0 && (
        <div className="absolute inset-y-0 right-0 flex w-24 items-center justify-center rounded-2xl bg-red-500/25">
          <Trash2 aria-hidden className="h-4 w-4 text-white" />
        </div>
      )}

      <div
        {...swipe}
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen()}
        style={{ transform: `translateX(${offset}px)` }}
        className={cn(
          'group relative flex w-full cursor-pointer touch-manipulation gap-3 rounded-xl border px-4 py-3 text-left transition-colors',
          offset === 0 && 'transition-transform',
          // Opaque, not a wash: anything behind a translucent row shows
          // through it, and a list of forty rows reads better on a solid ground.
          n.is_read
            ? 'border-white/[0.07] bg-[hsl(0_0%_13%)] hover:bg-[hsl(0_0%_15%)]'
            : 'border-white/[0.14] bg-[hsl(0_0%_16%)] hover:bg-[hsl(0_0%_18%)]'
        )}
      >
        {/* Unread marker. A 3px rule, volt only when ignoring it has a cost. */}
        <span
          aria-hidden
          className={cn(
            'mt-0.5 w-[3px] shrink-0 self-stretch rounded-full',
            n.is_read ? 'bg-transparent' : tone.bar
          )}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <span
              className={cn(
                'text-[10px] font-semibold uppercase tracking-[0.16em]',
                tone.urgent ? tone.text : 'text-white'
              )}
            >
              {tone.label}
            </span>
            <span className="shrink-0 text-[11px] font-medium tabular-nums text-white">
              {compactAge(n.created_at)}
            </span>
          </div>

          <h3
            className={cn(
              'mt-1 text-[14.5px] leading-snug tracking-[-0.015em] text-white',
              n.is_read ? 'font-medium' : 'font-semibold'
            )}
          >
            {n.title}
          </h3>

          {n.message && (
            <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-relaxed text-white">
              {n.message}
            </p>
          )}

          {isBooking ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onConvertToProject();
                }}
                className="inline-flex h-11 touch-manipulation items-center gap-1.5 rounded-xl bg-elec-yellow px-3.5 text-[12.5px] font-semibold text-black transition-transform active:scale-[0.98]"
              >
                <FolderPlus aria-hidden className="h-3.5 w-3.5" />
                Convert to project
              </button>
              {n.link && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                  }}
                  className="inline-flex h-11 touch-manipulation items-center rounded-xl border border-white/[0.12] bg-white/[0.06] px-3.5 text-[12.5px] font-medium text-white transition-transform active:scale-[0.98]"
                >
                  View in calendar
                </button>
              )}
            </div>
          ) : (
            // No "Open →" line. It cost a whole row of height to name the one
            // thing the row already is; the chevron on the right edge says it
            // in the space the timestamp was already using.
            null
          )}
        </div>

        {n.link && (
          <ChevronRight
            aria-hidden
            className="mt-0.5 hidden h-4 w-4 shrink-0 self-center text-white transition-transform group-hover:translate-x-0.5 sm:block"
          />
        )}

        {/* Pointer equivalent of the swipe. Hidden from touch, where the row
            is already dismissible and a 24px target would be a mis-tap. */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          aria-label={`Dismiss ${n.title}`}
          className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white opacity-0 transition-all hover:bg-red-500/20 group-hover:opacity-100 sm:flex"
        >
          <X aria-hidden className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.li>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAll } =
    useUserNotifications();

  const [filter, setFilter] = useState('All');
  // Rows hidden pending an undo. They are still in the query cache, so this is
  // what keeps them off screen until the toast expires and the delete lands.
  const [pendingDismiss, setPendingDismiss] = useState<Set<string>>(new Set());
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const visible = useMemo(
    () => notifications.filter((n) => !pendingDismiss.has(n.id)),
    [notifications, pendingDismiss]
  );

  const chips = useMemo(() => {
    const labels = Array.from(
      new Set(visible.map((n) => categoryTone(n.type, n.title, n.message).label))
    );
    const base = ['All'];
    if (visible.some((n) => !n.is_read)) base.push('Unread');
    return [...base, ...labels];
  }, [visible]);

  const filtered = useMemo(() => {
    if (filter === 'All') return visible;
    if (filter === 'Unread') return visible.filter((n) => !n.is_read);
    return visible.filter((n) => categoryTone(n.type, n.title, n.message).label === filter);
  }, [visible, filter]);

  // Today / Yesterday / Earlier. A list of forty rows with no breaks in it
  // gives no sense of whether you are looking at this morning or last month.
  const groups = useMemo(() => {
    const order: Bucket[] = ['Today', 'Yesterday', 'Earlier'];
    const map = new Map<Bucket, UserNotification[]>();
    for (const n of filtered) {
      const b = bucketOf(n.created_at);
      map.set(b, [...(map.get(b) ?? []), n]);
    }
    return order.filter((b) => map.has(b)).map((b) => ({ bucket: b, rows: map.get(b)! }));
  }, [filtered]);

  const handleOpen = (n: UserNotification) => {
    if (!n.is_read) markAsRead.mutate(n.id);
    if (n.link) navigate(n.link);
  };

  // ELE-1471 — carry the booking's details into a pre-filled new-project sheet
  // instead of dropping the electrician on the calendar with nothing to act on.
  const handleConvertToProject = (n: UserNotification) => {
    if (!n.is_read) markAsRead.mutate(n.id);
    navigate(bookingProjectUrl((n.metadata || {}) as BookingNotificationMetadata));
  };

  const handleDismiss = (n: UserNotification) => {
    setPendingDismiss((prev) => new Set(prev).add(n.id));
    const timer = setTimeout(() => {
      timers.current.delete(n.id);
      deleteNotification.mutate(n.id);
    }, UNDO_MS);
    timers.current.set(n.id, timer);

    toast('Dismissed', {
      description: n.title,
      duration: UNDO_MS,
      action: {
        label: 'Undo',
        onClick: () => {
          const t = timers.current.get(n.id);
          if (t) clearTimeout(t);
          timers.current.delete(n.id);
          setPendingDismiss((prev) => {
            const next = new Set(prev);
            next.delete(n.id);
            return next;
          });
        },
      },
    });
  };

  return (
    <HubPage>
      <HubMasthead
        section="You"
        title="Notifications"
        backTo="/"
        trailing={
          <button
            onClick={() => navigate('/settings?tab=notifications')}
            aria-label="Notification settings"
            className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl text-white transition-colors hover:bg-white/[0.08]"
          >
            <Settings aria-hidden className="h-4 w-4" />
          </button>
        }
      />

      {/* theme-v2 switches this page to Geist — already downloaded for the app
          and applied to almost none of it. A notification list is scanned
          rather than read, and Geist holds its shape better than Inter at
          14px on a dark ground. No extra request: the file is preloaded. */}
      <HubBody pushContext="Get notified about your jobs, certificates, study progress and messages">
        {/* Capped. Full-bleed rows at 1600px put the timestamp a foot from
            the title and make a short message look like an error. */}
        <div className="theme-v2 flex w-full max-w-[54rem] flex-col gap-4">
        {visible.length > 0 && (
          <div className="flex items-center justify-between gap-3">
            <p className="text-[13px] font-medium text-white">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
            </p>
            <div className="flex items-center gap-1.5">
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllAsRead.mutate()}
                  className="inline-flex h-11 touch-manipulation items-center gap-1.5 rounded-xl px-3 text-[12.5px] font-medium text-white transition-colors hover:bg-white/[0.08]"
                >
                  <CheckCheck aria-hidden className="h-3.5 w-3.5" />
                  Read all
                </button>
              )}
              <button
                onClick={() => clearAll.mutate()}
                aria-label="Clear all notifications"
                className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl text-white transition-colors hover:bg-red-500/15"
              >
                <Trash2 aria-hidden className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {chips.length > 2 && (
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {chips.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  'h-9 shrink-0 touch-manipulation rounded-full border px-3.5 text-[12px] transition-colors',
                  filter === c
                    ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                    : 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:bg-white/[0.10]'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.05]">
              <Bell aria-hidden className="h-6 w-6 text-white" />
            </div>
            <p className="text-[15px] font-semibold text-white">Nothing here</p>
            <p className="mt-1 max-w-[28rem] text-[13px] leading-relaxed text-white">
              Job reminders, certificate expiries, study nudges and messages all land here. You can
              choose which of those you want in settings.
            </p>
            <button
              onClick={() => navigate('/settings?tab=notifications')}
              className="mt-5 inline-flex h-11 touch-manipulation items-center rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-medium text-white transition-transform active:scale-[0.98]"
            >
              Notification settings
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-14 text-center text-[13px] text-white">Nothing in “{filter}”.</p>
        ) : (
          <div className="space-y-6">
            {groups.map(({ bucket, rows }) => (
              <section key={bucket}>
                <h2 className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                  {bucket}
                </h2>
                <ul className="flex flex-col gap-1.5">
                  <AnimatePresence initial={false}>
                    {rows.map((n) => (
                      <NotificationRow
                        key={n.id}
                        n={n}
                        onOpen={() => handleOpen(n)}
                        onDismiss={() => handleDismiss(n)}
                        onConvertToProject={() => handleConvertToProject(n)}
                      />
                    ))}
                  </AnimatePresence>
                </ul>
              </section>
            ))}
          </div>
        )}
        </div>
      </HubBody>
    </HubPage>
  );
};

export default NotificationsPage;
