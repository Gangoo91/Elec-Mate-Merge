-- Add 'reminded' event type to spark_task_events for push notification tracking
alter table public.spark_task_events
  drop constraint if exists spark_task_events_event_type_check;

alter table public.spark_task_events
  add constraint spark_task_events_event_type_check
  check (event_type in (
    'created', 'updated', 'completed', 'reopened',
    'snoozed', 'cancelled', 'deleted', 'reminded'
  ));

-- Allow service role to insert reminded events (edge function uses service role, not user JWT)
-- The existing RLS policy requires auth.uid() = user_id, but service role bypasses RLS
-- so no additional policy is needed.

-- Index for efficient reminder dedup queries
create index if not exists idx_spark_task_events_reminded
  on public.spark_task_events (task_id, created_at)
  where event_type = 'reminded';
