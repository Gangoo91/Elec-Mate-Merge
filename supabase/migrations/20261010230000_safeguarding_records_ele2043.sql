-- ELE-2043: safeguarding records ready for inspection day one.
--
-- Keeping children safe in education 2026 (KCSIE):
--   para 74   all concerns, discussions and decisions made, and the reasons for
--             those decisions, recorded in writing (summary, follow-up, action,
--             decisions and outcome).
--   para 78   onward referral to the LADO for concerns about staff.
--   para 150  the DSL transfers the child protection file to the new school or
--             college within 5 days (in-year), ensures secure transit and obtains
--             confirmation of receipt.
--   para 151  sharing information in advance, e.g. Channel programme support.
--   para 218  the DSL holds and uses the fact that a child has a social worker.
--
-- Adds, DSL-only (the readers are _safeguarding_reader: active DSLs and deputies,
-- or admins / heads of department while the college has no lead with an
-- account). The learner's own tutor can read the safeguarding NOTE itself
-- ("pastoral: own tutor reads safeguarding", 10 Oct); these decision, referral,
-- case and transfer records are narrower still and stay with the leads.
--
--   college_safeguarding_decisions   decision + rationale + referrals per concern,
--                                    append-only (each save supersedes the last)
--   college_safeguarding_learner_status  open children's social care case flag
--   college_cp_file_transfers        child protection file sent, receipt recorded
--   save_safeguarding_decision, set_safeguarding_learner_status,
--   list_cp_file_transfers, record_cp_file_sent, record_cp_file_receipt,
--   get_safeguarding_inspection_export
--
-- Additive only: three new tables, six new functions. Writes go through the
-- functions; clients get select only, and only through RLS.

begin;
set local lock_timeout = '8s';

-- ------------------------------------------------------------ decisions
create table if not exists public.college_safeguarding_decisions (
  id                   uuid primary key default gen_random_uuid(),
  note_id              uuid not null references public.pastoral_notes(id) on delete cascade,
  student_id           uuid not null references public.college_students(id) on delete cascade,
  college_id           uuid not null references public.colleges(id) on delete cascade,
  decision             text not null check (decision in
                         ('no_further_action', 'monitor', 'early_help', 'referral_made', 'escalated')),
  rationale            text not null check (length(btrim(rationale)) >= 10),
  la_referral_on       date,
  la_name              text,
  la_reference         text,
  lado_referral_on     date,
  lado_reference       text,
  channel_referral_on  date,
  channel_reference    text,
  decided_by           uuid references public.college_staff(id) on delete set null,
  decided_by_name      text,
  decided_at           timestamptz not null default now(),
  superseded_at        timestamptz
);
create index if not exists college_sg_decisions_note_idx
  on public.college_safeguarding_decisions (note_id, decided_at desc);
create unique index if not exists college_sg_decisions_current_uidx
  on public.college_safeguarding_decisions (note_id) where superseded_at is null;
create index if not exists college_sg_decisions_college_idx
  on public.college_safeguarding_decisions (college_id);

comment on table public.college_safeguarding_decisions is
  '[COLLEGE] ELE-2043: the designated safeguarding lead''s decision on a safeguarding concern (pastoral_notes, visibility safeguarding), its rationale, and any referral to local authority children''s social care, the LADO or Channel (Prevent) with dates and references (KCSIE 2026 paras 74, 78, 151). Scope: one college. Used by: Safeguarding queue, day-one inspection export. Rule: DSL-only (_safeguarding_reader); written only by save_safeguarding_decision; append-only, a change supersedes the previous row so the history stays.';

alter table public.college_safeguarding_decisions enable row level security;
drop policy if exists "Safeguarding leads read decisions" on public.college_safeguarding_decisions;
create policy "Safeguarding leads read decisions" on public.college_safeguarding_decisions
  for select to authenticated using (public._safeguarding_reader(college_id));
drop policy if exists college_staff_mfa_required on public.college_safeguarding_decisions;
create policy college_staff_mfa_required on public.college_safeguarding_decisions as restrictive
  for all to authenticated
  using ((select public.college_staff_mfa_ok())) with check ((select public.college_staff_mfa_ok()));
