import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useAuth } from '@/contexts/AuthContext';

export interface UserNotification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  metadata?: Record<string, any>;
  is_read: boolean;
  created_at: string;
  read_at?: string;
  /** Which table the row came from — routes mark-read/delete to the right place.
   *  The single global bell (ELE-1379) merges both into one stream. */
  source?: 'user' | 'employer';
}

/**
 * The app's SINGLE notification stream (ELE-1379). Merges:
 *  - `user_notifications` — event/transactional + Part P deadline reminders
 *  - the worker's `employer_notifications` — employer decisions (leave, timesheet,
 *    job assignment, messages) that worker_notify() persists per-user
 * into one list behind the one header bell. The old Worker Tools bell and the
 * profile "Notifications" dropdown are removed.
 */
export const useUserNotifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: notifications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['user-notifications', user?.id],
    queryFn: async (): Promise<UserNotification[]> => {
      if (!user) return [];

      const [events, worker] = await Promise.all([
        supabase
          .from('user_notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50),
        supabase
          .from('employer_notifications')
          .select('id, type, title, message, action_url, read_at, created_at, metadata')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50),
      ]);

      if (events.error) {
        console.error('Error fetching notifications:', events.error);
        throw events.error;
      }
      // A worker-notifications failure must not blank the whole bell.
      if (worker.error) {
        console.error('Error fetching worker notifications:', worker.error);
      }

      const eventRows: UserNotification[] = (events.data || []).map((n) => ({
        ...(n as UserNotification),
        source: 'user' as const,
      }));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const workerRows: UserNotification[] = (worker.data || []).map((n: any) => ({
        id: n.id,
        user_id: user.id,
        type: n.type,
        title: n.title,
        message: n.message,
        link: n.action_url || undefined,
        metadata: n.metadata || undefined,
        is_read: !!n.read_at,
        created_at: n.created_at,
        read_at: n.read_at || undefined,
        source: 'employer' as const,
      }));

      return [...eventRows, ...workerRows].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    },
    enabled: !!user,
    staleTime: 30000,
    refetchInterval: 60000,
  });

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const findSource = (id: string): 'user' | 'employer' =>
    notifications.find((n) => n.id === id)?.source ?? 'user';

  // Mark single notification as read — routed to the source table.
  const markAsRead = useMutation({
    mutationFn: async (notificationId: string) => {
      const now = new Date().toISOString();
      const error =
        findSource(notificationId) === 'employer'
          ? (
              await supabase
                .from('employer_notifications')
                .update({ read_at: now })
                .eq('id', notificationId)
            ).error
          : (
              await supabase
                .from('user_notifications')
                .update({ is_read: true, read_at: now })
                .eq('id', notificationId)
            ).error;
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user-notifications'] }),
  });

  // Mark all as read — across both tables.
  const markAllAsRead = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const now = new Date().toISOString();
      await Promise.all([
        supabase
          .from('user_notifications')
          .update({ is_read: true, read_at: now })
          .eq('user_id', user.id)
          .eq('is_read', false),
        supabase
          .from('employer_notifications')
          .update({ read_at: now })
          .eq('user_id', user.id)
          .is('read_at', null),
      ]);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user-notifications'] }),
  });

  // Delete — only own event rows are hard-deleted; employer rows (which the
  // worker doesn't own) are marked read instead.
  const deleteNotification = useMutation({
    mutationFn: async (notificationId: string) => {
      const error =
        findSource(notificationId) === 'employer'
          ? (
              await supabase
                .from('employer_notifications')
                .update({ read_at: new Date().toISOString() })
                .eq('id', notificationId)
            ).error
          : (await supabase.from('user_notifications').delete().eq('id', notificationId)).error;
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user-notifications'] }),
  });

  const clearAll = useMutation({
    mutationFn: async () => {
      if (!user) return;
      await supabase.from('user_notifications').delete().eq('user_id', user.id);
      // Employer rows aren't owned by the worker — "clear" = mark all read.
      await supabase
        .from('employer_notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .is('read_at', null);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user-notifications'] }),
  });

  // Live updates — a new row in either table refreshes the merged stream.
  const subscribeToNotifications = (
    onNewNotification: (notification: UserNotification) => void
  ) => {
    if (!user) return () => {};

    const channel = supabase
      .channel(realtimeChannelName(`user-notifications-${user.id}`))
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          onNewNotification(payload.new as UserNotification);
          queryClient.invalidateQueries({ queryKey: ['user-notifications'] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employer_notifications',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['user-notifications'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    refetch,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    subscribeToNotifications,
  };
};
