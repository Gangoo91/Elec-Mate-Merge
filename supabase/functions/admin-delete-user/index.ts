import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Create Supabase client with user's token
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // Verify the caller is a super admin
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized: Could not get user');
    }

    const { data: callerProfile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('admin_role')
      .eq('id', user.id)
      .single();

    if (profileError || callerProfile?.admin_role !== 'super_admin') {
      throw new Error('Unauthorized: Super admin access required');
    }

    // Get the user ID to delete
    const { userId } = await req.json();
    if (!userId) {
      throw new Error('userId is required');
    }

    // Prevent deleting super admins
    const { data: targetProfile } = await supabaseClient
      .from('profiles')
      .select('admin_role, full_name')
      .eq('id', userId)
      .single();

    if (targetProfile?.admin_role === 'super_admin') {
      throw new Error('Cannot delete a super admin');
    }

    // Create admin client for deletion
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Clean up all NO ACTION FK references before deleting auth user
    const { error: cleanupError } = await supabaseAdmin.rpc('admin_cleanup_user_data', {
      target_id: userId,
    });

    if (cleanupError) {
      console.error('Error cleaning up user data:', cleanupError);
      throw new Error(`Failed to clean up user data: ${cleanupError.message}`);
    }

    // Now safe to delete from auth.users — all FK references cleared
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteError) {
      console.error('Error deleting user:', deleteError);
      throw new Error(`Failed to delete user: ${deleteError.message}`);
    }

    console.log(`User ${userId} (${targetProfile?.full_name}) deleted by super admin ${user.id}`);

    // Security audit log — best effort, non-fatal
    try {
      await supabaseAdmin.from('security_audit_log').insert({
        user_id: user.id, // the admin who performed the action
        action: 'admin_account_deletion',
        table_name: 'auth.users',
        record_id: userId, // the user who was deleted
        ip_address: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
        user_agent: req.headers.get('user-agent') ?? null,
      });
    } catch (auditErr) {
      console.warn('Non-fatal: could not write security audit log:', auditErr);
    }

    return new Response(JSON.stringify({ success: true, message: 'User deleted successfully' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in admin-delete-user:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
