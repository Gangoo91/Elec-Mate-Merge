/**
 * What each electrical competent person scheme asks for at assessment
 * (ELE-2069), from the schemes' own rules, checked 10 Oct 2026. The pack's
 * sections map to these. Every electrical scheme assesses against the IET
 * Electrotechnical Assessment Specification (EAS), so it is the baseline.
 */

export type SchemeId = 'niceic' | 'napit' | 'elecsa' | 'stroma';

export interface SchemeSource {
  label: string;
  url: string;
}

export interface SchemeRequirement {
  /** Pack section it maps to. */
  section:
    | 'Work and certificates'
    | 'Qualified Supervisor'
    | 'Competence'
    | 'Instruments'
    | 'Complaints'
    | 'Insurance'
    | 'Part P'
    | 'Health and safety'
    | 'Reference documents';
  text: string;
  source: string;
}

export interface Scheme {
  id: SchemeId;
  name: string;
  /** How the assessor samples work, in plain words. */
  sampling: string;
  /** Minimum sites the scheme asks to see at a surveillance visit. */
  minSites: number;
  /** Days to notify Part P under the scheme's own rules (law: 30). */
  partPDays: number;
  /** Public liability minimum, pounds. */
  plMinimum: number;
  /** Professional indemnity minimum where periodic inspection is done. */
  piMinimumWithEicr: number;
  verified: boolean;
  note?: string;
  requirements: SchemeRequirement[];
  sources: SchemeSource[];
}

export const EAS_SOURCE: SchemeSource = {
  label: 'IET Electrotechnical Assessment Specification, June 2026',
  url: 'https://electrical.theiet.org/media/qetbddje/eas-26-027-june-2026.pdf',
};

const EAS_REQUIREMENTS: SchemeRequirement[] = [
  {
    section: 'Work and certificates',
    text: 'Work completed within about 12 months, or in progress, representative of what you do, picked at random by the scheme. A record of all work over at least the last 6 years, with certificates and reports.',
    source: 'EAS 15.1, 15.5.3, 15.5.4',
  },
  {
    section: 'Qualified Supervisor',
    text: 'At least one Qualified Supervisor with day-to-day responsibility for safety, quality and technical standard, holding a BS 7671 qualification current within two years of a change to BS 7671.',
    source: 'EAS 11.3, 11.11, 11.15',
  },
  {
    section: 'Competence',
    text: 'Records showing every employed person is competent or adequately supervised.',
    source: 'EAS 16.1.3',
  },
  {
    section: 'Instruments',
    text: 'Test instruments with a record of their ongoing accuracy. Hired instruments with the hire record and confirmation of calibration.',
    source: 'EAS 9.3, 15.5.2, Appendix 3',
  },
  {
    section: 'Complaints',
    text: 'A record of all complaints over the previous 6 years and the action taken.',
    source: 'EAS 15.5.7',
  },
  {
    section: 'Insurance',
    text: 'At least £2 million public liability, and £250,000 professional indemnity where you do periodic inspection and testing.',
    source: 'EAS 12.1, 12.2, 15.5.6',
  },
  {
    section: 'Health and safety',
    text: 'A written health and safety policy statement, and risk assessments carried out.',
    source: 'EAS 15.5.8',
  },
  {
    section: 'Reference documents',
    text: 'The current BS 7671, HSR25 (Electricity at Work Regulations guidance), GS38 and the Building Regulations Approved Documents.',
    source: 'EAS 15.5.1, Appendix 2',
  },
  {
    section: 'Part P',
    text: 'Notifiable work in a home certified to the building control authority, and the occupier given the certificate, within 30 days of completion.',
    source: 'Building Regulations 2010 reg 20(3)',
  },
];

