-- Study awards, done properly (10 Oct 2026). Andrew: "any more awards we can
-- give people?" … "make sure they're all excellent and add more that's really good".
--
-- 1. study_awards — ONE catalogue for every award: name, what it is for, XP,
--    rarity, and who unlocks it ('app' = the app's checker, as before;
--    'server' = this database, from data it already records). The XP the
--    server pays now comes from here, not a hard-coded CASE.
--
-- 2. 28 new SERVER awards, unlocked by triggers, never by the app:
--      mock exams   seo_mock_attempts (after insert)
--      revision     mock_revision_state (after insert/update)
--      week plan    study_week_plans (completed_at set)
--      habits       learning_activity_log (first study row of a London day),
--                   user_study_streaks (a freeze used)
--      the board    study_month_awards(), cron on the 1st for the month just gone
--    Each pays its XP once through the ledger (award_key 'achievement:<id>'),
--    like every award. Awards count to level and all time, never to the
--    week/month boards or the daily caps (unchanged ledger rules).
--
-- 3. Closes a hole: user_achievements is client-insertable, so a client could
--    insert a server award and ask award_achievement_xp to pay it. Client
--    inserts of server awards are now dropped, and award_achievement_xp
--    refuses server awards.
--
-- 4. Goal Getter (daily-goal-7) moves to the server: the app used the streak
--    as a stand-in for "hit your daily goal 7 days running"; the server checks
--    the real daily totals.
--
-- 5. my_awards() — every award with whether you have it, your progress towards
--    it, and what share of learners have it, for the Awards section.
--
-- Backfill: _award_sweep(user) evaluates the whole history; run once for
-- everyone at the end. Board awards start with October 2026 (the first month
-- the board was competition-safe); nothing is awarded for earlier months.

-- ── 1. Catalogue ────────────────────────────────────────────────────────────
create table if not exists public.study_awards (
  id text primary key,
  title text not null,
  description text not null,
  category text not null,
  rarity text not null check (rarity in ('common','uncommon','rare','epic','legendary')),
  xp integer not null check (xp >= 0),
  how text not null check (how in ('app','server')),
  sort integer not null default 0
);
comment on table public.study_awards is
  '[STUDY] Award catalogue: title, description, XP, rarity, who unlocks it. Scope: everyone. Used by: award_achievement_xp, _award_unlock, my_awards, Study Centre awards. Rule: XP for an award comes only from here; server awards are never unlocked by the app.';
alter table public.study_awards enable row level security;
drop policy if exists study_awards_read on public.study_awards;
create policy study_awards_read on public.study_awards for select to authenticated using (true);

