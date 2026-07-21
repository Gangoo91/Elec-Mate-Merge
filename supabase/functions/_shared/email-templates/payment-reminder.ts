// Payment-reminder email — chasing an unpaid invoice. Tone variants
// escalate via word-choice + a subtle overdue pill, not loud banners.
// BCC'd electrician sees a one-tap "Mark as paid" link in the internal
// footer; client never sees it (gated by an "electrician only" eyebrow).

import {
  renderEmailShell,
  renderHero,
  renderButton,
  renderBankCard,
  renderInternalSection,
  type BrandedCompany,
  type BankDetails,
} from '../email-template.ts';

export type PaymentReminderTone = 'gentle' | 'firm' | 'final';

export interface PaymentReminderData {
  company: BrandedCompany;
  clientName: string;
  invoiceNumber: string;
  total: number;
  /**
   * Sum already received against this invoice (partial payments). When > 0
   * the email chases the BALANCE, never the full total — a customer who has
   * paid £800 of £1,200 must be asked for £400, not £1,200.
   */
  amountPaid?: number;
  /** ISO/Date — invoice due date */
  dueDate?: string | Date | null;
  /** Stripe Checkout / external payment URL. If set, primary CTA. */
  payNowUrl?: string | null;
  /** Bank details for transfer fallback. */
  bankDetails?: BankDetails | null;
  /** Tone of the reminder. */
  tone: PaymentReminderTone;
  /** Optional "mark as paid" URL shown only in the electrician's BCC copy. */
  markPaidUrl?: string | null;
  /** Email-open tracking pixel URL (see _shared/email-template.ts ShellOptions.trackingPixelUrl). */
  trackingPixelUrl?: string | null;
}

