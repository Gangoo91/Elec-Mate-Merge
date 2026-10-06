-- ELE-1950 — one credentials store per person (their Elec-ID qualifications),
-- read by the firm's competence matrix, the Training section and the worker's
-- Credentials page.
--
-- Root cause of the empty matrix: a person's Elec-ID hangs off THEIR OWN
-- employer_employees stub (employer_id NULL — 114 of 119 profiles, 83 of 85
-- qualifications), not the firm's roster row. The firm only ever looked at
-- profiles on its roster rows, so it saw none of the real qualifications.
-- These functions resolve roster row → the person's Elec-ID the same way the
-- worker's own app does (elecIdLinkage.getMyElecIdProfile: the user's activated
-- profile, oldest first), falling back to a firm-made profile on the roster row
-- for people who have not linked an account.
--
-- A roster row only carries user_id once the worker linked it themselves
-- (guard_employee_claim), so the firm sees the Elec-ID of people who joined it.

-- ─── Resolution ──────────────────────────────────────────────────────────────
create or replace function public._elec_id_profile_for_roster(p_roster_id uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select p.id
       from public.employer_employees r
       join public.employer_employees e on e.user_id = r.user_id
       join public.employer_elec_id_profiles p on p.employee_id = e.id
      where r.id = p_roster_id
        and r.user_id is not null
        and (coalesce(p.opt_out, false) = false or e.id = r.id)
      order by coalesce(p.activated, false) desc, p.created_at asc
      limit 1),
    (select p.id
       from public.employer_elec_id_profiles p
      where p.employee_id = p_roster_id
      order by p.created_at asc
      limit 1)
  );
$$;
revoke all on function public._elec_id_profile_for_roster(uuid) from public, anon, authenticated;

-- Roster rows the caller acts for (owner or active co-admin), current members only.
create or replace function public._my_team_roster()
returns setof public.employer_employees
language sql
stable
security definer
set search_path = public
as $$
  select r.*
    from public.employer_employees r
   where r.employer_id in (select public.my_employer_scope())
     and coalesce(r.status, 'Active') <> 'Archived';
$$;
revoke all on function public._my_team_roster() from public, anon, authenticated;

-- Who checked something, in words: "Elec-Mate" for an admin acting outside a
-- firm, otherwise the firm's name.
create or replace function public._elec_id_verifier_firm(p_verified_by uuid, p_firm uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select case
    when p_verified_by is null then null
    when p_firm is null then 'Elec-Mate'
    else coalesce(
      (select nullif(trim(cp.company_name), '') from public.company_profiles cp
        where cp.user_id = p_firm order by cp.created_at desc nulls last limit 1),
      (select nullif(trim(pr.full_name), '') from public.profiles pr where pr.id = p_firm),
      'Employer')
  end;
$$;
revoke all on function public._elec_id_verifier_firm(uuid, uuid) from public, anon, authenticated;

create or replace function public._elec_id_qualification_json(q public.employer_elec_id_qualifications)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select to_jsonb(q) - 'source_id' - 'added_by'
         || jsonb_build_object(
              'verifier_name', (select nullif(trim(pr.full_name), '') from public.profiles pr where pr.id = q.verified_by),
              'verifier_firm', public._elec_id_verifier_firm(q.verified_by, q.verifier_employer_id)
            );
$$;
revoke all on function public._elec_id_qualification_json(public.employer_elec_id_qualifications) from public, anon, authenticated;

create or replace function public._elec_id_profile_json(p public.employer_elec_id_profiles)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'id', p.id,
    'owner_employee_id', p.employee_id,
    'elec_id_number', p.elec_id_number,
    'ecs_card_type', p.ecs_card_type,
    'ecs_card_number', p.ecs_card_number,
    'ecs_expiry_date', p.ecs_expiry_date,
    'bio', p.bio,
    'specialisations', p.specialisations,
    'profile_views', p.profile_views,
    'shareable_link', p.shareable_link,
    'is_verified', coalesce(p.is_verified, false),
    'verified_at', p.verified_at,
    'verified_by', p.verified_by,
    'verification_method', p.verification_method,
    'verification_status', p.verification_status,
    'verification_tier', p.verification_tier,
    'ecs_verification_level', p.ecs_verification_level,
    'ecs_verified_at', p.ecs_verified_at,
    'ecs_verification_method', p.ecs_verification_method,
    'ecs_verifier_name', (select nullif(trim(pr.full_name), '') from public.profiles pr where pr.id = p.ecs_verified_by),
    'ecs_verifier_firm', public._elec_id_verifier_firm(p.ecs_verified_by, p.ecs_verifier_employer_id),
    'activated', p.activated,
    'rate_type', p.rate_type,
    'rate_amount', p.rate_amount,
    'created_at', p.created_at,
    'updated_at', p.updated_at,
    'qualifications', coalesce((
      select jsonb_agg(public._elec_id_qualification_json(q)
                       order by q.date_achieved desc nulls last, q.created_at desc)
        from public.employer_elec_id_qualifications q
       where q.profile_id = p.id), '[]'::jsonb),
    'skills', coalesce((
      select jsonb_agg(to_jsonb(s) order by s.created_at)
        from public.employer_elec_id_skills s where s.profile_id = p.id), '[]'::jsonb),
    'work_history', coalesce((
      select jsonb_agg(to_jsonb(w) order by w.start_date desc nulls last)
        from public.employer_elec_id_work_history w where w.profile_id = p.id), '[]'::jsonb),
    'training', '[]'::jsonb
  );
