/**
 * Circuit-edit validator (frontend).
 *
 * Mirrors the backend tripwires (zs-table, cable-capacity, ring-Vd) so that
 * any user edit on the results page is delta-validated locally before being
 * applied. Strict compliance — there is no override path. Non-compliant
 * edits are rejected with a suggested fix.
 *
 * Tier model:
 *   1. Free edit  — circuit name, notes, cable length (Vd revalidated)
 *   2. Validated  — cable size, protection rating, curve
 *   4. Locked     — ring final 32A+2.5mm², fire circuit FP200, bathroom RCD
 */

export type ValidationResult =
  | { ok: true }
  | { ok: false; error: string; suggestion?: { field: string; value: unknown; label: string } };

// ─── Standard option lists (used by select dropdowns) ───────────────────────

export const CABLE_SIZE_OPTIONS = [
  { value: '1.0', label: '1.0 mm²' },
  { value: '1.5', label: '1.5 mm²' },
  { value: '2.5', label: '2.5 mm²' },
  { value: '4', label: '4 mm²' },
  { value: '6', label: '6 mm²' },
  { value: '10', label: '10 mm²' },
  { value: '16', label: '16 mm²' },
  { value: '25', label: '25 mm²' },
  { value: '35', label: '35 mm²' },
  { value: '50', label: '50 mm²' },
  { value: '70', label: '70 mm²' },
  { value: '95', label: '95 mm²' },
  { value: '120', label: '120 mm²' },
];

export const CPC_SIZE_OPTIONS = [
  { value: '1.0', label: '1.0 mm²' },
  { value: '1.5', label: '1.5 mm²' },
  { value: '2.5', label: '2.5 mm²' },
  { value: '4', label: '4 mm²' },
  { value: '6', label: '6 mm²' },
  { value: '10', label: '10 mm²' },
  { value: '16', label: '16 mm²' },
  { value: '25', label: '25 mm²' },
  { value: '35', label: '35 mm²' },
  { value: '50', label: '50 mm²' },
];

export const PROTECTION_RATING_OPTIONS = [
  { value: '6', label: '6 A' },
  { value: '10', label: '10 A' },
  { value: '13', label: '13 A' },
  { value: '16', label: '16 A' },
  { value: '20', label: '20 A' },
  { value: '25', label: '25 A' },
  { value: '32', label: '32 A' },
  { value: '40', label: '40 A' },
  { value: '50', label: '50 A' },
  { value: '63', label: '63 A' },
  { value: '80', label: '80 A' },
  { value: '100', label: '100 A' },
  { value: '125', label: '125 A' },
];

// ─── BS 7671 Table 41.3 — Max Zs (Ω) for 0.4 s disconnection ─────────────────

const TABLE_41_3: Record<string, Record<number, number>> = {
  B: {
    6: 7.28, 10: 4.37, 13: 3.36, 16: 2.73, 20: 2.19, 25: 1.75, 32: 1.37,
    40: 1.09, 50: 0.87, 63: 0.69, 80: 0.55, 100: 0.44, 125: 0.35,
  },
  C: {
    6: 3.64, 10: 2.19, 13: 1.68, 16: 1.37, 20: 1.09, 25: 0.87, 32: 0.68,
    40: 0.55, 50: 0.44, 63: 0.35, 80: 0.27, 100: 0.22, 125: 0.17,
  },
  D: {
    6: 1.82, 10: 1.09, 13: 0.84, 16: 0.68, 20: 0.55, 25: 0.44, 32: 0.34,
    40: 0.27, 50: 0.22, 63: 0.17, 80: 0.14, 100: 0.11, 125: 0.09,
  },
};

export function lookupMaxZs(curve: string | undefined, rating: number): number | null {
  if (!curve || !rating) return null;
  return TABLE_41_3[curve.toUpperCase()]?.[rating] ?? null;
}

// ─── BS 7671 Appendix 4 — Iz (current capacity, A) at Method C reference ──
// Compact subset: 70°C T+E (4D1A) and 90°C XLPE T+E (4D5A) — covers the
// vast majority of edits. Extend as needed.

const IZ_TABLE_70C_TE: Record<number, number> = {
  1.0: 13, 1.5: 16, 2.5: 24, 4: 32, 6: 41, 10: 57, 16: 76, 25: 101, 35: 125, 50: 151,
};
const IZ_TABLE_90C_XLPE_TE: Record<number, number> = {
  1.0: 16, 1.5: 20, 2.5: 30, 4: 40, 6: 51, 10: 70, 16: 94, 25: 125, 35: 156, 50: 188,
};
// 90°C XLPE singles in conduit Method B (from 4E1A, 1φ AC, two cables loaded)
const IZ_TABLE_90C_SINGLES: Record<number, number> = {
  1.5: 22, 2.5: 30, 4: 40, 6: 52, 10: 71, 16: 96, 25: 127, 35: 157, 50: 192,
};

