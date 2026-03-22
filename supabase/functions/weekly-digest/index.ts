/**
 * Weekly Digest — ELE-160
 *
 * Runs via pg_cron Sunday 7pm UTC.
 * For each active agent user, gathers the week's activity and sends
 * a WhatsApp summary showing what Mate did this week.
 *
 * Trigger: pg_cron schedule or manual POST
 */

import { createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError } from '../_shared/errors.ts';

const VPS_URL = Deno.env.get('VPS_MCP_URL') || 'http://89.167.69.251:3100';
const VPS_API_KEY = Deno.env.get('VPS_API_KEY') || '';

interface WeeklyData {
  firstName: string;
  weekLabel: string;
  // Money
  invoicesCreated: number;
  invoicesPaid: number;
  amountCollected: number;
  overdueInvoices: number;
  overdueTotal: number;
  // Quotes
  quotesSent: number;
  quotesAccepted: number;
  quotesValue: number;
  // Certs
  certsGenerated: number;
  // Tasks
  tasksCompleted: number;
  tasksCreated: number;
  // Activity
  toolCalls: number;
  messagesSent: number;
  ragQueries: number;
  // Next week
  nextWeekEvents: Array<{ title: string; day: string }>;
  // Flags
  expiringCerts: number;
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

    // Check user preferences for digest opt-out
    const userIds = activeUsers.map((u) => u.id);
    const { data: prefs } = await supabase
      .from('user_agent_preferences')
      .select('user_id, key, value')
      .in('user_id', userIds)
      .eq('key', 'weekly_digest_enabled');

    const disabledUsers = new Set(
      (prefs || []).filter((p) => p.value === 'false').map((p) => p.user_id)
    );

