import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useExpiryReminders, ExpiryReminder } from '@/hooks/inspection/useExpiryReminders';
import {
  getDaysUntilExpiry,
  formatExpiryStatus,
  getExpiryUrgency,
} from '@/utils/expiryHelper';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ArrowLeft,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type TimeFilter = 'all' | 'overdue' | '30days' | '60days' | '90days';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const filterOptions: { value: TimeFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'overdue', label: 'Overdue' },
  { value: '30days', label: '30 days' },
  { value: '60days', label: '60 days' },
  { value: '90days', label: '90 days' },
];

export default function CertificateExpiryPage() {
  const navigate = useNavigate();
  const { reminders, isLoading, markAsContacted, markAsBooked, deleteReminder } =
    useExpiryReminders();

  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [selectedReminder, setSelectedReminder] = useState<ExpiryReminder | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredReminders = useMemo(() => {
    if (!reminders) return [];
    return reminders.filter((reminder) => {
      const days = getDaysUntilExpiry(reminder.expiry_date);
      switch (timeFilter) {
        case 'overdue': return days < 0;
        case '30days': return days >= 0 && days <= 30;
        case '60days': return days >= 0 && days <= 60;
        case '90days': return days >= 0 && days <= 90;
        default: return true;
      }
    });
  }, [reminders, timeFilter]);

  const stats = useMemo(() => {
    if (!reminders) return { overdue: 0, urgent: 0, warning: 0, revenue: 0 };
    const overdue = reminders.filter((r) => getDaysUntilExpiry(r.expiry_date) < 0).length;
    const urgent = reminders.filter((r) => {
      const d = getDaysUntilExpiry(r.expiry_date);
      return d >= 0 && d <= 30;
    }).length;
    const warning = reminders.filter((r) => {
      const d = getDaysUntilExpiry(r.expiry_date);
      return d > 30 && d <= 60;
    }).length;
    const revenue = (overdue + urgent) * 250;
    return { overdue, urgent, warning, revenue };
  }, [reminders]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleMarkContacted = async (id: string) => {
    await markAsContacted(id);
    setSelectedReminder(null);
  };

  const handleMarkBooked = async (id: string) => {
    await markAsBooked({ id });
    setSelectedReminder(null);
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      await deleteReminder(deleteConfirmId);
      setDeleteConfirmId(null);
      if (selectedReminder?.id === deleteConfirmId) setSelectedReminder(null);
    }
  };

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case 'expired': return { bg: 'bg-red-500/8', border: 'border-red-500/15', badge: 'bg-red-500/15 text-red-400', dot: 'bg-red-400' };
      case 'critical': return { bg: 'bg-orange-500/8', border: 'border-orange-500/15', badge: 'bg-orange-500/15 text-orange-400', dot: 'bg-orange-400' };
      case 'warning': return { bg: 'bg-amber-500/8', border: 'border-amber-500/15', badge: 'bg-amber-500/15 text-amber-400', dot: 'bg-amber-400' };
      default: return { bg: 'bg-white/[0.04]', border: 'border-white/[0.06]', badge: 'bg-emerald-500/15 text-emerald-400', dot: 'bg-emerald-400' };
    }
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <Zap className="h-4 w-4 text-elec-yellow" />
              </div>
              <h1 className="text-base font-semibold text-white">Expiring Certificates</h1>
            </div>
          </div>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 space-y-5"
      >
        {/* KPI Strip */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => setTimeFilter('overdue')}
            className={cn(
              'flex flex-col items-start justify-center rounded-xl border px-3 py-2 h-14',
              'touch-manipulation active:scale-[0.97] transition-all',
              stats.overdue > 0
                ? 'border-red-500/30 bg-red-500/10'
                : 'border-white/10 bg-white/5'
            )}
          >
            <span className="text-[11px] font-medium text-white leading-tight">Overdue</span>
            <span className={cn('text-base font-bold leading-tight', stats.overdue > 0 ? 'text-red-400' : 'text-white')}>
              {stats.overdue}
            </span>
          </button>
          <button
            onClick={() => setTimeFilter('30days')}
            className={cn(
              'flex flex-col items-start justify-center rounded-xl border px-3 py-2 h-14',
              'touch-manipulation active:scale-[0.97] transition-all',
              stats.urgent > 0
                ? 'border-orange-500/30 bg-orange-500/10'
                : 'border-white/10 bg-white/5'
            )}
          >
            <span className="text-[11px] font-medium text-white leading-tight">Within 30 days</span>
            <span className={cn('text-base font-bold leading-tight', stats.urgent > 0 ? 'text-orange-400' : 'text-white')}>
              {stats.urgent}
            </span>
          </button>
          <button
            onClick={() => setTimeFilter('60days')}
            className={cn(
              'flex flex-col items-start justify-center rounded-xl border px-3 py-2 h-14',
              'touch-manipulation active:scale-[0.97] transition-all',
              stats.warning > 0
                ? 'border-amber-500/30 bg-amber-500/10'
                : 'border-white/10 bg-white/5'
            )}
          >
            <span className="text-[11px] font-medium text-white leading-tight">30-60 days</span>
            <span className={cn('text-base font-bold leading-tight', stats.warning > 0 ? 'text-amber-400' : 'text-white')}>
              {stats.warning}
            </span>
          </button>
          <div className="flex flex-col items-start justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 h-14">
            <span className="text-[11px] font-medium text-white leading-tight">Revenue opportunity</span>
            <span className="text-base font-bold text-emerald-400 leading-tight">
              £{stats.revenue.toLocaleString()}
            </span>
          </div>
        </motion.div>

        {/* Filter pills */}
        <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setTimeFilter(opt.value)}
              className={cn(
                'h-9 px-4 text-xs font-medium rounded-lg touch-manipulation transition-all whitespace-nowrap flex-shrink-0',
                timeFilter === opt.value
                  ? 'bg-elec-yellow/12 text-elec-yellow border border-elec-yellow/20'
                  : 'bg-white/[0.06] text-white border border-white/[0.08]'
              )}
            >
              {opt.label}
            </button>
          ))}
          <span className="flex items-center text-xs text-white pl-1 flex-shrink-0">
            {filteredReminders.length} certificate{filteredReminders.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {/* Certificate list */}
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-20 w-full rounded-2xl bg-white/[0.03]" />
            <Skeleton className="h-20 w-full rounded-2xl bg-white/[0.03]" />
            <Skeleton className="h-20 w-full rounded-2xl bg-white/[0.03]" />
          </div>
        ) : filteredReminders.length === 0 ? (
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center py-16 space-y-3">
            <p className="text-sm font-semibold text-white">
              {reminders?.length === 0 ? 'No expiring certificates' : 'No certificates match filter'}
            </p>
            <p className="text-xs text-white">
              {reminders?.length === 0
                ? 'Complete some inspections and they will appear here'
                : 'Try a different time range'}
            </p>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="space-y-2">
            {filteredReminders.map((reminder, index) => {
              const urgency = getExpiryUrgency(reminder.expiry_date);
              const styles = getUrgencyStyles(urgency);
              const days = getDaysUntilExpiry(reminder.expiry_date);
              const isExpired = urgency === 'expired';

              return (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className={cn(
                    'flex items-center gap-3.5 p-4 rounded-2xl cursor-pointer',
                    'border transition-all touch-manipulation active:scale-[0.98]',
                    styles.bg,
                    styles.border,
                    'hover:bg-white/[0.06]'
                  )}
                  onClick={() => setSelectedReminder(reminder)}
                >
                  <div className={cn('w-2.5 h-2.5 rounded-full flex-shrink-0', styles.dot)} />

                  <div className="flex-1 min-w-0">
                    {/* Badges row */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded', styles.badge)}>
                        {isExpired ? `${Math.abs(days)}d overdue` : `${days}d left`}
                      </span>
                      {reminder.reminder_status !== 'pending' && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/[0.06] text-white">
                          {reminder.reminder_status}
                        </span>
                      )}
                      <span className="text-[11px] text-white ml-auto flex-shrink-0">
                        {formatDate(reminder.expiry_date)}
                      </span>
                    </div>
                    {/* Client name */}
                    <h4 className="text-sm font-semibold text-white truncate text-left">
                      {reminder.client_name || 'Unknown Client'}
                    </h4>
                    {/* Address */}
                    <p className="text-sm text-white truncate mt-0.5 text-left">
                      {reminder.installation_address || 'No address'}
                    </p>
                  </div>

                  <ChevronRight className={cn('h-5 w-5 flex-shrink-0', isExpired ? 'text-red-400' : 'text-elec-yellow')} />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </motion.main>

      {/* Detail Sheet */}
      <Sheet
        open={!!selectedReminder}
        onOpenChange={(open) => !open && setSelectedReminder(null)}
      >
        <SheetContent side="bottom" className="h-[75vh] rounded-t-2xl p-0 overflow-hidden bg-background border-white/[0.06]">
          {selectedReminder && (() => {
            const urgency = getExpiryUrgency(selectedReminder.expiry_date);
            const styles = getUrgencyStyles(urgency);
            const days = getDaysUntilExpiry(selectedReminder.expiry_date);

            return (
              <div className="flex flex-col h-full">
                {/* Sheet header */}
                <div className="flex-shrink-0 border-b border-white/[0.06] px-5 pt-5 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn('text-[11px] font-bold px-2.5 py-1 rounded-lg', styles.badge)}>
                      {days < 0 ? `${Math.abs(days)} days overdue` : `${days} days left`}
                    </span>
                    {selectedReminder.reminder_status !== 'pending' && (
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/[0.06] text-white">
                        {selectedReminder.reminder_status}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-white">
                    {selectedReminder.client_name || 'Unknown Client'}
                  </h2>
                  <p className="text-sm text-white mt-0.5">
                    {selectedReminder.installation_address || 'No address'}
                  </p>
                </div>

                {/* Scrollable details */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
                      <p className="text-[11px] text-white uppercase tracking-wider mb-1">Certificate</p>
                      <p className="text-sm font-semibold text-white">{selectedReminder.certificate_number || 'N/A'}</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
                      <p className="text-[11px] text-white uppercase tracking-wider mb-1">Expires</p>
                      <p className="text-sm font-semibold text-white">{formatDate(selectedReminder.expiry_date)}</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
                      <p className="text-[11px] text-white uppercase tracking-wider mb-1">Inspected</p>
                      <p className="text-sm font-semibold text-white">{formatDate(selectedReminder.inspection_date)}</p>
                    </div>
                    {selectedReminder.contacted_at && (
                      <div className="rounded-xl bg-emerald-500/8 border border-emerald-500/20 p-3">
                        <p className="text-[11px] text-white uppercase tracking-wider mb-1">Contacted</p>
                        <p className="text-sm font-semibold text-emerald-400">{formatDate(selectedReminder.contacted_at)}</p>
                      </div>
                    )}
                    {selectedReminder.booked_for_date && (
                      <div className="rounded-xl bg-emerald-500/8 border border-emerald-500/20 p-3">
                        <p className="text-[11px] text-white uppercase tracking-wider mb-1">Booked For</p>
                        <p className="text-sm font-semibold text-emerald-400">{formatDate(selectedReminder.booked_for_date)}</p>
                      </div>
                    )}
                  </div>

                  {selectedReminder.notes && (
                    <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
                      <p className="text-[11px] text-white uppercase tracking-wider mb-1">Notes</p>
                      <p className="text-sm text-white">{selectedReminder.notes}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 border-t border-white/[0.06] px-5 py-4 space-y-2">
                  <div className="flex gap-3">
                    {selectedReminder.reminder_status === 'pending' && (
                      <Button
                        variant="outline"
                        className="flex-1 h-11 text-sm font-medium touch-manipulation active:scale-[0.98] border-white/[0.08] text-white hover:bg-white/[0.06]"
                        onClick={() => handleMarkContacted(selectedReminder.id)}
                      >
                        Mark Contacted
                      </Button>
                    )}
                    {(selectedReminder.reminder_status === 'pending' ||
                      selectedReminder.reminder_status === 'contacted') && (
                      <Button
                        className="flex-1 h-11 text-sm font-medium touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-elec-yellow/90"
                        onClick={() => handleMarkBooked(selectedReminder.id)}
                      >
                        Mark Booked
                      </Button>
                    )}
                    {selectedReminder.reminder_status === 'booked' && (
                      <Button
                        className="flex-1 h-11 text-sm font-medium touch-manipulation active:scale-[0.98] bg-emerald-500 text-white hover:bg-emerald-600"
                        onClick={() => handleMarkBooked(selectedReminder.id)}
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                  <button
                    className="w-full h-11 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors touch-manipulation active:scale-[0.98]"
                    onClick={() => setDeleteConfirmId(selectedReminder.id)}
                  >
                    Remove from list
                  </button>
                </div>
              </div>
            );
          })()}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent className="bg-[hsl(240_5.9%_12%)] border-white/10 max-w-[90vw] sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Remove Reminder?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This will remove this certificate from the expiry tracking list. The original certificate will not be affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10 touch-manipulation">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30 touch-manipulation"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
