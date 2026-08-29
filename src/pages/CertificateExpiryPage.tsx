import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { Switch } from '@/components/ui/switch';
import { useAutomation, AUTOMATION_KEYS } from '@/hooks/useUserAutomations';
import {
  MaintenanceContractsSection,
  type ContractPrefill,
} from '@/components/electrician/MaintenanceContractsSection';
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

/**
 * "Email my customers their renewals" — the switch behind the renewal cron.
 *
 * Off for everyone until flipped; the daily job sends nothing for users
 * without an `auto` row. The copy says exactly what turning it on does,
 * because this is the one place the app emails a customer without the
 * electrician pressing send each time — nobody should discover that later.
 */
function RenewalEmailsToggle() {
  const { mode, isLoading, setMode, saving } = useAutomation(
    AUTOMATION_KEYS.clientRenewalEmails
  );
  const on = mode === 'auto';

  return (
    <div
      className={cn(
        'rounded-2xl border p-4 sm:p-5 transition-colors',
        'bg-gradient-to-b from-white/[0.07] to-white/[0.03]',
        on ? 'border-elec-yellow/50' : 'border-white/[0.12]'
      )}
    >
      <label className="flex cursor-pointer items-center justify-between gap-4">
        <span className="min-w-0">
          <span className="block text-[14px] font-semibold text-white">
            Email customers their renewal reminders
          </span>
          <span className="mt-1 block text-[12.5px] leading-snug text-white">
            When a certificate comes due, the customer gets a reminder in your name at 30, 14 and
            7 days — with a button to book you for the renewal. Sent automatically each morning;
            replies come to you.
          </span>
        </span>
        <Switch
          checked={on}
          disabled={isLoading || saving}
          onCheckedChange={(v) => setMode(v ? 'auto' : 'off')}
        />
      </label>
    </div>
  );
}

