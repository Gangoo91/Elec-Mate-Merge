// Invoice-send email template. Composed from the shared design
// primitives in _shared/email-template.ts.
//
// Design intent: client opens this and immediately sees the amount and
// the Pay Now button. PDF is attached for the full breakdown — we do
// not duplicate the item table inside the email (the PDF is the source
// of truth, the email is the action).

import {
  renderEmailShell,
  renderHero,
  renderButton,
  renderCard,
  renderBankCard,
  type BrandedCompany,
  type BankDetails,
} from '../email-template.ts';
import { renderReviewBlock, type ReviewLink } from './review-block.ts';

export interface InvoiceSendData {
  company: BrandedCompany;
  clientName: string;
  invoiceNumber: string;
  total: number;
  subtotal?: number | null;
  vatAmount?: number | null;
  invoiceDate?: string | Date | null;
  dueDate?: string | Date | null;
  paymentTerms?: string | null;
  /** Stripe Checkout / external payment URL. If set, primary CTA. */
  payNowUrl?: string | null;
  /** Direct link to view/download the PDF online. Renders as secondary link. */
  pdfUrl?: string | null;
  /** Whether the PDF is attached to this email. */
  pdfAttached: boolean;
  /** Optional bank details for transfer. */
  bankDetails?: BankDetails | null;
  /** Free-text notes from the invoice. */
  notes?: string | null;
  /** Job title from invoice.jobDetails.title (for inbox preheader context). */
  jobTitle?: string | null;
  /** Email-open tracking pixel URL (see _shared/email-template.ts ShellOptions.trackingPixelUrl). */
  trackingPixelUrl?: string | null;
  /** Optional override of the email subject line. */
  customSubject?: string | null;
  /** Optional override of the email body paragraph. */
  customMessage?: string | null;
  /** Review-request settings from the company profile. */
  reviewEnabled?: boolean | null;
  reviewLinks?: ReviewLink[] | null;
  reviewMessage?: string | null;
}

export interface InvoiceSendEmail {
  subject: string;
  preheader: string;
  html: string;
}

const formatGbp = (n: number | null | undefined): string =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n || 0);

