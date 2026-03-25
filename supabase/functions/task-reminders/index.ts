/**
 * Task Reminders — Hourly push notifications for approaching due dates
 *
 * Triggered via pg_cron at 0 * * * * (every hour) or manually via POST.
 *
 * For each user with tasks due in the next hour:
 *  - Checks spark_task_events for 'reminded' to prevent duplicates
 *  - Sends push notification via send-push-notification
 *  - Logs a 'reminded' event in spark_task_events
 */
import { createClient } from '../_shared/deps.ts';

interface SparkTask {
  id: string;
  user_id: string;
  title: string;
  due_at: string;
  priority: string;
  snoozed_until: string | null;
}

interface TaskEvent {
  task_id: string;
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    // Find open/in-progress tasks due within the next hour (or already overdue)
    const { data: tasks, error: tasksError } = await supabase
      .from('spark_tasks')
      .select('id, user_id, title, due_at, priority, snoozed_until')
      .in('status', ['open', 'in_progress'])
      .not('due_at', 'is', null)
      .lte('due_at', oneHourFromNow.toISOString());

    if (tasksError) throw tasksError;
    if (!tasks || tasks.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No tasks need reminders', reminders_sent: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Filter out snoozed tasks
    const activeTasks = tasks.filter(
      (t: SparkTask) => !t.snoozed_until || new Date(t.snoozed_until) <= now
    );

    // Skip already-overdue tasks if daily digest already ran today (avoid repeats)
    // Only keep overdue tasks if digest hasn't sent today's overdue_tasks alert
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const userIdsInBatch = [...new Set(activeTasks.map((t: SparkTask) => t.user_id))];
    const { data: digestsSentToday } = await supabase
      .from('push_notification_log')
      .select('user_id')
      .in('user_id', userIdsInBatch)
      .eq('type', 'overdue_tasks')
      .gte('sent_at', todayStart.toISOString());
    const usersWithDigest = new Set(
      (digestsSentToday || []).map((d: { user_id: string }) => d.user_id)
    );

    // For users who already got the daily digest, only remind about tasks due SOON (not already overdue)
    const filteredActiveTasks = activeTasks.filter((t: SparkTask) => {
      if (!usersWithDigest.has(t.user_id)) return true; // no digest yet — include everything
      return new Date(t.due_at) >= now; // digest sent — only include due-soon, not overdue
    });

    if (filteredActiveTasks.length === 0) {
      return new Response(
        JSON.stringify({
          message: 'No tasks need reminders (snoozed or already in digest)',
          reminders_sent: 0,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get task IDs that have already been reminded (in last 4 hours to prevent spam)
    const fourHoursAgo = new Date(now.getTime() - 4 * 60 * 60 * 1000);
    const taskIds = filteredActiveTasks.map((t: SparkTask) => t.id);

    const { data: recentReminders } = await supabase
      .from('spark_task_events')
      .select('task_id')
      .in('task_id', taskIds)
      .eq('event_type', 'reminded')
      .gte('created_at', fourHoursAgo.toISOString());

    const remindedIds = new Set((recentReminders || []).map((r: TaskEvent) => r.task_id));

    // Filter to tasks not yet reminded
    const toRemind = filteredActiveTasks.filter((t: SparkTask) => !remindedIds.has(t.id));

    if (toRemind.length === 0) {
      return new Response(
        JSON.stringify({ message: 'All tasks already reminded', reminders_sent: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Group by user for notification batching
    const userTasks: Record<string, SparkTask[]> = {};
    for (const task of toRemind) {
      if (!userTasks[task.user_id]) userTasks[task.user_id] = [];
      userTasks[task.user_id].push(task);
    }

    let remindersSent = 0;

    for (const [userId, userTaskList] of Object.entries(userTasks)) {
      const overdue = userTaskList.filter((t: SparkTask) => new Date(t.due_at) < now);
      const dueSoon = userTaskList.filter((t: SparkTask) => new Date(t.due_at) >= now);

      // Build notification message
      let title = '';
      let body = '';

      if (overdue.length > 0 && dueSoon.length > 0) {
        title = 'Tasks need attention';
        body = `${overdue.length} overdue, ${dueSoon.length} due within the hour.`;
      } else if (overdue.length > 0) {
        title =
          overdue.length === 1 ? `Overdue: ${overdue[0].title}` : `${overdue.length} tasks overdue`;
        body =
          overdue.length === 1
            ? 'This task is past its due date.'
            : `${overdue.map((t: SparkTask) => t.title).join(', ')}`;
      } else {
        title =
          dueSoon.length === 1
            ? `Due soon: ${dueSoon[0].title}`
            : `${dueSoon.length} tasks due soon`;
        body =
          dueSoon.length === 1
            ? 'Due within the next hour.'
            : `${dueSoon.map((t: SparkTask) => t.title).join(', ')}`;
      }

      // Truncate body to 200 chars for push
      if (body.length > 200) body = body.substring(0, 197) + '...';

      // Send push notification via existing edge function
      try {
        const pushResponse = await fetch(`${SUPABASE_URL}/functions/v1/send-push-notification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          },
          body: JSON.stringify({
            userId,
            title,
            body,
            type: 'task',
            data: {
              action: 'open_tasks',
              task_ids: userTaskList.map((t: SparkTask) => t.id),
            },
          }),
        });

        if (!pushResponse.ok) {
          console.error(`Push failed for user ${userId}:`, await pushResponse.text());
        }
      } catch (pushError) {
        console.error(`Push error for user ${userId}:`, pushError);
      }

      // Create in-app notification
      await supabase.from('ojt_notifications').insert({
        user_id: userId,
        type: 'deadline_reminder',
        title,
        message: body,
        priority: overdue.length > 0 ? 'high' : 'medium',
        data: {
          task_ids: userTaskList.map((t: SparkTask) => t.id),
          overdue_count: overdue.length,
          due_soon_count: dueSoon.length,
        },
      });

      // Log reminded events for all tasks
      const events = userTaskList.map((t: SparkTask) => ({
        task_id: t.id,
        user_id: userId,
        event_type: 'reminded',
        metadata: { due_at: t.due_at },
      }));

      await supabase.from('spark_task_events').insert(events);
      remindersSent += userTaskList.length;
    }

    return new Response(
      JSON.stringify({
        message: 'Task reminders complete',
        reminders_sent: remindersSent,
        users_notified: Object.keys(userTasks).length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Task reminders error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
