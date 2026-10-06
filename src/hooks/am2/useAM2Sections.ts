/**
 * useAM2Sections — where an apprentice stands on each AM2 section we can
 * practise in the app, from their actual recent runs.
 *
 * Replaces two invented composites: a 35/30/20/15 "weighted readiness" built
 * from each mode's BEST-EVER score (so it could never go down), and a
 * "match fitness" blend. The real AM2 has no percentage — each criterion is
 * Competent or Not Yet Competent — so we don't make one up. Instead each
 * section gets a plain status against a practice bar we state on screen:
 *
 *   not_tried   no runs yet
 *   practising  has runs, but the last two aren't both at the bar
 *   ready       the last two runs are both at or above the bar
 *
 * The bars are OUR practice standard, not NET's marking: safe isolation has
 * to be perfect (a dangerous isolation is a critical fail on the day);
 * testing and faults at 80%; the knowledge paper at 70%.
 *
 * Source: am2_mock_sessions (every simulator writes there via saveAM2Session).
 * Only the full knowledge paper counts for Section E — the 8-question spot
 * check and drill are revision tools, not a sitting of the paper.
 */
import { useCallback, useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// The app's own signed-in client. A second client built here had no auth
// storage, so on the native app (session in Capacitor Preferences) every
// request went out signed-out and RLS silently returned nothing / refused saves.
const db = supabase as unknown as SupabaseClient;

/** How many recent runs readiness reads — the tutor's view reads the same, so
 *  both show the same picture. */
export const AM2_RUNS_LIMIT = 200;

export type AM2SectionKey = 'A1' | 'B' | 'C' | 'D' | 'E';
export type AM2SectionStatus = 'not_tried' | 'practising' | 'ready';

export interface AM2SectionDef {
  key: AM2SectionKey;
  /** session_type written by the simulator */
  sessionType:
    'safe_working' | 'testing_sequence' | 'safe_isolation' | 'fault_diagnosis' | 'knowledge_test';
  /** ?tab= on the simulator page */
  tab: 'safe-working' | 'testing' | 'safe-isolation' | 'faults' | 'knowledge';
  title: string;
  /** Length on the real day, from our AM2 course (Module 1.1). */
  onTheDay: string;
  summary: string;
  bar: number;
  barLabel: string;
}

/** In AM2S v1 order. A1 (safe working and planning) opens the day; the
 *  composite installation (A2–A6) is hands-on and has
 *  no in-app simulator. */
export const AM2_SECTIONS: AM2SectionDef[] = [
  {
    // AM2S v1's first hour (NET manual v2025.03; "A1" in NET's re-sit fees).
    key: 'A1',
    sessionType: 'safe_working',
    tab: 'safe-working',
    title: 'Safe working and planning',
    onTheDay: '1 hour',
    summary:
      'Isolate the assessment board with the 10-point test, risk-assess the bay, plan the work.',
    bar: 80,
    barLabel: '80% or better',
  },
  {
    key: 'B',
    sessionType: 'testing_sequence',
    tab: 'testing',
    title: 'Inspection, testing and certification',
    onTheDay: '3½ hours',
    summary: 'Test each rig circuit in the right order with the MFT and fill in the schedule.',
    bar: 80,
    barLabel: '80% or better',
  },
  {
    key: 'C',
    sessionType: 'safe_isolation',
    tab: 'safe-isolation',
    title: 'Safe isolation',
    onTheDay: '30 minutes', // NET manual: Safe Isolation of Circuits, 30 min + 5 min reading
    summary: 'Isolate, lock off and prove dead — no step missed, nothing out of order.',
    bar: 100,
    barLabel: 'no mistakes',
  },
  {
    key: 'D',
    sessionType: 'fault_diagnosis',
    tab: 'faults',
    title: 'Fault diagnosis',
    onTheDay: '2 hours',
    summary: 'Find each fault by testing, name it and its location, and say how to put it right.',
    bar: 80,
    barLabel: '80% or better',
  },
  {
    key: 'E',
    sessionType: 'knowledge_test',
    tab: 'knowledge',
    title: 'Knowledge test',
    onTheDay: '1½ hours', // AM2S v1 (apprentices from Sept 2023): 45 questions; the AM2 is 30 in 1 hour
    summary:
      'Multiple-choice paper on health and safety, BS 7671, the Building Regulations, inspection and testing, and more.',
    bar: 70,
    barLabel: '70% or better',
  },
];

export interface AM2SectionState extends AM2SectionDef {
  status: AM2SectionStatus;
  /** Most recent first, at most 5. */
  recent: Array<{ score: number; at: string }>;
  runs: number;
  lastAt: string | null;
}

export interface AM2SectionsData {
  sections: AM2SectionState[];
  /** Every saved run, Learn and Practise included (readiness uses only the counted ones). */
  allRuns?: number;
  readyCount: number;
  /** Last mock day, as sections at the bar (the AM2 has no overall %). */
  lastMock: { atBar: number; of: number; at: string } | null;
  /** The section to do next: first in AM2 order that isn't ready, preferring
   *  untried ones; null when all four are ready. */
  next: AM2SectionState | null;
}

/** "Ready" fades back to practising after a month without an Assessment run —
 *  being ready in the spring says little about the autumn. */
const READY_FOR_DAYS = 30;

function statusFor(
  def: AM2SectionDef,
  recent: Array<{ score: number; at?: string }>
): AM2SectionStatus {
  if (recent.length === 0) return 'not_tried';
  if (recent.length >= 2 && recent[0].score >= def.bar && recent[1].score >= def.bar) {
    const last = recent[0].at ? new Date(recent[0].at).getTime() : Date.now();
    if (Date.now() - last > READY_FOR_DAYS * 24 * 60 * 60 * 1000) return 'practising';
    return 'ready';
  }
  return 'practising';
}

/** Does a saved run count towards "ready"? Only Assessment runs (exam
 *  sittings of the FULL knowledge paper). Older runs saved before modes
 *  existed count, except old fault runs that recorded a guided/practice mode
 *  in session_data, and old topic-only papers can't be told apart so count. */
export function countsTowardsReady(r: {
  session_type?: string;
  component_scores?: { mode?: string; fullPaper?: boolean; total?: number } | null;
  session_data?: unknown;
}): boolean {
  const mode = r.component_scores?.mode;
  if (mode === 'learn' || mode === 'practise') return false;
  if (r.session_type === 'knowledge_test' && r.component_scores?.fullPaper === false) return false;
  // Section E counts only a sitting of a real paper — 30 (AM2) or 45 (AM2S) questions.
  // Older exam sittings of 15 or 20 questions were good practice, not the paper.
  if (
    r.session_type === 'knowledge_test' &&
    r.component_scores?.total != null &&
    r.component_scores.total < 30
  )
    return false;
  if (!mode) {
    const legacy = (r.session_data as { mode?: string } | null)?.mode;
    if (legacy === 'guided' || legacy === 'practice') return false;
  }
  return true;
}

export function buildSections(
  rows: Array<{
    session_type: string;
    overall_score: number | null;
    completed_at: string | null;
    session_data?: unknown;
  }>
): AM2SectionsData {
  const sections = AM2_SECTIONS.map((def) => {
    const mine = rows
      .filter((r) => r.session_type === def.sessionType && r.overall_score != null)
      .map((r) => ({ score: Math.round(Number(r.overall_score)), at: r.completed_at ?? '' }));
    const recent = mine.slice(0, 5);
    return {
      ...def,
      status: statusFor(def, recent),
      recent,
      runs: mine.length,
      lastAt: recent[0]?.at || null,
    };
  });
  // A mock day is reported as sections at the bar — the AM2 has no overall
  // percentage, so averaging the four would be a number that doesn't exist.
  const mock = rows.find(
    (r) =>
      r.session_type === 'mock_am2' &&
      Array.isArray((r.session_data as { sectionsAtBar?: unknown } | null)?.sectionsAtBar)
  );
  const notReady = sections.filter((s) => s.status !== 'ready');
  return {
    sections,
    readyCount: sections.length - notReady.length,
    lastMock: mock
      ? {
          atBar: ((mock.session_data as { sectionsAtBar: string[] }).sectionsAtBar ?? []).length,
          // Days saved before A1 was added had four sections, not five.
          of:
            Object.keys(
              ((mock as { component_scores?: Record<string, unknown> | null }).component_scores ??
                {}) as Record<string, unknown>
            ).length || AM2_SECTIONS.length,
          at: mock.completed_at ?? '',
        }
      : null,
    // A first-timer starts with Section C — the shortest section, and the
    // safe-isolation habit every other one relies on — not the 3½-hour B.
    next: sections.every((s) => s.status === 'not_tried')
      ? (sections.find((s) => s.key === 'C') ?? null)
      : (notReady.find((s) => s.status === 'not_tried') ?? notReady[0] ?? null),
  };
}

export function useAM2Sections() {
  const { user } = useAuth();
  const [data, setData] = useState<AM2SectionsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) {
      setData(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const { data: rows, error: err } = await db
      .from('am2_mock_sessions')
      .select('session_type, overall_score, completed_at, component_scores, session_data')
      .eq('user_id', user.id)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(AM2_RUNS_LIMIT);
    if (err) {
      setError(err.message);
      setData(buildSections([]));
    } else {
      setError(null);
      // Learn and Practise runs are saved for the mistake history but don't
      // count towards "ready" — only Assessment runs (and older runs saved
      // before modes existed, which have no mode) do.
      const counted = (rows ?? []).filter(countsTowardsReady);
      setData({ ...buildSections(counted), allRuns: (rows ?? []).length });
    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, isLoading, error, reload: load };
}
