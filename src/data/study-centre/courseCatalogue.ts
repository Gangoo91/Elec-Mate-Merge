/**
 * The Study Centre course catalogue — one list of every course, and the search
 * over it.
 *
 * Before this, the four track index pages each held a private `COURSES` array
 * and the hub carried hardcoded counts alongside them. The counts had already
 * drifted: the hub advertised 8 apprentice courses against 6 real ones and 14
 * general ones against 15, so "46 courses" was wrong in both directions at once
 * and "1/46 complete" was measured against a number that did not exist.
 * Counts here are derived, so they cannot drift again.
 *
 * `keywords` is the point of the file. A search that only matches titles is
 * useless to the people using it: nobody types "18th Edition Wiring
 * Regulations", they type "bs7671", "regs" or "2382". Nobody looks for "MEWP
 * operator training", they look for "cherry picker". The keywords carry the
 * qualification codes, the trade slang and the kit names that the official
 * titles leave out.
 *
 * Paths were taken from each index page's `link` and checked against the
 * declared routes — all 45 resolve.
 */

export type CourseTrack = 'apprentice' | 'upskilling' | 'general' | 'personal';

export interface StudyCourse {
  id: string;
  title: string;
  description: string;
  track: CourseTrack;
  /** Foundation | Intermediate | Advanced | Specialist | Expert | Essential */
  level: string;
  duration: string;
  path: string;
  /** Key used by `completedSectionsForCourse` to read progress. */
  routeKey: string;
  keywords: string[];
}

export const TRACKS: Record<CourseTrack, { short: string; label: string; href: string }> = {
  apprentice: {
    short: 'Apprentice',
    label: 'Apprentice training',
    href: '/study-centre/apprentice',
  },
  upskilling: { short: 'CPD', label: 'Professional upskilling', href: '/study-centre/upskilling' },
  general: {
    short: 'Safety',
    label: 'General upskilling',
    href: '/study-centre/general-upskilling',
  },
  personal: {
    short: 'Growth',
    label: 'Personal development',
    href: '/study-centre/personal-development',
  },
};

