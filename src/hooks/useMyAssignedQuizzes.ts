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

    // Pull every published quiz that targets this learner (via assigned_student_ids
    // or via their cohort_id). RLS filters server-side anyway; the explicit filter
    // here keeps the result list tight.
    const orParts: string[] = [`assigned_student_ids.cs.{${user.id}}`];
    if (cohortId) orParts.push(`cohort_id.eq.${cohortId}`);

    const { data: quizRows } = await supabase
      .from('tutor_quizzes')
      .select(
        'id, title, description, topic, difficulty, time_limit_minutes, pass_mark, qualification_code, is_homework, due_date, published_at, source, kind'
      )
      .eq('is_published', true)
      .or(orParts.join(','))
      .order('published_at', { ascending: false });

    const list = ((quizRows ?? []) as Array<
      Omit<AssignedQuiz, 'status' | 'best_score' | 'best_percentage' | 'attempts_count' | 'last_attempt_at' | 'questions_count' | 'kind'> & {
        kind: string | null;
      }
    >);
    if (list.length === 0) {
      setQuizzes([]);
      setLoading(false);
      return;
    }

    const ids = list.map((q) => q.id);
    const [attemptsRes, questionsRes] = await Promise.all([
      supabase
        .from('tutor_quiz_attempts')
        .select('quiz_id, score, total_points, completed_at, started_at')
        .eq('student_id', user.id)
        .in('quiz_id', ids),
      supabase
        .from('tutor_quiz_questions')
        .select('quiz_id, points')
        .in('quiz_id', ids),
    ]);

    const attemptsByQuiz = new Map<string, Array<{ score: number | null; total_points: number | null; completed_at: string | null; started_at: string | null }>>();
    for (const a of ((attemptsRes.data ?? []) as Array<{
      quiz_id: string;
      score: number | null;
      total_points: number | null;
      completed_at: string | null;
      started_at: string | null;
    }>)) {
      const arr = attemptsByQuiz.get(a.quiz_id) ?? [];
      arr.push(a);
      attemptsByQuiz.set(a.quiz_id, arr);
    }

    const questionsByQuiz = new Map<string, number>();
    for (const q of ((questionsRes.data ?? []) as Array<{ quiz_id: string; points: number | null }>)) {
      questionsByQuiz.set(q.quiz_id, (questionsByQuiz.get(q.quiz_id) ?? 0) + 1);
    }

    const today = new Date().toISOString().slice(0, 10);

    const enriched: AssignedQuiz[] = list.map((q) => {
      const attempts = attemptsByQuiz.get(q.id) ?? [];
      const completed = attempts.filter((a) => a.completed_at);
      const inProgress = attempts.find((a) => !a.completed_at);
      const best = completed.reduce<{ score: number | null; total: number | null; at: string | null }>(
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
        kind:
          q.kind === 'assessment' || q.kind === 'mock_exam' ? q.kind : 'quiz',
        is_homework: !!q.is_homework,
        status,
        best_score: best.score,
        best_percentage:
          best.score != null && best.total != null && best.total > 0
            ? Math.round((best.score / best.total) * 100)
            : null,
        attempts_count: attempts.length,
        last_attempt_at:
          attempts.reduce<string | null>(
            (latest, a) =>
              !latest || (a.completed_at ?? a.started_at ?? '') > latest
                ? a.completed_at ?? a.started_at ?? null
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
        { event: '*', schema: 'public', table: 'tutor_quiz_attempts', filter: `student_id=eq.${user.id}` },
        () => void load()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [user, load]);

  return { quizzes, loading, refresh: load };
}
