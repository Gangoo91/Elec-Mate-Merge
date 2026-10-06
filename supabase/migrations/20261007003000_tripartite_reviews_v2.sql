-- Tripartite progress reviews (ELE-1880) and the employer's side of them (ELE-1879).
-- Applied live as migration tripartite_reviews_v2.
--
-- Source: Apprenticeship funding rules, August 2025 to July 2026, paras 97–98
-- and the evidence box on p.55; para 40.5 for learning support.
--  97    a progress review at least every 3 CALENDAR months: a review on 1 Aug
--        means the next by 30 Nov (end of the third month after).
--  97.1  another frequency only with an evidenced reason agreed with the employer.
--  97.2  three-way: face to face, virtual or by email.
--  97.2.1 an employer who cannot attend must be given the chance to contribute,
--        and must attend in the majority of reviews.
--  97.2.2 a summary shared with all parties, signed at least by provider + apprentice.
--  97.3 / 40.5.2 learning support can be discussed only with the apprentice's
--        consent for the employer to know, with evidence of both discussions.
--  98.1–98.6 what the review covers; 98.4.1 when the employer must re-sign the plan.
--
-- Zero reviews existed in production (6 Oct), so the table is reshaped freely.

-- 0. Review frequency per learner (97.1) ------------------------------------
alter table public.college_students
  add column if not exists review_frequency_months int,
  add column if not exists review_frequency_reason text,
  add column if not exists review_frequency_agreed_at timestamptz;
alter table public.college_students drop constraint if exists college_students_review_frequency_chk;
alter table public.college_students add constraint college_students_review_frequency_chk
  check (review_frequency_months is null or (review_frequency_months between 1 and 6
         and length(trim(coalesce(review_frequency_reason, ''))) >= 5
         and review_frequency_agreed_at is not null));

-- 1. The review record -------------------------------------------------------
alter table public.college_tripartite_reviews
  add column if not exists employer_id uuid references public.college_employers(id) on delete set null,
  add column if not exists mode text,
  add column if not exists held_on date,
  add column if not exists employer_attendance text,
  add column if not exists employer_invited_at timestamptz,
  add column if not exists employer_viewed_at timestamptz,
  add column if not exists employer_contact_log jsonb not null default '[]'::jsonb,
  add column if not exists employer_input jsonb,
  add column if not exists learner_input jsonb,
  add column if not exists snapshot jsonb,
  add column if not exists content_hash text,
  add column if not exists locked_at timestamptz,
  add column if not exists shared_at timestamptz,
  add column if not exists employer_token text;
update public.college_tripartite_reviews
   set employer_token = encode(extensions.gen_random_bytes(24), 'hex') where employer_token is null;
alter table public.college_tripartite_reviews
  alter column employer_token set default encode(extensions.gen_random_bytes(24), 'hex'),
  alter column employer_token set not null;
create unique index if not exists college_tripartite_reviews_employer_token_key
  on public.college_tripartite_reviews(employer_token);

alter table public.college_tripartite_reviews drop constraint if exists college_tripartite_reviews_mode_chk;
alter table public.college_tripartite_reviews add constraint college_tripartite_reviews_mode_chk
  check (mode is null or mode in ('in_person', 'video', 'phone', 'email'));
alter table public.college_tripartite_reviews drop constraint if exists college_tripartite_reviews_attendance_chk;
alter table public.college_tripartite_reviews add constraint college_tripartite_reviews_attendance_chk
  check (employer_attendance is null or employer_attendance in ('attended', 'contributed', 'invited_no_response'));

-- Nobody reads the employer's link off the table: staff fetch it through an
-- RPC. A column revoke does nothing under a table grant, so grant by column.
revoke select, update on public.college_tripartite_reviews from anon, authenticated;
do $$
declare cols text;
begin
  select string_agg(quote_ident(column_name), ', ' order by ordinal_position) into cols
    from information_schema.columns
   where table_schema = 'public' and table_name = 'college_tripartite_reviews' and column_name <> 'employer_token';
  execute format('grant select (%s) on public.college_tripartite_reviews to authenticated', cols);
  execute format('grant update (%s) on public.college_tripartite_reviews to authenticated', cols);
end $$;

comment on table public.college_tripartite_reviews is
  '[COLLEGE] Tripartite progress reviews (funding rules 97–98): schedule, structured outcomes, frozen snapshot, three signatures, employer-opportunity evidence. Scope: one college''s learners. Used by: College Hub reviews board + Student 360, apprentice My college, public /review/:token, Employer Hub apprentices, employer-portal-view. Rule: signatures, lock and employer fields change only through the tripartite RPCs; locked rows are immutable.';

-- 2. Agreed actions (98.6), checked at the next review (98.1) ---------------
create table if not exists public.college_review_actions (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.college_tripartite_reviews(id) on delete cascade,
  college_id uuid not null,
  student_id uuid not null references public.college_students(id) on delete cascade,
  action text not null check (length(trim(action)) between 3 and 500),
  owner_party text not null check (owner_party in ('apprentice', 'employer', 'college')),
  due_date date,
  status text not null default 'open' check (status in ('open', 'done', 'not_done', 'dropped')),
  outcome_note text,
  closed_in_review_id uuid references public.college_tripartite_reviews(id) on delete set null,
  closed_at timestamptz,
  position int not null default 0,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now()
);
create index if not exists college_review_actions_review_idx on public.college_review_actions(review_id);
create index if not exists college_review_actions_student_open_idx on public.college_review_actions(student_id) where status = 'open';
alter table public.college_review_actions enable row level security;
comment on table public.college_review_actions is
  '[COLLEGE] Actions agreed at a tripartite review (98.6), each closed at a later review (98.1). Scope: one college''s learners. Used by: TripartiteReviewSheet, apprentice My college, public /review/:token. Rule: frozen once its review (or the review that closed it) is locked.';

