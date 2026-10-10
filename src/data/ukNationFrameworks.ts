/**
 * The four UK nations' electrical apprenticeship STRUCTURES (ELE-1976).
 *
 * Structure only: which body sets the programme, what it is called, how its
 * hours are counted, what the end assessment is called, and where that is
 * published. No units, criteria, outcomes or teaching content: those come
 * from the awarding body's qualification in the catalogue, never from here.
 *
 * Each nation counts duration differently, and the end assessments are
 * different assessments: never merge AM2, AM2S, AM2D and FICA into one.
 *
 * Sources (fetched 8 and 10 Oct 2026):
 *   England  ST0152 v1.2, Skills England; OTJ hours from DfE Annex C (src/data/otjStandards.ts)
 *            https://skillsengland.education.gov.uk/apprenticeships/st0152-v1-2
 *            https://www.gov.uk/government/publications/apprenticeship-funding-rules-2025-to-2026
 *   Scotland SJIB FICA: https://www.sjib.org.uk/assessments-of-competence/about-fica/
 *            SECTT stages, SVQ SCQF 7, FICA after at least 3 years, within 5:
 *            https://www.sectt.org.uk/the-process/
 *   Wales    ACW framework FR05055 Electrotechnical Installation (Level 3), AM2S.
 *            Minimum hours as reported from the 2022 framework document; confirm
 *            against the current issue (a new Welsh apprenticeship programme is
 *            planned from August 2027).
 *            https://acwcerts.co.uk/
 *   NI       nidirect "Electrotechnical Level 3 apprenticeship framework": EAL
 *            601/7345/2 or City & Guilds 601/6299/5 (competence), AM2S, duration
 *            agreed between apprentice, training contractor and employer.
 *            https://www.nidirect.gov.uk/articles/electrotechnical-level-3-apprenticeship-framework
 */

import { OTJ_STANDARDS } from '@/data/otjStandards';

export type UkNation = 'england' | 'wales' | 'scotland' | 'northern_ireland';

/** How a programme's training time is set. */
export type HoursModel =
  /** England from Aug 2025: a fixed total of off-the-job hours per standard (Annex C). */
  | 'otj_total'
  /** Wales: framework minimums for on-the-job AND off-the-job hours. */
  | 'fixed_on_off'
  /** Scotland: staged college blocks and site experience over at least three years. */
  | 'stages'
  /** Northern Ireland: duration agreed between apprentice, training contractor and employer. */
  | 'agreed';

export type ProgrammeKind = 'standard' | 'framework' | 'modern_apprenticeship';

export interface NationTerms {
  /** "England", "Wales"… */
  name: string;
  /** What a programme is called there. */
  programme: string;
  /** Label for the programme picker. */
  programmePicker: string;
  /** Who sets it. */
  body: string;
  /** Who funds it. */
  funder: string;
  /** What the off-site learning time is called in the hub. */
  offJob: string;
  /** What the final assessment is called. */
  endAssessment: string;
  /** What the point of being put forward for it is called. */
  readiness: string;
  /** One line on how hours work there. */
  hoursLine: string;
  hoursModel: HoursModel;
}

export const NATION_TERMS: Record<UkNation, NationTerms> = {
  england: {
    name: 'England',
    programme: 'apprenticeship standard',
    programmePicker: 'Apprenticeship standard',
    body: 'Skills England',
    funder: 'Department for Education',
    offJob: 'off-the-job training',
    endAssessment: 'end-point assessment',
    readiness: 'gateway',
    hoursLine:
      'Each standard carries a fixed total of off-the-job hours (DfE Annex C, starts from August 2025).',
    hoursModel: 'otj_total',
  },
  wales: {
    name: 'Wales',
    programme: 'apprenticeship framework',
    programmePicker: 'Apprenticeship framework',
    body: 'Apprenticeship Certification Wales (ACW)',
    funder: 'Medr',
    offJob: 'off-the-job training',
    endAssessment: 'AM2S',
    readiness: 'readiness for assessment',
    hoursLine: 'The framework sets minimum on-the-job and off-the-job hours, not a percentage.',
    hoursModel: 'fixed_on_off',
  },
  scotland: {
    name: 'Scotland',
    programme: 'Modern Apprenticeship',
    programmePicker: 'Modern Apprenticeship',
    body: 'SJIB, administered by SECTT',
    funder: 'Skills Development Scotland',
    offJob: 'college and off-site training',
    endAssessment: 'FICA',
    readiness: 'eligibility for FICA',
    hoursLine:
      'Training runs in stages of college blocks and site experience; FICA after at least three years, within five.',
    hoursModel: 'stages',
  },
  northern_ireland: {
    name: 'Northern Ireland',
    programme: 'ApprenticeshipsNI framework',
    programmePicker: 'Apprenticeship framework',
    body: 'Department for the Economy (ApprenticeshipsNI)',
    funder: 'Department for the Economy',
    offJob: 'off-the-job training',
    endAssessment: 'AM2S',
    readiness: 'readiness for assessment',
    hoursLine: 'Duration is agreed between the apprentice, training contractor and employer.',
    hoursModel: 'agreed',
  },
};