export const COURSE_CATALOGUE: StudyCourse[] = [
  {
    id: 'level2',
    title: 'Level 2 Electrical Installation',
    description:
      'Foundation electrical installation skills, safety principles and core wiring techniques.',
    track: 'apprentice',
    level: 'Foundation',
    duration: '2 years',
    path: '/study-centre/apprentice/level2',
    routeKey: 'level2',
    keywords: [
      '2365',
      'level 2',
      'apprentice',
      'installation',
      'city and guilds',
      'c&g',
      'first year',
    ],
  },
  {
    id: 'level3',
    title: 'Level 3 Electrical Installation',
    description: 'Advanced installation techniques, design, inspection and testing principles.',
    track: 'apprentice',
    level: 'Intermediate',
    duration: '2 years',
    path: '/study-centre/apprentice/level3',
    routeKey: 'level3',
    keywords: ['2365', 'level 3', 'apprentice', 'installation', 'third year', 'advanced diploma'],
  },
  {
    id: 'am2',
    title: 'AM2 preparation & guidance',
    description: 'Practical assessment preparation, mock scenarios and exam technique guidance.',
    track: 'apprentice',
    level: 'Intermediate',
    duration: '1 day',
    path: '/study-centre/apprentice/am2',
    routeKey: 'am2',
    keywords: ['am2', 'am2s', 'end point assessment', 'epa', 'practical assessment', 'gola'],
  },
  {
    id: 'hnc',
    title: 'HNC Electrical Engineering',
    description:
      'Higher National Certificate in Electrical and Electronic Engineering for Building Services.',
    track: 'apprentice',
    level: 'Advanced',
    duration: '2 years',
    path: '/study-centre/apprentice/hnc',
    routeKey: 'hnc',
    keywords: ['hnc', 'higher national', 'engineering', 'degree', 'further education'],
  },
  {
    id: 'moet',
    title: 'MOET',
    description:
      'Maintenance Operations Engineering Technician — multi-skilled maintenance training.',
    track: 'apprentice',
    level: 'Intermediate',
    duration: '18 months',
    path: '/study-centre/apprentice/moet',
    routeKey: 'moet',
    keywords: ['moet', 'maintenance', 'operations', '2357', 'nvq', 'industrial'],
  },
  {
    id: 'functional-skills',
    title: 'Functional skills',
    description: 'Essential maths, English and IT skills required for electrical apprenticeships.',
    track: 'apprentice',
    level: 'Essential',
    duration: 'Ongoing',
    path: '/study-centre/apprentice/functional-skills',
    routeKey: 'functional-skills',
    keywords: ['maths', 'english', 'functional skills', 'numeracy', 'literacy', 'level 2 maths'],
  },
  {
    id: 'bs7671',
    title: '18th Edition Wiring Regulations',
    description: 'BS 7671:2018 wiring regulations and electrical safety requirements.',
    track: 'upskilling',
    level: 'Essential',
    duration: '6 weeks',
    path: '/study-centre/upskilling/bs7671-course',
    routeKey: 'bs7671',
    keywords: [
      '18th edition',
      'bs 7671',
      'bs7671',
      'wiring regulations',
      'regs',
      '2382',
      'amendment',
      'a3',
      'a4',
    ],
  },
  {
    id: 'inspection-testing',
    title: 'Inspection & testing',
    description: 'Electrical inspection, testing and certification procedures.',
    track: 'upskilling',
    level: 'Advanced',
    duration: '8 weeks',
    path: '/study-centre/upskilling/inspection-testing',
    routeKey: 'inspection-testing',
    keywords: [
      '2391',
      'inspection',
      'testing',
      'eicr',
      'initial verification',
      'periodic',
      'zs',
      'r1r2',
      'insulation resistance',
    ],
  },
  {
    id: 'pat',
    title: 'PAT testing certification',
    description: 'Portable appliance testing procedures and certification requirements.',
    track: 'upskilling',
    level: 'Foundation',
    duration: '4 weeks',
    path: '/study-centre/upskilling/pat-testing-course',
    routeKey: 'pat-testing',
    keywords: ['pat', '2377', 'portable appliance', 'in service', 'testing appliances'],
  },
  {
    id: 'fire-alarm',
    title: 'Fire alarm systems',
    description: 'Fire detection and alarm system design, installation and commissioning.',
    track: 'upskilling',
    level: 'Specialist',
    duration: '8 weeks',
    path: '/study-centre/upskilling/fire-alarm-course',
    routeKey: 'fire-alarm',
    keywords: ['fire alarm', 'bs 5839', 'detection', 'sounders', 'panel', 'l1', 'category'],
  },
  {
    id: 'emergency-lighting',
    title: 'Emergency lighting systems',
    description: 'Emergency lighting design, testing schedules and BS 5266 compliance.',
    track: 'upskilling',
    level: 'Intermediate',
    duration: '6 weeks',
    path: '/study-centre/upskilling/emergency-lighting-course',
    routeKey: 'emergency-lighting',
    keywords: ['emergency lighting', 'bs 5266', 'escape', 'luminaire', '3 hour'],
  },
  {
    id: 'data-cabling',
    title: 'Data & communications cabling',
    description: 'Structured cabling systems, fiber optics and network infrastructure.',
    track: 'upskilling',
    level: 'Intermediate',
    duration: '6 weeks',
    path: '/study-centre/upskilling/data-cabling-course',
    routeKey: 'data-cabling',
    keywords: ['data', 'cat5', 'cat6', 'network', 'structured cabling', 'comms', 'ethernet'],
  },
  {
    id: 'renewable-energy',
    title: 'Renewable energy systems',
    description: 'Solar, wind and battery storage installation and maintenance procedures.',
    track: 'upskilling',
    level: 'Intermediate',
    duration: '12 weeks',
    path: '/study-centre/upskilling/renewable-energy-course',
    routeKey: 'renewable-energy',
    keywords: ['renewable', 'solar', 'pv', 'wind', 'heat pump', 'mcs', 'green'],
  },
  {
    id: 'ev-charging',
    title: 'Electric vehicle charging',
    description: 'EV charging infrastructure installation, maintenance and safety protocols.',
    track: 'upskilling',
    level: 'Specialist',
    duration: '6 weeks',
    path: '/study-centre/upskilling/ev-charging-course',
    routeKey: 'ev-charging',
    keywords: [
      'ev',
      'electric vehicle',
      'car charger',
      'charge point',
      '7kw',
      'ocpp',
      'pme',
      'zappi',
    ],
  },
  {
    id: 'smart-home',
    title: 'Smart home technology',
    description: 'Home automation, IoT integration and intelligent building systems.',
    track: 'upskilling',
    level: 'Intermediate',
    duration: '8 weeks',
    path: '/study-centre/upskilling/smart-home-course',
    routeKey: 'smart-home',
    keywords: ['smart home', 'knx', 'automation', 'iot', 'home assistant', 'hive', 'nest'],
  },
  {
    id: 'energy-efficiency',
    title: 'Energy efficiency & management',
    description: 'Power quality analysis, energy auditing and optimisation strategies.',
    track: 'upskilling',
    level: 'Advanced',
    duration: '10 weeks',
    path: '/study-centre/upskilling/energy-efficiency-course',
    routeKey: 'energy-efficiency',
    keywords: ['energy', 'efficiency', 'part l', 'carbon', 'net zero', 'savings'],
  },
  {
    id: 'bms',
    title: 'Building management systems',
    description: 'HVAC control, lighting management and integrated building automation.',
    track: 'upskilling',
    level: 'Advanced',
    duration: '12 weeks',
    path: '/study-centre/upskilling/bms-course',
    routeKey: 'bms',
    keywords: ['bms', 'building management', 'controls', 'hvac', 'automation'],
  },
  {
    id: 'industrial-electrical',
    title: 'Industrial electrical systems',
    description: 'High voltage systems, motor control and industrial automation.',
    track: 'upskilling',
    level: 'Expert',
    duration: '14 weeks',
    path: '/study-centre/upskilling/industrial-electrical-course',
    routeKey: 'industrial-electrical',
    keywords: ['industrial', 'three phase', 'motors', 'plc', 'panel', 'control gear'],
  },
  {
    id: 'instrumentation',
    title: 'Instrumentation',
    description: 'Industrial instrumentation systems, control loops and measurement techniques.',
    track: 'upskilling',
    level: 'Advanced',
    duration: '10 weeks',
    path: '/study-centre/upskilling/instrumentation-course',
    routeKey: 'instrumentation',
    keywords: ['instrumentation', 'sensors', 'calibration', 'process', '4-20ma'],
  },
  {
    id: 'fiber-optics',
    title: 'Fiber optics technology',
    description: 'Optical fiber installation, fusion splicing and OTDR testing procedures.',
    track: 'upskilling',
    level: 'Advanced',
    duration: '8 weeks',
    path: '/study-centre/upskilling/fiber-optics-course',
    routeKey: 'fiber-optics',
    keywords: ['fibre', 'fiber', 'optic', 'splicing', 'otdr', 'singlemode'],
  },
  {
    id: 'ipaf',
    title: 'IPAF mobile scaffold training',
    description: 'Safe assembly, use and inspection of mobile access towers on site.',
    track: 'general',
    level: 'Foundation',
    duration: 'Half day',
    path: '/study-centre/general-upskilling/ipaf-course',
    routeKey: 'ipaf',
    keywords: ['ipaf', 'scissor lift', 'cherry picker', 'mobile tower', 'access'],
  },
  {
    id: 'pasma',
    title: 'PASMA towers for users',
    description:
      'PASMA-certified training for mobile access tower assembly, inspection and safe use.',
    track: 'general',
    level: 'Foundation',
    duration: 'Half day',
    path: '/study-centre/general-upskilling/pasma-course',
    routeKey: 'pasma',
    keywords: ['pasma', 'tower', 'scaffold tower', 'mobile access'],
  },
  {
    id: 'mewp',
    title: 'MEWP operator training',
    description: 'Mobile elevating work platform operation, safety checks and best practice.',
    track: 'general',
    level: 'Intermediate',
    duration: '3.5 hours',
    path: '/study-centre/general-upskilling/mewp-course',
    routeKey: 'mewp',
    keywords: ['mewp', 'cherry picker', 'scissor lift', 'boom', 'platform'],
  },
  {
    id: 'first-aid',
    title: 'First aid at work',
    description: 'Workplace first aid procedures, CPR and emergency response training.',
    track: 'general',
    level: 'Intermediate',
    duration: '3 days',
    path: '/study-centre/general-upskilling/first-aid-course',
    routeKey: 'first-aid',
    keywords: ['first aid', 'fawe', 'cpr', 'defib', 'emergency'],
  },
  {
    id: 'mental-health',
    title: 'Mental health first aid',
    description: 'Recognising and supporting mental health issues in the workplace.',
    track: 'general',
    level: 'Intermediate',
    duration: '2 days',
    path: '/study-centre/general-upskilling/mental-health-course',
    routeKey: 'mental-health',
    keywords: ['mental health', 'first aid', 'wellbeing', 'stress', 'suicide'],
  },
  {
    id: 'asbestos',
    title: 'Asbestos awareness',
    description: 'Identifying asbestos-containing materials and safe working procedures.',
    track: 'general',
    level: 'Foundation',
    duration: 'Half day',
    path: '/study-centre/general-upskilling/asbestos-awareness-course',
    routeKey: 'asbestos',
    keywords: ['asbestos', 'acm', 'category a', 'licensed', 'ucatt'],
  },
  {
    id: 'working-at-height',
    title: 'Working at height',
    description: 'Risk assessment, fall prevention and safe practices for working at height.',
    track: 'general',
    level: 'Foundation',
    duration: 'Half day',
    path: '/study-centre/general-upskilling/working-at-height-course',
    routeKey: 'working-at-height',
    keywords: ['height', 'ladders', 'harness', 'fall arrest', 'roof', 'scaffold'],
  },
  {
    id: 'manual-handling',
    title: 'Manual handling',
    description: 'Safe lifting techniques, risk assessment and injury prevention on site.',
    track: 'general',
    level: 'Foundation',
    duration: 'Half day',
    path: '/study-centre/general-upskilling/manual-handling-course',
    routeKey: 'manual-handling',
    keywords: ['manual handling', 'lifting', 'back', 'kinetic'],
  },
  {
    id: 'coshh',
    title: 'COSHH awareness',
    description: 'Control of substances hazardous to health — identification and safe handling.',
    track: 'general',
    level: 'Foundation',
    duration: 'Half day',
    path: '/study-centre/general-upskilling/coshh-awareness-course',
    routeKey: 'coshh-awareness',
    keywords: ['coshh', 'chemicals', 'hazardous', 'substances', 'msds'],
  },
  {
    id: 'confined-spaces',
    title: 'Confined spaces awareness',
    description: 'Hazard identification and safe entry procedures for confined spaces.',
    track: 'general',
    level: 'Intermediate',
    duration: '1 day',
    path: '/study-centre/general-upskilling/confined-spaces-course',
    routeKey: 'confined-spaces',
    keywords: ['confined space', 'permit', 'gas monitor', 'rescue'],
  },
  {
    id: 'fire-safety',
    title: 'Fire safety & fire marshal',
    description: 'Fire prevention, evacuation procedures and fire marshal responsibilities.',
    track: 'general',
    level: 'Foundation',
    duration: 'Half day',
    path: '/study-centre/general-upskilling/fire-safety-course',
    routeKey: 'fire-safety',
    keywords: ['fire', 'marshal', 'warden', 'extinguisher', 'evacuation'],
  },
  {
    id: 'cscs-card',
    title: 'CSCS card preparation',
    description: 'Health, safety and environment test preparation for CSCS card applications.',
    track: 'general',
    level: 'Foundation',
    duration: '1 day',
    path: '/study-centre/general-upskilling/cscs-card-course',
    routeKey: 'cscs-card',
    keywords: ['cscs', 'ecs card', 'card', 'site card', 'test'],
  },
  {
    id: 'scaffolding',
    title: 'Scaffolding awareness',
    description: 'Scaffold safety, inspection requirements and hazard awareness on site.',
    track: 'general',
    level: 'Foundation',
    duration: 'Half day',
    path: '/study-centre/general-upskilling/scaffolding-awareness-course',
    routeKey: 'scaffolding-awareness',
    keywords: ['scaffolding', 'scaffold', 'tube and fitting', 'tag'],
  },
  {
    id: 'environmental',
    title: 'Environmental & sustainability',
    description: 'Waste management, energy efficiency and sustainable working practices.',
    track: 'general',
    level: 'Foundation',
    duration: '1 day',
    path: '/study-centre/general-upskilling/environmental-sustainability-course',
    routeKey: 'environmental-sustainability',
    keywords: ['environment', 'sustainability', 'waste', 'recycling', 'carbon'],
  },
  {
    id: 'cdm',
    title: 'CDM regulations awareness',
    description: 'Construction Design and Management regulations, roles and responsibilities.',
    track: 'general',
    level: 'Intermediate',
    duration: '1 day',
    path: '/study-centre/general-upskilling/cdm-regulations-course',
    routeKey: 'cdm-regulations',
    keywords: ['cdm', 'construction design management', 'principal contractor', 'f10'],
  },
  {
    id: 'leadership-on-site',
    title: 'Leadership on site',
    description:
      'Delegating, decision-making, earning respect and leading teams — based on ILM Level 2 frameworks.',
    track: 'personal',
    level: 'Intermediate',
    duration: '6 hours',
    path: '/study-centre/personal-development/leadership-on-site',
    routeKey: 'leadership-on-site',
    keywords: ['leadership', 'supervisor', 'managing', 'team', 'foreman'],
  },
  {
    id: 'mental-health-awareness',
    title: 'Mental health awareness',
    description:
      'Recognising signs, starting conversations, supporting others — based on MHFA England and Mates in Mind.',
    track: 'personal',
    level: 'Foundation',
    duration: '4 hours',
    path: '/study-centre/personal-development/mental-health-awareness',
    routeKey: 'mental-health-awareness',
    keywords: ['mental health', 'awareness', 'wellbeing', 'stress'],
  },
  {
    id: 'emotional-intelligence',
    title: 'Emotional intelligence',
    description:
      "Self-awareness, managing reactions, reading people \u2014 based on Daniel Goleman's EI framework.",
    track: 'personal',
    level: 'Foundation',
    duration: '5 hours',
    path: '/study-centre/personal-development/emotional-intelligence',
    routeKey: 'emotional-intelligence',
    keywords: ['emotional intelligence', 'eq', 'self awareness', 'empathy'],
  },
  {
    id: 'communication-confidence',
    title: 'Communication & confidence',
    description:
      'Toolbox talks, client conversations, professional writing — based on Toastmasters Pathways.',
    track: 'personal',
    level: 'Foundation',
    duration: '5 hours',
    path: '/study-centre/personal-development/communication-confidence',
    routeKey: 'communication-confidence',
    keywords: ['communication', 'confidence', 'speaking', 'clients'],
  },
  {
    id: 'mentoring-developing-others',
    title: 'Mentoring & developing others',
    description:
      'How people learn, giving feedback, supporting apprentices — based on ILM coaching and JIB standards.',
    track: 'personal',
    level: 'Intermediate',
    duration: '5 hours',
    path: '/study-centre/personal-development/mentoring-developing-others',
    routeKey: 'mentoring-developing-others',
    keywords: ['mentoring', 'coaching', 'apprentice', 'developing'],
  },
  {
    id: 'resilience-stress-management',
    title: 'Resilience & stress management',
    description: 'Managing pressure, bouncing back, switching off — based on MBSR principles.',
    track: 'personal',
    level: 'Foundation',
    duration: '4 hours',
    path: '/study-centre/personal-development/resilience-stress-management',
    routeKey: 'resilience-stress-management',
    keywords: ['resilience', 'stress', 'burnout', 'pressure'],
  },
  {
    id: 'time-management-organisation',
    title: 'Time management & organisation',
    description:
      'Planning, managing multiple jobs, admin — based on GTD and Eisenhower frameworks.',
    track: 'personal',
    level: 'Foundation',
    duration: '4 hours',
    path: '/study-centre/personal-development/time-management-organisation',
    routeKey: 'time-management-organisation',
    keywords: ['time management', 'organisation', 'planning', 'productivity'],
  },
  {
    id: 'conflict-resolution',
    title: 'Conflict resolution',
    description:
      'Non-paying clients, site disputes, awkward conversations — based on ACAS conflict resolution.',
    track: 'personal',
    level: 'Intermediate',
    duration: '4 hours',
    path: '/study-centre/personal-development/conflict-resolution',
    routeKey: 'conflict-resolution',
    keywords: ['conflict', 'disputes', 'difficult conversations', 'negotiation'],
  },
  {
    id: 'personal-finance',
    title: 'Personal finance & wellbeing',
    description:
      'Budgeting, debt, pensions, planning ahead — based on Open University Managing My Money.',
    track: 'personal',
    level: 'Foundation',
    duration: '5 hours',
    path: '/study-centre/personal-development/personal-finance',
    routeKey: 'personal-finance',
    keywords: ['finance', 'money', 'pension', 'tax', 'budgeting', 'savings'],
  },
  {
    id: 'goal-setting-growth',
    title: 'Goal setting & continuous growth',
    description:
      'Setting goals, building habits, tracking progress — based on FranklinCovey 7 Habits.',
    track: 'personal',
    level: 'Foundation',
    duration: '4 hours',
    path: '/study-centre/personal-development/goal-setting-growth',
    routeKey: 'goal-setting-growth',
    keywords: ['goals', 'growth', 'development', 'career', 'progression'],
  },
];

