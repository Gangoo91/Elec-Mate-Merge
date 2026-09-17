/* ==========================================================================
   staff-access-email — the branded "your Elec-Mate access is live" email
   sent to every account created through Admin → Bulk create when the admin
   asks for it. Same light editorial template as send-welcome-email so the
   two look like they came from the same place.

   Tailored per batch (college / organisation name, who asked, learner code)
   and per person (first name, email, temporary password).
   ========================================================================== */

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://jtwygbeceundfgnkirof.supabase.co';
const ASSET_BASE = `${SUPABASE_URL}/storage/v1/object/public/lead-magnets/onboarding`;
const LOGO_URL = `${ASSET_BASE}/elec-mate-logo.png`;
const PDF_URL = `${ASSET_BASE}/Elec-Mate-Getting-Started.pdf`;
const LOGIN_URL = 'https://app.elec-mate.com/auth/signin';
const SIGNUP_URL = 'https://app.elec-mate.com/signup';
const RESET_URL = 'https://app.elec-mate.com/auth/forgot-password';

export interface StaffAccessEmailInput {
  email: string;
  password: string;
  /** College or organisation the batch is for, e.g. "Newcastle and Stafford Colleges Group". */
  orgName: string;
  /** First name of the person who asked for the accounts, e.g. "Sam". Optional. */
  requester?: string | null;
  /** Learner discount code for the college, e.g. "NSCG50". Optional. */
  learnerCode?: string | null;
  /** Electrician-tier discount code for the same college, e.g. "NSCGELEC50". Optional. */
  electricianCode?: string | null;
  /** First name; derived from the email address when not given. */
  firstName?: string | null;
  /**
   * Nobody asked for the account: Andrew offered it so the tutor can judge the
   * app for themselves. The opening never claims a request that was not made.
   */
  offered?: boolean;
  /**
   * The person already had an Elec-Mate account: nothing was created, their
   * account was switched to free access. No password is sent; they keep theirs.
   */
  existingAccount?: boolean;
  /**
   * Optional opening clause that replaces the generated one, e.g. "Good to talk
   * on Friday". Written so that ", so I've set you up…" follows naturally.
   */
  intro?: string | null;
  /**
   * The account is for an employer (contractor, FM firm, DNO…) looking at the
   * app for their own electricians and apprentices, not a college tutor.
   * Changes the eyebrow, the "why free" line and the learner wording.
   */
  employer?: boolean;
}

