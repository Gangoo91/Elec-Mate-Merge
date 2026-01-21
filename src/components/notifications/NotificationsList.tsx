import { useState, useMemo } from 'react';
import { NotificationCard } from './NotificationCard';
import { NotificationFilters } from './NotificationFilters';
import { Notification, NotificationStatus } from '@/hooks/useNotifications';
import { getDaysUntilDeadline } from '@/utils/notificationHelper';
import { Bell, FileCheck, ClipboardList, CheckCircle2, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface NotificationsListProps {
  notifications: Notification[];
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
  onViewDetails: (notification: Notification) => void;
  onViewCertificate: (reportId: string, reportType: string) => void;
  showNiceic?: boolean;
  showNapit?: boolean;
}

export const NotificationsList = ({
  notifications,
  onUpdate,
  onDelete,
  onViewDetails,
  onViewCertificate,
  showNiceic = true,
  showNapit = true,
}: NotificationsListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<NotificationStatus | 'all'>('all');
  const [reportTypeFilter, setReportTypeFilter] = useState('all');

  // Filter and sort notifications
  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(n =>
        n.work_type?.toLowerCase().includes(query) ||
        n.building_control_authority?.toLowerCase().includes(query) ||
        n.reports?.certificate_number?.toLowerCase().includes(query) ||
        n.reports?.client_name?.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(n => n.notification_status === statusFilter);
    }

    // Apply report type filter
    if (reportTypeFilter !== 'all') {
      filtered = filtered.filter(n => n.reports?.report_type === reportTypeFilter);
    }

    // Sort by deadline (overdue first, then by date)
    return filtered.sort((a, b) => {
      if (!a.submission_deadline) return 1;
      if (!b.submission_deadline) return -1;

      const daysA = getDaysUntilDeadline(a.submission_deadline);
      const daysB = getDaysUntilDeadline(b.submission_deadline);

      // Overdue items first
      if (daysA < 0 && daysB >= 0) return -1;
      if (daysB < 0 && daysA >= 0) return 1;

      // Then by urgency
      return daysA - daysB;
    });
  }, [notifications, searchQuery, statusFilter, reportTypeFilter]);

  // Group by status
  const groupedNotifications = useMemo(() => {
    const groups = {
      overdue: [] as Notification[],
      urgent: [] as Notification[],
      pending: [] as Notification[],
      'in-progress': [] as Notification[],
      submitted: [] as Notification[],
      cancelled: [] as Notification[],
    };

    filteredNotifications.forEach(notification => {
      // Check if overdue
      if (notification.submission_deadline && getDaysUntilDeadline(notification.submission_deadline) < 0) {
        groups.overdue.push(notification);
      } else {
        const status = notification.notification_status;
        if (status in groups) {
          groups[status].push(notification);
        }
      }
    });

    return groups;
  }, [filteredNotifications]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setReportTypeFilter('all');
  };

  if (notifications.length === 0) {
    return (
      <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40">
        <CardContent className="py-10">
          {/* Animated Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Bell className="w-10 h-10 text-primary/60" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-center mb-2">All Clear!</h3>
          <p className="text-muted-foreground text-center text-sm mb-8 max-w-sm mx-auto">
            No Part P notifications pending. When you complete notifiable electrical work, it will appear here.
          </p>

          {/* How it works */}
          <div className="max-w-md mx-auto">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center mb-4">
              How Part P Tracking Works
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-card/50 rounded-xl border border-border/50">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Create EIC or Minor Works</p>
                  <p className="text-xs text-muted-foreground">Tick "Part P notification required"</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-card/50 rounded-xl border border-border/50">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Generate Certificate</p>
                  <p className="text-xs text-muted-foreground">Notification auto-created with 30-day deadline</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-card/50 rounded-xl border border-border/50">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Submit to Scheme/Building Control</p>
                  <p className="text-xs text-muted-foreground">Track submissions & stay compliant</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <NotificationFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        reportTypeFilter={reportTypeFilter}
        onReportTypeFilterChange={setReportTypeFilter}
        onClearFilters={handleClearFilters}
      />

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredNotifications.length} of {notifications.length} notification{notifications.length === 1 ? '' : 's'}
      </div>

      {/* Grouped Lists */}
      {filteredNotifications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No notifications match your filters.</p>
          <button onClick={handleClearFilters} className="text-primary hover:underline mt-2">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {groupedNotifications.overdue.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-red-500 mb-3">Overdue ({groupedNotifications.overdue.length})</h3>
              <div className="space-y-3">
                {groupedNotifications.overdue.map(notification => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onViewDetails={onViewDetails}
                    onViewCertificate={onViewCertificate}
                    showNiceic={showNiceic}
                    showNapit={showNapit}
                  />
                ))}
              </div>
            </div>
          )}

          {groupedNotifications.pending.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Pending ({groupedNotifications.pending.length})</h3>
              <div className="space-y-3">
                {groupedNotifications.pending.map(notification => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onViewDetails={onViewDetails}
                    onViewCertificate={onViewCertificate}
                    showNiceic={showNiceic}
                    showNapit={showNapit}
                  />
                ))}
              </div>
            </div>
          )}

          {groupedNotifications['in-progress'].length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">In Progress ({groupedNotifications['in-progress'].length})</h3>
              <div className="space-y-3">
                {groupedNotifications['in-progress'].map(notification => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onViewDetails={onViewDetails}
                    onViewCertificate={onViewCertificate}
                    showNiceic={showNiceic}
                    showNapit={showNapit}
                  />
                ))}
              </div>
            </div>
          )}

          {groupedNotifications.submitted.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Submitted ({groupedNotifications.submitted.length})</h3>
              <div className="space-y-3">
                {groupedNotifications.submitted.map(notification => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onViewDetails={onViewDetails}
                    onViewCertificate={onViewCertificate}
                    showNiceic={showNiceic}
                    showNapit={showNapit}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
