import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useEvidenceSearch — natural-language "show me" search across the cohort.
   Calls the ai-evidence-search edge fn, returns structured matches with
   evidence highlights + deep-link targets. ELE-924 / [G4].
   ========================================================================== */

export type SearchFocus =
  | 'struggling'
  | 'attendance_low'
  | 'safeguarding_concern'
  | 'bv_evidence'
  | 'iqa_chain'
  | 'otj_behind'
  | 'inclusion_send'
  | 'engagement_drop'
  | 'gateway_ready'
  | 'other';

export type SearchEvidenceKind =
  | 'ilp_goal'
  | 'portfolio'
  | 'quiz'
  | 'observation'
  | 'otj'
  | 'note'
  | 'message'
  | 'epa'
  | 'iqa';

export interface SearchEvidenceHit {
  kind: SearchEvidenceKind;
  occurred_at: string;
  title: string;
  summary: string;
}

export interface SearchMatch {
  learner_id: string;
  learner_name: string;
  risk_level: string | null;
  cohort_name: string | null;
  evidence: SearchEvidenceHit[];
  score: number;
}

export type SearchRiskFilter = 'any' | 'medium_plus' | 'high_plus' | 'critical_only';

export interface SearchResult {
  interpretation: string;
  focus: SearchFocus;
  /** Human-readable label for the focus the AI picked. */
  focus_label: string;
  /** Applied risk threshold — surfaced so the user can see what got filtered. */
  risk_filter: SearchRiskFilter;
  /** Recency window in days that was used. */
  recency_days: number;
  /** How many candidate learners were in scope before scoring + limit. */
  total_candidates: number;
  matches: SearchMatch[];
  generated_at: string;
}

export function useEvidenceSearch() {
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<string>('');
  // Abort handle for the in-flight request so a fast second submit doesn't
  // race the first — old responses can't overwrite newer state.
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(async (query: string) => {
    const trimmed = query.trim();
    if (trimmed.length < 3) {
      setError('Type a longer question — at least a few words.');
      return;
    }
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setLoading(true);
    setError(null);
    setLastQuery(trimmed);
    try {
      const { data: session } = await supabase.auth.getSession();
      const token = session.session?.access_token;
      if (!token) throw new Error('Not signed in');

      const url = `${(import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? ''}/functions/v1/ai-evidence-search`;
      const res = await fetch(url, {
        method: 'POST',
        signal: ac.signal,
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: trimmed }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text.slice(0, 240) || `request_${res.status}`);
      }
      const json = (await res.json()) as SearchResult;
      // Race guard — only commit if THIS request is still the in-flight one.
      if (abortRef.current === ac) {
        setResult(json);
      }
    } catch (e) {
      // Aborted requests are intentional — don't surface as errors.
      if ((e as Error).name === 'AbortError') return;
      if (abortRef.current === ac) {
        setError((e as Error).message ?? 'Search failed');
        setResult(null);
      }
    } finally {
      if (abortRef.current === ac) {
        setLoading(false);
        abortRef.current = null;
      }
    }
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setResult(null);
    setError(null);
    setLastQuery('');
  }, []);

  // Cancel any in-flight search on unmount so we don't setState on a
  // dead component.
  useEffect(
    () => () => {
      abortRef.current?.abort();
    },
    []
  );

  return { result, loading, error, lastQuery, search, reset };
}
