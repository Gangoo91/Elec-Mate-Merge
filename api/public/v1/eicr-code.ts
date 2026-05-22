/**
 * GET /api/public/v1/eicr-code?code=C2
 *
 * Returns the canonical IET Best Practice Guide 4 (BPG 4) definition
 * for an EICR observation code. Backed by hardcoded reference data
 * (these definitions are universal + don't change between editions).
 *
 *   C1 — Danger present, risk of injury — IMMEDIATE remedial action required
 *   C2 — Potentially dangerous — URGENT remedial action required
 *   C3 — Improvement recommended — not a fail, no time pressure
 *   FI — Further investigation required — inspector couldn't conclude
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

interface CodeMeta {
  code: 'C1' | 'C2' | 'C3' | 'FI';
  title: string;
  meaning: string;
  action: string;
  affects_eicr_outcome: 'unsatisfactory' | 'unsatisfactory' | 'satisfactory' | 'depends';
  typical_examples: string[];
  citation: string;
}

const CODES: Record<'C1' | 'C2' | 'C3' | 'FI', CodeMeta> = {
  C1: {
    code: 'C1',
    title: 'Danger present',
    meaning:
      'There is a risk of injury — typically because live parts are accessible, a fault is present, or an immediate hazard exists.',
    action:
      'Inspector must inform the client and the responsible person at the time of identification, in writing, before leaving site. Remedial action required IMMEDIATELY.',
    affects_eicr_outcome: 'unsatisfactory',
    typical_examples: [
      'Exposed live parts (broken socket front, removed switch plate exposing terminals)',
      'No earthing on a circuit serving Class I metallic equipment',
      'Damaged consumer unit enclosure with live parts exposed',
      'Burnt / arcing terminals at consumer unit',
      'Reversed polarity at a socket outlet (live and neutral swapped)',
    ],
    citation: 'IET Best Practice Guide 4, Issue 6 — Classification codes for EICR observations',
  },
  C2: {
    code: 'C2',
    title: 'Potentially dangerous',
    meaning:
      'No immediate danger, but a fault or condition exists that could become dangerous (e.g. under fault conditions, or with future deterioration). Urgent remedial action required.',
    action:
      'Remedial work required within an agreed timescale (typically 28 days for landlord EICRs under Electrical Safety Standards Regulations 2020).',
    affects_eicr_outcome: 'unsatisfactory',
    typical_examples: [
      'Absence of RCD protection on socket-outlet circuits (Reg 411.3.3)',
      'Absence of main protective bonding to incoming gas/water/oil services (Reg 411.3.1.2)',
      'Missing CPC on a final circuit',
      'Damaged or deteriorated cable insulation (not yet exposed)',
      'Inadequate disconnection time (Zs exceeds Table 41.3 limits)',
      'Loose terminations at consumer unit busbar / RCBO',
    ],
    citation: 'IET Best Practice Guide 4, Issue 6 — Classification codes for EICR observations',
  },
  C3: {
    code: 'C3',
    title: 'Improvement recommended',
    meaning:
      'Not a fail — the installation is safe and compliant, but an improvement would bring it closer to current best practice or current BS 7671. Does not make the EICR unsatisfactory.',
    action:
      'Recommendation only. Client may choose to act on it at their convenience. EICR still records it as an observation.',
    affects_eicr_outcome: 'satisfactory',
    typical_examples: [
      'Absence of SPD (surge protection device) where not previously required',
      'Old wiring colours not re-identified after extension',
      'Lack of circuit charts at the distribution board',
      'Single-pole switching on a 30mA RCBO where double-pole would be preferred',
      'No AFDD where Reg 421.1.7 recommends but does not require',
    ],
    citation: 'IET Best Practice Guide 4, Issue 6 — Classification codes for EICR observations',
  },
  FI: {
    code: 'FI',
    title: 'Further investigation required',
    meaning:
      'The inspector identified something that may be a C1 or C2 but could not determine within the scope/access of the inspection. Investigation is required before a final classification can be made.',
    action:
      'Inspector must record what triggered the FI and what investigation is required. EICR is unsatisfactory until the FI is resolved.',
    affects_eicr_outcome: 'unsatisfactory',
    typical_examples: [
      'Concealed cabling suspected to be inadequate, not visible without destructive testing',
      'Unidentified circuit feeding equipment that could not be safely de-energised',
      'Suspected damaged cable inside conduit/trunking that needs opening up to verify',
      'IR reading lower than expected on an inaccessible part of the circuit',
    ],
    citation: 'IET Best Practice Guide 4, Issue 6 — Classification codes for EICR observations',
  },
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const code = parseEnum(url.searchParams.get('code'), ['C1', 'C2', 'C3', 'FI'] as const, {
    caseInsensitive: true,
  });

  if (!code) {
    return errorResponse("Query param 'code' must be one of: C1, C2, C3, FI (per IET BPG 4)");
  }

  const meta = CODES[code];

  return jsonResponse(
    withCitation(
      {
        code: meta.code,
        title: meta.title,
        meaning: meta.meaning,
        action: meta.action,
        affects_eicr_outcome: meta.affects_eicr_outcome,
        typical_examples: meta.typical_examples,
      },
      meta.citation,
      'https://www.elec-mate.com/guides/eicr-schedule-of-inspections'
    )
  );
}
