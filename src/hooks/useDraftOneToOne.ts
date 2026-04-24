import { useCallback, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Streaming hook for AI-drafted 1-2-1 agendas.
 *
 * Usage pattern:
 *   const { draft, streaming, phase, text, error, reset } = useDraftOneToOne();
 *   draft(studentId, onDelta => { ... }); // streams directly
 *   // or just read `text` + `streaming` off the hook for the latest state.
 */
export function useDraftOneToOne() {
  const [streaming, setStreaming] = useState(false);
  const [phase, setPhase] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const bufferRef = useRef('');
  const rafScheduledRef = useRef(false);

  const scheduleFlush = useCallback(() => {
    if (rafScheduledRef.current) return;
    rafScheduledRef.current = true;
    requestAnimationFrame(() => {
      rafScheduledRef.current = false;
      if (bufferRef.current) {
        const add = bufferRef.current;
        bufferRef.current = '';
        setText((t) => t + add);
      }
    });
  }, []);

  const reset = useCallback(() => {
    setStreaming(false);
    setPhase(null);
    setText('');
    setError(null);
    bufferRef.current = '';
  }, []);

  const draft = useCallback(
    async (
      studentId: string,
      opts?: {
        focus?: string[];
        onDelta?: (delta: string, accumulated: string) => void;
      }
    ) => {
      setStreaming(true);
      setPhase('starting');
      setText('');
      setError(null);
      bufferRef.current = '';

      try {
        const session = await supabase.auth.getSession();
        const token = session.data.session?.access_token;
        if (!token) throw new Error('Not signed in');

        const res = await fetch(
          'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/draft-one-to-one-agenda',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${token}`,
              accept: 'text/event-stream',
            },
            body: JSON.stringify({
              student_id: studentId,
              focus: opts?.focus,
            }),
          }
        );
        if (!res.ok || !res.body) {
          const t = await res.text();
          throw new Error(`HTTP ${res.status}: ${t.slice(0, 300)}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';
        let buf = '';
        let streamError: string | null = null;

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const frames = buf.split('\n\n');
          buf = frames.pop() ?? '';
          for (const frame of frames) {
            const lines = frame.split('\n');
            let eventType = 'message';
            const dataLines: string[] = [];
            for (const line of lines) {
              if (line.startsWith('event: ')) eventType = line.slice(7).trim();
              else if (line.startsWith('data: ')) dataLines.push(line.slice(6));
            }
            if (dataLines.length === 0) continue;
            let parsed: Record<string, unknown>;
            try {
              parsed = JSON.parse(dataLines.join('\n'));
            } catch {
              continue;
            }

            if (eventType === 'status') {
              setPhase(parsed.phase as string);
            } else if (eventType === 'chunk') {
              const delta = parsed.delta as string;
              if (delta) {
                accumulated += delta;
                bufferRef.current += delta;
                scheduleFlush();
                opts?.onDelta?.(delta, accumulated);
              }
            } else if (eventType === 'done') {
              // no-op; finalisation happens after the loop
            } else if (eventType === 'error') {
              streamError = (parsed.message as string) ?? 'Unknown error';
            }
          }
        }

        // Flush any residual buffer
        if (bufferRef.current) {
          const tail = bufferRef.current;
          bufferRef.current = '';
          setText((t) => t + tail);
        }

        if (streamError) throw new Error(streamError);
        return accumulated;
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg);
        throw e;
      } finally {
        setStreaming(false);
        setPhase(null);
      }
    },
    [scheduleFlush]
  );

  return { draft, streaming, phase, text, error, reset };
}
