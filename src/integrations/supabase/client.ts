
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cjjlpiyfzvhffkfyszgh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqamxwaXlmenZoZmZrZnlzemdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0NTQwNzcsImV4cCI6MjA0ODAzMDA3N30.aCxKUn03t1XdIcLrJN26hixBM6t_eDdnuUI6Jv1HLYQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    fetch: (url, options = {}) => {
      // Set 6-minute timeout for edge functions to prevent premature client timeouts
      return fetch(url, {
        ...options,
        signal: AbortSignal.timeout(360000), // 360 seconds = 6 minutes
      });
    },
  },
});
