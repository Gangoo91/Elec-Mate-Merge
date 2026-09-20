// subscription-resume — turn renewal back on for the caller's own
// subscription that was set to cancel at period end.
//
// Why (retention plan, 20 Sep 2026): since cancel-subscription switched to
// cancel_at_period_end, a trialist who turns renewal off on day 0 keeps
// access to the end of the trial. The day-6 email says "you've still got
// the rest of the week, one tap turns it back on" — this is the tap. The
// Subscriptions page calls it when it sees ?resume=1, and the cancel modal
// can call it as an undo.
import { serve } from '../_shared/deps.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) throw new Error('STRIPE_SECRET_KEY is not set');
    const anon = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );
    const token = (req.headers.get('Authorization') ?? '').replace('Bearer ', '');
    const { data: userData, error: userError } = await anon.auth.getUser(token);
    if (userError || !userData.user) return json({ error: 'not_authenticated' }, 401);
    const user = userData.user;

    const admin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    const { data: profile } = await admin
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .maybeSingle();

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });
    const customerIds = new Set<string>();
    if (profile?.stripe_customer_id) customerIds.add(profile.stripe_customer_id);
    if (user.email) {
      const found = await stripe.customers.list({ email: user.email, limit: 5 });
      for (const c of found.data) customerIds.add(c.id);
    }

    const resumed: string[] = [];
    let periodEnd: number | null = null;
    for (const cid of customerIds) {
      const subs = await stripe.subscriptions.list({ customer: cid, status: 'all', limit: 10 });
      for (const s of subs.data) {
        if (['active', 'trialing'].includes(s.status) && s.cancel_at_period_end) {
          const u = await stripe.subscriptions.update(s.id, { cancel_at_period_end: false });
          resumed.push(u.id);
          if (periodEnd === null) {
            periodEnd = u.trial_end && u.status === 'trialing' ? u.trial_end : u.current_period_end;
          }
        }
      }
    }
    if (resumed.length === 0) {
      return json(
        {
          error: 'nothing_to_resume',
          message: 'Renewal is already on, or there is no subscription here.',
        },
        404
      );
    }
    await admin
      .from('trial_emails_sent')
      .upsert(
        { user_id: user.id, email_type: 'resumed', sent_at: new Date().toISOString() },
        { onConflict: 'user_id,email_type' }
      );
    // The cancel-flow row said "cancelled"; it is now a save. The Retention
    // page's save rate and the ask-why email both read this.
    await admin
      .from('cancel_survey_responses')
      .update({ outcome: 'stayed', outcome_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .eq('outcome', 'cancelled')
      .gte('created_at', new Date(Date.now() - 45 * 86_400_000).toISOString());
    return json({
      success: true,
      resumed,
      next_renewal: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    });
  } catch (error) {
    await captureException(error, {
      functionName: 'subscription-resume',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: error instanceof Error ? error.message : 'resume failed' }, 500);
  }
});
