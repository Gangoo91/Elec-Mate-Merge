/**
 * Worker "My Jobs" job page data (ELE-1999).
 *
 * One server call (get_my_job_detail) returns everything the sparky needs on
 * site: who to ask for (role-aware — apprentices get their supervisor), the
 * office phone, access notes, the job's photos and drawings, the last crew
 * notes with authors, who else is on the job and "my part" state. The call is
 * scoped to the caller's CURRENT firm and marks the assignment as seen, which
 * clears the "New" badge on the list.
 */
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OFFLINE_FIRST, offlineSnapshot } from '@/lib/workerOfflineCache';
import { supabase } from '@/integrations/supabase/client';

export interface JobContact {
  kind: 'site' | 'client' | 'supervisor';
  name: string | null;
  phone: string | null;
}

export interface JobFile {
  id: string;
  /** job-photos bucket path */
  path: string;
  category: string | null;
  notes: string | null;
  created_at: string;
}

export interface JobNote {
  id: string;
  content: string;
  photos: string[];
  author_name: string | null;
  from_office: boolean;
  mine: boolean;
  created_at: string;
  edited_at: string | null;
}

export interface JobCrewMember {
  name: string;
  role_on_job: string | null;
  me: boolean;
  finished_at: string | null;
}

export interface MyJobDetail {
  job_id: string;
  is_apprentice: boolean;
  contact: JobContact | null;
  office_phone: string | null;
  access_notes: string | null;
  board_stage: string | null;
  lat: number | null;
  lng: number | null;
  mine: {
    assignment_id: string;
    finished_at: string | null;
    finished_note: string | null;
    /** Still on the job (assignment current) — can mark finished / reopen. */
    can_finish: boolean;
  };
  files: JobFile[];
  notes: JobNote[];
  crew: JobCrewMember[];
}

export function useMyJobDetail(jobId: string | null | undefined) {
  const queryClient = useQueryClient();
  const query = useQuery<MyJobDetail>({
    queryKey: ['my-job-detail', jobId],
    // ELE-1828: the job page (and its pack text) opens with no signal.
    ...OFFLINE_FIRST,
    queryFn: () => offlineSnapshot(`my-job-detail:${jobId}`, async () => {
      const { data, error } = await supabase.rpc(
        'get_my_job_detail' as never,
        { p_job_id: jobId } as never
      );
      if (error) throw error;
      const d = data as unknown as MyJobDetail;
      return {
        ...d,
        files: d.files ?? [],
        notes: (d.notes ?? []).map((n) => ({ ...n, photos: n.photos ?? [] })),
        crew: d.crew ?? [],
      };
    }),
    enabled: !!jobId,
    staleTime: 30 * 1000,
    retry: 1,
  });

  // Opening the job marks it seen server-side — refresh the list's badges.
  const loaded = query.isSuccess;
  useEffect(() => {
    if (loaded) queryClient.invalidateQueries({ queryKey: ['my-jobs'] });
  }, [loaded, jobId, queryClient]);

  return query;
}

export function useFinishMyPart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { jobId: string; note: string; photos: string[] }) => {
      const { data, error } = await supabase.rpc(
        'finish_my_part' as never,
        { p_job_id: input.jobId, p_note: input.note || null, p_photos: input.photos } as never
      );
      if (error) throw error;
      return data as unknown as {
        finished_at: string;
        all_done: boolean;
        moved_to_testing: boolean;
      };
    },
    onSuccess: (_d, v) => {
      queryClient.invalidateQueries({ queryKey: ['my-job-detail', v.jobId] });
      queryClient.invalidateQueries({ queryKey: ['my-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['progress-notes', v.jobId] });
    },
  });
}

export function useReopenMyPart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (jobId: string) => {
      const { error } = await supabase.rpc('reopen_my_part' as never, { p_job_id: jobId } as never);
      if (error) throw error;
    },
    onSuccess: (_d, jobId) => {
      queryClient.invalidateQueries({ queryKey: ['my-job-detail', jobId] });
      queryClient.invalidateQueries({ queryKey: ['my-jobs'] });
    },
  });
}

/** Postgres error → a sentence a worker can act on. */
export function rpcErrorMessage(e: unknown, fallback: string): string {
  const msg = (e as { message?: string } | null)?.message;
  if (!msg) return fallback;
  if (/failed to fetch|network/i.test(msg)) return 'No signal — try again when you have a connection.';
  return msg;
}
