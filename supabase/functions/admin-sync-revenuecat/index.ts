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

    // ========================================================================
    // Phase 1 — RC → DB reconciliation
    // List all RC customers for the project (paginated), pick the ones with
    // active or trialing subscriptions, and upsert matching Supabase profiles.
    // This catches brand-new mobile subscribers whose profile hasn't been
    // flagged as subscribed yet.
    // ========================================================================
    const rcHeaders = {
      Authorization: `Bearer ${rcApiKey}`,
      'Content-Type': 'application/json',
    };
    const PROJECT_ID = 'proj5dd5e597';

    interface RCCustomer {
      id: string;
      object: string;
    }
    interface RCCustomerPage {
      items?: RCCustomer[];
      next_page?: string | null;
    }

    // Pull every customer in the project
    const rcCustomers: RCCustomer[] = [];
    let nextCursor: string | null = null;
    let pageCount = 0;
    const MAX_PAGES = 20; // hard cap — 20 × 100 = 2k customers, plenty for now

    do {
      const url = new URL(`https://api.revenuecat.com/v2/projects/${PROJECT_ID}/customers`);
      url.searchParams.set('limit', '100');
      if (nextCursor) url.searchParams.set('starting_after', nextCursor);

      const res = await fetch(url.toString(), { headers: rcHeaders });
      if (!res.ok) {
        console.warn(`RC customers page ${pageCount} failed: ${res.status} ${await res.text()}`);
        break;
      }
      const page: RCCustomerPage = await res.json();
      rcCustomers.push(...(page.items || []));
      nextCursor = page.next_page
        ? new URL(page.next_page).searchParams.get('starting_after')
        : null;
      pageCount++;
    } while (nextCursor && pageCount < MAX_PAGES);

    console.log(`Pulled ${rcCustomers.length} RC customers across ${pageCount} page(s)`);

    // For each RC customer, fetch subs and reconcile if they have an active or trialing one
    interface ReconcileDetail {
      user: string;
      change: string;
    }
    const reconcileDetails: ReconcileDetail[] = [];
    let reconcileUpdated = 0;
    let reconcileAdded = 0;

    // Process in batches of 5
    const RECONCILE_BATCH = 5;
    for (let i = 0; i < rcCustomers.length; i += RECONCILE_BATCH) {
      const batch = rcCustomers.slice(i, i + RECONCILE_BATCH);

      await Promise.allSettled(
        batch.map(async (customer) => {
          const customerId = customer.id;
          // app_user_id (in RC) is the Supabase auth user UUID — skip anonymous
          if (!customerId || customerId.startsWith('$RCAnonymousID')) return;

          const subsRes = await fetchRCSubscriptions(customerId, rcApiKey);
          if (!subsRes || !subsRes.items || subsRes.items.length === 0) return;

          // Find the most relevant subscription
          const sorted = [...subsRes.items].sort((a, b) => {
            const priority: Record<string, number> = { active: 0, trialing: 1, expired: 2 };
            return (priority[a.status] ?? 3) - (priority[b.status] ?? 3);
          });
          const rcSub = sorted[0];
          if (!['active', 'trialing'].includes(rcSub.status)) return;

          // Look up profile
          const { data: existingProfile } = await supabaseAdmin
            .from('profiles')
            .select(
              'id, full_name, subscribed, is_trial, trial_end, subscription_source, is_trial_cancelled, free_access_granted'
            )
            .eq('id', customerId)
            .maybeSingle();

          if (!existingProfile) {
            // RC customer has no matching Supabase profile — nothing to update
            return;
          }

          // Never touch free-access comp accounts — they stay on free forever
          if (existingProfile.free_access_granted) return;

          const userName = existingProfile.full_name || customerId.slice(0, 8);
          const isTrialing = rcSub.status === 'trialing';
          const updates: Record<string, unknown> = {};

          // Ensure subscribed=true
          if (!existingProfile.subscribed) {
            updates.subscribed = true;
          }
          // Set subscription source to app_store if not already mobile
          if (
            existingProfile.subscription_source !== 'app_store' &&
            existingProfile.subscription_source !== 'play_store'
          ) {
            updates.subscription_source = 'app_store';
          }
          // Reconcile trial flags
          if (isTrialing && !existingProfile.is_trial) {
            updates.is_trial = true;
            if (rcSub.current_period_ends_at) {
              updates.trial_end = rcSub.current_period_ends_at;
            }
          }
          if (!isTrialing && existingProfile.is_trial) {
            updates.is_trial = false;
            updates.trial_end = null;
          }
          // Clear stale cancelled flag
          if (existingProfile.is_trial_cancelled) {
            updates.is_trial_cancelled = false;
          }

          if (Object.keys(updates).length === 0) return;

          const { error } = await supabaseAdmin
            .from('profiles')
            .update(updates)
            .eq('id', customerId);

          if (error) {
            console.warn(`Failed to reconcile ${customerId}:`, error.message);
            return;
          }

          const wasSubscribed = existingProfile.subscribed;
          if (!wasSubscribed) {
            reconcileAdded++;
            reconcileDetails.push({
              user: userName,
              change: `NEW mobile sub (${rcSub.status}) → marked subscribed`,
            });
          } else {
            reconcileUpdated++;
            reconcileDetails.push({
              user: userName,
              change: `${rcSub.status} → updated ${Object.keys(updates).join(', ')}`,
            });
          }
        })
      );
    }

    // ========================================================================
    // Phase 2 — DB-side sweep
    // For users already flagged as mobile subscribers, double-check their
    // current RC state and apply the legacy transitions (trial→active,
    // active→expired, etc.)
    // ========================================================================
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

    const BATCH_SIZE = 5;
    for (let i = 0; i < allSubscribers.length; i += BATCH_SIZE) {
      const batch = allSubscribers.slice(i, i + BATCH_SIZE);
      const { updated, details } = await processBatch(batch, rcApiKey, supabaseAdmin);
      totalUpdated += updated;
      allDetails.push(...details);
    }

    // ========================================================================
    // Phase 3 — Stale profile downgrade
    // For every profile currently flagged as a paying/trialing mobile sub,
    // check if RC still has an active/trialing subscription for them. If not,
    // flip subscribed=false and clear trial flags. Skips free-access comps.
    // ========================================================================
    const { data: staleCandidates } = await supabaseAdmin
      .from('profiles')
      .select('id, full_name, subscribed, is_trial, trial_end, free_access_granted')
      .or('subscription_source.eq.app_store,subscription_source.eq.play_store')
      .eq('subscribed', true);

    let downgraded = 0;
    const downgradeDetails: SyncDetail[] = [];
    const STALE_BATCH = 5;

    if (staleCandidates && staleCandidates.length > 0) {
      for (let i = 0; i < staleCandidates.length; i += STALE_BATCH) {
        const batch = staleCandidates.slice(i, i + STALE_BATCH);
        await Promise.allSettled(
          batch.map(async (sub) => {
            if (sub.free_access_granted) return;

            const subsRes = await fetchRCSubscriptions(sub.id, rcApiKey);
            const items = subsRes?.items || [];
            const hasActive = items.some((s) => s.status === 'active' || s.status === 'trialing');

            if (hasActive) return;

            // RC says not active — downgrade
            const { error } = await supabaseAdmin
              .from('profiles')
              .update({ subscribed: false, is_trial: false, trial_end: null })
              .eq('id', sub.id);

            if (!error) {
              downgraded++;
              downgradeDetails.push({
                user: sub.full_name || sub.id.slice(0, 8),
                change: 'no active RC sub → downgraded',
              });
            }
          })
        );
      }
    }

    const combinedUpdated = totalUpdated + reconcileUpdated + reconcileAdded + downgraded;
    const combinedDetails = [...reconcileDetails, ...allDetails, ...downgradeDetails];

    return new Response(
      JSON.stringify({
        rcCustomersScanned: rcCustomers.length,
        rcReconcileAdded: reconcileAdded,
        rcReconcileUpdated: reconcileUpdated,
        staleDowngraded: downgraded,
        synced: allSubscribers.length,
        updated: combinedUpdated,
        details: combinedDetails,
        message: `Scanned ${rcCustomers.length} RC customers · +${reconcileAdded} new · ~${reconcileUpdated} updated · −${downgraded} downgraded · ${totalUpdated} transitioned`,
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
