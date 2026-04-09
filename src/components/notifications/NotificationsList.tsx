import { useState, useMemo } from 'react';
import { NotificationCard } from './NotificationCard';
import { NotificationFilters } from './NotificationFilters';
import { Notification, NotificationStatus } from '@/hooks/useNotifications';
import { getDaysUntilDeadline } from '@/utils/notificationHelper';
// Icons removed — clean text-only design

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

  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (n) =>
          n.work_type?.toLowerCase().includes(query) ||
          n.building_control_authority?.toLowerCase().includes(query) ||
          n.reports?.certificate_number?.toLowerCase().includes(query) ||
          n.reports?.client_name?.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((n) => n.notification_status === statusFilter);
    }

    if (reportTypeFilter !== 'all') {
      filtered = filtered.filter((n) => n.reports?.report_type === reportTypeFilter);
    }

    return filtered.sort((a, b) => {
      if (!a.submission_deadline) return 1;
      if (!b.submission_deadline) return -1;
      const daysA = getDaysUntilDeadline(a.submission_deadline);
      const daysB = getDaysUntilDeadline(b.submission_deadline);
      if (daysA < 0 && daysB >= 0) return -1;
      if (daysB < 0 && daysA >= 0) return 1;
      return daysA - daysB;
    });
  }, [notifications, searchQuery, statusFilter, reportTypeFilter]);

  const groupedNotifications = useMemo(() => {
    const groups = {
      overdue: [] as Notification[],
      urgent: [] as Notification[],
      pending: [] as Notification[],
      'in-progress': [] as Notification[],
      submitted: [] as Notification[],
      cancelled: [] as Notification[],
    };

    filteredNotifications.forEach((notification) => {
      if (notification.submission_deadline && getDaysUntilDeadline(notification.submission_deadline) < 0) {
        groups.overdue.push(notification);
      } else {
        const status = notification.notification_status;
        if (status in groups) groups[status].push(notification);
      }
    });

    return groups;
  }, [filteredNotifications]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setReportTypeFilter('all');
  };

  // ── Empty state ──
  if (notifications.length === 0) {
    return (
      <div className="relative overflow-hidden card-surface-interactive rounded-2xl p-6">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500/50 via-emerald-500/25 to-transparent" />
        <div className="relative z-10">
          <div className="text-center mb-6">
            <p className="text-base font-bold text-emerald-400 mb-1">All Clear</p>
            <p className="text-[12px] text-white max-w-sm mx-auto">
              No Part P notifications pending. When you complete notifiable work, it will appear here.
            </p>
          </div>

          <div className="border-b border-white/[0.06] pb-1 mb-3">
            <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
            <p className="text-xs font-medium text-white uppercase tracking-wider text-center">How It Works</p>
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            {[
              { step: '1', title: 'Create EIC or Minor Works', desc: 'Tick "Part P notification required"', accent: 'from-elec-yellow via-amber-400 to-orange-400' },
              { step: '2', title: 'Generate Certificate', desc: 'Notification auto-created with 30-day deadline', accent: 'from-blue-500 via-blue-400 to-cyan-400' },
              { step: '3', title: 'Submit to Scheme / Building Control', desc: 'Track submissions and stay compliant', accent: 'from-emerald-500 via-green-400 to-teal-400' },
            ].map(({ step, title, desc, accent }) => (
              <div key={title} className="relative overflow-hidden card-surface-interactive rounded-xl">
                <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent} opacity-30`} />
                <div className="relative z-10 flex items-center gap-3 p-3">
                  <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <span className="text-[11px] font-bold text-white">{step}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{title}</p>
                    <p className="text-[11px] text-white">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Group renderer ──
  const renderGroup = (title: string, items: Notification[], color?: string) => {
    if (items.length === 0) return null;
    return (
      <div>
        <h3 className={`text-xs font-medium uppercase tracking-wider mb-3 px-0.5 ${color || 'text-white'}`}>
          {title} ({items.length})
        </h3>
        <div className="space-y-3">
          {items.map((notification) => (
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
    );
  };

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="card-surface p-4 space-y-3">
        <NotificationFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          reportTypeFilter={reportTypeFilter}
          onReportTypeFilterChange={setReportTypeFilter}
          onClearFilters={handleClearFilters}
        />
        <p className="text-[11px] text-white px-0.5">
          Showing {filteredNotifications.length} of {notifications.length} notification{notifications.length === 1 ? '' : 's'}
        </p>
      </div>

      {/* Results */}
      {filteredNotifications.length === 0 ? (
        <div className="card-surface p-8 text-center">
          <p className="text-white mb-2">No notifications match your filters.</p>
          <button onClick={handleClearFilters} className="text-elec-yellow hover:underline text-sm touch-manipulation">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {renderGroup('Overdue', groupedNotifications.overdue, 'text-red-400')}
          {renderGroup('Pending', groupedNotifications.pending)}
          {renderGroup('In Progress', groupedNotifications['in-progress'])}
          {renderGroup('Submitted', groupedNotifications.submitted, 'text-emerald-400')}
        </div>
      )}
    </div>
  );
};
