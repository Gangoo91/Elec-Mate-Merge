/**
 * EPA facts for the Installation / Maintenance Electrician apprenticeship
 * (ST0152) — the one place the guide, the simulator, readiness and the AI
 * prompt take them from, so they can't contradict each other again.
 *
 * Sources (read 6 Oct 2026; texts kept in the AM2 session scratchpad):
 *   - ST0152 assessment plan — the May 2018 version (Skills England media/1784,
 *     the current one; a revised plan is listed with an earliest start of
 *     17 Dec 2026 — re-check then). Its grading text is word for word the
 *     same as the 2015 plan:
 *     "The AM2 will be graded pass/merit/distinction. Candidates will require
 *     70% to pass … merit at 80% and distinction at 90%. It is possible to
 *     retake AM2 if necessary but any subsequent successful attempt will be
 *     graded Pass." / "The overall apprenticeship grade will be derived only
 *     from the AM2 grade." Certificate: Level 3 Electrotechnical
 *     Qualification, AM2, maths level 2, English level 2. No professional
 *     discussion anywhere in the plan.
 *   - NET AM2S v1 Pre-Assessment Manual (March 2025), for apprentices
 *     registered on the standard from September 2023: Safe Working Practices
 *     and Planning 1 h; Composite Installation 10 h 30; Inspection, Testing and
 *     Certification 3 h 30; Safe Isolation 30 min; Fault Diagnosis 2 h;
 *     Applied Knowledge 1 h 30 (45 multiple-choice questions).
 *   - GOV.UK, 11 Feb 2025 ("10,000 more apprentices…"): employers decide
 *     whether apprentices aged 19+ when they start need a level 2 English and
 *     maths qualification. Funding rules 2025–26 say the same.
 */

export const EPA_FACTS = {
  standard: 'Installation and maintenance electrician (ST0152)',
  /** The EPA is the AM2 — the AM2S for apprentices registered from Sept 2023. */
  assessment: 'AM2S',
  assessmentLong:
    'The end-point assessment is the AM2S, a practical assessment run by NET (the AM2 if your centre booked you on the older version).',
  bands: { pass: 70, merit: 80, distinction: 90 },
  grades: 'Pass, Merit or Distinction — 70%, 80% and 90%.',
  retake: 'You can retake it, but a retake can only be graded Pass.',
  overallGrade: 'Your apprenticeship grade is your AM2S grade — nothing else counts towards it.',
  noDiscussion: 'There is no professional discussion or interview in this EPA.',
  certificate: [
    'Level 3 electrotechnical qualification',
    'AM2S',
    'Level 2 English and maths — if you were under 19 when you started (from 19, your employer decides)',
  ],
  revisionPending:
    'Skills England lists a revised ST0152 assessment plan with an earliest start date of 17 December 2026.',
  englishMaths:
    'Level 2 English and maths are required if you were under 19 when you started. If you were 19 or over, your employer decides whether you need them (since 11 February 2025).',
  /** NET AM2S v1 sections and times on the day. */
  am2sSections: [
    { name: 'Safe working practices and planning', time: '1 hour' },
    { name: 'Composite installation', time: '10½ hours' },
    { name: 'Inspection, testing and certification', time: '3½ hours' },
    { name: 'Safe isolation', time: '30 minutes' },
    { name: 'Fault diagnosis', time: '2 hours' },
    { name: 'Applied knowledge', time: '1½ hours, 45 questions' },
  ],
  whoDecides:
    'Your employer and your training provider decide when you go through gateway — this is your own estimate, not their decision.',
} as const;
