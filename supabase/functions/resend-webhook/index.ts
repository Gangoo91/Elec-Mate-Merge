import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { captureException } from '../_shared/sentry.ts';

// CORS headers for webhook requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, svix-id, svix-timestamp, svix-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Webhook handler for Resend events
// Configure in Resend dashboard: https://resend.com/webhooks
// Handles events for both early_access_invites and founder_invites
// NOTE: This function must be deployed with --no-verify-jwt to allow Resend webhooks
Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const { type, data } = payload;

    console.log(`Resend webhook received: ${type}`, JSON.stringify(data));

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const emailId = data?.email_id;
    const toEmail = data?.to?.[0] || data?.email || null;
    const clickedLink = data?.click?.link || null;

    // Always log to email_tracking_events for campaign analytics
    if (emailId) {
      try {
        await supabaseAdmin.from('email_tracking_events').insert({
          email_id: emailId,
          user_email: toEmail,
          event_type: type,
          link_url: clickedLink,
          raw_payload: payload,
        });
        console.log(`Tracking event logged: ${type} for ${emailId}`);
      } catch (trackErr: unknown) {
        console.error(
          'Failed to log tracking event:',
          trackErr instanceof Error ? trackErr.message : String(trackErr)
        );
      }
    }

    if (!emailId) {
      console.log('No email_id in webhook payload');
      return new Response('OK', { status: 200, headers: corsHeaders });
    }

    // Try to find the invite in founder_invites first
    let invite: { id: string; opened_at?: string; clicked_at?: string } | null = null;
    let tableName: 'founder_invites' | 'early_access_invites' | null = null;

    const { data: founderInvite } = await supabaseAdmin
      .from('founder_invites')
      .select('id, opened_at, clicked_at')
      .eq('resend_email_id', emailId)
      .single();

    if (founderInvite) {
      invite = founderInvite;
      tableName = 'founder_invites';
      console.log(`Found invite in founder_invites: ${invite.id}`);
    } else {
      // Try early_access_invites
      const { data: earlyAccessInvite } = await supabaseAdmin
        .from('early_access_invites')
        .select('id, opened_at, clicked_at')
        .eq('resend_email_id', emailId)
        .single();

      if (earlyAccessInvite) {
        invite = earlyAccessInvite;
        tableName = 'early_access_invites';
        console.log(`Found invite in early_access_invites: ${invite.id}`);
      }
    }

    // Handle invite-based tracking (founder_invites / early_access_invites)
    if (invite && tableName) {
      switch (type) {
        case 'email.delivered':
          await supabaseAdmin
            .from(tableName)
            .update({ delivered_at: new Date().toISOString() })
            .eq('id', invite.id);
          console.log(`Delivery confirmed for ${tableName} invite ${invite.id}`);
          break;

        case 'email.bounced':
          await supabaseAdmin
            .from(tableName)
            .update({
              bounced_at: new Date().toISOString(),
              bounce_type: data?.bounce?.type || 'unknown',
            })
            .eq('id', invite.id);
          console.log(
            `Bounce recorded for ${tableName} invite ${invite.id}: ${data?.bounce?.type}`
          );
          break;

        case 'email.complained':
          await supabaseAdmin
            .from(tableName)
            .update({
              bounced_at: new Date().toISOString(),
              bounce_type: 'complaint',
            })
            .eq('id', invite.id);
          console.log(`Complaint recorded for ${tableName} invite ${invite.id}`);
          break;

        case 'email.opened':
          // Only record first open
          if (!invite.opened_at) {
            await supabaseAdmin
              .from(tableName)
              .update({ opened_at: new Date().toISOString() })
              .eq('id', invite.id);
            console.log(`Open tracked for ${tableName} invite ${invite.id}`);
          }
          break;

        case 'email.clicked':
          // Only record first click
          if (!invite.clicked_at) {
            await supabaseAdmin
              .from(tableName)
              .update({ clicked_at: new Date().toISOString() })
              .eq('id', invite.id);
            console.log(`Click tracked for ${tableName} invite ${invite.id}`);
          }
          break;

        default:
          console.log(`Unhandled event type for invite: ${type}`);
      }
    }

    // ─── Outreach campaign sends tracking ───────────────────────
    const { data: outreachSend } = await supabaseAdmin
      .from('outreach_campaign_sends')
      .select('id, campaign_id, opened_at, clicked_at')
      .eq('resend_email_id', emailId)
      .single();

    if (outreachSend) {
      const now = new Date().toISOString();
      console.log(
        `Found outreach send ${outreachSend.id} for campaign ${outreachSend.campaign_id}`
      );

      switch (type) {
        case 'email.delivered':
          await supabaseAdmin
            .from('outreach_campaign_sends')
            .update({ delivered_at: now, status: 'delivered' })
            .eq('id', outreachSend.id);
          console.log(`Outreach delivery confirmed: ${outreachSend.id}`);
          break;

        case 'email.opened':
          // Only record first open
          if (!outreachSend.opened_at) {
            await supabaseAdmin
              .from('outreach_campaign_sends')
              .update({ opened_at: now, status: 'opened' })
              .eq('id', outreachSend.id);
            // Increment campaign open_count
            const { data: campForOpen } = await supabaseAdmin
              .from('outreach_campaigns')
              .select('open_count')
              .eq('id', outreachSend.campaign_id)
              .single();
            if (campForOpen) {
              await supabaseAdmin
                .from('outreach_campaigns')
                .update({ open_count: (campForOpen.open_count || 0) + 1 })
                .eq('id', outreachSend.campaign_id);
            }
            console.log(`Outreach open tracked: ${outreachSend.id}`);
          }
          break;

        case 'email.clicked':
          // Only record first click
          if (!outreachSend.clicked_at) {
            await supabaseAdmin
              .from('outreach_campaign_sends')
              .update({ clicked_at: now, status: 'clicked' })
              .eq('id', outreachSend.id);
            // Increment campaign click_count
            const { data: campForClick } = await supabaseAdmin
              .from('outreach_campaigns')
              .select('click_count')
              .eq('id', outreachSend.campaign_id)
              .single();
            if (campForClick) {
              await supabaseAdmin
                .from('outreach_campaigns')
                .update({ click_count: (campForClick.click_count || 0) + 1 })
                .eq('id', outreachSend.campaign_id);
            }
            console.log(`Outreach click tracked: ${outreachSend.id}`);
          }
          break;

        case 'email.bounced': {
          await supabaseAdmin
            .from('outreach_campaign_sends')
            .update({ bounced_at: now, status: 'bounced' })
            .eq('id', outreachSend.id);
          // Increment campaign bounce_count
          const { data: campForBounce } = await supabaseAdmin
            .from('outreach_campaigns')
            .select('bounce_count')
            .eq('id', outreachSend.campaign_id)
            .single();
          if (campForBounce) {
            await supabaseAdmin
              .from('outreach_campaigns')
              .update({ bounce_count: (campForBounce.bounce_count || 0) + 1 })
              .eq('id', outreachSend.campaign_id);
          }
          // Auto-suppress the contact
          if (toEmail) {
            await supabaseAdmin
              .from('outreach_contacts')
              .update({
                is_suppressed: true,
                suppression_reason: 'hard_bounce',
                suppressed_at: now,
              })
              .ilike('email', toEmail);
            console.log(`Auto-suppressed contact: ${toEmail}`);
          }
          console.log(`Outreach bounce tracked: ${outreachSend.id}`);
          break;
        }

        case 'email.complained':
          // Also suppress on complaint
          if (toEmail) {
            await supabaseAdmin
              .from('outreach_contacts')
              .update({
                is_suppressed: true,
                suppression_reason: 'complaint',
                suppressed_at: now,
              })
              .ilike('email', toEmail);
            console.log(`Auto-suppressed contact on complaint: ${toEmail}`);
          }
          break;
      }
    } else if (!invite) {
      console.log(`No invite or outreach send found for email_id ${emailId}`);
    }

    return new Response('OK', { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Webhook error:', error);
    await captureException(error, {
      functionName: 'resend-webhook',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    return new Response('Error', { status: 500, headers: corsHeaders });
  }
});
