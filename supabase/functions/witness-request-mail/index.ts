/**
 * witness-request-mail — emails a supervisor the witness-statement link an
 * apprentice created (ELE-1869). The supervisor needs no account: the button
 * opens /witness/:token.
 *
 *   POST { witness_id, dry_run? }   the learner's own JWT
 *
 * The learner can only send their own request (read through RLS with their
 * JWT), only while it is waiting to be signed, and only to the email address
 * stored on it. Capped at 3 emails per request (10 minutes apart) and 10 per
 * learner per day, so the link cannot be used to send mail in bulk.
 *
 * dry_run: true builds the email and returns it without sending or counting
 * (used by tests and by the preview; never sends).
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { identifyCaller, deny } from '../_shared/caller.ts';
import { sendEmail, isSendableEmail } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const APP = 'https://elec-mate.com';
const FROM = 'Elec-Mate <noreply@elec-mate.com>';
const PER_REQUEST = 3;
const PER_DAY = 10;
const GAP_MS = 10 * 60_000;

const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const p = (text: string) => `<p style="margin:0 0 12px;font-size:16px;line-height:1.6;color:#0f172a">${text}</p>`;

function shell(opts: { preheader: string; heading: string; body: string; cta: { label: string; href: string }; footer: string }) {
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

interface WitnessRow {
  id: string;
  learner_id: string;
  token: string;
  status: string;
  witness_email: string | null;
  criteria: string[] | null;
  evidence_snapshot: { title?: string } | null;
  expires_at: string;
  emailed_at: string | null;
  email_count: number | null;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  try {
    const caller = await identifyCaller(req);
    if (!caller || caller.kind !== 'user') return deny(corsHeaders, 401, 'Sign in to send this.');
    const body = (await req.json().catch(() => ({}))) as { witness_id?: string; dry_run?: boolean };
    if (!body.witness_id) return json({ error: 'Which request?' }, 400);
    const dryRun = body.dry_run === true;

    const url = Deno.env.get('SUPABASE_URL')!;
    // Read as the learner: RLS returns the row only if it is theirs.
    const asUser = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
      auth: { persistSession: false },
    });
    const { data: row } = await asUser
      .from('portfolio_witness_statements')
      .select('id, learner_id, token, status, witness_email, criteria, evidence_snapshot, expires_at, emailed_at, email_count')
      .eq('id', body.witness_id)
      .maybeSingle();
    const w = row as WitnessRow | null;
    if (!w || w.learner_id !== caller.userId) return json({ error: 'Request not found.' }, 404);
    if (w.status !== 'requested') return json({ error: 'This request has already been signed or withdrawn.' });
    if (Date.parse(w.expires_at) < Date.now()) return json({ error: 'This link has expired. Create a new one.' });
    const to = (w.witness_email ?? '').trim();
    if (!to || !isSendableEmail(to)) return json({ error: 'Add a valid email address for your witness first.' });

    const admin = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });
    if (!dryRun) {
      if ((w.email_count ?? 0) >= PER_REQUEST) return json({ error: 'This link has been emailed three times. Share it by text or WhatsApp instead.' });
      if (w.emailed_at && Date.now() - Date.parse(w.emailed_at) < GAP_MS)
        return json({ error: 'Emailed a few minutes ago. Give it a little while to arrive.' });
      const { count } = await admin
        .from('portfolio_witness_statements')
        .select('id', { count: 'exact', head: true })
        .eq('learner_id', caller.userId)
        .gte('emailed_at', new Date(Date.now() - 86_400_000).toISOString());
      if ((count ?? 0) >= PER_DAY) return json({ error: 'You have emailed a lot of witness links today. Try again tomorrow.' });
    }

    const { data: prof } = await admin.from('profiles').select('full_name').eq('id', caller.userId).maybeSingle();
    const learner = ((prof as { full_name?: string } | null)?.full_name ?? '').trim() || 'An apprentice';
    const first = learner.split(' ')[0];
    const title = w.evidence_snapshot?.title?.trim() || 'some work on site';
    const link = `${APP}/witness/${w.token}`;
    const n = w.criteria?.length ?? 0;
    const expires = new Date(w.expires_at).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      timeZone: 'Europe/London',
    });

    const subject = `${learner} asked you to confirm their work`;
    const html = shell({
      preheader: `Two minutes, no account: confirm what you saw ${first} do.`,
      heading: `Confirm what you saw ${first} do`,
      body:
        p('Hello,') +
        p(
          `${esc(learner)} is an electrical apprentice using Elec-Mate to build their portfolio. They have asked you to back up a piece of their evidence: <b>${esc(title)}</b>.`
        ) +
        p(
          `The page shows what they did${n ? ` and the ${n === 1 ? 'one thing' : `${n} things`} you are asked to confirm` : ''}. Write a line about what you saw, add your name and role, and sign. It takes two minutes and you do not need an account.`
        ) +
        p(`The link works until ${esc(expires)}.`),
      cta: { label: 'Open the witness statement', href: link },
      footer: `Sent through Elec-Mate at ${esc(first)}'s request. If you did not see this work, you do not need to do anything. This link is only for you; please do not forward it.`,
    });

    if (dryRun) return json({ success: true, dry_run: true, to, subject, html });

    const res = await sendEmail({
      from: FROM,
      to,
      replyTo: caller.email ?? undefined,
      subject,
      html,
      tags: ['witness_request'],
      log: { template: 'witness_request', entityId: w.id, userId: caller.userId },
    });
    if (res.error) return json({ error: 'The email did not send. Copy the link and send it yourself.' });
    await admin
      .from('portfolio_witness_statements')
      .update({ emailed_at: new Date().toISOString(), email_count: (w.email_count ?? 0) + 1 })
      .eq('id', w.id);
    return json({ success: true, to });
  } catch (err) {
    await captureException(err, { functionName: 'witness-request-mail', requestUrl: req.url, requestMethod: req.method });
    return json({ error: 'Something went wrong. Copy the link and send it yourself.' }, 500);
  }
});

function json(b: unknown, status = 200) {
  return new Response(JSON.stringify(b), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}
