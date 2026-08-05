import React, { useMemo, useState } from 'react';
import { useUserNotifications, type UserNotification } from '@/hooks/useUserNotifications';
import { format, isToday, isYesterday, formatDistanceToNow } from 'date-fns';
import { Bell, CheckCheck, Trash2, X, ArrowLeft, FolderPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { categoryTone } from '@/lib/notificationCategory';
import {
  bookingProjectUrl,
  isBookingNotification,
  type BookingNotificationMetadata,
} from '@/lib/bookingToProject';

const formatTime = (date: string) => {
  const d = new Date(date);
  if (isToday(d)) return format(d, 'h:mm a');
  if (isYesterday(d)) return 'Yesterday ' + format(d, 'h:mm a');
  return formatDistanceToNow(d, { addSuffix: true });
};

const NotificationCard = ({
  n,
  onOpen,
  onDelete,
  onConvertToProject,
}: {
  n: UserNotification;
  onOpen: () => void;
  onDelete: () => void;
  onConvertToProject: () => void;
}) => {
  const tone = categoryTone(n.type, n.title, n.message);
  const actionable = !!n.link;
  // ELE-1471 — a booking used to arrive with nowhere to go but the calendar.
  const isBooking = isBookingNotification(n.type);
  return (
    <motion.div layout exit={{ opacity: 0, x: 60, height: 0 }} transition={{ duration: 0.2 }}>
      <div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen()}
        className={cn(
          'group relative w-full text-left rounded-2xl border overflow-hidden transition-colors touch-manipulation cursor-pointer',
          n.is_read
            ? 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
            : 'bg-white/[0.04] border-white/[0.10] hover:bg-white/[0.06]'
        )}
      >
        {/* Category accent — colour varies by type; only shown while unread */}
        {!n.is_read && (
          <div className={cn('absolute left-0 top-3 bottom-3 w-[3px] rounded-full', tone.bar)} />
        )}

        <div className="pl-4 pr-3 py-3.5">
          <div className="flex items-center justify-between gap-3">
            <span
              className={cn('text-[10px] font-semibold uppercase tracking-[0.14em]', tone.text)}
            >
              {tone.label}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10.5px] text-white/40">{formatTime(n.created_at)}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                aria-label="Dismiss"
                className="h-6 w-6 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500/15 transition-all touch-manipulation"
              >
                <X className="h-3.5 w-3.5 text-white/60 hover:text-red-400" />
              </button>
            </div>
          </div>

          <h3
            className={cn(
              'mt-1 text-[14px] leading-snug',
              n.is_read ? 'font-medium text-white/85' : 'font-semibold text-white'
            )}
          >
            {n.title}
          </h3>
          {n.message && (
            <p className="mt-0.5 text-[12.5px] text-white/60 line-clamp-2 leading-relaxed">
              {n.message}
            </p>
          )}

          {isBooking ? (
            <div className="mt-2.5 flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onConvertToProject();
                }}
                className="h-9 px-3 inline-flex items-center gap-1.5 rounded-lg bg-elec-yellow text-black text-[12px] font-semibold touch-manipulation active:scale-95 transition-transform"
              >
                <FolderPlus className="h-3.5 w-3.5" />
                Convert to project
              </button>
              {actionable && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                  }}
                  className="h-9 px-3 inline-flex items-center rounded-lg border border-white/[0.12] bg-white/[0.06] text-white text-[12px] font-medium touch-manipulation active:scale-95 transition-transform"
                >
                  View in calendar
                </button>
              )}
            </div>
          ) : (
            actionable && (
              <div
                className={cn(
                  'mt-2 inline-flex items-center gap-1 text-[11.5px] font-medium',
                  tone.text
                )}
              >
                Open
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
};

const NotificationsPage = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAll } =
    useUserNotifications();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('All');

  // Only offer filter chips for categories that are actually present.
  const categoriesPresent = useMemo(
    () =>
      Array.from(new Set(notifications.map((n) => categoryTone(n.type, n.title, n.message).label))),
    [notifications]
  );
  const chips = useMemo(() => {
    const base = ['All'];
    if (notifications.some((n) => !n.is_read)) base.push('Unread');
    return [...base, ...categoriesPresent];
  }, [notifications, categoriesPresent]);

  const filtered = useMemo(() => {
    if (filter === 'All') return notifications;
    if (filter === 'Unread') return notifications.filter((n) => !n.is_read);
    return notifications.filter((n) => categoryTone(n.type, n.title, n.message).label === filter);
  }, [notifications, filter]);

  const handleOpen = (n: UserNotification) => {
    if (!n.is_read) markAsRead.mutate(n.id);
    if (n.link) navigate(n.link);
  };

  // ELE-1471 — carry the booking's details into a pre-filled new-project sheet
  // instead of dropping the electrician on the calendar with nothing to act on.
  const handleConvertToProject = (n: UserNotification) => {
    if (!n.is_read) markAsRead.mutate(n.id);
    const meta = (n.metadata || {}) as BookingNotificationMetadata;
    navigate(bookingProjectUrl(meta));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white">Notifications</h1>
                {unreadCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-elec-yellow px-1.5 text-[10px] font-bold text-black">
                    {unreadCount}
                  </span>
                )}
              </div>
            </div>
            {notifications.length > 0 && (
              <div className="flex items-center gap-1.5">
                {unreadCount > 0 && (
                  <button
                    onClick={() => markAllAsRead.mutate()}
                    className="h-8 px-2.5 rounded-lg text-[11px] font-medium text-white/80 hover:text-white hover:bg-white/[0.06] touch-manipulation transition-colors flex items-center gap-1.5"
                  >
                    <CheckCheck className="h-3.5 w-3.5" />
                    Read all
                  </button>
                )}
                <button
                  onClick={() => clearAll.mutate()}
                  aria-label="Clear all"
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-red-500/10 touch-manipulation transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Filter chips — only when there's more than one thing to filter by */}
        {chips.length > 2 && (
          <div className="px-4 sm:px-6 lg:px-8 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
            {chips.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  'shrink-0 h-8 px-3 rounded-full text-[12px] font-medium touch-manipulation transition-colors border',
                  filter === c
                    ? 'bg-white text-black border-white'
                    : 'bg-white/[0.04] text-white/70 border-white/[0.10] hover:bg-white/[0.08]'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        )}
        <div className="h-[1px] bg-white/[0.08]" />
      </div>

      {/* Content — single column on mobile, 2-up grid filling the width on desktop */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 pb-24">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
              <Bell className="h-7 w-7 text-white/50" />
            </div>
            <p className="text-sm font-semibold text-white">All caught up</p>
            <p className="text-xs text-white/50 mt-1">No notifications right now</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-[13px] text-white/50">Nothing in “{filter}”.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 auto-rows-min">
            <AnimatePresence>
              {filtered.map((n) => (
                <NotificationCard
                  key={n.id}
                  n={n}
                  onOpen={() => handleOpen(n)}
                  onDelete={() => deleteNotification.mutate(n.id)}
                  onConvertToProject={() => handleConvertToProject(n)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
