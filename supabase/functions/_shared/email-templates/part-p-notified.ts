// Part P — "your work has been notified to Building Control" (client-facing).
// Sent from the electrician's branded shell, like the certificate email. The
// point of the message is to set one expectation — the compliance certificate
// arrives by post from the scheme — and to leave the client with the two
// numbers a solicitor will ask for years later.

import {
  renderEmailShell,
  renderHero,
  renderSteps,
  renderButton,
  renderCard,
  type BrandedCompany,
} from '../email-template.ts';

export interface PartPNotifiedData {
  company: BrandedCompany;
  clientName: string;
  certificateNumber: string;
  certificateType: string;
  installationAddress?: string | null;
  /** ISO — when the notification was made */
  notifiedAt?: string | null;
  /** 'NAPIT' | 'NICEIC' | 'Stroma' | … ; null when notified direct to the council */
  schemeName: string | null;
  /** Council name when notified direct (may be null) */
  authorityName?: string | null;
  reference?: string | null;
  /** The scheme's returned compliance certificate, if attached in Elec-Mate */
  complianceCertificateUrl?: string | null;
  complianceCertificateName?: string | null;
}

export interface PartPNotifiedEmail {
  subject: string;
  preheader: string;
  html: string;
  text: string;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

const formatDateLong = (d: string | null | undefined): string => {
  if (!d) return '';
  const date = new Date(d);
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

export function buildPartPNotifiedEmail(data: PartPNotifiedData): PartPNotifiedEmail {
  const firstName = (data.clientName || 'there').trim().split(/\s+/)[0] || 'there';
  const addrShort = (data.installationAddress || '').split(',')[0]?.trim() || '';
  const when = formatDateLong(data.notifiedAt);
  const viaScheme = !!data.schemeName;
  const routeLabel = viaScheme
    ? `${data.schemeName} · competent person scheme`
    : data.authorityName || 'Local authority Building Control';
  const reference = (data.reference || '').trim();
  const accent = data.company.primaryColor || '#0f172a';

  const subject = `Building Control notified${addrShort ? ` — ${addrShort}` : ''}`;
  const preheader = viaScheme
    ? `Notified through ${data.schemeName}${when ? ` on ${when}` : ''}. Your compliance certificate follows by post.`
    : `Notified to ${data.authorityName || 'Building Control'}${when ? ` on ${when}` : ''}.`;

  const greeting = `Hi <strong style="color:#0f172a">${esc(firstName)}</strong>,`;
  const body = viaScheme
    ? `The electrical work we carried out${addrShort ? ` at <strong style="color:#0f172a">${esc(addrShort)}</strong>` : ''} was notifiable under Part P of the Building Regulations. We've notified it through <strong style="color:#0f172a">${esc(data.schemeName!)}</strong>, our competent person scheme${when ? `, on ${esc(when)}` : ''} — there's nothing you need to do.`
    : `The electrical work we carried out${addrShort ? ` at <strong style="color:#0f172a">${esc(addrShort)}</strong>` : ''} was notifiable under Part P of the Building Regulations. We've notified it directly to <strong style="color:#0f172a">${esc(data.authorityName || 'your local Building Control')}</strong>${when ? ` on ${esc(when)}` : ''}.`;

  const meta: Array<{ label: string; value: string }> = [
    { label: 'Certificate', value: esc(data.certificateNumber) },
    { label: 'Route', value: esc(viaScheme ? data.schemeName! : 'Building Control') },
  ];
  if (reference) meta.push({ label: 'Reference', value: esc(reference) });
  else if (when) meta.push({ label: 'Notified', value: esc(when) });

  const hero = renderHero({
    label: 'Building Control',
    value: 'Notified',
    sub: esc(routeLabel),
    meta,
    pill: { text: 'Part P · Building Regulations 2010', background: '#dcfce7', color: '#166534' },
  });

  const steps = renderSteps({
    label: 'What happens next',
    accent,
    steps: viaScheme
      ? [
          `${data.schemeName} tells your local Building Control — nothing for you to send.`,
          'A Building Regulations compliance certificate arrives by post, usually within a few weeks.',
          'Keep it with your electrical certificate. A buyer’s solicitor will ask for both.',
        ]
      : [
          'Building Control have the notice and our electrical certificate.',
          'They may inspect, or write to confirm completion.',
          'Keep their letter with your electrical certificate. A buyer’s solicitor will ask for both.',
        ],
  });

  const cta = data.complianceCertificateUrl
    ? renderButton({
        href: data.complianceCertificateUrl,
        label: 'Open the compliance certificate',
        background: accent,
        microcopy: data.complianceCertificateName
          ? `${data.complianceCertificateName} · save a copy for your records`
          : 'Save a copy for your records',
      })
    : '';

  const askCard = renderCard({
    label: 'If anyone asks',
    body: `<p style="margin:0;font-size:14px;color:#334155;line-height:1.65;">
      Quote certificate <strong style="color:#0f172a">${esc(data.certificateNumber)}</strong>${
        reference ? ` and reference <strong style="color:#0f172a">${esc(reference)}</strong>` : ''
      }. The Building Regulations compliance certificate is the document a solicitor, landlord or insurer will want to see, alongside the ${esc(data.certificateType)}.
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
    card: `${steps}${askCard}`,
  });

  const text = [
    `Hi ${firstName},`,
    '',
    viaScheme
      ? `The electrical work we carried out${addrShort ? ` at ${addrShort}` : ''} was notifiable under Part P of the Building Regulations. We've notified it through ${data.schemeName}, our competent person scheme${when ? `, on ${when}` : ''} — there's nothing you need to do.`
      : `The electrical work we carried out${addrShort ? ` at ${addrShort}` : ''} was notifiable under Part P of the Building Regulations. We've notified it directly to ${data.authorityName || 'your local Building Control'}${when ? ` on ${when}` : ''}.`,
    '',
    `Certificate: ${data.certificateNumber}`,
    `Route: ${routeLabel}`,
    ...(when ? [`Notified: ${when}`] : []),
    ...(reference ? [`Reference: ${reference}`] : []),
    '',
    'What happens next',
    ...(viaScheme
      ? [
          `1. ${data.schemeName} tells your local Building Control — nothing for you to send.`,
          '2. A Building Regulations compliance certificate arrives by post, usually within a few weeks.',
          "3. Keep it with your electrical certificate. A buyer's solicitor will ask for both.",
        ]
      : [
          '1. Building Control have the notice and our electrical certificate.',
          '2. They may inspect, or write to confirm completion.',
          "3. Keep their letter with your electrical certificate. A buyer's solicitor will ask for both.",
        ]),
    ...(data.complianceCertificateUrl ? ['', `Compliance certificate: ${data.complianceCertificateUrl}`] : []),
    '',
    'Any questions, just reply to this email.',
    '',
    'Thanks,',
    data.company.name,
    ...(data.company.phone ? [data.company.phone] : []),
  ].join('\n');

  return { subject, preheader, html, text };
}
