/**
 * cleanup-zombie-user
 *
 * Deletes a "zombie" auth.users row created by Supabase when signUp() was called
 * but the password was rejected by HIBP (HaveIBeenPwned) breach check.
 *
 * Supabase creates the user FIRST then checks the password — if the password is
 * breached, the user row exists but is unconfirmed and unusable. This prevents
 * the user from re-registering with a different password.
 *
 * This function uses the service role key to delete unconfirmed zombie users
 * so they can retry signup.
 *
 * Safety: only deletes users who have NEVER confirmed their email.
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Same reply whatever happens: this runs before sign-in, so it must not
    // reveal whether an email is registered (it returned "No user found",
    // "confirmed", "too old" and the deleted user id until 7 Oct 2026).
    const done = () =>
      new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    // Look the email up across ALL users. The old lookup read only the first
    // page of listUsers (50 of ~1,800), so it almost never found anyone.
    const target = String(email).trim().toLowerCase();
    let zombieUser: { id: string; email?: string; email_confirmed_at?: string | null; created_at: string; last_sign_in_at?: string | null } | undefined;
    for (let page = 1; page <= 20 && !zombieUser; page++) {
      const { data, error: listError } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 1000 });
      if (listError) {
        console.error('[cleanup-zombie-user] listUsers error:', listError);
        return done();
      }
      zombieUser = data.users.find((u) => u.email?.toLowerCase() === target);
      if (data.users.length < 1000) break;
    }
    if (!zombieUser) return done();

    // A zombie is an account that never completed sign-up: email unconfirmed,
    // never signed in, created in the last 24 hours. Anything else is left
    // alone — anyone can call this, so it must never touch a real account.
    const hoursOld = (Date.now() - new Date(zombieUser.created_at).getTime()) / 3_600_000;
    if (zombieUser.email_confirmed_at || zombieUser.last_sign_in_at || hoursOld > 24) return done();

    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(zombieUser.id);
    if (deleteError) {
      console.error('[cleanup-zombie-user] deleteUser error:', deleteError);
      return done();
    }
    await supabaseAdmin.from('profiles').delete().eq('id', zombieUser.id);
    console.log('[cleanup-zombie-user] Deleted unfinished sign-up', zombieUser.id);
    return done();
  } catch (err) {
    await captureException(err, { functionName: 'cleanup-zombie-user', requestUrl: req.url, requestMethod: req.method });
    console.error('[cleanup-zombie-user] Error:', err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
