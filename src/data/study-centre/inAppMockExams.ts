/**
 * Every mock exam that lives INSIDE the app, in one registry.
 *
 * These are the papers built into the Study Centre courses — Level 2 and 3
 * module papers, the AM2 and EPA knowledge tests, and the closing exam of each
 * CPD, safety and personal-development course. They were only ever reachable
 * by opening the parent course and scrolling to its final module, so a learner
 * who wanted "give me a paper to sit" had no way to see what existed.
 *
 * Deliberately NOT the public /mock-exams pages. Those are the free,
 * no-sign-up SEO papers and stay exactly as they are — different audience,
 * different purpose, separate catalogue (src/components/seo/mockExamCatalog.ts).
 *
 * No question counts here on purpose. The in-app papers draw a randomised
 * selection from their course bank at run time rather than declaring a fixed
 * length, so any number printed on a card would be decoration rather than
 * fact. The course name is the useful label, and it is the one thing a learner
 * choosing a paper actually needs.
 */

export type MockExamTrack = 'apprentice' | 'cpd' | 'safety' | 'personal';

export interface InAppMockExam {
  id: string;
  /** Paper name as it should read in a list. */
  title: string;
  /** Which course it closes — shown as the card's footer line. */
  course: string;
  /** What it covers. One line, no invented specifics. */
  description: string;
  track: MockExamTrack;
  path: string;
}

export const MOCK_EXAM_TRACKS: {
  id: MockExamTrack;
  label: string;
  blurb: string;
}[] = [
  {
    id: 'apprentice',
    label: 'Apprentice & qualification papers',
    blurb: 'Level 2, Level 3, AM2, HNC, MOET and Functional Skills.',
  },
  {
    id: 'cpd',
    label: 'Professional CPD',
    blurb: 'BS 7671, inspection & testing and the specialist tracks.',
  },
  {
    id: 'safety',
    label: 'Safety & site cards',
    blurb: 'CSCS, IPAF, PASMA and the site-safety certificates.',
  },
  {
    id: 'personal',
    label: 'Personal development',
    blurb: 'Leadership, communication and the soft-skill courses.',
  },
];

const APPRENTICE = '/study-centre/apprentice';
const UPSKILLING = '/study-centre/upskilling';
const GENERAL = '/study-centre/general-upskilling';
const PERSONAL = '/study-centre/personal-development';

