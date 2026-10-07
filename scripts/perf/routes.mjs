/**
 * The screens the College Hub performance budget covers (ELE-1912).
 *
 * Tutor: every College Hub section and page the fixture tutor can open.
 * Learner: the apprentice-college screens (home, today, portfolio, OTJ, plan).
 * Ids are the demo college fixture (Northgate) — a learner and a lesson that
 * always exist there.
 */
const LEARNER = 'd2c312bb-0e50-4e59-b711-343350a2ae1d';
const LESSON = '6173460b-c491-41d7-9f1a-7a68f5ae9ba5';

const SECTIONS = [
  'overview', 'peoplehub', 'curriculumhub', 'assessmenthub', 'resourceshub', 'qualityhub',
  'tutors', 'students', 'cohorts', 'supportstaff', 'courses', 'coursesetup', 'lessonplans',
  'teachingresources', 'tutornotebook', 'schemesofwork', 'documentlibrary', 'grading',
  'attendance', 'ilpmanagement', 'epatracking', 'progresstracking', 'portfolio', 'workqueue',
  'compliancedocs', 'safeguardingqueue', 'ltisettings', 'collegesettings', 'employerportal',
  'otjtraining', 'qualitydashboard', 'timetable', 'aiilpgenerator',
  'iqaworkflow', 'batchoperations', 'assessmentcalendar', 'resourceanalytics', 'masteryqueue',
  'iqaotjaudit', 'tutorobs', 'auditlog', 'tutorworkload',
];

export const TUTOR_ROUTES = [
  ...SECTIONS.map((s) => `/college?section=${s}`),
  `/college?section=student360&studentId=${LEARNER}`,
  `/college?section=student360&studentId=${LEARNER}#otj`,
  `/college?section=student360&studentId=${LEARNER}#assess`,
  '/college/inbox',
  '/college/marking',
  '/college/today',
  '/college/otj',
  '/college/otj/inbox',
  '/college/reviews',
  '/college/evidence-pack',
  `/college/evidence-pack/${LEARNER}`,
  '/college/value',
  '/college/help',
  '/college/epa',
  '/college/compare',
  '/college/quizzes',
  '/college/reports',
  '/college/iqa',
  '/college/compliance',
  '/college/compliance/ofsted',
  '/college/compliance/sar',
  '/college/compliance/qip',
  '/college/compliance/rehearsal',
  '/college/compliance/pack',
  '/college/settings/operational',
  '/college/settings/curriculum',
  `/college/students/${LEARNER}/evidence`,
  `/college/lessons/${LESSON}`,
  '/college/ai-notebook',
];

/** Print pages are measured but not budgeted: they are documents, not screens. */
export const TUTOR_UNBUDGETED = [
  `/college/lessons/${LESSON}/deliver`,
];

export const LEARNER_ROUTES = [
  '/apprentice',
  '/apprentice/today',
  '/apprentice/hub',
  '/apprentice/hub?view=coverage',
  '/apprentice/hub?view=readiness',
  '/apprentice/hub?tab=progress',
  '/apprentice/college-plan',
  '/apprentice/ojt-hub',
  '/apprentice/site-diary',
];
