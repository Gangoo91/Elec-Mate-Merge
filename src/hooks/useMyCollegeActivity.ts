import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';

/* ==========================================================================
   useMyCollegeActivity — apprentice-side activity feed surfacing what their
   college team is doing on their record. Unified stream from:
     - portfolio_comments authored by college staff
     - portfolio_submissions that just got an assessor / IQA verdict
     - college_ilp_goals tutor comments / new goals
     - college_observations recorded by an assessor
     - tutor_quiz_attempts the learner completed on a quiz their tutor set
       (ELE-1895), with the score against the quiz pass mark

   All data is already learner-readable via existing RLS. Hook resolves the
   apprentice's own auth.uid() + college_students.id internally.
   ========================================================================== */

export type CollegeActivityKind =
  | 'tutor_comment'
  | 'assessor_verdict'
  | 'iqa_verdict'
  | 'new_goal'
  | 'tutor_goal_comment'
  | 'observation'
  | 'quiz_result';

export interface CollegeActivityItem {
  id: string;
  kind: CollegeActivityKind;
  occurred_at: string;
  title: string;
  preview: string | null;
  actor_name: string | null;
  is_unread: boolean;
  /** Deep-link target — used by the UI to navigate / open the right drawer */
  target: {
    type: 'submission' | 'goal' | 'observation' | 'quiz';
    id: string;
  };
}