insert into public.study_awards (id, title, description, category, rarity, xp, how, sort) values
  -- Existing app-checked awards (XP unchanged).
  ('first-flip','First Flip','Review your first flashcard','flashcards','common',10,'app',100),
  ('card-century','Century','Review 100 flashcards','flashcards','uncommon',30,'app',101),
  ('card-500','Card Shark','Review 500 flashcards','flashcards','rare',75,'app',102),
  ('set-master','Set Master','Master every card in a set','flashcards','rare',50,'app',103),
  ('all-sets','Complete Collection','Master every flashcard set','flashcards','legendary',200,'app',104),
  ('first-quiz','Quiz Starter','Complete your first quiz','quizzes','common',10,'app',110),
  ('quiz-10','Quiz Regular','Complete 10 quizzes','quizzes','uncommon',30,'app',111),
  ('quiz-50','Quiz Veteran','Complete 50 quizzes','quizzes','rare',100,'app',112),
  ('perfect-score','Perfect Score','Score 100% on a quiz','quizzes','uncommon',50,'app',113),
  ('speed-demon','Speed Demon','Score 80% or more on a quiz in under 5 minutes','quizzes','uncommon',25,'app',114),
  ('all-categories','Well Rounded','Score 70% or more in every quiz category','quizzes','epic',100,'app',115),
  ('streak-3','Getting Started','3-day study streak','habits','common',15,'app',200),
  ('streak-7','Weekly Warrior','7-day study streak','habits','uncommon',30,'app',201),
  ('streak-14','Fortnight Fighter','14-day study streak','habits','rare',50,'app',202),
  ('streak-30','Monthly Master','30-day study streak','habits','epic',100,'app',203),
  ('streak-100','Centurion','100-day study streak','habits','legendary',250,'app',204),
  ('first-hour','Clocked In','Log your first off-the-job hour','work','common',10,'app',300),
  ('ojt-50','Getting Experienced','Log 50 off-the-job hours','work','uncommon',30,'app',301),
  ('ojt-100','Century Hours','Log 100 off-the-job hours','work','rare',50,'app',302),
  ('ojt-400','Year Target','Log 400 off-the-job hours','work','legendary',150,'app',303),
  ('first-evidence','Evidence Builder','Add your first portfolio evidence','work','common',15,'app',310),
  ('portfolio-10','Portfolio Pro','Add 10 pieces of portfolio evidence','work','uncommon',40,'app',311),
  ('portfolio-complete','Portfolio Champion','Evidence in every portfolio category','work','legendary',200,'app',312),
  ('first-reflection','Reflective Practitioner','Write your first site diary entry','work','common',10,'app',320),
  ('diary-10','Diary Regular','Write 10 site diary entries','work','uncommon',30,'app',321),
  ('diary-30','Diary Devotee','Write 30 site diary entries','work','rare',75,'app',322),
  ('level-5','Skilled Up','Reach level 5','xp','uncommon',50,'app',400),
  ('level-10','Trade Ready','Reach level 10','xp','legendary',500,'app',401),
  ('xp-1000','First Thousand','Earn 1,000 XP','xp','common',25,'app',402),
  ('xp-10000','XP Legend','Earn 10,000 XP','xp','epic',100,'app',403),
  ('epa-mock','EPA Ready','Complete an EPA mock','work','uncommon',30,'app',330),
  ('epa-distinction','Distinction Material','Get a distinction on an EPA mock','work','epic',100,'app',331),
  ('section-first','Off the Mark','Complete your first course section','courses','common',25,'app',500),
  ('section-10','Getting Stuck In','Complete 10 course sections','courses','uncommon',50,'app',501),
  ('section-25','Serious Study','Complete 25 course sections','courses','rare',100,'app',502),
  ('section-100','Century of Sections','Complete 100 course sections','courses','epic',250,'app',503),
  ('section-250','Scholar of the Trade','Complete 250 course sections','courses','legendary',500,'app',504),
  -- Moved to the server (real daily totals, not the streak).
  ('daily-goal-7','Goal Getter','Hit your daily XP goal 7 days running','habits','rare',50,'server',210),
  -- Mock exams.
  ('mock-first','First Paper','Finish your first mock exam','mocks','common',15,'server',600),
  ('mock-pass','Pass Mark','Pass a mock exam','mocks','common',30,'server',601),
  ('mock-pb','Personal Best','Beat your best score on a paper by 15 points','mocks','uncommon',30,'server',602),
  ('mock-bounce','Bounced Back','Pass a paper you had failed before','mocks','uncommon',50,'server',603),
  ('mock-10','Exam Hardened','Sit 10 mock exams','mocks','uncommon',40,'server',604),
  ('mock-90','Top Marks','Score 90% or more on a mock exam','mocks','rare',50,'server',605),
  ('mock-full','The Real Thing','Pass a full-length paper of 60 questions or more','mocks','rare',75,'server',606),
  ('mock-5-papers','Five Papers Passed','Pass 5 different mock papers','mocks','rare',75,'server',607),
  ('mock-turnround','Turned It Round','Take a topic from under 50% to 80% or more','mocks','rare',75,'server',608),
  ('mock-25','Mock Machine','Sit 25 mock exams','mocks','rare',100,'server',609),
  ('mock-100','Flawless','Score 100% on a mock of 20 questions or more','mocks','epic',150,'server',610),
  -- Revising wrong answers.
  ('rev-first','Put It Right','Get a wrong answer right on revision','revision','common',10,'server',700),
  ('rev-clear','Clean Slate','Clear every wrong answer that was due','revision','uncommon',40,'server',701),
  ('rev-25','Nailed On','Master 25 questions you had got wrong','revision','rare',60,'server',702),
  -- The weekly plan.
  ('plan-1','Plan Done','Finish a weekly plan','habits','common',25,'server',220),
  ('plan-3','Three in a Row','Finish three weekly plans in a row','habits','rare',75,'server',221),
  ('plan-10','Ten Good Weeks','Finish 10 weekly plans','habits','epic',150,'server',222),
  -- Study habits.
  ('early','Early Start','Study before 7am','habits','common',15,'server',230),
  ('weekend','Weekend Warrior','Study on a Saturday and the Sunday after','habits','common',20,'server',231),
  ('comeback','Welcome Back','Come back to study after two weeks or more away','habits','common',20,'server',232),
  ('freeze','Saved by the Freeze','A streak freeze kept your streak alive','habits','common',15,'server',233),
  ('days-50','Fifty Days','Study on 50 different days','habits','uncommon',50,'server',234),
  ('days-20m','Twenty Days','Study on 20 days in one month','habits','rare',75,'server',235),
  ('days-100','Hundred Days','Study on 100 different days','habits','rare',100,'server',236),
  ('days-250','Two Hundred and Fifty Days','Study on 250 different days','habits','legendary',250,'server',237),
  -- The monthly board (awarded on the 1st, for the month just gone).
  ('board-top10','Top Ten','Finish a month in the top 10 of the leaderboard','board','epic',100,'server',800),
  ('board-top3','Podium','Finish a month in the top 3 of the leaderboard','board','epic',150,'server',801),
  ('board-champ','Champion','Finish a month first on the leaderboard','board','legendary',250,'server',802)
