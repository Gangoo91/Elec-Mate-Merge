/**
 * Off-the-job entry quality check (ELE-2052).
 *
 * Runs in code, before an apprentice sends an off-the-job entry to their tutor,
 * against the Apprenticeship funding rules, August 2026 to July 2027 (version 3,
 * July 2026), paragraphs 82 to 88:
 *
 *   84.1  initial assessment and onboarding are not off-the-job training
 *   84.2  English and maths standalone qualifications are not
 *   84.3  training for KSBs the standard does not require is not
 *   84.4  progress reviews are not
 *   84.5  examinations and other on-programme testing are not
 *   84.6  training outside normal working hours is not, unless agreed and
 *         compensated (84.6.1), and the majority must not be delivered that way
 *   82.1  "normal working hours" = the hours normally paid, excluding overtime
 *   88    activity is agreed in advance and documented in the training plan
 *   82.4  funds are at risk of recovery if the policy is not met (duplicates)
 *
 * The rules are deterministic. The words that explain a flag are fixed here;
 * the otj-quality-explain edge function may only reword them for this entry.
 * Every flag is advisory: the learner can fix the entry or send it with a note,
 * and the tutor sees which flags they sent it with.
 */

export type OtjFlagCode =
  | 'exam_testing'
  | 'outside_hours'
  | 'weekend'
  | 'long_day'
  | 'english_maths'
  | 'onboarding'
  | 'progress_review'
  | 'not_linked'
  | 'unknown_units'
  | 'not_in_plan'
  | 'duplicate'
  | 'day_total';

export interface OtjFlag {
  code: OtjFlagCode;
  /** likely: probably does not count as written. check: may be fine, say more. */
  severity: 'likely' | 'check';
  para: string;
  title: string;
  /** Plain English, fixed wording. */
  explanation: string;
  /** What to change so it counts (or why to send it anyway). */
  fix: string;
  /** Which field to go to. */
  field?:
    'title' | 'description' | 'hours' | 'activity_date' | 'unit_codes_text' | 'duration_minutes';
}

export interface OtjEntryInput {
  activity_date: string;
  activity_type: string;
  title: string;
  description: string;
  duration_minutes: number;
  unit_codes: string[];
  hours: '' | 'in' | 'outside_paid' | 'outside_unpaid';
}

export interface OtjCheckContext {
  /** The learner's other entries on the same day (not rejected). */
  sameDay: Array<{
    id?: string;
    title: string;
    duration_minutes: number;
    activity_type: string | null;
  }>;
  /** Unit codes of the learner's qualification, or null when not known. */
  qualificationUnits: string[] | null;
  /**
   * The off-the-job lines of the learner's training plan in force (ELE-2039),
   * or null when no plan is in force. Para 88: activity is agreed in advance
   * and documented in the plan.
   */
  planActivities?: string[] | null;
}

// Words too common to show that an entry and a plan line are about the same thing.
const STOP = new Set(
  'about after again also and are been before being between both but can could did does doing down during each from further have having here into its itself just more most must off once only other our out over same should some such than that the their them then there these they this those through too under until very was were what when where which while who whom why will with would your work working learn learning learned training trained session sessions using used use week weeks day days time hours hour site job jobs'.split(
    ' '
  )
);
/** Meaningful words (5+ letters, not common), lower case, simple plural folded. */
const words = (t: string) =>
  new Set(
    t
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 5 && !STOP.has(w))
      .map((w) => w.replace(/(ies|es|s)$/, ''))
  );

/** The text the rules are checked against, lower case. */
const text = (e: OtjEntryInput) => `${e.title}\n${e.description}`.toLowerCase();

// Sitting or taking an exam or test that counts. Electrical "testing" (insulation
// resistance, RCD tests) is practical training, so the bare word is never matched.
const EXAM =
  /\b(exam|exams|examination|mock exam|resit|re-sit|end[- ]point assessment|\bepa\b|am2s?|am2e|gateway assessment|(online|written|multiple[- ]choice|unit|phase|final|practical) (test|exam|assessment)|sat (the|a|my|an) (test|exam|assessment|paper)|took (the|a|my|an) (test|exam|assessment|paper)|being assessed|assessment day|assessed by (my )?(assessor|tutor))\b/i;
// Revising for one does count (para 83.5).
const REVISION =
  /\b(revis(e|ed|ing|ion)|practi[cs]e (paper|question|quiz)|prepar(e|ed|ing) for)\b/i;
const ENGLISH_MATHS =
  /\b(functional skills|fs (english|maths)|gcse (english|maths|math)|(english|maths|math) (gcse|functional|level [12])|level [12] (english|maths|math))\b/i;
const ONBOARDING =
  /\b(induction|onboarding|enrol(l)?ment|initial assessment|sign[- ]?up day|skills scan|diagnostic test)\b/i;
