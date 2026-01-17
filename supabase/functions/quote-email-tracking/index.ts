import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// 1x1 transparent GIF (smallest valid GIF)
const TRACKING_PIXEL = new Uint8Array([
  0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
  0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x2c,
  0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02,
  0x02, 0x44, 0x01, 0x00, 0x3b
]);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

const handler = async (req: Request): Promise<Response> => {
  console.log('📧 Quote Email Tracking | Started:', new Date().toISOString());

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow GET requests (tracking pixels are loaded via GET)
  if (req.method !== 'GET') {
    return new Response(TRACKING_PIXEL, {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'image/gif' },
    });
  }

  try {
    // Extract token from URL
    const url = new URL(req.url);
    const token = url.searchParams.get('t');
    const quoteId = url.searchParams.get('q');

    if (!token || !quoteId) {
      console.log('⚠️ Missing token or quoteId, returning pixel anyway');
      return new Response(TRACKING_PIXEL, {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'image/gif' },
      });
    }

    console.log(`📊 Tracking email open for quote: ${quoteId}, token: ${token.substring(0, 8)}...`);

    // Extract request info for analytics
    const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                      req.headers.get('x-real-ip') ||
                      'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Initialize Supabase with service role key (tracking needs elevated permissions)
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing Supabase credentials');
      return new Response(TRACKING_PIXEL, {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'image/gif' },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Update quote_views with email open tracking
    const { data: viewData, error: viewError } = await supabase
      .from('quote_views')
      .update({
        email_opened_at: new Date().toISOString(),
        email_open_count: supabase.rpc('increment_field', { row_id: token, field_name: 'email_open_count' }),
        last_viewed_at: new Date().toISOString(),
        view_count: supabase.rpc('increment_field', { row_id: token, field_name: 'view_count' }),
      })
      .eq('public_token', token)
      .eq('quote_id', quoteId)
      .select()
      .single();

    // If the compound update doesn't work, do it in parts
    if (viewError) {
      console.log('⚠️ Compound update failed, trying individual updates');

      // Get current values
      const { data: currentView } = await supabase
        .from('quote_views')
        .select('email_open_count, view_count, email_opened_at')
        .eq('public_token', token)
        .eq('quote_id', quoteId)
        .single();

      if (currentView) {
        // Update with incremented values
        const isFirstOpen = !currentView.email_opened_at;
        await supabase
          .from('quote_views')
          .update({
            email_opened_at: isFirstOpen ? new Date().toISOString() : currentView.email_opened_at,
            email_open_count: (currentView.email_open_count || 0) + 1,
            last_viewed_at: new Date().toISOString(),
            view_count: (currentView.view_count || 0) + 1,
          })
          .eq('public_token', token)
          .eq('quote_id', quoteId);

        console.log(`✅ Updated quote_views: opens=${(currentView.email_open_count || 0) + 1}, first_open=${isFirstOpen}`);
      }
    } else {
      console.log('✅ Quote view tracking updated');
    }

    // Record the email event
    const { error: eventError } = await supabase
      .from('quote_email_events')
      .insert({
        quote_id: quoteId,
        event_type: 'opened',
        event_data: {
          tracking_token: token,
          is_first_open: !viewData?.email_opened_at,
        },
        ip_address: ipAddress,
        user_agent: userAgent,
      });

    if (eventError) {
      console.warn('⚠️ Failed to record email event:', eventError);
    } else {
      console.log('✅ Email open event recorded');
    }

    // Create in-app notification for first opens
    const { data: quote } = await supabase
      .from('quotes')
      .select('user_id, quote_number, client_data')
      .eq('id', quoteId)
      .single();

    if (quote && !viewData?.email_opened_at) {
      const clientName = quote.client_data?.name || 'Client';

      // Create notification
      await supabase.from('ojt_notifications').insert({
        user_id: quote.user_id,
        type: 'quote_viewed',
        title: `Quote ${quote.quote_number} Viewed`,
        message: `${clientName} has opened your quote email`,
        data: {
          quote_id: quoteId,
          quote_number: quote.quote_number,
          client_name: clientName,
          viewed_at: new Date().toISOString(),
        },
        priority: 'normal',
        is_read: false,
      });

      console.log(`📬 Notification created for user ${quote.user_id}`);
    }

    console.log('✅ Email tracking complete');

  } catch (error) {
    console.error('❌ Tracking error:', error);
    // Always return the pixel even on error
  }

  // Always return the tracking pixel
  return new Response(TRACKING_PIXEL, {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'image/gif' },
  });
};

serve(handler);
