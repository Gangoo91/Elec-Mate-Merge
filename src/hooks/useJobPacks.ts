import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

export const useJobPacks = () => {
  return useQuery({
    queryKey: ['job-packs'],
    queryFn: getJobPacks,
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-packs'] });
    },
  });
};

export const useUpdateJobPack = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<JobPack> }) =>
      updateJobPack(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['job-packs'] });
      queryClient.invalidateQueries({ queryKey: ['job-packs', variables.id] });
    },
  });
};

export const useDeleteJobPack = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteJobPack(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-packs'] });
    },
  });
};

export const useUpdateJobPackDocument = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, documentType, status }: { 
      id: string; 
      documentType: 'rams_generated' | 'method_statement_generated' | 'briefing_pack_generated';
      status: boolean;
    }) => updateJobPackDocumentStatus(id, documentType, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-packs'] });
    },
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
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['job-pack-acknowledgements', variables.job_pack_id] });
    },
  });
};