on conflict (id) do update set
  title = excluded.title, description = excluded.description, category = excluded.category,
  rarity = excluded.rarity, xp = excluded.xp, how = excluded.how, sort = excluded.sort;

-- The XP for an award now comes from the catalogue.
create or replace function public._xp_achievement_bonus(p_id text)
returns integer language sql stable set search_path = public as $$
  select coalesce((select xp from public.study_awards where id = p_id), 0);
$$;

-- ── 2. Unlock (server) ──────────────────────────────────────────────────────
-- Records the award and pays its XP once. True when newly unlocked.
create or replace function public._award_unlock(p_user uuid, p_id text)
returns boolean language plpgsql security definer set search_path = public as $$
declare
  a public.study_awards;
  v_new boolean;
begin
  select * into a from public.study_awards where id = p_id;
  if not found or p_user is null then return false; end if;
  insert into public.user_achievements (user_id, achievement_id)
  values (p_user, p_id) on conflict (user_id, achievement_id) do nothing;
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

-- Mock exams, over the whole history (cheap: a learner's own attempts).
create or replace function public._award_mocks(p_user uuid)
returns void language plpgsql security definer set search_path = public as $$
declare
  v_sat int; v_passed_papers int;
begin
  if p_user is null then return; end if;
  create temporary table if not exists _am (slug text, pct int, passed boolean, n int, sat_at timestamptz, ts jsonb) on commit drop;
  truncate _am;
  insert into _am
    select coalesce(exam_slug, exam_name, id::text), percentage, coalesce(passed, false),
           total_questions, created_at, topic_stats
    from public.seo_mock_attempts
    where user_id = p_user and total_questions >= 5;

  select count(*), count(distinct slug) filter (where passed) into v_sat, v_passed_papers from _am;
  if v_sat = 0 then return; end if;

  perform public._award_unlock(p_user, 'mock-first');
  if v_sat >= 10 then perform public._award_unlock(p_user, 'mock-10'); end if;
  if v_sat >= 25 then perform public._award_unlock(p_user, 'mock-25'); end if;
  if v_passed_papers >= 1 then perform public._award_unlock(p_user, 'mock-pass'); end if;
  if v_passed_papers >= 5 then perform public._award_unlock(p_user, 'mock-5-papers'); end if;
  if exists (select 1 from _am where pct >= 90) then perform public._award_unlock(p_user, 'mock-90'); end if;
  if exists (select 1 from _am where pct >= 100 and n >= 20) then perform public._award_unlock(p_user, 'mock-100'); end if;
  if exists (select 1 from _am where passed and n >= 60) then perform public._award_unlock(p_user, 'mock-full'); end if;
  if exists (
    select 1 from _am b where b.passed
      and exists (select 1 from _am a where a.slug = b.slug and a.sat_at < b.sat_at and not a.passed)
  ) then perform public._award_unlock(p_user, 'mock-bounce'); end if;
  if exists (
    select 1 from _am b
    where b.pct >= 15 + (select max(a.pct) from _am a where a.slug = b.slug and a.sat_at < b.sat_at)
  ) then perform public._award_unlock(p_user, 'mock-pb'); end if;
  -- A topic answered at least 3 times in a sitting: under 50% once, 80%+ later.
  if exists (
    with t as (
      select m.sat_at, e.key as topic, (e.value ->> 'a')::numeric as a, (e.value ->> 'r')::numeric as r
      from _am m, jsonb_each(case when jsonb_typeof(m.ts) = 'object' then m.ts else '{}'::jsonb end) e
      where jsonb_typeof(e.value) = 'object' and (e.value ->> 'a') ~ '^\d+$' and (e.value ->> 'r') ~ '^\d+$'
    )
    select 1 from t lo join t hi on hi.topic = lo.topic and hi.sat_at > lo.sat_at
    where lo.a >= 3 and lo.r / lo.a < 0.5 and hi.a >= 3 and hi.r / hi.a >= 0.8
  ) then perform public._award_unlock(p_user, 'mock-turnround'); end if;
end;
$$;
revoke all on function public._award_mocks(uuid) from public, anon, authenticated;

create or replace function public._award_on_mock()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform public._award_mocks(new.user_id);
  return null;
end;
$$;
drop trigger if exists trg_award_on_mock on public.seo_mock_attempts;
create trigger trg_award_on_mock after insert on public.seo_mock_attempts
  for each row when (new.user_id is not null) execute function public._award_on_mock();

-- Revision. Clean Slate needs the live pile (auth.uid()), so it is only
-- checked when the learner themselves answers.
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
  if p_live and v_right >= 5 and auth.uid() = p_user then
    begin
      select due into v_due from public.mock_revision_pile_count() as c(due, later);
      if v_due = 0 then perform public._award_unlock(p_user, 'rev-clear'); end if;
    exception when others then null;  -- never fail an answer over an award
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
end;
$$;
drop trigger if exists trg_award_on_revision on public.mock_revision_state;
create trigger trg_award_on_revision after insert or update on public.mock_revision_state
  for each row execute function public._award_on_revision();

-- The weekly plan.
create or replace function public._award_plans(p_user uuid)
returns void language plpgsql security definer set search_path = public as $$
declare v_done int;
begin
  if p_user is null then return; end if;
  select count(*) into v_done from public.study_week_plans where user_id = p_user and completed_at is not null;
  if v_done >= 1 then perform public._award_unlock(p_user, 'plan-1'); end if;
  if v_done >= 10 then perform public._award_unlock(p_user, 'plan-10'); end if;
  if exists (
    select 1 from public.study_week_plans w
    where w.user_id = p_user and w.completed_at is not null
      and exists (select 1 from public.study_week_plans x where x.user_id = p_user and x.week_start = w.week_start - 7 and x.completed_at is not null)
      and exists (select 1 from public.study_week_plans x where x.user_id = p_user and x.week_start = w.week_start - 14 and x.completed_at is not null)
  ) then perform public._award_unlock(p_user, 'plan-3'); end if;
end;
$$;
revoke all on function public._award_plans(uuid) from public, anon, authenticated;

create or replace function public._award_on_plan()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform public._award_plans(new.user_id);
  return null;
end;
$$;
drop trigger if exists trg_award_on_plan on public.study_week_plans;
create trigger trg_award_on_plan after insert or update of completed_at on public.study_week_plans
  for each row when (new.completed_at is not null) execute function public._award_on_plan();

-- Study habits, from the ledger's study days (UK days, XP-earning rows,
-- awards themselves excluded).
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
  -- Goal Getter: 7 consecutive UK days, each at or over the daily goal.
  select coalesce(daily_goal, 100) into v_goal from public.user_xp_summary where user_id = p_user;
  v_goal := coalesce(v_goal, 100);
  if exists (
    select 1 from (
      select d - (row_number() over (order by d))::int as grp from _ad where xp >= v_goal
    ) r group by grp having count(*) >= 7
  ) then perform public._award_unlock(p_user, 'daily-goal-7'); end if;
