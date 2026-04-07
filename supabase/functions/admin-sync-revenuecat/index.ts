import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

interface RCSubscription {
  status: string;
  gives_access: boolean;
  current_period_ends_at: string | null;
}

interface RCSubscriptionsResponse {
  items: RCSubscription[];
}

interface SyncDetail {
  user: string;
  change: string;
}

/** Fetch RC subscriptions for a single user, returns null on failure */
async function fetchRCSubscriptions(
  userId: string,
  rcApiKey: string
): Promise<RCSubscriptionsResponse | null> {
  try {
    const res = await fetch(
      `https://api.revenuecat.com/v2/projects/proj5dd5e597/customers/${userId}/subscriptions`,
      {
        headers: {
          Authorization: `Bearer ${rcApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!res.ok) {
      console.warn(`RC API ${res.status} for user ${userId}: ${await res.text()}`);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.warn(`RC API error for user ${userId}:`, e);
    return null;
  }
}

/** Process a batch of subscribers concurrently */
async function processBatch(
  batch: Array<{
    id: string;
    full_name: string;
    subscription_source: string;
    subscribed: boolean;
    is_trial: boolean;
    trial_end: string | null;
    is_trial_cancelled: boolean;
  }>,
  rcApiKey: string,
  supabaseAdmin: ReturnType<typeof createClient>
): Promise<{ updated: number; details: SyncDetail[] }> {
  let updated = 0;
  const details: SyncDetail[] = [];

  const results = await Promise.allSettled(
    batch.map(async (sub) => {
      const rcData = await fetchRCSubscriptions(sub.id, rcApiKey);
      if (!rcData || !rcData.items || rcData.items.length === 0) return;

      // Find the most relevant subscription (prefer active/trialing over expired)
      const sorted = [...rcData.items].sort((a, b) => {
        const priority: Record<string, number> = { active: 0, trialing: 1, expired: 2 };
        return (priority[a.status] ?? 3) - (priority[b.status] ?? 3);
      });
      const rcSub = sorted[0];
      const userName = sub.full_name || sub.id.slice(0, 8);

      // Case 1: RC says trialing but Supabase has is_trial=false
      if (rcSub.status === 'trialing' && !sub.is_trial) {
        const updateData: Record<string, unknown> = { is_trial: true };
        if (rcSub.current_period_ends_at) {
          updateData.trial_end = rcSub.current_period_ends_at;
        }
        const { error } = await supabaseAdmin.from('profiles').update(updateData).eq('id', sub.id);
        if (!error) {
          updated++;
          details.push({ user: userName, change: 'trialing → set is_trial=true' });
        } else {
          console.warn(`Failed to update ${sub.id}:`, error.message);
        }
        return;
      }

      // Case 2: RC says expired and no access
      if (rcSub.status === 'expired' && !rcSub.gives_access) {
        const { error } = await supabaseAdmin
          .from('profiles')
          .update({ subscribed: false, is_trial: false, is_trial_cancelled: true })
          .eq('id', sub.id);
        if (!error) {
          updated++;
          details.push({ user: userName, change: 'expired → set subscribed=false' });
        } else {
          console.warn(`Failed to update ${sub.id}:`, error.message);
        }
        return;
      }

      // Case 3: RC says active (paid) but Supabase still has is_trial=true
      if (rcSub.status === 'active' && sub.is_trial) {
        const { error } = await supabaseAdmin
          .from('profiles')
          .update({ is_trial: false, trial_end: null })
          .eq('id', sub.id);
        if (!error) {
          updated++;
          details.push({ user: userName, change: 'active → cleared trial flags' });
        } else {
          console.warn(`Failed to update ${sub.id}:`, error.message);
        }
        return;
      }
    })
  );

  // Log any rejected promises (shouldn't happen with inner try/catch but just in case)
  for (const result of results) {
    if (result.status === 'rejected') {
      console.warn('Batch item rejected:', result.reason);
    }
  }

  return { updated, details };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Verify admin — same pattern as admin-revenuecat-stats
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('No authorization header');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Unauthorised');

    const { data: profile } = await supabase
      .from('profiles')
      .select('admin_role')
      .eq('id', user.id)
      .single();

    if (!profile || !['super_admin', 'admin'].includes(profile.admin_role)) {
      throw new Error('Admin access required');
    }

    // Use service role for writes
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const rcApiKey = Deno.env.get('REVENUECAT_API_V2_KEY');
    if (!rcApiKey) throw new Error('REVENUECAT_API_V2_KEY not set');

    // Fetch all mobile subscribers
    const { data: subscribers, error: subErr } = await supabaseAdmin
      .from('profiles')
      .select(
        'id, full_name, subscription_source, subscribed, is_trial, trial_end, is_trial_cancelled'
      )
      .or('subscription_source.eq.app_store,subscription_source.eq.play_store')
      .eq('subscribed', true);

    if (subErr) throw new Error(`DB error: ${subErr.message}`);

    const allSubscribers = subscribers || [];
    let totalUpdated = 0;
    const allDetails: SyncDetail[] = [];

    // Process in batches of 5 to avoid RC rate limits
    const BATCH_SIZE = 5;
    for (let i = 0; i < allSubscribers.length; i += BATCH_SIZE) {
      const batch = allSubscribers.slice(i, i + BATCH_SIZE);
      const { updated, details } = await processBatch(batch, rcApiKey, supabaseAdmin);
      totalUpdated += updated;
      allDetails.push(...details);
    }

    return new Response(
      JSON.stringify({
        synced: allSubscribers.length,
        updated: totalUpdated,
        details: allDetails,
        message: `Synced ${allSubscribers.length} subscribers, updated ${totalUpdated}`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
