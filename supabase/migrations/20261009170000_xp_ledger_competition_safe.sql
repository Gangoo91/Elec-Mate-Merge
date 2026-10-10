-- XP made competition-safe, part 1 of 2 (9 Oct 2026). Andrew: "we need it to
-- A work, B be 100% accurate" — "we're going to do competitions on it".
--
-- Audit found: users could write their own XP (user UPDATE/INSERT on
-- user_xp_summary, user INSERT with any xp_earned on learning_activity_log);
-- the all-time board read the summary while week/month boards summed the log
-- (115 of 580 users reconciled); the quiz double-fire put 100,044 XP on the
-- board; mock exams awarded nothing; "this month" was a rolling 30 days; ties
-- were arbitrary.
--
-- This part: ledger columns, server-owned award functions, summary derived
-- from the ledger by trigger, calendar-period boards. Part 2
-- (20261009171000) repairs history and removes user write access.
--
-- Off-the-job hours: duration_minutes and counted_as_ojt are never altered and
-- no row is deleted. Mock-exam XP rows carry 0 minutes (mock time has never
-- counted towards OTJ and this does not change that).

-- ── 1. Ledger columns ────────────────────────────────────────────────────
alter table public.learning_activity_log
  add column if not exists award_key text,
  add column if not exists voided_at timestamptz,
  add column if not exists void_reason text;

create unique index if not exists learning_activity_log_award_key_uq
  on public.learning_activity_log (user_id, award_key)
  where award_key is not null;

comment on column public.learning_activity_log.award_key is
  'XP idempotency key (type:item[:London day]). One XP award per key per user. Null = no XP claimed by this row.';
comment on column public.learning_activity_log.voided_at is
  'Set when the row''s XP no longer counts (e.g. double_fire). Duration/OTJ unaffected.';

alter table public.profiles
  add column if not exists leaderboard_excluded boolean not null default false;
comment on column public.profiles.leaderboard_excluded is
  'Staff, demo and test accounts: never ranked on XP boards or competitions.';

-- Backup of every total before the rebuild (rollback: copy back).
create table if not exists public.user_xp_summary_backup_20261009 as
  select * from public.user_xp_summary;
comment on table public.user_xp_summary_backup_20261009 is
  '[XP] Snapshot of user_xp_summary before the ledger rebuild on 9 Oct 2026. Scope: admin only. Used by: rollback. Rule: read-only, drop after 30 days.';
alter table public.user_xp_summary_backup_20261009 enable row level security;

-- ── 2. Shared helpers ────────────────────────────────────────────────────
-- Level curve: mirrors src/data/xpConfig.ts LEVELS.
create or replace function public.xp_level_for(p_xp integer)
returns integer language sql immutable as $$
  select case
    when p_xp >= 25000 then 10 when p_xp >= 18000 then 9 when p_xp >= 12000 then 8
    when p_xp >= 8000 then 7 when p_xp >= 5000 then 6 when p_xp >= 3000 then 5
    when p_xp >= 1500 then 4 when p_xp >= 750 then 3 when p_xp >= 250 then 2
    else 1 end;
$$;

create or replace function public.xp_london_day(p_ts timestamptz default now())
returns date language sql stable as $$
  select (p_ts at time zone 'Europe/London')::date;
$$;

-- Start of the current calendar week (Monday) / month in Europe/London.
create or replace function public.xp_period_start(p_period text)
returns timestamptz language sql stable as $$
  select case p_period
    when 'week' then (date_trunc('week', now() at time zone 'Europe/London')) at time zone 'Europe/London'
    when 'month' then (date_trunc('month', now() at time zone 'Europe/London')) at time zone 'Europe/London'
    else '1970-01-01'::timestamptz end;
$$;

