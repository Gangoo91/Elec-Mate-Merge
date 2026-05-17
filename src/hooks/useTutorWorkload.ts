import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useTutorWorkload — per-tutor workload aggregation for the HoD's
   "who's overloaded?" view.

   Per tutor (active college_staff with role='tutor' or 'head_of_department'),
   computes:
     - active cohorts they tutor
     - lessons scheduled this week
     - pending marking attempts (quizzes they created with awaiting_review)
     - days since last observed (any kind of college_tutor_observation)
     - portfolio comments authored in last 7 days

   load_band is a coarse derivation used to colour the card:
     - green: balanced
     - amber: heavy (>4 cohorts OR >3 pending marking)
     - red: overloaded (>6 cohorts OR >10 pending marking)
   ========================================================================== */

export type WorkloadBand = 'green' | 'amber' | 'red';

export interface TutorWorkloadRow {
  tutor_staff_id: string;
  user_id: string | null;
  name: string;
  role: string;
  active_cohorts: number;
  lessons_this_week: number;
  pending_grading: number;
  last_observed_days_ago: number | null;
  comments_last_7d: number;
  load_band: WorkloadBand;
}

function startOfThisWeek(): Date {
  const d = new Date();
  const day = d.getDay() || 7; // Sun → 7
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day + 1);
  return d;
}

function endOfThisWeek(): Date {
  const s = startOfThisWeek();
  s.setDate(s.getDate() + 6);
  s.setHours(23, 59, 59, 999);
  return s;
}

function bandFor(cohorts: number, pending: number): WorkloadBand {
  if (cohorts > 6 || pending > 10) return 'red';
  if (cohorts > 4 || pending > 3) return 'amber';
  return 'green';
}