export interface MyCollegeActivityHook {
  items: CollegeActivityItem[];
  unread_count: number;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const SINCE_DAYS = 30;

function sinceIso(): string {
  return new Date(Date.now() - SINCE_DAYS * 86_400_000).toISOString();
}

export function useMyCollegeActivity(): MyCollegeActivityHook {
  const [authUid, setAuthUid] = useState<string | null>(null);
  const [collegeStudentId, setCollegeStudentId] = useState<string | null>(null);
  const [items, setItems] = useState<CollegeActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Resolve auth uid + own college_students row once
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id ?? null;
      if (cancelled) return;
      setAuthUid(uid);
      if (!uid) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('college_students')
        .select('id')
        .eq('user_id', uid)
        .maybeSingle();
      if (cancelled) return;
      setCollegeStudentId((data?.id as string | undefined) ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const fetch = useCallback(async () => {
    if (!authUid) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const since = sinceIso();
      const merged: CollegeActivityItem[] = [];

      // 1. Portfolio comments authored by staff (not by self)
      const { data: comments } = await supabase
        .from('portfolio_comments')
        .select(
          'id, evidence_id, content, author_id, author_name, author_role, requires_action, is_resolved, created_at'
        )
        .eq('user_id', authUid)
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .limit(40);
      if (comments) {
        for (const c of comments as Array<{
          id: string;
          evidence_id: string | null;
          content: string;
          author_id: string | null;
          author_name: string | null;
          author_role: string | null;
          requires_action: boolean;
          is_resolved: boolean;
          created_at: string;
        }>) {
          if (c.author_id === authUid) continue;
          merged.push({
            id: `pc_${c.id}`,
            kind: 'tutor_comment',
            occurred_at: c.created_at,
            title: c.author_name
              ? `${c.author_name} commented`
              : 'New comment from your college',
            preview: c.content.slice(0, 140),
            actor_name: c.author_name,
            is_unread: c.requires_action && !c.is_resolved,
            target: { type: 'submission', id: c.evidence_id ?? c.id },
          });
        }
      }

      // 2. Portfolio submissions where verdict landed since cutoff
      const { data: subs } = await supabase
        .from('portfolio_submissions')
        .select(
          'id, status, grade, iqa_outcome, iqa_verified_at, signed_off_at, signed_off_by, reviewed_at, last_feedback_at'
        )
        .eq('user_id', authUid)
        .or(
          `signed_off_at.gte.${since},last_feedback_at.gte.${since},iqa_verified_at.gte.${since}`
        )
        .limit(40);
      if (subs) {
        for (const s of subs as Array<{
          id: string;
          status: string;
          grade: string | null;
          iqa_outcome: string | null;
          iqa_verified_at: string | null;
          signed_off_at: string | null;
          reviewed_at: string | null;
          last_feedback_at: string | null;
        }>) {
          if (s.signed_off_at) {
            merged.push({
              id: `sub_signed_${s.id}`,
              kind: 'assessor_verdict',
              occurred_at: s.signed_off_at,
              title: `Submission signed off${s.grade ? ` · ${s.grade}` : ''}`,
              preview: null,
              actor_name: null,
              is_unread: true,
              target: { type: 'submission', id: s.id },
            });
          } else if (s.last_feedback_at) {
            merged.push({
              id: `sub_fb_${s.id}`,
              kind: 'assessor_verdict',
              occurred_at: s.last_feedback_at,
              title: 'Assessor left feedback',
              preview: null,
              actor_name: null,
              is_unread: true,
              target: { type: 'submission', id: s.id },
            });
          }
          if (s.iqa_verified_at) {
            merged.push({
              id: `sub_iqa_${s.id}`,
              kind: 'iqa_verdict',
              occurred_at: s.iqa_verified_at,
              title:
                s.iqa_outcome === 'verified'
                  ? 'IQA verified your submission'
                  : `IQA: ${s.iqa_outcome ?? 'reviewed'}`,
              preview: null,
              actor_name: null,
              is_unread: true,
              target: { type: 'submission', id: s.id },
            });
          }
        }
      }

      // 3. College ILP goals — new goals + tutor comments
      if (collegeStudentId) {
        const { data: goalRows } = await supabase
          .from('college_ilp_goals')
          .select(
            'id, title, tutor_comment, tutor_comment_at, student_comment_at, student_acknowledged, created_at, created_by'
          )
          .eq('student_id', collegeStudentId)
          .or(`created_at.gte.${since},tutor_comment_at.gte.${since}`)
          .limit(40);
        if (goalRows) {
          for (const g of goalRows as Array<{
            id: string;
            title: string;
            tutor_comment: string | null;
            tutor_comment_at: string | null;
            student_comment_at: string | null;
            student_acknowledged: boolean;
            created_at: string;
            created_by: string | null;
          }>) {
            if (g.created_at >= since) {
              merged.push({
                id: `goal_new_${g.id}`,
                kind: 'new_goal',
                occurred_at: g.created_at,
                title: 'New goal from your tutor',
                preview: g.title,
                actor_name: null,
                is_unread: !g.student_acknowledged,
                target: { type: 'goal', id: g.id },
              });
            }
            if (
              g.tutor_comment &&
              g.tutor_comment_at &&
              g.tutor_comment_at >= since &&
              (!g.student_comment_at || g.tutor_comment_at > g.student_comment_at)
            ) {
              merged.push({
                id: `goal_cmt_${g.id}`,
                kind: 'tutor_goal_comment',
                occurred_at: g.tutor_comment_at,
                title: 'Tutor commented on a goal',
                preview: g.tutor_comment.slice(0, 140),
                actor_name: null,
                is_unread: true,
                target: { type: 'goal', id: g.id },
              });
            }
          }
        }
      }

      // 4. Observations on this learner
      if (collegeStudentId) {
        const { data: obs } = await supabase
          .from('college_observations')
          .select(
            'id, activity_title, outcome, observed_at, assessor_name_snapshot, assessor_signed, created_at'
          )
          .eq('college_student_id', collegeStudentId)
          .gte('created_at', since)
          .order('created_at', { ascending: false })
          .limit(20);
        if (obs) {
          for (const o of obs as Array<{
            id: string;
            activity_title: string;
            outcome: string;
            observed_at: string;
            assessor_name_snapshot: string | null;
            assessor_signed: boolean;
            created_at: string;
          }>) {
            merged.push({
              id: `obs_${o.id}`,
              kind: 'observation',
              occurred_at: o.created_at,
              title: o.assessor_name_snapshot
                ? `${o.assessor_name_snapshot} recorded an observation`
                : 'New assessor observation',
              preview: `${o.activity_title} · ${o.outcome}`,
              actor_name: o.assessor_name_snapshot,
              is_unread: o.assessor_signed,
              target: { type: 'observation', id: o.id },
            });
          }
        }
      }

      // 5. Quizzes set by the tutor that the learner has completed (ELE-1895).
      //    tutor_quiz_attempts.student_id is the learner's auth uid; the
      //    learner can read their own attempts and the quizzes set to them.
      const { data: attempts } = await supabase
        .from('tutor_quiz_attempts')
        .select('id, quiz_id, score, total_points, completed_at')
        .eq('student_id', authUid)
        .not('completed_at', 'is', null)
        .gte('completed_at', since)
        .order('completed_at', { ascending: false })
        .limit(20);
      if (attempts && attempts.length > 0) {
        const quizIds = Array.from(new Set(attempts.map((a) => a.quiz_id as string)));
        const { data: quizzes } = await supabase
          .from('tutor_quizzes')
          .select('id, title, pass_mark')
          .in('id', quizIds);
        const quizById = new Map(
          ((quizzes ?? []) as Array<{ id: string; title: string; pass_mark: number | null }>).map(
            (q) => [q.id, q]
          )
        );
        for (const a of attempts as Array<{
          id: string;
          quiz_id: string;
          score: number | null;
          total_points: number | null;
          completed_at: string;
        }>) {
          const quiz = quizById.get(a.quiz_id);
          const pct =
            a.score != null && a.total_points
              ? Math.round((Number(a.score) / Number(a.total_points)) * 100)
              : null;
          const passMark = quiz?.pass_mark ?? null;
          const verdict =
            pct == null || passMark == null ? '' : pct >= passMark ? ' · passed' : ' · not passed yet';
          merged.push({
            id: `quiz_${a.id}`,
            kind: 'quiz_result',
            occurred_at: a.completed_at,
            title: quiz?.title ? `Quiz completed: ${quiz.title}` : 'Quiz completed',
            preview:
              a.score != null && a.total_points
                ? `${a.score} of ${a.total_points} (${pct}%)${verdict}${passMark != null ? `, pass mark ${passMark}%` : ''}`
                : null,
            actor_name: null,
            is_unread: false,
            target: { type: 'quiz', id: a.quiz_id },
          });
        }
      }

      merged.sort((a, b) => (a.occurred_at < b.occurred_at ? 1 : -1));
      setItems(merged);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [authUid, collegeStudentId]);

  useEffect(() => {
    if (authUid) fetch();
  }, [authUid, collegeStudentId, fetch]);

  // Realtime — refresh on any new comment, submission update, or goal change
  useEffect(() => {
    if (!authUid) return;
    const channel = supabase
      .channel(realtimeChannelName(`my_college_activity:${authUid}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio_comments',
          filter: `user_id=eq.${authUid}`,
        },
        () => fetch()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tutor_quiz_attempts',
          filter: `student_id=eq.${authUid}`,
        },
        () => fetch()
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'portfolio_submissions',
          filter: `user_id=eq.${authUid}`,
        },
        () => fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [authUid, fetch]);

  // Goal-related realtime keyed off college_students.id
  useEffect(() => {
    if (!collegeStudentId) return;
    const channel = supabase
      .channel(realtimeChannelName(`my_college_activity_goals:${collegeStudentId}`))
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

  // Observations realtime keyed off college_students.id — when an assessor
  // logs / signs / amends an observation, the apprentice sees it within ~1s.
  // (The fetch path already pulls observations; this just keeps it live.)
  useEffect(() => {
    if (!collegeStudentId) return;
    const channel = supabase
      .channel(realtimeChannelName(`my_college_activity_observations:${collegeStudentId}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_observations',
          filter: `college_student_id=eq.${collegeStudentId}`,
        },
        () => fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [collegeStudentId, fetch]);

  const unread_count = useMemo(
    () => items.filter((i) => i.is_unread).length,
    [items]
  );

  return useMemo(
    () => ({ items, unread_count, loading, error, refresh: fetch }),
    [items, unread_count, loading, error, fetch]
  );
}
