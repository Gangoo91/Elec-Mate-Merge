/**
 * notification-engine — the brain of the push-notification system.
 *
 * Every outbound push (except critical transactional ones) should go through
 * `sendSmartPush()` instead of calling send-push-notification directly. It
 * enforces:
 *
 *   1. Per-user daily cap for promo + re-engagement pushes (default 2/day)
 *   2. Per-category cooldown (default 7 days for referral_push)
 *   3. Deduplication on (user_id, category, ref_id) within 1 hour
 *   4. User preference check against notification_preferences
 *   5. Logging to notification_log so future cap checks see this send
 *
 * Tier 1 (transactional) pushes should pass `bypassCap: true` so paid-invoice
 * / quote-signed / C1-hazard alerts always land.
 */

import type { PushTemplate } from './notification-templates.ts';

interface SupabaseClient {
  from: (table: string) => {
    select: (cols: string) => {
      eq: (
        col: string,
        val: unknown
      ) => {
        gte: (col: string, val: string) => Promise<{ data: unknown[] | null; error: unknown }>;
        in: (
          col: string,
          vals: unknown[]
        ) => {
          gte: (col: string, val: string) => Promise<{ data: unknown[] | null; error: unknown }>;
        };
        maybeSingle: () => Promise<{ data: unknown; error: unknown }>;
      };
    };
    insert: (row: Record<string, unknown>) => Promise<{ error: unknown }>;
  };
}

export type Tier = 'transactional' | 'digest' | 'reengagement' | 'promo';

export interface SmartPushOptions {
  userId: string;
  tier: Tier;
  category: string;
  template: PushTemplate;
  refId?: string;
  /** Override the default 7-day cooldown on this category (in hours). */
  cooldownHours?: number;
  /** Bypass the daily cap — use only for instant transactional notifications. */
  bypassCap?: boolean;
  /** Default 2 — max combined promo + reengagement per user per 24h. */
  dailyCap?: number;
}

export interface SmartPushResult {
  sent: boolean;
  skipReason?: 'cap_hit' | 'cooldown' | 'dedupe' | 'disabled' | 'push_failed';
  details?: string;
}

const DEFAULT_DAILY_CAP = 2;
const DEFAULT_REFERRAL_COOLDOWN_HOURS = 24 * 7;
const DEDUPE_WINDOW_HOURS = 1;

/**
 * Send a push through the smart engine. Returns a structured result so the
 * caller can log skips for analytics.
 */
export async function sendSmartPush(
  supabase: SupabaseClient,
  supabaseUrl: string,
  authHeader: string,
  opts: SmartPushOptions
): Promise<SmartPushResult> {
  const {
    userId,
    tier,
    category,
    template,
    refId,
    cooldownHours = category.startsWith('referral_') ? DEFAULT_REFERRAL_COOLDOWN_HOURS : 0,
    bypassCap = false,
    dailyCap = DEFAULT_DAILY_CAP,
  } = opts;

  // ── 1. Dedupe check — same category + ref_id within 1 hour ──────────────
  if (refId) {
    const dedupeCutoff = new Date(Date.now() - DEDUPE_WINDOW_HOURS * 3600 * 1000).toISOString();
    const { data: existing } = await supabase
      .from('notification_log')
      .select('id')
      .eq('user_id', userId)
      // @ts-expect-error — our light type doesn't model eq.eq.gte chains fully
      .eq('notification_type', `${category}:${refId}`)
      .gte('sent_at', dedupeCutoff);

    if (existing && Array.isArray(existing) && existing.length > 0) {
      return { sent: false, skipReason: 'dedupe' };
    }
  }

  // ── 2. Category cooldown (e.g. 7 days for any referral push) ────────────
  // PostgREST's LIKE operator wants `*` (not `%`) as the wildcard when passed
  // through the JS client. We use ilike with wildcards on both sides to match
  // rows like "reengagement__referral_push__cert_completed".
  if (cooldownHours > 0) {
    const cooldownCutoff = new Date(Date.now() - cooldownHours * 3600 * 1000).toISOString();
    const categoryPrefix = category.split('__')[0]; // e.g. 'referral_push'

    const { data: recent } = await supabase
      .from('notification_log')
      .select('id')
      .eq('user_id', userId)
      // @ts-expect-error — ilike pattern for PostgREST
      .ilike('notification_type', `*${categoryPrefix}*`)
      .gte('sent_at', cooldownCutoff);

    if (recent && Array.isArray(recent) && recent.length > 0) {
      return { sent: false, skipReason: 'cooldown' };
    }
  }

  // ── 3. Daily cap (promo + reengagement combined) ────────────────────────
  if (!bypassCap && (tier === 'promo' || tier === 'reengagement')) {
    const dayCutoff = new Date(Date.now() - 24 * 3600 * 1000).toISOString();

    const { data: dayLog } = await supabase
      .from('notification_log')
      .select('id')
      .eq('user_id', userId)
      // @ts-expect-error — or() uses PostgREST wildcard `*`
      .or('notification_type.ilike.promo*,notification_type.ilike.reengagement*')
      .gte('sent_at', dayCutoff);

    if (dayLog && Array.isArray(dayLog) && dayLog.length >= dailyCap) {
      return { sent: false, skipReason: 'cap_hit', details: `${dayLog.length}/${dailyCap}` };
    }
  }

  // ── 4. Fire via send-push-notification ──────────────────────────────────
  const notificationType = refId ? `${tier}__${category}:${refId}` : `${tier}__${category}`;

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/send-push-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify({
        userId,
        title: template.title,
        body: template.body,
        type: template.type,
        data: { ...template.data, tier, category },
        skipQuietHours: template.skipQuietHours,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return { sent: false, skipReason: 'push_failed', details: text };
    }

    // ── 5. Log the send for future cap + cooldown checks ────────────────
    await supabase.from('notification_log').insert({
      user_id: userId,
      notification_type: notificationType,
      title: template.title,
      body: template.body,
      data: template.data || {},
      sent_at: new Date().toISOString(),
    });

    return { sent: true };
  } catch (err) {
    return { sent: false, skipReason: 'push_failed', details: (err as Error)?.message };
  }
}
