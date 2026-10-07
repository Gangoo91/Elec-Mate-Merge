-- ELE-1883 — the signed parts of the EPAO gateway pack.
--
-- For the electrical standards (ST0152 → AM2S, ST1017 → AM2D) the assessment
-- organisation receives a gateway pack, not the portfolio. Three people sign:
--
--   learner   their declaration (in the app, signed in)
--   provider  the college's readiness declaration over the checklist (Student 360)
--   employer  the behaviours and readiness declaration, through a link with
--             no account (/gateway-declaration/:token), like the hours statement
--
-- Each signature is bound to what the signer saw: the statement text and a
-- snapshot of the gateway checklist, hours and criteria, hashed together. A
-- new signature supersedes the old one; nothing is edited. Writes go only
-- through the functions below; people read through RLS.
--
-- The wording is ours. It is NOT the assessment organisation's own form: the
-- pack says so and lists the organisation's form as "to attach" if they use one.

-- ── Who may be recorded as the actor on the portfolio audit trail ─────────
alter table public.portfolio_audit_events drop constraint if exists portfolio_audit_events_actor_role_check;
alter table public.portfolio_audit_events add constraint portfolio_audit_events_actor_role_check
  check (actor_role = any (array['learner', 'assessor', 'iqa', 'staff', 'witness', 'employer', 'system']));

-- ── Table ──────────────────────────────────────────────────────────────────
create table if not exists public.epa_gateway_declarations (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references auth.users(id) on delete cascade,
  college_student_id uuid references public.college_students(id) on delete set null,
  college_id uuid references public.colleges(id) on delete set null,
  kind text not null check (kind in ('learner', 'provider', 'employer')),
  route text,
  standard_code text,
  standard_title text,
  statement text not null,
  snapshot jsonb not null default '{}'::jsonb,
  snapshot_hash text,
  signer_id uuid references auth.users(id) on delete set null,
  signer_name text,
  signer_role text,
  signer_company text,
  signature_image text,
  signed_at timestamptz,
  token text unique,
  token_expires_at timestamptz,
  requested_by uuid references auth.users(id) on delete set null,
  requested_by_name text,
  created_at timestamptz not null default now(),
  superseded_at timestamptz
);

create index if not exists epa_gateway_declarations_learner_idx
  on public.epa_gateway_declarations (learner_id, kind, created_at desc);

comment on table public.epa_gateway_declarations is
  '[COLLEGE ↔ APPRENTICE ↔ EMPLOYER] Signed gateway declarations for the EPAO gateway pack (ELE-1883): the learner''s declaration, the provider''s readiness declaration and the employer''s behaviours declaration (signed through a no-account link). Scope: learner_id = the apprentice''s auth user. Used by: Student 360 gateway pack sheet, apprentice Portfolio, public /gateway-declaration/:token, portfolio-export-pack. Rule: written only through sign_/request_ gateway functions; each signature is bound to snapshot_hash and never edited — a new one supersedes it.';

alter table public.epa_gateway_declarations enable row level security;

drop policy if exists "epa_gateway_declarations: learner or assessing staff read" on public.epa_gateway_declarations;
create policy "epa_gateway_declarations: learner or assessing staff read"
  on public.epa_gateway_declarations for select to authenticated
  using (learner_id = auth.uid() or public._can_assess(learner_id));

revoke all on public.epa_gateway_declarations from anon;
revoke insert, update, delete on public.epa_gateway_declarations from authenticated;
grant select on public.epa_gateway_declarations to authenticated;

