import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
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

  // Nothing inside 90 days should never mean an empty card — surface whatever
  // is NEXT on the book, however far out, so the forward pipeline is visible.
  const now = Date.now();
  const nextDue = [...reminders]
    .filter((r) => new Date(r.expiry_date).getTime() > now)
    .sort((a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime())
    .slice(0, 3);

  const handleViewAll = () => navigate('/certificate-expiry');
  const handleReminderClick = (reportId: string) =>
    navigate(`/certificate-expiry?highlight=${reportId}`);

  if (isLoading) {
    return (
      <div>
        <div className="flex items-baseline gap-2.5 mb-4">
          <span className="text-base font-semibold tracking-tight text-white">
            Expiring certificates
          </span>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-20 w-full rounded-2xl bg-white/[0.05]" />
          <Skeleton className="h-20 w-full rounded-2xl bg-white/[0.05]" />
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reminderRow = (reminder: any, index: number, quiet = false) => {
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
        role="button"
        tabIndex={0}
        onClick={() => handleReminderClick(reminder.report_id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleReminderClick(reminder.report_id);
          }
        }}
        className={cn(
          'flex items-center gap-3.5 p-4 rounded-2xl cursor-pointer border',
          'transition-all duration-200 touch-manipulation active:scale-[0.98]',
          isExpired && !quiet
            ? 'bg-red-500/[0.07] border-red-500/20 hover:bg-red-500/[0.1]'
            : isCritical && !quiet
              ? 'bg-orange-500/[0.07] border-orange-500/20 hover:bg-orange-500/[0.1]'
              : 'bg-gradient-to-b from-white/[0.07] to-white/[0.03] border-white/[0.12] hover:border-white/[0.22]'
        )}
      >
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold tracking-tight text-white truncate">
            {reminder.customer?.name || reminder.client_name || 'Unknown client'}
          </h4>
          <p className="text-[12.5px] text-white/60 truncate mt-0.5">
            {reminder.installation_address || 'No address'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <span className="text-[12px] text-white/60 tabular-nums">
            {format(new Date(reminder.expiry_date), 'dd MMM yy')}
          </span>
          <span
            className={cn(
              'text-[10px] font-bold px-2 py-1 rounded-lg',
              isExpired
                ? 'bg-red-500/20 text-red-400'
                : isCritical
                  ? 'bg-orange-500/20 text-orange-400'
                  : quiet
                    ? 'bg-white/[0.08] text-white/70'
                    : 'bg-amber-500/20 text-amber-300'
            )}
          >
            {isExpired ? 'Expired' : statusText}
          </span>
        </div>
      </motion.div>
    );
  };

  if (sortedReminders.length === 0) {
    return (
      <div>
        <div className="flex items-baseline gap-2.5 mb-4">
          <span className="text-base font-semibold tracking-tight text-white">
            Expiring certificates
          </span>
          <span className="text-[12px] font-semibold text-green-400">
            Nothing due in 90 days
          </span>
        </div>

        {nextDue.length > 0 ? (
          <div className="space-y-2">
            <p className="text-[12px] text-white/60 px-0.5">Next on the book</p>
            <AnimatePresence mode="popLayout">
              {nextDue.map((r, i) => reminderRow(r, i, true))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.03] border border-white/[0.12]">
            <p className="text-sm font-semibold text-white">No re-inspection dates on file</p>
            <p className="text-[12.5px] text-white/60 mt-0.5">
              Set Next Inspection Due when issuing certificates and your renewal pipeline appears
              here.
            </p>
          </div>
        )}
      </div>
    );
  }

  const expiredCount = sortedReminders.filter(
    (r) => getExpiryUrgency(r.expiry_date) === 'expired'
  ).length;

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-baseline gap-2.5">
          <span className="text-base font-semibold tracking-tight text-white">
            Expiring certificates
          </span>
          {expiredCount > 0 ? (
            <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-red-500/15 text-red-400">
              {expiredCount} expired
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-amber-500/15 text-amber-300">
              {sortedReminders.length} upcoming
            </span>
          )}
        </div>
        {upcomingReminders.length > 3 && (
          <button
            className="text-sm font-semibold text-elec-yellow touch-manipulation h-11 flex items-center active:scale-[0.97]"
            onClick={handleViewAll}
          >
            View all
          </button>
        )}
      </div>

      {/* Reminders */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {sortedReminders.slice(0, 3).map((r, i) => reminderRow(r, i))}
        </AnimatePresence>
      </div>
    </div>
  );
};