export const IN_APP_MOCK_EXAMS: InAppMockExam[] = [
  // ── Level 2 (C&G 2365-02) — mockN draws from module N's bank ────────────
  {
    id: 'l2-m1',
    title: 'Level 2 — Paper 1',
    course: 'Level 2 Electrical Installation',
    description: 'Health and safety in installation.',
    track: 'apprentice',
    path: `${APPRENTICE}/level2/module8/section1/mock1`,
  },
  {
    id: 'l2-m2',
    title: 'Level 2 — Paper 2',
    course: 'Level 2 Electrical Installation',
    description: 'Principles of electrical science.',
    track: 'apprentice',
    path: `${APPRENTICE}/level2/module8/section1/mock2`,
  },
  {
    id: 'l2-m3',
    title: 'Level 2 — Paper 3',
    course: 'Level 2 Electrical Installation',
    description: 'Installation methods and technology.',
    track: 'apprentice',
    path: `${APPRENTICE}/level2/module8/section1/mock3`,
  },
  {
    id: 'l2-m4',
    title: 'Level 2 — Paper 4',
    course: 'Level 2 Electrical Installation',
    description: 'Installing wiring systems and enclosures.',
    track: 'apprentice',
    path: `${APPRENTICE}/level2/module8/section1/mock4`,
  },
  {
    id: 'l2-m5',
    title: 'Level 2 — Paper 5',
    course: 'Level 2 Electrical Installation',
    description: 'Communicating within building services.',
    track: 'apprentice',
    path: `${APPRENTICE}/level2/module8/section1/mock5`,
  },
  {
    id: 'l2-mixed',
    title: 'Level 2 — Full mixed paper',
    course: 'Level 2 Electrical Installation',
    description: 'Every Level 2 topic, drawn at random. The closest to the real thing.',
    track: 'apprentice',
    path: `${APPRENTICE}/level2/module8/section1/mock8`,
  },

  // ── Level 3 (C&G 2365-03) ───────────────────────────────────────────────
  {
    id: 'l3-m1',
    title: 'Level 3 — Paper 1',
    course: 'Level 3 Electrical Installation',
    description: 'Health and safety.',
    track: 'apprentice',
    path: `${APPRENTICE}/level3-module8-mock-exam1`,
  },
  {
    id: 'l3-m2',
    title: 'Level 3 — Paper 2',
    course: 'Level 3 Electrical Installation',
    description: 'Environmental technology systems.',
    track: 'apprentice',
    path: `${APPRENTICE}/level3-module8-mock-exam2`,
  },
  {
    id: 'l3-m3',
    title: 'Level 3 — Paper 3',
    course: 'Level 3 Electrical Installation',
    description: 'Electrical science and principles.',
    track: 'apprentice',
    path: `${APPRENTICE}/level3-module8-mock-exam3`,
  },
  {
    id: 'l3-m4',
    title: 'Level 3 — Paper 4',
    course: 'Level 3 Electrical Installation',
    description: 'Fault diagnosis and rectification.',
    track: 'apprentice',
    path: `${APPRENTICE}/level3-module8-mock-exam4`,
  },
  {
    id: 'l3-m5',
    title: 'Level 3 — Paper 5',
    course: 'Level 3 Electrical Installation',
    description: 'Inspection, testing and commissioning.',
    track: 'apprentice',
    path: `${APPRENTICE}/level3-module8-mock-exam5`,
  },
  {
    id: 'l3-m6',
    title: 'Level 3 — Paper 6',
    course: 'Level 3 Electrical Installation',
    description: 'Electrical systems design.',
    track: 'apprentice',
    path: `${APPRENTICE}/level3-module8-mock-exam6`,
  },
  {
    id: 'l3-m7',
    title: 'Level 3 — Paper 7',
    course: 'Level 3 Electrical Installation',
    description: 'Career awareness and the industry.',
    track: 'apprentice',
    path: `${APPRENTICE}/level3-module8-mock-exam7`,
  },
  {
    id: 'l3-mixed',
    title: 'Level 3 — Full mixed paper',
    course: 'Level 3 Electrical Installation',
    description: 'Every Level 3 topic, drawn at random. Sit this one under exam conditions.',
    track: 'apprentice',
    path: `${APPRENTICE}/level3-module8-mock-exam8`,
  },

  // ── Other apprentice qualifications ─────────────────────────────────────
  {
    id: 'am2',
    title: 'AM2 online knowledge test',
    course: 'AM2 preparation & guidance',
    description: 'The written element of the AM2 assessment.',
    track: 'apprentice',
    path: `${APPRENTICE}/am2/module8`,
  },
  {
    id: 'hnc',
    title: 'HNC practice paper',
    course: 'HNC Electrical Engineering',
    description: 'Higher National Certificate topics across the course.',
    track: 'apprentice',
    path: `${APPRENTICE}/h-n-c-module9-mock-exam`,
  },
  {
    id: 'moet',
    title: 'MOET knowledge test',
    course: 'MOET (ST1426)',
    description: 'EPA-style paper for maintenance operations technicians.',
    track: 'apprentice',
    path: `${APPRENTICE}/m-o-e-t-module7-mock-exam`,
  },
  {
    id: 'functional-skills',
    title: 'Functional skills paper',
    course: 'Functional skills',
    description: 'Maths, English and digital skills.',
    track: 'apprentice',
    path: `${APPRENTICE}/functional-skills/module6/mock-exam`,
  },

  // ── CPD / upskilling ────────────────────────────────────────────────────
  {
    id: 'bs7671',
    title: '18th Edition (BS 7671)',
    course: '18th Edition Wiring Regulations',
    description: 'Wiring regulations paper — the 2382 exam most learners sit.',
    track: 'cpd',
    path: `${UPSKILLING}/bs7671-mock-exam`,
  },
  {
    id: 'inspection-testing',
    title: 'Inspection & testing (2391)',
    course: 'Inspection & testing',
    description: 'Initial verification, periodic inspection and certification.',
    track: 'cpd',
    path: `${UPSKILLING}/inspection-testing-mock-exam`,
  },
  {
    id: 'ev-charging',
    title: 'EV charging installation',
    course: 'EV charging',
    description: 'Charging equipment, earthing arrangements and Section 722.',
    track: 'cpd',
    path: `${UPSKILLING}/ev-charging-mock-exam`,
  },
  {
    id: 'renewable-energy',
    title: 'Renewable energy systems',
    course: 'Renewable energy',
    description: 'Solar PV, storage and low-carbon technology.',
    track: 'cpd',
    path: `${UPSKILLING}/renewable-energy-mock-exam`,
  },
  {
    id: 'emergency-lighting',
    title: 'Emergency lighting',
    course: 'Emergency lighting',
    description: 'Design, installation and periodic testing duties.',
    track: 'cpd',
    path: `${UPSKILLING}/emergency-lighting-mock-exam`,
  },
  {
    id: 'fire-alarm',
    title: 'Fire alarm systems',
    course: 'Fire alarm systems',
    description: 'Detection, categories, commissioning and maintenance.',
    track: 'cpd',
    path: `${UPSKILLING}/fire-alarm-course/mock-exam`,
  },
  {
    id: 'pat-testing',
    title: 'PAT / in-service testing',
    course: 'PAT testing',
    description: 'In-service inspection and testing of electrical equipment.',
    track: 'cpd',
    path: `${UPSKILLING}/pat-testing-mock-exam`,
  },
  {
    id: 'industrial-electrical',
    title: 'Industrial electrical',
    course: 'Industrial electrical',
    description: 'Three-phase systems, motors and industrial control.',
    track: 'cpd',
    path: `${UPSKILLING}/industrial-electrical-mock-exam`,
  },
  {
    id: 'data-cabling',
    title: 'Data cabling',
    course: 'Data cabling',
    description: 'Structured cabling, categories, testing and certification.',
    track: 'cpd',
    path: `${UPSKILLING}/data-cabling-mock-exam`,
  },
  {
    id: 'fiber-optics',
    title: 'Fibre optics',
    course: 'Fibre optics',
    description: 'Fibre types, splicing, termination and testing.',
    track: 'cpd',
    path: `${UPSKILLING}/fiber-optics-mock-exam`,
  },
  {
    id: 'smart-home',
    title: 'Smart home systems',
    course: 'Smart home',
    description: 'Home automation, controls and integration.',
    track: 'cpd',
    path: `${UPSKILLING}/smart-home-mock-exam`,
  },
  {
    id: 'bms',
    title: 'Building management systems',
    course: 'BMS',
    description: 'Controls, sensors and building services integration.',
    track: 'cpd',
    path: `${UPSKILLING}/bms-mock-exam`,
  },

  // ── Safety & site cards ─────────────────────────────────────────────────
  {
    id: 'cscs',
    title: 'CSCS card test',
    course: 'CSCS card',
    description: 'Health, safety and environment test practice.',
    track: 'safety',
    path: `${GENERAL}/cscs-card-mock-exam`,
  },
  {
    id: 'first-aid',
    title: 'First aid at work',
    course: 'First aid',
    description: 'Primary survey, CPR and workplace first-aid duties.',
    track: 'safety',
    path: `${GENERAL}/first-aid-mock-exam`,
  },
  {
    id: 'ipaf',
    title: 'IPAF MEWP operator',
    course: 'IPAF',
    description: 'Powered access categories, checks and safe operation.',
    track: 'safety',
    path: `${GENERAL}/ipaf-mock-exam`,
  },
  {
    id: 'pasma',
    title: 'PASMA towers',
    course: 'PASMA',
    description: 'Mobile access tower assembly, use and dismantling.',
    track: 'safety',
    path: `${GENERAL}/pasma-mock-exam`,
  },
  {
    id: 'mewp',
    title: 'MEWP operation',
    course: 'MEWP',
    description: 'Mobile elevating work platform safety.',
    track: 'safety',
    path: `${GENERAL}/mewp-mock-exam`,
  },
  {
    id: 'working-at-height',
    title: 'Working at height',
    course: 'Working at height',
    description: 'Hierarchy of control, fall arrest and rescue planning.',
    track: 'safety',
    path: `${GENERAL}/working-at-height-mock-exam`,
  },
  {
    id: 'manual-handling',
    title: 'Manual handling',
    course: 'Manual handling',
    description: 'Assessment, team lifts and mechanical aids.',
    track: 'safety',
    path: `${GENERAL}/manual-handling-mock-exam`,
  },
  {
    id: 'coshh',
    title: 'COSHH awareness',
    course: 'COSHH',
    description: 'Hazardous substances, exposure limits and RPE.',
    track: 'safety',
    path: `${GENERAL}/coshh-awareness-mock-exam`,
  },
  {
    id: 'asbestos',
    title: 'Asbestos awareness',
    course: 'Asbestos awareness',
    description: 'Recognising ACMs, duty to manage and emergency response.',
    track: 'safety',
    path: `${GENERAL}/asbestos-awareness-mock-exam`,
  },
  {
    id: 'confined-spaces',
    title: 'Confined spaces',
    course: 'Confined spaces',
    description: 'Entry procedures, atmospheres and rescue arrangements.',
    track: 'safety',
    path: `${GENERAL}/confined-spaces-mock-exam`,
  },
  {
    id: 'fire-safety',
    title: 'Fire safety awareness',
    course: 'Fire safety',
    description: 'Fire classes, extinguisher choice and evacuation.',
    track: 'safety',
    path: `${GENERAL}/fire-safety-mock-exam`,
  },
  {
    id: 'scaffolding',
    title: 'Scaffolding awareness',
    course: 'Scaffolding awareness',
    description: 'Inspection, tagging and safe use of scaffolds.',
    track: 'safety',
    path: `${GENERAL}/scaffolding-awareness-mock-exam`,
  },
  {
    id: 'cdm',
    title: 'CDM regulations',
    course: 'CDM regulations',
    description: 'Duties, roles and documentation on construction projects.',
    track: 'safety',
    path: `${GENERAL}/cdm-regulations-mock-exam`,
  },
  {
    id: 'environmental',
    title: 'Environmental sustainability',
    course: 'Environmental sustainability',
    description: 'Waste, energy and environmental duties on site.',
    track: 'safety',
    path: `${GENERAL}/environmental-sustainability-mock-exam`,
  },
  {
    id: 'mental-health',
    title: 'Mental health awareness',
    course: 'Mental health',
    description: 'Recognising pressure, starting a conversation and getting help.',
    track: 'safety',
    path: `${GENERAL}/mental-health-mock-exam`,
  },

  // ── Personal development ────────────────────────────────────────────────
  {
    id: 'emotional-intelligence',
    title: 'Emotional intelligence',
    course: 'Emotional intelligence',
    description: 'Self-awareness, regulation and reading a situation.',
    track: 'personal',
    path: `${PERSONAL}/ei-mock-exam`,
  },
  {
    id: 'communication',
    title: 'Communication & confidence',
    course: 'Communication and confidence',
    description: 'Clear briefing, listening and difficult conversations.',
    track: 'personal',
    path: `${PERSONAL}/cc-mock-exam`,
  },
  {
    id: 'conflict-resolution',
    title: 'Conflict resolution',
    course: 'Conflict resolution',
    description: 'De-escalation and resolving disputes on site.',
    track: 'personal',
    path: `${PERSONAL}/cr-mock-exam`,
  },
  {
    id: 'mentoring',
    title: 'Mentoring & developing others',
    course: 'Mentoring and developing others',
    description: 'Coaching apprentices and giving useful feedback.',
    track: 'personal',
    path: `${PERSONAL}/md-mock-exam`,
  },
  {
    id: 'resilience',
    title: 'Resilience & stress management',
    course: 'Resilience and stress management',
    description: 'Managing pressure and sustaining performance.',
    track: 'personal',
    path: `${PERSONAL}/rsm-mock-exam`,
  },
  {
    id: 'time-management',
    title: 'Time management',
    course: 'Time management and organisation',
    description: 'Planning, prioritising and protecting your day.',
    track: 'personal',
    path: `${PERSONAL}/tmo-mock-exam`,
  },
  {
    id: 'goal-setting',
    title: 'Goal setting & growth',
    course: 'Goal setting and growth',
    description: 'Setting goals and building a development plan.',
    track: 'personal',
    path: `${PERSONAL}/gs-mock-exam`,
  },
  {
    id: 'personal-finance',
    title: 'Personal finance',
    course: 'Personal finance',
    description: 'Budgeting, tax basics and planning ahead.',
    track: 'personal',
    path: `${PERSONAL}/pf-mock-exam`,
  },
];

/** Total papers available in the app — derived, never typed by hand. */
export const TOTAL_IN_APP_MOCK_EXAMS = IN_APP_MOCK_EXAMS.length;

export const mockExamsForTrack = (track: MockExamTrack): InAppMockExam[] =>
  IN_APP_MOCK_EXAMS.filter((e) => e.track === track);
