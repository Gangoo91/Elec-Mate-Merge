/**
 * End-of-Day Prompt
 *
 * Runs via pg_cron at 5:30pm UTC weekdays.
 * For each user with agent_status='active' and eod_prompt_enabled:
 *   - Checks if user had calendar events today or sent messages to Mate today
 *   - If yes, sends a friendly EOD prompt via WhatsApp
 *   - If no activity, skips (don't nag on days off)
 *
 * Trigger: pg_cron schedule or manual POST
 * Auth: Service role (cron) or VPS API key (manual)
 */

import { createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError } from '../_shared/errors.ts';

const VPS_URL = Deno.env.get('VPS_MCP_URL') || 'http://89.167.69.251:3100';
const VPS_API_KEY = Deno.env.get('VPS_API_KEY') || '';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const now = new Date();
    const dayOfWeek = now.getDay();

    // Skip weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return new Response(JSON.stringify({ skipped: true, reason: 'weekend' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get all active agent users
    const { data: activeUsers, error: usersError } = await supabase
      .from('profiles')
      .select('id, full_name, agent_whatsapp_number, agent_status')
      .eq('agent_status', 'active')
      .eq('business_ai_enabled', true)
      .not('agent_whatsapp_number', 'is', null);

    if (usersError) throw new Error(`Failed to fetch active users: ${usersError.message}`);
    if (!activeUsers || activeUsers.length === 0) {
      return new Response(JSON.stringify({ sent: 0, reason: 'no_active_users' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check user preferences for EOD opt-out
    const userIds = activeUsers.map((u) => u.id);
    const { data: prefs } = await supabase
      .from('user_agent_preferences')
      .select('user_id, key, value')
      .in('user_id', userIds)
      .eq('key', 'eod_prompt_enabled');

    const disabledUsers = new Set(
      (prefs || []).filter((p) => p.value === 'false').map((p) => p.user_id)
    );

    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const todayEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59
    ).toISOString();

    const results: Array<{ user_id: string; sent: boolean; error?: string }> = [];

    for (const user of activeUsers) {
      if (disabledUsers.has(user.id)) {
        results.push({ user_id: user.id, sent: false, error: 'disabled_by_preference' });
        continue;
      }

      try {
        // Check if user had activity today
        const [calendarResult, activityResult] = await Promise.all([
          supabase
            .from('calendar_events')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .gte('start_time', todayStart)
            .lt('start_time', todayEnd),
          supabase
            .from('agent_action_log')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .gte('created_at', todayStart)
            .lt('created_at', todayEnd),
        ]);

        const hadActivity = (calendarResult.count || 0) > 0 || (activityResult.count || 0) > 0;

        if (!hadActivity) {
          results.push({ user_id: user.id, sent: false, error: 'no_activity_today' });
          continue;
        }

        const firstName = (user.full_name || 'mate').split(' ')[0];
        const message = `⚡ End of day ${firstName}! Quick log for today? Send a voice note or text with what you did, hours worked, and any materials used — I'll sort the rest.`;

        const sent = await sendWhatsApp(user.agent_whatsapp_number, message);
        results.push({ user_id: user.id, sent });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`Failed to send EOD prompt to ${user.id}: ${msg}`);
        results.push({ user_id: user.id, sent: false, error: msg });
      }
    }

    return new Response(
      JSON.stringify({
        sent: results.filter((r) => r.sent).length,
        total: results.length,
        results,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});

async function sendWhatsApp(target: string, message: string): Promise<boolean> {
  const response = await fetch(`${VPS_URL}/api/send-message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': VPS_API_KEY,
    },
    body: JSON.stringify({ target, message, channel: 'whatsapp' }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Send failed (${response.status}): ${errorText}`);
  }

  return true;
}
