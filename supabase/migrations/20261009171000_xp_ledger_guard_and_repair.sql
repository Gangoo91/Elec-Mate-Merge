-- XP made competition-safe, part 2 of 2 (9 Oct 2026).
--
-- Apps already installed (native builds especially) still insert XP rows
-- straight into learning_activity_log, and those rows also carry their
-- off-the-job minutes. Revoking the insert would silently stop both, so
-- instead every direct client insert is put through the same rules as
-- award_xp: the amount is capped to the rule for its type, each item awards
-- once per period (award_key), daily caps apply, and a repeat of the same
-- item within 10 seconds is dropped (it was never a real second event).
-- Server functions run as the table owner and are not re-checked here.
--
-- Then: user write access to user_xp_summary is removed (the trigger keeps
-- it), double-fire history is voided, achievement bonuses are put in the
-- ledger, every summary is rebuilt, and staff/test accounts are excluded.

-- ── 1. Guard on direct client inserts ────────────────────────────────────
create or replace function public._xp_client_max(p_type text)
returns integer language sql immutable as $$
  select case p_type
    when 'quiz_completed' then 150
    when 'tutor_quiz' then 35
    when 'flashcard_session' then 250
    when 'video_watched' then 10
    when 'path_completed' then 50
    when 'site_diary_entry' then 20
    when 'portfolio_evidence' then 30
    else 0 end;
$$;

create or replace function public._xp_guard_client_insert()
-- Deliberately NOT security definer: current_user is then the role doing the
-- insert. A direct app insert runs as authenticated/anon and is checked; the
-- server award functions are security definer (owner) and are not. The checks
-- below only read the user's own rows, which the select policy allows.
returns trigger language plpgsql set search_path = public as $$
declare
  v_day date := public.xp_london_day(coalesce(new.created_at, now()));
  v_xp integer;
  v_key text;
  v_type_today integer;
  v_all_today integer;
  v_reason text := 'awarded';
begin
  if current_user not in ('authenticated', 'anon') then
    return new;
  end if;

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
    where user_id = new.user_id and voided_at is null
      and public.xp_london_day(created_at) = v_day;
    v_xp := least(v_xp,
                  greatest(0, public._xp_daily_cap(new.activity_type) - v_type_today),
                  greatest(0, 1500 - v_all_today));
    if v_xp = 0 then v_reason := 'daily_cap'; end if;
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

-- Named to fire BEFORE trg_auto_log_ojt (triggers run in name order), so a
-- dropped double tap never reaches time_entries.
drop trigger if exists trg_a0_xp_guard on public.learning_activity_log;
create trigger trg_a0_xp_guard
  before insert on public.learning_activity_log
  for each row execute function public._xp_guard_client_insert();

-- No client may change or delete a ledger row.
revoke update, delete on public.learning_activity_log from anon, authenticated;

-- ── 2. The summary is the ledger's; no user writes ───────────────────────
drop policy if exists "Users can insert own xp summary" on public.user_xp_summary;
drop policy if exists "Users can update own xp summary" on public.user_xp_summary;

-- ── 3. Repair history (reversible: voided_at, nothing deleted) ───────────
update public.learning_activity_log l
set voided_at = now(), void_reason = 'double_fire'
from (
  select id, created_at - lag(created_at) over (
           partition by user_id, activity_type, coalesce(source_id, source_title, '')
           order by created_at, id) as gap
  from public.learning_activity_log
) d
where d.id = l.id and d.gap is not null and d.gap <= interval '10 seconds'
  and l.voided_at is null and l.xp_earned > 0;

-- Achievement bonuses were only ever added to the summary.
insert into public.learning_activity_log
  (user_id, activity_type, source_id, source_title, xp_earned, duration_minutes,
   metadata, counted_as_ojt, award_key, created_at)
select ua.user_id, 'achievement', ua.achievement_id, 'Achievement: ' || ua.achievement_id,
       public._xp_achievement_bonus(ua.achievement_id), 0,
       '{"backfilled":"2026-10-09"}'::jsonb, true,
       'achievement:' || ua.achievement_id, coalesce(ua.unlocked_at, now())
from public.user_achievements ua
where public._xp_achievement_bonus(ua.achievement_id) > 0
on conflict do nothing;

do $$
declare r record;
begin
  for r in select user_id from public.learning_activity_log
           union select user_id from public.user_xp_summary loop
    perform public._xp_recompute(r.user_id);
  end loop;
end $$;

-- ── 4. Staff and test accounts never ranked ──────────────────────────────
update public.profiles p set leaderboard_excluded = true
from auth.users u
where u.id = p.id and p.leaderboard_excluded = false and (
  p.admin_role is not null
  or u.email ilike '%@elec-mate.com'
  or u.email ilike '%+test%@%'
  or u.email ilike '%fixture%@%'
);
