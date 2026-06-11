import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useCohortComparison — side-by-side cohort stats for the HoD's
   "compare 2-3 cohorts" page.

   For each cohort_id passed in, builds:
     - apprentice count (active)
     - avg progress %
     - avg attendance %
     - total OTJ hours (and verified)
     - EPA verdict counts (ready / almost / not_yet / no_verdict)
     - at-risk count (from student_risk_scores)

   One server-side aggregation (college_cohort_summaries) computes every metric,
   replacing six unbounded per-source fetches + a JS roll-up.
   ========================================================================== */

export interface CohortStats {
  cohort_id: string;
  cohort_name: string | null;
  apprentice_count: number;
  avg_progress_pct: number | null;
  avg_attendance_pct: number | null;
  otj_total_hours: number;
  otj_verified_hours: number;
  epa_ready: number;
  epa_almost: number;
  epa_not_yet: number;
  epa_no_verdict: number;
  at_risk: number;
}

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

export interface CohortLite {
  id: string;
  name: string;
}

export function useAvailableCohorts() {
  const [cohorts, setCohorts] = useState<CohortLite[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const collegeId = await callerCollegeId();
      if (!collegeId) {
        setCohorts([]);
        return;
      }
      const { data } = await supabase
        .from('college_cohorts')
        .select('id, name')
        .eq('college_id', collegeId)
        .order('name', { ascending: true });
      setCohorts((data ?? []) as CohortLite[]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { cohorts, loading };
}

const emptyStats = (id: string): CohortStats => ({
  cohort_id: id,
  cohort_name: null,
  apprentice_count: 0,
  avg_progress_pct: null,
  avg_attendance_pct: null,
  otj_total_hours: 0,
  otj_verified_hours: 0,
  epa_ready: 0,
  epa_almost: 0,
  epa_not_yet: 0,
  epa_no_verdict: 0,
  at_risk: 0,
});

export function useCohortComparison(cohortIds: string[]) {
  const [rows, setRows] = useState<CohortStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (cohortIds.length === 0) {
      setRows([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // One server-side aggregation replaces six unbounded per-source fetches +
      // a JS roll-up. Re-order to the requested cohort order, and fill any cohort
      // the RPC didn't return (e.g. deleted) with an empty column — matching the
      // prior behaviour of mapping over cohortIds.
      const { data, error: rpcError } = await supabase.rpc('college_cohort_summaries', {
        p_cohort_ids: cohortIds,
      });
      if (rpcError) throw rpcError;
      const byId = new Map((data ?? []).map((r) => [r.cohort_id, r]));
      const out: CohortStats[] = cohortIds.map((id) => {
        const r = byId.get(id);
        if (!r) return emptyStats(id);
        return {
          cohort_id: r.cohort_id,
          cohort_name: r.cohort_name,
          apprentice_count: Number(r.apprentice_count),
          avg_progress_pct: r.avg_progress_pct,
          avg_attendance_pct: r.avg_attendance_pct,
          otj_total_hours: Number(r.otj_total_hours),
          otj_verified_hours: Number(r.otj_verified_hours),
          epa_ready: Number(r.epa_ready),
          epa_almost: Number(r.epa_almost),
          epa_not_yet: Number(r.epa_not_yet),
          epa_no_verdict: Number(r.epa_no_verdict),
          at_risk: Number(r.at_risk),
        };
      });
      setRows(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [cohortIds.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    void load();
  }, [load]);

  return { rows, loading, error, refresh: load };
}