export default function CertificateExpiryPage() {
  const navigate = useNavigate();
  const { reminders, isLoading, markAsContacted, markAsBooked, deleteReminder } =
    useExpiryReminders();

  const { toast } = useToast();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [selectedReminder, setSelectedReminder] = useState<ExpiryReminder | null>(null);
  const [contractPrefill, setContractPrefill] = useState<ContractPrefill | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  /*
   * Cross-page entry point — quotes/invoices link here with
   * ?contract=1&customer=…&job=…&amount=… to open the contract sheet
   * pre-filled ("make this recurring"). Params are consumed once.
   */
  useEffect(() => {
    if (searchParams.get('contract') !== '1') return;
    setContractPrefill({
      customerName: searchParams.get('customer') || undefined,
      customerId: searchParams.get('customerId') || undefined,
      jobType: searchParams.get('job') || undefined,
      amount: Number(searchParams.get('amount')) || null,
    });
    setSearchParams({}, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
   * Best-effort service + cadence from a cert reference. EIC becomes an EICR
   * (the periodic that follows an install), and the cadence follows the
   * trade: EICRs run on years (rental = 5), fire alarm servicing six-monthly
   * (BS 5839), PAT and emergency lighting annually.
   */
  const contractFromCert = (
    certificateNumber: string | null
  ): { jobType: string; frequency: 'five_yearly' | 'six_monthly' | 'annually' } => {
    const prefix = String(certificateNumber || '').split('-')[0].toUpperCase();
    if (prefix === 'EICR' || prefix === 'EIC') return { jobType: 'EICR', frequency: 'five_yearly' };
    if (prefix.startsWith('PAT')) return { jobType: 'PAT testing', frequency: 'annually' };
    if (prefix.startsWith('FA') || prefix.startsWith('FIRE'))
      return { jobType: 'Fire alarm service', frequency: 'six_monthly' };
    if (prefix.startsWith('EML') || prefix.startsWith('EL'))
      return { jobType: 'Emergency lighting test', frequency: 'annually' };
    return { jobType: '', frequency: 'annually' };
  };
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

  // When the active window is empty the page must still show the forward
  // pipeline — the next re-inspections on the book, however far out.
  const nextDue = useMemo(
    () =>
      [...(reminders ?? [])]
        .filter((r) => new Date(r.expiry_date).getTime() > Date.now())
        .sort((a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime())
        .slice(0, 6),
    [reminders]
  );

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
      {/* Header — quiet, no rules or eyebrows */}
      <div className="px-4 lg:px-8 pt-3 pb-1">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="h-11 px-1 -ml-1 text-[13px] font-semibold text-white/60 touch-manipulation active:scale-[0.97]"
        >
          Back
        </button>
        <div className="flex items-baseline gap-3 flex-wrap">
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-white">
            Renewals &amp; Contracts
          </h1>
          <span className="text-[13px] text-white/50">
            Your repeat-work pipeline — every renewal is a customer kept
          </span>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 lg:px-8 space-y-5 lg:max-w-[1600px]"
      >
        {/* KPI tiles — editorial seam grid; each tile also filters the list */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {[
            { label: 'Overdue', value: stats.overdue, filter: 'overdue' as TimeFilter, tone: stats.overdue > 0 ? 'text-red-400' : 'text-white' },
            { label: 'Within 30 days', value: stats.urgent, filter: '30days' as TimeFilter, tone: stats.urgent > 0 ? 'text-amber-300' : 'text-white' },
            { label: '30–60 days', value: stats.warning, filter: '60days' as TimeFilter, tone: 'text-white' },
            { label: 'Pipeline value', value: `£${stats.revenue.toLocaleString()}`, filter: 'all' as TimeFilter, tone: 'text-elec-yellow' },
          ].map((kpi) => {
            const isActive = timeFilter === kpi.filter;
            return (
              <button
                key={kpi.label}
                onClick={() => setTimeFilter(kpi.filter)}
                className={cn(
                  'group relative flex flex-col overflow-hidden rounded-2xl p-4 sm:p-5 text-left touch-manipulation',
                  'bg-gradient-to-b from-white/[0.07] to-white/[0.03] border transition-all duration-200',
                  'focus:outline-none focus-visible:ring-1 focus-visible:ring-elec-yellow/50',
                  isActive
                    ? 'border-elec-yellow/60'
                    : 'border-white/[0.12] hover:border-white/[0.22] hover:from-white/[0.09] hover:to-white/[0.05]'
                )}
              >
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/60 truncate">
                  {kpi.label}
                </span>
                <span
                  className={cn(
                    'mt-2.5 text-[28px] font-bold tracking-tight tabular-nums leading-none',
                    kpi.tone
                  )}
                >
                  {kpi.value}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* The automation switch, on the page it automates. The person looking
            at their renewal pipeline is exactly the person deciding whether
            customers should be chased automatically — burying this in a
            settings screen would mean nobody finds it. */}
        <motion.div variants={itemVariants}>
          <RenewalEmailsToggle />
        </motion.div>

        {/* The other half of the renewals machine — repeat work the
            electrician defines rather than a certificate implying (ELE-430). */}
        <motion.div variants={itemVariants}>
          <MaintenanceContractsSection prefill={contractPrefill} />
        </motion.div>

        {/* Filter pills */}
        <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setTimeFilter(opt.value)}
              className={cn(
                'h-11 px-4 text-[12.5px] font-semibold rounded-lg touch-manipulation transition-all whitespace-nowrap flex-shrink-0 active:scale-[0.98]',
                timeFilter === opt.value
                  ? 'bg-elec-yellow text-black border border-elec-yellow'
                  : 'bg-white/[0.07] text-white border border-white/[0.14] hover:bg-white/[0.1]'
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
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="flex flex-col items-center justify-center py-8 space-y-1.5">
              <p className="text-sm font-semibold text-white">
                {reminders?.length === 0 ? 'No re-inspection dates on file' : 'Nothing in this window'}
              </p>
              <p className="text-xs text-white/60">
                {reminders?.length === 0
                  ? 'Set Next Inspection Due when issuing certificates and your renewal pipeline appears here'
                  : 'Nothing due in this range — here is what is next on the book'}
              </p>
            </div>
            {nextDue.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {nextDue.map((reminder) => {
                  const days = getDaysUntilExpiry(reminder.expiry_date);
                  const title = reminder.client_name || 'Unknown client';
                  return (
                    <button
                      key={reminder.id}
                      onClick={() => setSelectedReminder(reminder)}
                      className="group relative flex flex-col overflow-hidden rounded-2xl p-4 text-left bg-gradient-to-b from-white/[0.07] to-white/[0.03] border border-white/[0.12] transition-all duration-200 hover:border-white/[0.22] touch-manipulation focus:outline-none focus-visible:ring-1 focus-visible:ring-elec-yellow/50"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/60 border border-white/[0.16] rounded px-1.5 py-0.5 shrink-0">
                          Due {formatDate(reminder.expiry_date)}
                        </span>
                        <span className="ml-auto text-[11px] text-white/50 tabular-nums">{days}d away</span>
                      </div>
                      <h3 className="mt-2.5 text-[15px] font-semibold tracking-tight text-white truncate">{title}</h3>
                      <p className="text-[12px] text-white/60 truncate mt-0.5">
                        {reminder.installation_address || 'No address'}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            <>
              {filteredReminders.map((reminder) => {
                const urgency = getExpiryUrgency(reminder.expiry_date);
                const days = getDaysUntilExpiry(reminder.expiry_date);
                const isExpired = urgency === 'expired';
                const title = reminder.client_name || 'Unknown client';

                return (
                  <button
                    key={reminder.id}
                    onClick={() => setSelectedReminder(reminder)}
                    className="group relative flex w-full flex-col overflow-hidden rounded-2xl text-left p-4 sm:p-5 bg-gradient-to-b from-white/[0.07] to-white/[0.03] border border-white/[0.12] transition-all duration-200 hover:border-white/[0.22] hover:from-white/[0.09] hover:to-white/[0.05] touch-manipulation focus:outline-none focus-visible:ring-1 focus-visible:ring-elec-yellow/50"
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
                      title={reminder.installation_address || undefined}
                      className={cn(
                        'mt-1.5 text-[12px] leading-relaxed min-w-0 truncate',
                        reminder.installation_address ? 'text-white/60' : 'text-white/40 italic'
                      )}
                    >
                      {reminder.installation_address || 'No address'}
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
                      <span className="text-[12px] font-bold text-elec-yellow shrink-0">Details</span>
                    </div>
                  </button>
                );
              })}
            </>
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
                    {isCreating ? 'Creating renewal…' : 'Start renewal EICR'}
                  </Button>

                  {/* The recurring-revenue move: a customer whose cert is due
                      is exactly the customer to put on a plan — one tap
                      pre-fills the contract sheet below. */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      const suggestion = contractFromCert(selectedReminder.certificate_number);
                      setContractPrefill({
                        customerName: selectedReminder.client_name || undefined,
                        customerId: selectedReminder.customer_id || undefined,
                        jobType: suggestion.jobType,
                        frequency: suggestion.frequency,
                      });
                      setSelectedReminder(null);
                    }}
                    className="w-full h-11 text-[13px] font-medium touch-manipulation active:scale-[0.98] border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/10"
                  >
                    Put on a maintenance contract
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
                          Original
                        </Button>
                      )}
                      {source?.clientPhone && (
                        <Button
                          variant="outline"
                          onClick={() => { window.location.href = `tel:${source.clientPhone}`; }}
                          className="flex-1 h-11 text-[13px] font-medium touch-manipulation active:scale-[0.98] border-white/[0.08] text-white hover:bg-white/[0.06]"
                        >
                          Call
                        </Button>
                      )}
                      {source?.clientEmail && (
                        <Button
                          variant="outline"
                          onClick={() => handleContactEmail(selectedReminder)}
                          className="flex-1 h-11 text-[13px] font-medium touch-manipulation active:scale-[0.98] border-white/[0.08] text-white hover:bg-white/[0.06]"
                        >
                          Email
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
