-- The admin dashboard was reporting its own page size as a fact.
--
-- `get_at_risk_subscribers(p_days, p_limit)` is called with p_limit = 50 and
-- the dashboard rendered `atRiskSubs.length` as "50 paying · quiet 30d+".
-- There are actually 150 — the number shown was the LIMIT, so churn exposure
-- read as a third of its real size and would have stuck at "50" no matter how
-- bad it got.
--
-- A count needs no rows, so it gets its own function rather than the list
-- fetching 150 records to display six.

create or replace function public.count_at_risk_subscribers(p_days integer default 30)
returns integer
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  v_count integer;
begin
  -- Same admin gate as get_at_risk_subscribers. SECURITY DEFINER without it
  -- would expose subscriber counts to any authenticated caller.
  if not exists (
    select 1 from profiles where id = auth.uid() and admin_role is not null
  ) then
    raise exception 'not authorized';
  end if;

  -- Mirrors get_at_risk_subscribers' predicate exactly. If one changes the
  -- other must, or the count and the list disagree.
  with la as (
    select ue.user_id, max(ue.created_at) as last_seen
    from user_events ue group by ue.user_id
  )
  select count(*) into v_count
  from profiles p
  left join la on la.user_id = p.id
  where p.subscribed = true
    and coalesce(p.free_access_granted, false) = false
    and (la.last_seen is null or la.last_seen < now() - make_interval(days => p_days));

  return v_count;
end;
$function$;

revoke execute on function public.count_at_risk_subscribers(integer) from anon;
grant execute on function public.count_at_risk_subscribers(integer) to authenticated;
