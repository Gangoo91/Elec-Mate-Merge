/**
 * Keep AI prose honest about which regulations it cites.
 *
 * The observation writer is told to cite only the BS 7671 facets it was given,
 * and nothing enforces that: the reference list on the card is built from the
 * RAG and is clean, but the wording the inspector pastes onto a legal document
 * is whatever the model wrote. On 28 Sep 2026 it wrote "not compliant with
 * Regulation 830.3.201" for a loose kitchen socket — that number turned out to
 * come from a mislabelled RAG row (Appendix 6 schedule items filed under a
 * phantom "Chapter 83"), so it was in the allowed list and this guard would
 * have let it through; the data is fixed separately. The guard covers the other
 * case, which the prompt rule alone cannot: a number the model was never given.
 *
 * `keepOnlyListedRegulations` rewrites any regulation number in the prose that
 * was NOT in the grounding set. The reference becomes plain "BS 7671", which
 * stays true ("not compliant with BS 7671") rather than leaving a hole in the
 * sentence. A bare number is only treated as a regulation when it is
 * introduced by "Regulation"/"Reg" or has two or more dots — "230.4 V" and
 * "2.5 mm²" are measurements and must be left alone.
 */

const LISTED =
  /\b(Regulations?|Regs?\.?)\s+(\d{3}(?:\.\d+){1,3}(?:\s*(?:,|and|&|\/)\s*\d{3}(?:\.\d+){1,3})*)/gi;
// A full stop after the number is sentence punctuation, not another level.
const BARE_DEEP = /(?<![\d.])\d{3}(?:\.\d+){2,3}(?!\.?\d)/g;

export interface CitationGuardResult {
  text: string;
  removed: string[];
}

export function keepOnlyListedRegulations(
  text: string,
  allowed: Iterable<string>
): CitationGuardResult {
  const ok = new Set([...allowed].map((n) => n.trim()));
  const removed: string[] = [];

  let out = text.replace(LISTED, (_m, word: string, list: string) => {
    const nums = list.match(/\d{3}(?:\.\d+){1,3}/g) || [];
    const kept = nums.filter((n) => ok.has(n));
    for (const n of nums) if (!ok.has(n)) removed.push(n);
    if (kept.length === 0) return 'BS 7671';
    const label = kept.length === 1 ? word.replace(/s\b/i, '') : word;
    return `${label} ${kept.join(kept.length === 2 ? ' and ' : ', ')}`;
  });

  out = out.replace(BARE_DEEP, (n) => {
    if (ok.has(n)) return n;
    removed.push(n);
    return 'BS 7671';
  });

  // "BS 7671 BS 7671" or "BS 7671 of BS 7671" after two removals in a row.
  out = out.replace(/\bBS 7671(?:\s+(?:of|and|,)?\s*BS 7671)+/g, 'BS 7671');
  return { text: out, removed };
}
