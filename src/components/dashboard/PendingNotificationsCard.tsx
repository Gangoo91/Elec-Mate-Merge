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
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

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
        <CardHeader className={cn("pb-3", isMobile && "px-3 pt-3")}>
          <CardTitle className={cn("flex items-center text-base", isMobile ? "gap-2" : "gap-2.5")}>
            <div className={cn("bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg shadow-amber-500/20", isMobile ? "p-1.5" : "p-2")}>
              <Bell className={cn("text-black", isMobile ? "w-3.5 h-3.5" : "w-4 h-4")} />
            </div>
            <span className={isMobile ? "text-sm" : "text-base"}>Part P Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className={isMobile ? "px-3 pb-3" : ""}>
          <div className={cn("flex items-center justify-center", isMobile ? "py-6" : "py-8")}>
            <div className={cn("border-3 border-amber-500 border-t-transparent rounded-full animate-spin", isMobile ? "w-6 h-6" : "w-8 h-8")} />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (urgentNotifications.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-card via-card to-green-500/5 border-green-500/30 shadow-lg shadow-green-500/5">
        <CardHeader className={cn("pb-3", isMobile && "px-3 pt-3")}>
          <CardTitle className={cn("flex items-center", isMobile ? "gap-2 text-sm" : "gap-2.5 text-base")}>
            <div className={cn("bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg shadow-green-500/20", isMobile ? "p-1.5" : "p-2")}>
              <CheckCircle2 className={cn("text-white", isMobile ? "w-3.5 h-3.5" : "w-4 h-4")} />
            </div>
            Part P Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className={isMobile ? "px-3 pb-3" : ""}>
          <div className={cn("flex flex-col items-center justify-center text-center", isMobile ? "py-4" : "py-6")}>
            <div className={cn("rounded-full bg-green-500/10 flex items-center justify-center mb-3", isMobile ? "w-12 h-12" : "w-16 h-16 mb-4")}>
              <CheckCircle2 className={cn("text-green-500", isMobile ? "w-6 h-6" : "w-8 h-8")} />
            </div>
            <p className={cn("font-semibold text-green-400 mb-1", isMobile && "text-sm")}>All Clear!</p>
            <p className={cn("text-muted-foreground", isMobile ? "text-xs" : "text-sm")}>No pending Part P notifications</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate?.('notifications')}
              className={cn("mt-4 border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50 touch-manipulation", isMobile && "h-10 w-full")}
            >
              View History
              <ArrowRight className={cn(isMobile ? "w-3.5 h-3.5 ml-1" : "w-4 h-4 ml-1.5")} />
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
      <CardHeader className={cn("pb-2", isMobile ? "px-3 pt-3" : "px-4")}>
        <div className="flex items-center justify-between">
          <CardTitle className={cn("flex items-center", isMobile ? "gap-2 text-sm" : "gap-2.5 text-base")}>
            <div className={cn(
              "rounded-xl shadow-lg",
              overdueCount > 0
                ? "bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/30"
                : "bg-gradient-to-br from-amber-500 to-orange-500 shadow-amber-500/20",
              isMobile ? "p-1.5" : "p-2"
            )}>
              {overdueCount > 0 ? (
                <AlertTriangle className={cn("text-white", isMobile ? "w-3.5 h-3.5" : "w-4 h-4")} />
              ) : (
                <Bell className={cn("text-black", isMobile ? "w-3.5 h-3.5" : "w-4 h-4")} />
              )}
            </div>
            Part P Notifications
          </CardTitle>

          {/* Stats Pills */}
          <div className={cn("flex items-center", isMobile ? "gap-1.5" : "gap-2")}>
            {overdueCount > 0 && (
              <Badge className={cn("bg-red-500/20 text-red-400 border-red-500/30 animate-pulse font-bold", isMobile ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-xs")}>
                {overdueCount} Overdue
              </Badge>
            )}
            {totalPending > urgentNotifications.length && (
              <Badge variant="outline" className={cn("border-muted-foreground/30 text-muted-foreground", isMobile ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-xs")}>
                +{totalPending - urgentNotifications.length} more
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className={cn(isMobile ? "space-y-2 px-3 pb-3" : "space-y-3 px-4 pb-4")}>
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
                'rounded-2xl border transition-all cursor-pointer touch-manipulation',
                'hover:scale-[1.01] active:scale-[0.99]',
                styles.border,
                styles.bg,
                styles.glow && `shadow-lg ${styles.glow}`,
                isMobile ? 'p-3' : 'p-4'
              )}
              onClick={() => onNavigate?.('notifications')}
            >
              {/* Header: Type Badge + Work Type */}
              <div className={cn("flex items-center", isMobile ? "gap-2.5 mb-2" : "gap-3 mb-3")}>
                {/* Type Icon Badge */}
                <div className={cn(
                  'rounded-xl flex items-center justify-center flex-shrink-0',
                  reportBadge.label === 'MW' && 'bg-purple-500',
                  reportBadge.label === 'EIC' && 'bg-blue-500',
                  reportBadge.label === 'EICR' && 'bg-green-500',
                  reportBadge.label === 'CERT' && 'bg-gray-500',
                  isMobile ? 'w-8 h-8' : 'w-10 h-10'
                )}>
                  <span className={cn("font-bold text-white", isMobile ? "text-[10px]" : "text-xs")}>{reportBadge.label}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className={cn("font-semibold text-foreground truncate", isMobile ? "text-xs" : "text-sm")}>
                    {formatWorkType(notification.work_type)}
                  </p>
                  <p className={cn("text-muted-foreground font-mono", isMobile ? "text-[10px]" : "text-xs")}>
                    {certNumber || notification.report_id?.substring(0, 16)}
                  </p>
                </div>

                <ArrowRight className={cn("text-muted-foreground flex-shrink-0", isMobile ? "w-3.5 h-3.5" : "w-4 h-4")} />
              </div>

              {/* Client & Address (if available) */}
              {(clientName || address) && (
                <div className={cn("space-y-1", isMobile ? "mb-2 pl-[42px]" : "space-y-1.5 mb-3 pl-[52px]")}>
                  {clientName && (
                    <div className={cn("flex items-center", isMobile ? "gap-1.5" : "gap-2")}>
                      <User className={cn("text-primary flex-shrink-0", isMobile ? "w-3 h-3" : "w-3.5 h-3.5")} />
                      <span className={cn("text-foreground truncate", isMobile ? "text-xs" : "text-sm")}>{clientName}</span>
                    </div>
                  )}
                  {address && (
                    <div className={cn("flex items-start", isMobile ? "gap-1.5" : "gap-2")}>
                      <MapPin className={cn("text-muted-foreground flex-shrink-0 mt-0.5", isMobile ? "w-3 h-3" : "w-3.5 h-3.5")} />
                      <span className={cn("text-muted-foreground line-clamp-1", isMobile ? "text-[10px]" : "text-xs")}>{address}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Deadline Badge - Prominent */}
              {notification.submission_deadline && (
                <div className={cn(
                  "flex items-center justify-between rounded-xl mt-2",
                  urgency === 'overdue' && "bg-red-500/20",
                  urgency === 'urgent' && "bg-orange-500/20",
                  urgency === 'warning' && "bg-amber-500/10",
                  urgency === 'safe' && "bg-green-500/10",
                  isMobile ? "p-2" : "p-2.5"
                )}>
                  <div className={cn("flex items-center", isMobile ? "gap-1.5" : "gap-2")}>
                    {urgency === 'overdue' || urgency === 'urgent' ? (
                      <AlertTriangle className={cn(styles.icon, urgency === 'overdue' && 'animate-pulse', isMobile ? "w-3.5 h-3.5" : "w-4 h-4")} />
                    ) : (
                      <CalendarClock className={cn(styles.icon, isMobile ? "w-3.5 h-3.5" : "w-4 h-4")} />
                    )}
                    <span className={cn("text-muted-foreground", isMobile ? "text-[10px]" : "text-xs")}>Deadline</span>
                  </div>
                  <span className={cn("font-bold", styles.deadline, isMobile ? "text-xs" : "text-sm")}>
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
            "w-full font-semibold transition-all touch-manipulation",
            overdueCount > 0
              ? "border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50 text-red-400"
              : "border-amber-500/30 hover:bg-amber-500/10 hover:border-amber-500/50",
            isMobile ? "h-10 text-sm" : "h-12"
          )}
          onClick={() => onNavigate?.('notifications')}
        >
          View All Notifications
          <ArrowRight className={cn(isMobile ? "w-3.5 h-3.5 ml-1.5" : "w-4 h-4 ml-2")} />
        </Button>
      </CardContent>
    </Card>
  );
};
