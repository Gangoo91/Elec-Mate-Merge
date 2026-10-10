/**
 * ILR 2026/27 XML builder (ELE-2087). Pure: no Deno or Node APIs, so it runs in
 * the edge function and in tests.
 *
 *   rows from college_ilr_return_rows()  ->  toModel()  ->  LearnerModel[]
 *   LearnerModel[]                        ->  toXml()    ->  the ILR file text
 *
 * Element names and their order follow the published 2026/27 XSD
 * (ILR-2026-27-schemafile-January.xsd, namespace "ILR/2026-27"). The file is
 * checked against that XSD by validate.ts and against the rules in rules.ts.
 *
 * How Elec-Mate data becomes ILR entities (also in README.md):
 *  - Apprenticeship standards (FundModel 36, ProgType 25): a programme aim
 *    ZPROG001 (AimType 1, AimSeqNumber 1), as in the official 2026/27 sample
 *    file, carrying EPAOrgID, the HRSRecord and the AppFinRecord. The learning
 *    aim reference held for the learner, if it is not ZPROG001, becomes the
 *    component aim (AimType 3, AimSeqNumber 2).
 *  - SOF 105 and ACT 1 (from LearnStartDate) on both aims of an apprenticeship.
 *  - HRS1 = planned off-the-job hours on the learner record (the training plan
 *    writes them, ELE-2039). HRS3 = verified hours only (college verified or
 *    employer attested), returned when the learner has completed or withdrawn
 *    (CompStatus 2 or 3, rules HRSType_08/09). App learning is never added.
 *    HRS4 = hours removed for prior learning (ELE-2042), when above 0.
 *  - TNP1 / TNP2 dated LearnStartDate. RIP1 (price reduction for prior
 *    learning) = funding band maximum minus the agreed price recorded with the
 *    prior learning decision, dated LearnStartDate, when HRS4 is returned.
 *  - Apprenticeship Units (FundModel 39, ProgType 34, ELE-2053): a learner on
 *    an Apprenticeship Unit course (row.unit, from college_ilr_return_rows) with
 *    no programme type recorded, or with 34 recorded. As in the official
 *    2026/27 sample file: programme aim ZPROG001 (AimType 1, AimSeqNumber 1)
 *    and exactly one component aim (AimType 3, AimSeqNumber 2) carrying the
 *    learning aim reference recorded for the learner, else the unit's aim
 *    reference. Both aims share FundModel, ProgType and every date (rules
 *    R_159, R_160, AimType_10). SOF 105 on both (LearnDelFAMType_01/_09 list
 *    FundModel 39). No ACT (LearnDelFAMType_63: apprenticeship funding only),
 *    no HRS (HRSType_13: FundModel 36 only), no AppFinRecord, no EPAOrgID.
 *    LDM 404 (30% and onboarding milestone) is not held, so it is not written.
 *  - Anything filled in for the learner because the college has not recorded
 *    it is listed in `assumed`, and the return check shows it.
 */
import { PROGRAMME_AIM_REF, TEACHING_YEAR_START, type ReturnPeriod } from './codes.ts';

export interface IlrSourceLearner {
  learner_id: string;
  name: string | null;
  uln: string | null;
  date_of_birth: string | null;
  ni_number: string | null;
  start_date: string | null;
  planned_end_date: string | null;
  actual_end_date: string | null;
  planned_otj_hours: number | null;
  verified_otj_minutes: number | null;
  rpl_funding_band_max: number | null;
  rpl_agreed_price: number | null;
  ilr: Record<string, unknown> | null;
  /** ELE-2053: set when the learner is on an Apprenticeship Unit course (ILR ProgType 34). */
  unit?: { aim_ref: string | null } | null;
}

export interface IlrSource {
  college: { id: string; name: string | null; ukprn: string | null; nation: string | null } | null;
  learners: IlrSourceLearner[];
}

export interface Fam {
  type: string;
  code: string;
  from?: string | null;
  to?: string | null;
}
export interface Hrs {
  code: number;
  amount: number;
}
export interface AFin {
  type: 'TNP' | 'RIP';
  code: number;
  date: string | null;
  amount: number;
}

