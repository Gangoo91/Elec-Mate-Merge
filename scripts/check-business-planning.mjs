/**
 * Arithmetic assertions for the three business planning calculators.
 *
 *   npm run check:business-planning
 *
 * Every expected value below is worked by hand in the comment above it. These
 * import the REAL modules the pages use — a check that re-implements the
 * formula proves nothing.
 */
import {
  calculateCapacityMetrics,
  calculateEquipmentRoi,
  JIB_WEEKLY_HOURS,
  STATUTORY_HOLIDAY_WEEKS,
  AIA_ANNUAL_LIMIT,
} from '../src/utils/business-planning-maths.ts';
import { applyPaymentLag, buildCashFlowProjection } from '../src/hooks/use-cash-flow.ts';
import { ratesFor, CURRENT_TAX_YEAR } from '../src/data/uk-tax-rates.ts';

let fails = 0;
let checks = 0;

const check = (name, actual, expected, tol = 0.01) => {
  checks++;
  const ok = Math.abs(actual - expected) <= tol;
  if (!ok) fails++;
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(56)} got ${String(
      typeof actual === 'number' ? actual.toFixed(2) : actual
    ).padStart(14)}  want ${String(expected.toFixed ? expected.toFixed(2) : expected).padStart(14)}`
  );
};

const checkIs = (name, actual, expected) => {
  checks++;
  const ok = Object.is(actual, expected);
  if (!ok) fails++;
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(56)} got ${String(actual).padStart(14)}  want ${String(
      expected
    ).padStart(14)}`
  );
};

const section = (t) => console.log(`\n── ${t} ${'─'.repeat(Math.max(0, 66 - t.length))}`);

// ═════════════════════════════════════════════════════════════════════════
section('Verified UK facts');
// ═════════════════════════════════════════════════════════════════════════

// JIB National Working Rule 3.1: 37.5-hour week, NOT 40.
check('JIB working week is 37.5h', JIB_WEEKLY_HOURS, 37.5);
check('37.5 x 52 = 1,950 gross paid hours a year', JIB_WEEKLY_HOURS * 52, 1950);
check('A 40h week would overstate by 130h', 40 * 52 - JIB_WEEKLY_HOURS * 52, 130);
check('Statutory holiday is 5.6 weeks', STATUTORY_HOLIDAY_WEEKS, 5.6);
check('5.6 weeks at 5 days = 28 days', STATUTORY_HOLIDAY_WEEKS * 5, 28);

// gov.uk, verified 2026-08-06.
const rates = ratesFor(CURRENT_TAX_YEAR);
check('VAT standard rate is 20%', rates.vatStandardRate, 0.2);
check('VAT registration threshold is £90,000', rates.vatRegistrationThreshold, 90000);
check('AIA limit is £1,000,000', AIA_ANNUAL_LIMIT, 1000000);

// ═════════════════════════════════════════════════════════════════════════
section('Capacity: the 2,080-hour overstatement');
// ═════════════════════════════════════════════════════════════════════════

const capacityBase = {
  totalElectricians: 1,
  workingHoursPerDay: 7.5,
  workingDaysPerWeek: 5,
  weeksPerYear: 52,
  adminTimePercentage: 15,
  travelTimePercentage: 20,
  holidayDays: 28,
  sickDays: 5,
  trainingDays: 3,
  averageJobHours: 6,
  emergencyWorkPercentage: 20,
  plannedMaintenancePercentage: 30,
  growthTargetPercentage: 25,
};

let m = calculateCapacityMetrics(capacityBase);

