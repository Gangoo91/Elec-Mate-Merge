import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { buildPaymentReceivedEmail } from '../_shared/email-templates/payment-received.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

function safeJsonParse(data: unknown, fallback: Record<string, unknown> = {}) {
  if (data === null || data === undefined) return fallback;
  if (typeof data === 'object') return data as Record<string, unknown>;
  if (typeof data === 'string') {
    try { return JSON.parse(data); } catch { return fallback; }
  }
  return fallback;
}

const isValidEmail = (email: unknown): email is string =>
  typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
    if (!resendApiKey || !supabaseUrl || !serviceKey) {
      return json({ error: 'not_configured' }, 500);
    }

    const { invoiceId } = await req.json().catch(() => ({ invoiceId: null }));
    if (!invoiceId || typeof invoiceId !== 'string') return json({ error: 'invoice_id_required' }, 400);

    // ── Authorisation ──────────────────────────────────────────────────
    // Accept either the internal service-role key (called from the
    // mark-paid token flow / Stripe webhook) or a user JWT that owns the
    // invoice. Service-role client used for reads either way.
    const authHeader = req.headers.get('Authorization') || '';
    const bearer = authHeader.replace('Bearer ', '').trim();
    const admin = createClient(supabaseUrl, serviceKey);

    let authedUserId: string | null = null;
    const isInternal = bearer && bearer === serviceKey;
    if (!isInternal) {
      if (!bearer || !anonKey) return json({ error: 'unauthorised' }, 401);
      const { data: { user } } = await createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authHeader } },
      }).auth.getUser(bearer);
      if (!user) return json({ error: 'unauthorised' }, 401);
      authedUserId = user.id;
    }

    // ── Fetch invoice ──────────────────────────────────────────────────
    const { data: invoice } = await admin
      .from('quotes')
      .select('*')
      .eq('id', invoiceId)
      .eq('invoice_raised', true)
      .single();
    if (!invoice) return json({ skipped: true, reason: 'invoice_not_found' });
    if (authedUserId && invoice.user_id !== authedUserId) return json({ error: 'forbidden' }, 403);

    // ── Review settings gate — only send when enabled with links ───────
    const { data: company } = await admin
      .from('company_profiles')
      .select('*')
      .eq('user_id', invoice.user_id)
      .single();

    const reviewLinks = Array.isArray(company?.review_links) ? company.review_links : [];
    const hasLinks = reviewLinks.some((l: { url?: string }) => l?.url && /^https?:\/\//i.test(String(l.url).trim()));
    if (!company?.review_request_enabled || !hasLinks) {
      return json({ skipped: true, reason: 'reviews_disabled' });
    }

    // ── Resolve client email ───────────────────────────────────────────
    const clientData = safeJsonParse(invoice.client_data, {}) as Record<string, unknown>;
    let clientEmail = typeof clientData.email === 'string' ? clientData.email.trim() : '';
    const clientName = (clientData.name as string) || 'there';
    if (!isValidEmail(clientEmail) && clientData.id) {
      const { data: cust } = await admin.from('customers').select('email').eq('id', clientData.id).single();
      if (cust?.email) clientEmail = String(cust.email).trim();
    }
    if (!isValidEmail(clientEmail)) return json({ skipped: true, reason: 'no_client_email' });

    // ── Idempotency — never send the thank-you twice per invoice ───────
    if (invoice.payment_thankyou_sent_at) return json({ skipped: true, reason: 'already_sent' });

    // ── Build + send ───────────────────────────────────────────────────
    const companyName = company?.company_name || 'ElecMate';
    const invoiceNumber = invoice.invoice_number || `INV-${invoiceId.substring(0, 8)}`;
    const { html, subject } = buildPaymentReceivedEmail({
      company: {
        name: companyName,
        logoUrl: company?.logo_url || company?.logo_data_url || null,
        primaryColor: company?.primary_color || null,
        email: company?.company_email || null,
        phone: company?.company_phone || null,
        website: company?.company_website || null,
        address: company?.company_address || null,
      },
      clientName,
      invoiceNumber,
      total: Number(invoice.total) || 0,
      reviewLinks,
      reviewMessage: company?.review_request_message ?? null,
      trackingPixelUrl: `${supabaseUrl}/functions/v1/email-open?type=payment_received&id=${invoiceId}`,
    });

    const sender = clientFacingSender({ companyName, companyEmail: company?.company_email, userEmail: undefined });
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      ...sender,
      to: [clientEmail],
      subject,
      html,
      text: htmlToPlainText(html),
    });

    // Mark as sent for idempotency (best-effort).
    await admin
      .from('quotes')
      .update({ payment_thankyou_sent_at: new Date().toISOString() })
      .eq('id', invoiceId)
      .then(() => {}, () => {});

    return json({ success: true });
  } catch (error) {
    console.error('[send-payment-received-resend] Error:', error);
    return json({ error: error instanceof Error ? error.message : 'unknown' }, 500);
  }
});
