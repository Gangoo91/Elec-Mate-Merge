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
import { shareContent } from '@/utils/share';

// localStorage key used to remember a "share the referral link" intent when a
// push is tapped while the user is logged out. Consumed after next successful
// sign-in so the moment isn't lost to the auth redirect.
const PENDING_SHARE_INTENT_KEY = 'pending_share_intent';

/**
 * Fire the system share sheet for a logged-in user's referral link. Uses the
 * same copy as `useReferralShare` in /settings?tab=referrals so the message
 * is identical regardless of whether the user is sharing from settings or
 * from a push tap.
 */
async function fireReferralShareIntent(userId: string, src: string): Promise<void> {
  const { data } = await supabase
    .from('referral_codes')
    .select('code')
    .eq('user_id', userId)
    .eq('is_active', true)
    .maybeSingle();

  const code = (data as { code?: string } | null)?.code;
  if (!code) {
    console.warn('[referral-share] No referral code found for user', userId);
    return;
  }

  const referralUrl = `https://elec-mate.com/auth/signup?ref=${code}&src=${src}`;
  const message =
    `Alright mate, check out Elec-Mate — does all your certs, quotes, invoices, and even has an AI agent for regs and admin.\n\n` +
    `I use it daily. Sign up with my link and your first month's free:\n${referralUrl}\n\n` +
    `Proper game changer for the paperwork.`;

  await shareContent({
    title: 'Try Elec-Mate — Free Month',
    text: message,
    url: referralUrl,
  });

  // Fire-and-forget analytics — never block the share on this
  supabase
    .from('referral_share_events')
    .insert({
      user_id: userId,
      channel: 'native_share',
      context: `push_tap_${src}`,
      referral_code: code,
    })
    .then(
      () => {},
      () => {}
    );
}

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
            // Persist referral codes regardless of timing — covers /r/:code paths
            // and ?ref=XYZ query params. Read by SignUp on account creation.
            const refFromQuery = parsed.searchParams.get('ref');
            const refFromPath = parsed.pathname.match(/^\/r\/([A-Za-z0-9_-]+)/)?.[1];
            const referralCode = (refFromQuery || refFromPath || '').toUpperCase();
            if (referralCode) {
              try {
                localStorage.setItem('elec-mate-referral-code', referralCode);
              } catch {
                /* storage unavailable — not fatal */
              }
            }
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

    // Referral pushes — tap fires the native share sheet directly instead of
    // dumping the user in Settings. If logged out, store an intent flag so
    // the share fires as soon as auth completes. Category arrives qualified
    // from the engine (e.g. "referral_push__cert_completed"), so we prefix
    // match and also look at `action` as a fallback.
    const isReferralPush =
      (typeof data?.category === 'string' && data.category.startsWith('referral_push')) ||
      data?.action === 'open_referral';
    if (isReferralPush) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user?.id) {
          fireReferralShareIntent(user.id, 'push').catch((err) =>
            console.warn('[referral-share] Share from push tap failed:', err)
          );
        } else {
          try {
            localStorage.setItem(
              PENDING_SHARE_INTENT_KEY,
              JSON.stringify({ kind: 'referral', src: 'push', ts: Date.now() })
            );
          } catch {
            /* ignore — fallback to settings nav below */
          }
          nav('/auth/signin');
        }
      });
      return;
    }

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
      nav(
        role === 'employer'
          ? '/employer?section=quotes'
          : `/electrician/quotes/view/${data.quoteId}`
      );
    } else if (data?.invoiceId) {
      nav(
        role === 'employer'
          ? '/employer?section=quotes'
          : `/electrician/invoices/${data.invoiceId}/view`
      );
    } else if (data?.deep_link) {
      // Generic fallback — any push that sets a `deep_link` in its data
      // payload will be routed to that path even if no specific `type`
      // matches above.
      nav(data.deep_link);
    }
  }, []);

  // Consume any pending "share the referral link" intent saved when the user
  // tapped a referral push while logged out. Watches auth state so the share
  // sheet opens immediately after a successful sign-in, bridging the gap
  // between push tap → login → share-the-link moment.
  useEffect(() => {
    // Pending intents are only ever written by native push notification handlers,
    // so this entire effect is a no-op on web. Skip it to avoid the extra
    // supabase.auth.getUser() network call and onAuthStateChange listener that
    // were causing a race condition / token refresh loop on Firefox.
    if (!isNative) return;

    const consumePendingIntent = async (userId: string) => {
      let raw: string | null = null;
      try {
        raw = localStorage.getItem(PENDING_SHARE_INTENT_KEY);
      } catch {
        return;
      }
      if (!raw) return;

      try {
        const intent = JSON.parse(raw) as { kind: string; src?: string; ts?: number };
        // Guard against stale intents more than 15 minutes old
        if (intent.ts && Date.now() - intent.ts > 15 * 60 * 1000) {
          localStorage.removeItem(PENDING_SHARE_INTENT_KEY);
          return;
        }
        if (intent.kind === 'referral') {
          // Clear first so a failure doesn't cause an infinite retry loop
          localStorage.removeItem(PENDING_SHARE_INTENT_KEY);
          await fireReferralShareIntent(userId, intent.src || 'push_post_login');
        }
      } catch {
        localStorage.removeItem(PENDING_SHARE_INTENT_KEY);
      }
    };

    // Fire once on mount if a session is already live (user taps push while
    // already signed in but some other effect races the auth state).
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.id) consumePendingIntent(user.id);
    });

    // Also watch future auth state changes — this handles the logged-out →
    // signed-in transition after tapping a push.
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session?.user?.id) {
        consumePendingIntent(session.user.id);
      }
    });

    return () => {
      sub.subscription.unsubscribe();
    };
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
