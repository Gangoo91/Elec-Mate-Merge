/**
 * System Health Monitor — ELE-129
 *
 * Comprehensive health monitoring with persistence and alerting.
 * Runs every 5 minutes via pg_cron (or manual POST).
 *
 * Checks:
 *   1. Supabase database connectivity + latency
 *   2. OpenAI API availability
 *   3. VPS MCP server health (Supabase, OpenClaw, agents, memory)
 *
 * Stores results in `health_checks` table.
 * Sends WhatsApp alert to Andrew if service is degraded or down.
 * Alert deduplication: max one alert per 30-minute window.
 */

import { createClient, corsHeaders } from '../_shared/deps.ts';

const VPS_URL = Deno.env.get('VPS_MCP_URL') || 'http://89.167.69.251:3100';
const VPS_API_KEY = Deno.env.get('VPS_API_KEY') || '';
const ANDREW_PHONE = '+447507241303';

interface ServiceCheck {
  service: string;
  status: 'ok' | 'degraded' | 'down';
  latency_ms?: number;
  error?: string;
  detail?: Record<string, unknown>;
}

// ── Individual service checks ───────────────────────────────────────

async function checkDatabase(supabase: ReturnType<typeof createClient>): Promise<ServiceCheck> {
  const start = Date.now();
  try {
    const { error } = await supabase.from('profiles').select('id').limit(1);
    const latency = Date.now() - start;
    if (error) {
      return { service: 'database', status: 'down', latency_ms: latency, error: error.message };
    }
    return {
      service: 'database',
      status: latency < 1000 ? 'ok' : 'degraded',
      latency_ms: latency,
    };
  } catch (err) {
    return {
      service: 'database',
      status: 'down',
      latency_ms: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function checkOpenAI(): Promise<ServiceCheck> {
  const start = Date.now();
  try {
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      return { service: 'openai', status: 'down', error: 'API key not configured' };
    }
    const resp = await fetch('https://api.openai.com/v1/models', {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(10000),
    });
    const latency = Date.now() - start;
    if (!resp.ok) {
      return {
        service: 'openai',
        status: 'down',
        latency_ms: latency,
        error: `HTTP ${resp.status}`,
      };
    }
    return {
      service: 'openai',
      status: latency < 2000 ? 'ok' : 'degraded',
      latency_ms: latency,
    };
  } catch (err) {
    return {
      service: 'openai',
      status: 'down',
      latency_ms: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

async function checkVpsMcp(): Promise<ServiceCheck> {
  const start = Date.now();
  try {
    const resp = await fetch(`${VPS_URL}/health`, {
      signal: AbortSignal.timeout(15000),
    });
    const latency = Date.now() - start;
    if (!resp.ok) {
      return {
        service: 'vps_mcp',
        status: 'down',
        latency_ms: latency,
        error: `HTTP ${resp.status}`,
      };
    }
    const data = await resp.json();
    const vpsStatus = data.status === 'ok' ? 'ok' : 'degraded';
    return {
      service: 'vps_mcp',
      status: vpsStatus as 'ok' | 'degraded',
      latency_ms: latency,
      detail: {
        uptime: data.uptime,
        memory_mb: data.memory_mb,
        supabase: data.supabase,
        openclaw: data.openclaw,
        agents: data.agents,
      },
    };
  } catch (err) {
    return {
      service: 'vps_mcp',
      status: 'down',
      latency_ms: Date.now() - start,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

// ── Main handler ────────────────────────────────────────────────────

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

    // Run all checks in parallel
    const [dbCheck, openaiCheck, vpsCheck] = await Promise.all([
      checkDatabase(supabase),
      checkOpenAI(),
      checkVpsMcp(),
    ]);

    const checks = [dbCheck, openaiCheck, vpsCheck];
    const hasDown = checks.some((c) => c.status === 'down');
    const hasDegraded = checks.some((c) => c.status === 'degraded');
    const overall = hasDown ? 'down' : hasDegraded ? 'degraded' : 'ok';
    const totalLatency = checks.reduce((sum, c) => sum + (c.latency_ms || 0), 0);

    // Persist to health_checks table
    let alertSent = false;

    if (overall !== 'ok') {
      // Check alert deduplication — max one per 30 min
      const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
      const { data: recentAlerts } = await supabase
        .from('health_checks')
        .select('id')
        .eq('alert_sent', true)
        .gte('checked_at', thirtyMinAgo)
        .limit(1);

      if (!recentAlerts || recentAlerts.length === 0) {
        // Build alert message
        const failedServices = checks
          .filter((c) => c.status !== 'ok')
          .map((c) => `${c.service}: ${c.status}${c.error ? ` (${c.error})` : ''}`)
          .join(', ');

        try {
          const alertResp = await fetch(`${VPS_URL}/api/send-message`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': VPS_API_KEY,
            },
            body: JSON.stringify({
              target: ANDREW_PHONE,
              message: `⚠️ HEALTH ALERT [${overall.toUpperCase()}]\n${failedServices}\nCheck admin dashboard for details.`,
              channel: 'whatsapp',
            }),
          });
          alertSent = alertResp.ok;
        } catch {
          // VPS might be down — can't send via WhatsApp
          console.error('[system-health] Could not send WhatsApp alert');
        }
      }
    }

    // Store result
    await supabase.from('health_checks').insert({
      status: overall,
      services: { checks, overall },
      response_time_ms: totalLatency,
      error_message:
        overall !== 'ok'
          ? checks
              .filter((c) => c.status !== 'ok')
              .map((c) => `${c.service}: ${c.error || c.status}`)
              .join('; ')
          : null,
      alert_sent: alertSent,
      alert_channel: alertSent ? 'whatsapp' : null,
    });

    // Cleanup records older than 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    await supabase.from('health_checks').delete().lt('checked_at', thirtyDaysAgo);

    const result = {
      overall,
      timestamp: new Date().toISOString(),
      checks,
      alert_sent: alertSent,
    };

    return new Response(JSON.stringify(result), {
      status: overall === 'down' ? 503 : 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[system-health] Fatal error:', error);
    return new Response(
      JSON.stringify({
        overall: 'down',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
