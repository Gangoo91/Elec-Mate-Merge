import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import type {
  Ilp,
  IlpGoal,
  GoalStatus,
} from '@/hooks/useStudentIlp';

/* ==========================================================================
   useMyIlp — apprentice-side view of their own current Individual Learning
   Plan + goals. The learner can:
     - tick a goal complete (status flip + completed_at)
     - post a student_comment for the tutor
     - acknowledge a goal
   Tutor-side fields (title, description, target_date, etc.) are guarded
   server-side by the _ilp_goals_learner_field_guard trigger.

   Resolves college_students.id from auth.uid() internally so the apprentice
   doesn't need to know their college_students row id.
   ========================================================================== */

export interface MyIlpRollUp {
  total_goals: number;
  completed: number;
  in_progress: number;
  not_started: number;
  blocked: number;
  overdue: number;
  completion_percent: number;
  unread_tutor_comments: number;
  needs_acknowledgement: number;
}

export interface MyIlpHook {
  ilp: Ilp | null;
  goals: IlpGoal[];
  rollUp: MyIlpRollUp;
  loading: boolean;
  error: string | null;
  hasCollegeLink: boolean;
  refresh: () => Promise<void>;
  toggleComplete: (id: string, complete: boolean) => Promise<void>;
  postComment: (id: string, comment: string) => Promise<void>;
  acknowledge: (id: string, ack: boolean) => Promise<void>;
}

const ILP_COLS =
  'id, student_id, college_id, version, is_current, status, qualification_id, tutor_id, tutor_name_snapshot, headline_focus, headline_strengths, headline_areas, support_strategies, accessibility_adjustments, target_completion_date, review_date, last_reviewed, reviewed_by, published_at, created_at, updated_at, created_by';

const GOAL_COLS =
  'id, ilp_id, student_id, college_id, position, category, priority, source, title, description, acceptance_criteria, target_date, status, completed_at, completed_by, student_comment, student_comment_at, student_acknowledged, student_acknowledged_at, tutor_comment, tutor_comment_at, created_by, created_at, updated_at';

const ZERO_ROLLUP: MyIlpRollUp = {
  total_goals: 0,
  completed: 0,
  in_progress: 0,
  not_started: 0,
  blocked: 0,
  overdue: 0,
  completion_percent: 0,
  unread_tutor_comments: 0,
  needs_acknowledgement: 0,
};

export function useMyIlp(): MyIlpHook {
  const [collegeStudentId, setCollegeStudentId] = useState<string | null>(null);
  const [hasCollegeLink, setHasCollegeLink] = useState(false);
  const [ilp, setIlp] = useState<Ilp | null>(null);
  const [goals, setGoals] = useState<IlpGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Resolve own college_students row once on mount.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) {
        if (!cancelled) {
          setHasCollegeLink(false);
          setLoading(false);
        }
        return;
      }
      const { data, error: err } = await supabase
        .from('college_students')
        .select('id')
        .eq('user_id', uid)
        .maybeSingle();
      if (cancelled) return;
      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
      const id = (data?.id as string | undefined) ?? null;
      setCollegeStudentId(id);
      setHasCollegeLink(!!id);
      if (!id) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const fetch = useCallback(async () => {
    if (!collegeStudentId) {
      setIlp(null);
      setGoals([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data: ilpData, error: ilpErr } = await supabase
        .from('college_ilps')
        .select(ILP_COLS)
        .eq('student_id', collegeStudentId)
        .eq('is_current', true)
        .order('version', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (ilpErr) throw ilpErr;
      const current = (ilpData as Ilp | null) ?? null;
      setIlp(current);

      if (current) {
        const { data: goalData, error: goalErr } = await supabase
          .from('college_ilp_goals')
          .select(GOAL_COLS)
          .eq('ilp_id', current.id)
          .order('position', { ascending: true })
          .order('created_at', { ascending: true });
        if (goalErr) throw goalErr;
        setGoals((goalData ?? []) as IlpGoal[]);
      } else {
        setGoals([]);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [collegeStudentId]);

  useEffect(() => {
    if (collegeStudentId) fetch();
  }, [collegeStudentId, fetch]);

  // Realtime — listen for tutor changes. Same channel pattern as the
  // college-side hook so both sides stay in lockstep.
  useEffect(() => {
    if (!collegeStudentId) return;
    const channel = supabase
      .channel(realtimeChannelName(`my_ilp:${collegeStudentId}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_ilps',
          filter: `student_id=eq.${collegeStudentId}`,
        },
        () => fetch()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_ilp_goals',
          filter: `student_id=eq.${collegeStudentId}`,
        },
        () => fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [collegeStudentId, fetch]);

  const toggleComplete = useCallback(async (id: string, complete: boolean) => {
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id ?? null;
    const { error: updErr } = await supabase
      .from('college_ilp_goals')
      .update({
        status: (complete ? 'completed' : 'in_progress') as GoalStatus,
        completed_at: complete ? new Date().toISOString() : null,
        completed_by: complete ? uid : null,
      })
      .eq('id', id);
    if (updErr) throw updErr;
  }, []);

  const postComment = useCallback(async (id: string, comment: string) => {
    const trimmed = comment.trim();
    const { error: updErr } = await supabase
      .from('college_ilp_goals')
      .update({
        student_comment: trimmed || null,
        student_comment_at: trimmed ? new Date().toISOString() : null,
      })
      .eq('id', id);
    if (updErr) throw updErr;
  }, []);

  const acknowledge = useCallback(async (id: string, ack: boolean) => {
    const { error: updErr } = await supabase
      .from('college_ilp_goals')
      .update({
        student_acknowledged: ack,
        student_acknowledged_at: ack ? new Date().toISOString() : null,
      })
      .eq('id', id);
    if (updErr) throw updErr;
  }, []);

  const rollUp = useMemo<MyIlpRollUp>(() => {
    if (!goals.length) return ZERO_ROLLUP;
    const today = new Date().toISOString().slice(0, 10);
    let completed = 0;
    let inProgress = 0;
    let notStarted = 0;
    let blocked = 0;
    let overdue = 0;
    let unread = 0;
    let needsAck = 0;
    for (const g of goals) {
      if (g.status === 'completed') completed += 1;
      else if (g.status === 'in_progress') inProgress += 1;
      else if (g.status === 'blocked') blocked += 1;
      else if (g.status === 'overdue') overdue += 1;
      else notStarted += 1;
      if (
        g.target_date &&
        g.target_date < today &&
        g.status !== 'completed' &&
        g.status !== 'cancelled' &&
        g.status !== 'overdue'
      ) {
        overdue += 1;
      }
      // Tutor commented after we last commented (or we never have)
      if (
        g.tutor_comment_at &&
        (!g.student_comment_at || g.tutor_comment_at > g.student_comment_at)
      ) {
        unread += 1;
      }
      if (!g.student_acknowledged) needsAck += 1;
    }
    return {
      total_goals: goals.length,
      completed,
      in_progress: inProgress,
      not_started: notStarted,
      blocked,
      overdue,
      completion_percent: Math.round((completed / goals.length) * 100),
      unread_tutor_comments: unread,
      needs_acknowledgement: needsAck,
    };
  }, [goals]);

  return useMemo(
    () => ({
      ilp,
      goals,
      rollUp,
      loading,
      error,
      hasCollegeLink,
      refresh: fetch,
      toggleComplete,
      postComment,
      acknowledge,
    }),
    [
      ilp,
      goals,
      rollUp,
      loading,
      error,
      hasCollegeLink,
      fetch,
      toggleComplete,
      postComment,
      acknowledge,
    ]
  );
}
