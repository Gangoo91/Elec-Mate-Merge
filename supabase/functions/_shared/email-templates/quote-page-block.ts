// ELE-1989 — "Need another job doing?" card linking to the firm's public quote
// page. Rendered inside invoice-send and quote-send emails ONLY when the caller
// passes a URL (the firm's page is live and lead_page_on_documents is on), so
// every other email is byte-for-byte unchanged.

import { renderCard } from '../email-template.ts';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The public quote page URL for a profile row, or null when it should not show. */
export function quotePageUrlFor(profile: {
  lead_page_enabled?: boolean | null;
  lead_page_slug?: string | null;
  lead_page_on_documents?: boolean | null;
} | null | undefined): string | null {
  if (!profile?.lead_page_enabled || !profile.lead_page_slug) return null;
  if (profile.lead_page_on_documents === false) return null;
  const slug = String(profile.lead_page_slug).toLowerCase();
  if (!/^[a-z0-9-]{3,48}$/.test(slug)) return null;
  return `https://elec-mate.com/get-quote/${slug}`;
}

/** Renders the card, or '' when there is no URL. */
export function renderQuotePageBlock(opts: {
  url?: string | null;
  companyName: string;
  variant: 'invoice' | 'quote';
}): string {
  const url = (opts.url || '').trim();
  if (!/^https:\/\//.test(url)) return '';
  const line =
    opts.variant === 'invoice'
      ? 'Need another job doing, or know someone who does? Ask for a free quote in under a minute.'
      : 'Know someone who needs an electrician? Pass this on and they can ask us for a free quote in under a minute.';
  return renderCard({
    label: 'Recommend us',
    body: `<p style="margin:0 0 12px;font-size:14px;color:#334155;line-height:1.6;">${esc(line)}</p>
<a href="${esc(url)}" target="_blank" rel="noopener" style="display:inline-block;padding:11px 16px;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;text-decoration:none;font-size:14px;font-weight:600;">Get a quote from ${esc(opts.companyName)}</a>
<p style="margin:10px 0 0;font-size:12px;color:#64748b;">${esc(url.replace(/^https:\/\//, ''))}</p>`,
  });
}
