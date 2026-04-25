/**
 * acknowledge-policy
 *
 * Server-side insert of a policy acknowledgement so we can stamp the real
 * client IP and user-agent on the row (the JS client can't see x-forwarded-for).
 *
 * Body: { policy_id: uuid, policy_version: int }
 * Auth: required (caller's JWT identifies the signer)
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface RequestBody {
  policy_id?: string;
  policy_version?: number;
}

function extractClientIp(req: Request): string | null {
  // x-forwarded-for is a comma-separated list; the first entry is the
  // original client. Fall back to x-real-ip, then null.
  const xff = req.headers.get('x-forwarded-for');
  if (xff) {
    const first = xff.split(',')[0]?.trim();
    if (first) return first;
  }
  const real = req.headers.get('x-real-ip');
  if (real) return real.trim();
  return null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

  // Auth — verify the caller via their JWT
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const userClient = createClient(SUPABASE_URL, SERVICE_KEY, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userRes, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userRes.user) {
    return new Response(JSON.stringify({ error: 'Invalid auth' }), {
      status: 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const userId = userRes.user.id;

  // Parse body
  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const policyId = body.policy_id;
  const policyVersion = body.policy_version;

  if (!policyId || typeof policyVersion !== 'number') {
    return new Response(
      JSON.stringify({
        error: 'policy_id (uuid) and policy_version (number) are required',
      }),
      { status: 400, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  }

  // Verify the policy exists, is live, and the version matches the current one.
  // We use the user's JWT-scoped client so RLS guarantees the user can see this
  // policy (i.e. it belongs to their college).
  const { data: policy, error: polErr } = await userClient
    .from('college_policies')
    .select('id, version, status, requires_acknowledgement')
    .eq('id', policyId)
    .maybeSingle();

  if (polErr || !policy) {
    return new Response(JSON.stringify({ error: 'Policy not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (policy.status !== 'live') {
    return new Response(JSON.stringify({ error: 'Policy is not live — cannot acknowledge.' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (!policy.requires_acknowledgement) {
    return new Response(JSON.stringify({ error: "This policy doesn't require acknowledgement." }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (policy.version !== policyVersion) {
    return new Response(
      JSON.stringify({
        error: `Stale version — current is v${policy.version}.`,
        current_version: policy.version,
      }),
      { status: 409, headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  }

  // Insert the acknowledgement with server-stamped IP + user-agent. We use the
  // user-scoped client so RLS still applies and the audit trigger picks up the
  // real auth.uid().
  const ipAddr = extractClientIp(req);
  const userAgent = req.headers.get('user-agent');

  const { error: insErr } = await userClient.from('policy_acknowledgements').insert({
    policy_id: policyId,
    user_id: userId,
    policy_version: policyVersion,
    ip_addr: ipAddr,
    user_agent: userAgent,
  });

  if (insErr) {
    // 23505 — unique violation: already signed this version
    if ((insErr as { code?: string }).code === '23505') {
      return new Response(
        JSON.stringify({
          ok: true,
          already_signed: true,
        }),
        { status: 200, headers: { ...corsHeaders, 'content-type': 'application/json' } }
      );
    }
    return new Response(JSON.stringify({ error: insErr.message }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({
      ok: true,
      policy_id: policyId,
      policy_version: policyVersion,
      ip_addr: ipAddr,
    }),
    { status: 200, headers: { ...corsHeaders, 'content-type': 'application/json' } }
  );
});
