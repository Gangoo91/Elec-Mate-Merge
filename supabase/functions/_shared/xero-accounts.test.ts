/**
 * ELE-1703 — picking the org's reverse-charge SALES tax type.
 *
 * The exact `TaxType` string behind a DRC rate is not documented publicly and
 * is not the same in every organisation, which is the whole reason this is a
 * lookup rather than a constant. These fixtures therefore mirror the SHAPE of
 * a Xero /TaxRates response, and every assertion is about behaviour — which
 * rate gets chosen and which are refused — never about a literal code.
 */
import {
  assert,
  assertEquals,
  assertStringIncludes,
} from 'https://deno.land/std@0.208.0/assert/mod.ts';
import {
  pickReverseChargeSalesTaxType,
  resolveXeroReverseChargeTaxType,
  type XeroTaxRate,
} from './xero-accounts.ts';

const rate = (p: Partial<XeroTaxRate>): XeroTaxRate => ({
  name: '',
  taxType: '',
  status: 'ACTIVE',
  canApplyToRevenue: false,
  effectiveRate: 0,
  ...p,
});

/** A UK construction org with the DRC rates switched on. */
const UK_CONSTRUCTION: XeroTaxRate[] = [
  rate({
    name: '20% (VAT on Income)',
    taxType: 'OUTPUT2',
    canApplyToRevenue: true,
    effectiveRate: 20,
  }),
  rate({ name: '20% (VAT on Expenses)', taxType: 'INPUT2', effectiveRate: 20 }),
  rate({ name: 'No VAT', taxType: 'NONE', canApplyToRevenue: true }),
  rate({ name: 'Zero Rated Income', taxType: 'ZERORATEDOUTPUT', canApplyToRevenue: true }),
  rate({
    name: 'Domestic Reverse Charge @ 20% (VAT on Income)',
    taxType: 'DRCHARGESUPPLY20',
    canApplyToRevenue: true,
    effectiveRate: 0,
  }),
  rate({
    name: 'Domestic Reverse Charge @ 20% (VAT on Expenses)',
    taxType: 'DRCHARGE20',
    canApplyToRevenue: false,
    effectiveRate: 20,
  }),
  rate({ name: 'Reverse Charge Expenses (20%)', taxType: 'REVERSECHARGES', effectiveRate: 20 }),
];

Deno.test('picks the income-side DRC rate, not the expense one', () => {
  assertEquals(pickReverseChargeSalesTaxType(UK_CONSTRUCTION), 'DRCHARGESUPPLY20');
});

Deno.test('never picks an expense rate even when it is the only reverse-charge rate', () => {
  // Putting input tax on a sales invoice would claim VAT back rather than
  // report it — a worse error than the 'NONE' this feature replaces.
  const expensesOnly = UK_CONSTRUCTION.filter((r) => !r.canApplyToRevenue);
  assertEquals(pickReverseChargeSalesTaxType(expensesOnly), null);
});

Deno.test('ignores a deleted or archived DRC rate', () => {
  const archived = UK_CONSTRUCTION.map((r) =>
    r.taxType === 'DRCHARGESUPPLY20' ? { ...r, status: 'DELETED' } : r
  );
  assertEquals(pickReverseChargeSalesTaxType(archived), null);
});

Deno.test('status is matched case-insensitively', () => {
  const lower = UK_CONSTRUCTION.map((r) => ({ ...r, status: 'Active' }));
  assertEquals(pickReverseChargeSalesTaxType(lower), 'DRCHARGESUPPLY20');
});

Deno.test('an org without the DRC rates enabled resolves to null', () => {
  // The caller must fall back to today's behaviour here, not fail the sync.
  const plain = UK_CONSTRUCTION.filter((r) => !/reverse/i.test(r.name));
  assertEquals(pickReverseChargeSalesTaxType(plain), null);
});

Deno.test('takes the 0% rate and not a rated one sitting beside it', () => {
  const both: XeroTaxRate[] = [
    rate({
      name: 'Reverse Charge Income (20%)',
      taxType: 'RATED',
      canApplyToRevenue: true,
      effectiveRate: 20,
    }),
    rate({
      name: 'Domestic Reverse Charge @ 20% (VAT on Income)',
      taxType: 'ZERO',
      canApplyToRevenue: true,
      effectiveRate: 0,
    }),
  ];
  assertEquals(pickReverseChargeSalesTaxType(both), 'ZERO');
});

