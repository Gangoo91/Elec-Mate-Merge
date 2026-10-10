// The boss's Sunday email (ELE-1836): "your team this week".
//
// Read on a phone on Sunday evening. The subject line carries last week's
// numbers, the preheader carries this week, the four numbers sit in a 2 x 2
// grid that still fits at 320 px, and there is one button: straight to the
// one thing worth fixing before Monday (or the hub when nothing needs it).
//
// Pure: data in, HTML out. The numbers come from _employer_weekly_digest().

import { renderEmailShell, renderButton, type BrandedCompany } from '../email-template.ts';

const APP_URL = 'https://www.elec-mate.com';

const esc = (s: unknown): string =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export interface WeeklyDigest {
  firm_name?: string;
  week_from: string;
  week_to: string;
  next_from: string;
  next_to: string;
  jobs: number;
  hours_approved: number;
  invoiced: number;
  paid_in: number;
  snags_open: number;
  jobs_booked: number;
  timesheets_waiting: number;
  unpaid_count: number;
  unpaid_sum: number;
  attested: Array<{ name: string; hours: number }>;
  fix: {
    kind: 'unassigned_day' | 'timesheets' | 'unpaid';
    text: string;
    route: string;
    amount?: number;
  } | null;
}

export interface WeeklyEmailInput {
  company: BrandedCompany;
  ownerFirstName: string;
  digest: WeeklyDigest;
  unsubscribeUrl: string;
}

const gbp = (n: unknown, pence = false): string => {
  const v = Number(n) || 0;
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: pence ? 2 : 0,
    maximumFractionDigits: pence ? 2 : 0,
  }).format(v);
};

const hrs = (n: unknown): string => {
  const v = Math.round((Number(n) || 0) * 10) / 10;
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
};

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** "28 Sep – 4 Oct" */
const range = (from: string, to: string): string => {
  const f = new Date(`${from}T12:00:00Z`);
  const t = new Date(`${to}T12:00:00Z`);
  const fmt = (d: Date, withMonth: boolean) =>
    d.toLocaleDateString('en-GB', {
      day: 'numeric',
      ...(withMonth ? { month: 'short' } : {}),
      timeZone: 'Europe/London',
    });
  const sameMonth = f.getUTCMonth() === t.getUTCMonth();
  return `${fmt(f, !sameMonth)} – ${fmt(t, true)}`;
};

/** One number cell in the 2 x 2 grid. */
const cell = (value: string, label: string, side: 'left' | 'right') => `
  <td width="50%" valign="top" style="width:50%;padding:${side === 'left' ? '0 6px 12px 0' : '0 0 12px 6px'};">
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 14px;">
      <p style="margin:0;font-size:26px;line-height:1.1;font-weight:700;color:#0f172a;letter-spacing:-0.5px;white-space:nowrap;">${value}</p>
      <p style="margin:6px 0 0;font-size:13px;line-height:1.35;color:#475569;">${label}</p>
    </div>
  </td>`;

const sectionLabel = (text: string, top = 0) =>
  `<p style="margin:${top}px 0 12px;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.12em;">${esc(text)}</p>`;

const line = (html: string) =>
  `<p style="margin:0 0 8px;font-size:15px;color:#334155;line-height:1.55;">${html}</p>`;

const CTA: Record<string, string> = {
  unassigned_day: 'Open the diary',
  timesheets: 'Approve timesheets',
  unpaid: 'See overdue invoices',
};

