/**
 * GET /api/public/v1/certificate-required?work_type=new_circuit
 *
 * Returns which BS 7671 certificate is required for a given category
 * of electrical work in the UK. Hardcoded reference data based on
 * BS 7671:2018+A4:2026 Chapter 64 (Initial Verification) and the
 * IET Best Practice Guides.
 *
 * Powers AI answers like "what certificate do I need for X?" with a
 * specific certificate type + the BS 7671 clause requiring it.
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
  'new_installation',
  'new_circuit',
  'consumer_unit_replacement',
  'circuit_addition',
  'circuit_alteration',
  'accessory_replacement',
  'periodic_inspection',
  'change_of_use',
  'rented_property_check',
  'pat_testing',
  'solar_pv',
  'ev_charger',
  'emergency_lighting',
  'fire_alarm',
] as const;

type WorkType = (typeof WORK_TYPES)[number];

interface CertificateAdvice {
  primary_certificate: string;
  also_required: string[];
  not_required: string[];
  rationale: string;
  bs7671_citation: string;
  additional_obligations: string[];
}

function decide(workType: WorkType): CertificateAdvice {
  switch (workType) {
    case 'new_installation':
      return {
        primary_certificate: 'Electrical Installation Certificate (EIC)',
        also_required: ['Schedule of Inspections (BS 7671 Appendix 6)', 'Schedule of Test Results'],
        not_required: ['EICR (not for new work)'],
        rationale:
          'A new installation requires a full Electrical Installation Certificate per BS 7671 Reg 644.1. Domestic dwellings also require Part P notification.',
        bs7671_citation:
          'BS 7671:2018+A4:2026 Reg 644.1 — initial verification + Appendix 6 model forms',
        additional_obligations: [
          'Part P notification (England — competent person scheme self-cert OR LABC)',
          'Hand over a copy of the EIC + schedules to the client',
          'Retain a copy for at least 6 years',
        ],
      };
    case 'new_circuit':
      return {
        primary_certificate: 'Electrical Installation Certificate (EIC)',
        also_required: ['Schedule of Inspections (BS 7671 Appendix 6)', 'Schedule of Test Results'],
        not_required: [
          'Minor Works Certificate (only for additions/alterations, NOT new circuits)',
        ],
        rationale:
          'Installing a new circuit requires a full EIC — not a Minor Works Certificate. A Minor Works form is only valid where no new circuit has been installed.',
        bs7671_citation: 'BS 7671:2018+A4:2026 Reg 644.1 + Appendix 6',
        additional_obligations: [
          'Part P notifiable in England (always — even outside special locations)',
          'Self-certify via Competent Person Scheme or notify LABC',
        ],
      };
    case 'consumer_unit_replacement':
      return {
        primary_certificate: 'Electrical Installation Certificate (EIC)',
        also_required: [
          'Schedule of Inspections (Appendix 6)',
          'Schedule of Test Results for every circuit',
        ],
        not_required: ['Minor Works Certificate (insufficient for CU replacement)'],
        rationale:
          'A consumer unit replacement requires a full EIC because every circuit must be tested at the new CU. A Minor Works is not sufficient.',
        bs7671_citation: 'BS 7671:2018+A4:2026 Reg 644.1 + Appendix 6',
        additional_obligations: [
          'Part P notifiable in England (always)',
          'Test every outgoing circuit (R1+R2, IR, polarity, Zs, RCD)',
          'Verify enclosure non-combustibility per Reg 421.1.201',
        ],
      };
    case 'circuit_addition':
    case 'circuit_alteration':
      return {
        primary_certificate: 'Minor Works Certificate (MWC)',
        also_required: [
          'Test results for the altered/added portion (R1+R2, IR, polarity, Zs, RCD)',
        ],
        not_required: ['Full EIC (only required for NEW circuits, not additions to existing)'],
        rationale:
          'An addition or alteration to an EXISTING circuit (e.g. extending a ring final to add a socket) is covered by a Minor Works Certificate. If a new circuit is installed at the same time, use an EIC instead.',
        bs7671_citation:
          'BS 7671:2018+A4:2026 Appendix 8 — Minor Electrical Installation Works Certificate',
        additional_obligations: [
          'Part P notifiable in England only if in a special location (bathroom/pool/sauna)',
          'Test the altered portion, NOT the whole installation',
          'Issue to the client + retain copy',
        ],
      };
    case 'accessory_replacement':
      return {
        primary_certificate:
          'No certificate legally required for like-for-like accessory replacement (e.g. swapping a faceplate). A Minor Works Certificate is best practice for traceability.',
        also_required: [],
        not_required: ['EIC', 'EICR', 'Mandatory MWC'],
        rationale:
          'Like-for-like accessory replacement (socket front, switch faceplate, light fitting) is NOT notifiable and does not legally require a certificate. Best practice: record the work + photo for the client.',
        bs7671_citation:
          'BS 7671:2018+A4:2026 — non-notifiable repair/replacement is outside Initial Verification scope',
        additional_obligations: [
          'Work must still comply with BS 7671 (correct accessory rating, polarity, IP rating)',
          'Keep an informal record for the client',
        ],
      };
    case 'periodic_inspection':
    case 'rented_property_check':
      return {
        primary_certificate: 'Electrical Installation Condition Report (EICR)',
        also_required: ['Schedule of Inspections', 'Schedule of Test Results'],
        not_required: ['EIC (only for new work)'],
        rationale:
          'A periodic inspection (or landlord rental property check) requires an EICR. Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, this must be at least every 5 years (or sooner if the EICR specifies).',
        bs7671_citation:
          'BS 7671:2018+A4:2026 Chapter 65 — Periodic Inspection and Testing + Appendix 6 (Condition Report form)',
        additional_obligations: [
          'Code observations as C1 / C2 / C3 / FI per IET BPG 4',
          'EICR is "Unsatisfactory" if any C1, C2 or FI present',
          'Issue to client within 28 days for rented property checks',
        ],
      };
    case 'change_of_use':
      return {
        primary_certificate: 'Electrical Installation Condition Report (EICR)',
        also_required: ['EIC for any new work carried out as part of the change of use'],
        not_required: [],
        rationale:
          'A change of use (e.g. domestic to HMO, commercial to residential) requires an EICR to confirm the existing installation is suitable + any new work is documented by EIC.',
        bs7671_citation: 'BS 7671:2018+A4:2026 Chapter 65 + Reg 644.1 (for new work)',
        additional_obligations: [
          'Check Building Regs Part B (fire safety) + relevant special location regs',
          'HMO licensing requirements (Housing Act 2004) may apply',
        ],
      };
    case 'pat_testing':
      return {
        primary_certificate: 'PAT Certificate (In-Service Inspection & Testing Report)',
        also_required: [],
        not_required: ['EIC', 'EICR (different scope — fixed installations only)'],
        rationale:
          'Portable Appliance Testing is governed by IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment (5th Edition). Not legally mandated but required for duty of care under the Electricity at Work Regulations 1989.',
        bs7671_citation:
          'Out of scope for BS 7671 (covers fixed installations). See IET Code of Practice for In-Service Inspection and Testing.',
        additional_obligations: [
          'Record class, serial number, visual + test results',
          'Frequency per risk assessment (typically 6-24 months)',
        ],
      };
    case 'solar_pv':
      return {
        primary_certificate: 'Electrical Installation Certificate (EIC)',
        also_required: [
          'Solar PV Certificate (MCS Installation Certificate for MCS-registered work)',
          'MCS Installation Certificate (if eligible for SEG/feed-in)',
          'DNO Notification (G98 or G99 depending on rating)',
        ],
        not_required: [],
        rationale:
          'Solar PV installations require a standard EIC for the BS 7671 compliance + an MCS Installation Certificate if the install is MCS-registered (required for Smart Export Guarantee eligibility). DNO notification under G98 (≤16 A) or G99 (>16 A) is also required.',
        bs7671_citation:
          'BS 7671:2018+A4:2026 Section 712 — Solar photovoltaic (PV) power supply systems',
        additional_obligations: [
          'DNO G98 / G99 notification (G98 ≤ 16 A per phase; G99 above)',
          'MCS-registered installer for SEG eligibility',
          'Building Regulations Part L (energy efficiency)',
        ],
      };
    case 'ev_charger':
      return {
        primary_certificate: 'Electrical Installation Certificate (EIC)',
        also_required: [
          'IET EV Charging Installation Certificate (per IET Code of Practice 5th Ed)',
          'DNO notification (where charger > 13.8 kW or supply upgrade required)',
        ],
        not_required: [],
        rationale:
          'EV charger installations require an EIC for BS 7671 Section 722 compliance + the IET CoP-specific EV certificate documenting Type A/B RCD, O-PEN/earth electrode, smart charging compliance.',
        bs7671_citation:
          'BS 7671:2018+A4:2026 Section 722 — Electric Vehicle Charging Installations',
        additional_obligations: [
          'Part P notifiable (new circuit)',
          'Building Regs Part S (new dwellings)',
          'Electric Vehicles (Smart Charge Points) Regulations 2021',
          'OZEV grant eligibility requires MCS / OZEV-approved installer',
        ],
      };
    case 'emergency_lighting':
      return {
        primary_certificate: 'Emergency Lighting Certificate (BS 5266-1)',
        also_required: ['EIC for the electrical installation work'],
        not_required: [],
        rationale:
          'Emergency lighting requires a system-specific Emergency Lighting Certificate per BS 5266-1:2016 covering design, installation, commissioning + handover. The electrical wiring is also covered by an EIC.',
        bs7671_citation:
          'BS 7671:2018+A4:2026 + BS 5266-1:2016 (Emergency Lighting Code of Practice)',
        additional_obligations: [
          'Monthly functional test (per BS 5266)',
          'Annual full-duration test',
          'Maintain a log book',
        ],
      };
    case 'fire_alarm':
      return {
        primary_certificate:
          'Fire Alarm Certificate (BS 5839-1 commercial or BS 5839-6 domestic/HMO)',
        also_required: ['EIC for the electrical installation work'],
        not_required: [],
        rationale:
          'Fire alarm systems require certification under BS 5839-1 (commercial) or BS 5839-6 (domestic/HMO). The electrical wiring is also covered by an EIC.',
        bs7671_citation:
          'BS 7671:2018+A4:2026 + BS 5839-1:2025 (commercial) or BS 5839-6:2019 (domestic/HMO)',
        additional_obligations: [
          'Weekly user-test',
          'Quarterly inspection by a competent fire alarm engineer',
          'Annual service',
        ],
      };
    default:
      return {
        primary_certificate:
          'Unknown — review BS 7671 Chapter 64 + Chapter 65 + relevant special-location section',
        also_required: [],
        not_required: [],
        rationale: 'Work type not in the standard decision tree.',
        bs7671_citation:
          'BS 7671:2018+A4:2026 Chapter 64 (Initial Verification) + Chapter 65 (Periodic Inspection)',
        additional_obligations: [],
      };
  }
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return corsPreflight();
  if (req.method !== 'GET') return methodNotAllowed();

  const url = new URL(req.url);
  const workType = parseEnum(url.searchParams.get('work_type'), WORK_TYPES);

  if (!workType) {
    return errorResponse(`Query param 'work_type' must be one of: ${WORK_TYPES.join(', ')}`);
  }

  const advice = decide(workType);

  return jsonResponse(
    withCitation(
      {
        work_type: workType,
        primary_certificate: advice.primary_certificate,
        also_required: advice.also_required,
        not_required: advice.not_required,
        rationale: advice.rationale,
        bs7671_clause: advice.bs7671_citation,
        additional_obligations: advice.additional_obligations,
        notes:
          'Decision tree based on BS 7671:2018+A4:2026 + IET Best Practice Guide 4 (EICR coding) + Building Regulations Part P (England). Wales, Scotland, and Northern Ireland may have variations.',
      },
      advice.bs7671_citation,
      'https://www.elec-mate.com/guides/electrical-certificate-types-uk'
    )
  );
}
