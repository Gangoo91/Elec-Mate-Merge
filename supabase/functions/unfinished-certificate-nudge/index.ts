// unfinished-certificate-nudge — tell a paying customer about the certificate
// they started and never finished, and ask what stopped them.
//
// Why (retention analysis, 23 Sep 2026). Electricians who carded 180–45 days
// ago, banded by certificates created in their first 30 days:
//
//     0 certs   357 people   17% still paying
//     1 cert     59 people   22%
//     2–4        41 people   34%
//     5+         15 people   73%
//
// A 4.3× spread — a stronger predictor than the three-active-days-in-seven
// metric the Retention page leads on (22% vs 50%). And of 310 electricians
// who carded in the last 90 days, only 80 ever started a certificate at all;
// of the ones they started, 141 were abandoned against 90 finished.
//
// So the highest-value message we own is not a discount. It is: "your EICR at
// 14 Elm Road is half done, here it is, and if something stopped you tell me
// what." It names a real job, it is useful rather than promotional, and it
// pushes the exact behaviour that predicts renewal.
//
// Voice follows dormant-nudge and the ask-why email: plain text from Andrew,
// no buttons, no template, asking for a reply. Those get roughly three times
// the engagement of the designed template, and the 23 Sep ask-why send opened
// at 47% with 11 replies against a sales letter's zero.
//
// Cohort: public.get_unfinished_certificate_users() — paying (not trialing,
// the trial sequence already writes to them daily), subscription still live,
// at least one report in auto-draft / in-progress / draft, that certificate
// untouched for p_min_idle_days, not nudged inside the cooldown, not in
// email_suppressions.
//
// Safety: a POST with no body (or without `send: true`) is a DRY RUN that
// returns the cohort and a sample — nothing is sent. `{ test: true, email }`
// sends one preview to that address using sample data. `{ send: true, limit }`
// sends for real, most-recently-touched first, capped by `limit` (default 40).
// Each send is recorded in trial_emails_sent (email_type 'unfinished_cert').
//
// Before sending, each row's certificate is re-read: if it was finished or
// deleted between the cohort query and the send, that person is skipped. A
// message about a certificate someone completed an hour ago is worse than no
// message at all.
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend, htmlToPlainText } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const EMAIL_TYPE = 'unfinished_cert';
const FROM = 'Andrew at Elec-Mate <founder@elec-mate.com>';
const MOBILE = '07507 241303';
const ORIGIN = 'https://www.elec-mate.com';
const DEFAULT_LIMIT = 40;

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Where a saved certificate opens. Ported verbatim from
 * src/utils/certificate-href.ts, which carries the note that it was checked
 * against the live router. Two conventions and one trap:
 *
 *   1. eicr / eic / minor-works are SECTIONS of the Inspection & Testing page,
 *      reached by query param — they have no route of their own.
 *   2. Every specialist type is a real path route, `<type>/:id`.
 *   3. Both key on the `report_id` STRING, never the `reports.id` uuid.
 *      `reportCloud.getReportDataWithId` filters `.eq('report_id', …)`, so the
 *      uuid loads nothing and the editor opens a blank certificate — which
 *      from an email would look like we had deleted their work.
 *
 * If these two files ever drift, the link in this email breaks silently.
 */
const SECTION_ROUTED = new Set(['eicr', 'eic', 'minor-works']);
const PATH_ROUTED = new Set([
  'bess',
  'board-schedule',
  'completion-notice',
  'danger-notice',
  'disconnection',
  'emergency-lighting',
  'ev-charging',
  'fire-alarm',
  'fire-alarm-commissioning',
  'fire-alarm-design',
  'fire-alarm-inspection',
  'fire-alarm-log-books',
  'fire-alarm-modification',
  'g98-commissioning',
  'g99-commissioning',
  'heat-pump',
  'isolation-certificate',
  'lightning-protection',
  'limitation-notice',
  'non-compliance-notice',
  'pat-testing',
  'permit-to-work',
  'plug-in-solar',
  'pre-purchase-survey',
  'routine-inspection',
  'safe-isolation',
  'smoke-co-alarm',
  'solar-pv',
  'testing-only',
  'visual-condition',
]);
const BASE = '/electrician/inspection-testing';

function certificateHref(reportType: string, reportId: string): string {
  const type = (reportType || '').toLowerCase();
  if (SECTION_ROUTED.has(type)) {
    return `${BASE}?section=${type}&reportId=${encodeURIComponent(reportId)}`;
  }
  if (PATH_ROUTED.has(type)) {
    return `${BASE}/${type}/${encodeURIComponent(reportId)}`;
  }
  return `${BASE}?section=my-reports`;
}

