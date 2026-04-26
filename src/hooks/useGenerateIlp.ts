import { useCallback, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { GoalCategory, GoalPriority } from '@/hooks/useStudentIlp';

/* ==========================================================================
   useGenerateIlp — streaming hook for the AI-tailored ILP generator.
   ========================================================================== */

export interface AiIlpGoalDraft {
  title: string;
  description: string;
  acceptance_criteria: string;
  target_date: string;
  category: GoalCategory;
  priority: GoalPriority;
}

export interface AiIlpDraft {
  headline_focus: string;
  headline_strengths: string;
  headline_areas: string;
  support_strategies: string;
  accessibility_adjustments: string;
  target_completion_date: string;
  review_date: string;
  goals: AiIlpGoalDraft[];
}

export interface GenerateIlpState {
  draft: AiIlpDraft | null;
  status: 'idle' | 'streaming' | 'done' | 'error';
  error: string | null;
  meta: {
    student_name: string | null;
    has_prior: boolean;
    prior_version: number | null;
  } | null;
}

const FUNCTIONS_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ??
  'https://jtwygbeceundfgnkirof.supabase.co';

export function useGenerateIlp() {
  const [state, setState] = useState<GenerateIlpState>({
    draft: null,
    status: 'idle',
    error: null,
    meta: null,
  });
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setState({ draft: null, status: 'idle', error: null, meta: null });
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setState((s) => (s.status === 'streaming' ? { ...s, status: 'idle' } : s));
  }, []);

  const generate = useCallback(async (studentId: string, instruction?: string) => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setState({ draft: null, status: 'streaming', error: null, meta: null });

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error('Not signed in');

      const res = await fetch(`${FUNCTIONS_URL}/functions/v1/ai-generate-ilp`, {
        method: 'POST',
        signal: ac.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ student_id: studentId, instruction: instruction ?? null }),
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
              setState((s) => ({ ...s, meta: JSON.parse(data) }));
            } catch {
              /* ignore */
            }
          } else if (event === 'done') {
            try {
              const payload = JSON.parse(data);
              setState((s) => ({
                ...s,
                draft: (payload.draft as AiIlpDraft | null) ?? null,
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

  return { ...state, generate, stop, reset };
}
