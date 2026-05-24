/**
 * dev-fire-test-push
 * ───────────────────────────────────────────────────────────────────────
 * One-off helper to fire a sample push to a whitelisted user for visual
 * preview purposes. Allowlists the founder's user_id only so this can't
 * be used as an open relay if the URL leaks. Delete after testing.
 */

import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

const ALLOWED_USER_IDS = new Set([
  'b0113c59-8611-4c5e-8503-1797a75bb64f', // andrewgangoo91@gmail.com
]);

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = await req.json();
    const {
      userId,
      title,
      body: pushBody,
      type = 'default',
      data = {},
    } = body ?? {};

    if (!userId || !ALLOWED_USER_IDS.has(userId)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'userId not in allow-list' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (!title || !pushBody) {
      return new Response(
        JSON.stringify({ ok: false, error: 'title and body are required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Invoke send-push-notification using service role
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: pushResult, error: pushErr } = await supabase.functions.invoke(
      'send-push-notification',
      {
        body: { userId, title, body: pushBody, type, data },
      }
    );

    if (pushErr) {
      return new Response(
        JSON.stringify({ ok: false, error: pushErr.message }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ ok: true, sent_to: userId, title, body: pushBody, push_result: pushResult }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
