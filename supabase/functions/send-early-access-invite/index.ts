/* eslint-disable @typescript-eslint/no-explicit-any */
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { Resend } from 'npm:resend@2.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

// Early access £7.99 offer configuration (same Stripe product as winback: prod_TtTdELbwjYaZQn)
const EA_OFFER_CONFIG = {
  monthlyPrice: 7.99,
  yearlyPrice: 79.99,
  standardMonthlyPrice: 9.99,
  discountPercent: 20,
  monthlyPaymentLink: 'https://buy.stripe.com/7sYcMY1gm67a6U96FgbjW00',
  yearlyPaymentLink: 'https://buy.stripe.com/5kQ3cobV0anqguJe7IbjW01',
};

// Generate unique invite token with EA prefix
function generateToken(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = 'EA-';
  for (let i = 0; i < 16; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// Generate LAUNCH email HTML (different from early access - we're now live!)
function generateLaunchEmailHTML(email: string, inviteToken: string): string {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://jtwygbeceundfgnkirof.supabase.co';
  const signupUrl = `${supabaseUrl}/functions/v1/track-launch-click?token=${inviteToken}`;
  const trackingPixelUrl = `${supabaseUrl}/functions/v1/track-launch-open?token=${inviteToken}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>What would you do with 5 extra hours a week?</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f172a;">
    <tr>
      <td style="padding: 24px 12px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 480px; margin: 0 auto; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(251, 191, 36, 0.2);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 24px 20px; text-align: center;">
              <div style="font-size: 48px; line-height: 1; margin-bottom: 16px;">⏱️</div>
              <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; line-height: 1.3;">
                How much time do you lose to paperwork each week?
              </h1>
            </td>
          </tr>

          <!-- The Problem -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <p style="margin: 0; font-size: 16px; color: #e2e8f0; line-height: 1.7; text-align: center;">
                Handwriting certs. Chasing quotes. Flicking through regs books. Calculating cables on scrap paper.
              </p>
              <p style="margin: 16px 0 0; font-size: 16px; color: #fbbf24; line-height: 1.6; text-align: center; font-weight: 600;">
                That's hours every week you could be spending with the wife, kids, the doggo, or having beers with your pals.
              </p>
            </td>
          </tr>

          <!-- Value Props - 3 big ones -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <!-- Save Time -->
              <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 16px; padding: 20px; margin-bottom: 12px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="width: 50px; vertical-align: top;">
                      <div style="font-size: 32px; line-height: 1;">⚡</div>
                    </td>
                    <td>
                      <p style="margin: 0; font-size: 16px; font-weight: 700; color: #22c55e;">Save Hours Every Week</p>
                      <p style="margin: 6px 0 0; font-size: 14px; color: #94a3b8; line-height: 1.5;">
                        Digital certs in minutes. AI writes your RAMS. Instant cable calcs. No more paperwork evenings.
                      </p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Save Money -->
              <div style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 100%); border: 1px solid rgba(251, 191, 36, 0.3); border-radius: 16px; padding: 20px; margin-bottom: 12px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="width: 50px; vertical-align: top;">
                      <div style="font-size: 32px; line-height: 1;">💷</div>
                    </td>
                    <td>
                      <p style="margin: 0; font-size: 16px; font-weight: 700; color: #fbbf24;">Keep More of What You Earn</p>
                      <p style="margin: 6px 0 0; font-size: 14px; color: #94a3b8; line-height: 1.5;">
                        One app replaces expensive cert software, quoting tools, and training subscriptions. Just £9.99/month for everything.
                      </p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Give Back -->
              <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 100%); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 16px; padding: 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="width: 50px; vertical-align: top;">
                      <div style="font-size: 32px; line-height: 1;">🤝</div>
                    </td>
                    <td>
                      <p style="margin: 0; font-size: 16px; font-weight: 700; color: #a78bfa;">Built to Support Our Industry</p>
                      <p style="margin: 6px 0 0; font-size: 14px; color: #94a3b8; line-height: 1.5;">
                        Free Study Centre for apprentices. Mental health resources. Built by sparks, for sparks. We're putting back into the trade.
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Elec-AI Feature -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 16px; padding: 24px 20px; text-align: center;">
                <p style="margin: 0; font-size: 32px; line-height: 1;">🧠</p>
                <p style="margin: 12px 0 0; font-size: 18px; font-weight: 700; color: #10b981;">
                  Meet Elec-AI
                </p>
                <p style="margin: 8px 0 0; font-size: 15px; color: #e2e8f0; line-height: 1.5;">
                  It's like ChatGPT, but built specifically for our industry.
                </p>
                <p style="margin: 12px 0 0; font-size: 14px; color: #94a3b8; line-height: 1.5;">
                  Trained over months with <strong style="color: #10b981;">400,000+ pieces of electrical data</strong> — BS7671, installation methods, cable sizing, fault finding, you name it.
                </p>
                <p style="margin: 12px 0 0; font-size: 15px; color: #fbbf24; font-weight: 600;">
                  Ask it anything. Try it.
                </p>
              </div>
            </td>
          </tr>

          <!-- What's to lose? -->
          <tr>
            <td style="padding: 0 24px 20px;">
              <div style="text-align: center;">
                <p style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; line-height: 1.4;">
                  What's there to lose?
                </p>
                <p style="margin: 12px 0 0; font-size: 15px; color: #e2e8f0; line-height: 1.6;">
                  Give it an hour. Explore. See if it clicks.
                </p>
                <p style="margin: 8px 0 0; font-size: 15px; color: #94a3b8; line-height: 1.6;">
                  If it saves you even one evening of paperwork, it's paid for itself ten times over.
                </p>
              </div>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <a href="${signupUrl}" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0f172a; text-decoration: none; font-size: 18px; font-weight: 700; border-radius: 14px; text-align: center; box-shadow: 0 8px 24px rgba(251, 191, 36, 0.35);">
                      Try It Free for 7 Days
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px; text-align: center;">
                    <p style="margin: 0; font-size: 13px; color: #64748b;">
                      No card needed · Cancel anytime
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Features Grid -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <p style="margin: 0 0 12px; font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 1px; text-align: center;">
                All included
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="width: 50%; padding: 6px 4px 6px 0;">
                    <div style="background: rgba(30, 41, 59, 0.6); border-radius: 10px; padding: 10px 12px; text-align: center;">
                      <span style="font-size: 18px;">📋</span>
                      <p style="margin: 4px 0 0; font-size: 12px; color: #cbd5e1;">EICR, EIC, Minor Works</p>
                    </div>
                  </td>
                  <td style="width: 50%; padding: 6px 0 6px 4px;">
                    <div style="background: rgba(30, 41, 59, 0.6); border-radius: 10px; padding: 10px 12px; text-align: center;">
                      <span style="font-size: 18px;">🤖</span>
                      <p style="margin: 4px 0 0; font-size: 12px; color: #cbd5e1;">AI RAMS & Designs</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="width: 50%; padding: 6px 4px 6px 0;">
                    <div style="background: rgba(30, 41, 59, 0.6); border-radius: 10px; padding: 10px 12px; text-align: center;">
                      <span style="font-size: 18px;">💰</span>
                      <p style="margin: 4px 0 0; font-size: 12px; color: #cbd5e1;">Quotes & Invoices</p>
                    </div>
                  </td>
                  <td style="width: 50%; padding: 6px 0 6px 4px;">
                    <div style="background: rgba(30, 41, 59, 0.6); border-radius: 10px; padding: 10px 12px; text-align: center;">
                      <span style="font-size: 18px;">🧮</span>
                      <p style="margin: 4px 0 0; font-size: 12px; color: #cbd5e1;">Smart Calculators</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="width: 50%; padding: 6px 4px 6px 0;">
                    <div style="background: rgba(30, 41, 59, 0.6); border-radius: 10px; padding: 10px 12px; text-align: center;">
                      <span style="font-size: 18px;">📚</span>
                      <p style="margin: 4px 0 0; font-size: 12px; color: #cbd5e1;">Study Centre & CPD</p>
                    </div>
                  </td>
                  <td style="width: 50%; padding: 6px 0 6px 4px;">
                    <div style="background: rgba(30, 41, 59, 0.6); border-radius: 10px; padding: 10px 12px; text-align: center;">
                      <span style="font-size: 18px;">🧠</span>
                      <p style="margin: 4px 0 0; font-size: 12px; color: #cbd5e1;">Mental Health Hub</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Help Shape the Industry -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px; padding: 20px; text-align: center;">
                <p style="margin: 0; font-size: 24px; line-height: 1;">💬</p>
                <p style="margin: 12px 0 0; font-size: 16px; font-weight: 700; color: #60a5fa;">
                  Help us shape how our industry works
                </p>
                <p style="margin: 10px 0 0; font-size: 14px; color: #94a3b8; line-height: 1.5;">
                  We're building this with sparks, not just for them. Your feedback shapes what comes next. Let's make something brilliant together.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 24px; text-align: center; background-color: rgba(15, 23, 42, 0.8); border-top: 1px solid rgba(148, 163, 184, 0.1);">
              <p style="margin: 0 0 8px; font-size: 14px; color: #cbd5e1;">
                Questions? Just hit reply.
              </p>
              <p style="margin: 0; font-size: 13px; color: #64748b;">
                © ${new Date().getFullYear()} Elec-Mate · Made in the UK 🇬🇧
              </p>
              <p style="margin: 8px 0 0; font-size: 11px; color: #475569;">
                You signed up for updates at elec-mate.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <!-- Email open tracking pixel -->
  <img src="${trackingPixelUrl}" width="1" height="1" style="display:none;width:1px;height:1px;border:0;" alt="" />
</body>
</html>
  `;
}

// Generate conversion email HTML — v2 winback body with early access intro + standard pricing
function generateConversionEmailHTML(email: string): string {
  const landingUrl = 'https://www.elec-mate.com';
  const t = 'color:#e2e8f0;font-size:14px;line-height:1.6;margin:0 0 5px';
  const b = 'color:#fff;font-weight:700';
  const h =
    'font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 8px';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="dark"><!--[if mso]><style>body,table,td{font-family:Arial,sans-serif!important}</style><![endif]--></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#0f172a">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#0f172a"><tr><td style="padding:24px 12px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:500px;margin:0 auto;background:linear-gradient(180deg,#1e293b,#0f172a);border-radius:24px;overflow:hidden;border:1px solid rgba(251,191,36,0.2)">

<tr><td style="padding:32px 24px 20px">
<p style="margin:0 0 16px;font-size:17px;color:#fff;line-height:1.6">Hey there,</p>
<p style="margin:0;font-size:16px;color:#e2e8f0;line-height:1.7">You signed up for updates from Elec-Mate a while back and I've been quiet. That's because I've spent every single day building. The app's now live, electricians are using it every day on site, and I wanted to show you what's actually in it &mdash; because once you see this lot, you'll wonder how you managed without it.</p>
</td></tr>

<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#22c55e;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">&#x1F525; New this week</p></td></tr>

<tr><td style="padding:0 20px 10px"><div style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#a855f7">Apprentice Hub</p>
<p style="${t}"><strong style="${b}">60+ video lessons</strong> across Level 2 &amp; 3</p>
<p style="${t}"><strong style="${b}">780 flash cards</strong> &mdash; test yourself on the go</p>
<p style="${t}"><strong style="${b}">AM2 Simulator</strong> &amp; <strong style="${b}">EPA Simulator</strong> &mdash; practice before the real thing</p>
<p style="${t}"><strong style="${b}">Portfolio Builder</strong> with AI that reads your work and auto-assigns assessment criteria</p>
<p style="${t}">Completely redesigned cards and layout this week</p>
<p style="margin:0;font-size:13px;color:#a855f7;font-style:italic;font-weight:600">The best apprentice area in the industry. Not even close.</p>
</div></td></tr>

<tr><td style="padding:0 20px 10px"><div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#ef4444">Site Safety &amp; RAMS</p>
<p style="${t}"><strong style="${b}">Safety Score Dashboard</strong> &mdash; your site safety rating at a glance</p>
<p style="${t}"><strong style="${b}">Inspection Checklists</strong> for every job type</p>
<p style="${t}">Expanded tool library &middot; More safety templates &middot; RAMS from a job description in 2 mins</p>
</div></td></tr>

<tr><td style="padding:0 20px 10px"><div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#3b82f6">Photo Documentation</p>
<p style="${t}">Think CompanyCam, but built right into Elec-Mate</p>
<p style="${t}"><strong style="${b}">Annotations &amp; markup</strong>, watermarks, batch ops &middot; <strong style="${b}">Quick capture</strong> on site &middot; <strong style="${b}">AI photo analysis</strong></p>
</div></td></tr>

<tr><td style="padding:0 20px 14px"><div style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#22c55e">AI Estimator</p>
<p style="${t}">Do an EICR, log observations &rarr; AI estimates remedial costs &rarr; <strong style="${b}">one click to quote</strong> &rarr; send straight to the client. No more typing up quotes after inspections.</p>
</div></td></tr>

<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#fbbf24;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">&#x26A1; Already in the app</p></td></tr>

<tr><td style="padding:0 20px 14px"><div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px">
<p style="${h};color:#22c55e">Certs &amp; Testing</p>
<p style="${t}">&#x2705; <strong style="${b}">7 cert types</strong> &mdash; EICR, EIC, Minor Works, Fire Alarm, EV, Emergency Lighting, Solar PV</p>
<p style="${t}">&#x2705; <strong style="${b}">AI Board Scanner</strong> &mdash; photograph a DB, get auto circuit mapping</p>
<p style="${t}">&#x2705; <strong style="${b}">Schedule of Tests</strong> with automated compliance checking</p>
<p style="${t}">&#x2705; <strong style="${b}">WhatsApp your certs</strong> straight to clients &middot; <strong style="${b}">One-click to invoice</strong></p>

<p style="${h};color:#fbbf24;margin-top:12px">AI Agents</p>
<p style="${t}">&#x2705; <strong style="${b}">Circuit Designer</strong> &mdash; BS 7671 designs, cable sizing, CU layouts</p>
<p style="${t}">&#x2705; <strong style="${b}">Cost Engineer</strong> &mdash; quotes with live material pricing and labour rates</p>
<p style="${t}">&#x2705; <strong style="${b}">Installation Specialist</strong> &middot; <strong style="${b}">Health &amp; Safety</strong> &middot; <strong style="${b}">Maintenance</strong> &middot; <strong style="${b}">Report Writer</strong></p>
<p style="margin:0 0 5px;font-size:13px;color:#fbbf24;font-style:italic;font-weight:600">Every agent trained on months of real electrical data &mdash; not generic AI</p>

<p style="${h};color:#f59e0b;margin-top:12px">Business &amp; Finance</p>
<p style="${t}">&#x2705; <strong style="${b}">Quotes &amp; Invoices</strong> with PDF export &middot; <strong style="${b}">Xero &amp; QuickBooks</strong> integration</p>
<p style="${t}">&#x2705; <strong style="${b}">Expense tracking</strong> &middot; <strong style="${b}">Client management</strong> &middot; <strong style="${b}">Deals of the day</strong></p>
<p style="${t}">&#x2705; <strong style="${b}">14 business calculators</strong> &mdash; hourly rate, job profit, tax/NI, cash flow, break-even</p>

<p style="${h};color:#a855f7;margin-top:12px">Tools &amp; Learning</p>
<p style="${t}">&#x2705; <strong style="${b}">Elec-AI</strong> &mdash; like ChatGPT but for electricians. Ask it anything, photograph components or faults &rarr; BS 7671 guidance</p>
<p style="${t}">&#x2705; <strong style="${b}">Elec-ID</strong> &mdash; digital credentials, verified and shareable with clients</p>
<p style="${t}">&#x2705; <strong style="${b}">50+ electrical calculators</strong> &middot; <strong style="${b}">36 study courses</strong> &middot; <strong style="${b}">BS 7671 reg search</strong></p>
<p style="margin:0;color:#e2e8f0;font-size:14px;line-height:1.6">&#x2705; <strong style="${b}">Project management</strong> &middot; <strong style="${b}">Job vacancies</strong> &mdash; live listings aggregated daily</p>
</div></td></tr>

<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#60a5fa;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">&#x1F6A7; Coming next</p></td></tr>

<tr><td style="padding:0 20px 20px"><div style="background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.2);border-radius:14px;padding:14px">
<p style="${t}">&#x1F527; <strong style="${b}">Inspection &amp; Testing upgrades</strong> &mdash; spending serious time making this even better</p>
<p style="${t}">&#x1F4E6; <strong style="${b}">Materials comparison</strong> &mdash; drop your list in, AI finds the best prices across suppliers</p>
<p style="${t}">&#x1F3E2; <strong style="${b}">Employer Hub</strong> &mdash; manage your team, apprentices, and jobs in one place</p>
<p style="margin:0;color:#e2e8f0;font-size:14px;line-height:1.6">&#x1F4F1; <strong style="${b}">App Store launch</strong> &mdash; iOS &amp; Android native apps dropping soon</p>
</div></td></tr>

<tr><td style="padding:0 20px 20px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.15),rgba(251,191,36,0.05));border:2px solid rgba(251,191,36,0.4);border-radius:16px;padding:22px 18px;text-align:center">
<p style="margin:0 0 4px;font-size:14px;color:#e2e8f0">All of this from</p>
<p style="margin:0;font-size:48px;font-weight:800;color:#fbbf24;line-height:1">&pound;9.99<span style="font-size:18px;font-weight:600;color:#94a3b8">/mo</span></p>
<p style="margin:6px 0 8px;font-size:14px;color:#94a3b8">&pound;4.99/mo for apprentices &middot; <span style="color:#22c55e;font-weight:600">7 day free trial</span></p>
<p style="margin:0 0 10px;font-size:13px;color:#f59e0b;font-weight:600">No commitment. Cancel anytime. Try it and see.</p>
<p style="margin:0 0 16px;font-size:15px;color:#e2e8f0;line-height:1.5">Replace your cert software, RAMS tool, quoting spreadsheet, invoicing app and that notes app. One sub instead of five.</p>
<a href="${landingUrl}" style="display:block;padding:16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#0f172a;text-decoration:none;font-size:16px;font-weight:700;border-radius:12px;text-align:center">Try Elec-Mate Free for 7 Days &rarr;</a>
</div></td></tr>

<tr><td style="padding:0 20px 20px"><div style="background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.2);border-radius:12px;padding:14px;text-align:center">
<p style="margin:0;font-size:14px;color:#e2e8f0;line-height:1.6">Not sure? Reply to this email and I'll give you <strong style="color:#60a5fa">a free week</strong> to try it properly. No strings.</p>
</div></td></tr>

<tr><td style="padding:0 24px 28px">
<p style="margin:0 0 4px;font-size:15px;color:#e2e8f0">Cheers,</p>
<p style="margin:0 0 4px;font-size:16px;color:#fff;font-weight:600">Andrew</p>
<p style="margin:0 0 10px;font-size:13px;color:#64748b">Founder, Elec-Mate</p>
<p style="margin:0;font-size:14px;color:#e2e8f0">&#x1F4AC; Got questions? Drop me a WhatsApp: <a href="https://wa.me/447507241303" style="color:#25D366;font-weight:600;text-decoration:none">+44 7507 241303</a></p>
</td></tr>

<tr><td style="padding:14px 24px;text-align:center;background:rgba(15,23,42,0.6);border-top:1px solid rgba(255,255,255,0.05)">
<p style="margin:0;font-size:12px;color:#475569">&copy; ${new Date().getFullYear()} Elec-Mate &middot; Built for UK Sparks &#x1F1EC;&#x1F1E7;&#x26A1;</p>
</td></tr>

</table></td></tr></table>
</body></html>`;
}

// Generate early access invite email HTML
function generateInviteEmailHTML(email: string, inviteToken: string): string {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://jtwygbeceundfgnkirof.supabase.co';
  // Use click tracking redirect instead of direct link
  const signupUrl = `${supabaseUrl}/functions/v1/track-email-click?token=${inviteToken}`;
  const trackingPixelUrl = `${supabaseUrl}/functions/v1/track-email-open?token=${inviteToken}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>You're Invited! Early Access to Elec-Mate</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0f172a;">
    <tr>
      <td style="padding: 24px 12px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 480px; margin: 0 auto; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(251, 191, 36, 0.2);">

          <!-- Header with Rocket Emoji -->
          <tr>
            <td style="padding: 40px 24px 24px; text-align: center;">
              <div style="font-size: 56px; line-height: 1; margin-bottom: 16px;">🚀</div>
              <div style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; padding: 8px 20px; border-radius: 24px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
                Early Access
              </div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2;">
                You're Invited!
              </h1>
              <p style="margin: 12px 0 0; font-size: 16px; color: #e2e8f0; line-height: 1.5;">
                Early access to Elec-Mate - before everyone else
              </p>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <p style="margin: 0; font-size: 16px; color: #e2e8f0; line-height: 1.7; text-align: center;">
                Because you signed up for our email updates, we wanted to give <strong style="color: #fbbf24;">YOU</strong> early access to Elec-Mate - before everyone else!
              </p>
              <p style="margin: 16px 0 0; font-size: 15px; color: #94a3b8; line-height: 1.6; text-align: center;">
                It's not fully complete, but it's almost there. We'd love your feedback as we put the finishing touches on everything.
              </p>
            </td>
          </tr>

          <!-- Trial Card -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 20px; padding: 28px 24px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                  Your Exclusive Offer
                </p>
                <p style="margin: 8px 0 4px; font-size: 42px; font-weight: 800; color: #22c55e; line-height: 1;">
                  7 Days Free
                </p>
                <p style="margin: 0 0 16px; font-size: 16px; color: #94a3b8;">
                  No credit card required
                </p>
                <p style="margin: 0; font-size: 14px; color: #cbd5e1; background: rgba(0,0,0,0.2); padding: 8px 16px; border-radius: 8px; display: inline-block;">
                  Start exploring today
                </p>
              </div>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 20px 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <a href="${signupUrl}" style="display: block; padding: 18px 32px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0f172a; text-decoration: none; font-size: 18px; font-weight: 700; border-radius: 14px; text-align: center; box-shadow: 0 8px 24px rgba(251, 191, 36, 0.35);">
                      ⚡ Start My Free Trial
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's Included -->
          <tr>
            <td style="padding: 0 20px 28px;">
              <p style="margin: 0 0 16px; font-size: 13px; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 1px; text-align: center;">
                What's included
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">🔌</span>
                    <span style="color: #ffffff; font-size: 14px;">Inspection & Testing Suite - EICR, EIC, Minor Works</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">💰</span>
                    <span style="color: #ffffff; font-size: 14px;">Quotes & Invoicing with Stripe integration</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">🧠</span>
                    <span style="color: #ffffff; font-size: 14px;">Mental Health Hub - Wellbeing resources</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">📚</span>
                    <span style="color: #ffffff; font-size: 14px;">Study Centre - Courses, mock exams, BS7671 guides</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">🤖</span>
                    <span style="color: #ffffff; font-size: 14px;">AI Tools - BS7671 assistant, RAMS, circuit designer</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">🧮</span>
                    <span style="color: #ffffff; font-size: 14px;">Smart Calculators - Cable sizing, volt drop & more</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">🆔</span>
                    <span style="color: #ffffff; font-size: 14px;">Elec-ID - Your digital professional profile</span>
                  </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
                <tr>
                  <td style="padding: 10px 16px; background-color: rgba(30, 41, 59, 0.8); border-radius: 12px;">
                    <span style="color: #fbbf24; font-size: 16px; margin-right: 10px;">📱</span>
                    <span style="color: #ffffff; font-size: 14px;">Mobile-First - Built for use on site</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Expiry Notice -->
          <tr>
            <td style="padding: 0 20px 28px;">
              <div style="background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.25); border-radius: 12px; padding: 14px 20px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #fbbf24; font-weight: 600;">
                  ⏰ This early access link expires in 14 days
                </p>
              </div>
            </td>
          </tr>

          <!-- Help Section -->
          <tr>
            <td style="padding: 24px; background-color: rgba(15, 23, 42, 0.8); border-top: 1px solid rgba(148, 163, 184, 0.1); text-align: center;">
              <p style="margin: 0 0 8px; font-size: 14px; color: #cbd5e1;">
                Questions? Just reply to this email
              </p>
              <a href="mailto:info@elec-mate.com" style="font-size: 15px; color: #fbbf24; text-decoration: none; font-weight: 600;">
                info@elec-mate.com
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 24px; text-align: center; background-color: #0f172a;">
              <p style="margin: 0; font-size: 13px; color: #64748b;">
                © ${new Date().getFullYear()} Elec-Mate · Made in the UK 🇬🇧
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <!-- Email open tracking pixel -->
  <img src="${trackingPixelUrl}" width="1" height="1" style="display:none;width:1px;height:1px;border:0;" alt="" />
</body>
</html>
  `;
}

// Generate early access offer email HTML — adapted from winback V5, for leads who never created accounts
function generateEarlyAccessOfferHTML(email: string): string {
  const t = 'color:#ffffff;font-size:14px;line-height:1.6;margin:0 0 5px';
  const b = 'color:#fff;font-weight:700';
  const h =
    'font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 10px';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="dark"><!--[if mso]><style>body,table,td{font-family:Arial,sans-serif!important}</style><![endif]--></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#0f172a">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#0f172a"><tr><td style="padding:24px 12px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:500px;margin:0 auto;background:linear-gradient(180deg,#1e293b,#0f172a);border-radius:24px;overflow:hidden;border:1px solid rgba(251,191,36,0.2)">

<!-- Opening -->
<tr><td style="padding:32px 24px 20px">
<p style="margin:0 0 16px;font-size:17px;color:#fff;line-height:1.6">Hey,</p>
<p style="margin:0 0 14px;font-size:16px;color:#fff;line-height:1.7">You signed up for early access to Elec-Mate a while back. Since then, I've built it into a full platform with <strong style="color:#fbbf24">122 tools, 8 certificate types, and 15 AI specialists</strong> &mdash; all designed for UK electricians.</p>
<p style="margin:0 0 14px;font-size:16px;color:#fff;line-height:1.7">I wanted to give you first look &mdash; and a price that won't be around forever.</p>
<p style="margin:0;font-size:16px;color:#fff;line-height:1.7">Here's exactly what you get for <strong style="color:#fbbf24">&pound;7.99 a month</strong>:</p>
</td></tr>

<!-- Stats Strip — 4 gold boxes -->
<tr><td style="padding:0 20px 16px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="25%" style="padding:0 3px 0 0"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:12px;padding:14px 6px;text-align:center">
<p style="margin:0;font-size:24px;font-weight:800;color:#0f172a;line-height:1">122</p>
<p style="margin:4px 0 0;font-size:9px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px">AI Tools</p>
</div></td>
<td width="25%" style="padding:0 2px"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:12px;padding:14px 6px;text-align:center">
<p style="margin:0;font-size:24px;font-weight:800;color:#0f172a;line-height:1">8</p>
<p style="margin:4px 0 0;font-size:9px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px">Cert Types</p>
</div></td>
<td width="25%" style="padding:0 2px"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:12px;padding:14px 6px;text-align:center">
<p style="margin:0;font-size:24px;font-weight:800;color:#0f172a;line-height:1">15</p>
<p style="margin:4px 0 0;font-size:9px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px">AI Agents</p>
</div></td>
<td width="25%" style="padding:0 0 0 3px"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:12px;padding:14px 6px;text-align:center">
<p style="margin:0;font-size:24px;font-weight:800;color:#0f172a;line-height:1">64+</p>
<p style="margin:4px 0 0;font-size:9px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px">Calculators</p>
</div></td>
</tr></table>
</td></tr>

<!-- Certs & Testing (green) -->
<tr><td style="padding:0 20px 12px"><div style="background:linear-gradient(135deg,rgba(34,197,94,0.12),rgba(34,197,94,0.03));border:1px solid rgba(34,197,94,0.3);border-radius:14px;padding:18px">
<p style="${h};color:#22c55e">&#x1F4CB; Certificates &amp; Testing</p>
<p style="${t}">&#x2713; EICR (Electrical Installation Condition Report)</p>
<p style="${t}">&#x2713; EIC (Electrical Installation Certificate)</p>
<p style="${t}">&#x2713; Minor Works</p>
<p style="${t}">&#x2713; Fire Alarm (BS 5839-1:2017 &mdash; 7 certificate sub-types)</p>
<p style="${t}">&#x2713; EV Charging Installation</p>
<p style="${t}">&#x2713; Emergency Lighting</p>
<p style="${t}">&#x2713; Solar PV Installation</p>
<p style="${t}">&#x2713; PAT Testing</p>
<p style="margin:10px 0 0;font-size:13px;color:#22c55e;line-height:1.6;font-weight:600">Every one: photo capture, defect coding, PDF export, email to client. Fill it in on site &rarr; client gets it before you're back in the van.</p>
</div></td></tr>

<!-- AI Tools (yellow) -->
<tr><td style="padding:0 20px 12px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.12),rgba(251,191,36,0.03));border:1px solid rgba(251,191,36,0.3);border-radius:14px;padding:18px">
<p style="${h};color:#fbbf24">&#x1F916; AI Tools &mdash; Point Your Camera, Get Answers</p>
<p style="${t}">&#x2713; <strong style="${b}">Circuit Designer</strong> &mdash; BS 7671 compliant designs, cable sizing, CU layouts</p>
<p style="${t}">&#x2713; <strong style="${b}">Cost Engineer</strong> &mdash; quotes with live material pricing + labour rates</p>
<p style="${t}">&#x2713; <strong style="${b}">RAMS Generator</strong> &mdash; risk assessment from a job description in 2 minutes flat</p>
<p style="${t}">&#x2713; <strong style="${b}">Fault Diagnosis</strong> &mdash; describe the fault, get step-by-step fixes</p>
<p style="${t}">&#x2713; <strong style="${b}">Photo Analysis</strong> &mdash; photograph a component &rarr; get specs + regs</p>
<p style="${t}">&#x2713; <strong style="${b}">Installation Verification</strong> &mdash; snap your work &rarr; BS 7671 compliance check</p>
<p style="${t}">&#x2713; <strong style="${b}">Wiring Instructions</strong> &mdash; step-by-step from your photo</p>
<p style="${t}">&#x2713; <strong style="${b}">Client Explainer</strong> &mdash; turn technical findings into plain English for Mrs Jones</p>
<p style="${t}">&#x2713; <strong style="${b}">Board Scanner</strong> &mdash; photograph a DB, auto circuit mapping</p>
<p style="margin:0;font-size:13px;color:#fbbf24;font-weight:600">+ 6 more specialist tools</p>
</div></td></tr>

<!-- Business Tools (amber) -->
<tr><td style="padding:0 20px 12px"><div style="background:linear-gradient(135deg,rgba(245,158,11,0.12),rgba(245,158,11,0.03));border:1px solid rgba(245,158,11,0.3);border-radius:14px;padding:18px">
<p style="${h};color:#f59e0b">&#x1F4BC; Business Tools &mdash; Run Your Business From Your Phone</p>
<p style="${t}">&#x2713; Quote &amp; Invoice Builder with Stripe payments</p>
<p style="${t}">&#x2713; Customer database</p>
<p style="${t}">&#x2713; Project management with photos &amp; drawings</p>
<p style="${t}">&#x2713; Expense tracking</p>
<p style="${t}">&#x2713; Booking Portal &mdash; your own booking page, clients pick slots</p>
<p style="${t}">&#x2713; 50+ electrical calculators (cable sizing, Zs, voltage drop, solar, EV)</p>
<p style="${t}">&#x2713; 14 business calculators (hourly rate, job profit, tax, cash flow)</p>
<p style="margin:0;${t}">&#x2713; Referral system &mdash; get paid when you refer other sparkies</p>
</div></td></tr>

<!-- Materials Marketplace (blue) -->
<tr><td style="padding:0 20px 12px"><div style="background:linear-gradient(135deg,rgba(59,130,246,0.12),rgba(59,130,246,0.03));border:1px solid rgba(59,130,246,0.3);border-radius:14px;padding:18px">
<p style="${h};color:#3b82f6">&#x1F6D2; Materials Marketplace</p>
<p style="${t}">Live pricing from 6 suppliers:</p>
<p style="margin:0 0 8px;font-size:15px;color:#fff;font-weight:700;line-height:1.6">Screwfix &middot; Toolstation &middot; CEF &middot; Edmundson &middot; Wickes &middot; B&amp;Q</p>
<p style="margin:0;font-size:13px;color:#3b82f6;font-weight:600;line-height:1.6">Deals of the day. Coupon finder. Price comparison. Find the cheapest 6mm T&amp;E in 10 seconds.</p>
</div></td></tr>

<!-- Study Centre (cyan) -->
<tr><td style="padding:0 20px 12px"><div style="background:linear-gradient(135deg,rgba(6,182,212,0.12),rgba(6,182,212,0.03));border:1px solid rgba(6,182,212,0.3);border-radius:14px;padding:18px">
<p style="${h};color:#06b6d4">&#x1F393; Study Centre</p>
<p style="${t}">&#x2713; <strong style="${b}">Electrical Upskilling</strong> &mdash; 18th Edition, inspection &amp; testing, EV, solar, fire alarm</p>
<p style="${t}">&#x2713; <strong style="${b}">General Upskilling</strong> &mdash; business management, project planning, client relations</p>
<p style="${t}">&#x2713; <strong style="${b}">Personal Development</strong> &mdash; time management, communication, mental health resources</p>
<p style="${t}">&#x2713; <strong style="${b}">780 Flash Cards</strong> &mdash; spaced repetition, exam-ready revision</p>
<p style="${t}">&#x2713; <strong style="${b}">AM2 &amp; EPA Simulators</strong> &mdash; timed, realistic, scored</p>
<p style="margin:0;${t}">&#x2713; <strong style="${b}">60+ Video Lessons</strong> &mdash; watch on site, learn at your pace</p>
</div></td></tr>

<!-- New This Week (purple) -->
<tr><td style="padding:0 20px 12px"><div style="background:linear-gradient(135deg,rgba(168,85,247,0.12),rgba(168,85,247,0.03));border:1px solid rgba(168,85,247,0.3);border-radius:14px;padding:18px">
<p style="${h};color:#a855f7">&#x2728; Shipped This Week</p>
<p style="${t}">&#x2713; <strong style="${b}">Snagging</strong> &mdash; photograph defects, track by project, one-tap resolve</p>
<p style="${t}">&#x2713; <strong style="${b}">Route Planning</strong> &mdash; optimised daily driving route with weather on each job</p>
<p style="${t}">&#x2713; <strong style="${b}">Solar Roof Analysis</strong> &mdash; Google satellite data for PV quotes</p>
<p style="${t}">&#x2713; <strong style="${b}">Realtime Sync</strong> &mdash; everything updates live across all your devices</p>
<p style="margin:0;${t}">&#x2713; <strong style="${b}">iOS App in TestFlight</strong> &mdash; push notifications, camera, morning briefings</p>
</div></td></tr>

<!-- Site Safety (red) -->
<tr><td style="padding:0 20px 12px"><div style="background:linear-gradient(135deg,rgba(239,68,68,0.12),rgba(239,68,68,0.03));border:1px solid rgba(239,68,68,0.3);border-radius:14px;padding:18px">
<p style="${h};color:#ef4444">&#x1F6E1;&#xFE0F; Site Safety</p>
<p style="${t}">&#x2713; RAMS from a job description</p>
<p style="${t}">&#x2713; Method statements</p>
<p style="${t}">&#x2713; Safe isolation records</p>
<p style="${t}">&#x2713; Equipment tracking</p>
<p style="margin:0;${t}">&#x2713; Team briefing templates</p>
</div></td></tr>

<!-- Pricing CTA (gold) -->
<tr><td style="padding:0 20px 16px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.15),rgba(251,191,36,0.05));border:2px solid rgba(251,191,36,0.4);border-radius:16px;padding:24px 18px;text-align:center">
<p style="margin:0 0 8px;font-size:16px;color:#fff;font-weight:600;line-height:1.5">All of that. &pound;7.99 a month.</p>
<p style="margin:0;font-size:52px;font-weight:800;color:#fbbf24;line-height:1">&pound;${EA_OFFER_CONFIG.monthlyPrice.toFixed(2)}<span style="font-size:18px;font-weight:600;color:#fff">/mo</span></p>
<p style="margin:6px 0 4px;font-size:14px;color:#fff"><span style="text-decoration:line-through">&pound;${EA_OFFER_CONFIG.standardMonthlyPrice.toFixed(2)}</span> &middot; <span style="color:#22c55e;font-weight:600">20% off</span> &middot; locked forever</p>
<p style="margin:0 0 18px;font-size:14px;color:#fff;line-height:1.5">That's less than two coffees. For 122 tools, 8 cert types, 15 AI specialists, and 6 supplier price feeds. In your pocket.</p>
<a href="${EA_OFFER_CONFIG.monthlyPaymentLink}" style="display:block;padding:16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#0f172a;text-decoration:none;font-size:16px;font-weight:700;border-radius:12px;text-align:center;margin-bottom:10px">Lock in &pound;${EA_OFFER_CONFIG.monthlyPrice.toFixed(2)}/mo forever &rarr;</a>
<a href="${EA_OFFER_CONFIG.yearlyPaymentLink}" style="display:block;padding:14px;background:rgba(251,191,36,0.15);border:2px solid rgba(251,191,36,0.5);color:#fbbf24;text-decoration:none;font-size:15px;font-weight:600;border-radius:12px;text-align:center">Or go yearly: &pound;${EA_OFFER_CONFIG.yearlyPrice.toFixed(2)} (&pound;${(EA_OFFER_CONFIG.yearlyPrice / 12).toFixed(2)}/mo)</a>
</div></td></tr>

<!-- Mate Section (gold/dark gradient, chat bubble style) -->
<tr><td style="padding:0 20px 12px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.12),rgba(15,23,42,0.9));border:2px solid rgba(251,191,36,0.3);border-radius:14px;padding:18px">
<p style="margin:0 0 12px;font-size:15px;font-weight:800;color:#fbbf24;text-transform:uppercase;letter-spacing:1px">&#x1F4AC; And Then There's Mate.</p>
<p style="margin:0 0 12px;font-size:14px;color:#fff;line-height:1.6">Mate is your AI business assistant on WhatsApp.</p>
<p style="margin:0 0 6px;font-size:14px;color:#fff;line-height:1.6">Message Mate like you'd message a colleague:</p>

<div style="background:rgba(37,211,102,0.08);border-left:3px solid #25D366;border-radius:0 8px 8px 0;padding:10px 12px;margin:8px 0">
<p style="margin:0 0 4px;font-size:13px;color:#fff;line-height:1.5;font-style:italic">"Quote Mrs Johnson's rewire &mdash; 4 bed semi, full rewire, new CU, 12 circuits"</p>
<p style="margin:0;font-size:12px;color:#25D366;font-weight:600">&rarr; Mate prices it up, creates the quote, sends it to the client.</p>
</div>

<div style="background:rgba(37,211,102,0.08);border-left:3px solid #25D366;border-radius:0 8px 8px 0;padding:10px 12px;margin:8px 0">
<p style="margin:0 0 4px;font-size:13px;color:#fff;line-height:1.5;font-style:italic">"What time's my first job tomorrow?"</p>
<p style="margin:0;font-size:12px;color:#25D366;font-weight:600">&rarr; Mate checks your diary and tells you.</p>
</div>

<div style="background:rgba(37,211,102,0.08);border-left:3px solid #25D366;border-radius:0 8px 8px 0;padding:10px 12px;margin:8px 0">
<p style="margin:0 0 4px;font-size:13px;color:#fff;line-height:1.5;font-style:italic">"Raise an invoice for the Smith job, &pound;2,400"</p>
<p style="margin:0;font-size:12px;color:#25D366;font-weight:600">&rarr; Done. Invoice created, PDF generated, ready to send.</p>
</div>

<p style="margin:12px 0 8px;font-size:14px;color:#fff;line-height:1.6"><strong style="color:#fbbf24">122 tools. Works while you're on the tools.</strong> Send Mate a message while you're up a ladder &mdash; it does the work and <strong style="color:#25D366">WhatsApps you back</strong> when it's done.</p>
<p style="margin:0;font-size:13px;color:#fff;line-height:1.5">Mate is an add-on &mdash; separate to the &pound;7.99 app subscription. Reply to this email if you want in on the beta.</p>
</div></td></tr>

<!-- Urgency block -->
<tr><td style="padding:0 20px 16px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.06),rgba(251,191,36,0.02));border:1px solid rgba(251,191,36,0.15);border-radius:14px;padding:18px">
<p style="margin:0 0 8px;font-size:14px;color:#fff;line-height:1.6">This is a one-off offer for early access supporters. Once it's gone, new users pay &pound;9.99/month.</p>
<p style="margin:0;font-size:14px;color:#fff;line-height:1.6">If you've been thinking about it, now's the time. If not, no worries &mdash; thanks for signing up back then.</p>
</div></td></tr>

<!-- Sign-off -->
<tr><td style="padding:0 20px 16px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.08),rgba(251,191,36,0.02));border:1px solid rgba(251,191,36,0.15);border-radius:14px;padding:18px">
<p style="margin:0 0 12px;font-size:14px;color:#fff;line-height:1.6">Hit reply if you've got any questions &mdash; it comes straight to me. Not a chatbot, not a support team. Just me, Andrew.</p>
<p style="margin:0 0 4px;font-size:15px;color:#fff">Cheers,</p>
<p style="margin:0 0 2px;font-size:17px;color:#fbbf24;font-weight:700">Andrew</p>
<p style="margin:0;font-size:13px;color:#fff">Founder &amp; sparky &middot; Elec-Mate</p>
</div></td></tr>

<!-- Footer -->
<tr><td style="padding:16px 24px;text-align:center;border-top:1px solid rgba(255,255,255,0.08)">
<p style="margin:0;font-size:12px;color:#fff">&copy; ${new Date().getFullYear()} Elec-Mate &middot; Built for UK Sparks &#x1F1EC;&#x1F1E7; &#x26A1;</p>
</td></tr>

</table></td></tr></table>
</body></html>`;
}

function generateEarlyAccessV6HTML(): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="dark"><!--[if mso]><style>body,table,td{font-family:Arial,sans-serif!important}</style><![endif]--></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#0f172a">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#0f172a"><tr><td style="padding:24px 12px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:500px;margin:0 auto;background:linear-gradient(180deg,#1e293b,#0f172a);border-radius:24px;overflow:hidden;border:1px solid rgba(251,191,36,0.2)">

<!-- Opening -->
<tr><td style="padding:32px 24px 20px">
<p style="margin:0 0 16px;font-size:17px;color:#fff;line-height:1.6">Hey,</p>
<p style="margin:0 0 14px;font-size:16px;color:#fff;line-height:1.7">You signed up to hear about Elec-Mate a while back. I haven't forgotten &mdash; and I wanted to give you first look at what it's turned into.</p>
<p style="margin:0 0 14px;font-size:16px;color:#fff;line-height:1.7">When you signed up, Elec-Mate was an idea. Now it's a full platform with 8 certificate types, AI tools, business management, a study centre, and a materials marketplace. All in one app.</p>
<p style="margin:0;font-size:16px;color:#fff;line-height:1.7">And because you were early, you're getting the best price it'll ever be.</p>
</td></tr>

<!-- Stats Strip — 4 gold boxes -->
<tr><td style="padding:0 20px 16px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="25%" style="padding:0 3px 0 0"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:12px;padding:14px 6px;text-align:center">
<p style="margin:0;font-size:24px;font-weight:800;color:#0f172a;line-height:1">122</p>
<p style="margin:4px 0 0;font-size:9px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px">AI Tools</p>
</div></td>
<td width="25%" style="padding:0 2px"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:12px;padding:14px 6px;text-align:center">
<p style="margin:0;font-size:24px;font-weight:800;color:#0f172a;line-height:1">8</p>
<p style="margin:4px 0 0;font-size:9px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px">Cert Types</p>
</div></td>
<td width="25%" style="padding:0 2px"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:12px;padding:14px 6px;text-align:center">
<p style="margin:0;font-size:24px;font-weight:800;color:#0f172a;line-height:1">15</p>
<p style="margin:4px 0 0;font-size:9px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px">AI Agents</p>
</div></td>
<td width="25%" style="padding:0 0 0 3px"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:12px;padding:14px 6px;text-align:center">
<p style="margin:0;font-size:24px;font-weight:800;color:#0f172a;line-height:1">64+</p>
<p style="margin:4px 0 0;font-size:9px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px">Calculators</p>
</div></td>
</tr></table>
</td></tr>

<!-- Why £7.99 is a no-brainer (gold card) -->
<tr><td style="padding:0 20px 16px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.12),rgba(251,191,36,0.03));border:1px solid rgba(251,191,36,0.3);border-radius:14px;padding:20px">
<p style="margin:0 0 14px;font-size:15px;color:#fbbf24;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Why &pound;7.99 is a no-brainer</p>
<p style="margin:0 0 10px;font-size:14px;color:#fff;line-height:1.6">Right now, most electricians are paying for:</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2022; Cert software &mdash; &pound;25/mo</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2022; Business/invoicing tools &mdash; &pound;20-40/mo</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2022; RAMS &amp; method statements &mdash; &pound;15-20/mo</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2022; Study materials &amp; revision &mdash; &pound;10-15/mo</p>
<p style="margin:0 0 12px;font-size:14px;color:#fff;line-height:1.6">&#x2022; Job management &mdash; &pound;15-30/mo</p>
<p style="margin:0 0 14px;font-size:16px;color:#fff;font-weight:700;line-height:1.6">That's &pound;85-130 a month. Exposed.</p>
<p style="margin:0 0 14px;font-size:18px;color:#fbbf24;font-weight:800;line-height:1.5">Elec-Mate does ALL of that. For &pound;7.99. A month.</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">8 certificate types. Quotes and invoices. RAMS generator. Expense tracking. 64+ electrical calculators. Study centre with 780 flash cards and AM2 simulators. Job management. Customer database. Booking portal.</p>
<p style="margin:12px 0 0;font-size:14px;color:#fff;line-height:1.6">And we're adding more every week. Job vacancies are in. Materials marketplace with deals of the day from <strong style="color:#fff">Screwfix, Toolstation, CEF, Edmundson, Wickes, and B&amp;Q</strong> &mdash; the deals alone would save you more than the &pound;7.99 subscription.</p>
</div></td></tr>

<!-- What you get on day one -->
<tr><td style="padding:0 20px 16px"><div style="background:rgba(30,41,59,0.8);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:20px">
<p style="margin:0 0 14px;font-size:15px;color:#fff;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">What you get on day one</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; <strong style="color:#fff">8 full certificate types</strong> (EIC, EICR, Minor Works, Fire Alarm, Solar PV, EV Charging, Emergency Lighting, PAT)</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; Every cert: fill in on your phone, photo capture, PDF export, email to client. Done before you're back in the van.</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; <strong style="color:#fff">AI tools that actually work</strong> &mdash; circuit design, cost engineering, fault diagnosis, photo analysis, wiring instructions</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; Full business suite &mdash; quotes, invoices, expenses, job management</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; Study centre &mdash; 18th Edition, I&amp;T, EV, solar, fire alarm courses</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; Materials marketplace with live pricing from 6 suppliers</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; Job vacancies board</p>
<p style="margin:0;font-size:14px;color:#fff;line-height:1.6">&#x2713; 64+ electrical calculators, 14 business calculators</p>
</div></td></tr>

<!-- Pricing CTA (gold) -->
<tr><td style="padding:0 20px 16px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.15),rgba(251,191,36,0.05));border:2px solid rgba(251,191,36,0.4);border-radius:16px;padding:24px 18px;text-align:center">
<p style="margin:0 0 6px;font-size:15px;color:#fff;font-weight:700;letter-spacing:0.3px;text-transform:uppercase">&pound;7.99/mo &mdash; locked in forever.</p>
<p style="margin:0;font-size:52px;font-weight:800;color:#fbbf24;line-height:1">&pound;${EA_OFFER_CONFIG.monthlyPrice.toFixed(2)}<span style="font-size:18px;font-weight:600;color:#fff">/mo</span></p>
<p style="margin:8px 0 4px;font-size:14px;color:#fff;line-height:1.5">The App Store price will be <strong style="color:#fff">&pound;14.99/mo</strong> when we launch there.</p>
<p style="margin:0 0 4px;font-size:14px;color:#fff;line-height:1.5">The standard web price is going to &pound;9.99/mo.</p>
<p style="margin:0 0 18px;font-size:14px;color:#fff;line-height:1.5">You're getting &pound;7.99 because you signed up early, and this is my way of saying thank you for believing in it before it was even built.</p>
<a href="${EA_OFFER_CONFIG.monthlyPaymentLink}" style="display:block;padding:16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#0f172a;text-decoration:none;font-size:16px;font-weight:700;border-radius:12px;text-align:center;margin-bottom:10px">Lock in &pound;${EA_OFFER_CONFIG.monthlyPrice.toFixed(2)}/mo forever &#x2192;</a>
<a href="${EA_OFFER_CONFIG.yearlyPaymentLink}" style="display:block;padding:14px;background:rgba(251,191,36,0.15);border:2px solid rgba(251,191,36,0.5);color:#fbbf24;text-decoration:none;font-size:15px;font-weight:600;border-radius:12px;text-align:center">Or go yearly: &pound;${EA_OFFER_CONFIG.yearlyPrice.toFixed(2)} (&pound;${(EA_OFFER_CONFIG.yearlyPrice / 12).toFixed(2)}/mo)</a>
</div></td></tr>

<!-- Want to try before you buy? (blue) -->
<tr><td style="padding:0 20px 12px"><div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:12px;padding:16px;text-align:center">
<p style="margin:0 0 8px;font-size:14px;color:#fff;line-height:1.6">Reply to this email and I'll set you up with a free trial. No card needed. Have a look around, see what's there.</p>
<p style="margin:0;font-size:14px;color:#fff;line-height:1.6"><strong style="color:#60a5fa">founder@elec-mate.com</strong> &mdash; comes straight to me. Not a chatbot. Not a support team. Just me, Andrew.</p>
</div></td></tr>

<!-- Early access pricing won't last -->
<tr><td style="padding:0 20px 16px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.06),rgba(251,191,36,0.02));border:1px solid rgba(251,191,36,0.15);border-radius:14px;padding:18px">
<p style="margin:0 0 8px;font-size:14px;color:#fff;line-height:1.6">Once we launch on the App Store, the price is &pound;14.99/mo. Early access pricing is for people who were here first. When it's gone, it's gone. Prices only go one way from here.</p>
</div></td></tr>

<!-- Sign-off -->
<tr><td style="padding:0 20px 16px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.08),rgba(251,191,36,0.02));border:1px solid rgba(251,191,36,0.15);border-radius:14px;padding:18px">
<p style="margin:0 0 4px;font-size:15px;color:#fff">Cheers,</p>
<p style="margin:0 0 2px;font-size:17px;color:#fbbf24;font-weight:700">Andrew</p>
<p style="margin:0;font-size:13px;color:#fff">Founder &middot; Elec-Mate</p>
<p style="margin:6px 0 0;font-size:12px;color:#fff">Built in Cumbria. Built for the trade.</p>
</div></td></tr>

<!-- Footer -->
<tr><td style="padding:16px 24px;text-align:center;border-top:1px solid rgba(255,255,255,0.08)">
<p style="margin:0;font-size:12px;color:#fff">&copy; ${new Date().getFullYear()} Elec-Mate &middot; Built for UK Electricians &#x1F1EC;&#x1F1E7; &#x26A1;</p>
</td></tr>

</table></td></tr></table>
</body></html>`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const {
      action,
      emails,
      inviteId,
      token,
      testEmail,
      segment,
      manualEmail,
      recipientName,
      email_version,
    } = await req.json();

    // Actions that don't require any auth (for unauthenticated users)
    // send_test_launch_email included for quick testing from CLI
    const noAuthActions = ['validate_token', 'send_test_launch_email'];

    // Create admin client for operations (always available)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let user: any = null;
    let supabaseClient: any = null;

    // Only require auth for actions that need it
    if (!noAuthActions.includes(action)) {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        throw new Error('No authorization header');
      }

      // Create Supabase client with user's token
      supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: authHeader } } }
      );

      // Get the authenticated user
      const {
        data: { user: authUser },
        error: userError,
      } = await supabaseClient.auth.getUser();
      if (userError || !authUser) {
        throw new Error('Unauthorized: Could not get user');
      }
      user = authUser;

      // Actions allowed for any authenticated user (not just admins)
      const authenticatedActions = ['claim'];

      // All other actions require admin access
      if (!authenticatedActions.includes(action)) {
        const { data: callerProfile, error: profileError } = await supabaseClient
          .from('profiles')
          .select('admin_role, full_name')
          .eq('id', user.id)
          .single();

        if (profileError || !callerProfile?.admin_role) {
          throw new Error('Unauthorized: Admin access required');
        }
      }
    }

    let result;

    switch (action) {
      case 'list': {
        const { data, error } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        result = { invites: data };
        break;
      }

      case 'stats': {
        const { data, error } = await supabaseAdmin
          .from('early_access_invites')
          .select(
            'status, opened_at, claimed_at, clicked_at, delivered_at, bounced_at, last_send_attempt_at, resend_email_id, send_count'
          );
        if (error) throw error;

        const total = data?.length || 0;
        const pending = data?.filter((i) => i.status === 'pending').length || 0;
        const sent = data?.filter((i) => i.status === 'sent').length || 0;
        const claimed = data?.filter((i) => i.status === 'claimed').length || 0;
        const expired = data?.filter((i) => i.status === 'expired').length || 0;
        const delivered = data?.filter((i) => i.delivered_at !== null).length || 0;
        const bounced = data?.filter((i) => i.bounced_at !== null).length || 0;
        const opened = data?.filter((i) => i.opened_at !== null).length || 0;
        const clicked = data?.filter((i) => i.clicked_at !== null).length || 0;
        const unopenedSent =
          data?.filter((i) => i.status === 'sent' && !i.opened_at && !i.claimed_at).length || 0;

        // Failed sends: attempted but no resend_email_id (email wasn't actually sent)
        // Using simpler truthy/falsy checks for reliability
        const failedSends =
          data?.filter(
            (i) =>
              i.status === 'sent' &&
              !i.opened_at &&
              !i.claimed_at &&
              i.last_send_attempt_at && // has been attempted
              !i.resend_email_id // but no resend ID = email never sent
          ).length || 0;

        // Calculate conversion rates
        // Note: Many signups came from early access before we added click tracking
        // So signup rate is based on sent, not clicked
        const openRate = sent > 0 ? ((opened / sent) * 100).toFixed(1) : '0';
        const clickRate = opened > 0 ? ((clicked / opened) * 100).toFixed(1) : '0';
        const signupRate = sent > 0 ? ((claimed / sent) * 100).toFixed(1) : '0';

        const stats = {
          total,
          pending,
          sent,
          delivered,
          bounced,
          opened,
          clicked,
          claimed,
          expired,
          unopened_sent: unopenedSent,
          failed_sends: failedSends,
          rates: {
            open_rate: `${openRate}%`,
            click_rate: `${clickRate}%`,
            signup_rate: `${signupRate}%`,
          },
        };
        result = { stats };
        break;
      }

      case 'bulk_create': {
        if (!emails || !Array.isArray(emails) || emails.length === 0) {
          throw new Error('Email list is required');
        }

        // Clean and validate emails
        const cleanEmails = emails
          .map((e: string) => e.trim().toLowerCase())
          .filter((e: string) => e && e.includes('@'));

        // Check for existing invites
        const { data: existing } = await supabaseAdmin
          .from('early_access_invites')
          .select('email')
          .in('email', cleanEmails);

        const existingEmails = new Set(existing?.map((e) => e.email) || []);
        const newEmails = cleanEmails.filter((e: string) => !existingEmails.has(e));

        if (newEmails.length === 0) {
          result = {
            created: 0,
            skipped: cleanEmails.length,
            message: 'All emails already have invites',
          };
          break;
        }

        // Create invites for new emails
        const invites = newEmails.map((email: string) => ({
          email,
          invite_token: generateToken(),
          status: 'pending',
        }));

        const { data, error } = await supabaseAdmin
          .from('early_access_invites')
          .insert(invites)
          .select();

        if (error) throw error;

        console.log(`${data?.length} early access invites created by admin ${user.id}`);
        result = {
          created: data?.length || 0,
          skipped: existingEmails.size,
          message: `Created ${data?.length} invites`,
        };
        break;
      }

      case 'send_invite': {
        if (!inviteId) {
          throw new Error('Invite ID is required');
        }

        // Get the invite
        const { data: invite, error: inviteError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .eq('id', inviteId)
          .single();

        if (inviteError || !invite) {
          throw new Error('Invite not found');
        }

        if (invite.status === 'claimed') {
          throw new Error('This invite has already been claimed');
        }

        // Send the email
        const emailHtml = generateInviteEmailHTML(invite.email, invite.invite_token);

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'Elec-Mate <hello@elec-mate.com>',
          replyTo: 'info@elec-mate.com',
          to: [invite.email],
          subject: "You're Invited! Early Access to Elec-Mate",
          html: emailHtml,
        });

        if (emailError) {
          console.error('Email send error:', emailError);
          throw new Error('Failed to send email');
        }

        // Update invite status with Resend email ID for webhook tracking
        await supabaseAdmin
          .from('early_access_invites')
          .update({
            status: 'sent',
            sent_at: new Date().toISOString(),
            resend_email_id: emailData?.id || null,
            send_count: (invite.send_count || 0) + 1,
          })
          .eq('id', inviteId);

        console.log(`Early access invite sent to ${invite.email} by admin ${user.id}`);
        result = { success: true, email: invite.email, resendId: emailData?.id };
        break;
      }

      case 'send_all_pending': {
        // Get all pending invites
        const { data: pendingInvites, error: pendingError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .eq('status', 'pending');

        if (pendingError) throw pendingError;

        if (!pendingInvites || pendingInvites.length === 0) {
          result = { sent: 0, message: 'No pending invites to send' };
          break;
        }

        let sentCount = 0;
        const errors: string[] = [];

        for (const invite of pendingInvites) {
          try {
            const emailHtml = generateInviteEmailHTML(invite.email, invite.invite_token);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <hello@elec-mate.com>',
              replyTo: 'info@elec-mate.com',
              to: [invite.email],
              subject: "You're Invited! Early Access to Elec-Mate",
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            await supabaseAdmin
              .from('early_access_invites')
              .update({
                status: 'sent',
                sent_at: new Date().toISOString(),
                resend_email_id: emailData?.id || null,
                send_count: (invite.send_count || 0) + 1,
              })
              .eq('id', invite.id);

            sentCount++;
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        console.log(`Sent ${sentCount} early access invites by admin ${user.id}`);
        result = { sent: sentCount, errors: errors.length > 0 ? errors : undefined };
        break;
      }

      case 'validate_token': {
        if (!token) {
          throw new Error('Token is required');
        }

        const { data: invite, error: inviteError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .eq('invite_token', token)
          .single();

        if (inviteError || !invite) {
          result = { valid: false, reason: 'Invalid token' };
          break;
        }

        if (invite.status === 'claimed') {
          result = { valid: false, reason: 'This invite has already been claimed' };
          break;
        }

        if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
          result = { valid: false, reason: 'This invite has expired' };
          break;
        }

        result = { valid: true, email: invite.email, invite };
        break;
      }

      case 'claim': {
        // Called after user signup to mark invite as claimed
        if (!token) {
          throw new Error('Token is required');
        }

        const { data: invite, error: inviteError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .eq('invite_token', token)
          .single();

        if (inviteError || !invite) {
          throw new Error('Invalid token');
        }

        if (invite.status === 'claimed') {
          throw new Error('This invite has already been claimed');
        }

        // Mark as claimed
        const { error: updateError } = await supabaseAdmin
          .from('early_access_invites')
          .update({
            status: 'claimed',
            claimed_at: new Date().toISOString(),
            user_id: user.id,
          })
          .eq('id', invite.id);

        if (updateError) throw updateError;

        console.log(`Early access invite claimed by ${invite.email} (user ${user.id})`);
        result = { success: true, email: invite.email };
        break;
      }

      case 'resend': {
        if (!inviteId) {
          throw new Error('Invite ID is required');
        }

        // Get the invite
        const { data: invite, error: inviteError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .eq('id', inviteId)
          .single();

        if (inviteError || !invite) {
          throw new Error('Invite not found');
        }

        if (invite.status === 'claimed') {
          throw new Error('This invite has already been claimed');
        }

        // Resend the email
        const emailHtml = generateInviteEmailHTML(invite.email, invite.invite_token);

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'Elec-Mate <hello@elec-mate.com>',
          replyTo: 'info@elec-mate.com',
          to: [invite.email],
          subject: 'Reminder: Your Early Access to Elec-Mate is Waiting!',
          html: emailHtml,
        });

        if (emailError) {
          throw new Error('Failed to resend email');
        }

        // Update sent_at and tracking info
        await supabaseAdmin
          .from('early_access_invites')
          .update({
            sent_at: new Date().toISOString(),
            resend_email_id: emailData?.id || null,
            send_count: (invite.send_count || 0) + 1,
          })
          .eq('id', inviteId);

        console.log(`Early access invite resent to ${invite.email} by admin ${user.id}`);
        result = { success: true, email: invite.email, resendId: emailData?.id };
        break;
      }

      case 'delete': {
        if (!inviteId) {
          throw new Error('Invite ID is required');
        }

        const { error } = await supabaseAdmin
          .from('early_access_invites')
          .delete()
          .eq('id', inviteId);

        if (error) throw error;
        result = { success: true };
        break;
      }

      case 'resend_all_unopened': {
        // Batch size - process this many per request to avoid timeout
        const BATCH_SIZE = 50;

        // Get count of all unopened invites first
        const { count: totalUnopenedCount } = await supabaseAdmin
          .from('early_access_invites')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'sent')
          .is('opened_at', null)
          .is('claimed_at', null);

        // Get next batch - invites not attempted in the last hour
        // This ensures we can retry failed sends and continue where we left off
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

        const { data: unopenedInvites, error: unopenedError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .eq('status', 'sent')
          .is('opened_at', null)
          .is('claimed_at', null)
          .or(`last_send_attempt_at.is.null,last_send_attempt_at.lt.${oneHourAgo}`)
          .order('created_at', { ascending: true })
          .limit(BATCH_SIZE);

        if (unopenedError) throw unopenedError;

        if (!unopenedInvites || unopenedInvites.length === 0) {
          result = {
            sent: 0,
            remaining: 0,
            total_unopened: totalUnopenedCount || 0,
            message: 'No more unopened invites to resend',
            complete: true,
          };
          break;
        }

        let sentCount = 0;
        const errors: string[] = [];

        for (const invite of unopenedInvites) {
          try {
            // Mark attempt BEFORE sending (so if we timeout, we know we tried)
            await supabaseAdmin
              .from('early_access_invites')
              .update({ last_send_attempt_at: new Date().toISOString() })
              .eq('id', invite.id);

            const emailHtml = generateInviteEmailHTML(invite.email, invite.invite_token);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <hello@elec-mate.com>',
              replyTo: 'info@elec-mate.com',
              to: [invite.email],
              subject: 'Reminder: Your Early Access to Elec-Mate is Waiting!',
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            // Update with success data
            await supabaseAdmin
              .from('early_access_invites')
              .update({
                sent_at: new Date().toISOString(),
                resend_email_id: emailData?.id || null,
                send_count: (invite.send_count || 0) + 1,
              })
              .eq('id', invite.id);

            sentCount++;
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        // Calculate remaining (not yet attempted in this batch run)
        const { count: remainingCount } = await supabaseAdmin
          .from('early_access_invites')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'sent')
          .is('opened_at', null)
          .is('claimed_at', null)
          .or(`last_send_attempt_at.is.null,last_send_attempt_at.lt.${oneHourAgo}`);

        const remaining = remainingCount || 0;
        const complete = remaining === 0;

        console.log(
          `Resent ${sentCount}/${unopenedInvites.length} unopened invites by admin ${user.id}. Remaining: ${remaining}`
        );

        result = {
          sent: sentCount,
          attempted: unopenedInvites.length,
          remaining,
          total_unopened: totalUnopenedCount || 0,
          errors: errors.length > 0 ? errors : undefined,
          complete,
          message: complete
            ? `All done! Sent ${sentCount} emails.`
            : `Sent ${sentCount} emails. ${remaining} remaining - call again to continue.`,
        };
        break;
      }

      case 'detailed_list': {
        // Get invites with joined profile data for claimed invites
        const { data: invites, error: invitesError } = await supabaseAdmin
          .from('early_access_invites')
          .select(
            `
            id,
            email,
            invite_token,
            status,
            sent_at,
            delivered_at,
            opened_at,
            clicked_at,
            claimed_at,
            bounced_at,
            bounce_type,
            expires_at,
            created_at,
            user_id,
            send_count,
            launch_email_sent_at,
            launch_email_opened_at,
            launch_email_clicked_at
          `
          )
          .order('created_at', { ascending: false });

        if (invitesError) throw invitesError;

        // Get profile and subscription data for claimed invites
        const claimedUserIds = invites?.filter((i) => i.user_id).map((i) => i.user_id) || [];

        let profilesMap: Record<string, any> = {};
        let subscriptionsMap: Record<string, any> = {};

        if (claimedUserIds.length > 0) {
          const { data: profiles } = await supabaseAdmin
            .from('profiles')
            .select('id, full_name, role, created_at')
            .in('id', claimedUserIds);

          if (profiles) {
            profilesMap = profiles.reduce(
              (acc, p) => {
                acc[p.id] = p;
                return acc;
              },
              {} as Record<string, any>
            );
          }

          const { data: subscriptions } = await supabaseAdmin
            .from('subscriptions')
            .select('user_id, status, trial_end, plan_name')
            .in('user_id', claimedUserIds);

          if (subscriptions) {
            subscriptionsMap = subscriptions.reduce(
              (acc, s) => {
                acc[s.user_id] = s;
                return acc;
              },
              {} as Record<string, any>
            );
          }
        }

        // Build detailed list
        const detailedInvites = invites?.map((invite) => {
          const profile = invite.user_id ? profilesMap[invite.user_id] : null;
          const subscription = invite.user_id ? subscriptionsMap[invite.user_id] : null;

          // Determine derived status based on funnel progression
          let derivedStatus = invite.status;
          if (invite.bounced_at) {
            derivedStatus = 'bounced';
          } else if (invite.claimed_at) {
            derivedStatus = 'claimed';
          } else if (invite.clicked_at) {
            derivedStatus = 'clicked';
          } else if (invite.opened_at) {
            derivedStatus = 'opened';
          } else if (invite.delivered_at) {
            derivedStatus = 'delivered';
          }

          return {
            id: invite.id,
            email: invite.email,
            status: derivedStatus,
            raw_status: invite.status,
            sent_at: invite.sent_at,
            delivered_at: invite.delivered_at,
            opened_at: invite.opened_at,
            clicked_at: invite.clicked_at,
            claimed_at: invite.claimed_at,
            bounced_at: invite.bounced_at,
            bounce_type: invite.bounce_type,
            expires_at: invite.expires_at,
            created_at: invite.created_at,
            send_count: invite.send_count || 1,
            // Launch campaign tracking
            launch_email_sent_at: invite.launch_email_sent_at,
            launch_email_opened_at: invite.launch_email_opened_at,
            launch_email_clicked_at: invite.launch_email_clicked_at,
            user: profile
              ? {
                  id: invite.user_id,
                  full_name: profile.full_name,
                  role: profile.role,
                  signed_up_at: profile.created_at,
                }
              : null,
            subscription: subscription
              ? {
                  status: subscription.status,
                  plan_name: subscription.plan_name,
                  trial_end: subscription.trial_end,
                }
              : null,
          };
        });

        result = { invites: detailedInvites };
        break;
      }

      case 'send_test_launch_email': {
        // Send a test launch email to a specific address (for previewing)
        if (!testEmail) {
          throw new Error('testEmail is required');
        }

        // Generate a test token
        const testToken = `TEST-${Date.now()}`;

        const emailHtml = generateLaunchEmailHTML(testEmail, testToken);

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'Elec-Mate <hello@elec-mate.com>',
          replyTo: 'info@elec-mate.com',
          to: [testEmail],
          subject: '⚡ [TEST] What would you do with 5 extra hours a week?',
          html: emailHtml,
        });

        if (emailError) {
          console.error('Test email send error:', emailError);
          throw new Error(`Failed to send test email: ${emailError.message}`);
        }

        console.log(`Test launch email sent to ${testEmail}${user ? ` by admin ${user.id}` : ''}`);
        result = {
          success: true,
          email: testEmail,
          resendId: emailData?.id,
          message: `Test launch email sent to ${testEmail}`,
        };
        break;
      }

      case 'send_launch_campaign': {
        // Send launch emails to people who haven't signed up yet
        // Rate limited: sends in batches with delays to avoid Resend rate limits
        // 295 emails over 30 mins = ~10 per minute = 1 every 6 seconds
        const BATCH_SIZE = 10; // Process 10 at a time
        const DELAY_BETWEEN_EMAILS_MS = 6000; // 6 seconds between emails

        // Get count of all unclaimed, non-bounced invites that haven't received launch email
        const { count: totalUnclaimedCount } = await supabaseAdmin
          .from('early_access_invites')
          .select('*', { count: 'exact', head: true })
          .neq('status', 'claimed')
          .is('bounced_at', null)
          .is('launch_email_sent_at', null);

        // Get next batch
        const { data: unclaimedInvites, error: unclaimedError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .neq('status', 'claimed')
          .is('bounced_at', null)
          .is('launch_email_sent_at', null)
          .order('created_at', { ascending: true })
          .limit(BATCH_SIZE);

        if (unclaimedError) throw unclaimedError;

        if (!unclaimedInvites || unclaimedInvites.length === 0) {
          result = {
            sent: 0,
            remaining: 0,
            total_unclaimed: totalUnclaimedCount || 0,
            message: 'All launch emails have been sent!',
            complete: true,
          };
          break;
        }

        let sentCount = 0;
        const errors: string[] = [];
        const sentEmails: string[] = [];

        for (let i = 0; i < unclaimedInvites.length; i++) {
          const invite = unclaimedInvites[i];

          try {
            const emailHtml = generateLaunchEmailHTML(invite.email, invite.invite_token);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <hello@elec-mate.com>',
              replyTo: 'info@elec-mate.com',
              to: [invite.email],
              subject: '⚡ What would you do with 5 extra hours a week?',
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            // Update with launch email tracking
            await supabaseAdmin
              .from('early_access_invites')
              .update({
                launch_email_sent_at: new Date().toISOString(),
                launch_email_id: emailData?.id || null,
              })
              .eq('id', invite.id);

            sentCount++;
            sentEmails.push(invite.email);

            // Rate limit: wait between emails (except after the last one)
            if (i < unclaimedInvites.length - 1) {
              await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_EMAILS_MS));
            }
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        // Calculate remaining
        const { count: remainingCount } = await supabaseAdmin
          .from('early_access_invites')
          .select('*', { count: 'exact', head: true })
          .neq('status', 'claimed')
          .is('bounced_at', null)
          .is('launch_email_sent_at', null);

        const remaining = remainingCount || 0;
        const complete = remaining === 0;

        console.log(
          `Launch campaign: Sent ${sentCount}/${unclaimedInvites.length} emails by admin ${user.id}. Remaining: ${remaining}`
        );

        result = {
          sent: sentCount,
          attempted: unclaimedInvites.length,
          remaining,
          total_unclaimed: totalUnclaimedCount || 0,
          sent_to: sentEmails,
          errors: errors.length > 0 ? errors : undefined,
          complete,
          estimated_time_remaining: complete
            ? null
            : `~${Math.ceil(remaining / BATCH_SIZE)} more calls needed`,
          message: complete
            ? `Launch campaign complete! Sent ${sentCount} emails.`
            : `Sent ${sentCount} emails. ${remaining} remaining - call again to continue.`,
        };
        break;
      }

      case 'launch_campaign_stats': {
        // Get stats specifically for the launch campaign
        const { data, error } = await supabaseAdmin
          .from('early_access_invites')
          .select(
            'status, claimed_at, bounced_at, launch_email_sent_at, launch_email_opened_at, launch_email_clicked_at'
          );

        if (error) throw error;

        const total = data?.length || 0;
        const claimed = data?.filter((i) => i.claimed_at !== null).length || 0;
        const bounced = data?.filter((i) => i.bounced_at !== null).length || 0;
        const eligibleForLaunch = data?.filter((i) => !i.claimed_at && !i.bounced_at).length || 0;
        const launchEmailSent = data?.filter((i) => i.launch_email_sent_at !== null).length || 0;
        const launchEmailOpened =
          data?.filter((i) => i.launch_email_opened_at !== null).length || 0;
        const launchEmailClicked =
          data?.filter((i) => i.launch_email_clicked_at !== null).length || 0;
        const pendingLaunchEmail = eligibleForLaunch - launchEmailSent;

        result = {
          stats: {
            total_invites: total,
            already_signed_up: claimed,
            bounced: bounced,
            eligible_for_launch: eligibleForLaunch,
            launch_emails_sent: launchEmailSent,
            launch_emails_pending: pendingLaunchEmail,
            launch_emails_opened: launchEmailOpened,
            launch_emails_clicked: launchEmailClicked,
            rates: {
              signup_rate_early_access:
                total > 0 ? `${((claimed / total) * 100).toFixed(1)}%` : '0%',
              launch_open_rate:
                launchEmailSent > 0
                  ? `${((launchEmailOpened / launchEmailSent) * 100).toFixed(1)}%`
                  : '0%',
              launch_click_rate:
                launchEmailOpened > 0
                  ? `${((launchEmailClicked / launchEmailOpened) * 100).toFixed(1)}%`
                  : '0%',
            },
          },
        };
        break;
      }

      case 'get_segmented_leads': {
        // Get leads segmented by engagement level for the new Early Access page design
        // Signed Up: converted users (success!) - cross-referenced against auth.users
        // Hot: clicked at least one email but didn't sign up
        // Warm: opened but never clicked
        // Cold: never opened any email

        const { data: allInvites, error: invitesError } = await supabaseAdmin
          .from('early_access_invites')
          .select(
            `
            id,
            email,
            status,
            sent_at,
            delivered_at,
            opened_at,
            clicked_at,
            claimed_at,
            bounced_at,
            bounce_type,
            created_at,
            invite_token,
            send_count,
            user_id,
            launch_email_sent_at,
            launch_email_opened_at,
            launch_email_clicked_at
          `
          )
          .order('created_at', { ascending: false });

        if (invitesError) throw invitesError;

        // Get ALL user emails from auth.users to definitively identify who has signed up
        // This catches users who signed up directly (not through invite link)
        const { data: authUsersData, error: authUsersError } =
          await supabaseAdmin.auth.admin.listUsers({
            perPage: 1000, // Get all users
          });

        if (authUsersError) {
          console.error('Error fetching auth users:', authUsersError);
        }

        // Create a Set of lowercase, trimmed emails for fast lookup
        const signedUpEmails = new Set(
          authUsersData?.users?.map((u) => u.email?.toLowerCase().trim()).filter(Boolean) || []
        );

        console.log(`Found ${signedUpEmails.size} registered users in auth.users`);
        console.log(`Signed up emails: ${Array.from(signedUpEmails).join(', ')}`);

        // Get profile data for signed up users (for display purposes)
        const signedUpUserIds = allInvites?.filter((i) => i.user_id).map((i) => i.user_id) || [];
        let profilesMap: Record<string, any> = {};

        if (signedUpUserIds.length > 0) {
          const { data: profiles } = await supabaseAdmin
            .from('profiles')
            .select('id, full_name, role, created_at')
            .in('id', signedUpUserIds);

          if (profiles) {
            profilesMap = profiles.reduce(
              (acc, p) => {
                acc[p.id] = p;
                return acc;
              },
              {} as Record<string, any>
            );
          }
        }

        // Segment all leads
        const signedUp: typeof allInvites = [];
        const hot: typeof allInvites = [];
        const warm: typeof allInvites = [];
        const cold: typeof allInvites = [];
        const bounced: typeof allInvites = [];

        for (const invite of allInvites || []) {
          const emailLower = invite.email.toLowerCase().trim();

          // Bounced emails go to their own category
          if (invite.bounced_at) {
            bounced.push(invite);
            continue;
          }

          // Check if this email exists in auth.users (actually signed up)
          // This is the definitive check - catches direct signups too
          const hasSignedUp = signedUpEmails.has(emailLower);

          if (hasSignedUp) {
            console.log(`✓ ${emailLower} has signed up - moving to signed_up segment`);
          }

          if (hasSignedUp) {
            signedUp.push(invite);
            continue;
          }

          // Has clicked any email?
          const hasClicked = invite.clicked_at || invite.launch_email_clicked_at;
          // Has opened any email?
          const hasOpened = invite.opened_at || invite.launch_email_opened_at;

          if (hasClicked) {
            hot.push(invite);
          } else if (hasOpened) {
            warm.push(invite);
          } else {
            cold.push(invite);
          }
        }

        // Helper to get last activity description
        const getLastActivity = (invite: (typeof allInvites)[0]) => {
          if (invite.claimed_at) {
            return { type: 'signed_up', date: invite.claimed_at };
          }
          if (invite.clicked_at) {
            return { type: 'clicked', date: invite.clicked_at };
          }
          if (invite.launch_email_clicked_at) {
            return { type: 'clicked_launch', date: invite.launch_email_clicked_at };
          }
          if (invite.opened_at) {
            return { type: 'opened', date: invite.opened_at };
          }
          if (invite.launch_email_opened_at) {
            return { type: 'opened_launch', date: invite.launch_email_opened_at };
          }
          if (invite.delivered_at) {
            return { type: 'delivered', date: invite.delivered_at };
          }
          if (invite.sent_at) {
            return { type: 'sent', date: invite.sent_at };
          }
          return { type: 'created', date: invite.created_at };
        };

        // Sort each segment by most recent activity
        const sortByActivity = (a: (typeof allInvites)[0], b: (typeof allInvites)[0]) => {
          const aActivity = getLastActivity(a);
          const bActivity = getLastActivity(b);
          return new Date(bActivity.date).getTime() - new Date(aActivity.date).getTime();
        };

        signedUp.sort(sortByActivity);
        hot.sort(sortByActivity);
        warm.sort(sortByActivity);
        cold.sort(sortByActivity);

        // Add last_activity and user profile to each lead for display
        const addActivity = (leads: typeof allInvites) =>
          leads.map((lead) => ({
            ...lead,
            last_activity: getLastActivity(lead),
            user:
              lead.user_id && profilesMap[lead.user_id]
                ? {
                    id: lead.user_id,
                    full_name: profilesMap[lead.user_id].full_name,
                    role: profilesMap[lead.user_id].role,
                    signed_up_at: profilesMap[lead.user_id].created_at,
                  }
                : null,
          }));

        const totalInvites = allInvites?.length || 0;

        result = {
          segments: {
            signed_up: addActivity(signedUp),
            hot: addActivity(hot),
            warm: addActivity(warm),
            cold: addActivity(cold),
            bounced: addActivity(bounced),
          },
          stats: {
            total: totalInvites,
            total_unconverted: hot.length + warm.length + cold.length,
            signed_up: signedUp.length,
            bounced: bounced.length,
            hot_count: hot.length,
            warm_count: warm.length,
            cold_count: cold.length,
            conversion_rate:
              totalInvites > 0 ? `${((signedUp.length / totalInvites) * 100).toFixed(0)}%` : '0%',
          },
        };
        break;
      }

      case 'send_to_segment': {
        // Send targeted email to a specific segment with rate limiting
        // Processes in batches to avoid Resend rate limits and function timeouts
        // Note: segment is already parsed from req.json() at the top of the function

        if (!segment || !['hot', 'warm', 'cold'].includes(segment)) {
          throw new Error('Valid segment (hot, warm, cold) is required');
        }

        // Batch configuration - same as send_launch_campaign
        const BATCH_SIZE = 10; // Process 10 at a time per function call
        const DELAY_BETWEEN_EMAILS_MS = 6000; // 6 seconds between emails to stay within rate limits

        // 24-hour cooldown - can re-send to leads after 1 day
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        // Get ALL user emails from auth.users to definitively identify who has signed up
        // This catches users who signed up directly (not through invite link)
        const { data: authUsersData, error: authUsersError } =
          await supabaseAdmin.auth.admin.listUsers({
            perPage: 1000,
          });

        if (authUsersError) {
          console.error('Error fetching auth users:', authUsersError);
        }

        // Create a Set of lowercase emails for fast lookup
        const signedUpEmails = new Set(
          authUsersData?.users?.map((u) => u.email?.toLowerCase()).filter(Boolean) || []
        );

        console.log(
          `Found ${signedUpEmails.size} registered users - will exclude from segment sends`
        );

        // Get leads for the specified segment - exclude bounced
        // Allow re-sending if launch_email_sent_at is null OR older than 24 hours
        const { data: allInvites, error: invitesError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .is('bounced_at', null);

        if (invitesError) throw invitesError;

        // Filter by segment AND exclude anyone who has actually signed up (in auth.users)
        // Also exclude anyone who received an email in the last 24 hours
        const segmentLeads =
          allInvites?.filter((invite) => {
            const emailLower = invite.email.toLowerCase().trim();

            // Skip if this email exists in auth.users (they've signed up)
            if (signedUpEmails.has(emailLower)) {
              console.log(`Excluding ${emailLower} - already signed up`);
              return false;
            }

            // Skip if email was sent in the last 24 hours
            if (invite.launch_email_sent_at && invite.launch_email_sent_at > oneDayAgo) {
              return false;
            }

            const hasClicked = invite.clicked_at || invite.launch_email_clicked_at;
            const hasOpened = invite.opened_at || invite.launch_email_opened_at;

            if (segment === 'hot') return hasClicked;
            if (segment === 'warm') return hasOpened && !hasClicked;
            if (segment === 'cold') return !hasOpened;
            return false;
          }) || [];

        const totalInSegment = segmentLeads.length;

        if (totalInSegment === 0) {
          result = {
            sent: 0,
            remaining: 0,
            total_in_segment: 0,
            complete: true,
            message: `No leads in ${segment} segment need emails (all already sent or signed up)`,
          };
          break;
        }

        // Take only a batch to process this call
        const batchToProcess = segmentLeads.slice(0, BATCH_SIZE);
        const remaining = totalInSegment - batchToProcess.length;

        // Send emails (using launch email template as it's the current campaign)
        let sentCount = 0;
        const errors: string[] = [];
        const sentEmails: string[] = [];

        for (let i = 0; i < batchToProcess.length; i++) {
          const invite = batchToProcess[i];

          try {
            const emailHtml = generateLaunchEmailHTML(invite.email, invite.invite_token);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <hello@elec-mate.com>',
              replyTo: 'info@elec-mate.com',
              to: [invite.email],
              subject: '⚡ What would you do with 5 extra hours a week?',
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            await supabaseAdmin
              .from('early_access_invites')
              .update({
                launch_email_sent_at: new Date().toISOString(),
                launch_email_id: emailData?.id || null,
              })
              .eq('id', invite.id);

            sentCount++;
            sentEmails.push(invite.email);

            // Rate limit: wait between emails (except after the last one)
            if (i < batchToProcess.length - 1) {
              await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_EMAILS_MS));
            }
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        const complete = remaining === 0;
        console.log(
          `Sent ${sentCount} emails to ${segment} segment by admin ${user.id}. ${remaining} remaining.`
        );

        result = {
          sent: sentCount,
          segment,
          total_in_segment: totalInSegment,
          remaining,
          complete,
          sent_to: sentEmails,
          errors: errors.length > 0 ? errors : undefined,
          estimated_calls_remaining: complete ? 0 : Math.ceil(remaining / BATCH_SIZE),
          message: complete
            ? `${segment.toUpperCase()} segment complete! Sent ${sentCount} emails.`
            : `Sent ${sentCount} emails to ${segment} segment. ${remaining} remaining - click again to continue.`,
        };
        break;
      }

      case 'retry_failed': {
        // Retry ONLY the failed sends - people who never actually received the email
        // Failed = attempted but no resend_email_id (email wasn't actually sent)
        const BATCH_SIZE = 50;

        // Get count of all failed sends
        const { count: totalFailedCount } = await supabaseAdmin
          .from('early_access_invites')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'sent')
          .is('opened_at', null)
          .is('claimed_at', null)
          .not('last_send_attempt_at', 'is', null)
          .or('resend_email_id.is.null,send_count.is.null,send_count.eq.0');

        // Get next batch of failed sends
        const { data: failedInvites, error: failedError } = await supabaseAdmin
          .from('early_access_invites')
          .select('*')
          .eq('status', 'sent')
          .is('opened_at', null)
          .is('claimed_at', null)
          .not('last_send_attempt_at', 'is', null)
          .or('resend_email_id.is.null,send_count.is.null,send_count.eq.0')
          .order('created_at', { ascending: true })
          .limit(BATCH_SIZE);

        if (failedError) throw failedError;

        if (!failedInvites || failedInvites.length === 0) {
          result = {
            sent: 0,
            remaining: 0,
            total_failed: totalFailedCount || 0,
            message: 'No more failed sends to retry',
            complete: true,
          };
          break;
        }

        let sentCount = 0;
        const errors: string[] = [];

        for (const invite of failedInvites) {
          try {
            // Mark attempt
            await supabaseAdmin
              .from('early_access_invites')
              .update({ last_send_attempt_at: new Date().toISOString() })
              .eq('id', invite.id);

            const emailHtml = generateInviteEmailHTML(invite.email, invite.invite_token);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <hello@elec-mate.com>',
              replyTo: 'info@elec-mate.com',
              to: [invite.email],
              subject: 'Reminder: Your Early Access to Elec-Mate is Waiting!',
              html: emailHtml,
            });

            if (emailError) {
              errors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            // Update with success
            await supabaseAdmin
              .from('early_access_invites')
              .update({
                sent_at: new Date().toISOString(),
                resend_email_id: emailData?.id || null,
                send_count: (invite.send_count || 0) + 1,
              })
              .eq('id', invite.id);

            sentCount++;
          } catch (err: any) {
            errors.push(`${invite.email}: ${err.message}`);
          }
        }

        // Calculate remaining
        const { count: remainingCount } = await supabaseAdmin
          .from('early_access_invites')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'sent')
          .is('opened_at', null)
          .is('claimed_at', null)
          .not('last_send_attempt_at', 'is', null)
          .or('resend_email_id.is.null,send_count.is.null,send_count.eq.0');

        const remaining = remainingCount || 0;
        const complete = remaining === 0;

        console.log(
          `Retried ${sentCount}/${failedInvites.length} failed sends by admin ${user.id}. Remaining: ${remaining}`
        );

        result = {
          sent: sentCount,
          attempted: failedInvites.length,
          remaining,
          total_failed: totalFailedCount || 0,
          errors: errors.length > 0 ? errors : undefined,
          complete,
          message: complete
            ? `All done! Sent ${sentCount} emails.`
            : `Sent ${sentCount} emails. ${remaining} remaining - call again to continue.`,
        };
        break;
      }

      case 'send_test_conversion_email': {
        // Send a test conversion email to preview the template
        if (!testEmail) {
          throw new Error('testEmail is required');
        }

        const convTestHtml = generateConversionEmailHTML(testEmail);

        const { data: convTestData, error: convTestError } = await resend.emails.send({
          from: 'Elec-Mate <offers@elec-mate.com>',
          replyTo: 'info@elec-mate.com',
          to: [testEmail.trim().toLowerCase()],
          subject: '[TEST] Your Sunday Round-Up ⚡',
          html: convTestHtml,
          tags: [
            { name: 'campaign', value: 'conversion' },
            { name: 'type', value: 'test' },
          ],
        });

        if (convTestError) {
          throw new Error(`Failed to send test email: ${convTestError.message}`);
        }

        console.log(
          `Conversion test email sent to ${testEmail}${user ? ` by admin ${user.id}` : ''}`
        );
        result = { success: true, email: testEmail, resendId: convTestData?.id };
        break;
      }

      case 'get_conversion_leads': {
        // Get all invites for the conversion campaign view
        const { data: allConvInvites, error: convInvitesError } = await supabaseAdmin
          .from('early_access_invites')
          .select(
            'id, email, created_at, conversion_email_sent_at, conversion_email_id, bounced_at, claimed_at, user_id'
          )
          .order('created_at', { ascending: false });

        if (convInvitesError) throw convInvitesError;

        // Get auth users to identify who signed up
        const { data: convAuthData } = await supabaseAdmin.auth.admin.listUsers({
          perPage: 1000,
        });
        const convSignedUpEmails = new Set(
          convAuthData?.users?.map((u) => u.email?.toLowerCase().trim()).filter(Boolean) || []
        );

        // Get tracking events for conversion emails
        const convEmailIds = (allConvInvites || [])
          .filter((i) => i.conversion_email_id)
          .map((i) => i.conversion_email_id);

        const convTrackingMap = new Map<string, Set<string>>();
        const convLinkCounts = new Map<string, number>();
        let convDelivered = 0;
        let convEmailBounced = 0;

        if (convEmailIds.length > 0) {
          const { data: convEvents } = await supabaseAdmin
            .from('email_tracking_events')
            .select('email_id, event_type, link_url')
            .in('email_id', convEmailIds);

          const deliveredSet = new Set<string>();
          const bouncedSet = new Set<string>();

          (convEvents || []).forEach((e: any) => {
            if (!convTrackingMap.has(e.email_id)) convTrackingMap.set(e.email_id, new Set());
            convTrackingMap.get(e.email_id)!.add(e.event_type);

            if (e.event_type === 'email.delivered') deliveredSet.add(e.email_id);
            if (e.event_type === 'email.bounced') bouncedSet.add(e.email_id);
            if (e.event_type === 'email.clicked' && e.link_url) {
              convLinkCounts.set(e.link_url, (convLinkCounts.get(e.link_url) || 0) + 1);
            }
          });

          convDelivered = deliveredSet.size;
          convEmailBounced = bouncedSet.size;
        }

        // Get profiles for converted users
        const convUserIds = (allConvInvites || []).filter((i) => i.user_id).map((i) => i.user_id);
        let convProfilesMap: Record<string, any> = {};
        if (convUserIds.length > 0) {
          const { data: convProfiles } = await supabaseAdmin
            .from('profiles')
            .select('id, full_name, role, created_at')
            .in('id', convUserIds);
          if (convProfiles) {
            convProfilesMap = convProfiles.reduce(
              (acc, p) => {
                acc[p.id] = p;
                return acc;
              },
              {} as Record<string, any>
            );
          }
        }

        // Segment into unconverted and converted
        const unconverted: any[] = [];
        const converted: any[] = [];
        let convUnsent = 0;
        let convSent = 0;
        let convOpened = 0;
        let convClicked = 0;
        let convInviteBounced = 0;

        for (const invite of allConvInvites || []) {
          if (invite.bounced_at) {
            convInviteBounced++;
            continue;
          }

          const emailLower = invite.email.toLowerCase().trim();
          const hasSignedUp = convSignedUpEmails.has(emailLower);

          if (hasSignedUp) {
            const profile =
              invite.user_id && convProfilesMap[invite.user_id]
                ? convProfilesMap[invite.user_id]
                : null;
            converted.push({
              id: invite.id,
              email: invite.email,
              claimed_at: invite.claimed_at,
              user: profile
                ? {
                    full_name: profile.full_name,
                    role: profile.role,
                    signed_up_at: profile.created_at,
                  }
                : null,
            });
            continue;
          }

          // Determine conversion status from tracking events
          let convStatus = 'unsent';
          if (invite.conversion_email_sent_at) {
            convStatus = 'sent';
            const events = convTrackingMap.get(invite.conversion_email_id) || new Set();
            if (events.has('email.clicked')) {
              convStatus = 'clicked';
              convClicked++;
            } else if (events.has('email.opened')) {
              convStatus = 'opened';
              convOpened++;
            } else {
              convSent++;
            }
          } else {
            convUnsent++;
          }

          unconverted.push({
            id: invite.id,
            email: invite.email,
            created_at: invite.created_at,
            conversion_status: convStatus,
            conversion_email_sent_at: invite.conversion_email_sent_at,
            conversion_email_opened_at: null,
            conversion_email_clicked_at: null,
          });
        }

        // Top clicked links
        const convTopLinks = Array.from(convLinkCounts.entries())
          .map(([url, count]) => ({ url, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        // Compute rates
        const convTotalSent = convSent + convOpened + convClicked;
        const convBase = convDelivered || 1;

        result = {
          unconverted,
          converted,
          stats: {
            total_unconverted: unconverted.length,
            unsent: convUnsent,
            sent: convSent,
            totalSent: convTotalSent,
            delivered: convDelivered,
            opened: convOpened,
            clicked: convClicked,
            emailBounced: convEmailBounced,
            total_converted: converted.length,
            bounced: convInviteBounced,
            openRate: ((convOpened / convBase) * 100).toFixed(1),
            clickRate: ((convClicked / convBase) * 100).toFixed(1),
            bounceRate: ((convEmailBounced / convBase) * 100).toFixed(1),
            topLinks: convTopLinks,
          },
        };
        break;
      }

      case 'send_manual_conversion_email': {
        // Send conversion email to any email address (manual entry)
        if (!manualEmail) {
          throw new Error('manualEmail is required');
        }

        const convManualHtml = generateConversionEmailHTML(manualEmail);
        const { data: convManualData, error: convManualError } = await resend.emails.send({
          from: 'Elec-Mate <offers@elec-mate.com>',
          replyTo: 'info@elec-mate.com',
          to: [manualEmail.trim().toLowerCase()],
          subject: 'Your Sunday Round-Up ⚡',
          html: convManualHtml,
          tags: [
            { name: 'campaign', value: 'conversion' },
            { name: 'version', value: 'v1' },
            { name: 'type', value: 'manual' },
          ],
        });

        if (convManualError) {
          throw new Error(`Failed to send: ${convManualError.message}`);
        }

        // Log to email_logs
        await supabaseAdmin.from('email_logs').insert({
          to_email: manualEmail,
          subject: 'Your Sunday Round-Up ⚡',
          template: 'conversion_v1',
          status: 'sent',
          metadata: { type: 'manual_conversion', resend_id: convManualData?.id },
        });

        console.log(`Manual conversion email sent to ${manualEmail} by admin ${user.id}`);
        result = { success: true, email: manualEmail, resendId: convManualData?.id };
        break;
      }

      case 'send_conversion_campaign': {
        // Batch send conversion emails — called repeatedly by frontend until complete
        const CONV_BATCH_SIZE = 10;
        const CONV_DELAY_MS = 500;

        // Get auth users to exclude signed-up
        const { data: convCampAuthData } = await supabaseAdmin.auth.admin.listUsers({
          perPage: 1000,
        });
        const convCampSignedUp = new Set(
          convCampAuthData?.users?.map((u) => u.email?.toLowerCase().trim()).filter(Boolean) || []
        );

        // Get ALL unsent, non-bounced invites (only ~200-300 rows, tiny payload)
        const { data: convUnsent2, error: convUnsentError } = await supabaseAdmin
          .from('early_access_invites')
          .select('id, email, invite_token')
          .is('conversion_email_sent_at', null)
          .is('bounced_at', null)
          .order('created_at', { ascending: true });

        if (convUnsentError) throw convUnsentError;

        // Filter out signed-up users then take first batch
        const convEligible = (convUnsent2 || []).filter(
          (i) => !convCampSignedUp.has(i.email.toLowerCase().trim())
        );
        const convBatch = convEligible.slice(0, CONV_BATCH_SIZE);

        if (convBatch.length === 0) {
          result = {
            sent: 0,
            remaining: 0,
            complete: true,
            message: 'All conversion emails sent!',
          };
          break;
        }

        let convSentCount = 0;
        const convErrors: string[] = [];

        for (let i = 0; i < convBatch.length; i++) {
          const invite = convBatch[i];
          try {
            const emailHtml = generateConversionEmailHTML(invite.email);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <offers@elec-mate.com>',
              replyTo: 'info@elec-mate.com',
              to: [invite.email.trim().toLowerCase()],
              subject: 'Your Sunday Round-Up ⚡',
              html: emailHtml,
              tags: [
                { name: 'campaign', value: 'conversion' },
                { name: 'version', value: 'v1' },
              ],
            });

            if (emailError) {
              convErrors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            await supabaseAdmin
              .from('early_access_invites')
              .update({
                conversion_email_sent_at: new Date().toISOString(),
                conversion_email_id: emailData?.id || null,
              })
              .eq('id', invite.id);

            convSentCount++;

            // Rate limit between sends
            if (i < convBatch.length - 1) {
              await new Promise((r) => setTimeout(r, CONV_DELAY_MS));
            }
          } catch (err: any) {
            convErrors.push(`${invite.email}: ${err.message}`);
          }
        }

        // Count remaining — fetch actual unsent emails and exclude signed-up properly
        const { data: convRemainingRows } = await supabaseAdmin
          .from('early_access_invites')
          .select('email')
          .is('conversion_email_sent_at', null)
          .is('bounced_at', null);

        const convRemaining = (convRemainingRows || []).filter(
          (r) => !convCampSignedUp.has(r.email.toLowerCase().trim())
        ).length;
        const convComplete = convRemaining === 0;

        console.log(
          `Conversion campaign: Sent ${convSentCount}/${convBatch.length} by admin ${user.id}. ~${convRemaining} remaining.`
        );

        result = {
          sent: convSentCount,
          remaining: convRemaining,
          complete: convComplete,
          errors: convErrors.length > 0 ? convErrors : undefined,
          message: convComplete
            ? `All done! Sent ${convSentCount} emails.`
            : `Sent ${convSentCount}. ~${convRemaining} remaining.`,
        };
        break;
      }

      // ── Early Access £7.99 Offer Campaign ──────────────────────────────

      case 'get_ea_offer_status': {
        // Get offer campaign stats — how many sent, remaining, total
        const { data: allInvites, error: eaErr } = await supabaseAdmin
          .from('early_access_invites')
          .select('id, email, offer_sent_at, bounced_at, user_id');
        if (eaErr) throw eaErr;

        // Get auth users to exclude signed-up
        const { data: eaAuthData } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
        const eaSignedUp = new Set(
          eaAuthData?.users?.map((u) => u.email?.toLowerCase().trim()).filter(Boolean) || []
        );

        let eaTotal = 0;
        let eaSent = 0;
        let eaRemaining = 0;

        for (const invite of allInvites || []) {
          if (invite.bounced_at) continue;
          if (eaSignedUp.has(invite.email.toLowerCase().trim())) continue;
          eaTotal++;
          if (invite.offer_sent_at) {
            eaSent++;
          } else {
            eaRemaining++;
          }
        }

        result = { total: eaTotal, sent: eaSent, remaining: eaRemaining };
        break;
      }

      case 'send_ea_offer_test': {
        // Send a test offer email to a specific address
        if (!testEmail) throw new Error('testEmail is required');

        const eaTestHtml =
          email_version === 'v6'
            ? generateEarlyAccessV6HTML()
            : generateEarlyAccessOfferHTML(testEmail);
        const eaTestSubject =
          email_version === 'v6'
            ? "[TEST] You signed up early. Here's what that gets you."
            : '[TEST] One-off offer — £7.99/month, locked forever';
        const eaTestVersion = email_version === 'v6' ? 'v6' : 'v1';
        const { data: eaTestData, error: eaTestErr } = await resend.emails.send({
          from: 'Elec-Mate <founder@elec-mate.com>',
          replyTo: 'founder@elec-mate.com',
          to: [testEmail.trim().toLowerCase()],
          subject: eaTestSubject,
          html: eaTestHtml,
          tags: [
            { name: 'campaign', value: 'early_access_offer' },
            { name: 'version', value: eaTestVersion },
            { name: 'type', value: 'test' },
          ],
        });

        if (eaTestErr) throw new Error(`Failed to send: ${eaTestErr.message}`);

        console.log(
          `EA offer test email (${eaTestVersion}) sent to ${testEmail} by admin ${user.id}`
        );
        result = { success: true, email: testEmail, resendId: eaTestData?.id };
        break;
      }

      case 'send_ea_offer_campaign': {
        // Batch send offer emails — called repeatedly by frontend until complete
        const EA_BATCH_SIZE = 10;
        const EA_DELAY_MS = 500;

        // Get auth users to exclude signed-up
        const { data: eaCampAuthData } = await supabaseAdmin.auth.admin.listUsers({
          perPage: 1000,
        });
        const eaCampSignedUp = new Set(
          eaCampAuthData?.users?.map((u) => u.email?.toLowerCase().trim()).filter(Boolean) || []
        );

        // Get ALL unsent, non-bounced invites
        const { data: eaUnsent, error: eaUnsentErr } = await supabaseAdmin
          .from('early_access_invites')
          .select('id, email')
          .is('offer_sent_at', null)
          .is('bounced_at', null)
          .order('created_at', { ascending: true });

        if (eaUnsentErr) throw eaUnsentErr;

        // Filter out signed-up users then take first batch
        const eaEligible = (eaUnsent || []).filter(
          (i) => !eaCampSignedUp.has(i.email.toLowerCase().trim())
        );
        const eaBatch = eaEligible.slice(0, EA_BATCH_SIZE);

        if (eaBatch.length === 0) {
          result = { sent: 0, remaining: 0, complete: true, message: 'All offer emails sent!' };
          break;
        }

        let eaSentCount = 0;
        const eaErrors: string[] = [];

        for (let i = 0; i < eaBatch.length; i++) {
          const invite = eaBatch[i];
          try {
            const emailHtml =
              email_version === 'v6'
                ? generateEarlyAccessV6HTML()
                : generateEarlyAccessOfferHTML(invite.email);
            const eaCampSubject =
              email_version === 'v6'
                ? "You signed up early. Here's what that gets you."
                : 'One-off offer — £7.99/month, locked forever';
            const eaCampVersion = email_version === 'v6' ? 'v6' : 'v1';

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <founder@elec-mate.com>',
              replyTo: 'founder@elec-mate.com',
              to: [invite.email.trim().toLowerCase()],
              subject: eaCampSubject,
              html: emailHtml,
              tags: [
                { name: 'campaign', value: 'early_access_offer' },
                { name: 'version', value: eaCampVersion },
              ],
            });

            if (emailError) {
              eaErrors.push(`${invite.email}: ${emailError.message}`);
              continue;
            }

            await supabaseAdmin
              .from('early_access_invites')
              .update({
                offer_sent_at: new Date().toISOString(),
                offer_email_id: emailData?.id || null,
              })
              .eq('id', invite.id);

            eaSentCount++;

            // Rate limit between sends
            if (i < eaBatch.length - 1) {
              await new Promise((r) => setTimeout(r, EA_DELAY_MS));
            }
          } catch (err: any) {
            eaErrors.push(`${invite.email}: ${err.message}`);
          }
        }

        // Count remaining
        const { data: eaRemainingRows } = await supabaseAdmin
          .from('early_access_invites')
          .select('email')
          .is('offer_sent_at', null)
          .is('bounced_at', null);

        const eaRemainingCount = (eaRemainingRows || []).filter(
          (r) => !eaCampSignedUp.has(r.email.toLowerCase().trim())
        ).length;
        const eaComplete = eaRemainingCount === 0;

        console.log(
          `EA offer campaign: Sent ${eaSentCount}/${eaBatch.length} by admin ${user.id}. ~${eaRemainingCount} remaining.`
        );

        result = {
          sent: eaSentCount,
          remaining: eaRemainingCount,
          complete: eaComplete,
          errors: eaErrors.length > 0 ? eaErrors : undefined,
          message: eaComplete
            ? `All done! Sent ${eaSentCount} emails.`
            : `Sent ${eaSentCount}. ~${eaRemainingCount} remaining.`,
        };
        break;
      }

      case 'reset_ea_offer_campaign': {
        // Clears offer_sent_at + offer_email_id so the campaign can be re-sent.
        // Bounced rows are left untouched — they can never receive email again.
        // Signed-up users are excluded at send-time regardless, so resetting their
        // rows is harmless — they will just be skipped again on the next send.
        const { error: resetErr } = await supabaseAdmin
          .from('early_access_invites')
          .update({ offer_sent_at: null, offer_email_id: null })
          .not('offer_sent_at', 'is', null); // only touch rows that have actually been sent

        if (resetErr) throw resetErr;

        // Re-compute how many are now eligible so the UI can update immediately
        const { data: postResetAuthData } = await supabaseAdmin.auth.admin.listUsers({
          perPage: 1000,
        });
        const postResetSignedUp = new Set(
          postResetAuthData?.users
            ?.map((u: any) => u.email?.toLowerCase().trim())
            .filter(Boolean) || []
        );
        const { data: postResetRows } = await supabaseAdmin
          .from('early_access_invites')
          .select('email, bounced_at')
          .is('bounced_at', null);

        const nowEligible = (postResetRows || []).filter(
          (r: any) => !postResetSignedUp.has(r.email.toLowerCase().trim())
        ).length;

        console.log(
          `EA offer campaign reset by admin ${user.id}. ${nowEligible} records now eligible.`
        );
        result = {
          success: true,
          remaining: nowEligible,
          message: `Campaign reset — ${nowEligible} eligible recipients ready to send`,
        };
        break;
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    console.error('Error in send-early-access-invite:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
