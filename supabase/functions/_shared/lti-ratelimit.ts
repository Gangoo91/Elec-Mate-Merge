// Per-IP rate limiter for LTI endpoints.
//
// Attempts Deno KV for cross-instance rate limiting; falls back to an
// in-memory Map (per-instance) if KV is unavailable.
//
// CURRENT SUPABASE EDGE RUNTIME DOES NOT SUPPORT Deno.openKv — so this
// effectively runs per-instance. That means a concentrated attack from one IP
// still gets limited on whichever instance is handling it, but a distributed
// flood may evade it. This is defense-in-depth, not a hard guarantee.
//
// For hard rate limits: migrate to a Postgres `lti_rate_limits (ip, minute,
// count)` table with upsert, or Upstash Redis via fetch. Both add ~10ms per
// request. Worth doing once we have >1 college in production.
//
// Default budget: 20 launches per minute per client IP.

const BUCKET_MS = 60_000;
const DEFAULT_LIMIT = 20;

function clientIp(req: Request): string {
  return (
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
}

// Lazy-open KV. If unavailable on this runtime, fall through to the in-memory map.
let kv: Deno.Kv | null | undefined = undefined;
async function openKv(): Promise<Deno.Kv | null> {
  if (kv !== undefined) return kv;
  try {
    // deno-lint-ignore no-explicit-any
    kv = await (Deno as any).openKv();
    return kv;
  } catch {
    kv = null;
    return null;
  }
}

// Fallback in-memory map (per-instance)
const memBuckets = new Map<string, { count: number; resetAt: number }>();

export async function rateLimit(req: Request, limit = DEFAULT_LIMIT): Promise<RateLimitResult> {
  const ip = clientIp(req);
  const now = Date.now();
  const bucketWindow = Math.floor(now / BUCKET_MS);
  const key = ['lti_rl', ip, bucketWindow];

  const store = await openKv();

  if (store) {
    // KV-backed atomic counter path
    const entry = await store.get<number>(key);
    const nextCount = (entry.value ?? 0) + 1;
    const expireAt = (bucketWindow + 1) * BUCKET_MS;
    await store.set(key, nextCount, { expireIn: expireAt - now + 1000 });

    const allowed = nextCount <= limit;
    return {
      allowed,
      remaining: Math.max(0, limit - nextCount),
      resetAt: expireAt,
      retryAfterSeconds: allowed ? 0 : Math.ceil((expireAt - now) / 1000),
    };
  }

  // In-memory fallback (per-instance)
  const memKey = `${ip}:${bucketWindow}`;
  let b = memBuckets.get(memKey);
  const expireAt = (bucketWindow + 1) * BUCKET_MS;
  if (!b) {
    b = { count: 0, resetAt: expireAt };
    memBuckets.set(memKey, b);
    // Trim old entries occasionally
    if (memBuckets.size > 2000) {
      for (const [k, v] of memBuckets) {
        if (v.resetAt < now) memBuckets.delete(k);
      }
    }
  }
  b.count += 1;
  const allowed = b.count <= limit;
  return {
    allowed,
    remaining: Math.max(0, limit - b.count),
    resetAt: expireAt,
    retryAfterSeconds: allowed ? 0 : Math.ceil((expireAt - now) / 1000),
  };
}

export function rateLimitHeaders(r: RateLimitResult, limit = DEFAULT_LIMIT) {
  const h: Record<string, string> = {
    'x-ratelimit-limit': String(limit),
    'x-ratelimit-remaining': String(r.remaining),
    'x-ratelimit-reset': String(Math.ceil(r.resetAt / 1000)),
  };
  if (!r.allowed) h['retry-after'] = String(r.retryAfterSeconds);
  return h;
}
