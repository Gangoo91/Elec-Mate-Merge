/**
 * Proactive Morning Brief
 *
 * Runs via pg_cron at 7am UTC weekdays.
 * For each user with agent_status='active' and morning_brief_enabled:
 *   - Gathers business snapshot data
 *   - Composes a briefing (Monday = weekly, Tue-Fri = daily)
 *   - Sends via OpenClaw WhatsApp on VPS
 *
 * Trigger: pg_cron schedule or manual POST
 * Auth: Service role (cron) or VPS API key (manual)
 */

import { createClient, corsHeaders } from '../_shared/deps.ts';
import { handleError } from '../_shared/errors.ts';

const VPS_URL = Deno.env.get('VPS_MCP_URL') || 'http://89.167.69.251:3100';
const VPS_API_KEY = Deno.env.get('VPS_API_KEY') || '';

interface ProjectTaskGroup {
  project_title: string;
  project_id: string;
  location: string | null;
  open_count: number;
  overdue_count: number;
}

interface UserBriefData {
  user_id: string;
  phone: string;
  name: string;
  open_tasks: number;
  overdue_tasks: number;
  pending_quotes: number;
  overdue_invoices: number;
  overdue_invoice_total: number;
  expiring_certs: number;
  today_events: Array<{ title: string; start_at: string }>;
  project_tasks: ProjectTaskGroup[];
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
    const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

    // Skip weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return new Response(JSON.stringify({ skipped: true, reason: 'weekend' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const isMonday = dayOfWeek === 1;

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

    // Check user preferences for morning brief opt-out
    const userIds = activeUsers.map((u) => u.id);
    const { data: prefs } = await supabase
      .from('user_agent_preferences')
      .select('user_id, key, value')
      .in('user_id', userIds)
      .eq('key', 'morning_brief_enabled');

    const disabledUsers = new Set(
      (prefs || []).filter((p) => p.value === 'false').map((p) => p.user_id)
    );

    const results: Array<{ user_id: string; sent: boolean; error?: string }> = [];

    for (const user of activeUsers) {
      if (disabledUsers.has(user.id)) {
        results.push({ user_id: user.id, sent: false, error: 'disabled_by_preference' });
        continue;
      }

      try {
        const briefData = await gatherBriefData(supabase, user.id);

        const message = composeBrief(
          {
            ...briefData,
            user_id: user.id,
            phone: user.agent_whatsapp_number,
            name: user.full_name || 'mate',
          },
          isMonday
        );

        // Send via VPS MCP server
        const sendResult = await sendWhatsApp(user.agent_whatsapp_number, message);
        results.push({ user_id: user.id, sent: sendResult });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`Failed to send brief to ${user.id}: ${msg}`);
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

async function gatherBriefData(
  supabase: ReturnType<typeof createClient>,
  userId: string
): Promise<Omit<UserBriefData, 'user_id' | 'phone' | 'name'>> {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const todayEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59
  ).toISOString();
  const thirtyDaysAhead = new Date(now);
  thirtyDaysAhead.setDate(thirtyDaysAhead.getDate() + 30);

  const [
    openTasksResult,
    overdueTasksResult,
    pendingQuotesResult,
    overdueInvoicesResult,
    expiringCertsResult,
    todayEventsResult,
    projectTasksResult,
  ] = await Promise.all([
    supabase
      .from('spark_tasks')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'open'),
    supabase
      .from('spark_tasks')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'open')
      .lt('due_at', now.toISOString()),
    supabase
      .from('quotes')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'sent')
      .eq('invoice_raised', false),
    supabase
      .from('invoices')
      .select('id, total')
      .eq('user_id', userId)
      .neq('status', 'paid')
      .neq('status', 'draft')
      .lt('due_date', now.toISOString()),
    supabase
      .from('reports')
      .select('id')
      .eq('user_id', userId)
      .not('expiry_date', 'is', null)
      .lte('expiry_date', thirtyDaysAhead.toISOString())
      .gte('expiry_date', now.toISOString()),
    supabase
      .from('calendar_events')
      .select('title, start_at')
      .eq('user_id', userId)
      .gte('start_at', todayStart)
      .lt('start_at', todayEnd)
      .order('start_at', { ascending: true }),
    // Tasks grouped by project — for per-job task breakdown in briefing
    supabase
      .from('spark_tasks')
      .select('id, status, due_at, project_id, spark_projects(id, title, location)')
      .eq('user_id', userId)
      .eq('status', 'open')
      .not('project_id', 'is', null)
      .order('due_at', { ascending: true })
      .limit(100),
  ]);

  const overdueInvoices = overdueInvoicesResult.data || [];
  const overdueTotal = overdueInvoices.reduce((sum, inv) => sum + (Number(inv.total) || 0), 0);

  // Group tasks by project
  const projectMap = new Map<string, ProjectTaskGroup>();
  for (const task of projectTasksResult.data || []) {
    const project = task.spark_projects as {
      id: string;
      title: string;
      location: string | null;
    } | null;
    if (!project) continue;
    const pid = project.id;
    if (!projectMap.has(pid)) {
      projectMap.set(pid, {
        project_id: pid,
        project_title: project.title,
        location: project.location,
        open_count: 0,
        overdue_count: 0,
      });
    }
    const group = projectMap.get(pid)!;
    group.open_count++;
    if (task.due_at && new Date(task.due_at as string) < now) {
      group.overdue_count++;
    }
  }

  return {
    open_tasks: openTasksResult.count || 0,
    overdue_tasks: overdueTasksResult.count || 0,
    pending_quotes: pendingQuotesResult.count || 0,
    overdue_invoices: overdueInvoices.length,
    overdue_invoice_total: overdueTotal,
    expiring_certs: (expiringCertsResult.data || []).length,
    today_events: (todayEventsResult.data || []) as Array<{ title: string; start_at: string }>,
    project_tasks: Array.from(projectMap.values()).slice(0, 5),
  };
}