-- ── Which standard does this learner's course lead to? ─────────────────────
-- SQL copy of epaRouteFor (src/lib/epa/readiness.ts, _shared/epa-route.ts).
-- KEEP THE THREE IN STEP. Only the two apprenticeship standards with an EPA
-- carry a standard code here.
create or replace function public._gateway_standard(p_code text)
returns table (route text, standard_code text, standard_title text, assessment text)
language sql
immutable
set search_path = public
as $$
  with c as (select lower(trim(coalesce(p_code, ''))) v),
  m as (
    select k, code from (values
      ('am2s', '5357'), ('am2s', '601/7345/2'), ('am2s', '603/3895/8'), ('am2s', '603/3928/7'), ('am2s', 'st0152'),
      ('am2', '2357'), ('am2', '1605'), ('am2', 'eal-netp3'),
      ('am2e', '2346'), ('am2e', '603/5982/1'), ('am2e', 'elec-exp-worker'),
      ('am2d', '5393'), ('am2d', '610/1335/3')) t(k, code)
  ),
  hit as (
    select m.k from m, c
     where c.v <> '' and (c.v = m.code or c.v like m.code || '-%' or c.v like m.code || ' %')
     limit 1
  )
  select coalesce((select k from hit), 'none'),
         case (select k from hit) when 'am2s' then 'ST0152' when 'am2d' then 'ST1017' end,
         case (select k from hit) when 'am2s' then 'Installation and maintenance electrician'
                                  when 'am2d' then 'Domestic electrician' end,
         case (select k from hit) when 'am2s' then 'AM2S' when 'am2d' then 'AM2D'
                                  when 'am2' then 'AM2' when 'am2e' then 'AM2E' end;
$$;

revoke all on function public._gateway_standard(text) from public, anon, authenticated;

