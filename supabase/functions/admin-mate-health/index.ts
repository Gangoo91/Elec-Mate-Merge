/**
 * admin-mate-health
 *
 * Read-only health snapshot for the Mate (Elec-AI) agent fleet.
 * - Aggregates from agent_action_log (audit-logger writes one row per tool call)
 * - Joins with profiles for per-user names + agent state
 * - Uses agent_tool_error_summary view for top errors
 *
 * Auth: caller's JWT must belong to a profile with admin_role set.
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { RAG_TOOL_NAMES, minutesSavedFor } from '../_shared/mate-metrics.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

interface ActionRow {
  user_id: string;
  outcome: string | null;
  detail: { tool_name?: string; error?: string; duration_ms?: number } | null;
  created_at: string;
}

interface ProvisionedUser {
  id: string;
  full_name: string | null;
  role: string | null;
  agent_status: string | null;
  agent_whatsapp_number: string | null;
  agent_provisioned_at: string | null;
  business_ai_enabled: boolean | null;
}

interface JwtTokenRow {
  user_id: string;
  expires_at: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return json({ error: 'No authorization header' }, 401);
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const token = authHeader.replace('Bearer ', '');
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token);
    if (userError || !user) return json({ error: 'Authentication failed' }, 401);

    const { data: callerProfile } = await supabaseAdmin
      .from('profiles')
      .select('admin_role')
      .eq('id', user.id)
      .single();
    if (!callerProfile?.admin_role) return json({ error: 'Admin access required' }, 403);

    const now = Date.now();
    const since24h = new Date(now - 24 * 60 * 60 * 1000).toISOString();
    const since7d = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();

    // 1. All actually-provisioned agents:
    //    business_ai_enabled=true AND agent_status in real provisioning states
    //    (excludes the default 'inactive' state every profile starts in).
    const { data: provisionedRaw } = await supabaseAdmin
      .from('profiles')
      .select(
        'id, full_name, role, agent_status, agent_whatsapp_number, agent_provisioned_at, business_ai_enabled'
      )
      .eq('business_ai_enabled', true)
      .in('agent_status', ['active', 'paused', 'provisioning']);
    const provisioned = (provisionedRaw || []) as ProvisionedUser[];
    const userIds = provisioned.map((p) => p.id);

    // 1b. JWT expiries — separate table
    const { data: jwtRowsRaw } =
      userIds.length > 0
        ? await supabaseAdmin
            .from('agent_jwt_tokens')
            .select('user_id, expires_at')
            .in('user_id', userIds)
            .is('revoked_at', null)
        : { data: [] };
    const jwtByUser = new Map<string, string>();
    for (const row of (jwtRowsRaw ?? []) as JwtTokenRow[]) {
      // Take the latest expiry per user (rotated tokens supersede old ones)
      const existing = jwtByUser.get(row.user_id);
      if (!existing || row.expires_at > existing) {
        jwtByUser.set(row.user_id, row.expires_at);
      }
    }

    // 1c. Cost — last 30d, last 7d, last 24h. Populated by VPS cron.
    const costSince30dDay = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    const costSince7dDay = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    const costSince1dDay = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    const { data: costRowsRaw } =
      userIds.length > 0
        ? await supabaseAdmin
            .from('mate_cost_daily')
            .select('user_id, day, cost_usd')
            .in('user_id', userIds)
            .gte('day', costSince30dDay)
        : { data: [] };
    const costByUser = new Map<string, { cost_24h: number; cost_7d: number; cost_30d: number }>();
    let fleetCost24h = 0;
    let fleetCost7d = 0;
    let fleetCost30d = 0;
    for (const row of (costRowsRaw ?? []) as {
      user_id: string;
      day: string;
      cost_usd: number;
    }[]) {
      const cost = Number(row.cost_usd) || 0;
      const bucket = costByUser.get(row.user_id) ?? {
        cost_24h: 0,
        cost_7d: 0,
        cost_30d: 0,
      };
      bucket.cost_30d += cost;
      fleetCost30d += cost;
      if (row.day >= costSince7dDay) {
        bucket.cost_7d += cost;
        fleetCost7d += cost;
      }
      if (row.day >= costSince1dDay) {
        bucket.cost_24h += cost;
        fleetCost24h += cost;
      }
      costByUser.set(row.user_id, bucket);
    }

    // 2. Tool calls in last 7d for the agent fleet
    const { data: actions7dRaw } = await supabaseAdmin
      .from('agent_action_log')
      .select('user_id, outcome, detail, created_at')
      .eq('action_type', 'tool_call')
      .in('user_id', userIds.length > 0 ? userIds : ['00000000-0000-0000-0000-000000000000'])
      .gte('created_at', since7d)
      .order('created_at', { ascending: false })
      .limit(20000);
    const actions7d = (actions7dRaw || []) as ActionRow[];

    const actions24h = actions7d.filter((a) => a.created_at >= since24h);

    // 3. Per-user aggregates
    const perUser = new Map<
      string,
      {
        sessions_24h: Set<string>;
        tool_calls_24h: number;
        tool_calls_7d: number;
        errors_24h: number;
        last_seen_at: string | null;
        rag_calls_24h: number;
        minutes_saved_24h: number;
        minutes_saved_7d: number;
      }
    >();
    for (const id of userIds) {
      perUser.set(id, {
        sessions_24h: new Set(),
        tool_calls_24h: 0,
        tool_calls_7d: 0,
        errors_24h: 0,
        last_seen_at: null,
        rag_calls_24h: 0,
        minutes_saved_24h: 0,
        minutes_saved_7d: 0,
      });
    }
    for (const a of actions7d) {
      const bucket = perUser.get(a.user_id);
      if (!bucket) continue;
      bucket.tool_calls_7d += 1;
      const tool = a.detail?.tool_name ?? '';
      // Time-saved is only counted on successful calls
      if (a.outcome !== 'failure') {
        bucket.minutes_saved_7d += minutesSavedFor(tool);
      }
      if (a.created_at >= since24h) {
        bucket.tool_calls_24h += 1;
        const day = a.created_at.slice(0, 10);
        bucket.sessions_24h.add(day);
        if (a.outcome === 'failure') bucket.errors_24h += 1;
        else bucket.minutes_saved_24h += minutesSavedFor(tool);
        if (RAG_TOOL_NAMES.includes(tool)) bucket.rag_calls_24h += 1;
      }
      if (!bucket.last_seen_at || a.created_at > bucket.last_seen_at) {
        bucket.last_seen_at = a.created_at;
      }
    }

    const users = provisioned
      .map((p) => {
        const b = perUser.get(p.id);
        const tool_calls_24h = b?.tool_calls_24h ?? 0;
        const errors_24h = b?.errors_24h ?? 0;
        return {
          user_id: p.id,
          full_name: p.full_name ?? null,
          phone: p.agent_whatsapp_number ?? null,
          role: p.role ?? null,
          agent_status: p.agent_status ?? null,
          agent_provisioned_at: p.agent_provisioned_at ?? null,
          jwt_expires_at: jwtByUser.get(p.id) ?? null,
          last_seen_at: b?.last_seen_at ?? null,
          sessions_24h: b?.sessions_24h.size ?? 0,
          tool_calls_24h,
          tool_calls_7d: b?.tool_calls_7d ?? 0,
          errors_24h,
          error_rate_24h: tool_calls_24h > 0 ? errors_24h / tool_calls_24h : 0,
          rag_calls_24h: b?.rag_calls_24h ?? 0,
          minutes_saved_24h: b?.minutes_saved_24h ?? 0,
          minutes_saved_7d: b?.minutes_saved_7d ?? 0,
          cost_24h: costByUser.get(p.id)?.cost_24h ?? 0,
          cost_7d: costByUser.get(p.id)?.cost_7d ?? 0,
          cost_30d: costByUser.get(p.id)?.cost_30d ?? 0,
        };
      })
      .sort((a, b) => {
        if (!a.last_seen_at && !b.last_seen_at) return 0;
        if (!a.last_seen_at) return 1;
        if (!b.last_seen_at) return -1;
        return b.last_seen_at.localeCompare(a.last_seen_at);
      });

    // 4. Per-tool reliability (7d) — success rate, latency, top error, users
    interface ToolBucket {
      calls: number;
      successes: number;
      failures: number;
      durations: number[];
      users: Set<string>;
      last_error: string | null;
      last_error_at: string | null;
      last_seen: string | null;
    }
    const toolBuckets = new Map<string, ToolBucket>();
    for (const a of actions7d) {
      const tool = a.detail?.tool_name ?? 'unknown';
      let bucket = toolBuckets.get(tool);
      if (!bucket) {
        bucket = {
          calls: 0,
          successes: 0,
          failures: 0,
          durations: [],
          users: new Set<string>(),
          last_error: null,
          last_error_at: null,
          last_seen: null,
        };
        toolBuckets.set(tool, bucket);
      }
      bucket.calls += 1;
      bucket.users.add(a.user_id);
      if (a.outcome === 'failure') {
        bucket.failures += 1;
        const err = a.detail?.error ?? null;
        if (err && (!bucket.last_error_at || a.created_at > bucket.last_error_at)) {
          bucket.last_error = err;
          bucket.last_error_at = a.created_at;
        }
      } else {
        bucket.successes += 1;
      }
      const dur = a.detail?.duration_ms;
      if (typeof dur === 'number' && dur >= 0) bucket.durations.push(dur);
      if (!bucket.last_seen || a.created_at > bucket.last_seen) {
        bucket.last_seen = a.created_at;
      }
    }

    function percentile(sorted: number[], p: number): number {
      if (sorted.length === 0) return 0;
      const idx = Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * p));
      return sorted[idx];
    }

    const tool_reliability_7d = [...toolBuckets.entries()]
      .map(([tool, b]) => {
        const sortedDur = [...b.durations].sort((a, c) => a - c);
        return {
          tool,
          calls: b.calls,
          successes: b.successes,
          failures: b.failures,
          success_rate: b.calls > 0 ? b.successes / b.calls : 0,
          p50_ms: percentile(sortedDur, 0.5),
          p95_ms: percentile(sortedDur, 0.95),
          users: b.users.size,
          last_error: b.last_error,
          last_error_at: b.last_error_at,
          last_seen: b.last_seen,
        };
      })
      .sort((a, b) => b.calls - a.calls);

    // 4b. Top tools (24h) — kept for backwards compat with the dashboard
    const toolCounts = new Map<string, number>();
    for (const a of actions24h) {
      const tool = a.detail?.tool_name ?? 'unknown';
      toolCounts.set(tool, (toolCounts.get(tool) ?? 0) + 1);
    }
    const top_tools_24h = [...toolCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tool, count]) => ({ tool, count }));

    // 5. Top errors (24h) — straight from the view
    const { data: topErrorsRaw } = await supabaseAdmin
      .from('agent_tool_error_summary')
      .select('tool_name, error_message, error_count, users_affected, last_seen')
      .limit(10);
    const top_errors_24h = (topErrorsRaw ?? []).map((r) => ({
      tool: (r as { tool_name: string | null }).tool_name ?? 'unknown',
      error: (r as { error_message: string | null }).error_message ?? '',
      count: (r as { error_count: number }).error_count,
      users_affected: (r as { users_affected: number }).users_affected,
      last_seen: (r as { last_seen: string }).last_seen,
    }));

    // 6. Summary
    const totalCalls24h = actions24h.length;
    const totalCalls7d = actions7d.length;
    const errors24h = actions24h.filter((a) => a.outcome === 'failure').length;
    const ragCalls24h = actions24h.filter((a) =>
      RAG_TOOL_NAMES.includes(a.detail?.tool_name ?? '')
    ).length;
    const active24h = new Set(actions24h.map((a) => a.user_id)).size;
    const active7d = new Set(actions7d.map((a) => a.user_id)).size;

    // Sum time-saved across the fleet
    let minutesSaved24h = 0;
    let minutesSaved7d = 0;
    for (const a of actions7d) {
      if (a.outcome === 'failure') continue;
      const m = minutesSavedFor(a.detail?.tool_name ?? '');
      minutesSaved7d += m;
      if (a.created_at >= since24h) minutesSaved24h += m;
    }

    const summary = {
      total_agents: provisioned.length,
      active_24h: active24h,
      active_7d: active7d,
      tool_calls_24h: totalCalls24h,
      tool_calls_7d: totalCalls7d,
      errors_24h: errors24h,
      error_rate_24h: totalCalls24h > 0 ? errors24h / totalCalls24h : 0,
      rag_calls_24h: ragCalls24h,
      rag_share_24h: totalCalls24h > 0 ? ragCalls24h / totalCalls24h : 0,
      minutes_saved_24h: minutesSaved24h,
      minutes_saved_7d: minutesSaved7d,
      cost_24h: fleetCost24h,
      cost_7d: fleetCost7d,
      cost_30d: fleetCost30d,
      generated_at: new Date().toISOString(),
    };

    return json({ summary, users, top_tools_24h, top_errors_24h, tool_reliability_7d });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[admin-mate-health] Uncaught error:', message);
    return json({ error: message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  });
}
