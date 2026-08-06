/**
 * UK tax and NI rates for the self-employed — one table, every year.
 *
 * These were previously inline in TaxNIEstimator as two hand-copied objects.
 * By August 2026 the newest year on offer was 2025/26, so the tool was a full
 * tax year out of date and nothing in the code said so. Worse, the 2024/25
 * branch still charged Class 2 at £3.45/week — a liability that stopped
 * existing on 6 April 2024 — while the 2025/26 branch correctly had it at
 * zero. The rates had drifted apart inside the same function.
 *
 * So: every year carries its own `source` and `verifiedOn`. `CURRENT_TAX_YEAR`
 * drives the default, and `isRateTableStale()` lets the UI admit when the
 * table has fallen behind rather than quietly presenting last year's numbers
 * as this year's.
 *
 * England, Wales and Northern Ireland only. Scottish income tax has its own
 * bands and is NOT modelled here — the UI must say so rather than give a
 * Scottish sole trader a confidently wrong answer.
 */

export interface TaxYearRates {
  /** e.g. '2026/27' */
  label: string;
  /** 6 April of the opening year. */
  startsOn: string;

  // Income tax — England, Wales, NI
  personalAllowance: number;
  /** Width of the basic-rate band ABOVE the personal allowance. */
  basicRateBand: number;
  /** Total income at which the additional rate starts. */
  additionalRateThreshold: number;
  basicRate: number;
  higherRate: number;
  additionalRate: number;
  /** Adjusted net income above which the personal allowance tapers £1 per £2. */
  personalAllowanceTaperFrom: number;

  // National Insurance — self-employed
  /**
   * Class 2 is treated as paid (£0) once profits reach the Small Profits
   * Threshold. It is only payable voluntarily, by people BELOW the threshold
   * who want to protect their State Pension record — which is the opposite of
   * a liability, and must never be added to a tax bill automatically.
   */
  class2VoluntaryWeeklyRate: number;
  smallProfitsThreshold: number;
  class4LowerProfitsLimit: number;
  class4UpperProfitsLimit: number;
  class4MainRate: number;
  class4AdditionalRate: number;

  // Other
  marriageAllowance: number;
  vatRegistrationThreshold: number;
  /**
   * Turnover below which you may ask HMRC to cancel your registration.
   *
   * £88,000 since 1 April 2024, up from £83,000. Deliberately set below the
   * £90,000 registration threshold so a business trading around the line does
   * not have to register and deregister repeatedly.
   * Source: https://www.gov.uk/hmrc-internal-manuals/vat-registration-manual/vatreg04050
   * and https://www.gov.uk/government/publications/vat-increasing-the-registration-and-deregistration-thresholds
   * Verified 2026-08-06.
   */
  vatDeregistrationThreshold: number;
  vatStandardRate: number;

  source: string;
  verifiedOn: string;
}

const GOV_UK_EMPLOYER_RATES =
  'https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027';
const GOV_UK_SE_NI = 'https://www.gov.uk/self-employed-national-insurance-rates';

