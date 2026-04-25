import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useCollegePolicies — list of college_policies with current ack counts.
   RLS scopes per college via _ch_same_college.
   ========================================================================== */

export type PolicyStatus = 'draft' | 'live' | 'archived';

export interface PolicyRow {
  id: string;
  college_id: string;
  code: string | null;
  title: string;
  category: string;
  version: number;
  status: PolicyStatus;
  effective_from: string | null;
  review_due_at: string | null;
  requires_acknowledgement: boolean;
  owner_role: string | null;
  attachment_path: string | null;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  /** Count of distinct users who acknowledged the CURRENT version. */
  ack_count: number;
  /** Total active staff in the same college (acknowledgement target). */
  ack_target: number;
}

export interface PoliciesData {
  policies: PolicyRow[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const COLS =
  'id, college_id, code, title, category, content_md, version, status, effective_from, review_due_at, superseded_by, requires_acknowledgement, owner_role, attachment_path, approved_by, approved_at, created_at, updated_at';

export function useCollegePolicies(): PoliciesData {
  const [policies, setPolicies] = useState<PolicyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Resolve current user's college so the ack target is scoped to their
    // own staff list (college_staff RLS is permissive — without this filter
    // we'd count staff across every college on the platform).
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

    const staffQuery = supabase.from('college_staff').select('id').is('archived_at', null);
    if (collegeId) staffQuery.eq('college_id', collegeId);

    const [policiesRes, acksRes, staffRes] = await Promise.all([
      supabase.from('college_policies').select(COLS).order('updated_at', { ascending: false }),
      supabase.from('policy_acknowledgements').select('policy_id, policy_version, user_id'),
      staffQuery,
    ]);

    if (policiesRes.error) {
      setError(policiesRes.error.message);
      setLoading(false);
      return;
    }

    const ackCount = new Map<string, Set<string>>();
    for (const ack of (acksRes.data ?? []) as {
      policy_id: string;
      policy_version: number;
      user_id: string;
    }[]) {
      const key = `${ack.policy_id}:${ack.policy_version}`;
      const set = ackCount.get(key) ?? new Set();
      set.add(ack.user_id);
      ackCount.set(key, set);
    }

    const target = (staffRes.data ?? []).length;

    type DbRow = Omit<PolicyRow, 'ack_count' | 'ack_target'> & {
      content_md: string | null;
      superseded_by: string | null;
    };

    const list: PolicyRow[] = ((policiesRes.data ?? []) as DbRow[]).map((p) => {
      const key = `${p.id}:${p.version}`;
      const acks = ackCount.get(key);
      return {
        id: p.id,
        college_id: p.college_id,
        code: p.code,
        title: p.title,
        category: p.category,
        version: p.version,
        status: p.status as PolicyStatus,
        effective_from: p.effective_from,
        review_due_at: p.review_due_at,
        requires_acknowledgement: p.requires_acknowledgement,
        owner_role: p.owner_role,
        attachment_path: p.attachment_path,
        approved_by: p.approved_by,
        approved_at: p.approved_at,
        created_at: p.created_at,
        updated_at: p.updated_at,
        ack_count: acks?.size ?? 0,
        ack_target: target,
      };
    });

    setPolicies(list);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // Realtime — any policy or acknowledgement change refetches
  useEffect(() => {
    const channel = supabase
      .channel('college_policies_list')
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

  return useMemo(
    () => ({ policies, loading, error, refresh: fetch }),
    [policies, loading, error, fetch]
  );
}
