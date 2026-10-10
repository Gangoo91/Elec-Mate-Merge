// employer-weekly-digest (ELE-1836)
//
// The boss's Sunday 6pm "your team this week" email, and its per-firm
// unsubscribe link.
//
//   POST (service role only) — called by queue_employer_weekly_digests() via
//     net.http_post with { employer_id, ref, log_id, unsubscribe_token, digest }.
//     Renders the email on the shared shell, sends it to the firm owner's
//     account email, and marks the employer_digest_log row sent / failed /
//     skipped. { preview: true } returns the HTML and sends nothing.
//     { to_override } is accepted for one address only (the founder inbox),
//     for testing.
//
//   GET ?unsubscribe=<token> — public (no JWT). Changes NOTHING: it redirects
//     to the static page /weekly-email.html?state=confirm, whose button POSTs.
//     Mail security scanners (Microsoft Safe Links, Mimecast…) open every link
//     in an email; a GET that unsubscribed would switch firms off unasked.
//   POST ?unsubscribe=<token> — RFC 8058 one-click (List-Unsubscribe-Post), and
//     the confirm page's button. Sets employer_digest_prefs.weekly_email_off_at.
//   GET/POST ?resubscribe=<token> — turns it back on (GET redirects to the page).
//
//   The token is a random v4 UUID (122 bits) held server-side per firm, looked
//   up by equality: nothing to forge, and a wrong guess learns nothing.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';
import { corsHeaders } from '../_shared/cors.ts';
import {
  sendEmail,
  clientFacingSender,
  htmlToPlainText,
  isSendableEmail,
} from '../_shared/mailer.ts';
import { teamCompany, firstNameOf } from '../_shared/email-templates/team.ts';
import {
  buildEmployerWeeklyEmail,
  type WeeklyDigest,
} from '../_shared/email-templates/employer-weekly.ts';
import { withSentry } from '../_shared/sentry.ts';

const FN_URL = 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/employer-weekly-digest';
const PAGE_URL = 'https://www.elec-mate.com/weekly-email.html';
const TEST_INBOX = 'founder@elec-mate.com';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

// deno-lint-ignore no-explicit-any
type Admin = any;

/** Constant-time string compare (the service-role check). */
function safeEqual(a: string, b: string): boolean {
  const ea = new TextEncoder().encode(a);
  const eb = new TextEncoder().encode(b);
  let diff = ea.length ^ eb.length;
  for (let i = 0; i < Math.max(ea.length, eb.length); i++) diff |= (ea[i] ?? 0) ^ (eb[i] ?? 0);
  return diff === 0;
}

/** Set (off = true/false) or just look up (off = null) the firm's choice. */
async function setPref(
  admin: Admin,
  token: string,
  off: boolean | null
): Promise<string | null> {
  const q =
    off === null
      ? admin.from('employer_digest_prefs').select('employer_id').eq('token', token)
      : admin
          .from('employer_digest_prefs')
          .update({
            weekly_email_off_at: off ? new Date().toISOString() : null,
            updated_at: new Date().toISOString(),
          })
          .eq('token', token)
          .select('employer_id');
  const { data } = await q.maybeSingle();
  if (!data?.employer_id) return null;
  const { data: cp } = await admin
    .from('company_profiles')
    .select('company_name')
    .eq('user_id', data.employer_id)
    .maybeSingle();
  return (cp?.company_name as string | undefined)?.trim() || 'your firm';
}

