import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type {
  GenerateLessonInput,
  GeneratedLessonPlan,
  GenerateLessonResult,
} from '@/hooks/useCurriculum';

/* ==========================================================================
   useLessonGenerationStream (7 Oct 2026)

   Drives the live generation inside LessonGeneratorDialog. Same SSE stream
   as useGenerateLesson (curriculum-generate-lesson), but it keeps what the
   dialog needs to show the plan being built, and nothing it doesn't:

   - every status phase the function emits, with the time it arrived;
   - the regulation sources from `rag_preview`;
   - the plan's tool-call JSON as it streams, parsed leniently every few
     hundred ms so objectives and activities can appear as cards;
   - the briefing's markdown headings as they are written;
   - a real cancel (AbortController), which the function also listens for.

   Nothing here invents progress: a stage is only "done" when an event that
   proves it has arrived.
   ========================================================================== */

export interface LessonGenerationInput extends GenerateLessonInput {
  /** Ofsted flags. Override the college's curriculum settings when sent. */
  include_british_values?: boolean;
  include_stretch_challenge?: boolean;
  include_inclusive_practice?: boolean;
  /** Learners in the room, when it differs from the cohort roll. */
  group_size?: number | null;
  /** What the room has: "Isolation rigs", "Multifunction testers" … */
  room_equipment?: string[];
  /** Free text from the tutor: "They struggled with R1+R2 last week". */
  tutor_note?: string | null;
}

export interface StreamSource {
  key: string;
  document_type: 'bs7671' | 'gn3' | 'osg';
  reg_number: string | null;
  topic: string | null;
  facet_ids: string[];
}

export type GenerationStatus = 'idle' | 'running' | 'done' | 'error' | 'cancelled';

export interface GenerationState {
  status: GenerationStatus;
  /** Phases in arrival order, with ms since start. */
  phases: { phase: string; at: number; meta: Record<string, unknown> }[];
  sources: StreamSource[] | null;
  /** Lenient parse of the plan JSON so far. */
  partialPlan: Partial<GeneratedLessonPlan> | null;
  planChars: number;
  planComplete: boolean;
  planRetrying: boolean;
  briefHeadings: string[];
  briefComplete: boolean;
  result: (GenerateLessonResult & { save_error?: string | null }) | null;
  error: string | null;
  startedAt: number | null;
  finishedAt: number | null;
}

const INITIAL: GenerationState = {
  status: 'idle',
  phases: [],
  sources: null,
  partialPlan: null,
  planChars: 0,
  planComplete: false,
  planRetrying: false,
  briefHeadings: [],
  briefComplete: false,
  result: null,
  error: null,
  startedAt: null,
  finishedAt: null,
};

const FN_URL = 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/curriculum-generate-lesson';

/** Plain words for the errors a tutor can actually see. */
export function friendlyGenerationError(raw: string): string {
  if (/not signed in|unauthori[sz]ed|HTTP 401/i.test(raw))
    return 'Your session has expired. Sign in again and retry.';
  if (/no_college|HTTP 403/i.test(raw))
    return 'Your account is not linked to a college, so plans cannot be built yet.';
  if (/No BS 7671/i.test(raw))
    return 'No regulation sources matched these criteria. Try adding a criterion or two.';
  if (/ACs not found|Qualification not found/i.test(raw))
    return 'Those criteria could not be found for this unit.';
  if (/invalid JSON|ended without/i.test(raw))
    return 'The plan came back incomplete. Retrying usually fixes it.';
  if (/connection|network|failed to fetch|body/i.test(raw))
    return 'The connection dropped while the plan was being written.';
  return 'Something went wrong while the plan was being written.';
}

