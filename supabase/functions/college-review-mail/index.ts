/**
 * college-review-mail — the emails an employer gets about their apprentices
 * (ELE-1879 / ELE-1880). The employer never needs an account.
 *
 *   POST { action: 'invite' | 'reminder' | 'summary', review_id }
 *     Staff JWT. Emails the review's employer contact their /review/:token
 *     link, and records it on the review (employer_contact_log) as the
 *     evidence the funding rules ask for: the employer was given the chance
 *     to contribute (para 97.2.1) and the summary was shared (97.2.2).
 *
 *   POST { action: 'cron' }  (service role, from pg_cron)
 *     1. Reminders: reviews in the next 3 days where the employer was invited
 *        but has not added their view, at most one reminder each 3 days.
 *     2. Mondays: the weekly digest to every employer contact with an
 *        apprentice on programme — hours against the minimum, the next
 *        review and anything waiting for them, with their one link
 *        (/employer-view/:token). They can stop it from that page.
 *        ELE-2040: a line when an apprentice's behaviour sign-off is due
 *        before gateway (within 120 days, not signed), linking to the card.
 *
 *   POST { action: 'digest_preview', employer_id }  (service role)
 *     The digest that employer would get, as HTML. Sends nothing, writes nothing.
 *
 * Staff permission is checked by calling get_tripartite_employer_link with the
 * caller's own JWT: it refuses anyone who is not staff at that college.
 */
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { sendEmail } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const APP = 'https://elec-mate.com';
const FROM = 'Elec-Mate for colleges <noreply@elec-mate.com>';

type Kind = 'invite' | 'reminder' | 'summary';

interface ReviewRow {
  id: string;
  college_id: string;
  student_id: string;
  employer_id: string | null;
  employer_contact_name: string | null;
  employer_contact_email: string | null;
  employer_token: string;
  scheduled_at: string | null;
  mode: string | null;
  location: string | null;
  meeting_url: string | null;
  held_on: string | null;
  locked_at: string | null;
  tutor_staff_id: string | null;
  employer_input: unknown;
  employer_invited_at: string | null;
  employer_contact_log: Array<{ kind: string; at: string }>;
  signatures: Record<string, string>;
  snapshot: { employer_must_sign?: boolean } | null;
}

const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const fmtWhen = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/London',
      })
    : '';
const fmtDay = (iso: string | null) =>
  iso
    ? new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Europe/London',
      })
    : '';
const MODE: Record<string, string> = {
  in_person: 'in person',
  video: 'by video call',
  phone: 'by phone',
  email: 'by email',
};

