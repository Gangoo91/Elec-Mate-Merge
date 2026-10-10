import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { usePortfolioAcState } from '@/hooks/portfolio/usePortfolioAcState';

/* ==========================================================================
   useStudentProgress — cross-hub course/unit/KSB progress for one learner.

   Surfaces the most useful per-learner aggregates from the apprentice side:
   - active qualification + headline progress %
   - per-unit coverage (evidenced / passed counts) from get_portfolio_ac_state,
     the one per-criterion state function (ELE-1918: unit_coverage_matrix is
     retired; it was written by nothing live and disagreed with decisions)
   - learning_progress timing (recent module activity, time spent)
   - course_progress per-section completion %
   - KSB roll-up (counts by status, % verified)

   Argument is auth.users.id (== profiles.id). All apprentice tables use
   user_id keyed off the auth user.
   ========================================================================== */

export type KsbStatus = 'not_started' | 'in_progress' | 'evidenced' | 'verified';

export interface QualificationSelection {
  qualification_id: string;
  is_active: boolean;
  progress_percentage: number;
  target_completion_date: string | null;
  selected_at: string | null;
}

export interface UnitCoverageRow {
  id: string;
  qualification_id: string | null;
  qualification_title: string | null;
  qualification_code: string | null;
  category_id: string | null;
  category_name: string | null;
  total_criteria: number;
  evidenced_criteria: number;
  verified_criteria: number;
  required_entries: number;
  completed_entries: number;
  completion_percentage: number;
  status: string | null;
  last_updated: string | null;
}

export interface QualCompliance {
  qualification_id: string | null;
  category_id: string | null;
  required_entries: number;
  completed_entries: number;
  compliance_percentage: number;
}

export interface CourseProgressRow {
  course_key: string;
  section_key: string | null;
  progress_pct: number;
  completed: boolean;
  last_accessed_at: string | null;
}

export interface ModuleProgressRow {
  course: string;
  module: string | null;
  completion_percentage: number;
  time_spent_minutes: number;
  last_accessed: string | null;
}

export interface KsbRollUp {
  total: number;
  not_started: number;
  in_progress: number;
  evidenced: number;
  verified: number;
  verified_percent: number;
}

