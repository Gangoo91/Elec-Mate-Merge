 
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

// Generate win-back v4 email HTML — "You Won't Recognise It" big update showcase
function generateWinbackEmailV4HTML(user: EligibleUser): string {
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
<p style="margin:0 0 14px;font-size:16px;color:#e2e8f0;line-height:1.7">You tried Elec-Mate a while back. I'm not going to lie &mdash; it's <strong style="color:#fbbf24">unrecognisable</strong> now. We've shipped 18 features in the last two weeks alone.</p>
<p style="margin:0;font-size:16px;color:#e2e8f0;line-height:1.7">Here are the three biggest:</p>
</td></tr>

<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#fbbf24;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">&#x2B50; The Big Three</p></td></tr>

<tr><td style="padding:0 20px 10px"><div style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#22c55e">&#x1F4AC; Mate &mdash; Your AI Business Agent on WhatsApp <span style="font-size:10px;background:#22c55e;color:#0f172a;padding:2px 6px;border-radius:6px;margin-left:4px;font-style:normal;letter-spacing:0">BETA</span></p>
<p style="${t}"><strong style="${b}">Text your Mate on WhatsApp</strong> and it manages your business for you</p>
<p style="${t}">&#x2705; Create quotes &amp; invoices from a message</p>
<p style="${t}">&#x2705; Answer any BS 7671 question instantly</p>
<p style="${t}">&#x2705; Manage tasks, track cert expiry, chase payments</p>
<p style="margin:0;font-size:13px;color:#22c55e;font-style:italic;font-weight:600">Like having a PA in your pocket. No app needed &mdash; just WhatsApp.</p>
<p style="margin:6px 0 0;font-size:12px;color:#94a3b8;line-height:1.5">Mate is currently in beta testing and available as an optional add-on &mdash; not included in the base subscription.</p>
</div></td></tr>

<tr><td style="padding:0 20px 10px"><div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#3b82f6">&#x1F4CB; Elec-ID &mdash; Prove You're Legit</p>
<p style="${t}"><strong style="${b}">Public verification page</strong> at elec-mate.com/verify/EM-XXXXXX</p>
<p style="${t}">Share with clients so they can check your credentials before you arrive</p>
<p style="${t}">Track who's viewed your profile &mdash; know when clients are checking you out</p>
<p style="margin:0;font-size:13px;color:#3b82f6;font-style:italic;font-weight:600">Professional credibility, one link.</p>
</div></td></tr>

<tr><td style="padding:0 20px 10px"><div style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#a855f7">&#x1F3D7;&#xFE0F; Projects That Actually Work</p>
<p style="${t}"><strong style="${b}">Photos &amp; drawings</strong> attached directly to projects</p>
<p style="${t}"><strong style="${b}">One-click quote or invoice</strong> from any project page</p>
<p style="${t}">Pre &amp; post site surveys with client sign-off</p>
<p style="margin:0;font-size:13px;color:#a855f7;font-style:italic;font-weight:600">From survey to sign-off to invoice &mdash; all in one place.</p>
</div></td></tr>

<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#f59e0b;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">&#x26A1; Plus 15 More Things We Shipped This Fortnight</p></td></tr>

<tr><td style="padding:0 20px 14px"><div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px">
<p style="${t}">&#x1F4B7; <strong style="${b}">My Rate Card</strong> &mdash; your job/labour price list with quote builder integration</p>
<p style="${t}">&#x1F4D6; <strong style="${b}">My Price Book</strong> &mdash; cost/sell pricing, staleness warnings, bundles, scan import</p>
<p style="${t}">&#x1F50D; <strong style="${b}">Supplier Price Monitor</strong> &mdash; Screwfix, Toolstation, Wickes, B&amp;Q, CEF price tracking</p>
<p style="${t}">&#x1F514; <strong style="${b}">Push Notifications</strong> &mdash; overdue invoices, expiring quotes, cert expiry alerts</p>
<p style="${t}">&#x1F4F8; <strong style="${b}">Pre &amp; Post Site Surveys</strong> &mdash; dictate per-room needs, one-click to quote</p>
<p style="${t}">&#x2705; <strong style="${b}">7 cert types</strong> &mdash; EICR, EIC, Minor Works, Fire Alarm, EV, Emergency Lighting, Solar PV</p>
<p style="${t}">&#x1F916; <strong style="${b}">6 AI Agents</strong> &mdash; Circuit Designer, Cost Engineer, Installation, H&amp;S, Maintenance, Report Writer</p>
<p style="${t}">&#x1F9EE; <strong style="${b}">50+ electrical calculators</strong> &middot; 14 business calculators</p>
<p style="${t}">&#x1F4DA; <strong style="${b}">Apprentice Hub</strong> &mdash; 60+ videos, 780 flash cards, AM2/EPA simulators</p>
<p style="${t}">&#x1F4CA; <strong style="${b}">Board Scanner</strong> &mdash; photograph a DB, get auto circuit mapping</p>
<p style="${t}">&#x1F6E1;&#xFE0F; <strong style="${b}">RAMS &amp; Site Safety</strong> &mdash; from a job description in 2 mins</p>
<p style="margin:0;color:#e2e8f0;font-size:14px;line-height:1.6">&#x1F4DD; <strong style="${b}">Quote &amp; Invoice Builder</strong> with optional address, revert, improved client management</p>
</div></td></tr>

<tr><td style="padding:0 20px 10px"><div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:14px;padding:14px;text-align:center">
<p style="margin:0 0 6px;font-size:13px;color:#60a5fa;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">&#x1F4F1; App Store Launch Coming Soon</p>
<p style="margin:0;font-size:14px;color:#e2e8f0;line-height:1.6">We're launching on the <strong style="color:#fff">Apple App Store</strong> and <strong style="color:#fff">Google Play</strong>. When we do, the price goes to <strong style="color:#ef4444">&pound;12.99/mo</strong>. Lock in at &pound;7.99 now and <strong style="color:#22c55e">keep that price forever</strong>.</p>
</div></td></tr>

<tr><td style="padding:0 20px 20px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.15),rgba(251,191,36,0.05));border:2px solid rgba(251,191,36,0.4);border-radius:16px;padding:22px 18px;text-align:center">
<p style="margin:0 0 4px;font-size:14px;color:#e2e8f0">All of this. Less than a bag of Screwfix screws.</p>
<p style="margin:0;font-size:48px;font-weight:800;color:#fbbf24;line-height:1">&pound;${WINBACK_CONFIG.monthlyPrice.toFixed(2)}<span style="font-size:18px;font-weight:600;color:#94a3b8">/mo</span></p>
<p style="margin:6px 0 4px;font-size:14px;color:#94a3b8"><span style="text-decoration:line-through">&pound;12.99</span> app store price &middot; <span style="color:#22c55e;font-weight:600">you pay &pound;7.99</span> &middot; locked forever</p>
<p style="margin:0 0 16px;font-size:15px;color:#e2e8f0;line-height:1.5">Replace your cert software, RAMS tool, quoting app, invoicing app and that notes app. One sub instead of five.</p>
<a href="${WINBACK_CONFIG.monthlyPaymentLink}" style="display:block;padding:16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#0f172a;text-decoration:none;font-size:16px;font-weight:700;border-radius:12px;text-align:center;margin-bottom:10px">Lock in &pound;${WINBACK_CONFIG.monthlyPrice.toFixed(2)}/mo before app store launch &rarr;</a>
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

// Generate v4b "Fortnight Report" product update email — feature-led, not offer-led
function generateFortnightReportHTML(user: EligibleUser): string {
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
<p style="margin:0 0 14px;font-size:16px;color:#e2e8f0;line-height:1.7">Quick product update from me. The last two weeks have been our biggest shipping sprint yet &mdash; <strong style="color:#fbbf24">68 issues closed, 88 commits</strong>. Here's what you're missing.</p>
</td></tr>

<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#22c55e;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">&#x1F4AC; 1. Your AI Business Partner</p></td></tr>
<tr><td style="padding:0 20px 10px"><div style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);border-radius:14px;padding:14px">
<p style="${t}"><strong style="${b}">Mate by Elec-Mate</strong> is now live on WhatsApp</p>
<p style="${t}">&#x2705; Create quotes &amp; invoices from a text message</p>
<p style="${t}">&#x2705; Ask any BS 7671 question &mdash; instant, accurate answers</p>
<p style="${t}">&#x2705; Task management, cert expiry tracking, payment chasing</p>
<p style="margin:0;font-size:13px;color:#22c55e;font-style:italic;font-weight:600">Your business, managed from WhatsApp. No app needed.</p>
</div></td></tr>

<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#3b82f6;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">&#x1F4CB; 2. Prove You're Legit</p></td></tr>
<tr><td style="padding:0 20px 10px"><div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:14px;padding:14px">
<p style="${t}"><strong style="${b}">Elec-ID</strong> &mdash; public verification pages</p>
<p style="${t}">Share elec-mate.com/verify/EM-XXXXXX with clients</p>
<p style="${t}">Profile view tracking &mdash; know who's checking your credentials</p>
</div></td></tr>

<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#f59e0b;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">&#x1F4B7; 3. Price Like a Pro</p></td></tr>
<tr><td style="padding:0 20px 10px"><div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:14px;padding:14px">
<p style="${t}"><strong style="${b}">My Rate Card</strong> &mdash; job/labour price list with quote builder integration</p>
<p style="${t}"><strong style="${b}">My Price Book</strong> &mdash; cost/sell pricing, staleness warnings, bundles</p>
<p style="${t}"><strong style="${b}">Supplier Price Monitor</strong> &mdash; Screwfix, Toolstation, Wickes, B&amp;Q, CEF tracking</p>
</div></td></tr>

<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#a855f7;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">&#x1F3D7;&#xFE0F; 4. Projects That Work</p></td></tr>
<tr><td style="padding:0 20px 10px"><div style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.25);border-radius:14px;padding:14px">
<p style="${t}">Photos &amp; drawings attached to projects</p>
<p style="${t}">Create quote or invoice directly from any project page</p>
<p style="${t}">Pre &amp; post site surveys with client digital sign-off</p>
</div></td></tr>

