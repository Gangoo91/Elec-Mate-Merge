/**
 * college-data-api — the College Hub read API (ELE-1884, 10 Oct 2026).
 *
 *   GET /functions/v1/college-data-api/v1                 which datasets this key can read
 *   GET /functions/v1/college-data-api/v1/<dataset>       rows, oldest first
 *       ?since=<ISO 8601>   only rows changed since then
 *       ?limit=<1..1000>    page size (default 500)
 *       ?offset=<n>         page start (use next_offset from the last page)
 *       ?format=csv         CSV instead of JSON
 *
 *   Authorization: Bearer emk_<48 hex>      (or X-Api-Key: emk_...)
 *
 * Datasets: learners, hours, decisions, attendance, reviews, ilr, and (ELE-2057,
 * 10 Oct 2026) the reporting datasets learner_progress, learner_hours,
 * learner_reviews, learner_risk and learner_attendance: one row per learner, a
 * snapshot as at now (`since` is not applied), each unlocked by an existing
 * scope (see SCOPE_FOR), so a live key needs nothing new. Each key is
 * minted by a college admin in Data and API (public.college_api_key_mint),
 * belongs to ONE college, carries a list of dataset scopes and a per-minute
 * rate limit, and can be revoked at any time. The database stores only the
 * SHA-256 of the key; this function hashes what it is sent and looks the hash
 * up. The key is NEVER logged: not in console output, not in the access log
 * (which records the key id), and this function is deliberately not wrapped in
 * withSentry, because that wrapper reports request headers.
 *
 * Every call by a known key is written to public.college_data_access_log
 * (status, dataset, rows, a salted hash of the caller's IP). The rate limit is
 * counted from that log over the last 60 seconds.
 *
 * Read-only by design. Deployed --no-verify-jwt: an MIS has no Supabase JWT;
 * the API key is the credential.
 */

import { createClient } from '../_shared/deps.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const KEY_RE = /^emk_[0-9a-f]{48}$/;
const MAX_LIMIT = 1000;

/** The documented columns, in order. Mirrors src/lib/college/interchange.ts. */
export const DATASETS: Record<string, string[]> = {
  learners: [
    'learner_id',
    'learner_reference',
    'uln',
    'name',
    'email',
    'date_of_birth',
    'status',
    'cohort_code',
    'cohort_name',
    'course_code',
    'course_name',
    'qualification_code',
    'start_date',
    'planned_end_date',
    'actual_end_date',
    'employer_name',
    'otj_required_hours',
    'otj_verified_hours',
    'otj_app_learning_hours',
    'risk_level',
    'updated_at',
  ],
  hours: [
    'entry_id',
    'learner_id',
    'uln',
    'activity_date',
    'minutes',
    'hours',
    'activity_type',
    'title',
    'source',
    'verification_status',
    'verified_at',
    'attested_by_name',
    'in_working_hours',
    'iqa_verdict',
    'created_at',
    'updated_at',
  ],
  decisions: [
    'decision_id',
    'learner_id',
    'uln',
    'qualification_code',
    'unit_code',
    'ac_code',
    'decision',
    'method',
    'assessor_name',
    'decided_at',
    'evidence_count',
    'iqa_verdict',
    'iqa_at',
    'superseded_at',
    'content_hash',
  ],
  attendance: [
    'attendance_id',
    'learner_id',
    'uln',
    'date',
    'session',
    'status',
    'cohort_code',
    'recorded_at',
  ],
  reviews: [
    'review_id',
    'learner_id',
    'uln',
    'status',
    'scheduled_at',
    'held_on',
    'completed_at',
    'mode',
    'employer_attendance',
    'employer_contact_name',
    'signed_and_locked_at',
    'content_hash',
    'updated_at',
  ],
  ilr: [
    'UKPRN',
    'LearnRefNumber',
    'ULN',
    'FamilyName',
    'GivenNames',
    'DateOfBirth',
    'Sex',
    'Ethnicity',
    'LLDDHealthProb',
    'NINumber',
    'PriorLevel',
    'PostcodePrior',
    'Postcode',
    'LearnAimRef',
    'AimType',
    'ProgType',
    'StdCode',
    'FundModel',
    'LearnStartDate',
    'OrigLearnStartDate',
    'LearnPlanEndDate',
    'LearnActEndDate',
    'CompStatus',
    'Outcome',
    'WithdrawReason',
    'AchDate',
    'DelLocPostCode',
    'EPAOrgID',
    'EmpStat',
    'EmpId',
    'AgreemId',
    'HRS1_PlannedOTJHours',
    'HRS3_ActualOTJHours',
    'HRS4_PlannedReductionHours',
    'TNP1',
    'TNP2',
    'elecmate_verified_otj_hours',
    'elecmate_app_learning_hours',
    'elecmate_learner_id',
  ],
  // ELE-2057 reporting datasets (snapshots, one row per learner).
  learner_progress: [
    'learner_id',
    'uln',
    'qualification_code',
    'criteria_total',
    'criteria_not_started',
    'criteria_suggested',
    'criteria_claimed',
    'criteria_submitted',
    'criteria_referred',
    'criteria_not_yet',
    'criteria_passed',
    'criteria_iqa_confirmed',
    'criteria_iqa_rejected',
    'criteria_achieved',
    'achieved_percent',
    'as_at',
  ],
  learner_hours: [
    'learner_id',
    'uln',
    'planned_otj_hours',
    'verified_hours',
    'college_verified_hours',
    'employer_verified_hours',
    'pending_hours',
    'rejected_hours',
    'app_learning_hours',
    'verified_percent_of_planned',
    'start_date',
    'planned_end_date',
    'expected_hours_to_date',
    'hours_ahead_or_behind',
    'as_at',
  ],
  learner_reviews: [
    'learner_id',
    'uln',
    'reviews_apply',
    'review_frequency_months',
    'reviews_completed',
    'last_review_on',
    'next_review_scheduled_at',
    'review_due_by',
    'review_overdue',
    'awaiting_signatures',
    'as_at',
  ],
  learner_risk: [
    'learner_id',
    'uln',
    'risk_level',
    'risk_score',
    'risk_factors',
    'risk_computed_at',
    'as_at',
  ],
  learner_attendance: [
    'learner_id',
    'uln',
    'sessions_marked',
    'present',
    'late',
    'absent',
    'authorised',
    'attendance_percent',
    'attendance_percent_last_30_days',
    'last_marked_on',
    'as_at',
  ],
};

