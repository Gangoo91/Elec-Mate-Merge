/**
 * useCaptureAssistant — client for the capture-assistant edge function (ELE-1927).
 *
 * Everything it returns is a suggestion: criteria come back as "Suggested"
 * chips the learner taps to claim (untapped ones are saved as
 * source='ai_suggested'), the reflective account is a draft with one tap to
 * use, the test-sheet ask is a prompt, and the next job is advice. Nothing is
 * claimed or saved by this hook.
 */
import { useCallback, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AssistCriterion {
  unit_code: string;
  ac_code: string;
  ac_text: string;
  reason: string;
}

export interface CaptureAssist {
  source: 'ai_suggested';
  model: string;
  criteria: AssistCriterion[];
  reflection: string;
  testSheet: { needed: boolean; ask: string };
  nextJob: {
    title: string;
    why: string;
    covers: Array<{ unit_code: string; ac_code: string; ac_text: string }>;
  } | null;
  openGaps: number;
  regs: Array<{ reg: string; title: string }>;
}

export interface CaptureAssistInput {
  transcript?: string;
  title?: string;
  description?: string;
  files: Array<{
    type?: string;
    evidenceType?: string;
    description?: string;
    elements?: string[];
    workType?: string;
  }>;
  matched: Array<{ unit_code: string; ac_code: string }>;
  hasTestSheet: boolean;
}

export function useCaptureAssistant() {
  const [result, setResult] = useState<CaptureAssist | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const seq = useRef(0);

  const run = useCallback(async (input: CaptureAssistInput) => {
    const mine = ++seq.current;
    setLoading(true);
    setError(null);
    try {
      const { data, error: e } = await supabase.functions.invoke('capture-assistant', {
        body: input,
      });
      if (mine !== seq.current) return null;
      if (e) throw e;
      if (!data || (data as { error?: string }).error)
        throw new Error((data as { error?: string })?.error ?? 'No reply');
      setResult(data as CaptureAssist);
      return data as CaptureAssist;
    } catch (err) {
      if (mine === seq.current)
        setError(err instanceof Error ? err.message : 'The assistant could not run');
      return null;
    } finally {
      if (mine === seq.current) setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    seq.current += 1;
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return { result, loading, error, run, reset };
}
