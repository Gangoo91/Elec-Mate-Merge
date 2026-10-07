// Firm → its own people (ELE-2013). Built on the house email shell so a
// worker's job email looks like the firm's quotes and invoices: the firm's
// logo or name on its own brand ribbon, one hero, one button.
//
// Written for someone reading it in the van at 375 px: the subject and
// preheader carry the whole message, nothing wraps into a grey label table,
// and the button goes straight to the item in Worker Tools.

import { renderEmailShell, type BrandedCompany } from '../email-template.ts';

const APP_URL = 'https://www.elec-mate.com';

const esc = (s: unknown): string =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** "Demo Worker (test)" → "Demo". Never greet with a roster display name. */
export const firstNameOf = (name: string | null | undefined): string => {
  const clean = String(name ?? '')
    .replace(/\(.*?\)/g, '')
    .trim();
  return clean.split(/\s+/)[0] || 'there';
};

/**
 * Firm branding from company_profiles. Only a hosted (https) logo is used:
 * Gmail and Outlook strip data: images, which left a broken icon in the header.
 */
// deno-lint-ignore no-explicit-any
export function teamCompany(profile: any, fallbackName: string): BrandedCompany {
  const logo = (profile?.logo_url as string | undefined) ?? null;
  return {
    name: (profile?.company_name as string | undefined)?.trim() || fallbackName,
    logoUrl: logo && /^https:\/\//.test(logo) ? logo : null,
    primaryColor: profile?.primary_color || null,
    email: profile?.company_email || null,
    phone: profile?.company_phone || null,
    website: profile?.company_website || null,
    address: profile?.company_address || null,
    vatNumber: profile?.vat_number || null,
    registrationNumber: profile?.company_registration || null,
  };
}

const dayTime = (iso: string): string => {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const day = d.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'Europe/London',
  });
  const hasTime = !/T00:00(:00)?(\.000)?Z?$/.test(iso) && iso.length > 10;
  let time = '';
  if (hasTime) {
    // "9am", "1:30pm" — UK local time.
    const parts = new Intl.DateTimeFormat('en-GB', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Europe/London',
    }).formatToParts(d);
    const h = parts.find((p) => p.type === 'hour')?.value ?? '';
    const m = parts.find((p) => p.type === 'minute')?.value ?? '00';
    const ap = (parts.find((p) => p.type === 'dayPeriod')?.value ?? '')
      .toLowerCase()
      .replace(/\./g, '')
      .replace(/\s/g, '');
    time = `${h}${m === '00' ? '' : `:${m}`}${ap}`;
  }
  return time ? `${day}, ${time}` : day;
};

const whenText = (start: string, end?: string | null): string => {
  const s = dayTime(start);
  if (!end) return s;
  const sameDay = new Date(start).toDateString() === new Date(end).toDateString();
  return sameDay ? s : `${s} – ${dayTime(end)}`;
};

const mapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export interface JobAssignedData {
  company: BrandedCompany;
  recipientName: string | null;
  jobId: string;
  jobTitle: string;
  location?: string | null;
  start: string;
  end?: string | null;
  notes?: string | null;
  /** Other people on the job (first names are fine). */
  crew?: string[];
  /** Things to sign before starting, e.g. "1 RAMS pack". */
  toSign?: string | null;
}

export interface TeamEmail {
  subject: string;
  preheader: string;
  html: string;
}

// ─── Shared pieces ───────────────────────────────────────────────────
// Literal characters, not HTML entities: the plain-text part is made by
// htmlToPlainText, which only decodes a handful of entities.

const INK = '#0f172a';
const BODY = '#334155';
const MUTED = '#64748b';

/**
 * Full-width dark button. The firm's brand colour sits on the ribbon instead:
 * a pale brand yellow turned muddy olive in Gmail's dark mode, which is where
 * most phones read these.
 */
function teamButton(label: string, href: string, microcopy?: string): string {
  return `
    <tr>
      <td style="padding:4px 36px 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td align="center" bgcolor="${INK}" style="background:${INK};border-radius:12px;">
              <a href="${esc(href)}"
                style="display:block;padding:17px 20px;color:#ffffff;text-decoration:none;font-size:17px;font-weight:700;letter-spacing:0.2px;text-align:center;border-radius:12px;">
                ${esc(label)} →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    ${
      microcopy
        ? `<tr>
      <td style="padding:12px 36px 0;text-align:center;">
        <p style="margin:0;font-size:13px;color:${MUTED};line-height:1.5;">${esc(microcopy)}</p>
      </td>
    </tr>`
        : ''
    }`;
}

