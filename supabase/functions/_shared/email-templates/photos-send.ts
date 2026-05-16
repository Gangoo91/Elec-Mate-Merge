// Job-photos email — sent to a client to share photos of completed work.
// Custom layout: small intro then a grid of photos, each linking to the
// full-size signed URL. Uses the shared shell for chrome only.

import {
  renderEmailShell,
  renderCard,
  type BrandedCompany,
} from '../email-template.ts';

export interface PhotoItem {
  thumbnailUrl: string;
  fullSizeUrl: string;
  caption?: string | null;
}

export interface PhotosSendData {
  company: BrandedCompany;
  recipientName: string;
  /** Project / job name */
  projectName: string;
  /** Photos to render in the grid */
  photos: PhotoItem[];
  /** Optional message from the electrician */
  message?: string | null;
  /** Email-open tracking pixel URL (see _shared/email-template.ts ShellOptions.trackingPixelUrl). */
  trackingPixelUrl?: string | null;
}

export interface PhotosSendEmail {
  subject: string;
  preheader: string;
  html: string;
}

const escape = (s: string): string =>
  String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export function buildPhotosSendEmail(data: PhotosSendData): PhotosSendEmail {
  const firstName = (data.recipientName || 'there').split(' ')[0] || 'there';
  const photoCount = data.photos.length;

  const subject = `Photos from ${data.projectName} — ${photoCount} ${photoCount === 1 ? 'photo' : 'photos'}`;
  const preheader = `${photoCount} ${photoCount === 1 ? 'photo' : 'photos'} from ${data.projectName} · tap any photo to view full-size`;

  const greeting = `Hi <strong style="color:#0f172a">${firstName}</strong>,`;
  const message = (data.message || '').trim();
  const intro = message
    ? message
    : `Here are ${photoCount === 1 ? 'a photo' : `${photoCount} photos`} from <strong style="color:#0f172a">${data.projectName}</strong>. Tap any image to view full-size.`;

  // Photo grid — 2 columns on mobile-friendly width. Each photo card
  // is its own table row to render reliably across email clients.
  const photoRows = data.photos
    .map((photo, i) => {
      const caption = photo.caption
        ? `<p style="margin:10px 0 0;font-size:12px;color:#64748b;line-height:1.45;">${escape(photo.caption)}</p>`
        : '';
      return `
      <tr>
        <td style="padding:${i === 0 ? '0' : '16px'} 0 0;">
          <a href="${escape(photo.fullSizeUrl)}" target="_blank" style="display:block;text-decoration:none;">
            <img src="${escape(photo.thumbnailUrl)}" alt="Photo ${i + 1}"
              style="display:block;width:100%;max-width:520px;height:auto;border:1px solid #e2e8f0;border-radius:10px;" />
          </a>
          ${caption}
        </td>
      </tr>`;
    })
    .join('');

  const photoGrid = renderCard({
    body: `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      ${photoRows}
    </table>
    <p style="margin:18px 0 0;font-size:12px;color:#94a3b8;text-align:center;line-height:1.5;">
      Tap any photo to download or view full-size.
    </p>`,
  });

  const html = renderEmailShell({
    subject,
    preheader,
    company: data.company,
    greeting,
    body: intro,
    card: photoGrid,
    trackingPixelUrl: data.trackingPixelUrl
  });

  return { subject, preheader, html };
}
