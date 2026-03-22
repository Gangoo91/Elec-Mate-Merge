/**
 * End-of-Day Summary
 *
 * Runs via pg_cron at 5:30pm UTC weekdays.
 * For each user with agent_status='active' and eod_prompt_enabled:
 *   - Gathers today's activity: tasks completed, invoices sent/paid, quotes,
 *     certs generated, agent actions, calendar events
 *   - Composes a smart EOD summary via WhatsApp
 *   - Shows what got done, what's still outstanding, and what's on for tomorrow
 *   - If no activity today, skips (don't nag on days off)
 *
 * Trigger: pg_cron schedule or manual POST
 * Auth: Service role (cron) or VPS API key (manual)
 */

import { createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError } from '../_shared/errors.ts';

const VPS_URL = Deno.env.get('VPS_MCP_URL') || 'http://89.167.69.251:3100';
const VPS_API_KEY = Deno.env.get('VPS_API_KEY') || '';

interface EodData {
  firstName: string;
  // Today's activity
  tasksCompleted: number;
  tasksCreated: number;
  tasksRemaining: number;
  overdueTaskCount: number;
  // Money
  invoicesSent: number;
  invoicesPaid: number;
  amountCollected: number;
  quotesSent: number;
  // Certs
  certsGenerated: number;
  // Calendar
  eventsToday: number;
  // Agent
  toolCalls: number;
  // Tomorrow
  tomorrowEvents: Array<{ title: string; start_at: string }>;
  // Outstanding
  overdueInvoiceCount: number;
  overdueInvoiceTotal: number;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const now = new Date();
    const dayOfWeek = now.getDay();

    // Skip weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return new Response(JSON.stringify({ skipped: true, reason: 'weekend' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get all active agent users
    const { data: activeUsers, error: usersError } = await supabase
      .from('profiles')
      .select('id, full_name, agent_whatsapp_number, agent_status')
      .eq('agent_status', 'active')
      .eq('business_ai_enabled', true)
      .not('agent_whatsapp_number', 'is', null);

