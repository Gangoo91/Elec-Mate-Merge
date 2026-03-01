/**
 * Calendar Get Status
 * Returns Google Calendar connection status for the authenticated user
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

    // Query token metadata (RLS allows user to see their own)
    const { data: tokenData } = await supabase
      .from('google_calendar_tokens')
      .select('google_email, sync_enabled, last_sync_at')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!tokenData) {
      return new Response(
        JSON.stringify({
          connected: false,
          syncEnabled: false,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        connected: true,
        email: tokenData.google_email,
        lastSyncAt: tokenData.last_sync_at,
        syncEnabled: tokenData.sync_enabled,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});
