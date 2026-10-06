-- The learner's (or, for staff, a learner's) app learning by day and by area,
-- approved or not, for the hours hub chart and Student 360.
-- Applied live as migration otj_app_learning_breakdown.
create or replace function public.get_app_learning_breakdown(p_user uuid default null, p_days int default 30)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  u uuid := coalesce(p_user, auth.uid());
  v_since date := (now() at time zone 'Europe/London')::date - greatest(1, least(coalesce(p_days, 30), 366)) + 1;
begin
  if not public._otj_can_read(u) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return jsonb_build_object(
    'since', v_since,
    'days', coalesce((
      select jsonb_agg(jsonb_build_object('day', d.day, 'minutes', d.minutes) order by d.day)
        from (select t.date as day, sum(t.duration)::int as minutes
                from time_entries t
               where t.user_id = u and t.is_automatic and coalesce(t.duration, 0) > 0 and t.date >= v_since
               group by t.date) d), '[]'::jsonb),
    'areas', coalesce((
      select jsonb_agg(jsonb_build_object('area', a.area, 'minutes', a.minutes) order by a.minutes desc)
        from (select public._otj_area(t.activity) as area, sum(t.duration)::int as minutes
                from time_entries t
               where t.user_id = u and t.is_automatic and coalesce(t.duration, 0) > 0 and t.date >= v_since
               group by 1) a), '[]'::jsonb),
    'approved_minutes', (
      select coalesce(sum(t.duration), 0)::int from time_entries t
       where t.user_id = u and t.is_automatic and t.date >= v_since
         and exists (select 1 from otj_capture_links l where l.time_entry_id = t.id)),
    'total_minutes', (
      select coalesce(sum(t.duration), 0)::int from time_entries t
       where t.user_id = u and t.is_automatic and coalesce(t.duration, 0) > 0 and t.date >= v_since)
  );
end; $$;
grant execute on function public.get_app_learning_breakdown(uuid, int) to authenticated;
