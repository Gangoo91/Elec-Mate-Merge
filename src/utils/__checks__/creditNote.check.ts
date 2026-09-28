/**
 * Credit notes — ELE-1704.
 *
 * Everything here ends up on a document an accountant files and HMRC may read.
 * The three that would be expensive to get wrong:
 *
 *   1. A credit note must never exceed what is left to credit — and partial
 *      credits accumulate, so "has it been credited" is not the question.
 *   2. It inherits the invoice's VAT treatment. A reverse-charge invoice
 *      credited at 20% puts a number on a VAT return that was never charged.
 *   3. It names the invoice it corrects.
 */
import {
  buildCreditNote,
  creditEverything,
  remainingToCredit,
  creditNoteReference,
  sumCreditsAgainst,
  REFUSAL_MESSAGE,
  type CreditNoteLine,
  type CreditableInvoice,
} from '@/utils/creditNote';
import type { QuoteItem, QuoteSettings } from '@/types/quote';

let failures = 0;
const check = (name: string, ok: boolean, detail = '') => {
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
  if (!ok) failures += 1;
};

const settings = (over: Partial<QuoteSettings> = {}): QuoteSettings =>
  ({
    overheadPercentage: 0,
    profitMargin: 0,
    vatRate: 20,
    vatRegistered: true,
    ...over,
  }) as QuoteSettings;

const line = (over: Partial<QuoteItem> = {}): QuoteItem =>
  ({
    id: 'i1',
    description: 'Consumer unit change',
    quantity: 1,
    unit: 'each',
    unitPrice: 500,
    totalPrice: 500,
    category: 'materials',
    ...over,
  }) as QuoteItem;

/** £500 + 20% = £600. */
const invoice = (over: Partial<CreditableInvoice> = {}): CreditableInvoice => ({
  isInvoice: true,
  total: 600,
  settings: settings(),
  items: [line()],
  ...over,
});

console.log('\n1. A full credit against a plain invoice');
{
  const inv = invoice();
  const r = buildCreditNote(inv, creditEverything(inv.items), 'Job descoped', 0);
  check('accepted', r.ok);
  {
    check('credits the ex-VAT value', r.draft.subtotal === 500, String(r.draft.subtotal));
    check('and the VAT with it', r.draft.vatAmount === 100, String(r.draft.vatAmount));
    check('total matches the invoice', r.draft.total === 600, String(r.draft.total));
    check('quantities stay POSITIVE — the document type carries the sign',
      r.draft.lines.every((l) => l.quantity > 0));
    check('the reason is kept', r.draft.reason === 'Job descoped');
  }
}

console.log('\n2. 🔴 It can never exceed what is left');
{
  const inv = invoice();
  const tooBig: CreditNoteLine[] = [
    { sourceItemId: 'i1', description: 'Overcredit', quantity: 1, unitPrice: 5000, category: 'materials' },
  ];
  const r = buildCreditNote(inv, tooBig, 'oops', 0);
  check('refused', !r.ok);
  check('with the right reason', r.refusal === 'exceeds-remaining', r.refusal);
  check('and a message a human can act on',
    REFUSAL_MESSAGE['exceeds-remaining'].includes('cannot be for more than'));
}

console.log('\n3. 🔴 Partial credits ACCUMULATE');
{
  const inv = invoice();
  check('£600 invoice, nothing credited → £600 left', remainingToCredit(600, 0) === 600);
  check('after £200 → £400 left', remainingToCredit(600, 200) === 400);
  check('after £200 + £200 + £200 → £0 left', remainingToCredit(600, 600) === 0);
  check('never negative', remainingToCredit(600, 900) === 0);

  // The bug a naive "already credited?" flag would allow.
  const fourth = buildCreditNote(
    inv,
    [{ sourceItemId: 'i1', description: 'Rest', quantity: 1, unitPrice: 500, category: 'materials' }],
    'fourth bite',
    500 // £500 of the £600 already credited, £100 left
  );
  check('a 4th credit beyond the remainder is refused', !fourth.ok);
  check('and says how much is actually left', fourth.remaining === 100, String(fourth.remaining));
}

