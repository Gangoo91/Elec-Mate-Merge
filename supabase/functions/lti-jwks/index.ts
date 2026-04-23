// LTI 1.3 JWKS endpoint
//
// Serves our public RSA key(s) as a JSON Web Key Set so LMS platforms
// can verify JWTs we sign (Deep Linking responses + AGS/NRPS service calls).
//
// Spec: https://www.imsglobal.org/spec/security/v1p1#h_jwks
//
// Keys are stored in Supabase secret `LTI_JWKS_JSON` as a pre-baked JWK set
// string. Supporting multiple keys in the set enables zero-downtime rotation.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
};

Deno.serve((req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const jwks = Deno.env.get('LTI_JWKS_JSON');
  if (!jwks) {
    return new Response(JSON.stringify({ error: 'jwks_not_configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  try {
    JSON.parse(jwks);
  } catch {
    return new Response(JSON.stringify({ error: 'jwks_malformed' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  return new Response(jwks, {
    status: 200,
    headers: {
      ...corsHeaders,
      'content-type': 'application/json',
      'cache-control': 'public, max-age=3600, must-revalidate',
    },
  });
});
