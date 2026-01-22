import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  User,
  CalendarClock,
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
      <div className="bg-card border border-elec-yellow/20 rounded-xl overflow-hidden">
        <div className="p-3 border-b border-elec-yellow/10">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-semibold text-white">Part P Notifications</span>
          </div>
        </div>
        <div className="p-3 flex items-center justify-center py-10">
          <div className="w-5 h-5 border-2 border-elec-yellow border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (urgentNotifications.length === 0) {
    return (
      <div className="bg-card border border-elec-yellow/20 rounded-xl overflow-hidden">
        <div className="p-3 border-b border-elec-yellow/10">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            <span className="text-sm font-semibold text-white">Part P Notifications</span>
          </div>
        </div>
        <div className="p-3">
          <div className="py-6 text-center">
            <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-green-500/15 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-sm font-medium text-green-400 mb-1">All Clear</p>
            <p className="text-xs text-white/40 mb-3">No pending Part P notifications</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate?.('notifications')}
              className="text-elec-yellow/60 hover:text-elec-yellow hover:bg-elec-yellow/10 h-8 px-3 text-xs font-medium touch-manipulation"
            >
              View History <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-card border rounded-xl overflow-hidden",
      overdueCount > 0 ? "border-red-500/40" : "border-elec-yellow/20"
    )}>
      {/* Header */}
      <div className="p-3 border-b border-elec-yellow/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {overdueCount > 0 ? (
              <AlertTriangle className="h-4 w-4 text-red-400" />
            ) : (
              <Bell className="h-4 w-4 text-elec-yellow" />
            )}
            <span className="text-sm font-semibold text-white">Part P Notifications</span>
          </div>
          <div className="flex items-center gap-2">
            {overdueCount > 0 && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400">
                {overdueCount} overdue
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-2 space-y-1.5">
        {urgentNotifications.map(notification => {
          const daysRemaining = notification.submission_deadline
            ? getDaysUntilDeadline(notification.submission_deadline)
            : null;
          const urgency = notification.submission_deadline
            ? getDeadlineUrgency(notification.submission_deadline)
            : 'safe';

          const clientName = notification.reports?.client_name;
          const address = notification.reports?.installation_address;
          const certNumber = notification.reports?.certificate_number;
          const reportLabel = getReportTypeBadge(notification.reports?.report_type, certNumber);

          const isOverdue = urgency === 'overdue';
          const isUrgent = urgency === 'urgent';

          return (
            <button
              key={notification.id}
              className={cn(
                'w-full rounded-lg border p-2.5 text-left touch-manipulation transition-all',
                'active:scale-[0.98]',
                isOverdue ? 'border-red-500/30 bg-red-500/5' :
                isUrgent ? 'border-orange-500/30 bg-orange-500/5' :
                'border-elec-yellow/10 bg-elec-yellow/5'
              )}
              onClick={() => onNavigate?.('notifications')}
            >
              <div className="flex items-center gap-2.5">
                {/* Type Badge */}
                <div className="w-8 h-8 rounded-lg bg-elec-yellow/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-bold text-elec-yellow">{reportLabel}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">
                    {formatWorkType(notification.work_type)}
                  </p>
                  {clientName && (
                    <p className="text-[10px] text-white/50 truncate">{clientName}</p>
                  )}
                  {notification.submission_deadline && (
                    <p className={cn(
                      "text-[10px] font-medium mt-0.5",
                      isOverdue ? "text-red-400" : isUrgent ? "text-orange-400" : "text-elec-yellow"
                    )}>
                      {daysRemaining !== null && daysRemaining < 0
                        ? `${Math.abs(daysRemaining)}d overdue`
                        : daysRemaining === 0
                          ? 'Due today'
                          : `${daysRemaining}d left`
                      }
                    </p>
                  )}
                </div>

                <ChevronRight className="w-4 h-4 text-elec-yellow/30 flex-shrink-0" />
              </div>
            </button>
          );
        })}

        {/* View All Button */}
        <Button
          variant="ghost"
          className="w-full h-8 text-xs font-medium text-elec-yellow/60 hover:text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation"
          onClick={() => onNavigate?.('notifications')}
        >
          View All Notifications
          <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </div>
  );
};
