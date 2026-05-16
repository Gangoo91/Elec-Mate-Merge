// Quote-send email template. Composed from the shared design primitives
// in _shared/email-template.ts so the visual language matches every
// other user→client email.

import {
  renderEmailShell,
  renderHero,
  renderButton,
  renderCard,
  renderSteps,
  type BrandedCompany,
} from '../email-template.ts';

export interface QuoteSendData {
  /** Electrician's branded company details */
  company: BrandedCompany;
  /** Client's full name — first name extracted for the greeting */
  clientName: string;
  /** Quote reference (display form, e.g. "QUO-2026-001") */
  quoteNumber: string;
  /** Total quote amount in pounds (e.g. 487.5) */
  total: number;
  /** Quote validity date — ISO string or Date */
  validUntil?: string | Date | null;
  /** Job title from quote.jobDetails.title */
  jobTitle?: string | null;
  /** Optional job description (first ~200 chars rendered) */
  jobDescription?: string | null;
  /** URL the "Review & accept" button points at */
  acceptUrl: string;
  /** Whether the quote PDF is attached (drives the inline note) */
  pdfAttached: boolean;
  /** Optional tracking pixel URL appended before </body> */
  trackingPixelUrl?: string | null;
}

export interface QuoteSendEmail {
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

export function buildQuoteSendEmail(data: QuoteSendData): QuoteSendEmail {
  const totalStr = formatGbp(data.total);
  const validUntilStr = formatDateLong(data.validUntil);
  const firstName = (data.clientName || 'there').split(' ')[0] || 'there';
  const jobLine = data.jobTitle ? data.jobTitle : 'the work we discussed';

  const subject = `Your quote from ${data.company.name} — ${totalStr}`;
  const preheader = `Quote ${data.quoteNumber} · ${totalStr}${validUntilStr ? ` · valid until ${validUntilStr}` : ''}`;

  // Body copy — warm, professional, no boilerplate.
  const greeting = `Hi <strong style="color:#0f172a">${firstName}</strong>,`;
  const body = `Thanks for getting in touch about ${jobLine}. I've put together the quote below — full breakdown attached as a PDF. Have a read through and let me know if you'd like to go ahead or have any questions.`;

  // Hero — total amount with structured meta grid below (clearer than
  // jamming quote number + validity into a single sub-line).
  const metaItems: Array<{ label: string; value: string }> = [
    {
      label: 'Quote',
      value: `<span style="font-family:'SF Mono',Menlo,Consolas,monospace;">${data.quoteNumber}</span>`,
    },
  ];
  if (validUntilStr) metaItems.push({ label: 'Valid until', value: validUntilStr });
  if (data.jobTitle) metaItems.push({ label: 'Job', value: data.jobTitle });

  const hero = renderHero({
    label: 'Quote total',
    value: totalStr,
    meta: metaItems,
  });

  // Single CTA — the public quote view handles both accept and decline.
  // PDF-attached info merged into microcopy so we don't render a separate
  // redundant card for it.
  const microcopyParts = [
    "Secure page · no account needed",
    data.pdfAttached ? 'Full PDF attached' : '',
  ].filter(Boolean);
  const cta = renderButton({
    href: data.acceptUrl,
    label: 'Review & accept quote',
    background: data.company.primaryColor || '#0f172a',
    microcopy: microcopyParts.join(' · '),
  });

  // What happens next — three-step expectation-setter. Conversion booster:
  // explicit next steps reduce hesitation around the CTA.
  const stepsBlock = renderSteps({
    label: 'What happens next',
    accent: data.company.primaryColor || '#0f172a',
    steps: [
      'Review the full quote (PDF attached) at your own pace',
      'Tap the button above to accept and sign digitally',
      `I'll be in touch to confirm a start date and any details`,
    ],
  });

  // Optional scope card — only if a job description is set.
  const desc = (data.jobDescription || '').trim();
  const scopeCard = desc
    ? renderCard({
        label: 'Scope of works',
        body: `<p style="margin:0;font-size:14px;color:#334155;line-height:1.65;white-space:pre-line;">${
          desc.length > 600 ? desc.slice(0, 597) + '…' : desc
        }</p>`,
      })
    : '';

  const sectionsAfterCta = `${stepsBlock}${scopeCard}`;

  const signoff = `<tr>
    <td style="padding:0 36px 36px;">
      <p style="margin:0 0 4px;font-size:15px;color:#334155;line-height:1.6;">Thanks,</p>
      <p style="margin:0;font-size:15px;color:#0f172a;font-weight:600;line-height:1.6;">${data.company.name}</p>
      <p style="margin:14px 0 0;font-size:13px;color:#94a3b8;line-height:1.5;">
        Any questions? Just reply to this email and I'll get straight back to you.
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
    cta,
    card: sectionsAfterCta,
    signoff,
    trackingPixelUrl: data.trackingPixelUrl,
  });

  return { subject, preheader, html };
}
