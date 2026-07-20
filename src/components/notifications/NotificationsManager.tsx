import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { NotificationsList } from './NotificationsList';
import { NotificationDetailModal } from './NotificationDetailModal';
import { BuildingControlFormGuide } from './BuildingControlFormGuide';
import { BuildingControlFinder } from './BuildingControlFinder';
import { NonRegisteredUserGuide } from './NonRegisteredUserGuide';
import { RegisteredUserGuide } from './RegisteredUserGuide';
import { CertExpiryCard } from './CertExpiryCard';
import { ElecIdExpiryCard } from './ElecIdExpiryCard';
import { OverdueInvoiceCard, ExpiringQuoteCard, QuoteActivityCard, InvoicePaidCard } from './FinanceAlertCard';
import { OverdueTasksCard, JobDueCard } from './TaskAlertCard';
import { SafetyEquipmentCard } from './SafetyEquipmentCard';
import { useNotifications, Notification } from '@/hooks/useNotifications';
import { useExpiryReminders } from '@/hooks/useExpiryReminders';
import { useElecIdExpiryAlerts } from '@/hooks/useElecIdExpiryAlerts';
import { useFinanceAlerts } from '@/hooks/useFinanceAlerts';
import { useTaskAlerts } from '@/hooks/useTaskAlerts';
import { useSafetyEquipmentAlerts } from '@/hooks/useSafetyEquipmentAlerts';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { differenceInDays, parseISO } from 'date-fns';
import { getDaysUntilDeadline } from '@/utils/notificationHelper';
import { cn } from '@/lib/utils';

// Maps logical section names to real app routes
const CROSS_APP_ROUTES: Record<string, string> = {
  'invoices': '/electrician/invoices',
  'quotes': '/electrician/quotes',
  'tasks': '/electrician/tasks',
  'calendar': '/electrician/business/calendar',
  'elec-id': '/elec-id',
  'safety-equipment': '/electrician-tools/site-safety',
};

// ── Compliance status ───────────────────────────────────────────────
// One plain-English card that answers the only question that matters —
// "am I compliant right now?" — instead of a four-metric dashboard grid.
interface ComplianceStatusProps {
  pending: number;
  overdue: number;
  submitted: number;
  nextDays: number | null;
  isLoading: boolean;
}

function ComplianceStatus({ pending, overdue, submitted, nextDays, isLoading }: ComplianceStatusProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/[0.09] bg-white/[0.02] p-5">
        <Skeleton className="h-3 w-24 mb-3" />
        <Skeleton className="h-7 w-40 mb-2.5" />
        <Skeleton className="h-4 w-56" />
      </div>
    );
  }

  const state =
    overdue > 0
      ? {
          dot: 'bg-red-400',
          border: 'border-red-400/25',
          tint: 'bg-red-400/[0.05]',
          word: 'Action needed',
          wordColor: 'text-red-300',
          headline: `${overdue} overdue`,
          sub: 'Past the 30-day Building Regs deadline — submit to your scheme or Building Control now.',
        }
      : pending > 0
        ? {
            dot: 'bg-amber-400',
            border: 'border-amber-400/25',
            tint: 'bg-amber-400/[0.04]',
            word: 'To submit',
            wordColor: 'text-amber-300',
            headline: `${pending} to notify`,
            sub:
              nextDays === null
                ? 'Submit to your scheme or Building Control within 30 days of completion.'
                : nextDays <= 0
                  ? 'The next one is due today.'
                  : `Next deadline in ${nextDays} day${nextDays === 1 ? '' : 's'}.`,
          }
        : {
            dot: 'bg-emerald-400',
            border: 'border-emerald-400/25',
            tint: 'bg-emerald-400/[0.04]',
            word: 'Up to date',
            wordColor: 'text-emerald-300',
            headline: 'All clear',
            sub: 'No notifiable work waiting to be submitted.',
          };

  return (
    <div className={cn('rounded-2xl border p-5', state.border, state.tint)}>
      <div className="flex items-center gap-2">
        <span className={cn('w-2 h-2 rounded-full shrink-0', state.dot)} aria-hidden />
        <span className={cn('text-[12px] font-semibold tracking-tight', state.wordColor)}>{state.word}</span>
        {submitted > 0 && (
          <span className="ml-auto text-[11.5px] tabular-nums text-white/60">
            {submitted} submitted
          </span>
        )}
      </div>
      <p className="mt-2.5 text-[23px] sm:text-[25px] font-semibold tracking-tight leading-none text-white">
        {state.headline}
      </p>
      <p className="mt-2.5 text-[13px] leading-relaxed text-white/80">{state.sub}</p>
    </div>
  );
}

