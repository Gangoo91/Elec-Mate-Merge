import { useCallback, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { EpaJudgement } from '@/hooks/useEpaReadiness';

/* ==========================================================================
   useAiEpaReadiness — streams the AI verdict from ai-epa-readiness.
   Phases: idle → streaming → done | error
   Surfaces the live "phase" + signals snapshot + final inserted judgement.
   ========================================================================== */

export type AiEpaPhase = 'idle' | 'streaming' | 'done' | 'error';
export type AiEpaStatusPhase =
  | 'loading_signals'
  | 'retrieving_bs7671'
  | 'reasoning'
  | 'persisting';

export interface AiEpaSignalsSnapshot {
  ac: { total: number; not_started: number; in_progress: number; evidenced: number; assessed: number; confirmed: number };
  otj: { total_minutes: number; required_minutes: number; pct: number | null };
  portfolio: { items: number; submissions: number; iqa_verified: number; awaiting_review: number; requires_action: number };
  mocks_count: number;
  observations_count: number;
  has_prior: { tutor: boolean; learner: boolean; ai: boolean };
}

export interface UseAiEpaReadiness {
  status: AiEpaPhase;
  statusPhase: AiEpaStatusPhase | null;
  signals: AiEpaSignalsSnapshot | null;
  facetsPulled: number | null;
  judgement: EpaJudgement | null;
  error: string | null;
  generate: (collegeStudentId: string, instruction?: string) => Promise<void>;
  reset: () => void;
  stop: () => void;
}

export function useAiEpaReadiness(): UseAiEpaReadiness {
  const [status, setStatus] = useState<AiEpaPhase>('idle');
  const [statusPhase, setStatusPhase] = useState<AiEpaStatusPhase | null>(null);
  const [signals, setSignals] = useState<AiEpaSignalsSnapshot | null>(null);
  const [facetsPulled, setFacetsPulled] = useState<number | null>(null);
  const [judgement, setJudgement] = useState<EpaJudgement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus('idle');
    setStatusPhase(null);
    setSignals(null);
    setFacetsPulled(null);
    setJudgement(null);
    setError(null);
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus('idle');
  }, []);

  const generate = useCallback(async (collegeStudentId: string, instruction?: string) => {
    reset();
    setStatus('streaming');
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) throw new Error('Not signed in');

      const res = await fetch(
        'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/ai-epa-readiness',
        {
          method: 'POST',
          signal: ctrl.signal,
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,
            accept: 'text/event-stream',
          },
          body: JSON.stringify({ college_student_id: collegeStudentId, instruction }),
        }
      );
      if (!res.ok || !res.body) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text.slice(0, 240)}`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buffer.indexOf('\n\n')) !== -1) {
          const block = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 2);
          if (!block.trim() || block.startsWith(':')) continue;
          const lines = block.split('\n');
          let event = 'message';
          let data = '';
          for (const ln of lines) {
            if (ln.startsWith('event:')) event = ln.slice(6).trim();
            else if (ln.startsWith('data:')) data += ln.slice(5).trim();
          }
          if (!data) continue;
          try {
            const payload = JSON.parse(data) as Record<string, unknown>;
            if (event === 'status') {
              const phase = payload.phase as AiEpaStatusPhase | undefined;
              if (phase) setStatusPhase(phase);
              if (typeof payload.facets_pulled === 'number') setFacetsPulled(payload.facets_pulled);
            } else if (event === 'signals') {
              setSignals(payload as unknown as AiEpaSignalsSnapshot);
            } else if (event === 'done') {
              setJudgement(((payload.judgement as unknown) as EpaJudgement) ?? null);
              setStatus('done');
            } else if (event === 'error') {
              setError(((payload.message as string) ?? 'AI error'));
              setStatus('error');
            }
          } catch {
            /* malformed line — skip */
          }
        }
      }
    } catch (e) {
      if ((e as { name?: string })?.name === 'AbortError') return;
      setError((e as Error).message ?? 'Failed to generate AI verdict');
      setStatus('error');
    } finally {
      abortRef.current = null;
    }
  }, [reset]);

  return { status, statusPhase, signals, facetsPulled, judgement, error, generate, reset, stop };
}
