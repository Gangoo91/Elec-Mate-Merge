/**
 * Job costing, pricing and variance maths for the business-development
 * calculators.
 *
 * This was previously three copies of the same arithmetic inlined into three
 * React components — JobProfitabilityCalculator, QuoteVarianceTracker and
 * BusinessCostCalculator/BusinessAnalytics — with no way to assert any of it.
 * JobProfitabilityCalculator had gone so far as to keep TWO copies inside the
 * one file: one set of formulas for the screen and a second, subtly different
 * set for what it wrote to history, so the same Calculate press could report
 * two different profits.
 *
 * The single most expensive mistake in trade pricing is confusing MARGIN with
 * MARKUP, so both live here, named, next to each other, and nowhere else:
 *
 *   margin  = profit as a share of the SELLING price → price = cost / (1 − m)
 *   markup  = profit as a share of the COST          → price = cost × (1 + k)
 *
 * A 25% markup is only a 20% margin. Pricing at cost × 1.25 while calling it a
 * "25% margin" under-prices every single job.
 *
 * Money convention: every figure in this module is NET of VAT. VAT is collected
 * from the customer on behalf of HMRC — it is not revenue, not profit and not a
 * cost — so it never enters a cost total or a profit figure. It is added at the
 * very end, on the selling price only, by `vatOn()`.
 */

import { CURRENT_TAX_YEAR, ratesFor } from './uk-tax-rates';

/** Anything non-finite (NaN, ±Infinity) collapses to 0 rather than poisoning a total. */
export function num(value: number | null | undefined): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

/** Negative costs are not a thing. Guards against a pasted "-500". */
export function nonNegative(value: number | null | undefined): number {
  return Math.max(0, num(value));
}

// ─────────────────────────────────────────────────────────────────────────
// Margin vs markup
// ─────────────────────────────────────────────────────────────────────────

/**
 * A margin of 100% would need an infinite selling price, so it is not a valid
 * input. Anything at or above this is rejected by the calculators rather than
 * silently producing a large finite number.
 */
export const MAX_MARGIN_PERCENT = 95;

/** price = cost / (1 − margin). Margin is a share of the SELLING price. */
export function priceForMargin(cost: number, marginPercent: number): number {
  const c = nonNegative(cost);
  const m = Math.min(Math.max(num(marginPercent), 0), MAX_MARGIN_PERCENT) / 100;
  return c / (1 - m);
}

/** price = cost × (1 + markup). Markup is a share of the COST. */
export function priceForMarkup(cost: number, markupPercent: number): number {
  return nonNegative(cost) * (1 + Math.max(num(markupPercent), 0) / 100);
}

/** The margin a given markup actually delivers: m = k / (1 + k). */
export function markupToMargin(markupPercent: number): number {
  const k = Math.max(num(markupPercent), 0) / 100;
  return (k / (1 + k)) * 100;
}

/** The markup needed to hit a given margin: k = m / (1 − m). */
export function marginToMarkup(marginPercent: number): number {
  const m = Math.min(Math.max(num(marginPercent), 0), MAX_MARGIN_PERCENT) / 100;
  return (m / (1 - m)) * 100;
}

/**
 * Realised margin on a price already agreed. Undefined at a zero price — a
 * £0 job has no margin, and reporting "0%" there reads as break-even.
 */
export function marginPercentOf(price: number, cost: number): number | null {
  const p = num(price);
  if (p <= 0) return null;
  return ((p - num(cost)) / p) * 100;
}

// ─────────────────────────────────────────────────────────────────────────
// VAT
// ─────────────────────────────────────────────────────────────────────────

const rates = ratesFor(CURRENT_TAX_YEAR);

/** 20%, from the verified rate table rather than a literal. */
export const VAT_STANDARD_RATE_PERCENT = rates.vatStandardRate * 100;
/** £90,000, from the verified rate table rather than a literal. */
export const VAT_REGISTRATION_THRESHOLD = rates.vatRegistrationThreshold;

/** VAT charged ON a net selling price. Never added to a cost or a profit. */
export function vatOn(netAmount: number, vatRatePercent = VAT_STANDARD_RATE_PERCENT): number {
  return nonNegative(netAmount) * (Math.max(num(vatRatePercent), 0) / 100);
}

/** Strips VAT out of a gross figure — for materials entered off a till receipt. */
export function netOfVat(grossAmount: number, vatRatePercent = VAT_STANDARD_RATE_PERCENT): number {
  return nonNegative(grossAmount) / (1 + Math.max(num(vatRatePercent), 0) / 100);
}

// ─────────────────────────────────────────────────────────────────────────
// Job costing
// ─────────────────────────────────────────────────────────────────────────

