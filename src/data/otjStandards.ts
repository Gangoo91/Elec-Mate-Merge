/**
 * Off-the-job training (OTJ) minimum hours by apprenticeship standard.
 *
 * Source of truth: DfE "Apprenticeship funding rules 2025/2026, Annex C —
 * Off-the-job training: minimum requirement for each apprenticeship standard"
 * (Version 3, 10 December 2025).
 * https://www.gov.uk/government/publications/apprenticeship-funding-rules-2025-to-2026
 *
 * IMPORTANT — the rules changed on 1 August 2025. OTJ is no longer "20% of
 * working hours" or "6 hours per week". For starts from Aug 2025 each standard
 * carries a FIXED total OTJ-hours figure, delivered over a provider-agreed
 * timeframe (min 8-month practical period; absolute floor 187 hours). The old
 * 20% / 6h-week model only applies to pre-Aug-2025 (transitional) starts.
 *
 * This list is the electrical-trade subset relevant to Elec-Mate. The college
 * hub remains the authority for a linked student (college_students.
 * otj_required_hours); these figures power the self-set / no-college path and
 * the default estimate.
 */

export interface OtjStandard {
  code: string;
  name: string;
  level: number;
  /** DfE Annex C minimum off-the-job training hours. */
  otjHours: number;
}

export const OTJ_STANDARDS: OtjStandard[] = [
  { code: 'ST0152', name: 'Installation & Maintenance Electrician', level: 3, otjHours: 1066 },
  { code: 'ST1017', name: 'Domestic Electrician', level: 3, otjHours: 626 },
  {
    code: 'ST0150',
    name: 'Electrical/Electronic Product Service & Installation Engineer',
    level: 3,
    otjHours: 787,
  },
  { code: 'ST0475', name: 'Electrical Power Networks Engineer', level: 4, otjHours: 744 },
  {
    code: 'ST0157',
    name: 'Electrical Power Protection & Plant Commissioning Engineer',
    level: 4,
    otjHours: 1114,
  },
  {
    code: 'ST0051',
    name: 'Highway Electrical Maintenance & Installation Operative',
    level: 2,
    otjHours: 557,
  },
  { code: 'ST0052', name: 'Highways Electrician or Service Operative', level: 3, otjHours: 418 },
];

/** The default standard for Elec-Mate's core audience. */
export const DEFAULT_OTJ_STANDARD = OTJ_STANDARDS[0]; // ST0152, 1066h

/** Statutory floor — OTJ delivery can never be evidenced below this. */
export const OTJ_HOURS_FLOOR = 187;

export const getOtjStandard = (code: string | null | undefined): OtjStandard | undefined =>
  code ? OTJ_STANDARDS.find((s) => s.code === code) : undefined;