<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#ef4444;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">&#x1F514; 5. Never Miss a Thing</p></td></tr>
<tr><td style="padding:0 20px 10px"><div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:14px;padding:14px">
<p style="${t}"><strong style="${b}">Push Notifications</strong> now live</p>
<p style="${t}">Overdue invoices &middot; Expiring quotes &middot; Cert expiry &middot; Elec-ID views</p>
</div></td></tr>

<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#06b6d4;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">&#x1F6E1;&#xFE0F; 6. Rock-Solid Compliance</p></td></tr>
<tr><td style="padding:0 20px 10px"><div style="background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.25);border-radius:14px;padding:14px">
<p style="${t}">EICR/EIC/Minor Works improvements &middot; Reference method alignment</p>
<p style="${t}">Board Scanner upgrades &middot; Schedule of Tests enhancements</p>
</div></td></tr>

<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">&#x2728; 7. Quality of Life</p></td></tr>
<tr><td style="padding:0 20px 14px"><div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px">
<p style="${t}">Safari compatibility fixes &middot; Optional address in quotes</p>
<p style="${t}">Quote revert &middot; Better saved client management</p>
<p style="margin:0;color:#e2e8f0;font-size:14px;line-height:1.6">Improved PDF exports across the board</p>
</div></td></tr>

<tr><td style="padding:0 20px 20px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.1),rgba(251,191,36,0.03));border:1px solid rgba(251,191,36,0.3);border-radius:16px;padding:18px;text-align:center">
<p style="margin:0 0 8px;font-size:15px;color:#e2e8f0">All of this for <strong style="color:#fbbf24">&pound;${WINBACK_CONFIG.monthlyPrice.toFixed(2)}/mo</strong></p>
<p style="margin:0 0 4px;font-size:13px;color:#94a3b8"><span style="text-decoration:line-through">&pound;${WINBACK_CONFIG.standardMonthlyPrice.toFixed(2)}</span> &middot; 20% early-adopter discount &middot; locked forever</p>
<p style="margin:0 0 14px;font-size:13px;color:#94a3b8">or &pound;${WINBACK_CONFIG.yearlyPrice.toFixed(2)}/yr (&pound;${(WINBACK_CONFIG.yearlyPrice / 12).toFixed(2)}/mo)</p>
<a href="${WINBACK_CONFIG.monthlyPaymentLink}" style="display:block;padding:14px;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#0f172a;text-decoration:none;font-size:15px;font-weight:700;border-radius:12px;text-align:center;margin-bottom:8px">Get back in &rarr;</a>
<a href="${WINBACK_CONFIG.yearlyPaymentLink}" style="display:block;padding:12px;background:rgba(251,191,36,0.12);border:1px solid rgba(251,191,36,0.4);color:#fbbf24;text-decoration:none;font-size:14px;font-weight:600;border-radius:12px;text-align:center">Or go yearly: &pound;${WINBACK_CONFIG.yearlyPrice.toFixed(2)}</a>
</div></td></tr>

