// Certificate expiry reminder — sent to a client whose electrical
// certificate (EICR/EIC/Solar PV/etc.) is approaching its expiry date.
// Tone escalates by tier: 30-day = informational, 14-day = nudge,
// 7-day = urgent. Each tier surfaces the same hero (cert ref + days
// remaining) and a single "Book re-inspection" CTA to the electrician.

import {
  renderEmailShell,
  renderHero,
  renderButton,
  renderCard,
  renderSteps,
  type BrandedCompany,
} from '../email-template.ts';

export type ExpiryTier = '30-day' | '14-day' | '7-day';

export interface CertExpiryReminderData {
  company: BrandedCompany;
  clientName: string;
  /** Cert type display name, e.g. "EICR" / "Solar PV" */
  certificateType: string;
  certificateNumber: string;
  /** Property the cert was issued for */
  installationAddress?: string | null;
  /** ISO date — when the cert expires */
  expiryDate: string | Date;
  /** How many days until expiry (caller computes for accuracy) */
  daysUntilExpiry: number;
  /** Which tier of reminder this is */
  tier: ExpiryTier;
  /** Optional URL to book a re-inspection. If absent, footer contact only. */
  bookingUrl?: string | null;
  /** Email-open tracking pixel URL (see _shared/email-template.ts ShellOptions.trackingPixelUrl). */
  trackingPixelUrl?: string | null;
  /** Signed opt-out link — scoped to this electrician, not the global list. */
  unsubscribeUrl?: string | null;
}

export interface CertExpiryReminderEmail {
  subject: string;
  preheader: string;
  html: string;
}

