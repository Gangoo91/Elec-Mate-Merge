import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useTutorToday — single aggregator powering the Tutor Today home (M2).
   One Promise.all across ~7 surfaces so the morning view loads in one round
   trip. RLS scopes every query to the caller's college / assignments.

   Returned shape is deliberately flat — the page renders editorial sections
   off this. Counters at the top let the hero strip render before the heavier
   lists come back.

   ELE-939 / [M2] — Tutor "Today" home, the morning landing.
   ========================================================================== */

export interface TutorTodayCore {
  staff_id: string | null;
  staff_name: string | null;
  college_id: string | null;
  user_id: string;
}

export interface TodayLesson {
  id: string;
  title: string;
  cohort_id: string | null;
  cohort_name: string | null;
  scheduled_start_time: string | null;
  duration_minutes: number | null;
  status: string | null;
  is_mine: boolean;
}

export interface TodayPortfolioComment {
  id: string;
  student_user_id: string;
  student_name: string | null;
  cohort_name: string | null;
  content: string;
  author_role: string | null;
  created_at: string;
}

export interface TodayOtjPending {
  id: string;
  student_user_id: string;
  student_name: string | null;
  cohort_name: string | null;
  title: string;
  activity_date: string;
  duration_minutes: number | null;
  created_at: string | null;
}

export interface TodayIqaPending {
  id: string;
  sampling_plan_id: string;
  target_kind: 'observation' | 'otj';
  target_title: string;
  sampled_at: string;
  iqa_name_snapshot: string | null;
}

export interface TodayAtRiskLearner {
  student_id: string;
  student_name: string;
  cohort_name: string | null;
  level: 'medium' | 'high' | 'critical';
  score: number;
  top_factor: string | null;
  /** Top few risk reasons (severity-sorted), for a fuller at-a-glance picture. */
  top_factors: string[];
}

export interface TodayUpcomingDate {
  kind: 'lesson' | 'observation_due' | 'iqa_action' | 'epa_brief';
  date: string; // ISO yyyy-mm-dd
  title: string;
  href: string;
}

export interface TutorTodayData {
  core: TutorTodayCore;
  lessons: TodayLesson[];
  comments: TodayPortfolioComment[];
  otj: TodayOtjPending[];
  iqa: TodayIqaPending[];
  atRisk: TodayAtRiskLearner[];
  thisWeek: TodayUpcomingDate[];
  generated_at: string;
  /** Pre-computed counters so the hero strip never waits on the heavy lists. */
  counts: {
    lessons_today: number;
    comments_action_required: number;
    otj_awaiting: number;
    iqa_awaiting: number;
    at_risk: number;
  };
}

const dayMs = 86_400_000;

function todayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function isoOffset(days: number): string {
  return new Date(Date.now() + days * dayMs).toISOString().slice(0, 10);
}

