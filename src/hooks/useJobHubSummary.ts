import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * The job control-centre rollup — one call (get_job_hub_summary RPC) returns the
 * whole job's money flow + signals from every linked table (quotes, invoices,
 * timesheets, tests, issues, financials). The RPC is new, so the rpc caller is
 * cast until the generated types catch up.
 */
export interface JobHubSummary {
  job_value: number | null;
  quote: {
    count: number;
    value: number;
    status: string | null;
    quote_number: string | null;
    id: string;
  } | null;
  quotes: { id: string; quote_number: string | null; status: string | null; value: number }[];
  invoiced: number;
  paid: number;
  invoice_count: number;
  invoices: {
    id: string;
    invoice_number: string | null;
    status: string | null;
    amount: number;
    paid: boolean;
  }[];
  labour_hours: number;
  /** null for office managers (ELE-1831). */
  labour_cost: number | null;
  tests_total: number;
  tests_passed: number;
  tests_failed: number;
  issues_open: number;
  issues_critical: number;
  budget_total: number | null;
  /** Total job costs from the shared finance model. */
  actual_total: number | null;
  outstanding?: number;
  /** The job's full row from get_job_finance (snake_case), when available. */
  finance?: {
    labour_adjustments?: number | null;
    gross_profit?: number | null;
    margin_pct?: number | null;
    total_costs?: number | null;
    contract_value?: number | null;
    /** true when the caller may not see this firm's costs/profit. */
    money_hidden?: boolean;
  } | null;
}

const rpc = (supabase.rpc.bind(supabase) as unknown) as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: unknown }>;

export const useJobHubSummary = (jobId: string | undefined) =>
  useQuery({
    queryKey: ['job-hub-summary', jobId],
    enabled: !!jobId,
    staleTime: 60_000,
    queryFn: async (): Promise<JobHubSummary | null> => {
      if (!jobId) return null;
      const { data, error } = await rpc('get_job_hub_summary', { p_job_id: jobId });
      if (error) throw error;
      const r = data as (JobHubSummary & { error?: string }) | null;
      if (!r || r.error) return null;
      return r;
    },
  });