export interface DeliveryModel {
  LearnAimRef: string | null;
  AimType: number | null;
  AimSeqNumber: number;
  LearnStartDate: string | null;
  OrigLearnStartDate: string | null;
  LearnPlanEndDate: string | null;
  FundModel: number | null;
  ProgType: number | null;
  StdCode: number | null;
  DelLocPostCode: string | null;
  EPAOrgID: string | null;
  CompStatus: number | null;
  LearnActEndDate: string | null;
  WithdrawReason: number | null;
  Outcome: number | null;
  AchDate: string | null;
  fams: Fam[];
  hrs: Hrs[];
  afin: AFin[];
}

export interface EmploymentModel {
  EmpStat: number | null;
  DateEmpStatApp: string | null;
  EmpId: number | null;
  AgreemId: string | null;
  EII: number | null;
  LOE: number | null;
}

export interface LearnerModel {
  learnerId: string;
  name: string;
  LearnRefNumber: string | null;
  ULN: string | null;
  FamilyName: string | null;
  GivenNames: string | null;
  DateOfBirth: string | null;
  Ethnicity: number | null;
  Sex: string | null;
  LLDDHealthProb: number | null;
  NINumber: string | null;
  PostcodePrior: string | null;
  Postcode: string | null;
  prior: { PriorLevel: number; DateLevelApp: string | null } | null;
  lldd: Array<{ LLDDCat: number; PrimaryLLDD: boolean }>;
  emp: EmploymentModel | null;
  deliveries: DeliveryModel[];
  /** Values Elec-Mate filled in because the college has not recorded them. */
  assumed: Array<{ field: string; note: string }>;
  /** Not ILR: shown beside the check. */
  info: { plannedOtjHours: number | null; verifiedOtjHours: number };
}

export interface FileModel {
  ukprn: string | null;
  preparedAt: Date;
  serialNo: string;
  period: ReturnPeriod;
  learners: LearnerModel[];
  /** Learners on record not in this return (start after the period, or ended before the year). */
  outOfScope: Array<{ learnerId: string; name: string; reason: string }>;
}

// ── helpers ────────────────────────────────────────────────────────────────
const s = (v: unknown): string | null => {
  if (v == null) return null;
  const t = String(v).trim();
  return t === '' ? null : t;
};
const n = (v: unknown): number | null => {
  if (v == null || v === '') return null;
  const x = Number(v);
  return Number.isFinite(x) ? x : null;
};
const d = (v: unknown): string | null => {
  const t = s(v);
  return t ? t.slice(0, 10) : null;
};

export function addDays(iso: string, days: number): string {
  const dt = new Date(`${iso}T12:00:00Z`);
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}

export function addYears(iso: string, years: number): string {
  const [y, m, dd] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(y + years, m - 1, dd, 12));
  // 29 Feb + 1 year -> 1 Mar, as a date library would.
  return dt.toISOString().slice(0, 10);
}

/** UK postcodes are stored upper case; put the single space before the inward code. */
export function normalisePostcode(v: unknown): string | null {
  const t = s(v);
  if (!t) return null;
  const c = t.toUpperCase().replace(/\s+/g, '');
  if (c.length >= 5 && c.length <= 7) return `${c.slice(0, -3)} ${c.slice(-3)}`;
  return t.toUpperCase();
}

/** "Ryan Hughes (fixture)" -> given "Ryan", family "Hughes". */
function splitName(name: string | null): { given: string | null; family: string | null } {
  const clean = (name ?? '').replace(/\s*\([^)]*\)\s*$/, '').trim();
  if (!clean) return { given: null, family: null };
  const parts = clean.split(/\s+/);
  if (parts.length === 1) return { given: null, family: parts[0] };
  return { family: parts[parts.length - 1], given: parts.slice(0, -1).join(' ') };
}

// ── rows -> model ──────────────────────────────────────────────────────────
export function inScope(
  l: IlrSourceLearner,
  period: ReturnPeriod
): { ok: true } | { ok: false; reason: string } {
  const start = d(l.start_date);
  const end = d(l.actual_end_date);
  if (start && start > period.periodEnd)
    return { ok: false, reason: `Starts ${start}, after the end of ${period.code}` };
  if (end && end < TEACHING_YEAR_START)
    return { ok: false, reason: `Learning ended ${end}, before the 2026/27 year` };
  return { ok: true };
}

