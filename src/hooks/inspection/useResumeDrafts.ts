import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ResumeDraftInfo {
  /** Number of editable (draft / in-progress) certs of this type. */
  count: number;
  /** report_id of the most recently edited draft — the one "Resume" opens. */
  latestReportId: string;
  latestUpdatedAt: string;
}

/** Map of report_type → resumable-draft info. Types with no drafts are absent. */
export type DraftsByType = Record<string, ResumeDraftInfo>;

/**
 * Surfaces in-progress work so the certificate-type tiles can offer "Resume"
 * instead of always starting blank. One light query (ids + timestamps only),
 * grouped client-side; the newest draft per type wins because we order desc.
 */
export const useResumeDrafts = () => {
  return useQuery<DraftsByType>({
    queryKey: ['resume-drafts'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return {};

      const { data, error } = await supabase
        .from('reports')
        .select('report_id, report_type, updated_at')
        .eq('user_id', user.id)
        .in('status', ['draft', 'in-progress'])
        .is('deleted_at', null)
        .order('updated_at', { ascending: false });

      if (error || !data) return {};

      const map: DraftsByType = {};
      for (const row of data as Array<{ report_id: string; report_type: string; updated_at: string }>) {
        const type = row.report_type;
        if (!map[type]) {
          map[type] = { count: 0, latestReportId: row.report_id, latestUpdatedAt: row.updated_at };
        }
        map[type].count += 1;
      }
      return map;
    },
    staleTime: 30_000,
  });
};
