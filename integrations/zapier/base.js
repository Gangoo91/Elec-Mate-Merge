'use strict';

// The firm API (supabase/functions/firm-api). Read-only; one key = one firm.
const BASE_URL =
  process.env.ELECMATE_API_BASE ||
  'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/firm-api/v1';

/** Every request carries the firm's key. */
const addApiKey = (request, z, bundle) => {
  request.headers = request.headers || {};
  request.headers.Authorization = `Bearer ${bundle.authData.api_key}`;
  request.headers.Accept = 'application/json';
  return request;
};

/** Turn the API's { error: { code, message } } into a message Zapier shows. */
const handleErrors = (response, z) => {
  if (response.status === 401) {
    throw new z.errors.Error(
      'Elec-Mate did not accept the API key. Check it, or make a new one in Settings, Integrations and API.',
      'AuthenticationError',
      401
    );
  }
  if (response.status === 403) {
    const msg =
      (response.json && response.json.error && response.json.error.message) ||
      'This key cannot read that.';
    throw new z.errors.Error(msg, 'Forbidden', 403);
  }
  if (response.status === 429) {
    throw new z.errors.ThrottledError('Elec-Mate rate limit reached for this key.', 60);
  }
  if (response.status >= 400) {
    throw new z.errors.Error(`Elec-Mate returned ${response.status}`, 'ApiError', response.status);
  }
  return response;
};

/**
 * Rows changed in the last `days`, newest first. The API returns oldest
 * change first, so read every page in the window and reverse.
 */
const recentRows = async (z, resource, days, maxPages = 5) => {
  const since = new Date(Date.now() - days * 86400000).toISOString();
  let offset = 0;
  let rows = [];
  for (let i = 0; i < maxPages; i++) {
    const response = await z.request({
      url: `${BASE_URL}/${resource}`,
      params: { since, limit: 500, offset },
    });
    const body = response.json;
    rows = rows.concat(body.data || []);
    if (body.next_offset == null) break;
    offset = body.next_offset;
  }
  return rows.reverse();
};

module.exports = { BASE_URL, addApiKey, handleErrors, recentRows };
