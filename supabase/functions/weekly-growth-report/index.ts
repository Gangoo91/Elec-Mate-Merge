// weekly-growth-report — Monday email to Andrew: leads, sign-ups, the lead
// follow-up and revenue, this week against last.
//
// All the numbers come from `weekly_growth_report()` (SQL, counts only); this
// function only renders and sends. Page-level lead data starts 30 Sep 2026,
// when captured_leads.page_url began being recorded.
//
// Cron: Mondays 07:15 UTC (after ai-visibility-digest at 07:00).
// Preview without sending: POST { "dry_run": true } → the HTML.

import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { Resend } from '../_shared/mailer.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { captureException } from '../_shared/sentry.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const TO = 'founder@elec-mate.com';
const FROM = 'Elec-Mate reports <no-reply@elec-mate.com>';

interface Report {
  period: { start: string; end: string };
  leads: {
    this_week: number;
    last_week: number;
    new_people: number;
    with_page: number;
    by_source: { source: string; this_week: number; last_week: number }[];
    top_pages: { page: string; leads: number }[];
  };
  signups: { this_week: number; last_week: number; from_leads: number };
  followup: {
    sent_this_week: number;
    sent_total: number;
    failed_total: number;
    signed_up: number;
    trial_or_paying: number;
    paying: number;
  };
  revenue: {
    mrr_now: number | null;
    mrr_week_ago: number | null;
    paying_now: number | null;
    paying_week_ago: number | null;
    churned_this_week: number;
  };
}

const SOURCE_NAMES: Record<string, string> = {
  mock_exam_result: 'Mock exam results',
  lead_magnet_cheatsheet: 'BS 7671 cheatsheet',
  lead_magnet_symbols_chart: 'Symbols chart',
  lead_magnet_zs_ze_reference: 'Zs / Ze tables PDF',
  lead_magnet_plug_in_solar: 'Plug-in solar guide',
  calculator_result: 'Calculator "email me"',
  exit_intent: 'Exit pop-up',
  landing_form: 'Landing page form',
  footer: 'Footer form',
};

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const gbp = (n: number | null) =>
  n == null ? '—' : `£${n.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`;

/** "+12" / "−3" / "no change", for this week against last. */
function delta(now: number | null, before: number | null, money = false): string {
  if (now == null || before == null) return '';
  const d = now - before;
  if (Math.round(d) === 0) return 'no change';
  const abs = money ? gbp(Math.abs(d)) : Math.abs(Math.round(d)).toLocaleString('en-GB');
  return `${d > 0 ? '+' : '−'}${abs} on last week`;
}

const dateLabel = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

const P = 'margin:0 0 6px;';
const H = 'margin:28px 0 10px;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#6b7280;';
const TD = 'padding:7px 0;border-bottom:1px solid #eef0f3;';

function row(label: string, value: string, note = ''): string {
  return `<tr><td style="${TD}">${label}</td><td style="${TD}text-align:right;font-weight:700;">${value}</td><td style="${TD}text-align:right;color:#6b7280;font-size:13px;padding-left:12px;white-space:nowrap;">${note}</td></tr>`;
}

function render(r: Report): { subject: string; html: string } {
  const f = r.followup;
  const rev = r.revenue;
  const period = `${dateLabel(r.period.start)} – ${dateLabel(r.period.end)}`;

  const sources = r.leads.by_source
    .map((s) =>
      row(
        esc(SOURCE_NAMES[s.source] ?? s.source),
        String(s.this_week),
        delta(s.this_week, s.last_week)
      )
    )
    .join('');

  const pages = r.leads.top_pages.length
    ? r.leads.top_pages.map((p) => row(esc(p.page), String(p.leads))).join('')
    : '';
  const pagesNote =
    r.leads.with_page < r.leads.this_week
      ? `<p style="${P}color:#6b7280;font-size:13px;">Page tracking started 30 Sep, so ${r.leads.with_page} of this week's ${r.leads.this_week} leads have a page. From next week it covers every lead.</p>`
      : '';

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f6f8;">
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#111827;max-width:600px;margin:0 auto;padding:24px 16px;">
<div style="background:#ffffff;border-radius:12px;padding:24px 20px;">
<p style="margin:0 0 2px;font-size:13px;color:#6b7280;">Weekly leads &amp; sign-ups · ${period}</p>
<p style="margin:0 0 4px;font-size:26px;font-weight:800;">${gbp(rev.mrr_now)} MRR</p>
<p style="${P}color:#374151;">${delta(rev.mrr_now, rev.mrr_week_ago, true)} · ${rev.paying_now ?? '—'} paying (${delta(rev.paying_now, rev.paying_week_ago)}) · ${rev.churned_this_week} cancelled</p>

<p style="${H}">Leads</p>
<table style="width:100%;border-collapse:collapse;">
${row('Leads captured', String(r.leads.this_week), delta(r.leads.this_week, r.leads.last_week))}
${row('New people', String(r.leads.new_people))}
</table>

<p style="${H}">Where leads came from</p>
<table style="width:100%;border-collapse:collapse;">${sources || row('No leads this week', '0')}</table>

<p style="${H}">Top pages for leads</p>
${pages ? `<table style="width:100%;border-collapse:collapse;">${pages}</table>` : ''}
${pagesNote}

<p style="${H}">Sign-ups</p>
<table style="width:100%;border-collapse:collapse;">
${row('New accounts', String(r.signups.this_week), delta(r.signups.this_week, r.signups.last_week))}
${row('…who were a lead first', String(r.signups.from_leads))}
</table>

<p style="${H}">Your follow-up email</p>
<table style="width:100%;border-collapse:collapse;">
${row('Sent this week', String(f.sent_this_week))}
${row('Sent in total', String(f.sent_total), f.failed_total ? `${f.failed_total} failed` : '')}
${row('Signed up after it', String(f.signed_up))}
${row('On a trial or paying', String(f.trial_or_paying))}
${row('Paying', String(f.paying))}
</table>
<p style="${P}margin-top:10px;color:#6b7280;font-size:13px;">Trials take 7 days to turn into paid, so the paying line lags the others by about a week.</p>
</div>
</div>
</body></html>`;

  const subject = `Weekly: ${gbp(rev.mrr_now)} MRR, ${r.leads.this_week} leads, ${r.signups.this_week} sign-ups`;
  return { subject, html };
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  // Cron / service calls only — the anon key is a valid JWT at the gateway.
  if (req.headers.get('Authorization') !== `Bearer ${SERVICE_KEY}`) {
    return json({ error: 'unauthorised' }, 401);
  }

  try {
    const body = await req.json().catch(() => ({}));
    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
    const { data, error } = await supabase.rpc('weekly_growth_report');
    if (error) throw error;

    const { subject, html } = render(data as Report);
    if (body?.dry_run === true) {
      return new Response(html, { headers: { ...corsHeaders, 'Content-Type': 'text/html' } });
    }

    const { error: sendErr } = await new Resend().emails.send({
      from: FROM,
      to: TO,
      subject,
      html,
      tags: ['weekly-growth-report'],
    });
    if (sendErr) throw new Error(sendErr.message);
    return json({ sent: true, subject });
  } catch (e) {
    captureException(e, { functionName: 'weekly-growth-report' });
    return json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});
