import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useStudentOtjTrajectory — cumulative OTJ hours per week vs the linear
   required-hours target.

   Inputs come from:
     - college_otj_entries (per-week duration)
     - college_students.start_date / expected_end_date / otj_required_hours
     - college_courses.duration_months (fallback for required hours when
       the per-student override is null — 30h/week × 20% rule)

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

const HOURS_PER_WEEK = 30;
const OTJ_PCT = 0.2;
const WEEKS_PER_MONTH = 4.33;

function sundayEnding(d: Date): Date {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  const day = out.getDay(); // 0 (Sun) .. 6 (Sat)
  const daysUntilSunday = (7 - day) % 7;
  out.setDate(out.getDate() + daysUntilSunday);
  return out;
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
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

    // Pull student + course in parallel with OTJ entries
    const [{ data: student }, { data: otj }] = await Promise.all([
      supabase
        .from('college_students')
        .select('id, start_date, expected_end_date, otj_required_hours, course_id')
        .eq('id', collegeStudentId)
        .maybeSingle(),
      supabase
        .from('college_otj_entries')
        .select('activity_date, duration_minutes, verification_status')
        .eq('student_id', userId)
        .order('activity_date', { ascending: true }),
    ]);

    if (!student) {
      setState({
        points: [],
        required_total: 0,
        start_date: null,
        expected_end_date: null,
        current_actual: 0,
        current_required: 0,
        current_delta: 0,
        on_track: true,
        loading: false,
      });
      return;
    }

    const s = student as {
      start_date: string | null;
      expected_end_date: string | null;
      otj_required_hours: number | null;
      course_id: string | null;
    };

    // Resolve required-hours target
    let requiredTotal = s.otj_required_hours ?? 0;
    if (!requiredTotal && s.course_id) {
      const { data: course } = await supabase
        .from('college_courses')
        .select('duration_months')
        .eq('id', s.course_id)
        .maybeSingle();
      const months = (course as { duration_months?: number | null } | null)?.duration_months ?? 0;
      requiredTotal = Math.round(months * WEEKS_PER_MONTH * HOURS_PER_WEEK * OTJ_PCT);
    }
    if (!requiredTotal) requiredTotal = 370; // ESFA-typical fallback

    if (!s.start_date) {
      setState({
        points: [],
        required_total: requiredTotal,
        start_date: null,
        expected_end_date: s.expected_end_date,
        current_actual: 0,
        current_required: 0,
        current_delta: 0,
        on_track: true,
        loading: false,
      });
      return;
    }

    const start = new Date(s.start_date);
    const end = s.expected_end_date ? new Date(s.expected_end_date) : null;
    const today = new Date();

    // Enumerate Sunday-ending weeks from start to min(today, end). Cap at
    // 200 weeks so a stale record can't run away with the loop.
    const finalWeek = sundayEnding(end && end < today ? end : today);
    const firstWeek = sundayEnding(start);
    const weeks: Date[] = [];
    let cursor = new Date(firstWeek);
    let safety = 0;
    while (cursor.getTime() <= finalWeek.getTime() && safety < 200) {
      weeks.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 7);
      safety += 1;
    }
    if (weeks.length === 0) weeks.push(new Date(finalWeek));

    // Total programme weeks for the linear target
    const totalWeeks =
      end && end > start
        ? Math.max(1, Math.round((end.getTime() - start.getTime()) / (7 * 86_400_000)))
        : Math.max(1, weeks.length);

    // Aggregate entries by week-ending
    type Bucket = { mins: number; verifiedMins: number };
    const byWeek = new Map<string, Bucket>();
    for (const row of (otj ?? []) as Array<{
      activity_date: string;
      duration_minutes: number;
      verification_status: string | null;
    }>) {
      const d = new Date(row.activity_date);
      if (d < start) continue;
      const key = isoDate(sundayEnding(d));
      const bucket = byWeek.get(key) ?? { mins: 0, verifiedMins: 0 };
      bucket.mins += row.duration_minutes ?? 0;
      if (row.verification_status?.startsWith('verified')) {
        bucket.verifiedMins += row.duration_minutes ?? 0;
      }
      byWeek.set(key, bucket);
    }

    // Build the cumulative series
    let cum = 0;
    let cumVerified = 0;
    const points: OtjTrajectoryPoint[] = weeks.map((wk, i) => {
      const key = isoDate(wk);
      const bucket = byWeek.get(key);
      if (bucket) {
        cum += bucket.mins / 60;
        cumVerified += bucket.verifiedMins / 60;
      }
      const required = Math.round(((i + 1) / totalWeeks) * requiredTotal * 10) / 10;
      const actual = Math.round(cum * 10) / 10;
      const verified = Math.round(cumVerified * 10) / 10;
      return {
        week_ending: key,
        cumulative_hours: actual,
        cumulative_verified_hours: verified,
        required_hours: Math.min(required, requiredTotal),
        delta_hours: Math.round((actual - required) * 10) / 10,
      };
    });

    const last = points[points.length - 1];
    setState({
      points,
      required_total: requiredTotal,
      start_date: s.start_date,
      expected_end_date: s.expected_end_date,
      current_actual: last?.cumulative_hours ?? 0,
      current_required: last?.required_hours ?? 0,
      current_delta: last?.delta_hours ?? 0,
      on_track: (last?.delta_hours ?? 0) >= -10,
      loading: false,
    });
  }, [collegeStudentId, userId]);

  useEffect(() => {
    void load();
  }, [load]);

  return state;
}
