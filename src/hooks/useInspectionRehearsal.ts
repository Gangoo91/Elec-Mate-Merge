import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { AreaGradeKey, ToolkitAreaKey } from '@/components/college/quality/ComplianceToolkit';

/* ==========================================================================
   useInspectionRehearsal — Mate-as-inspector rehearsal sessions.
   ELE-921 (G1).
   ========================================================================== */

/** 'general' or one evaluation area (ELE-2021). Older rows may hold a legacy judgement key. */
export type RehearsalScenario = 'general' | ToolkitAreaKey;
export type LegacyRehearsalScenario =
  | 'quality_of_education'
  | 'behaviour_and_attitudes'
  | 'personal_development'
  | 'leadership_and_management'
  | 'apprenticeships';

export interface RehearsalAreaGrade {
  area: ToolkitAreaKey;
  grade: AreaGradeKey;
  reason: string;
}

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
  scenario: RehearsalScenario | LegacyRehearsalScenario;
  status: RehearsalStatus;
  turns: RehearsalTurn[];
  /** The focus area's grade (null for a general rehearsal). Rows before ELE-2021 hold outstanding … inadequate. */
  overall_verdict: string | null;
  /** A grade for each evaluation area the rehearsal probed. Null on older rows. */
  area_grades: RehearsalAreaGrade[] | null;
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
      setRehearsal((data as unknown as Rehearsal) ?? null);
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
      setHistory((data ?? []) as unknown as Rehearsal[]);
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
        const res = data as { rehearsal?: Rehearsal; auto_finished?: boolean };
        const r = res.rehearsal ?? null;
        if (r) setRehearsal(r);
        // At the answer limit the server writes the verdict in the same
        // request; refresh the history so the finished rehearsal shows there.
        if (res.auto_finished) await fetchHistory();
        return r;
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        throw e;
      } finally {
        setBusy(false);
      }
    },
    [rehearsal, fetchHistory]
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
