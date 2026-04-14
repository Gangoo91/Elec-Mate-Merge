/**
 * morning-digest-push
 *
 * Runs daily at 08:00 UTC via pg_cron. For each user with at least one
 * active push subscription, builds a personalised morning brief from up to
 * 3 of the highest-value signals and fires it as a single push notification.
 *
 * Signals checked, highest to lowest priority:
 *   1. Draft certs older than 2 days     (revenue — finish the sale)
 *   2. Expiring certs within 30 days     (revenue — renewal opportunity)
 *   3. Overdue invoices                  (revenue — chase payment)
 *   4. Quotes awaiting client sign-off   (revenue — gentle nudge)
 *   5. Open tasks due today              (daily workflow)
 *   6. Today's calendar events           (daily workflow)
 *
 * If a user has zero signals, NO push is sent. We never ship fluff.
 */

import { createClient, corsHeaders } from '../_shared/deps.ts';
import { buildMorningDigest, type DigestSection } from '../_shared/notification-templates.ts';
import { sendSmartPush } from '../_shared/notification-engine.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // ── Find all users with an active native push subscription ────────
    const { data: activeUsers, error: usersErr } = await supabase
      .from('push_subscriptions')
      .select('user_id')
      .eq('is_active', true);

    if (usersErr) throw usersErr;

    const uniqueUserIds = Array.from(
      new Set((activeUsers || []).map((u: { user_id: string }) => u.user_id))
    );

    let sent = 0;
    let skippedEmpty = 0;
    let skippedOther = 0;
    let failed = 0;

    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 3600 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 3600 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);

    for (const userId of uniqueUserIds) {
      const sections: DigestSection[] = [];

      // 1. Draft certs > 2 days old (priority 1 — revenue)
      const { data: drafts } = await supabase
        .from('reports')
        .select('id, report_type, property_address, updated_at')
        .eq('user_id', userId)
        .eq('status', 'draft')
        .lt('updated_at', twoDaysAgo.toISOString())
        .order('updated_at', { ascending: true })
        .limit(1);

      if (drafts && drafts.length > 0) {
        const d = drafts[0] as { report_type: string; property_address?: string };
        const addr = d.property_address ? ` at ${d.property_address}` : '';
        sections.push({
          priority: 1,
          line: `Draft ${d.report_type?.toUpperCase() ?? 'cert'}${addr} — 2 min to finish`,
        });
      }

      // 2. Expiring certs within 30 days (priority 2 — revenue)
      const { data: expiring } = await supabase
        .from('reports')
        .select('id, report_type, property_address, next_inspection_date')
        .eq('user_id', userId)
        .not('next_inspection_date', 'is', null)
        .gte('next_inspection_date', now.toISOString().split('T')[0])
        .lte('next_inspection_date', thirtyDaysFromNow.toISOString().split('T')[0])
        .order('next_inspection_date', { ascending: true })
        .limit(1);

      if (expiring && expiring.length > 0) {
        const e = expiring[0] as {
          report_type: string;
          property_address?: string;
          next_inspection_date: string;
        };
        const daysLeft = Math.ceil(
          (new Date(e.next_inspection_date).getTime() - now.getTime()) / (24 * 3600 * 1000)
        );
        sections.push({
          priority: 2,
          line: `${e.report_type?.toUpperCase() ?? 'Cert'} expires in ${daysLeft} days — renewal?`,
        });
      }

      // 3. Overdue invoices > 7 days (priority 3 — revenue)
      const { data: overdueInvoices } = await supabase
        .from('invoices')
        .select('id')
        .eq('user_id', userId)
        .eq('status', 'sent')
        .is('paid_at', null)
        .lt('created_at', sevenDaysAgo.toISOString());

      if (overdueInvoices && overdueInvoices.length > 0) {
        const n = overdueInvoices.length;
        sections.push({
          priority: 3,
          line: `${n} invoice${n === 1 ? '' : 's'} overdue — chase?`,
        });
      }

      // 4. Open tasks due today (priority 4 — workflow)
      const { data: tasks } = await supabase
        .from('spark_tasks')
        .select('id')
        .eq('user_id', userId)
        .eq('status', 'open')
        .lte('due_at', endOfToday.toISOString());

      if (tasks && tasks.length > 0) {
        const n = tasks.length;
        sections.push({
          priority: 4,
          line: `${n} task${n === 1 ? '' : 's'} due today`,
        });
      }

      // Build the push — returns null if there are zero sections
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, first_name')
        .eq('id', userId)
        .maybeSingle();

      const firstName =
        (profile as { first_name?: string; full_name?: string } | null)?.first_name ||
        (profile as { full_name?: string } | null)?.full_name?.split(' ')[0] ||
        '';

      const template = buildMorningDigest(firstName, sections);
      if (!template) {
        skippedEmpty++;
        continue;
      }

      // Morning digest is its own tier — NOT subject to the promo daily cap.
      // It's the one earned push a day so users come to expect it.
      const result = await sendSmartPush(
        supabase as unknown as Parameters<typeof sendSmartPush>[0],
        SUPABASE_URL,
        `Bearer ${SERVICE_ROLE_KEY}`,
        {
          userId,
          tier: 'digest',
          category: 'morning_digest',
          template,
          bypassCap: true,
        }
      );

      if (result.sent) {
        sent++;
      } else if (result.skipReason === 'cooldown' || result.skipReason === 'dedupe') {
        skippedOther++;
      } else {
        failed++;
      }
    }

    const summary = {
      total_candidates: uniqueUserIds.length,
      sent,
      skipped_empty: skippedEmpty,
      skipped_other: skippedOther,
      failed,
    };
    console.log('[morning-digest-push]', summary);

    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[morning-digest-push] Error:', err);
    return new Response(JSON.stringify({ error: (err as Error)?.message || 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
