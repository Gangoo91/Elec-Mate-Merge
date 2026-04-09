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
import { ArrowLeft, ChevronRight } from 'lucide-react';
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

  const getUrgencyAccent = (urgency: string) => {
    switch (urgency) {
      case 'expired': return 'from-red-500 via-rose-400 to-pink-400';
      case 'critical': return 'from-orange-500 via-amber-400 to-yellow-400';
      case 'warning': return 'from-amber-500 via-amber-400 to-yellow-400';
      default: return 'from-emerald-500 via-emerald-400 to-green-400';
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'expired': return 'bg-red-500/15 text-red-400';
      case 'critical': return 'bg-orange-500/15 text-orange-400';
      case 'warning': return 'bg-amber-500/15 text-amber-400';
      default: return 'bg-emerald-500/15 text-emerald-400';
    }
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
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
            <h1 className="text-sm font-bold text-white tracking-wide uppercase">Expiring Certificates</h1>
          </div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 space-y-5"
      >
        {/* KPI Cards — HubCard style */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Overdue', value: stats.overdue, filter: 'overdue' as TimeFilter, accent: 'from-red-500 via-rose-400 to-pink-400', color: stats.overdue > 0 ? 'text-red-400' : 'text-white' },
            { label: 'Within 30 days', value: stats.urgent, filter: '30days' as TimeFilter, accent: 'from-orange-500 via-amber-400 to-yellow-400', color: stats.urgent > 0 ? 'text-orange-400' : 'text-white' },
            { label: '30-60 days', value: stats.warning, filter: '60days' as TimeFilter, accent: 'from-amber-500 via-amber-400 to-yellow-400', color: stats.warning > 0 ? 'text-amber-400' : 'text-white' },
            { label: 'Revenue opportunity', value: `£${stats.revenue.toLocaleString()}`, filter: 'all' as TimeFilter, accent: 'from-emerald-500 via-emerald-400 to-green-400', color: 'text-emerald-400' },
          ].map((kpi) => (
            <button
              key={kpi.label}
              onClick={() => setTimeFilter(kpi.filter)}
              className="group relative overflow-hidden card-surface-interactive rounded-xl active:scale-[0.97] transition-all touch-manipulation text-left"
            >
              <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-40 group-hover:opacity-100 transition-opacity', kpi.accent)} />
              <div className="relative z-10 p-3">
                <p className="text-[11px] font-medium text-white leading-tight">{kpi.label}</p>
                <p className={cn('text-xl font-bold leading-tight mt-1', kpi.color)}>{kpi.value}</p>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Filter pills */}
        <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setTimeFilter(opt.value)}
              className={cn(
                'h-8 px-3 text-xs font-medium rounded-lg touch-manipulation transition-all whitespace-nowrap flex-shrink-0 active:scale-[0.98]',
                timeFilter === opt.value
                  ? 'bg-elec-yellow/15 text-elec-yellow border border-elec-yellow/25'
                  : 'bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.07]'
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
            <Skeleton className="h-28 w-full rounded-2xl bg-white/[0.03]" />
            <Skeleton className="h-28 w-full rounded-2xl bg-white/[0.03]" />
            <Skeleton className="h-28 w-full rounded-2xl bg-white/[0.03]" />
          </div>
        ) : filteredReminders.length === 0 ? (
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center py-16 space-y-2">
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
          <motion.div variants={itemVariants} className="space-y-3">
            {filteredReminders.map((reminder, index) => {
              const urgency = getExpiryUrgency(reminder.expiry_date);
              const days = getDaysUntilExpiry(reminder.expiry_date);
              const isExpired = urgency === 'expired';

              return (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <button
                    onClick={() => setSelectedReminder(reminder)}
                    className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation"
                  >
                    <div className="group relative overflow-hidden card-surface-interactive active:scale-[0.98] transition-all duration-200">
                      <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity', getUrgencyAccent(urgency))} />
                      <div className="relative z-10 p-4">
                        {/* Badges row */}
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded', getUrgencyBadge(urgency))}>
                            {isExpired ? `${Math.abs(days)}d overdue` : `${days}d left`}
                          </span>
                          {reminder.reminder_status !== 'pending' && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                              {reminder.reminder_status}
                            </span>
                          )}
                          <span className="text-[11px] text-white ml-auto flex-shrink-0">
                            {formatDate(reminder.expiry_date)}
                          </span>
                        </div>

                        {/* Client name */}
                        <h3 className="text-[15px] font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors truncate">
                          {reminder.client_name || 'Unknown Client'}
                        </h3>
                        {/* Address */}
                        <p className="mt-0.5 text-[12px] text-white leading-tight truncate">
                          {reminder.installation_address || 'No address'}
                        </p>

                        {/* Bottom row */}
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-[11px] font-medium text-elec-yellow">Details</span>
                          <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
                            <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
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
            const days = getDaysUntilExpiry(selectedReminder.expiry_date);

            return (
              <div className="flex flex-col h-full">
                {/* Sheet header */}
                <div className="flex-shrink-0 border-b border-white/[0.06] px-5 pt-5 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn('text-[11px] font-bold px-2.5 py-1 rounded-lg', getUrgencyBadge(urgency))}>
                      {days < 0 ? `${Math.abs(days)} days overdue` : `${days} days left`}
                    </span>
                    {selectedReminder.reminder_status !== 'pending' && (
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400">
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
