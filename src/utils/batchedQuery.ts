/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/integrations/supabase/client';

const BATCH_SIZE = 80;

/**
 * Runs a Supabase `.in()` query in batches to avoid the ~8KB GET URL limit.
 * Splits the IDs into chunks, runs each chunk in parallel, and merges results.
 *
 * Usage:
 *   const data = await batchedInQuery('user_presence', 'user_id', userIds, 'user_id, last_seen');
 */
export async function batchedInQuery<T = Record<string, unknown>>(
  table: string,
  column: string,
  ids: string[],
  select: string,
  filters?: (query: ReturnType<typeof supabase.from>) => ReturnType<typeof supabase.from>
): Promise<T[]> {
  if (!ids.length) return [];

  // If small enough, just run directly
  if (ids.length <= BATCH_SIZE) {
    let query = supabase.from(table).select(select).in(column, ids) as any;
    if (filters) query = filters(query);
    const { data, error } = await query;
    if (error) {
      console.error(`batchedInQuery error on ${table}:`, error.message);
      return [];
    }
    return (data || []) as T[];
  }

  // Chunk and run in parallel
  const chunks: string[][] = [];
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    chunks.push(ids.slice(i, i + BATCH_SIZE));
  }

  const results = await Promise.all(
    chunks.map(async (chunk) => {
      let query = supabase.from(table).select(select).in(column, chunk) as any;
      if (filters) query = filters(query);
      const { data, error } = await query;
      if (error) {
        console.error(`batchedInQuery error on ${table} (chunk):`, error.message);
        return [];
      }
      return (data || []) as T[];
    })
  );

  return results.flat();
}
