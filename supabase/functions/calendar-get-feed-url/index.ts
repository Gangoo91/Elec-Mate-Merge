/**
 * Calendar Get Feed URL
 * Returns (or generates) the user's iCal subscription URL.
 * This URL can be pasted into any calendar app to subscribe.
 */

import { serve, corsHeaders, createClient } from '../_shared/deps.ts';
import { handleError, ValidationError } from '../_shared/errors.ts';
import { captureException } from '../_shared/sentry.ts';

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

    // Feed tokens live in calendar_feed_tokens (service role only). They used
    // to sit on profiles, which every signed-in user can read.
    const { data: existing } = await supabase
      .from('calendar_feed_tokens')
      .select('token')
      .eq('user_id', user.id)
      .maybeSingle();

    let token = existing?.token as string | undefined;

    if (!token) {
      token = crypto.randomUUID();
      const { error: insertError } = await supabase
        .from('calendar_feed_tokens')
        .insert({ user_id: user.id, token });
      if (insertError) {
        // Lost a race with another tab: read the winner's token.
        const { data: again } = await supabase
          .from('calendar_feed_tokens')
          .select('token')
          .eq('user_id', user.id)
          .maybeSingle();
        if (!again?.token) throw insertError;
        token = again.token as string;
      }
    }

    const feedUrl = `${SUPABASE_URL}/functions/v1/calendar-ical-feed?token=${token}`;

    return new Response(JSON.stringify({ feedUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    await captureException(error, { functionName: 'calendar-get-feed-url', requestUrl: req.url, requestMethod: req.method });
    return handleError(error);
  }
});
