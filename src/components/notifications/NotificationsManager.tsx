import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Loader2, CalendarClock, ShieldAlert, AlertCircle, Clock, CheckSquare, Wrench, CheckCircle2, Banknote, XCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { differenceInDays, parseISO } from 'date-fns';

// Maps logical section names to real app routes
const CROSS_APP_ROUTES: Record<string, string> = {
  'invoices': '/electrician/invoices',
  'quotes': '/electrician/quotes',
  'tasks': '/electrician/tasks',
  'calendar': '/electrician/business/calendar',
  'elec-id': '/elec-id',
  'safety-equipment': '/electrician-tools/site-safety',
};

interface NotificationsManagerProps {
  /** Called for inspection-internal navigation (cert viewing, Part P sections).
   *  Cross-app sections (invoices, tasks etc) are handled internally via React Router. */
  onNavigate?: (section: string, reportId?: string, reportType?: string) => void;
  /** Optional: called before any navigation so parent can close a sheet etc. */
  onBeforeNavigate?: () => void;
  /** Compact mode: hides static guidance sections (building control guide, NICEIC/NAPIT info).
   *  Used when embedded in the bell icon sheet. */
  compact?: boolean;
}

export const NotificationsManager = ({ onNavigate, onBeforeNavigate, compact = false }: NotificationsManagerProps) => {
  const navigate = useNavigate();
  const { notifications, isLoading, updateNotification, deleteNotification } = useNotifications();
  const { reminders, isLoading: expIsLoading } = useExpiryReminders();
  const { data: elecIdAlerts = [] } = useElecIdExpiryAlerts();
  const { data: financeAlerts } = useFinanceAlerts();
  const { data: taskAlerts } = useTaskAlerts();
  const { data: equipmentAlerts = [] } = useSafetyEquipmentAlerts();
  const { toast } = useToast();

  /** Navigate to a section — cross-app routes use React Router, inspection sections use prop */
  const handleNav = useCallback((section: string, reportId?: string, reportType?: string) => {
    onBeforeNavigate?.();
    if (CROSS_APP_ROUTES[section]) {
      navigate(CROSS_APP_ROUTES[section]);
    } else {
      onNavigate?.(section, reportId, reportType);
    }
  }, [navigate, onNavigate, onBeforeNavigate]);

  // Expiry alerts: overdue or due within 60 days, not yet completed
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

  // Check company profile for scheme membership
  useEffect(() => {
    const checkSchemeMembership = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setIsRegistered(false);
        return;
      }

      const { data: companyProfile } = await supabase
        .from('company_profiles')
        .select('niceic_number, napit_number')
        .eq('user_id', user.id)
        .single();

      if (companyProfile) {
        const hasNiceic = !!companyProfile.niceic_number;
        const hasNapit = !!companyProfile.napit_number;
        setShowNiceic(hasNiceic);
        setShowNapit(hasNapit);
        setIsRegistered(hasNiceic || hasNapit);
      } else {
        setIsRegistered(false);
      }
    };

    checkSchemeMembership();
  }, []);

  const handleViewCertificate = (reportId: string, reportType: string) => {
    // Map report_type to section names
    const sectionMap: Record<string, string> = {
      eicr: 'eicr',
      eic: 'eic',
      'minor-works': 'minor-works',
    };

    const section = sectionMap[reportType] || reportType;
    handleNav(section, reportId, reportType);
  };

  if (isLoading && expIsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      {/* ── Re-Inspection Due Alerts ── */}
      {expiryAlerts.length > 0 && (
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 px-1">
            <CalendarClock className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-foreground">
              Re-Inspections Due
            </h3>
            <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400">
              {expiryAlerts.length}
            </span>
          </div>
          {expiryAlerts.map((reminder) => (
            <CertExpiryCard key={reminder.id} reminder={reminder} />
          ))}
          <div className="border-b border-border/30 pt-2" />
        </div>
      )}

      {/* ── Elec-ID Expiry Alerts ── */}
      {elecIdAlerts.length > 0 && (
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 px-1">
            <ShieldAlert className="w-4 h-4 text-yellow-400" />
            <h3 className="text-sm font-semibold text-foreground">Elec-ID Expiry</h3>
            <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400">
              {elecIdAlerts.length}
            </span>
          </div>
          {elecIdAlerts.map((alert) => (
            <ElecIdExpiryCard
              key={alert.id}
              alert={alert}
              onNavigate={() => handleNav('elec-id')}
            />
          ))}
          <div className="border-b border-border/30 pt-2" />
        </div>
      )}

      {/* ── Safety Equipment Calibration / Inspection ── */}
      {equipmentAlerts.length > 0 && (
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Wrench className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-foreground">Equipment Due</h3>
            <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400">
              {equipmentAlerts.length}
            </span>
          </div>
          {equipmentAlerts.map((alert) => (
            <SafetyEquipmentCard
              key={alert.id}
              alert={alert}
              onNavigate={() => handleNav('safety-equipment')}
            />
          ))}
          <div className="border-b border-border/30 pt-2" />
        </div>
      )}

      {/* ── Overdue Tasks ── */}
      {(taskAlerts?.overdueTasks.length ?? 0) > 0 && (
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 px-1">
            <CheckSquare className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-semibold text-foreground">Overdue Tasks</h3>
            <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400">
              {taskAlerts!.overdueTasks.length}
            </span>
          </div>
          <OverdueTasksCard
            tasks={taskAlerts!.overdueTasks}
            onNavigate={() => handleNav('tasks')}
          />
          <div className="border-b border-border/30 pt-2" />
        </div>
      )}

      {/* ── Jobs Today ── */}
      {(taskAlerts?.jobsDueToday.length ?? 0) > 0 && (
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Clock className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Today's Jobs</h3>
            <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-primary/15 text-primary">
              {taskAlerts!.jobsDueToday.length}
            </span>
          </div>
          {taskAlerts!.jobsDueToday.map((job) => (
            <JobDueCard key={job.id} job={job} onNavigate={() => handleNav('calendar')} />
          ))}
          <div className="border-b border-border/30 pt-2" />
        </div>
      )}

      {/* ── Jobs Tomorrow ── */}
      {(taskAlerts?.jobsDueTomorrow.length ?? 0) > 0 && (
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Clock className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-foreground">Tomorrow's Jobs</h3>
            <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400">
              {taskAlerts!.jobsDueTomorrow.length}
            </span>
          </div>
          {taskAlerts!.jobsDueTomorrow.map((job) => (
            <JobDueCard key={job.id} job={job} onNavigate={() => handleNav('calendar')} />
          ))}
          <div className="border-b border-border/30 pt-2" />
        </div>
      )}

      {/* ── Overdue Invoices ── */}
      {(financeAlerts?.overdueInvoices.length ?? 0) > 0 && (
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 px-1">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-semibold text-foreground">Overdue Invoices</h3>
            <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-red-500/15 text-red-400">
              {financeAlerts!.overdueInvoices.length}
            </span>
          </div>
          {financeAlerts!.overdueInvoices.map((invoice) => (
            <OverdueInvoiceCard
              key={invoice.id}
              invoice={invoice}
              onNavigate={() => handleNav('invoices')}
            />
          ))}
          <div className="border-b border-border/30 pt-2" />
        </div>
      )}

      {/* ── Expiring Quotes ── */}
      {(financeAlerts?.expiringQuotes.length ?? 0) > 0 && (
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Clock className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-foreground">Quotes Expiring Soon</h3>
            <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400">
              {financeAlerts!.expiringQuotes.length}
            </span>
          </div>
          {financeAlerts!.expiringQuotes.map((quote) => (
            <ExpiringQuoteCard
              key={quote.id}
              quote={quote}
              onNavigate={() => handleNav('quotes')}
            />
          ))}
          <div className="border-b border-border/30 pt-2" />
        </div>
      )}

      {/* ── Invoice Paid ── */}
      {(financeAlerts?.recentPaidInvoices.length ?? 0) > 0 && (
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 px-1">
            <Banknote className="w-4 h-4 text-green-400" />
            <h3 className="text-sm font-semibold text-foreground">Payments Received</h3>
            <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">
              {financeAlerts!.recentPaidInvoices.length}
            </span>
          </div>
          {financeAlerts!.recentPaidInvoices.map((invoice) => (
            <InvoicePaidCard
              key={invoice.id}
              invoice={invoice}
              onNavigate={() => handleNav('invoices')}
            />
          ))}
          <div className="border-b border-border/30 pt-2" />
        </div>
      )}

      {/* ── Quote Activity (accepted / rejected) ── */}
      {(financeAlerts?.recentQuoteActivity.length ?? 0) > 0 && (
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 px-1">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <h3 className="text-sm font-semibold text-foreground">Quote Activity</h3>
            <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">
              {financeAlerts!.recentQuoteActivity.length}
            </span>
          </div>
          {financeAlerts!.recentQuoteActivity.map((activity) => (
            <QuoteActivityCard
              key={activity.id}
              activity={activity}
              onNavigate={() => handleNav('quotes')}
            />
          ))}
          <div className="border-b border-border/30 pt-2" />
        </div>
      )}

      {/* User-specific guidance based on scheme membership — hidden in compact/sheet mode */}
      {!compact && isRegistered === false && (
        <NonRegisteredUserGuide onFindBuildingControl={() => setShowBuildingControlFinder(true)} />
      )}

      {!compact && isRegistered === true && (
        <RegisteredUserGuide showNiceic={showNiceic} showNapit={showNapit} />
      )}

      {/* Building Control Form Guide — hidden in compact/sheet mode */}
      {!compact && <Collapsible open={isFormGuideOpen} onOpenChange={setIsFormGuideOpen} className="mb-6">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-card/80 hover:bg-card rounded-2xl transition-all border border-border/50 hover:border-primary/30 group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="text-base">📋</span>
            </div>
            <span className="text-sm font-semibold text-foreground">
              What to Submit to Building Control
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
              isFormGuideOpen ? 'rotate-180' : ''
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ScrollArea className="h-[400px] mt-3 rounded-2xl border border-border/50 bg-card/50">
            <div className="p-4">
              <BuildingControlFormGuide />
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>}

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

      {/* Global Building Control Finder Dialog */}
      <BuildingControlFinder
        open={showBuildingControlFinder}
        onOpenChange={setShowBuildingControlFinder}
        onSelect={(authority) => {
          toast({
            title: 'Building Control Found',
            description: `${authority} - Use the contact details to submit your notification directly.`,
          });
        }}
      />
    </>
  );
};
