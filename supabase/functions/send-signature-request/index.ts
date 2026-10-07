import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { buildSignatureRequestEmail } from '../_shared/email-templates/signature-request.ts';
import { identifyCaller, deny } from '../_shared/caller.ts';

import { withSentry } from '../_shared/sentry.ts';
const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface SignatureEmailRequest {
  signatureRequestId: string;
  /** 'initial' = the first send, 'chase' = a reminder (rate-limited). */
  kind?: 'initial' | 'chase';
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

// What record_signature_send refuses, in words the office can act on.
const SEND_REFUSALS: Record<string, string> = {
  not_found: 'That request was not found.',
  not_open: 'This request is finished, so there is nothing to chase.',
  expired: 'The link has expired. Send a new request instead.',
  no_email: 'There is no email address for the signer. Copy the link and send it yourself.',
  limit_reached: 'This request has been chased five times. Give them a call instead.',
  already_sent: 'This request has already been emailed. Use Chase to send a reminder.',
  too_soon: 'You can chase once a day. Try again tomorrow, or copy the link and text it.',
};

const money = (v: unknown) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return null;
  return `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

/** Up to three facts for the email hero, from the frozen document copy. */
function factsFor(type: string | null, doc: Record<string, unknown> | null) {
  if (!doc) return null;
  const facts: Array<{ label: string; value: string }> = [];
  const push = (label: string, value: string | null | undefined) => {
    if (value) facts.push({ label, value });
  };
  switch (type) {
    case 'Quote':
    case 'Invoice':
      push(type, (doc.number as string) || null);
      push('Total', money(doc.total));
      break;
    case 'Variation': {
      const change = Number(doc.change);
      push('Price change', Number.isFinite(change) ? `${change >= 0 ? '+' : '−'}${money(Math.abs(change))}` : null);
      push('New total', money(doc.new_total));
      break;
    }
    case 'Handover':
      push('Job', (doc.job_title as string) || null);
      push(
        'Certificates',
        Array.isArray(doc.certificates) ? String((doc.certificates as unknown[]).length) : null
      );
      break;
    case 'Certificate':
      push('Certificate', (doc.number as string) || null);
      break;
    default:
      break;
  }
  return facts.length ? facts : null;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Who is asking? The anon key is a valid JWT, so check the caller: a
    // signed-in office user (rate-limited and firm-scoped by the database)
    // or the service role.
    const caller = await identifyCaller(req);
    if (!caller) return deny(corsHeaders);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { signatureRequestId, kind } = (await req.json()) as SignatureEmailRequest;
    if (!signatureRequestId || typeof signatureRequestId !== 'string') {
      return json({ error: 'signatureRequestId is required' }, 400);
    }
    const sendKind = kind === 'initial' ? 'initial' : 'chase';

    if (caller.kind === 'user') {
      // record_signature_send checks the caller can act for this firm, that
      // the request is still open, and the once-a-day chase limit, and
      // stamps the send. Runs as the caller so RLS and scope apply.
      const asCaller = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
        global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
        auth: { persistSession: false },
      });
      const { data: gate, error: gateError } = await asCaller.rpc('record_signature_send', {
        p_id: signatureRequestId,
        p_kind: sendKind,
      });
      if (gateError) return json({ error: 'Could not check this request.' }, 403);
      const refusal = (gate as { error?: string; next_allowed_at?: string } | null)?.error;
      if (refusal) {
        return json(
          {
            error: SEND_REFUSALS[refusal] ?? 'This request cannot be emailed.',
            code: refusal,
            next_allowed_at: (gate as { next_allowed_at?: string }).next_allowed_at ?? null,
          },
          refusal === 'too_soon' || refusal === 'limit_reached' ? 429 : 409
        );
      }
    }

    const { data: request, error: fetchError } = await supabase
      .from('signature_requests')
      .select(
        'id, user_id, signer_name, signer_email, access_token, document_title, document_type, document_snapshot, message, expires_at, created_by_name, status'
      )
      .eq('id', signatureRequestId)
      .single();

    if (fetchError || !request) return json({ error: 'Signature request not found' }, 404);
    if (!request.signer_email) return json({ error: SEND_REFUSALS.no_email, code: 'no_email' }, 409);
    if (!request.access_token) return json({ error: 'No signing link on this request' }, 409);
    if (!['Pending', 'Sent', 'Viewed'].includes(request.status)) {
      return json({ error: SEND_REFUSALS.not_open, code: 'not_open' }, 409);
    }

    const { data: companyProfile } = await supabase
      .from('company_profiles')
      .select(
        'company_name, logo_url, logo_data_url, primary_color, company_email, company_phone, company_website, company_address, vat_number, company_registration'
      )
      .eq('user_id', request.user_id)
      .maybeSingle();
    const { data: ownerProfile } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', request.user_id)
      .maybeSingle();

    const companyName =
      companyProfile?.company_name || ownerProfile?.full_name || 'Your electrician';
    const senderName = companyProfile?.company_name || request.created_by_name || companyName;
    const siteUrl = Deno.env.get('SITE_URL') || 'https://elec-mate.com';
    const signingUrl = `${siteUrl}/sign/${request.access_token}`;

    const sigPayload = buildSignatureRequestEmail({
      company: {
        name: companyName,
        logoUrl: companyProfile?.logo_url || companyProfile?.logo_data_url || null,
        primaryColor: companyProfile?.primary_color || null,
        email: companyProfile?.company_email || ownerProfile?.email || null,
        phone: companyProfile?.company_phone || null,
        website: companyProfile?.company_website || null,
        address: companyProfile?.company_address || null,
        vatNumber: companyProfile?.vat_number || null,
        registrationNumber: companyProfile?.company_registration || null,
      },
      signerName: request.signer_name,
      documentTitle: request.document_title,
      documentType: request.document_type,
      senderName,
      message: request.message,
      signingUrl,
      facts: factsFor(
        request.document_type,
        (request.document_snapshot as Record<string, unknown> | null) ?? null
      ),
      reminder: sendKind === 'chase',
      expiresAt: request.expires_at,
      trackingPixelUrl: `${supabaseUrl}/functions/v1/email-open?type=signature_request&id=${signatureRequestId}`,
    });

    const sender = clientFacingSender({
      companyName,
      companyEmail: companyProfile?.company_email,
      userEmail: ownerProfile?.email,
    });

    const { data: emailData, error: emailError } = await resend.emails.send({
      ...sender,
      to: [request.signer_email],
      subject: sigPayload.subject,
      html: sigPayload.html,
      text: htmlToPlainText(sigPayload.html),
    });

    if (emailError) {
      // The mailer returns a plain object, not an Error (JAVASCRIPT-REACT-75).
      throw new Error(
        `Signature request email failed: ${emailError.message || JSON.stringify(emailError)}`
      );
    }

    return json({ success: true, message: 'Email sent', emailId: emailData?.id });
  } catch (error: unknown) {
    console.error('Error in send-signature-request:', error);
    return json(
      { error: error instanceof Error ? error.message : 'Failed to send email' },
      500
    );
  }
};

serve(withSentry('send-signature-request', handler));
