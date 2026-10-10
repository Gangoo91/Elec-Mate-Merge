-- Speed Demon toast on every page (Andrew, 10 Oct 2026, iOS app)
--
-- Installed app builds still run the old achievement checker: it thinks every
-- quiz is "under 5 minutes" (seconds / 60,000) and that a 7-day streak is
-- Goal Getter. Since 20261010230000 those are server-only awards, and the
-- guard DROPPED the old client's insert silently. The old client never reads
-- the result, so it toasted "Achievement Unlocked" and tried again on every
-- screen, for ever. A store update can't reach everyone, so the fix is here.
--
-- Now a client insert of a server award is KEPT as a placeholder
-- (earned = false). The old client sees the row, counts it as unlocked and
-- stops. Placeholders carry no XP, don't count on the board or in award
-- shares, and show as locked in my_awards. Earning the award for real (via
-- _award_unlock) turns the placeholder into a real award, dated then.
--
-- Readers of user_achievements (all updated below): _award_unlock,
-- _award_revision, award_achievement_xp, my_awards, study_board.
-- admin_cleanup_user_data only deletes. Client: useAchievementChecker.

begin;

alter table public.user_achievements
  add column if not exists earned boolean not null default true;

comment on column public.user_achievements.earned is
  'false = placeholder written by an old app build for a server-only award, kept so that build stops re-unlocking it. Not an award: no XP, not counted, shown locked.';

create or replace function public._award_guard_client()
returns trigger language plpgsql set search_path = public as $$
begin
  if current_user in ('authenticated', 'anon') then
    -- Clients decide nothing about "earned": server awards are placeholders,
    -- app awards are real.
    new.earned := not exists (
      select 1 from public.study_awards where id = new.achievement_id and how = 'server'
    );
  end if;
  return new;
end;
$$;

create or replace function public._award_unlock(p_user uuid, p_id text)
returns boolean language plpgsql security definer set search_path = public as $$
declare
  a public.study_awards;
  v_new boolean;
begin
  select * into a from public.study_awards where id = p_id;
  if not found or p_user is null then return false; end if;
  insert into public.user_achievements (user_id, achievement_id, earned)
  values (p_user, p_id, true)
  on conflict (user_id, achievement_id) do update
    set earned = true, unlocked_at = now()
    where not public.user_achievements.earned;
  v_new := found;
  if a.xp > 0 then
    insert into public.learning_activity_log
      (user_id, activity_type, source_id, source_title, xp_earned, duration_minutes, metadata, counted_as_ojt, award_key)
    values (p_user, 'achievement', p_id, a.title, a.xp, 0,
            jsonb_build_object('award', p_id, 'rarity', a.rarity, 'by', 'server'), false, 'achievement:' || p_id)
    on conflict do nothing;
  end if;
  return v_new;
end;
$$;
revoke all on function public._award_unlock(uuid, text) from public, anon, authenticated;

CREATE OR REPLACE FUNCTION public._award_revision(p_user uuid, p_live boolean)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_right int; v_mastered int; v_due int;
begin
  if p_user is null then return; end if;
  select count(*) filter (where step >= 1 or mastered_at is not null),
         count(*) filter (where mastered_at is not null)
    into v_right, v_mastered
  from public.mock_revision_state where user_id = p_user;
  if v_right >= 1 then perform public._award_unlock(p_user, 'rev-first'); end if;
  if v_mastered >= 25 then perform public._award_unlock(p_user, 'rev-25'); end if;
  if p_live and v_right >= 5 and auth.uid() = p_user
     and not exists (select 1 from public.user_achievements where user_id = p_user and achievement_id = 'rev-clear' and earned) then
    begin
      select due into v_due from public.mock_revision_pile_count() as c(due, later);
      if v_due = 0 then perform public._award_unlock(p_user, 'rev-clear'); end if;
    exception when others then null;
    end;
  end if;
end;
$function$;

