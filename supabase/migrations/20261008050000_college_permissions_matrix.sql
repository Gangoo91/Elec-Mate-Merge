-- ELE-1898: staff roles and permissions, defined ONCE.
--
-- One matrix (college_role_capabilities) says what each staff role may do.
-- One function (college_can) answers "may the caller do X at this college
-- (for this learner)?" from that matrix plus the duty flags on college_staff
-- (DSL / deputy, quality nominee, IQA qualification). RLS, the SECURITY
-- DEFINER helpers and the app (useCollegeCan → get_my_college_capabilities)
-- all ask the same function, so the screens and the database agree.
--
-- Backward compatible with the released web app and iOS build 49: no column
-- or function the client calls is removed or renamed. What tightens (support
-- and EQA are read-only, settings / cohorts / courses / staff need a manager,
-- IQA sampling needs an IQA, registers need a teaching role, private pastoral
-- notes stay private) only affects roles that no live account holds today,
-- except where the released UI already showed the action to a role the DB
-- refused or should have refused. Colleges with no linked admin or head of
-- department (Northgate today) keep the bootstrap rule: any active,
-- non-read-only staff member may manage staff, cohorts and settings until a
-- manager signs in; granting admin / head of department / duty flags still
-- needs a manager (or Elec-Mate).
begin;

-- ------------------------------------------------------------------ the matrix
create table if not exists public.college_capabilities (
  key         text primary key,
  label       text not null,
  description text not null,
  sort        int  not null default 100
);
comment on table public.college_capabilities is
  '[COLLEGE] The list of things a college staff member can be allowed to do (ELE-1898), with the plain-English line the staff screen shows. Scope: platform reference data. Used by: college_can, get_my_college_capabilities, get_college_role_matrix, Edit staff sheet. Rule: change only by migration; every key needs a row per role in verify_roles.sql.';

create table if not exists public.college_role_capabilities (
  role       text not null check (role in ('tutor','assessor','iqa','eqa','head_of_department','admin','support')),
  capability text not null references public.college_capabilities(key) on delete cascade,
  primary key (role, capability)
);
comment on table public.college_role_capabilities is
  '[COLLEGE] Role to capability matrix for college staff (ELE-1898): which college_staff.role grants which college_capabilities key. Duty flags (DSL, quality nominee, IQA qualification) and the no-manager bootstrap are applied on top by college_can. Scope: platform reference data. Used by: college_can, RLS on college tables, useCollegeCan. Rule: change only by migration, with verify_roles.sql updated in the same change.';

alter table public.college_capabilities enable row level security;
alter table public.college_role_capabilities enable row level security;
drop policy if exists "signed-in users read capabilities" on public.college_capabilities;
create policy "signed-in users read capabilities" on public.college_capabilities
  for select to authenticated using (true);
drop policy if exists "signed-in users read role capabilities" on public.college_role_capabilities;
create policy "signed-in users read role capabilities" on public.college_role_capabilities
  for select to authenticated using (true);
revoke all on public.college_capabilities, public.college_role_capabilities from anon;
revoke insert, update, delete, truncate on public.college_capabilities, public.college_role_capabilities from authenticated;
grant select on public.college_capabilities, public.college_role_capabilities to authenticated;

