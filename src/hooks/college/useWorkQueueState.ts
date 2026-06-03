import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

/* ==========================================================================
   useWorkQueueState — per-tutor in-progress / completed state for the
   aggregated /college work queue. Source rows (grades, ILPs, EPAs,
   portfolio submissions) don't carry "I'm working on this" state on
   themselves, so we track that here per (staff_id, source_type, source_id).

   Same-college staff can read each other's rows (so you can see a peer
   is already on something); only the owner can write.
   ========================================================================== */

export type WorkQueueSourceType = 'grade' | 'ilp' | 'gateway' | 'portfolio';
export type WorkQueueStateStatus = 'In Progress' | 'Completed';

export interface WorkQueueStateRow {
  id: string;
  college_id: string;
  staff_id: string;
  source_type: WorkQueueSourceType;
  source_id: string;
  status: WorkQueueStateStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

const QUERY_KEY = ['college-work-queue-state'];

export function useWorkQueueState() {
  const queryClient = useQueryClient();
  const { profile, user } = useAuth();
  const collegeId = profile?.college_id ?? null;

  // Resolve the current user's college_staff.id once. RLS on every write
  // is keyed off this, and writing the wrong column = silent zero-match
  // (this trap has bitten 3 times before per project memory).
  const staffQuery = useQuery({
    queryKey: ['college-staff-self', user?.id, collegeId],
    queryFn: async () => {
      if (!user?.id || !collegeId) return null;
      const { data, error } = await supabase
        .from('college_staff')
        .select('id')
        .eq('user_id', user.id)
        .eq('college_id', collegeId)
        .maybeSingle();
      if (error) {
        console.error('useWorkQueueState: resolve staff_id failed:', error);
        return null;
      }
      return (data?.id as string | undefined) ?? null;
    },
    enabled: !!user?.id && !!collegeId,
    staleTime: 5 * 60 * 1000,
  });
  const staffId = staffQuery.data ?? null;

  // Realtime: any change in the college's queue state invalidates so peers
  // see updates within ~1s.
  useEffect(() => {
    if (!collegeId) return;
    const channel = supabase
      .channel(realtimeChannelName(`college-work-queue-state:${collegeId}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_work_queue_state',
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
    queryFn: async (): Promise<WorkQueueStateRow[]> => {
      if (!collegeId) return [];
      const { data, error } = await supabase
        .from('college_work_queue_state')
        .select('*')
        .eq('college_id', collegeId);
      if (error) {
        console.error('useWorkQueueState load failed:', error);
        return [];
      }
      return (data ?? []) as WorkQueueStateRow[];
    },
    enabled: !!collegeId,
  });

  const setStatus = useMutation({
    mutationFn: async (vars: {
      sourceType: WorkQueueSourceType;
      sourceId: string;
      status: WorkQueueStateStatus;
      notes?: string;
    }) => {
      if (!collegeId || !staffId) {
        throw new Error('Missing college or staff context');
      }
      const { data, error } = await supabase
        .from('college_work_queue_state')
        .upsert(
          {
            college_id: collegeId,
            staff_id: staffId,
            source_type: vars.sourceType,
            source_id: vars.sourceId,
            status: vars.status,
            notes: vars.notes ?? null,
          },
          { onConflict: 'staff_id,source_type,source_id' }
        )
        .select('*')
        .maybeSingle();
      if (error) throw error;
      return data as WorkQueueStateRow;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const clearStatus = useMutation({
    mutationFn: async (vars: { sourceType: WorkQueueSourceType; sourceId: string }) => {
      if (!staffId) throw new Error('Missing staff context');
      const { error } = await supabase
        .from('college_work_queue_state')
        .delete()
        .eq('staff_id', staffId)
        .eq('source_type', vars.sourceType)
        .eq('source_id', vars.sourceId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const saveNotes = useMutation({
    mutationFn: async (vars: {
      sourceType: WorkQueueSourceType;
      sourceId: string;
      notes: string;
    }) => {
      if (!collegeId || !staffId) throw new Error('Missing college or staff context');
      // Notes are stored on the same per-(source) row. If no row exists yet
      // (i.e. user hasn't started work), create one in 'In Progress' so
      // notes always have a home.
      const { data, error } = await supabase
        .from('college_work_queue_state')
        .upsert(
          {
            college_id: collegeId,
            staff_id: staffId,
            source_type: vars.sourceType,
            source_id: vars.sourceId,
            status: 'In Progress',
            notes: vars.notes,
          },
          { onConflict: 'staff_id,source_type,source_id', ignoreDuplicates: false }
        )
        .select('*')
        .maybeSingle();
      if (error) throw error;
      return data as WorkQueueStateRow;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  // Build a lookup map: composite key = `${source_type}:${source_id}`.
  const stateMap = new Map<string, WorkQueueStateRow>();
  for (const row of query.data ?? []) {
    stateMap.set(`${row.source_type}:${row.source_id}`, row);
  }

  return {
    rows: query.data ?? [],
    stateMap,
    isLoading: query.isLoading || staffQuery.isLoading,
    staffId,
    setStatus,
    clearStatus,
    saveNotes,
  };
}
