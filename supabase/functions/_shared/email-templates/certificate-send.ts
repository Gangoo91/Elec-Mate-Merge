// Certificate delivery email — EICR / EIC / Minor Works / Solar PV / etc.
// Informational, not transactional. The client just needs to know it
// arrived, where to find it, and to keep it for compliance/insurance.

import {
  renderEmailShell,
  renderHero,
  renderButton,
  renderCard,
  type BrandedCompany,
} from '../email-template.ts';

export interface CertificateSendData {
  company: BrandedCompany;
  clientName: string;
  /** Display name of the certificate type, e.g. "EICR", "Minor Works" */
  certificateType: string;
  /** Cert reference number (display form) */
  certificateNumber: string;
  /** Property the cert was issued for */
  installationAddress?: string | null;
  /** ISO/Date — inspection or issue date */
  inspectionDate?: string | Date | null;
  /** Overall assessment, e.g. "Satisfactory" / "Unsatisfactory" (EICR) */
  overallAssessment?: string | null;
  /** Optional: when re-inspection is due (e.g. 5/10 years from now) */
  nextInspectionDue?: string | Date | null;
  /** Direct download URL for the PDF */
  pdfUrl?: string | null;
  /** Whether the PDF is attached to this email */
  pdfAttached: boolean;
  /** Optional custom message from the electrician */
  customMessage?: string | null;
  /** Email-open tracking pixel URL (see _shared/email-template.ts ShellOptions.trackingPixelUrl). */
  trackingPixelUrl?: string | null;
}

export interface CertificateSendEmail {
  subject: string;
  preheader: string;
  html: string;
}

const formatDateLong = (d: string | Date | null | undefined): string => {
  if (!d) return '';
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

export function buildCertificateSendEmail(data: CertificateSendData): CertificateSendEmail {
  const inspectionStr = formatDateLong(data.inspectionDate);
  const nextDueStr = formatDateLong(data.nextInspectionDue);
  const firstName = (data.clientName || 'there').split(' ')[0] || 'there';
  const certType = data.certificateType || 'Certificate';
  const addrShort = (data.installationAddress || '').split(',')[0]?.trim() || '';

  const subject = `Your ${certType} certificate${addrShort ? ` — ${addrShort}` : ''}`;
  const preheader = `${certType} ${data.certificateNumber}${inspectionStr ? ` · inspected ${inspectionStr}` : ''}${data.overallAssessment ? ` · ${data.overallAssessment}` : ''}`;

  const greeting = `Hi <strong style="color:#0f172a">${firstName}</strong>,`;
  // Copy must match what's actually in the email: attached PDF, download
  // button, or (when neither exists — PDF fetch failed AND no URL) a
  // reply-to-me fallback rather than referencing a button that isn't there.
  const pdfAccess = data.pdfAttached
    ? 'Find the full PDF attached to this email'
    : data.pdfUrl
      ? 'Find the full PDF using the button below'
      : "Reply to this email and I'll send the PDF over";
  const body = `Your <strong style="color:#0f172a">${certType}</strong> certificate is ready. ${pdfAccess} — keep it somewhere safe for your records and for your insurance / letting agent if applicable.`;

  // Hero — the certificate type + reference (no monetary amount here).
  // Value is the cert reference, label is the type.
  const meta: Array<{ label: string; value: string }> = [];
  if (inspectionStr) meta.push({ label: 'Inspected', value: inspectionStr });
  if (data.overallAssessment) meta.push({ label: 'Assessment', value: data.overallAssessment });
  if (nextDueStr) meta.push({ label: 'Next due', value: nextDueStr });

  const hero = renderHero({
    label: certType,
    value: `<span style="font-family:'SF Mono',Menlo,Consolas,monospace;font-size:32px;">${data.certificateNumber}</span>`,
    sub: addrShort ? `${addrShort}` : undefined,
    meta,
  });

  // CTA — only show if we have a download URL.
  let cta = '';
  if (data.pdfUrl) {
    cta = renderButton({
      href: data.pdfUrl,
      label: 'Download certificate PDF',
      background: data.company.primaryColor || '#0f172a',
      microcopy: data.pdfAttached
        ? 'Also attached to this email · keep a copy for your records'
        : 'Opens in a new window · keep a copy for your records',
    });
  } else if (data.pdfAttached) {
    cta = `<tr><td style="padding:0 36px 28px;text-align:center;"><p style="margin:0;font-size:13px;color:#64748b;">📎 Certificate PDF attached</p></td></tr>`;
  }

  // Optional custom message from the electrician.
  const message = (data.customMessage || '').trim();
  const messageCard = message
    ? renderCard({
        label: 'Notes',
        body: `<p style="margin:0;font-size:14px;color:#334155;line-height:1.65;white-space:pre-line;">${
          message.length > 600 ? message.slice(0, 597) + '…' : message
        }</p>`,
      })
    : '';

  // Advisory card — important for compliance certs.
  const advisoryCard = renderCard({
    label: 'Keep this safe',
    body: `<p style="margin:0;font-size:14px;color:#334155;line-height:1.65;">
      You may be asked to produce this certificate by your insurer, mortgage lender, letting agent, or building control. Save it somewhere secure — I'm happy to resend it any time if you can't find it.
    </p>`,
  });

  const html = renderEmailShell({
    subject,
    preheader,
    company: data.company,
    greeting,
    body,
    hero,
    cta,
    card: `${messageCard}${advisoryCard}`,
    trackingPixelUrl: data.trackingPixelUrl,
  });

  return { subject, preheader, html };
}
