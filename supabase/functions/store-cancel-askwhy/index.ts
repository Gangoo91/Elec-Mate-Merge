// store-cancel-askwhy — the survey App Store / Play Store users never see.
//
// Store users cancel in store settings, so the in-app cancel flow (and its
// reasons) never fires for them. billing_events data (Aug 2026): 56% of store
// trial starts turn auto-renew off, 40 of 62 during days 1–7 of the trial —
// and there have been ZERO UNCANCELLATIONs ever, because nothing reaches
// them while they still have access. This sends one personal ask-why email
// from Andrew ~1–24h after the CANCELLATION event, while re-enabling
// auto-renew is still a one-tap action in their store settings.
//
// Cron: hourly. Window: cancellations older than 1 hour (cooling-off — a
// fat-finger cancel often gets undone immediately) and younger than 25 hours
// (each run overlaps the previous hour; dedupe makes that safe).
// Skips: UNCANCELLATION since the cancel, already-emailed (trial_emails_sent
// email_type 'store_cancel_askwhy', ever), suppressed addresses, no email.
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend, htmlToPlainText } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const EMAIL_TYPE = 'store_cancel_askwhy';

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildEmail(firstName: string, isTrial: boolean, store: string) {
  const storeName = store === 'PLAY_STORE' ? 'Google Play' : 'the App Store';
  const storePath =
    store === 'PLAY_STORE'
      ? 'Play Store → profile → Payments &amp; subscriptions'
      : 'Settings → your name → Subscriptions';
  const opener = isTrial
    ? `I saw your Elec-Mate trial is set not to renew — no problem at all, and your access runs to the end of the trial either way.`
    : `I saw your Elec-Mate subscription is set not to renew — no problem at all, and everything keeps working until the end of your billing period.`;
  const ask = isTrial
    ? `Before it lapses, can I ask what stopped you? One line back is genuinely useful:`
    : `Before it lapses, can I ask what changed? One line back is genuinely useful:`;

  const html = `
    <div style="font-family: -apple-system, 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 8px 4px; color:#1a1a1a; font-size:15px; line-height:1.65;">
      <p style="margin:0 0 14px;">Hi${firstName ? ` ${esc(firstName)}` : ''},</p>
      <p style="margin:0 0 14px;">${opener}</p>
      <p style="margin:0 0 8px;">${ask}</p>
      <ul style="margin:0 0 14px; padding-left:20px;">
        <li>Too expensive?</li>
        <li>Missing something you needed?</li>
        <li>Hit a bug or couldn't get set up?</li>
        <li>Just having a look?</li>
      </ul>
      <p style="margin:0 0 14px;">Just hit reply — it comes straight to me and I read every one. If something was broken or missing, there's a decent chance I can fix it this week.</p>
      <p style="margin:0 0 14px; color:#555555; font-size:13.5px;">And if you change your mind, flipping auto-renew back on in ${storePath} keeps your account exactly as it is — certs, history, the lot.</p>
      <p style="margin:0;">Cheers,<br/>Andrew<br/><span style="color:#555555; font-size:13px;">Founder, Elec-Mate (${esc(storeName)} subscription)</span></p>
    </div>`;
  return html;
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const authHeader = req.headers.get('Authorization') ?? '';
    if (!serviceKey || authHeader !== `Bearer ${serviceKey}`) {
      return new Response(JSON.stringify({ error: 'Not authorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const db = createClient(Deno.env.get('SUPABASE_URL') ?? '', serviceKey, {
      auth: { persistSession: false },
    });

    const now = Date.now();
    const from = new Date(now - 25 * 3600_000).toISOString();
    const to = new Date(now - 1 * 3600_000).toISOString();

    const { data: cancels, error: qErr } = await db
      .from('billing_events')
      .select('user_id, store, product_id, period_type, created_at')
      .eq('event_type', 'CANCELLATION')
      .gte('created_at', from)
      .lte('created_at', to)
      .order('created_at', { ascending: true });
    if (qErr) throw qErr;

    const seen = new Set<string>();
    let sent = 0;
    let skipped = 0;
    const details: string[] = [];

    for (const c of cancels ?? []) {
      if (!c.user_id || seen.has(c.user_id)) continue;
      seen.add(c.user_id);

      // Re-enabled auto-renew since cancelling? Then there is nothing to ask.
      const { data: uncancel } = await db
        .from('billing_events')
        .select('id')
        .eq('event_type', 'UNCANCELLATION')
        .eq('user_id', c.user_id)
        .gte('created_at', c.created_at)
        .limit(1);
      if (uncancel && uncancel.length > 0) {
        skipped++;
        continue;
      }

      // One ask-why per user, ever — a repeat cancel does not earn a repeat ask.
      const { data: already } = await db
        .from('trial_emails_sent')
        .select('id')
        .eq('user_id', c.user_id)
        .eq('email_type', EMAIL_TYPE)
        .limit(1);
      if (already && already.length > 0) {
        skipped++;
        continue;
      }

      const { data: au } = await db.auth.admin.getUserById(c.user_id);
      const email = au?.user?.email ?? null;
      if (!email) {
        skipped++;
        continue;
      }

      const { data: suppressed } = await db
        .from('email_suppressions')
        .select('email')
        .eq('email', email.toLowerCase())
        .limit(1);
      if (suppressed && suppressed.length > 0) {
        skipped++;
        continue;
      }

      const { data: prof } = await db
        .from('profiles')
        .select('full_name')
        .eq('id', c.user_id)
        .maybeSingle();
      const firstName = (prof?.full_name ?? '').trim().split(/\s+/)[0] ?? '';

      const isTrial = c.period_type === 'TRIAL';
      const html = buildEmail(firstName, isTrial, c.store ?? '');

      const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
      const { error: mailErr } = await resend.emails.send({
        from: 'Andrew at Elec-Mate <founder@elec-mate.com>',
        to: email,
        subject: firstName ? `${firstName} — quick one before it lapses` : 'Quick one before it lapses',
        html,
        text: htmlToPlainText(html),
      });
      if (mailErr) {
        console.warn(`[askwhy] send failed for ${c.user_id}:`, mailErr.message);
        skipped++;
        continue;
      }

      await db.from('trial_emails_sent').insert({ user_id: c.user_id, email_type: EMAIL_TYPE });
      sent++;
      details.push(`${email} (${isTrial ? 'trial' : c.period_type ?? 'unknown'})`);
    }

    console.log(`[askwhy] sent=${sent} skipped=${skipped} of ${cancels?.length ?? 0} cancellations`);
    return new Response(JSON.stringify({ success: true, sent, skipped, details }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, {
      functionName: 'store-cancel-askwhy',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'askwhy failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
