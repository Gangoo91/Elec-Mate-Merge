/**
 * send-finance-document
 *
 * Emails an employer's quote or invoice to their client, with the accept /
 * payment link. Caller must own the document (per-tenant check). Sender
 * follows the platform DMARC rule: From locked to noreply@elec-mate.com with
 * the company name as display, Reply-To the company's own email.
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import { sendEmail, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const money = (v: number | string | null | undefined) =>
  `£${Number(v || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

    const authHeader = req.headers.get('Authorization') ?? '';
    const supabase = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { type, documentId, recipientEmail, recipientName, acceptLink, invoicePortalLink } =
      await req.json();

    if (!['quote', 'invoice'].includes(type) || !documentId || !recipientEmail) {
      return new Response(JSON.stringify({ error: 'type, documentId and recipientEmail required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(recipientEmail)) {
      return new Response(JSON.stringify({ error: 'Invalid recipient email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Ownership: RLS on the user-scoped client enforces employer_id = caller
    const table = type === 'quote' ? 'employer_quotes' : 'employer_invoices';
    const numberCol = type === 'quote' ? 'quote_number' : 'invoice_number';
    const { data: doc, error: docError } = await supabase
      .from(table)
      .select('*')
      .eq('id', documentId)
      .single();
    if (docError || !doc) {
      return new Response(JSON.stringify({ error: 'Document not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: company } = await supabase
      .from('company_profiles')
      .select('company_name, company_email, company_phone')
      .eq('user_id', user.id)
      .maybeSingle();

    const companyName = company?.company_name?.trim() || 'Your Electrician';
    const docNumber = doc[numberCol] || '';
    const amount = type === 'quote' ? doc.value : doc.amount;
    const link = type === 'quote' ? acceptLink : invoicePortalLink;
    const heading = type === 'quote' ? `Quote ${docNumber}` : `Invoice ${docNumber}`;
    const cta = type === 'quote' ? 'View & accept quote' : 'View invoice & pay';
    const intro =
      type === 'quote'
        ? `${companyName} has sent you a quote${doc.description ? ` for ${doc.description}` : ''}.`
        : `${companyName} has sent you an invoice${doc.project ? ` for ${doc.project}` : ''}.`;

    const html = `
      <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h2>${heading} from ${companyName}</h2>
        <p>Hi ${recipientName || 'there'},</p>
        <p>${intro}</p>
        <div style="background: #f8f8f8; border-radius: 8px; padding: 16px 20px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #666;">${type === 'quote' ? 'Quote total' : 'Amount due'}</p>
          <p style="margin: 4px 0 0; font-size: 28px; font-weight: 700;">${money(amount)}</p>
          ${doc.due_date && type === 'invoice' ? `<p style="margin: 8px 0 0; font-size: 13px; color: #666;">Due ${new Date(doc.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>` : ''}
        </div>
        ${
          link
            ? `<p style="margin: 24px 0;">
                <a href="${link}" style="background: #f5b800; color: #1a1a1a; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">${cta}</a>
              </p>`
            : ''
        }
        <p style="color: #666; font-size: 13px;">
          Any questions, just reply to this email${company?.company_phone ? ` or call ${company.company_phone}` : ''}.
        </p>
      </div>`;

    const sender = clientFacingSender({
      companyName,
      companyEmail: company?.company_email,
      userEmail: user.email,
    });

    const result = await sendEmail({
      from: sender.from,
      replyTo: sender.replyTo,
      to: [recipientEmail],
      subject: `${heading} from ${companyName} — ${money(amount)}`,
      html,
      text: htmlToPlainText(html),
    });

    if (result.error) {
      console.error('send-finance-document: send failed', result.error);
      return new Response(JSON.stringify({ error: result.error.message }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('send-finance-document error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
