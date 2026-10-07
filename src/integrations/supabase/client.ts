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

/*
 * ELE-1912 — getUser() was the app's hidden waterfall.
 *
 * supabase-js runs every no-argument `auth.getUser()` INSIDE the auth lock,
 * and every REST/RPC call also takes that lock to read the token. So the ten
 * or so hooks that call getUser() on a screen's first render each made a
 * network round trip ONE AFTER ANOTHER, and every query queued behind them
 * (measured on /college/help: 10 serial /auth/v1/user calls, ~45 ms each,
 * before the page's own RPC could even start).
 *
 * Same answer, without the queue: read the session (local, fast), then ask
 * the server about THAT token via getUser(jwt) — which skips the lock — and
 * share one in-flight answer between every caller with the same token for a
 * few seconds. The server still validates the token (a revoked session still
 * comes back as an error and signs the user out, exactly as before); sign-out
 * and user updates drop the shared answer at once, and a refreshed token is a
 * new key.
 */
type GetUserResult = Awaited<ReturnType<typeof supabase.auth.getUser>>;
const originalGetUser = supabase.auth.getUser.bind(supabase.auth);
const USER_SHARE_MS = 5000;
let sharedUser: { token: string; at: number; promise: Promise<GetUserResult> } | null = null;

supabase.auth.getUser = async (jwt?: string): Promise<GetUserResult> => {
  if (jwt) return originalGetUser(jwt);
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return originalGetUser();
  const now = Date.now();
  if (sharedUser && sharedUser.token === token && now - sharedUser.at < USER_SHARE_MS) {
    return sharedUser.promise;
  }
  const promise = originalGetUser(token);
  const entry = { token, at: now, promise };
  sharedUser = entry;
  promise.then(
    (r) => {
      if (r.error && sharedUser === entry) sharedUser = null;
    },
    () => {
      if (sharedUser === entry) sharedUser = null;
    }
  );
  return promise;
};

supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT' || event === 'USER_UPDATED' || event === 'SIGNED_IN') sharedUser = null;
});