insert into public.college_capabilities (key, label, description, sort) values
  ('learners.view_mine',   'See their own learners',            'Sees the learners in the cohorts they teach or are assigned to.', 10),
  ('learners.view_all',    'See every learner at the college',  'Can look up any learner at the college, read only.', 20),
  ('learners.edit',        'Edit learner records',              'Updates a learner''s details, cohort, employer and plan.', 30),
  ('register.take',        'Take registers',                    'Marks attendance for a session.', 40),
  ('assess.decide',        'Record assessment decisions',       'Signs off criteria and records assessment decisions.', 50),
  ('iqa.sample',           'Run IQA sampling',                  'Builds sampling plans and samples assessors'' work.', 60),
  ('iqa.verdict',          'Give IQA verdicts',                 'Confirms or refers back a decision. Never on a decision they made themselves.', 70),
  ('pastoral.read',        'Read pastoral notes',               'Reads notes shared with all tutors.', 80),
  ('notes.restricted',     'Read course-lead notes',            'Reads notes marked for course leads only.', 85),
  ('safeguarding.raise',   'Raise a safeguarding concern',      'Logs a concern for the safeguarding lead. Cannot read it back.', 90),
  ('safeguarding.read',    'Read safeguarding concerns',        'Reads safeguarding concerns. Designated safeguarding lead or deputy only, or a manager while no lead is named.', 95),
  ('safeguarding.manage',  'Handle safeguarding concerns',      'Acts on and closes safeguarding concerns. Same people as above.', 96),
  ('messages.send',        'Message learners',                  'Writes to learners and their cohorts.', 100),
  ('observations.record',  'Record observations',               'Records workplace and practical observations.', 110),
  ('reviews.write',        'Run progress reviews',              'Books, writes and signs tripartite progress reviews.', 120),
  ('exports',              'Download and export',               'Downloads CSVs, evidence packs and reports.', 130),
  ('quality.view',         'See the quality and compliance pack','Opens the audit log, quality dashboard, SAR and QIP.', 140),
  ('quality.edit',         'Work on quality and compliance',    'Writes the SAR, QIP actions and inspection rehearsals.', 150),
  ('cohorts.manage',       'Manage cohorts and courses',        'Creates, changes and closes cohorts and courses.', 160),
  ('settings.manage',      'Change college settings',           'Changes the college details and how the hub works.', 170),
  ('staff.manage',         'Manage staff',                      'Adds staff, edits their details and archives leavers.', 180),
  ('staff.grant_roles',    'Give out roles and duties',         'Makes someone an admin or head of department, and names the safeguarding and quality leads.', 190),
  ('learner.view_as',      'See a learner''s record as support','Opens a learner''s record read only. Every look is logged.', 200),
  ('read_only',            'Read only',                         'Can look but not change anything.', 210)
on conflict (key) do update set label = excluded.label, description = excluded.description, sort = excluded.sort;

delete from public.college_role_capabilities;
insert into public.college_role_capabilities (role, capability)
select r, c from (values
  -- tutor
  ('tutor','learners.view_mine'), ('tutor','learners.view_all'), ('tutor','learners.edit'),
  ('tutor','register.take'), ('tutor','assess.decide'), ('tutor','pastoral.read'),
  ('tutor','safeguarding.raise'), ('tutor','messages.send'), ('tutor','observations.record'),
  ('tutor','reviews.write'), ('tutor','exports'),
  -- assessor
  ('assessor','learners.view_mine'), ('assessor','learners.view_all'), ('assessor','learners.edit'),
  ('assessor','register.take'), ('assessor','assess.decide'), ('assessor','pastoral.read'),
  ('assessor','safeguarding.raise'), ('assessor','messages.send'), ('assessor','observations.record'),
  ('assessor','reviews.write'), ('assessor','exports'),
  -- IQA
  ('iqa','learners.view_mine'), ('iqa','learners.view_all'), ('iqa','learners.edit'),
  ('iqa','assess.decide'), ('iqa','iqa.sample'), ('iqa','iqa.verdict'), ('iqa','pastoral.read'),
  ('iqa','safeguarding.raise'), ('iqa','messages.send'), ('iqa','observations.record'),
  ('iqa','reviews.write'), ('iqa','exports'), ('iqa','quality.view'), ('iqa','quality.edit'),
  -- head of department
  ('head_of_department','learners.view_mine'), ('head_of_department','learners.view_all'),
  ('head_of_department','learners.edit'), ('head_of_department','register.take'),
  ('head_of_department','assess.decide'), ('head_of_department','iqa.sample'),
  ('head_of_department','iqa.verdict'), ('head_of_department','pastoral.read'),
  ('head_of_department','notes.restricted'), ('head_of_department','safeguarding.raise'),
  ('head_of_department','messages.send'), ('head_of_department','observations.record'),
  ('head_of_department','reviews.write'), ('head_of_department','exports'),
  ('head_of_department','quality.view'), ('head_of_department','quality.edit'),
  ('head_of_department','cohorts.manage'), ('head_of_department','settings.manage'),
  ('head_of_department','staff.manage'), ('head_of_department','staff.grant_roles'),
  ('head_of_department','learner.view_as'),
  -- admin
  ('admin','learners.view_mine'), ('admin','learners.view_all'), ('admin','learners.edit'),
  ('admin','register.take'), ('admin','assess.decide'), ('admin','iqa.sample'),
  ('admin','iqa.verdict'), ('admin','pastoral.read'), ('admin','notes.restricted'),
  ('admin','safeguarding.raise'), ('admin','messages.send'), ('admin','observations.record'),
  ('admin','reviews.write'), ('admin','exports'), ('admin','quality.view'), ('admin','quality.edit'),
  ('admin','cohorts.manage'), ('admin','settings.manage'), ('admin','staff.manage'),
  ('admin','staff.grant_roles'), ('admin','learner.view_as'),
  -- support: read only, logged look at a learner
  ('support','learners.view_mine'), ('support','learners.view_all'), ('support','learner.view_as'),
  ('support','read_only'),
  -- EQA: external, read only
  ('eqa','learners.view_mine'), ('eqa','learners.view_all'), ('eqa','read_only')
) v(r, c);