/** Left-aligned hero panel: eyebrow, big title, then whatever goes under it. */
function heroPanel(label: string, title: string, inner: string): string {
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
      style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
      <tr>
        <td style="padding:22px 22px 24px;text-align:left;">
          <p style="margin:0;font-size:11px;font-weight:700;color:${MUTED};text-transform:uppercase;letter-spacing:0.12em;">${esc(label)}</p>
          <p style="margin:8px 0 0;font-size:24px;font-weight:700;color:${INK};line-height:1.25;letter-spacing:-0.3px;">${title}</p>
          ${inner}
        </td>
      </tr>
    </table>`;
}

const pill = (text: string) =>
  `<span style="display:inline-block;margin-top:14px;padding:6px 12px;background:#dcfce7;color:#166534;border-radius:999px;font-size:13px;font-weight:600;">${esc(text)}</span>`;

function sectionRule(): string {
  return `<tr><td style="padding:28px 36px 0;"><div style="height:1px;background:#e2e8f0;line-height:1px;font-size:1px;">&nbsp;</div></td></tr>`;
}

function eyebrow(text: string): string {
  return `<p style="margin:0 0 16px;font-size:11px;font-weight:700;color:${MUTED};text-transform:uppercase;letter-spacing:0.12em;">${esc(text)}</p>`;
}

/** "Questions? Reply…" — only when replies reach the firm (send uses company_email as Reply-To). */
function signoff(company: BrandedCompany): string {
  const reply = company.email
    ? `<p style="margin:0 0 18px;font-size:14px;color:${BODY};line-height:1.55;">Questions? Reply to this email and it goes straight to ${esc(company.name)}.</p>`
    : '';
  return `
    <tr>
      <td style="padding:28px 36px 36px;">
        ${reply}
        <p style="margin:0 0 4px;font-size:15px;color:${BODY};line-height:1.6;">Thanks,</p>
        <p style="margin:0;font-size:15px;color:${INK};font-weight:600;line-height:1.6;">${esc(company.name)}</p>
      </td>
    </tr>`;
}

// ─── Job assigned ────────────────────────────────────────────────────

/** One fact in the job panel, label above value so a phone gets the full width. */
function factRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:16px 0 0;">
        <p style="margin:0 0 3px;font-size:11px;font-weight:700;color:${MUTED};text-transform:uppercase;letter-spacing:0.1em;">${esc(label)}</p>
        ${value}
      </td>
    </tr>`;
}

