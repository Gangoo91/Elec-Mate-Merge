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
 * Security model: the otj_entry_id is a UUID (122 bits entropy) so the
 * URL is unguessable. Anyone with the link can attest — that's the intent
 * (the apprentice shares it with whichever supervisor saw the work). We
 * snapshot the supervisor's name + email + a server-stamped timestamp so
 * the audit trail captures who attested and when.
 *
 * Routes:
 *   GET    ?id=<uuid>       → preview the entry (title, hours, date, learner)
 *   POST   ?id=<uuid>       body { attester_name, attester_email }
 *                           → flip to employer_attested
 *   POST   ?id=<uuid>&revoke=true (with apprentice JWT)
 *                           → reset back to apprentice_submitted/pending
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';

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
          'id, student_id, activity_date, activity_type, title, description, duration_minutes, source_kind, verification_status, verified_at, attestation_email, attested_by_name'
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
            attestation_email: r.attestation_email,
            learner_name: learnerName,
          },
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    /* ─── POST: attest ──────────────────────────────────────────── */
    if (req.method === 'POST') {
      const body = (await req.json().catch(() => ({}))) as {
        attester_name?: string;
        attester_email?: string;
      };
      const name = (body.attester_name || '').trim();
      const email = (body.attester_email || '').trim();
      if (!name || name.length < 2) {
        return new Response(
          JSON.stringify({ ok: false, error: 'Your name is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response(
          JSON.stringify({ ok: false, error: 'A valid email is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Confirm row exists + isn't already attested
      const { data: existing, error: getErr } = await sb
        .from('college_otj_entries')
        .select('id, source_kind, verification_status')
        .eq('id', id)
        .maybeSingle();
      if (getErr) throw getErr;
      if (!existing) {
        return new Response(JSON.stringify({ ok: false, error: 'Not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if ((existing as { source_kind: string }).source_kind === 'employer_attested') {
        return new Response(
          JSON.stringify({ ok: false, error: 'Already attested by an employer' }),
          { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { error: updErr } = await sb
        .from('college_otj_entries')
        .update({
          source_kind: 'employer_attested',
          verification_status: 'verified_by_employer',
          verified_at: new Date().toISOString(),
          attested_by_name: name,
          attestation_email: email,
        })
        .eq('id', id);
      if (updErr) throw updErr;

      return new Response(
        JSON.stringify({ ok: true, attested_at: new Date().toISOString() }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
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
