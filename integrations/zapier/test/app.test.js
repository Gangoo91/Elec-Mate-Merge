'use strict';

// Offline checks with a fake z (no zapier-platform-core needed):
//   node --test integrations/zapier/test/app.test.js
const test = require('node:test');
const assert = require('node:assert');
const newJob = require('../triggers/newJob');
const invoicePaid = require('../triggers/invoicePaid');
const findCustomer = require('../searches/findCustomer');
const { addApiKey } = require('../base');

const now = Date.now();
const iso = (msAgo) => new Date(now - msAgo).toISOString();
const fakeZ = (pages) => {
  const calls = [];
  return {
    calls,
    request: async (opts) => {
      calls.push(opts);
      const resource = opts.url.split('/').pop();
      const offset = (opts.params && opts.params.offset) || 0;
      const page = (pages[resource] || [])[offset ? 1 : 0] || { data: [], next_offset: null };
      return { status: 200, json: page };
    },
  };
};

test('the key goes in the Authorization header', () => {
  const r = addApiKey({ url: 'x' }, null, { authData: { api_key: 'emf_abc' } });
  assert.strictEqual(r.headers.Authorization, 'Bearer emf_abc');
});

test('New Job: only jobs created in the window, newest first, across pages', async () => {
  const z = fakeZ({
    jobs: [
      {
        data: [
          { id: 'old', created_at: iso(30 * 86400000) },
          { id: 'a', created_at: iso(3 * 86400000) },
        ],
        next_offset: 500,
      },
      { data: [{ id: 'b', created_at: iso(3600000) }], next_offset: null },
    ],
  });
  const out = await newJob.operation.perform(z, {});
  assert.deepStrictEqual(
    out.map((j) => j.id),
    ['b', 'a']
  );
  assert.ok(z.calls[0].params.since);
});

test('Invoice Paid: only paid invoices paid in the window', async () => {
  const z = fakeZ({
    invoices: [
      {
        data: [
          { id: 'sent', status: 'sent', paid_at: null },
          { id: 'paid-old', status: 'paid', paid_at: iso(20 * 86400000) },
          { id: 'paid', status: 'paid', paid_at: iso(3600000) },
        ],
        next_offset: null,
      },
    ],
  });
  const out = await invoicePaid.operation.perform(z, {});
  assert.deepStrictEqual(
    out.map((i) => i.id),
    ['paid']
  );
});

test('Find Customer: by email, phone (any format) or part of the name', async () => {
  const data = [
    { id: '1', name: 'Helen Marsh', email: 'helen@example.com', phone: '07700 900123' },
    { id: '2', name: 'Tom Brennan', email: 'tom@example.com', phone: '+44 7700 900456' },
  ];
  const run = async (query) =>
    (
      await findCustomer.operation.perform(fakeZ({ customers: [{ data, next_offset: null }] }), {
        inputData: { query },
      })
    ).map((c) => c.id);
  assert.deepStrictEqual(await run('HELEN@example.com'), ['1']);
  assert.deepStrictEqual(await run('07700900456'), ['2']);
  assert.deepStrictEqual(await run('marsh'), ['1']);
  assert.deepStrictEqual(await run(''), []);
});
