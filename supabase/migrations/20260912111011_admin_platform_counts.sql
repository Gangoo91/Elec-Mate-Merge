-- True platform counts for the admin pages.
--
-- 🔴 `reports` has NO admin RLS policy. Its only SELECT policies are "Users
-- can view own reports" (auth.uid() = user_id AND deleted_at IS NULL) and "QS
-- can view team reports". So an admin counting `reports` from the browser
-- counts THEIR OWN certificates, not the platform's — AdminAnalytics showed
-- "Certificates issued · All time · 290" (Andrew's 237 live plus 53 from his
-- QS team) against a real 1,588. AdminSystem's "Reports" tile had the same
-- defect. Both looked plausible, which is why it survived.
--
-- The existing policy already excludes soft-deleted rows, so adding
-- `.is('deleted_at', null)` client-side changes nothing; the fix has to be a
-- SECURITY DEFINER read, gated on admin_role like every other admin RPC here.
create or replace function public.admin_platform_counts()
returns table (
  reports_live bigint,
  reports_deleted bigint,
  profiles_total bigint,
  user_events bigint
)
language plpgsql
stable
security definer
set search_path to 'public'
as $$
begin
  if not exists (
    select 1 from profiles where id = auth.uid() and admin_role is not null
  ) then
    raise exception 'not authorized';
  end if;

  return query
  select
    (select count(*) from reports where deleted_at is null),
    (select count(*) from reports where deleted_at is not null),
    (select count(*) from profiles),
    (select count(*) from user_events);
end;
$$;

grant execute on function public.admin_platform_counts() to authenticated;
