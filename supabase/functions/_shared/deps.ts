/**
 * Shared Dependencies - Single Source of Truth
 * All edge functions MUST import from this file to ensure version consistency
 */

// Supabase Client - Locked to v2.49.4
export { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

// HTTP Server - Locked to std@0.168.0
// Modern Deno uses built-in Deno.serve instead of importing from std/http
export const serve = Deno.serve;

// CORS Headers
export { corsHeaders } from './cors.ts';

// Shared Types
export type { Database } from './types.ts';
export type { 
  ValidationResult, 
  ValidationIssue 
} from './response-validation.ts';
