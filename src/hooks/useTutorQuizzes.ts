import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useTutorQuizzes — tutor view of all the quizzes / assessments / mock exams
   they've created. Each row carries a per-quiz attempt summary so the tutor
   can see "10 assigned, 3 completed, 1 overdue, avg 67%" at a glance.
   ========================================================================== */

export type TutorQuizKind = 'quiz' | 'assessment' | 'mock_exam';

export interface TutorQuizListItem {
  id: string;
  title: string;
  description: string | null;
  topic: string | null;
  kind: TutorQuizKind;
  difficulty: string | null;
  is_published: boolean;
  is_homework: boolean;
  due_date: string | null;
  pass_mark: number | null;
  time_limit_minutes: number | null;
  qualification_code: string | null;
  source: string | null;
  source_document_id: string | null;
  cohort_id: string | null;
  cohort_name: string | null;
  assigned_student_ids: string[];
  created_at: string | null;
  published_at: string | null;
  /** Who set it; `mine` is true when that is the signed-in tutor. */
  creator_id: string | null;
  mine: boolean;
  questions_count: number;
  // Per-quiz attempt summary
  assigned_count: number;
  completed_count: number;
  in_progress_count: number;
  overdue_count: number;
  avg_percentage: number | null;
  pass_rate_percent: number | null;
  pending_ai_grade_count: number;
}

interface QuizRow {
  id: string;
  title: string;
  description: string | null;
  topic: string | null;
  kind: string | null;
  difficulty: string | null;
  is_published: boolean;
  is_homework: boolean;
  due_date: string | null;
  pass_mark: number | null;
  time_limit_minutes: number | null;
  qualification_code: string | null;
  source: string | null;
  source_document_id: string | null;
  cohort_id: string | null;
  assigned_student_ids: string[] | null;
  created_at: string | null;
  published_at: string | null;
  creator_id: string | null;
}

/** 'mine' = quizzes you set (the default). 'college' = every quiz set at your
 *  college; other tutors' quizzes are read-only (RLS: _can_view_tutor_quiz). */
export type TutorQuizScope = 'mine' | 'college';

function londonToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
}

