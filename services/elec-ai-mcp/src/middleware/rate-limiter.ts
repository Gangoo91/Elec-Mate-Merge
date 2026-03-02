/**
 * Per-user rate limiting — SECURITY.md §8
 *
 * Enforces:
 *   - 200 tool calls per hour per user
 *   - 10 tool calls per 5 seconds (burst protection)
 *   - Daily limits on outbound actions (100 messages, 30 invoices, 20 outreach)
 *
 * Uses in-memory sliding window. For multi-instance deployments, replace with Redis.
 */

/** Rate limit configuration per SECURITY.md */
const LIMITS = {
  /** Max tool calls per hour */
  hourly: 200,
  /** Max tool calls per 5-second burst window */
  burst: 10,
  burstWindowMs: 5_000,
  /** Daily limits by action category */
  daily: {
    outbound_message: 100,
    invoice_sent: 30,
    client_outreach: 20,
    calendar_modification: 50,
  },
} as const;

type DailyCategory = keyof typeof LIMITS.daily;

interface UserBucket {
  /** Timestamps of recent tool calls (sliding window) */
  hourlyCalls: number[];
  /** Timestamps of burst-window calls */
  burstCalls: number[];
  /** Daily action counters — reset at midnight UTC */
  dailyCounts: Record<DailyCategory, number>;
  /** Date string (YYYY-MM-DD) for daily reset */
  dailyDate: string;
}

/** In-memory store — keyed by userId */
const buckets = new Map<string, UserBucket>();

/** Clean up stale buckets every 10 minutes */
const cleanupInterval = setInterval(() => {
  const cutoff = Date.now() - 3_600_000; // 1 hour
  for (const [userId, bucket] of buckets) {
    bucket.hourlyCalls = bucket.hourlyCalls.filter((t) => t > cutoff);
    if (bucket.hourlyCalls.length === 0 && bucket.burstCalls.length === 0) {
      buckets.delete(userId);
    }
  }
}, 600_000);

/** Stop the cleanup interval (call on graceful shutdown) */
export function cleanupRateLimiter(): void {
  clearInterval(cleanupInterval);
  buckets.clear();
}

function getBucket(userId: string): UserBucket {
  const today = new Date().toISOString().slice(0, 10);
  let bucket = buckets.get(userId);

  if (!bucket) {
    bucket = {
      hourlyCalls: [],
      burstCalls: [],
      dailyCounts: {
        outbound_message: 0,
        invoice_sent: 0,
        client_outreach: 0,
        calendar_modification: 0,
      },
      dailyDate: today,
    };
    buckets.set(userId, bucket);
  }

  // Reset daily counts at midnight
  if (bucket.dailyDate !== today) {
    bucket.dailyCounts = {
      outbound_message: 0,
      invoice_sent: 0,
      client_outreach: 0,
      calendar_modification: 0,
    };
    bucket.dailyDate = today;
  }

  return bucket;
}

export class RateLimitError extends Error {
  public readonly retryAfterMs: number;

  constructor(message: string, retryAfterMs: number) {
    super(message);
    this.name = 'RateLimitError';
    this.retryAfterMs = retryAfterMs;
  }
}

/**
 * Check and record a tool call against rate limits.
 * Throws RateLimitError if any limit is exceeded.
 */
export function checkRateLimit(userId: string, toolName: string): void {
  const now = Date.now();
  const bucket = getBucket(userId);

  // ── Burst check (10 calls per 5 seconds) ───────────────────────────
  const burstCutoff = now - LIMITS.burstWindowMs;
  bucket.burstCalls = bucket.burstCalls.filter((t) => t > burstCutoff);

  if (bucket.burstCalls.length >= LIMITS.burst) {
    const oldestBurst = bucket.burstCalls[0];
    const retryAfter = LIMITS.burstWindowMs - (now - oldestBurst);
    throw new RateLimitError(
      `Burst limit exceeded (${LIMITS.burst} calls per ${LIMITS.burstWindowMs / 1000}s). Slow down.`,
      retryAfter
    );
  }

  // ── Hourly check (200 calls per hour) ──────────────────────────────
  const hourlyCutoff = now - 3_600_000;
  bucket.hourlyCalls = bucket.hourlyCalls.filter((t) => t > hourlyCutoff);

  if (bucket.hourlyCalls.length >= LIMITS.hourly) {
    const oldestHourly = bucket.hourlyCalls[0];
    const retryAfter = 3_600_000 - (now - oldestHourly);
    throw new RateLimitError(
      `Hourly rate limit exceeded (${LIMITS.hourly}/hour). I've hit my hourly limit for tool calls. This is a safety measure.`,
      retryAfter
    );
  }

  // Record the call
  bucket.hourlyCalls.push(now);
  bucket.burstCalls.push(now);
}

/**
 * Check and record a daily action limit.
 * Call this for outbound actions (sends, invoices, outreach, calendar).
 */
export function checkDailyLimit(userId: string, category: DailyCategory): void {
  const bucket = getBucket(userId);
  const limit = LIMITS.daily[category];
  const current = bucket.dailyCounts[category];

  if (current >= limit) {
    throw new RateLimitError(
      `Daily limit reached for ${category.replace(/_/g, ' ')} (${limit}/day). This is a safety measure. If you need more, contact Elec-Mate support.`,
      0
    );
  }

  bucket.dailyCounts[category]++;
}

/** Map tool names to daily limit categories */
const DAILY_LIMIT_TOOLS: Record<string, DailyCategory> = {
  send_approved_message: 'outbound_message',
  send_email_reply: 'outbound_message',
  send_quote: 'outbound_message',
  send_certificate: 'outbound_message',
  send_invoice: 'outbound_message',
  send_client_expiry_reminders: 'client_outreach',
  create_calendar_event: 'calendar_modification',
};

/**
 * Combined rate limit check — call before every tool execution.
 */
export function enforceRateLimits(userId: string, toolName: string): void {
  // Always check burst + hourly
  checkRateLimit(userId, toolName);

  // Check daily limit for categorised tools
  const dailyCategory = DAILY_LIMIT_TOOLS[toolName];
  if (dailyCategory) {
    checkDailyLimit(userId, dailyCategory);
  }
}
