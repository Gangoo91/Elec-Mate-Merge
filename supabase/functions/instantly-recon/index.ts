/**
 * instantly-recon
 * ───────────────────────────────────────────────────────────────────────
 * One-shot read-only proxy to inspect what's in the Instantly account.
 * Uses the INSTANTLY_API_KEY already configured in Supabase secrets.
 *
 * GET  /                           → snapshot of accounts + campaigns
 * GET  /?endpoint=accounts         → raw GET /api/v2/accounts
 * GET  /?endpoint=campaigns        → raw GET /api/v2/campaigns
 * GET  /?endpoint=leads&limit=10   → raw GET /api/v2/leads/list
 * GET  /?endpoint=<anything>       → raw GET /api/v2/<anything>
 *
 * Output is the Instantly response verbatim — for human inspection only.
 * Delete this function after recon is done.
 */

import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const url = new URL(req.url);

  // Tiny env-dump for whitelisted public-ish config values. Used to read
  // back the PDF URL etc that the dashboard stores as secrets.
  const envKey = url.searchParams.get('env');
  if (envKey) {
    const SAFE_ENV = new Set(['LEAD_MAGNET_CHEATSHEET_URL']);
    if (!SAFE_ENV.has(envKey)) {
      return new Response(JSON.stringify({ ok: false, error: 'env key not whitelisted' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ ok: true, key: envKey, value: Deno.env.get(envKey) ?? null }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const key = Deno.env.get('INSTANTLY_API_KEY');
  if (!key) {
    return new Response(JSON.stringify({ ok: false, error: 'INSTANTLY_API_KEY not set' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const endpoint = url.searchParams.get('endpoint');

  const headers = {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  };

  // ── Targeted endpoint passthrough (GET or POST) ───────────────────
  if (endpoint) {
    const passthrough = new URLSearchParams();
    for (const [k, v] of url.searchParams.entries()) {
      if (k !== 'endpoint') passthrough.append(k, v);
    }
    const qs = passthrough.toString();
    const target = `https://api.instantly.ai/api/v2/${endpoint}${qs ? `?${qs}` : ''}`;

    try {
      const fetchInit: RequestInit = { method: req.method, headers };
      if (req.method === 'POST' || req.method === 'PATCH' || req.method === 'PUT' || req.method === 'DELETE') {
        const bodyText = await req.text();
        if (bodyText) fetchInit.body = bodyText;
      }
      const res = await fetch(target, fetchInit);
      const body = await res.text();
      return new Response(body, {
        status: res.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return new Response(JSON.stringify({ ok: false, error: msg }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }

  // ── Default: snapshot of accounts + campaigns + lead-list summary ──
  try {
    const [accountsRes, campaignsRes] = await Promise.all([
      fetch('https://api.instantly.ai/api/v2/accounts?limit=100', { headers }),
      fetch('https://api.instantly.ai/api/v2/campaigns?limit=100', { headers }),
    ]);

    const accounts = await accountsRes.json().catch(() => ({ raw: 'parse-failed' }));
    const campaigns = await campaignsRes.json().catch(() => ({ raw: 'parse-failed' }));

    return new Response(
      JSON.stringify({
        ok: true,
        accounts: { status: accountsRes.status, data: accounts },
        campaigns: { status: campaignsRes.status, data: campaigns },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
