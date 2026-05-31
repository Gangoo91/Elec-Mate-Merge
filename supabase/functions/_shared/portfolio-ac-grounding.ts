/**
 * portfolio-ac-grounding — keeps the portfolio AI honest.
 *
 * The model is handed the real qualification ACs and the retrieved BS 7671
 * facets, but its tool output can still name AC codes or regulation numbers
 * that don't exist (training-data recall). These helpers drop anything the
 * model can't ground to the provided sources and replace AC wording with the
 * framework's authoritative text — so an apprentice never claims an invented
 * criterion or sees a hallucinated regulation number at gateway.
 */

/* ── Assessment-criteria whitelist ──────────────────────────────────────── */

export interface QualificationAcRow {
  unit_code?: unknown;
  unit_title?: unknown;
  lo_number?: unknown;
  ac_code?: unknown;
  ac_ref?: unknown; // some callers/RPCs name the AC column ac_ref
  ac_text?: unknown;
}

export interface CanonicalAc {
  unitCode: string;
  unitTitle: string;
  loNumber: string;
  acCode: string;
  acText: string;
}

export interface AcWhitelist {
  canonical: Map<string, CanonicalAc>;
  size: number;
}

// "AC 3.1.2" / "3.1.2" / "ac3.1.2" → "3.1.2"; "Unit 399" / "Unit399" / "399" →
// "399". Only a leading unit/ac token (followed by a digit or space) is
// stripped, so real codes like "K1", "ELTP06" or "103/003" are preserved.
const normCode = (v: unknown): string =>
  String(v ?? '')
    .toLowerCase()
    .replace(/^(?:unit|ac)(?=[\s\d])\s*/, '')
    .replace(/\s+/g, '')
    .replace(/[.;,]+$/g, '')
    .trim();

const acKey = (unit: unknown, ac: unknown): string => `${normCode(unit)}|${normCode(ac)}`;

// Split a claimed/suggested AC reference into its tokens, dropping the literal
// "unit"/"ac"/separator words. e.g. "Unit 103/003 · AC 9.4" → ["103/003","9.4"].
const refTokens = (ref: unknown): string[] =>
  String(ref ?? '')
    .split(/[\s·,;|]+/)
    .map((t) => t.trim())
    .filter((t) => t && !/^(?:unit|ac)$/i.test(t));

export function buildAcWhitelist(acData: QualificationAcRow[] | null | undefined): AcWhitelist {
  const canonical = new Map<string, CanonicalAc>();
  for (const row of acData ?? []) {
    const acCode = String(row.ac_code ?? row.ac_ref ?? '').trim();
    if (!acCode) continue;
    const k = acKey(row.unit_code, acCode);
    if (canonical.has(k)) continue;
    canonical.set(k, {
      unitCode: String(row.unit_code ?? '').trim(),
      unitTitle: String(row.unit_title ?? '').trim(),
      loNumber: String(row.lo_number ?? '').trim(),
      acCode,
      acText: String(row.ac_text ?? '').trim(),
    });
  }
  return { canonical, size: canonical.size };
}

/* ── Grounding matched criteria ─────────────────────────────────────────── */

export interface ModelMatch {
  unitCode?: unknown;
  acCode?: unknown;
  acText?: unknown;
  confidence?: unknown;
  reason?: unknown;
  toComplete?: unknown;
  [k: string]: unknown;
}

export interface GroundedMatch {
  unitCode: string;
  unitTitle: string;
  acCode: string;
  acText: string; // authoritative text from the framework when verified
  confidence: number; // clamped 0-100
  reason: string;
  grounded: boolean; // true only when matched to a real qualification AC
  toComplete?: string;
}

export interface GroundResult {
  kept: GroundedMatch[];
  droppedCount: number;
  droppedRefs: string[];
}

