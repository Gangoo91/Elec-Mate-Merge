-- XP leagues + the rival nudge on the real board (10 Oct 2026).
--
-- Leagues: apprentices and qualified electricians ranked separately, so a
-- first-year isn't up against someone grinding CPD. Every board function
-- takes `league` ('all' | 'apprentices' | 'electricians', default 'all');
-- existing callers that pass only time_filter keep working.
--
-- get_next_best_actions: the xp_rival nudge said "Someone is N XP ahead of
-- you · close enough to catch this week" from ALL-TIME totals across every
-- user. It now names the person directly above you on this month's board
-- and links to the leaderboard. Daily-goal default 50 -> 100 to match the app.

drop function if exists public.get_study_leaderboard_around_me(text, integer);
drop function if exists public.get_study_leaderboard_me(text);
drop function if exists public.get_study_leaderboard(text);
drop function if exists public.study_board(text);

create or replace function public.xp_in_league(p_role text, p_league text)
returns boolean language sql immutable as $$
  select case coalesce(p_league, 'all')
    when 'apprentices' then p_role = 'apprentice'
    when 'electricians' then p_role in ('electrician', 'employer')
    else true end;
$$;

create or replace function public.study_board(time_filter text, league text default 'all')
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
    and p.admin_role is null
    and public.xp_in_league(p.role, league);
$function$;

create or replace function public.get_study_leaderboard(time_filter text default 'all', league text default 'all')
returns table(uid uuid, display_name text, avatar text, sections_done bigint, xp integer, current_streak integer, quizzes_taken bigint, avg_quiz_score numeric, awards bigint)
language sql stable security definer set search_path to 'public' as $function$
  select b.uid, b.display_name, b.avatar,
         (select count(*) from public.course_progress cp
           where cp.user_id = b.uid and cp.completed = true
             and cp.last_accessed_at >= public.xp_period_start(time_filter)),
         b.board_xp, b.streak, b.quizzes, b.quiz_avg, b.award_count
  from public.study_board(time_filter, league) b
  order by b.pos
  limit 50;
$function$;

create or replace function public.get_study_leaderboard_me(time_filter text, league text default 'all')
returns table(my_rank bigint, total_learners bigint, xp integer, current_streak integer, quizzes_taken bigint, avg_quiz_score numeric, awards bigint, display_name text, avatar text, rank_7d_ago integer, movement integer)
language plpgsql stable security definer set search_path to 'public' as $function$
declare
  me uuid := auth.uid();
begin
  if me is null then return; end if;
  return query
  with board as (select * from public.study_board(time_filter, league)),
  prior as (
    select s.rank from public.study_rank_snapshots s
    where s.user_id = me and s.captured_on <= current_date - 7
    order by s.captured_on desc limit 1
  )
  select b.pos, (select count(*) from board), b.board_xp, b.streak, b.quizzes, b.quiz_avg, b.award_count,
         b.display_name, b.avatar,
         -- Snapshots are of the all-time board only, so movement is only
         -- honest on that board.
         case when league = 'all' and time_filter = 'all' then (select p.rank from prior p) end,
         case when league <> 'all' or time_filter <> 'all' or (select p.rank from prior p) is null then null
              else (select p.rank from prior p) - b.pos::integer end
  from board b
  where b.uid = me;
end;
$function$;

create or replace function public.get_study_leaderboard_around_me(time_filter text, span integer default 3, league text default 'all')
returns table(uid uuid, display_name text, avatar text, xp integer, current_streak integer, quizzes_taken bigint, avg_quiz_score numeric, awards bigint, pos bigint, is_me boolean)
language plpgsql stable security definer set search_path to 'public' as $function$
declare
  me uuid := auth.uid();
  window_size integer := least(greatest(span, 1), 10);
begin
  if me is null then return; end if;
  return query
  with board as (select * from public.study_board(time_filter, league)),
  anchor as (select b.pos from board b where b.uid = me)
  select b.uid, b.display_name, b.avatar, b.board_xp, b.streak,
         b.quizzes, b.quiz_avg, b.award_count, b.pos, (b.uid = me)
  from board b, anchor a
  where b.pos between a.pos - window_size and a.pos + window_size
  order by b.pos;
