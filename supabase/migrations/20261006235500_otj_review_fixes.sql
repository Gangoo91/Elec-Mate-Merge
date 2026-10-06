-- Fixes from the 6 Oct independent review of the off-the-job build.
-- Applied live as migration otj_review_fixes.

-- 1. An apprentice could read employer_token on their own statement and sign
--    the EMPLOYER's half themselves (funding rules para 93). The token is no
--    longer selectable by any client role; staff get the link from a gated RPC.
revoke select on public.otj_hours_statements from anon, authenticated;
grant select (id, user_id, college_student_id, college_id, planned_hours, minimum_hours, rpl_hours,
              actual_hours, verified_hours, app_learning_hours, minimum_met, reason, prepared_by,
              prepared_by_name, prepared_at, learner_signed_name, learner_signed_at,
              employer_signed_name, employer_signed_role, employer_company, employer_signed_at,
              superseded_at)
  on public.otj_hours_statements to authenticated;

-- 2. Staff may only act for a learner at the learner's CURRENT college.
--    is_staff_for_learner_user matched any college_students row, withdrawn
--    ones included, so a previous college could still approve hours.
create or replace function public._otj_staff_can_act(p_user uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select auth.uid() is not null and exists (
    select 1
      from college_students s
      join college_staff st on st.college_id = s.college_id
     where s.user_id = p_user
       and lower(coalesce(s.status, '')) not in ('withdrawn', 'completed', 'archived')
       and st.user_id = auth.uid()
       and st.archived_at is null
  ) or public._is_platform_admin();
$$;
revoke all on function public._otj_staff_can_act(uuid) from public, anon, authenticated;

do $$
declare d text;
begin
  d := pg_get_functiondef('public.approve_app_learning(uuid[], date, uuid[])'::regprocedure);
  d := replace(d, 'if not public.is_staff_for_learner_user(u) then', 'if not public._otj_staff_can_act(u) then');
  execute d;
  d := pg_get_functiondef('public.prepare_otj_hours_statement(uuid, numeric, text, numeric)'::regprocedure);
  d := replace(d, 'if auth.uid() is null or not public.is_staff_for_learner_user(p_user) then',
                  'if auth.uid() is null or not public._otj_staff_can_act(p_user) then');
  execute d;
  -- 3. The trajectory's "current" point was the coming Sunday, so the planned
  --    line ran ahead of planned_to_date_hours. Weeks now end no later than today.
  d := pg_get_functiondef('public.get_otj_trajectory(uuid)'::regprocedure);
  d := replace(d, 'select (d::date + ((7 - extract(isodow from d::date)::int) % 7))::date as week_ending',
                  'select least((d::date + ((7 - extract(isodow from d::date)::int) % 7))::date, v_today) as week_ending');
  d := replace(d, 'select (v_today + ((7 - extract(isodow from v_today)::int) % 7))::date',
                  'select v_today');
  execute d;
end $$;

-- Staff copy the employer's signing link from here, not from the table.
create or replace function public.get_otj_statement_employer_link(p_id uuid)
returns text language plpgsql stable security definer set search_path to 'public' as $$
declare r record;
begin
  select user_id, employer_token into r from otj_hours_statements where id = p_id;
  if r.user_id is null or not public._otj_staff_can_act(r.user_id) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return r.employer_token;
end; $$;
grant execute on function public.get_otj_statement_employer_link(uuid) to authenticated;

-- 4. A tutor judges app learning, not only approves it: "Leave out" records
--    the tutor's decision and reason as a rejected in_app entry and links the
--    time, so it stops counting (e.g. outside working hours, para 79.6).
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

  return jsonb_build_object('success', true, 'days', v_rows, 'hours', round(v_minutes / 60.0, 1));
end; $$;
grant execute on function public.leave_out_app_learning(uuid, uuid[], text) to authenticated;
