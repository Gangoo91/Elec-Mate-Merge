// 13-point SEO audit rubric. Version-locked — bump RUBRIC_VERSION in types.ts
// whenever weights or pass conditions change so re-scoring stays auditable.

import { RUBRIC_VERSION, type SuggestedAction } from './types';

export interface RubricCriterion {
  id: string;
  label: string;
  weight: number;
  description: string;
}

export const RUBRIC: readonly RubricCriterion[] = [
  {
    id: 'pre_rendered_html',
    label: 'Pre-rendered HTML',
    weight: 15,
    description:
      'After build, dist/ HTML contains <title>, <meta name=description>, <link rel=canonical>, <h1>, and >=1 JSON-LD block — all in source, not post-hydration.',
  },
  {
    id: 'bs7671_cites_resolve',
    label: 'BS 7671 cites resolve',
    weight: 15,
    description:
      'Every Regulation N(.M)* and Section N(.M)* match on the page resolves to a row in bs7671_regulations.',
  },
  {
    id: 'bs7671_cites_not_drifted',
    label: 'Cited content not drifted',
    weight: 10,
    description:
      'For each resolved cite, surrounding text agrees with canonical corpus content (semantic similarity >= 0.80). Below threshold = drift / possible hallucination.',
  },
  {
    id: 'practical_claims_supported',
    label: 'Practical claims supported',
    weight: 10,
    description:
      'Each extracted claim is fanned out to bs7671_facets, practical_work_intelligence and qualification_requirements in parallel. Claim passes if ANY source returns a match at or above its threshold (bs7671 0.78 / pwi 0.75 / curriculum 0.72).',
  },
  {
    id: 'tool_present',
    label: 'Working tool on page',
    weight: 10,
    description:
      'Page imports a calculator/tool component (from src/lib/calculators, src/components/electrician-tools, etc) AND that component renders without auth.',
  },
  {
    id: 'tool_unauthenticated',
    label: 'Tool usable unauthenticated',
    weight: 8,
    description:
      'Tool component is not wrapped in AuthGate/RequireAuth/SubscriptionGate/ProUser. Email/save gating is allowed; usage gating fails.',
  },
  {
    id: 'internal_link_health',
    label: 'Internal link health',
    weight: 5,
    description:
      'At least 6 contextual internal links in body. Zero broken (every href resolves against the app route map).',
  },
  {
    id: 'schema_validates',
    label: 'Schema validates',
    weight: 5,
    description:
      'All JSON-LD blocks pass Schema.org validation. Article/HowTo/FAQPage/Breadcrumb/WebPage present where applicable.',
  },
  {
    id: 'canonical_correct',
    label: 'Canonical correct',
    weight: 5,
    description:
      'Canonical href equals https://elec-mate.com{slug} and matches the route — no cross-canonicalisation.',
  },
  {
    id: 'no_cannibalising_twin',
    label: 'No cannibalising twin',
    weight: 5,
    description:
      'cannibalisation_role is null or "keep" — not "redirect_source".',
  },
  {
    id: 'unique_value',
    label: 'Unique value',
    weight: 5,
    description:
      'Embedding similarity to nearest sibling page < 0.92, OR page contains a tool / unique grounded content / unique downloadable asset.',
  },
  {
    id: 'mobile_usable',
    label: 'Mobile usable',
    weight: 5,
    description:
      'Headless render at 375px width: no horizontal scroll, all interactive elements >= 44px, CLS < 0.1.',
  },
  {
    id: 'depth_and_originality',
    label: 'Depth + originality',
    weight: 2,
    description:
      'Body text > 1200 words AND < 30% character-level overlap with any sibling page using the same template.',
  },
] as const;

export const RUBRIC_TOTAL_WEIGHT = RUBRIC.reduce((sum, c) => sum + c.weight, 0);
// Sanity: must sum to 100
if (RUBRIC_TOTAL_WEIGHT !== 100) {
  throw new Error(
    `Rubric weights must sum to 100, got ${RUBRIC_TOTAL_WEIGHT}. Adjust weights or bump RUBRIC_VERSION.`,
  );
}

export const BAND_THRESHOLDS = {
  green: 70,
  amber: 40,
} as const;

export function bandFor(score: number): 'green' | 'amber' | 'red' {
  if (score >= BAND_THRESHOLDS.green) return 'green';
  if (score >= BAND_THRESHOLDS.amber) return 'amber';
  return 'red';
}

export interface ActionInputs {
  score: number;
  criteriaPassed: Record<string, boolean>;
  cannibalisationRole?: 'keep' | 'redirect_source';
  hasSalvageableContent: boolean;
}

// Suggested action mapping — deterministic, derived from criteria_breakdown.
// Order matters: first match wins.
export function suggestAction(input: ActionInputs): SuggestedAction {
  const { score, criteriaPassed, cannibalisationRole, hasSalvageableContent } = input;

  if (cannibalisationRole === 'redirect_source') {
    return hasSalvageableContent ? 'merge' : 'kill_301';
  }

  if (score >= 90 && Object.values(criteriaPassed).every(Boolean)) {
    return 'leave';
  }

  const onlyDriftFails =
    !criteriaPassed['bs7671_cites_not_drifted'] &&
    Object.entries(criteriaPassed)
      .filter(([id]) => id !== 'bs7671_cites_not_drifted')
      .every(([, passed]) => passed);
  if (onlyDriftFails) return 'cite_refresh';

  if (!criteriaPassed['practical_claims_supported'] || !criteriaPassed['unique_value']) {
    return 'rag_augment';
  }

  if (score >= 40 && score <= 69 && !criteriaPassed['tool_present']) {
    return 'rewrite';
  }

  if (score < 40) {
    return hasSalvageableContent ? 'rewrite' : 'kill_301';
  }

  return 'rag_augment';
}

export { RUBRIC_VERSION };