CREATE OR REPLACE FUNCTION public.award_achievement_xp(p_achievement_id text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_user uuid := auth.uid();
  a public.study_awards;
  v_key text := 'achievement:' || p_achievement_id;
begin
  if v_user is null then raise exception 'not authenticated'; end if;
  perform pg_advisory_xact_lock(hashtext('xp:' || v_user::text));
  select * into a from public.study_awards where id = p_achievement_id;
  if not found or a.how <> 'app' or a.xp = 0 or not exists (
    select 1 from public.user_achievements where user_id = v_user and achievement_id = p_achievement_id and earned
  ) then
    return jsonb_build_object('xp', 0, 'awarded', false, 'reason', 'not_unlocked');
  end if;
  if exists (select 1 from public.learning_activity_log where user_id = v_user and award_key = v_key) then
    return jsonb_build_object('xp', 0, 'awarded', false, 'reason', 'already_awarded');
  end if;
  insert into public.learning_activity_log
    (user_id, activity_type, source_id, source_title, xp_earned, duration_minutes, metadata, counted_as_ojt, award_key)
  values (v_user, 'achievement', p_achievement_id, a.title, a.xp, 0,
          jsonb_build_object('award', p_achievement_id, 'rarity', a.rarity, 'by', 'app'), true, v_key);
  return jsonb_build_object('xp', a.xp, 'awarded', true);
end;
$function$;

CREATE OR REPLACE FUNCTION public.my_awards()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_user uuid := auth.uid();
  m jsonb;
  v_learners int;
begin
  if v_user is null then return '[]'::jsonb; end if;
  -- "Learners" = anyone who has earned study XP; the share of them with each award.
  select count(distinct user_id) into v_learners from public.learning_activity_log
  where xp_earned > 0 and voided_at is null and activity_type <> 'achievement';

  select jsonb_build_object(
    'cards',     coalesce((select greatest(total_cards_reviewed, 0) from public.user_study_streaks where user_id = v_user), 0),
    'quizzes',   (select count(*) from public.quiz_results where user_id = v_user),
    'streak',    coalesce((select greatest(current_streak, longest_streak) from public.user_study_streaks where user_id = v_user), 0),
    'ojt',       coalesce((select sum(duration) from public.time_entries where user_id = v_user), 0) / 60,
    'portfolio', (select count(*) from public.portfolio_items where user_id = v_user),
    'diary',     (select count(*) from public.site_diary_entries where user_id = v_user),
    'level',     coalesce((select level from public.user_xp_summary where user_id = v_user), 1),
    'xp',        coalesce((select total_xp from public.user_xp_summary where user_id = v_user), 0),
    'sections',  (select count(distinct section_key) from public.course_progress where user_id = v_user and completed),
    'mocks',     (select count(*) from public.seo_mock_attempts where user_id = v_user and total_questions >= 5),
    'papers',    (select count(distinct coalesce(exam_slug, exam_name)) from public.seo_mock_attempts where user_id = v_user and passed and total_questions >= 5),
    'mastered',  (select count(*) from public.mock_revision_state where user_id = v_user and mastered_at is not null),
    'plans',     (select count(*) from public.study_week_plans where user_id = v_user and completed_at is not null),
    'days',      (select count(distinct public.xp_london_day(created_at)) from public.learning_activity_log
                  where user_id = v_user and voided_at is null and xp_earned > 0 and activity_type <> 'achievement'),
    'month_days',(select count(distinct public.xp_london_day(created_at)) from public.learning_activity_log
                  where user_id = v_user and voided_at is null and xp_earned > 0 and activity_type <> 'achievement'
                    and created_at >= public.xp_period_start('month'))
  ) into m;

  return (
    with goals(id, metric, target) as (values
      ('first-flip','cards',1),('card-century','cards',100),('card-500','cards',500),
      ('first-quiz','quizzes',1),('quiz-10','quizzes',10),('quiz-50','quizzes',50),
      ('streak-3','streak',3),('streak-7','streak',7),('streak-14','streak',14),('streak-30','streak',30),('streak-100','streak',100),
      ('first-hour','ojt',1),('ojt-50','ojt',50),('ojt-100','ojt',100),('ojt-400','ojt',400),
      ('first-evidence','portfolio',1),('portfolio-10','portfolio',10),
      ('first-reflection','diary',1),('diary-10','diary',10),('diary-30','diary',30),
      ('level-5','level',5),('level-10','level',10),('xp-1000','xp',1000),('xp-10000','xp',10000),
      ('section-first','sections',1),('section-10','sections',10),('section-25','sections',25),('section-100','sections',100),('section-250','sections',250),
      ('mock-first','mocks',1),('mock-10','mocks',10),('mock-25','mocks',25),('mock-pass','papers',1),('mock-5-papers','papers',5),
      ('rev-25','mastered',25),('plan-1','plans',1),('plan-10','plans',10),
      ('days-50','days',50),('days-100','days',100),('days-250','days',250),('days-20m','month_days',20)
    ), learners as (
      select distinct user_id from public.learning_activity_log
      where xp_earned > 0 and voided_at is null and activity_type <> 'achievement'
    ), counts as (
      -- Holders among the same learners as the denominator.
      select ua.achievement_id, count(*) as n
      from public.user_achievements ua join learners l on l.user_id = ua.user_id
      where ua.earned
      group by 1
    )
    select coalesce(jsonb_agg(jsonb_build_object(
      'id', a.id, 'title', a.title, 'description', a.description, 'category', a.category,
      'rarity', a.rarity, 'xp', a.xp, 'how', a.how,
      'unlocked_at', ua.unlocked_at,
      'current', case when g.metric is not null then least((m ->> g.metric)::int, g.target) end,
      'target', g.target,
      'share', case when v_learners > 0 then round(100.0 * coalesce(c.n, 0) / v_learners, 1) else 0 end
    ) order by a.sort), '[]'::jsonb)
    from public.study_awards a
    left join public.user_achievements ua on ua.user_id = v_user and ua.achievement_id = a.id and ua.earned
    left join goals g on g.id = a.id
    left join counts c on c.achievement_id = a.id
  );
end;
$function$;

CREATE OR REPLACE FUNCTION public.study_board(time_filter text, league text DEFAULT 'all'::text)
 RETURNS TABLE(uid uuid, display_name text, avatar text, board_xp integer, streak integer, quizzes bigint, quiz_avg numeric, award_count bigint, pos bigint)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
    from public.user_achievements a2, c where a2.earned and a2.unlocked_at >= c.d group by a2.user_id
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

-- Backfill: everyone an old build would loop on gets the placeholder now, so
-- they don't see one last false toast (204 Speed Demon, 1 Goal Getter on
-- 10 Oct; the other server awards matched the old client's rules).
insert into public.user_achievements (user_id, achievement_id, earned)
select c.user_id, c.a, false from (
  select user_id, 'speed-demon' as a from public.quiz_results
  group by user_id having min(time_spent / 60000.0) <= 5
  union all
  select user_id, 'daily-goal-7' from public.user_study_streaks where current_streak >= 7
) c
where not exists (
  select 1 from public.user_achievements h where h.user_id = c.user_id and h.achievement_id = c.a
)
on conflict (user_id, achievement_id) do nothing;

commit;
