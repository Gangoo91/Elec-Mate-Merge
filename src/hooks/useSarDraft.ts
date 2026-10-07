import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';
import type { AreaGradeKey, ToolkitAreaKey } from '@/components/college/quality/ComplianceToolkit';

/* ==========================================================================
   useSarDraft — fetch / generate the Ofsted Self-Assessment Report draft.
   ELE-922 (G2). Pairs with the ai-generate-sar edge function.
   ========================================================================== */

export type SarStatus = 'draft' | 'in_review' | 'approved' | 'archived';
export type Rag = 'red' | 'amber' | 'green' | 'grey';

export interface SarEvidence {
  label: string;
  value: string;
}

export interface SarJudgement {
  rag: Rag;
  summary: string;
  narrative: string;
  evidence: SarEvidence[];
  gaps: string[];
}

/** One evaluation area of the renewed FE and skills framework (ELE-2021). */
export interface SarAreaSection extends SarJudgement {
  /** Self-assessed grade: five-point key, met / not_met for safeguarding, or not_enough_evidence. */
  grade: AreaGradeKey;
}

export interface SarDraft {
  id: string;
  college_id: string;
  academic_year: string;
  title: string | null;
  status: SarStatus;
  generated_by: string | null;
  approved_by: string | null;
  approved_at: string | null;
  overall_summary: string | null;
  strengths: string[];
  areas_for_improvement: string[];
  /** Drafts from 7 Oct 2026 on: one section per evaluation area. Null on older drafts. */
  evaluation_areas: Partial<Record<ToolkitAreaKey, SarAreaSection>> | null;
  /** Older drafts only, written under the pre-November 2025 judgements. */
  judgement_quality_of_education: SarJudgement | null;
  judgement_behaviour_attitudes: SarJudgement | null;
  judgement_personal_development: SarJudgement | null;
  judgement_leadership_management: SarJudgement | null;
  judgement_apprenticeships: SarJudgement | null;
  source_signals: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export function useSarDraft(academicYear?: string) {
  const [draft, setDraft] = useState<SarDraft | null>(null);
  const [drafts, setDrafts] = useState<SarDraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLatest = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id;
      if (!userId) {
        setDraft(null);
        setDrafts([]);
        return;
      }
      const collegeId = await getMyCollegeId(userId);
      if (!collegeId) {
        setDraft(null);
        setDrafts([]);
        return;
      }

      let query = supabase
        .from('college_sar_drafts')
        .select('*')
        .eq('college_id', collegeId)
        .order('created_at', { ascending: false });
      if (academicYear) query = query.eq('academic_year', academicYear);

      const { data, error: qErr } = await query;
      if (qErr) throw qErr;
      const rows = (data ?? []) as unknown as SarDraft[];
      setDrafts(rows);
      setDraft(rows.find((r) => r.status !== 'archived') ?? rows[0] ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [academicYear]);

  useEffect(() => {
    void fetchLatest();
  }, [fetchLatest]);

  const generate = useCallback(
    async (opts: { refresh?: boolean } = {}) => {
      setGenerating(true);
      setError(null);
      try {
        const { data, error: invokeErr } = await supabase.functions.invoke('ai-generate-sar', {
          body: {
            academic_year: academicYear,
            refresh: opts.refresh === true,
          },
        });
        if (invokeErr) throw invokeErr;
        const result = data as { draft?: SarDraft; cached?: boolean } | null;
        if (result?.draft) {
          setDraft(result.draft);
          await fetchLatest();
        }
        return result;
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg);
        throw e;
      } finally {
        setGenerating(false);
      }
    },
    [academicYear, fetchLatest]
  );

  const updateStatus = useCallback(
    async (id: string, status: SarStatus) => {
      const patch: Record<string, unknown> = { status };
      if (status === 'approved') {
        const { data: userRes } = await supabase.auth.getUser();
        patch.approved_by = userRes.user?.id ?? null;
        patch.approved_at = new Date().toISOString();
      }
      const { error: updErr } = await supabase
        .from('college_sar_drafts')
        .update(patch as never)
        .eq('id', id);
      if (updErr) throw updErr;
      await fetchLatest();
    },
    [fetchLatest]
  );

  const updateBody = useCallback(
    async (id: string, patch: Partial<SarDraft>) => {
      const { error: updErr } = await supabase
        .from('college_sar_drafts')
        .update(patch as never)
        .eq('id', id);
      if (updErr) throw updErr;
      await fetchLatest();
    },
    [fetchLatest]
  );

  return {
    draft,
    drafts,
    loading,
    generating,
    error,
    generate,
    updateStatus,
    updateBody,
    refetch: fetchLatest,
  };
}
