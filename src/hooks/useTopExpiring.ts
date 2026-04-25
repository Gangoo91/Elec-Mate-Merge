import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useTopExpiring — top n compliance items the college needs to action,
   sorted by urgency (expired first, then by soonest expiry). Reads from
   v_single_central_record which RLS-scopes to the user's college.
   ========================================================================== */

export interface ExpiringItem {
  record_id: string;
  college_staff_id: string;
  staff_name: string;
  staff_role: string;
  requirement_code: string;
  requirement_label: string;
  category: string;
  expires_at: string | null;
  days_to_expiry: number | null;
  computed_status: 'valid' | 'expiring' | 'expired' | 'missing' | 'pending_verification';
}

interface ScrViewRow {
  record_id: string | null;
  college_staff_id: string;
  name: string;
  role: string;
  requirement_code: string;
  requirement: string;
  category: string;
  expires_at: string | null;
  days_to_expiry: number | null;
  computed_status: ExpiringItem['computed_status'];
}

const STATUS_RANK = { expired: 0, expiring: 1 } as const;

export function useTopExpiring(limit = 5) {
  const [items, setItems] = useState<ExpiringItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('v_single_central_record')
      .select(
        'record_id, college_staff_id, name, role, requirement_code, requirement, category, expires_at, days_to_expiry, computed_status'
      )
      .in('computed_status', ['expired', 'expiring']);

    const sorted = ((data ?? []) as ScrViewRow[])
      .filter((r) => r.computed_status === 'expired' || r.computed_status === 'expiring')
      .sort((a, b) => {
        const r =
          STATUS_RANK[a.computed_status as keyof typeof STATUS_RANK] -
          STATUS_RANK[b.computed_status as keyof typeof STATUS_RANK];
        if (r !== 0) return r;
        const ad = a.days_to_expiry ?? 0;
        const bd = b.days_to_expiry ?? 0;
        return ad - bd;
      })
      .slice(0, limit)
      .map<ExpiringItem>((r) => ({
        record_id: r.record_id ?? `${r.college_staff_id}:${r.requirement_code}`,
        college_staff_id: r.college_staff_id,
        staff_name: r.name,
        staff_role: r.role,
        requirement_code: r.requirement_code,
        requirement_label: r.requirement,
        category: r.category,
        expires_at: r.expires_at,
        days_to_expiry: r.days_to_expiry,
        computed_status: r.computed_status,
      }));

    setItems(sorted);
    setLoading(false);
  }, [limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    const channel = supabase
      .channel('top_expiring')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'staff_compliance_records' },
        () => fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetch]);

  return { items, loading };
}