end;
$$;
revoke all on function public._award_days(uuid) from public, anon, authenticated;

-- Runs once per learner per UK day: on their first XP row of the day, and on
-- the row that takes them over their daily goal (for Goal Getter).
create or replace function public._award_on_ledger()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_day date := public.xp_london_day(new.created_at);
  v_before int;
  v_goal int;
begin
  select coalesce(sum(xp_earned), 0) into v_before
  from public.learning_activity_log
  where user_id = new.user_id and id <> new.id and voided_at is null and xp_earned > 0
    and activity_type <> 'achievement' and public.xp_london_day(created_at) = v_day;
  select coalesce(daily_goal, 100) into v_goal from public.user_xp_summary where user_id = new.user_id;
  v_goal := coalesce(v_goal, 100);
  if v_before = 0 or (v_before < v_goal and v_before + new.xp_earned >= v_goal) then
    perform public._award_days(new.user_id);
  end if;
  return null;
exception when others then
  return null;  -- never fail an XP row over an award
end;
$$;
drop trigger if exists trg_award_on_ledger on public.learning_activity_log;
create trigger trg_award_on_ledger after insert on public.learning_activity_log
  for each row when (new.voided_at is null and new.xp_earned > 0 and new.activity_type <> 'achievement')
  execute function public._award_on_ledger();

