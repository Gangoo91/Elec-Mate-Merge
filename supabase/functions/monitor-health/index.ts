/**
 * Monitor Health — ELE-129
 *
 * Runs every 5 minutes via pg_cron.
 * Pings the VPS MCP server health endpoint, stores the result,
 * and sends a WhatsApp alert to Andrew if the service is degraded or down.
 *
 * Alert deduplication: only sends one alert per 30-minute window.
 */

import { createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError } from '../_shared/errors.ts';

const VPS_URL = Deno.env.get('VPS_MCP_URL') || 'http://89.167.69.251:3100';
const VPS_API_KEY = Deno.env.get('VPS_API_KEY') || '';
const ANDREW_PHONE = '+447507241303';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    let status = 'down';
    let services: Record<string, unknown> = {};
    let responseTimeMs = 0;
    let errorMessage: string | null = null;

    // Ping VPS health endpoint
    try {
      const start = Date.now();
      const resp = await fetch(`${VPS_URL}/health`, {
        signal: AbortSignal.timeout(15000),
      });
      responseTimeMs = Date.now() - start;

      if (resp.ok) {
        const data = await resp.json();
        status = data.status || 'ok';
        services = data;
      } else {
        status = 'degraded';
        errorMessage = `HTTP ${resp.status}`;
      }
    } catch (err) {
      status = 'down';
      errorMessage = err instanceof Error ? err.message : String(err);
    }

    // Check if we need to alert (only once per 30 min)
    let alertSent = false;
    if (status !== 'ok') {
      const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
      const { data: recentAlerts } = await supabase
        .from('health_checks')
        .select('id')
        .eq('alert_sent', true)
        .gte('checked_at', thirtyMinAgo)
        .limit(1);

      const shouldAlert = !recentAlerts || recentAlerts.length === 0;

      if (shouldAlert) {
        try {
          const alertResp = await fetch(`${VPS_URL}/api/send-message`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': VPS_API_KEY,
            },
            body: JSON.stringify({
              target: ANDREW_PHONE,
              message: `⚠️ HEALTH ALERT: MCP server is ${status.toUpperCase()}. ${errorMessage || 'Check admin dashboard for details.'}`,
              channel: 'whatsapp',
            }),
          });
          alertSent = alertResp.ok;
        } catch {
          // If VPS is down, we can't send via WhatsApp — that's expected
          console.error('[monitor-health] Could not send WhatsApp alert (VPS likely down)');
        }
      }
    }

    // Store health check result
    const { error: insertError } = await supabase.from('health_checks').insert({
      status,
      services,
      response_time_ms: responseTimeMs,
      error_message: errorMessage,
      alert_sent: alertSent,
      alert_channel: alertSent ? 'whatsapp' : null,
    });

    if (insertError) {
      console.error('[monitor-health] Failed to store health check:', insertError.message);
    }

    // Cleanup: delete health checks older than 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    await supabase.from('health_checks').delete().lt('checked_at', thirtyDaysAgo);

    return new Response(
      JSON.stringify({ status, response_time_ms: responseTimeMs, alert_sent: alertSent }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});
