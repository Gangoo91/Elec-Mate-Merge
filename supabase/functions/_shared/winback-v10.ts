// Shared V10 email template + send infrastructure.
// Used by send-winback-offer (trial-expired electricians) and send-early-access-invite
// (waitlist signups who never created accounts).
//
// Exports:
//   generateV10HTML(variant, firstName, unsubscribeUrl)
//   generateV10PlainText(variant, firstName, unsubscribeUrl)
//   hmacSign, buildUnsubscribeUrl, buildUnsubscribeHeaders, isSuppressed
//   TokenBucket, sendBatchWithRetry
//   FROM_V10, REPLY_TO, UNSUBSCRIBE_MAILTO, RESEND_RPS, BATCH_MAX

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResendLike = any;

export const FROM_V10 = 'Andrew from Elec-Mate <founder@elec-mate.com>';
export const REPLY_TO = 'founder@elec-mate.com';
export const UNSUBSCRIBE_MAILTO = 'mailto:info@elec-mate.com?subject=unsubscribe';
export const RESEND_RPS = 5;
export const BATCH_MAX = 100;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class TokenBucket {
  private tokens: number;
  private lastRefill: number;
  constructor(
    private max: number,
    private refillPerSec: number
  ) {
    this.tokens = max;
    this.lastRefill = Date.now();
  }
  private refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.max, this.tokens + elapsed * this.refillPerSec);
    this.lastRefill = now;
  }
  async acquire(cost = 1): Promise<void> {
    for (;;) {
      this.refill();
      if (this.tokens >= cost) {
        this.tokens -= cost;
        return;
      }
      await sleep(Math.ceil(((cost - this.tokens) / this.refillPerSec) * 1000));
    }
  }
}

function b64urlEncode(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function hmacSign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return b64urlEncode(new Uint8Array(sig));
}

export async function buildUnsubscribeUrl(email: string): Promise<string> {
  const secret = Deno.env.get('WINBACK_UNSUBSCRIBE_SECRET');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  if (!secret || !supabaseUrl) {
    console.warn(
      'WINBACK_UNSUBSCRIBE_SECRET or SUPABASE_URL missing — falling back to mailto unsubscribe'
    );
    return UNSUBSCRIBE_MAILTO;
  }
  const payload = JSON.stringify({
    email: email.toLowerCase().trim(),
    issued_at: Math.floor(Date.now() / 1000),
  });
  const payloadB64 = b64urlEncode(new TextEncoder().encode(payload));
  const sig = await hmacSign(payloadB64, secret);
  return `${supabaseUrl}/functions/v1/unsubscribe?token=${payloadB64}.${sig}`;
}

export function buildUnsubscribeHeaders(unsubscribeUrl: string): Record<string, string> {
  const isHttps = unsubscribeUrl.startsWith('https://');
  const headers: Record<string, string> = {
    'List-Unsubscribe': isHttps
      ? `<${unsubscribeUrl}>, <${UNSUBSCRIBE_MAILTO}>`
      : `<${UNSUBSCRIBE_MAILTO}>`,
  };
  if (isHttps) headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click';
  return headers;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function isSuppressed(supabaseAdmin: any, email: string): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from('email_suppressions')
    .select('email')
    .eq('email', email.toLowerCase().trim())
    .maybeSingle();
  if (error) {
    console.error('isSuppressed check failed (failing open):', error);
    return false;
  }
  return !!data;
}

export interface ResendBatchItem {
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
  headers?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags?: any[];
}

