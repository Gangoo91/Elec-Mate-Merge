/**
 * ILR 2026/27 fields: the XSD element, its entity in the specification, a plain
 * name, and where Elec-Mate holds it (the `fix` key the Data and API page opens).
 * Used to point a rule hit or a schema error at the field to fix and at the
 * field's page in the published specification (ELE-2087).
 */

export const SPEC_BASE = 'https://guidance.submit-learner-data.service.gov.uk/26-27/ilr/entity';

export interface FieldInfo {
  entity: string;
  label: string;
  fix: string | null;
}

/** XSD element name -> field. Elements Elec-Mate writes itself have fix null. */
export const ELEMENTS: Record<string, FieldInfo> = {
  UKPRN: { entity: 'LearningProvider', label: 'college UKPRN', fix: 'college:ukprn' },
  LearnRefNumber: { entity: 'Learner', label: 'learner reference', fix: 'learn_ref_number' },
  ULN: { entity: 'Learner', label: 'ULN', fix: 'uln' },
  FamilyName: { entity: 'Learner', label: 'family name', fix: 'family_name' },
  GivenNames: { entity: 'Learner', label: 'given names', fix: 'given_names' },
  DateOfBirth: { entity: 'Learner', label: 'date of birth', fix: 'date_of_birth' },
  Ethnicity: { entity: 'Learner', label: 'ethnicity code', fix: 'ethnicity' },
  Sex: { entity: 'Learner', label: 'sex', fix: 'sex' },
  LLDDHealthProb: {
    entity: 'Learner',
    label: 'learning difficulty or health problem (LLDDHealthProb)',
    fix: 'lldd_health_prob',
  },
  NINumber: { entity: 'Learner', label: 'NI number', fix: 'ni_number' },
  PostcodePrior: { entity: 'Learner', label: 'postcode before enrolment', fix: 'postcode_prior' },
  Postcode: { entity: 'Learner', label: 'current postcode', fix: 'postcode' },
  PriorLevel: { entity: 'PriorAttain', label: 'prior attainment level', fix: 'prior_level' },
  DateLevelApp: {
    entity: 'PriorAttain',
    label: 'prior attainment date',
    fix: 'prior_level_date',
  },
  LLDDCat: { entity: 'LLDDandHealthProblem', label: 'LLDD category', fix: 'lldd_cats' },
  PrimaryLLDD: {
    entity: 'LLDDandHealthProblem',
    label: 'primary LLDD category',
    fix: 'primary_lldd',
  },
  EmpStat: { entity: 'LearnerEmploymentStatus', label: 'employment status', fix: 'emp_stat' },
  DateEmpStatApp: {
    entity: 'LearnerEmploymentStatus',
    label: 'employment status date',
    fix: 'date_emp_stat_app',
  },
  EmpId: { entity: 'LearnerEmploymentStatus', label: 'employer identifier', fix: 'emp_id' },
  AgreemId: { entity: 'LearnerEmploymentStatus', label: 'agreement identifier', fix: 'agreem_id' },
  ESMCode: {
    entity: 'EmploymentStatusMonitoring',
    label: 'employment monitoring code',
    fix: 'esm_eii',
  },
  LearnAimRef: {
    entity: 'LearningDelivery',
    label: 'learning aim reference',
    fix: 'learn_aim_ref',
  },
  AimType: { entity: 'LearningDelivery', label: 'aim type', fix: 'aim_type' },
  LearnStartDate: { entity: 'LearningDelivery', label: 'start date', fix: 'record:start_date' },
  OrigLearnStartDate: {
    entity: 'LearningDelivery',
    label: 'original start date',
    fix: 'orig_learn_start_date',
  },
  LearnPlanEndDate: {
    entity: 'LearningDelivery',
    label: 'planned end date',
    fix: 'record:planned_end_date',
  },
  FundModel: { entity: 'LearningDelivery', label: 'funding model', fix: 'fund_model' },
  ProgType: { entity: 'LearningDelivery', label: 'programme type', fix: 'prog_type' },
  StdCode: { entity: 'LearningDelivery', label: 'standard code', fix: 'std_code' },
  DelLocPostCode: {
    entity: 'LearningDelivery',
    label: 'delivery location postcode',
    fix: 'del_loc_postcode',
  },
  EPAOrgID: {
    entity: 'LearningDelivery',
    label: 'end-point assessment organisation ID',
    fix: 'epa_org_id',
  },
  CompStatus: { entity: 'LearningDelivery', label: 'completion status', fix: 'comp_status' },
  LearnActEndDate: {
    entity: 'LearningDelivery',
    label: 'actual end date',
    fix: 'record:actual_end_date',
  },
  WithdrawReason: {
    entity: 'LearningDelivery',
    label: 'withdrawal reason',
    fix: 'withdraw_reason',
  },
  Outcome: { entity: 'LearningDelivery', label: 'outcome', fix: 'outcome' },
  AchDate: { entity: 'LearningDelivery', label: 'achievement date', fix: 'ach_date' },
  HRSAmount: {
    entity: 'HRSRecord',
    label: 'off-the-job hours',
    fix: 'record:planned_otj_hours',
  },
  AFinAmount: { entity: 'AppFinRecord', label: 'price amount', fix: 'tnp1_price' },
  AFinDate: { entity: 'AppFinRecord', label: 'price date', fix: null },
};

/** fix key -> XSD element, for picking the specification page of a rule hit. */
const FIX_TO_ELEMENT = new Map<string, string>(
  Object.entries(ELEMENTS)
    .filter(([, v]) => v.fix)
    .map(([k, v]) => [v.fix as string, k])
);
FIX_TO_ELEMENT.set('esm_loe', 'ESMCode');
FIX_TO_ELEMENT.set('hrs_planned_reduction', 'HRSAmount');
FIX_TO_ELEMENT.set('tnp2_price', 'AFinAmount');
FIX_TO_ELEMENT.set('record:rpl', 'AFinAmount');

export function specUrl(entity: string, field: string): string {
  return `${SPEC_BASE}/${entity}/field/${field}`;
}

/**
 * The specification page for a rule hit: the rule's field that matches where
 * the fix is, else the first field the rule reads.
 */
export function specFor(
  ruleFields: string[] | undefined,
  fix: string | null
): { field: string; url: string } | null {
  if (!ruleFields?.length) return null;
  const el = fix ? FIX_TO_ELEMENT.get(fix) : undefined;
  const pick = (el && ruleFields.find((f) => f.endsWith(`.${el}`))) || ruleFields[0];
  const [entity, field] = pick.split('.');
  return { field: pick, url: specUrl(entity, field) };
}
