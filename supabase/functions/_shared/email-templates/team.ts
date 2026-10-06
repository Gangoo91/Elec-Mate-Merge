// Firm → its own people (ELE-2013). Built on the house email shell so a
// worker's job email looks like the firm's quotes and invoices: the firm's
// logo or name on its own brand ribbon, one hero, one button.
//
// Written for someone reading it in the van at 375 px: the subject and
// preheader carry the whole message, nothing wraps into a grey label table,
// and the button goes straight to the item in Worker Tools.

import {
  renderEmailShell,
  renderButton,
  renderCard,
  type BrandedCompany,
} from '../email-template.ts';

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

/** A two-line "what / when / where" block — the hero for anything with a time and place. */
function whatWhenWhere(title: string, when: string, where?: string | null): string {
  const whereLine = where
    ? `<p style="margin:10px 0 0;font-size:15px;line-height:1.45;">
         <a href="${esc(mapsUrl(where))}" style="color:#0f172a;text-decoration:underline;text-underline-offset:3px;">${esc(where)}</a>
       </p>`
    : '';
  return `
    <p style="margin:0;font-size:22px;font-weight:700;color:#0f172a;line-height:1.25;letter-spacing:-0.3px;">${esc(title)}</p>
    <p style="margin:12px 0 0;font-size:15px;font-weight:600;color:#0f172a;line-height:1.45;">${esc(when)}</p>
    ${whereLine}
  `;
}

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

export function buildJobAssignedEmail(d: JobAssignedData): TeamEmail {
  const when = whenText(d.start, d.end);
  // Town and postcode: the last part of the address.
  const placeShort = (d.location || '').split(',').pop()?.trim() || '';
  const subject = `${dayTime(d.start)} · ${d.jobTitle}${placeShort ? `, ${placeShort}` : ''}`;
  const preheader = (d.notes?.trim() || `${d.company.name} has put you on this job.`).slice(0, 120);
  const url = `${APP_URL}/electrician/worker-tools/jobs?job=${encodeURIComponent(d.jobId)}`;

  const extras: string[] = [];
  if (d.notes?.trim()) {
    extras.push(
      `<p style="margin:0 0 14px;font-size:15px;color:#334155;line-height:1.6;white-space:pre-line;">${esc(d.notes.trim())}</p>`
    );
  }
  if (d.crew?.length) {
    extras.push(
      `<p style="margin:0 0 10px;font-size:14px;color:#334155;line-height:1.5;"><strong style="color:#0f172a;">Also on the job:</strong> ${esc(d.crew.join(', '))}</p>`
    );
  }
  if (d.toSign) {
    extras.push(
      `<p style="margin:0 0 10px;font-size:14px;color:#334155;line-height:1.5;"><strong style="color:#0f172a;">Before you start:</strong> ${esc(d.toSign)} to sign in Worker Tools.</p>`
    );
  }
  extras.push(
    `<p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">The calendar invite is attached. Open it to add the job to your diary.</p>`
  );

  const html = renderEmailShell({
    subject,
    preheader,
    company: d.company,
    greeting: `Hi ${esc(firstNameOf(d.recipientName))},`,
    body: `${esc(d.company.name)} has put you on this job.`,
    hero: whatWhenWhere(d.jobTitle, when, d.location),
    cta: renderButton({
      label: 'Open the job',
      href: url,
      background: d.company.primaryColor || '#0f172a',
      microcopy: 'Opens in Elec-Mate › Worker Tools',
    }),
    card: renderCard({ label: 'From the office', body: extras.join('') }),
  });

  return { subject, preheader, html };
}

export interface TeamInviteData {
  company: BrandedCompany;
  recipientName: string | null;
  acceptUrl: string;
}

export function buildTeamInviteEmail(d: TeamInviteData): TeamEmail {
  const firm = d.company.name;
  const subject = `${firm} added you to their team on Elec-Mate`;
  const preheader = `Set up your free account to see your jobs, clock in and send timesheets.`;
  const html = renderEmailShell({
    subject,
    preheader,
    company: d.company,
    greeting: `Hi ${esc(firstNameOf(d.recipientName))},`,
    body: `${esc(firm)} runs its jobs, timesheets and site paperwork on Elec-Mate, and has added you to the team. <strong style="color:#0f172a;">It's free for you.</strong> ${esc(firm)} covers your access, no card needed.`,
    // No hero on this one, so give the button room below the paragraph.
    cta:
      '<tr><td style="height:24px;line-height:24px;font-size:0;">&nbsp;</td></tr>' +
      renderButton({
        label: 'Join the team',
        href: d.acceptUrl,
        background: d.company.primaryColor || '#0f172a',
        microcopy: 'This invite is just for you and expires in 14 days.',
      }),
    card: renderCard({
      label: 'Once you are in',
      body: `<p style="margin:0 0 10px;font-size:14px;color:#334155;line-height:1.55;">Open <strong style="color:#0f172a;">Worker Tools</strong> to see your jobs, clock in and out, and send timesheets, leave and expenses.</p>
             <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">For the smoothest setup, open the link in Safari or Chrome rather than inside your email app.</p>`,
    }),
  });
  return { subject, preheader, html };
}
