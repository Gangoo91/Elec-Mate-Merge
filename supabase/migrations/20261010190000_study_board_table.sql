-- The whole board in one table (10 Oct 2026). Andrew: "a full list page of
-- where everyone is on XP and this month, days, year, week etc".
--
-- study_board_table(league) returns everyone on the board with their XP today,
-- this week, this month, this year and all time, days studied in each of
-- those periods, streak and level — and their rank in each period, worked out exactly
-- as study_board does (same people, same rows, ties to whoever got there
-- first), so this page and the leaderboard can never disagree.
--
-- Periods are calendar periods in UK time. Awards count towards all time only,
-- as on the boards. Read only.

create or replace function public.xp_period_start(p_period text)
returns timestamptz language sql stable as $$
  select case p_period
    when 'today' then (date_trunc('day', now() at time zone 'Europe/London')) at time zone 'Europe/London'
    when 'week' then (date_trunc('week', now() at time zone 'Europe/London')) at time zone 'Europe/London'
    when 'month' then (date_trunc('month', now() at time zone 'Europe/London')) at time zone 'Europe/London'
    when 'year' then (date_trunc('year', now() at time zone 'Europe/London')) at time zone 'Europe/London'
    else '1970-01-01'::timestamptz end;
$$;

drop function if exists public.study_board_table(text);
create function public.study_board_table(league text default 'all')
returns table(
  uid uuid, display_name text, avatar text, level integer, streak integer,
  xp_today integer, xp_week integer, xp_month integer, xp_year integer, xp_all integer,
  days_week integer, days_month integer, days_year integer, days_all integer,
  last_active timestamptz,
  rank_today integer, rank_week integer, rank_month integer, rank_year integer, rank_all integer
)
language sql stable security definer set search_path = public as $$
  with b as (
    select public.xp_period_start('today') d0, public.xp_period_start('week') dw,
           public.xp_period_start('month') dm, public.xp_period_start('year') dy
  ),
  people as (
    select p.id, p.full_name, p.avatar_url
    from public.profiles p
    where p.leaderboard_visible = true and p.full_name is not null
      and p.leaderboard_excluded = false and p.admin_role is null
      and public.xp_in_league(p.role, league)
  ),
  agg as (
    select l.user_id,
      coalesce(sum(l.xp_earned) filter (where l.xp_earned > 0 and l.activity_type <> 'achievement' and l.created_at >= b.d0), 0)::int as xt,
      max(l.created_at) filter (where l.xp_earned > 0 and l.activity_type <> 'achievement' and l.created_at >= b.d0) as rt,
      coalesce(sum(l.xp_earned) filter (where l.xp_earned > 0 and l.activity_type <> 'achievement' and l.created_at >= b.dw), 0)::int as xw,
      max(l.created_at) filter (where l.xp_earned > 0 and l.activity_type <> 'achievement' and l.created_at >= b.dw) as rw,
      coalesce(sum(l.xp_earned) filter (where l.xp_earned > 0 and l.activity_type <> 'achievement' and l.created_at >= b.dm), 0)::int as xm,
      max(l.created_at) filter (where l.xp_earned > 0 and l.activity_type <> 'achievement' and l.created_at >= b.dm) as rm,
      coalesce(sum(l.xp_earned) filter (where l.xp_earned > 0 and l.activity_type <> 'achievement' and l.created_at >= b.dy), 0)::int as xy,
      max(l.created_at) filter (where l.xp_earned > 0 and l.activity_type <> 'achievement' and l.created_at >= b.dy) as ry,
      coalesce(sum(l.xp_earned) filter (where l.xp_earned > 0), 0)::int as xa,
      max(l.created_at) filter (where l.xp_earned > 0) as ra,
      (count(distinct public.xp_london_day(l.created_at)) filter (where l.created_at >= b.dw))::int as dwk,
      (count(distinct public.xp_london_day(l.created_at)) filter (where l.created_at >= b.dm))::int as dmo,
      (count(distinct public.xp_london_day(l.created_at)) filter (where l.created_at >= b.dy))::int as dyr,
      (count(distinct public.xp_london_day(l.created_at)))::int as dal,
      max(l.created_at) as last_at
    from public.learning_activity_log l
    join people on people.id = l.user_id
    cross join b
    where l.voided_at is null and l.created_at <= now()
    group by l.user_id
  )
  select p.id, p.full_name, p.avatar_url,
         coalesce(s.level, 1), coalesce(st.current_streak, 0),
         a.xt, a.xw, a.xm, a.xy, a.xa, a.dwk, a.dmo, a.dyr, a.dal, a.last_at,
         case when a.xt > 0 then (row_number() over (order by a.xt desc, a.rt asc nulls last, p.id))::int end,
         case when a.xw > 0 then (row_number() over (order by a.xw desc, a.rw asc nulls last, p.id))::int end,
         case when a.xm > 0 then (row_number() over (order by a.xm desc, a.rm asc nulls last, p.id))::int end,
         case when a.xy > 0 then (row_number() over (order by a.xy desc, a.ry asc nulls last, p.id))::int end,
         case when a.xa > 0 then (row_number() over (order by a.xa desc, a.ra asc nulls last, p.id))::int end
  from agg a
  join people p on p.id = a.user_id
  left join public.user_xp_summary s on s.user_id = p.id
  left join public.user_study_streaks st on st.user_id = p.id
  where a.xa > 0
  order by a.xm desc, a.xa desc;
$$;
revoke all on function public.study_board_table(text) from public, anon;
grant execute on function public.study_board_table(text) to authenticated;