function isXLPEorLSZH(cableType: string): boolean {
  return /xlpe|lszh|6491|6181y/i.test(cableType);
}
function isSinglesInConduit(cableType: string): boolean {
  return /singles?\s*in\s*conduit|6491b|lszh.*single/i.test(cableType);
}

function lookupIz(cableSize: number, cableType: string | undefined): number | null {
  const t = String(cableType ?? '').toLowerCase();
  if (isSinglesInConduit(t)) return IZ_TABLE_90C_SINGLES[cableSize] ?? null;
  if (isXLPEorLSZH(t)) return IZ_TABLE_90C_XLPE_TE[cableSize] ?? null;
  return IZ_TABLE_70C_TE[cableSize] ?? null;
}

export { lookupIz };

// ─── Voltage drop factors (mV/A/m) at conductor temperature ──────────────────
// Used for length / size revalidation. T+E values (4D2B equivalent).
const VD_FACTORS_TE: Record<number, number> = {
  1.0: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.75, 35: 1.25, 50: 0.93,
};

const STANDARD_CABLE_SIZES = [1.0, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120];
const STANDARD_RATINGS = [6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125];

// ─── Tier 4 lock detection ───────────────────────────────────────────────────

export type Tier4Lock = { reason: string; reg: string } | null;

export function detectRingFinal(circuit: any): boolean {
  if (circuit?.circuitTopology === 'ring') return true;
  const name = String(circuit?.name ?? '').toLowerCase();
  const lt = String(circuit?.loadType ?? '').toLowerCase();
  return /\bring\b/.test(name) || /\bring\b/.test(lt);
}

export function detectFireCircuit(circuit: any): boolean {
  const lt = String(circuit?.loadType ?? '').toLowerCase();
  if (/fire-alarm|emergency-lighting|smoke-detection|sprinkler/i.test(lt)) return true;
  return /\b(fire alarm|smoke detect|emergency light|sprinkler|sounder|aov)\b/i.test(
    String(circuit?.name ?? '')
  );
}

export function detectBathroomSocket(circuit: any): boolean {
  const isSocket =
    /socket/i.test(String(circuit?.loadType ?? '')) ||
    /socket/i.test(String(circuit?.name ?? ''));
  return isSocket && String(circuit?.specialLocation ?? '') === 'bathroom';
}

/**
 * Returns a lock reason if the (circuit, field) tuple is Tier 4 — or null
 * if the field is editable for this circuit.
 */
export function checkTier4Lock(circuit: any, field: string): Tier4Lock {
  if (detectRingFinal(circuit)) {
    if (field === 'cableSize')
      return {
        reason: 'Ring final cable is locked at 2.5 mm² per BS 7671 Appendix 15',
        reg: 'Appendix 15',
      };
    if (field === 'protectionRating')
      return {
        reason: 'Ring final protection is locked at 32 A per BS 7671 Appendix 15',
        reg: 'Appendix 15',
      };
  }
  if (detectFireCircuit(circuit)) {
    if (field === 'cableType')
      return {
        reason: 'Fire / emergency circuit must use FP200 / FP400 / MICC per BS 5266-1, BS 5839-1',
        reg: '560.7',
      };
  }
  if (detectBathroomSocket(circuit)) {
    if (field === 'protectionType' || field === 'protectionDevice.type')
      return {
        reason:
          'Bathroom socket must be RCD-protected (RCBO or RCD+MCB) per BS 7671 701.411.3.3',
        reg: '701.411.3.3',
      };
  }
  return null;
}

// ─── Tier 2 delta validators ─────────────────────────────────────────────────

