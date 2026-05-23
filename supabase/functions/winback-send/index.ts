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
} from '../_shared/winback-v12.ts';
import { sendEmail } from '../_shared/mailer.ts';

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

    // 2. For each row, check the user hasn't quietly resubscribed since
    //    we queued them. Single batched profile read.
    const userIds = [...new Set(queue.map((r) => r.user_id))];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, subscribed, subscription_tier')
      .in('id', userIds);
    const subscribedAgain = new Set(
      (profiles ?? []).filter((p) => p.subscribed).map((p) => p.id)
    );

    let sent = 0;
    let skipped = 0;
    let failed = 0;

    for (const row of queue) {
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
            'List-Unsubscribe':
              '<mailto:founder@elec-mate.com?subject=unsubscribe%20winback>',
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
      processed: queue.length,
      sent,
      skipped,
      failed,
      dry_run: dryRun,
    });
  } catch (error) {
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
