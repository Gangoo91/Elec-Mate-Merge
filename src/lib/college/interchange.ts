/**
 * College Hub interchange (ELE-1884): the documented datasets behind the CSV
 * and JSON exports and the read API.
 *
 * ONE dictionary. The columns here are the columns, in order, that
 * public._college_interchange() returns and supabase/functions/college-data-api
 * serves (its DATASETS constant mirrors these keys; e2e/college/45 checks the
 * three agree). The descriptions are what the Data and API page documents, so
 * an MIS team can map an export without asking us.
 *
 * ILR column names are the ILR 2026 to 2027 XML element names (DfE, "Submit
 * learner data" guidance, specification v1):
 *   https://guidance.submit-learner-data.service.gov.uk/26-27/ilr/overview
 *   https://guidance.submit-learner-data.service.gov.uk/26-27/ilr/summaryofchanges
 * From 2026/27 off-the-job hours are an HRSRecord (HRS1 planned, HRS3 actual,
 * HRS4 planned reduction for prior learning); PHours and OTJActHours were removed.
 * This export is NOT an ILR file and is NOT validated against the ILR XSD.
 */

/** The key scopes a college admin ticks when minting a key (college_api_keys.scopes). */
export type InterchangeScope =
  'learners' | 'hours' | 'decisions' | 'attendance' | 'reviews' | 'ilr';

/** ELE-2057 reporting datasets: one row per learner, a snapshot as at now. */
export type ReportingDataset =
  'learner_progress' | 'learner_hours' | 'learner_reviews' | 'learner_risk' | 'learner_attendance';

export type InterchangeDataset = InterchangeScope | ReportingDataset;

export interface InterchangeColumn {
  key: string;
  /** What the column holds, in plain words. */
  about: string;
}

export interface InterchangeDatasetDef {
  key: InterchangeDataset;
  title: string;
  about: string;
  /** Which timestamp `since` filters on. */
  since: string;
  /** Holds special category or identity data: shown as a caution. */
  sensitive?: boolean;
  /** The key scope that unlocks it on the read API (the dataset itself for the six originals). */
  scope: InterchangeScope;
  /** ELE-2057: a per-learner snapshot for reporting; `since` is not applied. */
  reporting?: boolean;
  columns: InterchangeColumn[];
}

const LEARNER_ID: InterchangeColumn = {
  key: 'learner_id',
  about: 'Elec-Mate learner id (stable UUID). Join every dataset on this.',
};
const ULN: InterchangeColumn = {
  key: 'uln',
  about: 'Unique Learner Number, 10 digits, if recorded.',
};

