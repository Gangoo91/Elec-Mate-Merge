import { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Keyboard } from '@capacitor/keyboard';
import { App } from '@capacitor/app';
import { PushNotifications } from '@capacitor/push-notifications';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { openExternalUrl } from '@/utils/open-external-url';

/**
 * Hook to initialize native app features when running in Capacitor
 * Safe to call on web - gracefully handles non-native environment
 */
export function useNativeApp() {
  const isNative = Capacitor.isNativePlatform();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  // Global click handler that intercepts external links on native and routes
  // them through openExternalUrl() (Capacitor Browser / system handler).
  const handleExternalLinkClick = useCallback((e: Event) => {
    const target = (e.target as Element)?.closest?.('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href) return;

    // Only intercept external URLs and app-protocol links
    const isExternal =
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('tel:') ||
      href.startsWith('mailto:');

    if (!isExternal) return;

    // Don't intercept internal links to our own domain used for SPA routing
    try {
      const url = new URL(href, window.location.origin);
      if (
        (url.protocol === 'http:' || url.protocol === 'https:') &&
        url.host === window.location.host
      ) {
        return; // Internal SPA link — let React Router handle it
      }
    } catch {
      // Malformed URL — let it fall through
    }

    e.preventDefault();
    e.stopPropagation();
    openExternalUrl(href);
  }, []);

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

            // Dispatch a custom event so OAuth components can detect app resume
            // reliably (window 'focus' events are unreliable on native)
            window.dispatchEvent(new CustomEvent('capacitor:resume'));

            // Clear delivered notifications + badge when app comes to foreground
            PushNotifications.removeAllDeliveredNotifications().catch(() => {
              // Non-critical
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

        // Handle deep links — extract the path from elecmate:// or https://elec-mate.com/
        App.addListener('appUrlOpen', ({ url }) => {
          console.log('[DeepLink] Opened:', url);
          try {
            const parsed = new URL(url);
            // Support both https://elec-mate.com/path and elecmate://path
            const path = parsed.pathname + parsed.search + parsed.hash;
            if (path && path !== '/') {
              navigateRef.current(path);
            }
          } catch (err) {
            console.warn('[DeepLink] Could not parse URL:', url, err);
          }
        });

        // Global external link interceptor — catches all <a> clicks with
        // external href and routes them through Capacitor Browser instead of
        // letting the WebView navigate away or open inconsistently.
        document.addEventListener('click', handleExternalLinkClick, true);

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
        document.removeEventListener('click', handleExternalLinkClick, true);
      }
    };
  }, [isNative]);

  return { isNative };
}

/**
 * Hook to manage native push notifications.
 * Auto-registers when user is authenticated and shows in-app toasts
 * for foreground notifications so users never miss an alert.
 */
export function useNativePushNotifications() {
  const isNative = Capacitor.isNativePlatform();
  const registered = useRef(false);
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  const savePushToken = useCallback(async (token: string, userId: string) => {
    try {
      const platform = Capacitor.getPlatform();
      const { error } = await supabase.from('push_subscriptions').upsert(
        {
          user_id: userId,
          endpoint: `native:${platform}:${token}`,
          keys: { token, platform },
          device_type: platform,
          is_active: true,
        },
        { onConflict: 'user_id,endpoint' }
      );
      if (error) throw error;
      console.log('Push token saved for', platform);
    } catch (error) {
      console.error('Failed to save push token:', error);
    }
  }, []);

  const navigateFromNotification = useCallback((data: Record<string, string>) => {
    const nav = navigateRef.current;
    const role = data?.role || '';
    if (data?.action === 'open_tasks' || data?.type === 'task') {
      nav('/electrician/tasks');
    } else if (data?.type === 'study') {
      nav('/electrician/study-centre');
    } else if (data?.type === 'mental_health') {
      nav('/electrician/mental-health');
    } else if (data?.type === 'assessment') {
      nav('/electrician/study-centre/apprentice');
    } else if (data?.type === 'briefing') {
      nav('/dashboard');
    } else if (data?.type === 'certificate') {
      nav('/electrician/inspection-testing');
    } else if (data?.type === 'peer' && data?.conversationId) {
      nav(`/electrician/mental-health?tab=mates&conversation=${data.conversationId}`);
    } else if (data?.conversationId) {
      nav(`/electrician/messages?conversation=${data.conversationId}`);
    } else if (data?.quoteId) {
      nav(role === 'employer' ? '/employer?section=quotes' : `/electrician/quotes/view/${data.quoteId}`);
    } else if (data?.invoiceId) {
      nav(role === 'employer' ? '/employer?section=quotes' : `/electrician/invoices/${data.invoiceId}/view`);
    }
  }, []);

  // Auto-register on mount when running natively
  useEffect(() => {
    if (!isNative || registered.current) return;

    const setup = async () => {
      try {
        // Check / request permission
        let permStatus = await PushNotifications.checkPermissions();
        if (permStatus.receive === 'prompt') {
          permStatus = await PushNotifications.requestPermissions();
        }
        if (permStatus.receive !== 'granted') {
          console.log('Push notification permission not granted');
          return;
        }

        // Register with APNS / FCM
        await PushNotifications.register();
        registered.current = true;

        // Token received — persist to Supabase
        PushNotifications.addListener('registration', async (token) => {
          console.log('Push token:', token.value);
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user) {
            savePushToken(token.value, user.id);
          }
        });

        PushNotifications.addListener('registrationError', (error) => {
          console.error('Push registration error:', error);
        });

        // Foreground notification — show in-app toast so the user sees it
        PushNotifications.addListener('pushNotificationReceived', (notification) => {
          console.log('Push received (foreground):', notification);
          toast(notification.title || 'Notification', {
            description: notification.body,
            duration: 5000,
            action: notification.data
              ? {
                  label: 'View',
                  onClick: () => navigateFromNotification(notification.data),
                }
              : undefined,
          });
        });

        // Notification tapped — deep link
        PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
          console.log('Push tap:', action);
          if (action.notification.data) {
            navigateFromNotification(action.notification.data);
          }
        });
      } catch (error) {
        console.error('Push notification setup error:', error);
      }
    };

    setup();

    return () => {
      PushNotifications.removeAllListeners();
    };
  }, [isNative, savePushToken, navigateFromNotification]);

  return { isNative };
}
