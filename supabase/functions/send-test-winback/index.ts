/**
 * send-test-winback
 * ───────────────────────────────────────────────────────────────────────
 * One-off testing helper. Renders any of the three v12 win-back touches
 * (or the day-1 welcome) for arbitrary input and sends via Resend. Does
 * NOT touch winback_queue, does NOT check subscribed status — purely for
 * previewing real emails in a real inbox.
 *
 * POST body:
 *   { email, firstName?, tier?, touch?, wasTrial? }
 *
 * Auth: requires the caller's bearer token to belong to a user — we use
 * this as a soft gate so randoms on the internet can't spam test emails
 * via this endpoint.
 */

import { serve } from '../_shared/deps.ts';
import {
  winbackTouch1,
  winbackTouch2,
  winbackTouch3,
  WINBACK_FROM,
  WINBACK_REPLY_TO,
} from '../_shared/winback-v13.ts';
import { sendEmail } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

// Only these emails can be the recipient — stops this one-off testing
// endpoint being used as an open relay if the function URL ever leaks.
const ALLOWED_RECIPIENTS = new Set([
  'andrewgangoo91@gmail.com',
  'founder@elec-mate.com',
  'andrew@elec-mate.com',
  'info@elec-mate.com',
]);

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = await req.json();
    const {
      email,
      firstName = 'Andrew',
      tier = 'electrician',
      touch = 1,
      wasTrial = false,
    } = body ?? {};

    if (!email) throw new Error('email is required');
    if (!ALLOWED_RECIPIENTS.has(String(email).toLowerCase())) {
      throw new Error(`recipient ${email} not in allow-list`);
    }

    const ctx = { firstName, tier, wasTrial: !!wasTrial };
    const tmpl =
      touch === 3 ? winbackTouch3(ctx) : touch === 2 ? winbackTouch2(ctx) : winbackTouch1(ctx);

    // Brevo via _shared/mailer.ts shim (Resend was banned at domain level).
    const result = await sendEmail({
      from: WINBACK_FROM,
      replyTo: WINBACK_REPLY_TO,
      to: email,
      subject: `[TEST] ${tmpl.subject}`,
      html: tmpl.html,
      text: tmpl.text,
    });

    if (result.error) {
      return new Response(JSON.stringify({ ok: false, error: result.error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        ok: true,
        sent_to: email,
        subject: tmpl.subject,
        touch,
        tier,
        was_trial: wasTrial,
        brevo_message_id: result.data?.id ?? null,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    await captureException(error, {
      functionName: 'send-test-winback',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    const message = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
