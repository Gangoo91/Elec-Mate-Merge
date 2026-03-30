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

interface EligibleUser {
  id: string;
  full_name: string | null;
  username: string;
  email: string;
  role: string | null;
  created_at: string;
}

// Generate electrician email HTML
function generateElectricianEmailHTML(user: EligibleUser): string {
  const firstName = user.full_name?.split(' ')[0] || 'mate';
  const t = 'color:#e2e8f0;font-size:14px;line-height:1.6;margin:0 0 5px';
  const b = 'color:#fff;font-weight:700';
  const h =
    'font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 8px';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="dark"><!--[if mso]><style>body,table,td{font-family:Arial,sans-serif!important}</style><![endif]--></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#0f172a">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#0f172a"><tr><td style="padding:24px 12px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:500px;margin:0 auto;background:linear-gradient(180deg,#1e293b,#0f172a);border-radius:24px;overflow:hidden;border:1px solid rgba(251,191,36,0.2)">

<!-- Opening -->
<tr><td style="padding:32px 24px 20px">
<p style="margin:0 0 16px;font-size:17px;color:#fff;line-height:1.6">Hey ${firstName},</p>
<p style="margin:0 0 16px;font-size:16px;color:#e2e8f0;line-height:1.7">It's Andrew from Elec-Mate. I noticed you created an account but didn't finish setting up your subscription. Just wanted to clear something up:</p>
</td></tr>

<!-- Reassurance block (green accent) -->
<tr><td style="padding:0 20px 16px">
<div style="background:linear-gradient(135deg,rgba(34,197,94,0.12),rgba(34,197,94,0.03));border:2px solid rgba(34,197,94,0.35);border-radius:14px;padding:18px;text-align:center">
<p style="margin:0 0 8px;font-size:20px">&#x2705;</p>
<p style="margin:0 0 6px;font-size:16px;color:#22c55e;font-weight:700">Your card won't be charged for 7 days</p>
<p style="margin:0;font-size:14px;color:#e2e8f0;line-height:1.6">Cancel anytime with one tap &mdash; no questions asked, no hidden fees. If you cancel during the trial you pay absolutely nothing.</p>
</div>
</td></tr>

<!-- Setup guidance -->
<tr><td style="padding:0 20px 16px">
<div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:14px;padding:18px">
<p style="${h};color:#60a5fa">&#x1F6E0; Getting Started Tip</p>
<p style="${t}"><strong style="${b}">Allow yourself an hour.</strong> Start with <strong style="${b}">Settings &rarr; Business Settings</strong> to personalise your experience.</p>
<p style="${t}">This is where you set up your company details, logo, worker rates, and bank details &mdash; so your invoices and quotes go out looking professional from day one.</p>
</div>
</td></tr>

<!-- Section header -->
<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#fbbf24;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Here's what's waiting for you</p></td></tr>

<!-- CERTS & TESTING (green accent) -->
<tr><td style="padding:0 20px 10px">
<div style="background:linear-gradient(135deg,rgba(34,197,94,0.08),rgba(34,197,94,0.02));border:1px solid rgba(34,197,94,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#22c55e">Certs &amp; Testing</p>
<p style="${t}"><strong style="${b}">7 certificate types:</strong> EICR, EIC, Minor Works, Fire Alarm, EV Charging, Emergency Lighting, Solar PV</p>
<p style="${t}"><strong style="${b}">Board Scanner</strong> &mdash; photograph a DB, get auto circuit mapping</p>
<p style="${t}"><strong style="${b}">Schedule of Tests</strong> with automated compliance checking</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}">Photo gallery, PDF export, defect coding, client sign-off</p>
</div>
</td></tr>

<!-- AI BUILD PARTNERS (yellow accent) -->
<tr><td style="padding:0 20px 10px">
<div style="background:linear-gradient(135deg,rgba(251,191,36,0.08),rgba(251,191,36,0.02));border:1px solid rgba(251,191,36,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#fbbf24">AI Build Partners</p>
<p style="${t}"><strong style="${b}">Circuit Designer</strong> &mdash; BS 7671 compliant designs, cable sizing, CU layouts</p>
<p style="${t}"><strong style="${b}">Cost Engineer</strong> &mdash; quotes with live material pricing and labour data</p>
<p style="${t}"><strong style="${b}">Installation Specialist</strong> &mdash; step-by-step methods and diagrams</p>
<p style="${t}"><strong style="${b}">Health &amp; Safety</strong> &mdash; RAMS generated from a job description in 2 minutes</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}"><strong style="${b}">Maintenance Specialist</strong> &mdash; inspection planning and fault diagnosis</p>
</div>
</td></tr>

<!-- AI VISION TOOLS (blue accent) -->
<tr><td style="padding:0 20px 10px">
<div style="background:linear-gradient(135deg,rgba(59,130,246,0.08),rgba(59,130,246,0.02));border:1px solid rgba(59,130,246,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#3b82f6">AI Vision Tools</p>
<p style="${t}">Photograph a component &rarr; get specs and BS 7671 requirements</p>
<p style="${t}">Photograph wiring &rarr; get step-by-step instructions</p>
<p style="${t}">Photograph a fault &rarr; get EICR codes and fix steps</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}">Installation verification &rarr; BS 7671 compliance check</p>
</div>
</td></tr>

<!-- BUSINESS TOOLS (amber accent) -->
<tr><td style="padding:0 20px 10px">
<div style="background:linear-gradient(135deg,rgba(245,158,11,0.08),rgba(245,158,11,0.02));border:1px solid rgba(245,158,11,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#f59e0b">Business Tools</p>
<p style="${t}"><strong style="${b}">Quote &amp; Invoice Builder</strong> with live material pricing</p>
<p style="${t}"><strong style="${b}">50+ electrical calculators</strong> &mdash; cable sizing, Zs lookup, voltage drop, solar PV, EV charging</p>
<p style="${t}"><strong style="${b}">14 business calculators</strong> &mdash; hourly rate, job profit, tax/NI, cash flow</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}">Customer management &middot; Materials marketplace &middot; Deals of the day</p>
</div>
</td></tr>

<!-- SITE SAFETY (red accent) -->
<tr><td style="padding:0 20px 20px">
<div style="background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));border:1px solid rgba(239,68,68,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#ef4444">Site Safety</p>
<p style="${t}">RAMS from a job description in 2 mins</p>
<p style="${t}">Team briefing templates</p>
<p style="${t}">Near-miss reporting</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}">Equipment tracker</p>
</div>
</td></tr>

<!-- Pricing -->
<tr><td style="padding:0 20px 20px">
<div style="background:linear-gradient(135deg,rgba(251,191,36,0.15),rgba(251,191,36,0.05));border:2px solid rgba(251,191,36,0.4);border-radius:16px;padding:22px 18px;text-align:center">
<p style="margin:0 0 4px;font-size:14px;color:#e2e8f0">All of this from just</p>
<p style="margin:0;font-size:48px;font-weight:800;color:#fbbf24;line-height:1">&pound;9.99<span style="font-size:18px;font-weight:600;color:#94a3b8">/mo</span></p>
<p style="margin:8px 0 16px;font-size:14px;color:#94a3b8">7-day free trial &middot; Cancel anytime &middot; No risk</p>
<a href="https://elec-mate.com" style="display:block;padding:16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#0f172a;text-decoration:none;font-size:16px;font-weight:700;border-radius:12px;text-align:center">Start Your Free Trial &rarr;</a>
</div>
</td></tr>

<!-- Sign off -->
<tr><td style="padding:0 24px 28px">
<p style="margin:0 0 4px;font-size:15px;color:#e2e8f0">Cheers,</p>
<p style="margin:0 0 4px;font-size:16px;color:#fff;font-weight:600">Andrew</p>
<p style="margin:0 0 10px;font-size:13px;color:#64748b">Founder, Elec-Mate</p>
<p style="margin:0;font-size:14px;color:#e2e8f0">&#x1F4AC; Got questions? Drop me a WhatsApp: <a href="https://wa.me/447507241303" style="color:#25D366;font-weight:600;text-decoration:none">+44 7507 241303</a></p>
</td></tr>

<!-- Footer -->
<tr><td style="padding:14px 24px;text-align:center;background:rgba(15,23,42,0.6);border-top:1px solid rgba(255,255,255,0.05)">
<p style="margin:0;font-size:12px;color:#475569">&copy; ${new Date().getFullYear()} Elec-Mate &middot; Built for UK Sparks &#x1F1EC;&#x1F1E7;&#x26A1;</p>
</td></tr>