-- A streak freeze used and the streak still alive.
create or replace function public._award_on_streak()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if coalesce(array_length(new.frozen_days, 1), 0) > 0 and new.current_streak > 0 then
    perform public._award_unlock(new.user_id, 'freeze');
  end if;
  return null;
end;
$$;
drop trigger if exists trg_award_on_streak on public.user_study_streaks;
create trigger trg_award_on_streak after insert or update of frozen_days, current_streak on public.user_study_streaks
  for each row execute function public._award_on_streak();

-- The board: top 10 / top 3 / first for a calendar month (UK time), the same
-- people and ties as study_board (league 'all'). October 2026 onwards only.
create or replace function public.study_month_awards(p_month date)
returns integer language plpgsql security definer set search_path = public as $$
declare
  v_from timestamptz := (date_trunc('month', p_month)::timestamp) at time zone 'Europe/London';
  v_to timestamptz := ((date_trunc('month', p_month) + interval '1 month')::timestamp) at time zone 'Europe/London';
  r record;
  v_n int := 0;
begin
  if date_trunc('month', p_month) < date '2026-10-01' then return 0; end if;
  if v_to > now() then return 0; end if;  -- only a month that has finished
  for r in
    with people as (
      select p.id from public.profiles p
      where p.leaderboard_visible = true and p.full_name is not null
        and p.leaderboard_excluded = false and p.admin_role is null
        and public.xp_in_league(p.role, 'all')
    ), agg as (
      select l.user_id, sum(l.xp_earned)::int as xp, max(l.created_at) as last_at
      from public.learning_activity_log l join people on people.id = l.user_id
      where l.voided_at is null and l.xp_earned > 0 and l.activity_type <> 'achievement'
        and l.created_at >= v_from and l.created_at < v_to
      group by l.user_id
    )
    select user_id, row_number() over (order by xp desc, last_at asc, user_id) as pos from agg where xp > 0
  loop
    exit when r.pos > 10;
    perform public._award_unlock(r.user_id, 'board-top10');
    if r.pos <= 3 then perform public._award_unlock(r.user_id, 'board-top3'); end if;
    if r.pos = 1 then perform public._award_unlock(r.user_id, 'board-champ'); end if;
    v_n := v_n + 1;
  end loop;
  return v_n;
end;
$$;
revoke all on function public.study_month_awards(date) from public, anon, authenticated;

-- ── 3. Close the client hole ───────────────────────────────────────────────
-- A client insert of a server award is dropped silently (old app builds keep working).
create or replace function public._award_guard_client()
returns trigger language plpgsql set search_path = public as $$
begin
  if current_user in ('authenticated', 'anon')
     and exists (select 1 from public.study_awards where id = new.achievement_id and how = 'server') then
    return null;
  end if;
  return new;
end;
$$;
drop trigger if exists trg_award_guard_client on public.user_achievements;
create trigger trg_award_guard_client before insert on public.user_achievements
  for each row execute function public._award_guard_client();

create or replace function public.award_achievement_xp(p_achievement_id text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_user uuid := auth.uid();
  a public.study_awards;
  v_key text := 'achievement:' || p_achievement_id;
begin
  if v_user is null then raise exception 'not authenticated'; end if;
  perform pg_advisory_xact_lock(hashtext('xp:' || v_user::text));
  select * into a from public.study_awards where id = p_achievement_id;
  if not found or a.how <> 'app' or a.xp = 0 or not exists (
    select 1 from public.user_achievements where user_id = v_user and achievement_id = p_achievement_id
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
$$;

-- ── 4. One sweep per learner (backfill, and a safety net) ──────────────────
create or replace function public._award_sweep(p_user uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  perform public._award_mocks(p_user);
  perform public._award_revision(p_user, false);
  perform public._award_plans(p_user);
  perform public._award_days(p_user);
  if exists (select 1 from public.user_study_streaks where user_id = p_user
             and coalesce(array_length(frozen_days, 1), 0) > 0 and current_streak > 0) then
    perform public._award_unlock(p_user, 'freeze');
  end if;
end;
$$;
revoke all on function public._award_sweep(uuid) from public, anon, authenticated;

-- ── 5. my_awards(): everything the Awards section shows ───────────────────
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
    ), counts as (
      select achievement_id, count(*) as n from public.user_achievements group by 1
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

-- ── Month-end board awards: 00:30 UTC on the 1st (already the new month in UK time).
-- select cron.schedule('study-month-awards', '30 0 1 * *',
--   $c$select public.study_month_awards(((now() at time zone 'Europe/London') - interval '1 month')::date)$c$);
-- (Scheduled by the apply step below, not on every migration replay.)
