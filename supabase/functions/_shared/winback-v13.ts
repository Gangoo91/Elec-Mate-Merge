/**
 * winback-v13
 * ───────────────────────────────────────────────────────────────────────
 * Three-touch win-back email sequence sent to EVERY cancellation
 * (including trial cancellers) via the winback_queue / winback-send cron.
 * Mobile (App Store / Play Store) cancellers are enqueued by
 * revenuecat-webhook at CANCELLATION time with touches anchored to the
 * period expiry, so these land right as access ends.
 *
 * Tone: founder voice. No marketing copy, no fake urgency, no manipulation.
 * From: Andrew at Elec-Mate <founder@elec-mate.com>
 * Reply-To: founder@elec-mate.com
 *
 * Cadence
 *   Touch 1 — day +1  | sincere check-in, no offer
 *   Touch 2 — day +7  | 25% off for life, tier-matched
 *   Touch 3 — day +30 | final attempt + what's shipped since they left
 *
 * Offer (Stripe assets created 2026-07-17)
 *   25% off FOR LIFE via coupon sSf4XaAS / promo code WINBACK25,
 *   applied on the 2026 prices:
 *     apprentice   → £5.24/mo forever (list £6.99)
 *     electrician  → £14.99/mo forever (list £19.99)
 *   Yearly-tier cancellers are offered the matching monthly plan.
 *   Other tiers (employer, business_ai) → founder-note variant, no offer.
 *
 * v12 offer (£3.99/£9.99 amount-off coupons on pre-Jun-2026 prices) is
 * superseded; its promo codes MATEWINBACK4/MATEWINBACK10 remain live in
 * Stripe for anyone still holding an old email.
 */

export const WINBACK_FROM = 'Andrew at Elec-Mate <founder@elec-mate.com>';
export const WINBACK_REPLY_TO = 'founder@elec-mate.com';

// Free ChatGPT GPT — useful goodwill hook for ex-users. Even users who
// never resubscribe become distribution if they share it with a mate.
const GPT_URL = 'https://chatgpt.com/g/g-6a106f9478f88191a5a3baf2740fff85-elec-mate';
const GPT_SHARE_TEXT = encodeURIComponent(
  'Free electrician AI on ChatGPT — built by Elec-Mate. Regs, calcs, fault-finding. Worth a look: ' +
    GPT_URL
);
const GPT_WHATSAPP_SHARE = `https://wa.me/?text=${GPT_SHARE_TEXT}`;

export interface WinbackContext {
  firstName: string;
  tier: string; // 'apprentice' | 'electrician' | 'employer' | 'business_ai' (+ _yearly variants)
  wasTrial: boolean;
  userId: string; // stamped onto the pay link as client_reference_id (see withIdentity)
  accountEmail?: string; // pre-fills Stripe Checkout with the account email
}

// Stripe Payment Links (created 2026-07-17) on the 2026 monthly prices with
// the WINBACK25 promotion code (25% off forever) auto-applied via
// prefilled_promo_code. No edge function, no login. We stamp each link
// per-recipient with client_reference_id (via withIdentity) so the webhook
// reactivates the RIGHT account regardless of which email they pay with —
// matching by email alone silently failed for customers whose
// checkout/personal email differed from their account email.
const PAYMENT_LINK_APPRENTICE =
  'https://buy.stripe.com/4gMaEQcZ49jm6U9e7IbjW0d?prefilled_promo_code=WINBACK25';
const PAYMENT_LINK_ELECTRICIAN =
  'https://buy.stripe.com/28E00c5wC2UY2DT9RsbjW0e?prefilled_promo_code=WINBACK25';

export interface WinbackEmail {
  subject: string;
  html: string;
  text: string;
}

