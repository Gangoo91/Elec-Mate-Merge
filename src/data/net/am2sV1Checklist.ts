/**
 * NET's AM2S v1 Candidate Checklist — the structure and wording of NET's own
 * form, transcribed for ELE-2050. NOT Elec-Mate content: every string marked
 * NET below is NET's, word for word, from:
 *
 *   "Readiness for Assessment: Candidate Self-Assessment Checklist, AM2S v1.
 *    For apprentices registered on the Electrotechnical Apprenticeship
 *    Standard in England (1.1, 1.2) from Sept 2023". December 2025 (25.12).
 *   https://www.netservices.org.uk/wp-content/uploads/2025/11/NET-AM2S-v1-Candidate-Checklist-25-12-WE2.pdf
 *   (linked from https://www.netservices.org.uk/am2s-v1/, read 10 Oct 2026)
 *
 * A copy of that PDF, unaltered, is served at FORM_PDF_PATH so the export can
 * fill NET's own form rather than a look-alike. If NET publishes a new
 * version, this file, the PDF and _net_am2s_keys() in the database change
 * together (the export checks the PDF's field count before filling it).
 *
 * The item keys (A1.1 … E.7) are ours, numbered in the form's order; the
 * same 53 keys are in the database function _net_am2s_keys().
 */

export const NET_AM2S_FORM = {
  name: 'AM2S v1 Candidate Checklist',
  version: '25.12',
  published: 'December 2025',
  sourceUrl:
    'https://www.netservices.org.uk/wp-content/uploads/2025/11/NET-AM2S-v1-Candidate-Checklist-25-12-WE2.pdf',
  pageUrl: 'https://www.netservices.org.uk/am2s-v1/',
  bookingUrl: 'https://www.netservices.org.uk/booking-and-admin-help/',
} as const;

/** NET's PDF, unaltered, served with the app. */
export const FORM_PDF_PATH = '/forms/net/NET-AM2S-v1-Candidate-Checklist-25-12.pdf';

export type Rating = 'limited' | 'adequate' | 'extensive' | 'unsure';

/** NET's four tick boxes, in the form's order (left to right). */
export const RATINGS: { value: Rating; label: string }[] = [
  { value: 'limited', label: 'Limited' },
  { value: 'adequate', label: 'Adequate' },
  { value: 'extensive', label: 'Extensive' },
  { value: 'unsure', label: 'Unsure' },
];

export interface ChecklistItem {
  key: string;
  /** NET's wording for the row. */
  text: string;
  /** A heading row NET prints above some items (Section B), with no ticks of its own. */
  before?: string;
}

export interface ChecklistSection {
  key: 'A1' | 'A2' | 'B' | 'C' | 'D' | 'E';
  /** NET's section heading, with its time. */
  title: string;
  /** NET's line under the heading. */
  intro: string;
  items: ChecklistItem[];
}

const items = (prefix: string, texts: Array<string | { text: string; before: string }>) =>
  texts.map((t, i) => ({
    key: `${prefix}.${i + 1}`,
    ...(typeof t === 'string' ? { text: t } : t),
  }));

