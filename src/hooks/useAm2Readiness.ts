/**
 * useAm2Readiness — session-based AM2 "match fitness" score.
 *
 * Distinct from `@/hooks/am2/useAM2Readiness` (which blends best-per-component
 * scores from `am2_scores` into the per-mode dashboard grid). This hook looks
 * at the apprentice's actual completed runs in `am2_mock_sessions` — the same
 * table every simulator writes via `saveAM2Session` (session_type ∈
 * safe_isolation | testing_sequence | fault_diagnosis | knowledge_test |
 * mock_am2) — and produces ONE honest, explainable 0–100 number:
 *
 *   Best run          40%   your top overall_score across all runs
 *   Last 5 average    30%   current form — mean of the 5 most recent runs
 *   Sessions banked   20%   completed runs vs a target of 8 (capped)
 *   Match fitness     10%   recency — full inside 14 days, fading to 0 at 60
 *
 * Zero sessions → score is null (the UI shows a "take your first timed run"
 * state) rather than a misleading 0.
 *
 * Exam date: read/write via `useAm2ExamDate`. Deliberately reuses the SAME
 * localStorage key as AM2JourneyPanel (`am2-target-date-<uid>`) so the two
 * surfaces can never disagree about when the AM2 is booked. A window event
 * keeps all mounted hook instances in sync when the date changes.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { storageGetSync, storageSetSync, storageRemoveSync } from '@/utils/storage';

/* ─── Exam date (localStorage, pre-table pattern like useOtjProgramme) ─── */

// Same key AM2JourneyPanel already uses — single source of truth.
const examDateKey = (uid: string) => `am2-target-date-${uid}`;
const EXAM_DATE_EVENT = 'am2-exam-date-changed';
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Shape AND calendar validity — the regex alone admits junk like
 * "2026-13-45", which would render as a NaN countdown. Parsed as LOCAL
 * midnight (T00:00:00, never bare yyyy-mm-dd which is UTC) so the
 * countdown can't drift a day at UK midnight.
 */
function isValidExamDate(raw: string): boolean {
  return ISO_DATE.test(raw) && isFinite(new Date(`${raw}T00:00:00`).getTime());
}

const DAY_MS = 86_400_000;

function startOfToday(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export interface Am2ExamDate {
  /** ISO yyyy-mm-dd, or null when the apprentice hasn't set one. */
  examDate: string | null;
  /** Pass null (or '') to clear. */
  setExamDate: (date: string | null) => void;
  /** Whole days until the exam — negative when it's in the past. */
  daysToGo: number | null;
}

export function useAm2ExamDate(): Am2ExamDate {
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const [examDate, setExamDateState] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) {
      setExamDateState(null);
      return;
    }
    const read = () => {
      const raw = storageGetSync(examDateKey(uid));
      setExamDateState(raw && isValidExamDate(raw) ? raw : null);
    };
    read();
    // Keep every mounted instance (ring, journey panel, progress row) in step.
    window.addEventListener(EXAM_DATE_EVENT, read);
    window.addEventListener('storage', read);
    return () => {
      window.removeEventListener(EXAM_DATE_EVENT, read);
      window.removeEventListener('storage', read);
    };
  }, [uid]);

  const setExamDate = useCallback(
    (date: string | null) => {
      if (!uid) return;
      if (date && isValidExamDate(date)) {
        storageSetSync(examDateKey(uid), date);
      } else {
        storageRemoveSync(examDateKey(uid));
      }
      window.dispatchEvent(new Event(EXAM_DATE_EVENT));
    },
    [uid]
  );

  const daysToGo = useMemo(() => {
    if (!examDate) return null;
    const target = new Date(`${examDate}T00:00:00`).getTime();
    if (!isFinite(target)) return null;
    return Math.round((target - startOfToday()) / DAY_MS);
  }, [examDate]);

  return { examDate, setExamDate, daysToGo };
}

/* ─── Readiness score ──────────────────────────────────────────────── */

export interface Am2ReadinessBand {
  key: 'best' | 'form' | 'volume' | 'fitness';
  label: string;
  /** 0–100 — what the mini bar shows. */
  value: number;
  /** Why this band is what it is, including its weight. */
  hint: string;
}

