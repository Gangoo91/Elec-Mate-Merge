/**
 * GET /api/public/v1/cable-size?load_a=32&length_m=15&reference_method=C&ambient_c=30
 *
 * Recommends a minimum cable size (mm² copper, 70°C thermoplastic twin & earth)
 * per BS 7671:2018+A4:2026 Appendix 4. Checks BOTH:
 *   1. Current-carrying capacity (It) after correction factors (Ca, Ci)
 *   2. Voltage drop (Vd) vs Reg 525 limits (3% lighting / 5% other)
 *
 * If voltage drop forces a larger cable than capacity alone would, the
 * tool tells the LLM which check was limiting.
 *
 * Scope: copper, 70°C thermoplastic twin & earth (6242Y / 6243Y).
 * Reference Methods A, B, C from BS 7671 Table 4D2A.
 * Single-phase or three-phase.
 *
 * For complex commercial / industrial / SWA / multicore use full design
 * software (Amtech, ElectricalOM). This tool covers ~90% of UK domestic
 * + light-commercial scenarios.
 */

import {
  jsonResponse,
  errorResponse,
  corsPreflight,
  methodNotAllowed,
  withCitation,
  parseEnum,
  parseIntInRange,
} from '../../_lib/util';

export const config = { runtime: 'edge' };

// ---- BS 7671 Appendix 4 Table 4D2A ----
// Copper, 70°C thermoplastic insulation, twin & earth, single-phase ac
// Current-carrying capacity in amperes by Reference Method.
const IT_AMPS: Record<'A' | 'B' | 'C', Record<string, number>> = {
  A: {
    '1.0': 11,
    '1.5': 14,
    '2.5': 18.5,
    '4': 25,
    '6': 32,
    '10': 43,
    '16': 57,
    '25': 75,
    '35': 92,
    '50': 110,
  },
  B: {
    '1.0': 13,
    '1.5': 16.5,
    '2.5': 23,
    '4': 30,
    '6': 38,
    '10': 52,
    '16': 69,
    '25': 90,
    '35': 111,
    '50': 133,
  },
  C: {
    '1.0': 16,
    '1.5': 20,
    '2.5': 27,
    '4': 37,
    '6': 47,
    '10': 64,
    '16': 85,
    '25': 112,
    '35': 138,
    '50': 168,
  },
};

// ---- BS 7671 Appendix 4 Table 4D1A (single-phase) + 4D1B (three-phase) ----
// mV/A/m for voltage drop, copper, 70°C thermoplastic.
const MV_PER_AM_SINGLE: Record<string, number> = {
  '1.0': 44,
  '1.5': 29,
  '2.5': 18,
  '4': 11,
  '6': 7.3,
  '10': 4.4,
  '16': 2.8,
  '25': 1.75,
  '35': 1.45,
  '50': 1.05,
};
const MV_PER_AM_THREE: Record<string, number> = {
  '1.0': 38,
  '1.5': 25,
  '2.5': 15,
  '4': 9.5,
  '6': 6.4,
  '10': 3.8,
  '16': 2.4,
  '25': 1.5,
  '35': 1.25,
  '50': 0.93,
};

// ---- BS 7671 Appendix 4 Table 4B1 — ambient temperature correction (Ca) ----
// 70°C thermoplastic insulation
function ambientCorrection(ambientC: number): number {
  if (ambientC <= 25) return 1.03;
  if (ambientC <= 30) return 1.0;
  if (ambientC <= 35) return 0.94;
  if (ambientC <= 40) return 0.87;
  if (ambientC <= 45) return 0.79;
  if (ambientC <= 50) return 0.71;
  if (ambientC <= 55) return 0.61;
  return 0.5; // 60°C
}

