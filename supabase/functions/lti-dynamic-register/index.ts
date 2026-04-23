// LTI 1.3 Dynamic Registration endpoint.
//
// Spec: https://www.imsglobal.org/spec/lti-dr/v1p0/
//
// Flow from the college IT admin's perspective:
//   1. Admin pastes OUR registration URL into the LMS's "LTI Tool Registration" field.
//      Example: https://.../functions/v1/lti-dynamic-register?college_id=<their-college-id>
//   2. LMS redirects their browser to our URL with query params:
//        - openid_configuration (URL of LMS's OIDC discovery doc)
//        - registration_token   (one-time bearer token)
//   3. We fetch the openid_configuration document to learn LMS's issuer/auth/jwks URLs.
//   4. We POST a Client Registration Request to LMS's registration_endpoint with
//      OUR tool metadata (our name, JWKS URL, redirect URIs, capabilities).
//   5. LMS creates a client record and returns client_id (+ deployment_id on some LMSes).
//   6. We create/update an lti_platforms row tied to the college_id from step 1.
//   7. We return a small HTML page confirming success to the admin's browser.
//
// Must be deployed --no-verify-jwt. The registration flow is authenticated by the
// LMS-issued one-time `registration_token`, not a Supabase JWT.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, content-type',
};

const TOOL_NAME = 'Elec-Mate';
const TOOL_DESCRIPTION = 'UK electrical certification & apprentice training platform.';
const TOOL_LOGO_URI = 'https://www.elec-mate.com/favicon.png';

