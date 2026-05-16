// Team-briefing sign-off email — sent to operatives / subcontractors to
// read and digitally sign a safety briefing (RAMS, toolbox talk, etc.).
// Surfaces risk level + identified hazards so the signer knows what
// they're committing to before they tap through.

import {
  renderEmailShell,
  renderHero,
  renderButton,
  renderCard,
  type BrandedCompany,
} from '../email-template.ts';

export type BriefingRiskLevel = 'low' | 'medium' | 'high';

export interface BriefingSignOffData {
  company: BrandedCompany;
  /** Operative being asked to sign */
  recipientName?: string | null;
  /** Display name of the briefing, e.g. "Pre-start RAMS — 47 Riverside" */
  briefingName: string;
  /** Site or property the briefing covers */
  location?: string | null;
  /** ISO/Date — date of the briefing */
  briefingDate?: string | Date | null;
  /** Briefing time, free-format string e.g. "08:00" */
  briefingTime?: string | null;
  /** Who presented the briefing (display only) */
  presentedBy?: string | null;
  /** Identified hazards (already formatted display strings) */
  hazards?: string[];
  /** Risk level — drives pill colour */
  riskLevel?: BriefingRiskLevel | null;
  /** Public signing URL */
  signingUrl: string;
  /** Email-open tracking pixel URL (see _shared/email-template.ts ShellOptions.trackingPixelUrl). */
  trackingPixelUrl?: string | null;
}

export interface BriefingSignOffEmail {
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

const formatDateLong = (d: string | Date | null | undefined): string => {
  if (!d) return '';
  const date = typeof d === 'string' ? new Date(d) : d;
  if (isNaN(date.getTime())) return String(d);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

export function buildBriefingSignOffEmail(data: BriefingSignOffData): BriefingSignOffEmail {
  const firstName = (data.recipientName || 'there').split(' ')[0] || 'there';
  const dateStr = formatDateLong(data.briefingDate);
  const risk = (data.riskLevel || 'medium') as BriefingRiskLevel;

  const subject = `Sign briefing — ${data.briefingName}`;
  const preheader = `Please read & sign: ${data.briefingName}${data.location ? ` · ${data.location}` : ''}${dateStr ? ` · ${dateStr}` : ''}`;

  const greeting = `Hi <strong style="color:#0f172a">${escape(firstName)}</strong>,`;
  const body = `You're required to read and sign the team briefing below before work starts. Tap the button, review the details and add your signature — it takes about a minute.`;

  // Risk pill — colours per level.
  const pillFor: Record<BriefingRiskLevel, { background: string; color: string; text: string }> = {
    low: { background: '#dcfce7', color: '#166534', text: 'Low risk' },
    medium: { background: '#fef3c7', color: '#92400e', text: 'Medium risk' },
    high: { background: '#fee2e2', color: '#991b1b', text: 'High risk' },
  };

  const meta: Array<{ label: string; value: string }> = [];
  if (data.location) meta.push({ label: 'Location', value: escape(data.location) });
  if (dateStr) meta.push({ label: 'Date', value: dateStr });
  if (data.briefingTime) meta.push({ label: 'Time', value: escape(data.briefingTime) });

  const hero = renderHero({
    label: 'Team briefing',
    value: `<span style="font-size:26px;">${escape(data.briefingName)}</span>`,
    meta: meta.length ? meta : undefined,
    pill: pillFor[risk],
  });

  const cta = renderButton({
    href: data.signingUrl,
    label: 'Read & sign briefing',
    background: data.company.primaryColor || '#0f172a',
    microcopy: 'Secure page · no login required · opens in your browser',
  });

  // Hazards card — only if there are any.
  const hazards = (data.hazards || []).filter(Boolean);
  const hazardsCard = hazards.length
    ? renderCard({
        label: 'Identified hazards',
        body: `<div>${hazards
          .map(
            (h) =>
              `<span style="display:inline-block;padding:5px 12px;background:#f1f5f9;color:#475569;border-radius:999px;font-size:12px;font-weight:500;margin:2px 6px 4px 0;">${escape(h)}</span>`
          )
          .join('')}</div>`,
      })
    : '';

  // Presenter card — small. Only if we have a presenter.
  const presenterCard = data.presentedBy
    ? renderCard({
        label: 'Presented by',
        body: `<p style="margin:0;font-size:14px;color:#334155;line-height:1.6;">${escape(data.presentedBy)}</p>`,
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
    card: `${hazardsCard}${presenterCard}`,
    trackingPixelUrl: data.trackingPixelUrl
  });

  return { subject, preheader, html };
}
