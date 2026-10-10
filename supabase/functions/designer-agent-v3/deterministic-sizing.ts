/**
 * Deterministic capacity + voltage drop — replaces the AI's numbers with the
 * verified Appendix 4 data the in-app calculators and Elec-AI's
 * select_cable_size use (`_shared/bs7671-appendix4`, synced by
 * scripts/sync-edge-bs7671-data.mjs).
 *
 * Why (audit of 611 real circuits, 10 Oct 2026):
 *   - Voltage drop came from the model. 219 circuits showed under half the
 *     real figure; 19 over the limit were shown compliant (warehouse lighting
 *     12.1% shown as 0.33%). Rings were worst: the old ring tripwire divided
 *     EVERY ring by 4 — its "already a ring figure?" test was
 *     `raw <= (raw / 4) * 1.4`, which is never true — so a model that had
 *     already used the ring formula was divided by 4 twice.
 *   - Capacity used local tables that disagreed with Appendix 4: the "PVC T&E"
 *     column (1.5 → 16 A, 2.5 → 24 A, 6 → 41 A) is not the clipped-direct
 *     figure, and the "SWA 4D4A" table held the twin-and-earth values.
 *
 * What it does, per circuit, AFTER the model and the type/voltage tripwires:
 *   1. Radials: Iz from Appendix 4 for the cable type, method and phase, × any
 *      derating the design states. In > Iz → the smallest size with Iz ≥ In
 *      (Reg 433.1.1). Rings are left to their own rule.
 *   2. Voltage drop: mV/A/m × Ib × L, ÷ 4 for a ring (two legs, worst case at
 *      the mid-point — ONCE), against the circuit's limit (3% lighting, 5%
 *      other unless the design set one).
 *   3. Over the limit: twin & earth radials are upsized to the smallest size
 *      passing both checks (CPC from the standard T&E pairing). Anything else
 *      is marked not compliant and reported — a ring or an SWA run that fails
 *      needs a design decision, not a silent change.
 * Circuits whose cable or method can't be mapped to a table are left exactly
 * as the model produced them, and say so in the log.
 */

import {
  capacityTables,
  getAvailableSizes,
  lookupCapacity,
  type CableTypeKey,
  type PhaseKey,
} from '../_shared/bs7671-appendix4/appendix4CurrentCapacity.ts';
import { lookupVoltageDropMvAm } from '../_shared/bs7671-appendix4/voltageDropTables.ts';
import { getTemperatureFactor } from '../_shared/bs7671-appendix4/temperatureFactors.ts';
import type { DesignedCircuit } from './types.ts';
import { CONDUCTOR_RESISTANCE_20C, operatingTempFactor } from './test-value-calculator.ts';
import { lookupTableMaxZs } from './zs-table-validator.ts';

/**
 * Reg 411.4.4: Zs × Ia ≤ U0 × Cmin, Ia = 5/10/20 × In for curve B/C/D —
 * the formula Table 41.3 is built from (B40 → 1.09, C32 → 0.68). For
 * ratings the table doesn't list, e.g. 45 A.
 */
function maxZsByFormula(curve: unknown, rating: number): number | null {
  const k = ({ B: 5, C: 10, D: 20 } as Record<string, number>)[String(curve ?? 'B').toUpperCase()];
  return k ? Math.round(((230 * 0.95) / (k * rating)) * 100) / 100 : null;
}

/** Standard MCB/RCBO ratings (BS EN 60898 / 61009 preferred values). */
const DEVICE_RATINGS = [6, 10, 16, 20, 25, 32, 40, 45, 50, 63, 80, 100, 125];

export interface SizingCorrection {
  circuitNumber: number;
  circuitName: string;
  field: 'cableSize' | 'voltageDrop' | 'Iz' | 'rating' | 'Id';
  from: number | string;
  to: number | string;
  reason: string;
}

export interface SizingIssue {
  /** What failed — the results page titles each finding by it. */
  kind: 'capacity' | 'voltage-drop' | 'design-current' | 'supply-ze' | 'zs';
  circuitNumber?: number;
  circuitName?: string;
  error: string;
  recommendation: string;
}

/** Twin & earth CPC by live size (BS 6004 6242Y). */
const TE_CPC: Record<number, number> = { 1: 1, 1.5: 1, 2.5: 1.5, 4: 1.5, 6: 2.5, 10: 4, 16: 6 };

