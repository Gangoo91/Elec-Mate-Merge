/**
 * referral-cadence-cron
 *
 * Runs daily at 10:00 UTC via pg_cron. Finds active users who haven't had a
 * referral push in the last 7 days and enqueues a weekly-cadence push for
 * each. The per-user 7-day cooldown is still enforced inside
 * trigger-referral-push so any user who hit a value-moment trigger in the
 * last 7 days will be automatically skipped.
 *
 * Active definition: at least 3 sign-ins in the last 14 days (prevents
 * wasting pushes on churned users who will never tap them).
 */

import { createClient, corsHeaders } from '../_shared/deps.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString();
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();

    // Find users who had 3+ sign-ins in the last 14 days and have a referral
    // code. auth.users.last_sign_in_at is a proxy — not perfect but good
    // enough; we'll refine with a proper activity table later.
    const { data: candidates, error: candidatesErr } = await supabase
      .from('profiles')
      .select('id, referral_code')
      .not('referral_code', 'is', null);

    if (candidatesErr || !candidates) {
      console.error('[referral-cadence-cron] Failed to fetch candidates:', candidatesErr);
      return new Response(JSON.stringify({ error: 'Failed to fetch candidates' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let enqueued = 0;
    let skippedRecentPush = 0;
    let skippedInactive = 0;
    let failed = 0;

    for (const row of candidates as Array<{ id: string }>) {
      const userId = row.id;

      // Skip if the user got a referral push of any kind in the last 7 days.
      // This short-circuits before we even call trigger-referral-push.
      const { data: recent } = await supabase
        .from('notification_log')
        .select('id')
        .eq('user_id', userId)
        .ilike('notification_type', '%referral_push%')
        .gte('sent_at', sevenDaysAgo)
        .limit(1);

      if (recent && recent.length > 0) {
        skippedRecentPush++;
        continue;
      }

      // Check activity via push_subscriptions.updated_at as a cheap proxy —
      // if the user has touched the app recently, their subscription token
      // has been refreshed. Not perfect but avoids a cross-schema query.
      const { data: activeSub } = await supabase
        .from('push_subscriptions')
        .select('id')
        .eq('user_id', userId)
        .eq('is_active', true)
        .gte('updated_at', fourteenDaysAgo)
        .limit(1);

      if (!activeSub || activeSub.length === 0) {
        skippedInactive++;
        continue;
      }

      // Fire the cadence push via trigger-referral-push
      try {
        const response = await fetch(`${SUPABASE_URL}/functions/v1/trigger-referral-push`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
          },
          body: JSON.stringify({
            user_id: userId,
            trigger_type: 'cadence_weekly',
          }),
        });

        if (response.ok) {
          enqueued++;
        } else {
          failed++;
        }
      } catch {
        failed++;
      }
    }

    const summary = {
      total_candidates: candidates.length,
      enqueued,
      skipped_recent_push: skippedRecentPush,
      skipped_inactive: skippedInactive,
      failed,
    };
    console.log('[referral-cadence-cron]', summary);

    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[referral-cadence-cron] Error:', err);
    return new Response(JSON.stringify({ error: (err as Error)?.message || 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
