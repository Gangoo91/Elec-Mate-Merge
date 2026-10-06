-- Independent review of tripartite_reviews_v2 (6 Oct 2026). Applied live.
-- Fixes, in the reviewer's numbering:
--  #1  learners read the table directly (safeguarding/wellbeing notes, the
--      employer's view, drafts): reviews and actions are staff-only on the
--      table; learners use get_my_tripartite_reviews.
--  #2  anon could sign as a learner with no account (NULL = NULL check) and
--      had EXECUTE on every new RPC: null-safe checks, EXECUTE revoked.
--  #3  prefill readable by anyone for a learner with no account: null-safe.
--  #7  EQA (read-only) could act through the definer RPCs: write check.
--  #8  staff could insert a review with evidence fields pre-set or choose
--      the token: insert guard.
--  #9  actions could be closed outside a review (98.1 bypass): actions guard.
--  #10 old links kept showing live figures: limited after 30 days / employer change.
--  #13–15 board: next = earliest UNLOCKED review; unsigned and employer
--      re-sign (98.4.1) tracked separately; undated reviews not "late";
--      held-but-not-written-up reviews shown.
--  #16 employer surfaces chase the right review (employer_review_focus).
--  #17 held_on bounded; #18 dates in Europe/London; #19 only actions from
--      SIGNED reviews must be checked; #20 a learner with no account can
--      sign on paper, recorded by staff; #32 board takes the college.
--  #33 the daily mail cron is recorded here.

create or replace function public._lon(p timestamptz)
returns date language sql immutable as $$ select (p at time zone 'Europe/London')::date $$;