</table></td></tr></table>
</body></html>`;
}

// Generate apprentice email HTML
function generateApprenticeEmailHTML(user: EligibleUser): string {
  const firstName = user.full_name?.split(' ')[0] || 'mate';
  const t = 'color:#e2e8f0;font-size:14px;line-height:1.6;margin:0 0 5px';
  const b = 'color:#fff;font-weight:700';
  const h =
    'font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 8px';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="dark"><!--[if mso]><style>body,table,td{font-family:Arial,sans-serif!important}</style><![endif]--></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#0f172a">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#0f172a"><tr><td style="padding:24px 12px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:500px;margin:0 auto;background:linear-gradient(180deg,#1e293b,#0f172a);border-radius:24px;overflow:hidden;border:1px solid rgba(168,85,247,0.2)">

<!-- Opening -->
<tr><td style="padding:32px 24px 20px">
<p style="margin:0 0 16px;font-size:17px;color:#fff;line-height:1.6">Hey ${firstName},</p>
<p style="margin:0 0 16px;font-size:16px;color:#e2e8f0;line-height:1.7">It's Andrew from Elec-Mate. I noticed you created an account but didn't finish setting up your subscription. Just wanted to clear something up:</p>
</td></tr>

<!-- Reassurance block (green accent) -->
<tr><td style="padding:0 20px 16px">
<div style="background:linear-gradient(135deg,rgba(34,197,94,0.12),rgba(34,197,94,0.03));border:2px solid rgba(34,197,94,0.35);border-radius:14px;padding:18px;text-align:center">
<p style="margin:0 0 8px;font-size:20px">&#x2705;</p>
<p style="margin:0 0 6px;font-size:16px;color:#22c55e;font-weight:700">Your card won't be charged for 7 days</p>
<p style="margin:0;font-size:14px;color:#e2e8f0;line-height:1.6">Cancel anytime with one tap &mdash; no questions asked, no hidden fees. If you cancel during the trial you pay absolutely nothing.</p>
</div>
</td></tr>

<!-- Setup guidance -->
<tr><td style="padding:0 20px 16px">
<div style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.25);border-radius:14px;padding:18px">
<p style="${h};color:#a855f7">&#x1F393; Getting Started Tip</p>
<p style="${t}"><strong style="${b}">Jump straight into the Study Centre.</strong> Pick your level (2 or 3) and start with the first module &mdash; everything's laid out in order so you can work through it at your own pace.</p>
</div>
</td></tr>

<!-- Section header -->
<tr><td style="padding:0 20px 8px"><p style="margin:0;font-size:15px;color:#a855f7;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Here's what's waiting for you</p></td></tr>

<!-- STUDY CENTRE (purple accent) -->
<tr><td style="padding:0 20px 10px">
<div style="background:linear-gradient(135deg,rgba(168,85,247,0.08),rgba(168,85,247,0.02));border:1px solid rgba(168,85,247,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#a855f7">Study Centre</p>
<p style="${t}"><strong style="${b}">60+ video lessons</strong> across Level 2 &amp; Level 3</p>
<p style="${t}"><strong style="${b}">780 flash cards</strong> &mdash; test yourself on the go</p>
<p style="${t}"><strong style="${b}">36 study courses</strong> covering every topic you need</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}"><strong style="${b}">BS 7671 regulation search</strong> &mdash; look up any reg instantly</p>
</div>
</td></tr>

<!-- AM2 & EPA (green accent) -->
<tr><td style="padding:0 20px 10px">
<div style="background:linear-gradient(135deg,rgba(34,197,94,0.08),rgba(34,197,94,0.02));border:1px solid rgba(34,197,94,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#22c55e">Exam Preparation</p>
<p style="${t}"><strong style="${b}">AM2 Simulator</strong> &mdash; practice the practical assessment before the real thing</p>
<p style="${t}"><strong style="${b}">EPA Simulator</strong> &mdash; end-point assessment practice questions</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}">Timed mock exams with instant marking and explanations</p>
</div>
</td></tr>

<!-- PORTFOLIO HUB (blue accent) -->
<tr><td style="padding:0 20px 10px">
<div style="background:linear-gradient(135deg,rgba(59,130,246,0.08),rgba(59,130,246,0.02));border:1px solid rgba(59,130,246,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#3b82f6">Portfolio Hub</p>
<p style="${t}"><strong style="${b}">Portfolio Builder</strong> with AI that reads your work and auto-assigns assessment criteria</p>
<p style="${t}"><strong style="${b}">Evidence upload</strong> &mdash; photos, write-ups, supervisor sign-off</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}">Track your progress against every unit requirement</p>
</div>
</td></tr>

<!-- LEARNING TOOLS (amber accent) -->
<tr><td style="padding:0 20px 10px">
<div style="background:linear-gradient(135deg,rgba(245,158,11,0.08),rgba(245,158,11,0.02));border:1px solid rgba(245,158,11,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#f59e0b">Learning Tools</p>
<p style="${t}"><strong style="${b}">Elec-AI</strong> &mdash; like ChatGPT but trained for electricians. Ask it anything.</p>
<p style="${t}"><strong style="${b}">AI Vision</strong> &mdash; photograph a component or wiring and get instant identification</p>
<p style="${t}"><strong style="${b}">50+ electrical calculators</strong> &mdash; cable sizing, Zs lookup, voltage drop</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}"><strong style="${b}">Rights &amp; Pay guide</strong> &middot; <strong style="${b}">Mental health support</strong></p>
</div>
</td></tr>

<!-- SITE SAFETY (red accent) -->
<tr><td style="padding:0 20px 20px">
<div style="background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));border:1px solid rgba(239,68,68,0.25);border-radius:14px;padding:14px">
<p style="${h};color:#ef4444">Site Safety</p>
<p style="${t}">Safety briefing templates</p>
<p style="${t}">Near-miss reporting</p>
<p style="margin:0;${t.replace('margin:0 0 5px', 'margin:0')}">Equipment tracker &amp; inspection checklists</p>
</div>
</td></tr>

<!-- Pricing -->
<tr><td style="padding:0 20px 20px">
<div style="background:linear-gradient(135deg,rgba(168,85,247,0.15),rgba(168,85,247,0.05));border:2px solid rgba(168,85,247,0.4);border-radius:16px;padding:22px 18px;text-align:center">
<p style="margin:0 0 4px;font-size:14px;color:#e2e8f0">All of this from just</p>
<p style="margin:0;font-size:48px;font-weight:800;color:#a855f7;line-height:1">&pound;4.99<span style="font-size:18px;font-weight:600;color:#94a3b8">/mo</span></p>
<p style="margin:8px 0 16px;font-size:14px;color:#94a3b8">7-day free trial &middot; Cancel anytime &middot; No risk</p>
<a href="https://elec-mate.com" style="display:block;padding:16px;background:linear-gradient(135deg,#a855f7,#7c3aed);color:#fff;text-decoration:none;font-size:16px;font-weight:700;border-radius:12px;text-align:center">Start Your Free Trial &rarr;</a>
</div>
</td></tr>

<!-- Sign off -->
<tr><td style="padding:0 24px 28px">
<p style="margin:0 0 4px;font-size:15px;color:#e2e8f0">Cheers,</p>
<p style="margin:0 0 4px;font-size:16px;color:#fff;font-weight:600">Andrew</p>
<p style="margin:0 0 10px;font-size:13px;color:#64748b">Founder, Elec-Mate</p>
<p style="margin:0;font-size:14px;color:#e2e8f0">&#x1F4AC; Got questions? Drop me a WhatsApp: <a href="https://wa.me/447507241303" style="color:#25D366;font-weight:600;text-decoration:none">+44 7507 241303</a></p>
</td></tr>

<!-- Footer -->
<tr><td style="padding:14px 24px;text-align:center;background:rgba(15,23,42,0.6);border-top:1px solid rgba(255,255,255,0.05)">
<p style="margin:0;font-size:12px;color:#475569">&copy; ${new Date().getFullYear()} Elec-Mate &middot; Built for UK Sparks &#x1F1EC;&#x1F1E7;&#x26A1;</p>
</td></tr>

</table></td></tr></table>
</body></html>`;
}

