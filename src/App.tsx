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
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import PostHogProvider from '@/components/analytics/PostHogProvider';
import { useNativeApp } from '@/hooks/useNativeApp';

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
          <PostHogProvider>
            <ThemeProvider defaultTheme="dark" storageKey="elec-ui-theme">
              <NotificationProvider>
                <NativeAppInit>
                  <TrainingActivityMonitor />
                  <AppRouter />
                  <Toaster />
                  <SonnerToaster />
                  <PWAUpdatePrompt />
                  <SpeedInsights />
                  <Analytics />
                </NativeAppInit>
              </NotificationProvider>
            </ThemeProvider>
          </PostHogProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