-- 3. Who may act ------------------------------------------------------------
create or replace function public._review_staff_can(p_college uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select p_college is not null and (
       exists (select 1 from college_staff st
                where st.user_id = auth.uid() and st.college_id = p_college and st.archived_at is null)
    or public._is_platform_admin());
$$;
revoke all on function public._review_staff_can(uuid) from public, anon;
grant execute on function public._review_staff_can(uuid) to authenticated;

drop policy if exists "tripartite_select" on public.college_tripartite_reviews;
drop policy if exists "tripartite_insert" on public.college_tripartite_reviews;
drop policy if exists "tripartite_update" on public.college_tripartite_reviews;
drop policy if exists "tripartite_delete" on public.college_tripartite_reviews;
create policy "tripartite_select" on public.college_tripartite_reviews for select to authenticated
  using (public._review_staff_can(college_id)
         or exists (select 1 from college_students s where s.id = student_id and s.user_id = auth.uid()));
create policy "tripartite_insert" on public.college_tripartite_reviews for insert to authenticated
  with check (public._review_staff_can(college_id)
              and exists (select 1 from college_students s where s.id = student_id and s.college_id = college_tripartite_reviews.college_id));
create policy "tripartite_update" on public.college_tripartite_reviews for update to authenticated
  using (public._review_staff_can(college_id)) with check (public._review_staff_can(college_id));
create policy "tripartite_delete" on public.college_tripartite_reviews for delete to authenticated
  using (public._review_staff_can(college_id) and locked_at is null);

drop policy if exists "review_actions_select" on public.college_review_actions;
drop policy if exists "review_actions_write" on public.college_review_actions;
create policy "review_actions_select" on public.college_review_actions for select to authenticated
  using (public._review_staff_can(college_id)
         or exists (select 1 from college_students s where s.id = student_id and s.user_id = auth.uid()));
create policy "review_actions_write" on public.college_review_actions for all to authenticated
  using (public._review_staff_can(college_id)) with check (public._review_staff_can(college_id));

-- The learner now signs and adds their view through RPCs; the old direct-write
-- guard goes.
drop trigger if exists trg_tripartite_learner_guard on public.college_tripartite_reviews;
drop function if exists public._tripartite_learner_guard();

-- 4. Guards: the RPC-only fields, and nothing changes once locked ------------
create or replace function public.tg_tripartite_review_guard()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if coalesce(auth.role(), '') <> 'authenticated'
     or current_setting('app.tripartite_rpc', true) = 'on' then
    return coalesce(new, old);
  end if;

  if tg_op = 'INSERT' then
    if new.locked_at is not null or new.snapshot is not null or new.employer_input is not null
       or new.learner_input is not null or new.signatures <> '{}'::jsonb
       or new.status = 'completed' or new.shared_at is not null or new.employer_contact_log <> '[]'::jsonb
       or new.employer_invited_at is not null then
      raise exception 'Start a review empty; it is filled in as it happens.' using errcode = 'check_violation';
    end if;
    return new;
  end if;

  if tg_op = 'DELETE' then
    if old.locked_at is not null then
      raise exception 'A signed review is part of the evidence pack and cannot be deleted.' using errcode = 'check_violation';
    end if;
    return old;
  end if;

  if old.locked_at is not null then
    raise exception 'This review is signed off and cannot be changed.' using errcode = 'check_violation';
  end if;
  if new.signatures is distinct from old.signatures or new.locked_at is distinct from old.locked_at
     or new.snapshot is distinct from old.snapshot or new.content_hash is distinct from old.content_hash
     or new.employer_input is distinct from old.employer_input or new.learner_input is distinct from old.learner_input
     or new.employer_contact_log is distinct from old.employer_contact_log
     or new.employer_invited_at is distinct from old.employer_invited_at
     or new.employer_viewed_at is distinct from old.employer_viewed_at
     or new.shared_at is distinct from old.shared_at or new.completed_at is distinct from old.completed_at
     or new.held_on is distinct from old.held_on
     or (new.status = 'completed' and old.status <> 'completed')
     or new.student_id is distinct from old.student_id or new.college_id is distinct from old.college_id then
    raise exception 'Use Sign off to finish a review.' using errcode = 'check_violation';
  end if;
  return new;
end; $$;
drop trigger if exists trg_tripartite_review_guard on public.college_tripartite_reviews;
create trigger trg_tripartite_review_guard before insert or update or delete on public.college_tripartite_reviews
  for each row execute function public.tg_tripartite_review_guard();

create or replace function public.tg_review_actions_guard()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare
  v_locked boolean;
  v_closer_locked boolean;
begin
  if coalesce(auth.role(), '') <> 'authenticated'
     or current_setting('app.tripartite_rpc', true) = 'on' then
    return coalesce(new, old);
  end if;
  select locked_at is not null into v_locked from college_tripartite_reviews
   where id = coalesce(new.review_id, old.review_id);

  if tg_op = 'INSERT' then
    if v_locked then
      raise exception 'This review is signed off; add the action at the next review.' using errcode = 'check_violation';
    end if;
    if new.status <> 'open' or new.closed_in_review_id is not null then
      raise exception 'A new action starts open.' using errcode = 'check_violation';
    end if;
    select r.student_id = new.student_id and r.college_id = new.college_id into v_locked
      from college_tripartite_reviews r where r.id = new.review_id;
    if not coalesce(v_locked, false) then
      raise exception 'Action does not match its review.' using errcode = 'check_violation';
    end if;
    return new;
  end if;

  if tg_op = 'DELETE' then
    if v_locked then
      raise exception 'This review is signed off and its actions cannot be removed.' using errcode = 'check_violation';
    end if;
    return old;
  end if;

  -- UPDATE
  if old.closed_in_review_id is not null then
    select locked_at is not null into v_closer_locked from college_tripartite_reviews where id = old.closed_in_review_id;
    if v_closer_locked then
      raise exception 'This action was checked at a signed review and cannot be changed.' using errcode = 'check_violation';
    end if;
  end if;
  if new.review_id is distinct from old.review_id or new.student_id is distinct from old.student_id
     or new.college_id is distinct from old.college_id then
    raise exception 'Actions cannot move between reviews.' using errcode = 'check_violation';
  end if;
  if v_locked then
    -- An earlier review's action: only its outcome, recorded at a later, open review.
    if new.action is distinct from old.action or new.owner_party is distinct from old.owner_party
       or new.due_date is distinct from old.due_date or new.position is distinct from old.position then
      raise exception 'The wording of an agreed action cannot change after sign-off.' using errcode = 'check_violation';
    end if;
    if new.closed_in_review_id is not null then
      select locked_at is not null into v_closer_locked from college_tripartite_reviews
       where id = new.closed_in_review_id and student_id = old.student_id;
      if v_closer_locked is null or v_closer_locked then
        raise exception 'Record the outcome in this learner''s current review.' using errcode = 'check_violation';
      end if;
    end if;
  end if;
  return new;
end; $$;
drop trigger if exists trg_review_actions_guard on public.college_review_actions;
create trigger trg_review_actions_guard before insert or update or delete on public.college_review_actions
  for each row execute function public.tg_review_actions_guard();

-- 5. When the next review is due (97, 97.1) ---------------------------------
-- End of the calendar month N months after the last review (or the start).
create or replace function public.tripartite_due_by(p_student uuid)
returns date language sql stable security definer set search_path to 'public' as $$
  select (date_trunc('month', x.base + make_interval(months => x.m)) + interval '1 month - 1 day')::date
    from (
      select coalesce(
               (select max(coalesce(r.held_on, r.scheduled_at::date))
                  from college_tripartite_reviews r
                 where r.student_id = s.id and r.locked_at is not null),
               s.start_date, s.created_at::date) as base,
             coalesce(s.review_frequency_months, 3) as m
        from college_students s where s.id = p_student
    ) x;
$$;
grant execute on function public.tripartite_due_by(uuid) to authenticated;

-- 6. Pre-fill: everything the review needs, from the record (98.1–98.5) -----
-- The off-the-job figure without the caller check, for callers that have
-- already checked access (the review pre-fill, the employer's token page).
do $$
declare d text;
begin
  d := pg_get_functiondef('public.get_otj_summary(uuid)'::regprocedure);
  if position('_otj_summary_core' in d) > 0 then
    return;  -- already split; change the figure in _otj_summary_core from now on
  end if;
  d := replace(d, 'FUNCTION public.get_otj_summary(p_user uuid DEFAULT NULL::uuid)', 'FUNCTION public._otj_summary_core(p_user uuid)');
  d := replace(d, '  if not public._otj_can_read(u) then
    raise exception ''not authorised'' using errcode = ''42501'';
  end if;
', '');
  if position('_otj_can_read' in d) > 0 then
    raise exception 'get_otj_summary changed shape; cannot build _otj_summary_core';
  end if;
  execute d;
end $$;
revoke all on function public._otj_summary_core(uuid) from public, anon, authenticated;

-- One figure: get_otj_summary is now the caller check plus the core.
create or replace function public.get_otj_summary(p_user uuid default null)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare u uuid := coalesce(p_user, auth.uid());
begin
  if not public._otj_can_read(u) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return public._otj_summary_core(u);
end; $$;

-- Internal: never granted. get_tripartite_prefill checks the caller first.
create or replace function public._tripartite_prefill(p_review uuid)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  r college_tripartite_reviews;
  s college_students;
  v_since date;
  v_prev uuid;
  v_otj jsonb;
begin
  select * into r from college_tripartite_reviews where id = p_review;
  if r.id is null then raise exception 'not found' using errcode = 'P0002'; end if;
  select * into s from college_students where id = r.student_id;

  select p.id, coalesce(p.held_on, p.scheduled_at::date) into v_prev, v_since
    from college_tripartite_reviews p
   where p.student_id = r.student_id and p.locked_at is not null and p.id <> r.id
     and coalesce(p.held_on, p.scheduled_at::date) <= coalesce(r.held_on, r.scheduled_at::date, current_date)
   order by coalesce(p.held_on, p.scheduled_at::date) desc limit 1;
  v_since := coalesce(v_since, s.start_date, s.created_at::date);

  if s.user_id is not null then
    v_otj := public._otj_summary_core(s.user_id);
  end if;

  return jsonb_build_object(
    'learner', jsonb_build_object(
      'name', s.name, 'start_date', s.start_date, 'expected_end_date', s.expected_end_date,
      'course', (select c.name from college_courses c where c.id = s.course_id),
      'cohort', (select c.name from college_cohorts c where c.id = s.cohort_id),
      'employer', (select e.company_name from college_employers e where e.id = coalesce(r.employer_id, s.employer_id)),
      'progress_percent', coalesce(s.progress_percent, 0)),
    'since', v_since,
    'previous_review_id', v_prev,
    'due_by', public.tripartite_due_by(s.id),
    'otj', case when v_otj is null then null else jsonb_build_object(
      'counted_hours', v_otj->'counted_hours', 'required_hours', v_otj->'required_hours',
      'planned_to_date_hours', v_otj->'planned_to_date_hours', 'pending_hours', v_otj->'pending_hours',
      'app_learning_hours', v_otj->'app_learning_hours', 'risk', v_otj->'risk',
      'weekly_needed_hours', v_otj->'weekly_needed_hours',
      'slippage_hours', greatest(0, coalesce((v_otj->>'planned_to_date_hours')::numeric, 0)
                                   - coalesce((v_otj->>'counted_hours')::numeric, 0))) end,
    -- Training delivered since the last review (98.1), by type
    'training_since', coalesce((
      select jsonb_agg(jsonb_build_object('type', t.activity_type, 'hours', t.h) order by t.h desc)
        from (select o.activity_type, round(sum(o.duration_minutes) / 60.0, 1) h
                from college_otj_entries o
               where o.student_id = s.user_id and o.activity_date >= v_since
                 and o.verification_status in ('verified', 'verified_by_employer')
               group by 1) t), '[]'::jsonb),
    'hours_since', coalesce((
      select round(sum(o.duration_minutes) / 60.0, 1) from college_otj_entries o
       where o.student_id = s.user_id and o.activity_date >= v_since
         and o.verification_status in ('verified', 'verified_by_employer')), 0),
    'attendance_since', (
      select jsonb_build_object('sessions', count(*),
               'percent', round(100.0 * count(*) filter (where a.status in ('Present', 'Late')) / nullif(count(*), 0)))
        from college_attendance a where a.student_id = s.id and a.date >= v_since),
    -- Evidence (98.2)
    'evidence_since', jsonb_build_object(
      'signed_off', (select count(*) from portfolio_submissions p
                      where p.user_id = s.user_id and p.signed_off_at >= v_since),
      'awaiting_assessment', (select count(*) from portfolio_submissions p
                               where p.user_id = s.user_id and p.status in ('submitted', 'resubmitted', 'in_review')),
      'witness_statements', (select count(*) from portfolio_witness_statements w
                              where w.learner_id = s.user_id and w.signed_at >= v_since)),
    -- Actions from earlier reviews still to check (98.1)
    'open_actions', coalesce((
      select jsonb_agg(jsonb_build_object('id', a.id, 'action', a.action, 'owner_party', a.owner_party,
                                          'due_date', a.due_date, 'status', a.status, 'outcome_note', a.outcome_note,
                                          'closed_in_review_id', a.closed_in_review_id)
                       order by a.created_at, a.position)
        from college_review_actions a
       where a.student_id = s.id and a.review_id <> r.id
         and (a.status = 'open' or a.closed_in_review_id = r.id)), '[]'::jsonb),
    -- The training plan's goals (98.3, 98.4)
    'goals', coalesce((
      select jsonb_agg(jsonb_build_object('title', g.title, 'status', g.status, 'target_date', g.target_date)
                       order by g.position)
        from college_ilp_goals g
        join college_ilps i on i.id = g.ilp_id and i.is_current
       where g.student_id = s.id), '[]'::jsonb),
    'support_needs', exists (select 1 from college_ilps i where i.student_id = s.id and i.is_current
                              and length(trim(coalesce(i.support_needs, ''))) > 0)
                     or coalesce(array_length(s.send_flags, 1), 0) > 0 or s.ehcp_ref is not null
  );
end; $$;
revoke all on function public._tripartite_prefill(uuid) from public, anon, authenticated;

create or replace function public.get_tripartite_prefill(p_review uuid)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare r record;
begin
  select t.college_id, s.user_id into r
    from college_tripartite_reviews t join college_students s on s.id = t.student_id where t.id = p_review;
  if r.college_id is null or not (public._review_staff_can(r.college_id) or r.user_id = auth.uid()) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return public._tripartite_prefill(p_review);
end; $$;
revoke all on function public.get_tripartite_prefill(uuid) from public, anon;
grant execute on function public.get_tripartite_prefill(uuid) to authenticated;

-- 7. The college's review board (who is due, who is overdue) ----------------
create or replace function public.get_review_board()
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_college uuid;
  v_today date := (now() at time zone 'Europe/London')::date;
begin
  select st.college_id into v_college from college_staff st
   where st.user_id = auth.uid() and st.archived_at is null
   order by st.created_at desc limit 1;
  if v_college is null then raise exception 'not authorised' using errcode = '42501'; end if;

  return (
    with learners as (
      select s.id, s.user_id, s.name, s.start_date, s.cohort_id, s.employer_id,
             public.tripartite_due_by(s.id) as due_by,
             s.review_frequency_months
        from college_students s
       where s.college_id = v_college
         and lower(coalesce(s.status, '')) not in ('withdrawn', 'completed', 'archived')
    ), last_done as (
      select distinct on (r.student_id) r.student_id, coalesce(r.held_on, r.scheduled_at::date) as held_on
        from college_tripartite_reviews r
       where r.college_id = v_college and r.locked_at is not null
       order by r.student_id, coalesce(r.held_on, r.scheduled_at::date) desc
    ), upcoming as (
      select distinct on (r.student_id) r.student_id, r.id, r.scheduled_at, r.status, r.locked_at,
             r.signatures, r.employer_input is not null as employer_input, r.learner_input is not null as learner_input,
             r.employer_invited_at
        from college_tripartite_reviews r
       where r.college_id = v_college and r.status <> 'cancelled' and r.completed_at is null
       order by r.student_id, r.scheduled_at nulls last
    ), emp as (
      select r.student_id,
             count(*) as total,
             count(*) filter (where r.employer_attendance = 'attended') as attended
        from college_tripartite_reviews r
       where r.college_id = v_college and r.locked_at is not null
       group by 1
    )
    select jsonb_build_object(
      'today', v_today,
      'rows', coalesce(jsonb_agg(jsonb_build_object(
        'student_id', l.id, 'user_id', l.user_id, 'name', l.name,
        'cohort', (select c.name from college_cohorts c where c.id = l.cohort_id),
        'employer', (select e.company_name from college_employers e where e.id = l.employer_id),
        'last_held_on', d.held_on, 'due_by', l.due_by, 'frequency_months', coalesce(l.review_frequency_months, 3),
        'next', case when u.id is null then null else jsonb_build_object(
          'id', u.id, 'scheduled_at', u.scheduled_at, 'status', u.status, 'locked', u.locked_at is not null,
          'tutor_signed', (u.signatures ? 'tutor_signed_at'), 'learner_signed', (u.signatures ? 'student_signed_at'),
          'employer_signed', (u.signatures ? 'employer_signed_at'),
          'employer_input', u.employer_input, 'learner_input', u.learner_input,
          'employer_invited', u.employer_invited_at is not null) end,
        'employer_attended', coalesce(e.attended, 0), 'reviews_done', coalesce(e.total, 0),
        'state', case
          when u.locked_at is not null then 'signatures'
          when l.due_by < v_today then 'overdue'
          when u.id is not null and u.scheduled_at::date <= l.due_by then 'scheduled'
          when u.id is not null then 'late'
          when l.due_by <= v_today + 21 then 'due_soon'
          else 'ok' end
      ) order by l.due_by, l.name), '[]'::jsonb))
      from learners l
      left join last_done d on d.student_id = l.id
      left join upcoming u on u.student_id = l.id
      left join emp e on e.student_id = l.id
  );
end; $$;
grant execute on function public.get_review_board() to authenticated;

-- 8. Sign off: the tutor freezes the record and signs (97.2.2, evidence box) -
create or replace function public.sign_off_tripartite_review(p_review uuid, p_held_on date default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  r college_tripartite_reviews;
  v_name text;
  v_prefill jsonb;
  v_actions jsonb;
  v_unchecked int;
  v_held date;
  v_snapshot jsonb;
  v_learner uuid;
begin
  select * into r from college_tripartite_reviews where id = p_review for update;
  if r.id is null or not public._review_staff_can(r.college_id) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  if r.locked_at is not null then return jsonb_build_object('error', 'Already signed off.'); end if;
  if r.status = 'cancelled' then return jsonb_build_object('error', 'This review was cancelled.'); end if;
  v_held := coalesce(p_held_on, r.scheduled_at::date, (now() at time zone 'Europe/London')::date);
  if v_held > (now() at time zone 'Europe/London')::date then
    return jsonb_build_object('error', 'Sign off after the review has taken place.');
  end if;
  if r.mode is null then return jsonb_build_object('error', 'Say how the review was held.'); end if;
  if r.employer_attendance is null then
    return jsonb_build_object('error', 'Record whether the employer attended or contributed.');
  end if;
  if r.employer_attendance <> 'attended' and r.employer_invited_at is null then
    return jsonb_build_object('error', 'Send the employer their link first, so there is evidence they were asked to contribute.');
  end if;
  if length(trim(coalesce(r.outcomes->>'summary', ''))) < 20 then
    return jsonb_build_object('error', 'Write a short summary of the discussion.');
  end if;
  if coalesce(r.outcomes->>'plan_change', '') = '' then
    return jsonb_build_object('error', 'Say whether the training plan changed.');
  end if;
  select count(*) into v_unchecked from college_review_actions a
   where a.student_id = r.student_id and a.review_id <> r.id and a.status = 'open';
  if v_unchecked > 0 then
    return jsonb_build_object('error', 'Check every action from the last review first.');
  end if;
  if not exists (select 1 from college_review_actions a where a.review_id = r.id) then
    return jsonb_build_object('error', 'Agree at least one action for the next review.');
  end if;

  v_prefill := public._tripartite_prefill(r.id);
  select coalesce(jsonb_agg(jsonb_build_object('action', a.action, 'owner_party', a.owner_party, 'due_date', a.due_date)
                            order by a.position, a.created_at), '[]'::jsonb)
    into v_actions from college_review_actions a where a.review_id = r.id;
  select coalesce(nullif(trim(full_name), ''), 'Tutor') into v_name from profiles where id = auth.uid();

  v_snapshot := jsonb_build_object(
    'prefill', v_prefill,
    'checked_actions', coalesce((
      select jsonb_agg(jsonb_build_object('action', a.action, 'owner_party', a.owner_party,
                                          'status', a.status, 'outcome_note', a.outcome_note))
        from college_review_actions a where a.closed_in_review_id = r.id), '[]'::jsonb),
    'outcomes', r.outcomes, 'agreed_actions', v_actions,
    'mode', r.mode, 'held_on', v_held, 'employer_attendance', r.employer_attendance,
    'employer_input', r.employer_input, 'learner_input', r.learner_input,
    'employer_must_sign', coalesce(r.outcomes->>'plan_change', '') in ('content', 'end_date', 'otj_release'),
    'tutor_name', v_name);

  perform set_config('app.tripartite_rpc', 'on', true);
  update college_tripartite_reviews
     set locked_at = now(), held_on = v_held, status = 'in_progress', snapshot = v_snapshot,
         content_hash = md5(v_snapshot::text),
         signatures = signatures || jsonb_build_object('tutor_signed_at', now(), 'tutor_name', v_name,
                                                       'tutor_user_id', auth.uid())
   where id = r.id;
  perform set_config('app.tripartite_rpc', 'off', true);

  select user_id into v_learner from college_students where id = r.student_id;
  if v_learner is not null then
    begin
      insert into user_notifications (user_id, type, title, message, link, metadata)
      values (v_learner, 'tripartite_sign', 'Sign your progress review',
              v_name || ' has written up your review from ' || to_char(v_held, 'DD Mon') || '. Read it and sign.',
              '/apprentice/college/plan?review=' || r.id, jsonb_build_object('review_id', r.id));
    exception when others then null;
    end;
  end if;
  return jsonb_build_object('success', true, 'employer_must_sign', v_snapshot->'employer_must_sign');
end; $$;
grant execute on function public.sign_off_tripartite_review(uuid, date) to authenticated;

-- 9. The apprentice signs (97.2.2). Two signatures complete the review. ------
create or replace function public.sign_tripartite_review_learner(p_review uuid)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  r college_tripartite_reviews;
  s college_students;
  v_name text;
begin
  select * into r from college_tripartite_reviews where id = p_review for update;
  select * into s from college_students where id = r.student_id;
  if r.id is null or s.user_id is distinct from auth.uid() then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  if r.locked_at is null then return jsonb_build_object('error', 'Your tutor has not finished writing this up yet.'); end if;
  if r.signatures ? 'student_signed_at' then return jsonb_build_object('error', 'You have already signed.'); end if;
  select coalesce(nullif(trim(full_name), ''), s.name) into v_name from profiles where id = auth.uid();

  perform set_config('app.tripartite_rpc', 'on', true);
  update college_tripartite_reviews
     set signatures = signatures || jsonb_build_object('student_signed_at', now(), 'student_name', v_name),
         status = 'completed', completed_at = now()
   where id = r.id;
  perform set_config('app.tripartite_rpc', 'off', true);

  begin
    insert into user_notifications (user_id, type, title, message, link, metadata)
    select st.user_id, 'tripartite_signed', s.name || ' signed their progress review',
           'The review from ' || to_char(r.held_on, 'DD Mon') || ' is complete.',
           '/college/reviews?review=' || r.id, jsonb_build_object('review_id', r.id)
      from college_staff st where st.id = r.tutor_staff_id and st.user_id is not null;
  exception when others then null;
  end;
  return jsonb_build_object('success', true);
end; $$;
grant execute on function public.sign_tripartite_review_learner(uuid) to authenticated;

-- 10. The apprentice's view before the review ------------------------------
create or replace function public.submit_tripartite_learner_input(p_review uuid, p_input jsonb)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  r college_tripartite_reviews;
begin
  select * into r from college_tripartite_reviews where id = p_review for update;
  if r.id is null or not exists (select 1 from college_students s where s.id = r.student_id and s.user_id = auth.uid()) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  if r.locked_at is not null or r.status = 'cancelled' then
    return jsonb_build_object('error', 'This review is closed.');
  end if;
  if coalesce(p_input->>'progress', '') not in ('ahead', 'on_track', 'behind') then
    return jsonb_build_object('error', 'Say how you think it is going.');
  end if;
  perform set_config('app.tripartite_rpc', 'on', true);
  update college_tripartite_reviews
     set learner_input = jsonb_build_object(
           'progress', p_input->>'progress',
           'going_well', left(trim(coalesce(p_input->>'going_well', '')), 1500),
           'focus_next', left(trim(coalesce(p_input->>'focus_next', '')), 1500),
           'concerns', left(trim(coalesce(p_input->>'concerns', '')), 1500),
           'at', now())
   where id = r.id;
  perform set_config('app.tripartite_rpc', 'off', true);
  return jsonb_build_object('success', true);
end; $$;
grant execute on function public.submit_tripartite_learner_input(uuid, jsonb) to authenticated;

-- 11. The employer's side, by link, no account (97.2.1, ELE-1879) ----------
create or replace function public.get_tripartite_employer_link(p_review uuid)
returns text language plpgsql stable security definer set search_path to 'public' as $$
declare r record;
begin
  select college_id, employer_token into r from college_tripartite_reviews where id = p_review;
  if r.college_id is null or not public._review_staff_can(r.college_id) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return r.employer_token;
end; $$;
grant execute on function public.get_tripartite_employer_link(uuid) to authenticated;

-- Staff record that they sent the link themselves (copy, WhatsApp, their own email).
create or replace function public.log_tripartite_employer_contact(p_review uuid, p_kind text, p_to text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare r college_tripartite_reviews;
begin
  select * into r from college_tripartite_reviews where id = p_review for update;
  if r.id is null or not (public._review_staff_can(r.college_id) or coalesce(auth.role(), '') = 'service_role') then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  if p_kind not in ('invite', 'reminder', 'summary', 'shared_link') then
    return jsonb_build_object('error', 'Unknown contact type.');
  end if;
  perform set_config('app.tripartite_rpc', 'on', true);
  update college_tripartite_reviews
     set employer_contact_log = employer_contact_log || jsonb_build_array(jsonb_build_object(
           'kind', p_kind, 'at', now(), 'to', nullif(left(trim(coalesce(p_to, '')), 200), ''),
           'by', coalesce((select full_name from profiles where id = auth.uid()), 'Elec-Mate'))),
         employer_invited_at = case when p_kind in ('invite', 'shared_link', 'reminder')
                                    then coalesce(employer_invited_at, now()) else employer_invited_at end,
         shared_at = case when p_kind = 'summary' then coalesce(shared_at, now()) else shared_at end
   where id = r.id;
  perform set_config('app.tripartite_rpc', 'off', true);
  return jsonb_build_object('success', true);
end; $$;
grant execute on function public.log_tripartite_employer_contact(uuid, text, text) to authenticated, service_role;

create or replace function public.get_tripartite_review_public(p_token text)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  r college_tripartite_reviews;
  s college_students;
  v_pre jsonb;
  v_ls_ok boolean;
begin
  if p_token is null or length(p_token) < 32 then return jsonb_build_object('error', 'invalid'); end if;
  select * into r from college_tripartite_reviews where employer_token = p_token;
  if r.id is null or r.status = 'cancelled' then return jsonb_build_object('error', 'invalid'); end if;
  select * into s from college_students where id = r.student_id;

  if r.employer_viewed_at is null then
    perform set_config('app.tripartite_rpc', 'on', true);
    update college_tripartite_reviews set employer_viewed_at = now() where id = r.id;
    perform set_config('app.tripartite_rpc', 'off', true);
  end if;

  -- Live figures before sign-off; the frozen record after it.
  v_pre := coalesce(r.snapshot->'prefill', public._tripartite_prefill(r.id));
  v_ls_ok := coalesce((r.outcomes->'learning_support'->>'employer_consent')::boolean, false);

  return jsonb_build_object(
    'learner_name', s.name,
    'college_name', (select name from colleges where id = r.college_id),
    'employer', (select company_name from college_employers where id = coalesce(r.employer_id, s.employer_id)),
    'tutor_name', (select name from college_staff where id = r.tutor_staff_id),
    'scheduled_at', r.scheduled_at, 'mode', r.mode, 'location', r.location, 'meeting_url', r.meeting_url,
    'status', r.status, 'locked', r.locked_at is not null, 'held_on', r.held_on,
    'course', v_pre->'learner'->'course', 'progress_percent', v_pre->'learner'->'progress_percent',
    'expected_end_date', s.expected_end_date,
    'otj', v_pre->'otj', 'hours_since', v_pre->'hours_since', 'since', v_pre->'since',
    'attendance_since', v_pre->'attendance_since', 'evidence_since', v_pre->'evidence_since',
    'open_actions', v_pre->'open_actions',
    'employer_input', r.employer_input,
    -- The shared summary (97.2.2). Wellbeing and safeguarding notes are the
    -- college's; learning support only with the apprentice's consent (40.5.2).
    'summary', case when r.locked_at is null then null else jsonb_build_object(
      'summary', r.outcomes->>'summary', 'progress', r.outcomes->>'progress_notes',
      'otj', r.outcomes->>'otj_review', 'evidence', r.outcomes->>'evidence_notes',
      'plan_change', r.outcomes->>'plan_change', 'plan_note', r.outcomes->>'ilp_updates',
      'concerns', r.outcomes->>'concerns',
      'learning_support', case when v_ls_ok then r.outcomes->'learning_support'->>'note' end,
      'checked_actions', r.snapshot->'checked_actions',
      'agreed_actions', r.snapshot->'agreed_actions',
      'employer_attendance', r.employer_attendance,
      'employer_must_sign', r.snapshot->'employer_must_sign') end,
    'signatures', jsonb_build_object(
      'tutor_name', r.signatures->>'tutor_name', 'tutor_signed_at', r.signatures->>'tutor_signed_at',
      'student_name', r.signatures->>'student_name', 'student_signed_at', r.signatures->>'student_signed_at',
      'employer_name', r.signatures->>'employer_name', 'employer_role', r.signatures->>'employer_role',
      'employer_signed_at', r.signatures->>'employer_signed_at'));
end; $$;
revoke all on function public.get_tripartite_review_public(text) from public;
grant execute on function public.get_tripartite_review_public(text) to anon, authenticated;

create or replace function public.submit_tripartite_employer_input(p_token text, p_input jsonb)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  r college_tripartite_reviews;
  s college_students;
begin
  select * into r from college_tripartite_reviews where employer_token = p_token for update;
  if r.id is null or r.status = 'cancelled' then return jsonb_build_object('error', 'This link is not valid.'); end if;
  if r.locked_at is not null then return jsonb_build_object('error', 'The review has been written up. You can still sign it below.'); end if;
  if coalesce(p_input->>'progress', '') not in ('ahead', 'on_track', 'behind') then
    return jsonb_build_object('error', 'Choose how the apprentice is doing at work.');
  end if;
  if length(trim(coalesce(p_input->>'name', ''))) < 2 then
    return jsonb_build_object('error', 'Add your name.');
  end if;
  select * into s from college_students where id = r.student_id;
  perform set_config('app.tripartite_rpc', 'on', true);
  update college_tripartite_reviews
     set employer_input = jsonb_build_object(
           'progress', p_input->>'progress',
           'going_well', left(trim(coalesce(p_input->>'going_well', '')), 1500),
           'focus_next', left(trim(coalesce(p_input->>'focus_next', '')), 1500),
           'concerns', left(trim(coalesce(p_input->>'concerns', '')), 1500),
           'name', left(trim(p_input->>'name'), 120), 'role', left(trim(coalesce(p_input->>'role', '')), 120),
           'at', now(), 'via', coalesce(nullif(p_input->>'via', ''), 'link')),
         employer_attendance = case when employer_attendance is null or employer_attendance = 'invited_no_response'
                                    then 'contributed' else employer_attendance end
   where id = r.id;
  perform set_config('app.tripartite_rpc', 'off', true);
  begin
    insert into user_notifications (user_id, type, title, message, link, metadata)
    select st.user_id, 'tripartite_employer_input', 'Employer view in for ' || s.name,
           left(trim(p_input->>'name'), 120) || ' added their view ahead of the progress review.',
           '/college/reviews?review=' || r.id, jsonb_build_object('review_id', r.id)
      from college_staff st where st.id = r.tutor_staff_id and st.user_id is not null;
  exception when others then null;
  end;
  return jsonb_build_object('success', true);
end; $$;
revoke all on function public.submit_tripartite_employer_input(text, jsonb) from public;
grant execute on function public.submit_tripartite_employer_input(text, jsonb) to anon, authenticated;

create or replace function public.sign_tripartite_review_employer(p_token text, p_name text, p_role text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare r college_tripartite_reviews;
begin
  select * into r from college_tripartite_reviews where employer_token = p_token for update;
  if r.id is null or r.status = 'cancelled' then return jsonb_build_object('error', 'This link is not valid.'); end if;
  if r.locked_at is null then return jsonb_build_object('error', 'The college has not written up the review yet.'); end if;
  if r.signatures ? 'employer_signed_at' then return jsonb_build_object('error', 'Already signed for the employer.'); end if;
  if length(trim(coalesce(p_name, ''))) < 2 then return jsonb_build_object('error', 'Add your full name.'); end if;
  perform set_config('app.tripartite_rpc', 'on', true);
  update college_tripartite_reviews
     set signatures = signatures || jsonb_build_object(
           'employer_signed_at', now(), 'employer_name', left(trim(p_name), 120),
           'employer_role', nullif(left(trim(coalesce(p_role, '')), 120), ''),
           'employer_signed_via', case when auth.uid() is null then 'link' else 'employer_hub' end)
   where id = r.id;
  perform set_config('app.tripartite_rpc', 'off', true);
  return jsonb_build_object('success', true);
end; $$;
revoke all on function public.sign_tripartite_review_employer(text, text, text) from public;
grant execute on function public.sign_tripartite_review_employer(text, text, text) to anon, authenticated;

-- 12. The apprentice's reviews --------------------------------------------
create or replace function public.get_my_tripartite_reviews()
returns jsonb language sql stable security definer set search_path to 'public' as $$
  with me as (
    select s.id from college_students s
     where s.user_id = auth.uid() and lower(coalesce(s.status, '')) not in ('withdrawn', 'archived')
     order by s.created_at desc limit 1
  )
  select jsonb_build_object(
    'due_by', (select public.tripartite_due_by(id) from me),
    'reviews', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', r.id, 'scheduled_at', r.scheduled_at, 'held_on', r.held_on, 'mode', r.mode,
        'location', r.location, 'meeting_url', r.meeting_url, 'status', r.status,
        'locked', r.locked_at is not null,
        'tutor_name', (select name from college_staff where id = r.tutor_staff_id),
        'learner_input', r.learner_input,
        'summary', case when r.locked_at is null then null else jsonb_build_object(
          'summary', r.outcomes->>'summary', 'progress', r.outcomes->>'progress_notes',
          'otj', r.outcomes->>'otj_review', 'plan_note', r.outcomes->>'ilp_updates',
          'concerns', r.outcomes->>'concerns',
          'checked_actions', r.snapshot->'checked_actions', 'agreed_actions', r.snapshot->'agreed_actions') end,
        'signatures', jsonb_build_object(
          'tutor_name', r.signatures->>'tutor_name', 'tutor_signed_at', r.signatures->>'tutor_signed_at',
          'student_signed_at', r.signatures->>'student_signed_at',
          'employer_name', r.signatures->>'employer_name', 'employer_signed_at', r.signatures->>'employer_signed_at'))
        order by coalesce(r.held_on, r.scheduled_at::date) desc nulls first)
        from college_tripartite_reviews r
       where r.student_id = (select id from me) and r.status <> 'cancelled'), '[]'::jsonb),
    'open_actions', coalesce((
      select jsonb_agg(jsonb_build_object('action', a.action, 'owner_party', a.owner_party, 'due_date', a.due_date)
                       order by a.due_date nulls last)
        from college_review_actions a
        join college_tripartite_reviews r on r.id = a.review_id and r.locked_at is not null
       where a.student_id = (select id from me) and a.status = 'open'), '[]'::jsonb));
$$;
grant execute on function public.get_my_tripartite_reviews() to authenticated;

-- 13. Employer Hub: the same reviews for apprentices on the firm's roster --
create or replace function public.get_employer_apprentice_reviews()
returns jsonb language sql stable security definer set search_path to 'public' as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'student_user_id', cs.user_id, 'name', cs.name,
    'due_by', public.tripartite_due_by(cs.id),
    'review', (select jsonb_build_object(
        'id', r.id, 'token', r.employer_token, 'scheduled_at', r.scheduled_at, 'held_on', r.held_on,
        'mode', r.mode, 'status', r.status, 'locked', r.locked_at is not null,
        'employer_input', r.employer_input is not null,
        'employer_signed', r.signatures ? 'employer_signed_at')
      from college_tripartite_reviews r
     where r.student_id = cs.id and r.status <> 'cancelled'
       and (r.completed_at is null or not (r.signatures ? 'employer_signed_at'))
     order by r.scheduled_at nulls last limit 1),
    'last_held_on', (select max(coalesce(r.held_on, r.scheduled_at::date)) from college_tripartite_reviews r
                      where r.student_id = cs.id and r.locked_at is not null)
  )), '[]'::jsonb)
  from employer_employees ee
  join college_students cs on cs.user_id = ee.user_id
   and lower(coalesce(cs.status, '')) not in ('withdrawn', 'completed', 'archived')
  where ee.status = 'active' and ee.employer_id in (select public.my_employer_scope());
