import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileWarning,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  FileText,
  Zap,
  CalendarClock,
  Bell
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDeadlineStatus, getDaysUntilDeadline, getDeadlineUrgency } from '@/utils/notificationHelper';
import { cn } from '@/lib/utils';

interface PendingNotificationsCardProps {
  onNavigate?: (section: string) => void;
}

// Format work type to be more readable
const formatWorkType = (workType: string): string => {
  if (!workType) return 'Electrical Work';

  return workType
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Get report type badge info - handles various formats
const getReportTypeBadge = (reportType?: string, certNumber?: string) => {
  const type = reportType?.toLowerCase().replace(/[\s_]/g, '-') || '';

  // Check report type first, then certificate number prefix as fallback
  if (type.includes('minor') || certNumber?.startsWith('MW-')) {
    return { label: 'MW', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', fullLabel: 'Minor Works' };
  }
  if (type === 'eic' || type.includes('eic') && !type.includes('eicr') || certNumber?.startsWith('EIC-')) {
    return { label: 'EIC', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', fullLabel: 'EIC' };
  }
  if (type === 'eicr' || type.includes('eicr') || certNumber?.startsWith('EICR-')) {
    return { label: 'EICR', color: 'bg-green-500/20 text-green-400 border-green-500/30', fullLabel: 'EICR' };
  }
  return { label: 'CERT', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', fullLabel: 'Certificate' };
};

export const PendingNotificationsCard = ({ onNavigate }: PendingNotificationsCardProps) => {
  const { notifications = [], isLoading } = useNotifications();

  // Get pending/overdue notifications sorted by urgency
  const urgentNotifications = notifications
    .filter(n => n.notification_status !== 'submitted' && n.notification_status !== 'cancelled')
    .sort((a, b) => {
      if (!a.submission_deadline) return 1;
      if (!b.submission_deadline) return -1;
      return getDaysUntilDeadline(a.submission_deadline) - getDaysUntilDeadline(b.submission_deadline);
    })
    .slice(0, 3); // Show top 3 for cleaner mobile view

  const overdueCount = notifications.filter(
    n => n.submission_deadline && getDaysUntilDeadline(n.submission_deadline) < 0 && n.notification_status !== 'submitted'
  ).length;

  const totalPending = notifications.filter(
    n => n.notification_status !== 'submitted' && n.notification_status !== 'cancelled'
  ).length;

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-card via-card to-amber-500/5 border-amber-500/30 shadow-lg shadow-amber-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2.5 text-base">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg shadow-amber-500/20">
              <Bell className="w-4 h-4 text-black" />
            </div>
            Part P Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (urgentNotifications.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-card via-card to-green-500/5 border-green-500/30 shadow-lg shadow-green-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2.5 text-base">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg shadow-green-500/20">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            Part P Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <p className="font-semibold text-green-400 mb-1">All Clear!</p>
            <p className="text-sm text-muted-foreground">No pending Part P notifications</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate?.('notifications')}
              className="mt-4 border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50"
            >
              View History
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "shadow-lg transition-all",
      overdueCount > 0
        ? "bg-gradient-to-br from-card via-card to-red-500/10 border-red-500/40 shadow-red-500/10"
        : "bg-gradient-to-br from-card via-card to-amber-500/5 border-amber-500/30 shadow-amber-500/5"
    )}>
      <CardHeader className="pb-2 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2.5 text-base">
            <div className={cn(
              "p-2 rounded-xl shadow-lg",
              overdueCount > 0
                ? "bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/30"
                : "bg-gradient-to-br from-amber-500 to-orange-500 shadow-amber-500/20"
            )}>
              {overdueCount > 0 ? (
                <AlertTriangle className="w-4 h-4 text-white" />
              ) : (
                <Bell className="w-4 h-4 text-black" />
              )}
            </div>
            Part P Notifications
          </CardTitle>

          {/* Stats Pills */}
          <div className="flex items-center gap-2">
            {overdueCount > 0 && (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse px-2 py-0.5 text-xs font-bold">
                {overdueCount} Overdue
              </Badge>
            )}
            {totalPending > urgentNotifications.length && (
              <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground px-2 py-0.5 text-xs">
                +{totalPending - urgentNotifications.length} more
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-4 pb-4">
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
          const reportBadge = getReportTypeBadge(notification.reports?.report_type, certNumber);

          // Urgency styling
          const urgencyStyles = {
            overdue: {
              border: 'border-red-500/40',
              bg: 'bg-gradient-to-r from-red-500/10 to-red-500/5',
              deadline: 'text-red-400',
              icon: 'text-red-500',
              glow: 'shadow-red-500/10'
            },
            urgent: {
              border: 'border-orange-500/40',
              bg: 'bg-gradient-to-r from-orange-500/10 to-orange-500/5',
              deadline: 'text-orange-400',
              icon: 'text-orange-500',
              glow: 'shadow-orange-500/10'
            },
            warning: {
              border: 'border-amber-500/30',
              bg: 'bg-gradient-to-r from-amber-500/5 to-transparent',
              deadline: 'text-amber-400',
              icon: 'text-amber-500',
              glow: 'shadow-amber-500/5'
            },
            safe: {
              border: 'border-border/50',
              bg: 'bg-card/50',
              deadline: 'text-green-400',
              icon: 'text-green-500',
              glow: ''
            }
          };

          const styles = urgencyStyles[urgency];

          return (
            <div
              key={notification.id}
              className={cn(
                'rounded-2xl border p-4 transition-all cursor-pointer touch-manipulation',
                'hover:scale-[1.01] active:scale-[0.99]',
                styles.border,
                styles.bg,
                styles.glow && `shadow-lg ${styles.glow}`
              )}
              onClick={() => onNavigate?.('notifications')}
            >
              {/* Header: Type Badge + Work Type */}
              <div className="flex items-center gap-3 mb-3">
                {/* Type Icon Badge */}
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                  reportBadge.label === 'MW' && 'bg-purple-500',
                  reportBadge.label === 'EIC' && 'bg-blue-500',
                  reportBadge.label === 'EICR' && 'bg-green-500',
                  reportBadge.label === 'CERT' && 'bg-gray-500'
                )}>
                  <span className="text-xs font-bold text-white">{reportBadge.label}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {formatWorkType(notification.work_type)}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {certNumber || notification.report_id?.substring(0, 16)}
                  </p>
                </div>

                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </div>

              {/* Client & Address (if available) */}
              {(clientName || address) && (
                <div className="space-y-1.5 mb-3 pl-[52px]">
                  {clientName && (
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground truncate">{clientName}</span>
                    </div>
                  )}
                  {address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-muted-foreground line-clamp-1">{address}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Deadline Badge - Prominent */}
              {notification.submission_deadline && (
                <div className={cn(
                  "flex items-center justify-between p-2.5 rounded-xl mt-2",
                  urgency === 'overdue' && "bg-red-500/20",
                  urgency === 'urgent' && "bg-orange-500/20",
                  urgency === 'warning' && "bg-amber-500/10",
                  urgency === 'safe' && "bg-green-500/10"
                )}>
                  <div className="flex items-center gap-2">
                    {urgency === 'overdue' || urgency === 'urgent' ? (
                      <AlertTriangle className={cn("w-4 h-4", styles.icon, urgency === 'overdue' && 'animate-pulse')} />
                    ) : (
                      <CalendarClock className={cn("w-4 h-4", styles.icon)} />
                    )}
                    <span className="text-xs text-muted-foreground">Deadline</span>
                  </div>
                  <span className={cn("text-sm font-bold", styles.deadline)}>
                    {daysRemaining !== null && daysRemaining < 0
                      ? `${Math.abs(daysRemaining)} days overdue`
                      : daysRemaining === 0
                        ? 'Due today!'
                        : `${daysRemaining} days left`
                    }
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* View All Button */}
        <Button
          variant="outline"
          className={cn(
            "w-full h-12 font-semibold transition-all touch-manipulation",
            overdueCount > 0
              ? "border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50 text-red-400"
              : "border-amber-500/30 hover:bg-amber-500/10 hover:border-amber-500/50"
          )}
          onClick={() => onNavigate?.('notifications')}
        >
          View All Notifications
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};
