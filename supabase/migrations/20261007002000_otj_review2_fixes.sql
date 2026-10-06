-- Second independent review of the off-the-job build (6 Oct 2026).
-- Applied live as migration otj_review2_fixes.

-- 1. CRITICAL: a learner could write their own "measured" time rows (any
--    duration, any date) or relabel diary rows, and they counted at once.
--    Rows carrying the tracker's note are now limited to what the tracker can
--    actually produce, and can never be edited once written.
--    Real data, 6 Oct: longest tracker row 35 min, busiest day 436 min.
create or replace function public.tg_time_entries_measured_guard()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare
  v_today date := (now() at time zone 'Europe/London')::date;
  v_day_total int;
begin
  -- Server code (service role, definer functions, cron) is trusted.
  if coalesce(auth.role(), '') <> 'authenticated' then
    return coalesce(new, old);
  end if;

  if tg_op = 'UPDATE' then
    if (old.is_automatic and old.notes = 'Auto-tracked training time')
       or (new.is_automatic and new.notes = 'Auto-tracked training time') then
      if new.notes is distinct from old.notes or new.is_automatic is distinct from old.is_automatic
         or new.duration is distinct from old.duration or new.date is distinct from old.date
         or new.user_id is distinct from old.user_id then
        raise exception 'Time measured by the app cannot be changed.' using errcode = 'check_violation';
      end if;
    end if;
    return new;
  end if;

  -- INSERT
  if new.is_automatic and new.notes = 'Auto-tracked training time' then
    if coalesce(new.duration, 0) < 1 or new.duration > 60 then
      raise exception 'Measured time rows are between 1 and 60 minutes.' using errcode = 'check_violation';
    end if;
    if new.date > v_today or new.date < v_today - 7 then
      raise exception 'Measured time must be dated within the last week.' using errcode = 'check_violation';
    end if;
    select coalesce(sum(duration), 0) into v_day_total
      from time_entries
     where user_id = new.user_id and date = new.date
       and is_automatic and notes = 'Auto-tracked training time';
    if v_day_total + new.duration > 720 then
      raise exception 'More than 12 hours of measured time in one day.' using errcode = 'check_violation';
    end if;
  end if;
  return new;
end; $$;
drop trigger if exists trg_time_entries_measured_guard on public.time_entries;
create trigger trg_time_entries_measured_guard before insert or update on public.time_entries
  for each row execute function public.tg_time_entries_measured_guard();

-- 2. The legacy session timer ('Auto-tracked session:…') measures wall clock
--    with no idle exclusion. Only the route tracker's rows count.
create or replace function public._otj_is_measured(p_is_automatic boolean, p_notes text)
returns boolean language sql immutable as $$
  select coalesce(p_is_automatic, false) and p_notes = 'Auto-tracked training time';
$$;

