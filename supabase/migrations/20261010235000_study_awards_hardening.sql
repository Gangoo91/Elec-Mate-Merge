-- Awards hardening (10 Oct 2026), from an independent review of the awards
-- build. Each item below was checked against the live database first.
--
-- 1. Revision progress was writable by the app: mock_revision_state's policy
--    allowed ALL for your own rows and mock_revision_answer ran as the caller.
--    25 fake "mastered" rows would have paid Put It Right + Nailed On. The
--    function now runs as definer and the table is read-only to the app
--    (nothing in the app writes it directly; checked).
-- 2. Mock awards trusted the client's percentage/passed. They now use
--    score / total_questions, need a believable row (score within range), and
--    paper-specific awards only count papers someone else has also sat, so an
--    invented paper name can't farm Five Papers Passed, Top Marks and the rest.
-- 3. A failing award could fail the learner's own write (a mock attempt,
--    a revision answer). Every award trigger now swallows its own errors.
-- 4. Wasted work: the streak/freeze triggers fired on every ledger change
--    (_streak_store rewrites the row); they now fire only when a value moves.
--    Clean Slate stops checking the revision pile once it is held.
-- 5. my_awards' share counted every holder against learners with study XP,
--    so it could overstate (section-first 438 holders, 77 without study XP).
--    Both sides are now the same population.
-- 6. The two EPA awards move to the server (epa_mock_sessions), leaving four
--    with the app: set mastery x2, every quiz category, every portfolio category.

-- ── 1. Revision: server writes only ────────────────────────────────────────
alter function public.mock_revision_answer(text, boolean) security definer;
alter function public.mock_revision_answer(text, boolean) set search_path = public;
drop policy if exists "Own revision schedule" on public.mock_revision_state;
drop policy if exists mock_revision_state_read on public.mock_revision_state;
create policy mock_revision_state_read on public.mock_revision_state
  for select to authenticated using (user_id = (select auth.uid()));

-- ── 2. Mock awards on checked figures ─────────────────────────────────────
create or replace function public._award_mocks(p_user uuid)
returns void language plpgsql security definer set search_path = public as $$
declare
  v_sat int; v_passed_papers int;
begin
  if p_user is null then return; end if;
  create temporary table if not exists _am (slug text, pct int, passed boolean, n int, sat_at timestamptz, ts jsonb, known boolean) on commit drop;
  truncate _am;
  insert into _am
    select coalesce(a.exam_slug, a.exam_name, a.id::text) as slug,
           round(100.0 * a.score / a.total_questions)::int as pct,
           -- The app's pass flag AND a score that actually clears the mark.
           coalesce(a.passed, false)
             and round(100.0 * a.score / a.total_questions) >= coalesce(a.pass_mark, 50) as passed,
           a.total_questions, a.created_at, a.topic_stats,
           exists (select 1 from public.seo_mock_attempts o
                   where o.exam_slug = a.exam_slug and o.user_id is not null and o.user_id <> a.user_id) as known
    from public.seo_mock_attempts a
    where a.user_id = p_user and a.total_questions >= 5
      and a.score between 0 and a.total_questions;

  select count(*), count(distinct slug) filter (where passed and known) into v_sat, v_passed_papers from _am;
  if v_sat = 0 then return; end if;

  perform public._award_unlock(p_user, 'mock-first');
  if v_sat >= 10 then perform public._award_unlock(p_user, 'mock-10'); end if;
  if v_sat >= 25 then perform public._award_unlock(p_user, 'mock-25'); end if;
  if exists (select 1 from _am where passed and known) then perform public._award_unlock(p_user, 'mock-pass'); end if;
  if v_passed_papers >= 5 then perform public._award_unlock(p_user, 'mock-5-papers'); end if;
  if exists (select 1 from _am where known and pct >= 90) then perform public._award_unlock(p_user, 'mock-90'); end if;
  if exists (select 1 from _am where known and pct >= 100 and n >= 20) then perform public._award_unlock(p_user, 'mock-100'); end if;
  if exists (select 1 from _am where known and passed and n >= 60) then perform public._award_unlock(p_user, 'mock-full'); end if;
  if exists (
    select 1 from _am b where b.known and b.passed
      and exists (select 1 from _am a where a.slug = b.slug and a.sat_at < b.sat_at and not a.passed)
  ) then perform public._award_unlock(p_user, 'mock-bounce'); end if;
  if exists (
    select 1 from _am b
    where b.known and b.pct >= 15 + (select max(a.pct) from _am a where a.slug = b.slug and a.sat_at < b.sat_at)
  ) then perform public._award_unlock(p_user, 'mock-pb'); end if;
  if exists (
    with t as (
      select m.sat_at, e.key as topic, (e.value ->> 'a')::numeric as a, (e.value ->> 'r')::numeric as r
      from _am m, jsonb_each(case when jsonb_typeof(m.ts) = 'object' then m.ts else '{}'::jsonb end) e
      where m.known and jsonb_typeof(e.value) = 'object' and (e.value ->> 'a') ~ '^\d+$' and (e.value ->> 'r') ~ '^\d+$'
    )
    select 1 from t lo join t hi on hi.topic = lo.topic and hi.sat_at > lo.sat_at
    where lo.a >= 3 and lo.r <= lo.a and lo.r / lo.a < 0.5 and hi.a >= 3 and hi.r <= hi.a and hi.r / hi.a >= 0.8
  ) then perform public._award_unlock(p_user, 'mock-turnround'); end if;
