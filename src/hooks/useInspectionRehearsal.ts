import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useInspectionRehearsal — Mate-as-inspector rehearsal sessions.
   ELE-921 (G1).
   ========================================================================== */

export type RehearsalScenario =
  | 'general'
  | 'quality_of_education'
  | 'behaviour_and_attitudes'
  | 'personal_development'
  | 'leadership_and_management'
  | 'apprenticeships'
  | 'safeguarding';

export type RehearsalStatus = 'active' | 'complete' | 'abandoned';
export type Grade = 'strong' | 'adequate' | 'insufficient';

export interface RehearsalTurn {
  role: 'inspector' | 'tutor';
  content: string;
  grade?: Grade;
  feedback?: string;
}

export interface Rehearsal {
  id: string;
  college_id: string;
  user_id: string;
  scenario: RehearsalScenario;
  status: RehearsalStatus;
  turns: RehearsalTurn[];
  overall_verdict: 'outstanding' | 'good' | 'requires_improvement' | 'inadequate' | null;
  verdict_summary: string | null;
  strengths: string[] | null;
  weaknesses: string[] | null;
  source_signals: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export function useInspectionRehearsal(rehearsalId?: string) {
  const [rehearsal, setRehearsal] = useState<Rehearsal | null>(null);
  const [history, setHistory] = useState<Rehearsal[]>([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOne = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: qErr } = await supabase
        .from('college_inspection_rehearsals')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (qErr) throw qErr;
      setRehearsal((data as Rehearsal) ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id;
      if (!userId) return;
      const { data, error: qErr } = await supabase
        .from('college_inspection_rehearsals')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20);
      if (qErr) throw qErr;
      setHistory((data ?? []) as Rehearsal[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, []);

  useEffect(() => {
    if (rehearsalId) void fetchOne(rehearsalId);
    void fetchHistory();
  }, [rehearsalId, fetchOne, fetchHistory]);

  const start = useCallback(
    async (scenario: RehearsalScenario = 'general') => {
      setBusy(true);
      setError(null);
      try {
        const { data, error: invErr } = await supabase.functions.invoke(
          'ai-inspection-rehearsal',
          { body: { action: 'start', scenario } }
        );
        if (invErr) throw invErr;
        const r = (data as { rehearsal?: Rehearsal }).rehearsal ?? null;
        setRehearsal(r);
        await fetchHistory();
        return r;
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        throw e;
      } finally {
        setBusy(false);
      }
    },
    [fetchHistory]
  );

  const respond = useCallback(
    async (message: string) => {
      if (!rehearsal) return;
      setBusy(true);
      setError(null);
      try {
        const { data, error: invErr } = await supabase.functions.invoke(
          'ai-inspection-rehearsal',
          {
            body: { action: 'respond', rehearsal_id: rehearsal.id, message },
          }
        );
        if (invErr) throw invErr;
        const r = (data as { rehearsal?: Rehearsal }).rehearsal ?? null;
        if (r) setRehearsal(r);
        return r;
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        throw e;
      } finally {
        setBusy(false);
      }
    },
    [rehearsal]
  );

  const finish = useCallback(async () => {
    if (!rehearsal) return;
    setBusy(true);
    setError(null);
    try {
      const { data, error: invErr } = await supabase.functions.invoke(
        'ai-inspection-rehearsal',
        { body: { action: 'finish', rehearsal_id: rehearsal.id } }
      );
      if (invErr) throw invErr;
      const r = (data as { rehearsal?: Rehearsal }).rehearsal ?? null;
      if (r) setRehearsal(r);
      await fetchHistory();
      return r;
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      throw e;
    } finally {
      setBusy(false);
    }
  }, [rehearsal, fetchHistory]);

  return { rehearsal, history, loading, busy, error, start, respond, finish, refetch: fetchHistory };
}