-- 3. A learner could move a tutor's left-out (or approved) app-learning entry
--    back to pending and change its hours. in_app entries are staff decisions.
do $$
declare d text;
begin
  d := pg_get_functiondef('public.tg_guard_otj_self_edit()'::regprocedure);
  if position('in_app entries are staff decisions' in d) = 0 then
    d := replace(d,
      'IF OLD.student_id = auth.uid() OR OLD.recorded_by = auth.uid() THEN',
      'IF OLD.source_kind = ''in_app'' AND OLD.student_id = auth.uid() THEN
    RAISE EXCEPTION ''Your tutor decided this one. Ask them if you think it is wrong.'' USING errcode = ''check_violation''; -- in_app entries are staff decisions
  END IF;
  IF OLD.student_id = auth.uid() OR OLD.recorded_by = auth.uid() THEN');
    execute d;
  end if;
end $$;

-- 4. Reads use the current-college, non-archived staff check too.
grant execute on function public._otj_staff_can_act(uuid) to authenticated;
create or replace function public._otj_can_read(p_user uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select p_user is not null and (
       coalesce(auth.role(), '') = 'service_role'
    or (auth.role() is null and auth.uid() is null and nullif(current_setting('request.jwt.claims', true), '') is null)
    or (auth.uid() is not null and (
          auth.uid() = p_user
       or public._otj_staff_can_act(p_user)
       or public.can_confirm_otj_for(p_user)
       or public._is_platform_admin()))
  );
$$;
revoke all on function public._otj_can_read(uuid) from public, anon, authenticated;

drop policy if exists "otj_capture_links: learner or staff read" on public.otj_capture_links;
create policy "otj_capture_links: learner or staff read" on public.otj_capture_links
  for select to authenticated using (user_id = auth.uid() or public._otj_staff_can_act(user_id));
drop policy if exists "otj_hours_statements: learner or staff read" on public.otj_hours_statements;
create policy "otj_hours_statements: learner or staff read" on public.otj_hours_statements
  for select to authenticated using (user_id = auth.uid() or public._otj_staff_can_act(user_id));

do $$
declare d text;
begin
  -- get_college_otj: the caller's college from an ACTIVE college_staff row.
  d := pg_get_functiondef('public.get_college_otj(uuid)'::regprocedure);
  d := replace(d,
    'select p.college_id into v_college from profiles p
   where p.id = auth.uid() and p.college_role is not null;',
    'select st.college_id into v_college from college_staff st
   where st.user_id = auth.uid() and st.archived_at is null
   order by st.created_at desc limit 1;');
  execute d;

  -- 9. Days list covers all time, matching app_learning_hours and approve-all.
  d := pg_get_functiondef('public.get_learner_app_days(uuid, date)'::regprocedure);
  d := replace(d, 'coalesce(p_since, (now() at time zone ''Europe/London'')::date - 90)', 'coalesce(p_since, date ''2000-01-01'')');
  execute d;
end $$;

-- 8. Breakdown: time a tutor left out is not "counting", and only verified
--    links are "approved".
create or replace function public.get_app_learning_breakdown(p_user uuid default null, p_days int default 30)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  u uuid := coalesce(p_user, auth.uid());
  v_since date := (now() at time zone 'Europe/London')::date - greatest(1, least(coalesce(p_days, 30), 366)) + 1;
begin
  if not public._otj_can_read(u) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return (
    with rows as (
      select t.date, t.duration, public._otj_area(t.activity) as area,
             e.verification_status as decided
        from time_entries t
        left join otj_capture_links l on l.time_entry_id = t.id
        left join college_otj_entries e on e.id = l.otj_entry_id
       where t.user_id = u and public._otj_is_measured(t.is_automatic, t.notes)
         and coalesce(t.duration, 0) > 0 and t.date >= v_since
    ), counting as (
      select * from rows where decided is distinct from 'rejected'
    )
    select jsonb_build_object(
      'since', v_since,
      'days', coalesce((select jsonb_agg(jsonb_build_object('day', d.date, 'minutes', d.m) order by d.date)
                          from (select date, sum(duration)::int m from counting group by 1) d), '[]'::jsonb),
      'areas', coalesce((select jsonb_agg(jsonb_build_object('area', a.area, 'minutes', a.m) order by a.m desc)
                           from (select area, sum(duration)::int m from counting group by 1) a), '[]'::jsonb),
      'approved_minutes', (select coalesce(sum(duration), 0)::int from rows where decided in ('verified', 'verified_by_employer')),
      'left_out_minutes', (select coalesce(sum(duration), 0)::int from rows where decided = 'rejected'),
      'total_minutes', (select coalesce(sum(duration), 0)::int from counting))
  );
end; $$;
grant execute on function public.get_app_learning_breakdown(uuid, int) to authenticated;

-- 11. Undo a tutor's approve / leave-out decision on app learning.
create or replace function public.undo_app_learning_decision(p_entry_ids uuid[])
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  r record;
  v_n int := 0;
begin
  for r in
    select id, student_id from college_otj_entries
     where id = any(p_entry_ids) and source_kind = 'in_app'
       and exists (select 1 from otj_capture_links l where l.otj_entry_id = college_otj_entries.id)
  loop
    if not public._otj_staff_can_act(r.student_id) then
      raise exception 'not authorised' using errcode = '42501';
    end if;
    delete from college_otj_entries where id = r.id;   -- links cascade
    v_n := v_n + 1;
  end loop;
  return jsonb_build_object('success', true, 'undone', v_n);
end; $$;
grant execute on function public.undo_app_learning_decision(uuid[]) to authenticated;

-- approve / leave out return the entry ids they create, so the client can undo.
do $$
declare d text; f text;
begin
  foreach f in array array['public.approve_app_learning(uuid[], date, uuid[])', 'public.leave_out_app_learning(uuid, uuid[], text)'] loop
    d := pg_get_functiondef(f::regprocedure);
    if position('v_ids uuid[]' in d) = 0 then
      d := replace(d, '  v_rows int := 0;', '  v_rows int := 0;
  v_ids uuid[] := ''{}'';');
      d := replace(d, 'returning id into v_entry;', 'returning id into v_entry;
    v_ids := v_ids || v_entry;');
      d := replace(d, 'return jsonb_build_object(''success'', true,', 'return jsonb_build_object(''success'', true, ''entry_ids'', v_ids,');
      execute d;
    end if;
  end loop;
end $$;