export function validateCableSizeChange(
  circuit: any,
  newSize: number
): ValidationResult {
  const lock = checkTier4Lock(circuit, 'cableSize');
  if (lock) return { ok: false, error: lock.reason };

  if (!STANDARD_CABLE_SIZES.includes(newSize)) {
    return {
      ok: false,
      error: 'Not a standard cable size',
      suggestion: {
        field: 'cableSize',
        value: STANDARD_CABLE_SIZES.find((s) => s >= newSize) ?? STANDARD_CABLE_SIZES[0],
        label: 'closest standard size',
      },
    };
  }

  const protectionRating = Number(circuit?.protectionDevice?.rating ?? 0);
  const ib = Number(circuit?.calculations?.Ib ?? 0);
  const iz = lookupIz(newSize, circuit?.cableType);

  if (iz != null && iz < protectionRating) {
    const minOk = STANDARD_CABLE_SIZES.find((s) => {
      const cap = lookupIz(s, circuit?.cableType);
      return cap != null && cap >= protectionRating;
    });
    return {
      ok: false,
      error: `Iz ${iz} A < protection rating ${protectionRating} A — cable would be undersized for the device.`,
      suggestion: minOk
        ? { field: 'cableSize', value: minOk, label: `try ${minOk} mm² (Iz ${lookupIz(minOk, circuit?.cableType)} A)` }
        : undefined,
    };
  }

  if (iz != null && iz < ib) {
    return {
      ok: false,
      error: `Iz ${iz} A < design current Ib ${ib.toFixed(1)} A — cable cannot carry the load.`,
    };
  }

  // Voltage drop check
  const length = Number(circuit?.cableLength ?? 0);
  const factor = VD_FACTORS_TE[newSize];
  if (length > 0 && factor) {
    const vdVolts = (factor * ib * length) / 1000;
    const vdPct = (vdVolts / 230) * 100;
    const limit = Number(circuit?.calculations?.voltageDrop?.limit ?? 5);
    if (vdPct > limit) {
      const minOk = STANDARD_CABLE_SIZES.find((s) => {
        const f = VD_FACTORS_TE[s];
        if (!f) return false;
        return ((f * ib * length) / 1000 / 230) * 100 <= limit;
      });
      return {
        ok: false,
        error: `Volt drop ${vdPct.toFixed(2)}% exceeds ${limit}% limit at ${length} m.`,
        suggestion: minOk
          ? { field: 'cableSize', value: minOk, label: `try ${minOk} mm² (within Vd limit)` }
          : undefined,
      };
    }
  }

  return { ok: true };
}

export function validateProtectionRatingChange(
  circuit: any,
  newRating: number
): ValidationResult {
  const lock = checkTier4Lock(circuit, 'protectionRating');
  if (lock) return { ok: false, error: lock.reason };

  if (!STANDARD_RATINGS.includes(newRating)) {
    return {
      ok: false,
      error: 'Not a standard protection rating',
      suggestion: {
        field: 'protectionRating',
        value: STANDARD_RATINGS.find((r) => r >= newRating) ?? STANDARD_RATINGS[0],
        label: 'closest standard rating',
      },
    };
  }

  const ib = Number(circuit?.calculations?.Ib ?? 0);
  if (newRating < ib) {
    const minOk = STANDARD_RATINGS.find((r) => r >= ib);
    return {
      ok: false,
      error: `Rating ${newRating} A < design current Ib ${ib.toFixed(1)} A — protection would trip on normal load.`,
      suggestion: minOk
        ? { field: 'protectionRating', value: minOk, label: `try ${minOk} A` }
        : undefined,
    };
  }

  const cableSize = Number(circuit?.cableSize ?? 0);
  const iz = lookupIz(cableSize, circuit?.cableType);
  if (iz != null && newRating > iz) {
    return {
      ok: false,
      error: `Rating ${newRating} A > cable Iz ${iz} A — cable would be undersized.`,
      suggestion: {
        field: 'protectionRating',
        value: STANDARD_RATINGS.filter((r) => r <= iz).slice(-1)[0] ?? STANDARD_RATINGS[0],
        label: `try ${STANDARD_RATINGS.filter((r) => r <= iz).slice(-1)[0] ?? STANDARD_RATINGS[0]} A`,
      },
    };
  }

  // Verify Zs limit holds for the new rating
  const curve = circuit?.protectionDevice?.curve;
  const newMaxZs = lookupMaxZs(curve, newRating);
  const currentZs = Number(circuit?.calculations?.zs ?? 0);
  if (newMaxZs != null && currentZs > newMaxZs) {
    return {
      ok: false,
      error: `Zs ${currentZs.toFixed(2)} Ω > new max Zs ${newMaxZs} Ω at ${newRating} A — earth fault disconnection time would not meet 0.4 s.`,
    };
  }

  return { ok: true };
}

