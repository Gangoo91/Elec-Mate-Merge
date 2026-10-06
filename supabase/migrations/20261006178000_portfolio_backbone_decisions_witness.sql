-- Portfolio 2.0 backbone, step 4 (ELE-1860, ELE-1867, ELE-1869, ELE-1870,
-- ELE-1871, ELE-1863). Approved by Andrew 6 Oct ("do it all").
--
-- The learner owns the record (keyed on auth uid). Assessors, IQAs, witnesses
-- and independent assessors add to it; nobody but the learner changes what
-- the learner wrote, and the learner never awards themselves a decision.
--
--   portfolio_assessor_links       learner invites an independent assessor (no college needed)
--   portfolio_assessment_decisions one decision per criterion, append-only, superseded not edited
--   portfolio_witness_statements   a supervisor signs from a link with no account
--   portfolio_submission_items     a submission knows exactly which evidence it covers
--   get_portfolio_ac_state()       the one honest per-criterion state for every screen

-- 1. Independent assessor links ---------------------------------------------
create table if not exists public.portfolio_assessor_links (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references auth.users(id) on delete cascade,
  assessor_email text not null,
  assessor_name text,
  organisation text,
  role text not null default 'assessor' check (role in ('assessor', 'iqa', 'epa_assessor', 'employer')),
  token text not null unique default encode(extensions.gen_random_bytes(24), 'hex'),
  assessor_user_id uuid references auth.users(id) on delete set null,
  status text not null default 'invited' check (status in ('invited', 'active', 'revoked', 'expired')),
  expires_at timestamptz not null default now() + interval '30 days',
  accepted_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists portfolio_assessor_links_learner_idx on public.portfolio_assessor_links (learner_id);
create index if not exists portfolio_assessor_links_assessor_idx on public.portfolio_assessor_links (assessor_user_id) where status = 'active';
alter table public.portfolio_assessor_links enable row level security;

drop policy if exists "Learner manages own assessor links" on public.portfolio_assessor_links;
create policy "Learner manages own assessor links" on public.portfolio_assessor_links
  for all to authenticated using (learner_id = auth.uid()) with check (learner_id = auth.uid());
drop policy if exists "Linked assessor reads own link" on public.portfolio_assessor_links;
create policy "Linked assessor reads own link" on public.portfolio_assessor_links
  for select to authenticated using (assessor_user_id = auth.uid());

create or replace function public._assessor_links_guard()
returns trigger language plpgsql security invoker set search_path to 'public' as $$
begin
  if current_user not in ('authenticated', 'anon') then return new; end if;
  if tg_op = 'INSERT' then
    new.status := 'invited'; new.assessor_user_id := null; new.accepted_at := null;
    return new;
  end if;
  if new.assessor_user_id is distinct from old.assessor_user_id
     or new.accepted_at is distinct from old.accepted_at
     or (new.status = 'active' and old.status <> 'active')
     or new.learner_id is distinct from old.learner_id
     or new.token is distinct from old.token then
    raise exception 'an assessor link is activated by the assessor accepting it' using errcode = '42501';
  end if;
  if new.status = 'revoked' and old.status <> 'revoked' then new.revoked_at := now(); end if;
  return new;
end; $$;
drop trigger if exists trg_assessor_links_guard on public.portfolio_assessor_links;
create trigger trg_assessor_links_guard before insert or update on public.portfolio_assessor_links
  for each row execute function public._assessor_links_guard();

create or replace function public.get_assessor_invite(p_token text)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare l public.portfolio_assessor_links%rowtype; v_name text;
begin
  select * into l from public.portfolio_assessor_links where token = p_token;
  if l.id is null then return jsonb_build_object('error', 'invite_not_found'); end if;
  if l.status = 'revoked' then return jsonb_build_object('error', 'invite_revoked'); end if;
  if l.status = 'invited' and l.expires_at < now() then return jsonb_build_object('error', 'invite_expired'); end if;
  select coalesce(full_name, 'An apprentice') into v_name from public.profiles where id = l.learner_id;
  return jsonb_build_object('learner_name', v_name, 'role', l.role, 'assessor_email', l.assessor_email,
                            'status', l.status, 'expires_at', l.expires_at);
end; $$;
grant execute on function public.get_assessor_invite(text) to anon, authenticated;

create or replace function public.accept_assessor_invite(p_token text)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare l public.portfolio_assessor_links%rowtype; v_name text;
begin
  if auth.uid() is null then return jsonb_build_object('error', 'sign_in_required'); end if;
  select * into l from public.portfolio_assessor_links where token = p_token for update;
  if l.id is null then return jsonb_build_object('error', 'invite_not_found'); end if;
  if l.status = 'revoked' then return jsonb_build_object('error', 'invite_revoked'); end if;
  if l.learner_id = auth.uid() then return jsonb_build_object('error', 'cannot_assess_self'); end if;
  if l.status = 'active' then
    if l.assessor_user_id = auth.uid() then
      return jsonb_build_object('success', true, 'learner_id', l.learner_id, 'already', true);
    end if;
    return jsonb_build_object('error', 'invite_already_used');
  end if;
  if l.expires_at < now() then return jsonb_build_object('error', 'invite_expired'); end if;
  update public.portfolio_assessor_links
     set status = 'active', assessor_user_id = auth.uid(), accepted_at = now()
   where id = l.id;
  select coalesce(full_name, 'Apprentice') into v_name from public.profiles where id = l.learner_id;
  return jsonb_build_object('success', true, 'learner_id', l.learner_id, 'learner_name', v_name, 'role', l.role);
end; $$;
grant execute on function public.accept_assessor_invite(text) to authenticated;

create or replace function public._can_assess(p_learner uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select public._is_platform_admin()
      or exists (select 1 from public.college_student_assignments a
                  where a.student_id = p_learner
                    and auth.uid() in (a.tutor_id, a.assessor_id, a.iqa_id))
      or exists (select 1
                   from public.college_students s
                   join public.college_staff st on st.college_id = s.college_id
                  where s.user_id = p_learner
                    and st.user_id = auth.uid()
                    and st.archived_at is null
                    and coalesce(st.status, 'Active') <> 'Archived'
                    and st.role in ('tutor', 'assessor', 'iqa', 'admin', 'head_of_department'))
      or exists (select 1 from public.portfolio_assessor_links l
                  where l.learner_id = p_learner and l.assessor_user_id = auth.uid()
                    and l.status = 'active' and l.role in ('assessor', 'iqa', 'epa_assessor'));
$$;

drop policy if exists "Linked assessor reads learner evidence" on public.portfolio_items;
create policy "Linked assessor reads learner evidence" on public.portfolio_items
  for select to authenticated using (
    exists (select 1 from public.portfolio_assessor_links l
             where l.learner_id = portfolio_items.user_id and l.assessor_user_id = auth.uid()
               and l.status = 'active'));

create or replace function public._can_iqa(p_learner uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select public._is_platform_admin()
      or exists (select 1 from public.college_student_assignments a
                  where a.student_id = p_learner and a.iqa_id = auth.uid())
      or exists (select 1
                   from public.college_students s
                   join public.college_staff st on st.college_id = s.college_id
                  where s.user_id = p_learner and st.user_id = auth.uid()
                    and st.archived_at is null
                    and st.role in ('iqa', 'admin', 'head_of_department'))
      or exists (select 1 from public.portfolio_assessor_links l
                  where l.learner_id = p_learner and l.assessor_user_id = auth.uid()
                    and l.status = 'active' and l.role = 'iqa');
$$;
grant execute on function public._can_iqa(uuid) to authenticated;

-- 2. Assessment decisions ----------------------------------------------------
create table if not exists public.portfolio_assessment_decisions (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references auth.users(id) on delete cascade,
  qualification_code text not null,
  unit_code text not null,
  ac_code text not null,
  decision text not null check (decision in ('passed', 'referred', 'not_yet')),
  feedback text,
  feedback_source text not null default 'assessor' check (feedback_source in ('assessor', 'ai_draft_confirmed')),
  evidence_item_ids uuid[] not null default '{}',
  submission_id uuid references public.portfolio_submissions(id) on delete set null,
  method text check (method in ('evidence_review', 'observation', 'professional_discussion', 'questioning', 'witness', 'product', 'imported')),
  assessor_id uuid not null references auth.users(id),
  assessor_name text,
  decided_at timestamptz not null default now(),
  superseded_at timestamptz,
  superseded_by uuid references public.portfolio_assessment_decisions(id),
  iqa_verdict text check (iqa_verdict in ('confirmed', 'not_confirmed')),
  iqa_feedback text,
  iqa_by uuid references auth.users(id),
  iqa_at timestamptz,
  content_hash text,
  created_at timestamptz not null default now()
);
create index if not exists pad_learner_current_idx
  on public.portfolio_assessment_decisions (learner_id, qualification_code, unit_code, ac_code)
  where superseded_at is null;
create index if not exists pad_assessor_idx on public.portfolio_assessment_decisions (assessor_id, decided_at desc);
alter table public.portfolio_assessment_decisions enable row level security;

drop policy if exists "Learner reads own decisions" on public.portfolio_assessment_decisions;
create policy "Learner reads own decisions" on public.portfolio_assessment_decisions
  for select to authenticated using (learner_id = auth.uid());
drop policy if exists "Assessing staff read decisions" on public.portfolio_assessment_decisions;
create policy "Assessing staff read decisions" on public.portfolio_assessment_decisions
  for select to authenticated using (public._can_assess(learner_id));
drop policy if exists "Assessing staff record decisions" on public.portfolio_assessment_decisions;
create policy "Assessing staff record decisions" on public.portfolio_assessment_decisions
  for insert to authenticated with check (public._can_assess(learner_id) and learner_id <> auth.uid());
drop policy if exists "IQA records verdicts" on public.portfolio_assessment_decisions;
create policy "IQA records verdicts" on public.portfolio_assessment_decisions
  for update to authenticated using (public._can_iqa(learner_id)) with check (public._can_iqa(learner_id));

create or replace function public._pad_before_insert()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if auth.uid() is not null then
    new.assessor_id := auth.uid();
  end if;
  if new.assessor_name is null then
    select coalesce(full_name, 'Assessor') into new.assessor_name from public.profiles where id = new.assessor_id;
  end if;
  new.decided_at := now();
  new.superseded_at := null; new.superseded_by := null;
  new.iqa_verdict := null; new.iqa_by := null; new.iqa_at := null; new.iqa_feedback := null;
  new.content_hash := encode(extensions.digest(
    concat_ws('|', new.learner_id, new.qualification_code, new.unit_code, new.ac_code, new.decision,
              coalesce(new.feedback, ''), array_to_string(new.evidence_item_ids, ','), new.assessor_id,
              new.decided_at), 'sha256'), 'hex');
  return new;
end; $$;
drop trigger if exists trg_pad_before_insert on public.portfolio_assessment_decisions;
create trigger trg_pad_before_insert before insert on public.portfolio_assessment_decisions
  for each row execute function public._pad_before_insert();

create or replace function public._pad_after_insert()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare v_student uuid;
begin
  update public.portfolio_assessment_decisions
     set superseded_at = new.decided_at, superseded_by = new.id
   where learner_id = new.learner_id and qualification_code = new.qualification_code
     and unit_code = new.unit_code and ac_code = new.ac_code
     and superseded_at is null and id <> new.id;

  select college_student_id into v_student from public._resolve_qualification(new.learner_id, null);
  if v_student is not null then
    update public.student_ac_coverage
       set status = case new.decision when 'passed' then 'assessed'
                                      when 'referred' then 'in_progress'
                                      else status end,
           assessor_id = new.assessor_id,
           last_assessed_at = new.decided_at,
           notes = coalesce(new.feedback, notes),
           updated_at = now()
     where student_id = v_student and qualification_code = new.qualification_code
       and unit_code = new.unit_code and ac_code = new.ac_code;
  end if;
  return new;
end; $$;
drop trigger if exists trg_pad_after_insert on public.portfolio_assessment_decisions;
create trigger trg_pad_after_insert after insert on public.portfolio_assessment_decisions
  for each row execute function public._pad_after_insert();

create or replace function public._pad_update_guard()
returns trigger language plpgsql security invoker set search_path to 'public' as $$
begin
  if current_user not in ('authenticated', 'anon') then return new; end if;
  if (to_jsonb(new) - 'iqa_verdict' - 'iqa_feedback' - 'iqa_by' - 'iqa_at')
     is distinct from (to_jsonb(old) - 'iqa_verdict' - 'iqa_feedback' - 'iqa_by' - 'iqa_at') then
    raise exception 'a decision is never edited; record a new one' using errcode = '42501';
  end if;
  if old.superseded_at is not null then
    raise exception 'that decision has been superseded' using errcode = '42501';
  end if;
  if new.iqa_verdict is distinct from old.iqa_verdict then
    if old.assessor_id = auth.uid() then
      raise exception 'an IQA cannot confirm their own decision' using errcode = '42501';
    end if;
    new.iqa_by := auth.uid();
    new.iqa_at := now();
  end if;
  return new;
end; $$;
drop trigger if exists trg_pad_update_guard on public.portfolio_assessment_decisions;
create trigger trg_pad_update_guard before update on public.portfolio_assessment_decisions
  for each row execute function public._pad_update_guard();

create or replace function public.record_ac_decisions(
  p_learner_id uuid,
  p_criteria jsonb,
  p_decision text,
  p_feedback text default null,
  p_evidence_item_ids uuid[] default '{}',
  p_submission_id uuid default null,
  p_method text default 'evidence_review',
  p_feedback_source text default 'assessor')
returns jsonb language plpgsql security invoker set search_path to 'public' as $$
declare
  v_code text;
  c jsonb;
  n int := 0;
begin
  if not public._can_assess(p_learner_id) or p_learner_id = auth.uid() then
    raise exception 'you are not an assessor for this learner' using errcode = '42501';
  end if;
  select requirement_code into v_code from public._resolve_qualification(p_learner_id, null);
  if v_code is null then
    raise exception 'this learner has no qualification set' using errcode = 'P0001';
  end if;
  for c in select * from jsonb_array_elements(p_criteria) loop
    insert into public.portfolio_assessment_decisions
      (learner_id, qualification_code, unit_code, ac_code, decision, feedback, feedback_source,
       evidence_item_ids, submission_id, method, assessor_id)
    values (p_learner_id, v_code, c->>'unit_code', c->>'ac_code', p_decision, p_feedback,
            coalesce(p_feedback_source, 'assessor'), coalesce(p_evidence_item_ids, '{}'),
            p_submission_id, p_method, auth.uid());
    n := n + 1;
  end loop;
  return jsonb_build_object('recorded', n, 'qualification_code', v_code);
end; $$;
grant execute on function public.record_ac_decisions(uuid, jsonb, text, text, uuid[], uuid, text, text) to authenticated;

-- 3. Witness statements ------------------------------------------------------
create table if not exists public.portfolio_witness_statements (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references auth.users(id) on delete cascade,
  portfolio_item_id uuid references public.portfolio_items(id) on delete set null,
  token text not null unique default encode(extensions.gen_random_bytes(24), 'hex'),
  witness_email text,
  witness_name text,
  witness_role text,
  witness_company text,
  statement text,
  criteria text[] not null default '{}',
  signature_data text,
  evidence_snapshot jsonb,
  evidence_hash text,
  statement_hash text,
  status text not null default 'requested' check (status in ('requested', 'signed', 'withdrawn', 'expired')),
  expires_at timestamptz not null default now() + interval '30 days',
  signed_at timestamptz,
  signer_ip text,
  created_at timestamptz not null default now()
);
create index if not exists pws_learner_idx on public.portfolio_witness_statements (learner_id, created_at desc);
alter table public.portfolio_witness_statements enable row level security;

drop policy if exists "Learner manages own witness requests" on public.portfolio_witness_statements;
create policy "Learner manages own witness requests" on public.portfolio_witness_statements
  for all to authenticated using (learner_id = auth.uid()) with check (learner_id = auth.uid());
drop policy if exists "Assessing staff read witness statements" on public.portfolio_witness_statements;
create policy "Assessing staff read witness statements" on public.portfolio_witness_statements
  for select to authenticated using (public._can_assess(learner_id));

create or replace function public._witness_owner_guard()
returns trigger language plpgsql security invoker set search_path to 'public' as $$
begin
  if current_user not in ('authenticated', 'anon') then return new; end if;
  if tg_op = 'INSERT' then
    new.status := 'requested';
    new.witness_name := null; new.witness_role := null; new.witness_company := null;
    new.statement := null; new.signature_data := null; new.signed_at := null;
    new.statement_hash := null; new.signer_ip := null;
    if new.portfolio_item_id is not null then
      select jsonb_build_object('title', title, 'description', description,
                                'criteria', assessment_criteria_met, 'captured_at', created_at)
        into new.evidence_snapshot
        from public.portfolio_items where id = new.portfolio_item_id and user_id = new.learner_id;
      new.evidence_hash := encode(extensions.digest(coalesce(new.evidence_snapshot::text, ''), 'sha256'), 'hex');
    end if;
    return new;
  end if;
  if (to_jsonb(new) - 'status') is distinct from (to_jsonb(old) - 'status')
     or new.status not in ('withdrawn', old.status)
     or (new.status = 'withdrawn' and old.status = 'signed') then
    raise exception 'a witness statement is signed by the witness; you can only withdraw an unsigned request'
      using errcode = '42501';
  end if;
  return new;
end; $$;
drop trigger if exists trg_witness_owner_guard on public.portfolio_witness_statements;
create trigger trg_witness_owner_guard before insert or update on public.portfolio_witness_statements
  for each row execute function public._witness_owner_guard();

create or replace function public.get_witness_request(p_token text)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare w public.portfolio_witness_statements%rowtype; v_name text;
begin
  select * into w from public.portfolio_witness_statements where token = p_token;
  if w.id is null then return jsonb_build_object('error', 'not_found'); end if;
  if w.status = 'withdrawn' then return jsonb_build_object('error', 'withdrawn'); end if;
  if w.status = 'requested' and w.expires_at < now() then return jsonb_build_object('error', 'expired'); end if;
  select coalesce(full_name, 'An apprentice') into v_name from public.profiles where id = w.learner_id;
  return jsonb_build_object(
    'learner_name', v_name, 'status', w.status, 'criteria', w.criteria,
    'evidence', w.evidence_snapshot, 'signed_at', w.signed_at,
    'witness_name', case when w.status = 'signed' then w.witness_name end);
end; $$;
grant execute on function public.get_witness_request(text) to anon, authenticated;

create or replace function public.sign_witness_statement(
  p_token text, p_name text, p_role text, p_company text, p_statement text, p_signature text)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare w public.portfolio_witness_statements%rowtype; v_hash text; v_ip text;
begin
  if coalesce(trim(p_name), '') = '' or coalesce(trim(p_statement), '') = '' or coalesce(p_signature, '') = '' then
    return jsonb_build_object('error', 'name_statement_and_signature_required');
  end if;
  select * into w from public.portfolio_witness_statements where token = p_token for update;
  if w.id is null then return jsonb_build_object('error', 'not_found'); end if;
  if w.status <> 'requested' then return jsonb_build_object('error', 'already_' || w.status); end if;
  if w.expires_at < now() then return jsonb_build_object('error', 'expired'); end if;
  if length(p_signature) > 400000 then return jsonb_build_object('error', 'signature_too_large'); end if;
  begin
    v_ip := left(current_setting('request.headers', true)::jsonb->>'x-forwarded-for', 60);
  exception when others then v_ip := null; end;
  v_hash := encode(extensions.digest(concat_ws('|', w.id, trim(p_name), coalesce(p_role, ''), coalesce(p_company, ''),
                                    trim(p_statement), coalesce(w.evidence_hash, ''), now()), 'sha256'), 'hex');
  update public.portfolio_witness_statements
     set witness_name = left(trim(p_name), 120), witness_role = left(p_role, 120),
         witness_company = left(p_company, 160), statement = left(trim(p_statement), 6000),
         signature_data = p_signature, status = 'signed', signed_at = now(), statement_hash = v_hash,
         signer_ip = v_ip
   where id = w.id;
  return jsonb_build_object('success', true, 'statement_hash', v_hash);
end; $$;
grant execute on function public.sign_witness_statement(text, text, text, text, text, text) to anon, authenticated;

-- 4. Submission items --------------------------------------------------------
create table if not exists public.portfolio_submission_items (
  submission_id uuid not null references public.portfolio_submissions(id) on delete cascade,
  portfolio_item_id uuid not null references public.portfolio_items(id) on delete cascade,
  added_at timestamptz not null default now(),
  primary key (submission_id, portfolio_item_id)
);
alter table public.portfolio_submission_items enable row level security;

drop policy if exists "Learner manages own submission items" on public.portfolio_submission_items;
create policy "Learner manages own submission items" on public.portfolio_submission_items
  for all to authenticated
  using (exists (select 1 from public.portfolio_submissions s
                  where s.id = submission_id and s.user_id = auth.uid()))
  with check (
    exists (select 1 from public.portfolio_submissions s
             where s.id = submission_id and s.user_id = auth.uid()
               and coalesce(s.status, 'submitted') in ('draft', 'submitted', 'resubmitted', 'feedback_given'))
    and exists (select 1 from public.portfolio_items i
                 where i.id = portfolio_item_id and i.user_id = auth.uid()));
drop policy if exists "Assessing staff read submission items" on public.portfolio_submission_items;
create policy "Assessing staff read submission items" on public.portfolio_submission_items
  for select to authenticated
  using (exists (select 1 from public.portfolio_submissions s
                  where s.id = submission_id and public._can_assess(s.user_id)));

drop policy if exists "Linked assessor reads submissions" on public.portfolio_submissions;
create policy "Linked assessor reads submissions" on public.portfolio_submissions
  for select to authenticated using (
    exists (select 1 from public.portfolio_assessor_links l
             where l.learner_id = portfolio_submissions.user_id and l.assessor_user_id = auth.uid()
               and l.status = 'active'));

-- 5. The one honest per-criterion state --------------------------------------
create or replace function public.get_portfolio_ac_state(p_user_id uuid default null)
returns table (
  unit_code text, unit_title text, lo_number int, lo_text text, ac_code text, ac_text text,
  state text, evidence_item_ids uuid[], decision_id uuid, decision_feedback text,
  decided_at timestamptz, assessor_name text, iqa_verdict text, qualification_code text)
language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_user uuid := coalesce(p_user_id, auth.uid());
  r record;
begin
  if v_user is null or not (v_user = auth.uid() or public._can_assess(v_user)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  select * into r from public._resolve_qualification(v_user, null);
  if r.requirement_code is null then return; end if;

  return query
  with ev as (
    select pi.id item_id,
      coalesce(
        (regexp_match(s, 'Unit\s*([A-Za-z0-9/._-]+)'))[1],
        (regexp_match(s, '^\s*([A-Za-z0-9/._-]+)\s+AC\b'))[1],
        (regexp_match(s, '([A-Za-z0-9/._-]+)\s*AC\b'))[1]) as u,
      (regexp_match(s, 'AC\s*([0-9]+(?:\.[0-9]+)*)'))[1] as a
    from public.portfolio_items pi, unnest(pi.assessment_criteria_met) s
    where pi.user_id = v_user
  ),
  open_items as (
    select si.portfolio_item_id
      from public.portfolio_submission_items si
      join public.portfolio_submissions ps on ps.id = si.submission_id
     where ps.user_id = v_user and coalesce(ps.status, 'submitted') in ('submitted', 'resubmitted', 'under_review')
  ),
  cur as (
    select distinct on (d.unit_code, d.ac_code) d.*
      from public.portfolio_assessment_decisions d
     where d.learner_id = v_user and d.qualification_code = r.requirement_code and d.superseded_at is null
     order by d.unit_code, d.ac_code, d.decided_at desc
  )
  select qr.unit_code, qr.unit_title, qr.lo_number, qr.lo_text, qr.ac_code, qr.ac_text,
    case
      when cur.decision = 'passed' and cur.iqa_verdict = 'confirmed' then 'iqa_confirmed'
      when cur.decision is not null then cur.decision
      when exists (select 1 from ev join open_items o on o.portfolio_item_id = ev.item_id
                    where ev.u = qr.unit_code and ev.a = qr.ac_code) then 'submitted'
      when exists (select 1 from ev where ev.u = qr.unit_code and ev.a = qr.ac_code) then 'claimed'
      else 'not_started'
    end,
    coalesce((select array_agg(distinct ev.item_id) from ev where ev.u = qr.unit_code and ev.a = qr.ac_code), '{}'),
    cur.id, cur.feedback, cur.decided_at, cur.assessor_name, cur.iqa_verdict, r.requirement_code
  from public.qualification_requirements qr
  left join cur on cur.unit_code = qr.unit_code and cur.ac_code = qr.ac_code
  where qr.qualification_code = r.requirement_code
  order by qr.unit_code, qr.lo_number, qr.ac_code;
end; $$;
grant execute on function public.get_portfolio_ac_state(uuid) to authenticated;

-- 6. Notify the learner when a decision lands --------------------------------
create or replace function public._pad_notify_learner()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  begin
    insert into public.user_notifications (user_id, type, title, message, link, metadata)
    values (new.learner_id, 'assessment_decision',
            case new.decision when 'passed' then 'Criterion passed'
                              when 'referred' then 'Your assessor needs more on a criterion'
                              else 'Not yet: your assessor left feedback' end,
            'Unit ' || new.unit_code || ' AC ' || new.ac_code ||
              coalesce(': ' || left(new.feedback, 140), ''),
            '/apprentice/portfolio',
            jsonb_build_object('decision_id', new.id, 'unit_code', new.unit_code, 'ac_code', new.ac_code));
  exception when others then
    null;
  end;
  return new;
end; $$;
drop trigger if exists trg_pad_notify_learner on public.portfolio_assessment_decisions;
create trigger trg_pad_notify_learner after insert on public.portfolio_assessment_decisions
  for each row execute function public._pad_notify_learner();

-- record_ac_decisions checks _can_assess itself, then needs the internal resolver.
alter function public.record_ac_decisions(uuid, jsonb, text, text, uuid[], uuid, text, text) security definer;
alter function public.record_ac_decisions(uuid, jsonb, text, text, uuid[], uuid, text, text) set search_path to 'public';

-- student_ac_coverage.assessor_id references college_staff.id (not auth uid):
-- map the deciding user to their staff row at the learner's college.
create or replace function public._pad_after_insert()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare v_student uuid; v_college uuid; v_staff uuid;
begin
  update public.portfolio_assessment_decisions
     set superseded_at = new.decided_at, superseded_by = new.id
   where learner_id = new.learner_id and qualification_code = new.qualification_code
     and unit_code = new.unit_code and ac_code = new.ac_code
     and superseded_at is null and id <> new.id;

  select college_student_id into v_student from public._resolve_qualification(new.learner_id, null);
  if v_student is not null then
    select college_id into v_college from public.college_students where id = v_student;
    select id into v_staff from public.college_staff
     where college_id = v_college and user_id = new.assessor_id and archived_at is null limit 1;
    update public.student_ac_coverage
       set status = case new.decision when 'passed' then 'assessed'
                                      when 'referred' then 'in_progress'
                                      else status end,
           assessor_id = coalesce(v_staff, assessor_id),
           last_assessed_at = new.decided_at,
           notes = coalesce(new.feedback, notes),
           updated_at = now()
     where student_id = v_student and qualification_code = new.qualification_code
       and unit_code = new.unit_code and ac_code = new.ac_code;
  end if;
  return new;
end; $$;
