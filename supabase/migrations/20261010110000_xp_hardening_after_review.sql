-- XP hardening after review (10 Oct 2026).
--
-- 1. Backdating: authenticated could insert created_at on the ledger and on
--    seo_mock_attempts; the guard and mock trigger keyed days and caps off it,
--    so rows dated to earlier days earned fresh keys and caps. The server's
--    clock now applies to every client-written row. (0 future rows found.)
-- 2. Achievements: user_achievements is client-insertable, so award XP stays
--    for level and all time but no longer counts on week/month boards, and
--    does not eat into the daily caps.
-- 3. Mock XP from score/total, not the client's percentage.
-- 4. Cap reasons: 'type_cap' vs 'day_cap' (was one 'daily_cap').
-- 5. log_study_activity minute caps on the UK day (were UTC).
-- 6. Board functions: no anon/public execute.

create or replace function public._xp_award(
  p_user uuid,
  p_type text,
  p_source_id text,
  p_source_title text,
  p_xp integer,
  p_key text,
  p_duration_minutes integer,
  p_metadata jsonb,
  p_counted_as_ojt boolean,
  p_created_at timestamptz default now()
) returns jsonb language plpgsql security definer set search_path = public as $$
declare
  c_day_cap constant integer := 1500;
  v_day date := public.xp_london_day(p_created_at);
  v_type_today integer;
  v_all_today integer;
  v_xp integer := greatest(0, coalesce(p_xp, 0));
  v_key text := p_key;
  v_reason text := 'awarded';
  v_id uuid;
begin
  perform pg_advisory_xact_lock(hashtext('xp:' || p_user::text));

  -- Double-fire guard: the same item within 10 seconds is the same event.
  if exists (
    select 1 from public.learning_activity_log
    where user_id = p_user and activity_type = p_type
      and coalesce(source_id, source_title, '') = coalesce(p_source_id, p_source_title, '')
      and created_at > p_created_at - interval '10 seconds'
      and created_at <= p_created_at
  ) then
    return jsonb_build_object('xp', 0, 'awarded', false, 'reason', 'duplicate', 'logged', false);
  end if;

  if v_key is not null and exists (
    select 1 from public.learning_activity_log where user_id = p_user and award_key = v_key
  ) then
    v_xp := 0; v_reason := 'already_awarded';
  end if;

  if v_xp > 0 then
    select coalesce(sum(xp_earned) filter (where activity_type = p_type), 0),
           coalesce(sum(xp_earned), 0)
      into v_type_today, v_all_today
    from public.learning_activity_log
    where user_id = p_user and voided_at is null and activity_type <> 'achievement'
      and public.xp_london_day(created_at) = v_day;
    -- Which cap bit, so the app can say which one.
    if v_xp > greatest(0, c_day_cap - v_all_today) then v_reason := 'day_cap'; end if;
    if v_xp > greatest(0, public._xp_daily_cap(p_type) - v_type_today) then v_reason := 'type_cap'; end if;
    v_xp := least(v_xp,
                  greatest(0, public._xp_daily_cap(p_type) - v_type_today),
                  greatest(0, c_day_cap - v_all_today));
    if v_xp > 0 then v_reason := 'awarded'; end if;
  end if;

  if v_xp = 0 then v_key := null; end if;

  insert into public.learning_activity_log
    (user_id, activity_type, source_id, source_title, xp_earned, duration_minutes,
     metadata, counted_as_ojt, award_key, created_at)
  values
    (p_user, p_type, p_source_id, p_source_title, v_xp,
     least(greatest(coalesce(p_duration_minutes, 0), 0), 240),
     coalesce(p_metadata, '{}'::jsonb) || jsonb_build_object('xp_reason', v_reason),
     coalesce(p_counted_as_ojt, false), v_key, p_created_at)
  returning id into v_id;

  return jsonb_build_object('xp', v_xp, 'awarded', v_xp > 0, 'reason', v_reason, 'logged', true, 'id', v_id);
end;
$$;

create or replace function public._xp_guard_client_insert()
-- Deliberately NOT security definer: current_user is then the role doing the
-- insert. A direct app insert runs as authenticated/anon and is checked; the
-- server award functions are security definer (owner) and are not. The checks
-- below only read the user's own rows, which the select policy allows.
returns trigger language plpgsql set search_path = public as $$
declare
  v_day date;
  v_xp integer;
  v_key text;
  v_type_today integer;
  v_all_today integer;
  v_reason text := 'awarded';
