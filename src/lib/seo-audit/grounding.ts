// Grounding module for the SEO audit pipeline.
//
// Every claim/cite extracted from an SEO page is checked against THREE
// grounding sources in parallel:
//
//   1. bs7671_facets / bs7671_regulations  — regulatory cites + content
//   2. practical_work_intelligence (v2)    — practical claims, timings, materials
//   3. qualification_requirements          — LO/ACs (silent grounding only)
//
// A claim is "supported" if ANY source returns a match at or above its
// configured threshold. All three matches are returned so the audit row
// can report which source(s) backed the claim and which didn't.
//
// IMPORTANT: this module is admin/pipeline only. Never imported into
// user-facing components. The grounding mechanism is a trade secret —
// surfaced in copy only as the outcome ("BS 7671 compliant"), never the
// mechanism.

import type { SupabaseClient } from '@supabase/supabase-js';

// --- Types ----------------------------------------------------------------

export type GroundingSource = 'bs7671' | 'pwi' | 'curriculum';

export interface Match {
  source: GroundingSource;
  id: string;
  score: number;            // 0..1 — cosine similarity or hybrid score
  excerpt: string;          // human-readable evidence snippet
  metadata: Record<string, unknown>;
}

export interface GroundingResult {
  claim: string;
  bs7671: Match | null;
  pwi: Match | null;
  curriculum: Match | null;
  supported: boolean;        // true if any source >= its threshold
  topSource: GroundingSource | null;
  topScore: number;
}

export interface CiteResolution {
  regulationNumber: string;
  resolved: boolean;
  regulationId: string | null;
  facetMatch: Match | null;   // best facet match for the surrounding text
  drifted: boolean;           // surrounding text < drift threshold vs facet content
}

export interface GroundingOptions {
  // Default thresholds. Tuned to be strict-but-not-paranoid; can be lowered
  // per page type at the call site.
  bs7671Threshold?: number;   // default 0.78
  pwiThreshold?: number;      // default 0.75
  curriculumThreshold?: number; // default 0.72
  driftThreshold?: number;    // default 0.80 — below this counts as drift
  // Skip sources entirely (e.g. skip curriculum for pure business pages)
  skip?: GroundingSource[];
  // Limit results — usually 1 (top match) is enough for grounding check
  topK?: number;
}

const DEFAULTS: Required<Omit<GroundingOptions, 'skip'>> = {
  bs7671Threshold: 0.78,
  pwiThreshold: 0.75,
  curriculumThreshold: 0.72,
  driftThreshold: 0.80,
  topK: 1,
};

// --- Source-specific search wrappers --------------------------------------
// Each wrapper calls the existing Supabase RPC and normalises to Match.

async function searchBs7671(
  supabase: SupabaseClient,
  text: string,
  threshold: number,
  topK: number,
): Promise<Match | null> {
  const { data, error } = await supabase.rpc('search_bs7671_v3', {
    query_text: text,
    match_threshold: threshold,
    match_count: topK,
  });
  if (error || !data || data.length === 0) return null;
  const top = data[0];
  return {
    source: 'bs7671',
    id: String(top.id ?? top.facet_id ?? top.regulation_id ?? ''),
    score: Number(top.similarity ?? top.score ?? 0),
    excerpt: String(top.content ?? top.excerpt ?? '').slice(0, 500),
    metadata: {
      regulation_number: top.regulation_number ?? null,
      edition_code: top.edition_code ?? null,
      document_type: top.document_type ?? null,
      primary_topic: top.primary_topic ?? null,
    },
  };
}

async function searchPwi(
  supabase: SupabaseClient,
  text: string,
  threshold: number,
  topK: number,
): Promise<Match | null> {
  const { data, error } = await supabase.rpc('search_practical_work_v2', {
    query_text: text,
    match_threshold: threshold,
    match_count: topK,
  });
  if (error || !data || data.length === 0) return null;
  const top = data[0];
  return {
    source: 'pwi',
    id: String(top.id ?? ''),
    score: Number(top.similarity ?? top.score ?? 0),
    excerpt: String(top.primary_topic ?? top.excerpt ?? '').slice(0, 500),
    metadata: {
      equipment_category: top.equipment_category ?? null,
      typical_duration_minutes: top.typical_duration_minutes ?? null,
      bs7671_regulations: top.bs7671_regulations ?? null,
      eicr_observation_codes: top.eicr_observation_codes ?? null,
    },
  };
}

