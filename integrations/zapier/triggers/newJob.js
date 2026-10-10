'use strict';

const { recentRows } = require('../base');

// Polling trigger: jobs created in the last 7 days, newest first. Zapier
// dedupes on `id`, so each job fires once.
const perform = async (z) => {
  const since = Date.now() - 7 * 86400000;
  const rows = await recentRows(z, 'jobs', 7);
  return rows
    .filter((j) => Date.parse(j.created_at) >= since)
    .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
};

module.exports = {
  key: 'new_job',
  noun: 'Job',
  display: {
    label: 'New Job',
    description: 'Triggers when a job is created in Elec-Mate.',
  },
  operation: {
    perform,
    sample: {
      id: '7f0d3c1e-1111-4a2b-9c3d-000000000001',
      title: 'Consumer unit change',
      client: 'Helen Marsh',
      customer_id: '0c7845b5-0000-4000-8000-000000000002',
      location: '12 Mill Lane, Halifax HX1 1AA',
      status: 'Active',
      stage: 'booked',
      job_type: 'Domestic',
      start_date: '2026-10-14',
      end_date: '2026-10-14',
      completed_at: null,
      archived_at: null,
      created_at: '2026-10-10T09:00:00Z',
      updated_at: '2026-10-10T09:00:00Z',
    },
    outputFields: [
      { key: 'id', label: 'Job ID' },
      { key: 'title', label: 'Title' },
      { key: 'client', label: 'Client' },
      { key: 'customer_id', label: 'Customer ID' },
      { key: 'location', label: 'Location' },
      { key: 'status', label: 'Status' },
      { key: 'stage', label: 'Board stage' },
      { key: 'start_date', label: 'Start date' },
      { key: 'end_date', label: 'End date' },
      { key: 'created_at', label: 'Created at' },
    ],
  },
};
