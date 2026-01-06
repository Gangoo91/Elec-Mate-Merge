import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
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
    if (!isSupported || !user?.id) {
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
      const perm = await requestPermission();
      setPermission(perm);

      if (perm !== 'granted') {
        toast({
          title: 'Permission Denied',
          description: 'Please enable notifications in your browser settings.',
          variant: 'destructive',
        });
        return false;
      }

      // Register service worker
      const registration = await registerServiceWorker();
      if (!registration) {
        throw new Error('Failed to register service worker');
      }

      // Wait for service worker to be ready
      await navigator.serviceWorker.ready;

      // Subscribe to push
      const subscription = await subscribeToPush(registration, VAPID_PUBLIC_KEY);
      if (!subscription) {
        throw new Error('Failed to create push subscription');
      }

      // Save to database
      const saved = await savePushSubscription(user.id, subscription);
      if (!saved) {
        throw new Error('Failed to save subscription');
      }

      setIsSubscribed(true);
      toast({
        title: 'Notifications Enabled',
        description: 'You will now receive message notifications.',
      });

      return true;
    } catch (error) {
      console.error('Failed to subscribe to push:', error);
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
  const showNotification = useCallback(async (
    title: string,
    body: string,
    data?: Record<string, unknown>
  ): Promise<void> => {
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
  }, [permission]);

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
export function useMessageNotifications(
  onNotificationClick?: (conversationId: string) => void
) {
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
 * Notification preferences hook
 */
export interface NotificationPreferences {
  messages: boolean;
  mentions: boolean;
  reactions: boolean;
  applications: boolean;
  sound: boolean;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  messages: true,
  mentions: true,
  reactions: true,
  applications: true,
  sound: true,
};

const PREFERENCES_KEY = 'elecmate_notification_preferences';

export function useNotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationPreferences>(() => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  const updatePreferences = useCallback((updates: Partial<NotificationPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(DEFAULT_PREFERENCES));
  }, []);

  return {
    preferences,
    updatePreferences,
    resetPreferences,
  };
}