export function validateProtectionCurveChange(
  circuit: any,
  newCurve: string
): ValidationResult {
  const allowed = ['B', 'C', 'D'];
  if (!allowed.includes(newCurve.toUpperCase())) {
    return { ok: false, error: 'Curve must be B, C, or D for MCB/RCBO devices.' };
  }

  const rating = Number(circuit?.protectionDevice?.rating ?? 0);
  const currentZs = Number(circuit?.calculations?.zs ?? 0);
  const newMaxZs = lookupMaxZs(newCurve, rating);

  if (newMaxZs == null) {
    return { ok: false, error: 'No Table 41.3 row for this rating + curve combination.' };
  }

  if (currentZs > newMaxZs) {
    // Suggest a curve that the existing Zs CAN satisfy
    const fix = ['B', 'C', 'D'].find((c) => {
      const m = lookupMaxZs(c, rating);
      return m != null && currentZs <= m;
    });
    return {
      ok: false,
      error: `Zs ${currentZs.toFixed(2)} Ω > new max Zs ${newMaxZs} Ω at ${rating} A Type ${newCurve} — earth fault disconnection time would not meet 0.4 s.`,
      suggestion: fix
        ? {
            field: 'protectionDevice.curve',
            value: fix,
            label: `try Type ${fix} (max Zs ${lookupMaxZs(fix, rating)} Ω)`,
          }
        : undefined,
    };
  }

  return { ok: true };
}

export function validateLengthChange(
  circuit: any,
  newLength: number
): ValidationResult {
  if (!isFinite(newLength) || newLength <= 0) {
    return { ok: false, error: 'Length must be greater than zero.' };
  }
  if (newLength > 200) {
    return { ok: false, error: 'Length over 200 m — verify with a proper Vd / Zs calculation.' };
  }

  const cableSize = Number(circuit?.cableSize ?? 0);
  const ib = Number(circuit?.calculations?.Ib ?? 0);
  const factor = VD_FACTORS_TE[cableSize];
  if (factor && ib > 0) {
    const vdVolts = (factor * ib * newLength) / 1000;
    const vdPct = (vdVolts / 230) * 100;
    const limit = Number(circuit?.calculations?.voltageDrop?.limit ?? 5);
    if (vdPct > limit) {
      // Suggest next-up cable size that satisfies the new length
      const minOk = STANDARD_CABLE_SIZES.find((s) => {
        const f = VD_FACTORS_TE[s];
        if (!f) return false;
        return ((f * ib * newLength) / 1000 / 230) * 100 <= limit;
      });
      return {
        ok: false,
        error: `Volt drop ${vdPct.toFixed(2)}% exceeds ${limit}% limit at ${newLength} m.`,
        suggestion: minOk
          ? { field: 'cableSize', value: minOk, label: `upsize cable to ${minOk} mm²` }
          : undefined,
      };
    }
  }

  return { ok: true };
}

export function validateNameChange(_circuit: any, newName: string): ValidationResult {
  const trimmed = newName.trim();
  if (trimmed.length === 0) return { ok: false, error: 'Name cannot be empty.' };
  if (trimmed.length > 60) return { ok: false, error: 'Name max 60 characters.' };
  return { ok: true };
}

// ─── Cable type editor ───────────────────────────────────────────────────────

export const CABLE_TYPE_OPTIONS = [
  '1.5 mm² PVC twin and earth',
  '2.5 mm² PVC twin and earth',
  '4 mm² PVC twin and earth',
  '6 mm² PVC twin and earth',
  '10 mm² PVC twin and earth',
  '16 mm² PVC twin and earth',
  'XLPE 90°C twin and earth',
  'LSZH 90°C twin and earth',
  'LSZH singles in steel conduit',
  'LSZH singles in trunking',
  'XLPE singles in conduit',
  'SWA 3-core 90°C XLPE',
  'SWA 4-core 90°C XLPE',
  'FP200 enhanced',
  'FP400 mineral',
  'MICC mineral insulated',
];

const T_AND_E_PATTERN = /twin\s*(?:&|and)\s*earth|t\s*&\s*e|t\+e/i;
const SWA_PATTERN = /\bswa\b|steel\s*wire\s*armoured|6724/i;
const FIRE_RATED_PATTERN = /fp\s*200|fp\s*400|micc|mineral\s*insulated/i;

/** Cable family this type belongs to (used for compatibility checks). */
export type CableFamily = 'TE' | 'XLPE_TE' | 'LSZH_SINGLES' | 'XLPE_SINGLES' | 'SWA' | 'FIRE' | 'OTHER';