/** One plain, light email: a heading, a few lines, one button. */
function shell(opts: {
  preheader: string;
  heading: string;
  body: string;
  cta: { label: string; href: string };
  footer: string;
}) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>${esc(opts.heading)}</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a">
<span style="display:none;max-height:0;overflow:hidden">${esc(opts.preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden">
<tr><td style="height:4px;background:#facc15;font-size:0;line-height:0">&nbsp;</td></tr>
<tr><td style="padding:32px 32px 8px">
<h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#0f172a">${esc(opts.heading)}</h1>
${opts.body}
<p style="margin:28px 0 8px"><a href="${opts.cta.href}" style="display:inline-block;background:#facc15;color:#000000;text-decoration:none;font-weight:600;font-size:16px;padding:14px 24px;border-radius:12px">${esc(opts.cta.label)}</a></p>
</td></tr>
<tr><td style="padding:16px 32px 32px;font-size:13px;line-height:1.6;color:#475569">${opts.footer}</td></tr>
</table></td></tr></table></body></html>`;
}

const p = (text: string) =>
  `<p style="margin:0 0 12px;font-size:16px;line-height:1.6;color:#0f172a">${text}</p>`;

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const url = Deno.env.get('SUPABASE_URL')!;
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const admin = createClient(url, service, { auth: { persistSession: false } });
    const body = (await req.json().catch(() => ({}))) as { action?: string; review_id?: string };
    const auth = req.headers.get('Authorization') ?? '';

    if (body.action === 'cron') {
      // verify_jwt is on, so the gateway has checked the signature; the cron
      // job sends the service-role key, whose role claim says so.
      if (auth !== `Bearer ${service}` && jwtRole(auth) !== 'service_role') {
        return json({ error: 'not authorised' }, 401);
      }
      const reminders = await sendDueReminders(admin);
      const digests = new Date().getUTCDay() === 1 ? await sendWeeklyDigests(admin) : 0;
      return json({ success: true, reminders, digests });
    }

    if (body.action === 'digest_preview') {
      if (auth !== `Bearer ${service}` && jwtRole(auth) !== 'service_role') {
        return json({ error: 'not authorised' }, 401);
      }
      const id = (body as { employer_id?: string }).employer_id ?? '';
      if (!/^[0-9a-f-]{36}$/i.test(id)) return json({ error: 'employer_id required' }, 400);
      return json(await previewDigest(admin as unknown as ReturnType<typeof createClient>, id));
    }

    const kind = body.action as Kind;
    if (!['invite', 'reminder', 'summary'].includes(kind) || !body.review_id) {
      return json({ error: 'Unknown request.' }, 400);
    }
    // The caller's own JWT: only staff at the review's college get the link.
    const asUser = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: auth } },
      auth: { persistSession: false },
    });
    const { error: permErr } = await asUser.rpc('get_tripartite_employer_link', {
      p_review: body.review_id,
    });
    if (permErr) return json({ error: 'You cannot send this review.' }, 403);

    const review = await loadReview(admin, body.review_id);
    if (!review) return json({ error: 'Review not found.' }, 404);
    if (!review.employer_contact_email)
      return json({ error: 'No email address for the employer. Add one, or copy the link.' });
    if (kind === 'summary' && !review.locked_at)
      return json({ error: 'Sign off the review first.' });

    const sent = await sendReviewEmail(admin, review, kind);
    if (!sent.ok) return json({ error: sent.error ?? 'Email not sent.' });
    // Recorded with the service role so the evidence is kept even if the
    // caller's session lapses between the send and the log.
    const { error: logErr } = await admin.rpc('log_tripartite_employer_contact', {
      p_review: review.id,
      p_kind: kind,
      p_to: review.employer_contact_email,
    });
    if (logErr) console.error('[college-review-mail] log failed', logErr.message);
    return json({ success: true });
  } catch (err) {
    await captureException(err, {
      functionName: 'college-review-mail',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: err instanceof Error ? err.message : 'Internal error' }, 500);
  }
});

async function loadReview(
  sb: ReturnType<typeof createClient>,
  id: string
): Promise<ReviewRow | null> {
  const { data } = await sb
    .from('college_tripartite_reviews')
    .select(
      'id, college_id, student_id, employer_id, employer_contact_name, employer_contact_email, employer_token, scheduled_at, mode, location, meeting_url, held_on, locked_at, tutor_staff_id, employer_input, employer_invited_at, employer_contact_log, signatures, snapshot'
    )
    .eq('id', id)
    .maybeSingle();
  return (data as ReviewRow | null) ?? null;
}

async function context(sb: ReturnType<typeof createClient>, r: ReviewRow) {
  const [{ data: s }, { data: c }, { data: t }] = await Promise.all([
    sb.from('college_students').select('name').eq('id', r.student_id).maybeSingle(),
    sb.from('colleges').select('name').eq('id', r.college_id).maybeSingle(),
    r.tutor_staff_id
      ? sb.from('college_staff').select('name, email').eq('id', r.tutor_staff_id).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);
  return {
    learner: (s as { name?: string } | null)?.name ?? 'your apprentice',
    college: (c as { name?: string } | null)?.name ?? 'The college',
    tutor: (t as { name?: string; email?: string } | null)?.name ?? null,
    tutorEmail: (t as { name?: string; email?: string } | null)?.email ?? null,
  };
}

async function sendReviewEmail(sb: ReturnType<typeof createClient>, r: ReviewRow, kind: Kind) {
  const ctx = await context(sb, r);
  const first = ctx.learner.split(' ')[0];
  const link = `${APP}/review/${r.employer_token}`;
  const hello = r.employer_contact_name
    ? `Hello ${esc(r.employer_contact_name.split(' ')[0])},`
    : 'Hello,';
  const when = r.scheduled_at
    ? `${fmtWhen(r.scheduled_at)}${r.mode ? `, ${MODE[r.mode] ?? ''}` : ''}${r.location ? ` at ${esc(r.location)}` : ''}`
    : '';

  let subject: string;
  let heading: string;
  let bodyHtml: string;
  let cta: { label: string; href: string };
  if (kind === 'summary') {
    const mustSign = !!r.snapshot?.employer_must_sign;
    subject = `${ctx.learner}'s progress review: please read and sign`;
    heading = `${ctx.learner}'s progress review`;
    bodyHtml =
      p(hello) +
      p(
        `${esc(ctx.college)} held ${esc(first)}'s apprenticeship progress review on ${fmtDay(r.held_on)}. The summary, and what everyone agreed to do before the next one, is ready for you to read.`
      ) +
      p(
        mustSign
          ? `The training plan changed at this review, so the funding rules need you to agree it. Signing takes a minute.`
          : `Please sign it to confirm it reflects the review. It takes a minute and needs no account.`
      );
    cta = { label: 'Read and sign', href: link };
  } else {
    const reminder = kind === 'reminder';
    subject = reminder
      ? `Reminder: ${ctx.learner}'s progress review${r.scheduled_at ? ` on ${fmtDay(r.scheduled_at)}` : ''}`
      : `${ctx.learner}'s apprenticeship progress review${r.scheduled_at ? `, ${fmtDay(r.scheduled_at)}` : ''}`;
    heading = reminder
      ? `Your view for ${ctx.learner}'s review`
      : `${ctx.learner}'s progress review`;
    bodyHtml =
      p(hello) +
      p(
        `Every three months ${esc(ctx.college)}, ${esc(first)} and you review how the apprenticeship is going.${when ? ` The next one is ${when}.` : ''}`
      ) +
      p(
        `Whether or not you can be there, please answer three short questions about how ${esc(first)} is doing at work. It takes two minutes and needs no account. The college reads your answers before the review.`
      ) +
      (r.meeting_url && /^https:\/\//i.test(r.meeting_url)
        ? p(
            `Video call link: <a href="${esc(r.meeting_url)}" style="color:#0f172a">${esc(r.meeting_url)}</a>`
          )
        : '');
    cta = { label: 'Add your view', href: link };
  }

  const res = await sendEmail({
    from: FROM,
    to: r.employer_contact_email as string,
    replyTo: ctx.tutorEmail ?? undefined,
    subject,
    html: shell({
      preheader:
        kind === 'summary'
          ? `Read what was agreed at ${first}'s review and sign it.`
          : `Two minutes, no account: how is ${first} doing at work?`,
      heading,
      body: bodyHtml,
      cta,
      footer: `Sent for ${esc(ctx.college)}${ctx.tutor ? ` by ${esc(ctx.tutor)}` : ''} through Elec-Mate. ${
        ctx.tutorEmail ? 'Reply to this email to reach the tutor. ' : ''
      }This link is only for you; please do not forward it.`,
    }),
    tags: [`review_${kind}`],
    log: { template: `college_review_${kind}`, entityId: r.id },
  });
  return res.error ? { ok: false, error: res.error.message } : { ok: true };
}

