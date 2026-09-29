/**
 * Tell the client their work has been notified to Building Control.
 *
 * One branded email from the electrician (their company name and logo, their
 * own address as Reply-To — the same shell as the certificate email): what
 * was notified, through whom, when, the reference if there is one, what
 * happens next, and — when the scheme's compliance certificate has been
 * attached in Elec-Mate — a button to it. It sets the client's expectation
 * that the compliance certificate arrives by post from the scheme, which is
 * the question electricians otherwise field for weeks.
 *
 * Body: { notificationId: string, recipientEmail?: string }
 * Auth: the signed-in electrician; the row must be theirs and submitted.
 */
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend, clientFacingSender, isSendableEmail } from '../_shared/mailer.ts';
import { buildPartPNotifiedEmail } from '../_shared/email-templates/part-p-notified.ts';
import { withSentry } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const TYPE_LABELS: Record<string, string> = {
  eic: 'Electrical Installation Certificate',
  'minor-works': 'Minor Works Certificate',
  'ev-charging': 'EV charging installation certificate',
  'solar-pv': 'Solar PV installation certificate',
};

serve(withSentry('send-part-p-client-notice', async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY') as string;
  const resendKey = Deno.env.get('RESEND_API_KEY');
  if (!resendKey) return json({ error: 'Email service not configured' }, 500);

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return json({ error: 'Not signed in' }, 401);
  const supabase = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
  if (userError || !user) return json({ error: 'Not signed in' }, 401);

  let body: { notificationId?: string; recipientEmail?: string } = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  if (!body.notificationId) return json({ error: 'notificationId is required' }, 400);

  // RLS scopes both reads to the signed-in electrician.
  const { data: n, error: nErr } = await supabase
    .from('part_p_notifications')
    .select(
      'id, report_id, notification_status, submitted_at, napit_submitted, niceic_submitted, local_authority_submitted, building_control_authority, scheme_certificate_ref, scheme_certificate_url, scheme_certificate_name'
    )
    .eq('id', body.notificationId)
    .maybeSingle();
  if (nErr || !n) return json({ error: 'Notification not found' }, 404);
  if (n.notification_status !== 'submitted') {
    return json({ error: 'Mark the notification as submitted first' }, 400);
  }

  const { data: r } = await supabase
    .from('reports')
    .select('certificate_number, client_name, installation_address, report_type, data->>clientEmail, data->>buildingRegsReference')
    .eq('report_id', n.report_id)
    .is('deleted_at', null)
    .maybeSingle();
  if (!r) return json({ error: 'Certificate not found' }, 404);

  // deno-lint-ignore no-explicit-any
  const rr = r as any;
  const recipient = (body.recipientEmail || rr.clientEmail || '').trim();
  if (!recipient || !isSendableEmail(recipient)) {
    return json({ error: 'The certificate has no client email address' }, 400);
  }

  const { data: cp } = await supabase
    .from('company_profiles')
    .select(
      'company_name, company_email, company_phone, company_website, company_address, vat_number, company_registration, logo_url, logo_data_url, primary_color, registration_scheme'
    )
    .eq('user_id', user.id)
    .maybeSingle();

  const schemeName = n.napit_submitted
    ? 'NAPIT'
    : n.niceic_submitted
      ? 'NICEIC'
      : n.local_authority_submitted
        ? null
        : (cp?.registration_scheme || '').trim() || 'our competent person scheme';

  const email = buildPartPNotifiedEmail({
    company: {
      name: (cp?.company_name || '').trim() || 'Your electrician',
      logoUrl: cp?.logo_url || cp?.logo_data_url || null,
      primaryColor: cp?.primary_color || null,
      email: cp?.company_email || null,
      phone: cp?.company_phone || null,
      website: cp?.company_website || null,
      address: cp?.company_address || null,
      vatNumber: cp?.vat_number || null,
      registrationNumber: cp?.company_registration || null,
    },
    clientName: rr.client_name || '',
    certificateNumber: rr.certificate_number || n.report_id,
    certificateType: TYPE_LABELS[rr.report_type] || 'electrical certificate',
    installationAddress: rr.installation_address,
    notifiedAt: n.submitted_at,
    schemeName,
    authorityName: n.building_control_authority,
    reference: n.scheme_certificate_ref || rr.buildingRegsReference || null,
    complianceCertificateUrl: n.scheme_certificate_url,
    complianceCertificateName: n.scheme_certificate_name,
  });

  const sender = clientFacingSender({
    companyName: cp?.company_name,
    companyEmail: cp?.company_email,
    userEmail: user.email,
  });
  const resend = new Resend(resendKey);
  const sent = await resend.emails.send({
    from: sender.from,
    to: recipient,
    replyTo: sender.replyTo,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });
  if (sent.error) return json({ error: sent.error.message || 'Email failed' }, 502);

  await supabase
    .from('part_p_notifications')
    .update({ client_notified_at: new Date().toISOString(), client_notified_to: recipient })
    .eq('id', n.id);

  return json({ ok: true, to: recipient });
}));