// V8 App Store Launch email
function generateV8AppStoreLaunchHTML(firstName: string): string {
  const appStoreUrl = 'https://apps.apple.com/gb/app/elec-mate/id6758948665';
  const appStoreBadge = 'https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/black/en-gb?size=250x83';
  const logoUrl = 'https://elec-mate.com/logo.jpg';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="dark"><!--[if mso]><style>body,table,td{font-family:Arial,sans-serif!important}</style><![endif]--></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#000000">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#000000"><tr><td style="padding:0">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:600px;margin:0 auto;background:#000000">

<tr><td style="height:48px"></td></tr>

<tr><td style="text-align:center;padding:0 32px">
<a href="${appStoreUrl}" style="display:inline-block;text-decoration:none">
<img src="${logoUrl}" alt="Elec-Mate" width="120" height="120" style="display:block;border-radius:26px;margin:0 auto">
</a>
</td></tr>

<tr><td style="height:28px"></td></tr>

<tr><td style="text-align:center;padding:0 32px">
<h1 style="margin:0;font-size:34px;font-weight:700;color:#ffffff;line-height:1.15;letter-spacing:-0.5px">Now on the App Store.</h1>
</td></tr>

<tr><td style="height:16px"></td></tr>

<tr><td style="text-align:center;padding:0 40px">
<p style="margin:0;font-size:17px;color:#ffffff;line-height:1.5;font-weight:400">The all-in-one app for UK electricians. Certificates, quotes, AI tools, and more.</p>
</td></tr>

<tr><td style="height:28px"></td></tr>

<tr><td style="text-align:center;padding:0 32px">
<a href="${appStoreUrl}" style="display:inline-block"><img src="${appStoreBadge}" alt="Download on the App Store" width="180" height="60" style="display:block"></a>
</td></tr>

<tr><td style="height:40px"></td></tr>

<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.08)"></div></td></tr>

<tr><td style="height:40px"></td></tr>

<tr><td style="padding:0 32px">

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:24px">
<tr>
<td width="44" valign="top" style="padding-top:2px"><div style="width:36px;height:36px;background:rgba(251,191,36,0.12);border-radius:10px;text-align:center;line-height:36px;font-size:18px">&#x26A1;</div></td>
<td style="padding-left:14px">
<p style="margin:0;font-size:16px;font-weight:600;color:#ffffff">Certificates</p>
<p style="margin:4px 0 0;font-size:14px;color:#ffffff;line-height:1.4">EICR, EIC, minor works, PAT, fire alarm, solar PV, EV charging. Sign and send from your phone.</p>
</td>
</tr>
</table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:24px">
<tr>
<td width="44" valign="top" style="padding-top:2px"><div style="width:36px;height:36px;background:rgba(59,130,246,0.12);border-radius:10px;text-align:center;line-height:36px;font-size:18px">&#x1F916;</div></td>
<td style="padding-left:14px">
<p style="margin:0;font-size:16px;font-weight:600;color:#ffffff">AI Tools</p>
<p style="margin:4px 0 0;font-size:14px;color:#ffffff;line-height:1.4">Cost engineer, circuit designer, RAMS generator, fault diagnosis, installation guide. 15 specialist agents.</p>
</td>
</tr>
</table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:24px">
<tr>
<td width="44" valign="top" style="padding-top:2px"><div style="width:36px;height:36px;background:rgba(34,197,94,0.12);border-radius:10px;text-align:center;line-height:36px;font-size:18px">&#x1F4B7;</div></td>
<td style="padding-left:14px">
<p style="margin:0;font-size:16px;font-weight:600;color:#ffffff">Quotes &amp; Invoices</p>
<p style="margin:4px 0 0;font-size:14px;color:#ffffff;line-height:1.4">Create, send, and get paid. Track everything in one place. No more spreadsheets.</p>
</td>
</tr>
</table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:24px">
<tr>
<td width="44" valign="top" style="padding-top:2px"><div style="width:36px;height:36px;background:rgba(168,85,247,0.12);border-radius:10px;text-align:center;line-height:36px;font-size:18px">&#x1F4DA;</div></td>
<td style="padding-left:14px">
<p style="margin:0;font-size:16px;font-weight:600;color:#ffffff">Study Centre</p>
<p style="margin:4px 0 0;font-size:14px;color:#ffffff;line-height:1.4">Level 2 &amp; 3 courses, AM2 simulator, flashcards, EPA prep. Over 2,000 practice questions.</p>
</td>
</tr>
</table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
<tr>
<td width="44" valign="top" style="padding-top:2px"><div style="width:36px;height:36px;background:rgba(244,63,94,0.12);border-radius:10px;text-align:center;line-height:36px;font-size:18px">&#x1F6E1;</div></td>
<td style="padding-left:14px">
<p style="margin:0;font-size:16px;font-weight:600;color:#ffffff">Site Safety</p>
<p style="margin:4px 0 0;font-size:14px;color:#ffffff;line-height:1.4">RAMS, method statements, risk assessments, toolbox talks. 64+ electrical calculators built in.</p>
</td>
</tr>
</table>

</td></tr>

<tr><td style="height:40px"></td></tr>

<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.08)"></div></td></tr>

<tr><td style="height:40px"></td></tr>

<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="50%" style="text-align:center;padding:0 4px 0 0">
<div style="background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.2);border-radius:16px;padding:20px 12px">
<p style="margin:0 0 4px;font-size:12px;color:#ffffff;letter-spacing:0.3px;text-transform:uppercase;font-weight:600">Apprentice</p>
<p style="margin:0;font-size:32px;font-weight:700;color:#ffffff;line-height:1;letter-spacing:-0.5px">&pound;6.99<span style="font-size:14px;font-weight:400">/mo</span></p>
</div>
</td>
<td width="50%" style="text-align:center;padding:0 0 0 4px">
<div style="background:rgba(251,191,36,0.15);border:2px solid rgba(251,191,36,0.4);border-radius:16px;padding:20px 12px">
<p style="margin:0 0 4px;font-size:12px;color:#fbbf24;letter-spacing:0.3px;text-transform:uppercase;font-weight:600">Electrician</p>
<p style="margin:0;font-size:32px;font-weight:700;color:#ffffff;line-height:1;letter-spacing:-0.5px">&pound;14.99<span style="font-size:14px;font-weight:400">/mo</span></p>
</div>
</td>
</tr></table>
</td></tr>

<tr><td style="height:24px"></td></tr>

<tr><td style="text-align:center;padding:0 32px">
<a href="${appStoreUrl}" style="display:inline-block"><img src="${appStoreBadge}" alt="Download on the App Store" width="200" style="display:block"></a>
</td></tr>

<tr><td style="height:48px"></td></tr>

<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.08)"></div></td></tr>

<tr><td style="height:32px"></td></tr>

<tr><td style="padding:0 32px">
<p style="margin:0 0 12px;font-size:14px;color:#ffffff;line-height:1.6">Hey ${firstName} &mdash; it's Andrew. We've come a long way since you first signed up. If you've got any questions, just reply to this email. It comes straight to me.</p>
<p style="margin:0;font-size:14px;color:#ffffff;line-height:1.6">Cheers,<br><span style="color:#fbbf24;font-weight:600">Andrew</span> &middot; Founder, Elec-Mate</p>
</td></tr>

<tr><td style="height:40px"></td></tr>

<tr><td style="text-align:center;padding:0 32px 40px">
<p style="margin:0;font-size:12px;color:#ffffff">&copy; ${new Date().getFullYear()} Elec-Mate Ltd &middot; Built in Cumbria for UK electricians</p>
</td></tr>