$$;
revoke all on function public._elec_id_profile_json(public.employer_elec_id_profiles) from public, anon, authenticated;

-- ─── Firm: read the team's Elec-IDs (with qualifications) ────────────────────
-- One element per current roster member who has an Elec-ID. employee_id is the
-- ROSTER row id (what the Employer Hub keys people by); owner_employee_id is the
-- row the profile actually hangs off.
create or replace function public.get_team_credentials()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(jsonb_agg(
           public._elec_id_profile_json(p)
           || jsonb_build_object(
                'employee_id', r.id,
                'linked_account', r.user_id is not null,
                'employee', jsonb_build_object(
                  'id', r.id, 'name', r.name, 'role', coalesce(r.team_role, r.role),
                  'photo_url', r.photo_url, 'email', r.email, 'phone', r.phone))
           order by r.name), '[]'::jsonb)
    from public._my_team_roster() r
    join public.employer_elec_id_profiles p
      on p.id = public._elec_id_profile_for_roster(r.id);
$$;
revoke all on function public.get_team_credentials() from public, anon;
grant execute on function public.get_team_credentials() to authenticated;

-- ─── Worker: my own store, with who checked what ─────────────────────────────
create or replace function public.get_my_credentials()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select public._elec_id_profile_json(p)
    from public.employer_elec_id_profiles p
    join public.employer_employees e on e.id = p.employee_id
   where auth.uid() is not null
     and e.user_id = auth.uid()
   order by coalesce(p.activated, false) desc, p.created_at asc
   limit 1;
$$;
revoke all on function public.get_my_credentials() from public, anon;
grant execute on function public.get_my_credentials() to authenticated;

-- ─── Firm: add / edit / remove an item on a team member's Elec-ID ────────────
create or replace function public._elec_id_assert_level(p_level text, p_method text)
returns void
language plpgsql
immutable
set search_path = public
as $$
begin
  if p_level not in ('self_declared', 'document_seen', 'verified_at_source') then
    raise exception 'Unknown verification level %', p_level using errcode = '22023';
  end if;
  if p_level <> 'self_declared' and nullif(trim(coalesce(p_method, '')), '') is null then
    raise exception 'Say how it was checked (for example "Certificate seen" or "Checked on the JIB card checker").'
      using errcode = '22023';
  end if;
end;
$$;
revoke all on function public._elec_id_assert_level(text, text) from public, anon, authenticated;