function composeBrief(data: UserBriefData, isMonday: boolean): string {
  const firstName = data.name.split(' ')[0] || 'mate';
  const lines: string[] = [];

  if (isMonday) {
    lines.push(`⚡ Morning ${firstName}! Here's your week:`);
  } else {
    lines.push(`⚡ Morning ${firstName}!`);
  }

  lines.push('');

  // Today's schedule
  if (data.today_events.length > 0) {
    lines.push('📅 Today:');
    for (const ev of data.today_events) {
      const time = new Date(ev.start_at).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      });
      lines.push(`  ${time} — ${ev.title}`);
    }
  } else {
    lines.push('📅 No jobs scheduled today');
  }

  // Tasks — grouped by project if available
  if (data.project_tasks.length > 0) {
    lines.push('');
    lines.push('📋 Tasks by job:');
    for (const group of data.project_tasks) {
      const loc = group.location ? ` (${group.location})` : '';
      const overdue = group.overdue_count > 0 ? ` ⚠️ ${group.overdue_count} overdue` : '';
      lines.push(
        `  • ${group.project_title}${loc}: ${group.open_count} task${group.open_count === 1 ? '' : 's'}${overdue}`
      );
    }
  } else if (data.overdue_tasks > 0 || data.open_tasks > 0) {
    if (data.overdue_tasks > 0) {
      lines.push(`⚠️ ${data.overdue_tasks} overdue task${data.overdue_tasks === 1 ? '' : 's'}`);
    }
    if (data.open_tasks > 0) {
      lines.push(`📋 ${data.open_tasks} open task${data.open_tasks === 1 ? '' : 's'}`);
    }
  }

  // Money
  if (data.overdue_invoices > 0) {
    lines.push(
      `💰 ${data.overdue_invoices} overdue invoice${data.overdue_invoices === 1 ? '' : 's'} — £${data.overdue_invoice_total.toLocaleString()}`
    );
  }
  if (data.pending_quotes > 0) {
    lines.push(
      `📨 ${data.pending_quotes} pending quote${data.pending_quotes === 1 ? '' : 's'} awaiting response`
    );
  }

  // Certs
  if (data.expiring_certs > 0) {
    lines.push(
      `📋 ${data.expiring_certs} cert${data.expiring_certs === 1 ? '' : 's'} expiring in next 30 days`
    );
  }

  // Actions
  const actions: string[] = [];
  if (data.overdue_invoices > 0) actions.push('chase overdue invoices');
  if (data.expiring_certs > 0) actions.push('send renewal reminders');
  if (data.pending_quotes > 0) actions.push('follow up on pending quotes');

  if (actions.length > 0) {
    lines.push('');
    lines.push(`Want me to ${actions.join(' or ')}?`);
  }

  // If nothing to report
  if (
    data.today_events.length === 0 &&
    data.overdue_tasks === 0 &&
    data.overdue_invoices === 0 &&
    data.pending_quotes === 0 &&
    data.expiring_certs === 0
  ) {
    return `⚡ Morning ${firstName}! Quiet day ahead — no outstanding actions. Have a good one!`;
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
