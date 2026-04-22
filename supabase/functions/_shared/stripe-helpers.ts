/**
 * Stripe helpers — schema-version-tolerant field readers.
 *
 * In API version 2025-04-30 (Basil), Stripe moved `current_period_end` and
 * `current_period_start` off the Subscription root and onto each Subscription
 * Item. Older API versions still return them at the root. These helpers try
 * the new location first, then fall back to the old one, so our code is
 * insulated from whichever version a given webhook or retrieve call returns.
 */

type MinimalSubscription = {
  current_period_end?: number | null;
  current_period_start?: number | null;
  items?: {
    data?: Array<{
      current_period_end?: number | null;
      current_period_start?: number | null;
    }>;
  };
};

type MinimalLogger = {
  warn: (message: string, meta?: Record<string, unknown>) => void;
};

/**
 * Extract `current_period_end` from a Stripe Subscription regardless of API version.
 * Returns a Date, or null if neither location has a value.
 * When a logger is passed, logs a warning if the field is missing from both places —
 * that's the signal that Stripe's schema has shifted again.
 */
export function getSubscriptionPeriodEnd(
  sub: MinimalSubscription | null | undefined,
  logger?: MinimalLogger,
  context?: Record<string, unknown>
): Date | null {
  if (!sub) return null;
  const fromItem = sub.items?.data?.[0]?.current_period_end;
  const fromRoot = sub.current_period_end;
  const ts = fromItem ?? fromRoot;
  if (!ts) {
    logger?.warn('Stripe subscription missing current_period_end in both item and root', context);
    return null;
  }
  return new Date(ts * 1000);
}

/**
 * Extract `current_period_start`. Same fallback logic as getSubscriptionPeriodEnd.
 */
export function getSubscriptionPeriodStart(
  sub: MinimalSubscription | null | undefined
): Date | null {
  if (!sub) return null;
  const fromItem = sub.items?.data?.[0]?.current_period_start;
  const fromRoot = sub.current_period_start;
  const ts = fromItem ?? fromRoot;
  return ts ? new Date(ts * 1000) : null;
}
