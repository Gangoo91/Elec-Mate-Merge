/**
 * Join waitlist — dual-write signup for early-access plans (Mate, Employer, College).
 *
 * Flow:
 *   1. Auth the caller via the JWT in the Authorization header
 *   2. Insert into business_ai_waitlist (user_id, plan) — idempotent via UNIQUE
 *   3. POST the user's email to the plan-specific Brevo list
 *
 * Brevo list IDs are set per plan via env vars:
 *   - BREVO_MATE_WAITLIST_LIST_ID
 *   - BREVO_EMPLOYER_WAITLIST_LIST_ID
 *   - BREVO_COLLEGE_WAITLIST_LIST_ID
 *
 * Brevo failures do NOT fail the request — Supabase is the source of truth;
 * a missing Brevo send is logged and surfaced as `brevo_ok: false`.
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';

const BREVO_CONTACTS_ENDPOINT = 'https://api.brevo.com/v3/contacts';

type Plan = 'mate' | 'employer' | 'college';

interface Payload {
  plan: Plan;
  phone_number?: string;
}

// UK mobile in E.164, normalised to +447XXXXXXXXX (required for Mate — WhatsApp)
const UK_MOBILE_RE = /^\+447[0-9]{9}$/;

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
): Promise<{ ok: boolean; status: number }> {
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
    return { ok: res.ok, status: res.status };
  } catch (err) {
    console.error('[join-waitlist] Brevo error', err);
    return { ok: false, status: 0 };
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
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();

    if (userErr || !user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { plan, phone_number } = (await req.json()) as Payload;
    if (plan !== 'mate' && plan !== 'employer' && plan !== 'college') {
      return new Response(JSON.stringify({ error: 'Invalid plan' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Phone is required for Mate (WhatsApp activation), optional for others
    let phone: string | null = null;
    if (phone_number) {
      const trimmed = phone_number.trim().replace(/\s/g, '');
      if (!UK_MOBILE_RE.test(trimmed)) {
        return new Response(
          JSON.stringify({ error: 'Invalid UK mobile — expected +447XXXXXXXXX' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      phone = trimmed;
    }
    if (plan === 'mate' && !phone) {
      return new Response(
        JSON.stringify({ error: 'Phone number required for Mate waitlist' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const email = user.email?.toLowerCase();
    if (!email) {
      return new Response(JSON.stringify({ error: 'User has no email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Upsert into Supabase — ON CONFLICT makes this idempotent
    const { error: insertErr } = await supabase
      .from('business_ai_waitlist')
      .upsert(
        { user_id: user.id, plan, phone_number: phone },
        { onConflict: 'user_id,plan' }
      );

    if (insertErr) {
      console.error('[join-waitlist] Supabase insert error', insertErr);
      return new Response(JSON.stringify({ error: 'Could not save' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fire-and-log Brevo add — don't fail the request if Brevo is down
    let brevoOk = true;
    const brevoKey = Deno.env.get('BREVO_API_KEY');
    const listIdRaw = Deno.env.get(LIST_ID_ENV[plan]);
    const listId = listIdRaw ? parseInt(listIdRaw, 10) : NaN;

    if (brevoKey && Number.isFinite(listId)) {
      // Pull first/last name from the profile if available — best-effort
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle();

      const [firstName, ...rest] = (profile?.full_name ?? '').split(' ');
      const lastName = rest.join(' ');

      const result = await addToBrevoList(brevoKey, email, listId, {
        FIRSTNAME: firstName || undefined,
        LASTNAME: lastName || undefined,
        WAITLIST_PLAN: plan,
        SMS: phone || undefined, // Brevo native SMS field — E.164 format
      });
      brevoOk = result.ok;
      if (!brevoOk) {
        console.warn('[join-waitlist] Brevo non-OK', { plan, status: result.status });
      }
    } else {
      brevoOk = false;
      console.warn('[join-waitlist] Brevo not configured for plan', plan);
    }

    return new Response(JSON.stringify({ ok: true, plan, brevo_ok: brevoOk }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[join-waitlist] Handler error', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
