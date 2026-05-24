/**
 * invoice-payment-prompts
 * ───────────────────────────────────────────────────────────────────────
 * Cron-driven. Sends ONE aggregated in-app push per electrician reminding
 * them of unpaid invoices sent 7+ days ago. Distinct from
 * `automated-invoice-reminders` which emails the CLIENT.
 *
 * UX intent: a sparky with 6 overdue invoices gets ONE push
 *   ("You have 6 unpaid invoices totalling £4,250 — tap to review")
 * NOT six pushes.
 *
 * Single-invoice case still gets a personal copy
 *   ("Did Smith pay £350 for INV-1234? Tap to mark or chase")
 *
 * Dedup: respects last_payment_prompt_pushed_at — won't re-prompt within
 * 7 days of the last prompt for the same invoice.
 *
 * Schedule: pg_cron every 6 hours.
 */

import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-request-id',
};

const log = (step: string, details?: unknown) => {
  const d = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[INVOICE-PAYMENT-PROMPTS] ${step}${d}`);
};

// Hard cap so a runaway batch can't fire 1000s of pushes
const MAX_USERS_PER_RUN = 200;

interface QuoteRow {
  id: string;
  user_id: string;
  invoice_number: string | null;
  invoice_status: string;
  invoice_sent_at: string;
  total: number | string | null;
  client_data: Record<string, unknown> | null;
}

function clientNameFromQuote(q: QuoteRow): string {
  const cd = q.client_data ?? {};
  return (
    (typeof cd.name === 'string' && cd.name.trim()) ||
    (typeof cd.client_name === 'string' && cd.client_name.trim()) ||
    (typeof cd.company === 'string' && cd.company.trim()) ||
    'your client'
  );
}

function fmtGBP(amount: number): string {
  return amount.toLocaleString('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  });
}

interface PushBuild {
  title: string;
  body: string;
  data: Record<string, unknown>;
}

function buildSingleInvoicePush(quote: QuoteRow): PushBuild {
  const sentMs = new Date(quote.invoice_sent_at).getTime();
  const daysOpen = Math.floor((Date.now() - sentMs) / (1000 * 60 * 60 * 24));
  const amount = fmtGBP(Number(quote.total || 0));
  const client = clientNameFromQuote(quote);
  const invNum = quote.invoice_number ? ` (${quote.invoice_number})` : '';

  if (daysOpen >= 14) {
    return {
      title: `${amount} now ${daysOpen} days overdue`,
      body: `${client}${invNum} hasn't paid. Tap to mark paid or send a chase.`,
      data: { type: 'invoice', invoiceId: quote.id },
    };
  }
  return {
    title: `Did ${client} pay?`,
    body: `${amount} invoice${invNum} sent ${daysOpen} days ago — tap to mark paid or chase.`,
    data: { type: 'invoice', invoiceId: quote.id },
  };
}

function buildDigestPush(quotes: QuoteRow[]): PushBuild {
  const count = quotes.length;
  const totalAmount = quotes.reduce((sum, q) => sum + Number(q.total || 0), 0);
  const totalLabel = fmtGBP(totalAmount);
  const oldestDays = Math.floor(
    (Date.now() -
      Math.min(...quotes.map((q) => new Date(q.invoice_sent_at).getTime()))) /
      (1000 * 60 * 60 * 24)
  );

  // Subtle escalation if the oldest one is >=14 days
  const headline =
    oldestDays >= 14
      ? `${count} unpaid invoices · ${totalLabel}`
      : `You have ${count} unpaid invoices`;

  return {
    title: headline,
    body:
      oldestDays >= 14
        ? `Oldest is ${oldestDays} days overdue. Tap to review and mark paid.`
        : `${totalLabel} waiting. Tap to mark paid or send chasers.`,
    // Custom type routed by useNativeApp.ts to the quote/invoice dashboard
    data: { type: 'invoices_overdue', count, totalAmount },
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const dryRun = url.searchParams.get('dry_run') === '1';

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    // Find every eligible invoice across the whole base, then group by user.
    // Eligible = sent or overdue, sent 7+ days ago, not prompted in last 7
    // days (or never).
    const { data: rows, error: pullErr } = await supabase
      .from('quotes')
      .select(
        'id, user_id, invoice_number, invoice_status, invoice_sent_at, total, client_data, last_payment_prompt_pushed_at'
      )
      .in('invoice_status', ['sent', 'overdue'])
      .not('invoice_sent_at', 'is', null)
      .lte('invoice_sent_at', sevenDaysAgo)
      .or(`last_payment_prompt_pushed_at.is.null,last_payment_prompt_pushed_at.lte.${sevenDaysAgo}`)
      .order('invoice_sent_at', { ascending: true })
      .limit(2000); // upper bound on quotes pulled

    if (pullErr) throw new Error(`Query failed: ${pullErr.message}`);
    const allQuotes = (rows ?? []) as QuoteRow[];

    // Group by user_id
    const byUser = new Map<string, QuoteRow[]>();
    for (const q of allQuotes) {
      const arr = byUser.get(q.user_id) ?? [];
      arr.push(q);
      byUser.set(q.user_id, arr);
    }

    const userIds = [...byUser.keys()].slice(0, MAX_USERS_PER_RUN);
    log('Aggregated', {
      total_invoices: allQuotes.length,
      unique_users: byUser.size,
      processing_users: userIds.length,
      dryRun,
    });

    if (userIds.length === 0) {
      return jsonResponse({ ok: true, processed: 0, message: 'Nothing to prompt.' });
    }

    let sent = 0;
    let failed = 0;
    const nowIso = new Date().toISOString();

    for (const userId of userIds) {
      const userQuotes = byUser.get(userId)!;
      const push =
        userQuotes.length === 1
          ? buildSingleInvoicePush(userQuotes[0])
          : buildDigestPush(userQuotes);

      if (dryRun) {
        log('DRY RUN', {
          userId,
          invoice_count: userQuotes.length,
          title: push.title,
          body: push.body,
        });
        sent++;
        continue;
      }

      try {
        const { error: pushErr } = await supabase.functions.invoke('send-push-notification', {
          body: {
            userId,
            title: push.title,
            body: push.body,
            type: userQuotes.length === 1 ? 'invoice' : 'default',
            data: push.data,
          },
        });

        if (pushErr) throw new Error(pushErr.message);

        // Mark ALL of the user's eligible invoices as prompted so we
        // respect the 7-day cooldown across the whole batch.
        const ids = userQuotes.map((q) => q.id);
        const { error: updErr } = await supabase
          .from('quotes')
          .update({ last_payment_prompt_pushed_at: nowIso })
          .in('id', ids);

        if (updErr) {
          log('Dedup update failed (non-fatal)', { userId, error: updErr.message });
        }

        sent++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        log('Push send failed', { userId, error: msg });
        failed++;
      }
    }

    return jsonResponse({
      ok: true,
      total_invoices: allQuotes.length,
      users_pushed: sent,
      users_failed: failed,
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
