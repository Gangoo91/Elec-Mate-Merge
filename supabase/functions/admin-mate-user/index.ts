/**
 * admin-mate-user
 *
 * Per-user health detail for the Mate admin drill-down page.
 * Body: { user_id: string }
 *
 * Returns:
 *  - profile (name, phone, role, status, jwt expiry, provisioned at)
 *  - summary (calls 24h/7d, error counts, RAG share, distinct tools)
 *  - actions: last 100 tool calls with tool_name, outcome, error, duration_ms
 *  - tool_breakdown: counts per tool over 7d
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
  id: string;
  user_id: string;
  description: string | null;
  outcome: string | null;
  detail: {
    tool_name?: string;
    error?: string;
    duration_ms?: number;
    success?: boolean;
    args?: unknown;
  } | null;
  created_at: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'No authorization header' }, 401);

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

    const body = (await req.json().catch(() => ({}))) as { user_id?: string };
    const targetId = body.user_id;
    if (!targetId) return json({ error: 'Missing user_id' }, 400);

    const { data: targetProfile } = await supabaseAdmin
      .from('profiles')
      .select(
        'id, full_name, role, agent_status, agent_whatsapp_number, agent_provisioned_at, agent_jwt_expires_at, business_ai_enabled, email'
      )
      .eq('id', targetId)
      .single();
    if (!targetProfile) return json({ error: 'User not found' }, 404);

    const now = Date.now();
    const since24h = new Date(now - 24 * 60 * 60 * 1000).toISOString();
    const since7d = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: actionsRaw } = await supabaseAdmin
      .from('agent_action_log')
      .select('id, user_id, description, outcome, detail, created_at')
      .eq('user_id', targetId)
      .eq('action_type', 'tool_call')
      .gte('created_at', since7d)
      .order('created_at', { ascending: false })
      .limit(2000);
    const actions7d = (actionsRaw || []) as ActionRow[];
    const actions24h = actions7d.filter((a) => a.created_at >= since24h);

    const errors7d = actions7d.filter((a) => a.outcome === 'failure').length;
    const errors24h = actions24h.filter((a) => a.outcome === 'failure').length;
    const ragCalls24h = actions24h.filter((a) =>
      RAG_TOOL_NAMES.includes(a.detail?.tool_name ?? '')
    ).length;
    const ragCalls7d = actions7d.filter((a) =>
      RAG_TOOL_NAMES.includes(a.detail?.tool_name ?? '')
    ).length;

    const toolCounts = new Map<string, number>();
    for (const a of actions7d) {
      const t = a.detail?.tool_name ?? 'unknown';
      toolCounts.set(t, (toolCounts.get(t) ?? 0) + 1);
    }
    const tool_breakdown = [...toolCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([tool, count]) => ({ tool, count }));

    const recentActions = actions7d.slice(0, 100).map((a) => ({
      id: a.id,
      tool: a.detail?.tool_name ?? a.description ?? 'unknown',
      outcome: a.outcome,
      error: a.detail?.error ?? null,
      duration_ms: a.detail?.duration_ms ?? null,
      created_at: a.created_at,
      is_rag: RAG_TOOL_NAMES.includes(a.detail?.tool_name ?? ''),
    }));

    const summary = {
      tool_calls_24h: actions24h.length,
      tool_calls_7d: actions7d.length,
      errors_24h: errors24h,
      errors_7d: errors7d,
      error_rate_24h: actions24h.length > 0 ? errors24h / actions24h.length : 0,
      rag_calls_24h: ragCalls24h,
      rag_calls_7d: ragCalls7d,
      rag_share_24h: actions24h.length > 0 ? ragCalls24h / actions24h.length : 0,
      rag_share_7d: actions7d.length > 0 ? ragCalls7d / actions7d.length : 0,
      distinct_tools_7d: tool_breakdown.length,
    };

    return json({
      profile: {
        id: targetProfile.id,
        full_name: targetProfile.full_name,
        role: targetProfile.role,
        email: targetProfile.email,
        agent_status: targetProfile.agent_status,
        phone: targetProfile.agent_whatsapp_number,
        agent_provisioned_at: targetProfile.agent_provisioned_at,
        jwt_expires_at: targetProfile.agent_jwt_expires_at,
        business_ai_enabled: targetProfile.business_ai_enabled,
      },
      summary,
      tool_breakdown,
      actions: recentActions,
      generated_at: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[admin-mate-user] Uncaught error:', message);
    return json({ error: message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  });
}
