import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const STORAGE_PREFIX = 'jobIdeas.v1.';

function cacheKey(args: { student_id: string; ac_codes_focus?: string[]; count?: number }) {
  const codes = (args.ac_codes_focus ?? []).slice().sort().join(',');
  return `${STORAGE_PREFIX}${args.student_id}|${codes}|${args.count ?? 4}`;
}

interface CachedEntry {
  at: number;
  payload: unknown;
}

/* ==========================================================================
   useJobIdeasForGaps — wraps ai-suggest-jobs-for-gaps. On-demand: callers
   trigger generate() because each call costs an OpenAI request.

   Use the same hook from:
     - apprentice's "What can I do next?" card (caller scopes to their own
       student_id via auth)
     - assessor's view of a learner (caller passes the learner's student_id)

   The edge function authorises both.

   ELE-942 / Assessor pack — Slice 1.
   ========================================================================== */

export type JobAcStrength = 'primary' | 'partial';

export type EvidenceTypeCode =
  | 'photo'
  | 'document'
  | 'certificate'
  | 'test_result'
  | 'witness'
  | 'reflection'
  | 'work_log'
  | 'video'
  | 'drawing'
  | 'calculation';

export interface JobAcCoverage {
  ac_code: string;
  /** Unit this AC belongs to — used to pre-select ACs in the capture flow. */
  unit_code: string;
  strength: JobAcStrength;
  rationale: string;
}

export interface JobChecklistItem {
  type: EvidenceTypeCode;
  label: string;
  required: boolean;
  needs_witness_signature?: boolean;
  guidance?: string;
}

export interface JobIdea {
  title: string;
  when_prompt: string;
  scenario: string;
  ac_coverage: JobAcCoverage[];
  evidence_checklist: JobChecklistItem[];
  difficulty: 'novice' | 'developing' | 'competent';
  estimated_minutes?: number;
}

export interface JobIdeasResponse {
  ideas: JobIdea[];
  note?: 'no_coverage_seeded' | 'no_gaps';
  message?: string;
  meta?: {
    qualification_code: string;
    gaps_total: number;
    gaps_considered: number;
    generated_at: string;
  };
}

export function useJobIdeasForGaps() {
  const [data, setData] = useState<JobIdeasResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (
      args: { student_id: string; ac_codes_focus?: string[]; count?: number },
      opts?: { force?: boolean }
    ): Promise<JobIdeasResponse | null> => {
      const key = cacheKey(args);
      // Check cache unless force
      if (!opts?.force && typeof window !== 'undefined') {
        try {
          const raw = window.localStorage.getItem(key);
          if (raw) {
            const cached = JSON.parse(raw) as CachedEntry;
            if (Date.now() - cached.at < CACHE_TTL_MS) {
              const out = cached.payload as JobIdeasResponse;
              setData(out);
              return out;
            }
          }
        } catch {
          // ignore cache read failures
        }
      }
      setLoading(true);
      setError(null);
      try {
        const { data: resp, error: fnErr } = await supabase.functions.invoke(
          'ai-suggest-jobs-for-gaps',
          { body: args }
        );
        if (fnErr) throw new Error(fnErr.message);
        const out = (resp ?? {}) as JobIdeasResponse;
        setData(out);
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(
              key,
              JSON.stringify({ at: Date.now(), payload: out } satisfies CachedEntry)
            );
          } catch {
            // quota exceeded — silently skip
          }
        }
        return out;
      } catch (e) {
        setError((e as Error).message ?? 'Could not load job ideas');
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  /** Clear cached responses for a given student (called when their gaps
      shift significantly — e.g. after a tutor signs off ACs). */
  const invalidateCache = useCallback((studentId: string) => {
    if (typeof window === 'undefined') return;
    try {
      const prefix = `${STORAGE_PREFIX}${studentId}|`;
      for (let i = window.localStorage.length - 1; i >= 0; i--) {
        const k = window.localStorage.key(i);
        if (k && k.startsWith(prefix)) window.localStorage.removeItem(k);
      }
    } catch {
      // ignore
    }
  }, []);

  // Clean up expired entries on mount — keeps localStorage tidy.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const cutoff = Date.now() - CACHE_TTL_MS;
      for (let i = window.localStorage.length - 1; i >= 0; i--) {
        const k = window.localStorage.key(i);
        if (!k || !k.startsWith(STORAGE_PREFIX)) continue;
        const raw = window.localStorage.getItem(k);
        if (!raw) continue;
        try {
          const cached = JSON.parse(raw) as CachedEntry;
          if (cached.at < cutoff) window.localStorage.removeItem(k);
        } catch {
          window.localStorage.removeItem(k);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  return { data, loading, error, generate, reset, invalidateCache };
}