const formatDateLong = (d: string | Date | null | undefined): string => {
  if (!d) return '';
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

export function buildInvoiceSendEmail(data: InvoiceSendData): InvoiceSendEmail {
  const totalStr = formatGbp(data.total);
  const dueDateStr = formatDateLong(data.dueDate);
  const issueDateStr = formatDateLong(data.invoiceDate);
  const firstName = (data.clientName || 'there').split(' ')[0] || 'there';

  const subject =
    data.customSubject?.trim() ||
    `Invoice ${data.invoiceNumber} from ${data.company.name} — ${totalStr}`;
  const preheader = `${totalStr}${dueDateStr ? ` due ${dueDateStr}` : ''} · Invoice ${data.invoiceNumber}${data.jobTitle ? ` · ${data.jobTitle}` : ''}`;

  const greeting = `Hi <strong style="color:#0f172a">${firstName}</strong>,`;
  // Defensive: strip a leading greeting / trailing sign-off if the caller
  // (e.g. the AI assistant) accidentally included one — the template adds its own.
  const stripLeadingGreeting = (s: string) =>
    s.replace(
      /^\s*(hi|hello|hey|dear|good (?:morning|afternoon|evening))\b[^\n,—-]{0,40}[,—-]?\s*\n*/i,
      ''
    );
  const stripTrailingSignoff = (s: string) =>
    s
      .replace(
        /\n+\s*(thanks|thank you|regards|kind regards|best regards|best|cheers|yours|sincerely|warm regards|all the best)\b[^\n]{0,80}\s*$/i,
        ''
      )
      .trimEnd();
  const customBody = stripTrailingSignoff(stripLeadingGreeting((data.customMessage || '').trim()));
  const body = customBody
    ? customBody.replace(/\n/g, '<br>')
    : `Thanks for your business. Your invoice for ${data.jobTitle ? `the ${data.jobTitle.toLowerCase()}` : 'the work we completed'} is ready — full breakdown attached as a PDF. The fastest way to settle it is the button below.`;

  // Hero — total + meta grid (Invoice #, Due date, Terms)
  const meta: Array<{ label: string; value: string }> = [
    {
      label: 'Invoice',
      value: `<span style="font-family:'SF Mono',Menlo,Consolas,monospace;">${data.invoiceNumber}</span>`,
    },
  ];
  if (dueDateStr) meta.push({ label: 'Due', value: dueDateStr });
  if (data.paymentTerms) meta.push({ label: 'Terms', value: data.paymentTerms });

  const hero = renderHero({ label: 'Amount due', value: totalStr, meta });

  // Primary CTA — Pay Now (brand-coloured). If no payment link, fall
  // back to a "View invoice online" link or just rely on bank details +
  // attachment with no button.
  let cta = '';
  if (data.payNowUrl) {
    const microParts = ['Secure payment by card · powered by Stripe'];
    if (data.pdfAttached) microParts.push('Full PDF attached');
    else if (data.pdfUrl)
      microParts.push(
        `<a href="${data.pdfUrl}" style="color:#64748b;text-decoration:underline;">View invoice PDF online</a>`
      );
    cta = renderButton({
      href: data.payNowUrl,
      label: `Pay ${totalStr} now`,
      background: data.company.primaryColor || '#0f172a',
      microcopy: microParts.join(' · '),
    });
  } else if (data.pdfUrl) {
    cta = renderButton({
      href: data.pdfUrl,
      label: 'View invoice PDF',
      background: data.company.primaryColor || '#0f172a',
      microcopy: data.pdfAttached ? 'Full PDF also attached' : 'Opens in a new window',
    });
  } else if (data.pdfAttached) {
    cta = `<tr><td style="padding:0 36px 28px;text-align:center;"><p style="margin:0;font-size:13px;color:#64748b;">📎 Full invoice PDF attached</p></td></tr>`;
  }

  // Bank details (renderBankCard handles the empty case gracefully).
  const bankCard = renderBankCard(data.bankDetails, data.invoiceNumber, 'Or pay by bank transfer');

  // Optional notes — only if set.
  const notes = (data.notes || '').trim();
  const notesCard = notes
    ? renderCard({
        label: 'Notes',
        body: `<p style="margin:0;font-size:14px;color:#334155;line-height:1.65;white-space:pre-line;">${
          notes.length > 600 ? notes.slice(0, 597) + '…' : notes
        }</p>`,
      })
    : '';

  // Totals summary card — small, replaces the heavy itemised table.
  const subtotalRows: string[] = [];
  if (typeof data.subtotal === 'number') {
    subtotalRows.push(
      `<tr><td style="padding:4px 0;font-size:13px;color:#64748b;">Subtotal</td><td style="padding:4px 0;font-size:13px;color:#0f172a;text-align:right;font-weight:500;">${formatGbp(data.subtotal)}</td></tr>`
    );
  }
  if (typeof data.vatAmount === 'number' && data.vatAmount > 0) {
    subtotalRows.push(
      `<tr><td style="padding:4px 0;font-size:13px;color:#64748b;">VAT</td><td style="padding:4px 0;font-size:13px;color:#0f172a;text-align:right;font-weight:500;">${formatGbp(data.vatAmount)}</td></tr>`
    );
  }
  subtotalRows.push(
    `<tr><td style="padding:10px 0 0;border-top:1px solid #e2e8f0;font-size:14px;color:#0f172a;font-weight:600;">Total</td><td style="padding:10px 0 0;border-top:1px solid #e2e8f0;font-size:14px;color:#0f172a;text-align:right;font-weight:700;">${totalStr}</td></tr>`
  );
  const totalsCard = renderCard({
    label: 'Summary',
    body: `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">${subtotalRows.join('')}</table>`,
  });

  // Optional review request — soft nudge on the invoice (a stronger ask
  // goes out when the invoice is marked paid).
  const reviewCard = renderReviewBlock({
    enabled: data.reviewEnabled,
    links: data.reviewLinks,
    message: data.reviewMessage,
  });

  const sectionsAfterCta = `${bankCard}${totalsCard}${notesCard}${reviewCard}`;

  const signoff = `<tr>
    <td style="padding:0 36px 36px;">
      <p style="margin:0 0 4px;font-size:15px;color:#334155;line-height:1.6;">Thanks,</p>
      <p style="margin:0;font-size:15px;color:#0f172a;font-weight:600;line-height:1.6;">${data.company.name}</p>
      <p style="margin:14px 0 0;font-size:13px;color:#94a3b8;line-height:1.5;">
        Any questions? Just reply to this email and I'll come back to you.
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