console.log('\n4. 🔴 VAT treatment is INHERITED, never re-chosen');
{
  // Reverse charge: £0 VAT on the invoice, so £0 VAT on the credit.
  const rc = invoice({ settings: settings({ reverseCharge: true }), total: 500 });
  const r = buildCreditNote(rc, creditEverything(rc.items), 'descoped', 0);
  check('a reverse-charge invoice credits at £0 VAT',
    r.draft?.vatAmount === 0, String(r.draft?.vatAmount));
  check('and the credit knows it is reverse charge', r.ok && r.draft.reverseCharge);

  // Not VAT registered.
  const nv = invoice({ settings: settings({ vatRegistered: false }), total: 500 });
  const r2 = buildCreditNote(nv, creditEverything(nv.items), 'descoped', 0);
  check('a non-VAT invoice credits at £0 VAT',
    r2.draft?.vatAmount === 0, r2.ok ? String(r2.draft.vatAmount) : 'refused');

  // A different rate must carry across, not default to 20.
  const five = invoice({ settings: settings({ vatRate: 5 }), total: 525 });
  const r3 = buildCreditNote(five, creditEverything(five.items), 'descoped', 0);
  check('a 5% invoice credits at 5%, not 20%',
    r3.draft?.vatAmount === 25, r3.ok ? String(r3.draft.vatAmount) : 'refused');
}

console.log('\n5. 🔴 A discount is not applied twice');
{
  /*
   * The invoice was already discounted — that is why its total is what it is.
   * Re-running the discount on the credit would refund LESS than was charged
   * and quietly leave the customer short.
   */
  const disc = invoice({
    settings: settings({ discountEnabled: true, discountType: 'percentage', discountValue: 50 }),
    total: 300,
  });
  const r = buildCreditNote(disc, creditEverything(disc.items), 'returned', 0);
  // £600 > £300 remaining, so it is correctly refused rather than silently halved.
  check('refused rather than silently re-discounted to £300', !r.ok);
  check('for exceeding the remainder', r.refusal === 'exceeds-remaining', r.refusal);
  check('and the remainder is the discounted total', r.remaining === 300, String(r.remaining));
}

console.log('\n6. Refusals that are not about money');
{
  const notAnInvoice = buildCreditNote(invoice({ isInvoice: false }), creditEverything([line()]), 'x', 0);
  check('a quote cannot be credited', !notAnInvoice.ok);
  check('  → no-invoice', notAnInvoice.refusal === 'no-invoice', notAnInvoice.refusal);

  const fullyCredited = buildCreditNote(invoice(), creditEverything([line()]), 'x', 600);
  check('a fully credited invoice refuses', !fullyCredited.ok);
  check('  → nothing-to-credit', fullyCredited.refusal === 'nothing-to-credit', fullyCredited.refusal);

  /*
   * Nothing SELECTED is not the same as nothing LEFT, and must not borrow the
   * other's message: unticking every line once told the electrician the
   * invoice was "already credited in full" while the same screen showed them
   * what was still creditable.
   */
  const empty = buildCreditNote(invoice(), [], 'x', 0);
  check('no lines refuses', !empty.ok);
  check('  → no-lines-selected', empty.refusal === 'no-lines-selected', empty.refusal);
  check(
    '  → and does NOT claim the invoice is fully credited',
    REFUSAL_MESSAGE[empty.refusal!] !== REFUSAL_MESSAGE['nothing-to-credit'],
    REFUSAL_MESSAGE[empty.refusal!]
  );
  check('  → remaining is still reported as £600', empty.remaining === 600, empty.remaining);

  const zero = buildCreditNote(
    invoice(),
    [{ sourceItemId: 'i1', description: 'nil', quantity: 0, unitPrice: 500, category: 'materials' }],
    'x',
    0
  );
  check('a zero-quantity line refuses', !zero.ok);
}

console.log('\n7. 🔴 It names the invoice it corrects');
{
  const ref = creditNoteReference('Invoice/042', new Date('2026-09-14T00:00:00Z'));
  check('states the invoice number', ref.includes('Invoice/042'), ref);
  check('and the date', /14 September 2026/.test(ref), ref);
  check('degrades safely with no number', creditNoteReference(null, null) === 'Credit note');
  check('and with a bad date still names the invoice',
    creditNoteReference('Invoice/042', 'not-a-date') === 'Credit note against invoice Invoice/042');
}

console.log('\n8. A partial credit of one line on a multi-line invoice');
{
  const inv = invoice({
    total: 1200,
    items: [line({ id: 'a', unitPrice: 500 }), line({ id: 'b', description: 'Rewire', unitPrice: 500 })],
  });
  const justOne = creditEverything(inv.items).filter((l) => l.sourceItemId === 'b');
  const r = buildCreditNote(inv, justOne, 'Second circuit not done', 0);
  check('only the credited line appears', r.ok && r.draft.lines.length === 1);
  check('priced at that line only', r.draft?.subtotal === 500, r.ok ? String(r.draft.subtotal) : '');
  check('with its own VAT', r.draft?.vatAmount === 100, r.ok ? String(r.draft.vatAmount) : '');
}

