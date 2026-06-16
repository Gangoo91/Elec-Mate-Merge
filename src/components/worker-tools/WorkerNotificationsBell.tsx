/**
 * WorkerNotificationsBell
 *
 * Masthead bell + unread badge that opens an in-app inbox of employer decisions
 * (leave/timesheet/expense approved, new message, job assignment…). Tapping a
 * row marks it read and routes to the relevant page. Lives in both the Worker
 * Tools hub and every tool page masthead.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useWorkerNotifications, type WorkerNotification } from '@/hooks/useWorkerNotifications';

const relativeTime = (iso: string): string => {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true });
  } catch {
    return '';
  }
};

export function WorkerNotificationsBell() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markRead, markAllRead } = useWorkerNotifications();

  const handleOpen = (n: WorkerNotification) => {
    if (!n.read_at) markRead(n.id);
    setOpen(false);
    if (n.action_url) navigate(n.action_url);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={unreadCount > 0 ? `${unreadCount} unread notifications` : 'Notifications'}
          className="relative h-9 w-9 inline-flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60"
        >
          <Bell className="h-[18px] w-[18px]" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 rounded-full bg-red-500 text-white text-[9px] font-bold inline-flex items-center justify-center tabular-nums">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[min(360px,calc(100vw-2rem))] p-0 bg-[hsl(0_0%_10%)] border-white/[0.08] text-white overflow-hidden rounded-2xl"
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/[0.06]">
          <div className="text-[13px] font-semibold text-white">Notifications</div>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={() => markAllRead()}
              className="text-[11.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
            >
              Mark all read
            </button>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto overscroll-contain divide-y divide-white/[0.06]">
          {notifications.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <div className="text-[13px] font-medium text-white">You're all caught up</div>
              <p className="mt-1 text-[11.5px] text-white/55">
                Decisions from your employer will show up here.
              </p>
            </div>
          ) : (
            notifications.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => handleOpen(n)}
                className={cn(
                  'group w-full flex items-start gap-3 px-4 py-3 text-left touch-manipulation transition-colors hover:bg-[hsl(0_0%_15%)]',
                  !n.read_at && 'bg-elec-yellow/[0.04]'
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'mt-1.5 h-2 w-2 rounded-full shrink-0',
                    n.read_at ? 'bg-transparent' : 'bg-elec-yellow'
                  )}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[13px] font-medium text-white truncate">{n.title}</span>
                    <span className="text-[10.5px] text-white/45 shrink-0 tabular-nums">
                      {relativeTime(n.created_at)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[12px] text-white/65 line-clamp-2">{n.message}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
