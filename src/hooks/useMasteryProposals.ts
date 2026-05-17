import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useMasteryProposals — AC sign-off proposal queue for tutors.
   ELE-906 (B11).
   ========================================================================== */

export type ProposalStatus = 'pending' | 'approved' | 'rejected' | 'auto_approved' | 'expired';
export type EvidenceKind = 'quiz_attempt' | 'otj_entry' | 'portfolio_item' | 'observation' | 'manual';

export interface MasteryProposal {
  id: string;
  college_id: string;
  student_id: string;
  ac_id: string;
  ac_code: string | null;
  ac_title: string | null;
  evidence_kind: EvidenceKind;
  evidence_id: string | null;
  score_pct: number | null;
  threshold_pct: number | null;
  status: ProposalStatus;
  decided_by: string | null;
  decided_at: string | null;
  decision_notes: string | null;
  created_at: string;
  updated_at: string;
  student_name?: string | null;
}

export function useMasteryProposals(opts: { status?: ProposalStatus | 'all' } = {}) {
  const [proposals, setProposals] = useState<MasteryProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id;
      if (!userId) return;
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', userId)
        .maybeSingle();
      const collegeId = (profile as { college_id?: string } | null)?.college_id;
      if (!collegeId) return;

      let query = supabase
        .from('college_ac_signoff_proposals')
        .select('*, student:college_students(id, name)')
        .eq('college_id', collegeId)
        .order('created_at', { ascending: false })
        .limit(200);
      if (opts.status && opts.status !== 'all') {
        query = query.eq('status', opts.status);
      }

      const { data, error: qErr } = await query;
      if (qErr) throw qErr;
      const mapped: MasteryProposal[] = (data ?? []).map((r: any) => ({
        ...r,
        student_name: r.student?.name ?? null,
      }));
      setProposals(mapped);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [opts.status]);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  const decide = useCallback(
    async (proposalId: string, status: 'approved' | 'rejected', notes?: string) => {
      const { error: rpcErr } = await supabase.rpc('decide_ac_signoff', {
        p_proposal_id: proposalId,
        p_status: status,
        p_notes: notes ?? null,
      });
      if (rpcErr) throw rpcErr;
      await fetchAll();
    },
    [fetchAll]
  );

  return { proposals, loading, error, decide, refetch: fetchAll };
}

export async function proposeAcSignoff(opts: {
  studentId: string;
  acId: string;
  acCode?: string;
  acTitle?: string;
  evidenceKind: EvidenceKind;
  evidenceId?: string | null;
  scorePct: number;
}) {
  const { data, error } = await supabase.rpc('propose_ac_signoff', {
    p_student_id: opts.studentId,
    p_ac_id: opts.acId,
    p_ac_code: opts.acCode ?? null,
    p_ac_title: opts.acTitle ?? null,
    p_evidence_kind: opts.evidenceKind,
    p_evidence_id: opts.evidenceId ?? null,
    p_score_pct: opts.scorePct,
  });
  if (error) throw error;
  return data as string | null;
}