console.log('\n9. 🔴 A per-item adjustment is credited, not dropped');
{
  /*
   * ELE-888 lets a line carry its own ± %. The customer was charged
   * quantity × unitPrice × (1 + adj/100), so crediting quantity × unitPrice
   * alone refunds a marked-up line short — quietly, because every figure on
   * the credit note still looks self-consistent.
   */
  const marked = invoice({
    total: 660, // 500 +10% = 550, +20% VAT = 660
    items: [line({ itemAdjustmentPercent: 10 })],
  });
  const lines = creditEverything(marked.items);
  check('the adjustment comes across on the line',
    lines[0].itemAdjustmentPercent === 10, String(lines[0].itemAdjustmentPercent));

  const r = buildCreditNote(marked, lines, 'returned', 0);
  check('accepted', r.ok, r.refusal ?? '');
  check('credits £550 ex-VAT, not £500',
    r.draft?.subtotal === 550, String(r.draft?.subtotal));
  check('so the customer gets the full £660 back',
    r.draft?.total === 660, String(r.draft?.total));

  // A discount line (negative adjustment) must not be over-credited either.
  const mates = invoice({ total: 480, items: [line({ itemAdjustmentPercent: -20 })] });
  const r2 = buildCreditNote(mates, creditEverything(mates.items), 'returned', 0);
  check('a -20% mates-rate line credits £400, not £500',
    r2.draft?.subtotal === 400, String(r2.draft?.subtotal));
}

console.log('\n10. 🔴 CIS is carried, not silently dropped');
{
  const cis = invoice({
    total: 600,
    settings: settings({ cisEnabled: true, cisRate: 20 }),
    items: [line({ category: 'labour' })],
  });
  const r = buildCreditNote(cis, creditEverything(cis.items), 'descoped', 0);
  check('accepted', r.ok, r.refusal ?? '');
  check('the credit states the CIS withheld on the credited labour',
    (r.draft?.cisAmount ?? 0) > 0, String(r.draft?.cisAmount));
  check('20% of the £500 labour net = £100',
    r.draft?.cisAmount === 100, String(r.draft?.cisAmount));

  const noCis = buildCreditNote(invoice(), creditEverything([line()]), 'x', 0);
  check('a non-CIS invoice credits £0 CIS', noCis.draft?.cisAmount === 0, String(noCis.draft?.cisAmount));
}

console.log('\n11. 🔴 What counts as already credited');
{
  /*
   * The list and the raise path share this. If they drift, the screen says
   * £400 is available and the save refuses — or worse, the save allows what
   * the screen said was impossible.
   */
  const rows = [
    { total: 100, status: 'issued' },
    { total: 50, status: 'draft' },
    { total: 250, status: 'void' },
  ];
  check('issued counts', sumCreditsAgainst([rows[0]]) === 100);
  check('a DRAFT counts — it holds the value before it is issued',
    sumCreditsAgainst([rows[1]]) === 50, String(sumCreditsAgainst([rows[1]])));
  check('a VOID does not — it gave nothing back',
    sumCreditsAgainst([rows[2]]) === 0, String(sumCreditsAgainst([rows[2]])));
  check('and together that is 150, not 400',
    sumCreditsAgainst(rows) === 150, String(sumCreditsAgainst(rows)));

  check('empty is 0', sumCreditsAgainst([]) === 0);
  check('numeric strings from postgres are handled',
    sumCreditsAgainst([{ total: '12.34', status: 'issued' }]) === 12.34,
    String(sumCreditsAgainst([{ total: '12.34', status: 'issued' }])));
  check('a null total does not poison the sum',
    sumCreditsAgainst([{ total: null, status: 'issued' }, { total: 10, status: 'issued' }]) === 10);
  check('rounds to pennies', sumCreditsAgainst([
    { total: 0.1, status: 'issued' }, { total: 0.2, status: 'issued' },
  ]) === 0.3, String(sumCreditsAgainst([{ total: 0.1, status: 'issued' }, { total: 0.2, status: 'issued' }])));

  // End to end: the cap must use it.
  const inv = invoice();
  const r = buildCreditNote(inv, creditEverything(inv.items), 'x', sumCreditsAgainst(rows));
  check('a £600 invoice with £150 credited leaves £450, so a £600 credit is refused', !r.ok);
  check('and the remainder reported is £450', r.remaining === 450, String(r.remaining));
}

console.log(
  failures === 0
    ? '\n✅ credit notes: all checks passed\n'
    : `\n❌ credit notes: ${failures} check(s) failed\n`
);
process.exitCode = failures === 0 ? 0 : 1;
