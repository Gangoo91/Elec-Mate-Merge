// Outreach email templates — versioned in git, seeded into outreach_email_templates table.
// Shared design system inspired by V10: dark background, yellow accent, founder photo,
// real product value over fluff. Every template is editable in the admin UI after seeding.

export interface OutreachTemplate {
  slug: string;
  name: string;
  category:
    | 'college'
    | 'tutor'
    | 'apprentice'
    | 'employer'
    | 'follow_up'
    | 'general'
    | 'business';
  subject: string;
  preheader: string;
  html_body: string;
  merge_tags: string[];
  description: string;
  thumbnail_emoji: string;
  sort_order: number;
}

// ─── Shared layout (head + wrapper open) ───────────────────────
const emailOpen = (preheader: string) => `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="color-scheme" content="dark light">
<meta name="supported-color-schemes" content="dark light">
<title>Elec-Mate</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#000;color:#f4f4f5;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;color:transparent;height:0;width:0;opacity:0">${preheader}</div>
<div style="display:none;max-height:0;overflow:hidden">&#8202;&#8203;&#847;&zwnj;&nbsp;&#8203;&#8205;&nbsp;&#8203;&#8204;&nbsp;&#8203;&#847;&nbsp;&#8203;&#8205;&nbsp;</div>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#000"><tr><td align="center">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:600px;background:#000">
<tr><td style="height:40px;line-height:40px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 32px">
<img src="https://www.elec-mate.com/images/elec-mate-logo-512.png" alt="Elec-Mate" width="96" height="96" style="display:block;border-radius:18px">
</td></tr>
<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>`;

// ─── Shared footer (founder photo + sign-off + unsub placeholder) ──
const emailFooter = (bodyCopyFirstName: string) => `
<tr><td style="height:40px;line-height:40px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>

<tr><td align="center" style="padding:0 32px">
<img src="https://www.elec-mate.com/images/andrew-moore.jpeg" alt="Andrew Moore, Founder" width="88" height="88" style="display:block;margin:0 auto;border-radius:50%;border:3px solid #fbbf24">
</td></tr>
<tr><td style="height:16px;line-height:16px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px">
<p style="margin:0 0 12px;font-size:15px;color:#f4f4f5;line-height:1.7">${bodyCopyFirstName}</p>
<p style="margin:0;font-size:15px;color:#f4f4f5;line-height:1.7">Cheers,<br><span style="color:#fbbf24;font-weight:700">Andrew</span> &middot; Founder, Elec-Mate<br><a href="mailto:founder@elec-mate.com" style="color:#fbbf24;text-decoration:none">founder@elec-mate.com</a></p>
</td></tr>
<tr><td style="height:36px;line-height:36px;font-size:0">&nbsp;</td></tr>

<tr><td align="center" style="padding:0 32px 44px">
<p style="margin:0 0 8px;font-size:12px;color:#71717a;line-height:1.6">&copy; ${new Date().getFullYear()} Elec-Mate Ltd &middot; United Kingdom</p>
<p style="margin:0 0 12px;font-size:11px;color:#71717a;line-height:1.5">You&#x27;re receiving this because we thought Elec-Mate could help {{OrganisationFallback}}.</p>
</td></tr>

</table></td></tr></table>
</body></html>`;

const divider = `<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>`;

// ─── Feature row helper (used in several templates) ────────────
function featureRow(icon: string, iconBg: string, title: string, body: string) {
  return `
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:20px"><tr>
<td width="48" valign="top" style="padding-top:3px;width:48px">
<div style="width:40px;height:40px;background:${iconBg};border-radius:11px;text-align:center;line-height:40px;font-size:18px">${icon}</div>
</td>
<td style="padding-left:14px">
<p style="margin:0;font-size:16px;font-weight:700;color:#ffffff;line-height:1.3">${title}</p>
<p style="margin:6px 0 0;font-size:14px;color:#f4f4f5;line-height:1.6">${body}</p>
</td></tr></table>`;
}

// ─── CTA button helper ─────────────────────────────────────────
function ctaButton(label: string, url: string) {
  return `
<tr><td align="center" style="padding:0 32px">
<a href="${url}" style="display:inline-block;padding:16px 42px;background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:14px;font-size:16px;font-weight:700;color:#000;text-decoration:none;letter-spacing:-0.2px;box-shadow:0 4px 20px rgba(251,191,36,0.25)">${label}</a>
</td></tr>`;
}

// ─── Secondary CTA (outlined) ──────────────────────────────────
function secondaryCta(label: string, url: string) {
  return `
<tr><td align="center" style="padding:0 32px">
<a href="${url}" style="display:inline-block;padding:14px 38px;background:transparent;border:1.5px solid rgba(251,191,36,0.5);border-radius:14px;font-size:15px;font-weight:600;color:#fbbf24;text-decoration:none">${label}</a>
</td></tr>`;
}

// Links used across templates
const LINK_APP_STORE = 'https://apps.apple.com/gb/app/elec-mate/id6758948665';
const LINK_BOOK_CALL = 'https://elec-mate.com/colleges';
const LINK_TUTOR_SIGNUP = 'https://elec-mate.com/tutors';
const LINK_APPRENTICE_HUB = 'https://elec-mate.com/apprentice';
const LINK_BUSINESS_CALL =
  'mailto:founder@elec-mate.com?subject=Elec-Mate%20for%20{{OrganisationName}}%20%E2%80%94%2015-min%20call%3F';
const LINK_BUSINESS_WEB = 'https://elec-mate.com';

