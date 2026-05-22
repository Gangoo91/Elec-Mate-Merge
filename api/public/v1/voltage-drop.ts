/**
 * GET /api/public/v1/voltage-drop?cable=2.5&load_a=20&length_m=15&phase=single
 *
 * Calculates voltage drop in volts for a copper twin & earth cable run,
 * using BS 7671 Appendix 4 Table 4D1A mV/A/m values (70°C thermoplastic
 * insulation, Reference Method C — clipped direct).
 *
 * Formula:
 *   Single-phase: Vd = (mV/A/m × I × L) / 1000
 *   Three-phase:  Vd = (mV/A/m_3ph × I × L) / 1000
 *
 * Pure deterministic — no DB. Heavily cached.
 *
 * BS 7671 voltage drop limits (Reg 525):
 *   Lighting circuits: 3% of Uo (= 6.9 V at 230 V)
 *   Other circuits:    5% of Uo (= 11.5 V at 230 V)
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

// BS 7671 Table 4D1A — mV/A/m for copper twin & earth 70°C thermoplastic
// Reference Method C (clipped direct). Single-phase, ac, 70°C conductor.
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

// Three-phase: roughly mV/A/m × √3 / 2 for cores in same cable.
// BS 7671 Table 4D1B values for 70°C thermoplastic 3-core.
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

const VALID_SIZES = Object.keys(MV_PER_AM_SINGLE);
const UO_V = 230;

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const rawCable = (url.searchParams.get('cable') || '').trim();
  const loadA = parseIntInRange(url.searchParams.get('load_a'), 1, 400);
  const lengthM = parseIntInRange(url.searchParams.get('length_m'), 1, 500);
  const phase = parseEnum(url.searchParams.get('phase'), ['single', 'three'] as const) || 'single';

  if (!VALID_SIZES.includes(rawCable)) {
    return errorResponse(
      `Query param 'cable' must be one of: ${VALID_SIZES.join(', ')} (mm² conductor cross-section)`
    );
  }
  if (loadA === null) {
    return errorResponse("Query param 'load_a' (load current in amperes) must be 1–400");
  }
  if (lengthM === null) {
    return errorResponse("Query param 'length_m' (cable run length in metres) must be 1–500");
  }

  const mvPerAm = phase === 'three' ? MV_PER_AM_THREE[rawCable] : MV_PER_AM_SINGLE[rawCable];
  const vd = (mvPerAm * loadA * lengthM) / 1000;
  const vdPercent = (vd / UO_V) * 100;

  const lightingLimit = 0.03 * UO_V; // 6.9 V
  const otherLimit = 0.05 * UO_V; // 11.5 V

  const compliance = {
    lighting_3pct: {
      limit_v: lightingLimit,
      complies: vd <= lightingLimit,
    },
    other_circuits_5pct: {
      limit_v: otherLimit,
      complies: vd <= otherLimit,
    },
  };

  return jsonResponse(
    withCitation(
      {
        inputs: {
          cable_size_mm2: Number.parseFloat(rawCable),
          load_a: loadA,
          length_m: lengthM,
          phase,
          voltage_v: UO_V,
        },
        mv_per_am: mvPerAm,
        formula:
          phase === 'three'
            ? 'Vd = (mV/A/m × I × L) / 1000 (3-phase, Table 4D1B)'
            : 'Vd = (mV/A/m × I × L) / 1000 (single-phase, Table 4D1A)',
        voltage_drop_v: Math.round(vd * 100) / 100,
        voltage_drop_percent: Math.round(vdPercent * 100) / 100,
        bs7671_limits: compliance,
        notes:
          'mV/A/m values from BS 7671 Appendix 4 Table 4D1A (single-phase) / 4D1B (three-phase) for 70°C thermoplastic insulation, copper, Reference Method C (clipped direct). For other reference methods (B, A, D, E), the mV/A/m varies slightly — check the relevant table.',
      },
      'BS 7671:2018+A4:2026 Reg 525 + Appendix 4 Tables 4D1A/4D1B — Voltage drop limits',
      'https://www.elec-mate.com/voltage-drop-calculator'
    )
  );
}
