// Quote-send email template. Composed from the shared design primitives
// in _shared/email-template.ts so the visual language matches every
// other user→client email.

import {
  renderEmailShell,
  renderHero,
  renderButton,
  renderCard,
  renderSteps,
  renderBankCard,
  type BrandedCompany,
  type BankDetails,
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
  /** Optional override of the email subject line. */
  customSubject?: string | null;
  /** Optional override of the email body paragraph (between greeting and hero). */
  customMessage?: string | null;
  /**
   * Bank transfer details. When the electrician requires a deposit
   * (or the client wants to pay by bank transfer instead of card),
   * these are surfaced inline so the client doesn't have to reply
   * asking for them. The payment reference is always the quote number.
   */
  bankDetails?: BankDetails | null;
  /**
   * Deposit percentage on the quote — if set, the inline bank-details
   * card includes a "Pay deposit X% (£Y)" hint alongside the full total.
   */
  depositPercentage?: number | null;
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

  const subject =
    data.customSubject?.trim() || `Your quote from ${data.company.name} — ${totalStr}`;
  const preheader = `Quote ${data.quoteNumber} · ${totalStr}${validUntilStr ? ` · valid until ${validUntilStr}` : ''}`;

  // Body copy — caller-supplied custom message wins, else warm default.
  const greeting = `Hi <strong style="color:#0f172a">${firstName}</strong>,`;
  const customBody = (data.customMessage || '').trim();
  const body = customBody
    ? customBody.replace(/\n/g, '<br>')
    : `Thanks for getting in touch about ${jobLine}. I've put together the quote below — full breakdown attached as a PDF. Have a read through and let me know if you'd like to go ahead or have any questions.`;

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

  // Bank-transfer card — included whenever the electrician has set
  // bank details, so the client never has to email asking how to pay.
  // The "Or pay by bank transfer" label is intentional: card-via-Stripe
  // remains the primary path; this is the fallback (and the deposit
  // path when Stripe Connect isn't set up).
  const depositPct = Number(data.depositPercentage || 0);
  const depositLabel =
    depositPct > 0 && data.total > 0
      ? `Pay by bank transfer · ${depositPct}% deposit = ${formatGbp((data.total * depositPct) / 100)}`
      : 'Pay by bank transfer';
  const bankCard = renderBankCard(data.bankDetails, data.quoteNumber, depositLabel);

  const sectionsAfterCta = `${stepsBlock}${scopeCard}${bankCard}`;

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
