/**
 * GET /api/public/v1/earth-rod-resistance?rcd_ma=30
 *
 * Calculates the maximum permitted earth electrode resistance (Ra) for a
 * TT system, per BS 7671:2018+A4:2026 Regulation 411.5.3.
 *
 *   Ra × IΔn ≤ 50V  (touch voltage limit)
 *   Therefore: Ra_max = 50 / (IΔn in amps)
 *
 * Inputs: rated residual operating current of the RCD in mA (30, 100, 300, 500).
 * Returns: theoretical max Ra + practical recommendations (200Ω, 100Ω).
 *
 * Pure deterministic — no DB. Heavily cached.
 */

import {
  jsonResponse,
  errorResponse,
  corsPreflight,
  methodNotAllowed,
  withCitation,
  parseIntInRange,
} from '../../_lib/util';

export const config = { runtime: 'edge' };

const VALID_RCD_MA = [10, 30, 100, 300, 500, 1000];
const TOUCH_VOLTAGE_LIMIT_V = 50; // Reg 411.5.3 — dry conditions

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const rcdMa = parseIntInRange(url.searchParams.get('rcd_ma'), 1, 1000);

  if (rcdMa === null) {
    return errorResponse(
      "Query param 'rcd_ma' (RCD rated residual operating current in mA) must be 1-1000. Common values: 30, 100, 300, 500."
    );
  }
  if (!VALID_RCD_MA.includes(rcdMa)) {
    return errorResponse(
      `Query param 'rcd_ma' must be a standard value: ${VALID_RCD_MA.join(', ')} mA`
    );
  }

  const iDeltaN_A = rcdMa / 1000;
  const ra_max_theoretical = TOUCH_VOLTAGE_LIMIT_V / iDeltaN_A;

  // Practical recommendations:
  //  - BS 7671 / NICEIC: prefer ≤ 200 Ω where reasonably practicable
  //  - IET COP (EV charging, agricultural): prefer ≤ 100 Ω
  //  - For sub-50V touch on 30mA: theoretical max 1667 Ω is too lax; aim < 200 Ω
  const ra_recommended_max = rcdMa >= 100 ? Math.min(ra_max_theoretical, 200) : 200;

  // Stability concern: > 200 Ω may not stay stable in dry / frozen / drought conditions.
  const isStableThreshold = ra_max_theoretical > 200;

  return jsonResponse(
    withCitation(
      {
        rcd_rated_current_ma: rcdMa,
        rcd_rated_current_a: iDeltaN_A,
        touch_voltage_limit_v: TOUCH_VOLTAGE_LIMIT_V,
        formula: `Ra_max = ${TOUCH_VOLTAGE_LIMIT_V} V / ${iDeltaN_A} A`,
        ra_max_theoretical_ohm: Math.round(ra_max_theoretical * 10) / 10,
        ra_recommended_max_ohm: ra_recommended_max,
        stability_warning: isStableThreshold
          ? `Theoretical max (${Math.round(ra_max_theoretical)} Ω) is above 200 Ω — measured Ra may not stay stable across seasons (dry, frozen, drought). BS 7671 Note to 411.5.3 + IET On-Site Guide recommend a measured value ≤ 200 Ω to allow for variation. Target < 100 Ω for EV charging (IET CoP).`
          : null,
        practical_guidance: {
          niceic_recommended_max_ohm: 200,
          iet_cop_ev_recommended_max_ohm: 100,
          bs7430_target_ohm: 'as low as reasonably practicable',
        },
        notes:
          'Ra is the resistance of the earth electrode + the protective conductor from the electrode to the Main Earthing Terminal. Test with a 3-spike fall-of-potential method (BS 7430) or a stake-less clamp meter (suitable in many TT scenarios). For TT installations on EV charging or outdoor work, IET COP recommends Ra ≤ 100 Ω where reasonably practicable.',
      },
      'BS 7671:2018+A4:2026 Reg 411.5.3 — TT system protection by automatic disconnection (Ra × IΔn ≤ 50V)',
      'https://www.elec-mate.com/tools/earth-rod-resistance-calculator'
    )
  );
}
