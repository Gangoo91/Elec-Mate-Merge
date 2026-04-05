/**
 * useDiaryCoach
 *
 * Calls the diary-coach edge function with recent entries.
 * Caches the response in localStorage — refreshes once per day.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { SiteDiaryEntry } from './useSiteDiaryEntries';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';

const CACHE_KEY = 'elec-mate-diary-coach';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

/** Sorted entry IDs joined — detects added, removed, or replaced entries */
function computeEntryHash(entries: SiteDiaryEntry[]): string {
  return entries
    .map((e) => e.id)
    .sort()
    .join(',');
}

export interface PortfolioNudge {
  entryId: string;
  entryDate: string;
  nudge: string;
  suggestedUnit: string;
  confidence: number;
}

export interface DiaryCoachInsight {
  weekSummary: string;
  skillGaps: string[];
  moodInsight: string;
  recommendation: string;
  encouragement: string;
  regulationTip?: string;
  ksbSuggestion?: string;
  qualificationProgress?: string;
  suggestedEvidence?: string;
  portfolioNudges?: PortfolioNudge[];
}

interface CachedInsight {
  insight: DiaryCoachInsight;
  generatedAt: string;
  entryHash: string;
}

export function useDiaryCoach(entries: SiteDiaryEntry[], qualificationCode?: string | null) {
  const [insight, setInsight] = useState<DiaryCoachInsight | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from cache on mount
  useEffect(() => {
    const parsed = storageGetJSONSync<CachedInsight | null>(CACHE_KEY, null);
    if (parsed) {
      const age = Date.now() - new Date(parsed.generatedAt).getTime();
      if (age < CACHE_TTL_MS) {
        setInsight(parsed.insight);
      }
    }
  }, []);

  const fetchInsight = useCallback(
    async (force = false) => {
      if (entries.length < 3) return;

      // Check cache age unless forcing refresh
      if (!force) {
        const parsed = storageGetJSONSync<CachedInsight | null>(CACHE_KEY, null);
        if (parsed) {
          const age = Date.now() - new Date(parsed.generatedAt).getTime();
          if (age < CACHE_TTL_MS && parsed.entryHash === computeEntryHash(entries)) {
            setInsight(parsed.insight);
            return;
          }
        }
      }

      setIsLoading(true);
      setError(null);
      if (force) {
        setInsight(null);
        storageRemoveSync(CACHE_KEY);
      }

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          setError('Not signed in');
          return;
        }

        // Send all entries — recent with full detail, older condensed
        const recentEntries = entries.slice(0, 7).map((e) => ({
          id: e.id,
          date: e.date,
          site_name: e.site_name,
          tasks_completed: e.tasks_completed,
          skills_practised: e.skills_practised,
          what_i_learned: e.what_i_learned,
          issues_or_questions: e.issues_or_questions,
          mood_rating: e.mood_rating,
        }));
        const olderEntries = entries.slice(7).map((e) => ({
          id: e.id,
          date: e.date,
          site_name: e.site_name,
          task_count: e.tasks_completed?.length || 0,
          skills_practised: e.skills_practised,
          mood_rating: e.mood_rating,
        }));

        // Use raw fetch to get the actual error body on non-2xx (supabase.functions.invoke swallows it)
        const fnUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/diary-coach`;
        const rawResponse = await fetch(fnUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            entries: recentEntries,
            olderEntries,
            totalEntryCount: entries.length,
            qualificationCode: qualificationCode || undefined,
          }),
        });

        const result = await rawResponse.json();

        if (!rawResponse.ok) {
          throw new Error(result?.error || `Edge function error: ${rawResponse.status}`);
        }

        if (!result?.success || !result?.insight) {
          throw new Error(result?.error || 'No insight returned');
        }

        setInsight(result.insight);

        // Cache it
        const cached: CachedInsight = {
          insight: result.insight,
          generatedAt: result.generatedAt || new Date().toISOString(),
          entryHash: computeEntryHash(entries),
        };
        storageSetJSONSync(CACHE_KEY, cached);
      } catch (err) {
        console.error('[useDiaryCoach] Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    },
    [entries, qualificationCode]
  );

  // Manual only — no auto-fetch to avoid burning tokens
  const refresh = useCallback(() => fetchInsight(true), [fetchInsight]);

  return { insight, isLoading, error, refresh };
}
