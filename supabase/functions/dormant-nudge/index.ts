// dormant-nudge — a personal note from Andrew to PAYING customers who have
// gone quiet, before the next renewal turns quiet into a cancellation.
//
// Why (retention plan, 20 Sep 2026): 173 of 307 paying electricians and 103
// of 253 paying apprentices had no session in 14 days, and nothing reached
// them. Only 57% of paid store subscriptions reach their first renewal.
// The ask-why email that goes to store cancellers gets a 13% reply rate —
// the best signal we have — so this uses the same voice, before they go.
//
// Cohort: subscribed, electrician/apprentice, account older than 14 days, no
// user_events row in the last 10 days, not nudged in the last 45 days, not
// suppressed. Resolved server-side by public.get_dormant_paying_users().
//
// Safety: a POST with no body (or without `send: true`) is a DRY RUN that
// returns the cohort size and a sample — nothing is sent. `{ test: true,
// email, name, role }` sends one preview to that address, ignoring the
// cohort. `{ send: true, limit }` sends for real, newest-dormant first,
// capped by `limit` (default 40) so a backlog never lands in one burst.
// Each send is recorded in trial_emails_sent (email_type 'dormant_10d').
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend, htmlToPlainText } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const EMAIL_TYPE = 'dormant_10d';
const FROM = 'Andrew at Elec-Mate <founder@elec-mate.com>';
const MOBILE = '07507 241303';
const DEFAULT_LIMIT = 40;

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Plain, short, no buttons. The plain "from Andrew" emails get roughly three
// times the clicks of the designed template, and this one wants a reply, not
// a click.
function buildEmail(
  firstName: string,
  role: string,
  source: string | null
): { subject: string; html: string } {
  const name = firstName || 'mate';
  const isApprentice = role === 'apprentice';

  const opener = isApprentice
    ? `I noticed you haven’t been in the study centre for a couple of weeks and wanted to check nothing’s put you off.`
    : `I noticed you haven’t been in Elec-Mate for a couple of weeks and wanted to check nothing’s broken or missing.`;

  // We can pause a Stripe subscription ourselves. We cannot touch an App
  // Store or Play billing, so the offer there is honest about where the
  // switch is — and that nothing is lost by using it.
  const isStore = source === 'app_store' || source === 'play_store';
  const pauseLine = isStore
    ? `If you’d rather stop it for a bit, you can turn it off in your ${source === 'play_store' ? 'Google Play' : 'App Store'} subscriptions and come back whenever; everything you’ve done stays exactly where it is.`
    : `If you’d rather pause it for a month or two, say so and I’ll sort it; nothing gets charged while it’s paused.`;
  const middle = isApprentice
    ? `If college has just been full-on, that’s fine — your progress and streak are where you left them. ${pauseLine}`
    : `If it’s just been quiet on the cert front, that’s fine — it’ll all be there when the next job comes in. If something put you off, or there’s a job you’d like a hand setting up in it, tell me. ${pauseLine}`;

  const html = `
    <div style="font-family: -apple-system, 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 8px 4px; color:#1a1a1a; font-size:15px; line-height:1.65;">
      <p style="margin:0 0 14px;">Hi ${esc(name)},</p>
      <p style="margin:0 0 14px;">It’s Andrew, the electrician who built Elec-Mate. ${opener}</p>
      <p style="margin:0 0 14px;">You’re paying for it, so I’d rather you were getting something out of it.</p>
      <p style="margin:0 0 14px;">${middle}</p>
      <p style="margin:0 0 14px;">One line back is plenty — it comes straight to me and I read every reply. My mobile is ${MOBILE} if that’s easier.</p>
      <p style="margin:0;">Cheers,<br/>Andrew<br/><span style="color:#555555; font-size:13px;">Founder, Elec-Mate</span></p>
    </div>`;

  const subject = firstName ? `${firstName}, everything alright?` : 'Everything alright?';
  return { subject, html };
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
      name?: string;
      role?: string;
      send?: boolean;
      limit?: number;
      days?: number;
    } = {};
    try {
      body = await req.json();
    } catch {
      // no body → dry run
    }

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

    // ── Preview to one address, ignoring the cohort ──────────────────────
    if (body.test && body.email) {
      const { subject, html } = buildEmail(
        body.name ?? 'Andrew',
        body.role ?? 'electrician',
        'stripe'
      );
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
    const days = Math.min(Math.max(Number(body.days) || 10, 5), 60);
    const { data: cohort, error: qErr } = await db.rpc('get_dormant_paying_users', {
      p_days: days,
      p_min_age_days: 14,
      p_limit: body.send ? limit : 1000,
    });
    if (qErr) throw qErr;

    type Row = {
      user_id: string;
      full_name: string | null;
      role: string;
      email: string;
      last_seen: string | null;
      subscription_source: string | null;
      subscription_tier: string | null;
    };
    const rows = (cohort ?? []) as Row[];

    if (!body.send) {
      return new Response(
        JSON.stringify({
          success: true,
          dry_run: true,
          eligible: rows.length,
          by_role: rows.reduce<Record<string, number>>((acc, r) => {
            acc[r.role] = (acc[r.role] ?? 0) + 1;
            return acc;
          }, {}),
          sample: rows.slice(0, 5).map((r) => ({
            role: r.role,
            last_seen: r.last_seen,
            source: r.subscription_source,
          })),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let sent = 0;
    let failed = 0;
    for (const r of rows) {
      const firstName = (r.full_name ?? '').trim().split(/\s+/)[0] ?? '';
      const { subject, html } = buildEmail(firstName, r.role, r.subscription_source);
      // Record BEFORE sending: the unique (user_id, email_type) index is the
      // lock, so a retry or a second manual run the same day cannot double-send.
      // Upsert refreshes sent_at, which is what the 45-day cooldown reads —
      // a plain insert would fail on the second nudge and freeze the date.
      const { error: recErr } = await db
        .from('trial_emails_sent')
        .upsert(
          { user_id: r.user_id, email_type: EMAIL_TYPE, sent_at: new Date().toISOString() },
          { onConflict: 'user_id,email_type' }
        );
      if (recErr) {
        failed++;
        console.warn(`[dormant-nudge] record failed for ${r.user_id}: ${recErr.message}`);
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
        console.warn(`[dormant-nudge] send failed for ${r.user_id}: ${error.message}`);
        // Undo the record so tomorrow's run can try again.
        await db
          .from('trial_emails_sent')
          .delete()
          .eq('user_id', r.user_id)
          .eq('email_type', EMAIL_TYPE);
        continue;
      }
      sent++;
    }

    console.log(`[dormant-nudge] sent=${sent} failed=${failed} of ${rows.length}`);
    return new Response(JSON.stringify({ success: true, sent, failed, eligible: rows.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, {
      functionName: 'dormant-nudge',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'dormant-nudge failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
