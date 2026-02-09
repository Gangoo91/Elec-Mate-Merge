/**
 * useDiaryEntryAnalysis
 *
 * Calls the analyze-diary-entry edge function for a single entry.
 * Caches results in localStorage keyed by entry ID + updatedAt for staleness.
 * Only fetches when entryId is truthy (detail sheet open).
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { SiteDiaryEntry } from './useSiteDiaryEntries';

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
  entryUpdatedAt: string;
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

  // Try loading from cache when entryId changes
  useEffect(() => {
    if (!entryId || !entry) {
      setAnalysis(null);
      lastFetchedId.current = null;
      return;
    }

    try {
      const cached = localStorage.getItem(cacheKey(entryId));
      if (cached) {
        const parsed: CachedAnalysis = JSON.parse(cached);
        if (parsed.entryUpdatedAt === entry.updated_at) {
          setAnalysis(parsed.analysis);
          lastFetchedId.current = entryId;
          return;
        }
      }
    } catch {
      // Ignore cache read errors
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
        try {
          const cached = localStorage.getItem(cacheKey(entryId));
          if (cached) {
            const parsed: CachedAnalysis = JSON.parse(cached);
            if (parsed.entryUpdatedAt === entry.updated_at) {
              setAnalysis(parsed.analysis);
              lastFetchedId.current = entryId;
              return;
            }
          }
        } catch {
          // Continue to fetch
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
              skills_practised: entry.skills_practised,
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

        const result = response.data;
        if (!result?.success || !result?.analysis) {
          throw new Error(result?.error || 'No analysis returned');
        }

        setAnalysis(result.analysis);
        lastFetchedId.current = entryId;

        // Cache it
        try {
          const cached: CachedAnalysis = {
            analysis: result.analysis,
            entryUpdatedAt: entry.updated_at,
          };
          localStorage.setItem(cacheKey(entryId), JSON.stringify(cached));
        } catch {
          // Ignore cache write errors
        }
      } catch (err) {
        console.error('[useDiaryEntryAnalysis] Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    },
    [entryId, entry, qualificationCode, analysis]
  );

  // No auto-fetch — user must click "Analyse as Evidence" to trigger

  const refresh = useCallback(() => fetchAnalysis(true), [fetchAnalysis]);

  return { analysis, isLoading, error, refresh };
}
