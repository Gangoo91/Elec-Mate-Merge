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

  // --- BS cable type codes (ELE-1445) ---
  // Trade labour books and wholesaler catalogues print the BS code; electricians
  // type the common name. Without these, searching "t&e" against Sean Mulcahy's
  // imported book returned NOTHING — every twin-and-earth row is "6242YH".
  ['6242y', '6242yh', 't and e', 'twin and earth', 'twin earth', 'flat twin and earth'],
  ['6491b', '6491x', 'singles', 'single core', 'conduit cable'],
  ['6181y', '6181yh', 'single insulated', 'meter tail', 'meter tails', 'tails'],
  ['swa', 'armoured', 'armoured cable', 'steel wire armoured', 'xlpe swa'],
  ['mi cable', 'mineral insulated', 'pyro', 'micc'],
  ['3093y', 'heat resistant flex', 'butyl flex'],

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
    // Amp shorthand. Electricians type "63a"; trade labour books print
    // "63amp". Without this, searching "63a" or "20a isolator" returns
    // NOTHING against an imported book — measured on Sean Mulcahy's, where
    // both scored zero hits across 1,256 items.
    .replace(/\b(\d+(?:\.\d+)?)\s*(?:a|amp|amps|ampere|amperes)\b/g, '$1 amp')
    // Millimetre shorthand, same reasoning: "2.5" / "2.5mm" / "2.5 mm".
    .replace(/\b(\d+(?:\.\d+)?)\s*mm\b/g, '$1 mm')
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

/**
 * Relevance score for a match — 0 means no match at all.
 *
 * `materialQueryMatches` is a FILTER: it answers yes/no and leaves results in
 * whatever order the array happened to be in. Against a 1,256-item labour book
 * that is close to useless — searching "2.5 t&e" returned 154 rows led by a
 * length of PVC conduit, and "downlight" led by a CCTV dome camera. The right
 * answer was in there both times, buried.
 *
 * Higher is better. Ties break on brevity, because a shorter name that matched
 * is nearly always the more specific item.
 */
export function materialMatchScore(itemName: string, query: string): number {
  const q = normaliseMaterialPhrase(query);
  if (!q) return 1;
  const name = normaliseMaterialPhrase(itemName);
  if (!name) return 0;
  const nameTokens = name.split(' ').filter(Boolean);

  // Imported rows are "SECTION — item — variant". A hit in the SECTION means the
  // item IS that thing; a hit in the variant often means it merely mentions it.
  // Searching "trunking" was returning lengths of cable installed IN trunking
  // ahead of actual trunking, because both contain the word.
  const sectionTokens = normaliseMaterialPhrase(itemName.split(' — ')[0] || '')
    .split(' ')
    .filter(Boolean);

  let best = 0;
  const expansions = expandMaterialQuery(query);
  for (let i = 0; i < expansions.length; i++) {
    const phrase = expansions[i];
    if (!phraseMatchesTokens(nameTokens, phrase)) continue;

    let score: number;
    if (name === phrase) score = 1000;
    else if (name.startsWith(phrase)) score = 600;
    else if (name.includes(phrase)) score = 400;
    else score = 200; // tokens present but scattered
    if (sectionTokens.length > 0 && phraseMatchesTokens(sectionTokens, phrase)) score += 250;
    // A hit on the literal query beats one reached through a synonym.
    if (i > 0) score -= 120;
    best = Math.max(best, score);
  }
  if (best === 0) return 0;

  // Brevity bonus, capped so it can never outrank a better match class.
  return best + Math.max(0, 60 - nameTokens.length * 4);
}

/** Filter and rank in one pass — what every search box should call. */
export function rankMaterialMatches<T>(
  items: T[],
  query: string,
  nameOf: (item: T) => string
): T[] {
  if (!normaliseMaterialPhrase(query)) return items;
  return items
    .map((item) => ({ item, score: materialMatchScore(nameOf(item), query) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.item);
}
