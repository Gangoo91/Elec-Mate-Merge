/**
 * admin-mate-provision
 *
 * Admin-gated single-call provisioning for a Mate (Elec-AI) agent.
 *
 * Flow:
 *  1. Verify caller's JWT belongs to an admin profile.
 *  2. Update target profile: business_ai_enabled=true, phone verified, role.
 *  3. Upsert phone_number_routing (so inbound WhatsApp routes to this user).
 *  4. POST to VPS https://agent.elec-mate.com/api/provision-agent with VPS_API_KEY.
 *     The VPS endpoint creates the workspace + JWT (via provision-agent-vps internally).
 *
 * Body: { user_id: string, phone: string, role?: string, full_name?: string }
 * Returns: { ok: true, steps: [...], vps_response: any }
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const PHONE_REGEX = /^\+[1-9]\d{6,14}$/;

interface ProvisionStep {
  step: string;
  ok: boolean;
  detail?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const steps: ProvisionStep[] = [];
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

    const { data: caller } = await supabaseAdmin
      .from('profiles')
      .select('admin_role')
      .eq('id', user.id)
      .single();
    if (!caller?.admin_role) return json({ error: 'Admin access required' }, 403);

    const body = (await req.json().catch(() => ({}))) as {
      user_id?: string;
      phone?: string;
      role?: string;
      full_name?: string;
    };
    const { user_id, phone, role, full_name } = body;

    if (!user_id) return json({ error: 'Missing user_id' }, 400);
    if (!phone || !PHONE_REGEX.test(phone)) {
      return json({ error: 'phone must be in E.164 format (e.g. +447700900123)' }, 400);
    }

    // Look up the target profile to confirm it exists
    const { data: target, error: targetErr } = await supabaseAdmin
      .from('profiles')
      .select('id, full_name, role, agent_status, agent_whatsapp_number')
      .eq('id', user_id)
      .single();
    if (targetErr || !target) return json({ error: 'Target user not found' }, 404);

    const finalRole = role ?? target.role ?? 'electrician';
    const finalName = full_name ?? target.full_name ?? null;
    const now = new Date().toISOString();

    // STEP 1 — flip profile flags
    const { error: profileErr } = await supabaseAdmin
      .from('profiles')
      .update({
        business_ai_enabled: true,
        agent_status: target.agent_status === 'active' ? 'active' : 'provisioning',
        agent_provisioned_at: now,
        agent_whatsapp_number: phone,
        agent_phone_verified: true,
        agent_phone_verified_at: now,
        ...(role ? { role } : {}),
      })
      .eq('id', user_id);
    if (profileErr) {
      steps.push({ step: 'profile.update', ok: false, detail: profileErr.message });
      return json({ ok: false, steps, error: profileErr.message }, 500);
    }
    steps.push({ step: 'profile.update', ok: true });

    // STEP 2 — phone routing
    const { error: routingErr } = await supabaseAdmin.from('phone_number_routing').upsert(
      {
        phone_number: phone,
        owner_type: 'user',
        user_id,
        updated_at: now,
      },
      { onConflict: 'phone_number' }
    );
    if (routingErr) {
      steps.push({ step: 'phone_routing.upsert', ok: false, detail: routingErr.message });
      return json({ ok: false, steps, error: routingErr.message }, 500);
    }
    steps.push({ step: 'phone_routing.upsert', ok: true });

    // STEP 3 — call VPS provisioning endpoint
    const vpsUrl = Deno.env.get('VPS_MCP_URL') ?? 'https://agent.elec-mate.com';
    const vpsKey = Deno.env.get('VPS_API_KEY');
    if (!vpsKey) {
      steps.push({
        step: 'vps.provision',
        ok: false,
        detail: 'VPS_API_KEY not configured',
      });
      return json({ ok: false, steps, error: 'VPS_API_KEY not configured' }, 500);
    }

    let vpsResponse: unknown = null;
    try {
      const r = await fetch(`${vpsUrl.replace(/\/$/, '')}/api/provision-agent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': vpsKey,
        },
        body: JSON.stringify({
          user_id,
          phone_number: phone,
          full_name: finalName,
          role: finalRole,
        }),
      });
      const text = await r.text();
      try {
        vpsResponse = JSON.parse(text);
      } catch {
        vpsResponse = { raw: text };
      }
      if (!r.ok) {
        steps.push({
          step: 'vps.provision',
          ok: false,
          detail: `HTTP ${r.status} — ${text.slice(0, 200)}`,
        });
        return json({ ok: false, steps, vps_response: vpsResponse }, 502);
      }
      steps.push({ step: 'vps.provision', ok: true });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      steps.push({ step: 'vps.provision', ok: false, detail: msg });
      return json({ ok: false, steps, error: msg }, 502);
    }

    // STEP 4 — log to agent_action_log so the admin dashboard sees this
    await supabaseAdmin.from('agent_action_log').insert({
      user_id,
      action_type: 'agent_provisioned',
      description: `Provisioned by admin ${user.email ?? user.id}`,
      outcome: 'success',
      detail: { admin_id: user.id, phone, role: finalRole, via: 'admin-panel' },
    });
    steps.push({ step: 'audit.log', ok: true });

    return json({ ok: true, steps, vps_response: vpsResponse });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[admin-mate-provision] Uncaught error:', message);
    return json({ ok: false, steps, error: message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  });
}
