/**
 * BS 7671 Query Understanding
 *
 * Fast, pure-function query parser for BS 7671 / A4:2026 questions.
 * Extracts structured signals so the downstream retriever and model router
 * can make smart decisions WITHOUT a round-trip to an LLM.
 *
 * Outputs:
 *   - regulation_numbers  e.g. ["411.3.3", "722.531.3.101"]
 *   - table_refs          e.g. ["41.1", "54.1", "4D1"]
 *   - figure_refs         e.g. ["54.1"]
 *   - topic_tags          canonical vocab: 'rcd' | 'afdd' | 'earthing' | 'tn-c-s' | ...
 *   - intent              'definition' | 'calculation' | 'procedure' | 'amendment_compare' | 'general'
 *   - zones               e.g. ["zone 0", "zone 1"] (special locations)
 *   - system_types        e.g. ["TN-C-S", "TT"]
 *   - equipment_category  e.g. "ev_charger" | "solar_pv" | "shower"
 *   - protection_method   e.g. "ads" | "rcd" | "afdd"
 *
 * Performance: <2ms for a typical query.
 */

export type QueryIntent =
  | 'definition'
  | 'calculation'
  | 'procedure'
  | 'amendment_compare'
  | 'general';

export interface BS7671QueryUnderstanding {
  original: string;
  regulation_numbers: string[];
  table_refs: string[];
  figure_refs: string[];
  topic_tags: string[];
  zones: string[];
  system_types: string[];
  equipment_category?: string;
  protection_method?: string;
  intent: QueryIntent;
  /** Whether we should trigger calculator tool-calls. */
  is_calculation: boolean;
  /** Whether this query compares amendments (e.g. "what changed in A4:2026"). */
  is_amendment_compare: boolean;
  /** Whether the query is technical enough to deserve an LLM fallback if pattern parse is empty. */
  is_technical: boolean;
  /** A normalised keyword set useful for BM25 full-text / BM25 fallback. */
  normalised_keywords: string[];
}

// ─── Canonical topic vocabulary ──────────────────────────────────────────
// Map a variety of user phrasings → canonical topic tag.
const TOPIC_VOCAB: Record<string, string[]> = {
  rcd: ['rcd', 'residual current device', 'rcbo', '30ma', '30 ma'],
  afdd: ['afdd', 'arc fault', 'arc-fault'],
  spd: ['spd', 'surge protection', 'surge protective', 'overvoltage'],
  earthing: ['earth', 'earthing', 'grounding', 'cpc', 'r2', 'met'],
  bonding: ['bonding', 'equipotential', 'main bonding', 'supplementary bonding'],
  'tn-c-s': ['tn-c-s', 'tncs', 'pme', 'protective multiple earthing', 'pnb'],
  'tn-s': ['tn-s', 'tns'],
  tt: ['tt system', 'earth rod', 'earth electrode'],
  'voltage-drop': ['voltage drop', 'volt drop', 'mv/a/m', 'vd '],
  'cable-sizing': ['cable size', 'cable sizing', 'csa', 'cross sectional'],
  zs: ['zs', 'loop impedance', 'earth fault loop', 'efli'],
  ze: ['ze', 'external earth fault loop'],
  'disconnection-time': ['disconnection time', '0.4s', '5s', '0.2s'],
  'ring-final': ['ring final', 'ring main', 'ring circuit', 'r1+r2'],
  bathroom: ['bathroom', 'section 701', 'zone 0', 'zone 1', 'zone 2', 'wet room'],
  'ev-charging': ['ev', 'electric vehicle', 'charge point', 'evcp', 'section 722'],
  'solar-pv': ['solar', 'pv', 'photovoltaic', 'section 712'],
  inspection: ['inspection', 'periodic inspection', 'eicr'],
  testing: ['insulation resistance', 'ir test', 'megger', 'polarity'],
  certification: ['eic', 'eicr', 'minor works', 'certificate'],
  fire: ['fire alarm', 'bs 5839', 'fire detection', 'smoke detection'],
  'special-locations': ['section 7', 'swimming pool', 'sauna', 'construction site'],
  // A4:2026 new scope — Power over Ethernet (Section 716, Reg 110.1.1).
  // Users routinely type "POE" upper-case; the stored text uses "PoE".
  // Keep this tag so retrieval fans into the Section 716 facets.
  poe: ['poe', 'pse', 'power over ethernet', 'power-over-ethernet', 'section 716', '110.1.1'],
};

