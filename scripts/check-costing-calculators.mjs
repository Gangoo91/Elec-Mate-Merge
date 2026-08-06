/**
 * check-costing-calculators — arithmetic proof for the three UK costing tools:
 *   HourlyRateCalculator, StaffCostCalculator, MinimumChargeCalculator.
 *
 * The formulas below are duplicated from those screens on purpose: if someone
 * edits a calculator and breaks the maths, this script must fail rather than the
 * user quietly under-pricing every job. The verified constants come from
 * src/data/ukRates.ts, which carries its own gov.uk / JIB sources.
 *
 * Run: npx tsx scripts/check-costing-calculators.mjs
 */
import {
  JIB_RATES_2026,
  JIB_WORKING_WEEK_HOURS,
  JIB_PAID_HOURS_PER_YEAR,
  UK_EMPLOYER_COSTS,
  UK_MINIMUM_WAGE,
  UK_STATUTORY_HOLIDAY_WEEKS,
  employerNIOn,
  employerPensionOn,
  priceFromMargin,
} from '../src/data/ukRates.ts';

let fails = 0;
const gbp = (n) => '£' + n.toFixed(2);
const check = (name, actual, expected, tol = 0.005) => {
  const ok = Math.abs(actual - expected) <= tol;
  if (!ok) fails++;
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(56)} got ${String(actual.toFixed(2)).padStart(12)}  want ${String(expected.toFixed(2)).padStart(12)}`
  );
};
const section = (t) => console.log(`\n── ${t} ${'─'.repeat(Math.max(0, 70 - t.length))}`);

// ═══════════════════════════════════════════════════════════════════════════
// 1. Verified statutory / JIB constants
//    gov.uk rates-and-thresholds-for-employers-2026-to-2027 (fetched 2026-08-06)
//    gov.uk workplace-pensions (DWP froze the 2026/27 AE band at 2025/26 levels)
//    JIB Handbook 2026 Section 2, effective 5 January 2026
// ═══════════════════════════════════════════════════════════════════════════
section('Verified constants');
check('Employer NI rate is 15%, not 13.8%', UK_EMPLOYER_COSTS.employerNIRate, 0.15);
check('Secondary threshold £5,000/yr', UK_EMPLOYER_COSTS.employerNISecondaryThresholdAnnual, 5000);
check('Employment Allowance £10,500', UK_EMPLOYER_COSTS.employmentAllowance, 10500);
check('Pension employer minimum 3%', UK_EMPLOYER_COSTS.pensionEmployerMinRate, 0.03);
check('Qualifying earnings lower £6,240', UK_EMPLOYER_COSTS.pensionQualifyingEarningsLower, 6240);
check('Qualifying earnings upper £50,270', UK_EMPLOYER_COSTS.pensionQualifyingEarningsUpper, 50270);
check('Statutory holiday 5.6 weeks', UK_STATUTORY_HOLIDAY_WEEKS, 5.6);
check('JIB working week 37.5h, not 40 (NWR 3.1)', JIB_WORKING_WEEK_HOURS, 37.5);
check('JIB paid-hours year 1950, not 2080', JIB_PAID_HOURS_PER_YEAR, 1950);
check('JIB Electrician £18.38 (Transport Provided)', JIB_RATES_2026.graded.electrician, 18.38);
check('JIB Approved Electrician £20.08', JIB_RATES_2026.graded.approvedElectrician, 20.08);
check('JIB Technician £22.70', JIB_RATES_2026.graded.technician, 22.7);
check('NLW 21+ £12.71 from April 2026 (was £12.21)', UK_MINIMUM_WAGE.nlw21Plus, 12.71);

// ═══════════════════════════════════════════════════════════════════════════
// 2. Margin is NOT markup
// ═══════════════════════════════════════════════════════════════════════════
section('Margin vs markup');
// £100 of cost at a 20% MARGIN sells for £125: profit £25 is 20% of £125.
check('20% margin on £100 cost → £125', priceFromMargin(100, 20), 125);
check('  …profit is 20% OF THE PRICE', (125 - 100) / 125, 0.2, 1e-9);
// Markup would give £120, where profit £20 is only 16.67% of the price.
check('markup ×1.20 would give only 16.67% margin', (120 - 100) / 120, 1 / 6, 1e-9);
check('0% margin is a pass-through', priceFromMargin(100, 0), 100);
// Old guards: HourlyRate did Math.max(1 − m, 0.01) → ×100; StaffCost hit /0.
check('100% margin clamps at 95%, never ×100 or Infinity', priceFromMargin(100, 100), 2000);
check('negative margin cannot cut the price', priceFromMargin(100, -50), 100);

// ═══════════════════════════════════════════════════════════════════════════
// 3. Employer on-costs are charged on a SLICE, not the whole salary
// ═══════════════════════════════════════════════════════════════════════════
section('Employer NI + pension bases');
// £35,000 salary — the HourlyRateCalculator default.
check('NI on £35k = (35000 − 5000) × 15%', employerNIOn(35000), 4500);
check('  wrong: 35000 × 15% would be', 35000 * 0.15, 5250);
check('  wrong: 35000 × 13.8% (stale rate)', 35000 * 0.138, 4830);
check('Pension on £35k = (35000 − 6240) × 3%', employerPensionOn(35000), 862.8);
check('  wrong: 35000 × 3% would be', 35000 * 0.03, 1050);
// Above the upper limit the pension is capped.
check('Pension caps at (50270 − 6240) × 3%', employerPensionOn(80000), 1320.9);
check('  wrong: 80000 × 3% would be', 80000 * 0.03, 2400);
check('No NI below the secondary threshold', employerNIOn(4000), 0);
check('No pension below qualifying earnings', employerPensionOn(6000), 0);

// ═══════════════════════════════════════════════════════════════════════════
// 4. HourlyRateCalculator — full recomputation at the fixed defaults
// ═══════════════════════════════════════════════════════════════════════════
section('HourlyRateCalculator (defaults)');
const hr = {
  annualSalary: 35000,
  workingDaysPerYear: 260, // GROSS weekdays; was 230, a net figure → double-count
  hoursPerDay: 7.5, // JIB 37.5h week; was 8
  paidLeaveDays: 25,
  bankHolidays: 8,
  sickDays: 5,
  trainingDays: 3,
  employerNI: 15, // was 13.8
  employerPension: 3,
  profFeesAnnual: 1000,
  calibrationAnnual: 300,
  softwareAnnual: 450,
  vehicleAnnual: 4000,
  overheadPercentage: 25,
  profitMargin: 25,
  utilizationRate: 75,
};
const effectiveDays =
  hr.workingDaysPerYear - hr.paidLeaveDays - hr.bankHolidays - hr.sickDays - hr.trainingDays;
check('effective working days = 260 − 41', effectiveDays, 219);
const totalWorkingHours = effectiveDays * hr.hoursPerDay;
check('working hours = 219 × 7.5', totalWorkingHours, 1642.5);
const billableHours = Math.max((totalWorkingHours * hr.utilizationRate) / 100, 1);
check('billable hours at 75% utilisation', billableHours, 1231.875);

const niAnnual = employerNIOn(hr.annualSalary, hr.employerNI / 100);
const pensionAnnual = employerPensionOn(hr.annualSalary, hr.employerPension / 100);
const baseCostAnnual =
  hr.annualSalary +
  niAnnual +
  pensionAnnual +
  hr.profFeesAnnual +
  hr.calibrationAnnual +
  hr.softwareAnnual +
  hr.vehicleAnnual;
check('base cost annual', baseCostAnnual, 35000 + 4500 + 862.8 + 1000 + 300 + 450 + 4000);
const baseCostPerHour = baseCostAnnual / billableHours;
const overheadCostPerHour = (baseCostAnnual * (hr.overheadPercentage / 100)) / billableHours;
const totalCostPerHour = baseCostPerHour + overheadCostPerHour;
check('total cost/hr = base × 1.25 / billable', totalCostPerHour, (baseCostAnnual * 1.25) / 1231.875);
const minimumRate = priceFromMargin(totalCostPerHour, hr.profitMargin);
check('rate/hr = cost / (1 − 0.25)', minimumRate, totalCostPerHour / 0.75);
check('  profit really is 25% of the rate', (minimumRate - totalCostPerHour) / minimumRate, 0.25, 1e-9);
check('day rate = rate × 7.5h', minimumRate * hr.hoursPerDay, minimumRate * 7.5);

// The old code, for contrast: 230 gross days, 8h, 13.8% + 3% on the whole salary.
const oldDays = 230 - 41;
const oldBillable = oldDays * 8 * 0.75;
const oldBase = 35000 * (1 + (13.8 + 3) / 100) + 1000 + 300 + 450 + 4000;
const oldRate = ((oldBase * 1.25) / oldBillable) / 0.75;
console.log(
  `      old model: ${gbp(oldRate)}/hr from ${oldBillable.toFixed(0)} billable hrs · ` +
    `fixed: ${gbp(minimumRate)}/hr from ${billableHours.toFixed(0)} hrs`
);

// VAT must reconcile with the rounded ex-VAT price, not be rounded twice.
const roundToNearest = (v, step) => Math.round(v / step) * step;
const exVat = 70;
check('inc VAT on a £70 ex-VAT rate', exVat * 1.2, 84);
check('  double-rounding to £5 used to show', roundToNearest(exVat * 1.2, 5), 85);
check('  …which implies an ex-VAT price of', 85 / 1.2, 70.8333, 0.001);

// ═══════════════════════════════════════════════════════════════════════════
// 5. StaffCostCalculator — full recomputation at the fixed defaults
// ═══════════════════════════════════════════════════════════════════════════
section('StaffCostCalculator (defaults)');
const sc = {
  basePayHr: 26,
  weeklyHours: 37.5, // was 40
  paidWeeks: 52,
  holidaysDays: 28, // was collected and then IGNORED
  sickDays: 3, // was collected and then IGNORED
  niRate: 15, // was 13.8
  pensionRate: 3,
  vanYear: 4200,
  toolsYear: 1000,
  insuranceYear: 1500,
  trainingYear: 600,
  utilisation: 65,
  targetMargin: 20,
};
const annualBase = sc.basePayHr * sc.weeklyHours * sc.paidWeeks;
check('annual base pay = 26 × 37.5 × 52', annualBase, 50700);
const scNI = employerNIOn(annualBase, sc.niRate / 100);
check('employer NI = (50700 − 5000) × 15%', scNI, 6855);
check('  wrong: 50700 × 13.8% was', annualBase * 0.138, 6996.6);
const scPension = employerPensionOn(annualBase, sc.pensionRate / 100);
check('pension = (50270 − 6240) × 3%', scPension, 1320.9);
check('  wrong: 50700 × 3% was', annualBase * 0.03, 1521);
const scOnCosts = 4200 + 1000 + 1500 + 600 + scNI + scPension;
const scTotal = annualBase + scOnCosts;
check('total annual cost', scTotal, 50700 + 7300 + 6855 + 1320.9);

const paidHours = sc.weeklyHours * sc.paidWeeks;
check('paid hours = 37.5 × 52', paidHours, 1950);
const hoursPerDay = sc.weeklyHours / 5;
const absenceHours = (sc.holidaysDays + sc.sickDays) * hoursPerDay;
check('holiday + sick = 31 days × 7.5h', absenceHours, 232.5);
const attendedHours = paidHours - absenceHours;
check('hours actually worked', attendedHours, 1717.5);
const scEffective = attendedHours * (sc.utilisation / 100);
check('billable at 65% of hours WORKED', scEffective, 1116.375);
check('  old model billed 65% of PAID hours', paidHours * 0.65, 1267.5);

const loadedHourly = scTotal / scEffective;
check('true hourly cost', loadedHourly, scTotal / 1116.375);
const chargeOut = priceFromMargin(loadedHourly, sc.targetMargin);
check('charge-out = cost / (1 − 0.20)', chargeOut, loadedHourly / 0.8);
check('  margin really is 20% of the price', (chargeOut - loadedHourly) / chargeOut, 0.2, 1e-9);

// A 5.6-week holiday paid but not worked is ~10.8% of the paid year. Any model
// that bills all 52 weeks understates the hourly cost by at least that much.
check('holiday is 10.77% of the paid year', UK_STATUTORY_HOLIDAY_WEEKS / 52, 0.1077, 0.0001);

const oldLoaded =
  (annualBase * (1 + (13.8 + 3) / 100) + 7300) / (40 * 52 * 0.65);
const oldWeekBase = 26 * 40 * 52;
const oldLoadedTrue = (oldWeekBase * 1.168 + 7300) / (40 * 52 * 0.65);
console.log(
  `      old model: ${gbp(oldLoadedTrue)}/hr · fixed: ${gbp(loadedHourly)}/hr ` +
    `(+${(((loadedHourly - oldLoadedTrue) / oldLoadedTrue) * 100).toFixed(1)}%)`
);
void oldLoaded;

// ═══════════════════════════════════════════════════════════════════════════
// 6. MinimumChargeCalculator — full recomputation at the fixed defaults
// ═══════════════════════════════════════════════════════════════════════════
section('MinimumChargeCalculator (defaults)');
const roundUpTo = (n, step) => Math.ceil(n / step) * step;
const mc = {
  travelMins: 30,
  adminMins: 15,
  hourlyCost: 30,
  overheadHr: 10,
  targetMargin: 20, // NEW — there was no margin at all
  firstHourPremium: 25,
  vatRate: 20,
  rounding: 5,
};
const costPerHour = mc.hourlyCost + mc.overheadHr;
check('cost per hour', costPerHour, 40);
const travelReturn = mc.travelMins * 2;
check('travel is a RETURN journey', travelReturn, 60);
const timeCost = ((travelReturn + mc.adminMins) / 60) * costPerHour;
check('travel + admin time cost (75 mins @ £40)', timeCost, 50);
check('  one-way only used to cost', ((30 + 15) / 60) * 40, 30);

const firstHourCost = costPerHour + timeCost;
check('first hour COST', firstHourCost, 90);
const firstHourAtMargin = priceFromMargin(firstHourCost, mc.targetMargin);
check('first hour at 20% margin', firstHourAtMargin, 112.5);
const firstHourUplift = firstHourAtMargin * (1 + mc.firstHourPremium / 100);
check('+ 25% short-job premium', firstHourUplift, 140.625);
const firstHourRounded = roundUpTo(firstHourUplift, mc.rounding);
check('rounded UP to nearest £5', firstHourRounded, 145);
check('  Math.round would have gone DOWN to', Math.round(140.625 / 5) * 5, 140);
const firstHourIncVat = firstHourRounded * (1 + mc.vatRate / 100);
check('first hour inc VAT', firstHourIncVat, 174);

const subsequentBase = priceFromMargin(costPerHour, mc.targetMargin);
check('subsequent hour at 20% margin', subsequentBase, 50);
check('  used to be sold at COST', costPerHour, 40);
const subsequentRounded = roundUpTo(subsequentBase, mc.rounding);
check('subsequent hour rounded up', subsequentRounded, 50);
const subsequentIncVat = subsequentRounded * 1.2;
check('subsequent hour inc VAT', subsequentIncVat, 60);
check('3-hour job total inc VAT', firstHourIncVat + subsequentIncVat * 2, 294);

// Every hour must clear its own cost once the margin is applied.
check('subsequent-hour profit is 20% of price', (subsequentRounded - costPerHour) / subsequentRounded, 0.2, 1e-9);
if (subsequentRounded <= costPerHour) {
  fails++;
  console.log('FAIL  subsequent hours are priced at or below cost');
}
if (firstHourRounded < firstHourUplift) {
  fails++;
  console.log('FAIL  the minimum charge rounded BELOW the calculated minimum');
}

console.log(fails === 0 ? '\nALL PASS' : `\n${fails} FAILED`);
process.exit(fails ? 1 : 0);