<tr><td style="padding:0 20px 20px"><div style="background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.2);border-radius:12px;padding:14px;text-align:center">
<p style="margin:0;font-size:14px;color:#e2e8f0;line-height:1.6">Not sure? Reply to this email and I'll give you <strong style="color:#60a5fa">another free week</strong>. No strings.</p>
</div></td></tr>

<tr><td style="padding:0 24px 28px">
<p style="margin:0 0 4px;font-size:15px;color:#e2e8f0">Cheers,</p>
<p style="margin:0 0 4px;font-size:16px;color:#fff;font-weight:600">Andrew</p>
<p style="margin:0 0 10px;font-size:13px;color:#64748b">Founder, Elec-Mate</p>
<p style="margin:0;font-size:14px;color:#e2e8f0">&#x1F4AC; Drop me a WhatsApp: <a href="https://wa.me/447507241303" style="color:#25D366;font-weight:600;text-decoration:none">+44 7507 241303</a></p>
</td></tr>

<tr><td style="padding:14px 24px;text-align:center;background:rgba(15,23,42,0.6);border-top:1px solid rgba(255,255,255,0.05)">
<p style="margin:0;font-size:12px;color:#475569">&copy; ${new Date().getFullYear()} Elec-Mate &middot; Built for UK Sparks &#x1F1EC;&#x1F1E7;&#x26A1;</p>
</td></tr>

