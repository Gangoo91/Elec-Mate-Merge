/**
 * winback-send
 * ───────────────────────────────────────────────────────────────────────
 * Cron-driven worker. Drains public.winback_queue:
 *
 *   1. Pull pending rows where scheduled_for <= now()
 *   2. Skip ones whose user has resubscribed since cancellation (we don't
 *      want to win-back somebody who already came back)
 *   3. Render the right touch (1/2/3) from winback-v12
 *   4. Send via Resend, from founder@elec-mate.com, reply-to founder
 *   5. Mark sent / failed / skipped
 *
 * Schedule (recommended): pg_cron every 15 minutes.
 *
 *   select cron.schedule('winback-send', '*\/15 * * * *',
 *     $$ select net.http_post(
 *       url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/winback-send',
 *       headers := '{"Authorization": "Bearer <SERVICE_ROLE_KEY>"}'::jsonb
 *     ); $$);
 *
 * Can also be triggered manually from the admin panel for testing — pass
 * `?dry_run=1` to render without sending.
 */

import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import {
  winbackTouch1,
  winbackTouch2,
  winbackTouch3,
  WINBACK_FROM,
  WINBACK_REPLY_TO,
  type WinbackContext,
} from '../_shared/winback-v13.ts';
import { sendEmail } from '../_shared/mailer.ts';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

