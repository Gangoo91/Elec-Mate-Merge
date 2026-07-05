import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  Gift,
  CalendarClock,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUserNotifications, type UserNotification } from '@/hooks/useUserNotifications';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

// Icon + accent per notification type. Anything unmapped falls back to a bell.
const TYPE_ICON: Record<string, { icon: typeof Bell; tint: string; bg: string }> = {
  payment_failed: { icon: AlertTriangle, tint: 'text-red-400', bg: 'bg-red-500/10' },
  finder_fee_failed: { icon: AlertTriangle, tint: 'text-red-400', bg: 'bg-red-500/10' },
  payment_recovered: { icon: CheckCircle2, tint: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  invoice_paid: { icon: CheckCircle2, tint: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  quote_accepted: { icon: CheckCircle2, tint: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  subscription_welcome: { icon: CreditCard, tint: 'text-elec-yellow', bg: 'bg-elec-yellow/10' },
  subscription_status: { icon: CreditCard, tint: 'text-elec-yellow', bg: 'bg-elec-yellow/10' },
  subscription_cancelled: { icon: CreditCard, tint: 'text-white/60', bg: 'bg-white/5' },
  referral_reward: { icon: Gift, tint: 'text-purple-400', bg: 'bg-purple-500/10' },
  booking_received: { icon: CalendarClock, tint: 'text-blue-400', bg: 'bg-blue-500/10' },
};

const iconFor = (type: string) =>
  TYPE_ICON[type] ?? { icon: Bell, tint: 'text-elec-yellow', bg: 'bg-elec-yellow/10' };

export default function NotificationBell() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const {
    notifications,
    unreadCount,
    isLoading,
    refetch,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    subscribeToNotifications,
  } = useUserNotifications();

  // Live updates: refresh on any new notification while mounted.
  useEffect(() => {
    const unsubscribe = subscribeToNotifications(() => refetch());
    return unsubscribe;
    // subscribeToNotifications is stable per user; refetch is stable from RQ.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = (n: UserNotification) => {
    if (!n.is_read) markAsRead.mutate(n.id);
    if (n.link) {
      setOpen(false);
      navigate(n.link);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className={cn(
          'relative h-9 w-9 min-w-[36px] min-h-[36px] sm:h-10 sm:w-10 sm:min-w-[40px] sm:min-h-[40px]',
          'bg-white/5 border border-white/10 hover:bg-white/10 active:bg-white/15',
          'touch-manipulation rounded-xl transition-all duration-150',
          unreadCount > 0 && 'text-elec-yellow'
        )}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
      >
        <Bell className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-elec-yellow text-black text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={cn(
            'p-0 flex flex-col bg-background',
            isMobile ? 'h-[85vh] rounded-t-2xl' : 'w-[400px] max-w-[400px]'
          )}
        >
          <SheetHeader className="p-4 border-b border-border shrink-0">
            <SheetTitle className="flex items-center gap-2 text-foreground">
              <Bell className="h-5 w-5 text-elec-yellow" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-elec-yellow text-black ml-2">{unreadCount}</Badge>
              )}
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllAsRead.mutate()}
                  className="ml-auto flex items-center gap-1 text-[12px] text-white/55 hover:text-white/80 transition-colors touch-manipulation"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  Mark all read
                </button>
              )}
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto pb-safe">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
                <div className="h-14 w-14 rounded-full bg-elec-yellow/10 grid place-items-center mb-4">
                  <Bell className="h-7 w-7 text-elec-yellow/70" />
                </div>
                <h3 className="font-semibold text-foreground">You're all caught up</h3>
                <p className="mt-1 text-[13px] text-muted-foreground max-w-xs">
                  Payments, bookings and account updates will show up here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.06]">
                {notifications.map((n) => {
                  const { icon: Icon, tint, bg } = iconFor(n.type);
                  return (
                    <div
                      key={n.id}
                      onClick={() => handleOpen(n)}
                      className={cn(
                        'group flex gap-3 px-4 py-3.5 cursor-pointer transition-colors',
                        'hover:bg-white/[0.03] active:bg-white/[0.05] touch-manipulation',
                        !n.is_read && 'bg-elec-yellow/[0.04]'
                      )}
                    >
                      <div className={cn('h-9 w-9 rounded-lg grid place-items-center shrink-0', bg)}>
                        <Icon className={cn('h-4.5 w-4.5', tint)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          <p className="text-[13.5px] font-semibold text-foreground leading-snug">
                            {n.title}
                          </p>
                          {!n.is_read && (
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-elec-yellow shrink-0" />
                          )}
                        </div>
                        <p className="mt-0.5 text-[12.5px] text-muted-foreground leading-snug line-clamp-2">
                          {n.message}
                        </p>
                        <p className="mt-1 text-[11px] text-white/40">
                          {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification.mutate(n.id);
                        }}
                        aria-label="Dismiss"
                        className="self-center opacity-0 group-hover:opacity-100 sm:transition-opacity text-white/30 hover:text-white/70 p-1.5 touch-manipulation"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