create or replace function public.add_team_credential(p_roster_id uuid, p_item jsonb)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_roster public.employer_employees;
  v_profile uuid;
  v_level text := coalesce(nullif(p_item->>'verification_level', ''), 'self_declared');
  v_method text := nullif(trim(coalesce(p_item->>'verification_method', '')), '');
  v_name text := nullif(trim(coalesce(p_item->>'qualification_name', '')), '');
  v_category text := coalesce(nullif(p_item->>'category', ''), 'training');
  v_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Not signed in' using errcode = '42501';
  end if;
  select * into v_roster from public._my_team_roster() r where r.id = p_roster_id;
  if v_roster.id is null then
    raise exception 'That person is not on your team' using errcode = '42501';
  end if;
  if v_name is null then
    raise exception 'Give the qualification or training a name' using errcode = '22023';
  end if;
  v_profile := public._elec_id_profile_for_roster(p_roster_id);
  if v_profile is null then
    raise exception 'NO_ELEC_ID: % has no Elec-ID yet. Create one first.', coalesce(v_roster.name, 'This person')
      using errcode = 'P0002';
  end if;
  -- Nobody verifies their own credentials.
  if v_roster.user_id = auth.uid() then
    v_level := 'self_declared';
  end if;
  perform public._elec_id_assert_level(v_level, v_method);

  insert into public.employer_elec_id_qualifications (
    profile_id, qualification_name, qualification_type, category, awarding_body,
    grade, certificate_number, date_achieved, expiry_date, document_url,
    training_type, training_status, start_date, funded_by,
    verification_level, verified_by, verified_at, verification_method, verifier_employer_id,
    added_by, added_by_employer_id
  ) values (
    v_profile, v_name, coalesce(nullif(p_item->>'qualification_type', ''), v_category), v_category,
    nullif(trim(coalesce(p_item->>'awarding_body', '')), ''),
    nullif(trim(coalesce(p_item->>'grade', '')), ''),
    nullif(trim(coalesce(p_item->>'certificate_number', '')), ''),
    nullif(p_item->>'date_achieved', '')::date,
    nullif(p_item->>'expiry_date', '')::date,
    nullif(p_item->>'document_url', ''),
    nullif(p_item->>'training_type', ''),
    nullif(p_item->>'training_status', ''),
    nullif(p_item->>'start_date', '')::date,
    nullif(p_item->>'funded_by', ''),
    v_level,
    case when v_level <> 'self_declared' then auth.uid() end,
    case when v_level <> 'self_declared' then now() end,
    case when v_level <> 'self_declared' then v_method end,
    case when v_level <> 'self_declared' then v_roster.employer_id end,
    auth.uid(), v_roster.employer_id
  ) returning id into v_id;
  return v_id;
end;
$$;
revoke all on function public.add_team_credential(uuid, jsonb) from public, anon;
grant execute on function public.add_team_credential(uuid, jsonb) to authenticated;

-- The firm may change only items it recorded, for someone still on its team.
create or replace function public._my_firm_owns_credential(p_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.employer_elec_id_qualifications q
      join public._my_team_roster() r
        on public._elec_id_profile_for_roster(r.id) = q.profile_id
     where q.id = p_id
       and q.added_by_employer_id = r.employer_id
  );
$$;
revoke all on function public._my_firm_owns_credential(uuid) from public, anon, authenticated;

