/**
 * Canonical definition of an "actionable" task for overdue / reminder surfaces.
 *
 * ELE-1058 — the daily "overdue tasks" notification kept firing even when the
 * user had nothing to do. Cause: auto-generated reminder tasks
 * (`Chase payment: …` tagged ['chase','invoice'] and `Follow up: …` tagged
 * ['follow-up','quote']) are created with a due date but never closed when the
 * invoice is paid / quote resolved, so they linger as "overdue" forever. They
 * are already surfaced under Invoices/Quotes (and the digest has a separate
 * "overdue invoices" alert), so they must NOT be counted in the generic task nag.
 * Snoozed tasks (snoozed_until in the future) are also excluded.
 *
 * Implemented as a JS predicate (not a PostgREST filter) so the per-user task
 * sets — always small — are filtered reliably, with no array-in-`or` parsing
 * ambiguity. Keep in lock-step with the client hook `useSparkTaskOverdueCount`.
 */

/** Tags that mark an auto-generated reminder (not a real user task). */
export const REMINDER_TASK_TAGS = ['chase', 'follow-up'];

export interface OverdueFilterableTask {
  snoozed_until?: string | null;
  tags?: string[] | null;
}

/** True when a task should count toward the "overdue tasks" nag. */
export function isActionableOverdueTask(
  task: OverdueFilterableTask,
  now: Date = new Date()
): boolean {
  if (task.snoozed_until && new Date(task.snoozed_until) > now) return false;
  const tags = task.tags;
  if (Array.isArray(tags) && tags.some((t) => REMINDER_TASK_TAGS.includes(t))) return false;
  return true;
}
