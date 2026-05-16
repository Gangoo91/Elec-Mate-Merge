// Shared email design primitives. Every user→client email composes from
// these so the visual language stays consistent and a single tweak
// updates them all. Build with `renderEmailShell({ ... })`.
//
// Design system:
//   - Light slate body (#f1f5f9), white rounded card (16px radius)
//   - 4px brand accent ribbon at the top of the card (electrician's
//     primary_color, validated hex, neutral charcoal fallback)
//   - Generous mobile-first padding (32–48px outer, 36px inner)
//   - Hero element = the single thing the recipient needs to take away
//   - One dominant CTA. Avoid two competing buttons.
//   - Footer = company contact details, no platform attribution
//   - color-scheme: light dark meta so dark-mode clients don't invert
//
// All helpers return HTML strings; they do NOT do any side-effects.
// Keep them pure so we can preview / snapshot them trivially.

export interface BrandedCompany {
  /** Display name shown in header + footer */
  name: string;
  /** Optional hosted or data-URL logo. If set, replaces the name in the header. */
  logoUrl?: string | null;
  /** Hex #RRGGBB. Used for the accent ribbon + primary CTA. */
  primaryColor?: string | null;
  /** Footer details */
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
  vatNumber?: string | null;
  registrationNumber?: string | null;
}

export interface ShellOptions {
  /** Email subject — populates the <title> */
  subject: string;
  /** Hidden inbox-preview snippet (60–120 chars ideal) */
  preheader: string;
  /** Electrician's branded company details */
  company: BrandedCompany;
  /** Greeting line, e.g. "Hi Sarah,". Renders as 16px body. */
  greeting?: string;
  /** Opening body paragraph(s). Pass pre-formatted HTML (may contain <strong>). */
  body?: string;
  /** Centred hero block — usually a big amount + label. Pass HTML. */
  hero?: string;
  /** Single primary CTA block. Use renderButton(). */
  cta?: string;
  /** Optional secondary info card (bank details, scope, etc.). */
  card?: string;
  /** Sign-off block. Defaults to "Thanks, <company name>" + reply line. */
  signoff?: string;
  /** Internal-only section visible to BCC'd electrician (e.g. mark-paid). */
  internalSection?: string;
  /**
   * Email-open tracking pixel URL. When set, a 1x1 invisible image is
   * injected just before </body>. The recipient's mail client fetches
   * it when the email is rendered, which fires the `email-open` edge
   * function — recording the open + (on first open) firing a push +
   * in-app notification to the electrician. See `supabase/functions/email-open`.
   */
  trackingPixelUrl?: string | null;
}

const safeHex = (raw: string | null | undefined, fallback = '#0f172a'): string => {
  const v = String(raw || '').trim();
  return /^#[0-9a-fA-F]{6}$/.test(v) ? v : fallback;
};

const escapeAttr = (s: string): string =>
  String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const escapeText = (s: string): string =>
  String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/**
 * Outer email shell. Composes all the sections into a single HTML doc
 * with the standard chrome (light slate body, white card, brand rail,
 * header lockup, footer with company details).
 */