export function toLearnerModel(l: IlrSourceLearner): LearnerModel {
  const i = (l.ilr ?? {}) as Record<string, unknown>;
  const assumed: LearnerModel['assumed'] = [];
  const display = (l.name ?? '').replace(/\s*\([^)]*\)\s*$/, '').trim() || 'Unnamed learner';

  let given = s(i.given_names);
  let family = s(i.family_name);
  if (!given || !family) {
    const sp = splitName(l.name);
    if (!family && sp.family) {
      family = sp.family;
      assumed.push({
        field: 'family_name',
        note: `Family name taken from the display name (${sp.family})`,
      });
    }
    if (!given && sp.given) {
      given = sp.given;
      assumed.push({
        field: 'given_names',
        note: `Given names taken from the display name (${sp.given})`,
      });
    }
  }

  const start = d(l.start_date);
  const planEnd = d(l.planned_end_date);
  const actEnd = d(l.actual_end_date);
  const fundModel = n(i.fund_model);
  const progType = n(i.prog_type);
  const stdCode = n(i.std_code);
  const isAppStandard = progType === 25 && (fundModel === 36 || fundModel == null);
  // ELE-2053: an Apprenticeship Unit, recorded as 34 or read from the learner's course.
  const isUnit = progType === 34 || (progType == null && l.unit != null);
  const delLoc = normalisePostcode(i.del_loc_postcode);
  let compStatus = n(i.comp_status);
  if (compStatus == null && !actEnd) {
    compStatus = 1;
    assumed.push({
      field: 'comp_status',
      note: 'Completion status 1 (continuing): no actual end date is recorded',
    });
  }
  const outcome = n(i.outcome);
  const withdraw = n(i.withdraw_reason);
  const achDate = d(i.ach_date);
  const origStart = d(i.orig_learn_start_date);

  // Prior attainment
  let prior: LearnerModel['prior'] = null;
  const priorLevel = n(i.prior_level);
  if (priorLevel != null) {
    let when = d(i.prior_level_date);
    if (!when && start) {
      when = start;
      assumed.push({
        field: 'prior_level_date',
        note: `Prior attainment date set to the start date (${start})`,
      });
    }
    prior = { PriorLevel: priorLevel, DateLevelApp: when };
  }

  // LLDD and health problem
  const cats = Array.isArray(i.lldd_cats)
    ? (i.lldd_cats as unknown[]).map(Number).filter(Number.isFinite)
    : [];
  const primary = n(i.primary_lldd);
  const lldd = cats.map((c) => ({ LLDDCat: c, PrimaryLLDD: c === primary }));

  // Employment
  let emp: EmploymentModel | null = null;
  const empStat = n(i.emp_stat);
  if (empStat != null) {
    let when = d(i.date_emp_stat_app);
    if (!when && start) {
      when = addDays(start, -1);
      assumed.push({
        field: 'date_emp_stat_app',
        note: `Employment status date set to the day before the start date (${when})`,
      });
    }
    emp = {
      EmpStat: empStat,
      DateEmpStatApp: when,
      EmpId: n(i.emp_id),
      AgreemId: s(i.agreem_id),
      EII: n(i.esm_eii),
      LOE: n(i.esm_loe),
    };
  }

  const verifiedHours = Math.round(((n(l.verified_otj_minutes) ?? 0) / 60) * 10) / 10;
  const planned = n(l.planned_otj_hours);
  const deliveries: DeliveryModel[] = [];
  const base = {
    LearnStartDate: start,
    OrigLearnStartDate: origStart,
    LearnPlanEndDate: planEnd,
    DelLocPostCode: delLoc,
    LearnActEndDate: actEnd,
    CompStatus: compStatus,
    WithdrawReason: withdraw,
    Outcome: outcome,
  };

  if (isAppStandard) {
    const act: Fam = { type: 'ACT', code: '1', from: start };
    // R_121 / R_122: the last ACT record ends on the achievement date, or the
    // actual end date when there is none; R_123: open while continuing.
    if (actEnd) act.to = achDate ?? actEnd;
    const hrs: Hrs[] = [];
    if (planned != null) hrs.push({ code: 1, amount: Math.round(planned) });
    if (compStatus === 2 || compStatus === 3)
      hrs.push({ code: 3, amount: Math.round(verifiedHours) });
    const hrs4 = n(i.hrs_planned_reduction);
    if (hrs4 != null && hrs4 > 0) hrs.push({ code: 4, amount: Math.round(hrs4) });
    const afin: AFin[] = [];
    const tnp1 = n(i.tnp1_price);
    const tnp2 = n(i.tnp2_price);
    if (tnp1 != null) afin.push({ type: 'TNP', code: 1, date: start, amount: Math.round(tnp1) });
    if (tnp2 != null) afin.push({ type: 'TNP', code: 2, date: start, amount: Math.round(tnp2) });
    const band = n(l.rpl_funding_band_max);
    const agreed = n(l.rpl_agreed_price);
    if (hrs4 != null && hrs4 > 0 && band != null && agreed != null && band - agreed > 0)
      afin.push({ type: 'RIP', code: 1, date: start, amount: Math.round(band - agreed) });

    deliveries.push({
      ...base,
      LearnAimRef: PROGRAMME_AIM_REF,
      AimType: 1,
      AimSeqNumber: 1,
      FundModel: fundModel ?? 36,
      ProgType: 25,
      StdCode: stdCode,
      EPAOrgID: s(i.epa_org_id)?.toUpperCase() ?? null,
      AchDate: achDate,
      fams: [{ type: 'SOF', code: '105' }, act],
      hrs,
      afin,
    });
    if (fundModel == null)
      assumed.push({
        field: 'fund_model',
        note: 'Funding model 36 (apprenticeships): programme type 25 is recorded',
      });
    const ref = s(i.learn_aim_ref)?.toUpperCase() ?? null;
    if (ref && ref !== PROGRAMME_AIM_REF) {
      deliveries.push({
        ...base,
        LearnAimRef: ref,
        AimType: 3,
        AimSeqNumber: 2,
        FundModel: fundModel ?? 36,
        ProgType: 25,
        StdCode: stdCode,
        EPAOrgID: null,
        AchDate: null,
        fams: [{ type: 'SOF', code: '105' }, { ...act }],
        hrs: [],
        afin: [],
      });
    }
  } else if (isUnit) {
    if (progType == null)
      assumed.push({
        field: 'prog_type',
        note: 'Programme type 34 (Apprenticeship Unit): the learner is on an Apprenticeship Unit course',
      });
    if (fundModel == null)
      assumed.push({
        field: 'fund_model',
        note: 'Funding model 39 (Growth and Skills short course offer): Apprenticeship Units are funded through it',
      });
    // ZPROG001 is only valid on a programme aim (LearnAimRef_30), so it is never the component.
    const recorded = s(i.learn_aim_ref)?.toUpperCase() ?? null;
    let ref = recorded && recorded !== PROGRAMME_AIM_REF ? recorded : null;
    const unitRef = s(l.unit?.aim_ref)?.toUpperCase() ?? null;
    if (!ref && unitRef) {
      ref = unitRef;
      assumed.push({
        field: 'learn_aim_ref',
        note: `Learning aim reference taken from the unit programme (${unitRef})`,
      });
    }
    const unitAim = {
      ...base,
      FundModel: fundModel ?? 39,
      ProgType: 34,
      StdCode: stdCode,
      EPAOrgID: null,
      hrs: [],
      afin: [],
    };
    deliveries.push({
      ...unitAim,
      LearnAimRef: PROGRAMME_AIM_REF,
      AimType: 1,
      AimSeqNumber: 1,
      AchDate: achDate,
      fams: [{ type: 'SOF', code: '105' }],
    });
    deliveries.push({
      ...unitAim,
      LearnAimRef: ref,
      AimType: 3,
      AimSeqNumber: 2,
      AchDate: null,
      fams: [{ type: 'SOF', code: '105' }],
    });
  } else {
    deliveries.push({
      ...base,
      LearnAimRef: s(i.learn_aim_ref)?.toUpperCase() ?? null,
      AimType: n(i.aim_type),
      AimSeqNumber: 1,
      FundModel: fundModel,
      ProgType: progType,
      StdCode: stdCode,
      EPAOrgID: s(i.epa_org_id)?.toUpperCase() ?? null,
      AchDate: achDate,
      fams: [],
      hrs: [],
      afin: [],
    });
  }

  return {
    learnerId: l.learner_id,
    name: display,
    LearnRefNumber: s(i.learn_ref_number),
    ULN: s(l.uln),
    FamilyName: family,
    GivenNames: given,
    DateOfBirth: d(l.date_of_birth),
    Ethnicity: n(i.ethnicity),
    Sex: s(i.sex)?.toUpperCase() ?? null,
    LLDDHealthProb: n(i.lldd_health_prob),
    NINumber: s(l.ni_number)?.toUpperCase().replace(/\s+/g, '') ?? null,
    PostcodePrior: normalisePostcode(i.postcode_prior),
    Postcode: normalisePostcode(i.postcode),
    prior,
    lldd,
    emp,
    deliveries,
    assumed,
    info: { plannedOtjHours: planned, verifiedOtjHours: verifiedHours },
  };
}