-- ------------------------------------------------------------------ college_can
create or replace function public.college_can(p_action text, p_college uuid, p_student uuid default null)
returns boolean
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  v_uid uuid := auth.uid();
  s public.college_staff%rowtype;
  v_ro boolean;
begin
  if v_uid is null or p_college is null or p_action is null then
    return false;
  end if;

  -- A learner named must belong to this college (by college_students.id or user id).
  if p_student is not null and not exists (
       select 1 from public.college_students cs
       where cs.college_id = p_college and (cs.id = p_student or cs.user_id = p_student)) then
    return false;
  end if;

  -- Elec-Mate platform admins keep exactly the rights the old helpers gave
  -- them (read learners, assess, IQA). Never safeguarding, never settings.
  if p_action in ('learners.view_all', 'learners.view_mine', 'assess.decide', 'iqa.verdict')
     and public._is_platform_admin() then
    return true;
  end if;

  select st.* into s
  from public.college_staff st
  where st.college_id = p_college
    and st.user_id = v_uid
    and st.archived_at is null
    and lower(coalesce(st.status, 'active')) <> 'archived'
  order by (st.role in ('admin', 'head_of_department')) desc, st.created_at
  limit 1;

  if not found then
    -- Legacy: a profile marked college admin with no staff row (pre-2026 set-ups).
    if p_action in ('staff.manage', 'staff.grant_roles', 'settings.manage', 'cohorts.manage')
       and exists (select 1 from public.profiles p
                   where p.id = v_uid and p.college_id = p_college and p.college_role = 'admin') then
      return true;
    end if;
    return false;
  end if;

  v_ro := exists (select 1 from public.college_role_capabilities rc
                  where rc.role = s.role and rc.capability = 'read_only');

  -- Safeguarding follows the duty flags, not the role (and the no-lead fallback).
  if p_action in ('safeguarding.read', 'safeguarding.manage') then
    return public._safeguarding_reader_staff_id(p_college) is not null;
  end if;

  -- "Is this learner one of mine?"
  if p_action = 'learners.view_mine' and p_student is not null then
    return exists (
        select 1 from public.college_students cs
        join public.college_cohorts c on c.id = cs.cohort_id
        where cs.college_id = p_college and (cs.id = p_student or cs.user_id = p_student)
          and c.tutor_id = s.id)
      or exists (
        select 1 from public.college_student_assignments a
        join public.college_students cs on cs.user_id = a.student_id or cs.id = a.student_id
        where cs.college_id = p_college and (cs.id = p_student or cs.user_id = p_student)
          and v_uid in (a.tutor_id, a.assessor_id, a.iqa_id));
  end if;

  if exists (select 1 from public.college_role_capabilities rc
             where rc.role = s.role and rc.capability = p_action) then
    return true;
  end if;

  if v_ro then
    return false;
  end if;

  -- Duty flags and qualifications on top of the role.
  if p_action in ('quality.view', 'quality.edit') and coalesce(s.is_quality_nominee, false) then
    return true;
  end if;
  if p_action = 'iqa.sample' and (coalesce(s.is_quality_nominee, false) or s.iqa_qual is not null) then
    return true;
  end if;

  -- Bootstrap: a college with no linked admin / head of department yet lets
  -- its active staff run the basics. Granting roles is never bootstrapped.
  if p_action in ('staff.manage', 'cohorts.manage', 'settings.manage')
     and not exists (select 1 from public.college_staff m
                     where m.college_id = p_college and m.user_id is not null and m.archived_at is null
                       and m.role in ('admin', 'head_of_department')) then
    return true;
  end if;

  return false;
