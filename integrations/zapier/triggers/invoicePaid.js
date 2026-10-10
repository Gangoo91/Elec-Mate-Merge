'use strict';

const { recentRows } = require('../base');

// Polling trigger: invoices that became paid in the last 7 days. Zapier
// dedupes on `id`, so each invoice fires once, when it is first seen paid.
const perform = async (z) => {
  const since = Date.now() - 7 * 86400000;
  const rows = await recentRows(z, 'invoices', 7);
  return rows
    .filter((i) => i.status === 'paid' && i.paid_at && Date.parse(i.paid_at) >= since)
    .sort((a, b) => Date.parse(b.paid_at) - Date.parse(a.paid_at));
};

module.exports = {
  key: 'invoice_paid',
  noun: 'Invoice',
  display: {
    label: 'Invoice Paid',
    description: 'Triggers when an invoice in Elec-Mate is marked paid.',
  },
  operation: {
    perform,
    sample: {
      id: '5b2a9e40-2222-4c3d-8e4f-000000000003',
      invoice_number: 'INV-0042',
      quote_number: 'Q-0042',
      customer_id: '0c7845b5-0000-4000-8000-000000000002',
      job_id: '7f0d3c1e-1111-4a2b-9c3d-000000000001',
      client_name: 'Helen Marsh',
      status: 'paid',
      invoice_date: '2026-10-01',
      due_date: '2026-10-31',
      sent_at: '2026-10-01T10:00:00Z',
      paid_at: '2026-10-09T15:30:00Z',
      subtotal: 1200,
      vat_amount: 240,
      total: 1440,
      total_paid: 1440,
      created_at: '2026-10-01T09:55:00Z',
      updated_at: '2026-10-09T15:30:00Z',
    },
    outputFields: [
      { key: 'id', label: 'Invoice ID' },
      { key: 'invoice_number', label: 'Invoice number' },
      { key: 'client_name', label: 'Client' },
      { key: 'total', label: 'Total (GBP)', type: 'number' },
      { key: 'total_paid', label: 'Paid (GBP)', type: 'number' },
      { key: 'paid_at', label: 'Paid at' },
      { key: 'job_id', label: 'Job ID' },
    ],
  },
};
