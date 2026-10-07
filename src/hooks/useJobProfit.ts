import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { FINANCE_MODEL_KEY } from '@/hooks/useFinanceModel';
import { useAuth } from '@/contexts/AuthContext';
import { getActingEmployerId } from '@/lib/actingEmployer';

/**
 * ELE-1824 profit per job + ELE-1823 get paid — React Query wrappers for
 * supabase/migrations/20261007275000_job_profit_and_get_paid.sql.
 *
 * Every figure is computed in SQL on the shared finance model. Office
 * managers get NULL for every cost/profit field (enforced in SQL); the types
 * below keep that null so screens say "hidden" rather than £0.
 *
 * The RPCs postdate the last types.ts regeneration, so calls go untyped.
 */
const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;

const num = (v: unknown): number | null =>
  v === null || v === undefined || v === '' ? null : Number(v);

export const JOB_PROFIT_KEY = [...FINANCE_MODEL_KEY, 'job-profit'] as const;

export interface JobProfit {
  jobId: string;
  title: string;
  client: string | null;
  jobStatus: string | null;
  jobType: string | null;
  /** 'final' once the job is completed or cancelled. */
  stage: 'running' | 'final';
  moneyVisible: boolean;
  contractValue: number;
  invoiced: number;
  paid: number;
  outstanding: number;
  invoiceCount: number;
  labour: number | null;
  labourAdjusted: boolean | null;
  expenses: number | null;
  materials: number | null;
  materialsCommitted: number | null;
  otherCosts: number | null;
  totalCosts: number | null;
  grossProfit: number | null;
  marginPct: number | null;
  forecastProfit: number | null;
  forecastMarginPct: number | null;
  /** Number of non-zero cost lines; 0 = "No costs yet". */
  costLines: number | null;
  quotedHours: number | null;
  approvedHours: number;
  pendingHours: number;
  /** Approved hours with no cost rate, pay rate or firm default. */
  uncostedHours: number | null;
  workersOnHours: number;
}

function toJobProfit(r: Record<string, unknown>): JobProfit {
  return {
    jobId: String(r.job_id),
    title: String(r.title ?? ''),
    client: (r.client as string | null) ?? null,
    jobStatus: (r.job_status as string | null) ?? null,
    jobType: (r.job_type as string | null) ?? null,
    stage: r.stage === 'final' ? 'final' : 'running',
    moneyVisible: !!r.money_visible,
    contractValue: Number(r.contract_value) || 0,
    invoiced: Number(r.invoiced) || 0,
    paid: Number(r.paid) || 0,
    outstanding: Number(r.outstanding) || 0,
    invoiceCount: Number(r.invoice_count) || 0,
    labour: num(r.labour),
    labourAdjusted: r.labour_adjusted === null ? null : !!r.labour_adjusted,
    expenses: num(r.expenses),
    materials: num(r.materials),
    materialsCommitted: num(r.materials_committed),
    otherCosts: num(r.other_costs),
    totalCosts: num(r.total_costs),
    grossProfit: num(r.gross_profit),
    marginPct: num(r.margin_pct),
    forecastProfit: num(r.forecast_profit),
    forecastMarginPct: num(r.forecast_margin_pct),
    costLines: num(r.cost_lines),
    quotedHours: num(r.quoted_hours),
    approvedHours: Number(r.approved_hours) || 0,
    pendingHours: Number(r.pending_hours) || 0,
    uncostedHours: num(r.uncosted_hours),
    workersOnHours: Number(r.workers_on_hours) || 0,
  };
}

/**
 * Keeps a job's figures live while its sheet is open: any timesheet, expense
 * or invoice change on the job refetches (the RPC recomputes from source).
 */
