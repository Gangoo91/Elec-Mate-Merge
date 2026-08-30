// V11 — incomplete-signup ("abandoned checkout") campaign.
//
// Replaces V10, which had three faults that made it unsendable by August 2026:
//   1. `V10_DEADLINE_LABEL` was the hardcoded string 'Sunday 26 April'. Every
//      send after that date carried a deadline four months in the past, in the
//      hero pill *and* the P.S.
//   2. The strikethrough said the electrician tier "normally" costs £14.99.
//      It has been £19.99 since the June rise, so the email understated its own
//      discount — 33% off when the real number is 50%.
//   3. It promised "Android is landing in the next few days". Play has been
//      live for months.
//
// The deadline here is COMPUTED from the send date (see `deadlineLabel`), so
// fault 1 cannot recur no matter how long the campaign sits unsent. Prices are
// pulled from ONE table below rather than being inlined at each mention.
//
// VISUAL LANGUAGE — light and branded, matching send-welcome-email and the
// Getting Started PDF. V10 was black-on-black; that reads as a different
// company to the one whose welcome email these people already have in their
// inbox, and dark marketing mail renders badly in Outlook and in Gmail's
// light theme. Same palette tokens as the welcome email, deliberately:
//   ink #0C1B2A · muted #51606F · gold #F3B70A · deep gold #B5840A
//   page #F4F6F9 · card #FFFFFF · hairline #E6E9EE
//   highlight #FFFAEC on #EFD489 · footer band #F8FAFC
// Buttons carry the same VML fallback so they render as buttons in Outlook.

export type SignupRole = 'electrician' | 'apprentice';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://jtwygbeceundfgnkirof.supabase.co';
const ASSET_BASE = `${SUPABASE_URL}/storage/v1/object/public/lead-magnets/onboarding`;
const LOGO_URL = `${ASSET_BASE}/elec-mate-logo.png`;

const APP_STORE_URL = 'https://apps.apple.com/gb/app/elec-mate/id6758948665';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.elecmate.app';
const UNSUBSCRIBE_MAILTO = 'mailto:info@elec-mate.com?subject=unsubscribe';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

// Palette — single source, so a brand tweak is one edit rather than sixty.
const INK = '#0C1B2A';
const MUTED = '#51606F';
const GOLD = '#F3B70A';
const GOLD_DEEP = '#B5840A';
const PAGE = '#F4F6F9';
const CARD = '#FFFFFF';
const HAIRLINE = '#E6E9EE';
const HIGHLIGHT_BG = '#FFFAEC';
const HIGHLIGHT_BORDER = '#EFD489';
const FOOTER_BG = '#F8FAFC';
const FOOTER_MUTED = '#8B95A3';

/**
 * List price and launch price per tier, in one place.
 *
 * `listPrice` MUST track `src/data/stripePrices.ts`. `launchPrice` MUST track
 * the Stripe payment link behind STRIPE_LAUNCH_{ELECTRICIAN,APPRENTICE}_URL —
 * verified live 2026-08-30 as plink_1TMoQL… (£9.99) and plink_1T1Wvr… (£4.99).
 * If either is changed in Stripe, change it here in the same commit: an email
 * quoting one number and a checkout charging another is worse than no email.
 */
const PRICING: Record<SignupRole, { list: string; launch: string; tier: string }> = {
  electrician: { list: '£19.99', launch: '£9.99', tier: 'Electrician' },
  apprentice: { list: '£6.99', launch: '£4.99', tier: 'Apprentice' },
};

/**
 * The campaign's fixed close date: end of September 2026 (Andrew's call).
 *
 * A single date across the whole cohort means the main email and the day-3
 * nudge always quote the same deadline, and someone forwarding it to a mate
 * doesn't get a different date to the one they were sent.
 */
const CAMPAIGN_END = new Date('2026-09-30T23:59:59+01:00');

