/**
 * ukRates — single source of truth for UK statutory pay figures and JIB rates.
 *
 * Every figure here was verified against a primary source on 2026-07-10:
 * - NMW/NLW: https://www.gov.uk/national-minimum-wage-rates (rates change 1 April each year)
 * - SSP + thresholds: https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027
 *   (from 6 April 2026 SSP is day-one and the lower earnings limit is abolished —
 *   Employment Rights Act reforms)
 * - JIB: JIB Industrial Determination 2026–2028 (jib.org.uk, National Working Rules).
 *   JIB rates change the first Monday of January.
 * - Personal allowance: https://www.gov.uk/income-tax-rates (frozen at £12,570)
 *
 * ANNUAL UPDATE CHECKLIST (every April for statutory, every January for JIB):
 * 1. Update the figures below from the primary sources above — never from memory
 *    or secondary blogs.
 * 2. Grep the repo for the OLD figures (e.g. "£8.00", "£12.71", "£123.25") — SEO
 *    pages also quote them in prose. Known prose consumers as of 2026-07-10:
 *    ApprenticeSalaryPage, ApprenticeSalaryUKPage, ApprenticeRightsPayPage,
 *    ApprenticeTrainingPage, ElectricalApprenticeshipCostPage,
 *    ElectricalCareersForSchoolLeaversPage, ElectricalSalaryBenchmarkingPage,
 *    ElectricianCareerLadderPage, StaffCostCalculatorPage,
 *    components/apprentice/rights-pay/* (quiz + rights tab prose).
 * 3. Recalculate any derived weekly/annual figures quoted in prose
 *    (rate × 37.5 h × 52 weeks).
 */

/** Statutory minimum wage rates, hourly, from 1 April 2026 (tax year 2026/27). */
export const UK_MINIMUM_WAGE = {
  effectiveFrom: '2026-04-01',
  /** Under 19, or 19+ in the first year of an apprenticeship. */
  apprentice: 8.0,
  under18: 8.0,
  age18to20: 10.85,
  /** National Living Wage, 21 and over. */
  nlw21Plus: 12.71,
} as const;

/** Statutory Sick Pay, 2026/27. Day-one payment; no minimum earnings requirement. */
export const UK_SSP = {
  effectiveFrom: '2026-04-06',
  weeklyRate: 123.25,
  /** SSP is the LOWER of the weekly rate or 80% of average weekly earnings. */
  capPercentOfEarnings: 80,
  maxWeeks: 28,
  paidFromDay: 1,
} as const;

/** Standard income tax personal allowance (frozen). */
export const UK_PERSONAL_ALLOWANCE = 12570;

/**
 * JIB national standard hourly rates from 5 January 2026
 * (JIB Industrial Determination 2026–2028). London = JIB London rate area
 * per National Working Rule 6.2. Graded rates below are "Job Employed
 * (Transport Provided)" — own-transport and shop rates differ slightly.
 */
export const JIB_RATES_2026 = {
  effectiveFrom: '2026-01-05',
  apprentice: {
    stage1: { national: 8.16, london: 9.14 },
    stage2: { national: 10.6, london: 11.88 },
    stage3: { national: 13.05, london: 14.62 },
    stage4: { national: 14.03, london: 15.72 },
  },
  // Grade names are the JIB's own, from the Handbook 2026 table (National
  // Standard, Transport Provided, effective 5 January 2026).
  //
  // `electricalImprover: 16.54` used to sit here. There is no "Electrical
  // Improver" grade in the JIB determination — £16.54 is Trainee Electrician
  // Stage 2. The apprentice wage page paired that rate with the description
  // "recently qualified, 6-12 months after completing apprenticeship", which
  // is the ECS Experienced Worker Cardholder grade at £17.51, so a newly
  // qualified electrician was shown 97p/hr under their real rate.
  graded: {
    traineeStage1: 14.6,
    traineeStage2: 16.54,
    /** Also the Trainee Electrician Stage 3 rate — the JIB pays them the same. */
    ecsExperiencedWorker: 17.51,
    electrician: 18.38,
    approvedElectrician: 20.08,
    technician: 22.7,
  },
} as const;

/**
 * The JIB standard working week — National Working Rule 3.1. It is 37.5 hours,
 * NOT 40. Costing tools kept dividing an annual salary by 40 × 52 = 2080 hours,
 * which invents 130 hours a year that nobody is paid for and therefore
 * UNDERSTATES the true hourly cost by about 7%.
 */