export function getCableFamily(type: string): CableFamily {
  const t = String(type ?? '').toLowerCase();
  if (FIRE_RATED_PATTERN.test(t)) return 'FIRE';
  if (SWA_PATTERN.test(t)) return 'SWA';
  if (/lszh.*single|6491b.*lszh/i.test(t)) return 'LSZH_SINGLES';
  if (/xlpe.*single|6491x/i.test(t)) return 'XLPE_SINGLES';
  if (/xlpe.*twin|xlpe.*and earth/i.test(t)) return 'XLPE_TE';
  if (T_AND_E_PATTERN.test(t)) return 'TE';
  return 'OTHER';
}

/**
 * Get the cable types allowed for this circuit's location.
 * Outdoor / underground → SWA family only.
 * Fire / emergency → FP / MICC family only.
 * Bathroom / kitchen / lounge etc → T+E or singles families.
 */
export function getAllowedCableTypes(circuit: any): string[] {
  const sl = String(circuit?.specialLocation ?? '').toLowerCase();
  const lt = String(circuit?.loadType ?? '').toLowerCase();
  const name = String(circuit?.name ?? '').toLowerCase();

  // Fire / emergency: only fire-rated
  if (
    /fire-alarm|emergency-lighting|smoke-detection|sprinkler/.test(lt) ||
    /\b(fire alarm|smoke detect|emergency light|sprinkler)\b/.test(name)
  ) {
    return CABLE_TYPE_OPTIONS.filter((t) => FIRE_RATED_PATTERN.test(t));
  }

  // Underground / buried: SWA only
  if (sl === 'underground') {
    return CABLE_TYPE_OPTIONS.filter((t) => SWA_PATTERN.test(t));
  }

  // Outdoor: SWA or LSZH singles in conduit (no plain T&E)
  if (sl === 'outdoor') {
    return CABLE_TYPE_OPTIONS.filter(
      (t) => SWA_PATTERN.test(t) || /lszh.*single|xlpe.*single/i.test(t)
    );
  }

  // Industrial fixed plant: SWA preferred, no T&E
  if (
    /three-phase-motor|machine-tool|welding|compressor|production-line|extraction/.test(lt)
  ) {
    return CABLE_TYPE_OPTIONS.filter(
      (t) => SWA_PATTERN.test(t) || /singles/i.test(t)
    );
  }

  // Default (indoor domestic / commercial): all except SWA-only specialised
  return CABLE_TYPE_OPTIONS;
}

export function validateCableTypeChange(
  circuit: any,
  newType: string
): ValidationResult {
  const lock = checkTier4Lock(circuit, 'cableType');
  if (lock) return { ok: false, error: lock.reason };

  const allowed = getAllowedCableTypes(circuit);
  if (!allowed.includes(newType)) {
    return {
      ok: false,
      error: `${newType} is not allowed for this location/load type.`,
      suggestion: { field: 'cableType', value: allowed[0], label: allowed[0] },
    };
  }

  // Check Iz still ≥ protection rating with the new type
  const cableSize = Number(circuit?.cableSize ?? 0);
  const iz = lookupIz(cableSize, newType);
  const protectionRating = Number(circuit?.protectionDevice?.rating ?? 0);
  if (iz != null && iz < protectionRating) {
    return {
      ok: false,
      error: `Iz at ${cableSize} mm² ${newType.split(' ').slice(-2).join(' ')} (${iz} A) is below protection rating ${protectionRating} A. Increase cable size or pick a higher-rated type.`,
    };
  }

  return { ok: true };
}

// ─── CPC size editor ─────────────────────────────────────────────────────────

const CPC_SIZES = [1.0, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50];

/**
 * BS 7671 Table 54.7 simplified: CPC must be ≥ live × adiabatic factor.
 * For T&E we accept the standard reduced CPCs; for singles + SWA we expect
 * equal-size CPC.
 */
