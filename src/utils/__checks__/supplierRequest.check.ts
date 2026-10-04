/**
 * The materials list a merchant gets — ELE-1795.
 *
 * The one thing that must never happen: the electrician's prices reaching a
 * supplier. Then: no labour, a hand-typed line not sent unless ticked, the
 * same item on two lines sent as one total.
 */
import {
  supplierLinesFromQuote,
  supplierRequestText,
  supplierLineText,
  withoutPrices,
} from '@/utils/supplierRequest';
import type { QuoteItem } from '@/types/quote';

let failures = 0;
const check = (name: string, ok: boolean, detail = '') => {
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
  if (!ok) failures += 1;
};

let n = 0;
const item = (over: Partial<QuoteItem>): QuoteItem =>
  ({
    id: `i${n++}`,
    description: 'Item',
    quantity: 1,
    unit: 'each',
    unitPrice: 12.34,
    totalPrice: 12.34,
    category: 'materials',
    ...over,
  }) as QuoteItem;

const items: QuoteItem[] = [
  item({ description: '2.5mm T&E', quantity: 50, unit: 'm', unitPrice: 0.87, totalPrice: 43.5 }),
  item({ description: '2.5mm T&E', quantity: 25, unit: 'm', unitPrice: 0.87, totalPrice: 21.75 }),
  item({
    description: 'Double socket',
    quantity: 6,
    unit: 'each',
    unitPrice: 7.99,
    totalPrice: 47.94,
  }),
  item({
    description: 'Consumer unit 10-way',
    category: 'equipment',
    unitPrice: 189,
    totalPrice: 189,
  }),
  item({
    description: 'Electrician',
    category: 'labour',
    quantity: 8,
    unit: 'hours',
    unitPrice: 45,
    totalPrice: 360,
  }),
  item({ description: 'Skip hire', category: 'manual', unitPrice: 220, totalPrice: 220 }),
  item({ description: 'Nothing', quantity: 0 }),
];

const lines = supplierLinesFromQuote(items);
const te = lines.find((l) => l.description === '2.5mm T&E');
check('the same item on two lines is one total', te?.quantity === 75, `got ${te?.quantity}`);
check('labour never goes to a merchant', !lines.some((l) => /Electrician/.test(l.description)));
check('a zero-quantity line is left out', !lines.some((l) => l.description === 'Nothing'));
check('a hand-typed extra is not on the list', !lines.some((l) => l.description === 'Skip hire'));
check(
  'materials are ticked',
  lines.filter((l) => l.kind === 'materials').every((l) => l.include)
);
check(
  'equipment (hire, in the builder) is not on the list',
  !lines.some((l) => /Consumer unit/.test(l.description))
);

// Spellings of one unit merge; repeated spaces don't make a new line.
const variants = supplierLinesFromQuote([
  item({ description: '6mm  T&E', quantity: 10, unit: 'm' }),
  item({ description: '6mm T&E', quantity: 5, unit: 'metres' }),
  item({ description: '6mm T&E', quantity: 5, unit: 'M' }),
  item({ description: 'Socket', quantity: 2, unit: '' }),
  item({ description: 'Socket', quantity: 1, unit: 'each' }),
]);
check(
  '"m", "metres" and "M" are one line',
  variants.find((l) => l.description === '6mm T&E')?.quantity === 20
);
check(
  'a blank unit and "each" are one line',
  variants.find((l) => l.description === 'Socket')?.quantity === 3
);

const text = supplierRequestText({
  lines: lines.filter((l) => l.include),
  companyName: 'Sparks Ltd',
  reference: 'Quote QT-0042',
  siteAddress: '1 High St',
});
const prices = ['0.87', '43.5', '21.75', '7.99', '47.94', '189', '45', '360', '220', '12.34', '£'];
const leaked = prices.filter((p) => text.includes(p));
check('no price reaches the merchant', leaked.length === 0, leaked.join(', '));
check('an unticked line is not in the message', !text.includes('Skip hire'));
check(
  'the firm, the reference and the site head the message',
  /Sparks Ltd/.test(text) && /Ref: Quote QT-0042/.test(text) && /Site: 1 High St/.test(text)
);
check(
  'counted items read "6 × Double socket"',
  text.includes('• 6 × Double socket'),
  supplierLineText({ quantity: 6, unit: 'each', description: 'Double socket' })
);
check('measured items read "75 m — 2.5mm T&E"', text.includes('• 75 m — 2.5mm T&E'));
check('equipment is not in the message', !text.includes('Consumer unit'));

// A quote's list is just the materials and quantities — no request wording.
const plain = supplierRequestText({
  lines,
  companyName: 'Sparks Ltd',
  reference: 'Quote QT-0042',
  style: 'list',
});
check(
  'the materials list is only the heading and the lines',
  plain ===
    [
      'Materials list — Sparks Ltd',
      'Quote QT-0042',
      '',
      '• 75 m — 2.5mm T&E',
      '• 6 × Double socket',
    ].join('\n'),
  JSON.stringify(plain)
);

// Prices typed INTO descriptions (real lines from live quotes, 2 Oct 2026).
const typed: [string, string][] = [
  [
    'Replace single IP rated socket with a broken lid\nMaterials £20\nLabour £',
    'Replace single IP rated socket with a broken lid',
  ],
  [
    'Supply materials for outside light (£60) and labour two hours at £45 per hour',
    'Supply materials for outside light and labour two hours',
  ],
  ['Sundries ( £6 ) Screws, plugs etc', 'Sundries Screws, plugs etc'],
  [
    'Travel @ 0.58p/mile (Increased due to current fuel prices)',
    'Travel (Increased due to current fuel prices)',
  ],
  ['Consumer unit 10-way £189.99 + VAT', 'Consumer unit 10-way'],
  ['6mm² SWA 3 core', '6mm² SWA 3 core'],
];
for (const [from, to] of typed) {
  const got = withoutPrices(from);
  check(`no price in "${to}"`, got === to && !/£|\d+p\//.test(got), `got "${got}"`);
}
const priced = supplierRequestText({
  lines: supplierLinesFromQuote([
    item({ description: 'Outside light (£60)', quantity: 1 }),
    item({ description: 'Isolator £18.50 + VAT', quantity: 2 }),
  ]),
});
check(
  'a price typed into a description never reaches the merchant',
  !/£|18\.50|60/.test(priced),
  priced
);

if (failures) {
  console.error(`\n✗ supplier request: ${failures} failed`);
  process.exit(1);
}
console.log('\n✓ supplier request: materials and quantities only — no prices, no labour, merged lines');
