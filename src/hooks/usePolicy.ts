import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   usePolicy — single policy + version history + ack count for the current
   version. Realtime-subscribed.
   ========================================================================== */

export interface PolicyDetail {
  id: string;
  college_id: string;
  code: string | null;
  title: string;
  category: string;
  content_md: string | null;
  version: number;
  status: 'draft' | 'live' | 'archived';
  effective_from: string | null;
  review_due_at: string | null;
  superseded_by: string | null;
  requires_acknowledgement: boolean;
  owner_role: string | null;
  attachment_path: string | null;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PolicyVersion {
  id: string;
  policy_id: string;
  version: number;
  content_md: string;
  published_at: string;
  published_by: string | null;
  change_summary: string | null;
}

export interface PolicyAck {
  id: string;
  user_id: string;
  policy_version: number;
  acknowledged_at: string;
}

const POLICY_COLS =
  'id, college_id, code, title, category, content_md, version, status, effective_from, review_due_at, superseded_by, requires_acknowledgement, owner_role, attachment_path, approved_by, approved_at, created_at, updated_at';

export function usePolicy(policyId: string | null) {
  const [policy, setPolicy] = useState<PolicyDetail | null>(null);
  const [versions, setVersions] = useState<PolicyVersion[]>([]);
  const [acks, setAcks] = useState<PolicyAck[]>([]);
  const [ackTarget, setAckTarget] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!policyId) {
      setPolicy(null);
      setVersions([]);
      setAcks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    const policyRes = await supabase
      .from('college_policies')
      .select(POLICY_COLS)
      .eq('id', policyId)
      .maybeSingle();

    if (policyRes.error) {
      setError(policyRes.error.message);
      setLoading(false);
      return;
    }
    const policyData = policyRes.data as PolicyDetail | null;
    setPolicy(policyData);

    if (!policyData) {
      setVersions([]);
      setAcks([]);
      setLoading(false);
      return;
    }

    // Resolve current user's college_id for the ack target query
    const { data: userData } = await supabase.auth.getUser();
    let userCollegeId: string | null = null;
    if (userData.user?.id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', userData.user.id)
        .maybeSingle();
      userCollegeId = (profile?.college_id as string | null) ?? null;
    }

    const staffQuery = supabase.from('college_staff').select('id').is('archived_at', null);
    if (userCollegeId) staffQuery.eq('college_id', userCollegeId);

    const [versionsRes, acksRes, staffRes] = await Promise.all([
      supabase
        .from('college_policy_versions')
        .select('id, policy_id, version, content_md, published_at, published_by, change_summary')
        .eq('policy_id', policyId)
        .order('version', { ascending: false }),
      supabase
        .from('policy_acknowledgements')
        .select('id, user_id, policy_version, acknowledged_at')
        .eq('policy_id', policyId),
      staffQuery,
    ]);

    setVersions((versionsRes.data ?? []) as PolicyVersion[]);
    setAcks((acksRes.data ?? []) as PolicyAck[]);
    setAckTarget((staffRes.data ?? []).length);
    setLoading(false);
  }, [policyId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // Realtime
  useEffect(() => {
    if (!policyId) return;
    const channel = supabase
      .channel(`policy:${policyId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_policies',
          filter: `id=eq.${policyId}`,
        },
        () => fetch()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_policy_versions',
          filter: `policy_id=eq.${policyId}`,
        },
        () => fetch()
      )
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
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [policyId, fetch]);

  /* ─── Mutations ─── */

  const saveDraft = useCallback(
    async (patch: Partial<PolicyDetail>) => {
      if (!policy) return;
      const { error: updErr } = await supabase
        .from('college_policies')
        .update(patch)
        .eq('id', policy.id);
      if (updErr) throw updErr;
    },
    [policy]
  );

  const publishVersion = useCallback(
    async (changeSummary: string | null) => {
      if (!policy) return;
      const userRes = await supabase.auth.getUser();
      const userId = userRes.data.user?.id ?? null;
      const newVersion = policy.version + (policy.status === 'live' ? 1 : 0);
      const today = new Date().toISOString().slice(0, 10);

      // 1. Append to version history (snapshot of current content)
      const { error: versErr } = await supabase.from('college_policy_versions').insert({
        policy_id: policy.id,
        version: newVersion,
        content_md: policy.content_md ?? '',
        published_by: userId,
        change_summary: changeSummary,
      });
      if (versErr) throw versErr;

      // 2. Promote: status=live, version=newVersion, effective_from=today,
      //    approved_by/at recorded.
      const { error: updErr } = await supabase
        .from('college_policies')
        .update({
          version: newVersion,
          status: 'live',
          effective_from: today,
          approved_by: userId,
          approved_at: new Date().toISOString(),
        })
        .eq('id', policy.id);
      if (updErr) throw updErr;
    },
    [policy]
  );

  const archive = useCallback(async () => {
    if (!policy) return;
    const { error: updErr } = await supabase
      .from('college_policies')
      .update({ status: 'archived' })
      .eq('id', policy.id);
    if (updErr) throw updErr;
  }, [policy]);

  const unarchive = useCallback(async () => {
    if (!policy) return;
    const { error: updErr } = await supabase
      .from('college_policies')
      .update({ status: policy.version > 0 ? 'live' : 'draft' })
      .eq('id', policy.id);
    if (updErr) throw updErr;
  }, [policy]);

  const acks_for_current = acks.filter((a) => a.policy_version === policy?.version);

  return {
    policy,
    versions,
    acks,
    acksForCurrent: acks_for_current,
    ackTarget,
    loading,
    error,
    refresh: fetch,
    saveDraft,
    publishVersion,
    archive,
    unarchive,
  };
}
