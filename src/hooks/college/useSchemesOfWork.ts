import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useSchemesOfWork — CRUD for `schemes_of_work` plus the joined cohort name
   and qualification title. RLS is `_ch_same_college(college_id)` so writes
   are gated automatically; we filter the query to current college as well
   to keep payloads small.
   ========================================================================== */

// Values must match the schemes_of_work_status_check DB constraint
// (draft/review/approved/published/archived). The FE uses the three the
// workflow needs; 'published' is the in-use ("Active") state.
export type SchemeStatus = 'draft' | 'published' | 'archived';

export const SCHEME_STATUS_LABEL: Record<SchemeStatus, string> = {
  draft: 'Draft',
  published: 'Active',
  archived: 'Archived',
};

export interface SchemeOfWorkRow {
  id: string;
  college_id: string;
  cohort_id: string;
  qualification_code: string;
  title: string;
  academic_year: string | null;
  start_date: string | null;
  end_date: string | null;
  status: SchemeStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  cohort_name?: string;
  qualification_title?: string;
  qualification_level?: string;
}

const QUERY_KEY = ['schemes-of-work'];

export function useSchemesOfWork() {
  const queryClient = useQueryClient();
  const { profile } = useAuth();
  const collegeId = profile?.college_id ?? null;

  // Realtime: any change in the college's schemes invalidates so peers
  // see new / updated / archived schemes within ~1s.
  useEffect(() => {
    if (!collegeId) return;
    const channel = supabase
      .channel(realtimeChannelName(`schemes-of-work:${collegeId}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'schemes_of_work',
          filter: `college_id=eq.${collegeId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [collegeId, queryClient]);

  const query = useQuery({
    queryKey: [...QUERY_KEY, collegeId],
    queryFn: async (): Promise<SchemeOfWorkRow[]> => {
      if (!collegeId) return [];
      const { data, error } = await supabase
        .from('schemes_of_work')
        .select(
          `
          id, college_id, cohort_id, qualification_code, title,
          academic_year, start_date, end_date, status, created_by,
          created_at, updated_at,
          cohort:college_cohorts(name)
        `
        )
        .eq('college_id', collegeId)
        .order('created_at', { ascending: false });
      if (error) {
        console.error('useSchemesOfWork: load failed:', error);
        throw error;
      }

      // Hydrate qualification titles with one round-trip rather than per-row.
      const codes = Array.from(
        new Set((data ?? []).map((r) => r.qualification_code).filter(Boolean))
      );
      const qualMap = new Map<string, { title: string; level: string }>();
      if (codes.length) {
        const { data: quals } = await supabase
          .from('qualifications')
          .select('code, title, level')
          .in('code', codes);
        for (const q of quals ?? []) {
          qualMap.set(q.code, { title: q.title, level: q.level });
        }
      }

      return (data ?? []).map((row) => {
        const qual = qualMap.get(row.qualification_code);
        const cohort = row.cohort as { name?: string } | null;
        return {
          ...row,
          status: row.status as SchemeStatus,
          cohort_name: cohort?.name ?? undefined,
          qualification_title: qual?.title,
          qualification_level: qual?.level,
        } as SchemeOfWorkRow;
      });
    },
    enabled: !!collegeId,
  });

  const create = useMutation({
    mutationFn: async (vars: {
      title: string;
      cohort_id: string;
      qualification_code: string;
      academic_year?: string | null;
      start_date?: string | null;
      end_date?: string | null;
      status?: SchemeStatus;
    }) => {
      if (!collegeId) throw new Error('No college context');
      const { data, error } = await supabase
        .from('schemes_of_work')
        .insert({
          college_id: collegeId,
          title: vars.title,
          cohort_id: vars.cohort_id,
          qualification_code: vars.qualification_code,
          academic_year: vars.academic_year ?? null,
          start_date: vars.start_date ?? null,
          end_date: vars.end_date ?? null,
          status: vars.status ?? 'draft',
        })
        .select('id')
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const update = useMutation({
    mutationFn: async (vars: {
      id: string;
      patch: Partial<{
        title: string;
        cohort_id: string;
        qualification_code: string;
        academic_year: string | null;
        start_date: string | null;
        end_date: string | null;
        status: SchemeStatus;
      }>;
    }) => {
      const { error } = await supabase
        .from('schemes_of_work')
        .update(vars.patch)
        .eq('id', vars.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('schemes_of_work').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const duplicate = useMutation({
    mutationFn: async (id: string) => {
      const src = (query.data ?? []).find((r) => r.id === id);
      if (!src) throw new Error('Scheme not found');
      if (!collegeId) throw new Error('No college context');
      const { error } = await supabase.from('schemes_of_work').insert({
        college_id: collegeId,
        title: `${src.title} (copy)`,
        cohort_id: src.cohort_id,
        qualification_code: src.qualification_code,
        academic_year: src.academic_year,
        start_date: src.start_date,
        end_date: src.end_date,
        status: 'draft',
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  return {
    schemes: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error as Error | null,
    refetch: query.refetch,
    create,
    update,
    remove,
    duplicate,
  };
}
