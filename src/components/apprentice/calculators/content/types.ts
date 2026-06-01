/**
 * Grounded editorial content layer for the shared calculators.
 *
 * Numbers stay in each calculator (and in src/lib/calculators/bs7671-data/).
 * This layer carries the *editorial* — the teaching prose, worked example,
 * common mistakes and standards reference — so every calculator can render a
 * consistent, well-grounded explanation alongside its result.
 *
 * Prose and citations here are sourced from the platform's standards corpus
 * and verified against the authoritative BS 7671 reference before shipping.
 * Nothing in this layer is invented. Citations that cannot be verified are
 * dropped, and the calculator is flagged for review rather than shown.
 */

/**
 * The standard that governs a given calculator. Use `'none'` for pure-maths
 * or commercial tools (unit conversion, energy cost, Ohm's law) which are not
 * governed by a published standard — those must NOT carry a reg citation.
 */
export type GoverningStandard =
  | 'BS 7671'
  | 'BS 5266'
  | 'BS EN 12464'
  | 'BS EN 62305'
  | 'BS EN 60529'
  | 'BS EN 50522'
  | 'BS EN 50160'
  | 'ENA EREC G5'
  | 'IET On-Site Guide'
  | 'IET Guidance Note 3'
  | 'MCS'
  | 'ENA EREC G98'
  | 'ENA EREC G99'
  | 'ENA EREC G100'
  | 'IEEE 1584'
  | 'ISO 13297'
  | 'ABYC E-11'
  | 'none';

/** A single regulation / clause reference shown in the Standards section. */
export interface RegCitation {
  /** Which standard this clause belongs to. */
  standard: GoverningStandard;
  /** Human-readable reference, e.g. "Regulation 525.202" or "BS 5266-1 §5.3". */
  citation: string;
  /** The clause text/summary, faithful to the source. */
  clauseText: string;
  /** Related table references, e.g. ["Table 52", "Appendix 4"]. */
  tableRefs?: string[];
  /** Provenance: the source facet ids this citation was verified against. Never rendered. */
  sourceFacetIds?: string[];
}

/** One fully-worked numeric example backing up the live result. */
export interface WorkedExample {
  /** Short scenario description, e.g. "32 A ring final, 30 m run, 2.5 mm² T&E". */
  scenario: string;
  /** The inputs used, as label/value pairs. */
  inputs: { label: string; value: string }[];
  /** Human-readable working, one line per step. */
  steps: string[];
  /** The final answer, e.g. "Vd = 4.32 V (1.9%) — compliant". */
  result: string;
}

/** A small reference lookup table (optional). */
export interface QuickReference {
  title: string;
  columns: string[];
  rows: (string | number)[][];
  footnote?: string;
}

/** Grounding metadata — used by the coverage check / review gate. NEVER rendered. */
export interface GroundingMeta {
  /**
   * verified    — every citation matched the authoritative reference and prose came from the corpus.
   * thin        — corpus coverage was sparse; ships conservatively, worth a human glance.
   * needs-review — could not be auto-verified (e.g. a non-BS 7671 standard); author + flag before shipping.
   */
  status: 'verified' | 'thin' | 'needs-review';
  /** ISO date the content was generated. */
  generatedAt: string;
  /** Why a calc was flagged thin / needs-review, if applicable. */
  notes?: string;
}

/** The full grounded content object for a single calculator. */
export interface CalculatorContent {
  /** Must equal the calculator's value/slug in CalculatorSelector. */
  slug: string;
  /** Standard(s) that govern this calculation. Empty for pure-maths/commercial tools. */
  governingStandards: GoverningStandard[];
  /** Why getting this wrong matters (required — every calc has this). */
  whyItMatters: string[];
  /** When to run/trust this calc; input caveats and scope limits. */
  whenToCheck?: string[];
  /** Practitioner pitfalls. */
  commonMistakes?: string[];
  /** One fully-worked example. */
  workedExample?: WorkedExample;
  /** Standards references. Empty when governingStandards is empty. */
  standards: RegCitation[];
  /** Optional small lookup table. */
  quickReference?: QuickReference;
  /** Internal grounding metadata. Never rendered in the UI. */
  _grounding: GroundingMeta;
}