/**
 * The deadline the email prints.
 *
 * Normally the fixed campaign close date above. But V10's whole failure mode
 * was a hardcoded deadline string that stayed in the template four months
 * after it expired, so this function REFUSES to print a date in the past: once
 * the campaign end has gone by, it falls back to the next Sunday at least five
 * days out. Whatever else happens, the email cannot advertise a dead deadline.
 *
 * Five days rather than seven so a Monday send doesn't skip to the Sunday
 * eleven days away, which is too far out to feel like a deadline at all.
 */
export function deadlineLabel(from: Date = new Date()): string {
  if (from.getTime() < CAMPAIGN_END.getTime()) return ukDate(CAMPAIGN_END);

  const d = new Date(from.getTime());
  d.setHours(0, 0, 0, 0);
  const daysToSunday = (7 - d.getDay()) % 7 || 7;
  d.setDate(d.getDate() + (daysToSunday < 5 ? daysToSunday + 7 : daysToSunday));
  return ukDate(d);
}

/** "Wednesday 30 September" — UK long form, no year, London time. */
function ukDate(d: Date): string {
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/London',
  });
}

export function v11Subject(firstName: string, role: SignupRole): string {
  const { list, launch } = PRICING[role];
  return `${launch} instead of ${list}, ${firstName}`;
}

/**
 * Nudge subject. Takes the deadline label so it can never drift from the body —
 * it used to say "closes Sunday" while the campaign now closes on a Wednesday.
 * The weekday is stripped because "closes 30 September" is shorter in an inbox
 * list, where the subject gets truncated on a phone.
 */
export function v11NudgeSubject(firstName: string, deadline: string): string {
  const dayAndMonth = deadline.replace(/^\w+day\s+/, '');
  return `Re: ${firstName} — closes ${dayAndMonth}`;
}

function unsubscribeFooter(unsubscribeUrl: string): string {
  const href = unsubscribeUrl.startsWith('https://') ? unsubscribeUrl : UNSUBSCRIBE_MAILTO;
  return `<p style="margin: 8px 0 0; font-size: 11px; color: ${FOOTER_MUTED}; line-height: 1.5;">You're receiving this because you created an account at elec-mate.com. <a href="${href}" style="color: ${FOOTER_MUTED}; text-decoration: underline;">Unsubscribe</a></p>`;
}

/** Gold CTA with the Outlook VML fallback the welcome email uses. */
function goldButton(href: string, label: string, widthPx: number): string {
  return `<!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:52px;v-text-anchor:middle;width:${widthPx}px;" arcsize="22%" fillcolor="${GOLD}">
                <w:anchorlock/><center style="color:${INK};font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">${label}</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${href}" style="display: inline-block; padding: 15px 30px; background-color: ${GOLD}; color: ${INK}; font-size: 15px; font-weight: 700; border-radius: 11px; text-decoration: none;">${label}</a>
              <!--<![endif]-->`;
}

/**
 * Three rows, not eight. Each is written as the first thing this person would
 * do with the app tonight, in the second person — not a capability listed in
 * the abstract. They have already read the feature list; they didn't buy.
 */
function firstMoves(role: SignupRole): { title: string; sub: string }[] {
  return role === 'electrician'
    ? [
        {
          title: 'Point it at the last board you worked on',
          sub: 'The scanner reads the circuits off the photo and fills your schedule of tests in. Roughly twenty minutes off an EICR, every EICR.',
        },
        {
          title: 'Finish a cert in the van, not at the kitchen table',
          sub: 'EICR, EIC, Minor Works, EV, Solar, Fire Alarm &mdash; fifteen types, all on BS 7671 A4:2026. Branded PDF out to the customer before you&rsquo;ve left the drive.',
        },
        {
          title: 'Price the next job while you&rsquo;re still stood in it',
          sub: 'Live UK wholesaler prices behind the quote builder. Quote to invoice to paid, without opening a laptop.',
        },
      ]
    : [
        {
          title: 'Sit a timed AM2 mock tonight',
          sub: 'Real exam conditions on your phone, with worked explanations on every answer you get wrong.',
        },
        {
          title: 'Turn your break into revision',
          sub: '20,000+ practice questions and 28 flashcard decks, sorted by topic. Ten minutes in the van counts.',
        },
        {
          title: 'Stop dreading the portfolio',
          sub: 'Site diary and OJT logbook tied to your coursework, with evidence upload and assessor sign-off. Audit-ready as you go.',
        },
      ];
}

