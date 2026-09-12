import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { isActionableOverdueTask } from '../_shared/overdueTasks.ts';
import { captureException } from '../_shared/sentry.ts';

/**
 * daily-notification-digest — "Your Day" morning briefing
 *
 * Runs at 07:00 UTC every morning via Supabase cron (7am GMT / 8am BST).
 * For each user with an active push subscription, checks all alert conditions
 * and sends ONE consolidated "Your Day" push notification.
 *
 * - Deduplicates via push_notification_log — each alert fires once per day max.
 * - Users with WhatsApp agent get a shorter push (details via WhatsApp).
 * - Role-tailored: apprentices get study nudges, electricians get jobs/certs.
 *
 * Cron schedule: "0 7 * * *" (07:00 UTC daily)
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
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

/**
 * Call a Postgres function.
 *
 * The client in this file is created without the generated database types, so
 * `.rpc()` resolves its argument type to `undefined` and every call with
 * parameters fails to compile. This narrows that in one place rather than
 * scattering casts through the alert builders.
 */
async function callRpc<T>(
  supabase: ReturnType<typeof createClient>,
  name: string,
  args: Record<string, unknown>
): Promise<T | null> {
  const client = supabase as unknown as {
    rpc: (fn: string, params: Record<string, unknown>) => Promise<{ data: unknown; error: unknown }>;
  };
  const { data, error } = await client.rpc(name, args);
  if (error) {
    console.warn(`[daily-digest] rpc ${name} failed:`, error);
    return null;
  }
  return (data ?? null) as T | null;
}

/** One ranked suggestion from `get_next_best_actions`. */
interface NextAction {
  kind: string;
  score: number;
  title: string;
  reason: string;
  route: string;
  payload: Record<string, unknown>;
}

/**
 * Streak lengths worth a message. Sparse on purpose — congratulating someone
 * every single day turns the milestone into the daily reminder it is meant to
 * be distinct from, and the channel stops meaning anything.
 */
const MILESTONES = new Set([3, 7, 14, 30, 50, 100, 200, 365]);


/**
 * Morning copy for a ranked action.
 *
 * The 09:00 message is the first thing a learner hears about study that day,
 * and it is doing a different job from the nudge that follows: one sets an
 * intention, the other collects on it. Reusing the nudge's wording would make
 * the second push read as a repeat rather than a reminder, so each kind gets
 * its own morning phrasing.
 *
 * Kept short deliberately — a lock screen gives the body about two lines
 * before it truncates, and the reminder time has to survive that cut.
 */
/**
 * Trim to a length that survives a lock screen, on a word boundary.
 *
 * iOS gives a notification title roughly one line and the body about two. A
 * real section label — "Emergency Lighting · Module 1 · Section 1" — is 40
 * characters on its own, so the specific detail belongs in the body where
 * there is room for it, and even there it needs a ceiling.
 */
function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/** Join a sentence to what follows without doubling its full stop. */
function sentence(text: string): string {
  return text.replace(/[.\s]+$/, '');
}

/**
 * Morning copy for a ranked action.
 *
 * The 09:00 message is the first thing a learner hears about study that day,
 * and it is doing a different job from the nudge that follows: one sets an
 * intention, the other collects on it. Reusing the nudge's wording would make
 * the second push read as a repeat rather than a reminder, so each kind gets
 * its own morning phrasing.
 *
 * Titles stay short and inviting; the specific detail goes in the body, which
 * has the room for it. Every line ends on the hour the reminder will arrive —
 * that promise is what makes a second study push in the same day fair.
 */
function morningCopy(
  action: NextAction,
  nudgeHour: number
): { title: string; body: string } | null {
  const at = `${String(nudgeHour).padStart(2, '0')}:00`;
  const label = clip(String(action.payload?.label ?? ''), 58);
  const topic = String(action.payload?.topic ?? '');
  const component = String(action.payload?.component ?? '');
  const pct = action.payload?.pct ?? action.payload?.component_pct;

  switch (action.kind) {
    case 'finish_section':
      return {
        title: 'Pick up where you stopped',
        body: label
          ? `${label} — you started it and never finished. Reminder at ${at}.`
          : `You left a section unfinished. About ten minutes — reminder at ${at}.`,
      };
    case 'resume':
      return {
        title: clip(action.title.replace(/^Pick up /, 'Back to '), 44),
        body: `Where you got to last time. About ten minutes — reminder at ${at}.`,
      };
    case 'weak_topic':
      return {
        title: topic ? clip(`Ten minutes on ${topic}`, 44) : 'Ten minutes on your weakest topic',
        body: `You are at ${pct ?? '—'}% on it. A short session today moves that — reminder at ${at}.`,
      };
    case 'mock_followup':
      return {
        title: component ? clip(`${component} today`, 44) : 'Follow up your mock',
        body: `${sentence(action.reason)}. Reminder at ${at}.`,
      };
    case 'first_step':
      return {
        title: 'Start your first section',
        body: 'Pick a course — the first one takes about ten minutes and we keep your place from there.',
      };
    // A streak warning at 9am warns someone about a day they have not had yet,
    // and nobody has earned XP before work. Both belong to the evening.
    case 'streak_risk':
    case 'daily_goal':
    case 'xp_rival':
    default:
      return null;
  }
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
    body: JSON.stringify({ userId, title, body, type, data, skipQuietHours: true }),
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

/** Deep-link for a digest alert, so its bell row is actionable. */
function routeForPushType(
  pushType: PushAlert['pushType'],
  data?: Record<string, unknown>
): string | null {
  if (typeof data?.route === 'string') return data.route;
  switch (pushType) {
    case 'invoice':
      return '/electrician/invoices';
    case 'quote':
      return '/electrician/quotes';
    case 'certificate':
      return '/settings?tab=business';
    case 'job':
      return '/electrician/jobs';
    case 'study':
      return '/electrician/study-centre';
    case 'mental_health':
    case 'peer':
      return '/electrician/mental-health-hub';
    case 'assessment':
      return '/apprentice';
    case 'briefing':
      return '/electrician';
    default:
      return null;
  }
}

/** Log the push AND write the unified bell row (user_notifications), so the bell
 *  and the /notifications page show the same feed. The push can nudge daily, but
 *  the bell keeps ONE unread row per item — no "same alert every morning" pile-up
 *  (ELE-226 / ELE-1378). The greeting summary stays push-only (the individual
 *  actionable rows below already cover it). */
async function logPush(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  alert: PushAlert
): Promise<string | null> {
  // The id comes back so the push payload can carry it and a tap can be
  // attributed — see `deliver` below.
  const { data: logRow } = await supabase
    .from('push_notification_log')
    .insert({
      user_id: userId,
      type: alert.type,
      reference_id: alert.referenceId,
      title: alert.title,
      body: alert.body,
    })
    .select('id')
    .single();

  const logId = (logRow as { id?: string } | null)?.id ?? null;

  if (alert.type === 'morning_briefing') return logId; // consolidated greeting — push only

  const { data: existing } = await supabase
    .from('user_notifications')
    .select('id')
    .eq('user_id', userId)
    .eq('type', alert.type)
    .eq('is_read', false)
    .filter('metadata->>ref_id', 'eq', alert.referenceId)
    .limit(1);

  if (!existing || (existing as unknown[]).length === 0) {
    await supabase.from('user_notifications').insert({
      user_id: userId,
      type: alert.type,
      title: alert.title,
      message: alert.body,
      link: routeForPushType(alert.pushType, alert.data),
      metadata: { ...(alert.data ?? {}), ref_id: alert.referenceId },
    });
  }

  return logId;
}

/**
 * Log, then send carrying the log id.
 *
 * The order matters. Every send site used to push first and log second, so the
 * payload had no id in it and a tap could not be tied back to the row that
 * caused it: `push_notification_log.read_at` has existed unused since the table
 * was created. Logging first costs one round trip and turns every push in this
 * function into something measurable.
 *
 * Optionally overrides the push title/body, so a consolidated briefing can be
 * worded differently from the row it writes to the bell.
 */
/**
 * How many engagement pushes one person may receive in a day.
 *
 * Two: the morning plan that names the day's action and promises a reminder,
 * and the reminder itself. That pair is the design. A third is where a channel
 * starts being muted, and until now nothing enforced a ceiling — the shared
 * `sendSmartPush` engine has a 2/day cap but this function has always called
 * send-push-notification directly and bypassed it. With the new modes wired up,
 * 144 apprentices would have received three a day.
 */
const DAILY_PUSH_CAP = 2;

/** Types that are never held back: a legal deadline or someone's money. */
const UNCAPPED = new Set([
  'part_p_overdue',
  'part_p_due',
  'payment_failed',
  'overdue_invoices',
  'quote_accepted',
  'invoice_paid',
  'unread_peer_messages',
]);

/** How many pushes this user has already had today. */
async function pushesSentToday(
  supabase: ReturnType<typeof createClient>,
  userId: string
): Promise<number> {
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);
  const { data } = await supabase
    .from('push_notification_log')
    .select('id')
    .eq('user_id', userId)
    .gte('sent_at', dayStart.toISOString());
  return (data ?? []).length;
}

