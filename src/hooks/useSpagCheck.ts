import { useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useSpagCheck — score a piece of apprentice text for SpaG.
   ELE-895 (A3).
   ========================================================================== */

export type SpagSourceKind = 'portfolio' | 'otj' | 'quiz' | 'reflection' | 'manual';
export type SpagLevel = 'distinction' | 'merit' | 'pass' | 'developing';

export interface SpagIssue {
  kind: 'spelling' | 'grammar' | 'punctuation';
  original: string;
  suggestion: string;
  explanation: string;
  offset?: number;
  length?: number;
}

export interface SpagResult {
  spag_score: number;
  level_descriptor: SpagLevel;
  overall_feedback: string;
  issues: SpagIssue[];
  check_id: string | null;
}

export function useSpagCheck() {
  const [result, setResult] = useState<SpagResult | null>(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const check = useCallback(
    async (opts: {
      text: string;
      sourceKind: SpagSourceKind;
      sourceId?: string;
      studentId?: string;
      studentName?: string;
      persist?: boolean;
    }) => {
      setChecking(true);
      setError(null);
      try {
        const { data, error: invErr } = await supabase.functions.invoke('ai-spag-check', {
          body: {
            text: opts.text,
            source_kind: opts.sourceKind,
            source_id: opts.sourceId,
            student_id: opts.studentId,
            student_name: opts.studentName,
            persist: opts.persist !== false,
          },
        });
        if (invErr) throw invErr;
        const r = data as SpagResult;
        setResult(r);
        return r;
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        throw e;
      } finally {
        setChecking(false);
      }
    },
    []
  );

  return { check, checking, result, error, reset: () => setResult(null) };
}

export function useSpagHistory(studentId: string | null | undefined) {
  const [rows, setRows] = useState<
    Array<{
      id: string;
      spag_score: number;
      level_descriptor: SpagLevel;
      source_kind: SpagSourceKind;
      issue_count: number;
      created_at: string;
    }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!studentId) {
      setRows([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: qErr } = await supabase
        .from('college_spag_checks')
        .select('id, spag_score, level_descriptor, source_kind, issue_count, created_at')
        .eq('student_id', studentId)
        .order('created_at', { ascending: false })
        .limit(50);
      if (qErr) throw qErr;
      setRows((data ?? []) as any);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  return { rows, loading, error, fetch };
}
