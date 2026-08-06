import { calculateSelfEmployedTax as calc } from '../src/data/uk-tax-rates.ts';
const gbp = (n) => '£' + n.toFixed(2);
let fails = 0;
const check = (name, actual, expected, tol = 0.51) => {
  const ok = Math.abs(actual - expected) <= tol;
  if (!ok) fails++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(46)} got ${gbp(actual).padStart(12)}  want ${gbp(expected).padStart(12)}`);
};

// ── £30,000 profit, 2026/27 ────────────────────────────────────────────
// Taxable = 30000 - 12570 = 17430 @20% = 3486
// Class 4 = (30000 - 12570) * 6% = 1045.80 ; Class 2 = 0
let r = calc({ profit: 30000 }, '2026/27');
check('£30k · income tax', r.incomeTax, 3486);
check('£30k · Class 4', r.class4, 1045.8);
check('£30k · Class 2 (abolished above SPT)', r.class2, 0);
check('£30k · total', r.totalTaxAndNI, 3486 + 1045.8);

// ── £60,000 profit ─────────────────────────────────────────────────────
// Taxable = 47430. Basic 37700@20% = 7540. Higher 9730@40% = 3892. Tax = 11432
// Class 4 = 37700*6% (12570→50270) = 2262 + (60000-50270)*2% = 194.60 → 2456.60
r = calc({ profit: 60000 }, '2026/27');
check('£60k · income tax', r.incomeTax, 11432);
check('£60k · Class 4', r.class4, 2262 + 194.6);

// ── £8,000 profit — below Class 4 LPL, above SPT ───────────────────────
r = calc({ profit: 8000 }, '2026/27');
check('£8k · income tax (under PA)', r.incomeTax, 0);
check('£8k · Class 4 (under LPL)', r.class4, 0);
check('£8k · Class 2 never auto-charged', r.class2, 0);

// ── £5,000 — below the Small Profits Threshold ─────────────────────────
r = calc({ profit: 5000 }, '2026/27');
check('£5k · nothing due', r.totalTaxAndNI, 0);
console.log(`      note surfaced: ${r.notes.some(n => n.includes('voluntary')) ? 'yes' : 'NO — voluntary Class 2 not mentioned'}`);

// ── Personal allowance taper at £110,000 ───────────────────────────────
// PA = 12570 - (110000-100000)/2 = 12570 - 5000 = 7570
r = calc({ profit: 110000 }, '2026/27');
check('£110k · tapered personal allowance', r.personalAllowance, 7570);

// ── Taper fully gone by £125,140 ───────────────────────────────────────
r = calc({ profit: 125140 }, '2026/27');
check('£125,140 · allowance fully tapered', r.personalAllowance, 0);

// ── Pension EXTENDS the basic band, does not cut income ────────────────
// £60k profit, £10k gross pension. Taxable still 47430.
// Basic band 37700+10000 = 47700 → all 47430 at 20% = 8486
r = calc({ profit: 60000, grossPensionContributions: 10000 }, '2026/27');
check('£60k + £10k pension · income tax', r.incomeTax, 9486);
const noPension = calc({ profit: 60000 }, '2026/27').incomeTax;
// Only £9,730 sat in the higher band, so widening it by £10,000 can rescue
// £9,730 of it at 20% = £1,946. Relief is capped by the income actually there.
check('  relief = 20% of the £9,730 lifted out of 40%', noPension - r.incomeTax, 1946);

// ── Marriage Allowance: transferring OUT reduces your allowance ────────
r = calc({ profit: 30000, transfersMarriageAllowance: true }, '2026/27');
check('MA transferred out · allowance', r.personalAllowance, 12570 - 1260);

// ── Marriage Allowance: receiving is a £252 tax reducer ────────────────
r = calc({ profit: 30000, receivesMarriageAllowance: true }, '2026/27');
check('MA received · tax reduced by £252', 3486 - r.incomeTax, 252);

// ── Higher-rate taxpayer cannot claim MA ──────────────────────────────
r = calc({ profit: 60000, receivesMarriageAllowance: true }, '2026/27');
check('MA ignored for higher-rate payer', r.incomeTax, 11432);

// ── 2024/25 must NOT charge Class 2 ───────────────────────────────────
r = calc({ profit: 30000 }, '2024/25');
check('2024/25 · Class 2 is £0 (was £179.40)', r.class2, 0);

console.log(fails === 0 ? '\nALL PASS' : `\n${fails} FAILED`);
process.exit(fails ? 1 : 0);
