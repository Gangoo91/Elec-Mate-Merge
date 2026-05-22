/**
 * GET /api/public/v1/disconnection-time?system=TN&circuit=final
 *
 * Maximum permitted disconnection time in seconds per
 * BS 7671:2018+A4:2026 Table 41.1.
 *
 *   TN, final         → 0.4 s   (final circuit ≤ 32 A)
 *   TN, distribution  → 5   s   (distribution circuit or final > 32 A)
 *   TT, final         → 0.2 s
 *   TT, distribution  → 1   s
 *
 * IT systems excluded — consult BS 7671 directly.
 */

import {
  jsonResponse,
  errorResponse,
  corsPreflight,
  methodNotAllowed,
  withCitation,
  parseEnum,
} from '../../_lib/util';

export const config = { runtime: 'edge' };

const TABLE: Record<'TN' | 'TT', Record<'final' | 'distribution', number>> = {
  TN: { final: 0.4, distribution: 5 },
  TT: { final: 0.2, distribution: 1 },
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);

  const system = parseEnum(url.searchParams.get('system'), ['TN', 'TT'] as const, {
    caseInsensitive: true,
  });
  if (!system) {
    return errorResponse("Query param 'system' must be 'TN' or 'TT'");
  }

  const circuit = parseEnum(url.searchParams.get('circuit'), ['final', 'distribution'] as const);
  if (!circuit) {
    return errorResponse("Query param 'circuit' must be 'final' or 'distribution'");
  }

  const maxTime = TABLE[system][circuit];

  return jsonResponse(
    withCitation(
      {
        system,
        circuit,
        max_time_s: maxTime,
        explanation: `Under BS 7671:2018+A4:2026 Table 41.1, a ${
          circuit === 'final'
            ? 'final circuit ≤32 A'
            : 'distribution circuit (or final circuit >32 A)'
        } on a ${system} system must disconnect within ${maxTime} second${
          maxTime === 1 ? '' : 's'
        } to satisfy Automatic Disconnection of Supply (ADS).`,
        notes:
          'Final circuit ≤32 A: TN = 0.4 s, TT = 0.2 s. Distribution or final >32 A: TN = 5 s, TT = 1 s. IT systems are outside this lookup — consult BS 7671 directly.',
      },
      'BS 7671:2018+A4:2026 Table 41.1 — Maximum disconnection times',
      'https://www.elec-mate.com/tools/disconnection-time-calculator'
    )
  );
}
