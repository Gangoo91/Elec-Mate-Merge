/**
 * "Build me a website" (ELE-2022 add-on): an electrician with no website asks
 * Elec-Mate to build one. £199 set-up, then £39/month (12-month minimum).
 *
 *   POST { phone?, notes? }   (signed-in user)
 *
 * Interest only: nothing is charged here. The request is stored (one open
 * request per account) and founder@ gets an email to follow up and invoice.
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { sendWebsiteAlert } from '../_shared/website-alert.ts';
import { captureException } from '../_shared/sentry.ts';
import { corsHeaders } from '../_shared/cors.ts';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const jwt = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
    const { data: who } = jwt ? await supabase.auth.getUser(jwt) : { data: null };
    const user = who?.user;
    if (!user) return json({ error: 'Sign in again and retry.' }, 401);

    const body = await req.json().catch(() => ({}));
    const notes = typeof body.notes === 'string' ? body.notes.trim().slice(0, 1000) : '';

    // Already asked: say so rather than email twice
    const { data: open } = await supabase
      .from('website_build_requests')
      .select('id, created_at, origin, status')
      .eq('user_id', user.id)
      .in('status', ['new', 'contacted', 'paid', 'building', 'live'])
      .maybeSingle();
    // Already asked (or already paying): no second email
    if (open && (open.origin === 'interest' || open.status !== 'new')) {
      return json({ ok: true, already: true, requested_at: open.created_at });
    }

    const [{ data: cp }, { data: profile }] = await Promise.all([
      supabase
        .from('company_profiles')
        .select('company_name, company_email, company_phone, company_postcode')
        .eq('user_id', user.id)
        .maybeSingle(),
      supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle(),
    ]);
    const phone =
      (typeof body.phone === 'string' && body.phone.trim().slice(0, 30)) ||
      (cp?.company_phone as string | null) ||
      null;
    const email = (cp?.company_email as string | null) || user.email || null;
    const company = (cp?.company_name as string | null) || null;

    // They opened the payment page earlier but didn't pay: that row becomes the request
    const row = {
      company_name: company,
      contact_email: email,
      contact_phone: phone,
      notes: notes || null,
      origin: 'interest',
    };
    const { error: insErr } = open
      ? await supabase.from('website_build_requests').update(row).eq('id', open.id)
      : await supabase.from('website_build_requests').insert({ user_id: user.id, ...row });
    if (insErr) {
      // Two taps at once: the unique index caught the second
      if (insErr.code === '23505') return json({ ok: true, already: true });
      throw insErr;
    }

    const send = await sendWebsiteAlert({
      kind: 'interest',
      company,
      email,
      phone,
      notes: notes || null,
      userId: user.id,
    });
    // Stored either way; a failed alert goes to Sentry so it is never silently missed
    if (send.error) {
      await captureException(new Error(send.error.message), {
        functionName: 'website-build-request',
        extra: { step: 'alert email', user: user.id },
      });
    }

    return json({ ok: true });
  } catch (err) {
    console.error('[website-build-request] failed', err);
    await captureException(err, {
      functionName: 'website-build-request',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: "Couldn't send that. Try again in a moment." }, 500);
  }
});