end;
$function$;

grant execute on function public.study_board(text, text) to authenticated;
grant execute on function public.get_study_leaderboard(text, text) to authenticated, anon;
grant execute on function public.get_study_leaderboard_me(text, text) to authenticated;
grant execute on function public.get_study_leaderboard_around_me(text, integer, text) to authenticated;

CREATE OR REPLACE FUNCTION public.get_next_best_actions(p_user_id uuid, p_limit integer DEFAULT 5)
 RETURNS TABLE(kind text, score numeric, title text, reason text, route text, payload jsonb)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_now   timestamptz := now();
  v_today date        := (now() at time zone 'Europe/London')::date;
  v_hour  integer     := extract(hour from (now() at time zone 'Europe/London'))::integer;
begin
  if auth.uid() is not null and auth.uid() <> p_user_id then
    raise exception 'get_next_best_actions: p_user_id must be the calling user';
  end if;

  return query
  with
  streak as (
    select s.current_streak, s.longest_streak, s.last_study_date
    from user_study_streaks s where s.user_id = p_user_id
  ),
  xp as (
    select x.total_xp,
           coalesce(x.daily_goal, 100) as daily_goal,
           case when x.xp_today_date = v_today then coalesce(x.xp_today, 0) else 0 end as xp_today
    from user_xp_summary x where x.user_id = p_user_id
  ),
  prof as (
    select p.last_study_path, p.last_study_title, p.last_study_at
    from profiles p where p.id = p_user_id
  ),
  live_sections as (
    select cp.course_key, cp.section_key, cp.progress_pct, cp.last_accessed_at,
           case when cp.course_key = 'apprentice'
                then '/study-centre/apprentice/' || cp.section_key
                else '/study-centre/upskilling/' || cp.course_key || '/' || cp.section_key
           end as route,
           study_section_label(
             case when cp.course_key = 'apprentice' then cp.section_key
                  else cp.course_key || '/' || cp.section_key end) as label
    from course_progress cp
    where cp.user_id = p_user_id
      and cp.completed is not true
      and cp.section_key !~* '(^|[/-])modules?[-]?[0-9]*$'
      and (   cp.section_key ~* '(^|[/-])(section|subsection|lesson|topic|unit|part)[-0-9]'
           or cp.section_key ~* 'mock-?exam'
           or cp.section_key ~* '(^|/)[0-9]+[-.][0-9]+$')
  ),
  weak as (
    select e.key                               as topic,
           sum((e.value->>'correct')::numeric) as correct,
           sum((e.value->>'total')::numeric)   as total,
           max(q.completed_at)                 as last_seen
    from learner_assessments q
    cross join lateral jsonb_each(q.category_breakdown) e
    where q.user_id = p_user_id
      and q.completed_at > v_now - interval '45 days'
      and jsonb_typeof(q.category_breakdown) = 'object'
      and jsonb_typeof(e.value) = 'object'
      and e.value ? 'total' and e.value ? 'correct'
    group by e.key
    having sum((e.value->>'total')::numeric) >= 4
       and sum((e.value->>'correct')::numeric) / nullif(sum((e.value->>'total')::numeric), 0) < 0.75
    order by sum((e.value->>'correct')::numeric) / nullif(sum((e.value->>'total')::numeric), 0) asc
    limit 1
  ),
  last_mock as (
    select * from (
      select case la.kind
                when 'am2_simulator' then 'AM2'
                when 'epa_simulator' then 'EPA'
                else coalesce(
                       nullif(replace(
                         coalesce(study_section_label(regexp_replace(la.slug, '-mock[0-9]*$', '')), ''),
                         ' · ', ' '), ''),
                       'practice')
              end::text as label,
             la.percentage as overall_score, la.category_breakdown as component_scores, la.completed_at
      from learner_assessments la
      where la.user_id = p_user_id and la.completed_at is not null and la.percentage is not null
    ) z
    order by z.completed_at desc
    limit 1
  ),
  -- Weakest NAMED component of that mock.
  --
  -- component_scores holds three different shapes. Two of them are not scores:
  -- `{total, correct}` is a raw question tally (total:12 means twelve questions,
  -- not 12%), and one session stores `{1,2,3,4}`. Reading those as percentages
  -- produced "Shore up total — you scored 100%, lowest on total at 7%", which
  -- is both meaningless and self-contradictory. Only named components with a
  -- plausible percentage in them are eligible.
  mock_weak as (
    select mock_component_label(c.key) as component, (c.value)::text::numeric as pct
    from last_mock lm
    cross join lateral jsonb_each(lm.component_scores) c
    where jsonb_typeof(lm.component_scores) = 'object'
      and jsonb_typeof(c.value) = 'number'
      and c.key !~ '^[0-9]+$'
      and lower(c.key) not in ('total', 'correct', 'score', 'questions', 'answered', 'incorrect')
      and (c.value)::text::numeric between 0 and 100
    order by (c.value)::text::numeric asc
    limit 1
  ),
  rival as (
    -- The person directly above you on THIS MONTH's board (the one the page
    -- shows), not the nearest all-time total (9 Oct 2026, XP rebuild).
    select a.board_xp - m.board_xp + 1 as gap,
           split_part(coalesce(a.display_name, 'Someone'), ' ', 1) as who
    from public.study_board('month') m
    join public.study_board('month') a on a.pos = m.pos - 1
    where m.uid = p_user_id
      and a.board_xp - m.board_xp between 0 and 400
  ),
  fatigue as (
    select replace(l.type, 'nba_', '') as kind,
           max(l.sent_at) as last_sent
    from push_notification_log l
    where l.user_id = p_user_id
      and l.sent_at > v_now - interval '10 days'
      and l.type like 'nba\_%'
    group by 1
  ),
  c_finish as (
    select 'finish_section'::text as kind,
           90::numeric            as base,
           extract(epoch from (v_now - ls.last_accessed_at)) / 86400 as age_days,
           'Finish what you started' as title,
           'You opened ' || coalesce(ls.label, 'this section')
             || ' but never finished it' as reason,
           ls.route,
           jsonb_build_object('course_key', ls.course_key,
                              'section_key', ls.section_key,
                              'label', ls.label) as payload
    from live_sections ls
    where ls.progress_pct < 100
      and ls.last_accessed_at > v_now - interval '21 days'
    order by ls.last_accessed_at desc
    limit 1
  ),
  -- Three shapes, because one sentence cannot serve a 39% and a 97%.
  -- A named weak area gets named; a strong result gets acknowledged and pushed
  -- forward; anything else gets a plain second go. None of them ever claims a
  -- weakness the component data does not actually support.
  c_mock as (
    select 'mock_followup'::text, 88::numeric,
           extract(epoch from (v_now - lm.completed_at)) / 86400,
           case
             when mw.component is not null and mw.pct < 70 then 'Shore up ' || lower(mw.component)
             when lm.overall_score >= 80 then 'Keep the ' || lm.label || ' momentum'
             else 'Another go at the ' || lm.label || ' mock'
           end,
           case
             when mw.component is not null and mw.pct < 70
               then 'You scored ' || round(lm.overall_score)::text || '% on your last '
                    || lm.label || ' mock — ' || lower(mw.component)
                    || ' was your lowest at ' || round(mw.pct)::text || '%'
             when lm.overall_score >= 80
               then 'You scored ' || round(lm.overall_score)::text
                    || '% last time. Try the next paper while it is fresh.'
             else 'You scored ' || round(lm.overall_score)::text
                  || '% last time. A second run usually moves it.'
           end,
           '/study-centre/mock-exams',
           jsonb_build_object('overall_score', round(lm.overall_score),
                              'label', lm.label,
                              'component', mw.component,
                              'component_pct', round(mw.pct))
    from last_mock lm
    left join mock_weak mw on true
    where lm.completed_at > v_now - interval '10 days'
  ),
  c_streak as (
    select 'streak_risk'::text,
           (case when v_hour >= 17 then 90 when v_hour >= 12 then 62 else 40 end)::numeric,
           0::numeric,
           'Keep your ' || s.current_streak::text || '-day streak',
           'You have not studied today — ten minutes keeps it alive',
           '/study-centre',
           jsonb_build_object('current_streak', s.current_streak,
                              'longest_streak', s.longest_streak)
    from streak s
    where s.current_streak >= 2
      and (s.last_study_date is null or s.last_study_date < v_today)
  ),
  c_weak as (
    select 'weak_topic'::text, 76::numeric,
           extract(epoch from (v_now - w.last_seen)) / 86400,
           'Practise ' || w.topic,
           'You are getting ' || round(100 * w.correct / w.total)::text
             || '% right on ' || w.topic,
           '/study-centre/mock-exams?q='
             || btrim(regexp_replace(lower(w.topic), '[^a-z0-9]+', '+', 'g'), '+'),
           jsonb_build_object('topic', w.topic,
                              'pct', round(100 * w.correct / w.total),
                              'answered', w.total)
    from weak w
  ),
  c_resume as (
    select 'resume'::text, 72::numeric,
           extract(epoch from (v_now - p.last_study_at)) / 86400,
           clip_title('Pick up ' || coalesce(nullif(p.last_study_title, ''), 'where you left off')),
           'Where you got to last time',
           p.last_study_path,
           jsonb_build_object('title', p.last_study_title, 'at', p.last_study_at)
    from prof p
    where p.last_study_path is not null
      and p.last_study_at > v_now - interval '30 days'
  ),
  c_goal as (
    select 'daily_goal'::text, 64::numeric, 0::numeric,
           (x.daily_goal - x.xp_today)::text || ' XP to hit today''s goal',
           'You are on ' || x.xp_today::text || ' of ' || x.daily_goal::text || ' XP',
           '/study-centre',
           jsonb_build_object('xp_today', x.xp_today, 'daily_goal', x.daily_goal,
                              'remaining', x.daily_goal - x.xp_today)
    from xp x
    where x.xp_today > 0 and x.xp_today < x.daily_goal
  ),
  c_rival as (
    select 'xp_rival'::text, 44::numeric, 0::numeric,
           r.gap::text || ' XP to pass ' || initcap(r.who),
           'They are one place above you this month',
           '/study-centre/leaderboard',
           jsonb_build_object('gap', r.gap)
    from rival r
    where r.gap is not null
  ),
  c_start as (
    select 'first_step'::text, 30::numeric, 0::numeric,
           'Start your first section',
           'Pick a course and we will keep your place from here on',
           '/study-centre/browse',
           '{}'::jsonb
    from prof p
    where not exists (select 1 from live_sections)
      and (p.last_study_path is null or p.last_study_at < v_now - interval '30 days')
  ),
  pooled as (
    select * from c_finish
    union all select * from c_mock
    union all select * from c_streak
    union all select * from c_weak
    union all select * from c_resume
    union all select * from c_goal
    union all select * from c_rival
    union all select * from c_start
  ),
  scored as (
    select
      p.kind,
      round(
        p.base
        * exp(-greatest(p.age_days, 0) / 14.0)
        * coalesce(
            least(1.0, 0.4 + 0.2 * (extract(epoch from (v_now - f.last_sent)) / 86400)),
            1.0)
      , 2) as score,
      p.title, p.reason, p.route, p.payload
    from pooled p
    left join fatigue f on f.kind = p.kind
    where p.route is not null
  ),
  deduped as (
    select distinct on (s.route) s.*
    from scored s
    order by s.route, s.score desc
  )
  select d.kind, d.score, d.title, d.reason, d.route, d.payload
  from deduped d
  order by d.score desc
  limit greatest(p_limit, 1);
end;
$function$;
