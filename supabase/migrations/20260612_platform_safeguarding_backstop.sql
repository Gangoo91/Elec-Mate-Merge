-- ============================================================================
-- Slice #4 — platform metadata backstop for safeguarding.
--
-- The college is the data controller for safeguarding CONTENT; the platform
-- (processor) must never read it. But the platform must be able to spot a college
-- whose safeguarding process has FAILED — so it monitors content-free METADATA
-- (config state + counts + timing, never student identity or concern detail):
--   * no_routable_dsl   — operational college (has active learners) with no DSL
--                         that can receive alerts
--   * unacknowledged_48h — a safeguarding concern unacknowledged 48h+ (past the
--                         college's own 24h leadership escalation → platform must
--                         intervene operationally)
--
-- One open alert per (college, kind), kept fresh and auto-resolved when the
-- condition clears. Platform-only (RLS on, no college policy → service-role).
-- ============================================================================

create table if not exists public.platform_safeguarding_alerts (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  alert_kind text not null check (alert_kind in ('no_routable_dsl','unacknowledged_48h')),
  metadata jsonb not null default '{}'::jsonb,  -- counts/hours only — NO PII
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  resolved_at timestamptz
);

create unique index if not exists uq_platform_sg_alert_open
  on public.platform_safeguarding_alerts (college_id, alert_kind)
  where resolved_at is null;

alter table public.platform_safeguarding_alerts enable row level security;
revoke all on public.platform_safeguarding_alerts from anon, authenticated;

create or replace function public.flag_platform_safeguarding_risks()
returns int
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_open int;
begin
  -- 1) operational college with no routable DSL
  insert into platform_safeguarding_alerts (college_id, alert_kind, metadata)
  select c.id, 'no_routable_dsl',
         jsonb_build_object('active_students',
           (select count(*) from college_students s where s.college_id = c.id and s.status in ('active','Active')))
  from colleges c
  where (select count(*) from college_students s where s.college_id = c.id and s.status in ('active','Active')) > 0
    and not exists (
      select 1 from college_staff st
      where st.college_id = c.id and (st.is_dsl or st.is_deputy_dsl)
        and st.user_id is not null and st.archived_at is null)
  on conflict (college_id, alert_kind) where resolved_at is null
  do update set metadata = excluded.metadata, updated_at = now();

  -- 2) safeguarding concern unacknowledged 48h+
  insert into platform_safeguarding_alerts (college_id, alert_kind, metadata)
  select pn.college_id, 'unacknowledged_48h',
         jsonb_build_object(
           'overdue_count', count(*),
           'oldest_hours', round(extract(epoch from (now() - min(pn.created_at))) / 3600))
  from pastoral_notes pn
  where (pn.kind = 'safeguarding' or pn.visibility = 'safeguarding')
    and pn.acknowledged_at is null and pn.action_completed_at is null
    and pn.created_at < now() - interval '48 hours'
  group by pn.college_id
  on conflict (college_id, alert_kind) where resolved_at is null
  do update set metadata = excluded.metadata, updated_at = now();

  -- 3) auto-resolve cleared conditions
  update platform_safeguarding_alerts a set resolved_at = now()
  where a.resolved_at is null and a.alert_kind = 'no_routable_dsl'
    and exists (select 1 from college_staff st where st.college_id = a.college_id
      and (st.is_dsl or st.is_deputy_dsl) and st.user_id is not null and st.archived_at is null);

  update platform_safeguarding_alerts a set resolved_at = now()
  where a.resolved_at is null and a.alert_kind = 'unacknowledged_48h'
    and not exists (select 1 from pastoral_notes pn where pn.college_id = a.college_id
      and (pn.kind = 'safeguarding' or pn.visibility = 'safeguarding')
      and pn.acknowledged_at is null and pn.action_completed_at is null
      and pn.created_at < now() - interval '48 hours');

  select count(*) into v_open from platform_safeguarding_alerts where resolved_at is null;
  return v_open;
end;
$function$;

revoke execute on function public.flag_platform_safeguarding_risks() from anon, authenticated, public;

-- content-free per-college health view (platform-only)
create or replace view public.v_platform_safeguarding_health as
select c.id as college_id, c.name as college_name,
  (select count(*) from college_students s where s.college_id = c.id and s.status in ('active','Active')) as active_students,
  exists (select 1 from college_staff st where st.college_id = c.id and (st.is_dsl or st.is_deputy_dsl)
    and st.user_id is not null and st.archived_at is null) as has_routable_dsl,
  (select count(*) from pastoral_notes pn where pn.college_id = c.id
    and (pn.kind='safeguarding' or pn.visibility='safeguarding') and pn.action_completed_at is null) as open_concerns,
  (select count(*) from pastoral_notes pn where pn.college_id = c.id
    and (pn.kind='safeguarding' or pn.visibility='safeguarding')
    and pn.acknowledged_at is null and pn.action_completed_at is null) as unacknowledged_concerns
from colleges c;

revoke all on public.v_platform_safeguarding_health from anon, authenticated;

select cron.schedule('platform-safeguarding-backstop', '0 */6 * * *',
  $$select public.flag_platform_safeguarding_risks();$$);

-- ============================================================================
-- ROLLBACK:
--   select cron.unschedule('platform-safeguarding-backstop');
--   drop view if exists public.v_platform_safeguarding_health;
--   drop function if exists public.flag_platform_safeguarding_risks();
--   drop table if exists public.platform_safeguarding_alerts;
-- ============================================================================