export function buildJobAssignedEmail(d: JobAssignedData): TeamEmail {
  const when = whenText(d.start, d.end);
  // Town and postcode: the last part of the address.
  const placeShort = (d.location || '').split(',').pop()?.trim() || '';
  const subject = `${dayTime(d.start)} · ${d.jobTitle}${placeShort ? `, ${placeShort}` : ''}`;
  const preheader = (
    d.notes?.trim() || `${d.company.name} has put you on this job. ${when}.`
  ).slice(0, 120);
  const url = `${APP_URL}/electrician/worker-tools/jobs?job=${encodeURIComponent(d.jobId)}`;

  const facts = [
    factRow('When', `<p style="margin:0;font-size:15px;font-weight:600;color:${INK};line-height:1.5;">${esc(when)}</p>`),
  ];
  if (d.location?.trim()) {
    facts.push(
      factRow(
        'Where',
        `<p style="margin:0;font-size:15px;color:${INK};line-height:1.5;">${esc(d.location.trim())}</p>
         <p style="margin:4px 0 0;font-size:14px;line-height:1.5;"><a href="${esc(mapsUrl(d.location.trim()))}" style="color:${INK};font-weight:600;text-decoration:underline;text-underline-offset:3px;">Directions</a></p>`
      )
    );
  }
  if (d.crew?.length) {
    facts.push(
      factRow('With', `<p style="margin:0;font-size:15px;color:${INK};line-height:1.5;">${esc(d.crew.join(', '))}</p>`)
    );
  }
  const hero = heroPanel(
    'New job',
    esc(d.jobTitle),
    `<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top:4px;">${facts.join('')}</table>`
  );

  // Something to do before starting goes above the button, where it's seen.
  const beforeYouStart = d.toSign
    ? `<tr>
      <td style="padding:0 36px 16px;">
        <p style="margin:0;padding:12px 14px;background:#fef3c7;border-radius:10px;font-size:14px;color:#78350f;line-height:1.5;">
          <strong style="color:#78350f;">Before you start:</strong> ${esc(d.toSign)} to sign in Worker Tools.
        </p>
      </td>
    </tr>`
    : '';

  const notes = d.notes?.trim()
    ? `${sectionRule()}
    <tr>
      <td style="padding:24px 36px 0;">
        ${eyebrow('From the office')}
        <p style="margin:0;font-size:15px;color:${BODY};line-height:1.6;white-space:pre-line;">${esc(d.notes.trim())}</p>
      </td>
    </tr>`
    : '';

  const calendar = `
    <tr>
      <td style="padding:${notes ? '20px' : '24px'} 36px 0;">
        <p style="margin:0;font-size:13px;color:${MUTED};line-height:1.5;">The calendar invite is attached. Open it to add the job to your diary.</p>
      </td>
    </tr>`;

  const html = renderEmailShell({
    subject,
    preheader,
    company: d.company,
    greeting: `Hi ${esc(firstNameOf(d.recipientName))},`,
    body: `${esc(d.company.name)} has put you on a job.`,
    hero,
    cta: beforeYouStart + teamButton('Open the job', url, 'Opens in Elec-Mate › Worker Tools'),
    card: notes + calendar,
    signoff: signoff(d.company),
  });

  return { subject, preheader, html };
}

// ─── Team invite ─────────────────────────────────────────────────────

export interface TeamInviteData {
  company: BrandedCompany;
  recipientName: string | null;
  acceptUrl: string;
}

/** One "what you get" row: a tick, a bold line and a plain explanation. */
function featureRow(title: string, text: string, first = false): string {
  return `
    <tr>
      <td style="padding:${first ? '0' : '14px'} 14px 0 0;vertical-align:top;width:22px;">
        <span style="display:inline-block;width:22px;height:22px;line-height:22px;border-radius:999px;background:#dcfce7;color:#166534;text-align:center;font-size:13px;font-weight:700;">✓</span>
      </td>
      <td style="padding:${first ? '1px' : '15px'} 0 0;vertical-align:top;">
        <p style="margin:0;font-size:15px;font-weight:600;color:${INK};line-height:1.4;">${title}</p>
        <p style="margin:2px 0 0;font-size:14px;color:${BODY};line-height:1.5;">${text}</p>
      </td>
    </tr>`;
}

