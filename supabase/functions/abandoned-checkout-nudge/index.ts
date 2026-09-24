// abandoned-checkout-nudge — someone made an account and never put a card in.
// Offer them 30% off their first six months and ask what stopped them.
//
// Why this exists (24 Sep 2026). The abandoned-checkout chase had two stages
// and only the second was automated:
//
//   * the FIRST email is an admin-panel button in send-incomplete-signup,
//     pressed by hand — last used 30 Aug 2026;
//   * the NUDGE is cron `incomplete-signup-v11-nudge`, 07:20 daily, whose
//     cohort is "people the first email already reached, who have not been
//     nudged yet".
//
// So from 30 Aug the cron ran green every single morning and sent nothing,
// because there was never anyone in its window. 53 people abandoned in the
// fortnight to 24 Sep and not one of them was contacted. A job that reports
// success while doing nothing is worse than a job that fails.
//
// This replaces the manual first touch with an automatic one, so the funnel
// cannot go quiet again without the cohort count going to zero for a real
// reason.
//
// The offer (Andrew, 24 Sep: "offer them 30% in the app... on both"): Stripe
// coupon FIRSTGO30, 30% off for six months, on BOTH plans —
// £19.99 → £13.99 electrician, £6.99 → £4.89 apprentice. It is delivered as a
// Stripe payment link with the promo code pre-filled, the same mechanism the
// win-back sequence uses, rather than a link into the app: `?offer=` is only
// read on the SIGN-UP page, and every one of these people already has an
// account, so an in-app offer link would be silently worthless to them.
//
// Cohort: public.get_abandoned_checkout_users() — never subscribed, not free
// access, not admin-created, old enough to have decided, never reached by the
// v11 emails or by this one, not suppressed. `reached_checkout` distinguishes
// someone who saw the card form and bailed from someone who never got there,
// and the copy differs accordingly.
//
// Safety: a POST with no body (or without `send: true`) is a DRY RUN. `{ test:
// true, email }` sends one preview. `{ send: true, limit }` sends for real,
// newest first, capped by `limit` (default 40) so a 689-person backlog can be
// released in controlled batches rather than one burst that torches the domain
// reputation the 23 Sep send just earned.
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend, htmlToPlainText } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const EMAIL_TYPE = 'abandoned_checkout';
const FROM = 'Andrew at Elec-Mate <founder@elec-mate.com>';
const MOBILE = '07507 241303';
const DEFAULT_LIMIT = 40;
const PROMO = 'FIRSTGO30';

/**
 * Payment links created 24 Sep 2026, both with a 7-day trial and promotion
 * codes enabled so `prefilled_promo_code` applies without the user typing it.
 * Prices are stated in the copy from these constants, not hard-coded in the
 * sentence, because the win-back banner on the subscriptions page advertised
 * £4.99 and £16.99 for months after the real prices moved.
 */
const PLAN = {
  electrician: {
    link: 'https://buy.stripe.com/28E7sE3ou5365Q5d3EbjW0l',
    was: '£19.99',
    now: '£13.99',
    // 6 × £13.99. Stated because a monthly price is easy to wave away and a
    // total is easy to weigh against one job.
    sixMonths: '£83.94',
    // Deliberately understated: a domestic EICR is commonly £150–£300, so
    // "covers it" is true at the bottom of that range and cannot be argued with.
    anchor: `One EICR covers all six months, with change.`,
    bullets: [
      `Every certificate on your phone — EICR, EIC, Minor Works, EV, solar, fire alarm, PAT. Branded PDF to the customer before you've left the drive.`,
      `A board scanner that photographs the consumer unit and fills in your schedule of tests.`,
      `Quotes and invoices with payment links, and reminders that chase the customer so you don't have to.`,
      `59 calculators and an AI that knows BS 7671 — cable sizing, Zs, R1+R2, adiabatic, diversity.`,
      `Certificate expiry tracking, so next year's re-inspection comes back to you instead of the next spark.`,
    ],
  },
  apprentice: {
    link: 'https://buy.stripe.com/28EdR29MS9jm3HXaVwbjW0m',
    was: '£6.99',
    now: '£4.89',
    sixMonths: '£29.34',
    anchor: `That's less than one revision book, for the whole six months.`,
    bullets: [
      `Every unit, outcome and criterion your qualification needs, with your evidence marked against it.`,
      `Off-the-job hours logged as you go — videos and quizzes count automatically, and export for your college.`,
      `400+ UK training videos and 20,000+ practice questions.`,
      `18th Edition and AM2 preparation, with timed mock exams.`,
      `Fire alarm course checked line by line against BS 5839-1:2025.`,
    ],
  },
} as const;

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Stamp a Stripe Payment Link with the buyer's identity.
 *
 * `stripe-subscription-webhook` reads `client_reference_id` FIRST on
 * checkout.session.completed, so this links the payment to the correct account
 * even when they pay with a different email at the till. Without it Stripe
 * creates a customer from whatever they type, the webhook cannot match it to
 * an account, and they pay while staying locked behind the paywall.
 *
 * That is not hypothetical. Three of the ten people who bought through the
 * win-back payment links used an email that was not their account email
 * (Lee Jones paid as leejones197795@ on a laj.electrics@ account; Andi Gjoka
 * paid from icloud on a gmail account). They only got in because the win-back
 * templates stamp their links — `_shared/winback-v12.ts → withIdentity`, which
 * carries the same warning after the same bug stranded paying customers once
 * already. `prefilled_email` nudges them onto the account address too, which
 * also avoids creating a duplicate Stripe customer.
 */
