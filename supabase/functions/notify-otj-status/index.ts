// Notify OTJ Status — server-side handler for tutor actions on an
// apprentice-submitted OTJ entry. Updates verification_status in
// college_otj_entries and fires a push notification to the apprentice in
// one round-trip, so the client doesn't need service-role and the apprentice
// always gets notified the same moment the database flips.
//
// Auth: same-college staff only. Body: { otj_entry_id, action, rationale? }.
//
// Audience: apprentice (the entry's student_id). Push deep-links to their
// college hub OTJ section so they see the verified / returned state with
// the existing realtime listener already wired up there.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

interface ReqBody {
  otj_entry_id: string;
  action: 'verify' | 'reject';
  rationale?: string;
}

type SbClient = ReturnType<typeof createClient>;

interface OtjEntryRow {
  id: string;
  college_id: string | null;
  student_id: string;
  title: string;
  duration_minutes: number;
  activity_type: string;
}

async function authoriseStaff(
  req: Request,
  sb: SbClient,
  entry: OtjEntryRow
): Promise<{ ok: true; uid: string } | { ok: false; error: 'unauthorized' | 'forbidden' }> {
  const auth = req.headers.get('authorization');
  if (!auth) return { ok: false, error: 'unauthorized' };
  const userClient = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: auth } }, auth: { persistSession: false } }
  );
  const { data: userData } = await userClient.auth.getUser();
  const uid = userData?.user?.id;
  if (!uid) return { ok: false, error: 'unauthorized' };

  if (!entry.college_id) return { ok: false, error: 'forbidden' };
  const { data: staff } = await sb
    .from('college_staff')
    .select('id')
    .eq('user_id', uid)
    .eq('college_id', entry.college_id)
    .maybeSingle();
  if (!staff) return { ok: false, error: 'forbidden' };
  return { ok: true, uid };
}

function fmtHours(min: number): string {
  if (!min || min < 0) return '0m';
  if (min < 60) return `${Math.round(min)}m`;
  const h = min / 60;
  return h >= 10 ? `${h.toFixed(0)}h` : `${h.toFixed(1)}h`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST')
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return new Response(JSON.stringify({ error: 'server_misconfigured' }), {
      status: 500,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let body: ReqBody;
  try {
    body = (await req.json()) as ReqBody;
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (!body.otj_entry_id || !body.action) {
    return new Response(JSON.stringify({ error: 'missing_fields' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (body.action !== 'verify' && body.action !== 'reject') {
    return new Response(JSON.stringify({ error: 'invalid_action' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  if (body.action === 'reject' && !body.rationale?.trim()) {
    return new Response(JSON.stringify({ error: 'rationale_required' }), {
      status: 400,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // 1. Load entry — needed for both auth scoping + push body content.
  const { data: entryRow } = await sb
    .from('college_otj_entries')
    .select('id, college_id, student_id, title, duration_minutes, activity_type')
    .eq('id', body.otj_entry_id)
    .maybeSingle();
  if (!entryRow) {
    return new Response(JSON.stringify({ error: 'entry_not_found' }), {
      status: 404,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }
  const entry = entryRow as OtjEntryRow;

  const auth = await authoriseStaff(req, sb, entry);
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.error === 'forbidden' ? 403 : 401,
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    });
  }

  // 2. Apply the verification update.
  const trimmed = body.rationale?.trim() ?? '';
  const updatePatch =
    body.action === 'verify'
      ? {
          verification_status: 'verified',
          verified_by: auth.uid,
          verified_at: new Date().toISOString(),
          verification_rationale: null,
        }
      : {
          verification_status: 'rejected',
          verified_by: auth.uid,
          verified_at: null,
          verification_rationale: trimmed,
        };
  const { error: updErr } = await sb
    .from('college_otj_entries')
    .update(updatePatch)
    .eq('id', entry.id);
  if (updErr) {
    return new Response(
      JSON.stringify({ error: 'update_failed', detail: updErr.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'content-type': 'application/json' },
      }
    );
  }

  // 3. Fire push notification — fire-and-forget. We do NOT block the
  // tutor's UI on a slow VAPID push; the DB update is the source of truth
  // and realtime will already have fanned out to the apprentice's hub.
  const titleSnippet = entry.title.slice(0, 60);
  const verifyTitle = 'Your OTJ hours are verified';
  const verifyBody = `${fmtHours(entry.duration_minutes)} signed off — "${titleSnippet}".`;
  const rejectTitle = 'Tutor needs more info on your OTJ';
  const rejectBody = trimmed
    ? `${trimmed.slice(0, 100)}${trimmed.length > 100 ? '…' : ''}`
    : `Have another look at "${titleSnippet}" and resubmit.`;

  fetch(`${SUPABASE_URL}/functions/v1/send-push-notification`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({
      userId: entry.student_id,
      title: body.action === 'verify' ? verifyTitle : rejectTitle,
      body: body.action === 'verify' ? verifyBody : rejectBody,
      type: 'college',
      data: {
        kind: body.action === 'verify' ? 'otj_verified' : 'otj_returned',
        otj_entry_id: entry.id,
        deeplink: '/apprentice/college-plan#otj',
      },
    }),
  }).catch((e) => {
    // Log only — never propagate. Push failures are common (no
    // subscription registered, expired endpoint) and shouldn't block.
    console.error('otj push failed:', (e as Error).message);
  });

  return new Response(
    JSON.stringify({ ok: true, otj_entry_id: entry.id, action: body.action }),
    {
      headers: { ...corsHeaders, 'content-type': 'application/json' },
    }
  );
});
