import { useCallback, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useAiAssessor — calls the streaming `ai-assessor` edge function and surfaces
   partial state for the College Hub portfolio drawer. The assessor reviews
   the draft and can apply it to the submission with a single tap.
   ========================================================================== */

export type AiVerdict = 'pass' | 'partial' | 'refer' | 'not_yet';

export interface AiAcAnalysis {
  ac_code: string;
  status: 'evidenced' | 'partial' | 'missing';
  comment: string;
}

export interface AiAssessorDraft {
  verdict: AiVerdict;
  verdict_rationale: string;
  ac_analysis: AiAcAnalysis[];
  assessor_feedback: string;
  strengths_noted: string;
  areas_for_improvement: string;
}

export interface AiAssessorState {
  draft: AiAssessorDraft | null;
  partial: string;
  status: 'idle' | 'streaming' | 'done' | 'error';
  error: string | null;
  meta: {
    learner_name: string | null;
    evidence_count: number;
    observation_count: number;
  } | null;
}

const FUNCTIONS_URL =
  // import.meta.env.VITE_SUPABASE_URL is the canonical pattern in this repo
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ??
  'https://jtwygbeceundfgnkirof.supabase.co';

export function useAiAssessor() {
  const [state, setState] = useState<AiAssessorState>({
    draft: null,
    partial: '',
    status: 'idle',
    error: null,
    meta: null,
  });
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setState({ draft: null, partial: '', status: 'idle', error: null, meta: null });
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setState((s) => (s.status === 'streaming' ? { ...s, status: 'idle' } : s));
  }, []);

  const assess = useCallback(async (submissionId: string, instruction?: string) => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setState({ draft: null, partial: '', status: 'streaming', error: null, meta: null });

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error('Not signed in');

      const res = await fetch(`${FUNCTIONS_URL}/functions/v1/ai-assessor`, {
        method: 'POST',
        signal: ac.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ submission_id: submissionId, instruction: instruction ?? null }),
      });

      if (!res.ok || !res.body) {
        const errBody = await res.text().catch(() => '');
        throw new Error(errBody.slice(0, 200) || `Edge fn error ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const blocks = buffer.split('\n\n');
        buffer = blocks.pop() ?? '';
        for (const block of blocks) {
          const lines = block.split('\n');
          let event: string | null = null;
          let data = '';
          for (const line of lines) {
            if (line.startsWith('event:')) event = line.slice(6).trim();
            else if (line.startsWith('data:')) data += line.slice(5).trim();
          }
          if (!event) continue;
          if (event === 'open') {
            try {
              const meta = JSON.parse(data);
              setState((s) => ({ ...s, meta }));
            } catch {
              /* ignore */
            }
          } else if (event === 'token') {
            try {
              const { delta } = JSON.parse(data);
              if (typeof delta === 'string') {
                setState((s) => ({ ...s, partial: s.partial + delta }));
              }
            } catch {
              /* ignore */
            }
          } else if (event === 'done') {
            try {
              const payload = JSON.parse(data);
              setState((s) => ({
                ...s,
                draft: (payload.draft as AiAssessorDraft | null) ?? null,
                status: 'done',
              }));
            } catch {
              setState((s) => ({ ...s, status: 'done' }));
            }
          } else if (event === 'error') {
            try {
              const { error, detail } = JSON.parse(data);
              setState((s) => ({ ...s, status: 'error', error: detail || error || 'Failed' }));
            } catch {
              setState((s) => ({ ...s, status: 'error', error: 'Stream error' }));
            }
          }
        }
      }
    } catch (e) {
      if ((e as Error).name === 'AbortError') return;
      setState((s) => ({ ...s, status: 'error', error: (e as Error).message }));
    } finally {
      abortRef.current = null;
    }
  }, []);

  return { ...state, assess, stop, reset };
}
