/**
 * quote-propose-date — offer the client a different start date.
 *
 * ELE-1562 Part 2, reported by Dan (DP Power Solutions): "when they select a
 * date and we can't do that date, how to send out the alternative date to be
 * able to confirm the booking with the customer."
 *
 * Before this the electrician had exactly two moves on a start-date request:
 * confirm the day the client picked, or ring them. There was no way to say no
 * and counter, so the negotiation left the product entirely.
 *
 * The quote already carried the two ends of this conversation —
 * `requested_start_date` (what the client asked for) and `booked_slot_start` +
 * `booking_calendar_event_id` (what was agreed). This fills in the middle:
 * offered, not yet accepted.
 *
 * Writes the proposal, emails the client a link back to the same public
 * booking page, and leaves the diary untouched — nothing is committed until
 * the client accepts.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { buildBookingDateProposalEmail } from '../_shared/email-templates/booking-date-proposal.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { quoteId, proposedDate, note } = await req.json();

    if (!quoteId || !proposedDate) {
      return new Response(JSON.stringify({ error: 'quoteId and proposedDate are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(proposedDate)) {
      return new Response(JSON.stringify({ error: 'proposedDate must be YYYY-MM-DD' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    /*
     * Two clients: one bound to the caller's JWT to establish WHO is asking,
     * and the service-role one to read the company profile and write. The
     * ownership check below is what stops anyone proposing a date on someone
     * else's quote — this function must never trust `quoteId` alone.
     */
    const authHeader = req.headers.get('Authorization') ?? '';
    const userClient = createClient(
      Deno.env.get('SUPABASE_URL') as string,
      Deno.env.get('SUPABASE_ANON_KEY') as string,
      { global: { headers: { Authorization: authHeader } } }
    );
    const {
      data: { user },
    } = await userClient.auth.getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') as string,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
    );

    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .select(
        'id, user_id, quote_number, public_token, client_data, requested_start_date, booked_slot_start'
      )
      .eq('id', quoteId)
      .maybeSingle();

    if (quoteError || !quote) {
      return new Response(JSON.stringify({ error: 'Quote not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (quote.user_id !== user.id) {
      return new Response(JSON.stringify({ error: 'Not your quote' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (quote.booked_slot_start) {
      return new Response(
        JSON.stringify({ error: 'This job already has a confirmed start date' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Record the proposal first. If the email fails the offer still stands and
    // the electrician can resend — losing the record because a mail server was
    // slow would be the worse failure.
    const { error: updateError } = await supabase
      .from('quotes')
      .update({
        proposed_start_date: proposedDate,
        proposed_at: new Date().toISOString(),
        proposed_note: typeof note === 'string' && note.trim() ? note.trim() : null,
      })
      .eq('id', quoteId)
      .eq('user_id', user.id);

    if (updateError) throw updateError;

    // ── Email the client ─────────────────────────────────────────────────
    const clientData = (quote.client_data ?? {}) as Record<string, unknown>;
    const clientEmail = String(clientData.email ?? '').trim();
    const clientName = String(clientData.name ?? '').trim() || 'there';

    if (!clientEmail) {
      // Saved, but there is nobody to tell. The UI surfaces this so the
      // electrician knows to ring them instead of assuming it went out.
      return new Response(
        JSON.stringify({ success: true, emailed: false, reason: 'no_client_email' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: companyProfile } = await supabase
      .from('company_profiles')
      .select('*')
      .eq('user_id', quote.user_id)
      .maybeSingle();

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ success: true, emailed: false, reason: 'email_not_configured' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const confirmUrl = quote.public_token
      ? `https://www.elec-mate.com/public-quote/${quote.public_token}`
      : `https://www.elec-mate.com/book/${quote.user_id}?quote=${quote.id}`;

    const email = buildBookingDateProposalEmail({
      company: {
        name: companyProfile?.company_name || 'Your electrician',
        logoUrl: companyProfile?.logo_url || companyProfile?.logo_data_url || null,
        primaryColor: companyProfile?.primary_color || null,
        address: companyProfile?.company_address || null,
        phone: companyProfile?.company_phone || null,
        email: companyProfile?.company_email || null,
        website: companyProfile?.company_website || null,
        vatNumber: companyProfile?.vat_number || null,
        registrationNumber: companyProfile?.company_registration || null,
      },
      clientName,
      quoteNumber: quote.quote_number || 'your quote',
      requestedDate: quote.requested_start_date || '',
      proposedDate,
      note: typeof note === 'string' ? note : null,
      confirmUrl,
      trackingPixelUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/email-open?type=date_proposal&id=${quoteId}`,
    });

    const resend = new Resend(resendApiKey);
    const sender = clientFacingSender({
      companyName: companyProfile?.company_name,
      companyEmail: companyProfile?.company_email,
    });

    const { error: emailError } = await resend.emails.send({
      ...sender,
      to: clientEmail,
      subject: email.subject,
      html: email.html,
      text: htmlToPlainText(email.html),
    });

    if (emailError) {
      console.error('Date proposal email failed:', emailError);
      // 200, not 500: the proposal IS saved. Telling the UI the whole thing
      // failed would invite a second proposal and a duplicate email.
      return new Response(
        JSON.stringify({ success: true, emailed: false, reason: 'email_failed' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ success: true, emailed: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('quote-propose-date failed:', error);
    await captureException(error, { functionName: 'quote-propose-date' });
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to propose date' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
