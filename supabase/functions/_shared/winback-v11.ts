// V11 winback / early-access template.
//
// Built around BS 7671 A4:2026 going live (April 2026). The hero is the free
// A4:2026 changes cheatsheet — every electrician is being forced to relearn
// the schedule columns regardless, so we lead with a useful gift and then
// show what's actually new in Elec-Mate since v10.
//
// Customer-facing only — no internal jargon (no "facets", no "RAG", no
// references to unreleased products like Mate). The publicly-launched AI
// product is Elec-AI; Mate (WhatsApp) is still in alpha so it's not in here.
//
// Structure (top to bottom):
//   1. The gift — A4:2026 cheatsheet (above the fold, no email gate)
//   2. WHAT'S CHANGED — A4:2026 across the entire app
//   3. WHAT'S IN — Study Centre, Elec-AI, Apprentice tools, College Hub
//   4. WHAT'S COMING — CPD tracking, Android, more
//   5. A thank-you offer — £9.99/mo (£5/mo off normal price)
//   6. Personal sign-off
//
// Mirrors v10's send infrastructure (TokenBucket, sendBatchWithRetry, HMAC
// unsubscribe etc.) — re-exported from v10 so callers swap one import line.

export {
  FROM_V10 as FROM_V11,
  REPLY_TO,
  UNSUBSCRIBE_MAILTO,
  RESEND_RPS,
  BATCH_MAX,
  TokenBucket,
  hmacSign,
  buildUnsubscribeUrl,
  buildUnsubscribeHeaders,
  isSuppressed,
  sendBatchWithRetry,
} from './winback-v10.ts';
export type { ResendBatchItem } from './winback-v10.ts';

