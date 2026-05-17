// parent-portal-view — public token-validated read API for the parent
// magic-link page. NO auth required (parents don't have accounts).
// Validates the token, marks it used, and returns the latest digest payload
// + a small bundle of fresh signals for that learner.
//
// POST {
//   token: string,
//   action?: 'view' | 'unsubscribe'
// }
//
// verify_jwt is set to false on deploy because parents are anonymous.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== 'POST')
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  let body: { token: string; action?: 'view' | 'unsubscribe' };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return new Response(JSON.stringify({ error: 'bad_body' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (!body.token) {
    return new Response(JSON.stringify({ error: 'token_required' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Validate token
  const { data: tokenRow } = await sb
    .from('college_parent_tokens')
    .select('id, parent_contact_id, purpose, expires_at, used_at')
    .eq('token', body.token)
    .maybeSingle();

  if (!tokenRow) {
    return new Response(JSON.stringify({ error: 'invalid_token' }), {
      status: 404,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (tokenRow.expires_at && new Date(tokenRow.expires_at) < new Date()) {
    return new Response(JSON.stringify({ error: 'expired_token' }), {
      status: 410,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // Unsubscribe path — flip opted_out_at + mark token used, then return.
  if (body.action === 'unsubscribe' || tokenRow.purpose === 'opt_out') {
    await sb
      .from('college_parent_contacts')
      .update({ opted_out_at: new Date().toISOString() })
      .eq('id', tokenRow.parent_contact_id);
    await sb
      .from('college_parent_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('id', tokenRow.id);
    return new Response(
      JSON.stringify({ ok: true, unsubscribed: true }),
      { headers: { ...corsHeaders, 'content-type': 'application/json' } }
    );
  }

  // View path — pull parent + student + most recent digest payload + a fresh peek
  const { data: parent } = await sb
    .from('college_parent_contacts')
    .select('id, name, email, student_id, college_id, opted_out_at')
    .eq('id', tokenRow.parent_contact_id)
    .maybeSingle();
  if (!parent) {
    return new Response(JSON.stringify({ error: 'parent_not_found' }), {
      status: 404,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (parent.opted_out_at) {
    return new Response(JSON.stringify({ error: 'opted_out' }), {
      status: 410,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  const { data: student } = await sb
    .from('college_students')
    .select('id, name, status, cohort_id')
    .eq('id', parent.student_id)
    .maybeSingle();

  const { data: college } = await sb
    .from('colleges')
    .select('id, name, logo_url')
    .eq('id', parent.college_id)
    .maybeSingle();

  const { data: latestDigest } = await sb
    .from('college_parent_digest_log')
    .select('iso_week, payload, sent_at')
    .eq('parent_contact_id', parent.id)
    .order('sent_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  // Mark token used (single-use for digest_view tokens)
  await sb
    .from('college_parent_tokens')
    .update({ used_at: new Date().toISOString() })
    .eq('id', tokenRow.id);

  return new Response(
    JSON.stringify({
      ok: true,
      parent: { name: parent.name, email: parent.email },
      student: student
        ? { name: student.name, status: student.status }
        : null,
      college: college
        ? { name: college.name, logo_url: college.logo_url }
        : null,
      digest: latestDigest?.payload ?? null,
      sent_at: latestDigest?.sent_at ?? null,
      iso_week: latestDigest?.iso_week ?? null,
    }),
    { headers: { ...corsHeaders, 'content-type': 'application/json' } }
  );
});