export function toFileModel(
  src: IlrSource,
  period: ReturnPeriod,
  opts: { preparedAt?: Date; serialNo?: string } = {}
): FileModel {
  const learners: LearnerModel[] = [];
  const outOfScope: FileModel['outOfScope'] = [];
  for (const l of src.learners) {
    const sc = inScope(l, period);
    if ('reason' in sc)
      outOfScope.push({
        learnerId: l.learner_id,
        name: (l.name ?? '').replace(/\s*\([^)]*\)\s*$/, '').trim() || 'Unnamed learner',
        reason: sc.reason,
      });
    else learners.push(toLearnerModel(l));
  }
  return {
    ukprn: s(src.college?.ukprn),
    preparedAt: opts.preparedAt ?? new Date(),
    serialNo: (opts.serialNo ?? '01').padStart(2, '0'),
    period,
    learners,
    outOfScope,
  };
}

// ── model -> XML ───────────────────────────────────────────────────────────
const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Europe/London wall-clock parts for the header and the file name. */
export function londonParts(at: Date): { date: string; time: string; dateTime: string } {
  const f = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(at);
  const p = (t: string) => f.find((x) => x.type === t)?.value ?? '00';
  const date = `${p('year')}-${p('month')}-${p('day')}`;
  const time = `${p('hour')}:${p('minute')}:${p('second')}`;
  return { date, time, dateTime: `${date}T${time}` };
}

