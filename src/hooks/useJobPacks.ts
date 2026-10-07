import { useQuery, useMutation, useQueryClient, type QueryClient } from '@tanstack/react-query';
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
