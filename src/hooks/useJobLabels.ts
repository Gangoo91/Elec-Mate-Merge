import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface JobLabel {
  id: string;
  name: string;
  colour: string;
  created_at: string;
}

export interface JobLabelAssignment {
  job_id: string;
  label_id: string;
  created_at: string;
}

// Fetch all available labels
export const useJobLabels = () => {
  return useQuery({
    queryKey: ['job-labels'],
    queryFn: async (): Promise<JobLabel[]> => {
      const { data, error } = await supabase
        .from('job_labels')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as JobLabel[];
    },
  });
};

// Fetch labels assigned to a specific job
export const useJobLabelAssignments = (jobId: string) => {
  return useQuery({
    queryKey: ['job-label-assignments', jobId],
    queryFn: async (): Promise<(JobLabelAssignment & { label: JobLabel })[]> => {
      const { data, error } = await supabase
        .from('job_label_assignments')
        .select(`
          job_id,
          label_id,
          created_at,
          label:job_labels(id, name, colour, created_at)
        `)
        .eq('job_id', jobId);
      
      if (error) throw error;
      
      // Transform the data to flatten the label array
      return (data || []).map((item: any) => ({
        job_id: item.job_id,
        label_id: item.label_id,
        created_at: item.created_at,
        label: Array.isArray(item.label) ? item.label[0] : item.label,
      }));
    },
    enabled: !!jobId,
  });
};

// Fetch all job-label assignments (for board view)
export const useAllJobLabelAssignments = () => {
  return useQuery({
    queryKey: ['all-job-label-assignments'],
    queryFn: async (): Promise<(JobLabelAssignment & { label: JobLabel })[]> => {
      const { data, error } = await supabase
        .from('job_label_assignments')
        .select(`
          job_id,
          label_id,
          created_at,
          label:job_labels(id, name, colour, created_at)
        `);
      
      if (error) throw error;
      
      // Transform the data to flatten the label array
      return (data || []).map((item: any) => ({
        job_id: item.job_id,
        label_id: item.label_id,
        created_at: item.created_at,
        label: Array.isArray(item.label) ? item.label[0] : item.label,
      }));
    },
  });
};

// Assign a label to a job
export const useAssignLabel = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ jobId, labelId }: { jobId: string; labelId: string }) => {
      const { error } = await supabase
        .from('job_label_assignments')
        .insert({ job_id: jobId, label_id: labelId });
      
      if (error) throw error;
    },
    onSuccess: (_, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: ['job-label-assignments', jobId] });
      queryClient.invalidateQueries({ queryKey: ['all-job-label-assignments'] });
    },
    onError: () => {
      toast.error('Failed to assign label');
    },
  });
};

// Remove a label from a job
export const useRemoveLabel = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ jobId, labelId }: { jobId: string; labelId: string }) => {
      const { error } = await supabase
        .from('job_label_assignments')
        .delete()
        .eq('job_id', jobId)
        .eq('label_id', labelId);
      
      if (error) throw error;
    },
    onSuccess: (_, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: ['job-label-assignments', jobId] });
      queryClient.invalidateQueries({ queryKey: ['all-job-label-assignments'] });
    },
    onError: () => {
      toast.error('Failed to remove label');
    },
  });
};

// Create a new label
export const useCreateLabel = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ name, colour }: { name: string; colour: string }) => {
      const { data, error } = await supabase
        .from('job_labels')
        .insert({ name, colour })
        .select()
        .single();
      
      if (error) throw error;
      return data as JobLabel;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-labels'] });
      toast.success('Label created');
    },
    onError: () => {
      toast.error('Failed to create label');
    },
  });
};

// Delete a label
export const useDeleteLabel = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (labelId: string) => {
      const { error } = await supabase
        .from('job_labels')
        .delete()
        .eq('id', labelId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-labels'] });
      queryClient.invalidateQueries({ queryKey: ['all-job-label-assignments'] });
      toast.success('Label deleted');
    },
    onError: () => {
      toast.error('Failed to delete label');
    },
  });
};