export function fileName(m: FileModel): string {
  const { date, time } = londonParts(m.preparedAt);
  return `ILR-${m.ukprn ?? '00000000'}-2627-${date.replace(/-/g, '')}-${time.replace(/:/g, '')}-${m.serialNo}.xml`;
}

export interface XmlOut {
  xml: string;
  fileName: string;
  /** 1-based line ranges of each <Learner>, to point schema errors at a learner. */
  learnerLines: Array<{ learnerId: string; from: number; to: number }>;
}

export function toXml(m: FileModel, release = '2026.10'): XmlOut {
  const lines: string[] = [];
  const learnerLines: XmlOut['learnerLines'] = [];
  const out = (depth: number, text: string) => lines.push(`${'\t'.repeat(depth)}${text}`);
  const el = (depth: number, name: string, v: string | number | null | undefined) => {
    if (v == null || v === '') return;
    out(depth, `<${name}>${esc(String(v))}</${name}>`);
  };
  const { date, dateTime } = londonParts(m.preparedAt);

  lines.push('<?xml version="1.0" encoding="utf-8"?>');
  out(0, '<Message xmlns="ILR/2026-27" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">');
  out(1, '<Header>');
  out(2, '<CollectionDetails>');
  el(3, 'Collection', 'ILR');
  el(3, 'Year', '2627');
  el(3, 'FilePreparationDate', date);
  out(2, '</CollectionDetails>');
  out(2, '<Source>');
  el(3, 'ProtectiveMarking', 'OFFICIAL-SENSITIVE-Personal');
  el(3, 'UKPRN', m.ukprn);
  el(3, 'SoftwareSupplier', 'Elec-Mate');
  el(3, 'SoftwarePackage', 'Elec-Mate College Hub');
  el(3, 'Release', release);
  el(3, 'SerialNo', m.serialNo);
  el(3, 'DateTime', dateTime);
  out(2, '</Source>');
  out(1, '</Header>');
  out(1, '<LearningProvider>');
  el(2, 'UKPRN', m.ukprn);
  out(1, '</LearningProvider>');

  for (const l of m.learners) {
    const from = lines.length + 1;
    out(1, '<Learner>');
    el(2, 'LearnRefNumber', l.LearnRefNumber);
    el(2, 'ULN', l.ULN);
    el(2, 'FamilyName', l.FamilyName);
    el(2, 'GivenNames', l.GivenNames);
    el(2, 'DateOfBirth', l.DateOfBirth);
    el(2, 'Ethnicity', l.Ethnicity);
    el(2, 'Sex', l.Sex);
    el(2, 'LLDDHealthProb', l.LLDDHealthProb);
    el(2, 'NINumber', l.NINumber);
    el(2, 'PostcodePrior', l.PostcodePrior);
    el(2, 'Postcode', l.Postcode);
    if (l.prior) {
      out(2, '<PriorAttain>');
      el(3, 'PriorLevel', l.prior.PriorLevel);
      el(3, 'DateLevelApp', l.prior.DateLevelApp);
      out(2, '</PriorAttain>');
    }
    for (const x of l.lldd) {
      out(2, '<LLDDandHealthProblem>');
      el(3, 'LLDDCat', x.LLDDCat);
      if (x.PrimaryLLDD) el(3, 'PrimaryLLDD', 1);
      out(2, '</LLDDandHealthProblem>');
    }
    if (l.emp) {
      out(2, '<LearnerEmploymentStatus>');
      el(3, 'EmpStat', l.emp.EmpStat);
      el(3, 'DateEmpStatApp', l.emp.DateEmpStatApp);
      el(3, 'EmpId', l.emp.EmpId);
      el(3, 'AgreemId', l.emp.AgreemId);
      for (const [t, c] of [
        ['EII', l.emp.EII],
        ['LOE', l.emp.LOE],
      ] as const) {
        if (c == null) continue;
        out(3, '<EmploymentStatusMonitoring>');
        el(4, 'ESMType', t);
        el(4, 'ESMCode', c);
        out(3, '</EmploymentStatusMonitoring>');
      }
      out(2, '</LearnerEmploymentStatus>');
    }
    for (const ld of l.deliveries) {
      out(2, '<LearningDelivery>');
      el(3, 'LearnAimRef', ld.LearnAimRef);
      el(3, 'AimType', ld.AimType);
      el(3, 'AimSeqNumber', ld.AimSeqNumber);
      el(3, 'LearnStartDate', ld.LearnStartDate);
      el(3, 'OrigLearnStartDate', ld.OrigLearnStartDate);
      el(3, 'LearnPlanEndDate', ld.LearnPlanEndDate);
      el(3, 'FundModel', ld.FundModel);
      el(3, 'ProgType', ld.ProgType);
      el(3, 'StdCode', ld.StdCode);
      el(3, 'DelLocPostCode', ld.DelLocPostCode);
      el(3, 'EPAOrgID', ld.EPAOrgID);
      el(3, 'CompStatus', ld.CompStatus);
      el(3, 'LearnActEndDate', ld.LearnActEndDate);
      el(3, 'WithdrawReason', ld.WithdrawReason);
      el(3, 'Outcome', ld.Outcome);
      el(3, 'AchDate', ld.AchDate);
      for (const f of ld.fams) {
        out(3, '<LearningDeliveryFAM>');
        el(4, 'LearnDelFAMType', f.type);
        el(4, 'LearnDelFAMCode', f.code);
        el(4, 'LearnDelFAMDateFrom', f.from ?? null);
        el(4, 'LearnDelFAMDateTo', f.to ?? null);
        out(3, '</LearningDeliveryFAM>');
      }
      for (const h of ld.hrs) {
        out(3, '<HRSRecord>');
        el(4, 'HRSType', 'HRS');
        el(4, 'HRSCode', h.code);
        el(4, 'HRSAmount', h.amount);
        out(3, '</HRSRecord>');
      }
      for (const a of ld.afin) {
        out(3, '<AppFinRecord>');
        el(4, 'AFinType', a.type);
        el(4, 'AFinCode', a.code);
        el(4, 'AFinDate', a.date);
        el(4, 'AFinAmount', a.amount);
        out(3, '</AppFinRecord>');
      }
      out(2, '</LearningDelivery>');
    }
    out(1, '</Learner>');
    learnerLines.push({ learnerId: l.learnerId, from, to: lines.length });
  }
  out(0, '</Message>');
  return { xml: lines.join('\n') + '\n', fileName: fileName(m), learnerLines };
}
