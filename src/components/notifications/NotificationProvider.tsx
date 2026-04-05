import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { storageRemoveSync } from '@/utils/storage';
import type { User } from '@supabase/supabase-js';

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  link?: string;
};

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Map a push_notification_log row to the Notification shape
const mapPushLog = (row: {
  id: string;
  title: string;
  body: string;
  type: string;
  sent_at: string;
  read_at: string | null;
}): Notification => ({
  id: row.id,
  title: row.title,
  message: row.body,
  type: (row.type === 'invoice' || row.type === 'overdue'
    ? 'warning'
    : row.type === 'payment'
      ? 'success'
      : row.type === 'error'
        ? 'error'
        : 'info') as Notification['type'],
  read: !!row.read_at,
  createdAt: row.sent_at,
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Auth
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);
    };
    getUser();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Load from push_notification_log + set up realtime subscription
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }

    // One-time cleanup of old localStorage read tracking
    storageRemoveSync(`notif_read_${user.id}`);

    // Fetch last 30 push notifications from the database
    const fetchFromDb = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('push_notification_log')
        .select('id, title, body, type, sent_at, read_at')
        .eq('user_id', user.id)
        .order('sent_at', { ascending: false })
        .limit(30);

      if (error) {
        console.error('[NotificationProvider] Failed to load push_notification_log:', error);
        return;
      }

      if (!data?.length) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dbNotifs: Notification[] = data.map((row: any) => mapPushLog(row));

      // Merge with any local-only notifications (addNotification calls)
      setNotifications((prev) => {
        const dbIds = new Set(dbNotifs.map((n) => n.id));
        const localOnly = prev.filter((n) => !dbIds.has(n.id));
        return [...dbNotifs, ...localOnly].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    };

    fetchFromDb();

    // Realtime: listen for new rows on push_notification_log for this user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const channel = (supabase as any)
      .channel(`push_notif_${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'push_notification_log',
          filter: `user_id=eq.${user.id}`,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (payload: { new: any }) => {
          const row = payload.new;
          const newNotif = mapPushLog(row);
          setNotifications((prev) => {
            if (prev.find((n) => n.id === newNotif.id)) return prev;
            return [newNotif, ...prev];
          });
          // Also show toast for new incoming push notifications
          toast.info(newNotif.title, { description: newNotif.message });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback(async (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from('push_notification_log')
      .update({ read_at: new Date().toISOString() })
      .eq('id', id);
  }, []);

  const markAllAsRead = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from('push_notification_log')
        .update({ read_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .is('read_at', null);
    }
  }, [user]);

  const deleteNotification = useCallback(async (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('push_notification_log').delete().eq('id', id);
  }, []);

  const clearAllNotifications = useCallback(async () => {
    setNotifications([]);
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).from('push_notification_log').delete().eq('user_id', user.id);
    }
  }, [user]);

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => {
      const newNotification: Notification = {
        ...notification,
        id: crypto.randomUUID(),
        read: false,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [newNotification, ...prev]);
      const sonnerMethod =
        notification.type === 'error'
          ? 'error'
          : notification.type === 'success'
            ? 'success'
            : notification.type === 'warning'
              ? 'warning'
              : 'info';
      toast[sonnerMethod](notification.title, { description: notification.message });
      return newNotification;
    },
    []
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
        deleteNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
