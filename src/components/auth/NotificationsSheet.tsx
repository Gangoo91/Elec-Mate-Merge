import { Bell, Check, CheckCheck, Sparkles, Clock, AlertTriangle, MessageSquare, FileText, Zap, ChevronRight, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useNotifications, Notification } from '@/components/notifications/NotificationProvider';
import { cn } from '@/lib/utils';
import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface NotificationsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Get appropriate icon for notification type
const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return { icon: Check, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' };
    case 'warning':
      return { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
    case 'error':
      return { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' };
    case 'message':
      return { icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
    case 'update':
      return { icon: Sparkles, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' };
    case 'certificate':
      return { icon: FileText, color: 'text-elec-yellow', bg: 'bg-elec-yellow/10', border: 'border-elec-yellow/20' };
    default:
      return { icon: Zap, color: 'text-elec-yellow', bg: 'bg-elec-yellow/10', border: 'border-elec-yellow/20' };
  }
};

// Format time intelligently
const formatTime = (date: Date) => {
  const d = new Date(date);
  if (isToday(d)) {
    return format(d, 'h:mm a');
  } else if (isYesterday(d)) {
    return 'Yesterday';
  }
  return formatDistanceToNow(d, { addSuffix: true });
};

// Individual notification item
const NotificationItem = ({
  notification,
  onRead,
  onDelete,
  index
}: {
  notification: Notification;
  onRead: () => void;
  onDelete: () => void;
  index: number;
}) => {
  const iconConfig = getNotificationIcon(notification.type || 'info');
  const IconComponent = iconConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
      className={cn(
        "group relative px-4 py-3 cursor-pointer transition-all duration-200",
        "hover:bg-white/5",
        !notification.read && "bg-elec-yellow/5"
      )}
      onClick={onRead}
    >
      {/* Unread indicator bar */}
      {!notification.read && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-elec-yellow to-amber-500" />
      )}

      <div className="flex gap-3">
        {/* Icon */}
        <div className={cn(
          "shrink-0 mt-0.5 p-2 rounded-xl border",
          iconConfig.bg,
          iconConfig.border
        )}>
          <IconComponent className={cn("h-4 w-4", iconConfig.color)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className={cn(
              "text-sm leading-snug line-clamp-1",
              !notification.read ? "font-semibold text-foreground" : "font-medium text-foreground/80"
            )}>
              {notification.title}
            </p>
            {!notification.read && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="h-2 w-2 rounded-full bg-elec-yellow shrink-0 mt-1.5 shadow-lg shadow-elec-yellow/50"
              />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
            {notification.message}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Clock className="h-3 w-3 text-muted-foreground/50" />
            <span className="text-[10px] text-muted-foreground/70 font-medium uppercase tracking-wide">
              {formatTime(notification.createdAt)}
            </span>
          </div>
        </div>

        {/* Delete button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 self-start opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 hover:text-red-400"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export function NotificationsSheet({ open, onOpenChange }: NotificationsSheetProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Using useNotifications hook safely
  let notifications: Notification[] = [];
  let unreadCount = 0;
  let markAsRead = (id: string) => {};
  let markAllAsRead = () => {};
  let deleteNotification = (id: string) => {};
  let clearAllNotifications = () => {};

  try {
    const notificationContext = useNotifications();
    notifications = notificationContext.notifications;
    unreadCount = notificationContext.unreadCount;
    markAsRead = notificationContext.markAsRead;
    markAllAsRead = notificationContext.markAllAsRead;
    deleteNotification = notificationContext.deleteNotification;
    clearAllNotifications = notificationContext.clearAllNotifications;
  } catch (e) {
    console.warn('NotificationProvider not available');
  }

  const handleViewAll = () => {
    onOpenChange(false);
    navigate('/notifications');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={cn(
          "p-0 flex flex-col bg-background",
          isMobile ? "h-[85vh] rounded-t-2xl" : "w-[380px] max-w-[380px]"
        )}
      >
        {/* Header */}
        <SheetHeader className="p-4 border-b border-border shrink-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-foreground">
              <Bell className="h-5 w-5 text-elec-yellow" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-elec-yellow text-black ml-2">
                  {unreadCount} new
                </Badge>
              )}
            </SheetTitle>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
                  onClick={markAllAsRead}
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  Mark read
                </Button>
              )}
              {notifications.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-red-400"
                  onClick={clearAllNotifications}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear all
                </Button>
              )}
            </div>
          </div>
        </SheetHeader>

        {/* Notifications list */}
        <ScrollArea className="flex-1">
          <AnimatePresence>
            {notifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 px-4 text-center"
              >
                <div className="p-4 rounded-2xl bg-muted/30 inline-block mb-3">
                  <Bell className="h-8 w-8 text-muted-foreground/40" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">All caught up!</p>
                <p className="text-xs text-muted-foreground/60 mt-1">No new notifications</p>
              </motion.div>
            ) : (
              <div className="divide-y divide-border/30">
                {notifications.map((notification, index) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={() => markAsRead(notification.id)}
                    onDelete={() => deleteNotification(notification.id)}
                    index={index}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-border/50 bg-muted/30 shrink-0 pb-safe">
            <Button
              variant="ghost"
              className="w-full h-10 text-sm font-medium hover:bg-elec-yellow/10 hover:text-elec-yellow transition-colors"
              onClick={handleViewAll}
            >
              View all notifications
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
