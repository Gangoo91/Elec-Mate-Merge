// "Job done" summary to the customer (gap #3, ELE-2068).
// Sent once per job, only when the firm has switched it on. What was done,
// the photos the engineer chose, the certificate once issued, and the
// invoice (or pay link) once the office has sent it. Shared shell for chrome.

import {
  renderEmailShell,
  renderButton,
  renderCard,
  type BrandedCompany,
} from '../email-template.ts';

export interface JobDonePhoto {
  url: string;
}

export interface JobDoneCertificateLink {
  type: string;
  number: string | null;
  url: string;
}

export interface JobDoneSummaryData {
  company: BrandedCompany;
  clientName: string;
  jobTitle: string;
  /** ISO, when the engineer tapped Job done. */
  completedAt: string;
  engineer?: string | null;
  signedBy?: string | null;
  summary?: string | null;
  extras?: Array<{ description: string; quantity: number }>;
  photos?: JobDonePhoto[];
  certificates?: JobDoneCertificateLink[];
  /** A certificate is on the job but not linked (not issued, or held until paid). */
  certificateToFollow?: boolean;
  invoice?: {
    number: string | null;
    paid: boolean;
    balance: number | null;
    url: string | null;
    payUrl: string | null;
  } | null;
}

export interface JobDoneSummaryEmail {
  subject: string;
  preheader: string;
  html: string;
}

const esc = (s: string): string =>
  String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const CERT_NAME: Record<string, string> = {
  eicr: 'Electrical Installation Condition Report',
  eic: 'Electrical Installation Certificate',
  'minor-works': 'Minor Works Certificate',
};