Deno.test('refuses a rated reverse-charge rate when there is no 0% one', () => {
  // The invoice being posted carries zero VAT. A rate with a rate on it would
  // have Xero compute tax the customer was never charged and land on a total
  // they were never shown — worse than posting the old way.
  const ratedOnly: XeroTaxRate[] = [
    rate({
      name: 'Reverse Charge Income (20%)',
      taxType: 'RATED',
      canApplyToRevenue: true,
      effectiveRate: 20,
    }),
  ];
  assertEquals(pickReverseChargeSalesTaxType(ratedOnly), null);
});

Deno.test('an unparseable EffectiveRate is not treated as 0%', () => {
  // 0 is the one value that means "this is the DRC rate", so a rate we could
  // not read must never default into it.
  const unreadable: XeroTaxRate[] = [
    rate({
      name: 'Domestic Reverse Charge @ 20% (VAT on Income)',
      taxType: 'X',
      canApplyToRevenue: true,
      effectiveRate: NaN,
    }),
  ];
  assertEquals(pickReverseChargeSalesTaxType(unreadable), null);
});

Deno.test('tolerates "Reverse charge" spelled with any spacing or case', () => {
  const odd: XeroTaxRate[] = [
    rate({
      name: 'DOMESTIC REVERSECHARGE 20% Income',
      taxType: 'X',
      canApplyToRevenue: true,
      effectiveRate: 0,
    }),
  ];
  assertEquals(pickReverseChargeSalesTaxType(odd), 'X');
});

Deno.test('refuses a matching rate that carries no TaxType', () => {
  const blank: XeroTaxRate[] = [
    rate({
      name: 'Domestic Reverse Charge @ 20% (VAT on Income)',
      taxType: '',
      canApplyToRevenue: true,
      effectiveRate: 0,
    }),
  ];
  assertEquals(pickReverseChargeSalesTaxType(blank), null);
});

Deno.test('an empty rate list resolves to null', () => {
  assertEquals(pickReverseChargeSalesTaxType([]), null);
});

/* ── Fail-safe behaviour ────────────────────────────────────────────────── */

/**
 * Minimal stand-in for the query chain `resolveXeroReverseChargeTaxType` uses.
 *
 * `update()` returns a thenable that resolves to `{ error }` rather than
 * throwing, because that is what the real client does — a stub that threw
 * would let a missing `error` check pass.
 */
function stubSupabase(
  stored: Record<string, unknown> | null,
  opts: { onUpdate?: (v: unknown) => void; updateError?: unknown } = {}
) {
  const chain = {
    select: () => chain,
    eq: () => chain,
    maybeSingle: () =>
      Promise.resolve({ data: stored ? { account_settings: stored } : null, error: null }),
    update: (v: unknown) => {
      opts.onUpdate?.(v);
      return {
        eq: () => updateResult,
      };
    },
  };
  const updateResult = {
    eq: () => updateResult,
    then: (resolve: (v: { error: unknown }) => void) =>
      Promise.resolve({ error: opts.updateError ?? null }).then(resolve),
  };
  return { from: () => chain };
}

function withFetch<T>(impl: typeof fetch, run: () => Promise<T>): Promise<T> {
  const original = globalThis.fetch;
  globalThis.fetch = impl;
  return run().finally(() => {
    globalThis.fetch = original;
  });
}

const ratesResponse = (rates: unknown[]) =>
  new Response(JSON.stringify({ TaxRates: rates }), { status: 200 });

Deno.test('a 403 from Xero reports lookup-failed, never not-offered', async () => {
  // The likeliest cause is our own OAuth scopes. Reporting it as "your org has
  // no reverse-charge rate" would send an electrician hunting for a setting
  // that is already switched on.
  const result = await withFetch(
    () => Promise.resolve(new Response('AuthorizationUnsuccessful', { status: 403 })),
    () => resolveXeroReverseChargeTaxType(stubSupabase({}), 'u1', 'tok', 'ten')
  );
  // `assert` rather than `assertEquals` so the union narrows and `detail`
  // is reachable — `taxType` is `string` on the success member, so a plain
  // equality check tells the compiler nothing.
  assert(result.taxType === null);
  assertEquals(result.reason, 'lookup-failed');
  // The detail is what a human reads in Sentry. A bare "403" would send
  // someone looking at the customer's Xero settings; the hint points at the
  // real cause, which is a connection made before the scope was requested.
  assertStringIncludes(result.detail ?? '', 'reconnected');
});