export const INTERCHANGE_DATASETS: InterchangeDatasetDef[] = [
  {
    key: 'learners',
    scope: 'learners',
    title: 'Learners',
    about:
      'One row per learner on your college record, with cohort, course, employer and hours to date.',
    since: 'learner record updated',
    columns: [
      LEARNER_ID,
      { key: 'learner_reference', about: 'Your learner reference (ILR LearnRefNumber), if set.' },
      ULN,
      { key: 'name', about: 'Display name.' },
      { key: 'email', about: 'Email address on the learner record.' },
      { key: 'date_of_birth', about: 'Date of birth, YYYY-MM-DD.' },
      {
        key: 'status',
        about: 'Active, On Break, Suspended, Withdrawn, Completed, Transferred or Archived.',
      },
      { key: 'cohort_code', about: 'Cohort code.' },
      { key: 'cohort_name', about: 'Cohort name.' },
      { key: 'course_code', about: 'Course code.' },
      { key: 'course_name', about: 'Course name.' },
      { key: 'qualification_code', about: 'Qualification code the course is linked to.' },
      { key: 'start_date', about: 'Start date, YYYY-MM-DD.' },
      { key: 'planned_end_date', about: 'Planned end date, YYYY-MM-DD.' },
      { key: 'actual_end_date', about: 'Actual end of learning, YYYY-MM-DD, if ended.' },
      { key: 'employer_name', about: 'Employer on the learner record.' },
      { key: 'otj_required_hours', about: 'Planned off-the-job hours for the programme.' },
      {
        key: 'otj_verified_hours',
        about:
          'Off-the-job hours verified by the college or attested by the employer, to one decimal place.',
      },
      {
        key: 'otj_app_learning_hours',
        about:
          'Learning measured in the Elec-Mate app, in hours. Kept separate: whether it counts as eligible off-the-job time is your decision, so it is never added to otj_verified_hours.',
      },
      { key: 'risk_level', about: 'Current risk flag: Low, Medium, High or Critical.' },
      { key: 'updated_at', about: 'When the learner record last changed (ISO 8601).' },
    ],
  },
  {
    key: 'hours',
    scope: 'hours',
    title: 'Off-the-job hours',
    about: 'Every off-the-job entry with who logged it and how it was verified.',
    since: 'entry updated',
    columns: [
      { key: 'entry_id', about: 'Entry id (UUID).' },
      LEARNER_ID,
      ULN,
      { key: 'activity_date', about: 'Date of the activity, YYYY-MM-DD.' },
      { key: 'minutes', about: 'Duration in minutes.' },
      { key: 'hours', about: 'Duration in hours, two decimal places.' },
      {
        key: 'activity_type',
        about: 'workshop, theory, practical, mentoring, shadowing and so on.',
      },
      { key: 'title', about: 'What the activity was.' },
      {
        key: 'source',
        about: 'in_app, apprentice_submitted, tutor_recorded or employer_attested.',
      },
      { key: 'verification_status', about: 'pending, verified, verified_by_employer or rejected.' },
      { key: 'verified_at', about: 'When it was verified (ISO 8601).' },
      { key: 'attested_by_name', about: 'Employer attester, where attested.' },
      { key: 'in_working_hours', about: 'true if done within paid working hours.' },
      {
        key: 'iqa_verdict',
        about: 'IQA verdict if sampled: agree, partial, disagree or escalate.',
      },
      { key: 'created_at', about: 'When it was logged (ISO 8601).' },
      { key: 'updated_at', about: 'When it last changed (ISO 8601).' },
    ],
  },
  {
    key: 'decisions',
    scope: 'decisions',
    title: 'Assessment decisions',
    about:
      'Every criterion-level assessment decision, including superseded ones, with the IQA verdict.',
    since: 'decision recorded, IQA verdict or superseded',
    columns: [
      { key: 'decision_id', about: 'Decision id (UUID).' },
      LEARNER_ID,
      ULN,
      { key: 'qualification_code', about: 'Qualification code.' },
      { key: 'unit_code', about: 'Unit code.' },
      { key: 'ac_code', about: 'Assessment criterion code.' },
      { key: 'decision', about: 'passed, referred or not_yet.' },
      {
        key: 'method',
        about:
          'evidence_review, observation, professional_discussion, questioning, witness, product or imported.',
      },
      { key: 'assessor_name', about: 'Assessor who made the decision.' },
      { key: 'decided_at', about: 'When it was decided (ISO 8601).' },
      { key: 'evidence_count', about: 'Number of evidence items the decision cites.' },
      { key: 'iqa_verdict', about: 'confirmed or not_confirmed, if sampled.' },
      { key: 'iqa_at', about: 'When the IQA verdict was recorded.' },
      {
        key: 'superseded_at',
        about:
          'Set when a later decision replaced this one. Filter on empty for current decisions.',
      },
      {
        key: 'content_hash',
        about: 'SHA-256 of the decision as recorded; proves it has not changed.',
      },
    ],
  },
  {
    key: 'attendance',
    scope: 'attendance',
    title: 'Attendance',
    about: 'Every register mark.',
    since: 'mark recorded',
    columns: [
      { key: 'attendance_id', about: 'Mark id (UUID).' },
      LEARNER_ID,
      ULN,
      { key: 'date', about: 'Session date, YYYY-MM-DD.' },
      { key: 'session', about: 'Session (for example all_day, am, pm).' },
      { key: 'status', about: 'Present, Late, Absent, Authorised and so on, as marked.' },
      { key: 'cohort_code', about: 'Cohort the register belongs to.' },
      { key: 'recorded_at', about: 'When the mark was taken (ISO 8601).' },
    ],
  },
  {
    key: 'reviews',
    scope: 'reviews',
    title: 'Progress reviews',
    about:
      'Every progress review with the employer, its status and whether it was signed and locked.',
    since: 'review updated',
    columns: [
      { key: 'review_id', about: 'Review id (UUID).' },
      LEARNER_ID,
      ULN,
      { key: 'status', about: 'scheduled, in_progress, completed, cancelled or no_show.' },
      { key: 'scheduled_at', about: 'When it was booked for (ISO 8601).' },
      { key: 'held_on', about: 'Date it was held, YYYY-MM-DD.' },
      { key: 'completed_at', about: 'When it was completed.' },
      { key: 'mode', about: 'in_person, video, phone or email.' },
      { key: 'employer_attendance', about: 'attended, contributed or invited_no_response.' },
      { key: 'employer_contact_name', about: 'Employer contact for the review.' },
      { key: 'signed_and_locked_at', about: 'When the signed record was locked.' },
      { key: 'content_hash', about: 'Hash of the locked record.' },
      { key: 'updated_at', about: 'When it last changed (ISO 8601).' },
    ],
  },
  {
    key: 'ilr',
    scope: 'ilr',
    title: 'ILR fields',
    about:
      'One row per learner with columns named after ILR 2026/27 fields, for your MIS team to bring into the ILR return. Not an ILR file.',
    since: 'learner or ILR fields updated',
    sensitive: true,
    columns: [
      { key: 'UKPRN', about: 'LearningProvider.UKPRN: 8 digits (set once for the college).' },
      { key: 'LearnRefNumber', about: 'Learner reference, up to 12 letters, digits or spaces.' },
      { key: 'ULN', about: 'Unique Learner Number, 10 digits.' },
      {
        key: 'FamilyName',
        about: 'Family name, up to 100 characters. Split from the display name if not set.',
      },
      {
        key: 'GivenNames',
        about: 'Given names, up to 100 characters. Split from the display name if not set.',
      },
      { key: 'DateOfBirth', about: 'YYYY-MM-DD.' },
      { key: 'Sex', about: 'F or M.' },
      { key: 'Ethnicity', about: 'Code 31 to 47, 98 or 99.' },
      { key: 'LLDDHealthProb', about: '1, 2 or 9.' },
      { key: 'NINumber', about: 'National Insurance number, upper case, no spaces.' },
      { key: 'PriorLevel', about: 'Prior attainment level code: 1 to 10, 97, 98 or 99.' },
      { key: 'PostcodePrior', about: 'Postcode prior to enrolment, upper case.' },
      { key: 'Postcode', about: 'Current postcode, upper case.' },
      { key: 'LearnAimRef', about: 'Learning aim reference from LARS, up to 8 characters.' },
      { key: 'AimType', about: '1 programme aim, 3 component, 4 or 5.' },
      { key: 'ProgType', about: '25 apprenticeship standard; 30 to 34 as defined in the ILR.' },
      { key: 'StdCode', about: 'Standard code from LARS, up to 5 digits.' },
      { key: 'FundModel', about: 'Funding model; 36 for apprenticeships.' },
      { key: 'LearnStartDate', about: 'Start date, YYYY-MM-DD.' },
      { key: 'OrigLearnStartDate', about: 'Original start date where it differs, YYYY-MM-DD.' },
      { key: 'LearnPlanEndDate', about: 'Planned end date, YYYY-MM-DD.' },
      { key: 'LearnActEndDate', about: 'Actual end date, YYYY-MM-DD, if ended.' },
      { key: 'CompStatus', about: '1 continuing, 2 completed, 3 withdrawn, 6 break in learning.' },
      { key: 'Outcome', about: '1, 2, 3 or 8.' },
      { key: 'WithdrawReason', about: 'Withdrawal reason code, if withdrawn.' },
      { key: 'AchDate', about: 'Achievement date, YYYY-MM-DD.' },
      { key: 'DelLocPostCode', about: 'Delivery location postcode, upper case.' },
      { key: 'EPAOrgID', about: 'Assessment organisation ID, up to 8 characters.' },
      { key: 'EmpStat', about: 'Employment status: 10, 11, 12 or 98.' },
      { key: 'EmpId', about: 'Employer identifier (ERN), 9 digits.' },
      {
        key: 'AgreemId',
        about: 'Apprenticeship Service agreement ID, up to 7 characters (new for 2026/27).',
      },
      {
        key: 'HRS1_PlannedOTJHours',
        about: 'HRSRecord HRS1: planned off-the-job hours (from the learner record), whole hours.',
      },
      {
        key: 'HRS3_ActualOTJHours',
        about:
          'HRSRecord HRS3: off-the-job hours verified by the college or attested by the employer, whole hours. App learning is not included.',
      },
      {
        key: 'HRS4_PlannedReductionHours',
        about: 'HRSRecord HRS4: planned hours reduced for prior learning.',
      },
      { key: 'TNP1', about: 'Training price, whole pounds.' },
      { key: 'TNP2', about: 'End-point assessment price, whole pounds.' },
      {
        key: 'elecmate_verified_otj_hours',
        about: 'Not an ILR field. The hours behind HRS3, to one decimal place.',
      },
      {
        key: 'elecmate_app_learning_hours',
        about:
          'Not an ILR field. Learning measured in the app; decide yourselves whether any of it is eligible before adding it to HRS3.',
      },
      {
        key: 'elecmate_learner_id',
        about: 'Elec-Mate learner id, to join back to the other datasets.',
      },
    ],
  },
  /* ── ELE-2057 reporting datasets ─────────────────────────────────────
     One row per learner, snapshots as at now, stable column order, for
     Power BI and other BI tools. Each rides on an existing key scope. */
  {
    key: 'learner_progress',
    scope: 'decisions',
    reporting: true,
    title: 'Criteria progress',
    about:
      'One row per learner: how many criteria of their qualification are in each state, from the same record the learner profile shows.',
    since: 'not applied: a snapshot as at as_at',
    columns: [
      LEARNER_ID,
      ULN,
      { key: 'qualification_code', about: 'The qualification the criteria come from.' },
      { key: 'criteria_total', about: 'Criteria in the qualification.' },
      { key: 'criteria_not_started', about: 'No evidence and no decision yet.' },
      {
        key: 'criteria_suggested',
        about: 'Only suggested by the evidence assistant; not claimed.',
      },
      { key: 'criteria_claimed', about: 'The learner has mapped evidence to it.' },
      { key: 'criteria_submitted', about: 'Evidence sent and waiting for an assessment decision.' },
      { key: 'criteria_referred', about: 'Assessed and referred.' },
      { key: 'criteria_not_yet', about: 'Assessed as not yet met.' },
      { key: 'criteria_passed', about: 'Passed by an assessor, not yet sampled by IQA.' },
      { key: 'criteria_iqa_confirmed', about: 'Passed and confirmed by IQA.' },
      { key: 'criteria_iqa_rejected', about: 'Passed, then not confirmed by IQA.' },
      { key: 'criteria_achieved', about: 'criteria_passed plus criteria_iqa_confirmed.' },
      {
        key: 'achieved_percent',
        about: 'criteria_achieved as a percentage of criteria_total, one decimal place.',
      },
      { key: 'as_at', about: 'When the snapshot was taken (ISO 8601).' },
    ],
  },
  {
    key: 'learner_hours',
    scope: 'hours',
    reporting: true,
    title: 'Hours summary',
    about:
      'One row per learner: planned off-the-job hours against verified, pending and rejected, with where they should be by now.',
    since: 'not applied: a snapshot as at as_at',
    columns: [
      LEARNER_ID,
      ULN,
      { key: 'planned_otj_hours', about: 'Planned off-the-job hours for the programme.' },
      {
        key: 'verified_hours',
        about: 'Verified by the college plus attested by the employer, one decimal place.',
      },
      { key: 'college_verified_hours', about: 'Verified by the college.' },
      { key: 'employer_verified_hours', about: 'Attested by the employer.' },
      { key: 'pending_hours', about: 'Logged and waiting for verification.' },
      { key: 'rejected_hours', about: 'Logged and rejected.' },
      {
        key: 'app_learning_hours',
        about:
          'Learning measured in the app. Never included in verified_hours: whether it is eligible is your decision.',
      },
      {
        key: 'verified_percent_of_planned',
        about: 'verified_hours as a percentage of planned_otj_hours.',
      },
      { key: 'start_date', about: 'Start date, YYYY-MM-DD.' },
      { key: 'planned_end_date', about: 'Planned end date, YYYY-MM-DD.' },
      {
        key: 'expected_hours_to_date',
        about:
          'Planned hours times the share of the programme elapsed (straight line). Empty without a start, end and plan.',
      },
      {
        key: 'hours_ahead_or_behind',
        about: 'verified_hours minus expected_hours_to_date. Negative is behind.',
      },
      { key: 'as_at', about: 'When the snapshot was taken (ISO 8601).' },
    ],
  },
  {
    key: 'learner_reviews',
    scope: 'reviews',
    reporting: true,
    title: 'Review status',
    about:
      'One row per learner: progress reviews completed, the last and next, when the next is due and whether it is overdue.',
    since: 'not applied: a snapshot as at as_at',
    columns: [
      LEARNER_ID,
      ULN,
      {
        key: 'reviews_apply',
        about: 'false for a learner on an Apprenticeship Unit, which has no progress reviews.',
      },
      {
        key: 'review_frequency_months',
        about: 'Agreed review frequency, if set for this learner.',
      },
      { key: 'reviews_completed', about: 'Reviews signed off and locked.' },
      { key: 'last_review_on', about: 'Date of the last locked review, YYYY-MM-DD.' },
      { key: 'next_review_scheduled_at', about: 'The next booked review (ISO 8601).' },
      { key: 'review_due_by', about: 'When the next review is due, YYYY-MM-DD.' },
      {
        key: 'review_overdue',
        about: 'true when the due date has passed and no review is booked on or before it.',
      },
      {
        key: 'awaiting_signatures',
        about: 'Locked reviews the learner has not signed yet.',
      },
      { key: 'as_at', about: 'When the snapshot was taken (ISO 8601).' },
    ],
  },
  {
    key: 'learner_risk',
    scope: 'learners',
    reporting: true,
    title: 'Risk',
    about: 'One row per learner: the current risk level, score and the factors behind it.',
    since: 'not applied: a snapshot as at as_at',
    columns: [
      LEARNER_ID,
      ULN,
      { key: 'risk_level', about: 'low, medium, high or critical.' },
      { key: 'risk_score', about: 'The risk check score behind the level.' },
      { key: 'risk_factors', about: 'Up to five factors, separated by semicolons.' },
      { key: 'risk_computed_at', about: 'When the risk check last ran (ISO 8601).' },
      { key: 'as_at', about: 'When the snapshot was taken (ISO 8601).' },
    ],
  },
  {
    key: 'learner_attendance',
    scope: 'attendance',
    reporting: true,
    title: 'Attendance summary',
    about:
      'One row per learner: register marks and attendance, counted the way the hub counts it (present and late over all marks).',
    since: 'not applied: a snapshot as at as_at',
    columns: [
      LEARNER_ID,
      ULN,
      { key: 'sessions_marked', about: 'Register marks recorded.' },
      { key: 'present', about: 'Marked present.' },
      { key: 'late', about: 'Marked late.' },
      { key: 'absent', about: 'Marked absent.' },
      { key: 'authorised', about: 'Marked authorised absence.' },
      {
        key: 'attendance_percent',
        about: 'present plus late, over sessions_marked, one decimal place.',
      },
      { key: 'attendance_percent_last_30_days', about: 'The same over the last 30 days.' },
      { key: 'last_marked_on', about: 'Date of the latest mark, YYYY-MM-DD.' },
      { key: 'as_at', about: 'When the snapshot was taken (ISO 8601).' },
    ],
  },
];