export const UK_TAX_YEARS: Record<string, TaxYearRates> = {
  '2026/27': {
    label: '2026/27',
    startsOn: '2026-04-06',
    personalAllowance: 12570,
    basicRateBand: 37700,
    additionalRateThreshold: 125140,
    basicRate: 0.2,
    higherRate: 0.4,
    additionalRate: 0.45,
    personalAllowanceTaperFrom: 100000,
    // Class 2 not payable at or above the SPT — voluntary rate only.
    class2VoluntaryWeeklyRate: 3.65,
    smallProfitsThreshold: 7105,
    class4LowerProfitsLimit: 12570,
    class4UpperProfitsLimit: 50270,
    class4MainRate: 0.06,
    class4AdditionalRate: 0.02,
    marriageAllowance: 1260,
    vatRegistrationThreshold: 90000,
    vatDeregistrationThreshold: 88000,
    vatStandardRate: 0.2,
    source: `${GOV_UK_EMPLOYER_RATES} · ${GOV_UK_SE_NI}`,
    verifiedOn: '2026-08-06',
  },
  '2025/26': {
    label: '2025/26',
    startsOn: '2025-04-06',
    personalAllowance: 12570,
    basicRateBand: 37700,
    additionalRateThreshold: 125140,
    basicRate: 0.2,
    higherRate: 0.4,
    additionalRate: 0.45,
    personalAllowanceTaperFrom: 100000,
    class2VoluntaryWeeklyRate: 3.5,
    smallProfitsThreshold: 6845,
    class4LowerProfitsLimit: 12570,
    class4UpperProfitsLimit: 50270,
    class4MainRate: 0.06,
    class4AdditionalRate: 0.02,
    marriageAllowance: 1260,
    vatRegistrationThreshold: 90000,
    vatDeregistrationThreshold: 88000,
    vatStandardRate: 0.2,
    source: GOV_UK_SE_NI,
    verifiedOn: '2026-08-06',
  },
  '2024/25': {
    label: '2024/25',
    startsOn: '2024-04-06',
    personalAllowance: 12570,
    basicRateBand: 37700,
    additionalRateThreshold: 125140,
    basicRate: 0.2,
    higherRate: 0.4,
    additionalRate: 0.45,
    personalAllowanceTaperFrom: 100000,
    // Class 2 ceased to be payable above the SPT from 6 April 2024. The old
    // code charged £3.45/week here, inventing ~£179 of liability a year.
    class2VoluntaryWeeklyRate: 3.45,
    smallProfitsThreshold: 6725,
    class4LowerProfitsLimit: 12570,
    class4UpperProfitsLimit: 50270,
    class4MainRate: 0.06,
    class4AdditionalRate: 0.02,
    marriageAllowance: 1260,
    vatRegistrationThreshold: 90000,
    vatDeregistrationThreshold: 88000,
    vatStandardRate: 0.2,
    source: GOV_UK_SE_NI,
    verifiedOn: '2026-08-06',
  },
};

/** Tax years newest first, for a picker. */
export const TAX_YEAR_KEYS = Object.keys(UK_TAX_YEARS).sort().reverse();

/** The UK tax year containing `on` — years run 6 April to 5 April. */
export function taxYearFor(on: Date = new Date()): string {
  const year = on.getFullYear();
  const startOfThisYearsTaxYear = new Date(year, 3, 6); // 6 April
  const opening = on >= startOfThisYearsTaxYear ? year : year - 1;
  return `${opening}/${String((opening + 1) % 100).padStart(2, '0')}`;
}

export const CURRENT_TAX_YEAR = taxYearFor();

/**
 * True when the table has no entry for the live tax year — i.e. it has gone
 * stale and the tool is about to show last year's numbers. The UI is expected
 * to surface this, not swallow it.
 */
export function isRateTableStale(on: Date = new Date()): boolean {
  return !UK_TAX_YEARS[taxYearFor(on)];
}

/** Falls back to the newest year we hold rather than crashing. */
export function ratesFor(taxYear: string): TaxYearRates {
  return UK_TAX_YEARS[taxYear] ?? UK_TAX_YEARS[TAX_YEAR_KEYS[0]];
}

// ─────────────────────────────────────────────────────────────────────────
// Calculation
// ─────────────────────────────────────────────────────────────────────────

export interface SelfEmployedTaxInput {
  /** Turnover less allowable expenses and capital allowances. */
  profit: number;
  /** Gross personal pension contributions (the amount including tax relief). */
  grossPensionContributions?: number;
  /** Gross Gift Aid donations. */
  grossGiftAid?: number;
  /** Receiving a Marriage Allowance transfer FROM a spouse. */
  receivesMarriageAllowance?: boolean;
  /** Transferring Marriage Allowance TO a spouse. */
  transfersMarriageAllowance?: boolean;
}

export interface SelfEmployedTaxResult {
  profit: number;
  personalAllowance: number;
  taxableIncome: number;
  incomeTax: number;
  class4: number;
  class2: number;
  nationalInsurance: number;
  totalTaxAndNI: number;
  takeHome: number;
  /** Tax + NI as a share of profit. */
  effectiveRate: number;
  marginalRate: number;
  notes: string[];
}

