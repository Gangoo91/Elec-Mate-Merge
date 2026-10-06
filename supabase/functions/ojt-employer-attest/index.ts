/**
 * ojt-employer-attest — Public-facing employer attestation endpoint.
 *
 * The apprentice generates a one-tap URL like:
 *   https://app/attest-ojt/<otj_entry_id>
 *
 * Their supervisor opens the link (no login required), reviews the entry
 * the apprentice has logged, types their name + email, and taps Attest.
 * The endpoint flips the row to:
 *   source_kind: 'employer_attested'
 *   verification_status: 'verified_by_employer'
 *   verified_at: now()
 *
 * Security model (ELE-1949, 6 Oct): the link alone is no longer enough.
 * The supervisor gives their name + email, we email a 6-digit code to that
 * address, and the attestation only lands when the code is entered. Codes are
 * stored hashed in otj_attest_codes, expire after 15 minutes, allow 5
 * attempts, and at most 3 codes per entry per hour. A link stops working 30
 * days after the entry was logged. The audit trail records the confirmed
 * email, name, comment and a server timestamp.
 *
 * Routes:
 *   GET  ?id=<uuid>                      → preview (title, hours, date, learner)
 *   POST ?id=<uuid> { action:'send_code', attester_name, attester_email }
 *   POST ?id=<uuid> { action:'confirm', code, attester_comment? }
 *                                        → flip to employer_attested
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { captureException } from '../_shared/sentry.ts';
import { sendEmail, clientFacingSender, htmlToPlainText } from '../_shared/mailer.ts';
import { renderEmailShell, renderHero } from '../_shared/email-template.ts';

const LINK_LIFETIME_DAYS = 30;
const CODE_TTL_MINUTES = 15;
const MAX_ATTEMPTS = 5;
const MAX_CODES_PER_HOUR = 3;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function sixDigitCode(): string {
  const n = crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000;
  return String(n).padStart(6, '0');
}

function isExpired(createdAt: string | null | undefined): boolean {
  if (!createdAt) return false;
  return Date.now() - new Date(createdAt).getTime() > LINK_LIFETIME_DAYS * 86_400_000;
}

function maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  if (!domain) return email;
  return `${user.slice(0, 2)}${'•'.repeat(Math.max(1, user.length - 2))}@${domain}`;
}

interface OtjRow {
  id: string;
  student_id: string | null;
  activity_date: string;
  activity_type: string;
  title: string;
  description: string | null;
  duration_minutes: number;
  source_kind: string;
  verification_status: string;
  verified_at: string | null;
  attestation_email: string | null;
  attested_by_name: string | null;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const sb = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    /* ─── GET: preview ─────────────────────────────────────────── */
    if (req.method === 'GET') {
      const { data: row, error } = await sb
        .from('college_otj_entries')
        .select(
          'id, student_id, activity_date, activity_type, title, description, duration_minutes, source_kind, verification_status, verified_at, attestation_email, attested_by_name, created_at'
        )
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      if (!row) {
        return new Response(JSON.stringify({ ok: false, error: 'Not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const r = row as OtjRow;
      let learnerName: string | null = null;
      if (r.student_id) {
        const { data: prof } = await sb
          .from('profiles')
          .select('full_name')
          .eq('id', r.student_id)
          .maybeSingle();
        learnerName = (prof as { full_name?: string } | null)?.full_name ?? null;
      }
      return new Response(
        JSON.stringify({
          ok: true,
          entry: {
            id: r.id,
            activity_date: r.activity_date,
            activity_type: r.activity_type,
            title: r.title,
            description: r.description,
            duration_minutes: r.duration_minutes,
            source_kind: r.source_kind,
            verification_status: r.verification_status,
            verified_at: r.verified_at,
            already_attested: r.source_kind === 'employer_attested',
            attested_by_name: r.attested_by_name,
            learner_name: learnerName,
            link_expired: isExpired((r as OtjRow & { created_at: string }).created_at),
          },
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    /* ─── POST: send_code / confirm ───────────────────────────── */
    if (req.method === 'POST') {
      const body = (await req.json().catch(() => ({}))) as {
        action?: string;
        attester_name?: string;
        attester_email?: string;
        attester_comment?: string;
        code?: string;
      };

      const { data: entry, error: getErr } = await sb
        .from('college_otj_entries')
        .select('id, student_id, title, duration_minutes, activity_date, source_kind, verification_status, created_at')
        .eq('id', id)
        .maybeSingle();
      if (getErr) throw getErr;
      if (!entry) return json({ ok: false, error: 'Not found' }, 404);
      const e = entry as {
        id: string;
        student_id: string | null;
        title: string;
        duration_minutes: number;
        activity_date: string;
        source_kind: string;
        verification_status: string;
        created_at: string;
      };
      if (e.source_kind === 'employer_attested') {
        return json({ ok: false, error: 'Already attested by an employer' }, 409);
      }
      // A tutor's verdict is a separate authority — only PENDING entries.
      if (e.verification_status !== 'pending') {
        return json(
          { ok: false, error: 'This entry has already been reviewed and can no longer be attested' },
          409
        );
      }
      if (isExpired(e.created_at)) {
        return json(
          {
            ok: false,
            error: `This link has expired (links last ${LINK_LIFETIME_DAYS} days). Ask the apprentice to send a new one.`,
          },
          410
        );
      }

      /* send_code ─ validate name/email, rate-limit, email a code */
      if (body.action === 'send_code') {
        const name = (body.attester_name || '').trim().slice(0, 120);
        const email = (body.attester_email || '').trim().toLowerCase().slice(0, 200);
        if (name.length < 2) return json({ ok: false, error: 'Your name is required' }, 400);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return json({ ok: false, error: 'A valid email is required' }, 400);
        }
        const hourAgo = new Date(Date.now() - 3600_000).toISOString();
        const { count } = await sb
          .from('otj_attest_codes')
          .select('id', { count: 'exact', head: true })
          .eq('entry_id', id)
          .gte('created_at', hourAgo);
        if ((count ?? 0) >= MAX_CODES_PER_HOUR) {
          return json({ ok: false, error: 'Too many codes requested. Try again in an hour.' }, 429);
        }

        const code = sixDigitCode();
        const { error: insErr } = await sb.from('otj_attest_codes').insert({
          entry_id: id,
          attester_name: name,
          attester_email: email,
          code_hash: await sha256Hex(`${id}:${code}`),
          expires_at: new Date(Date.now() + CODE_TTL_MINUTES * 60_000).toISOString(),
        });
        if (insErr) throw insErr;

        let learner = 'An apprentice';
        if (e.student_id) {
          const { data: prof } = await sb
            .from('profiles')
            .select('full_name')
            .eq('id', e.student_id)
            .maybeSingle();
          learner = (prof as { full_name?: string } | null)?.full_name || learner;
        }
        const hours = (e.duration_minutes / 60).toFixed(1).replace(/\.0$/, '');
        const subject = `Your code to confirm ${learner}'s training hours: ${code}`;
        const html = renderEmailShell({
          subject,
          preheader: `Enter ${code} on the confirmation page. It expires in ${CODE_TTL_MINUTES} minutes.`,
          company: { name: 'Elec-Mate' },
          greeting: `Hi ${name.split(' ')[0]},`,
          body: `<p style="margin:0 0 12px;">${learner} asked you to confirm ${hours} hours of off-the-job training: <strong>${e.title.replace(/</g, '&lt;')}</strong>.</p><p style="margin:0;">Enter this code on the confirmation page. If you didn't ask for it, ignore this email and nothing will be recorded.</p>`,
          hero: renderHero({
            label: 'Confirmation code',
            value: code,
            sub: `Expires in ${CODE_TTL_MINUTES} minutes`,
          }),
        });
        const sender = clientFacingSender({ companyName: 'Elec-Mate' });
        const sent = await sendEmail({
          from: sender.from,
          to: email,
          subject,
          html,
          text: htmlToPlainText(html),
          tags: ['otj-attest-code'],
        });
        if ((sent as { error?: unknown }).error) {
          return json({ ok: false, error: 'Could not send the code email. Check the address and try again.' }, 502);
        }
        return json({ ok: true, sent_to: maskEmail(email), expires_in_minutes: CODE_TTL_MINUTES });
      }

      /* confirm ─ check the latest unused code, then attest */
      if (body.action === 'confirm') {
        const code = (body.code || '').replace(/\D/g, '');
        const comment = (body.attester_comment || '').trim().slice(0, 2000);
        if (code.length !== 6) return json({ ok: false, error: 'Enter the 6-digit code' }, 400);

        const { data: pending } = await sb
          .from('otj_attest_codes')
          .select('id, attester_name, attester_email, code_hash, attempts, expires_at')
          .eq('entry_id', id)
          .is('used_at', null)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        const c = pending as {
          id: string;
          attester_name: string;
          attester_email: string;
          code_hash: string;
          attempts: number;
          expires_at: string;
        } | null;
        if (!c || new Date(c.expires_at).getTime() < Date.now()) {
          return json({ ok: false, error: 'That code has expired. Request a new one.' }, 410);
        }
        if (c.attempts >= MAX_ATTEMPTS) {
          return json({ ok: false, error: 'Too many wrong codes. Request a new one.' }, 429);
        }
        if ((await sha256Hex(`${id}:${code}`)) !== c.code_hash) {
          await sb.from('otj_attest_codes').update({ attempts: c.attempts + 1 }).eq('id', c.id);
          return json(
            { ok: false, error: `That code isn't right. ${MAX_ATTEMPTS - c.attempts - 1} tries left.` },
            400
          );
        }

        await sb.from('otj_attest_codes').update({ used_at: new Date().toISOString() }).eq('id', c.id);
        const attestedAt = new Date().toISOString();
        const { data: updated, error: updErr } = await sb
          .from('college_otj_entries')
          .update({
            source_kind: 'employer_attested',
            verification_status: 'verified_by_employer',
            verified_at: attestedAt,
            attested_by_name: c.attester_name,
            attestation_email: c.attester_email,
            attestation_comment: comment || null,
          })
          .eq('id', id)
          .eq('verification_status', 'pending')
          .select('id');
        if (updErr) throw updErr;
        if (!updated || updated.length === 0) {
          return json({ ok: false, error: 'This entry changed while you were confirming it.' }, 409);
        }
        return json({ ok: true, attested_at: attestedAt });
      }

      // Old one-step clients (name + email, no code) are no longer accepted.
      return json(
        { ok: false, error: 'This page has been updated. Please refresh and try again.' },
        426
      );
    }

    return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    await captureException(err, { functionName: 'ojt-employer-attest', requestUrl: req.url, requestMethod: req.method });
    console.error('[ojt-employer-attest] error:', err);
    return new Response(
      JSON.stringify({
        ok: false,
        error: err instanceof Error ? err.message : 'Internal error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
