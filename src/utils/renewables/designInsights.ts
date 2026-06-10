/**
 * Renewable Design Suite — handover insights.
 *
 * Two live feeds attached to a finished design:
 *  1. What BS 7671 actually says for this technology (verbatim, from the
 *     app's BS 7671:2018+A4:2026 knowledge base — never model-generated).
 *  2. What the install involves on the tools — typical task timings, tests to
 *     record and defects to avoid, from Elec-Mate's install intelligence.
 *
 * Both read directly with the user's session (RLS: authenticated SELECT).
 */

import { supabase } from '@/integrations/supabase/client';
import type { DesignTechnology } from './designIntake';

export interface RegInsight {
  topic: string;
  content: string;
  ref: string;
}

export interface TaskInsight {
  topic: string;
  minutes: number | null;
  team: number | null;
  skill: string | null;
}

export interface DesignInsights {
  regs: RegInsight[];
  tasks: TaskInsight[];
  tests: string[];
  defects: string[];
}

// Reg queries use websearch syntax (terms are ANDed, `or` and quoted phrases
// supported) — each verified to return strong, on-topic facets.
const TECH_CONFIG: Record<
  DesignTechnology,
  { regQuery: string; categories: string[] | null; workQuery: string | null }
> = {
  solar: {
    regQuery: 'photovoltaic or "solar PV"',
    categories: ['solar_pv', 'solar_pv_system'],
    workQuery: null,
  },
  battery: {
    regQuery: '"energy storage"',
    categories: ['battery_storage', 'battery_system', 'battery_bank'],
    workQuery: null,
  },
  ev: {
    regQuery: '"electric vehicle" charging',
    categories: ['ev_charging'],
    workQuery: null,
  },
  'heat-pump': {
    regQuery: '"dedicated circuit" or "fixed current-using equipment"',
    categories: null,
    workQuery: '"heat pump" installation',
  },
};

const uniq = (arr: string[], cap: number) => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const a of arr) {
    const k = a.trim().toLowerCase();
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(a.trim());
    if (out.length >= cap) break;
  }
  return out;
};

// Per-tech results are static for a session — cache so step revisits are
// instant and don't re-query.
const cache = new Map<DesignTechnology, DesignInsights>();

export async function fetchDesignInsights(tech: DesignTechnology): Promise<DesignInsights> {
  const cached = cache.get(tech);
  if (cached) return cached;
  const cfg = TECH_CONFIG[tech];

  const regsQ = supabase
    .from('bs7671_facets')
    .select('primary_topic, content, context_prefix')
    .textSearch('tsv', cfg.regQuery, { type: 'websearch' })
    .order('confidence_score', { ascending: false })
    .limit(5);

  let workQ = supabase
    .from('practical_work_intelligence')
    .select(
      'primary_topic, typical_duration_minutes, team_size, skill_level, test_procedures, common_defects'
    )
    .contains('activity_types', ['installation'])
    .not('typical_duration_minutes', 'is', null)
    .order('confidence_score', { ascending: false })
    .limit(14);
  workQ = cfg.categories
    ? workQ.in('equipment_category', cfg.categories)
    : workQ.textSearch('tsv', cfg.workQuery ?? cfg.regQuery, { type: 'websearch' });

  const [regsRes, workRes] = await Promise.all([regsQ, workQ]);
  // Supabase builders resolve with { data, error } — they never reject, so a
  // failed query must be surfaced explicitly or it looks like "no content".
  if (regsRes.error && workRes.error) {
    throw new Error(regsRes.error.message);
  }

  const regs: RegInsight[] = (regsRes.data ?? []).map((r) => ({
    topic: r.primary_topic ?? 'BS 7671',
    content: r.content ?? '',
    ref: r.context_prefix ?? '',
  }));

  const rows = workRes.data ?? [];
  const seenTopics = new Set<string>();
  const tasks: TaskInsight[] = [];
  for (const r of rows) {
    const t = (r.primary_topic ?? '').trim();
    if (!t || seenTopics.has(t.toLowerCase())) continue;
    seenTopics.add(t.toLowerCase());
    tasks.push({
      topic: t,
      minutes: r.typical_duration_minutes,
      team: r.team_size,
      skill: r.skill_level,
    });
    if (tasks.length >= 6) break;
  }

  const result: DesignInsights = {
    regs,
    tasks,
    tests: uniq(
      rows.flatMap((r) => r.test_procedures ?? []),
      5
    ),
    defects: uniq(
      rows.flatMap((r) => r.common_defects ?? []),
      5
    ),
  };
  cache.set(tech, result);
  return result;
}
