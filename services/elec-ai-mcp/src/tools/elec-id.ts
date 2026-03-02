/**
 * Elec-ID tools — read_elec_id, share_elec_id
 * Maps to: Supabase `employer_elec_id_profiles` table (RLS-scoped)
 */

import type { UserContext } from '../auth.js';

import { callEdgeFunction } from '../lib/edge-function.js';

export async function readElecId(_args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  // employer_elec_id_profiles uses employee_id, linked to employer_employees
  // For sole traders, the employee_id matches their user record
  const { data, error } = await supabase
    .from('employer_elec_id_profiles')
    .select(
      'elec_id_number, ecs_card_type, ecs_card_number, ecs_expiry_date, bio, specialisations, is_verified, verification_tier, available_for_hire, profile_visibility, shareable_link, created_at'
    )
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to read Elec-ID: ${error.message}`);
  }

  if (!data) {
    return { elec_id: null, message: 'No Elec-ID profile found. Set one up in the app.' };
  }

  return { elec_id: data };
}

export async function shareElecId(args: Record<string, unknown>, user: UserContext) {
  const expiresInDays =
    typeof args.expires_in_days === 'number' && args.expires_in_days > 0
      ? args.expires_in_days
      : 30;

  const result = await callEdgeFunction('share-elec-id', user.jwt, {
    expires_in_days: expiresInDays,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}
