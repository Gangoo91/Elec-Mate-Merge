import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   elecIdLinkage — the ONE correct way to resolve the signed-in user's
   Elec-ID profile.

   The linkage is: auth.users.id -> employer_employees.user_id ->
   employer_employees.id -> employer_elec_id_profiles.employee_id.

   `employee_id` is an employer_employees row id, NOT an auth uid — the two
   uuid namespaces never overlap (verified: 0 of 118 linked rows match), so
   any `.eq('employee_id', user.id)` lookup silently returns nothing.
   ========================================================================== */

/** employer_employees rows linked to the signed-in user. */
export async function getMyEmployeeIds(): Promise<string[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];
  const { data } = await supabase.from('employer_employees').select('id').eq('user_id', user.id);
  return (data || []).map((r) => r.id);
}

/**
 * The signed-in user's Elec-ID profile, or null. A user can have more than
 * one employee row (their own stub plus employer roster rows) — the
 * activated profile wins, oldest first as the tiebreak.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getMyElecIdProfile<T = any>(select = '*'): Promise<T | null> {
  const employeeIds = await getMyEmployeeIds();
  if (employeeIds.length === 0) return null;
  const { data } = await supabase
    .from('employer_elec_id_profiles')
    .select(select)
    .in('employee_id', employeeIds)
    .order('activated', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(1);
  return (data?.[0] as T) ?? null;
}

/** Convenience: just the profile id. */
export async function getMyElecIdProfileId(): Promise<string | null> {
  const profile = await getMyElecIdProfile<{ id: string }>('id');
  return profile?.id ?? null;
}

/**
 * Find or create the user's own employer_employees stub row (the anchor an
 * Elec-ID profile hangs off). Mirrors the canonical creation in
 * useElecIdProfile.
 */
export async function ensureMyEmployeeId(): Promise<string | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: existing } = await supabase
    .from('employer_employees')
    .select('id')
    .eq('user_id', user.id)
    .limit(1);
  if (existing && existing.length > 0) return existing[0].id;

  const { data: created, error } = await supabase
    .from('employer_employees')
    .insert({
      user_id: user.id,
      name: user.email?.split('@')[0] || 'User',
      role: 'electrician',
      team_role: 'Electrician',
      status: 'active',
      avatar_initials: (user.email?.substring(0, 2) || 'US').toUpperCase(),
      hourly_rate: 0,
      certifications_count: 0,
      active_jobs_count: 0,
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating employee stub:', error);
    return null;
  }
  return created.id;
}
