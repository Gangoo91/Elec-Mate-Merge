-- Andrew, 6 Oct 2026: "the tutor should see every person in their cohort, the
-- time they've spent, centralised, so it's easy for them to see, judge and
-- approve." App learning time counts towards off-the-job hours (see
-- 20261006230000 / otj_app_learning_counts); a tutor approving it turns it into
-- a VERIFIED college_otj_entries row with their name on it, which is what an
-- auditor or EPA gateway wants to see.

-- 1. Approvals are not "new hours to review": no tutor push for them --------
create or replace function public.notify_tutor_otj()
returns trigger language plpgsql security definer set search_path to 'public', 'net', 'vault' as $$
declare service_key text;
begin
  -- Only an entry waiting for someone needs a "tap to verify" push. A tutor
  -- approving app learning inserts entries already verified.
  if coalesce(NEW.verification_status, 'pending') <> 'pending' then
    return NEW;
  end if;
  select decrypted_secret into service_key
  from vault.decrypted_secrets where name = 'service_role_key' limit 1;
  perform net.http_post(
    url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/notify-tutor-otj',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||coalesce(service_key,'')),
    body := jsonb_build_object('type','INSERT','record', to_jsonb(NEW))
  );
  return NEW;
exception when others then
  return NEW;
end;
$$;

-- 2. Which part of the app the time came from ---------------------------------
create or replace function public._otj_area(p_activity text)
returns text language sql immutable as $$
  select case
    when p_activity ilike '%am2%' then 'AM2 simulator'
    when p_activity ilike '%epa simulator%' or p_activity ilike '%epa-simulator%' or p_activity ilike 'apprentice: epa%' then 'EPA practice'
    when p_activity ilike '%flashcard%' then 'Flashcards'
    when p_activity ilike '%mock%' then 'Mock exams'
    when p_activity ilike '%video%' then 'Videos'
    when p_activity ilike '%revision%' or p_activity ilike '%missed questions%' then 'Revision'
    when p_activity ilike 'quiz%' then 'Quizzes'
    when p_activity ilike 'site diary%' then 'Site diary'
    else 'Study Centre'
  end;
$$;

-- 3. Every learner in the tutor's college (or one cohort), one row each -------
create or replace function public.get_college_otj(p_cohort uuid default null)
returns table (
  college_student_id uuid, user_id uuid, name text, cohort_id uuid, cohort_name text,
  summary jsonb, areas_30_days jsonb, unapproved_app_hours numeric, last_learning_at date)
language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_college uuid;
begin
  select p.college_id into v_college from profiles p
   where p.id = auth.uid() and p.college_role is not null;
  if v_college is null and not public._is_platform_admin() then
    raise exception 'not authorised' using errcode = '42501';
  end if;

  return query
  with learners as (
    select s.id, s.user_id, coalesce(nullif(trim(s.name), ''), 'Learner') as name, s.cohort_id, c.name as cohort_name
      from college_students s
      left join college_cohorts c on c.id = s.cohort_id
     where s.user_id is not null
       and (v_college is null or s.college_id = v_college)
       and (p_cohort is null or s.cohort_id = p_cohort)
       and lower(coalesce(s.status, '')) not in ('withdrawn', 'completed', 'archived')
  ), app as (
    select t.user_id,
           sum(t.duration) filter (where not exists (select 1 from otj_capture_links l where l.time_entry_id = t.id)) as unapproved_min,
           max(t.date) as last_day
      from time_entries t
     where t.is_automatic and coalesce(t.duration, 0) > 0
       and t.user_id in (select user_id from learners)
     group by t.user_id
  ), areas as (
    select x.user_id, jsonb_object_agg(x.area, x.hours order by x.hours desc) as areas
      from (select t.user_id, public._otj_area(t.activity) as area, round(sum(t.duration) / 60.0, 1) as hours
              from time_entries t
             where t.is_automatic and coalesce(t.duration, 0) > 0
               and t.date >= (now() at time zone 'Europe/London')::date - 30
               and t.user_id in (select user_id from learners)
             group by 1, 2) x
     group by x.user_id
  )
  select l.id, l.user_id, l.name, l.cohort_id, l.cohort_name,
         public.get_otj_summary(l.user_id),
         coalesce(a.areas, '{}'::jsonb),
         round(coalesce(app.unapproved_min, 0) / 60.0, 1),
         app.last_day
    from learners l
    left join app on app.user_id = l.user_id
    left join areas a on a.user_id = l.user_id
   order by l.name;
end; $$;
grant execute on function public.get_college_otj(uuid) to authenticated;

-- 4. One learner's app learning, day by day, not yet approved ------------------
create or replace function public.get_learner_app_days(p_user uuid default null, p_since date default null)
returns table (day date, minutes int, time_entry_ids uuid[], activities jsonb)
language plpgsql stable security definer set search_path to 'public' as $$
declare
  u uuid := coalesce(p_user, auth.uid());
begin
  if not public._otj_can_read(u) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return query
  select t.date,
         sum(t.duration)::int,
         array_agg(t.id order by t.created_at),
         (select jsonb_agg(jsonb_build_object('area', a.area, 'activity', a.activity, 'minutes', a.m) order by a.m desc)
            from (select public._otj_area(t2.activity) as area, coalesce(t2.activity, 'Study in Elec-Mate') as activity,
                         sum(t2.duration)::int as m
                    from time_entries t2
                   where t2.user_id = u and t2.is_automatic and t2.date = t.date and coalesce(t2.duration, 0) > 0
                     and not exists (select 1 from otj_capture_links l2 where l2.time_entry_id = t2.id)
                   group by 1, 2) a)
    from time_entries t
   where t.user_id = u and t.is_automatic and coalesce(t.duration, 0) > 0
     and t.date >= coalesce(p_since, (now() at time zone 'Europe/London')::date - 90)
     and not exists (select 1 from otj_capture_links l where l.time_entry_id = t.id)
   group by t.date
   order by t.date desc;
end; $$;
grant execute on function public.get_learner_app_days(uuid, date) to authenticated;

-- 5. Tutor approves app learning ----------------------------------------------
-- Everything not yet approved up to p_through, or exactly p_time_entry_ids.
-- One verified entry per ISO week (per day if a week tops 24 hours).
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
  v_learners int := 0;
  v_skipped int := 0;
begin
  if v_staff is null then raise exception 'not authorised' using errcode = '42501'; end if;
  if coalesce(array_length(p_users, 1), 0) = 0 then
    return jsonb_build_object('error', 'Pick at least one learner.');
  end if;
  select coalesce(nullif(trim(full_name), ''), 'Tutor') into v_staff_name from profiles where id = v_staff;

  foreach u in array p_users loop
    if not public.is_staff_for_learner_user(u) then
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
     where t.user_id = u and t.is_automatic
       and (p_time_entry_ids is null or t.id = any(p_time_entry_ids))
     for update;

    for wk in
      with picked as (
        select t.id, t.date, t.duration
          from time_entries t
         where t.user_id = u and t.is_automatic and coalesce(t.duration, 0) > 0
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
      v_minutes := v_minutes + least(wk.minutes, 1440);
    end loop;
    v_learners := v_learners + 1;
  end loop;

  return jsonb_build_object('success', true, 'learners', v_learners, 'entries', v_rows,
                            'hours', round(v_minutes / 60.0, 1), 'skipped', v_skipped);
end; $$;
grant execute on function public.approve_app_learning(uuid[], date, uuid[]) to authenticated;
