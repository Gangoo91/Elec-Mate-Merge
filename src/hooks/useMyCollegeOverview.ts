import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useMyIlp } from '@/hooks/useMyIlp';
import { useMyAssignedQuizzes } from '@/hooks/useMyAssignedQuizzes';

/* ==========================================================================
   useMyCollegeOverview — apprentice-side aggregator that powers the hero,
   headline strip, and "action required" surface on the college hub.

   Composition over re-querying: leans on the existing working hooks
   (useMyIlp, useMyAssignedQuizzes) for ILP + quiz state, and only does its
   own pulls for OTJ + portfolio (where there's no shared hook yet).

   EPA verdict pill is intentionally absent here — apprentice has no SELECT
   policy on epa_judgements yet. Can be added back once that path is opened
   or once we surface the apprentice's self-judgement instead.
   ========================================================================== */

export interface CollegeOverviewStat {
  /** The one off-the-job figure (get_otj_summary): verified + measured app learning. */
  counted_otj_hours: number | null;
  required_otj_hours: number | null;
  verified_otj_minutes: number;
  pending_otj_minutes: number;
  rejected_otj_minutes: number;
  total_goals: number;
  open_goals: number;
  overdue_goals: number;
  blocked_goals: number;
  unread_tutor_comments: number;
  pending_quizzes: number;
  overdue_quizzes: number;
  unactioned_portfolio_comments: number;
  /** % of marked sessions attended (Present + Late). null = no register yet. */
  attendance_rate: number | null;
  attendance_sessions: number;
}

export type ActionRequiredKind =
  | 'otj_rejected'
  | 'quiz_overdue'
  | 'goal_blocked'
  | 'tutor_comment_unread'
  | 'portfolio_action'
  | 'attendance_low'
  // Next steps, not problems: a learner with nothing wrong still needs to
  // know what to do today.
  | 'goal_new'
  | 'quiz_due'
  | 'message_unread'
  | 'lesson_soon';

export interface ActionRequiredItem {
  kind: ActionRequiredKind;
  title: string;
  detail: string | null;
  href: string;
}

export interface MyCollegeOverview {
  loading: boolean;
  hasCollegeLink: boolean;
  studentName: string | null;
  courseName: string | null;
  stats: CollegeOverviewStat;
  actionRequired: ActionRequiredItem[];
  refresh: () => Promise<void>;
}

const ZERO_STATS: CollegeOverviewStat = {
  counted_otj_hours: null,
  required_otj_hours: null,
  verified_otj_minutes: 0,
  pending_otj_minutes: 0,
  rejected_otj_minutes: 0,
  total_goals: 0,
  open_goals: 0,
  overdue_goals: 0,
  blocked_goals: 0,
  unread_tutor_comments: 0,
  pending_quizzes: 0,
  overdue_quizzes: 0,
  unactioned_portfolio_comments: 0,
  attendance_rate: null,
  attendance_sessions: 0,
};