// ─── Tier offer mapping ──────────────────────────────────────────────────
// 25% off for life on the 2026 monthly prices. Yearly cancellers get the
// matching monthly offer — a "for life" discount makes no sense to gate
// behind the annual commitment they just walked away from.
function tierOffer(tier: string): {
  hasOffer: boolean;
  newPrice: string;
  oldPrice: string;
  ctaUrl: string;
} {
  const t = (tier || '').toLowerCase();
  if (t.startsWith('apprentice')) {
    return {
      hasOffer: true,
      newPrice: '£5.24',
      oldPrice: '£6.99',
      ctaUrl: PAYMENT_LINK_APPRENTICE,
    };
  }
  if (t.startsWith('electrician')) {
    return {
      hasOffer: true,
      newPrice: '£14.99',
      oldPrice: '£19.99',
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
// Mobile-safe table layout, dark theme matching the app, single column,
// preheader (hidden) for the inbox preview line.
const LOGO_URL = 'https://www.elec-mate.com/logo.jpg';

function shell(opts: { preheader: string; bodyHtml: string }): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Elec-Mate</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <span style="display:none !important; visibility:hidden; mso-hide:all; font-size:1px; color:#0a0a0a; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
    ${escapeHtml(opts.preheader)}
  </span>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #111111; border-radius: 16px; overflow: hidden; border: 1px solid #262626;">
          <tr>
            <td style="padding: 32px 28px 12px; text-align: center;">
              <img src="${LOGO_URL}" alt="Elec-Mate" width="120" style="display: block; margin: 0 auto; max-width: 120px; height: auto; border: 0;" />
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 28px 24px;">
              ${opts.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding: 22px 28px 28px; border-top: 1px solid #1f1f1f;">
              <p style="margin: 0 0 6px; font-size: 12px; line-height: 1.6; color: #ffffff; text-align: center;">
                You&apos;re getting this because you used to have an Elec-Mate subscription.
              </p>
              <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #ffffff; text-align: center;">
                <a href="mailto:founder@elec-mate.com?subject=unsubscribe%20winback" style="color: #ffffff; text-decoration: underline;">Stop these emails</a>
                &nbsp;·&nbsp;
                <a href="https://www.elec-mate.com" style="color: #ffffff; text-decoration: underline;">elec-mate.com</a>
              </p>
            </td>
          </tr>
        </table>
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
  return `<p style="margin: 0 0 16px; font-size: 16px; line-height: 1.65; color: #ffffff;">${text}</p>`;
}

function pSmall(text: string): string {
  return `<p style="margin: 0 0 14px; font-size: 14px; line-height: 1.6; color: #ffffff;">${text}</p>`;
}

function h1(text: string): string {
  return `<h1 style="margin: 0 0 18px; font-size: 24px; font-weight: 700; line-height: 1.25; color: #ffffff; letter-spacing: -0.01em;">${text}</h1>`;
}

function sig(): string {
  return `
<p style="margin: 22px 0 4px; font-size: 16px; line-height: 1.5; color: #ffffff;">Andrew</p>
<p style="margin: 0; font-size: 14px; line-height: 1.5; color: #ffffff;">Founder, Elec-Mate</p>`;
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
    ? 'Saw your trial wrapped without you keeping the account going.'
    : 'Saw you cancelled your Elec-Mate subscription.';

  const bodyHtml = `
${h1(ctx.wasTrial ? `Quick one, ${escapeHtml(name)}.` : `Sorry to see you go, ${escapeHtml(name)}.`)}
${p('Andrew here. ' + opening)}
${p('No hard feelings — but I&rsquo;d genuinely love to know why. Two reasons:')}
<ul style="margin: 0 0 16px; padding-left: 22px; font-size: 16px; line-height: 1.7; color: #ffffff;">
  <li>If something&rsquo;s broken, I want to fix it.</li>
  <li>If something&rsquo;s missing, I want to build it.</li>
</ul>
${p('Just hit reply on this email. One line is plenty. It comes straight to my inbox — I&rsquo;m a working spark too, so I&rsquo;ll know what you mean.')}

<!-- Free GPT — goodwill + share angle -->
<div style="margin: 26px 0 18px; padding: 22px; background-color: #181818; border: 1px solid #2a2a2a; border-radius: 14px;">
  <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #facc15;">Even if you don&rsquo;t come back</p>
  <p style="margin: 0 0 10px; font-size: 17px; font-weight: 700; line-height: 1.3; color: #ffffff;">
    Use the free Elec-Mate AI on ChatGPT.
  </p>
  <p style="margin: 0 0 14px; font-size: 14px; line-height: 1.6; color: #ffffff;">
    Custom GPT I built for the trade — BS 7671 lookups, cable calcs, fault-finding, regs questions. Forever free, no Elec-Mate login needed.
  </p>
  <table role="presentation" cellspacing="0" cellpadding="0">
    <tr>
      <td style="padding-right: 8px;">
        <a href="${attr(GPT_URL)}" style="display: inline-block; padding: 12px 20px; background-color: #facc15; color: #0a0a0a; text-decoration: none; font-weight: 700; font-size: 14px; border-radius: 10px;">
          Open the GPT →
        </a>
      </td>
      <td>
        <a href="${attr(GPT_WHATSAPP_SHARE)}" style="display: inline-block; padding: 12px 18px; background-color: transparent; color: #facc15; text-decoration: none; font-weight: 600; font-size: 14px; border: 1px solid rgba(250,204,21,0.35); border-radius: 10px;">
          Share with a mate
        </a>
      </td>
    </tr>
  </table>
</div>

${pSmall('Your account and all your data are safe for 90 days. If you change your mind, everything&rsquo;s still there waiting.')}
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
    "Just hit reply on this email. One line is plenty. It comes straight to my inbox — I'm a working spark too, so I'll know what you mean.",
    '',
    "Even if you don't come back, here's something I built for the trade — free, no Elec-Mate login needed:",
    '',
    'The Elec-Mate GPT on ChatGPT — regs lookups, cable calcs, fault-finding.',
    GPT_URL,
    '',
    `If you find it useful, share it with a mate: ${GPT_URL}`,
    '',
    "Your account and all your data are safe for 90 days. If you change your mind, everything's still there waiting.",
    '',
    'Andrew',
    'Founder, Elec-Mate',
  ].join('\n');

  return { subject, html: shell({ preheader, bodyHtml }), text };
}

// ─── Touch 2 — Day +7, the offer: 25% off for life ───────────────────────
export function winbackTouch2(ctx: WinbackContext): WinbackEmail {
  const name = ctx.firstName || 'mate';
  const offer = tierOffer(ctx.tier);

  // Prefer the pre-signed one-click reactivation URL when we have one —
  // takes the user straight to Stripe Checkout, no login, no extra page.
  const primaryCtaUrl = withIdentity(offer.ctaUrl, ctx);

  // Tier with no automated offer → founder-note variant
  if (!offer.hasOffer) {
    const subject = `${name}, anything I can do to bring you back?`;
    const preheader = 'No offer to dangle on your tier — just an honest ask from the founder.';

    const bodyHtml = `
${h1(`${escapeHtml(name)}, anything I can do?`)}
${p('It&rsquo;s been a week. Just wanted to check in honestly — I know your plan doesn&rsquo;t have an off-the-shelf discount I can quietly knock together, so this isn&rsquo;t a marketing email.')}
${p('If there&rsquo;s a price, a feature or a fix that would have kept you on, tell me. I&rsquo;ll see what I can actually do.')}
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

  const subject = `${name}, 25% off for life if you come back`;
  const preheader = `${offer.newPrice}/mo instead of ${offer.oldPrice} — for as long as you stay. All your data is still there.`;

  // Cost-vs-value anchor — what they actually get for that money,
  // versus piecing the same workflow together from disconnected tools.
  const valueListHtml = ctx.tier.startsWith('apprentice')
    ? `
<ul style="margin: 0 0 18px; padding-left: 22px; font-size: 15px; line-height: 1.8; color: #ffffff;">
  <li>Level 2 / 3 / AM2 / HNC mock exams &amp; 500+ practice questions</li>
  <li>75 curated training videos, 29 flashcard sets, BS 7671 study guide</li>
  <li>75 calculators (cable, Zs, voltage drop, three-phase, EV…)</li>
  <li>Ask Dave AI mentor + circuit / code / installation AI helpers</li>
  <li>Site diary, OJT logbook, portfolio builder, EPA simulator</li>
</ul>`
    : `
<ul style="margin: 0 0 18px; padding-left: 22px; font-size: 15px; line-height: 1.8; color: #ffffff;">
  <li>19 certificate types (EICR, EIC, Minor Works, PAT, solar, fire alarm…)</li>
  <li>70+ calculators + live materials pricing + price book</li>
  <li>Quote + invoice builder, customer CRM, photo docs, expenses with OCR</li>
  <li>RAMS generator with 1000+ hazard database</li>
  <li>9 AI specialists (circuit designer, cost engineer, commissioning…)</li>
  <li>Voice-to-form on site + Xero / QuickBooks sync</li>
</ul>`;

  const compareLabel = ctx.tier.startsWith('apprentice')
    ? 'vs ~£40–60/mo for a college add-on subscription + separate revision app'
    : 'vs ~£60–120/mo for separate cert software + CRM + quote tool + accounting connector';

  const bodyHtml = `
${h1(`${escapeHtml(name)}, come back at 25% off — for life.`)}
${p('It&rsquo;s been a week since you cancelled. I&rsquo;ve been thinking about it.')}
${p(`If you want to come back, I&rsquo;ve locked in a price just for you:`)}
<div style="margin: 4px 0 22px; padding: 22px; background: linear-gradient(135deg, rgba(250,204,21,0.10), rgba(250,204,21,0.02)); border: 1px solid rgba(250,204,21,0.30); border-radius: 14px;">
  <p style="margin: 0 0 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #facc15;">25% off — for life</p>
  <p style="margin: 0 0 6px; font-size: 36px; font-weight: 800; line-height: 1; color: #ffffff; letter-spacing: -0.02em;">
    ${escapeHtml(offer.newPrice)}<span style="font-size: 16px; font-weight: 500; color: #ffffff;">/month</span>
  </p>
  <p style="margin: 0; font-size: 13px; color: #ffffff;">
    Instead of <span style="text-decoration: line-through; opacity: 0.7;">${escapeHtml(offer.oldPrice)}</span>
    · Never goes up, for as long as you stay subscribed
  </p>
</div>

<p style="margin: 0 0 10px; font-size: 13px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #facc15;">What you get for ${escapeHtml(offer.newPrice)}/month</p>
${valueListHtml}
<p style="margin: -4px 0 22px; font-size: 13px; line-height: 1.6; color: #ffffff;">
  <em style="opacity: 0.9;">${escapeHtml(compareLabel)}.</em>
</p>

${p('No tricks. No 3-month teaser that goes back up. 25% off every month, forever, as long as you keep the subscription.')}
${p('All your old data, customers, certs and quotes are still there — they&rsquo;ve been sat waiting for you.')}
${ctaButton(primaryCtaUrl, `Come back at ${offer.newPrice}/mo →`)}
${pSmall('One click takes you straight to Stripe — no logging in, no faffing about. The discount is already on.')}
${sig()}`;

  const text = [
    `${name}, come back at 25% off — for life.`,
    '',
    "It's been a week since you cancelled. I've been thinking about it.",
    '',
    'If you want to come back, I have locked in a price just for you:',
    '',
    `${offer.newPrice}/month instead of ${offer.oldPrice} — 25% off for life. Never goes up, for as long as you stay subscribed.`,
    '',
    'No tricks. No 3-month teaser that goes back up. 25% off every month, forever.',
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
    ? `Last one, ${name} — 25% off for life still good for 7 days`
    : `Last one, ${name}`;

  const preheader = offer.hasOffer
    ? `Final shout — ${offer.newPrice}/mo for life still on the table for a week.`
    : 'Final shout. We&apos;ve been busy since you left.';

  const offerBlock = offer.hasOffer
    ? `<div style="margin: 4px 0 22px; padding: 18px; background-color: rgba(250,204,21,0.06); border-left: 3px solid #facc15; border-radius: 10px;">
        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #ffffff;">
          Your <strong style="color: #facc15;">25% off for life</strong> price — <strong>${escapeHtml(offer.newPrice)}/month instead of ${escapeHtml(offer.oldPrice)}</strong> — is still good, but only for the next <strong>7 days</strong>.
        </p>
      </div>`
    : '';

  const bodyHtml = `
${h1(`Last one, ${escapeHtml(name)}.`)}
${p('This is the last email I&rsquo;ll send about coming back. Promise.')}
${p('Since you cancelled, the team has shipped:')}
<ul style="margin: 0 0 18px; padding-left: 22px; font-size: 15px; line-height: 1.75; color: #ffffff;">
  <li>A <a href="${attr(GPT_URL)}" style="color: #facc15;">free Elec-Mate GPT on ChatGPT</a> for the whole trade — regs, calcs, fault-finding, no login needed</li>
  <li>Client CRM that builds itself from your quotes, invoices and certs</li>
  <li>MCS heat pump certification + renewables workflows</li>
  <li>Faster cert generation with smart pre-fill from previous jobs</li>
  <li>E-signatures on danger notices and quotes</li>
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
    "Since you cancelled, we've shipped:",
    `- A free Elec-Mate GPT on ChatGPT for the whole trade — regs, calcs, fault-finding, no login: ${GPT_URL}`,
    '- Client CRM that builds itself from your quotes, invoices and certs',
    '- MCS heat pump certification + renewables workflows',
    '- Faster cert generation with smart pre-fill from previous jobs',
    '- E-signatures on danger notices and quotes',
    '',
    offer.hasOffer
      ? `Your 25% off for life price — ${offer.newPrice}/month instead of ${offer.oldPrice} — is still good, but only for the next 7 days.`
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
