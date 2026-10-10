-- ELE-1966: support view-as. Elec-Mate support sees a College Hub screen as a
-- NAMED staff member of that college: read-only, logged, and only with the
-- college's consent. Builds on white-glove acting (20261008049100):
--
--   college_support_consent          one row per college; the college admin's
--                                    switch (default: no consent)
--   set_college_support_consent      college admin / head of department only;
--                                    turning it off also ends any open view-as
--                                    session for that college. Logged.
--   college_acting_sessions.mode     'setup' (white-glove, unchanged) or
--                                    'view_as' (read-only)
--   college_acting_sessions.as_user_id  the staff member being viewed as
--   admin_list_view_as_people        platform admin + consent: the college's
--                                    staff to choose from
--   admin_start_view_as              platform admin + consent + a reason; one
--                                    hour; logged to college_activity (the
--                                    college's own log) with the reason
--   get_my_acting_college            now also returns mode and the person
--
-- Writes are refused server-side while a view_as session is open:
--   * _viewing_as_now() is true for the caller during an open view_as session.
--   * current_user_is_read_only_staff() (the EQA read-only rule, already behind
--     restrictive no-insert / no-update / no-delete policies on 60 college
--     tables and can_write_college_iqa) now also returns true then. The live
--     definition is kept identical apart from that one OR.
--   * the remaining tables with a college_id get the same three restrictive
--     policies (support_view_as_no_insert / _update / _delete).
--   Restrictive policies only ever narrow access; for everyone else the check
--   is one indexed lookup on a table that only holds platform admins' sessions.

begin;
set local lock_timeout = '8s';

create table if not exists public.college_support_consent (
  college_id       uuid primary key references public.colleges(id) on delete cascade,
  view_as_allowed  boolean not null default false,
  changed_by       uuid references auth.users(id) on delete set null,
  changed_at       timestamptz not null default now()
);
alter table public.college_support_consent enable row level security;
comment on table public.college_support_consent is
  '[COLLEGE] ELE-1966: the college admin''s consent for Elec-Mate support to view the College Hub as a named staff member (read-only, logged). Written only through set_college_support_consent. Read by the college''s own staff and platform admins.';

drop policy if exists "College staff and Elec-Mate read support consent" on public.college_support_consent;
create policy "College staff and Elec-Mate read support consent" on public.college_support_consent
  for select to authenticated
  using (public._ch_same_college(college_id) or public._is_platform_admin());
revoke all on public.college_support_consent from anon;
revoke insert, update, delete, truncate on public.college_support_consent from authenticated;

alter table public.college_acting_sessions
  add column if not exists mode text not null default 'setup',
  add column if not exists as_user_id uuid references auth.users(id) on delete set null;
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'college_acting_sessions_mode_check') then
    alter table public.college_acting_sessions
      add constraint college_acting_sessions_mode_check check (mode in ('setup', 'view_as'));
  end if;
end $$;
create index if not exists idx_college_acting_view_as_open
  on public.college_acting_sessions (admin_id) where ended_at is null and mode = 'view_as';

create or replace function public.set_college_support_consent(p_college uuid, p_allowed boolean)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row college_acting_sessions;
begin
  if auth.uid() is null or not public._is_college_manager(p_college) then
    raise exception 'Only your college admin can change this' using errcode = '42501';
  end if;
  insert into college_support_consent (college_id, view_as_allowed, changed_by, changed_at)
  values (p_college, p_allowed, auth.uid(), now())
  on conflict (college_id) do update
    set view_as_allowed = excluded.view_as_allowed, changed_by = excluded.changed_by, changed_at = excluded.changed_at;
  insert into college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (p_college, auth.uid(), case when p_allowed then 'support.view_as_allowed' else 'support.view_as_withdrawn' end,
          'college', p_college, jsonb_build_object('view_as_allowed', p_allowed));
  if not p_allowed then
    for v_row in
      update college_acting_sessions set ended_at = now()
       where college_id = p_college and mode = 'view_as' and ended_at is null
      returning *
    loop
      insert into college_activity (college_id, actor_id, action, entity_type, entity_id, details)
      values (p_college, auth.uid(), 'elec_mate_view_as.ended_by_college', 'college', p_college,
              jsonb_build_object('session_id', v_row.id, 'admin_id', v_row.admin_id));
    end loop;
  end if;
  return jsonb_build_object('college_id', p_college, 'view_as_allowed', p_allowed);
end;
$$;
revoke all on function public.set_college_support_consent(uuid, boolean) from public, anon;
grant execute on function public.set_college_support_consent(uuid, boolean) to authenticated;