end;
$$;
revoke all on function public._award_mocks(uuid) from public, anon, authenticated;

-- ── 3 + 4. Triggers that never fail the learner's write, and fire less ────
create or replace function public._award_on_mock()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform public._award_mocks(new.user_id);
  return null;
exception when others then
  return null;
end;
$$;

create or replace function public._award_revision(p_user uuid, p_live boolean)
returns void language plpgsql security definer set search_path = public as $$
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
     and not exists (select 1 from public.user_achievements where user_id = p_user and achievement_id = 'rev-clear') then
    begin
      select due into v_due from public.mock_revision_pile_count() as c(due, later);
      if v_due = 0 then perform public._award_unlock(p_user, 'rev-clear'); end if;
    exception when others then null;
    end;
  end if;
end;
$$;
revoke all on function public._award_revision(uuid, boolean) from public, anon, authenticated;

create or replace function public._award_on_revision()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.step >= 1 or new.mastered_at is not null then
    perform public._award_revision(new.user_id, true);
  end if;
  return null;
exception when others then
  return null;
end;
$$;

create or replace function public._award_on_plan()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform public._award_plans(new.user_id);
  return null;
exception when others then
  return null;
end;
$$;

create or replace function public._award_on_streak()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if coalesce(array_length(new.frozen_days, 1), 0) > 0 and new.current_streak > 0 then
    perform public._award_unlock(new.user_id, 'freeze');
  end if;
  return null;
exception when others then
  return null;
end;
$$;

-- Streak-row triggers only when the value actually moves.
drop trigger if exists trg_award_on_streak on public.user_study_streaks;
create trigger trg_award_on_streak after update of frozen_days on public.user_study_streaks
  for each row when (new.frozen_days is distinct from old.frozen_days and new.current_streak > 0)
  execute function public._award_on_streak();
drop trigger if exists trg_award_on_streak_new on public.user_study_streaks;
create trigger trg_award_on_streak_new after insert on public.user_study_streaks
  for each row execute function public._award_on_streak();

drop trigger if exists trg_award_count_streak on public.user_study_streaks;
create trigger trg_award_count_streak after update of current_streak, longest_streak on public.user_study_streaks
  for each row when (greatest(new.current_streak, new.longest_streak) > greatest(old.current_streak, old.longest_streak))
  execute function public._award_on_count('streak');
drop trigger if exists trg_award_count_cards on public.user_study_streaks;
create trigger trg_award_count_cards after update of total_cards_reviewed on public.user_study_streaks
  for each row when (new.total_cards_reviewed > old.total_cards_reviewed)
  execute function public._award_on_count('cards');
drop trigger if exists trg_award_count_streak_new on public.user_study_streaks;
create trigger trg_award_count_streak_new after insert on public.user_study_streaks
  for each row execute function public._award_on_count('all_streak_row');

-- 'all_streak_row' = both counts a streak row feeds.
create or replace function public._award_on_count()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_argv[0] = 'all_streak_row' then
    perform public._award_counts(new.user_id, 'streak');
    perform public._award_counts(new.user_id, 'cards');
  else
    perform public._award_counts(new.user_id, tg_argv[0]);
  end if;
  return null;
exception when others then
  return null;
end;
$$;

-- ── 6. EPA awards on the server ───────────────────────────────────────────
update public.study_awards set how = 'server' where id in ('epa-mock', 'epa-distinction');

create or replace function public._award_epa(p_user uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_user is null then return; end if;
  if exists (select 1 from public.epa_mock_sessions where user_id = p_user and status = 'completed') then
    perform public._award_unlock(p_user, 'epa-mock');
  end if;
  if exists (select 1 from public.epa_mock_sessions where user_id = p_user and status = 'completed'
             and predicted_grade ilike '%distinction%') then
    perform public._award_unlock(p_user, 'epa-distinction');
  end if;
end;
$$;
revoke all on function public._award_epa(uuid) from public, anon, authenticated;

create or replace function public._award_on_epa()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform public._award_epa(new.user_id);
  return null;
exception when others then
  return null;
end;
$$;
drop trigger if exists trg_award_on_epa on public.epa_mock_sessions;
create trigger trg_award_on_epa after insert or update of status, predicted_grade on public.epa_mock_sessions
  for each row when (new.status = 'completed' and new.user_id is not null)
  execute function public._award_on_epa();

create or replace function public._award_sweep(p_user uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  perform public._award_counts(p_user, 'all');
  perform public._award_mocks(p_user);
  perform public._award_revision(p_user, false);
  perform public._award_plans(p_user);
  perform public._award_days(p_user);
  perform public._award_epa(p_user);
  if exists (select 1 from public.user_study_streaks where user_id = p_user
             and coalesce(array_length(frozen_days, 1), 0) > 0 and current_streak > 0) then
    perform public._award_unlock(p_user, 'freeze');
  end if;
end;
$$;
revoke all on function public._award_sweep(uuid) from public, anon, authenticated;

-- ── 5. my_awards: share over one population ────────────────────────────
create or replace function public.my_awards()
returns jsonb language plpgsql stable security definer set search_path = public as $$
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
    left join public.user_achievements ua on ua.user_id = v_user and ua.achievement_id = a.id
    left join goals g on g.id = a.id
    left join counts c on c.achievement_id = a.id
  );
end;
$$;
revoke all on function public.my_awards() from public, anon;
grant execute on function public.my_awards() to authenticated;
