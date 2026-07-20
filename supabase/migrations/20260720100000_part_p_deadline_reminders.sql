-- Part P deadline reminders — track which reminder stages have fired for each
-- notifiable-work record so the daily cron chases the 30-day submission window
-- (7 days out, 1 day out, overdue) WITHOUT re-sending the same nudge every day.
alter table public.part_p_notifications
  add column if not exists reminders_sent text[] not null default '{}';

-- Index the deadline so the daily cron's "approaching / overdue" scan is cheap.
create index if not exists idx_part_p_notifications_deadline
  on public.part_p_notifications (submission_deadline)
  where notification_status not in ('submitted', 'cancelled');
