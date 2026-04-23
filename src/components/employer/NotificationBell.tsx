import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import {
  useUnreadCount,
  useNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
} from '@/hooks/useEmployerNotifications';
import {
  Bell,
  BellRing,
  Check,
  CheckCheck,
  Briefcase,
  AlertTriangle,
  MessageSquare,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'job_assignment':
      return <Briefcase className="h-4 w-4 text-elec-yellow" />;
    case 'schedule_change':
      return <Clock className="h-4 w-4 text-warning" />;
    case 'safety_alert':
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    case 'message':
      return <MessageSquare className="h-4 w-4 text-info" />;
    default:
      return <Bell className="h-4 w-4 text-white" />;
  }
};

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { data: unreadCount = 0 } = useUnreadCount();
  const { data: notifications = [], isLoading } = useNotifications();
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();

  const handleMarkAsRead = async (id: string) => {
    await markAsRead.mutateAsync(id);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead.mutateAsync(undefined);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10">
          {unreadCount > 0 ? (
            <BellRing className="h-5 w-5 text-elec-yellow" />
          ) : (
            <Bell className="h-5 w-5" />
          )}
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 flex items-center justify-center text-xs bg-destructive text-destructive-foreground border-0">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0 bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white"
        align="end"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
          <h3 className="font-semibold text-white">Notifications</h3>
          {unreadCount > 0 && (
            <button
              type="button"
              className="h-8 text-xs gap-1 flex items-center rounded-full px-3 text-white hover:bg-white/[0.06] touch-manipulation"
              onClick={handleMarkAllAsRead}
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </button>
          )}
        </div>

        <ScrollArea className="max-h-[400px]">
          {isLoading ? (
            <div className="p-4 text-center text-white text-sm">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-8 w-8 mx-auto mb-2 text-white" />
              <p className="text-sm text-white">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.06]">
              {notifications.slice(0, 20).map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    'p-4 hover:bg-white/[0.06] transition-colors cursor-pointer',
                    !notification.read_at && 'bg-elec-yellow/5'
                  )}
                  onClick={() => {
                    if (!notification.read_at) {
                      handleMarkAsRead(notification.id);
                    }
                  }}
                >
                  <div className="flex gap-3">
                    <div className="shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={cn(
                            'text-sm leading-tight text-white',
                            !notification.read_at && 'font-medium'
                          )}
                        >
                          {notification.title}
                        </p>
                        {!notification.read_at && (
                          <div className="h-2 w-2 rounded-full bg-elec-yellow shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-xs text-white mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-white mt-1.5">
                        {formatDistanceToNow(new Date(notification.created_at), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <div className="p-3 border-t border-white/[0.06]">
            <button
              type="button"
              className="w-full h-9 text-sm flex items-center justify-center rounded-full text-white hover:bg-white/[0.06] touch-manipulation"
            >
              View all notifications
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
