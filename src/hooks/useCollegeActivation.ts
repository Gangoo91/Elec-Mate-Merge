import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';

/* ==========================================================================
   useCollegeActivation — how many enrolled learners have actually signed in.

   A college bulk-loads its roster into college_students (records), but a learner
   only becomes usable once they create an account and redeem the join code —
   at which point accept_college_invite stamps college_students.user_id.

   So: activated = user_id present, pending = loaded but never signed up. This
   is the headline "are my apprentices actually through the door?" number, and
   the chase list for the ones who aren't. Withdrawn/archived are excluded.
   ========================================================================== */

export interface PendingLearner {
  id: string;
  name: string;
  email: string | null;
}

export interface CollegeActivation {
  total: number;
  activated: number;
  pending: number;
  pct: number;
  pendingLearners: PendingLearner[];
}

const EMPTY: CollegeActivation = {
  total: 0,
  activated: 0,
  pending: 0,
  pct: 0,
  pendingLearners: [],
};

/** Resolve the caller's college via profiles.college_id — fallback only. The page
 *  already holds the resolved collegeId, so callers should pass it in; this lookup
 *  is a backstop (and profiles.college_id is sparsely populated). */
async function callerCollegeId(): Promise<string | null> {
  const { data: userRes } = await supabase.auth.getUser();
  const userId = userRes.user?.id;
  if (!userId) return null;
  const { data: profile } = await supabase
    .from('profiles')
    .select('college_id')
    .eq('id', userId)
    .maybeSingle();
  return (profile as { college_id?: string | null } | null)?.college_id ?? null;
}

/**
 * @param collegeId  The college to count, from the page's already-resolved context.
 *                   Omit only when no context is available (then we fall back to
 *                   the caller's profile, which may be null).
 */
export function useCollegeActivation(collegeId?: string) {
  const [data, setData] = useState<CollegeActivation>(EMPTY);
  const [loading, setLoading] = useState(true);
  // The college actually counted (arg if given, else resolved profile). Drives
  // the realtime filter so we only react to this college's roster changes.
  const [resolvedId, setResolvedId] = useState<string | null>(collegeId ?? null);

  const load = useCallback(async () => {
    setLoading(true);
    const id = collegeId ?? (await callerCollegeId());
    setResolvedId(id);
    if (!id) {
      setData(EMPTY);
      setLoading(false);
      return;
    }
    const { data: rows, error } = await supabase
      .from('college_students')
      .select('id, name, email, user_id, status')
      .eq('college_id', id);

    if (error) {
      setData(EMPTY);
      setLoading(false);
      return;
    }

    const live = ((rows ?? []) as Array<{
      id: string;
      name: string | null;
      email: string | null;
      user_id: string | null;
      status: string | null;
    }>).filter((r) => {
      const s = (r.status ?? '').toLowerCase();
      return s !== 'withdrawn' && s !== 'archived';
    });

    // accept_college_invite links by email; a learner who signs up under a
    // different email than the college bulk-loaded gets a SECOND row (user_id
    // set) while the original sits unlinked. Without this, that learner would
    // show as both activated and "not signed up". Treat any unlinked row whose
    // email already appears on an activated row as already in.
    const activatedEmails = new Set(
      live
        .filter((r) => r.user_id && r.email)
        .map((r) => r.email!.trim().toLowerCase())
    );

    const activatedRows = live.filter((r) => r.user_id);
    const pendingLearners: PendingLearner[] = live
      .filter((r) => !r.user_id)
      .filter((r) => !(r.email && activatedEmails.has(r.email.trim().toLowerCase())))
      .map((r) => ({ id: r.id, name: r.name ?? 'Unnamed learner', email: r.email }));

    const activated = activatedRows.length;
    const total = activated + pendingLearners.length;

    setData({
      total,
      activated,
      pending: pendingLearners.length,
      pct: total > 0 ? Math.round((activated / total) * 100) : 0,
      pendingLearners,
    });
    setLoading(false);
  }, [collegeId]);

  useEffect(() => {
    void load();
  }, [load]);

  // Re-count when a learner links (user_id stamped) or new roster rows land —
  // scoped to this college so other colleges' churn doesn't trigger reloads.
  useEffect(() => {
    if (!resolvedId) return;
    const channel = supabase
      .channel(realtimeChannelName(`college_activation_${resolvedId}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_students',
          filter: `college_id=eq.${resolvedId}`,
        },
        () => void load()
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [resolvedId, load]);

  return { ...data, loading, refresh: load };
}