const log = (step: string, details?: unknown) => {
  const d = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[WINBACK-SEND] ${step}${d}`);
};

const BATCH_SIZE = 150;
const SEND_GAP_MS = 150;
// Anti-overwhelm: a user never gets more than one winback touch per run. Any
// other touches that happen to be due for the same user get pushed out by this
// gap so follow-ups stay spaced instead of landing together after a backlog.
const PER_USER_DEFER_MS = 2 * 24 * 60 * 60 * 1000; // ~2 days

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface QueueRow {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  tier: string;
  stripe_customer_id: string | null;
  was_trial: boolean;
  cancelled_at: string;
  touch_number: number;
  scheduled_for: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    // BREVO_API_KEY is read inside the mailer shim — no need to check here.

    const url = new URL(req.url);
    const dryRun = url.searchParams.get('dry_run') === '1';

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 1. Pull due pending rows
    const { data: rows, error: pullErr } = await supabase
      .from('winback_queue')
      .select(
        'id, user_id, email, full_name, tier, stripe_customer_id, was_trial, cancelled_at, touch_number, scheduled_for'
      )
      .eq('status', 'pending')
      .lte('scheduled_for', new Date().toISOString())
      .order('scheduled_for', { ascending: true })
      .limit(BATCH_SIZE);

    if (pullErr) throw new Error(`Queue pull failed: ${pullErr.message}`);
    const queue = (rows ?? []) as QueueRow[];
    log('Pulled queue', { count: queue.length, dryRun });

    if (queue.length === 0) {
      return jsonResponse({ ok: true, processed: 0, message: 'Nothing due.' });
    }

    // ── Anti-overwhelm guard ─────────────────────────────────────────────
    // Send each user at most ONE touch per run. The pull is ordered by
    // scheduled_for asc, so the first row we see for a user is their earliest
    // due touch — keep that, and push any other due touches for the same user
    // ~2 days out so a backlog spreads into a proper cadence instead of
    // hitting someone with 2–3 emails at once.
    const seenUser = new Set<string>();
    const batch: QueueRow[] = [];
    const deferred: QueueRow[] = [];
    for (const row of queue) {
      if (seenUser.has(row.user_id)) {
        deferred.push(row);
      } else {
        seenUser.add(row.user_id);
        batch.push(row);
      }
    }
    if (deferred.length > 0 && !dryRun) {
      const nextAt = new Date(Date.now() + PER_USER_DEFER_MS).toISOString();
      for (const row of deferred) {
        await supabase.from('winback_queue').update({ scheduled_for: nextAt }).eq('id', row.id);
      }
      log('Deferred extra touches to keep cadence', { count: deferred.length, nextAt });
    }

    // 2. For each row, check the user hasn't quietly resubscribed since
    //    we queued them. Single batched profile read.
    const userIds = [...new Set(batch.map((r) => r.user_id))];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, subscribed, subscription_tier')
      .in('id', userIds);
    const subscribedAgain = new Set((profiles ?? []).filter((p) => p.subscribed).map((p) => p.id));

    // 2b. …and that the PERSON hasn't got an active subscription on a DIFFERENT
    //     account. The check above only ever looked at the queued account, so
    //     somebody with two accounts could be paying full price on one while
    //     being chased with a discount on the other.
    //
    //     That is not hypothetical. Josh Green cancelled a free trial on
    //     info@greenvoltservices.co.uk on 23 Jul and ran the full three-touch
    //     sequence, while paying full price on the App Store the whole time
    //     under j.greenelectrical@outlook.com. Five minutes after touch 3
    //     landed he took the £9.99-for-life offer — so a customer who had never
    //     churned was handed a permanent 50% cut, and the Apple subscription he
    //     will now cancel was worth more than the Stripe one replacing it.
    //     Shane Godliman was queued to repeat it exactly (App Store, renewing
    //     19 Sep) and had to be held back by hand.
    //
    //     Matched on name because it is the only signal shared across accounts —
    //     the emails differ by definition, or they would be the same account.
    //     Two guards keep it conservative, because a false positive here
    //     silently suppresses a winback we genuinely want to send:
    //
    //       1. Forename AND surname. A lone "Adam" or "Adrian" collides with
    //          half the user base.
    //       2. The name must appear on EXACTLY two accounts. The data splits
    //          cleanly on this: every real duplicate — Josh Green, Shane
    //          Godliman, Luke Hall, Joe Baxter, Luke Parfitt — sits on exactly
    //          2, while "John Smith" sits on 5 and is plainly several different
    //          people (or a placeholder). Three or more means the name is not
    //          identifying anybody.
    //
    //     It therefore UNDER-catches by design: someone who typed their name
    //     differently on the two accounts still slips through. Every catch is a
    //     real one, which is the trade worth making.
    const normaliseName = (n?: string | null) => (n || '').trim().toLowerCase().replace(/\s+/g, ' ');
    const isMatchableName = (n: string) => n.length >= 5 && n.split(' ').length >= 2;

    // Explicit range: PostgREST caps an unbounded select at 1000 rows, which
    // would silently truncate the name index and quietly stop catching people.
    const { data: allProfiles } = await supabase
      .from('profiles')
      .select('id, full_name, subscribed')
      .range(0, 49999);

    const accountsPerName = new Map<string, number>();
    const activeIdsByName = new Map<string, string[]>();
    for (const p of allProfiles ?? []) {
      const key = normaliseName(p.full_name);
      if (!isMatchableName(key)) continue;
      accountsPerName.set(key, (accountsPerName.get(key) ?? 0) + 1);
      if (p.subscribed) {
        activeIdsByName.set(key, [...(activeIdsByName.get(key) ?? []), p.id]);
      }
    }

    const activeElsewhere = (row: QueueRow): string[] => {
      const key = normaliseName(row.full_name);
      if (!isMatchableName(key)) return [];
      if ((accountsPerName.get(key) ?? 0) !== 2) return []; // not a distinctive name
      return (activeIdsByName.get(key) ?? []).filter((id) => id !== row.user_id);
    };

    // 2c. Honour the suppression list. This function never read it, so a
    //     winback would still land on somebody who had unsubscribed — the one
    //     campaign most likely to annoy the people least pleased with us. It is
    //     also the only durable way to keep a specific address out: the
    //     RevenueCat enqueue path checks nothing but "a recent winback row
    //     exists", so skipping queued rows by hand is undone the next time
    //     someone subscribes and cancels again.
    //     Read whole and compared lower-cased, rather than filtered with
    //     `.in()`: the filter is case-SENSITIVE, so a stored `Foo@Bar.com`
    //     would never match a queued `foo@bar.com` and the suppression would
    //     silently do nothing. Same explicit range as above, for the same
    //     reason — an unbounded select stops at 1000 rows.
    const { data: suppressedRows } = await supabase
      .from('email_suppressions')
      .select('email')
      .range(0, 49999);
    const suppressed = new Set(
      (suppressedRows ?? []).map((s) => (s.email || '').trim().toLowerCase()).filter(Boolean)
    );

    let sent = 0;
    let skipped = 0;
    let failed = 0;

    for (const row of batch) {
      // Skip — they came back to us, no point chasing
      if (subscribedAgain.has(row.user_id)) {
        await supabase
          .from('winback_queue')
          .update({
            status: 'skipped',
            skip_reason: 'resubscribed',
            sent_at: new Date().toISOString(),
          })
          .eq('id', row.id);
        skipped++;
        continue;
      }

      // Skip — suppressed address. Either they unsubscribed, or they have been
      // blocked deliberately.
      if (suppressed.has((row.email || '').trim().toLowerCase())) {
        await supabase
          .from('winback_queue')
          .update({
            status: 'skipped',
            skip_reason: 'email_suppressed',
            sent_at: new Date().toISOString(),
          })
          .eq('id', row.id);
        skipped++;
        continue;
      }

      // Skip — same person, still paying us somewhere else. Chasing them with a
      // discount can only cost money: the best case is they move their own
      // subscription onto a cheaper plan.
      const otherActive = activeElsewhere(row);
      if (otherActive.length > 0) {
        await supabase
          .from('winback_queue')
          .update({
            status: 'skipped',
            skip_reason: `active_subscription_on_another_account:${otherActive.join(',')}`,
            sent_at: new Date().toISOString(),
          })
          .eq('id', row.id);
        log('Skipped — active subscription on another account', {
          userId: row.user_id,
          email: row.email,
          otherAccountIds: otherActive,
          touch: row.touch_number,
        });
        skipped++;
        continue;
      }

      if (!row.email) {
        await supabase
          .from('winback_queue')
          .update({
            status: 'skipped',
            skip_reason: 'no_email',
            sent_at: new Date().toISOString(),
          })
          .eq('id', row.id);
        skipped++;
        continue;
      }

      const ctx: WinbackContext = {
        firstName: (row.full_name || '').split(' ')[0] || 'mate',
        tier: row.tier || 'unknown',
        wasTrial: !!row.was_trial,
        // Stamp the pay link so Stripe's webhook can match the payment back to
        // this exact account via client_reference_id (not the email they type).
        userId: row.user_id,
        accountEmail: row.email,
      };

      const email =
        row.touch_number === 1
          ? winbackTouch1(ctx)
          : row.touch_number === 2
            ? winbackTouch2(ctx)
            : winbackTouch3(ctx);

      if (dryRun) {
        log('DRY RUN render', { id: row.id, touch: row.touch_number, subject: email.subject });
        sent++;
        continue;
      }

      try {
        // Brevo via _shared/mailer.ts (Resend was banned at domain level —
        // Brevo is the sole supported sender now). Same signature.
        const result = await sendEmail({
          from: WINBACK_FROM,
          to: row.email,
          replyTo: WINBACK_REPLY_TO,
          subject: email.subject,
          html: email.html,
          text: email.text,
          headers: {
            'List-Unsubscribe': '<mailto:founder@elec-mate.com?subject=unsubscribe%20winback>',
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
        });

        if (result.error) {
          throw new Error(result.error.message);
        }

        await supabase
          .from('winback_queue')
          .update({
            status: 'sent',
            sent_at: new Date().toISOString(),
            email_provider_id: result.data?.id ?? null,
          })
          .eq('id', row.id);
        sent++;
        log('Sent', { id: row.id, touch: row.touch_number, to: row.email });
      } catch (sendErr) {
        const msg = sendErr instanceof Error ? sendErr.message : String(sendErr);
        await supabase
          .from('winback_queue')
          .update({
            status: 'failed',
            sent_at: new Date().toISOString(),
            error_message: msg.slice(0, 500),
          })
          .eq('id', row.id);
        failed++;
        log('Send failed', { id: row.id, error: msg });
      }

      // Resend rate limit politeness
      await sleep(SEND_GAP_MS);
    }

    return jsonResponse({
      ok: true,
      processed: batch.length,
      deferred: deferred.length,
      sent,
      skipped,
      failed,
      dry_run: dryRun,
    });
  } catch (error) {
    await captureException(error, {
      functionName: 'winback-send',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    const message = error instanceof Error ? error.message : String(error);
    log('FATAL', { message });
    return jsonResponse({ ok: false, error: message }, 500);
  }
});

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status,
  });
}
