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
          // Solid dark status bar that doesn't overlap content
          await StatusBar.setOverlaysWebView({ overlay: false });
          await StatusBar.setBackgroundColor({ color: '#0a0a0a' });
        }

        if (Capacitor.getPlatform() === 'ios') {
          // iOS can use overlay with safe-area insets
          await StatusBar.setOverlaysWebView({ overlay: true });
        }

        // Hide splash screen after first React paint — requestAnimationFrame
        // ensures the browser has committed at least one frame so the user
        // transitions directly from the native splash to rendered content.
        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => {
            requestAnimationFrame(async () => {
              await SplashScreen.hide({ fadeOutDuration: 300 });
              resolve();
            });
          });
        });

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
            supabase.auth.refreshSession().catch(() => {
              // Non-critical — session may already be valid
            });
          }
        });

        // Handle Android hardware back button — navigate back or minimise app
        App.addListener('backButton', ({ canGoBack }) => {
          if (canGoBack || window.history.length > 1) {
            window.history.back();
          } else {
            // At root — minimise instead of exiting
            App.minimizeApp();
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
        const data = action.notification.data;
        const role = data?.role || '';

        if (data?.action === 'open_tasks' || data?.type === 'task') {
          window.location.href = '/electrician/tasks';
        } else if (data?.type === 'study') {
          window.location.href = '/electrician/study-centre';
        } else if (data?.type === 'mental_health') {
          window.location.href = '/electrician/mental-health';
        } else if (data?.type === 'assessment') {
          window.location.href = '/electrician/study-centre/apprentice';
        } else if (data?.type === 'briefing') {
          window.location.href = '/dashboard';
        } else if (data?.type === 'certificate') {
          window.location.href = '/electrician/inspection-testing';
        } else if (data?.type === 'peer' && data?.conversationId) {
          window.location.href = `/electrician/mental-health?tab=mates&conversation=${data.conversationId}`;
        } else if (data?.conversationId) {
          window.location.href = `/electrician/messages?conversation=${data.conversationId}`;
        } else if (data?.quoteId) {
          window.location.href =
            role === 'employer'
              ? '/employer?section=quotes'
              : `/electrician/quotes/view/${data.quoteId}`;
        } else if (data?.invoiceId) {
          window.location.href =
            role === 'employer'
              ? '/employer?section=quotes'
              : `/electrician/invoices/${data.invoiceId}/view`;
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
      const { error } = await supabase.from('push_subscriptions').upsert(
        {
          user_id: userId,
          endpoint: `native:${platform}:${token}`,
          keys: { token, platform },
          device_type: platform,
          is_active: true,
        },
        {
          onConflict: 'user_id,endpoint',
        }
      );

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
