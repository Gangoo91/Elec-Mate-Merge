'use strict';

const { BASE_URL } = require('./base');

// The owner makes a key in Elec-Mate: Settings, Integrations and API, API keys.
module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'api_key',
      label: 'API key',
      required: true,
      type: 'password',
      helpText:
        'In Elec-Mate, the firm owner opens Settings, Integrations and API, and creates a key. It starts emf_ and is shown once. Tick the things this Zap needs to read (jobs, customers, invoices).',
    },
  ],
  // GET /v1 answers with what the key can read.
  test: { url: `${BASE_URL}` },
  connectionLabel: (z, bundle) => {
    const scopes = (bundle.inputData && bundle.inputData.scopes) || [];
    return scopes.length ? `Elec-Mate (${scopes.join(', ')})` : 'Elec-Mate';
  },
};