create or replace function public.update_team_credential(p_id uuid, p_item jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public._my_firm_owns_credential(p_id) then
    raise exception 'Only the person, or the firm that recorded it, can change this item' using errcode = '42501';
  end if;
  update public.employer_elec_id_qualifications q set
    qualification_name = case when p_item ? 'qualification_name'
      then coalesce(nullif(trim(p_item->>'qualification_name'), ''), q.qualification_name) else q.qualification_name end,
    awarding_body = case when p_item ? 'awarding_body' then nullif(trim(coalesce(p_item->>'awarding_body', '')), '') else q.awarding_body end,
    certificate_number = case when p_item ? 'certificate_number' then nullif(trim(coalesce(p_item->>'certificate_number', '')), '') else q.certificate_number end,
    date_achieved = case when p_item ? 'date_achieved' then nullif(p_item->>'date_achieved', '')::date else q.date_achieved end,
    expiry_date = case when p_item ? 'expiry_date' then nullif(p_item->>'expiry_date', '')::date else q.expiry_date end,
    document_url = case when p_item ? 'document_url' then nullif(p_item->>'document_url', '') else q.document_url end,
    training_type = case when p_item ? 'training_type' then nullif(p_item->>'training_type', '') else q.training_type end,
    training_status = case when p_item ? 'training_status' then nullif(p_item->>'training_status', '') else q.training_status end,
    start_date = case when p_item ? 'start_date' then nullif(p_item->>'start_date', '')::date else q.start_date end,
    funded_by = case when p_item ? 'funded_by' then nullif(p_item->>'funded_by', '') else q.funded_by end
  where q.id = p_id;
end;
$$;
revoke all on function public.update_team_credential(uuid, jsonb) from public, anon;
grant execute on function public.update_team_credential(uuid, jsonb) to authenticated;

create or replace function public.delete_team_credential(p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public._my_firm_owns_credential(p_id) then
    raise exception 'Only the person, or the firm that recorded it, can remove this item' using errcode = '42501';
  end if;
  delete from public.employer_elec_id_qualifications where id = p_id;
end;
$$;
revoke all on function public.delete_team_credential(uuid) from public, anon;
grant execute on function public.delete_team_credential(uuid) to authenticated;

-- ─── Verification: a firm checking a team member's item, or an Elec-Mate admin ─
-- Returns the firm the caller verifies on behalf of (NULL = Elec-Mate admin),
-- or raises when the caller may not verify this profile.
create or replace function public._elec_id_verifying_firm(p_profile_id uuid)
returns uuid
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_firm uuid;
begin
  if auth.uid() is null then
    raise exception 'Not signed in' using errcode = '42501';
  end if;
  if exists (
    select 1 from public.employer_elec_id_profiles p
      join public.employer_employees e on e.id = p.employee_id
     where p.id = p_profile_id and e.user_id = auth.uid()
  ) then
    raise exception 'You cannot verify your own credentials' using errcode = '42501';
  end if;
  select r.employer_id into v_firm
    from public._my_team_roster() r
   where public._elec_id_profile_for_roster(r.id) = p_profile_id
   order by (r.employer_id = auth.uid()) desc
   limit 1;
  if v_firm is not null then
    return v_firm;
  end if;
  if exists (select 1 from public.profiles where id = auth.uid() and admin_role is not null) then
    return null;
  end if;
  raise exception 'Only this person''s employer or Elec-Mate can verify their credentials' using errcode = '42501';
end;
$$;
revoke all on function public._elec_id_verifying_firm(uuid) from public, anon, authenticated;

create or replace function public.set_credential_verification(p_id uuid, p_level text, p_method text default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_profile uuid;
  v_firm uuid;
begin
  select profile_id into v_profile from public.employer_elec_id_qualifications where id = p_id;
  if v_profile is null then
    raise exception 'Credential not found' using errcode = 'P0002';
  end if;
  v_firm := public._elec_id_verifying_firm(v_profile);
  perform public._elec_id_assert_level(p_level, p_method);
  update public.employer_elec_id_qualifications set
    verification_level = p_level,
    verified_by = case when p_level <> 'self_declared' then auth.uid() end,
    verified_at = case when p_level <> 'self_declared' then now() end,
    verification_method = case when p_level <> 'self_declared' then trim(p_method) end,
    verifier_employer_id = case when p_level <> 'self_declared' then v_firm end
  where id = p_id;
end;
$$;
revoke all on function public.set_credential_verification(uuid, text, text) from public, anon;
grant execute on function public.set_credential_verification(uuid, text, text) to authenticated;

create or replace function public.set_ecs_card_verification(p_profile_id uuid, p_level text, p_method text default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_firm uuid;
begin
  if not exists (select 1 from public.employer_elec_id_profiles where id = p_profile_id) then
    raise exception 'Elec-ID not found' using errcode = 'P0002';
  end if;
  v_firm := public._elec_id_verifying_firm(p_profile_id);
  perform public._elec_id_assert_level(p_level, p_method);
  if p_level <> 'self_declared' and not exists (
    select 1 from public.employer_elec_id_profiles
     where id = p_profile_id and (ecs_card_number is not null or ecs_card_type is not null)
  ) then
    raise exception 'There is no ECS card on this Elec-ID to check' using errcode = '22023';
  end if;
  update public.employer_elec_id_profiles set
    ecs_verification_level = p_level,
    ecs_verified_by = case when p_level <> 'self_declared' then auth.uid() end,
    ecs_verified_at = case when p_level <> 'self_declared' then now() end,
    ecs_verification_method = case when p_level <> 'self_declared' then trim(p_method) end,
    ecs_verifier_employer_id = case when p_level <> 'self_declared' then v_firm end
  where id = p_profile_id;
end;
$$;
revoke all on function public.set_ecs_card_verification(uuid, text, text) from public, anon;
grant execute on function public.set_ecs_card_verification(uuid, text, text) to authenticated;

-- ─── Copy real rows from the three retired stores (all 0 rows on 6 Oct) ──────
insert into public.employer_elec_id_qualifications (
  profile_id, qualification_name, qualification_type, category, awarding_body,
  certificate_number, date_achieved, expiry_date, document_url,
  added_by_employer_id, source_table, source_id, created_at)
select public._elec_id_profile_for_roster(c.employee_id), c.name, 'certification', 'certification',
       c.issuing_body, c.certificate_number, c.issue_date, c.expiry_date, c.document_url,
       r.employer_id, 'employer_certifications', c.id, c.created_at
  from public.employer_certifications c
  join public.employer_employees r on r.id = c.employee_id
 where public._elec_id_profile_for_roster(c.employee_id) is not null
on conflict (source_table, source_id) where source_id is not null do nothing;

insert into public.employer_elec_id_qualifications (
  profile_id, qualification_name, qualification_type, category, awarding_body,
  certificate_number, date_achieved, expiry_date, document_url, training_type,
  training_status, start_date, added_by_employer_id, source_table, source_id, created_at)
select public._elec_id_profile_for_roster(t.employee_id), t.training_name, 'training', 'training',
       t.provider, t.certificate_number, t.completed_date, t.expiry_date, t.certificate_url,
       t.training_type, t.status, t.start_date, t.user_id, 'training_records', t.id, coalesce(t.created_at, now())
  from public.training_records t
 where t.employee_id is not null
   and public._elec_id_profile_for_roster(t.employee_id) is not null
on conflict (source_table, source_id) where source_id is not null do nothing;

insert into public.employer_elec_id_qualifications (
  profile_id, qualification_name, qualification_type, category, awarding_body,
  certificate_number, date_achieved, expiry_date, funded_by, training_status,
  source_table, source_id, created_at)
select t.profile_id, t.training_name, 'training', 'training', t.provider, t.certificate_id,
       t.completed_date, t.expiry_date, t.funded_by,
       case when lower(coalesce(t.status, '')) = 'expired' then 'Expired' else 'Completed' end,
       'employer_elec_id_training', t.id, t.created_at
  from public.employer_elec_id_training t
on conflict (source_table, source_id) where source_id is not null do nothing;

-- ─── Labels ───────────────────────────────────────────────────────────────────
comment on table public.employer_elec_id_qualifications is
  '[ELEC-ID — OWNED BY THE ELECTRICIAN] THE credentials store: every qualification, card, certificate and training record for a person, each with a verification level (self_declared / document_seen / verified_at_source) and who/how/when. Scope: profile_id → employer_elec_id_profiles (the person''s Elec-ID). Used by: Elec-ID settings, Worker Tools → Credentials (get_my_credentials), Employer Hub Elec-ID / competence matrix / Training (get_team_credentials, add/update/delete_team_credential), set_credential_verification. Rule: Single store (ELE-1950) — never write credentials anywhere else; only the RPCs raise a verification level.';
comment on table public.employer_certifications is
  '[LEGACY — DO NOT USE] Old firm-recorded certifications (0 rows when retired 7 Oct 2026). Scope: employee_id → employer_employees. Used by: nothing. Rule: Use employer_elec_id_qualifications via get_team_credentials / add_team_credential (ELE-1950).';
comment on table public.training_records is
  '[LEGACY — DO NOT USE] Old firm-logged training (0 rows when retired 7 Oct 2026). Scope: user_id = firm. Used by: nothing. Rule: Training lives in employer_elec_id_qualifications (category ''training'') via the team credential RPCs (ELE-1950).';
comment on table public.employer_elec_id_training is
  '[LEGACY — DO NOT USE] Old Elec-ID training list (0 rows when retired 7 Oct 2026). Scope: profile_id. Used by: nothing. Rule: Training lives in employer_elec_id_qualifications (category ''training'') (ELE-1950).';