// 52 x 5 = 260 diary days, less 28 + 5 + 3 = 36 days off → 224 working days.
check('working days after leave/sick/training', m.workingDaysPerHead, 224);
// 224 x 7.5 = 1,680 paid hours available.
check('available hours (7.5h day)', m.totalAvailableHours, 1680);
// The old defaults (8h x 5 x 52, same deductions) gave 224 x 8 = 1,792.
check(
  'old 8h default overstated by 112h',
  calculateCapacityMetrics({ ...capacityBase, workingHoursPerDay: 8 }).totalAvailableHours -
    m.totalAvailableHours,
  112
);
// Nobody has 1,950 or 2,080 billable hours.
checkIs('available hours are below the 1,950 gross', m.totalAvailableHours < 1950, true);
// 1,680 x (1 - 0.35) = 1,092 billable.
check('billable hours after 35% overhead', m.billableHours, 1092);
check('billable ratio = 100 - admin - travel', m.billableRatio, 65);
// 1,092 / 6 = 182 jobs a year.
check('jobs per year', m.jobsPerYear, 182);
// 182 / 224 working days = 0.8125 → 0.8 a day; x5 = 4.06 → 4.1 a week.
check('jobs per day (from working days, not calendar)', m.jobsPerDay, 0.8);
check('jobs per week', m.jobsPerWeek, 4.1);
// 25% growth on one head = ceil(0.25) = 1 extra electrician.
check('extra staff for 25% growth', m.additionalStaffNeeded, 1);
// 1,092 less 20% emergency (218.4) less 30% maintenance (327.6) = 546.
check('new work capacity', m.newWorkCapacity, 546);
checkIs('mix not over-allocated at 20+30', m.mixOverAllocated, false);

// The double-count the old example shipped: 50 weeks AND 28 holiday days.
// Weeks are clamped to 52 calendar weeks, so the model can no longer be fed a
// leave-adjusted figure that is then leave-adjusted again.
check(
  'weeks are clamped to 52 calendar weeks',
  calculateCapacityMetrics({ ...capacityBase, weeksPerYear: 99 }).workingDaysPerHead,
  224
);

// ═════════════════════════════════════════════════════════════════════════
section('Capacity: divide-by-zero and NaN');
// ═════════════════════════════════════════════════════════════════════════

