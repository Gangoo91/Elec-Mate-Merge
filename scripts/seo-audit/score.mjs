// Phase A scoring — applies the 13-criterion rubric to extracted page data.
// Criteria that need DB/embeddings/Playwright are deferred to Phase B/C.
//
// Per-page-type weight overrides: a calculator page MUST have a working
// calc; a guide page does NOT need one (but earns a bonus if present).
// The rubric percentage is computed against the SUM of weights that apply
// to that page type — so a well-built guide can reach 100% without a tool.

// Rubric must match src/lib/seo-audit/rubric.ts (RUBRIC_VERSION v1.0.1)
const CRITERIA = [
  { id: 'pre_rendered_html',           weight: 15, phase: 'C' }, // needs dist/ check
  { id: 'bs7671_cites_resolve',        weight: 15, phase: 'B' }, // needs DB
  { id: 'bs7671_cites_not_drifted',    weight: 10, phase: 'B' },
  { id: 'practical_claims_supported',  weight: 10, phase: 'B' },
  { id: 'tool_present',                weight: 10, phase: 'A' },
  { id: 'tool_unauthenticated',        weight:  8, phase: 'A' },
  { id: 'internal_link_health',        weight:  5, phase: 'A' },
  { id: 'schema_validates',            weight:  5, phase: 'C' }, // needs rendered HTML
  { id: 'canonical_correct',           weight:  5, phase: 'C' },
  { id: 'no_cannibalising_twin',       weight:  5, phase: 'A' },
  { id: 'unique_value',                weight:  5, phase: 'B' }, // needs embeddings
  { id: 'mobile_usable',               weight:  5, phase: 'C' }, // needs Playwright
  { id: 'depth_and_originality',       weight:  2, phase: 'A' },
];

// Per-page-type criterion applicability. Criteria not listed for a type are
// counted as bonus (pass adds points, fail neither passes nor fails — drops
// out of the percentage denominator).
const APPLICABILITY = {
  // Calculator/tool pages MUST have a working calc.
  calculator:  ['tool_present', 'tool_unauthenticated', 'internal_link_health', 'no_cannibalising_twin', 'depth_and_originality'],
  tool:        ['tool_present', 'tool_unauthenticated', 'internal_link_health', 'no_cannibalising_twin', 'depth_and_originality'],
  // Guide / comparison / hub / training / cert pages don't need a tool to be
  // great. Tool presence becomes a *bonus* — passes add to score but absence
  // doesn't penalise.
  guide:       ['internal_link_health', 'no_cannibalising_twin', 'depth_and_originality'],
  hub:         ['internal_link_health', 'no_cannibalising_twin'],
  comparison:  ['internal_link_health', 'no_cannibalising_twin', 'depth_and_originality'],
  training:    ['internal_link_health', 'no_cannibalising_twin', 'depth_and_originality'],
  cert:        ['internal_link_health', 'no_cannibalising_twin', 'depth_and_originality'],
  other:       ['internal_link_health', 'no_cannibalising_twin', 'depth_and_originality'],
};

export const RUBRIC_VERSION = 'v1.0.1';

export function scorePage({ extract, cannibalisationRole, slug }) {
  const pageType = extract.pageType || 'other';
  const applicable = new Set(APPLICABILITY[pageType] || APPLICABILITY.other);

  const criteria = {};
  let totalWeight = 0;
  let earned = 0;
  let bonusEarned = 0;

  for (const c of CRITERIA) {
    const result = evaluateCriterion(c, { extract, cannibalisationRole, slug });
    const isApplicable = applicable.has(c.id);
    criteria[c.id] = {
      weight: c.weight,
      phase: c.phase,
      passed: result.passed,
      applicable: isApplicable,
      contribution: result.passed ? c.weight : 0,
      notes: result.notes,
    };
    if (result.phase !== 'A' && result.skipped) {
      // Phase B/C criteria — neutral until they run.
      continue;
    }
    if (isApplicable) {
      totalWeight += c.weight;
      if (result.passed) earned += c.weight;
    } else if (result.passed) {
      // Non-applicable but passing = bonus. Capped at +10 so we don't
      // over-inflate scores for pages with abundant non-required pluses.
      bonusEarned += Math.min(c.weight, 4);
    }
  }

  // Percentage of the applicable Phase A bucket, plus capped bonus.
  const baseScore =
    totalWeight > 0 ? Math.round((earned / totalWeight) * 100) : 0;
  const phaseAScore = Math.min(100, baseScore + Math.round((bonusEarned / Math.max(totalWeight, 1)) * 100));

  const status = bandFor(phaseAScore);
  const suggestedAction = suggestAction({
    score: phaseAScore,
    criteria,
    cannibalisationRole,
    pageType,
  });

  return {
    phaseAScore,
    status,
    criteria,
    suggestedAction,
  };
}

