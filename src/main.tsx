// Debug logging for production troubleshooting
console.log("[Elec-Mate] main.tsx loading...");

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/common/ErrorBoundary.tsx";
import { initPostHog } from "./components/analytics/PostHogProvider.tsx";
import { initSentry } from "./lib/sentry.ts";

console.log("[Elec-Mate] All imports loaded");

// Initialize error tracking first (catches errors during init)
initSentry();

// Initialize PostHog analytics early
initPostHog();

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

console.log("[Elec-Mate] Render complete");
