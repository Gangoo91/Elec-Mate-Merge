import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   Single central record, one row per staff member per requirement, for the
   charts on the Staff records and policies screen. Reads the same view the
   list and the headline figures read (v_single_central_record; RLS scopes it
   to the caller's college), so the chart and the list never disagree.
   ========================================================================== */

export type ScrStatus = 'valid' | 'expiring' | 'expired' | 'missing' | 'pending_verification';

export interface ScrRecord {
  college_staff_id: string;
  name: string;
  requirement: string | null;
  computed_status: ScrStatus;
  expires_at: string | null;
  archived_at: string | null;
}

export function useScrRecords(refreshKey = 0) {
  const [rows, setRows] = useState<ScrRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void supabase
      .from('v_single_central_record')
      .select('college_staff_id, name, requirement, computed_status, expires_at, archived_at')
      .then(({ data }) => {
        if (cancelled) return;
        setRows(((data ?? []) as ScrRecord[]).filter((r) => !r.archived_at));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  return { rows, loading };
}

export function daysFromToday(iso: string): number {
  const d = new Date(iso);
  const t = new Date();
  d.setHours(0, 0, 0, 0);
  t.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - t.getTime()) / 86_400_000);
}
