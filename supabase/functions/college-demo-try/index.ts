/**
 * college-demo-try — "Try it on your phone" (ELE-1854, P-ELE-13).
 *
 * A visitor scans the presenter's QR (/try/:token). This function swaps the
 * single-use token for a throwaway demo learner in the DEMO college and hands
 * back a session, so the visitor is in the app on their own phone in one scan.
 *
 *   POST { token } -> { ok: true, session: { access_token, refresh_token }, display_name, session_ends_at }
 *                  -> { ok: false, error: 'invalid' | 'used' | 'expired' | 'daily_limit'
 *                                       | 'network_limit' | 'busy' | 'unavailable' | 'failed' }
 *
 * Deploy with --no-verify-jwt: the visitor has no account yet. The token is the
 * credential. Everything that matters is enforced in SQL (_demo_try_claim and
 * _demo_try_provision, migration 20261010171500):
 *   - the token is single use and lasts 15 minutes; only its SHA-256 is stored;
 *   - only a college with colleges.is_demo = true, only a cohort whose tutor is
 *     a fixture account, so a visitor can never reach a real college or tutor;
 *   - 10 visitors per demo college per 24 hours, 3 per network per hour, 30
 *     live at once;
 *   - the account email is founder+collegedemo-try-<hex>@elec-mate.com (demo
 *     mode on; nothing is ever emailed to anyone else). Created with the email
 *     already confirmed, so no email is sent at all;
 *   - the session ends after 2 hours (cron bans the account and removes its
 *     sessions) and the account is deleted after 48 hours.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { withSentry } from '../_shared/sentry.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? 'https://jtwygbeceundfgnkirof.supabase.co';
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function randomPassword(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

type Claim = {
  error?: string;
  visitor_id?: string;
  email?: string;
  display_name?: string;
  session_ends_at?: string;
};

Deno.serve(
  withSentry('college-demo-try', async (req: Request) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
    if (req.method !== 'POST') return json({ ok: false, error: 'invalid' }, 405);

    let token = '';
    try {
      token = String((await req.json())?.token ?? '')
        .trim()
        .toLowerCase();
    } catch {
      return json({ ok: false, error: 'invalid' }, 400);
    }
    if (!/^[0-9a-f]{36}$/.test(token)) return json({ ok: false, error: 'invalid' }, 400);
    if (!SERVICE_ROLE || !ANON_KEY) return json({ ok: false, error: 'failed' }, 500);

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

    // Network address, hashed with a server secret: enough for a rate limit,
    // useless to anyone reading the ledger.
    const ip =
      req.headers.get('cf-connecting-ip') ??
      req.headers.get('x-real-ip') ??
      (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim();
    const ipHash = ip ? await sha256Hex(`${SERVICE_ROLE.slice(-16)}:${ip}`) : null;

    const { data: claimData, error: claimErr } = await admin.rpc('_demo_try_claim', {
      p_token_hash: await sha256Hex(token),
      p_ip_hash: ipHash,
    });
    if (claimErr) {
      console.error('[college-demo-try] claim failed', claimErr.message);
      return json({ ok: false, error: 'failed' }, 500);
    }
    const claim = (claimData ?? {}) as Claim;
    if (claim.error || !claim.visitor_id || !claim.email) {
      return json({ ok: false, error: claim.error ?? 'failed' }, 200);
    }

    // Create the account. Email already confirmed: nothing is sent.
    const password = randomPassword();
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email: claim.email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: claim.display_name,
        created_via: 'admin_bulk',
        fixture: 'college-demo-try',
      },
    });
    if (createErr || !created?.user) {
      console.error('[college-demo-try] createUser failed', createErr?.message);
      return json({ ok: false, error: 'failed' }, 500);
    }

    const { error: provErr } = await admin.rpc('_demo_try_provision', {
      p_visitor: claim.visitor_id,
      p_user: created.user.id,
    });
    if (provErr) {
      console.error('[college-demo-try] provision failed', provErr.message);
      // Never leave a half-made account behind.
      await admin.auth.admin.deleteUser(created.user.id).catch(() => undefined);
      return json({ ok: false, error: 'failed' }, 500);
    }

    // Sign in as the visitor and hand the session to the page.
    const anon = createClient(SUPABASE_URL, ANON_KEY, { auth: { persistSession: false } });
    const { data: signIn, error: signErr } = await anon.auth.signInWithPassword({
      email: claim.email,
      password,
    });
    if (signErr || !signIn?.session) {
      console.error('[college-demo-try] sign-in failed', signErr?.message);
      return json({ ok: false, error: 'failed' }, 500);
    }

    return json({
      ok: true,
      display_name: claim.display_name,
      session_ends_at: claim.session_ends_at,
      session: {
        access_token: signIn.session.access_token,
        refresh_token: signIn.session.refresh_token,
      },
    });
  })
);