const NICEIC_SOURCES: SchemeSource[] = [
  {
    label: 'NICEIC Approved Contractor Scheme Rules',
    url: 'https://niceic.com/getmedia/4a3e6d39-6835-45f4-8f06-927075e9719f/AC-Scheme-Rules.pdf',
  },
  {
    label: 'NICEIC Domestic Installer Scheme Rules',
    url: 'https://niceic.com/getmedia/4379bc7c-7ce7-44e6-b78d-6061df61bfbf/DIS-Scheme-Rules.pdf',
  },
  {
    label: 'NICEIC: Your assessment',
    url: 'https://niceic.com/for-the-trades-1/professional-standards/your-assessment/',
  },
  {
    label: 'NICEIC Electrical Surveillance Guide',
    url: 'https://niceic.com/getmedia/e781921f-28d2-4e65-8dc2-d31ae28d513d/Electrical-Surveillance-Guide.pdf',
  },
  EAS_SOURCE,
];

const NICEIC_REQUIREMENTS: SchemeRequirement[] = [
  {
    section: 'Work and certificates',
    text: 'A list of all electrical work completed since the last assessment and all work in progress, with the certificates, reports and evidence of Building Regulation compliance issued.',
    source: 'AC and DIS Scheme Rules 12.3(a) to (d)',
  },
  {
    section: 'Complaints',
    text: 'A copy of your complaints log and complaints procedure. Complaints kept for at least 6 years with the corrective action taken.',
    source: 'AC 12.3(f), 6.1(h)',
  },
  {
    section: 'Competence',
    text: 'Evidence of competency for everyone involved, and CPD records for all employed persons, including agency and subcontracted workers.',
    source: 'AC 12.3(g), 5.2(j); Your assessment',
  },
  {
    section: 'Qualified Supervisor',
    text: 'Each QS being assessed is present throughout. The QS monitors everyone doing electrical work, with records of qualifications, training and CPD, and shows how the supervision ratio is set.',
    source: 'AC 12.5, 5.2(j), 5.2(k)',
  },
  {
    section: 'Instruments',
    text: 'Test instruments suited to the work, held or hired (not borrowed), with records of their ongoing accuracy. Record the values you measured, not just a tick.',
    source: 'AC 6.1(g); Your assessment',
  },
  {
    section: 'Insurance',
    text: 'At least £2 million public liability. At least £250,000 professional indemnity if you do periodic inspection and testing. Without compliant public liability the site assessments cannot go ahead.',
    source: 'AC 6.1(j); Your assessment',
  },
  {
    section: 'Part P',
    text: 'Building Regulation compliance certificates issued to the right people within 30 days of completion.',
    source: 'AC 5.2(l); DIS 6.1(e)',
  },
  {
    section: 'Health and safety',
    text: 'A documented health and safety policy statement and risk assessments, whatever the size of the business.',
    source: 'AC 6.1(i); Your assessment',
  },
  {
    section: 'Reference documents',
    text: 'The current BS 7671 with amendments, HSR25, GS38 and the Approved Documents, plus the IET Codes of Practice for EV charging, solar PV and battery work if you do it.',
    source: 'Your assessment',
  },
];