export async function sendBatchWithRetry(
  resend: ResendLike,
  rateLimiter: TokenBucket,
  emails: ResendBatchItem[],
  idempotencyKey: string,
  maxAttempts = 3
): Promise<{ ids: (string | null)[]; error: string | null }> {
  let attempt = 0;
  let backoff = 1000;
  while (attempt < maxAttempts) {
    await rateLimiter.acquire(1);
    try {
      const { data, error } = await resend.batch.send(emails, { idempotencyKey });
      if (error) {
        const msg = error.message || String(error);
        const statusCode = error.statusCode || error.status || 0;
        if (statusCode === 429 || (statusCode >= 500 && statusCode < 600)) {
          console.warn(
            `batch send attempt ${attempt + 1} retryable (${statusCode}): ${msg} — backoff ${backoff}ms`
          );
          await sleep(backoff);
          backoff *= 4;
          attempt++;
          continue;
        }
        console.error(`batch send attempt ${attempt + 1} non-retryable (${statusCode}): ${msg}`);
        return { ids: emails.map(() => null), error: msg };
      }
      const arr = data?.data;
      if (Array.isArray(arr) && arr.length === emails.length) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return { ids: arr.map((r: any) => r?.id || null), error: null };
      }
      console.warn('Unexpected Resend batch response shape', data);
      return { ids: emails.map(() => null), error: 'Unexpected response shape' };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`batch send attempt ${attempt + 1} threw: ${msg} — backoff ${backoff}ms`);
      await sleep(backoff);
      backoff *= 4;
      attempt++;
    }
  }
  return { ids: emails.map(() => null), error: 'Max retries exceeded' };
}

