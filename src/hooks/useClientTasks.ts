import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const onErr = (e: Error) => toast.error(e.message || 'Something went wrong');

export interface ClientTask {
  id: string;
  client_id: string;
  title: string;
  due_date: string | null;
  done: boolean;
  created_at: string;
}

/** Follow-ups for a single client. */
export const useClientTasks = (clientId: string | undefined) =>
  useQuery({
    queryKey: ['client-tasks', clientId],
    enabled: !!clientId,
    queryFn: async (): Promise<ClientTask[]> => {
      const { data, error } = await supabase
        .from('client_tasks')
        .select('*')
        .eq('client_id', clientId!)
        .order('done', { ascending: true })
        .order('due_date', { ascending: true, nullsFirst: false });
      if (error) throw error;
      return (data || []) as ClientTask[];
    },
  });

/** All open follow-ups across every client — for the "due" surface. */
export const useOpenFollowUps = () =>
  useQuery({
    queryKey: ['client-tasks', 'open'],
    queryFn: async (): Promise<ClientTask[]> => {
      const { data, error } = await supabase
        .from('client_tasks')
        .select('*')
        .eq('done', false)
        .order('due_date', { ascending: true, nullsFirst: false });
      if (error) throw error;
      return (data || []) as ClientTask[];
    },
  });

export const useAddClientTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { client_id: string; title: string; due_date: string | null }) => {
      const { error } = await supabase.from('client_tasks').insert(input);
      if (error) throw error;
    },
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ['client-tasks', vars.client_id] });
      qc.invalidateQueries({ queryKey: ['client-tasks', 'open'] });
      qc.invalidateQueries({ queryKey: ['employer-clients'] });
    },
    onError: onErr,
  });
};

export const useToggleClientTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, done }: { id: string; done: boolean }) => {
      const { error } = await supabase.from('client_tasks').update({ done }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['client-tasks'] });
    },
    onError: onErr,
  });
};

export const useDeleteClientTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('client_tasks').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['client-tasks'] });
    },
    onError: onErr,
  });
};
