import './App.css';
import AppRouter from './AppRouter';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { BrowserRouter } from 'react-router-dom';
import TrainingActivityMonitor from '@/components/apprentice/TrainingActivityMonitor';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/components/notifications/NotificationProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import ScrollToTop from '@/components/ScrollToTop';
import { PWAUpdatePrompt } from '@/components/PWAUpdatePrompt';
import { CookieConsent } from '@/components/CookieConsent';
import { useNativeApp, useNativePushNotifications } from '@/hooks/useNativeApp';
import { ActivityTracker } from '@/components/ActivityTracker';
import { InAppBrowserDetector } from '@/components/InAppBrowserDetector';
import { lazy, Suspense } from 'react';
import { Capacitor } from '@capacitor/core';

// Lazy load analytics components to defer ~427KB from initial bundle
const PostHogProvider = lazy(() => import('@/components/analytics/PostHogProvider'));
const SpeedInsights = lazy(() =>
  import('@vercel/speed-insights/react').then((m) => ({ default: m.SpeedInsights }))
);
const Analytics = lazy(() =>
  import('@vercel/analytics/react').then((m) => ({ default: m.Analytics }))
);

// Initialize native app features (Capacitor)
function NativeAppInit({ children }: { children: React.ReactNode }) {
  useNativeApp();
  useNativePushNotifications();
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Web-only: detect in-app browsers — not needed in native app */}
      {!Capacitor.isNativePlatform() && <InAppBrowserDetector />}
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider forcedTheme="dark">
            <NotificationProvider>
              <NativeAppInit>
                {/* Activity tracking - logs user events to Supabase */}
                <ActivityTracker />
                {/* Analytics providers load async - don't block render */}
                <Suspense fallback={null}>
                  <PostHogProvider>
                    <></>
                  </PostHogProvider>
                </Suspense>
                <TrainingActivityMonitor />
                <AppRouter />
                <SonnerToaster />
                {/* Web-only components — not needed in native app */}
                {!Capacitor.isNativePlatform() && (
                  <>
                    <PWAUpdatePrompt />
                    <CookieConsent />
                  </>
                )}
                {/* Vercel analytics — web only (not designed for Capacitor native) */}
                {!Capacitor.isNativePlatform() && (
                  <Suspense fallback={null}>
                    <SpeedInsights />
                    <Analytics />
                  </Suspense>
                )}
              </NativeAppInit>
            </NotificationProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
