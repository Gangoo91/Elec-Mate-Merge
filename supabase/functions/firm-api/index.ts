/**
 * firm-api: the Elec-Mate read API for firms (ELE-2077).
 *
 *   GET /functions/v1/firm-api/v1                 what this key can read
 *   GET /functions/v1/firm-api/v1/<resource>      rows, oldest change first
 *       ?since=<ISO 8601>   only rows changed after this time
 *       ?limit=<1..500>     page size (default 100)
 *       ?offset=<n>         page start (use next_offset from the last page)
 *
 *   Authorization: Bearer emf_<48 hex>     (or X-Api-Key: emf_...)
 *
 * Resources: jobs, customers, quotes, invoices, timesheets, certificates.
 *
 * Keys are minted by the firm OWNER in Settings › Developers
 * (public.firm_api_key_mint), carry resource scopes and a per-minute limit,
 * and can be revoked at any time. Only the SHA-256 of a key is stored: this
 * function hashes what it is sent and looks the hash up. The firm comes from
 * the key row, never from the request, and every read goes through
 * public._firm_api_read(p_firm, ...) where each query is pinned to that firm.
 * So a key can only ever read its own firm.
 *
 * The key is never logged. Not wrapped in withSentry (it reports headers).
 * Every call by a known key is written to firm_api_access_log; the rate limit
 * counts from there. Read-only by design. Deploy with --no-verify-jwt.
 * NOT DEPLOYED.
 */
import { createClient } from '../_shared/deps.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const KEY_RE = /^emf_[0-9a-f]{48}$/;
const MAX_LIMIT = 500;

export const RESOURCES = [
  'jobs',
  'customers',
  'quotes',
  'invoices',
  'timesheets',
  'certificates',
] as const;
type Resource = (typeof RESOURCES)[number];

const HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-api-key, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Cache-Control': 'no-store',
};

const json = (status: number, body: unknown, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { ...HEADERS, 'Content-Type': 'application/json; charset=utf-8', ...extra },
  });
const problem = (
  status: number,
  code: string,
  message: string,
  extra: Record<string, string> = {}
) => json(status, { error: { code, message } }, extra);

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

Deno.serve(async (req) => {
  try {
    return await handle(req);
  } catch (e) {
    console.error('firm-api: unhandled', (e as Error).message);
    return problem(500, 'server_error', 'Something went wrong. Try again shortly.');
  }
});