const formatDateLong = (d: string | Date): string => {
  const date = typeof d === 'string' ? new Date(d) : d;
  if (isNaN(date.getTime())) return String(d);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

export function buildCertExpiryReminderEmail(
  data: CertExpiryReminderData
): CertExpiryReminderEmail {
  const firstName = (data.clientName || 'there').split(' ')[0] || 'there';
  const certType = data.certificateType || 'Certificate';
  const expiryStr = formatDateLong(data.expiryDate);
  const addrShort = (data.installationAddress || '').split(',')[0]?.trim() || '';
  const days = Math.max(0, Math.floor(data.daysUntilExpiry));
  const dayWord = days === 1 ? 'day' : 'days';

  // Subject + preheader per tier.
  const subjects: Record<ExpiryTier, string> = {
    '30-day': `Your ${certType} is due for renewal`,
    '14-day': `Reminder: your ${certType} expires in ${days} ${dayWord}`,
    '7-day': `Urgent: your ${certType} expires in ${days} ${dayWord}`,
  };
  const preheaders: Record<ExpiryTier, string> = {
    '30-day': `${certType} ${data.certificateNumber} expires ${expiryStr} — time to plan your re-inspection`,
    '14-day': `${certType} ${data.certificateNumber} expires in ${days} ${dayWord} (${expiryStr})`,
    '7-day': `${certType} ${data.certificateNumber} expires in ${days} ${dayWord} — please book your re-inspection now`,
  };

  // Tone-aware body.
  const bodies: Record<ExpiryTier, string> = {
    '30-day': `Your <strong style="color:#0f172a">${certType}</strong> certificate for ${addrShort ? `<strong style="color:#0f172a">${addrShort}</strong>` : 'your property'} expires on <strong style="color:#0f172a">${expiryStr}</strong>. There's no rush yet, but it's a good time to think about booking a re-inspection so you stay compliant.`,
    '14-day': `Just a nudge — your <strong style="color:#0f172a">${certType}</strong> certificate for ${addrShort ? `<strong style="color:#0f172a">${addrShort}</strong>` : 'your property'} expires in <strong style="color:#0f172a">${days} ${dayWord}</strong>. Best to get a re-inspection booked in so it doesn't lapse.`,
    '7-day': `Your <strong style="color:#0f172a">${certType}</strong> certificate for ${addrShort ? `<strong style="color:#0f172a">${addrShort}</strong>` : 'your property'} expires in <strong style="color:#0f172a">${days} ${dayWord}</strong>. Once it lapses you won't have valid documentation for your insurer / lender / letting agent — please get in touch so we can book a re-inspection straight away.`,
  };

  // Pill — subtle escalation: neutral / amber / red.
  const pills: Record<ExpiryTier, { background: string; color: string; text: string }> = {
    '30-day': {
      text: `${days} ${dayWord} until expiry`,
      background: '#f1f5f9',
      color: '#475569',
    },
    '14-day': {
      text: `Expires in ${days} ${dayWord}`,
      background: '#fef3c7',
      color: '#92400e',
    },
    '7-day': {
      text: days === 0 ? 'Expires today' : `Expires in ${days} ${dayWord}`,
      background: '#fee2e2',
      color: '#991b1b',
    },
  };

  // Hero — the cert reference + days-remaining countdown via pill.
  const meta: Array<{ label: string; value: string }> = [
    {
      label: 'Reference',
      value: `<span style="font-family:'SF Mono',Menlo,Consolas,monospace;">${data.certificateNumber}</span>`,
    },
    { label: 'Expires', value: expiryStr },
  ];

  const hero = renderHero({
    label: certType,
    value: `<span style="font-size:48px;">${days}</span><span style="font-size:18px;color:#64748b;font-weight:500;margin-left:8px;">${dayWord} left</span>`,
    sub: addrShort || undefined,
    meta,
    pill: pills[data.tier],
  });

  // CTA — book re-inspection if URL present, else fall through to footer
  // contact details (which always include phone / email).
  const cta = data.bookingUrl
    ? renderButton({
        href: data.bookingUrl,
        label: 'Book re-inspection',
        background: data.company.primaryColor || '#0f172a',
        microcopy: 'Pick a date that suits you — takes about a minute',
      })
    : '';

  // Reassurance card — always shown. Why this matters in plain English.
  const reassurance = renderCard({
    label: 'Why this matters',
    body: `<p style="margin:0;font-size:14px;color:#334155;line-height:1.65;">
      Regular electrical inspections keep your property safe and meet current regulations. Most insurers, mortgage lenders and letting agents ask to see a valid certificate — re-inspecting in good time keeps yours up to date and avoids surprises.
    </p>`,
  });

  const signoff = `<tr>
    <td style="padding:0 36px 36px;">
      <p style="margin:0 0 4px;font-size:15px;color:#334155;line-height:1.6;">Best regards,</p>
      <p style="margin:0;font-size:15px;color:#0f172a;font-weight:600;line-height:1.6;">${data.company.name}</p>
      <p style="margin:14px 0 0;font-size:13px;color:#94a3b8;line-height:1.5;">
        Reply to this email to book a re-inspection or ask any questions.
      </p>
      ${data.unsubscribeUrl ? `<p style="margin:10px 0 0;font-size:11.5px;color:#94a3b8;line-height:1.5;">Don't want these reminders? <a href="${data.unsubscribeUrl}" style="color:#94a3b8;text-decoration:underline;">Stop them here</a>.</p>` : ''}
    </td>
  </tr>`;

  const html = renderEmailShell({
    subject: subjects[data.tier],
    preheader: preheaders[data.tier],
    company: data.company,
    greeting: `Hi <strong style="color:#0f172a">${firstName}</strong>,`,
    body: bodies[data.tier],
    hero,
    cta,
    card: reassurance,
    signoff,
    trackingPixelUrl: data.trackingPixelUrl
  });

  return { subject: subjects[data.tier], preheader: preheaders[data.tier], html };
}

export interface MaintenanceVisitEmailData {
  company: BrandedCompany;
  clientName: string;
  /** e.g. "Quarterly PAT testing" — the contract's own words */
  jobType: string;
  /** Property / site, if known */
  installationAddress?: string | null;
  /** ISO date the visit is due */
  dueDate: string | Date;
  /** Days until the visit (caller computes) */
  daysUntilDue: number;
  bookingUrl?: string | null;
  trackingPixelUrl?: string | null;
  /** Signed opt-out link — scoped to this electrician, not the global list. */
  unsubscribeUrl?: string | null;
}

/**
 * Maintenance-contract visit reminder — same shell as the cert expiry email
 * but the copy is about a SCHEDULED VISIT, not an expiring certificate.
 * "Your EICR expires" makes no sense for a quarterly PAT round; this says
 * "your next visit is due" and offers the same one-tap booking funnel.
 */
export function buildMaintenanceVisitEmail(
  data: MaintenanceVisitEmailData
): CertExpiryReminderEmail {
  const firstName = (data.clientName || 'there').split(' ')[0] || 'there';
  const due = typeof data.dueDate === 'string' ? new Date(data.dueDate) : data.dueDate;
  const dueLong = formatDateLong(data.dueDate);
  // "Wednesday 2 September" reads like an appointment; a bare countdown reads
  // like a bill. The date leads.
  const dueDay = isNaN(due.getTime())
    ? dueLong
    : due.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  const addrShort = (data.installationAddress || '').split(',')[0]?.trim() || '';
  const days = Math.max(0, Math.floor(data.daysUntilDue));
  const dayWord = days === 1 ? 'day' : 'days';
  const jobLower = data.jobType.toLowerCase();

  const subject = `Time to book your ${jobLower}`;
  const preheader = `${data.jobType} due ${dueLong} — pick a time that suits you`;

  const meta: Array<{ label: string; value: string }> = [
    { label: 'Service', value: escapeMeta(data.jobType) },
  ];
  if (addrShort) meta.push({ label: 'Property', value: escapeMeta(addrShort) });
  meta.push({ label: 'With', value: escapeMeta(data.company.name) });

  const hero = renderHero({
    label: 'Your next visit',
    value: `<span style="font-size:30px;line-height:1.2;">${escapeMeta(dueDay)}</span>`,
    meta,
    pill:
      days > 0
        ? { text: `${days} ${dayWord} away`, background: '#f1f5f9', color: '#475569' }
        : { text: 'Due today', background: '#fef3c7', color: '#92400e' },
  });

  const cta = data.bookingUrl
    ? renderButton({
        href: data.bookingUrl,
        label: 'Book your visit',
        background: data.company.primaryColor || '#0f172a',
        microcopy: 'Takes about a minute — pick any time that suits you',
      })
    : '';

  // "What happens next" — the steps block sets expectations and makes the
  // single button feel like the obvious, low-effort move.
  const steps = renderSteps({
    label: 'How it works',
    accent: data.company.primaryColor || null,
    steps: [
      'Pick a time that suits you',
      `${data.company.name} comes out and does the work`,
      'Your paperwork lands in your inbox',
    ],
  });

  const signoff = `<tr>
    <td style="padding:0 36px 36px;">
      <p style="margin:0 0 4px;font-size:15px;color:#334155;line-height:1.6;">Best regards,</p>
      <p style="margin:0;font-size:15px;color:#0f172a;font-weight:600;line-height:1.6;">${data.company.name}</p>
      <p style="margin:14px 0 0;font-size:13px;color:#94a3b8;line-height:1.5;">
        Prefer to sort it by reply? Just answer this email and we'll arrange it.
      </p>
      ${data.unsubscribeUrl ? `<p style="margin:10px 0 0;font-size:11.5px;color:#94a3b8;line-height:1.5;">Don't want these reminders? <a href="${data.unsubscribeUrl}" style="color:#94a3b8;text-decoration:underline;">Stop them here</a>.</p>` : ''}
    </td>
  </tr>`;

  const html = renderEmailShell({
    subject,
    preheader,
    company: data.company,
    greeting: `Hi <strong style="color:#0f172a">${firstName}</strong>,`,
    body: `It's nearly time for your <strong style="color:#0f172a">${jobLower}</strong>${addrShort ? ` at <strong style="color:#0f172a">${addrShort}</strong>` : ''}. Keeping it on schedule keeps everything safe and compliant — and booking takes about a minute.`,
    hero,
    cta,
    card: steps,
    signoff,
    trackingPixelUrl: data.trackingPixelUrl,
  });

  return { subject, preheader, html };
}

/** renderHero meta values are injected as HTML — escape ours. */
const escapeMeta = (s: string): string =>
  String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
