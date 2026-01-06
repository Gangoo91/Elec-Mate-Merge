import { supabase } from '@/integrations/supabase/client';

interface PushSubscriptionData {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

/**
 * Check if push notifications are supported
 */
export const isPushSupported = (): boolean => {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
};

/**
 * Get current notification permission status
 */
export const getPermissionStatus = (): NotificationPermission => {
  if (!('Notification' in window)) return 'denied';
  return Notification.permission;
};

/**
 * Request notification permission
 */
export const requestPermission = async (): Promise<NotificationPermission> => {
  if (!isPushSupported()) {
    console.warn('Push notifications not supported');
    return 'denied';
  }

  const permission = await Notification.requestPermission();
  return permission;
};

/**
 * Register service worker for push notifications
 */
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service workers not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('Service Worker registered:', registration.scope);
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
};

/**
 * Get or create push subscription
 */
export const subscribeToPush = async (
  registration: ServiceWorkerRegistration,
  vapidPublicKey: string
): Promise<PushSubscription | null> => {
  try {
    // Check existing subscription
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      // Create new subscription
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });
    }

    return subscription;
  } catch (error) {
    console.error('Failed to subscribe to push:', error);
    return null;
  }
};

/**
 * Save push subscription to database
 */
export const savePushSubscription = async (
  userId: string,
  subscription: PushSubscription
): Promise<boolean> => {
  try {
    const subscriptionData: PushSubscriptionData = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: arrayBufferToBase64(subscription.getKey('p256dh')!),
        auth: arrayBufferToBase64(subscription.getKey('auth')!),
      },
    };

    // Check if subscription exists
    const { data: existing } = await supabase
      .from('push_subscriptions')
      .select('id')
      .eq('user_id', userId)
      .eq('endpoint', subscriptionData.endpoint)
      .single();

    if (existing) {
      // Update existing
      const { error } = await supabase
        .from('push_subscriptions')
        .update({
          keys: subscriptionData.keys,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);

      return !error;
    } else {
      // Insert new
      const { error } = await supabase
        .from('push_subscriptions')
        .insert({
          user_id: userId,
          endpoint: subscriptionData.endpoint,
          keys: subscriptionData.keys,
          device_type: getDeviceType(),
          browser: getBrowserName(),
        });

      return !error;
    }
  } catch (error) {
    console.error('Failed to save push subscription:', error);
    return false;
  }
};

/**
 * Unsubscribe from push notifications
 */
export const unsubscribeFromPush = async (
  userId: string
): Promise<boolean> => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();

      // Remove from database
      await supabase
        .from('push_subscriptions')
        .delete()
        .eq('user_id', userId)
        .eq('endpoint', subscription.endpoint);
    }

    return true;
  } catch (error) {
    console.error('Failed to unsubscribe from push:', error);
    return false;
  }
};

/**
 * Show a local notification
 */
export const showLocalNotification = async (
  title: string,
  options?: NotificationOptions
): Promise<void> => {
  if (getPermissionStatus() !== 'granted') return;

  const registration = await navigator.serviceWorker.ready;
  await registration.showNotification(title, {
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    ...options,
  });
};

/**
 * Show message notification
 */
export const showMessageNotification = async (
  senderName: string,
  message: string,
  conversationId: string,
  avatarUrl?: string
): Promise<void> => {
  await showLocalNotification(senderName, {
    body: message.length > 100 ? message.slice(0, 100) + '...' : message,
    icon: avatarUrl || '/icons/icon-192x192.png',
    tag: `message-${conversationId}`,
    renotify: true,
    data: {
      type: 'message',
      conversationId,
      url: `/messages/${conversationId}`,
    },
    actions: [
      { action: 'reply', title: 'Reply' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  });
};

// Helper functions
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
  return 'desktop';
}

function getBrowserName(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  if (ua.includes('Opera')) return 'Opera';
  return 'Unknown';
}