export function validateCpcSizeChange(circuit: any, newCpc: number): ValidationResult {
  if (!CPC_SIZES.includes(newCpc)) {
    return { ok: false, error: 'Not a standard CPC size.' };
  }
  const live = Number(circuit?.cableSize ?? 0);
  const family = getCableFamily(String(circuit?.cableType ?? ''));

  if (family === 'TE' || family === 'XLPE_TE') {
    // Standard T&E CPC mapping (BS 6004): each live size has a known reduced CPC
    const T_AND_E_CPC: Record<number, number> = {
      1.0: 1.0,
      1.5: 1.0,
      2.5: 1.5,
      4: 1.5,
      6: 2.5,
      10: 4,
      16: 6,
    };
    const expected = T_AND_E_CPC[live];
    if (expected != null && newCpc < expected) {
      return {
        ok: false,
        error: `CPC ${newCpc} mm² is undersized for ${live} mm² T&E. Standard reduced CPC for this live conductor is ${expected} mm².`,
        suggestion: { field: 'cpcSize', value: expected, label: `${expected} mm² (standard)` },
      };
    }
  } else {
    // Singles / SWA: CPC typically equals live; accept equal or larger
    if (newCpc < live) {
      return {
        ok: false,
        error: `For ${family.toLowerCase().replace('_', ' ')} cable, CPC should equal the live conductor (${live} mm²) or be sized via adiabatic equation.`,
        suggestion: { field: 'cpcSize', value: live, label: `${live} mm² (equal to live)` },
      };
    }
  }

  return { ok: true };
}

// ─── Installation method editor ──────────────────────────────────────────────

export const INSTALLATION_METHODS = [
  { value: 'A', label: 'Method A — in thermally insulated wall' },
  { value: 'B', label: 'Method B — in conduit on wall' },
  { value: 'C', label: 'Method C — clipped direct' },
  { value: 'D', label: 'Method D — direct in ground' },
  { value: 'E', label: 'Method E — free air / cable tray' },
  { value: 'F', label: 'Method F — single layer on perforated tray' },
];

export function validateInstallationMethodChange(
  circuit: any,
  newMethod: string
): ValidationResult {
  const m = String(newMethod).toUpperCase().trim();
  const allowed = INSTALLATION_METHODS.map((x) => x.value);
  if (!allowed.includes(m[0])) {
    return { ok: false, error: 'Method must be A / B / C / D / E / F.' };
  }
  // Buried route validation: if circuit's specialLocation is underground, method must be D
  const sl = String(circuit?.specialLocation ?? '').toLowerCase();
  if (sl === 'underground' && m[0] !== 'D') {
    return {
      ok: false,
      error: 'Underground / buried circuit must use Method D (direct in ground).',
      suggestion: { field: 'installationMethod', value: 'D', label: 'Method D — direct in ground' },
    };
  }
  return { ok: true };
}

// ─── Diversity factor editor ─────────────────────────────────────────────────

export function validateDiversityFactorChange(
  _circuit: any,
  newFactor: number
): ValidationResult {
  if (!isFinite(newFactor) || newFactor <= 0) {
    return { ok: false, error: 'Diversity factor must be greater than 0.' };
  }
  if (newFactor > 1.5) {
    return {
      ok: false,
      error: 'Diversity factor over 1.5 is unusual — check the loading is correct.',
    };
  }
  return { ok: true };
}

// ─── Special location editor ────────────────────────────────────────────────

export const SPECIAL_LOCATIONS = [
  { value: 'none', label: 'None' },
  { value: 'bathroom', label: 'Bathroom (Section 701)' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'outdoor', label: 'Outdoor / external' },
  { value: 'underground', label: 'Underground / buried' },
];

export function validateSpecialLocationChange(
  _circuit: any,
  _newLocation: string
): ValidationResult {
  // Always accept; downstream tripwires will fire on render if cable type now
  // mismatches the new location.
  return { ok: true };
}

// ─── Notes (free text) ───────────────────────────────────────────────────────

export function validateNotesChange(_circuit: any, newNotes: string): ValidationResult {
  if (newNotes.length > 500) {
    return { ok: false, error: 'Notes max 500 characters.' };
  }
  return { ok: true };
}

// ─── Recompute derived values after an edit ─────────────────────────────────

/**
 * Given a merged circuit (baseline + applied edits), recompute the derived
 * calculation fields the user would expect to see updated:
 *   - calculations.Iz             (from cable size + cable type)
 *   - calculations.voltageDrop    (mV/A/m × Ib × length)
 *   - calculations.maxZs          (Table 41.3 / 41.4 from device curve + rating)
 *   - calculations.In             (mirrors protection device rating)
 *
 * Returns a flat patch keyed by dot-paths so it can be applied alongside
 * the user's direct edits.
 */
