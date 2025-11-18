/**
 * Shared Dependencies - Single Source of Truth
 * All edge functions MUST import from this file to ensure version consistency
 */

// Supabase Client - Using npm: specifier (more reliable than esm.sh)
export { createClient } from 'npm:@supabase/supabase-js@2.49.4';

// HTTP Server - Modern Deno built-in
export const serve = Deno.serve;

// CORS Headers
export { corsHeaders } from './cors.ts';

// Shared Types
export type { Database } from './types.ts';
export type { 
  ValidationResult, 
  ValidationIssue 
} from './response-validation.ts';