function htmlPage(status: 'ok' | 'error', title: string, body: string, detail?: string) {
  const isOk = status === 'ok';
  return new Response(
    `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
<style>
  body{font:14px system-ui,-apple-system,sans-serif;background:#0a0a0a;color:#fff;margin:0;padding:40px;display:flex;align-items:center;justify-content:center;min-height:100vh}
  .card{max-width:520px;width:100%;background:hsl(0 0% 12%);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:32px}
  .eyebrow{text-transform:uppercase;letter-spacing:0.18em;font-size:11px;font-weight:500;color:rgba(255,255,255,0.4);margin-bottom:8px}
  h1{margin:0 0 8px;font-size:22px;font-weight:600}
  p{color:rgba(255,255,255,0.7);line-height:1.55;margin:12px 0}
  .pill{display:inline-block;font-family:ui-monospace,Menlo,monospace;font-size:11px;padding:3px 9px;border-radius:999px;margin-bottom:16px}
  .ok{background:rgba(16,185,129,0.1);color:#6ee7b7;border:1px solid rgba(16,185,129,0.25)}
  .err{background:rgba(239,68,68,0.1);color:#fca5a5;border:1px solid rgba(239,68,68,0.25)}
  code{background:rgba(255,255,255,0.07);padding:2px 6px;border-radius:4px;font-size:12px}
</style></head><body>
<div class="card">
  <div class="eyebrow">LTI Dynamic Registration</div>
  <span class="pill ${isOk ? 'ok' : 'err'}">${isOk ? '✓ Registration complete' : '✗ Registration failed'}</span>
  <h1>${title}</h1>
  <p>${body}</p>
  ${detail ? `<p><code>${detail.replace(/[<>&]/g, '')}</code></p>` : ''}
  <p style="color:rgba(255,255,255,0.5);font-size:12.5px">You can close this tab. The configuration has been saved to your Elec-Mate college settings.</p>
</div>
</body></html>`,
    {
      status: isOk ? 200 : 400,
      headers: { ...corsHeaders, 'content-type': 'text/html; charset=utf-8' },
    }
  );
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });

  const url = new URL(req.url);

  // GET is the browser-initiated entry point from the LMS
  if (req.method !== 'GET' && req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const openidConfigUrl = url.searchParams.get('openid_configuration');
  const registrationToken = url.searchParams.get('registration_token') ?? '';
  const collegeId = url.searchParams.get('college_id');

  if (!openidConfigUrl) {
    return htmlPage(
      'error',
      'Missing LMS configuration URL',
      'Your LMS did not include the openid_configuration parameter. Please restart the registration flow from your LMS admin panel.'
    );
  }
  if (!collegeId) {
    return htmlPage(
      'error',
      'Missing college',
      'The registration URL must include a college_id query parameter. Copy the correct URL from your Elec-Mate "LTI Settings → Dynamic Registration" panel.'
    );
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return htmlPage('error', 'Server misconfigured', 'Supabase credentials unavailable on the edge function.');
  }
  const db = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // 1. Fetch the LMS's OIDC configuration document
  let lmsConfig: Record<string, unknown>;
  try {
    const r = await fetch(openidConfigUrl);
    if (!r.ok) throw new Error(`HTTP ${r.status} fetching openid_configuration`);
    lmsConfig = await r.json();
  } catch (e) {
    return htmlPage(
      'error',
      'Could not read LMS configuration',
      'We failed to fetch the openid_configuration URL from your LMS.',
      (e as Error).message
    );
  }

  const issuer = lmsConfig.issuer as string | undefined;
  const authLogin = lmsConfig.authorization_endpoint as string | undefined;
  const authToken = lmsConfig.token_endpoint as string | undefined;
  const jwksUri = lmsConfig.jwks_uri as string | undefined;
  const registrationEndpoint = lmsConfig.registration_endpoint as string | undefined;

  if (!issuer || !authLogin || !authToken || !jwksUri || !registrationEndpoint) {
    return htmlPage(
      'error',
      'Incomplete LMS configuration',
      'The LMS openid_configuration is missing required fields (issuer, authorization_endpoint, token_endpoint, jwks_uri, registration_endpoint).'
    );
  }

  // 2. Compose our Client Registration Request.
  const origin = `${url.protocol}//${url.host}`;
  const toolJwksUri = `${origin}/functions/v1/lti-jwks`;
  const toolLaunchUri = `${origin}/functions/v1/lti-launch`;
  const toolOidcInitUri = `${origin}/functions/v1/lti-oidc-init`;
  const toolDeepLinkUri = `${origin}/functions/v1/lti-deep-link`;

  const registrationRequest = {
    application_type: 'web',
    response_types: ['id_token'],
    grant_types: ['implicit', 'client_credentials'],
    initiate_login_uri: toolOidcInitUri,
    redirect_uris: [toolLaunchUri, toolDeepLinkUri],
    client_name: TOOL_NAME,
    jwks_uri: toolJwksUri,
    logo_uri: TOOL_LOGO_URI,
    token_endpoint_auth_method: 'private_key_jwt',
    scope: [
      'https://purl.imsglobal.org/spec/lti-ags/scope/score',
      'https://purl.imsglobal.org/spec/lti-ags/scope/result.readonly',
      'https://purl.imsglobal.org/spec/lti-ags/scope/lineitem',
      'https://purl.imsglobal.org/spec/lti-nrps/scope/contextmembership.readonly',
    ].join(' '),
    'https://purl.imsglobal.org/spec/lti-tool-configuration': {
      domain: new URL(origin).hostname,
      description: TOOL_DESCRIPTION,
      target_link_uri: toolLaunchUri,
      custom_parameters: {},
      claims: ['iss', 'sub', 'name', 'given_name', 'family_name', 'email'],
      messages: [
        {
          type: 'LtiResourceLinkRequest',
          target_link_uri: toolLaunchUri,
          label: 'Elec-Mate',
        },
        {
          type: 'LtiDeepLinkingRequest',
          target_link_uri: toolDeepLinkUri,
          label: 'Browse Elec-Mate resources',
        },
      ],
    },
  };

  // 3. POST registration request to the LMS
  let lmsResponse: Record<string, unknown>;
  try {
    const r = await fetch(registrationEndpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(registrationToken ? { authorization: `Bearer ${registrationToken}` } : {}),
      },
      body: JSON.stringify(registrationRequest),
    });
    lmsResponse = await r.json();
    if (!r.ok) {
      throw new Error(
        `LMS responded HTTP ${r.status}: ${JSON.stringify(lmsResponse).slice(0, 200)}`
      );
    }
  } catch (e) {
    return htmlPage(
      'error',
      'LMS rejected registration',
      'The LMS did not accept our client registration request. This usually means your tool registration token has expired — try starting the flow again.',
      (e as Error).message
    );
  }

  const clientId = lmsResponse.client_id as string | undefined;
  if (!clientId) {
    return htmlPage(
      'error',
      'LMS did not return a client_id',
      'The LMS registration response was missing a client_id. Configuration cannot be saved.',
      JSON.stringify(lmsResponse).slice(0, 200)
    );
  }

  const deploymentId =
    ((lmsResponse['https://purl.imsglobal.org/spec/lti-tool-configuration'] as
      | Record<string, unknown>
      | undefined)?.deployment_id as string | undefined) ?? null;

  const platformType = (() => {
    const host = new URL(issuer).hostname.toLowerCase();
    if (host.includes('canvas') || host.includes('instructure')) return 'canvas';
    if (host.includes('moodle')) return 'moodle';
    if (host.includes('blackboard') || host.includes('bbcollab')) return 'blackboard';
    if (host.includes('brightspace') || host.includes('d2l')) return 'd2l';
    if (host.includes('schoology')) return 'schoology';
    return 'other';
  })();

  // 4. Upsert the platform row
  const { error: upsertErr } = await db
    .from('lti_platforms')
    .upsert(
      {
        name: `${platformType[0].toUpperCase()}${platformType.slice(1)} — ${new URL(issuer).hostname}`,
        platform_type: platformType,
        issuer,
        client_id: clientId,
        deployment_id: deploymentId,
        auth_login_url: authLogin,
        auth_token_url: authToken,
        jwks_url: jwksUri,
        college_id: collegeId,
        status: 'Connected',
        settings: {
          features: { deep_linking: true, grade_sync: true, roster_sync: true },
          registered_via: 'dynamic_registration',
          registered_at: new Date().toISOString(),
        },
      },
      { onConflict: 'issuer,client_id,deployment_id' }
    );

  if (upsertErr) {
    return htmlPage(
      'error',
      'Could not save LMS config',
      'The LMS accepted our registration, but we failed to save it to Elec-Mate.',
      upsertErr.message
    );
  }

  return htmlPage(
    'ok',
    `Connected to ${new URL(issuer).hostname}`,
    `Your LMS has been registered with Elec-Mate via LTI Dynamic Registration. Students and staff can now launch into the College Hub from your LMS course pages.`
  );
});
