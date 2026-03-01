/**
 * Calendar Get Feed URL
 * Returns (or generates) the user's iCal subscription URL.
 * This URL can be pasted into any calendar app to subscribe.
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new ValidationError('Authorization header required');
    }

    const userClient = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: authError,
    } = await userClient.auth.getUser();
    if (authError || !user) {
      throw new ValidationError('Authentication required');
    }

    const supabase = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    // Check if user already has a feed token
    const { data: profile } = await supabase
      .from('profiles')
      .select('ical_feed_token')
      .eq('id', user.id)
      .single();

    let token = profile?.ical_feed_token;

    // Generate one if not exists
    if (!token) {
      token = crypto.randomUUID();
      await supabase.from('profiles').update({ ical_feed_token: token }).eq('id', user.id);
    }

    const feedUrl = `${SUPABASE_URL}/functions/v1/calendar-ical-feed?token=${token}`;

    return new Response(JSON.stringify({ feedUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return handleError(error);
  }
});