-- ── Who may act ─────────────────────────────────────────────────────────
create or replace function public._review_staff_can_write(p_college uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select public._review_staff_can(p_college) and not coalesce(public.current_user_is_eqa(), false);
$$;
revoke all on function public._review_staff_can_write(uuid) from public, anon;
grant execute on function public._review_staff_can_write(uuid) to authenticated;

-- #1 Table reads are staff only.
drop policy if exists "tripartite_select" on public.college_tripartite_reviews;
create policy "tripartite_select" on public.college_tripartite_reviews for select to authenticated
  using (public._review_staff_can(college_id));
drop policy if exists "review_actions_select" on public.college_review_actions;
create policy "review_actions_select" on public.college_review_actions for select to authenticated
  using (public._review_staff_can(college_id));

-- ── #8 Insert guard; #9 actions guard ──────────────────────────────────
create or replace function public.tg_tripartite_review_guard()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if tg_op = 'INSERT' then
    -- The employer's link is always ours to choose, whoever inserts.
    new.employer_token := encode(extensions.gen_random_bytes(24), 'hex');
  end if;
  if coalesce(auth.role(), '') <> 'authenticated'
     or current_setting('app.tripartite_rpc', true) = 'on' then
    return coalesce(new, old);
  end if;

  if tg_op = 'INSERT' then
    if new.locked_at is not null or new.snapshot is not null or new.employer_input is not null
       or new.learner_input is not null or coalesce(new.signatures, '{}'::jsonb) <> '{}'::jsonb
       or new.status not in ('scheduled', 'in_progress') or new.shared_at is not null
       or coalesce(new.employer_contact_log, '[]'::jsonb) <> '[]'::jsonb
       or new.employer_invited_at is not null or new.employer_viewed_at is not null
       or new.completed_at is not null or new.held_on is not null or new.content_hash is not null then
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
     or new.held_on is distinct from old.held_on or new.employer_token is distinct from old.employer_token
     or (new.status = 'completed' and old.status <> 'completed')
     or new.student_id is distinct from old.student_id or new.college_id is distinct from old.college_id then
    raise exception 'Use Sign off to finish a review.' using errcode = 'check_violation';
  end if;
  return new;
end; $$;

create or replace function public.tg_review_actions_guard()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare
  v_own_locked boolean;
  v_closer record;
begin
  if coalesce(auth.role(), '') <> 'authenticated'
     or current_setting('app.tripartite_rpc', true) = 'on' then
    return coalesce(new, old);
  end if;
  select locked_at is not null into v_own_locked from college_tripartite_reviews
   where id = coalesce(new.review_id, old.review_id);

  if tg_op = 'DELETE' then
    if v_own_locked then
      raise exception 'This review is signed off and its actions cannot be removed.' using errcode = 'check_violation';
    end if;
    return old;
  end if;

  if tg_op = 'INSERT' then
    if v_own_locked then
      raise exception 'This review is signed off; add the action at the next review.' using errcode = 'check_violation';
    end if;
    if not exists (select 1 from college_tripartite_reviews r
                    where r.id = new.review_id and r.student_id = new.student_id and r.college_id = new.college_id) then
      raise exception 'Action does not match its review.' using errcode = 'check_violation';
    end if;
    if new.status <> 'open' or new.closed_in_review_id is not null or new.closed_at is not null then
      raise exception 'A new action starts open.' using errcode = 'check_violation';
    end if;
    return new;
  end if;

  -- UPDATE
  if new.review_id is distinct from old.review_id or new.student_id is distinct from old.student_id
     or new.college_id is distinct from old.college_id then
    raise exception 'Actions cannot move between reviews.' using errcode = 'check_violation';
  end if;
  if old.closed_in_review_id is not null
     and exists (select 1 from college_tripartite_reviews where id = old.closed_in_review_id and locked_at is not null) then
    raise exception 'This action was checked at a signed review and cannot be changed.' using errcode = 'check_violation';
  end if;
  if v_own_locked and (new.action is distinct from old.action or new.owner_party is distinct from old.owner_party
       or new.due_date is distinct from old.due_date or new.position is distinct from old.position) then
    raise exception 'The wording of an agreed action cannot change after sign-off.' using errcode = 'check_violation';
  end if;
  -- 98.1: an action is only ever closed AT a later, still-open review of the
  -- same learner, after its own review was signed.
  if new.status = 'open' then
    if new.closed_in_review_id is not null then
      raise exception 'An open action is not closed in a review.' using errcode = 'check_violation';
    end if;
  else
    if not v_own_locked then
      raise exception 'Actions are checked at the next review, not the one that agreed them.' using errcode = 'check_violation';
    end if;
    select id, student_id, locked_at into v_closer from college_tripartite_reviews where id = new.closed_in_review_id;
    if v_closer.id is null or v_closer.student_id <> old.student_id or v_closer.locked_at is not null
       or v_closer.id = old.review_id then
      raise exception 'Record the outcome in this learner''s current review.' using errcode = 'check_violation';
    end if;
  end if;
  return new;
end; $$;

-- ── #18 Dates in Europe/London ─────────────────────────────────────────
create or replace function public.tripartite_due_by(p_student uuid)
returns date language sql stable security definer set search_path to 'public' as $$
  select (date_trunc('month', x.base + make_interval(months => x.m)) + interval '1 month - 1 day')::date
    from (
      select coalesce(
               (select max(coalesce(r.held_on, public._lon(r.scheduled_at)))
                  from college_tripartite_reviews r
                 where r.student_id = s.id and r.locked_at is not null),
               s.start_date, public._lon(s.created_at)) as base,
             coalesce(s.review_frequency_months, 3) as m
        from college_students s where s.id = p_student
    ) x;
$$;

-- ── #3 #19 Pre-fill ───────────────────────────────────────────────────
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

  select p.id, coalesce(p.held_on, public._lon(p.scheduled_at)) into v_prev, v_since
    from college_tripartite_reviews p
   where p.student_id = r.student_id and p.locked_at is not null and p.id <> r.id
     and coalesce(p.held_on, public._lon(p.scheduled_at))
         <= coalesce(r.held_on, public._lon(r.scheduled_at), public._lon(now()))
   order by coalesce(p.held_on, public._lon(p.scheduled_at)) desc limit 1;
  v_since := coalesce(v_since, s.start_date, public._lon(s.created_at));

  if s.user_id is not null then
    v_otj := public._otj_summary_core(s.user_id);
  end if;

  return jsonb_build_object(
    'learner', jsonb_build_object(
      'name', s.name, 'start_date', s.start_date, 'expected_end_date', s.expected_end_date,
      'course', (select c.name from college_courses c where c.id = s.course_id),
      'cohort', (select c.name from college_cohorts c where c.id = s.cohort_id),
      'employer', (select e.company_name from college_employers e where e.id = coalesce(r.employer_id, s.employer_id)),
      'progress_percent', coalesce(s.progress_percent, 0),
      'has_account', s.user_id is not null),
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
    'evidence_since', jsonb_build_object(
      'signed_off', (select count(*) from portfolio_submissions p
                      where p.user_id = s.user_id and p.signed_off_at >= v_since),
      'awaiting_assessment', (select count(*) from portfolio_submissions p
                               where p.user_id = s.user_id and p.status in ('submitted', 'resubmitted', 'in_review')),
      'witness_statements', (select count(*) from portfolio_witness_statements w
                              where w.learner_id = s.user_id and w.signed_at >= v_since)),
    -- 98.1: actions agreed at a SIGNED earlier review, still open or closed here.
    'open_actions', coalesce((
      select jsonb_agg(jsonb_build_object('id', a.id, 'action', a.action, 'owner_party', a.owner_party,
                                          'due_date', a.due_date, 'status', a.status, 'outcome_note', a.outcome_note,
                                          'closed_in_review_id', a.closed_in_review_id)
                       order by a.created_at, a.position)
        from college_review_actions a
        join college_tripartite_reviews ar on ar.id = a.review_id and ar.locked_at is not null
       where a.student_id = s.id and a.review_id <> r.id
         and (a.status = 'open' or a.closed_in_review_id = r.id)), '[]'::jsonb),
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
  if r.college_id is null
     or not (public._review_staff_can(r.college_id) or coalesce(r.user_id = auth.uid(), false)) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return public._tripartite_prefill(p_review);
end; $$;

-- ── #13–15 #32 The board ──────────────────────────────────────────────
drop function if exists public.get_review_board();
create or replace function public.get_review_board(p_college uuid default null)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_college uuid := p_college;
  v_today date := public._lon(now());
begin
  if v_college is null then
    select st.college_id into v_college from college_staff st
     where st.user_id = auth.uid() and st.archived_at is null
     order by st.created_at desc limit 1;
  end if;
  if v_college is null or not public._review_staff_can(v_college) then
    raise exception 'not authorised' using errcode = '42501';
  end if;

  return (
    with learners as (
      select s.id, s.user_id, s.name, s.cohort_id, s.employer_id,
             public.tripartite_due_by(s.id) as due_by, s.review_frequency_months
        from college_students s
       where s.college_id = v_college
         and lower(coalesce(s.status, '')) not in ('withdrawn', 'completed', 'archived')
    ), last_done as (
      select r.student_id, max(coalesce(r.held_on, public._lon(r.scheduled_at))) as held_on
        from college_tripartite_reviews r
       where r.college_id = v_college and r.locked_at is not null
       group by 1
    ), upcoming as (   -- the next review to hold: earliest UNLOCKED one
      select distinct on (r.student_id) r.student_id, r.id, r.scheduled_at, public._lon(r.scheduled_at) as d,
             r.employer_input is not null as employer_input, r.learner_input is not null as learner_input,
             r.employer_invited_at
        from college_tripartite_reviews r
       where r.college_id = v_college and r.status <> 'cancelled' and r.locked_at is null
       order by r.student_id, r.scheduled_at nulls last
    ), to_sign as (    -- the latest signed-off review still missing a signature that is needed
      select distinct on (r.student_id) r.student_id, r.id,
             r.signatures ? 'student_signed_at' as learner_signed,
             r.signatures ? 'employer_signed_at' as employer_signed,
             coalesce((r.snapshot->>'employer_must_sign')::boolean, false) as employer_must_sign
        from college_tripartite_reviews r
       where r.college_id = v_college and r.locked_at is not null
         and (not (r.signatures ? 'student_signed_at')
              or (coalesce((r.snapshot->>'employer_must_sign')::boolean, false) and not (r.signatures ? 'employer_signed_at')))
       order by r.student_id, r.held_on desc
    ), emp as (
      select r.student_id, count(*) as total, count(*) filter (where r.employer_attendance = 'attended') as attended
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
          'id', u.id, 'scheduled_at', u.scheduled_at,
          'employer_input', u.employer_input, 'learner_input', u.learner_input,
          'employer_invited', u.employer_invited_at is not null) end,
        'to_sign', case when t.id is null then null else jsonb_build_object(
          'id', t.id, 'learner_signed', t.learner_signed, 'employer_signed', t.employer_signed,
          'employer_must_sign', t.employer_must_sign) end,
        'employer_attended', coalesce(e.attended, 0), 'reviews_done', coalesce(e.total, 0),
        'state', case
          when l.due_by < v_today then 'overdue'
          when u.id is not null and u.d < v_today then 'write_up'
          when t.id is not null then 'signatures'
          when u.id is not null and u.d <= l.due_by then 'scheduled'
          when u.id is not null and u.d > l.due_by then 'late'
          when l.due_by <= v_today + 21 then 'due_soon'
          else 'ok' end
      ) order by l.due_by, l.name), '[]'::jsonb))
      from learners l
      left join last_done d on d.student_id = l.id
      left join upcoming u on u.student_id = l.id
      left join to_sign t on t.student_id = l.id
      left join emp e on e.student_id = l.id
  );
