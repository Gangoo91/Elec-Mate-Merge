import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useApprenticeOtj — unified Off-the-Job Training view across both hubs.

   Combines apprentice-side rows (learning_activity_log.counted_as_ojt,
   study_sessions, user_video_watches) with college-side rows
   (college_otj_entries) into a single normalised timeline plus rolled-up
   totals per source. Designed for ESFA-defensible reporting (20% rule).

   The studentId argument is the auth.users.id (== profiles.id). Callers
   working from college_students rows must resolve user_id first.
   ========================================================================== */

export type OtjSource =
  | 'learning_activity'
  | 'study_session'
  | 'video_watch'
  | 'college';

export interface OtjEntry {
  id: string;
  source: OtjSource;
  occurred_at: string;
  duration_minutes: number;
  title: string;
  category: string | null;
  description: string | null;
  unit_codes: string[];
  evidence_url: string | null;
  recorded_by_name: string | null;
  verified_at: string | null;
}

export interface OtjBreakdown {
  total_minutes: number;
  total_hours: number;
  by_source: Record<OtjSource, { minutes: number; entries: number }>;
  last_7_days_minutes: number;
  last_30_days_minutes: number;
  this_week_minutes: number;
  weekly_target_minutes: number;
  weekly_progress_percent: number;
}

