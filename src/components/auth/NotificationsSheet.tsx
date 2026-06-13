import { Check, Sparkles, AlertTriangle, MessageSquare, FileText, Zap, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useNotifications, Notification } from '@/components/notifications/NotificationProvider';
import { cn } from '@/lib/utils';
import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Eyebrow, EmptyState, TextAction } from '@/components/college/primitives';
import { useMemo } from 'react';

interface NotificationsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ─── Tone tokens per notification type ──────────────────────────────────
// Single source of truth — controls the left rule colour and the inline
// icon tint. No coloured "chips" or backgrounds anywhere; type is communicated
// purely by the rule + icon hue.
const TONE_BY_TYPE: Record<string, { rule: string; icon: string; Icon: typeof Check }> = {
  success: { rule: 'bg-emerald-400', icon: 'text-emerald-400', Icon: Check },
  warning: { rule: 'bg-amber-400', icon: 'text-amber-400', Icon: AlertTriangle },
  error: { rule: 'bg-red-400', icon: 'text-red-400', Icon: AlertTriangle },
  message: { rule: 'bg-blue-400', icon: 'text-blue-400', Icon: MessageSquare },
  update: { rule: 'bg-purple-400', icon: 'text-purple-400', Icon: Sparkles },
  certificate: { rule: 'bg-elec-yellow', icon: 'text-elec-yellow', Icon: FileText },
};
const DEFAULT_TONE = { rule: 'bg-elec-yellow', icon: 'text-elec-yellow', Icon: Zap };

const toneFor = (type: string | undefined) => (type && TONE_BY_TYPE[type]) || DEFAULT_TONE;

// ─── Time helpers ───────────────────────────────────────────────────────
type Bucket = 'today' | 'yesterday' | 'earlier';

const bucketFor = (d: Date): Bucket => {
  const date = new Date(d);
  if (isToday(date)) return 'today';
  if (isYesterday(date)) return 'yesterday';
  return 'earlier';
};

const formatTime = (date: Date) => {
  const d = new Date(date);
  if (isToday(d)) return format(d, 'h:mm a');
  if (isYesterday(d)) return 'Yesterday';
  return formatDistanceToNow(d, { addSuffix: true });
};

// ─── Single notification row ────────────────────────────────────────────
const NotificationRow = ({
  notification,
  onRead,
  onDelete,
  index,
}: {
  notification: Notification;
  onRead: () => void;
  onDelete: () => void;
  index: number;
}) => {
  const tone = toneFor(notification.type);
  const Icon = tone.Icon;
  const unread = !notification.read;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index, 8) * 0.025, duration: 0.18 }}
    >
      <button
        type="button"
        onClick={onRead}
        className={cn(
          'group relative w-full flex items-start gap-3 px-5 py-4 text-left transition-colors touch-manipulation',
          'hover:bg-[hsl(0_0%_15%)] focus:outline-none focus-visible:bg-[hsl(0_0%_15%)]'
        )}
      >
        {/* Left rule — tone-coded; thicker when unread */}
        <span
          aria-hidden
          className={cn(
            'absolute left-0 top-4 bottom-4 rounded-full transition-all',
            unread ? 'w-[2px] opacity-100' : 'w-[2px] opacity-25',
            tone.rule
          )}
        />

        {/* Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <Icon className={cn('h-3.5 w-3.5 shrink-0', tone.icon)} />
            <h3
              className={cn(
                'text-[14px] tracking-tight truncate flex-1',
                unread ? 'font-semibold text-white' : 'font-medium text-white/80'
              )}
            >
              {notification.title}
            </h3>
            {unread && (
              <motion.span
                aria-hidden
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="h-1.5 w-1.5 rounded-full bg-elec-yellow shrink-0"
              />
            )}
          </div>

          {notification.message && (
            <p className="mt-1 text-[12.5px] text-white/65 leading-relaxed line-clamp-2">
              {notification.message}
            </p>
          )}

          <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-white/40 tabular-nums">
            {formatTime(notification.createdAt)}
          </div>
        </div>

        {/* Delete affordance — reveals on hover (desktop), tap target on mobile */}
        <span
          role="button"
          tabIndex={0}
          aria-label="Delete notification"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }
          }}
          className="shrink-0 self-start mt-0.5 h-7 w-7 rounded-full flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/[0.08] opacity-0 group-hover:opacity-100 sm:opacity-0 transition-opacity touch-manipulation"
        >
          <X className="h-3.5 w-3.5" />
        </span>
      </button>
    </motion.div>
  );
};

// ─── Section heading ────────────────────────────────────────────────────
const Section = ({
  label,
  count,
  children,
}: {
  label: string;
  count: number;
  children: React.ReactNode;
}) => {
  if (count === 0) return null;
  return (
    <section>
      <div className="px-5 pt-5 pb-2">
        <Eyebrow>
          {label} · <span className="tabular-nums">{count}</span>
        </Eyebrow>
      </div>
      {children}
    </section>
  );
};

