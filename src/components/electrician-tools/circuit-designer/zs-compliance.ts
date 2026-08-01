/**
 * Circuit compliance checks for the Circuit Designer — one place, because
 * getting these wrong is a safety call.
 *
 * ELE-1425 / ELE-1426. The designer used to *ask the model* for Zs and accept
 * whatever cable size it proposed. When Zs came back absent it rendered as
 * 0.00, and every results surface carried its own `(zs ?? 0) <= (maxZs ?? 999)`
 * — which passes, because 0 <= 2.73. The field read "0.00 / 2.73" with a green
 * tick. Separately a 1.5mm² cable was offered for a 330A circuit with nothing
 * on this side checking it.
 *
 * So the app calculates and judges, rather than trusting and displaying. The
 * chain implemented here is BS 7671:
 *
 *   Ib ≤ In            device rating carries the design current
 *   In ≤ Iz            Reg 433.1.1, where Iz = It × Ca × Cg × Ci (App 4)
 *   Zs ≤ Zs(max)       Reg 411.3.2, Zs = Ze + (R1+R2) at operating temperature
 *   Vd ≤ limit         Reg 525 / App 4 (3% lighting, 5% other by default)
 *
 * Every table used here is an existing verified one — Table 9A resistances via
 * r1r2Calculator, App 4 Iz and Vd factors and Tables 41.3/41.4 via
 * circuit-edit-validator. Nothing is invented in this file.
 */

import { calculateExpectedR1R2 } from '@/utils/r1r2Calculator';
import {
  lookupIz,
  vdFactorFor,
  STANDARD_CABLE_SIZES,
  detectRingFinal,
  checkTier4Lock,
  validateCpcSizeChange,
} from './circuit-edit-validator';

/**
 * R1+R2 is *recorded* at ambient, but Zs is assessed at conductor operating
 * temperature. Table 9B / GN3 give ~1.20 for 70°C thermoplastic — the same
 * factor designer-agent-v3 applies.
 */
const OPERATING_TEMP_FACTOR = 1.2;

/** Ze fallback when the supply carries none. TN-C-S typical maximum. */
const DEFAULT_ZE = 0.35;

export type ZsState = 'pass' | 'fail' | 'not-calculated' | 'no-limit';
export type ZsSource = 'design' | 'calculated' | 'none';

export interface ZsCircuitInput {
  calculations?: { zs?: number | null; maxZs?: number | null } | null;
  expectedTests?: { zs?: { expected?: number | null; maxPermitted?: number | null } | null } | null;
  cableSize?: number | null;
  cpcSize?: number | null;
  cableLength?: number | null;
}

export interface ZsCheck {
  value: number | null;
  max: number | null;
  state: ZsState;
  source: ZsSource;
  compliant: boolean;
  label: string;
}

/** Zs = Ze + (R1+R2) × operating-temperature factor. Null if inputs missing. */
export function computeZs(circuit: ZsCircuitInput | null | undefined, ze: number): number | null {
  const live = Number(circuit?.cableSize);
  const length = Number(circuit?.cableLength);
  if (!Number.isFinite(live) || live <= 0) return null;
  if (!Number.isFinite(length) || length <= 0) return null;

  const cpcRaw = Number(circuit?.cpcSize);
  // CPC defaults to the line size, matching calculateExpectedR1R2's own rule.
  const cpc = Number.isFinite(cpcRaw) && cpcRaw > 0 ? String(cpcRaw) : String(live);

  // Ambient factor 1.0 here: this returns R1+R2 as recorded, and the operating
  // temperature rise is applied below. Passing 1.2 in as the "temperature
  // correction" would conflate two different corrections — the utility's own
  // comment warns about exactly that.
  const r1r2At20C = calculateExpectedR1R2(String(live), cpc, length, 1.0);
  if (!Number.isFinite(r1r2At20C) || r1r2At20C <= 0) return null;

  const zs = ze + r1r2At20C * OPERATING_TEMP_FACTOR;
  return Number.isFinite(zs) && zs > 0 ? Number(zs.toFixed(3)) : null;
}

/**
 * `ze` is optional because a few results components render a circuit without
 * the supply in scope. We still calculate, but the label says the Ze was
 * assumed so nobody reads an assumption as a measurement.
 *
 * The derived value is preferred over a stored one: the whole point of the tool
 * is to work this out, and a model-supplied figure is not a calculation. A
 * stored value is used only when the conductor data needed to derive one is
 * missing.
 */
