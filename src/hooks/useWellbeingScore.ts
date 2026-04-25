import { useMemo } from 'react';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { useMoodData, useJournalData, useSleepData } from '@/hooks/useMentalHealthSync';

export interface WellbeingBreakdown {
  score: number;
  band: 'critical' | 'low' | 'fair' | 'good' | 'great';
  pillars: {
    mood: { score: number; n: number; avg: number };
    sleep: { score: number; n: number; avgHours: number };
    journal: { score: number; n: number };
    consistency: { score: number; days: number };
  };
  isLoading: boolean;
}

const within7Days = (iso: string) =>
  Math.abs(differenceInCalendarDays(parseISO(iso), new Date())) <= 7;

/**
 * Composite 0–100 wellbeing score from the last 7 days of mood, sleep, journal
 * and check-in consistency. Each pillar contributes a weighted slice; the
 * function never errors when data is missing — pillars without data score 0
 * and the band reflects "not enough data" until at least one pillar lands.
 *
 * Weights: mood 40%, sleep 30%, journal 15%, consistency 15%.
 */
export function useWellbeingScore(): WellbeingBreakdown {
  const { moodHistory, isLoading: moodLoading } = useMoodData();
  const { entries: journalEntries, isLoading: journalLoading } = useJournalData();
  const { entries: sleepEntries, isLoading: sleepLoading } = useSleepData();

  return useMemo(() => {
    // ── Mood: average of last 7 days, mapped 1-5 → 0-100 ─────────────
    const recentMood = moodHistory.filter((m) => within7Days(m.date));
    const moodAvg =
      recentMood.length > 0
        ? recentMood.reduce((s, m) => s + (m.mood ?? 0), 0) / recentMood.length
        : 0;
    const moodScore = recentMood.length > 0 ? Math.round(((moodAvg - 1) / 4) * 100) : 0;

    // ── Sleep: average hours last 7 days, target = 7h ────────────────
    const recentSleep = sleepEntries.filter((s) => within7Days(s.date));
    const sleepAvgHours =
      recentSleep.length > 0
        ? recentSleep.reduce((s, e) => s + (e.hours ?? 0), 0) / recentSleep.length
        : 0;
    const sleepScore =
      recentSleep.length > 0
        ? Math.round(Math.max(0, Math.min(100, (sleepAvgHours / 7) * 100)))
        : 0;

    // ── Journal: 1 entry/day = 100, 0 = 0 ────────────────────────────
    // Exclude housekeeping rows (affirmation cache + crisis-event log) — these
    // are stored in the journal table for RLS reuse but aren't user-authored.
    const recentJournal = journalEntries.filter(
      (j) =>
        within7Days(j.date) &&
        !j.tags?.includes?.('affirmation') &&
        !j.tags?.includes?.('crisis-event')
    );
    const journalScore = Math.round(Math.min(100, (recentJournal.length / 7) * 100));

    // ── Consistency: distinct days with any check-in (mood/sleep/journal) ─
    const distinctDays = new Set<string>();
    [...recentMood, ...recentSleep, ...recentJournal].forEach((x) => distinctDays.add(x.date));
    const consistencyScore = Math.round(Math.min(100, (distinctDays.size / 7) * 100));

    // ── Composite ────────────────────────────────────────────────────
    const score = Math.round(
      moodScore * 0.4 + sleepScore * 0.3 + journalScore * 0.15 + consistencyScore * 0.15
    );

    const band: WellbeingBreakdown['band'] =
      distinctDays.size === 0
        ? 'fair'
        : score >= 80
          ? 'great'
          : score >= 60
            ? 'good'
            : score >= 40
              ? 'fair'
              : score >= 20
                ? 'low'
                : 'critical';

    return {
      score,
      band,
      pillars: {
        mood: { score: moodScore, n: recentMood.length, avg: moodAvg },
        sleep: { score: sleepScore, n: recentSleep.length, avgHours: sleepAvgHours },
        journal: { score: journalScore, n: recentJournal.length },
        consistency: { score: consistencyScore, days: distinctDays.size },
      },
      isLoading: moodLoading || journalLoading || sleepLoading,
    };
  }, [moodHistory, journalEntries, sleepEntries, moodLoading, journalLoading, sleepLoading]);
}