end;
$function$;
comment on function public.college_can(text, uuid, uuid) is
  'ELE-1898: the one answer to "may the caller do <capability> at <college> (for <learner>)?". Reads college_role_capabilities plus duty flags. Used by RLS, the SECURITY DEFINER helpers and get_my_college_capabilities.';
revoke all on function public.college_can(text, uuid, uuid) from public, anon;
grant execute on function public.college_can(text, uuid, uuid) to authenticated, service_role;

-- Read-only staff (support, EQA): has an active staff row whose role is read only.
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
  );
$function$;
revoke all on function public.current_user_is_read_only_staff() from public, anon;
grant execute on function public.current_user_is_read_only_staff() to authenticated, service_role;

-- ------------------------------------------------------------------ read-only staff, every college table
-- The 45 restrictive "eqa_readonly_no_*" policies now stop every read-only
-- role (support as well as EQA). Where a learner legitimately writes the
-- table, the learner's own rows are carved out so a person who is both
-- read-only staff and a learner still works as a learner.
do $do$
declare
  r record;
  v_ro constant text := 'not public.current_user_is_read_only_staff()';
  v_own text;
  v_expr text;
begin
  for r in select tablename, policyname, cmd from pg_policies
           where schemaname = 'public' and policyname like 'eqa\_readonly\_no\_%' loop
    v_own := case r.tablename
      when 'college_epa_judgements'    then $$exists (select 1 from public.college_students cs where cs.id = college_epa_judgements.college_student_id and cs.user_id = auth.uid())$$
      when 'college_ilp_goals'         then $$exists (select 1 from public.college_students cs where cs.id = college_ilp_goals.student_id and cs.user_id = auth.uid())$$
      when 'college_otj_entries'       then $$student_id = auth.uid()$$
      when 'college_resource_views'    then $$user_id = auth.uid()$$
      when 'student_message_threads'   then $$public.is_the_student(student_id)$$
      when 'student_messages'          then $$exists (select 1 from public.student_message_threads t where t.id = student_messages.thread_id and public.is_the_student(t.student_id))$$
      when 'college_inbox_read_states' then $$staff_id in (select st.id from public.college_staff st where st.user_id = auth.uid())$$
      when 'college_work_queue_state'  then $$staff_id in (select st.id from public.college_staff st where st.user_id = auth.uid())$$
      else null end;
    v_expr := case when v_own is null then v_ro else format('(%s) or (%s)', v_ro, v_own) end;
    if r.cmd = 'INSERT' then
      execute format('alter policy %I on public.%I with check (%s)', r.policyname, r.tablename, v_expr);
    elsif r.cmd = 'DELETE' then
      execute format('alter policy %I on public.%I using (%s)', r.policyname, r.tablename, v_expr);
    else
      execute format('alter policy %I on public.%I using (%s) with check (%s)', r.policyname, r.tablename, v_expr, v_expr);
    end if;
  end loop;
end $do$;

