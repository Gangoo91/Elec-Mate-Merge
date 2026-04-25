import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useStudentQuizzes — assessment + quiz history for one learner.

   Combines:
   - quiz_attempts (apprentice-side, unit-coded auto-quizzes)
   - quiz_results (apprentice-side, full result set with category breakdown)
   - tutor_quiz_attempts (tutor-authored quizzes for cohort)
   - ojt_assessments (off-the-job formal assessments — graded)

   Argument is auth.users.id.
   ========================================================================== */

export type AssessmentSource =
  | 'quiz_attempt'
  | 'quiz_result'
  | 'tutor_quiz'
  | 'ojt_assessment';

export interface AssessmentEntry {
  id: string;
  source: AssessmentSource;
  taken_at: string | null;
  title: string;
  unit_code: string | null;
  score: number | null;
  total: number | null;
  percentage: number | null;
  passed: boolean | null;
  pass_mark: number | null;
  time_seconds: number | null;
  grade: string | null;
  feedback: string | null;
  status: string | null;
  due_date: string | null;
}

export interface QuizRollUp {
  total_attempts: number;
  by_source: Record<AssessmentSource, { count: number; avg_percent: number | null }>;
  pass_rate_percent: number;
  avg_percent: number | null;
  recent_streak: number; // consecutive passes from most recent
  last_attempt_at: string | null;
}

