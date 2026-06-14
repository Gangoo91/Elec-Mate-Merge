-- ============================================================================
-- Make in-app notifications deliver LIVE.
--
-- NotificationProvider.tsx subscribes to postgres_changes INSERTs on
-- push_notification_log (and toasts new rows), but the table was never added to
-- the supabase_realtime publication — so the subscription received nothing and
-- notifications only appeared on the next app reload. This affects every
-- notification, including the college triggers (EPA, ILP, grade, pastoral,
-- safeguarding) that write to this log.
--
-- The provider only subscribes to INSERT, for which the full new row is always
-- delivered, so default replica identity is sufficient for the user_id filter —
-- no need for replica identity full (this is a high-write table, so we avoid the
-- extra WAL overhead).
--
-- Rollback: alter publication supabase_realtime drop table public.push_notification_log;
-- ============================================================================

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'push_notification_log'
  ) then
    alter publication supabase_realtime add table public.push_notification_log;
  end if;
end $$;
