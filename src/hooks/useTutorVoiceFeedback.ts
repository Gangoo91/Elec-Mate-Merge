import { useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useTutorVoiceFeedback — invoke the ai-tutor-voice-feedback edge function.
   ELE-926 (H2).
   ========================================================================== */

export interface VoiceFeedbackResult {
  feedback: string;
  style_summary: string;
  samples_used: number;
  ac_summary?: string | null;
  facets_used?: number;
  regulations_cited?: string[];
  inclusion_summary?: {
    send_flags: string[];
    eal: boolean;
    differentiated: boolean;
  } | null;
}

export function useTutorVoiceFeedback() {
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<VoiceFeedbackResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (opts: {
      learnerWork: string;
      acCode?: string;
      qualificationCode?: string;
      kind?: 'portfolio' | 'quiz' | 'observation' | 'otj';
      learnerName?: string;
      studentId?: string;
    }) => {
      setGenerating(true);
      setError(null);
      try {
        const { data, error: invErr } = await supabase.functions.invoke(
          'ai-tutor-voice-feedback',
          {
            body: {
              learner_work: opts.learnerWork,
              ac_code: opts.acCode,
              qualification_code: opts.qualificationCode,
              kind: opts.kind,
              learner_name: opts.learnerName,
              student_id: opts.studentId,
            },
          }
        );
        if (invErr) throw invErr;
        const r = data as VoiceFeedbackResult;
        setResult(r);
        return r;
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        throw e;
      } finally {
        setGenerating(false);
      }
    },
    []
  );

  return { generate, generating, result, error, reset: () => setResult(null) };
}
