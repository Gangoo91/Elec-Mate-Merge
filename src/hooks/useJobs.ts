import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
import { QUERY_PRESETS, QUERY_KEYS } from '@/lib/queryConfig';

// Query keys - use centralized keys
const JOBS_KEY = QUERY_KEYS.JOBS;

export const useJobs = () => {
  const queryClient = useQueryClient();

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('employer-jobs-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'employer_jobs' },
        () => {
          queryClient.invalidateQueries({ queryKey: JOBS_KEY });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: JOBS_KEY,
    queryFn: getJobs,
    ...QUERY_PRESETS.USER_DATA,
  });
};

export const useActiveJobs = () => {
  return useQuery({
    queryKey: [...JOBS_KEY, 'active'],
    queryFn: getActiveJobs,
    ...QUERY_PRESETS.USER_DATA,
  });
};

export const useJob = (id: string) => {
  return useQuery({
    queryKey: [...JOBS_KEY, id],
    queryFn: () => getJobById(id),
    enabled: !!id,
    ...QUERY_PRESETS.USER_DATA,
  });
};

export const useJobsWithLocations = () => {
  return useQuery({
    queryKey: [...JOBS_KEY, 'with-locations'],
    queryFn: getJobsWithLocations,
    ...QUERY_PRESETS.USER_DATA,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (job: Omit<Job, 'id' | 'created_at' | 'updated_at' | 'user_id'>) =>
      createJob(job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOBS_KEY });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Job> }) =>
      updateJob(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: JOBS_KEY });
      queryClient.invalidateQueries({ queryKey: [...JOBS_KEY, variables.id] });
    },
  });
};

export const useUpdateJobStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: JobStatus }) =>
      updateJobStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOBS_KEY });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOBS_KEY });
    },
  });
};

export const useArchiveJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => archiveJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOBS_KEY });
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
      queryClient.invalidateQueries({ queryKey: JOBS_KEY });
      queryClient.invalidateQueries({ queryKey: ['job-templates'] });
    },
  });
};
