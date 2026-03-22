import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { generateRequestId } from '@/utils/logger';
import { authStorage } from './capacitorStorage';

export const SUPABASE_URL = 'https://jtwygbeceundfgnkirof.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: authStorage,
    persistSession: true,
    autoRefreshToken: true,
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

      // Set 6-minute timeout for edge functions to prevent premature client timeouts
      return fetch(url, {
        ...options,
        headers,
        signal: AbortSignal.timeout(360000), // 360 seconds = 6 minutes
      });
    },
  },
});
