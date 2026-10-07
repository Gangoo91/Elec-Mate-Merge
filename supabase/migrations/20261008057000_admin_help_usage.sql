-- ELE-1980 — admin view of in-app help usage.
--
-- help_open_events gets one row each time a "?" help sheet is opened
-- (PageHelp). Nothing read it, so the screens people find confusing could not
-- be found. admin_help_usage(p_days) rolls it up for Admin → Help usage:
--   totals    opens, distinct people, distinct help pages
--   by_area   opens per hub (college, employer, wt, ...: the help_id prefix)
--   top       help pages ranked by opens, with people, the most common path
--             and the last opening
--   daily     opens per day across the window (zero-filled) for the trend
-- Read only, admins only (is_admin()), never callable by anon.

create or replace function public.admin_help_usage(p_days integer default 30)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_days integer := greatest(1, least(coalesce(p_days, 30), 365));
  v_since timestamptz;
  v_out jsonb;
begin
  if auth.uid() is null or not public.is_admin() then
    raise exception 'admins only' using errcode = '42501';
  end if;
  v_since := date_trunc('day', now()) - make_interval(days => v_days - 1);

  with ev as (
    select e.help_id,
           e.user_id,
           e.created_at,
           nullif(split_part(coalesce(e.path, ''), '?', 1), '') as path_only,
           split_part(e.help_id, '-', 1) as area
      from help_open_events e
     where e.created_at >= v_since
  ),
  top as (
    select ev.help_id,
           min(ev.area) as area,
           count(*)::int as opens,
           count(distinct ev.user_id)::int as people,
           max(ev.created_at) as last_opened,
           (select ev2.path_only from ev ev2
             where ev2.help_id = ev.help_id and ev2.path_only is not null
             group by ev2.path_only order by count(*) desc, ev2.path_only limit 1) as top_path
      from ev
     group by ev.help_id
  ),
  days as (
    select d::date as day
      from generate_series(v_since, date_trunc('day', now()), interval '1 day') d
  ),
  daily as (
    select days.day,
           count(ev.help_id)::int as opens,
           count(distinct ev.user_id)::int as people
      from days
      left join ev on ev.created_at >= days.day and ev.created_at < days.day + 1
     group by days.day
  )
  select jsonb_build_object(
    'days', v_days,
    'totals', jsonb_build_object(
      'opens', (select count(*) from ev),
      'people', (select count(distinct user_id) from ev),
      'pages', (select count(distinct help_id) from ev)
    ),
    'by_area', coalesce((
      select jsonb_agg(jsonb_build_object('area', a.area, 'opens', a.opens, 'people', a.people)
                       order by a.opens desc, a.area)
        from (select area, count(*)::int as opens, count(distinct user_id)::int as people
                from ev group by area) a
    ), '[]'::jsonb),
    'top', coalesce((
      select jsonb_agg(jsonb_build_object(
               'help_id', t.help_id, 'area', t.area, 'opens', t.opens, 'people', t.people,
               'top_path', t.top_path, 'last_opened', t.last_opened)
             order by t.opens desc, t.people desc, t.help_id)
        from (select * from top order by opens desc, people desc, help_id limit 100) t
    ), '[]'::jsonb),
    'daily', coalesce((
      select jsonb_agg(jsonb_build_object('day', d.day, 'opens', d.opens, 'people', d.people)
                       order by d.day)
        from daily d
    ), '[]'::jsonb)
  ) into v_out;

  return v_out;
end;
$$;

comment on function public.admin_help_usage(integer) is
  'ELE-1980: Admin → Help usage. Rolls up help_open_events (opens per help page, per hub, per day) over the last p_days. Admins only.';

revoke all on function public.admin_help_usage(integer) from public, anon;
grant execute on function public.admin_help_usage(integer) to authenticated;
