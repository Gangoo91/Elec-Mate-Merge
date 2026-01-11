// Send Push Notification Edge Function
// Sends web push notifications to users for new messages
import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PushPayload {
  userId: string;
  title: string;
  body: string;
  type: 'peer' | 'job' | 'team' | 'college' | 'quote' | 'invoice' | 'application' | 'vacancy' | 'certificate';
  data?: {
    conversationId?: string;
    channelId?: string;
    dmId?: string;
    senderId?: string;
    senderName?: string;
    // Business event data
    quoteId?: string;
    invoiceId?: string;
    applicationId?: string;
    vacancyId?: string;
    certificateId?: string;
    status?: string;
  };
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const payload: PushPayload = await req.json();
    const { userId, title, body, type, data } = payload;

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'userId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user's push subscriptions
    const { data: subscriptions, error: subError } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true);

    if (subError) {
      console.error('Error fetching subscriptions:', subError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch subscriptions' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!subscriptions || subscriptions.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No active subscriptions found', sent: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // VAPID keys from environment
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY');
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY');

    if (!vapidPublicKey || !vapidPrivateKey) {
      console.error('VAPID keys not configured');
      return new Response(
        JSON.stringify({ error: 'Push notifications not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build notification payload
    const notificationPayload = JSON.stringify({
      title,
      body,
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      tag: `${type}-${data?.conversationId || Date.now()}`,
      type,
      data: {
        type,
        ...data,
      },
    });

    let sentCount = 0;
    const errors: string[] = [];

    // Send to each subscription
    for (const subscription of subscriptions) {
      try {
        // Construct push subscription object from stored data
        const pushSubscription = {
          endpoint: subscription.endpoint,
          keys: subscription.keys,
        };

        // Use web-push library via URL import
        const webpush = await import('https://esm.sh/web-push@3.6.7');

        webpush.setVapidDetails(
          'mailto:support@elec-mate.co.uk',
          vapidPublicKey,
          vapidPrivateKey
        );

        await webpush.sendNotification(pushSubscription, notificationPayload);
        sentCount++;
      } catch (pushError: any) {
        console.error('Push error for subscription:', subscription.id, pushError);
        errors.push(`Subscription ${subscription.id}: ${pushError.message}`);

        // If subscription is expired/invalid, mark as inactive
        if (pushError.statusCode === 410 || pushError.statusCode === 404) {
          await supabase
            .from('push_subscriptions')
            .update({ is_active: false })
            .eq('id', subscription.id);
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        sent: sentCount,
        total: subscriptions.length,
        errors: errors.length > 0 ? errors : undefined,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Push notification error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
