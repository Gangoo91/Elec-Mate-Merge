// Signature-request email — sent to a third party (client / subcontractor /
// employee) to review and digitally sign a document. Generic across
// document types (scope, contract, RAMS, etc.).

import {
  renderEmailShell,
  renderHero,
  renderButton,
  renderCard,
  type BrandedCompany,
} from '../email-template.ts';

export interface SignatureRequestData {
  company: BrandedCompany;
  /** Who needs to sign */
  signerName: string;
  /** Document the signer is being asked to sign */
  documentTitle: string;
  /** Optional document category, e.g. "Quote", "Scope of Works", "Contract" */
  documentType?: string | null;
  /** Name of the person/team requesting the signature (display only) */
  senderName: string;
  /** Optional message from the sender */
  message?: string | null;
  /** Public URL where the signer reviews and signs */
  signingUrl: string;
  /** Email-open tracking pixel URL (see _shared/email-template.ts ShellOptions.trackingPixelUrl). */
  trackingPixelUrl?: string | null;
}

export interface SignatureRequestEmail {
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

export function buildSignatureRequestEmail(data: SignatureRequestData): SignatureRequestEmail {
  const firstName = (data.signerName || 'there').split(' ')[0] || 'there';
  const docType = (data.documentType || '').trim();

  const subject = `Signature required: ${data.documentTitle}`;
  const preheader = `${data.senderName} has asked you to review and sign${docType ? ` the ${docType.toLowerCase()}` : ''}: ${data.documentTitle}`;

  const greeting = `Hi <strong style="color:#0f172a">${escape(firstName)}</strong>,`;
  const body = `<strong style="color:#0f172a">${escape(data.senderName)}</strong> has asked you to review and sign${docType ? ` the ${escape(docType.toLowerCase())}` : ' the document'} below. It should only take a couple of minutes.`;

  // Hero — document title is the centrepiece.
  const meta: Array<{ label: string; value: string }> = [];
  if (docType) meta.push({ label: 'Document', value: escape(docType) });

  const hero = renderHero({
    label: 'Awaiting signature',
    value: `<span style="font-size:28px;">${escape(data.documentTitle)}</span>`,
    meta: meta.length ? meta : undefined,
  });

  const cta = renderButton({
    href: data.signingUrl,
    label: 'Review & sign document',
    background: data.company.primaryColor || '#0f172a',
    microcopy: 'Secure page · no account needed · takes about 2 minutes',
  });

  const message = (data.message || '').trim();
  const messageCard = message
    ? renderCard({
        label: `Note from ${escape(data.senderName)}`,
        body: `<p style="margin:0;font-size:14px;color:#334155;line-height:1.65;white-space:pre-line;">${
          escape(message.length > 600 ? message.slice(0, 597) + '…' : message)
        }</p>`,
      })
    : '';

  const html = renderEmailShell({
    subject,
    preheader,
    company: data.company,
    greeting,
    body,
    hero,
    cta,
    card: messageCard,
    trackingPixelUrl: data.trackingPixelUrl
  });

  return { subject, preheader, html };
}