export interface PaymentReminderEmail {
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

export function buildPaymentReminderEmail(data: PaymentReminderData): PaymentReminderEmail {
  const totalStr = formatGbp(data.total);
  const amountPaid = Math.max(0, Number(data.amountPaid) || 0);
  const isPartiallyPaid = amountPaid > 0 && amountPaid < data.total;
  const balance = Math.max(0, (Number(data.total) || 0) - amountPaid);
  const balanceStr = formatGbp(balance);
  const paidStr = formatGbp(amountPaid);
  const dueDateStr = formatDateLong(data.dueDate);
  const firstName = (data.clientName || 'there').split(' ')[0] || 'there';

  // Days overdue (0 if not yet due).
  let daysOverdue = 0;
  if (data.dueDate) {
    const due = typeof data.dueDate === 'string' ? new Date(data.dueDate) : data.dueDate;
    const msPerDay = 1000 * 60 * 60 * 24;
    daysOverdue = Math.max(0, Math.floor((Date.now() - due.getTime()) / msPerDay));
  }
  const overdueLabel = daysOverdue > 0 ? `${daysOverdue} day${daysOverdue === 1 ? '' : 's'} overdue` : '';

  // Subject + preheader per tone.
  const subjects: Record<PaymentReminderTone, string> = {
    gentle: `Invoice ${data.invoiceNumber} — payment due`,
    firm: overdueLabel
      ? `Invoice ${data.invoiceNumber} is now ${overdueLabel}`
      : `Invoice ${data.invoiceNumber} — quick reminder`,
    final: overdueLabel
      ? `Final notice — invoice ${data.invoiceNumber} (${overdueLabel})`
      : `Final notice — invoice ${data.invoiceNumber}`,
  };
  // Preheaders always quote the amount still owed — the balance, not the total.
  const preheaders: Record<PaymentReminderTone, string> = {
    gentle: `${balanceStr}${dueDateStr ? ` due ${dueDateStr}` : ''} · Invoice ${data.invoiceNumber} from ${data.company.name}`,
    firm: `${balanceStr}${overdueLabel ? ` · ${overdueLabel}` : ''} · Invoice ${data.invoiceNumber}`,
    final: `Final notice · ${balanceStr}${overdueLabel ? ` · ${overdueLabel}` : ''} · ${data.company.name}`,
  };

  // Tone-aware body copy.
  const partialNote = isPartiallyPaid
    ? ` Thank you for the <strong style="color:#0f172a">${paidStr}</strong> received so far — the remaining balance is <strong style="color:#0f172a">${balanceStr}</strong>.`
    : '';
  const bodies: Record<PaymentReminderTone, string> = {
    gentle: `Just a quick note — invoice <strong style="color:#0f172a">${data.invoiceNumber}</strong> is due for payment. Whenever you get a chance to settle it, that'd be much appreciated. If you've already arranged this, please ignore this email — and thank you.${partialNote}`,
    firm: overdueLabel
      ? `Just following up on invoice <strong style="color:#0f172a">${data.invoiceNumber}</strong> — it's now <strong style="color:#0f172a">${overdueLabel}</strong>. Could you settle when you get a moment, or let me know if there's an issue?${partialNote}`
      : `Just following up on invoice <strong style="color:#0f172a">${data.invoiceNumber}</strong>. Could you settle when you get a moment, or let me know if there's an issue?${partialNote}`,
    final: overdueLabel
      ? `This is a final reminder for invoice <strong style="color:#0f172a">${data.invoiceNumber}</strong>, which is now <strong style="color:#0f172a">${overdueLabel}</strong>. I need to get this resolved — please either pay now using the link below, or get in touch today so we can discuss.${partialNote}`
      : `This is a final reminder for invoice <strong style="color:#0f172a">${data.invoiceNumber}</strong>. I need to get this resolved — please either pay now using the link below, or get in touch today so we can discuss.${partialNote}`,
  };

  // Overdue pill — subtle escalation. Gentle = neutral, firm = amber, final = red.
  let pill: { text: string; background: string; color: string } | undefined;
  if (overdueLabel) {
    if (data.tone === 'final') {
      pill = { text: overdueLabel, background: '#fee2e2', color: '#991b1b' };
    } else if (data.tone === 'firm') {
      pill = { text: overdueLabel, background: '#fef3c7', color: '#92400e' };
    } else {
      pill = { text: overdueLabel, background: '#f1f5f9', color: '#475569' };
    }
  }

  // Hero — amount due + meta.
  const meta: Array<{ label: string; value: string }> = [
    {
      label: 'Invoice',
      value: `<span style="font-family:'SF Mono',Menlo,Consolas,monospace;">${data.invoiceNumber}</span>`,
    },
  ];
  if (isPartiallyPaid) {
    meta.push({ label: 'Invoice total', value: totalStr });
    meta.push({ label: 'Received', value: paidStr });
  }
  if (dueDateStr) meta.push({ label: 'Due', value: dueDateStr });

  const hero = renderHero({
    label: isPartiallyPaid ? 'Balance due' : 'Amount due',
    value: balanceStr,
    meta,
    pill,
  });

  // Pay Now CTA (only if Stripe / external link).
  const cta = data.payNowUrl
    ? renderButton({
        href: data.payNowUrl,
        label: `Pay ${balanceStr} now`,
        background: data.company.primaryColor || '#0f172a',
        microcopy: 'Secure payment by card · powered by Stripe',
      })
    : '';

  // Bank details (renderBankCard handles empty case).
  const bankCard = renderBankCard(data.bankDetails, data.invoiceNumber, 'Or pay by bank transfer');

  const signoff = `<tr>
    <td style="padding:0 36px 36px;">
      <p style="margin:0 0 4px;font-size:15px;color:#334155;line-height:1.6;">Thanks,</p>
      <p style="margin:0;font-size:15px;color:#0f172a;font-weight:600;line-height:1.6;">${data.company.name}</p>
      <p style="margin:14px 0 0;font-size:13px;color:#94a3b8;line-height:1.5;">
        Already paid? Just reply and let me know — I'll get it cleared.
      </p>
    </td>
  </tr>`;

  // Internal section — "Mark as paid" button for the BCC'd electrician.
  const internalSection = data.markPaidUrl
    ? renderInternalSection({
        companyName: data.company.name,
        intro: 'Customer already paid? Tap below to mark as paid and stop further reminders.',
        cta: { href: data.markPaidUrl, label: 'Mark invoice as paid →' },
      })
    : '';

  const html = renderEmailShell({
    subject: subjects[data.tone],
    preheader: preheaders[data.tone],
    company: data.company,
    greeting: `Hi <strong style="color:#0f172a">${firstName}</strong>,`,
    body: bodies[data.tone],
    hero,
    cta,
    card: bankCard,
    signoff,
    internalSection,
    trackingPixelUrl: data.trackingPixelUrl
  });

  return { subject: subjects[data.tone], preheader: preheaders[data.tone], html };
}
