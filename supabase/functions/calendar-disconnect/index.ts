/**
 * Calendar Disconnect
 * Removes Google Calendar connection and resets event sync statuses
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { captureException } from '../_shared/sentry.ts';

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

    // Which provider? Default google (original behaviour).
    const body = await req.json().catch(() => ({}) as Record<string, unknown>);
    const provider = body?.provider === 'outlook' ? 'outlook' : 'google';

    // Delete tokens
    const { error: deleteError } = await serviceClient
      .from(provider === 'outlook' ? 'outlook_calendar_tokens' : 'google_calendar_tokens')
      .delete()
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Failed to delete calendar tokens:', deleteError);
      throw new Error('Failed to disconnect');
    }

    // Clear that provider's linkage. Only downgrade sync_status when the
    // OTHER provider isn't holding the event.
    if (provider === 'outlook') {
      await serviceClient
        .from('calendar_events')
        .update({ outlook_event_id: null, outlook_change_key: null })
        .eq('user_id', user.id)
        .not('outlook_event_id', 'is', null);
      await serviceClient
        .from('calendar_events')
        .update({ sync_status: 'local_only', last_synced_at: null })
        .eq('user_id', user.id)
        .is('google_event_id', null)
        .neq('sync_status', 'local_only');
    } else {
      await serviceClient
        .from('calendar_events')
        .update({ google_event_id: null, google_calendar_id: null, google_etag: null })
        .eq('user_id', user.id)
        .not('google_event_id', 'is', null);
      await serviceClient
        .from('calendar_events')
        .update({ sync_status: 'local_only', last_synced_at: null })
        .eq('user_id', user.id)
        .is('outlook_event_id', null)
        .neq('sync_status', 'local_only');
    }

    console.log(`✅ Calendar disconnected for user ${user.id}`);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, { functionName: 'calendar-disconnect', requestUrl: req.url, requestMethod: req.method });
    return handleError(error);
  }
});
