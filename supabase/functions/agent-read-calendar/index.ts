/**
 * Agent Read Calendar
 * MCP tool: Query calendar events by date range for the Business AI agent
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

    const { dateFrom, dateTo } = await req.json();
    if (!dateFrom || !dateTo) {
      throw new ValidationError('dateFrom and dateTo are required');
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

    const { data: events, error } = await supabase
      .from('calendar_events')
      .select('id, title, description, start_at, end_at, all_day, location, event_type, notes')
      .eq('user_id', user.id)
      .gte('start_at', dateFrom)
      .lte('start_at', dateTo)
      .order('start_at', { ascending: true });

    if (error) throw error;

    return new Response(JSON.stringify({ events: events ?? [] }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return handleError(error);
  }
});
