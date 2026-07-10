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
  graded: {
    electricalImprover: 16.54,
    electrician: 18.38,
    approvedElectrician: 20.08,
    technician: 22.7,
  },
} as const;

/** Weekly gross at a given hourly rate on the standard 37.5-hour week. */
export const weeklyGross = (hourlyRate: number, hoursPerWeek = 37.5): number =>
  Math.round(hourlyRate * hoursPerWeek * 100) / 100;

/** Approximate annual gross (52 weeks) at a given hourly rate. */
export const annualGross = (hourlyRate: number, hoursPerWeek = 37.5): number =>
  Math.round(hourlyRate * hoursPerWeek * 52);