-- ── 3. Summary derived from the ledger ───────────────────────────────────
create or replace function public._xp_recompute(p_user uuid)
returns void language sql security definer set search_path = public as $$
  insert into public.user_xp_summary (user_id, total_xp, level, xp_today, xp_today_date, updated_at)
  select p_user,
         coalesce(sum(l.xp_earned) filter (where l.voided_at is null), 0),
         public.xp_level_for(coalesce(sum(l.xp_earned) filter (where l.voided_at is null), 0)::int),
         coalesce(sum(l.xp_earned) filter (where l.voided_at is null
                   and public.xp_london_day(l.created_at) = public.xp_london_day()), 0),
         public.xp_london_day(),
         now()
  from public.learning_activity_log l
  where l.user_id = p_user
  on conflict (user_id) do update
    set total_xp = excluded.total_xp,
        level = excluded.level,
        xp_today = excluded.xp_today,
        xp_today_date = excluded.xp_today_date,
        updated_at = now();
$$;
revoke all on function public._xp_recompute(uuid) from public, anon, authenticated;

create or replace function public._xp_ledger_changed()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'DELETE' then
    perform public._xp_recompute(old.user_id);
  else
    perform public._xp_recompute(new.user_id);
  end if;
  return null;
end;
$$;

drop trigger if exists trg_xp_ledger_changed on public.learning_activity_log;
create trigger trg_xp_ledger_changed
  after insert or update of xp_earned, voided_at or delete on public.learning_activity_log
  for each row execute function public._xp_ledger_changed();

-- ── 4. Award rules (the server owns the amount) ──────────────────────────
create or replace function public._xp_daily_cap(p_type text)
returns integer language sql immutable as $$
  select case p_type
    when 'quiz_completed' then 1000
    when 'tutor_quiz' then 300
    when 'flashcard_session' then 250
    when 'video_watched' then 200
    when 'mock_exam' then 600
    when 'path_completed' then 200
    when 'site_diary_entry' then 100
    when 'portfolio_evidence' then 300
    else 1500 end;
$$;

-- Inserts one ledger row and decides its XP. Serialised per user.
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
    where user_id = p_user and voided_at is null
      and public.xp_london_day(created_at) = v_day;
    v_xp := least(v_xp,
                  greatest(0, public._xp_daily_cap(p_type) - v_type_today),
                  greatest(0, c_day_cap - v_all_today));
    if v_xp = 0 then v_reason := 'daily_cap'; end if;
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
revoke all on function public._xp_award(uuid, text, text, text, integer, text, integer, jsonb, boolean, timestamptz) from public, anon, authenticated;

-- The one client entry point: the client says what happened, the server
-- decides what it is worth.
create or replace function public.award_xp(
  p_activity_type text,
  p_source_id text default null,
  p_source_title text default null,
  p_score numeric default null,
  p_cards integer default null,
  p_duration_minutes integer default 0,
  p_metadata jsonb default '{}'::jsonb,
  p_counted_as_ojt boolean default false
) returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_user uuid := auth.uid();
  v_day text := public.xp_london_day()::text;
  v_s integer := least(greatest(coalesce(round(p_score), 0), 0), 100)::int;
  v_xp integer;
  v_key text;
begin
  if v_user is null then raise exception 'not authenticated'; end if;

  case p_activity_type
    when 'quiz_completed' then
      v_xp := 30 + round(v_s * 0.7)::int + case when v_s = 100 then 50 else 0 end;
      v_key := 'quiz:' || coalesce(p_source_id, 'unknown') || ':' || v_day;
    when 'tutor_quiz' then
      v_xp := round(v_s / 100.0 * 30)::int + 5;
      v_key := 'tutor_quiz:' || coalesce(p_source_id, 'unknown');
    when 'flashcard_session' then
      v_xp := 5 * least(greatest(coalesce(p_cards, 0), 0), 50);
      v_key := null; -- capped per day instead (250 XP = 50 cards)
    when 'video_watched' then
      v_xp := 10; v_key := 'video:' || coalesce(p_source_id, 'unknown');
    when 'path_completed' then
      v_xp := 50; v_key := 'path:' || coalesce(p_source_id, 'unknown');
    when 'site_diary_entry' then
      v_xp := 20; v_key := 'diary:' || coalesce(p_source_id, 'unknown');
    when 'portfolio_evidence' then
      v_xp := 30; v_key := 'evidence:' || coalesce(p_source_id, 'unknown');
    else
      raise exception 'unknown activity type %', p_activity_type;
  end case;

  return public._xp_award(v_user, p_activity_type, p_source_id, p_source_title, v_xp, v_key,
                          p_duration_minutes, p_metadata, p_counted_as_ojt);
