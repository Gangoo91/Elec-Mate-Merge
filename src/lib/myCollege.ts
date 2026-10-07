/**
 * The college the signed-in staff member is working in.
 *
 * Normally that is profiles.college_id. While an Elec-Mate platform admin is
 * acting for a college (white-glove set-up, 7 Oct 2026), it is THAT college,
 * never the admin's own. The server never trusts this: RLS and college_can()
 * check the acting session. This only stops screens reading and writing
 * against the wrong college id.
 *
 * Use this instead of `supabase.from('profiles').select('college_id')`.
 */
import { supabase } from '@/integrations/supabase/client';
import { getActingCollegeId } from '@/hooks/college/useCollegeAccess';

export async function getMyCollegeId(userId?: string | null): Promise<string | null> {
  const acting = getActingCollegeId();
  if (acting) return acting;
  let uid = userId ?? null;
  if (!uid) {
    const { data } = await supabase.auth.getUser();
    uid = data.user?.id ?? null;
  }
  if (!uid) return null;
  const { data, error } = await supabase.from('profiles').select('college_id').eq('id', uid).maybeSingle();
  if (error) throw error;
  return ((data as { college_id: string | null } | null)?.college_id ?? null) as string | null;
}
