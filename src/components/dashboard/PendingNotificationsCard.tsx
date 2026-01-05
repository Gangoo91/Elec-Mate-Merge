import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileWarning, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDeadlineStatus, getDaysUntilDeadline } from '@/utils/notificationHelper';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface PendingNotificationsCardProps {
  onNavigate?: (section: string) => void;
}

export const PendingNotificationsCard = ({ onNavigate }: PendingNotificationsCardProps) => {
  const isMobile = useIsMobile();
  const { notifications = [], isLoading } = useNotifications();

  // Get top 5 pending/overdue notifications sorted by urgency
  const urgentNotifications = notifications
    .filter(n => n.notification_status !== 'submitted' && n.notification_status !== 'cancelled')
    .sort((a, b) => {
      if (!a.submission_deadline) return 1;
      if (!b.submission_deadline) return -1;
      return getDaysUntilDeadline(a.submission_deadline) - getDaysUntilDeadline(b.submission_deadline);
    })
    .slice(0, 5);

  const overdueCount = notifications.filter(
    n => n.submission_deadline && getDaysUntilDeadline(n.submission_deadline) < 0 && n.notification_status !== 'submitted'
  ).length;

  if (isLoading) {
    return (
      <Card className="bg-card border-elec-yellow/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileWarning className="w-5 h-5 text-primary" />
            Part P Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (urgentNotifications.length === 0) {
    return (
      <Card className="bg-card border-elec-yellow/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileWarning className="w-5 h-5 text-primary" />
            Part P Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mb-3" />
            <p className="text-muted-foreground">All notifications up to date</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate?.('notifications')}
              className="mt-4"
            >
              View All Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-elec-yellow/30">
      <CardHeader className={cn(isMobile && "px-3 pb-2")}>
        <div className="flex items-center justify-between">
          <CardTitle className={cn("flex items-center gap-2", isMobile && "text-sm")}>
            <FileWarning className={cn(isMobile ? "w-4 h-4" : "w-5 h-5", "text-primary")} />
            Part P Notifications
          </CardTitle>
          {overdueCount > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {overdueCount} Overdue
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className={cn(isMobile ? "space-y-2 px-3 pb-3" : "space-y-3")}>
        {urgentNotifications.map(notification => {
          const daysRemaining = notification.submission_deadline 
            ? getDaysUntilDeadline(notification.submission_deadline)
            : null;
          const isOverdue = daysRemaining !== null && daysRemaining < 0;
          const isUrgent = daysRemaining !== null && daysRemaining <= 2 && !isOverdue;

          return (
            <div
              key={notification.id}
              className={cn(
                'rounded-lg border transition-colors cursor-pointer hover:bg-muted/50 active:scale-[0.98] touch-manipulation',
                isOverdue ? 'border-red-500/30 bg-red-500/5' : 
                isUrgent ? 'border-orange-500/30 bg-orange-500/5' : 
                'border-elec-yellow/30 hover:border-elec-yellow/50',
                isMobile ? "p-2.5" : "p-3"
              )}
              onClick={() => onNavigate?.('notifications')}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {isOverdue ? (
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    ) : isUrgent ? (
                      <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    ) : null}
                    <span className="font-medium text-sm truncate">
                      {notification.work_type}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {notification.reports?.certificate_number || notification.report_id}
                  </p>
                  {notification.submission_deadline && (
                    <p className={cn(
                      'text-xs font-medium mt-1',
                      isOverdue ? 'text-red-500' : isUrgent ? 'text-orange-500' : 'text-muted-foreground'
                    )}>
                      {formatDeadlineStatus(notification.submission_deadline)}
                    </p>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </div>
            </div>
          );
        })}

        <Button
          variant="outline"
          className={cn("w-full", isMobile ? "mt-3" : "mt-4")}
          onClick={() => onNavigate?.('notifications')}
        >
          View All Notifications
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};
