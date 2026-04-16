// Public one-click unsubscribe endpoint (RFC 8058 compliant).
// Supports:
//   GET  /unsubscribe?token=...            → renders confirm page
//   GET  /unsubscribe?token=...&confirm=1  → unsubscribes, renders success
//   POST /unsubscribe (body or ?token=...) → one-click unsubscribe (Gmail, Yahoo)
//
// Token format: `${payloadB64}.${sigB64}`
//   payload = { email, issued_at } JSON → base64url
//   sig     = HMAC-SHA256(payload, WINBACK_UNSUBSCRIBE_SECRET) → base64url
//
// Env required: WINBACK_UNSUBSCRIBE_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

const htmlHeaders = {
  ...corsHeaders,
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'no-store',
};

const SECRET = Deno.env.get('WINBACK_UNSUBSCRIBE_SECRET');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

function b64urlEncode(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(str: string): Uint8Array {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (str.length % 4)) % 4);
  const bin = atob(padded);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacSign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return b64urlEncode(new Uint8Array(sig));
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

async function verifyToken(token: string): Promise<{ email: string; issued_at: number } | null> {
  if (!SECRET) throw new Error('WINBACK_UNSUBSCRIBE_SECRET not configured');
  const dot = token.indexOf('.');
  if (dot <= 0) return null;
  const payloadB64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = await hmacSign(payloadB64, SECRET);
  if (!timingSafeEqual(sig, expected)) return null;
  try {
    const payloadStr = new TextDecoder().decode(b64urlDecode(payloadB64));
    const payload = JSON.parse(payloadStr);
    if (typeof payload.email !== 'string' || typeof payload.issued_at !== 'number') return null;
    return payload;
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    let token = url.searchParams.get('token');

    // RFC 8058 one-click POST: token may be in the body as form data or the URL
    if (!token && req.method === 'POST') {
      const contentType = req.headers.get('content-type') || '';
      if (contentType.includes('application/x-www-form-urlencoded')) {
        const form = await req.formData();
        token = (form.get('token') as string) || null;
      } else if (contentType.includes('application/json')) {
        const body = await req.json().catch(() => ({}));
        token = body.token || null;
      }
    }

    if (!token) {
      return new Response(
        pageHtml({
          title: 'Missing token',
          message:
            'This unsubscribe link is incomplete. Forward the email to info@elec-mate.com and we will remove you manually.',
          status: 'error',
        }),
        { headers: htmlHeaders, status: 400 }
      );
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return new Response(
        pageHtml({
          title: 'Invalid link',
          message:
            "This unsubscribe link isn't valid or has been tampered with. Email info@elec-mate.com and we will remove you.",
          status: 'error',
        }),
        { headers: htmlHeaders, status: 400 }
      );
    }

    const email = payload.email.toLowerCase().trim();

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase credentials not configured');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // GET without ?confirm=1 → render the confirmation page (requires a click)
    if (req.method === 'GET' && url.searchParams.get('confirm') !== '1') {
      return new Response(confirmPageHtml(email, token), {
        headers: htmlHeaders,
        status: 200,
      });
    }

    // Either POST (one-click) or GET with ?confirm=1 → suppress
    const reason =
      req.method === 'POST' ? 'user_unsubscribed_one_click' : 'user_unsubscribed_confirmed';

    const { error: suppressError } = await supabase.from('email_suppressions').upsert(
      {
        email,
        reason,
        source: 'winback_unsubscribe',
        unsubscribed_at: new Date().toISOString(),
        metadata: { issued_at: payload.issued_at, method: req.method },
      },
      { onConflict: 'email' }
    );

    if (suppressError) {
      console.error('email_suppressions upsert failed:', suppressError);
      return new Response(
        pageHtml({
          title: 'Something went wrong',
          message:
            'We had a problem processing that. Email info@elec-mate.com and we will remove you manually.',
          status: 'error',
        }),
        { headers: htmlHeaders, status: 500 }
      );
    }

    // One-click POSTs expect a minimal 2xx (bodies ignored by mail providers)
    if (req.method === 'POST') {
      return new Response('OK', { headers: corsHeaders, status: 200 });
    }

    return new Response(
      pageHtml({
        title: "You're unsubscribed",
        message: `We won't send any more marketing emails to ${escapeHtml(email)}. If that was a mistake, reply to info@elec-mate.com and we'll re-subscribe you.`,
        status: 'success',
      }),
      { headers: htmlHeaders, status: 200 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('unsubscribe error:', msg);
    return new Response(
      pageHtml({
        title: 'Something went wrong',
        message:
          'We had a problem processing that. Email info@elec-mate.com and we will remove you manually.',
        status: 'error',
      }),
      { headers: htmlHeaders, status: 500 }
    );
  }
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function pageShell(bodyHtml: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="dark light"><title>Elec-Mate &middot; Unsubscribe</title><style>
:root{color-scheme:dark light}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#000;color:#e4e4e7;line-height:1.5}
.card{width:100%;max-width:440px;background:#0a0a0a;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;text-align:center}
.logo{width:72px;height:72px;border-radius:16px;display:inline-block;margin-bottom:24px}
h1{margin:0 0 12px;font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.3px}
p{margin:0 0 8px;font-size:14px;color:#a1a1aa;line-height:1.6}
button,.btn{display:inline-block;margin-top:20px;padding:13px 28px;background:linear-gradient(135deg,#fbbf24,#f59e0b);border:0;border-radius:12px;font-size:14px;font-weight:700;color:#0a0a0a;cursor:pointer;font-family:inherit;text-decoration:none}
.btn-ghost{background:transparent;color:#a1a1aa;border:1px solid rgba(255,255,255,0.1);margin-left:8px}
.mute{font-size:12px;color:#52525b;margin-top:20px}
.ok{color:#4ade80}
.err{color:#fb7185}
@media (prefers-color-scheme: light){
  body{background:#fafafa;color:#18181b}
  .card{background:#fff;border-color:#e4e4e7}
  h1{color:#18181b}
  p{color:#52525b}
  .btn-ghost{color:#52525b;border-color:#e4e4e7}
  .mute{color:#a1a1aa}
}
</style></head><body>${bodyHtml}</body></html>`;
}

function pageHtml({
  title,
  message,
  status,
}: {
  title: string;
  message: string;
  status: 'success' | 'error';
}): string {
  const statusClass = status === 'success' ? 'ok' : 'err';
  return pageShell(`<div class="card">
<img class="logo" src="https://www.elec-mate.com/pwa-512x512.png" alt="Elec-Mate" width="72" height="72">
<h1 class="${statusClass}">${escapeHtml(title)}</h1>
<p>${message}</p>
<p class="mute">Elec-Mate Ltd &middot; Built in the UK</p>
</div>`);
}

function confirmPageHtml(email: string, token: string): string {
  const safeToken = escapeHtml(token);
  const safeEmail = escapeHtml(email);
  return pageShell(`<div class="card">
<img class="logo" src="https://www.elec-mate.com/pwa-512x512.png" alt="Elec-Mate" width="72" height="72">
<h1>Unsubscribe from marketing</h1>
<p>We'll stop sending marketing emails to <strong style="color:#fbbf24">${safeEmail}</strong>.</p>
<p style="margin-top:8px">Important account emails (receipts, password resets, security) will still come through.</p>
<form method="POST" action="?">
  <input type="hidden" name="token" value="${safeToken}">
  <button type="submit">Confirm unsubscribe</button>
  <a class="btn btn-ghost" href="https://www.elec-mate.com">Never mind</a>
</form>
<p class="mute">Questions? Reply to info@elec-mate.com</p>
</div>`);
}