interface Mapped {
  capKey: CableTypeKey;
  vdKey: string;
  isTwinEarth: boolean;
  /** 90 °C multicore (XLPE SWA, LSZH/XLPE multicore): 4E2B/4E4B voltage drop. */
  vd90?: boolean;
}

/**
 * Multicore 90 °C thermosetting copper — Tables 4E2B (non-armoured) and 4E4B
 * (armoured) — mV/A/m, 1.5–16 mm² (z = r here). The shared tables only hold
 * the 70 °C 4D set, which reads ~5–8% LOW for XLPE SWA, the usual UK armoured
 * cable — the direction that passes a run that should fail. Two sources agree
 * on these figures: the BS 7671 page text in bs7671_embeddings (pages 460/464)
 * and the 4E4B transcription in useEVChargingSmartForm.ts. Above 16 mm² the
 * page text is too broken to read r/x/z reliably, so those sizes stay on the
 * 70 °C table until transcribed from the book.
 */
const VD_90C_MULTICORE: Record<'single' | 'three', Record<number, number>> = {
  single: { 1.5: 31, 2.5: 19, 4: 12, 6: 7.9, 10: 4.7, 16: 2.9 },
  three: { 1.5: 27, 2.5: 16, 4: 10, 6: 6.8, 10: 4.0, 16: 2.5 },
};

export function mapCable(cableTypeText: string): Mapped | null {
  const s = (cableTypeText ?? '').toLowerCase();
  if (/fp200|fire|mineral|micc|flex|heat|\bcat\s?\d|coax|data|alumin/.test(s)) return null;
  if (/swa|armour/.test(s)) {
    // Insulation decides the table, not the sheath: BS 5467 "XLPE/SWA/PVC" is
    // 90 °C thermosetting with a PVC sheath (review — /pvc/ matched it first).
    const pvc =
      !/xlpe|thermosetting|5467|6724/.test(s) && /pvc|thermoplastic|6346|6942|6943/.test(s);
    return { capKey: pvc ? 'swa-pvc' : 'swa-xlpe', vdKey: 'swa', isTwinEarth: false, vd90: !pvc };
  }
  if (/twin|t\s*&\s*e|t\+e|6242|flat/.test(s))
    return { capKey: 'twin-earth', vdKey: 'pvc-twin-earth', isTwinEarth: true };
  if (/lszh|lsf|lsoh|low smoke/.test(s)) {
    return /single|singles|6491b/.test(s)
      ? // BS 7211 LSZH singles are rated from the 90 °C tables (4E1A via 4A3 —
        // the repo's lsf-single table), so voltage drop comes from 4E1B too.
        { capKey: 'lsf-single', vdKey: 'xlpe-single', isTwinEarth: false }
      : { capKey: 'lsf-multicore', vdKey: 'pvc-multicore', isTwinEarth: false, vd90: true };
  }
  if (/xlpe/.test(s) && /single/.test(s))
    return { capKey: 'xlpe-single', vdKey: 'xlpe-single', isTwinEarth: false };
  if (/single|singles|6491|conduit/.test(s))
    return { capKey: 'pvc-single', vdKey: 'pvc-single', isTwinEarth: false };
  return null;
}

export function mapMethod(text: string): string | null {
  const s = (text ?? '').toLowerCase();
  // Reference methods 100–103 only straight after "method" — a bare "100" is
  // as likely "100 x 50 trunking" (review).
  const ref = s.match(/method\s*(10[0-3])\b/);
  if (ref) return 'method-' + ref[1];
  const letter = s.match(/method\s*([a-g])(\d)?\b/);
  if (letter) {
    if (letter[1] === 'd') return letter[2] === '2' ? 'method-d2' : 'method-d1';
    return (
      (
        {
          a: 'method-a',
          b: 'method-b',
          c: 'method-c',
          e: 'method-e',
          f: 'method-f',
          g: 'method-g-h',
        } as Record<string, string>
      )[letter[1]] ?? null
    );
  }
  if (/buried direct|direct in the ground|\bd2\b/.test(s)) return 'method-d2';
  if (/in duct|ducting in the ground|\bd1\b/.test(s)) return 'method-d1';
  if (/clipped/.test(s)) return 'method-c';
  if (/tray|free air/.test(s)) return 'method-e';
  if (/trunking|conduit on/.test(s)) return 'method-b';
  return null;
}

