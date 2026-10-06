/**
 * useDiaryCoach — the weekly reflection, on demand.
 *
 * 6 Oct 2026 rebuild. It was an always-open "AI coach" card over the whole
 * diary, cached under one key for every account on the device. Now the
 * apprentice asks for a reflection on a WEEK (from that week's header); it
 * calls the same diary-coach edge function with that week's entries (plus a
 * little earlier context), and the result is cached per user, per week,
 * and dropped when that week's entries change. Nothing runs on its own.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { SiteDiaryEntry } from './useSiteDiaryEntries';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';

/**
 * Fingerprint of the entries the advice was generated from.
 *
 * This used to hash IDs alone, which detects added and removed entries but NOT
 * edits — change what you learned on Tuesday and the coach would keep serving
 * advice written against the old text for up to 24 hours. `updated_at` moves on
 * every edit, so pairing it with the id catches both.
 */
function computeEntryHash(entries: SiteDiaryEntry[]): string {
  return entries
    .map((e) => `${e.id}:${e.updated_at ?? ''}`)
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

export function useDiaryCoach(qualificationCode?: string | null) {
  const { user } = useAuth();
  const cacheKey = user ? `elec-mate-diary-reflections:${user.id}` : null;
  const [reflections, setReflections] = useState<
    Record<string, { insight: DiaryCoachInsight; entryHash: string }>
  >({});
  const [reflectingWeek, setReflectingWeek] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cacheKey) return;
    try {
      storageRemoveSync('elec-mate-diary-coach'); // the old shared key
    } catch {
      /* storage blocked */
    }
    setReflections(storageGetJSONSync(cacheKey, {}));
  }, [cacheKey]);

  /** Reflections still valid for the given weeks' current entries. */
  const reflectionsFor = useCallback(
    (weeks: Array<{ key: string; entries: SiteDiaryEntry[] }>) => {
      const out: Record<string, DiaryCoachInsight> = {};
      for (const w of weeks) {
        const r = reflections[w.key];
        if (r && r.entryHash === computeEntryHash(w.entries)) out[w.key] = r.insight;
      }
      return out;
    },
    [reflections]
  );

  const reflect = useCallback(
    async (weekKeyValue: string, weekEntries: SiteDiaryEntry[], earlier: SiteDiaryEntry[] = []) => {
      if (!weekEntries.length) return;
      setReflectingWeek(weekKeyValue);
      setError(null);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) throw new Error('Not signed in');
        const detail = (e: SiteDiaryEntry) => ({
          id: e.id,
          date: e.date,
          site_name: e.site_name,
          tasks_completed: e.tasks_completed,
          // Units go in their own field: mixed into skills they made the coach
          // think skill tags were present and list all eight categories as gaps.
          skills_practised: (e.skills_practised ?? []).filter((x) => !/^unit\s/i.test(x)),
          unit_codes: e.unit_codes ?? [],
          what_i_learned: e.what_i_learned,
          issues_or_questions: e.issues_or_questions,
          mood_rating: e.mood_rating,
        });
        const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/diary-coach`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            entries: weekEntries.map(detail),
            olderEntries: earlier.slice(0, 14).map((e) => ({
              id: e.id,
              date: e.date,
              site_name: e.site_name,
              task_count: e.tasks_completed?.length || 0,
              skills_practised: (e.skills_practised ?? []).filter((x) => !/^unit\s/i.test(x)),
              mood_rating: e.mood_rating,
            })),
            totalEntryCount: weekEntries.length + earlier.length,
            qualificationCode: qualificationCode || undefined,
          }),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result?.error || `Error ${res.status}`);
        if (!result?.success || !result?.insight)
          throw new Error(result?.error || 'No reflection returned');
        setReflections((prev) => {
          const next = {
            ...prev,
            [weekKeyValue]: {
              insight: result.insight as DiaryCoachInsight,
              entryHash: computeEntryHash(weekEntries),
            },
          };
          if (cacheKey) storageSetJSONSync(cacheKey, next);
          return next;
        });
      } catch (err) {
        console.error('[useDiaryCoach] Error:', err);
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setReflectingWeek(null);
      }
    },
    [qualificationCode, cacheKey]
  );

  return { reflectionsFor, reflect, reflectingWeek, error };
}
