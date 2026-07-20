import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { NotificationCard } from './NotificationCard';
import { NotificationFilters } from './NotificationFilters';
import { Notification, NotificationStatus } from '@/hooks/useNotifications';
import { getDaysUntilDeadline } from '@/utils/notificationHelper';

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
  const navigate = useNavigate();
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
      const status = notification.notification_status;
      // A resolved item never counts as overdue, even if its deadline has passed.
      if (status === 'submitted' || status === 'cancelled') {
        groups[status].push(notification);
      } else if (notification.submission_deadline && getDaysUntilDeadline(notification.submission_deadline) < 0) {
        groups.overdue.push(notification);
      } else if (status in groups) {
        groups[status].push(notification);
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
      <div className="rounded-2xl border border-white/[0.09] bg-white/[0.02] p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden />
            <p className="text-[15px] font-semibold tracking-tight text-white">Nothing to notify</p>
          </div>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/80 max-w-sm mx-auto">
            When you complete notifiable work, it lands here with a 30-day deadline to submit.
          </p>
          <button
            type="button"
            onClick={() => navigate('/electrician/inspection-testing?section=certificates')}
            className="mt-4 inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation transition-transform active:scale-[0.98]"
          >
            Create a notifiable cert
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="max-w-md mx-auto space-y-2 text-left">
          {[
            { step: '1', title: 'Create an EIC or Minor Works', desc: 'Tick "Part P notification required"' },
            { step: '2', title: 'Generate the certificate', desc: 'A notification is created with a 30-day deadline' },
            { step: '3', title: 'Submit to your scheme or council', desc: 'Tick it off here to stay compliant' },
          ].map(({ step, title, desc }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-[11px] font-semibold tabular-nums text-white/60">
                {step}
              </span>
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium text-white">{title}</p>
                <p className="text-[12px] text-white/75">{desc}</p>
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
        <h3 className={`flex items-baseline gap-2 text-[13px] font-semibold tracking-tight mb-2.5 px-0.5 ${color || 'text-white'}`}>
          {title}
          <span className="text-[11.5px] font-normal tabular-nums text-white/75">{items.length}</span>
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

  // Only surface search + filters once the list is long enough to need them —
  // a full filter bar over one notification is pure noise.
  const showFilters = notifications.length > 4;

  return (
    <div className="space-y-5">
      {showFilters && (
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
          <p className="text-[11px] text-white/75 px-0.5">
            Showing {filteredNotifications.length} of {notifications.length} notification{notifications.length === 1 ? '' : 's'}
          </p>
        </div>
      )}

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