export function useLessonGenerationStream() {
  const [state, setState] = useState<GenerationState>(INITIAL);
  const abortRef = useRef<AbortController | null>(null);

  // Buffers flushed on a timer, so a flood of tokens is one render per tick.
  const planRawRef = useRef('');
  const briefRawRef = useRef('');
  const dirtyRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const stopTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const flush = useCallback(() => {
    if (!dirtyRef.current) return;
    dirtyRef.current = false;
    const raw = planRawRef.current;
    const parsed = raw ? parsePartialJson(raw) : null;
    const headings = Array.from(briefRawRef.current.matchAll(/^##\s+(.+)$/gm)).map((m) =>
      m[1].trim()
    );
    setState((s) => ({
      ...s,
      partialPlan: (parsed as Partial<GeneratedLessonPlan> | null) ?? s.partialPlan,
      planChars: raw.length,
      briefHeadings: headings,
    }));
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  // Closing the sheet mid-run stops the run.
  useEffect(
    () => () => {
      abortRef.current?.abort();
      stopTimer();
    },
    []
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    stopTimer();
    planRawRef.current = '';
    briefRawRef.current = '';
    setState(INITIAL);
  }, []);

  const start = useCallback(
    async (input: LessonGenerationInput) => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      planRawRef.current = '';
      briefRawRef.current = '';
      dirtyRef.current = false;
      const t0 = Date.now();
      setState({ ...INITIAL, status: 'running', startedAt: t0 });
      stopTimer();
      timerRef.current = window.setInterval(flush, 250);

      const addPhase = (
        phase: string,
        meta: Record<string, unknown>,
        extra?: Partial<GenerationState>
      ) =>
        setState((s) => ({
          ...s,
          ...extra,
          phases: [...s.phases, { phase, at: Date.now() - t0, meta }],
        }));

      try {
        const session = await supabase.auth.getSession();
        const token = session.data.session?.access_token;
        if (!token) throw new Error('Not signed in');

        const res = await fetch(FN_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,
            accept: 'text/event-stream',
          },
          body: JSON.stringify(input),
          signal: ctrl.signal,
        });
        if (!res.ok || !res.body) {
          const text = await res.text().catch(() => '');
          throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buf = '';
        let final: GenerationState['result'] = null;
        let streamError: string | null = null;

        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const frames = buf.split('\n\n');
          buf = frames.pop() ?? '';
          for (const frame of frames) {
            let event = 'message';
            const data: string[] = [];
            for (const line of frame.split('\n')) {
              if (line.startsWith('event: ')) event = line.slice(7).trim();
              else if (line.startsWith('data: ')) data.push(line.slice(6));
            }
            if (data.length === 0) continue;
            let p: Record<string, unknown>;
            try {
              p = JSON.parse(data.join('\n'));
            } catch {
              continue;
            }

            if (event === 'status') {
              const phase = String(p.phase ?? '');
              if (phase === 'plan_retrying') {
                // The function restarts the plan from scratch.
                planRawRef.current = '';
                dirtyRef.current = true;
                addPhase(phase, p, { planRetrying: true, partialPlan: null, planChars: 0 });
              } else {
                addPhase(phase, p);
              }
            } else if (event === 'rag_preview') {
              setState((s) => ({ ...s, sources: dedupeSources(p.facets) }));
            } else if (event === 'brief_chunk') {
              if (typeof p.delta === 'string') {
                briefRawRef.current += p.delta;
                dirtyRef.current = true;
              }
            } else if (event === 'brief_complete') {
              dirtyRef.current = true;
              flush();
              setState((s) => ({ ...s, briefComplete: true }));
            } else if (event === 'plan_chunk') {
              if (typeof p.delta === 'string') {
                planRawRef.current += p.delta;
                dirtyRef.current = true;
              }
            } else if (event === 'plan_complete') {
              dirtyRef.current = true;
              flush();
              setState((s) => ({ ...s, planComplete: true, planRetrying: false }));
            } else if (event === 'done') {
              final = {
                lesson_plan_id: (p.lesson_plan_id as string | null) ?? null,
                facets_used: Number(p.facets_used ?? 0),
                plan: p.plan as GeneratedLessonPlan,
                save_error: (p.save_error as string | null) ?? null,
              };
            } else if (event === 'error') {
              streamError = String(p.message ?? 'Unknown stream error');
            }
          }
        }

        stopTimer();
        if (streamError) throw new Error(streamError);
        if (!final) throw new Error('Stream ended without completion');
        const result = final;
        setState((s) => ({
          ...s,
          status: 'done',
          result,
          partialPlan: result.plan,
          finishedAt: Date.now(),
        }));
        return result;
      } catch (e) {
        stopTimer();
        if (ctrl.signal.aborted) {
          setState((s) => ({ ...s, status: 'cancelled', finishedAt: Date.now() }));
          return null;
        }
        const msg = e instanceof Error ? e.message : String(e);
        setState((s) => ({ ...s, status: 'error', error: msg, finishedAt: Date.now() }));
        return null;
      }
    },
    [flush]
  );

  return { state, start, cancel, reset };
}

/** One row per document + section; topics kept from the best-ranked facet. */
function dedupeSources(raw: unknown): StreamSource[] {
  if (!Array.isArray(raw)) return [];
  const out = new Map<string, StreamSource>();
  for (const f of raw as {
    facet_id?: string;
    document_type?: string;
    reg_number?: string | null;
    primary_topic?: string | null;
  }[]) {
    const doc = f.document_type;
    if (doc !== 'bs7671' && doc !== 'gn3' && doc !== 'osg') continue;
    const key = `${doc}:${f.reg_number ?? f.primary_topic ?? f.facet_id}`;
    const existing = out.get(key);
    if (existing) {
      if (f.facet_id) existing.facet_ids.push(f.facet_id);
      continue;
    }
    out.set(key, {
      key,
      document_type: doc,
      reg_number: f.reg_number ?? null,
      topic: f.primary_topic ?? null,
      facet_ids: f.facet_id ? [f.facet_id] : [],
    });
  }
  return Array.from(out.values());
}

/**
 * Parses JSON that is still being written: closes the open string, arrays
 * and objects, and if that still fails, backs off to the last complete value
 * and tries again. Returns null when nothing usable has arrived yet.
 */
export function parsePartialJson(raw: string): unknown {
  let s = raw.trimStart();
  if (!s.startsWith('{')) return null;
  for (let attempt = 0; attempt < 6 && s.length > 1; attempt++) {
    const closed = closeJson(s);
    if (closed !== null) {
      try {
        return JSON.parse(closed);
      } catch {
        /* back off below */
      }
    }
    const cut = lastCutPoint(s);
    if (cut <= 0) return null;
    s = s.slice(0, cut);
  }
  return null;
}

function closeJson(src: string): string | null {
  let s = src.replace(/\\u[0-9a-fA-F]{0,3}$/, '');
  const stack: string[] = [];
  let inString = false;
  let esc = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inString) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') inString = true;
    else if (c === '{' || c === '[') stack.push(c);
    else if (c === '}' || c === ']') stack.pop();
  }
  if (inString) {
    if (esc) s = s.slice(0, -1);
    s += '"';
  }
  s = s.replace(/[\s,]+$/, '');
  if (/:\s*$/.test(s)) s += 'null';
  while (stack.length) s += stack.pop() === '{' ? '}' : ']';
  return s;
}

/** Index of the last comma outside a string, i.e. the end of the last whole value. */
function lastCutPoint(s: string): number {
  let inString = false;
  let esc = false;
  let last = -1;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inString) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') inString = true;
    else if (c === ',') last = i;
  }
  return last;
}