export interface JobCostInputs {
  /** Materials at trade COST, ex VAT. */
  materialCost: number;
  /** Consumables and waste/offcuts, as a % of materials — a cost, not a markup. */
  consumablesPercent: number;
  /** Chargeable hours on site (blended across the team). */
  labourHours: number;
  /** Blended labour COST per hour, before employment on-costs. */
  labourCostPerHour: number;
  /**
   * Employer NI, holiday pay, pension, sick pay and downtime as a % on top of
   * the headline pay rate. Costing labour at the pay rate alone understates
   * cost and overstates profit on every job.
   */
  labourOnCostPercent: number;
  travelHours: number;
  adminHours: number;
  miles: number;
  mileageRate: number;
  parkingTolls: number;
  subcontractorCost: number;
  /** Business running costs recovered against this job, as a % of direct cost. */
  overheadPercentage: number;
  contingencyPercent: number;
  warrantyReservePercent: number;
}

export interface JobCostBreakdown {
  materials: number;
  consumables: number;
  labour: number;
  nonBillableLabour: number;
  labourOnCosts: number;
  mileage: number;
  directCosts: number;
  overheadCosts: number;
  contingencyCost: number;
  warrantyReserveCost: number;
  totalCosts: number;
}

export const EMPTY_JOB_COST_INPUTS: JobCostInputs = {
  materialCost: 0,
  consumablesPercent: 0,
  labourHours: 0,
  labourCostPerHour: 0,
  labourOnCostPercent: 0,
  travelHours: 0,
  adminHours: 0,
  miles: 0,
  mileageRate: 0,
  parkingTolls: 0,
  subcontractorCost: 0,
  overheadPercentage: 0,
  contingencyPercent: 0,
  warrantyReservePercent: 0,
};

/**
 * Every job cost, ex VAT. Overhead, contingency and warranty are all struck on
 * DIRECT cost — never on each other — so they cannot compound.
 */
export function calculateJobCosts(input: Partial<JobCostInputs>): JobCostBreakdown {
  const i = { ...EMPTY_JOB_COST_INPUTS, ...input };

  const materials = nonNegative(i.materialCost);
  const consumables = materials * (nonNegative(i.consumablesPercent) / 100);

  const onCostFactor = 1 + nonNegative(i.labourOnCostPercent) / 100;
  const payRate = nonNegative(i.labourCostPerHour);
  const billableHours = nonNegative(i.labourHours);
  const nonBillableHours = nonNegative(i.travelHours) + nonNegative(i.adminHours);

  const labourAtPayRate = billableHours * payRate;
  const nonBillableAtPayRate = nonBillableHours * payRate;
  const labour = labourAtPayRate * onCostFactor;
  const nonBillableLabour = nonBillableAtPayRate * onCostFactor;
  const labourOnCosts = labour + nonBillableLabour - labourAtPayRate - nonBillableAtPayRate;

  const mileage = nonNegative(i.miles) * nonNegative(i.mileageRate);

  const directCosts =
    materials +
    consumables +
    labour +
    nonBillableLabour +
    mileage +
    nonNegative(i.parkingTolls) +
    nonNegative(i.subcontractorCost);

  const overheadCosts = directCosts * (nonNegative(i.overheadPercentage) / 100);
  const contingencyCost = directCosts * (nonNegative(i.contingencyPercent) / 100);
  const warrantyReserveCost = directCosts * (nonNegative(i.warrantyReservePercent) / 100);

  return {
    materials,
    consumables,
    labour,
    nonBillableLabour,
    labourOnCosts,
    mileage,
    directCosts,
    overheadCosts,
    contingencyCost,
    warrantyReserveCost,
    totalCosts: directCosts + overheadCosts + contingencyCost + warrantyReserveCost,
  };
}

export interface JobPricing {
  totalCosts: number;
  /** Lowest net price that hits the target MARGIN. */
  minimumPriceExVat: number;
  /** Profit on the price actually quoted, ex VAT. */
  profit: number;
  /** Realised margin, or null when nothing has been quoted yet. */
  marginPercent: number | null;
  vat: number;
  priceIncVat: number;
}

/**
 * Prices a job against a target margin and reports the profit on the price
 * actually quoted. `quoteExVat` is NET; VAT is added afterwards and is excluded
 * from both cost and profit.
 */
