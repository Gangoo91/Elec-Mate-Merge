// Payment-received email — a warm thank-you sent when an invoice is marked
// paid, carrying the review request (the best moment to ask). Only sent when
// the company has review requests enabled with at least one link.

import { renderEmailShell, renderHero, type BrandedCompany } from '../email-template.ts';
import { renderReviewBlock, type ReviewLink } from './review-block.ts';

export interface PaymentReceivedData {
  company: BrandedCompany;
  clientName: string;
  invoiceNumber: string;
  total: number;
  reviewLinks?: ReviewLink[] | null;
  reviewMessage?: string | null;
  trackingPixelUrl?: string | null;
}

export interface PaymentReceivedEmail {
  subject: string;
  preheader: string;
  html: string;
}

const formatGbp = (n: number | null | undefined): string =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n || 0);

export function buildPaymentReceivedEmail(data: PaymentReceivedData): PaymentReceivedEmail {
  const totalStr = formatGbp(data.total);
  const firstName = (data.clientName || 'there').split(' ')[0] || 'there';

  const subject = `Payment received — thank you from ${data.company.name}`;
  const preheader = `We've received your payment for invoice ${data.invoiceNumber}. Thank you!`;
  const greeting = `Hi <strong style="color:#0f172a">${firstName}</strong>,`;
  const body = `Just a quick note to confirm we've received your payment of <strong>${totalStr}</strong> for invoice ${data.invoiceNumber}. Thank you — it's genuinely appreciated.`;

  const hero = renderHero({
    label: 'Payment received',
    value: totalStr,
    meta: [
      {
        label: 'Invoice',
        value: `<span style="font-family:'SF Mono',Menlo,Consolas,monospace;">${data.invoiceNumber}</span>`,
      },
    ],
  });

  const reviewCard = renderReviewBlock({
    enabled: true,
    links: data.reviewLinks,
    message: data.reviewMessage,
  });

  const signoff = `<tr>
    <td style="padding:0 36px 36px;">
      <p style="margin:0 0 4px;font-size:15px;color:#334155;line-height:1.6;">Thanks again,</p>
      <p style="margin:0;font-size:15px;color:#0f172a;font-weight:600;line-height:1.6;">${data.company.name}</p>
    </td>
  </tr>`;

  const html = renderEmailShell({
    subject,
    preheader,
    company: data.company,
    greeting,
    body,
    hero,
    cta: '',
    card: reviewCard,
    signoff,
    trackingPixelUrl: data.trackingPixelUrl,
  });

  return { subject, preheader, html };
}