export const SCHEMES: Scheme[] = [
  {
    id: 'niceic',
    name: 'NICEIC',
    sampling:
      'The assessor picks a sample reflecting the range and scale of your work from the last 12 months. Approved Contractors make at least three sites available (one job in progress may be looked at); Domestic Installers at least one, each with a completed EIC.',
    minSites: 3,
    partPDays: 30,
    plMinimum: 2_000_000,
    piMinimumWithEicr: 250_000,
    verified: true,
    requirements: NICEIC_REQUIREMENTS,
    sources: NICEIC_SOURCES,
  },
  {
    id: 'napit',
    name: 'NAPIT',
    sampling:
      'Usually an annual visit within a 4-month window of your certification date. Make suitable installation work available to show you and your employees work to BS 7671; the sample is picked at random and representative of your work (EAS 15.1).',
    minSites: 1,
    partPDays: 21,
    plMinimum: 2_000_000,
    piMinimumWithEicr: 250_000,
    verified: true,
    requirements: [
      {
        section: 'Work and certificates',
        text: 'Suitable installation work made available to show you and your employees comply with BS 7671.',
        source: 'NAPIT EAS application',
      },
      {
        section: 'Instruments',
        text: 'An up-to-date calibration certificate for each instrument.',
        source: 'NAPIT EAS application',
      },
      {
        section: 'Complaints',
        text: 'A fair and quick complaint handling process, and a record of every complaint received, available to NAPIT on request.',
        source: 'NAPIT Installer Scheme Rules 5.15',
      },
      {
        section: 'Insurance',
        text: 'At least £2 million public liability; at least £250,000 professional indemnity for periodic inspection and testing. Some schemes also ask for employers’ liability.',
        source: 'NAPIT Installer Scheme Rules 10.5',
      },
      {
        section: 'Part P',
        text: 'Notifications made to NAPIT within 21 days of the installation date. The legal limit is 30 days.',
        source: 'NAPIT Installer Scheme Rules 11.5',
      },
      {
        section: 'Competence',
        text: 'The competence of each technically competent individual kept up to date, with CPD where the scheme asks for it.',
        source: 'NAPIT Installer Scheme Rules 9.3',
      },
      ...EAS_REQUIREMENTS.filter((r) =>
        ['Qualified Supervisor', 'Health and safety', 'Reference documents'].includes(r.section)
      ),
    ],
    sources: [
      {
        label: 'NAPIT Installer Scheme Rules v2.0 (04.26)',
        url: 'https://www.napit.org.uk/downloads/SchemeRules/(NAP-REQ-010)-NAPIT-Installer-Scheme-Rules-v2.0-(04.26).pdf',
      },
      {
        label: 'NAPIT EAS application',
        url: 'https://www.napit.org.uk/join-us/trade/EAS-Initial-Application/',
      },
      EAS_SOURCE,
    ],
  },
  {
    id: 'elecsa',
    name: 'ELECSA',
    sampling:
      'ELECSA is run by Certsure alongside NICEIC and its website now goes to NICEIC, so we follow the NICEIC rules: a sample reflecting your range of work from the last 12 months.',
    minSites: 1,
    partPDays: 30,
    plMinimum: 2_000_000,
    piMinimumWithEicr: 250_000,
    verified: false,
    note: 'elecsa.co.uk redirects to niceic.com and no separate ELECSA rules are published, so this uses the NICEIC rules and the IET EAS.',
    requirements: NICEIC_REQUIREMENTS,
    sources: NICEIC_SOURCES,
  },
  {
    id: 'stroma',
    name: 'Stroma',
    sampling:
      'We could not read Stroma’s own rules, so this follows the IET EAS: work from about the last 12 months, representative of what you do, picked at random.',
    minSites: 1,
    partPDays: 30,
    plMinimum: 2_000_000,
    piMinimumWithEicr: 250_000,
    verified: false,
    note: 'Stroma Certification’s site could not be reached on 10 Oct 2026. Check its scheme rules before the visit.',
    requirements: EAS_REQUIREMENTS,
    sources: [EAS_SOURCE],
  },
];

export const schemeFor = (registration?: string | null): SchemeId => {
  const r = (registration ?? '').toLowerCase();
  if (r.includes('napit')) return 'napit';
  if (r.includes('elecsa')) return 'elecsa';
  if (r.includes('stroma')) return 'stroma';
  return 'niceic';
};

export const getScheme = (id: SchemeId) => SCHEMES.find((s) => s.id === id) ?? SCHEMES[0];

/** Certificate types an assessor samples (installation work and reports). */
export const SAMPLE_TYPES = ['eic', 'eicr', 'minor-works', 'ev-charging', 'solar-pv', 'bess'];

export const TYPE_LABEL: Record<string, string> = {
  eic: 'EIC',
  eicr: 'EICR',
  'minor-works': 'Minor Works',
  'ev-charging': 'EV charge point',
  'solar-pv': 'Solar PV',
  bess: 'Battery storage',
};

export const typeLabel = (t: string) =>
  TYPE_LABEL[t] ?? t.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
