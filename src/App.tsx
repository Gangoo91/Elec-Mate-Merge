import './App.css';
import AppRouter from './AppRouter';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter } from 'react-router-dom';
import TrainingActivityMonitor from '@/components/apprentice/TrainingActivityMonitor';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/components/notifications/NotificationProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import ScrollToTop from '@/components/ScrollToTop';
import { PWAUpdatePrompt } from '@/components/PWAUpdatePrompt';
import { CookieConsent } from '@/components/CookieConsent';
import { useNativeApp } from '@/hooks/useNativeApp';
import { lazy, Suspense } from 'react';

// Lazy load analytics components to defer ~427KB from initial bundle
const PostHogProvider = lazy(() => import('@/components/analytics/PostHogProvider'));
const SpeedInsights = lazy(() => import('@vercel/speed-insights/react').then(m => ({ default: m.SpeedInsights })));
const Analytics = lazy(() => import('@vercel/analytics/react').then(m => ({ default: m.Analytics })));

// Initialize native app features (Capacitor)
function NativeAppInit({ children }: { children: React.ReactNode }) {
  useNativeApp();
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider defaultTheme="dark" storageKey="elec-ui-theme">
            <NotificationProvider>
              <NativeAppInit>
                {/* Analytics providers load async - don't block render */}
                <Suspense fallback={null}>
                  <PostHogProvider>
                    <></>
                  </PostHogProvider>
                </Suspense>
                <TrainingActivityMonitor />
                <AppRouter />
                <Toaster />
                <SonnerToaster />
                <PWAUpdatePrompt />
                <CookieConsent />
                {/* Vercel analytics load after app is interactive */}
                <Suspense fallback={null}>
                  <SpeedInsights />
                  <Analytics />
                </Suspense>
              </NativeAppInit>
            </NotificationProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
