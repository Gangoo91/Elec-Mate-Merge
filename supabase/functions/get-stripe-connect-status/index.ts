/**
 * Get Stripe Connect Status
 * Checks if electrician's Stripe account is ready for payments
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { captureException } from '../_shared/sentry.ts';

// Imported rather than inlined. The local copy had drifted: it was missing
// `x-supabase-timeout`, and a preflight carrying a header the function does not
// allow fails the whole request before it runs (the ai-apprentice-today failure,
// 2026-06-12). One definition means it cannot drift again.
import { corsHeaders } from '../_shared/cors.ts';
import { isAccountUnreachable } from '../_shared/stripe-connect.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
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
      throw new Error('Unauthorized');
    }

    // Get profile with Stripe account ID
    const { data: profile } = await supabase
      .from('company_profiles')
      .select('stripe_account_id, stripe_account_status')
      .eq('user_id', user.id)
      .single();

    if (!profile?.stripe_account_id) {
      return new Response(
        JSON.stringify({
          connected: false,
          status: 'not_connected',
          chargesEnabled: false,
          payoutsEnabled: false,
          detailsSubmitted: false,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Stripe
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2023-10-16' });

    // Retrieve account from Stripe.
    //
    // ⚠️ An account we hold an id for can stop being reachable: the user
    // revokes our app's access from their Stripe dashboard, or the account is
    // deleted. Stripe then answers `accounts.retrieve` with a permission error,
    // and before this was handled the throw fell through to the generic catch
    // below, which returned a 500 carrying Stripe's raw message.
    //
    // Two things went wrong at once. The Connect settings page showed an error
    // instead of a "connect" button, so the user could not reconnect; and
    // `stripe_account_status` stayed `'active'` in our database, which is what
    // `send-invoice-resend` checks before offering card payment on an invoice.
    // We would have kept sending invoices inviting a card payment that could
    // never be taken.
    //
    // A revoked account is not an error condition — it is the disconnected
    // state, and is recorded as such.
    let account: Stripe.Account;
    try {
      account = await stripe.accounts.retrieve(profile.stripe_account_id);
    } catch (stripeError) {
      if (!isAccountUnreachable(stripeError)) throw stripeError;

      // Same shape the manual disconnect writes (financeService, and the
      // settings page), so every reader agrees this account is gone.
      const { error: clearError } = await supabase
        .from('company_profiles')
        .update({ stripe_account_id: null, stripe_account_status: null })
        .eq('user_id', user.id);

      if (clearError) {
        // Worth shouting about. If the row keeps saying `'active'`, the invoice
        // sender goes on offering a card payment that cannot be taken, and the
        // user is told they are disconnected by a page that cannot make it so.
        console.error(
          `❌ Could not clear unreachable Stripe account for user ${user.id}:`,
          clearError
        );
        await captureException(clearError, {
          functionName: 'get-stripe-connect-status',
          requestUrl: req.url,
          requestMethod: req.method,
        });
      } else {
        console.warn(
          `⚠️ Stripe account ${profile.stripe_account_id} is unreachable (access revoked or deleted) — cleared for user ${user.id}`
        );
      }

      return new Response(
        JSON.stringify({
          connected: false,
          status: 'not_connected',
          chargesEnabled: false,
          payoutsEnabled: false,
          detailsSubmitted: false,
          disconnectedReason: 'access_revoked',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Determine status
    let status = 'pending';
    if (account.charges_enabled && account.payouts_enabled) {
      status = 'active';
    } else if (account.requirements?.disabled_reason) {
      status = 'restricted';
    }

    // Update status in database if changed
    if (status !== profile.stripe_account_status) {
      await supabase
        .from('company_profiles')
        .update({ stripe_account_status: status })
        .eq('user_id', user.id);
    }

    return new Response(
      JSON.stringify({
        connected: true,
        status,
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled,
        detailsSubmitted: account.details_submitted,
        accountId: profile.stripe_account_id,
        requirements: account.requirements?.currently_due || [],
        disabledReason: account.requirements?.disabled_reason || null,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    await captureException(error, { functionName: 'get-stripe-connect-status', requestUrl: req.url, requestMethod: req.method });
    console.error('❌ Error getting Stripe Connect status:', error);
    // ⚠️ Never return Stripe's message to the browser. Its permission errors
    // quote the API key that was used — masked, but it is still our live key
    // in a response body and in any client-side log that captures it.
    return new Response(
      JSON.stringify({ error: 'Could not check your Stripe connection. Please try again.' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
