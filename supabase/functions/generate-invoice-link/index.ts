/**
 * generate-invoice-link — client-facing invoice link for an employer's
 * invoice. Caller must own the invoice; links use the real app origin
 * (old version: no auth, dead Lovable domain, route that never existed).
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
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

    const { invoiceId, clientEmail, clientName, expiryDays = 30, baseUrl } = await req.json();
    if (!invoiceId) {
      return new Response(JSON.stringify({ error: 'Invoice ID is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: invoice, error: invoiceError } = await caller
      .from('employer_invoices')
      .select('*')
      .eq('id', invoiceId)
      .single();
    if (invoiceError || !invoice) {
      return new Response(JSON.stringify({ error: 'Invoice not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const admin = createClient(supabaseUrl, serviceKey);
    const accessToken = crypto.randomUUID() + '-' + crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiryDays);

    const { data: existing } = await admin
      .from('employer_invoice_access')
      .select('id, access_token')
      .eq('invoice_id', invoiceId)
      .eq('status', 'pending')
      .maybeSingle();

    let accessRecord;
    if (existing) {
      // Keep the existing token on resend/chase — rotating it killed the link
      // in every previously-sent email while the invoice was still live. Only
      // the expiry window and client details refresh.
      const { data, error } = await admin
        .from('employer_invoice_access')
        .update({
          access_token: existing.access_token || accessToken,
          client_email: clientEmail || invoice.client,
          client_name: clientName || invoice.client,
          expires_at: expiresAt.toISOString(),
        })
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      accessRecord = data;
    } else {
      const { data, error } = await admin
        .from('employer_invoice_access')
        .insert({
          invoice_id: invoiceId,
          access_token: accessToken,
          client_email: clientEmail || invoice.client,
          client_name: clientName || invoice.client,
          expires_at: expiresAt.toISOString(),
          status: 'pending',
        })
        .select()
        .single();
      if (error) throw error;
      accessRecord = data;
    }

    let origin = 'https://www.elec-mate.com';
    if (baseUrl && ALLOWED_ORIGINS.some((o) => String(baseUrl).startsWith(o))) {
      origin = baseUrl;
    }
    const portalUrl = `${origin}/employer-invoice/${accessToken}`;

    return new Response(
      JSON.stringify({
        success: true,
        portalUrl,
        accessToken,
        expiresAt: expiresAt.toISOString(),
        accessId: accessRecord.id,
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
