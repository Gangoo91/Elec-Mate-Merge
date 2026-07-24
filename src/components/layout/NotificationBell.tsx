import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUserNotifications, type UserNotification } from '@/hooks/useUserNotifications';
import { formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { cn } from '@/lib/utils';

// No icons — a small colour-coded category label + accent carries the meaning.
type Tone = { label: string; text: string; bar: string };

const CATEGORIES: [RegExp, Tone][] = [
  [/overdue|fail|danger|urgent|reject|declin/i, { label: 'Action needed', text: 'text-red-300', bar: 'bg-red-400' }],
  [/part.?p|deadline|notifiable/i, { label: 'Part P', text: 'text-amber-300', bar: 'bg-amber-400' }],
  [/qs|review|sign.?off|countersign/i, { label: 'QS', text: 'text-elec-yellow', bar: 'bg-elec-yellow' }],
  [/approv|paid|recovered|complete|accepted|success/i, { label: 'Done', text: 'text-emerald-300', bar: 'bg-emerald-400' }],
  [/leave|holiday|timesheet|expense|absence|rota|shift|job|assign/i, { label: 'Team', text: 'text-blue-300', bar: 'bg-blue-400' }],
  [/message|chat|reply/i, { label: 'Message', text: 'text-sky-300', bar: 'bg-sky-400' }],
  [/snag|defect|fault/i, { label: 'Snag', text: 'text-orange-300', bar: 'bg-orange-400' }],
  [/invoice|payment|quote|deposit|reward|referral/i, { label: 'Finance', text: 'text-emerald-300', bar: 'bg-emerald-400' }],
  [/cert|report|eicr|\beic\b|expir/i, { label: 'Certificate', text: 'text-blue-300', bar: 'bg-blue-400' }],
  [/subscription|billing/i, { label: 'Account', text: 'text-white/70', bar: 'bg-white/40' }],
];

const toneFor = (type: string, title = '', message = ''): Tone => {
  const hay = `${type} ${title} ${message}`;
  for (const [re, tone] of CATEGORIES) if (re.test(hay)) return tone;
  return { label: 'Update', text: 'text-white/70', bar: 'bg-white/40' };
};

const bucketOf = (iso: string): 'Today' | 'Yesterday' | 'Earlier' => {
  const d = new Date(iso);
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  return 'Earlier';
};

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

  useEffect(() => {
    const unsubscribe = subscribeToNotifications(() => refetch());
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Group the (already date-sorted) stream into Today / Yesterday / Earlier.
  const groups = useMemo(() => {
    const order: Array<'Today' | 'Yesterday' | 'Earlier'> = ['Today', 'Yesterday', 'Earlier'];
    const map = new Map<string, UserNotification[]>();
    for (const n of notifications) {
      const b = bucketOf(n.created_at);
      (map.get(b) ?? map.set(b, []).get(b)!).push(n);
    }
    return order.filter((b) => map.has(b)).map((b) => ({ label: b, items: map.get(b)! }));
  }, [notifications]);

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
            'p-0 flex flex-col bg-background border-white/10',
            isMobile ? 'h-[88vh] rounded-t-2xl' : 'w-[420px] max-w-[420px]'
          )}
        >
          {isMobile && (
            <div className="pt-3 pb-1 flex justify-center shrink-0">
              <div className="h-1 w-9 rounded-full bg-white/20" />
            </div>
          )}
          <SheetHeader className="px-4 pt-3 pb-3 border-b border-white/[0.08] shrink-0">
            <div className="flex items-center gap-2.5">
              <SheetTitle className="text-[17px] font-semibold tracking-tight text-white">
                Notifications
              </SheetTitle>
              {unreadCount > 0 && (
                <span className="text-[11px] font-bold text-black bg-elec-yellow rounded-full px-1.5 min-w-[18px] h-[18px] inline-flex items-center justify-center">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllAsRead.mutate()}
                  className="ml-auto inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-[12px] font-medium text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors touch-manipulation"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  Mark all read
                </button>
              )}
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto pb-safe">
            {isLoading ? (
              <div className="p-4 space-y-2.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 rounded-xl bg-white/[0.04] animate-pulse" />
                ))}
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
                <div className="inline-flex items-center gap-1.5 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <p className="text-[15px] font-semibold text-white">You're all caught up</p>
                </div>
                <p className="text-[13px] text-white/60 max-w-xs leading-relaxed">
                  Payments, jobs, certificate deadlines and team updates all land here.
                </p>
              </div>
            ) : (
              <div>
                {groups.map((group) => (
                  <div key={group.label}>
                    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm px-4 pt-3.5 pb-2">
                      <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/50">
                        {group.label}
                      </p>
                    </div>
                    <div className="divide-y divide-white/[0.05]">
                      {group.items.map((n) => {
                        const tone = toneFor(n.type, n.title, n.message);
                        return (
                          <div
                            key={n.id}
                            onClick={() => handleOpen(n)}
                            className={cn(
                              'group relative flex gap-3 pl-4 pr-3 py-3.5 cursor-pointer transition-colors',
                              'hover:bg-white/[0.03] active:bg-white/[0.05] touch-manipulation',
                              !n.is_read && 'bg-elec-yellow/[0.05]'
                            )}
                          >
                            {/* Accent — brighter when unread, tone colour when read */}
                            <span
                              className={cn(
                                'absolute left-0 inset-y-0 w-[3px]',
                                !n.is_read ? 'bg-elec-yellow' : 'opacity-40',
                                n.is_read && tone.bar
                              )}
                              aria-hidden
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className={cn(
                                    'text-[10px] font-bold uppercase tracking-[0.1em]',
                                    tone.text
                                  )}
                                >
                                  {tone.label}
                                </span>
                                <span className="text-white/25 text-[10px]">·</span>
                                <span className="text-[11px] text-white/45 tabular-nums">
                                  {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                                </span>
                                {!n.is_read && (
                                  <span className="ml-auto h-2 w-2 rounded-full bg-elec-yellow shrink-0" />
                                )}
                              </div>
                              <p
                                className={cn(
                                  'mt-1 text-[14px] leading-snug',
                                  n.is_read ? 'font-medium text-white/90' : 'font-semibold text-white'
                                )}
                              >
                                {n.title}
                              </p>
                              <p className="mt-0.5 text-[12.5px] text-white/70 leading-snug line-clamp-2">
                                {n.message}
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification.mutate(n.id);
                              }}
                              aria-label="Dismiss"
                              className="self-start mt-0.5 opacity-0 group-hover:opacity-100 sm:transition-opacity text-white/40 hover:text-white/80 p-1.5 touch-manipulation"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
