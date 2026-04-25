import React from 'react';
import { Button } from '@/components/ui/button';
import { useNotifications, Notification } from '@/components/notifications/NotificationProvider';
import { format, isToday, isYesterday, formatDistanceToNow } from 'date-fns';
import { Bell, Check, CheckCheck, Trash2, X, Clock, AlertTriangle, MessageSquare, FileText, Sparkles, Zap, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const getNotifIcon = (type: string) => {
  const map: Record<string, { icon: typeof Bell; color: string; bg: string }> = {
    success: { icon: Check, color: 'text-green-400', bg: 'bg-green-500/10' },
    warning: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    error: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10' },
    message: { icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    update: { icon: Sparkles, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    certificate: { icon: FileText, color: 'text-elec-yellow', bg: 'bg-elec-yellow/10' },
  };
  return map[type] || { icon: Zap, color: 'text-elec-yellow', bg: 'bg-elec-yellow/10' };
};

const formatTime = (date: Date) => {
  const d = new Date(date);
  if (isToday(d)) return format(d, 'h:mm a');
  if (isYesterday(d)) return 'Yesterday ' + format(d, 'h:mm a');
  return formatDistanceToNow(d, { addSuffix: true });
};

const NotificationCard = ({ n, onRead, onDelete }: { n: Notification; onRead: () => void; onDelete: () => void }) => {
  const { icon: Icon, color, bg } = getNotifIcon(n.type || 'info');
  return (
    <motion.div
      layout
      exit={{ opacity: 0, x: 80, height: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative rounded-2xl border transition-all touch-manipulation',
        n.read
          ? 'bg-white/[0.02] border-white/[0.06]'
          : 'bg-elec-yellow/[0.03] border-elec-yellow/[0.12]'
      )}
    >
      {/* Unread accent */}
      {!n.read && <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-elec-yellow" />}

      <div className="p-4 flex gap-3">
        {/* Icon */}
        <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5', bg)}>
          <Icon className={cn('h-4 w-4', color)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={cn('text-sm leading-snug', n.read ? 'font-medium text-white' : 'font-semibold text-white')}>
              {n.title}
            </h3>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="h-7 w-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500/15 transition-all touch-manipulation flex-shrink-0"
            >
              <X className="h-3.5 w-3.5 text-white hover:text-red-400" />
            </button>
          </div>
          <p className="text-xs text-white mt-1 line-clamp-2 leading-relaxed">{n.message}</p>
          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-white" />
              <span className="text-[10px] text-white font-medium">{formatTime(n.createdAt)}</span>
            </div>
            {!n.read && (
              <button onClick={onRead} className="text-[11px] font-medium text-elec-yellow/70 hover:text-elec-yellow transition-colors touch-manipulation">
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications } = useNotifications();
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98]">
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
                  <button onClick={markAllAsRead} className="h-8 px-2.5 rounded-lg text-[11px] font-medium text-white hover:text-white hover:bg-white/[0.06] touch-manipulation transition-colors flex items-center gap-1.5">
                    <CheckCheck className="h-3.5 w-3.5" />
                    Read all
                  </button>
                )}
                <button onClick={clearAllNotifications} className="h-8 px-2.5 rounded-lg text-[11px] font-medium text-white hover:text-red-400 hover:bg-red-500/10 touch-manipulation transition-colors flex items-center gap-1.5">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-3 pb-24">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
              <Bell className="h-7 w-7 text-white" />
            </div>
            <p className="text-sm font-semibold text-white">All caught up</p>
            <p className="text-xs text-white mt-1">No notifications</p>
          </div>
        ) : (
          <AnimatePresence>
            {notifications.map((n) => (
              <NotificationCard
                key={n.id}
                n={n}
                onRead={() => markAsRead(n.id)}
                onDelete={() => deleteNotification(n.id)}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