/** NET — sections A1 to E, items in the form's order. */
export const SECTIONS: ChecklistSection[] = [
  {
    key: 'A1',
    title: 'Section A1: Safe Isolation, Risk Assessment and Planning (1 hour)',
    intro: 'To demonstrate occupational competence, apprentices will be expected to:',
    items: items('A1', [
      'Carry out and document an assessment of risk',
      'Carry out safe isolation in the correct sequence taking any secondary supplies into account',
      'Formulate and document a plan of work',
    ]),
  },
  {
    key: 'A2',
    title: 'Sections A2-A6: Composite Installation (10.5 hours)',
    intro:
      'This section has areas where apprentices will need to demonstrate occupational competence in accordance with statutory and non-statutory regulations and approved industry working practices.',
    items: items('A2', [
      'Interpretation of specifications and technical data',
      'Selection of protective devices',
      'Install protective equipotential bonding',
      'Install and terminate PVC singles cable',
      'Install and terminate PVC/PVC multi-core & cpc cable',
      'Install and terminate SY multi-flex cable',
      'Install and terminate heat-resistant flex',
      'Install and terminate XLPE SWA',
      'Install and terminate data-cable',
      'Install and terminate FP200 type cable',
      'Install and terminate non-armoured ultra flex cable with data',
      'Form and install metal conduit systems',
      'Form and install PVC conduit systems',
      'Install protective devices in a TP&N distribution board',
      'Install a two-way and intermediate lighting circuit, including an emergency light supply',
      'Install a BS 1363 13A socket outlet ring circuit',
      'Install a detector safety service circuit',
      'Install data outlets to appropriate circuits',
      'Install a 32A TP & N supply',
      'Install protective equipotential bonding to incoming services',
      'Connect a 3-phase direct on line motor circuit with remote stop/start function',
      'Install a smart technology central heating and hot water system',
    ]),
  },
  {
    key: 'B',
    title: 'Section B: Inspection, Testing and Certification (3.5 hours)',
    intro:
      'In this area apprentices will be expected to follow practices and procedures that take into account electrically sensitive equipment. To demonstrate occupational competence, apprentices will be expected to:',
    items: items('B', [
      'Work according to best practice as required by Health and Safety legislation',
      'Ensure the installation is correctly isolated before commencing the inspection and test activity',
      'Carry out a visual inspection of the installation in accordance with BS 7671 and IET Guidance Note 3',
      {
        before:
          'Complete the following tests on the installation in accordance with BS 7671 and IET Guidance Note 3:',
        text: 'Continuity of protective conductors',
      },
      'Continuity of ring final circuit conductors',
      'Insulation resistance',
      'Polarity',
      'Earth fault-loop impedance (EFLI)',
      'Prospective fault current (PFC)',
      'Check for phase sequence and phase rotation',
      'Functional testing',
      'Verify that the test results obtained conform to the values required by BS 7671 and IET Guidance Note 3',
      'Complete an electrical installation certificate, schedule of inspections and schedule of test results using the model forms as illustrated in Appendix 6 of BS 7671',
    ]),
  },
  {
    key: 'C',
    title: 'Section C: Safe Isolation of Circuits (30 minutes)',
    intro: 'To demonstrate occupational competence, apprentices will be expected to:',
    items: items('C', [
      'Carry out safe isolation in the correct sequence on a single-phase circuit',
      'Carry out safe isolation in the correct sequence on a three-phase circuit',
      'Carry out safe isolation in the correct sequence on a three-phase installation',
    ]),
  },
  {
    key: 'D',
    title: 'Section D: Fault Diagnosis and Rectification (2 hours)',
    intro: 'To demonstrate occupational competence, apprentices will be expected to:',
    items: items('D', [
      'Work according to best practice as required by Health and Safety legislation',
      'Correctly identify and use tools, equipment and test instruments that are fit for purpose',
      'Carry out checks and preparations that must be completed prior to undertaking fault diagnosis',
      'Identify faults from ’fault symptom’ information given by the assessor',
      'Record how the identified faults can be rectified',
    ]),
  },
  {
    key: 'E',
    title: 'Section E: Assessment of Applied Knowledge (1.5 hours)',
    intro:
      'This assessment will last for 1.5 hours and be in the form of a computerised multiple-choice test. Apprentices will be expected to answer 45 questions and will be assessed on their application of knowledge associated with:',
    items: items('E', [
      'Health and Safety',
      'BS 7671: Requirements for Electrical Installations',
      'Building Regulations',
      'Inspection and Testing',
      'Fault Diagnosis and Rectification',
      'Installation Practices',
      'Design and Planning',
    ]),
  },
];

export const ALL_ITEMS: ChecklistItem[] = SECTIONS.flatMap((s) => s.items);

/** NET — "Using this Checklist". */
export const NET_USING_THIS_CHECKLIST =
  'Please work through Sections A to E in this document and tick the boxes that best suit the apprentice’s knowledge and experience in each area. Remember that they are unlikely to be sufficiently prepared to pass the assessment if they cannot confidently tick at least “Adequate” for every statement in terms of both Knowledge and Practical Experience.';

/** NET — on gaps. */
export const NET_ACTION_PLAN =
  'If there are areas of concern, an action plan should be produced to help the apprentice achieve the required standard before submitting the gateway application.';

/** NET — the instruction above each section's grid. */
export const NET_TICK_INSTRUCTION =
  'For each item please tick one box in the Knowledge section and one box in the Experience section';

/** NET — "Important" box above the declarations. */
export const NET_IMPORTANT =
  'All apprentices must take an independent assessment at the end of their training to confirm that they have achieved occupational competence. This is a formal declaration to confirm readiness of the apprentice for Apprenticeship Assessment. It must only be completed when each person signing is fully satisfied that all requirements are complied with. It is a breach of apprenticeship funding rules for this checklist to be signed before the apprentice is ready for assessment, or for any third party to sign instead of the employer.';

/** NET — under each signature. */
export const NET_SIX_MONTHS =
  'NET will only accept dated signatures within 6 months of the gateway application.';

/** NET — "Submitting this Checklist". */
export const NET_SUBMITTING =
  'Once you have completed and signed the checklist please submit it to your chosen assessment centre for gateway to completion approval. Checklists sent to the NET head office will not be reviewed and will be destroyed in line with our data protection and privacy policy. Please ensure the whole document is submitted. Documents with missing pages will not be accepted.';

/** NET — booking page: what must be submitted as part of the gateway check. */
export const NET_MANDATORY_EVIDENCE = [
  'The mandatory AM2S v1 Candidate Checklist',
  'The technical qualifications: City & Guilds 601/6299-5 (5357-23 or 5357-94) or EAL 601/7345/2 (v1.1)',
  'Maths & English Level 2 (if the learner is 19 or under at the start of their apprenticeship)',
];

/** NET — the completion certificate box (England, training provider use). */
export const NET_CERT_DELIVERY =
  'On successful completion of the AM2S, apprentices will receive two certificates: the AM2S certificate sent from NET directly to the apprentice, and a government-issued Apprenticeship Completion certificate.';

export const sectionOf = (key: string) => SECTIONS.find((s) => key.startsWith(`${s.key}.`));