async function sendDueReminders(sb: ReturnType<typeof createClient>): Promise<number> {
  const now = Date.now();
  const { data } = await sb
    .from('college_tripartite_reviews')
    .select('id')
    .is('locked_at', null)
    .neq('status', 'cancelled')
    .is('employer_input', null)
    .not('employer_invited_at', 'is', null)
    .not('employer_contact_email', 'is', null)
    .gte('scheduled_at', new Date(now).toISOString())
    .lte('scheduled_at', new Date(now + 3 * 86_400_000).toISOString());
  let n = 0;
  for (const { id } of (data ?? []) as Array<{ id: string }>) {
    const r = await loadReview(sb, id);
    if (!r) continue;
    const last = (r.employer_contact_log ?? [])
      .filter((c) => c.kind === 'invite' || c.kind === 'reminder' || c.kind === 'shared_link')
      .map((c) => Date.parse(c.at))
      .sort((a, b) => b - a)[0];
    if (last && now - last < 3 * 86_400_000) continue;
    const sent = await sendReviewEmail(sb, r, 'reminder');
    if (!sent.ok) continue;
    await sb.rpc('log_tripartite_employer_contact', {
      p_review: r.id,
      p_kind: 'reminder',
      p_to: r.employer_contact_email,
    });
    n += 1;
  }
  return n;
}

interface DigestEmployer {
  id: string;
  college_id: string;
  company_name: string;
  contact_name: string | null;
  contact_email: string;
  last_digest_at: string | null;
}

const BEHAVIOUR_PROMPT_DAYS = 120;

/**
 * ELE-2040: the behaviour sign-off the employer owes before gateway. A line
 * when gateway is within 120 days (or passed) and the checklist for the
 * learner's standard version is not signed, or was signed against behaviours
 * that have since changed. Same rule as the portal card (BehaviourVerification).
 * Nothing when the catalogue has no behaviours for the learner's version.
 */
