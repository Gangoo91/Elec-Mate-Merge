/**
 * Material trade-phrase synonyms — ELE-1393.
 *
 * Electricians type everyday trade language ("2 gang socket", "twin socket",
 * "13A double") but supplier catalogues, the user's own Price Book and the
 * built-in materials list store more formal names ("Double Switched Socket").
 * Trigram/substring search misses these, so a typed phrase returns nothing and
 * the pricing feels broken (direct churn reason — Josh Green, 24 Jul 2026).
 *
 * This is the SINGLE source of truth for those aliases. `expandMaterialQuery`
 * turns a typed phrase into the set of equivalent phrases to search for, and
 * `materialQueryMatches` tests a candidate item name against that set — used to
 * filter the Price Book, Rate Card and built-in catalogue client-side, and to
 * expand the live supplier search.
 *
 * Extending: add a phrase to the right group, or add a new group. Keep each
 * group to genuinely interchangeable items — a single-gang group must never
 * share a phrase with the double-gang group, or the two will cross-match.
 */

/** A set of interchangeable trade phrases for the same item. */
type SynonymGroup = string[];

// Distinct groups — no phrase may appear in two groups.
export const MATERIAL_SYNONYM_GROUPS: SynonymGroup[] = [
  // --- Socket outlets ---
  ['2 gang socket', 'double socket', 'twin socket', '13a double', 'double socket outlet', 'double switched socket', 'twin gang socket', 'two gang socket'],
  ['1 gang socket', 'single socket', '13a single', 'single socket outlet', 'single switched socket', 'one gang socket'],
  ['usb socket', 'socket with usb', 'usb double socket', 'usb charging socket'],
  ['unswitched socket', 'unswitched spur', 'unswitched fused spur'],

  // --- Switches ---
  ['1 gang switch', 'single switch', 'one gang switch', '1 way switch', 'single light switch'],
  ['2 gang switch', 'double switch', 'twin switch', 'two gang switch'],
  ['2 way switch', 'two way switch', 'intermediate switch'],
  ['dimmer switch', 'dimmer', 'led dimmer'],
  ['cooker switch', 'cooker outlet', 'cooker control unit', '45a switch', 'cooker unit'],
  ['pull cord switch', 'pull cord', 'ceiling switch', 'pull switch'],

  // --- Consumer unit / protection ---
  ['consumer unit', 'fuse box', 'fuse board', 'fuseboard', 'distribution board', 'consumer box', 'cu', 'db'],
  ['rcbo', 'circuit breaker', 'trip', 'breaker'],
  ['mcb', 'miniature circuit breaker'],
  ['rcd', 'residual current device'],
  ['spd', 'surge protection', 'surge protector', 'surge device'],
  ['afdd', 'arc fault detection device', 'arc fault'],

  // --- Spurs / connection ---
  ['fused spur', 'fcu', 'fused connection unit', 'switched spur', 'fused connection'],

  // --- Lighting ---
  ['downlight', 'down light', 'recessed light', 'recessed downlight', 'spotlight', 'spot light', 'gu10 downlight'],
  ['pendant', 'pendant light', 'ceiling rose', 'lamp holder', 'batten holder'],
  ['led panel', 'ceiling panel', 'led light panel'],
  ['flood light', 'floodlight', 'security light'],

  // --- Cable ---
  ['twin and earth', 't and e', 'twin & earth', 'twin earth', '6242y', 'flat twin and earth', 'tande'],
  ['swa cable', 'swa', 'armoured cable', 'steel wire armoured'],
  ['flex', 'flexible cable', 'flex cable', '3 core flex', '3183y'],
  ['fire cable', 'fp200', 'fire rated cable', 'fp cable'],

  // --- Containment ---
  ['conduit', 'pvc conduit', 'metal conduit', 'galvanised conduit'],
  ['trunking', 'cable trunking', 'dado trunking', 'mini trunking'],

  // --- Boxes / accessories ---
  ['back box', 'pattress', 'pattress box', 'mounting box', 'knockout box'],
  ['junction box', 'jbox', 'j box', 'maintenance free junction box'],
  ['isolator', 'isolation switch', 'rotary isolator'],
  ['grid switch', 'grid plate', 'grid module'],
];

/** Normalise a phrase for comparison: lowercase, expand shorthand, strip noise. */
export function normaliseMaterialPhrase(input: string): string {
  return (input || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    // "2g" / "1g" → "2 gang" / "1 gang"
    .replace(/\b(\d)\s*g\b/g, '$1 gang')
    // drop anything that isn't a letter, number or space
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Does this synonym group apply to the typed query?
 * - single-word terms only match an exact single-word query (so "cu" never
 *   matches inside "circuit" and "flex" never matches inside "reflex")
 * - multi-word terms match when either contains the other (so "2 gang" finds
 *   "2 gang socket", and "double socket outlet" finds "double socket")
 */
function groupMatchesQuery(group: SynonymGroup, q: string): boolean {
  const qWords = q.split(' ').filter(Boolean);
  const qMulti = qWords.length >= 2;
  for (const term of group) {
    const t = normaliseMaterialPhrase(term);
    if (!t) continue;
    if (q === t) return true;
    const tMulti = t.includes(' ');
    if (tMulti && q.includes(t)) return true;
    if (qMulti && t.includes(q)) return true;
  }
  return false;
}

/**
 * Expand a typed phrase into the set of equivalent phrases to search for.
 * Always includes the original (normalised) query. Returns lowercase phrases.
 */
export function expandMaterialQuery(query: string): string[] {
  const q = normaliseMaterialPhrase(query);
  if (!q) return [];
  const out = new Set<string>([q]);
  for (const group of MATERIAL_SYNONYM_GROUPS) {
    if (groupMatchesQuery(group, q)) {
      for (const term of group) out.add(normaliseMaterialPhrase(term));
    }
  }
  return Array.from(out);
}

/**
 * True when every word of `phrase` matches a whole word in the item name's
 * tokens. Matching whole tokens (not substrings) stops short aliases leaking —
 * "cu" must not match "cir(cu)it". Plurals/derivations are tolerated only for
 * words of 4+ characters ("flex" → "flexible", "socket" → "sockets"), so short
 * aliases ("cu", "db", "t") still require an exact token.
 */
function phraseMatchesTokens(nameTokens: string[], phrase: string): boolean {
  const words = phrase.split(' ').filter(Boolean);
  if (!words.length) return false;
  return words.every((w) =>
    nameTokens.some((tok) => tok === w || (w.length >= 4 && tok.startsWith(w)))
  );
}

/**
 * Does a candidate item name match the typed query, allowing for trade
 * synonyms? Used to filter the Price Book, Rate Card and built-in catalogue.
 * The un-expanded query is always one of the phrases checked, so this is at
 * least as permissive as the previous `.includes()` filters for plain words.
 */
export function materialQueryMatches(itemName: string, query: string): boolean {
  const q = normaliseMaterialPhrase(query);
  if (!q) return true;
  const nameTokens = normaliseMaterialPhrase(itemName).split(' ').filter(Boolean);
  for (const phrase of expandMaterialQuery(query)) {
    if (phraseMatchesTokens(nameTokens, phrase)) return true;
  }
  return false;
}
