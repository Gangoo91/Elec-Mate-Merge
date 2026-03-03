import { useElecIdExpiryAlerts } from './useElecIdExpiryAlerts';
import { useFinanceAlerts } from './useFinanceAlerts';
import { useTaskAlerts } from './useTaskAlerts';
import { useSafetyEquipmentAlerts } from './useSafetyEquipmentAlerts';
import { useExpiryReminders } from './useExpiryReminders';
import { differenceInDays, parseISO } from 'date-fns';

/**
 * Sums all actionable alerts across the app for the bell badge.
 * Only counts urgent/overdue items — not heads-up or info level.
 */
export function useTotalAlertCount(): number {
  const { data: elecIdAlerts = [] } = useElecIdExpiryAlerts();
  const { data: financeAlerts } = useFinanceAlerts();
  const { data: taskAlerts } = useTaskAlerts();
  const { data: equipmentAlerts = [] } = useSafetyEquipmentAlerts();
  const { reminders = [] } = useExpiryReminders();

  // Re-inspection alerts (≤60 days, not completed)
  const expiryAlertCount = reminders.filter((r) => {
    if (r.reminder_status === 'completed') return false;
    return differenceInDays(parseISO(r.expiry_date), new Date()) <= 60;
  }).length;

  // Elec-ID: expired or urgent only (≤14 days)
  const elecIdUrgent = elecIdAlerts.filter(
    (a) => a.urgency === 'expired' || a.urgency === 'urgent'
  ).length;

  // Finance: overdue invoices + expiring quotes (always actionable)
  const overdueInvoices = financeAlerts?.overdueInvoices.length ?? 0;
  const expiringQuotes = financeAlerts?.expiringQuotes.length ?? 0;
  const quoteActivity = financeAlerts?.recentQuoteActivity.length ?? 0;
  const paidInvoices = financeAlerts?.recentPaidInvoices.length ?? 0;

  // Tasks: overdue tasks + today's jobs
  const overdueTasks = taskAlerts?.overdueTasks.length ?? 0;
  const todayJobs = taskAlerts?.jobsDueToday.length ?? 0;

  // Equipment: overdue or urgent calibration/inspection only
  const urgentEquipment = equipmentAlerts.filter(
    (a) => a.urgency === 'overdue' || a.urgency === 'urgent'
  ).length;

  return (
    expiryAlertCount +
    elecIdUrgent +
    overdueInvoices +
    expiringQuotes +
    quoteActivity +
    paidInvoices +
    overdueTasks +
    todayJobs +
    urgentEquipment
  );
}