async function behaviourDue(
  sb: ReturnType<typeof createClient>,
  studentId: string
): Promise<{ gateway: string; past: boolean } | null> {
  const { data: epa } = await sb
    .from('college_epa')
    .select('gateway_date')
    .eq('student_id', studentId)
    .order('updated_at', { ascending: false, nullsFirst: false })
    .limit(1)
    .maybeSingle();
  const gateway = (epa as { gateway_date?: string | null } | null)?.gateway_date ?? null;
  if (!gateway) return null;
  const days = Math.round((Date.parse(`${gateway}T12:00:00Z`) - Date.now()) / 86_400_000);
  if (days > BEHAVIOUR_PROMPT_DAYS) return null;
  const { data: cat } = await sb.rpc('_behaviour_catalogue', { p_student: studentId });
  const c = cat as {
    behaviours?: unknown[] | null;
    behaviours_hash?: string | null;
    standard?: { code?: string; version?: string } | null;
  } | null;
  if (!c?.behaviours || c.behaviours.length === 0 || !c.standard?.code || !c.standard?.version)
    return null;
  const { data: cur } = await sb.rpc('_behaviour_current', {
    p_student: studentId,
    p_code: c.standard.code,
    p_version: c.standard.version,
  });
  const signed = cur as { behaviours_hash?: string } | null;
  if (signed && signed.behaviours_hash === c.behaviours_hash) return null;
  return { gateway, past: days < 0 };
}

/**
 * One employer's weekly digest. Reads only: no email, no writes (the token is
 * passed in). Used by the Monday send and by { action: 'digest_preview' }.
 */
