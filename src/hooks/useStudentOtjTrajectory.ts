import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useStudentOtjTrajectory — cumulative OTJ hours per week vs the linear
   required-hours target.

   Inputs come from:
     - college_otj_entries (per-week duration)
     - college_students.start_date / expected_end_date / otj_required_hours
     - all of it now computed server-side by get_otj_trajectory

   Output: array of weekly points, ordered ascending, where each point has:
     - week_ending (ISO date, Sunday-ending)
     - cumulative_hours: total verified+pending hours up to that week
     - cumulative_verified_hours: subset that's verified
     - required_hours: linear target at this point in the apprenticeship
     - delta_hours: actual − required (negative = behind)
   ========================================================================== */

export interface OtjTrajectoryPoint {
  week_ending: string;
  cumulative_hours: number;
  cumulative_verified_hours: number;
  required_hours: number;
  delta_hours: number;
}

export interface OtjTrajectory {
  points: OtjTrajectoryPoint[];
  required_total: number;
  start_date: string | null;
  expected_end_date: string | null;
  current_actual: number;
  current_required: number;
  current_delta: number;
  on_track: boolean;
  loading: boolean;
}

export function useStudentOtjTrajectory(args: {
  collegeStudentId: string | null;
  userId: string | null;
}): OtjTrajectory {
  const { collegeStudentId, userId } = args;
  const [state, setState] = useState<OtjTrajectory>({
    points: [],
    required_total: 0,
    start_date: null,
    expected_end_date: null,
    current_actual: 0,
    current_required: 0,
    current_delta: 0,
    on_track: true,
    loading: true,
  });

  const load = useCallback(async () => {
    if (!collegeStudentId || !userId) {
      setState((s) => ({ ...s, loading: false, points: [] }));
      return;
    }
    setState((s) => ({ ...s, loading: true }));

    // One server function, built on the same figures as get_otj_summary, so
    // this chart can never disagree with the learner's hub or the cohort page.
    // It replaced a client calculation that fell back to "30h/week × 20%".
    const { data, error } = await supabase.rpc('get_otj_trajectory' as never, { p_user: userId } as never);
    const t = (error ? null : data) as unknown as {
      start_date: string | null;
      end_date: string | null;
      required_hours: number | null;
      points: Array<{
        week_ending: string;
        counted_hours: number;
        verified_hours: number;
        planned_hours: number | null;
      }>;
    } | null;

    const points: OtjTrajectoryPoint[] = (t?.points ?? []).map((p) => ({
      week_ending: p.week_ending,
      cumulative_hours: p.counted_hours,
      cumulative_verified_hours: p.verified_hours,
      required_hours: p.planned_hours ?? 0,
      delta_hours: Math.round((p.counted_hours - (p.planned_hours ?? 0)) * 10) / 10,
    }));
    const last = points[points.length - 1];
    setState({
      points,
      required_total: t?.required_hours ?? 0,
      start_date: t?.start_date ?? null,
      expected_end_date: t?.end_date ?? null,
      current_actual: last?.cumulative_hours ?? 0,
      current_required: last?.required_hours ?? 0,
      current_delta: last?.delta_hours ?? 0,
      // Same rule as get_otj_summary: behind below 80% of planned to date.
      on_track: !last || last.cumulative_hours >= 0.8 * last.required_hours,
      loading: false,
    });
  }, [collegeStudentId, userId]);

  useEffect(() => {
    void load();
  }, [load]);

  return state;
}
