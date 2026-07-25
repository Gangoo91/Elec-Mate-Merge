-- ECS card expiry reminders from Elec-ID profiles (applied to prod 2026-07-25 via MCP).
-- 30-day window, 14-day re-remind, 60-day cutoff; cron daily 08:20 UTC.
create or replace function public.notify_ecs_expiries()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into user_notifications (user_id, type, title, message, link)
  select ee.user_id,
    'compliance_ecs_card',
    case when ep.ecs_expiry_date < current_date
      then 'ECS card has expired'
      else 'ECS card expires soon' end,
    'Your ECS card'
      || case when ep.ecs_expiry_date < current_date then ' expired on ' else ' expires on ' end
      || to_char(ep.ecs_expiry_date, 'DD Mon YYYY')
      || '. Renew it and update your Elec-ID.',
    '/settings?tab=elec-id'
  from employer_elec_id_profiles ep
  join employer_employees ee on ee.id = ep.employee_id
  where ep.ecs_expiry_date is not null
    and ee.user_id is not null
    and ep.ecs_expiry_date <= current_date + 30
    and ep.ecs_expiry_date >= current_date - 60
    and not exists (
      select 1 from user_notifications n
      where n.user_id = ee.user_id
        and n.type = 'compliance_ecs_card'
        and n.created_at > now() - interval '14 days');
end;
$$;

revoke execute on function public.notify_ecs_expiries() from public;
revoke execute on function public.notify_ecs_expiries() from anon;
revoke execute on function public.notify_ecs_expiries() from authenticated;

do $$
begin
  perform cron.unschedule('daily-ecs-expiry-reminders');
exception when others then
  null;
end;
$$;

select cron.schedule(
  'daily-ecs-expiry-reminders',
  '20 8 * * *',
  $$select public.notify_ecs_expiries()$$
);
