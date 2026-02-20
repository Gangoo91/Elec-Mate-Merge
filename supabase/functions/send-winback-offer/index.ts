import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { Resend } from 'npm:resend@2.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

// Rate limiting: 500ms between sends to stay within Resend limits (2/sec)
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const SEND_DELAY_MS = 500;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

// Win-back offer configuration
const WINBACK_CONFIG = {
  monthlyPrice: 7.99,
  yearlyPrice: 79.99,
  standardMonthlyPrice: 9.99,
  standardYearlyPrice: 99.99,
  discountPercent: 20,
  // Payment links for Electrician Win-Back product (prod_TtTdELbwjYaZQn)
  monthlyPaymentLink: 'https://buy.stripe.com/7sYcMY1gm67a6U96FgbjW00',
  yearlyPaymentLink: 'https://buy.stripe.com/5kQ3cobV0anqguJe7IbjW01',
};

interface EligibleUser {
  id: string;
  full_name: string | null;
  username: string;
  email: string;
  created_at: string;
  trial_ended_at: string;
}

// Generate win-back offer email HTML
function generateWinbackEmailHTML(user: EligibleUser): string {
  const firstName = user.full_name?.split(' ')[0] || 'mate';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Fancy another look? - Andrew, Elec-Mate</title>
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
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 500px; margin: 0 auto; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(251, 191, 36, 0.2);">

          <!-- Opening -->
          <tr>
            <td style="padding: 32px 24px 20px;">
              <p style="margin: 0 0 18px; font-size: 17px; color: #ffffff; line-height: 1.6;">
                Hey ${firstName},
              </p>
              <p style="margin: 0 0 16px; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                Quick one from me. You tried Elec-Mate a while back and the app's come a long way since your trial. I've been building flat out and I wanted to show you what's actually in it now.
              </p>
              <p style="margin: 0; font-size: 16px; color: #e2e8f0; line-height: 1.7;">
                This isn't vague promises. Here's exactly what you get:
              </p>
            </td>
          </tr>

          <!-- SECTION HEADER -->
          <tr>
            <td style="padding: 0 20px 8px;">
              <p style="margin: 0; font-size: 15px; color: #fbbf24; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                Here's what you actually get
              </p>
            </td>
          </tr>

          <!-- CERTS & TESTING (green accent) -->
          <tr>
            <td style="padding: 0 20px 16px;">
              <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.02) 100%); border: 1px solid rgba(34, 197, 94, 0.25); border-radius: 14px; padding: 18px;">
                <p style="margin: 0 0 10px; font-size: 13px; color: #22c55e; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  Certs &amp; Testing
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">7 certificate types:</strong> EICR, EIC, Minor Works, Fire Alarm, EV Charging, Emergency Lighting, Solar PV
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Photo gallery, PDF export, defect coding, client sign-off
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">Board Scanner</strong> &mdash; photograph a DB, get auto circuit mapping
                </p>
                <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">Schedule of Tests</strong> with automated compliance checking
                </p>
              </div>
            </td>
          </tr>

          <!-- YOUR BUILD PARTNERS (yellow accent) -->
          <tr>
            <td style="padding: 0 20px 16px;">
              <div style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.02) 100%); border: 1px solid rgba(251, 191, 36, 0.25); border-radius: 14px; padding: 18px;">
                <p style="margin: 0 0 10px; font-size: 13px; color: #fbbf24; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  Your Build Partners
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">Circuit Designer</strong> &mdash; BS 7671 compliant designs, cable sizing, CU layouts
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">Cost Engineer</strong> &mdash; quotes with live material pricing and labour data
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">Installation Specialist</strong> &mdash; step-by-step methods and diagrams
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">Health &amp; Safety</strong> &mdash; RAMS generated from a job description in 2 minutes
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">Maintenance Specialist</strong> &mdash; inspection planning and fault diagnosis
                </p>
                <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.6; font-style: italic;">
                  Coming soon: Testing &amp; Commissioning, Project Manager, Training Tutor
                </p>
              </div>
            </td>
          </tr>

          <!-- AI VISION TOOLS (blue accent) -->
          <tr>
            <td style="padding: 0 20px 16px;">
              <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.02) 100%); border: 1px solid rgba(59, 130, 246, 0.25); border-radius: 14px; padding: 18px;">
                <p style="margin: 0 0 10px; font-size: 13px; color: #3b82f6; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  AI Vision Tools
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Photograph a component &rarr; get specs and BS 7671 requirements
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Photograph wiring &rarr; get step-by-step instructions
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Photograph a fault &rarr; get EICR codes and fix steps
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Installation verification &rarr; BS 7671 compliance check
                </p>
                <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Client explainer &rarr; turn technical findings into plain English
                </p>
              </div>
            </td>
          </tr>

          <!-- BUSINESS TOOLS (amber accent) -->
          <tr>
            <td style="padding: 0 20px 16px;">
              <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.02) 100%); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 14px; padding: 18px;">
                <p style="margin: 0 0 10px; font-size: 13px; color: #f59e0b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  Business Tools
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">Quote &amp; Invoice Builder</strong> with live material pricing
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Customer management
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">50+ electrical calculators</strong> &mdash; cable sizing, Zs lookup, voltage drop, solar PV, EV charging...
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  <strong style="color: #ffffff;">14 business calculators</strong> &mdash; hourly rate, job profit, tax/NI, cash flow...
                </p>
                <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Materials marketplace with deals of the day
                </p>
              </div>
            </td>
          </tr>

          <!-- SITE SAFETY (red accent) -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.02) 100%); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 14px; padding: 18px;">
                <p style="margin: 0 0 10px; font-size: 13px; color: #ef4444; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                  Site Safety
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  RAMS from a job description in 2 mins
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Team briefing templates
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Near-miss reporting
                </p>
                <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Equipment tracker
                </p>
              </div>
            </td>
          </tr>

          <!-- Value Props -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <!-- TIME -->
              <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 16px; margin-bottom: 10px;">
                <p style="margin: 0 0 6px; font-size: 20px;">&#9200;</p>
                <p style="margin: 0 0 4px; font-size: 16px; color: #ffffff; font-weight: 700;">Your Time Back</p>
                <p style="margin: 0; font-size: 14px; color: #94a3b8; line-height: 1.5;">
                  Certs, RAMS, quotes &mdash; done on-site in minutes. Your evenings are yours again.
                </p>
              </div>

              <!-- COMPLIANCE -->
              <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 16px; margin-bottom: 10px;">
                <p style="margin: 0 0 6px; font-size: 20px;">&#9989;</p>
                <p style="margin: 0 0 4px; font-size: 16px; color: #ffffff; font-weight: 700;">Compliance Sorted</p>
                <p style="margin: 0; font-size: 14px; color: #94a3b8; line-height: 1.5;">
                  Everything BS 7671 backed. No guesswork, no second-guessing the regs.
                </p>
              </div>

              <!-- MONEY -->
              <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 16px;">
                <p style="margin: 0 0 6px; font-size: 20px;">&#128183;</p>
                <p style="margin: 0 0 4px; font-size: 16px; color: #ffffff; font-weight: 700;">More Money in Your Pocket</p>
                <p style="margin: 0; font-size: 14px; color: #94a3b8; line-height: 1.5;">
                  Ditch 5 separate apps &mdash; your cert software, RAMS tool, quoting spreadsheet, invoicing app, and that notes app. One subscription instead of five.
                </p>
              </div>
            </td>
          </tr>

          <!-- The Offer -->
          <tr>
            <td style="padding: 0 20px 24px;">
              <div style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 100%); border: 2px solid rgba(251, 191, 36, 0.4); border-radius: 16px; padding: 24px 20px; text-align: center;">
                <p style="margin: 0 0 4px; font-size: 14px; color: #94a3b8;">
                  Lock in early-adopter pricing
                </p>
                <p style="margin: 0; font-size: 48px; font-weight: 800; color: #fbbf24; line-height: 1;">
                  &pound;${WINBACK_CONFIG.monthlyPrice.toFixed(2)}<span style="font-size: 18px; font-weight: 600; color: #94a3b8;">/mo</span>
                </p>
                <p style="margin: 6px 0 12px; font-size: 14px; color: #94a3b8;">
                  <span style="text-decoration: line-through;">&pound;${WINBACK_CONFIG.standardMonthlyPrice.toFixed(2)}</span> &middot; <span style="color: #22c55e; font-weight: 600;">20% off</span> &middot; price locked forever
                </p>
                <p style="margin: 0 0 18px; font-size: 15px; color: #e2e8f0; line-height: 1.5;">
                  All of the above in your pocket for &pound;7.99. That's less than a bag of screwfix screws.
                </p>
                <a href="${WINBACK_CONFIG.monthlyPaymentLink}" style="display: block; padding: 16px 24px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #0f172a; text-decoration: none; font-size: 16px; font-weight: 700; border-radius: 12px; text-align: center; margin-bottom: 12px;">
                  Get back in at &pound;${WINBACK_CONFIG.monthlyPrice.toFixed(2)}/mo &rarr;
                </a>
                <a href="${WINBACK_CONFIG.yearlyPaymentLink}" style="display: block; padding: 14px 24px; background: rgba(251, 191, 36, 0.15); border: 2px solid rgba(251, 191, 36, 0.5); color: #fbbf24; text-decoration: none; font-size: 15px; font-weight: 600; border-radius: 12px; text-align: center;">
                  Or go yearly: &pound;${WINBACK_CONFIG.yearlyPrice.toFixed(2)} (&pound;${(WINBACK_CONFIG.yearlyPrice / 12).toFixed(2)}/mo)
                </a>
              </div>
            </td>
          </tr>

          <!-- Free Trial Offer -->
          <tr>
            <td style="padding: 0 24px 24px;">
              <div style="background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px; padding: 16px; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                  Not sure? Reply to this email and I'll give you <strong style="color: #60a5fa;">another free week</strong> to try it properly. No strings.
                </p>
              </div>
            </td>
          </tr>

          <!-- Something wasn't right? -->
          <tr>
            <td style="padding: 0 24px 28px;">
              <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.6; text-align: center;">
                If something put you off last time, I'd genuinely like to know &mdash; I'm updating this thing every day. Just reply.
              </p>
            </td>
          </tr>

          <!-- Sign off -->
          <tr>
            <td style="padding: 0 24px 32px;">
              <p style="margin: 0 0 4px; font-size: 15px; color: #e2e8f0;">
                Cheers,
              </p>
              <p style="margin: 0 0 4px; font-size: 16px; color: #ffffff; font-weight: 600;">
                Andrew
              </p>
              <p style="margin: 0; font-size: 13px; color: #64748b;">
                Founder, Elec-Mate
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 24px; text-align: center; background-color: rgba(15, 23, 42, 0.6); border-top: 1px solid rgba(255,255,255,0.05);">
              <p style="margin: 0; font-size: 12px; color: #475569;">
                &copy; ${new Date().getFullYear()} Elec-Mate &middot; Built for UK Sparks &#x1F1EC;&#x1F1E7;&#x26A1;
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Generate win-back v2 email HTML — "Sunday Round-Up" style (compact for Gmail)
function generateWinbackEmailV2HTML(user: EligibleUser): string {
  const firstName = user.full_name?.split(' ')[0] || 'mate';
  // Shorthand styles to reduce HTML weight (Gmail clips at ~102KB)
  const t = 'color:#e2e8f0;font-size:14px;line-height:1.6;margin:0 0 5px';
  const b = 'color:#fff;font-weight:700';
  const h =
    'font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 8px';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="dark"><!--[if mso]><style>body,table,td{font-family:Arial,sans-serif!important}</style><![endif]--></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#0f172a">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#0f172a"><tr><td style="padding:24px 12px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:500px;margin:0 auto;background:linear-gradient(180deg,#1e293b,#0f172a);border-radius:24px;overflow:hidden;border:1px solid rgba(251,191,36,0.2)">

<tr><td style="padding:32px 24px 20px">
<p style="margin:0 0 16px;font-size:17px;color:#fff;line-height:1.6">Hey ${firstName},</p>
<p style="margin:0;font-size:16px;color:#e2e8f0;line-height:1.7">Sunday evening round-up from me. You had a look at Elec-Mate a while back and honestly, the app now is a different beast to what you tried. I've been shipping features every single day and wanted to show you what's changed.</p>
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
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}">&#x2705; <strong style="${b}">Project management</strong> &middot; <strong style="${b}">Job vacancies</strong> &mdash; live listings aggregated daily</p>
</div></td></tr>

