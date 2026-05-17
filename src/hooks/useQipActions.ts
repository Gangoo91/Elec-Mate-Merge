import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useQipActions — Quality Improvement Plan action CRUD.
   ELE-923 (G3). Pairs with the SAR — each SAR finding can spawn QIP actions.
   ========================================================================== */

export type QipStatus = 'planned' | 'in_progress' | 'blocked' | 'completed' | 'cancelled';
export type QipPriority = 'urgent' | 'high' | 'medium' | 'low';
export type QipJudgement =
  | 'quality_of_education'
  | 'behaviour_and_attitudes'
  | 'personal_development'
  | 'leadership_and_management'
  | 'apprenticeships'
  | 'cross_cutting';

export interface QipAction {
  id: string;
  college_id: string;
  sar_draft_id: string | null;
  judgement_key: QipJudgement;
  title: string;
  description: string | null;
  rationale: string | null;
  owner_staff_id: string | null;
  target_date: string | null;
  status: QipStatus;
  priority: QipPriority;
  progress_percent: number;
  evidence_links: string[];
  outcome_notes: string | null;
  created_by: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface QipActionInput {
  judgement_key: QipJudgement;
  title: string;
  description?: string;
  rationale?: string;
  owner_staff_id?: string | null;
  target_date?: string | null;
  status?: QipStatus;
  priority?: QipPriority;
  progress_percent?: number;
  evidence_links?: string[];
  outcome_notes?: string | null;
  sar_draft_id?: string | null;
}

export function useQipActions(opts: { sarDraftId?: string } = {}) {
  const [actions, setActions] = useState<QipAction[]>([]);
  const [collegeId, setCollegeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id;
      if (!userId) {
        setActions([]);
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', userId)
        .maybeSingle();
      const cId = (profile as { college_id?: string } | null)?.college_id ?? null;
      setCollegeId(cId);
      if (!cId) {
        setActions([]);
        return;
      }

      let query = supabase
        .from('college_qip_actions')
        .select('*')
        .eq('college_id', cId)
        .order('target_date', { ascending: true, nullsFirst: false });
      if (opts.sarDraftId) query = query.eq('sar_draft_id', opts.sarDraftId);

      const { data, error: qErr } = await query;
      if (qErr) throw qErr;
      setActions((data ?? []) as QipAction[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [opts.sarDraftId]);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  const create = useCallback(
    async (input: QipActionInput) => {
      if (!collegeId) throw new Error('No college on profile');
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id ?? null;
      const { error: insErr } = await supabase.from('college_qip_actions').insert({
        college_id: collegeId,
        sar_draft_id: input.sar_draft_id ?? null,
        judgement_key: input.judgement_key,
        title: input.title,
        description: input.description ?? null,
        rationale: input.rationale ?? null,
        owner_staff_id: input.owner_staff_id ?? null,
        target_date: input.target_date ?? null,
        status: input.status ?? 'planned',
        priority: input.priority ?? 'medium',
        progress_percent: input.progress_percent ?? 0,
        evidence_links: input.evidence_links ?? [],
        outcome_notes: input.outcome_notes ?? null,
        created_by: userId,
      });
      if (insErr) throw insErr;
      await fetchAll();
    },
    [collegeId, fetchAll]
  );

  const update = useCallback(
    async (id: string, patch: Partial<QipAction>) => {
      const merged: Record<string, unknown> = { ...patch };
      if (patch.status === 'completed' && !patch.completed_at) {
        merged.completed_at = new Date().toISOString();
      }
      const { error: updErr } = await supabase
        .from('college_qip_actions')
        .update(merged)
        .eq('id', id);
      if (updErr) throw updErr;
      await fetchAll();
    },
    [fetchAll]
  );

  const remove = useCallback(
    async (id: string) => {
      const { error: delErr } = await supabase.from('college_qip_actions').delete().eq('id', id);
      if (delErr) throw delErr;
      await fetchAll();
    },
    [fetchAll]
  );

  return { actions, loading, error, create, update, remove, refetch: fetchAll };
}
