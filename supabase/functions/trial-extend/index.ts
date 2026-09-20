// trial-extend — one extra week, once, for a trialist who was active but
// has not made anything yet.
//
// Why (retention plan, 20 Sep 2026): 13 of September's 34 web trial
// cancellers left at the end of the trial having used it — engaged, then
// "no" at the moment of payment. A seven-day trial often contains no real
// job; one more week usually does. The receipt email offers this to anyone
// active who has not made a document; the Subscriptions page calls it when
// it sees ?extend=1.
//
// Rules: caller must own a TRIALING Stripe subscription; extension is once
// per subscription (metadata.trial_extended); the new trial_end is 7 days
// after the current one (or after now, if it already passed by a few hours).
// profiles.trial_end is updated so the app and the reminders agree.
import { serve } from '../_shared/deps.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};
const EXTRA_DAYS = 7;

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
      .select('stripe_customer_id, is_trial')
      .eq('id', user.id)
      .maybeSingle();

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });
    const customerIds = new Set<string>();
    if (profile?.stripe_customer_id) customerIds.add(profile.stripe_customer_id);
    if (user.email) {
      const found = await stripe.customers.list({ email: user.email, limit: 5 });
      for (const c of found.data) customerIds.add(c.id);
    }

    let target: Stripe.Subscription | null = null;
    for (const cid of customerIds) {
      const subs = await stripe.subscriptions.list({ customer: cid, status: 'trialing', limit: 5 });
      if (subs.data.length) {
        target = subs.data[0];
        break;
      }
    }
    if (!target) return json({ error: 'no_trial', message: 'No trial to extend.' }, 404);
    if (target.metadata?.trial_extended === '1') {
      return json(
        { error: 'already_extended', message: 'This trial has already had its extra week.' },
        409
      );
    }

    const base = Math.max(target.trial_end ?? 0, Math.floor(Date.now() / 1000));
    const newEnd = base + EXTRA_DAYS * 86_400;
    const updated = await stripe.subscriptions.update(target.id, {
      trial_end: newEnd,
      proration_behavior: 'none',
      metadata: {
        ...target.metadata,
        trial_extended: '1',
        trial_extended_at: new Date().toISOString(),
      },
    });
    const iso = new Date(newEnd * 1000).toISOString();
    await admin
      .from('profiles')
      .update({ trial_end: iso, updated_at: new Date().toISOString() })
      .eq('id', user.id);
    await admin
      .from('trial_emails_sent')
      .insert({ user_id: user.id, email_type: 'trial_extended' });
    // The promise is "we email you the day before any charge". The trial-ending
    // receipt is guarded by its trial_emails_sent row, so clear it: the new
    // trial_end needs its own day-before email, not the one from last week.
    await admin
      .from('trial_emails_sent')
      .delete()
      .eq('user_id', user.id)
      .eq('email_type', 'receipt_48h');

    return json({ success: true, subscription: updated.id, trial_end: iso });
  } catch (error) {
    await captureException(error, {
      functionName: 'trial-extend',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return json({ error: error instanceof Error ? error.message : 'extend failed' }, 500);
  }
});