/** Derived, never hardcoded. */
export const TOTAL_COURSES = COURSE_CATALOGUE.length;

export const countByTrack = (track: CourseTrack): number =>
  COURSE_CATALOGUE.filter((c) => c.track === track).length;

/*
 * Two normalisations, because electricians type both forms.
 *
 * `norm` collapses punctuation to spaces so "Data & communications" matches
 * "data communications". `squash` removes separators entirely so "bs7671"
 * matches "BS 7671" and "cat6" matches "Cat 6" — the single most common way
 * these searches were missing.
 */
const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
const squash = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

interface Scored {
  course: StudyCourse;
  score: number;
}

/**
 * Score one course against one token. 0 means no match at all.
 *
 * Matching is on WORD boundaries, not raw substrings. A naive `includes` looked
 * fine on long queries and fell apart on the short ones people actually type:
 * "ev" returned eighteen courses because it appears inside "l-ev-el" and
 * "d-ev-elopment", and "pat" matched "em-pat-hy". Both ranked real answers
 * below noise.
 *
 * So a token has to either BE a word or START one. The squashed forms are kept
 * for joined spellings — "bs7671" for "BS 7671", "cat6" for "Cat 6" — but only
 * at 4+ characters, below which they reintroduce exactly the noise above.
 */
const MIN_PREFIX = 3;
const MIN_SQUASH = 4;