function withIdentity(url: string, userId: string, accountEmail: string | null): string {
  if (!userId || !url.includes('buy.stripe.com')) return url;
  const sep = url.includes('?') ? '&' : '?';
  let stamped = `${url}${sep}client_reference_id=${encodeURIComponent(userId)}`;
  if (accountEmail) stamped += `&prefilled_email=${encodeURIComponent(accountEmail)}`;
  return stamped;
}

function buildEmail(r: {
  user_id?: string;
  email?: string;
  full_name: string | null;
  role: string;
  reached_checkout: boolean;
}): {
  subject: string;
  html: string;
} {
  const firstName = (r.full_name ?? '').trim().split(/\s+/)[0] ?? '';
  const name = firstName || 'mate';
  const plan = r.role === 'apprentice' ? PLAN.apprentice : PLAN.electrician;
  const link = withIdentity(
    `${plan.link}?prefilled_promo_code=${PROMO}`,
    r.user_id ?? '',
    r.email ?? null
  );

  // Someone who reached the card form and stopped made a decision; someone who
  // never got there may simply not have looked yet. Pretending we cannot tell
  // the difference wastes the one bit of information we have about them.
  const opener = r.reached_checkout
    ? `You got as far as the payment page on Elec-Mate and stopped. Completely fair — it's another monthly bill and you'd not seen it working yet.`
    : `You made an Elec-Mate account and never got started. Completely fair — most people sign up meaning to look properly and then a week on site happens.`;

  // The people who got the 23 Sep ask-why email were LAPSED customers who had
  // already used the product, so a bare question worked on them. These people
  // have never seen it do anything. Telling them the price without telling
  // them what they are buying is asking them to decide on nothing, so the
  // value goes in — as specifics they can picture, not adjectives.
  const bullets = plan.bullets.map((b) => `<li style="margin:0 0 8px;">${esc(b)}</li>`).join('');

  const html = `
    <div style="font-family: -apple-system, 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 8px 4px; color:#1a1a1a; font-size:15px; line-height:1.65;">
      <p style="margin:0 0 14px;">Hi ${esc(name)},</p>
      <p style="margin:0 0 14px;">It's Andrew, the electrician who built Elec-Mate.</p>
      <p style="margin:0 0 14px;">${esc(opener)}</p>
      <p style="margin:0 0 14px;">So here's <strong>30% off your first six months</strong> — ${esc(plan.now)} a month instead of ${esc(plan.was)}. That's ${esc(plan.sixMonths)} for the six months. ${esc(plan.anchor)}</p>
      <p style="margin:0 0 10px;">What you'd be getting for it:</p>
      <ul style="padding-left:20px; margin:0 0 16px;">${bullets}</ul>
      <p style="margin:0 0 14px;">Seven days free before anything is charged, and you can cancel in two taps. I'll email you the day before any payment, so you're never surprised by it.</p>
      <p style="margin:0 0 14px;"><a href="${esc(link)}" style="color:#1a1a1a;"><strong>Start with 30% off</strong></a> — the discount is already on the page, nothing to type in.</p>
      <p style="margin:0 0 14px;">And if it wasn't the price that stopped you, tell me what it was. That's worth more to me than the sale. One line back is plenty, or my mobile is ${MOBILE}.</p>
      <p style="margin:0;">Cheers,<br/>Andrew<br/><span style="color:#555555; font-size:13px;">Founder, Elec-Mate</span></p>
    </div>`;

  const subject = firstName ? `${firstName} — 30% off, if that helps` : '30% off, if that helps';
  return { subject, html };
}