function useLiveJobRefresh(jobId: string | undefined) {
  const qc = useQueryClient();
  useEffect(() => {
    if (!jobId) return;
    const refresh = () => {
      qc.invalidateQueries({ queryKey: JOB_PROFIT_KEY });
      qc.invalidateQueries({ queryKey: ['job-hub-summary', jobId] });
    };
    const channel = supabase
      .channel(`job-profit-${jobId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'employer_timesheets', filter: `job_id=eq.${jobId}` },
        refresh
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'employer_expense_claims', filter: `job_id=eq.${jobId}` },
        refresh
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'quotes', filter: `employer_job_id=eq.${jobId}` },
        refresh
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [jobId, qc]);
}

export function useJobProfit(jobId: string | undefined) {
  useLiveJobRefresh(jobId);
  return useQuery({
    queryKey: [...JOB_PROFIT_KEY, jobId],
    enabled: !!jobId,
    staleTime: 15_000,
    refetchOnWindowFocus: true,
    queryFn: async (): Promise<JobProfit | null> => {
      const { data, error } = await rpc('get_job_profit', { p_job_id: jobId });
      if (error) throw new Error(error.message);
      const row = ((data as Record<string, unknown>[] | null) ?? [])[0];
      return row ? toJobProfit(row) : null;
    },
  });
}

/** Every live job in the firm (Job financials list: hours vs quoted). */
export function useJobProfitList() {
  return useQuery({
    queryKey: [...JOB_PROFIT_KEY, 'all'],
    staleTime: 30_000,
    queryFn: async (): Promise<JobProfit[]> => {
      const { data, error } = await rpc('get_job_profit', { p_job_id: null });
      if (error) throw new Error(error.message);
      return ((data as Record<string, unknown>[] | null) ?? []).map(toJobProfit);
    },
  });
}

// ─── Reports: margin by job type and by worker ─────────────────────────────

export interface MarginRow {
  dimension: 'job_type' | 'worker';
  key: string;
  label: string;
  jobs: number;
  hours: number;
  invoiced: number;
  costs: number;
  grossProfit: number;
  marginPct: number | null;
  quotedHours: number | null;
  actualHoursOnQuoted: number | null;
}

export function useMarginBreakdown(from: string | null, to: string | null, enabled = true) {
  return useQuery({
    queryKey: [...FINANCE_MODEL_KEY, 'margin-breakdown', from, to],
    enabled,
    staleTime: 60_000,
    queryFn: async (): Promise<MarginRow[]> => {
      const { data, error } = await rpc('get_margin_breakdown', { p_from: from, p_to: to });
      if (error) throw new Error(error.message);
      return ((data as Record<string, unknown>[] | null) ?? []).map((r) => ({
        dimension: r.dimension === 'worker' ? 'worker' : 'job_type',
        key: String(r.key),
        label: String(r.label ?? ''),
        jobs: Number(r.jobs) || 0,
        hours: Number(r.hours) || 0,
        invoiced: Number(r.invoiced) || 0,
        costs: Number(r.costs) || 0,
        grossProfit: Number(r.gross_profit) || 0,
        marginPct: num(r.margin_pct),
        quotedHours: num(r.quoted_hours),
        actualHoursOnQuoted: num(r.actual_hours_on_quoted),
      }));
    },
  });
}

// ─── Quoting loop: "your last five of these" ───────────────────────────────

export interface JobTypeHistory {
  jobType: string;
  count: number;
  avgHours: number | null;
  avgQuotedHours: number | null;
  quotedCount: number;
  jobs: { id: string; title: string; hours: number; quoted_hours: number | null }[];
}

export function useJobTypeHoursHistory(jobType: string | null | undefined, excludeJobId?: string) {
  const type = (jobType ?? '').trim();
  return useQuery({
    queryKey: ['job-type-hours', type, excludeJobId ?? null],
    enabled: type.length > 0,
    staleTime: 5 * 60_000,
    queryFn: async (): Promise<JobTypeHistory | null> => {
      const { data, error } = await rpc('get_job_type_hours_history', {
        p_job_type: type,
        p_exclude_job: excludeJobId ?? null,
      });
      if (error) throw new Error(error.message);
      const r = data as Record<string, unknown> | null;
      if (!r) return null;
      return {
        jobType: String(r.job_type ?? type),
        count: Number(r.count) || 0,
        avgHours: num(r.avg_hours),
        avgQuotedHours: num(r.avg_quoted_hours),
        quotedCount: Number(r.quoted_count) || 0,
        jobs: (r.jobs as JobTypeHistory['jobs']) ?? [],
      };
    },
  });
}

/** The firm the signed-in person acts for (owner id; a manager's employer). */
export function useActingFirmId() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['acting-firm-id', user?.id],
    enabled: !!user,
    staleTime: 5 * 60_000,
    queryFn: async () => (await getActingEmployerId(user!.id)) ?? user!.id,
  });
}

// ─── Cost rates (owner/admin only; SQL refuses everyone else) ─────────────

export interface TeamCostRate {
  employeeId: string | null;
  name: string;
  payRate: number | null;
  costRate: number | null;
  effectiveRate: number | null;
  rateSource: 'cost_rate' | 'pay_rate' | 'firm_default' | 'none';
}

export function useTeamCostRates(firmId: string | null | undefined, enabled = true) {
  return useQuery({
    queryKey: ['team-cost-rates', firmId],
    enabled: !!firmId && enabled,
    staleTime: 60_000,
    queryFn: async (): Promise<TeamCostRate[]> => {
      const { data, error } = await rpc('get_team_cost_rates', { p_firm: firmId });
      if (error) throw new Error(error.message);
      return ((data as Record<string, unknown>[] | null) ?? []).map((r) => ({
        employeeId: (r.employee_id as string | null) ?? null,
        name: String(r.name ?? ''),
        payRate: num(r.pay_rate),
        costRate: num(r.cost_rate),
        effectiveRate: num(r.effective_rate),
        rateSource: (r.rate_source as TeamCostRate['rateSource']) ?? 'none',
      }));
    },
  });
}

export function useSetTeamCostRate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { firmId: string; employeeId: string | null; rate: number | null }) => {
      const { error } = await rpc('set_team_cost_rate', {
        p_firm: input.firmId,
        p_employee: input.employeeId,
        p_rate: input.rate,
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['team-cost-rates'] });
      qc.invalidateQueries({ queryKey: FINANCE_MODEL_KEY });
      qc.invalidateQueries({ queryKey: ['job-hub-summary'] });
    },
  });
}

// ─── Card payments: the FIRM's Stripe Connect state ───────────────────────

export interface FirmCardPayments {
  employerId: string;
  /** none · pending · restricted · active */
  status: string;
  /** Only the owner can switch card payments on (the account is theirs). */
  isOwner: boolean;
  sentWithoutLink90d: number;
  valueWithoutLink90d: number;
  cardPayments90d: number;
}

export function useFirmCardPayments(firmId: string | null | undefined) {
  return useQuery({
    queryKey: ['firm-card-payments', firmId],
    enabled: !!firmId,
    staleTime: 60_000,
    queryFn: async (): Promise<FirmCardPayments | null> => {
      const { data, error } = await rpc('get_firm_card_payments');
      if (error) throw new Error(error.message);
      const rows = (data as Record<string, unknown>[] | null) ?? [];
      const r = rows.find((x) => x.employer_id === firmId);
      if (!r) return null;
      return {
        employerId: String(r.employer_id),
        status: String(r.status ?? 'none'),
        isOwner: !!r.is_owner,
        sentWithoutLink90d: Number(r.sent_without_link_90d) || 0,
        valueWithoutLink90d: Number(r.value_without_link_90d) || 0,
        cardPayments90d: Number(r.card_payments_90d) || 0,
      };
    },
  });
}

// ─── Worker: hours on this job + invoice paid/unpaid ───────────────────────

export interface MyJobMoneyStatus {
  quotedHours: number | null;
  approvedHours: number;
  pendingHours: number;
  myHours: number;
  showInvoices: boolean;
  cardPayments: boolean;
  invoices: {
    id: string;
    number: string | null;
    state: 'sent' | 'overdue' | 'paid';
    amount: number;
    balance: number;
    paid_at: string | null;
    paid_on: string | null;
    method: string | null;
    pay_url: string | null;
  }[];
}

export function useMyJobMoneyStatus(jobId: string | undefined) {
  return useQuery({
    queryKey: ['my-job-money-status', jobId],
    enabled: !!jobId,
    staleTime: 10_000,
    refetchOnWindowFocus: true,
    // While something is unpaid, look again every 15s so "Paid" lands on the
    // phone within seconds of the customer paying at the door.
    refetchInterval: (q) => {
      const d = q.state.data as MyJobMoneyStatus | undefined;
      return d?.invoices.some((i) => i.state !== 'paid') ? 15_000 : false;
    },
    queryFn: async (): Promise<MyJobMoneyStatus> => {
      const { data, error } = await rpc('get_my_job_money_status', { p_job_id: jobId });
      if (error) throw new Error(error.message);
      const r = (data as Record<string, unknown>) ?? {};
      return {
        quotedHours: num(r.quoted_hours),
        approvedHours: Number(r.approved_hours) || 0,
        pendingHours: Number(r.pending_hours) || 0,
        myHours: Number(r.my_hours) || 0,
        showInvoices: !!r.show_invoices,
        cardPayments: !!r.card_payments,
        invoices: ((r.invoices as MyJobMoneyStatus['invoices']) ?? []).map((i) => ({
          ...i,
          amount: Number(i.amount) || 0,
          balance: Number(i.balance) || 0,
        })),
      };
    },
  });
}