// ── Section Header (editorial micro-label) ──────────────────────────
function SectionHeading({ title, count }: { title: string; count?: number }) {
  return (
    <div className="flex items-end justify-between gap-3 px-0.5">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">{title}</h2>
      {count !== undefined && count > 0 && (
        <span className="text-[10.5px] text-white/75 tabular-nums">{count}</span>
      )}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────
interface NotificationsManagerProps {
  onNavigate?: (section: string, reportId?: string, reportType?: string) => void;
  onBeforeNavigate?: () => void;
  compact?: boolean;
  partPOnly?: boolean;
  /** Framer motion item variants passed from parent page */
  itemVariants?: Variants;
}

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const NotificationsManager = ({ onNavigate, onBeforeNavigate, compact = false, partPOnly = false, itemVariants }: NotificationsManagerProps) => {
  const navigate = useNavigate();
  const { notifications, isLoading, updateNotification, deleteNotification } = useNotifications();
  const { reminders, isLoading: expIsLoading } = useExpiryReminders();
  const { data: elecIdAlerts = [] } = useElecIdExpiryAlerts();
  const { data: financeAlerts } = useFinanceAlerts();
  const { data: taskAlerts } = useTaskAlerts();
  const { data: equipmentAlerts = [] } = useSafetyEquipmentAlerts();
  const { toast } = useToast();
  const iv = itemVariants || defaultItemVariants;

  const handleNav = useCallback((section: string, reportId?: string, reportType?: string) => {
    onBeforeNavigate?.();
    if (CROSS_APP_ROUTES[section]) {
      navigate(CROSS_APP_ROUTES[section]);
    } else {
      onNavigate?.(section, reportId, reportType);
    }
  }, [navigate, onNavigate, onBeforeNavigate]);

  // Expiry alerts
  const expiryAlerts = useMemo(() => {
    if (!reminders) return [];
    return reminders.filter((r) => {
      if (r.reminder_status === 'completed') return false;
      const days = differenceInDays(parseISO(r.expiry_date), new Date());
      return days <= 60;
    });
  }, [reminders]);

  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showNiceic, setShowNiceic] = useState(true);
  const [showNapit, setShowNapit] = useState(true);
  const [isFormGuideOpen, setIsFormGuideOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [showBuildingControlFinder, setShowBuildingControlFinder] = useState(false);

  useEffect(() => {
    const checkSchemeMembership = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsRegistered(false); return; }

      const { data: companyProfile } = await supabase
        .from('company_profiles')
        .select('registration_scheme, registration_number')
        .eq('user_id', user.id)
        .single();

      if (companyProfile && companyProfile.registration_scheme) {
        const scheme = (companyProfile.registration_scheme || '').toLowerCase();
        setShowNiceic(scheme.includes('niceic'));
        setShowNapit(scheme.includes('napit'));
        setIsRegistered(!!companyProfile.registration_number);
      } else {
        setIsRegistered(false);
      }
    };
    checkSchemeMembership();
  }, []);

  const handleViewCertificate = (reportId: string, reportType: string) => {
    const sectionMap: Record<string, string> = { eicr: 'eicr', eic: 'eic', 'minor-works': 'minor-works' };
    handleNav(sectionMap[reportType] || reportType, reportId, reportType);
  };

  // ── KPI calculations ──
  const pendingCount = notifications.filter(n => n.notification_status === 'pending' || n.notification_status === 'in-progress').length;
  const overdueCount = notifications.filter(n => n.submission_deadline && getDaysUntilDeadline(n.submission_deadline) < 0 && n.notification_status !== 'submitted' && n.notification_status !== 'cancelled').length;
  const submittedCount = notifications.filter(n => n.notification_status === 'submitted').length;

  const nextDeadlineDays = useMemo(() => {
    const pending = notifications
      .filter(n => n.submission_deadline && n.notification_status !== 'submitted' && n.notification_status !== 'cancelled')
      .map(n => getDaysUntilDeadline(n.submission_deadline!))
      .filter(d => d >= 0)
      .sort((a, b) => a - b);
    return pending.length > 0 ? pending[0] : null;
  }, [notifications]);

  if (isLoading && expIsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // ── Part P Only mode — Business Hub layout ──
  if (partPOnly) {
    return (
      <>
        {/* Compliance status — the one thing that matters, in plain English */}
        <motion.div variants={iv}>
          <ComplianceStatus
            pending={pendingCount}
            overdue={overdueCount}
            submitted={submittedCount}
            nextDays={nextDeadlineDays}
            isLoading={isLoading}
          />
        </motion.div>

        {/* Scheme — one compact strip, portal a tap away */}
        {!compact && isRegistered !== null && (
          <motion.div variants={iv}>
            {isRegistered ? (
              <RegisteredUserGuide showNiceic={showNiceic} showNapit={showNapit} />
            ) : (
              <NonRegisteredUserGuide onFindBuildingControl={() => setShowBuildingControlFinder(true)} />
            )}
          </motion.div>
        )}

        {/* The work — notifications lead the page, no shouty label needed */}
        <motion.div variants={iv}>
          <NotificationsList
            notifications={notifications}
            onUpdate={updateNotification}
            onDelete={deleteNotification}
            onViewDetails={setSelectedNotification}
            onViewCertificate={handleViewCertificate}
            showNiceic={showNiceic}
            showNapit={showNapit}
          />
        </motion.div>

        {/* Building Control guide — quiet reference at the foot */}
        {!compact && (
          <motion.div variants={iv}>
            <Collapsible open={isFormGuideOpen} onOpenChange={setIsFormGuideOpen}>
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between gap-3 rounded-2xl border border-white/[0.09] bg-white/[0.02] p-4 touch-manipulation transition-colors hover:bg-white/[0.04] active:bg-white/[0.05] focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow/50">
                  <div className="text-left">
                    <p className="text-[14px] font-semibold tracking-tight text-white">Building Control guide</p>
                    <p className="text-[12px] text-white/75">What to submit, and how</p>
                  </div>
                  <ChevronDown
                    className={cn('h-5 w-5 text-white/60 transition-transform', isFormGuideOpen && 'rotate-180')}
                  />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <BuildingControlFormGuide />
              </CollapsibleContent>
            </Collapsible>
          </motion.div>
        )}

        {/* Modals */}
        {!compact && (
          <NotificationDetailModal
            notification={selectedNotification}
            open={!!selectedNotification}
            onClose={() => setSelectedNotification(null)}
            onUpdate={updateNotification}
            onViewCertificate={handleViewCertificate}
          />
        )}
        <BuildingControlFinder
          open={showBuildingControlFinder}
          onOpenChange={setShowBuildingControlFinder}
          onSelect={(authority) => {
            toast({ title: 'Building Control Found', description: `${authority} - Use the contact details to submit your notification directly.` });
          }}
        />
      </>
    );
  }

  // ── Full notifications mode (bell sheet / non-partPOnly) ──
  return (
    <>
      {expiryAlerts.length > 0 && (
        <div className="mb-6 space-y-3">
          <SectionHeading title="Re-Inspections Due" count={expiryAlerts.length} />
          {expiryAlerts.map((reminder) => (<CertExpiryCard key={reminder.id} reminder={reminder} />))}
        </div>
      )}

      {elecIdAlerts.length > 0 && (
        <div className="mb-6 space-y-3">
          <SectionHeading title="Elec-ID Expiry" count={elecIdAlerts.length} />
          {elecIdAlerts.map((alert) => (<ElecIdExpiryCard key={alert.id} alert={alert} onNavigate={() => handleNav('elec-id')} />))}
        </div>
      )}

      {equipmentAlerts.length > 0 && (
        <div className="mb-6 space-y-3">
          <SectionHeading title="Equipment Due" count={equipmentAlerts.length} />
          {equipmentAlerts.map((alert) => (<SafetyEquipmentCard key={alert.id} alert={alert} onNavigate={() => handleNav('safety-equipment')} />))}
        </div>
      )}

      {(taskAlerts?.overdueTasks.length ?? 0) > 0 && (
        <div className="mb-6 space-y-3">
          <SectionHeading title="Overdue Tasks" count={taskAlerts!.overdueTasks.length} />
          <OverdueTasksCard tasks={taskAlerts!.overdueTasks} onNavigate={() => handleNav('tasks')} />
        </div>
      )}

      {(taskAlerts?.jobsDueToday.length ?? 0) > 0 && (
        <div className="mb-6 space-y-3">
          <SectionHeading title="Today's Jobs" count={taskAlerts!.jobsDueToday.length} />
          {taskAlerts!.jobsDueToday.map((job) => (<JobDueCard key={job.id} job={job} onNavigate={() => handleNav('calendar')} />))}
        </div>
      )}

      {(taskAlerts?.jobsDueTomorrow.length ?? 0) > 0 && (
        <div className="mb-6 space-y-3">
          <SectionHeading title="Tomorrow's Jobs" count={taskAlerts!.jobsDueTomorrow.length} />
          {taskAlerts!.jobsDueTomorrow.map((job) => (<JobDueCard key={job.id} job={job} onNavigate={() => handleNav('calendar')} />))}
        </div>
      )}

      {(financeAlerts?.overdueInvoices.length ?? 0) > 0 && (
        <div className="mb-6 space-y-3">
          <SectionHeading title="Overdue Invoices" count={financeAlerts!.overdueInvoices.length} />
          {financeAlerts!.overdueInvoices.map((invoice) => (<OverdueInvoiceCard key={invoice.id} invoice={invoice} onNavigate={() => handleNav('invoices')} />))}
        </div>
      )}

      {(financeAlerts?.expiringQuotes.length ?? 0) > 0 && (
        <div className="mb-6 space-y-3">
          <SectionHeading title="Quotes Expiring Soon" count={financeAlerts!.expiringQuotes.length} />
          {financeAlerts!.expiringQuotes.map((quote) => (<ExpiringQuoteCard key={quote.id} quote={quote} onNavigate={() => handleNav('quotes')} />))}
        </div>
      )}

      {(financeAlerts?.recentPaidInvoices.length ?? 0) > 0 && (
        <div className="mb-6 space-y-3">
          <SectionHeading title="Payments Received" count={financeAlerts!.recentPaidInvoices.length} />
          {financeAlerts!.recentPaidInvoices.map((invoice) => (<InvoicePaidCard key={invoice.id} invoice={invoice} onNavigate={() => handleNav('invoices')} />))}
        </div>
      )}

      {(financeAlerts?.recentQuoteActivity.length ?? 0) > 0 && (
        <div className="mb-6 space-y-3">
          <SectionHeading title="Quote Activity" count={financeAlerts!.recentQuoteActivity.length} />
          {financeAlerts!.recentQuoteActivity.map((activity) => (<QuoteActivityCard key={activity.id} activity={activity} onNavigate={() => handleNav('quotes')} />))}
        </div>
      )}

      {!compact && isRegistered === false && (
        <NonRegisteredUserGuide onFindBuildingControl={() => setShowBuildingControlFinder(true)} />
      )}
      {!compact && isRegistered === true && (
        <RegisteredUserGuide showNiceic={showNiceic} showNapit={showNapit} />
      )}

      {!compact && (
        <Collapsible open={isFormGuideOpen} onOpenChange={setIsFormGuideOpen} className="mb-6">
          <CollapsibleTrigger asChild>
            <button className="w-full flex items-center justify-between gap-3 rounded-2xl border border-white/[0.14] bg-[hsl(0_0%_11%)] p-4 touch-manipulation transition-colors hover:bg-elec-yellow/[0.05] active:bg-white/[0.05] focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow/50">
              <div className="text-left">
                <p className="text-[15px] font-semibold tracking-tight text-white">Building Control Guide</p>
                <p className="text-[12px] text-white/80">What to submit</p>
              </div>
              <ChevronDown
                className={cn('h-5 w-5 text-white/60 transition-transform', isFormGuideOpen && 'rotate-180')}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <BuildingControlFormGuide />
          </CollapsibleContent>
        </Collapsible>
      )}

      <NotificationsList
        notifications={notifications}
        onUpdate={updateNotification}
        onDelete={deleteNotification}
        onViewDetails={setSelectedNotification}
        onViewCertificate={handleViewCertificate}
        showNiceic={showNiceic}
        showNapit={showNapit}
      />

      {!compact && (
        <NotificationDetailModal
          notification={selectedNotification}
          open={!!selectedNotification}
          onClose={() => setSelectedNotification(null)}
          onUpdate={updateNotification}
          onViewCertificate={handleViewCertificate}
        />
      )}

      <BuildingControlFinder
        open={showBuildingControlFinder}
        onOpenChange={setShowBuildingControlFinder}
        onSelect={(authority) => {
          toast({ title: 'Building Control Found', description: `${authority} - Use the contact details to submit your notification directly.` });
        }}
      />
    </>
  );
};
