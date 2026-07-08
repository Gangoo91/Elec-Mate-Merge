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
  invoiced: number;
  paid: number;
  invoice_count: number;
  labour_hours: number;
  labour_cost: number;
  tests_total: number;
  tests_passed: number;
  tests_failed: number;
  issues_open: number;
  issues_critical: number;
  budget_total: number | null;
  actual_total: number | null;
}

const rpc = supabase.rpc as unknown as (
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
