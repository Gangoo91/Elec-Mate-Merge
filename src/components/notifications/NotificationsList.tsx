import { useState, useMemo } from 'react';
import { NotificationCard } from './NotificationCard';
import { NotificationFilters } from './NotificationFilters';
import { Notification, NotificationStatus } from '@/hooks/useNotifications';
import { getDaysUntilDeadline } from '@/utils/notificationHelper';
import { FileCheck, ClipboardList, CheckCircle2 } from 'lucide-react';

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
      <div className="card-surface p-6 sm:p-8">
        <div className="text-center mb-8">
          <p className="text-lg font-semibold text-white mb-1">All Clear</p>
          <p className="text-[13px] text-white max-w-sm mx-auto">
            No Part P notifications pending. When you complete notifiable work, it will appear here.
          </p>
        </div>

        <p className="text-xs font-medium text-white uppercase tracking-wider text-center mb-4">
          How Part P Tracking Works
        </p>

        <div className="space-y-2 max-w-md mx-auto">
          {[
            { icon: ClipboardList, title: 'Create EIC or Minor Works', desc: 'Tick "Part P notification required"', accent: 'from-elec-yellow via-amber-400 to-orange-400', iconColor: 'text-elec-yellow', iconBg: 'bg-elec-yellow/10 border border-elec-yellow/20' },
            { icon: FileCheck, title: 'Generate Certificate', desc: 'Notification auto-created with 30-day deadline', accent: 'from-blue-500 via-blue-400 to-cyan-400', iconColor: 'text-blue-400', iconBg: 'bg-blue-500/10 border border-blue-500/20' },
            { icon: CheckCircle2, title: 'Submit to Scheme / Building Control', desc: 'Track submissions and stay compliant', accent: 'from-emerald-500 via-green-400 to-teal-400', iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/10 border border-emerald-500/20' },
          ].map(({ icon: Icon, title, desc, iconColor, iconBg, accent }) => (
            <div key={title} className="relative overflow-hidden card-surface">
              <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent} opacity-30`} />
              <div className="flex items-center gap-3 p-3.5">
                <div className={`p-2 rounded-xl flex-shrink-0 ${iconBg}`}>
                  <Icon className={`w-4 h-4 ${iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="text-xs text-white">{desc}</p>
                </div>
              </div>
            </div>
          ))}
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