function escapeHtmlEmail(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export type V11Variant = 'winback' | 'early_access';

const CHEATSHEET_URL = 'https://www.elec-mate.com/lead-magnets/bs7671-a4-2026-cheatsheet.html';
// V11 £7.99/mo Stripe payment link.
const PAYMENT_LINK = 'https://buy.stripe.com/7sYcMY1gm67a6U96FgbjW00';
const APP_STORE_URL = 'https://apps.apple.com/gb/app/elec-mate/id6758948665';
const APP_STORE_BADGE =
  'https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/black/en-gb?size=750x249';
const LOGO_URL = 'https://www.elec-mate.com/images/elec-mate-logo-512.png';
const FOUNDER_PHOTO = 'https://www.elec-mate.com/images/andrew-moore.jpeg';

function v11Intro(
  variant: V11Variant,
  firstName: string
): { h1: string; sub: string; greeting: string; preheader: string; subject: string } {
  const safeName = escapeHtmlEmail(firstName);
  if (variant === 'early_access') {
    return {
      subject: 'A4:2026 is here — your free changes cheatsheet inside',
      preheader:
        'Free 4-page A4:2026 changes cheatsheet · Study Centre rebuilt · Elec-AI shipped · we&apos;re building every day.',
      h1: 'A4:2026 is here.',
      sub: 'Here&#x27;s a free cheatsheet on what changed &mdash; plus the app you signed up early for.',
      greeting: `Hey ${safeName} &mdash; Andrew here, founder of Elec-Mate. You signed up early, so you get this first. The 18th Edition Amendment 4 dropped this April and every sparky in the country is having to relearn the schedule columns. Take the cheatsheet either way &mdash; our way of saying thanks for backing us early.`,
    };
  }
  return {
    subject: 'A4:2026 is here — a free cheatsheet, on us',
    preheader:
      'Free 4-page A4:2026 changes cheatsheet · 16 certificates updated · Study Centre rebuilt · we ship every day.',
    h1: 'A4:2026 is here.',
    sub: 'Here&#x27;s a free cheatsheet on what changed &mdash; plus everything we&#x27;ve built since you last saw us.',
    greeting: `Hey ${safeName} &mdash; Andrew here, founder of Elec-Mate. Thanks for giving us a try a while back. The 18th Edition Amendment 4 dropped this April and every electrician in the country is having to relearn the schedule columns. Whatever you decide about coming back, take the cheatsheet &mdash; it&#x27;ll save you an evening of digging.`,
  };
}

export function v11Subject(variant: V11Variant, firstName: string): string {
  return v11Intro(variant, firstName).subject;
}

export function generateV11HTML(
  variant: V11Variant,
  firstName: string,
  unsubscribeUrl: string
): string {
  const year = new Date().getFullYear();
  const safeUnsub = escapeHtmlEmail(unsubscribeUrl);
  const { h1, sub, greeting, preheader } = v11Intro(variant, firstName);

  return `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="color-scheme" content="dark light">
<meta name="supported-color-schemes" content="dark light">
<title>${h1}</title>
<!--[if mso]><style>body,table,td{font-family:Arial,sans-serif!important}</style><![endif]-->
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#000;color:#f4f4f5;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%">

<div style="display:none;max-height:0;overflow:hidden;color:transparent;height:0;width:0;opacity:0">${escapeHtmlEmail(preheader)}</div>
<div style="display:none;max-height:0;overflow:hidden">&#8202;&#8203;&#847;&zwnj;&nbsp;&#8203;&#8205;&nbsp;&#8203;&#8204;&nbsp;&#8203;&#847;&nbsp;&#8203;&#8205;&nbsp;&#8203;&#8204;&nbsp;&#8203;&#8205;&nbsp;&#8203;</div>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#000"><tr><td align="center">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:600px;background:#000">

<tr><td style="height:48px;line-height:48px;font-size:0">&nbsp;</td></tr>

<tr><td align="center" style="padding:0 32px">
<img src="${LOGO_URL}" alt="Elec-Mate" width="120" height="120" style="display:block;border-radius:22px">
</td></tr>

<tr><td style="height:36px;line-height:36px;font-size:0">&nbsp;</td></tr>

<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 12px;font-size:11px;color:#fbbf24;text-transform:uppercase;letter-spacing:2.5px;font-weight:800">BS 7671:2018 + Amendment 4</p>
<h1 style="margin:0;font-size:44px;font-weight:700;color:#ffffff;line-height:1.05;letter-spacing:-0.9px">${h1}</h1>
</td></tr>

<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>

<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:17px;color:#f4f4f5;line-height:1.5">${sub}</p>
</td></tr>

<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>

<!-- TOP HERO — price first, value-led -->
<tr><td align="center" style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:linear-gradient(135deg,rgba(251,191,36,0.18),rgba(245,158,11,0.08));border:1px solid rgba(251,191,36,0.4);border-radius:18px">
<tr><td align="center" style="padding:26px 22px">
<p style="margin:0 0 8px;font-size:10px;color:#fbbf24;text-transform:uppercase;letter-spacing:2.5px;font-weight:800">A thank&#8209;you for trying us</p>
<p style="margin:0;font-size:18px;color:#f4f4f5;line-height:1.4">Come back to <strong style="color:#ffffff">Elec&#8209;Mate</strong> for</p>
<p style="margin:6px 0 0;font-size:54px;font-weight:700;color:#ffffff;line-height:1;letter-spacing:-2.2px">&pound;7.99<span style="font-size:20px;font-weight:500;letter-spacing:0;color:#f4f4f5">/mo</span></p>
<p style="margin:8px 0 18px;font-size:13px;color:#fbbf24;font-weight:600"><span style="text-decoration:line-through;color:#a1a1aa;font-weight:400">&pound;14.99/mo</span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;&pound;7/mo off, while you stay subscribed</p>
<a href="${PAYMENT_LINK}" style="display:inline-block;padding:16px 40px;background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:13px;font-size:16px;font-weight:700;color:#000;text-decoration:none;letter-spacing:-0.2px;box-shadow:0 4px 18px rgba(251,191,36,0.22)">Take Elec&#8209;Mate for &pound;7.99/mo</a>
<p style="margin:14px 0 0;font-size:12px;color:#a1a1aa">Cancel anytime &middot; full app, no feature gate</p>
</td></tr></table>
</td></tr>

<tr><td style="height:36px;line-height:36px;font-size:0">&nbsp;</td></tr>

<!-- THE GIFT — A4:2026 cheatsheet, lead with this -->
<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:linear-gradient(135deg,rgba(251,191,36,0.16),rgba(245,158,11,0.06));border:1px solid rgba(251,191,36,0.35);border-radius:18px">
<tr><td style="padding:28px 26px">
<p style="margin:0 0 12px;font-size:10px;color:#fbbf24;text-transform:uppercase;letter-spacing:2.5px;font-weight:800">A free gift &mdash; from us</p>
<h2 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#ffffff;line-height:1.18;letter-spacing:-0.4px">The A4:2026 Changes Cheatsheet</h2>
<p style="margin:0 0 18px;font-size:15px;color:#f4f4f5;line-height:1.6">Four pages. The bits that actually changed for the everyday job &mdash; AFDD requirements, TN&#8209;C&#8209;S / PNB earthing, the new schedule columns, model-form deltas. No signup. No email gate. Print it, save it, done.</p>
<a href="${CHEATSHEET_URL}" style="display:inline-block;padding:14px 32px;background:#fbbf24;border-radius:12px;font-size:15px;font-weight:700;color:#000;text-decoration:none;letter-spacing:-0.1px">Download the cheatsheet &rarr;</a>
<p style="margin:14px 0 0;font-size:12px;color:#d4d4d8">Yours regardless. No strings.</p>
</td></tr></table>
</td></tr>

<tr><td style="height:44px;line-height:44px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:36px;line-height:36px;font-size:0">&nbsp;</td></tr>

<!-- WHAT'S CHANGED — A4:2026 across the whole app -->
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:11px;color:#fbbf24;text-transform:uppercase;letter-spacing:2px;font-weight:800">What&#x27;s changed</p>
<h2 style="margin:0 0 10px;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.4px;line-height:1.18">A4:2026 across the entire app</h2>
<p style="margin:0 0 22px;font-size:15px;color:#f4f4f5;line-height:1.6">Not bolted on &mdash; every certificate, calculation and learning module rebuilt for the new amendment.</p>
</td></tr>

<tr><td style="padding:0 32px">

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:22px"><tr>
<td width="48" valign="top" style="padding-top:3px;width:48px">
<div style="width:40px;height:40px;background:rgba(251,191,36,0.18);border-radius:11px;text-align:center;line-height:40px;font-size:18px">&#x1F4DC;</div>
</td>
<td style="padding-left:14px">
<p style="margin:0;font-size:17px;font-weight:700;color:#ffffff;line-height:1.25">All 16 certificates &mdash; A4-ready</p>
<p style="margin:6px 0 0;font-size:14px;color:#f4f4f5;line-height:1.65">EIC, EICR, Minor Works, Solar PV, EV Charging, BESS, G98 / G99, Fire Alarm (design / install / commission / modify / inspect), Smoke &amp; CO, Lightning Protection, Emergency Lighting, Testing Only, PAT &mdash; all carry the new AFDD fields, supplementary-bonding records, updated declarations and the revised schedule columns.</p>
</td></tr></table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:22px"><tr>
<td width="48" valign="top" style="padding-top:3px;width:48px">
<div style="width:40px;height:40px;background:rgba(34,197,94,0.18);border-radius:11px;text-align:center;line-height:40px;font-size:18px">&#x1F4D0;</div>
</td>
<td style="padding-left:14px">
<p style="margin:0;font-size:17px;font-weight:700;color:#ffffff;line-height:1.25">Calculations updated &mdash; right numbers, every time</p>
<p style="margin:6px 0 0;font-size:14px;color:#f4f4f5;line-height:1.65">Max Zs, R1+R2, cable sizing, voltage drop, RCD selection, CPC sizing, SPD coordination &mdash; all rebuilt against the A4:2026 tables. Type B 32 A on TN-S? You get 1.37 &Omega; on the spot, with the GN3 site factor next to it.</p>
</td></tr></table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="48" valign="top" style="padding-top:3px;width:48px">
<div style="width:40px;height:40px;background:rgba(99,102,241,0.22);border-radius:11px;text-align:center;line-height:40px;font-size:18px">&#x1F4DA;</div>
</td>
<td style="padding-left:14px">
<p style="margin:0;font-size:17px;font-weight:700;color:#ffffff;line-height:1.25">18th Edition CPD course &mdash; rewritten for A4:2026</p>
<p style="margin:6px 0 0;font-size:14px;color:#f4f4f5;line-height:1.65">All 40 sections rebuilt against the current amendment. Practice questions, working examples, model-form walk-throughs &mdash; everything an electrician needs to be confident with the changes when the next inspection lands.</p>
</td></tr></table>

</td></tr>

<tr><td style="height:44px;line-height:44px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:36px;line-height:36px;font-size:0">&nbsp;</td></tr>

<!-- WHAT'S IN — new since v10 -->
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:11px;color:#fbbf24;text-transform:uppercase;letter-spacing:2px;font-weight:800">What&#x27;s in</p>
<h2 style="margin:0 0 10px;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.4px;line-height:1.18">New since you last looked</h2>
<p style="margin:0 0 22px;font-size:15px;color:#f4f4f5;line-height:1.6">The bits that have shipped &mdash; the ones electricians use daily.</p>
</td></tr>

<tr><td style="padding:0 32px">

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:26px"><tr>
<td width="52" valign="top" style="width:52px">
<div style="width:44px;height:44px;background:#fbbf24;border-radius:11px;text-align:center;line-height:44px;font-size:22px">&#x1F393;</div>
</td>
<td style="padding-left:14px">
<div style="margin:0 0 6px">
<span style="display:inline-block;padding:3px 10px;background:#fbbf24;border-radius:20px;font-size:10px;font-weight:800;color:#000;text-transform:uppercase;letter-spacing:0.8px">Massively expanded</span>
</div>
<p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;line-height:1.25">Study Centre &mdash; Levels 2 + 3, A4 18th Edition, plus four full CPD courses</p>
<p style="margin:8px 0 0;font-size:14px;color:#f4f4f5;line-height:1.65">Level 2 and Level 3 apprentice courses fully built end to end. 18th Edition CPD course rewritten for A4:2026 (40 sections). Inspection &amp; Testing CPD course (44 sections). Fire Alarm CPD against BS 5839-1:2025 (36 sections). PAT testing course (26 sections). Mock exam with a 1,500-question pool. <strong style="color:#ffffff">CPD hours tracking is coming next</strong> &mdash; log automatically as you complete sections.</p>
</td></tr></table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:22px"><tr>
<td width="48" valign="top" style="padding-top:3px;width:48px">
<div style="width:40px;height:40px;background:rgba(168,85,247,0.22);border-radius:11px;text-align:center;line-height:40px;font-size:18px">&#x26A1;</div>
</td>
<td style="padding-left:14px">
<p style="margin:0;font-size:17px;font-weight:700;color:#ffffff;line-height:1.25">Elec-AI &mdash; ChatGPT for sparkies, in your sidebar</p>
<p style="margin:6px 0 0;font-size:14px;color:#f4f4f5;line-height:1.65">Trained on BS 7671 A4:2026 itself, not the old amendment. Ask anything: <em style="color:#ffffff;font-style:italic">&ldquo;Max Zs for a Type B 32 A on TN&#8209;S?&rdquo;</em>, <em style="color:#ffffff;font-style:italic">&ldquo;what actually changed in Section 421?&rdquo;</em>, <em style="color:#ffffff;font-style:italic">&ldquo;does this kitchen socket need an AFDD now?&rdquo;</em> &mdash; it cites the regs and shows the working. One tap from anywhere in the app.</p>
</td></tr></table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:22px"><tr>
<td width="48" valign="top" style="padding-top:3px;width:48px">
<div style="width:40px;height:40px;background:rgba(14,165,233,0.22);border-radius:11px;text-align:center;line-height:40px;font-size:18px">&#x1F4DD;</div>
</td>
<td style="padding-left:14px">
<p style="margin:0;font-size:17px;font-weight:700;color:#ffffff;line-height:1.25">Apprentice tools &mdash; AI Notebook + OTJ write-up loop</p>
<p style="margin:6px 0 0;font-size:14px;color:#f4f4f5;line-height:1.65">Apprentices type a few words, the AI Notebook turns it into a structured Off-The-Job entry ready for tutor review. Verification loop, weekly briefs to the tutor, photo evidence, learner&#x2011;tutor messaging &mdash; the whole apprentice journey, in one app.</p>
</td></tr></table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="48" valign="top" style="padding-top:3px;width:48px">
<div style="width:40px;height:40px;background:rgba(34,197,94,0.18);border-radius:11px;text-align:center;line-height:40px;font-size:18px">&#x1F527;</div>
</td>
<td style="padding-left:14px">
<p style="margin:0;font-size:17px;font-weight:700;color:#ffffff;line-height:1.25">Plus everything from before &mdash; tightened</p>
<p style="margin:6px 0 0;font-size:14px;color:#f4f4f5;line-height:1.65">Quotes &amp; Invoices rebuilt. Room Planner with smart cable routing. Site Safety &amp; RAMS. Live UK Price Book. Stock Tracker. Cert PDFs polished &mdash; logos, schedule of tests, duplicate-cert prevention, schemes &mdash; dozens of small fixes from real-site feedback.</p>
</td></tr></table>

</td></tr>

<tr><td style="height:44px;line-height:44px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:36px;line-height:36px;font-size:0">&nbsp;</td></tr>

<!-- WHAT'S COMING -->
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:11px;color:#fbbf24;text-transform:uppercase;letter-spacing:2px;font-weight:800">Coming next</p>
<h2 style="margin:0 0 18px;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.4px;line-height:1.18">Two things on deck</h2>
<ul style="margin:0;padding:0 0 0 18px;font-size:15px;color:#f4f4f5;line-height:1.85">
<li><strong style="color:#ffffff">CPD hours tracking</strong> &mdash; auto-log as you complete Study Centre sections, export the certificate.</li>
<li><strong style="color:#ffffff">Android</strong> &mdash; Play Store launch this quarter. Same app, same data.</li>
</ul>
</td></tr>

<tr><td style="height:48px;line-height:48px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>

<!-- Testimonial -->
<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px">
<tr><td style="padding:22px 22px">
<p style="margin:0 0 10px;font-size:14px;color:#fbbf24;letter-spacing:2px">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
<p style="margin:0;font-size:16px;color:#ffffff;line-height:1.55;font-style:italic">&ldquo;Absolutely superb. I can invoice, complete testing certs and reports as well as track my CPD. Everything in one place is exactly what I need &mdash; worth every penny.&rdquo;</p>
<p style="margin:12px 0 0;font-size:13px;color:#f4f4f5">&mdash; Jay &middot; App Store review</p>
</td></tr></table>
</td></tr>

<tr><td style="height:36px;line-height:36px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:36px;line-height:36px;font-size:0">&nbsp;</td></tr>

<!-- Offer — a thank-you, not a discount push -->
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 10px;font-size:11px;color:#fbbf24;text-transform:uppercase;letter-spacing:2px;font-weight:800">Still here? Take the offer.</p>
<p style="margin:0;font-size:60px;font-weight:700;color:#ffffff;line-height:1;letter-spacing:-2.4px">&pound;7.99<span style="font-size:22px;font-weight:500;letter-spacing:0;color:#f4f4f5">/mo</span></p>
<p style="margin:14px auto 0;font-size:15px;color:#f4f4f5;line-height:1.65;max-width:440px">That&#x27;s <strong style="color:#fbbf24">&pound;7/mo off</strong> our normal &pound;14.99 &mdash; our way of saying thanks for giving Elec-Mate a shot. We&#x27;re shipping updates <strong style="color:#ffffff">every single day</strong>, faster than anyone else in the trade. Come and see what&#x27;s changed.</p>
</td></tr>

<tr><td style="height:30px;line-height:30px;font-size:0">&nbsp;</td></tr>

<tr><td align="center" style="padding:0 32px">
<a href="${PAYMENT_LINK}" style="display:inline-block;padding:18px 48px;background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:14px;font-size:17px;font-weight:700;color:#000;text-decoration:none;letter-spacing:-0.2px;box-shadow:0 4px 20px rgba(251,191,36,0.25)">Take the offer &mdash; &pound;7.99/mo</a>
</td></tr>

<tr><td style="height:22px;line-height:22px;font-size:0">&nbsp;</td></tr>

<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 14px;font-size:14px;color:#f4f4f5">Then download the app &mdash; you&#x27;re straight in.</p>
<a href="${APP_STORE_URL}"><img src="${APP_STORE_BADGE}" alt="Download on the App Store" width="180" height="60" style="display:block;margin:0 auto;border:0"></a>
</td></tr>

<tr><td style="height:48px;line-height:48px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:36px;line-height:36px;font-size:0">&nbsp;</td></tr>

<tr><td align="center" style="padding:0 32px">
<img src="${FOUNDER_PHOTO}" alt="Andrew Moore, Founder" width="96" height="96" style="display:block;margin:0 auto;border-radius:50%;border:3px solid #fbbf24">
</td></tr>

<tr><td style="height:18px;line-height:18px;font-size:0">&nbsp;</td></tr>

<tr><td style="padding:0 32px">
<p style="margin:0 0 14px;font-size:15px;color:#f4f4f5;line-height:1.7">${greeting}</p>
<p style="margin:0 0 14px;font-size:15px;color:#f4f4f5;line-height:1.7">Reply to this email if there&#x27;s a feature you want me to ship next, or just to say hello. Comes straight to me.</p>
<p style="margin:0;font-size:15px;color:#f4f4f5;line-height:1.7">Cheers,<br><span style="color:#fbbf24;font-weight:700">Andrew</span> &middot; Founder, Elec-Mate</p>
</td></tr>

<tr><td style="height:44px;line-height:44px;font-size:0">&nbsp;</td></tr>

<tr><td align="center" style="padding:0 32px 44px">
<p style="margin:0 0 10px;font-size:12px;color:#71717a;line-height:1.6">&copy; ${year} Elec-Mate Ltd &middot; United Kingdom</p>
<p style="margin:0 0 14px;font-size:11px;color:#71717a;line-height:1.5">${variant === 'early_access' ? 'You&#x27;re getting this because you signed up for early access to Elec-Mate.' : 'You&#x27;re getting this because you signed up for a free trial of Elec-Mate.'} Important account emails (receipts, security) are separate.</p>
<p style="margin:0;font-size:12px;color:#a1a1aa;line-height:1.5"><a href="${safeUnsub}" style="color:#a1a1aa;text-decoration:underline">Unsubscribe</a> &middot; <a href="mailto:info@elec-mate.com" style="color:#a1a1aa;text-decoration:underline">info@elec-mate.com</a></p>
</td></tr>

</table>
</td></tr></table>
</body></html>`;
}

export function generateV11PlainText(
  variant: V11Variant,
  firstName: string,
  unsubscribeUrl: string
): string {
  const year = new Date().getFullYear();
  const reason =
    variant === 'early_access'
      ? "You're getting this because you signed up for early access to Elec-Mate."
      : "You're getting this because you signed up for a free trial of Elec-Mate.";
  return `Hey ${firstName},

A4:2026 IS HERE.

The 18th Edition Amendment 4 dropped this April. Every electrician in
the country is having to relearn the schedule columns. Whatever you
decide about coming back to Elec-Mate, take this — it'll save you an
evening of digging.

═══════════════════════════════════════════════════
🎁  THE A4:2026 CHANGES CHEATSHEET — FREE
═══════════════════════════════════════════════════

Four pages. AFDDs. TN-C-S / PNB earthing. New schedule columns.
Model-form deltas. No signup. No email gate. Yours regardless.

Download: ${CHEATSHEET_URL}

═══════════════════════════════════════════════════
WHAT'S CHANGED
═══════════════════════════════════════════════════

📜  ALL 16 CERTIFICATES — A4-READY
EIC, EICR, Minor Works, Solar PV, EV Charging, BESS, G98 / G99,
Fire Alarm (design / install / commission / modify / inspect), Smoke
& CO, Lightning Protection, Emergency Lighting, Testing Only, PAT —
all carry the new AFDD fields, supplementary-bonding records, updated
declarations and the revised schedule columns.

📐  CALCULATIONS UPDATED — RIGHT NUMBERS, EVERY TIME
Max Zs, R1+R2, cable sizing, voltage drop, RCD selection, CPC sizing,
SPD coordination — all rebuilt against the A4:2026 tables. Type B 32 A
on TN-S? You get 1.37 Ω on the spot.

📚  18TH EDITION CPD COURSE — REWRITTEN FOR A4:2026
All 40 sections rebuilt against the current amendment. Practice
questions, working examples, model-form walk-throughs.

═══════════════════════════════════════════════════
WHAT'S IN — NEW SINCE YOU LAST LOOKED
═══════════════════════════════════════════════════

🎓  STUDY CENTRE — MASSIVELY EXPANDED
Level 2 and Level 3 apprentice courses, end to end. 18th Edition CPD
course rebuilt for A4:2026 (40 sections). Inspection & Testing CPD
course (44 sections). Fire Alarm CPD against BS 5839-1:2025 (36
sections). PAT testing course (26 sections). Mock exam with a
1,500-question pool. CPD HOURS TRACKING is coming next — log
automatically as you complete sections.

⚡  ELEC-AI — CHATGPT FOR SPARKIES, IN YOUR SIDEBAR
Trained on BS 7671 A4:2026 itself, not the old amendment. Ask anything
— "Max Zs for a Type B 32 A on TN-S?", "what changed in Section 421?",
"does this kitchen socket need an AFDD now?" — it cites the regs and
shows the working. One tap from anywhere in the app.

📝  APPRENTICE TOOLS — AI NOTEBOOK + OTJ WRITE-UP LOOP
Apprentices type a few words, the AI Notebook turns it into a
structured Off-The-Job entry ready for tutor review. Verification
loop, weekly tutor briefs, photo evidence, learner-tutor messaging.

🔧  PLUS EVERYTHING FROM BEFORE — TIGHTENED
Quotes & Invoices rebuilt. Room Planner with smart cable routing. Site
Safety & RAMS. Live UK Price Book. Stock Tracker. Cert PDFs polished —
logos, schedule of tests, duplicate-cert prevention, schemes — dozens
of fixes from real-site feedback.

═══════════════════════════════════════════════════
COMING NEXT — TWO THINGS ON DECK
═══════════════════════════════════════════════════

• CPD HOURS TRACKING — auto-log as you complete sections
• ANDROID — Play Store launch this quarter

═══════════════════════════════════════════════════
"Absolutely superb. I can invoice, complete testing certs and reports
as well as track my CPD. Everything in one place is exactly what I
need — worth every penny."
— Jay · ★★★★★ App Store review

═══════════════════════════════════════════════════
A THANK-YOU FOR TRYING US
═══════════════════════════════════════════════════

£9.99/mo. That's £5/mo off our normal £14.99 — our way of saying
thanks for giving Elec-Mate a shot. We're shipping updates every
single day, faster than anyone else in the trade. Come and see what's
changed.

Take the offer: ${PAYMENT_LINK}
Then download the app: ${APP_STORE_URL}

═══════════════════════════════════════════════════

Andrew Moore, Founder
Reply to this email — it comes straight to me.

═══════════════════════════════════════════════════

${reason} Important account emails (receipts, security) are separate.

Unsubscribe: ${unsubscribeUrl}
Questions: info@elec-mate.com

© ${year} Elec-Mate Ltd · United Kingdom`;
}
