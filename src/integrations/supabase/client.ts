import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { generateRequestId } from '@/utils/logger';
import { authStorage } from './capacitorStorage';

export const SUPABASE_URL = 'https://jtwygbeceundfgnkirof.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

// ELE-1273: supabase-js serialises token refresh across tabs via
// navigator.locks with NO acquire timeout. When Chrome freezes a background
// tab that holds the lock (common on low-RAM machines with many tabs open),
// every other tab's queries wait on the lock forever — permanent skeletons
// and mutations stuck mid-flight. The 30s fetch timeout below never fires
// because the request is queued BEFORE fetch. Cap the wait at 5s, then
// proceed without the lock: a concurrent refresh across tabs is tolerated by
// Supabase's refresh-token reuse grace window; a deadlocked app is not.
const lockWithTimeout = async <R>(
  name: string,
  _acquireTimeout: number,
  fn: () => Promise<R>
): Promise<R> => {
  if (typeof navigator === 'undefined' || !navigator.locks) return fn();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    return await navigator.locks.request(name, { signal: controller.signal }, fn);
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return fn();
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
};

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: authStorage,
    persistSession: true,
    autoRefreshToken: true,
    lock: lockWithTimeout,
    // ELE-398: Prevent URL-based session detection on native — no auth tokens
    // arrive via URL hash on Capacitor. Without this, GoTrue checks the URL first,
    // finds nothing, and may interfere with storage-based session restoration.
    detectSessionInUrl: false,
    // PKCE flow is recommended for native apps (more secure, no implicit tokens)
    flowType: 'pkce',
  },
  global: {
    fetch: (url, options = {}) => {
      // Generate request ID for end-to-end tracing
      const requestId = generateRequestId();

      // Merge existing headers with request ID
      const headers = new Headers(options.headers || {});
      headers.set('x-request-id', requestId);

      // Use caller's signal if provided, otherwise apply a default timeout.
      // Edge function calls (functions/v1/) get 10 minutes for AI jobs.
      // Everything else (auth, DB, storage) gets 30 seconds.
      const isEdgeFunction = typeof url === 'string' && url.includes('/functions/v1/');
      const timeout = isEdgeFunction ? 600000 : 30000;

      return fetch(url, {
        ...options,
        headers,
        signal: options.signal || AbortSignal.timeout(timeout),
      });
    },
  },
});