export interface StudentQuizzes {
  attempts: AssessmentEntry[];
  rollUp: QuizRollUp;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const ZERO_ROLLUP: QuizRollUp = {
  total_attempts: 0,
  by_source: {
    quiz_attempt: { count: 0, avg_percent: null },
    quiz_result: { count: 0, avg_percent: null },
    tutor_quiz: { count: 0, avg_percent: null },
    ojt_assessment: { count: 0, avg_percent: null },
  },
  pass_rate_percent: 0,
  avg_percent: null,
  recent_streak: 0,
  last_attempt_at: null,
};

const PASS_THRESHOLD = 70; // default pass mark when none recorded

function inferPass(pct: number | null, passMark: number | null): boolean | null {
  if (pct == null) return null;
  return pct >= (passMark ?? PASS_THRESHOLD);
}

export function useStudentQuizzes(userId: string | null): StudentQuizzes {
  const [attempts, setAttempts] = useState<AssessmentEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!userId) {
      setAttempts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const [quizAttRes, quizResRes, tutorAttRes, ojtRes] = await Promise.all([
        supabase
          .from('quiz_attempts')
          .select('id, unit_code, score, total_questions, percentage, time_taken, created_at')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(100),
        supabase
          .from('quiz_results')
          .select(
            'id, assessment_id, session_id, score, total_questions, percentage, time_spent, correct_answers, completed_at, created_at'
          )
          .eq('user_id', userId)
          .order('completed_at', { ascending: false, nullsFirst: false })
          .limit(100),
        supabase
          .from('tutor_quiz_attempts')
          .select(
            'id, quiz_id, score, total_points, started_at, completed_at, time_taken_seconds, tutor_quizzes(title, pass_mark, topic)'
          )
          .eq('student_id', userId)
          .order('completed_at', { ascending: false, nullsFirst: false })
          .limit(100),
        supabase
          .from('ojt_assessments')
          .select('id, title, type, due_date, status, grade, feedback, created_at, updated_at')
          .eq('user_id', userId)
          .order('updated_at', { ascending: false, nullsFirst: false })
          .limit(100),
      ]);

      const merged: AssessmentEntry[] = [];

      if (!quizAttRes.error && quizAttRes.data) {
        for (const r of quizAttRes.data as Array<{
          id: string;
          unit_code: string | null;
          score: number | null;
          total_questions: number | null;
          percentage: number | null;
          time_taken: number | null;
          created_at: string | null;
        }>) {
          merged.push({
            id: `qa_${r.id}`,
            source: 'quiz_attempt',
            taken_at: r.created_at,
            title: r.unit_code ? `Unit ${r.unit_code} quiz` : 'Quiz',
            unit_code: r.unit_code,
            score: r.score ?? null,
            total: r.total_questions ?? null,
            percentage: r.percentage ?? null,
            passed: inferPass(r.percentage ?? null, null),
            pass_mark: null,
            time_seconds: r.time_taken ?? null,
            grade: null,
            feedback: null,
            status: null,
            due_date: null,
          });
        }
      }

      if (!quizResRes.error && quizResRes.data) {
        for (const r of quizResRes.data as Array<{
          id: string;
          assessment_id: string | null;
          score: number | null;
          total_questions: number | null;
          percentage: number | null;
          time_spent: number | null;
          completed_at: string | null;
          created_at: string | null;
        }>) {
          const pct = r.percentage != null ? Number(r.percentage) : null;
          merged.push({
            id: `qr_${r.id}`,
            source: 'quiz_result',
            taken_at: r.completed_at ?? r.created_at,
            title: r.assessment_id ? `Assessment ${r.assessment_id}` : 'Assessment',
            unit_code: null,
            score: r.score ?? null,
            total: r.total_questions ?? null,
            percentage: pct,
            passed: inferPass(pct, null),
            pass_mark: null,
            time_seconds: r.time_spent ?? null,
            grade: null,
            feedback: null,
            status: null,
            due_date: null,
          });
        }
      }

      if (!tutorAttRes.error && tutorAttRes.data) {
        for (const r of tutorAttRes.data as Array<{
          id: string;
          quiz_id: string;
          score: number | null;
          total_points: number | null;
          completed_at: string | null;
          started_at: string | null;
          time_taken_seconds: number | null;
          tutor_quizzes: { title: string; pass_mark: number | null; topic: string | null } | null;
        }>) {
          const total = r.total_points ?? null;
          const pct = total && r.score != null ? Math.round((r.score / total) * 100) : null;
          merged.push({
            id: `tq_${r.id}`,
            source: 'tutor_quiz',
            taken_at: r.completed_at ?? r.started_at,
            title: r.tutor_quizzes?.title ?? 'Tutor quiz',
            unit_code: r.tutor_quizzes?.topic ?? null,
            score: r.score ?? null,
            total,
            percentage: pct,
            passed: inferPass(pct, r.tutor_quizzes?.pass_mark ?? null),
            pass_mark: r.tutor_quizzes?.pass_mark ?? null,
            time_seconds: r.time_taken_seconds ?? null,
            grade: null,
            feedback: null,
            status: r.completed_at ? 'completed' : 'in_progress',
            due_date: null,
          });
        }
      }

      if (!ojtRes.error && ojtRes.data) {
        for (const r of ojtRes.data as Array<{
          id: string;
          title: string;
          type: string | null;
          due_date: string | null;
          status: string | null;
          grade: string | null;
          feedback: string | null;
          created_at: string | null;
          updated_at: string | null;
        }>) {
          merged.push({
            id: `ojt_${r.id}`,
            source: 'ojt_assessment',
            taken_at: r.updated_at ?? r.created_at,
            title: r.title,
            unit_code: r.type ?? null,
            score: null,
            total: null,
            percentage: null,
            passed:
              r.grade && /^(pass|distinction|merit)$/i.test(r.grade)
                ? true
                : r.grade && /^(fail|refer)$/i.test(r.grade)
                  ? false
                  : null,
            pass_mark: null,
            time_seconds: null,
            grade: r.grade,
            feedback: r.feedback,
            status: r.status,
            due_date: r.due_date,
          });
        }
      }

      merged.sort((a, b) => {
        const at = a.taken_at ?? '';
        const bt = b.taken_at ?? '';
        return at < bt ? 1 : at > bt ? -1 : 0;
      });
      setAttempts(merged);
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
      .channel(`student_quizzes:${userId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'quiz_attempts', filter: `user_id=eq.${userId}` },
        () => fetchAll()
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'quiz_results', filter: `user_id=eq.${userId}` },
        () => fetchAll()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ojt_assessments', filter: `user_id=eq.${userId}` },
        () => fetchAll()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, fetchAll]);

  const rollUp = useMemo<QuizRollUp>(() => {
    if (!attempts.length) return ZERO_ROLLUP;
    const bySource = {
      quiz_attempt: { count: 0, sum: 0, n: 0 },
      quiz_result: { count: 0, sum: 0, n: 0 },
      tutor_quiz: { count: 0, sum: 0, n: 0 },
      ojt_assessment: { count: 0, sum: 0, n: 0 },
    } as Record<AssessmentSource, { count: number; sum: number; n: number }>;

    let passes = 0;
    let withVerdict = 0;
    let totalSum = 0;
    let totalN = 0;
    for (const a of attempts) {
      bySource[a.source].count += 1;
      if (a.percentage != null) {
        bySource[a.source].sum += a.percentage;
        bySource[a.source].n += 1;
        totalSum += a.percentage;
        totalN += 1;
      }
      if (a.passed != null) {
        withVerdict += 1;
        if (a.passed) passes += 1;
      }
    }

    let streak = 0;
    for (const a of attempts) {
      if (a.passed === true) streak += 1;
      else if (a.passed === false) break;
    }

    return {
      total_attempts: attempts.length,
      by_source: {
        quiz_attempt: {
          count: bySource.quiz_attempt.count,
          avg_percent:
            bySource.quiz_attempt.n > 0
              ? Math.round(bySource.quiz_attempt.sum / bySource.quiz_attempt.n)
              : null,
        },
        quiz_result: {
          count: bySource.quiz_result.count,
          avg_percent:
            bySource.quiz_result.n > 0
              ? Math.round(bySource.quiz_result.sum / bySource.quiz_result.n)
              : null,
        },
        tutor_quiz: {
          count: bySource.tutor_quiz.count,
          avg_percent:
            bySource.tutor_quiz.n > 0
              ? Math.round(bySource.tutor_quiz.sum / bySource.tutor_quiz.n)
              : null,
        },
        ojt_assessment: {
          count: bySource.ojt_assessment.count,
          avg_percent: null,
        },
      },
      pass_rate_percent: withVerdict > 0 ? Math.round((passes / withVerdict) * 100) : 0,
      avg_percent: totalN > 0 ? Math.round(totalSum / totalN) : null,
      recent_streak: streak,
      last_attempt_at: attempts[0]?.taken_at ?? null,
    };
  }, [attempts]);

  return useMemo(
    () => ({ attempts, rollUp, loading, error, refresh: fetchAll }),
    [attempts, rollUp, loading, error, fetchAll]
  );
}