export function priceJob(
  breakdown: JobCostBreakdown,
  quoteExVat: number,
  targetMarginPercent: number,
  vatRatePercent = 0
): JobPricing {
  const totalCosts = breakdown.totalCosts;
  const quote = nonNegative(quoteExVat);
  const vat = vatOn(quote, vatRatePercent);
  return {
    totalCosts,
    minimumPriceExVat: priceForMargin(totalCosts, targetMarginPercent),
    profit: quote - totalCosts,
    marginPercent: marginPercentOf(quote, totalCosts),
    vat,
    priceIncVat: quote + vat,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Quote vs actual variance
// ─────────────────────────────────────────────────────────────────────────

export interface VarianceInputs {
  quotedHours: number;
  actualHours: number;
  /** Labour COST per hour, not the charge-out rate — see below. */
  labourCostPerHour: number;
  /** Materials allowed for in the quote, at COST ex VAT. */
  quotedMaterials: number;
  /** Materials actually bought, at COST ex VAT. */
  actualMaterials: number;
}

export interface VarianceSummary {
  hoursVariance: number;
  /** null when nothing was quoted — an overrun against zero is not "0%". */
  hoursVariancePercent: number | null;
  labourCostVariance: number;
  materialsVariance: number;
  materialsVariancePercent: number | null;
  quotedCostBase: number;
  totalVariance: number;
  totalVariancePercent: number | null;
  status: 'on-target' | 'over' | 'under' | 'unknown';
}

/** Within ±5% of the quoted cost is treated as a good estimate. */
export const ON_TARGET_TOLERANCE_PERCENT = 5;

/**
 * Compares a quote to the outturn. Both sides must be on the same basis:
 * COST, ex VAT. Costing the hours overrun at a charge-out rate would inflate
 * the reported loss by the labour margin, and comparing marked-up quoted
 * materials against materials bought at trade cost invents a favourable
 * variance equal to the markup.
 */
export function varianceSummary(input: Partial<VarianceInputs>): VarianceSummary {
  const quotedHours = nonNegative(input.quotedHours);
  const actualHours = nonNegative(input.actualHours);
  const rate = nonNegative(input.labourCostPerHour);
  const quotedMaterials = nonNegative(input.quotedMaterials);
  const actualMaterials = nonNegative(input.actualMaterials);

  const hoursVariance = actualHours - quotedHours;
  const labourCostVariance = hoursVariance * rate;
  const materialsVariance = actualMaterials - quotedMaterials;
  const quotedCostBase = quotedHours * rate + quotedMaterials;
  const totalVariance = labourCostVariance + materialsVariance;

  const pct = (part: number, base: number) => (base > 0 ? (part / base) * 100 : null);
  const totalVariancePercent = pct(totalVariance, quotedCostBase);

  // With no quote to measure against there is no variance to report. Returning
  // 0% here made a blank form announce "On Target — excellent estimating".
  let status: VarianceSummary['status'];
  if (totalVariancePercent === null) status = 'unknown';
  else if (Math.abs(totalVariancePercent) < ON_TARGET_TOLERANCE_PERCENT) status = 'on-target';
  else if (totalVariance > 0) status = 'over';
  else status = 'under';

  return {
    hoursVariance,
    hoursVariancePercent: pct(hoursVariance, quotedHours),
    labourCostVariance,
    materialsVariance,
    materialsVariancePercent: pct(materialsVariance, quotedMaterials),
    quotedCostBase,
    totalVariance,
    totalVariancePercent,
    status,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Business set-up costs
// ─────────────────────────────────────────────────────────────────────────

/**
 * The mark-up struck on monthly overheads to give a cover target that also
 * leaves something for the owner. It was a bare `* 1.8` with the comment "80%
 * markup" sitting beside a card that read "Profit Margin 44%" — two numbers,
 * two different bases, neither derived from the other. They are now one.
 */
export const OVERHEAD_COVER_MARKUP_PERCENT = 80;

export interface BusinessCostTotals {
  totalStartup: number;
  totalMonthly: number;
  yearOneTotal: number;
  /** Overheads + owner profit that must be covered each month. Not turnover. */
  monthlyCoverTarget: number;
  dailyCoverTarget: number;
  /** Surplus over monthly overheads, i.e. what repays the set-up cost. */
  monthlySurplus: number;
  /** null when there is no surplus — previously rendered as "Infinitymo". */
  breakEvenMonths: number | null;
  /** The margin the 80% markup actually represents: 44.4%, not 80%. */
  impliedMarginPercent: number;
}

/** Working days a month, used to turn a monthly target into a daily one. */
export const WORKING_DAYS_PER_MONTH = 22;

export function businessCostTotals(
  startupInputs: Record<string, number>,
  monthlyInputs: Record<string, number>
): BusinessCostTotals {
  const sum = (o: Record<string, number>) =>
    Object.values(o ?? {}).reduce<number>((t, v) => t + nonNegative(v), 0);

  const totalStartup = sum(startupInputs);
  const totalMonthly = sum(monthlyInputs);
  const monthlyCoverTarget = priceForMarkup(totalMonthly, OVERHEAD_COVER_MARKUP_PERCENT);
  const monthlySurplus = monthlyCoverTarget - totalMonthly;

  return {
    totalStartup,
    totalMonthly,
    yearOneTotal: totalStartup + totalMonthly * 12,
    monthlyCoverTarget,
    dailyCoverTarget: monthlyCoverTarget / WORKING_DAYS_PER_MONTH,
    monthlySurplus,
    breakEvenMonths:
      totalStartup <= 0 ? 0 : monthlySurplus > 0 ? Math.ceil(totalStartup / monthlySurplus) : null,
    impliedMarginPercent: markupToMargin(OVERHEAD_COVER_MARKUP_PERCENT),
  };
}