export const INTERCHANGE_SCOPES: InterchangeScope[] = [
  'learners',
  'hours',
  'decisions',
  'attendance',
  'reviews',
  'ilr',
];

/** The original six row-level datasets, and the reporting ones. */
export const ROW_DATASETS = INTERCHANGE_DATASETS.filter((d) => !d.reporting);
export const REPORTING_DATASETS = INTERCHANGE_DATASETS.filter((d) => d.reporting);

export const DATA_API_BASE =
  'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/college-data-api';

/* ── CSV ────────────────────────────────────────────────────────────── */

function csvCell(v: unknown): string {
  if (v === null || v === undefined) return '';
  const s = typeof v === 'object' ? JSON.stringify(v) : String(v);
  // A leading = + - @ would run as a formula in a spreadsheet.
  const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
  return /[",\r\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

export function toInterchangeCsv(
  dataset: InterchangeDataset,
  rows: Record<string, unknown>[]
): string {
  const def = INTERCHANGE_DATASETS.find((d) => d.key === dataset);
  const cols = def ? def.columns.map((c) => c.key) : Object.keys(rows[0] ?? {});
  const lines = [cols.join(',')];
  for (const r of rows) lines.push(cols.map((c) => csvCell(r[c])).join(','));
  return lines.join('\r\n') + '\r\n';
}

export function downloadText(filename: string, text: string, mime: string): void {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ── ILR field pickers (codes from the ILR 2026/27 specification) ───── */

export const ILR_SEX = [
  { value: 'F', label: 'F' },
  { value: 'M', label: 'M' },
];
export const ILR_LLDD = [
  { value: '1', label: '1: has a learning difficulty, disability or health problem' },
  { value: '2', label: '2: does not' },
  { value: '9', label: '9: not provided' },
];
export const ILR_COMP_STATUS = [
  { value: '1', label: '1: continuing' },
  { value: '2', label: '2: completed' },
  { value: '3', label: '3: withdrawn' },
  { value: '6', label: '6: break in learning' },
];
export const ILR_EMP_STAT = [
  { value: '10', label: '10: in paid employment' },
  { value: '11', label: '11: not in paid employment, looking for work' },
  { value: '12', label: '12: not in paid employment, not looking for work' },
  { value: '98', label: '98: not known or not provided' },
];

/** The fields that make a learner's ILR row usable for an apprenticeship. */
export const ILR_CORE_FIELDS = [
  'uln',
  'learn_ref_number',
  'date_of_birth',
  'ni_number',
  'sex',
  'ethnicity',
  'lldd_health_prob',
  'prior_level',
  'std_code',
  'fund_model',
  'epa_org_id',
  'emp_id',
] as const;

/** A ULN is 10 digits and does not start with 0. */
export const ULN_RE = /^[1-9][0-9]{9}$/;

/* ── ILR format checks ──────────────────────────────────────────────────
   Drawn from the ILR 2026/27 field definitions (valid entries, lengths and
   what is collected for funding model 36). These are format and completeness
   checks to fix before the file goes to your MIS; they are NOT the DfE
   validation rules, which your MIS runs when it builds the return. */

export interface IlrIssue {
  field: string;
  message: string;
}

const isBlank = (v: unknown) => v === null || v === undefined || String(v).trim() === '';

export function checkIlrRow(r: Record<string, unknown>): IlrIssue[] {
  const out: IlrIssue[] = [];
  const need = (field: string, label: string) => {
    if (isBlank(r[field])) out.push({ field, message: `${label} missing` });
  };
  need('UKPRN', 'UKPRN');
  const uln = String(r.ULN ?? '');
  if (isBlank(r.ULN)) out.push({ field: 'ULN', message: 'ULN missing' });
  else if (!ULN_RE.test(uln))
    out.push({ field: 'ULN', message: 'ULN must be 10 digits, 1000000000 to 9999999999' });
  else if (uln === '9999999999')
    out.push({
      field: 'ULN',
      message: 'Temporary ULN 9999999999: not allowed for employer-funded apprenticeships',
    });
  if (isBlank(r.LearnRefNumber))
    out.push({ field: 'LearnRefNumber', message: 'Learner reference missing' });
  else if (!/^[A-Za-z0-9 ]{1,12}$/.test(String(r.LearnRefNumber)))
    out.push({
      field: 'LearnRefNumber',
      message: 'Learner reference: up to 12 letters, digits or spaces',
    });
  need('FamilyName', 'Family name');
  need('GivenNames', 'Given names');
  need('DateOfBirth', 'Date of birth');
  if (isBlank(r.Sex)) out.push({ field: 'Sex', message: 'Sex missing' });
  need('Ethnicity', 'Ethnicity');
  need('LLDDHealthProb', 'LLDDHealthProb');
  if (isBlank(r.NINumber))
    out.push({ field: 'NINumber', message: 'NI number missing (collected for apprenticeships)' });
  else if (!/^[A-Z]{2}[0-9]{6}[A-D]$/.test(String(r.NINumber)))
    out.push({ field: 'NINumber', message: 'NI number format is two letters, six digits, A to D' });
  need('PriorLevel', 'Prior attainment level');
  need('PostcodePrior', 'Postcode prior to enrolment');
  need('LearnAimRef', 'Learning aim reference');
  need('AimType', 'Aim type');
  need('ProgType', 'Programme type');
  if (String(r.ProgType ?? '') === '25') need('StdCode', 'Standard code');
  need('FundModel', 'Funding model');
  need('LearnStartDate', 'Start date');
  need('LearnPlanEndDate', 'Planned end date');
  if (
    !isBlank(r.LearnStartDate) &&
    !isBlank(r.LearnPlanEndDate) &&
    String(r.LearnPlanEndDate) < String(r.LearnStartDate)
  )
    out.push({ field: 'LearnPlanEndDate', message: 'Planned end date is before the start date' });
  if (String(r.FundModel ?? '') === '36' && isBlank(r.HRS1_PlannedOTJHours))
    out.push({
      field: 'HRS1_PlannedOTJHours',
      message: 'Planned off-the-job hours (HRS1) missing: needed for funding model 36',
    });
  need('CompStatus', 'Completion status');
  if (String(r.CompStatus ?? '') === '3') {
    need('WithdrawReason', 'Withdrawal reason');
    need('LearnActEndDate', 'Actual end date');
  }
  if (String(r.CompStatus ?? '') === '2') need('LearnActEndDate', 'Actual end date');
  need('EPAOrgID', 'Assessment organisation ID');
  need('EmpStat', 'Employment status');
  if (String(r.EmpStat ?? '') === '10') need('EmpId', 'Employer identifier');
  return out;
}