export function getZsCheck(
  circuit: ZsCircuitInput | null | undefined,
  ze?: number | null
): ZsCheck {
  const zeProvided = Number.isFinite(Number(ze)) && Number(ze) > 0;
  const zeUsed = zeProvided ? Number(ze) : DEFAULT_ZE;

  const rawMax = Number(circuit?.expectedTests?.zs?.maxPermitted ?? circuit?.calculations?.maxZs);
  const max = Number.isFinite(rawMax) && rawMax > 0 ? rawMax : null;

  let value = computeZs(circuit, zeUsed);
  let source: ZsSource = value === null ? 'none' : 'calculated';

  if (value === null) {
    const storedRaw = Number(circuit?.expectedTests?.zs?.expected ?? circuit?.calculations?.zs);
    if (Number.isFinite(storedRaw) && storedRaw > 0) {
      value = storedRaw;
      source = 'design';
    }
  }

  const suffix =
    source === 'calculated'
      ? zeProvided
        ? ' (calculated)'
        : ` (calculated, Ze assumed ${DEFAULT_ZE}Ω)`
      : '';

  if (max === null) {
    return {
      value,
      max: null,
      state: 'no-limit',
      source,
      compliant: false,
      label: value === null ? 'Not calculated' : `${value.toFixed(3)}Ω${suffix}`,
    };
  }

  if (value === null) {
    return {
      value: null,
      max,
      state: 'not-calculated',
      source,
      compliant: false,
      label: `Not calculated (Max: ${max.toFixed(3)}Ω)`,
    };
  }

  const compliant = value <= max;
  return {
    value,
    max,
    state: compliant ? 'pass' : 'fail',
    source,
    compliant,
    label: `${value.toFixed(3)}Ω${suffix} ${compliant ? '✓' : '✗'} (Max: ${max.toFixed(3)}Ω)`,
  };
}

export function isZsCompliant(
  circuit: ZsCircuitInput | null | undefined,
  ze?: number | null
): boolean {
  return getZsCheck(circuit, ze).compliant;
}

// ─── Cable adequacy — Reg 433.1.1 (ELE-1425) ────────────────────────────────

export interface CableCircuitInput {
  cableSize?: number | null;
  cableType?: string | null;
  designCurrent?: number | null;
  cableLength?: number | null;
  phases?: string | null;
  voltage?: number | null;
  protectionDevice?: { rating?: number | null } | null;
  deratingFactors?: { Ca?: number; Cg?: number; Ci?: number; overall?: number } | null;
  calculations?: { voltageDrop?: { limit?: number | null } | null } | null;
}

export interface CableAdequacy {
  /** Tabulated capacity before derating (App 4 reference method). */
  tabulatedIt: number | null;
  /** Effective capacity after Ca × Cg × Ci. */
  iz: number | null;
  /** Combined derating actually applied. */
  derating: number;
  /** The current the cable must carry: max(Ib, In). */
  required: number | null;
  adequate: boolean;
  shortfall: number | null;
  /** Smallest standard size that satisfies Iz ≥ required, when known. */
  recommendedSize: number | null;
  /** True when this is a ring final, which the radial rule does not govern. */
  ringFinal?: boolean;
}

/** Ca × Cg × Ci, preferring an explicit `overall` when the design supplies one. */
function deratingOf(circuit: CableCircuitInput | null | undefined): number {
  const d = circuit?.deratingFactors;
  if (!d) return 1;
  const overall = Number(d.overall);
  if (Number.isFinite(overall) && overall > 0) return overall;
  const parts = [d.Ca, d.Cg, d.Ci].map((n) => Number(n)).filter((n) => Number.isFinite(n) && n > 0);
  return parts.length ? parts.reduce((a, b) => a * b, 1) : 1;
}

/**
 * Reg 433.1.1 — Ib ≤ In ≤ Iz. A cable must carry the design current *and* the
 * rating of the device protecting it, after derating.
 */