    // Date ranges
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 7);
    const weekStartISO = weekStart.toISOString();

    const nextWeekEnd = new Date(now);
    nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);

    // Format week label
    const fmt = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    const weekLabel = `${fmt(weekStart)}–${fmt(now)}`;

    const results: Array<{ user_id: string; sent: boolean; error?: string }> = [];

    for (const user of activeUsers) {
      if (disabledUsers.has(user.id)) {
        results.push({ user_id: user.id, sent: false, error: 'disabled_by_preference' });
        continue;
      }

      try {
        const data = await gatherWeeklyData(supabase, user.id, weekStartISO, now, nextWeekEnd);
        const firstName = (user.full_name || 'mate').split(' ')[0];

        const message = composeDigest({ ...data, firstName, weekLabel });
        const sent = await sendWhatsApp(user.agent_whatsapp_number, message);
        results.push({ user_id: user.id, sent });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`Failed to send digest to ${user.id}: ${msg}`);
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

async function gatherWeeklyData(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  weekStartISO: string,
  now: Date,
  nextWeekEnd: Date
): Promise<Omit<WeeklyData, 'firstName' | 'weekLabel'>> {
  const thirtyDaysAhead = new Date(now);
  thirtyDaysAhead.setDate(thirtyDaysAhead.getDate() + 30);

  const [
    invoicesCreatedResult,
    invoicesPaidResult,
    overdueInvoicesResult,
    quotesSentResult,
    quotesAcceptedResult,
    certsResult,
    tasksCompletedResult,
    tasksCreatedResult,
    usageResult,
    nextWeekEventsResult,
    expiringCertsResult,
  ] = await Promise.all([
    // Invoices created this week
    supabase
      .from('invoices')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', weekStartISO),

    // Invoices paid this week
    supabase
      .from('invoices')
      .select('id, total')
      .eq('user_id', userId)
      .eq('status', 'paid')
      .gte('paid_at', weekStartISO),

    // Overdue invoices (24h grace period)
    supabase
      .from('invoices')
      .select('id, total')
      .eq('user_id', userId)
      .neq('status', 'paid')
      .neq('status', 'draft')
      .lt('due_date', new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()),

    // Quotes sent this week
    supabase
      .from('quotes')
      .select('id, total', { count: 'exact' })
      .eq('user_id', userId)
      .gte('created_at', weekStartISO)
      .eq('invoice_raised', false),

    // Quotes accepted this week
    supabase
      .from('quotes')
      .select('id, total')
      .eq('user_id', userId)
      .eq('status', 'accepted')
      .gte('updated_at', weekStartISO)
      .eq('invoice_raised', false),

    // Certs generated this week
    supabase
      .from('reports')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', weekStartISO),

    // Tasks completed this week
    supabase
      .from('spark_tasks')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'completed')
      .gte('completed_at', weekStartISO),

    // Tasks created this week
    supabase
      .from('spark_tasks')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', weekStartISO),

    // Usage stats this week
    supabase
      .from('agent_usage')
      .select('tool_calls, messages_sent, rag_queries')
      .eq('user_id', userId)
      .gte('date', weekStartISO.slice(0, 10)),

    // Next week calendar events
    supabase
      .from('calendar_events')
      .select('title, start_at')
      .eq('user_id', userId)
      .gte('start_at', now.toISOString())
      .lt('start_at', nextWeekEnd.toISOString())
      .order('start_at', { ascending: true })
      .limit(10),

    // Expiring certs (next 30 days)
    supabase
      .from('reports')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .not('expiry_date', 'is', null)
      .lte('expiry_date', thirtyDaysAhead.toISOString())
      .gte('expiry_date', now.toISOString()),
  ]);

  const paidInvoices = invoicesPaidResult.data || [];
  const amountCollected = paidInvoices.reduce((sum, inv) => sum + (Number(inv.total) || 0), 0);

  const overdueInvoices = overdueInvoicesResult.data || [];
  const overdueTotal = overdueInvoices.reduce((sum, inv) => sum + (Number(inv.total) || 0), 0);

  const acceptedQuotes = quotesAcceptedResult.data || [];
  const quotesValue = acceptedQuotes.reduce((sum, q) => sum + (Number(q.total) || 0), 0);

  const usageRows = usageResult.data || [];
  const usage = usageRows.reduce(
    (acc, row) => ({
      tool_calls: acc.tool_calls + (row.tool_calls || 0),
      messages_sent: acc.messages_sent + (row.messages_sent || 0),
      rag_queries: acc.rag_queries + (row.rag_queries || 0),
    }),
    { tool_calls: 0, messages_sent: 0, rag_queries: 0 }
  );

  const nextWeekEvents = (nextWeekEventsResult.data || []).map((ev) => ({
    title: ev.title,
    day: new Date(ev.start_at).toLocaleDateString('en-GB', { weekday: 'short' }),
  }));

  return {
    invoicesCreated: invoicesCreatedResult.count || 0,
    invoicesPaid: paidInvoices.length,
    amountCollected,
    overdueInvoices: overdueInvoices.length,
    overdueTotal,
    quotesSent: quotesSentResult.count || 0,
    quotesAccepted: acceptedQuotes.length,
    quotesValue,
    certsGenerated: certsResult.count || 0,
    tasksCompleted: tasksCompletedResult.count || 0,
    tasksCreated: tasksCreatedResult.count || 0,
    toolCalls: usage.tool_calls,
    messagesSent: usage.messages_sent,
    ragQueries: usage.rag_queries,
    nextWeekEvents,
    expiringCerts: expiringCertsResult.count || 0,
  };
}