const TOPIC_CANONICAL = new Set(Object.keys(TOPIC_VOCAB));

// Protection method canonical list (aligns to bs7671_facets.protection_method).
const PROTECTION_METHODS: Record<string, string[]> = {
  ads: ['automatic disconnection', 'ads ', 'auto disconnection'],
  rcd: ['rcd', 'residual current device'],
  afdd: ['afdd', 'arc fault'],
  spd: ['spd', 'surge protective'],
  double_insulation: ['double insulation', 'class ii', 'class 2'],
  selv: ['selv', 'separated extra low voltage'],
  pelv: ['pelv', 'protective extra low voltage'],
};

// Equipment category canonical list (aligns to bs7671_facets.equipment_category).
const EQUIPMENT_CATEGORIES: Record<string, string[]> = {
  ev_charger: ['ev charger', 'electric vehicle', 'charge point', 'evcp'],
  solar_pv: ['solar', 'pv ', 'photovoltaic'],
  shower: ['shower'],
  cooker: ['cooker', 'oven', 'hob'],
  consumer_unit: ['consumer unit', 'fuseboard', 'cu ', 'distribution board'],
  socket: ['socket', 'outlet', '13a'],
  lighting: ['lighting', 'luminaire', 'light fitting'],
  motor: ['motor', 'dol ', 'star delta'],
};

// System type canonical (aligns to bs7671_facets.system_types[]).
const SYSTEM_TYPES: Record<string, string[]> = {
  'TN-C-S': ['tn-c-s', 'tncs', 'pme', 'pnb'],
  'TN-S': ['tn-s', 'tns'],
  TT: ['tt system', 'tt earth', 'tt installation'],
  IT: ['it system', 'it earth'],
};

// ─── Regex patterns ──────────────────────────────────────────────────────

// Regulation numbers: 411.3.3, 722.531.3.101, Reg 411-3-3, Regulation 411.3.3, 411.3
const REG_NUMBER_RE = /(?:\b(?:reg(?:ulation)?|section)\s*)?\b(\d{3}(?:[.\-]\d+){1,3})\b/gi;

// Tables: Table 41.1, Table 4D1, Table 54.7
const TABLE_RE = /\btable\s+(\d+[A-Z]?(?:[.\d]+)?)\b/gi;

// Figures: Figure 41.1 / Fig 41.1
const FIGURE_RE = /\b(?:figure|fig\.?)\s+(\d+[A-Z]?(?:[.\d]+)?)\b/gi;

// Zones: Zone 0 / Zone 1 / Zone 2
const ZONE_RE = /\bzone\s*(\d)\b/gi;

