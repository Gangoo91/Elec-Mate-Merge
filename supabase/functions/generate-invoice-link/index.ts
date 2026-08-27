/**
 * generate-invoice-link — client-facing invoice link for an employer's
 * invoice. Caller must own the invoice; links use the real app origin
 * (old version: no auth, dead Lovable domain, route that never existed).
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

import { withSentry } from '../_shared/sentry.ts';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const ALLOWED_ORIGINS = ['http://localhost:', 'https://www.elec-mate.com', 'https://elec-mate.com'];

Deno.serve(withSentry('generate-invoice-link', async (req) => {
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

    // Invoices live in `quotes` (invoice_raised = true) — that is where both the
    // Electrical Hub builder and, since 2026-08-02, the Employer Hub write.
    // This read was `employer_invoices`, a legacy table with no rows, so every
    // chase/resend 404'd. RLS on the caller client still enforces ownership
    // (quotes.user_id ∈ my_employer_scope()).
    const { data: row, error: invoiceError } = await caller
      .from('quotes')
      .select('*')
      .eq('id', invoiceId)
      .maybeSingle();
    if (invoiceError || !row) {
      return new Response(JSON.stringify({ error: 'Invoice not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // The client name/email live in client_data on the real table; the code
    // below reads `invoice.client`, so flatten rather than rewrite it.
    const clientData = (row.client_data ?? {}) as Record<string, unknown>;
    const invoice = {
      ...row,
      client: (clientData.name as string) ?? null,
      client_email: (clientData.email as string) ?? null,
    };

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
    // Use the token that was actually STORED, not the freshly-minted one. On a
    // resend the existing token is deliberately preserved (so links in already-
    // sent emails keep working), but this line used the new random token — so
    // the second chase emailed a URL that matched no row and 404'd for the
    // client. Only the first send ever worked.
    const storedToken = (accessRecord?.access_token as string) ?? accessToken;
    const portalUrl = `${origin}/employer-invoice/${storedToken}`;

    return new Response(
      JSON.stringify({
        success: true,
        portalUrl,
        accessToken: storedToken,
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
}));
