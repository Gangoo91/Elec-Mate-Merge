import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useEpaReadiness — single source of truth for the tri-perspective EPA panel.
   Combines:
     • learner self-judgement   (from college_epa_judgements where source='learner')
     • tutor judgement          (source='tutor')
     • AI judgement             (source='ai')
     • underlying simulator runs (epa_mock_sessions) for the learner column

   Returns the three current judgements + an agreement summary + helpers to
   submit a tutor judgement / co-sign an AI verdict.
   ========================================================================== */

export type EpaSource = 'learner' | 'tutor' | 'ai' | 'employer';
export type EpaVerdict = 'ready' | 'almost' | 'not_yet' | 'refer';
export type EpaGrade = 'distinction' | 'merit' | 'pass' | 'fail';

export interface EpaJudgement {
  id: string;
  college_id: string;
  college_student_id: string;
  source: EpaSource;
  source_user_id: string | null;
  source_name_snapshot: string | null;
  verdict: EpaVerdict;
  predicted_grade: EpaGrade | null;
  confidence: number | null;
  rationale: string | null;
  strengths: string[] | null;
  blockers: string[] | null;
  recommended_actions: Array<{ action: string; target_date?: string; lever_to_grade?: string }>;
  what_if: Array<{ change: string; new_grade: string; new_confidence?: number }>;
  citations: Array<{ ref: string; regulation_id?: string; snippet: string; applies_to: string }>;
  signals_used: Record<string, unknown>;
  parent_judgement_id: string | null;
  cosign_kind: 'cosigned' | 'overridden' | null;
  cosign_rationale: string | null;
  actual_outcome: string | null;
  actual_recorded_at: string | null;
  is_current: boolean;
  superseded_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface MockSummary {
  id: string;
  session_type: string;
  overall_score: number | null;
  predicted_grade: string | null;
  completed_at: string | null;
}

export interface AgreementSummary {
  /** Unique non-null verdict values across the three sources. 1 = consensus. */
  unique_verdicts: number;
  /** Same for predicted_grade. */
  unique_grades: number;
  /** Identifies the outlier source if exactly one disagrees, else null. */
  outlier_source: EpaSource | null;
  /** "All three agree" / "Tutor differs from AI on grade" / "No verdicts yet" */
  headline: string;
  /** True if every present source has the same verdict + grade. */
  full_consensus: boolean;
}

export interface UseEpaReadiness {
  loading: boolean;
  learner: EpaJudgement | null;
  tutor: EpaJudgement | null;
  ai: EpaJudgement | null;
  mocks: MockSummary[];
  history: EpaJudgement[];
  agreement: AgreementSummary;
  refresh: () => Promise<void>;
  saveTutorJudgement: (input: TutorJudgementInput) => Promise<EpaJudgement | null>;
  cosignAi: (aiJudgementId: string, rationale?: string) => Promise<EpaJudgement | null>;
  overrideAi: (
    aiJudgementId: string,
    input: TutorJudgementInput & { cosign_rationale: string }
  ) => Promise<EpaJudgement | null>;
}

export interface TutorJudgementInput {
  verdict: EpaVerdict;
  predicted_grade?: EpaGrade | null;
  confidence?: number | null; // 0-100
  rationale?: string | null;
  strengths?: string[];
  blockers?: string[];
  recommended_actions?: EpaJudgement['recommended_actions'];
  parent_judgement_id?: string | null;
  cosign_kind?: 'cosigned' | 'overridden' | null;
  cosign_rationale?: string | null;
}

export function useEpaReadiness(args: {
  collegeStudentId: string | null;
  /** auth user id of the learner — used to read their epa_mock_sessions */
  userId: string | null;
}): UseEpaReadiness {
  const { collegeStudentId, userId } = args;
  const [loading, setLoading] = useState(true);
  const [judgements, setJudgements] = useState<EpaJudgement[]>([]);
  const [mocks, setMocks] = useState<MockSummary[]>([]);

  const load = useCallback(async () => {
    if (!collegeStudentId) {
      setJudgements([]);
      setMocks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const [jRes, mRes] = await Promise.all([
      supabase
        .from('college_epa_judgements')
        .select('*')
        .eq('college_student_id', collegeStudentId)
        .order('created_at', { ascending: false })
        .limit(40),
      userId
        ? supabase
            .from('epa_mock_sessions')
            .select('id, session_type, overall_score, predicted_grade, completed_at')
            .eq('user_id', userId)
            .eq('status', 'completed')
            .order('completed_at', { ascending: false })
            .limit(8)
        : Promise.resolve({ data: [], error: null }),
    ]);
    setJudgements(((jRes.data ?? []) as unknown) as EpaJudgement[]);
    setMocks(((mRes.data ?? []) as unknown) as MockSummary[]);
    setLoading(false);
  }, [collegeStudentId, userId]);

  useEffect(() => {
    void load();
  }, [load]);

  // Realtime — re-load whenever a judgement changes for this learner.
  useEffect(() => {
    if (!collegeStudentId) return;
    const ch = supabase
      .channel(`epa_judgements:${collegeStudentId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_epa_judgements',
          filter: `college_student_id=eq.${collegeStudentId}`,
        },
        () => {
          void load();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [collegeStudentId, load]);

  const learner = useMemo(
    () => judgements.find((j) => j.source === 'learner' && j.is_current) ?? null,
    [judgements]
  );
  const tutor = useMemo(
    () => judgements.find((j) => j.source === 'tutor' && j.is_current) ?? null,
    [judgements]
  );
  const ai = useMemo(
    () => judgements.find((j) => j.source === 'ai' && j.is_current) ?? null,
    [judgements]
  );
  const history = useMemo(
    () => judgements.filter((j) => !j.is_current).slice(0, 20),
    [judgements]
  );

  const agreement = useMemo<AgreementSummary>(() => {
    const present = [learner, tutor, ai].filter((j): j is EpaJudgement => !!j);
    if (present.length === 0) {
      return {
        unique_verdicts: 0,
        unique_grades: 0,
        outlier_source: null,
        headline: 'No verdicts recorded yet',
        full_consensus: false,
      };
    }
    const verdicts = new Set(present.map((p) => p.verdict));
    const grades = new Set(present.map((p) => p.predicted_grade).filter(Boolean) as string[]);
    let outlier: EpaSource | null = null;
    if (verdicts.size === 2 && present.length === 3) {
      // Find the one whose verdict appears once
      const counts = new Map<string, EpaSource[]>();
      for (const p of present) {
        const list = counts.get(p.verdict) ?? [];
        list.push(p.source);
        counts.set(p.verdict, list);
      }
      for (const [, sources] of counts) {
        if (sources.length === 1) outlier = sources[0];
      }
    }
    const fullConsensus = verdicts.size === 1 && (grades.size === 0 || grades.size === 1);
    let headline = '';
    if (fullConsensus) {
      const v = present[0].verdict;
      const g = present[0].predicted_grade;
      headline = present.length === 3
        ? `All three judges agree: ${capitalise(v)}${g ? ` · ${capitalise(g)}` : ''}`
        : `${present.map((p) => capitalise(p.source)).join(' & ')} agree: ${capitalise(v)}${g ? ` · ${capitalise(g)}` : ''}`;
    } else if (outlier) {
      headline = `${capitalise(outlier)} differs from the other two — review their rationale`;
    } else {
      headline = `${verdicts.size} different verdicts across ${present.length} sources`;
    }
    return {
      unique_verdicts: verdicts.size,
      unique_grades: grades.size,
      outlier_source: outlier,
      headline,
      full_consensus: fullConsensus,
    };
  }, [learner, tutor, ai]);

  const saveTutorJudgement = useCallback<UseEpaReadiness['saveTutorJudgement']>(
    async (input) => {
      if (!collegeStudentId) return null;
      // Derive college_id + learner user_id from the student row
      const { data: student } = await supabase
        .from('college_students')
        .select('college_id, user_id, name')
        .eq('id', collegeStudentId)
        .maybeSingle();
      if (!student?.college_id) return null;
      const learnerUserId = (student as { user_id: string | null }).user_id;
      const learnerName = ((student as { name?: string }).name) ?? '';

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      // Optional: snapshot tutor name
      const { data: staff } = await supabase
        .from('college_staff')
        .select('name')
        .eq('user_id', user.id)
        .maybeSingle();

      const payload = {
        college_id: student.college_id as string,
        college_student_id: collegeStudentId,
        source: 'tutor' as const,
        source_user_id: user.id,
        source_name_snapshot: (staff?.name as string | null) ?? null,
        verdict: input.verdict,
        predicted_grade: input.predicted_grade ?? null,
        confidence: input.confidence ?? null,
        rationale: input.rationale ?? null,
        strengths: input.strengths ?? [],
        blockers: input.blockers ?? [],
        recommended_actions: input.recommended_actions ?? [],
        what_if: [],
        citations: [],
        signals_used: {},
        parent_judgement_id: input.parent_judgement_id ?? null,
        cosign_kind: input.cosign_kind ?? null,
        cosign_rationale: input.cosign_rationale ?? null,
        is_current: true,
      };
      const { data, error } = await supabase
        .from('college_epa_judgements')
        .insert(payload)
        .select()
        .single();
      if (error) {
        console.error('[useEpaReadiness] saveTutorJudgement', error);
        throw new Error(error.message || 'Could not save tutor verdict');
      }

      // Fire-and-forget: notify the learner about the new tutor verdict
      if (learnerUserId && learnerUserId !== user.id) {
        const verdictLabel: Record<string, string> = {
          ready: 'Ready for EPA',
          almost: 'Almost ready',
          not_yet: 'Not yet ready',
          refer: 'Referred',
        };
        const tutorName = (staff?.name as string | null) ?? 'Your tutor';
        const grade = input.predicted_grade ? ` · predicted ${input.predicted_grade}` : '';
        void supabase.functions
          .invoke('send-push-notification', {
            body: {
              userId: learnerUserId,
              title: `${tutorName} reviewed your EPA readiness`,
              body: `Verdict: ${verdictLabel[input.verdict] ?? input.verdict}${grade}. Tap to read.`,
              type: 'college',
              data: {
                kind: 'epa_judgement',
                judgement_id: (data as { id?: string } | null)?.id,
                college_student_id: collegeStudentId,
                deeplink: '/apprentice/college-plan',
              },
            },
          })
          .catch((e) => console.warn('[useEpaReadiness] push send failed', e));
      }

      // Audit-trail entry on the learner's pastoral feed (visible to staff + linked
      // to the apprentice activity feed via existing realtime subscriptions).
      try {
        await supabase.from('pastoral_notes').insert({
          student_id: collegeStudentId,
          college_id: student.college_id as string,
          author_id: user.id,
          kind: 'note',
          visibility: 'tutors',
          title: `EPA verdict: ${input.verdict.replace('_', ' ')}`,
          body:
            (input.rationale ?? `${(staff?.name as string | null) ?? 'Tutor'} recorded a ${input.verdict.replace('_', ' ')} verdict for ${learnerName}.`),
        });
      } catch (e) {
        console.warn('[useEpaReadiness] pastoral note insert failed', e);
      }

      await load();
      return ((data as unknown) as EpaJudgement) ?? null;
    },
    [collegeStudentId, load]
  );

  const cosignAi = useCallback<UseEpaReadiness['cosignAi']>(
    async (aiJudgementId, rationale) => {
      if (!ai) return null;
      return saveTutorJudgement({
        verdict: ai.verdict,
        predicted_grade: ai.predicted_grade,
        confidence: ai.confidence,
        rationale: rationale ?? `Co-signs AI verdict (${ai.source_name_snapshot ?? 'AI'}).`,
        strengths: ai.strengths ?? [],
        blockers: ai.blockers ?? [],
        recommended_actions: ai.recommended_actions,
        parent_judgement_id: aiJudgementId,
        cosign_kind: 'cosigned',
        cosign_rationale: rationale ?? null,
      });
    },
    [ai, saveTutorJudgement]
  );

  const overrideAi = useCallback<UseEpaReadiness['overrideAi']>(
    async (aiJudgementId, input) =>
      saveTutorJudgement({
        ...input,
        parent_judgement_id: aiJudgementId,
        cosign_kind: 'overridden',
      }),
    [saveTutorJudgement]
  );

  return {
    loading,
    learner,
    tutor,
    ai,
    mocks,
    history,
    agreement,
    refresh: load,
    saveTutorJudgement,
    cosignAi,
    overrideAi,
  };
}

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