    if (usersError) throw new Error(`Failed to fetch active users: ${usersError.message}`);
    if (!activeUsers || activeUsers.length === 0) {
      return new Response(JSON.stringify({ sent: 0, reason: 'no_active_users' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check user preferences for EOD opt-out
    const userIds = activeUsers.map((u) => u.id);
    const { data: prefs } = await supabase
      .from('user_agent_preferences')
      .select('user_id, key, value')
      .in('user_id', userIds)
      .eq('key', 'eod_prompt_enabled');

    const disabledUsers = new Set(
      (prefs || []).filter((p) => p.value === 'false').map((p) => p.user_id)
    );

    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const todayEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59
    ).toISOString();

    // Tomorrow range
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStart = new Date(
      tomorrow.getFullYear(),
      tomorrow.getMonth(),
      tomorrow.getDate()
    ).toISOString();
    const tomorrowEnd = new Date(
      tomorrow.getFullYear(),
      tomorrow.getMonth(),
      tomorrow.getDate(),
      23,
      59,
      59
    ).toISOString();

    const results: Array<{ user_id: string; sent: boolean; error?: string }> = [];

    for (const user of activeUsers) {
      if (disabledUsers.has(user.id)) {
        results.push({ user_id: user.id, sent: false, error: 'disabled_by_preference' });
        continue;
      }

      try {
        const data = await gatherEodData(
          supabase,
          user.id,
          todayStart,
          todayEnd,
          tomorrowStart,
          tomorrowEnd,
          now
        );
        const firstName = (user.full_name || 'mate').split(' ')[0];

        // Skip if zero activity today
        if (
          data.tasksCompleted === 0 &&
          data.tasksCreated === 0 &&
          data.invoicesSent === 0 &&
          data.invoicesPaid === 0 &&
          data.quotesSent === 0 &&
          data.certsGenerated === 0 &&
          data.eventsToday === 0 &&
          data.toolCalls === 0
        ) {
          results.push({ user_id: user.id, sent: false, error: 'no_activity_today' });
          continue;
        }

        const message = composeEodSummary({ ...data, firstName });
        const sent = await sendWhatsApp(user.agent_whatsapp_number, message);
        results.push({ user_id: user.id, sent });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`Failed to send EOD summary to ${user.id}: ${msg}`);
        results.push({ user_id: user.id, sent: false, error: msg });
      }
    }

    return new Response(
      JSON.stringify({
        sent: results.filter((r) => r.sent).length,
        total: results.length,
        results,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return handleError(error);
  }
});

async function gatherEodData(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  todayStart: string,
  todayEnd: string,
  tomorrowStart: string,
  tomorrowEnd: string,
  now: Date
): Promise<Omit<EodData, 'firstName'>> {
  const [
    tasksCompletedResult,
    tasksCreatedResult,
    tasksRemainingResult,
    overdueTaskResult,
    invoicesSentResult,
    invoicesPaidResult,
    quotesSentResult,
    certsResult,
    eventsResult,
    usageResult,
    tomorrowEventsResult,
    overdueInvoicesResult,
  ] = await Promise.all([
    // Tasks completed today
    supabase
      .from('spark_tasks')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'done')
      .gte('completed_at', todayStart)
      .lt('completed_at', todayEnd),

    // Tasks created today
    supabase
      .from('spark_tasks')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', todayStart)
      .lt('created_at', todayEnd),

    // Open tasks remaining
    supabase
      .from('spark_tasks')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'open'),

    // Overdue tasks
    supabase
      .from('spark_tasks')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'open')
      .lt('due_at', now.toISOString()),

    // Invoices sent today
    supabase
      .from('invoices')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', todayStart)
      .lt('created_at', todayEnd),

    // Invoices paid today
    supabase
      .from('invoices')
      .select('id, total')
      .eq('user_id', userId)
      .eq('status', 'paid')
      .gte('paid_at', todayStart)
      .lt('paid_at', todayEnd),

    // Quotes sent today
    supabase
      .from('quotes')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('invoice_raised', false)
      .gte('created_at', todayStart)
      .lt('created_at', todayEnd),

    // Certs generated today
    supabase
      .from('reports')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', todayStart)
      .lt('created_at', todayEnd),

    // Calendar events today
    supabase
      .from('calendar_events')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('start_at', todayStart)
      .lt('start_at', todayEnd),

    // Agent usage today
    supabase
      .from('agent_usage')
      .select('tool_calls')
      .eq('user_id', userId)
      .eq('date', todayStart.slice(0, 10)),

    // Tomorrow's events
    supabase
      .from('calendar_events')
      .select('title, start_at')
      .eq('user_id', userId)
      .gte('start_at', tomorrowStart)
      .lt('start_at', tomorrowEnd)
      .order('start_at', { ascending: true })
      .limit(5),

    // Overdue invoices (24h grace period)
    supabase
      .from('invoices')
      .select('id, total')
      .eq('user_id', userId)
      .neq('status', 'paid')
      .neq('status', 'draft')
      .lt('due_date', new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()),
  ]);

  const paidInvoices = invoicesPaidResult.data || [];
  const amountCollected = paidInvoices.reduce((sum, inv) => sum + (Number(inv.total) || 0), 0);

  const usageRows = usageResult.data || [];
  const toolCalls = usageRows.reduce((sum, row) => sum + (row.tool_calls || 0), 0);

  const overdueInvoices = overdueInvoicesResult.data || [];
  const overdueInvoiceTotal = overdueInvoices.reduce(
    (sum, inv) => sum + (Number(inv.total) || 0),
    0
  );

