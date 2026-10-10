/**
 * ILR 2026/27 validation rules that Elec-Mate's data can trigger (ELE-2087).
 *
 * Every check below carries the id of a rule in the published ILR Validation
 * Rules 2026 to 2027, Version 4 (10 Sep 2026), and takes its severity and
 * official error message from rules-meta.ts, which is generated from the
 * published CSV. A typo in an id fails at load, so nothing here can claim a rule
 * that is not published. The logic follows each rule's DetailedDescription and
 * Exclusions in that CSV; the plain-English message is ours.
 *
 * Checks prefixed EM_ are Elec-Mate checks, not DfE rules (for example, the
 * college UKPRN that the schema needs). They are reported separately.
 *
 * Rules that need DfE reference data (LARS, the Learner Register, postcode and
 * organisation tables, EPAO register, funding relationships) or entities we do
 * not hold are not run: README.md lists the reasons.
 */
import { PUBLISHED_RULES, type PublishedRule } from './rules-meta.ts';
import {
  AIM_TYPE,
  COMP_STATUS,
  EMP_STAT,
  ETHNICITY,
  FUND_MODEL,
  LLDD_CAT,
  LLDD_HEALTH_PROB,
  OUTCOME,
  PROG_TYPE,
  SEX,
  TEACHING_YEAR_END,
  TEACHING_YEAR_START,
  WITHDRAW_REASON,
} from './codes.ts';
import {
  addDays,
  addYears,
  londonParts,
  type DeliveryModel,
  type FileModel,
  type LearnerModel,
} from './build.ts';
import { specFor } from './fields.ts';

export interface Issue {
  rule: string;
  /** true for a published DfE rule, false for an Elec-Mate check. */
  official: boolean;
  severity: 'Error' | 'Warning';
  /** Plain English: what is wrong and what to do. */
  message: string;
  /** The published error message, for the MIS team. */
  officialMessage: string | null;
  learnerId: string | null;
  learnerName: string | null;
  /**
   * Where to fix it: an ILR field key (IlrFieldsSheet), "record:<field>" for the
   * learner record (Student 360), or "college:ukprn".
   */
  fix: string | null;
  /** The field's page in the published ILR 2026/27 specification. */
  spec: { field: string; url: string } | null;
}

const META = new Map<string, PublishedRule>(PUBLISHED_RULES.map((r) => [r.id, r]));

type Ctx = {
  file: FileModel;
  prep: string;
  hit: (rule: string, l: LearnerModel | null, fix: string | null, message: string) => void;
};
type Check = (c: Ctx) => void;

const OFFICIAL: string[] = [];
const ELEC_MATE: Record<string, { severity: 'Error' | 'Warning'; about: string }> = {
  EM_UKPRN: {
    severity: 'Error',
    about: 'The college UKPRN is set (the schema needs it in two places)',
  },
  EM_NO_LEARNERS: {
    severity: 'Error',
    about: 'The return holds at least one learner (the schema needs one)',
  },
  EM_NATION: {
    severity: 'Warning',
    about: 'The college is in England (the ILR is England’s return)',
  },
  EM_HRS3_ZERO: {
    severity: 'Warning',
    about: 'A completed or withdrawn apprentice has verified off-the-job hours',
  },
  EM_ESM_CODES: { severity: 'Warning', about: 'Employment monitoring codes come from your MIS' },
  EM_UNIT_MILESTONE: {
    severity: 'Warning',
    about:
      'Apprenticeship Unit learners: the 30% and onboarding milestone code (LDM 404) is not recorded in Elec-Mate',
  },
};
const checks: Check[] = [];

/** Register a published rule. Throws at load if the id is not in the CSV or was deleted. */
function rule(id: string, run: Check) {
  const m = META.get(id);
  if (!m) throw new Error(`ILR rule ${id} is not in the published 2026/27 rules`);
  if (m.status === 'Deleted')
    throw new Error(`ILR rule ${id} is deleted in the published 2026/27 rules`);
  OFFICIAL.push(id);
  checks.push(run);
}

// ── helpers ────────────────────────────────────────────────────────────────
const known = <T>(v: T | null | undefined): v is T => v != null && v !== ('' as unknown as T);
const inList = (v: unknown, list: readonly (string | number)[]) => list.includes(v as never);
const apps = (l: LearnerModel) => l.deliveries.filter((d) => d.ProgType === 25);
const progAims = (l: LearnerModel) => l.deliveries.filter((d) => d.AimType === 1);
const isAppProg = (d: DeliveryModel) => d.ProgType === 25 && d.AimType === 1;
const fm36Prog = (d: DeliveryModel) => d.FundModel === 36 && d.AimType === 1;
const earliestStart = (l: LearnerModel) =>
  l.deliveries
    .map((d) => d.LearnStartDate)
    .filter(known)
    .sort()[0] ?? null;
/** DD04: earliest start of the apprenticeship programme aims. */
const dd04 = (l: LearnerModel) =>
  l.deliveries
    .filter((d) => d.AimType === 1 && d.ProgType != null)
    .map((d) => d.LearnStartDate)
    .filter(known)
    .sort()[0] ?? null;