/**
 * Income tax + Class 2/4 NI for a sole trader.
 *
 * Two things the previous inline version got wrong, both of which flattered
 * or penalised the user by real money:
 *
 * Pension contributions and Gift Aid were subtracted from taxable income. They
 * do not work that way — they EXTEND the basic-rate band, so a basic-rate
 * taxpayer gets no further relief (the 20% already came back at source) and a
 * higher-rate taxpayer gets the extra 20% only. Subtracting from income gave
 * relief at the marginal rate on the whole contribution, double-counting the
 * basic-rate relief.
 *
 * Marriage Allowance ADDED £1,260 to the personal allowance under a flag named
 * "transfer". For the person transferring it out, the allowance should fall by
 * £1,260. For the recipient it is a £252 tax reducer, not £1,260 of allowance —
 * which happens to coincide at the basic rate and diverges everywhere else.
 */
export function calculateSelfEmployedTax(
  input: SelfEmployedTaxInput,
  taxYear: string = CURRENT_TAX_YEAR
): SelfEmployedTaxResult {
  const r = ratesFor(taxYear);
  const notes: string[] = [];

  const profit = Math.max(0, input.profit);
  const pension = Math.max(0, input.grossPensionContributions ?? 0);
  const giftAid = Math.max(0, input.grossGiftAid ?? 0);

  // Adjusted net income drives the personal-allowance taper, and it is net of
  // gross pension and Gift Aid.
  const adjustedNetIncome = Math.max(0, profit - pension - giftAid);

  let personalAllowance = r.personalAllowance;
  if (adjustedNetIncome > r.personalAllowanceTaperFrom) {
    const reduction = Math.min(
      personalAllowance,
      (adjustedNetIncome - r.personalAllowanceTaperFrom) / 2
    );
    personalAllowance -= reduction;
    if (reduction > 0) notes.push('Personal allowance tapered £1 for every £2 over £100,000.');
  }

  if (input.transfersMarriageAllowance) {
    personalAllowance = Math.max(0, personalAllowance - r.marriageAllowance);
    notes.push(`£${r.marriageAllowance.toLocaleString('en-GB')} of allowance transferred to your spouse.`);
  }

  const taxableIncome = Math.max(0, profit - personalAllowance);

  // Relief on pension and Gift Aid comes through a WIDER basic-rate band.
  const basicBand = r.basicRateBand + pension + giftAid;
  if (pension + giftAid > 0) {
    notes.push('Pension and Gift Aid widen your basic-rate band rather than reducing your income.');
  }

  const additionalBandStartsAt = Math.max(
    basicBand,
    r.additionalRateThreshold - personalAllowance
  );

  let incomeTax = 0;
  const atBasic = Math.min(taxableIncome, basicBand);
  const atHigher = Math.max(0, Math.min(taxableIncome, additionalBandStartsAt) - basicBand);
  const atAdditional = Math.max(0, taxableIncome - additionalBandStartsAt);
  incomeTax += atBasic * r.basicRate;
  incomeTax += atHigher * r.higherRate;
  incomeTax += atAdditional * r.additionalRate;

  // Marriage Allowance received is a tax REDUCER, capped at the tax due, and
  // only available while you remain a basic-rate taxpayer.
  if (input.receivesMarriageAllowance) {
    if (atHigher > 0 || atAdditional > 0) {
      notes.push('Marriage Allowance cannot be claimed by a higher or additional rate taxpayer.');
    } else {
      const reducer = Math.min(incomeTax, r.marriageAllowance * r.basicRate);
      incomeTax -= reducer;
    }
  }

  // Class 2: £0 at or above the Small Profits Threshold — it is treated as
  // paid. Below it, contributions are VOLUNTARY, so they are never added to
  // the bill automatically; the note tells the user the option exists.
  const class2 = 0;
  if (profit < r.smallProfitsThreshold) {
    notes.push(
      `Profit is below the £${r.smallProfitsThreshold.toLocaleString('en-GB')} Small Profits Threshold. Class 2 is voluntary at £${r.class2VoluntaryWeeklyRate.toFixed(2)}/week if you want the State Pension qualifying year.`
    );
  }

  let class4 = 0;
  if (profit > r.class4LowerProfitsLimit) {
    const main =
      Math.min(profit, r.class4UpperProfitsLimit) - r.class4LowerProfitsLimit;
    class4 += Math.max(0, main) * r.class4MainRate;
    if (profit > r.class4UpperProfitsLimit) {
      class4 += (profit - r.class4UpperProfitsLimit) * r.class4AdditionalRate;
    }
  }

  const nationalInsurance = class2 + class4;
  const totalTaxAndNI = incomeTax + nationalInsurance;

  // What the next £1 of profit costs.
  const incomeTaxMarginal =
    taxableIncome <= 0
      ? 0
      : taxableIncome > additionalBandStartsAt
        ? r.additionalRate
        : taxableIncome > basicBand
          ? r.higherRate
          : r.basicRate;
  const class4Marginal =
    profit > r.class4UpperProfitsLimit
      ? r.class4AdditionalRate
      : profit > r.class4LowerProfitsLimit
        ? r.class4MainRate
        : 0;
  // Inside the taper the effective marginal rate is famously ~60%: each extra
  // £1 also strips 50p of allowance.
  const inTaper =
    adjustedNetIncome > r.personalAllowanceTaperFrom &&
    adjustedNetIncome < r.personalAllowanceTaperFrom + r.personalAllowance * 2;
  const marginalRate =
    (incomeTaxMarginal + class4Marginal + (inTaper ? r.higherRate / 2 : 0)) * 100;
  if (inTaper) {
    notes.push('You are in the £100k–£125,140 band where the effective marginal rate is about 60%.');
  }

  return {
    profit,
    personalAllowance,
    taxableIncome,
    incomeTax,
    class4,
    class2,
    nationalInsurance,
    totalTaxAndNI,
    takeHome: profit - totalTaxAndNI,
    effectiveRate: profit > 0 ? (totalTaxAndNI / profit) * 100 : 0,
    marginalRate,
    notes,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// VAT schemes
// ─────────────────────────────────────────────────────────────────────────

const GOV_UK_VAT_THRESHOLDS = 'https://www.gov.uk/how-vat-works/vat-thresholds';
const GOV_UK_FRS_RATES = 'https://www.gov.uk/vat-flat-rate-scheme/how-much-you-pay';
const GOV_UK_NOTICE_733 =
  'https://www.gov.uk/guidance/flat-rate-scheme-for-small-businesses-vat-notice-733--2';

/**
 * Scheme entry and exit thresholds.
 *
 * Watch which figures include VAT. You JOIN the Flat Rate Scheme on an ex-VAT
 * figure (£150,000) but you LEAVE it on a VAT-inclusive one (£230,000, tested
 * on each anniversary) — quoting only the £150,000, as the old UI did, hides
 * the exit test entirely.
 */
export const VAT_SCHEME_THRESHOLDS = {
  /** Rolling 12-month total taxable turnover, excluding VAT. */
  registration: 90000,
  /** You may ask HMRC to cancel your registration below this (ex VAT). */
  deregistration: 88000,
  /** Expected ex-VAT taxable turnover for the next 12 months. */
  flatRateJoin: 150000,
  /** Total income INCLUDING VAT on a scheme anniversary. */
  flatRateLeave: 230000,
  cashAccountingJoin: 1350000,
  cashAccountingLeave: 1600000,
  annualAccountingJoin: 1350000,
  annualAccountingLeave: 1600000,
  source: GOV_UK_VAT_THRESHOLDS,
  verifiedOn: '2026-08-06',
} as const;

/**
 * Flat Rate Scheme constants for building and construction work.
 *
 * There is no "electrician" sector. An electrician falls into one of two
 * construction sectors, chosen by a materials test, and the old tool hard-coded
 * the wrong one as a default:
 *
 *   Labour-only building or construction services  14.5%  materials < 10%
 *   General building or construction services       9.5%  materials >= 10%
 *
 * The 1% reduction is for the first year of VAT REGISTRATION, so the rate goes
 * UP after year one (13.5% -> 14.5%), never down. The old UI said "14.5% now,
 * 12.5% after year 1", which is wrong in direction and in size.
 */
export const FLAT_RATE_SCHEME = {
  labourOnlyConstruction: 14.5,
  generalConstruction: 9.5,
  limitedCostBusiness: 16.5,
  /** Percentage points off, first year of VAT registration only. */
  firstYearDiscount: 1,
  /** Materials below this share of the turnover for those services = labour-only. */
  labourOnlyMaterialsShare: 0.1,
  /** Relevant goods (inc VAT) below this share of flat rate turnover = limited cost. */
  limitedCostGoodsShare: 0.02,
  limitedCostGoodsFloorPerYear: 1000,
  limitedCostGoodsFloorPerQuarter: 250,
  /** Single capital purchase inc VAT at or above this can still be reclaimed. */
  capitalGoodsReclaimFloorIncVat: 2000,
  source: `${GOV_UK_FRS_RATES} · ${GOV_UK_NOTICE_733}`,
  verifiedOn: '2026-08-06',
} as const;

export interface FlatRateSchemeInput {
  /** Turnover for the period, EXCLUDING VAT. */
  turnoverExVat: number;
  /** VAT rate as a percentage, e.g. 20. */
  vatRatePercent: number;
  /**
   * Materials supplied with the work, excluding VAT. Drives the 10% labour-only
   * sector test and stands in for relevant-goods spend in the limited cost test.
   */
  materialsExVat: number;
  /** Overrides the sector percentage. The limited cost rule still wins. */
  sectorPercentageOverride?: number;
  /** First year of VAT REGISTRATION (not of joining the scheme). */
  firstYearOfRegistration?: boolean;
  /** The £1,000 limited cost floor is £250 on a quarterly return. */
  period?: 'year' | 'quarter';
}

export interface FlatRateSchemeResult {
  sector: 'labour-only' | 'general';
  sectorPercentage: number;
  limitedCostBusiness: boolean;
  /** The percentage actually charged, after the limited cost rule and discount. */
  appliedPercentage: number;
  /** Turnover INCLUDING VAT — the base the flat rate is applied to. */
  flatRateTurnoverIncVat: number;
  vatDue: number;
  notes: string[];
}

/**
 * VAT due under the Flat Rate Scheme.
 *
 * The percentage goes on VAT-INCLUSIVE turnover: "Your flat rate turnover is
 * all the supplies your business makes, including VAT" (Notice 733). Applying
 * it to net turnover understates the bill by a sixth.
 *
 * The limited cost business rate of 16.5% is mandatory, not advisory, and it
 * bites exactly the labour-heavy electrician the 14.5% sector is meant for:
 * on £120,000 of turnover with under £2,880 of materials, 16.5% of the gross
 * is £23,760 against £20,880 at 14.5%.
 */
export function flatRateSchemeVat(input: FlatRateSchemeInput): FlatRateSchemeResult {
  const notes: string[] = [];
  const vatRate = Math.max(0, input.vatRatePercent) / 100;
  const turnoverExVat = Math.max(0, input.turnoverExVat);
  const materialsExVat = Math.max(0, input.materialsExVat);

  const flatRateTurnoverIncVat = turnoverExVat * (1 + vatRate);
  const goodsIncVat = materialsExVat * (1 + vatRate);

  const materialsShare = turnoverExVat > 0 ? materialsExVat / turnoverExVat : 0;
  const labourOnly = materialsShare < FLAT_RATE_SCHEME.labourOnlyMaterialsShare;
  const sectorPercentage = labourOnly
    ? FLAT_RATE_SCHEME.labourOnlyConstruction
    : FLAT_RATE_SCHEME.generalConstruction;

  const floor =
    input.period === 'quarter'
      ? FLAT_RATE_SCHEME.limitedCostGoodsFloorPerQuarter
      : FLAT_RATE_SCHEME.limitedCostGoodsFloorPerYear;
  // "less than 2% of turnover" OR "more than 2% but less than £1,000 a year".
  const limitedCostBusiness =
    flatRateTurnoverIncVat > 0 &&
    (goodsIncVat < FLAT_RATE_SCHEME.limitedCostGoodsShare * flatRateTurnoverIncVat ||
      goodsIncVat < floor);

  const chosen = input.sectorPercentageOverride ?? sectorPercentage;
  let appliedPercentage = limitedCostBusiness ? FLAT_RATE_SCHEME.limitedCostBusiness : chosen;

  if (limitedCostBusiness) {
    notes.push(
      `Limited cost business: relevant goods are under 2% of gross turnover (or under £${floor.toLocaleString('en-GB')}), so HMRC requires the 16.5% rate.`
    );
  } else if (input.sectorPercentageOverride === undefined) {
    notes.push(
      labourOnly
        ? 'Materials are under 10% of turnover, so this is labour-only building or construction services at 14.5%.'
        : 'Materials are 10% or more of turnover, so this is general building or construction services at 9.5%.'
    );
  }

  if (input.firstYearOfRegistration) {
    appliedPercentage = Math.max(0, appliedPercentage - FLAT_RATE_SCHEME.firstYearDiscount);
    notes.push('1% discount applied for the first year of VAT registration.');
  }

  return {
    sector: labourOnly ? 'labour-only' : 'general',
    sectorPercentage,
    limitedCostBusiness,
    appliedPercentage,
    flatRateTurnoverIncVat,
    vatDue: flatRateTurnoverIncVat * (appliedPercentage / 100),
    notes,
  };
}

export interface VatSchemeComparisonInput {
  /** Annual turnover EXCLUDING VAT. */
  turnoverExVat: number;
  vatRatePercent: number;
  /** Share of turnover that is labour, 0–100. */
  labourSharePercent: number;
  /** Overrides the Flat Rate Scheme sector percentage. */
  flatRatePercentOverride?: number;
  firstYearOfRegistration?: boolean;
}

export interface VatSchemeComparisonResult {
  labour: number;
  materials: number;
  standard: { outputVat: number; inputVat: number; netVatPayable: number };
  flatRate: FlatRateSchemeResult;
  /** Positive = the Flat Rate Scheme costs MORE than standard. */
  difference: number;
  better: 'standard' | 'flat-rate';
  annualSaving: number;
  warnings: string[];
}

/** Standard vs Flat Rate, with the eligibility tests the comparison depends on. */
export function compareVatSchemes(input: VatSchemeComparisonInput): VatSchemeComparisonResult {
  const warnings: string[] = [];
  const turnover = Math.max(0, input.turnoverExVat);
  const vatRate = Math.max(0, input.vatRatePercent) / 100;
  const labourShare = Math.min(100, Math.max(0, input.labourSharePercent));
  const labour = turnover * (labourShare / 100);
  const materials = turnover - labour;

  const outputVat = turnover * vatRate;
  const inputVat = materials * vatRate;
  const netVatPayable = outputVat - inputVat;

  const flatRate = flatRateSchemeVat({
    turnoverExVat: turnover,
    vatRatePercent: input.vatRatePercent,
    materialsExVat: materials,
    sectorPercentageOverride: input.flatRatePercentOverride,
    firstYearOfRegistration: input.firstYearOfRegistration,
  });

  if (turnover > VAT_SCHEME_THRESHOLDS.flatRateJoin) {
    warnings.push(
      `Turnover is over the £${VAT_SCHEME_THRESHOLDS.flatRateJoin.toLocaleString('en-GB')} ex-VAT limit for joining the Flat Rate Scheme, so this comparison is hypothetical.`
    );
  }
  if (flatRate.flatRateTurnoverIncVat > VAT_SCHEME_THRESHOLDS.flatRateLeave) {
    warnings.push(
      `Total income including VAT is over £${VAT_SCHEME_THRESHOLDS.flatRateLeave.toLocaleString('en-GB')}, the point at which you must leave the Flat Rate Scheme.`
    );
  }
  if (
    input.flatRatePercentOverride !== undefined &&
    !flatRate.limitedCostBusiness &&
    Math.abs(input.flatRatePercentOverride - flatRate.sectorPercentage) > 0.001
  ) {
    warnings.push(
      `Your labour/materials split points to ${flatRate.sectorPercentage}% (${flatRate.sector === 'labour-only' ? 'labour-only' : 'general'} building or construction services), not ${input.flatRatePercentOverride}%.`
    );
  }

  const difference = flatRate.vatDue - netVatPayable;
  return {
    labour,
    materials,
    standard: { outputVat, inputVat, netVatPayable },
    flatRate,
    difference,
    better: difference > 0 ? 'standard' : 'flat-rate',
    annualSaving: Math.abs(difference),
    warnings,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Construction Industry Scheme and the domestic reverse charge
// ─────────────────────────────────────────────────────────────────────────

const GOV_UK_CIS_340 =
  'https://www.gov.uk/government/publications/construction-industry-scheme-cis-340/construction-industry-scheme-a-guide-for-contractors-and-subcontractors-cis-340';
const GOV_UK_DRC = 'https://www.gov.uk/guidance/vat-reverse-charge-technical-guide';

export const CIS_DEDUCTION_RATES = {
  /** Gross payment status. */
  gross: 0,
  /** Registered and successfully verified. */
  registered: 20,
  /** Not registered, or not matched at verification. */
  unregistered: 30,
  source: GOV_UK_CIS_340,
  verifiedOn: '2026-08-06',
} as const;

export const DOMESTIC_REVERSE_CHARGE = {
  startedOn: '2021-03-01',
  /** Reverse charge element at or below this share of the whole supply is ignored. */
  disregardShare: 0.05,
  source: GOV_UK_DRC,
  verifiedOn: '2026-08-06',
} as const;

export interface CisInvoiceInput {
  /** Labour, ex VAT — the only part the CIS deduction is taken from. */
  labourExVat: number;
  /**
   * Everything CIS 340 keeps OUT of the deduction: materials the subcontractor
   * actually paid for, consumable stores, plant hire from a third party, fuel
   * for plant (not travel), prefabrication and the CITB levy. Ex VAT.
   */
  exemptCostsExVat: number;
  /** 0, 20 or 30. */
  cisRatePercent: number;
  vatRatePercent: number;
  vatRegistered: boolean;
  /** Domestic reverse charge applies to this supply. */
  reverseCharge: boolean;
  /** False for a contractor pricing its own sales invoice. */
  suffersDeduction: boolean;
}

export interface CisInvoiceResult {
  subTotal: number;
  vat: number;
  invoiceTotal: number;
  cisDeduction: number;
  cashReceived: number;
  /** VAT the customer self-accounts for under the reverse charge. */
  reverseChargeVat: number;
  notes: string[];
}

/**
 * A CIS subcontractor invoice.
 *
 * The deduction is taken from labour only. CIS 340: "a 'payment' under the
 * Scheme does not include the cost of materials, VAT, or an amount in respect
 * of the CITB levy". Applying the percentage to the invoice total instead of
 * the labour line over-deducts by rate x (materials + VAT) — on a £1,000 +
 * £300 materials job at 20% that is £60 of the subcontractor's cash gone, and
 * more once VAT is in the base.
 */
export function cisInvoice(input: CisInvoiceInput): CisInvoiceResult {
  const notes: string[] = [];
  const labour = Math.max(0, input.labourExVat);
  const exempt = Math.max(0, input.exemptCostsExVat);
  const cisRate = Math.max(0, input.cisRatePercent) / 100;
  const vatRate = Math.max(0, input.vatRatePercent) / 100;

  const subTotal = labour + exempt;

  // The reverse charge needs a VAT-registered supplier and customer. If the
  // subcontractor is not registered there is no VAT to reverse-charge at all.
  const reverseChargeInEffect = input.reverseCharge && input.vatRegistered;
  if (input.reverseCharge && !input.vatRegistered) {
    notes.push(
      'The domestic reverse charge only applies between VAT-registered businesses. Not registered means no VAT on the invoice for that reason instead.'
    );
  }

  const vat = input.vatRegistered && !reverseChargeInEffect ? subTotal * vatRate : 0;
  const reverseChargeVat = reverseChargeInEffect ? subTotal * vatRate : 0;
  const invoiceTotal = subTotal + vat;

  const cisDeduction = input.suffersDeduction ? labour * cisRate : 0;

  if (
    input.suffersDeduction &&
    input.cisRatePercent !== CIS_DEDUCTION_RATES.gross &&
    input.cisRatePercent !== CIS_DEDUCTION_RATES.registered &&
    input.cisRatePercent !== CIS_DEDUCTION_RATES.unregistered
  ) {
    notes.push('CIS deduction rates are 0% (gross status), 20% (registered) or 30% (unregistered).');
  }

  return {
    subTotal,
    vat,
    invoiceTotal,
    cisDeduction,
    cashReceived: invoiceTotal - cisDeduction,
    reverseChargeVat,
    notes,
  };
}
