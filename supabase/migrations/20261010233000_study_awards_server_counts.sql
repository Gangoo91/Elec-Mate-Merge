-- Awards: the counted ones move to the server too (10 Oct 2026).
--
-- The app checked 37 awards itself, and only when the learner happened to open
-- a page that ran the checker. On 10 Oct, 272 awards had been earned and never
-- given: 109 first course sections, 39 "10 sections", 34 first OJT hours,
-- 24 Evidence Builders, 15 three-day streaks, 12 first quizzes…
--
-- 31 of them count things the database already holds, so the database now
-- unlocks them the moment the count is reached, on every app build:
--   flashcards  first-flip, card-century, card-500      user_study_streaks.total_cards_reviewed
--   quizzes     first-quiz, quiz-10, quiz-50,           quiz_results
--               perfect-score, speed-demon (80%+ in under 5 minutes)
--   streaks     streak-3 … streak-100                   user_study_streaks (server-owned)
--   OJT         first-hour, ojt-50, ojt-100, ojt-400    time_entries.duration (minutes)
--   portfolio   first-evidence, portfolio-10            portfolio_items
--   diary       first-reflection, diary-10, diary-30    site_diary_entries
--   XP          level-5, level-10, xp-1000, xp-10000    user_xp_summary
--   courses     section-first … section-250             course_progress (distinct completed sections)
-- Six stay with the app (set mastery, every quiz category, every portfolio
-- category, the two EPA ones): their rules need data only the app assembles.

update public.study_awards set how = 'server'
where id in (
  'first-flip','card-century','card-500',
  'first-quiz','quiz-10','quiz-50','perfect-score','speed-demon',
  'streak-3','streak-7','streak-14','streak-30','streak-100',
  'first-hour','ojt-50','ojt-100','ojt-400',
  'first-evidence','portfolio-10',
  'first-reflection','diary-10','diary-30',
  'level-5','level-10','xp-1000','xp-10000',
  'section-first','section-10','section-25','section-100','section-250'
);

-- One evaluator per source, so each trigger does only its own small count.
create or replace function public._award_counts(p_user uuid, p_area text)
returns void language plpgsql security definer set search_path = public as $$
declare
  n bigint;
  best int;
  r record;
begin
  if p_user is null then return; end if;

  if p_area in ('cards', 'all') then
    select coalesce(max(total_cards_reviewed), 0) into n from public.user_study_streaks where user_id = p_user;
    if n >= 1 then perform public._award_unlock(p_user, 'first-flip'); end if;
    if n >= 100 then perform public._award_unlock(p_user, 'card-century'); end if;
    if n >= 500 then perform public._award_unlock(p_user, 'card-500'); end if;
  end if;

  if p_area in ('streak', 'all') then
    select coalesce(max(greatest(current_streak, longest_streak)), 0) into n
    from public.user_study_streaks where user_id = p_user;
    if n >= 3 then perform public._award_unlock(p_user, 'streak-3'); end if;
    if n >= 7 then perform public._award_unlock(p_user, 'streak-7'); end if;
    if n >= 14 then perform public._award_unlock(p_user, 'streak-14'); end if;
    if n >= 30 then perform public._award_unlock(p_user, 'streak-30'); end if;
    if n >= 100 then perform public._award_unlock(p_user, 'streak-100'); end if;
  end if;

  if p_area in ('quizzes', 'all') then
    select count(*), coalesce(max(percentage), 0) into n, best from public.quiz_results where user_id = p_user;
    if n >= 1 then perform public._award_unlock(p_user, 'first-quiz'); end if;
    if n >= 10 then perform public._award_unlock(p_user, 'quiz-10'); end if;
    if n >= 50 then perform public._award_unlock(p_user, 'quiz-50'); end if;
    if best >= 100 then perform public._award_unlock(p_user, 'perfect-score'); end if;
    -- time_spent is seconds.
    if exists (select 1 from public.quiz_results where user_id = p_user
               and time_spent between 1 and 300 and percentage >= 80) then
      perform public._award_unlock(p_user, 'speed-demon');
    end if;
  end if;

  if p_area in ('ojt', 'all') then
    select coalesce(sum(duration), 0) / 60 into n from public.time_entries where user_id = p_user;
    if n >= 1 then perform public._award_unlock(p_user, 'first-hour'); end if;
    if n >= 50 then perform public._award_unlock(p_user, 'ojt-50'); end if;
    if n >= 100 then perform public._award_unlock(p_user, 'ojt-100'); end if;
    if n >= 400 then perform public._award_unlock(p_user, 'ojt-400'); end if;
  end if;

  if p_area in ('portfolio', 'all') then
    select count(*) into n from public.portfolio_items where user_id = p_user;
    if n >= 1 then perform public._award_unlock(p_user, 'first-evidence'); end if;
    if n >= 10 then perform public._award_unlock(p_user, 'portfolio-10'); end if;
  end if;

  if p_area in ('diary', 'all') then
    select count(*) into n from public.site_diary_entries where user_id = p_user;
    if n >= 1 then perform public._award_unlock(p_user, 'first-reflection'); end if;
    if n >= 10 then perform public._award_unlock(p_user, 'diary-10'); end if;
    if n >= 30 then perform public._award_unlock(p_user, 'diary-30'); end if;
  end if;

  if p_area in ('xp', 'all') then
    select level, total_xp into r from public.user_xp_summary where user_id = p_user;
    if found then
      if r.level >= 5 then perform public._award_unlock(p_user, 'level-5'); end if;
      if r.level >= 10 then perform public._award_unlock(p_user, 'level-10'); end if;
      if r.total_xp >= 1000 then perform public._award_unlock(p_user, 'xp-1000'); end if;
      if r.total_xp >= 10000 then perform public._award_unlock(p_user, 'xp-10000'); end if;
    end if;
  end if;

  if p_area in ('sections', 'all') then
    select count(distinct section_key) into n from public.course_progress where user_id = p_user and completed;
    if n >= 1 then perform public._award_unlock(p_user, 'section-first'); end if;
    if n >= 10 then perform public._award_unlock(p_user, 'section-10'); end if;
    if n >= 25 then perform public._award_unlock(p_user, 'section-25'); end if;
    if n >= 100 then perform public._award_unlock(p_user, 'section-100'); end if;
    if n >= 250 then perform public._award_unlock(p_user, 'section-250'); end if;
  end if;
