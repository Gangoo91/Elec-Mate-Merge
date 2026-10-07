/**
 * Recurring work for the firm (ELE-1821). One scheduler with the Electrical
 * Hub: a firm job made recurring is a `maintenance_contracts` row with
 * `source_job_id`, and the nightly generator (cron 163) books the next visit
 * as a firm job, with the same crew when asked. Renewals come from the
 * certificates' own re-test dates (the firm's, plus anything through its QS
 * review). All reads and writes go through firm-scoped RPCs.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getActingEmployerId } from '@/lib/actingEmployer';
import type { ContractFrequency } from '@/hooks/useMaintenanceContracts';

export const RECURRING_KEY = 'firm-recurring';
export const RENEWALS_KEY = 'firm-renewals';

export type RecurringStatus = 'active' | 'paused' | 'ended';

export interface FirmRecurring {
  id: string;
  title: string;
  client: string | null;
  location: string | null;
  frequency: ContractFrequency;
  frequency_custom_days: number | null;
  next_due_date: string;
  end_date: string | null;
  reminder_days_before: number;
  status: RecurringStatus;
  same_crew: boolean;
  source_job_id: string;
  auto_create_invoice: boolean;
  /** Null for office managers: money is owner/admin only. */
  amount: number | null;
  crew: string[];
  last_visit: { id: string; date: string | null; status: string } | null;
  visits: number;
}

export interface FirmRenewal {
  id: string;
  report_id: string;
  report_type: string | null;
  report_ref: string | null;
  certificate_number: string | null;
  client_name: string | null;
  installation_address: string | null;
  inspection_date: string | null;
  expiry_date: string;
  contacted_at: string | null;
  booked_for_date: string | null;
  customer_id: string | null;
  employer_job_id: string | null;
  overdue: boolean;
  /** Team member who issued it, when it isn't the firm's own certificate. */
  done_by: string | null;
}

export interface LastVisit {
  job_id: string;
  title: string;
  date: string | null;
  crew: string[];
  notes: { at: string | null; who: string | null; text: string }[];
  issues: { type: string | null; title: string | null; status: string | null; resolution: string | null }[];
}

const rpc = (name: string, args: Record<string, unknown>) =>
  // Cast: these RPCs postdate the last types.ts regeneration.
  supabase.rpc(name as never, args as never);

function useFirm() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['acting-firm', user?.id],
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => (await getActingEmployerId(user!.id)) ?? user!.id,
  });
}

export function useFirmRecurring() {
  const { data: firm } = useFirm();
  return useQuery({
    queryKey: [RECURRING_KEY, firm],
    enabled: !!firm,
    queryFn: async (): Promise<FirmRecurring[]> => {
      const { data, error } = await rpc('get_firm_recurring', { p_firm: firm });
      if (error) throw error;
      return (data as unknown as FirmRecurring[]) ?? [];
    },
  });
}

export function useFirmRenewals(days = 120) {
  const { data: firm } = useFirm();
  return useQuery({
    queryKey: [RENEWALS_KEY, firm, days],
    enabled: !!firm,
    queryFn: async (): Promise<FirmRenewal[]> => {
      const { data, error } = await rpc('get_firm_renewals', { p_firm: firm, p_days: days });
      if (error) throw error;
      return (data as unknown as FirmRenewal[]) ?? [];
    },
  });
}

export interface SetRecurringInput {
  jobId: string;
  frequency: ContractFrequency;
  nextDue: string;
  customDays?: number | null;
  leadDays?: number;
  endDate?: string | null;
  sameCrew?: boolean;
  title?: string | null;
  autoInvoice?: boolean;
  amount?: number | null;
}

function invalidateAll(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: [RECURRING_KEY] });
  qc.invalidateQueries({ queryKey: [RENEWALS_KEY] });
  qc.invalidateQueries({ queryKey: ['employer-jobs'] });
  qc.invalidateQueries({ queryKey: ['jobs'] });
}

export function useSetJobRecurring() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (i: SetRecurringInput) => {
      const { data, error } = await rpc('set_job_recurring', {
        p_job: i.jobId,
        p_frequency: i.frequency,
        p_next_due: i.nextDue,
        p_custom_days: i.frequency === 'custom' ? i.customDays ?? null : null,
        p_lead_days: i.leadDays ?? 14,
        p_end_date: i.endDate || null,
        p_same_crew: i.sameCrew ?? true,
        p_title: i.title || null,
        p_auto_invoice: i.autoInvoice ?? false,
        p_amount: i.amount ?? null,
      });
      if (error) throw error;
      return data as unknown as string;
    },
    onSuccess: () => invalidateAll(qc),
  });
}

export function useSetRecurringStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: RecurringStatus }) => {
      const { error } = await rpc('set_recurring_status', { p_contract: id, p_status: status });
      if (error) throw error;
    },
    onSuccess: () => invalidateAll(qc),
  });
}

export function useBookRenewal() {
  const qc = useQueryClient();
  const { data: firm } = useFirm();
  return useMutation({
    mutationFn: async ({
      id,
      date,
      makeRecurring,
    }: {
      id: string;
      date?: string | null;
      makeRecurring?: boolean;
    }) => {
      const { data, error } = await rpc('book_renewal_as_job', {
        p_firm: firm,
        p_reminder: id,
        p_date: date || null,
        p_make_recurring: !!makeRecurring,
      });
      if (error) throw error;
      return data as unknown as string;
    },
    onSuccess: () => invalidateAll(qc),
  });
}

/** The previous visit on a recurring job — the crew's "last time" notes. */
export function useJobLastVisit(jobId?: string | null) {
  return useQuery({
    queryKey: ['job-last-visit', jobId],
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<LastVisit | null> => {
      const { data, error } = await rpc('get_job_last_visit', { p_job: jobId });
      if (error) throw error;
      return (data as unknown as LastVisit | null) ?? null;
    },
  });
}

/** Visits and renewals falling due in the next `days` days — the Overview count. */
export function useRecurringDueSoon(days = 14) {
  const recurring = useFirmRecurring();
  const renewals = useFirmRenewals(days);
  const limit = new Date();
  limit.setDate(limit.getDate() + days);
  const iso = format(limit, 'yyyy-MM-dd');
  const visits = (recurring.data ?? []).filter((r) => r.status === 'active' && r.next_due_date <= iso).length;
  const certs = (renewals.data ?? []).filter((r) => !r.employer_job_id).length;
  return { visits, certs, total: visits + certs, isLoading: recurring.isLoading || renewals.isLoading };
}

export const nextVisitLabel = (iso?: string | null) =>
  iso
    ? new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

/** Report types read as people say them: EICR, EIC, PAT, Emergency lighting. */
export function certLabel(t?: string | null) {
  const v = (t || 'eicr').toLowerCase().trim();
  if (v.startsWith('eicr')) return 'EICR';
  if (v.startsWith('eic')) return 'EIC';
  if (v.startsWith('pat')) return 'PAT';
  if (v.startsWith('ev')) return 'EV charger';
  const s = v.replace(/[-_]/g, ' ');
  return s.charAt(0).toUpperCase() + s.slice(1);
}