export function recomputeDerivedFields(
  circuit: any
): Record<string, unknown> {
  const patch: Record<string, unknown> = {};
  const cableSize = Number(circuit?.cableSize ?? 0);
  const cableType = circuit?.cableType;
  const ib = Number(circuit?.calculations?.Ib ?? 0);
  const length = Number(circuit?.cableLength ?? 0);
  const rating = Number(circuit?.protectionDevice?.rating ?? 0);
  const curve = circuit?.protectionDevice?.curve;
  const u0 = 230; // single-phase reference voltage; 3φ derived elsewhere

  // Iz
  if (cableSize > 0) {
    const iz = lookupIz(cableSize, cableType);
    if (iz != null) patch['calculations.Iz'] = iz;
  }

  // Voltage drop — recompute from mV/A/m × Ib × length / 1000
  const factor = VD_FACTORS_TE[cableSize];
  if (factor && ib > 0 && length > 0) {
    const isRing = detectRingFinal(circuit);
    // Ring finals get the parallel-paths /4 reduction
    const divisor = isRing ? 4000 : 1000;
    const vdVolts = (factor * ib * length) / divisor;
    const vdPct = (vdVolts / u0) * 100;
    const limit = Number(circuit?.calculations?.voltageDrop?.limit ?? 5);
    patch['calculations.voltageDrop.volts'] = Number(vdVolts.toFixed(3));
    patch['calculations.voltageDrop.percent'] = Number(vdPct.toFixed(2));
    patch['calculations.voltageDrop.compliant'] = vdPct <= limit;
  }

  // Max Zs from Table 41.3 (or 41.4 for fuses, but MCB is dominant case)
  const maxZs = lookupMaxZs(curve, rating);
  if (maxZs != null) patch['calculations.maxZs'] = maxZs;

  // In follows protection rating
  if (rating > 0) patch['calculations.In'] = rating;

  return patch;
}

// ─── Auto-fix attempts ───────────────────────────────────────────────────────

const STANDARD_CABLE_SIZES_AF = [1.0, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120];
const STANDARD_RATINGS_AF = [6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125];

export interface AutoFix {
  field: string;
  value: unknown;
  rationale: string;
}

/**
 * Try common-pattern fixes on a REVIEW circuit. Cable size up, protection
 * rating down to within Iz, curve down (B → C → D) for Zs relief.
 *
 * Optional `boardZdbDelta`: when this circuit lives on a submain board, the
 * AI's reported Zs underestimates by (Zdb − Ze). Pass that delta and the
 * autofix will treat the corrected Zs as the failure criterion — a cable
 * upsize that closes the corrected gap is proposed.
 *
 * Returns an ordered list of fixes that, applied together, bring the circuit
 * into a passing state. Empty array if nothing landed.
 */
