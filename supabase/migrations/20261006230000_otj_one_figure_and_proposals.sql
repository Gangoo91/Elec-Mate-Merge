-- ELE-1876 / ELE-1877 — one off-the-job figure everywhere, and captured study
-- time becomes PROPOSED hours the learner confirms and the tutor verifies.
--
-- Rules carried over from ELE-1711 / ELE-1724 (do not undo):
--   * Time the app captured on its own (time_entries.is_automatic) is never
--     counted as off-the-job training by itself: no start time, no
--     working-hours evidence, no sign-off. It is shown as CAPTURED.
--   * Only college_otj_entries carries verification, so only verified or
--     employer-attested rows there count as VERIFIED hours.
--   * The 5,753 phantom rows from the old tracker (is_automatic false, note
--     'Auto-tracked training time') are excluded everywhere.
--
-- The learner turns captured time into a pending college_otj_entries row
-- (source_kind 'in_app') only after confirming it was in paid working hours.
-- One row per ISO week keeps the tutor's push to one per proposal.

-- 1. Which captured rows have been proposed (each at most once) -------------
create table if not exists public.otj_capture_links (
  time_entry_id uuid primary key references public.time_entries(id) on delete cascade,
  otj_entry_id  uuid not null references public.college_otj_entries(id) on delete cascade,
  user_id       uuid not null references public.profiles(id) on delete cascade,
  created_at    timestamptz not null default now()
);
create index if not exists otj_capture_links_entry_idx on public.otj_capture_links(otj_entry_id);
create index if not exists otj_capture_links_user_idx  on public.otj_capture_links(user_id);
alter table public.otj_capture_links enable row level security;
drop policy if exists "otj_capture_links: learner or staff read" on public.otj_capture_links;
create policy "otj_capture_links: learner or staff read" on public.otj_capture_links
  for select to authenticated
  using (user_id = auth.uid() or public.is_staff_for_learner_user(user_id));
comment on table public.otj_capture_links is
  '[COLLEGE] Links an auto-captured time_entries row to the college_otj_entries row it was proposed in. Scope: per learner. Used by: propose_captured_otj, get_otj_summary. Rule: written only by propose_captured_otj; a captured row is proposed at most once.';

alter table public.college_otj_entries add column if not exists in_working_hours boolean;
comment on column public.college_otj_entries.in_working_hours is
  'Learner confirmed the time was within normal paid working hours (funding rules). Set on in_app proposals.';