create or replace function public.admin_list_view_as_people(p_college uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public._is_platform_admin() then
    raise exception 'Only Elec-Mate support can do this' using errcode = '42501';
  end if;
  return jsonb_build_object(
    'consent', coalesce((select view_as_allowed from college_support_consent where college_id = p_college), false),
    'people', coalesce((
      select jsonb_agg(jsonb_build_object('user_id', s.user_id, 'name', s.name, 'role', s.role) order by s.name)
        from college_staff s
       where s.college_id = p_college and s.user_id is not null and s.archived_at is null
    ), '[]'::jsonb)
  );
end;
$$;
revoke all on function public.admin_list_view_as_people(uuid) from public, anon;
grant execute on function public.admin_list_view_as_people(uuid) to authenticated;

create or replace function public.admin_start_view_as(p_college uuid, p_user uuid, p_reason text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row   college_acting_sessions;
  v_name  text;
  v_staff record;
  v_reason text := nullif(btrim(coalesce(p_reason, '')), '');
begin
  if not public._is_platform_admin() then
    raise exception 'Only Elec-Mate support can do this' using errcode = '42501';
  end if;
  if not coalesce((select view_as_allowed from college_support_consent where college_id = p_college), false) then
    raise exception 'This college has not allowed Elec-Mate support to view as its staff' using errcode = '42501';
  end if;
  if v_reason is null or length(v_reason) < 5 then
    raise exception 'Give a reason (for example the support request) of at least 5 characters';
  end if;
  select name into v_name from colleges where id = p_college;
  select s.user_id, s.name, s.role into v_staff
    from college_staff s
   where s.college_id = p_college and s.user_id = p_user and s.archived_at is null
   limit 1;
  if v_staff.user_id is null then
    raise exception 'That person is not on this college''s staff';
  end if;
  -- One open session per admin: close whatever was open (logged as a stop).
  perform public.admin_stop_acting();
  insert into college_acting_sessions (admin_id, college_id, reason, expires_at, mode, as_user_id)
  values (auth.uid(), p_college, v_reason, now() + interval '1 hour', 'view_as', p_user)
  returning * into v_row;
  insert into college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (p_college, auth.uid(), 'elec_mate_view_as.start', 'college_staff', p_user,
          jsonb_build_object('session_id', v_row.id, 'reason', v_reason, 'as_user_id', p_user,
                             'as_name', v_staff.name, 'as_role', v_staff.role,
                             'expires_at', v_row.expires_at, 'read_only', true));
  return jsonb_build_object('college_id', p_college, 'college_name', v_name, 'expires_at', v_row.expires_at,
                            'as_user_id', p_user, 'as_name', v_staff.name, 'as_role', v_staff.role);
end;
$$;
revoke all on function public.admin_start_view_as(uuid, uuid, text) from public, anon;
grant execute on function public.admin_start_view_as(uuid, uuid, text) to authenticated;

create or replace function public._viewing_as_now()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null
     and exists (select 1 from public.college_acting_sessions a
                  where a.admin_id = auth.uid() and a.ended_at is null and a.mode = 'view_as'
                    and a.expires_at > now());
$$;
revoke all on function public._viewing_as_now() from public;
grant execute on function public._viewing_as_now() to anon, authenticated;

-- Identical to the live definition apart from the final OR.
create or replace function public.current_user_is_read_only_staff()
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  select exists (
    select 1 from public.college_staff st
    join public.college_role_capabilities rc on rc.role = st.role and rc.capability = 'read_only'
    where st.user_id = auth.uid() and st.archived_at is null
  ) or public._viewing_as_now();
$function$;

-- Identical to the live definition apart from: mode, as_user_id, as_name, as_role.
create or replace function public.get_my_acting_college()
returns jsonb
language sql
stable
security definer
set search_path = public
as $function$
  select case when public._is_platform_admin() then (
    select jsonb_build_object('college_id', a.college_id, 'college_name', c.name, 'college_code', c.code,
                              'expires_at', a.expires_at, 'started_at', a.started_at,
                              'mode', a.mode, 'as_user_id', a.as_user_id,
                              'as_name', s.name, 'as_role', s.role)
      from college_acting_sessions a join colleges c on c.id = a.college_id
      left join lateral (
        select st.name, st.role from college_staff st
         where st.college_id = a.college_id and st.user_id = a.as_user_id
         order by st.archived_at nulls first limit 1
      ) s on a.as_user_id is not null
     where a.admin_id = auth.uid() and a.ended_at is null and a.expires_at > now()
     limit 1) end;
$function$;

commit;

-- The college tables that do not already carry the EQA read-only policies.
-- One table per statement so a busy table cannot hold the rest up.
do $$
declare t text;
begin
  foreach t in array array[
    'college_access', 'college_access_grants', 'college_access_periods', 'college_api_keys',
    'college_apprentice_survey_responses', 'college_apprentice_surveys', 'college_benchmark_comparison_cache',
    'college_benchmark_opt_in', 'college_benchmark_tokens', 'college_billing_accounts', 'college_billing_invoices',
    'college_data_access_log', 'college_epa_briefs', 'college_evidence_requirements',
    'college_iqa_eqa_checklist_items', 'college_iqa_findings', 'college_learner_counts', 'college_learner_episodes',
    'college_learner_evidence', 'college_learner_link_pauses', 'college_learner_starting_points',
    'college_learner_taught', 'college_lesson_deliveries', 'college_risk_settings', 'college_roster_imports',
    'college_setup_codes', 'college_signup_offers', 'college_standardisation_meetings',
    'college_student_assignments', 'college_student_ilr', 'college_student_lifecycle_events',
    'compliance_audit_events', 'epa_gateway_declarations', 'lti_context_mappings', 'lti_platforms',
    'otj_hours_statements', 'otj_proposals', 'portfolio_assessment_plans', 'portfolio_exports', 'webhook_configs',
    'college_support_consent'
  ] loop
    if to_regclass('public.' || t) is not null then
      execute 'set local lock_timeout = ''8s''';
      execute format('drop policy if exists support_view_as_no_insert on public.%I', t);
      execute format('create policy support_view_as_no_insert on public.%I as restrictive for insert to authenticated with check (not (select public._viewing_as_now()))', t);
      execute format('drop policy if exists support_view_as_no_update on public.%I', t);
      execute format('create policy support_view_as_no_update on public.%I as restrictive for update to authenticated using (not (select public._viewing_as_now())) with check (not (select public._viewing_as_now()))', t);
      execute format('drop policy if exists support_view_as_no_delete on public.%I', t);
      execute format('create policy support_view_as_no_delete on public.%I as restrictive for delete to authenticated using (not (select public._viewing_as_now()))', t);
    end if;
  end loop;
end $$;
