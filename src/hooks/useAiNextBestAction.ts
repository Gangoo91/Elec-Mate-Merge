import { useCallback, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useAiNextBestAction — streaming hook for the AI Next Best Action panel.
   Call .compute(studentId) to fetch a fresh prioritised action list.
   ========================================================================== */

export type ActionKind =
  | 'schedule_one_to_one'
  | 'log_observation'
  | 'send_message'
  | 'add_pastoral_note'
  | 'log_otj'
  | 'review_portfolio'
  | 'edit_ilp'
  | 'add_ilp_goal'
  | 'log_attendance'
  | 'add_evidence'
  | 'escalate_safeguarding'
  | 'praise'
  | 'other';

export type ActionPriority = 'high' | 'medium' | 'low';

export interface NextAction {
  title: string;
  why: string;
  priority: ActionPriority;
  kind: ActionKind;
  detail?: string;
}

export interface NextBestActionPlan {
  summary: string;
  actions: NextAction[];
}

export interface NextBestActionState {
  plan: NextBestActionPlan | null;
  status: 'idle' | 'streaming' | 'done' | 'error';
  error: string | null;
  meta: { student_name: string | null; risk_level: string | null } | null;
}

const FUNCTIONS_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ??
  'https://jtwygbeceundfgnkirof.supabase.co';

export function useAiNextBestAction() {
  const [state, setState] = useState<NextBestActionState>({
    plan: null,
    status: 'idle',
    error: null,
    meta: null,
  });
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setState({ plan: null, status: 'idle', error: null, meta: null });
  }, []);

  const compute = useCallback(async (studentId: string) => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setState({ plan: null, status: 'streaming', error: null, meta: null });

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error('Not signed in');

      const res = await fetch(`${FUNCTIONS_URL}/functions/v1/ai-next-best-action`, {
        method: 'POST',
        signal: ac.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ student_id: studentId }),
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
                plan: (payload.plan as NextBestActionPlan | null) ?? null,
                status: 'done',
              }));
            } catch {
              setState((s) => ({ ...s, status: 'done' }));
            }
          } else if (event === 'error') {
            try {
              const { error, detail } = JSON.parse(data);
              setState((s) => ({
                ...s,
                status: 'error',
                error: detail || error || 'Failed',
              }));
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

  return { ...state, compute, reset };
}
