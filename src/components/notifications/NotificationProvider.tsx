import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
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
const mapPushLog = (
  row: { id: string; title: string; body: string; type: string; sent_at: string },
  readIds: Set<string>
): Notification => ({
  id: row.id,
  title: row.title,
  message: row.body,
  type: (row.type === 'invoice' || row.type === 'overdue' ? 'warning'
    : row.type === 'payment' ? 'success'
    : row.type === 'error' ? 'error'
    : 'info') as Notification['type'],
  read: readIds.has(row.id),
  createdAt: row.sent_at,
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Read-status is tracked in localStorage (push_notification_log has no read_at column)
  const getReadIds = useCallback((userId: string): Set<string> => {
    try {
      const raw = localStorage.getItem(`notif_read_${userId}`);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set();
    }
  }, []);

  const saveReadIds = useCallback((userId: string, ids: Set<string>) => {
    localStorage.setItem(`notif_read_${userId}`, JSON.stringify([...ids]));
  }, []);

  // Auth
  useEffect(() => {
    const getUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
    };
    getUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { subscription.unsubscribe(); };
  }, []);

  // Load from push_notification_log + set up realtime subscription
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }

    const readIds = getReadIds(user.id);

    // Fetch last 30 push notifications from the database
    const fetchFromDb = async () => {
      const { data, error } = await (supabase as any)
        .from('push_notification_log')
        .select('id, title, body, type, sent_at')
        .eq('user_id', user.id)
        .order('sent_at', { ascending: false })
        .limit(30);

      if (error) {
        console.error('[NotificationProvider] Failed to load push_notification_log:', error);
        return;
      }

      if (!data?.length) return;

      const dbNotifs: Notification[] = data.map((row: any) => mapPushLog(row, readIds));

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
        (payload: { new: any }) => {
          const row = payload.new;
          const currentReadIds = getReadIds(user.id);
          const newNotif = mapPushLog(row, currentReadIds);
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
  }, [user, getReadIds]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    if (user) {
      const ids = getReadIds(user.id);
      ids.add(id);
      saveReadIds(user.id, ids);
    }
  }, [user, getReadIds, saveReadIds]);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      if (user) {
        saveReadIds(user.id, new Set(updated.map((n) => n.id)));
      }
      return updated;
    });
  }, [user, saveReadIds]);

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    if (user) {
      localStorage.removeItem(`notif_read_${user.id}`);
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
      const sonnerMethod = notification.type === 'error' ? 'error'
        : notification.type === 'success' ? 'success'
        : notification.type === 'warning' ? 'warning'
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
