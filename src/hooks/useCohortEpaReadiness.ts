import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import type { EpaJudgement } from '@/hooks/useEpaReadiness';
import { useCollegeSettings } from '@/hooks/college/useCollegeSettings';
import { epaJudgementPosition, DEFAULT_EPA_VERDICT_BANDS } from '@/lib/epaBands';
import type { EpaVerdictBands } from '@/hooks/college/useCollegeSettings';
import type { EpaReadinessModel } from '@/lib/epa/readiness';
import {
  effectiveVerdict,
  aiNeedsSignOff,
  fetchEpaReadinessModels,
} from '@/hooks/college/epaReadinessModels';

/* ==========================================================================
   useCohortEpaReadiness — every active apprentice in the staff's college,
   each with their current Learner / Tutor / AI verdicts. Fuel for the
   cohort EPA dashboard.
   ========================================================================== */

export interface CohortLearner {
  id: string;
  name: string;
  user_id: string | null;
  course_code: string | null;
  course_name: string | null;
  cohort_id: string | null;
  status: string | null;
  // Most recent judgement per source
  learner: EpaJudgement | null;
  tutor: EpaJudgement | null;
  ai: EpaJudgement | null;
  /** The shared readiness model (AM2S practice + gateway) — what the learner sees too. */
  readiness: EpaReadinessModel | null;
  /** Tutor verdict, else the AI's as a prediction. Drives counts, sort and filters. */
  effective: ReturnType<typeof effectiveVerdict>;
  /** Position of the effective verdict (band middle). */
  effective_position: number | null;
  /** The AI verdict is newer than the tutor's (or there's no tutor verdict). */
  needs_sign_off: boolean;
  /** First blocker from the effective verdict, or the readiness model's next step. */
  top_blocker: string | null;
  next_action: { action: string; target_date?: string } | null;
  gateway_date: string | null;
  has_blocker: boolean;
  any_verdict: boolean;
}

/**
 * Backwards-compat wrapper: callers that don't have access to the bands
 * (e.g. CohortEpaPage which receives positions on rows) pass the
 * pre-computed position. This function uses default bands — for accurate
 * per-college positions, use `epaJudgementPosition(j, bands)` directly.
 */
function judgementPosition(
  j: EpaJudgement | null,
  bands: EpaVerdictBands = DEFAULT_EPA_VERDICT_BANDS
): number | null {
  return epaJudgementPosition(j, bands);
}

export function useCohortEpaReadiness(args: { collegeId: string | null }) {
  const { collegeId } = args;
  const [learners, setLearners] = useState<CohortLearner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { settings } = useCollegeSettings();
  const bands = settings.epa_verdict_bands;

  const load = useCallback(async () => {
    if (!collegeId) {
      setLearners([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    // Active apprentices in this college
    const { data: students, error: sErr } = await supabase
      .from('college_students')
      .select('id, user_id, name, course_id, cohort_id, status')
      .eq('college_id', collegeId)
      .not('status', 'ilike', 'withdrawn')
      .not('status', 'ilike', 'completed');
    if (sErr) {
      setError(sErr.message);
      setLearners([]);
      setLoading(false);
      return;
    }
    setError(null);
    const list = (students ?? []) as Array<{
      id: string;
      user_id: string | null;
      name: string;
      course_id: string | null;
      cohort_id: string | null;
      status: string | null;
    }>;

    if (list.length === 0) {
      setLearners([]);
      setLoading(false);
      return;
    }

    // Course names — minimise round-trips
    const courseIds = Array.from(new Set(list.map((s) => s.course_id).filter(Boolean) as string[]));
    const courseMap = new Map<string, { code: string | null; name: string | null }>();
    if (courseIds.length > 0) {
      const { data: courses } = await supabase
        .from('college_courses')
        .select('id, code, name')
        .in('id', courseIds);
      for (const c of (courses ?? []) as Array<{
        id: string;
        code: string | null;
        name: string | null;
      }>) {
        courseMap.set(c.id, { code: c.code, name: c.name });
      }
    }

    // All current judgements for these learners in one shot
    const ids = list.map((s) => s.id);
    const [{ data: js, error: jErr }, { data: epaRows }, readiness] = await Promise.all([
      supabase
        .from('college_epa_judgements')
        .select('*')
        .in('college_student_id', ids)
        .eq('is_current', true),
      supabase.from('college_epa').select('student_id, gateway_date').in('student_id', ids),
      fetchEpaReadinessModels(
        list
          .filter((s) => s.user_id)
          .map((s) => ({
            userId: s.user_id as string,
            studentId: s.id,
            // Rule 1 of the shared qualification resolver: the college course.
            qualificationCode: s.course_id ? (courseMap.get(s.course_id)?.code ?? null) : null,
          }))
      ),
    ]);
    if (jErr || readiness.error) setError(jErr?.message ?? readiness.error);
    const gatewayDate = new Map<string, string | null>(
      ((epaRows ?? []) as Array<{ student_id: string; gateway_date: string | null }>).map((e) => [
        e.student_id,
        e.gateway_date,
      ])
    );
    const judgementsByStudent = new Map<string, EpaJudgement[]>();
    for (const row of (js ?? []) as unknown as EpaJudgement[]) {
      const arr = judgementsByStudent.get(row.college_student_id) ?? [];
      arr.push(row);
      judgementsByStudent.set(row.college_student_id, arr);
    }

    const out: CohortLearner[] = list.map((s) => {
      const arr = judgementsByStudent.get(s.id) ?? [];
      const learner = arr.find((j) => j.source === 'learner') ?? null;
      const tutor = arr.find((j) => j.source === 'tutor') ?? null;
      const ai = arr.find((j) => j.source === 'ai') ?? null;
      const eff = effectiveVerdict(tutor, ai);
      const model = s.user_id ? (readiness.models.get(s.user_id) ?? null) : null;
      const hasBlocker = arr.some((j) => (j.blockers?.length ?? 0) > 0);
      const effBlocker = eff?.judgement.blockers?.[0] ?? null;
      const effAction = eff?.judgement.recommended_actions?.[0] ?? null;
      const modelNext = model?.next[0] ?? null;
      return {
        id: s.id,
        name: s.name,
        user_id: s.user_id,
        course_code: s.course_id ? (courseMap.get(s.course_id)?.code ?? null) : null,
        course_name: s.course_id ? (courseMap.get(s.course_id)?.name ?? null) : null,
        cohort_id: s.cohort_id,
        status: s.status,
        learner,
        tutor,
        ai,
        readiness: model,
        effective: eff,
        effective_position: eff ? epaJudgementPosition(eff.judgement, bands) : null,
        needs_sign_off: aiNeedsSignOff(tutor, ai),
        top_blocker: effBlocker ?? (modelNext ? modelNext.label : null),
        next_action: effAction ?? (modelNext ? { action: modelNext.label } : null),
        gateway_date: gatewayDate.get(s.id) ?? null,
        has_blocker: hasBlocker,
        any_verdict: !!(learner || tutor || ai),
      };
    });

    setLearners(out);
    setLoading(false);
  }, [collegeId, bands]);

  useEffect(() => {
    void load();
  }, [load]);

  // Realtime — bump when any judgement in this college changes
  useEffect(() => {
    if (!collegeId) return;
    const ch = supabase
      .channel(realtimeChannelName(`cohort_epa:${collegeId}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_epa_judgements',
          filter: `college_id=eq.${collegeId}`,
        },
        () => {
          void load();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [collegeId, load]);

  return { learners, loading, error, refresh: load };
}

export { judgementPosition };
