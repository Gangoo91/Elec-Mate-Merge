import { Button } from '@/components/ui/button';
import { AlertCircle, Calendar, ChevronRight, User } from 'lucide-react';
import { useExpiryReminders } from '@/hooks/useExpiryReminders';
import { formatExpiryStatus, getExpiryUrgency, filterByTimeRange } from '@/utils/expiryHelper';
import { useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export const ExpiringCertificatesCard = () => {
  const navigate = useNavigate();
  const { reminders, isLoading } = useExpiryReminders();

  const upcomingReminders = filterByTimeRange(reminders, '90');
  const sortedReminders = [...upcomingReminders]
    .sort((a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime())
    .slice(0, 5);

  const handleViewAll = () => navigate('/certificate-expiry');
  const handleReminderClick = (reportId: string) => navigate(`/certificate-expiry?highlight=${reportId}`);

  if (isLoading) {
    return (
      <div className="bg-card border border-elec-yellow/20 rounded-xl overflow-hidden">
        <div className="p-3 border-b border-elec-yellow/10">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-semibold text-white">Expiring Certificates</span>
          </div>
        </div>
        <div className="p-3 flex items-center justify-center py-10">
          <div className="w-5 h-5 border-2 border-elec-yellow border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (sortedReminders.length === 0) {
    return (
      <div className="bg-card border border-elec-yellow/20 rounded-xl overflow-hidden">
        <div className="p-3 border-b border-elec-yellow/10">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-400" />
            <span className="text-sm font-semibold text-white">Expiring Certificates</span>
          </div>
        </div>
        <div className="p-3">
          <div className="py-6 text-center">
            <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-green-500/15 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-sm font-medium text-green-400 mb-1">All Up to Date</p>
            <p className="text-xs text-white/40">No certificates expiring in 90 days</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-elec-yellow/20 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-elec-yellow/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-semibold text-white">Expiring Certificates</span>
            <span className="text-xs text-white/40">({sortedReminders.length})</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleViewAll}
            className="text-elec-yellow/60 hover:text-elec-yellow hover:bg-elec-yellow/10 h-7 px-2 text-xs font-medium touch-manipulation"
          >
            View All <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>

      {/* Reminders List */}
      <div className="p-2 space-y-1.5">
        {sortedReminders.map((reminder) => {
          const urgency = getExpiryUrgency(reminder.expiry_date);
          const statusText = formatExpiryStatus(reminder.expiry_date);
          const isExpired = urgency === 'expired';
          const isCritical = urgency === 'critical';

          return (
            <button
              key={reminder.id}
              onClick={() => handleReminderClick(reminder.report_id)}
              className={cn(
                'w-full rounded-lg border p-2.5 text-left touch-manipulation transition-all',
                'active:scale-[0.98]',
                isExpired ? 'border-red-500/30 bg-red-500/5' :
                isCritical ? 'border-orange-500/30 bg-orange-500/5' :
                'border-elec-yellow/10 bg-elec-yellow/5'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  {/* Customer/Client */}
                  <div className="flex items-center gap-2 mb-1">
                    {reminder.customer ? (
                      <Link
                        to={`/customers/${reminder.customer.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-elec-yellow/15 text-elec-yellow text-[10px] font-medium hover:bg-elec-yellow/25 transition-colors"
                      >
                        <User className="h-2.5 w-2.5" />
                        {reminder.customer.name}
                      </Link>
                    ) : (
                      <span className="text-xs font-medium text-white truncate">
                        {reminder.client_name || 'Unknown Client'}
                      </span>
                    )}
                    <span className={cn(
                      'text-[9px] font-medium px-1.5 py-0.5 rounded-full',
                      isExpired ? 'bg-red-500/20 text-red-400' :
                      isCritical ? 'bg-orange-500/20 text-orange-400' :
                      'bg-elec-yellow/20 text-elec-yellow'
                    )}>
                      {isExpired ? 'Expired' : statusText}
                    </span>
                  </div>

                  {/* Address */}
                  <p className="text-[10px] text-white/40 truncate mb-0.5">
                    {reminder.installation_address || 'No address'}
                  </p>

                  {/* Cert & Expiry */}
                  <div className="flex items-center gap-2 text-[10px] text-white/40">
                    <span className="font-mono">{reminder.certificate_number}</span>
                    <span>·</span>
                    <span>Expires {format(new Date(reminder.expiry_date), 'dd MMM yyyy')}</span>
                  </div>
                </div>

                {isExpired && (
                  <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Manage All Button */}
      <div className="p-2 pt-0">
        <Button
          onClick={handleViewAll}
          className="w-full bg-elec-yellow/15 border border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/25 font-medium h-9 text-sm touch-manipulation"
        >
          Manage Expiring Certificates
        </Button>
      </div>
    </div>
  );
};
