/**
 * Time allowance on any quote line — ELE-1780.
 *
 * Three things here would be expensive to get wrong, and all three are on a
 * document a customer receives and an accountant files:
 *
 *   1. Labour must not be counted twice. 464 live labour lines already carry
 *      `hours > 0` and get their money from `quantity × unitPrice`.
 *   2. A grade with no rate must produce NO line, never a £0 one.
 *   3. Deleting a line must take its derived labour with it — the bug Price
 *      Book labour has today.
 */
import {
  labourForTimeAllowance,
  reconcileDerivedLabour,
  detachDerivedLabour,
  takesOwnershipOfDerived,
  hasTimeAllowance,
  isDerivedLabour,
} from '@/utils/timeAllowance';
import type { QuoteItem } from '@/types/quote';

let failures = 0;
const check = (name: string, ok: boolean, detail = '') => {
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
  if (!ok) failures += 1;
};

const item = (over: Partial<QuoteItem>): QuoteItem =>
  ({
    id: 'i1',
    description: 'Double socket outlet',
    quantity: 1,
    unit: 'each',
    unitPrice: 12.4,
    totalPrice: 12.4,
    category: 'materials',
    ...over,
  }) as QuoteItem;

/** An electrician who has set their rates. */
const RATES = { workerRates: { electrician: 45, apprentice: 22 }, hourlyRate: 45 };
/** One who has not. */
const NO_RATES = { workerRates: null, hourlyRate: null };

console.log('\n1. A material line with a time allowance produces labour');
{
  const lines = labourForTimeAllowance(item({ timeAllowance: [{ grade: 'electrician', hours: 0.5 }] }), RATES);
  check('one labour line', lines.length === 1);
  check('at the electrician rate', lines[0]?.unitPrice === 45);
  check('for the allowance', lines[0]?.quantity === 0.5 && lines[0]?.hours === 0.5);
  check('categorised as labour', lines[0]?.category === 'labour');
  check('named after its parent', lines[0]?.description.includes('Double socket outlet'));
  check('linked back to the parent', lines[0]?.derivedFromItemId === 'i1');
}

console.log('\n2. The allowance is PER UNIT — 10 sockets at 0.5h is 5 hours');
{
  const lines = labourForTimeAllowance(item({ timeAllowance: [{ grade: 'electrician', hours: 0.5 }], quantity: 10 }), RATES);
  check('5 hours, not 0.5', lines[0]?.quantity === 5, String(lines[0]?.quantity));
  check('priced at 5 × £45', lines[0]?.quantity * lines[0]?.unitPrice === 225);
}

console.log('\n3. 🔴 A labour line never gets its own allowance — that is the double-count');
{
  const lines = labourForTimeAllowance(
    item({ category: 'labour', hours: 3, quantity: 3, unitPrice: 45, timeAllowance: [{ grade: 'electrician', hours: 3 }] }),
    RATES
  );
  check('no labour derived from a labour line', lines.length === 0);
}

console.log('\n4. 🔴 No rate set produces NO line, never £0 labour on a customer quote');
{
  const lines = labourForTimeAllowance(item({ timeAllowance: [{ grade: 'electrician', hours: 2 }] }), NO_RATES);
  check('nothing emitted', lines.length === 0);
  const zero = labourForTimeAllowance(
    item({ timeAllowance: [{ grade: 'labourer', hours: 2 }] }),
    { workerRates: { electrician: 45 }, hourlyRate: 45 }
  );
  check('an unrated grade emits nothing either', zero.length === 0);
}

console.log('\n5. Nothing is emitted without an allowance');
{
  check('no field', labourForTimeAllowance(item({}), RATES).length === 0);
  check('zero hours', labourForTimeAllowance(item({ timeAllowance: [{ grade: 'electrician', hours: 0 }] }), RATES).length === 0);
  check('empty array', labourForTimeAllowance(item({ timeAllowance: [] }), RATES).length === 0);
  check('quantity zero', labourForTimeAllowance(item({ timeAllowance: [{ grade: 'electrician', hours: 1 }], quantity: 0 }), RATES).length === 0);
  check('hasTimeAllowance agrees', !hasTimeAllowance(item({})) && hasTimeAllowance(item({ timeAllowance: [{ grade: 'electrician', hours: 0.25 }] })));
}

