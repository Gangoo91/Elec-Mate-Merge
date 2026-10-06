// employer-office-alert (ELE-1986 / ELE-1988)
//
// Emails the firm's office address (company_profiles.notification_email, set
// in Employer Hub → Settings → Notifications) when something needs the office:
//
//   kind = 'incident'       an incident or near miss was reported (instant)
//   kind = 'invoice_paid'   a client paid an invoice (instant)
//   kind = 'daily_summary'  weekday 08:15: timesheets / leave / expenses waiting
//                           for approval + expiry reminders raised that day
//
// Called only by the database: queue_office_email() → net.http_post with the
// service-role key from vault (same pattern as notify-team-join). The address
// is re-read here; it never travels in the queue. employer_office_email_log
// (unique employer/kind/ref) guarantees one email per event.
//
// The in-app bell already covers everyone; this is the office's inbox copy.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import { corsHeaders } from '../_shared/cors.ts';
import { sendEmail, clientFacingSender, htmlToPlainText, isSendableEmail } from '../_shared/mailer.ts';
import {
  renderEmailShell,
  renderButton,
  renderCard,
  renderHero,
} from '../_shared/email-template.ts';
import { teamCompany } from '../_shared/email-templates/team.ts';
import { withSentry } from '../_shared/sentry.ts';

const APP_URL = 'https://www.elec-mate.com';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const esc = (s: unknown): string =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const gbp = (n: unknown): string => {
  const v = Number(n);
  if (!isFinite(v)) return '';
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(v);
};