interface Row {
  user_id: string;
  full_name: string | null;
  role: string;
  email: string;
  created_at: string;
  reached_checkout: boolean;
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

    let body: {
      test?: boolean;
      email?: string;
      role?: string;
      send?: boolean;
      limit?: number;
      min_age_hours?: number;
      not_before?: string;
    } = {};
    try {
      body = await req.json();
    } catch {
      // no body → dry run
    }

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

    if (body.test && body.email) {
      const { subject, html } = buildEmail({
        user_id: '00000000-0000-0000-0000-000000000000',
        email: body.email,
        full_name: 'Andrew Moore',
        role: body.role === 'apprentice' ? 'apprentice' : 'electrician',
        reached_checkout: true,
      });
      const { error } = await resend.emails.send({
        from: FROM,
        to: body.email,
        subject: `[TEST] ${subject}`,
        html,
        text: htmlToPlainText(html),
      });
      if (error) throw new Error(error.message);
      return new Response(JSON.stringify({ success: true, test: true, to: body.email }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const db = createClient(Deno.env.get('SUPABASE_URL') ?? '', serviceKey, {
      auth: { persistSession: false },
    });

    const limit = Math.min(Math.max(Number(body.limit) || DEFAULT_LIMIT, 1), 200);
    const minAgeHours = Math.min(Math.max(Number(body.min_age_hours) || 24, 1), 24 * 30);

    const { data: cohort, error: qErr } = await db.rpc('get_abandoned_checkout_users', {
      p_min_age_hours: minAgeHours,
      ...(body.not_before ? { p_not_before: body.not_before } : {}),
      p_limit: body.send ? limit : 1000,
    });
    if (qErr) throw qErr;
    const rows = (cohort ?? []) as Row[];

    if (!body.send) {
      return new Response(
        JSON.stringify({
          success: true,
          dry_run: true,
          eligible: rows.length,
          reached_checkout: rows.filter((r) => r.reached_checkout).length,
          by_role: rows.reduce<Record<string, number>>((acc, r) => {
            acc[r.role] = (acc[r.role] ?? 0) + 1;
            return acc;
          }, {}),
          oldest: rows.at(-1)?.created_at ?? null,
          newest: rows[0]?.created_at ?? null,
          sample: rows.slice(0, 4).map((r) => ({
            role: r.role,
            reached_checkout: r.reached_checkout,
            subject: buildEmail(r).subject,
            created_at: r.created_at,
          })),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let sent = 0;
    let failed = 0;
    for (const r of rows) {
      const { subject, html } = buildEmail(r);
      // Record BEFORE sending: the unique (user_id, email_type) index is the
      // lock, so a retry or a second run the same day cannot double-send.
      const { error: recErr } = await db
        .from('trial_emails_sent')
        .upsert(
          { user_id: r.user_id, email_type: EMAIL_TYPE, sent_at: new Date().toISOString() },
          { onConflict: 'user_id,email_type' }
        );
      if (recErr) {
        failed++;
        console.warn(`[abandoned-checkout] record failed for ${r.user_id}: ${recErr.message}`);
        continue;
      }
      const { error } = await resend.emails.send({
        from: FROM,
        to: r.email,
        subject,
        html,
        text: htmlToPlainText(html),
      });
      if (error) {
        failed++;
        console.warn(`[abandoned-checkout] send failed for ${r.user_id}: ${error.message}`);
        await db
          .from('trial_emails_sent')
          .delete()
          .eq('user_id', r.user_id)
          .eq('email_type', EMAIL_TYPE);
        continue;
      }
      sent++;
    }

    console.log(`[abandoned-checkout] sent=${sent} failed=${failed} of ${rows.length}`);
    return new Response(JSON.stringify({ success: true, sent, failed, eligible: rows.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, {
      functionName: 'abandoned-checkout-nudge',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'abandoned-checkout-nudge failed',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