revoke all on public.college_safeguarding_decisions from anon, authenticated;
grant select on public.college_safeguarding_decisions to authenticated;
grant all on public.college_safeguarding_decisions to service_role;

-- ------------------------------------------------------------ learner status
create table if not exists public.college_safeguarding_learner_status (
  student_id       uuid primary key references public.college_students(id) on delete cascade,
  college_id       uuid not null references public.colleges(id) on delete cascade,
  open_csc_case    boolean not null default false,
  case_type        text check (case_type in
                     ('child_in_need', 'child_protection_plan', 'looked_after', 'early_help', 'other')),
  local_authority  text,
  social_worker    text,
  since            date,
  updated_by       uuid references public.college_staff(id) on delete set null,
  updated_by_name  text,
  updated_at       timestamptz not null default now()
);
create index if not exists college_sg_status_college_idx
  on public.college_safeguarding_learner_status (college_id) where open_csc_case;

comment on table public.college_safeguarding_learner_status is
  '[COLLEGE] ELE-2043: whether a learner has an open children''s social care case (a social worker), its type, the local authority and the social worker''s name or contact (KCSIE 2026 para 218). Scope: one learner at one college. Used by: Safeguarding queue, day-one inspection export. Rule: DSL-only (_safeguarding_reader); written only by set_safeguarding_learner_status (logged in college_activity).';

alter table public.college_safeguarding_learner_status enable row level security;
drop policy if exists "Safeguarding leads read learner status" on public.college_safeguarding_learner_status;
create policy "Safeguarding leads read learner status" on public.college_safeguarding_learner_status
  for select to authenticated using (public._safeguarding_reader(college_id));
drop policy if exists college_staff_mfa_required on public.college_safeguarding_learner_status;
create policy college_staff_mfa_required on public.college_safeguarding_learner_status as restrictive
  for all to authenticated
  using ((select public.college_staff_mfa_ok())) with check ((select public.college_staff_mfa_ok()));
revoke all on public.college_safeguarding_learner_status from anon, authenticated;
grant select on public.college_safeguarding_learner_status to authenticated;
grant all on public.college_safeguarding_learner_status to service_role;

-- ------------------------------------------------------------ CP file transfers
create table if not exists public.college_cp_file_transfers (
  id                    uuid primary key default gen_random_uuid(),
  student_id            uuid not null references public.college_students(id) on delete cascade,
  college_id            uuid not null references public.colleges(id) on delete cascade,
  move_id               uuid references public.college_learner_moves(id) on delete set null,
  left_on               date,
  due_by                date,
  to_provider_name      text not null check (length(btrim(to_provider_name)) >= 2),
  to_college_id         uuid references public.colleges(id) on delete set null,
  to_dsl_name           text,
  to_dsl_contact        text,
  method                text not null check (method in
                          ('secure_email', 'secure_portal', 'in_person', 'recorded_delivery')),
  sent_at               timestamptz not null,
  sent_by               uuid references public.college_staff(id) on delete set null,
  sent_by_name          text,
  notes                 text,
  receipt_at            timestamptz,
  receipt_by_name       text,
  receipt_by_role       text,
  receipt_how           text check (receipt_how in
                          ('email_confirmation', 'signed_slip', 'portal_confirmation', 'in_app')),
  receipt_note          text,
  receipt_recorded_by   uuid,
  receipt_recorded_name text,
  created_at            timestamptz not null default now()
);
create index if not exists college_cp_transfers_student_idx on public.college_cp_file_transfers (student_id, sent_at desc);
create index if not exists college_cp_transfers_college_idx on public.college_cp_file_transfers (college_id);
create index if not exists college_cp_transfers_to_idx on public.college_cp_file_transfers (to_college_id) where to_college_id is not null;

comment on table public.college_cp_file_transfers is
  '[COLLEGE] ELE-2043: a learner''s child protection file sent to their new school, college or provider when they leave: where to, the receiving lead, how it was sent securely, when (due within 5 days, KCSIE 2026 para 150), and the confirmation of receipt. Scope: the sending college; the receiving college''s leads too when it is on Elec-Mate (to confirm receipt). Used by: Safeguarding queue, day-one inspection export. Rule: DSL-only (_safeguarding_reader of either college); written only by record_cp_file_sent / record_cp_file_receipt. Holds no concern content.';

