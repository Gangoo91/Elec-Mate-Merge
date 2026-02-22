import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, CheckCircle2, Bell, ChevronRight } from 'lucide-react';
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
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const getReportTypeBadge = (reportType?: string, certNumber?: string) => {
  const type = reportType?.toLowerCase().replace(/[\s_]/g, '-') || '';
  if (type.includes('minor') || certNumber?.startsWith('MW-')) return 'MW';
  if (
    type === 'eic' ||
    (type.includes('eic') && !type.includes('eicr')) ||
    certNumber?.startsWith('EIC-')
  )
    return 'EIC';
  if (type === 'eicr' || type.includes('eicr') || certNumber?.startsWith('EICR-')) return 'EICR';
  return 'CERT';
};

export const PendingNotificationsCard = ({ onNavigate }: PendingNotificationsCardProps) => {
  const { notifications = [], isLoading } = useNotifications();

  const urgentNotifications = notifications
    .filter((n) => n.notification_status !== 'submitted' && n.notification_status !== 'cancelled')
    .sort((a, b) => {
      if (!a.submission_deadline) return 1;
      if (!b.submission_deadline) return -1;
      return (
        getDaysUntilDeadline(a.submission_deadline) - getDaysUntilDeadline(b.submission_deadline)
      );
    })
    .slice(0, 3);

  const overdueCount = notifications.filter(
    (n) =>
      n.submission_deadline &&
      getDaysUntilDeadline(n.submission_deadline) < 0 &&
      n.notification_status !== 'submitted'
  ).length;

  const totalPending = notifications.filter(
    (n) => n.notification_status !== 'submitted' && n.notification_status !== 'cancelled'
  ).length;

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <Bell className="h-5 w-5 text-elec-yellow" />
          <span className="text-base font-semibold text-white">Part P Notifications</span>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-20 w-full rounded-2xl bg-white/[0.03]" />
          <Skeleton className="h-20 w-full rounded-2xl bg-white/[0.03]" />
        </div>
      </div>
    );
  }

  if (urgentNotifications.length === 0) {
    return (
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <CheckCircle2 className="h-5 w-5 text-green-400" />
          <span className="text-base font-semibold text-white">Part P Notifications</span>
        </div>
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.06] border border-white/[0.08]">
          <div className="w-11 h-11 rounded-xl bg-green-500/12 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-green-400">All Clear</p>
            <p className="text-sm text-white mt-0.5">No pending notifications</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          {overdueCount > 0 ? (
            <AlertTriangle className="h-5 w-5 text-red-400" />
          ) : (
            <Bell className="h-5 w-5 text-elec-yellow" />
          )}
          <span className="text-base font-semibold text-white">Part P Notifications</span>
          {overdueCount > 0 && (
            <span className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-red-500/15 text-red-400">
              {overdueCount} overdue
            </span>
          )}
        </div>
        {totalPending > 3 && (
          <button
            className="text-sm font-medium text-elec-yellow hover:underline touch-manipulation h-11 flex items-center"
            onClick={() => onNavigate?.('notifications')}
          >
            View All
          </button>
        )}
      </div>

      {/* Notification List */}
      <div className="space-y-2">
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
            const reportLabel = getReportTypeBadge(
              notification.reports?.report_type,
              notification.reports?.certificate_number
            );

            const isOverdue = urgency === 'overdue';
            const isUrgent = urgency === 'urgent';

            const deadlineText =
              daysRemaining !== null && daysRemaining < 0
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
                  'flex items-center gap-3.5 p-4 rounded-2xl cursor-pointer',
                  'border transition-all touch-manipulation active:scale-[0.98]',
                  isOverdue
                    ? 'bg-red-500/8 border-red-500/15 hover:bg-red-500/12'
                    : isUrgent
                      ? 'bg-orange-500/8 border-orange-500/15 hover:bg-orange-500/12'
                      : 'bg-white/[0.06] border-white/[0.08] hover:bg-white/[0.09]'
                )}
                onClick={() => onNavigate?.('notifications')}
              >
                <div className="flex-1 min-w-0">
                  {/* Badges row */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={cn(
                        'text-[10px] font-bold px-2 py-0.5 rounded',
                        isOverdue
                          ? 'bg-red-500/20 text-red-400'
                          : isUrgent
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-elec-yellow/15 text-elec-yellow'
                      )}
                    >
                      {reportLabel}
                    </span>
                    <span className="text-[10px] font-medium text-white px-2 py-0.5 rounded bg-white/[0.06]">
                      {formatWorkType(notification.work_type)}
                    </span>
                    {notification.submission_deadline && (
                      <span
                        className={cn(
                          'text-xs font-semibold ml-auto',
                          isOverdue ? 'text-red-400' : isUrgent ? 'text-orange-400' : 'text-green-400'
                        )}
                      >
                        {deadlineText}
                      </span>
                    )}
                  </div>
                  {/* Client name */}
                  <h4 className="text-sm font-semibold text-white truncate text-left">
                    {clientName || 'No client name'}
                  </h4>
                  {/* Address */}
                  <p className="text-sm text-white truncate mt-0.5 text-left">
                    {address || 'No address'}
                  </p>
                </div>

                <ChevronRight
                  className={cn(
                    'h-5 w-5 flex-shrink-0',
                    isOverdue ? 'text-red-400' : isUrgent ? 'text-orange-400' : 'text-elec-yellow'
                  )}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