</table></td></tr></table>
</body></html>`;
}

// V5 "Last Chance" winback email — final offer, show the full scale, all white text
function generateV5WinbackHTML(user: EligibleUser): string {
  const firstName = user.full_name?.split(' ')[0] || 'mate';
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
<p style="margin:0 0 16px;font-size:17px;color:#fff;line-height:1.6">Hey ${firstName},</p>
<p style="margin:0 0 14px;font-size:16px;color:#fff;line-height:1.7">I'll keep this short because I know you've seen emails from me before.</p>
<p style="margin:0 0 14px;font-size:16px;color:#fff;line-height:1.7">You tried Elec-Mate a while back. Fair enough if it wasn't ready &mdash; I've shipped <strong style="color:#fbbf24">40 updates this week alone</strong>. It's not the same app.</p>
<p style="margin:0;font-size:16px;color:#fff;line-height:1.7">I'm not going to waffle. Here's everything you get for <strong style="color:#fbbf24">&pound;7.99 a month</strong>:</p>
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
<p style="margin:0;font-size:52px;font-weight:800;color:#fbbf24;line-height:1">&pound;${WINBACK_CONFIG.monthlyPrice.toFixed(2)}<span style="font-size:18px;font-weight:600;color:#fff">/mo</span></p>
<p style="margin:6px 0 4px;font-size:14px;color:#fff"><span style="text-decoration:line-through">&pound;${WINBACK_CONFIG.standardMonthlyPrice.toFixed(2)}</span> &middot; <span style="color:#22c55e;font-weight:600">20% off</span> &middot; locked forever</p>
<p style="margin:0 0 18px;font-size:14px;color:#fff;line-height:1.5">That's less than two coffees. For 122 tools, 8 cert types, 15 AI specialists, and 6 supplier price feeds. In your pocket.</p>
<a href="${WINBACK_CONFIG.monthlyPaymentLink}" style="display:block;padding:16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#0f172a;text-decoration:none;font-size:16px;font-weight:700;border-radius:12px;text-align:center;margin-bottom:10px">Lock in &pound;${WINBACK_CONFIG.monthlyPrice.toFixed(2)}/mo forever &rarr;</a>
<a href="${WINBACK_CONFIG.yearlyPaymentLink}" style="display:block;padding:14px;background:rgba(251,191,36,0.15);border:2px solid rgba(251,191,36,0.5);color:#fbbf24;text-decoration:none;font-size:15px;font-weight:600;border-radius:12px;text-align:center">Or go yearly: &pound;${WINBACK_CONFIG.yearlyPrice.toFixed(2)} (&pound;${(WINBACK_CONFIG.yearlyPrice / 12).toFixed(2)}/mo)</a>
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

<div style="background:rgba(37,211,102,0.08);border-left:3px solid #25D366;border-radius:0 8px 8px 0;padding:10px 12px;margin:8px 0">
<p style="margin:0 0 4px;font-size:13px;color:#fff;line-height:1.5;font-style:italic">"Write me a RAMS for a bathroom refit in a care home"</p>
<p style="margin:0;font-size:12px;color:#25D366;font-weight:600">&rarr; Full RAMS document, BS 7671 compliant, in your inbox in 90 seconds.</p>
</div>

<p style="margin:12px 0 8px;font-size:14px;color:#fff;line-height:1.6"><strong style="color:#fbbf24">122 tools. Works while you're on the tools.</strong> Send Mate a message while you're up a ladder &mdash; it does the work and <strong style="color:#25D366">WhatsApps you back</strong> when it's done. Quote created, invoice raised, RAMS written &mdash; ping, it's in your chat.</p>
<p style="margin:0 0 8px;font-size:14px;color:#fff;line-height:1.6">Everything syncs straight back to your app &mdash; tasks, invoices, calendar, certificates. One system. Beta users are already running their whole admin through it.</p>
<p style="margin:0;font-size:13px;color:#fff;line-height:1.5">Mate is an add-on &mdash; separate to the &pound;7.99 app subscription. If you want in on the beta, reply to this email and I'll get you set up. Spaces are limited while we scale it up.</p>
</div></td></tr>

<!-- Free trial offer (blue) -->
<tr><td style="padding:0 20px 12px"><div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:12px;padding:16px;text-align:center">
<p style="margin:0;font-size:14px;color:#fff;line-height:1.6">Not sure? Reply and I'll give you <strong style="color:#60a5fa">another free week</strong>. No card needed. No strings. Just have a proper look this time.</p>
</div></td></tr>

<!-- Last Chance block -->
<tr><td style="padding:0 20px 16px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.06),rgba(251,191,36,0.02));border:1px solid rgba(251,191,36,0.15);border-radius:14px;padding:18px">
<p style="margin:0 0 8px;font-size:14px;color:#fff;line-height:1.6">This is the last time I'll send this offer. &pound;7.99/mo is the lowest price this app will ever be &mdash; new users are already paying more.</p>
<p style="margin:0;font-size:14px;color:#fff;line-height:1.6">If you've been meaning to come back, now's the time. If not, no worries at all &mdash; I appreciate you giving it a go.</p>
</div></td></tr>

<!-- Sign-off (card style) -->
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

function generateV7StatsHTML(firstName: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="dark"><!--[if mso]><style>body,table,td{font-family:Arial,sans-serif!important}</style><![endif]--></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#0f172a">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#0f172a"><tr><td style="padding:24px 12px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:500px;margin:0 auto;background:linear-gradient(180deg,#1e293b,#0f172a);border-radius:24px;overflow:hidden;border:1px solid rgba(251,191,36,0.2)">

<!-- Opening -->
<tr><td style="padding:32px 24px 20px">
<p style="margin:0 0 16px;font-size:17px;color:#fff;line-height:1.6">Hey ${firstName},</p>
<p style="margin:0 0 14px;font-size:16px;color:#fff;line-height:1.7">When Elec-Mate started, it was just a simple idea:</p>
<p style="margin:0 0 14px;font-size:16px;color:#fbbf24;font-weight:700;line-height:1.7">Give the electrical industry one place to do everything.</p>
<p style="margin:0 0 6px;font-size:15px;color:#fff;line-height:1.8">Certificates. RAMS. Quotes. Invoices. Calculators. Study. AI help. Business tools.</p>
<p style="margin:0 0 6px;font-size:15px;color:#fff;line-height:1.8">No jumping between apps. No paper certificates. No late-night admin.</p>
<p style="margin:0 0 14px;font-size:15px;color:#fff;line-height:1.8">That was the idea.</p>
<p style="margin:0;font-size:16px;color:#fff;font-weight:700;line-height:1.7">Here's the reality &mdash; 7 weeks in, before we've even hit the App Store:</p>
</td></tr>

<!-- Stats Strip Row 1 — 4 gold boxes -->
<tr><td style="padding:0 20px 6px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="25%" style="padding:0 3px 0 0"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:12px;padding:14px 4px;text-align:center">
<p style="margin:0;font-size:20px;font-weight:800;color:#0f172a;line-height:1">&pound;245K</p>
<p style="margin:4px 0 0;font-size:8px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.3px">Quoted</p>
</div></td>
<td width="25%" style="padding:0 2px"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:12px;padding:14px 4px;text-align:center">
<p style="margin:0;font-size:20px;font-weight:800;color:#0f172a;line-height:1">&pound;98K</p>
<p style="margin:4px 0 0;font-size:8px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.3px">Invoiced</p>
</div></td>
<td width="25%" style="padding:0 2px"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:12px;padding:14px 4px;text-align:center">
<p style="margin:0;font-size:20px;font-weight:800;color:#0f172a;line-height:1">2,540</p>
<p style="margin:4px 0 0;font-size:8px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.3px">Customers</p>
</div></td>
<td width="25%" style="padding:0 0 0 3px"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:12px;padding:14px 4px;text-align:center">
<p style="margin:0;font-size:20px;font-weight:800;color:#0f172a;line-height:1">633</p>
<p style="margin:4px 0 0;font-size:8px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.3px">Users</p>
</div></td>
</tr></table>
</td></tr>

<!-- Stats Strip Row 2 — 4 gold boxes -->
<tr><td style="padding:0 20px 16px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="25%" style="padding:0 3px 0 0"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:12px;padding:14px 4px;text-align:center">
<p style="margin:0;font-size:20px;font-weight:800;color:#0f172a;line-height:1">2,185</p>
<p style="margin:4px 0 0;font-size:8px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.3px">Method Stmts</p>
</div></td>
<td width="25%" style="padding:0 2px"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:12px;padding:14px 4px;text-align:center">
<p style="margin:0;font-size:20px;font-weight:800;color:#0f172a;line-height:1">1,264</p>
<p style="margin:4px 0 0;font-size:8px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.3px">RAMS</p>
</div></td>
<td width="25%" style="padding:0 2px"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:12px;padding:14px 4px;text-align:center">
<p style="margin:0;font-size:20px;font-weight:800;color:#0f172a;line-height:1">491</p>
<p style="margin:4px 0 0;font-size:8px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.3px">Circuits</p>
</div></td>
<td width="25%" style="padding:0 0 0 3px"><div style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:12px;padding:14px 4px;text-align:center">
<p style="margin:0;font-size:20px;font-weight:800;color:#0f172a;line-height:1">435</p>
<p style="margin:4px 0 0;font-size:8px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.3px">Certs Signed</p>
</div></td>
</tr></table>
</td></tr>

<!-- And much more (dark card with checkmarks) -->
<tr><td style="padding:0 20px 16px"><div style="background:rgba(30,41,59,0.8);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:20px">
<p style="margin:0 0 14px;font-size:15px;color:#fbbf24;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">And much more</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; <strong style="color:#fff">215</strong> jobs priced by the AI cost engineer</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; <strong style="color:#fff">141</strong> installations generated by the AI agent</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; <strong style="color:#fff">112</strong> EPA readiness checks</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; <strong style="color:#fff">87</strong> training videos watched</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; <strong style="color:#fff">79</strong> active Elec-IDs</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; <strong style="color:#fff">61</strong> mental health check-ins</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; <strong style="color:#fff">53</strong> apprentices on active study streaks</p>
<p style="margin:0;font-size:14px;color:#fff;line-height:1.6">&#x2713; <strong style="color:#fff">43</strong> AM2 simulations completed</p>
</div></td></tr>

<!-- We didn't build a demo (gold accent card) -->
<tr><td style="padding:0 20px 16px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.12),rgba(251,191,36,0.03));border:1px solid rgba(251,191,36,0.3);border-radius:14px;padding:20px">
<p style="margin:0 0 10px;font-size:18px;color:#fbbf24;font-weight:800;line-height:1.5">We didn't build a demo.</p>
<p style="margin:0 0 12px;font-size:16px;color:#fff;font-weight:700;line-height:1.6">We built something people actually use.</p>
<p style="margin:0;font-size:14px;color:#fff;line-height:1.7">If you've been watching from the sidelines &mdash; now's the time to jump in before the price goes up.</p>
</div></td></tr>

<!-- Pricing CTA -->
<tr><td style="padding:0 20px 16px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.15),rgba(251,191,36,0.05));border:2px solid rgba(251,191,36,0.4);border-radius:16px;padding:24px 18px;text-align:center">
<p style="margin:0 0 6px;font-size:13px;color:#fff;font-weight:600;letter-spacing:0.3px;text-transform:uppercase">Early supporter price &mdash; locked in forever</p>
<p style="margin:0;font-size:52px;font-weight:800;color:#fbbf24;line-height:1">&pound;${WINBACK_CONFIG.monthlyPrice.toFixed(2)}<span style="font-size:18px;font-weight:600;color:#fff">/mo</span></p>
<p style="margin:10px 0 4px;font-size:14px;color:#fff;line-height:1.5">App Store price will be <strong style="color:#fff">&pound;14.99/mo</strong>.</p>
<p style="margin:0 0 18px;font-size:14px;color:#fff;line-height:1.5">You're getting &pound;7.99 because you were here early.</p>
<a href="${WINBACK_CONFIG.monthlyPaymentLink}" style="display:block;padding:16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#0f172a;text-decoration:none;font-size:16px;font-weight:700;border-radius:12px;text-align:center;margin-bottom:10px">Lock in &pound;${WINBACK_CONFIG.monthlyPrice.toFixed(2)}/mo forever &#x2192;</a>
<a href="${WINBACK_CONFIG.yearlyPaymentLink}" style="display:block;padding:14px;background:rgba(251,191,36,0.15);border:2px solid rgba(251,191,36,0.5);color:#fbbf24;text-decoration:none;font-size:15px;font-weight:600;border-radius:12px;text-align:center">Or go yearly: &pound;${WINBACK_CONFIG.yearlyPrice.toFixed(2)} (&pound;${(WINBACK_CONFIG.yearlyPrice / 12).toFixed(2)}/mo)</a>
</div></td></tr>

<!-- Not sure? -->
<tr><td style="padding:0 20px 12px"><div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:12px;padding:16px;text-align:center">
<p style="margin:0 0 8px;font-size:14px;color:#fff;line-height:1.6">Not sure? Reply to this email. I'll sort you another free trial &mdash; no card, no strings.</p>
<p style="margin:0;font-size:14px;color:#fff;line-height:1.6"><strong style="color:#60a5fa">founder@elec-mate.com</strong> &mdash; comes straight to me.</p>
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

function generateV6WinbackHTML(user: EligibleUser): string {
  const firstName = user.full_name?.split(' ')[0] || 'mate';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="dark"><!--[if mso]><style>body,table,td{font-family:Arial,sans-serif!important}</style><![endif]--></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#0f172a">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#0f172a"><tr><td style="padding:24px 12px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:500px;margin:0 auto;background:linear-gradient(180deg,#1e293b,#0f172a);border-radius:24px;overflow:hidden;border:1px solid rgba(251,191,36,0.2)">

<!-- Opening -->
<tr><td style="padding:32px 24px 20px">
<p style="margin:0 0 16px;font-size:17px;color:#fff;line-height:1.6">Hey ${firstName},</p>
<p style="margin:0 0 14px;font-size:16px;color:#fff;line-height:1.7">I know. Another email from Elec-Mate. I promise this is the last one.</p>
<p style="margin:0 0 14px;font-size:16px;color:#fff;line-height:1.7">You tried it a while back and it wasn't for you. Fair enough. But here's the thing &mdash; when you used it, we were a baby. We're a toddler now. And we're growing fast.</p>
<p style="margin:0;font-size:16px;color:#fff;line-height:1.7">I've been shipping updates every single day. The app you tried is not the app that exists now. Not even close.</p>
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

<!-- We were a baby. Now we're a toddler. -->
<tr><td style="padding:0 20px 16px"><div style="background:rgba(30,41,59,0.8);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:20px">
<p style="margin:0 0 14px;font-size:15px;color:#fff;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">We were a baby. Now we're a toddler.</p>
<p style="margin:0 0 12px;font-size:14px;color:#fff;line-height:1.7">When you tried Elec-Mate, we were in our first weeks. Things weren't polished. Features were half-built. I get it &mdash; first impressions matter.</p>
<p style="margin:0 0 8px;font-size:14px;color:#fff;line-height:1.7">Since then:</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; <strong style="color:#fff">8 full certificate types</strong> (EIC, EICR, Minor Works, Fire Alarm, Solar PV, EV Charging, Emergency Lighting, PAT)</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; Every cert: fill in on your phone, photo capture, PDF export, email to client. Done before you're back in the van.</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; <strong style="color:#fff">AI tools that actually work</strong> &mdash; circuit design, cost engineering, fault diagnosis, photo analysis, wiring instructions</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; Full business suite &mdash; quotes, invoices, expenses, job management</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; Study centre &mdash; 18th Edition, I&amp;T, EV, solar, fire alarm courses</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; Materials marketplace with live pricing from 6 suppliers</p>
<p style="margin:0 0 5px;font-size:14px;color:#fff;line-height:1.6">&#x2713; Job vacancies board</p>
<p style="margin:0 0 12px;font-size:14px;color:#fff;line-height:1.6">&#x2713; 64+ electrical calculators, 14 business calculators</p>
<p style="margin:0;font-size:14px;color:#fff;line-height:1.7">And in 6 months? This will be the number one electrical app on the market. I'm not saying that to big it up &mdash; it's what I'm building towards, every single day.</p>
</div></td></tr>

<!-- Pricing CTA (gold) -->
<tr><td style="padding:0 20px 16px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.15),rgba(251,191,36,0.05));border:2px solid rgba(251,191,36,0.4);border-radius:16px;padding:24px 18px;text-align:center">
<p style="margin:0 0 6px;font-size:15px;color:#fff;font-weight:700;letter-spacing:0.3px;text-transform:uppercase">&pound;7.99/mo &mdash; locked in forever.</p>
<p style="margin:0;font-size:52px;font-weight:800;color:#fbbf24;line-height:1">&pound;${WINBACK_CONFIG.monthlyPrice.toFixed(2)}<span style="font-size:18px;font-weight:600;color:#fff">/mo</span></p>
<p style="margin:8px 0 4px;font-size:14px;color:#fff;line-height:1.5">The App Store price will be <strong style="color:#fff">&pound;14.99/mo</strong> when we launch there.</p>
<p style="margin:0 0 4px;font-size:14px;color:#fff;line-height:1.5">The standard web price is going to &pound;9.99/mo.</p>
<p style="margin:0 0 18px;font-size:14px;color:#fff;line-height:1.5">You're getting &pound;7.99 because you tried us early, and this is my way of saying thank you.</p>
<p style="margin:0 0 18px;font-size:15px;color:#fff;font-weight:600;line-height:1.5">That's less than a pint. For everything above. Honestly &mdash; it'd be daft not to.</p>
<a href="${WINBACK_CONFIG.monthlyPaymentLink}" style="display:block;padding:16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#0f172a;text-decoration:none;font-size:16px;font-weight:700;border-radius:12px;text-align:center;margin-bottom:10px">Lock in &pound;${WINBACK_CONFIG.monthlyPrice.toFixed(2)}/mo forever &#x2192;</a>
<a href="${WINBACK_CONFIG.yearlyPaymentLink}" style="display:block;padding:14px;background:rgba(251,191,36,0.15);border:2px solid rgba(251,191,36,0.5);color:#fbbf24;text-decoration:none;font-size:15px;font-weight:600;border-radius:12px;text-align:center">Or go yearly: &pound;${WINBACK_CONFIG.yearlyPrice.toFixed(2)} (&pound;${(WINBACK_CONFIG.yearlyPrice / 12).toFixed(2)}/mo)</a>
</div></td></tr>

<!-- Not sure yet? (blue) -->
<tr><td style="padding:0 20px 12px"><div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:12px;padding:16px;text-align:center">
<p style="margin:0 0 8px;font-size:14px;color:#fff;line-height:1.6">If you want another look before you commit, just reply to this email. I'll sort you another free trial &mdash; no card, no strings. Have a proper go this time.</p>
<p style="margin:0;font-size:14px;color:#fff;line-height:1.6"><strong style="color:#60a5fa">founder@elec-mate.com</strong> &mdash; comes straight to me.</p>
</div></td></tr>

<!-- Sign-off (card style) -->
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

        console.log(`get_eligible: Fetching emails for ${userIdsToFetch.length} users`);
        const { data: authUsers, error: authError } =
          await supabaseAdmin.rpc('get_auth_user_emails');

        if (authError) {
          console.error('get_eligible: get_auth_user_emails RPC error:', authError);
          throw authError;
        }

        const authUsersList = authUsers || [];
        console.log(`get_eligible: Got ${authUsersList.length} auth users`);

        const emailMap = new Map<string, string>();
        authUsersList.forEach((u: Record<string, unknown>) => {
          if (u.email) emailMap.set(u.id as string, u.email as string);
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
        const { data: authUser, error: authError } = await supabaseAdmin.rpc(
          'get_auth_user_email_by_id',
          { user_id: userId }
        );
        if (authError || !authUser?.email) {
          throw new Error('Could not get user email');
        }

        const userWithEmail: EligibleUser = {
          id: profile.id,
          full_name: profile.full_name,
          username: profile.username,
          email: authUser.email,
          created_at: profile.created_at,
          trial_ended_at: new Date(
            new Date(profile.created_at).getTime() + 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
        };

        // Send email — select template by version
        let emailHtml, emailSubject;
        if (email_version === 'v7') {
          const fn = userWithEmail.full_name?.split(' ')[0] || 'mate';
          emailHtml = generateV7StatsHTML(fn);
          emailSubject = '7 weeks. No App Store. Just electricians getting shit done.';
        } else if (email_version === 'v6') {
          emailHtml = generateV6WinbackHTML(userWithEmail);
          emailSubject = "I know you've seen emails from me. This is the last one.";
        } else if (email_version === 'v5') {
          emailHtml = generateV5WinbackHTML(userWithEmail);
          emailSubject = 'How much are you paying for other apps?';
        } else if (email_version === 'v4b') {
          emailHtml = generateFortnightReportHTML(userWithEmail);
          emailSubject = '18 features shipped in 2 weeks ⚡';
        } else if (email_version === 'v4') {
          emailHtml = generateWinbackEmailV4HTML(userWithEmail);
          emailSubject = "You won't recognise this app ⚡";
        } else if (email_version === 'v3') {
          emailHtml = generateWinbackEmailV3HTML(userWithEmail);
          emailSubject = 'This week at Elec-Mate ⚡';
        } else if (email_version === 'v2') {
          emailHtml = generateWinbackEmailV2HTML(userWithEmail);
          emailSubject = 'Your Sunday Round-Up ⚡';
        } else {
          emailHtml = generateWinbackEmailHTML(userWithEmail);
          emailSubject = 'Fancy another look?';
        }
        const versionTag = email_version || 'v1';
        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'Elec-Mate <offers@elec-mate.com>',
          replyTo: 'founder@elec-mate.com',
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
        const templateName = `winback_offer_${email_version || 'v1'}`;
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

      case 'reset_sent': {
        // Reset winback_offer_sent_at so users can be re-sent
        // If userIds provided, reset specific users; otherwise reset ALL sent users
        if (userIds && Array.isArray(userIds) && userIds.length > 0) {
          const { error: resetError } = await supabaseAdmin
            .from('profiles')
            .update({ winback_offer_sent_at: null })
            .in('id', userIds);
          if (resetError) throw resetError;
          console.log(`Reset ${userIds.length} specific users by admin ${user.id}`);
          result = { success: true, reset: userIds.length, resetCount: userIds.length };
        } else {
          // Reset ALL users who have been sent
          const { data: sentProfiles, error: countError } = await supabaseAdmin
            .from('profiles')
            .select('id')
            .not('winback_offer_sent_at', 'is', null);
          if (countError) throw countError;
          const resetCount = sentProfiles?.length || 0;

          const { error: resetError } = await supabaseAdmin
            .from('profiles')
            .update({ winback_offer_sent_at: null })
            .not('winback_offer_sent_at', 'is', null);
          if (resetError) throw resetError;

          console.log(`Reset ALL ${resetCount} sent users by admin ${user.id}`);
          result = { success: true, reset: resetCount, resetCount };
        }
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
              .select(
                'id, full_name, username, created_at, winback_offer_sent_at, subscribed, free_access_granted'
              )
              .eq('id', uid)
              .single();

            if (profileError || !profile) {
              errors.push(`${uid}: User not found`);
              continue;
            }

            // Skip if already subscribed or has free access
            if (profile.subscribed === true || profile.free_access_granted === true) {
              skippedCount++;
              continue;
            }

            if (profile.winback_offer_sent_at) {
              skippedCount++;
              continue;
            }

            // Get user email
            const { data: authUser, error: authError } = await supabaseAdmin.rpc(
              'get_auth_user_email_by_id',
              { user_id: uid }
            );
            if (authError || !authUser?.email) {
              errors.push(`${uid}: Could not get email`);
              continue;
            }

            const userWithEmail: EligibleUser = {
              id: profile.id,
              full_name: profile.full_name,
              username: profile.username,
              email: authUser.email,
              created_at: profile.created_at,
              trial_ended_at: new Date(
                new Date(profile.created_at).getTime() + 7 * 24 * 60 * 60 * 1000
              ).toISOString(),
            };

            // Send email — select template by version
            let emailHtml, bulkSubject;
            if (email_version === 'v7') {
              const fn = userWithEmail.full_name?.split(' ')[0] || 'mate';
              emailHtml = generateV7StatsHTML(fn);
              bulkSubject = '7 weeks. No App Store. Just electricians getting shit done.';
            } else if (email_version === 'v6') {
              emailHtml = generateV6WinbackHTML(userWithEmail);
              bulkSubject = "I know you've seen emails from me. This is the last one.";
            } else if (email_version === 'v5') {
              emailHtml = generateV5WinbackHTML(userWithEmail);
              bulkSubject = 'How much are you paying for other apps?';
            } else if (email_version === 'v4b') {
              emailHtml = generateFortnightReportHTML(userWithEmail);
              bulkSubject = '18 features shipped in 2 weeks ⚡';
            } else if (email_version === 'v4') {
              emailHtml = generateWinbackEmailV4HTML(userWithEmail);
              bulkSubject = "You won't recognise this app ⚡";
            } else if (email_version === 'v3') {
              emailHtml = generateWinbackEmailV3HTML(userWithEmail);
              bulkSubject = 'This week at Elec-Mate ⚡';
            } else if (email_version === 'v2') {
              emailHtml = generateWinbackEmailV2HTML(userWithEmail);
              bulkSubject = 'Your Sunday Round-Up ⚡';
            } else {
              emailHtml = generateWinbackEmailHTML(userWithEmail);
              bulkSubject = 'Fancy another look?';
            }
            const bulkVersionTag = email_version || 'v1';
            const { data: bulkEmailData, error: emailError } = await resend.emails.send({
              from: 'Elec-Mate <offers@elec-mate.com>',
              replyTo: 'founder@elec-mate.com',
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
            const bulkTemplateName = `winback_offer_${email_version || 'v1'}`;
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
          .limit(500);

        if (sentError) throw sentError;

        // Get emails from auth.users
        const { data: sentAuthUsers, error: sentAuthError } =
          await supabaseAdmin.rpc('get_auth_user_emails');
        if (sentAuthError) {
          console.error('get_sent_history: get_auth_user_emails RPC error:', sentAuthError);
        }
        const sentEmailMap = new Map<string, string>();
        (sentAuthUsers || []).forEach((u: Record<string, unknown>) => {
          if (u.email) sentEmailMap.set(u.id as string, u.email as string);
        });

        // Get email version from email_logs (most recent per to_email)
        const sentEmails = (sentUsers || [])
          .map((u: Record<string, unknown>) => sentEmailMap.get(u.id as string))
          .filter(Boolean) as string[];

        const emailVersionMap = new Map<string, string>();
        if (sentEmails.length > 0) {
          const { data: logs, error: logsError } = await supabaseAdmin
            .from('email_logs')
            .select('to_email, template, metadata')
            .in('to_email', sentEmails)
            .like('template', 'winback%')
            .order('created_at', { ascending: false });

          if (!logsError && logs) {
            // Take the most recent log per email
            logs.forEach((log: Record<string, unknown>) => {
              const email = (log.to_email as string).toLowerCase();
              if (!emailVersionMap.has(email)) {
                // Extract version from metadata or template name
                const meta = log.metadata as Record<string, unknown> | null;
                const version = (meta?.email_version as string) || 'v1';
                emailVersionMap.set(email, version);
              }
            });
          }
        }

        // Merge email + version into each user
        const usersWithDetails = (sentUsers || []).map((u: Record<string, unknown>) => {
          const email = sentEmailMap.get(u.id as string) || null;
          const emailVersion = email ? emailVersionMap.get(email.toLowerCase()) || 'v1' : 'v1';
          return { ...u, email, email_version: emailVersion };
        });

        result = { users: usersWithDetails };
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

        // Generate and send the email — select template by version
        let emailHtml, testSubject;
        if (email_version === 'v7') {
          emailHtml = generateV7StatsHTML('Test');
          testSubject = '[TEST] 7 weeks. No App Store. Just electricians getting shit done.';
        } else if (email_version === 'v6') {
          emailHtml = generateV6WinbackHTML(testUser);
          testSubject = "[TEST] I know you've seen emails from me. This is the last one.";
        } else if (email_version === 'v5') {
          emailHtml = generateV5WinbackHTML(testUser);
          testSubject = '[TEST] How much are you paying for other apps?';
        } else if (email_version === 'v4b') {
          emailHtml = generateFortnightReportHTML(testUser);
          testSubject = '[TEST] 18 features shipped in 2 weeks ⚡';
        } else if (email_version === 'v4') {
          emailHtml = generateWinbackEmailV4HTML(testUser);
          testSubject = "[TEST] You won't recognise this app ⚡";
        } else if (email_version === 'v3') {
          emailHtml = generateWinbackEmailV3HTML(testUser);
          testSubject = '[TEST] This week at Elec-Mate ⚡';
        } else if (email_version === 'v2') {
          emailHtml = generateWinbackEmailV2HTML(testUser);
          testSubject = '[TEST] Your Sunday Round-Up ⚡';
        } else {
          emailHtml = generateWinbackEmailHTML(testUser);
          testSubject = '[TEST] Fancy another look?';
        }
        const testVersionTag =
          email_version === 'v6'
            ? 'v6'
            : email_version === 'v5'
              ? 'v5'
              : email_version === 'v4b'
                ? 'v4b'
                : email_version === 'v4'
                  ? 'v4'
                  : email_version === 'v3'
                    ? 'v3'
                    : email_version === 'v2'
                      ? 'v2'
                      : 'v1';
        const { data: testEmailData, error: emailError } = await resend.emails.send({
          from: 'Elec-Mate <offers@elec-mate.com>',
          replyTo: 'founder@elec-mate.com',
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

        // Generate and send the email — select template by version
        let manualEmailHtml, manualSubject;
        if (email_version === 'v7') {
          manualEmailHtml = generateV7StatsHTML(manualUser.full_name?.split(' ')[0] || 'mate');
          manualSubject = '7 weeks. No App Store. Just electricians getting shit done.';
        } else if (email_version === 'v6') {
          manualEmailHtml = generateV6WinbackHTML(manualUser);
          manualSubject = "I know you've seen emails from me. This is the last one.";
        } else if (email_version === 'v5') {
          manualEmailHtml = generateV5WinbackHTML(manualUser);
          manualSubject = 'How much are you paying for other apps?';
        } else if (email_version === 'v4b') {
          manualEmailHtml = generateFortnightReportHTML(manualUser);
          manualSubject = '18 features shipped in 2 weeks ⚡';
        } else if (email_version === 'v4') {
          manualEmailHtml = generateWinbackEmailV4HTML(manualUser);
          manualSubject = "You won't recognise this app ⚡";
        } else if (email_version === 'v3') {
          manualEmailHtml = generateWinbackEmailV3HTML(manualUser);
          manualSubject = 'This week at Elec-Mate ⚡';
        } else if (email_version === 'v2') {
          manualEmailHtml = generateWinbackEmailV2HTML(manualUser);
          manualSubject = 'Your Sunday Round-Up ⚡';
        } else {
          manualEmailHtml = generateWinbackEmailHTML(manualUser);
          manualSubject = 'Fancy another look?';
        }
        const manualVersionTag = email_version || 'v1';
        const { data: manualEmailData, error: manualEmailError } = await resend.emails.send({
          from: 'Elec-Mate <offers@elec-mate.com>',
          replyTo: 'founder@elec-mate.com',
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
        const manualTemplateName =
          email_version === 'v6'
            ? 'winback_offer_v6_manual'
            : email_version === 'v5'
              ? 'winback_offer_v5_manual'
              : email_version === 'v4b'
                ? 'winback_fortnight_report_manual'
                : email_version === 'v4'
                  ? 'winback_offer_v4_manual'
                  : email_version === 'v3'
                    ? 'winback_offer_v3_manual'
                    : email_version === 'v2'
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

      case 'get_audience_breakdown': {
        // Full audience breakdown across all roles
        console.log('get_audience_breakdown: Fetching all profiles');

        const { data: allProfiles, error: abError } = await supabaseAdmin
          .from('profiles')
          .select('id, role, subscribed, free_access_granted, winback_offer_sent_at, created_at');

        if (abError) {
          console.error('get_audience_breakdown: query error:', abError);
          throw abError;
        }

        const profiles = allProfiles || [];
        const eligibleCutoff = Date.now() - 7 * 24 * 60 * 60 * 1000 - 24 * 60 * 60 * 1000;
        const sentCutoff24h = Date.now() - 24 * 60 * 60 * 1000;

        // Electricians
        const elecs = profiles.filter((p: Record<string, unknown>) => p.role === 'electrician');
        const elecSubscribed = elecs.filter(
          (p: Record<string, unknown>) => p.subscribed === true
        ).length;
        const elecFreeAccess = elecs.filter(
          (p: Record<string, unknown>) => p.free_access_granted === true && p.subscribed !== true
        ).length;
        const elecLapsed = elecs.filter((p: Record<string, unknown>) => {
          if (p.subscribed === true) return false;
          if (p.free_access_granted === true) return false;
          return new Date(p.created_at as string).getTime() < eligibleCutoff;
        }).length;
        const elecSentNotConverted = elecs.filter((p: Record<string, unknown>) => {
          if (p.subscribed === true) return false;
          if (!p.winback_offer_sent_at) return false;
          return new Date(p.winback_offer_sent_at as string).getTime() < sentCutoff24h;
        }).length;
        const elecNeverSent = elecs.filter((p: Record<string, unknown>) => {
          if (p.subscribed === true) return false;
          if (p.free_access_granted === true) return false;
          if (p.winback_offer_sent_at) return false;
          return new Date(p.created_at as string).getTime() < eligibleCutoff;
        }).length;

        // Apprentices
        const apprentices = profiles.filter(
          (p: Record<string, unknown>) => p.role === 'apprentice'
        );
        const appSubscribed = apprentices.filter(
          (p: Record<string, unknown>) => p.subscribed === true
        ).length;
        const appFreeAccess = apprentices.filter(
          (p: Record<string, unknown>) => p.free_access_granted === true && p.subscribed !== true
        ).length;
        const appLapsed = apprentices.filter((p: Record<string, unknown>) => {
          if (p.subscribed === true) return false;
          if (p.free_access_granted === true) return false;
          return new Date(p.created_at as string).getTime() < eligibleCutoff;
        }).length;

        // Employers
        const employers = profiles.filter((p: Record<string, unknown>) => p.role === 'employer');
        const empSubscribed = employers.filter(
          (p: Record<string, unknown>) => p.subscribed === true
        ).length;
        const empFreeAccess = employers.filter(
          (p: Record<string, unknown>) => p.free_access_granted === true && p.subscribed !== true
        ).length;
        const empLapsed = employers.filter((p: Record<string, unknown>) => {
          if (p.subscribed === true) return false;
          if (p.free_access_granted === true) return false;
          return new Date(p.created_at as string).getTime() < eligibleCutoff;
        }).length;

        // Total target = elecSentNotConverted (will be reset) + elecNeverSent
        const totalTarget = elecSentNotConverted + elecNeverSent;

        console.log(`get_audience_breakdown: ${profiles.length} total, target=${totalTarget}`);

        result = {
          electricians: {
            total: elecs.length,
            subscribed: elecSubscribed,
            freeAccess: elecFreeAccess,
            lapsed: elecLapsed,
            sentNotConverted: elecSentNotConverted,
            neverSent: elecNeverSent,
          },
          apprentices: {
            total: apprentices.length,
            subscribed: appSubscribed,
            freeAccess: appFreeAccess,
            lapsed: appLapsed,
          },
          employers: {
            total: employers.length,
            subscribed: empSubscribed,
            freeAccess: empFreeAccess,
            lapsed: empLapsed,
          },
          totalUsers: profiles.length,
          totalTarget,
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