function ageOn(dob: string, on: string): number {
  const [y1, m1, d1] = dob.split('-').map(Number);
  const [y2, m2, d2] = on.split('-').map(Number);
  return y2 - y1 - (m2 < m1 || (m2 === m1 && d2 < d1) ? 1 : 0);
}
const fmt = (iso: string | null) => {
  if (!iso) return 'not set';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

/** DD01: the ULN check digit, 'Y' for 9999999999, 'N' when it cannot pass. */
export function uLNCheck(uln: string): string {
  if (uln === '9999999999') return 'Y';
  if (!/^[0-9]{10}$/.test(uln)) return 'N';
  const w = [10, 9, 8, 7, 6, 5, 4, 3, 2];
  const sum = w.reduce((a, x, i) => a + x * Number(uln[i]), 0);
  const r = sum % 11;
  if (r === 0) return 'N';
  return String(10 - r);
}
/** DD05: the employer identifier check digit, 'X' when it cannot pass. */
export function empIdCheck(id: string): string {
  if (!/^[0-9]{9}$/.test(id)) return 'X';
  const w = [9, 8, 7, 6, 5, 4, 3, 2];
  const r = 11 - (w.reduce((a, x, i) => a + x * Number(id[i]), 0) % 11);
  if (r === 11) return '0';
  if (r === 10) return 'X';
  return String(r);
}
const POSTCODE_RE = /^[A-Z]{1,2}([0-9]{1,2}|[0-9][A-Z]) [0-9][ABD-HJLNP-UW-Z]{2}$/;
const NI_RE = /^[ABCEGHJ-PRSTW-Z][ABCEGHJ-NPRSTW-Z][0-9]{6}[ABCD ]$/;
const NAME_RE = /^[^0-9\r\n\t|"]{1,100}$/;
/** Last Friday in June of a year. */
function lastFridayInJune(year: number): string {
  const dt = new Date(Date.UTC(year, 5, 30, 12));
  while (dt.getUTCDay() !== 5) dt.setUTCDate(dt.getUTCDate() - 1);
  return dt.toISOString().slice(0, 10);
}

// ── file ───────────────────────────────────────────────────────────────────
rule('R_06', ({ file, hit }) => {
  const seen = new Map<string, LearnerModel>();
  for (const l of file.learners) {
    if (!l.LearnRefNumber) continue;
    const k = l.LearnRefNumber.toUpperCase();
    const first = seen.get(k);
    if (first)
      hit(
        'R_06',
        l,
        'learn_ref_number',
        `Learner reference ${l.LearnRefNumber} is also used by ${first.name}. Each learner needs their own.`
      );
    else seen.set(k, l);
  }
});
rule('R_59', ({ file, hit }) => {
  const seen = new Map<string, LearnerModel>();
  for (const l of file.learners) {
    if (!l.ULN || l.ULN === '9999999999') continue;
    const first = seen.get(l.ULN);
    if (first)
      hit('R_59', l, 'uln', `ULN ${l.ULN} is also on ${first.name}. A ULN belongs to one learner.`);
    else seen.set(l.ULN, l);
  }
});
rule('R_07', ({ file, hit }) => {
  for (const l of file.learners) {
    const seqs = l.deliveries.map((d) => d.AimSeqNumber);
    if (new Set(seqs).size !== seqs.length)
      hit('R_07', l, null, 'Two learning aims share an aim sequence number.');
  }
});

// ── learner identity ───────────────────────────────────────────────────────
const learnerRules: Array<[string, (l: LearnerModel, c: Ctx) => void]> = [
  [
    'FD_LearnRefNumber_MA',
    (l, { hit }) => {
      if (!l.LearnRefNumber)
        hit(
          'FD_LearnRefNumber_MA',
          l,
          'learn_ref_number',
          'Add a learner reference (LearnRefNumber), the number your MIS knows them by.'
        );
    },
  ],
  [
    'FD_LearnRefNumber_AP',
    (l, { hit }) => {
      if (l.LearnRefNumber && !/^[A-Za-z0-9 ]{1,12}$/.test(l.LearnRefNumber))
        hit(
          'FD_LearnRefNumber_AP',
          l,
          'learn_ref_number',
          `Learner reference "${l.LearnRefNumber}" can only use letters, digits and spaces, up to 12.`
        );
    },
  ],
  [
    'FD_ULN_MA',
    (l, { hit }) => {
      if (!l.ULN)
        hit(
          'FD_ULN_MA',
          l,
          'uln',
          'Add the learner’s ULN (10 digits, from the Learner Record Service).'
        );
    },
  ],
  [
    'FD_ULN_AR',
    (l, { hit }) => {
      if (l.ULN && !/^[1-9][0-9]{9}$/.test(l.ULN))
        hit('FD_ULN_AR', l, 'uln', `ULN "${l.ULN}" must be 10 digits and not start with 0.`);
    },
  ],
  [
    'ULN_04',
    (l, { hit }) => {
      if (l.ULN && /^[1-9][0-9]{9}$/.test(l.ULN)) {
        const c = uLNCheck(l.ULN);
        if (c === 'N' || (c !== 'Y' && c !== l.ULN[9]))
          hit(
            'ULN_04',
            l,
            'uln',
            `ULN ${l.ULN} fails the ULN check digit, so it has been mistyped. Check it against the Learner Record Service.`
          );
      }
    },
  ],
  [
    'FamilyName_01',
    (l, { hit }) => {
      if (!l.FamilyName) hit('FamilyName_01', l, 'family_name', 'Add the learner’s family name.');
    },
  ],
  [
    'GivenNames_01',
    (l, { hit }) => {
      if (!l.GivenNames) hit('GivenNames_01', l, 'given_names', 'Add the learner’s given names.');
    },
  ],
  [
    'FD_FamilyName_AP',
    (l, { hit }) => {
      if (l.FamilyName && !NAME_RE.test(l.FamilyName))
        hit(
          'FD_FamilyName_AP',
          l,
          'family_name',
          'The family name cannot contain digits, tabs, line breaks, | or ".'
        );
    },
  ],
  [
    'FD_GivenNames_AP',
    (l, { hit }) => {
      if (l.GivenNames && !NAME_RE.test(l.GivenNames))
        hit(
          'FD_GivenNames_AP',
          l,
          'given_names',
          'Given names cannot contain digits, tabs, line breaks, | or ".'
        );
    },
  ],
  [
    'DateOfBirth_01',
    (l, { hit }) => {
      if (
        !l.DateOfBirth &&
        l.deliveries.some((d) => inList(d.FundModel, [25, 82, 35, 36, 37, 38, 39, 81]))
      )
        hit(
          'DateOfBirth_01',
          l,
          'date_of_birth',
          'Add the learner’s date of birth. It is required for funded learning.'
        );
    },
  ],
  [
    'DateOfBirth_24',
    (l, { hit }) => {
      if (!l.DateOfBirth && l.ULN && l.ULN !== '9999999999')
        hit(
          'DateOfBirth_24',
          l,
          'date_of_birth',
          'A ULN is recorded, so the date of birth must be too.'
        );
    },
  ],
  [
    'DateOfBirth_04',
    (l, { hit }) => {
      if (l.DateOfBirth && ageOn(l.DateOfBirth, TEACHING_YEAR_START) >= 115)
        hit(
          'DateOfBirth_04',
          l,
          'date_of_birth',
          `Date of birth ${fmt(l.DateOfBirth)} makes the learner 115 or over. Check the year.`
        );
    },
  ],
  [
    'DateOfBirth_48',
    (l, { hit }) => {
      const start = dd04(l);
      if (!l.DateOfBirth || !start || start < '2016-08-01' || !apps(l).length) return;
      const sixteen = addYears(l.DateOfBirth, 16);
      const [y, m] = sixteen.split('-').map(Number);
      const juneYear = m >= 9 ? y + 1 : y;
      if (start <= lastFridayInJune(juneYear))
        hit(
          'DateOfBirth_48',
          l,
          'date_of_birth',
          `An apprenticeship cannot start before the last Friday in June of the school year the learner turns 16 (${fmt(lastFridayInJune(juneYear))}). Check the date of birth or the start date.`
        );
    },
  ],
  [
    'FD_Ethnicity_MA',
    (l, { hit }) => {
      if (l.Ethnicity == null)
        hit(
          'FD_Ethnicity_MA',
          l,
          'ethnicity',
          'Add the ethnicity code (use 99 if the learner chose not to say).'
        );
    },
  ],
  [
    'Ethnicity_01',
    (l, { hit }) => {
      if (l.Ethnicity != null && !inList(l.Ethnicity, ETHNICITY))
        hit(
          'Ethnicity_01',
          l,
          'ethnicity',
          `Ethnicity code ${l.Ethnicity} is not on the 2026/27 list (31 to 47, 98 or 99).`
        );
    },
  ],
  [
    'FD_Sex_MA',
    (l, { hit }) => {
      if (!l.Sex) hit('FD_Sex_MA', l, 'sex', 'Add the learner’s sex (F or M).');
    },
  ],
  [
    'Sex_01',
    (l, { hit }) => {
      if (l.Sex && !inList(l.Sex, SEX)) hit('Sex_01', l, 'sex', `Sex "${l.Sex}" must be F or M.`);
    },
  ],
  [
    'FD_LLDDHealthProb_MA',
    (l, { hit }) => {
      if (l.LLDDHealthProb == null)
        hit(
          'FD_LLDDHealthProb_MA',
          l,
          'lldd_health_prob',
          'Say whether the learner has a learning difficulty, disability or health problem (1 yes, 2 no, 9 not provided).'
        );
    },
  ],
  [
    'LLDDHealthProb_01',
    (l, { hit }) => {
      if (l.LLDDHealthProb != null && !inList(l.LLDDHealthProb, LLDD_HEALTH_PROB))
        hit(
          'LLDDHealthProb_01',
          l,
          'lldd_health_prob',
          `LLDDHealthProb ${l.LLDDHealthProb} must be 1, 2 or 9.`
        );
    },
  ],
  [
    'LLDDHealthProb_06',
    (l, { hit }) => {
      if (l.LLDDHealthProb !== 1 || l.lldd.length) return;
      if (l.deliveries.every((d) => d.FundModel === 99)) return;
      const first = earliestStart(l);
      if (l.DateOfBirth && first && ageOn(l.DateOfBirth, first) >= 25) return;
      hit(
        'LLDDHealthProb_06',
        l,
        'lldd_cats',
        'The learner has a learning difficulty, disability or health problem, so add at least one category and mark the primary one.'
      );
    },
  ],
  [
    'LLDDHealthProb_04',
    (l, { hit }) => {
      if (l.LLDDHealthProb === 2 && l.lldd.length)
        hit(
          'LLDDHealthProb_04',
          l,
          'lldd_cats',
          'Categories are recorded but LLDDHealthProb says the learner has none. Remove the categories or change it to 1.'
        );
    },
  ],
  [
    'LLDDCat_01',
    (l, { hit }) => {
      for (const x of l.lldd)
        if (!inList(x.LLDDCat, LLDD_CAT))
          hit(
            'LLDDCat_01',
            l,
            'lldd_cats',
            `LLDD category ${x.LLDDCat} is not on the 2026/27 list.`
          );
    },
  ],
  [
    'PrimaryLLDD_04',
    (l, { hit }) => {
      if (l.lldd.length === 1 && !l.lldd[0].PrimaryLLDD)
        hit(
          'PrimaryLLDD_04',
          l,
          'primary_lldd',
          'There is one LLDD category, so mark it as the primary one.'
        );
    },
  ],
  [
    'NINumber_01',
    (l, { hit }) => {
      if (l.NINumber && !NI_RE.test(l.NINumber.length === 8 ? `${l.NINumber} ` : l.NINumber))
        hit(
          'NINumber_01',
          l,
          'ni_number',
          `NI number "${l.NINumber}" is not in the right format: two letters, six digits, then A, B, C or D.`
        );
    },
  ],
  [
    'NINumber_02',
    (l, { hit }) => {
      if (
        !l.NINumber &&
        l.deliveries.some((d) => d.fams.some((f) => f.type === 'ACT' && f.code === '1'))
      )
        hit('NINumber_02', l, 'ni_number', 'Apprentices need an NI number. Add it.');
    },
  ],
  [
    'FD_PostcodePrior_MA',
    (l, { hit }) => {
      if (!l.PostcodePrior)
        hit(
          'FD_PostcodePrior_MA',
          l,
          'postcode_prior',
          'Add the postcode the learner lived at before enrolling (ZZ99 9ZZ if not known).'
        );
    },
  ],
  [
    'PostcodePrior_02',
    (l, { hit }) => {
      if (l.PostcodePrior && !POSTCODE_RE.test(l.PostcodePrior))
        hit(
          'PostcodePrior_02',
          l,
          'postcode_prior',
          `Postcode before enrolment "${l.PostcodePrior}" is not a valid UK postcode format.`
        );
    },
  ],
  [
    'FD_Postcode_MA',
    (l, { hit }) => {
      if (!l.Postcode)
        hit(
          'FD_Postcode_MA',
          l,
          'postcode',
          'Add the learner’s current postcode (ZZ99 9ZZ if not known).'
        );
    },
  ],
  [
    'Postcode_15',
    (l, { hit }) => {
      if (l.Postcode && !POSTCODE_RE.test(l.Postcode))
        hit(
          'Postcode_15',
          l,
          'postcode',
          `Current postcode "${l.Postcode}" is not a valid UK postcode format.`
        );
    },
  ],
  [
    'PriorAttain_01',
    (l, { hit }) => {
      if (l.prior) return;
      if (l.deliveries.length && l.deliveries.every((d) => inList(d.FundModel, [99, 25, 82, 11])))
        return;
      hit('PriorAttain_01', l, 'prior_level', 'Add the learner’s prior attainment level.');
    },
  ],
  [
    'PriorAttain_09',
    (l, { hit, prep }) => {
      if (l.prior?.DateLevelApp && l.prior.DateLevelApp > prep)
        hit(
          'PriorAttain_09',
          l,
          'prior_level_date',
          `The prior attainment date ${fmt(l.prior.DateLevelApp)} is after today. Check it.`
        );
    },
  ],
  [
    'R_131',
    (l, { hit }) => {
      const first = earliestStart(l);
      if (!l.prior?.DateLevelApp || !first) return;
      if (!l.deliveries.some((d) => inList(d.FundModel, [36, 35, 37, 38, 39, 99, 81]))) return;
      if (l.prior.DateLevelApp > first)
        hit(
          'R_131',
          l,
          'prior_level_date',
          `The prior attainment date (${fmt(l.prior.DateLevelApp)}) must be on or before the start date (${fmt(first)}).`
        );
    },
  ],

  // ── employment ──────────────────────────────────────────────────────────
  [
    'EmpStat_09',
    (l, { hit }) => {
      for (const d of l.deliveries.filter(isAppProg)) {
        if (!d.LearnStartDate || d.LearnStartDate < '2014-08-01') continue;
        if (!l.emp?.DateEmpStatApp || l.emp.DateEmpStatApp >= d.LearnStartDate)
          hit(
            'EmpStat_09',
            l,
            l.emp ? 'date_emp_stat_app' : 'emp_stat',
            l.emp
              ? 'The employment status date must be before the apprenticeship start date.'
              : 'Add the learner’s employment status at the start (10 for employed).'
          );
      }
    },
  ],
  [
    'EmpStat_05',
    (l, { hit }) => {
      if (l.emp?.EmpStat != null && !inList(l.emp.EmpStat, EMP_STAT))
        hit(
          'EmpStat_05',
          l,
          'emp_stat',
          `Employment status ${l.emp.EmpStat} must be 10, 11, 12 or 98.`
        );
    },
  ],
  [
    'EmpStat_15',
    (l, { hit }) => {
      if (
        l.emp?.EmpStat === 98 &&
        l.deliveries.some((d) => isAppProg(d) && (d.LearnStartDate ?? '') >= '2016-08-01')
      )
        hit(
          'EmpStat_15',
          l,
          'emp_stat',
          'An apprentice’s employment status at the start cannot be "not known". Record it (10 for employed).'
        );
    },
  ],
  [
    'EmpStat_12',
    (l, { hit }) => {
      if (l.emp && l.emp.EmpStat !== 10 && l.deliveries.some(isAppProg))
        hit(
          'EmpStat_12',
          l,
          'emp_stat',
          'Apprentices should be in paid employment (10) at the start. Check the employment status.'
        );
    },
  ],
  [
    'EmpId_02',
    (l, { hit }) => {
      const id = l.emp?.EmpId;
      if (id == null || id === 999999999) return;
      const s = String(id);
      if (empIdCheck(s) !== s[8])
        hit(
          'EmpId_02',
          l,
          'emp_id',
          `Employer identifier ${s} fails its check digit, so it has been mistyped. Check the ERN.`
        );
    },
  ],
  [
    'EmpId_10',
    (l, { hit }) => {
      if (l.emp?.EmpStat === 10 && l.emp.EmpId == null && l.deliveries.some(isAppProg))
        hit(
          'EmpId_10',
          l,
          'emp_id',
          'The apprentice is employed, so add the employer identifier (the 9-digit ERN).'
        );
    },
  ],
  [
    'EmpId_14',
    (l, { hit }) => {
      if (l.emp && inList(l.emp.EmpStat, [11, 12]) && l.emp.EmpId != null && apps(l).length)
        hit(
          'EmpId_14',
          l,
          'emp_id',
          'An employer identifier is recorded but the learner is not in paid employment. Remove one or the other.'
        );
    },
  ],
  [
    'DateEmpStatApp_01',
    (l, { hit }) => {
      if (l.emp?.DateEmpStatApp && l.emp.DateEmpStatApp > TEACHING_YEAR_END)
        hit(
          'DateEmpStatApp_01',
          l,
          'date_emp_stat_app',
          `The employment status date ${fmt(l.emp.DateEmpStatApp)} is after the 2026/27 year.`
        );
    },
  ],
  [
    'DateEmpStatApp_02',
    (l, { hit }) => {
      if (l.emp?.DateEmpStatApp && l.emp.DateEmpStatApp < '1990-08-01')
        hit(
          'DateEmpStatApp_02',
          l,
          'date_emp_stat_app',
          'The employment status date cannot be before 1 August 1990.'
        );
    },
  ],
  [
    'ESMType_02',
    (l, { hit }) => {
      if (
        l.emp?.EmpStat === 10 &&
        (l.emp.DateEmpStatApp ?? '9999') >= '2012-08-01' &&
        l.emp.EII == null
      )
        hit(
          'ESMType_02',
          l,
          'esm_eii',
          'The learner is employed, so add the employment intensity code (EII) from your MIS.'
        );
    },
  ],
  [
    'ESMType_09',
    (l, { hit }) => {
      if (
        l.emp?.EmpStat === 10 &&
        (l.emp.DateEmpStatApp ?? '9999') >= '2013-08-01' &&
        l.emp.LOE == null &&
        l.deliveries.some(isAppProg)
      )
        hit(
          'ESMType_09',
          l,
          'esm_loe',
          'The apprentice is employed, so add the length of employment code (LOE) from your MIS.'
        );
    },
  ],
];

// ── learning delivery ──────────────────────────────────────────────────────
type DRule = (l: LearnerModel, d: DeliveryModel, c: Ctx) => void;
const dRules: Array<[string, DRule]> = [
  [
    'FD_LearnAimRef_MA',
    (l, d, { hit }) => {
      if (!d.LearnAimRef)
        hit('FD_LearnAimRef_MA', l, 'learn_aim_ref', 'Add the learning aim reference from LARS.');
    },
  ],
  [
    'FD_AimType_MA',
    (l, d, { hit }) => {
      if (d.AimType == null)
        hit(
          'FD_AimType_MA',
          l,
          'aim_type',
          'Add the aim type (1 programme aim, 3 component, 4 not part of a programme).'
        );
    },
  ],
  [
    'AimType_01',
    (l, d, { hit }) => {
      if (d.AimType != null && !inList(d.AimType, AIM_TYPE))
        hit('AimType_01', l, 'aim_type', `Aim type ${d.AimType} must be 1, 3, 4 or 5.`);
    },
  ],
  [
    'FD_FundModel_MA',
    (l, d, { hit }) => {
      if (d.FundModel == null)
        hit('FD_FundModel_MA', l, 'fund_model', 'Add the funding model (36 for apprenticeships).');
    },
  ],
  [
    'FundModel_01',
    (l, d, { hit }) => {
      if (d.FundModel == null) return;
      if (!(d.FundModel in FUND_MODEL))
        return hit(
          'FundModel_01',
          l,
          'fund_model',
          `Funding model ${d.FundModel} is not on the 2026/27 list.`
        );
      const to = FUND_MODEL[d.FundModel];
      if (to && d.LearnStartDate && d.LearnStartDate > to)
        hit(
          'FundModel_01',
          l,
          'fund_model',
          `Funding model ${d.FundModel} closed to starts after ${fmt(to)}.`
        );
    },
  ],
  [
    'ProgType_03',
    (l, d, { hit }) => {
      if (d.ProgType != null && !inList(d.ProgType, PROG_TYPE))
        hit(
          'ProgType_03',
          l,
          'prog_type',
          `Programme type ${d.ProgType} is not on the 2026/27 list (25 for an apprenticeship standard).`
        );
    },
  ],
  [
    'StdCode_01',
    (l, d, { hit }) => {
      if (d.ProgType === 25 && d.StdCode == null)
        hit('StdCode_01', l, 'std_code', 'Add the apprenticeship standard code from LARS.');
    },
  ],
  [
    'StdCode_03',
    (l, d, { hit }) => {
      if (d.ProgType !== 25 && d.StdCode != null)
        hit(
          'StdCode_03',
          l,
          'std_code',
          'A standard code is recorded but the programme type is not 25. Set programme type 25 or remove the standard code.'
        );
    },
  ],
  [
    'FD_LearnStartDate_MA',
    (l, d, { hit }) => {
      if (!d.LearnStartDate)
        hit(
          'FD_LearnStartDate_MA',
          l,
          'record:start_date',
          'Add the start date on the learner record.'
        );
    },
  ],
  [
    'FD_LearnPlanEndDate_MA',
    (l, d, { hit }) => {
      if (!d.LearnPlanEndDate)
        hit(
          'FD_LearnPlanEndDate_MA',
          l,
          'record:planned_end_date',
          'Add the planned end date on the learner record.'
        );
    },
  ],
  [
    'LearnStartDate_02',
    (l, d, { hit }) => {
      if (d.LearnStartDate && d.LearnStartDate < addYears(TEACHING_YEAR_START, -10))
        hit(
          'LearnStartDate_02',
          l,
          'record:start_date',
          `Start date ${fmt(d.LearnStartDate)} is more than 10 years ago. Check it.`
        );
    },
  ],
  [
    'LearnStartDate_03',
    (l, d, { hit }) => {
      if (d.FundModel === 36 || d.FundModel === 37 || d.ProgType === 31) return;
      if (d.LearnStartDate && d.LearnStartDate > TEACHING_YEAR_END)
        hit(
          'LearnStartDate_03',
          l,
          'record:start_date',
          `Start date ${fmt(d.LearnStartDate)} is after the 2026/27 year.`
        );
    },
  ],
  [
    'LearnStartDate_05',
    (l, d, { hit }) => {
      if (l.DateOfBirth && d.LearnStartDate && l.DateOfBirth >= d.LearnStartDate)
        hit(
          'LearnStartDate_05',
          l,
          'date_of_birth',
          'The start date is on or before the date of birth. Check both.'
        );
    },
  ],
  [
    'LearnStartDate_12',
    (l, d, { hit }) => {
      if (
        d.ProgType === 25 &&
        d.LearnStartDate &&
        d.LearnStartDate > addYears(TEACHING_YEAR_END, 1)
      )
        hit(
          'LearnStartDate_12',
          l,
          'record:start_date',
          `Start date ${fmt(d.LearnStartDate)} is more than a year after the 2026/27 year.`
        );
    },
  ],
  [
    'LearnPlanEndDate_02',
    (l, d, { hit }) => {
      if (d.LearnStartDate && d.LearnPlanEndDate && d.LearnPlanEndDate < d.LearnStartDate)
        hit(
          'LearnPlanEndDate_02',
          l,
          'record:planned_end_date',
          'The planned end date is before the start date.'
        );
    },
  ],
  [
    'LearnPlanEndDate_03',
    (l, d, { hit }) => {
      if (
        d.LearnStartDate &&
        d.LearnPlanEndDate &&
        d.LearnPlanEndDate >= addYears(d.LearnStartDate, 10)
      )
        hit(
          'LearnPlanEndDate_03',
          l,
          'record:planned_end_date',
          'The planned end date is 10 years or more after the start date.'
        );
    },
  ],
  [
    'LearnActEndDate_01',
    (l, d, { hit }) => {
      if (d.LearnActEndDate && d.LearnStartDate && d.LearnActEndDate < d.LearnStartDate)
        hit(
          'LearnActEndDate_01',
          l,
          'record:actual_end_date',
          'The actual end date is before the start date.'
        );
    },
  ],
  [
    'LearnActEndDate_04',
    (l, d, { hit, prep }) => {
      if (d.LearnActEndDate && d.LearnActEndDate > prep)
        hit(
          'LearnActEndDate_04',
          l,
          'record:actual_end_date',
          `The actual end date ${fmt(d.LearnActEndDate)} is in the future. It must be on or before today.`
        );
    },
  ],
  [
    'OrigLearnStartDate_01',
    (l, d, { hit }) => {
      if (
        d.OrigLearnStartDate &&
        d.LearnStartDate &&
        d.OrigLearnStartDate < addYears(d.LearnStartDate, -10)
      )
        hit(
          'OrigLearnStartDate_01',
          l,
          'orig_learn_start_date',
          'The original start date is more than 10 years before the start date.'
        );
    },
  ],
  [
    'OrigLearnStartDate_02',
    (l, d, { hit }) => {
      if (d.OrigLearnStartDate && d.LearnStartDate && d.OrigLearnStartDate >= d.LearnStartDate)
        hit(
          'OrigLearnStartDate_02',
          l,
          'orig_learn_start_date',
          'The original start date must be before the start date. Leave it blank unless the learner restarted.'
        );
    },
  ],
  [
    'OrigLearnStartDate_03',
    (l, d, { hit }) => {
      if (d.OrigLearnStartDate && inList(d.FundModel, [25, 82]))
        hit(
          'OrigLearnStartDate_03',
          l,
          'orig_learn_start_date',
          'An original start date cannot be returned for 16 to 19 funding. Remove it.'
        );
    },
  ],
  [
    'FD_CompStatus_MA',
    (l, d, { hit }) => {
      if (d.CompStatus == null)
        hit(
          'FD_CompStatus_MA',
          l,
          'comp_status',
          'An actual end date is recorded, so set the completion status (2 completed, 3 withdrawn, 6 break in learning).'
        );
    },
  ],
  [
    'CompStatus_01',
    (l, d, { hit }) => {
      if (d.CompStatus != null && !inList(d.CompStatus, COMP_STATUS))
        hit(
          'CompStatus_01',
          l,
          'comp_status',
          `Completion status ${d.CompStatus} must be 1, 2, 3 or 6.`
        );
    },
  ],
  [
    'CompStatus_03',
    (l, d, { hit }) => {
      if (!d.LearnActEndDate && d.CompStatus != null && d.CompStatus !== 1)
        hit(
          'CompStatus_03',
          l,
          'record:actual_end_date',
          'The completion status says the learning has ended, so add the actual end date on the learner record.'
        );
    },
  ],
  [
    'CompStatus_04',
    (l, d, { hit }) => {
      if (d.Outcome == null && d.CompStatus != null && d.CompStatus !== 1)
        hit(
          'CompStatus_04',
          l,
          'outcome',
          'The learning has ended, so add the outcome (8 if it is not known yet).'
        );
    },
  ],
  [
    'CompStatus_10',
    (l, d, { hit }) => {
      if (d.FundModel === 36 && d.ProgType === 25 && d.Outcome === 1 && d.CompStatus === 1)
        hit(
          'CompStatus_10',
          l,
          'comp_status',
          'The outcome is achieved, so the completion status cannot be continuing. Set it to 2 (completed).'
        );
    },
  ],
  [
    'Outcome_01',
    (l, d, { hit }) => {
      if (d.Outcome != null && !inList(d.Outcome, OUTCOME))
        hit('Outcome_01', l, 'outcome', `Outcome ${d.Outcome} must be 1, 2, 3 or 8.`);
    },
  ],
  [
    'Outcome_04',
    (l, d, { hit }) => {
      if (d.AchDate && d.Outcome !== 1 && !(d.FundModel === 36 && d.ProgType === 25))
        hit(
          'Outcome_04',
          l,
          'ach_date',
          'An achievement date is recorded but the outcome is not achieved (1).'
        );
    },
  ],
  [
    'Outcome_05',
    (l, d, { hit }) => {
      if (d.Outcome === 1 && !d.LearnActEndDate && !(d.FundModel === 37 && d.ProgType === 32))
        hit(
          'Outcome_05',
          l,
          'record:actual_end_date',
          'The outcome is achieved, so add the actual end date on the learner record.'
        );
    },
  ],
  [
    'Outcome_11',
    (l, d, { hit }) => {
      if (d.Outcome != null && !d.LearnActEndDate && !(d.FundModel === 37 && d.ProgType === 32))
        hit(
          'Outcome_11',
          l,
          'record:actual_end_date',
          'An outcome is recorded, so add the actual end date on the learner record.'
        );
    },
  ],
  [
    'WithdrawReason_02',
    (l, d, { hit }) => {
      if (d.WithdrawReason != null && !inList(d.WithdrawReason, WITHDRAW_REASON))
        hit(
          'WithdrawReason_02',
          l,
          'withdraw_reason',
          `Withdrawal reason ${d.WithdrawReason} is not on the 2026/27 list.`
        );
    },
  ],
  [
    'WithdrawReason_03',
    (l, d, { hit }) => {
      if (d.CompStatus === 3 && d.WithdrawReason == null)
        hit(
          'WithdrawReason_03',
          l,
          'withdraw_reason',
          'The learner has withdrawn, so add the withdrawal reason.'
        );
    },
  ],
  [
    'WithdrawReason_04',
    (l, d, { hit }) => {
      if (inList(d.CompStatus, [1, 2, 6]) && d.WithdrawReason != null)
        hit(
          'WithdrawReason_04',
          l,
          'withdraw_reason',
          'A withdrawal reason is recorded but the learner has not withdrawn. Remove it.'
        );
    },
  ],
  [
    'AchDate_03',
    (l, d, { hit }) => {
      if (
        d.AchDate &&
        d.LearnStartDate &&
        d.AchDate < d.LearnStartDate &&
        !(d.FundModel === 37 && d.ProgType === 32)
      )
        hit('AchDate_03', l, 'ach_date', 'The achievement date is before the start date.');
    },
  ],
  [
    'AchDate_04',
    (l, d, { hit }) => {
      if (d.AchDate && !d.LearnActEndDate && !(d.FundModel === 37 && d.ProgType === 32))
        hit(
          'AchDate_04',
          l,
          'record:actual_end_date',
          'An achievement date is recorded, so add the actual end date on the learner record.'
        );
    },
  ],
  [
    'AchDate_05',
    (l, d, { hit }) => {
      if (
        d.AchDate &&
        d.LearnActEndDate &&
        d.AchDate < d.LearnActEndDate &&
        !(d.FundModel === 37 && d.ProgType === 32)
      )
        hit(
          'AchDate_05',
          l,
          'ach_date',
          'The achievement date must be on or after the actual end date.'
        );
    },
  ],
  [
    'AchDate_07',
    (l, d, { hit, prep }) => {
      if (d.AchDate && d.AchDate > prep)
        hit(
          'AchDate_07',
          l,
          'ach_date',
          `The achievement date ${fmt(d.AchDate)} is in the future.`
        );
    },
  ],
  [
    'AchDate_14',
    (l, d, { hit }) => {
      if (d.AchDate && d.AimType !== 1)
        hit(
          'AchDate_14',
          l,
          'aim_type',
          'An achievement date can only go on a programme aim (aim type 1).'
        );
    },
  ],
  [
    'FD_DelLocPostCode_MA',
    (l, d, { hit }) => {
      if (!d.DelLocPostCode)
        hit(
          'FD_DelLocPostCode_MA',
          l,
          'del_loc_postcode',
          'Add the delivery location postcode (where most of the training happens).'
        );
    },
  ],
  [
    'DelLocPostCode_11',
    (l, d, { hit }) => {
      if (d.DelLocPostCode && !POSTCODE_RE.test(d.DelLocPostCode))
        hit(
          'DelLocPostCode_11',
          l,
          'del_loc_postcode',
          `Delivery postcode "${d.DelLocPostCode}" is not a valid UK postcode format.`
        );
    },
  ],
  [
    'HRSType_01',
    (l, d, { hit }) => {
      if (
        fm36Prog(d) &&
        (d.LearnStartDate ?? '') >= '2019-08-01' &&
        !d.hrs.some((h) => h.code === 1)
      )
        hit(
          'HRSType_01',
          l,
          'record:planned_otj_hours',
          'Add the planned off-the-job hours (HRS1). Build or issue the training plan, which sets them.'
        );
    },
  ],
  [
    'HRSAmount_03',
    (l, d, { hit }) => {
      const h = d.hrs.find((x) => x.code === 1);
      if (h && d.FundModel === 36 && (d.LearnStartDate ?? '') >= '2025-08-01' && h.amount < 187)
        hit(
          'HRSAmount_03',
          l,
          'record:planned_otj_hours',
          `Planned off-the-job hours are ${h.amount}. For starts from 1 August 2025 they cannot be below 187.`
        );
    },
  ],
  [
    'FD_HRSAmount_AR',
    (l, d, { hit }) => {
      for (const h of d.hrs)
        if (h.amount < 0 || h.amount > 9999)
          hit(
            'FD_HRSAmount_AR',
            l,
            h.code === 4 ? 'hrs_planned_reduction' : 'record:planned_otj_hours',
            `HRS${h.code} is ${h.amount} hours. It must be 0 to 9999.`
          );
    },
  ],
  [
    'HRSType_07',
    (l, d, { hit }) => {
      if (d.hrs.some((h) => h.code === 3) && d.AimType !== 1)
        hit(
          'HRSType_07',
          l,
          null,
          'Actual off-the-job hours (HRS3) can only go on the programme aim.'
        );
    },
  ],
  [
    'HRSType_08',
    (l, d, { hit }) => {
      if (
        fm36Prog(d) &&
        (d.LearnStartDate ?? '') >= '2019-08-01' &&
        d.CompStatus === 2 &&
        !d.hrs.some((h) => h.code === 3)
      )
        hit(
          'HRSType_08',
          l,
          null,
          'The apprenticeship has completed, so actual off-the-job hours (HRS3) must be returned.'
        );
    },
  ],
  [
    'HRSType_09',
    (l, d, { hit }) => {
      if (
        fm36Prog(d) &&
        (d.LearnStartDate ?? '') >= '2022-08-01' &&
        d.CompStatus === 3 &&
        !d.hrs.some((h) => h.code === 3)
      )
        hit(
          'HRSType_09',
          l,
          null,
          'The apprentice has withdrawn, so actual off-the-job hours (HRS3) must be returned.'
        );
    },
  ],
  [
    'HRSType_13',
    (l, d, { hit }) => {
      if (d.hrs.some((h) => inList(h.code, [1, 3, 4])) && d.FundModel !== 36)
        hit(
          'HRSType_13',
          l,
          'fund_model',
          'Off-the-job hours (HRS1, 3 and 4) can only be returned for apprenticeships (funding model 36).'
        );
    },
  ],
  [
    'HRSType_14',
    (l, d, { hit }) => {
      if (d.FundModel === 36 && d.hrs.some((h) => inList(h.code, [2, 5, 6])))
        hit('HRSType_14', l, null, 'HRS2, 5 and 6 cannot be returned for an apprenticeship.');
    },
  ],
  [
    'HRSType_18',
    (l, d, { hit }) => {
      const codes = d.hrs.map((h) => h.code);
      if (new Set(codes).size !== codes.length)
        hit('HRSType_18', l, null, 'The same hours code is on this aim twice.');
    },
  ],
  [
    'AFinType_12',
    (l, d, { hit }) => {
      if (fm36Prog(d) && !d.afin.some((a) => a.type === 'TNP'))
        hit(
          'AFinType_12',
          l,
          'tnp1_price',
          'Add the training price (TNP1) and the end-point assessment price (TNP2).'
        );
    },
  ],
  [
    'EPAOrgID_03',
    (l, d, { hit }) => {
      if (d.EPAOrgID && !d.afin.some((a) => a.type === 'TNP' && (a.code === 2 || a.code === 4)))
        hit(
          'EPAOrgID_03',
          l,
          'tnp2_price',
          'An assessment organisation is recorded, so add the end-point assessment price (TNP2).'
        );
    },
  ],
  [
    'FD_AFinAmount_AR',
    (l, d, { hit }) => {
      for (const a of d.afin)
        if (a.amount < 0 || a.amount > 999999)
          hit(
            'FD_AFinAmount_AR',
            l,
            a.type === 'TNP' ? `tnp${a.code}_price` : 'record:rpl',
            `${a.type}${a.code} is £${a.amount}. It must be £0 to £999,999.`
          );
    },
  ],
  [
    'R_119',
    (l, d, { hit }) => {
      if ((d.LearnStartDate ?? '') < '2019-02-01' || !d.afin.some((a) => a.type === 'TNP')) return;
      if (d.afin.some((a) => a.date && d.LearnStartDate && a.date < d.LearnStartDate))
        hit('R_119', l, null, 'A price record is dated before the start date.');
    },
  ],
  [
    'AFinDate_09',
    (l, d, { hit }) => {
      if (!isAppProg(d) || !d.LearnStartDate) return;
      if (d.afin.some((a) => a.date && a.date < addYears(d.LearnStartDate!, -1)))
        hit(
          'AFinDate_09',
          l,
          null,
          'A price record is dated more than a year before the start date.'
        );
    },
  ],
  [
    'R_161',
    (l, d, { hit }) => {
      if (d.hrs.some((h) => h.code === 4) && !d.afin.some((a) => a.type === 'RIP' && a.code === 1))
        hit(
          'R_161',
          l,
          'record:rpl',
          'Hours were removed for prior learning (HRS4), so the price reduction (RIP1) must go out too. Record the funding band maximum and the agreed price with the prior learning decision.'
        );
    },
  ],
  [
    'R_162',
    (l, d, { hit }) => {
      if (d.afin.some((a) => a.type === 'RIP' && a.code === 1) && !d.hrs.some((h) => h.code === 4))
        hit(
          'R_162',
          l,
          'hrs_planned_reduction',
          'A price reduction for prior learning is recorded, so the hours removed (HRS4) must be too.'
        );
    },
  ],
  [
    'AFinType_15',
    (l, d, { hit }) => {
      const r = d.afin.find((a) => a.type === 'RIP' && a.code === 1);
      if (r && r.amount > 18000)
        hit(
          'AFinType_15',
          l,
          'record:rpl',
          `The price reduction for prior learning is £${r.amount}. It cannot be more than £18,000.`
        );
    },
  ],
  [
    'AFinType_16',
    (l, d, { hit }) => {
      const r = d.afin.find((a) => a.type === 'RIP' && a.code === 1);
      if (r && r.amount < 5)
        hit(
          'AFinType_16',
          l,
          'record:rpl',
          `The price reduction for prior learning is £${r.amount}. It cannot be less than £5.`
        );
    },
  ],
];

for (const [id, fn] of learnerRules)
  rule(id, (c) => {
    for (const l of c.file.learners) fn(l, c);
  });
for (const [id, fn] of dRules)
  rule(id, (c) => {
    for (const l of c.file.learners) for (const d of l.deliveries) fn(l, d, c);
  });
// R_31 looks across a learner's aims.
rule('R_31', ({ file, hit }) => {
  for (const l of file.learners)
    for (const p of progAims(l)) {
      if (p.LearnActEndDate) continue;
      const comp = l.deliveries.some(
        (d) => d.AimType === 3 && d.ProgType === p.ProgType && d.StdCode === p.StdCode
      );
      if (!comp)
        hit(
          'R_31',
          l,
          'learn_aim_ref',
          'The programme needs its qualification as a component aim. Add the qualification’s learning aim reference from LARS (not ZPROG001).'
        );
    }
});

// ── Apprenticeship Units (ProgType 34, FundModel 39), ELE-2053 ────────────────
const isUnitProg = (d: DeliveryModel) => d.ProgType === 34 && d.AimType === 1;
const isUnitComp = (d: DeliveryModel) => d.ProgType === 34 && d.AimType === 3;
/** Same start, planned end and actual end (AimType_10 matches on these). */
const sameDates = (a: DeliveryModel, b: DeliveryModel) =>
  a.LearnStartDate === b.LearnStartDate &&
  a.LearnPlanEndDate === b.LearnPlanEndDate &&
  (a.LearnActEndDate ?? null) === (b.LearnActEndDate ?? null);
/** R_159 / R_160 also match on funding model and programme type. */
const sameUnitAim = (a: DeliveryModel, b: DeliveryModel) =>
  a.FundModel === b.FundModel && a.ProgType === b.ProgType && sameDates(a, b);
/** The one employment status record we hold, if it applies on a date. */
const empOn = (l: LearnerModel, on: string | null) =>
  l.emp && (!l.emp.DateEmpStatApp || !on || l.emp.DateEmpStatApp <= on) ? l.emp : null;

const unitRules: Array<[string, (l: LearnerModel, c: Ctx) => void]> = [
  [
    'ProgType_25',
    (l, { hit }) => {
      const d = l.deliveries.find((x) => x.ProgType === 34 && x.FundModel !== 39);
      if (d)
        hit(
          'ProgType_25',
          l,
          'fund_model',
          `Apprenticeship Units (programme type 34) are funded through funding model 39, but funding model ${d.FundModel ?? 'blank'} is recorded. Set the funding model to 39.`
        );
    },
  ],
  [
    'FundModel_22',
    (l, { hit }) => {
      const d = l.deliveries.find((x) => x.FundModel === 39 && x.ProgType !== 34);
      if (d)
        hit(
          'FundModel_22',
          l,
          'prog_type',
          `Funding model 39 is only for Apprenticeship Units, but programme type ${d.ProgType ?? 'blank'} is recorded. Set the programme type to 34, or change the funding model.`
        );
    },
  ],
  [
    'R_159',
    (l, { hit }) => {
      for (const c of l.deliveries.filter(isUnitComp))
        if (!l.deliveries.some((p) => p.AimType === 1 && sameUnitAim(p, c)))
          hit(
            'R_159',
            l,
            'prog_type',
            'The Apprenticeship Unit aim has no programme aim with the same funding model, programme type and dates. Check the programme type and funding model are the same for the whole unit.'
          );
    },
  ],
  [
    'R_160',
    (l, { hit }) => {
      for (const p of l.deliveries.filter(isUnitProg))
        if (!l.deliveries.some((c) => c.AimType === 3 && sameUnitAim(c, p)))
          hit(
            'R_160',
            l,
            'learn_aim_ref',
            'The Apprenticeship Unit programme needs its unit as a component aim with the same funding model, programme type and dates. Add the unit’s learning aim reference from LARS.'
          );
    },
  ],
  [
    'AimType_10',
    (l, { hit }) => {
      for (const p of l.deliveries.filter(isUnitProg))
        if (l.deliveries.filter((c) => isUnitComp(c) && sameDates(c, p)).length > 1)
          hit(
            'AimType_10',
            l,
            'learn_aim_ref',
            'An Apprenticeship Unit programme can only have one unit (component aim). Remove the extra one.'
          );
    },
  ],
  [
    'LearnPlanEndDate_04',
    (l, { hit }) => {
      for (const p of l.deliveries.filter(isUnitProg))
        if (
          p.LearnStartDate &&
          p.LearnPlanEndDate &&
          p.LearnPlanEndDate > addDays(p.LearnStartDate, 112)
        )
          hit(
            'LearnPlanEndDate_04',
            l,
            'record:planned_end_date',
            `The planned end date (${fmt(p.LearnPlanEndDate)}) is more than 16 weeks after the start (${fmt(p.LearnStartDate)}). An Apprenticeship Unit can plan at most 16 weeks: bring the planned end date on or before ${fmt(addDays(p.LearnStartDate, 112))}.`
          );
    },
  ],
  [
    'DateOfBirth_61',
    (l, { hit }) => {
      if (!l.DateOfBirth) return;
      const d = l.deliveries.find(
        (x) => x.ProgType === 34 && x.LearnStartDate && ageOn(l.DateOfBirth!, x.LearnStartDate) < 19
      );
      if (d)
        hit(
          'DateOfBirth_61',
          l,
          'date_of_birth',
          `The learner is ${ageOn(l.DateOfBirth, d.LearnStartDate!)} at the start (${fmt(d.LearnStartDate)}). Apprenticeship Units are for learners aged 19 or over at the start. Check the date of birth.`
        );
    },
  ],
  [
    'CompStatus_11',
    (l, { hit }) => {
      if (l.deliveries.some((d) => d.ProgType === 34 && d.CompStatus === 6))
        hit(
          'CompStatus_11',
          l,
          'comp_status',
          'Apprenticeship Units cannot have a break in learning (completion status 6). Record the learner as continuing (1) or withdrawn (3).'
        );
    },
  ],
  [
    'ULN_13',
    (l, { hit }) => {
      if (l.ULN === '9999999999' && l.deliveries.some((d) => d.ProgType === 34))
        hit(
          'ULN_13',
          l,
          'uln',
          'Apprenticeship Unit learners need their real ULN, not 9999999999. Find it on the Learner Record Service.'
        );
    },
  ],
  [
    'EmpStat_24',
    (l, { hit }) => {
      const p = l.deliveries.find(isUnitProg);
      if (!p) return;
      const e = empOn(l, p.LearnStartDate);
      if (!e || e.EmpStat !== 10)
        hit(
          'EmpStat_24',
          l,
          'emp_stat',
          e
            ? `Apprenticeship Unit learners must be in paid employment (10) at the start, but employment status ${e.EmpStat} is recorded. Check it.`
            : 'Apprenticeship Unit learners must be in paid employment at the start. Add the employment status (10, in paid employment) and its date.'
        );
    },
  ],
  [
    'ESMType_21',
    (l, { hit }) => {
      const p = l.deliveries.find(isUnitProg);
      if (!p) return;
      const e = empOn(l, p.LearnStartDate);
      if (!e || e.LOE == null)
        hit(
          'ESMType_21',
          l,
          'esm_loe',
          'Apprenticeship Unit learners need the length of employment code (LOE) from your MIS on their employment status at the start. Add it.'
        );
    },
  ],
  [
    'AgreemId_01',
    (l, { hit }) => {
      const p = l.deliveries.find((d) => d.FundModel === 39 && d.AimType === 1);
      if (!p || !l.emp?.DateEmpStatApp || !p.LearnStartDate) return;
      if (l.emp.DateEmpStatApp <= p.LearnStartDate && !l.emp.AgreemId)
        hit(
          'AgreemId_01',
          l,
          'agreem_id',
          'Apprenticeship Units need the agreement identifier from the employer’s apprenticeship service account. Add it to the employment status.'
        );
    },
  ],
  [
    'Outcome_13',
    (l, { hit }) => {
      for (const p of l.deliveries.filter(isUnitProg))
        if (p.Outcome === 1 && !p.fams.some((f) => f.type === 'LDM' && f.code === '404'))
          hit(
            'Outcome_13',
            l,
            'outcome',
            'The unit is recorded as achieved, so the file needs the 30% and onboarding milestone code (LDM 404) on the programme aim. Elec-Mate does not record it yet: add it in your MIS before you submit.'
          );
    },
  ],
];
for (const [id, fn] of unitRules)
  rule(id, (c) => {
    for (const l of c.file.learners) fn(l, c);
  });

// ── run ────────────────────────────────────────────────────────────────────
export interface RuleRun {
  issues: Issue[];
  /** Published rule ids checked. */
  implemented: string[];
  /** Elec-Mate checks, not DfE rules. */
  elecMateChecks: Array<{ id: string; severity: 'Error' | 'Warning'; about: string }>;
}

export function runRules(file: FileModel, opts: { nation?: string | null } = {}): RuleRun {
  const issues: Issue[] = [];
  const prep = londonParts(file.preparedAt).date;
  const hit: Ctx['hit'] = (id, l, fix, message) => {
    const m = META.get(id);
    issues.push({
      rule: id,
      official: true,
      severity: m?.severity === 'Warning' ? 'Warning' : 'Error',
      message,
      officialMessage: m?.message ?? null,
      learnerId: l?.learnerId ?? null,
      learnerName: l?.name ?? null,
      fix,
      spec: specFor(m?.fields, fix),
    });
  };
  const em = (
    id: keyof typeof ELEC_MATE,
    l: LearnerModel | null,
    fix: string | null,
    message: string
  ) =>
    issues.push({
      rule: id,
      official: false,
      severity: ELEC_MATE[id].severity,
      message,
      officialMessage: null,
      learnerId: l?.learnerId ?? null,
      learnerName: l?.name ?? null,
      fix,
      spec: null,
    });

  if (!file.ukprn || !/^[1-9][0-9]{7}$/.test(file.ukprn))
    em(
      'EM_UKPRN',
      null,
      'college:ukprn',
      'Add your college UKPRN (8 digits). Every ILR file carries it.'
    );
  if (!file.learners.length)
    em(
      'EM_NO_LEARNERS',
      null,
      null,
      `No learners are in ${file.period.code}. A return needs at least one learner whose learning is in the 2026/27 year.`
    );
  if (opts.nation && opts.nation !== 'england')
    em(
      'EM_NATION',
      null,
      null,
      'Your college is not set to England. The ILR is England’s learner return; check which return your funder needs.'
    );
  for (const l of file.learners) {
    for (const d of l.deliveries.filter(fm36Prog)) {
      const h3 = d.hrs.find((h) => h.code === 3);
      if (h3 && h3.amount === 0)
        em(
          'EM_HRS3_ZERO',
          l,
          'record:otj',
          'Actual off-the-job hours (HRS3) go out as 0: no college-verified or employer-attested hours are logged. Verify the hours before you submit.'
        );
    }
  }
  if (file.learners.some((l) => l.emp && (l.emp.EII != null || l.emp.LOE != null)))
    em(
      'EM_ESM_CODES',
      null,
      null,
      'Employment intensity (EII) and length of employment (LOE) codes are checked for presence only. Make sure they are the codes your MIS uses.'
    );

  for (const l of file.learners)
    if (l.deliveries.some(isUnitProg))
      em(
        'EM_UNIT_MILESTONE',
        l,
        null,
        'Apprenticeship Unit: when the learner reaches the 30% and onboarding milestone, the programme aim needs LDM 404. Elec-Mate does not record it yet, so add it in your MIS before you submit.'
      );

  const ctx: Ctx = { file, prep, hit };
  for (const c of checks) c(ctx);
  return {
    issues,
    implemented: [...OFFICIAL],
    elecMateChecks: Object.entries(ELEC_MATE).map(([id, v]) => ({ id, ...v })),
  };
}

export const IMPLEMENTED_RULES = OFFICIAL;
