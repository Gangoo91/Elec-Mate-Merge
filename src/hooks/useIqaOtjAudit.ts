import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useIqaOtjAudit — IQA sampling queue + per-entry verdict recorder over
   assessor-verified OTJ entries.
   ELE-893 (A1).
   ========================================================================== */

export type IqaVerdict = 'agree' | 'partial' | 'disagree' | 'escalate';

export interface IqaOtjQueueRow {
  id: string;
  college_id: string;
  student_id: string;
  student_name: string | null;
  college_student_row_id: string | null;
  activity_date: string;
  title: string;
  description: string | null;
  duration_minutes: number;
  unit_codes: string[] | null;
  verified_by: string | null;
  verified_at: string | null;
  verification_rationale: string | null;
  days_since_verified: number | null;
}

export interface AssessorRollup {
  college_id: string;
  assessor_user_id: string;
  sampled_count: number;
  agree_count: number;
  partial_count: number;
  disagree_count: number;
  escalate_count: number;
  agree_pct: number | null;
  assessor_name?: string | null;
}

export function useIqaOtjAudit() {
  const [queue, setQueue] = useState<IqaOtjQueueRow[]>([]);
  const [rollup, setRollup] = useState<AssessorRollup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [queueRes, rollupRes] = await Promise.all([
        supabase
          .from('college_iqa_otj_audit_queue')
          .select('*')
          .order('verified_at', { ascending: true })
          .limit(100),
        supabase.from('college_iqa_otj_assessor_rollup').select('*'),
      ]);
      if (queueRes.error) throw queueRes.error;
      if (rollupRes.error) throw rollupRes.error;
      const rollupRows = (rollupRes.data ?? []) as AssessorRollup[];

      // Resolve assessor names from college_staff via user_id
      const assessorIds = rollupRows
        .map((r) => r.assessor_user_id)
        .filter((id): id is string => !!id);
      if (assessorIds.length > 0) {
        const { data: staffRows } = await supabase
          .from('college_staff')
          .select('user_id, name')
          .in('user_id', assessorIds);
        const nameByUserId = new Map<string, string>();
        for (const s of (staffRows ?? []) as Array<{ user_id: string; name: string }>) {
          nameByUserId.set(s.user_id, s.name);
        }
        for (const r of rollupRows) {
          r.assessor_name = nameByUserId.get(r.assessor_user_id) ?? null;
        }
      }

      setQueue((queueRes.data ?? []) as IqaOtjQueueRow[]);
      setRollup(rollupRows);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  const record = useCallback(
    async (
      entryId: string,
      verdict: IqaVerdict,
      feedback?: string,
      followupRequired = false
    ) => {
      const { error: rpcErr } = await supabase.rpc('record_iqa_otj_sample', {
        p_entry_id: entryId,
        p_verdict: verdict,
        p_feedback: feedback ?? null,
        p_followup_required: followupRequired,
      });
      if (rpcErr) throw rpcErr;
      await fetchAll();
    },
    [fetchAll]
  );

  return { queue, rollup, loading, error, record, refetch: fetchAll };
}