export function buildTeamInviteEmail(d: TeamInviteData): TeamEmail {
  const firm = d.company.name;
  const firmHtml = esc(firm);
  const subject = `${firm} added you to their team on Elec-Mate`;
  const preheader = `Free for you. See your jobs, clock in and send timesheets from your phone.`;
  const strong = (t: string) => `<strong style="color:${INK};">${t}</strong>`;

  const steps = [
    `Tap ${strong('Join the team')} above.`,
    'Choose a password, or sign in if you already use Elec-Mate.',
    `You land in ${strong('Worker Tools')}, ready to go.`,
  ]
    .map(
      (t, i) => `
          <tr>
            <td style="padding:${i === 0 ? '0' : '12px'} 14px 0 0;vertical-align:top;width:24px;">
              <span style="display:inline-block;width:24px;height:24px;line-height:24px;border-radius:999px;background:${INK};color:#ffffff;text-align:center;font-size:12px;font-weight:700;">${i + 1}</span>
            </td>
            <td style="padding:${i === 0 ? '2px' : '14px'} 0 0;vertical-align:top;">
              <p style="margin:0;font-size:15px;color:${BODY};line-height:1.5;">${t}</p>
            </td>
          </tr>`
    )
    .join('');

  const card = `
    ${sectionRule()}
    <tr>
      <td style="padding:24px 36px 0;">
        ${eyebrow('What you get')}
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          ${featureRow('Your jobs on your phone', 'The address, times and who else is on site.', true)}
          ${featureRow('Clock in and out', 'Your timesheet fills itself in as you go.')}
          ${featureRow('Leave and expenses', 'Send them in a few taps and see when they are approved.')}
        </table>
      </td>
    </tr>
    ${sectionRule()}
    <tr>
      <td style="padding:24px 36px 0;">
        ${eyebrow('Joining takes a minute')}
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">${steps}</table>
      </td>
    </tr>
    <tr>
      <td style="padding:22px 36px 0;">
        <p style="margin:0;padding:12px 14px;background:#f8fafc;border-radius:10px;font-size:13px;color:${BODY};line-height:1.5;">
          ${strong('Tip:')} if the link opens inside your email app, choose ${strong('Open in Safari')} or ${strong('Open in Chrome')} so you stay signed in.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 36px 0;">
        <p style="margin:0;font-size:12px;color:${MUTED};line-height:1.5;">Button not working? Copy this link into your browser:<br>
          <a href="${esc(d.acceptUrl)}" style="color:${MUTED};word-break:break-all;">${esc(d.acceptUrl)}</a>
        </p>
      </td>
    </tr>`;

  const html = renderEmailShell({
    subject,
    preheader,
    company: d.company,
    greeting: `Hi ${esc(firstNameOf(d.recipientName))},`,
    body: `${firmHtml} runs its jobs, timesheets and site paperwork on Elec-Mate.`,
    hero: heroPanel('Team invite', `You've been added to the ${firmHtml} team`, pill('Free for you · no card needed')),
    cta: teamButton('Join the team', d.acceptUrl, 'Takes about a minute. This link is just for you and lasts 14 days.'),
    card,
    signoff: signoff(d.company),
  });
  return { subject, preheader, html };
}

export interface CoveredByEmployerData {
  company: BrandedCompany;
  recipientName: string | null;
}

/**
 * The worker joined a team while paying for Elec-Mate through the App Store or
 * Google Play. The firm's seat now covers them, but we can't cancel a store
 * subscription for them, so the whole point of this email is: cancel it, here's
 * how, and you keep everything.
 */
export function buildCoveredByEmployerEmail(d: CoveredByEmployerData): TeamEmail {
  const firm = d.company.name;
  const firmHtml = esc(firm);
  const subject = `${firm} now covers your Elec-Mate access`;
  const preheader = `Cancel your App Store or Google Play subscription so you're not charged twice. You keep everything.`;
  const strong = (t: string) => `<strong style="color:${INK};">${t}</strong>`;
  const how = (title: string, steps: string) => `
          <p style="margin:0;font-size:15px;font-weight:600;color:${INK};line-height:1.4;">${title}</p>
          <p style="margin:2px 0 14px;font-size:14px;color:${BODY};line-height:1.5;">${steps}</p>`;

  const card = `
    ${sectionRule()}
    <tr>
      <td style="padding:24px 36px 0;">
        ${eyebrow('How to cancel your own subscription')}
        ${how('iPhone or iPad', `Open ${strong('Settings')}, tap your name, then ${strong('Subscriptions')}, ${strong('Elec-Mate')}, ${strong('Cancel Subscription')}.`)}
        ${how('Android', `Open the ${strong('Play Store')}, tap your profile picture, then ${strong('Payments &amp; subscriptions')}, ${strong('Subscriptions')}, ${strong('Elec-Mate')}, ${strong('Cancel')}.`)}
        <p style="margin:0;padding:12px 14px;background:#f8fafc;border-radius:10px;font-size:13px;color:${BODY};line-height:1.5;">
          Your access carries on through ${firmHtml}. If you ever leave the team, you can subscribe again from the app.
        </p>
      </td>
    </tr>`;

  const html = renderEmailShell({
    subject,
    preheader,
    company: d.company,
    greeting: `Hi ${esc(firstNameOf(d.recipientName))},`,
    body: `You joined the ${firmHtml} team, so your Elec-Mate access is now part of their plan. We can't cancel an App Store or Google Play subscription for you, so please cancel it yourself to stop being charged.`,
    hero: heroPanel("You're covered", `${firmHtml} now pays for your access`, pill('Nothing changes in the app')),
    cta: teamButton('Open Worker Tools', `${APP_URL}/electrician/worker-tools`, 'Your jobs, timesheets and the rest are all still there.'),
    card,
    signoff: signoff(d.company),
  });
  return { subject, preheader, html };
}
