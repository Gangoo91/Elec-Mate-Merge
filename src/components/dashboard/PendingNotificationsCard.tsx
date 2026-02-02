import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertTriangle,
  CheckCircle2,
  Bell,
  ChevronRight
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { getDaysUntilDeadline, getDeadlineUrgency } from '@/utils/notificationHelper';
import { cn } from '@/lib/utils';

interface PendingNotificationsCardProps {
  onNavigate?: (section: string) => void;
}

const formatWorkType = (workType: string): string => {
  if (!workType) return 'Electrical Work';
  return workType
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const getReportTypeBadge = (reportType?: string, certNumber?: string) => {
  const type = reportType?.toLowerCase().replace(/[\s_]/g, '-') || '';
  if (type.includes('minor') || certNumber?.startsWith('MW-')) return 'MW';
  if (type === 'eic' || (type.includes('eic') && !type.includes('eicr')) || certNumber?.startsWith('EIC-')) return 'EIC';
  if (type === 'eicr' || type.includes('eicr') || certNumber?.startsWith('EICR-')) return 'EICR';
  return 'CERT';
};

export const PendingNotificationsCard = ({ onNavigate }: PendingNotificationsCardProps) => {
  const { notifications = [], isLoading } = useNotifications();

  const urgentNotifications = notifications
    .filter(n => n.notification_status !== 'submitted' && n.notification_status !== 'cancelled')
    .sort((a, b) => {
      if (!a.submission_deadline) return 1;
      if (!b.submission_deadline) return -1;
      return getDaysUntilDeadline(a.submission_deadline) - getDaysUntilDeadline(b.submission_deadline);
    })
    .slice(0, 3);

  const overdueCount = notifications.filter(
    n => n.submission_deadline && getDaysUntilDeadline(n.submission_deadline) < 0 && n.notification_status !== 'submitted'
  ).length;

  const totalPending = notifications.filter(
    n => n.notification_status !== 'submitted' && n.notification_status !== 'cancelled'
  ).length;

  if (isLoading) {
    return (
      <div className="bg-[#242428] border border-elec-yellow/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="h-4 w-4 text-elec-yellow" />
          <span className="text-sm font-semibold text-elec-yellow">Part P Notifications</span>
        </div>
        <Skeleton className="h-16 w-full rounded-xl bg-black/40 mb-2" />
        <Skeleton className="h-16 w-full rounded-xl bg-black/40" />
      </div>
    );
  }

  if (urgentNotifications.length === 0) {
    return (
      <div className="bg-[#242428] border border-elec-yellow/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="h-4 w-4 text-green-400" />
          <span className="text-sm font-semibold text-elec-yellow">Part P Notifications</span>
        </div>
        <div className="text-center py-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-green-500/15 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-green-400" />
          </div>
          <p className="text-sm text-green-400 font-medium mb-1">All Clear</p>
          <p className="text-xs text-white/40">No pending notifications</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-[#242428] border rounded-2xl overflow-hidden",
      overdueCount > 0 ? "border-red-500/30" : "border-elec-yellow/30"
    )}>
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {overdueCount > 0 ? (
              <AlertTriangle className="h-4 w-4 text-red-400" />
            ) : (
              <Bell className="h-4 w-4 text-elec-yellow" />
            )}
            <span className="text-sm font-semibold text-elec-yellow">Part P Notifications</span>
          </div>
          {overdueCount > 0 && (
            <span className="text-[10px] font-medium px-2 py-1 rounded-lg bg-red-500/20 text-red-400">
              {overdueCount} overdue
            </span>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-3 pb-3 space-y-2">
        <AnimatePresence mode="popLayout">
          {urgentNotifications.map((notification, index) => {
            const daysRemaining = notification.submission_deadline
              ? getDaysUntilDeadline(notification.submission_deadline)
              : null;
            const urgency = notification.submission_deadline
              ? getDeadlineUrgency(notification.submission_deadline)
              : 'safe';

            const clientName = notification.reports?.client_name;
            const address = notification.reports?.installation_address;
            const reportLabel = getReportTypeBadge(notification.reports?.report_type, notification.reports?.certificate_number);

            const isOverdue = urgency === 'overdue';
            const isUrgent = urgency === 'urgent';

            const deadlineText = daysRemaining !== null && daysRemaining < 0
              ? `${Math.abs(daysRemaining)}d overdue`
              : daysRemaining === 0
                ? 'Due today'
                : `${daysRemaining}d left`;

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.03 }}
                className={cn(
                  "relative p-3 rounded-xl cursor-pointer border",
                  "active:scale-[0.98] transition-all touch-manipulation",
                  isOverdue ? 'bg-red-500/10 hover:bg-red-500/15 border-red-500/20' :
                  isUrgent ? 'bg-orange-500/10 hover:bg-orange-500/15 border-orange-500/20' :
                  'bg-black/40 hover:bg-black/50 border-white/5'
                )}
                onClick={() => onNavigate?.('notifications')}
              >
                {/* Top row: Type badge + Work type + Deadline */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-md",
                    isOverdue ? 'bg-red-500/20 text-red-400' :
                    isUrgent ? 'bg-orange-500/20 text-orange-400' :
                    'bg-elec-yellow/20 text-elec-yellow'
                  )}>
                    {reportLabel}
                  </span>
                  <span className="text-[10px] font-medium text-white/50 px-2 py-0.5 rounded-md bg-white/5">
                    {formatWorkType(notification.work_type)}
                  </span>
                  {notification.submission_deadline && (
                    <span className={cn(
                      "text-[10px] font-semibold ml-auto",
                      isOverdue ? "text-red-400" : isUrgent ? "text-orange-400" : "text-green-400"
                    )}>
                      {deadlineText}
                    </span>
                  )}
                </div>

                {/* Client name */}
                <h4 className="text-sm font-semibold text-white truncate text-left pr-6">
                  {clientName || 'No client name'}
                </h4>

                {/* Address */}
                <p className="text-xs text-white/40 truncate text-left mt-0.5 pr-6">
                  {address || 'No address'}
                </p>

                {/* Chevron */}
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {totalPending > 3 && (
        <div className="px-3 pb-3">
          <button
            className="w-full py-2 text-xs text-elec-yellow/60 hover:text-elec-yellow transition-colors"
            onClick={() => onNavigate?.('notifications')}
          >
            View All ({totalPending})
          </button>
        </div>
      )}
    </div>
  );
};