-- ── The facts a signer sees, frozen into the signature ────────────────────
-- Never granted: called only from the definer functions below (and the edge
-- function, as service role).
create or replace function public._gateway_snapshot(p_learner uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  q record;
  g public.epa_gateway_checklist;
  s jsonb;
  st record;
  v_total int := 0;
  v_passed int := 0;
  v_iqa int := 0;
  v_name text;
  v_college text;
  v_employer text;
  v_fs jsonb;
  v_stmt public.otj_hours_statements;
begin
  select * into q from public._resolve_qualification(p_learner, null) limit 1;
  select * into st from public._gateway_standard(coalesce(q.course_code, q.code, q.requirement_code));
  select * into g from public.epa_gateway_checklist where user_id = p_learner order by updated_at desc nulls last limit 1;
  s := public._otj_summary_core(p_learner);

  if q.requirement_code is not null then
    select count(*) into v_total from public.qualification_requirements where qualification_code = q.requirement_code;
    select count(*) filter (where d.decision = 'passed'),
           count(*) filter (where d.decision = 'passed' and d.iqa_verdict = 'confirmed')
      into v_passed, v_iqa
      from (select distinct on (unit_code, ac_code) decision, iqa_verdict
              from public.portfolio_assessment_decisions
             where learner_id = p_learner and qualification_code = q.requirement_code and superseded_at is null
             order by unit_code, ac_code, decided_at desc) d;
  end if;

  select cs.name, c.name, e.company_name into v_name, v_college, v_employer
    from public.college_students cs
    left join public.colleges c on c.id = cs.college_id
    left join public.college_employers e on e.id = cs.employer_id
   where cs.id = q.college_student_id;
  if v_name is null then
    select nullif(trim(full_name), '') into v_name from public.profiles where id = p_learner;
  end if;

  select coalesce(jsonb_agg(jsonb_build_object('subject', f.subject, 'level', f.level, 'status', f.status,
                                               'exam_date', f.exam_date, 'result_date', f.result_date,
                                               'exemption_reason', f.exemption_reason)
                            order by f.subject), '[]'::jsonb)
    into v_fs
    from public.college_functional_skills f
   where f.student_id in (p_learner, q.college_student_id);

  select * into v_stmt from public.otj_hours_statements
   where user_id = p_learner and superseded_at is null order by prepared_at desc limit 1;

  return jsonb_build_object(
    'learner_name', v_name,
    'college_name', v_college,
    'employer_name', v_employer,
    'qualification', jsonb_build_object('code', coalesce(q.course_code, q.code), 'title', coalesce(q.course_name, q.title),
                                        'awarding_body', q.awarding_body, 'requirement_code', q.requirement_code),
    'standard', jsonb_build_object('route', st.route, 'code', st.standard_code, 'title', st.standard_title,
                                   'assessment', st.assessment),
    'criteria', jsonb_build_object('passed', v_passed, 'total', v_total, 'iqa_confirmed', v_iqa),
    'hours', jsonb_build_object('counted', s->'counted_hours', 'verified', s->'verified_hours',
                                'required', s->'required_hours', 'app_learning', s->'app_learning_hours',
                                'statement_id', v_stmt.id, 'statement_planned', v_stmt.planned_hours,
                                'statement_learner_signed', v_stmt.learner_signed_at is not null,
                                'statement_employer_signed', v_stmt.employer_signed_at is not null),
    'checklist', case when g.id is null then null else jsonb_build_object(
        'portfolio_signed_off', coalesce(g.portfolio_signed_off, false), 'portfolio_signed_off_at', g.portfolio_signed_off_at,
        'ojt_hours_verified', coalesce(g.ojt_hours_verified, false), 'ojt_hours_verified_at', g.ojt_hours_verified_at,
        'english_level2_achieved', coalesce(g.english_level2_achieved, false), 'english_level2_date', g.english_level2_date,
        'maths_level2_achieved', coalesce(g.maths_level2_achieved, false), 'maths_level2_date', g.maths_level2_date,
        'english_maths_not_required', coalesce(g.english_maths_not_required, false),
        'employer_satisfied', coalesce(g.employer_satisfied, false), 'employer_declaration_at', g.employer_declaration_at,
        'provider_satisfied', coalesce(g.provider_satisfied, false), 'provider_declaration_at', g.provider_declaration_at,
        'gateway_meeting_date', g.gateway_meeting_date, 'gateway_meeting_outcome', g.gateway_meeting_outcome,
        'gateway_passed', coalesce(g.gateway_passed, false), 'gateway_passed_at', g.gateway_passed_at,
        'epa_provider', g.epa_provider, 'epa_booking_date', g.epa_booking_date) end,
    'functional_skills', v_fs,
    'taken_at', now()
  );
end;
$$;

revoke all on function public._gateway_snapshot(uuid) from public, anon, authenticated;
grant execute on function public._gateway_snapshot(uuid) to service_role;

-- ── The wording each signer signs ─────────────────────────────────────────
create or replace function public._gateway_statement(p_kind text, p_snapshot jsonb, p_company text default null)
returns text
language sql
immutable
set search_path = public
as $$
  select case p_kind
    when 'learner' then
      'I confirm that I am ready to go through gateway for my end-point assessment'
      || coalesce(' for the ' || (p_snapshot#>>'{standard,title}') || ' apprenticeship (' || (p_snapshot#>>'{standard,code}') || ')', '')
      || '. The evidence in my portfolio is my own work, the off-the-job training recorded is accurate to the best of my knowledge, '
      || 'and I understand that my training provider and the assessment organisation may check it.'
    when 'provider' then
      'On behalf of ' || coalesce(p_snapshot->>'college_name', 'the training provider') || ', I confirm that '
      || coalesce(p_snapshot->>'learner_name', 'the apprentice')
      || ' has completed the training in their training plan, that the readiness checklist in this pack reflects their record on the date signed, '
      || 'and that in our judgement they are ready for end-point assessment'
      || coalesce(' for ' || (p_snapshot#>>'{standard,title}') || ' (' || (p_snapshot#>>'{standard,code}') || ')', '') || '.'
    when 'employer' then
      'On behalf of ' || coalesce(nullif(trim(p_company), ''), p_snapshot->>'employer_name', 'the employer') || ', I confirm that '
      || coalesce(p_snapshot->>'learner_name', 'the apprentice')
      || ' consistently shows the behaviours set out in the '
      || coalesce((p_snapshot#>>'{standard,title}') || ' (' || (p_snapshot#>>'{standard,code}') || ') ', '')
      || 'occupational standard in their work with us, and that we agree they are ready for end-point assessment.'
  end;
$$;

revoke all on function public._gateway_statement(text, jsonb, text) from public, anon, authenticated;

-- ── Read: what has been signed for this learner ───────────────────────────
create or replace function public.get_gateway_declarations(p_learner uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  u uuid := coalesce(p_learner, auth.uid());
  snap jsonb;
begin
  if auth.uid() is null or not (auth.uid() = u or public._can_assess(u)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  snap := public._gateway_snapshot(u);
  return jsonb_build_object(
    'standard', snap->'standard',
    'snapshot', snap,
    'statements', jsonb_build_object(
      'learner', public._gateway_statement('learner', snap),
      'provider', public._gateway_statement('provider', snap),
      'employer', public._gateway_statement('employer', snap)),
    'signed', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', d.id, 'kind', d.kind, 'signer_name', d.signer_name, 'signer_role', d.signer_role,
               'signer_company', d.signer_company, 'signed_at', d.signed_at, 'snapshot_hash', d.snapshot_hash,
               'has_signature', d.signature_image is not null) order by d.kind)
        from public.epa_gateway_declarations d
       where d.learner_id = u and d.signed_at is not null and d.superseded_at is null), '[]'::jsonb),
    'employer_pending', (
      select jsonb_build_object('id', d.id, 'token', case when u = auth.uid() then null else d.token end,
                                'created_at', d.created_at, 'expires_at', d.token_expires_at,
                                'requested_by_name', d.requested_by_name)
        from public.epa_gateway_declarations d
       where d.learner_id = u and d.kind = 'employer' and d.signed_at is null and d.superseded_at is null
         and d.token_expires_at > now()
       order by d.created_at desc limit 1)
  );
end;
$$;

revoke all on function public.get_gateway_declarations(uuid) from public, anon;
grant execute on function public.get_gateway_declarations(uuid) to authenticated;

-- ── Sign in the app: the learner (own) or the provider (assessing staff) ──
create or replace function public.sign_gateway_declaration(
  p_learner uuid, p_kind text, p_name text, p_signature text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  u uuid := coalesce(p_learner, auth.uid());
  snap jsonb;
  stmt text;
  v_hash text;
  v_role text;
  v_id uuid;
  v_cs uuid;
  v_college uuid;
begin
  if auth.uid() is null then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if p_kind = 'learner' then
    if auth.uid() <> u then raise exception 'Only the apprentice can sign their own declaration' using errcode = '42501'; end if;
    v_role := 'Apprentice';
  elsif p_kind = 'provider' then
    if auth.uid() = u or not public._can_assess(u) then
      raise exception 'Only the training provider can sign the readiness declaration' using errcode = '42501';
    end if;
    select initcap(replace(coalesce(st.role, 'tutor'), '_', ' ')) into v_role
      from public.college_students cs
      join public.college_staff st on st.college_id = cs.college_id and st.user_id = auth.uid() and st.archived_at is null
     where cs.user_id = u limit 1;
    v_role := coalesce(v_role, 'Assessor');
  else
    raise exception 'Unknown declaration' using errcode = '22023';
  end if;
  if length(trim(coalesce(p_name, ''))) < 2 then
    return jsonb_build_object('error', 'Type your full name to sign.');
  end if;
  if p_signature is not null and (left(p_signature, 22) <> 'data:image/png;base64,' or length(p_signature) > 400000) then
    return jsonb_build_object('error', 'The signature could not be read. Draw it again.');
  end if;

  snap := public._gateway_snapshot(u);
  stmt := public._gateway_statement(p_kind, snap);
  v_hash := encode(extensions.digest(stmt || '|' || (snap - 'taken_at')::text, 'sha256'), 'hex');
  select id, college_id into v_cs, v_college from public.college_students where user_id = u
   order by (lower(coalesce(status, '')) in ('withdrawn', 'completed', 'archived')), created_at desc limit 1;

  update public.epa_gateway_declarations set superseded_at = now()
   where learner_id = u and kind = p_kind and superseded_at is null;

  insert into public.epa_gateway_declarations (
    learner_id, college_student_id, college_id, kind, route, standard_code, standard_title,
    statement, snapshot, snapshot_hash, signer_id, signer_name, signer_role, signature_image, signed_at)
  values (u, v_cs, v_college, p_kind, snap#>>'{standard,route}', snap#>>'{standard,code}', snap#>>'{standard,title}',
          stmt, snap, v_hash, auth.uid(), trim(p_name), v_role, p_signature, now())
  returning id into v_id;

  insert into public.portfolio_audit_events (learner_id, actor_id, actor_role, action, object_type, object_id, summary, content_hash)
  values (u, auth.uid(), case when p_kind = 'learner' then 'learner' else 'staff' end,
          'gateway_declaration_signed', 'gateway_declaration', v_id,
          jsonb_build_object('kind', p_kind, 'signer_name', trim(p_name), 'standard', snap#>>'{standard,code}'), v_hash);

  return jsonb_build_object('success', true, 'id', v_id, 'snapshot_hash', v_hash);
end;
$$;

revoke all on function public.sign_gateway_declaration(uuid, text, text, text) from public, anon;
grant execute on function public.sign_gateway_declaration(uuid, text, text, text) to authenticated;

-- ── The employer link: staff ask, the employer signs with no account ──────
create or replace function public.request_gateway_employer_declaration(p_learner uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  snap jsonb;
  v_token text := encode(extensions.gen_random_bytes(24), 'hex');
  v_id uuid;
  v_cs uuid;
  v_college uuid;
  v_name text;
  v_email text;
begin
  if auth.uid() is null or auth.uid() = p_learner or not public._can_assess(p_learner) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  snap := public._gateway_snapshot(p_learner);
  select cs.id, cs.college_id, e.contact_email into v_cs, v_college, v_email
    from public.college_students cs left join public.college_employers e on e.id = cs.employer_id
   where cs.user_id = p_learner
   order by (lower(coalesce(cs.status, '')) in ('withdrawn', 'completed', 'archived')), cs.created_at desc limit 1;
  select coalesce(nullif(trim(full_name), ''), 'Tutor') into v_name from public.profiles where id = auth.uid();

  update public.epa_gateway_declarations set superseded_at = now()
   where learner_id = p_learner and kind = 'employer' and signed_at is null and superseded_at is null;

  insert into public.epa_gateway_declarations (
    learner_id, college_student_id, college_id, kind, route, standard_code, standard_title,
    statement, snapshot, token, token_expires_at, requested_by, requested_by_name)
  values (p_learner, v_cs, v_college, 'employer', snap#>>'{standard,route}', snap#>>'{standard,code}',
          snap#>>'{standard,title}', public._gateway_statement('employer', snap), snap,
          v_token, now() + interval '30 days', auth.uid(), v_name)
  returning id into v_id;

  insert into public.portfolio_audit_events (learner_id, actor_id, actor_role, action, object_type, object_id, summary)
  values (p_learner, auth.uid(), 'staff', 'gateway_employer_link_sent', 'gateway_declaration', v_id,
          jsonb_build_object('requested_by_name', v_name));

  return jsonb_build_object('success', true, 'id', v_id, 'token', v_token, 'employer_email', v_email);
end;
$$;

revoke all on function public.request_gateway_employer_declaration(uuid) from public, anon;
grant execute on function public.request_gateway_employer_declaration(uuid) to authenticated;

create or replace function public.get_gateway_declaration_public(p_token text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  d public.epa_gateway_declarations;
  snap jsonb;
begin
  if coalesce(length(p_token), 0) < 32 then
    return jsonb_build_object('error', 'This link is not valid.');
  end if;
  select * into d from public.epa_gateway_declarations where token = p_token and kind = 'employer';
  if d.id is null then return jsonb_build_object('error', 'This link is not valid.'); end if;
  if d.superseded_at is not null and d.signed_at is null then
    return jsonb_build_object('error', 'This link has been replaced by a newer one. Ask the college for the latest link.');
  end if;
  if d.signed_at is null and d.token_expires_at < now() then
    return jsonb_build_object('error', 'This link has expired. Ask the college for a new one.');
  end if;
  -- Live facts until signed; the frozen snapshot once signed.
  snap := case when d.signed_at is null then public._gateway_snapshot(d.learner_id) else d.snapshot end;
  return jsonb_build_object(
    'learner_name', snap->>'learner_name',
    'college_name', snap->>'college_name',
    'employer_name', snap->>'employer_name',
    'standard', snap->'standard',
    'qualification', snap->'qualification',
    'criteria', snap->'criteria',
    'hours', jsonb_build_object('counted', snap#>'{hours,counted}', 'required', snap#>'{hours,required}'),
    'statement', case when d.signed_at is null then public._gateway_statement('employer', snap) else d.statement end,
    'requested_by_name', d.requested_by_name,
    'signed_at', d.signed_at,
    'signer_name', d.signer_name,
    'signer_role', d.signer_role,
    'signer_company', d.signer_company);
end;
$$;

revoke all on function public.get_gateway_declaration_public(text) from public;
grant execute on function public.get_gateway_declaration_public(text) to anon, authenticated;

create or replace function public.sign_gateway_declaration_employer(
  p_token text, p_name text, p_role text, p_company text, p_signature text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  d public.epa_gateway_declarations;
  snap jsonb;
  stmt text;
  v_hash text;
begin
  if coalesce(length(p_token), 0) < 32 then return jsonb_build_object('error', 'This link is not valid.'); end if;
  select * into d from public.epa_gateway_declarations
   where token = p_token and kind = 'employer' for update;
  if d.id is null or d.superseded_at is not null then
    return jsonb_build_object('error', 'This link is not valid any more. Ask the college for the latest link.');
  end if;
  if d.signed_at is not null then return jsonb_build_object('error', 'This declaration has already been signed.'); end if;
  if d.token_expires_at < now() then return jsonb_build_object('error', 'This link has expired. Ask the college for a new one.'); end if;
  if length(trim(coalesce(p_name, ''))) < 2 then return jsonb_build_object('error', 'Type your full name to sign.'); end if;
  if length(trim(coalesce(p_role, ''))) < 2 then return jsonb_build_object('error', 'Add your role, for example Director or Supervisor.'); end if;
  if length(trim(coalesce(p_company, ''))) < 2 then return jsonb_build_object('error', 'Add the company name.'); end if;
  if p_signature is not null and (left(p_signature, 22) <> 'data:image/png;base64,' or length(p_signature) > 400000) then
    return jsonb_build_object('error', 'The signature could not be read. Draw it again.');
  end if;

  snap := public._gateway_snapshot(d.learner_id);
  stmt := public._gateway_statement('employer', snap, p_company);
  v_hash := encode(extensions.digest(stmt || '|' || (snap - 'taken_at')::text, 'sha256'), 'hex');

  -- An earlier signed employer declaration is replaced by this one.
  update public.epa_gateway_declarations set superseded_at = now()
   where learner_id = d.learner_id and kind = 'employer' and signed_at is not null and superseded_at is null;

  update public.epa_gateway_declarations
     set statement = stmt, snapshot = snap, snapshot_hash = v_hash,
         signer_name = trim(p_name), signer_role = trim(p_role), signer_company = trim(p_company),
         signature_image = p_signature, signed_at = now()
   where id = d.id;

  insert into public.portfolio_audit_events (learner_id, actor_id, actor_role, action, object_type, object_id, summary, content_hash)
  values (d.learner_id, null, 'employer', 'gateway_declaration_signed', 'gateway_declaration', d.id,
          jsonb_build_object('kind', 'employer', 'signer_name', trim(p_name), 'signer_role', trim(p_role),
                             'signer_company', trim(p_company), 'standard', snap#>>'{standard,code}'), v_hash);

  -- Tell whoever asked.
  if d.requested_by is not null then
    begin
      insert into public.user_notifications (user_id, type, title, message, link, metadata)
      values (d.requested_by, 'gateway_declaration',
              'Employer signed the gateway declaration',
              trim(p_name) || ' (' || trim(p_company) || ') signed the behaviours declaration for '
                || coalesce(snap->>'learner_name', 'your learner') || '.',
              case when d.college_student_id is not null then '/college?section=student360&studentId=' || d.college_student_id || '#epa' else null end,
              jsonb_build_object('declaration_id', d.id, 'learner_id', d.learner_id));
    exception when others then null;
    end;
  end if;

  return jsonb_build_object('success', true, 'snapshot_hash', v_hash);
end;
$$;

revoke all on function public.sign_gateway_declaration_employer(text, text, text, text, text) from public;
grant execute on function public.sign_gateway_declaration_employer(text, text, text, text, text) to anon, authenticated;
