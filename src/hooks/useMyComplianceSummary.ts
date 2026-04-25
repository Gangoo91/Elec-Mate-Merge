import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useMyComplianceSummary — resolve current user → their college_staff row,
   then aggregate compliance status for them only. Returns null if the user
   isn't linked to a college_staff record (e.g. an admin without staff link).
   ========================================================================== */

export interface MyComplianceSummary {
  staffId: string;
  name: string;
  role: string;
  totals: {
    valid: number;
    expiring: number;
    expired: number;
    missing: number;
    pending_verification: number;
    total: number;
  };
  /** valid + expiring (anything verified and within validity window) */
  inDate: number;
  percent: number;
  /** anything the user themselves needs to action (uploads, renewals) */
  needsAction: boolean;
  /** anything awaiting a verifier's sign-off — NOT the user's action */
  awaitingVerification: boolean;
  /** soonest expiry across valid + expiring */
  nextExpiry: string | null;
}

interface ScrViewRow {
  college_staff_id: string;
  name: string;
  role: string;
  computed_status: 'valid' | 'expiring' | 'expired' | 'missing' | 'pending_verification';
  expires_at: string | null;
}

export function useMyComplianceSummary() {
  const [summary, setSummary] = useState<MyComplianceSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [linked, setLinked] = useState<boolean | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) {
      setLinked(false);
      setSummary(null);
      setLoading(false);
      return;
    }

    // Find this user's college_staff link
    const { data: staffRow } = await supabase
      .from('college_staff')
      .select('id, name, role')
      .eq('user_id', userId)
      .is('archived_at', null)
      .maybeSingle();

    if (!staffRow) {
      setLinked(false);
      setSummary(null);
      setLoading(false);
      return;
    }

    setLinked(true);

    const { data: scrRows } = await supabase
      .from('v_single_central_record')
      .select('college_staff_id, name, role, computed_status, expires_at')
      .eq('college_staff_id', staffRow.id);

    const rows = (scrRows ?? []) as ScrViewRow[];
    const totals = {
      valid: 0,
      expiring: 0,
      expired: 0,
      missing: 0,
      pending_verification: 0,
      total: 0,
    };
    let nextExpiry: string | null = null;
    for (const r of rows) {
      totals[r.computed_status] += 1;
      totals.total += 1;
      if (
        r.expires_at &&
        (r.computed_status === 'valid' || r.computed_status === 'expiring') &&
        (!nextExpiry || r.expires_at < nextExpiry)
      ) {
        nextExpiry = r.expires_at;
      }
    }
    const inDate = totals.valid + totals.expiring;
    const percent = totals.total === 0 ? 0 : Math.round((inDate / totals.total) * 100);

    setSummary({
      staffId: staffRow.id,
      name: staffRow.name,
      role: staffRow.role,
      totals,
      inDate,
      percent,
      needsAction: totals.expired + totals.missing > 0,
      awaitingVerification: totals.pending_verification > 0,
      nextExpiry,
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // Realtime — refetch when the user's records change
  useEffect(() => {
    if (!summary?.staffId) return;
    const channel = supabase
      .channel(`my_compliance:${summary.staffId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'staff_compliance_records',
          filter: `college_staff_id=eq.${summary.staffId}`,
        },
        () => fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [summary?.staffId, fetch]);

  return { summary, loading, linked, refresh: fetch };
}
