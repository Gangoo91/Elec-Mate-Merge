import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface LinkableProject {
  id: string;
  title: string;
  customerId: string | null;
  location: string | null;
}

/**
 * Projects a diary block can be booked against.
 *
 * Deliberately not `useSparkProjects`, which fires the `get_jobs_overview` RPC
 * and opens a realtime channel — far more than a picker in a sheet needs.
 * Finished and cancelled work is left out: you do not book time against a job
 * that is done.
 */
export function useLinkableProjects(enabled = true) {
  return useQuery({
    queryKey: ['linkable-projects'],
    enabled,
    staleTime: 60_000,
    queryFn: async (): Promise<LinkableProject[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('spark_projects')
        .select('id, title, customer_id, location, status, updated_at')
        .eq('user_id', user.id)
        .not('status', 'in', '("completed","cancelled")')
        .order('updated_at', { ascending: false })
        .limit(200);

      if (error) throw error;

      return ((data ?? []) as Array<Record<string, unknown>>).map((row) => ({
        id: row.id as string,
        title: (row.title as string) ?? 'Untitled project',
        customerId: (row.customer_id as string | null) ?? null,
        location: (row.location as string | null) ?? null,
      }));
    },
  });
}