-- ------------------------------------------------------------------ helpers now ask college_can
-- Each is the LIVE definition with only the role test swapped for college_can.
CREATE OR REPLACE FUNCTION public._can_assess(p_learner uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select public._is_platform_admin()
      or exists (select 1 from public.college_student_assignments a
                  where a.student_id = p_learner
                    and auth.uid() in (a.tutor_id, a.assessor_id, a.iqa_id))
      or exists (select 1
                   from public.college_students s
                  where s.user_id = p_learner
                    and public.college_can('assess.decide', s.college_id))
      or exists (select 1 from public.portfolio_assessor_links l
                  where l.learner_id = p_learner and l.assessor_user_id = auth.uid()
                    and l.status = 'active' and l.role in ('assessor', 'iqa', 'epa_assessor'));
$function$;

CREATE OR REPLACE FUNCTION public._can_iqa(p_learner uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select public._is_platform_admin()
      or exists (select 1 from public.college_student_assignments a
                  where a.student_id = p_learner and a.iqa_id = auth.uid())
      or exists (select 1
                   from public.college_students s
                  where s.user_id = p_learner
                    and public.college_can('iqa.verdict', s.college_id))
      or exists (select 1 from public.portfolio_assessor_links l
                  where l.learner_id = p_learner and l.assessor_user_id = auth.uid()
                    and l.status = 'active' and l.role = 'iqa');
$function$;

CREATE OR REPLACE FUNCTION public._college_quality_reader(p_college uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select public.college_can('quality.view', p_college);
$function$;

CREATE OR REPLACE FUNCTION public._review_staff_can_write(p_college uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select p_college is not null
     and (public.college_can('reviews.write', p_college) or public._is_platform_admin());
$function$;

CREATE OR REPLACE FUNCTION public.is_assessing_staff_at_students_college(_student_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1
    from public.college_students s
    where s.id = _student_id
      and public.college_can('assess.decide', s.college_id)
  );
$function$;

CREATE OR REPLACE FUNCTION public.can_write_college_iqa(target_college uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select public.college_can('iqa.sample', target_college)
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and p.college_id = target_college
      and coalesce(p.college_role, '') in ('admin','iqa','lead_iqa','quality_nominee')
      and not public.current_user_is_read_only_staff()
  );
$function$;

-- ------------------------------------------------------------------ RLS that now asks college_can
-- College settings: managers (bootstrap: any active staff while no manager).
drop policy if exists college_settings_write_same_college on public.college_settings;
create policy college_settings_write_same_college on public.college_settings
  for all to authenticated
  using (public.college_can('settings.manage', college_id))
  with check (public.college_can('settings.manage', college_id));

-- The college's own row: was profile-admin only (a head of department could not).
drop policy if exists "College staff can update their college" on public.colleges;
create policy "College staff can update their college" on public.colleges
  for update to authenticated
  using (public.college_can('settings.manage', id))
  with check (public.college_can('settings.manage', id));

-- Cohorts: managers create and delete; a tutor may still update the cohort they teach.
drop policy if exists "Same-college staff insert cohorts" on public.college_cohorts;
create policy "Same-college staff insert cohorts" on public.college_cohorts
  for insert to authenticated with check (public.college_can('cohorts.manage', college_id));
drop policy if exists "Same-college staff update cohorts" on public.college_cohorts;
create policy "Same-college staff update cohorts" on public.college_cohorts
  for update to authenticated
  using (public.college_can('cohorts.manage', college_id)
         or (_ch_same_college(college_id)
             and tutor_id in (select st.id from public.college_staff st where st.user_id = auth.uid() and st.archived_at is null)))
  with check (_ch_same_college(college_id));
drop policy if exists "Same-college staff delete cohorts" on public.college_cohorts;
create policy "Same-college staff delete cohorts" on public.college_cohorts
  for delete to authenticated using (public.college_can('cohorts.manage', college_id));

-- Courses: managers.
drop policy if exists "Same-college staff insert courses" on public.college_courses;
create policy "Same-college staff insert courses" on public.college_courses
  for insert to authenticated with check (public.college_can('cohorts.manage', college_id));
drop policy if exists "Same-college staff update courses" on public.college_courses;
create policy "Same-college staff update courses" on public.college_courses
  for update to authenticated
  using (public.college_can('cohorts.manage', college_id))
  with check (public.college_can('cohorts.manage', college_id));
drop policy if exists "Same-college staff delete courses" on public.college_courses;
create policy "Same-college staff delete courses" on public.college_courses
  for delete to authenticated using (public.college_can('cohorts.manage', college_id));

-- Registers: teaching roles.
drop policy if exists "Same-college staff insert attendance" on public.college_attendance;
create policy "Same-college staff insert attendance" on public.college_attendance
  for insert to authenticated
  with check (exists (select 1 from public.college_students cs
                      where cs.id = college_attendance.student_id
                        and public.college_can('register.take', cs.college_id)));
drop policy if exists "Same-college staff update attendance" on public.college_attendance;
create policy "Same-college staff update attendance" on public.college_attendance
  for update to authenticated
  using (exists (select 1 from public.college_students cs
                 where cs.id = college_attendance.student_id
                   and public.college_can('register.take', cs.college_id)))
  with check (exists (select 1 from public.college_students cs
                      where cs.id = college_attendance.student_id
                        and public.college_can('register.take', cs.college_id)));
drop policy if exists "Same-college staff delete attendance" on public.college_attendance;
create policy "Same-college staff delete attendance" on public.college_attendance
  for delete to authenticated
  using (exists (select 1 from public.college_students cs
                 where cs.id = college_attendance.student_id
                   and public.college_can('register.take', cs.college_id)));

-- IQA sampling plans and samples: everyone at the college reads, IQA writes,
-- and no one samples their own assessing.
drop policy if exists "College staff can manage sampling plans" on public.college_iqa_sampling;
drop policy if exists "College staff read sampling plans" on public.college_iqa_sampling;
create policy "College staff read sampling plans" on public.college_iqa_sampling
  for select to authenticated
  using (college_id in (select st.college_id from public.college_staff st
                        where st.user_id = auth.uid() and st.archived_at is null)
         or public._is_platform_admin());
drop policy if exists "IQA writes sampling plans" on public.college_iqa_sampling;
create policy "IQA writes sampling plans" on public.college_iqa_sampling
  for all to authenticated
  using (public.college_can('iqa.sample', college_id))
  with check (public.college_can('iqa.sample', college_id)
              and (assessor_id is null
                   or (assessor_id <> auth.uid()
                       and assessor_id not in (select st.id from public.college_staff st where st.user_id = auth.uid()))));

drop policy if exists iqa_samples_rw on public.college_iqa_samples;
drop policy if exists "College staff read IQA samples" on public.college_iqa_samples;
create policy "College staff read IQA samples" on public.college_iqa_samples
  for select to authenticated
  using (exists (select 1 from public.college_iqa_sampling sp
                 where sp.id = college_iqa_samples.sampling_plan_id
                   and sp.college_id is not null and _ch_same_college(sp.college_id)));
drop policy if exists "IQA writes samples" on public.college_iqa_samples;
create policy "IQA writes samples" on public.college_iqa_samples
  for all to authenticated
  using (exists (select 1 from public.college_iqa_sampling sp
                 where sp.id = college_iqa_samples.sampling_plan_id
                   and sp.college_id is not null and public.college_can('iqa.sample', sp.college_id)))
  with check (exists (select 1 from public.college_iqa_sampling sp
                      where sp.id = college_iqa_samples.sampling_plan_id
                        and sp.college_id is not null and public.college_can('iqa.sample', sp.college_id)));

-- Staff invites: the same people who can give out roles.
drop policy if exists "College admins can manage invites" on public.college_invites;
create policy "College admins can manage invites" on public.college_invites
  for all to authenticated
  using (public.college_can('staff.grant_roles', college_id))
  with check (public.college_can('staff.grant_roles', college_id));

-- Pastoral notes: "Only me" now means only the author, "Course leads only"
-- means heads of department / admins (and the safeguarding lead). Before,
-- every staff member at the college could read both. Safeguarding notes are
-- unchanged (lead / deputy only).
drop policy if exists "pastoral: staff read non-safeguarding" on public.pastoral_notes;
drop policy if exists "pastoral: staff read by visibility" on public.pastoral_notes;
create policy "pastoral: staff read by visibility" on public.pastoral_notes
  for select to authenticated
  using (
    visibility <> 'safeguarding'
    and (
      author_id in (select st.id from public.college_staff st where st.user_id = auth.uid() and st.archived_at is null)
      or exists (
        select 1 from public.college_students s
        where s.id = pastoral_notes.student_id
          and (
            (visibility = 'tutors' and public.college_can('pastoral.read', s.college_id))
            or (visibility = 'course_lead'
                and (public.college_can('notes.restricted', s.college_id) or public._safeguarding_reader(s.college_id)))
          ))
    )
  );

-- ------------------------------------------------------------------ staff: last manager + audit
-- Runs as the CALLER (not security definer) so current_user tells a signed-in
-- user from the service role; the caller can already read their college's staff.
create or replace function public._college_staff_last_manager_guard()
returns trigger
language plpgsql
security invoker
set search_path to 'public'
as $function$
declare
  v_was boolean;
  v_still boolean := false;
begin
  -- Service role / migrations may do anything (a college leaving the platform).
  if current_user not in ('authenticated', 'anon') then
    return coalesce(new, old);
  end if;
  -- The college itself is being deleted (cascade): nothing to protect.
  if not exists (select 1 from public.colleges c where c.id = old.college_id) then
    return coalesce(new, old);
  end if;
  v_was := old.user_id is not null and old.archived_at is null
           and lower(coalesce(old.status, 'active')) <> 'archived'
           and old.role in ('admin', 'head_of_department');
  if not v_was then
    return coalesce(new, old);
  end if;
  if tg_op = 'UPDATE' then
    v_still := new.user_id is not null and new.archived_at is null
               and lower(coalesce(new.status, 'active')) <> 'archived'
               and new.role in ('admin', 'head_of_department')
               and new.college_id = old.college_id;
  end if;
  if v_still then
    return new;
  end if;
  if not exists (
      select 1 from public.college_staff m
      where m.college_id = old.college_id and m.id <> old.id
        and m.user_id is not null and m.archived_at is null
        and lower(coalesce(m.status, 'active')) <> 'archived'
        and m.role in ('admin', 'head_of_department')) then
    raise exception 'This is the college''s last admin or head of department. Give someone else that role first.'
      using errcode = '42501';
  end if;
  return coalesce(new, old);
end;
$function$;
revoke all on function public._college_staff_last_manager_guard() from public, anon, authenticated;

drop trigger if exists trg_college_staff_last_manager on public.college_staff;
create trigger trg_college_staff_last_manager
  before update or delete on public.college_staff
  for each row execute function public._college_staff_last_manager_guard();

create or replace function public._college_staff_audit()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_changes jsonb := '{}'::jsonb;
  v_action text;
  f text;
  r public.college_staff%rowtype := coalesce(new, old);
begin
  if not exists (select 1 from public.colleges c where c.id = r.college_id) then
    return null;  -- college deleted in the same statement
  end if;
  if tg_op = 'INSERT' then
    v_action := 'staff_added';
    v_changes := jsonb_build_object('role', jsonb_build_object('to', new.role));
  elsif tg_op = 'DELETE' then
    v_action := 'staff_removed';
    v_changes := jsonb_build_object('role', jsonb_build_object('from', old.role));
  else
    foreach f in array array['role','is_dsl','is_deputy_dsl','is_prevent_lead','is_h_and_s_lead',
                             'is_quality_nominee','is_mental_health_lead','status','archived_at','user_id','college_id'] loop
      if (to_jsonb(old) -> f) is distinct from (to_jsonb(new) -> f) then
        v_changes := v_changes || jsonb_build_object(f, jsonb_build_object('from', to_jsonb(old) -> f, 'to', to_jsonb(new) -> f));
      end if;
    end loop;
    if v_changes = '{}'::jsonb then
      return null;
    end if;
    v_action := case
      when v_changes ? 'role' then 'staff_role_changed'
      when v_changes ?| array['is_dsl','is_deputy_dsl','is_prevent_lead','is_h_and_s_lead','is_quality_nominee','is_mental_health_lead'] then 'staff_duties_changed'
      when v_changes ?| array['status','archived_at','college_id'] then 'staff_status_changed'
      else 'staff_account_linked' end;
  end if;
  insert into public.college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (r.college_id, auth.uid(), v_action, 'staff', r.id,
          jsonb_build_object('name', r.name, 'changes', v_changes));
  return null;
end;
$function$;
revoke all on function public._college_staff_audit() from public, anon, authenticated;

drop trigger if exists trg_college_staff_audit on public.college_staff;
create trigger trg_college_staff_audit
  after insert or update or delete on public.college_staff
  for each row execute function public._college_staff_audit();

-- ------------------------------------------------------------------ RPCs for the app
create or replace function public.get_my_college_capabilities(p_college uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  v_uid uuid := auth.uid();
  v_college uuid;
  s public.college_staff%rowtype;
  v_can jsonb := '{}'::jsonb;
  k text;
begin
  if v_uid is null then
    return jsonb_build_object('error', 'not signed in');
  end if;
  v_college := coalesce(
    p_college,
    (select st.college_id from public.college_staff st
      where st.user_id = v_uid and st.archived_at is null
      order by (st.role in ('admin','head_of_department')) desc, st.created_at limit 1),
    (select p.college_id from public.profiles p where p.id = v_uid));
  if v_college is null then
    return jsonb_build_object('college_id', null, 'role', null, 'can', '{}'::jsonb);
  end if;

  select st.* into s from public.college_staff st
  where st.college_id = v_college and st.user_id = v_uid and st.archived_at is null
  order by (st.role in ('admin','head_of_department')) desc, st.created_at limit 1;

  for k in select key from public.college_capabilities order by sort loop
    v_can := v_can || jsonb_build_object(k, public.college_can(k, v_college));
  end loop;

  return jsonb_build_object(
    'college_id', v_college,
    'staff_id', s.id,
    'role', s.role,
    'name', s.name,
    'flags', jsonb_build_object(
      'dsl', coalesce(s.is_dsl, false),
      'deputy_dsl', coalesce(s.is_deputy_dsl, false),
      'prevent_lead', coalesce(s.is_prevent_lead, false),
      'h_and_s_lead', coalesce(s.is_h_and_s_lead, false),
      'quality_nominee', coalesce(s.is_quality_nominee, false),
      'mental_health_lead', coalesce(s.is_mental_health_lead, false)),
    'has_manager', exists (select 1 from public.college_staff m
                           where m.college_id = v_college and m.user_id is not null and m.archived_at is null
                             and m.role in ('admin','head_of_department')),
    'also_learner', exists (select 1 from public.college_students cs where cs.user_id = v_uid),
    'platform_admin', public._is_platform_admin(),
    'can', v_can);
end;
$function$;
revoke all on function public.get_my_college_capabilities(uuid) from public, anon;
grant execute on function public.get_my_college_capabilities(uuid) to authenticated;

create or replace function public.get_college_role_matrix()
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $function$
  select jsonb_build_object(
    'capabilities', (select jsonb_agg(jsonb_build_object('key', c.key, 'label', c.label, 'description', c.description) order by c.sort)
                     from public.college_capabilities c),
    'roles', (select jsonb_object_agg(x.role, x.caps) from (
                select rc.role, jsonb_agg(rc.capability order by c.sort) caps
                from public.college_role_capabilities rc join public.college_capabilities c on c.key = rc.capability
                group by rc.role) x));
$function$;
revoke all on function public.get_college_role_matrix() from public, anon;
grant execute on function public.get_college_role_matrix() to authenticated;

-- The IQA screen sets the next EQA visit; the colleges row is managers only,
-- so this was silently refused for an IQA (0 rows, optimistic UI said saved).
create or replace function public.set_college_next_eqa_visit(p_college uuid, p_date date)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if not (public.college_can('iqa.sample', p_college) or public.college_can('settings.manage', p_college)) then
    raise exception 'only an IQA or a college manager can set the EQA visit' using errcode = '42501';
  end if;
  update public.colleges set next_eqa_visit = p_date, updated_at = now() where id = p_college;
  insert into public.college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (p_college, auth.uid(), 'eqa_visit_set', 'college', p_college, jsonb_build_object('date', p_date));
  return jsonb_build_object('ok', true, 'next_eqa_visit', p_date);
end;
$function$;
revoke all on function public.set_college_next_eqa_visit(uuid, date) from public, anon;
grant execute on function public.set_college_next_eqa_visit(uuid, date) to authenticated;

-- Support staff open a learner's record read only; every look is logged.
create or replace function public.log_college_view_as(p_student uuid)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_college uuid;
  v_sid uuid;
begin
  select cs.college_id, cs.id into v_college, v_sid from public.college_students cs
  where cs.id = p_student or cs.user_id = p_student limit 1;
  if v_college is null or not public.college_can('learner.view_as', v_college, v_sid) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  -- One line per person per learner per hour is enough for the log.
  if not exists (select 1 from public.college_activity a
                 where a.actor_id = auth.uid() and a.action = 'viewed_learner_as_support'
                   and a.entity_id = v_sid and a.created_at > now() - interval '1 hour') then
    insert into public.college_activity (college_id, actor_id, action, entity_type, entity_id, details)
    values (v_college, auth.uid(), 'viewed_learner_as_support', 'student', v_sid, '{}'::jsonb);
  end if;
  return jsonb_build_object('ok', true);
end;
$function$;
revoke all on function public.log_college_view_as(uuid) from public, anon;
grant execute on function public.log_college_view_as(uuid) to authenticated;

commit;
