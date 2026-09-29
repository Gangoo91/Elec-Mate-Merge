/**
 * Ask room-diagram-generator for a plan, with live progress (28 Sep 2026).
 *
 * Reading a whole building takes 30-60 seconds. Behind a spinner that feels
 * broken; with "found 34 rooms on 2 floors — designing the electrics, 12 of 34"
 * it feels like work being done. The function streams those steps as JSON
 * lines when asked (`stream: true`).
 *
 * If streaming is unavailable for any reason — an older deployed function, a
 * proxy that buffers, a network that drops the long response — this falls back
 * to the ordinary call, which also carries the server's single-call fallback.
 * The caller always gets a result or a clear error, never a stuck screen.
 */
import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';

export type PlanProgress =
  | { stage: 'reading'; pages: number }
  | { stage: 'rooms'; rooms: number; floors: string[] }
  | { stage: 'electrics'; done: number; total: number };

/** What the read has reported so far — kept by the caller across events. */
export interface PlanProgressState {
  found: { rooms: number; floors: string[] } | null;
  electrics: { done: number; total: number } | null;
}

export const EMPTY_PROGRESS: PlanProgressState = { found: null, electrics: null };

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- the canvas takes the generator's own shape
type PlanData = any;

async function plainCall(body: Record<string, unknown>, signal?: AbortSignal): Promise<PlanData> {
  const { data, error } = await supabase.functions.invoke('room-diagram-generator', {
    body,
    signal,
  });
  if (error) {
    // The function explains itself in its body; surface that, not "non-2xx".
    const detail = await (error as { context?: Response }).context?.json?.().catch(() => null);
    throw new Error(detail?.error || error.message);
  }
  if (!data?.success) throw new Error(data?.error || 'Could not read the plan');
  return data.roomData ?? data;
}

/**
 * Answers the reader gave on purpose. Asking again re-runs the whole read —
 * a minute and a full Gemini bill — for the same answer.
 */
const FINAL_ANSWER =
  /no (readable )?rooms|not a (floor )?plan|too (large|big)|unsupported|at most/i;

/** Did the request fail on the way (drop, reset, parse), rather than get an answer? */
const isTransport = (err: unknown) =>
  err instanceof TypeError || // fetch / WebKit "Load failed" / network
  err instanceof SyntaxError; // a torn JSON line

export async function generatePlan(
  body: Record<string, unknown>,
  onProgress?: (p: PlanProgress) => void,
  signal?: AbortSignal
): Promise<PlanData> {
  const retry = () => {
    if (signal?.aborted) throw new DOMException('Cancelled', 'AbortError');
    return plainCall(body, signal);
  };
  let res: Response;
  try {
    const { data: session } = await supabase.auth.getSession();
    res = await fetch(`${SUPABASE_URL}/functions/v1/room-diagram-generator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${session.session?.access_token ?? SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ ...body, stream: true }),
      signal,
    });
  } catch (err) {
    if (signal?.aborted) throw err;
    return retry();
  }

  const isStream = (res.headers.get('content-type') ?? '').includes('ndjson');
  if (!res.ok || !isStream || !res.body) {
    if (res.status === 401) throw new Error('Please sign in again.');
    // A refusal (400, 413…) is an answer: say it, don't send it all again.
    if (res.status >= 400 && res.status < 500) {
      const detail = await res.json().catch(() => null);
      throw new Error(detail?.error || `The plan could not be read (${res.status}).`);
    }
    // A plain answer (a function that doesn't stream): use it, don't pay again.
    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (data?.success === false) throw new Error(data.error || 'Could not read the plan');
      if (data) return data.roomData ?? data;
    }
    // The server fell over: one more go.
    return retry();
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let nl = buffer.indexOf('\n');
      while (nl >= 0) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        nl = buffer.indexOf('\n');
        if (!line) continue;
        const event = JSON.parse(line);
        if (event.stage === 'done') return event.result?.roomData;
        if (event.stage === 'error') {
          // An answer ("no rooms on this page") will not change on a retry;
          // only a stumble (the model overloaded, a timeout) gets another go.
          if (event.retryable === false || FINAL_ANSWER.test(String(event.error ?? ''))) {
            throw new Error(event.error);
          }
          return retry();
        }
        onProgress?.(event as PlanProgress);
      }
    }
    // A last line with no newline after it.
    const tail = buffer.trim();
    if (tail) {
      const event = JSON.parse(tail);
      if (event.stage === 'done') return event.result?.roomData;
    }
  } catch (err) {
    if (signal?.aborted) throw err;
    if (!isTransport(err)) throw err;
    return retry();
  }
  // The stream closed without a result — the connection dropped mid-read.
  return retry();
}
