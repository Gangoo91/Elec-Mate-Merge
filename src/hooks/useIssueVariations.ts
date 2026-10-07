import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { getActingEmployerId } from '@/lib/actingEmployer';

/* Variation orders raised from job issues (ELE-1967). variation_orders.job_issue_id
   links the order to the Variation issue it came from. */

// variation_orders.job_issue_id and raise_variation_order postdate the last
// types.ts regeneration, so these two calls go through a narrow untyped view.
type Res = Promise<{ data: unknown; error: { message: string } | null }>;
const db = supabase as unknown as {
  from: (t: string) => {
    select: (s: string) => {
      eq: (c: string, v: string) => {
        not: (c: string, op: string, v: null) => {
          order: (c: string, o: { ascending: boolean }) => Res;
        };
      };
    };
  };
  rpc: (fn: string, args?: Record<string, unknown>) => Res;
};

export interface IssueVariation {
  id: string;
  job_id: string;
  job_issue_id: string;
  description: string | null;
  value: number | null;
  status: 'Pending' | 'Approved' | 'Rejected' | string;
  approved_by: string | null;
  approved_date: string | null;
  created_at: string;
}

export const voReference = (id: string) => `VO-${id.replace(/-/g, '').slice(0, 6).toUpperCase()}`;

export function useIssueVariations() {
  return useQuery({
    queryKey: ['issue-variations'],
    staleTime: 30 * 1000,
    queryFn: async (): Promise<IssueVariation[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      const firm = (await getActingEmployerId(user.id)) ?? user.id;
      const { data, error } = await db
        .from('variation_orders')
        .select('id, job_id, job_issue_id, description, value, status, approved_by, approved_date, created_at')
        .eq('user_id', firm)
        .not('job_issue_id', 'is', null)
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return (data ?? []) as IssueVariation[];
    },
  });
}

export function useRaiseVariationOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: { issueId: string; value: number; description?: string | null }) => {
      const { data, error } = await db.rpc('raise_variation_order', {
        p_issue_id: v.issueId,
        p_value: v.value,
        p_description: v.description ?? null,
      });
      if (error) throw new Error(error.message);
      return data as { id: string; existing: boolean; reference: string; value: number; status: string };
    },
    onSuccess: (r) => {
      qc.invalidateQueries({ queryKey: ['issue-variations'] });
      qc.invalidateQueries({ queryKey: ['jobIssues'] });
      qc.invalidateQueries({ queryKey: ['job-financials'] });
      qc.invalidateQueries({ queryKey: ['finance-model'] });
      qc.invalidateQueries({ queryKey: ['job-sheet-counts'] });
      toast({
        title: r.existing ? `${r.reference} already raised` : `Variation order ${r.reference} raised`,
        description: r.existing
          ? 'This issue already has a live variation order.'
          : 'It is in Job financials as Pending. Send it to the client to approve.',
      });
    },
    onError: (e: Error) =>
      toast({ title: 'Could not raise the variation order', description: e.message, variant: 'destructive' }),
  });
}
