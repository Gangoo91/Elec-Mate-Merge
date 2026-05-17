// Cannibalisation cluster detection.
// Groups slugs that compete for the same intent so the canonical-chooser
// can pick a winner and emit 301s for the rest.

const NAMESPACE_PREFIXES = [
  '/tools/',
  '/guides/',
  '/compare/',
  '/calculators/',
  '/training/',
  '/courses/',
  '/certificates/',
];

const SYNONYM_MAP = new Map([
  // Treat these tokens as equivalent for clustering. Add as we find them.
  ['eicr', 'eicr'],
  ['eic', 'eic'],
  ['mwc', 'minor-works'],
  ['minorworks', 'minor-works'],
  ['minor-works', 'minor-works'],
  ['voltage-drop', 'volt-drop'],
  ['voltagedrop', 'volt-drop'],
  ['voltdrop', 'volt-drop'],
  ['cable-size', 'cable-sizing'],
  ['cable-sizing', 'cable-sizing'],
  ['cable-calc', 'cable-sizing'],
]);

function normaliseSlug(slug) {
  let s = slug.toLowerCase().trim();
  // Strip leading namespace prefix
  for (const prefix of NAMESPACE_PREFIXES) {
    if (s.startsWith(prefix)) {
      s = s.slice(prefix.length);
      break;
    }
  }
  // Strip leading slash
  s = s.replace(/^\/+/, '').replace(/\/+$/, '');
  // Strip common qualifier tails ("-page", "-guide", "-uk", "-2026")
  s = s.replace(/-(page|guide|uk|2026|2025|2024)+$/g, '');
  // Replace separators
  s = s.replace(/[_\s]+/g, '-');
  // Apply synonym map per-token
  const tokens = s.split('-').filter(Boolean);
  const mapped = tokens.map((t) => SYNONYM_MAP.get(t) ?? t);
  return mapped.join('-');
}

export function detectClusters(extracts, slugByFile) {
  // extracts: PageExtract[]
  // slugByFile: Map<sourceFile, slug>
  const byNormalised = new Map();
  for (const ex of extracts) {
    const slug = slugByFile.get(ex.sourceFile);
    if (!slug) continue;
    const key = normaliseSlug(slug);
    if (!byNormalised.has(key)) byNormalised.set(key, []);
    byNormalised.get(key).push({ slug, extract: ex });
  }

  const clusters = [];
  for (const [normalised, members] of byNormalised.entries()) {
    if (members.length < 2) continue;
    clusters.push({
      clusterTopic: normalised,
      members: members.map((m) => m.slug),
      intentClass: inferIntentClass(members),
    });
  }
  return clusters;
}

function inferIntentClass(members) {
  const types = members.map((m) => m.extract.pageType);
  if (types.includes('tool') || types.includes('calculator')) return 'tool';
  if (types.includes('comparison')) return 'comparison';
  if (types.includes('cert')) return 'cert';
  if (types.includes('training')) return 'training';
  if (types.includes('hub')) return 'hub';
  return 'guide';
}

// Canonical-chooser: deterministic scoring. Highest score wins.
// Mirrors src/lib/seo-audit/redirect-strategy.ts but operates on extracts.
export function chooseCanonical(cluster, slugByFile, fileBySlug) {
  const scored = cluster.members.map((slug) => {
    const file = fileBySlug.get(slug);
    const ex = file ? extractsBySlug(slugByFile, [slug])[0]?.extract : null;
    let score = 0;
    const reasons = [];

    if (ex?.toolComponentRendered) {
      score += 1000;
      reasons.push('interactive_tool_present');
    }

    // Namespace match
    if (slug.startsWith('/tools/') && cluster.intentClass === 'tool') {
      score += 500;
      reasons.push('namespace_match:/tools/');
    } else if (slug.startsWith('/guides/') && cluster.intentClass === 'guide') {
      score += 500;
      reasons.push('namespace_match:/guides/');
    } else if (slug.startsWith('/compare/') && cluster.intentClass === 'comparison') {
      score += 500;
      reasons.push('namespace_match:/compare/');
    }

    // Word count tiebreaker (favour substantive pages)
    score += Math.min((ex?.wordCount ?? 0) / 100, 30);

    // Internal links tiebreaker (favour better-linked pages)
    score += Math.min((ex?.internalLinks?.length ?? 0), 20);

    return { slug, score, reasons };
  });

  // Deterministic tiebreak: lexicographic slug
  scored.sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug));
  return {
    canonical: scored[0].slug,
    reasons: scored[0].reasons,
    scored,
  };
}

function extractsBySlug(slugByFile, slugs) {
  // Helper unused after refactor — kept for API symmetry
  const set = new Set(slugs);
  const result = [];
  for (const [file, slug] of slugByFile.entries()) {
    if (set.has(slug)) result.push({ file, slug });
  }
  return result;
}