// ═══════════════════════════════════════════════════════════════
// 1. COLLEGE COLD PITCH — primary V1 template
// ═══════════════════════════════════════════════════════════════
const collegeColdPitchV1: OutreachTemplate = {
  slug: 'college-cold-pitch-v1',
  name: 'College — Cold Pitch (V1)',
  category: 'college',
  subject: 'A free tool built for your electrical apprentices',
  preheader:
    'Portfolio, EPA prep, Study Centre and 500+ practice questions — free for tutors, optional trial for your cohort.',
  description:
    'Primary cold email to UK colleges. Dual-path: offers a college-wide trial, free tutor access, or a forward-to-students share. Leads with apprentice outcomes (EPA readiness, portfolio, study centre).',
  thumbnail_emoji: '🎓',
  sort_order: 10,
  merge_tags: ['FirstName', 'OrganisationName', 'Region'],
  html_body:
    emailOpen(
      'Portfolio, EPA prep, Study Centre and 500+ practice questions — free for tutors, optional trial for your cohort.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:32px;font-weight:700;color:#ffffff;line-height:1.1;letter-spacing:-0.5px">Built for your electrical apprentices.</h1>
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:17px;color:#f4f4f5;line-height:1.55">Hi {{FirstName}} &mdash; I'm Andrew, founder of Elec-Mate and a time-served electrician. I built this so apprentices at places like {{OrganisationName}} walk into their EPA genuinely ready.</p>
</td></tr>
<tr><td style="height:20px;line-height:20px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:15px;color:#d4d4d8;line-height:1.6">Three ways we can help &mdash; pick the one that fits.</p>
</td></tr>
` +
    divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">What's inside for apprentices</p>
<p style="margin:0 0 22px;font-size:18px;color:#ffffff;font-weight:700;line-height:1.3">Everything they need for the workshop, the job, and the EPA.</p>
` +
    featureRow(
      '&#x1F4DA;',
      'rgba(251,191,36,0.18)',
      'Portfolio Hub &mdash; KSB-mapped evidence',
      'Photo / video / document evidence mapped to the 18th Edition apprenticeship standard. Auto-tags Knowledge, Skills &amp; Behaviours. Tutors see progress across the whole cohort.'
    ) +
    featureRow(
      '&#x1F3AF;',
      'rgba(34,197,94,0.18)',
      'EPA Readiness &mdash; the best in the UK',
      'Knowledge quiz, AI-scored professional discussion simulator, readiness %, gap analysis. We\'ve yet to meet an apprentice who\'s used it and not passed EPA on first attempt.'
    ) +
    featureRow(
      '&#x1F4D6;',
      'rgba(99,102,241,0.22)',
      'Study Centre &mdash; 36 courses, 500+ practice Qs',
      'Level 2 and Level 3 content, BS 7671, health &amp; safety, MEWP, working at height, goal-setting. Structured into modules &amp; sections with auto-progress tracking.'
    ) +
    featureRow(
      '&#x1F916;',
      'rgba(168,85,247,0.22)',
      'Ask Dave &mdash; AI mentor on BS 7671',
      'An AI that actually knows the regs. Apprentices can ask anything without embarrassment &mdash; "what size SWA for this run?", "why do I need an RCD here?" &mdash; and get site-grade answers in seconds.'
    ) +
    featureRow(
      '&#x1F6E0;',
      'rgba(14,165,233,0.22)',
      'AM2 Simulator &amp; 40+ calculators',
      'Dry-run the AM2 end-assessment. Voltage drop, cable sizing, earth fault loop, Zs, volt-drop, Adiabatic &mdash; every calc they\'ll ever need, with working shown.'
    ) +
    featureRow(
      '&#x1F3E2;',
      'rgba(244,63,94,0.18)',
      'College Hub &mdash; summer 2026',
      'A tutor dashboard we\'re launching this summer. Invite your cohort, monitor portfolios, see KSB coverage at a glance, leave feedback. Designed with tutors, for tutors.'
    ) +
    `
</td></tr>
` +
    divider +
    `
<!-- The three-tier ask -->
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">How you can help &mdash; three options</p>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top:16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px">
<tr><td style="padding:20px 22px">
<p style="margin:0;font-size:16px;color:#ffffff;font-weight:700">1. Forward this to your electrical students</p>
<p style="margin:6px 0 0;font-size:14px;color:#f4f4f5;line-height:1.6">Takes 30 seconds. They download the app, get stuck in. That's it.</p>
</td></tr></table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top:12px;background:rgba(251,191,36,0.06);border:1px solid rgba(251,191,36,0.25);border-radius:14px">
<tr><td style="padding:20px 22px">
<p style="margin:0;font-size:16px;color:#fbbf24;font-weight:700">2. Grab free tutor access &mdash; on us</p>
<p style="margin:6px 0 0;font-size:14px;color:#f4f4f5;line-height:1.6">If you teach electrical apprentices, we'll give you the app free &mdash; no catches, no expiry. See what your students see. Use it in class.</p>
</td></tr></table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top:12px;background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.25);border-radius:14px">
<tr><td style="padding:20px 22px">
<p style="margin:0;font-size:16px;color:#22c55e;font-weight:700">3. Trial Elec-Mate across a cohort</p>
<p style="margin:6px 0 0;font-size:14px;color:#f4f4f5;line-height:1.6">We're picking a handful of UK colleges to trial Elec-Mate with this year. 15-minute call, no commitment. If it helps, we talk next steps.</p>
</td></tr></table>
</td></tr>
` +
    divider +
    `
<!-- Primary CTA -->
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 16px;font-size:15px;color:#f4f4f5;line-height:1.6">The easiest next step &mdash; grab your free tutor account.</p>
</td></tr>
` +
    ctaButton('Get free tutor access', LINK_TUTOR_SIGNUP) +
    `
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
` +
    secondaryCta('Book a 15-min trial chat', LINK_BOOK_CALL) +
    `
<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>

<!-- Stats -->
<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="33%" align="center" valign="top" style="padding:0 8px">
<p style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1">750+</p>
<p style="margin:4px 0 0;font-size:11px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.6px;font-weight:600">Tradespeople</p>
</td>
<td width="33%" align="center" valign="top" style="padding:0 8px">
<p style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1">36</p>
<p style="margin:4px 0 0;font-size:11px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.6px;font-weight:600">Courses</p>
</td>
<td width="34%" align="center" valign="top" style="padding:0 8px">
<p style="margin:0;font-size:26px;font-weight:700;color:#fbbf24;line-height:1">5.0&#9733;</p>
<p style="margin:4px 0 0;font-size:11px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.6px;font-weight:600">App Store</p>
</td>
</tr></table>
</td></tr>
` +
    emailFooter(
      'If any of this resonates, just hit reply &mdash; I read every email. Happy to send a free demo account, answer questions, or set up a Teams call. Whatever works for {{OrganisationName}}.'
    ),
};

// ═══════════════════════════════════════════════════════════════
// 2. TUTOR FREE-ACCESS OFFER — warm after interest shown
// ═══════════════════════════════════════════════════════════════
const tutorFreeAccess: OutreachTemplate = {
  slug: 'tutor-free-access-offer',
  name: 'Tutor — Free Access Offer',
  category: 'tutor',
  subject: 'Your free Elec-Mate tutor account — here\'s how to get in',
  preheader:
    'No card, no expiry. Full app unlocked. Designed to let you see exactly what your apprentices would see.',
  description:
    'For tutors who\'ve replied / registered interest. Clear onboarding path: download app, use this code, you\'re in.',
  thumbnail_emoji: '🎁',
  sort_order: 20,
  merge_tags: ['FirstName', 'OrganisationName'],
  html_body:
    emailOpen(
      'No card, no expiry. Full app unlocked. Designed to let you see exactly what your apprentices would see.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:32px;font-weight:700;color:#ffffff;line-height:1.1;letter-spacing:-0.5px">You're in, {{FirstName}}.</h1>
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:17px;color:#f4f4f5;line-height:1.55">Full tutor access to Elec-Mate. No card. No expiry. Nothing to tick.</p>
</td></tr>
` +
    divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">30-second setup</p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top:14px">
<tr><td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.08)">
<p style="margin:0;font-size:15px;color:#ffffff;font-weight:700">1. Download the app</p>
<p style="margin:4px 0 0;font-size:14px;color:#f4f4f5;line-height:1.5">Search "Elec-Mate" on the App Store, or tap the badge below.</p>
</td></tr>
<tr><td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.08)">
<p style="margin:0;font-size:15px;color:#ffffff;font-weight:700">2. Sign up with your college email</p>
<p style="margin:4px 0 0;font-size:14px;color:#f4f4f5;line-height:1.5">Use an @{{OrganisationName}} email and you're auto-verified as a tutor.</p>
</td></tr>
<tr><td style="padding:14px 0">
<p style="margin:0;font-size:15px;color:#ffffff;font-weight:700">3. Poke around</p>
<p style="margin:4px 0 0;font-size:14px;color:#f4f4f5;line-height:1.5">Try the Portfolio Hub, the EPA simulator, ask Dave a regs question. Anything you'd want your apprentices to try &mdash; try it yourself first.</p>
</td></tr></table>
</td></tr>
` +
    divider +
    `
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 20px;font-size:15px;color:#f4f4f5;line-height:1.6">Grab it now &mdash; takes 30 seconds.</p>
</td></tr>
` +
    ctaButton('Download Elec-Mate', LINK_APP_STORE) +
    `
<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>

<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:rgba(251,191,36,0.06);border:1px solid rgba(251,191,36,0.25);border-radius:14px">
<tr><td style="padding:20px 22px">
<p style="margin:0;font-size:14px;color:#fbbf24;font-weight:700;text-transform:uppercase;letter-spacing:1px">While you're in</p>
<p style="margin:10px 0 0;font-size:15px;color:#f4f4f5;line-height:1.6">If you like what you see, we'd love to talk about bringing Elec-Mate into your apprenticeship delivery properly &mdash; cohort licences, custom KSB reports, the College Hub launching this summer.</p>
<p style="margin:12px 0 0;font-size:15px;color:#f4f4f5;line-height:1.6">No pressure. Just reply to this email and we'll book a 15-minute call.</p>
</td></tr></table>
</td></tr>
` +
    emailFooter(
      'Anything you want to change, any feature missing, anything broken &mdash; hit reply. Tutors who&#x27;ve helped us shape the product have had roads paved for them. Apprentices at {{OrganisationName}} benefit directly.'
    ),
};

// ═══════════════════════════════════════════════════════════════
// 3. APPRENTICE FEATURES SPOTLIGHT — for cohort announcements
// ═══════════════════════════════════════════════════════════════
const apprenticeFeatures: OutreachTemplate = {
  slug: 'apprentice-features-spotlight',
  name: 'Apprentice — Features Spotlight',
  category: 'apprentice',
  subject: 'Your free app for passing your electrical apprenticeship',
  preheader:
    'Portfolio, EPA practice, study courses, 40+ calculators, AI mentor — built for UK electrical apprentices.',
  description:
    'Direct to apprentices (via college forward, or cohort list). Apprentice-voice: blunt, practical, no corporate fluff.',
  thumbnail_emoji: '⚡',
  sort_order: 30,
  merge_tags: ['FirstName'],
  html_body:
    emailOpen(
      'Portfolio, EPA practice, study courses, 40+ calculators, AI mentor — built for UK electrical apprentices.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:32px;font-weight:700;color:#ffffff;line-height:1.1;letter-spacing:-0.5px">Pass your apprenticeship. Free app.</h1>
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:17px;color:#f4f4f5;line-height:1.55">Hey {{FirstName}} &mdash; I built this app because I was an apprentice once and I needed it. Every feature exists because something on site was broken.</p>
</td></tr>
` +
    divider +
    `
<tr><td style="padding:0 32px">
` +
    featureRow(
      '&#x1F4DA;',
      'rgba(251,191,36,0.18)',
      'A portfolio that doesn\'t suck',
      'Photo, video, voice notes &mdash; all mapped to the exact KSBs your EPA needs. No more scrambling the week before.'
    ) +
    featureRow(
      '&#x1F3AF;',
      'rgba(34,197,94,0.18)',
      'EPA practice that\'s actually brutal',
      'AI-scored professional discussion simulator. Asks you the questions your EPA panel will ask. Tells you where you\'re weak before they find out.'
    ) +
    featureRow(
      '&#x1F4D6;',
      'rgba(99,102,241,0.22)',
      '500+ practice questions, 36 courses',
      'BS 7671, H&amp;S, working at height, MEWP, electrical theory. Chunked into modules you can actually finish.'
    ) +
    featureRow(
      '&#x1F916;',
      'rgba(168,85,247,0.22)',
      'Ask Dave — AI regs mentor',
      'That thing you\'re too embarrassed to ask your JIB? Ask Dave. Never judges. Knows BS 7671 cold.'
    ) +
    featureRow(
      '&#x1F6E0;',
      'rgba(14,165,233,0.22)',
      'AM2 simulator + 40+ calcs',
      'Dry-run the end assessment. Cable sizing, Zs, voltage drop &mdash; all the calcs with working shown, so you actually understand.'
    ) +
    `
</td></tr>
` +
    divider +
    `
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 8px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">FREE for apprentices</p>
<p style="margin:0 0 22px;font-size:24px;color:#ffffff;font-weight:700;line-height:1.3">Download. Sign up. That's it.</p>
</td></tr>
` +
    ctaButton('Get Elec-Mate &mdash; free', LINK_APP_STORE) +
    `
<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>

<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px">
<tr><td style="padding:18px 22px">
<p style="margin:0 0 8px;font-size:14px;color:#fbbf24;letter-spacing:2px">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
<p style="margin:0;font-size:15px;color:#ffffff;line-height:1.55;font-style:italic">&ldquo;Used this daily through my last year. EPA practice alone was worth it. Got a distinction.&rdquo;</p>
<p style="margin:10px 0 0;font-size:13px;color:#d4d4d8">&mdash; Electrical apprentice, level 3</p>
</td></tr></table>
</td></tr>
` +
    emailFooter(
      'Any feature you want added, any bug, anything missing &mdash; just hit reply. I&#x27;m the founder and I read every email.'
    ),
};

// ═══════════════════════════════════════════════════════════════
// 4. COLLEGE 7-DAY FOLLOW-UP — short, punchy
// ═══════════════════════════════════════════════════════════════
const collegeFollowUp: OutreachTemplate = {
  slug: 'college-followup-7-day',
  name: 'College — 7-day Follow-up',
  category: 'follow_up',
  subject: 'Quick nudge — free Elec-Mate for {{OrganisationName}}?',
  preheader:
    'One more shot at this. Free tutor access, no commitment. Takes 30 seconds.',
  description:
    'Short follow-up to non-openers / non-responders after 7 days. One screen, one ask.',
  thumbnail_emoji: '🔁',
  sort_order: 40,
  merge_tags: ['FirstName', 'OrganisationName'],
  html_body:
    emailOpen(
      'One more shot at this. Free tutor access, no commitment. Takes 30 seconds.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;line-height:1.15;letter-spacing:-0.5px">Don't want to clog your inbox.</h1>
</td></tr>
<tr><td style="height:12px;line-height:12px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:16px;color:#f4f4f5;line-height:1.6">Hi {{FirstName}} &mdash; just making sure this didn't get buried.</p>
</td></tr>
<tr><td style="height:20px;line-height:20px;font-size:0">&nbsp;</td></tr>

<tr><td style="padding:0 32px">
<p style="margin:0;font-size:15px;color:#f4f4f5;line-height:1.7">If you teach electrical apprentices at {{OrganisationName}}, I'd love to give you <strong style="color:#fbbf24">free access to Elec-Mate</strong> &mdash; the app most UK apprentices are already using for portfolio, EPA prep, regs and 500+ practice questions.</p>
<p style="margin:18px 0 0;font-size:15px;color:#f4f4f5;line-height:1.7">No card, no expiry. Download, sign up with your college email, you're in.</p>
</td></tr>

<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>
` +
    ctaButton('Grab free tutor access', LINK_TUTOR_SIGNUP) +
    `
<tr><td style="height:20px;line-height:20px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:14px;color:#d4d4d8;line-height:1.6">Or if you'd rather just forward to your students &mdash; <a href="${LINK_APP_STORE}" style="color:#fbbf24">here's the App Store link</a>.</p>
</td></tr>
` +
    emailFooter(
      'If it\'s not for you, no worries &mdash; hit reply with "not interested" and I&#x27;ll never email again. I respect your time.'
    ),
};

// ═══════════════════════════════════════════════════════════════
// 5. EMPLOYER APPRENTICE NUDGE — for contractors hiring apprentices
// ═══════════════════════════════════════════════════════════════
const employerApprenticeNudge: OutreachTemplate = {
  slug: 'employer-apprentice-nudge',
  name: 'Employer — Apprentice Nudge',
  category: 'employer',
  subject: 'Make your apprentice\'s life easier (and yours)',
  preheader:
    'Portfolio, OJT hours, site diary, safety briefings — all in their pocket. Your apprentice, your evidence trail.',
  description:
    'For electrical contractors / employers who hire apprentices. Framed around reducing employer admin burden + apprentice retention.',
  thumbnail_emoji: '🔌',
  sort_order: 50,
  merge_tags: ['FirstName', 'OrganisationName'],
  html_body:
    emailOpen(
      'Portfolio, OJT hours, site diary, safety briefings — all in their pocket. Your apprentice, your evidence trail.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:30px;font-weight:700;color:#ffffff;line-height:1.1;letter-spacing:-0.5px">Your apprentice. Fully evidenced.</h1>
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:17px;color:#f4f4f5;line-height:1.55">Hi {{FirstName}} &mdash; Andrew here, founder of Elec-Mate. Quick one, relevant to any apprentices at {{OrganisationName}}.</p>
</td></tr>
` +
    divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">What Elec-Mate does for your apprentice</p>
` +
    featureRow(
      '&#x1F4DA;',
      'rgba(251,191,36,0.18)',
      'Portfolio Hub &mdash; KSB-mapped evidence',
      'Your apprentice photographs the work, the app maps it to the apprenticeship standard. You get a real-time view of their evidence trail. College/assessor happy, you\'re not chasing paperwork.'
    ) +
    featureRow(
      '&#x1F552;',
      'rgba(34,197,94,0.18)',
      'OJT hours logged automatically',
      'GPS-aware site diary. Hours logged as they work. Exportable report whenever the college asks.'
    ) +
    featureRow(
      '&#x1F6BE;',
      'rgba(244,63,94,0.18)',
      'Site safety &amp; toolbox briefings',
      'Daily toolbox talks, RAMS, permits &mdash; your apprentice reads, acknowledges, it\'s timestamped. Audit-ready.'
    ) +
    featureRow(
      '&#x1F3AF;',
      'rgba(14,165,233,0.22)',
      'EPA readiness',
      'Your apprentice walks into EPA ready. Better first-time pass rates = you keep your trained electrician, not another 3-month delay.'
    ) +
    `
</td></tr>
` +
    divider +
    `
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">Free for your apprentice</p>
<p style="margin:0 0 22px;font-size:22px;color:#ffffff;font-weight:700;line-height:1.3">If you\'re the main employer, you get a viewer seat free too.</p>
</td></tr>
` +
    ctaButton('Set it up &mdash; 2 minutes', LINK_BOOK_CALL) +
    `
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
` +
    secondaryCta('Just download the app', LINK_APP_STORE) +
    `
<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>
` +
    emailFooter(
      'You\'ve probably got a stack of bigger problems than this email. But if you\'re running an apprenticeship at {{OrganisationName}}, this saves you real admin time &mdash; and makes a better electrician.'
    ),
};

// ═══════════════════════════════════════════════════════════════
// 6. BUSINESS COLD PITCH V1 — for big UK electrical contractors, principal
// contractors, facilities management, utilities, defence, nuclear.
// Aimed at decision-makers (M&E managers, heads of electrical services,
// procurement). Pitch: one app for your site teams — compliance, certs,
// RAMS, multi-engineer collaboration.
// ═══════════════════════════════════════════════════════════════
const businessColdPitchV1: OutreachTemplate = {
  slug: 'business-cold-pitch-v1',
  name: 'Business — UK Electrical Cold Pitch (V1)',
  category: 'business',
  subject: 'Elec-Mate for {{OrganisationName}} — your site teams, one app',
  preheader:
    'Certs, RAMS, invoicing, Room Planner, compliance audit trail — built for UK electrical firms. 750+ tradespeople use it daily.',
  description:
    'Cold email to big UK electrical firms, principal contractors, FM, utilities, nuclear, defence. Leads with site-team value (compliance + collaboration + certs) and ends with a 15-min founder call CTA.',
  thumbnail_emoji: '🏗️',
  sort_order: 60,
  merge_tags: ['FirstName', 'OrganisationName', 'Role'],
  html_body:
    emailOpen(
      'Certs, RAMS, invoicing, Room Planner, compliance audit trail — built for UK electrical firms. 750+ tradespeople use it daily.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:32px;font-weight:700;color:#ffffff;line-height:1.1;letter-spacing:-0.5px">One app for every electrician on site.</h1>
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:17px;color:#f4f4f5;line-height:1.55">Hi {{FirstName}} &mdash; I'm Andrew, founder of Elec-Mate and a time-served electrician. I built this so teams at firms like {{OrganisationName}} have one tool that covers every certificate, RAMS, and compliance record from site to office.</p>
</td></tr>
<tr><td style="height:20px;line-height:20px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:15px;color:#d4d4d8;line-height:1.6">Two-minute read. No fluff. Here's what you actually get.</p>
</td></tr>
` +
    divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">Built for UK electrical firms</p>
<p style="margin:0 0 22px;font-size:18px;color:#ffffff;font-weight:700;line-height:1.3">What your site teams use it for every day.</p>
` +
    featureRow(
      '&#x26A1;',
      'rgba(251,191,36,0.18)',
      '16 certificates &mdash; BS 7671 A4:2026 ready',
      'EICR, EIC, Minor Works, Testing Only, Fire Alarm (design / install / commission / modify / inspect), Smoke &amp; CO, Solar PV, EV Charging, Lightning Protection, BESS, G98, G99, Emergency Lighting, PAT. Rebuilt for mobile &mdash; smart cascading forms, Schedule of Tests that works on site, auto-filled from previous certs.'
    ) +
    featureRow(
      '&#x1F9BA;',
      'rgba(244,63,94,0.18)',
      'RAMS, permits, and site safety',
      'AI-generated RAMS tailored to the task. Toolbox briefings with photo evidence. Danger Notices, Limitation Notices, Permits-to-Work. Every record time-stamped and auditable.'
    ) +
    featureRow(
      '&#x1F465;',
      'rgba(99,102,241,0.22)',
      'Multi-engineer collaboration',
      'Whole crew works the same job in real time. Assign circuits, sign off tests, share photos, track progress. Office sees live status. No more WhatsApp chaos or lost paperwork.'
    ) +
    featureRow(
      '&#x1F4D1;',
      'rgba(34,197,94,0.18)',
      'Compliance audit trail',
      'Every test, every sign-off, every photo, every RAMS &mdash; timestamped, user-stamped, exportable. When the audit comes, you hit one button and have the file.'
    ) +
    featureRow(
      '&#x1F4D0;',
      'rgba(168,85,247,0.22)',
      'Room Planner &amp; quoting',
      'Draw the room, drop accessories, cables route themselves. Feeds straight into quotes with live UK trade prices. Quote-to-invoice flow with chase emails and late-payment interest built in.'
    ) +
    featureRow(
      '&#x1F4F1;',
      'rgba(14,165,233,0.22)',
      'iOS, Android, web &mdash; App Store approved',
      'Native apps on iPhone, iPad, Android. Web for the office. Works offline on site, syncs when back in signal. Approved by Apple (v1.0.3 live, 5.0&#9733; reviews).'
    ) +
    `
</td></tr>
` +
    divider +
    `
<!-- Why it matters for your firm -->
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">What this actually solves</p>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top:16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px">
<tr><td style="padding:22px 22px">
<p style="margin:0 0 14px;font-size:15px;color:#ffffff;line-height:1.6"><strong style="color:#fbbf24">Paperwork leaks.</strong> Engineers scribble certs on carbon copies that get lost. Elec-Mate &mdash; every cert digital, signed, timestamped, emailed to the client.</p>
<p style="margin:0 0 14px;font-size:15px;color:#ffffff;line-height:1.6"><strong style="color:#fbbf24">Compliance gaps.</strong> You don't know who did what, when. Elec-Mate &mdash; every action user-stamped. One-click audit export.</p>
<p style="margin:0 0 14px;font-size:15px;color:#ffffff;line-height:1.6"><strong style="color:#fbbf24">Duplicate work.</strong> RAMS rewritten from scratch every job. Elec-Mate &mdash; AI drafts them in 60s from the scope.</p>
<p style="margin:0;font-size:15px;color:#ffffff;line-height:1.6"><strong style="color:#fbbf24">Team visibility.</strong> Foreman can't see what the crew's done. Elec-Mate &mdash; live job status, circuits signed off, photos in real time.</p>
</td></tr></table>
</td></tr>
` +
    divider +
    `
<!-- Stats -->
<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="33%" align="center" valign="top" style="padding:0 8px">
<p style="margin:0;font-size:28px;font-weight:700;color:#ffffff;line-height:1">750+</p>
<p style="margin:4px 0 0;font-size:11px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.6px;font-weight:600">UK tradespeople</p>
</td>
<td width="33%" align="center" valign="top" style="padding:0 8px">
<p style="margin:0;font-size:28px;font-weight:700;color:#ffffff;line-height:1">16</p>
<p style="margin:4px 0 0;font-size:11px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.6px;font-weight:600">Certificates</p>
</td>
<td width="34%" align="center" valign="top" style="padding:0 8px">
<p style="margin:0;font-size:28px;font-weight:700;color:#fbbf24;line-height:1">5.0&#9733;</p>
<p style="margin:4px 0 0;font-size:11px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.6px;font-weight:600">App Store</p>
</td>
</tr></table>
</td></tr>
` +
    divider +
    `
<!-- The ask -->
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 10px;font-size:11px;color:#d4d4d8;text-transform:uppercase;letter-spacing:1.8px;font-weight:700">The ask</p>
<p style="margin:0;font-size:24px;font-weight:700;color:#ffffff;line-height:1.25;letter-spacing:-0.5px">15 minutes on a call &mdash; that's it.</p>
<p style="margin:14px 0 0;font-size:15px;color:#f4f4f5;line-height:1.6">I'll show you the app on a shared screen, answer your compliance questions, and if it fits we talk about rolling it out to your team. Enterprise pricing, volume licences, SSO &mdash; all on the table.</p>
</td></tr>
<tr><td style="height:24px;line-height:24px;font-size:0">&nbsp;</td></tr>
` +
    ctaButton('Book a 15-min call with Andrew', LINK_BUSINESS_CALL) +
    `
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
` +
    secondaryCta('See the app on the App Store', LINK_APP_STORE) +
    `
<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>
` +
    emailFooter(
      'I know cold emails are a pain. If Elec-Mate isn\'t right for {{OrganisationName}} right now, just reply "not now" and I\'ll leave you alone. But if you\'ve got even one engineer still writing certs on paper, this is worth 15 minutes of your time.'
    ),
};

// ═══════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════
// 7. COLLEGE HEADS / CURRICULUM MANAGERS — decision-maker pitch
// ═══════════════════════════════════════════════════════════════
const collegeHeadsV2: OutreachTemplate = {
  slug: 'college-heads-trial-v2',
  name: 'College Heads — Cohort Trial V2',
  category: 'college',
  subject: 'Apprentices walk into EPA ready — {{OrganisationName}}?',
  preheader:
    'Portfolio, EPA simulator, Study Centre — built for UK electrical apprentices. Free trial for a cohort at your college.',
  description:
    'For Heads of Electrical / Curriculum Managers / Deputy Deans. Decision-maker pitch for a paid cohort trial + College Hub summer launch teaser.',
  thumbnail_emoji: '🎓',
  sort_order: 15,
  merge_tags: ['FirstName', 'OrganisationName', 'Region'],
  html_body:
    emailOpen(
      'Portfolio, EPA simulator, Study Centre — built for UK electrical apprentices. Free trial for a cohort at your college.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:32px;font-weight:700;color:#ffffff;line-height:1.1;letter-spacing:-0.5px">Apprentices who pass EPA first time.</h1>
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:17px;color:#f4f4f5;line-height:1.55">Hi {{FirstName}} &mdash; I'm Andrew, founder of Elec-Mate and a time-served electrician. Short email, specific ask.</p>
</td></tr>
` +
    divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 14px;font-size:15px;color:#f4f4f5;line-height:1.7">We built Elec-Mate because apprentices at UK colleges keep arriving at EPA under-prepared &mdash; portfolio scrappy, confidence low, first-time pass rates patchy.</p>
<p style="margin:0 0 14px;font-size:15px;color:#f4f4f5;line-height:1.7">We&#x27;re looking for <strong style="color:#fbbf24">a handful of UK colleges to trial it this academic year</strong>. You get the whole app for your cohort, we get real feedback, everyone wins.</p>
</td></tr>
` +
    divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">What your apprentices get</p>
` +
    featureRow(
      '&#x1F4DA;',
      'rgba(251,191,36,0.18)',
      'Portfolio Hub &mdash; KSB-mapped evidence',
      'Photo / video / voice notes auto-mapped to the 18th Edition apprenticeship standard. You see every apprentice\'s progress at a glance.'
    ) +
    featureRow(
      '&#x1F3AF;',
      'rgba(34,197,94,0.18)',
      'EPA Simulator &mdash; best in the UK',
      'AI-scored professional discussion. Asks the questions EPA will ask. Tells apprentices where they&#x27;re weak before the assessor does.'
    ) +
    featureRow(
      '&#x1F4D6;',
      'rgba(99,102,241,0.22)',
      'Study Centre &mdash; 36 courses, 500+ practice Qs',
      'Level 2, Level 3, BS 7671, H&S, MEWP, working at height. Cohort progress tracked. Tutor dashboard coming summer 2026.'
    ) +
    `
</td></tr>
` +
    divider +
    `
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 16px;font-size:15px;color:#f4f4f5;line-height:1.6">Free 15-min Teams call. No slide deck. Just showing you the app and seeing if it fits.</p>
</td></tr>
` +
    ctaButton('Book a 15-min chat', LINK_BOOK_CALL) +
    `
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
` +
    secondaryCta('Or grab free tutor access first', LINK_TUTOR_SIGNUP) +
    `
<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>
` +
    emailFooter(
      'Whatever fits {{OrganisationName}} &mdash; happy with a trial, happy with tutor access, happy with a reply that says "not for us". I respect your time.'
    ),
};

// ═══════════════════════════════════════════════════════════════
// 8. ELECTRICAL TUTORS / LECTURERS — free access pitch
// ═══════════════════════════════════════════════════════════════
const electricalTutorsV2: OutreachTemplate = {
  slug: 'electrical-tutors-v2',
  name: 'Electrical Tutors — Free Access V2',
  category: 'tutor',
  subject: 'Free Elec-Mate for you — your students will love it',
  preheader:
    'No card, no expiry. Download, log in with your college email, in 30 seconds you have the whole app. Forward to your class.',
  description:
    'For electrical lecturers, tutors, instructors. Soft ask: get free tutor access, see what apprentices see, forward to students if useful.',
  thumbnail_emoji: '👨‍🏫',
  sort_order: 16,
  merge_tags: ['FirstName', 'OrganisationName'],
  html_body:
    emailOpen(
      'No card, no expiry. Download, log in with your college email, in 30 seconds you have the whole app. Forward to your class.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:32px;font-weight:700;color:#ffffff;line-height:1.1;letter-spacing:-0.5px">Free for you, {{FirstName}}.</h1>
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:17px;color:#f4f4f5;line-height:1.55">A proper tutor account on Elec-Mate. No card. No expiry. The lot unlocked.</p>
</td></tr>
` +
    divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 14px;font-size:15px;color:#f4f4f5;line-height:1.7">Hi {{FirstName}} &mdash; quick one. I&#x27;m a time-served electrician, I built the app I wish I had as an apprentice.</p>
<p style="margin:0 0 14px;font-size:15px;color:#f4f4f5;line-height:1.7">If you teach electrical apprentices at {{OrganisationName}}, I&#x27;d love to give you full access. Use it to double-check regs in class, set practice questions, watch how your students would use it.</p>
<p style="margin:0 0 14px;font-size:15px;color:#f4f4f5;line-height:1.7">If it&#x27;s useful, tell your students. If it&#x27;s not, delete this and carry on.</p>
</td></tr>
` +
    divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">What&#x27;s in it</p>
` +
    featureRow(
      '&#x1F4DA;',
      'rgba(251,191,36,0.18)',
      'Portfolio Hub',
      'KSB-mapped apprentice evidence. Your apprentices photograph the work, app tags it to the standard.'
    ) +
    featureRow(
      '&#x1F3AF;',
      'rgba(34,197,94,0.18)',
      'EPA Simulator',
      'AI-scored professional discussion. Your apprentices rehearse against the exact questions EPA asks.'
    ) +
    featureRow(
      '&#x1F916;',
      'rgba(168,85,247,0.22)',
      'Ask Dave &mdash; AI regs mentor',
      'BS 7671 Q&amp;A. Your students can ask anything without embarrassment.'
    ) +
    featureRow(
      '&#x1F6E0;',
      'rgba(14,165,233,0.22)',
      'AM2 sim + 40 calculators',
      'Voltage drop, cable sizing, Zs, Adiabatic &mdash; all with working shown so they actually understand.'
    ) +
    `
</td></tr>
` +
    divider +
    `
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 20px;font-size:15px;color:#f4f4f5;line-height:1.6">30 seconds to get in.</p>
</td></tr>
` +
    ctaButton('Grab free tutor access', LINK_TUTOR_SIGNUP) +
    `
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
` +
    secondaryCta('Or download the app', LINK_APP_STORE) +
    `
<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>
` +
    emailFooter(
      'Any feature missing, any bug, any idea &mdash; hit reply. Tutors who&#x27;ve shaped Elec-Mate had their apprentices benefit first.'
    ),
};

// ═══════════════════════════════════════════════════════════════
// 9. ASSESSORS / IQA / EPA — audit-proof evidence pitch
// ═══════════════════════════════════════════════════════════════
const assessorsIQAv1: OutreachTemplate = {
  slug: 'assessors-iqa-epa-v1',
  name: 'Assessors / IQA / EPA — Evidence Trail V1',
  category: 'general',
  subject: 'Audit-proof portfolio evidence for electrical apprentices',
  preheader:
    'Photo + KSB-tagged evidence, timestamped, exportable. The paperwork job your apprentices can actually do.',
  description:
    'For Internal Quality Assurers, EPA assessors, and independent end-point assessors. Pitch: portfolio tool simplifies sign-off.',
  thumbnail_emoji: '🛡️',
  sort_order: 17,
  merge_tags: ['FirstName', 'OrganisationName'],
  html_body:
    emailOpen(
      'Photo + KSB-tagged evidence, timestamped, exportable. The paperwork job your apprentices can actually do.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:30px;font-weight:700;color:#ffffff;line-height:1.1;letter-spacing:-0.5px">Less chasing. Better evidence.</h1>
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:17px;color:#f4f4f5;line-height:1.55">Hi {{FirstName}} &mdash; Andrew here, founder of Elec-Mate and time-served electrician. Quick and relevant to your job.</p>
</td></tr>
` +
    divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 14px;font-size:15px;color:#f4f4f5;line-height:1.7">If you&#x27;re assessing or quality-assuring electrical apprentices at {{OrganisationName}}, you know the problem: evidence arrives patchy, out of order, some of it undated, and KSB mapping is done retrospectively in a panic.</p>
<p style="margin:0 0 14px;font-size:15px;color:#f4f4f5;line-height:1.7">Elec-Mate captures evidence the moment the work happens &mdash; and auto-tags it to the 18th Edition standard. Your apprentices just do their job and photograph it. The app does the mapping.</p>
</td></tr>
` +
    divider +
    `
<tr><td style="padding:0 32px">
` +
    featureRow(
      '&#x1F4F8;',
      'rgba(251,191,36,0.18)',
      'Evidence captured on site',
      'Photo, video, voice note &mdash; timestamped, GPS-tagged if on site. No retrospective Word doc scramble.'
    ) +
    featureRow(
      '&#x1F5FA;',
      'rgba(34,197,94,0.18)',
      'KSB mapping auto-suggested',
      'Every entry suggests the relevant Knowledge / Skill / Behaviour codes. Apprentice confirms, done.'
    ) +
    featureRow(
      '&#x1F4CA;',
      'rgba(99,102,241,0.22)',
      'IQA dashboard &mdash; coverage at a glance',
      'See each apprentice\'s KSB coverage as a heat-map. Spot gaps before the EPA panel does.'
    ) +
    featureRow(
      '&#x1F3AF;',
      'rgba(168,85,247,0.22)',
      'EPA readiness score',
      'AI-scored professional discussion practice. Knowledge quiz gap analysis. Pass-first-time is the goal.'
    ) +
    featureRow(
      '&#x1F4E6;',
      'rgba(14,165,233,0.22)',
      'One-click export for audit',
      'Full evidence trail as PDF or CSV. Handy when Ofsted / ESFA show up.'
    ) +
    `
</td></tr>
` +
    divider +
    `
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 20px;font-size:15px;color:#f4f4f5;line-height:1.6">15-min demo. I&#x27;ll walk you through the IQA view.</p>
</td></tr>
` +
    ctaButton('Book a 15-min demo', LINK_BOOK_CALL) +
    `
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
` +
    secondaryCta('Or grab free access first', LINK_TUTOR_SIGNUP) +
    `
<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>
` +
    emailFooter(
      'If you&#x27;re the IQA or EPA assessor for electrical at {{OrganisationName}}, this tool saves real hours. Reply with any questions &mdash; I reply fast.'
    ),
};

// ═══════════════════════════════════════════════════════════════
// 10. TRAINING PROVIDERS — partnership / licence pitch
// ═══════════════════════════════════════════════════════════════
const trainingProvidersV1: OutreachTemplate = {
  slug: 'training-providers-partnership-v1',
  name: 'Training Providers — Partnership V1',
  category: 'general',
  subject: 'Elec-Mate for {{OrganisationName}} apprentices — partnership?',
  preheader:
    'We power the portfolio + EPA prep for individual apprentices. Cohort licences + co-brand available for UK electrical training providers.',
  description:
    'For founders / directors at JTL-style UK electrical training providers. Pitch: partnership licence / white-label / cohort volume discount.',
  thumbnail_emoji: '🏭',
  sort_order: 18,
  merge_tags: ['FirstName', 'OrganisationName'],
  html_body:
    emailOpen(
      'We power the portfolio + EPA prep for individual apprentices. Cohort licences + co-brand available for UK electrical training providers.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:30px;font-weight:700;color:#ffffff;line-height:1.1;letter-spacing:-0.5px">{{OrganisationName}} apprentices + Elec-Mate.</h1>
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:17px;color:#f4f4f5;line-height:1.55">Hi {{FirstName}} &mdash; Andrew, founder of Elec-Mate. Partnership proposal, one paragraph.</p>
</td></tr>
` +
    divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 14px;font-size:15px;color:#f4f4f5;line-height:1.7">Elec-Mate is the UK&#x27;s first all-in-one app for electrical apprentices &mdash; Portfolio Hub (KSB-mapped), EPA Simulator (AI-scored professional discussion), Study Centre (36 courses, 500+ practice Qs), Ask Dave (AI regs mentor).</p>
<p style="margin:0 0 14px;font-size:15px;color:#f4f4f5;line-height:1.7">Today we sell to individual apprentices at &pound;5.99/mo. We want to offer <strong style="color:#fbbf24">{{OrganisationName}} apprentices a cohort licence</strong> &mdash; volume pricing, your branding if useful, admin dashboard for your team to track portfolio + EPA progress across every learner.</p>
<p style="margin:0 0 14px;font-size:15px;color:#f4f4f5;line-height:1.7">Your apprentices walk into EPA more prepared. Your first-time pass rate climbs. Your Ofsted evidence trail is audit-proof.</p>
</td></tr>
` +
    divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">What the partnership could look like</p>
` +
    featureRow(
      '&#x1F4BC;',
      'rgba(251,191,36,0.18)',
      'Cohort licence',
      'Bulk pricing per learner per year. Your apprentices get the full app.'
    ) +
    featureRow(
      '&#x1F3A8;',
      'rgba(34,197,94,0.18)',
      'Co-brand / white-label',
      'Your logo on splash, your colour accent. Or keep it as Elec-Mate &mdash; your call.'
    ) +
    featureRow(
      '&#x1F4CA;',
      'rgba(99,102,241,0.22)',
      'Admin dashboard',
      'Your training managers see every learner&#x27;s portfolio coverage, EPA readiness and study progress in one view.'
    ) +
    featureRow(
      '&#x1F91D;',
      'rgba(168,85,247,0.22)',
      'Co-marketing',
      'Joint content + case study on how {{OrganisationName}} uses Elec-Mate to lift pass rates.'
    ) +
    `
</td></tr>
` +
    divider +
    `
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 20px;font-size:15px;color:#f4f4f5;line-height:1.6">15-min call. No slides. Just the numbers and how we&#x27;d structure it.</p>
</td></tr>
` +
    ctaButton('Book partnership call', LINK_BOOK_CALL) +
    `
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
` +
    secondaryCta('Or try the app first', LINK_APP_STORE) +
    `
<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>
` +
    emailFooter(
      'Not every training provider wants tech in the mix &mdash; no worries if {{OrganisationName}} isn&#x27;t the right fit. Hit reply either way, I read every email.'
    ),
};

// ═══════════════════════════════════════════════════════════════
// BUSINESS COLD-INTRO SUITE (8 templates) — "who we are / what we do"
// ═══════════════════════════════════════════════════════════════
// Design principle: each template is a COLD INTRO, not a pitch. First
// contact positions Elec-Mate, establishes Andrew's credibility
// (time-served electrician, founder), lists what the app does, with a
// soft "have a look" / "reply if relevant" CTA — not a hard "book a call".
// Follow-up templates (future) will do the pitch work.

// Shared "who we are" block reused across all 8 templates. One-line change
// here ripples through the whole suite.
const whoWeAreBlock = `
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">Who we are</p>
<p style="margin:0 0 14px;font-size:15px;color:#f4f4f5;line-height:1.7">Elec-Mate is the UK&apos;s first all-in-one app built for electricians &mdash; by electricians. Founded by Andrew Moore, a time-served sparky who got sick of juggling 9 different apps on site.</p>
<p style="margin:0 0 14px;font-size:15px;color:#f4f4f5;line-height:1.7">One app for every certificate (BS 7671 A4:2026 ready), RAMS &amp; site safety, quotes, invoices, Room Planner, Price Book, multi-engineer collab, and a whole Study Centre for apprentices. 750+ UK tradespeople on it, 5.0&#9733; App Store rated, &pound;12.99/mo.</p>
</td></tr>`;

const statsBlock = `
<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="25%" align="center" valign="top" style="padding:0 6px">
<p style="margin:0;font-size:24px;font-weight:700;color:#ffffff;line-height:1">750+</p>
<p style="margin:4px 0 0;font-size:10px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.6px;font-weight:600">Tradespeople</p>
</td>
<td width="25%" align="center" valign="top" style="padding:0 6px">
<p style="margin:0;font-size:24px;font-weight:700;color:#ffffff;line-height:1">16</p>
<p style="margin:4px 0 0;font-size:10px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.6px;font-weight:600">Certificates</p>
</td>
<td width="25%" align="center" valign="top" style="padding:0 6px">
<p style="margin:0;font-size:24px;font-weight:700;color:#ffffff;line-height:1">&pound;12.99</p>
<p style="margin:4px 0 0;font-size:10px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.6px;font-weight:600">/mo Stripe</p>
</td>
<td width="25%" align="center" valign="top" style="padding:0 6px">
<p style="margin:0;font-size:24px;font-weight:700;color:#fbbf24;line-height:1">5.0&#9733;</p>
<p style="margin:4px 0 0;font-size:10px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.6px;font-weight:600">App Store</p>
</td>
</tr></table>
</td></tr>`;

// Soft-CTA helper: "See the app" primary, "reply if relevant" secondary
function softCta(appLabel = 'Have a look on the App Store') {
  return ctaButton(appLabel, LINK_APP_STORE) +
    `<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>` +
    secondaryCta('Or reply — quick question welcome', LINK_BUSINESS_CALL) +
    `<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>`;
}

// ───────────── 1. Directors / Owners ─────────────
const businessIntroDirectors: OutreachTemplate = {
  slug: 'business-intro-directors-v1',
  name: 'Business Intro — Directors / Owners',
  category: 'business',
  subject: 'Quick intro — a UK app built for electrical firms',
  preheader:
    'Founder intro, one read. 16 certs, quotes, invoicing, Room Planner, Price Book — the tools your sparks already needed.',
  description:
    'Cold first-touch for Directors / Owners / MDs of UK electrical firms. Founder-to-founder positioning. No hard sell — just "here we are, have a look".',
  thumbnail_emoji: '🏢',
  sort_order: 100,
  merge_tags: ['FirstName', 'OrganisationName'],
  html_body:
    emailOpen(
      'Founder intro, one read. 16 certs, quotes, invoicing, Room Planner, Price Book — the tools your sparks already needed.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:30px;font-weight:700;color:#ffffff;line-height:1.15;letter-spacing:-0.5px">Quick intro, {{FirstName}}.</h1>
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:16px;color:#f4f4f5;line-height:1.6">Founder of Elec-Mate here &mdash; figured I&apos;d drop a one-pager on what we do, in case it&apos;s useful for {{OrganisationName}}.</p>
</td></tr>
` + divider + whoWeAreBlock + divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">What your crew gets</p>
` +
    featureRow('&#x26A1;', 'rgba(251,191,36,0.18)', '16 certificates, mobile-first',
      'EICR, EIC, Minor Works, Fire Alarm (all 5 types), Solar PV, EV Charging, BESS, G98/G99, Emergency Lighting, PAT, Testing Only, Smoke &amp; CO, Lightning Protection. Auto-fills from previous certs.') +
    featureRow('&#x1F465;', 'rgba(99,102,241,0.22)', 'Multi-engineer site collaboration',
      'Whole crew works the same job in real time. Circuits assigned, tests signed off, photos shared. Foreman sees live status.') +
    featureRow('&#x1F4B7;', 'rgba(34,197,94,0.18)', 'Quotes &rarr; invoices &rarr; chasers',
      'Room Planner feeds the quote. Quote feeds the invoice. Late-payment interest built in. Price Book with live UK trade prices.') +
    featureRow('&#x1F9BA;', 'rgba(244,63,94,0.18)', 'RAMS, permits, toolbox talks',
      'AI-drafted RAMS in 60s from the scope. Danger + Limitation notices. Audit-ready from day one.') +
    `
</td></tr>
` + divider + statsBlock + divider +
    `
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 18px;font-size:15px;color:#f4f4f5;line-height:1.6">That&apos;s the intro. No pitch, no deck. Just wanted to be on your radar.</p>
</td></tr>
` + softCta() +
    emailFooter(
      'If this could help {{OrganisationName}}, reply and I&apos;ll send a founder demo account. If not, no worries &mdash; I&apos;ll not chase.'
    ),
};

// ───────────── 2. Electricians (sparks) ─────────────
const businessIntroElectricians: OutreachTemplate = {
  slug: 'business-intro-electricians-v1',
  name: 'Business Intro — Electricians',
  category: 'business',
  subject: 'Sparky to sparky — here&apos;s what we built',
  preheader:
    'Tired of 9 apps on site? One app does certs, quotes, RAMS, invoices, Price Book. Built by a time-served electrician.',
  description:
    'Cold first-touch for working electricians (sole-trader or employed). Sparky-to-sparky tone. Soft intro, no hard sell.',
  thumbnail_emoji: '⚡',
  sort_order: 101,
  merge_tags: ['FirstName', 'OrganisationName'],
  html_body:
    emailOpen(
      'Tired of 9 apps on site? One app does certs, quotes, RAMS, invoices, Price Book. Built by a time-served electrician.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:30px;font-weight:700;color:#ffffff;line-height:1.15;letter-spacing:-0.5px">Sparky to sparky, {{FirstName}}.</h1>
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:16px;color:#f4f4f5;line-height:1.6">Andrew here &mdash; I&apos;m a time-served electrician. I built this app because I was sick of 9 different apps on my phone trying to do one job.</p>
</td></tr>
` + divider + whoWeAreBlock + divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">What it does for you</p>
` +
    featureRow('&#x26A1;', 'rgba(251,191,36,0.18)', 'All 16 certs on your phone',
      'EICR, EIC, Minor Works, Fire Alarm, Solar, EV &mdash; auto-filled from your last job. Signature, PDF, emailed to the client in under 2 minutes.') +
    featureRow('&#x1F4D0;', 'rgba(168,85,247,0.22)', 'Room Planner + live UK prices',
      'Draw the room on your phone, drop sockets, cables route themselves, quote lands in the customer&apos;s inbox before you leave the drive.') +
    featureRow('&#x1F4B7;', 'rgba(34,197,94,0.18)', 'Quotes &rarr; invoices &rarr; chase emails',
      'Stops you getting stiffed. Auto-chaser at 14, 28, 56 days with statutory interest built in.') +
    featureRow('&#x1F916;', 'rgba(14,165,233,0.22)', 'Ask Dave &mdash; AI that knows the regs',
      'BS 7671 questions answered on site. Cable sizing, Zs, volt drop &mdash; with working shown.') +
    `
</td></tr>
` + divider + statsBlock + divider +
    `
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 18px;font-size:15px;color:#f4f4f5;line-height:1.6">&pound;12.99/mo on Stripe, &pound;14.99 through Apple. First look is free.</p>
</td></tr>
` + softCta('Have a look — free on iOS') +
    emailFooter(
      'Any feature missing, any bug &mdash; reply and I&apos;ll fix it. I read every email myself.'
    ),
};

// ───────────── 3. Electrical Engineers ─────────────
const businessIntroElectricalEngineers: OutreachTemplate = {
  slug: 'business-intro-electrical-engineers-v1',
  name: 'Business Intro — Electrical Engineers',
  category: 'business',
  subject: 'BS 7671 calcs on your phone — quick intro',
  preheader:
    '40+ calculators, Room Planner with live cable routing, AI-drafted circuit design. Built for UK electrical engineers.',
  description:
    'Cold first-touch for design engineers / M&E consulting engineers. Leads with technical depth (BS 7671, calcs, design).',
  thumbnail_emoji: '📐',
  sort_order: 102,
  merge_tags: ['FirstName', 'OrganisationName'],
  html_body:
    emailOpen(
      '40+ calculators, Room Planner with live cable routing, AI-drafted circuit design. Built for UK electrical engineers.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:30px;font-weight:700;color:#ffffff;line-height:1.15;letter-spacing:-0.5px">Quick intro, {{FirstName}}.</h1>
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:16px;color:#f4f4f5;line-height:1.6">Andrew here, founder of Elec-Mate. Wanted to put a technical tool on your radar &mdash; not a sales pitch.</p>
</td></tr>
` + divider + whoWeAreBlock + divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">What&apos;s relevant to your work</p>
` +
    featureRow('&#x1F4D0;', 'rgba(168,85,247,0.22)', '40+ BS 7671 calculators',
      'Voltage drop, Zs, earth fault loop, Adiabatic, volt-drop under fault, diversity, cable de-rating, PFC &mdash; all with working shown, citation to the regs.') +
    featureRow('&#x1F5FA;', 'rgba(14,165,233,0.22)', 'Room Planner &mdash; live cable routing',
      'Drop accessories, cables auto-route with diversity applied. Feeds straight into a design spec and a material take-off.') +
    featureRow('&#x1F916;', 'rgba(99,102,241,0.22)', 'AI Circuit Designer',
      'Give it a load schedule and the AI drafts a compliant design: cable sizes, protective device ratings, Zs calcs, volt-drop check.') +
    featureRow('&#x26A1;', 'rgba(251,191,36,0.18)', 'BS 7671 A4:2026 ready',
      'AFDD, TN-C-S (PNB), new schedule columns, updated model forms &mdash; rolling into the certificate forms as the amendment lands.') +
    `
</td></tr>
` + divider + statsBlock + divider +
    `
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 18px;font-size:15px;color:#f4f4f5;line-height:1.6">Free to try, &pound;12.99/mo Stripe. See if the calcs are up to your standard.</p>
</td></tr>
` + softCta() +
    emailFooter(
      'Any calc you&apos;d want added, any edge case we&apos;ve got wrong &mdash; I&apos;d love to hear. Engineers shaping this product get priority on the roadmap.'
    ),
};

// ───────────── 4. Supervisors ─────────────
const businessIntroSupervisors: OutreachTemplate = {
  slug: 'business-intro-supervisors-v1',
  name: 'Business Intro — Supervisors',
  category: 'business',
  subject: 'For the one running the crew &mdash; quick intro',
  preheader:
    'See every engineer&apos;s live status. Certs signed off as they happen. No more end-of-day WhatsApp chaos.',
  description:
    'Cold first-touch for site supervisors / QSes / project leads running teams of electricians. Leads with visibility and coordination.',
  thumbnail_emoji: '👷',
  sort_order: 103,
  merge_tags: ['FirstName', 'OrganisationName'],
  html_body:
    emailOpen(
      'See every engineer&apos;s live status. Certs signed off as they happen. No more end-of-day WhatsApp chaos.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:30px;font-weight:700;color:#ffffff;line-height:1.15;letter-spacing:-0.5px">For the one running the crew.</h1>
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:16px;color:#f4f4f5;line-height:1.6">Hi {{FirstName}} &mdash; Andrew, founder of Elec-Mate. Quick intro, one read.</p>
</td></tr>
` + divider + whoWeAreBlock + divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">What it does for supervisors</p>
` +
    featureRow('&#x1F465;', 'rgba(99,102,241,0.22)', 'Live crew status on one screen',
      'See every engineer&apos;s position, current job, circuits complete, tests done. No more ringing round at 4pm.') +
    featureRow('&#x2714;', 'rgba(34,197,94,0.18)', 'Circuit assignment &amp; sign-off',
      'Assign circuits to engineers. They sign off as they test. You see coverage live on a site plan.') +
    featureRow('&#x1F4D1;', 'rgba(251,191,36,0.18)', 'Compliance audit trail &mdash; automatic',
      'Every test, RAMS briefing, toolbox talk &mdash; user-stamped, timestamped, one-click export.') +
    featureRow('&#x1F4CA;', 'rgba(14,165,233,0.22)', 'Job profit + labour tracking',
      'Hours logged as they work (GPS-aware). Job-level profit visible the moment it finishes.') +
    `
</td></tr>
` + divider + statsBlock + divider +
    `
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 18px;font-size:15px;color:#f4f4f5;line-height:1.6">Free to try. Reply with a question if it&apos;s easier.</p>
</td></tr>
` + softCta() +
    emailFooter(
      'Running a crew is a juggling act. If this takes one ball out of the air for {{OrganisationName}}, it&apos;s worth the 2-minute download.'
    ),
};

// ───────────── 5. Field / Maintenance ─────────────
const businessIntroFieldMaintenance: OutreachTemplate = {
  slug: 'business-intro-field-maintenance-v1',
  name: 'Business Intro — Field / Maintenance Engineers',
  category: 'business',
  subject: 'Reactive work on your phone &mdash; quick intro',
  preheader:
    'Site diary, certs from your phone, photos timestamped and GPS-tagged. Every reactive call fully evidenced.',
  description:
    'Cold first-touch for field service, facilities maintenance, reactive maintenance engineers. Leads with on-site capture and audit trail.',
  thumbnail_emoji: '🔧',
  sort_order: 104,
  merge_tags: ['FirstName', 'OrganisationName'],
  html_body:
    emailOpen(
      'Site diary, certs from your phone, photos timestamped and GPS-tagged. Every reactive call fully evidenced.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:30px;font-weight:700;color:#ffffff;line-height:1.15;letter-spacing:-0.5px">Built for field work, {{FirstName}}.</h1>
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:16px;color:#f4f4f5;line-height:1.6">Andrew here, founder of Elec-Mate &mdash; quick intro, no pitch.</p>
</td></tr>
` + divider + whoWeAreBlock + divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">What it does on site</p>
` +
    featureRow('&#x1F4F8;', 'rgba(251,191,36,0.18)', 'Photo estimates &amp; evidence',
      'Snap the fault, the app drafts the fix cost. Photo GPS-tagged, timestamped, attached to the job. Audit-proof.') +
    featureRow('&#x1F552;', 'rgba(99,102,241,0.22)', 'Site diary + time tracking',
      'GPS-aware timer. Arrived 09:14, left 11:22, 2h 08m billable, logged against the site. No clipboard.') +
    featureRow('&#x26A1;', 'rgba(34,197,94,0.18)', 'Certs from your van',
      'EICR spot checks, Testing Only, Minor Works, PAT. Offline-capable &mdash; signs when you hit 4G.') +
    featureRow('&#x1F4CC;', 'rgba(168,85,247,0.22)', 'Snagging &amp; follow-up list',
      'Leave a site with a defect list. Automatically surfaces on your next return visit.') +
    `
</td></tr>
` + divider + statsBlock + divider +
    `
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 18px;font-size:15px;color:#f4f4f5;line-height:1.6">Works offline, syncs in signal. Free first look.</p>
</td></tr>
` + softCta() +
    emailFooter(
      'If you spend half your day in a van, {{OrganisationName}} would feel this quickly. Reply with any question and I&apos;ll answer fast.'
    ),
};

// ───────────── 6. Estimators / Contracts ─────────────
const businessIntroEstimators: OutreachTemplate = {
  slug: 'business-intro-estimators-v1',
  name: 'Business Intro — Estimators / Contracts',
  category: 'business',
  subject: 'Price Book + live UK rates &mdash; quick intro',
  preheader:
    'Live material prices, labour intelligence, quote-to-invoice flow. Built for UK electrical estimators.',
  description:
    'Cold first-touch for estimators, QSes, contracts managers, tender writers at electrical firms. Leads with Price Book + labour intelligence.',
  thumbnail_emoji: '📊',
  sort_order: 105,
  merge_tags: ['FirstName', 'OrganisationName'],
  html_body:
    emailOpen(
      'Live material prices, labour intelligence, quote-to-invoice flow. Built for UK electrical estimators.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:30px;font-weight:700;color:#ffffff;line-height:1.15;letter-spacing:-0.5px">For the one pricing the work.</h1>
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:16px;color:#f4f4f5;line-height:1.6">Hi {{FirstName}} &mdash; Andrew, founder of Elec-Mate. Two-minute intro to something likely relevant.</p>
</td></tr>
` + divider + whoWeAreBlock + divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">What it does for estimating</p>
` +
    featureRow('&#x1F4B7;', 'rgba(251,191,36,0.18)', 'Price Book &mdash; live UK trade prices',
      'Materials synced from CEF, Edmundson, Rexel, RS. Mark-up rules you control. Updated nightly, applied on every quote.') +
    featureRow('&#x23F1;', 'rgba(99,102,241,0.22)', 'Labour intelligence (RAG-backed)',
      'Practical-work timing data trained on 1000s of actual UK jobs. Suggests labour hours per task with confidence bands.') +
    featureRow('&#x1F4D0;', 'rgba(168,85,247,0.22)', 'Room Planner &rarr; auto take-off',
      'Draw the room, drop accessories, cables route, material list generates. Quote lands in the client&apos;s inbox in minutes.') +
    featureRow('&#x1F916;', 'rgba(34,197,94,0.18)', 'AI Cost Engineer',
      'Paste the scope. AI drafts the quote with material + labour + margin, line-item justified. You review and send.') +
    `
</td></tr>
` + divider + statsBlock + divider +
    `
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 18px;font-size:15px;color:#f4f4f5;line-height:1.6">Free trial. See if the Price Book matches yours.</p>
</td></tr>
` + softCta() +
    emailFooter(
      'Estimators who shape the Price Book get the feature priority &mdash; tell me where our prices are off and I&apos;ll have the team fix it the same week.'
    ),
};

// ───────────── 7. Building Services / M&E ─────────────
const businessIntroBuildingServices: OutreachTemplate = {
  slug: 'business-intro-building-services-v1',
  name: 'Business Intro — Building Services / M&E',
  category: 'business',
  subject: 'Quick intro &mdash; M&amp;E cert library on your phone',
  preheader:
    '16 electrical certs + RAMS + permits. Multi-engineer collab. Built for UK M&E projects at building-services scale.',
  description:
    'Cold first-touch for M&E managers, building services engineers, contract leads on multi-disciplinary projects. Leads with cert library breadth + audit trail.',
  thumbnail_emoji: '🏭',
  sort_order: 106,
  merge_tags: ['FirstName', 'OrganisationName'],
  html_body:
    emailOpen(
      '16 electrical certs + RAMS + permits. Multi-engineer collab. Built for UK M&E projects at building-services scale.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:30px;font-weight:700;color:#ffffff;line-height:1.15;letter-spacing:-0.5px">M&amp;E-scale, phone-first.</h1>
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:16px;color:#f4f4f5;line-height:1.6">Hi {{FirstName}} &mdash; Andrew, founder of Elec-Mate. Relevant for anyone running electrical on big M&amp;E packages.</p>
</td></tr>
` + divider + whoWeAreBlock + divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">What it does at project scale</p>
` +
    featureRow('&#x26A1;', 'rgba(251,191,36,0.18)', 'Full 16-certificate library',
      'EICR, EIC, Minor Works, Fire Alarm (D/I/C/M/R), Solar PV, EV, BESS, G98/G99, Emergency Lighting, Lightning Protection. One cert pack per project, handover-ready.') +
    featureRow('&#x1F465;', 'rgba(99,102,241,0.22)', 'Multi-engineer collab',
      '30+ electricians working the same job simultaneously &mdash; circuits assigned, signed off, photographed &mdash; visible to the M&amp;E lead in real time.') +
    featureRow('&#x1F4D1;', 'rgba(34,197,94,0.18)', 'Handover pack one-click',
      'Client wants the O&amp;M? Export every cert, RAMS, photo, toolbox log in a single PDF pack. No PA chasing engineers for paperwork.') +
    featureRow('&#x1F9BA;', 'rgba(244,63,94,0.18)', 'Permits, danger notices, RAMS',
      'AI-generated RAMS from scope. Permit-to-work flow with sign-off + lift. Audit-ready the day the PM asks.') +
    `
</td></tr>
` + divider + statsBlock + divider +
    `
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 18px;font-size:15px;color:#f4f4f5;line-height:1.6">Volume licences on request. Start with a free individual look.</p>
</td></tr>
` + softCta() +
    emailFooter(
      'If {{OrganisationName}} runs projects where electrical paperwork is 30% of the admin, this bites quickly. Reply and I&apos;ll send a project-scale demo.'
    ),
};

// ───────────── 8. NICEIC / NAPIT Accredited ─────────────
const businessIntroAccredited: OutreachTemplate = {
  slug: 'business-intro-accredited-v1',
  name: 'Business Intro — NICEIC / NAPIT Accredited',
  category: 'business',
  subject: 'For accredited firms &mdash; quick intro',
  preheader:
    'Every cert audit-ready. Every test user-stamped. Every RAMS exportable. Built for accredited UK electrical firms.',
  description:
    'Cold first-touch for NICEIC / NAPIT / ECA / Stroma / NAPIT-accredited firms. Leads with audit-readiness and credibility peer signalling.',
  thumbnail_emoji: '🛡️',
  sort_order: 107,
  merge_tags: ['FirstName', 'OrganisationName'],
  html_body:
    emailOpen(
      'Every cert audit-ready. Every test user-stamped. Every RAMS exportable. Built for accredited UK electrical firms.'
    ) +
    `
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:30px;font-weight:700;color:#ffffff;line-height:1.15;letter-spacing:-0.5px">Built for audit, {{FirstName}}.</h1>
</td></tr>
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:16px;color:#f4f4f5;line-height:1.6">Andrew here, founder of Elec-Mate. Short intro &mdash; particularly relevant if {{OrganisationName}} has an accreditation to keep.</p>
</td></tr>
` + divider + whoWeAreBlock + divider +
    `
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">Why accredited firms rate it</p>
` +
    featureRow('&#x1F4D1;', 'rgba(251,191,36,0.18)', 'Audit day &mdash; one-click export',
      'NICEIC / NAPIT assessor turns up? Export every cert, every test, every RAMS for the period in one PDF pack. Nothing to chase.') +
    featureRow('&#x26A1;', 'rgba(99,102,241,0.22)', 'BS 7671 A4:2026 built-in',
      'AFDD, TN-C-S (PNB), new schedule columns, updated model forms &mdash; rolling in as the amendment lands. No cert-form re-procurement.') +
    featureRow('&#x1F464;', 'rgba(34,197,94,0.18)', 'Every action user-stamped',
      'Who tested, who signed, when, from where. No assessor question left unanswered.') +
    featureRow('&#x1F4F1;', 'rgba(14,165,233,0.22)', 'Works for every engineer on your books',
      'Licensed per seat. One engineer, one login, one full audit trail each.') +
    `
</td></tr>
` + divider + statsBlock + divider +
    `
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 18px;font-size:15px;color:#f4f4f5;line-height:1.6">Start with an individual trial. Scale to the team if it fits.</p>
</td></tr>
` + softCta() +
    emailFooter(
      'Accreditation is expensive to keep &mdash; the paperwork is where it slips. If that sounds familiar, reply and I&apos;ll walk you through how we close that gap.'
    ),
};

// ═══════════════════════════════════════════════════════════════
// COLLEGE APPRENTICE SHOWCASE — master first-touch for the 1.9k
// education pool (college heads, tutors, assessors, apprenticeship
// coordinators, training provider directors). Sells the College Hub
// first (their world) then the Apprentice Hub (what their students
// get). Deep-dive specific to what the app actually does — AI
// portfolio mapping to LOs/ACs, site diary AI coach, EPA simulator
// that reads the portfolio, LTI 1.3 Moodle/Canvas/Blackboard plug-in.
// ═══════════════════════════════════════════════════════════════
const collegeApprenticeShowcaseV1: OutreachTemplate = {
  slug: 'college-apprentice-showcase-v1',
  name: 'College Master — Showcase (All 1.9k)',
  category: 'college',
  subject: 'Photo the job. AI maps it to the right LO and AC. Done.',
  preheader:
    'The AI-powered apprentice app + college hub — LTI 1.3 ready for Moodle, Canvas, Blackboard. Free 7-day trial.',
  description:
    'Master unified first-touch for the education pool. Leads with AI portfolio mapping, then College Hub features (VLE-compatible), then a deep dive on Apprentice Hub including Mental Health check-in, then the Electrical Hub for qualified staff.',
  thumbnail_emoji: '🎓',
  sort_order: 5,
  merge_tags: ['FirstName', 'OrganisationName'],
  html_body:
    emailOpen(
      'The AI-powered apprentice app + college hub — LTI 1.3 ready for Moodle, Canvas, Blackboard. Free 7-day trial.'
    ) +
    `
<!-- HERO -->
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:32px;font-weight:800;color:#ffffff;line-height:1.1;letter-spacing:-0.7px">Photo the job.<br><span style="color:#fbbf24">AI maps it to the right LO and AC.</span></h1>
</td></tr>
<tr><td style="height:18px;line-height:18px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:17px;color:#f4f4f5;line-height:1.55">Hi {{FirstName}} &mdash; I&apos;m Andrew, time-served sparky and founder of Elec-Mate. Your apprentices photograph their work, our AI reads the evidence and matches it to the correct Learning Outcomes and Assessment Criteria, with confidence scores. That&apos;s how the portfolio builds itself.</p>
</td></tr>

<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>

<!-- 7-DAY FREE TRIAL BADGE -->
<tr><td align="center" style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:18px;box-shadow:0 6px 24px rgba(251,191,36,0.3)">
<tr><td style="padding:18px 28px" align="center">
<p style="margin:0;font-size:12px;font-weight:800;color:rgba(0,0,0,0.65);text-transform:uppercase;letter-spacing:2.2px">Try it free</p>
<p style="margin:6px 0 0;font-size:30px;font-weight:900;color:#000;line-height:1;letter-spacing:-0.8px">7 days, on us</p>
<p style="margin:8px 0 0;font-size:13px;font-weight:600;color:rgba(0,0,0,0.75);line-height:1.4">Full access &middot; Cancel before day 7 &middot; No charge</p>
</td></tr></table>
</td></tr>

<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>

<!-- SECTION 1: THE COLLEGE HUB -->
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.6px;font-weight:800">Section 1 &mdash; for you</p>
<p style="margin:0 0 12px;font-size:22px;color:#ffffff;font-weight:800;line-height:1.2;letter-spacing:-0.4px">The College Hub</p>
<p style="margin:0 0 24px;font-size:14px;color:#d4d4d8;line-height:1.6">Built with UK tutors, heads and IQAs. 80% rolled out to trial colleges, opening up from this summer. Every tool below is live.</p>
` +
    featureRow(
      '&#x1F393;',
      'rgba(99,102,241,0.22)',
      'Tutor, faculty &amp; assessor dashboards',
      'Student 360, cohort view, attendance, grading, portfolio review, progress tracking, tutor notebook, work queue. Every apprentice&apos;s full picture in one screen &mdash; including which evidence has been AI-mapped, which LOs are covered, which ACs still need work.'
    ) +
    featureRow(
      '&#x1F916;',
      'rgba(168,85,247,0.22)',
      'AI Individual Learning Plan generator',
      'Give it a student&apos;s prior attainment, strengths, gaps and target qualification &mdash; the AI drafts a full ILP with SMART goals, milestones, and KSB coverage. Tutor reviews and signs off.'
    ) +
    featureRow(
      '&#x1F4CA;',
      'rgba(34,197,94,0.18)',
      'EPA tracking + IQA workflow',
      'Cohort-wide EPA readiness at a glance. Full Internal Quality Assurance flow built in &mdash; sampling, observations, sign-off. Audit-ready for Ofsted / ESFA the day they turn up.'
    ) +
    featureRow(
      '&#x1F50C;',
      'rgba(14,165,233,0.22)',
      'LTI 1.3 VLE plug-in &mdash; Moodle, Canvas &amp; Blackboard',
      'Your LMS stays. Elec-Mate bolts on as an LTI 1.3 tool &mdash; single sign-on, gradebook push, launch any Elec-Mate activity from inside Moodle / Canvas / Blackboard. Setup guides for each platform are built in.'
    ) +
    featureRow(
      '&#x1F91D;',
      'rgba(244,63,94,0.18)',
      'Employer portal + Off-the-Job training',
      'Employers see their apprentice&apos;s evidence and sign off directly via a magic link. OTJ hours auto-logged from the Site Diary. No more chasing timesheets, no more missed 20% rule.'
    ) +
    featureRow(
      '&#x1F4C5;',
      'rgba(251,191,36,0.18)',
      'Timetable, live lessons &amp; lesson plans',
      'Schemes of Work, Lesson Plans, Teaching Resources, Timetable, Live Lesson mode, Compliance Docs, Assessment Calendar &mdash; a proper LMS-plus for electrical apprenticeship delivery.'
    ) +
    `
</td></tr>

<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>

<!-- SECTION 2: ELECTRICAL HUB -->
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.6px;font-weight:800">Section 2 &mdash; for qualified staff</p>
<p style="margin:0 0 16px;font-size:22px;color:#ffffff;font-weight:800;line-height:1.2;letter-spacing:-0.4px">The Electrical Hub</p>
<p style="margin:0 0 14px;font-size:15px;color:#f4f4f5;line-height:1.7">Your tutors and assessors use the <strong style="color:#fbbf24">same app</strong> as a working electrician would. 16 certificates (BS 7671 A4:2026 ready), Business Hub (projects, quotes, invoices, site diary, Price Book), 72 calculators, 6 specialist AI agents (Circuit Designer, Cost Engineer, Maintenance, Installer, Health &amp; Safety, plus Ask Dave for regs questions), AI-drafted RAMS and full site safety.</p>
<p style="margin:0;font-size:15px;color:#f4f4f5;line-height:1.7">They stay current with the trade. They can show apprentices what real practice looks like on a live cert. They never get caught out when a student asks a regs question.</p>
</td></tr>

<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>

<!-- SECTION 3: APPRENTICE HUB -->
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.6px;font-weight:800">Section 3 &mdash; for your apprentices</p>
<p style="margin:0 0 12px;font-size:22px;color:#ffffff;font-weight:800;line-height:1.2;letter-spacing:-0.4px">The Apprentice Hub</p>
<p style="margin:0 0 24px;font-size:14px;color:#d4d4d8;line-height:1.6">Everything an electrical apprentice needs for on-job evidence, off-job learning, EPA readiness, and their own wellbeing.</p>
` +
    featureRow(
      '&#x1F4F8;',
      'rgba(251,191,36,0.18)',
      'Portfolio with AI LO/AC mapping',
      'Apprentice photographs the work, adds a quick description. Our AI analyses the evidence and auto-suggests the matching LOs and ACs across all 9 electrical qualifications, with confidence scores. Apprentice reviews, toggles, saves. The retrospective KSB scramble is over.'
    ) +
    featureRow(
      '&#x1F4D3;',
      'rgba(34,197,94,0.18)',
      'Site Diary + AI coach',
      'Log the day &mdash; what was done, how it felt, which skills were practised. The weekly AI coach reads every entry and returns: a summary of the week, skill gaps from the 8 core categories, mood insight, a BS 7671 reg tip linked to their work, one actionable recommendation, and personalised encouragement.'
    ) +
    featureRow(
      '&#x1F3AF;',
      'rgba(99,102,241,0.22)',
      'EPA Simulator that reads their portfolio',
      'Unlike anything else out there. The simulator pulls the apprentice&apos;s actual portfolio evidence and generates 6-8 EPA-style Professional Discussion questions against that specific work. Pass + Distinction grade descriptors per question. AI scores their answers. They rehearse against the real panel experience.'
    ) +
    featureRow(
      '&#x1F6E1;',
      'rgba(14,165,233,0.22)',
      'AM2 Simulator + Inspection &amp; Testing Hub',
      'Safe isolation, fault finding, testing &mdash; dry-run the full AM2. I&amp;T Hub has guides, quizzes, BS 7671 regs, and voice-input for test results straight into the Schedule of Tests.'
    ) +
    featureRow(
      '&#x1F4DA;',
      'rgba(168,85,247,0.22)',
      'Study Centre &mdash; 46 courses + mock exams',
      'Level 2 and Level 3 electrical, BS 7671, H&amp;S, MEWP, working at height, plus an upskilling library for qualified sparks. Mock AM2 and EPA exams with thousands of practice questions, flash cards, quizzes. Full progress tracking.'
    ) +
    featureRow(
      '&#x1F3A5;',
      'rgba(244,63,94,0.18)',
      'Learning Videos &mdash; curated library',
      'Hand-picked, apprentice-first video content. Not random YouTube &mdash; cross-referenced to units, watched-time tracked, surfaced when relevant to what they&apos;re working on.'
    ) +
    featureRow(
      '&#x1F517;',
      'rgba(34,197,94,0.18)',
      'Supervisor / assessor magic-link sign-off',
      'One tap and the apprentice shares their portfolio to a supervisor or assessor via a time-limited magic link (24h, 7d, 30d, or never expires). They view the evidence, leave comments, and mark ACs as met. Tutors get notified when sign-offs land.'
    ) +
    featureRow(
      '&#x2764;',
      'rgba(251,113,133,0.22)',
      'Mental Health Hub &mdash; daily check-in',
      'Apprentices privately log mood and stress. The app watches for patterns, surfaces resources (Samaritans, Mind, Tradespeople Mental Health line), and quietly flags concerning trends so tutors can reach out at the right moment. Wellbeing, built into the daily workflow.'
    ) +
    featureRow(
      '&#x1F4D6;',
      'rgba(14,165,233,0.22)',
      'Guidance pages &mdash; apprenticeship life',
      'Apprenticeship Expectations, Career Pathways, Communication Skills, Apprentice Toolbox, Advanced Help, Continuing Education. The soft-skills side of the job, written by electricians who&apos;ve been there.'
    ) +
    `
</td></tr>

<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>

<!-- STATS -->
<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="25%" align="center" valign="top" style="padding:0 4px">
<p style="margin:0;font-size:28px;font-weight:800;color:#ffffff;line-height:1">750+</p>
<p style="margin:4px 0 0;font-size:10px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.7px;font-weight:700">UK Trades</p>
</td>
<td width="25%" align="center" valign="top" style="padding:0 4px">
<p style="margin:0;font-size:28px;font-weight:800;color:#ffffff;line-height:1">46</p>
<p style="margin:4px 0 0;font-size:10px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.7px;font-weight:700">Courses</p>
</td>
<td width="25%" align="center" valign="top" style="padding:0 4px">
<p style="margin:0;font-size:28px;font-weight:800;color:#fbbf24;line-height:1">7&nbsp;days</p>
<p style="margin:4px 0 0;font-size:10px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.7px;font-weight:700">Free trial</p>
</td>
<td width="25%" align="center" valign="top" style="padding:0 4px">
<p style="margin:0;font-size:28px;font-weight:800;color:#fbbf24;line-height:1">5.0&#9733;</p>
<p style="margin:4px 0 0;font-size:10px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.7px;font-weight:700">App Store</p>
</td>
</tr></table>
</td></tr>

<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>

<!-- PRIMARY CTA -->
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 20px;font-size:15px;color:#f4f4f5;line-height:1.5">Download it, try every tool free for 7 days, see it on a real apprentice&apos;s phone.</p>
</td></tr>
` +
    ctaButton('Start your 7-day free trial', LINK_APP_STORE) +
    `
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
` +
    secondaryCta('See the full platform at elec-mate.com', LINK_BUSINESS_WEB) +
    `
<tr><td style="height:36px;line-height:36px;font-size:0">&nbsp;</td></tr>

<!-- REPLY CTA BLOCK -->
<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.3);border-radius:16px">
<tr><td style="padding:22px 26px">
<p style="margin:0 0 10px;font-size:13px;color:#fbbf24;font-weight:800;text-transform:uppercase;letter-spacing:1.4px">If this interests you</p>
<p style="margin:0;font-size:16px;color:#ffffff;line-height:1.55;font-weight:600">Just reply to this email &mdash; I read every one myself. Happy to run a 15-minute Teams walkthrough of the College Hub on your college&apos;s actual cohort data, or send a demo account so you can click around first.</p>
</td></tr></table>
</td></tr>

<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>

<!-- TESTIMONIAL -->
<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px">
<tr><td style="padding:22px 24px">
<p style="margin:0 0 10px;font-size:14px;color:#fbbf24;letter-spacing:3px">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
<p style="margin:0 0 10px;font-size:15px;color:#ffffff;line-height:1.55;font-weight:700">Fantastic app for electricians</p>
<p style="margin:0;font-size:15px;color:#ffffff;line-height:1.6;font-style:italic">&ldquo;I&apos;ve used the app and the web based version for a while now and it&apos;s well worth the investment. If you&apos;re an apprentice or experienced Spark give it a go, you won&apos;t be disappointed.&rdquo;</p>
<p style="margin:12px 0 0;font-size:13px;color:#d4d4d8">&mdash; Chief6uk &middot; 5&#9733; App Store review</p>
</td></tr></table>
</td></tr>

<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>

<!-- PRICING CLARITY -->
<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:rgba(251,191,36,0.05);border:1px solid rgba(251,191,36,0.2);border-radius:14px">
<tr><td style="padding:18px 22px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">After your apprentices&apos; free trial</p>
<p style="margin:0;font-size:15px;color:#f4f4f5;line-height:1.6">&pound;5.99/month on Stripe, &pound;6.99 through Apple &mdash; apprentice pricing. Qualified electricians on the Electrical Hub: &pound;12.99/&pound;14.99. College cohort licences on request.</p>
</td></tr></table>
</td></tr>
` +
    emailFooter(
      'Reply with anything &mdash; what&apos;s missing, which of your apprentices is struggling, what your IQA would want to see. I read every email and the feedback from tutors goes straight onto next month&apos;s roadmap.'
    ),
};

// ═══════════════════════════════════════════════════════════════
// MASTER BUSINESS INTRO — single first-touch for the whole 12k pool.
// Fires to every `business_pool` contact regardless of Apollo tier.
// Sells the app, surfaces the 7-day free trial, App Store as the CTA.
// Subsequent campaigns use the 8 segmented cold-intros.
// ═══════════════════════════════════════════════════════════════
const businessMasterIntroV1: OutreachTemplate = {
  slug: 'business-master-intro-v1',
  name: 'Business Master — First Touch (All 12k)',
  category: 'business',
  subject: 'Every tool you need on site — one app, 7 days free',
  preheader:
    '16 certs, Room Planner, quotes + invoices, live UK trade prices, AI RAMS. Built by a time-served electrician. Free for 7 days.',
  description:
    'Master unified first-touch template for the entire business pool (12,577 contacts). Big 7-day trial callout, feature grid, App Store CTA, founder sign-off. Not segmented by role — this is the introduction; follow-ups go role-specific.',
  thumbnail_emoji: '🚀',
  sort_order: 90,
  merge_tags: ['FirstName', 'OrganisationName'],
  html_body:
    emailOpen(
      '16 certs, Room Planner, quotes + invoices, live UK trade prices, AI RAMS. Built by a time-served electrician. Free for 7 days.'
    ) +
    `
<!-- HERO -->
<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:34px;font-weight:800;color:#ffffff;line-height:1.05;letter-spacing:-0.8px">Every tool you need on site.<br><span style="color:#fbbf24">One app.</span></h1>
</td></tr>
<tr><td style="height:18px;line-height:18px;font-size:0">&nbsp;</td></tr>
<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:17px;color:#f4f4f5;line-height:1.55">Hi {{FirstName}} &mdash; I&apos;m Andrew, time-served sparky and founder of Elec-Mate. I built this app because I was sick of juggling 9 different tools on site to do one job.</p>
</td></tr>

<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>

<!-- 7-DAY FREE TRIAL BADGE -->
<tr><td align="center" style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:18px;box-shadow:0 6px 24px rgba(251,191,36,0.3)">
<tr><td style="padding:18px 28px" align="center">
<p style="margin:0;font-size:12px;font-weight:800;color:rgba(0,0,0,0.65);text-transform:uppercase;letter-spacing:2.2px">Try it free</p>
<p style="margin:6px 0 0;font-size:30px;font-weight:900;color:#000;line-height:1;letter-spacing:-0.8px">7 days, on us</p>
<p style="margin:8px 0 0;font-size:13px;font-weight:600;color:rgba(0,0,0,0.75);line-height:1.4">Full access &middot; Cancel before day 7 &middot; No charge</p>
</td></tr></table>
</td></tr>

<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>

<!-- WHAT'S INSIDE -->
<tr><td style="padding:0 32px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.6px;font-weight:800">What&apos;s inside</p>
<p style="margin:0 0 24px;font-size:20px;color:#ffffff;font-weight:700;line-height:1.25;letter-spacing:-0.3px">Everything a UK electrical firm actually needs &mdash; in your pocket.</p>
` +
    featureRow(
      '&#x26A1;',
      'rgba(251,191,36,0.18)',
      '16 certificates &mdash; full BS 7671 A4:2026 library',
      'EICR, EIC, Minor Works, Testing Only, Fire Alarm (Design / Install / Commission / Modify / Inspect), Solar PV, EV Charging, BESS, G98, G99, Emergency Lighting, Lightning Protection, Smoke &amp; CO, PAT. Auto-filled from your last cert, digitally signed, PDF in the client&apos;s inbox in under 2 minutes.'
    ) +
    featureRow(
      '&#x1F50D;',
      'rgba(244,63,94,0.22)',
      'Inspection &amp; Testing &mdash; built for on-site work',
      'Speak test results straight into the Schedule of Tests with voice input &mdash; never put the MFT down. Board scanner reads distribution boards with your camera and auto-populates circuit details. Live compliance checking flags readings outside BS 7671 tolerance before you sign. Smart cascading forms only show fields that apply. Circuit-by-circuit photo evidence. Every test auditable, every reading traceable.'
    ) +
    featureRow(
      '&#x1F4BC;',
      'rgba(168,85,247,0.22)',
      'Business Hub &mdash; 20+ tools your firm runs on',
      'Projects, tasks, calendar, time tracker, customers, booking link, quotes &amp; invoices, Room Planner, snagging, site visits, photo docs, expenses, materials, Price Book with live UK trade prices, Stock Tracker, calculators, and more &mdash; all inside one hub. The paperwork side of running an electrical firm, finally on your phone.'
    ) +
    featureRow(
      '&#x1F4B7;',
      'rgba(34,197,94,0.18)',
      'Quotes &rarr; invoices &rarr; chase emails',
      'Quote-to-invoice flow in two taps. Auto-chasers at 14, 28, 56 days with statutory interest baked in. Stops you getting stiffed.'
    ) +
    featureRow(
      '&#x1F9BA;',
      'rgba(244,63,94,0.18)',
      'AI RAMS, permits &amp; site safety',
      'AI-drafted RAMS in 60 seconds from the scope. Permits-to-work with sign-off + lift. Toolbox talks with photo evidence. Audit-ready from day one.'
    ) +
    featureRow(
      '&#x1F393;',
      'rgba(99,102,241,0.22)',
      'Study Centre &mdash; 46 courses + mock exams',
      'Level 2 &amp; Level 3 electrical, BS 7671, H&amp;S, MEWP, working at height, plus an upskilling library for qualified sparks. Mock AM2 and EPA exams, flash cards, quizzes &mdash; all designed to aid learning. Full progress tracking for your whole team, no training-provider invoices.'
    ) +
    featureRow(
      '&#x1F916;',
      'rgba(14,165,233,0.22)',
      'AI that knows the electrical industry',
      'Six specialist agents trained on BS 7671 and UK electrical practice: Circuit Designer, Cost Engineer, Maintenance Agent, Installer, Health &amp; Safety, plus Ask Dave for everyday regs questions. Backed by 72 built-in calculators &mdash; voltage drop, Zs, PFC, Adiabatic, diversity, the lot. Site-grade answers in seconds.'
    ) +
    featureRow(
      '&#x1F393;',
      'rgba(244,63,94,0.18)',
      'Apprentice Hub &mdash; pass EPA first time',
      'EPA simulator, AM2 practice, flash cards, quizzes, KSB-mapped portfolio, inspection &amp; testing learning modules, and 500+ practice questions. Your apprentices walk into end-assessment ready &mdash; first-time pass rate lifts, training losses drop.'
    ) +
    `
</td></tr>

<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>

<!-- STATS -->
<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="25%" align="center" valign="top" style="padding:0 4px">
<p style="margin:0;font-size:28px;font-weight:800;color:#ffffff;line-height:1">750+</p>
<p style="margin:4px 0 0;font-size:10px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.7px;font-weight:700">UK Trades</p>
</td>
<td width="25%" align="center" valign="top" style="padding:0 4px">
<p style="margin:0;font-size:28px;font-weight:800;color:#ffffff;line-height:1">16</p>
<p style="margin:4px 0 0;font-size:10px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.7px;font-weight:700">Certs</p>
</td>
<td width="25%" align="center" valign="top" style="padding:0 4px">
<p style="margin:0;font-size:28px;font-weight:800;color:#fbbf24;line-height:1">7&nbsp;days</p>
<p style="margin:4px 0 0;font-size:10px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.7px;font-weight:700">Free trial</p>
</td>
<td width="25%" align="center" valign="top" style="padding:0 4px">
<p style="margin:0;font-size:28px;font-weight:800;color:#fbbf24;line-height:1">5.0&#9733;</p>
<p style="margin:4px 0 0;font-size:10px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.7px;font-weight:700">App Store</p>
</td>
</tr></table>
</td></tr>

<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>

<!-- PRIMARY CTA -->
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 20px;font-size:15px;color:#f4f4f5;line-height:1.5">Download it, try every tool free for 7 days, see if it fits.</p>
</td></tr>
` +
    ctaButton('Start your 7-day free trial', LINK_APP_STORE) +
    `
<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>
` +
    secondaryCta('See everything at elec-mate.com', LINK_BUSINESS_WEB) +
    `
<tr><td style="height:36px;line-height:36px;font-size:0">&nbsp;</td></tr>

<!-- TESTIMONIAL -->
<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px">
<tr><td style="padding:22px 24px">
<p style="margin:0 0 10px;font-size:14px;color:#fbbf24;letter-spacing:3px">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
<p style="margin:0 0 10px;font-size:15px;color:#ffffff;line-height:1.55;font-weight:700">Sparks best mate</p>
<p style="margin:0;font-size:15px;color:#ffffff;line-height:1.6;font-style:italic">&ldquo;Absolutely superb as an app, I can invoice, complete testing certs and reports as well as track my CPD. Everything in one place is exactly what I need, worth every penny.&rdquo;</p>
<p style="margin:12px 0 0;font-size:13px;color:#d4d4d8">&mdash; Jayecco &middot; 5&#9733; App Store review</p>
</td></tr></table>
</td></tr>

<tr><td style="height:28px;line-height:28px;font-size:0">&nbsp;</td></tr>

<!-- PRICING CLARITY -->
<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:rgba(251,191,36,0.05);border:1px solid rgba(251,191,36,0.2);border-radius:14px">
<tr><td style="padding:18px 22px">
<p style="margin:0 0 6px;font-size:12px;color:#fbbf24;text-transform:uppercase;letter-spacing:1.4px;font-weight:700">After your free trial</p>
<p style="margin:0;font-size:15px;color:#f4f4f5;line-height:1.6">&pound;12.99/month on Stripe, &pound;14.99 through Apple. No contract. Cancel any time from the app.</p>
</td></tr></table>
</td></tr>
` +
    emailFooter(
      'Reply with anything &mdash; what&apos;s missing, what&apos;s broken, what would make this a no-brainer for {{OrganisationName}}. I read every email myself and the best feedback goes straight onto next month&apos;s roadmap.'
    ),
};

export const OUTREACH_TEMPLATES: OutreachTemplate[] = [
  collegeApprenticeShowcaseV1,
  businessMasterIntroV1,
  collegeColdPitchV1,
  tutorFreeAccess,
  apprenticeFeatures,
  collegeFollowUp,
  employerApprenticeNudge,
  businessColdPitchV1,
  collegeHeadsV2,
  electricalTutorsV2,
  assessorsIQAv1,
  trainingProvidersV1,
  // 8 cold-intro business templates (sort 100-107)
  businessIntroDirectors,
  businessIntroElectricians,
  businessIntroElectricalEngineers,
  businessIntroSupervisors,
  businessIntroFieldMaintenance,
  businessIntroEstimators,
  businessIntroBuildingServices,
  businessIntroAccredited,
];

// ═══════════════════════════════════════════════════════════════
// Merge tag renderer — resolves {{Tag}} placeholders in html + subject
// Used by the edge function on every send.
// ═══════════════════════════════════════════════════════════════
export interface MergeContext {
  email: string;
  name?: string | null;
  organisation?: string | null;
  role?: string | null;
  tags?: string[] | null;
}

export function renderMergeTags(input: string, ctx: MergeContext): string {
  // Derive FirstName from name, falling back gracefully
  const firstName = (() => {
    const n = (ctx.name || '').trim();
    if (n) return n.split(/\s+/)[0];
    // Fallback: use email local-part capitalised if sensible
    const local = ctx.email.split('@')[0];
    if (local && /^[a-z]+$/i.test(local.split('.')[0])) {
      const p = local.split('.')[0];
      return p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
    }
    return 'there';
  })();

  // Neutral fallback — "your firm" reads right for both college and business
  // outreach when the contact row doesn't carry an organisation name.
  const orgName = (ctx.organisation || '').trim() || 'your firm';
  const orgFallback = (ctx.organisation || '').trim() || 'your organisation';
  const region = (ctx.tags || []).find((t) =>
    /(london|south|north|midlands|scotland|wales|ireland|edinburgh|glasgow|manchester|birmingham)/i.test(
      t
    )
  );

  const replacements: Record<string, string> = {
    '{{FirstName}}': firstName,
    '{{Name}}': (ctx.name || firstName).trim(),
    '{{OrganisationName}}': orgName,
    '{{OrganisationFallback}}': orgFallback,
    '{{Organisation}}': orgName,
    '{{Region}}': region || 'your region',
    '{{Role}}': ctx.role || 'you',
    '{{Email}}': ctx.email,
  };

  let out = input;
  for (const [key, val] of Object.entries(replacements)) {
    out = out.split(key).join(val);
  }
  return out;
}