const scoreToken = (c: StudyCourse, token: string): number => {
  const t = norm(token);
  const ts = squash(token);
  if (!ts) return 0;

  const words = (s: string) => norm(s).split(' ').filter(Boolean);
  const hasWord = (s: string) => words(s).includes(t);
  const hasPrefix = (s: string) =>
    t.length >= MIN_PREFIX && words(s).some((w) => w.startsWith(t));

  // Title
  if (norm(c.title) === t) return 200;
  if (hasWord(c.title)) return 160;
  if (hasPrefix(c.title)) return 130;
  if (ts.length >= MIN_SQUASH && squash(c.title).includes(ts)) return 120;

  // Keywords — where the codes and the slang live
  for (const k of c.keywords) {
    if (norm(k) === t) return 95;
    if (hasWord(k)) return 85;
    if (ts.length >= MIN_SQUASH && squash(k) === ts) return 85;
    if (hasPrefix(k)) return 55;
    if (ts.length >= MIN_SQUASH && squash(k).includes(ts)) return 45;
  }

  if (hasWord(c.description)) return 20;
  if (hasPrefix(c.description)) return 12;
  if (hasWord(TRACKS[c.track].label)) return 15;
  if (hasWord(c.level)) return 10;
  return 0;
};

/**
 * Search the catalogue.
 *
 * Multi-word queries are AND, not OR — "ev charging" should not return every
 * course mentioning "charging" plus every course mentioning "ev". A course has
 * to answer every token to appear at all, and its score is the sum, so the
 * course that answers them best sorts first.
 *
 * An empty query returns everything, which is what makes this the browse view
 * as well as the search.
 */
export const searchCourses = (query: string, track?: CourseTrack | 'all'): StudyCourse[] => {
  const pool =
    !track || track === 'all'
      ? COURSE_CATALOGUE
      : COURSE_CATALOGUE.filter((c) => c.track === track);

  const tokens = norm(query).split(' ').filter(Boolean);
  if (tokens.length === 0) return pool;

  const scored: Scored[] = [];
  for (const course of pool) {
    let total = 0;
    let matchedAll = true;
    for (const token of tokens) {
      const s = scoreToken(course, token);
      if (s === 0) {
        matchedAll = false;
        break;
      }
      total += s;
    }
    if (matchedAll) scored.push({ course, score: total });
  }

  // Stable within a score band: catalogue order is curated (Level 2 before
  // Level 3), and re-sorting equal scores alphabetically would break that.
  return scored.sort((a, b) => b.score - a.score).map((s) => s.course);
};