console.log('\n6. A category outside the union still works (live data has 25 such lines)');
{
  const odd = labourForTimeAllowance(
    item({ category: 'lighting' as QuoteItem['category'], timeAllowance: [{ grade: 'electrician', hours: 1 }] }),
    RATES
  );
  check('lighting gets its labour', odd.length === 1);
}

console.log('\n7. Derived labour sits directly after its parent');
{
  const parent = item({ id: 'p', timeAllowance: [{ grade: 'electrician', hours: 1 }] });
  const other = item({ id: 'z', description: 'Consumer unit' });
  const derived = { ...labourForTimeAllowance(parent, RATES)[0], id: 'd', totalPrice: 45 } as QuoteItem;
  const out = reconcileDerivedLabour([parent, other], 'p', [derived]);
  check('order is parent, its labour, then the rest',
    out.map((i) => i.id).join(',') === 'p,d,z', out.map((i) => i.id).join(','));
}

console.log('\n8. 🔴 Deleting the parent takes its labour with it');
{
  const parent = item({ id: 'p', timeAllowance: [{ grade: 'electrician', hours: 1 }] });
  const other = item({ id: 'z' });
  const derived = { ...labourForTimeAllowance(parent, RATES)[0], id: 'd', totalPrice: 45 } as QuoteItem;
  // The parent has already been removed from the list, as `removeItem` does.
  const out = reconcileDerivedLabour([other, derived], 'p', []);
  check('the orphan is gone', out.map((i) => i.id).join(',') === 'z', out.map((i) => i.id).join(','));
}

console.log('\n9. Editing the allowance replaces the old labour rather than stacking it');
{
  const parent = item({ id: 'p', timeAllowance: [{ grade: 'electrician', hours: 1 }] });
  const old = { ...labourForTimeAllowance(parent, RATES)[0], id: 'd1', totalPrice: 45 } as QuoteItem;
  const updated = { ...parent, timeAllowance: [{ grade: 'electrician', hours: 2 }] };
  const fresh = { ...labourForTimeAllowance(updated, RATES)[0], id: 'd2', totalPrice: 90 } as QuoteItem;
  const out = reconcileDerivedLabour([parent, old], 'p', [fresh]);
  check('exactly one derived line remains', out.filter(isDerivedLabour).length === 1);
  check('and it is the new one', out.find(isDerivedLabour)?.quantity === 2);
}

console.log('\n10. Another line’s labour is never touched');
{
  const a = item({ id: 'a', timeAllowance: [{ grade: 'electrician', hours: 1 }] });
  const b = item({ id: 'b', timeAllowance: [{ grade: 'electrician', hours: 1 }] });
  const la = { ...labourForTimeAllowance(a, RATES)[0], id: 'la', totalPrice: 45 } as QuoteItem;
  const lb = { ...labourForTimeAllowance(b, RATES)[0], id: 'lb', totalPrice: 45 } as QuoteItem;
  const out = reconcileDerivedLabour([a, la, b, lb], 'a', []);
  check("b's labour survives", out.some((i) => i.id === 'lb'));
  check("a's labour is gone", !out.some((i) => i.id === 'la'));
}

console.log('\n11. 🔴 Editing derived labour keeps the edit');
{
  const parent = item({ id: 'p', timeAllowance: [{ grade: 'electrician', hours: 1 }] });
  const derived = { ...labourForTimeAllowance(parent, RATES)[0], id: 'd', totalPrice: 45 } as QuoteItem;

  check('a description edit does NOT take ownership', !takesOwnershipOfDerived({ description: 'x' }));
  check('an hours edit does', takesOwnershipOfDerived({ hours: 2 }));
  check('a price edit does', takesOwnershipOfDerived({ unitPrice: 50 }));

  const out = detachDerivedLabour([parent, derived], 'd');
  const detached = out.find((i) => i.id === 'd')!;
  const cleared = out.find((i) => i.id === 'p')!;
  check('the line stops being derived', !isDerivedLabour(detached));
  check("the parent's allowance is cleared, so no SECOND labour line appears",
    !hasTimeAllowance(cleared));
  check('nothing else is removed', out.length === 2);

  // The whole point: a later parent edit must not resurrect labour over it.
  const after = reconcileDerivedLabour(out, 'p', labourForTimeAllowance(cleared, RATES) as QuoteItem[]);
  check('a later parent edit adds no duplicate labour',
    after.filter((i) => i.category === 'labour').length === 1,
    String(after.filter((i) => i.category === 'labour').length));
}