export function getCableAdequacy(circuit: CableCircuitInput | null | undefined): CableAdequacy {
  const size = Number(circuit?.cableSize);
  const ib = Number(circuit?.designCurrent);
  const inRating = Number(circuit?.protectionDevice?.rating);
  const derating = deratingOf(circuit);

  const candidates = [ib, inRating].filter((n) => Number.isFinite(n) && n > 0);
  const required = candidates.length ? Math.max(...candidates) : null;

  const base = { derating, required, recommendedSize: null as number | null };

  if (!Number.isFinite(size) || size <= 0 || required === null) {
    return { ...base, tabulatedIt: null, iz: null, adequate: true, shortfall: null };
  }

  const it = lookupIz(size, circuit?.cableType ?? undefined);
  if (it == null) {
    // Unknown cable family or size — do not assert a failure we cannot support.
    return { ...base, tabulatedIt: null, iz: null, adequate: true, shortfall: null };
  }

  // A ring final is not assessed by the radial rule. BS 7671 (Appendix 15 /
  // Reg 433.1.5) deems a ring to satisfy 433.1.1 when it is protected by a
  // 30 A or 32 A device, wired in copper with line and neutral of at least
  // 2.5 mm² (1.5 mm² for two-core MI), and the cable's Iz is **not less than
  // 20 A**. Verified against the RAG, not recalled — the wording is
  // "deemed to meet the requirements of Regulation 433.1.1 if the
  // current-carrying capacity (Iz) of the cable is not less than 20 A".
  //
  // So 2.5mm² T&E (24 A) on a 32 A ring passes, while the same ring wired in
  // 1.5mm² (16 A) correctly fails — which the radial comparison could not
  // express, and which skipping the check entirely would have missed.
  if (detectRingFinal(circuit)) {
    const izRing = Number((it * derating).toFixed(1));
    const RING_MIN_IZ = 20;
    const isMineral = /mineral|\bmi\b|60702/i.test(String(circuit?.cableType ?? ''));
    const minCsa = isMineral ? 1.5 : 2.5;

    const csaOk = size >= minCsa;
    const izOk = izRing >= RING_MIN_IZ;

    return {
      ...base,
      tabulatedIt: it,
      iz: izRing,
      adequate: csaOk && izOk,
      shortfall: izOk ? null : Number((RING_MIN_IZ - izRing).toFixed(1)),
      // Smallest size meeting both the 20 A floor and the minimum csa.
      recommendedSize:
        csaOk && izOk
          ? null
          : (STANDARD_CABLE_SIZES.find((s) => {
              const tt = lookupIz(s, circuit?.cableType ?? undefined);
              return s >= minCsa && tt != null && tt * derating >= RING_MIN_IZ;
            }) ?? null),
      ringFinal: true,
    };
  }

  const iz = Number((it * derating).toFixed(1));
  const adequate = iz >= required;

  // Smallest standard size that would carry it, for an actionable message.
  const recommendedSize = adequate
    ? null
    : (STANDARD_CABLE_SIZES.find((s) => {
        const t = lookupIz(s, circuit?.cableType ?? undefined);
        return t != null && t * derating >= required;
      }) ?? null);

  return {
    tabulatedIt: it,
    iz,
    derating,
    required,
    adequate,
    shortfall: adequate ? null : Number((required - iz).toFixed(1)),
    recommendedSize,
  };
}

// ─── Voltage drop — Reg 525 / Appendix 4 ────────────────────────────────────

export interface VoltageDropCheck {
  percent: number | null;
  volts: number | null;
  limit: number;
  compliant: boolean;
  /** Null when there is not enough information to judge. */
  known: boolean;
}

export function getVoltageDrop(circuit: CableCircuitInput | null | undefined): VoltageDropCheck {
  // 3% for lighting, 5% otherwise, unless the design states its own limit.
  const limit = Number(circuit?.calculations?.voltageDrop?.limit ?? 5) || 5;
  const size = Number(circuit?.cableSize);
  const ib = Number(circuit?.designCurrent);
  const length = Number(circuit?.cableLength);
  const isThreePhase = String(circuit?.phases ?? '').toLowerCase() === 'three';
  const nominal =
    Number(circuit?.voltage) > 0 ? Number(circuit?.voltage) : isThreePhase ? 400 : 230;

  if (
    !Number.isFinite(size) ||
    size <= 0 ||
    !Number.isFinite(ib) ||
    ib <= 0 ||
    !Number.isFinite(length) ||
    length <= 0
  ) {
    return { percent: null, volts: null, limit, compliant: false, known: false };
  }

  const factor = vdFactorFor(size, circuit?.cableType ?? undefined, isThreePhase);
  if (factor == null) {
    return { percent: null, volts: null, limit, compliant: false, known: false };
  }

  // mV/A/m → volts, then as a percentage of nominal.
  // Ring final: the two legs are in parallel and the worst-case load point is
  // the mid-point, so the effective length-current product is L/4 — the same
  // rule the backend's vd-ring-validator applies. Using the radial formula on
  // a ring overstates the drop roughly fourfold.
  const effectiveLength = detectRingFinal(circuit) ? length / 4 : length;
  const volts = (factor * ib * effectiveLength) / 1000;
  const percent = (volts / nominal) * 100;

  return {
    percent: Number(percent.toFixed(2)),
    volts: Number(volts.toFixed(2)),
    limit,
    compliant: percent <= limit,
    known: true,
  };
}

