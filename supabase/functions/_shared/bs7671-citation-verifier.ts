/**
 * BS 7671 citation verifier (ELE-1260).
 *
 * Extracts regulation-number citations from AI answer text and checks every
 * one against the verified A4:2026 facet corpus. Anything the corpus doesn't
 * contain is an invented or mis-remembered citation — the exact failure mode
 * that cost us a paying customer ("AI Function was quoteing non existant
 * regs"). Grounding makes invention unlikely; this makes it structurally
 * unable to reach the user unflagged.
 *
 * Scope (v1): dotted regulation numbers (e.g. 411.3.3, 522.6.204, 643.7.3.201).
 * Table/figure/GN3/OSG references are not verified yet — they use different
 * numbering families and a false "unverified" flag is worse than no flag.
 */

// Matches 3-digit-rooted dotted reg numbers: 411.3, 411.3.3, 643.7.3.201.
// Guards: not preceded/followed by a digit or dot (so "BS 5839-1", "61439",
// IP ratings, cable CSAs and Zs values like 1.44 never match), and the root
// must be 100-999 (BS 7671 regs are always three-digit rooted).
const REG_CITATION_RE = /(?<![\d.])([1-9]\d{2}(?:\.\d{1,3}){1,3})(?![\d.])/g;

export interface CitationCheckResult {
  /** Every distinct reg-number-shaped citation found in the text. */
  cited: string[];
  /** Citations NOT present in the A4:2026 corpus. */
  unverified: string[];
  /** True when every citation checked out (or there were none). */
  clean: boolean;
}

export function extractRegCitations(text: string): string[] {
  const found = new Set<string>();
  for (const match of text.matchAll(REG_CITATION_RE)) {
    found.add(match[1]);
  }
  return Array.from(found);
}

/**
 * Verify citations against bs7671_known_reg_numbers — every regulation
 * number appearing in the bs7671_facets A4:2026 corpus (content +
 * context_prefix; 1,782 numbers, seeded facets-ONLY by the
 * known_reg_numbers_facets_only_rebuild migration). Deliberately NOT
 * seeded from bs7671_regulations — that table carries stale pre-A4 rows
 * and would bless renumbered/deleted citations (e.g. old 612.13, now
 * 643.10 in A4).
 *
 * Fails OPEN — on any lookup error we report clean rather than falsely
 * accusing the model, since an "unverified" flag on a real reg destroys
 * exactly the trust this exists to build.
 */
export async function verifyCitations(
  supabase: any,
  text: string
): Promise<CitationCheckResult> {
  const cited = extractRegCitations(text);
  if (cited.length === 0) return { cited, unverified: [], clean: true };

  try {
    // Check the exact numbers AND their parents in one query: a cited
    // sub-clause (e.g. 411.3.3.1) counts as verified if its parent clause
    // is a known number — the corpus doesn't enumerate every leaf.
    const candidates = new Set<string>(cited);
    for (const c of cited) {
      const parts = c.split('.');
      if (parts.length > 2) candidates.add(parts.slice(0, -1).join('.'));
    }

    const { data, error } = await supabase
      .from('bs7671_known_reg_numbers')
      .select('reg_number')
      .in('reg_number', Array.from(candidates));
    if (error) throw error;

    const known = new Set((data || []).map((r: { reg_number: string }) => r.reg_number));
    const unverified = cited.filter(
      (c) => !known.has(c) && !known.has(c.split('.').slice(0, -1).join('.'))
    );

    return { cited, unverified, clean: unverified.length === 0 };
  } catch (err) {
    console.warn('[citation-verifier] lookup failed — failing open:', err);
    return { cited, unverified: [], clean: true };
  }
}

/**
 * Build the correction instruction for a self-correct retry: the model is
 * told exactly which citations failed verification and must fix or drop
 * them without changing anything else.
 */
export function buildCorrectionInstruction(unverified: string[]): string {
  return `CITATION CHECK FAILED. The following regulation numbers in your answer do NOT exist in BS 7671:2018+A4:2026: ${unverified.join(
    ', '
  )}. Rewrite your answer with these citations corrected to the true regulation numbers, or with the claims restated without a specific regulation number if you are not certain. Do not change anything else about the answer. Never cite a regulation number you cannot verify.`;
}

/**
 * Last-resort scrub when self-correction still leaves invented citations:
 * replace each with an honest marker so an invented number never reaches
 * the user looking authoritative.
 */
export function scrubUnverifiedCitations(text: string, unverified: string[]): string {
  let out = text;
  for (const reg of unverified) {
    const re = new RegExp(
      `(?:Reg(?:ulation)?\\.?\\s*)?${reg.replace(/\./g, '\\.')}(?![\\d.])`,
      'g'
    );
    out = out.replace(re, 'BS 7671 (check the standard for the exact regulation)');
  }
  return out;
}
