// Quote-reminder email — manual chase to a client who hasn't accepted yet.
// Tone variants escalate via word-choice + a subtle expiry pill, not
// loud colour banners.

import {
  renderEmailShell,
  renderHero,
  renderButton,
  type BrandedCompany,
} from '../email-template.ts';

export type ReminderTone = 'gentle' | 'firm' | 'urgent';

export interface QuoteReminderData {
  company: BrandedCompany;
  clientName: string;
  quoteNumber: string;
  total: number;
  /** ISO/Date — used to compute "Expires in N days" status. */
  expiryDate?: string | Date | null;
  /** Public URL to the quote (web view, no auth required). */
  acceptUrl: string;
  tone: ReminderTone;
  /** Optional job title for context. */
  jobTitle?: string | null;
  /** Email-open tracking pixel URL (see _shared/email-template.ts ShellOptions.trackingPixelUrl). */
  trackingPixelUrl?: string | null;
}

export interface QuoteReminderEmail {
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

export function buildQuoteReminderEmail(data: QuoteReminderData): QuoteReminderEmail {
  const totalStr = formatGbp(data.total);
  const expiryStr = formatDateLong(data.expiryDate);
  const firstName = (data.clientName || 'there').split(' ')[0] || 'there';

  // Days until expiry (negative = already expired).
  let daysUntilExpiry: number | null = null;
  if (data.expiryDate) {
    const exp = typeof data.expiryDate === 'string' ? new Date(data.expiryDate) : data.expiryDate;
    const msPerDay = 1000 * 60 * 60 * 24;
    daysUntilExpiry = Math.ceil((exp.getTime() - Date.now()) / msPerDay);
  }
  const expired = daysUntilExpiry !== null && daysUntilExpiry <= 0;

  // Subject + preheader per tone.
  const subjects: Record<ReminderTone, string> = {
    gentle: `Following up: quote ${data.quoteNumber} from ${data.company.name}`,
    firm: `Quote ${data.quoteNumber} — still interested?`,
    urgent: expired
      ? `Quote ${data.quoteNumber} has expired`
      : `Quote ${data.quoteNumber} expires ${daysUntilExpiry === 1 ? 'tomorrow' : `in ${daysUntilExpiry} days`}`,
  };
  const preheaders: Record<ReminderTone, string> = {
    gentle: `${totalStr} · Quote ${data.quoteNumber}${expiryStr ? ` · valid until ${expiryStr}` : ''}`,
    firm: `${totalStr} · Just a nudge on quote ${data.quoteNumber}`,
    urgent: expired
      ? `${totalStr} · Quote ${data.quoteNumber} has expired`
      : `${totalStr} · Quote expires ${daysUntilExpiry === 1 ? 'tomorrow' : `in ${daysUntilExpiry} days`}`,
  };

  // Tone-aware body.
  const jobMention = data.jobTitle ? ` for ${data.jobTitle.toLowerCase()}` : '';
  const bodies: Record<ReminderTone, string> = {
    gentle: `Just following up on the quote I sent you${jobMention}. No rush — let me know if you have any questions or would like to go ahead.`,
    firm: `Just a quick nudge on quote <strong style="color:#0f172a">${data.quoteNumber}</strong>${jobMention}. Are you still interested? Happy to tweak anything or answer questions if it'd help.`,
    urgent: expired
      ? `Quote <strong style="color:#0f172a">${data.quoteNumber}</strong>${jobMention} has now expired. If you'd still like to proceed I can refresh the pricing — just let me know.`
      : `Quote <strong style="color:#0f172a">${data.quoteNumber}</strong>${jobMention} expires ${daysUntilExpiry === 1 ? 'tomorrow' : `in ${daysUntilExpiry} days`}. If you'd like to lock it in at the current price, tap the button below to review and accept.`,
  };

  // Pill colour — subtle escalation. Gentle = neutral, firm = amber, urgent = red.
  let pill: { text: string; background: string; color: string } | undefined;
  if (data.tone === 'gentle' && daysUntilExpiry !== null && daysUntilExpiry > 0) {
    pill = {
      text: `${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''} left`,
      background: '#f1f5f9',
      color: '#475569',
    };
  } else if (data.tone === 'firm' && daysUntilExpiry !== null && daysUntilExpiry > 0) {
    pill = {
      text: `${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''} until expiry`,
      background: '#fef3c7',
      color: '#92400e',
    };
  } else if (data.tone === 'urgent') {
    pill = {
      text: expired ? 'Expired' : `Expires ${daysUntilExpiry === 1 ? 'tomorrow' : `in ${daysUntilExpiry} days`}`,
      background: '#fee2e2',
      color: '#991b1b',
    };
  }

  // Hero — total amount + meta.
  const meta: Array<{ label: string; value: string }> = [
    {
      label: 'Quote',
      value: `<span style="font-family:'SF Mono',Menlo,Consolas,monospace;">${data.quoteNumber}</span>`,
    },
  ];
  if (expiryStr) meta.push({ label: expired ? 'Expired' : 'Valid until', value: expiryStr });

  const hero = renderHero({
    label: 'Quote total',
    value: totalStr,
    meta,
    pill,
  });

  const cta = renderButton({
    href: data.acceptUrl,
    label: expired ? 'View previous quote' : 'Review & accept quote',
    background: data.company.primaryColor || '#0f172a',
    microcopy: expired
      ? 'Get in touch and I can refresh the pricing for you'
      : 'Secure page · no account needed',
  });

  const html = renderEmailShell({
    subject: subjects[data.tone],
    preheader: preheaders[data.tone],
    company: data.company,
    greeting: `Hi <strong style="color:#0f172a">${firstName}</strong>,`,
    body: bodies[data.tone],
    hero,
    cta,
    trackingPixelUrl: data.trackingPixelUrl
  });

  return { subject: subjects[data.tone], preheader: preheaders[data.tone], html };
}
