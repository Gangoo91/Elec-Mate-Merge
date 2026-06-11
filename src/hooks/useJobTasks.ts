import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';

/**
 * Job task tickets (ELE-1073). Employer creates/manages; assigned workers
 * read every ticket on their jobs and update their own (status, photos).
 * Pushes/bells/audit fire from DB triggers — no client wiring needed.
 */

export type TaskStatus = 'Todo' | 'In Progress' | 'Blocked' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface JobTask {
  id: string;
  employer_id: string;
  job_id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assignee_employee_id: string | null;
  due_date: string | null;
  position: number;
  photos: string[];
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  // joined
  assignee?: { id: string; name: string; avatar_initials: string } | null;
  job?: { id: string; title: string; client: string; location: string } | null;
}

const SELECT_WITH_JOINS =
  '*, assignee:employer_employees(id, name, avatar_initials), job:employer_jobs(id, title, client, location)';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapTask = (row: any): JobTask => ({
  ...row,
  photos: Array.isArray(row.photos) ? row.photos : [],
});

export const useJobTasks = (jobId: string | undefined) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!jobId) return;
    const channel = supabase
      .channel(realtimeChannelName('job-tasks'))
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'employer_job_tasks', filter: `job_id=eq.${jobId}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ['job-tasks', jobId] });
          queryClient.invalidateQueries({ queryKey: ['my-tasks'] });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [jobId, queryClient]);

  return useQuery({
    queryKey: ['job-tasks', jobId],
    queryFn: async (): Promise<JobTask[]> => {
      const { data, error } = await supabase
        .from('employer_job_tasks')
        .select(SELECT_WITH_JOINS)
        .eq('job_id', jobId!)
        .order('position', { ascending: true })
        .order('created_at', { ascending: true });
      if (error) throw error;
      return (data || []).map(mapTask);
    },
    enabled: !!jobId,
    staleTime: 30 * 1000,
  });
};

/** Worker view: every ticket assigned to any of my roster rows */
export const useMyTasks = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(realtimeChannelName('my-tasks'))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'employer_job_tasks' }, () =>
        queryClient.invalidateQueries({ queryKey: ['my-tasks'] })
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['my-tasks'],
    queryFn: async (): Promise<JobTask[]> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const { data: myRows } = await supabase
        .from('employer_employees')
        .select('id')
        .eq('user_id', user.id)
        .not('employer_id', 'is', null);
      const ids = (myRows || []).map((r) => r.id);
      if (ids.length === 0) return [];

      const { data, error } = await supabase
        .from('employer_job_tasks')
        .select(SELECT_WITH_JOINS)
        .in('assignee_employee_id', ids);
      if (error) throw error;

      const statusRank: Record<string, number> = { Blocked: 0, 'In Progress': 1, Todo: 2, Done: 3 };
      const priorityRank: Record<string, number> = { Urgent: 0, High: 1, Medium: 2, Low: 3 };
      return (data || [])
        .map(mapTask)
        .sort(
          (a, b) =>
            (statusRank[a.status] ?? 9) - (statusRank[b.status] ?? 9) ||
            (priorityRank[a.priority] ?? 9) - (priorityRank[b.priority] ?? 9)
        );
    },
    staleTime: 30 * 1000,
  });
};

/** Unassigned tickets on jobs the worker is on — the "up for grabs" pool */
export const useUpForGrabsTasks = () => {
  return useQuery({
    queryKey: ['up-for-grabs-tasks'],
    queryFn: async (): Promise<JobTask[]> => {
      const { data, error } = await supabase
        .from('employer_job_tasks')
        .select(SELECT_WITH_JOINS)
        .is('assignee_employee_id', null)
        .neq('status', 'Done');
      if (error) throw error;
      // RLS already scopes to jobs the caller can see; employers also pass
      // this filter, so the WORKER sheet is the only consumer
      return (data || []).map(mapTask);
    },
    staleTime: 30 * 1000,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      job_id: string;
      title: string;
      description?: string;
      priority?: TaskPriority;
      assignee_employee_id?: string | null;
      due_date?: string | null;
      position?: number;
    }) => {
      const { data, error } = await supabase
        .from('employer_job_tasks')
        .insert({
          job_id: input.job_id,
          title: input.title.trim(),
          description: input.description?.trim() || null,
          priority: input.priority || 'Medium',
          assignee_employee_id: input.assignee_employee_id || null,
          due_date: input.due_date || null,
          position: input.position ?? 0,
        })
        .select()
        .single();
      if (error) throw error;
      return mapTask(data);
    },
    onSuccess: (task) => {
      queryClient.invalidateQueries({ queryKey: ['job-tasks', task.job_id] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<
        Pick<
          JobTask,
          | 'title'
          | 'description'
          | 'status'
          | 'priority'
          | 'assignee_employee_id'
          | 'due_date'
          | 'position'
          | 'photos'
        >
      >;
    }) => {
      const { data, error } = await supabase
        .from('employer_job_tasks')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return mapTask(data);
    },
    onSuccess: (task) => {
      queryClient.invalidateQueries({ queryKey: ['job-tasks', task.job_id] });
      queryClient.invalidateQueries({ queryKey: ['my-tasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('employer_job_tasks').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-tasks'] });
      queryClient.invalidateQueries({ queryKey: ['my-tasks'] });
    },
  });
};

/** Comments threaded on a task (employer_job_comments.task_id) */
export const useTaskComments = (taskId: string | undefined) => {
  return useQuery({
    queryKey: ['task-comments', taskId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_job_comments')
        .select('id, author_name, content, created_at')
        .eq('task_id', taskId!)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data || [];
    },
    enabled: !!taskId,
    staleTime: 15 * 1000,
  });
};

export const useAddTaskComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      taskId: string;
      jobId: string;
      authorName: string;
      content: string;
    }) => {
      const { error } = await supabase.from('employer_job_comments').insert({
        job_id: input.jobId,
        task_id: input.taskId,
        author_name: input.authorName,
        comment_type: 'task',
        content: input.content.trim(),
      });
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['task-comments', vars.taskId] });
    },
  });
};

const MAX_PHOTO_BYTES = 10 * 1024 * 1024;

/**
 * Photo upload → PRIVATE task-photos bucket; the storage PATH is appended to
 * the task via a concurrency-safe RPC (no last-write-wins clobber). Display
 * resolves paths to short-lived signed URLs.
 */
export const uploadTaskPhoto = async (taskId: string, file: File): Promise<void> => {
  if (file.size > MAX_PHOTO_BYTES) throw new Error('Photo too large (10MB max)');
  if (!file.type.startsWith('image/')) throw new Error('Only images can be attached');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `${user.id}/${taskId}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from('task-photos').upload(path, file);
  if (error) throw error;

  const { error: rpcError } = await supabase.rpc('append_task_photo', {
    p_task_id: taskId,
    p_path: path,
  });
  if (rpcError) throw rpcError;
};

/** Resolve stored photo entries to displayable URLs (signs private paths;
 *  passes legacy full URLs through untouched) */
export const useTaskPhotoUrls = (photos: string[]) => {
  return useQuery({
    queryKey: ['task-photo-urls', photos],
    queryFn: async (): Promise<string[]> => {
      const paths = photos.filter((p) => !p.startsWith('http'));
      const passthrough = photos.filter((p) => p.startsWith('http'));
      if (paths.length === 0) return passthrough;

      const { data, error } = await supabase.storage
        .from('task-photos')
        .createSignedUrls(paths, 3600);
      if (error) return passthrough;
      return [...passthrough, ...(data || []).map((d) => d.signedUrl).filter(Boolean)];
    },
    enabled: photos.length > 0,
    staleTime: 45 * 60 * 1000,
  });
};
