/**
 * Arithmetic proof for the VAT scheme comparison and the CIS/DRC helper.
 *
 * Every expected number below is worked by hand in the comment above it, from
 * a GOV.UK rule quoted in src/data/uk-tax-rates.ts. Same pattern as
 * scripts/check-tax-rates.mjs.
 *
 *   npx tsx scripts/check-vat-cis.mjs
 */
import {
  compareVatSchemes,
  flatRateSchemeVat,
  cisInvoice,
  VAT_SCHEME_THRESHOLDS,
  FLAT_RATE_SCHEME,
  CIS_DEDUCTION_RATES,
  UK_TAX_YEARS,
} from '../src/data/uk-tax-rates.ts';

const gbp = (n) => '£' + n.toFixed(2);
let fails = 0;
const check = (name, actual, expected, tol = 0.005) => {
  const ok = Math.abs(actual - expected) <= tol;
  if (!ok) fails++;
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(52)} got ${gbp(actual).padStart(12)}  want ${gbp(expected).padStart(12)}`
  );
};
const is = (name, actual, expected) => {
  const ok = actual === expected;
  if (!ok) fails++;
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(52)} got ${String(actual).padStart(12)}  want ${String(expected).padStart(12)}`
  );
};

console.log('── Thresholds ────────────────────────────────────────────────');
// https://www.gov.uk/how-vat-works/vat-thresholds
is('VAT registration threshold', VAT_SCHEME_THRESHOLDS.registration, 90000);
is('VAT deregistration threshold', VAT_SCHEME_THRESHOLDS.deregistration, 88000);
is('FRS join (ex VAT)', VAT_SCHEME_THRESHOLDS.flatRateJoin, 150000);
is('FRS leave (INC VAT)', VAT_SCHEME_THRESHOLDS.flatRateLeave, 230000);
is('Cash accounting join', VAT_SCHEME_THRESHOLDS.cashAccountingJoin, 1350000);
is('Cash accounting leave', VAT_SCHEME_THRESHOLDS.cashAccountingLeave, 1600000);
is('Annual accounting join', VAT_SCHEME_THRESHOLDS.annualAccountingJoin, 1350000);
is('Annual accounting leave', VAT_SCHEME_THRESHOLDS.annualAccountingLeave, 1600000);
is('Tax table dereg threshold agrees', UK_TAX_YEARS['2026/27'].vatDeregistrationThreshold, 88000);

console.log('\n── Flat Rate Scheme percentages ──────────────────────────────');
// https://www.gov.uk/vat-flat-rate-scheme/how-much-you-pay
is('Labour-only building/construction', FLAT_RATE_SCHEME.labourOnlyConstruction, 14.5);
is('General building/construction', FLAT_RATE_SCHEME.generalConstruction, 9.5);
is('Limited cost business', FLAT_RATE_SCHEME.limitedCostBusiness, 16.5);
is('First-year discount is 1 point, not 2', FLAT_RATE_SCHEME.firstYearDiscount, 1);

console.log('\n── FRS: percentage goes on VAT-INCLUSIVE turnover ────────────');
// £120,000 ex VAT, 20% VAT, £48,000 materials (40%).
// Materials 40% >= 10% => general construction, 9.5%.
// Gross turnover = 120,000 x 1.20 = 144,000. VAT due = 144,000 x 9.5% = 13,680.
// The net-turnover bug would give 120,000 x 9.5% = 11,400 — £2,280 short.
let f = flatRateSchemeVat({ turnoverExVat: 120000, vatRatePercent: 20, materialsExVat: 48000 });
is('  sector picked from the 10% materials test', f.sector, 'general');
is('  sector percentage', f.sectorPercentage, 9.5);
check('  gross turnover', f.flatRateTurnoverIncVat, 144000);
check('  VAT due on GROSS', f.vatDue, 13680);
is('  and NOT the net-turnover figure', Math.round(f.vatDue) !== 11400, true);

console.log('\n── FRS: the 10% materials test picks the sector ──────────────');
// £120,000 with £6,000 materials = 5% < 10% => labour-only, 14.5%.
// But 5% of gross is well above 2%, so not limited cost.
// 144,000 x 14.5% = 20,880.
f = flatRateSchemeVat({ turnoverExVat: 120000, vatRatePercent: 20, materialsExVat: 6000 });
is('  labour-only sector', f.sector, 'labour-only');
is('  not limited cost at 5% materials', f.limitedCostBusiness, false);
check('  VAT due at 14.5% of gross', f.vatDue, 20880);

