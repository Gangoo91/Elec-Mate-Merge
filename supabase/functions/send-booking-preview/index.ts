/**
 * TEMPORARY — a sample booking confirmation, sent to your own address.
 *
 * Exists so the template can be seen in a real inbox rather than described.
 * It renders the same `buildBookingConfirmationEmail` and the same `.ics` the
 * live `send-booking-confirmation` uses, against the caller's own company
 * profile, so what lands is exactly what a customer would get.
 *
 * It CANNOT be used to email anyone else: the destination is looked up from
 * `auth.users` for the supplied id and is never taken from the request. The
 * worst it can do is send a sample booking to the account holder.
 *
 * Delete once the template has been signed off.
 */

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { Resend, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { buildBookingConfirmationEmail } from '../_shared/email-templates/booking-confirmation.ts';
import { buildBookingIcs, bookingIcsFilename } from '../_shared/booking-ics.ts';

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { userId, variant } = (await req.json()) as {
      userId: string;
      variant?: 'confirm' | 'moved';
    };
    if (!userId) return json({ error: 'userId is required' }, 400);

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // The destination comes from the account, never from the caller.
    const { data: userRes, error: userErr } = await admin.auth.admin.getUserById(userId);
    const to = userRes?.user?.email;
    if (userErr || !to) return json({ error: 'No such user' }, 404);

    const { data: company } = await admin
      .from('company_profiles')
      .select('company_name, company_email, company_phone, company_website, logo_url, accent_color')
      .eq('user_id', userId)
      .maybeSingle();
    const { data: profile } = await admin
      .from('profiles')
      .select('full_name')
      .eq('id', userId)
      .maybeSingle();

    const companyName = company?.company_name || profile?.full_name || 'Your electrician';
    const moved = variant === 'moved';

    // A believable job, on a real future weekday, in UK local time.
    const base = new Date();
    base.setDate(base.getDate() + 7);
    while (base.getDay() === 0 || base.getDay() === 6) base.setDate(base.getDate() + 1);
    const startIso = new Date(
      Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate(), 8, 0, 0)
    ).toISOString();
    const endIso = new Date(
      Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate(), 11, 0, 0)
    ).toISOString();
    const wasStart = new Date(new Date(startIso).getTime() - 2 * 86_400_000).toISOString();
    const wasEnd = new Date(new Date(endIso).getTime() - 2 * 86_400_000).toISOString();

    const data = {
      company: {
        name: companyName,
        logoUrl: company?.logo_url ?? null,
        primaryColor: company?.accent_color ?? null,
        email: company?.company_email ?? null,
        phone: company?.company_phone ?? null,
        website: company?.company_website ?? null,
      },
      clientName: 'Patricia Hargreaves',
      title: 'EICR — full periodic inspection',
      startIso,
      endIso,
      allDay: false,
      location: '12 Elm Street, Cwmbran NP44 1AB',
      note: 'Full periodic inspection and test of the existing installation, plus the written report and any remedials priced up.',
      movedFrom: moved ? { startIso: wasStart, endIso: wasEnd, allDay: false } : null,
    };

    const icsFilename = bookingIcsFilename(data.title, startIso);
    const email = buildBookingConfirmationEmail({ ...data, icsFilename });
    const ics = buildBookingIcs({
      uid: `preview-${userId}@elec-mate.com`,
      title: data.title,
      startIso,
      endIso,
      allDay: false,
      location: data.location,
      description: data.note,
      organiserName: companyName,
      sequence: moved ? 1 : 0,
    });

    const sender = clientFacingSender({
      companyName,
      companyEmail: company?.company_email ?? null,
      userEmail: to,
    });

    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) return json({ error: 'RESEND_API_KEY (Brevo) not set' }, 500);

    const resend = new Resend(apiKey);
    const { data: sent, error } = await resend.emails.send({
      from: sender.from,
      replyTo: sender.replyTo,
      to,
      subject: `[PREVIEW] ${email.subject}`,
      html: email.html,
      text: htmlToPlainText(email.html),
      attachments: [
        { filename: icsFilename, content: btoa(unescape(encodeURIComponent(ics))) },
      ],
    });

    if (error) return json({ error: error.message }, 502);
    return json({ sent: true, to, variant: moved ? 'moved' : 'confirm', id: sent?.id ?? null });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : 'Internal error' }, 500);
  }
});