export function generateV11HTML(
  firstName: string,
  role: SignupRole,
  paymentUrl: string,
  deadline: string,
  unsubscribeUrl: string
): string {
  const { list, launch, tier } = PRICING[role];
  const year = new Date().getFullYear();

  // Gold square bullets, exactly as the welcome email lists them.
  const listRows = firstMoves(role)
    .map(
      (f) => `
                <tr>
                  <td valign="top" style="padding: 0 0 14px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="20" valign="top" style="padding-top: 5px;">
                          <div style="width: 7px; height: 7px; border-radius: 2px; background-color: ${GOLD};"></div>
                        </td>
                        <td valign="top">
                          <p style="margin: 0; font-size: 15px; font-weight: 600; color: ${INK}; line-height: 1.4;">${f.title}</p>
                          <p style="margin: 2px 0 0; font-size: 13px; color: ${MUTED}; line-height: 1.5;">${f.sub}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`
    )
    .join('');

  // Preheader: the line beside the subject in the inbox list. V10 had none, so
  // clients scraped "Ends Sunday 26 April" out of the hero pill instead.
  const preheader = `You got as far as the card and stopped. Half price until ${deadline} if you want to finish it.`;

  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${launch} instead of ${list}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <style>table {border-collapse: collapse;} td,th,div,p,a,h1,h2,h3 {font-family: Arial, sans-serif;}</style>
  <![endif]-->
  <style>
    body { margin: 0; padding: 0; width: 100%; background-color: ${PAGE}; }
    a { text-decoration: none; }
    @media screen and (max-width: 480px) {
      .pad { padding-left: 24px !important; padding-right: 24px !important; }
      .price { font-size: 44px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${PAGE}; font-family: ${FONT}; -webkit-font-smoothing: antialiased;">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; color: transparent; height: 0; width: 0;">${preheader}</div>
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${PAGE};">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 520px; background-color: ${CARD}; border-radius: 18px; overflow: hidden; border: 1px solid ${HAIRLINE};">

          <!-- Header — logo, as on the welcome email -->
          <tr>
            <td align="left" style="padding: 36px 36px 8px;" class="pad">
              <img src="${LOGO_URL}" alt="Elec-Mate" width="56" height="56" style="display: block; border-radius: 13px; border: 1px solid ${HAIRLINE};">
            </td>
          </tr>

          <!-- Eyebrow + headline -->
          <tr>
            <td align="left" style="padding: 18px 36px 0;" class="pad">
              <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: ${GOLD_DEEP};">Half price until ${deadline}</p>
              <h1 style="margin: 0 0 18px; font-size: 27px; font-weight: 800; color: ${INK}; line-height: 1.12; letter-spacing: -0.5px;">Come on then.<br>Let&rsquo;s get you in.</h1>

              <!-- Opener. Deliberately does NOT tell them they were right to
                   stop: validating the hesitation and then asking them to
                   overcome it argues against our own CTA. -->
              <p style="margin: 0 0 14px; font-size: 15px; color: ${INK}; line-height: 1.5;">Hi ${firstName},</p>
              <p style="margin: 0 0 14px; font-size: 15px; color: ${MUTED}; line-height: 1.62;">You got as far as the card and stopped. I&rsquo;d guess that&rsquo;s because you had nothing much to go on yet &mdash; a price, a list of features, and my word for it.</p>
              <p style="margin: 0 0 24px; font-size: 15px; color: ${MUTED}; line-height: 1.62;">So here&rsquo;s something to go on. <strong style="color: ${INK};">Half price &mdash; ${launch} a month instead of ${list}</strong> &mdash; held at ${launch} for as long as you stay subscribed. Not an intro rate that jumps in three months. It just stays.</p>
            </td>
          </tr>

          <!-- Price card -->
          <tr>
            <td style="padding: 0 36px;" class="pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${HIGHLIGHT_BG}; border: 1px solid ${HIGHLIGHT_BORDER}; border-radius: 14px;">
                <tr>
                  <td align="center" style="padding: 22px 24px 24px;">
                    <p style="margin: 0 0 10px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: ${GOLD_DEEP};">Elec-Mate ${tier}</p>
                    <p style="margin: 0 0 2px; font-size: 13px; color: ${MUTED}; line-height: 1.4;"><span style="text-decoration: line-through;">${list}/mo</span>&nbsp; everyone else</p>
                    <p class="price" style="margin: 0; font-size: 52px; font-weight: 800; color: ${INK}; line-height: 1.05; letter-spacing: -1.4px;">${launch}<span style="font-size: 19px; font-weight: 600; color: ${MUTED};">/mo</span></p>
                    <p style="margin: 12px 0 20px; font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: ${MUTED};">Locked in &middot; Cancel anytime</p>
                    ${goldButton(paymentUrl, `Get in for ${launch}/month`, 230)}
                    <p style="margin: 14px 0 0; font-size: 12px; color: ${MUTED};">Secure checkout via Stripe &middot; No code to enter</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What you'd do tonight -->
          <tr>
            <td style="padding: 30px 36px 4px;" class="pad">
              <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: ${INK};">What you&rsquo;d do tonight</p>
              <p style="margin: 0 0 16px; font-size: 13px; color: ${MUTED}; line-height: 1.55;">Not the full list &mdash; you&rsquo;ve seen that. Just the three things that&rsquo;d change your week.</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                ${listRows}
              </table>
            </td>
          </tr>

          <!-- The actual objection: getting back out again -->
          <tr>
            <td style="padding: 8px 36px 0;" class="pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${FOOTER_BG}; border: 1px solid ${HAIRLINE}; border-radius: 14px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <p style="margin: 0 0 6px; font-size: 14px; font-weight: 700; color: ${INK};">Getting back out is two taps</p>
                    <p style="margin: 0; font-size: 13px; color: ${MUTED}; line-height: 1.6;">Subscriptions &rarr; Cancel. No phone call, no email to a retention team, nobody ringing you up to talk you round. If it&rsquo;s not earning its ${launch} in the first month, cancel it and I&rsquo;ll have deserved that.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Stores — both live as of August 2026 -->
          <tr>
            <td align="center" style="padding: 26px 36px 0;" class="pad">
              <p style="margin: 0 0 12px; font-size: 13px; color: ${MUTED}; line-height: 1.55;">Use the button above to lock your rate in, then sign in on your phone or the web.</p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto;">
                <tr>
                  <td style="padding: 0 4px;"><a href="${APP_STORE_URL}" style="display: inline-block; padding: 10px 16px; background-color: ${CARD}; border: 1px solid ${HAIRLINE}; border-radius: 10px; font-size: 13px; font-weight: 600; color: ${INK};">&#63743;&nbsp;&nbsp;App Store</a></td>
                  <td style="padding: 0 4px;"><a href="${PLAY_STORE_URL}" style="display: inline-block; padding: 10px 16px; background-color: ${CARD}; border: 1px solid ${HAIRLINE}; border-radius: 10px; font-size: 13px; font-weight: 600; color: ${INK};">&#9654;&nbsp;&nbsp;Google Play</a></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Referral perk -->
          <tr>
            <td style="padding: 26px 36px 0;" class="pad">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${HIGHLIGHT_BG}; border: 1px solid ${HIGHLIGHT_BORDER}; border-radius: 14px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: ${GOLD_DEEP};">Once you&rsquo;re in</p>
                    <p style="margin: 0 0 6px; font-size: 16px; font-weight: 700; color: ${INK}; line-height: 1.3;">Bring a mate and it gets cheaper still</p>
                    <p style="margin: 0; font-size: 13px; color: ${MUTED}; line-height: 1.6;">Every mate who signs up knocks a month off your bill &mdash; up to two months free. Each referral is also an entry into the &pound;100 monthly draw, and not many people have referred yet, so the odds are genuinely good.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sign-off -->
          <tr>
            <td style="padding: 26px 36px 30px;" class="pad">
              <p style="margin: 0 0 2px; font-size: 15px; color: ${INK};">Cheers,</p>
              <p style="margin: 0 0 16px; font-size: 15px; font-weight: 700; color: ${INK};">Andrew <span style="font-weight: 400; color: ${MUTED};">&middot; Founder, Elec-Mate</span></p>
              <p style="margin: 0; font-size: 13px; color: ${MUTED}; line-height: 1.62;"><strong style="color: ${INK};">P.S.</strong> ${deadline} is a real date, not a countdown that resets. After it, the ${tier} tier is ${list} like it is for everyone else. If something&rsquo;s stopping you that isn&rsquo;t the price, hit reply &mdash; it comes to me, and I&rsquo;ll answer it myself.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px 36px 26px; background-color: ${FOOTER_BG}; border-top: 1px solid ${HAIRLINE};">
              <p style="margin: 0 0 3px; font-size: 12px; font-weight: 600; color: ${INK};">Your trade. Your app.</p>
              <p style="margin: 0; font-size: 11px; color: ${FOOTER_MUTED};">&copy; ${year} Elec-Mate &middot; Made in the UK</p>
              ${unsubscribeFooter(unsubscribeUrl)}
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Plain-text alternative. V10 shipped HTML-only, which costs deliverability at
 * Gmail and renders as an empty message in text-only clients.
 */
export function generateV11PlainText(
  firstName: string,
  role: SignupRole,
  paymentUrl: string,
  deadline: string,
  unsubscribeUrl: string
): string {
  const { list, launch, tier } = PRICING[role];
  const moves = firstMoves(role)
    .map((f) => `* ${decode(f.title)}\n  ${decode(f.sub)}`)
    .join('\n\n');

  return `Hi ${firstName},

You got as far as the card and stopped. I'd guess that's because you had nothing much to go on yet - a price, a list of features, and my word for it.

So here's something to go on. Half price - ${launch} a month instead of ${list} - held at ${launch} for as long as you stay subscribed. Not an intro rate that jumps in three months. It just stays.

Get in for ${launch}/month:
${paymentUrl}

Half price until ${deadline}. Secure checkout via Stripe, no code to enter.

WHAT YOU'D DO TONIGHT

${moves}

GETTING BACK OUT IS TWO TAPS
Subscriptions > Cancel. No phone call, no email to a retention team. If it's not earning its ${launch} in the first month, cancel it and I'll have deserved that.

Cheers,
Andrew - Founder, Elec-Mate

P.S. ${deadline} is a real date, not a countdown that resets. After it, the ${tier} tier is ${list} like it is for everyone else. If something's stopping you that isn't the price, hit reply - it comes to me, and I'll answer it myself.

--
You're receiving this because you created an account at elec-mate.com.
Unsubscribe: ${unsubscribeUrl}`;
}

/**
 * Day-3 nudge. Same brand furniture (logo, card, gold link) but stripped right
 * back: no price card, no feature list, no store buttons. The point of a second
 * touch is that it doesn't look like the first one.
 */
export function generateV11NudgeHTML(
  firstName: string,
  role: SignupRole,
  paymentUrl: string,
  deadline: string,
  unsubscribeUrl: string
): string {
  const { launch } = PRICING[role];
  const year = new Date().getFullYear();
  const preheader = `${launch} closes ${deadline}. Two taps and you're in.`;

  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Closes ${deadline}</title>
  <!--[if mso]>
  <style>table {border-collapse: collapse;} td,th,div,p,a,h1,h2,h3 {font-family: Arial, sans-serif;}</style>
  <![endif]-->
  <style>
    body { margin: 0; padding: 0; width: 100%; background-color: ${PAGE}; }
    a { text-decoration: none; }
    @media screen and (max-width: 480px) {
      .pad { padding-left: 24px !important; padding-right: 24px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${PAGE}; font-family: ${FONT}; -webkit-font-smoothing: antialiased;">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; color: transparent; height: 0; width: 0;">${preheader}</div>
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${PAGE};">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 520px; background-color: ${CARD}; border-radius: 18px; overflow: hidden; border: 1px solid ${HAIRLINE};">

          <tr>
            <td align="left" style="padding: 32px 36px 4px;" class="pad">
              <img src="${LOGO_URL}" alt="Elec-Mate" width="44" height="44" style="display: block; border-radius: 11px; border: 1px solid ${HAIRLINE};">
            </td>
          </tr>

          <tr>
            <td align="left" style="padding: 20px 36px 0;" class="pad">
              <p style="margin: 0 0 14px; font-size: 15px; color: ${INK}; line-height: 1.6;">${firstName},</p>
              <p style="margin: 0 0 14px; font-size: 15px; color: ${MUTED}; line-height: 1.62;">Andrew again &mdash; once more and then I&rsquo;ll leave you alone.</p>
              <p style="margin: 0 0 22px; font-size: 15px; color: ${MUTED}; line-height: 1.62;">The ${launch} rate closes <strong style="color: ${INK};">${deadline}</strong>. If you meant to come back to it and it slipped, this is the link:</p>
            </td>
          </tr>

          <tr>
            <td align="left" style="padding: 0 36px 22px;" class="pad">
              ${goldButton(paymentUrl, `Get in for ${launch}/month`, 230)}
            </td>
          </tr>

          <tr>
            <td align="left" style="padding: 0 36px 30px;" class="pad">
              <p style="margin: 0 0 14px; font-size: 15px; color: ${MUTED}; line-height: 1.62;">And if it&rsquo;s just not for you, that&rsquo;s absolutely fine &mdash; unsubscribe below and I&rsquo;ll stop.</p>
              <p style="margin: 0; font-size: 15px; font-weight: 700; color: ${INK};">Andrew</p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 18px 36px 24px; background-color: ${FOOTER_BG}; border-top: 1px solid ${HAIRLINE};">
              <p style="margin: 0; font-size: 11px; color: ${FOOTER_MUTED};">&copy; ${year} Elec-Mate &middot; Made in the UK</p>
              ${unsubscribeFooter(unsubscribeUrl)}
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function generateV11NudgePlainText(
  firstName: string,
  role: SignupRole,
  paymentUrl: string,
  deadline: string,
  unsubscribeUrl: string
): string {
  const { launch } = PRICING[role];
  return `${firstName},

Andrew again - once more and then I'll leave you alone.

The ${launch} rate closes ${deadline}. If you meant to come back to it and it slipped, this is the link:

${paymentUrl}

And if it's just not for you, that's absolutely fine - unsubscribe below and I'll stop.

Andrew

--
Unsubscribe: ${unsubscribeUrl}`;
}

/** Strip the HTML entities used in the feature copy for the plain-text build. */
function decode(s: string): string {
  return s
    .replace(/&mdash;/g, '-')
    .replace(/&ndash;/g, '-')
    .replace(/&rsquo;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&pound;/g, '£')
    .replace(/&rarr;/g, '->');
}