console.log('\n12. The grade decides the rate');
{
  const elec = labourForTimeAllowance(item({ timeAllowance: [{ grade: 'electrician', hours: 2 }] }), RATES)[0];
  check('defaults to the electrician rate', elec.unitPrice === 45, String(elec.unitPrice));

  const appr = labourForTimeAllowance(
    item({ timeAllowance: [{ grade: 'apprentice', hours: 2 }] }),
    RATES
  )[0];
  check('an apprentice allowance is priced at the apprentice rate',
    appr.unitPrice === 22, String(appr.unitPrice));
  check('and is labelled as one', appr.description.includes('(Apprentice)'),
    appr.description);
  check('2h at £22 is £44, not £90',
    appr.quantity * appr.unitPrice === 44, String(appr.quantity * appr.unitPrice));
}

console.log('\n13. 🔴 Two trades on ONE line — the reason this is an array');
{
  /*
   * A board change is an electrician AND an apprentice on site together.
   * Before this was an array the estimator had to add the line twice to say
   * that, and `labourLinesFor` has emitted one line per grade since ELE-1470
   * — the model was the thing lagging, not the engine.
   */
  const boardChange = item({
    id: 'bc',
    description: 'Consumer unit change',
    quantity: 1,
    timeAllowance: [
      { grade: 'electrician', hours: 4 },
      { grade: 'apprentice', hours: 4 },
    ],
  });
  const lines = labourForTimeAllowance(boardChange, RATES);

  check('two labour lines, one per trade', lines.length === 2, String(lines.length));
  check('the electrician line is at £45', lines[0]?.unitPrice === 45);
  check('the apprentice line is at £22', lines[1]?.unitPrice === 22);
  check('each is labelled with its trade',
    lines[0].description.includes('(Electrician)') && lines[1].description.includes('(Apprentice)'));
  check('the money is 4×45 + 4×22 = £268, not 8×45 = £360',
    lines.reduce((t, l) => t + l.quantity * l.unitPrice, 0) === 268,
    String(lines.reduce((t, l) => t + l.quantity * l.unitPrice, 0)));
  check('both point at the same parent',
    lines.every((l) => l.derivedFromItemId === 'bc'));

  // Quantity multiplies every trade, not just the first.
  const two = labourForTimeAllowance({ ...boardChange, quantity: 2 }, RATES);
  check('quantity 2 doubles both trades',
    two[0].quantity === 8 && two[1].quantity === 8,
    `${two[0].quantity}/${two[1].quantity}`);

  // A trade with no rate drops out; the rated one survives.
  const partial = labourForTimeAllowance(boardChange, { workerRates: { electrician: 45 }, hourlyRate: 45 });
  check('an unrated trade drops out rather than billing £0',
    partial.length === 1 && partial[0].unitPrice === 45, String(partial.length));
}