export function useTutorQuizzes(scope: TutorQuizScope = 'mine') {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<TutorQuizListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setQuizzes([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    let quizQuery = supabase
      .from('tutor_quizzes')
      .select(
        'id, title, description, topic, kind, difficulty, is_published, is_homework, due_date, pass_mark, time_limit_minutes, qualification_code, source, source_document_id, cohort_id, assigned_student_ids, created_at, published_at, creator_id'
      )
      .order('created_at', { ascending: false });
    if (scope === 'mine') quizQuery = quizQuery.eq('creator_id', user.id);
    else {
      // Another tutor's draft is theirs until they publish it.
      quizQuery = quizQuery.or(`creator_id.eq.${user.id},is_published.eq.true`);
    }
    const { data: rows } = await quizQuery;

    const list = ((rows ?? []) as QuizRow[]).map((r) => ({
      ...r,
      mine: r.creator_id === user.id,
      kind: (r.kind === 'assessment' || r.kind === 'mock_exam' ? r.kind : 'quiz') as TutorQuizKind,
      assigned_student_ids: r.assigned_student_ids ?? [],
    }));

    if (list.length === 0) {
      setQuizzes([]);
      setLoading(false);
      return;
    }

    const ids = list.map((q) => q.id);
    const cohortIds = Array.from(
      new Set(list.map((q) => q.cohort_id).filter((c): c is string => !!c))
    );

    const [attemptsRes, questionsRes, cohortsRes, cohortMembersRes] = await Promise.all([
      supabase
        .from('tutor_quiz_attempts')
        .select('id, quiz_id, score, total_points, completed_at, started_at, student_id')
        .in('quiz_id', ids),
      supabase.from('tutor_quiz_questions').select('quiz_id, points').in('quiz_id', ids),
      cohortIds.length > 0
        ? supabase.from('college_cohorts').select('id, name').in('id', cohortIds)
        : Promise.resolve({ data: [] as Array<{ id: string; name: string }> }),
      cohortIds.length > 0
        ? supabase
            .from('college_students')
            .select('cohort_id, user_id, status')
            .in('cohort_id', cohortIds)
            .not('status', 'ilike', 'withdrawn')
            .not('status', 'ilike', 'completed')
        : Promise.resolve({
            data: [] as Array<{ cohort_id: string | null; user_id: string | null; status: string | null }>,
          }),
    ]);

    type AttemptRow = {
      id: string;
      quiz_id: string;
      score: number | null;
      total_points: number | null;
      completed_at: string | null;
      started_at: string | null;
      student_id: string;
    };

    const attemptsByQuiz = new Map<string, AttemptRow[]>();
    for (const a of (attemptsRes.data ?? []) as AttemptRow[]) {
      const arr = attemptsByQuiz.get(a.quiz_id) ?? [];
      arr.push(a);
      attemptsByQuiz.set(a.quiz_id, arr);
    }

    const questionsByQuiz = new Map<string, number>();
    for (const q of (questionsRes.data ?? []) as Array<{
      quiz_id: string;
      points: number | null;
    }>) {
      questionsByQuiz.set(q.quiz_id, (questionsByQuiz.get(q.quiz_id) ?? 0) + 1);
    }

    // Written answers still needing a human mark (no tutor sign-off yet),
    // read only for these quizzes' attempts.
    const attemptIds = ((attemptsRes.data ?? []) as Array<{ id: string }>).map((a) => a.id);
    const gradesRes =
      attemptIds.length > 0
        ? await supabase
            .from('tutor_quiz_answer_grades')
            .select('attempt_id, tutor_override_score')
            .in('attempt_id', attemptIds)
        : { data: [] as Array<{ attempt_id: string; tutor_override_score: number | null }> };
    const pendingByAttempt = new Map<string, number>();
    for (const g of (gradesRes.data ?? []) as Array<{
      attempt_id: string;
      tutor_override_score: number | null;
    }>) {
      if (g.tutor_override_score == null) {
        pendingByAttempt.set(g.attempt_id, (pendingByAttempt.get(g.attempt_id) ?? 0) + 1);
      }
    }

    const cohortNameById = new Map<string, string>();
    for (const c of (cohortsRes as { data: Array<{ id: string; name: string }> }).data ?? []) {
      cohortNameById.set(c.id, c.name);
    }

    const cohortMemberCount = new Map<string, number>();
    const cohortMemberIds = new Map<string, string[]>();
    for (const r of (cohortMembersRes as {
      data: Array<{ cohort_id: string | null; user_id: string | null }>;
    }).data ?? []) {
      if (!r.cohort_id) continue;
      cohortMemberCount.set(r.cohort_id, (cohortMemberCount.get(r.cohort_id) ?? 0) + 1);
      if (r.user_id) cohortMemberIds.set(r.cohort_id, [...(cohortMemberIds.get(r.cohort_id) ?? []), r.user_id]);
    }

    const today = londonToday();

    const enriched: TutorQuizListItem[] = list.map((q) => {
      const attempts = attemptsByQuiz.get(q.id) ?? [];
      const completed = attempts.filter((a) => a.completed_at);
      const inProgress = attempts.filter((a) => !a.completed_at);
      const passes = completed.filter((a) => {
        if (
          q.pass_mark == null ||
          a.score == null ||
          a.total_points == null ||
          a.total_points === 0
        )
          return false;
        return (a.score / a.total_points) * 100 >= q.pass_mark;
      });
      const avg =
        completed.length > 0
          ? Math.round(
              completed
                .filter((a) => a.score != null && a.total_points != null && a.total_points > 0)
                .reduce((s, a) => s + ((a.score as number) / (a.total_points as number)) * 100, 0) /
                Math.max(1, completed.length)
            )
          : null;

      // Assigned count
      let assignedCount = q.assigned_student_ids.length;
      if (q.cohort_id) {
        assignedCount += cohortMemberCount.get(q.cohort_id) ?? 0;
      }
      // Overdue: past its due date (any quiz with one, not only homework) and
      // not finished, counting named learners and the cohort's members.
      let overdueCount = 0;
      if (q.is_published && q.due_date && q.due_date < today) {
        const completedStudentIds = new Set(completed.map((a) => a.student_id));
        const targets = new Set<string>([
          ...q.assigned_student_ids,
          ...(q.cohort_id ? (cohortMemberIds.get(q.cohort_id) ?? []) : []),
        ]);
        overdueCount = Array.from(targets).filter((sid) => !completedStudentIds.has(sid)).length;
      }

      // Pending AI grades — sum across all attempts of this quiz
      let pending = 0;
      for (const a of attempts) {
        pending += pendingByAttempt.get(a.id) ?? 0;
      }

      return {
        ...q,
        cohort_name: q.cohort_id ? (cohortNameById.get(q.cohort_id) ?? null) : null,
        questions_count: questionsByQuiz.get(q.id) ?? 0,
        assigned_count: assignedCount,
        completed_count: completed.length,
        in_progress_count: inProgress.length,
        overdue_count: overdueCount,
        avg_percentage: avg,
        pass_rate_percent:
          completed.length > 0 ? Math.round((passes.length / completed.length) * 100) : null,
        pending_ai_grade_count: pending,
      };
    });

    setQuizzes(enriched);
    setLoading(false);
  }, [user, scope]);

  useEffect(() => {
    void load();
  }, [load]);

  // Realtime — new attempts and grades should bump the dashboard.
  useEffect(() => {
    if (!user) return;
    const ch = supabase
      .channel(realtimeChannelName(`tutor_quizzes:${user.id}:${scope}`))
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tutor_quizzes' },
        () => void load()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tutor_quiz_attempts' },
        () => void load()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tutor_quiz_answer_grades' },
        () => void load()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [user, load, scope]);

  return { quizzes, loading, refresh: load };
}
