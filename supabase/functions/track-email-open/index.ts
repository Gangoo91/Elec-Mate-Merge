import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

// 1x1 transparent GIF pixel
const TRACKING_PIXEL = new Uint8Array([
  0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
  0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x21,
  0xf9, 0x04, 0x01, 0x00, 0x00, 0x00, 0x00, 0x2c, 0x00, 0x00,
  0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44,
  0x01, 0x00, 0x3b
]);

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  // Always return the pixel, even if token is missing or invalid
  const headers = {
    "Content-Type": "image/gif",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  };

  if (!token) {
    console.log("Track email open: No token provided");
    return new Response(TRACKING_PIXEL, { headers });
  }

  try {
    // Create admin client for database operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Find the invite by token
    const { data: invite, error: fetchError } = await supabaseAdmin
      .from("early_access_invites")
      .select("id, email, opened_at, status")
      .eq("invite_token", token)
      .single();

    if (fetchError || !invite) {
      console.log(`Track email open: Invalid token ${token}`);
      return new Response(TRACKING_PIXEL, { headers });
    }

    // Only update if not already opened (first open only)
    if (!invite.opened_at) {
      const { error: updateError } = await supabaseAdmin
        .from("early_access_invites")
        .update({ opened_at: new Date().toISOString() })
        .eq("id", invite.id);

      if (updateError) {
        console.error("Track email open: Update error", updateError);
      } else {
        console.log(`Track email open: Recorded open for ${invite.email}`);
      }
    } else {
      console.log(`Track email open: Already tracked for ${invite.email}`);
    }
  } catch (error) {
    console.error("Track email open: Error", error);
  }

  // Always return the pixel regardless of outcome
  return new Response(TRACKING_PIXEL, { headers });
});
