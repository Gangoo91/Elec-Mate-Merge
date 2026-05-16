// Quote-acceptance confirmation — sent to the client immediately after
// they accept a quote on the public view. Warm, congratulatory, with
// "what happens next" so they know we've got it.

import {
  renderEmailShell,
  renderHero,
  renderSteps,
  renderCard,
  type BrandedCompany,
} from '../email-template.ts';

export interface QuoteAcceptanceData {
  company: BrandedCompany;
  /** Client who accepted (may differ from quote.client.name) */
  acceptedByName: string;
  quoteNumber: string;
  total: number;
  /** When they accepted — defaults to now */
  acceptedAt?: string | Date | null;
  /** Optional job title for context */
  jobTitle?: string | null;
  /** Optional URL to view the signed quote */
  viewQuoteUrl?: string | null;
  /** Email-open tracking pixel URL (see _shared/email-template.ts ShellOptions.trackingPixelUrl). */
  trackingPixelUrl?: string | null;
}

export interface QuoteAcceptanceEmail {
  subject: string;
  preheader: string;
  html: string;
}

const formatGbp = (n: number): string =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n || 0);
const formatDateLong = (d: string | Date | null | undefined): string => {
  if (!d) return '';
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

export function buildQuoteAcceptanceEmail(data: QuoteAcceptanceData): QuoteAcceptanceEmail {
  const totalStr = formatGbp(data.total);
  const acceptedStr = formatDateLong(data.acceptedAt || new Date());
  const firstName = (data.acceptedByName || 'there').split(' ')[0] || 'there';

  const subject = `Quote ${data.quoteNumber} accepted — what happens next`;
  const preheader = `Thanks for accepting · ${totalStr} · We'll be in touch shortly to schedule the work`;

  const greeting = `Hi <strong style="color:#0f172a">${firstName}</strong>,`;
  const body = `Thanks for accepting quote <strong style="color:#0f172a">${data.quoteNumber}</strong>${data.jobTitle ? ` for ${data.jobTitle.toLowerCase()}` : ''}. I've got everything I need — here's what happens from here.`;

  // Hero — confirmation state. Green-tinted pill makes the success
  // status feel celebratory without going overboard.
  const meta: Array<{ label: string; value: string }> = [
    {
      label: 'Quote',
      value: `<span style="font-family:'SF Mono',Menlo,Consolas,monospace;">${data.quoteNumber}</span>`,
    },
  ];
  if (acceptedStr) meta.push({ label: 'Accepted', value: acceptedStr });

  const hero = renderHero({
    label: 'Accepted total',
    value: totalStr,
    meta,
    pill: {
      text: '✓ Accepted',
      background: '#dcfce7',
      color: '#166534',
    },
  });

  // No CTA — they've already accepted. Just info.

  // What happens next — three-step expectation-setter. Critical for
  // post-acceptance: silence here makes clients anxious.
  const stepsBlock = renderSteps({
    label: 'What happens next',
    accent: data.company.primaryColor || '#166534',
    steps: [
      `I'll review the job and get back to you within 1–2 working days to confirm a start date`,
      `On the day, I'll show up at the agreed time with everything I need`,
      `Once the work is complete I'll send you an invoice and any certificates`,
    ],
  });

  // Optional view-quote card.
  const viewCard = data.viewQuoteUrl
    ? renderCard({
        label: 'Your signed quote',
        body: `<p style="margin:0 0 12px;font-size:14px;color:#334155;line-height:1.65;">A copy of the signed quote is saved against your job. You can re-open it any time using the link below.</p>
        <a href="${data.viewQuoteUrl}" style="display:inline-block;font-size:13px;font-weight:600;color:#0f172a;background:#ffffff;border:1px solid #cbd5e1;text-decoration:none;padding:9px 14px;border-radius:8px;">View signed quote →</a>`,
      })
    : '';

  const signoff = `<tr>
    <td style="padding:0 36px 36px;">
      <p style="margin:0 0 4px;font-size:15px;color:#334155;line-height:1.6;">Thanks again,</p>
      <p style="margin:0;font-size:15px;color:#0f172a;font-weight:600;line-height:1.6;">${data.company.name}</p>
      <p style="margin:14px 0 0;font-size:13px;color:#94a3b8;line-height:1.5;">
        Anything else? Just reply to this email — I'll see it.
      </p>
    </td>
  </tr>`;

  const html = renderEmailShell({
    subject,
    preheader,
    company: data.company,
    greeting,
    body,
    hero,
    card: `${stepsBlock}${viewCard}`,
    signoff,
    trackingPixelUrl: data.trackingPixelUrl
  });

  return { subject, preheader, html };
}