  return {
    tasksCompleted: tasksCompletedResult.count || 0,
    tasksCreated: tasksCreatedResult.count || 0,
    tasksRemaining: tasksRemainingResult.count || 0,
    overdueTaskCount: overdueTaskResult.count || 0,
    invoicesSent: invoicesSentResult.count || 0,
    invoicesPaid: paidInvoices.length,
    amountCollected,
    quotesSent: quotesSentResult.count || 0,
    certsGenerated: certsResult.count || 0,
    eventsToday: eventsResult.count || 0,
    toolCalls,
    tomorrowEvents: (tomorrowEventsResult.data || []) as Array<{
      title: string;
      start_at: string;
    }>,
    overdueInvoiceCount: overdueInvoices.length,
    overdueInvoiceTotal,
  };
}

function composeEodSummary(data: EodData): string {
  const lines: string[] = [];
  const isFriday = new Date().getDay() === 5;

  lines.push(`⚡ ${isFriday ? 'End of week' : 'End of day'} ${data.firstName}!`);
  lines.push('');

  // What got done today
  const doneLines: string[] = [];
  if (data.tasksCompleted > 0) {
    doneLines.push(`${data.tasksCompleted} task${data.tasksCompleted === 1 ? '' : 's'} completed`);
  }
  if (data.invoicesPaid > 0) {
    doneLines.push(
      `${data.invoicesPaid} invoice${data.invoicesPaid === 1 ? '' : 's'} paid — £${data.amountCollected.toLocaleString()}`
    );
  }
  if (data.invoicesSent > 0) {
    doneLines.push(`${data.invoicesSent} invoice${data.invoicesSent === 1 ? '' : 's'} sent`);
  }
  if (data.quotesSent > 0) {
    doneLines.push(`${data.quotesSent} quote${data.quotesSent === 1 ? '' : 's'} sent`);
  }
  if (data.certsGenerated > 0) {
    doneLines.push(`${data.certsGenerated} cert${data.certsGenerated === 1 ? '' : 's'} generated`);
  }

  if (doneLines.length > 0) {
    lines.push('✅ Today:');
    doneLines.forEach((l) => lines.push(`• ${l}`));
    lines.push('');
  }

  // Outstanding
  const outstandingLines: string[] = [];
  if (data.tasksRemaining > 0) {
    outstandingLines.push(
      `${data.tasksRemaining} open task${data.tasksRemaining === 1 ? '' : 's'}${data.overdueTaskCount > 0 ? ` (${data.overdueTaskCount} overdue)` : ''}`
    );
  }
  if (data.overdueInvoiceCount > 0) {
    outstandingLines.push(
      `${data.overdueInvoiceCount} overdue invoice${data.overdueInvoiceCount === 1 ? '' : 's'} — £${data.overdueInvoiceTotal.toLocaleString()}`
    );
  }

  if (outstandingLines.length > 0) {
    lines.push('📋 Outstanding:');
    outstandingLines.forEach((l) => lines.push(`• ${l}`));
    lines.push('');
  }

  // Tomorrow preview
  if (data.tomorrowEvents.length > 0) {
    const label = isFriday ? '📅 Monday:' : '📅 Tomorrow:';
    lines.push(label);
    for (const ev of data.tomorrowEvents) {
      const time = new Date(ev.start_at).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      });
      lines.push(`• ${time} — ${ev.title}`);
    }
    lines.push('');
  }

  // Agent activity
  if (data.toolCalls > 0) {
    lines.push(`🤖 Mate handled ${data.toolCalls} action${data.toolCalls === 1 ? '' : 's'} today`);
    lines.push('');
  }

  // CTA
  if (data.overdueInvoiceCount > 0) {
    lines.push('Want me to chase overdue invoices? Just ask.');
  } else if (data.tasksRemaining > 0 && data.overdueTaskCount > 0) {
    lines.push('Want me to reschedule overdue tasks to tomorrow?');
  } else {
    lines.push('Have a good evening!');
  }

  return lines.join('\n');
}

async function sendWhatsApp(target: string, message: string): Promise<boolean> {
  const response = await fetch(`${VPS_URL}/api/send-message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': VPS_API_KEY,
    },
    body: JSON.stringify({ target, message, channel: 'whatsapp' }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Send failed (${response.status}): ${errorText}`);
  }

  return true;
}
