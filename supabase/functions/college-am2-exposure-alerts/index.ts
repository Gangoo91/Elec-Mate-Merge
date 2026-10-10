/**
 * college-am2-exposure-alerts — ELE-2049, weekly (pg_cron, Monday morning).
 *
 *   POST { action: 'cron' }                         service role only
 *   POST { action: 'cron', as_of, learner, dry_run } testing: a date to run "as of",
 *                                                    one learner, and/or write nothing
 *
 * 1. am2_exposure_due_alerts() finds every learner on an AM2-family course
 *    with no safe isolation, inspection and testing or fault finding tagged
 *    on site for their college's N weeks (and no alert for it in the last N
 *    weeks). It records the alert and rings the learner's tutors' bell.
 * 2. This function emails the employer contact, with the employer's existing
 *    no-login link (/employer-view/:token, minted if they have none), and
 *    records the result on the alert. An employer who turned off the weekly
 *    email (weekly_digest_opt_out_at) is not emailed.
 *
 * The employer page itself does not show exposure yet; the email says what
 * is missing and the link opens their apprentices.
 */
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { sendEmail } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const APP = 'https://elec-mate.com';
const FROM = 'Elec-Mate for colleges <noreply@elec-mate.com>';

interface Due {
  alert_ids: string[] | null;
  learner_id: string;
  student_id: string;
  learner_name: string;
  college_name: string | null;
  weeks: number;
  areas: string[];
  labels: string;
  tutors_notified: number;
  employer: {
    id: string;
    company_name: string;
    contact_name: string | null;
    contact_email: string | null;
    opted_out: boolean;
  } | null;
}

const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const p = (text: string) =>
  `<p style="margin:0 0 12px;font-size:16px;line-height:1.6;color:#0f172a">${text}</p>`;

const AREA_HELP: Record<string, string> = {
  safe_isolation: 'safe isolation (proving dead and locking off before work)',
  inspection_testing:
    'inspection and testing (continuity, insulation resistance, polarity, loop impedance, RCDs)',
  fault_finding: 'fault finding (tracing a fault by testing)',
};

