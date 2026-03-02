/**
 * Supabase client factory.
 * Creates user-scoped clients using the provided JWT for RLS enforcement.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config.js';

/**
 * Create a Supabase client scoped to a specific user via their JWT.
 * All queries through this client are filtered by RLS policies.
 */
export function createUserClient(userJwt: string): SupabaseClient {
  return createClient(config.supabaseUrl, config.supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${userJwt}`,
      },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Create a service-role Supabase client.
 * ONLY used for provisioning operations — never passed to tool handlers.
 */
export function createServiceClient(): SupabaseClient {
  if (!config.supabaseServiceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for service client');
  }
  return createClient(config.supabaseUrl, config.supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
