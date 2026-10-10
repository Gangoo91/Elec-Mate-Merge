// Gap #9 — one review request, sent a few days after a customer pays.
// Sent only by employer-review-request-send. Every link goes through the
// review-link function (counts the click, then sends them to the firm's own
// page). The wording is neutral on purpose: CMA fake reviews guidance (CMA208
// para 3.6 and 4.5) allows asking customers generally for a review, but not
// steering only the happy ones towards it or tying it to a reward.

import { renderEmailShell, type BrandedCompany } from '../email-template.ts';

export interface ReviewRequestLink {
  label: string;
  url: string;
}

export interface ReviewRequestEmailData {
  company: BrandedCompany;
  firstName: string | null;
  /** The firm's paragraph, placeholders already filled in. */
  paragraph: string;
  jobTitle?: string | null;
  links: ReviewRequestLink[];
  stopUrl: string;
}

const esc = (s: string) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export function buildReviewRequestEmail(data: ReviewRequestEmailData) {
  const name = data.company.name || 'us';
  const subject = `How did we do? ${name}`.trim();
  const preheader = `A minute for an honest review of ${name}?`;
  const first = esc((data.firstName || 'there').trim() || 'there');

  const buttons = data.links
    .map(
      (l, i) =>
        `<a href="${esc(l.url)}" target="_blank" rel="noopener" style="display:block;margin:0 0 10px;padding:13px 16px;${
          i === 0
            ? 'background:#0f172a;color:#ffffff;'
            : 'background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;'
        }text-decoration:none;font-size:15px;font-weight:600;text-align:center;border-radius:10px;">${esc(l.label)}</a>`
    )
    .join('');

  const html = renderEmailShell({
    subject,
    preheader,
    company: data.company,
    greeting: `Hi <strong style="color:#0f172a">${first}</strong>,`,
    body: esc(data.paragraph),
    cta: `<tr><td style="padding:20px 36px 8px;">${buttons}</td></tr>`,
    signoff: `<tr>
    <td style="padding:12px 36px 28px;">
      <p style="margin:0 0 4px;font-size:15px;color:#334155;line-height:1.6;">Thanks again,</p>
      <p style="margin:0;font-size:15px;color:#0f172a;font-weight:600;line-height:1.6;">${esc(name)}</p>
      <p style="margin:18px 0 0;font-size:12px;color:#64748b;line-height:1.6;">You are getting this once because you recently paid ${esc(name)}${
        data.jobTitle ? ` for ${esc(data.jobTitle)}` : ''
      }. <a href="${esc(data.stopUrl)}" style="color:#64748b;text-decoration:underline;">Do not ask me for reviews again</a>.</p>
    </td>
  </tr>`,
  });
  return { subject, preheader, html };
}