async function markLog(admin: Admin, id: unknown, status: string, detail: string | null) {
  if (typeof id !== 'string' || !UUID.test(id)) return;
  await admin
    .from('employer_digest_log')
    .update({
      status,
      detail: detail ? detail.slice(0, 300) : null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);
}

Deno.serve(
  withSentry('employer-weekly-digest', async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const admin = createClient(Deno.env.get('SUPABASE_URL') ?? '', serviceKey);
    const url = new URL(req.url);

    // ── unsubscribe / resubscribe (public) ──
    const unsub = url.searchParams.get('unsubscribe');
    const resub = url.searchParams.get('resubscribe');
    const token = unsub || resub;
    if (token) {
      const isPost = req.method === 'POST';
      if (!UUID.test(token)) {
        return isPost
          ? json({ ok: false }, 404)
          : Response.redirect(`${PAGE_URL}?state=invalid`, 302);
      }
      // A GET unsubscribe only asks; the page's button (or the mail client's
      // one-click POST) does it.
      const off = unsub ? (isPost ? true : null) : false;
      const firm = await setPref(admin, token, off);
      if (isPost) return json({ ok: Boolean(firm), firm: firm ?? undefined }, firm ? 200 : 404);
      if (!firm) return Response.redirect(`${PAGE_URL}?state=invalid`, 302);
      const q = new URLSearchParams({ state: unsub ? 'confirm' : 'on', firm, t: token });
      return Response.redirect(`${PAGE_URL}?${q.toString()}`, 302);
    }

    // ── send (service role only) ──
    if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405);
    const bearer = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '');
    if (!serviceKey || !safeEqual(bearer, serviceKey)) return json({ error: 'forbidden' }, 403);

    let body: {
      employer_id?: string;
      ref?: string;
      log_id?: string;
      unsubscribe_token?: string;
      digest?: WeeklyDigest;
      preview?: boolean;
      to_override?: string;
      sunday?: string;
    };
    try {
      body = await req.json();
    } catch {
      return json({ error: 'invalid json' }, 400);
    }
    const employerId = body.employer_id ?? '';
    if (!UUID.test(employerId)) return json({ error: 'employer_id required' }, 400);

    let digest = body.digest;
    if (!digest) {
      // Preview / manual run: work the numbers out here.
      const sunday =
        body.sunday ??
        (() => {
          const d = new Date();
          d.setUTCDate(d.getUTCDate() - d.getUTCDay());
          return d.toISOString().slice(0, 10);
        })();
      const { data, error } = await admin.rpc('_employer_weekly_digest', {
        p_firm: employerId,
        p_sunday: sunday,
      });
      if (error || !data) return json({ error: error?.message ?? 'no digest' }, 500);
      digest = data as WeeklyDigest;
    }

    let unsubToken = body.unsubscribe_token;
    if (!unsubToken || !UUID.test(unsubToken)) {
      await admin
        .from('employer_digest_prefs')
        .upsert({ employer_id: employerId }, { onConflict: 'employer_id', ignoreDuplicates: true });
      const { data: p } = await admin
        .from('employer_digest_prefs')
        .select('token')
        .eq('employer_id', employerId)
        .maybeSingle();
      unsubToken = p?.token;
    }
    const unsubscribeUrl = `${FN_URL}?unsubscribe=${unsubToken}`;

    const [{ data: profile }, { data: owner }, { data: authUser }] = await Promise.all([
      admin
        .from('company_profiles')
        .select(
          'company_name, logo_url, primary_color, company_email, company_phone, company_website, company_address, vat_number, company_registration'
        )
        .eq('user_id', employerId)
        .maybeSingle(),
      admin.from('profiles').select('full_name').eq('id', employerId).maybeSingle(),
      admin.auth.admin.getUserById(employerId),
    ]);

    // The firm's own name, logo and colour head the email; its address, phone
    // and VAT number do not go in the footer. This email is to the firm about
    // itself, not from it to a client, so its own letterhead there reads oddly.
    const company = {
      ...teamCompany(profile, 'Your firm'),
      email: null,
      phone: null,
      website: null,
      address: null,
      vatNumber: null,
      registrationNumber: null,
    };
    const built = buildEmployerWeeklyEmail({
      company,
      ownerFirstName: firstNameOf(owner?.full_name),
      digest,
      unsubscribeUrl,
    });

    if (body.preview)
      return json({ subject: built.subject, preheader: built.preheader, html: built.html });

    const override = (body.to_override ?? '').trim().toLowerCase();
    if (override && override !== TEST_INBOX)
      return json({ error: 'to_override is for the test inbox only' }, 400);
    const to = override || ((authUser?.user?.email as string | undefined) ?? '').trim();
    if (!to || !isSendableEmail(to)) {
      await markLog(admin, body.log_id, 'skipped', 'no sendable owner email');
      return json({ skipped: 'no owner email' });
    }

    const sender = clientFacingSender({ companyName: 'Elec-Mate' });
    const { data: sent, error } = await sendEmail({
      from: sender.from,
      to: [to],
      subject: built.subject,
      html: built.html,
      text: htmlToPlainText(built.html),
      headers: {
        'List-Unsubscribe': `<${unsubscribeUrl}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
      tags: ['employer-weekly-digest'],
      log: { template: 'employer_weekly_digest', entityId: body.ref ?? null, userId: employerId },
    });
    if (error) {
      console.error('[employer-weekly-digest] send failed', employerId, error.message);
      await markLog(admin, body.log_id, 'failed', error.message);
      return json({ error: error.message }, 502);
    }
    await markLog(
      admin,
      body.log_id,
      'sent',
      `${override ? 'test inbox · ' : ''}${sent?.id ?? 'sent'}`
    );
    return json({ sent: true, to: override ? TEST_INBOX : 'owner' });
  })
);
