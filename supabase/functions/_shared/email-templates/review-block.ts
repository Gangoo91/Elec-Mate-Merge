// Shared "ask for a review" block, rendered inside invoice-send and
// payment-received emails. Driven by the company profile's review settings.

import { renderCard } from '../email-template.ts';

export interface ReviewLink {
  url: string;
  label?: string;
}

export interface ReviewBlockOptions {
  enabled?: boolean | null;
  links?: ReviewLink[] | null;
  message?: string | null;
}

const DEFAULT_MSG =
  'Happy with the work? A quick review really helps a small business like ours — it only takes a minute.';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Renders the review CTA card, or '' when disabled / no valid links. */
export function renderReviewBlock(opts: ReviewBlockOptions): string {
  if (!opts?.enabled) return '';
  const links = (opts.links || []).filter(
    (l) => l && typeof l.url === 'string' && /^https?:\/\//i.test(l.url.trim())
  );
  if (links.length === 0) return '';

  const msg = (opts.message || '').trim() || DEFAULT_MSG;
  const buttons = links
    .map((l) => {
      const label = (l.label && l.label.trim()) || 'Leave us a review';
      return `<a href="${esc(l.url.trim())}" target="_blank" rel="noopener" style="display:block;margin:0 0 8px;padding:12px 16px;background:#fbbf24;color:#0f172a;text-decoration:none;font-size:14px;font-weight:600;text-align:center;border-radius:8px;">&#9733;&nbsp;&nbsp;${esc(label)}</a>`;
    })
    .join('');

  return renderCard({
    label: 'Enjoyed our work?',
    body: `<p style="margin:0 0 14px;font-size:14px;color:#334155;line-height:1.6;">${esc(msg)}</p>${buttons}`,
  });
}
