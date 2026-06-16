/**
 * useWorkerNotifications
 *
 * In-app notification inbox for the worker. Reads the per-user rows that
 * worker_notify() persists into employer_notifications (employer decisions:
 * leave/timesheet/expense/snag approved, new message, new job assignment, etc.),
 * live via realtime, with mark-read. The same events still fire an OS push; this
 * surfaces them inside the app and works even with push disabled.
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';

export interface WorkerNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  action_url: string | null;
  read_at: string | null;
  created_at: string;
  metadata: Record<string, unknown> | null;
}

const key = (uid?: string) => ['worker-notifications', uid];

export function useWorkerNotifications() {
  const { user } = useAuth();
  const uid = user?.id;
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: key(uid),
    queryFn: async (): Promise<WorkerNotification[]> => {
      const { data, error } = await supabase
        .from('employer_notifications')
        .select('id, type, title, message, action_url, read_at, created_at, metadata')
        .eq('user_id', uid!)
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) {
        console.error('Error fetching worker notifications:', error);
        return [];
      }
      return (data || []) as WorkerNotification[];
    },
    enabled: Boolean(uid),
    staleTime: 30 * 1000,
  });

  // Live: a new employer decision pushes a row → the bell updates instantly.
  useRealtimeInvalidate(
    'worker-notifications',
    [{ table: 'employer_notifications', filter: `user_id=eq.${uid}` }],
    [key(uid)],
    Boolean(uid)
  );

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('employer_notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key(uid) }),
  });

  const markAllRead = useMutation({
    mutationFn: async () => {
      if (!uid) return;
      const { error } = await supabase
        .from('employer_notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('user_id', uid)
        .is('read_at', null);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key(uid) }),
  });

  const notifications = query.data ?? [];
  const unreadCount = notifications.filter((n) => !n.read_at).length;

  return {
    notifications,
    unreadCount,
    isLoading: query.isLoading,
    markRead: markRead.mutate,
    markAllRead: markAllRead.mutate,
  };
}
