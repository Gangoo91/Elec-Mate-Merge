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
  /** ELE-1993: up to three facts about the document, e.g. Total / Price change. */
  facts?: Array<{ label: string; value: string }> | null;
  /** A chase rather than the first send. */
  reminder?: boolean;
  /** When the link stops working. */
  expiresAt?: string | null;
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

  const subject = data.reminder
    ? `Reminder: please sign ${data.documentTitle}`
    : `Please sign: ${data.documentTitle}`;
  const preheader = `${data.senderName} has asked you to read and sign${docType ? ` the ${docType.toLowerCase()}` : ''}: ${data.documentTitle}`;

  const greeting = `Hi <strong style="color:#0f172a">${escape(firstName)}</strong>,`;
  const expiry = data.expiresAt
    ? new Date(data.expiresAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;
  const body = `${data.reminder ? 'A quick reminder. ' : ''}<strong style="color:#0f172a">${escape(data.senderName)}</strong> has asked you to read and sign${docType ? ` the ${escape(docType.toLowerCase())}` : ' the document'} below. The full document opens on the page, and you can sign it on your phone with your finger.${expiry ? ` The link works until ${escape(expiry)}.` : ''}`;

  // Hero — document title is the centrepiece.
  const meta: Array<{ label: string; value: string }> = [];
  if (data.facts && data.facts.length) {
    for (const f of data.facts.slice(0, 3)) meta.push({ label: f.label, value: escape(f.value) });
  } else if (docType) {
    meta.push({ label: 'Document', value: escape(docType) });
  }

  const hero = renderHero({
    label: 'Awaiting signature',
    value: `<span style="font-size:28px;">${escape(data.documentTitle)}</span>`,
    meta: meta.length ? meta : undefined,
  });

  const cta = renderButton({
    href: data.signingUrl,
    label: 'Read and sign',
    background: data.company.primaryColor || '#0f172a',
    microcopy: 'Secure page. No account needed. You get a signed copy.',
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