export interface StaffAccessEmail {
  subject: string;
  html: string;
  text: string;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** "sam.obrien@x" → "Sam", "riley.potts1@x" → "Riley", "info@x" → "there". */
export function firstNameFromEmail(email: string): string {
  const local = email.split('@')[0] || '';
  const first = local.split(/[._\-+]/)[0].replace(/\d+$/g, '');
  if (!first || first.length < 2) return 'there';
  const generic = ['info', 'admin', 'office', 'hello', 'contact', 'sales', 'enquiries', 'mail'];
  if (generic.includes(first.toLowerCase())) return 'there';
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
}

const ITEMS: Array<{ t: string; d: string }> = [
  {
    t: 'Study Centre',
    d: 'Level 2 and Level 3 learning, 20,000+ practice questions, mock exams and AM2 preparation',
  },
  {
    t: 'Certificates & testing',
    d: 'EICR, EIC, Minor Works, PAT, fire alarm and more, as your learners will meet them on site',
  },
  {
    t: 'AI tools & calculators',
    d: 'Specialist agents, the board scanner and 65 BS 7671 calculators',
  },
  {
    t: 'Business suite',
    d: 'Quotes, invoices, customers and getting paid, for the ones heading self-employed',
  },
];

function whoAsked(
  requester: string | null | undefined,
  firstName: string,
  orgName: string,
  offered?: boolean
) {
  if (offered) return "I said I'd sooner you saw it for yourself than took my word for it";
  const r = (requester || '').trim();
  if (r && r.toLowerCase() === firstName.toLowerCase()) {
    return `You asked for accounts for the electrical team at ${orgName}`;
  }
  if (r) return `${r} asked for accounts for the electrical team at ${orgName}`;
  return `${orgName} asked for accounts for its electrical team`;
}

export function buildStaffAccessEmail(input: StaffAccessEmailInput): StaffAccessEmail {
  const firstName = (input.firstName || '').trim() || firstNameFromEmail(input.email);
  const org = input.orgName.trim();
  const code = (input.learnerCode || '').trim().toUpperCase();
  const ecode = (input.electricianCode || '').trim().toUpperCase();
  const year = new Date().getFullYear();
  const font =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  const intro =
    (input.intro || '').trim() ||
    (input.employer
      ? 'You said it was worth a look'
      : whoAsked(input.requester, firstName, org, input.offered));
  const grant = input.existingAccount
    ? 'switched your existing account to full access to Elec-Mate'
    : 'set you up with full access to Elec-Mate';
  const whyFree = input.employer
    ? "Why free? You employ the people this is built for, and I'd sooner you judged it yourself than took my word for it. Everything a paying electrician has, you have too. If it turns out to be useful for your team, the codes below are theirs; if not, no harm done."
    : input.offered
      ? "Why free? You're training the next lot of electricians, and nothing here depends on you doing anything with it. Everything a paying electrician has, you have too. If it turns out to help your learners, the code below is there; if not, no harm done."
      : "Why free? You're training the next lot of electricians, and I'd rather you saw exactly what your learners see than take my word for it. Everything a paying electrician has, you have too.";

  const listRows = ITEMS.map(
    (item) => `
      <tr><td valign="top" style="padding: 0 0 14px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
          <td width="20" valign="top" style="padding-top: 5px;"><div style="width: 7px; height: 7px; border-radius: 2px; background-color: #F3B70A;"></div></td>
          <td valign="top">
            <p style="margin: 0; font-size: 15px; font-weight: 600; color: #0C1B2A; line-height: 1.4;">${item.t}</p>
            <p style="margin: 2px 0 0; font-size: 13px; color: #51606F; line-height: 1.5;">${item.d}</p>
          </td>
        </tr></table>
      </td></tr>`
  ).join('');

  const codeLink = (c: string) =>
    `<strong style="color: #0C1B2A;">${esc(c)}</strong> (<a href="${SIGNUP_URL}?offer=${encodeURIComponent(c)}" style="color: #0C1B2A; font-weight: 600; text-decoration: underline;">link</a>)`;
  const guide = `The Getting Started guide is <a href="${PDF_URL}" style="color: #0C1B2A; font-weight: 600; text-decoration: underline;">here</a> if you want a quick tour first.`;
  const p = (inner: string) =>
    `<p style="margin: 0 0 6px; font-size: 15px; color: #51606F; line-height: 1.62;">${inner}</p>`;
  // Two codes when the college has both: learners on the Apprentice tier and
  // qualified electricians on their upskilling courses on the Electrician tier.
  const appLine =
    "Once you've had a look yourself, anyone signing up with a code can download the Elec-Mate app from the App Store or Google Play and use the same login on their phone, at home or on site.";
  const learnersLine =
    input.employer && code && ecode
      ? p(
          `Two codes for ${esc(org)}, both for as long as they keep it. Your electricians: ${codeLink(ecode)}, 40% off, £11.99 a month instead of £19.99 — £2.77 a week. Your apprentices: ${codeLink(code)}, 30% off, £4.89 a month instead of £6.99 — £1.13 a week. Each person signs up themselves and the code takes the money off; nothing for the company to set up or pay.`
        ) +
        p(appLine) +
        p(guide)
      : code && ecode
        ? p(
            `Two codes for your centre, both half price for as long as they keep it. Learners on Level 2, Level 3 and NVQ courses: ${codeLink(code)}, £3.50 a month. Qualified electricians on your 18th Edition, 2391 and EV courses: ${codeLink(ecode)}, £9.99 a month on the electrician tier.`
          ) +
          p(appLine) +
          p(guide)
        : code
          ? p(
              `Your learners get 50% off for as long as they keep their subscription with the code ${codeLink(code)}. ${appLine} ${guide}`
            )
          : p(guide);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Your Elec-Mate access is live</title>
  <style>
    body { margin: 0; padding: 0; width: 100%; background-color: #F4F6F9; }
    a { text-decoration: none; }
    @media screen and (max-width: 480px) { .pad { padding-left: 24px !important; padding-right: 24px !important; } }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F9; font-family: ${font}; -webkit-font-smoothing: antialiased;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F4F6F9;">
    <tr><td align="center" style="padding: 40px 16px;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 520px; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid #E6E9EE;">

        <tr><td align="left" style="padding: 36px 36px 8px;" class="pad">
          <img src="${LOGO_URL}" alt="Elec-Mate" width="56" height="56" style="display: block; border-radius: 13px; border: 1px solid #E6E9EE;">
        </td></tr>

        <tr><td align="left" style="padding: 18px 36px 0;" class="pad">
          <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: #B5840A;">${input.employer ? 'Employer access' : 'Tutor access'}</p>
          <h1 style="margin: 0 0 18px; font-size: 27px; font-weight: 800; color: #0C1B2A; line-height: 1.12; letter-spacing: -0.5px;">Your Elec-Mate<br>access is live</h1>
          <p style="margin: 0 0 14px; font-size: 15px; color: #0C1B2A; line-height: 1.5;">Hi ${esc(firstName)},</p>
          <p style="margin: 0 0 14px; font-size: 15px; color: #51606F; line-height: 1.62;">${esc(intro)}, so I've ${grant}, free of charge${input.employer ? '' : ", for as long as you're teaching"}.</p>
          <p style="margin: 0 0 24px; font-size: 15px; color: #51606F; line-height: 1.62;">${esc(whyFree)}</p>
        </td></tr>

        <tr><td style="padding: 0 36px 26px;" class="pad">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FFFAEC; border: 1px solid #EFD489; border-radius: 14px;">
            <tr><td style="padding: 20px 22px;">
              <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: #B5840A;">Your login</p>
              <p style="margin: 0 0 4px; font-size: 15px; color: #0C1B2A; line-height: 1.6;">Email: <strong>${esc(input.email)}</strong></p>
              ${
                input.existingAccount
                  ? `<p style="margin: 0 0 18px; font-size: 13px; color: #51606F; line-height: 1.55;">Sign in with the password you already use for Elec-Mate. Forgotten it? <a href="${RESET_URL}" style="color: #0C1B2A; font-weight: 600; text-decoration: underline;">Reset it here</a>. The mobile app on the App Store and Google Play works with the same details.</p>`
                  : `<p style="margin: 0 0 6px; font-size: 15px; color: #0C1B2A; line-height: 1.6;">Temporary password: <strong style="font-family: Menlo, Consolas, 'Courier New', monospace; font-size: 16px; letter-spacing: 0.5px;">${esc(input.password)}</strong></p>
              <p style="margin: 0 0 18px; font-size: 13px; color: #51606F; line-height: 1.55;">Please change it on first login under Settings &rarr; Security. The mobile app on the App Store and Google Play works with the same details.</p>`
              }
              <a href="${LOGIN_URL}" style="display: inline-block; padding: 13px 24px; background-color: #0C1B2A; color: #FFFFFF; font-size: 14px; font-weight: 700; border-radius: 10px;">Sign in to Elec-Mate</a>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding: 0 36px 4px;" class="pad">
          <p style="margin: 0 0 14px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: #0C1B2A;">What you have access to</p>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">${listRows}</table>
        </td></tr>

        <tr><td style="padding: 8px 36px 0;" class="pad">
          <p style="margin: 0 0 14px; font-size: 15px; color: #51606F; line-height: 1.62;">If you think anything could be better, missing, wrong, or just annoying, email me at <a href="mailto:founder@elec-mate.com" style="color: #0C1B2A; font-weight: 600; text-decoration: underline;">founder@elec-mate.com</a>. I'm an electrician, I built this, and I'm very receptive to feedback from people ${input.employer ? 'running electrical firms' : 'teaching the trade'}.</p>
          ${learnersLine}
        </td></tr>

        <tr><td align="left" style="padding: 16px 36px 32px;" class="pad">
          <a href="${LOGIN_URL}" style="display: inline-block; padding: 15px 32px; background-color: #F3B70A; color: #0C1B2A; font-size: 15px; font-weight: 700; border-radius: 11px;">Open Elec-Mate</a>
        </td></tr>

        <tr><td style="padding: 22px 36px; background-color: #F8FAFC; border-top: 1px solid #E6E9EE;" class="pad">
          <p style="margin: 0; font-size: 13px; color: #51606F; line-height: 1.55;">Questions, or not sure where something is? Just reply to this email. It comes straight to Andrew, the founder, and he reads every one.</p>
        </td></tr>
        <tr><td align="center" style="padding: 18px 36px 26px; background-color: #F8FAFC;">
          <p style="margin: 0 0 3px; font-size: 12px; font-weight: 600; color: #0C1B2A;">Your trade. Your app.</p>
          <p style="margin: 0; font-size: 11px; color: #8B95A3;">&copy; ${year} Elec-Mate &middot; Made in the UK</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    `Hi ${firstName},`,
    '',
    `${intro}, so I've ${grant}, free of charge${input.employer ? '' : ", for as long as you're teaching"}. ${whyFree}`,
    '',
    'Your login',
    `Email: ${input.email}`,
    ...(input.existingAccount
      ? [`Sign in: ${LOGIN_URL}`, `Use the password you already have. Forgotten it? ${RESET_URL}`]
      : [
          `Temporary password: ${input.password}`,
          `Sign in: ${LOGIN_URL}`,
          'Please change it on first login under Settings > Security. The mobile app works with the same details.',
        ]),
    '',
    'What you have access to: Study Centre (Level 2/3, mock exams, AM2 prep) · Certificates & testing · AI tools & calculators · Business suite.',
    '',
    "If you think anything could be better, email me at founder@elec-mate.com. I'm very receptive to feedback.",
    input.employer && code && ecode
      ? `\nYour electricians: ${ecode} (40% off, £11.99/mo — £2.77 a week): ${SIGNUP_URL}?offer=${encodeURIComponent(ecode)}\nYour apprentices: ${code} (30% off, £4.89/mo — £1.13 a week): ${SIGNUP_URL}?offer=${encodeURIComponent(code)}\nEach person signs up themselves; nothing for the company to set up or pay.`
      : code
        ? `\nLearners get 50% off for as long as they keep their subscription with code ${code}: ${SIGNUP_URL}?offer=${encodeURIComponent(code)}${ecode ? `\nQualified electricians on your courses get 50% off the electrician tier with code ${ecode}: ${SIGNUP_URL}?offer=${encodeURIComponent(ecode)}` : ''}\nOnce you've had a look yourself, anyone signing up with a code can download the Elec-Mate app from the App Store or Google Play and use the same login on their phone.`
        : '',
    `Getting Started guide: ${PDF_URL}`,
    '',
    'Andrew Moore, Founder, Elec-Mate',
  ].join('\n');

  return {
    subject: `${firstName === 'there' ? 'Your' : `${firstName}, your`} Elec-Mate access is live`,
    html,
    text,
  };
}
