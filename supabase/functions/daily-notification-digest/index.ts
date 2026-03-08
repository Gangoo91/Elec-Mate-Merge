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
  pushType:
    | 'quote'
    | 'invoice'
    | 'certificate'
    | 'job'
    | 'peer'
    | 'study'
    | 'mental_health'
    | 'assessment'
    | 'briefing';
  data?: Record<string, unknown>;
}

/** Call send-push-notification for a single user */
async function sendPush(
  supabaseUrl: string,
  serviceKey: string,
  userId: string,
  title: string,
  body: string,
  type: string,
  data?: Record<string, unknown>
): Promise<void> {
  await fetch(`${supabaseUrl}/functions/v1/send-push-notification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
    },
    body: JSON.stringify({ userId, title, body, type, data }),
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
  userId: string,
  role: string
): Promise<PushAlert[]> {
  const alerts: PushAlert[] = [];
  const now = new Date();
  const today = now.toISOString();

  // ── Overdue invoices ──────────────────────────────────────────────
  const { data: overdueInvoices } = await supabase
    .from('invoices')
    .select('id, invoice_number, client_data, total, due_date')
    .eq('user_id', userId)
    .not('status', 'eq', 'paid')
    .not('due_date', 'is', null)
    .lt('due_date', today)
    .is('deleted_at', null)
    .limit(10);

  if (overdueInvoices && overdueInvoices.length > 0) {
    const totalOwed = overdueInvoices.reduce((sum, inv) => sum + (inv.total ?? 0), 0);
    const formatted = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(
      totalOwed
    );
    alerts.push({
      type: 'overdue_invoices',
      referenceId: `batch-${overdueInvoices.length}`,
      title: `⚠️ ${overdueInvoices.length} overdue invoice${overdueInvoices.length > 1 ? 's' : ''}`,
      body: `${formatted} outstanding — chase these today`,
      pushType: 'invoice',
      data: { role, invoiceId: overdueInvoices[0].id },
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
      data: { role, quoteId: quote.id },
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
      data: { role },
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
      data: { role },
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
      data: { role, certificateId: elecIdProfile.id },
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
        data: { role },
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
      data: { role, certificateId: cert.id },
    });
  }

  // ── Flashcard reviews due ────────────────────────────────────────
  const { data: dueFlashcards } = await supabase
    .from('flashcards')
    .select('id')
    .eq('user_id', userId)
    .lte('next_review', today)
    .limit(1);

  if (dueFlashcards && dueFlashcards.length > 0) {
    const { count } = await supabase
      .from('flashcards')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .lte('next_review', today);

    alerts.push({
      type: 'flashcards_due',
      referenceId: `batch-${new Date().toDateString()}`,
      title: `📚 ${count ?? 0} flashcard${(count ?? 0) !== 1 ? 's' : ''} to review`,
      body: 'Keep your streak alive — quick revision session',
      pushType: 'study',
      data: { role },
    });
  }

  // ── Learning streak broken (no study in 2+ days) ───────────────
  const twoDaysAgo = new Date(now.getTime() - 2 * 86400000).toISOString();
  const { data: recentStudy } = await supabase
    .from('learning_progress')
    .select('id')
    .eq('user_id', userId)
    .gte('last_accessed', twoDaysAgo)
    .limit(1);

  if (!recentStudy || recentStudy.length === 0) {
    // Only alert if user has any learning progress at all
    const { data: anyStudy } = await supabase
      .from('learning_progress')
      .select('id')
      .eq('user_id', userId)
      .limit(1);

    if (anyStudy && anyStudy.length > 0) {
      alerts.push({
        type: 'streak_broken',
        referenceId: `streak-${new Date().toDateString()}`,
        title: `🔥 Your learning streak needs you`,
        body: "You haven't studied in 2+ days — jump back in",
        pushType: 'study',
        data: { role },
      });
    }
  }

  // ── Daily mood check-in ────────────────────────────────────────
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const { data: todayMood } = await supabase
    .from('mental_health_mood_entries')
    .select('id')
    .eq('user_id', userId)
    .gte('created_at', todayStart.toISOString())
    .limit(1);

  if (!todayMood || todayMood.length === 0) {
    alerts.push({
      type: 'mood_checkin',
      referenceId: `mood-${new Date().toDateString()}`,
      title: `💙 How are you feeling today?`,
      body: 'Take a moment to check in with yourself',
      pushType: 'mental_health',
      data: { role },
    });
  }

  // ── Unread peer messages ───────────────────────────────────────
  const { data: unreadPeer } = await supabase
    .from('mental_health_peer_messages')
    .select('id')
    .eq('recipient_id', userId)
    .eq('is_read', false)
    .limit(1);

  if (unreadPeer && unreadPeer.length > 0) {
    const { count: unreadCount } = await supabase
      .from('mental_health_peer_messages')
      .select('id', { count: 'exact', head: true })
      .eq('recipient_id', userId)
      .eq('is_read', false);

    alerts.push({
      type: 'unread_peer_messages',
      referenceId: `peer-${new Date().toDateString()}`,
      title: `💬 ${unreadCount ?? 0} unread message${(unreadCount ?? 0) !== 1 ? 's' : ''}`,
      body: 'A mate has reached out — have a read',
      pushType: 'peer',
      data: { role },
    });
  }

  // ── Apprentice-only alerts ─────────────────────────────────────
  if (role === 'apprentice') {
    // Assessments due within 7 days
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 86400000).toISOString();
    const { data: dueAssessments } = await supabase
      .from('ojt_assessments')
      .select('id, title, due_date')
      .eq('user_id', userId)
      .not('status', 'eq', 'completed')
      .not('due_date', 'is', null)
      .lte('due_date', sevenDaysFromNow)
      .order('due_date', { ascending: true })
      .limit(5);

    if (dueAssessments && dueAssessments.length > 0) {
      const nearest = dueAssessments[0];
      const daysLeft = Math.floor(
        (new Date(nearest.due_date).getTime() - now.getTime()) / 86400000
      );
      alerts.push({
        type: 'assessment_due',
        referenceId: nearest.id,
        title: `📝 ${dueAssessments.length} assessment${dueAssessments.length > 1 ? 's' : ''} due soon`,
        body:
          daysLeft <= 0
            ? `"${nearest.title}" is overdue — complete it now`
            : `"${nearest.title}" due in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`,
        pushType: 'assessment',
        data: { role, assessmentId: nearest.id },
      });
    }

    // OJT hours behind pace
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 86400000).toISOString();
    const { data: compliance } = await supabase
      .from('compliance_tracking')
      .select('id, requirement_name, completed_hours, required_hours, deadline')
      .eq('user_id', userId)
      .not('deadline', 'is', null)
      .lte('deadline', thirtyDaysFromNow)
      .limit(5);

    for (const item of compliance ?? []) {
      const pct =
        item.required_hours > 0 ? (item.completed_hours / item.required_hours) * 100 : 100;
      if (pct < 50) {
        const daysLeft = Math.floor((new Date(item.deadline).getTime() - now.getTime()) / 86400000);
        alerts.push({
          type: 'ojt_hours_behind',
          referenceId: item.id,
          title: `⚠️ OJT hours behind schedule`,
          body: `${item.requirement_name}: ${Math.round(pct)}% complete, ${daysLeft} day${daysLeft !== 1 ? 's' : ''} remaining`,
          pushType: 'assessment',
          data: { role },
        });
      }
    }
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
        // Look up user role for role-aware routing
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .single();
        const role = profile?.role || 'electrician';

        const alerts = await buildAlertsForUser(supabase, userId, role);

        // ── Generate consolidated morning briefing ────────────────────
        if (alerts.length > 0) {
          const categoryCounts: Record<string, number> = {};
          for (const a of alerts) {
            const cat = a.pushType;
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
          }
          const parts: string[] = [];
          if (categoryCounts.job)
            parts.push(`${categoryCounts.job} task alert${categoryCounts.job > 1 ? 's' : ''}`);
          if (categoryCounts.invoice || categoryCounts.quote) {
            const financeCount = (categoryCounts.invoice || 0) + (categoryCounts.quote || 0);
            parts.push(`${financeCount} finance alert${financeCount > 1 ? 's' : ''}`);
          }
          if (categoryCounts.certificate)
            parts.push(
              `${categoryCounts.certificate} cert alert${categoryCounts.certificate > 1 ? 's' : ''}`
            );
          if (categoryCounts.study) parts.push('study reminders');
          if (categoryCounts.mental_health || categoryCounts.peer) parts.push('wellbeing check-in');
          if (categoryCounts.assessment)
            parts.push(
              `${categoryCounts.assessment} assessment alert${categoryCounts.assessment > 1 ? 's' : ''}`
            );

          const briefingSummary = parts.join(' | ');

          alerts.unshift({
            type: 'morning_briefing',
            referenceId: `briefing-${new Date().toDateString()}`,
            title: `Good morning! Here's your day`,
            body: briefingSummary,
            pushType: 'briefing',
            data: { role, tag: 'briefing-morning' },
          });
        }

        // ── Respect notification preferences ───────────────────────────
        const pushTypeToPrefCategory: Record<string, string> = {
          briefing: 'daily_briefing',
          job: 'tasks_projects',
          invoice: 'invoices_quotes',
          quote: 'invoices_quotes',
          certificate: 'certificates_compliance',
          study: 'study_centre',
          mental_health: 'mental_health',
          peer: 'messages',
          assessment: 'apprentice',
        };

        const { data: prefRows } = await supabase
          .from('notification_preferences')
          .select('category, enabled')
          .eq('user_id', userId)
          .eq('enabled', false);

        const disabledCategories = new Set(
          (prefRows ?? []).map((r: { category: string }) => r.category)
        );

        const filteredAlerts = alerts.filter((a) => {
          const prefCat = pushTypeToPrefCategory[a.pushType];
          return !prefCat || !disabledCategories.has(prefCat);
        });

        for (const alert of filteredAlerts) {
          // Deduplicate — skip if already sent today
          const sent = await alreadySent(supabase, userId, alert.type, alert.referenceId);
          if (sent) {
            totalSkipped++;
            continue;
          }

          // Send push notification
          await sendPush(
            supabaseUrl,
            serviceKey,
            userId,
            alert.title,
            alert.body,
            alert.pushType,
            alert.data
          );
          await logPush(supabase, userId, alert);
          totalSent++;

          // Longer delay after briefing so it displays first; shorter for others
          const delay = alert.type === 'morning_briefing' ? 2000 : 100;
          await new Promise((r) => setTimeout(r, delay));
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
