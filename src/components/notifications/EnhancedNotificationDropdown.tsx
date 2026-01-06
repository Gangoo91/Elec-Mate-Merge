import React, { useState } from 'react';
import { Bell, BellRing, Check, CheckCheck, Sparkles, Clock, AlertTriangle, MessageSquare, FileText, Zap, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useNotifications, Notification } from './NotificationProvider';
import { cn } from '@/lib/utils';
import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
  index
}: {
  notification: Notification;
  onRead: () => void;
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

        {/* Hover action */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 self-center">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </motion.div>
  );
};

const EnhancedNotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Using useNotifications hook safely
  let notifications: Notification[] = [];
  let unreadCount = 0;
  let markAsRead = (id: string) => {};
  let markAllAsRead = () => {};

  try {
    const notificationContext = useNotifications();
    notifications = notificationContext.notifications;
    unreadCount = notificationContext.unreadCount;
    markAsRead = notificationContext.markAsRead;
    markAllAsRead = notificationContext.markAllAsRead;
  } catch (e) {
    console.warn('NotificationProvider not available');
  }

  const handleViewAll = () => {
    setOpen(false);
    navigate('/notifications');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "relative h-10 w-10 rounded-xl transition-all duration-300 group",
            "flex items-center justify-center",
            "bg-gradient-to-br from-white/10 to-white/5",
            "border border-white/10 hover:border-white/20",
            "hover:from-white/15 hover:to-white/10",
            "hover:shadow-lg hover:shadow-black/20",
            "active:scale-95",
            open && "from-elec-yellow/20 to-elec-yellow/10 border-elec-yellow/30",
            unreadCount > 0 && "from-elec-yellow/15 to-elec-yellow/5 border-elec-yellow/20"
          )}
        >
          {/* Glow effect when there are notifications */}
          {unreadCount > 0 && (
            <div className="absolute inset-0 rounded-xl bg-elec-yellow/10 animate-pulse" />
          )}

          <AnimatePresence mode="wait">
            {unreadCount > 0 ? (
              <motion.div
                key="bell-ring"
                initial={{ rotate: -15 }}
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                className="relative z-10"
              >
                <BellRing className="h-5 w-5 text-elec-yellow drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              </motion.div>
            ) : (
              <motion.div
                key="bell"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="relative z-10"
              >
                <Bell className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Badge with count */}
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute -top-1.5 -right-1.5 z-20"
              >
                <div className="relative">
                  {/* Ping animation */}
                  <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                  <Badge
                    className={cn(
                      "relative h-5 min-w-5 px-1.5 flex items-center justify-center text-[10px] font-bold",
                      "bg-gradient-to-r from-red-500 to-rose-500 text-white border-2 border-elec-dark",
                      "shadow-lg shadow-red-500/40"
                    )}
                  >
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Badge>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[340px] sm:w-[380px] p-0 bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl"
        align="end"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
                {unreadCount} new
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
              onClick={markAllAsRead}
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </Button>
          )}
        </div>

        {/* Notifications list */}
        <ScrollArea className="max-h-[400px]">
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
                {notifications.slice(0, 10).map((notification, index) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={() => markAsRead(notification.id)}
                    index={index}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-border/50 bg-muted/30">
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
      </PopoverContent>
    </Popover>
  );
};

export default EnhancedNotificationDropdown;