export function buildEmployerWeeklyEmail(input: WeeklyEmailInput): {
  subject: string;
  preheader: string;
  html: string;
} {
  const d = input.digest;
  // Same rule as the shell's safeHex: a firm's saved colour goes into inline
  // CSS, so only a plain #rgb / #rrggbb is let through.
  const brand = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(input.company.primaryColor ?? '')
    ? (input.company.primaryColor as string)
    : '#0f172a';

  // Only the numbers that happened go in the subject: "0 jobs, 0 hours, £0"
  // reads as a broken email, not a quiet week.
  const subjectBits = [
    d.jobs > 0 ? plural(d.jobs, 'job') : '',
    Number(d.hours_approved) > 0 ? `${hrs(d.hours_approved)} hours approved` : '',
    Number(d.invoiced) > 0 ? `${gbp(d.invoiced)} invoiced` : '',
  ].filter(Boolean);

  const thisWeek =
    d.jobs_booked > 0
      ? `This week: ${plural(d.jobs_booked, 'job')} booked.`
      : 'Nothing booked for this week yet.';
  const subject = subjectBits.length
    ? `Last week: ${subjectBits.join(', ')}`
    : `Your week ahead: ${d.jobs_booked > 0 ? `${plural(d.jobs_booked, 'job')} booked` : 'nothing booked yet'}`;
  const preheader =
    [subjectBits.length ? thisWeek : '', d.fix?.text ? `${d.fix.text}.` : '']
      .filter(Boolean)
      .join(' ') || 'Your team last week, and what is lined up for this one.';

  // ── Last week ──
  const grid = `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="table-layout:fixed;">
      <tr>${cell(String(d.jobs), d.jobs === 1 ? 'job on the go' : 'jobs on the go', 'left')}${cell(hrs(d.hours_approved), 'hours approved', 'right')}</tr>
      <tr>${cell(gbp(d.invoiced), 'invoiced', 'left')}${cell(String(d.snags_open), d.snags_open === 1 ? 'snag still open' : 'snags still open', 'right')}</tr>
    </table>`;
  // Four zeros in big type read as a fault. Say it was quiet instead.
  const quiet = !d.jobs && !Number(d.hours_approved) && !Number(d.invoiced) && !d.snags_open;
  const lastWeek = quiet
    ? line('A quiet week: no hours approved, no invoices sent and no snags open.')
    : grid;

  const extras: string[] = [];
  if (Number(d.paid_in) > 0)
    extras.push(
      line(`<strong style="color:#0f172a;">${gbp(d.paid_in)}</strong> paid in by clients.`)
    );
  for (const a of (d.attested || []).slice(0, 3)) {
    extras.push(
      line(
        `<strong style="color:#0f172a;">${esc(a.name)}</strong>: ${hrs(a.hours)} hours of off-the-job training signed off.`
      )
    );
  }

  // ── This week ──
  const thisWeekLines: string[] = [];
  thisWeekLines.push(
    line(
      d.jobs_booked > 0
        ? `<strong style="color:#0f172a;">${plural(d.jobs_booked, 'job')}</strong> booked in.`
        : 'Nothing booked in yet.'
    )
  );
  if (d.fix?.kind !== 'timesheets' && d.timesheets_waiting > 0) {
    thisWeekLines.push(
      line(`${plural(d.timesheets_waiting, 'timesheet')} waiting for you to approve.`)
    );
  }
  if (d.fix?.kind !== 'unpaid' && d.unpaid_count > 0) {
    thisWeekLines.push(
      line(`${plural(d.unpaid_count, 'invoice')} overdue, ${gbp(d.unpaid_sum, true)} outstanding.`)
    );
  }

  // ── The one thing to fix ──
  const fixAmount =
    d.fix?.kind === 'unpaid' && d.fix.amount ? `, ${gbp(d.fix.amount, true)} outstanding` : '';
  const fixBlock = d.fix
    ? `
    <tr>
      <td style="padding:8px 36px 24px;">
        <div style="border:1px solid #e2e8f0;border-left:4px solid ${esc(brand)};border-radius:12px;padding:16px 16px 14px;background:#ffffff;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.12em;">One thing to sort before Monday</p>
          <p style="margin:0;font-size:16px;font-weight:600;color:#0f172a;line-height:1.45;">${esc(d.fix.text)}${esc(fixAmount)}.</p>
        </div>
      </td>
    </tr>`
    : '';

  const content = `
    <tr>
      <td style="padding:20px 36px 4px;">
        ${sectionLabel(`Last week · ${range(d.week_from, d.week_to)}`)}
        ${lastWeek}
        ${extras.length ? `<div style="padding-top:4px;">${extras.join('')}</div>` : ''}
        ${sectionLabel(`This week · ${range(d.next_from, d.next_to)}`, 16)}
        ${thisWeekLines.join('')}
      </td>
    </tr>
    ${fixBlock || '<tr><td style="height:16px;line-height:16px;font-size:16px;">&nbsp;</td></tr>'}`;

  const ctaHref = `${APP_URL}${d.fix?.route || '/employer'}`;
  const cta = renderButton({
    label: (d.fix && CTA[d.fix.kind]) || 'Open your hub',
    href: ctaHref,
    background: brand,
    microcopy: 'Opens Elec-Mate › Employer Hub',
  });

  const html = renderEmailShell({
    subject,
    preheader,
    company: input.company,
    greeting: `Hi ${esc(input.ownerFirstName)},`,
    body: `Here is how your team got on last week, and what is lined up for this one.`,
    // The numbers and the fix sit where the shell puts a card; the button
    // comes after them so it is the last thing read, and the only thing to tap.
    card: content + cta,
    signoff: `<tr><td style="padding:20px 36px 30px;"><p style="margin:0;font-size:12.5px;color:#64748b;line-height:1.6;">You get this every Sunday at 6pm because you run ${esc(
      input.company.name
    )} on Elec&#8209;Mate. <a href="${esc(input.unsubscribeUrl)}" style="color:#475569;text-decoration:underline;">Stop the Sunday email</a></p></td></tr>`,
  });

  return { subject, preheader, html };
}
