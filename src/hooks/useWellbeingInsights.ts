import { useMemo } from 'react';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { useMoodData, useJournalData, useSleepData } from '@/hooks/useMentalHealthSync';

// Journal entries tagged 'crisis-event' come from `recordCrisisEvent` —
// silently logged when a user taps a crisis call/text button. Surfacing a
// soft "checking-in" alert 12–48 hours later is the entire follow-up flow.

export type InsightTone = 'red' | 'orange' | 'amber' | 'blue' | 'emerald' | 'purple';

export interface WellbeingInsight {
  id: string;
  tone: InsightTone;
  title: string;
  body: string;
  cta?: { label: string; sectionId: string };
}

const within = (iso: string, days: number) =>
  Math.abs(differenceInCalendarDays(parseISO(iso), new Date())) <= days;

/**
 * Surfaces 1–4 pattern-detected insights from the user's recent mood, sleep
 * and journal data. Insights are private and never shared with admin.
 *
 * Detection rules:
 * - Burnout signal: mood avg < 2.5 AND sleep avg < 6h over last 7 days
 * - Sleep ↔ mood: low-mood days correlate with short-sleep nights
 * - Streak: 3+ days of consistent check-ins
 * - Quiet stretch: no logs for 4+ days
 * - Recovery: mood improving for 3 days in a row
 */
export function useWellbeingInsights(): {
  insights: WellbeingInsight[];
  isLoading: boolean;
} {
  const { moodHistory, isLoading: ml } = useMoodData();
  const { entries: journalEntries, isLoading: jl } = useJournalData();
  const { entries: sleepEntries, isLoading: sl } = useSleepData();

  return useMemo(() => {
    const out: WellbeingInsight[] = [];

    const moods7 = moodHistory.filter((m) => within(m.date, 7));
    const sleeps7 = sleepEntries.filter((s) => within(s.date, 7));
    const userJournal = journalEntries.filter(
      (j) => !j.tags?.includes?.('affirmation') && !j.tags?.includes?.('crisis-event')
    );
    const moodAvg =
      moods7.length > 0 ? moods7.reduce((s, m) => s + m.mood, 0) / moods7.length : 0;
    const sleepAvg =
      sleeps7.length > 0 ? sleeps7.reduce((s, e) => s + e.hours, 0) / sleeps7.length : 0;

    // ── Crisis follow-up — highest priority, always first ─────────────
    const crisisHit = journalEntries.find((j) => {
      if (!j.tags?.includes?.('crisis-event')) return false;
      const hoursAgo =
        (Date.now() - parseISO(`${j.date}T${j.time || '00:00'}`).getTime()) / (60 * 60 * 1000);
      return hoursAgo >= 12 && hoursAgo <= 48;
    });
    if (crisisHit) {
      out.push({
        id: 'crisis-followup',
        tone: 'red',
        title: 'Checking in — how are you today?',
        body: 'You reached out yesterday. That took something. A 10-second mood log helps us notice what helps.',
        cta: { label: 'Log how you feel', sectionId: 'mood' },
      });
    }

    // ── Burnout early-warning ─────────────────────────────────────────
    if (moods7.length >= 3 && sleeps7.length >= 3 && moodAvg < 2.5 && sleepAvg < 6) {
      out.push({
        id: 'burnout',
        tone: 'red',
        title: 'Looks like a heavy stretch',
        body: `Mood ${moodAvg.toFixed(1)}/5 and ${sleepAvg.toFixed(1)}h sleep on average this week. Want to plan a lighter day, talk to someone, or both?`,
        cta: { label: 'Talk to a peer', sectionId: 'talk' },
      });
    }

    // ── Sleep ↔ mood correlation ─────────────────────────────────────
    if (moods7.length >= 4 && sleeps7.length >= 4) {
      const lowMoodShortSleep = moods7.filter((m) => {
        if (m.mood >= 3) return false;
        const sameDaySleep = sleeps7.find((s) => s.date === m.date);
        return sameDaySleep ? sameDaySleep.hours < 6 : false;
      }).length;
      if (lowMoodShortSleep >= 2) {
        out.push({
          id: 'sleep-mood',
          tone: 'orange',
          title: 'Short sleep, lower mood',
          body: `${lowMoodShortSleep} of your low-mood days this week followed nights under 6 hours. A 7h target tonight is a solid lever.`,
          cta: { label: 'Open sleep tracker', sectionId: 'sleep' },
        });
      }
    }

    // ── Recovery trend ───────────────────────────────────────────────
    if (moods7.length >= 3) {
      const last3 = [...moods7]
        .sort((a, b) => (a.date < b.date ? -1 : 1))
        .slice(-3);
      if (
        last3.length === 3 &&
        last3[2].mood > last3[1].mood &&
        last3[1].mood > last3[0].mood
      ) {
        out.push({
          id: 'recovery',
          tone: 'emerald',
          title: 'Things are looking up',
          body: 'Your mood has improved three check-ins in a row. Worth noting what you changed — that pattern is gold.',
          cta: { label: 'Open journal', sectionId: 'journal' },
        });
      }
    }

    // ── Quiet stretch (4+ days without any check-in) ─────────────────
    const allDates = new Set<string>();
    [...moodHistory, ...sleepEntries, ...userJournal].forEach((x) => allDates.add(x.date));
    const today = new Date();
    let lastDate: Date | null = null;
    Array.from(allDates)
      .sort()
      .forEach((d) => {
        const parsed = parseISO(d);
        if (!lastDate || parsed > lastDate) lastDate = parsed;
      });
    if (lastDate) {
      const since = differenceInCalendarDays(today, lastDate);
      if (since >= 4) {
        out.push({
          id: 'quiet',
          tone: 'blue',
          title: `Welcome back — it's been ${since} days`,
          body: 'A quick check-in helps the patterns stay accurate. Takes ten seconds.',
          cta: { label: 'Check in', sectionId: 'mood' },
        });
      }
    }

    // ── Streak (3+ days of consistent check-ins) ─────────────────────
    if (allDates.size >= 3 && !out.some((i) => i.id === 'quiet')) {
      // Only celebrate when there's no quiet-stretch flag
      let streak = 0;
      for (let i = 0; i < 14; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        if (allDates.has(key)) streak += 1;
        else if (streak > 0) break;
      }
      if (streak >= 3) {
        out.push({
          id: 'streak',
          tone: 'purple',
          title: `${streak}-day check-in streak`,
          body: 'Consistency is the whole game. Keep the momentum.',
        });
      }
    }

    return { insights: out.slice(0, 4), isLoading: ml || jl || sl };
  }, [moodHistory, journalEntries, sleepEntries, ml, jl, sl]);
}
