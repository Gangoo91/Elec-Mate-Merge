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
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
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

    const {
      type,
      documentId,
      recipientEmail,
      recipientName,
      acceptLink,
      invoicePortalLink,
      attachmentBase64,
      attachmentName,
    } = await req.json();

    const emailOk = (e: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);

    // ── Purchase order → supplier (own branch; leaves quote/invoice untouched) ──
    if (type === 'purchase_order') {
      if (!documentId || !recipientEmail || !emailOk(recipientEmail)) {
        return new Response(
          JSON.stringify({ error: 'documentId and a valid recipientEmail required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const { data: order, error: orderErr } = await supabase
        .from('employer_material_orders')
        .select('*, supplier:employer_suppliers(name)')
        .eq('id', documentId)
        .single();
      if (orderErr || !order) {
        return new Response(JSON.stringify({ error: 'Purchase order not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { data: poCompany } = await supabase
        .from('company_profiles')
        .select('company_name, company_email, company_phone')
        .eq('user_id', user.id)
        .maybeSingle();
      const poCompanyName = poCompany?.company_name?.trim() || 'Your contractor';
      const deliver =
        order.delivery_mode === 'Collection'
          ? 'Collection from branch'
          : order.delivery_address || 'To be confirmed';
      const supplierName =
        (order as { supplier?: { name?: string } }).supplier?.name || recipientName || 'there';

      const poHtml = `
        <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
          <h2>Purchase order ${order.order_number}</h2>
          <p>Hi ${supplierName},</p>
          <p>Please find our purchase order attached${poCompany?.company_name ? ` from ${poCompany.company_name}` : ''}.</p>
          <div style="background: #f8f8f8; border-radius: 8px; padding: 16px 20px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #666;">Order total</p>
            <p style="margin: 4px 0 0; font-size: 28px; font-weight: 700;">${money(order.total)}</p>
            <p style="margin: 10px 0 0; font-size: 13px; color: #666;">
              ${order.delivery_mode === 'Collection' ? 'Collection' : 'Deliver to'}: ${deliver}
            </p>
          </div>
          <p style="color: #666; font-size: 13px;">
            Please confirm availability and lead time by replying to this email${poCompany?.company_phone ? ` or calling ${poCompany.company_phone}` : ''}.
          </p>
        </div>`;

      const poSender = clientFacingSender({
        companyName: poCompanyName,
        companyEmail: poCompany?.company_email,
        userEmail: user.email,
      });

      const poResult = await sendEmail({
        from: poSender.from,
        replyTo: poSender.replyTo,
        to: [recipientEmail],
        subject: `Purchase order ${order.order_number} from ${poCompanyName} — ${money(order.total)}`,
        html: poHtml,
        text: htmlToPlainText(poHtml),
        attachments: attachmentBase64
          ? [{ filename: attachmentName || `${order.order_number}.pdf`, content: attachmentBase64 }]
          : undefined,
      });

      if (poResult.error) {
        console.error('send-finance-document (PO): send failed', poResult.error);
        return new Response(JSON.stringify({ error: poResult.error.message }), {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Stamp the PO as sent (server is the source of truth for this).
      await supabase
        .from('employer_material_orders')
        .update({
          status: order.status === 'Draft' ? 'Sent' : order.status,
          sent_at: new Date().toISOString(),
          sent_to_email: recipientEmail,
        })
        .eq('id', documentId);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!['quote', 'invoice'].includes(type) || !documentId || !recipientEmail) {
      return new Response(
        JSON.stringify({ error: 'type, documentId and recipientEmail required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
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
      .select('company_name, company_email, company_phone, lead_page_slug, lead_page_enabled')
      .eq('user_id', user.id)
      .maybeSingle();

    const companyName = company?.company_name?.trim() || 'Your Electrician';
    // Turn every quote/invoice into a lead source: a subtle referral to the
    // sender's quote page (only if they've got one live).
    const referralHtml =
      company?.lead_page_enabled && company?.lead_page_slug
        ? `<p style="margin: 20px 0 0; font-size: 12px; color: #999;">Need another job doing, or know someone who does? <a href="https://elec-mate.com/get-quote/${company.lead_page_slug}" style="color: #666;">Get a quote &rarr;</a></p>`
        : '';
    const docNumber = doc[numberCol] || '';
    const cisAmount = Number(doc.cis_amount) || 0;
    const amount = Number(type === 'quote' ? doc.value : doc.amount) - cisAmount;
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
          <p style="margin: 0; font-size: 14px; color: #666;">${cisAmount > 0 ? 'Amount payable' : type === 'quote' ? 'Quote total' : 'Amount due'}</p>
          <p style="margin: 4px 0 0; font-size: 28px; font-weight: 700;">${money(amount)}</p>
          ${cisAmount > 0 ? `<p style="margin: 8px 0 0; font-size: 13px; color: #666;">After CIS deduction of ${money(cisAmount)}</p>` : ''}
          ${doc.reverse_charge ? `<p style="margin: 8px 0 0; font-size: 13px; color: #666;">VAT reverse charge applies — see the ${type} for details.</p>` : ''}
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
        ${referralHtml}
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
