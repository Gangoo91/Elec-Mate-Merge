import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { reportCloud } from '@/utils/reportCloud';
import { useToast } from '@/hooks/use-toast';
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
import { ArrowLeft, ArrowRight, MapPin, FileText, Phone, Mail, RefreshCw } from 'lucide-react';
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

  const { toast } = useToast();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [selectedReminder, setSelectedReminder] = useState<ExpiryReminder | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  // Source cert behind the open reminder — fetched once when the sheet opens.
  // Powers "View original" (needs the report type) and "Contact" (phone/email
  // live in the cert's form data, not on the reminder row).
  const [source, setSource] = useState<{
    reportType: string;
    clientName?: string;
    clientPhone?: string;
    clientEmail?: string;
  } | null>(null);

  useEffect(() => {
    if (!selectedReminder) {
      setSource(null);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('reports')
        .select('report_type, data')
        .eq('report_id', selectedReminder.report_id)
        .maybeSingle();
      if (cancelled) return;
      if (data) {
        const d = (data.data || {}) as Record<string, string | undefined>;
        setSource({
          reportType: data.report_type,
          clientName: d.clientName,
          clientPhone: d.clientPhone || d.clientTelephone || d.phone,
          clientEmail: d.clientEmail || d.email,
        });
      } else {
        setSource(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedReminder]);

  // Cert types that open via a dedicated React Router path (everything else
  // is a core type opened through the inspection index query params).
  const DEDICATED_ROUTE_TYPES = [
    'ev-charging', 'fire-alarm', 'fire-alarm-design', 'fire-alarm-commissioning',
    'fire-alarm-inspection', 'fire-alarm-modification', 'emergency-lighting',
    'pat-testing', 'solar-pv', 'testing-only', 'bess', 'lightning-protection',
    'g98-commissioning', 'g99-commissioning', 'smoke-co-alarm',
  ];

  const openCert = (reportType: string, reportId: string) => {
    if (DEDICATED_ROUTE_TYPES.includes(reportType)) {
      navigate(`/electrician/inspection-testing/${reportType}/${reportId}`);
    } else {
      navigate(
        `/electrician/inspection-testing?section=${reportType}&reportId=${reportId}&reportType=${reportType}`
      );
    }
  };

  // Start a renewal — a periodic re-inspection is always an EICR (EICs don't
  // "renew"), pre-filled with the client + address (and contact, if known).
  const handleStartRenewal = async (reminder: ExpiryReminder) => {
    setIsCreating(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: 'Sign in required', description: 'Please sign in to start a renewal.', variant: 'destructive' });
        return;
      }
      const seed: Record<string, unknown> = {
        clientName: reminder.client_name || source?.clientName || '',
        installationAddress: reminder.installation_address || '',
      };
      if (source?.clientPhone) seed.clientPhone = source.clientPhone;
      if (source?.clientEmail) seed.clientEmail = source.clientEmail;

      const res = await reportCloud.createReport(user.id, 'eicr', seed);
      if (res.success && res.reportId) {
        setSelectedReminder(null);
        openCert('eicr', res.reportId);
      } else {
        toast({ title: 'Could not start renewal', description: 'Please try again.', variant: 'destructive' });
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleContactEmail = (reminder: ExpiryReminder) => {
    if (!source?.clientEmail) return;
    const subject = encodeURIComponent('Your electrical certificate is due for renewal');
    const body = encodeURIComponent(
      `Hello ${reminder.client_name || ''},\n\n` +
        `The electrical certificate for ${reminder.installation_address || 'your property'} ` +
        `is due to expire on ${formatDate(reminder.expiry_date)}.\n\n` +
        `I'd be happy to arrange the renewal inspection — please let me know a convenient date.\n\nMany thanks`
    );
    window.location.href = `mailto:${source.clientEmail}?subject=${subject}&body=${body}`;
  };

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

  // Single accent dot — the urgency colour signal, mono palette otherwise.
  const getUrgencyDot = (urgency: string) => {
    switch (urgency) {
      case 'expired': return 'bg-red-400';
      case 'critical': return 'bg-orange-400';
      case 'warning': return 'bg-amber-400';
      default: return 'bg-emerald-400';
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
        {/* KPI tiles — editorial seam grid; each tile also filters the list */}
        <motion.div
          variants={itemVariants}
          className="relative grid grid-cols-2 sm:grid-cols-4 gap-[1.5px] bg-white/[0.14] border border-white/[0.14] rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
          {[
            { label: 'Overdue', value: stats.overdue, filter: 'overdue' as TimeFilter, dot: 'bg-red-400' },
            { label: 'Within 30 days', value: stats.urgent, filter: '30days' as TimeFilter, dot: 'bg-orange-400' },
            { label: '30–60 days', value: stats.warning, filter: '60days' as TimeFilter, dot: 'bg-amber-400' },
            { label: 'Revenue', value: `£${stats.revenue.toLocaleString()}`, filter: 'all' as TimeFilter, dot: 'bg-emerald-400', accentValue: true },
          ].map((kpi) => {
            const isActive = timeFilter === kpi.filter;
            return (
              <button
                key={kpi.label}
                onClick={() => setTimeFilter(kpi.filter)}
                className={cn(
                  'group relative flex flex-col text-left p-4 bg-[hsl(0_0%_11%)] transition-colors touch-manipulation focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow/50',
                  isActive ? 'bg-elec-yellow/[0.07]' : 'hover:bg-elec-yellow/[0.05] active:bg-white/[0.05]'
                )}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', kpi.dot)} aria-hidden />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45 truncate">
                    {kpi.label}
                  </span>
                </div>
                <span
                  className={cn(
                    'mt-2.5 text-[26px] font-semibold tracking-tight tabular-nums leading-none',
                    kpi.accentValue ? 'text-elec-yellow' : 'text-white'
                  )}
                >
                  {kpi.value}
                </span>
              </button>
            );
          })}
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
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center py-16 space-y-1.5">
            <p className="text-sm font-semibold text-white">
              {reminders?.length === 0 ? 'No expiring certificates' : 'No certificates match filter'}
            </p>
            <p className="text-xs text-white/50">
              {reminders?.length === 0
                ? 'Complete some inspections and they will appear here'
                : 'Try a different time range'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="relative border border-white/[0.14] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
            <div className="divide-y divide-white/[0.18]">
              {filteredReminders.map((reminder) => {
                const urgency = getExpiryUrgency(reminder.expiry_date);
                const days = getDaysUntilExpiry(reminder.expiry_date);
                const isExpired = urgency === 'expired';
                const title = reminder.client_name || 'Unknown client';

                return (
                  <button
                    key={reminder.id}
                    onClick={() => setSelectedReminder(reminder)}
                    className="group relative flex w-full flex-col text-left p-4 sm:p-5 bg-[hsl(0_0%_11%)] transition-colors touch-manipulation hover:bg-elec-yellow/[0.05] active:bg-white/[0.05] focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow/50"
                  >
                    {/* urgency dot + days-remaining badge */}
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={cn('mt-1 w-2 h-2 rounded-full shrink-0', getUrgencyDot(urgency))}
                        aria-hidden
                      />
                      <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/50 border border-white/[0.12] rounded px-1.5 py-0.5 shrink-0">
                        {isExpired ? `${Math.abs(days)}d overdue` : `${days}d left`}
                      </span>
                    </div>

                    <h3
                      title={title}
                      className="mt-3 text-[17px] sm:text-[18px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors truncate"
                    >
                      {title}
                    </h3>
                    <p
                      className={cn(
                        'mt-1.5 flex items-center gap-1.5 text-[12px] leading-relaxed min-w-0',
                        reminder.installation_address ? 'text-white/55' : 'text-white/35'
                      )}
                    >
                      <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                      <span
                        title={reminder.installation_address || undefined}
                        className={cn('truncate', !reminder.installation_address && 'italic')}
                      >
                        {reminder.installation_address || 'No address'}
                      </span>
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="min-w-0 truncate text-[11px] uppercase tracking-[0.1em] text-white/45">
                        {reminder.reminder_status !== 'pending' && (
                          <>
                            {reminder.reminder_status}
                            <span className="mx-1.5 text-white/20">·</span>
                          </>
                        )}
                        Expires
                        <span className="ml-1 normal-case tracking-normal tabular-nums">
                          {formatDate(reminder.expiry_date)}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-[12px] font-medium text-elec-yellow shrink-0">
                        Details
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
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
                  {/* Primary: turn an expiry into work */}
                  <Button
                    disabled={isCreating}
                    onClick={() => handleStartRenewal(selectedReminder)}
                    className="w-full h-11 text-sm font-semibold touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  >
                    <RefreshCw className={cn('h-4 w-4 mr-2', isCreating && 'animate-spin')} />
                    {isCreating ? 'Creating renewal…' : 'Start renewal EICR'}
                  </Button>

                  {/* Secondary: open the original cert, or contact the client */}
                  {(source?.reportType || source?.clientPhone || source?.clientEmail) && (
                    <div className="flex gap-2">
                      {source?.reportType && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            openCert(source.reportType, selectedReminder.report_id);
                            setSelectedReminder(null);
                          }}
                          className="flex-1 h-11 text-[13px] font-medium touch-manipulation active:scale-[0.98] border-white/[0.08] text-white hover:bg-white/[0.06]"
                        >
                          <FileText className="h-4 w-4 mr-1.5" /> Original
                        </Button>
                      )}
                      {source?.clientPhone && (
                        <Button
                          variant="outline"
                          onClick={() => { window.location.href = `tel:${source.clientPhone}`; }}
                          className="flex-1 h-11 text-[13px] font-medium touch-manipulation active:scale-[0.98] border-white/[0.08] text-white hover:bg-white/[0.06]"
                        >
                          <Phone className="h-4 w-4 mr-1.5" /> Call
                        </Button>
                      )}
                      {source?.clientEmail && (
                        <Button
                          variant="outline"
                          onClick={() => handleContactEmail(selectedReminder)}
                          className="flex-1 h-11 text-[13px] font-medium touch-manipulation active:scale-[0.98] border-white/[0.08] text-white hover:bg-white/[0.06]"
                        >
                          <Mail className="h-4 w-4 mr-1.5" /> Email
                        </Button>
                      )}
                    </div>
                  )}

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
