/**
 * Shared Dependencies - Single Source of Truth
 * All edge functions MUST import from this file to ensure version consistency
 */

// Supabase Client - Locked to v2.49.4
export { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

// HTTP Server - Locked to std@0.168.0
export { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

// CORS Headers
export { corsHeaders } from './cors.ts';

// Shared Types
export type { Database } from './types.ts';
export type { 
  ValidationResult, 
  ValidationIssue 
} from './response-validation.ts';
