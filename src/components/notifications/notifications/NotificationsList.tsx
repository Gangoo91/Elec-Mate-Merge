import { useState, useMemo } from 'react';
import { NotificationCard } from './NotificationCard';
import { NotificationFilters } from './NotificationFilters';
import { Notification, NotificationStatus } from '@/hooks/useNotifications';
import { getDaysUntilDeadline } from '@/utils/notificationHelper';
import { AlertCircle } from 'lucide-react';

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
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
        <p className="text-muted-foreground">
          Part P notifications will appear here when you complete notifiable electrical work.
        </p>
      </div>
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
