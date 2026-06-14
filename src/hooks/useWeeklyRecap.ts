/**
 * useWeeklyRecap — the once-a-week "your week" moment.
 *
 * Surfaces a short, honest recap of the last 7 days the FIRST time an
 * apprentice opens Today in a new ISO week. Supportive, never a guilt-trip:
 * a genuinely flat week (almost no activity) shows nothing at all.
 *
 * Pure read — one learning_activity_log query for the week + the streak
 * already in hand. No cron, no push, no new infra.
 */

import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface WeeklyRecap {
  studyMinutes: number;
  quizzes: number;
  flashcards: number;
  activeDays: number;
  streak: number;
  /** Total credited minutes across the week — the "is it worth showing" gate. */
  totalMinutes: number;
}

/** ISO-week key, e.g. "2026-W24" — stable show-once-per-week marker. */
function isoWeekKey(d: Date): string {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7; // Mon=1..Sun=7
  t.setUTCDate(t.getUTCDate() + 4 - day); // nearest Thursday
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((t.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${t.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

const seenKey = (uid: string, week: string) => `weekly_recap_seen:${uid}:${week}`;

// Below this the week is "flat" — show nothing rather than a hollow recap.
const MIN_MINUTES_TO_SHOW = 20;

interface UseWeeklyRecap {
  recap: WeeklyRecap | null;
  /** True only when there's a worthwhile, not-yet-seen recap for this week. */
  show: boolean;
  dismiss: () => void;
}

export function useWeeklyRecap(uid: string | null, currentStreak: number): UseWeeklyRecap {
  const [recap, setRecap] = useState<WeeklyRecap | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!uid) return;
    const week = isoWeekKey(new Date());
    let cancelled = false;

    // Already shown this week — don't even query.
    try {
      if (window.localStorage.getItem(seenKey(uid, week))) return;
    } catch {
      return;
    }

    (async () => {
      const since = new Date(Date.now() - 7 * 86_400_000).toISOString();
      const { data, error } = await supabase
        .from('learning_activity_log')
        .select('activity_type, duration_minutes, created_at')
        .eq('user_id', uid)
        .gte('created_at', since);
      if (cancelled || error || !data) return;

      let studyMinutes = 0;
      let quizzes = 0;
      let flashcards = 0;
      const days = new Set<string>();
      for (const r of data as Array<{
        activity_type: string;
        duration_minutes: number | null;
        created_at: string | null;
      }>) {
        studyMinutes += r.duration_minutes ?? 0;
        if (r.activity_type === 'quiz_completed' || r.activity_type === 'tutor_quiz') quizzes += 1;
        if (r.activity_type === 'flashcard_session') flashcards += 1;
        if (r.created_at) days.add(r.created_at.slice(0, 10));
      }

      const built: WeeklyRecap = {
        studyMinutes: Math.round(studyMinutes),
        quizzes,
        flashcards,
        activeDays: days.size,
        streak: currentStreak,
        totalMinutes: Math.round(studyMinutes),
      };
      if (cancelled) return;
      setRecap(built);
      // Re-check the seen-key: a fast dismiss (which writes it) could land
      // while this query was in flight — don't re-open over the top of it.
      let seen = false;
      try {
        seen = !!window.localStorage.getItem(seenKey(uid, week));
      } catch {
        /* ignore */
      }
      setShow(!seen && built.totalMinutes >= MIN_MINUTES_TO_SHOW);
    })();

    return () => {
      cancelled = true;
    };
  }, [uid, currentStreak]);

  const dismiss = () => {
    setShow(false);
    if (!uid) return;
    try {
      window.localStorage.setItem(seenKey(uid, isoWeekKey(new Date())), '1');
    } catch {
      /* private mode — it'll just show again next open; harmless */
    }
  };

  return { recap, show, dismiss };
}