-- 2. Who may read a learner's hours -------------------------------------------
-- Not "current_user not in (authenticated, anon)": inside a SECURITY DEFINER
-- function current_user is the owner, so that let every caller through
-- (caught in testing 6 Oct). Decide on the request's JWT role instead.
create or replace function public._otj_can_read(p_user uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select p_user is not null and (
       coalesce(auth.role(), '') = 'service_role'
    or (auth.role() is null and auth.uid() is null and nullif(current_setting('request.jwt.claims', true), '') is null)
    or (auth.uid() is not null and (
          auth.uid() = p_user
       or public.is_staff_for_learner_user(p_user)
       or public.can_confirm_otj_for(p_user)
       or public._is_platform_admin()))
  );
$$;
revoke all on function public._otj_can_read(uuid) from public, anon, authenticated;

-- 3. The one figure ---------------------------------------------------------------
create or replace function public.get_otj_summary(p_user uuid default null)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  u uuid := coalesce(p_user, auth.uid());
  cs record;
  prog record;
  v_required numeric;
  v_required_src text := 'not_set';
  v_start date;
  v_end date;
  v_course uuid;
  v_verified int;
  v_pending int;
  v_rejected int;
  v_captured int;
  v_captured_week int;
  v_captured_days int;
  v_diary int;
  v_week_start date := date_trunc('week', (now() at time zone 'Europe/London'))::date;
  v_today date := (now() at time zone 'Europe/London')::date;
  v_planned numeric;
  v_pace numeric;
  v_forecast numeric;
  v_weeks_left numeric;
  v_needed numeric;
  v_risk text := 'unknown';
begin
  if not public._otj_can_read(u) then
    raise exception 'not authorised' using errcode = '42501';
  end if;

  -- The learner's current college record: active first, newest first.
  select s.id, s.college_id, s.course_id, s.cohort_id, s.start_date, s.expected_end_date, s.otj_required_hours
    into cs
    from college_students s
   where s.user_id = u
   order by (lower(coalesce(s.status, '')) in ('withdrawn', 'completed', 'archived')), s.created_at desc
   limit 1;

  if cs.id is not null then
    v_start := cs.start_date;
    v_end := cs.expected_end_date;
    if cs.otj_required_hours is not null and cs.otj_required_hours > 0 then
      v_required := cs.otj_required_hours; v_required_src := 'learner_record';
    end if;
    v_course := cs.course_id;
    if cs.cohort_id is not null then
      select coalesce(v_course, c.course_id), coalesce(v_start, c.start_date), coalesce(v_end, c.end_date)
        into v_course, v_start, v_end
        from college_cohorts c where c.id = cs.cohort_id;
    end if;
    if v_required is null and v_course is not null then
      select cc.otj_required_hours into v_required from college_courses cc
       where cc.id = v_course and cc.otj_required_hours > 0;
      if v_required is not null then v_required_src := 'course'; end if;
    end if;
  end if;

  -- A learner without a college sets their own programme in the hours hub.
  select p.start_date, p.end_date, p.total_hours into prog from user_otj_programmes p where p.user_id = u;
  if v_required is null and prog.total_hours is not null and prog.total_hours > 0 then
    v_required := prog.total_hours; v_required_src := 'self_set';
  end if;
  v_start := coalesce(v_start, prog.start_date);
  v_end := coalesce(v_end, prog.end_date);

  select coalesce(sum(duration_minutes) filter (where verification_status in ('verified', 'verified_by_employer')), 0),
         coalesce(sum(duration_minutes) filter (where verification_status = 'pending'), 0),
         count(*) filter (where verification_status = 'rejected')
    into v_verified, v_pending, v_rejected
    from college_otj_entries where student_id = u;

  select coalesce(sum(t.duration), 0),
         coalesce(sum(t.duration) filter (where t.date >= v_week_start), 0),
         count(distinct t.date)
    into v_captured, v_captured_week, v_captured_days
    from time_entries t
   where t.user_id = u and t.is_automatic and coalesce(t.duration, 0) > 0
     and not exists (select 1 from otj_capture_links l where l.time_entry_id = t.id);

  select coalesce(sum(t.duration), 0) into v_diary
    from time_entries t
   where t.user_id = u and not coalesce(t.is_automatic, false) and coalesce(t.duration, 0) > 0
     and coalesce(t.notes, '') <> 'Auto-tracked training time';

  if v_required is not null and v_start is not null and v_end is not null and v_end > v_start then
    v_planned := round(v_required * least(1, greatest(0, (v_today - v_start)::numeric / (v_end - v_start))), 1);
    if v_today > v_start then
      v_pace := (v_verified / 60.0) / greatest(1, (v_today - v_start) / 7.0);
      v_forecast := round(v_verified / 60.0 + v_pace * greatest(0, (v_end - v_today) / 7.0), 1);
    else
      v_pace := 0; v_forecast := round(v_verified / 60.0, 1);
    end if;
    v_weeks_left := greatest(0, (v_end - v_today) / 7.0);
    v_needed := case when v_weeks_left > 0 then round(greatest(0, v_required - v_verified / 60.0) / v_weeks_left, 1) end;
    v_risk := case
      when v_verified / 60.0 >= coalesce(v_planned, 0) then 'on_track'
      when v_verified / 60.0 >= 0.8 * v_planned then 'slightly_behind'
      else 'behind' end;
  end if;

  return jsonb_build_object(
    'user_id', u,
    'college_student_id', cs.id,
    'required_hours', v_required,
    'required_source', v_required_src,
    'start_date', v_start,
    'end_date', v_end,
    'planned_to_date_hours', v_planned,
    'verified_hours', round(v_verified / 60.0, 1),
    'pending_hours', round(v_pending / 60.0, 1),
    'rejected_entries', v_rejected,
    'captured_unproposed_hours', round(v_captured / 60.0, 1),
    'captured_unproposed_days', v_captured_days,
    'captured_this_week_hours', round(v_captured_week / 60.0, 1),
    'diary_logged_hours', round(v_diary / 60.0, 1),
    'weekly_pace_hours', round(coalesce(v_pace, 0), 1),
    'forecast_at_end_hours', v_forecast,
    'weekly_needed_hours', v_needed,
    'risk', v_risk,
    'can_propose', cs.id is not null and cs.college_id is not null
  );
end; $$;
grant execute on function public.get_otj_summary(uuid) to authenticated;

-- 4. Captured days the learner can propose ---------------------------------------
create or replace function public.get_captured_otj_days(p_since date default null)
returns table (day date, minutes int, entries int, time_entry_ids uuid[], activities jsonb)
language sql stable security definer set search_path to 'public' as $$
  select t.date as day,
         sum(t.duration)::int as minutes,
         count(*)::int as entries,
         array_agg(t.id order by t.created_at) as time_entry_ids,
         (select jsonb_agg(jsonb_build_object('activity', a.activity, 'minutes', a.m) order by a.m desc)
            from (select coalesce(t2.activity, 'Study in Elec-Mate') as activity, sum(t2.duration)::int as m
                    from time_entries t2
                   where t2.user_id = auth.uid() and t2.is_automatic and t2.date = t.date
                     and coalesce(t2.duration, 0) > 0
                     and not exists (select 1 from otj_capture_links l2 where l2.time_entry_id = t2.id)
                   group by 1) a) as activities
    from time_entries t
   where t.user_id = auth.uid() and t.is_automatic and coalesce(t.duration, 0) > 0
     and t.date >= coalesce(p_since, (now() at time zone 'Europe/London')::date - 56)
     and not exists (select 1 from otj_capture_links l where l.time_entry_id = t.id)
   group by t.date
   order by t.date desc;
$$;
grant execute on function public.get_captured_otj_days(date) to authenticated;

-- 5. Propose captured time --------------------------------------------------------
create or replace function public.propose_captured_otj(
  p_time_entry_ids uuid[], p_in_working_hours boolean, p_note text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  u uuid := auth.uid();
  cs record;
  v_name text;
  v_count int;
  v_found int;
  wk record;
  v_entry uuid;
  v_rows int := 0;
  v_minutes int := 0;
  v_desc text;
begin
  if u is null then raise exception 'not authorised' using errcode = '42501'; end if;
  if coalesce(array_length(p_time_entry_ids, 1), 0) = 0 then
    return jsonb_build_object('error', 'Pick at least one day to send.');
  end if;
  if not coalesce(p_in_working_hours, false) then
    return jsonb_build_object('error', 'Only time spent in your normal paid working hours can count as off-the-job training.');
  end if;

  select s.id, s.college_id into cs
    from college_students s
   where s.user_id = u and s.college_id is not null
     and lower(coalesce(s.status, '')) not in ('withdrawn', 'completed', 'archived')
   order by s.created_at desc limit 1;
  if cs.id is null then
    return jsonb_build_object('error', 'Join your college in the app first, so your tutor can verify these hours.');
  end if;

  select coalesce(nullif(trim(full_name), ''), 'Apprentice') into v_name from profiles where id = u;

  v_count := array_length(p_time_entry_ids, 1);
  perform 1 from time_entries where id = any(p_time_entry_ids) for update;
  select count(*) into v_found
    from time_entries t
   where t.id = any(p_time_entry_ids) and t.user_id = u and t.is_automatic and coalesce(t.duration, 0) > 0
     and not exists (select 1 from otj_capture_links l where l.time_entry_id = t.id);
  if v_found <> v_count then
    return jsonb_build_object('error', 'Some of that time has already been sent or is no longer available. Refresh and try again.');
  end if;

  -- One pending entry per week (per day if a week would exceed 24 hours).
  for wk in
    with picked as (
      select t.id, t.date, t.duration, coalesce(t.activity, 'Study in Elec-Mate') as activity
        from time_entries t where t.id = any(p_time_entry_ids)
    ), weeks as (
      select date_trunc('week', date)::date as wk, sum(duration) as total from picked group by 1
    )
    select case when w.total > 1440 then p.date else w.wk end as bucket,
           max(p.date) as last_day, sum(p.duration)::int as minutes, array_agg(p.id) as ids
      from picked p join weeks w on w.wk = date_trunc('week', p.date)::date
     group by 1
     order by 1
  loop
    select string_agg(to_char(d.date, 'Dy DD Mon') || ' · ' || d.activity || ' · ' || d.m || ' min', E'\n' order by d.date, d.m desc)
      into v_desc
      from (select t.date, coalesce(t.activity, 'Study in Elec-Mate') as activity, sum(t.duration)::int as m
              from time_entries t where t.id = any(wk.ids) group by 1, 2) d;
    if nullif(trim(coalesce(p_note, '')), '') is not null then
      v_desc := left(trim(p_note), 1000) || E'\n\n' || v_desc;
    end if;

    insert into college_otj_entries (
      college_id, student_id, recorded_by, recorded_by_name_snapshot, activity_date, duration_minutes,
      activity_type, title, description, source, source_kind, verification_status, in_working_hours)
    values (
      cs.college_id, u, u, v_name, wk.last_day, least(wk.minutes, 1440),
      'theory', 'Study in Elec-Mate · week of ' || to_char(date_trunc('week', wk.last_day), 'DD Mon'),
      left(v_desc, 4000), 'apprentice', 'in_app', 'pending', true)
    returning id into v_entry;

    insert into otj_capture_links (time_entry_id, otj_entry_id, user_id)
    select unnest(wk.ids), v_entry, u;

    v_rows := v_rows + 1;
    v_minutes := v_minutes + least(wk.minutes, 1440);
  end loop;

  return jsonb_build_object('success', true, 'entries', v_rows, 'hours', round(v_minutes / 60.0, 1));
end; $$;
grant execute on function public.propose_captured_otj(uuid[], boolean, text) to authenticated;

-- NOTE: get_otj_summary was replaced the same day by migration otj_app_learning_counts
-- (Andrew's decision: app learning time counts towards off-the-job hours). See
-- 20261006230500_otj_app_learning_counts.sql.
