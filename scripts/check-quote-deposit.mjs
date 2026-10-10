#!/usr/bin/env node
/**
 * Money safety for the deposit raised at conversion (ELE-2034).
 *
 *   npx tsx scripts/check-quote-deposit.mjs
 *
 * quoteDepositDue must ask for exactly what accept-quote-public asks for when
 * a client signs, or the same quote would carry a different deposit depending
 * on who pressed "accept". The parity cases below are real quotes whose
 * deposit the server worked out; the app must land on the same penny.
 */
import { quoteDepositDue as due } from '../src/utils/quoteDeposit.ts';

let failed = 0;
const eq = (name, got, want) => {
  if (JSON.stringify(got) !== JSON.stringify(want)) {
    console.error(
      `  ✘ ${name}\n      got  ${JSON.stringify(got)}\n      want ${JSON.stringify(want)}`
    );
    failed++;
  }
};
const pennies = (q, pct) => due(q, pct)?.pennies ?? null;

// ── Parity with accept-quote-public (live rows, deposit_amount_pennies) ─────
eq('2026/105 £1,108.80 @50%', pennies({ total: '1108.80' }, 50), 55440);
eq('2026/108 £429.00 @50%', pennies({ total: '429.00' }, 50), 21450);
eq('2026/001 £98.40 @30%', pennies({ total: '98.40' }, 30), 2952);
eq('2026/055 £419.16 @30% rounds half up', pennies({ total: '419.16' }, 30), 12575);
eq('2026/021 £675.50 @20%', pennies({ total: '675.50' }, 20), 13510);
eq('2026/019 £2,098.73 @20% rounds', pennies({ total: '2098.73' }, 20), 41975);
eq('2026/110 £7,686 @50% (the reported quote)', pennies({ total: '7686.00' }, 50), 384300);

// ── Precedence ───────────────────────────────────────────────────────────────
eq(
  'no deposit beats the firm default',
  due({ total: 1000, settings: { noDeposit: true } }, 50),
  null
);
eq(
  'cash amount beats every percentage',
  pennies({ total: 1000, settings: { depositAmount: 100, depositPercentage: 40 } }, 50),
  10000
);
eq(
  'quote % beats firm %',
  pennies({ total: 1000, settings: { depositPercentage: 25 } }, 50),
  25000
);
eq(
  'quote % of 0 falls back to firm %',
  pennies({ total: 1000, settings: { depositPercentage: 0 } }, 50),
  50000
);
eq(
  'cash of 0 falls back to percentage',
  pennies({ total: 1000, settings: { depositAmount: 0 } }, 30),
  30000
);
eq('no % anywhere → none', due({ total: 1000 }, 0), null);
eq('null firm % → none', due({ total: 1000 }, null), null);

// ── The bill, not the supply (ELE-1571) ──────────────────────────────────────
eq(
  'grant comes off before the %',
  pennies({ total: 1000, settings: { grantEnabled: true, grantAmount: 500 } }, 50),
  25000
);
eq(
  'grant ignored when switched off',
  pennies({ total: 1000, settings: { grantEnabled: false, grantAmount: 500 } }, 50),
  50000
);
eq(
  'cash capped at the bill',
  pennies({ total: 1000, settings: { depositAmount: 2000 } }, 0),
  100000
);
eq(
  'cash capped at the bill after grant',
  pennies(
    { total: 1000, settings: { depositAmount: 800, grantEnabled: true, grantAmount: 500 } },
    0
  ),
  50000
);
eq(
  'grant covers it all → none',
  due({ total: 500, settings: { grantEnabled: true, grantAmount: 900 } }, 50),
  null
);
eq('£0 quote → none', due({ total: 0 }, 50), null);

// ── Never ask twice ──────────────────────────────────────────────────────────
eq('deposit already required', due({ total: 1000, deposit_required: true }, 50), null);
eq('deposit invoice already raised', due({ total: 1000, deposit_invoice_id: 'x' }, 50), null);
eq('deposit already paid', due({ total: 1000, deposit_paid_at: '2026-10-01' }, 50), null);
eq('already invoiced', due({ total: 1000, invoice_raised: true }, 50), null);

// ── Shape ────────────────────────────────────────────────────────────────────
eq('full result', due({ total: '1514.40' }, 50), {
  pennies: 75720,
  amount: 757.2,
  percent: 50,
  payable: 1514.4,
});
eq('cash result has no percent', due({ total: 1000, settings: { depositAmount: 250 } }, 50), {
  pennies: 25000,
  amount: 250,
  percent: null,
  payable: 1000,
});

if (failed) {
  console.error(`\n✘ ${failed} quote-deposit case(s) failed`);
  process.exit(1);
}
console.log('✓ quote deposit: all cases pass (server parity, precedence, grant, cap, never twice)');
