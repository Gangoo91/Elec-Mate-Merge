import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useMyPendingAcknowledgements — live policies that require a signature and
   the current user hasn't signed yet (for the current version). Resolves
   the auth user → their college_staff link first; returns empty if not
   linked.
   ========================================================================== */

export interface PendingPolicy {
  id: string;
  title: string;
  code: string | null;
  category: string;
  version: number;
  effective_from: string | null;
  owner_role: string | null;
}

export function useMyPendingAcknowledgements() {
  const [pending, setPending] = useState<PendingPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [linked, setLinked] = useState<boolean | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) {
      setLinked(false);
      setPending([]);
      setLoading(false);
      return;
    }

    // Confirm user has a college_staff link (only staff need to sign-off)
    const { data: staffRow } = await supabase
      .from('college_staff')
      .select('id')
      .eq('user_id', userId)
      .is('archived_at', null)
      .maybeSingle();
    if (!staffRow) {
      setLinked(false);
      setPending([]);
      setLoading(false);
      return;
    }
    setLinked(true);

    const [policiesRes, acksRes] = await Promise.all([
      supabase
        .from('college_policies')
        .select('id, title, code, category, version, effective_from, owner_role')
        .eq('status', 'live')
        .eq('requires_acknowledgement', true),
      supabase
        .from('policy_acknowledgements')
        .select('policy_id, policy_version')
        .eq('user_id', userId),
    ]);

    const ackedKeys = new Set<string>(
      ((acksRes.data ?? []) as { policy_id: string; policy_version: number }[]).map(
        (a) => `${a.policy_id}:${a.policy_version}`
      )
    );

    const list = ((policiesRes.data ?? []) as PendingPolicy[]).filter(
      (p) => !ackedKeys.has(`${p.id}:${p.version}`)
    );
    setPending(list);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // Realtime — refetch when policies change or our acks change
  useEffect(() => {
    const channel = supabase
      .channel('my_pending_acks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'college_policies' }, () =>
        fetch()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'policy_acknowledgements' },
        () => fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetch]);

  return { pending, loading, linked, refresh: fetch };
}