function escapeHtmlEmail(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export type V10Variant = 'winback' | 'early_access';

function v10Intro(
  variant: V10Variant,
  firstName: string
): { h1: string; sub: string; greeting: string } {
  const safeName = escapeHtmlEmail(firstName);
  if (variant === 'early_access') {
    return {
      h1: "We've shipped.",
      sub: 'Thanks for signing up early &mdash; the app is live on the App Store and the web, and a lot has shipped. Here&#x27;s the short version:',
      greeting: `Hey ${safeName} &mdash; Andrew here. I&#x27;m the founder. I&#x27;m reaching out because you were one of the first people to sign up for Elec-Mate, and a lot has shipped since then. If you&#x27;ve got any questions, reply to this email &mdash; it comes straight to me.`,
    };
  }
  return {
    h1: "We've been building.",
    sub: `Hey ${safeName} &mdash; a lot has shipped since your trial. Here&#x27;s what&#x27;s new.`,
    greeting: `Hey ${safeName} &mdash; Andrew here. I&#x27;m the founder. I&#x27;m reaching out personally because a lot has genuinely changed since you signed up. If you&#x27;ve got any questions, just reply to this email &mdash; it comes straight to me.`,
  };
}

export function generateV10HTML(
  variant: V10Variant,
  firstName: string,
  unsubscribeUrl: string
): string {
  const paymentLink = 'https://buy.stripe.com/aFaeV69MSanq7Yd3t4bjW07';
  const appStoreUrl = 'https://apps.apple.com/gb/app/elec-mate/id6758948665';
  // 3x source (750x249) rendered at 180x60 in HTML — crisp on retina inboxes
  const appStoreBadge =
    'https://toolbox.marketingtools.apple.com/api/badges/download-on-the-app-store/black/en-gb?size=750x249';
  const logoUrl = 'https://www.elec-mate.com/images/elec-mate-logo-512.png';
  const founderPhoto = 'https://www.elec-mate.com/images/andrew-moore.jpeg';
  const year = new Date().getFullYear();
  const safeUnsub = escapeHtmlEmail(unsubscribeUrl);
  const { h1, sub, greeting } = v10Intro(variant, firstName);
  const preheader =
    variant === 'early_access'
      ? "You signed up early. It's live. £9.99/mo — £5 less than the App Store."
      : '16 certificates redesigned. Invoices rebuilt. New Room Planner. £9.99/mo — £5 less than the App Store.';

  // Typography palette:
  //   #ffffff — headlines, CTA, price, stat numbers
  //   #f4f4f5 — body copy, subheads, supporting text (near-white, high contrast)
  //   #d4d4d8 — captions, small labels (slightly muted but still readable)
  //   #a1a1aa — footer unsubscribe link only
  //   #71717a — footer copyright / meta only
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
<img src="${logoUrl}" alt="Elec-Mate — Your trade. Your app." width="120" height="120" style="display:block;border-radius:22px">
</td></tr>

<tr><td style="height:36px;line-height:36px;font-size:0">&nbsp;</td></tr>

<tr><td align="center" style="padding:0 32px">
<h1 style="margin:0;font-size:38px;font-weight:700;color:#ffffff;line-height:1.08;letter-spacing:-0.7px">${h1}</h1>
</td></tr>

<tr><td style="height:14px;line-height:14px;font-size:0">&nbsp;</td></tr>

<tr><td align="center" style="padding:0 40px">
<p style="margin:0;font-size:17px;color:#f4f4f5;line-height:1.5">${sub}</p>
</td></tr>

<tr><td style="height:40px;line-height:40px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>

<!-- Features — flat layout -->
<tr><td style="padding:0 32px">

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:26px"><tr>
<td width="52" valign="top" style="width:52px">
<div style="width:44px;height:44px;background:#fbbf24;border-radius:11px;text-align:center;line-height:44px;font-size:22px">&#x26A1;</div>
</td>
<td style="padding-left:14px">
<div style="margin:0 0 6px">
<span style="display:inline-block;padding:3px 10px;background:#fbbf24;border-radius:20px;font-size:10px;font-weight:800;color:#000;text-transform:uppercase;letter-spacing:0.8px">Redesigned</span>
</div>
<p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;line-height:1.25">Inspection &amp; Testing &mdash; 16 certificates rebuilt</p>
<p style="margin:8px 0 0;font-size:14px;color:#f4f4f5;line-height:1.65">EICR, EIC, Minor Works, Testing Only, Fire Alarm (design / install / commission / modify / inspect), Smoke &amp; CO, Solar PV, EV Charging, Lightning Protection, BESS, G98, G99, Emergency Lighting, PAT. Rebuilt from scratch for mobile &mdash; smart cascading forms, swipe through inspection items, a Schedule of Tests that actually works on site.</p>
</td></tr></table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:22px"><tr>
<td width="48" valign="top" style="padding-top:3px;width:48px">
<div style="width:40px;height:40px;background:rgba(34,197,94,0.18);border-radius:11px;text-align:center;line-height:40px;font-size:18px">&#x1F9FE;</div>
</td>
<td style="padding-left:14px">
<p style="margin:0;font-size:17px;font-weight:700;color:#ffffff;line-height:1.25">Quotes &amp; Invoices &mdash; rebuilt</p>
<p style="margin:6px 0 0;font-size:14px;color:#f4f4f5;line-height:1.65">New single-page builder with live totals. Invoice timeline from created to paid. Realtime sync when AI creates invoices for you. Chase emails, late-payment interest, and a proper quote-to-invoice flow.</p>
</td></tr></table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:22px"><tr>
<td width="48" valign="top" style="padding-top:3px;width:48px">
<div style="width:40px;height:40px;background:rgba(99,102,241,0.22);border-radius:11px;text-align:center;line-height:40px;font-size:18px">&#x1F4D0;</div>
</td>
<td style="padding-left:14px">
<p style="margin:0;font-size:17px;font-weight:700;color:#ffffff;line-height:1.25">Room Planner &mdash; smart cable routing</p>
<p style="margin:6px 0 0;font-size:14px;color:#f4f4f5;line-height:1.65">Draw the room, drop your accessories, cables route themselves &mdash; wall-aware, colour-coded by circuit, with length labels. Autosaves. Proper touch controls on site.</p>
</td></tr></table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:22px"><tr>
<td width="48" valign="top" style="padding-top:3px;width:48px">
<div style="width:40px;height:40px;background:rgba(244,63,94,0.18);border-radius:11px;text-align:center;line-height:40px;font-size:18px">&#x1F9BA;</div>
</td>
<td style="padding-left:14px">
<p style="margin:0;font-size:17px;font-weight:700;color:#ffffff;line-height:1.25">Site Safety &amp; RAMS</p>
<p style="margin:6px 0 0;font-size:14px;color:#f4f4f5;line-height:1.65">AI-generated RAMS. Toolbox briefings with photo evidence. Stats, alerts, analytics. Danger Notices, Limitation Notices, and Permits-to-Work all built in.</p>
</td></tr></table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom:22px"><tr>
<td width="48" valign="top" style="padding-top:3px;width:48px">
<div style="width:40px;height:40px;background:rgba(14,165,233,0.22);border-radius:11px;text-align:center;line-height:40px;font-size:18px">&#x1F4B7;</div>
</td>
<td style="padding-left:14px">
<p style="margin:0;font-size:17px;font-weight:700;color:#ffffff;line-height:1.25">Price Book &mdash; live UK trade prices</p>
<p style="margin:6px 0 0;font-size:14px;color:#f4f4f5;line-height:1.65">Search live trade prices from real UK suppliers. Price a job by point, by metre, or by room. Compare suppliers side-by-side. Feeds directly into quotes.</p>
</td></tr></table>

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="48" valign="top" style="padding-top:3px;width:48px">
<div style="width:40px;height:40px;background:rgba(168,85,247,0.22);border-radius:11px;text-align:center;line-height:40px;font-size:18px">&#x1F4E6;</div>
</td>
<td style="padding-left:14px">
<p style="margin:0;font-size:17px;font-weight:700;color:#ffffff;line-height:1.25">Stock Tracker</p>
<p style="margin:6px 0 0;font-size:14px;color:#f4f4f5;line-height:1.65">Colour-coded stock levels, swipe to delete, group by location. Import from text or the Price Book. Export to CSV. Generate a reorder list by supplier in one tap.</p>
</td></tr></table>

</td></tr>

<tr><td style="height:40px;line-height:40px;font-size:0">&nbsp;</td></tr>
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

<tr><td style="height:32px;line-height:32px;font-size:0">&nbsp;</td></tr>

<!-- Stats -->
<tr><td style="padding:0 32px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="33%" align="center" valign="top" style="padding:0 8px">
<p style="margin:0;font-size:28px;font-weight:700;color:#ffffff;line-height:1">750+</p>
<p style="margin:4px 0 0;font-size:11px;color:#d4d4d8;text-transform:uppercase;letter-spacing:0.6px;font-weight:600">Tradespeople</p>
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

<tr><td style="height:36px;line-height:36px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:36px;line-height:36px;font-size:0">&nbsp;</td></tr>

<!-- Offer -->
<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 10px;font-size:11px;color:#d4d4d8;text-transform:uppercase;letter-spacing:1.8px;font-weight:700">Limited web offer &mdash; electrician plan</p>
<p style="margin:0;font-size:60px;font-weight:700;color:#ffffff;line-height:1;letter-spacing:-2.4px">&pound;9.99<span style="font-size:22px;font-weight:500;letter-spacing:0;color:#f4f4f5">/mo</span></p>
<p style="margin:14px 0 0;font-size:14px;color:#f4f4f5;line-height:1.6">Save <strong style="color:#fbbf24">&pound;5/mo</strong> vs the App Store price of &pound;14.99.</p>
</td></tr>

<tr><td style="height:30px;line-height:30px;font-size:0">&nbsp;</td></tr>

<tr><td align="center" style="padding:0 32px">
<a href="${paymentLink}" style="display:inline-block;padding:18px 48px;background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:14px;font-size:17px;font-weight:700;color:#000;text-decoration:none;letter-spacing:-0.2px;box-shadow:0 4px 20px rgba(251,191,36,0.25)">Get started &mdash; &pound;9.99/mo</a>
</td></tr>

<tr><td style="height:22px;line-height:22px;font-size:0">&nbsp;</td></tr>

<tr><td align="center" style="padding:0 32px">
<p style="margin:0 0 14px;font-size:14px;color:#f4f4f5">Then download the app &mdash; you&#x27;re straight in.</p>
<a href="${appStoreUrl}"><img src="${appStoreBadge}" alt="Download on the App Store" width="180" height="60" style="display:block;margin:0 auto;border:0"></a>
</td></tr>

<tr><td style="height:48px;line-height:48px;font-size:0">&nbsp;</td></tr>
<tr><td style="padding:0 32px"><div style="height:1px;background:rgba(255,255,255,0.1);line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="height:36px;line-height:36px;font-size:0">&nbsp;</td></tr>

<tr><td align="center" style="padding:0 32px">
<img src="${founderPhoto}" alt="Andrew Moore, Founder" width="96" height="96" style="display:block;margin:0 auto;border-radius:50%;border:3px solid #fbbf24">
</td></tr>

<tr><td style="height:18px;line-height:18px;font-size:0">&nbsp;</td></tr>

<tr><td style="padding:0 32px">
<p style="margin:0 0 14px;font-size:15px;color:#f4f4f5;line-height:1.7">${greeting}</p>
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

export function generateV10PlainText(
  variant: V10Variant,
  firstName: string,
  unsubscribeUrl: string
): string {
  const paymentLink = 'https://buy.stripe.com/aFaeV69MSanq7Yd3t4bjW07';
  const year = new Date().getFullYear();
  const intro =
    variant === 'early_access'
      ? `We've shipped. Thanks for signing up early — the app is live on the App Store and the web, and a lot has shipped.`
      : `We've been building. A lot has shipped since your trial.`;
  const reason =
    variant === 'early_access'
      ? "You're getting this because you signed up for early access to Elec-Mate."
      : "You're getting this because you signed up for a free trial of Elec-Mate.";
  return `Hey ${firstName},

${intro}

Here's what's new:

⚡ INSPECTION & TESTING — 16 certificates rebuilt
EICR, EIC, Minor Works, Testing Only, Fire Alarm (design / install /
commission / modify / inspect), Smoke & CO, Solar PV, EV Charging,
Lightning Protection, BESS, G98, G99, Emergency Lighting, PAT.
Rebuilt from scratch for mobile.

🧾 QUOTES & INVOICES — rebuilt
New single-page builder, live totals, timeline from created to paid,
realtime sync when AI creates invoices, chase emails, late-payment
interest, proper quote-to-invoice flow.

📐 ROOM PLANNER — smart cable routing
Draw the room, drop your accessories, cables route themselves —
wall-aware, colour-coded by circuit, length labels. Autosaves.

🦺 SITE SAFETY & RAMS
AI-generated RAMS. Toolbox briefings with photo evidence. Stats,
alerts, analytics. Danger Notices, Limitation Notices, Permits-to-Work.

💷 PRICE BOOK — live UK trade prices
Search live trade prices. Price a job by point, by metre, or by room.
Compare suppliers side-by-side. Feeds directly into quotes.

📦 STOCK TRACKER
Colour-coded stock levels, swipe to delete, group by location. Import
from text or the Price Book. Export to CSV. Reorder by supplier.

—

"Absolutely superb. I can invoice, complete testing certs and reports
as well as track my CPD. Everything in one place is exactly what I
need — worth every penny."
— Jay, ★★★★★ App Store review

750+ tradespeople · 16 certificates · ★★★★★ App Store

—

LIMITED WEB OFFER — Electrician plan: £9.99/mo
Save £5/mo vs the App Store price of £14.99.

Get started: ${paymentLink}
Then download the app: https://apps.apple.com/gb/app/elec-mate/id6758948665

—

Andrew Moore, Founder
Reply to this email — it comes straight to me.

—

${reason} Important account emails (receipts, security) are separate.

Unsubscribe: ${unsubscribeUrl}
Questions: info@elec-mate.com

© ${year} Elec-Mate Ltd · United Kingdom`;
}
