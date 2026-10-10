import { useQuery, useMutation, useQueryClient, type QueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import {
  getJobPacks,
  getJobPackById,
  createJobPack,
  updateJobPack,
  deleteJobPack,
  updateJobPackDocumentStatus,
  JobPack,
  JobPackStatus,
} from '@/services/jobPackService';
import {
  getJobPackDocuments,
  createJobPackDocument,
  deleteJobPackDocument,
  getJobPackAcknowledgements,
  createJobPackAcknowledgement,
  JobPackDocument,
  JobPackAcknowledgement,
} from '@/services/jobPackDocumentService';

/**
 * Every view a pack change moves (ELE-1819): the Job Packs list (and the
 * "Jobs to pack" / status stats derived from it), each pack's sign-off list,
 * and the Overview's "signatures missing" row. One helper so no mutation
 * path forgets one of them.
 */
export function invalidatePackViews(queryClient: QueryClient, packId?: string) {
  queryClient.invalidateQueries({ queryKey: ['job-packs'] });
  if (packId) queryClient.invalidateQueries({ queryKey: ['job-pack-acknowledgements', packId] });
  else queryClient.invalidateQueries({ queryKey: ['job-pack-acknowledgements'] });
  queryClient.invalidateQueries({ queryKey: ['employer-home'] });
}

export const useJobPacks = () => {
  // Live: a worker signing on their phone, or a pack sent from another
  // device, moves the counts here without a manual refresh.
  useRealtimeInvalidate(
    'job-packs',
    [{ table: 'employer_job_packs' }, { table: 'employer_job_pack_acknowledgements' }],
    [['job-packs'], ['job-pack-acknowledgements']]
  );
  return useQuery({
    queryKey: ['job-packs'],
    queryFn: getJobPacks,
    // The stats are counts the boss acts on; never show a two-minute-old one.
    staleTime: 0,
  });
};

/** One sign-off row, as the list needs it (ELE-1962). */
export interface PackSignoff {
  id: string;
  job_pack_id: string;
  employee_id: string;
  acknowledged_at: string | null;
}

/**
 * Every sign-off row across the firm's packs, so the list can say "1 of 2
 * signed" and offer "Chase 1 unsigned" without opening each pack. Lives under
 * the job-pack-acknowledgements key, so the realtime and mutation
 * invalidations above already refresh it.
 */
export const useJobPackSignoffs = () => {
  return useQuery({
    queryKey: ['job-pack-acknowledgements', 'all'],
    staleTime: 0,
    queryFn: async (): Promise<PackSignoff[]> => {
      const { data, error } = await supabase
        .from('employer_job_pack_acknowledgements')
        .select('id, job_pack_id, employee_id, acknowledged_at');
      if (error) throw error;
      return (data ?? []) as PackSignoff[];
    },
  });
};

/** Chase everyone still to sign a pack (chase_pack_unsigned: once a day per person). */
export async function chaseUnsignedPack(
  packId: string
): Promise<{ chased: number; alreadyToday: number; notLinked: number }> {
  const { data, error } = await supabase.rpc(
    'chase_pack_unsigned' as never,
    { p_pack_id: packId } as never
  );
  const r = (data ?? {}) as {
    error?: string;
    chased?: number;
    already_today?: number;
    not_linked?: number;
  };
  if (error || r.error) throw new Error(r.error || error?.message || 'Could not chase');
  return {
    chased: r.chased ?? 0,
    alreadyToday: r.already_today ?? 0,
    notLinked: r.not_linked ?? 0,
  };
}

export const useJobPack = (id: string) => {
  return useQuery({
    queryKey: ['job-packs', id],
    queryFn: () => getJobPackById(id),
    enabled: !!id,
  });
};

export const useJobPackDocuments = (jobPackId: string) => {
  return useQuery({
    queryKey: ['job-pack-documents', jobPackId],
    queryFn: () => getJobPackDocuments(jobPackId),
    enabled: !!jobPackId,
  });
};

export const useJobPackAcknowledgements = (jobPackId: string) => {
  return useQuery({
    queryKey: ['job-pack-acknowledgements', jobPackId],
    queryFn: () => getJobPackAcknowledgements(jobPackId),
    enabled: !!jobPackId,
  });
};

export const useCreateJobPack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobPack: Omit<JobPack, 'id' | 'created_at' | 'updated_at'>) =>
      createJobPack(jobPack),
    onSuccess: () => invalidatePackViews(queryClient),
  });
};

export const useUpdateJobPack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<JobPack> }) =>
      updateJobPack(id, updates),
    onSuccess: (_, variables) => {
      invalidatePackViews(queryClient, variables.id);
      queryClient.invalidateQueries({ queryKey: ['job-packs', variables.id] });
    },
  });
};

export const useDeleteJobPack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteJobPack(id),
    onSuccess: () => invalidatePackViews(queryClient),
  });
};

export const useUpdateJobPackDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      documentType,
      status,
    }: {
      id: string;
      documentType: 'rams_generated' | 'method_statement_generated' | 'briefing_pack_generated';
      status: boolean;
    }) => updateJobPackDocumentStatus(id, documentType, status),
    onSuccess: () => invalidatePackViews(queryClient),
  });
};

export const useCreateJobPackDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (document: Omit<JobPackDocument, 'id' | 'created_at' | 'updated_at'>) =>
      createJobPackDocument(document),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['job-pack-documents', variables.job_pack_id] });
    },
  });
};

export const useDeleteJobPackDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteJobPackDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-pack-documents'] });
    },
  });
};

export const useCreateJobPackAcknowledgement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ack: Omit<JobPackAcknowledgement, 'id' | 'created_at' | 'acknowledged_at'>) =>
      createJobPackAcknowledgement(ack),
    onSuccess: (_, variables) => invalidatePackViews(queryClient, variables.job_pack_id),
  });
};