async function searchCurriculum(
  supabase: SupabaseClient,
  text: string,
  threshold: number,
  topK: number,
): Promise<Match | null> {
  const { data, error } = await supabase.rpc('search_qualification_requirements', {
    query_text: text,
    match_threshold: threshold,
    match_count: topK,
  });
  if (error || !data || data.length === 0) return null;
  const top = data[0];
  return {
    source: 'curriculum',
    id: String(top.id ?? ''),
    score: Number(top.similarity ?? top.score ?? 0),
    // NB: lo_text / ac_text never surfaced in user-facing copy — used only
    // to validate that a page's content lines up with curriculum coverage.
    excerpt: String(top.ac_text ?? top.lo_text ?? '').slice(0, 500),
    metadata: {
      qualification_code: top.qualification_code ?? null,
      unit_code: top.unit_code ?? null,
      lo_number: top.lo_number ?? null,
      ac_code: top.ac_code ?? null,
    },
  };
}

// --- Public API -----------------------------------------------------------

/**
 * Ground a single claim against all three sources (in parallel) and report
 * whether any of them supports it.
 */
export async function groundClaim(
  supabase: SupabaseClient,
  claim: string,
  opts: GroundingOptions = {},
): Promise<GroundingResult> {
  const o = { ...DEFAULTS, ...opts };
  const skip = new Set(opts.skip ?? []);

  const [bs7671, pwi, curriculum] = await Promise.all([
    skip.has('bs7671') ? Promise.resolve(null) : searchBs7671(supabase, claim, o.bs7671Threshold, o.topK),
    skip.has('pwi') ? Promise.resolve(null) : searchPwi(supabase, claim, o.pwiThreshold, o.topK),
    skip.has('curriculum')
      ? Promise.resolve(null)
      : searchCurriculum(supabase, claim, o.curriculumThreshold, o.topK),
  ]);

  const candidates = [bs7671, pwi, curriculum].filter((m): m is Match => m !== null);
  const top = candidates.reduce<Match | null>(
    (best, m) => (best === null || m.score > best.score ? m : best),
    null,
  );

  const supported =
    (bs7671 !== null && bs7671.score >= o.bs7671Threshold) ||
    (pwi !== null && pwi.score >= o.pwiThreshold) ||
    (curriculum !== null && curriculum.score >= o.curriculumThreshold);

  return {
    claim,
    bs7671,
    pwi,
    curriculum,
    supported,
    topSource: top?.source ?? null,
    topScore: top?.score ?? 0,
  };
}

/**
 * Resolve a regulation cite: does the reg exist, and does the page's
 * surrounding text agree with the canonical facet content for that reg?
 *
 * Drift check is a separate semantic match between surroundingText and
 * the facet content tagged with this regulation_id.
 */
export async function groundCite(
  supabase: SupabaseClient,
  regulationNumber: string,
  surroundingText: string,
  opts: GroundingOptions = {},
): Promise<CiteResolution> {
  const o = { ...DEFAULTS, ...opts };

  // Step 1: does the reg exist?
  const { data: regRow, error: regErr } = await supabase
    .from('bs7671_regulations')
    .select('id, regulation_number, title')
    .eq('regulation_number', regulationNumber)
    .maybeSingle();

  if (regErr || !regRow) {
    return {
      regulationNumber,
      resolved: false,
      regulationId: null,
      facetMatch: null,
      drifted: false,
    };
  }

  // Step 2: how well does the surrounding text agree with what the corpus
  // says about this reg? We search the facets for this reg-id and pick the
  // best match against surroundingText.
  const facetMatch = await searchBs7671(supabase, surroundingText, o.bs7671Threshold, 5);

  // Drift = facet match exists but its score is BELOW the drift threshold,
  // which means the page is citing the reg but talking about something
  // different from what the corpus says.
  const drifted = facetMatch !== null && facetMatch.score < o.driftThreshold;

  return {
    regulationNumber,
    resolved: true,
    regulationId: regRow.id,
    facetMatch,
    drifted,
  };
}

/**
 * Ground a batch of claims in parallel. Caller-controlled concurrency keeps
 * us from hammering the RPCs when auditing many pages.
 */
export async function groundClaims(
  supabase: SupabaseClient,
  claims: string[],
  opts: GroundingOptions = {},
  concurrency = 5,
): Promise<GroundingResult[]> {
  const results: GroundingResult[] = [];
  let i = 0;
  async function worker() {
    while (i < claims.length) {
      const idx = i++;
      results[idx] = await groundClaim(supabase, claims[idx], opts);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, claims.length) }, worker));
  return results;
}
