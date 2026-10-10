-- Streaks worked out by the server, part 2: stored, kept current, locked
-- (10 Oct 2026).
--
-- user_study_streaks becomes the server's: rebuilt from the ledger after every
-- activity (trg_xp_ledger_changed) and again each night just after midnight UK
-- time so a missed day shows the next morning, not when the learner next opens
-- the app. 263 rows were holding a streak that had already ended (the app only
-- reset it on its next visit), which the boards and nudges were reading.
-- Users can no longer write the table.

create or replace function public._streak_store(p_user uuid)
returns void language plpgsql security definer set search_path = public as $$
declare
  j jsonb := public._streak_compute(p_user);
begin
  insert into public.user_study_streaks
    (user_id, current_streak, longest_streak, last_study_date, total_sessions, total_cards_reviewed,
     freezes_available, frozen_days, computed_at, updated_at)
  values
    (p_user, (j ->> 'current')::int, (j ->> 'longest')::int, (j ->> 'last_day')::date,
     coalesce((j ->> 'sessions')::int, 0), coalesce((j ->> 'cards')::int, 0),
     coalesce((j ->> 'freezes')::int, 0),
     coalesce(array(select jsonb_array_elements_text(j -> 'frozen_days'))::date[], '{}'),
     now(), now())
  on conflict (user_id) do update set
    current_streak = excluded.current_streak,
    longest_streak = greatest(public.user_study_streaks.longest_streak, excluded.longest_streak),
    last_study_date = excluded.last_study_date,
    total_sessions = excluded.total_sessions,
    total_cards_reviewed = greatest(public.user_study_streaks.total_cards_reviewed, excluded.total_cards_reviewed),
    freezes_available = excluded.freezes_available,
    frozen_days = excluded.frozen_days,
    computed_at = now(),
    updated_at = now();
end;
$$;
revoke all on function public._streak_store(uuid) from public, anon, authenticated;

-- One row per user is needed for the upsert.
do $$
begin
  if not exists (
    select 1 from pg_indexes where schemaname = 'public' and tablename = 'user_study_streaks'
      and indexdef ilike '%unique%(user_id)%'
  ) then
    create unique index user_study_streaks_user_id_uq on public.user_study_streaks (user_id);
  end if;
end $$;

create or replace function public._xp_ledger_changed()
returns trigger language plpgsql security definer set search_path = public as $function$
begin
  if tg_op = 'DELETE' then
    perform public._xp_recompute(old.user_id);
    perform public._streak_store(old.user_id);
  else
    perform public._xp_recompute(new.user_id);
    perform public._streak_store(new.user_id);
  end if;
  return null;
end;
$function$;

-- What the app shows: the stored row, rebuilt first so it's never stale.
create or replace function public.my_streak()
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare
  r record;
begin
  if auth.uid() is null then return null; end if;
  perform public._streak_store(auth.uid());
  select current_streak, longest_streak, last_study_date, total_sessions, total_cards_reviewed,
         freezes_available, frozen_days
    into r from public.user_study_streaks where user_id = auth.uid();
  return jsonb_build_object(
    'current_streak', r.current_streak, 'longest_streak', r.longest_streak,
    'last_study_date', r.last_study_date, 'total_sessions', r.total_sessions,
    'total_cards_reviewed', r.total_cards_reviewed, 'freezes_available', r.freezes_available,
    'frozen_days', to_jsonb(r.frozen_days),
    'studied_today', r.last_study_date = public.xp_london_day()
  );
end;
$$;
revoke all on function public.my_streak() from public, anon;
grant execute on function public.my_streak() to authenticated;

-- Nightly: streaks still showing as live are rebuilt, so a missed day lands.
create or replace function public.refresh_live_streaks()
returns integer language plpgsql security definer set search_path = public as $$
declare
  r record;
  n integer := 0;
begin
  for r in select user_id from public.user_study_streaks where current_streak > 0 loop
    perform public._streak_store(r.user_id);
    n := n + 1;
  end loop;
  return n;
end;
$$;
revoke all on function public.refresh_live_streaks() from public, anon, authenticated;

-- 00:05 UK time in both GMT and BST (the 23:05 UTC run is a no-op in winter
-- apart from rebuilding the same values).
select cron.unschedule(jobid) from cron.job where jobname = 'refresh-live-streaks';
select cron.schedule('refresh-live-streaks', '5 0,23 * * *', 'select public.refresh_live_streaks();');

-- Users read their own row; only the server writes.
drop policy if exists "Users can insert own study streaks" on public.user_study_streaks;
drop policy if exists "Users can manage own study streaks" on public.user_study_streaks;
drop policy if exists "Users can update own study streaks" on public.user_study_streaks;

-- Rebuild everyone now.
do $$
declare r record;
begin
  for r in select user_id from public.user_study_streaks
           union select distinct user_id from public.learning_activity_log loop
    perform public._streak_store(r.user_id);
  end loop;
end $$;
