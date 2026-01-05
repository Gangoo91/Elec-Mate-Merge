
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yulrjfdmkjcoeddorawg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bHJqZmRta2pjb2VkZG9yYXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NTE0MjcsImV4cCI6MjA4MzEyNzQyN30.u_10798_un_4XVDu7U4kI52lulFNlJ4bMRFPw5mhT5c";

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
