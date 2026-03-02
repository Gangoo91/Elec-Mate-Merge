/**
 * Quoting tools — read_quotes, generate_quote, generate_quote_pdf, send_quote,
 *                 set_quote_auto_followup, track_quote_email
 *
 * SECURITY.md §6 — Quote safeguards:
 *   - Never auto-send without showing full breakdown
 *   - Quote links expire after 30 days — never send expired quotes
 *   - Check WhatsApp consent before sending via WhatsApp
 */

import type { UserContext } from '../auth.js';

import { callEdgeFunction } from '../lib/edge-function.js';

export async function readQuotes(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  let query = supabase
    .from('quotes')
    .select('id, quote_number, client_data, total, status, expiry_date, notes, created_at');

  if (typeof args.status === 'string') {
    query = query.eq('status', args.status);
  }

  query = query.order('created_at', { ascending: false }).limit(50);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to read quotes: ${error.message}`);

  return { quotes: data || [] };
}

export async function generateQuote(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.job_type !== 'string' || args.job_type.trim().length === 0) {
    throw new Error('job_type is required');
  }
  if (typeof args.property_details !== 'string' || args.property_details.trim().length === 0) {
    throw new Error('property_details is required');
  }
  if (
    typeof args.client_requirements !== 'string' ||
    args.client_requirements.trim().length === 0
  ) {
    throw new Error('client_requirements is required');
  }

  const result = await callEdgeFunction('ai-quote-generator', user.jwt, {
    job_type: args.job_type,
    property_details: args.property_details,
    client_requirements: args.client_requirements,
    region: typeof args.region === 'string' ? args.region : undefined,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}

export async function generateQuotePdf(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.quote_id !== 'string') {
    throw new Error('quote_id is required');
  }

  const supabase = user.supabase;

  // generate-pdf-monkey needs full quote data + company profile
  const [quoteRes, profileRes] = await Promise.all([
    supabase.from('quotes').select('*').eq('id', args.quote_id).single(),
    supabase.from('company_profiles').select('*').eq('user_id', user.userId).single(),
  ]);

  if (quoteRes.error || !quoteRes.data) {
    throw new Error('Quote not found');
  }

  const result = await callEdgeFunction(
    'generate-pdf-monkey',
    user.jwt,
    {
      quoteId: args.quote_id,
      quote: quoteRes.data,
      companyProfile: profileRes.data ?? undefined,
      force_regenerate: args.force_regenerate === true,
    },
    { timeoutMs: 60_000 }
  );

  if (result.error) throw new Error(result.error);

  // Return structured PDF result with MEDIA: guidance for WhatsApp
  const data = result.data as Record<string, unknown> | null;
  const downloadUrl = (data?.downloadUrl ?? data?.download_url) as string | undefined;

  if (!downloadUrl) {
    throw new Error('PDF generation failed — no download URL returned');
  }

  return {
    documentId: data?.documentId ?? data?.document_id,
    downloadUrl,
    previewUrl: data?.previewUrl ?? data?.preview_url,
    quote_id: args.quote_id,
    message: `Quote PDF generated. To send as a WhatsApp document, use MEDIA:${downloadUrl}`,
  };
}

export async function sendQuote(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.quote_id !== 'string') {
    throw new Error('quote_id is required');
  }
  if (typeof args.client_id !== 'string') {
    throw new Error('client_id is required');
  }

  const supabase = user.supabase;

  // ── Quote expiry check (SECURITY.md §6) ───────────────────────────
  const { data: quote, error: quoteError } = await supabase
    .from('quotes')
    .select('id, status, expiry_date, total')
    .eq('id', args.quote_id)
    .single();

  if (quoteError || !quote) {
    throw new Error('Quote not found');
  }

  if (quote.expiry_date) {
    const expiryDate = new Date(quote.expiry_date);
    if (expiryDate < new Date()) {
      throw new Error(
        `This quote expired on ${expiryDate.toLocaleDateString('en-GB')}. Create a new quote instead.`
      );
    }
  }

  // ── WhatsApp consent check ────────────────────────────────────────
  if (args.channel === 'whatsapp') {
    const { data: client, error: clientError } = await supabase
      .from('customers')
      .select('name, phone')
      .eq('id', args.client_id)
      .single();

    if (clientError || !client) {
      throw new Error('Client not found');
    }
    if (!client.phone) {
      throw new Error(`No phone number on file for ${client.name}`);
    }
  }

  const channel = typeof args.channel === 'string' ? args.channel : 'email';

  if (channel === 'email') {
    // send-quote-resend handles PDF generation, branded email via Resend,
    // status update to 'sent', and tracking in quote_email_events
    const result = await callEdgeFunction(
      'send-quote-resend',
      user.jwt,
      {
        quoteId: args.quote_id,
      },
      { timeoutMs: 60_000 }
    );

    if (result.error) throw new Error(result.error);
    return result.data;
  }

  // WhatsApp: generate PDF + public quote link, return for agent to send natively via OpenClaw
  const pdfResult = await callEdgeFunction(
    'generate-pdf-monkey',
    user.jwt,
    {
      quoteId: args.quote_id,
      force_regenerate: false,
    },
    { timeoutMs: 60_000 }
  );

  if (pdfResult.error) throw new Error(pdfResult.error);

  const pdfData = pdfResult.data as Record<string, unknown> | null;

  // Update quote status to sent
  await supabase.from('quotes').update({ status: 'sent' }).eq('id', args.quote_id);

  // Fetch client details for the agent to compose the WhatsApp message
  const { data: clientData } = await supabase
    .from('customers')
    .select('name, phone')
    .eq('id', args.client_id)
    .single();

  return {
    action: 'send_whatsapp',
    phone: clientData?.phone,
    client_name: clientData?.name,
    quote_total: quote.total,
    download_url: pdfData?.downloadUrl ?? pdfData?.download_url,
    message:
      typeof args.message === 'string'
        ? args.message
        : `Hi ${clientData?.name ?? 'there'}, here's your quote for £${quote.total}. You can view it here: ${pdfData?.downloadUrl ?? pdfData?.download_url ?? '[link pending]'}`,
  };
}

export async function setQuoteAutoFollowup(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.quote_id !== 'string') {
    throw new Error('quote_id is required');
  }
  if (typeof args.followup_days !== 'number' || args.followup_days <= 0) {
    throw new Error('followup_days must be a positive number');
  }

  const result = await callEdgeFunction('quote-automated-followup', user.jwt, {
    quote_id: args.quote_id,
    followup_days: args.followup_days,
    max_followups: typeof args.max_followups === 'number' ? args.max_followups : 3,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}

export async function trackQuoteEmail(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.quote_id !== 'string') {
    throw new Error('quote_id is required');
  }

  const result = await callEdgeFunction('quote-email-tracking', user.jwt, {
    quote_id: args.quote_id,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}
