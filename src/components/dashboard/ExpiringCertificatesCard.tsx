import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useExpiryReminders } from '@/hooks/useExpiryReminders';
import { formatExpiryStatus, getExpiryUrgency, filterByTimeRange } from '@/utils/expiryHelper';
import { useNavigate } from 'react-router-dom';
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
  const handleReminderClick = (reportId: string) =>
    navigate(`/certificate-expiry?highlight=${reportId}`);

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <Calendar className="h-5 w-5 text-elec-yellow" />
          <span className="text-base font-semibold text-white">Expiring Certificates</span>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-20 w-full rounded-2xl bg-white/[0.03]" />
          <Skeleton className="h-20 w-full rounded-2xl bg-white/[0.03]" />
        </div>
      </div>
    );
  }

  if (sortedReminders.length === 0) {
    return (
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <CheckCircle2 className="h-5 w-5 text-green-400" />
          <span className="text-base font-semibold text-white">Expiring Certificates</span>
        </div>
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.06] border border-white/[0.08]">
          <div className="w-11 h-11 rounded-xl bg-green-500/12 flex items-center justify-center flex-shrink-0">
            <Calendar className="h-5 w-5 text-green-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-green-400">All Up to Date</p>
            <p className="text-sm text-white mt-0.5">No certificates expiring in 90 days</p>
          </div>
        </div>
      </div>
    );
  }

  const expiredCount = sortedReminders.filter(
    (r) => getExpiryUrgency(r.expiry_date) === 'expired'
  ).length;

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          {expiredCount > 0 ? (
            <AlertCircle className="h-5 w-5 text-red-400" />
          ) : (
            <Calendar className="h-5 w-5 text-elec-yellow" />
          )}
          <span className="text-base font-semibold text-white">Expiring Certificates</span>
          {expiredCount > 0 ? (
            <span className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-red-500/15 text-red-400">
              {expiredCount} expired
            </span>
          ) : (
            <span className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-amber-500/15 text-amber-400">
              {sortedReminders.length} upcoming
            </span>
          )}
        </div>
        {upcomingReminders.length > 3 && (
          <button
            className="text-sm font-medium text-elec-yellow hover:underline touch-manipulation h-11 flex items-center"
            onClick={handleViewAll}
          >
            View All
          </button>
        )}
      </div>

      {/* Reminders List */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {sortedReminders.slice(0, 3).map((reminder, index) => {
            const urgency = getExpiryUrgency(reminder.expiry_date);
            const statusText = formatExpiryStatus(reminder.expiry_date);
            const isExpired = urgency === 'expired';
            const isCritical = urgency === 'critical';

            return (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.03 }}
                className={cn(
                  'flex items-center gap-3.5 p-4 rounded-2xl cursor-pointer',
                  'border transition-all touch-manipulation active:scale-[0.98]',
                  isExpired
                    ? 'bg-red-500/8 border-red-500/15 hover:bg-red-500/12'
                    : isCritical
                      ? 'bg-orange-500/8 border-orange-500/15 hover:bg-orange-500/12'
                      : 'bg-white/[0.06] border-white/[0.08] hover:bg-white/[0.09]'
                )}
                onClick={() => handleReminderClick(reminder.report_id)}
              >
                <div
                  className={cn(
                    'flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center',
                    isExpired
                      ? 'bg-red-500/15'
                      : isCritical
                        ? 'bg-orange-500/15'
                        : 'bg-elec-yellow/12'
                  )}
                >
                  <Calendar
                    className={cn(
                      'h-5 w-5',
                      isExpired
                        ? 'text-red-400'
                        : isCritical
                          ? 'text-orange-400'
                          : 'text-elec-yellow'
                    )}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate">
                    {reminder.customer?.name || reminder.client_name || 'Unknown Client'}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-white mt-0.5">
                    <span className="truncate">
                      {reminder.installation_address || 'No address'}
                    </span>
                    <span>·</span>
                    <span className="flex-shrink-0">{format(new Date(reminder.expiry_date), 'dd MMM')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={cn(
                      'text-[10px] font-semibold px-2 py-1 rounded-lg',
                      isExpired
                        ? 'bg-red-500/20 text-red-400'
                        : isCritical
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'bg-amber-500/20 text-amber-400'
                    )}
                  >
                    {isExpired ? 'Expired' : statusText}
                  </span>
                  <ChevronRight
                    className={cn(
                      'h-5 w-5',
                      isExpired
                        ? 'text-red-400'
                        : isCritical
                          ? 'text-orange-400'
                          : 'text-elec-yellow'
                    )}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
