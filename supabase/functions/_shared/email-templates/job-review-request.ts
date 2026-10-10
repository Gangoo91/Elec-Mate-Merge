// ELE-1987 — "ask the customer for a review" after a firm job is marked
// Complete. Sent only by employer-automation-send, and only when the firm has
// switched the rule on and has at least one review link.

import { renderEmailShell, type BrandedCompany } from '../email-template.ts';
import { renderReviewBlock, type ReviewLink } from './review-block.ts';

export interface JobReviewRequestData {
  company: BrandedCompany;
  clientName: string;
  jobTitle: string;
  reviewLinks: ReviewLink[];
  reviewMessage?: string | null;
  /** L3: "do not ask me again" link (review-link ?a=stop). */
  stopUrl?: string | null;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function buildJobReviewRequestEmail(data: JobReviewRequestData) {
  const firstName = esc((data.clientName || 'there').trim().split(/\s+/)[0] || 'there');
  const company = esc(data.company.name || 'us');
  const subject = `How did we do? ${data.company.name || ''}`.trim();
  const preheader = `Thanks for choosing ${data.company.name || 'us'}. A quick review would really help.`;

  const html = renderEmailShell({
    subject,
    preheader,
    company: data.company,
    greeting: `Hi <strong style="color:#0f172a">${firstName}</strong>,`,
    body: `Thank you for choosing ${company} for ${esc(data.jobTitle || 'your job')}. We hope you are happy with the work.`,
    cta: '',
    card: renderReviewBlock({ enabled: true, links: data.reviewLinks, message: data.reviewMessage }),
    signoff: `<tr>
    <td style="padding:0 36px 36px;">
      <p style="margin:0 0 4px;font-size:15px;color:#334155;line-height:1.6;">Thanks again,</p>
      <p style="margin:0;font-size:15px;color:#0f172a;font-weight:600;line-height:1.6;">${company}</p>${
        data.stopUrl
          ? `
      <p style="margin:18px 0 0;font-size:12px;color:#64748b;line-height:1.6;"><a href="${esc(data.stopUrl)}" style="color:#64748b;text-decoration:underline;">Do not ask me for reviews again</a>.</p>`
          : ''
      }
    </td>
  </tr>`,
  });
  return { subject, preheader, html };
}