function bandFor(score) {
  if (score >= 70) return 'green';
  if (score >= 40) return 'amber';
  return 'red';
}

function suggestAction({ score, criteria, cannibalisationRole, pageType }) {
  if (cannibalisationRole === 'redirect_source') {
    return score >= 40 ? 'merge' : 'kill_301';
  }
  // Tool/calculator pages MUST have a tool — if missing, always rewrite.
  const toolRequired = pageType === 'calculator' || pageType === 'tool';
  if (toolRequired && !criteria['tool_present']?.passed && score >= 30) {
    return 'rewrite';
  }
  if (score >= 90) return 'leave';
  if (score >= 70) return 'leave';
  if (score < 40) return score >= 20 ? 'rewrite' : 'kill_301';
  return 'rag_augment';
}

// ---------------------------------------------------------------------------
// Per-criterion evaluators
// ---------------------------------------------------------------------------
function evaluateCriterion(c, { extract, cannibalisationRole, slug }) {
  switch (c.id) {
    case 'pre_rendered_html':
      return { phase: 'C', skipped: true, passed: false, notes: 'requires dist/ check (Phase C)' };

    case 'bs7671_cites_resolve':
      return {
        phase: 'B',
        skipped: true,
        passed: false,
        notes: `${extract.bs7671Cites.length} cite(s) extracted; resolution deferred to Phase B`,
      };

    case 'bs7671_cites_not_drifted':
      return { phase: 'B', skipped: true, passed: false, notes: 'requires DB grounding (Phase B)' };

    case 'practical_claims_supported':
      return { phase: 'B', skipped: true, passed: false, notes: 'requires DB grounding (Phase B)' };

    case 'tool_present': {
      const passed = extract.toolComponentRendered === true;
      const notes = passed
        ? `tool rendered: ${extract.toolComponentImports.join(', ')}`
        : 'no calculator/tool component rendered';
      return { phase: 'A', skipped: false, passed, notes };
    }

    case 'tool_unauthenticated': {
      if (!extract.toolComponentRendered) {
        return { phase: 'A', skipped: false, passed: false, notes: 'no tool to evaluate' };
      }
      const passed = !extract.toolInsideAuthGate;
      return {
        phase: 'A',
        skipped: false,
        passed,
        notes: passed ? 'tool renders outside any auth gate' : 'tool is wrapped in an auth gate',
      };
    }

    case 'internal_link_health': {
      const count = extract.internalLinks.length;
      const passed = count >= 6;
      return { phase: 'A', skipped: false, passed, notes: `${count} internal link(s) (target >= 6)` };
    }

    case 'schema_validates':
      return { phase: 'C', skipped: true, passed: false, notes: 'requires rendered HTML (Phase C)' };

    case 'canonical_correct':
      return { phase: 'C', skipped: true, passed: false, notes: 'requires rendered HTML (Phase C)' };

    case 'no_cannibalising_twin': {
      if (cannibalisationRole === 'redirect_source') {
        return { phase: 'A', skipped: false, passed: false, notes: 'in a cannibalisation cluster as a loser' };
      }
      return { phase: 'A', skipped: false, passed: true, notes: 'no twin or this is the canonical' };
    }

    case 'unique_value':
      return { phase: 'B', skipped: true, passed: false, notes: 'requires embedding similarity (Phase B)' };

    case 'mobile_usable':
      return { phase: 'C', skipped: true, passed: false, notes: 'requires Playwright (Phase C)' };

    case 'depth_and_originality': {
      const passed = extract.wordCount >= 1200;
      return {
        phase: 'A',
        skipped: false,
        passed,
        notes: `wordCount ${extract.wordCount} (target >= 1200)`,
      };
    }

    default:
      return { phase: 'A', skipped: true, passed: false, notes: 'unknown criterion' };
  }
}