export function attemptAutoFix(
  circuit: any,
  options: { boardZdbDelta?: number; supplyZe?: number } = {}
): AutoFix[] {
  const fixes: AutoFix[] = [];
  const c = { ...circuit, calculations: { ...circuit?.calculations } };
  const zdbDelta = Math.max(0, Number(options.boardZdbDelta ?? 0));
  const supplyZe = Math.max(0, Number(options.supplyZe ?? 0.35));

  // 1. If Iz < protection rating or < Ib → upsize cable
  const ib = Number(c?.calculations?.Ib ?? 0);
  const rating = Number(c?.protectionDevice?.rating ?? 0);
  const currentSize = Number(c?.cableSize ?? 0);
  const currentIz = lookupIz(currentSize, c?.cableType);

  if (currentIz != null && (currentIz < rating || currentIz < ib)) {
    const need = Math.max(rating, ib);
    const next = STANDARD_CABLE_SIZES_AF.find((s) => {
      const iz = lookupIz(s, c?.cableType);
      return iz != null && iz >= need && s > currentSize;
    });
    if (next) {
      fixes.push({
        field: 'cableSize',
        value: next,
        rationale: `Upsize cable ${currentSize} → ${next} mm² so Iz ≥ ${need.toFixed(0)} A`,
      });
      c.cableSize = next; // chain for downstream checks
    }
  }

  // 2. If Vd > limit → upsize cable (assuming length unchanged)
  const vdLimit = Number(c?.calculations?.voltageDrop?.limit ?? 5);
  const vdPct = Number(c?.calculations?.voltageDrop?.percent ?? 0);
  const length = Number(c?.cableLength ?? 0);
  if (vdPct > vdLimit && length > 0 && ib > 0) {
    const target = STANDARD_CABLE_SIZES_AF.find((s) => {
      if (s <= Number(c.cableSize)) return false;
      const factor = VD_FACTORS_TE[s];
      if (!factor) return false;
      return ((factor * ib * length) / 1000 / 230) * 100 <= vdLimit;
    });
    if (target) {
      // If we already pushed a cableSize fix, replace it with the larger of the two
      const existing = fixes.find((f) => f.field === 'cableSize');
      if (existing) {
        if ((existing.value as number) < target) existing.value = target;
        existing.rationale = `${existing.rationale.replace(/→ \d+(?:\.\d+)? mm²/, `→ ${target} mm²`)} · also satisfies Vd ≤ ${vdLimit}%`;
      } else {
        fixes.push({
          field: 'cableSize',
          value: target,
          rationale: `Upsize cable to ${target} mm² so Vd ≤ ${vdLimit}%`,
        });
      }
      c.cableSize = target;
    }
  }

  // 3. If Zs > maxZs → try relaxing curve (B → C → D allows higher Zs).
  //    When `boardZdbDelta` > 0 we're on a submain — the AI's Zs underestimates
  //    by `zdbDelta`, so check the CORRECTED Zs against maxZs. If curve relief
  //    alone won't close the gap (because Zs already at curve D's max), we try
  //    cable upsize instead — bigger cable lowers R1+R2, which lowers Zs.
  const zs = Number(c?.calculations?.zs ?? 0);
  const correctedZs = zs > 0 ? zs + zdbDelta : zs;
  const maxZs = Number(c?.calculations?.maxZs ?? 0);
  const curve = String(c?.protectionDevice?.curve ?? 'B').toUpperCase();
  if (correctedZs > 0 && maxZs > 0 && correctedZs > maxZs) {
    let zsResolved = false;
    const tryCurves = curve === 'B' ? ['C', 'D'] : curve === 'C' ? ['D'] : [];
    for (const newCurve of tryCurves) {
      const newMax = lookupMaxZs(newCurve, rating);
      if (newMax != null && correctedZs <= newMax) {
        fixes.push({
          field: 'protectionDevice.curve',
          value: newCurve,
          rationale:
            zdbDelta > 0
              ? `Relax curve ${curve} → ${newCurve} so corrected Zs ${correctedZs.toFixed(2)} Ω (incl. submain chain) ≤ max ${newMax} Ω`
              : `Relax curve ${curve} → ${newCurve} so Zs ${correctedZs.toFixed(2)} Ω ≤ max ${newMax} Ω`,
        });
        zsResolved = true;
        break;
      }
    }
    // Curve relief failed — the only remaining frontend lever is cable upsize.
    // R1+R2 is roughly inversely proportional to cable area; doubling area
    // approximately halves R1+R2 (and thus the cable contribution to Zs).
    if (!zsResolved) {
      const cableContribution = Math.max(0, zs - supplyZe);
      // Find smallest cable size up that closes the gap.
      // Heuristic: scale factor = currentSize / candidateSize (R per metre roughly halves with 2× area).
      const targetCableContribution = Math.max(0, maxZs - zdbDelta - supplyZe);
      const scaleNeeded =
        cableContribution > 0 && targetCableContribution > 0
          ? cableContribution / targetCableContribution
          : 2;
      const candidate = STANDARD_CABLE_SIZES_AF.find(
        (s) => s > currentSize && s / currentSize >= scaleNeeded * 0.9
      );
      if (candidate) {
        const existing = fixes.find((f) => f.field === 'cableSize');
        const note =
          zdbDelta > 0
            ? `Upsize cable ${currentSize} → ${candidate} mm² to bring corrected Zs (incl. ${zdbDelta.toFixed(2)} Ω submain chain) ≤ max ${maxZs.toFixed(2)} Ω`
            : `Upsize cable ${currentSize} → ${candidate} mm² to bring Zs ≤ max ${maxZs.toFixed(2)} Ω`;
        if (existing) {
          if ((existing.value as number) < candidate) existing.value = candidate;
          existing.rationale = `${existing.rationale} · also closes Zs gap`;
        } else {
          fixes.push({ field: 'cableSize', value: candidate, rationale: note });
        }
      }
    }
  }

  // 4. If protection rating > Iz → downsize protection to fit
  if (currentIz != null && rating > currentIz) {
    const newRating = STANDARD_RATINGS_AF.filter((r) => r <= currentIz).slice(-1)[0];
    if (newRating && newRating < rating) {
      fixes.push({
        field: 'protectionDevice.rating',
        value: newRating,
        rationale: `Downsize protection ${rating} → ${newRating} A to fit cable Iz ${currentIz} A`,
      });
    }
  }

  return fixes;
}

// ─── Edit record (audit trail) ───────────────────────────────────────────────

export interface EditRecord {
  field: string;
  before: unknown;
  after: unknown;
  editedAt: number; // epoch ms
}

export type EditHistory = Record<number, EditRecord[]>;