$$;
grant execute on function public.get_employer_apprentice_reviews() to authenticated;

-- 14. The Employer Hub's review dates come from real reviews now -----------
do $$
declare d text;
begin
  d := pg_get_functiondef('public.get_employer_apprentice_college_progress()'::regprocedure);
  if position('tripartite_due_by' in d) = 0 then
    d := replace(d,
      '(base.last_review_date is null or base.last_review_date < current_date - 84) as review_overdue',
      '(public.tripartite_due_by(base.cs_id) < current_date) as review_overdue');
    d := replace(d,
      '(select i.last_reviewed from college_ilps i
         where i.student_id = cs.id
         order by i.last_reviewed desc nulls last limit 1) as last_review_date',
      'coalesce((select max(coalesce(r.held_on, r.scheduled_at::date)) from college_tripartite_reviews r
                  where r.student_id = cs.id and r.locked_at is not null),
                (select i.last_reviewed::date from college_ilps i
                  where i.student_id = cs.id
                  order by i.last_reviewed desc nulls last limit 1)) as last_review_date');
    d := replace(d,
      '(select i.review_date from college_ilps i
         where i.student_id = cs.id and i.is_current
         order by i.created_at desc limit 1) as next_review_date',
      'coalesce((select min(r.scheduled_at::date) from college_tripartite_reviews r
                  where r.student_id = cs.id and r.locked_at is null and r.status <> ''cancelled''
                    and r.scheduled_at is not null),
                public.tripartite_due_by(cs.id)) as next_review_date');
    if position('tripartite_due_by' in d) = 0 then
      raise notice 'Employer Hub progress RPC has changed shape; review dates not rewired.';
    else
      execute d;
    end if;
  end if;
end $$;