</table></td></tr></table>
</body></html>`;
}

// V3 "Card Deets" email — direct, empathetic, addresses card fear head-on
function generateV3EmailHTML(user: EligibleUser): string {
  const firstName = user.full_name?.split(' ')[0] || 'mate';

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="dark"><!--[if mso]><style>body,table,td{font-family:Arial,sans-serif!important}</style><![endif]--></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#0f172a">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#0f172a"><tr><td style="padding:24px 12px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:500px;margin:0 auto;background:linear-gradient(180deg,#1e293b,#0f172a);border-radius:24px;overflow:hidden;border:1px solid rgba(251,191,36,0.2)">

<!-- Opening — empathy first -->
<tr><td style="padding:32px 24px 20px">
<p style="margin:0 0 16px;font-size:17px;color:#fff;line-height:1.6">Hey ${firstName},</p>
<p style="margin:0 0 14px;font-size:16px;color:#fff;line-height:1.7">I know &mdash; you've had a few emails from me already. But I checked the numbers this morning and something properly bugged me.</p>
<p style="margin:0 0 14px;font-size:16px;color:#fff;line-height:1.7"><strong style="color:#fbbf24">91 electricians</strong> signed up to Elec-Mate, got to the card details, and walked away.</p>
<p style="margin:0 0 14px;font-size:16px;color:#fff;line-height:1.7">You were one of them. And honestly? I get it.</p>
<p style="margin:0;font-size:16px;color:#fff;line-height:1.7">Nobody wants to hand over card details for something they've never used. It feels like a trap. &ldquo;Free trial&rdquo; that quietly starts billing you on day 8. We've all been stung.</p>
</td></tr>

<!-- Card reassurance — the core message -->
<tr><td style="padding:0 20px 16px">
<div style="background:linear-gradient(135deg,rgba(34,197,94,0.12),rgba(34,197,94,0.03));border:2px solid rgba(34,197,94,0.35);border-radius:14px;padding:20px">
<p style="margin:0 0 12px;font-size:16px;color:#22c55e;font-weight:700;text-align:center">Here's exactly what happens when you enter your card:</p>
<p style="margin:0 0 6px;font-size:14px;color:#fff;line-height:1.7">&#x2713; You get <strong style="color:#fff">7 full days</strong> of the complete app. Every feature. No limits.</p>
<p style="margin:0 0 6px;font-size:14px;color:#fff;line-height:1.7">&#x2713; Your card <strong style="color:#22c55e">will not be charged</strong> during those 7 days. Not a penny.</p>
<p style="margin:0 0 6px;font-size:14px;color:#fff;line-height:1.7">&#x2713; You'll get a reminder <strong style="color:#fff">before</strong> the trial ends.</p>
<p style="margin:0 0 14px;font-size:14px;color:#fff;line-height:1.7">&#x2713; Cancel in <strong style="color:#fff">2 taps</strong> from the app. No phone calls. No &ldquo;retention team.&rdquo; No guilt trip.</p>
<p style="margin:0 0 10px;font-size:15px;color:#fff;font-weight:700">Why do we even ask for a card?</p>
<p style="margin:0;font-size:14px;color:#fff;line-height:1.6">Stops fake signups and bots clogging the system. The card just proves you're a real spark. It doesn't get touched.</p>
</div>
</td></tr>

<!-- Divider -->
<tr><td style="padding:0 40px 16px"><div style="border-top:1px solid rgba(255,255,255,0.1)"></div></td></tr>

<!-- What you're missing — practical, grounded -->
<tr><td style="padding:0 20px 16px">
<div style="background:linear-gradient(135deg,rgba(251,191,36,0.08),rgba(251,191,36,0.02));border:1px solid rgba(251,191,36,0.25);border-radius:14px;padding:20px">
<p style="margin:0 0 14px;font-size:15px;color:#fbbf24;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">What you're actually missing right now</p>
<p style="margin:0 0 10px;font-size:14px;color:#fff;line-height:1.7">While you've been thinking about it, sparks on Elec-Mate are:</p>
<p style="margin:0 0 6px;font-size:14px;color:#fff;line-height:1.6">&#x2022; Filling out <strong style="color:#fff">EICRs, minor works, test sheets &amp; fire alarm certs</strong> &mdash; on their phone, on site, done in minutes</p>
<p style="margin:0 0 6px;font-size:14px;color:#fff;line-height:1.6">&#x2022; Completing <strong style="color:#fff">RAMS</strong> &mdash; risk assessments sorted without the paperwork headache</p>
<p style="margin:0 0 6px;font-size:14px;color:#fff;line-height:1.6">&#x2022; Sending <strong style="color:#fff">professional quotes &amp; invoices</strong> straight to clients &mdash; no laptop needed</p>
<p style="margin:0 0 6px;font-size:14px;color:#fff;line-height:1.6">&#x2022; Managing their <strong style="color:#fff">full job book</strong> &mdash; tasks, scheduling, clients, all in one place</p>
<p style="margin:0 0 6px;font-size:14px;color:#fff;line-height:1.6">&#x2022; Tracking <strong style="color:#fff">costs, profit &amp; analytics</strong> &mdash; actually knowing what they're earning per job</p>
<p style="margin:0 0 14px;font-size:14px;color:#fff;line-height:1.6">&#x2022; <strong style="color:#fff">Brushing up on regs &amp; knowledge</strong> &mdash; BS 7671 reference, guidance notes, all at your fingertips</p>
<p style="margin:0;font-size:15px;color:#fff;font-weight:700;line-height:1.6">All for <strong style="color:#fbbf24">&pound;9.99/month.</strong> That's nothing for what this app replaces &mdash; no more juggling Certsure, spreadsheets, separate invoicing apps, and bits of paper.</p>
</div>
</td></tr>

<!-- One favour + CTA -->
<tr><td style="padding:0 20px 16px">
<div style="background:linear-gradient(135deg,rgba(34,197,94,0.15),rgba(34,197,94,0.05));border:2px solid rgba(34,197,94,0.4);border-radius:16px;padding:24px 18px;text-align:center">
<p style="margin:0 0 10px;font-size:16px;color:#fff;font-weight:700;line-height:1.5">One favour: just try it for one day.</p>
<p style="margin:0 0 18px;font-size:14px;color:#fff;line-height:1.6">Not even the full 7. One real job. If it's not for you, cancel and I'll never email you again.</p>
<a href="https://elec-mate.com" style="display:block;padding:18px;background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;text-decoration:none;font-size:17px;font-weight:700;border-radius:14px;text-align:center;box-shadow:0 8px 24px rgba(34,197,94,0.35)">Start Your Free Trial &mdash; No Charge for 7 Days &rarr;</a>
<p style="margin:10px 0 0;font-size:13px;color:#fff;text-align:center">Your card won't be touched. Cancel any time.</p>
</div>
</td></tr>

<!-- Sign-off -->
<tr><td style="padding:0 20px 16px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.08),rgba(251,191,36,0.02));border:1px solid rgba(251,191,36,0.15);border-radius:14px;padding:18px">
<p style="margin:0 0 12px;font-size:14px;color:#fff;line-height:1.6">Got questions? Reply here or text me on WhatsApp: <strong style="color:#fff">07507 241303</strong>. I'm Andrew, I built this thing, and I'll answer you personally.</p>
<p style="margin:0 0 4px;font-size:15px;color:#fff">Cheers,</p>
<p style="margin:0 0 2px;font-size:17px;color:#fbbf24;font-weight:700">Andrew</p>
<p style="margin:0;font-size:13px;color:#fff">Founder &middot; Elec-Mate</p>
</div></td></tr>

<!-- P.S. — urgency -->
<tr><td style="padding:0 20px 16px">
<p style="margin:0;font-size:13px;color:#fff;line-height:1.6;font-style:italic">P.S. &mdash; This is genuinely the last email you'll get from me about this. After today, you're off the list. No hard feelings either way.</p>
</td></tr>

<!-- Footer -->
<tr><td style="padding:16px 24px;text-align:center;border-top:1px solid rgba(255,255,255,0.08)">
<p style="margin:0;font-size:12px;color:#fff">&copy; ${new Date().getFullYear()} Elec-Mate &middot; Built for UK Sparks &#x1F1EC;&#x1F1E7; &#x26A1;</p>
</td></tr>

</table></td></tr></table>
</body></html>`;
}