function certificateTypeLabel(reportType: string): string {
  const type = (reportType || '').toLowerCase();
  if (type === 'eicr') return 'EICR';
  if (type === 'eic') return 'EIC';
  if (type === 'pat-testing') return 'PAT testing certificate';
  return type
    .split('-')
    .map((w, i) => (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(' ');
}

/** "21 September" — no year, because every one of these is recent enough. */
function niceDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${d.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' })}`;
}

/**
 * Names the job the way the customer would: client, or address, or both.
 * Fewer than half the rows have either, so the no-name branch has to read as
 * naturally as the named one rather than as a template with a hole in it.
 */
function describeJob(clientName: string | null, address: string | null): string {
  const client = (clientName ?? '').trim();
  // Addresses are typed on a phone and often carry newlines; flatten them.
  const addr = (address ?? '').trim().replace(/\s*\n+\s*/g, ', ');
  // Long addresses read badly mid-sentence — first two parts is enough to
  // recognise the job without quoting the whole postcode line back at them.
  const shortAddr = addr.split(',').slice(0, 2).join(',').trim();
  if (client && shortAddr) return ` for ${client} at ${shortAddr}`;
  if (client) return ` for ${client}`;
  if (shortAddr) return ` at ${shortAddr}`;
  return '';
}

interface Row {
  user_id: string;
  full_name: string | null;
  role: string;
  email: string;
  report_type: string;
  report_id: string;
  client_name: string | null;
  installation_address: string | null;
  last_touched: string;
  unfinished_count: number;
  subscription_source: string | null;
}

function buildEmail(r: {
  full_name: string | null;
  role: string;
  report_type: string;
  report_id: string;
  client_name: string | null;
  installation_address: string | null;
  last_touched: string;
  unfinished_count: number;
}): { subject: string; html: string } {
  const firstName = (r.full_name ?? '').trim().split(/\s+/)[0] ?? '';
  const name = firstName || 'mate';
  const label = certificateTypeLabel(r.report_type);
  const job = describeJob(r.client_name, r.installation_address);
  const link = `${ORIGIN}${certificateHref(r.report_type, r.report_id)}`;
  const others = Number(r.unfinished_count) - 1;

  // An apprentice's half-finished EICR is almost always practice or college
  // evidence, not a job with a customer waiting. Telling them "your customer
  // is waiting" would be plainly wrong, so the reason to finish differs.
  const isApprentice = r.role === 'apprentice';

  const openLine = job
    ? `You've got an ${label}${job} sitting half finished. It's been there since ${niceDate(r.last_touched)}.`
    : `You've got an ${label} sitting half finished since ${niceDate(r.last_touched)}.`;

  const othersLine =
    others > 0
      ? `<p style="margin:0 0 14px;">There ${others === 1 ? 'is one other' : `are ${others} others`} part done too, all still there.</p>`
      : '';

  const why = isApprentice
    ? `Worth finishing — a completed one is evidence you can put in your portfolio, and it only takes a few minutes once you're back in it.`
    : `Worth finishing — it's a few minutes from a branded PDF you can send the customer.`;

  const html = `
    <div style="font-family: -apple-system, 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 8px 4px; color:#1a1a1a; font-size:15px; line-height:1.65;">
      <p style="margin:0 0 14px;">Hi ${esc(name)},</p>
      <p style="margin:0 0 14px;">It's Andrew, the electrician who built Elec-Mate.</p>
      <p style="margin:0 0 14px;">${esc(openLine)}</p>
      ${othersLine}
      <p style="margin:0 0 14px;">Here it is if you want to pick it up: <a href="${esc(link)}" style="color:#1a1a1a;">open the ${esc(label)}</a>. ${esc(why)}</p>
      <p style="margin:0 0 14px;">And if something in it stopped you — a section that didn't make sense, a field that wouldn't take what you needed — tell me what it was. That's more use to me than you finishing it quietly. One line back is plenty.</p>
      <p style="margin:0 0 14px;">My mobile is ${MOBILE} if that's easier.</p>
      <p style="margin:0;">Cheers,<br/>Andrew<br/><span style="color:#555555; font-size:13px;">Founder, Elec-Mate</span></p>
    </div>`;

  const subject = firstName
    ? `${firstName} — your ${label} is half done`
    : `Your ${label} is half done`;
  return { subject, html };
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const authHeader = req.headers.get('Authorization') ?? '';
    if (!serviceKey || authHeader !== `Bearer ${serviceKey}`) {
      return new Response(JSON.stringify({ error: 'Not authorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let body: {
      test?: boolean;
      email?: string;
      send?: boolean;
      limit?: number;
      idle_days?: number;
      cooldown_days?: number;
    } = {};
    try {
      body = await req.json();
    } catch {
      // no body → dry run
    }

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

    // ── Preview to one address, using representative sample data ──────────
    if (body.test && body.email) {
      const { subject, html } = buildEmail({
        full_name: 'Andrew Moore',
        role: 'electrician',
        report_type: 'eicr',
        report_id: 'EICR-1784768601642-eah29i',
        client_name: 'SE Properties',
        installation_address: '1 Harrow Cl, Longford, Coventry CV6 6PU, UK',
        last_touched: new Date(Date.now() - 6 * 86_400_000).toISOString(),
        unfinished_count: 3,
      });
      const { error } = await resend.emails.send({
        from: FROM,
        to: body.email,
        subject: `[TEST] ${subject}`,
        html,
        text: htmlToPlainText(html),
      });
      if (error) throw new Error(error.message);
      return new Response(JSON.stringify({ success: true, test: true, to: body.email }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const db = createClient(Deno.env.get('SUPABASE_URL') ?? '', serviceKey, {
      auth: { persistSession: false },
    });

    const limit = Math.min(Math.max(Number(body.limit) || DEFAULT_LIMIT, 1), 200);
    const idleDays = Math.min(Math.max(Number(body.idle_days) || 3, 1), 90);
    const cooldownDays = Math.min(Math.max(Number(body.cooldown_days) || 45, 7), 365);

    const { data: cohort, error: qErr } = await db.rpc('get_unfinished_certificate_users', {
      p_min_idle_days: idleDays,
      p_cooldown_days: cooldownDays,
      p_limit: body.send ? limit : 500,
    });
    if (qErr) throw qErr;
    const rows = (cohort ?? []) as Row[];

    if (!body.send) {
      return new Response(
        JSON.stringify({
          success: true,
          dry_run: true,
          eligible: rows.length,
          by_role: rows.reduce<Record<string, number>>((acc, r) => {
            acc[r.role] = (acc[r.role] ?? 0) + 1;
            return acc;
          }, {}),
          named_job: rows.filter((r) => describeJob(r.client_name, r.installation_address)).length,
          sample: rows.slice(0, 5).map((r) => {
            const { subject } = buildEmail(r);
            return {
              role: r.role,
              subject,
              job: describeJob(r.client_name, r.installation_address).trim() || '(unnamed)',
              unfinished: Number(r.unfinished_count),
              last_touched: r.last_touched,
              link: `${ORIGIN}${certificateHref(r.report_type, r.report_id)}`,
            };
          }),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let sent = 0;
    let failed = 0;
    let skipped = 0;
    for (const r of rows) {
      // Re-read the certificate. The cohort query and the send are minutes
      // apart at best, and a message about a certificate they just finished
      // reads as though we have not looked.
      const { data: still } = await db
        .from('reports')
        .select('status, deleted_at')
        .eq('report_id', r.report_id)
        .maybeSingle();
      if (
        !still ||
        still.deleted_at ||
        !['auto-draft', 'in-progress', 'draft'].includes(still.status ?? '')
      ) {
        skipped++;
        continue;
      }

      const { subject, html } = buildEmail(r);

      // Record BEFORE sending: the unique (user_id, email_type) index is the
      // lock, so a retry or a second run the same day cannot double-send.
      // Upsert refreshes sent_at, which is what the cooldown reads.
      const { error: recErr } = await db
        .from('trial_emails_sent')
        .upsert(
          { user_id: r.user_id, email_type: EMAIL_TYPE, sent_at: new Date().toISOString() },
          { onConflict: 'user_id,email_type' }
        );
      if (recErr) {
        failed++;
        console.warn(`[unfinished-cert] record failed for ${r.user_id}: ${recErr.message}`);
        continue;
      }

      const { error } = await resend.emails.send({
        from: FROM,
        to: r.email,
        subject,
        html,
        text: htmlToPlainText(html),
      });
      if (error) {
        failed++;
        console.warn(`[unfinished-cert] send failed for ${r.user_id}: ${error.message}`);
        // Undo the record so the next run can try again.
        await db
          .from('trial_emails_sent')
          .delete()
          .eq('user_id', r.user_id)
          .eq('email_type', EMAIL_TYPE);
        continue;
      }
      sent++;
    }

    console.log(
      `[unfinished-cert] sent=${sent} failed=${failed} skipped=${skipped} of ${rows.length}`
    );
    return new Response(
      JSON.stringify({ success: true, sent, failed, skipped, eligible: rows.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    await captureException(error, {
      functionName: 'unfinished-certificate-nudge',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'unfinished-certificate-nudge failed',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