function composeDigest(data: WeeklyData): string {
  const lines: string[] = [];

  lines.push(`⚡ Your week with Mate — ${data.weekLabel}`);
  lines.push('');

  // Money section
  const moneyLines: string[] = [];
  if (data.invoicesPaid > 0) {
    moneyLines.push(
      `${data.invoicesPaid} invoice${data.invoicesPaid === 1 ? '' : 's'} paid — £${data.amountCollected.toLocaleString()} collected`
    );
  }
  if (data.invoicesCreated > 0) {
    moneyLines.push(
      `${data.invoicesCreated} invoice${data.invoicesCreated === 1 ? '' : 's'} created`
    );
  }
  if (data.overdueInvoices > 0) {
    moneyLines.push(
      `${data.overdueInvoices} invoice${data.overdueInvoices === 1 ? '' : 's'} overdue — £${data.overdueTotal.toLocaleString()} outstanding`
    );
  }
  if (moneyLines.length > 0) {
    lines.push('💰 Money');
    moneyLines.forEach((l) => lines.push(`• ${l}`));
    lines.push('');
  }

  // Quotes section
  const quoteLines: string[] = [];
  if (data.quotesSent > 0) {
    quoteLines.push(`${data.quotesSent} quote${data.quotesSent === 1 ? '' : 's'} sent`);
  }
  if (data.quotesAccepted > 0) {
    quoteLines.push(`${data.quotesAccepted} accepted — £${data.quotesValue.toLocaleString()} won`);
  }
  if (quoteLines.length > 0) {
    lines.push('📨 Quotes');
    quoteLines.forEach((l) => lines.push(`• ${l}`));
    lines.push('');
  }

  // Jobs & Tasks section
  const taskLines: string[] = [];
  if (data.tasksCompleted > 0) {
    taskLines.push(`${data.tasksCompleted} task${data.tasksCompleted === 1 ? '' : 's'} completed`);
  }
  if (data.tasksCreated > 0) {
    taskLines.push(`${data.tasksCreated} new task${data.tasksCreated === 1 ? '' : 's'} created`);
  }
  if (taskLines.length > 0) {
    lines.push('📋 Tasks');
    taskLines.forEach((l) => lines.push(`• ${l}`));
    lines.push('');
  }

  // Certs section
  if (data.certsGenerated > 0) {
    lines.push('📄 Certificates');
    lines.push(`• ${data.certsGenerated} cert${data.certsGenerated === 1 ? '' : 's'} generated`);
    lines.push('');
  }

  // Next week
  if (data.nextWeekEvents.length > 0) {
    lines.push('📅 Next week');
    // Group by day
    const byDay = new Map<string, string[]>();
    for (const ev of data.nextWeekEvents) {
      const existing = byDay.get(ev.day) || [];
      existing.push(ev.title);
      byDay.set(ev.day, existing);
    }
    for (const [day, titles] of byDay) {
      lines.push(`• ${day}: ${titles.join(', ')}`);
    }
    lines.push('');
  }

  // Flags
  const flags: string[] = [];
  if (data.overdueInvoices > 0) {
    flags.push(
      `${data.overdueInvoices} overdue invoice${data.overdueInvoices === 1 ? '' : 's'} to chase`
    );
  }
  if (data.expiringCerts > 0) {
    flags.push(
      `${data.expiringCerts} cert${data.expiringCerts === 1 ? '' : 's'} expiring in next 30 days`
    );
  }
  if (flags.length > 0) {
    lines.push('⚠️ Heads up');
    flags.forEach((f) => lines.push(`• ${f}`));
    lines.push('');
  }

  // Agent activity summary
  if (data.toolCalls > 0) {
    lines.push(
      `🤖 Mate handled ${data.toolCalls} action${data.toolCalls === 1 ? '' : 's'} this week`
    );
    lines.push('');
  }

  // If nothing happened
  if (
    data.invoicesCreated === 0 &&
    data.quotesSent === 0 &&
    data.tasksCompleted === 0 &&
    data.certsGenerated === 0 &&
    data.toolCalls === 0
  ) {
    return `⚡ Your week with Mate — ${data.weekLabel}\n\nQuiet week! I'm here whenever you need me. Just send a message to get started.`;
  }

  // CTA
  lines.push('Want me to chase overdue invoices or send renewal reminders? Just ask.');

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
