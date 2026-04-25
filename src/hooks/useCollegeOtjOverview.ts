import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useCollegeOtjOverview — college-wide OTJ roll-up across all assigned
   learners. Aggregates apprentice-side learning_activity_log + study
   sessions plus college_otj_entries into per-learner totals so a head of
   apprenticeships can see the whole cohort at a glance.

   Built for ESFA-defensible reporting. Returns weekly + total minutes per
   learner with status banding (on_track / behind / at_risk).
   ========================================================================== */

export type OtjStatus = 'on_track' | 'behind' | 'at_risk' | 'no_data';

export interface OtjLearnerSummary {
  student_id: string;
  user_id: string | null;
  name: string;
  cohort_name: string | null;
  course_name: string | null;
  employer_name: string | null;
  this_week_minutes: number;
  last_4_weeks_minutes: number;
  total_minutes: number;
  total_hours: number;
  weekly_target_minutes: number;
  weekly_progress_percent: number;
  status: OtjStatus;
  last_activity_at: string | null;
  source_breakdown: {
    learning_activity: number;
    study_session: number;
    college: number;
  };
}

export interface OtjOverviewFilters {
  cohort_id?: string | null;
  course_id?: string | null;
}

export interface OtjOverviewRollUp {
  total_learners: number;
  on_track: number;
  behind: number;
  at_risk: number;
  no_data: number;
  total_hours_this_week: number;
  total_hours_all_time: number;
  avg_weekly_hours: number;
}

export interface OtjOverviewHook {
  rows: OtjLearnerSummary[];
  rollUp: OtjOverviewRollUp;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  exportCsv: () => string;
}

const DEFAULT_WEEKLY_TARGET = 6 * 60; // 6h/week ESFA minimum

const ZERO_ROLLUP: OtjOverviewRollUp = {
  total_learners: 0,
  on_track: 0,
  behind: 0,
  at_risk: 0,
  no_data: 0,
  total_hours_this_week: 0,
  total_hours_all_time: 0,
  avg_weekly_hours: 0,
};

function startOfWeekIso(): string {
  const now = new Date();
  const dayUtc = now.getUTCDay();
  const diffToMonday = (dayUtc + 6) % 7;
  const monday = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() - diffToMonday,
      0,
      0,
      0,
      0
    )
  );
  return monday.toISOString();
}

function daysAgoIso(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString();
}

function statusFor(weeklyPct: number, totalMinutes: number): OtjStatus {
  if (totalMinutes === 0) return 'no_data';
  if (weeklyPct >= 80) return 'on_track';
  if (weeklyPct >= 50) return 'behind';
  return 'at_risk';
}

