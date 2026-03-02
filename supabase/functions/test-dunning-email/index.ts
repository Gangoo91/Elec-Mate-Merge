/**
 * Test Dunning Email — Sends all 3 redesigned dunning templates
 * No auth — one-shot utility, delete after use.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'npm:resend@2.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOGO_URL = 'https://www.elec-mate.com/logo.jpg';

// ─── Email 1 — Friendly heads-up ─────────────────────────────────────────────

function generateEmail1Html(name: string, amount: string, url: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#111111;color:#ffffff;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#111111;">
    <tr><td style="padding:24px 12px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:600px;margin:0 auto;background-color:#1a1a1a;border-radius:16px;overflow:hidden;border:1px solid #2a2a2a;">

        <!-- Header -->
        <tr><td style="padding:28px 28px 0;text-align:center;">
          <img src="${LOGO_URL}" alt="Elec-Mate" width="52" height="52" style="display:block;margin:0 auto 12px;border-radius:12px;" />
          <h1 style="margin:0 0 4px;font-size:20px;font-weight:700;">
            <span style="color:#FFD700;">Elec</span><span style="color:#ffffff;">-Mate</span>
          </h1>
          <p style="margin:0 0 24px;font-size:13px;color:#ffffff;">Your electrical toolkit</p>
          <div style="height:1px;background:#2a2a2a;"></div>
        </td></tr>

        <!-- Content -->
        <tr><td style="padding:28px 28px 32px;">

          <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#ffffff;">
            Hey <strong>${name}</strong>,
          </p>

          <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#ffffff;">
            Just a quick heads-up — we tried to take your subscription payment of <strong>${amount}</strong> but it didn't go through. No worries, this usually happens when a card expires or the bank flags an unexpected charge.
          </p>

          <p style="margin:0 0 28px;font-size:16px;line-height:1.7;color:#ffffff;">
            Your Elec-Mate account is still fully active. If you can update your payment details when you get a chance, that would be great.
          </p>

          <p style="margin:0 0 6px;font-size:12px;color:#ffffff;text-transform:uppercase;letter-spacing:1px;text-align:center;">Amount due</p>
          <p style="margin:0 0 28px;font-size:32px;font-weight:700;color:#FFD700;text-align:center;">${amount}</p>

          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr><td style="text-align:center;padding:0 0 12px;">
              <a href="${url}" style="display:inline-block;background:linear-gradient(135deg,#FFD700 0%,#FFA500 100%);color:#1a1a1a;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:10px;font-size:16px;">Update Payment</a>
            </td></tr>
            <tr><td style="text-align:center;">
              <a href="https://www.elec-mate.com/subscriptions" style="display:inline-block;border:1px solid #333333;color:#ffffff;font-weight:600;text-decoration:none;padding:11px 28px;border-radius:10px;font-size:14px;">Manage Subscription</a>
            </td></tr>
          </table>

          <p style="margin:28px 0 0;font-size:14px;line-height:1.7;color:#ffffff;">
            Any issues at all? Just reply to this email — happy to help.
          </p>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 28px;border-top:1px solid #2a2a2a;text-align:center;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:600;">
            <span style="color:#FFD700;">Elec</span><span style="color:#ffffff;">-Mate</span>
          </p>
          <p style="margin:0 0 10px;font-size:12px;color:#ffffff;">Certificates · AI Tools · Quotes · Study</p>
          <p style="margin:0;font-size:12px;">
            <a href="https://www.elec-mate.com" style="color:#FFD700;text-decoration:none;">Website</a>
            <span style="color:#ffffff;"> · </span>
            <a href="https://www.elec-mate.com/subscriptions" style="color:#FFD700;text-decoration:none;">My Account</a>
            <span style="color:#ffffff;"> · </span>
            <a href="mailto:support@elec-mate.com" style="color:#FFD700;text-decoration:none;">Support</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ─── Email 2 — Gentle reminder ───────────────────────────────────────────────

function generateEmail2Html(name: string, amount: string, url: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#111111;color:#ffffff;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#111111;">
    <tr><td style="padding:24px 12px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:600px;margin:0 auto;background-color:#1a1a1a;border-radius:16px;overflow:hidden;border:1px solid #2a2a2a;">

        <!-- Header -->
        <tr><td style="padding:28px 28px 0;text-align:center;">
          <img src="${LOGO_URL}" alt="Elec-Mate" width="52" height="52" style="display:block;margin:0 auto 12px;border-radius:12px;" />
          <h1 style="margin:0 0 4px;font-size:20px;font-weight:700;">
            <span style="color:#FFD700;">Elec</span><span style="color:#ffffff;">-Mate</span>
          </h1>
          <p style="margin:0 0 24px;font-size:13px;color:#ffffff;">Your electrical toolkit</p>
          <div style="height:1px;background:#2a2a2a;"></div>
        </td></tr>

        <!-- Content -->
        <tr><td style="padding:28px 28px 32px;">

          <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#ffffff;">
            Hey <strong>${name}</strong>,
          </p>

          <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#ffffff;">
            Just following up on the payment issue we mentioned a few days ago. Your <strong>${amount}</strong> subscription payment is still outstanding.
          </p>

          <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#ffffff;">
            Everything on your account is still working — your certificates, AI tools, quotes, and study materials are all there. We just need your payment sorted to keep things running smoothly.
          </p>

          <p style="margin:0 0 28px;font-size:16px;line-height:1.7;color:#ffffff;">
            It only takes a minute to update your card details:
          </p>

          <p style="margin:0 0 6px;font-size:12px;color:#ffffff;text-transform:uppercase;letter-spacing:1px;text-align:center;">Amount due</p>
          <p style="margin:0 0 28px;font-size:32px;font-weight:700;color:#f59e0b;text-align:center;">${amount}</p>

          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr><td style="text-align:center;padding:0 0 12px;">
              <a href="${url}" style="display:inline-block;background:linear-gradient(135deg,#FFD700 0%,#FFA500 100%);color:#1a1a1a;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:10px;font-size:16px;">Pay Now</a>
            </td></tr>
            <tr><td style="text-align:center;">
              <a href="https://www.elec-mate.com/subscriptions" style="display:inline-block;border:1px solid #333333;color:#ffffff;font-weight:600;text-decoration:none;padding:11px 28px;border-radius:10px;font-size:14px;">Manage Subscription</a>
            </td></tr>
          </table>

          <p style="margin:28px 0 0;font-size:14px;line-height:1.7;color:#ffffff;">
            If something's not right or you need a hand, just reply — we're here for you.
          </p>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 28px;border-top:1px solid #2a2a2a;text-align:center;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:600;">
            <span style="color:#FFD700;">Elec</span><span style="color:#ffffff;">-Mate</span>
          </p>
          <p style="margin:0 0 10px;font-size:12px;color:#ffffff;">Certificates · AI Tools · Quotes · Study</p>
          <p style="margin:0;font-size:12px;">
            <a href="https://www.elec-mate.com" style="color:#FFD700;text-decoration:none;">Website</a>
            <span style="color:#ffffff;"> · </span>
            <a href="https://www.elec-mate.com/subscriptions" style="color:#FFD700;text-decoration:none;">My Account</a>
            <span style="color:#ffffff;"> · </span>
            <a href="mailto:support@elec-mate.com" style="color:#FFD700;text-decoration:none;">Support</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ─── Email 3 — Warm but clear ────────────────────────────────────────────────

function generateEmail3Html(name: string, amount: string, url: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#111111;color:#ffffff;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#111111;">
    <tr><td style="padding:24px 12px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:600px;margin:0 auto;background-color:#1a1a1a;border-radius:16px;overflow:hidden;border:1px solid #2a2a2a;">

        <!-- Header -->
        <tr><td style="padding:28px 28px 0;text-align:center;">
          <img src="${LOGO_URL}" alt="Elec-Mate" width="52" height="52" style="display:block;margin:0 auto 12px;border-radius:12px;" />
          <h1 style="margin:0 0 4px;font-size:20px;font-weight:700;">
            <span style="color:#FFD700;">Elec</span><span style="color:#ffffff;">-Mate</span>
          </h1>
          <p style="margin:0 0 24px;font-size:13px;color:#ffffff;">Your electrical toolkit</p>
          <div style="height:1px;background:#2a2a2a;"></div>
        </td></tr>

        <!-- Content -->
        <tr><td style="padding:28px 28px 32px;">

          <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#ffffff;">
            Hey <strong>${name}</strong>,
          </p>

          <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#ffffff;">
            We've reached out a couple of times now about your subscription payment, and we really don't want you to lose access to your Elec-Mate account.
          </p>

          <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#ffffff;">
            Unfortunately, if we can't process the <strong>${amount}</strong> payment soon, we'll have to pause your account. That means your certificates, AI tools, quotes, invoices, and study materials would all go offline.
          </p>

          <p style="margin:0 0 28px;font-size:16px;line-height:1.7;color:#ffffff;">
            We'd love to keep you on board — here's a quick link to sort it out:
          </p>

          <p style="margin:0 0 6px;font-size:12px;color:#ffffff;text-transform:uppercase;letter-spacing:1px;text-align:center;">Amount due</p>
          <p style="margin:0 0 8px;font-size:32px;font-weight:700;color:#ef4444;text-align:center;">${amount}</p>
          <p style="margin:0 0 28px;font-size:13px;color:#ffffff;text-align:center;">Account will be paused if unpaid</p>

          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr><td style="text-align:center;padding:0 0 12px;">
              <a href="${url}" style="display:inline-block;background:linear-gradient(135deg,#16a34a 0%,#15803d 100%);color:#ffffff;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:10px;font-size:16px;">Keep My Account Active</a>
            </td></tr>
            <tr><td style="text-align:center;">
              <a href="https://www.elec-mate.com/subscriptions" style="display:inline-block;border:1px solid #333333;color:#ffffff;font-weight:600;text-decoration:none;padding:11px 28px;border-radius:10px;font-size:14px;">Manage Subscription</a>
            </td></tr>
          </table>

          <p style="margin:28px 0 0;font-size:14px;line-height:1.7;color:#ffffff;">
            If there's anything going on — money's tight, you're having issues with the app, or you just forgot — please reply and let us know. We're a small team and we genuinely want to help.
          </p>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 28px;border-top:1px solid #2a2a2a;text-align:center;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:600;">
            <span style="color:#FFD700;">Elec</span><span style="color:#ffffff;">-Mate</span>
          </p>
          <p style="margin:0 0 10px;font-size:12px;color:#ffffff;">Certificates · AI Tools · Quotes · Study</p>
          <p style="margin:0;font-size:12px;">
            <a href="https://www.elec-mate.com" style="color:#FFD700;text-decoration:none;">Website</a>
            <span style="color:#ffffff;"> · </span>
            <a href="https://www.elec-mate.com/subscriptions" style="color:#FFD700;text-decoration:none;">My Account</a>
            <span style="color:#ffffff;"> · </span>
            <a href="mailto:support@elec-mate.com" style="color:#FFD700;text-decoration:none;">Support</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ─── Handler ─────────────────────────────────────────────────────────────────

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json().catch(() => ({}));
    const email = ((body as Record<string, unknown>).email as string) || 'founder@elec-mate.com';

    const resend = new Resend(resendApiKey);
    const testName = 'Andrew';
    const testAmount = '£9.99';
    const testUrl = 'https://www.elec-mate.com/subscriptions';

    const templates = [
      {
        num: 1,
        subject: "[TEST] Heads up — your ElecMate payment didn't go through",
        html: generateEmail1Html(testName, testAmount, testUrl),
      },
      {
        num: 2,
        subject: '[TEST] Friendly reminder — your ElecMate payment is still outstanding',
        html: generateEmail2Html(testName, testAmount, testUrl),
      },
      {
        num: 3,
        subject: "[TEST] We don't want you to lose access to ElecMate",
        html: generateEmail3Html(testName, testAmount, testUrl),
      },
    ];

    const results: Array<{ template: number; status: string; error?: string }> = [];

    for (const tmpl of templates) {
      const { error: sendError } = await resend.emails.send({
        from: 'ElecMate <founder@elec-mate.com>',
        reply_to: 'support@elec-mate.com',
        to: [email],
        subject: tmpl.subject,
        html: tmpl.html,
      });

      results.push(
        sendError
          ? { template: tmpl.num, status: 'error', error: JSON.stringify(sendError) }
          : { template: tmpl.num, status: 'sent' }
      );

      await new Promise((r) => setTimeout(r, 1000));
    }

    return new Response(JSON.stringify({ success: true, email, results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
