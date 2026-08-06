/**
 * Arithmetic assertions for the business-development calculators.
 * Run: npm run check:job-costing
 */
import {
  priceForMargin,
  priceForMarkup,
  markupToMargin,
  marginToMarkup,
  marginPercentOf,
  vatOn,
  netOfVat,
  calculateJobCosts,
  priceJob,
  varianceSummary,
  businessCostTotals,
  OVERHEAD_COVER_MARKUP_PERCENT,
  VAT_STANDARD_RATE_PERCENT,
  VAT_REGISTRATION_THRESHOLD,
  MAX_MARGIN_PERCENT,
} from '../src/data/job-costing.ts';

let fails = 0;
const fmt = (v) =>
  v === null ? 'null' : typeof v === 'number' ? v.toFixed(2) : JSON.stringify(v);
const check = (name, actual, expected, tol = 0.005) => {
  const ok =
    expected === null || actual === null
      ? actual === expected
      : typeof expected === 'string'
        ? actual === expected
        : Math.abs(actual - expected) <= tol;
  if (!ok) fails++;
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(58)} got ${fmt(actual).padStart(12)}  want ${fmt(expected).padStart(12)}`
  );
};
const section = (t) => console.log(`\n── ${t} ${'─'.repeat(Math.max(0, 68 - t.length))}`);

// ═══════════════════════════════════════════════════════════════════════
section('Margin is NOT markup');
// ═══════════════════════════════════════════════════════════════════════
// £1,000 cost at a 25% MARGIN: price = 1000 / 0.75 = 1333.33, profit 333.33,
// which is 25% of the PRICE. Pricing it as a markup (1000 x 1.25 = 1250) would
// leave only a 20% margin — the classic under-price.
check('£1,000 @ 25% margin  → price', priceForMargin(1000, 25), 1333.333);
check('£1,000 @ 25% markup  → price', priceForMarkup(1000, 25), 1250);
check('  the markup price is only a 20% margin', marginPercentOf(1250, 1000), 20);
check('  the margin price really is 25%', marginPercentOf(priceForMargin(1000, 25), 1000), 25);
check('25% markup  == 20.00% margin', markupToMargin(25), 20);
check('25% margin  == 33.33% markup', marginToMarkup(25), 33.3333);
check('round trip: markup→margin→markup', marginToMarkup(markupToMargin(80)), 80);
check('50% margin doubles the cost', priceForMargin(500, 50), 1000);
check('0% margin returns cost', priceForMargin(500, 0), 500);
// A 100% margin needs an infinite price; it must be clamped, not silently huge.
check('100% margin clamped to MAX', priceForMargin(100, 100), priceForMargin(100, MAX_MARGIN_PERCENT));
check('  and stays finite', Number.isFinite(priceForMargin(100, 100)) ? 1 : 0, 1);
check('negative margin floored at 0%', priceForMargin(500, -30), 500);
check('margin of a £0 price is undefined, not 0%', marginPercentOf(0, 100), null);

// ═══════════════════════════════════════════════════════════════════════
section('VAT: collected, never earned');
// ═══════════════════════════════════════════════════════════════════════
check('standard rate comes from the tax table', VAT_STANDARD_RATE_PERCENT, 20);
check('registration threshold from the tax table', VAT_REGISTRATION_THRESHOLD, 90000);
check('VAT on £1,000 net', vatOn(1000, 20), 200);
check('£1,200 gross → £1,000 net', netOfVat(1200, 20), 1000);
check('VAT is not a cost: 20% of nothing', vatOn(0, 20), 0);

// Profit must be struck on NET figures. Same job, VAT-registered or not: the
// profit is identical, because VAT belongs to HMRC either way.
{
  const costs = calculateJobCosts({ materialCost: 400, labourHours: 8, labourCostPerHour: 30 });
  const registered = priceJob(costs, 1000, 20, 20);
  const notRegistered = priceJob(costs, 1000, 20, 0);
  check('profit ex-VAT', registered.profit, 1000 - 640);
  check('  identical when not VAT registered', notRegistered.profit, registered.profit);
  check('  VAT sits outside profit', registered.priceIncVat - registered.profit, 1200 - 360);
  check('  a 20% VAT rate does not inflate margin', registered.marginPercent, notRegistered.marginPercent);
  // The classic silent 20%: profit struck on the GROSS price.
  const wrong = 1200 - 640;
  check('  (gross-price profit would be wrong by)', wrong - registered.profit, 200);
}

// ═══════════════════════════════════════════════════════════════════════
section('Job costs');
// ═══════════════════════════════════════════════════════════════════════
{
  // Worked example, all by hand:
  //   materials              500.00
  //   consumables 5%          25.00
  //   labour 8h @ £30         240.00
  //   on-costs 25%             60.00  → labour 300.00
  //   travel+admin 1.5h @ £30  45.00  + 25% = 56.25
  //   mileage 20 @ £0.45        9.00
  //   parking                  15.00
  //   subcontractor            100.00
  //   ─────────────────────── direct 1005.25
  //   overhead 20%            201.05
  //   contingency 5%           50.2625
  //   warranty 2%              20.105
  //   ─────────────────────── total  1276.6675
  const b = calculateJobCosts({
    materialCost: 500,
    consumablesPercent: 5,
    labourHours: 8,
    labourCostPerHour: 30,
    labourOnCostPercent: 25,
    travelHours: 1,
    adminHours: 0.5,
    miles: 20,
    mileageRate: 0.45,
    parkingTolls: 15,
    subcontractorCost: 100,
    overheadPercentage: 20,
    contingencyPercent: 5,
    warrantyReservePercent: 2,
  });
  check('consumables/waste = 5% of materials', b.consumables, 25);
  check('labour incl. 25% employment on-costs', b.labour, 300);
  check('travel + admin also carry on-costs', b.nonBillableLabour, 56.25);
  check('on-costs isolated', b.labourOnCosts, 60 + 11.25);
  check('mileage', b.mileage, 9);
  check('direct costs', b.directCosts, 1005.25);
  check('overhead 20% of DIRECT (not compounded)', b.overheadCosts, 201.05);
  check('contingency 5% of DIRECT', b.contingencyCost, 50.2625);
  check('warranty 2% of DIRECT', b.warrantyReserveCost, 20.105);
  check('total costs', b.totalCosts, 1276.6675);
  // Overhead/contingency/warranty must not stack on each other.
  check(
    '  uplifts are additive, not compounding',
    b.totalCosts,
    b.directCosts * (1 + 0.2 + 0.05 + 0.02)
  );

  // Costing labour at the pay rate alone: what it hides.
  const noOnCosts = calculateJobCosts({
    materialCost: 500,
    consumablesPercent: 5,
    labourHours: 8,
    labourCostPerHour: 30,
    labourOnCostPercent: 0,
    travelHours: 1,
    adminHours: 0.5,
    miles: 20,
    mileageRate: 0.45,
    parkingTolls: 15,
    subcontractorCost: 100,
    overheadPercentage: 20,
    contingencyPercent: 5,
    warrantyReservePercent: 2,
  });
  check('pay rate alone understates cost by', b.totalCosts - noOnCosts.totalCosts, 71.25 * 1.27);
  check(
    '  which overstates profit by the same',
    priceJob(noOnCosts, 1600, 25).profit - priceJob(b, 1600, 25).profit,
    71.25 * 1.27
  );
}

// ═══════════════════════════════════════════════════════════════════════
section('Empty form: no NaN, no divide-by-zero');
// ═══════════════════════════════════════════════════════════════════════
{
  const b = calculateJobCosts({});
  check('every cost is 0', b.totalCosts, 0);
  check('directCosts is a number', Number.isNaN(b.directCosts) ? 1 : 0, 0);
  const p = priceJob(b, 0, 0, 20);
  check('min price on £0 cost', p.minimumPriceExVat, 0);
  check('profit on nothing', p.profit, 0);
  check('margin on a blank form is undefined, not 0%', p.marginPercent, null);
  check('VAT on nothing', p.vat, 0);

  // Garbage in must not propagate.
  const junk = calculateJobCosts({
    materialCost: NaN,
    labourHours: Infinity,
    labourCostPerHour: -50,
    overheadPercentage: NaN,
  });
  check('NaN/Infinity/negative inputs → 0', junk.totalCosts, 0);
  const neg = calculateJobCosts({ materialCost: -500, labourHours: 8, labourCostPerHour: 30 });
  check('a negative material cost cannot subtract', neg.totalCosts, 240);
}

// ═══════════════════════════════════════════════════════════════════════
section('Quote vs actual variance');
// ═══════════════════════════════════════════════════════════════════════
{
  // 16h quoted, 18h actual @ £28 cost/hr; materials 300 → 380.
  // labour var = 2 x 28 = 56 ; materials var = 80 ; total 136
  // base = 16 x 28 + 300 = 748 → 18.18%
  const v = varianceSummary({
    quotedHours: 16,
    actualHours: 18,
    labourCostPerHour: 28,
    quotedMaterials: 300,
    actualMaterials: 380,
  });
  check('hours variance', v.hoursVariance, 2);
  check('hours variance %', v.hoursVariancePercent, 12.5);
  check('labour cost variance', v.labourCostVariance, 56);
  check('materials variance', v.materialsVariance, 80);
  check('materials variance %', v.materialsVariancePercent, 26.6667);
  check('quoted cost base', v.quotedCostBase, 748);
  check('total variance', v.totalVariance, 136);
  check('total variance %', v.totalVariancePercent, 18.1818);
  check('status', v.status, 'over');

  // Costing the same 2h overrun at a £55 charge-out rate instead of the £28
  // cost inflates the reported loss by 96%.
  const atChargeOut = varianceSummary({
    quotedHours: 16,
    actualHours: 18,
    labourCostPerHour: 55,
    quotedMaterials: 300,
    actualMaterials: 380,
  });
  check('charge-out rate overstates the loss by', atChargeOut.totalVariance - v.totalVariance, 54);

  const under = varianceSummary({
    quotedHours: 16,
    actualHours: 12,
    labourCostPerHour: 28,
    quotedMaterials: 300,
    actualMaterials: 250,
  });
  check('under budget → negative variance', under.totalVariance, -162);
  check('  status', under.status, 'under');

  const tight = varianceSummary({
    quotedHours: 16,
    actualHours: 16.2,
    labourCostPerHour: 28,
    quotedMaterials: 300,
    actualMaterials: 300,
  });
  check('within ±5% → on target', tight.status, 'on-target');

  // The blank-form trap: nothing quoted, £380 spent.
  const blank = varianceSummary({});
  check('blank form: variance % is unknown', blank.totalVariancePercent, null);
  check('  and must NOT claim "on target"', blank.status, 'unknown');
  const noQuote = varianceSummary({ actualHours: 8, labourCostPerHour: 28, actualMaterials: 380 });
  check('spent £604 against no quote: % unknown', noQuote.totalVariancePercent, null);
  check('  status', noQuote.status, 'unknown');
  check('  but the £ variance is still reported', noQuote.totalVariance, 604);
  check('  hours % against 0 quoted hours', noQuote.hoursVariancePercent, null);
}

// ═══════════════════════════════════════════════════════════════════════
section('Business set-up costs');
// ═══════════════════════════════════════════════════════════════════════
{
  const t = businessCostTotals(
    { tools: 5000, testEquipment: 2000, vehicle: 11000 },
    { insurance: 200, fuel: 300, marketing: 400, accountancy: 100, rent: 200 }
  );
  check('total startup', t.totalStartup, 18000);
  check('total monthly', t.totalMonthly, 1200);
  check('year one = startup + 12 months', t.yearOneTotal, 32400);
  // 1200 x 1.8 = 2160 cover target; surplus 960; 18000 / 960 = 18.75 → 19
  check('monthly cover target (80% markup)', t.monthlyCoverTarget, 2160);
  check('daily cover target (22 days)', t.dailyCoverTarget, 98.1818);
  check('monthly surplus over overheads', t.monthlySurplus, 960);
  check('break-even months', t.breakEvenMonths, 19);
  // The card that hardcoded "44%" beside a "* 1.8" is now derived.
  check('80% markup IS a 44.4% margin', t.impliedMarginPercent, 44.4444);
  check('  markup and margin are not the same number', OVERHEAD_COVER_MARKUP_PERCENT, 80);

  // The seeded comparison scenarios must agree with the year-one formula.
  check('seeded "Conservative Start" year 1', 18000 + 1200 * 12, 32400);
  check('seeded "Professional Setup" year 1', 45000 + 2800 * 12, 78600);

  // Startup spend with no monthly overheads: previously "Infinitymo".
  const noMonthly = businessCostTotals({ tools: 5000 }, {});
  check('no monthly costs → break-even unknown', noMonthly.breakEvenMonths, null);
  check('  cover target is 0, not NaN', noMonthly.monthlyCoverTarget, 0);
  const noStartup = businessCostTotals({}, { rent: 500 });
  check('no startup spend → break-even immediate', noStartup.breakEvenMonths, 0);
  const nothing = businessCostTotals({}, {});
  check('entirely blank → year one 0', nothing.yearOneTotal, 0);
  check('  break-even 0, not NaN', nothing.breakEvenMonths, 0);
}

console.log(fails === 0 ? '\nALL PASS' : `\n${fails} FAILED`);
process.exit(fails ? 1 : 0);