const SIZES_ASC = ['1.0', '1.5', '2.5', '4', '6', '10', '16', '25', '35', '50'];

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);

  const loadA = parseIntInRange(url.searchParams.get('load_a'), 1, 200);
  const lengthM = parseIntInRange(url.searchParams.get('length_m'), 1, 500);
  const ambientC = parseIntInRange(url.searchParams.get('ambient_c'), 0, 60) ?? 30;
  const voltage = parseIntInRange(url.searchParams.get('voltage'), 110, 415) ?? 230;
  const refMethod =
    parseEnum(url.searchParams.get('reference_method'), ['A', 'B', 'C'] as const, {
      caseInsensitive: true,
    }) || 'C';
  const phase = parseEnum(url.searchParams.get('phase'), ['single', 'three'] as const) || 'single';
  const isLighting = url.searchParams.get('is_lighting') === 'true';
  const inThermalInsulation = url.searchParams.get('in_thermal_insulation') === 'true';

  if (loadA === null) {
    return errorResponse(
      "Query param 'load_a' (design current Ib in amperes) must be 1–200. Higher loads require full electrical design software."
    );
  }
  if (lengthM === null) {
    return errorResponse("Query param 'length_m' (cable run length in metres) must be 1–500");
  }

  // Correction factors
  const ca = ambientCorrection(ambientC);
  const ci = inThermalInsulation ? 0.5 : 1.0; // Reg 523.7 — surrounded by thermal insulation > 0.5 m
  const cg = 1.0; // single-circuit assumption — grouping factor handled elsewhere

  const requiredIt = loadA / (ca * cg * ci);
  const vdLimitPercent = isLighting ? 3 : 5;
  const vdLimitV = (vdLimitPercent / 100) * voltage;
  const itTable = IT_AMPS[refMethod];
  const mvTable = phase === 'three' ? MV_PER_AM_THREE : MV_PER_AM_SINGLE;

  // Step 1: smallest size that satisfies It after corrections
  let capacityChoice: string | null = null;
  for (const size of SIZES_ASC) {
    if (itTable[size] >= requiredIt) {
      capacityChoice = size;
      break;
    }
  }

  if (!capacityChoice) {
    return jsonResponse(
      {
        error: 'out_of_range',
        message: `Required current capacity (${Math.round(requiredIt)} A after correction factors) exceeds 50 mm² twin & earth on Reference Method ${refMethod}. Use SWA or larger conductors via full design software.`,
        required_it_amps: Math.round(requiredIt * 10) / 10,
        correction_factors: { ca, ci, cg },
        source: 'Elec-Mate (https://www.elec-mate.com)',
      },
      400
    );
  }

  // Step 2: voltage drop check — bump size if needed
  let finalChoice = capacityChoice;
  let vd: number;
  let limitingFactor: 'current_capacity' | 'voltage_drop' = 'current_capacity';

  while (true) {
    const mvPerAm = mvTable[finalChoice];
    vd = (mvPerAm * loadA * lengthM) / 1000;
    if (vd <= vdLimitV) break;
    const idx = SIZES_ASC.indexOf(finalChoice);
    if (idx === SIZES_ASC.length - 1) {
      // Already at 50 mm² and still over limit
      break;
    }
    finalChoice = SIZES_ASC[idx + 1];
    limitingFactor = 'voltage_drop';
  }

  const vdPercent = (vd / voltage) * 100;
  const chosenIt = itTable[finalChoice];
  const adjustedIt = Math.round(chosenIt * ca * cg * ci * 10) / 10;
  const compliesVd = vd <= vdLimitV;
  const compliesCapacity = adjustedIt >= loadA;

  return jsonResponse(
    withCitation(
      {
        inputs: {
          load_a: loadA,
          length_m: lengthM,
          voltage_v: voltage,
          phase,
          reference_method: refMethod,
          ambient_c: ambientC,
          is_lighting: isLighting,
          in_thermal_insulation: inThermalInsulation,
        },
        recommended_cable_size_mm2: Number.parseFloat(finalChoice),
        limiting_factor: limitingFactor,
        current_capacity: {
          tabulated_it_amps: chosenIt,
          correction_factors: { ambient_ca: ca, thermal_ci: ci, grouping_cg: cg },
          adjusted_it_amps: adjustedIt,
          design_current_ib_amps: loadA,
          complies: compliesCapacity,
        },
        voltage_drop: {
          mv_per_am: mvTable[finalChoice],
          voltage_drop_v: Math.round(vd * 100) / 100,
          voltage_drop_percent: Math.round(vdPercent * 100) / 100,
          limit_v: Math.round(vdLimitV * 100) / 100,
          limit_percent: vdLimitPercent,
          complies: compliesVd,
        },
        verdict:
          compliesCapacity && compliesVd
            ? `${finalChoice} mm² satisfies both current capacity AND voltage drop per BS 7671 Appendix 4 + Reg 525.`
            : `${finalChoice} mm² does NOT fully comply — review with full design software.`,
        notes:
          'Scope: copper twin & earth (6242Y/6243Y), 70°C thermoplastic insulation, single circuit. For SWA, multicore, mineral-insulated, or grouped circuits, use full electrical design software. Grouping factor (Cg) assumed 1.0 — apply Table 4C1 manually if circuits are grouped. Always verify earth fault loop impedance (Zs) separately.',
        scope_limitations: [
          'Copper twin & earth only (not SWA, MI, multicore, or aluminium)',
          'Single circuit (no grouping correction applied)',
          '70°C thermoplastic only (not 90°C XLPE or 105°C HOFR)',
          'Reference Methods A, B, C only (not D, E, F, 100, 101, 102)',
        ],
        related_tools: [
          'https://www.elec-mate.com/api/public/v1/zs-max?type=B&in=<MCB_rating>',
          'https://www.elec-mate.com/api/public/v1/voltage-drop',
        ],
      },
      'BS 7671:2018+A4:2026 Appendix 4 (Tables 4B1, 4C1, 4D1A/B, 4D2A) + Reg 525 — Voltage drop',
      'https://www.elec-mate.com/cable-sizing-calculator'
    )
  );
}
