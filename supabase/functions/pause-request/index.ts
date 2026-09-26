// pause-request — the link in the dormancy email that actually pauses it.
//
// Why this exists. On 24 Sep 2026 at 23:34 Richard Dawson replied to the
// dormancy email: "If you could pause for a couple of months so I can get back
// on my feet please. Been off due to medical reasons so struggling a bit."
// That email had offered, in those words, "If you'd rather pause it for a
// month or two, say so and I'll sort it". Nobody saw the reply in time. His
// subscription ended eight hours later, at 07:30 the next morning.
//
// A reply triggers nothing. The only thing catching those asks was a human
// reading the inbox, which is the same failure as ELE-1743 (an unsubscribe
// sent by reply is never actioned). So the offer stops being a promise to act
// on a reply and becomes a link that does the thing.
//
// GET /pause-request?t=<token>&m=<1|2|3>
//   Returns an HTML page, because this is opened from a mail client by
//   someone who may not be signed in and should never see JSON.
//
// The token is the authorisation. It is minted per dormancy send and stored in
// public.pause_requests, which is service-role only — a signed-in client must
// not be able to read another user's token and pause their subscription.
//
// Stripe subscriptions are paused here and now. App Store and Play billing we
// cannot touch, so those are recorded as `needs_action` for a human and the
// page tells the customer the truth about where their switch is. That is still
// infinitely better than a reply nobody reads.
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { Resend, htmlToPlainText } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const FOUNDER = 'founder@elec-mate.com';
const FROM = 'Elec-Mate <founder@elec-mate.com>';
const MAX_MONTHS = 3;

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** A plain page in the house colours. No app shell, no login, no JS. */
function page(title: string, body: string, status = 200): Response {
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} — Elec-Mate</title>
<style>
  body{margin:0;background:#0C1B2A;color:#fff;font:16px/1.65 -apple-system,'Segoe UI',Arial,sans-serif;
       display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px}
  .card{max-width:520px;width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);
        border-radius:16px;padding:28px}
  h1{margin:0 0 14px;font-size:22px;line-height:1.3}
  p{margin:0 0 14px;color:#fff}
  a.btn{display:inline-block;margin-top:8px;padding:13px 22px;border-radius:10px;background:#F3B70A;
        color:#0C1B2A;text-decoration:none;font-weight:700}
  .sub{color:rgba(255,255,255,.72);font-size:14px}
</style></head><body><div class="card"><h1>${esc(title)}</h1>${body}</div></body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

Deno.serve(async (req: Request): Promise<Response> => {
  try {
    const url = new URL(req.url);
    const token = (url.searchParams.get('t') ?? '').trim();
    const months = Math.min(
      Math.max(parseInt(url.searchParams.get('m') ?? '1', 10) || 1, 1),
      MAX_MONTHS
    );

    if (!token) {
      return page(
        'That link is incomplete',
        `<p>Reply to the email and Andrew will sort it by hand.</p>`,
        400
      );
    }

    const db = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const { data: reqRow } = await db
      .from('pause_requests')
      .select('id, user_id, status, months, resumes_at')
      .eq('token', token)
      .maybeSingle();

    if (!reqRow) {
      return page(
        'We could not find that link',
        `<p>It may have been superseded by a newer email. Reply to Andrew and he'll sort it by hand.</p>`,
        404
      );
    }

    // Idempotent: mail clients pre-fetch links, and people click twice.
    // Pausing a second time would silently extend the pause they chose.
    if (reqRow.status === 'applied') {
      const until = reqRow.resumes_at
        ? new Date(reqRow.resumes_at).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : null;
      return page(
        'Already paused',
        `<p>Your subscription is paused${until ? ` until <strong>${esc(until)}</strong>` : ''}. Nothing is being charged.</p>
         <p class="sub">Everything you've saved stays exactly where it is. Reply to Andrew's email any time to change it.</p>`
      );
    }
    if (reqRow.status === 'needs_action') {
      return page(
        'Andrew is on it',
        `<p>Your request is with Andrew and he'll come back to you.</p>`
      );
    }

    const { data: profile } = await db
      .from('profiles')
      .select('id, full_name, subscription_source, subscribed')
      .eq('id', reqRow.user_id)
      .maybeSingle();
    const { data: authUser } = await db.auth.admin.getUserById(reqRow.user_id);
    const email = authUser?.user?.email ?? null;
    const firstName = (profile?.full_name ?? '').trim().split(/\s+/)[0] || 'there';

    const resumesAt = new Date();
    resumesAt.setMonth(resumesAt.getMonth() + months);
    const untilLabel = resumesAt.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // ── Store billing: not ours to pause. Say so, and get a human on it. ──
    if (
      profile?.subscription_source === 'app_store' ||
      profile?.subscription_source === 'play_store'
    ) {
      const store = profile.subscription_source === 'play_store' ? 'Google Play' : 'the App Store';
      await db
        .from('pause_requests')
        .update({
          status: 'needs_action',
          months,
          used_at: new Date().toISOString(),
          detail: { reason: 'store_billing', store: profile.subscription_source, email },
        })
        .eq('id', reqRow.id);

      try {
        const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
        const html = `<p><strong>${esc(profile.full_name ?? email ?? reqRow.user_id)}</strong> asked to pause for ${months} month${months > 1 ? 's' : ''}.</p>
          <p>They pay through ${esc(store)}, so we cannot pause the billing. They have been told to turn auto-renew off and that nothing is lost.</p>
          <p>Email: ${esc(email ?? 'unknown')}</p>`;
        await resend.emails.send({
          from: FROM,
          to: FOUNDER,
          subject: `Pause requested (${store}) — ${profile.full_name ?? email ?? 'a customer'}`,
          html,
          text: htmlToPlainText(html),
        });
      } catch {
        /* the row is the record that matters; the email is a convenience */
      }

      return page(
        `${firstName}, here's the one bit I can't do for you`,
        `<p>You pay through ${esc(store)}, and Apple and Google don't let us pause their billing from our side.</p>
         <p>Turn auto-renew off in your ${esc(store)} subscriptions and you won't be charged again. <strong>Nothing is lost</strong> — your certificates and everything else stay exactly where they are, and you can come back whenever you're ready.</p>
         <p class="sub">Andrew has been told you asked, and he'll follow up.</p>`
      );
    }

    // ── Stripe: pause it now. ────────────────────────────────────────────
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2023-10-16',
    });
    const { data: prof2 } = await db
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', reqRow.user_id)
      .maybeSingle();

    let subscriptionId: string | null = null;
    if (prof2?.stripe_customer_id) {
      const subs = await stripe.subscriptions.list({
        customer: prof2.stripe_customer_id,
        status: 'active',
        limit: 3,
      });
      subscriptionId = subs.data[0]?.id ?? null;
    }

    if (!subscriptionId) {
      // Nothing live to pause — already cancelled, lapsed, or store-managed
      // under a source we did not detect. Never pretend it worked.
      await db
        .from('pause_requests')
        .update({
          status: 'needs_action',
          months,
          used_at: new Date().toISOString(),
          detail: { reason: 'no_active_stripe_subscription', email },
        })
        .eq('id', reqRow.id);
      try {
        const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
        const html = `<p><strong>${esc(profile?.full_name ?? email ?? reqRow.user_id)}</strong> clicked pause (${months} month${months > 1 ? 's' : ''}) but has no active Stripe subscription to pause.</p><p>Email: ${esc(email ?? 'unknown')}</p>`;
        await resend.emails.send({
          from: FROM,
          to: FOUNDER,
          subject: `Pause requested, nothing to pause — ${profile?.full_name ?? email ?? 'a customer'}`,
          html,
          text: htmlToPlainText(html),
        });
      } catch {
        /* row is the record */
      }
      return page(
        `${firstName}, Andrew will pick this up`,
        `<p>There's no live subscription on your account to pause right now, so I haven't changed anything.</p>
         <p>Andrew has been told and he'll come back to you.</p>`
      );
    }

    // behavior:'void' — invoices raised during the pause are voided rather
    // than collected later. 'keep_as_draft' would hand them a bill for the
    // months they deliberately skipped, which is the opposite of the offer.
    await stripe.subscriptions.update(subscriptionId, {
      pause_collection: { behavior: 'void', resumes_at: Math.floor(resumesAt.getTime() / 1000) },
      metadata: {
        paused_via: 'pause-request-link',
        pause_months: String(months),
        pause_requested_at: new Date().toISOString(),
      },
    });

    // Stripe leaves `status` as 'active' on a paused subscription, so close the
    // access window here rather than waiting for the webhook to notice.
    await db.from('profiles').update({ subscribed: false }).eq('id', reqRow.user_id);

    await db
      .from('pause_requests')
      .update({
        status: 'applied',
        months,
        used_at: new Date().toISOString(),
        resumes_at: resumesAt.toISOString(),
        detail: { subscription_id: subscriptionId, email },
      })
      .eq('id', reqRow.id);

    try {
      const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
      const html = `<p><strong>${esc(profile?.full_name ?? email ?? reqRow.user_id)}</strong> paused for ${months} month${months > 1 ? 's' : ''} — resumes ${esc(untilLabel)}.</p><p>Email: ${esc(email ?? 'unknown')}</p>`;
      await resend.emails.send({
        from: FROM,
        to: FOUNDER,
        subject: `Paused ${months}m — ${profile?.full_name ?? email ?? 'a customer'}`,
        html,
        text: htmlToPlainText(html),
      });
    } catch {
      /* row is the record */
    }

    return page(
      `Done, ${firstName} — paused until ${untilLabel}`,
      `<p>Nothing will be charged between now and then, and you won't be billed for the months you've skipped.</p>
       <p><strong>Everything you've saved stays exactly where it is</strong> — certificates, customers, the lot. It'll all be there when you come back.</p>
       <p class="sub">It picks up again on ${esc(untilLabel)}. If you need longer, reply to Andrew's email and he'll extend it.</p>`
    );
  } catch (error) {
    await captureException(error, {
      functionName: 'pause-request',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return page(
      'Something went wrong at our end',
      `<p>Nothing has been changed on your account. Reply to Andrew's email and he'll sort it by hand.</p>`,
      500
    );
  }
});