console.log('\n── FRS: limited cost business forces 16.5% ───────────────────');
// £120,000 with £2,000 materials. Goods inc VAT = 2,400; gross turnover 144,000.
// 2% of 144,000 = 2,880. 2,400 < 2,880 => limited cost => 16.5%.
// 144,000 x 16.5% = 23,760 — MORE than the 20,880 the old 14.5% default showed.
f = flatRateSchemeVat({ turnoverExVat: 120000, vatRatePercent: 20, materialsExVat: 2000 });
is('  limited cost detected', f.limitedCostBusiness, true);
is('  16.5% applied', f.appliedPercentage, 16.5);
check('  VAT due', f.vatDue, 23760);
check('  understated by the old 14.5% default', 23760 - 144000 * 0.145, 2880);

console.log('\n── FRS: £1,000 floor catches a tiny-turnover trader ──────────');
// £20,000 ex VAT, £500 materials. Goods inc VAT = 600 = 2.5% of 24,000 gross,
// so it passes the 2% test — but 600 < £1,000, so still limited cost.
f = flatRateSchemeVat({ turnoverExVat: 20000, vatRatePercent: 20, materialsExVat: 500 });
is('  over 2% but under £1,000 is still limited cost', f.limitedCostBusiness, true);
check('  VAT due at 16.5% of £24,000', f.vatDue, 3960);
// Quarterly the floor is £250, and £600 clears it, so the 2% test alone decides.
f = flatRateSchemeVat({
  turnoverExVat: 20000,
  vatRatePercent: 20,
  materialsExVat: 500,
  period: 'quarter',
});
is('  quarterly £250 floor is cleared', f.limitedCostBusiness, false);

console.log('\n── FRS: 1% discount is FIRST year, and it comes OFF ──────────');
// Labour-only 14.5% in year one is 13.5%, not 12.5%, and it RISES to 14.5%
// after the first anniversary. The old UI had "12.5% after year 1".
f = flatRateSchemeVat({
  turnoverExVat: 120000,
  vatRatePercent: 20,
  materialsExVat: 6000,
  firstYearOfRegistration: true,
});
is('  first year rate', f.appliedPercentage, 13.5);
check('  VAT due 144,000 x 13.5%', f.vatDue, 19440);
// And it applies to the limited cost rate too: 16.5 - 1 = 15.5.
f = flatRateSchemeVat({
  turnoverExVat: 120000,
  vatRatePercent: 20,
  materialsExVat: 2000,
  firstYearOfRegistration: true,
});
is('  limited cost first year', f.appliedPercentage, 15.5);

console.log('\n── Scheme comparison ─────────────────────────────────────────');
// £120,000, 60% labour. Standard: output 24,000 - input 9,600 = 14,400.
// FRS at the correct 9.5% of 144,000 = 13,680. FRS wins by 720.
let c = compareVatSchemes({ turnoverExVat: 120000, vatRatePercent: 20, labourSharePercent: 60 });
check('  standard net VAT', c.standard.netVatPayable, 14400);
check('  flat rate VAT', c.flatRate.vatDue, 13680);
is('  better scheme', c.better, 'flat-rate');
check('  annual saving', c.annualSaving, 720);
// With the old hard-coded 14.5% default the same trader was told the FRS cost
// 144,000 x 14.5% = 20,880 and that standard saved £6,480 — the wrong scheme
// by £720 a year.
check('  old default would have shown', 144000 * 0.145, 20880);

// A labour-heavy trader: 95% labour, £6,000 materials.
// Standard: 24,000 - 1,200 = 22,800. Materials 5% => labour-only 14.5%
// => 20,880. FRS wins by 1,920.
c = compareVatSchemes({ turnoverExVat: 120000, vatRatePercent: 20, labourSharePercent: 95 });
is('  labour-heavy picks 14.5%', c.flatRate.sectorPercentage, 14.5);
check('  standard', c.standard.netVatPayable, 22800);
check('  flat rate', c.flatRate.vatDue, 20880);
is('  better scheme', c.better, 'flat-rate');

