-- ELE-1984 follow-up: a driver who hasn't done the daily walk-round gets one
-- reminder on working days. Vans not off the road, with an active, signed-up
-- driver and no check dated today (UK). One reminder per van per day
-- (employer_expiry_sent log, never user_notifications).
create or replace function public.notify_missed_van_checks()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  v_today date := (now() at time zone 'Europe/London')::date;
  n integer := 0;
begin
  if extract(isodow from v_today) > 5 then return 0; end if;  -- Mon–Fri only
  for r in
    select v.id, v.user_id as firm, v.registration, e.user_id as driver_user
      from public.vehicles v
      join public.employer_employees e on e.id = v.driver_id
     where coalesce(v.status, '') <> 'Off Road'
       and e.user_id is not null
       and lower(coalesce(e.status, '')) = 'active'
       and not exists (select 1 from public.vehicle_checks c
                        where c.vehicle_id = v.id and c.check_date = v_today)
  loop
    insert into public.employer_expiry_sent (firm, ref)
    values (r.firm, 'vancheck:' || r.id || ':' || v_today)
    on conflict do nothing;
    continue when not found;
    perform public.worker_notify(
      r.driver_user, 'vehicle_check', 'Daily van check',
      r.registration || ': do your walk-round before you set off. It takes a minute.',
      jsonb_build_object('route', '/electrician/worker-tools/van', 'vehicle_id', r.id));
    n := n + 1;
  end loop;
  return n;
exception when others then
  raise warning '[notify_missed_van_checks] %', sqlerrm;
  return n;
end;
$$;
revoke all on function public.notify_missed_van_checks() from public, anon, authenticated;

-- 07:30 UTC = 08:30 BST / 07:30 GMT, after most crews would have checked.
select cron.schedule('van-check-reminder', '30 7 * * 1-5', 'select public.notify_missed_van_checks();');