const ukDate = (iso: unknown, withTime = false): string => {
  if (!iso) return '';
  const d = new Date(String(iso));
  if (isNaN(d.getTime())) return String(iso);
  return d.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
    timeZone: 'Europe/London',
  });
};

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** A plain line-per-row list for the card — no grey label tables. */
const rows = (items: Array<[string, string]>): string =>
  items
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<p style="margin:0 0 10px;font-size:14px;color:#334155;line-height:1.5;"><strong style="color:#0f172a;">${esc(k)}:</strong> ${esc(v)}</p>`
    )
    .join('');

interface Built {
  subject: string;
  preheader: string;
  hero?: string;
  body: string;
  card?: string;
  ctaLabel: string;
  ctaHref: string;
  entityId: string | null;
}

// deno-lint-ignore no-explicit-any
type Admin = any;

async function buildIncident(admin: Admin, employerId: string, incidentId: string): Promise<Built | null> {
  const { data: inc } = await admin
    .from('employer_incidents')
    .select(
      'id, employer_id, title, description, incident_type, severity, reported_by, reported_at, created_at, location, job_id, riddor_reportable, injured_person, injuries_sustained, hospital_visit'
    )
    .eq('id', incidentId)
    .maybeSingle();
  if (!inc || inc.employer_id !== employerId) return null;

  let reporter = '';
  if (inc.reported_by && /^[0-9a-f-]{36}$/i.test(inc.reported_by)) {
    const { data: e } = await admin
      .from('employer_employees')
      .select('name')
      .eq('id', inc.reported_by)
      .maybeSingle();
    reporter = e?.name ?? '';
  }
  let job = '';
  if (inc.job_id) {
    const { data: j } = await admin.from('employer_jobs').select('title').eq('id', inc.job_id).maybeSingle();
    job = j?.title ?? '';
  }

  const nearMiss = /near/i.test(inc.incident_type ?? '');
  const kind = nearMiss ? 'Near miss' : 'Incident';
  const severity = inc.severity ? String(inc.severity).replace(/^\w/, (c: string) => c.toUpperCase()) : '';
  const subject = `${kind} reported${reporter ? ` by ${reporter}` : ''}${job ? ` · ${job}` : ''}`;
  const what = (inc.description || inc.title || '').trim();

  const injury = [inc.injured_person, inc.injuries_sustained].filter(Boolean).join(': ');
  return {
    subject,
    preheader: what.slice(0, 120) || `${kind} logged in the Employer Hub.`,
    body: `${esc(reporter || 'Someone on your team')} reported ${nearMiss ? 'a near miss' : 'an incident'}${
      job ? ` on <strong style="color:#0f172a;">${esc(job)}</strong>` : ''
    }. Open it to acknowledge it, so they know the office has seen it, and record what happens next.`,
    card: renderCard({
      label: 'What was reported',
      body:
        (what
          ? `<p style="margin:0 0 14px;font-size:15px;color:#0f172a;line-height:1.6;white-space:pre-line;">${esc(what.slice(0, 1200))}</p>`
          : '') +
        rows([
          ['Severity', severity],
          ['Where', inc.location ?? ''],
          ['When', ukDate(inc.reported_at || inc.created_at, true)],
          ['Injury', injury],
          ['Hospital visit', inc.hospital_visit ? 'Yes' : ''],
          ['RIDDOR', inc.riddor_reportable ? 'Marked as reportable' : ''],
        ]),
    }),
    ctaLabel: 'Open the report',
    ctaHref: `${APP_URL}/employer?section=incidents&incident=${encodeURIComponent(inc.id)}`,
    entityId: inc.id,
  };
}

async function buildInvoicePaid(
  admin: Admin,
  employerId: string,
  source: string,
  id: string
): Promise<Built | null> {
  // deno-lint-ignore no-explicit-any
  let row: any = null;
  if (source === 'invoices') {
    const { data } = await admin
      .from('invoices')
      .select('id, user_id, invoice_number, client_data, total, total_paid, paid_at, payment_method')
      .eq('id', id)
      .maybeSingle();
    if (data) row = { ...data, paidAt: data.paid_at, method: data.payment_method };
  } else {
    const { data } = await admin
      .from('quotes')
      .select('id, user_id, invoice_number, quote_number, client_data, total, total_paid, invoice_paid_at, invoice_payment_method')
      .eq('id', id)
      .maybeSingle();
    if (data) row = { ...data, paidAt: data.invoice_paid_at, method: data.invoice_payment_method };
  }
  if (!row) return null;

  // The invoice must belong to this firm: the owner, or one of its managers.
  if (row.user_id !== employerId) {
    const { data: mgr } = await admin
      .from('employer_admins')
      .select('id')
      .eq('employer_id', employerId)
      .eq('user_id', row.user_id)
      .eq('status', 'active')
      .maybeSingle();
    if (!mgr) return null;
  }

  const client =
    row.client_data?.name || row.client_data?.full_name || row.client_data?.client_name || 'Your client';
  const number = row.invoice_number || row.quote_number || '';
  const amount = gbp(row.total_paid ?? row.total);
  const method =
    row.method === 'card' ? 'Card' : row.method ? String(row.method).replace(/_/g, ' ') : '';

  return {
    subject: `${client} paid${number ? ` ${number}` : ''}${amount ? ` · ${amount}` : ''}`,
    preheader: `${amount || 'Payment'} received${row.paidAt ? ` on ${ukDate(row.paidAt)}` : ''}.`,
    hero: renderHero({
      label: 'Paid',
      value: esc(amount || '—'),
      sub: esc([number, client].filter(Boolean).join(' · ')),
    }),
    body: `${esc(client)} has paid${number ? ` invoice <strong style="color:#0f172a;">${esc(number)}</strong>` : ' an invoice'}.`,
    card: renderCard({
      label: 'Payment',
      body: rows([
        ['Paid on', ukDate(row.paidAt, true)],
        ['Method', method],
      ]),
    }),
    ctaLabel: 'View the invoice',
    ctaHref: `${APP_URL}/electrician/invoices/${encodeURIComponent(row.id)}`,
    entityId: row.id,
  };
}

interface SummaryPayload {
  timesheets?: number;
  timesheets_oldest?: string | null;
  leave?: number;
  expenses?: number;
  expiring?: Array<{ label: string; name: string; due: string; route: string }>;
}

function buildDailySummary(p: SummaryPayload, ref: string): Built | null {
  const ts = Number(p.timesheets) || 0;
  const leave = Number(p.leave) || 0;
  const expenses = Number(p.expenses) || 0;
  const expiring = Array.isArray(p.expiring) ? p.expiring : [];
  if (ts + leave + expenses === 0 && expiring.length === 0) return null;

  const waiting: string[] = [];
  if (ts) waiting.push(plural(ts, 'timesheet'));
  if (leave) waiting.push(plural(leave, 'leave request'));
  if (expenses) waiting.push(plural(expenses, 'expense claim'));

  const today = new Date();
  const subject = waiting.length
    ? `${waiting.join(', ')} waiting for approval`
    : `${plural(expiring.length, 'renewal')} coming up`;

  const approvals = waiting.length
    ? `<p style="margin:0 0 6px;font-size:15px;color:#0f172a;font-weight:600;">Waiting for you</p>` +
      [
        ts
          ? `<p style="margin:0 0 6px;font-size:14px;color:#334155;line-height:1.5;"><a href="${APP_URL}/employer?section=timesheets&amp;tab=pending" style="color:#0f172a;">${plural(ts, 'timesheet')}</a>${
              p.timesheets_oldest ? `, oldest from ${esc(ukDate(p.timesheets_oldest))}` : ''
            }</p>`
          : '',
        leave
          ? `<p style="margin:0 0 6px;font-size:14px;color:#334155;line-height:1.5;"><a href="${APP_URL}/employer?section=timesheets&amp;tab=leave" style="color:#0f172a;">${plural(leave, 'leave request')}</a></p>`
          : '',
        expenses
          ? `<p style="margin:0 0 6px;font-size:14px;color:#334155;line-height:1.5;"><a href="${APP_URL}/employer?section=expenses" style="color:#0f172a;">${plural(expenses, 'expense claim')}</a></p>`
          : '',
      ].join('')
    : '';

  const now = new Date(today.toISOString().slice(0, 10));
  const renewals = expiring.length
    ? `<p style="margin:${waiting.length ? '18px' : '0'} 0 6px;font-size:15px;color:#0f172a;font-weight:600;">Renewals in the next 30 days</p>` +
      expiring
        .map((i) => {
          const due = new Date(i.due);
          const overdue = due < now;
          return `<p style="margin:0 0 6px;font-size:14px;color:#334155;line-height:1.5;"><a href="${APP_URL}${esc(i.route)}" style="color:#0f172a;">${esc(i.label)}: ${esc(i.name)}</a>, ${overdue ? '<strong style="color:#b91c1c;">overdue</strong> since' : 'due'} ${esc(ukDate(i.due))}</p>`;
        })
        .join('')
    : '';

  return {
    subject,
    preheader: [waiting.join(', '), expiring.length ? plural(expiring.length, 'renewal') + ' due' : '']
      .filter(Boolean)
      .join(' · '),
    body: `Here is what needs the office today, ${esc(
      today.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/London' })
    )}.`,
    card: renderCard({ body: approvals + renewals }),
    ctaLabel: 'Open the Employer Hub',
    ctaHref: `${APP_URL}/employer`,
    entityId: ref,
  };
}

Deno.serve(
  withSentry('employer-office-alert', async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const bearer = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '');
    if (!serviceKey || bearer !== serviceKey) return json({ error: 'forbidden' }, 403);

    let body: { employer_id?: string; kind?: string; ref?: string; payload?: Record<string, unknown> };
    try {
      body = await req.json();
    } catch {
      return json({ error: 'invalid json' }, 400);
    }
    const employerId = body.employer_id;
    const kind = body.kind;
    const payload = body.payload ?? {};
    if (!employerId || !kind) return json({ error: 'employer_id and kind required' }, 400);

    const admin = createClient(Deno.env.get('SUPABASE_URL') ?? '', serviceKey);

    const { data: profile } = await admin
      .from('company_profiles')
      .select(
        'notification_email, company_name, logo_url, primary_color, company_email, company_phone, company_website, company_address, vat_number, company_registration'
      )
      .eq('user_id', employerId)
      .maybeSingle();
    const to = (profile?.notification_email as string | undefined)?.trim() ?? '';
    if (!to || !isSendableEmail(to)) return json({ skipped: 'no notification email' });

    let built: Built | null = null;
    if (kind === 'incident') {
      built = await buildIncident(admin, employerId, String(payload.incident_id ?? body.ref ?? ''));
    } else if (kind === 'invoice_paid') {
      built = await buildInvoicePaid(admin, employerId, String(payload.source ?? 'quotes'), String(payload.id ?? ''));
    } else if (kind === 'daily_summary') {
      built = buildDailySummary(payload as SummaryPayload, String(body.ref ?? ''));
    } else {
      return json({ error: `unknown kind ${kind}` }, 400);
    }
    if (!built) return json({ skipped: 'nothing to send' });

    const company = teamCompany(profile, 'Your firm');
    const html = renderEmailShell({
      subject: built.subject,
      preheader: built.preheader,
      company,
      greeting: 'Hello,',
      body: built.body,
      hero: built.hero,
      cta: renderButton({
        label: built.ctaLabel,
        href: built.ctaHref,
        background: company.primaryColor || '#0f172a',
        microcopy: 'Opens Elec-Mate › Employer Hub',
      }),
      card: built.card,
      signoff: `<tr><td style="padding:0 36px 32px;"><p style="margin:0;font-size:12.5px;color:#64748b;line-height:1.6;">Sent to ${esc(
        to
      )} because it is the notification email in your Employer Hub settings. Change or clear it there to stop these emails.</p></td></tr>`,
    });

    // From Elec-Mate's DMARC-aligned noreply. No Reply-To: an alert to the
    // firm's own office has nobody to reply to.
    const sender = clientFacingSender({ companyName: 'Elec-Mate' });
    const { error } = await sendEmail({
      from: sender.from,
      to: [to],
      subject: built.subject,
      html,
      text: htmlToPlainText(html),
      tags: ['office-alert', kind],
      log: { template: `office_alert_${kind}`, entityId: built.entityId, userId: employerId },
    });
    if (error) {
      console.error('[employer-office-alert] send failed', kind, error.message);
      return json({ error: error.message }, 502);
    }
    return json({ sent: true, kind });
  })
);