// ─── Whole-circuit verdict ──────────────────────────────────────────────────

export type CircuitVerdict = 'pass' | 'warning' | 'fail';

export interface CircuitCompliance {
  verdict: CircuitVerdict;
  zs: ZsCheck;
  cable: CableAdequacy;
  voltageDrop: VoltageDropCheck;
  /** Ib ≤ In. False only when both are known and the device is too small. */
  deviceCarriesLoad: boolean;
  /** Plain-English reasons, most serious first — safe to render directly. */
  failures: string[];
  warnings: string[];
  /** Per-field findings from the edit-time validator suite. */
  fieldFindings: FieldFinding[];
}

export function getCircuitCompliance(
  circuit: (ZsCircuitInput & CableCircuitInput) | null | undefined,
  ze?: number | null
): CircuitCompliance {
  const zs = getZsCheck(circuit, ze);
  const cable = getCableAdequacy(circuit);
  const voltageDrop = getVoltageDrop(circuit);

  const ib = Number(circuit?.designCurrent);
  const inRating = Number(circuit?.protectionDevice?.rating);
  const deviceCarriesLoad =
    Number.isFinite(ib) && Number.isFinite(inRating) && ib > 0 && inRating > 0
      ? inRating >= ib
      : true;

  const failures: string[] = [];
  const warnings: string[] = [];

  if (cable.ringFinal && !cable.adequate && cable.iz !== null) {
    failures.push(
      `Ring final in ${circuit?.cableSize}mm² has Iz ${cable.iz} A — a ring is only deemed to ` +
        `satisfy Reg 433.1.1 with Iz of at least 20 A and 2.5mm² line/neutral (App 15)` +
        (cable.recommendedSize ? `. Use ${cable.recommendedSize}mm² or larger.` : '')
    );
  } else if (!cable.adequate && cable.iz !== null && cable.required !== null) {
    failures.push(
      `${circuit?.cableSize}mm² carries ${cable.iz} A after derating but the circuit needs ` +
        `${cable.required.toFixed(1)} A — undersized by ${cable.shortfall} A (Reg 433.1.1)` +
        (cable.recommendedSize ? `. Use ${cable.recommendedSize}mm² or larger.` : '')
    );
  }

  if (!deviceCarriesLoad) {
    failures.push(
      `Protective device ${inRating} A is below the design current ${ib.toFixed(1)} A (Reg 433.1.1)`
    );
  }

  if (zs.state === 'fail' && zs.value !== null && zs.max !== null) {
    failures.push(
      `Zs ${zs.value.toFixed(2)} Ω exceeds maximum ${zs.max.toFixed(2)} Ω — earth fault ` +
        `disconnection will not be achieved (Reg 411.3.2)`
    );
  } else if (zs.state === 'not-calculated') {
    // Distinguish "we lack the inputs" from "the source table stops here" —
    // GN3 Table B1 tabulates conductor resistance only up to 50 mm².
    const live = Number((circuit as Record<string, unknown>)?.cableSize);
    const overTable = Number.isFinite(live) && live > 50;
    warnings.push(
      overTable
        ? `Zs not calculated: conductor resistance is tabulated only up to 50 mm² (GN3 Table B1) ` +
            `and this circuit is ${live}mm² — verify the earth fault loop impedance by measurement`
        : 'Zs could not be calculated — conductor sizes or circuit length are missing, so earth ' +
            'fault disconnection has not been verified'
    );
  }

  if (voltageDrop.known && !voltageDrop.compliant && voltageDrop.percent !== null) {
    failures.push(
      `Voltage drop ${voltageDrop.percent.toFixed(2)}% exceeds the ${voltageDrop.limit}% limit ` +
        `(Reg 525)`
    );
  }

  // Ib underpins every other check — if the design current is wrong, each test
  // below passes against the wrong target. Deliberately conservative: only
  // single-phase circuits with a stated load, only a gross discrepancy, and only
  // ever a warning. Power factor and diversity are not modelled here, so a tight
  // tolerance would fire constantly on perfectly good designs.
  const loadPower = Number((circuit as Record<string, unknown>)?.loadPower);
  const nominalV = Number(circuit?.voltage);
  const isSingle = String(circuit?.phases ?? 'single').toLowerCase() !== 'three';
  if (
    isSingle &&
    Number.isFinite(loadPower) &&
    loadPower > 0 &&
    Number.isFinite(nominalV) &&
    nominalV > 0 &&
    Number.isFinite(ib) &&
    ib > 0
  ) {
    const expected = loadPower / nominalV;
    // 25% band absorbs power factor and rounding; beyond that something is wrong.
    if (expected > 0 && Math.abs(ib - expected) / expected > 0.25) {
      warnings.push(
        `Design current ${ib.toFixed(1)} A does not follow from ${loadPower} W at ${nominalV} V ` +
          `(expected about ${expected.toFixed(1)} A) — check the load figure, since every other ` +
          `check is measured against it`
      );
    }
  }

  // Every validator the repo already owns, now run against generated output.
  const fieldFindings = auditCircuitFields(circuit as Record<string, any>);
  for (const f of fieldFindings) {
    warnings.push(f.suggestion ? `${f.message} — ${f.suggestion.label}` : f.message);
  }

  const verdict: CircuitVerdict = failures.length ? 'fail' : warnings.length ? 'warning' : 'pass';
  return { verdict, zs, cable, voltageDrop, deviceCarriesLoad, failures, warnings, fieldFindings };
}