<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#60a5fa;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">&#x1F6A7; Coming next</p></td></tr>

<tr><td style="padding:0 20px 20px"><div style="background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.2);border-radius:14px;padding:14px">
<p style="${t}">&#x1F527; <strong style="${b}">Inspection &amp; Testing upgrades</strong> &mdash; spending serious time making this even better</p>
<p style="${t}">&#x1F4E6; <strong style="${b}">Materials comparison</strong> &mdash; drop your list in, AI finds the best prices across suppliers</p>
<p style="${t}">&#x1F3E2; <strong style="${b}">Employer Hub</strong> &mdash; manage your team, apprentices, and jobs in one place</p>
<p style="margin:0;color:#e2e8f0;font-size:14px;line-height:1.6">&#x1F4F1; <strong style="${b}">App Store launch</strong> &mdash; iOS &amp; Android native apps dropping soon</p>
</div></td></tr>

<tr><td style="padding:0 20px 20px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.15),rgba(251,191,36,0.05));border:2px solid rgba(251,191,36,0.4);border-radius:16px;padding:22px 18px;text-align:center">
<p style="margin:0 0 4px;font-size:14px;color:#e2e8f0">All of this for less than a bag of Screwfix screws</p>
<p style="margin:0;font-size:48px;font-weight:800;color:#fbbf24;line-height:1">&pound;${WINBACK_CONFIG.monthlyPrice.toFixed(2)}<span style="font-size:18px;font-weight:600;color:#94a3b8">/mo</span></p>
<p style="margin:6px 0 8px;font-size:14px;color:#94a3b8">or &pound;${WINBACK_CONFIG.yearlyPrice.toFixed(2)}/yr (&pound;${(WINBACK_CONFIG.yearlyPrice / 12).toFixed(2)}/mo) &middot; <span style="color:#22c55e;font-weight:600">price locked</span></p>
<p style="margin:0 0 10px;font-size:13px;color:#f59e0b;font-weight:600">You're early. The price reflects that. It's going to &pound;12.99/mo when the app hits the stores.</p>
<p style="margin:0 0 16px;font-size:15px;color:#e2e8f0;line-height:1.5">Replace your cert software, RAMS tool, quoting spreadsheet, invoicing app and that notes app. One sub instead of five.</p>
<a href="${WINBACK_CONFIG.monthlyPaymentLink}" style="display:block;padding:16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#0f172a;text-decoration:none;font-size:16px;font-weight:700;border-radius:12px;text-align:center;margin-bottom:10px">Get back in at &pound;${WINBACK_CONFIG.monthlyPrice.toFixed(2)}/mo &rarr;</a>
<a href="${WINBACK_CONFIG.yearlyPaymentLink}" style="display:block;padding:14px;background:rgba(251,191,36,0.15);border:2px solid rgba(251,191,36,0.5);color:#fbbf24;text-decoration:none;font-size:15px;font-weight:600;border-radius:12px;text-align:center">Go yearly: &pound;${WINBACK_CONFIG.yearlyPrice.toFixed(2)} &mdash; save &pound;${(WINBACK_CONFIG.monthlyPrice * 12 - WINBACK_CONFIG.yearlyPrice).toFixed(2)}/yr</a>
</div></td></tr>

