import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

/**
 * daily-notification-digest
 *
 * Runs at 07:30 every morning via Supabase cron.
 * For each user with an active push subscription, checks all alert conditions
 * and fires push notifications for anything that needs attention today.
 *
 * Deduplicates via push_notification_log — each alert fires once per day max.
 *
 * Cron schedule: "30 7 * * *" (07:30 UTC daily)
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PushAlert {
  type: string;
  referenceId: string;
  title: string;
  body: string;
  pushType: 'quote' | 'invoice' | 'certificate' | 'job' | 'peer';
}

/** Call send-push-notification for a single user */
async function sendPush(
  supabaseUrl: string,
  serviceKey: string,
  userId: string,
  title: string,
  body: string,
  type: string
): Promise<void> {
  await fetch(`${supabaseUrl}/functions/v1/send-push-notification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
    },
    body: JSON.stringify({ userId, title, body, type }),
  });
}

/** Check if we already sent this alert today */
async function alreadySent(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  type: string,
  referenceId: string
): Promise<boolean> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data } = await supabase
    .from('push_notification_log')
    .select('id')
    .eq('user_id', userId)
    .eq('type', type)
    .eq('reference_id', referenceId)
    .gte('sent_at', today.toISOString())
    .limit(1);

  return (data?.length ?? 0) > 0;
}

/** Log that we sent a push */
async function logPush(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  alert: PushAlert
): Promise<void> {
  await supabase.from('push_notification_log').insert({
    user_id: userId,
    type: alert.type,
    reference_id: alert.referenceId,
    title: alert.title,
    body: alert.body,
  });
}

/** Build alert list for a given user */
async function buildAlertsForUser(
  supabase: ReturnType<typeof createClient>,
  userId: string
): Promise<PushAlert[]> {
  const alerts: PushAlert[] = [];
  const now = new Date();
  const today = now.toISOString();

  // ── Overdue invoices ──────────────────────────────────────────────
  const { data: overdueInvoices } = await supabase
    .from('quotes')
    .select('id, quote_number, client_data, total, invoice_due_date')
    .eq('user_id', userId)
    .eq('invoice_raised', true)
    .not('invoice_status', 'eq', 'paid')
    .not('invoice_due_date', 'is', null)
    .lt('invoice_due_date', today)
    .is('deleted_at', null)
    .limit(10);

  if (overdueInvoices && overdueInvoices.length > 0) {
    const totalOwed = overdueInvoices.reduce((sum, q) => sum + (q.total ?? 0), 0);
    const formatted = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(
      totalOwed
    );
    alerts.push({
      type: 'overdue_invoices',
      referenceId: `batch-${overdueInvoices.length}`,
      title: `⚠️ ${overdueInvoices.length} overdue invoice${overdueInvoices.length > 1 ? 's' : ''}`,
      body: `${formatted} outstanding — chase these today`,
      pushType: 'invoice',
    });
  }

  // ── Expiring quotes (within 3 days) ──────────────────────────────
  const threeDays = new Date(now.getTime() + 3 * 86400000).toISOString();
  const { data: expiringQuotes } = await supabase
    .from('quotes')
    .select('id, quote_number, client_data, expiry_date')
    .eq('user_id', userId)
    .eq('status', 'sent')
    .not('expiry_date', 'is', null)
    .gt('expiry_date', today)
    .lt('expiry_date', threeDays)
    .is('deleted_at', null)
    .limit(5);

  for (const quote of expiringQuotes ?? []) {
    const clientName = (quote.client_data as Record<string, unknown>)?.name || 'Client';
    alerts.push({
      type: 'expiring_quote',
      referenceId: quote.id,
      title: `⏰ Quote expiring soon`,
      body: `Quote for ${clientName} expires within 3 days — follow up now`,
      pushType: 'quote',
    });
  }

  // ── Overdue tasks ─────────────────────────────────────────────────
  const { data: overdueTasks } = await supabase
    .from('spark_tasks')
    .select('id, title, priority')
    .eq('user_id', userId)
    .eq('status', 'open')
    .not('due_at', 'is', null)
    .lt('due_at', today)
    .limit(10);

  if (overdueTasks && overdueTasks.length > 0) {
    const urgentCount = overdueTasks.filter(
      (t) => t.priority === 'urgent' || t.priority === 'high'
    ).length;
    alerts.push({
      type: 'overdue_tasks',
      referenceId: `batch-${overdueTasks.length}`,
      title: `📋 ${overdueTasks.length} overdue task${overdueTasks.length > 1 ? 's' : ''}`,
      body:
        urgentCount > 0
          ? `${urgentCount} high priority — open the app to action them`
          : 'Open the app to catch up',
      pushType: 'job',
    });
  }

  // ── Jobs today ────────────────────────────────────────────────────
  const todayEnd = new Date(now);
  todayEnd.setHours(23, 59, 59, 999);

  const { data: todayJobs } = await supabase
    .from('calendar_events')
    .select('id, title, start_at, location')
    .eq('user_id', userId)
    .gte('start_at', today)
    .lte('start_at', todayEnd.toISOString())
    .order('start_at', { ascending: true })
    .limit(5);

  if (todayJobs && todayJobs.length > 0) {
    const firstJob = todayJobs[0];
    const timeStr = new Date(firstJob.start_at).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
    alerts.push({
      type: 'jobs_today',
      referenceId: `batch-${new Date().toDateString()}`,
      title: `🔧 ${todayJobs.length} job${todayJobs.length > 1 ? 's' : ''} today`,
      body: `First job at ${timeStr}${firstJob.location ? ` — ${firstJob.location}` : ''}`,
      pushType: 'job',
    });
  }

  // ── Elec-ID expiry (≤14 days) ─────────────────────────────────────
  const fourteenDays = new Date(now.getTime() + 14 * 86400000).toISOString().split('T')[0];

  const { data: elecIdProfile } = await supabase
    .from('employer_elec_id_profiles')
    .select('id, ecs_expiry_date')
    .eq('user_id', userId)
    .single();

  if (elecIdProfile?.ecs_expiry_date && elecIdProfile.ecs_expiry_date <= fourteenDays) {
    const daysLeft = Math.floor(
      (new Date(elecIdProfile.ecs_expiry_date).getTime() - now.getTime()) / 86400000
    );
    alerts.push({
      type: 'ecs_card_expiry',
      referenceId: elecIdProfile.id,
      title: `⚠️ ECS Card ${daysLeft < 0 ? 'expired' : 'expiring soon'}`,
      body:
        daysLeft < 0
          ? 'Your ECS card has expired — renew now'
          : `Expires in ${daysLeft} day${daysLeft !== 1 ? 's' : ''} — renew before it lapses`,
      pushType: 'certificate',
    });
  }

  // ── Safety equipment calibration (≤7 days) ────────────────────────
  const sevenDays = new Date(now.getTime() + 7 * 86400000).toISOString().split('T')[0];
  const { data: equipment } = await supabase
    .from('safety_equipment')
    .select('id, name, calibration_due, next_inspection')
    .eq('user_id', userId)
    .not('status', 'eq', 'retired');

  for (const eq of equipment ?? []) {
    if (eq.calibration_due && eq.calibration_due <= sevenDays) {
      const daysLeft = Math.floor(
        (new Date(eq.calibration_due).getTime() - now.getTime()) / 86400000
      );
      alerts.push({
        type: 'equipment_calibration',
        referenceId: eq.id,
        title: `🔧 Calibration due: ${eq.name}`,
        body:
          daysLeft < 0
            ? `Calibration overdue — equipment may be non-compliant`
            : `Due in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`,
        pushType: 'certificate',
      });
    }
  }

  // ── EICR re-inspections due (≤14 days) ───────────────────────────
  const { data: expiringCerts } = await supabase
    .from('certificate_expiry_reminders')
    .select('id, client_name, installation_address, expiry_date')
    .eq('user_id', userId)
    .not('reminder_status', 'eq', 'completed')
    .lte('expiry_date', fourteenDays)
    .order('expiry_date', { ascending: true })
    .limit(5);

  for (const cert of expiringCerts ?? []) {
    const daysLeft = Math.floor((new Date(cert.expiry_date).getTime() - now.getTime()) / 86400000);
    alerts.push({
      type: 'eicr_reinspection',
      referenceId: cert.id,
      title: `📋 EICR re-inspection due`,
      body: `${cert.client_name || cert.installation_address} — ${daysLeft < 0 ? 'overdue' : `due in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`}`,
      pushType: 'certificate',
    });
  }

  return alerts;
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

  const supabase = createClient(supabaseUrl, serviceKey);

  try {
    console.log('[daily-digest] Starting run:', new Date().toISOString());

    // Get all users with active push subscriptions
    const { data: subscriptions, error: subError } = await supabase
      .from('push_subscriptions')
      .select('user_id')
      .eq('is_active', true);

    if (subError) throw subError;

    const userIds = [...new Set((subscriptions ?? []).map((s) => s.user_id))];
    console.log(`[daily-digest] Processing ${userIds.length} users`);

    let totalSent = 0;
    let totalSkipped = 0;

    for (const userId of userIds) {
      try {
        const alerts = await buildAlertsForUser(supabase, userId);

        for (const alert of alerts) {
          // Deduplicate — skip if already sent today
          const sent = await alreadySent(supabase, userId, alert.type, alert.referenceId);
          if (sent) {
            totalSkipped++;
            continue;
          }

          // Send push notification
          await sendPush(supabaseUrl, serviceKey, userId, alert.title, alert.body, alert.pushType);
          await logPush(supabase, userId, alert);
          totalSent++;

          // Throttle slightly between sends
          await new Promise((r) => setTimeout(r, 100));
        }
      } catch (userErr) {
        console.error(`[daily-digest] Error processing user ${userId}:`, userErr);
        // Continue with next user
      }
    }

    console.log(`[daily-digest] Done. Sent: ${totalSent}, Skipped (deduped): ${totalSkipped}`);

    return new Response(
      JSON.stringify({
        success: true,
        usersProcessed: userIds.length,
        sent: totalSent,
        skipped: totalSkipped,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('[daily-digest] Fatal error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