const PROGRESS_REVIEW =
  /\b(progress review|tripartite|review meeting with (my )?(tutor|assessor|employer)|12[- ]week review)\b/i;
const KSB_CODE = /^[KSB]\d{1,2}$/i;

const normTitle = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export function checkOtjEntry(e: OtjEntryInput, ctx: OtjCheckContext): OtjFlag[] {
  const flags: OtjFlag[] = [];
  const t = text(e);

  // 84.5 examinations and on-programme testing
  if (e.activity_type === 'assessment' || (EXAM.test(t) && !REVISION.test(t))) {
    flags.push({
      code: 'exam_testing',
      severity: 'likely',
      para: '84.5',
      title: 'Sounds like an exam or test',
      explanation:
        'Sitting an exam or a test that counts towards your qualification or end-point assessment is not off-the-job training. Revising for it, and practice papers, do count.',
      fix: 'If this was revision or a practice paper, say so in the description. If it was the exam itself, leave it out.',
      field: 'description',
    });
  } else if (EXAM.test(t) && REVISION.test(t)) {
    flags.push({
      code: 'exam_testing',
      severity: 'check',
      para: '84.5',
      title: 'Mentions an exam',
      explanation:
        'Revision counts, but the exam or test itself does not. Your tutor needs to see that the time was spent revising, not sitting it.',
      fix: 'Make sure the hours are only the revision, and the description says what you revised.',
      field: 'description',
    });
  }

  // 84.2 English and maths
  if (ENGLISH_MATHS.test(t)) {
    flags.push({
      code: 'english_maths',
      severity: 'likely',
      para: '84.2',
      title: 'English or maths qualification',
      explanation:
        'Work towards a standalone English or maths qualification, such as Functional Skills or GCSE, is on top of your off-the-job hours. It cannot count towards them.',
      fix: 'Leave English and maths study out of this entry. Your college records it separately.',
      field: 'description',
    });
  }

  // 84.1 onboarding
  if (ONBOARDING.test(t)) {
    flags.push({
      code: 'onboarding',
      severity: 'likely',
      para: '84.1',
      title: 'Sounds like induction or onboarding',
      explanation: 'Initial assessment and onboarding activities are not off-the-job training.',
      fix: 'If this taught you something new for your apprenticeship, describe that part only.',
      field: 'description',
    });
  }

  // 84.4 progress reviews
  if (PROGRESS_REVIEW.test(t)) {
    flags.push({
      code: 'progress_review',
      severity: 'likely',
      para: '84.4',
      title: 'Sounds like a progress review',
      explanation: 'Time in your progress reviews does not count as off-the-job training.',
      fix: 'Leave the review out. Training it led to can be added on its own.',
      field: 'description',
    });
  }

  // 84.6 / 84.6.1 / 82.1 working hours
  if (e.hours === 'outside_paid') {
    flags.push({
      code: 'outside_hours',
      severity: 'check',
      para: '84.6.1',
      title: 'Outside your normal hours',
      explanation:
        'Training outside your normal paid hours only counts by exception, when you agreed to it and were paid back with time off or extra pay. Most of your training must be in your normal hours.',
      fix: 'Say in the description how you were paid back, for example time off in lieu on a date.',
      field: 'description',
    });
  }
  if (e.hours === 'in' && e.activity_date) {
    const day = new Date(`${e.activity_date}T12:00:00`).getDay();
    if (day === 0 || day === 6) {
      flags.push({
        code: 'weekend',
        severity: 'check',
        para: '84.6',
        title: `A ${day === 0 ? 'Sunday' : 'Saturday'}`,
        explanation:
          'Off-the-job training must be in your normal paid working hours (not overtime). Weekend training counts only if the weekend is part of your normal paid hours, or it was agreed and paid back.',
        fix: 'If you do not normally work weekends, choose "Outside my hours" and say how you were paid back.',
        field: 'hours',
      });
    }
  }
  if (e.duration_minutes > 600) {
    flags.push({
      code: 'long_day',
      severity: 'check',
      para: '82.1',
      title: 'Longer than a working day',
      explanation:
        'Normal working hours are the hours you are normally paid for, excluding overtime. More than 10 hours in one day is unlikely to be all in normal hours.',
      fix: 'Check the duration. Split it across the days it happened if it ran over more than one.',
      field: 'duration_minutes',
    });
  }

  // 84.3 / 88 linked to the KSBs and the plan
  const codes = e.unit_codes.map((c) => c.trim()).filter(Boolean);
  if (codes.length === 0) {
    flags.push({
      code: 'not_linked',
      severity: 'check',
      para: '84.3, 88',
      title: 'Not linked to your apprenticeship',
      explanation:
        'Off-the-job training has to teach knowledge, skills or behaviours your apprenticeship needs, and be part of your training plan. Without a unit or KSB, your tutor has to guess which part it covers.',
      fix: 'Add the unit codes it covers (for example 304) or the KSB codes (for example K3, S2), and say what you learned for them.',
      field: 'unit_codes_text',
    });
  } else if (ctx.qualificationUnits && ctx.qualificationUnits.length) {
    const known = new Set(ctx.qualificationUnits.map((u) => u.toLowerCase()));
    const unknown = codes.filter((c) => !KSB_CODE.test(c) && !known.has(c.toLowerCase()));
    if (unknown.length) {
      flags.push({
        code: 'unknown_units',
        severity: 'check',
        para: '84.3',
        title: `Not a unit of your qualification: ${unknown.join(', ')}`,
        explanation:
          'Training for knowledge or skills your apprenticeship does not need does not count. These codes are not units of the qualification you are on.',
        fix: `Check the codes. Your units are ${ctx.qualificationUnits.slice(0, 12).join(', ')}${ctx.qualificationUnits.length > 12 ? ' and more' : ''}.`,
        field: 'unit_codes_text',
      });
    }
  }

  // 88 the activity is in the agreed training plan. Only when a plan is in
  // force and the entry is already linked (otherwise "not linked" says it).
  const plan = (ctx.planActivities ?? []).map((l) => l.trim()).filter(Boolean);
  if (plan.length && codes.length) {
    const mineWords = words(`${e.title} ${e.description} ${codes.join(' ')}`);
    const inPlan = plan.some((line) => {
      const lw = words(line);
      for (const w of mineWords) if (lw.has(w)) return true;
      // Unit codes written into the plan line ("Unit 304").
      return codes.some((c) => new RegExp(`\\b${c.replace(/[^a-z0-9]/gi, '')}\\b`, 'i').test(line));
    });
    if (!inPlan)
      flags.push({
        code: 'not_in_plan',
        severity: 'check',
        para: '88',
        title: 'Not in your training plan',
        explanation:
          'Off-the-job training is agreed in advance and written into your training plan. Nothing in your plan mentions this, so your tutor will need to know how it fits.',
        fix: `Say which part of your plan it is for (your plan covers ${plan
          .slice(0, 3)
          .map((l) => `"${l.length > 40 ? `${l.slice(0, 39)}…` : l}"`)
          .join(
            ', '
          )}${plan.length > 3 ? ' and more' : ''}), or ask your tutor to add it to the plan.`,
        field: 'description',
      });
  }

  // 82.4 duplicates and impossible days
  const mine = normTitle(e.title);
  const dup = ctx.sameDay.find(
    (o) =>
      (normTitle(o.title) === mine && mine.length > 0) ||
      (o.duration_minutes === e.duration_minutes && o.activity_type === e.activity_type)
  );
  if (dup) {
    const sameTitle = normTitle(dup.title) === mine && mine.length > 0;
    flags.push({
      code: 'duplicate',
      severity: sameTitle ? 'likely' : 'check',
      para: '82.4',
      title: 'Already logged that day',
      explanation: `You already have "${dup.title}" (${dup.duration_minutes} minutes) on this date. The same training counted twice puts the hours at risk for you and your college.`,
      fix: 'If it is the same training, do not send it again. If it was different, give it a title that says how.',
      field: 'title',
    });
  }
  const dayTotal =
    ctx.sameDay.reduce((n, o) => n + (o.duration_minutes || 0), 0) + e.duration_minutes;
  if (!dup && ctx.sameDay.length && dayTotal > 600) {
    flags.push({
      code: 'day_total',
      severity: 'check',
      para: '82.1',
      title: `${Math.round((dayTotal / 60) * 10) / 10} hours on one day`,
      explanation:
        'With your other entries, this day comes to more than 10 hours of training. That is unlikely to all be in your normal paid hours.',
      fix: 'Check the date and duration against your other entries for that day.',
      field: 'duration_minutes',
    });
  }

  return flags;
}

/** What the entry carries to the tutor: the codes it was sent with, and the learner's note. */
export interface OtjQualityRecord {
  v: 1;
  rules: 'funding-rules-2026-27-v3';
  checked_at: string;
  flags: Array<{ code: OtjFlagCode; severity: OtjFlag['severity']; para: string; title: string }>;
  sent_with_flags: boolean;
  learner_note: string | null;
}

export function qualityRecord(flags: OtjFlag[], note: string | null): OtjQualityRecord {
  return {
    v: 1,
    rules: 'funding-rules-2026-27-v3',
    checked_at: new Date().toISOString(),
    flags: flags.map((f) => ({ code: f.code, severity: f.severity, para: f.para, title: f.title })),
    sent_with_flags: flags.length > 0,
    learner_note: note && note.trim() ? note.trim().slice(0, 1000) : null,
  };
}
