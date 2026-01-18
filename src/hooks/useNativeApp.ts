import { useEffect, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Keyboard } from '@capacitor/keyboard';
import { App } from '@capacitor/app';
import { PushNotifications } from '@capacitor/push-notifications';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to initialize native app features when running in Capacitor
 * Safe to call on web - gracefully handles non-native environment
 */
export function useNativeApp() {
  const isNative = Capacitor.isNativePlatform();

  // Initialize native features on mount
  useEffect(() => {
    if (!isNative) return;

    const initNative = async () => {
      try {
        // Configure status bar (dark theme)
        await StatusBar.setStyle({ style: Style.Dark });
        if (Capacitor.getPlatform() === 'android') {
          await StatusBar.setBackgroundColor({ color: '#0a0a0a' });
        }

        // Hide splash screen after app is ready
        await SplashScreen.hide();

        // Set up keyboard listeners
        Keyboard.addListener('keyboardWillShow', () => {
          document.body.classList.add('keyboard-open');
        });
        Keyboard.addListener('keyboardWillHide', () => {
          document.body.classList.remove('keyboard-open');
        });

        // Handle app state changes (background/foreground)
        App.addListener('appStateChange', ({ isActive }) => {
          if (isActive) {
            // App came to foreground - refresh data if needed
            console.log('App resumed');
          }
        });

        // Handle deep links
        App.addListener('appUrlOpen', ({ url }) => {
          console.log('Deep link opened:', url);
          // Handle your deep links here
          // e.g., quote acceptance links, password reset, etc.
        });

        console.log('Native app initialized');
      } catch (error) {
        console.error('Native init error:', error);
      }
    };

    initNative();

    // Cleanup
    return () => {
      if (isNative) {
        Keyboard.removeAllListeners();
        App.removeAllListeners();
      }
    };
  }, [isNative]);

  return { isNative };
}

/**
 * Hook to manage native push notifications
 * Separate from useNativeApp for flexibility
 */
export function useNativePushNotifications() {
  const isNative = Capacitor.isNativePlatform();

  const registerPushNotifications = useCallback(async () => {
    if (!isNative) return null;

    try {
      // Request permission
      const permStatus = await PushNotifications.requestPermissions();

      if (permStatus.receive !== 'granted') {
        console.log('Push notification permission denied');
        return null;
      }

      // Register with APNS/FCM
      await PushNotifications.register();

      // Listen for registration token
      const tokenPromise = new Promise<string>((resolve) => {
        PushNotifications.addListener('registration', (token) => {
          console.log('Push registration token:', token.value);
          resolve(token.value);
        });
      });

      // Listen for errors
      PushNotifications.addListener('registrationError', (error) => {
        console.error('Push registration error:', error);
      });

      // Listen for notifications received while app is open
      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Push notification received:', notification);
        // You can show an in-app notification here
      });

      // Listen for notification tapped
      PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
        console.log('Push notification action:', action);
        // Handle notification tap - navigate to relevant screen
        const data = action.notification.data;
        if (data?.conversationId) {
          // Navigate to chat
          window.location.href = `/mental-health?chat=${data.conversationId}`;
        } else if (data?.quoteId) {
          // Navigate to quote
          window.location.href = `/quote/${data.quoteId}`;
        } else if (data?.invoiceId) {
          // Navigate to invoice
          window.location.href = `/invoice/${data.invoiceId}`;
        }
      });

      return await tokenPromise;
    } catch (error) {
      console.error('Push notification setup error:', error);
      return null;
    }
  }, [isNative]);

  const savePushToken = useCallback(async (token: string, userId: string) => {
    try {
      const platform = Capacitor.getPlatform(); // 'ios' or 'android'

      // Save to your push_subscriptions table
      const { error } = await supabase
        .from('push_subscriptions')
        .upsert({
          user_id: userId,
          endpoint: `native:${platform}:${token}`,
          keys: { token, platform },
          device_type: platform,
          is_active: true,
        }, {
          onConflict: 'user_id,endpoint'
        });

      if (error) throw error;
      console.log('Push token saved for', platform);
    } catch (error) {
      console.error('Failed to save push token:', error);
    }
  }, []);

  return {
    isNative,
    registerPushNotifications,
    savePushToken,
  };
}