// Amendment keywords: "changed in A4", "what's new in 2026"
const AMENDMENT_RE =
  /\b(a4|amendment\s*4|2026|changed|new in|what's? new|differ(?:ence)?|compared? to|vs\.?|since)\b/i;

// Intent patterns (order matters — first match wins).
const INTENT_PATTERNS: Array<[QueryIntent, RegExp]> = [
  [
    'calculation',
    /\b(calculate|calc|size the|work out|compute|what.*(size|voltage drop|vd|zs|current|cable))\b/i,
  ],
  ['amendment_compare', /\b(what.*(changed|new)|compared?\s*to|vs\.?|before.*a4|since.*a4)\b/i],
  ['procedure', /\b(how (do|to)|procedure|steps?|test|commission|install|inspect|verify)\b/i],
  [
    'definition',
    /\b(what (is|does|are)|define|definition|meaning of|explain|what.*(mean|stand for))\b/i,
  ],
];

// ─── Helpers ─────────────────────────────────────────────────────────────

function normaliseRegNumber(raw: string): string {
  // Convert "411-3-3" → "411.3.3"
  return raw.replace(/-/g, '.');
}

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function extractAll(query: string, re: RegExp): string[] {
  const out: string[] = [];
  let m: RegExpExecArray | null;
  // Ensure regex is global (has /g flag).
  re.lastIndex = 0;
  while ((m = re.exec(query)) !== null) {
    out.push(m[1]);
  }
  return out;
}

function matchCategoryVocab(
  lower: string,
  vocab: Record<string, string[]>
): string | undefined {
  for (const [canonical, phrases] of Object.entries(vocab)) {
    if (phrases.some((p) => lower.includes(p))) {
      return canonical;
    }
  }
  return undefined;
}

function extractTopicTags(lower: string): string[] {
  const tags: string[] = [];
  for (const [tag, phrases] of Object.entries(TOPIC_VOCAB)) {
    if (phrases.some((p) => lower.includes(p))) {
      tags.push(tag);
    }
  }
  return tags;
}

function extractSystemTypes(lower: string): string[] {
  const out: string[] = [];
  for (const [canonical, phrases] of Object.entries(SYSTEM_TYPES)) {
    if (phrases.some((p) => lower.includes(p))) {
      out.push(canonical);
    }
  }
  return out;
}

function determineIntent(query: string): QueryIntent {
  for (const [intent, re] of INTENT_PATTERNS) {
    if (re.test(query)) return intent;
  }
  return 'general';
}

/**
 * Parse a user query into a structured understanding.
 * Pure function — no network calls.
 */
export function understandBS7671Query(query: string): BS7671QueryUnderstanding {
  const raw = (query || '').trim();
  const lower = raw.toLowerCase();

  // Extract regulation / table / figure refs.
  const reg_numbers_raw = extractAll(raw, REG_NUMBER_RE).map(normaliseRegNumber);
  const regulation_numbers = uniq(reg_numbers_raw).filter((n) => {
    // Drop refs that look like table or appendix numbers (4D1, 41.1 without prefix).
    // Tables will still be picked up by TABLE_RE.
    return /^\d{3}(?:\.\d+)+$/.test(n);
  });

  const table_refs = uniq(extractAll(raw, TABLE_RE));
  const figure_refs = uniq(extractAll(raw, FIGURE_RE));
  const zone_digits = uniq(extractAll(raw, ZONE_RE));
  const zones = zone_digits.map((z) => `zone ${z}`);

  // Topic and vocab extraction.
  const topic_tags = extractTopicTags(lower);
  const system_types = extractSystemTypes(lower);
  const equipment_category = matchCategoryVocab(lower, EQUIPMENT_CATEGORIES);
  const protection_method = matchCategoryVocab(lower, PROTECTION_METHODS);

  // Intent detection.
  let intent = determineIntent(raw);
  const is_amendment_compare = AMENDMENT_RE.test(raw);
  if (is_amendment_compare) intent = 'amendment_compare';

  // "Technical" heuristics: if any specific structured signal was extracted,
  // or intent != general, treat as technical.
  const is_technical =
    regulation_numbers.length > 0 ||
    table_refs.length > 0 ||
    figure_refs.length > 0 ||
    zones.length > 0 ||
    topic_tags.length > 0 ||
    !!equipment_category ||
    !!protection_method ||
    system_types.length > 0 ||
    intent !== 'general';

  const is_calculation = intent === 'calculation';

  // Normalised keywords — simple stopword-stripped tokens, capped.
  const STOP = new Set([
    'the',
    'a',
    'an',
    'what',
    'is',
    'are',
    'how',
    'do',
    'i',
    'to',
    'of',
    'for',
    'in',
    'on',
    'at',
    'by',
    'with',
    'and',
    'or',
    'does',
    'can',
    'should',
    'would',
    'me',
    'my',
    'this',
    'that',
    'it',
    'be',
    'was',
    'were',
  ]);
  const normalised_keywords = uniq(
    lower
      .replace(/[^\w\s.%]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 1 && !STOP.has(w))
  ).slice(0, 40);

  return {
    original: raw,
    regulation_numbers,
    table_refs,
    figure_refs,
    topic_tags,
    zones,
    system_types,
    equipment_category,
    protection_method,
    intent,
    is_calculation,
    is_amendment_compare,
    is_technical,
    normalised_keywords,
  };
}

/** Exposed so callers can test or compose with the canonical topic set. */
export function listTopicVocabulary(): string[] {
  return Array.from(TOPIC_CANONICAL);
}
