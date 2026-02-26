import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      });
    }

    // Verify the user is who they say they are
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      });
    }

    // Get their profile to find Stripe customer ID
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('stripe_customer_id, subscription_tier, full_name')
      .eq('id', user.id)
      .single();

    // Cancel Stripe subscription if they have one
    if (profile?.stripe_customer_id) {
      try {
        const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
        if (stripeKey) {
          // List and cancel active subscriptions
          const listRes = await fetch(
            `https://api.stripe.com/v1/subscriptions?customer=${profile.stripe_customer_id}&status=active`,
            {
              headers: {
                Authorization: `Bearer ${stripeKey}`,
              },
            }
          );
          const subscriptions = await listRes.json();

          for (const sub of subscriptions?.data ?? []) {
            await fetch(`https://api.stripe.com/v1/subscriptions/${sub.id}/cancel`, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${stripeKey}`,
              },
            });
            console.log(`Cancelled Stripe subscription ${sub.id} for user ${user.id}`);
          }
        }
      } catch (stripeErr) {
        // Log but don't block deletion — user still needs to be deleted
        console.error('Stripe cancellation error (non-fatal):', stripeErr);
      }
    }

    // Create admin client to delete the auth user
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Delete the auth user — cascades to profile and all user data via FK constraints
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);

    if (deleteError) {
      console.error('Error deleting user:', deleteError);
      return new Response(JSON.stringify({ error: 'Failed to delete account. Please try again.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    console.log(`User ${user.id} (${profile?.full_name ?? user.email}) deleted their own account`);

    return new Response(
      JSON.stringify({ success: true, message: 'Account deleted successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Unexpected error in delete-own-account:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
