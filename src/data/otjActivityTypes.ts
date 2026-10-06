/**
 * Off-the-job training: activity types and the rules behind them.
 *
 * Source: Apprenticeship funding rules, August 2025 to July 2026,
 * paragraphs 77–94 ("Off-the-job training"). Keep wording here plain and
 * faithful to those paragraphs — this is what apprentices, tutors and
 * employers read when deciding what counts.
 *
 * One list for the whole app. It replaced four copies of ACTIVITY_LABEL that
 * had drifted apart (learner card, tutor inbox, Student 360, employer view).
 */

export const OTJ_ACTIVITY_LABEL: Record<string, string> = {
  workshop: 'College or training centre',
  theory: 'Theory and online learning',
  manufacturer_training: 'Manufacturer training',
  shadowing: 'Shadowing',
  mentoring: 'Mentoring',
  industry_visit: 'Industry visit',
  simulation: 'Simulation or training rig',
  competition: 'Competition',
  learning_support: 'Learning support',
  assignment: 'Writing assignments',
  revision: 'Revision',
  employer_meeting: 'Toolbox talk',
  one_to_one: 'One-to-one',
  tutorial: 'Tutorial',
  conference: 'Conference or event',
  // Older entries only: no longer offered to apprentices (see below).
  practical: 'Practical',
  assessment: 'Assessment',
  other: 'Other training',
};

export const otjActivityLabel = (type: string | null | undefined) =>
  (type && OTJ_ACTIVITY_LABEL[type]) || 'Training';

/**
 * What an apprentice can add themselves, in the funding rules' order (para 78).
 *
 * Deliberately NOT offered:
 *  - 'practical' — was "hands-on install / fault-find on site". That is the
 *    apprentice doing their job: on-the-job training (para 77.2), not off.
 *  - 'assessment' — examinations and on-programme testing are excluded
 *    (para 79.5).
 */
export const OTJ_LEARNER_ACTIVITY_TYPES: Array<{ value: string; label: string; hint: string }> = [
  {
    value: 'workshop',
    label: 'College or training centre',
    hint: 'Lectures and workshop sessions. Skip it if your college already records the day for you.',
  },
  {
    value: 'theory',
    label: 'Theory and online learning',
    hint: 'Courses, e-learning and reading outside Elec-Mate. Time inside Elec-Mate is recorded for you.',
  },
  {
    value: 'manufacturer_training',
    label: 'Manufacturer training',
    hint: 'A supplier or manufacturer teaching you their kit: EV chargers, fire alarms, solar, controls.',
  },
  {
    value: 'simulation',
    label: 'Simulation or training rig',
    hint: 'An exercise set up to learn a new skill: a training rig, a mock-up board, a supervised first try. Not your normal work.',
  },
  {
    value: 'shadowing',
    label: 'Shadowing',
    hint: 'Watching a qualified electrician do something new so you can learn it.',
  },
  {
    value: 'mentoring',
    label: 'Mentoring',
    hint: 'A senior colleague teaching you, one to one.',
  },
  {
    value: 'industry_visit',
    label: 'Industry visit',
    hint: 'A site visit, factory tour or trade show that teaches you something for your apprenticeship.',
  },
  {
    value: 'competition',
    label: 'Competition',
    hint: 'Taking part in a skills competition, such as SkillELECTRIC.',
  },
  {
    value: 'learning_support',
    label: 'Learning support',
    hint: 'Support sessions to help you learn, for example with a learning support tutor.',
  },
  {
    value: 'assignment',
    label: 'Writing assignments',
    hint: 'Time spent writing up assignments for your apprenticeship.',
  },
  {
    value: 'revision',
    label: 'Revision',
    hint: 'Revising for your apprenticeship outside Elec-Mate.',
  },
  {
    value: 'employer_meeting',
    label: 'Toolbox talk',
    hint: 'Only when it teaches something from your apprenticeship, not a routine site briefing.',
  },
  {
    value: 'other',
    label: 'Other training',
    hint: 'Something else that taught you new knowledge or skills for your apprenticeship. Describe it.',
  },
];

/** Types an apprentice can no longer pick; voice and AI drafts map away from them. */
export const OTJ_NOT_FOR_LEARNERS = new Set(['practical', 'assessment']);

/* ── The rules, in plain English ───────────────────────────────────────── */

export const OTJ_COUNTS: string[] = [
  'Theory: lectures, online learning, simulation and manufacturer training',
  'Practical training: shadowing, mentoring, industry visits and competitions',
  'Learning support',
  'Writing assignments',
  'Revision',
];

export const OTJ_DOES_NOT_COUNT: string[] = [
  'Doing your normal job, even when you learn from it',
  'Your initial assessment and onboarding',
  'English and maths qualifications',
  'Progress reviews',
  'Exams and tests that count towards your qualification or end-point assessment (practice papers and quizzes you revise with do count)',
  'Training for skills your apprenticeship does not need',
  'Training outside your normal paid hours, unless you agreed it and were paid back with time off or extra pay',
];

export const OTJ_RULES: Array<{ title: string; body: string }> = [
  {
    title: 'In your paid working hours',
    body: 'Off-the-job training happens in the hours you are normally paid for, not overtime. If it has to be outside them, you must agree and be paid back, and most of it still has to be in work time.',
  },
  {
    title: 'A fixed total for your standard',
    body: 'Each apprenticeship standard sets a minimum number of off-the-job hours. Prior learning can reduce it, but never below 187 hours or 8 months.',
  },
  {
    title: 'Some every month',
    body: 'There should be off-the-job training every calendar month of your apprenticeship (every three months on a block-release or front-loaded programme). Two months without any means a break in learning has to be recorded.',
  },
  {
    title: 'New skills, with evidence',
    body: 'It must teach you something new that your apprenticeship needs, and there must be a record of it. Your tutor checks both.',
  },
  {
    title: 'Learning in Elec-Mate',
    body: 'Time you spend learning in the app is measured as it happens, with idle time left out, and counts. Your tutor approves it and can leave out anything that does not meet these rules, such as study outside your working hours.',
  },
];

export const OTJ_RULES_SOURCE = 'Apprenticeship funding rules, August 2025 to July 2026, paragraphs 77 to 94';
