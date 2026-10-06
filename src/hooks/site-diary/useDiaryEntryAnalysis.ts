/**
 * useDiaryEntryAnalysis
 *
 * Calls the analyze-diary-entry edge function for a single entry.
 * Caches results in localStorage keyed by entry ID + a fingerprint of what the
 * check reads (6 Oct 2026: it was keyed on updated_at, so sharing the entry or
 * linking it to the portfolio — neither changes the words — threw the result
 * away before the portfolio picker could use it).
 * A result that lands after the sheet moved to another entry is dropped.
 * Only fetches when entryId is truthy (detail sheet open).
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { SiteDiaryEntry } from './useSiteDiaryEntries';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

export interface DiaryEntryAnalysis {
  evidenceStrength: 'strong' | 'moderate' | 'weak';
  whyGoodEvidence: string;
  matchedCriteria: Array<{
    unitCode: string;
    unitTitle?: string;
    acCode: string;
    acText: string;
    confidence: number;
    reason: string;
  }>;
  qualityTips: string[];
  suggestedTitle?: string;
}

function cacheKey(entryId: string): string {
  return `diary-analysis-${entryId}`;
}

interface CachedAnalysis {
  analysis: DiaryEntryAnalysis;
  /** fingerprint() of the entry the analysis was written from. */
  entryFingerprint: string;
}

/** What the evidence check actually reads — nothing else may stale it. */
function fingerprint(e: SiteDiaryEntry): string {
  return JSON.stringify([
    e.date,
    e.site_name,
    e.tasks_completed ?? [],
    e.what_i_learned ?? '',
    e.issues_or_questions ?? '',
    e.photos ?? [],
    e.unit_codes ?? [],
    e.training_minutes ?? 0,
    e.training_type ?? null,
    e.supervisor ?? '',
  ]);
}

export function useDiaryEntryAnalysis(
  entryId: string | null,
  entry: SiteDiaryEntry | null,
  qualificationCode?: string | null
) {
  const [analysis, setAnalysis] = useState<DiaryEntryAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastFetchedId = useRef<string | null>(null);
  // The entry on screen now — a slow request for an earlier one must not land.
  const currentId = useRef<string | null>(entryId);
  currentId.current = entryId;

  // A request for the previous entry no longer owns the spinner or the error.
  useEffect(() => {
    setIsLoading(false);
    setError(null);
  }, [entryId]);

  // Try loading from cache when entryId changes
  useEffect(() => {
    if (!entryId || !entry) {
      setAnalysis(null);
      lastFetchedId.current = null;
      return;
    }

    const parsed = storageGetJSONSync<CachedAnalysis | null>(cacheKey(entryId), null);
    if (parsed && parsed.entryFingerprint === fingerprint(entry)) {
      setAnalysis(parsed.analysis);
      lastFetchedId.current = entryId;
      return;
    }

    // No valid cache — reset for fresh fetch
    setAnalysis(null);
    lastFetchedId.current = null;
  }, [entryId, entry]);

  const fetchAnalysis = useCallback(
    async (force = false) => {
      if (!entryId || !entry) return;

      // Skip if already fetched for this entry (unless forced)
      if (!force && lastFetchedId.current === entryId && analysis) return;

      // Check cache unless forcing
      if (!force) {
        const parsed = storageGetJSONSync<CachedAnalysis | null>(cacheKey(entryId), null);
        if (parsed && parsed.entryFingerprint === fingerprint(entry)) {
          setAnalysis(parsed.analysis);
          lastFetchedId.current = entryId;
          return;
        }
      }

      setIsLoading(true);
      setError(null);

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          setError('Not signed in');
          return;
        }

        const response = await supabase.functions.invoke('analyze-diary-entry', {
          body: {
            entry: {
              id: entry.id,
              date: entry.date,
              site_name: entry.site_name,
              tasks_completed: entry.tasks_completed,
              // Older entries carried unit codes inside skills; they have their
              // own field now and the function reads unit_codes.
              skills_practised: (entry.skills_practised ?? []).filter((x) => !/^unit\s/i.test(x)),
              unit_codes: entry.unit_codes ?? [],
              what_i_learned: entry.what_i_learned,
              issues_or_questions: entry.issues_or_questions,
              supervisor: entry.supervisor,
            },
            qualificationCode: qualificationCode || undefined,
          },
        });

        if (response.error) {
          throw new Error(response.error.message || 'Failed to analyse entry');
        }

        // The sheet moved on to another entry while this was in flight.
        if (currentId.current !== entry.id) return;

        const result = response.data;
        if (!result?.success || !result?.analysis) {
          throw new Error(result?.error || 'No analysis returned');
        }

        setAnalysis(result.analysis);
        lastFetchedId.current = entryId;

        // Cache it
        const cachedData: CachedAnalysis = {
          analysis: result.analysis,
          entryFingerprint: fingerprint(entry),
        };
        storageSetJSONSync(cacheKey(entryId), cachedData);
      } catch (err) {
        console.error('[useDiaryEntryAnalysis] Error:', err);
        if (currentId.current === entry.id)
          setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        if (currentId.current === entry.id) setIsLoading(false);
      }
    },
    [entryId, entry, qualificationCode, analysis]
  );

  // No auto-fetch — user must click "Analyse as Evidence" to trigger

  const refresh = useCallback(() => fetchAnalysis(true), [fetchAnalysis]);

  return { analysis, isLoading, error, refresh };
}