<tr><td style="padding:0 20px 20px"><div style="background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.2);border-radius:12px;padding:14px;text-align:center">
<p style="margin:0;font-size:14px;color:#e2e8f0;line-height:1.6">Not sure? Reply to this email and I'll give you <strong style="color:#60a5fa">another free week</strong> to try it properly. No strings.</p>
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

// Generate win-back v3 email HTML — "This Week" weekly round-up style (compact for Gmail)
function generateWinbackEmailV3HTML(user: EligibleUser): string {
  const firstName = user.full_name?.split(' ')[0] || 'mate';
  const t = 'color:#e2e8f0;font-size:14px;line-height:1.6;margin:0 0 5px';
  const b = 'color:#fff;font-weight:700';
  const h =
    'font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 8px';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="dark"><!--[if mso]><style>body,table,td{font-family:Arial,sans-serif!important}</style><![endif]--></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#0f172a">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#0f172a"><tr><td style="padding:24px 12px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:500px;margin:0 auto;background:linear-gradient(180deg,#1e293b,#0f172a);border-radius:24px;overflow:hidden;border:1px solid rgba(251,191,36,0.2)">

<tr><td style="padding:32px 24px 20px">
<p style="margin:0 0 16px;font-size:17px;color:#fff;line-height:1.6">Hey ${firstName},</p>
<p style="margin:0;font-size:16px;color:#e2e8f0;line-height:1.7">Quick update from me. Here's what I've been building this week.</p>
</td></tr>

<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#22c55e;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">&#x1F525; New This Week</p></td></tr>

<tr><td style="padding:0 20px 10px"><div style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#22c55e">Pre &amp; Post Site Surveys</p>
<p style="${t}"><strong style="${b}">Walk a job site</strong> &mdash; talk or write per-room what accessories are needed</p>
<p style="${t}"><strong style="${b}">One-click send to Quote Hub</strong> &mdash; survey feeds straight into your quotes</p>
<p style="${t}"><strong style="${b}">Send to client for digital signatures</strong> &mdash; scope agreed before you start</p>
<p style="margin:0;font-size:13px;color:#22c55e;font-style:italic;font-weight:600">Prevents scope creep and captures assumptions for quotes.</p>
</div></td></tr>

<tr><td style="padding:0 20px 10px"><div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#3b82f6">Photo Documentation Upgrade</p>
<p style="${t}">All survey photos now feed directly into <strong style="${b}">Photo Documentation</strong></p>
<p style="${t}"><strong style="${b}">Post-job walkdown survey</strong> with before/after photos</p>
<p style="${t}"><strong style="${b}">Client sign-off</strong> then invoice sent &mdash; all in one flow</p>
</div></td></tr>

<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#a855f7;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">&#x1F4DA; Learning &amp; Development</p></td></tr>

<tr><td style="padding:0 20px 10px"><div style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.25);border-radius:14px;padding:14px">
<p style="${t}">&#x2705; More learning content added to the <strong style="${b}">Apprentice Hub</strong></p>
<p style="${t}">&#x2705; Further development / CPD courses in the <strong style="${b}">Study Centre</strong> (work ongoing)</p>
<p style="${t}">&#x2705; All <strong style="${b}">PDF exports improved</strong> across the app</p>
</div></td></tr>