end;
$$;
revoke all on function public.award_xp(text, text, text, numeric, integer, integer, jsonb, boolean) from public, anon;
grant execute on function public.award_xp(text, text, text, numeric, integer, integer, jsonb, boolean) to authenticated;

-- Achievement bonuses: mirrors src/data/achievementDefinitions.ts.
create or replace function public._xp_achievement_bonus(p_id text)
returns integer language sql immutable as $$
  select case p_id
    when 'first-flip' then 10 when 'set-master' then 50 when 'card-century' then 30
    when 'card-500' then 75 when 'all-sets' then 200 when 'first-quiz' then 10
    when 'perfect-score' then 50 when 'quiz-10' then 30 when 'quiz-50' then 100
    when 'speed-demon' then 25 when 'all-categories' then 100 when 'streak-3' then 15
    when 'streak-7' then 30 when 'streak-14' then 50 when 'streak-30' then 100
    when 'streak-100' then 250 when 'first-hour' then 10 when 'ojt-50' then 30
    when 'ojt-100' then 50 when 'ojt-400' then 150 when 'first-evidence' then 15
    when 'portfolio-10' then 40 when 'portfolio-complete' then 200 when 'first-reflection' then 10
    when 'diary-10' then 30 when 'diary-30' then 75 when 'level-5' then 50
    when 'level-10' then 500 when 'xp-1000' then 25 when 'xp-10000' then 100
    when 'daily-goal-7' then 50 when 'epa-mock' then 30 when 'epa-distinction' then 100
    when 'section-first' then 25 when 'section-10' then 50 when 'section-25' then 100
    when 'section-100' then 250 when 'section-250' then 500
    else 0 end;
$$;

-- Once per achievement, only if it is actually unlocked.
create or replace function public.award_achievement_xp(p_achievement_id text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_user uuid := auth.uid();
  v_bonus integer := public._xp_achievement_bonus(p_achievement_id);
  v_key text := 'achievement:' || p_achievement_id;
begin
  if v_user is null then raise exception 'not authenticated'; end if;
  perform pg_advisory_xact_lock(hashtext('xp:' || v_user::text));
  if v_bonus = 0 or not exists (
    select 1 from public.user_achievements where user_id = v_user and achievement_id = p_achievement_id
  ) then
    return jsonb_build_object('xp', 0, 'awarded', false, 'reason', 'not_unlocked');
  end if;
  if exists (select 1 from public.learning_activity_log where user_id = v_user and award_key = v_key) then
    return jsonb_build_object('xp', 0, 'awarded', false, 'reason', 'already_awarded');
  end if;
  insert into public.learning_activity_log
    (user_id, activity_type, source_id, source_title, xp_earned, duration_minutes, metadata, counted_as_ojt, award_key)
  values (v_user, 'achievement', p_achievement_id, 'Achievement: ' || p_achievement_id, v_bonus, 0,
          '{}'::jsonb, true, v_key);
  return jsonb_build_object('xp', v_bonus, 'awarded', true);
end;
$$;
revoke all on function public.award_achievement_xp(text) from public, anon;
grant execute on function public.award_achievement_xp(text) to authenticated;

-- Daily goal: the one XP setting a user may change.
create or replace function public.set_xp_daily_goal(p_goal integer)
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  if p_goal not in (50, 100, 200, 300) then raise exception 'invalid goal'; end if;
  insert into public.user_xp_summary (user_id, daily_goal) values (auth.uid(), p_goal)
  on conflict (user_id) do update set daily_goal = excluded.daily_goal, updated_at = now();
end;
$$;
revoke all on function public.set_xp_daily_goal(integer) from public, anon;
grant execute on function public.set_xp_daily_goal(integer) to authenticated;

-- What the app shows: live from the ledger, never a stale "today".
create or replace function public.get_my_xp()
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'total_xp', coalesce(sum(l.xp_earned) filter (where l.voided_at is null), 0),
    'xp_today', coalesce(sum(l.xp_earned) filter (where l.voided_at is null
                  and public.xp_london_day(l.created_at) = public.xp_london_day()), 0),
    'xp_week', coalesce(sum(l.xp_earned) filter (where l.voided_at is null
                  and l.created_at >= public.xp_period_start('week')), 0),
    'xp_month', coalesce(sum(l.xp_earned) filter (where l.voided_at is null
                  and l.created_at >= public.xp_period_start('month')), 0),
    'daily_goal', coalesce((select s.daily_goal from public.user_xp_summary s where s.user_id = auth.uid()), 100)
  )
  from public.learning_activity_log l
  where l.user_id = auth.uid();