export interface Am2Readiness extends Am2ExamDate {
  /** 0–100, or null when there are no completed sessions yet. */
  score: number | null;
  bands: Am2ReadinessBand[];
  sessionsCount: number;
  /** ISO timestamp of the most recent completed session. */
  lastPractisedAt: string | null;
  loading: boolean;
}

/** Sessions needed for full "banked" credit. */
const SESSION_TARGET = 8;
/** Recency: full marks inside this many days… */
const FRESH_DAYS = 14;
/** …decaying linearly to zero at this many. */
const STALE_DAYS = 60;

const WEIGHTS = { best: 0.4, form: 0.3, volume: 0.2, fitness: 0.1 } as const;

function recencyValue(daysSince: number): number {
  if (daysSince <= FRESH_DAYS) return 100;
  if (daysSince >= STALE_DAYS) return 0;
  return Math.round(((STALE_DAYS - daysSince) / (STALE_DAYS - FRESH_DAYS)) * 100);
}

function lastRunLabel(daysSince: number): string {
  if (daysSince <= 0) return 'today';
  if (daysSince === 1) return 'yesterday';
  return `${daysSince} days ago`;
}

export function useAm2Readiness(): Am2Readiness {
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const examDateApi = useAm2ExamDate();

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Array<{ overall_score: number; completed_at: string }>>([]);

  useEffect(() => {
    if (!uid) {
      setRows([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    (async () => {
      const { data, error } = await supabase
        .from('am2_mock_sessions')
        .select('overall_score, completed_at')
        .eq('user_id', uid)
        .eq('status', 'completed')
        .not('overall_score', 'is', null)
        .not('completed_at', 'is', null)
        .order('completed_at', { ascending: false })
        .limit(100);
      if (cancelled) return;
      if (error) {
        console.error('[useAm2Readiness] fetch failed:', error.message);
        setRows([]);
      } else {
        setRows(
          (data ?? []) as Array<{ overall_score: number; completed_at: string }>
        );
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [uid]);

  return useMemo<Am2Readiness>(() => {
    const sessionsCount = rows.length;

    if (sessionsCount === 0) {
      return {
        score: null,
        bands: [],
        sessionsCount: 0,
        lastPractisedAt: null,
        loading,
        ...examDateApi,
      };
    }

    const scores = rows.map((r) => Math.max(0, Math.min(100, r.overall_score)));
    const best = Math.max(...scores);

    const lastFive = scores.slice(0, 5);
    const formAvg = Math.round(lastFive.reduce((s, v) => s + v, 0) / lastFive.length);

    const volume = Math.round((Math.min(sessionsCount, SESSION_TARGET) / SESSION_TARGET) * 100);

    const lastPractisedAt = rows[0].completed_at;
    const daysSince = Math.max(
      0,
      Math.floor((Date.now() - new Date(lastPractisedAt).getTime()) / DAY_MS)
    );
    const fitness = recencyValue(daysSince);

    const score = Math.round(
      best * WEIGHTS.best + formAvg * WEIGHTS.form + volume * WEIGHTS.volume + fitness * WEIGHTS.fitness
    );

    const bands: Am2ReadinessBand[] = [
      {
        key: 'best',
        label: 'Best run',
        value: best,
        hint: `Your top mark across ${sessionsCount} run${sessionsCount === 1 ? '' : 's'} · 40% of the score`,
      },
      {
        key: 'form',
        label: `Last ${lastFive.length} average`,
        value: formAvg,
        hint: 'Current form — your most recent runs · 30%',
      },
      {
        key: 'volume',
        label: 'Sessions banked',
        value: volume,
        hint: `${Math.min(sessionsCount, SESSION_TARGET)} of ${SESSION_TARGET} timed runs · 20%`,
      },
      {
        key: 'fitness',
        label: 'Match fitness',
        value: fitness,
        hint: `Last run ${lastRunLabel(daysSince)} — full marks inside ${FRESH_DAYS} days · 10%`,
      },
    ];

    return {
      score,
      bands,
      sessionsCount,
      lastPractisedAt,
      loading,
      ...examDateApi,
    };
  }, [rows, loading, examDateApi]);
}

export default useAm2Readiness;
