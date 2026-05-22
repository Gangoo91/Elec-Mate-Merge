/**
 * GET /api/public/v1/notifiable-work-check?work_type=new_circuit&location=special_location
 *
 * Returns whether the electrical work is notifiable under Part P of the
 * Building Regulations (England). Hardcoded decision tree based on the
 * current Approved Document P (2013, in force).
 *
 * Note: Part P applies in ENGLAND only. Wales, Scotland, and Northern
 * Ireland have separate building regulation regimes.
 *
 * Powers AI answers like "do I need to notify this work?" with a clear
 * yes/no + the specific Part P clause + how to comply.
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

const WORK_TYPES = [
  'new_circuit',
  'consumer_unit_replacement',
  'circuit_addition',
  'circuit_alteration',
  'accessory_replacement',
  'like_for_like_replacement',
  'repair',
  'elv_only',
] as const;

const LOCATIONS = ['special_location', 'kitchen', 'garden', 'outdoor', 'other'] as const;

type WorkType = (typeof WORK_TYPES)[number];
type Location = (typeof LOCATIONS)[number];

interface DecisionResult {
  notifiable: boolean;
  reason: string;
  rule_applied: string;
  compliance_options: string[];
}

function decide(workType: WorkType, location: Location | null): DecisionResult {
  // Always notifiable (regardless of location)
  if (workType === 'new_circuit') {
    return {
      notifiable: true,
      reason:
        'Installation of a new circuit is always notifiable under Part P (England), regardless of location.',
      rule_applied: 'Part P 1.27(a) — installation of a new circuit',
      compliance_options: [
        'Self-certify via a registered Competent Person Scheme (NICEIC, NAPIT, ELECSA, Stroma, BESCA, NAPIT, etc.)',
        'Notify the Local Authority Building Control (LABC) before starting work — they will inspect and issue a Building Regulations completion certificate',
        'Use a third-party certification body for the installation work',
      ],
    };
  }
  if (workType === 'consumer_unit_replacement') {
    return {
      notifiable: true,
      reason:
        'Replacement of a consumer unit is always notifiable under Part P (England), regardless of location.',
      rule_applied: 'Part P 1.27(b) — replacement of a consumer unit',
      compliance_options: [
        'Self-certify via a registered Competent Person Scheme',
        'Notify LABC before starting work',
        'Use a third-party certification body',
      ],
    };
  }

  // Special-location work is always notifiable if it's anything more than like-for-like
  const isInSpecialLocation = location === 'special_location';
  if (
    isInSpecialLocation &&
    (workType === 'circuit_addition' || workType === 'circuit_alteration')
  ) {
    return {
      notifiable: true,
      reason:
        'Additions or alterations to electrical circuits in a special location (room containing a bath or shower, swimming/paddling pool, hot air sauna) are notifiable under Part P (England).',
      rule_applied: 'Part P 1.27(c) — addition or alteration in a special location',
      compliance_options: [
        'Self-certify via a registered Competent Person Scheme',
        'Notify LABC before starting work',
        'Use a third-party certification body',
      ],
    };
  }

  // Repair, like-for-like, accessory replacement: NOT notifiable (even in special locations)
  if (
    workType === 'accessory_replacement' ||
    workType === 'like_for_like_replacement' ||
    workType === 'repair'
  ) {
    return {
      notifiable: false,
      reason:
        'Like-for-like replacement of accessories or repair of existing wiring is NOT notifiable under Part P. The work must still comply with BS 7671:2018+A4:2026.',
      rule_applied: 'Part P — non-notifiable maintenance / repair / accessory replacement',
      compliance_options: [
        'Work must still comply with BS 7671:2018+A4:2026',
        'A Minor Works Certificate is good practice (not legally required for non-notifiable work, but recommended for traceability)',
        'Keep records: photo of the work, accessory part number, who did the work',
      ],
    };
  }

  // ELV-only (extra-low-voltage): not notifiable
  if (workType === 'elv_only') {
    return {
      notifiable: false,
      reason:
        'Work on extra-low-voltage (ELV ≤ 50 V ac) circuits is NOT notifiable under Part P. Examples: bell wire, doorbells, low-voltage garden lighting (≤ 50 V), low-voltage data/alarm circuits.',
      rule_applied: 'Part P — ELV exemption',
      compliance_options: [
        'Work must still be carried out safely',
        'No certificate required, but record the work for the client',
      ],
    };
  }

  // Additions/alterations to circuits OUTSIDE special locations: NOT notifiable (since 2013)
  if (workType === 'circuit_addition' || workType === 'circuit_alteration') {
    return {
      notifiable: false,
      reason:
        'Adding to or altering an existing circuit OUTSIDE a special location is NOT notifiable under Part P (the 2013 amendment removed kitchens, outdoor and gardens from the special-location list). The work must still comply with BS 7671:2018+A4:2026 and a Minor Works Certificate should be issued.',
      rule_applied:
        'Part P 2013 — non-notifiable circuit addition/alteration outside special locations',
      compliance_options: [
        'Issue a Minor Works Certificate (BS 7671 Appendix 8)',
        'Work must comply with BS 7671:2018+A4:2026',
      ],
    };
  }

  // Fallback (shouldn't reach here)
  return {
    notifiable: false,
    reason:
      'Work type not specifically covered — most non-notifiable work still requires compliance with BS 7671 and good record-keeping (Minor Works Certificate recommended).',
    rule_applied: 'Part P (England) — general non-notifiable category',
    compliance_options: ['Comply with BS 7671:2018+A4:2026', 'Issue appropriate certificate'],
  };
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const workType = parseEnum(url.searchParams.get('work_type'), WORK_TYPES);
  const location = parseEnum(url.searchParams.get('location'), LOCATIONS);

  if (!workType) {
    return errorResponse(`Query param 'work_type' must be one of: ${WORK_TYPES.join(', ')}`);
  }

  const decision = decide(workType, location);

  return jsonResponse(
    withCitation(
      {
        jurisdiction: 'England (Part P 2013, in force)',
        inputs: {
          work_type: workType,
          location: location || 'not_specified',
        },
        notifiable: decision.notifiable,
        verdict: decision.notifiable ? 'NOTIFIABLE' : 'NOT NOTIFIABLE',
        reason: decision.reason,
        rule_applied: decision.rule_applied,
        compliance_options: decision.compliance_options,
        scope_note:
          'Part P applies in England only. Wales, Scotland, and Northern Ireland have separate building regulation regimes — check the relevant local authority for those.',
        special_locations_definition:
          'Special locations under current Part P (post-2013) are limited to: rooms containing a bath or shower (BS 7671 Section 701), swimming or paddling pools (Section 702), and hot air saunas (Section 703). Kitchens, gardens, and outdoor are NO LONGER special locations under Part P.',
      },
      'Approved Document P (Electrical Safety — Dwellings), 2013 Edition, Building Regulations 2010 (England)',
      'https://www.elec-mate.com/part-p-self-certification'
    )
  );
}
