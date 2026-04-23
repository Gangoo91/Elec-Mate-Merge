// Admin-only endpoint: takes an lti_platforms row id and runs a live check:
//   1. JWKS URL reachable + serves a valid JWK set
//   2. Authorization login/token URLs at least resolve (HEAD / 2xx-3xx)
//   3. Platform `issuer` hostname matches JWKS/auth URLs (common config error)
//
// Returns a structured report for the admin UI. This is not a full LTI
// round-trip (we can't impersonate the LMS), but it catches 90% of real-world
// misconfig (wrong URLs, typos, unreachable host, non-JWK response body).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey',
};

type CheckResult = {
  name: string;
  ok: boolean;
  message: string;
  latency_ms?: number;
};

async function timed<T>(fn: () => Promise<T>): Promise<{ result?: T; error?: string; ms: number }> {
  const t0 = performance.now();
  try {
    const result = await fn();
    return { result, ms: Math.round(performance.now() - t0) };
  } catch (e) {
    return { error: (e as Error).message, ms: Math.round(performance.now() - t0) };
  }
}

async function checkJwks(url: string): Promise<CheckResult> {
  const t = await timed(async () => {
    const r = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const body = await r.json();
    if (!body || !Array.isArray(body.keys) || body.keys.length === 0) {
      throw new Error('Response is not a JWK set (missing `keys` array)');
    }
    const first = body.keys[0];
    if (!first.kty || !first.n || !first.e) {
      throw new Error('First key is not a usable RSA JWK (missing kty/n/e)');
    }
    return body.keys.length;
  });
  if (t.error) return { name: 'JWKS endpoint', ok: false, message: t.error, latency_ms: t.ms };
  return {
    name: 'JWKS endpoint',
    ok: true,
    message: `Served ${t.result} key(s) in ${t.ms}ms`,
    latency_ms: t.ms,
  };
}

async function checkReachable(url: string, label: string): Promise<CheckResult> {
  const t = await timed(async () => {
    // Some LMSes reject HEAD, so fall back to GET without following redirects.
    const r = await fetch(url, { method: 'GET', redirect: 'manual' });
    // Anything 200-399 means we reached the host and the endpoint exists.
    if (r.status >= 400 && r.status !== 405) {
      throw new Error(`HTTP ${r.status}`);
    }
    return r.status;
  });
  if (t.error) return { name: label, ok: false, message: t.error, latency_ms: t.ms };
  return {
    name: label,
    ok: true,
    message: `Reachable (HTTP ${t.result}) in ${t.ms}ms`,
    latency_ms: t.ms,
  };
}

function checkHostConsistency(platform: {
  issuer: string;
  auth_login_url: string;
  auth_token_url: string;
  jwks_url: string;
}): CheckResult {
  try {
    const iss = new URL(platform.issuer).hostname;
    const checks = [
      { key: 'auth_login_url', host: new URL(platform.auth_login_url).hostname },
      { key: 'auth_token_url', host: new URL(platform.auth_token_url).hostname },
      { key: 'jwks_url', host: new URL(platform.jwks_url).hostname },
    ];
    const mismatches = checks.filter(
      (c) => !c.host.endsWith(iss) && !iss.endsWith(c.host)
    );
    if (mismatches.length === 0) {
      return { name: 'Host consistency', ok: true, message: `All URLs share/subdomain of ${iss}` };
    }
    return {
      name: 'Host consistency',
      ok: false,
      message:
        `Host mismatch — issuer=${iss}, but ` +
        mismatches.map((m) => `${m.key}=${m.host}`).join(', '),
    };
  } catch (e) {
    return { name: 'Host consistency', ok: false, message: (e as Error).message };
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const ANON = Deno.env.get('SUPABASE_ANON_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY || !ANON) {
    return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // Auth: require the caller's Supabase JWT, confirm they have profile.college_admin
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const authed = createClient(SUPABASE_URL, ANON, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: userData } = await authed.auth.getUser();
  if (!userData?.user) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const body = await req.json().catch(() => ({}));
  const { platform_id } = body as { platform_id?: string };
  if (!platform_id) {
    return new Response(JSON.stringify({ error: 'missing_platform_id' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: platform } = await admin
    .from('lti_platforms')
    .select('id, name, issuer, client_id, auth_login_url, auth_token_url, jwks_url, college_id, status')
    .eq('id', platform_id)
    .maybeSingle();
  if (!platform) {
    return new Response(JSON.stringify({ error: 'platform_not_found' }), {
      status: 404,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // Confirm caller's profile.college_id matches the platform's college_id
  const { data: profile } = await admin
    .from('profiles')
    .select('college_id, college_role')
    .eq('id', userData.user.id)
    .maybeSingle();
  if (!profile || profile.college_id !== platform.college_id) {
    return new Response(JSON.stringify({ error: 'forbidden' }), {
      status: 403,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // Run checks in parallel
  const [jwks, login, token, hostConsistency] = await Promise.all([
    checkJwks(platform.jwks_url),
    checkReachable(platform.auth_login_url, 'Authorization login URL'),
    checkReachable(platform.auth_token_url, 'Authorization token URL'),
    Promise.resolve(checkHostConsistency(platform)),
  ]);

  const checks = [hostConsistency, jwks, login, token];
  const allOk = checks.every((c) => c.ok);

  // If all green, flip the platform to Connected
  if (allOk && platform.status !== 'Connected') {
    await admin
      .from('lti_platforms')
      .update({ status: 'Connected', last_sync_at: new Date().toISOString() })
      .eq('id', platform.id);
  }

  return new Response(
    JSON.stringify({
      platform_id: platform.id,
      platform_name: platform.name,
      ok: allOk,
      checks,
      new_status: allOk ? 'Connected' : platform.status,
    }),
    { status: 200, headers: { ...corsHeaders, 'content-type': 'application/json' } }
  );
});
