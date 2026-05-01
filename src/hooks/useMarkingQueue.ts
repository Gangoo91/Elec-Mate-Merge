import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useMarkingQueue — cross-quiz, cross-cohort marking copilot for the
   logged-in tutor. Surfaces every completed attempt of every quiz they own
   that has free-response work needing review, with the AI's verdict
   pre-populated so the tutor can rip through them.

   Per-attempt status derivation:
     - "awaiting_ai"      one or more free-response answers not AI-graded
     - "awaiting_review"  AI-graded but tutor hasn't signed off yet
     - "signed_off"       every free-response answer has a tutor override
     - "no_free_response" pure MCQ — no tutor work needed (hidden from queue)

   The sheet that handles a single attempt review already exists
   (QuizAttemptReviewSheet); this hook just feeds the queue list.

   ELE-936 / [H1].
   ========================================================================== */

export type MarkingStatus = 'awaiting_ai' | 'awaiting_review' | 'signed_off' | 'no_free_response';

export interface MarkingQueueItem {
  attempt_id: string;
  quiz_id: string;
  quiz_title: string;
  quiz_pass_mark: number | null;
  cohort_name: string | null;
  student_id: string;
  student_name: string;
  submitted_at: string | null;
  /** When the *last* tutor override was applied to any answer on this
      attempt. Drives the "Approved (24h)" stat; null if not signed off. */
  last_signed_off_at: string | null;
  score: number | null;
  total_points: number | null;
  pct: number | null;
  passed_by_score: boolean | null;
  status: MarkingStatus;
  n_free_response: number;
  n_ai_graded: number;
  n_signed_off: number;
  n_awaiting_ai: number;
  n_awaiting_review: number;
}

export interface MarkingQueueStats {
  total_pending: number; // awaiting_review + awaiting_ai
  awaiting_review: number;
  awaiting_ai: number;
  approved_today: number;
  approved_total: number;
  avg_pct: number | null;
}

