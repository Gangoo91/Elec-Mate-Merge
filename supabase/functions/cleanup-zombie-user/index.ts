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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Find the user by email using admin API
    const {
      data: { users },
      error: listError,
    } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1,
    });

    if (listError) {
      console.error('[cleanup-zombie-user] listUsers error:', listError);
      return new Response(JSON.stringify({ error: 'Failed to look up user' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // listUsers doesn't filter by email — need to use a different approach
    // Use the admin API to get user by email directly
    const { data: allUsers, error: fetchError } = await supabaseAdmin.auth.admin.listUsers();

    if (fetchError) {
      console.error('[cleanup-zombie-user] fetchError:', fetchError);
      return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const zombieUser = allUsers.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

    if (!zombieUser) {
      console.log('[cleanup-zombie-user] No user found for', email);
      return new Response(JSON.stringify({ success: true, message: 'No user found' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Safety check: only delete if email is NOT confirmed
    if (zombieUser.email_confirmed_at) {
      console.log('[cleanup-zombie-user] User has confirmed email — NOT deleting', email);
      return new Response(JSON.stringify({ error: 'User has confirmed email — cannot delete' }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Safety check: only delete if created recently (last 24 hours)
    const createdAt = new Date(zombieUser.created_at).getTime();
    const hoursOld = (Date.now() - createdAt) / (1000 * 60 * 60);

    if (hoursOld > 24) {
      console.log(
        '[cleanup-zombie-user] User too old to be a zombie:',
        hoursOld.toFixed(1),
        'hours'
      );
      return new Response(
        JSON.stringify({ error: 'User account is too old to be a zombie — contact support' }),
        {
          status: 409,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Delete the zombie user
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(zombieUser.id);

    if (deleteError) {
      console.error('[cleanup-zombie-user] deleteUser error:', deleteError);
      return new Response(JSON.stringify({ error: 'Failed to delete zombie user' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Also clean up any orphaned profile row
    await supabaseAdmin.from('profiles').delete().eq('id', zombieUser.id);

    console.log('[cleanup-zombie-user] Deleted zombie user:', zombieUser.id, email);

    return new Response(JSON.stringify({ success: true, deletedUserId: zombieUser.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[cleanup-zombie-user] Error:', err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
