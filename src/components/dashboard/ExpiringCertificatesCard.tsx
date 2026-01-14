import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, Calendar, ChevronRight, User } from 'lucide-react';
import { useExpiryReminders } from '@/hooks/useExpiryReminders';
import { formatExpiryStatus, getExpiryUrgency, getExpiryColorClasses, filterByTimeRange } from '@/utils/expiryHelper';
import { useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export const ExpiringCertificatesCard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { reminders, isLoading } = useExpiryReminders();

  // Filter to show only expiring in next 90 days or overdue
  const upcomingReminders = filterByTimeRange(reminders, '90');
  
  // Sort by urgency (expired first, then by days remaining)
  const sortedReminders = [...upcomingReminders]
    .sort((a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime())
    .slice(0, 5);

  const handleViewAll = () => {
    navigate('/certificate-expiry');
  };

  const handleReminderClick = (reportId: string) => {
    navigate(`/certificate-expiry?highlight=${reportId}`);
  };

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-neutral-900 to-neutral-800 border-elec-yellow/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Calendar className="h-5 w-5" />
            Expiring Certificates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-pulse text-neutral-400">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (sortedReminders.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-neutral-900 to-neutral-800 border-elec-yellow/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Calendar className="h-5 w-5" />
            Expiring Certificates
          </CardTitle>
          <CardDescription className="text-neutral-400">
            No certificates expiring in the next 90 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-green-500/10 p-3 mb-3">
              <Calendar className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-neutral-400 text-sm">All certificates are up to date</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-neutral-900 to-neutral-800 border-elec-yellow/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className={cn("flex items-center gap-2 text-foreground", isMobile && "text-sm")}>
              <Calendar className={cn(isMobile ? "h-4 w-4" : "h-5 w-5")} />
              Expiring Certificates
            </CardTitle>
            <CardDescription className={cn("text-neutral-400", isMobile && "text-xs")}>
              {sortedReminders.length} certificate{sortedReminders.length === 1 ? '' : 's'} expiring soon
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleViewAll}
            className="text-elec-yellow hover:text-elec-yellow/90 hover:bg-elec-yellow/10"
          >
            {isMobile ? 'All' : 'View All'}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn(isMobile ? "space-y-2" : "space-y-3")}>
          {sortedReminders.map((reminder) => {
            const urgency = getExpiryUrgency(reminder.expiry_date);
            const colors = getExpiryColorClasses(urgency);
            const statusText = formatExpiryStatus(reminder.expiry_date);

            return (
              <button
                key={reminder.id}
                onClick={() => handleReminderClick(reminder.report_id)}
                className={cn(
                  `w-full rounded-lg border ${colors.border} ${colors.bg} hover:opacity-80 transition-all text-left active:scale-[0.98] touch-manipulation`,
                  isMobile ? "p-2.5" : "p-3"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {reminder.customer ? (
                        <Link
                          to={`/customers/${reminder.customer.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-medium hover:bg-elec-yellow/30 transition-colors shrink-0"
                        >
                          <User className="h-3 w-3" />
                          {reminder.customer.name}
                        </Link>
                      ) : (
                        <span className="font-medium text-foreground text-sm truncate">
                          {reminder.client_name || 'Unknown Client'}
                        </span>
                      )}
                      <Badge className={`${colors.badge} text-xs shrink-0`}>
                        {urgency === 'expired' ? 'Expired' : statusText}
                      </Badge>
                    </div>
                    <p className="text-xs text-neutral-400 truncate mb-1">
                      {reminder.installation_address || 'No address'}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-neutral-500">
                      <span>Cert: {reminder.certificate_number}</span>
                      <span>Expires: {format(new Date(reminder.expiry_date), 'dd MMM yyyy')}</span>
                    </div>
                  </div>
                  {urgency === 'expired' && (
                    <AlertCircle className={cn(isMobile ? "h-4 w-4" : "h-5 w-5", "text-red-500 shrink-0 mt-1")} />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <Button
          onClick={handleViewAll}
          className={cn("w-full bg-elec-yellow hover:bg-elec-yellow/90 text-neutral-900 font-semibold", isMobile ? "mt-3" : "mt-4")}
        >
          Manage All Expiring Certificates
        </Button>
      </CardContent>
    </Card>
  );
};
