'use strict';

// Elec-Mate on Zapier (ELE-2077). Publishing needs Andrew: see docs/firm-api.md.
const { version } = require('./package.json');
const { version: platformVersion } = require('zapier-platform-core');

const authentication = require('./authentication');
const { addApiKey, handleErrors } = require('./base');
const newJob = require('./triggers/newJob');
const invoicePaid = require('./triggers/invoicePaid');
const findCustomer = require('./searches/findCustomer');

module.exports = {
  version,
  platformVersion,
  authentication,
  beforeRequest: [addApiKey],
  afterResponse: [handleErrors],
  triggers: {
    [newJob.key]: newJob,
    [invoicePaid.key]: invoicePaid,
  },
  searches: {
    [findCustomer.key]: findCustomer,
  },
  creates: {},
};
