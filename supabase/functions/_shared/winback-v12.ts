/**
 * winback-v12
 * ───────────────────────────────────────────────────────────────────────
 * Three-touch win-back email sequence sent to EVERY cancellation
 * (including trial cancellers) via the winback_queue / winback-send cron.
 *
 * Tone: founder voice. No marketing copy, no fake urgency, no manipulation.
 * From: Andrew at Elec-Mate <founder@elec-mate.com>
 * Reply-To: founder@elec-mate.com
 *
 * Cadence
 *   Touch 1 — day +1  | sincere check-in, no offer
 *   Touch 2 — day +7  | tier-matched win-back price (forever)
 *   Touch 3 — day +30 | final attempt + what's shipped since they left
 *
 * Pricing (matches Stripe coupons created 2026-05-23)
 *   apprentice   → £3.99/mo forever (£2 off, coupon YhLPdvFl)
 *   electrician  → £9.99/mo forever (£3 off, coupon SSmqkZGn)
 *   other tiers  → no automated offer; touch 2 falls back to a founder note
 */

export const WINBACK_FROM = 'Andrew at Elec-Mate <founder@elec-mate.com>';
export const WINBACK_REPLY_TO = 'founder@elec-mate.com';

// The free-GPT giveaway was removed 2026-08-30 (Andrew's call): it diluted
// touch 1's single ask (the reply) and handed leavers a free substitute for
// a paid pillar.

export interface WinbackContext {
  firstName: string;
  tier: string; // 'apprentice' | 'electrician' | 'employer' | 'business_ai'
  wasTrial: boolean;
  userId: string; // stamped onto the pay link as client_reference_id (see withIdentity)
  accountEmail?: string; // pre-fills Stripe Checkout with the account email
}

// Stripe Payment Links (created 2026-05-23). Direct to Stripe Checkout with the
// win-back promotion code auto-applied via prefilled_promo_code. No edge
// function, no login. We stamp each link per-recipient with client_reference_id
// (via withIdentity) so the webhook reactivates the RIGHT account regardless of
// which email they pay with — matching by email alone silently failed for
// customers whose checkout/personal email differed from their account email.
const PAYMENT_LINK_APPRENTICE =
  'https://buy.stripe.com/fZu28kcZ40MQ2DT1kWbjW08?prefilled_promo_code=MATEWINBACK4';
const PAYMENT_LINK_ELECTRICIAN =
  'https://buy.stripe.com/7sY9AMe38gLO3HXfbMbjW09?prefilled_promo_code=MATEWINBACK10';

export interface WinbackEmail {
  subject: string;
  html: string;
  text: string;
}

// ─── Tier offer mapping ──────────────────────────────────────────────────
function tierOffer(tier: string): {
  hasOffer: boolean;
  newPrice: string;
  oldPrice: string;
  ctaUrl: string;
} {
  if (tier === 'apprentice') {
    return {
      hasOffer: true,
      newPrice: '£3.99',
      oldPrice: '£5.99',
      ctaUrl: PAYMENT_LINK_APPRENTICE,
    };
  }
  if (tier === 'electrician') {
    return {
      hasOffer: true,
      newPrice: '£9.99',
      oldPrice: '£12.99',
      ctaUrl: PAYMENT_LINK_ELECTRICIAN,
    };
  }
  return {
    hasOffer: false,
    newPrice: '',
    oldPrice: '',
    ctaUrl: 'https://www.elec-mate.com/subscriptions',
  };
}

// Stamp a Stripe Payment Link with the buyer's identity. The webhook reads
// client_reference_id first (stripe-subscription-webhook → checkout.session.completed),
// so this links the payment to the correct account even if they pay with a
// different/personal email at checkout. Without it, Stripe creates a customer
// from whatever email they type and the account never reactivates — the exact
// bug that left paying win-back customers stuck behind the paywall. prefilled_email
// nudges them onto their account email and helps avoid duplicate customers.
// Non-Stripe URLs (e.g. /subscriptions) are returned unchanged.
function withIdentity(url: string, ctx: WinbackContext): string {
  if (!ctx.userId || !url.includes('buy.stripe.com')) return url;
  const sep = url.includes('?') ? '&' : '?';
  let stamped = `${url}${sep}client_reference_id=${encodeURIComponent(ctx.userId)}`;
  if (ctx.accountEmail) {
    stamped += `&prefilled_email=${encodeURIComponent(ctx.accountEmail)}`;
  }
  return stamped;
}

