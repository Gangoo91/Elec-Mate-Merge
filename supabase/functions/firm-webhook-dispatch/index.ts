/**
 * firm-webhook-dispatch (ELE-2077): deliver queued firm webhook events.
 *
 * Called every minute by pg_cron with the service-role key (nobody else).
 * Claims up to 50 due deliveries (_firm_webhook_claim leases each for two
 * minutes, so overlapping runs never double-send), POSTs each one and reports
 * back (_firm_webhook_result), which schedules retries at 1m, 5m, 30m, 2h,
 * 12h and 24h, then marks the delivery dead. An endpoint that fails 100 times
 * in a row is switched off.
 *
 * Each request:
 *   POST <the firm's https URL>
 *   Content-Type: application/json
 *   Elec-Mate-Event: invoice.paid
 *   Elec-Mate-Delivery: <delivery id>   (the same on every retry: dedupe on it)
 *   Elec-Mate-Signature: t=<unix seconds>,v1=<hex HMAC-SHA256(secret, "<t>.<raw body>")>
 *
 * A 2xx within 10 seconds is success. Redirects are not followed, and an
 * address that resolves to a private or local IP is refused.
 * NOT DEPLOYED, no cron yet: see docs/firm-api.md.
 */
import { createClient } from '../_shared/deps.ts';
import { identifyCaller } from '../_shared/caller.ts';
import { hmacHex } from '../_shared/messaging/adapters.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const PRIVATE_V4 =
  /^(10\.|127\.|0\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.)/;
const PRIVATE_V6 = /^(::1$|::$|f[cd][0-9a-f]{2}:|fe80:|::ffff:)/i;

async function publicHost(url: string): Promise<boolean> {
  let host: string;
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:') return false;
    host = u.hostname.toLowerCase();
  } catch {
    return false;
  }
  if (host === 'localhost' || host.endsWith('.local') || host.endsWith('.internal')) return false;
  if (PRIVATE_V4.test(host) || PRIVATE_V6.test(host.replace(/^\[|\]$/g, ''))) return false;
  try {
    const a = await Deno.resolveDns(host, 'A').catch(() => [] as string[]);
    const aaaa = await Deno.resolveDns(host, 'AAAA').catch(() => [] as string[]);
    if (!a.length && !aaaa.length) return false;
    if (a.some((ip) => PRIVATE_V4.test(ip)) || aaaa.some((ip) => PRIVATE_V6.test(ip))) return false;
  } catch {
    // resolveDns unavailable in this runtime: the database already refused
    // literal private hosts when the webhook was saved.
  }
  return true;
}

Deno.serve(async (req) => {
  const caller = await identifyCaller(req);
  if (!caller || caller.kind !== 'service') return new Response('Unauthorised', { status: 401 });

  const db = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
  const { data: due, error } = await db.rpc('_firm_webhook_claim', { p_limit: 50 });
  if (error) {
    console.error('firm-webhook-dispatch: claim failed', error.message);
    return new Response(JSON.stringify({ error: 'claim failed' }), { status: 500 });
  }
  const rows = (due ?? []) as {
    id: string;
    url: string;
    secret: string;
    event: string;
    payload: unknown;
    attempts: number;
  }[];

  let delivered = 0;
  let failed = 0;
  await Promise.all(
    rows.map(async (d) => {
      let ok = false;
      let status: number | null = null;
      let err: string | null = null;
      try {
        if (!(await publicHost(d.url))) throw new Error('Address is not a public https URL');
        const body = JSON.stringify(d.payload);
        const t = Math.floor(Date.now() / 1000).toString();
        const sig = await hmacHex('SHA-256', d.secret, `${t}.${body}`);
        const res = await fetch(d.url, {
          method: 'POST',
          redirect: 'manual',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Elec-Mate-Webhooks/1',
            'Elec-Mate-Event': d.event,
            'Elec-Mate-Delivery': d.id,
            'Elec-Mate-Signature': `t=${t},v1=${sig}`,
          },
          body,
          signal: AbortSignal.timeout(10_000),
        });
        status = res.status;
        ok = res.status >= 200 && res.status < 300;
        if (!ok) err = `HTTP ${res.status}: ${(await res.text().catch(() => '')).slice(0, 200)}`;
        else await res.body?.cancel();
      } catch (e) {
        err = (e as Error).message;
      }
      const { error: rErr } = await db.rpc('_firm_webhook_result', {
        p_id: d.id,
        p_ok: ok,
        p_status: status,
        p_error: err,
      });
      if (rErr) console.error('firm-webhook-dispatch: result failed', d.id, rErr.message);
      if (ok) delivered++;
      else failed++;
    })
  );

  return new Response(JSON.stringify({ claimed: rows.length, delivered, failed }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
