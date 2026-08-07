/**
 * Certificates that were started and never issued.
 *
 * The Electrician Hub reported "33 in progress" as a number and stopped there.
 * On the founder's own account those 33 run back to 15 January — half-written
 * EICRs sitting in the app for seven months, which is unbilled work and, for
 * anything already tested on site, a client waiting on paperwork.
 *
 * Oldest first: a cert abandoned in January is a different problem from one
 * left open this morning, and the one you are most likely to have forgotten is
 * the one you cannot see.
 *
 * `auto-draft` is excluded to match the certificates list and the dashboard
 * count — those rows are autosave snapshots, not documents anybody chose to
 * start.
 */
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface UnfinishedCertificate {
  id: string;
  /** The report_id STRING — what every certificate route is keyed on. */
  reportId: string;
  reportType: string;
  clientName: string | null;
  status: string;
  updatedAt: Date;
}

export function useUnfinishedCertificates() {
  const { data = [] } = useQuery({
    queryKey: ['unfinished-certificates'],
    queryFn: async (): Promise<UnfinishedCertificate[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data: rows, error } = await supabase
        .from('reports')
        .select('id, report_id, report_type, client_name, status, updated_at')
        .eq('user_id', user.id)
        .in('status', ['draft', 'in-progress'])
        .is('deleted_at', null)
        .order('updated_at', { ascending: true })
        .limit(50);
      if (error) throw error;

      return (rows ?? []).map((r) => ({
        id: r.id,
        reportId: r.report_id,
        reportType: r.report_type,
        clientName: r.client_name?.trim() || null,
        status: r.status,
        updatedAt: new Date(r.updated_at),
      }));
    },
    staleTime: 60_000,
  });

  return data;
}