const gbp = (n: number) =>
  `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ukDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/London',
  });

const link = (href: string, label: string) =>
  `<a href="${esc(href)}" target="_blank" style="color:#0f172a;font-weight:600;text-decoration:underline;">${esc(label)}</a>`;

export function buildJobDoneSummaryEmail(d: JobDoneSummaryData): JobDoneSummaryEmail {
  const firstName = (d.clientName || 'there').trim().split(/\s+/)[0] || 'there';
  const title = (d.jobTitle || 'your job').trim();
  const day = ukDate(d.completedAt);
  const photos = (d.photos ?? []).slice(0, 6);
  const certs = d.certificates ?? [];
  const inv = d.invoice ?? null;

  const subject = `Work finished: ${title}`;
  const bits = [
    photos.length ? `${photos.length} ${photos.length === 1 ? 'photo' : 'photos'}` : null,
    certs.length ? 'your certificate' : null,
    inv ? (inv.paid ? 'your paid invoice' : 'your invoice') : null,
  ].filter(Boolean) as string[];
  const preheader = `Finished on ${day}.${bits.length ? ` With ${bits.join(', ').replace(/, ([^,]*)$/, ' and $1')}.` : ''}`;

  const greeting = `Hi <strong style="color:#0f172a">${esc(firstName)}</strong>,`;
  const by = (d.engineer || '').trim();
  const body =
    `We finished <strong style="color:#0f172a">${esc(title)}</strong> on ${esc(day)}` +
    `${by ? `. ${esc(by)} did the work` : ''}. Here is a short record for you to keep.`;

  const cards: string[] = [];

  // What was done, and anything agreed on the day.
  const summary = (d.summary || '').trim();
  const extras = (d.extras ?? []).filter((x) => x && x.description);
  if (summary || extras.length || d.signedBy) {
    const parts: string[] = [];
    if (summary) {
      parts.push(
        `<p style="margin:0;font-size:14px;color:#334155;line-height:1.65;white-space:pre-line;">${esc(
          summary.length > 1500 ? `${summary.slice(0, 1497)}…` : summary
        )}</p>`
      );
    }
    if (extras.length) {
      parts.push(
        `<p style="margin:${summary ? '16px' : '0'} 0 6px;font-size:14px;color:#0f172a;font-weight:600;">Extra work you agreed on the day</p>` +
          `<ul style="margin:0;padding-left:18px;font-size:14px;color:#334155;line-height:1.65;">${extras
            .map(
              (x) =>
                `<li>${esc(x.description)}${Number(x.quantity) !== 1 ? ` × ${esc(String(x.quantity))}` : ''}</li>`
            )
            .join('')}</ul>`
      );
    }
    if (d.signedBy) {
      parts.push(
        `<p style="margin:${parts.length ? '16px' : '0'} 0 0;font-size:13px;color:#64748b;line-height:1.6;">Signed off on site by ${esc(d.signedBy)}.</p>`
      );
    }
    cards.push(renderCard({ label: 'What we did', body: parts.join('') }));
  }

  if (photos.length) {
    cards.push(
      renderCard({
        label: photos.length === 1 ? 'Photo of the finished work' : 'Photos of the finished work',
        body: `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">${photos
          .map(
            (p, i) => `<tr><td style="padding:${i === 0 ? '0' : '12px'} 0 0;">
              <a href="${esc(p.url)}" target="_blank" style="display:block;text-decoration:none;">
                <img src="${esc(p.url)}" alt="Photo ${i + 1} of the finished work"
                  style="display:block;width:100%;max-width:520px;height:auto;border:1px solid #e2e8f0;border-radius:10px;" />
              </a></td></tr>`
          )
          .join('')}</table>
          <p style="margin:12px 0 0;font-size:12px;color:#94a3b8;line-height:1.5;">Tap a photo to see it full size. The links work for 30 days, so save any you want to keep.</p>`,
      })
    );
  }

  if (certs.length || d.certificateToFollow) {
    const rows = certs
      .map(
        (c) =>
          `<p style="margin:0 0 8px;font-size:14px;color:#334155;line-height:1.6;">${esc(
            CERT_NAME[c.type] ?? 'Certificate'
          )}${c.number ? ` ${esc(c.number)}` : ''}: ${link(c.url, 'download the PDF')}</p>`
      )
      .join('');
    cards.push(
      renderCard({
        label: certs.length > 1 ? 'Your certificates' : 'Your certificate',
        body:
          rows +
          (d.certificateToFollow
            ? `<p style="margin:0;font-size:14px;color:#334155;line-height:1.6;">${
                certs.length ? 'Another certificate for this work' : 'The certificate for this work'
              } will follow once it is issued.</p>`
            : `<p style="margin:4px 0 0;font-size:13px;color:#64748b;line-height:1.6;">Keep it safe. Your insurer, a buyer or a letting agent may ask for it.</p>`),
      })
    );
  }

  let cta = '';
  if (inv) {
    const lines: string[] = [];
    if (inv.paid) {
      lines.push(
        `Invoice ${esc(inv.number || '')} is paid. Thank you.${inv.url ? ` ${link(inv.url, 'View the invoice')}.` : ''}`
      );
    } else {
      lines.push(
        `Invoice ${esc(inv.number || '')}${inv.balance != null && inv.balance > 0 ? `, ${gbp(inv.balance)} to pay` : ''}.` +
          `${inv.url ? ` ${link(inv.url, 'View the invoice')}.` : ''}`
      );
    }
    cards.push(
      renderCard({
        label: 'Invoice',
        body: `<p style="margin:0;font-size:14px;color:#334155;line-height:1.6;">${lines.join('')}</p>`,
      })
    );
    if (!inv.paid && inv.payUrl) {
      cta = renderButton({
        href: inv.payUrl,
        label: inv.balance != null && inv.balance > 0 ? `Pay ${gbp(inv.balance)} by card` : 'Pay by card',
        background: d.company.primaryColor || '#0f172a',
        microcopy: 'Secure card payment',
      });
    }
  }
  if (!cta && certs.length === 1) {
    cta = renderButton({
      href: certs[0].url,
      label: 'Download your certificate',
      background: d.company.primaryColor || '#0f172a',
    });
  }

  const html = renderEmailShell({
    subject,
    preheader,
    company: d.company,
    greeting,
    body,
    cta,
    card: cards.join(''),
  });
  return { subject, preheader, html };
}
