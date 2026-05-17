import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useOtjForecast — predict whether an apprentice will hit their ESFA OTJ
   minimum (20% of contracted hours) by their expected_end_date, based on
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
}

const DEFAULT_CONTRACTED_WEEKLY_HOURS = 30;
const ESFA_OTJ_RATIO = 0.2;

function dayCount(from: Date, to: Date): number {
  return Math.max(0, Math.round((to.getTime() - from.getTime()) / 86_400_000));
}

/** Plain async compute — can be reused outside React. */
export async function computeOtjForecast(studentId: string): Promise<OtjForecast> {
  const { data: studentRow, error: sErr } = await supabase
    .from('college_students')
    .select('id, start_date, expected_end_date, cohort_id')
    .eq('id', studentId)
    .maybeSingle();
  if (sErr) throw sErr;
  const student = studentRow as
    | { id: string; start_date: string | null; expected_end_date: string | null; cohort_id: string | null }
    | null;
  if (!student) throw new Error('Student not found');

  let startDate = student.start_date ? new Date(student.start_date) : null;
  let endDate = student.expected_end_date ? new Date(student.expected_end_date) : null;

  if ((!startDate || !endDate) && student.cohort_id) {
    const { data: cohortRow } = await supabase
      .from('college_cohorts')
      .select('id, start_date, end_date')
      .eq('id', student.cohort_id)
      .maybeSingle();
    const cohort = cohortRow as
      | { id: string; start_date: string | null; end_date: string | null }
      | null;
    if (cohort) {
      if (!startDate && cohort.start_date) startDate = new Date(cohort.start_date);
      if (!endDate && cohort.end_date) endDate = new Date(cohort.end_date);
    }
  }

  if (!startDate || !endDate) {
    return {
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
  }

  const now = new Date();
  const totalDays = dayCount(startDate, endDate);
  const daysElapsed = dayCount(startDate, now);
  const daysRemaining = Math.max(0, totalDays - daysElapsed);
  const totalWeeks = totalDays / 7;

  const { data: entryRows, error: eErr } = await supabase
    .from('college_otj_entries')
    .select('student_id, duration_minutes, verification_status')
    .eq('student_id', studentId);
  if (eErr) {
    return {
      student_id: studentId,
      current_hours: 0,
      required_hours: Math.round(totalWeeks * DEFAULT_CONTRACTED_WEEKLY_HOURS * ESFA_OTJ_RATIO),
      days_elapsed: daysElapsed,
      days_remaining: daysRemaining,
      weekly_pace_hours: 0,
      forecast_hours_at_end: 0,
      forecast_pct: 0,
      shortfall_hours: 0,
      risk: 'unknown',
      weekly_needed_to_close_gap: 0,
    };
  }
  const entries = (entryRows ?? []) as Array<{
    duration_minutes: number;
    verification_status?: string | null;
  }>;
  const verifiedMinutes = entries
    .filter((e) => !e.verification_status || e.verification_status === 'verified')
    .reduce((acc, e) => acc + (e.duration_minutes ?? 0), 0);
  const currentHours = Math.round((verifiedMinutes / 60) * 10) / 10;

  const requiredHours = Math.round(
    totalWeeks * DEFAULT_CONTRACTED_WEEKLY_HOURS * ESFA_OTJ_RATIO
  );

  const weeksElapsed = Math.max(daysElapsed / 7, 0.5);
  const weeklyPace = currentHours / weeksElapsed;
  const forecastHoursAtEnd = currentHours + weeklyPace * (daysRemaining / 7);
  const forecastPct = requiredHours
    ? Math.round((forecastHoursAtEnd / requiredHours) * 100)
    : 0;
  const shortfall = forecastHoursAtEnd - requiredHours;
  const weeklyNeededToCloseGap =
    daysRemaining > 0 && shortfall < 0
      ? Math.round((Math.abs(shortfall) / (daysRemaining / 7)) * 10) / 10
      : 0;
  const risk: OtjRisk =
    forecastPct >= 100 ? 'green' : forecastPct >= 90 ? 'amber' : 'red';

  return {
    student_id: studentId,
    current_hours: currentHours,
    required_hours: requiredHours,
    days_elapsed: daysElapsed,
    days_remaining: daysRemaining,
    weekly_pace_hours: Math.round(weeklyPace * 10) / 10,
    forecast_hours_at_end: Math.round(forecastHoursAtEnd * 10) / 10,
    forecast_pct: forecastPct,
    shortfall_hours: Math.round(shortfall * 10) / 10,
    risk,
    weekly_needed_to_close_gap: weeklyNeededToCloseGap,
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
      const active = (studentRows ?? []).filter((s: any) => s.status === 'Active');
      const out = await Promise.all(
        active.map((s: any) => computeOtjForecast(s.id).catch(() => null))
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