export function useMarkingQueue() {
  const { user } = useAuth();
  const [items, setItems] = useState<MarkingQueueItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    // Step 1: tutor's quizzes — scope everything by these.
    const { data: quizzes } = await supabase
      .from('tutor_quizzes')
      .select('id, title, pass_mark, cohort_id')
      .eq('creator_id', user.id);

    const quizRows = (quizzes ?? []) as Array<{
      id: string;
      title: string;
      pass_mark: number | null;
      cohort_id: string | null;
    }>;
    if (quizRows.length === 0) {
      setItems([]);
      setLoading(false);
      return;
    }
    const quizIds = quizRows.map((q) => q.id);
    const cohortIds = Array.from(
      new Set(quizRows.map((q) => q.cohort_id).filter((c): c is string => !!c))
    );

    // Step 2: completed attempts on these quizzes + supporting metadata.
    const [attemptsRes, cohortsRes] = await Promise.all([
      supabase
        .from('tutor_quiz_attempts')
        .select('id, quiz_id, student_id, score, total_points, completed_at')
        .in('quiz_id', quizIds)
        .not('completed_at', 'is', null)
        .order('completed_at', { ascending: false }),
      cohortIds.length > 0
        ? supabase.from('college_cohorts').select('id, name').in('id', cohortIds)
        : Promise.resolve({ data: [] as Array<{ id: string; name: string }> }),
    ]);

    const attemptRows = (attemptsRes.data ?? []) as Array<{
      id: string;
      quiz_id: string;
      student_id: string;
      score: number | null;
      total_points: number | null;
      completed_at: string | null;
    }>;
    if (attemptRows.length === 0) {
      setItems([]);
      setLoading(false);
      return;
    }

    const attemptIds = attemptRows.map((a) => a.id);
    const studentIds = Array.from(new Set(attemptRows.map((a) => a.student_id)));

    // Step 3: grade rows + students in parallel.
    const [gradesRes, studentsRes] = await Promise.all([
      supabase
        .from('tutor_quiz_answer_grades')
        .select('attempt_id, ai_score, tutor_override_score, tutor_override_at')
        .in('attempt_id', attemptIds),
      supabase.from('college_students').select('id, name').in('id', studentIds),
    ]);

    const gradeRows = (gradesRes.data ?? []) as Array<{
      attempt_id: string;
      ai_score: number | null;
      tutor_override_score: number | null;
      tutor_override_at: string | null;
    }>;
    const studentRows = (studentsRes.data ?? []) as Array<{
      id: string;
      name: string;
    }>;

    // Index lookups.
    const quizById = new Map(quizRows.map((q) => [q.id, q]));
    const cohortNameById = new Map(
      ((cohortsRes as { data: Array<{ id: string; name: string }> }).data ?? []).map((c) => [
        c.id,
        c.name,
      ])
    );
    const studentNameById = new Map(studentRows.map((s) => [s.id, s.name]));

    // Group grade rows by attempt.
    const gradesByAttempt = new Map<
      string,
      Array<{
        ai_score: number | null;
        tutor_override_score: number | null;
        tutor_override_at: string | null;
      }>
    >();
    for (const g of gradeRows) {
      const arr = gradesByAttempt.get(g.attempt_id) ?? [];
      arr.push({
        ai_score: g.ai_score,
        tutor_override_score: g.tutor_override_score,
        tutor_override_at: g.tutor_override_at,
      });
      gradesByAttempt.set(g.attempt_id, arr);
    }

    const enriched: MarkingQueueItem[] = attemptRows.flatMap((a) => {
      const quiz = quizById.get(a.quiz_id);
      if (!quiz) return [];
      const grades = gradesByAttempt.get(a.id) ?? [];
      const n_free_response = grades.length;
      const n_ai_graded = grades.filter((g) => g.ai_score != null).length;
      const n_signed_off = grades.filter((g) => g.tutor_override_score != null).length;
      const n_awaiting_ai = grades.filter(
        (g) => g.ai_score == null && g.tutor_override_score == null
      ).length;
      const n_awaiting_review = grades.filter(
        (g) => g.ai_score != null && g.tutor_override_score == null
      ).length;
      const lastSignOffMs = grades.reduce((max, g) => {
        if (!g.tutor_override_at) return max;
        const t = new Date(g.tutor_override_at).getTime();
        return t > max ? t : max;
      }, 0);
      const last_signed_off_at = lastSignOffMs > 0 ? new Date(lastSignOffMs).toISOString() : null;

      let status: MarkingStatus;
      if (n_free_response === 0) {
        status = 'no_free_response';
      } else if (n_signed_off === n_free_response) {
        status = 'signed_off';
      } else if (n_awaiting_ai > 0) {
        status = 'awaiting_ai';
      } else {
        status = 'awaiting_review';
      }

      const pct =
        a.score != null && a.total_points != null && a.total_points > 0
          ? Math.round((a.score / a.total_points) * 100)
          : null;
      const passed_by_score = quiz.pass_mark != null && pct != null ? pct >= quiz.pass_mark : null;

      return [
        {
          attempt_id: a.id,
          quiz_id: a.quiz_id,
          quiz_title: quiz.title,
          quiz_pass_mark: quiz.pass_mark,
          cohort_name: quiz.cohort_id ? (cohortNameById.get(quiz.cohort_id) ?? null) : null,
          student_id: a.student_id,
          student_name: studentNameById.get(a.student_id) ?? 'Unknown',
          submitted_at: a.completed_at,
          last_signed_off_at,
          score: a.score,
          total_points: a.total_points,
          pct,
          passed_by_score,
          status,
          n_free_response,
          n_ai_graded,
          n_signed_off,
          n_awaiting_ai,
          n_awaiting_review,
        },
      ];
    });

    // Hide pure-MCQ attempts (no tutor work to do).
    const visible = enriched.filter((i) => i.status !== 'no_free_response');

    // Priority sort: awaiting_review oldest-first → awaiting_ai oldest-first
    // → signed_off newest-first.
    const statusRank: Record<MarkingStatus, number> = {
      awaiting_review: 0,
      awaiting_ai: 1,
      signed_off: 2,
      no_free_response: 3,
    };
    visible.sort((x, y) => {
      const r = statusRank[x.status] - statusRank[y.status];
      if (r !== 0) return r;
      const xt = x.submitted_at ? new Date(x.submitted_at).getTime() : 0;
      const yt = y.submitted_at ? new Date(y.submitted_at).getTime() : 0;
      // oldest first inside pending buckets, newest first in signed_off
      return x.status === 'signed_off' ? yt - xt : xt - yt;
    });

    setItems(visible);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  // Realtime — bump on any grade or attempt change.
  useEffect(() => {
    if (!user) return;
    const ch = supabase
      .channel(`marking_queue:${user.id}`)
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
  }, [user, load]);

  const stats: MarkingQueueStats = useMemo(() => {
    const awaiting_review = items.filter((i) => i.status === 'awaiting_review').length;
    const awaiting_ai = items.filter((i) => i.status === 'awaiting_ai').length;
    const total_pending = awaiting_review + awaiting_ai;
    const approved_total = items.filter((i) => i.status === 'signed_off').length;

    // Approved (24h) — count attempts whose last sign-off event happened
    // in the last 24 hours. last_signed_off_at is the max
    // tutor_override_at across the attempt's grade rows.
    const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const approved_today = items.filter(
      (i) =>
        i.status === 'signed_off' &&
        i.last_signed_off_at != null &&
        new Date(i.last_signed_off_at).getTime() >= dayAgo
    ).length;

    const scored = items.filter((i) => i.pct != null);
    const avg_pct =
      scored.length > 0
        ? Math.round(scored.reduce((s, i) => s + (i.pct as number), 0) / scored.length)
        : null;

    return { total_pending, awaiting_review, awaiting_ai, approved_today, approved_total, avg_pct };
  }, [items]);

  return { items, stats, loading, refresh: load };
}
