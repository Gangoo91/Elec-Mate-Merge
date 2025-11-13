/**
 * Minimal dependencies for optimized edge functions
 * Zero dependencies on v3-core.ts or other heavy modules
 */

// Re-export Deno.serve for backwards compatibility
export const serve = Deno.serve;

// Export Supabase client creator directly
export { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