function emailHtml(d: Due, portal: string, includeLink: boolean) {
  const first = d.employer?.contact_name?.split(' ')[0];
  const items = d.areas
    .map((a) => `<li style="margin:0 0 6px">${esc(AREA_HELP[a] ?? a)}</li>`)
    .join('');
  const body =
    p(first ? `Hello ${esc(first)},` : 'Hello,') +
    p(
      `${esc(d.college_name ?? 'The college')} tracks how often ${esc(d.learner_name)} does the three things the AM2S tests hardest. In the last ${d.weeks} weeks nothing has been recorded for:`
    ) +
    `<ul style="margin:0 0 16px;padding-left:20px;font-size:16px;line-height:1.6;color:#0f172a">${items}</ul>` +
    p(
      `In NET's survey of candidates who failed the AM2 first time, fault finding and inspection and testing were the areas they felt least confident in, and a quarter had no regular inspection and testing on site. If you can, give ${esc(d.learner_name.split(' ')[0])} the chance to do this on a job in the next few weeks, with a supervisor.`
    ) +
    p(
      'If they have done it and not logged it, ask them to tag it in their site diary or evidence in Elec-Mate.'
    );
  const cta = includeLink
    ? `<p style="margin:28px 0 8px"><a href="${portal}" style="display:inline-block;background:#facc15;color:#000000;text-decoration:none;font-weight:600;font-size:16px;padding:14px 24px;border-radius:12px">Open your apprentices</a></p>`
    : '';
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>On-site practice</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden">
<tr><td style="height:4px;background:#facc15;font-size:0;line-height:0">&nbsp;</td></tr>
<tr><td style="padding:32px 32px 8px">
<h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#0f172a">${esc(d.learner_name)}: on-site practice for the AM2S</h1>
${body}${cta}
</td></tr>
<tr><td style="padding:16px 32px 32px;font-size:13px;line-height:1.6;color:#475569">Sent for ${esc(d.college_name ?? 'the college')} through Elec-Mate, at most once every ${d.weeks} weeks for each area. No account needed.${
    includeLink
      ? ` <a href="${portal}?digest=off" style="color:#475569">Stop these emails</a>.`
      : ''
  }</td></tr>
</table></td></tr></table></body></html>`;
}

/** A live portal link for the employer, minted if they have none (same rule as college-review-mail). */
// deno-lint-ignore no-explicit-any
async function portalToken(sb: any, employerId: string): Promise<string> {
  const { data } = await sb
    .from('college_employer_tokens')
    .select('token')
    .eq('employer_id', employerId)
    .is('revoked_at', null)
    .gt('expires_at', new Date(Date.now() + 14 * 86_400_000).toISOString())
    .order('expires_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (data) return (data as { token: string }).token;
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  const token = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  await sb.from('college_employer_tokens').insert({
    employer_id: employerId,
    token,
    purpose: 'employer_view',
    expires_at: new Date(Date.now() + 365 * 86_400_000).toISOString(),
  });
  return token;
}

function jwtRole(header: string): string | null {
  try {
    const part = header.replace(/^Bearer\s+/i, '').split('.')[1];
    const payload = JSON.parse(atob(part.replace(/-/g, '+').replace(/_/g, '/')));
    return typeof payload.role === 'string' ? payload.role : null;
  } catch {
    return null;
  }
}

function json(b: unknown, status = 200) {
  return new Response(JSON.stringify(b), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const url = Deno.env.get('SUPABASE_URL')!;
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const auth = req.headers.get('Authorization') ?? '';
    if (auth !== `Bearer ${service}` && jwtRole(auth) !== 'service_role') {
      return json({ error: 'not authorised' }, 401);
    }
    const body = (await req.json().catch(() => ({}))) as {
      action?: string;
      as_of?: string;
      learner?: string;
      dry_run?: boolean;
    };
    if (body.action !== 'cron') return json({ error: 'Unknown request.' }, 400);

    const sb = createClient(url, service, { auth: { persistSession: false } });
    const { data, error } = await sb.rpc('am2_exposure_due_alerts', {
      p_as_of: body.as_of ?? null,
      p_learner: body.learner ?? null,
      p_dry_run: !!body.dry_run,
    });
    if (error) throw error;
    const due = (data ?? []) as Due[];

    let emailed = 0;
    const previews: Array<{ learner: string; to: string | null; html: string }> = [];
    for (const d of due) {
      const e = d.employer;
      if (!e?.contact_email || e.opted_out) continue;
      if (body.dry_run) {
        previews.push({
          learner: d.learner_name,
          to: e.contact_email,
          html: emailHtml(d, `${APP}/employer-view/TOKEN`, true),
        });
        continue;
      }
      const token = await portalToken(sb, e.id);
      const portal = `${APP}/employer-view/${token}`;
      const res = await sendEmail({
        from: FROM,
        to: e.contact_email,
        subject: `${d.learner_name}: no ${d.labels} on site in ${d.weeks} weeks`,
        html: emailHtml(d, portal, true),
        tags: ['college_am2_exposure_alert'],
        log: { template: 'college_am2_exposure_alert', entityId: d.student_id },
      });
      const ids = d.alert_ids ?? [];
      if (ids.length) {
        await sb.rpc('am2_exposure_mark_emailed', {
          p_ids: ids,
          p_error: res.error
            ? String((res.error as { message?: string }).message ?? res.error)
            : null,
        });
      }
      if (!res.error) emailed += 1;
    }

    return json({
      success: true,
      learners: due.length,
      tutors_notified: due.reduce((n, d) => n + (d.tutors_notified ?? 0), 0),
      employers_emailed: emailed,
      ...(body.dry_run ? { due, previews } : {}),
    });
  } catch (err) {
    await captureException(err, { functionName: 'college-am2-exposure-alerts' });
    return json({ error: (err as Error).message }, 500);
  }
});
