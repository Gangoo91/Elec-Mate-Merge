import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getJobs,
  getJobById,
  getActiveJobs,
  createJob,
  updateJob,
  updateJobStatus,
  getJobsWithLocations,
  deleteJob,
  archiveJob,
  setJobAsTemplate,
  Job,
  JobStatus,
} from '@/services/jobService';

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
  });
};

export const useActiveJobs = () => {
  return useQuery({
    queryKey: ['jobs', 'active'],
    queryFn: getActiveJobs,
  });
};

export const useJob = (id: string) => {
  return useQuery({
    queryKey: ['jobs', id],
    queryFn: () => getJobById(id),
    enabled: !!id,
  });
};

export const useJobsWithLocations = () => {
  return useQuery({
    queryKey: ['jobs', 'with-locations'],
    queryFn: getJobsWithLocations,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (job: Omit<Job, 'id' | 'created_at' | 'updated_at'>) =>
      createJob(job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Job> }) =>
      updateJob(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobs', variables.id] });
    },
  });
};

export const useUpdateJobStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: JobStatus }) =>
      updateJobStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};

export const useArchiveJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => archiveJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['archived-jobs'] });
    },
  });
};

export const useSetJobAsTemplate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, isTemplate }: { id: string; isTemplate: boolean }) => 
      setJobAsTemplate(id, isTemplate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job-templates'] });
    },
  });
};