// Over the join limit: still calculates, but must say so.
c = compareVatSchemes({ turnoverExVat: 200000, vatRatePercent: 20, labourSharePercent: 60 });
is(
  '  £200k warns you cannot join the FRS',
  c.warnings.some((w) => w.includes('150,000')),
  true
);
// Gross £240,000 is also over the £230,000 exit test.
is(
  '  and warns about the £230,000 exit',
  c.warnings.some((w) => w.includes('230,000')),
  true
);

// An override that disagrees with the split must be called out.
c = compareVatSchemes({
  turnoverExVat: 120000,
  vatRatePercent: 20,
  labourSharePercent: 60,
  flatRatePercentOverride: 14.5,
});
is(
  '  14.5% on a 40%-materials split is flagged',
  c.warnings.some((w) => w.includes('9.5%')),
  true
);

console.log('\n── CIS: deduction is on LABOUR only ──────────────────────────');
is('  registered rate', CIS_DEDUCTION_RATES.registered, 20);
is('  unregistered rate', CIS_DEDUCTION_RATES.unregistered, 30);
is('  gross status', CIS_DEDUCTION_RATES.gross, 0);

// £1,000 labour + £300 materials, 20%, DRC applies.
// Deduction = 1,000 x 20% = 200 — NOT 1,300 x 20% = 260.
let inv = cisInvoice({
  labourExVat: 1000,
  exemptCostsExVat: 300,
  cisRatePercent: 20,
  vatRatePercent: 20,
  vatRegistered: true,
  reverseCharge: true,
  suffersDeduction: true,
});
check('  sub-total', inv.subTotal, 1300);
check('  VAT charged is nil under DRC', inv.vat, 0);
check('  VAT the contractor self-accounts for', inv.reverseChargeVat, 260);
check('  CIS deduction on labour only', inv.cisDeduction, 200);
check('  over-deduction avoided vs whole invoice', 1300 * 0.2 - inv.cisDeduction, 60);
check('  cash received', inv.cashReceived, 1100);

// Same job without DRC: VAT is charged, and the deduction must NOT grow.
inv = cisInvoice({
  labourExVat: 1000,
  exemptCostsExVat: 300,
  cisRatePercent: 20,
  vatRatePercent: 20,
  vatRegistered: true,
  reverseCharge: false,
  suffersDeduction: true,
});
check('  VAT charged', inv.vat, 260);
check('  invoice total', inv.invoiceTotal, 1560);
check('  CIS still £200, VAT is outside the base', inv.cisDeduction, 200);
check('  cash received', inv.cashReceived, 1360);
// Deducting from the VAT-inclusive total would have cost another £52.
check('  over-deduction avoided vs gross total', 1560 * 0.2 - inv.cisDeduction, 112);

// 30% unregistered.
inv = cisInvoice({
  labourExVat: 1000,
  exemptCostsExVat: 300,
  cisRatePercent: 30,
  vatRatePercent: 20,
  vatRegistered: true,
  reverseCharge: true,
  suffersDeduction: true,
});
check('  30% unregistered deduction', inv.cisDeduction, 300);

// Gross payment status.
inv = cisInvoice({
  labourExVat: 1000,
  exemptCostsExVat: 300,
  cisRatePercent: 0,
  vatRatePercent: 20,
  vatRegistered: true,
  reverseCharge: true,
  suffersDeduction: true,
});
check('  gross status deducts nothing', inv.cisDeduction, 0);
check('  cash received in full', inv.cashReceived, 1300);

console.log('\n── DRC needs two VAT-registered businesses ───────────────────');
inv = cisInvoice({
  labourExVat: 1000,
  exemptCostsExVat: 300,
  cisRatePercent: 20,
  vatRatePercent: 20,
  vatRegistered: false,
  reverseCharge: true,
  suffersDeduction: true,
});
check('  no VAT either way', inv.vat, 0);
check('  and nothing to reverse charge', inv.reverseChargeVat, 0);
is(
  '  the reason is stated',
  inv.notes.some((n) => n.includes('VAT-registered')),
  true
);

console.log('\n── A contractor does not deduct from its own sale ────────────');
inv = cisInvoice({
  labourExVat: 1000,
  exemptCostsExVat: 300,
  cisRatePercent: 20,
  vatRatePercent: 20,
  vatRegistered: true,
  reverseCharge: false,
  suffersDeduction: false,
});
check('  no deduction', inv.cisDeduction, 0);
check('  cash received', inv.cashReceived, 1560);

console.log(fails === 0 ? '\nALL PASS' : `\n${fails} FAILED`);
process.exit(fails ? 1 : 0);