/** Voltage-drop table behind each vdKey (lookupVoltageDropMvAm). */
const VD_SOURCE: Record<string, string> = {
  'pvc-twin-earth': 'Table 4D5',
  'pvc-single': 'Table 4D1B',
  'xlpe-single': 'Table 4E1B',
  swa: 'Table 4D4B',
  'pvc-multicore': 'Table 4D2B',
};

const methodLabel = (m: string) =>
  m === 'method-g-h' ? 'Method G' : 'Method ' + m.replace(/^method-/, '').toUpperCase();

const vdLetter = (method: string) =>
  method === 'method-a' ? 'A' : method === 'method-b' ? 'B' : 'C';

function derating(circuit: DesignedCircuit): number {
  const d = (circuit as any).deratingFactors;
  if (!d) return 1;
  const overall = Number(d.overall);
  if (Number.isFinite(overall) && overall > 0 && overall <= 1) return overall;
  const parts = [d.Ca, d.Cg, d.Ci].map(Number).filter((n) => Number.isFinite(n) && n > 0 && n <= 1);
  return parts.length ? parts.reduce((a, b) => a * b, 1) : 1;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * The conductor size in a cable name — "6mm² twin and earth" → 6. Not a
 * conduit or trunking size ("in 20mm conduit") and not the CPC of a pair
 * ("2.5/1.5mm²"), which a plain /\d+mm/ took (review).
 */
const SIZE_TOKEN = /(?<![\d./])(\d+(?:\.\d+)?)\s*mm²?(?!\s*(?:conduit|trunking|duct|x\b|×))/i;
export const namedSize = (text: unknown): number | null => {
  const m = String(text ?? '').match(SIZE_TOKEN);
  return m ? Number(m[1]) : null;
};
const withSize = (text: string, to: number) => text.replace(SIZE_TOKEN, `${to}mm²`);

export function applyDeterministicSizing(
  circuits: DesignedCircuit[],
  logger?: any,
  opts: {
    /** Supply Ze on a TN supply — enables the Zs step. Omit on TT (ADS by RCD). */
    ze?: number;
    /** 'domestic' applies the household cooker allowance (OSG Table A2). */
    installationType?: string;
    /** Job-level installation constraints, as entered. */
    ambientTemp?: number;
    groupingFactor?: number;
  } = {}
): { circuits: DesignedCircuit[]; corrections: SizingCorrection[]; issues: SizingIssue[] } {
  const corrections: SizingCorrection[] = [];
  const issues: SizingIssue[] = [];

  const out = circuits.map((original, index) => {
    const c: any = { ...original, calculations: { ...(original.calculations as any) } };
    const name = c.name ?? `Circuit ${index + 1}`;
    // The model sometimes names one size and specifies another ("1.5mm² twin
    // and earth" with cableSize 2.5, its own reasoning saying 2.5). cableSize
    // is what every check and calculation uses, so the name follows it.
    {
      const named = namedSize(c.cableType);
      const sz = Number(c.cableSize);
      if (named !== null && sz > 0 && named !== sz) {
        logger?.info?.('Cable name size disagreed with cableSize — name corrected', {
          circuit: name,
          cableType: c.cableType,
          cableSize: sz,
        });
        c.cableType = withSize(String(c.cableType), sz);
      }
    }
    const number = c.circuitNumber ?? index + 1;
    const mapped = mapCable(String(c.cableType ?? ''));
    const method = mapMethod(String(c.installationMethod ?? ''));
    const ring = c.circuitTopology === 'ring';
    // Three-phase by the phases field alone — a missing voltage must not turn
    // a 400 V three-phase run into a single-phase calculation (review).
    const threePhase = c.phases === 'three';
    const phase: PhaseKey = threePhase ? 'threePhase' : 'singlePhase';
    // The design stores Ib as the raw connected current and Id as the
    // diversified design current (ai-designer schema). The design current
    // for Ib ≤ In and voltage drop is the diversified one where given —
    // a cooker is 40 A raw, ~25 A after diversity.
    const ibRaw = Number(c.calculations?.Ib);
    let id = Number(c.calculations?.Id);
    // Household cooking appliances, OSG Table A2 row 3: 10 A + 30% of the
    // full load above 10 A (+5 A for a socket in the control unit — not
    // known here, so not added). The model often leaves Id = Ib, which then
    // reads as a 9 kW cooker overloading its 32 A device.
    const cooking = /\b(cooker|cooking|hob|oven|range cooker)s?\b/i.test(
      `${c.loadType ?? ''} ${name}`
    );
    const household = /domestic|household|residential/i.test(
      String(opts.installationType ?? 'domestic')
    );
    if (cooking && household && ibRaw > 10 && !(id > 0 && id < ibRaw)) {
      id = round2(10 + 0.3 * (ibRaw - 10));
      corrections.push({
        circuitNumber: number,
        circuitName: name,
        field: 'Id',
        from: c.calculations?.Id ?? '—',
        to: id,
        reason: `Cooker diversity (OSG Table A2): 10 A + 30% of ${round2(ibRaw - 10)} A = ${id} A.`,
      });
      c.calculations.Id = id;
      c.justifications = {
        ...(c.justifications ?? {}),
        diversityApplied: `Household cooking appliance: 10 A + 30% of full load above 10 A (OSG Table A2) = ${id} A design current.`,
      };
    }
    const ib = id > 0 && !(id > ibRaw) ? id : ibRaw;
    let inA = Number(c.protectionDevice?.rating);
    const length = Number(c.cableLength);
    let size = Number(c.cableSize);

    if (!mapped || !method || !(size > 0)) {
      logger?.info?.('Deterministic sizing skipped — cable or method not in Appendix 4 tables', {
        circuit: name,
        cableType: c.cableType,
        method: c.installationMethod,
      });
      // Size and capacity are left as designed, but voltage drop on a small
      // copper cable is only conductor resistance: mV/A/m = 2·r·F single-phase,
      // √3·r·F three-phase (OSG I1 r at 20 °C, GN3 Table B3 F). That gives the
      // Appendix 4 figures at these sizes (1.5mm²: 29 at 1.20 — 4D5 says 29;
      // 31 at 1.28 — 4E4B says 31). Fire-resisting cables (FP200, MICC) are
      // not in our tables, so their drop was the model's alone (5.09% shown
      // for 300 W over 40 m). F 1.28, the higher, since their rating isn't known.
      const r20 = CONDUCTOR_RESISTANCE_20C[size];
      if (
        r20 !== undefined &&
        size <= 16 &&
        ib > 0 &&
        length > 0 &&
        !/alumin/i.test(String(c.cableType ?? ''))
      ) {
        const mv = round2((threePhase ? Math.sqrt(3) : 2) * r20 * 1.28);
        const volts = round2((mv * ib * length) / 1000 / (ring ? 4 : 1));
        const percent = round2((volts / (threePhase ? 400 : 230)) * 100);
        const lim = /light/i.test(`${c.loadType ?? ''} ${name}`) ? 3 : 5;
        const before = Number(c.calculations?.voltageDrop?.percent);
        if (!(Math.abs(before - percent) < 0.05)) {
          corrections.push({
            circuitNumber: number,
            circuitName: name,
            field: 'voltageDrop',
            from: Number.isFinite(before) ? `${before}%` : '—',
            to: `${percent}%`,
            reason: `From conductor resistance (OSG Table I1 × 1.28): ${c.cableType} is not in the Appendix 4 tables.`,
          });
        }
        c.calculations.voltageDrop = {
          ...(c.calculations.voltageDrop ?? {}),
          volts,
          percent,
          limit: lim,
          compliant: percent <= lim,
          working:
            `Conductor resistance (OSG Table I1 ${r20} mΩ/m × 1.28): ${mv} mV/A/m × ${round2(ib)} A × ${length} m${ring ? ' ÷ 4' : ''} ÷ 1000 = ` +
            `${volts} V (${percent}% of ${threePhase ? 400 : 230} V, limit ${lim}%)`,
        };
        if (percent > lim && !(inA > 0 && ib > inA * 1.01)) {
          issues.push({
            kind: 'voltage-drop',
            circuitNumber: number,
            circuitName: name,
            error: `Voltage drop ${percent}% exceeds the ${lim}% limit on ${c.cableType} over ${length}m.`,
            recommendation: 'Use a larger cable, shorten the run or split the load.',
          });
        }
        return c as DesignedCircuit;
      }
      return original;
    }

    // Table keys are strings as printed ("1.0", "4.0", "6.0", "10.0"): look a
    // size up by its own key, never String(n) — "6" finds nothing.
    const sizeKeys = getAvailableSizes(mapped.capKey, method, phase);
    const keyOf = (s: number) => sizeKeys.find((k) => Math.abs(Number(k) - s) < 0.001);
    const sizes = sizeKeys.map(Number).sort((a, b) => a - b);
    const itAt = (s: number) => {
      const key = keyOf(s);
      if (!key) return null;
      const it = lookupCapacity(mapped.capKey, key, method, phase);
      return typeof it === 'number' ? it : null;
    };
    // Derating comes from what was STATED — the circuit's own factors, or the
    // job's grouping and ambient (Table 4B1). The model's Iz is not used: in
    // 611 designed circuits no factor was ever stated by the model or the
    // electrician, yet the model's Iz sat below the table at random (14 A for
    // 1.5mm² T&E clipped direct, 20 A for 2.5mm²), which pushed sound
    // circuits up a size for no reason.
    const itDesigned = itAt(size);
    const ambientFactor =
      opts.ambientTemp && opts.ambientTemp > 30
        ? getTemperatureFactor(opts.ambientTemp, capacityTables[mapped.capKey]?.insulation ?? '70C')
        : 1;
    const groupingFactor =
      opts.groupingFactor && opts.groupingFactor > 0 && opts.groupingFactor < 1
        ? opts.groupingFactor
        : 1;
    const factor = Math.min(derating(c), ambientFactor * groupingFactor);
    const izAt = (s: number) => {
      const it = itAt(s);
      return it === null ? null : it * factor;
    };
    // The table has no column for this cable + method + phase (T&E on tray,
    // SWA in trunking…): capacity can't be checked here, so leave the circuit
    // to the legacy tripwire rather than mark it sized (review).
    const capacityCovered = itDesigned !== null;
    const vdAt = (s: number) => {
      if (!(ib > 0) || !(length > 0)) return null;
      const mv90 = mapped.vd90 ? VD_90C_MULTICORE[threePhase ? 'three' : 'single'][s] : undefined;
      const mv =
        mv90 ?? lookupVoltageDropMvAm(mapped.vdKey as any, s, threePhase, vdLetter(method));
      if (typeof mv !== 'number') return null;
      const volts = (mv * ib * length) / 1000 / (ring ? 4 : 1);
      const src =
        mv90 !== undefined
          ? /^swa/.test(mapped.capKey)
            ? 'Table 4E4B'
            : 'Table 4E2B'
          : mapped.vdKey === 'pvc-twin-earth' && (threePhase || s > 16)
            ? 'Table 4D2B' // 4D5 is single-phase only and stops at 16 mm²
            : (VD_SOURCE[mapped.vdKey] ?? 'Appendix 4');
      return {
        volts: round2(volts),
        percent: round2((volts / (threePhase ? 400 : 230)) * 100),
        mv,
        src,
      };
    };
    const isLighting = /light/i.test(String(c.loadType ?? '') + ' ' + name);
    // Appendix 4: 3% lighting, 5% other uses. The model states a limit on
    // every circuit and it varies (5% on lighting, 3% on a shower, 8%), so
    // the load decides, not the model.
    const limit = isLighting ? 3 : 5;

    const setSize = (to: number, reason: string) => {
      corrections.push({
        circuitNumber: number,
        circuitName: name,
        field: 'cableSize',
        from: size,
        to,
        reason,
      });
      const from = size;
      size = to;
      c.cableSize = to;
      // The model's cable name carries the size ("6mm² twin and earth") and
      // its prose quotes it; the PDF and editor print both. Make them agree,
      // and say what changed and why where the justification is read.
      if (typeof c.cableType === 'string') c.cableType = withSize(c.cableType, to);
      const note = `Corrected from ${from}mm² to ${to}mm²: ${reason}`;
      c.justifications = {
        ...(c.justifications ?? {}),
        cableSize: `${note} ${c.justifications?.cableSize ?? ''}`.trim(),
      };
      if (c.structuredOutput?.sections?.cableSelectionBreakdown) {
        c.structuredOutput = {
          ...c.structuredOutput,
          sections: {
            ...c.structuredOutput.sections,
            cableSelectionBreakdown: `${note}\n\n${c.structuredOutput.sections.cableSelectionBreakdown}`,
          },
        };
      }
      if (mapped.isTwinEarth && TE_CPC[to] !== undefined) c.cpcSize = TE_CPC[to];
      // Single-core in conduit/trunking: the CPC is a separate conductor, so
      // size it to Table 54.7 (S ≤ 16 → S; ≤ 35 → 16; above → S/2) rather
      // than leave the old one under a bigger live (review: 2.5 under 25mm²).
      // Armoured cable uses its armour — not touched here.
      else if (/single/.test(mapped.capKey)) {
        const cpc54_7 = to <= 16 ? to : to <= 35 ? 16 : to / 2;
        if (!(Number(c.cpcSize) >= cpc54_7)) c.cpcSize = cpc54_7;
      }
      // Multicore SWA: the design uses a core as the CPC (3-core = L, N, E),
      // so a CPC equal to the old live follows it up.
      else if (/^swa/.test(mapped.capKey) && Number(c.cpcSize) === from) c.cpcSize = to;
      // The model's R1+R2 / Zs describe the OLD cable, and
      // ensureExpectedTestValues keeps any it finds — clear them so they are
      // recalculated for the size actually specified.
      delete c.expectedTests;
    };

    // A design current just over the device (9.5 kW shower = 41.3 A on 40 A)
    // is a rating choice, not a bad load: step up to the next standard
    // rating, re-read Table 41.3, and let the cable checks below follow.
    // Far over (> 25%) is a load to question, so it is reported instead.
    // Never for socket circuits: BS 1363 radials stop at 32 A (Appendix 15),
    // so a socket circuit over its device needs splitting, not a bigger MCB.
    const socketCircuit = /socket/i.test(`${c.loadType ?? ''} ${name}`);
    // MCB family only — DEVICE_RATINGS is the MCB series and the 411.4.4
    // formula is for curves B/C/D; a BS 88 or BS 3036 fuse has its own
    // ratings and tables (review: 40 A gG → "45 A").
    const mcbFamily =
      /^(MCB|RCBO|MCCB|RCD\+MCB)/i.test(String(c.protectionDevice?.type ?? 'MCB')) &&
      /^[BCD]?$/i.test(String(c.protectionDevice?.curve ?? 'B'));
    if (inA > 0 && ib > inA * 1.01 && ib <= inA * 1.25 && !ring && !socketCircuit && mcbFamily) {
      const next = DEVICE_RATINGS.find((r) => r >= ib);
      if (next) {
        corrections.push({
          circuitNumber: number,
          circuitName: name,
          field: 'rating',
          from: inA,
          to: next,
          reason: `Design current ${round2(ib)} A is above the ${inA} A device (Ib ≤ In, Reg 433.1.1). Corrected to ${next} A.`,
        });
        c.protectionDevice = { ...(c.protectionDevice ?? {}), rating: next };
        c.calculations.In = next;
        c.calculations.maxZs =
          lookupTableMaxZs(c.protectionDevice?.type, c.protectionDevice?.curve, next) ??
          maxZsByFormula(c.protectionDevice?.curve, next) ??
          c.calculations.maxZs;
        c.justifications = {
          ...(c.justifications ?? {}),
          protection:
            `Corrected from ${inA} A to ${next} A: design current ${round2(ib)} A must not exceed In. ${c.justifications?.protection ?? ''}`.trim(),
        };
        inA = next;
      }
    }
    // 1. Capacity, radials only (Reg 433.1.1: Ib ≤ In ≤ Iz).
    if (capacityCovered && !ring && inA > 0) {
      const iz = izAt(size);
      if (iz !== null && iz < inA) {
        const up = sizes.find((s) => s > size && (izAt(s) ?? 0) >= inA);
        if (up)
          setSize(
            up,
            `${size}mm² carries ${round2(iz)}A (Appendix 4) but the ${inA}A device needs Iz ≥ ${inA}A. Corrected to ${up}mm². Reg 433.1.1.`
          );
        else
          issues.push({
            kind: 'capacity',
            circuitNumber: number,
            circuitName: name,
            error: `${size}mm² carries ${round2(iz)}A but the device is ${inA}A, and no size in the table for this method carries it.`,
            recommendation: 'Change the installation method, the device or split the circuit.',
          });
      }
      const izNow = izAt(size);
      if (izNow !== null) {
        const was = Number(c.calculations?.Iz);
        if (!(Math.abs(was - izNow) < 0.5)) {
          corrections.push({
            circuitNumber: number,
            circuitName: name,
            field: 'Iz',
            from: Number.isFinite(was) ? was : '—',
            to: round2(izNow),
            reason: 'Iz from Appendix 4 for this cable, method and phase.',
          });
        }
        c.calculations.Iz = round2(izNow);
      }
    }
    // Rings aren't resized here (their own rule), but their Iz is still a
    // table figure — the model wrote 46 A for 2.5mm² T&E clipped direct (27 A).
    if (capacityCovered && ring) {
      const izRing = izAt(size);
      if (izRing !== null) c.calculations.Iz = round2(izRing);
    }

    // Ib above In means the load or the device is wrong (one real design had
    // 76 kW of kitchen lighting on a 16 A RCBO). Say that once; a voltage drop
    // worked from that Ib would be noise, and resizing for it would be wrong.
    const ibOverIn = inA > 0 && ib > inA * 1.01;
    if (ibOverIn) {
      issues.push({
        kind: 'design-current',
        circuitNumber: number,
        circuitName: name,
        error: `Design current ${round2(ib)}A is above the ${inA}A device — Ib ≤ In is not met.`,
        recommendation:
          'Check the load figure. If it is right, the circuit needs a larger device and cable, or splitting.',
      });
    }

    // 2–3. Voltage drop from the tables, once. The model's own figure is kept
    // aside: the correction and the prose note are written at the end, from
    // the final cable (a later Zs upsize changes it — review).
    const vdBefore = c.calculations?.voltageDrop?.percent;
    const vd = vdAt(size);
    if (vd) {
      if (vd.percent > limit && mapped.isTwinEarth && !ring && !ibOverIn) {
        const up = sizes.find(
          (s) =>
            s > size &&
            (vdAt(s)?.percent ?? Infinity) <= limit &&
            (inA > 0 ? (izAt(s) ?? 0) >= inA : true)
        );
        if (up) {
          setSize(
            up,
            `Voltage drop ${vd.percent}% on ${size}mm² is over the ${limit}% limit. Corrected to ${up}mm². Reg 525.`
          );
          const iz = izAt(size);
          if (iz !== null) c.calculations.Iz = round2(iz);
        }
      }
    }
    // 4. Zs (Reg 411.4.4) — radials, once Table 41.3 has set maxZs. R1+R2
    // from OSG Table I1 at operating temperature (Table I3), same figures the
    // expected-test step uses. A failing radial goes up to the smallest size
    // whose Zs fits; rings and anything the tables can't fix are reported.
    const maxZs = Number(c.calculations?.maxZs);
    const ze = opts.ze;
    if (!ring && ze && ze > 0 && maxZs > 0 && length > 0 && !ibOverIn) {
      const tf = operatingTempFactor(c.cableType);
      const cpcFor = (s: number): number | null => {
        if (mapped.isTwinEarth) return TE_CPC[s] ?? null;
        if (/single/.test(mapped.capKey))
          return Math.max(Number(c.cpcSize) || 0, s <= 16 ? s : s <= 35 ? 16 : s / 2);
        if (/^swa/.test(mapped.capKey))
          return Number(c.cpcSize) === size ? s : Number(c.cpcSize) || null;
        return null;
      };
      const zsAt = (s: number, cpc: number | null) => {
        const r1 = CONDUCTOR_RESISTANCE_20C[s];
        const r2 = cpc === null ? undefined : CONDUCTOR_RESISTANCE_20C[cpc];
        if (r1 === undefined || r2 === undefined) return null;
        return ze + ((r1 + r2) * length * tf) / 1000;
      };
      const zsRaw = zsAt(size, Number(c.cpcSize) || null);
      const zsNow = zsRaw === null ? null : round2(zsRaw);
      if (zsRaw !== null && zsRaw > maxZs) {
        // Only a modest step is a cable answer. When Ze alone takes most of
        // the allowance (C63 maxZs 0.35 on Ze 0.35 → "240mm²", review) or it
        // needs more than two sizes up, the fix is the device or the earthing.
        const idx = sizes.indexOf(size);
        const reach = sizes.slice(idx + 1, idx + 3);
        const up =
          ze < maxZs * 0.9
            ? reach.find((s) => (zsAt(s, cpcFor(s)) ?? Infinity) <= maxZs)
            : undefined;
        if (up) {
          setSize(
            up,
            `Zs ${zsNow}Ω on ${size}mm² is over the ${maxZs}Ω maximum for this device. Corrected to ${up}mm². Reg 411.4.4.`
          );
          const iz = izAt(size);
          if (iz !== null) c.calculations.Iz = round2(iz);
        } else {
          issues.push({
            kind: 'zs',
            circuitNumber: number,
            circuitName: name,
            error:
              ze >= maxZs * 0.9
                ? `Zs ${zsNow}Ω is over the ${maxZs}Ω maximum for this device — Ze ${ze}Ω leaves almost no allowance for the cable.`
                : `Zs ${zsNow}Ω is over the ${maxZs}Ω maximum for this device, and a cable up to two sizes larger does not bring it under.`,
            recommendation:
              'Use a device with a higher maximum Zs (e.g. a lower curve), add RCD protection where Reg 411.4.204 allows, or reduce the run.',
          });
        }
      }
    }

    // The working, as an electrician would check it against the book. The
    // results page shows these under each circuit while the circuit still
    // matches `workingFor` — an edit on the page makes them stale.
    {
      c.calculations.workingFor = {
        cableSize: size,
        cpcSize: Number(c.cpcSize) || null,
        rating: inA || null,
        cableLength: length || null,
      };
      const it = itAt(size);
      if (it !== null) {
        const table = capacityTables[mapped.capKey]?.sourceTable ?? 'Appendix 4';
        c.calculations.izWorking =
          `${table}, ${size}mm², ${methodLabel(method)}: It ${it} A` +
          (factor < 0.995 ? ` × ${round2(factor)} = ${round2(it * factor)} A` : '');
      }
      const v = vdAt(size);
      if (v) {
        const compliant = v.percent <= limit;
        if (!(Math.abs(Number(vdBefore) - v.percent) < 0.05)) {
          corrections.push({
            circuitNumber: number,
            circuitName: name,
            field: 'voltageDrop',
            from: Number.isFinite(Number(vdBefore)) ? `${vdBefore}%` : '—',
            to: `${v.percent}%`,
            reason: `From Appendix 4 mV/A/m × ${round2(ib)}A design current × ${length}m${ring ? ' ÷ 4 (ring)' : ''}.`,
          });
        }
        // A materially different figure: the model's prose quotes its own
        // number, so say which one is right where the breakdown is read.
        if (
          Number.isFinite(Number(vdBefore)) &&
          Math.abs(Number(vdBefore) - v.percent) >= 0.5 &&
          c.structuredOutput?.sections?.cableSelectionBreakdown
        ) {
          c.structuredOutput = {
            ...c.structuredOutput,
            sections: {
              ...c.structuredOutput.sections,
              cableSelectionBreakdown: `Voltage drop recalculated from BS 7671 Appendix 4: ${v.volts} V (${v.percent}%) against a ${limit}% limit${ring ? ' (ring, ÷4)' : ''}. Any other voltage-drop figure below is superseded.\n\n${c.structuredOutput.sections.cableSelectionBreakdown}`,
            },
          };
        }
        if (!compliant && !ibOverIn) {
          issues.push({
            kind: 'voltage-drop',
            circuitNumber: number,
            circuitName: name,
            error: `Voltage drop ${v.percent}% exceeds the ${limit}% limit on ${c.cableType} over ${length}m.`,
            recommendation: ring
              ? 'Shorten the ring, split it into two rings, or convert part to radials.'
              : 'Use a larger cable, shorten the run or split the load.',
          });
        }
        c.calculations.voltageDrop = {
          ...(c.calculations.voltageDrop ?? {}),
          volts: v.volts,
          percent: v.percent,
          limit,
          compliant,
          working:
            `${v.src}: ${v.mv} mV/A/m × ${round2(ib)} A × ${length} m${ring ? ' ÷ 4' : ''} ÷ 1000 = ` +
            `${v.volts} V (${v.percent}% of ${threePhase ? 400 : 230} V, limit ${limit}%)`,
        };
      }
    }

    // Tells the legacy capacity tripwire this circuit is already sized — only
    // when Appendix 4 actually covered it.
    if (capacityCovered) c._appendix4Sized = true;
    else
      logger?.info?.(
        'Capacity not covered by Appendix 4 for this cable/method — left to legacy check',
        { circuit: name, cableType: c.cableType, method }
      );
    return c as DesignedCircuit;
  });

  if (corrections.length)
    logger?.warn?.(`📐 Deterministic sizing corrected ${corrections.length} value(s)`, {
      corrections,
    });
  return { circuits: out, corrections, issues };
}