export interface StudentProgress {
  qualifications: QualificationSelection[];
  activeQualification: QualificationSelection | null;
  unitCoverage: UnitCoverageRow[];
  qualCompliance: QualCompliance[];
  courseSections: CourseProgressRow[];
  modules: ModuleProgressRow[];
  ksb: KsbRollUp;
  totals: {
    overall_percent: number;
    units_started: number;
    units_complete: number;
    total_evidenced: number;
    total_verified: number;
    total_criteria: number;
    total_minutes_studied: number;
  };
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const ZERO_KSB: KsbRollUp = {
  total: 0,
  not_started: 0,
  in_progress: 0,
  evidenced: 0,
  verified: 0,
  verified_percent: 0,
};

export function useStudentProgress(userId: string | null): StudentProgress {
  const [qualifications, setQualifications] = useState<QualificationSelection[]>([]);
  const [qualCompliance, setQualCompliance] = useState<QualCompliance[]>([]);
  const [courseSections, setCourseSections] = useState<CourseProgressRow[]>([]);
  const [modules, setModules] = useState<ModuleProgressRow[]>([]);
  const [ksbCounts, setKsbCounts] = useState<KsbRollUp>(ZERO_KSB);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!userId) {
      setQualifications([]);
      setQualCompliance([]);
      setCourseSections([]);
      setModules([]);
      setKsbCounts(ZERO_KSB);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const [qualRes, complianceRes, courseRes, learningRes, ksbRes] =
        await Promise.all([
          supabase
            .from('user_qualification_selections')
            .select('qualification_id, is_active, progress_percentage, target_completion_date, selected_at')
            .eq('user_id', userId),
          supabase
            .from('qualification_compliance')
            .select('qualification_id, category_id, required_entries, completed_entries, compliance_percentage')
            .eq('user_id', userId),
          supabase
            .from('course_progress')
            .select('course_key, section_key, progress_pct, completed, last_accessed_at')
            .eq('user_id', userId)
            .order('last_accessed_at', { ascending: false, nullsFirst: false })
            .limit(80),
          supabase
            .from('learning_progress')
            .select('course, module, completion_percentage, time_spent_minutes, last_accessed')
            .eq('user_id', userId)
            .order('last_accessed', { ascending: false, nullsFirst: false })
            .limit(80),
          supabase
            .from('user_ksb_progress')
            .select('status')
            .eq('user_id', userId),
        ]);

      if (!qualRes.error && qualRes.data) {
        setQualifications(qualRes.data as QualificationSelection[]);
      }
      if (!complianceRes.error && complianceRes.data) {
        setQualCompliance(complianceRes.data as QualCompliance[]);
      }
      if (!courseRes.error && courseRes.data) {
        setCourseSections(
          (courseRes.data as Array<CourseProgressRow & { progress_pct: number | null }>).map(
            (r) => ({ ...r, progress_pct: r.progress_pct ?? 0 })
          )
        );
      }
      if (!learningRes.error && learningRes.data) {
        setModules(
          (learningRes.data as ModuleProgressRow[]).map((r) => ({
            ...r,
            completion_percentage: Number(r.completion_percentage ?? 0),
            time_spent_minutes: r.time_spent_minutes ?? 0,
          }))
        );
      }
      if (!ksbRes.error && ksbRes.data) {
        const rows = ksbRes.data as { status: string | null }[];
        const counts: KsbRollUp = {
          total: rows.length,
          not_started: 0,
          in_progress: 0,
          evidenced: 0,
          verified: 0,
          verified_percent: 0,
        };
        for (const r of rows) {
          const k = (r.status ?? 'not_started') as KsbStatus;
          if (k === 'not_started' || k === 'in_progress' || k === 'evidenced' || k === 'verified') {
            counts[k] += 1;
          } else {
            counts.not_started += 1;
          }
        }
        counts.verified_percent =
          counts.total > 0 ? Math.round((counts.verified / counts.total) * 100) : 0;
        setKsbCounts(counts);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Realtime — any of the apprentice progress tables can change while a tutor
  // is on the page. One channel, lightweight refetch.
  useEffect(() => {
    if (!userId) return;
    const channel = supabase
      .channel(realtimeChannelName(`student_progress:${userId}`))
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_ksb_progress', filter: `user_id=eq.${userId}` },
        () => fetchAll()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_qualification_selections', filter: `user_id=eq.${userId}` },
        () => fetchAll()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, fetchAll]);

  // Per-unit coverage from the one state function. "Evidenced" is any criterion
  // with evidence tied to it (claimed or further); "verified" is passed or IQA
  // confirmed. A suggestion is never coverage.
  const ac = usePortfolioAcState(userId);
  const unitCoverage = useMemo<UnitCoverageRow[]>(
    () =>
      ac.units.map((u) => {
        const evidenced =
          u.total - u.counts.not_started - u.counts.suggested;
        const lastDecided = u.rows
          .map((r) => r.decided_at)
          .filter((d): d is string => !!d)
          .sort()
          .pop();
        const pct = u.total > 0 ? Math.round((u.passed / u.total) * 100) : 0;
        return {
          id: u.unit_code,
          qualification_id: null,
          qualification_title: null,
          qualification_code: u.rows[0]?.qualification_code ?? null,
          category_id: null,
          category_name: `${u.unit_code} ${u.unit_title}`.trim(),
          total_criteria: u.total,
          evidenced_criteria: evidenced,
          verified_criteria: u.passed,
          required_entries: 0,
          completed_entries: 0,
          completion_percentage: pct,
          status: pct >= 100 ? 'complete' : evidenced > 0 ? 'in_progress' : 'not_started',
          last_updated: lastDecided ?? null,
        };
      }),
    [ac.units]
  );

  const activeQualification = useMemo<QualificationSelection | null>(() => {
    if (!qualifications.length) return null;
    const active = qualifications.find((q) => q.is_active);
    return (
      active ??
      [...qualifications].sort(
        (a, b) => (b.progress_percentage ?? 0) - (a.progress_percentage ?? 0)
      )[0] ??
      null
    );
  }, [qualifications]);

  const totals = useMemo(() => {
    const totalCriteria = unitCoverage.reduce((s, r) => s + (r.total_criteria ?? 0), 0);
    const totalEvidenced = unitCoverage.reduce((s, r) => s + (r.evidenced_criteria ?? 0), 0);
    const totalVerified = unitCoverage.reduce((s, r) => s + (r.verified_criteria ?? 0), 0);
    const unitsStarted = unitCoverage.filter(
      (r) => (r.evidenced_criteria ?? 0) > 0 || (r.completion_percentage ?? 0) > 0
    ).length;
    const unitsComplete = unitCoverage.filter(
      (r) => (r.completion_percentage ?? 0) >= 100 || r.status === 'complete'
    ).length;
    const totalMinutes = modules.reduce((s, m) => s + (m.time_spent_minutes ?? 0), 0);
    // Criteria passed over the qualification's total: the same figure the
    // learner's hub and portfolio show (ELE-1917), not the stale
    // user_qualification_selections.progress_percentage.
    const overallPct = totalCriteria > 0 ? Math.round((totalVerified / totalCriteria) * 100) : 0;
    return {
      overall_percent: overallPct,
      units_started: unitsStarted,
      units_complete: unitsComplete,
      total_evidenced: totalEvidenced,
      total_verified: totalVerified,
      total_criteria: totalCriteria,
      total_minutes_studied: totalMinutes,
    };
  }, [unitCoverage, modules]);

  return useMemo(
    () => ({
      qualifications,
      activeQualification,
      unitCoverage,
      qualCompliance,
      courseSections,
      modules,
      ksb: ksbCounts,
      totals,
      loading: loading || ac.loading,
      error: error ?? ac.error,
      refresh: async () => {
        await Promise.all([fetchAll(), ac.refresh()]);
      },
    }),
    [
      qualifications,
      activeQualification,
      unitCoverage,
      qualCompliance,
      courseSections,
      modules,
      ksbCounts,
      totals,
      loading,
      error,
      fetchAll,
      ac.loading,
      ac.error,
      ac.refresh,
    ]
  );
}
