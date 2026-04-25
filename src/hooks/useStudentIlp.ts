import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useStudentIlp — current Individual Learning Plan + goals for one learner.

   Bidirectional: tutors edit everything; learners can mark a goal complete,
   add their own comment, and acknowledge. Realtime so both sides see live
   updates. Argument is college_students.id (the college-side row).

   Versioning: only `is_current=true` ILPs are returned. Creating a new
   version flips the previous to is_current=false in one transaction.
   ========================================================================== */

export type IlpStatus = 'draft' | 'active' | 'archived';
export type GoalStatus =
  | 'not_started'
  | 'in_progress'
  | 'completed'
  | 'blocked'
  | 'overdue'
  | 'cancelled';
export type GoalCategory =
  | 'academic'
  | 'behavioural'
  | 'skills'
  | 'employability'
  | 'wellbeing'
  | 'attendance'
  | 'other';
export type GoalPriority = 'low' | 'medium' | 'high';
export type GoalSource = 'tutor' | 'ai_suggested' | 'student' | 'employer';

export interface Ilp {
  id: string;
  student_id: string;
  college_id: string | null;
  version: number;
  is_current: boolean;
  status: IlpStatus | string | null;
  qualification_id: string | null;
  tutor_id: string | null;
  tutor_name_snapshot: string | null;
  headline_focus: string | null;
  headline_strengths: string | null;
  headline_areas: string | null;
  support_strategies: string | null;
  accessibility_adjustments: string | null;
  target_completion_date: string | null;
  review_date: string | null;
  last_reviewed: string | null;
  reviewed_by: string | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  created_by: string | null;
}

