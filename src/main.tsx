// Debug logging for production troubleshooting
console.log("[Elec-Mate] main.tsx loading...");

import { createRoot } from "react-dom/client";
import { Capacitor } from "@capacitor/core";
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

console.log("[Elec-Mate] Render complete");
