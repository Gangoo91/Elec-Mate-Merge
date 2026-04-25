import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useIqaFindings — list + create + close findings raised by IQAs.
   Realtime-subscribed.
   ========================================================================== */

export type FindingType = 'commendation' | 'observation' | 'action' | 'concern';
export type FindingStatus = 'open' | 'in_progress' | 'closed' | 'escalated';
export type FindingSeverity = 'minor' | 'major' | 'critical';

export interface IqaFinding {
  id: string;
  college_id: string | null;
  iqa_id: string | null;
  iqa_name_snapshot: string | null;
  assessor_id: string | null;
  assessor_name: string;
  observation_id: string | null;
  finding_type: FindingType;
  severity: FindingSeverity | null;
  description: string;
  status: FindingStatus;
  action_plan: string | null;
  due_date: string | null;
  resolution_notes: string | null;
  closed_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface NewIqaFinding {
  iqa_id?: string | null;
  assessor_id?: string | null;
  assessor_name: string;
  observation_id?: string | null;
  finding_type: FindingType;
  severity?: FindingSeverity | null;
  description: string;
  action_plan?: string | null;
  due_date?: string | null;
}

const COLS =
  'id, college_id, iqa_id, iqa_name_snapshot, assessor_id, assessor_name, observation_id, finding_type, severity, description, status, action_plan, due_date, resolution_notes, closed_at, created_at, updated_at';

export function useIqaFindings() {
  const [findings, setFindings] = useState<IqaFinding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('college_iqa_findings')
      .select(COLS)
      .order('created_at', { ascending: false });
    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    setFindings((data ?? []) as IqaFinding[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    const channel = supabase
      .channel('iqa_findings')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'college_iqa_findings' },
        () => fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetch]);

  const create = useCallback(async (input: NewIqaFinding) => {
    const { data: userData } = await supabase.auth.getUser();
    let collegeId: string | null = null;
    if (userData.user?.id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', userData.user.id)
        .maybeSingle();
      collegeId = (profile?.college_id as string | null) ?? null;
    }
    const { error: insErr } = await supabase
      .from('college_iqa_findings')
      .insert({
        college_id: collegeId,
        iqa_id: input.iqa_id ?? null,
        assessor_id: input.assessor_id ?? null,
        assessor_name: input.assessor_name,
        observation_id: input.observation_id ?? null,
        finding_type: input.finding_type,
        severity: input.severity ?? null,
        description: input.description,
        status: 'open',
        action_plan: input.action_plan ?? null,
        due_date: input.due_date ?? null,
      });
    if (insErr) throw insErr;
  }, []);

  const close = useCallback(async (id: string, resolutionNotes: string) => {
    const { error: updErr } = await supabase
      .from('college_iqa_findings')
      .update({
        status: 'closed',
        closed_at: new Date().toISOString(),
        resolution_notes: resolutionNotes.trim() || null,
      })
      .eq('id', id);
    if (updErr) throw updErr;
  }, []);

  const remove = useCallback(async (id: string) => {
    const { error: delErr } = await supabase
      .from('college_iqa_findings')
      .delete()
      .eq('id', id);
    if (delErr) throw delErr;
  }, []);

  return { findings, loading, error, refresh: fetch, create, close, remove };
}
