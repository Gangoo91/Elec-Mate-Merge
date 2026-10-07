-- ELE-1883 follow-up (Andrew, 7 Oct) — gateway declaration wording, version 2.
--
-- The employer's declaration now uses the gateway wording of the official
-- end-point assessment plans, word for word:
--   ST0152 v1.2  https://skillsengland.education.gov.uk/apprenticeships/st0152-v1-2?view=epa
--                (EPA gateway section; fragment epatab?nodeId=197655)
--   ST1017 v1.1  https://www.skillsengland.education.gov.uk/media/vzql3qyi/st1017_domestic_electrician_l3_epa-plan_11_c58_clean-copy.pdf (p6)
--   "the employer must provide a signed declaration to the EPAO at gateway, confirming that the
--    apprentice has demonstrated all the behaviours during the on-programme period to the level
--    and consistency required for occupational competence"
--   "The apprentice’s employer must be content that the apprentice is occupationally competent.
--    That is, they are deemed to be working at or above the level set out in the apprenticeship
--    standard and ready to undertake the EPA."
-- NET's own Readiness for Assessment checklist (AM2S v1 25.12, AM2D 03.26) is a
-- controlled form whose declarations refer to its own Knowledge and Skill
-- table; it is NOT reproduced or signed here. The pack lists it "to attach".
--
-- Versioning: every declaration row records statement_version. Rows signed
-- before this migration are version 1 and keep their stored statement and
-- snapshot_hash untouched (the hash is sha256(statement || '|' || snapshot),
-- unchanged, so they still verify). _gateway_statement keeps the version 1
-- wording so it can be reproduced.

alter table public.epa_gateway_declarations
  add column if not exists statement_version integer not null default 1;
comment on column public.epa_gateway_declarations.statement_version is
  'Which wording of the declaration was signed (see _gateway_statement). 1 = Elec-Mate wording (to 7 Oct 2026); 2 = employer wording from the ST0152/ST1017 EPA plans. Never rewritten.';

create or replace function public._gateway_statement_version()
returns integer
language sql
immutable
set search_path = public
as $$ select 2 $$;
revoke all on function public._gateway_statement_version() from public, anon;
grant execute on function public._gateway_statement_version() to authenticated, service_role;

-- Where the official wording comes from, by standard (null: no EPA standard).
create or replace function public._gateway_wording_source(p_standard_code text)
returns jsonb
language sql
immutable
set search_path = public
as $$
  select case upper(coalesce(p_standard_code, ''))
    when 'ST0152' then jsonb_build_object(
      'title', 'Installation and maintenance electrician (ST0152) end-point assessment plan, version 1.2, section “EPA gateway”',
      'url', 'https://skillsengland.education.gov.uk/apprenticeships/st0152-v1-2?view=epa')
    when 'ST1017' then jsonb_build_object(
      'title', 'Domestic electrician (ST1017) end-point assessment plan, version 1.1, section “EPA gateway” (page 6)',
      'url', 'https://www.skillsengland.education.gov.uk/media/vzql3qyi/st1017_domestic_electrician_l3_epa-plan_11_c58_clean-copy.pdf')
  end;
$$;
revoke all on function public._gateway_wording_source(text) from public, anon;
grant execute on function public._gateway_wording_source(text) to authenticated, service_role;

-- The wording. Version 1 is kept exactly as it was so old signatures can be reproduced.
drop function if exists public._gateway_statement(text, jsonb, text);
create or replace function public._gateway_statement(
  p_kind text, p_snapshot jsonb, p_company text default null, p_version integer default null)
