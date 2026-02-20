import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    const campaignId = url.searchParams.get('campaign');

    if (!token) {
      return new Response(htmlPage('Missing unsubscribe token.', true), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // Decode email from base64 token
    let email: string;
    try {
      email = atob(token).trim().toLowerCase();
    } catch {
      return new Response(htmlPage('Invalid unsubscribe token.', true), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    if (!email || !email.includes('@')) {
      return new Response(htmlPage('Invalid email in token.', true), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Mark contact as suppressed
    const { error: updateError } = await supabaseAdmin
      .from('outreach_contacts')
      .update({
        is_suppressed: true,
        suppression_reason: 'unsubscribed',
        suppressed_at: new Date().toISOString(),
      })
      .ilike('email', email);

    if (updateError) {
      console.error('Failed to update contact:', updateError.message);
    }

    // Log to email_tracking_events
    try {
      await supabaseAdmin.from('email_tracking_events').insert({
        user_email: email,
        event_type: 'unsubscribe',
        raw_payload: { campaign_id: campaignId, source: 'outreach_unsubscribe' },
      });
    } catch (trackErr: unknown) {
      console.error(
        'Failed to log tracking event:',
        trackErr instanceof Error ? trackErr.message : String(trackErr)
      );
    }

    console.log(`Unsubscribed: ${email}${campaignId ? ` (campaign: ${campaignId})` : ''}`);

    return new Response(htmlPage("You've been unsubscribed from Elec-Mate emails.", false), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (error: unknown) {
    console.error('Unsubscribe error:', error instanceof Error ? error.message : String(error));
    return new Response(htmlPage('Something went wrong. Please try again later.', true), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
});

function htmlPage(message: string, isError: boolean): string {
  const bgColour = isError ? '#991b1b' : '#15803d';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Elec-Mate - Unsubscribe</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: #0a0a0a;
      color: #fff;
    }
    .card {
      max-width: 480px;
      padding: 40px;
      text-align: center;
      border-radius: 16px;
      background: #1a1a1a;
      border: 1px solid #333;
    }
    .icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: ${bgColour};
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      font-size: 28px;
    }
    h1 { font-size: 20px; margin: 0 0 12px; }
    p { color: #999; font-size: 14px; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${isError ? '!' : '&#10003;'}</div>
    <h1>${message}</h1>
    <p>${isError ? 'If this problem persists, please contact us at hello@elec-mate.com' : 'You will no longer receive outreach emails from us. If this was a mistake, contact hello@elec-mate.com'}</p>
  </div>
</body>
</html>`;
}
