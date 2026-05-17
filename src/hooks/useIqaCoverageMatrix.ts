import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useIqaCoverageMatrix — "Verifier X covers Y% of cohort_Z".

   For every IQA / sampler in the college, computes coverage % of each
   active cohort by counting the distinct students they've sampled vs the
   total active learners in that cohort. Powers the Coverage Matrix tab
   on the IQA Dashboard — proof for Ofsted that sampling is actually
   reaching the cohort, not just one or two learners.
   ========================================================================== */

export interface CoverageCell {
  sampler_id: string;
  sampler_name: string;
  cohort_id: string;
  cohort_name: string;
  sampled_students: number;
  total_students: number;
  coverage_pct: number;
  on_track: boolean;
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

export function useIqaCoverageMatrix(opts: { targetPct?: number; sinceDays?: number } = {}) {
  const targetPct = opts.targetPct ?? 20; // 20% sampling rate is the FE benchmark
  const since = opts.sinceDays != null
    ? new Date(Date.now() - opts.sinceDays * 86_400_000).toISOString()
    : null;

  const [cells, setCells] = useState<CoverageCell[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const collegeId = await callerCollegeId();
      if (!collegeId) {
        setCells([]);
        return;
      }

      // 1. Active students per cohort
      const { data: students } = await supabase
        .from('college_students')
        .select('id, cohort_id, status')
        .eq('college_id', collegeId)
        .neq('status', 'withdrawn')
        .neq('status', 'completed');
      const cohortTotals = new Map<string, number>();
      for (const s of (students ?? []) as Array<{ cohort_id: string | null; status: string | null }>) {
        if (s.cohort_id) {
          cohortTotals.set(s.cohort_id, (cohortTotals.get(s.cohort_id) ?? 0) + 1);
        }
      }

      // 2. Pull samples, optionally windowed by sampled_at
      let q = supabase
        .from('iqa_samples')
        .select('sampler_id, cohort_id, student_id, sampled_at')
        .eq('college_id', collegeId);
      if (since) q = q.gte('sampled_at', since);
      const { data: samples } = await q;

      // 3. Distinct (sampler, cohort, student) tuples → sampled-student count per (sampler, cohort)
      type CellAcc = { students: Set<string> };
      const key = (s: string, c: string) => `${s}::${c}`;
      const cellAcc = new Map<string, CellAcc>();
      const samplerIds = new Set<string>();
      const cohortIds = new Set<string>();
      for (const row of (samples ?? []) as Array<{
        sampler_id: string | null;
        cohort_id: string | null;
        student_id: string | null;
      }>) {
        if (!row.sampler_id || !row.cohort_id || !row.student_id) continue;
        samplerIds.add(row.sampler_id);
        cohortIds.add(row.cohort_id);
        const k = key(row.sampler_id, row.cohort_id);
        const slot = cellAcc.get(k) ?? { students: new Set<string>() };
        slot.students.add(row.student_id);
        cellAcc.set(k, slot);
      }

      // 4. Resolve sampler + cohort names
      const [{ data: staffRows }, { data: cohortRows }] = await Promise.all([
        samplerIds.size > 0
          ? supabase
              .from('college_staff')
              .select('user_id, name')
              .in('user_id', Array.from(samplerIds))
          : Promise.resolve({ data: [] as any[], error: null }),
        cohortIds.size > 0
          ? supabase
              .from('college_cohorts')
              .select('id, name')
              .in('id', Array.from(cohortIds))
          : Promise.resolve({ data: [] as any[], error: null }),
      ]);
      const samplerNameMap = new Map(
        ((staffRows ?? []) as Array<{ user_id: string; name: string }>).map((r) => [r.user_id, r.name])
      );
      const cohortNameMap = new Map(
        ((cohortRows ?? []) as Array<{ id: string; name: string }>).map((r) => [r.id, r.name])
      );

      // 5. Emit one cell per (sampler, cohort) where the sampler has touched the cohort.
      // We also include cells where coverage is 0 but only if the cohort has
      // students — gives the HoD a visible "no sampling yet" red.
      const out: CoverageCell[] = [];
      for (const [k, slot] of cellAcc.entries()) {
        const [samplerId, cohortId] = k.split('::');
        const sampled = slot.students.size;
        const total = cohortTotals.get(cohortId) ?? 0;
        const pct = total > 0 ? Math.round((sampled / total) * 100) : 0;
        out.push({
          sampler_id: samplerId,
          sampler_name: samplerNameMap.get(samplerId) ?? 'Unknown IQA',
          cohort_id: cohortId,
          cohort_name: cohortNameMap.get(cohortId) ?? 'Untitled cohort',
          sampled_students: sampled,
          total_students: total,
          coverage_pct: pct,
          on_track: pct >= targetPct,
        });
      }
      out.sort(
        (a, b) =>
          a.sampler_name.localeCompare(b.sampler_name) ||
          a.cohort_name.localeCompare(b.cohort_name)
      );
      setCells(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [since, targetPct]);

  useEffect(() => {
    void load();
  }, [load]);

  return { cells, loading, error, refresh: load };
}

/**
 * Pick N random active students from a cohort that this IQA hasn't sampled
 * yet. Returns student rows the caller can use to seed a fresh sampling plan.
 */
export async function pickRandomSample(opts: {
  cohortId: string;
  samplerId: string;
  n: number;
}): Promise<Array<{ id: string; name: string }>> {
  const collegeId = await callerCollegeId();
  if (!collegeId) return [];

  const [{ data: students }, { data: samples }] = await Promise.all([
    supabase
      .from('college_students')
      .select('id, name, status')
      .eq('college_id', collegeId)
      .eq('cohort_id', opts.cohortId)
      .neq('status', 'withdrawn')
      .neq('status', 'completed'),
    supabase
      .from('iqa_samples')
      .select('student_id')
      .eq('sampler_id', opts.samplerId)
      .eq('cohort_id', opts.cohortId),
  ]);
  const alreadySampled = new Set(
    ((samples ?? []) as Array<{ student_id: string | null }>)
      .map((s) => s.student_id)
      .filter((id): id is string => !!id)
  );
  const pool = ((students ?? []) as Array<{ id: string; name: string }>).filter(
    (s) => !alreadySampled.has(s.id)
  );
  // Fisher-Yates shuffle then slice
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.max(1, opts.n));
}