// ─── Provider-safe wrapper ──────────────────────────────────────────────
// `useNotifications` throws if the NotificationProvider is missing (e.g. in
// some auth-pre-mount transitions). This wrapper isolates the try/catch so
// the consuming component can use the returned shape unconditionally, and
// downstream useMemo/useCallback see stable identities.
const NOOP_CTX = {
  notifications: [] as Notification[],
  unreadCount: 0,
  markAsRead: (_id: string) => {},
  markAllAsRead: () => {},
  deleteNotification: (_id: string) => {},
  clearAllNotifications: () => {},
};

function useNotificationsSafe() {
  try {
    return useNotifications();
  } catch {
    return NOOP_CTX;
  }
}

// ─── Main sheet ─────────────────────────────────────────────────────────
export function NotificationsSheet({ open, onOpenChange }: NotificationsSheetProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Use the hook safely — fall back to no-ops if provider isn't mounted.
  // The hook itself is conditional via try/catch (legacy pattern preserved
  // from the original file) which means eslint can't see a stable identity
  // for `notifications`. We pin it through useMemo on the array and the
  // callback identities to keep downstream memos honest.
  const ctx = useNotificationsSafe();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
  } = ctx;

  // Group notifications by Today / Yesterday / Earlier (newest first within
  // each bucket — relies on the provider's existing sort order).
  const grouped = useMemo(() => {
    const buckets: Record<Bucket, Notification[]> = {
      today: [],
      yesterday: [],
      earlier: [],
    };
    for (const n of notifications) {
      buckets[bucketFor(n.createdAt)].push(n);
    }
    return buckets;
  }, [notifications]);

  const handleViewAll = () => {
    onOpenChange(false);
    navigate('/notifications');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={cn(
          'p-0 flex flex-col bg-[hsl(0_0%_8%)] border-white/[0.06]',
          isMobile ? 'h-[85vh] rounded-t-2xl overflow-hidden' : 'w-[400px] max-w-[400px]'
        )}
      >
        {/* Accessible title for screen readers (Radix Dialog requirement);
            the styled <h2> below remains the visible heading. */}
        <SheetTitle className="sr-only">Notifications</SheetTitle>

        {/* Drag handle on mobile */}
        {isMobile && (
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>
        )}

        {/* Editorial header */}
        <header className="px-5 pt-4 pb-4 border-b border-white/[0.06] flex-shrink-0">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <Eyebrow>Inbox</Eyebrow>
              <h2 className="mt-1.5 text-[20px] font-semibold tracking-tight text-white leading-tight">
                Notifications
                {unreadCount > 0 && (
                  <span className="ml-2 text-white/45 tabular-nums font-normal">
                    ({unreadCount})
                  </span>
                )}
              </h2>
            </div>
            <div className="flex items-baseline gap-4 shrink-0">
              {unreadCount > 0 && <TextAction onClick={markAllAsRead}>Mark all read</TextAction>}
              {notifications.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllNotifications}
                  className="text-[12px] font-medium text-white/55 hover:text-red-400 transition-colors touch-manipulation"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </header>

        {/* List */}
        <div className="flex-1 overflow-y-auto overscroll-contain momentum-scroll-y">
          {notifications.length === 0 ? (
            <div className="px-5 py-10">
              <EmptyState
                title="All caught up"
                description="No new notifications. Job alerts, invoice reminders and daily briefs land here."
              />
            </div>
          ) : (
            <AnimatePresence>
              <Section key="today" label="Today" count={grouped.today.length}>
                <div className="divide-y divide-white/[0.04]">
                  {grouped.today.map((n, i) => (
                    <NotificationRow
                      key={n.id}
                      notification={n}
                      onRead={() => markAsRead(n.id)}
                      onDelete={() => deleteNotification(n.id)}
                      index={i}
                    />
                  ))}
                </div>
              </Section>
              <Section key="yesterday" label="Yesterday" count={grouped.yesterday.length}>
                <div className="divide-y divide-white/[0.04]">
                  {grouped.yesterday.map((n, i) => (
                    <NotificationRow
                      key={n.id}
                      notification={n}
                      onRead={() => markAsRead(n.id)}
                      onDelete={() => deleteNotification(n.id)}
                      index={i}
                    />
                  ))}
                </div>
              </Section>
              <Section key="earlier" label="Earlier" count={grouped.earlier.length}>
                <div className="divide-y divide-white/[0.04]">
                  {grouped.earlier.map((n, i) => (
                    <NotificationRow
                      key={n.id}
                      notification={n}
                      onRead={() => markAsRead(n.id)}
                      onDelete={() => deleteNotification(n.id)}
                      index={i}
                    />
                  ))}
                </div>
              </Section>
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="px-5 py-4 border-t border-white/[0.06] flex-shrink-0 pb-safe">
            <TextAction onClick={handleViewAll} className="block w-full text-center">
              View all notifications
            </TextAction>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