end;
$$;
revoke all on function public._award_counts(uuid, text) from public, anon, authenticated;

-- A trigger function per source table; the area is the trigger argument.
-- Never lets an award fail the learner's own write.
create or replace function public._award_on_count()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform public._award_counts(new.user_id, tg_argv[0]);
  return null;
exception when others then
  return null;
end;
$$;

drop trigger if exists trg_award_count_quiz on public.quiz_results;
create trigger trg_award_count_quiz after insert on public.quiz_results
  for each row when (new.user_id is not null) execute function public._award_on_count('quizzes');

drop trigger if exists trg_award_count_ojt on public.time_entries;
create trigger trg_award_count_ojt after insert or update of duration on public.time_entries
  for each row when (new.user_id is not null) execute function public._award_on_count('ojt');

drop trigger if exists trg_award_count_portfolio on public.portfolio_items;
create trigger trg_award_count_portfolio after insert on public.portfolio_items
  for each row when (new.user_id is not null) execute function public._award_on_count('portfolio');

drop trigger if exists trg_award_count_diary on public.site_diary_entries;
create trigger trg_award_count_diary after insert on public.site_diary_entries
  for each row when (new.user_id is not null) execute function public._award_on_count('diary');

drop trigger if exists trg_award_count_sections on public.course_progress;
create trigger trg_award_count_sections after insert or update of completed on public.course_progress
  for each row when (new.completed and new.user_id is not null) execute function public._award_on_count('sections');

-- Streak and cards share a row; level and XP only when a threshold is crossed.
drop trigger if exists trg_award_count_streak on public.user_study_streaks;
create trigger trg_award_count_streak after insert or update of current_streak, longest_streak on public.user_study_streaks
  for each row execute function public._award_on_count('streak');
drop trigger if exists trg_award_count_cards on public.user_study_streaks;
create trigger trg_award_count_cards after insert or update of total_cards_reviewed on public.user_study_streaks
  for each row execute function public._award_on_count('cards');

drop trigger if exists trg_award_count_xp on public.user_xp_summary;
create trigger trg_award_count_xp after update of level, total_xp on public.user_xp_summary
  for each row when (
    (old.level < 5 and new.level >= 5) or (old.level < 10 and new.level >= 10)
    or (old.total_xp < 1000 and new.total_xp >= 1000) or (old.total_xp < 10000 and new.total_xp >= 10000)
  ) execute function public._award_on_count('xp');
drop trigger if exists trg_award_count_xp_new on public.user_xp_summary;
create trigger trg_award_count_xp_new after insert on public.user_xp_summary
  for each row when (new.level >= 5 or new.total_xp >= 1000)
  execute function public._award_on_count('xp');

-- The sweep covers the counted awards too.
create or replace function public._award_sweep(p_user uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  perform public._award_counts(p_user, 'all');
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
