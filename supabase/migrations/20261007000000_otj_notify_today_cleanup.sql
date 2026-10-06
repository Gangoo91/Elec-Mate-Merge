-- 6 Oct second pass on the off-the-job build.
-- Applied live as migration otj_notify_today_cleanup.
--  1. The learner hears when their tutor approves or leaves out app learning.
--  2. The tutor's Today screen shows app learning waiting for approval.
--  3. The learner "send to tutor" step from the first design is gone (app
--     learning counts as measured; tutors approve), so its functions go too.

-- 1a. Approve, with one notification per learner.
create or replace function public.approve_app_learning(
  p_users uuid[], p_through date default null, p_time_entry_ids uuid[] default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v_staff uuid := auth.uid();
  v_staff_name text;
  v_through date := coalesce(p_through, (now() at time zone 'Europe/London')::date);
  u uuid;
  cs record;
  wk record;
  v_entry uuid;
  v_desc text;
  v_rows int := 0;
  v_minutes int := 0;
  v_learner_minutes int;
  v_learners int := 0;
  v_skipped int := 0;
begin
  if v_staff is null then raise exception 'not authorised' using errcode = '42501'; end if;
  if coalesce(array_length(p_users, 1), 0) = 0 then
    return jsonb_build_object('error', 'Pick at least one learner.');
  end if;
  select coalesce(nullif(trim(full_name), ''), 'Tutor') into v_staff_name from profiles where id = v_staff;

  foreach u in array p_users loop
    if not public._otj_staff_can_act(u) then
      v_skipped := v_skipped + 1;
      continue;
    end if;
    select s.id, s.college_id into cs
      from college_students s
     where s.user_id = u and s.college_id is not null
       and lower(coalesce(s.status, '')) not in ('withdrawn', 'completed', 'archived')
     order by s.created_at desc limit 1;
    if cs.id is null then v_skipped := v_skipped + 1; continue; end if;

    perform 1 from time_entries t
     where t.user_id = u and public._otj_is_measured(t.is_automatic, t.notes)
       and (p_time_entry_ids is null or t.id = any(p_time_entry_ids))
     for update;

    v_learner_minutes := 0;
    for wk in
      with picked as (
        select t.id, t.date, t.duration
          from time_entries t
         where t.user_id = u and public._otj_is_measured(t.is_automatic, t.notes) and coalesce(t.duration, 0) > 0
           and t.date <= v_through
           and (p_time_entry_ids is null or t.id = any(p_time_entry_ids))
           and not exists (select 1 from otj_capture_links l where l.time_entry_id = t.id)
      ), weeks as (
        select date_trunc('week', date)::date as wk, sum(duration) as total from picked group by 1
      )
      select case when w.total > 1440 then p.date else w.wk end as bucket,
             max(p.date) as last_day, sum(p.duration)::int as minutes, array_agg(p.id) as ids
        from picked p join weeks w on w.wk = date_trunc('week', p.date)::date
       group by 1 order by 1
    loop
      select string_agg(to_char(d.date, 'Dy DD Mon') || ' · ' || d.area || ' · ' || d.m || ' min', E'\n' order by d.date, d.m desc)
        into v_desc
        from (select t.date, public._otj_area(t.activity) as area, sum(t.duration)::int as m
                from time_entries t where t.id = any(wk.ids) group by 1, 2) d;

      insert into college_otj_entries (
        college_id, student_id, recorded_by, recorded_by_name_snapshot, activity_date, duration_minutes,
        activity_type, title, description, source, source_kind, verification_status,
        verified_by, verified_at, verification_rationale)
      values (
        cs.college_id, u, v_staff, 'Recorded by Elec-Mate', wk.last_day, least(wk.minutes, 1440),
        'theory', 'Learning in Elec-Mate · week of ' || to_char(date_trunc('week', wk.last_day), 'DD Mon'),
        left(v_desc, 4000), 'college', 'in_app', 'verified',
        v_staff, now(), 'App learning approved by ' || v_staff_name)
      returning id into v_entry;

      insert into otj_capture_links (time_entry_id, otj_entry_id, user_id)
      select unnest(wk.ids), v_entry, u;

      v_rows := v_rows + 1;
      v_learner_minutes := v_learner_minutes + least(wk.minutes, 1440);
    end loop;

    if v_learner_minutes > 0 then
      begin
        insert into user_notifications (user_id, type, title, message, link, metadata)
        values (u, 'otj_app_approved',
                v_staff_name || ' approved ' || round(v_learner_minutes / 60.0, 1) || 'h of your learning',
                'Your time learning in Elec-Mate is now verified towards your off-the-job hours.',
                '/apprentice/ojt-hub', jsonb_build_object('minutes', v_learner_minutes));
      exception when others then null;
      end;
    end if;
    v_minutes := v_minutes + v_learner_minutes;
    v_learners := v_learners + 1;
  end loop;

  return jsonb_build_object('success', true, 'learners', v_learners, 'entries', v_rows,
                            'hours', round(v_minutes / 60.0, 1), 'skipped', v_skipped);
end; $$;
grant execute on function public.approve_app_learning(uuid[], date, uuid[]) to authenticated;

-- 1b. Leave out, telling the learner why.
create or replace function public.leave_out_app_learning(
  p_user uuid, p_time_entry_ids uuid[], p_reason text)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  cs record;
  v_name text;
  d record;
  v_entry uuid;
  v_rows int := 0;
  v_minutes int := 0;
begin
  if not public._otj_staff_can_act(p_user) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  if coalesce(array_length(p_time_entry_ids, 1), 0) = 0 then
    return jsonb_build_object('error', 'Pick the time to leave out.');
  end if;
  if length(trim(coalesce(p_reason, ''))) < 5 then
    return jsonb_build_object('error', 'Say why it does not count, so the learner knows.');
  end if;
  select s.id, s.college_id into cs from college_students s
   where s.user_id = p_user and lower(coalesce(s.status, '')) not in ('withdrawn', 'completed', 'archived')
   order by s.created_at desc limit 1;
  select coalesce(nullif(trim(full_name), ''), 'Tutor') into v_name from profiles where id = auth.uid();

  for d in
    select t.date as day, sum(t.duration)::int as minutes, array_agg(t.id) as ids
      from time_entries t
     where t.id = any(p_time_entry_ids) and t.user_id = p_user
       and public._otj_is_measured(t.is_automatic, t.notes) and coalesce(t.duration, 0) > 0
       and not exists (select 1 from otj_capture_links l where l.time_entry_id = t.id)
     group by t.date
  loop
    insert into college_otj_entries (
      college_id, student_id, recorded_by, recorded_by_name_snapshot, activity_date, duration_minutes,
      activity_type, title, description, source, source_kind, verification_status,
      verified_by, verified_at, verification_rationale)
    values (
      cs.college_id, p_user, auth.uid(), 'Recorded by Elec-Mate', d.day, least(d.minutes, 1440),
      'theory', 'Learning in Elec-Mate · not counted',
      'App learning on ' || to_char(d.day, 'Dy DD Mon') || ' left out by ' || v_name,
      'college', 'in_app', 'rejected', auth.uid(), now(),
      'Left out by ' || v_name || ': ' || left(trim(p_reason), 500))
    returning id into v_entry;
    insert into otj_capture_links (time_entry_id, otj_entry_id, user_id)
    select unnest(d.ids), v_entry, p_user;
    v_rows := v_rows + 1;
    v_minutes := v_minutes + d.minutes;
  end loop;

  if v_minutes > 0 then
    begin
      insert into user_notifications (user_id, type, title, message, link, metadata)
      values (p_user, 'otj_app_left_out',
              v_name || ' left out ' || round(v_minutes / 60.0, 1) || 'h of app learning',
              left(trim(p_reason), 200), '/apprentice/ojt-hub', jsonb_build_object('minutes', v_minutes));
    exception when others then null;
    end;
  end if;

  return jsonb_build_object('success', true, 'days', v_rows, 'hours', round(v_minutes / 60.0, 1));
end; $$;
grant execute on function public.leave_out_app_learning(uuid, uuid[], text) to authenticated;

-- 2. For the tutor's Today screen: app learning waiting at my college.
create or replace function public.get_app_learning_waiting()
returns jsonb language sql stable security definer set search_path to 'public' as $$
  with mine as (
    select s.user_id
      from college_students s
      join college_staff st on st.college_id = s.college_id
     where st.user_id = auth.uid() and st.archived_at is null
       and s.user_id is not null
       and lower(coalesce(s.status, '')) not in ('withdrawn', 'completed', 'archived')
  ), waiting as (
    select t.user_id, sum(t.duration) as minutes
      from time_entries t
     where t.user_id in (select user_id from mine)
       and public._otj_is_measured(t.is_automatic, t.notes) and coalesce(t.duration, 0) > 0
       and not exists (select 1 from otj_capture_links l where l.time_entry_id = t.id)
     group by t.user_id
  )
  select jsonb_build_object('learners', count(*), 'hours', round(coalesce(sum(minutes), 0) / 60.0, 1))
    from waiting;
$$;
grant execute on function public.get_app_learning_waiting() to authenticated;

-- 3. Unused since app learning counts as measured.
drop function if exists public.propose_captured_otj(uuid[], boolean, text);
drop function if exists public.get_captured_otj_days(date);
