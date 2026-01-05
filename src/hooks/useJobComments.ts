import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface JobComment {
  id: string;
  job_id: string;
  author_name: string;
  content: string;
  comment_type: 'comment' | 'status_change' | 'assignment' | 'progress';
  created_at: string;
}

// Fetch comments/activity for a job
export const useJobComments = (jobId: string) => {
  return useQuery({
    queryKey: ['job-comments', jobId],
    queryFn: async (): Promise<JobComment[]> => {
      const { data, error } = await supabase
        .from('job_comments')
        .select('*')
        .eq('job_id', jobId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as JobComment[];
    },
    enabled: !!jobId,
  });
};

// Add a comment
export const useAddComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      jobId, 
      content, 
      authorName = 'System',
      commentType = 'comment' 
    }: { 
      jobId: string; 
      content: string; 
      authorName?: string;
      commentType?: JobComment['comment_type'];
    }) => {
      const { data, error } = await supabase
        .from('job_comments')
        .insert({ 
          job_id: jobId, 
          content, 
          author_name: authorName,
          comment_type: commentType
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as JobComment;
    },
    onSuccess: (_, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: ['job-comments', jobId] });
    },
    onError: () => {
      toast.error('Failed to add comment');
    },
  });
};

// Delete a comment
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, jobId }: { id: string; jobId: string }) => {
      const { error } = await supabase
        .from('job_comments')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { id, jobId };
    },
    onSuccess: (_, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: ['job-comments', jobId] });
      toast.success('Comment deleted');
    },
    onError: () => {
      toast.error('Failed to delete comment');
    },
  });
};

// Log activity (status changes, assignments, etc.)
export const useLogJobActivity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      jobId, 
      content, 
      commentType 
    }: { 
      jobId: string; 
      content: string; 
      commentType: JobComment['comment_type'];
    }) => {
      const { data, error } = await supabase
        .from('job_comments')
        .insert({ 
          job_id: jobId, 
          content, 
          author_name: 'System',
          comment_type: commentType
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as JobComment;
    },
    onSuccess: (_, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: ['job-comments', jobId] });
    },
  });
};