export const UK_NATIONS: UkNation[] = ['england', 'wales', 'scotland', 'northern_ireland'];

export interface NationProgramme {
  nation: UkNation;
  kind: ProgrammeKind;
  /** The code the setting body uses (ST0152, FR05055…), or a stable key where none is published. */
  code: string;
  /** The programme's published name. */
  title: string;
  level: string;
  hoursModel: HoursModel;
  /** Off-the-job (or off-site) hours the programme sets, where it sets a number. */
  offJobHours: number | null;
  /** On-the-job hours the programme sets, where it sets a number (Wales). */
  onJobHours: number | null;
  /** The end assessment's own name. */
  endAssessment: string;
  /** Qualification codes the published structure names (identifiers only). */
  qualificationCodes: string[];
  source: string;
  /** Anything in the entry not confirmed against the primary page. */
  check?: string;
}

const ENGLAND: NationProgramme[] = OTJ_STANDARDS.map((s) => ({
  nation: 'england',
  kind: 'standard',
  code: s.code,
  title: s.name,
  level: `Level ${s.level}`,
  hoursModel: 'otj_total',
  offJobHours: s.otjHours,
  onJobHours: null,
  // ST0152's end-point assessment is NET's AM2 (AM2S for apprentices registered
  // from Sept 2023); ST1017 uses AM2D. Others: as their assessment plan says.
  endAssessment:
    s.code === 'ST0152'
      ? 'End-point assessment (AM2 / AM2S)'
      : s.code === 'ST1017'
        ? 'End-point assessment (AM2D)'
        : 'End-point assessment',
  qualificationCodes: [],
  source: 'https://www.gov.uk/government/publications/apprenticeship-funding-rules-2025-to-2026',
}));

export const NATION_PROGRAMMES: NationProgramme[] = [
  ...ENGLAND,
  {
    nation: 'wales',
    kind: 'framework',
    code: 'FR05055',
    title: 'Electrotechnical Installation',
    level: 'Level 3',
    hoursModel: 'fixed_on_off',
    offJobHours: 1332,
    onJobHours: 6660,
    endAssessment: 'AM2S',
    qualificationCodes: ['C00/4278/8'],
    source: 'https://acwcerts.co.uk/',
    check:
      'Hours as reported from the 2022 framework document. Confirm against the current ACW issue.',
  },
  {
    nation: 'scotland',
    kind: 'modern_apprenticeship',
    code: 'SCO-MA-ELEC-INST',
    title:
      'Modern Apprenticeship in Electrical Installation (SVQ in Electrical Installation, SCQF Level 7)',
    level: 'SCQF Level 7',
    hoursModel: 'stages',
    offJobHours: null,
    onJobHours: null,
    endAssessment: 'Final Integrated Competence Assessment (FICA)',
    qualificationCodes: [],
    source: 'https://www.sectt.org.uk/the-process/',
    check: 'SQA award code not confirmed; add it from the SQA page before relying on it.',
  },
  {
    nation: 'northern_ireland',
    kind: 'framework',
    code: 'NI-ELECTROTECHNICAL-L3',
    title: 'Electrotechnical Level 3 Apprenticeship Framework',
    level: 'Level 3',
    hoursModel: 'agreed',
    offJobHours: null,
    onJobHours: null,
    endAssessment: 'AM2S',
    qualificationCodes: ['601/7345/2', '601/6299/5', '600/4282/5', '600/0665/1'],
    source:
      'https://www.nidirect.gov.uk/articles/electrotechnical-level-3-apprenticeship-framework',
  },
];

export function programmesFor(nation: UkNation): NationProgramme[] {
  return NATION_PROGRAMMES.filter((p) => p.nation === nation);
}

export function getProgramme(code: string | null | undefined): NationProgramme | undefined {
  return code ? NATION_PROGRAMMES.find((p) => p.code === code) : undefined;
}

export function termsFor(nation: string | null | undefined): NationTerms {
  return NATION_TERMS[(nation as UkNation) in NATION_TERMS ? (nation as UkNation) : 'england'];
}

/** A short line for a programme's hours, in that nation's terms. */
export function hoursSummary(p: NationProgramme): string {
  switch (p.hoursModel) {
    case 'otj_total':
      return `${p.offJobHours} off-the-job hours`;
    case 'fixed_on_off':
      return `at least ${p.onJobHours?.toLocaleString('en-GB')} on-the-job and ${p.offJobHours?.toLocaleString('en-GB')} off-the-job hours`;
    case 'stages':
      return 'staged college blocks and site experience';
    case 'agreed':
      return 'duration agreed with the employer';
  }
}
