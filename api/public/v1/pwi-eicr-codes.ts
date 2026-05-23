/**
 * GET /api/public/v1/pwi-eicr-codes?category=consumer_unit
 *
 * Returns suggested EICR observation codes (C1/C2/C3/FI) for issues
 * typically found in this category. Derived from common_defects in
 * verified UK electrical data + IET BPG 4 severity heuristics
 * (the eicr_observation_codes column in PWI is currently sparse, so
 * we synthesise codes from the defect strings).
 *
 * Powers AI answers like "what code should I give this defect?" with
 * pattern-based suggestions.
 */

import {
  jsonResponse,
  errorResponse,
  corsPreflight,
  methodNotAllowed,
  CITATION_SOURCE,
  LICENSE_NOTE,
} from '../../_lib/util';
import { queryTable, escapeIlike } from '../../_lib/supabase';

export const config = { runtime: 'edge' };

interface PwiRow {
  equipment_category: string | null;
  common_defects: unknown;
  primary_topic: string | null;
}

// Severity heuristics — patterns based on IET BPG 4 (Issue 6) typical codings
const C1_PATTERNS = [
  /\b(live parts? (?:exposed|accessible))\b/i,
  /\b(no earth|no earthing|missing earth)\b/i,
  /\bdanger(?:ous)?\b/i,
  /\b(arcing|burnt|burning|scorched)\b/i,
  /\bbroken (?:socket|switch|accessory)\b/i,
  /\bexposed conductor/i,
  /\breversed polarity\b/i,
];

const C2_PATTERNS = [
  /\b(no|missing|absent) (?:RCD|rcbo)\b/i,
  /\b(?:no|missing|absent) (?:CPC|earth(?:ing)? conductor)\b/i,
  /\b(?:no|missing) (?:main|supplementary) bond/i,
  /\bdamaged (?:cable|insulation)\b/i,
  /\bloose (?:termination|connection|tail)/i,
  /\bzs (?:exceeds|too high|fail)/i,
  /\bunder(?:s|-)?ized\b/i,
  /\binsulation (?:nicked|damaged|low)/i,
  /\b(?:over)?heating\b/i,
];

const C3_PATTERNS = [
  /\b(no|missing|absent) (?:SPD|surge protect)/i,
  /\b(no|missing|absent) AFDD\b/i,
  /\b(old|original) (?:wiring )?colour/i,
  /\b(no|missing) circuit (?:chart|labels?)/i,
  /\bsingle-?pole switching\b/i,
  /\bnot best practice\b/i,
];

const FI_PATTERNS = [
  /\b(?:cannot|could not|unable to) (?:access|inspect|determine)/i,
  /\b(?:suspected|possible) (?:damage|fault)/i,
  /\bconcealed (?:cable|wiring)/i,
  /\binaccessible\b/i,
];

function classify(defect: string): 'C1' | 'C2' | 'C3' | 'FI' | 'unclassified' {
  for (const re of C1_PATTERNS) if (re.test(defect)) return 'C1';
  for (const re of FI_PATTERNS) if (re.test(defect)) return 'FI';
  for (const re of C2_PATTERNS) if (re.test(defect)) return 'C2';
  for (const re of C3_PATTERNS) if (re.test(defect)) return 'C3';
  return 'unclassified';
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const category = (url.searchParams.get('category') || '').trim();

  if (category.length < 3) {
    return errorResponse(
      "Query param 'category' must be at least 3 characters (e.g. consumer_unit, rcd, lighting, socket)"
    );
  }

  const ilikeTerm = `*${escapeIlike(category)}*`;
  const result = await queryTable<PwiRow>(
    'practical_work_intelligence',
    `select=equipment_category,common_defects,primary_topic` +
      `&or=(equipment_category.ilike.${encodeURIComponent(ilikeTerm)},equipment_subcategory.ilike.${encodeURIComponent(ilikeTerm)},primary_topic.ilike.${encodeURIComponent(ilikeTerm)})` +
      `&limit=500`
  );

  if (!result.ok) {
    return jsonResponse(
      {
        error: 'upstream_error',
        message: 'Failed to query Elec-Mate verified data',
        upstream_status: result.status,
        source: CITATION_SOURCE,
      },
      502
    );
  }

  // Gather all defect strings (defensive — array can contain null elements)
  const allDefects: string[] = [];
  for (const r of result.data) {
    if (!Array.isArray(r.common_defects)) continue;
    for (const item of r.common_defects) {
      if (typeof item === 'string' && item.length > 0) allDefects.push(item);
    }
  }

  if (allDefects.length === 0) {
    return jsonResponse(
      {
        error: 'not_found',
        message: `No defect data matches '${category}' — cannot derive EICR codes.`,
        source: CITATION_SOURCE,
      },
      404
    );
  }

  // Dedupe + classify
  const dedup = new Map<string, number>();
  for (const d of allDefects) {
    const key = d.trim();
    dedup.set(key, (dedup.get(key) || 0) + 1);
  }

  const buckets: Record<string, Array<{ defect: string; frequency: number }>> = {
    C1: [],
    C2: [],
    C3: [],
    FI: [],
    unclassified: [],
  };

  for (const [defect, freq] of dedup.entries()) {
    const code = classify(defect);
    buckets[code].push({ defect, frequency: freq });
  }

  for (const k of Object.keys(buckets)) {
    buckets[k].sort((a, b) => b.frequency - a.frequency);
    buckets[k] = buckets[k].slice(0, 10);
  }

  return jsonResponse({
    query_category: category,
    sample_size: result.data.length,
    total_unique_defects: dedup.size,
    suggested_eicr_codes_by_severity: {
      C1_danger_present: buckets.C1,
      C2_potentially_dangerous: buckets.C2,
      C3_improvement_recommended: buckets.C3,
      FI_further_investigation: buckets.FI,
      unclassified: buckets.unclassified,
    },
    notes:
      "Codes derived from common_defects via pattern matching against IET BPG 4 (Issue 6) severity heuristics — not a hard mapping. Final classification is always the inspector's judgement. The 'unclassified' bucket contains defects that didn't match any pattern; the inspector should code these on a case-by-case basis.",
    citation:
      'Elec-Mate — defect classification via IET Best Practice Guide 4 (Issue 6) severity heuristics',
    source: CITATION_SOURCE,
    license: LICENSE_NOTE,
    tool_url: 'https://www.elec-mate.com/guides/eicr-schedule-of-inspections',
  });
}