export function useMyCollegeOverview(): MyCollegeOverview {
  const { user } = useAuth();

  // Lean on the canonical hooks for ILP + quizzes — they already handle
  // RLS-safe queries, college_students.id resolution, and realtime.
  const ilpHook = useMyIlp();
  const quizHook = useMyAssignedQuizzes();

  const [identityLoading, setIdentityLoading] = useState(true);
  const [hasCollegeLink, setHasCollegeLink] = useState(false);
  const [studentName, setStudentName] = useState<string | null>(null);
  const [courseName, setCourseName] = useState<string | null>(null);

  // OTJ + portfolio counters live here — small parallel pull.
  const [otjMinutes, setOtjMinutes] = useState({ verified: 0, pending: 0, rejected: 0 });
  const [otjFigure, setOtjFigure] = useState<{ counted: number | null; required: number | null }>({
    counted: null,
    required: null,
  });
  const [otjActions, setOtjActions] = useState<ActionRequiredItem[]>([]);
  const [unactionedPortfolioComments, setUnactionedPortfolioComments] = useState(0);
  const [portfolioActions, setPortfolioActions] = useState<ActionRequiredItem[]>([]);
  const [attendance, setAttendance] = useState<{ rate: number | null; sessions: number }>({
    rate: null,
    sessions: 0,
  });
  const [attendanceActions, setAttendanceActions] = useState<ActionRequiredItem[]>([]);
  const [nextStepActions, setNextStepActions] = useState<ActionRequiredItem[]>([]);

  const load = useCallback(async () => {
    if (!user) {
      setIdentityLoading(false);
      return;
    }
    setIdentityLoading(true);
    const uid = user.id;

    // 1. Identity (course name only — for the hero)
    const csRes = await supabase
      .from('college_students')
      .select('id, name, cohort_id, course:college_courses(name)')
      .eq('user_id', uid)
      .maybeSingle();

    const cs = csRes.data as {
      id: string;
      name: string | null;
      cohort_id: string | null;
      course: { name: string | null } | null;
    } | null;
    setHasCollegeLink(Boolean(cs));
    setStudentName(cs?.name ?? null);
    setCourseName(cs?.course?.name ?? null);

    // Attendance — keyed on college_students.id (not the auth uid). RLS already
    // lets the learner read their own register (cs.user_id = auth.uid()).
    if (cs?.id) {
      const attRes = await supabase
        .from('college_attendance')
        .select('status')
        .eq('student_id', cs.id);
      const rows = (attRes.data ?? []) as Array<{ status: string }>;
      const sessions = rows.length;
      const attended = rows.filter((r) => r.status === 'Present' || r.status === 'Late').length;
      const rate = sessions > 0 ? Math.round((attended / sessions) * 100) : null;
      setAttendance({ rate, sessions });

      // Early warning only once there's enough signal to be meaningful, so a
      // learner with one missed session isn't alarmed.
      const lowAttendance: ActionRequiredItem[] = [];
      if (rate !== null && rate < 85 && sessions >= 4) {
        lowAttendance.push({
          kind: 'attendance_low',
          title: `Attendance is ${rate}%`,
          detail: 'Below the usual target — if something is getting in the way, tell your tutor early.',
          href: '/apprentice/college/today',
        });
      }
      setAttendanceActions(lowAttendance);
    } else {
      setAttendance({ rate: null, sessions: 0 });
      setAttendanceActions([]);
    }

    // Next steps that are not problems: an unread tutor message and the next
    // class this week. (New goals and quizzes due come from the ILP/quiz hooks.)
    if (cs?.id) {
      const todayYmd = new Date().toISOString().slice(0, 10);
      const weekYmd = new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10);
      const [threadsRes, lessonRes] = await Promise.all([
        supabase
          .from('student_message_threads')
          .select('id, unread_count_student')
          .eq('student_id', cs.id)
          .gt('unread_count_student', 0),
        cs.cohort_id
          ? supabase
              .from('college_lesson_plans')
              .select('id, title, scheduled_date, scheduled_start_time, scheduled_room')
              .eq('cohort_id', cs.cohort_id)
              .gte('scheduled_date', todayYmd)
              .lte('scheduled_date', weekYmd)
              .neq('status', 'draft')
              .order('scheduled_date', { ascending: true })
              .order('scheduled_start_time', { ascending: true, nullsFirst: false })
              .limit(1)
          : Promise.resolve({ data: [], error: null }),
      ]);
      const steps: ActionRequiredItem[] = [];
      const unread = ((threadsRes.data ?? []) as Array<{ unread_count_student: number | null }>)
        .reduce((n, t) => n + (t.unread_count_student ?? 0), 0);
      if (unread > 0) {
        steps.push({
          kind: 'message_unread',
          title: unread === 1 ? 'Your tutor has replied' : `${unread} new messages from your tutor`,
          detail: 'Read and reply in Plan & messages.',
          href: '/apprentice/college/plan',
        });
      }
      const lesson = ((lessonRes.data ?? []) as Array<{
        id: string;
        title: string;
        scheduled_date: string;
        scheduled_start_time: string | null;
        scheduled_room: string | null;
      }>)[0];
      if (lesson) {
        const [y, m, d] = lesson.scheduled_date.split('-').map(Number);
        const when = new Date(y, (m ?? 1) - 1, d ?? 1);
        const isToday = lesson.scheduled_date === todayYmd;
        const day = isToday
          ? 'Today'
          : when.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });
        steps.push({
          kind: 'lesson_soon',
          title: `${isToday ? 'Class today' : 'Next class'}: ${lesson.title}`,
          detail: [day, lesson.scheduled_start_time?.slice(0, 5), lesson.scheduled_room]
            .filter(Boolean)
            .join(' · '),
          href: '/apprentice/college/today',
        });
      }
      setNextStepActions(steps);
    } else {
      setNextStepActions([]);
    }

    // 2. OTJ + portfolio comments — both keyed on user_id (auth uid).
    const [otjRes, portfolioRes] = await Promise.all([
      supabase
        .from('college_otj_entries')
        .select('id, title, duration_minutes, verification_status, verification_rationale, source_kind')
        .eq('student_id', uid)
        .order('activity_date', { ascending: false })
        .limit(80),
      // portfolio_comments has no read_at — use requires_action + is_resolved
      // (the canonical "needs the apprentice's attention" pair).
      supabase
        .from('portfolio_comments')
        .select('id, content, requires_action, is_resolved, action_owner, created_at')
        .eq('action_owner', uid)
        .eq('requires_action', true)
        .eq('is_resolved', false)
        .order('created_at', { ascending: false })
        .limit(20),
    ]);

    // OTJ aggregations + rejected → action items
    let verifiedMin = 0;
    let pendingMin = 0;
    let rejectedMin = 0;
    const newOtjActions: ActionRequiredItem[] = [];
    if (!otjRes.error && otjRes.data) {
      for (const row of otjRes.data as Array<{
        id: string;
        duration_minutes: number | null;
        verification_status: string;
        verification_rationale: string | null;
        title: string;
        source_kind: string | null;
      }>) {
        const m = row.duration_minutes ?? 0;
        // App learning a tutor left out is their decision, not something the
        // apprentice can fix and resend: it is shown on the hours page with
        // the reason, never as a "returned to you" action.
        if (row.source_kind === 'in_app' && row.verification_status === 'rejected') continue;
        if (
          row.verification_status === 'verified' ||
          row.verification_status === 'verified_by_employer'
        ) {
          verifiedMin += m;
        } else if (row.verification_status === 'pending') {
          pendingMin += m;
        } else if (row.verification_status === 'rejected') {
          rejectedMin += m;
          if (newOtjActions.length < 2) {
            newOtjActions.push({
              kind: 'otj_rejected',
              title: `Returned: ${row.title}`,
              detail:
                row.verification_rationale?.slice(0, 140) ??
                'Tutor needs more detail before signing this off.',
              href: '/apprentice/college/activities',
            });
          }
        }
      }
    }
    setOtjMinutes({ verified: verifiedMin, pending: pendingMin, rejected: rejectedMin });
    const { data: otjSummary } = await supabase.rpc('get_otj_summary' as never);
    const os = otjSummary as { counted_hours?: number; required_hours?: number | null } | null;
    setOtjFigure({ counted: os?.counted_hours ?? null, required: os?.required_hours ?? null });
    setOtjActions(newOtjActions);

    // Portfolio comments → action items
    const newPortfolioActions: ActionRequiredItem[] = [];
    if (!portfolioRes.error && portfolioRes.data) {
      const rows = portfolioRes.data as Array<{ id: string; content: string }>;
      setUnactionedPortfolioComments(rows.length);
      for (const c of rows.slice(0, 2)) {
        newPortfolioActions.push({
          kind: 'portfolio_action',
          title: 'Tutor needs your response',
          detail: c.content?.slice(0, 140) ?? null,
          // The college activity feed, where the comment itself is listed.
          // `/apprentice/hub?section=tutor` was a dead query — the hub reads
          // `?tab=`, and had no "tutor" tab anyway.
          href: '/apprentice/college/activity',
        });
      }
    } else {
      setUnactionedPortfolioComments(0);
    }
    setPortfolioActions(newPortfolioActions);

    setIdentityLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  // Derive ILP + quiz aggregates from the canonical hooks.
  const ilpAgg = useMemo(() => {
    const goals = ilpHook.goals ?? [];
    const todayIso = new Date().toISOString().slice(0, 10);
    let total = 0;
    let open = 0;
    let overdue = 0;
    let blocked = 0;
    const blockedActions: ActionRequiredItem[] = [];
    const unreadActions: ActionRequiredItem[] = [];
    const newGoalActions: ActionRequiredItem[] = [];
    for (const g of goals) {
      total += 1;
      const isClosed = g.status === 'completed' || g.status === 'cancelled';
      if (!isClosed && !g.student_acknowledged && newGoalActions.length < 2) {
        newGoalActions.push({
          kind: 'goal_new',
          title: `New goal from your tutor: ${g.title}`,
          detail: g.target_date
            ? `Acknowledge it, and say how you'll get there · due ${new Date(g.target_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
            : 'Acknowledge it, and say how you\'ll get there.',
          href: '/apprentice/college/plan',
        });
      }
      if (!isClosed) open += 1;
      if (!isClosed && g.target_date && g.target_date < todayIso) overdue += 1;
      if (g.status === 'blocked') {
        blocked += 1;
        if (blockedActions.length < 2) {
          blockedActions.push({
            kind: 'goal_blocked',
            title: `Blocked: ${g.title}`,
            detail: "Reply to your tutor with what's in the way.",
            href: '/apprentice/college/plan',
          });
        }
      }
      const hasUnreadTutorComment =
        g.tutor_comment_at &&
        (!g.student_acknowledged_at || g.student_acknowledged_at < g.tutor_comment_at);
      if (hasUnreadTutorComment && unreadActions.length < 3) {
        unreadActions.push({
          kind: 'tutor_comment_unread',
          title: `New tutor comment: ${g.title}`,
          detail: 'Read and acknowledge to keep your plan up to date.',
          href: '/apprentice/college/plan',
        });
      }
    }
    return {
      total,
      open,
      overdue,
      blocked,
      unread: ilpHook.rollUp.unread_tutor_comments,
      blockedActions,
      unreadActions,
      newGoalActions,
    };
  }, [ilpHook.goals, ilpHook.rollUp.unread_tutor_comments]);

  const quizAgg = useMemo(() => {
    const quizzes = quizHook.quizzes ?? [];
    let pending = 0;
    let overdue = 0;
    const overdueActions: ActionRequiredItem[] = [];
    const dueActions: ActionRequiredItem[] = [];
    for (const q of quizzes) {
      if ((q.status === 'not_started' || q.status === 'in_progress') && dueActions.length < 1) {
        dueActions.push({
          kind: 'quiz_due',
          title: `${q.status === 'in_progress' ? 'Finish' : 'Take'} the quiz: ${q.title}`,
          detail: q.due_date
            ? `Due ${new Date(q.due_date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })} · set by your tutor`
            : 'Set by your tutor',
          href: `/apprentice/college/quiz/${q.id}`,
        });
      }
      if (q.status === 'overdue') {
        overdue += 1;
        if (overdueActions.length < 2) {
          overdueActions.push({
            kind: 'quiz_overdue',
            title: `Overdue: ${q.title}`,
            detail: q.due_date
              ? `Was due ${new Date(q.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
              : null,
            href: '/apprentice/college/activities',
          });
        }
      }
      if (q.status === 'not_started' || q.status === 'in_progress' || q.status === 'overdue') {
        pending += 1;
      }
    }
    return { pending, overdue, overdueActions, dueActions };
  }, [quizHook.quizzes]);

  const stats: CollegeOverviewStat = useMemo(
    () => ({
      counted_otj_hours: otjFigure.counted,
      required_otj_hours: otjFigure.required,
      verified_otj_minutes: otjMinutes.verified,
      pending_otj_minutes: otjMinutes.pending,
      rejected_otj_minutes: otjMinutes.rejected,
      total_goals: ilpAgg.total,
      open_goals: ilpAgg.open,
      overdue_goals: ilpAgg.overdue,
      blocked_goals: ilpAgg.blocked,
      unread_tutor_comments: ilpAgg.unread,
      pending_quizzes: quizAgg.pending,
      overdue_quizzes: quizAgg.overdue,
      unactioned_portfolio_comments: unactionedPortfolioComments,
      attendance_rate: attendance.rate,
      attendance_sessions: attendance.sessions,
    }),
    [otjMinutes, otjFigure, ilpAgg, quizAgg, unactionedPortfolioComments, attendance]
  );

  const actionRequired: ActionRequiredItem[] = useMemo(
    () =>
      [
        ...otjActions,
        ...quizAgg.overdueActions,
        ...attendanceActions,
        ...portfolioActions,
        ...ilpAgg.blockedActions,
        ...ilpAgg.unreadActions,
        // Then the plain next steps.
        ...nextStepActions.filter((a) => a.kind === 'message_unread'),
        ...ilpAgg.newGoalActions,
        ...quizAgg.dueActions,
        ...nextStepActions.filter((a) => a.kind === 'lesson_soon'),
      ].slice(0, 6),
    [
      otjActions,
      quizAgg.overdueActions,
      quizAgg.dueActions,
      attendanceActions,
      portfolioActions,
      ilpAgg.blockedActions,
      ilpAgg.unreadActions,
      ilpAgg.newGoalActions,
      nextStepActions,
    ]
  );

  const loading = identityLoading || ilpHook.loading || quizHook.loading;

  return useMemo(
    () => ({
      loading,
      hasCollegeLink: hasCollegeLink || ilpHook.hasCollegeLink,
      studentName,
      courseName,
      stats,
      actionRequired,
      refresh: load,
    }),
    [
      loading,
      hasCollegeLink,
      ilpHook.hasCollegeLink,
      studentName,
      courseName,
      stats,
      actionRequired,
      load,
    ]
  );
}