// ─── Field audit: run the edit-time validators over generated designs ───────
//
// The repo carries eleven validators in circuit-edit-validator.ts — cable size,
// CPC, protection rating, curve, length, cable type, installation method,
// diversity, special locations. Every one of them was wired only as a
// `validate={...}` prop on a manual edit field, so they fired when a human typed
// into a box and never once against what the model produced.
//
// That is the shape of both ELE-1425 and ELE-1426: the knowledge to catch the
// fault existed and was simply never pointed at the generated output. This runs
// each validator against the circuit's *current* value — validating a field by
// "changing" it to what it already is — so a generated design is held to the
// same standard as an edited one.
//
// Tier 4 locks are skipped: a lock means the value is deliberately fixed by
// regulation (a ring final's 2.5mm² under Appendix 15), not that it is wrong.

export interface FieldFinding {
  field: string;
  message: string;
  /** The validator's own suggested value, when it offers one. */
  suggestion?: { field: string; value: unknown; label: string };
}

type Check = {
  field: string;
  lockField: string;
  value: unknown;
  run: (
    circuit: unknown,
    value: never
  ) => { ok: boolean; error?: string; suggestion?: FieldFinding['suggestion'] };
};

export function auditCircuitFields(
  circuit: Record<string, any> | null | undefined
): FieldFinding[] {
  if (!circuit) return [];

  // Deliberately NOT the whole suite. Verified against textbook-correct
  // circuits, most of these validators are unsafe on generated input:
  //
  //  • cableType   — matches EXACTLY against CABLE_TYPE_OPTIONS, whose entries
  //                  are size-prefixed dropdown strings ('1.5 mm² PVC twin and
  //                  earth'). A generated 'PVC twin and earth' is never in the
  //                  list, so every ordinary circuit failed, and the suggestion
  //                  was just allowed[0] — telling a 10mm² shower to use 1.5mm².
  //  • cableLength — recomputes volt drop with the radial formula and T&E-only
  //                  factors. On a ring it reported 8.14% against the engine's
  //                  correct 2.03%, contradicting the figure shown beside it.
  //  • cableSize / protectionRating / curve
  //                — duplicate checks the engine already does properly, with
  //                  ring and derating awareness these do not have.
  //
  // That leaves the CPC check, which is genuinely additive: nothing else here
  // sizes the protective conductor (Table 54.7), and it reads only cableSize
  // and cpcSize, so free-form input does not trip it.
  const checks: Check[] = [
    {
      field: 'cpcSize',
      lockField: 'cpcSize',
      value: Number(circuit.cpcSize),
      run: validateCpcSizeChange as never,
    },
  ];

  const findings: FieldFinding[] = [];

  for (const check of checks) {
    // Nothing to validate against.
    if (check.value === undefined || check.value === null || check.value === '') continue;
    if (typeof check.value === 'number' && !Number.isFinite(check.value)) continue;

    // A locked field is fixed by regulation, not faulty.
    if (checkTier4Lock(circuit, check.lockField)) continue;

    let result: { ok: boolean; error?: string; suggestion?: FieldFinding['suggestion'] };
    try {
      result = check.run(circuit, check.value as never);
    } catch {
      // A validator throwing must never take the results page down with it.
      continue;
    }

    if (result && result.ok === false && result.error) {
      findings.push({ field: check.field, message: result.error, suggestion: result.suggestion });
    }
  }

  return findings;
}
