import { supabase } from '@/integrations/supabase/client';

/**
 * Which company should a write be attributed to?
 *
 * An employer in this system IS a `profiles.id` — every employer_* table is
 * scoped to it. A co-admin (e.g. an office manager on the owner's account)
 * therefore must NOT write rows under their own uid, or the owner would never
 * see them: RLS still shows the row to its creator, so the data silently
 * splits in two with no error surface.
 *
 * The database resolves the same answer in `my_default_employer_id()`, which
 * backs the column defaults. This helper is for the call sites that pass the
 * owner column explicitly and would otherwise override that default.
 *
 * Falls back to the caller's own id, which is correct for ordinary owners.
 */

// One resolution per user per session — writes are frequent and the answer
// only changes when co-admin membership does.
let cache: { userId: string; employerId: string | null } | null = null;

export async function getActingEmployerId(
  fallbackUserId?: string | null
): Promise<string | null> {
  const fallback = fallbackUserId ?? null;
  if (fallback && cache?.userId === fallback) return cache.employerId;

  // Cast: this RPC postdates the last types.ts regeneration.
  const { data, error } = await supabase.rpc('my_default_employer_id' as never);
  if (error) return fallback;

  const resolved = (data as unknown as string | null) ?? fallback;
  if (fallback) cache = { userId: fallback, employerId: resolved };
  return resolved;
}

/** Clear on sign-out / membership change so the next write re-resolves. */
export function clearActingEmployerCache() {
  cache = null;
}
