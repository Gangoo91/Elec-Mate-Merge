import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { captureException } from '../_shared/sentry.ts';

// CORS headers for webhook requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, svix-id, svix-timestamp, svix-signature',
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

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const { type, data } = payload;

    console.log(`Resend webhook received: ${type}`, JSON.stringify(data));

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const emailId = data?.email_id;
    if (!emailId) {
      console.log("No email_id in webhook payload");
      return new Response("OK", { status: 200, headers: corsHeaders });
    }

    // Try to find the invite in founder_invites first
    let invite: { id: string; opened_at?: string; clicked_at?: string } | null = null;
    let tableName: "founder_invites" | "early_access_invites" | null = null;

    const { data: founderInvite } = await supabaseAdmin
      .from("founder_invites")
      .select("id, opened_at, clicked_at")
      .eq("resend_email_id", emailId)
      .single();

    if (founderInvite) {
      invite = founderInvite;
      tableName = "founder_invites";
      console.log(`Found invite in founder_invites: ${invite.id}`);
    } else {
      // Try early_access_invites
      const { data: earlyAccessInvite } = await supabaseAdmin
        .from("early_access_invites")
        .select("id, opened_at, clicked_at")
        .eq("resend_email_id", emailId)
        .single();

      if (earlyAccessInvite) {
        invite = earlyAccessInvite;
        tableName = "early_access_invites";
        console.log(`Found invite in early_access_invites: ${invite.id}`);
      }
    }

    if (!invite || !tableName) {
      console.log(`No invite found for email_id ${emailId} in either table`);
      return new Response("OK", { status: 200, headers: corsHeaders });
    }

    // Handle different event types
    switch (type) {
      case "email.delivered":
        await supabaseAdmin
          .from(tableName)
          .update({ delivered_at: new Date().toISOString() })
          .eq("id", invite.id);
        console.log(`Delivery confirmed for ${tableName} invite ${invite.id}`);
        break;

      case "email.bounced":
        await supabaseAdmin
          .from(tableName)
          .update({
            bounced_at: new Date().toISOString(),
            bounce_type: data?.bounce?.type || "unknown",
          })
          .eq("id", invite.id);
        console.log(`Bounce recorded for ${tableName} invite ${invite.id}: ${data?.bounce?.type}`);
        break;

      case "email.complained":
        await supabaseAdmin
          .from(tableName)
          .update({
            bounced_at: new Date().toISOString(),
            bounce_type: "complaint",
          })
          .eq("id", invite.id);
        console.log(`Complaint recorded for ${tableName} invite ${invite.id}`);
        break;

      case "email.opened":
        // Only record first open
        if (!invite.opened_at) {
          await supabaseAdmin
            .from(tableName)
            .update({ opened_at: new Date().toISOString() })
            .eq("id", invite.id);
          console.log(`Open tracked for ${tableName} invite ${invite.id}`);
        }
        break;

      case "email.clicked":
        // Only record first click
        if (!invite.clicked_at) {
          await supabaseAdmin
            .from(tableName)
            .update({ clicked_at: new Date().toISOString() })
            .eq("id", invite.id);
          console.log(`Click tracked for ${tableName} invite ${invite.id}`);
        }
        break;

      default:
        console.log(`Unhandled event type: ${type}`);
    }

    return new Response("OK", { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Webhook error:", error);
    await captureException(error, { functionName: 'resend-webhook', requestUrl: req.url, requestMethod: req.method });
    return new Response("Error", { status: 500, headers: corsHeaders });
  }
});
