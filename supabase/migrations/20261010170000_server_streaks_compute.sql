-- Streaks worked out by the server, part 1: the calculation only (10 Oct 2026).
--
-- A streak day is a Europe/London day with any study in the ledger
-- (learning_activity_log — mocks, quizzes, sections, flashcards, videos…,
-- including rows that earned 0 XP: studying counts even when the XP was
-- already earned). Streak freeze: one is earned for every 7 days in a row,
-- holding at most 2; a missed day spends one automatically and the streak
-- carries on. Today not yet studied never breaks a streak.
--
-- Part 2 (20261010171000) stores it, keeps it up to date and removes client
-- writes. This part writes nothing.

alter table public.user_study_streaks
  add column if not exists freezes_available smallint not null default 0,
  add column if not exists frozen_days date[] not null default '{}',
  add column if not exists computed_at timestamptz;

create or replace function public._streak_compute(p_user uuid)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare
  v_today date := public.xp_london_day();
  v_first date;
  v_days date[];
  d date;
  v_run integer := 0;
  v_longest integer := 0;
  v_freezes integer := 0;
  v_frozen date[] := '{}';
  v_last date;
  v_cards integer;
begin
  select array_agg(distinct public.xp_london_day(created_at) order by public.xp_london_day(created_at))
    into v_days
  from public.learning_activity_log where user_id = p_user;

  if v_days is null then
    return jsonb_build_object('current', 0, 'longest', 0, 'last_day', null, 'freezes', 0,
                              'frozen_days', '[]'::jsonb, 'sessions', 0, 'cards', 0);
  end if;
  v_first := v_days[1];
  v_last := v_days[array_length(v_days, 1)];

  for d in select generate_series(v_first, v_today, interval '1 day')::date loop
    if d = any (v_days) then
      v_run := v_run + 1;
      if v_run % 7 = 0 and v_freezes < 2 then v_freezes := v_freezes + 1; end if;
    elsif d = v_today then
      null; -- today isn't over: it never breaks the run
    elsif v_run > 0 and v_freezes > 0 then
      v_freezes := v_freezes - 1;
      v_frozen := v_frozen || d; -- a freeze kept the run alive
    else
      v_run := 0;
    end if;
    v_longest := greatest(v_longest, v_run);
  end loop;

  select coalesce(sum(case when (metadata ->> 'cardsReviewed') ~ '^\d+$' then (metadata ->> 'cardsReviewed')::int else 0 end), 0)
    into v_cards
  from public.learning_activity_log
  where user_id = p_user and activity_type = 'flashcard_session' and voided_at is null;

  return jsonb_build_object(
    'current', v_run,
    'longest', v_longest,
    'last_day', v_last,
    'freezes', v_freezes,
    'frozen_days', to_jsonb(v_frozen),
    'sessions', array_length(v_days, 1),
    'cards', v_cards
  );
end;
$$;
revoke all on function public._streak_compute(uuid) from public, anon, authenticated;