// ─── Shared HTML chrome ──────────────────────────────────────────────────
// Matches send-welcome-email (the house look): light slate page, 520px white
// card, navy ink, gold accents. Previously a dark theme — restyled 2026-08-23.
// The three touch bodies inherit this, so their inline colours were remapped to
// suit a light background at the same time. NOTE: gold #F3B70A is a background/
// rule colour only — as TEXT on white it is ~1.4:1, so use #B5840A for gold type.
const LOGO_URL =
  'https://jtwygbeceundfgnkirof.supabase.co/storage/v1/object/public/lead-magnets/onboarding/elec-mate-logo.png';

function shell(opts: { preheader: string; bodyHtml: string }): string {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Elec-Mate</title>
  <style>
    body { margin: 0; padding: 0; width: 100%; background-color: #F4F6F9; }
    a { text-decoration: none; }
    @media screen and (max-width: 480px) {
      .pad { padding-left: 24px !important; padding-right: 24px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <span style="display:none !important; visibility:hidden; mso-hide:all; font-size:1px; color:#F4F6F9; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
    ${escapeHtml(opts.preheader)}
  </span>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F4F6F9;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 520px; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; border: 1px solid #E6E9EE;">
          <tr>
            <td align="left" style="padding: 36px 36px 8px;" class="pad">
              <img src="${LOGO_URL}" alt="Elec-Mate" width="56" height="56" style="display: block; border-radius: 13px; border: 1px solid #E6E9EE;" />
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 36px 28px;" class="pad">
              ${opts.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding: 22px 36px; background-color: #F8FAFC; border-top: 1px solid #E6E9EE;" class="pad">
              <p style="margin: 0 0 6px; font-size: 12px; line-height: 1.6; color: #51606F; text-align: center;">
                You&apos;re getting this because you used to have an Elec-Mate subscription.
              </p>
              <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #51606F; text-align: center;">
                <a href="mailto:founder@elec-mate.com?subject=unsubscribe%20winback" style="color: #51606F; text-decoration: underline;">Stop these emails</a>
                &nbsp;&middot;&nbsp;
                <a href="https://www.elec-mate.com" style="color: #51606F; text-decoration: underline;">elec-mate.com</a>
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 36px 26px; background-color: #F8FAFC;">
              <p style="margin: 0 0 3px; font-size: 12px; font-weight: 600; color: #0C1B2A;">Your trade. Your app.</p>
              <p style="margin: 0; font-size: 11px; color: #8B95A3;">&copy; ${year} Elec-Mate &middot; Made in the UK</p>
            </td>
          </tr></table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// URL → safe href attribute value. Critical: raw `&` between URL query
// params is invalid inside an HTML attribute and several mail clients
// (Gmail in particular) silently strip the href, making links appear
// unclickable. Always escape URLs through this when interpolating into
// href="..." attributes.
function attr(url: string): string {
  return url.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function ctaButton(href: string, label: string): string {
  return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 22px 0;">
  <tr>
    <td align="center">
      <a href="${attr(href)}" style="display: inline-block; padding: 16px 32px; background-color: #facc15; color: #0a0a0a; text-decoration: none; font-weight: 700; font-size: 16px; border-radius: 12px; letter-spacing: -0.01em;">
        ${label}
      </a>
    </td>
  </tr>
</table>`;
}

function p(text: string): string {
  return `<p style="margin: 0 0 16px; font-size: 16px; line-height: 1.65; color: #0C1B2A;">${text}</p>`;
}

function pSmall(text: string): string {
  return `<p style="margin: 0 0 14px; font-size: 14px; line-height: 1.6; color: #51606F;">${text}</p>`;
}

function h1(text: string): string {
  return `<h1 style="margin: 0 0 18px; font-size: 27px; font-weight: 800; line-height: 1.12; color: #0C1B2A; letter-spacing: -0.5px;">${text}</h1>`;
}

function sig(): string {
  return `
<p style="margin: 22px 0 4px; font-size: 16px; font-weight: 600; line-height: 1.5; color: #0C1B2A;">Andrew</p>
<p style="margin: 0; font-size: 13px; line-height: 1.5; color: #51606F;">Founder, Elec-Mate</p>`;
}

// ─── Touch 1 — Day +1, sincere check-in, no offer ────────────────────────
export function winbackTouch1(ctx: WinbackContext): WinbackEmail {
  const name = ctx.firstName || 'mate';

  const subject = ctx.wasTrial
    ? `Quick one, ${name} — trial didn't land?`
    : `${name}, sorry to see you go`;

  const preheader = ctx.wasTrial
    ? "If something didn't click, I'd love to know what — reply to this email."
    : 'Reply and tell me what went wrong. I read every one.';

  const opening = ctx.wasTrial
    ? "Saw your trial wrapped without you keeping the account going."
    : 'Saw you cancelled your Elec-Mate subscription this week.';

  const bodyHtml = `
${h1(ctx.wasTrial ? `Quick one, ${escapeHtml(name)}.` : `Sorry to see you go, ${escapeHtml(name)}.`)}
${p('Andrew here. ' + opening)}
${p('No hard feelings — but I&rsquo;d genuinely love to know why. Two reasons:')}
<ul style="margin: 0 0 16px; padding-left: 22px; font-size: 16px; line-height: 1.7; color: #0C1B2A;">
  <li>If something&rsquo;s broken, I want to fix it.</li>
  <li>If something&rsquo;s missing, I want to build it.</li>
</ul>
${p('Just hit reply on this email. One line is plenty. It comes straight to my inbox — I&rsquo;m in the trade myself, so I&rsquo;ll know exactly what you mean.')}
${p('Most weeks something ships in Elec-Mate because somebody told me what was wrong or missing. Your one line genuinely changes the app.')}
${pSmall('Your account and all your data — certs, quotes, customers, the lot — are safe for 90 days. If you change your mind, everything&rsquo;s still there waiting.')}
${sig()}`;

  const text = [
    ctx.wasTrial ? `Quick one, ${name}.` : `Sorry to see you go, ${name}.`,
    '',
    `Andrew here. ${opening}`,
    '',
    "No hard feelings — but I'd genuinely love to know why. Two reasons:",
    '',
    "- If something's broken, I want to fix it",
    "- If something's missing, I want to build it",
    '',
    "Just hit reply on this email. One line is plenty. It comes straight to my inbox — I'm in the trade myself, so I'll know exactly what you mean.",
    '',
    'Most weeks something ships in Elec-Mate because somebody told me what was wrong or missing. Your one line genuinely changes the app.',
    '',
    "Your account and all your data — certs, quotes, customers, the lot — are safe for 90 days. If you change your mind, everything's still there waiting.",
    '',
    'Andrew',
    'Founder, Elec-Mate',
  ].join('\n');

  return { subject, html: shell({ preheader, bodyHtml }), text };
}

// ─── Touch 2 — Day +7, the offer ─────────────────────────────────────────
export function winbackTouch2(ctx: WinbackContext): WinbackEmail {
  const name = ctx.firstName || 'mate';
  const offer = tierOffer(ctx.tier);

  // Prefer the pre-signed one-click reactivation URL when we have one —
  // takes the user straight to Stripe Checkout, no login, no extra page.
  const primaryCtaUrl = withIdentity(offer.ctaUrl, ctx);

  // Tier with no automated offer → founder-note variant
  if (!offer.hasOffer) {
    const subject = `${name}, anything I can do to bring you back?`;
    const preheader =
      'No offer to dangle on your tier — just an honest ask from the founder.';

    const bodyHtml = `
${h1(`${escapeHtml(name)}, anything I can do?`)}
${p("It&rsquo;s been a week. Just wanted to check in honestly — I know your plan doesn&rsquo;t have an off-the-shelf discount I can quietly knock together, so this isn&rsquo;t a marketing email.")}
${p("If there&rsquo;s a price, a feature or a fix that would have kept you on, tell me. I&rsquo;ll see what I can actually do.")}
${ctaButton(offer.ctaUrl, 'See your plans →')}
${pSmall('Or just hit reply — straight to my inbox.')}
${sig()}`;

    const text = [
      `${name}, anything I can do?`,
      '',
      "It's been a week. Just wanted to check in honestly — I know your plan doesn't have an off-the-shelf discount I can quietly knock together, so this isn't a marketing email.",
      '',
      "If there's a price, a feature or a fix that would have kept you on, tell me. I'll see what I can actually do.",
      '',
      `See your plans: ${offer.ctaUrl}`,
      '',
      'Or just hit reply — straight to my inbox.',
      '',
      'Andrew',
      'Founder, Elec-Mate',
    ].join('\n');

    return { subject, html: shell({ preheader, bodyHtml }), text };
  }

  const subject = `${name}, your old account at ${offer.newPrice}/mo`;
  const preheader = `Was ${offer.oldPrice}/mo. Now ${offer.newPrice}/mo forever if you want it. All your data is still there.`;

  // Cost-vs-value anchor — what they actually get for that money,
  // versus piecing the same workflow together from disconnected tools.
  const valueListHtml =
    ctx.tier === 'apprentice'
      ? `
<ul style="margin: 0 0 18px; padding-left: 22px; font-size: 15px; line-height: 1.8; color: #0C1B2A;">
  <li>Level 2 / 3 / AM2 / HNC mock exams &amp; 500+ practice questions</li>
  <li>75 curated training videos, 29 flashcard sets, BS 7671 study guide</li>
  <li>75 calculators (cable, Zs, voltage drop, three-phase, EV…)</li>
  <li>Ask Dave AI mentor + circuit / code / installation AI helpers</li>
  <li>Site diary, OJT logbook, portfolio builder, EPA simulator</li>
</ul>`
      : `
<ul style="margin: 0 0 18px; padding-left: 22px; font-size: 15px; line-height: 1.8; color: #0C1B2A;">
  <li>19 certificate types (EICR, EIC, Minor Works, PAT, solar, fire alarm…)</li>
  <li>70+ calculators + live materials pricing + price book</li>
  <li>Quote + invoice builder, customer CRM, photo docs, expenses with OCR</li>
  <li>RAMS generator with 1000+ hazard database</li>
  <li>8 AI specialists (circuit designer, cost engineer, commissioning…)</li>
  <li>Voice-to-form on site + Xero / QuickBooks sync</li>
</ul>`;

  const compareLabel =
    ctx.tier === 'apprentice'
      ? 'vs ~£40–60/mo for a college add-on subscription + separate revision app'
      : 'vs ~£60–120/mo for separate cert software + CRM + quote tool + accounting connector';

  const bodyHtml = `
${h1(`${escapeHtml(name)}, want your old account back at ${escapeHtml(offer.newPrice)}/mo?`)}
${p("It&rsquo;s been a week since you cancelled. I&rsquo;ve been thinking about it.")}
${p(`If you want to come back, I&rsquo;ve locked in a price just for you:`)}
<div style="margin: 4px 0 22px; padding: 22px; background: linear-gradient(135deg, rgba(250,204,21,0.10), rgba(250,204,21,0.02)); border: 1px solid rgba(250,204,21,0.30); border-radius: 14px;">
  <p style="margin: 0 0 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #B5840A;">Your win-back price</p>
  <p style="margin: 0 0 6px; font-size: 36px; font-weight: 800; line-height: 1; color: #0C1B2A; letter-spacing: -0.02em;">
    ${escapeHtml(offer.newPrice)}<span style="font-size: 16px; font-weight: 500; color: #0C1B2A;">/month</span>
  </p>
  <p style="margin: 0; font-size: 13px; color: #0C1B2A;">
    Was <span style="text-decoration: line-through; opacity: 0.7;">${escapeHtml(offer.oldPrice)}</span>
    · Locked in for as long as you stay subscribed
  </p>
</div>

<p style="margin: 0 0 10px; font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #B5840A;">What you get for ${escapeHtml(offer.newPrice)}/month</p>
${valueListHtml}
<p style="margin: -4px 0 22px; font-size: 13px; line-height: 1.6; color: #0C1B2A;">
  <em style="opacity: 0.9;">${escapeHtml(compareLabel)}.</em>
</p>

${p('No tricks. No 3-month teaser that goes back up. Just the cheapest price I can do without losing money on you.')}
${p('All your old data, customers, certs and quotes are still there — they&rsquo;ve been sat waiting for you.')}
${ctaButton(primaryCtaUrl, `Come back at ${offer.newPrice}/mo →`)}
${pSmall(offer.hasOffer
  ? 'One click takes you straight to Stripe — no logging in, no faffing about. The discount is already on.'
  : 'If now isn&rsquo;t the time, no stress — this won&rsquo;t be the last email but it won&rsquo;t be spammy either.'
)}
${sig()}`;

  const text = [
    `${name}, want your old account back at ${offer.newPrice}/mo?`,
    '',
    "It's been a week since you cancelled. I've been thinking about it.",
    '',
    'If you want to come back, I have locked in a price just for you:',
    '',
    `${offer.newPrice}/month — was ${offer.oldPrice}. Locked in for as long as you stay subscribed.`,
    '',
    'No tricks. No 3-month teaser that goes back up. Just the cheapest price I can do without losing money on you.',
    '',
    'All your old data, customers, certs and quotes are still there.',
    '',
    `Come back at ${offer.newPrice}/mo: ${primaryCtaUrl}`,
    '',
    "If now isn't the time, no stress.",
    '',
    'Andrew',
    'Founder, Elec-Mate',
  ].join('\n');

  return { subject, html: shell({ preheader, bodyHtml }), text };
}

// ─── Touch 3 — Day +30, final attempt ────────────────────────────────────
export function winbackTouch3(ctx: WinbackContext): WinbackEmail {
  const name = ctx.firstName || 'mate';
  const offer = tierOffer(ctx.tier);
  const primaryCtaUrl = withIdentity(offer.ctaUrl, ctx);

  const subject = offer.hasOffer
    ? `Last one, ${name} — ${offer.newPrice}/mo still good for 7 days`
    : `Last one, ${name}`;

  const preheader = offer.hasOffer
    ? `Final shout — ${offer.newPrice}/mo forever still on the table for a week.`
    : 'Final shout. We&apos;ve been busy since you left.';

  const offerBlock = offer.hasOffer
    ? `<div style="margin: 4px 0 22px; padding: 18px; background-color: rgba(250,204,21,0.06); border-left: 3px solid #facc15; border-radius: 10px;">
        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #0C1B2A;">
          Your <strong style="color: #B5840A;">${escapeHtml(offer.newPrice)}/month forever</strong> price is still good — but only for the next <strong>7 days</strong>.
        </p>
      </div>`
    : '';

  const bodyHtml = `
${h1(offer.hasOffer ? `Last one, ${escapeHtml(name)}.` : `Last one, ${escapeHtml(name)}.`)}
${p("This is the last email I&rsquo;ll send about coming back. Promise.")}
${p('In the month since you cancelled, the team has shipped:')}
<ul style="margin: 0 0 18px; padding-left: 22px; font-size: 15px; line-height: 1.75; color: #0C1B2A;">
  <li>Board schedules built straight from your certs — a full A4 for the client and a CU door label, nothing retyped</li>
  <li>Certificates print properly everywhere — test notes, supply tails, three-phase boards, page numbers</li>
  <li>Quotes autosave as you build them, line items reorder, and you can see when a client opens your invoice</li>
  <li>Hundreds of new Study Centre questions — AM2, Level 3, emergency lighting updated to BS EN 1838:2024</li>
</ul>
${offerBlock}
${ctaButton(primaryCtaUrl, offer.hasOffer ? `Reactivate at ${offer.newPrice}/mo →` : 'Take another look →')}
${pSmall(
  offer.hasOffer
    ? 'If it&rsquo;s a no, all good — thanks for trying us. Best of luck out there.'
    : 'If it&rsquo;s a no, all good — thanks for trying us.'
)}
${sig()}`;

  const text = [
    `Last one, ${name}.`,
    '',
    "This is the last email I'll send about coming back. Promise.",
    '',
    "In the month since you cancelled, we've shipped:",
    '- Board schedules built straight from your certs — a full A4 for the client and a CU door label, nothing retyped',
    '- Certificates print properly everywhere — test notes, supply tails, three-phase boards, page numbers',
    '- Quotes autosave as you build them, line items reorder, and you can see when a client opens your invoice',
    '- Hundreds of new Study Centre questions — AM2, Level 3, emergency lighting updated to BS EN 1838:2024',
    '',
    offer.hasOffer
      ? `Your ${offer.newPrice}/month forever price is still good — but only for the next 7 days.`
      : '',
    '',
    `${offer.hasOffer ? `Reactivate at ${offer.newPrice}/mo` : 'Take another look'}: ${primaryCtaUrl}`,
    '',
    "If it's a no, all good — thanks for trying us.",
    '',
    'Andrew',
    'Founder, Elec-Mate',
  ]
    .filter(Boolean)
    .join('\n');

  return { subject, html: shell({ preheader, bodyHtml }), text };
}
