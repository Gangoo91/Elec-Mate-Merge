import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useComplianceStats — aggregate counts from v_single_central_record.
   RLS scopes rows to the caller's college; nothing to filter client-side.
   ========================================================================== */

export interface ComplianceStats {
  valid: number;
  expiring: number;
  expired: number;
  missing: number;
  total: number;
}

const EMPTY: ComplianceStats = {
  valid: 0,
  expiring: 0,
  expired: 0,
  missing: 0,
  total: 0,
};

export function useComplianceStats() {
  const [stats, setStats] = useState<ComplianceStats>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('v_single_central_record')
      .select('computed_status');

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    const next: ComplianceStats = { ...EMPTY };
    for (const row of (data ?? []) as { computed_status: string | null }[]) {
      const s = row.computed_status;
      if (s === 'valid') next.valid += 1;
      else if (s === 'expiring') next.expiring += 1;
      else if (s === 'expired') next.expired += 1;
      else if (s === 'missing') next.missing += 1;
      next.total += 1;
    }
    setStats(next);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Realtime: any change to staff_compliance_records re-aggregates. Cheap —
  // the view is read-only and the SCR query is small.
  useEffect(() => {
    const channel = supabase
      .channel('compliance_stats')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'staff_compliance_records' },
        () => {
          fetchStats();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchStats]);

  return { stats, loading, error, refresh: fetchStats };
}
