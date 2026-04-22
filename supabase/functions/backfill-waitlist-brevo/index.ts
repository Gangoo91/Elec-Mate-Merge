/**
 * One-shot backfill — adds every existing business_ai_waitlist row to the
 * matching Brevo list (7=mate, 8=employer, 9=college).
 *
 * Protected: requires `Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>`.
 * Intended to be invoked once after Brevo list IDs are configured — not called
 * from the app. Idempotent: Brevo `updateEnabled: true` upserts by email.
 *
 * ENV:
 *   - BREVO_API_KEY
 *   - BREVO_MATE_WAITLIST_LIST_ID
 *   - BREVO_EMPLOYER_WAITLIST_LIST_ID
 *   - BREVO_COLLEGE_WAITLIST_LIST_ID
 *   - SUPABASE_SERVICE_ROLE_KEY
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';

const BREVO_CONTACTS_ENDPOINT = 'https://api.brevo.com/v3/contacts';

type Plan = 'mate' | 'employer' | 'college';

const LIST_ID_ENV: Record<Plan, string> = {
  mate: 'BREVO_MATE_WAITLIST_LIST_ID',
  employer: 'BREVO_EMPLOYER_WAITLIST_LIST_ID',
  college: 'BREVO_COLLEGE_WAITLIST_LIST_ID',
};

async function addToBrevoList(
  apiKey: string,
  email: string,
  listId: number,
  attributes: Record<string, string | undefined>
): Promise<{ ok: boolean; status: number; error?: string }> {
  try {
    const res = await fetch(BREVO_CONTACTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
        attributes: Object.fromEntries(
          Object.entries(attributes).filter(([, v]) => v !== undefined && v !== '')
        ),
      }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, status: res.status, error: (body as { message?: string })?.message };
    }
    return { ok: true, status: res.status };
  } catch (err) {
    return { ok: false, status: 0, error: err instanceof Error ? err.message : String(err) };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!serviceKey) {
      return new Response(JSON.stringify({ error: 'Service role key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const authHeader = req.headers.get('Authorization') || '';
    if (authHeader !== `Bearer ${serviceKey}`) {
      return new Response(JSON.stringify({ error: 'Unauthorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const brevoKey = Deno.env.get('BREVO_API_KEY');
    if (!brevoKey) {
      return new Response(JSON.stringify({ error: 'BREVO_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', serviceKey);

    // Fetch all waitlist rows with emails + names
    const { data: rows, error: rowsErr } = await supabase
      .from('business_ai_waitlist')
      .select('user_id, plan, created_at');
    if (rowsErr || !rows) {
      return new Response(
        JSON.stringify({ error: 'Could not read waitlist', detail: rowsErr?.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Batch-lookup profiles for names
    const userIds = rows.map((r) => r.user_id);
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name')
      .in('id', userIds);
    const nameById = new Map<string, string>(
      (profiles ?? []).map((p) => [p.id as string, (p.full_name as string) ?? ''])
    );

    // Batch-lookup emails from auth.users via the admin API
    const emailById = new Map<string, string>();
    for (const uid of userIds) {
      const { data: u } = await supabase.auth.admin.getUserById(uid);
      const email = u?.user?.email;
      if (email) emailById.set(uid, email.toLowerCase());
    }

    const results: Array<{ user_id: string; plan: Plan; email?: string; ok: boolean; error?: string }> =
      [];

    for (const row of rows) {
      const plan = row.plan as Plan;
      if (plan !== 'mate' && plan !== 'employer' && plan !== 'college') {
        results.push({ user_id: row.user_id, plan, ok: false, error: 'unknown plan' });
        continue;
      }
      const email = emailById.get(row.user_id);
      if (!email) {
        results.push({ user_id: row.user_id, plan, ok: false, error: 'no email' });
        continue;
      }
      const listIdRaw = Deno.env.get(LIST_ID_ENV[plan]);
      const listId = listIdRaw ? parseInt(listIdRaw, 10) : NaN;
      if (!Number.isFinite(listId)) {
        results.push({ user_id: row.user_id, plan, email, ok: false, error: 'list id not set' });
        continue;
      }
      const [firstName, ...rest] = (nameById.get(row.user_id) ?? '').split(' ');
      const r = await addToBrevoList(brevoKey, email, listId, {
        FIRSTNAME: firstName || undefined,
        LASTNAME: rest.join(' ') || undefined,
        WAITLIST_PLAN: plan,
      });
      results.push({
        user_id: row.user_id,
        plan,
        email,
        ok: r.ok,
        error: r.ok ? undefined : r.error || `status ${r.status}`,
      });
    }

    const summary = {
      total: results.length,
      synced: results.filter((r) => r.ok).length,
      failed: results.filter((r) => !r.ok).length,
    };

    return new Response(JSON.stringify({ summary, results }, null, 2), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[backfill-waitlist-brevo] Handler error', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
