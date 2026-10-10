-- ELE-1882: a learner moves to a new college or provider in one tap, and the
-- record moves with them.
--
-- Today accept_college_invite refuses a learner who is already on another
-- college's roll ("One account links to one college ... ask your new college
-- to contact Elec-Mate"). This adds the move itself:
--
--   preview_college_move(code)   what will happen, before anything changes
--   move_to_new_college(code)    does it, in one transaction:
--     · the old roll row is archived, never deleted: status 'Transferred',
--       leave date set (OTJ hours freeze there, funding history gets the
--       withdrawal episode, via trg_college_student_lifecycle as today), and
--       the row is detached from the account (user_id null) so the old college
--       can no longer read the learner's live record. Their own roll row,
--       register, reviews and the hours they verified stay with them.
--     · the old college's assessor links (staff at that college) end. The
--       learner's independent assessors, employer links, share links and
--       witness requests carry on (placeholder pause rows stop the lifecycle
--       trigger pausing them, closed straight away).
--     · the old college's assignment row is closed (status 'transferred',
--       tutor / assessor / IQA cleared, qualification freed so the new
--       college's assignment can be created; the old values are kept in
--       college_learner_moves.effects).
--     · the learner joins the new college through accept_college_invite, so a
--       move is exactly a join from there on.
--     · every decision, witness statement, OTJ entry, evidence item and audit
--       event stays on the learner (they are keyed by the learner's user id);
--       nothing is copied or deleted.
--     · a college_learner_moves row and a portfolio audit event record it.
--   get_decision_provenance(user)  which college (or independent assessor)
--     made each current decision, so the new college reads "Assessed at
--     Northgate by Owen Price" on decisions made before the move.
--
-- Additive: one new table, four new functions, one notification type.

-- ------------------------------------------------------------ history
create table if not exists public.college_learner_moves (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users(id) on delete cascade,
  from_college_id   uuid references public.colleges(id) on delete set null,
  from_college_name text,
  from_student_id   uuid,
  to_college_id     uuid references public.colleges(id) on delete set null,
  to_college_name   text,
  to_student_id     uuid,
  invite_code       text,
  carried           jsonb not null default '{}'::jsonb,
  effects           jsonb not null default '{}'::jsonb,
  moved_at          timestamptz not null default now()
);
create index if not exists college_learner_moves_user_idx on public.college_learner_moves (user_id, moved_at desc);
create index if not exists college_learner_moves_to_idx on public.college_learner_moves (to_college_id);

comment on table public.college_learner_moves is
  '[COLLEGE] A learner moving from one college or provider to another (ELE-1882): from / to college, the archived and new roll rows, what the record carried (decisions, witness statements, hours, evidence, audit events) and what the move did (old college assessor links ended, links kept, assignment closed). Scope: the learner, and staff of the college they moved TO. Used by: MoveCollegeSheet, get_decision_provenance, Student 360. Rule: written only by move_to_new_college; append only. The old college never reads this table (they see their roll row as Transferred).';

alter table public.college_learner_moves enable row level security;

drop policy if exists "Learner reads own moves" on public.college_learner_moves;
create policy "Learner reads own moves" on public.college_learner_moves
  for select to authenticated using (user_id = (select auth.uid()));

drop policy if exists "New college reads the learner's move" on public.college_learner_moves;
create policy "New college reads the learner's move" on public.college_learner_moves
  for select to authenticated using (public.college_can('learners.view_all', to_college_id));

revoke all on public.college_learner_moves from anon, authenticated;
grant select on public.college_learner_moves to authenticated;
grant all on public.college_learner_moves to service_role;

insert into public.notification_types (type, category, push, importance)
values ('college_moved', 'apprentice', true, 1)
on conflict (type) do nothing;

-- ------------------------------------------------------------ helpers
-- Is p_assessor (now or before) staff at p_college? Matches the user id, or
-- the email on a staff row not yet linked to an account.
create or replace function public._is_college_staff_user(p_college uuid, p_user uuid, p_email text default null)
returns boolean
language sql
stable security definer
set search_path to 'public'
as $$
  select exists (
    select 1 from public.college_staff st
     where st.college_id = p_college
       and ((p_user is not null and st.user_id = p_user)
            or (p_email is not null and st.email is not null
                and lower(btrim(st.email)) = lower(btrim(p_email))))
  );
$$;
revoke all on function public._is_college_staff_user(uuid, uuid, text) from public, anon, authenticated;

-- What the learner's record holds, counted the way the move sheet shows it.
create or replace function public._learner_record_counts(p_user uuid)
returns jsonb
language sql
stable security definer
set search_path to 'public'
as $$
  select jsonb_build_object(
    'decisions', (select count(*) from public.portfolio_assessment_decisions d
                   where d.learner_id = p_user),
    'witness_statements', (select count(*) from public.portfolio_witness_statements w
                            where w.learner_id = p_user and w.status = 'signed'),
    'otj_entries', (select count(*) from public.college_otj_entries o where o.student_id = p_user),
    'otj_verified_hours', (select round(coalesce(sum(o.duration_minutes), 0) / 60.0, 1)
                             from public.college_otj_entries o
                            where o.student_id = p_user
                              and o.verification_status in ('verified', 'verified_by_employer')),
    'evidence_items', (select count(*) from public.portfolio_items pi where pi.user_id = p_user),
    'audit_events', (select count(*) from public.portfolio_audit_events e where e.learner_id = p_user));
$$;
revoke all on function public._learner_record_counts(uuid) from public, anon, authenticated;

-- ------------------------------------------------------------ preview
create or replace function public.preview_college_move(p_invite_code text)
returns jsonb
language plpgsql
stable security definer
set search_path to 'public'
as $function$
declare
  v_user uuid := auth.uid();
  v_inv record;
  v_to_name text;
  v_cohort text;
  v_from jsonb;
  v_end_links jsonb;
  v_keep_links int;
  v_shares int;
  v_witness int;
begin
  if v_user is null then
    return jsonb_build_object('error', 'not_authenticated');
  end if;

  select * into v_inv from public.college_invites
   where invite_code = upper(regexp_replace(coalesce(p_invite_code, ''), '[\s\-]', '', 'g'));
  if v_inv.id is null then
    return jsonb_build_object('error', 'invite_not_found',
      'message', 'That code does not match a college. Check it with your new college.');
  end if;
  if not coalesce(v_inv.is_active, false)
     or (v_inv.expires_at is not null and v_inv.expires_at <= now())
     or (v_inv.max_uses is not null and v_inv.use_count >= v_inv.max_uses) then
    return jsonb_build_object('error', 'invite_inactive',
      'message', 'That code has been switched off or used up. Ask your new college for a new one.');
  end if;
  if v_inv.invite_type <> 'student' then
    return jsonb_build_object('error', 'not_a_learner_code',
      'message', 'That is a staff code. Ask your new college for a learner code.');
  end if;

  select name into v_to_name from public.colleges where id = v_inv.college_id;
  select name into v_cohort from public.college_cohorts where id = v_inv.cohort_id;

  if exists (select 1 from public.college_students s
              where s.user_id = v_user and s.college_id = v_inv.college_id) then
    return jsonb_build_object('error', 'same_college', 'to_college_name', v_to_name,
      'message', format('You are already with %s.', coalesce(v_to_name, 'this college')));
  end if;

  select coalesce(jsonb_agg(jsonb_build_object('college_id', s.college_id, 'college_name', c.name,
                                               'status', s.status, 'student_id', s.id)), '[]'::jsonb)
    into v_from
    from public.college_students s
    left join public.colleges c on c.id = s.college_id
   where s.user_id = v_user;

  -- Assessor links that end: staff at a college they are leaving.
  select coalesce(jsonb_agg(jsonb_build_object(
           'name', coalesce(l.assessor_name, p.full_name, l.assessor_email),
           'role', l.role)), '[]'::jsonb)
    into v_end_links
    from public.portfolio_assessor_links l
    left join public.profiles p on p.id = l.assessor_user_id
   where l.learner_id = v_user and l.status in ('invited', 'active')
     and exists (select 1 from public.college_students s
                  where s.user_id = v_user
                    and public._is_college_staff_user(s.college_id, l.assessor_user_id, l.assessor_email));

  select count(*) into v_keep_links
    from public.portfolio_assessor_links l
   where l.learner_id = v_user and l.status in ('invited', 'active')
     and not exists (select 1 from public.college_students s
                      where s.user_id = v_user
                        and public._is_college_staff_user(s.college_id, l.assessor_user_id, l.assessor_email));

  select count(*) into v_shares from public.portfolio_shares s
   where s.user_id = v_user and s.is_active and (s.expires_at is null or s.expires_at > now());
  select count(*) into v_witness from public.portfolio_witness_statements w
   where w.learner_id = v_user and w.status = 'requested';

  return jsonb_build_object(
    'to_college_id', v_inv.college_id,
    'to_college_name', v_to_name,
    'to_cohort_name', v_cohort,
    'from', v_from,
    'moving', jsonb_array_length(v_from) > 0,
    'carried', public._learner_record_counts(v_user),
    'links_ending', v_end_links,
    'links_kept', v_keep_links,
    'shares_kept', v_shares,
    'witness_requests_kept', v_witness);
end;
$function$;

revoke all on function public.preview_college_move(text) from public, anon;
grant execute on function public.preview_college_move(text) to authenticated;

-- ------------------------------------------------------------ the move
create or replace function public.move_to_new_college(p_invite_code text)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_user uuid := auth.uid();
  v_code text := upper(regexp_replace(coalesce(p_invite_code, ''), '[\s\-]', '', 'g'));
  v_inv record;
  v_to_name text;
  v_today date := (now() at time zone 'Europe/London')::date;
  v_carried jsonb;
  v_join jsonb;
  v_move uuid;
  r record;
  l record;
  v_ended int;
  v_kept int;
  v_reviews int;
  v_assign jsonb;
  v_effects jsonb := '[]'::jsonb;
  v_from_names text[] := '{}';
  v_first_from uuid;
  v_first_from_name text;
  v_first_from_row uuid;
  v_new_qual uuid;
begin
  if v_user is null then
    return jsonb_build_object('error', 'not_authenticated', 'message', 'Sign in first.');
  end if;

  select * into v_inv from public.college_invites where invite_code = v_code;
  if v_inv.id is null or v_inv.invite_type <> 'student' then
    return jsonb_build_object('error', 'invite_not_found',
      'message', 'That code does not match a college. Check it with your new college.');
  end if;
  select name into v_to_name from public.colleges where id = v_inv.college_id;

  if exists (select 1 from public.college_students s
              where s.user_id = v_user and s.college_id = v_inv.college_id) then
    return jsonb_build_object('error', 'same_college',
      'message', format('You are already with %s.', coalesce(v_to_name, 'this college')));
  end if;

  -- The qualification the new college's code puts them on (as accept_college_invite reads it).
  select coalesce(
           (select cc.qualification_id from public.college_courses cc
             where cc.id = coalesce(v_inv.course_id,
                                    (select co.course_id from public.college_cohorts co
                                      where co.id = v_inv.cohort_id and co.college_id = v_inv.college_id))),
           v_inv.qualification_id)
    into v_new_qual;

  v_carried := public._learner_record_counts(v_user);

  begin
    for r in
      select s.*, c.name college_name
        from public.college_students s
        left join public.colleges c on c.id = s.college_id
       where s.user_id = v_user
       for update of s
    loop
      v_from_names := v_from_names || coalesce(r.college_name, 'Previous college');
      if v_first_from is null then
        v_first_from := r.college_id; v_first_from_name := r.college_name; v_first_from_row := r.id;
      end if;

      -- 1. Keep what is the learner's own: placeholder pause rows make the
      --    lifecycle trigger skip these, and are closed straight after.
      insert into public.college_learner_link_pauses
        (college_id, student_id, user_id, link_kind, link_id, prev_value, resume_note)
      select r.college_id, r.id, v_user, 'portfolio_share', s.id, 'active', 'kept: the learner moved provider'
        from public.portfolio_shares s
       where s.user_id = v_user and s.is_active and (s.expires_at is null or s.expires_at > now());

      insert into public.college_learner_link_pauses
        (college_id, student_id, user_id, link_kind, link_id, prev_value, resume_note)
      select r.college_id, r.id, v_user, 'witness_request', w.id, 'requested', 'kept: the learner moved provider'
        from public.portfolio_witness_statements w
       where w.learner_id = v_user and w.status = 'requested';

      insert into public.college_learner_link_pauses
        (college_id, student_id, user_id, link_kind, link_id, prev_value, resume_note)
      select r.college_id, r.id, v_user, 'assessor_link', al.id, al.status, 'kept: the learner moved provider'
        from public.portfolio_assessor_links al
       where al.learner_id = v_user and al.status in ('invited', 'active')
         and not public._is_college_staff_user(r.college_id, al.assessor_user_id, al.assessor_email);
      get diagnostics v_kept = row_count;

      -- 2. Archive the roll row (lifecycle trigger: leave date, OTJ freeze,
      --    withdrawal episode, old college assessor links + open reviews paused).
      update public.college_students
         set status = 'Transferred',
             learning_actual_end_date = coalesce(learning_actual_end_date, v_today)
       where id = r.id;
      -- Already Transferred (rare): the trigger did nothing, so end the old
      -- college's assessor links here.
      update public.portfolio_assessor_links al
         set status = 'revoked', revoked_at = now()
       where al.learner_id = v_user and al.status in ('invited', 'active')
         and public._is_college_staff_user(r.college_id, al.assessor_user_id, al.assessor_email);

      -- The trigger told them "download your record, you are leaving": on a
      -- move the record comes with them, so that message is replaced below.
      delete from public.user_notifications n
       where n.user_id = v_user and n.type = 'learner_programme_status'
         and n.metadata->>'ref_id' = r.id::text and n.created_at > now() - interval '5 minutes';

      -- 3. Close every pause for this row. Kept links were never paused; the
      --    old college's assessor links and open reviews stay ended, so a later
      --    status change on the archived row can never bring them back.
      select count(*) filter (where link_kind = 'assessor_link' and resume_note is null),
             count(*) filter (where link_kind = 'tripartite_review' and resume_note is null)
        into v_ended, v_reviews
        from public.college_learner_link_pauses
       where student_id = r.id and resumed_at is null;
      update public.college_learner_link_pauses
         set resumed_at = now(),
             resume_note = coalesce(resume_note, 'ended: the learner moved provider')
       where student_id = r.id and resumed_at is null;

      -- 4. Close the old college's assignment row.
      select coalesce(jsonb_agg(jsonb_build_object(
               'id', a.id, 'qualification_id', a.qualification_id, 'tutor_id', a.tutor_id,
               'assessor_id', a.assessor_id, 'iqa_id', a.iqa_id, 'status', a.status,
               'cohort_name', a.cohort_name)), '[]'::jsonb)
        into v_assign
        from public.college_student_assignments a
       where a.student_id = v_user and a.college_id = r.college_id;
      -- One assignment row per learner and qualification (unique). Same
      -- qualification at the new college: the row is handed over, cleared of
      -- the old college's staff, cohort and dates, and accept_college_invite
      -- fills it for the new college. A different qualification: the old row
      -- is closed and kept. Either way the old values are in effects.
      update public.college_student_assignments a
         set college_id = v_inv.college_id, college_name = v_to_name,
             cohort_id = null, cohort_name = null,
             tutor_id = null, assessor_id = null, iqa_id = null,
             status = 'active', start_date = v_today, actual_end_date = null,
             expected_end_date = null, last_review_date = null, next_review_date = null,
             notes = concat_ws(E'\n', nullif(a.notes, ''),
                               format('Moved from %s on %s. Record kept on the learner.',
                                      coalesce(r.college_name, 'another provider'), to_char(v_today, 'DD Mon YYYY')))
       where a.student_id = v_user and a.college_id = r.college_id
         and a.qualification_id = v_new_qual;
      update public.college_student_assignments a
         set status = 'transferred',
             actual_end_date = coalesce(a.actual_end_date, v_today),
             tutor_id = null, assessor_id = null, iqa_id = null,
             notes = concat_ws(E'\n', nullif(a.notes, ''),
                               format('Moved to another provider on %s. Record kept on the learner.',
                                      to_char(v_today, 'DD Mon YYYY')))
       where a.student_id = v_user and a.college_id = r.college_id;

      -- 5. Detach the archived row from the account: the old college keeps
      --    its roll row, but no longer reaches the learner's live record.
      update public.college_students set user_id = null where id = r.id;

      v_effects := v_effects || jsonb_build_object(
        'college_id', r.college_id, 'college_name', r.college_name, 'student_id', r.id,
        'previous_status', r.status, 'assessor_links_ended', v_ended,
        'links_kept', v_kept, 'reviews_stood_down', v_reviews, 'assignments', v_assign);
    end loop;

    -- 6. Join the new college exactly as a first join would.
    v_join := public.accept_college_invite(v_code);
    if v_join ? 'error' then
      raise exception using errcode = 'P0001', message = 'join_failed',
        detail = v_join::text;
    end if;
  exception when others then
    if sqlerrm = 'join_failed' then
      declare v_d text;
      begin
        get stacked diagnostics v_d = pg_exception_detail;
        return v_d::jsonb;
      end;
    end if;
    raise;
  end;

  insert into public.college_learner_moves
    (user_id, from_college_id, from_college_name, from_student_id, to_college_id, to_college_name,
     to_student_id, invite_code, carried, effects)
  values (v_user, v_first_from, v_first_from_name, v_first_from_row, v_inv.college_id, v_to_name,
          nullif(v_join->>'student_id', '')::uuid, v_code, v_carried,
          jsonb_build_object('left', v_effects))
  returning id into v_move;

  perform public._pae_write(v_user, case when v_first_from is null then 'college_joined' else 'college_moved' end,
    'college', v_inv.college_id,
    jsonb_build_object('from', to_jsonb(v_from_names), 'to', v_to_name, 'move_id', v_move, 'carried', v_carried),
    null, 'learner');

  if v_first_from is not null then
    perform public.notify_user(v_user, 'college_moved',
      format('Your record is now with %s', coalesce(v_to_name, 'your new college')),
      'Every decision, witness statement and hour came with you. Your previous college can no longer see it.',
      jsonb_build_object('route', '/apprentice/college-plan', 'ref_id', v_move::text));
  end if;

  return v_join || jsonb_build_object(
    'moved', v_first_from is not null,
    'move_id', v_move,
    'from_college_name', v_first_from_name,
    'to_college_name', v_to_name,
    'carried', v_carried,
    'left', v_effects);
end;
$function$;

revoke all on function public.move_to_new_college(text) from public, anon;
grant execute on function public.move_to_new_college(text) to authenticated;

-- ------------------------------------------------------------ provenance
-- Which college a decision was made at: the college where its assessor is or
-- was staff, among the colleges this learner is or was with. An assessor on
-- the learner's own link is 'independent'.
create or replace function public.get_decision_provenance(p_user_id uuid default null)
returns table(decision_id uuid, college_id uuid, college_name text, kind text, is_previous boolean)
language plpgsql
stable security definer
set search_path to 'public'
as $function$
declare
  v_user uuid := coalesce(p_user_id, auth.uid());
  v_current uuid;
begin
  if v_user is null or not (v_user = auth.uid() or public._can_assess(v_user)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  select s.college_id into v_current from public.college_students s
   where s.user_id = v_user order by (s.status = 'Active') desc, s.created_at desc limit 1;

  return query
  with colleges_of(cid) as (
    select s.college_id from public.college_students s where s.user_id = v_user
    union
    select m.from_college_id from public.college_learner_moves m
     where m.user_id = v_user and m.from_college_id is not null
    union
    select (e->>'college_id')::uuid from public.college_learner_moves m,
           jsonb_array_elements(m.effects->'left') e
     where m.user_id = v_user and e ? 'college_id'
  ),
  d as (
    select pd.id, pd.assessor_id from public.portfolio_assessment_decisions pd
     where pd.learner_id = v_user and pd.superseded_at is null
  )
  select d.id,
         c.id,
         c.name,
         case when c.id is not null then 'college'
              when exists (select 1 from public.portfolio_assessor_links l
                            where l.learner_id = v_user and l.assessor_user_id = d.assessor_id) then 'independent'
              else null end,
         (c.id is not null and c.id is distinct from v_current)
    from d
    left join lateral (
      select co.id, co.name
        from public.college_staff st
        join public.colleges co on co.id = st.college_id
       where st.user_id = d.assessor_id
         and st.college_id in (select co2.cid from colleges_of co2)
       order by (st.college_id = v_current) desc, (st.archived_at is null) desc
       limit 1
    ) c on true;
end;
$function$;

revoke all on function public.get_decision_provenance(uuid) from public, anon;
grant execute on function public.get_decision_provenance(uuid) to authenticated, service_role;
