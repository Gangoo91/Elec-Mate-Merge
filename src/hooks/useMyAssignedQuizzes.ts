import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useMyAssignedQuizzes — for the apprentice. Reads tutor_quizzes where this
   learner is in assigned_student_ids OR their cohort matches. Joins a
   per-quiz attempt summary so we know status: not_started / in_progress /
   completed / overdue.
   ========================================================================== */

export type QuizStatus = 'not_started' | 'in_progress' | 'completed' | 'overdue';

export type AssignedQuizKind = 'quiz' | 'assessment' | 'mock_exam';

export interface AssignedQuiz {
  id: string;
  title: string;
  description: string | null;
  topic: string | null;
  difficulty: string | null;
  time_limit_minutes: number | null;
  pass_mark: number | null;
  qualification_code: string | null;
  is_homework: boolean;
  due_date: string | null;
  published_at: string | null;
  source: string | null;
  kind: AssignedQuizKind;
  /** Full name of the tutor who created this quiz, if available. */
  tutor_name: string | null;
  // Per-learner derived
  status: QuizStatus;
  best_score: number | null;
  best_percentage: number | null;
  attempts_count: number;
  last_attempt_at: string | null;
  questions_count: number;
}

export function useMyAssignedQuizzes() {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<AssignedQuiz[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setQuizzes([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    // Resolve cohort_id for this learner (so cohort-assigned quizzes appear)
    const { data: csRow } = await supabase
      .from('college_students')
      .select('cohort_id')
      .eq('user_id', user.id)
      .maybeSingle();
    const cohortId = (csRow as { cohort_id?: string | null } | null)?.cohort_id ?? null;

    // Pull every published quiz that targets this learner — two separate
    // queries (one for direct assignment, one for cohort) and merge.
    // PostgREST's `.or()` with array-contains (`cs.{uuid}`) is fragile and
    // was returning empty in some cases, so we avoid it entirely.
    const SELECT =
      'id, title, description, topic, difficulty, time_limit_minutes, pass_mark, qualification_code, is_homework, due_date, published_at, source, kind, creator_id';

    const [directRes, cohortRes] = await Promise.all([
      supabase
        .from('tutor_quizzes')
        .select(SELECT)
        .eq('is_published', true)
        .contains('assigned_student_ids', [user.id])
        .order('published_at', { ascending: false }),
      cohortId
        ? supabase
            .from('tutor_quizzes')
            .select(SELECT)
            .eq('is_published', true)
            .eq('cohort_id', cohortId)
            .order('published_at', { ascending: false })
        : Promise.resolve({ data: [] as Array<Record<string, unknown>>, error: null }),
    ]);

    // Diagnostic — surface what the hook actually saw so we can see WHY
    // the apprentice card might be empty when data clearly exists.
    if (typeof window !== 'undefined') {
      console.info('[useMyAssignedQuizzes] auth.user.id=%s, cohort_id=%s', user.id, cohortId);
      console.info(
        '[useMyAssignedQuizzes] direct match=%d (err=%s), cohort match=%d (err=%s)',
        directRes.data?.length ?? -1,
        (directRes as { error?: { message?: string } }).error?.message ?? 'none',
        cohortRes.data?.length ?? -1,
        (cohortRes as { error?: { message?: string } }).error?.message ?? 'none'
      );
      if ((directRes.data?.length ?? 0) === 0 && (cohortRes.data?.length ?? 0) === 0) {
        console.warn(
          '[useMyAssignedQuizzes] both queries returned 0 rows. If a quiz was published targeting this user_id, this means: (a) RLS rejected the read, or (b) JS auth.user.id mismatches the assigned_student_ids UUID. Check Supabase logs for 401/403 on tutor_quizzes.'
        );
      }
    }

    // Merge + dedupe by id (a quiz could be both directly assigned AND
    // cohort-assigned in theory; keep the first occurrence).
    const seen = new Set<string>();
    const quizRows: Array<Record<string, unknown>> = [];
    for (const row of [
      ...((directRes.data ?? []) as Array<Record<string, unknown>>),
      ...((cohortRes.data ?? []) as Array<Record<string, unknown>>),
    ]) {
      const id = row.id as string;
      if (seen.has(id)) continue;
      seen.add(id);
      quizRows.push(row);
    }

    type RawQuizRow = Omit<
      AssignedQuiz,
      | 'status'
      | 'best_score'
      | 'best_percentage'
      | 'attempts_count'
      | 'last_attempt_at'
      | 'questions_count'
      | 'kind'
      | 'tutor_name'
    > & {
      kind: string | null;
      creator_id: string | null;
    };
    const list = (quizRows ?? []) as RawQuizRow[];
    if (list.length === 0) {
      setQuizzes([]);
      setLoading(false);
      return;
    }

    const ids = list.map((q) => q.id);
    const tutorIds = Array.from(
      new Set(list.map((q) => q.creator_id).filter((c): c is string => !!c))
    );
    const [attemptsRes, questionsRes, tutorsRes] = await Promise.all([
      supabase
        .from('tutor_quiz_attempts')
        .select('quiz_id, score, total_points, completed_at, started_at')
        .eq('student_id', user.id)
        .in('quiz_id', ids),
      supabase.from('tutor_quiz_questions').select('quiz_id, points').in('quiz_id', ids),
      tutorIds.length > 0
        ? supabase.from('profiles').select('id, full_name').in('id', tutorIds)
        : Promise.resolve({ data: [] as Array<{ id: string; full_name: string | null }> }),
    ]);

    const tutorNameById = new Map<string, string>();
    for (const t of (tutorsRes as { data: Array<{ id: string; full_name: string | null }> }).data ??
      []) {
      if (t.full_name) tutorNameById.set(t.id, t.full_name);
    }

    const attemptsByQuiz = new Map<
      string,
      Array<{
        score: number | null;
        total_points: number | null;
        completed_at: string | null;
        started_at: string | null;
      }>
    >();
    for (const a of (attemptsRes.data ?? []) as Array<{
      quiz_id: string;
      score: number | null;
      total_points: number | null;
      completed_at: string | null;
      started_at: string | null;
    }>) {
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

    const today = new Date().toISOString().slice(0, 10);

    const enriched: AssignedQuiz[] = list.map((q) => {
      const attempts = attemptsByQuiz.get(q.id) ?? [];
      const completed = attempts.filter((a) => a.completed_at);
      const inProgress = attempts.find((a) => !a.completed_at);
      const best = completed.reduce<{
        score: number | null;
        total: number | null;
        at: string | null;
      }>(
        (acc, a) => {
          if (a.score == null) return acc;
          if (acc.score == null || a.score > acc.score) {
            return { score: a.score, total: a.total_points, at: a.completed_at };
          }
          return acc;
        },
        { score: null, total: null, at: null }
      );
      const status: QuizStatus = (() => {
        if (completed.length > 0) return 'completed';
        if (inProgress) return 'in_progress';
        if (q.is_homework && q.due_date && q.due_date < today) return 'overdue';
        return 'not_started';
      })();
      return {
        ...q,
        kind: q.kind === 'assessment' || q.kind === 'mock_exam' ? q.kind : 'quiz',
        tutor_name: q.creator_id ? (tutorNameById.get(q.creator_id) ?? null) : null,
        is_homework: !!q.is_homework,
        status,
        best_score: best.score,
        best_percentage:
          best.score != null && best.total != null && best.total > 0
            ? Math.round((best.score / best.total) * 100)
            : null,
        attempts_count: attempts.length,
        last_attempt_at: attempts.reduce<string | null>(
          (latest, a) =>
            !latest || (a.completed_at ?? a.started_at ?? '') > latest
              ? (a.completed_at ?? a.started_at ?? null)
              : latest,
          null
        ),
        questions_count: questionsByQuiz.get(q.id) ?? 0,
      };
    });

    setQuizzes(enriched);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  // Realtime — learner sees a new quiz arrive without refresh
  useEffect(() => {
    if (!user) return;
    const ch = supabase
      .channel(`my_quizzes:${user.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tutor_quizzes' },
        () => void load()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tutor_quiz_attempts',
          filter: `student_id=eq.${user.id}`,
        },
        () => void load()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [user, load]);

  return { quizzes, loading, refresh: load };
}