alter table public.college_cp_file_transfers enable row level security;
drop policy if exists "Safeguarding leads read transfers" on public.college_cp_file_transfers;
create policy "Safeguarding leads read transfers" on public.college_cp_file_transfers
  for select to authenticated using (
    public._safeguarding_reader(college_id)
    or (to_college_id is not null and public._safeguarding_reader(to_college_id))
  );
drop policy if exists college_staff_mfa_required on public.college_cp_file_transfers;
create policy college_staff_mfa_required on public.college_cp_file_transfers as restrictive
  for all to authenticated
  using ((select public.college_staff_mfa_ok())) with check ((select public.college_staff_mfa_ok()));
revoke all on public.college_cp_file_transfers from anon, authenticated;
grant select on public.college_cp_file_transfers to authenticated;
grant all on public.college_cp_file_transfers to service_role;

-- ------------------------------------------------------------ helpers
-- The calling lead's staff id for p_college, or an exception.
create or replace function public._sg_lead_or_raise(p_college uuid)
returns uuid
language plpgsql
stable
security definer
set search_path = public
as $$
declare v uuid;
begin
  if auth.uid() is null then
    raise exception 'not signed in' using errcode = '42501';
  end if;
  v := public._safeguarding_reader_staff_id(p_college);
  if v is null then
    raise exception 'not authorised: safeguarding leads only' using errcode = '42501';
  end if;
  if not public.college_staff_mfa_ok() then
    raise exception 'two-step sign-in is required to read safeguarding records' using errcode = '42501';
  end if;
  return v;
end;
$$;
revoke all on function public._sg_lead_or_raise(uuid) from public, anon;

