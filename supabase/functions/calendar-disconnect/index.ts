/**
 * Calendar Disconnect
 * Removes Google Calendar connection and resets event sync statuses
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new ValidationError('Authorization header required');
    }

    // Get user
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new ValidationError('Authentication required');
    }

    // Use service role for token deletion
    const serviceClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Delete tokens
    const { error: deleteError } = await serviceClient
      .from('google_calendar_tokens')
      .delete()
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Failed to delete calendar tokens:', deleteError);
      throw new Error('Failed to disconnect');
    }

    // Reset all events to local_only
    await serviceClient
      .from('calendar_events')
      .update({
        sync_status: 'local_only',
        google_event_id: null,
        google_calendar_id: null,
        google_etag: null,
        last_synced_at: null,
      })
      .eq('user_id', user.id)
      .neq('sync_status', 'local_only');

    console.log(`✅ Calendar disconnected for user ${user.id}`);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return handleError(error);
  }
});
