/**
 * The reply email itself, kept apart from the handler so it can be rendered and
 * checked without sending anything.
 */
import { renderEmailShell, renderButton, type BrandedCompany } from '../_shared/email-template.ts';

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Only OUR booking page becomes the "Pick a time" button
const BOOKING_LINK = /https:\/\/(?:www\.)?elec-mate\.com\/book\/[0-9a-f-]{36}/i;

/** Escaped text with any other https link made clickable. */
function linkify(text: string): string {
  return escapeHtml(text).replace(
    /https?:\/\/[^\s<]+[^\s<.,)!?]/g,
    (u) => `<a href="${u}" style="color:inherit;text-decoration:underline;">${u}</a>`
  );
}

export function buildReplyEmail(opts: {
  text: string;
  company: BrandedCompany;
  originalSubject: string | null;
  isEmailSource: boolean;
}): { subject: string; html: string } {
  const { text, company } = opts;
  const link = text.match(BOOKING_LINK)?.[0] ?? null;
  const prose = link
    ? text
        // The app's own booking sentence goes; the button says it instead
        .replace(/\s*(If it's easier, )?you can pick a time[^.]*?https?:\/\/\S+\.?/i, '')
        .replace(link, '')
        .replace(/[ \t]{2,}/g, ' ')
        .trim()
    : text;
  const paragraphs = prose
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 14px;">${linkify(p).replace(/\n/g, '<br>')}</p>`)
    .join('');

  const original = opts.originalSubject?.trim();
  const subject =
    opts.isEmailSource && original
      ? /^re:/i.test(original)
        ? original
        : `Re: ${original}`
      : `Your enquiry to ${company.name}`;

  const html = renderEmailShell({
    subject,
    preheader: prose.slice(0, 110),
    company,
    body: paragraphs,
    cta: link
      ? renderButton({
          label: 'Pick a time',
          href: link,
          background: company.primaryColor ?? undefined,
          microcopy: 'Choose a time that suits you for a visit.',
        })
      : undefined,
  });
  return { subject, html };
}