-- ------------------------------------------------------------ save decision
create or replace function public.save_safeguarding_decision(
  p_note_id uuid,
  p_decision text,
  p_rationale text,
  p_la_referral_on date default null,
  p_la_name text default null,
  p_la_reference text default null,
  p_lado_referral_on date default null,
  p_lado_reference text default null,
  p_channel_referral_on date default null,
  p_channel_reference text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  n record;
  v_staff uuid;
  v_name text;
  v_today date := (now() at time zone 'Europe/London')::date;
  v_id uuid;
begin
  select pn.id, pn.student_id, s.college_id into n
    from public.pastoral_notes pn join public.college_students s on s.id = pn.student_id
   where pn.id = p_note_id and pn.visibility = 'safeguarding';
  if n.id is null then
    raise exception 'not a safeguarding concern' using errcode = 'P0002';
  end if;
  v_staff := public._sg_lead_or_raise(n.college_id);

  if p_decision is null or p_decision not in ('no_further_action', 'monitor', 'early_help', 'referral_made', 'escalated') then
    raise exception 'choose a decision' using errcode = '22023';
  end if;
  if length(btrim(coalesce(p_rationale, ''))) < 10 then
    raise exception 'give the reasons for the decision' using errcode = '22023';
  end if;
  if p_decision = 'referral_made'
     and p_la_referral_on is null and p_lado_referral_on is null and p_channel_referral_on is null then
    raise exception 'add the date of the referral (local authority, LADO or Channel)' using errcode = '22023';
  end if;
  if coalesce(p_la_referral_on, v_today) > v_today or coalesce(p_lado_referral_on, v_today) > v_today
     or coalesce(p_channel_referral_on, v_today) > v_today then
    raise exception 'a referral date cannot be in the future' using errcode = '22023';
  end if;

  select coalesce(nullif(btrim(name), ''), 'Safeguarding lead') into v_name from public.college_staff where id = v_staff;

  update public.college_safeguarding_decisions set superseded_at = now()
   where note_id = p_note_id and superseded_at is null;

  insert into public.college_safeguarding_decisions (
    note_id, student_id, college_id, decision, rationale,
    la_referral_on, la_name, la_reference, lado_referral_on, lado_reference,
    channel_referral_on, channel_reference, decided_by, decided_by_name)
  values (
    p_note_id, n.student_id, n.college_id, p_decision, btrim(p_rationale),
    p_la_referral_on, nullif(btrim(coalesce(p_la_name, '')), ''), nullif(btrim(coalesce(p_la_reference, '')), ''),
    p_lado_referral_on, nullif(btrim(coalesce(p_lado_reference, '')), ''),
    p_channel_referral_on, nullif(btrim(coalesce(p_channel_reference, '')), ''), v_staff, v_name)
  returning id into v_id;

  -- A decision means a lead has seen it.
  update public.pastoral_notes
     set acknowledged_at = coalesce(acknowledged_at, now()),
         acknowledged_by = coalesce(acknowledged_by, v_staff)
   where id = p_note_id;

  insert into public.college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (n.college_id, auth.uid(), 'safeguarding.decision_recorded', 'pastoral_note', p_note_id,
          jsonb_build_object('decision', p_decision));

  return jsonb_build_object('ok', true, 'id', v_id);
end;
$$;
revoke all on function public.save_safeguarding_decision(uuid, text, text, date, text, text, date, text, date, text) from public, anon;
grant execute on function public.save_safeguarding_decision(uuid, text, text, date, text, text, date, text, date, text) to authenticated;

-- ------------------------------------------------------------ learner status
create or replace function public.set_safeguarding_learner_status(
  p_student uuid,
  p_open boolean,
  p_case_type text default null,
  p_local_authority text default null,
  p_social_worker text default null,
  p_since date default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_college uuid;
  v_staff uuid;
  v_name text;
begin
  select college_id into v_college from public.college_students where id = p_student;
  if v_college is null then
    raise exception 'learner not found' using errcode = 'P0002';
  end if;
  v_staff := public._sg_lead_or_raise(v_college);
  if p_open and (p_case_type is null or p_case_type not in
       ('child_in_need', 'child_protection_plan', 'looked_after', 'early_help', 'other')) then
    raise exception 'choose the type of case' using errcode = '22023';
  end if;
  if p_open and length(btrim(coalesce(p_local_authority, ''))) < 2 then
    raise exception 'name the local authority' using errcode = '22023';
  end if;
  select coalesce(nullif(btrim(name), ''), 'Safeguarding lead') into v_name from public.college_staff where id = v_staff;

  insert into public.college_safeguarding_learner_status as st
    (student_id, college_id, open_csc_case, case_type, local_authority, social_worker, since,
     updated_by, updated_by_name, updated_at)
  values (p_student, v_college, coalesce(p_open, false),
          case when p_open then p_case_type end,
          nullif(btrim(coalesce(p_local_authority, '')), ''),
          nullif(btrim(coalesce(p_social_worker, '')), ''),
          p_since, v_staff, v_name, now())
  on conflict (student_id) do update
     set open_csc_case = excluded.open_csc_case,
         case_type = excluded.case_type,
         local_authority = coalesce(excluded.local_authority, st.local_authority),
         social_worker = coalesce(excluded.social_worker, st.social_worker),
         since = coalesce(excluded.since, st.since),
         updated_by = excluded.updated_by,
         updated_by_name = excluded.updated_by_name,
         updated_at = now();

  insert into public.college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (v_college, auth.uid(), 'safeguarding.csc_case_' || case when p_open then 'open' else 'closed' end,
          'college_student', p_student, '{}'::jsonb);

  return jsonb_build_object('ok', true);
end;
$$;
revoke all on function public.set_safeguarding_learner_status(uuid, boolean, text, text, text, date) from public, anon;
grant execute on function public.set_safeguarding_learner_status(uuid, boolean, text, text, text, date) to authenticated;

-- ------------------------------------------------------------ transfers list
-- Learners who have left this college (Transferred, Withdrawn or Completed)
-- and have at least one safeguarding concern: the child protection file has to
-- go to their next setting. Plus files other Elec-Mate colleges sent to us.
create or replace function public.list_cp_file_transfers(p_college uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_today date := (now() at time zone 'Europe/London')::date;
begin
  perform public._sg_lead_or_raise(p_college);
  return jsonb_build_object(
    'outgoing', coalesce((
      select jsonb_agg(x order by x->>'left_on' desc nulls last)
        from (
          select jsonb_build_object(
                   'student_id', s.id,
                   'student_name', s.name,
                   'date_of_birth', s.date_of_birth,
                   'status', s.status,
                   'left_on', l.left_on,
                   'due_by', l.left_on + 5,
                   'overdue', t.id is null and l.left_on is not null and l.left_on + 5 < v_today,
                   'concerns', (select count(*) from public.pastoral_notes pn
                                 where pn.student_id = s.id and pn.visibility = 'safeguarding'),
                   'suggested_provider', mv.to_college_name,
                   'suggested_college_id', mv.to_college_id,
                   'move_id', mv.id,
                   'transfer', case when t.id is null then null else to_jsonb(t) end
                 ) as x
            from public.college_students s
            cross join lateral (
              select coalesce(s.learning_actual_end_date,
                       (select max(e.effective_date) from public.college_student_lifecycle_events e
                         where e.student_id = s.id and e.kind = 'status' and e.to_status = s.status)) as left_on
            ) l
            left join lateral (
              select m.* from public.college_learner_moves m
               where m.from_student_id = s.id order by m.moved_at desc limit 1
            ) mv on true
            left join lateral (
              select t2.* from public.college_cp_file_transfers t2
               where t2.student_id = s.id order by t2.sent_at desc limit 1
            ) t on true
           where s.college_id = p_college
             and s.status in ('Transferred', 'Withdrawn', 'Completed')
             and exists (select 1 from public.pastoral_notes pn
                          where pn.student_id = s.id and pn.visibility = 'safeguarding')
        ) q), '[]'::jsonb),
    'incoming', coalesce((
      select jsonb_agg(jsonb_build_object(
               'transfer', to_jsonb(t) - 'notes',
               'student_name', s.name,
               'from_college', (select c.name from public.colleges c where c.id = t.college_id))
             order by t.sent_at desc)
        from public.college_cp_file_transfers t
        join public.college_students s on s.id = t.student_id
       where t.to_college_id = p_college), '[]'::jsonb)
  );
end;
$$;
revoke all on function public.list_cp_file_transfers(uuid) from public, anon;
grant execute on function public.list_cp_file_transfers(uuid) to authenticated;

-- ------------------------------------------------------------ record sent
create or replace function public.record_cp_file_sent(
  p_student uuid,
  p_to_provider text,
  p_method text,
  p_sent_at timestamptz default now(),
  p_to_dsl_name text default null,
  p_to_dsl_contact text default null,
  p_to_college_id uuid default null,
  p_notes text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  s record;
  v_staff uuid;
  v_name text;
  v_left date;
  v_move uuid;
  v_id uuid;
begin
  select id, college_id, status, learning_actual_end_date into s from public.college_students where id = p_student;
  if s.id is null then
    raise exception 'learner not found' using errcode = 'P0002';
  end if;
  v_staff := public._sg_lead_or_raise(s.college_id);
  if length(btrim(coalesce(p_to_provider, ''))) < 2 then
    raise exception 'name the school, college or provider it went to' using errcode = '22023';
  end if;
  if p_method is null or p_method not in ('secure_email', 'secure_portal', 'in_person', 'recorded_delivery') then
    raise exception 'say how it was sent securely' using errcode = '22023';
  end if;
  if p_sent_at is null or p_sent_at > now() + interval '5 minutes' then
    raise exception 'the date sent cannot be in the future' using errcode = '22023';
  end if;
  if p_to_college_id = s.college_id then
    raise exception 'the receiving college must be a different college' using errcode = '22023';
  end if;

  v_left := coalesce(s.learning_actual_end_date,
    (select max(e.effective_date) from public.college_student_lifecycle_events e
      where e.student_id = s.id and e.kind = 'status' and e.to_status = s.status));
  select m.id into v_move from public.college_learner_moves m
   where m.from_student_id = s.id order by m.moved_at desc limit 1;
  select coalesce(nullif(btrim(name), ''), 'Safeguarding lead') into v_name from public.college_staff where id = v_staff;

  insert into public.college_cp_file_transfers (
    student_id, college_id, move_id, left_on, due_by, to_provider_name, to_college_id,
    to_dsl_name, to_dsl_contact, method, sent_at, sent_by, sent_by_name, notes)
  values (
    s.id, s.college_id, v_move, v_left, v_left + 5, btrim(p_to_provider), p_to_college_id,
    nullif(btrim(coalesce(p_to_dsl_name, '')), ''), nullif(btrim(coalesce(p_to_dsl_contact, '')), ''),
    p_method, p_sent_at, v_staff, v_name, nullif(btrim(coalesce(p_notes, '')), ''))
  returning id into v_id;

  insert into public.college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (s.college_id, auth.uid(), 'safeguarding.cp_file_sent', 'college_student', s.id,
          jsonb_build_object('transfer_id', v_id, 'method', p_method));

  return jsonb_build_object('ok', true, 'id', v_id);
end;
$$;
revoke all on function public.record_cp_file_sent(uuid, text, text, timestamptz, text, text, uuid, text) from public, anon;
grant execute on function public.record_cp_file_sent(uuid, text, text, timestamptz, text, text, uuid, text) to authenticated;

-- ------------------------------------------------------------ record receipt
-- By the sending lead (confirmation they obtained), or by the receiving
-- college's lead in the app when the receiving college is on Elec-Mate.
create or replace function public.record_cp_file_receipt(
  p_transfer uuid,
  p_by_name text,
  p_by_role text default null,
  p_how text default 'email_confirmation',
  p_received_at timestamptz default now(),
  p_note text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  t public.college_cp_file_transfers;
  v_staff uuid;
  v_name text;
  v_side text;
begin
  select * into t from public.college_cp_file_transfers where id = p_transfer;
  if t.id is null then
    raise exception 'transfer not found' using errcode = 'P0002';
  end if;
  if t.receipt_at is not null then
    raise exception 'receipt is already recorded' using errcode = '22023';
  end if;
  v_staff := public._safeguarding_reader_staff_id(t.college_id);
  v_side := 'sender';
  if v_staff is null and t.to_college_id is not null then
    v_staff := public._safeguarding_reader_staff_id(t.to_college_id);
    v_side := 'receiver';
  end if;
  if v_staff is null then
    raise exception 'not authorised: safeguarding leads only' using errcode = '42501';
  end if;
  if not public.college_staff_mfa_ok() then
    raise exception 'two-step sign-in is required to read safeguarding records' using errcode = '42501';
  end if;
  if length(btrim(coalesce(p_by_name, ''))) < 2 then
    raise exception 'name the person who confirmed receipt' using errcode = '22023';
  end if;
  if p_how is null or p_how not in ('email_confirmation', 'signed_slip', 'portal_confirmation', 'in_app') then
    raise exception 'say how receipt was confirmed' using errcode = '22023';
  end if;
  if p_received_at is null or p_received_at > now() + interval '5 minutes' or p_received_at < t.sent_at - interval '1 day' then
    raise exception 'the receipt date must be on or after the date sent, and not in the future' using errcode = '22023';
  end if;
  select coalesce(nullif(btrim(name), ''), 'Safeguarding lead') into v_name from public.college_staff where id = v_staff;

  update public.college_cp_file_transfers
     set receipt_at = p_received_at,
         receipt_by_name = btrim(p_by_name),
         receipt_by_role = nullif(btrim(coalesce(p_by_role, '')), ''),
         receipt_how = case when v_side = 'receiver' then 'in_app' else p_how end,
         receipt_note = nullif(btrim(coalesce(p_note, '')), ''),
         receipt_recorded_by = auth.uid(),
         receipt_recorded_name = v_name
   where id = p_transfer;

  insert into public.college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (case when v_side = 'receiver' then t.to_college_id else t.college_id end, auth.uid(),
          'safeguarding.cp_file_receipt', 'college_student', t.student_id,
          jsonb_build_object('transfer_id', t.id, 'side', v_side));

  return jsonb_build_object('ok', true, 'side', v_side);
end;
$$;
revoke all on function public.record_cp_file_receipt(uuid, text, text, text, timestamptz, text) from public, anon;
grant execute on function public.record_cp_file_receipt(uuid, text, text, text, timestamptz, text) to authenticated;

-- ------------------------------------------------------------ day-one export
create or replace function public.get_safeguarding_inspection_export(p_college uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_staff uuid;
  v_out jsonb;
begin
  v_staff := public._sg_lead_or_raise(p_college);

  select jsonb_build_object(
    'college', (select c.name from public.colleges c where c.id = p_college),
    'generated_at', now(),
    'generated_by', (select st.name from public.college_staff st where st.id = v_staff),
    'leads', coalesce((select jsonb_agg(jsonb_build_object(
                 'name', st.name, 'role', case when st.is_dsl then 'Designated safeguarding lead' else 'Deputy lead' end,
                 'prevent_lead', coalesce(st.is_prevent_lead, false))
               order by st.is_dsl desc, st.name)
             from public.college_staff st
            where st.college_id = p_college and st.archived_at is null and (st.is_dsl or st.is_deputy_dsl)), '[]'::jsonb),
    'concerns', coalesce((select jsonb_agg(jsonb_build_object(
                 'id', pn.id,
                 'learner', s.name,
                 'date_of_birth', s.date_of_birth,
                 'logged_at', pn.created_at,
                 'logged_by', au.name,
                 'title', pn.title,
                 'summary', pn.body,
                 'action_required', pn.action_required,
                 'action_by', pn.action_by_date,
                 'acknowledged_at', pn.acknowledged_at,
                 'closed_at', pn.closed_at,
                 'outcome', pn.closure_note,
                 'decision', d.decision,
                 'rationale', d.rationale,
                 'decided_by', d.decided_by_name,
                 'decided_at', d.decided_at,
                 'la_referral_on', d.la_referral_on, 'la_name', d.la_name, 'la_reference', d.la_reference,
                 'lado_referral_on', d.lado_referral_on, 'lado_reference', d.lado_reference,
                 'channel_referral_on', d.channel_referral_on, 'channel_reference', d.channel_reference,
                 'earlier_decisions', (select count(*) from public.college_safeguarding_decisions d2
                                        where d2.note_id = pn.id and d2.superseded_at is not null))
               order by pn.created_at desc)
             from public.pastoral_notes pn
             join public.college_students s on s.id = pn.student_id
             left join public.college_staff au on au.id = pn.author_id
             left join public.college_safeguarding_decisions d on d.note_id = pn.id and d.superseded_at is null
            where s.college_id = p_college and pn.visibility = 'safeguarding'), '[]'::jsonb),
    'open_csc_cases', coalesce((select jsonb_agg(jsonb_build_object(
                 'learner', s.name, 'case_type', ls.case_type, 'local_authority', ls.local_authority,
                 'social_worker', ls.social_worker, 'since', ls.since, 'updated_at', ls.updated_at)
               order by s.name)
             from public.college_safeguarding_learner_status ls
             join public.college_students s on s.id = ls.student_id
            where ls.college_id = p_college and ls.open_csc_case), '[]'::jsonb),
    'transfers', coalesce((select jsonb_agg(jsonb_build_object(
                 'learner', s.name, 'left_on', t.left_on, 'due_by', t.due_by,
                 'to', t.to_provider_name, 'to_lead', t.to_dsl_name, 'method', t.method,
                 'sent_at', t.sent_at, 'sent_by', t.sent_by_name,
                 'receipt_at', t.receipt_at, 'receipt_by', t.receipt_by_name,
                 'receipt_role', t.receipt_by_role, 'receipt_how', t.receipt_how)
               order by t.sent_at desc)
             from public.college_cp_file_transfers t
             join public.college_students s on s.id = t.student_id
            where t.college_id = p_college), '[]'::jsonb)
  ) into v_out;

  insert into public.college_activity (college_id, actor_id, action, entity_type, entity_id, details)
  values (p_college, auth.uid(), 'safeguarding.inspection_export', 'college', p_college,
          jsonb_build_object('concerns', jsonb_array_length(v_out->'concerns')));

  return v_out;
end;
$$;
revoke all on function public.get_safeguarding_inspection_export(uuid) from public, anon;
grant execute on function public.get_safeguarding_inspection_export(uuid) to authenticated;

commit;