async function handle(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: HEADERS });
  if (req.method !== 'GET')
    return problem(405, 'method_not_allowed', 'This API is read-only. Use GET.');

  const url = new URL(req.url);
  const parts = url.pathname.split('/').filter(Boolean);
  const at = parts.indexOf('firm-api');
  const route = at >= 0 ? parts.slice(at + 1) : parts;
  if (route[0] !== 'v1') return problem(404, 'not_found', 'Use /v1 or /v1/<resource>.');
  const resource = route[1] ?? null;

  const auth = req.headers.get('authorization') ?? '';
  const raw = (
    auth.toLowerCase().startsWith('bearer ') ? auth.slice(7) : (req.headers.get('x-api-key') ?? '')
  ).trim();
  if (!KEY_RE.test(raw)) {
    return problem(
      401,
      'unauthorised',
      'Send an Elec-Mate API key as "Authorization: Bearer emf_...".'
    );
  }

  const db = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
  const { data: key, error: keyErr } = await db
    .from('firm_api_keys')
    .select('id, firm_id, scopes, rate_limit_per_minute, revoked_at, expires_at')
    .eq('key_hash', await sha256Hex(raw))
    .maybeSingle();
  if (keyErr) {
    console.error('firm-api: key lookup failed', keyErr.message);
    return problem(500, 'server_error', 'Something went wrong. Try again shortly.');
  }
  if (!key) return problem(401, 'unauthorised', 'That API key is not recognised.');

  // L5/L7: Cloudflare's header first; the first x-forwarded-for entry is
  // whatever the caller sent.
  const ip = (
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-real-ip') ??
    (req.headers.get('x-forwarded-for') ?? '').split(',')[0]
  ).trim();
  const ipHash = ip ? (await sha256Hex(`${SERVICE_KEY.slice(-16)}|${ip}`)).slice(0, 32) : null;
  const log = async (status: number, rows: number | null, detail?: string) => {
    const { error } = await db.from('firm_api_access_log').insert({
      firm_id: key.firm_id,
      key_id: key.id,
      resource,
      status_code: status,
      row_count: rows,
      detail: detail ?? null,
      ip_hash: ipHash,
    });
    if (error) console.error('firm-api: log write failed', key.id, error.message);
  };

  if (key.revoked_at) {
    await log(401, null, 'revoked');
    return problem(401, 'revoked', 'This API key has been revoked.');
  }
  if (key.expires_at && new Date(key.expires_at) < new Date()) {
    await log(401, null, 'expired');
    return problem(401, 'expired', 'This API key has expired.');
  }
  // L7: a key only works while its firm is an Employer account.
  const { data: isEmployer, error: planErr } = await db.rpc('is_employer_account', {
    p_user: key.firm_id,
  });
  if (planErr) {
    console.error('firm-api: plan check failed', key.id, planErr.message);
    return problem(500, 'server_error', 'Something went wrong. Try again shortly.');
  }
  if (isEmployer !== true) {
    await log(403, null, 'not_employer');
    return problem(
      403,
      'forbidden',
      'This firm no longer has an Employer plan, so its API keys do not work.'
    );
  }

  const { count } = await db
    .from('firm_api_access_log')
    .select('id', { count: 'exact', head: true })
    .eq('key_id', key.id)
    .gte('created_at', new Date(Date.now() - 60_000).toISOString());
  if ((count ?? 0) >= key.rate_limit_per_minute) {
    await log(429, null, 'rate_limited');
    return problem(
      429,
      'rate_limited',
      `This key allows ${key.rate_limit_per_minute} calls a minute.`,
      {
        'Retry-After': '60',
      }
    );
  }
  await db
    .from('firm_api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', key.id);

  if (!resource) {
    await log(200, null, 'index');
    return json(200, {
      api: 'Elec-Mate firm API',
      version: 'v1',
      scopes: key.scopes,
      rate_limit_per_minute: key.rate_limit_per_minute,
      resources: Object.fromEntries(
        RESOURCES.filter((r) => key.scopes.includes(r)).map((r) => [r, { path: `/v1/${r}` }])
      ),
    });
  }

  if (!(RESOURCES as readonly string[]).includes(resource)) {
    await log(404, null, 'unknown_resource');
    return problem(404, 'unknown_resource', `Resources: ${RESOURCES.join(', ')}.`);
  }
  if (!key.scopes.includes(resource)) {
    await log(403, null, 'out_of_scope');
    return problem(
      403,
      'forbidden',
      `This key cannot read "${resource}". Its scopes: ${key.scopes.join(', ')}.`
    );
  }

  let since: string | null = null;
  const sinceParam = url.searchParams.get('since');
  if (sinceParam) {
    const d = new Date(sinceParam);
    if (Number.isNaN(d.getTime())) {
      await log(400, null, 'bad_since');
      return problem(400, 'bad_request', '"since" must be an ISO 8601 date or date-time.');
    }
    since = d.toISOString();
  }
  const limit = Math.min(
    Math.max(parseInt(url.searchParams.get('limit') ?? '100', 10) || 100, 1),
    MAX_LIMIT
  );
  const offset = Math.max(parseInt(url.searchParams.get('offset') ?? '0', 10) || 0, 0);

  const { data, error } = await db.rpc('_firm_api_read', {
    p_firm: key.firm_id,
    p_resource: resource as Resource,
    p_since: since,
    p_limit: limit,
    p_offset: offset,
  });
  if (error) {
    console.error('firm-api: query failed', key.id, resource, error.message);
    await log(500, null, 'query_failed');
    return problem(500, 'server_error', 'Something went wrong. Try again shortly.');
  }
  const rows = (data ?? []) as Record<string, unknown>[];
  await log(200, rows.length);
  return json(200, {
    resource,
    since,
    limit,
    offset,
    count: rows.length,
    next_offset: rows.length === limit ? offset + limit : null,
    generated_at: new Date().toISOString(),
    data: rows,
  });
}
