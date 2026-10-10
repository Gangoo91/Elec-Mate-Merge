/**
 * Study Centre courses a firm can assign to a team member (ELE-1834).
 *
 * `key` is the course's final mock paper (`examId` in its mock exam config).
 * Passing that paper in the app writes an `in_app` row to seo_mock_attempts,
 * and that row is what closes the assignment server-side — so the key MUST
 * match the paper's examId exactly.
 *
 * `paperRoute` opens that final paper directly (the worker's "Final paper"
 * button), so nobody has to hunt for it inside the course.
 *
 * `progressKey` is the `course_key` the Study Centre tracker records for the
 * course's sections (course_progress), used for "3 sections opened".
 *
 * `credentialKey` is the competence-matrix column the course relates to
 * (utils/competenceMatrix.ts CANONICAL keys). A Study Centre course is CPD, not
 * the awarding-body qualification: the matrix shows it beside that column, it
 * never marks the person as holding the credential.
 */
export interface AssignableCourse {
  key: string;
  title: string;
  description: string;
  route: string;
  /** The final mock paper: passing it is what closes the assignment. */
  paperRoute: string;
  progressKey: string;
  credentialKey: string | null;
  group: 'Electrical' | 'Site safety';
}

const UP = '/study-centre/upskilling';
const GEN = '/study-centre/general-upskilling';