export function useTutorToday() {
  const [data, setData] = useState<TutorTodayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes?.user?.id;
      if (!userId) throw new Error('Not signed in');

      // Resolve staff record + college in one shot
      const { data: staffRow } = await supabase
        .from('college_staff')
        .select('id, name, college_id')
        .eq('user_id', userId)
        .is('archived_at', null)
        .maybeSingle();
      const staffId = (staffRow as { id?: string } | null)?.id ?? null;
      const staffName = (staffRow as { name?: string } | null)?.name ?? null;
      const collegeId = (staffRow as { college_id?: string } | null)?.college_id ?? null;

      if (!collegeId) {
        // Not yet linked — return an empty Today rather than erroring.
        setData({
          core: { staff_id: staffId, staff_name: staffName, college_id: null, user_id: userId },
          lessons: [],
          comments: [],
          otj: [],
          iqa: [],
          atRisk: [],
          thisWeek: [],
          generated_at: new Date().toISOString(),
          counts: {
            lessons_today: 0,
            comments_action_required: 0,
            otj_awaiting: 0,
            iqa_awaiting: 0,
            at_risk: 0,
          },
        });
        setLoading(false);
        return;
      }

      const today = todayDate();
      const weekAhead = isoOffset(7);

      // Cohorts in this college (used to scope lessons + cohort-name lookup)
      const { data: cohortRows } = await supabase
        .from('college_cohorts')
        .select('id, name')
        .eq('college_id', collegeId);
      const cohorts = (cohortRows ?? []) as Array<{ id: string; name: string }>;
      const cohortById = new Map(cohorts.map((c) => [c.id, c.name]));
      const cohortIds = cohorts.map((c) => c.id);

      // Students in this college (for resolving names + scoping)
      const { data: studentRows } = await supabase
        .from('college_students')
        .select('id, name, user_id, cohort_id')
        .eq('college_id', collegeId);
      const students = (studentRows ?? []) as Array<{
        id: string;
        name: string;
        user_id: string | null;
        cohort_id: string | null;
      }>;
      const studentIds = students.map((s) => s.id);
      const studentByAuthUid = new Map(
        students.filter((s) => s.user_id).map((s) => [s.user_id as string, s])
      );
      // Auth uids of this college's learners — used to scope the comment +
      // OTJ queues to OUR college BEFORE the row limit. Filtering after a
      // global limit(30) silently drops our items past the window on a busy
      // multi-college instance, so the `.in(...)` has to run server-side.
      const studentAuthUids = students.map((s) => s.user_id).filter((u): u is string => Boolean(u));

      // IQA plans for this college (for scoping pending samples)
      const { data: planRows } = await supabase
        .from('college_iqa_sampling')
        .select('id, iqa_name_snapshot')
        .eq('college_id', collegeId);
      const planById = new Map(
        ((planRows ?? []) as Array<{ id: string; iqa_name_snapshot: string | null }>).map((p) => [
          p.id,
          p.iqa_name_snapshot,
        ])
      );
      const planIds = Array.from(planById.keys());

      // ─── Fan-out: load each section in parallel ──────────────────
      const [
        lessonsToday,
        lessonsThisWeek,
        commentsRes,
        otjRes,
        iqaSamplesRes,
        riskRes,
        observationsFollowUpRes,
      ] = await Promise.all([
        // Today's lessons across the college (mark `is_mine` if tutor matches)
        cohortIds.length > 0
          ? supabase
              .from('college_lesson_plans')
              .select(
                'id, title, cohort_id, scheduled_start_time, duration_minutes, status, tutor_id'
              )
              .in('cohort_id', cohortIds)
              .eq('scheduled_date', today)
              .order('scheduled_start_time', { ascending: true, nullsFirst: false })
          : Promise.resolve({ data: [] }),
        // Lessons in the next 7 days for "this week" rail
        cohortIds.length > 0
          ? supabase
              .from('college_lesson_plans')
              .select('id, title, scheduled_date, scheduled_start_time')
              .in('cohort_id', cohortIds)
              .gt('scheduled_date', today)
              .lte('scheduled_date', weekAhead)
              .order('scheduled_date', { ascending: true })
              .limit(8)
          : Promise.resolve({ data: [] }),
        // Action-required portfolio comments not yet resolved, scoped to
        // this college's students server-side. Most recent first.
        studentAuthUids.length > 0
          ? supabase
              .from('portfolio_comments')
              .select('id, user_id, content, author_role, created_at')
              .in('user_id', studentAuthUids)
              .eq('requires_action', true)
              .eq('is_resolved', false)
              .order('created_at', { ascending: false })
              .limit(30)
          : Promise.resolve({ data: [] }),
        // Pending OTJ verifications across the college's students
        studentAuthUids.length > 0
          ? supabase
              .from('college_otj_entries')
              .select('id, student_id, title, activity_date, duration_minutes, created_at')
              .in('student_id', studentAuthUids)
              .eq('verification_status', 'pending')
              .order('activity_date', { ascending: false })
              .limit(30)
          : Promise.resolve({ data: [] }),
        // Pending IQA samples (verdict='pending') under our college's plans
        planIds.length > 0
          ? supabase
              .from('college_iqa_samples')
              .select(
                'id, sampling_plan_id, observation_id, observation_title_snapshot, otj_id, otj_title_snapshot, sampled_at'
              )
              .in('sampling_plan_id', planIds)
              .eq('verdict', 'pending')
              .order('sampled_at', { ascending: false })
              .limit(20)
          : Promise.resolve({ data: [] }),
        // Current risk scores for our students (high+critical only — the
        // tutor cares about who needs attention right now)
        studentIds.length > 0
          ? supabase
              .from('student_risk_scores')
              .select('student_id, level, score, factors')
              .in('student_id', studentIds)
              .eq('is_current', true)
              .in('level', ['high', 'critical'])
              .order('score', { ascending: false })
              .limit(10)
          : Promise.resolve({ data: [] }),
        // Observations with a follow-up due in the next 7 days — surfaces
        // assessor + IQA action chains that need closing this week.
        studentIds.length > 0
          ? supabase
              .from('college_observations')
              .select(
                'id, follow_up_date, activity_title, student_name_snapshot, college_student_id'
              )
              .in('college_student_id', studentIds)
              .eq('follow_up_required', true)
              .gte('follow_up_date', today)
              .lte('follow_up_date', weekAhead)
              .order('follow_up_date', { ascending: true })
              .limit(8)
          : Promise.resolve({ data: [] }),
      ]);

      // ─── Lessons today ───────────────────────────────────────────
      // ID-mapping note: `college_lesson_plans.tutor_id` references
      // `college_staff.id`, not `auth.uid`.  Compare against `staffId`,
      // not `userId`, or `is_mine` is always false (silent UX miss).
      const lessons: TodayLesson[] = (
        (lessonsToday.data ?? []) as Array<{
          id: string;
          title: string;
          cohort_id: string | null;
          scheduled_start_time: string | null;
          duration_minutes: number | null;
          status: string | null;
          tutor_id: string | null;
        }>
      ).map((l) => ({
        id: l.id,
        title: l.title,
        cohort_id: l.cohort_id,
        cohort_name: l.cohort_id ? (cohortById.get(l.cohort_id) ?? null) : null,
        scheduled_start_time: l.scheduled_start_time,
        duration_minutes: l.duration_minutes,
        status: l.status,
        is_mine: Boolean(staffId && l.tutor_id === staffId),
      }));

      // ─── Action-required portfolio comments ──────────────────────
      const allComments = (commentsRes.data ?? []) as Array<{
        id: string;
        user_id: string;
        content: string;
        author_role: string | null;
        created_at: string;
      }>;
      const comments: TodayPortfolioComment[] = allComments
        .map((c) => {
          const student = studentByAuthUid.get(c.user_id);
          if (!student) return null; // out-of-college
          return {
            id: c.id,
            student_user_id: c.user_id,
            student_name: student.name,
            cohort_name: student.cohort_id ? (cohortById.get(student.cohort_id) ?? null) : null,
            content: c.content,
            author_role: c.author_role,
            created_at: c.created_at,
          };
        })
        .filter((c): c is TodayPortfolioComment => c !== null)
        .slice(0, 8);

      // ─── OTJ awaiting verification ───────────────────────────────
      const allOtj = (otjRes.data ?? []) as Array<{
        id: string;
        student_id: string;
        title: string;
        activity_date: string;
        duration_minutes: number | null;
        created_at: string | null;
      }>;
      const otj: TodayOtjPending[] = allOtj
        .map((o) => {
          const student = studentByAuthUid.get(o.student_id);
          if (!student) return null;
          return {
            id: o.id,
            student_user_id: o.student_id,
            student_name: student.name,
            cohort_name: student.cohort_id ? (cohortById.get(student.cohort_id) ?? null) : null,
            title: o.title,
            activity_date: o.activity_date,
            duration_minutes: o.duration_minutes,
            created_at: o.created_at,
          };
        })
        .filter((o): o is TodayOtjPending => o !== null)
        .slice(0, 8);

      // ─── IQA pending verdicts ────────────────────────────────────
      const iqa: TodayIqaPending[] = (
        (iqaSamplesRes.data ?? []) as Array<{
          id: string;
          sampling_plan_id: string;
          observation_id: string | null;
          observation_title_snapshot: string | null;
          otj_id: string | null;
          otj_title_snapshot: string | null;
          sampled_at: string;
        }>
      )
        .map((s) => ({
          id: s.id,
          sampling_plan_id: s.sampling_plan_id,
          target_kind: (s.otj_id ? 'otj' : 'observation') as 'otj' | 'observation',
          target_title: s.otj_id
            ? (s.otj_title_snapshot ?? 'OTJ entry')
            : (s.observation_title_snapshot ?? 'Observation'),
          sampled_at: s.sampled_at,
          iqa_name_snapshot: planById.get(s.sampling_plan_id) ?? null,
        }))
        .slice(0, 6);

      // ─── At-risk learners ────────────────────────────────────────
      const atRisk: TodayAtRiskLearner[] = (
        (riskRes.data ?? []) as Array<{
          student_id: string;
          level: 'medium' | 'high' | 'critical';
          score: number;
          factors: unknown;
        }>
      )
        .map((r) => {
          const student = students.find((s) => s.id === r.student_id);
          if (!student) return null;
          // factors is jsonb — array of {label,key,severity} (current) or a
          // legacy {reasons:[]} shape. Surface the top few (already severity-
          // sorted by the risk engine) so the tutor sees the whole picture —
          // e.g. "Low attendance · No OTJ · EPA blocked" — not just one reason.
          let topFactors: string[] = [];
          if (Array.isArray(r.factors)) {
            topFactors = (r.factors as Array<{ label?: string; key?: string }>)
              .map((f) => f.label ?? f.key)
              .filter((x): x is string => !!x)
              .slice(0, 3);
          } else if (
            r.factors &&
            typeof r.factors === 'object' &&
            'reasons' in (r.factors as Record<string, unknown>)
          ) {
            const reasons = (r.factors as { reasons?: string[] }).reasons;
            if (Array.isArray(reasons)) topFactors = reasons.slice(0, 3);
          }
          return {
            student_id: r.student_id,
            student_name: student.name,
            cohort_name: student.cohort_id ? (cohortById.get(student.cohort_id) ?? null) : null,
            level: r.level,
            score: r.score,
            top_factor: topFactors[0] ?? null,
            top_factors: topFactors,
          };
        })
        .filter((r): r is TodayAtRiskLearner => r !== null)
        .slice(0, 6);

      // ─── This week — upcoming lessons + observation follow-ups ──
      // Observation follow-ups surface assessor / IQA action chains the
      // tutor needs to close this week. Merged with upcoming lessons and
      // sorted by date so the section reads as one chronological list.
      const lessonRows: TodayUpcomingDate[] = (
        (lessonsThisWeek.data ?? []) as Array<{
          id: string;
          title: string;
          scheduled_date: string;
          scheduled_start_time: string | null;
        }>
      ).map((l) => ({
        kind: 'lesson',
        date: l.scheduled_date,
        title: l.scheduled_start_time
          ? `${l.title} · ${l.scheduled_start_time.slice(0, 5)}`
          : l.title,
        href: `/college/lesson-plans/${l.id}`,
      }));

      const followUpRows: TodayUpcomingDate[] = (
        (observationsFollowUpRes.data ?? []) as Array<{
          id: string;
          follow_up_date: string;
          activity_title: string | null;
          student_name_snapshot: string | null;
          college_student_id: string;
        }>
      ).map((o) => ({
        kind: 'observation_due',
        date: o.follow_up_date,
        title: `Follow-up · ${o.activity_title ?? 'Observation'}${
          o.student_name_snapshot ? ` (${o.student_name_snapshot})` : ''
        }`,
        href: `/college/students/${o.college_student_id}#observations`,
      }));

      const thisWeek: TodayUpcomingDate[] = [...lessonRows, ...followUpRows]
        .sort((a, b) => (a.date < b.date ? -1 : 1))
        .slice(0, 12);

      setData({
        core: { staff_id: staffId, staff_name: staffName, college_id: collegeId, user_id: userId },
        lessons,
        comments,
        otj,
        iqa,
        atRisk,
        thisWeek,
        generated_at: new Date().toISOString(),
        counts: {
          lessons_today: lessons.length,
          comments_action_required: allComments.length,
          otj_awaiting: allOtj.length,
          iqa_awaiting: ((iqaSamplesRes.data ?? []) as unknown[]).length,
          at_risk: atRisk.length,
        },
      });
    } catch (e) {
      setError((e as Error).message ?? 'Could not load today');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refresh: fetch };
}