/** The key scope that unlocks each dataset. Mirrors `scope` in src/lib/college/interchange.ts. */
export const SCOPE_FOR: Record<string, string> = {
  learners: 'learners',
  hours: 'hours',
  decisions: 'decisions',
  attendance: 'attendance',
  reviews: 'reviews',
  ilr: 'ilr',
  learner_progress: 'decisions',
  learner_hours: 'hours',
  learner_reviews: 'reviews',
  learner_risk: 'learners',
  learner_attendance: 'attendance',
};
const REPORTING = new Set([
  'learner_progress',
  'learner_hours',
  'learner_reviews',
  'learner_risk',
  'learner_attendance',
]);

const HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-api-key, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Cache-Control': 'no-store',
};

function json(status: number, body: unknown, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { ...HEADERS, 'Content-Type': 'application/json; charset=utf-8', ...extra },
  });
}

function problem(
  status: number,
  code: string,
  message: string,
  extra: Record<string, string> = {}
) {
  return json(status, { error: { code, message } }, extra);
}

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function csvCell(v: unknown): string {
  if (v === null || v === undefined) return '';
  const s = typeof v === 'object' ? JSON.stringify(v) : String(v);
  // Guard against spreadsheet formula injection, then quote.
  const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
  return /[",\r\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

function toCsv(columns: string[], rows: Record<string, unknown>[]): string {
  const lines = [columns.join(',')];
  for (const r of rows) lines.push(columns.map((c) => csvCell(r[c])).join(','));
  return lines.join('\r\n') + '\r\n';
}

Deno.serve(async (req) => {
  try {
    return await handle(req);
  } catch (e) {
    // Never echo the request (it carries the key); log the message only.
    console.error('college-data-api: unhandled', (e as Error).message);
    return problem(500, 'server_error', 'Something went wrong. Try again shortly.');
  }
});

async function handle(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: HEADERS });
  if (req.method !== 'GET')
    return problem(405, 'method_not_allowed', 'This API is read-only. Use GET.');

  const url = new URL(req.url);
  const parts = url.pathname.split('/').filter(Boolean);
  const at = parts.indexOf('college-data-api');
  const route = at >= 0 ? parts.slice(at + 1) : parts;
  if (route[0] !== 'v1') return problem(404, 'not_found', 'Use /v1 or /v1/<dataset>.');
  const dataset = route[1] ?? null;

  // The key: Bearer header or X-Api-Key. Never logged.
  const auth = req.headers.get('authorization') ?? '';
  const raw = (
    auth.toLowerCase().startsWith('bearer ') ? auth.slice(7) : (req.headers.get('x-api-key') ?? '')
  ).trim();
  if (!KEY_RE.test(raw))
    return problem(
      401,
      'unauthorised',
      'Send a College Hub API key as "Authorization: Bearer emk_...".'
    );

  const db = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
  const hash = await sha256Hex(raw);
  const { data: key, error: keyErr } = await db
    .from('college_api_keys')
    .select('id, college_id, scopes, rate_limit_per_minute, revoked_at, expires_at')
    .eq('key_hash', hash)
    .maybeSingle();
  if (keyErr) {
    console.error('college-data-api: key lookup failed', keyErr.message);
    return problem(500, 'server_error', 'Something went wrong. Try again shortly.');
  }
  if (!key) return problem(401, 'unauthorised', 'That API key is not recognised.');

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim();
  const ipHash = ip ? (await sha256Hex(`${SERVICE_KEY.slice(-16)}|${ip}`)).slice(0, 32) : null;
  const log = async (status: number, rows: number | null, detail?: string) => {
    const { error } = await db.from('college_data_access_log').insert({
      college_id: key.college_id,
      key_id: key.id,
      channel: 'api',
      dataset,
      status_code: status,
      row_count: rows,
      detail: detail ?? null,
      ip_hash: ipHash,
    });
    if (error) console.error('college-data-api: log write failed', key.id, error.message);
  };

  if (key.revoked_at) {
    await log(401, null, 'revoked');
    return problem(401, 'revoked', 'This API key has been revoked by the college.');
  }
  if (key.expires_at && new Date(key.expires_at) < new Date()) {
    await log(401, null, 'expired');
    return problem(401, 'expired', 'This API key has expired.');
  }

  // Rate limit: calls by this key in the last 60 seconds.
  const since60 = new Date(Date.now() - 60_000).toISOString();
  const { count } = await db
    .from('college_data_access_log')
    .select('id', { count: 'exact', head: true })
    .eq('key_id', key.id)
    .gte('created_at', since60);
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
    .from('college_api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', key.id);

  if (!dataset) {
    await log(200, null, 'index');
    return json(200, {
      api: 'Elec-Mate College Hub read API',
      version: 'v1',
      college_id: key.college_id,
      scopes: key.scopes,
      rate_limit_per_minute: key.rate_limit_per_minute,
      datasets: Object.fromEntries(
        Object.entries(DATASETS)
          .filter(([d]) => key.scopes.includes(SCOPE_FOR[d]))
          .map(([d, cols]) => [
            d,
            { path: `/v1/${d}`, columns: cols, scope: SCOPE_FOR[d], snapshot: REPORTING.has(d) },
          ])
      ),
    });
  }

  if (!DATASETS[dataset]) {
    await log(404, null, 'unknown_dataset');
    return problem(404, 'unknown_dataset', `Datasets: ${Object.keys(DATASETS).join(', ')}.`);
  }
  if (!key.scopes.includes(SCOPE_FOR[dataset])) {
    await log(403, null, 'out_of_scope');
    return problem(
      403,
      'forbidden',
      `This key cannot read "${dataset}" (it needs the "${SCOPE_FOR[dataset]}" scope). Its scopes: ${key.scopes.join(', ')}.`
    );
  }

  const sinceParam = url.searchParams.get('since');
  let since: string | null = null;
  if (sinceParam) {
    const d = new Date(sinceParam);
    if (Number.isNaN(d.getTime())) {
      await log(400, null, 'bad_since');
      return problem(400, 'bad_request', '"since" must be an ISO 8601 date or date-time.');
    }
    since = d.toISOString();
  }
  const limit = Math.min(
    Math.max(parseInt(url.searchParams.get('limit') ?? '500', 10) || 500, 1),
    MAX_LIMIT
  );
  const offset = Math.max(parseInt(url.searchParams.get('offset') ?? '0', 10) || 0, 0);

  const { data, error } = await db.rpc('_college_interchange', {
    p_college: key.college_id,
    p_dataset: dataset,
    p_since: since,
    p_limit: limit,
    p_offset: offset,
  });
  if (error) {
    console.error('college-data-api: query failed', key.id, dataset, error.message);
    await log(500, null, 'query_failed');
    return problem(500, 'server_error', 'Something went wrong. Try again shortly.');
  }
  const rows = (data ?? []) as Record<string, unknown>[];
  await log(200, rows.length);

  if (url.searchParams.get('format') === 'csv') {
    return new Response(toCsv(DATASETS[dataset], rows), {
      status: 200,
      headers: {
        ...HEADERS,
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${dataset}.csv"`,
      },
    });
  }
  return json(200, {
    dataset,
    college_id: key.college_id,
    // Reporting datasets are snapshots: `since` is not applied to them.
    since: REPORTING.has(dataset) ? null : since,
    snapshot: REPORTING.has(dataset),
    limit,
    offset,
    count: rows.length,
    next_offset: rows.length === limit ? offset + limit : null,
    generated_at: new Date().toISOString(),
    columns: DATASETS[dataset],
    data: rows,
  });
}
