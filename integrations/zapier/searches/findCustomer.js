'use strict';

const { BASE_URL } = require('../base');

// Search action: find a customer by email, phone or name. The API is
// read-only today, so the Zapier app's actions are searches; create/update
// actions need a write scope on the API first (see docs/firm-api.md).
const digits = (s) =>
  String(s || '')
    .replace(/\D/g, '')
    .replace(/^44/, '0');

const perform = async (z, bundle) => {
  const q = String(bundle.inputData.query || '')
    .trim()
    .toLowerCase();
  if (!q) return [];
  const qDigits = digits(q);
  const hits = [];
  let offset = 0;
  for (let i = 0; i < 10; i++) {
    const response = await z.request({
      url: `${BASE_URL}/customers`,
      params: { limit: 500, offset },
    });
    const body = response.json;
    for (const c of body.data || []) {
      const email = String(c.email || '').toLowerCase();
      const name = `${c.name || ''} ${c.company_name || ''}`.toLowerCase();
      if (
        (q.includes('@') && email === q) ||
        (qDigits.length >= 6 && digits(c.phone) === qDigits) ||
        (!q.includes('@') && name.includes(q))
      ) {
        hits.push(c);
      }
    }
    if (body.next_offset == null || hits.length >= 10) break;
    offset = body.next_offset;
  }
  return hits.slice(0, 10);
};

module.exports = {
  key: 'find_customer',
  noun: 'Customer',
  display: {
    label: 'Find Customer',
    description: 'Finds a customer in Elec-Mate by email, phone or name.',
  },
  operation: {
    inputFields: [
      {
        key: 'query',
        label: 'Email, phone or name',
        required: true,
        helpText: 'An exact email or phone number, or part of the name.',
      },
    ],
    perform,
    sample: {
      id: '0c7845b5-0000-4000-8000-000000000002',
      name: 'Helen Marsh',
      company_name: null,
      email: 'helen@example.com',
      phone: '07700 900123',
      address: '12 Mill Lane, Halifax',
      postcode: 'HX1 1AA',
      tags: [],
      status: 'active',
      created_at: '2026-09-01T09:00:00Z',
      updated_at: '2026-10-01T09:00:00Z',
    },
    outputFields: [
      { key: 'id', label: 'Customer ID' },
      { key: 'name', label: 'Name' },
      { key: 'company_name', label: 'Company' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'postcode', label: 'Postcode' },
    ],
  },
};