export function useTutorWorkload() {
  const [rows, setRows] = useState<TutorWorkloadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Caller's college
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id;
      if (!userId) {
        setRows([]);
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', userId)
        .maybeSingle();
      const collegeId = (profile as { college_id?: string | null } | null)?.college_id;
      if (!collegeId) {
        setRows([]);
        return;
      }

      // Tutors / HoDs in this college
      const { data: tutors } = await supabase
        .from('college_staff')
        .select('id, user_id, name, role, status')
        .eq('college_id', collegeId)
        .in('role', ['tutor', 'head_of_department']);

      const activeTutors = ((tutors ?? []) as Array<any>).filter(
        (t) => t.status === 'Active'
      );
      if (activeTutors.length === 0) {
        setRows([]);
        return;
      }

      const tutorIds = activeTutors.map((t) => t.id);
      const tutorUserIds = activeTutors
        .map((t) => t.user_id)
        .filter((u): u is string => !!u);

      const weekStart = startOfThisWeek().toISOString().slice(0, 10);
      const weekEnd = endOfThisWeek().toISOString().slice(0, 10);
      const sevenAgo = new Date(Date.now() - 7 * 86_400_000).toISOString();
      const ninetyAgo = new Date(Date.now() - 90 * 86_400_000).toISOString().slice(0, 10);

      // Parallel signal fetches
      const [cohortsRes, lessonsRes, quizzesRes, obsRes, commentsRes] = await Promise.all([
        supabase
          .from('college_cohorts')
          .select('id, tutor_id')
          .eq('college_id', collegeId)
          .eq('status', 'Active')
          .in('tutor_id', tutorIds),
        supabase
          .from('college_lesson_plans')
          .select('id, tutor_id, scheduled_date, status')
          .eq('college_id', collegeId)
          .gte('scheduled_date', weekStart)
          .lte('scheduled_date', weekEnd)
          .in('tutor_id', tutorIds),
        // Quizzes created by these tutors — used to count their pending attempts
        tutorUserIds.length > 0
          ? supabase
              .from('tutor_quizzes')
              .select('id, creator_id')
              .in('creator_id', tutorUserIds)
          : Promise.resolve({ data: [] as any[], error: null }),
        supabase
          .from('college_tutor_observations')
          .select('tutor_staff_id, observed_at')
          .in('tutor_staff_id', tutorIds)
          .gte('observed_at', ninetyAgo)
          .order('observed_at', { ascending: false }),
        // Portfolio comments authored by these tutors in last 7 days
        tutorUserIds.length > 0
          ? supabase
              .from('portfolio_comments')
              .select('user_id, created_at')
              .in('user_id', tutorUserIds)
              .gte('created_at', sevenAgo)
          : Promise.resolve({ data: [] as any[], error: null }),
      ]);

      // Pending grading per tutor — need to resolve attempts on their quizzes
      const quizCreatorByQuizId = new Map<string, string>(); // quiz_id → creator user_id
      for (const q of ((quizzesRes.data ?? []) as Array<any>)) {
        if (q.creator_id) quizCreatorByQuizId.set(q.id, q.creator_id);
      }
      const quizIds = Array.from(quizCreatorByQuizId.keys());
      const pendingByCreator = new Map<string, number>();
      if (quizIds.length > 0) {
        const { data: attempts } = await supabase
          .from('tutor_quiz_attempts')
          .select('quiz_id, submitted_at')
          .in('quiz_id', quizIds)
          .not('submitted_at', 'is', null);
        // Count "pending" loosely as submitted but no recent override — the
        // exact "awaiting_review" status lives in tutor_quiz_answer_grades,
        // but at this rollup level a count of submitted attempts in 30 days
        // is the right "marking weight" signal.
        const thirtyAgo = new Date(Date.now() - 30 * 86_400_000).toISOString();
        for (const a of ((attempts ?? []) as Array<any>)) {
          if (!a.submitted_at || a.submitted_at < thirtyAgo) continue;
          const creator = quizCreatorByQuizId.get(a.quiz_id);
          if (!creator) continue;
          pendingByCreator.set(creator, (pendingByCreator.get(creator) ?? 0) + 1);
        }
      }

      // Cohort counts by tutor staff id
      const cohortCount = new Map<string, number>();
      for (const c of ((cohortsRes.data ?? []) as Array<any>)) {
        if (c.tutor_id) {
          cohortCount.set(c.tutor_id, (cohortCount.get(c.tutor_id) ?? 0) + 1);
        }
      }

      // Lesson counts by tutor staff id
      const lessonCount = new Map<string, number>();
      for (const l of ((lessonsRes.data ?? []) as Array<any>)) {
        if (l.tutor_id) {
          lessonCount.set(l.tutor_id, (lessonCount.get(l.tutor_id) ?? 0) + 1);
        }
      }

      // Most-recent observation per tutor
      const lastObsByTutor = new Map<string, string>();
      for (const o of ((obsRes.data ?? []) as Array<any>)) {
        if (!lastObsByTutor.has(o.tutor_staff_id)) {
          lastObsByTutor.set(o.tutor_staff_id, o.observed_at);
        }
      }

      // Comments-authored by tutor user_id
      const commentsByUser = new Map<string, number>();
      for (const c of ((commentsRes.data ?? []) as Array<any>)) {
        commentsByUser.set(c.user_id, (commentsByUser.get(c.user_id) ?? 0) + 1);
      }

      const out: TutorWorkloadRow[] = activeTutors.map((t) => {
        const cohorts = cohortCount.get(t.id) ?? 0;
        const pending = t.user_id ? (pendingByCreator.get(t.user_id) ?? 0) : 0;
        const lastObs = lastObsByTutor.get(t.id);
        const lastObsDays = lastObs
          ? Math.floor(
              (Date.now() - new Date(lastObs).getTime()) / 86_400_000
            )
          : null;
        const comments = t.user_id ? (commentsByUser.get(t.user_id) ?? 0) : 0;
        return {
          tutor_staff_id: t.id,
          user_id: t.user_id,
          name: t.name,
          role: t.role,
          active_cohorts: cohorts,
          lessons_this_week: lessonCount.get(t.id) ?? 0,
          pending_grading: pending,
          last_observed_days_ago: lastObsDays,
          comments_last_7d: comments,
          load_band: bandFor(cohorts, pending),
        };
      });

      // Heaviest band first so HoD sees red rows at the top
      const order: Record<WorkloadBand, number> = { red: 0, amber: 1, green: 2 };
      out.sort((a, b) => order[a.load_band] - order[b.load_band]);
      setRows(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return { rows, loading, error, refetch: fetch };
}