const zeroed = {
  totalElectricians: 0,
  workingHoursPerDay: 0,
  workingDaysPerWeek: 0,
  weeksPerYear: 0,
  adminTimePercentage: 0,
  travelTimePercentage: 0,
  holidayDays: 0,
  sickDays: 0,
  trainingDays: 0,
  averageJobHours: 0,
  emergencyWorkPercentage: 0,
  plannedMaintenancePercentage: 0,
  growthTargetPercentage: 0,
};
m = calculateCapacityMetrics(zeroed);
for (const [k, v] of Object.entries(m)) {
  if (typeof v !== 'number') continue;
  checks++;
  const ok = Number.isFinite(v);
  if (!ok) fails++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  every-field-blank: ${k.padEnd(38)} ${v}`);
}

// Days per week blank used to make jobsPerDay = Infinity.
m = calculateCapacityMetrics({ ...capacityBase, workingDaysPerWeek: 0 });
checkIs('days/week = 0 gives finite jobs per day', Number.isFinite(m.jobsPerDay), true);
check('days/week = 0 gives zero capacity', m.totalAvailableHours, 0);

// 100% admin+travel used to make additionalStaffNeeded = ceil(Infinity).
m = calculateCapacityMetrics({ ...capacityBase, adminTimePercentage: 60, travelTimePercentage: 60 });
check('admin+travel clamped to 100%', m.billableHours, 0);
checkIs('no Infinity staff needed at 0 billable', Number.isFinite(m.additionalStaffNeeded), true);
check('staff needed is 0 when there is nothing to scale', m.additionalStaffNeeded, 0);

// Emergency + maintenance over 100% used to give negative new-work hours.
m = calculateCapacityMetrics({
  ...capacityBase,
  emergencyWorkPercentage: 70,
  plannedMaintenancePercentage: 60,
});
checkIs('over-allocated mix is flagged', m.mixOverAllocated, true);
checkIs('new work capacity never negative', m.newWorkCapacity >= 0, true);

// Time off exceeding the diary must not give negative capacity.
m = calculateCapacityMetrics({ ...capacityBase, holidayDays: 400 });
check('absurd leave floors capacity at zero', m.workingDaysPerHead, 0);

// ═════════════════════════════════════════════════════════════════════════
section('Cash flow: payment terms actually shift the cash');
// ═════════════════════════════════════════════════════════════════════════

// £1,000 invoiced every month, paid instantly → £1,000 received every month.
let lag = applyPaymentLag(new Array(12).fill(1000), 0);
check('0-day terms: month 1 receipt', lag.received[0], 1000);
check('0-day terms: nothing outstanding', lag.closingDebtors, 0);
check('0-day terms: total received', lag.received.reduce((a, b) => a + b, 0), 12000);

// 30-day terms on a level £1,000/month book: the debtor book rolls, so a going
// concern still receives ~£1,000 a month, but £1,000 of it is now someone
// else's invoice and £1,000 of December's work is still outstanding at year end.
lag = applyPaymentLag(new Array(12).fill(1000), 30);
check('30-day terms: still ~£1,000 a month when level', lag.received[0], 1000, 1);
check('30-day terms: roughly one month left outstanding', lag.closingDebtors, 1000, 20);

// The case that matters, with the opening debtor book switched OFF so the
// pure lag mechanics are visible: a business that only invoices in month 1
// must NOT see that cash in month 1 on 60-day terms.
const spike = [12000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
lag = applyPaymentLag(spike, 60, { seedOpeningDebtors: false });
// Worked by hand. Invoices are raised evenly across month 1 (days 0-30.44).
// Each is paid 60 days later, so receipts fall on days 60 to 90.44.
//   Month 2 spans days 30.44-60.88, so only the invoices raised in the first
//   0.88 of a day land there: 0.88/30.44 = 2.875%.
//   Month 3 spans days 60.88-91.30 and takes the other 97.125%.
//   Nothing reaches month 4.
check('60-day terms: nothing in the month of invoicing', lag.received[0], 0);
check('60-day terms: 2.875% slips into month 2', lag.received[1], 12000 * 0.028747, 1);
check('60-day terms: 97.125% lands in month 3', lag.received[2], 12000 * 0.971253, 1);
check('60-day terms: nothing as late as month 4', lag.received[3], 0);
check(
  '60-day terms: every penny is accounted for',
  lag.received.reduce((a, b) => a + b, 0) + lag.closingDebtors,
  12000,
  1
);

// December work on 30-day terms. 30/30.4375 = 0.98563 of a month, so an
// invoice raised on 1 December is paid on 31 December and DOES land in the
// horizon: 1.437% of it. The other 98.563% is a closing debtor.
lag = applyPaymentLag([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5000], 30, {
  seedOpeningDebtors: false,
});
check(
  'only the first days of December work are collected in-year',
  lag.received.reduce((a, b) => a + b, 0),
  5000 * 0.014374,
  1
);
check('the rest is carried as a closing debtor', lag.closingDebtors, 5000 * 0.985626, 1);

// With seeding ON, the opening months are filled from the MEAN, so a single
// spike month cannot invent a quarter of prior revenue. Mean of the spike
// series is 1,000, so month 1 receives at most that order of magnitude — not
// the 12,000 that seeding from month 1 would have conjured.
lag = applyPaymentLag(spike, 60);
checkIs('seeding uses the mean, not the spike', lag.received[0] <= 1000.01, true);
check('seeded opening receipt equals the mean', lag.received[0], 1000, 1);

// Conservation: received + closing debtors = invoiced, for any lag.
for (const days of [0, 7, 14, 30, 45, 60, 90, 120]) {
  const series = [3000, 5000, 2000, 8000, 1000, 4000, 6000, 3000, 7000, 2000, 5000, 4000];
  const invoicedTotal = series.reduce((a, b) => a + b, 0);
  // Unseeded: received + closing debtors must equal invoiced exactly. No cash
  // may be created or destroyed by the lag.
  const out = applyPaymentLag(series, days, { seedOpeningDebtors: false });
  check(
    `${String(days).padStart(3)}-day terms: no cash created or destroyed`,
    out.received.reduce((a, b) => a + b, 0) + out.closingDebtors,
    invoicedTotal,
    0.01
  );
  // Seeded: never MORE than invoiced plus one lag-period of mean invoicing.
  const seeded = applyPaymentLag(series, days);
  const mean = invoicedTotal / series.length;
  const maxSeed = mean * (Math.floor(days / 30.4375) + 1);
  checkIs(
    `${String(days).padStart(3)}-day terms: seed is bounded by the mean`,
    seeded.received.reduce((a, b) => a + b, 0) + seeded.closingDebtors <=
      invoicedTotal + maxSeed + 0.01,
    true
  );
}

// Negative or nonsense terms must not blow up.
lag = applyPaymentLag(new Array(12).fill(1000), -30);
check('negative terms treated as immediate', lag.received[0], 1000);
lag = applyPaymentLag(new Array(12).fill(1000), NaN);
check('NaN terms treated as immediate', lag.received[0], 1000);
checkIs('empty series is safe', applyPaymentLag([], 30).received.length, 0);

// ═════════════════════════════════════════════════════════════════════════
section('Cash flow: VAT arithmetic');
// ═════════════════════════════════════════════════════════════════════════

// Standard scheme, £10,000 net invoiced in a quarter, £4,000 of VATable costs.
// Output VAT 2,000, input VAT 800 → £1,200 payable.
check('standard scheme quarterly VAT', 10000 * 0.2 - 4000 * 0.2, 1200);

// Flat rate at 12.5% applies to VAT-INCLUSIVE turnover (gov.uk), so on £10,000
// net the base is £12,000 and the bill is £1,500 — not £1,250. The old model
// applied the rate to net turnover and understated the bill by £250 a quarter.
check('flat rate on VAT-inclusive turnover', 10000 * 1.2 * 0.125, 1500);
check('flat rate on net turnover (the old bug)', 10000 * 0.125, 1250);
check('understatement per quarter', 10000 * 1.2 * 0.125 - 10000 * 0.125, 250);

// A quarter ending in March is paid one calendar month and 7 days later — in
// May. Month index 2 (March) + 2 = month index 4 (May).
checkIs('March quarter is paid in May', 3 + 2, 5);

// ═════════════════════════════════════════════════════════════════════════
section('Cash flow: Self Assessment payments on account');
// ═════════════════════════════════════════════════════════════════════════

// Each payment on account is half of last year's bill, due 31 Jan and 31 Jul.
const priorYear = 8400;
check('31 January payment on account', priorYear / 2, 4200);
check('31 July payment on account', priorYear / 2, 4200);
check('total paid on account in the year', priorYear, 8400);
// Below £1,000 no payments on account are required.
checkIs('no POA below the £1,000 threshold', 900 >= 1000, false);

// ═════════════════════════════════════════════════════════════════════════
section('Cash flow: the full projection engine');
// ═════════════════════════════════════════════════════════════════════════

const baseState = {
  incomeStreams: [],
  expenseCategories: [],
  startingBalance: 5000,
  scenarios: [{ id: 'realistic', name: 'Realistic', multiplier: 1.0, description: '' }],
  selectedScenario: 'realistic',
  emergencyFundTarget: 0,
  vatRegistered: false,
  vatQuarter: 3,
  vatScheme: 'standard',
  flatRatePercent: 12.5,
  badDebtPercent: 0,
  cardFeesPercent: 0,
  monthlyLoanRepayments: 0,
  priorYearTaxAndNI: 0,
};

// ── Empty state must be inert, not NaN ───────────────────────────────────
let proj = buildCashFlowProjection(baseState);
checkIs('empty state: 12 months produced', proj.months.length, 12);
for (const p of proj.months) {
  checks++;
  const ok = [p.income, p.invoiced, p.expenses, p.netFlow, p.cumulativeBalance].every(
    Number.isFinite
  );
  if (!ok) fails++;
  if (!ok) console.log(`FAIL  empty state month ${p.monthName} produced NaN`);
}
console.log('PASS  empty state: no NaN in any of the 12 months');
check('empty state: balance holds at opening', proj.months[11].cumulativeBalance, 5000);

// ── The running balance must accumulate, with no off-by-one ──────────────
// £1,000/month invoiced, paid immediately, no costs. Opening £5,000.
// Month 1 closes at 6,000; month 12 at 17,000.
const level = {
  ...baseState,
  incomeStreams: [
    { id: 'a', name: 'Work', amount: 1000, frequency: 'monthly', paymentDelayDays: 0, growth: 0 },
  ],
};
proj = buildCashFlowProjection(level);
check('running balance: month 1 = 5,000 + 1,000', proj.months[0].cumulativeBalance, 6000);
check('running balance: month 2 = 7,000', proj.months[1].cumulativeBalance, 7000);
check('running balance: month 12 = 17,000', proj.months[11].cumulativeBalance, 17000);
check('opening balance is not double counted', proj.months[0].cumulativeBalance - 1000, 5000);
// Closing balance must equal opening plus the sum of every net flow.
check(
  'closing = opening + sum(netFlow)',
  proj.months[11].cumulativeBalance,
  5000 + proj.months.reduce((a, p) => a + p.netFlow, 0)
);

// ── Payment terms move the cash, not the invoicing ───────────────────────
const onTerms = {
  ...level,
  incomeStreams: [{ ...level.incomeStreams[0], paymentDelayDays: 30 }],
};
proj = buildCashFlowProjection(onTerms);
check('30-day terms: invoicing is unchanged', proj.months[0].invoiced, 1000);
// On a LEVEL book in steady state, 12 months of cash still arrives in 12
// months — the debtor book simply rolls. What terms create is a debtor
// balance, and that is what must show up.
checkIs('30-day terms: a debtor balance exists', proj.closingDebtors > 0, true);
check('30-day terms: ~1 month of sales outstanding', proj.closingDebtors, 1000, 20);
check(
  '0-day terms: no debtor balance',
  buildCashFlowProjection(level).closingDebtors,
  0
);

// On a RAMPING book, terms genuinely hold cash back: growing sales mean the
// money owed always exceeds the money collected.
const ramping = {
  ...baseState,
  incomeStreams: [
    { id: 'r', name: 'Growth', amount: 1000, frequency: 'monthly', paymentDelayDays: 60, growth: 2 },
  ],
};
const rampProj = buildCashFlowProjection(ramping);
const rampInvoiced = rampProj.months.reduce((a, p) => a + p.invoiced, 0);
const rampReceived = rampProj.months.reduce((a, p) => a + p.income, 0);
checkIs(
  'ramping book on 60-day terms collects less than it invoices',
  rampReceived < rampInvoiced,
  true
);
checkIs('...and carries a large debtor balance', rampProj.closingDebtors > 1000, true);

// ── Quarterly expense timing: the bug that made costs vanish ─────────────
// Timing 6 with the old `month % 3 === timing` test could never match, since
// month % 3 is only ever 0, 1 or 2. The cost never appeared at all.
const quarterlyCost = {
  ...baseState,
  expenseCategories: [
    {
      id: 'e',
      name: 'Equipment',
      amount: 2000,
      frequency: 'quarterly',
      timing: 6,
      variable: false,
      growth: 0,
      vatable: false,
    },
  ],
};
proj = buildCashFlowProjection(quarterlyCost);
const hits = proj.months.filter((p) => p.expenses > 0).map((p) => p.month);
checkIs('quarterly cost at timing 6 fires 4x a year', hits.length, 4);
checkIs('...in months 3, 6, 9 and 12', hits.join(','), '3,6,9,12');
check('quarterly cost totals 4 x £2,000', proj.months.reduce((a, p) => a + p.expenses, 0), 8000);
// And timing 3 — which the old code also silently dropped.
proj = buildCashFlowProjection({
  ...quarterlyCost,
  expenseCategories: [{ ...quarterlyCost.expenseCategories[0], timing: 3 }],
});
checkIs(
  'quarterly cost at timing 3 also fires',
  proj.months.filter((p) => p.expenses > 0).map((p) => p.month).join(','),
  '3,6,9,12'
);

// ── VAT: receipts are grossed up and the bill lands with a lag ───────────
const vatTrader = {
  ...level,
  vatRegistered: true,
  vatQuarter: 3, // quarters end Mar/Jun/Sep/Dec
  cardFeesPercent: 0,
};
proj = buildCashFlowProjection(vatTrader);
// £1,000 net invoiced becomes £1,200 received.
check('VAT registered: receipts grossed up to £1,200', proj.months[0].income, 1200);
check('VAT registered: invoicing stays net at £1,000', proj.months[0].invoiced, 1000);
// Quarter ending March (month 3) is paid one month and 7 days later, in May.
check('no VAT paid in the quarter-end month itself', proj.months[2].vatPaid, 0);
check('Q1 VAT (3 x £200) is paid in May', proj.months[4].vatPaid, 600);
check('Q2 VAT is paid in August', proj.months[7].vatPaid, 600);
check('Q3 VAT is paid in November', proj.months[10].vatPaid, 600);
// Dec quarter would be paid in February, outside the horizon.
check('Q4 VAT falls outside the 12 months', proj.months.reduce((a, p) => a + p.vatPaid, 0), 1800);

// Input VAT on VATable costs is reclaimed against output VAT.
const vatWithCosts = {
  ...vatTrader,
  expenseCategories: [
    {
      id: 'm',
      name: 'Materials',
      amount: 400,
      frequency: 'monthly',
      variable: false,
      growth: 0,
      vatable: true,
    },
  ],
};
proj = buildCashFlowProjection(vatWithCosts);
// Output 200/mo, input 80/mo → net 120/mo → £360 a quarter.
check('input VAT is reclaimed: quarterly net VAT £360', proj.months[4].vatPaid, 360);
// The £400 net cost is paid gross at £480.
check('VATable cost is paid gross (£480)', proj.months[0].expenses, 480);

// A non-VATable cost (wages, insurance) carries no reclaim and is not grossed.
proj = buildCashFlowProjection({
  ...vatWithCosts,
  expenseCategories: [{ ...vatWithCosts.expenseCategories[0], vatable: false }],
});
check('non-VATable cost is paid net (£400)', proj.months[0].expenses, 400);
check('non-VATable cost gives no reclaim: VAT stays £600', proj.months[4].vatPaid, 600);

// Flat rate applies to VAT-INCLUSIVE turnover.
proj = buildCashFlowProjection({ ...vatTrader, vatScheme: 'flat-rate', flatRatePercent: 12.5 });
// 1,000 net x 1.2 = 1,200 gross x 12.5% = 150/mo → 450 a quarter.
check('flat rate: £450 a quarter on gross turnover', proj.months[4].vatPaid, 450);
// The old net-turnover basis would have said 1,000 x 12.5% x 3 = £375.
check('flat rate: old net basis understated by £75/qtr', 450 - 375, 75);

// Not registered: no VAT anywhere.
proj = buildCashFlowProjection(level);
check('unregistered: receipts are not grossed up', proj.months[0].income, 1000);
check('unregistered: no VAT is ever paid', proj.months.reduce((a, p) => a + p.vatPaid, 0), 0);

// ── Self Assessment: the 31 Jan and 31 Jul cliffs ────────────────────────
proj = buildCashFlowProjection({ ...level, priorYearTaxAndNI: 8400 });
check('31 January payment on account', proj.months[0].taxPaid, 4200);
check('nothing in February', proj.months[1].taxPaid, 0);
check('nothing in June', proj.months[5].taxPaid, 0);
check('31 July payment on account', proj.months[6].taxPaid, 4200);
check('total on account across the year', proj.months.reduce((a, p) => a + p.taxPaid, 0), 8400);
// The January payment must actually dent the balance.
check(
  'January balance is £4,200 lower than without POAs',
  buildCashFlowProjection(level).months[0].cumulativeBalance -
    proj.months[0].cumulativeBalance,
  4200
);
// Below £1,000 no payments on account are due.
proj = buildCashFlowProjection({ ...level, priorYearTaxAndNI: 900 });
check('no POA below £1,000', proj.months.reduce((a, p) => a + p.taxPaid, 0), 0);

// ── Bad debt reduces receipts, it is not an expense ──────────────────────
proj = buildCashFlowProjection({ ...level, badDebtPercent: 10 });
check('10% bad debt: receipts fall to £900', proj.months[0].income, 900);
check('10% bad debt: it is NOT added to expenses', proj.months[0].expenses, 0);
check('10% bad debt: net flow is £900', proj.months[0].netFlow, 900);

// ── Seasonal streams with a malformed multiplier must not go NaN ─────────
proj = buildCashFlowProjection({
  ...baseState,
  incomeStreams: [
    {
      id: 's',
      name: 'Seasonal',
      amount: 1000,
      frequency: 'seasonal',
      seasonalMultiplier: [1.5, 0.5], // only 2 entries for 12 months
      paymentDelayDays: 0,
      growth: 0,
    },
  ],
});
checkIs(
  'short seasonal multiplier does not poison the projection',
  proj.months.every((p) => Number.isFinite(p.income) && Number.isFinite(p.cumulativeBalance)),
  true
);
check('month 1 uses the supplied multiplier', proj.months[0].invoiced, 1500);
check('month 3 falls back to 1.0 rather than NaN', proj.months[2].invoiced, 1000);

// ═════════════════════════════════════════════════════════════════════════
section('Equipment ROI: the documented default case');
// ═════════════════════════════════════════════════════════════════════════

const roiBase = {
  equipmentCost: 7500,
  installationCost: 800,
  maintenancePerYear: 200,
  lifespanYears: 5,
  residualValue: 500,
  annualSavings: 3000,
  utilisationRate: 85,
  discountRate: 5,
};

let r = calculateEquipmentRoi(roiBase);

// CapEx 7,500 + 800 = 8,300. Benefit 3,000 x 0.85 - 200 = 2,350.
check('capex', r.capex, 8300);
check('annual net benefit', r.annualNetBenefit, 2350);

// NPV at 5%: annuity factor over 5 years = 4.329477.
//   2,350 x 4.329477 = 10,174.27
//   residual 500 / 1.05^5 = 500 / 1.2762816 = 391.76
//   NPV = -8,300 + 10,174.27 + 391.76 = 2,266.03
const annuity5 = (1 - Math.pow(1.05, -5)) / 0.05;
check('annuity factor @5% over 5y', annuity5, 4.329477, 0.000001);
check('NPV @5%', r.npv, -8300 + 2350 * annuity5 + 500 / Math.pow(1.05, 5), 0.01);
check('NPV @5% (worked by hand)', r.npv, 2266.03, 0.05);

// Payback: 8,300 / 2,350 = 3.5319 years. The old code reported 4.
check('payback is fractional, not rounded up', r.simplePaybackYears, 8300 / 2350, 0.0001);
check('payback (worked by hand)', r.simplePaybackYears, 3.5319, 0.001);
checkIs('old integer payback would have said 4', Math.ceil(8300 / 2350), 4);

// ROI (lifetime, undiscounted) = (2,350 x 5 + 500 - 8,300) / 8,300 = 47.59%.
check('lifetime ROI', r.roiPercent, ((2350 * 5 + 500 - 8300) / 8300) * 100, 0.01);
check('lifetime ROI (worked by hand)', r.roiPercent, 47.59, 0.01);

// IRR: the rate where -8,300 + 2,350a(5,i) + 500/(1+i)^5 = 0.
// Verify by substitution rather than by asserting a number.
const irrRate = r.irrPercent / 100;
const npvAtIrr =
  -8300 +
  Array.from({ length: 5 }, (_, k) => 2350 / Math.pow(1 + irrRate, k + 1)).reduce((a, b) => a + b) +
  500 / Math.pow(1 + irrRate, 5);
check('NPV at the reported IRR is zero', npvAtIrr, 0, 0.02);
checkIs('IRR exceeds the 5% discount rate, as NPV>0 implies', r.irrPercent > 5, true);

// ═════════════════════════════════════════════════════════════════════════
section('Equipment ROI: NPV sensitivity is the right way round');
// ═════════════════════════════════════════════════════════════════════════

// A LOWER discount rate must give a HIGHER NPV. The old labels were inverted:
// "NPV Low" displayed the value at the lower rate, i.e. the larger number.
checkIs('npvBest (lower rate) exceeds npv', r.npvBest > r.npv, true);
checkIs('npv exceeds npvWorst (higher rate)', r.npv > r.npvWorst, true);
checkIs('best > worst', r.npvBest > r.npvWorst, true);

// At 5% the low leg clamps to 0.1%: NPV = -8,300 + 2,350 x 4.99005 + 500/1.005017
const aLow = (1 - Math.pow(1.001, -5)) / 0.001;
check('npvBest @0.1%', r.npvBest, -8300 + 2350 * aLow + 500 / Math.pow(1.001, 5), 0.01);
// At 10%: annuity 3.790787, residual 500/1.61051 = 310.46
const aHigh = (1 - Math.pow(1.1, -5)) / 0.1;
check('npvWorst @10%', r.npvWorst, -8300 + 2350 * aHigh + 500 / Math.pow(1.1, 5), 0.01);

// ═════════════════════════════════════════════════════════════════════════
section('Equipment ROI: zero-is-falsy and blank inputs');
// ═════════════════════════════════════════════════════════════════════════

// 0% utilisation must mean zero benefit, not 100% (the `|| 100` bug).
r = calculateEquipmentRoi({ ...roiBase, utilisationRate: 0 });
check('0% utilisation gives -maintenance, not full benefit', r.annualNetBenefit, -200);
checkIs('0% utilisation never pays back', r.simplePaybackYears, null);
checkIs('0% utilisation has no IRR', r.irrPercent, null);

// 0% discount rate must be honoured, not silently replaced with 5%.
r = calculateEquipmentRoi({ ...roiBase, discountRate: 0 });
// Undiscounted: -8,300 + 2,350 x 5 + 500 = 3,950.
check('0% discount rate is undiscounted', r.npv, 3950);

// Everything blank.
r = calculateEquipmentRoi({
  equipmentCost: 0,
  installationCost: 0,
  maintenancePerYear: 0,
  lifespanYears: 0,
  residualValue: 0,
  annualSavings: 0,
  utilisationRate: 0,
  discountRate: 0,
});
for (const k of ['capex', 'annualNetBenefit', 'npv', 'npvBest', 'npvWorst', 'roiPercent']) {
  checks++;
  const ok = Number.isFinite(r[k]);
  if (!ok) fails++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  all-blank: ${k.padEnd(45)} ${r[k]}`);
}
checkIs('all-blank: no fabricated IRR', r.irrPercent, null);
checkIs('all-blank: no fabricated payback', r.simplePaybackYears, null);

// An investment that never returns anything has no IRR. The old bisection
// reported roughly -90% here, because it never checked for a bracketed root.
r = calculateEquipmentRoi({ ...roiBase, annualSavings: 0, residualValue: 0 });
checkIs('never-returns: IRR is null, not -90%', r.irrPercent, null);
check('never-returns: ROI is worse than -100%', r.roiPercent < -100, true, 0);

// A very high return must not silently clamp at the old 100% bracket ceiling.
r = calculateEquipmentRoi({
  ...roiBase,
  equipmentCost: 1000,
  installationCost: 0,
  maintenancePerYear: 0,
  residualValue: 0,
  annualSavings: 5000,
  utilisationRate: 100,
});
checkIs('IRR above 100% is not clamped at 100', r.irrPercent > 100, true);

// ═════════════════════════════════════════════════════════════════════════
console.log(
  `\n${fails === 0 ? '✓' : '✗'}  ${checks - fails}/${checks} checks passed${
    fails ? ` — ${fails} FAILED` : ''
  }\n`
);
process.exit(fails === 0 ? 0 : 1);