begin
  if current_user not in ('authenticated', 'anon') then
    return new;
  end if;

  -- The server's clock, never the app's: a client-supplied created_at could
  -- backdate rows into earlier days for fresh keys and caps (review 10 Oct).
  new.created_at := now();
  v_day := public.xp_london_day(new.created_at);

  perform pg_advisory_xact_lock(hashtext('xp:' || new.user_id::text));

  -- Same item again within 10 seconds: a double tap, not a second event.
  if exists (
    select 1 from public.learning_activity_log
    where user_id = new.user_id and activity_type = new.activity_type
      and coalesce(source_id, source_title, '') = coalesce(new.source_id, new.source_title, '')
      and created_at > coalesce(new.created_at, now()) - interval '10 seconds'
  ) then
    return null;
  end if;

  v_xp := least(greatest(coalesce(new.xp_earned, 0), 0), public._xp_client_max(new.activity_type));
  v_key := case new.activity_type
    when 'quiz_completed' then 'quiz:' || coalesce(new.source_id, 'unknown') || ':' || v_day::text
    when 'tutor_quiz' then 'tutor_quiz:' || coalesce(new.source_id, 'unknown')
    when 'video_watched' then 'video:' || coalesce(new.source_id, 'unknown')
    when 'path_completed' then 'path:' || coalesce(new.source_id, 'unknown')
    when 'site_diary_entry' then 'diary:' || coalesce(new.source_id, 'unknown')
    when 'portfolio_evidence' then 'evidence:' || coalesce(new.source_id, 'unknown')
    else null end;

  if v_key is not null and exists (
    select 1 from public.learning_activity_log where user_id = new.user_id and award_key = v_key
  ) then
    v_xp := 0; v_reason := 'already_awarded';
  end if;

  if v_xp > 0 then
    select coalesce(sum(xp_earned) filter (where activity_type = new.activity_type), 0),
           coalesce(sum(xp_earned), 0)
      into v_type_today, v_all_today
    from public.learning_activity_log
    where user_id = new.user_id and voided_at is null and activity_type <> 'achievement'
      and public.xp_london_day(created_at) = v_day;
    if v_xp > greatest(0, 1500 - v_all_today) then v_reason := 'day_cap'; end if;
    if v_xp > greatest(0, public._xp_daily_cap(new.activity_type) - v_type_today) then v_reason := 'type_cap'; end if;
    v_xp := least(v_xp,
                  greatest(0, public._xp_daily_cap(new.activity_type) - v_type_today),
                  greatest(0, 1500 - v_all_today));
    if v_xp > 0 then v_reason := 'awarded'; end if;
  end if;

  new.xp_earned := v_xp;
  new.award_key := case when v_xp > 0 then v_key else null end;
  new.voided_at := null;
  new.void_reason := null;
  new.metadata := coalesce(new.metadata, '{}'::jsonb)
                  || jsonb_build_object('xp_reason', v_reason, 'via', 'client_insert');
  return new;
end;
$$;

-- Mock attempts written by an app take the server's time.
create or replace function public._mock_attempt_server_time()
returns trigger language plpgsql set search_path = public as $$
begin
  if current_user in ('authenticated', 'anon') then
    new.created_at := now();
  end if;
  return new;
end;
$$;
drop trigger if exists trg_a0_mock_attempt_server_time on public.seo_mock_attempts;
create trigger trg_a0_mock_attempt_server_time
  before insert on public.seo_mock_attempts
  for each row execute function public._mock_attempt_server_time();

create or replace function public._xp_on_mock_attempt()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_pct integer;
begin
  if new.user_id is null or coalesce(new.total_questions, 0) < 10 then
    return new;
  end if;
  -- From the marks, not the reported percentage.
  v_pct := least(greatest(round(coalesce(new.score, 0) * 100.0 / new.total_questions)::int, 0), 100);
  perform public._xp_award(
    new.user_id, 'mock_exam', new.exam_slug, coalesce(new.exam_name, new.exam_slug),
    50 + v_pct,
    'mock:' || new.exam_slug || ':' || public.xp_london_day()::text,
    0, jsonb_build_object('attempt_id', new.id, 'percentage', v_pct), true,
    now());
  return new;
exception when others then
  return new;
end;
$$;

create or replace function public.log_study_activity(p_course text, p_section text, p_title text, p_active_seconds integer)
returns jsonb language plpgsql security definer set search_path to 'public' as $function$
declare
  c_entry_cap_min   constant integer := 30;
  c_section_cap_min constant integer := 30;
  c_daily_cap_min   constant integer := 240;
  v_user uuid := auth.uid();
  v_requested_min integer;
  v_section_used integer;
  v_daily_used integer;
  v_allowed integer;
  v_res jsonb;