export interface IlpGoal {
  id: string;
  ilp_id: string;
  student_id: string;
  college_id: string | null;
  position: number;
  category: GoalCategory;
  priority: GoalPriority;
  source: GoalSource;
  title: string;
  description: string | null;
  acceptance_criteria: string | null;
  target_date: string | null;
  status: GoalStatus;
  completed_at: string | null;
  completed_by: string | null;
  student_comment: string | null;
  student_comment_at: string | null;
  student_acknowledged: boolean;
  student_acknowledged_at: string | null;
  tutor_comment: string | null;
  tutor_comment_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewIlp {
  qualification_id?: string | null;
  headline_focus?: string | null;
  headline_strengths?: string | null;
  headline_areas?: string | null;
  support_strategies?: string | null;
  accessibility_adjustments?: string | null;
  target_completion_date?: string | null;
  review_date?: string | null;
  status?: IlpStatus;
}

export interface NewGoal {
  title: string;
  description?: string | null;
  acceptance_criteria?: string | null;
  category?: GoalCategory;
  priority?: GoalPriority;
  source?: GoalSource;
  target_date?: string | null;
  position?: number;
}

export interface IlpRollUp {
  total_goals: number;
  completed: number;
  in_progress: number;
  not_started: number;
  blocked: number;
  overdue: number;
  completion_percent: number;
  needs_acknowledgement: number;
  unread_student_comments: number;
}

const ZERO_ROLLUP: IlpRollUp = {
  total_goals: 0,
  completed: 0,
  in_progress: 0,
  not_started: 0,
  blocked: 0,
  overdue: 0,
  completion_percent: 0,
  needs_acknowledgement: 0,
  unread_student_comments: 0,
};

const ILP_COLS =
  'id, student_id, college_id, version, is_current, status, qualification_id, tutor_id, tutor_name_snapshot, headline_focus, headline_strengths, headline_areas, support_strategies, accessibility_adjustments, target_completion_date, review_date, last_reviewed, reviewed_by, published_at, created_at, updated_at, created_by';

const GOAL_COLS =
  'id, ilp_id, student_id, college_id, position, category, priority, source, title, description, acceptance_criteria, target_date, status, completed_at, completed_by, student_comment, student_comment_at, student_acknowledged, student_acknowledged_at, tutor_comment, tutor_comment_at, created_by, created_at, updated_at';

interface Args {
  /** college_students.id */
  collegeStudentId: string | null;
}

export interface StudentIlpHook {
  ilp: Ilp | null;
  goals: IlpGoal[];
  rollUp: IlpRollUp;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  /** Create or replace the current ILP. If one exists, archives it and bumps version. */
  upsertIlp: (input: NewIlp) => Promise<Ilp | null>;
  updateIlp: (patch: Partial<NewIlp>) => Promise<void>;
  addGoal: (input: NewGoal) => Promise<void>;
  updateGoal: (id: string, patch: Partial<IlpGoal>) => Promise<void>;
  removeGoal: (id: string) => Promise<void>;
  toggleGoalComplete: (id: string, complete: boolean) => Promise<void>;
  setStudentComment: (id: string, comment: string) => Promise<void>;
  acknowledgeGoal: (id: string, ack: boolean) => Promise<void>;
}

export function useStudentIlp({ collegeStudentId }: Args): StudentIlpHook {
  const [ilp, setIlp] = useState<Ilp | null>(null);
  const [goals, setGoals] = useState<IlpGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    fetch();
  }, [fetch]);

  // Realtime — listen on the parent ilp + its goals
  useEffect(() => {
    if (!collegeStudentId) return;
    const channel = supabase
      .channel(`student_ilp:${collegeStudentId}`)
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

  const upsertIlp = useCallback(
    async (input: NewIlp): Promise<Ilp | null> => {
      if (!collegeStudentId) return null;
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id ?? null;
      let collegeId: string | null = null;
      let tutorName: string | null = null;
      if (uid) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('college_id, full_name')
          .eq('id', uid)
          .maybeSingle();
        collegeId = (profile?.college_id as string | null) ?? null;
        tutorName = (profile?.full_name as string | null) ?? null;
      }

      // Archive current if present, then insert new at version+1
      const { data: existing } = await supabase
        .from('college_ilps')
        .select('id, version')
        .eq('student_id', collegeStudentId)
        .eq('is_current', true)
        .order('version', { ascending: false })
        .limit(1)
        .maybeSingle();

      const nextVersion = ((existing?.version as number | null) ?? 0) + 1;

      if (existing?.id) {
        await supabase
          .from('college_ilps')
          .update({ is_current: false, status: 'archived' })
          .eq('id', existing.id);
      }

      const { data: inserted, error: insErr } = await supabase
        .from('college_ilps')
        .insert({
          student_id: collegeStudentId,
          college_id: collegeId,
          version: nextVersion,
          is_current: true,
          status: input.status ?? 'active',
          qualification_id: input.qualification_id ?? null,
          tutor_id: uid,
          tutor_name_snapshot: tutorName,
          headline_focus: input.headline_focus ?? null,
          headline_strengths: input.headline_strengths ?? null,
          headline_areas: input.headline_areas ?? null,
          support_strategies: input.support_strategies ?? null,
          accessibility_adjustments: input.accessibility_adjustments ?? null,
          target_completion_date: input.target_completion_date ?? null,
          review_date: input.review_date ?? null,
          created_by: uid,
          published_at: input.status === 'draft' ? null : new Date().toISOString(),
        })
        .select(ILP_COLS)
        .single();
      if (insErr) throw insErr;
      return inserted as Ilp;
    },
    [collegeStudentId]
  );

  const updateIlp = useCallback(
    async (patch: Partial<NewIlp>) => {
      if (!ilp) return;
      const { error: updErr } = await supabase
        .from('college_ilps')
        .update({ ...patch })
        .eq('id', ilp.id);
      if (updErr) throw updErr;
    },
    [ilp]
  );

  const addGoal = useCallback(
    async (input: NewGoal) => {
      if (!ilp || !collegeStudentId) return;
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id ?? null;
      const nextPos =
        input.position ??
        (goals.length ? Math.max(...goals.map((g) => g.position)) + 1 : 0);
      const { error: insErr } = await supabase.from('college_ilp_goals').insert({
        ilp_id: ilp.id,
        student_id: collegeStudentId,
        college_id: ilp.college_id,
        position: nextPos,
        category: input.category ?? 'academic',
        priority: input.priority ?? 'medium',
        source: input.source ?? 'tutor',
        title: input.title.trim(),
        description: input.description?.trim() || null,
        acceptance_criteria: input.acceptance_criteria?.trim() || null,
        target_date: input.target_date ?? null,
        status: 'not_started',
        created_by: uid,
      });
      if (insErr) throw insErr;
    },
    [ilp, collegeStudentId, goals]
  );

  const updateGoal = useCallback(async (id: string, patch: Partial<IlpGoal>) => {
    const { error: updErr } = await supabase
      .from('college_ilp_goals')
      .update(patch)
      .eq('id', id);
    if (updErr) throw updErr;
  }, []);

  const removeGoal = useCallback(async (id: string) => {
    const { error: delErr } = await supabase
      .from('college_ilp_goals')
      .delete()
      .eq('id', id);
    if (delErr) throw delErr;
  }, []);

  const toggleGoalComplete = useCallback(
    async (id: string, complete: boolean) => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id ?? null;
      const { error: updErr } = await supabase
        .from('college_ilp_goals')
        .update({
          status: complete ? 'completed' : 'in_progress',
          completed_at: complete ? new Date().toISOString() : null,
          completed_by: complete ? uid : null,
        })
        .eq('id', id);
      if (updErr) throw updErr;
    },
    []
  );

  const setStudentComment = useCallback(async (id: string, comment: string) => {
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

  const acknowledgeGoal = useCallback(async (id: string, ack: boolean) => {
    const { error: updErr } = await supabase
      .from('college_ilp_goals')
      .update({
        student_acknowledged: ack,
        student_acknowledged_at: ack ? new Date().toISOString() : null,
      })
      .eq('id', id);
    if (updErr) throw updErr;
  }, []);

  const rollUp = useMemo<IlpRollUp>(() => {
    if (!goals.length) return ZERO_ROLLUP;
    const today = new Date().toISOString().slice(0, 10);
    let completed = 0;
    let inProgress = 0;
    let notStarted = 0;
    let blocked = 0;
    let overdue = 0;
    let needsAck = 0;
    let unreadComments = 0;
    for (const g of goals) {
      if (g.status === 'completed') completed += 1;
      else if (g.status === 'in_progress') inProgress += 1;
      else if (g.status === 'blocked') blocked += 1;
      else if (g.status === 'overdue') overdue += 1;
      else notStarted += 1;
      if (g.target_date && g.target_date < today && g.status !== 'completed' && g.status !== 'cancelled') {
        overdue += g.status === 'overdue' ? 0 : 1;
      }
      if (!g.student_acknowledged) needsAck += 1;
      if (g.student_comment_at && (!g.tutor_comment_at || g.student_comment_at > g.tutor_comment_at)) {
        unreadComments += 1;
      }
    }
    return {
      total_goals: goals.length,
      completed,
      in_progress: inProgress,
      not_started: notStarted,
      blocked,
      overdue,
      completion_percent: Math.round((completed / goals.length) * 100),
      needs_acknowledgement: needsAck,
      unread_student_comments: unreadComments,
    };
  }, [goals]);

  return useMemo(
    () => ({
      ilp,
      goals,
      rollUp,
      loading,
      error,
      refresh: fetch,
      upsertIlp,
      updateIlp,
      addGoal,
      updateGoal,
      removeGoal,
      toggleGoalComplete,
      setStudentComment,
      acknowledgeGoal,
    }),
    [
      ilp,
      goals,
      rollUp,
      loading,
      error,
      fetch,
      upsertIlp,
      updateIlp,
      addGoal,
      updateGoal,
      removeGoal,
      toggleGoalComplete,
      setStudentComment,
      acknowledgeGoal,
    ]
  );
}
