// Redirect strategy for cannibalisation clusters (Spec 4).
//
// Inputs:
//   - one seo_cannibalisation_cluster row (members + topic)
//   - per-member signals (page_type, has_tool, gsc_clicks_30d, referring_domains, date_modified)
//
// Output:
//   - canonical winner (slug)
//   - RedirectDecision for every loser
//
// Where the manifest gets applied (belt-and-braces):
//   1. public/_redirects (Netlify-style) — primary
//   2. Vite plugin emits 301 headers in build output — non-Netlify hosting
//   3. seo_redirects table — runtime fallback

import type { RedirectDecision, RedirectManifest } from './types';

export interface ClusterMemberSignals {
  slug: string;
  pageType: 'tool' | 'guide' | 'hub' | 'comparison' | 'calculator' | 'cert' | 'training' | 'other';
  hasInteractiveTool: boolean;
  gscClicks30d?: number;          // from Search Console export — optional
  referringDomains?: number;      // from backlink data — optional
  dateModified: string;           // ISO date
  wordCount: number;
}

export interface ClusterDecisionInput {
  clusterId: string;
  clusterTopic: string;
  intentClass: 'tool' | 'guide' | 'comparison' | 'hub' | 'calculator' | 'cert' | 'training';
  members: ClusterMemberSignals[];
}

interface ScoredMember {
  member: ClusterMemberSignals;
  score: number;
  reasons: string[];
}

// Canonical-choice priority (deterministic). Higher score = stronger canonical.
function scoreMember(member: ClusterMemberSignals, intent: ClusterDecisionInput['intentClass']): ScoredMember {
  const reasons: string[] = [];
  let score = 0;

  // 1. Working interactive tool component (functional > prose)
  if (member.hasInteractiveTool) {
    score += 1000;
    reasons.push('interactive_tool_present');
  }

  // 2. Page namespace matches intent
  const namespaceMatch =
    (intent === 'tool' && member.slug.startsWith('/tools/')) ||
    (intent === 'calculator' && (member.slug.startsWith('/tools/') || member.slug.startsWith('/calculators/'))) ||
    (intent === 'guide' && member.slug.startsWith('/guides/')) ||
    (intent === 'comparison' && member.slug.startsWith('/compare/')) ||
    (intent === 'cert' && (member.slug.startsWith('/tools/') || member.slug.startsWith('/certificates/'))) ||
    (intent === 'training' && member.slug.startsWith('/training/')) ||
    (intent === 'hub' && member.slug.split('/').filter(Boolean).length === 1);
  if (namespaceMatch) {
    score += 500;
    reasons.push(`namespace_matches_intent:${intent}`);
  }

  // 3. GSC clicks last 30 days (organic equity)
  if (typeof member.gscClicks30d === 'number') {
    score += member.gscClicks30d;
    if (member.gscClicks30d > 0) reasons.push(`gsc_clicks_30d:${member.gscClicks30d}`);
  }

  // 4. Referring domains (off-page authority)
  if (typeof member.referringDomains === 'number') {
    score += member.referringDomains * 10;
    if (member.referringDomains > 0) reasons.push(`referring_domains:${member.referringDomains}`);
  }

  // 5. Word count tiebreaker (favour the more substantive page)
  score += Math.min(member.wordCount / 100, 30);

  // 6. Recency tiebreaker
  const ageMs = Date.now() - new Date(member.dateModified).getTime();
  const ageDays = ageMs / (1000 * 60 * 60 * 24);
  score += Math.max(0, 30 - ageDays / 30); // newer = small bump

  return { member, score, reasons };
}

export function decideCanonical(input: ClusterDecisionInput): {
  canonicalSlug: string;
  decisions: RedirectDecision[];
  reason: string;
} {
  if (input.members.length === 0) {
    throw new Error(`Cluster ${input.clusterId} has no members`);
  }
  if (input.members.length === 1) {
    return {
      canonicalSlug: input.members[0].slug,
      decisions: [],
      reason: 'Single member — no redirect needed.',
    };
  }

  const scored = input.members
    .map((m) => scoreMember(m, input.intentClass))
    // Stable lexicographic tiebreak at the bottom — fully deterministic
    .sort((a, b) => (b.score - a.score) || a.member.slug.localeCompare(b.member.slug));

  const winner = scored[0];
  const losers = scored.slice(1);

  const decisions: RedirectDecision[] = losers.map((loser) => {
    // Confidence reflects the gap between winner and this loser.
    // Normalise: winner_score / (winner_score + loser_score). Cap at 0.99.
    const denominator = winner.score + Math.max(loser.score, 1);
    const confidence = Math.min(0.99, winner.score / denominator);

    return {
      from: loser.member.slug,
      to: winner.member.slug,
      status: 301,
      clusterId: input.clusterId,
      clusterMembers: input.members.map((m) => m.slug),
      canonicalChosenBecause: winner.reasons,
      confidence: Number(confidence.toFixed(2)),
    };
  });

  return {
    canonicalSlug: winner.member.slug,
    decisions,
    reason: `Winner score ${winner.score.toFixed(0)} vs next ${scored[1].score.toFixed(0)}. Reasons: ${winner.reasons.join(', ')}.`,
  };
}

export function buildManifest(
  auditRunId: string,
  clusterDecisions: ReturnType<typeof decideCanonical>[],
): RedirectManifest {
  return {
    auditRunId,
    generatedAt: new Date().toISOString(),
    redirects: clusterDecisions.flatMap((d) => d.decisions),
  };
}

// Emit as Netlify-style _redirects file contents.
// Format: <from> <to> <status>!
// The ! forces the redirect even if the target route also exists.
export function emitNetlifyRedirects(manifest: RedirectManifest): string {
  const header = [
    `# Generated by SEO audit pipeline — run ${manifest.auditRunId}`,
    `# Generated at ${manifest.generatedAt}`,
    `# Do not edit by hand. Regenerate via npm run seo:audit:redirects.`,
    '',
  ].join('\n');

  const lines = manifest.redirects.map(
    (r) => `${r.from}  ${r.to}  ${r.status}!  # confidence=${r.confidence} cluster=${r.clusterId}`,
  );

  return header + lines.join('\n') + '\n';
}
