/**
 * generate-quote-accept-link
 *
 * Mints a client-facing accept link for an employer's quote. Caller must own
 * the quote; the link uses the caller's real origin (the old version
 * hardcoded a dead Lovable preview domain and had no auth at all).
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ALLOWED_ORIGINS = ['http://localhost:', 'https://www.elec-mate.com', 'https://elec-mate.com'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const authHeader = req.headers.get('Authorization') ?? '';
    const caller = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: authError,
    } = await caller.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { quoteId, clientEmail, clientName, expiryDays = 30, baseUrl } = await req.json();
    if (!quoteId) {
      return new Response(JSON.stringify({ error: 'Quote ID is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Ownership via the caller's RLS
    const { data: quote, error: quoteError } = await caller
      .from('employer_quotes')
      .select('*')
      .eq('id', quoteId)
      .single();
    if (quoteError || !quote) {
      return new Response(JSON.stringify({ error: 'Quote not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const admin = createClient(supabaseUrl, serviceKey);
    const accessToken = crypto.randomUUID() + '-' + crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiryDays);

    const { data: existing } = await admin
      .from('employer_quote_acceptances')
      .select('id')
      .eq('quote_id', quoteId)
      .eq('status', 'pending')
      .maybeSingle();

    let acceptanceRecord;
    if (existing) {
      const { data, error } = await admin
        .from('employer_quote_acceptances')
        .update({
          access_token: accessToken,
          client_email: clientEmail || quote.client_email,
          client_name: clientName || quote.client,
          expires_at: expiresAt.toISOString(),
        })
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      acceptanceRecord = data;
    } else {
      const { data, error } = await admin
        .from('employer_quote_acceptances')
        .insert({
          quote_id: quoteId,
          access_token: accessToken,
          client_email: clientEmail || quote.client_email,
          client_name: clientName || quote.client,
          expires_at: expiresAt.toISOString(),
          status: 'pending',
        })
        .select()
        .single();
      if (error) throw error;
      acceptanceRecord = data;
    }

    // Real origin: the caller's baseUrl when allow-listed, else the app domain
    let origin = 'https://www.elec-mate.com';
    if (baseUrl && ALLOWED_ORIGINS.some((o) => String(baseUrl).startsWith(o))) {
      origin = baseUrl;
    }
    const portalUrl = `${origin}/employer-quote/${accessToken}`;

    return new Response(
      JSON.stringify({
        success: true,
        portalUrl,
        accessToken,
        expiresAt: expiresAt.toISOString(),
        acceptanceId: acceptanceRecord.id,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
