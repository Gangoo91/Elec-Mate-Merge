/**
 * Agent Create Calendar Event
 * MCP tool: Create a calendar event on behalf of the user via Business AI agent
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

    const body = await req.json();
    const { title, start_at, end_at, all_day, location, event_type, description, notes } = body;

    if (!title || !start_at || !end_at) {
      throw new ValidationError('title, start_at, and end_at are required');
    }

    const validTypes = ['job', 'site_visit', 'inspection', 'meeting', 'personal', 'general'];
    const type = validTypes.includes(event_type) ? event_type : 'general';

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

    // Check if Google connected for sync status
    const { data: tokenData } = await supabase
      .from('google_calendar_tokens')
      .select('sync_enabled')
      .eq('user_id', user.id)
      .maybeSingle();

    const syncStatus = tokenData?.sync_enabled ? 'pending_push' : 'local_only';

    const colourMap: Record<string, string> = {
      job: '#F59E0B',
      site_visit: '#10B981',
      inspection: '#8B5CF6',
      meeting: '#3B82F6',
      personal: '#EC4899',
      general: '#6B7280',
    };

    const { data: event, error } = await supabase
      .from('calendar_events')
      .insert({
        user_id: user.id,
        title,
        description: description || null,
        start_at,
        end_at,
        all_day: all_day ?? false,
        location: location || null,
        event_type: type,
        colour: colourMap[type] || '#3B82F6',
        sync_status: syncStatus,
        notes: notes || null,
        reminder_minutes: 30,
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ event }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return handleError(error);
  }
});
