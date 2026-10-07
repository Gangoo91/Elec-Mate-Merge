import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface JobChecklistItem {
  id: string;
  job_id: string;
  title: string;
  is_completed: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}

// Fetch checklist items for a job
export const useJobChecklist = (jobId: string) => {
  return useQuery({
    queryKey: ['job-checklist', jobId],
    queryFn: async (): Promise<JobChecklistItem[]> => {
      const { data, error } = await supabase
        .from('employer_job_checklist_items')
        .select('*')
        .eq('job_id', jobId)
        .order('position')
        .order('created_at');

      if (error) throw error;
      return data as JobChecklistItem[];
    },
    enabled: !!jobId,
  });
};

// Fetch checklist summaries for all jobs (for board view)
export const useAllJobChecklistSummaries = () => {
  return useQuery({
    queryKey: ['all-job-checklist-summaries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_job_checklist_items')
        .select('job_id, is_completed');

      if (error) throw error;

      // Group by job_id and calculate completed/total
      const summaries: Record<string, { completed: number; total: number }> = {};
      (data as { job_id: string; is_completed: boolean }[]).forEach((item) => {
        if (!summaries[item.job_id]) {
          summaries[item.job_id] = { completed: 0, total: 0 };
        }
        summaries[item.job_id].total++;
        if (item.is_completed) {
          summaries[item.job_id].completed++;
        }
      });

      return summaries;
    },
  });
};

// Add a checklist item
export const useAddChecklistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, title }: { jobId: string; title: string }) => {
      // Get max position
      const { data: existing } = await supabase
        .from('employer_job_checklist_items')
        .select('position')
        .eq('job_id', jobId)
        .order('position', { ascending: false })
        .limit(1);

      const position =
        existing && existing.length > 0 ? (existing[0] as { position: number }).position + 1 : 0;

      const { data, error } = await supabase
        .from('employer_job_checklist_items')
        .insert({ job_id: jobId, title, position })
        .select()
        .single();

      if (error) throw error;
      return data as JobChecklistItem;
    },
    onSuccess: (_, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: ['job-checklist', jobId] });
      queryClient.invalidateQueries({ queryKey: ['all-job-checklist-summaries'] });
      queryClient.invalidateQueries({ queryKey: ['job-sheet-counts', jobId] });
    },
    onError: () => {
      toast.error('Failed to add checklist item');
    },
  });
};

// Toggle checklist item completion
export const useToggleChecklistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      isCompleted,
      jobId,
    }: {
      id: string;
      isCompleted: boolean;
      jobId: string;
    }) => {
      const { error } = await supabase
        .from('employer_job_checklist_items')
        .update({ is_completed: isCompleted })
        .eq('id', id);

      if (error) throw error;
      return { id, isCompleted, jobId };
    },
    onSuccess: (_, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: ['job-checklist', jobId] });
      queryClient.invalidateQueries({ queryKey: ['all-job-checklist-summaries'] });
      queryClient.invalidateQueries({ queryKey: ['job-sheet-counts', jobId] });
    },
    onError: () => {
      toast.error('Failed to update checklist item');
    },
  });
};

// Delete a checklist item
export const useDeleteChecklistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, jobId }: { id: string; jobId: string }) => {
      const { error } = await supabase.from('employer_job_checklist_items').delete().eq('id', id);

      if (error) throw error;
      return { id, jobId };
    },
    onSuccess: (_, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: ['job-checklist', jobId] });
      queryClient.invalidateQueries({ queryKey: ['all-job-checklist-summaries'] });
      queryClient.invalidateQueries({ queryKey: ['job-sheet-counts', jobId] });
    },
    onError: () => {
      toast.error('Failed to delete checklist item');
    },
  });
};

// Add several items at once (pasted list or quick-start suggestions), in order.
export const useAddChecklistItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, titles }: { jobId: string; titles: string[] }) => {
      const clean = titles.map((t) => t.trim()).filter(Boolean);
      if (clean.length === 0) return [] as JobChecklistItem[];
      const { data: existing } = await supabase
        .from('employer_job_checklist_items')
        .select('position')
        .eq('job_id', jobId)
        .order('position', { ascending: false })
        .limit(1);
      const start =
        existing && existing.length > 0 ? (existing[0] as { position: number }).position + 1 : 0;
      const { data, error } = await supabase
        .from('employer_job_checklist_items')
        .insert(clean.map((title, i) => ({ job_id: jobId, title, position: start + i })))
        .select();
      if (error) throw error;
      return (data ?? []) as JobChecklistItem[];
    },
    onSuccess: (_, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: ['job-checklist', jobId] });
      queryClient.invalidateQueries({ queryKey: ['all-job-checklist-summaries'] });
      queryClient.invalidateQueries({ queryKey: ['job-sheet-counts', jobId] });
    },
    onError: () => {
      toast.error('Failed to add checklist items');
    },
  });
};

// Rename an item.
export const useRenameChecklistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, title }: { id: string; title: string; jobId: string }) => {
      const { error } = await supabase
        .from('employer_job_checklist_items')
        .update({ title: title.trim(), updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: ['job-checklist', jobId] });
    },
    onError: () => {
      toast.error('Failed to rename checklist item');
    },
  });
};

// Swap two items' positions (move up / move down).
export const useSwapChecklistItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      a,
      b,
    }: {
      a: Pick<JobChecklistItem, 'id' | 'position'>;
      b: Pick<JobChecklistItem, 'id' | 'position'>;
      jobId: string;
    }) => {
      // Positions can collide on legacy rows; nudge so the order really changes.
      const posA = b.position === a.position ? a.position + 1 : b.position;
      const posB = a.position;
      const r1 = await supabase
        .from('employer_job_checklist_items')
        .update({ position: posA })
        .eq('id', a.id);
      if (r1.error) throw r1.error;
      const r2 = await supabase
        .from('employer_job_checklist_items')
        .update({ position: posB })
        .eq('id', b.id);
      if (r2.error) throw r2.error;
    },
    onSuccess: (_, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: ['job-checklist', jobId] });
    },
    onError: () => {
      toast.error('Failed to move checklist item');
    },
  });
};