export const ASSIGNABLE_COURSES: AssignableCourse[] = [
  {
    key: 'bs7671',
    title: '18th Edition (BS 7671)',
    description: 'BS 7671:2018 wiring regulations and electrical safety requirements.',
    route: `${UP}/bs7671-course`,
    paperRoute: `${UP}/bs7671-mock-exam`,
    progressKey: 'bs7671',
    credentialKey: '18th',
    group: 'Electrical',
  },
  {
    key: 'inspection-testing',
    title: 'Inspection and testing',
    description: 'Electrical inspection, testing and certification procedures.',
    route: `${UP}/inspection-testing`,
    paperRoute: `${UP}/inspection-testing-mock-exam`,
    progressKey: 'inspection-testing',
    credentialKey: '2391',
    group: 'Electrical',
  },
  {
    key: 'ev-charging',
    title: 'EV charging',
    description: 'EV charging installation, maintenance and safety.',
    route: `${UP}/ev-charging-course`,
    paperRoute: `${UP}/ev-charging-mock-exam`,
    progressKey: 'ev-charging',
    credentialKey: 'ev',
    group: 'Electrical',
  },
  {
    key: 'renewable-energy',
    title: 'Renewable energy',
    description: 'Solar, wind and battery storage installation and maintenance.',
    route: `${UP}/renewable-energy-course`,
    paperRoute: `${UP}/renewable-energy-mock-exam`,
    progressKey: 'renewable-energy',
    credentialKey: 'solar',
    group: 'Electrical',
  },
  {
    key: 'pat-testing',
    title: 'PAT testing',
    description: 'Portable appliance testing procedures and record keeping.',
    route: `${UP}/pat-testing-course`,
    paperRoute: `${UP}/pat-testing-mock-exam`,
    progressKey: 'pat-testing',
    credentialKey: 'pat',
    group: 'Electrical',
  },
  {
    key: 'fire-alarm',
    title: 'Fire alarm systems',
    description: 'Fire detection and alarm design, installation and commissioning.',
    route: `${UP}/fire-alarm-course`,
    paperRoute: `${UP}/fire-alarm-course/mock-exam`,
    progressKey: 'fire-alarm-course',
    credentialKey: null,
    group: 'Electrical',
  },
  {
    key: 'emergency-lighting',
    title: 'Emergency lighting',
    description: 'Emergency lighting design, testing schedules and BS 5266.',
    route: `${UP}/emergency-lighting-course`,
    paperRoute: `${UP}/emergency-lighting-mock-exam`,
    progressKey: 'emergency-lighting',
    credentialKey: null,
    group: 'Electrical',
  },
  {
    key: 'data-cabling',
    title: 'Data and comms cabling',
    description: 'Structured cabling, fibre and network infrastructure.',
    route: `${UP}/data-cabling-course`,
    paperRoute: `${UP}/data-cabling-mock-exam`,
    progressKey: 'data-cabling',
    credentialKey: null,
    group: 'Electrical',
  },
  {
    key: 'first-aid-at-work',
    title: 'First aid at work',
    description: 'Workplace first aid, CPR and emergency response.',
    route: `${GEN}/first-aid-course`,
    paperRoute: `${GEN}/first-aid-mock-exam`,
    progressKey: 'first-aid',
    credentialKey: 'firstaid',
    group: 'Site safety',
  },
  {
    key: 'asbestos-awareness',
    title: 'Asbestos awareness',
    description: 'Spotting asbestos-containing materials and working safely around them.',
    route: `${GEN}/asbestos-awareness-course`,
    paperRoute: `${GEN}/asbestos-awareness-mock-exam`,
    progressKey: 'asbestos-awareness',
    credentialKey: 'asbestos',
    group: 'Site safety',
  },
  {
    key: 'working-at-height',
    title: 'Working at height',
    description: 'Risk assessment, fall prevention and safe practice at height.',
    route: `${GEN}/working-at-height-course`,
    paperRoute: `${GEN}/working-at-height-mock-exam`,
    progressKey: 'working-at-height',
    credentialKey: 'height',
    group: 'Site safety',
  },
  {
    key: 'manual-handling',
    title: 'Manual handling',
    description: 'Safe lifting, risk assessment and injury prevention on site.',
    route: `${GEN}/manual-handling-course`,
    paperRoute: `${GEN}/manual-handling-mock-exam`,
    progressKey: 'manual-handling',
    credentialKey: 'manual',
    group: 'Site safety',
  },
  {
    key: 'mewp-operator',
    title: 'MEWP operator',
    description: 'Mobile elevating work platform operation and pre-use checks.',
    route: `${GEN}/mewp-course`,
    paperRoute: `${GEN}/mewp-mock-exam`,
    progressKey: 'mewp',
    credentialKey: 'ipaf',
    group: 'Site safety',
  },
  {
    key: 'pasma-towers',
    title: 'PASMA towers for users',
    description: 'Mobile access towers: assembly, use and inspection.',
    route: `${GEN}/pasma-course`,
    paperRoute: `${GEN}/pasma-mock-exam`,
    progressKey: 'pasma',
    credentialKey: 'pasma',
    group: 'Site safety',
  },
  {
    key: 'fire-safety',
    title: 'Fire safety and fire marshal',
    description: 'Fire prevention, evacuation and fire marshal duties.',
    route: `${GEN}/fire-safety-course`,
    paperRoute: `${GEN}/fire-safety-mock-exam`,
    progressKey: 'fire-safety',
    credentialKey: 'fire',
    group: 'Site safety',
  },
  {
    key: 'coshh-awareness',
    title: 'COSHH awareness',
    description: 'Identifying and handling substances hazardous to health.',
    route: `${GEN}/coshh-awareness-course`,
    paperRoute: `${GEN}/coshh-awareness-mock-exam`,
    progressKey: 'coshh-awareness',
    credentialKey: null,
    group: 'Site safety',
  },
  {
    key: 'confined-spaces',
    title: 'Confined spaces awareness',
    description: 'Hazards and safe entry procedures for confined spaces.',
    route: `${GEN}/confined-spaces-course`,
    paperRoute: `${GEN}/confined-spaces-mock-exam`,
    progressKey: 'confined-spaces',
    credentialKey: null,
    group: 'Site safety',
  },
  {
    key: 'cscs-card',
    title: 'CSCS card preparation',
    description: 'Health, safety and environment test preparation.',
    route: `${GEN}/cscs-card-course`,
    paperRoute: `${GEN}/cscs-card-mock-exam`,
    progressKey: 'cscs-card',
    credentialKey: null,
    group: 'Site safety',
  },
];

export const courseByKey = (key: string | null | undefined): AssignableCourse | undefined =>
  ASSIGNABLE_COURSES.find((c) => c.key === key);

/** The course that helps with a matrix column ('18th', '2391', 'firstaid' …), if any. */
export const courseForCredential = (credentialKey: string | null | undefined) =>
  credentialKey ? ASSIGNABLE_COURSES.find((c) => c.credentialKey === credentialKey) : undefined;

/** The course a Study Centre training record came from, by its title
 *  ("Study Centre: Renewable energy" → renewable-energy). */
export const courseForRecordName = (name: string | null | undefined) => {
  const t = (name ?? '')
    .replace(/^Study Centre:\s*/i, '')
    .replace(/\s*\(Study Centre course\)\s*$/i, '')
    .trim()
    .toLowerCase();
  return t ? ASSIGNABLE_COURSES.find((c) => c.title.toLowerCase() === t) : undefined;
};
