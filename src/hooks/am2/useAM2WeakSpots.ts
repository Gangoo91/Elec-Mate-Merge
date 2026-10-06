/**
 * useAM2WeakSpots — the mistakes a learner keeps making in Section B.
 *
 * AM2 plan, Phase 2 (6 Oct 2026). Every Section B run (all modes) saves its
 * mistakes in am2_mock_sessions.session_data.mistakes as { tag, circuitId }.
 * This reads the last few runs, counts the tags, and turns the most repeated
 * ones into drills. No new table: the run history already holds it.
 */
import { useCallback, useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { MISTAKE_LABEL } from '@/data/am2/sectionBRules';
import {
  DRILL_FOR,
  FAULT_DRILL_FOR,
  FAULT_LABEL,
  ISO_DRILL_FOR,
  type DrillKind,
} from '@/data/am2/sectionBDrills';
import { ISOLATION_TAG_LABEL } from '@/data/am2/safeIsolationScenarios';

/** Sections that save tagged mistakes, and how to read them. */
const fromMap =
  (labels: Record<string, string>, drills: Record<string, DrillKind>) => (tag: string) =>
    tag in labels ? { label: labels[tag], drill: drills[tag] as DrillKind | undefined } : null;

const SECTIONS = {
  B: { sessionType: 'testing_sequence', read: fromMap(MISTAKE_LABEL, DRILL_FOR) },
  C: { sessionType: 'safe_isolation', read: fromMap(ISOLATION_TAG_LABEL, ISO_DRILL_FOR) },
  D: { sessionType: 'fault_diagnosis', read: fromMap(FAULT_LABEL, FAULT_DRILL_FOR) },
  // Section E: missed questions are tagged by topic; the fix is a short paper on it.
  E: {
    sessionType: 'knowledge_test',
    read: (tag: string) =>
      tag.startsWith('topic_') ? { label: tag.slice(6), drill: undefined } : null,
  },
} as const;
export type WeakSection = keyof typeof SECTIONS;
export const WEAK_SECTION_TYPE: Record<WeakSection, string> = {
  B: SECTIONS.B.sessionType,
  C: SECTIONS.C.sessionType,
  D: SECTIONS.D.sessionType,
  E: SECTIONS.E.sessionType,
};

// The app's own signed-in client. A second client built here had no auth
// storage, so on the native app (session in Capacitor Preferences) every
// request went out signed-out and RLS silently returned nothing / refused saves.
const db = supabase as unknown as SupabaseClient;

/** How many recent runs count. Old habits drop off as you improve. */
const RECENT_RUNS = 5;

export interface WeakSpot {
  tag: string;
  label: string;
  /** Total times across the recent runs. */
  count: number;
  /** In how many of those runs it happened. */
  runs: number;
  /** The drill that fixes it — absent for Section E, which opens a topic paper. */
  drill?: DrillKind;
}

export interface WeakSpotsData {
  runsLooked: number;
  spots: WeakSpot[];
}

/** Count the tags in a set of runs (newest first). Used by the learner's AM2
 *  home and by the tutor's view in the College Hub, so both agree. */
export function weakSpotsFromRows(
  section: WeakSection,
  rows: { session_data?: unknown }[],
  limit = 3
): WeakSpotsData {
  const def = SECTIONS[section];
  const counts = new Map<string, { count: number; runs: number }>();
  let runsLooked = 0;
  for (const r of rows) {
    const list = (r.session_data as { mistakes?: { tag?: string }[] } | null)?.mistakes;
    if (!Array.isArray(list)) continue;
    runsLooked++;
    const inRun = new Set<string>();
    for (const m of list) {
      if (!m.tag || !def.read(m.tag)) continue;
      const c = counts.get(m.tag) ?? { count: 0, runs: 0 };
      c.count++;
      if (!inRun.has(m.tag)) {
        c.runs++;
        inRun.add(m.tag);
      }
      counts.set(m.tag, c);
    }
  }
  // Repeated across runs beats a lot in one run: sort by runs, then count.
  const spots = [...counts.entries()]
    .map(([tag, c]) => ({
      tag,
      label: def.read(tag)!.label,
      count: c.count,
      runs: c.runs,
      drill: def.read(tag)!.drill,
    }))
    .sort((a, b) => b.runs - a.runs || b.count - a.count)
    .slice(0, limit);
  return { runsLooked, spots };
}

export function useAM2WeakSpots(section: WeakSection = 'B') {
  const def = SECTIONS[section];
  const { user } = useAuth();
  const [data, setData] = useState<WeakSpotsData | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    const { data: rows, error } = await db
      .from('am2_mock_sessions')
      .select('session_data, completed_at')
      .eq('user_id', user.id)
      .eq('session_type', def.sessionType)
      .eq('status', 'completed')
      .not('session_data', 'is', null)
      .order('completed_at', { ascending: false })
      .limit(RECENT_RUNS);
    if (error) {
      setData({ runsLooked: 0, spots: [] });
      return;
    }
    setData(weakSpotsFromRows(section, rows ?? []));
  }, [user, def, section]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, reload: load };
}