returns text
language sql
immutable
set search_path = public
as $$
  select case
  when coalesce(p_version, 2) = 1 then
    case p_kind
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
    end
  else
    -- Version 2. The employer's two confirmations quote the EPA plan's gateway
    -- section word for word (see the header); the rest is Elec-Mate's.
    case p_kind
    when 'learner' then
      'I confirm that I am ready to go through gateway for my end-point assessment'
      || coalesce(' for the ' || (p_snapshot#>>'{standard,title}') || ' apprenticeship (' || (p_snapshot#>>'{standard,code}') || ')', '')
      || '. The evidence in my portfolio is my own work, the off-the-job training recorded is accurate to the best of my knowledge, '
      || 'and I understand that my training provider and the assessment organisation may check it.'
      || case when p_snapshot#>>'{standard,code}' is not null
              then ' I understand that I must also complete and sign NET’s Readiness for Assessment checklist with my employer and training provider.'
              else '' end
    when 'provider' then
      'On behalf of ' || coalesce(p_snapshot->>'college_name', 'the training provider') || ', I confirm that '
      || coalesce(p_snapshot->>'learner_name', 'the apprentice')
      || ' has completed the training in their training plan, that the readiness checklist in this pack reflects their record on the date signed, '
      || 'and that in our judgement they are ready for end-point assessment'
      || coalesce(' for ' || (p_snapshot#>>'{standard,title}') || ' (' || (p_snapshot#>>'{standard,code}') || ')', '') || '.'
      || case when p_snapshot#>>'{standard,code}' is not null
              then ' We understand that the employer makes the gateway decision and that NET’s Readiness for Assessment checklist must also be completed and signed.'
              else '' end
    when 'employer' then
      'On behalf of ' || coalesce(nullif(trim(p_company), ''), p_snapshot->>'employer_name', 'the employer') || ', I confirm that '
      || coalesce(p_snapshot->>'learner_name', 'the apprentice')
      || ' has demonstrated all the behaviours during the on-programme period to the level and consistency required for occupational competence'
      || coalesce(' in the ' || (p_snapshot#>>'{standard,title}') || ' (' || (p_snapshot#>>'{standard,code}') || ') apprenticeship standard', '')
      || '. As their employer, I am content that they are occupationally competent: that is, working at or above the level set out in the apprenticeship standard and ready to undertake the EPA.'
    end
  end;
$$;
revoke all on function public._gateway_statement(text, jsonb, text, integer) from public, anon, authenticated;

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
    'statement_version', public._gateway_statement_version(),
    'wording_source', public._gateway_wording_source(snap#>>'{standard,code}'),
    'statements', jsonb_build_object(
      'learner', public._gateway_statement('learner', snap),
      'provider', public._gateway_statement('provider', snap),
      'employer', public._gateway_statement('employer', snap)),
    'signed', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', d.id, 'kind', d.kind, 'signer_name', d.signer_name, 'signer_role', d.signer_role,
               'signer_company', d.signer_company, 'signed_at', d.signed_at, 'snapshot_hash', d.snapshot_hash,
               'statement_version', d.statement_version,
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
    statement, statement_version, snapshot, snapshot_hash, signer_id, signer_name, signer_role, signature_image, signed_at)
  values (u, v_cs, v_college, p_kind, snap#>>'{standard,route}', snap#>>'{standard,code}', snap#>>'{standard,title}',
          stmt, public._gateway_statement_version(), snap, v_hash, auth.uid(), trim(p_name), v_role, p_signature, now())
  returning id into v_id;

  insert into public.portfolio_audit_events (learner_id, actor_id, actor_role, action, object_type, object_id, summary, content_hash)
  values (u, auth.uid(), case when p_kind = 'learner' then 'learner' else 'staff' end,
          'gateway_declaration_signed', 'gateway_declaration', v_id,
          jsonb_build_object('kind', p_kind, 'signer_name', trim(p_name), 'standard', snap#>>'{standard,code}',
                             'statement_version', public._gateway_statement_version()), v_hash);

  return jsonb_build_object('success', true, 'id', v_id, 'snapshot_hash', v_hash,
                            'statement_version', public._gateway_statement_version());
end;
$$;

revoke all on function public.sign_gateway_declaration(uuid, text, text, text) from public, anon;
grant execute on function public.sign_gateway_declaration(uuid, text, text, text) to authenticated;

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
    statement, statement_version, snapshot, token, token_expires_at, requested_by, requested_by_name)
  values (p_learner, v_cs, v_college, 'employer', snap#>>'{standard,route}', snap#>>'{standard,code}',
          snap#>>'{standard,title}', public._gateway_statement('employer', snap), public._gateway_statement_version(), snap,
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
    'statement_version', case when d.signed_at is null then public._gateway_statement_version() else d.statement_version end,
    'wording_source', public._gateway_wording_source(snap#>>'{standard,code}'),
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
     set statement = stmt, statement_version = public._gateway_statement_version(), snapshot = snap, snapshot_hash = v_hash,
         signer_name = trim(p_name), signer_role = trim(p_role), signer_company = trim(p_company),
         signature_image = p_signature, signed_at = now()
   where id = d.id;

  insert into public.portfolio_audit_events (learner_id, actor_id, actor_role, action, object_type, object_id, summary, content_hash)
  values (d.learner_id, null, 'employer', 'gateway_declaration_signed', 'gateway_declaration', d.id,
          jsonb_build_object('kind', 'employer', 'signer_name', trim(p_name), 'signer_role', trim(p_role),
                             'signer_company', trim(p_company), 'standard', snap#>>'{standard,code}',
                             'statement_version', public._gateway_statement_version()), v_hash);

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

-- The pack's statements for unsigned declarations, with the version and source.
create or replace function public.get_gateway_statements_for_pack(p_learner uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare snap jsonb;
begin
  if coalesce(auth.role(), '') <> 'service_role' then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  snap := public._gateway_snapshot(p_learner);
  return jsonb_build_object(
    'version', public._gateway_statement_version(),
    'wording_source', public._gateway_wording_source(snap#>>'{standard,code}'),
    'learner', public._gateway_statement('learner', snap),
    'provider', public._gateway_statement('provider', snap),
    'employer', public._gateway_statement('employer', snap));
end;
$$;

revoke all on function public.get_gateway_statements_for_pack(uuid) from public, anon, authenticated;
grant execute on function public.get_gateway_statements_for_pack(uuid) to service_role;
