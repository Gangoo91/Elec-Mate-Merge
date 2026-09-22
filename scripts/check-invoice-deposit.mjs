#!/usr/bin/env node
/**
 * Money safety for the deposit credit (ELE-1760).
 *
 *   npx tsx scripts/check-invoice-deposit.mjs
 *
 * depositCreditFromQuote decides how much of a client's invoice is treated as
 * already paid when a quote with a deposit is converted. A wrong credit under-
 * or over-bills a real customer. Two cases must never slip:
 *   · a deposit SET on the quote but never PAID must not reduce the balance;
 *   · float drift must not leave a fraction-of-a-penny on the bill.
 */
import { depositCreditFromQuote as credit } from '../src/utils/invoiceDeposit.ts';

let failed = 0;
const eq = (name, got, want) => {
  if (JSON.stringify(got) !== JSON.stringify(want)) {
    console.error(`  ✘ ${name}\n      got  ${JSON.stringify(got)}\n      want ${JSON.stringify(want)}`);
    failed++;
  }
};

const PAID = '2026-09-20T10:00:00Z';

// ── No credit: expect null ──────────────────────────────────────────────────
eq('no deposit fields', credit({}), null);
eq('deposit set, never paid', credit({ deposit_amount_pennies: 15000 }), null);
eq('paid at set, no amount', credit({ deposit_paid_at: PAID }), null);
eq('paid at set, zero amount', credit({ deposit_paid_at: PAID, deposit_amount_pennies: 0 }), null);
eq('negative amount ignored', credit({ deposit_paid_at: PAID, deposit_amount_pennies: -5000 }), null);

// ── Paid deposit: total_paid drives the balance, depositApplied labels it ────
eq(
  'paid £150 deposit',
  credit({ deposit_paid_at: PAID, deposit_amount_pennies: 15000, deposit_invoice_id: 'dep-1' }),
  {
    total_paid: 150,
    depositApplied: { amount: 150, paidAt: PAID, depositInvoiceId: 'dep-1' },
  }
);
eq(
  'no deposit invoice id → null, not undefined',
  credit({ deposit_paid_at: PAID, deposit_amount_pennies: 5000 }).depositApplied.depositInvoiceId,
  null
);
// Odd pennies survive exactly.
eq('£83.33 total_paid', credit({ deposit_paid_at: PAID, deposit_amount_pennies: 8333 }).total_paid, 83.33);
// Credit ADDS to anything already paid, and rounds to whole pence (no float drift).
eq(
  'adds to existing total_paid',
  credit({ deposit_paid_at: PAID, deposit_amount_pennies: 1000, total_paid: 0.2 }).total_paid,
  10.2
);
eq(
  'float drift is rounded away',
  // 0.1 + 0.2 = 0.30000000000000004 in IEEE-754; must come back as 0.3
  credit({ deposit_paid_at: PAID, deposit_amount_pennies: 10, total_paid: 0.2 }).total_paid,
  0.3
);

// The balance a customer sees = total − total_paid. Spot-check the arithmetic.
const c = credit({ deposit_paid_at: PAID, deposit_amount_pennies: 15000 });
eq('balance due on a £500 invoice', 500 - c.total_paid, 350);

if (failed) {
  console.error(`\n✘ depositCreditFromQuote: ${failed} case(s) failed — a wrong client bill. DO NOT SHIP.`);
  process.exit(1);
}
console.log('✔ depositCreditFromQuote — deposit credit, labelling and balance maths correct');
