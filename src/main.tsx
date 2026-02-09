// Debug logging for production troubleshooting
console.log('[Elec-Mate] main.tsx loading...');

declare global {
  interface Window {
    __chunkLoadRetried?: boolean;
  }
}

import { createRoot } from 'react-dom/client';
import { Capacitor } from '@capacitor/core';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/common/ErrorBoundary.tsx';

console.log('[Elec-Mate] All imports loaded');

// Defer analytics loading until after app is interactive (saves ~427KB from initial bundle)
const initAnalyticsDeferred = () => {
  // Use requestIdleCallback if available, otherwise setTimeout
  const scheduleInit = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1));

  scheduleInit(() => {
    // Dynamically import analytics to defer bundle loading
    import('./lib/sentry.ts').then(({ initSentry, addBreadcrumb }) => {
      initSentry();

      // Global network error detection (after Sentry is ready)
      window.addEventListener('offline', () => {
        addBreadcrumb('Network went offline', 'network', { online: false });
      });
      window.addEventListener('online', () => {
        addBreadcrumb('Network came back online', 'network', { online: true });
      });
    });

    import('./components/analytics/PostHogProvider.tsx').then(({ initPostHog }) => {
      initPostHog();
    });

    console.log('[Elec-Mate] Analytics initialized (deferred)');
  });
};

// Global handler for chunk loading failures (stale deployment cache)
// This catches errors before they reach React's ErrorBoundary
const handleChunkError = (event: ErrorEvent | PromiseRejectionEvent) => {
  // Skip if already handled by index.html handler
  if (window.__chunkLoadRetried) return;

  const error = 'reason' in event ? event.reason : (event as ErrorEvent).error;
  const filename = (event as ErrorEvent).filename || '';
  const errorString = `${error?.message || ''} ${error?.toString() || ''}`.toLowerCase();

  // Ignore third-party script errors
  if (filename && !filename.includes(location.hostname)) return;

  if (
    errorString.includes('dynamically imported module') ||
    errorString.includes('loading chunk') ||
    errorString.includes('loading css chunk') ||
    errorString.includes('failed to load module script') ||
    errorString.includes('mime type') ||
    errorString.includes('text/html')
  ) {
    console.log('[Elec-Mate] Chunk load failure detected, refreshing...');
    event.preventDefault();
    sessionStorage.setItem('__chunkRetried', '1');
    if ('caches' in window) {
      caches
        .keys()
        .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
        .finally(() => window.location.reload());
    } else {
      window.location.reload();
    }
  }
};

window.addEventListener('error', handleChunkError);
window.addEventListener('unhandledrejection', handleChunkError);

// Add Android status bar spacer
if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android') {
  const spacer = document.createElement('div');
  spacer.id = 'android-status-bar-spacer';
  spacer.style.cssText =
    'height: 68px; width: 100%; background-color: #0a0a0a; position: fixed; top: 0; left: 0; z-index: 99999;';
  document.body.insertBefore(spacer, document.body.firstChild);
  document.body.style.paddingTop = '68px';
  // Expose spacer height as CSS variable so fixed-position elements (toasts, modals) can offset
  document.documentElement.style.setProperty('--native-header-offset', '68px');
  console.log('[Elec-Mate] Android status bar spacer added (68px)');
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('[Elec-Mate] Root element not found!');
  throw new Error('Root element not found');
}

console.log('[Elec-Mate] Rendering app...');

createRoot(rootElement).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

// Hide loading state and error fallback once React has mounted
const initialLoading = document.getElementById('initial-loading');
const loadError = document.getElementById('load-error');
if (initialLoading) initialLoading.style.display = 'none';
if (loadError) loadError.style.display = 'none';

// Initialize analytics after app is rendered and interactive
initAnalyticsDeferred();

console.log('[Elec-Mate] Render complete');