async function buildDigest(
  sb: ReturnType<typeof createClient>,
  e: DigestEmployer,
  token: string
): Promise<{ subject: string; html: string; learners: number; behaviour_lines: string[] } | null> {
  const { data: learners } = await sb
    .from('college_students')
    .select('id, name, user_id')
    .eq('employer_id', e.id)
    .eq('status', 'Active');
  const list = (learners ?? []) as Array<{ id: string; name: string; user_id: string | null }>;
  if (list.length === 0) return null;

  const { data: college } = await sb
    .from('colleges')
    .select('name')
    .eq('id', e.college_id)
    .maybeSingle();
  const collegeName = (college as { name?: string } | null)?.name ?? 'The college';
  const portal = `${APP}/employer-view/${token}`;

  const rows: string[] = [];
  const behaviourLines: string[] = [];
  for (const l of list) {
    const { data: summary } = l.user_id
      ? await sb.rpc('get_otj_summary', { p_user: l.user_id })
      : { data: null };
    const s = summary as {
      counted_hours?: number;
      required_hours?: number | null;
      planned_to_date_hours?: number | null;
    } | null;
    const { data: due } = await sb.rpc('tripartite_due_by', { p_student: l.id });
    const { data: next } = await sb.rpc('employer_review_focus', { p_student: l.id });
    const n = next as {
      token: string;
      scheduled_at: string | null;
      locked: boolean;
      employer_input: boolean;
      must_sign?: boolean;
    } | null;
    const hours = s?.counted_hours != null ? `${Math.round(s.counted_hours)}h` : '—';
    const of = s?.required_hours ? ` of ${Math.round(s.required_hours)}h` : '';
    const behind =
      s?.planned_to_date_hours != null &&
      s.counted_hours != null &&
      s.planned_to_date_hours > s.counted_hours + 1
        ? `, ${Math.round(s.planned_to_date_hours - s.counted_hours)}h behind plan`
        : '';
    const reviewLine = n
      ? n.locked
        ? `<a href="${APP}/review/${n.token}" style="color:#0f172a;font-weight:600">Review summary waiting for your signature</a>`
        : `Next review ${fmtWhen(n.scheduled_at) || 'being arranged'}${
            n.employer_input
              ? ''
              : ` · <a href="${APP}/review/${n.token}" style="color:#0f172a;font-weight:600">add your view</a>`
          }`
      : due
        ? `Next review due by ${fmtDay(due as string)}`
        : '';
    const bd = await behaviourDue(sb, l.id);
    const first = l.name.split(' ')[0];
    const behaviourText = bd
      ? `${first}'s behaviour sign-off ${bd.past ? 'was' : 'is'} due before gateway on ${fmtDay(bd.gateway)}`
      : '';
    if (behaviourText) behaviourLines.push(behaviourText);
    const behaviourLine = bd
      ? `<a href="${portal}#behaviours-${l.id}" style="color:#0f172a;font-weight:600">${esc(behaviourText)}</a>`
      : '';
    rows.push(
      `<tr><td style="padding:14px 0;border-top:1px solid #e2e8f0"><p style="margin:0;font-size:16px;font-weight:600;color:#0f172a">${esc(l.name)}</p>` +
        `<p style="margin:4px 0 0;font-size:14px;line-height:1.5;color:#0f172a">Off-the-job training ${hours}${of}${behind}</p>` +
        (reviewLine
          ? `<p style="margin:2px 0 0;font-size:14px;line-height:1.5;color:#0f172a">${reviewLine}</p>`
          : '') +
        (behaviourLine
          ? `<p style="margin:2px 0 0;font-size:14px;line-height:1.5;color:#0f172a">${behaviourLine}</p>`
          : '') +
        `</td></tr>`
    );
  }

  return {
    subject: `${e.company_name}: your apprentices this week`,
    learners: list.length,
    behaviour_lines: behaviourLines,
    html: shell({
      preheader: `${list.length} ${list.length === 1 ? 'apprentice' : 'apprentices'} at ${collegeName}: hours, reviews and anything waiting for you.`,
      heading: 'Your apprentices this week',
      body:
        p(e.contact_name ? `Hello ${esc(e.contact_name.split(' ')[0])},` : 'Hello,') +
        p(`A short update from ${esc(collegeName)} on the apprentices you employ.`) +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.join('')}</table>`,
      cta: { label: 'Open your apprentices', href: portal },
      footer: `Sent weekly for ${esc(collegeName)} through Elec-Mate. No account needed: the button opens your own page. <a href="${portal}?digest=off" style="color:#475569">Stop these weekly emails</a>.`,
    }),
  };
}

async function sendWeeklyDigests(sb: ReturnType<typeof createClient>): Promise<number> {
  const { data: employers } = await sb
    .from('college_employers')
    .select('id, college_id, company_name, contact_name, contact_email, last_digest_at')
    .is('weekly_digest_opt_out_at', null)
    .not('contact_email', 'is', null);
  let sent = 0;
  for (const e of (employers ?? []) as DigestEmployer[]) {
    if (e.last_digest_at && Date.now() - Date.parse(e.last_digest_at) < 6 * 86_400_000) continue;
    const { count } = await sb
      .from('college_students')
      .select('id', { count: 'exact', head: true })
      .eq('employer_id', e.id)
      .eq('status', 'Active');
    if (!count) continue;

    const token = await portalToken(sb, e.id);
    const built = await buildDigest(sb, e, token);
    if (!built) continue;
    const res = await sendEmail({
      from: FROM,
      to: e.contact_email,
      subject: built.subject,
      html: built.html,
      tags: ['employer_weekly_digest'],
      log: { template: 'college_employer_digest', entityId: e.id },
    });
    if (res.error) continue;
    await sb
      .from('college_employers')
      .update({ last_digest_at: new Date().toISOString() })
      .eq('id', e.id);
    sent += 1;
  }
  return sent;
}

/**
 * { action: 'digest_preview', employer_id } (service role): the digest this
 * employer would get, built from live data. Sends nothing and writes nothing:
 * it uses the employer's existing portal link and never mints one.
 */
async function previewDigest(sb: ReturnType<typeof createClient>, employerId: string) {
  const { data: e } = await sb
    .from('college_employers')
    .select('id, college_id, company_name, contact_name, contact_email, last_digest_at')
    .eq('id', employerId)
    .maybeSingle();
  if (!e) return { error: 'Employer not found.' };
  const { data: t } = await sb
    .from('college_employer_tokens')
    .select('token')
    .eq('employer_id', employerId)
    .is('revoked_at', null)
    .gt('expires_at', new Date().toISOString())
    .order('expires_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  const token = (t as { token?: string } | null)?.token ?? 'no-live-link';
  const built = await buildDigest(sb, e as DigestEmployer, token);
  if (!built) return { error: 'No apprentices on programme with this employer.' };
  return { success: true, ...built };
}

/** A live portal link for the employer, minted if they have none. */
async function portalToken(
  sb: ReturnType<typeof createClient>,
  employerId: string
): Promise<string> {
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
