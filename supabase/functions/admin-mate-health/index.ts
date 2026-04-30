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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const RAG_TOOL_NAMES = [
  'lookup_regulation',
  'lookup_practical_method',
  'lookup_health_safety',
  'lookup_pricing_guidance',
  'lookup_design_guidance',
  'lookup_training_content',
];

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
  agent_jwt_expires_at: string | null;
  business_ai_enabled: boolean | null;
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

    // 1. All provisioned agents (business_ai_enabled OR agent_status set)
    const { data: provisionedRaw } = await supabaseAdmin
      .from('profiles')
      .select(
        'id, full_name, role, agent_status, agent_whatsapp_number, agent_provisioned_at, agent_jwt_expires_at, business_ai_enabled'
      )
      .or('business_ai_enabled.eq.true,agent_status.not.is.null');
    const provisioned = (provisionedRaw || []) as ProvisionedUser[];
    const userIds = provisioned.map((p) => p.id);

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
      });
    }
    for (const a of actions7d) {
      const bucket = perUser.get(a.user_id);
      if (!bucket) continue;
      bucket.tool_calls_7d += 1;
      if (a.created_at >= since24h) {
        bucket.tool_calls_24h += 1;
        const day = a.created_at.slice(0, 10);
        bucket.sessions_24h.add(day);
        if (a.outcome === 'failure') bucket.errors_24h += 1;
        const tool = a.detail?.tool_name ?? '';
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
          jwt_expires_at: p.agent_jwt_expires_at ?? null,
          last_seen_at: b?.last_seen_at ?? null,
          sessions_24h: b?.sessions_24h.size ?? 0,
          tool_calls_24h,
          tool_calls_7d: b?.tool_calls_7d ?? 0,
          errors_24h,
          error_rate_24h: tool_calls_24h > 0 ? errors_24h / tool_calls_24h : 0,
          rag_calls_24h: b?.rag_calls_24h ?? 0,
        };
      })
      .sort((a, b) => {
        if (!a.last_seen_at && !b.last_seen_at) return 0;
        if (!a.last_seen_at) return 1;
        if (!b.last_seen_at) return -1;
        return b.last_seen_at.localeCompare(a.last_seen_at);
      });

    // 4. Top tools (24h)
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
      generated_at: new Date().toISOString(),
    };

    return json({ summary, users, top_tools_24h, top_errors_24h });
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
