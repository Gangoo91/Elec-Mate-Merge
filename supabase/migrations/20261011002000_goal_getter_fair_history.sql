-- Goal Getter judged every past day against TODAY's daily goal, so raising the
-- goal could rewrite history (review, 10 Oct 2026). Past days now count if they
-- met the lower of the current goal and the default 100: raising your goal never
-- un-earns a day, and lowering it never makes old days easier than 100.
create or replace function public._award_days(p_user uuid)
returns void language plpgsql security definer set search_path = public as $$
declare
  v_days int; v_goal int;
begin
  if p_user is null then return; end if;
  create temporary table if not exists _ad (d date, xp int, early boolean) on commit drop;
  truncate _ad;
  insert into _ad
    select public.xp_london_day(created_at), sum(xp_earned)::int,
           bool_or(extract(hour from created_at at time zone 'Europe/London') between 4 and 6)
    from public.learning_activity_log
    where user_id = p_user and voided_at is null and xp_earned > 0 and activity_type <> 'achievement'
    group by 1;
  select count(*) into v_days from _ad;
  if v_days = 0 then return; end if;

  if v_days >= 50 then perform public._award_unlock(p_user, 'days-50'); end if;
  if v_days >= 100 then perform public._award_unlock(p_user, 'days-100'); end if;
  if v_days >= 250 then perform public._award_unlock(p_user, 'days-250'); end if;
  if exists (select 1 from _ad group by date_trunc('month', d) having count(*) >= 20)
    then perform public._award_unlock(p_user, 'days-20m'); end if;
  if exists (select 1 from _ad where early) then perform public._award_unlock(p_user, 'early'); end if;
  if exists (select 1 from _ad s where extract(isodow from s.d) = 6 and exists (select 1 from _ad u where u.d = s.d + 1))
    then perform public._award_unlock(p_user, 'weekend'); end if;
  if exists (select 1 from (select d - lag(d) over (order by d) as gap from _ad) g where g.gap >= 15)
    then perform public._award_unlock(p_user, 'comeback'); end if;
  select least(coalesce(daily_goal, 100), 100) into v_goal from public.user_xp_summary where user_id = p_user;
  v_goal := coalesce(v_goal, 100);
  if exists (
    select 1 from (
      select d - (row_number() over (order by d))::int as grp from _ad where xp >= v_goal
    ) r group by grp having count(*) >= 7
  ) then perform public._award_unlock(p_user, 'daily-goal-7'); end if;
end;
$$;
revoke all on function public._award_days(uuid) from public, anon, authenticated;
