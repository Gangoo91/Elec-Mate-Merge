/**
 * GET /api/public/v1/zs-max?type=B&in=32
 *
 * Maximum permitted earth fault loop impedance (Zs) for an MCB per
 * BS 7671:2018+A4:2026 Regulation 411.4.4.
 *
 * Formula: Zs_max = (Uo × Cmin) / (multiplier × In)
 *   Uo = 230 V, Cmin = 0.95
 *   mult(B) = 5, mult(C) = 10, mult(D) = 20
 *
 * Pure deterministic calculation — no DB, no upstream. Heavily cached.
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

const UO_V = 230;
const CMIN = 0.95;
const MULTIPLIERS: Record<'B' | 'C' | 'D', number> = { B: 5, C: 10, D: 20 };

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const type = parseEnum(url.searchParams.get('type'), ['B', 'C', 'D'] as const, {
    caseInsensitive: true,
  });
  if (!type) {
    return errorResponse("Query param 'type' must be one of: B, C, D (MCB type per BS EN 60898)");
  }

  const inA = parseIntInRange(url.searchParams.get('in'), 1, 125);
  if (inA === null) {
    return errorResponse("Query param 'in' (rated current in amperes) must be an integer 1–125");
  }

  const mult = MULTIPLIERS[type];
  const maxZs = (UO_V * CMIN) / (mult * inA);
  const maxZsRounded = Math.round(maxZs * 1000) / 1000;

  return jsonResponse(
    withCitation(
      {
        mcb_type: type,
        rated_current_a: inA,
        max_zs_ohm: maxZsRounded,
        formula: `Zs_max = (Uo × Cmin) / (multiplier × In) = (${UO_V} × ${CMIN}) / (${mult} × ${inA})`,
        constants: { uo_v: UO_V, cmin: CMIN, multiplier: mult },
        notes:
          'Cmin = 0.95 accounts for the minimum permissible supply voltage under ESQCR 2002. The multiplier is the magnetic trip current (Ia) divided by In: 5× for Type B, 10× for Type C, 20× for Type D devices to BS EN 60898.',
      },
      'BS 7671:2018+A4:2026 Reg 411.4.4 — Automatic Disconnection of Supply',
      'https://www.elec-mate.com/earth-loop-impedance-calculator'
    )
  );
}
