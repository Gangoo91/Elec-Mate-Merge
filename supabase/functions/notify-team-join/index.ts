// notify-team-join
//
// Fired by the seat-activation trigger (tg_employer_employee_seat) whenever a
// worker's seat flips pending -> active — i.e. someone actually JOINED a team,
// on ANY path (new-user accept, existing-user accept, or email-match auto-link).
// Sends the founder alert so every £9.99/mo seat is visible.
//
// verify_jwt = false: called by the DB via net.http_post with the service-role
// key in the Authorization header (checked below).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import { corsHeaders } from '../_shared/cors.ts';
import { sendEmail } from '../_shared/mailer.ts';

const FOUNDER_EMAIL = 'andrewgangoo91@gmail.com';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const bearer = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '');
    if (!serviceKey || bearer !== serviceKey) {
      return new Response(JSON.stringify({ error: 'forbidden' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { employer_id, person_name } = await req.json();
    if (!employer_id) {
      return new Response(JSON.stringify({ error: 'employer_id required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const admin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      serviceKey
    );
    const { data: cp } = await admin
      .from('company_profiles')
      .select('company_name')
      .eq('user_id', employer_id)
      .maybeSingle();
    const { data: prof } = await admin
      .from('profiles')
      .select('free_access_granted')
      .eq('id', employer_id)
      .maybeSingle();

    const company = (cp?.company_name as string | undefined)?.trim() || 'An employer';
    const person = (person_name as string | undefined)?.trim() || 'A worker';
    // Comped employers don't generate seat revenue — say so, so the alert is honest.
    const seatLine = prof?.free_access_granted
      ? '+ seat (comped — no charge)'
      : '+ £9.99/mo seat';

    await sendEmail({
      from: 'Elec-Mate <founder@elec-mate.com>',
      to: [FOUNDER_EMAIL],
      subject: `🔗 Employer team link — ${person} joined ${company} (${prof?.free_access_granted ? 'comped' : '£9.99/mo seat'})`,
      html: `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:520px;margin:0 auto;background:#F4F6F9;padding:28px;border-radius:16px;color:#1B2733;">
        <p style="margin:0 0 6px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#F3B70A;font-weight:700;">Employer team link</p>
        <h2 style="margin:0 0 10px;font-size:19px;color:#1B2733;">${person} joined ${company}'s team</h2>
        <p style="margin:0 0 4px;font-size:14px;color:#51606F;line-height:1.6;">A worker accepted their invite and linked to <strong>${company}</strong> on Elec-Mate.</p>
        <p style="margin:10px 0 0;font-size:15px;color:#1E5B34;font-weight:700;">${seatLine}</p>
      </div>`,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('notify-team-join error:', error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