export interface ApprenticeOtj {
  entries: OtjEntry[];
  breakdown: OtjBreakdown;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const DEFAULT_WEEKLY_TARGET_MINUTES = 6 * 60; // ESFA 6-hour minimum per week

const ZERO_BREAKDOWN: OtjBreakdown = {
  total_minutes: 0,
  total_hours: 0,
  by_source: {
    learning_activity: { minutes: 0, entries: 0 },
    study_session: { minutes: 0, entries: 0 },
    video_watch: { minutes: 0, entries: 0 },
    college: { minutes: 0, entries: 0 },
  },
  last_7_days_minutes: 0,
  last_30_days_minutes: 0,
  this_week_minutes: 0,
  weekly_target_minutes: DEFAULT_WEEKLY_TARGET_MINUTES,
  weekly_progress_percent: 0,
};

// Use UTC consistently — entries are stored as UTC ISO strings, so the
// "since" thresholds need to be UTC too. Using local-time week boundaries
// causes Sunday-late-night UTC entries to be mis-bucketed.
function startOfThisWeekIso(): string {
  const now = new Date();
  const dayUtc = now.getUTCDay(); // 0 Sun .. 6 Sat
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

export function useApprenticeOtj(
  userId: string | null,
  weeklyTargetMinutes: number = DEFAULT_WEEKLY_TARGET_MINUTES
): ApprenticeOtj {
  const [entries, setEntries] = useState<OtjEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!userId) {
      setEntries([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const [activityRes, sessionRes, watchRes, collegeRes] = await Promise.all([
        supabase
          .from('learning_activity_log')
          .select(
            'id, activity_type, source_title, duration_minutes, created_at, counted_as_ojt, metadata'
          )
          .eq('user_id', userId)
          .eq('counted_as_ojt', true)
          .order('created_at', { ascending: false })
          .limit(200),
        supabase
          .from('study_sessions')
          .select('id, course_slug, duration, resource_type, activity, notes, created_at')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(200),
        supabase
          .from('user_video_watches')
          .select('id, video_id, watched_at')
          .eq('user_id', userId)
          .order('watched_at', { ascending: false })
          .limit(200),
        supabase
          .from('college_otj_entries')
          .select(
            'id, activity_date, activity_type, title, description, duration_minutes, unit_codes, evidence_url, recorded_by_name_snapshot, verified_at, created_at'
          )
          .eq('student_id', userId)
          .order('activity_date', { ascending: false })
          .limit(200),
      ]);

      const merged: OtjEntry[] = [];

      if (!activityRes.error && activityRes.data) {
        for (const row of activityRes.data as Array<{
          id: string;
          activity_type: string;
          source_title: string | null;
          duration_minutes: number | null;
          created_at: string | null;
          metadata: Record<string, unknown> | null;
        }>) {
          merged.push({
            id: `act_${row.id}`,
            source: 'learning_activity',
            occurred_at: row.created_at ?? new Date().toISOString(),
            duration_minutes: row.duration_minutes ?? 0,
            title: row.source_title ?? row.activity_type,
            category: row.activity_type,
            description: null,
            unit_codes: [],
            evidence_url: null,
            recorded_by_name: null,
            verified_at: null,
          });
        }
      }

      if (!sessionRes.error && sessionRes.data) {
        for (const row of sessionRes.data as Array<{
          id: string;
          course_slug: string | null;
          duration: number | null;
          resource_type: string | null;
          activity: string | null;
          created_at: string | null;
        }>) {
          if (!row.duration || row.duration <= 0) continue;
          // study_sessions.duration is stored in SECONDS (see
          // useSupabaseEntries.tsx → ceil(duration/60) for the same column).
          const minutes = Math.round((row.duration / 60) * 10) / 10;
          if (minutes <= 0) continue;
          merged.push({
            id: `ss_${row.id}`,
            source: 'study_session',
            occurred_at: row.created_at ?? new Date().toISOString(),
            duration_minutes: minutes,
            title: row.activity ?? row.course_slug ?? 'Study session',
            category: row.resource_type ?? 'study',
            description: null,
            unit_codes: [],
            evidence_url: null,
            recorded_by_name: null,
            verified_at: null,
          });
        }
      }

      // Video watches have no stored duration. We surface them on the timeline
      // (so tutors can see which videos a learner has watched) but with 0
      // minutes — they only count toward OTJ if mirrored in
      // learning_activity_log with duration_minutes set.
      if (!watchRes.error && watchRes.data) {
        for (const row of watchRes.data as Array<{
          id: string;
          video_id: string;
          watched_at: string | null;
        }>) {
          merged.push({
            id: `vid_${row.id}`,
            source: 'video_watch',
            occurred_at: row.watched_at ?? new Date().toISOString(),
            duration_minutes: 0,
            title: `Video ${row.video_id}`,
            category: 'video',
            description: null,
            unit_codes: [],
            evidence_url: null,
            recorded_by_name: null,
            verified_at: null,
          });
        }
      }

      if (!collegeRes.error && collegeRes.data) {
        for (const row of collegeRes.data as Array<{
          id: string;
          activity_date: string;
          activity_type: string;
          title: string;
          description: string | null;
          duration_minutes: number;
          unit_codes: string[] | null;
          evidence_url: string | null;
          recorded_by_name_snapshot: string | null;
          verified_at: string | null;
          created_at: string | null;
        }>) {
          merged.push({
            id: `col_${row.id}`,
            source: 'college',
            occurred_at: row.activity_date
              ? `${row.activity_date}T12:00:00Z`
              : (row.created_at ?? new Date().toISOString()),
            duration_minutes: row.duration_minutes,
            title: row.title,
            category: row.activity_type,
            description: row.description,
            unit_codes: row.unit_codes ?? [],
            evidence_url: row.evidence_url,
            recorded_by_name: row.recorded_by_name_snapshot,
            verified_at: row.verified_at,
          });
        }
      }

      merged.sort((a, b) => (a.occurred_at < b.occurred_at ? 1 : -1));
      setEntries(merged);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (!userId) return;
    const channel = supabase
      .channel(`apprentice_otj:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_otj_entries',
          filter: `student_id=eq.${userId}`,
        },
        () => fetchAll()
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'learning_activity_log',
          filter: `user_id=eq.${userId}`,
        },
        () => fetchAll()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, fetchAll]);

  const breakdown = useMemo<OtjBreakdown>(() => {
    if (!entries.length) {
      return { ...ZERO_BREAKDOWN, weekly_target_minutes: weeklyTargetMinutes };
    }
    const bySource: OtjBreakdown['by_source'] = {
      learning_activity: { minutes: 0, entries: 0 },
      study_session: { minutes: 0, entries: 0 },
      video_watch: { minutes: 0, entries: 0 },
      college: { minutes: 0, entries: 0 },
    };
    let total = 0;
    let last7 = 0;
    let last30 = 0;
    let thisWeek = 0;
    const since7 = daysAgoIso(7);
    const since30 = daysAgoIso(30);
    const sinceWeekStart = startOfThisWeekIso();

    for (const e of entries) {
      total += e.duration_minutes;
      bySource[e.source].minutes += e.duration_minutes;
      bySource[e.source].entries += 1;
      if (e.occurred_at >= since7) last7 += e.duration_minutes;
      if (e.occurred_at >= since30) last30 += e.duration_minutes;
      if (e.occurred_at >= sinceWeekStart) thisWeek += e.duration_minutes;
    }

    const weeklyProgress =
      weeklyTargetMinutes > 0
        ? Math.min(100, Math.round((thisWeek / weeklyTargetMinutes) * 100))
        : 0;

    return {
      total_minutes: Math.round(total),
      total_hours: Math.round((total / 60) * 10) / 10,
      by_source: bySource,
      last_7_days_minutes: Math.round(last7),
      last_30_days_minutes: Math.round(last30),
      this_week_minutes: Math.round(thisWeek),
      weekly_target_minutes: weeklyTargetMinutes,
      weekly_progress_percent: weeklyProgress,
    };
  }, [entries, weeklyTargetMinutes]);

  return useMemo(
    () => ({ entries, breakdown, loading, error, refresh: fetchAll }),
    [entries, breakdown, loading, error, fetchAll]
  );
}
