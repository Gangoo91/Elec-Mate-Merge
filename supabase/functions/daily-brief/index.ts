/**
 * Daily Brief — Morning task summary notification
 *
 * Triggered via pg_cron at 0 8 * * * (8am UTC daily)
 * or manually via POST with service role key.
 *
 * For each user with open spark_tasks:
 *  - Counts overdue, due today, due this week
 *  - Inserts an ojt_notifications row (in-app notification)
 */
import { createClient, corsHeaders } from '../_shared/deps.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const now = new Date();
    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);

    // End of week (Sunday)
    const endOfWeek = new Date(now);
    const day = endOfWeek.getDay();
    const daysUntilSunday = day === 0 ? 0 : 7 - day;
    endOfWeek.setDate(endOfWeek.getDate() + daysUntilSunday);
    endOfWeek.setHours(23, 59, 59, 999);

    // Get all open tasks with due dates
    const { data: tasks, error: tasksError } = await supabase
      .from('spark_tasks')
      .select('id, user_id, due_at, status, snoozed_until')
      .eq('status', 'open');

    if (tasksError) throw tasksError;
    if (!tasks || tasks.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No open tasks found', notifications_sent: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Group by user
    const userTasks: Record<string, typeof tasks> = {};
    for (const task of tasks) {
      // Skip snoozed tasks
      if (task.snoozed_until && new Date(task.snoozed_until) > now) continue;

      if (!userTasks[task.user_id]) userTasks[task.user_id] = [];
      userTasks[task.user_id].push(task);
    }

    let notificationsSent = 0;

    for (const [userId, userTaskList] of Object.entries(userTasks)) {
      let overdue = 0;
      let dueToday = 0;
      let dueThisWeek = 0;

      for (const task of userTaskList) {
        if (!task.due_at) continue;
        const dueDate = new Date(task.due_at);

        if (dueDate < now) {
          overdue++;
        } else if (dueDate <= endOfToday) {
          dueToday++;
        } else if (dueDate <= endOfWeek) {
          dueThisWeek++;
        }
      }

      // Only notify if there's something relevant
      if (overdue === 0 && dueToday === 0) continue;

      const parts: string[] = [];
      if (overdue > 0) parts.push(`${overdue} overdue`);
      if (dueToday > 0) parts.push(`${dueToday} due today`);
      if (dueThisWeek > 0) parts.push(`${dueThisWeek} more this week`);

      const body =
        `You have ${parts.join(' and ')}. ${dueThisWeek > 0 ? `${dueThisWeek} more this week.` : ''}`.trim();

      const { error: insertError } = await supabase.from('ojt_notifications').insert({
        user_id: userId,
        type: 'weekly_summary',
        title: 'Morning Task Brief',
        message: body,
        priority: overdue > 0 ? 'high' : 'medium',
        data: { overdue, due_today: dueToday, due_this_week: dueThisWeek },
      });

      if (insertError) {
        console.error(`Failed to insert notification for user ${userId}:`, insertError);
      } else {
        notificationsSent++;
      }
    }

    return new Response(
      JSON.stringify({
        message: 'Daily brief complete',
        notifications_sent: notificationsSent,
        users_processed: Object.keys(userTasks).length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Daily brief error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
