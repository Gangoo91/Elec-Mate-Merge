import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useOtjForecast — predict whether an apprentice will hit their off-the-job
   hours requirement (a fixed total set by the standard) by their expected_end_date, based on
   their current logging pace.
   ELE-928 (I2).
   ========================================================================== */

export type OtjRisk = 'green' | 'amber' | 'red' | 'unknown';

export interface OtjForecast {
  student_id: string;
  current_hours: number;
  required_hours: number;
  days_elapsed: number;
  days_remaining: number;
  weekly_pace_hours: number;
  forecast_hours_at_end: number;
  forecast_pct: number;
  shortfall_hours: number;
  risk: OtjRisk;
  weekly_needed_to_close_gap: number;
  /** False until four weeks into the programme: no pace to project yet. */
  forecast_ready?: boolean;
}

/**
 * Reads the one off-the-job figure, get_otj_summary (ELE-1877), so the badge
 * on Student 360 shows exactly what the learner and employer see. This used
 * to recompute hours here from verified entries only, with its own pace
 * maths — a third figure for the same learner. Counted hours include app
 * learning (Andrew's decision, 6 Oct 2026); pace and forecast wait until four
 * weeks into the programme.
 *
 * studentId: the college_students row id (what Student 360 holds).
 */
export async function computeOtjForecast(studentId: string): Promise<OtjForecast> {
  const { data: studentRow, error: sErr } = await supabase
    .from('college_students')
    .select('id, user_id')
    .eq('id', studentId)
    .maybeSingle();
  if (sErr) throw sErr;
  const userId = (studentRow as { user_id: string | null } | null)?.user_id ?? null;
  const empty: OtjForecast = {
    student_id: studentId,
    current_hours: 0,
    required_hours: 0,
    days_elapsed: 0,
    days_remaining: 0,
    weekly_pace_hours: 0,
    forecast_hours_at_end: 0,
    forecast_pct: 0,
    shortfall_hours: 0,
    risk: 'unknown',
    weekly_needed_to_close_gap: 0,
  };
  if (!userId) return empty;

  const { data, error } = await supabase.rpc('get_otj_summary' as never, { p_user: userId } as never);
  if (error) throw error;
  const s = data as unknown as {
    required_hours: number | null;
    start_date: string | null;
    end_date: string | null;
    counted_hours: number;
    weekly_pace_hours: number | null;
    forecast_at_end_hours: number | null;
    weekly_needed_hours: number | null;
    risk: 'on_track' | 'slightly_behind' | 'behind' | 'unknown';
  };

  const today = new Date();
  const days = (iso: string | null, sign: 1 | -1) =>
    iso ? Math.max(0, Math.round((sign * (new Date(iso).getTime() - today.getTime())) / 86_400_000)) : 0;
  const required = s.required_hours ?? 0;
  const forecastAtEnd = s.forecast_at_end_hours ?? s.counted_hours;
  const forecastPct = required > 0 ? Math.round((forecastAtEnd / required) * 100) : 0;

  return {
    student_id: studentId,
    current_hours: s.counted_hours,
    required_hours: required,
    days_elapsed: days(s.start_date, -1),
    days_remaining: days(s.end_date, 1),
    weekly_pace_hours: s.weekly_pace_hours ?? 0,
    forecast_hours_at_end: forecastAtEnd,
    forecast_pct: forecastPct,
    shortfall_hours: Math.round((forecastAtEnd - required) * 10) / 10,
    // The same risk the learner, cohort page and employer see.
    risk:
      s.risk === 'on_track'
          ? 'green'
          : s.risk === 'slightly_behind'
            ? 'amber'
            : s.risk === 'behind'
              ? 'red'
              : 'unknown',
    weekly_needed_to_close_gap: s.weekly_needed_hours ?? 0,
    forecast_ready: s.forecast_at_end_hours != null,
  };
}

export function useOtjForecast(studentId: string | null | undefined) {
  const [forecast, setForecast] = useState<OtjForecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    if (!studentId) {
      setForecast(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setForecast(await computeOtjForecast(studentId));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    void run();
  }, [run]);

  return { forecast, loading, error, refetch: run };
}

/** Cohort-level rollup — kicks off compute for every active learner. */
export function useCohortOtjForecast(cohortId: string | null | undefined) {
  const [rows, setRows] = useState<OtjForecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    if (!cohortId) {
      setRows([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data: studentRows } = await supabase
        .from('college_students')
        .select('id, status')
        .eq('cohort_id', cohortId);
      const active = ((studentRows ?? []) as Array<{ id: string; status: string | null }>).filter(
        (s) => s.status === 'Active'
      );
      const out = await Promise.all(
        active.map((s) => computeOtjForecast(s.id).catch(() => null))
      );
      setRows(out.filter(Boolean) as OtjForecast[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [cohortId]);

  useEffect(() => {
    void run();
  }, [run]);

  const summary = rows.reduce(
    (acc, r) => {
      acc[r.risk]++;
      return acc;
    },
    { green: 0, amber: 0, red: 0, unknown: 0 } as Record<OtjRisk, number>
  );

  return { rows, summary, loading, error, refetch: run };
}