$$;
revoke all on function public.get_my_xp() from public, anon;
grant execute on function public.get_my_xp() to authenticated;

-- ── 5. log_study_activity: 25 XP once per section per London day ────────
-- The minutes logic (and so OTJ) is unchanged; only the XP is keyed.
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
    and created_at >= date_trunc('day', now())
    and metadata ->> 'course' = p_course and metadata ->> 'section' = p_section;

  select coalesce(sum(duration_minutes), 0) into v_daily_used
  from public.learning_activity_log
  where user_id = v_user and activity_type = 'study_module'
    and created_at >= date_trunc('day', now());

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

-- ── 6. Mock exams award XP: 50 + score, once per paper per London day ────
create or replace function public._xp_on_mock_attempt()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.user_id is null or coalesce(new.total_questions, 0) < 10 then
    return new;
  end if;
  perform public._xp_award(
    new.user_id, 'mock_exam', new.exam_slug, coalesce(new.exam_name, new.exam_slug),
    50 + least(greatest(round(coalesce(new.percentage, 0))::int, 0), 100),
    'mock:' || new.exam_slug || ':' || public.xp_london_day(coalesce(new.created_at, now()))::text,
    0, jsonb_build_object('attempt_id', new.id, 'percentage', new.percentage), true,
    coalesce(new.created_at, now()));
  return new;
exception when others then
  -- XP must never stop a mock result being saved.
  return new;
end;
$$;
drop trigger if exists trg_xp_on_mock_attempt on public.seo_mock_attempts;
create trigger trg_xp_on_mock_attempt
  after insert on public.seo_mock_attempts
  for each row execute function public._xp_on_mock_attempt();

-- ── 7. Boards: calendar periods, ledger only, deterministic ──────────────
-- Tie-break: whoever reached the total first, then id. Staff, test and
-- hidden accounts never ranked.
create or replace function public.study_board(time_filter text)
returns table(uid uuid, display_name text, avatar text, board_xp integer, streak integer, quizzes bigint, quiz_avg numeric, award_count bigint, pos bigint)
language sql stable security definer set search_path to 'public' as $function$
  with c as (select public.xp_period_start(time_filter) as d),
  xp as (
    select l.user_id, sum(l.xp_earned)::int as xp, max(l.created_at) as reached_at
    from public.learning_activity_log l, c
    where l.voided_at is null and l.xp_earned > 0 and l.created_at >= c.d
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
    and p.admin_role is null;
$function$;

create or replace function public.get_study_leaderboard(time_filter text default 'all')
returns table(uid uuid, display_name text, avatar text, sections_done bigint, xp integer, current_streak integer, quizzes_taken bigint, avg_quiz_score numeric, awards bigint)
language sql stable security definer set search_path to 'public' as $function$
  select b.uid, b.display_name, b.avatar,
         (select count(*) from public.course_progress cp
           where cp.user_id = b.uid and cp.completed = true
             and cp.last_accessed_at >= public.xp_period_start(time_filter)),
         b.board_xp, b.streak, b.quizzes, b.quiz_avg, b.award_count
  from public.study_board(time_filter) b
  order by b.pos
  limit 50;
$function$;