<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#f59e0b;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">&#x1F527; Under the Hood</p></td></tr>

<tr><td style="padding:0 20px 14px"><div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:14px;padding:14px">
<p style="${t}">&#x1F527; <strong style="${b}">Inspection &amp; Testing improvements</strong></p>
<p style="${t}">&#x1F4DD; <strong style="${b}">New learning courses</strong> being written</p>
<p style="${t}">&#x1F4F1; <strong style="${b}">Apple App Store &amp; Google Play</strong> development ongoing</p>
</div></td></tr>

<tr><td style="padding:0 20px 20px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.15),rgba(251,191,36,0.05));border:2px solid rgba(251,191,36,0.4);border-radius:16px;padding:22px 18px;text-align:center">
<p style="margin:0 0 4px;font-size:14px;color:#e2e8f0">Lock in early-adopter pricing before we hit the app stores</p>
<p style="margin:0;font-size:48px;font-weight:800;color:#fbbf24;line-height:1">&pound;${WINBACK_CONFIG.monthlyPrice.toFixed(2)}<span style="font-size:18px;font-weight:600;color:#94a3b8">/mo</span></p>
<p style="margin:6px 0 4px;font-size:14px;color:#94a3b8"><span style="text-decoration:line-through">&pound;${WINBACK_CONFIG.standardMonthlyPrice.toFixed(2)}</span> &middot; <span style="color:#22c55e;font-weight:600">20% off</span> &middot; price locked forever</p>
<p style="margin:0 0 14px;font-size:14px;color:#94a3b8">or &pound;${WINBACK_CONFIG.yearlyPrice.toFixed(2)}/yr (&pound;${(WINBACK_CONFIG.yearlyPrice / 12).toFixed(2)}/mo)</p>
<a href="${WINBACK_CONFIG.monthlyPaymentLink}" style="display:block;padding:16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#0f172a;text-decoration:none;font-size:16px;font-weight:700;border-radius:12px;text-align:center;margin-bottom:10px">Get back in at &pound;${WINBACK_CONFIG.monthlyPrice.toFixed(2)}/mo &rarr;</a>
<a href="${WINBACK_CONFIG.yearlyPaymentLink}" style="display:block;padding:14px;background:rgba(251,191,36,0.15);border:2px solid rgba(251,191,36,0.5);color:#fbbf24;text-decoration:none;font-size:15px;font-weight:600;border-radius:12px;text-align:center">Go yearly: &pound;${WINBACK_CONFIG.yearlyPrice.toFixed(2)}</a>
</div></td></tr>