export const JIB_WORKING_WEEK_HOURS = 37.5;

/** 37.5 × 52. The paid-hours year on the JIB standard week. */
export const JIB_PAID_HOURS_PER_YEAR = JIB_WORKING_WEEK_HOURS * 52; // 1950

/**
 * Statutory paid holiday — Working Time Regulations 1998, regs 13 and 13A.
 * 5.6 weeks, which is 28 days for someone working a 5-day week. Bank holidays
 * may be counted inside the 5.6 weeks; they are not an extra entitlement.
 */
export const UK_STATUTORY_HOLIDAY_WEEKS = 5.6;

/**
 * Employer on-costs for 2026/27. Verified 2026-08-06 against:
 * - Employer NI (Class 1 secondary) rate, secondary threshold and Employment
 *   Allowance: https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027
 * - Auto-enrolment employer minimum and qualifying earnings band:
 *   https://www.gov.uk/workplace-pensions/what-you-your-employer-and-the-government-pay
 *   (DWP confirmed the 2026/27 band stays at 2025/26 levels)
 *
 * Two things costing tools get wrong, so they are modelled explicitly here:
 * 1. Employer NI is 15% from 6 April 2025, not 13.8%, and it is charged only on
 *    pay ABOVE the £5,000 secondary threshold — not on the whole salary.
 * 2. The 3% employer pension minimum is on QUALIFYING EARNINGS (the £6,240 to
 *    £50,270 slice), not on full pay.
 */
export const UK_EMPLOYER_COSTS = {
  taxYear: '2026/27',
  /** Class 1 secondary rate. 15% from 6 April 2025 (was 13.8%). */
  employerNIRate: 0.15,
  /** Annual secondary threshold — employer NI is due only above this. */
  employerNISecondaryThresholdAnnual: 5000,
  /** Eligible employers offset up to this much employer NI a year. */
  employmentAllowance: 10500,
  /** Auto-enrolment employer minimum. */
  pensionEmployerMinRate: 0.03,
  pensionQualifyingEarningsLower: 6240,
  pensionQualifyingEarningsUpper: 50270,
  /** Auto-enrolment earnings trigger. */
  autoEnrolmentEarningsTrigger: 10000,
  verifiedOn: '2026-08-06',
} as const;

/**
 * Employer NI on an annual salary. Charged on the slice above the secondary
 * threshold only — `salary × rate` overstates the bill on every wage.
 */
export const employerNIOn = (
  annualPay: number,
  rate: number = UK_EMPLOYER_COSTS.employerNIRate
): number =>
  Math.max(annualPay - UK_EMPLOYER_COSTS.employerNISecondaryThresholdAnnual, 0) * rate;

/**
 * Employer auto-enrolment pension on an annual salary. Charged on qualifying
 * earnings — the slice between £6,240 and £50,270 — so it is capped, and
 * `salary × 3%` overstates it for anyone earning over £50,270.
 */
export const employerPensionOn = (
  annualPay: number,
  rate: number = UK_EMPLOYER_COSTS.pensionEmployerMinRate
): number => {
  const { pensionQualifyingEarningsLower: lower, pensionQualifyingEarningsUpper: upper } =
    UK_EMPLOYER_COSTS;
  return Math.max(Math.min(annualPay, upper) - lower, 0) * rate;
};

/**
 * Price from cost at a target MARGIN — margin is a share of the SELLING price,
 * so price = cost / (1 − margin). Multiplying by (1 + margin) is MARKUP and
 * under-prices every job. Margin is clamped below 100% because a 100% margin
 * implies an infinite price.
 */
export const priceFromMargin = (cost: number, marginPercent: number): number => {
  const m = Math.min(Math.max(marginPercent, 0), 95) / 100;
  return m > 0 ? cost / (1 - m) : cost;
};

/** Weekly gross at a given hourly rate on the standard 37.5-hour week. */
export const weeklyGross = (hourlyRate: number, hoursPerWeek = JIB_WORKING_WEEK_HOURS): number =>
  Math.round(hourlyRate * hoursPerWeek * 100) / 100;

/** Approximate annual gross (52 weeks) at a given hourly rate. */
export const annualGross = (hourlyRate: number, hoursPerWeek = JIB_WORKING_WEEK_HOURS): number =>
  Math.round(hourlyRate * hoursPerWeek * 52);
