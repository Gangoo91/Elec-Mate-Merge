/**
 * useDiaryCoach
 *
 * Calls the diary-coach edge function with recent entries.
 * Caches the response in localStorage — refreshes once per day.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { SiteDiaryEntry } from './useSiteDiaryEntries';

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
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed: CachedInsight = JSON.parse(cached);
        const age = Date.now() - new Date(parsed.generatedAt).getTime();
        if (age < CACHE_TTL_MS) {
          setInsight(parsed.insight);
        }
      }
    } catch {
      // Ignore cache errors
    }
  }, []);

  const fetchInsight = useCallback(
    async (force = false) => {
      if (entries.length < 3) return;

      // Check cache age unless forcing refresh
      if (!force) {
        try {
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            const parsed: CachedInsight = JSON.parse(cached);
            const age = Date.now() - new Date(parsed.generatedAt).getTime();
            if (age < CACHE_TTL_MS && parsed.entryHash === computeEntryHash(entries)) {
              setInsight(parsed.insight);
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

        // Send last 7 entries
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

        const response = await supabase.functions.invoke('diary-coach', {
          body: { entries: recentEntries, qualificationCode: qualificationCode || undefined },
        });

        if (response.error) {
          throw new Error(response.error.message || 'Failed to get coaching insight');
        }

        const result = response.data;
        if (!result?.success || !result?.insight) {
          throw new Error(result?.error || 'No insight returned');
        }

        setInsight(result.insight);

        // Cache it
        try {
          const cached: CachedInsight = {
            insight: result.insight,
            generatedAt: result.generatedAt || new Date().toISOString(),
            entryHash: computeEntryHash(entries),
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
        } catch {
          // Ignore cache write errors
        }
      } catch (err) {
        console.error('[useDiaryCoach] Error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    },
    [entries, qualificationCode]
  );

  // Auto-fetch when entries change and we don't have a cached insight
  useEffect(() => {
    if (entries.length >= 3 && !insight && !isLoading) {
      fetchInsight();
    }
  }, [entries.length, insight, isLoading, fetchInsight]);

  const refresh = useCallback(() => fetchInsight(true), [fetchInsight]);

  return { insight, isLoading, error, refresh };
}