end; $$;

-- ── Sign off (#7 #17 #18 #19) ─────────────────────────────────────────
create or replace function public.sign_off_tripartite_review(p_review uuid, p_held_on date default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  r college_tripartite_reviews;
  s college_students;
  v_name text;
  v_prefill jsonb;
  v_actions jsonb;
  v_unchecked int;
  v_held date;
  v_prev date;
  v_today date := public._lon(now());
  v_snapshot jsonb;
begin
  select * into r from college_tripartite_reviews where id = p_review for update;
  if r.id is null or not public._review_staff_can_write(r.college_id) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  select * into s from college_students where id = r.student_id;
  if r.locked_at is not null then return jsonb_build_object('error', 'Already signed off.'); end if;
  if r.status = 'cancelled' then return jsonb_build_object('error', 'This review was cancelled.'); end if;
  v_held := coalesce(p_held_on, least(public._lon(r.scheduled_at), v_today), v_today);
  if v_held > v_today then
    return jsonb_build_object('error', 'Sign off after the review has taken place.');
  end if;
  select max(coalesce(p.held_on, public._lon(p.scheduled_at))) into v_prev
    from college_tripartite_reviews p where p.student_id = r.student_id and p.locked_at is not null;
  if v_prev is not null and v_held <= v_prev then
    return jsonb_build_object('error', 'The date held must be after the last review (' || to_char(v_prev, 'DD Mon YYYY') || ').');
  end if;
  if v_held < coalesce(s.start_date, v_held) or v_held < public._lon(r.created_at) - 14 then
    return jsonb_build_object('error', 'Check the date held: it is before the review was booked.');
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
    join college_tripartite_reviews ar on ar.id = a.review_id and ar.locked_at is not null
   where a.student_id = r.student_id and a.status = 'open';
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

  if s.user_id is not null then
    begin
      insert into user_notifications (user_id, type, title, message, link, metadata)
      values (s.user_id, 'tripartite_sign', 'Sign your progress review',
              v_name || ' has written up your review from ' || to_char(v_held, 'DD Mon') || '. Read it and sign.',
              '/apprentice/college-plan?review=' || r.id, jsonb_build_object('review_id', r.id));
    exception when others then null;
    end;
  end if;
  return jsonb_build_object('success', true, 'employer_must_sign', v_snapshot->'employer_must_sign',
                            'learner_has_account', s.user_id is not null);
end; $$;

-- ── #2 The learner signs; #20 or staff record a paper signature ───────
create or replace function public.sign_tripartite_review_learner(p_review uuid)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  r college_tripartite_reviews;
  s college_students;
  v_name text;
begin
  select * into r from college_tripartite_reviews where id = p_review for update;
  select * into s from college_students where id = r.student_id;
  if r.id is null or auth.uid() is null or s.user_id is null or s.user_id <> auth.uid() then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  if r.locked_at is null then return jsonb_build_object('error', 'Your tutor has not finished writing this up yet.'); end if;
  if r.signatures ? 'student_signed_at' then return jsonb_build_object('error', 'You have already signed.'); end if;
  select coalesce(nullif(trim(full_name), ''), s.name) into v_name from profiles where id = auth.uid();

  perform set_config('app.tripartite_rpc', 'on', true);
  update college_tripartite_reviews
     set signatures = signatures || jsonb_build_object('student_signed_at', now(), 'student_name', v_name,
                                                       'student_signed_via', 'app'),
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

-- For a learner with no Elec-Mate account the paper copy they signed is the
-- evidence (para 311–312); staff record it, with their own name on the record.
create or replace function public.record_paper_learner_signature(p_review uuid, p_signed_on date, p_note text)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  r college_tripartite_reviews;
  s college_students;
  v_staff text;
begin
  select * into r from college_tripartite_reviews where id = p_review for update;
  if r.id is null or not public._review_staff_can_write(r.college_id) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  select * into s from college_students where id = r.student_id;
  if s.user_id is not null then
    return jsonb_build_object('error', 'This apprentice has an account; they sign in the app.');
  end if;
  if r.locked_at is null then return jsonb_build_object('error', 'Sign off the review first.'); end if;
  if r.signatures ? 'student_signed_at' then return jsonb_build_object('error', 'Already signed.'); end if;
  if p_signed_on is null or p_signed_on < r.held_on or p_signed_on > public._lon(now()) then
    return jsonb_build_object('error', 'Give the date they signed the paper copy.');
  end if;
  if length(trim(coalesce(p_note, ''))) < 5 then
    return jsonb_build_object('error', 'Say where the signed paper copy is kept.');
  end if;
  select coalesce(nullif(trim(full_name), ''), 'Staff') into v_staff from profiles where id = auth.uid();
  perform set_config('app.tripartite_rpc', 'on', true);
  update college_tripartite_reviews
     set signatures = signatures || jsonb_build_object(
           'student_signed_at', p_signed_on::timestamptz, 'student_name', s.name, 'student_signed_via', 'paper',
           'student_paper_recorded_by', v_staff, 'student_paper_recorded_at', now(),
           'student_paper_note', left(trim(p_note), 300)),
         status = 'completed', completed_at = now()
   where id = r.id;
  perform set_config('app.tripartite_rpc', 'off', true);
  return jsonb_build_object('success', true);
end; $$;

-- ── #7 Staff writes exclude EQA ───────────────────────────────────────
create or replace function public.get_tripartite_employer_link(p_review uuid)
returns text language plpgsql stable security definer set search_path to 'public' as $$
declare r record;
begin
  select college_id, employer_token into r from college_tripartite_reviews where id = p_review;
  if r.college_id is null or not public._review_staff_can_write(r.college_id) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return r.employer_token;
end; $$;

create or replace function public.log_tripartite_employer_contact(p_review uuid, p_kind text, p_to text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare r college_tripartite_reviews;
begin
  select * into r from college_tripartite_reviews where id = p_review for update;
  if r.id is null or not (public._review_staff_can_write(r.college_id) or coalesce(auth.role(), '') = 'service_role') then
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

-- ── #10 The employer's page: no live figures from an old or moved link ─
do $$
declare d text;
begin
  d := pg_get_functiondef('public.get_tripartite_review_public(text)'::regprocedure);
  if position('link_stale' in d) = 0 then
    d := replace(d,
      '  select * into s from college_students where id = r.student_id;
',
      '  select * into s from college_students where id = r.student_id;
  -- link_stale: the apprentice has moved employer, or an unwritten review is
  -- long past. The link then shows nothing live.
  if (r.employer_id is not null and s.employer_id is not null and r.employer_id <> s.employer_id)
     or (r.locked_at is null and r.scheduled_at < now() - interval ''30 days'') then
    return jsonb_build_object(''error'', ''invalid'');
  end if;
');
    -- Learning support only when it applies AND the apprentice agreed (40.5.2).
    d := replace(d,
      'v_ls_ok := coalesce((r.outcomes->''learning_support''->>''employer_consent'')::boolean, false);',
      'v_ls_ok := coalesce((r.outcomes->''learning_support''->>''employer_consent'')::boolean, false)
              and coalesce((r.outcomes->''learning_support''->>''applies'')::boolean, false);');
    execute d;
  end if;
end $$;

-- ── #16 What an employer surface should show for one apprentice ──────
-- The next review to take part in; else the latest signed review whose
-- signature the employer still owes (only when the plan changed, 98.4.1,
-- and for 60 days). Service role only (portal, digest).
create or replace function public.employer_review_focus(p_student uuid)
returns jsonb language sql stable security definer set search_path to 'public' as $$
  select coalesce(
    (select jsonb_build_object('token', r.employer_token, 'scheduled_at', r.scheduled_at, 'mode', r.mode,
              'locked', false, 'employer_input', r.employer_input is not null, 'employer_signed', false, 'held_on', null)
       from college_tripartite_reviews r
      where r.student_id = p_student and r.status <> 'cancelled' and r.locked_at is null
        and (r.scheduled_at is null or r.scheduled_at > now() - interval '2 days')
      order by r.scheduled_at nulls last limit 1),
    (select jsonb_build_object('token', r.employer_token, 'scheduled_at', r.scheduled_at, 'mode', r.mode,
              'locked', true, 'employer_input', r.employer_input is not null, 'employer_signed', false,
              'held_on', r.held_on, 'must_sign', coalesce((r.snapshot->>'employer_must_sign')::boolean, false))
       from college_tripartite_reviews r
      where r.student_id = p_student and r.locked_at is not null
        and not (r.signatures ? 'employer_signed_at') and r.held_on > public._lon(now()) - 60
      order by r.held_on desc limit 1));
$$;
revoke all on function public.employer_review_focus(uuid) from public, anon, authenticated;
grant execute on function public.employer_review_focus(uuid) to service_role;

-- ── #2 EXECUTE: nothing new is callable without signing in, except the
--    three token RPCs the employer's page uses. ───────────────────────
do $$
declare f text;
begin
  foreach f in array array[
    'public.get_tripartite_prefill(uuid)', 'public.get_review_board(uuid)',
    'public.sign_off_tripartite_review(uuid, date)', 'public.sign_tripartite_review_learner(uuid)',
    'public.record_paper_learner_signature(uuid, date, text)', 'public.submit_tripartite_learner_input(uuid, jsonb)',
    'public.get_tripartite_employer_link(uuid)', 'public.log_tripartite_employer_contact(uuid, text, text)',
    'public.get_my_tripartite_reviews()', 'public.get_employer_apprentice_reviews()',
    'public.tripartite_due_by(uuid)', 'public._lon(timestamptz)'] loop
    execute format('revoke all on function %s from public, anon', f);
    execute format('grant execute on function %s to authenticated, service_role', f);
  end loop;
end $$;

-- ── #33 The daily mail job, recorded (idempotent) ────────────────────
do $$
begin
  if exists (select 1 from cron.job where jobname = 'college-review-mail-daily') then
    perform cron.unschedule('college-review-mail-daily');
  end if;
  perform cron.schedule('college-review-mail-daily', '0 8 * * *', $job$select net.http_post(
     url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/college-review-mail',
     headers:=jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||(select decrypted_secret from vault.decrypted_secrets where name='service_role_key' limit 1)),
     body:='{"action":"cron"}'::jsonb,
     timeout_milliseconds:=300000)$job$);
end $$;
