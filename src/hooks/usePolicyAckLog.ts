import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   usePolicyAckLog — every staff member's sign-off status against a policy.
   "Signed current": acked the live version.
   "Outdated":       acked a prior version, hasn't re-signed since publish.
   "Outstanding":    never signed.
   ========================================================================== */

export type AckStatus = 'signed' | 'outdated' | 'outstanding';

export interface AckLogRow {
  staff_id: string;
  name: string;
  role: string;
  department: string | null;
  email: string | null;
  user_id: string | null;
  status: AckStatus;
  signed_version: number | null;
  signed_at: string | null;
}

interface AckRow {
  user_id: string;
  policy_version: number;
  acknowledged_at: string;
}

export function usePolicyAckLog(policyId: string | null, currentVersion: number | undefined) {
  const [staff, setStaff] = useState<
    {
      id: string;
      name: string;
      role: string;
      department: string | null;
      email: string | null;
      user_id: string | null;
    }[]
  >([]);
  const [acks, setAcks] = useState<AckRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!policyId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    // Resolve current user's college so the staff list matches
    const { data: userData } = await supabase.auth.getUser();
    let collegeId: string | null = null;
    if (userData.user?.id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', userData.user.id)
        .maybeSingle();
      collegeId = (profile?.college_id as string | null) ?? null;
    }

    const staffQuery = supabase
      .from('college_staff')
      .select('id, name, role, department, email, user_id')
      .is('archived_at', null)
      .order('name');
    if (collegeId) staffQuery.eq('college_id', collegeId);

    const [staffRes, acksRes] = await Promise.all([
      staffQuery,
      supabase
        .from('policy_acknowledgements')
        .select('user_id, policy_version, acknowledged_at')
        .eq('policy_id', policyId)
        .order('acknowledged_at', { ascending: false }),
    ]);

    if (staffRes.error) {
      setError(staffRes.error.message);
      setLoading(false);
      return;
    }

    setStaff(
      (staffRes.data ?? []) as {
        id: string;
        name: string;
        role: string;
        department: string | null;
        email: string | null;
        user_id: string | null;
      }[]
    );
    setAcks((acksRes.data ?? []) as AckRow[]);
    setLoading(false);
  }, [policyId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // Realtime — refetch on any ack change for this policy
  useEffect(() => {
    if (!policyId) return;
    const channel = supabase
      .channel(`policy_ack_log:${policyId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'policy_acknowledgements',
          filter: `policy_id=eq.${policyId}`,
        },
        () => fetch()
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'college_staff' }, () =>
        fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [policyId, fetch]);

  const rows = useMemo<AckLogRow[]>(() => {
    if (currentVersion === undefined) return [];
    // Index acks by user_id → most recent ack
    const latestByUser = new Map<string, AckRow>();
    for (const a of acks) {
      const existing = latestByUser.get(a.user_id);
      if (!existing || a.acknowledged_at > existing.acknowledged_at) {
        latestByUser.set(a.user_id, a);
      }
    }

    return staff.map((s) => {
      const ack = s.user_id ? latestByUser.get(s.user_id) : undefined;
      let status: AckStatus = 'outstanding';
      if (ack) {
        status = ack.policy_version === currentVersion ? 'signed' : 'outdated';
      }
      return {
        staff_id: s.id,
        name: s.name,
        role: s.role,
        department: s.department,
        email: s.email,
        user_id: s.user_id,
        status,
        signed_version: ack?.policy_version ?? null,
        signed_at: ack?.acknowledged_at ?? null,
      };
    });
  }, [staff, acks, currentVersion]);

  return { rows, loading, error, refresh: fetch };
}