Deno.test('a network failure resolves to null rather than throwing', async () => {
  // A sync must never fail because a tax-rate lookup did.
  const result = await withFetch(
    () => Promise.reject(new Error('connection reset')),
    () => resolveXeroReverseChargeTaxType(stubSupabase({}), 'u1', 'tok', 'ten')
  );
  assertEquals(result.taxType, null);
  assertEquals(result.reason, 'lookup-failed');
});

Deno.test('a stored value is returned without calling Xero at all', async () => {
  const result = await withFetch(
    () => Promise.reject(new Error('fetch should not have been called')),
    () =>
      resolveXeroReverseChargeTaxType(
        stubSupabase({ reverse_charge_tax_type: 'DRCHARGESUPPLY20' }),
        'u1',
        'tok',
        'ten'
      )
  );
  assertEquals(result.taxType, 'DRCHARGESUPPLY20');
  assertEquals(result.reason, 'stored');
});

Deno.test('a detected value is cached alongside the existing settings', async () => {
  // The sales account code (ELE-1744) lives in the same column and must survive.
  let written: unknown = null;
  const result = await withFetch(
    () =>
      Promise.resolve(
        ratesResponse([
          {
            Name: 'Domestic Reverse Charge @ 20% (VAT on Income)',
            TaxType: 'DRCHARGESUPPLY20',
            Status: 'ACTIVE',
            CanApplyToRevenue: true,
            EffectiveRate: 0,
          },
        ])
      ),
    () =>
      resolveXeroReverseChargeTaxType(
        stubSupabase({ sales_account_code: '001' }, { onUpdate: (v) => (written = v) }),
        'u1',
        'tok',
        'ten'
      )
  );
  assertEquals(result.taxType, 'DRCHARGESUPPLY20');
  assertEquals(result.reason, 'detected');
  assertEquals(written, {
    account_settings: { sales_account_code: '001', reverse_charge_tax_type: 'DRCHARGESUPPLY20' },
  });
});

Deno.test('an org with the rates switched off reports not-offered', async () => {
  const result = await withFetch(
    () =>
      Promise.resolve(
        ratesResponse([
          {
            Name: '20% (VAT on Income)',
            TaxType: 'OUTPUT2',
            Status: 'ACTIVE',
            CanApplyToRevenue: true,
            EffectiveRate: 20,
          },
        ])
      ),
    () => resolveXeroReverseChargeTaxType(stubSupabase({}), 'u1', 'tok', 'ten')
  );
  assertEquals(result.taxType, null);
  assertEquals(result.reason, 'not-offered');
});

Deno.test('a failed cache write still returns the answer', async () => {
  // Caching is an optimisation. Losing the detected tax type because we could
  // not remember it would put the invoice back on 'NONE' — the exact bug.
  const result = await withFetch(
    () =>
      Promise.resolve(
        ratesResponse([
          {
            Name: 'Domestic Reverse Charge @ 20% (VAT on Income)',
            TaxType: 'DRCHARGESUPPLY20',
            Status: 'ACTIVE',
            CanApplyToRevenue: true,
            EffectiveRate: 0,
          },
        ])
      ),
    () =>
      resolveXeroReverseChargeTaxType(
        stubSupabase({}, { updateError: { message: 'permission denied' } }),
        'u1',
        'tok',
        'ten'
      )
  );
  assertEquals(result.taxType, 'DRCHARGESUPPLY20');
  assertEquals(result.reason, 'detected');
});

Deno.test('EffectiveRate arriving as a string is still read as 0%', async () => {
  const result = await withFetch(
    () =>
      Promise.resolve(
        ratesResponse([
          {
            Name: 'Domestic Reverse Charge @ 20% (VAT on Income)',
            TaxType: 'DRCHARGESUPPLY20',
            Status: 'ACTIVE',
            CanApplyToRevenue: true,
            EffectiveRate: '0',
          },
        ])
      ),
    () => resolveXeroReverseChargeTaxType(stubSupabase({}), 'u1', 'tok', 'ten')
  );
  assertEquals(result.taxType, 'DRCHARGESUPPLY20');
});

Deno.test('a response with no TaxRates array reports not-offered, not a crash', async () => {
  const result = await withFetch(
    () => Promise.resolve(new Response(JSON.stringify({}), { status: 200 })),
    () => resolveXeroReverseChargeTaxType(stubSupabase({}), 'u1', 'tok', 'ten')
  );
  assertEquals(result.taxType, null);
  assertEquals(result.reason, 'not-offered');
});
