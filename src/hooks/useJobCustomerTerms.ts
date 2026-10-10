import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useJobCustomerTerms — ELE-1982. Customer terms on one job.

   The firm's terms (company_profiles.quote_terms) print on every quote. A job
   can add its own clauses to them, or replace them for this job only. The
   server's _effective_quote_terms() applies the job's terms to that job's
   quotes, on the PDF and on the customer's accept page.

   Read: anyone in the firm. Write: the owner or an admin (server-enforced).
   ========================================================================== */

// Cast: these RPCs postdate the last types.ts regeneration.
const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message?: string } | null }>;

export type JobTermsMode = 'add' | 'replace';

export interface JobCustomerTerms {
  error?: string;
  firm_terms: string | null;
  has_job_terms: boolean;
  mode: JobTermsMode | null;
  terms: string[];
  template_keys: string[];
  updated_at: string | null;
  updated_by_name: string | null;
  quote_count: number;
  can_edit: boolean;
}

export const jobCustomerTermsKey = (jobId?: string | null) => ['job-customer-terms', jobId];

export function useJobCustomerTerms(jobId?: string | null) {
  return useQuery({
    queryKey: jobCustomerTermsKey(jobId),
    enabled: !!jobId,
    staleTime: 30_000,
    queryFn: async (): Promise<JobCustomerTerms> => {
      const { data, error } = await rpc('job_customer_terms', { p_job_id: jobId });
      if (error) throw new Error(error.message || 'Could not load the terms');
      const d = (data ?? {}) as Partial<JobCustomerTerms>;
      return {
        error: d.error,
        firm_terms: d.firm_terms ?? null,
        has_job_terms: !!d.has_job_terms,
        mode: d.mode ?? null,
        terms: Array.isArray(d.terms) ? d.terms : [],
        template_keys: Array.isArray(d.template_keys) ? d.template_keys : [],
        updated_at: d.updated_at ?? null,
        updated_by_name: d.updated_by_name ?? null,
        quote_count: Number(d.quote_count) || 0,
        can_edit: !!d.can_edit,
      };
    },
  });
}

export function useSetJobCustomerTerms() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vars: {
      jobId: string;
      mode: JobTermsMode;
      terms: string[];
      templateKeys: string[];
    }) => {
      const { data, error } = await rpc('set_job_customer_terms', {
        p_job_id: vars.jobId,
        p_mode: vars.mode,
        p_terms: vars.terms,
        p_template_keys: vars.templateKeys,
      });
      if (error) throw new Error(error.message || 'Could not save the terms');
      const d = data as { error?: string } | null;
      if (d?.error) throw new Error('That job was not found for your firm.');
      return d;
    },
    onSuccess: (_d, vars) => {
      queryClient.invalidateQueries({ queryKey: jobCustomerTermsKey(vars.jobId) });
    },
  });
}
