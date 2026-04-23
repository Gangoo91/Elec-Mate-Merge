// Public health probe for the LTI stack.
//
// Used by:
//   - External monitoring (Pingdom, BetterUptime, UptimeRobot)
//   - LMS IT admins verifying Elec-Mate is alive before installing
//   - Our own admin dashboard
//
// Checks: key material configured + JWKS endpoint returns a valid key set +
// Postgres reachable. Returns status=ok or status=degraded with per-check details.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
};

const VERSION = '16.1.0';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const t0 = performance.now();
  const checks: Record<string, { ok: boolean; ms: number; detail?: string }> = {};

  // 1. Key material configured
  const kid = Deno.env.get('LTI_KEY_ID');
  const jwksJson = Deno.env.get('LTI_JWKS_JSON');
  const privKey = Deno.env.get('LTI_PRIVATE_KEY_PEM');
  const t1 = performance.now();
  checks.keys_configured = {
    ok: !!(kid && jwksJson && privKey),
    ms: Math.round(performance.now() - t1),
    detail: kid && jwksJson && privKey ? undefined : 'Missing one or more LTI secrets',
  };

  // 2. JWKS endpoint is serving a valid key set
  const t2 = performance.now();
  try {
    const origin = new URL(req.url).origin;
    const r = await fetch(`${origin}/functions/v1/lti-jwks`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const b = await r.json();
    const ok = Array.isArray(b.keys) && b.keys.length > 0 && b.keys[0].kty === 'RSA';
    checks.jwks_endpoint = {
      ok,
      ms: Math.round(performance.now() - t2),
      detail: ok ? `Serves ${b.keys.length} key(s), kid=${b.keys[0].kid}` : 'Invalid JWK set',
    };
  } catch (e) {
    checks.jwks_endpoint = {
      ok: false,
      ms: Math.round(performance.now() - t2),
      detail: (e as Error).message,
    };
  }

  // 3. Database reachable
  const t3 = performance.now();
  try {
    const url = Deno.env.get('SUPABASE_URL');
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) throw new Error('Missing DB creds');
    const db = createClient(url, key, { auth: { persistSession: false } });
    const { error: dbErr, count } = await db
      .from('lti_platforms')
      .select('id', { count: 'exact', head: true });
    if (dbErr) throw dbErr;
    checks.database = {
      ok: true,
      ms: Math.round(performance.now() - t3),
      detail: `platforms_count=${count ?? 0}`,
    };
  } catch (e) {
    checks.database = {
      ok: false,
      ms: Math.round(performance.now() - t3),
      detail: (e as Error).message,
    };
  }

  const allOk = Object.values(checks).every((c) => c.ok);
  const total_ms = Math.round(performance.now() - t0);

  const body = {
    status: allOk ? 'ok' : 'degraded',
    version: VERSION,
    kid: kid ?? null,
    checks,
    total_ms,
    timestamp: new Date().toISOString(),
  };

  return new Response(JSON.stringify(body), {
    status: allOk ? 200 : 503,
    headers: {
      ...corsHeaders,
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
  });
});