async function deliver(
  supabase: ReturnType<typeof createClient>,
  supabaseUrl: string,
  serviceKey: string,
  userId: string,
  alert: PushAlert,
  override?: { title?: string; body?: string; data?: Record<string, unknown> }
): Promise<void> {
  // The ceiling. Checked here rather than at each call site so nothing added
  // later can quietly route around it.
  if (!UNCAPPED.has(alert.type)) {
    const already = await pushesSentToday(supabase, userId);
    if (already >= DAILY_PUSH_CAP) {
      console.log(`[daily-digest] cap reached for ${userId} (${already}), holding ${alert.type}`);
      return;
    }
  }

  const logId = await logPush(supabase, userId, alert);
  await sendPush(
    supabaseUrl,
    serviceKey,
    userId,
    override?.title ?? alert.title,
    override?.body ?? alert.body,
    alert.pushType,
    { ...(alert.data ?? {}), ...(override?.data ?? {}), logId }
  );
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

  // ── Overdue invoices (24h grace period, exclude paid/cancelled) ─────
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
  const { data: overdueInvoices } = await supabase
    .from('invoices')
    .select('id, invoice_number, client_data, total, due_date, status')
    .eq('user_id', userId)
    .not('status', 'in', '("paid","Paid","cancelled","Cancelled")')
    // Belt-and-braces: some invoices keep status 'overdue' after being paid
    // (paid_at set, status never updated) — they must NOT inflate the total (ELE-1378).
    .is('paid_at', null)
    .not('due_date', 'is', null)
    .lt('due_date', yesterday)
    .is('deleted_at', null)
    .limit(10);

  if (overdueInvoices && overdueInvoices.length > 0) {
    // Net off part-payments — quote-invoices track `total_paid`, and an
    // invoice half-settled is not the full amount outstanding.
    const totalOwed = overdueInvoices.reduce(
      (sum, inv) => sum + ((inv.total ?? 0) - (inv.total_paid ?? 0)),
      0
    );
    const formatted = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(
      totalOwed
    );
    // Naming who owes the oldest one turns a number into a job to do.
    const oldestClient =
      ((overdueInvoices[0]?.client_data as Record<string, unknown> | null)?.name as string) ||
      'a client';
    alerts.push({
      type: 'overdue_invoices',
      // Stable ref (not date-based): the push still fires once/day via the
      // same-day log check, but the BELL keeps ONE unread row until it's read —
      // no "same overdue total every morning" pile-up (ELE-1378).
      referenceId: 'overdue-invoices',
      title: `${overdueInvoices.length} overdue invoice${overdueInvoices.length > 1 ? 's' : ''}`,
      // "Tap to chase" is an instruction to do the one thing this object already
      // is, and it spends the characters that could name who owes the money.
      body: `${formatted} outstanding, oldest ${oldestClient}`,
      pushType: 'invoice',
      data: { role, route: '/electrician/invoices', invoiceId: overdueInvoices[0].id },
    });
  }

  // ── Uninvoiced job costs (ELE-1401) — logged work not yet billed ────
  // Only nag when entries have had a few days to accumulate: oldest
  // uninvoiced entry is 3+ days old. Same stable-ref pattern as overdue.
  const { data: uninvoicedCosts } = await supabase
    .from('job_cost_entries')
    .select('project_id, total, entry_date')
    .eq('user_id', userId)
    .is('invoice_id', null);

  if (uninvoicedCosts && uninvoicedCosts.length > 0) {
    const threeDaysAgo = new Date(now.getTime() - 3 * 86400000).toISOString().split('T')[0];
    const oldEnough = uninvoicedCosts.some((c) => c.entry_date <= threeDaysAgo);
    const costTotal = uninvoicedCosts.reduce((sum, c) => sum + (Number(c.total) || 0), 0);
    if (oldEnough && costTotal > 0) {
      const jobCount = new Set(uninvoicedCosts.map((c) => c.project_id)).size;
      const formattedCosts = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(costTotal);
      alerts.push({
        type: 'uninvoiced_costs',
        referenceId: 'uninvoiced-job-costs',
        title: `${formattedCosts} logged, not yet invoiced`,
        body: `Across ${jobCount} job${jobCount > 1 ? 's' : ''}, still off every invoice`,
        pushType: 'invoice',
        data: { role, route: '/electrician/projects' },
      });
    }
  }

  // ── Invoices due tomorrow (gentle heads-up BEFORE they go overdue) ──
  const midnight = new Date(now);
  midnight.setHours(0, 0, 0, 0);
  const tomorrowStart = new Date(midnight.getTime() + 86400000).toISOString();
  const dayAfterStart = new Date(midnight.getTime() + 2 * 86400000).toISOString();
  const { data: dueSoon } = await supabase
    .from('invoices')
    .select('id, total')
    .eq('user_id', userId)
    .not('status', 'in', '("paid","Paid","cancelled","Cancelled")')
    .is('paid_at', null)
    .gte('due_date', tomorrowStart)
    .lt('due_date', dayAfterStart)
    .is('deleted_at', null)
    .limit(10);

  if (dueSoon && dueSoon.length > 0) {
    const total = dueSoon.reduce((sum, inv) => sum + (inv.total ?? 0), 0);
    const formatted = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(
      total
    );
    alerts.push({
      type: 'invoice_due_soon',
      referenceId: 'invoices-due-tomorrow',
      title: `${dueSoon.length} invoice${dueSoon.length > 1 ? 's' : ''} due tomorrow`,
      body: `${formatted} — a quick nudge before ${dueSoon.length > 1 ? 'they' : 'it'} go${dueSoon.length > 1 ? '' : 'es'} overdue.`,
      pushType: 'invoice',
      data: { role, route: '/electrician/invoices' },
    });
  }

  // ── Expiring quotes (within 3 days) ──────────────────────────────
  const threeDays = new Date(now.getTime() + 3 * 86400000).toISOString();
  const { data: expiringQuotes } = await supabase
    .from('quotes')
    .select('id, quote_number, client_data, expiry_date, total')
    .eq('user_id', userId)
    .eq('status', 'sent')
    .not('expiry_date', 'is', null)
    .gt('expiry_date', today)
    .lt('expiry_date', threeDays)
    .is('deleted_at', null)
    .limit(5);

  for (const quote of expiringQuotes ?? []) {
    const clientName = (quote.client_data as Record<string, unknown>)?.name || 'A client';
    const quoteTotal = Number((quote as Record<string, unknown>).total ?? 0);
    const quoteValue = quoteTotal
      ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(quoteTotal)
      : '';
    alerts.push({
      type: 'expiring_quote',
      referenceId: quote.id,
      title: `${clientName}'s quote expires in 3 days`,
      body: quoteValue ? `${quoteValue}, still unanswered` : 'Still unanswered',
      pushType: 'quote',
      data: { role, quoteId: quote.id },
    });
  }

  // ── Overdue tasks (exclude completed/cancelled, snoozed, and
  //    auto-generated chase/follow-up reminders — ELE-1058) ─────────
  const { data: overdueTasksRaw } = await supabase
    .from('spark_tasks')
    .select('id, title, priority, tags, snoozed_until')
    .eq('user_id', userId)
    .in('status', ['open', 'in_progress'])
    .not('due_at', 'is', null)
    .lt('due_at', today)
    .limit(25);
  const overdueTasks = (overdueTasksRaw || [])
    .filter((t) => isActionableOverdueTask(t))
    .slice(0, 10);

  if (overdueTasks && overdueTasks.length > 0) {
    const urgentCount = overdueTasks.filter(
      (t) => t.priority === 'urgent' || t.priority === 'high'
    ).length;
    alerts.push({
      type: 'overdue_tasks',
      referenceId: `batch-${new Date().toDateString()}`,
      title: `${overdueTasks.length} overdue task${overdueTasks.length > 1 ? 's' : ''}`,
      // Was "Open the app to catch up" — filler on something you open by
      // tapping it. Name the work instead: seeing the title of the job they
      // have been avoiding is what makes someone act on it.
      body:
        urgentCount > 0
          ? `${urgentCount} high priority · ${clip(String(overdueTasks[0]?.title ?? 'untitled'), 44)}`
          : clip(String(overdueTasks[0]?.title ?? 'Open to catch up'), 60),
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
      title: `${todayJobs.length} job${todayJobs.length > 1 ? 's' : ''} today`,
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
      title: `ECS card ${daysLeft < 0 ? 'expired' : 'expiring soon'}`,
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
        title: `Calibration due: ${eq.name}`,
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
      title: `EICR re-inspection due`,
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

    const cardCount = count ?? 0;
    alerts.push({
      type: 'flashcards_due',
      referenceId: `batch-${new Date().toDateString()}`,
      title: `${cardCount} flashcard${cardCount !== 1 ? 's' : ''} ready for review`,
      body:
        cardCount <= 5
          ? 'Quick 2-minute session — keep your streak alive'
          : `About ${Math.ceil(cardCount * 0.4)} minutes — keep your streak alive`,
      pushType: 'study',
      data: { role },
    });
  }

  // ── Learning streak at risk (no study today) ───────────────────
  //
  // This gated on `learning_progress`, which belongs to the Inspection &
  // Testing hub and holds 8 users. The streak itself lives in
  // `user_study_streaks` (398 rows) and study activity in `course_progress`
  // (556 users), so ~98% of learners with a real streak could never receive
  // this — it read a table their progress never touched.
  const todayStartStudy = new Date(now);
  todayStartStudy.setHours(0, 0, 0, 0);

  const { data: streakRow } = await supabase
    .from('user_study_streaks')
    .select('current_streak, longest_streak, last_study_date')
    .eq('user_id', userId)
    .maybeSingle();

  const streakState = streakRow as {
    current_streak?: number;
    longest_streak?: number;
    last_study_date?: string | null;
  } | null;
  const currentStreak = streakState?.current_streak ?? 0;

  // Belt and braces: the streak row is updated by a separate writer, so check
  // the activity table too rather than warn someone who studied an hour ago.
  const { data: studiedToday } = await supabase
    .from('course_progress')
    .select('id')
    .eq('user_id', userId)
    .gte('last_accessed_at', todayStartStudy.toISOString())
    .limit(1);

  const hasStudiedToday =
    (studiedToday && studiedToday.length > 0) ||
    (streakState?.last_study_date ?? '').slice(0, 10) === todayStartStudy.toISOString().slice(0, 10);

  // Only worth defending from two days up. Warning someone about a one-day
  // streak is warning them about yesterday.
  // Apprentices get the dedicated morning plan and the peak-hour nudge, both
  // of which already surface the streak when it is the right thing to say. A
  // third mention in the morning briefing would be the same fact three times.
  if (!hasStudiedToday && currentStreak >= 2 && role !== 'apprentice') {
    alerts.push({
      type: 'streak_broken',
      referenceId: `streak-${new Date().toDateString()}`,
      title: `Keep your ${currentStreak}-day streak`,
      body:
        currentStreak >= (streakState?.longest_streak ?? 0)
          ? 'This is your best run yet — ten minutes today keeps it'
          : "You haven't studied today — ten minutes keeps it alive",
      pushType: 'study',
      data: { role, route: '/study-centre', streak: currentStreak },
    });
  }

  // ── Daily mood check-in (streak-aware) ─────────────────────────
  const { data: recentMoods } = await supabase
    .from('mental_health_mood_entries')
    .select('date')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(10);

  const todayKey = now.toISOString().split('T')[0];
  const hasMoodToday = (recentMoods ?? []).some((m: { date: string }) => m.date === todayKey);

  if (!hasMoodToday) {
    // A live streak ending today is a stronger, more personal nudge than a
    // generic prompt — count consecutive logged days back from yesterday.
    const have = new Set((recentMoods ?? []).map((m: { date: string }) => m.date));
    let streak = 0;
    const walk = new Date(now);
    walk.setDate(walk.getDate() - 1);
    while (have.has(walk.toISOString().split('T')[0])) {
      streak++;
      walk.setDate(walk.getDate() - 1);
    }

    alerts.push({
      type: 'mood_checkin',
      referenceId: `mood-${new Date().toDateString()}`,
      title:
        streak >= 2
          ? `${streak}-day wellbeing streak — keep it going`
          : 'How are you feeling today?',
      body:
        streak >= 2
          ? 'A 10-second check-in keeps your streak alive.'
          : 'Take a moment to check in.',
      pushType: 'mental_health',
      data: { role },
    });
  }

  // ── Unread peer messages ───────────────────────────────────────
  // Recipients are derived through the conversation (the messages table has
  // no recipient_id column — the previous direct filter errored silently and
  // this alert could never fire).
  const { data: mySupporterRow } = await supabase
    .from('mental_health_peer_supporters')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();

  let convoFilter = `seeker_id.eq.${userId}`;
  if (mySupporterRow?.id) convoFilter += `,supporter_id.eq.${mySupporterRow.id}`;

  const { data: myConvos } = await supabase
    .from('mental_health_peer_conversations')
    .select('id')
    .or(convoFilter)
    .eq('status', 'active');

  const convoIds = (myConvos ?? []).map((c: { id: string }) => c.id);
  if (convoIds.length > 0) {
    const { count: unreadCount } = await supabase
      .from('mental_health_peer_messages')
      .select('id', { count: 'exact', head: true })
      .in('conversation_id', convoIds)
      .neq('sender_id', userId)
      .eq('is_read', false);

    if ((unreadCount ?? 0) > 0) {
      alerts.push({
        type: 'unread_peer_messages',
        referenceId: `peer-${new Date().toDateString()}`,
        title: `${unreadCount} unread message${unreadCount !== 1 ? 's' : ''}`,
        body: 'Someone has been in touch.',
        pushType: 'peer',
        data: { role },
      });
    }
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
        title: `${dueAssessments.length} assessment${dueAssessments.length > 1 ? 's' : ''} due soon`,
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
          title: `OJT hours behind schedule`,
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
    // One clock for the whole run. `now` was referenced in four places inside
    // the per-user loop without ever being declared in that scope, so the
    // end_of_day branch threw a ReferenceError on its first statement — which
    // is why the 17:00 cron has been live for months with zero sends against
    // its name in push_notification_log.
    const now = new Date();

    // Check if this is a study_reminder mode (6pm apprentice cron)
    let mode = 'morning';
    try {
      const body = await req.json();
      if (body?.mode) mode = body.mode;
    } catch {
      // No body or invalid JSON — use default morning mode
    }

    console.log(`[daily-digest] Starting ${mode} run:`, new Date().toISOString());

    // Get all users with active push subscriptions
    const { data: subscriptions, error: subError } = await supabase
      .from('push_subscriptions')
      .select('user_id')
      .eq('is_active', true);

    if (subError) throw subError;

    const userIds = [...new Set((subscriptions ?? []).map((s) => s.user_id))];
    console.log(`[daily-digest] Processing ${userIds.length} users`);

    // ── Peak-hour learning nudge (hourly, 07:00–22:00) ─────────────────
    //
    // Replaces the fixed 18:00 send. Study is not spread evenly across the day
    // and not spread evenly across people: of 240 learners with ten or more
    // sessions, roughly half of each one's study lands in a single hour, and
    // the common hours are 21:00, 20:00, 13:00 and 22:00 — only nine peak at
    // 18:00. Most learners were being nudged two to four hours before they
    // were free, by which point the notification is under everything else.
    //
    // So this runs every hour and asks who is about to start. Sending an hour
    // ahead of the peak gives them the lead time to act rather than arriving
    // mid-session. Learners without enough history fall back to a fixed hour.
    if (mode === 'peak_nudge') {
      const londonHour = Number(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/London',
          hour: 'numeric',
          hour12: false,
        }).format(now)
      );
      // One hour of lead time. 23 wraps to 0, which no learner resolves to.
      const targetHour = (londonHour + 1) % 24;

      const { data: due, error: dueErr } = await supabase.rpc('learners_due_a_nudge', {
        p_target_hour: targetHour,
      });
      if (dueErr) throw dueErr;

      const rows = (due as { user_id: string; peak_hour: number; personalised: boolean }[]) ?? [];
      let peakSent = 0;
      let peakSkipped = 0;

      for (const row of rows) {
        try {
          const { data: pref } = await supabase
            .from('notification_preferences')
            .select('enabled')
            .eq('user_id', row.user_id)
            .eq('category', 'study_centre')
            .single();
          if (pref && !pref.enabled) {
            peakSkipped++;
            continue;
          }

          const { data: ranked } = await supabase.rpc('get_next_best_actions', {
            p_user_id: row.user_id,
            p_limit: 1,
          });
          const best = (ranked as NextAction[] | null)?.[0];
          // Nothing useful to say. Saying something anyway is how a channel
          // gets muted.
          if (!best) {
            peakSkipped++;
            continue;
          }

          const nudgeType = `nba_${best.kind}`;
          const nudgeRef = `${best.kind}-${now.toDateString()}`;
          if (await alreadySent(supabase, row.user_id, nudgeType, nudgeRef)) {
            peakSkipped++;
            continue;
          }
          // The morning plan already named this action today and promised this
          // follow-up, so the evening one is expected — but it must not be the
          // third time of asking.
          if (await alreadySent(supabase, row.user_id, 'morning_plan', `plan-${now.toDateString()}`)
              && best.kind === 'daily_goal') {
            peakSkipped++;
            continue;
          }

          await deliver(supabase, supabaseUrl, serviceKey, row.user_id, {
            type: nudgeType,
            referenceId: nudgeRef,
            title: best.title,
            body: best.reason,
            pushType: 'study',
            data: {
              role: 'apprentice',
              route: best.route,
              kind: best.kind,
              peakHour: row.peak_hour,
              personalised: row.personalised,
              ...best.payload,
            },
          });
          peakSent++;
        } catch (e) {
          console.error(`[daily-digest] peak_nudge failed for ${row.user_id}:`, e);
          captureException(e, {
            functionName: 'daily-notification-digest',
            userId: row.user_id,
            extra: { mode, targetHour },
          });
        }
      }

      console.log(
        `[daily-digest] peak_nudge hour=${targetHour}: ${peakSent} sent, ${peakSkipped} skipped, ${rows.length} due`
      );
      return new Response(
        JSON.stringify({ mode, targetHour, sent: peakSent, skipped: peakSkipped, due: rows.length }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ── Post-mock follow-up (every 2 hours) ────────────────────────────
    //
    // The only event-driven learning nudge, and the one with the highest
    // intent behind it: somebody has just sat a mock and knows exactly how it
    // went. Telling them three days later at 6pm that they were weak on
    // earthing is telling a stranger about a stranger.
    //
    // Unlike every other mode this does not sweep all push subscribers — it
    // starts from the sessions themselves, which is a few rows rather than
    // several hundred users.
    if (mode === 'mock_followup') {
      const windowStart = new Date(now.getTime() - 3 * 3600 * 1000).toISOString();
      const windowEnd = new Date(now.getTime() - 45 * 60 * 1000).toISOString();

      const pushable = new Set(userIds);
      let mockSent = 0;
      let mockSkipped = 0;

      const recent: { user_id: string; id: string }[] = [];
      for (const table of ['am2_mock_sessions', 'epa_mock_sessions']) {
        const { data } = await supabase
          .from(table)
          .select('id, user_id')
          .gte('completed_at', windowStart)
          .lte('completed_at', windowEnd)
          .not('overall_score', 'is', null);
        for (const row of (data ?? []) as { id: string; user_id: string }[]) {
          recent.push({ user_id: row.user_id, id: row.id });
        }
      }

      for (const session of recent) {
        if (!pushable.has(session.user_id)) continue;

        // One follow-up per session, not per run — this cron fires twelve
        // times a day and the session stays inside the window for two of them.
        if (await alreadySent(supabase, session.user_id, 'mock_followup', session.id)) continue;

        const { data: mockPref } = await supabase
          .from('notification_preferences')
          .select('enabled')
          .eq('user_id', session.user_id)
          .eq('category', 'study_centre')
          .single();
        if (mockPref && !mockPref.enabled) {
          mockSkipped++;
          continue;
        }

        const { data: ranked } = await supabase.rpc('get_next_best_actions', {
          p_user_id: session.user_id,
          p_limit: 3,
        });
        // The engine scores a fresh mock highest, so this is normally the
        // follow-up. If something genuinely beats it, send that instead —
        // the point is the moment, not the message.
        const best =
          (ranked as NextAction[] | null)?.find((a) => a.kind === 'mock_followup') ??
          (ranked as NextAction[] | null)?.[0];
        if (!best) {
          mockSkipped++;
          continue;
        }

        await deliver(supabase, supabaseUrl, serviceKey, session.user_id, {
          type: 'mock_followup',
          referenceId: session.id,
          title: best.title,
          body: best.reason,
          pushType: 'study',
          data: { route: best.route, kind: best.kind, ...best.payload },
        });
        mockSent++;
      }

      console.log(`[daily-digest] mock_followup: ${mockSent} sent, ${mockSkipped} skipped`);
      return new Response(
        JSON.stringify({ mode, sent: mockSent, skipped: mockSkipped, candidates: recent.length }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ── Process queued notifications from quiet hours (morning run only) ──
    if (mode === 'morning') {
      for (const userId of userIds) {
        const { data: queued } = await supabase
          .from('queued_notifications')
          .select('*')
          .eq('user_id', userId)
          .eq('processed', false)
          .order('created_at', { ascending: true });

        if (queued && queued.length > 0) {
          // Send each queued notification
          for (const q of queued) {
            await sendPush(supabaseUrl, serviceKey, userId, q.title, q.body, q.type, q.data);
          }
          // Mark all as processed
          const queuedIds = queued.map((q: { id: string }) => q.id);
          await supabase
            .from('queued_notifications')
            .update({ processed: true, processed_at: new Date().toISOString() })
            .in('id', queuedIds);
          console.log(
            `[daily-digest] Delivered ${queued.length} queued notifications for ${userId}`
          );
        }
      }
    }

    let totalSent = 0;
    let totalSkipped = 0;

    for (const userId of userIds) {
      try {
        // Look up user role + agent status for role-aware routing
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, business_ai_enabled')
          .eq('id', userId)
          .single();
        const role = profile?.role || 'electrician';
        const hasWhatsAppAgent = profile?.business_ai_enabled === true;

        // ── Learning nudge (18:00): the ranked engine, not a slogan ────
        //
        // This used to send "Time to study!" with a body built entirely from a
        // due-flashcard count. The flashcards table has never held a single
        // row, so the count was always zero and every learner got the same
        // fallback sentence — 5,362 identical pushes to 199 people.
        //
        // It now asks `get_next_best_actions` what this particular learner
        // should do and sends that, with the reason attached. The in-app card
        // reads the same function, so tapping the push lands on a screen that
        // repeats the sentence rather than a menu.
        if (mode === 'study_reminder') {
          if (role !== 'apprentice') continue;

          const { data: studyPref } = await supabase
            .from('notification_preferences')
            .select('enabled')
            .eq('user_id', userId)
            .eq('category', 'study_centre')
            .single();
          if (studyPref && !studyPref.enabled) continue;

          const { data: ranked, error: rankErr } = await supabase.rpc('get_next_best_actions', {
            p_user_id: userId,
            p_limit: 1,
          });
          if (rankErr) {
            console.warn(`[daily-digest] ranking failed for ${userId}:`, rankErr.message);
            totalSkipped++;
            continue;
          }

          const best = (ranked as NextAction[] | null)?.[0];
          // No candidate means we genuinely have nothing useful to say. Saying
          // something anyway is how a channel gets muted.
          if (!best) {
            totalSkipped++;
            continue;
          }

          // Dedup on the kind, not on the day, so a learner cannot be sent the
          // same kind of nudge twice — and the engine's own fatigue weighting
          // sees these rows and demotes whatever it just sent.
          const nudgeType = `nba_${best.kind}`;
          const nudgeRef = `${best.kind}-${new Date().toDateString()}`;
          if (await alreadySent(supabase, userId, nudgeType, nudgeRef)) {
            totalSkipped++;
            continue;
          }

          await deliver(supabase, supabaseUrl, serviceKey, userId, {
            type: nudgeType,
            referenceId: nudgeRef,
            title: best.title,
            body: best.reason,
            pushType: 'study',
            data: { role, route: best.route, kind: best.kind, ...best.payload },
          });
          totalSent++;
          continue;
        }

        // ── Morning plan (09:00 UTC) ───────────────────────────────────
        //
        // Apprentices only, and far enough clear of the 07:00 briefing that it
        // reads as its own message rather than the same one arriving twice.
        //
        // It names the hour the follow-up will arrive. Telling someone when the
        // next push is coming is what makes two study pushes in a day fair:
        // the second one is an appointment they were given at breakfast, not a
        // third interruption. Only possible because the peak-hour work means we
        // now know their hour instead of guessing one for everybody.
        if (mode === 'morning_plan') {
          if (role !== 'apprentice') continue;

          const planRef = `plan-${new Date().toDateString()}`;
          if (await alreadySent(supabase, userId, 'morning_plan', planRef)) continue;

          const { data: planPref } = await supabase
            .from('notification_preferences')
            .select('enabled')
            .eq('user_id', userId)
            .eq('category', 'study_centre')
            .single();
          if (planPref && !planPref.enabled) continue;

          // Already at it this morning — nothing to plan.
          const dayStart = new Date(now);
          dayStart.setHours(0, 0, 0, 0);
          const { data: studiedAlready } = await supabase
            .from('course_progress')
            .select('id')
            .eq('user_id', userId)
            .gte('last_accessed_at', dayStart.toISOString())
            .limit(1);
          if (studiedAlready && studiedAlready.length > 0) {
            totalSkipped++;
            continue;
          }

          const ranked = await callRpc<NextAction[]>(supabase, 'get_next_best_actions', {
            p_user_id: userId,
            p_limit: 3,
          });
          const nudgeHour =
            (await callRpc<number>(supabase, 'study_nudge_hour', { p_user_id: userId })) ?? 19;

          // Take the best candidate that has something to say in the morning,
          // rather than the top one full stop — otherwise a learner whose
          // highest-scoring action is a streak warning hears nothing all week.
          let copy: { title: string; body: string } | null = null;
          let chosen: NextAction | null = null;
          for (const candidate of ranked ?? []) {
            copy = morningCopy(candidate, nudgeHour);
            if (copy) {
              chosen = candidate;
              break;
            }
          }
          if (!copy || !chosen) {
            totalSkipped++;
            continue;
          }

          await deliver(supabase, supabaseUrl, serviceKey, userId, {
            type: 'morning_plan',
            referenceId: planRef,
            title: copy.title,
            body: copy.body,
            pushType: 'study',
            data: {
              role,
              route: chosen.route,
              kind: chosen.kind,
              nudgeHour,
              ...chosen.payload,
            },
          });
          totalSent++;
          continue;
        }

        // ── Come back (11:00 Sat) ──────────────────────────────────────
        //
        // Apprentices only. Of 193 push-enabled apprentices just 45 have
        // studied in the last week; 134 are dormant with a part-finished
        // qualification sitting there. Electricians are dormant in bigger
        // numbers but they are not mid-course — a study nudge to someone who
        // signed up for certificates is just noise, so this does not go to them.
        //
        // Three rules keep it from becoming the thing that gets the app
        // deleted:
        //
        //   a ladder, not a repeat — what you hear at ten days is not what you
        //     hear at two months, because the same sentence twice reads as a
        //     machine that has not noticed you
        //   their own work, never guilt — "we miss you" asks the learner for
        //     something; naming the section they left open offers them something
        //   a hard stop — three messages per dormant spell and then silence.
        //     An app that will not stop asking is an app you turn off, and the
        //     third message says out loud that it is the last one, because the
        //     promise is worth more than the fourth push would have been.
        if (mode === 'comeback') {
          if (role !== 'apprentice' && role !== 'electrician') continue;

          // ── Electricians ────────────────────────────────────────────
          //
          // A different world from the apprentice ladder below. An apprentice
          // comes back to a course; an electrician comes back to money and
          // paperwork. Of 178 dormant electricians with push enabled, 85 have a
          // half-written certificate in the app, 33 have a quote they priced up
          // and never sent, 10 are waiting on a reply they have not chased.
          // That is what brings a tradesperson back — their own unfinished
          // work, with the figure on it — not "we miss you".
          //
          // Same three-message cap and the same honest final message.
          if (role === 'electrician') {
            const { data: elecPref } = await supabase
              .from('notification_preferences')
              .select('enabled')
              .eq('user_id', userId)
              .eq('category', 'tasks_projects')
              .single();
            if (elecPref && !elecPref.enabled) continue;

            // Last sign of life: anything they produced, not anything they read.
            const lastWork: string[] = [];
            for (const [table, col] of [
              ['reports', 'created_at'],
              ['quotes', 'created_at'],
              ['invoices', 'created_at'],
            ] as const) {
              const { data: row } = await supabase
                .from(table)
                .select(col)
                .eq('user_id', userId)
                .order(col, { ascending: false })
                .limit(1);
              const v = (row as Record<string, string>[] | null)?.[0]?.[col];
              if (v) lastWork.push(v);
            }
            const lastActive = lastWork.length
              ? new Date(Math.max(...lastWork.map((d) => new Date(d).getTime())))
              : null;
            const daysQuiet = lastActive
              ? Math.floor((now.getTime() - lastActive.getTime()) / 86400000)
              : null;

            // Still working. A fortnight is a normal gap between jobs for a
            // sole trader — nudging at a week would be nudging people mid-job.
            if (daysQuiet !== null && daysQuiet < 14) continue;

            const since = lastActive ? lastActive.toISOString() : new Date(0).toISOString();
            const { data: alreadySentRows } = await supabase
              .from('push_notification_log')
              .select('id')
              .eq('user_id', userId)
              .like('type', 'eln_comeback%')
              .gte('sent_at', since);
            const sentCount = (alreadySentRows ?? []).length;
            if (sentCount >= 3) continue;

            const actions = await callRpc<NextAction[]>(supabase, 'get_electrician_actions', {
              p_user_id: userId,
              p_limit: 1,
            });
            const work = actions?.[0];
            if (!work) {
              totalSkipped++;
              continue;
            }

            // Never produced anything at all: an invitation, capped at two.
            if (work.kind === 'first_cert' && sentCount >= 2) continue;

            // The framing moves with the gap; the content stays their own work.
            let elecTitle = work.title;
            let elecBody = work.reason;
            if (daysQuiet !== null && daysQuiet >= 120) {
              // The last one, and it says so — only honest because the cap
              // above genuinely stops after it.
              elecTitle = 'Last nudge from us';
              elecBody = `${work.reason}. It stays saved either way — we will stop reminding you.`;
            } else if (daysQuiet !== null && daysQuiet >= 45) {
              elecBody = `${work.reason}. Still here whenever you want it.`;
            }

            const elecType = `eln_comeback_${work.kind}`;
            const elecRef = `${work.kind}-${sentCount + 1}`;
            if (await alreadySent(supabase, userId, elecType, elecRef)) continue;

            await deliver(supabase, supabaseUrl, serviceKey, userId, {
              type: elecType,
              referenceId: elecRef,
              title: elecTitle,
              body: elecBody,
              pushType: work.kind === 'unfinished_cert' ? 'certificate' : 'invoice',
              data: { role, route: work.route, kind: work.kind, daysQuiet, ...work.payload },
            });
            totalSent++;
            continue;
          }

          // ── Apprentices ─────────────────────────────────────────────

          const { data: cbPref } = await supabase
            .from('notification_preferences')
            .select('enabled')
            .eq('user_id', userId)
            .eq('category', 'study_centre')
            .single();
          if (cbPref && !cbPref.enabled) continue;

          // Last sign of life across both places study is recorded.
          const { data: lastRows } = await supabase
            .from('course_progress')
            .select('last_accessed_at')
            .eq('user_id', userId)
            .order('last_accessed_at', { ascending: false })
            .limit(1);
          const { data: profRow } = await supabase
            .from('profiles')
            .select('last_study_at')
            .eq('id', userId)
            .maybeSingle();

          const candidates = [
            (lastRows as { last_accessed_at?: string }[] | null)?.[0]?.last_accessed_at,
            (profRow as { last_study_at?: string } | null)?.last_study_at,
          ].filter(Boolean) as string[];
          const lastStudy = candidates.length
            ? new Date(Math.max(...candidates.map((d) => new Date(d).getTime())))
            : null;

          const daysAway = lastStudy
            ? Math.floor((now.getTime() - lastStudy.getTime()) / 86400000)
            : null;

          // Active, or gone so recently the evening nudge still covers it.
          if (daysAway !== null && daysAway < 7) continue;

          // The cap. Count what we have sent since they were last here, so
          // returning and lapsing again starts the ladder over rather than
          // landing them straight on the final message.
          const since = lastStudy ? lastStudy.toISOString() : new Date(0).toISOString();
          const { data: already } = await supabase
            .from('push_notification_log')
            .select('id, type')
            .eq('user_id', userId)
            .like('type', 'comeback%')
            .gte('sent_at', since);
          const sentSoFar = (already ?? []).length;
          if (sentSoFar >= 3) continue;

          // Never opened a course at all. Not a win-back — they have nothing to
          // win back — so it is an invitation, and it stops after two.
          if (lastStudy === null) {
            if (sentSoFar >= 2) continue;
            const startRef = `comeback-start-${sentSoFar + 1}`;
            if (await alreadySent(supabase, userId, 'comeback_start', startRef)) continue;
            await deliver(supabase, supabaseUrl, serviceKey, userId, {
              type: 'comeback_start',
              referenceId: startRef,
              title: 'You have not started yet',
              body: 'Pick a course and the first section takes about ten minutes.',
              pushType: 'study',
              data: { role, route: '/study-centre/browse' },
            });
            totalSent++;
            continue;
          }

          const { data: ranked } = await supabase.rpc('get_next_best_actions', {
            p_user_id: userId,
            p_limit: 4,
          });
          const list = (ranked as NextAction[] | null) ?? [];
          const unfinished = list.find((a) => a.kind === 'finish_section' || a.kind === 'resume');

          const { count: doneCount } = await supabase
            .from('course_progress')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('completed', true);

          let stage: string;
          let title: string;
          let body: string;
          let route = unfinished?.route ?? '/study-centre';

          if (daysAway !== null && daysAway < 21) {
            // Still warm. Their own open section is the whole message.
            stage = 'comeback_open';
            title = 'Your section is still open';
            body = unfinished
              ? `${unfinished.reason}. Ten minutes picks it back up.`
              : 'Ten minutes gets you moving again.';
          } else if (daysAway !== null && daysAway < 60) {
            // Long enough that the section title means little. What they have
            // already banked is the stronger argument for coming back.
            stage = 'comeback_progress';
            title = doneCount && doneCount > 0 ? 'Your progress is still saved' : 'Your course is still here';
            body =
              doneCount && doneCount > 0
                ? `${doneCount} section${doneCount === 1 ? '' : 's'} finished before you stopped. The next one is about ten minutes.`
                : 'Nothing has moved. Start wherever you like.';
            route = unfinished?.route ?? '/study-centre';
          } else {
            // The last one. Saying so is the point — and it is only honest
            // because the cap above genuinely stops after this.
            stage = 'comeback_final';
            title = 'Last nudge from us';
            body =
              doneCount && doneCount > 0
                ? `Your ${doneCount} finished section${doneCount === 1 ? '' : 's'} will be here whenever you want them. We will stop reminding you.`
                : 'Everything is saved if you want to come back. We will stop reminding you.';
            route = '/study-centre';
          }

          const cbRef = `${stage}-${sentSoFar + 1}`;
          if (await alreadySent(supabase, userId, stage, cbRef)) continue;

          await deliver(supabase, supabaseUrl, serviceKey, userId, {
            type: stage,
            referenceId: cbRef,
            title,
            body,
            pushType: 'study',
            data: { role, route, daysAway, stage },
          });
          totalSent++;
          continue;
        }

        // ── Weekly recap (Sunday 18:00) ────────────────────────────────
        //
        // Progress is invisible week to week when every nudge is about what is
        // still undone. This is the only push that leads with what the learner
        // finished, and it is the one place the streak gets celebrated rather
        // than defended.
        if (mode === 'weekly_recap') {
          const recapRef = `recap-${new Date().toDateString()}`;
          if (await alreadySent(supabase, userId, 'weekly_recap', recapRef)) continue;

          const { data: recapPref } = await supabase
            .from('notification_preferences')
            .select('enabled')
            .eq('user_id', userId)
            .eq('category', 'study_centre')
            .single();
          if (recapPref && !recapPref.enabled) continue;

          const weekAgo = new Date(now.getTime() - 7 * 86400000).toISOString();
          const { count: doneThisWeek } = await supabase
            .from('course_progress')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('completed', true)
            .gte('updated_at', weekAgo);

          // Nothing happened. A recap of nothing is a reproach, not a recap —
          // the evening nudge is the right surface for a dormant learner.
          if (!doneThisWeek || doneThisWeek === 0) {
            totalSkipped++;
            continue;
          }

          const { data: streakRow } = await supabase
            .from('user_study_streaks')
            .select('current_streak')
            .eq('user_id', userId)
            .maybeSingle();
          const streakDays = (streakRow as { current_streak?: number } | null)?.current_streak ?? 0;

          const { data: ranked } = await supabase.rpc('get_next_best_actions', {
            p_user_id: userId,
            p_limit: 1,
          });
          const next = (ranked as NextAction[] | null)?.[0];

          const sectionWord = doneThisWeek === 1 ? 'section' : 'sections';
          const recapBody = [
            `${doneThisWeek} ${sectionWord} finished this week`,
            streakDays >= 2 ? `${streakDays}-day streak` : null,
            next ? `Next: ${next.title.toLowerCase()}` : null,
          ]
            .filter(Boolean)
            .join(' · ');

          await deliver(supabase, supabaseUrl, serviceKey, userId, {
            type: 'weekly_recap',
            referenceId: recapRef,
            title: 'Your week',
            body: recapBody,
            pushType: 'study',
            data: { role, route: next?.route ?? '/study-centre', sections: doneThisWeek },
          });
          totalSent++;
          continue;
        }

        // ── Streak milestone (19:00) ───────────────────────────────────
        //
        // Every streak message in the app before this one was a warning. A
        // streak you are only ever told about when it is about to break is a
        // liability, not an achievement — so this fires on the way up, on the
        // days that are worth marking, and never on any other day.
        if (mode === 'streak_milestone') {
          const { data: streakRow } = await supabase
            .from('user_study_streaks')
            .select('current_streak, longest_streak, last_study_date')
            .eq('user_id', userId)
            .maybeSingle();

          const st = streakRow as {
            current_streak?: number;
            longest_streak?: number;
            last_study_date?: string | null;
          } | null;
          const days = st?.current_streak ?? 0;
          if (!MILESTONES.has(days)) continue;

          // Only if today is the day they earned it.
          const todayUk = new Date().toISOString().slice(0, 10);
          if (!st?.last_study_date || st.last_study_date.slice(0, 10) !== todayUk) continue;

          const milestoneRef = `streak-${days}`;
          if (await alreadySent(supabase, userId, 'streak_milestone', milestoneRef)) continue;

          const isBest = (st.longest_streak ?? 0) <= days;
          await deliver(supabase, supabaseUrl, serviceKey, userId, {
            type: 'streak_milestone',
            referenceId: milestoneRef,
            title: `${days} days in a row`,
            body: isBest
              ? 'That is the longest streak you have ever had. Keep it going tomorrow.'
              : `Your best is ${st.longest_streak} — you are on your way back.`,
            pushType: 'study',
            data: { role, route: '/study-centre', streak: days },
          });
          totalSent++;
          continue;
        }

        // ── End of day mode (5pm): wrap-up summary ───────────────────
        if (mode === 'end_of_day') {
          const eodRef = `eod-${new Date().toDateString()}`;
          const sent = await alreadySent(supabase, userId, 'end_of_day', eodRef);
          if (sent) continue;

          // Check if daily_briefing category is enabled
          const { data: briefPref } = await supabase
            .from('notification_preferences')
            .select('enabled')
            .eq('user_id', userId)
            .eq('category', 'daily_briefing')
            .single();
          if (briefPref && !briefPref.enabled) continue;

          const todayEodStart = new Date(now);
          todayEodStart.setHours(0, 0, 0, 0);

          // Tasks completed today
          const { count: completedCount } = await supabase
            .from('spark_tasks')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', userId)
            .in('status', ['completed', 'done'])
            .gte('updated_at', todayEodStart.toISOString());

          // Tasks still open/overdue
          const { count: openCount } = await supabase
            .from('spark_tasks')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', userId)
            .in('status', ['open', 'in_progress'])
            .not('due_at', 'is', null)
            .lte('due_at', now.toISOString());

          // Invoices sent today
          const { count: invoicesSent } = await supabase
            .from('invoices')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', userId)
            .gte('created_at', todayEodStart.toISOString())
            .is('deleted_at', null);

          // Tomorrow's schedule
          const tomorrowStart = new Date(now);
          tomorrowStart.setDate(tomorrowStart.getDate() + 1);
          tomorrowStart.setHours(0, 0, 0, 0);
          const tomorrowEnd = new Date(tomorrowStart);
          tomorrowEnd.setHours(23, 59, 59, 999);

          const { data: tomorrowJobs } = await supabase
            .from('calendar_events')
            .select('id, title, start_at')
            .eq('user_id', userId)
            .gte('start_at', tomorrowStart.toISOString())
            .lte('start_at', tomorrowEnd.toISOString())
            .order('start_at', { ascending: true })
            .limit(3);

          // Build end of day message
          const eodParts: string[] = [];
          if (completedCount && completedCount > 0) {
            eodParts.push(
              `${completedCount} task${completedCount !== 1 ? 's' : ''} completed today`
            );
          }
          if (openCount && openCount > 0) {
            eodParts.push(`${openCount} still outstanding`);
          }
          if (invoicesSent && invoicesSent > 0) {
            eodParts.push(`${invoicesSent} invoice${invoicesSent !== 1 ? 's' : ''} sent`);
          }
          if (tomorrowJobs && tomorrowJobs.length > 0) {
            const firstTime = new Date(tomorrowJobs[0].start_at).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            });
            eodParts.push(
              `Tomorrow: ${tomorrowJobs.length} job${tomorrowJobs.length !== 1 ? 's' : ''}, first at ${firstTime}`
            );
          } else {
            eodParts.push('Nothing scheduled tomorrow');
          }

          // Second guard: if the only thing we have to say is that there is
          // nothing, say nothing. `eodParts` could never be empty — the branch
          // above always pushes a line — so the "Quiet day" fallback was
          // unreachable, and the real empty case was a push whose entire
          // content was "Nothing scheduled tomorrow".
          const hasSomethingToReport = eodParts.some(
            (line) => line !== 'Nothing scheduled tomorrow'
          );
          if (!hasSomethingToReport) {
            totalSkipped++;
            continue;
          }

          const eodBody = eodParts.join('\n');

          await sendPush(
            supabaseUrl,
            serviceKey,
            userId,
            'End of day wrap-up',
            eodBody,
            'briefing',
            { role, tag: 'briefing-eod', skipQuietHours: true }
          );
          await logPush(supabase, userId, {
            type: 'end_of_day',
            referenceId: eodRef,
            title: 'End of day wrap-up',
            body: eodBody,
            pushType: 'briefing',
          });
          totalSent++;
          continue;
        }

        const alerts = await buildAlertsForUser(supabase, userId, role);

        // ── Generate "Your Day" morning briefing ──────────────────────
        if (alerts.length > 0) {
          // Build a concise summary per category
          const parts: string[] = [];

          // Each line is a complete clause in the same voice. This used to take
          // a title from one alert and a body from the next, so the brief read
          // as three different people writing one message.

          // Jobs today
          const jobAlerts = alerts.filter((a) => a.type === 'jobs_today');
          if (jobAlerts.length > 0) {
            parts.push(`${jobAlerts[0].title}, ${jobAlerts[0].body.toLowerCase()}`);
          }

          // Tasks
          const taskAlerts = alerts.filter((a) => a.type === 'overdue_tasks');
          if (taskAlerts.length > 0) parts.push(taskAlerts[0].title);

          // Invoices — the "Tap to chase" call to action is dropped here. The
          // whole notification is a tap target; telling someone to tap it is
          // the sort of line that makes an app sound like a leaflet.
          const invoiceAlerts = alerts.filter((a) => a.type === 'overdue_invoices');
          if (invoiceAlerts.length > 0) {
            parts.push(invoiceAlerts[0].body.replace(/\.?\s*Tap to chase\.?$/i, ''));
          }

          // Certs
          const certAlerts = alerts.filter((a) =>
            ['ecs_card_expiry', 'equipment_calibration', 'eicr_reinspection'].includes(a.type)
          );
          if (certAlerts.length > 0)
            parts.push(`${certAlerts.length} cert alert${certAlerts.length > 1 ? 's' : ''}`);

          // Apprentice study
          const studyAlerts = alerts.filter((a) =>
            ['flashcards_due', 'streak_broken', 'assessment_due', 'ojt_hours_behind'].includes(
              a.type
            )
          );
          if (studyAlerts.length > 0 && role === 'apprentice') {
            parts.push(`${studyAlerts.length} study reminder${studyAlerts.length > 1 ? 's' : ''}`);
          }

          // Mood check-in (always last)
          const moodAlert = alerts.find((a) => a.type === 'mood_checkin');
          if (moodAlert) parts.push('How are you feeling today?');

          const briefingSummary = parts.join('\n');

          // Personalised greeting — pulls the user's first name so the brief
          // never reads like a generic broadcast.
          const { data: nameRow } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', userId)
            .maybeSingle();
          // ELE-1378 — names are sometimes stored ALL CAPS ("ANDREW MOORE"); the
          // brief must read "Good morning, Andrew", never "ANDREW".
          const firstNameRaw = (nameRow?.full_name || '').trim().split(' ')[0];
          const firstName =
            firstNameRaw &&
            (firstNameRaw === firstNameRaw.toUpperCase() ||
              firstNameRaw === firstNameRaw.toLowerCase())
              ? firstNameRaw.charAt(0).toUpperCase() + firstNameRaw.slice(1).toLowerCase()
              : firstNameRaw;

          alerts.unshift({
            type: 'morning_briefing',
            referenceId: `briefing-${new Date().toDateString()}`,
            title: firstName ? `Good morning, ${firstName}` : 'Good morning',
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

        // ── Send ONE consolidated push instead of many individual ones ──
        // Find the morning briefing (always first if it exists)
        const briefing = filteredAlerts.find((a) => a.type === 'morning_briefing');
        const detailAlerts = filteredAlerts.filter((a) => a.type !== 'morning_briefing');

        // An apprentice's day is the morning plan and the reminder it promises.
        // The briefing fires two hours earlier and, for most apprentices, its
        // entire content is the mood prompt — so it would take one of the two
        // daily slots and crowd out the evening nudge, which is the one that
        // lands at the hour they actually study. Let it through only when it
        // has something of its own to say.
        const briefingIsJustMood =
          role === 'apprentice' &&
          detailAlerts.every((a) => a.type === 'mood_checkin' || a.type === 'streak_broken');
        if (briefing && briefingIsJustMood) {
          totalSkipped += filteredAlerts.length;
          continue;
        }

        if (briefing) {
          const sent = await alreadySent(supabase, userId, briefing.type, briefing.referenceId);
          if (sent) {
            totalSkipped += filteredAlerts.length;
          } else {
            // Build body — keep it shorter if user also gets WhatsApp morning brief
            // The push is a self-contained brief — never cross-references another
            // channel (no "check WhatsApp"). WhatsApp users get their richer brief
            // separately in WhatsApp; this push stands on its own.
            const detailLines = detailAlerts.map((a) => `${a.title}: ${a.body}`);
            const consolidatedBody =
              detailLines.length > 0 ? detailLines.join('\n') : briefing.body;
            void hasWhatsAppAgent;

            await sendPush(
              supabaseUrl,
              serviceKey,
              userId,
              briefing.title,
              consolidatedBody,
              briefing.pushType,
              { ...briefing.data, alertCount: filteredAlerts.length }
            );
            await logPush(supabase, userId, briefing);
            totalSent++;

            // Log all individual alerts as sent (for dedup) without sending separate pushes
            for (const alert of detailAlerts) {
              const alertSent = await alreadySent(supabase, userId, alert.type, alert.referenceId);
              if (!alertSent) {
                await logPush(supabase, userId, alert);
              }
            }
          }
        } else if (filteredAlerts.length > 0) {
          // Edge case: no briefing but alerts exist (shouldn't happen, but be safe)
          // Send just one summary
          const first = filteredAlerts[0];
          const sent = await alreadySent(supabase, userId, first.type, first.referenceId);
          if (!sent) {
            await sendPush(
              supabaseUrl,
              serviceKey,
              userId,
              first.title,
              first.body,
              first.pushType,
              first.data
            );
            await logPush(supabase, userId, first);
            totalSent++;
          }
          // Log rest as sent for dedup
          for (const alert of filteredAlerts.slice(1)) {
            const alertSent = await alreadySent(supabase, userId, alert.type, alert.referenceId);
            if (!alertSent) {
              await logPush(supabase, userId, alert);
            }
          }
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
    await captureException(error, {
      functionName: 'daily-notification-digest',
      requestUrl: req.url,
      requestMethod: req.method,
    });
    console.error('[daily-digest] Fatal error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
