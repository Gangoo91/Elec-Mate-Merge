// Scope-of-works email — sent to a client to review and sign the scope
// before work commences. Single clear CTA; signing happens on a secure
// public page.

import {
  renderEmailShell,
  renderHero,
  renderButton,
  renderSteps,
  type BrandedCompany,
} from '../email-template.ts';

export interface ScopeSendData {
  company: BrandedCompany;
  clientName: string;
  /** Property address the scope is for */
  propertyAddress: string;
  /** Brief one-line scope summary, e.g. "Full rewire — 2-bed flat" */
  scopeSummary?: string | null;
  /** Public URL where client reviews + signs */
  signUrl: string;
  /** Optional scope reference (display form, e.g. "SCO-2026-001") */
  scopeReference?: string | null;
  /** Email-open tracking pixel URL (see _shared/email-template.ts ShellOptions.trackingPixelUrl). */
  trackingPixelUrl?: string | null;
}

export interface ScopeSendEmail {
  subject: string;
  preheader: string;
  html: string;
}

export function buildScopeSendEmail(data: ScopeSendData): ScopeSendEmail {
  const firstName = (data.clientName || 'there').split(' ')[0] || 'there';
  const addr = data.propertyAddress || '';
  const addrShort = addr.split(',')[0]?.trim() || addr;

  const subject = `Scope of works to sign — ${addrShort}`;
  const preheader = `Please review and sign the scope before we start${data.scopeSummary ? ` · ${data.scopeSummary}` : ''}`;

  const greeting = `Hi <strong style="color:#0f172a">${firstName}</strong>,`;
  const body = `I've put together the scope of works for <strong style="color:#0f172a">${addrShort}</strong>. Please have a read through and sign so we're both clear on what's included before I start.`;

  // Hero — property address or scope reference.
  const meta: Array<{ label: string; value: string }> = [];
  if (data.scopeReference) {
    meta.push({
      label: 'Scope',
      value: `<span style="font-family:'SF Mono',Menlo,Consolas,monospace;">${data.scopeReference}</span>`,
    });
  }
  if (data.scopeSummary) meta.push({ label: 'Job', value: data.scopeSummary });

  const hero = renderHero({
    label: 'Scope of works',
    value: `<span style="font-size:28px;">${addrShort}</span>`,
    sub: addr !== addrShort ? addr : undefined,
    meta: meta.length ? meta : undefined,
  });

  const cta = renderButton({
    href: data.signUrl,
    label: 'Review & sign scope',
    background: data.company.primaryColor || '#0f172a',
    microcopy: 'Secure page · takes about 2 minutes · no account needed',
  });

  const stepsBlock = renderSteps({
    label: 'What happens next',
    accent: data.company.primaryColor || '#0f172a',
    steps: [
      'Read through the scope carefully — flag anything you want changed',
      'Sign the document digitally to confirm we both agree what is included',
      `Once it's signed I'll be in touch to confirm a start date`,
    ],
  });

  const html = renderEmailShell({
    subject,
    preheader,
    company: data.company,
    greeting,
    body,
    hero,
    cta,
    card: stepsBlock,
    trackingPixelUrl: data.trackingPixelUrl
  });

  return { subject, preheader, html };
}