console.log('\n14. 🔴 The price-book round trip — type the time once, keep it forever');
{
  /*
   * `useSaveToPriceBook.toRow` pairs a material with its labour line to store
   * `labour_hours`, so the next quote already knows the time. It matched
   * `Labour — <name>` EXACTLY while both emitters append ` (Grade)`, so it
   * matched nothing and the time was never saved — on any item, ever.
   *
   * Mirrored here (it is a copy, so it can drift) because this loop is what
   * turns the feature from a field you retype into a library that compounds.
   */
  const pairedHoursFor = (name: string, lines: { category: string; description: string; hours?: number; quantity?: number }[]) => {
    const prefix = `Labour — ${name}`;
    return lines
      .filter((l) => l.category === 'labour' && (l.description === prefix || l.description.startsWith(`${prefix} (`)))
      .reduce((sum, l) => sum + (l.hours ?? l.quantity ?? 0), 0);
  };

  const parent = item({ id: 'p', description: 'Double socket outlet', timeAllowance: [{ grade: 'electrician', hours: 0.5 }], quantity: 10 });
  const derived = labourForTimeAllowance(parent, RATES)[0];
  const lines = [
    { category: 'materials', description: 'Double socket outlet' },
    { category: derived.category, description: derived.description, hours: derived.hours, quantity: derived.quantity },
  ];

  check('the grade suffix no longer breaks the pairing',
    pairedHoursFor('Double socket outlet', lines) === 5,
    String(pairedHoursFor('Double socket outlet', lines)));
  check('the OLD exact match found nothing (this is the bug)',
    lines.filter((l) => l.description === 'Labour — Double socket outlet').length === 0);

  // Two-man task: one line per grade, both must count.
  const twoMan = [
    { category: 'labour', description: 'Labour — Board change (Electrician)', hours: 3 },
    { category: 'labour', description: 'Labour — Board change (Apprentice)', hours: 3 },
  ];
  check('a two-man task sums both grades, not just the first',
    pairedHoursFor('Board change', twoMan) === 6, String(pairedHoursFor('Board change', twoMan)));

  check('another item\u2019s labour is not swept in',
    pairedHoursFor('Board change', [...twoMan, { category: 'labour', description: 'Labour — Consumer unit (Electrician)', hours: 9 }]) === 6);
}

console.log('\n15. 🔴 The PDF contract');
{
  /*
   * `generate-pdf-monkey/index.ts:765-781` decides a printed line's unit with
   * the expression below, copied VERBATIM. It is a mirror, so it can drift —
   * but the two rules it encodes are the whole reason `timeAllowanceHours` is
   * a separate field from `hours`, and an unguarded change to either side
   * prints nonsense on a customer's quote.
   *
   * ELE-1076: materials lines carrying unit 'hour' printed "Materials — 1
   * hour". ELE-1406: a real user-chosen hour had to keep it.
   */
  const printedUnit = (raw: Record<string, unknown>, category: string, quantity: number) => {
    const u = String(raw.unit || 'each').toLowerCase();
    const hourly =
      parseFloat(String(raw.hours)) > 0 ||
      parseFloat(String(raw.hourlyRate)) > 0 ||
      category === 'labour' ||
      (Number(quantity) || 0) !== 1;
    return ['hour', 'hours', 'day', 'days'].includes(u) && !hourly ? 'each' : raw.unit || 'each';
  };

  const parent = item({ timeAllowance: [{ grade: 'electrician', hours: 0.5 }], quantity: 10 });
  check(
    'the parent NEVER gains `hours` — that is what prints "Socket outlet — 0.5 hour"',
    !('hours' in parent) || !parent.hours
  );
  check(
    'a material line with an allowance still prints as `each`',
    printedUnit(parent as unknown as Record<string, unknown>, parent.category, parent.quantity) === 'each',
    String(printedUnit(parent as unknown as Record<string, unknown>, parent.category, parent.quantity))
  );

  const derived = labourForTimeAllowance(parent, RATES)[0];
  check('the derived line is category labour', derived?.category === 'labour');
  check('carries hours and a rate, as the PDF expects of labour',
    (derived?.hours ?? 0) > 0 && (derived?.hourlyRate ?? 0) > 0);
  check(
    'and prints in hours',
    printedUnit(derived as unknown as Record<string, unknown>, 'labour', derived.quantity) === 'hour',
    String(printedUnit(derived as unknown as Record<string, unknown>, 'labour', derived.quantity))
  );
}

console.log(
  failures === 0
    ? '\n✅ time allowance: all checks passed\n'
    : `\n❌ time allowance: ${failures} check(s) failed\n`
);
process.exitCode = failures === 0 ? 0 : 1;
