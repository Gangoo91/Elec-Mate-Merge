// Debug logging for production troubleshooting
console.log("[Elec-Mate] main.tsx loading...");

import { createRoot } from "react-dom/client";
import { Capacitor } from "@capacitor/core";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/common/ErrorBoundary.tsx";
import { initPostHog } from "./components/analytics/PostHogProvider.tsx";
import { initSentry, captureError, addBreadcrumb } from "./lib/sentry.ts";

console.log("[Elec-Mate] All imports loaded");

// Initialize error tracking first (catches errors during init)
initSentry();

// Global network error detection
window.addEventListener('offline', () => {
  addBreadcrumb('Network went offline', 'network', { online: false });
});

window.addEventListener('online', () => {
  addBreadcrumb('Network came back online', 'network', { online: true });
});

// Initialize PostHog analytics early
initPostHog();

// Global handler for chunk loading failures (stale deployment cache)
// This catches errors before they reach React's ErrorBoundary
const handleChunkError = (event: ErrorEvent | PromiseRejectionEvent) => {
  const error = 'reason' in event ? event.reason : event.error;
  const errorString = `${error?.message || ''} ${error?.toString() || ''}`.toLowerCase();

  if (errorString.includes('dynamically imported module') ||
      errorString.includes('failed to fetch') ||
      errorString.includes('loading chunk') ||
      errorString.includes('loading css chunk') ||
      errorString.includes('failed to load module script') ||
      errorString.includes('mime type') ||
      errorString.includes('text/html')) {
    console.log('[Elec-Mate] Chunk load failure detected, refreshing...');
    event.preventDefault();
    // Clear caches and reload
    if ('caches' in window) {
      caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
        .finally(() => window.location.reload());
    } else {
      window.location.reload();
    }
  }
};

window.addEventListener('error', handleChunkError);
window.addEventListener('unhandledrejection', handleChunkError);

// Add Android status bar spacer
if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android") {
  const spacer = document.createElement("div");
  spacer.id = "android-status-bar-spacer";
  spacer.style.cssText = "height: 68px; width: 100%; background-color: #0a0a0a; position: fixed; top: 0; left: 0; z-index: 99999;";
  document.body.insertBefore(spacer, document.body.firstChild);
  document.body.style.paddingTop = "68px";
  console.log("[Elec-Mate] Android status bar spacer added (68px)");
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("[Elec-Mate] Root element not found!");
  throw new Error("Root element not found");
}

console.log("[Elec-Mate] Rendering app...");

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

console.log("[Elec-Mate] Render complete");
