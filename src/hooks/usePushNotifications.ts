import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import {
  isPushSupported,
  getPermissionStatus,
  requestPermission,
  registerServiceWorker,
  subscribeToPush,
  savePushSubscription,
  unsubscribeFromPush,
  showMessageNotification,
} from '@/services/pushNotificationService';

// VAPID public key - in production, get from environment variable
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || '';

interface UsePushNotificationsReturn {
  isSupported: boolean;
  permission: NotificationPermission;
  isSubscribed: boolean;
  isLoading: boolean;
  subscribe: () => Promise<boolean>;
  unsubscribe: () => Promise<boolean>;
  showNotification: (title: string, body: string, data?: Record<string, unknown>) => Promise<void>;
}

/**
 * Hook to manage push notifications
 */
export function usePushNotifications(): UsePushNotificationsReturn {
  const { user } = useAuth();
  const [isSupported] = useState(() => isPushSupported());
  const [permission, setPermission] = useState<NotificationPermission>(() => getPermissionStatus());
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check subscription status on mount
  useEffect(() => {
    if (!isSupported || !user?.id) return;

    const checkSubscription = async () => {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        setIsSubscribed(!!subscription);
      } catch (error) {
        console.error('Error checking push subscription:', error);
      }
    };

    checkSubscription();
  }, [isSupported, user?.id]);

  // Update permission when it changes
  useEffect(() => {
    if (!isSupported) return;

    const checkPermission = () => {
      setPermission(getPermissionStatus());
    };

    // Check periodically (permission can change in settings)
    const interval = setInterval(checkPermission, 10000);
    return () => clearInterval(interval);
  }, [isSupported]);

  /**
   * Subscribe to push notifications
   */
  const subscribe = useCallback(async (): Promise<boolean> => {
    console.log('[Push] Starting subscription...');
    console.log('[Push] isSupported:', isSupported);
    console.log('[Push] VAPID key present:', !!VAPID_PUBLIC_KEY);
    console.log(
      '[Push] VAPID key value:',
      VAPID_PUBLIC_KEY ? VAPID_PUBLIC_KEY.substring(0, 20) + '...' : 'MISSING'
    );
    console.log('[Push] User ID:', user?.id);

    if (!VAPID_PUBLIC_KEY) {
      console.error('[Push] VAPID_PUBLIC_KEY is not configured!');
      toast({
        title: 'Configuration Error',
        description: 'Push notifications are not properly configured.',
        variant: 'destructive',
      });
      return false;
    }

    if (!isSupported || !user?.id) {
      console.warn('[Push] Not supported or no user:', { isSupported, userId: user?.id });
      toast({
        title: 'Not Supported',
        description: 'Push notifications are not supported on this device.',
        variant: 'destructive',
      });
      return false;
    }

    setIsLoading(true);

    try {
      // Request permission
      console.log('[Push] Requesting permission...');
      const perm = await requestPermission();
      console.log('[Push] Permission result:', perm);
      setPermission(perm);

      if (perm !== 'granted') {
        toast({
          title: 'Permission Denied',
          description: 'Please enable notifications in your browser settings.',
          variant: 'destructive',
        });
        return false;
      }

      // Register service worker (includes timeout — won't hang)
      console.log('[Push] Registering service worker...');
      const registration = await registerServiceWorker();
      if (!registration) {
        toast({
          title: 'Service Worker Unavailable',
          description: 'Push notifications require the production build. Try refreshing the page.',
          variant: 'destructive',
        });
        return false;
      }
      console.log('[Push] Service worker registered:', registration.scope);

      // Subscribe to push
      console.log('[Push] Subscribing to push manager...');
      const subscription = await subscribeToPush(registration, VAPID_PUBLIC_KEY);
      if (!subscription) {
        throw new Error('Failed to create push subscription');
      }
      console.log('[Push] Push subscription created:', subscription.endpoint);

      // Save to database
      console.log('[Push] Saving subscription to database...');
      const saved = await savePushSubscription(user.id, subscription);
      if (!saved) {
        throw new Error('Failed to save subscription');
      }
      console.log('[Push] Subscription saved to database');

      // Verify the subscription was saved
      const { data: verifyData, error: verifyError } = await supabase
        .from('push_subscriptions')
        .select('id, is_active, endpoint')
        .eq('user_id', user.id)
        .eq('endpoint', subscription.endpoint)
        .single();

      if (verifyError || !verifyData) {
        console.error('[Push] Subscription verification failed:', verifyError);
      } else {
        console.log(
          '[Push] Subscription verified in database:',
          verifyData.id,
          'active:',
          verifyData.is_active
        );
      }

      setIsSubscribed(true);
      toast({
        title: 'Notifications Enabled',
        description: 'You will now receive message notifications.',
      });

      return true;
    } catch (error) {
      console.error('[Push] Failed to subscribe:', error);
      toast({
        title: 'Subscription Failed',
        description: 'Could not enable notifications. Please try again.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, user?.id]);

  /**
   * Unsubscribe from push notifications
   */
  const unsubscribe = useCallback(async (): Promise<boolean> => {
    if (!user?.id) return false;

    setIsLoading(true);

    try {
      const success = await unsubscribeFromPush(user.id);

      if (success) {
        setIsSubscribed(false);
        toast({
          title: 'Notifications Disabled',
          description: 'You will no longer receive push notifications.',
        });
      }

      return success;
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
      toast({
        title: 'Error',
        description: 'Could not disable notifications.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  /**
   * Show a notification (for testing or manual triggers)
   */
  const showNotification = useCallback(
    async (title: string, body: string, data?: Record<string, unknown>): Promise<void> => {
      if (permission !== 'granted') {
        console.warn('Notification permission not granted');
        return;
      }

      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification(title, {
          body,
          icon: '/icons/icon-192x192.png',
          badge: '/icons/badge-72x72.png',
          data,
          vibrate: [100, 50, 100],
        });
      } catch (error) {
        console.error('Failed to show notification:', error);
      }
    },
    [permission]
  );

  return {
    isSupported,
    permission,
    isSubscribed,
    isLoading,
    subscribe,
    unsubscribe,
    showNotification,
  };
}

/**
 * Hook to handle incoming push notifications for messages
 */
export function useMessageNotifications(onNotificationClick?: (conversationId: string) => void) {
  const { user } = useAuth();

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !user?.id) return;

    // Listen for notification clicks from service worker
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'NOTIFICATION_CLICK') {
        const { conversationId } = event.data;
        if (conversationId && onNotificationClick) {
          onNotificationClick(conversationId);
        }
      }
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, [user?.id, onNotificationClick]);
}

/**
 * Notification preferences hook — Supabase-backed with localStorage cache
 */
export const NOTIFICATION_CATEGORIES = [
  'daily_briefing',
  'tasks_projects',
  'invoices_quotes',
  'certificates_compliance',
  'study_centre',
  'mental_health',
  'apprentice',
  'messages',
] as const;

export type NotificationCategory = (typeof NOTIFICATION_CATEGORIES)[number];

export type NotificationPreferences = Record<NotificationCategory, boolean>;

const DEFAULT_PREFERENCES: NotificationPreferences = {
  daily_briefing: true,
  tasks_projects: true,
  invoices_quotes: true,
  certificates_compliance: true,
  study_centre: true,
  mental_health: true,
  apprentice: true,
  messages: true,
};

const PREFERENCES_KEY = 'elecmate_notification_preferences';

export function useNotificationPreferences() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<NotificationPreferences>(() => {
    const stored = storageGetJSONSync<Partial<NotificationPreferences> | null>(
      PREFERENCES_KEY,
      null
    );
    return stored ? { ...DEFAULT_PREFERENCES, ...stored } : DEFAULT_PREFERENCES;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load from Supabase on mount
  useEffect(() => {
    if (!user?.id) return;

    const load = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('notification_preferences')
          .select('category, enabled')
          .eq('user_id', user.id);

        if (error) throw error;

        if (data && data.length > 0) {
          const fromDb: Partial<NotificationPreferences> = {};
          for (const row of data) {
            if (NOTIFICATION_CATEGORIES.includes(row.category as NotificationCategory)) {
              fromDb[row.category as NotificationCategory] = row.enabled;
            }
          }
          const merged = { ...DEFAULT_PREFERENCES, ...fromDb };
          setPreferences(merged);
          storageSetJSONSync(PREFERENCES_KEY, merged);
        }
      } catch (err) {
        console.error('[NotifPrefs] Failed to load from Supabase:', err);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [user?.id]);

  const updatePreference = useCallback(
    async (category: NotificationCategory, enabled: boolean) => {
      setPreferences((prev) => {
        const updated = { ...prev, [category]: enabled };
        storageSetJSONSync(PREFERENCES_KEY, updated);
        return updated;
      });

      if (!user?.id) return;

      try {
        await supabase.from('notification_preferences').upsert(
          {
            user_id: user.id,
            category,
            enabled,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,category' }
        );
      } catch (err) {
        console.error('[NotifPrefs] Failed to save to Supabase:', err);
      }
    },
    [user?.id]
  );

  const resetPreferences = useCallback(async () => {
    setPreferences(DEFAULT_PREFERENCES);
    storageSetJSONSync(PREFERENCES_KEY, DEFAULT_PREFERENCES);

    if (!user?.id) return;

    try {
      for (const category of NOTIFICATION_CATEGORIES) {
        await supabase.from('notification_preferences').upsert(
          {
            user_id: user.id,
            category,
            enabled: true,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,category' }
        );
      }
    } catch (err) {
      console.error('[NotifPrefs] Failed to reset in Supabase:', err);
    }
  }, [user?.id]);

  return {
    preferences,
    updatePreference,
    resetPreferences,
    isLoading,
  };
}

/**
 * Quiet hours preferences — stored as notification_preferences rows
 * with category 'quiet_hours' (enabled toggle) and localStorage for times
 */
const QUIET_HOURS_KEY = 'elecmate_quiet_hours';

interface QuietHoursPrefs {
  enabled: boolean;
  startHour: number; // 0-23
  endHour: number; // 0-23
}

const DEFAULT_QUIET_HOURS: QuietHoursPrefs = {
  enabled: true,
  startHour: 21, // 9pm
  endHour: 7, // 7am
};

export function useQuietHours() {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState<QuietHoursPrefs>(() => {
    const stored = storageGetJSONSync<Partial<QuietHoursPrefs> | null>(QUIET_HOURS_KEY, null);
    return stored ? { ...DEFAULT_QUIET_HOURS, ...stored } : DEFAULT_QUIET_HOURS;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load from Supabase
  useEffect(() => {
    if (!user?.id) return;
    const load = async () => {
      setIsLoading(true);
      try {
        const { data } = await supabase
          .from('notification_preferences')
          .select('category, enabled')
          .eq('user_id', user.id)
          .eq('category', 'quiet_hours')
          .maybeSingle();

        if (data) {
          setPrefs((prev) => {
            const updated = { ...prev, enabled: data.enabled };
            storageSetJSONSync(QUIET_HOURS_KEY, updated);
            return updated;
          });
        }
      } catch {
        // No quiet hours preference yet — use defaults
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [user?.id]);

  const updateQuietHours = useCallback(
    async (updates: Partial<QuietHoursPrefs>) => {
      setPrefs((prev) => {
        const updated = { ...prev, ...updates };
        storageSetJSONSync(QUIET_HOURS_KEY, updated);
        return updated;
      });

      if (!user?.id) return;

      if (updates.enabled !== undefined) {
        try {
          await supabase.from('notification_preferences').upsert(
            {
              user_id: user.id,
              category: 'quiet_hours',
              enabled: updates.enabled,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id,category' }
          );
        } catch (err) {
          console.error('[QuietHours] Failed to save:', err);
        }
      }
    },
    [user?.id]
  );

  return { quietHours: prefs, updateQuietHours, isLoading };
}