begin
  if v_user is null then
    raise exception 'not authenticated';
  end if;
  if p_course is null or p_section is null or coalesce(p_active_seconds, 0) < 60 then
    return jsonb_build_object('credited_minutes', 0, 'reason', 'below_minimum');
  end if;

  v_requested_min := least(round(least(p_active_seconds, 28800) / 60.0)::int, c_entry_cap_min);
  if v_requested_min < 1 then
    return jsonb_build_object('credited_minutes', 0, 'reason', 'below_minimum');
  end if;

  select coalesce(sum(duration_minutes), 0) into v_section_used
  from public.learning_activity_log
  where user_id = v_user and activity_type = 'study_module'
    and created_at >= (public.xp_london_day()::timestamp at time zone 'Europe/London')
    and metadata ->> 'course' = p_course and metadata ->> 'section' = p_section;

  select coalesce(sum(duration_minutes), 0) into v_daily_used
  from public.learning_activity_log
  where user_id = v_user and activity_type = 'study_module'
    and created_at >= (public.xp_london_day()::timestamp at time zone 'Europe/London');

  v_allowed := least(
    v_requested_min,
    greatest(0, c_section_cap_min - v_section_used),
    greatest(0, c_daily_cap_min - v_daily_used)
  );

  if v_allowed <= 0 then
    return jsonb_build_object(
      'credited_minutes', 0,
      'reason', case when v_daily_used >= c_daily_cap_min then 'daily_cap' else 'section_cap' end
    );
  end if;

  v_res := public._xp_award(
    v_user, 'study_module', p_course || '/' || p_section,
    coalesce(nullif(p_title, ''), p_course || ' — ' || p_section),
    25, 'section:' || p_course || '/' || p_section || ':' || public.xp_london_day()::text,
    v_allowed,
    jsonb_build_object('course', p_course, 'section', p_section,
      'active_seconds', least(p_active_seconds, 28800), 'measured', true,
      'capped', v_allowed < v_requested_min, 'via_rpc', true),
    false);

  return jsonb_build_object(
    'credited_minutes', case when coalesce((v_res->>'logged')::boolean, false) then v_allowed else 0 end,
    'xp', coalesce((v_res->>'xp')::int, 0));
end;
$function$;

create or replace function public.study_board(time_filter text, league text default 'all')
returns table(uid uuid, display_name text, avatar text, board_xp integer, streak integer, quizzes bigint, quiz_avg numeric, award_count bigint, pos bigint)
language sql stable security definer set search_path to 'public' as $function$
  with c as (select public.xp_period_start(time_filter) as d),
  xp as (
    select l.user_id, sum(l.xp_earned)::int as xp, max(l.created_at) as reached_at
    from public.learning_activity_log l, c
    where l.voided_at is null and l.xp_earned > 0 and l.created_at >= c.d
      and l.created_at <= now()
      -- Awards count towards level and the all-time board, never a week or
      -- month board: user_achievements is client-inserted (review 10 Oct).
      and (time_filter = 'all' or l.activity_type <> 'achievement')
    group by l.user_id
  ),
  qr as (
    select q.user_id, count(*) as cnt, avg(q.percentage) as avg_pct
    from public.quiz_results q, c where q.completed_at >= c.d group by q.user_id
  ),
  a as (
    select a2.user_id, count(*) as cnt
    from public.user_achievements a2, c where a2.unlocked_at >= c.d group by a2.user_id
  )
  select p.id, p.full_name, p.avatar_url, x.xp,
         coalesce(s.current_streak, 0), coalesce(qr.cnt, 0::bigint),
         coalesce(round(qr.avg_pct, 1), 0::numeric), coalesce(a.cnt, 0::bigint),
         row_number() over (order by x.xp desc, x.reached_at asc, p.id) as pos
  from xp x
  join public.profiles p on p.id = x.user_id
  left join public.user_study_streaks s on s.user_id = p.id
  left join qr on qr.user_id = p.id
  left join a on a.user_id = p.id
  where p.leaderboard_visible = true and p.full_name is not null
    and p.leaderboard_excluded = false
    and p.admin_role is null
    and public.xp_in_league(p.role, league);
$function$;

create or replace function public.get_my_xp()
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'total_xp', coalesce(sum(l.xp_earned) filter (where l.voided_at is null), 0),
    'xp_today', coalesce(sum(l.xp_earned) filter (where l.voided_at is null
                  and public.xp_london_day(l.created_at) = public.xp_london_day()), 0),
    'xp_week', coalesce(sum(l.xp_earned) filter (where l.voided_at is null and l.activity_type <> 'achievement'
                  and l.created_at >= public.xp_period_start('week')), 0),
    'xp_month', coalesce(sum(l.xp_earned) filter (where l.voided_at is null and l.activity_type <> 'achievement'
                  and l.created_at >= public.xp_period_start('month')), 0),
    'daily_goal', coalesce((select s.daily_goal from public.user_xp_summary s where s.user_id = auth.uid()), 100)
  )
  from public.learning_activity_log l
  where l.user_id = auth.uid();
$$;

revoke execute on function public.study_board(text, text) from public, anon;
revoke execute on function public.get_study_leaderboard(text, text) from public, anon;
revoke execute on function public.get_study_leaderboard_me(text, text) from public, anon;
revoke execute on function public.get_study_leaderboard_around_me(text, integer, text) from public, anon;
grant execute on function public.study_board(text, text) to authenticated;
grant execute on function public.get_study_leaderboard(text, text) to authenticated;
grant execute on function public.get_study_leaderboard_me(text, text) to authenticated;
grant execute on function public.get_study_leaderboard_around_me(text, integer, text) to authenticated;
