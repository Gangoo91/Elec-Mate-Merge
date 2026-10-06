import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  toFinanceSummary,
  toJobFinance,
  type FinanceSummary,
  type JobFinance,
  type MonthlyFinance,
} from '@/lib/financeDefinitions';

/**
 * React Query wrappers for the shared finance model (see
 * src/lib/financeDefinitions.ts). Every money figure in the Employer Hub reads
 * one of these — never a client-side sum.
 *
 * The RPCs postdate the last types.ts regeneration, so calls go through an
 * untyped caller.
 */

const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;

export const FINANCE_MODEL_KEY = ['finance-model'] as const;

/** Headline figures for a period; pass nulls for all time. */
export function useFinanceSummary(from: string | null, to: string | null) {
  return useQuery({
    queryKey: [...FINANCE_MODEL_KEY, 'summary', from, to],
    queryFn: async (): Promise<FinanceSummary> => {
      const { data, error } = await rpc('get_finance_summary', { p_from: from, p_to: to });
      if (error) throw new Error(error.message);
      return toFinanceSummary(((data as Record<string, unknown>[] | null) ?? [])[0]);
    },
    staleTime: 30_000,
  });
}

/** Last N calendar months, oldest first — same maths as the summary. */
export function useFinanceMonthly(months = 6) {
  return useQuery({
    queryKey: [...FINANCE_MODEL_KEY, 'monthly', months],
    queryFn: async (): Promise<MonthlyFinance[]> => {
      const { data, error } = await rpc('get_finance_monthly', { p_months: months });
      if (error) throw new Error(error.message);
      return ((data as Record<string, unknown>[] | null) ?? []).map((r) => {
        const start = String(r.month_start);
        const d = new Date(`${start}T12:00:00`);
        return {
          moneyVisible: r.total_costs !== null && r.total_costs !== undefined,
          monthStart: start,
          label: d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }),
          invoiced: Number(r.invoiced) || 0,
          paidIn: Number(r.paid_in) || 0,
          totalCosts: Number(r.total_costs) || 0,
          grossProfit: Number(r.gross_profit) || 0,
        };
      });
    },
    staleTime: 60_000,
  });
}

/** Per-job finance. No id = every live job in the firm. */
export function useJobFinanceList() {
  return useQuery({
    queryKey: [...FINANCE_MODEL_KEY, 'jobs'],
    queryFn: async (): Promise<JobFinance[]> => {
      const { data, error } = await rpc('get_job_finance', { p_job_id: null });
      if (error) throw new Error(error.message);
      return ((data as Record<string, unknown>[] | null) ?? []).map(toJobFinance);
    },
    staleTime: 30_000,
  });
}

export function useJobFinance(jobId: string | undefined) {
  return useQuery({
    queryKey: [...FINANCE_MODEL_KEY, 'job', jobId],
    enabled: !!jobId,
    queryFn: async (): Promise<JobFinance | null> => {
      const { data, error } = await rpc('get_job_finance', { p_job_id: jobId });
      if (error) throw new Error(error.message);
      const row = ((data as Record<string, unknown>[] | null) ?? [])[0];
      return row ? toJobFinance(row) : null;
    },
    staleTime: 15_000,
  });
}

export interface JobCostEntry {
  id: string;
  category: 'labour_adjustment' | 'materials' | 'equipment' | 'overheads' | 'other';
  amount: number;
  incurred_on: string;
  note: string | null;
  previous_value: number | null;
  new_value: number | null;
  created_by_name: string | null;
  created_at: string;
}

/** The job's manual cost and labour-override log, newest first. */
export function useJobCostEntries(jobId: string | undefined) {
  return useQuery({
    queryKey: [...FINANCE_MODEL_KEY, 'job-cost-entries', jobId],
    enabled: !!jobId,
    queryFn: async (): Promise<JobCostEntry[]> => {
      const { data, error } = await supabase
        .from('employer_job_cost_entries' as never)
        .select(
          'id, category, amount, incurred_on, note, previous_value, new_value, created_by_name, created_at'
        )
        .eq('job_id' as never, jobId as never)
        .order('created_at' as never, { ascending: false });
      if (error) throw new Error(error.message);
      return ((data as JobCostEntry[] | null) ?? []).map((e) => ({
        ...e,
        amount: Number(e.amount) || 0,
      }));
    },
  });
}

function useInvalidateFinance() {
  const qc = useQueryClient();
  return (jobId?: string) => {
    qc.invalidateQueries({ queryKey: FINANCE_MODEL_KEY });
    qc.invalidateQueries({ queryKey: ['job-financials'] });
    qc.invalidateQueries({ queryKey: ['employer-hub-counts'] });
    if (jobId) qc.invalidateQueries({ queryKey: ['job-hub-summary', jobId] });
  };
}

/** Record a manual cost (materials bought outside a PO, equipment, overheads, other). */
export function useRecordJobCost() {
  const invalidate = useInvalidateFinance();
  return useMutation({
    mutationFn: async (input: {
      jobId: string;
      category: 'materials' | 'equipment' | 'overheads' | 'other';
      amount: number;
      incurredOn?: string;
      note?: string;
    }) => {
      const { error } = await rpc('record_job_cost', {
        p_job_id: input.jobId,
        p_category: input.category,
        p_amount: input.amount,
        p_incurred_on: input.incurredOn || null,
        p_note: input.note || null,
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: (_d, v) => invalidate(v.jobId),
  });
}

/** Override a job's labour cost. The reason is logged with the before/after. */
export function useSetJobLabour() {
  const invalidate = useInvalidateFinance();
  return useMutation({
    mutationFn: async (input: { jobId: string; amount: number; reason: string }) => {
      const { error } = await rpc('set_job_labour', {
        p_job_id: input.jobId,
        p_amount: input.amount,
        p_reason: input.reason,
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: (_d, v) => invalidate(v.jobId),
  });
}

/* ── Hub landing counts ─────────────────────────────────────────────── */

export interface HubCounts {
  jobs: {
    completed_7d: number;
    on_site_now: number;
    progress_logs_7d: number;
    last_progress_log: string | null;
    tests_total: number;
    tests_failed: number;
    tests_pending: number;
    snags_open: number;
    photos_total: number;
    photos_7d: number;
    open_pos: number;
    jobs_invoiced: number;
    /** null when the caller may not see the firm's money (office). */
    jobs_gross_profit: number | null;
    jobs_loss_making: number | null;
  };
  safety: { rams_pending: number };
  docs: {
    rams: number;
    method_statements: number;
    designs: number;
    briefing_packs: number;
    recent: { kind: 'rams' | 'method_statement' | 'design' | 'briefing_pack'; title: string; at: string }[];
  };
}

export function useEmployerHubCounts() {
  return useQuery({
    queryKey: ['employer-hub-counts'],
    queryFn: async (): Promise<HubCounts> => {
      const { data, error } = await rpc('get_employer_hub_counts');
      if (error) throw new Error(error.message);
      return data as HubCounts;
    },
    staleTime: 60_000,
  });
}
