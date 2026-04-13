// Debug logging for production troubleshooting
console.log('[Elec-Mate] main.tsx loading...');

declare global {
  interface Window {
    __chunkLoadRetried?: boolean;
  }
}

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Capacitor } from '@capacitor/core';
import { initSentry, addBreadcrumb } from './lib/sentry';
import './index.css';

console.log('[Elec-Mate] Core imports loaded');

// ── SENTRY FIRST — initialise BEFORE anything else so boot errors are captured ──
initSentry();

// Global network error detection
window.addEventListener('offline', () => {
  addBreadcrumb('Network went offline', 'network', { online: false });
});
window.addEventListener('online', () => {
  addBreadcrumb('Network came back online', 'network', { online: true });
});

// Defer PostHog (non-critical analytics) until after app is interactive
const initAnalyticsDeferred = () => {
  const scheduleInit = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1));
  scheduleInit(() => {
    import('./components/analytics/PostHogProvider.tsx').then(({ initPostHog }) => {
      initPostHog();
    });
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

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('[Elec-Mate] Root element not found!');
  throw new Error('Root element not found');
}

// ELE-398: On native platforms, prime the Capacitor auth cache BEFORE importing
// App (which triggers createClient via the supabase/client.ts import chain).
// This ensures GoTrue's synchronous getItem() during initialisation finds the
// stored session tokens in the in-memory cache. On web this is a no-op — App
// is imported immediately.
const bootstrap = async () => {
  if (Capacitor.isNativePlatform()) {
    const [{ primeAuthCache }, { primeStorageCache }] = await Promise.all([
      import('./integrations/supabase/capacitorStorage'),
      import('./utils/storage'),
    ]);
    await Promise.all([primeAuthCache(), primeStorageCache()]);
    console.log('[Elec-Mate] Auth + storage caches primed from Capacitor Preferences');
  }

  // Dynamic import so createClient() runs AFTER the cache is primed
  const [{ default: App }, { default: ErrorBoundary }] = await Promise.all([
    import('./App.tsx'),
    import('./components/common/ErrorBoundary.tsx'),
  ]);

  console.log('[Elec-Mate] Rendering app...');

  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  rootElement.setAttribute('data-react-mounted', '1');

  // Hide loading state and error fallback once React has mounted
  const initialLoading = document.getElementById('initial-loading');
  const loadError = document.getElementById('load-error');
  if (initialLoading) initialLoading.style.display = 'none';
  if (loadError) loadError.style.display = 'none';

  // Initialize analytics after app is rendered and interactive
  initAnalyticsDeferred();

  console.log('[Elec-Mate] Render complete');
};

// Visible boot error reporter — if bootstrap() throws on native, the user
// otherwise sees a black screen because the splash never hides. Painting the
// error stack to the page lets us actually diagnose what's wrong on TestFlight.
function showBootError(err: unknown) {
  try {
    const e = err instanceof Error ? err : new Error(String(err));
    const msg = `${e.name}: ${e.message}\n\n${e.stack || '(no stack)'}`;
    console.error('[Elec-Mate] BOOT FAILED', msg);
    const el = document.getElementById('root');
    if (el) {
      const escape = (c: string) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c] || c;
      el.innerHTML =
        '<div style="position:fixed;inset:0;background:#0a0a0a;color:#facc15;font-family:system-ui,-apple-system,sans-serif;padding:24px;padding-top:env(safe-area-inset-top,24px);overflow:auto;-webkit-overflow-scrolling:touch;">' +
        '<h1 style="font-size:18px;font-weight:700;margin:0 0 12px">App failed to start</h1>' +
        '<p style="font-size:13px;color:#e5e7eb;margin:0 0 16px">Send this screen to support so we can fix it.</p>' +
        '<pre style="font-size:11px;color:#fff;background:#111;padding:12px;border-radius:8px;border:1px solid #333;white-space:pre-wrap;word-break:break-word;line-height:1.5">' +
        msg.replace(/[<>&]/g, escape) +
        '</pre>' +
        '<button onclick="window.location.reload()" style="margin-top:16px;background:#facc15;color:#000;border:0;padding:14px 24px;border-radius:10px;font-weight:700;font-size:14px;width:100%">Retry</button>' +
        '</div>';
    }
  } catch {
    /* swallow — we're already in the error path */
  }
}

window.addEventListener('error', (e) => {
  if (!document.getElementById('root')?.getAttribute('data-react-mounted')) {
    showBootError((e as ErrorEvent).error || (e as ErrorEvent).message);
  }
});
window.addEventListener('unhandledrejection', (e) => {
  if (!document.getElementById('root')?.getAttribute('data-react-mounted')) {
    showBootError((e as PromiseRejectionEvent).reason);
  }
});

// 8s safety net — if React still hasn't rendered, surface whatever's left.
setTimeout(() => {
  const root = document.getElementById('root');
  if (root && !root.getAttribute('data-react-mounted')) {
    showBootError(
      new Error(
        'Bootstrap timeout: React did not mount within 8 seconds. Native plugin init may be blocking.'
      )
    );
  }
}, 8000);

bootstrap().catch(showBootError);