<tr><td style="padding:0 20px 20px"><div style="background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.2);border-radius:12px;padding:14px;text-align:center">
<p style="margin:0;font-size:14px;color:#e2e8f0;line-height:1.6">Not sure? Reply to this email and I'll give you <strong style="color:#60a5fa">another free week</strong> to try it properly. No strings.</p>
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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header provided');
      throw new Error('No authorization header');
    }

    // Create Supabase client with user's token
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify the caller is an admin
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();
    if (userError) {
      console.error('Auth getUser error:', userError);
      throw new Error(`Unauthorized: ${userError.message}`);
    }
    if (!user) {
      console.error('No user returned from auth');
      throw new Error('Unauthorized: Could not get user');
    }

    console.log(`User ${user.id} attempting winback action`);

    const { data: callerProfile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('admin_role, full_name')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      throw new Error(`Profile error: ${profileError.message}`);
    }

    if (!callerProfile?.admin_role) {
      console.error(`User ${user.id} does not have admin_role. Profile:`, callerProfile);
      throw new Error('Unauthorized: Admin access required');
    }

    const { action, userId, userIds, testEmail, manualEmail, recipientName, email_version } =
      await req.json();

    console.log(
      `Admin ${user.id} (${callerProfile.full_name}) authorized for winback, action: ${action}`
    );

    // Create admin client for operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    let result;

    switch (action) {
      case 'get_eligible': {
        // Query to find eligible users for win-back offer
        // Electricians whose trial expired 48+ hours ago, not subscribed, not free access, not already sent
        console.log('get_eligible: Starting query for eligible users');

        // Direct query approach - get all electricians without winback offer sent
        // Then filter in code to properly exclude subscribed/free access users
        const { data: profiles, error: profilesError } = await supabaseAdmin
          .from('profiles')
          .select('id, full_name, username, created_at, subscribed, free_access_granted')
          .eq('role', 'electrician')
          .is('winback_offer_sent_at', null)
          .order('created_at', { ascending: false });

        if (profilesError) {
          console.error('get_eligible: profiles query error:', profilesError);
          throw profilesError;
        }

        console.log(`get_eligible: Found ${profiles?.length || 0} potential profiles`);

        // Filter to only include users who:
        // 1. Are NOT subscribed (subscribed is null or false)
        // 2. Do NOT have free access (free_access_granted is null or false)
        // 3. Trial ended 24+ hours ago (created_at + 7 days + 24 hours < now)
        const eligibleCutoff = Date.now() - 7 * 24 * 60 * 60 * 1000 - 24 * 60 * 60 * 1000;
        const filteredProfiles =
          profiles?.filter((p: Record<string, unknown>) => {
            // Exclude subscribed users
            if (p.subscribed === true) return false;
            // Exclude users with free access
            if (p.free_access_granted === true) return false;
            // Check trial expiry + 48 hours
            return new Date(p.created_at).getTime() < eligibleCutoff;
          }) || [];

        console.log(
          `get_eligible: ${filteredProfiles.length} after excluding subscribed/free access users`
        );

        console.log(`get_eligible: ${filteredProfiles.length} profiles after trial cutoff filter`);

        // Get emails from auth.users
        const userIdsToFetch = filteredProfiles.map((p: Record<string, unknown>) => p.id);
        if (userIdsToFetch.length === 0) {
          console.log('get_eligible: No eligible users found');
          result = { users: [] };
          break;
        }

        // Fetch auth users in batches to avoid issues
        console.log(`get_eligible: Fetching emails for ${userIdsToFetch.length} users`);
        const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers({
          perPage: 1000,
        });

        if (authError) {
          console.error('get_eligible: auth.admin.listUsers error:', authError);
          throw authError;
        }

        console.log(`get_eligible: Got ${authUsers.users?.length || 0} auth users`);

        const emailMap = new Map<string, string>();
        authUsers.users.forEach((u: Record<string, unknown>) => {
          if (u.email) emailMap.set(u.id, u.email);
        });

        const usersWithEmails =
          filteredProfiles
            .map((p: Record<string, unknown>) => ({
              id: p.id as string,
              full_name: p.full_name,
              username: p.username,
              email: emailMap.get(p.id as string) || null,
              created_at: p.created_at,
              trial_ended_at: new Date(
                new Date(p.created_at as string).getTime() + 7 * 24 * 60 * 60 * 1000
              ).toISOString(),
            }))
            .filter((u: Record<string, unknown>) => u.email) || [];

        console.log(`get_eligible: Returning ${usersWithEmails.length} users with emails`);
        result = { users: usersWithEmails };
        break;
      }

      case 'get_stats': {
        // Get campaign statistics
        console.log('get_stats: Fetching statistics');
        const { data: stats, error: statsError } = await supabaseAdmin
          .from('profiles')
          .select('id, winback_offer_sent_at, subscribed, free_access_granted, created_at')
          .eq('role', 'electrician');

        if (statsError) {
          console.error('get_stats: query error:', statsError);
          throw statsError;
        }

        console.log(`get_stats: Found ${stats?.length || 0} electrician profiles`);

        // Trial = 7 days from signup, so we need created_at + 7 days + 24 hours < now
        const eligibleCutoff = Date.now() - 7 * 24 * 60 * 60 * 1000 - 24 * 60 * 60 * 1000;

        const totalEligible =
          stats?.filter((s: Record<string, unknown>) => {
            // Must NOT be subscribed
            if (s.subscribed === true) return false;
            // Must NOT have free access
            if (s.free_access_granted === true) return false;
            // Must NOT have already been sent the offer
            if (s.winback_offer_sent_at) return false;
            // Trial must have ended 48+ hours ago
            return new Date(s.created_at as string).getTime() < eligibleCutoff;
          }).length || 0;

        const offersSent =
          stats?.filter((s: Record<string, unknown>) => s.winback_offer_sent_at).length || 0;

        // Count conversions (users who have winback_offer_sent_at AND are now subscribed)
        const conversions =
          stats?.filter((s: Record<string, unknown>) => s.winback_offer_sent_at && s.subscribed)
            .length || 0;

        console.log(
          `get_stats: eligible=${totalEligible}, sent=${offersSent}, conversions=${conversions}`
        );

        result = {
          totalEligible,
          offersSent,
          conversions,
          conversionRate: offersSent > 0 ? ((conversions / offersSent) * 100).toFixed(1) : '0',
        };
        break;
      }

      case 'send_single': {
        if (!userId) {
          throw new Error('User ID is required');
        }

        // Get user details
        const { data: profile, error: profileError } = await supabaseAdmin
          .from('profiles')
          .select('id, full_name, username, created_at, winback_offer_sent_at')
          .eq('id', userId)
          .single();

        if (profileError || !profile) {
          throw new Error('User not found');
        }

        if (profile.winback_offer_sent_at) {
          throw new Error('Win-back offer already sent to this user');
        }

        // Get user email
        const { data: authUser, error: authError } =
          await supabaseAdmin.auth.admin.getUserById(userId);
        if (authError || !authUser.user?.email) {
          throw new Error('Could not get user email');
        }

        const userWithEmail: EligibleUser = {
          id: profile.id,
          full_name: profile.full_name,
          username: profile.username,
          email: authUser.user.email,
          created_at: profile.created_at,
          trial_ended_at: new Date(
            new Date(profile.created_at).getTime() + 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
        };

        // Send email — use v3/v2 template if requested
        const isV3 = email_version === 'v3';
        const isV2 = email_version === 'v2';
        let emailHtml, emailSubject;
        if (isV3) {
          emailHtml = generateWinbackEmailV3HTML(userWithEmail);
          emailSubject = 'This week at Elec-Mate ⚡';
        } else if (isV2) {
          emailHtml = generateWinbackEmailV2HTML(userWithEmail);
          emailSubject = 'Your Sunday Round-Up ⚡';
        } else {
          emailHtml = generateWinbackEmailHTML(userWithEmail);
          emailSubject = 'Fancy another look?';
        }
        const versionTag = isV3 ? 'v3' : isV2 ? 'v2' : 'v1';
        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'Elec-Mate <offers@elec-mate.com>',
          to: [userWithEmail.email.trim().toLowerCase()],
          subject: emailSubject,
          html: emailHtml,
          tags: [
            { name: 'campaign', value: 'winback' },
            { name: 'version', value: versionTag },
            { name: 'user_id', value: userId },
          ],
        });

        if (emailError) {
          console.error('Email send error:', emailError);
          throw new Error('Failed to send email');
        }

        // Update profile to mark offer as sent
        const { error: updateError } = await supabaseAdmin
          .from('profiles')
          .update({ winback_offer_sent_at: new Date().toISOString() })
          .eq('id', userId);

        if (updateError) {
          console.error('Failed to update winback_offer_sent_at:', updateError);
        }

        // Log to email_logs table
        const templateName = isV3
          ? 'winback_offer_v3'
          : isV2
            ? 'winback_offer_v2'
            : 'winback_offer';
        await supabaseAdmin.from('email_logs').insert({
          to_email: userWithEmail.email,
          subject: emailSubject,
          template: templateName,
          status: 'sent',
          metadata: {
            user_id: userId,
            email_version: email_version || 'v1',
            resend_id: emailData?.id,
          },
        });

        console.log(`Win-back offer sent to ${userWithEmail.email} by admin ${user.id}`);
        result = { success: true, email: userWithEmail.email };
        break;
      }

      case 'send_bulk': {
        if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
          throw new Error('User IDs array is required');
        }

        let sentCount = 0;
        let skippedCount = 0;
        const errors: string[] = [];

        for (const uid of userIds) {
          try {
            // Get user details
            const { data: profile, error: profileError } = await supabaseAdmin
              .from('profiles')
              .select('id, full_name, username, created_at, winback_offer_sent_at')
              .eq('id', uid)
              .single();

            if (profileError || !profile) {
              errors.push(`${uid}: User not found`);
              continue;
            }

            if (profile.winback_offer_sent_at) {
              skippedCount++;
              continue;
            }

            // Get user email
            const { data: authUser, error: authError } =
              await supabaseAdmin.auth.admin.getUserById(uid);
            if (authError || !authUser.user?.email) {
              errors.push(`${uid}: Could not get email`);
              continue;
            }

            const userWithEmail: EligibleUser = {
              id: profile.id,
              full_name: profile.full_name,
              username: profile.username,
              email: authUser.user.email,
              created_at: profile.created_at,
              trial_ended_at: new Date(
                new Date(profile.created_at).getTime() + 7 * 24 * 60 * 60 * 1000
              ).toISOString(),
            };

            // Send email — use v3/v2 template if requested
            const bulkIsV3 = email_version === 'v3';
            const bulkIsV2 = email_version === 'v2';
            let emailHtml, bulkSubject;
            if (bulkIsV3) {
              emailHtml = generateWinbackEmailV3HTML(userWithEmail);
              bulkSubject = 'This week at Elec-Mate ⚡';
            } else if (bulkIsV2) {
              emailHtml = generateWinbackEmailV2HTML(userWithEmail);
              bulkSubject = 'Your Sunday Round-Up ⚡';
            } else {
              emailHtml = generateWinbackEmailHTML(userWithEmail);
              bulkSubject = 'Fancy another look?';
            }
            const bulkVersionTag = bulkIsV3 ? 'v3' : bulkIsV2 ? 'v2' : 'v1';
            const { data: bulkEmailData, error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <offers@elec-mate.com>',
              to: [userWithEmail.email.trim().toLowerCase()],
              subject: bulkSubject,
              html: emailHtml,
              tags: [
                { name: 'campaign', value: 'winback' },
                { name: 'version', value: bulkVersionTag },
                { name: 'user_id', value: uid },
              ],
            });

            if (emailError) {
              errors.push(`${userWithEmail.email}: ${emailError.message}`);
              continue;
            }

            // Update profile
            await supabaseAdmin
              .from('profiles')
              .update({ winback_offer_sent_at: new Date().toISOString() })
              .eq('id', uid);

            // Log email
            const bulkTemplateName = bulkIsV3
              ? 'winback_offer_v3'
              : bulkIsV2
                ? 'winback_offer_v2'
                : 'winback_offer';
            await supabaseAdmin.from('email_logs').insert({
              to_email: userWithEmail.email,
              subject: bulkSubject,
              template: bulkTemplateName,
              status: 'sent',
              metadata: {
                user_id: uid,
                email_version: email_version || 'v1',
                resend_id: bulkEmailData?.id,
              },
            });

            sentCount++;

            // Rate limit: wait between sends to avoid hitting Resend limits
            if (sentCount < userIds.length) {
              await sleep(SEND_DELAY_MS);
            }
          } catch (err: unknown) {
            errors.push(`${uid}: ${err instanceof Error ? err.message : String(err)}`);
          }
        }

        console.log(
          `Win-back bulk send: ${sentCount} sent, ${skippedCount} skipped by admin ${user.id}`
        );
        result = {
          sent: sentCount,
          skipped: skippedCount,
          failed: errors.length,
          errors: errors.length > 0 ? errors : undefined,
        };
        break;
      }

      case 'get_sent_history': {
        // Get users who have been sent the win-back offer
        const { data: sentUsers, error: sentError } = await supabaseAdmin
          .from('profiles')
          .select('id, full_name, username, created_at, winback_offer_sent_at, subscribed')
          .not('winback_offer_sent_at', 'is', null)
          .order('winback_offer_sent_at', { ascending: false })
          .limit(100);

        if (sentError) throw sentError;

        result = { users: sentUsers || [] };
        break;
      }

      case 'send_test': {
        // Send a test email to a specified address
        if (!testEmail) {
          throw new Error('Test email address is required');
        }

        // Create a mock user for the test email
        const testUser: EligibleUser = {
          id: 'test-user-id',
          full_name: 'Test User',
          username: 'testuser',
          email: testEmail,
          created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          trial_ended_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        };

        // Generate and send the email — use v3/v2 template if requested
        const testIsV3 = email_version === 'v3';
        const testIsV2 = email_version === 'v2';
        let emailHtml, testSubject;
        if (testIsV3) {
          emailHtml = generateWinbackEmailV3HTML(testUser);
          testSubject = '[TEST] This week at Elec-Mate ⚡';
        } else if (testIsV2) {
          emailHtml = generateWinbackEmailV2HTML(testUser);
          testSubject = '[TEST] Your Sunday Round-Up ⚡';
        } else {
          emailHtml = generateWinbackEmailHTML(testUser);
          testSubject = '[TEST] Fancy another look?';
        }
        const testVersionTag = testIsV3 ? 'v3' : testIsV2 ? 'v2' : 'v1';
        const { data: testEmailData, error: emailError } = await resend.emails.send({
          from: 'Elec-Mate <offers@elec-mate.com>',
          to: [testEmail.trim().toLowerCase()],
          subject: testSubject,
          html: emailHtml,
          tags: [
            { name: 'campaign', value: 'winback' },
            { name: 'version', value: testVersionTag },
            { name: 'type', value: 'test' },
          ],
        });

        if (emailError) {
          console.error('Test email send error:', emailError);
          throw new Error(`Failed to send test email: ${emailError.message}`);
        }

        console.log(`Win-back test email sent to ${testEmail} by admin ${user.id}`);
        result = { success: true, email: testEmail };
        break;
      }

      case 'send_manual': {
        // Send a real win-back email to any email address (manual entry)
        if (!manualEmail) {
          throw new Error('Email address is required');
        }

        // Create user object for the email
        const manualUser: EligibleUser = {
          id: 'manual-entry',
          full_name: recipientName || null,
          username: 'user',
          email: manualEmail,
          created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          trial_ended_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        };

        // Generate and send the email — use v3/v2 template if requested
        const manualIsV3 = email_version === 'v3';
        const manualIsV2 = email_version === 'v2';
        let manualEmailHtml, manualSubject;
        if (manualIsV3) {
          manualEmailHtml = generateWinbackEmailV3HTML(manualUser);
          manualSubject = 'This week at Elec-Mate ⚡';
        } else if (manualIsV2) {
          manualEmailHtml = generateWinbackEmailV2HTML(manualUser);
          manualSubject = 'Your Sunday Round-Up ⚡';
        } else {
          manualEmailHtml = generateWinbackEmailHTML(manualUser);
          manualSubject = 'Fancy another look?';
        }
        const manualVersionTag = manualIsV3 ? 'v3' : manualIsV2 ? 'v2' : 'v1';
        const { data: manualEmailData, error: manualEmailError } = await resend.emails.send({
          from: 'Elec-Mate <offers@elec-mate.com>',
          to: [manualEmail.trim().toLowerCase()],
          subject: manualSubject,
          html: manualEmailHtml,
          tags: [
            { name: 'campaign', value: 'winback' },
            { name: 'version', value: manualVersionTag },
            { name: 'type', value: 'manual' },
          ],
        });

        if (manualEmailError) {
          console.error('Manual email send error:', manualEmailError);
          throw new Error(`Failed to send email: ${manualEmailError.message}`);
        }

        // Log to email_logs table
        const manualTemplateName = manualIsV3
          ? 'winback_offer_v3_manual'
          : manualIsV2
            ? 'winback_offer_v2_manual'
            : 'winback_offer_manual';
        await supabaseAdmin.from('email_logs').insert({
          to_email: manualEmail.trim().toLowerCase(),
          subject: manualSubject,
          template: manualTemplateName,
          status: 'sent',
          metadata: {
            sent_by_admin: user.id,
            recipient_name: recipientName,
            email_version: email_version || 'v1',
            resend_id: manualEmailData?.id,
          },
        });

        console.log(`Win-back offer manually sent to ${manualEmail} by admin ${user.id}`);
        result = { success: true, email: manualEmail };
        break;
      }

      case 'reset_sent': {
        // Reset winback_offer_sent_at for users who were sent 24+ hours ago
        // and still haven't subscribed — allows resending the new email
        const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const { data: resetUsers, error: resetErr } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('role', 'electrician')
          .eq('subscribed', false)
          .not('winback_offer_sent_at', 'is', null)
          .lt('winback_offer_sent_at', cutoff);

        if (resetErr) throw resetErr;

        const resetIds = resetUsers?.map((u: Record<string, unknown>) => u.id) || [];

        if (resetIds.length === 0) {
          result = {
            reset: 0,
            message: 'No users eligible for reset (all sent < 24h ago or already subscribed)',
          };
          break;
        }

        const { error: updateErr } = await supabaseAdmin
          .from('profiles')
          .update({ winback_offer_sent_at: null })
          .in('id', resetIds);

        if (updateErr) throw updateErr;

        console.log(`Admin ${user.id} reset winback_offer_sent_at for ${resetIds.length} users`);
        result = {
          reset: resetIds.length,
          message: `${resetIds.length} users reset and eligible for resend`,
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
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const errStack = error instanceof Error ? error.stack : undefined;
    console.error('Error in send-winback-offer:', errMsg, errStack);
    return new Response(
      JSON.stringify({
        error: errMsg,
        stack: errStack?.split('\n').slice(0, 3).join(' | '),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