const clampConf = (v: unknown): number => {
  const n = Number(v);
  if (!isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
};

/**
 * Keep only matches whose (unit, ac) exists in the whitelist, overwriting the
 * AC text with the framework wording. Unmatched ACs are dropped. If the
 * whitelist is empty (the qualification AC lookup failed), matches pass through
 * marked `grounded: false` — we can't verify, so we keep them but never let the
 * UI auto-claim them.
 */
export function groundMatchedCriteria(
  matches: ModelMatch[] | null | undefined,
  wl: AcWhitelist
): GroundResult {
  const kept: GroundedMatch[] = [];
  const droppedRefs: string[] = [];
  const seen = new Set<string>();

  for (const m of matches ?? []) {
    const k = acKey(m.unitCode, m.acCode);
    const canon = wl.canonical.get(k);

    if (wl.size > 0 && !canon) {
      droppedRefs.push(`${String(m.unitCode ?? '')} ${String(m.acCode ?? '')}`.trim());
      continue;
    }
    if (seen.has(k)) continue;
    seen.add(k);

    kept.push({
      unitCode: canon?.unitCode || String(m.unitCode ?? '').trim(),
      unitTitle: canon?.unitTitle || '',
      acCode: canon?.acCode || String(m.acCode ?? '').trim(),
      acText: canon?.acText || String(m.acText ?? '').trim(),
      confidence: clampConf(m.confidence),
      reason: String(m.reason ?? '').trim(),
      grounded: !!canon,
      ...(typeof m.toComplete === 'string' && m.toComplete.trim()
        ? { toComplete: m.toComplete.trim() }
        : {}),
    });
  }

  return { kept, droppedCount: droppedRefs.length, droppedRefs };
}

/** Returns the canonical AC key for a claimed/suggested ref, or null if it
 *  matches no real AC. Tries each adjacent (unit, ac) token pair so it handles
 *  slashed/alphanumeric unit codes ("103/003", "ETP3-07") not just digits. */
function matchRefKey(ref: unknown, wl: AcWhitelist): string | null {
  const toks = refTokens(ref);
  for (let i = 0; i < toks.length - 1; i++) {
    const k = `${normCode(toks[i])}|${normCode(toks[i + 1])}`;
    if (wl.canonical.has(k)) return k;
  }
  return null;
}

/** True if any claimed AC string can't be matched to the qualification. */
export function findUnknownClaimedAcs(
  claimed: string[] | null | undefined,
  wl: AcWhitelist
): string[] {
  if (wl.size === 0) return [];
  const unknown: string[] = [];
  for (const c of claimed ?? []) {
    if (!matchRefKey(c, wl)) unknown.push(c);
  }
  return unknown;
}

/**
 * Ground a reflection's free-text AC refs (e.g. "311 1.4") against the real
 * qualification, returning only verified ones in the canonical
 * "<unit> AC <ac>" display format. Returns [] when the whitelist is
 * unavailable — we never auto-claim an AC we can't verify.
 */
export function groundSuggestedAcRefs(refs: unknown, wl: AcWhitelist): string[] {
  if (wl.size === 0 || !Array.isArray(refs)) return [];
  const out: string[] = [];
  const seen = new Set<string>();
  for (const r of refs) {
    const k = matchRefKey(r, wl);
    if (!k || seen.has(k)) continue;
    seen.add(k);
    const canon = wl.canonical.get(k)!;
    out.push(`${canon.unitCode} AC ${canon.acCode}`);
  }
  return out;
}

/* ── Grounding regulation citations ─────────────────────────────────────── */

export interface FacetLite {
  regNumber: string | null;
  facetId?: string;
}

export interface GroundedReg {
  reg: string;
  facetId?: string;
}

const normReg = (v: string): string =>
  v
    .toLowerCase()
    .replace(/^reg\.?\s*/, '')
    .replace(/\s+/g, '')
    .replace(/[.;,]+$/g, '');

/** Keep only reg numbers that appear in the retrieved facets; attach facetId. */
export function groundRegCites(
  modelRegs: unknown,
  facets: FacetLite[] | null | undefined
): GroundedReg[] {
  const byNum = new Map<string, string | undefined>();
  for (const f of facets ?? []) {
    if (f?.regNumber) byNum.set(normReg(f.regNumber), f.facetId);
  }
  const out: GroundedReg[] = [];
  const seen = new Set<string>();
  const list = Array.isArray(modelRegs) ? modelRegs : [];
  for (const r of list) {
    const raw = String(r ?? '').trim();
    if (!raw) continue;
    const n = normReg(raw);
    if (!byNum.has(n) || seen.has(n)) continue;
    seen.add(n);
    out.push({ reg: raw.replace(/^reg\.?\s*/i, '').trim(), facetId: byNum.get(n) });
  }
  return out;
}

/* ── Shared prompt guardrail ────────────────────────────────────────────── */

export const GROUNDING_RULES = `## Accuracy rules (critical)
- Only cite assessment criteria that appear in the Qualification structure above. Never invent AC codes, unit codes, or AC wording. If the evidence fits no listed AC, return an empty match list rather than guessing.
- Only cite BS 7671 regulation numbers that appear in the regulation context above. If the relevant regulation is not listed, describe the requirement in words without a number — do not recall a number from memory.
- If the photo is blurry, partial, or the evidence is ambiguous, say so honestly and lower the grade. Never invent test readings, measured values, or regulation numbers to fill gaps.`;
