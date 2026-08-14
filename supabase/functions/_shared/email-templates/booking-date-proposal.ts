// Alternative start date — sent to the client when the electrician cannot do
// the day they asked for on quote acceptance, and has offered another.
//
// ELE-1562 Part 2. Dan (DP Power Solutions): "when they select a date and we
// can't do that date, how to send out the alternative date to be able to
// confirm the booking with the customer." Before this there was no way to say
// no and counter — the electrician could only confirm the requested day or
// ring them.
//
// The tone matters: the client has already accepted the quote and picked a
// day, so this is a small disappointment. Lead with the new date rather than
// with the refusal, and make accepting one tap.

import {
  renderEmailShell,
  renderHero,
  renderButton,
  renderCard,
  type BrandedCompany,
} from '../email-template.ts';

export interface BookingDateProposalData {
  company: BrandedCompany;
  clientName: string;
  quoteNumber: string;
  /** The day they originally asked for (YYYY-MM-DD). */
  requestedDate: string;
  /** The day the electrician can actually do (YYYY-MM-DD). */
  proposedDate: string;
  /** Optional line from the electrician explaining why. */
  note?: string | null;
  /** Where the client goes to accept or pick a different day. */
  confirmUrl: string;
  trackingPixelUrl?: string | null;
}

export interface BookingDateProposalEmail {
  subject: string;
  preheader: string;
  html: string;
}

/**
 * `2026-09-02` → `Tuesday 2 September`.
 *
 * Midday, deliberately. A bare `new Date('2026-09-02')` is parsed as UTC
 * midnight, which in a timezone behind UTC renders as the 1st — the date would
 * be a day out for the reader depending on where they are.
 */
const formatDateLong = (d: string): string => {
  if (!d) return '';
  return new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
};

const escape = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function buildBookingDateProposalEmail(
  data: BookingDateProposalData
): BookingDateProposalEmail {
  const firstName = (data.clientName || 'there').split(' ')[0] || 'there';
  const requestedStr = formatDateLong(data.requestedDate);
  const proposedStr = formatDateLong(data.proposedDate);
  const company = data.company?.name || 'Your electrician';

  const subject = `A different start date for ${data.quoteNumber}`;
  const preheader = `${requestedStr} isn't possible — ${proposedStr} is. One tap to confirm.`;

  const greeting = `Hi <strong style="color:#0f172a">${escape(firstName)}</strong>,`;
  const body =
    `Thanks for accepting quote <strong style="color:#0f172a">${escape(data.quoteNumber)}</strong> and picking a start date. ` +
    `Unfortunately ${escape(requestedStr)} isn't possible — there's already a full day booked in. ` +
    `Here's the nearest day that works instead.`;

  // Lead with the new date, not the refusal.
  const hero = renderHero({
    label: 'Suggested start date',
    value: proposedStr,
    meta: [
      { label: 'Quote', value: escape(data.quoteNumber) },
      { label: 'You asked for', value: requestedStr },
    ],
    pill: {
      text: 'Needs your OK',
      background: '#fef3c7',
      color: '#92400e',
    },
  });

  const cta = renderButton({
    label: 'Confirm this date',
    href: data.confirmUrl,
    microcopy: "Not right for you? The same page lets you pick a different day.",
  });

  const card = data.note?.trim()
    ? renderCard({
        label: `From ${escape(company)}`,
        body: `<p style="margin:0;font-size:15px;line-height:1.6;color:#334155;">${escape(data.note.trim())}</p>`,
      })
    : undefined;

  const html = renderEmailShell({
    subject,
    preheader,
    company: data.company,
    greeting,
    body,
    hero,
    cta,
    card,
    trackingPixelUrl: data.trackingPixelUrl ?? undefined,
  });

  return { subject, preheader, html };
}
