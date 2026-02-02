import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
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
  const handleReminderClick = (reportId: string) => navigate(`/certificate-expiry?highlight=${reportId}`);

  if (isLoading) {
    return (
      <div className="bg-[#242428] border border-elec-yellow/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-4 w-4 text-elec-yellow" />
          <span className="text-sm font-semibold text-elec-yellow">Expiring Certificates</span>
        </div>
        <Skeleton className="h-16 w-full rounded-xl bg-black/40 mb-2" />
        <Skeleton className="h-16 w-full rounded-xl bg-black/40" />
      </div>
    );
  }

  if (sortedReminders.length === 0) {
    return (
      <div className="bg-[#242428] border border-elec-yellow/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="h-4 w-4 text-green-400" />
          <span className="text-sm font-semibold text-elec-yellow">Expiring Certificates</span>
        </div>
        <div className="text-center py-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-green-500/15 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-green-400" />
          </div>
          <p className="text-sm text-green-400 font-medium mb-1">All Up to Date</p>
          <p className="text-xs text-white/40">No certificates expiring in 90 days</p>
        </div>
      </div>
    );
  }

  const expiredCount = sortedReminders.filter(r => getExpiryUrgency(r.expiry_date) === 'expired').length;

  return (
    <div className={cn(
      "bg-[#242428] border rounded-2xl overflow-hidden",
      expiredCount > 0 ? "border-red-500/30" : "border-elec-yellow/30"
    )}>
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {expiredCount > 0 ? (
              <AlertCircle className="h-4 w-4 text-red-400" />
            ) : (
              <Calendar className="h-4 w-4 text-elec-yellow" />
            )}
            <span className="text-sm font-semibold text-elec-yellow">Expiring Certificates</span>
          </div>
          {expiredCount > 0 ? (
            <span className="text-[10px] font-medium px-2 py-1 rounded-lg bg-red-500/20 text-red-400">
              {expiredCount} expired
            </span>
          ) : (
            <span className="text-[10px] font-medium px-2 py-1 rounded-lg bg-amber-500/20 text-amber-400">
              {sortedReminders.length} upcoming
            </span>
          )}
        </div>
      </div>

      {/* Reminders List */}
      <div className="px-3 pb-3 space-y-2">
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
                  "flex items-center gap-3 p-3 rounded-xl cursor-pointer",
                  "active:scale-[0.98] transition-all touch-manipulation",
                  isExpired ? 'bg-red-500/10 hover:bg-red-500/15' :
                  isCritical ? 'bg-orange-500/10 hover:bg-orange-500/15' :
                  'bg-black/40 hover:bg-black/50'
                )}
                onClick={() => handleReminderClick(reminder.report_id)}
              >
                <div className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                  isExpired ? 'bg-red-500/15' : isCritical ? 'bg-orange-500/15' : 'bg-elec-yellow/15'
                )}>
                  <Calendar className={cn(
                    "h-4 w-4",
                    isExpired ? 'text-red-400' : isCritical ? 'text-orange-400' : 'text-elec-yellow'
                  )} />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white truncate">
                    {reminder.customer?.name || reminder.client_name || 'Unknown Client'}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-white/40 mt-0.5">
                    <span className="truncate">{reminder.installation_address || 'No address'}</span>
                    <span>•</span>
                    <span>{format(new Date(reminder.expiry_date), 'dd MMM')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={cn(
                    'text-[10px] font-medium px-2 py-1 rounded-lg',
                    isExpired ? 'bg-red-500/20 text-red-400' :
                    isCritical ? 'bg-orange-500/20 text-orange-400' :
                    'bg-amber-500/20 text-amber-400'
                  )}>
                    {isExpired ? 'Expired' : statusText}
                  </span>
                  <ChevronRight className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isExpired ? 'text-red-400/40' : isCritical ? 'text-orange-400/40' : 'text-elec-yellow/40'
                  )} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {upcomingReminders.length > 3 && (
        <div className="px-3 pb-3">
          <button
            className="w-full py-2 text-xs text-elec-yellow/60 hover:text-elec-yellow transition-colors"
            onClick={handleViewAll}
          >
            View All ({upcomingReminders.length})
          </button>
        </div>
      )}
    </div>
  );
};