export function useCollegeOtjOverview(filters: OtjOverviewFilters = {}): OtjOverviewHook {
  const [rows, setRows] = useState<OtjLearnerSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Get the student list scoped to the current user's college via RLS.
      // We pull from college_students directly — RLS on that table already
      // restricts to the staff member's college.
      let q = supabase
        .from('college_students')
        .select(
          'id, user_id, name, status, cohort_id, course_id, employer_id, college_cohorts(name), college_courses(title)'
        );
      if (filters.cohort_id) q = q.eq('cohort_id', filters.cohort_id);
      if (filters.course_id) q = q.eq('course_id', filters.course_id);
      const { data: students, error: stuErr } = await q;
      if (stuErr) throw stuErr;

      const studentList = (students ?? []) as Array<{
        id: string;
        user_id: string | null;
        name: string;
        status: string | null;
        college_cohorts: { name?: string } | null;
        college_courses: { title?: string } | null;
      }>;

      const userIds = studentList.map((s) => s.user_id).filter((u): u is string => !!u);

      const sinceWeek = startOfWeekIso();
      const since28 = daysAgoIso(28);

      // Pull all OTJ-relevant rows for these users in one go (apprentice +
      // college side). RLS will already restrict to those the staff member
      // is allowed to see.
      const [activityRes, sessionRes, collegeRes] = await Promise.all([
        userIds.length
          ? supabase
              .from('learning_activity_log')
              .select('user_id, duration_minutes, created_at')
              .in('user_id', userIds)
              .eq('counted_as_ojt', true)
          : Promise.resolve({ data: [], error: null }),
        userIds.length
          ? supabase
              .from('study_sessions')
              .select('user_id, duration, created_at')
              .in('user_id', userIds)
          : Promise.resolve({ data: [], error: null }),
        userIds.length
          ? supabase
              .from('college_otj_entries')
              .select('student_id, duration_minutes, activity_date, created_at')
              .in('student_id', userIds)
          : Promise.resolve({ data: [], error: null }),
      ]);

      // Aggregate per user
      type Bucket = {
        this_week: number;
        last_4w: number;
        total: number;
        learning_activity: number;
        study_session: number;
        college: number;
        last_at: string | null;
      };
      const buckets = new Map<string, Bucket>();
      const ensure = (uid: string): Bucket => {
        let b = buckets.get(uid);
        if (!b) {
          b = {
            this_week: 0,
            last_4w: 0,
            total: 0,
            learning_activity: 0,
            study_session: 0,
            college: 0,
            last_at: null,
          };
          buckets.set(uid, b);
        }
        return b;
      };

      const bumpRecency = (b: Bucket, when: string | null) => {
        if (!when) return;
        if (!b.last_at || when > b.last_at) b.last_at = when;
      };

      for (const r of (activityRes.data as Array<{
        user_id: string;
        duration_minutes: number | null;
        created_at: string | null;
      }>) ?? []) {
        const m = r.duration_minutes ?? 0;
        if (m <= 0) continue;
        const b = ensure(r.user_id);
        b.total += m;
        b.learning_activity += m;
        if (r.created_at && r.created_at >= sinceWeek) b.this_week += m;
        if (r.created_at && r.created_at >= since28) b.last_4w += m;
        bumpRecency(b, r.created_at);
      }

      for (const r of (sessionRes.data as Array<{
        user_id: string;
        duration: number | null;
        created_at: string | null;
      }>) ?? []) {
        // study_sessions.duration is stored in SECONDS — divide by 60.
        const seconds = r.duration ?? 0;
        if (seconds <= 0) continue;
        const m = seconds / 60;
        const b = ensure(r.user_id);
        b.total += m;
        b.study_session += m;
        if (r.created_at && r.created_at >= sinceWeek) b.this_week += m;
        if (r.created_at && r.created_at >= since28) b.last_4w += m;
        bumpRecency(b, r.created_at);
      }

      for (const r of (collegeRes.data as Array<{
        student_id: string;
        duration_minutes: number;
        activity_date: string | null;
        created_at: string | null;
      }>) ?? []) {
        const m = r.duration_minutes ?? 0;
        if (m <= 0) continue;
        const b = ensure(r.student_id);
        b.total += m;
        b.college += m;
        const when = r.activity_date
          ? `${r.activity_date}T12:00:00Z`
          : (r.created_at ?? null);
        if (when && when >= sinceWeek) b.this_week += m;
        if (when && when >= since28) b.last_4w += m;
        bumpRecency(b, when);
      }

      const summaries: OtjLearnerSummary[] = studentList.map((s) => {
        const uid = s.user_id;
        const b = uid ? (buckets.get(uid) ?? null) : null;
        const thisWeek = b?.this_week ?? 0;
        const total = b?.total ?? 0;
        const last4 = b?.last_4w ?? 0;
        const weeklyPct = Math.min(100, Math.round((thisWeek / DEFAULT_WEEKLY_TARGET) * 100));
        return {
          student_id: s.id,
          user_id: uid,
          name: s.name,
          cohort_name: s.college_cohorts?.name ?? null,
          course_name: s.college_courses?.title ?? null,
          employer_name: null,
          this_week_minutes: Math.round(thisWeek),
          last_4_weeks_minutes: Math.round(last4),
          total_minutes: Math.round(total),
          total_hours: Math.round((total / 60) * 10) / 10,
          weekly_target_minutes: DEFAULT_WEEKLY_TARGET,
          weekly_progress_percent: weeklyPct,
          status: statusFor(weeklyPct, total),
          last_activity_at: b?.last_at ?? null,
          source_breakdown: {
            learning_activity: Math.round(b?.learning_activity ?? 0),
            study_session: Math.round(b?.study_session ?? 0),
            college: Math.round(b?.college ?? 0),
          },
        };
      });

      // Sort: at-risk first, then by weekly% asc, then by name
      summaries.sort((a, b) => {
        const order: Record<OtjStatus, number> = { at_risk: 0, behind: 1, no_data: 2, on_track: 3 };
        if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
        return a.weekly_progress_percent - b.weekly_progress_percent;
      });

      setRows(summaries);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [filters.cohort_id, filters.course_id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const rollUp = useMemo<OtjOverviewRollUp>(() => {
    if (!rows.length) return ZERO_ROLLUP;
    let onTrack = 0;
    let behind = 0;
    let atRisk = 0;
    let noData = 0;
    let weekTotal = 0;
    let allTotal = 0;
    for (const r of rows) {
      if (r.status === 'on_track') onTrack += 1;
      else if (r.status === 'behind') behind += 1;
      else if (r.status === 'at_risk') atRisk += 1;
      else noData += 1;
      weekTotal += r.this_week_minutes;
      allTotal += r.total_minutes;
    }
    return {
      total_learners: rows.length,
      on_track: onTrack,
      behind,
      at_risk: atRisk,
      no_data: noData,
      total_hours_this_week: Math.round((weekTotal / 60) * 10) / 10,
      total_hours_all_time: Math.round((allTotal / 60) * 10) / 10,
      avg_weekly_hours:
        rows.length > 0 ? Math.round(((weekTotal / rows.length) / 60) * 10) / 10 : 0,
    };
  }, [rows]);

  const exportCsv = useCallback((): string => {
    const header = [
      'Learner',
      'Cohort',
      'Course',
      'Employer',
      'This week (mins)',
      'This week (hrs)',
      'Last 4 weeks (mins)',
      'Total (mins)',
      'Total (hrs)',
      'Weekly target (mins)',
      'Weekly %',
      'Status',
      'Last activity',
      'In-app learning (mins)',
      'Study sessions (mins)',
      'College-led (mins)',
    ].join(',');

    const escape = (v: unknown) => {
      const s = v == null ? '' : String(v);
      if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
      return s;
    };

    const lines = rows.map((r) =>
      [
        r.name,
        r.cohort_name ?? '',
        r.course_name ?? '',
        r.employer_name ?? '',
        r.this_week_minutes,
        Math.round((r.this_week_minutes / 60) * 10) / 10,
        r.last_4_weeks_minutes,
        r.total_minutes,
        r.total_hours,
        r.weekly_target_minutes,
        r.weekly_progress_percent,
        r.status,
        r.last_activity_at ?? '',
        r.source_breakdown.learning_activity,
        r.source_breakdown.study_session,
        r.source_breakdown.college,
      ]
        .map(escape)
        .join(',')
    );

    return [header, ...lines].join('\n');
  }, [rows]);

  return useMemo(
    () => ({ rows, rollUp, loading, error, refresh: fetch, exportCsv }),
    [rows, rollUp, loading, error, fetch, exportCsv]
  );
}
