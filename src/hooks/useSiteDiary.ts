import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

/* ==========================================================================
   Site diary (ELE-1964): one list per job that merges the office's daily
   logs (progress_logs) and the crew's progress notes (employer_job_comments,
   comment_type 'progress'), from get_site_diary. Photos on both are
   visual-uploads paths; who clocked in that day comes from timesheets.
   ========================================================================== */

// RPCs postdate the last types.ts regeneration.
const rpc = supabase.rpc.bind(supabase) as unknown as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;

export type DiaryKind = 'office' | 'team';

export interface DiaryEntry {
  kind: DiaryKind;
  id: string;
  job_id: string;
  job_title: string | null;
  client: string | null;
  entry_date: string;
  created_at: string;
  author_name: string;
  author_role: 'office' | 'crew';
  author_employee_id: string | null;
  body: string | null;
  work_planned: string | null;
  materials_used: string | null;
  issues_encountered: string | null;
  delays: string | null;
  notes: string | null;
  weather: string | null;
  workers_on_site: number | null;
  photos: string[];
  signed_off: boolean;
  signed_off_at: string | null;
  shared_with_client: boolean;
  edited_at: string | null;
}

export interface DiaryOnSite {
  job_id: string;
  date: string;
  names: string[] | null;
  hours: number | null;
}

export interface SiteDiary {
  entries: DiaryEntry[];
  onSite: DiaryOnSite[];
}

export const SITE_DIARY_KEY = ['site-diary'] as const;

export function useSiteDiary(jobId?: string | null) {
  return useQuery({
    queryKey: [...SITE_DIARY_KEY, jobId ?? 'all'],
    staleTime: 30 * 1000,
    queryFn: async (): Promise<SiteDiary> => {
      const { data, error } = await rpc('get_site_diary', { p_job_id: jobId ?? null, p_since: null });
      if (error) throw new Error(error.message);
      const d = (data ?? {}) as { entries?: DiaryEntry[]; on_site?: DiaryOnSite[] };
      return {
        entries: (d.entries ?? []).map((e) => ({ ...e, photos: Array.isArray(e.photos) ? e.photos : [] })),
        onSite: d.on_site ?? [],
      };
    },
  });
}

export function useSetDiaryShared() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (v: { kind: DiaryKind; id: string; shared: boolean }) => {
      const { error } = await rpc('set_diary_entry_shared', {
        p_kind: v.kind,
        p_id: v.id,
        p_shared: v.shared,
      });
      if (error) throw new Error(error.message);
      return v;
    },
    onSuccess: (v) => {
      qc.invalidateQueries({ queryKey: SITE_DIARY_KEY });
      toast({
        title: v.shared ? 'Shared with the client' : 'No longer shared',
        description: v.shared
          ? 'This entry can now show on the client portal.'
          : 'Only your team can see this entry.',
      });
    },
    onError: (e: Error) =>
      toast({ title: 'Could not change sharing', description: e.message, variant: 'destructive' }),
  });
}