export function renderEmailShell(opts: ShellOptions): string {
  const brandHex = safeHex(opts.company.primaryColor);
  const companyName = escapeText(opts.company.name || 'Your Electrician');

  // Header: logo if present, otherwise the company name.
  const headerLockup = opts.company.logoUrl
    ? `<img src="${escapeAttr(opts.company.logoUrl)}" alt="${companyName}" style="display:block;max-height:48px;max-width:200px;border:0;outline:none;" />`
    : `<p style="margin:0;font-size:22px;font-weight:700;color:#0f172a;letter-spacing:-0.3px;">${companyName}</p>`;

  // Footer: two visual rows. Row 1 = primary contact (address / phone /
  // email / website). Row 2 = legal (VAT / company registration). Each
  // row only renders if it has content.
  const contactParts = [
    opts.company.address,
    opts.company.phone,
    opts.company.email,
    opts.company.website,
  ]
    .filter(Boolean)
    .map(escapeText)
    .join(' &nbsp;·&nbsp; ');
  const legalParts = [
    opts.company.vatNumber ? `VAT ${escapeText(opts.company.vatNumber)}` : '',
    opts.company.registrationNumber ? `Co. ${escapeText(opts.company.registrationNumber)}` : '',
  ]
    .filter(Boolean)
    .join(' &nbsp;·&nbsp; ');

  const footerBlock =
    contactParts || legalParts
      ? `<tr>
          <td style="background:#fafafa;border-top:1px solid #e2e8f0;padding:22px 36px;text-align:center;">
            ${
              contactParts
                ? `<p style="margin:0;font-size:12px;color:#64748b;line-height:1.65;font-weight:500;">${contactParts}</p>`
                : ''
            }
            ${
              legalParts
                ? `<p style="margin:${contactParts ? '6px' : '0'} 0 0;font-size:11px;color:#94a3b8;line-height:1.5;">${legalParts}</p>`
                : ''
            }
          </td>
        </tr>`
      : '';

  // Default sign-off if none provided.
  const signoffBlock =
    opts.signoff !== undefined
      ? opts.signoff
      : `<tr>
          <td style="padding:0 36px 36px;">
            <p style="margin:0 0 4px;font-size:15px;color:#334155;line-height:1.6;">Thanks,</p>
            <p style="margin:0;font-size:15px;color:#0f172a;font-weight:600;line-height:1.6;">${companyName}</p>
          </td>
        </tr>`;

  const greetingBlock = opts.greeting
    ? `<p style="margin:0 0 16px;font-size:16px;color:#0f172a;line-height:1.5;">${opts.greeting}</p>`
    : '';
  const bodyBlock = opts.body
    ? `<p style="margin:0;font-size:15px;color:#334155;line-height:1.65;">${opts.body}</p>`
    : '';
  const greetingBody =
    greetingBlock || bodyBlock
      ? `<tr><td style="padding:24px 36px 8px;">${greetingBlock}${bodyBlock}</td></tr>`
      : '';

  const heroBlock = opts.hero
    ? `<tr><td style="padding:32px 36px 8px;" align="center">${opts.hero}</td></tr>
       <tr><td style="height:28px;line-height:28px;font-size:28px;">&nbsp;</td></tr>`
    : '';

  const ctaBlock = opts.cta || '';
  const cardBlock = opts.card || '';
  const internalBlock = opts.internalSection || '';

  // Email-open tracking pixel. Rendered as a 1x1 transparent image
  // with inline styles that keep it invisible even if a mail client
  // strips display:none. The recipient's client loads it and the
  // `email-open` edge fn records the open.
  const trackingPixel = opts.trackingPixelUrl
    ? `<img src="${escapeAttr(opts.trackingPixelUrl)}" width="1" height="1" alt="" style="display:none !important;visibility:hidden;width:1px;height:1px;max-width:1px;max-height:1px;opacity:0;border:0;outline:none;overflow:hidden;mso-hide:all;" />`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <meta name="format-detection" content="telephone=no,date=no,address=no,email=no">
  <title>${escapeText(opts.subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;color:#0f172a;">

  <div style="display:none;font-size:1px;color:#f1f5f9;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeText(opts.preheader)}</div>

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#f1f5f9;">
    <tr>
      <td align="center" style="padding:48px 16px;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
          style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(15,23,42,0.04);">

          <tr>
            <td style="background:${brandHex};height:4px;line-height:4px;font-size:4px;">&nbsp;</td>
          </tr>

          <tr>
            <td style="padding:32px 36px 8px;">${headerLockup}</td>
          </tr>

          ${greetingBody}
          ${heroBlock}
          ${ctaBlock}
          ${cardBlock}
          ${signoffBlock}
          ${internalBlock}
          ${footerBlock}

        </table>

      </td>
    </tr>
  </table>

  ${trackingPixel}
</body>
</html>`;
}

// ─── Hero ────────────────────────────────────────────────────────────
// A centred block with a small uppercase label, a big number / value,
// and one or two sub-lines underneath. Used for "Amount due £500", etc.

export interface HeroOptions {
  label: string; // small uppercase eyebrow, e.g. "Amount due"
  value: string; // big primary value, e.g. "£500.00"
  sub?: string; // sub-line(s), e.g. "Due 12 May · Invoice INV-001"
  /** Optional structured meta grid shown below the value, e.g. quote # + validity */
  meta?: Array<{ label: string; value: string }>;
  pill?: {
    text: string;
    background: string; // hex
    color: string; // hex
  };
}

export function renderHero(opts: HeroOptions): string {
  const pill = opts.pill
    ? `<span style="display:inline-block;margin-top:14px;padding:5px 12px;background:${opts.pill.background};color:${opts.pill.color};border-radius:999px;font-size:12px;font-weight:600;letter-spacing:0.2px;">${escapeText(opts.pill.text)}</span>`
    : '';
  const sub = opts.sub
    ? `<p style="margin:10px 0 0;font-size:13px;color:#64748b;">${opts.sub}</p>`
    : '';
  // Structured meta grid — labels + values as a balanced row. Up to 3
  // cells before wrapping looks ungainly; trim to first 3.
  const metaItems = (opts.meta || []).slice(0, 3);
  const metaGrid = metaItems.length
    ? `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top:24px;">
        <tr>
          ${metaItems
            .map(
              (m, i) => `
            <td style="width:${Math.floor(100 / metaItems.length)}%;padding:0 ${i === 0 ? '0' : '8px'} 0 ${i === metaItems.length - 1 ? '0' : '8px'};text-align:center;${i > 0 ? 'border-left:1px solid #e2e8f0;' : ''}">
              <p style="margin:0;font-size:10.5px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.12em;">${escapeText(m.label)}</p>
              <p style="margin:6px 0 0;font-size:14px;font-weight:600;color:#0f172a;line-height:1.3;">${m.value}</p>
            </td>`
            )
            .join('')}
        </tr>
      </table>`
    : '';
  return `
    <p style="margin:0;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.14em;">${escapeText(opts.label)}</p>
    <p style="margin:8px 0 0;font-size:48px;font-weight:700;color:#0f172a;line-height:1.05;letter-spacing:-1px;">${opts.value}</p>
    ${sub}
    ${pill}
    ${metaGrid}
  `;
}

// ─── Numbered steps section ──────────────────────────────────────────
// "What happens next" — three short steps with circular number badges.
// Used to set client expectations and reduce hesitation around CTAs.

export interface StepsOptions {
  label?: string;
  steps: string[]; // 1–4 short lines, ideally each under 60 chars
  /** Brand colour for the number badges. Defaults to charcoal. */
  accent?: string | null;
}

export function renderSteps(opts: StepsOptions): string {
  if (!opts.steps?.length) return '';
  const accent = safeHex(opts.accent, '#0f172a');
  const label = opts.label
    ? `<p style="margin:0 0 18px;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.12em;">${escapeText(opts.label)}</p>`
    : '';
  const rows = opts.steps
    .map(
      (s, i) => `
      <tr>
        <td style="padding:${i === 0 ? '0' : '14px'} 16px 0 0;vertical-align:top;width:32px;">
          <span style="display:inline-block;width:26px;height:26px;line-height:26px;border-radius:999px;background:${accent};color:#ffffff;text-align:center;font-size:12px;font-weight:600;">${i + 1}</span>
        </td>
        <td style="padding:${i === 0 ? '3px' : '17px'} 0 0;vertical-align:top;">
          <p style="margin:0;font-size:15px;color:#334155;line-height:1.55;">${escapeText(s)}</p>
        </td>
      </tr>`
    )
    .join('');
  return `
    <tr>
      <td style="padding:12px 36px 28px;">
        ${label}
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          ${rows}
        </table>
      </td>
    </tr>
  `;
}

// ─── Primary CTA button ──────────────────────────────────────────────

export interface ButtonOptions {
  label: string;
  href: string;
  /** Background hex. Defaults to company brand colour via shell. */
  background?: string;
  /** Optional microcopy line under the button. */
  microcopy?: string;
}

export function renderButton(opts: ButtonOptions): string {
  const bg = safeHex(opts.background);
  const microcopy = opts.microcopy
    ? `<tr><td style="padding:0 36px 4px;text-align:center;"><p style="margin:12px 0 0;font-size:12px;color:#94a3b8;">${escapeText(opts.microcopy)}</p></td></tr>`
    : '';
  return `
    <tr>
      <td style="padding:0 36px 8px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td align="center">
              <a href="${escapeAttr(opts.href)}"
                style="display:inline-block;background-color:${bg};color:#ffffff;padding:16px 44px;border-radius:10px;text-decoration:none;font-size:16px;font-weight:600;letter-spacing:0.2px;mso-padding-alt:0;">
                ${escapeText(opts.label)}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    ${microcopy}
  `;
}

// ─── Info card ───────────────────────────────────────────────────────
// Subtle slate card used for bank details, scope of work, etc.

export interface CardOptions {
  /** Small uppercase eyebrow above the card content */
  label?: string;
  /** Card body — pass HTML (may include <strong>, <table>, etc.) */
  body: string;
}

export function renderCard(opts: CardOptions): string {
  const label = opts.label
    ? `<p style="margin:0 0 14px;font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.12em;">${escapeText(opts.label)}</p>`
    : '';
  return `
    <tr>
      <td style="padding:24px 36px 4px;">
        <div style="height:1px;background:#e2e8f0;line-height:1px;font-size:1px;">&nbsp;</div>
      </td>
    </tr>
    <tr>
      <td style="padding:22px 36px 12px;">
        ${label}
        ${opts.body}
      </td>
    </tr>
  `;
}

// ─── Internal (BCC'd electrician only) section ───────────────────────
// Visually demarcated grey bar at the bottom of the email, labelled
// "For [Company] only", used for mark-paid CTAs, etc.

export interface InternalSectionOptions {
  companyName: string;
  intro: string;
  cta?: { href: string; label: string };
}

export function renderInternalSection(opts: InternalSectionOptions): string {
  const cta = opts.cta
    ? `<a href="${escapeAttr(opts.cta.href)}" style="display:inline-block;font-size:13px;font-weight:600;color:#0f172a;background:#fbbf24;text-decoration:none;padding:9px 16px;border-radius:8px;">${escapeText(opts.cta.label)}</a>`
    : '';
  return `
    <tr>
      <td style="background:#fafafa;border-top:1px solid #e2e8f0;padding:18px 36px;">
        <p style="margin:0 0 4px;font-size:10.5px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.12em;">
          For ${escapeText(opts.companyName)} only
        </p>
        <p style="margin:0 0 ${cta ? '12px' : '0'};font-size:13px;color:#64748b;line-height:1.5;">${opts.intro}</p>
        ${cta}
      </td>
    </tr>
  `;
}

// ─── Bank details renderer ───────────────────────────────────────────
// Tabular display of bank info with monospace numbers and a payment
// reference line. Used by invoice + reminder emails.

export interface BankDetails {
  bankName?: string | null;
  accountName?: string | null;
  accountNumber?: string | null;
  sortCode?: string | null;
}

export function renderBankCard(
  bank: BankDetails | null | undefined,
  reference: string,
  label = 'Pay by bank transfer'
): string {
  if (!bank) return '';
  const row = (l: string, v: string) =>
    v
      ? `<tr>
          <td style="padding:8px 0;font-size:13px;color:#64748b;width:42%;">${escapeText(l)}</td>
          <td style="padding:8px 0;font-size:14px;color:#0f172a;font-weight:500;font-family:'SF Mono',Menlo,Consolas,monospace;">${escapeText(v)}</td>
        </tr>`
      : '';
  return renderCard({
    label,
    body: `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      ${row('Account name', bank.accountName || '')}
      ${row('Sort code', bank.sortCode || '')}
      ${row('Account number', bank.accountNumber || '')}
      ${row('Bank', bank.bankName || '')}
      <tr>
        <td colspan="2" style="padding:14px 0 0;border-top:1px solid #e2e8f0;">
          <p style="margin:14px 0 0;font-size:13px;color:#475569;line-height:1.5;">
            Please use <strong style="color:#0f172a;font-family:'SF Mono',Menlo,Consolas,monospace;">${escapeText(reference)}</strong> as the payment reference so we can match it to your invoice.
          </p>
        </td>
      </tr>
    </table>`,
  });
}