// V2 "Come Back" email — V5-style, targets ALL abandoned signups (no 10-day window)
function generateV2EmailHTML(user: EligibleUser): string {
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
<p style="margin:0 0 14px;font-size:16px;color:#fff;line-height:1.7">You came to sign up to Elec-Mate, but were put off by putting your card deets in. Fair enough &mdash; I get it.</p>
<p style="margin:0 0 14px;font-size:16px;color:#fff;line-height:1.7">But here's the thing: <strong style="color:#22c55e">you won't be charged for 7 full days</strong>. You can cancel any time with one tap &mdash; no questions, no hassle, no hidden fees. If it's not for you, you pay nothing.</p>
<p style="margin:0;font-size:16px;color:#fff;line-height:1.7">Since you last looked, we've been shipping features every single day. Here's what's actually in it now:</p>
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
<p style="${t}">&#x2713; EICR, EIC, Minor Works, Fire Alarm, EV Charging, Emergency Lighting, Solar PV, PAT Testing</p>
<p style="margin:10px 0 0;font-size:13px;color:#22c55e;line-height:1.6;font-weight:600">Photo capture, defect coding, PDF export, email to client. Fill it in on site &rarr; client gets it before you're back in the van.</p>
</div></td></tr>

<!-- AI Tools (yellow) -->
<tr><td style="padding:0 20px 12px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.12),rgba(251,191,36,0.03));border:1px solid rgba(251,191,36,0.3);border-radius:14px;padding:18px">
<p style="${h};color:#fbbf24">&#x1F916; AI Tools &mdash; Point Your Camera, Get Answers</p>
<p style="${t}">&#x2713; <strong style="${b}">Circuit Designer</strong> &mdash; BS 7671 compliant designs, cable sizing, CU layouts</p>
<p style="${t}">&#x2713; <strong style="${b}">Cost Engineer</strong> &mdash; quotes with live material pricing + labour rates</p>
<p style="${t}">&#x2713; <strong style="${b}">RAMS Generator</strong> &mdash; risk assessment from a job description in 2 minutes</p>
<p style="${t}">&#x2713; <strong style="${b}">Photo Analysis</strong> &mdash; photograph a component &rarr; get specs + regs</p>
<p style="${t}">&#x2713; <strong style="${b}">Board Scanner</strong> &mdash; photograph a DB, auto circuit mapping</p>
<p style="margin:0;font-size:13px;color:#fbbf24;font-weight:600">+ Fault Diagnosis, Installation Verification, Wiring Instructions, Client Explainer and more</p>
</div></td></tr>

<!-- Business Tools (amber) -->
<tr><td style="padding:0 20px 12px"><div style="background:linear-gradient(135deg,rgba(245,158,11,0.12),rgba(245,158,11,0.03));border:1px solid rgba(245,158,11,0.3);border-radius:14px;padding:18px">
<p style="${h};color:#f59e0b">&#x1F4BC; Business Tools</p>
<p style="${t}">&#x2713; Quote &amp; Invoice Builder with Stripe payments</p>
<p style="${t}">&#x2713; Customer database &middot; Project management &middot; Expense tracking</p>
<p style="${t}">&#x2713; 50+ electrical calculators &middot; 14 business calculators</p>
<p style="margin:0;${t}">&#x2713; Booking Portal &middot; Referral system &middot; Materials marketplace</p>
</div></td></tr>

<!-- Study Centre (cyan) -->
<tr><td style="padding:0 20px 12px"><div style="background:linear-gradient(135deg,rgba(6,182,212,0.12),rgba(6,182,212,0.03));border:1px solid rgba(6,182,212,0.3);border-radius:14px;padding:18px">
<p style="${h};color:#06b6d4">&#x1F393; Study Centre</p>
<p style="${t}">&#x2713; 60+ Video Lessons &middot; 780 Flash Cards &middot; AM2 &amp; EPA Simulators</p>
<p style="margin:0;${t}">&#x2713; Electrical &amp; business upskilling courses &middot; Mental health resources</p>
</div></td></tr>

<!-- Site Safety (red) -->
<tr><td style="padding:0 20px 12px"><div style="background:linear-gradient(135deg,rgba(239,68,68,0.12),rgba(239,68,68,0.03));border:1px solid rgba(239,68,68,0.3);border-radius:14px;padding:18px">
<p style="${h};color:#ef4444">&#x1F6E1;&#xFE0F; Site Safety</p>
<p style="margin:0;${t}">&#x2713; RAMS from a job description &middot; Method statements &middot; Safe isolation &middot; Equipment tracking</p>
</div></td></tr>

<!-- Mate Section (gold/dark gradient) -->
<tr><td style="padding:0 20px 12px"><div style="background:linear-gradient(135deg,rgba(251,191,36,0.12),rgba(15,23,42,0.9));border:2px solid rgba(251,191,36,0.3);border-radius:14px;padding:18px">
<p style="margin:0 0 12px;font-size:15px;font-weight:800;color:#fbbf24;text-transform:uppercase;letter-spacing:1px">&#x1F4AC; And Then There's Mate.</p>
<p style="margin:0 0 12px;font-size:14px;color:#fff;line-height:1.6">Your AI business assistant on WhatsApp. Message it like a colleague &mdash; it creates quotes, raises invoices, answers BS 7671 questions, manages your diary. Works while you're on the tools.</p>
<p style="margin:0;font-size:13px;color:#fff;line-height:1.5">Mate is an optional add-on. Reply to this email if you want in on the beta.</p>
</div></td></tr>

<!-- Free Trial CTA (green highlight) -->
<tr><td style="padding:0 20px 16px"><div style="background:linear-gradient(135deg,rgba(34,197,94,0.15),rgba(34,197,94,0.05));border:2px solid rgba(34,197,94,0.4);border-radius:16px;padding:24px 18px;text-align:center">
<p style="margin:0 0 8px;font-size:20px;color:#22c55e;font-weight:800">7 Days Free. No Charge.</p>
<p style="margin:0 0 6px;font-size:15px;color:#fff;line-height:1.5">Your card won't be touched for a full week. Try everything &mdash; certs, AI tools, calculators, the lot.</p>
<p style="margin:0 0 18px;font-size:15px;color:#fff;line-height:1.5"><strong style="color:#22c55e">Cancel any time</strong> with one tap. No questions asked. No hidden fees. If it's not for you, you pay absolutely nothing.</p>
<p style="margin:0 0 6px;font-size:14px;color:#fff">Then just <strong style="color:#fbbf24">&pound;9.99/mo</strong> &mdash; less than two coffees for 122 tools in your pocket.</p>
<p style="margin:12px 0 0;font-size:14px;color:#fff">Apprentice? It's only <strong style="color:#a855f7">&pound;4.99/mo</strong>.</p>
</div></td></tr>

<!-- CTA Button -->
<tr><td style="padding:0 20px 16px">
<a href="https://elec-mate.com" style="display:block;padding:18px;background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff;text-decoration:none;font-size:17px;font-weight:700;border-radius:14px;text-align:center;box-shadow:0 8px 24px rgba(34,197,94,0.35)">Start Your Free Trial &rarr;</a>
<p style="margin:8px 0 0;font-size:13px;color:#fff;text-align:center">No charge for 7 days &middot; Cancel anytime</p>
</td></tr>

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

    console.log(`User ${user.id} attempting incomplete-signup action`);

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

    const { action, userId, userIds, testEmail, manualEmail, recipientName } = await req.json();

    console.log(
      `Admin ${user.id} (${callerProfile.full_name}) authorized for incomplete-signup, action: ${action}`
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
        // Users signed up 1-10 days ago (card checkout era), not subscribed, not free access, not already sent
        console.log('get_eligible: Starting query for eligible users');

        const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString();

        const { data: profiles, error: profilesError } = await supabaseAdmin
          .from('profiles')
          .select('id, full_name, username, role, created_at, subscribed, free_access_granted')
          .is('incomplete_signup_sent_at', null)
          .gte('created_at', tenDaysAgo)
          .order('created_at', { ascending: false });

        if (profilesError) {
          console.error('get_eligible: profiles query error:', profilesError);
          throw profilesError;
        }

        console.log(`get_eligible: Found ${profiles?.length || 0} potential profiles`);

        // Filter: not subscribed, no free access, signed up 1+ hour ago
        const oneHourAgo = Date.now() - 60 * 60 * 1000;
        const filteredProfiles =
          profiles?.filter((p: Record<string, unknown>) => {
            if (p.subscribed === true) return false;
            if (p.free_access_granted === true) return false;
            return new Date(p.created_at).getTime() < oneHourAgo;
          }) || [];

        console.log(`get_eligible: ${filteredProfiles.length} after filtering`);

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
              role: p.role,
              created_at: p.created_at,
            }))
            .filter((u: Record<string, unknown>) => u.email) || [];

        console.log(`get_eligible: Returning ${usersWithEmails.length} users with emails`);
        result = { users: usersWithEmails };
        break;
      }

      case 'get_stats': {
        console.log('get_stats: Fetching statistics');
        const tenDaysAgoStats = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString();
        const { data: stats, error: statsError } = await supabaseAdmin
          .from('profiles')
          .select('id, incomplete_signup_sent_at, subscribed, free_access_granted, created_at')
          .gte('created_at', tenDaysAgoStats);

        if (statsError) {
          console.error('get_stats: query error:', statsError);
          throw statsError;
        }

        console.log(`get_stats: Found ${stats?.length || 0} profiles (last 10 days)`);

        const oneHourAgo = Date.now() - 60 * 60 * 1000;

        const totalEligible =
          stats?.filter((s: Record<string, unknown>) => {
            if (s.subscribed === true) return false;
            if (s.free_access_granted === true) return false;
            if (s.incomplete_signup_sent_at) return false;
            return new Date(s.created_at as string).getTime() < oneHourAgo;
          }).length || 0;

        const offersSent =
          stats?.filter((s: Record<string, unknown>) => s.incomplete_signup_sent_at).length || 0;

        // Conversions: users who have incomplete_signup_sent_at AND are now subscribed
        const conversions =
          stats?.filter((s: Record<string, unknown>) => s.incomplete_signup_sent_at && s.subscribed)
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

        const { data: profile, error: profileErr } = await supabaseAdmin
          .from('profiles')
          .select('id, full_name, username, role, created_at, incomplete_signup_sent_at')
          .eq('id', userId)
          .single();

        if (profileErr || !profile) {
          throw new Error('User not found');
        }

        if (profile.incomplete_signup_sent_at) {
          throw new Error('Incomplete signup email already sent to this user');
        }

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
          role: profile.role,
          created_at: profile.created_at,
        };

        const emailHtml = generateV8AppStoreLaunchHTML(userWithEmail.full_name?.split(' ')[0] || 'mate');

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'Andrew at Elec-Mate <founder@elec-mate.com>',
          to: [userWithEmail.email.trim().toLowerCase()],
          subject: "We're on the App Store.",
          reply_to: 'founder@elec-mate.com',
          html: emailHtml,
          tags: [
            { name: 'campaign', value: 'incomplete_signup_v8' },
            { name: 'role', value: profile.role || 'unknown' },
            { name: 'user_id', value: userId },
          ],
        });

        if (emailError) {
          console.error('Email send error:', emailError);
          throw new Error('Failed to send email');
        }

        // Update profile
        const { error: updateError } = await supabaseAdmin
          .from('profiles')
          .update({ incomplete_signup_sent_at: new Date().toISOString() })
          .eq('id', userId);

        if (updateError) {
          console.error('Failed to update incomplete_signup_sent_at:', updateError);
        }

        // Log to email_logs table
        await supabaseAdmin.from('email_logs').insert({
          to_email: userWithEmail.email,
          subject: 'Your Elec-Mate account is waiting for you',
          template: isApprentice ? 'incomplete_signup_apprentice' : 'incomplete_signup_electrician',
          status: 'sent',
          metadata: { user_id: userId, role: profile.role, resend_id: emailData?.id },
        });

        console.log(`Incomplete signup email sent to ${userWithEmail.email} by admin ${user.id}`);
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
            const { data: profile, error: profileErr } = await supabaseAdmin
              .from('profiles')
              .select('id, full_name, username, role, created_at, incomplete_signup_sent_at')
              .eq('id', uid)
              .single();

            if (profileErr || !profile) {
              errors.push(`${uid}: User not found`);
              continue;
            }

            if (profile.incomplete_signup_sent_at) {
              skippedCount++;
              continue;
            }

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
              role: profile.role,
              created_at: profile.created_at,
            };

            const emailHtml = generateV8AppStoreLaunchHTML(userWithEmail.full_name?.split(' ')[0] || 'mate');

            const { data: bulkEmailData, error: emailError } = await resend.emails.send({
              from: 'Andrew at Elec-Mate <founder@elec-mate.com>',
              to: [userWithEmail.email.trim().toLowerCase()],
              subject: "We're on the App Store.",
              reply_to: 'founder@elec-mate.com',
              html: emailHtml,
              tags: [
                { name: 'campaign', value: 'incomplete_signup_v8' },
                { name: 'role', value: profile.role || 'unknown' },
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
              .update({ incomplete_signup_sent_at: new Date().toISOString() })
              .eq('id', uid);

            // Log email
            await supabaseAdmin.from('email_logs').insert({
              to_email: userWithEmail.email,
              subject: 'Your Elec-Mate account is waiting for you',
              template: isApprentice
                ? 'incomplete_signup_apprentice'
                : 'incomplete_signup_electrician',
              status: 'sent',
              metadata: { user_id: uid, role: profile.role, resend_id: bulkEmailData?.id },
            });

            sentCount++;

            // Rate limit
            if (sentCount < userIds.length) {
              await sleep(SEND_DELAY_MS);
            }
          } catch (err: unknown) {
            errors.push(`${uid}: ${err instanceof Error ? err.message : String(err)}`);
          }
        }

        console.log(
          `Incomplete signup bulk send: ${sentCount} sent, ${skippedCount} skipped by admin ${user.id}`
        );
        result = {
          sent: sentCount,
          skipped: skippedCount,
          failed: errors.length,
          errors: errors.length > 0 ? errors : undefined,
        };
        break;
      }

      case 'send_test': {
        if (!testEmail) {
          throw new Error('Test email address is required');
        }

        // Default to electrician template for test, unless role specified
        const testUser: EligibleUser = {
          id: 'test-user-id',
          full_name: recipientName || 'Test User',
          username: 'testuser',
          email: testEmail,
          role: 'electrician',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        };

        const emailHtml = generateElectricianEmailHTML(testUser);
        const { error: emailError } = await resend.emails.send({
          from: 'Andrew at Elec-Mate <founder@elec-mate.com>',
          to: [testEmail.trim().toLowerCase()],
          subject: '[TEST] Your Elec-Mate account is waiting for you',
          reply_to: 'founder@elec-mate.com',
          html: emailHtml,
          tags: [
            { name: 'campaign', value: 'incomplete_signup' },
            { name: 'type', value: 'test' },
          ],
        });

        if (emailError) {
          console.error('Test email send error:', emailError);
          throw new Error(`Failed to send test email: ${emailError.message}`);
        }

        console.log(`Incomplete signup test email sent to ${testEmail} by admin ${user.id}`);
        result = { success: true, email: testEmail };
        break;
      }

      case 'send_manual': {
        if (!manualEmail) {
          throw new Error('Email address is required');
        }

        const manualUser: EligibleUser = {
          id: 'manual-entry',
          full_name: recipientName || null,
          username: 'user',
          email: manualEmail,
          role: 'electrician',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        };

        const manualEmailHtml = generateV8AppStoreLaunchHTML(manualUser.full_name?.split(' ')[0] || 'mate');
        const { data: manualEmailData, error: manualEmailError } = await resend.emails.send({
          from: 'Andrew at Elec-Mate <founder@elec-mate.com>',
          to: [manualEmail.trim().toLowerCase()],
          subject: "We're on the App Store.",
          reply_to: 'founder@elec-mate.com',
          html: manualEmailHtml,
          tags: [
            { name: 'campaign', value: 'incomplete_signup_v8' },
            { name: 'type', value: 'manual' },
          ],
        });

        if (manualEmailError) {
          console.error('Manual email send error:', manualEmailError);
          throw new Error(`Failed to send email: ${manualEmailError.message}`);
        }

        // Log to email_logs table
        await supabaseAdmin.from('email_logs').insert({
          to_email: manualEmail.trim().toLowerCase(),
          subject: "We're on the App Store.",
          template: 'incomplete_signup_v8_manual',
          status: 'sent',
          metadata: {
            sent_by_admin: user.id,
            recipient_name: recipientName,
            resend_id: manualEmailData?.id,
          },
        });

        console.log(`Incomplete signup email manually sent to ${manualEmail} by admin ${user.id}`);
        result = { success: true, email: manualEmail };
        break;
      }

      case 'get_sent_history': {
        const { data: sentUsers, error: sentError } = await supabaseAdmin
          .from('profiles')
          .select(
            'id, full_name, username, role, created_at, incomplete_signup_sent_at, subscribed'
          )
          .not('incomplete_signup_sent_at', 'is', null)
          .order('incomplete_signup_sent_at', { ascending: false })
          .limit(100);

        if (sentError) throw sentError;

        result = { users: sentUsers || [] };
        break;
      }

      case 'reset_sent': {
        // Reset incomplete_signup_sent_at for all unsent users who haven't subscribed
        const { data: resetUsers, error: resetErr } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .or('subscribed.is.null,subscribed.eq.false')
          .not('incomplete_signup_sent_at', 'is', null);

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
          .update({ incomplete_signup_sent_at: null, incomplete_signup_v3_sent_at: null })
          .in('id', resetIds);

        // Also reset v3-only users
        const { data: v3ResetUsers } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .or('subscribed.is.null,subscribed.eq.false')
          .not('incomplete_signup_v3_sent_at', 'is', null);
        const v3ResetIds = (v3ResetUsers || []).map((u: Record<string, unknown>) => u.id);
        if (v3ResetIds.length > 0) {
          await supabaseAdmin
            .from('profiles')
            .update({ incomplete_signup_v3_sent_at: null })
            .in('id', v3ResetIds);
        }

        if (updateErr) throw updateErr;

        console.log(
          `Admin ${user.id} reset incomplete_signup_sent_at for ${resetIds.length} users`
        );
        result = {
          reset: resetIds.length,
          message: `${resetIds.length} users reset and eligible for resend`,
        };
        break;
      }

      // ── V2 Campaign — targets ALL abandoned signups (no 10-day window) ──

      case 'get_v2_stats': {
        // Only target abandoned checkout users — those with a stripe_customer_id
        // (they started checkout but never completed payment)
        const { data: v2Profiles, error: v2StatsErr } = await supabaseAdmin
          .from('profiles')
          .select('id, incomplete_signup_v2_sent_at, subscribed, free_access_granted')
          .or('role.eq.electrician,role.eq.apprentice')
          .not('stripe_customer_id', 'is', null);
        if (v2StatsErr) throw v2StatsErr;

        // Filter to non-subscribed, non-free-access (the actual abandoned checkout cohort)
        const abandonedCheckout = (v2Profiles || []).filter((p) => {
          if (p.subscribed === true) return false;
          if (p.free_access_granted === true) return false;
          return true;
        });

        const v2Eligible = abandonedCheckout.filter((p) => !p.incomplete_signup_v2_sent_at);
        const v2Sent = abandonedCheckout.filter((p) => p.incomplete_signup_v2_sent_at);
        const v2Conversions = v2Sent.filter((p) => p.subscribed);

        result = {
          totalEligible: v2Eligible.length,
          sent: v2Sent.length,
          conversions: v2Conversions.length,
          conversionRate:
            v2Sent.length > 0 ? ((v2Conversions.length / v2Sent.length) * 100).toFixed(1) : '0',
        };
        break;
      }

      case 'send_v2_test': {
        if (!testEmail) throw new Error('testEmail is required');

        const testUser: EligibleUser = {
          id: 'test',
          full_name: recipientName || 'Test User',
          username: 'test',
          email: testEmail,
          role: 'electrician',
          created_at: new Date().toISOString(),
        };

        const v2TestHtml = generateV2EmailHTML(testUser);
        const { data: v2TestData, error: v2TestErr } = await resend.emails.send({
          from: 'Andrew at Elec-Mate <founder@elec-mate.com>',
          replyTo: 'founder@elec-mate.com',
          to: [testEmail.trim().toLowerCase()],
          subject: "[TEST] Your Elec-Mate account — here's what you're missing",
          html: v2TestHtml,
          tags: [
            { name: 'campaign', value: 'incomplete_signup_v2' },
            { name: 'type', value: 'test' },
          ],
        });

        if (v2TestErr) throw new Error(`Failed to send: ${v2TestErr.message}`);

        console.log(`V2 test email sent to ${testEmail} by admin ${user.id}`);
        result = { success: true, email: testEmail, resendId: v2TestData?.id };
        break;
      }

      case 'send_v2_campaign': {
        // Batch send V2 emails — called repeatedly by frontend until complete
        const V2_BATCH_SIZE = 10;

        // Only abandoned checkout users: has stripe_customer_id, not subscribed, no free access
        const { data: v2AllProfiles, error: v2AllErr } = await supabaseAdmin
          .from('profiles')
          .select('id, full_name, username, role, created_at, subscribed, free_access_granted')
          .or('role.eq.electrician,role.eq.apprentice')
          .not('stripe_customer_id', 'is', null)
          .is('incomplete_signup_v2_sent_at', null)
          .order('created_at', { ascending: true });
        if (v2AllErr) throw v2AllErr;

        // Filter out subscribed and free-access (supabase-js OR/null edge cases)
        const v2Filtered = (v2AllProfiles || []).filter(
          (p: any) => !p.subscribed && !p.free_access_granted
        );

        // Get emails from auth
        const { data: v2AuthData } = await supabaseAdmin.rpc('get_auth_user_emails');
        const v2EmailMap = new Map<string, string>();
        (v2AuthData || []).forEach((u: any) => {
          if (u.email) v2EmailMap.set(u.id, u.email);
        });

        const v2WithEmails = v2Filtered
          .map((p: any) => ({ ...p, email: v2EmailMap.get(p.id) || null }))
          .filter((p: any) => p.email);

        const v2Batch = v2WithEmails.slice(0, V2_BATCH_SIZE);

        if (v2Batch.length === 0) {
          result = { sent: 0, remaining: 0, complete: true, message: 'All V2 emails sent!' };
          break;
        }

        let v2SentCount = 0;
        const v2Errors: string[] = [];

        for (let i = 0; i < v2Batch.length; i++) {
          const profile = v2Batch[i];
          try {
            const emailUser: EligibleUser = {
              id: profile.id,
              full_name: profile.full_name,
              username: profile.username,
              email: profile.email,
              role: profile.role,
              created_at: profile.created_at,
            };

            const emailHtml = generateV2EmailHTML(emailUser);

            const { data: emailData, error: emailError } = await resend.emails.send({
              from: 'Andrew at Elec-Mate <founder@elec-mate.com>',
              replyTo: 'founder@elec-mate.com',
              to: [profile.email.trim().toLowerCase()],
              subject: "Your Elec-Mate account — here's what you're missing",
              html: emailHtml,
              tags: [
                { name: 'campaign', value: 'incomplete_signup_v2' },
                { name: 'role', value: profile.role || 'electrician' },
                { name: 'user_id', value: profile.id },
              ],
            });

            if (emailError) {
              v2Errors.push(`${profile.email}: ${emailError.message}`);
              continue;
            }

            // Mark as sent
            await supabaseAdmin
              .from('profiles')
              .update({ incomplete_signup_v2_sent_at: new Date().toISOString() })
              .eq('id', profile.id);

            // Log to email_logs
            await supabaseAdmin.from('email_logs').insert({
              to_email: profile.email,
              subject: "Your Elec-Mate account — here's what you're missing",
              template: 'incomplete_signup_v2',
              status: 'sent',
              metadata: {
                resend_id: emailData?.id,
                user_id: profile.id,
                role: profile.role,
              },
            });

            v2SentCount++;

            // Rate limit between sends
            if (i < v2Batch.length - 1) {
              await sleep(SEND_DELAY_MS);
            }
          } catch (err: any) {
            v2Errors.push(`${profile.email}: ${err.message}`);
          }
        }

        // Count remaining — same abandoned checkout filter
        const { data: v2RemainingProfiles } = await supabaseAdmin
          .from('profiles')
          .select('id, subscribed, free_access_granted')
          .or('role.eq.electrician,role.eq.apprentice')
          .not('stripe_customer_id', 'is', null)
          .is('incomplete_signup_v2_sent_at', null);

        const v2RemainingCount = (v2RemainingProfiles || []).filter(
          (p: any) => !p.subscribed && !p.free_access_granted
        ).length;
        const v2Complete = v2RemainingCount === 0;

        console.log(
          `V2 campaign: Sent ${v2SentCount}/${v2Batch.length} by admin ${user.id}. ~${v2RemainingCount} remaining.`
        );

        result = {
          sent: v2SentCount,
          remaining: v2RemainingCount,
          complete: v2Complete,
          errors: v2Errors.length > 0 ? v2Errors : undefined,
          message: v2Complete
            ? `All done! Sent ${v2SentCount} emails.`
            : `Sent ${v2SentCount}. ~${v2RemainingCount} remaining.`,
        };
        break;
      }

      // ── V3 Campaign — "Card Deets" reset, fresh email to all 91 ──

      case 'get_v3_stats': {
        // Same abandoned checkout cohort: has stripe_customer_id, not subscribed, not free access
        const { data: v3Profiles, error: v3StatsErr } = await supabaseAdmin
          .from('profiles')
          .select('id, incomplete_signup_v3_sent_at, subscribed, free_access_granted')
          .or('role.eq.electrician,role.eq.apprentice')
          .not('stripe_customer_id', 'is', null);
        if (v3StatsErr) throw v3StatsErr;

        const v3Abandoned = (v3Profiles || []).filter((p: any) => {
          if (p.subscribed === true) return false;
          if (p.free_access_granted === true) return false;
          return true;
        });

        const v3Eligible = v3Abandoned.filter((p: any) => !p.incomplete_signup_v3_sent_at);
        const v3Sent = v3Abandoned.filter((p: any) => p.incomplete_signup_v3_sent_at);
        const v3Conversions = v3Sent.filter((p: any) => p.subscribed);

        result = {
          totalEligible: v3Eligible.length,
          sent: v3Sent.length,
          totalAbandoned: v3Abandoned.length,
          conversions: v3Conversions.length,
          conversionRate:
            v3Sent.length > 0 ? ((v3Conversions.length / v3Sent.length) * 100).toFixed(1) : '0',
        };
        break;
      }

      case 'get_v3_eligible': {
        // Get full list of eligible users for the V3 campaign
        const { data: v3AllProfiles, error: v3AllErr } = await supabaseAdmin
          .from('profiles')
          .select('id, full_name, username, role, created_at, subscribed, free_access_granted')
          .or('role.eq.electrician,role.eq.apprentice')
          .not('stripe_customer_id', 'is', null)
          .is('incomplete_signup_v3_sent_at', null)
          .order('created_at', { ascending: false });
        if (v3AllErr) throw v3AllErr;

        const v3Filtered = (v3AllProfiles || []).filter(
          (p: any) => !p.subscribed && !p.free_access_granted
        );

        // Get emails
        const { data: v3AuthData } = await supabaseAdmin.rpc('get_auth_user_emails');
        const v3EmailMap = new Map<string, string>();
        (v3AuthData || []).forEach((u: any) => {
          if (u.email) v3EmailMap.set(u.id, u.email);
        });

        const v3WithEmails = v3Filtered
          .map((p: any) => ({ ...p, email: v3EmailMap.get(p.id) || null }))
          .filter((p: any) => p.email);

        result = { users: v3WithEmails };
        break;
      }

      case 'get_v3_sent': {
        // Get users already sent the V3 email
        const { data: v3SentProfiles, error: v3SentErr } = await supabaseAdmin
          .from('profiles')
          .select('id, full_name, username, role, created_at, incomplete_signup_v3_sent_at, subscribed')
          .not('incomplete_signup_v3_sent_at', 'is', null)
          .not('stripe_customer_id', 'is', null)
          .order('incomplete_signup_v3_sent_at', { ascending: false })
          .limit(200);
        if (v3SentErr) throw v3SentErr;

        result = { users: v3SentProfiles || [] };
        break;
      }

      case 'send_v3_test': {
        if (!testEmail) throw new Error('testEmail is required');

        const v3TestUser: EligibleUser = {
          id: 'test',
          full_name: recipientName || 'Test User',
          username: 'test',
          email: testEmail,
          role: 'electrician',
          created_at: new Date().toISOString(),
        };

        const v3TestHtml = generateV8AppStoreLaunchHTML(v3TestUser.full_name?.split(' ')[0] || 'Test');
        const { data: v3TestData, error: v3TestErr } = await resend.emails.send({
          from: 'Andrew at Elec-Mate <founder@elec-mate.com>',
          replyTo: 'founder@elec-mate.com',
          to: [testEmail.trim().toLowerCase()],
          subject: "[TEST] We're on the App Store.",
          html: v3TestHtml,
          tags: [
            { name: 'campaign', value: 'incomplete_signup_v3' },
            { name: 'type', value: 'test' },
          ],
        });

        if (v3TestErr) throw new Error(`Failed to send: ${v3TestErr.message}`);

        console.log(`V3 test email sent to ${testEmail} by admin ${user.id}`);
        result = { success: true, email: testEmail, resendId: v3TestData?.id };
        break;
      }

      case 'send_v3_campaign': {
        // Send ALL eligible users in batches of 10 with 8s pause between batches
        const BATCH_SIZE = 10;
        const BATCH_DELAY_MS = 8000;

        const { data: v3CampProfiles, error: v3CampErr } = await supabaseAdmin
          .from('profiles')
          .select('id, full_name, username, role, created_at, subscribed, free_access_granted')
          .or('role.eq.electrician,role.eq.apprentice')
          .not('stripe_customer_id', 'is', null)
          .is('incomplete_signup_v3_sent_at', null)
          .order('created_at', { ascending: true });
        if (v3CampErr) throw v3CampErr;

        const v3CampFiltered = (v3CampProfiles || []).filter(
          (p: any) => !p.subscribed && !p.free_access_granted
        );

        // Get emails
        const { data: v3CampAuth } = await supabaseAdmin.rpc('get_auth_user_emails');
        const v3CampEmailMap = new Map<string, string>();
        (v3CampAuth || []).forEach((u: any) => {
          if (u.email) v3CampEmailMap.set(u.id, u.email);
        });

        const allToSend = v3CampFiltered
          .map((p: any) => ({ ...p, email: v3CampEmailMap.get(p.id) || null }))
          .filter((p: any) => p.email);

        if (allToSend.length === 0) {
          result = { sent: 0, remaining: 0, complete: true, message: 'All emails already sent!' };
          break;
        }

        let v3SentCount = 0;
        const v3Errors: string[] = [];

        // Process in batches of 10
        for (let batchStart = 0; batchStart < allToSend.length; batchStart += BATCH_SIZE) {
          const batch = allToSend.slice(batchStart, batchStart + BATCH_SIZE);
          const batchNum = Math.floor(batchStart / BATCH_SIZE) + 1;
          const totalBatches = Math.ceil(allToSend.length / BATCH_SIZE);

          console.log(`Sending batch ${batchNum}/${totalBatches} (${batch.length} emails)...`);

          for (const profile of batch) {
            try {
              const emailHtml = generateV8AppStoreLaunchHTML(profile.full_name?.split(' ')[0] || 'mate');

              const { data: emailData, error: emailError } = await resend.emails.send({
                from: 'Andrew at Elec-Mate <founder@elec-mate.com>',
                replyTo: 'founder@elec-mate.com',
                to: [profile.email.trim().toLowerCase()],
                subject: "We're on the App Store.",
                html: emailHtml,
                tags: [
                  { name: 'campaign', value: 'incomplete_signup_v8' },
                  { name: 'role', value: profile.role || 'electrician' },
                  { name: 'user_id', value: profile.id },
                ],
              });

              if (emailError) {
                v3Errors.push(`${profile.email}: ${emailError.message}`);
                continue;
              }

              // Mark as sent
              await supabaseAdmin
                .from('profiles')
                .update({ incomplete_signup_v3_sent_at: new Date().toISOString() })
                .eq('id', profile.id);

              // Log to email_logs
              await supabaseAdmin.from('email_logs').insert({
                to_email: profile.email,
                subject: "We're on the App Store.",
                template: 'incomplete_signup_v8',
                status: 'sent',
                metadata: {
                  resend_id: emailData?.id,
                  user_id: profile.id,
                  role: profile.role,
                },
              });

              v3SentCount++;
              await sleep(SEND_DELAY_MS); // 500ms between individual emails
            } catch (err: any) {
              v3Errors.push(`${profile.email}: ${err.message}`);
            }
          }

          // 8 second pause between batches (unless last batch)
          if (batchStart + BATCH_SIZE < allToSend.length) {
            console.log(`Batch ${batchNum} done. Waiting ${BATCH_DELAY_MS / 1000}s before next batch...`);
            await sleep(BATCH_DELAY_MS);
          }
        }

        const v3RemCount = 0;
        const v3Complete = true;

        console.log(
          `V3 campaign: Sent ${v3SentCount}/${v3Batch.length} by admin ${user.id}. ~${v3RemCount} remaining.`
        );

        result = {
          sent: v3SentCount,
          remaining: v3RemCount,
          complete: v3Complete,
          errors: v3Errors.length > 0 ? v3Errors : undefined,
          message: v3Complete
            ? `All done! Sent ${v3SentCount} emails.`
            : `Sent ${v3SentCount}. ~${v3RemCount} remaining.`,
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
    console.error('Error in send-incomplete-signup:', errMsg, errStack);
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
