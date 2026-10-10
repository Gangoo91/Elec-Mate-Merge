-- ELE-2040: employer behaviour verification, per behaviour, in the no-login
-- employer portal, versioned by the standard (assessment plan) version.
--
-- DfE "Apprenticeship behaviour verification guidance for employers"
-- (https://www.gov.uk/government/publications/verifying-apprenticeship-behaviours/
--  apprenticeship-behaviour-verification-guidance-for-employers):
--   * every behaviour in the occupational standard is confirmed as demonstrated,
--     by someone who has worked closely with the apprentice (line manager or
--     equivalent);
--   * naturally occurring examples, not extensive paperwork;
--   * the optional template uses 1 not yet, 2 developing, 3 consistently
--     demonstrated;
--   * a single employer confirmation at gateway; no certificate without it.
--
-- Behaviour wording is NEVER written here. It is read from the catalogue
-- (apprenticeship_ksbs, ksb_type 'behaviour', reached through
-- standard_qualifications for the standard version that holds the learner's
-- start date, exactly as catalogue_for does). When the catalogue has no version
-- for the learner's start date (the revised ST0152 plan for starts from
-- 17 Dec 2026 is not recorded) or no behaviours, the portal says so and offers
-- no checklist.
--
-- Each signed checklist stores the behaviours it was signed against (codes and
-- wording), their hash and the standard version, so a later catalogue change or
-- plan revision never rewrites what was signed. A new signature supersedes the
-- previous one for the same learner and version.

create table if not exists public.epa_behaviour_verifications (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid,
  college_student_id uuid not null references public.college_students(id) on delete cascade,
  college_id uuid not null references public.colleges(id) on delete cascade,
  employer_id uuid references public.college_employers(id) on delete set null,
  standard_id uuid references public.apprenticeship_standards(id) on delete set null,
  standard_code text not null,
  standard_version text not null,
  standard_title text,
  behaviours jsonb not null,
  behaviours_hash text not null,
  items jsonb not null,
  all_consistent boolean not null,
  signer_name text not null,
  signer_role text not null,
  signer_company text,
  signature_image text not null,
  signed_at timestamptz not null default now(),
  snapshot_hash text not null,
  via text not null default 'employer_portal',
  token_id uuid,
  superseded_at timestamptz,
  superseded_by uuid,
  created_at timestamptz not null default now()
);
create index if not exists epa_behaviour_verifications_student
  on public.epa_behaviour_verifications (college_student_id, standard_code, standard_version, signed_at desc);

comment on table public.epa_behaviour_verifications is
  '[COLLEGE ↔ APPRENTICE ↔ EMPLOYER] The employer''s per-behaviour verification for gateway (ELE-2040, DfE behaviour verification guidance): each behaviour of the learner''s standard version rated not yet / developing / consistently demonstrated, with an evidence note, signed by the line manager through the no-login employer portal. Scope: college_id + college_student_id. Used by: employer portal (/employer-view/:token), Student 360 gateway, portfolio-export-pack gateway section. Rule: written only by employer_portal_sign_behaviours(); behaviours and wording are a snapshot of the catalogue at signing; never edited, a new signature supersedes.';

alter table public.epa_behaviour_verifications enable row level security;
drop policy if exists "epa_behaviour_verifications: staff or learner read" on public.epa_behaviour_verifications;
create policy "epa_behaviour_verifications: staff or learner read" on public.epa_behaviour_verifications
  for select to authenticated using (public._review_staff_can(college_id) or learner_id = auth.uid());
revoke insert, update, delete on public.epa_behaviour_verifications from anon, authenticated;

create or replace function public._epa_behaviour_verifications_immutable()
returns trigger language plpgsql set search_path to 'public' as $$
begin
  if current_user in ('authenticated', 'anon') then
    raise exception 'a signed behaviour verification is never edited' using errcode = '42501';
  end if;
  if tg_op = 'UPDATE' and (
       new.items is distinct from old.items or new.behaviours is distinct from old.behaviours
    or new.signer_name is distinct from old.signer_name or new.signature_image is distinct from old.signature_image
    or new.signed_at is distinct from old.signed_at or new.snapshot_hash is distinct from old.snapshot_hash) then
    raise exception 'a signed behaviour verification is never edited' using errcode = '42501';
  end if;
  return coalesce(new, old);
end; $$;
drop trigger if exists trg_epa_behaviour_verifications_immutable on public.epa_behaviour_verifications;
create trigger trg_epa_behaviour_verifications_immutable before update on public.epa_behaviour_verifications
  for each row execute function public._epa_behaviour_verifications_immutable();

-- ── The behaviours for one learner, from the catalogue ─────────────────────
-- Same standard choice as catalogue_for: the version whose start window holds
-- the learner's start date. No behaviours are returned for a version that does
-- not hold the date (never another plan's wording).
create or replace function public._behaviour_catalogue(p_student uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_st public.college_students%rowtype;
  q record;
  v_as_of date;
  v_std public.apprenticeship_standards%rowtype;
  v_match text := 'none';
  v_beh jsonb;
  v_gaps text[] := '{}';
begin
  select * into v_st from public.college_students where id = p_student;
  if v_st.id is null then
    return jsonb_build_object('gaps', to_jsonb(array['no_learner']));
  end if;
  select * into q from public._resolve_qualification(v_st.user_id, p_student) limit 1;
  v_as_of := coalesce(v_st.start_date, current_date);

  select s.* into v_std
    from public.apprenticeship_standards s
    join public.standard_qualifications sq on sq.standard_id = s.id
   where sq.qualification_code in (q.code, q.requirement_code)
   order by ((s.effective_from is null or s.effective_from <= v_as_of)
             and (s.effective_to is null or s.effective_to >= v_as_of)) desc,
            s.effective_from desc nulls last
   limit 1;

  if v_std.id is null then
    v_gaps := array_append(v_gaps, 'no_standard');
  else
    v_match := case when (v_std.effective_from is null or v_std.effective_from <= v_as_of)
                     and (v_std.effective_to is null or v_std.effective_to >= v_as_of)
                    then 'in_range' else 'no_version_for_date' end;
    if v_match <> 'in_range' then
      v_gaps := array_append(v_gaps, 'standard_version_for_date');
    else
      select coalesce(jsonb_agg(x order by (x->>'sort')::int nulls last, x->>'code'), '[]'::jsonb) into v_beh
        from (
          select distinct on (k.ksb_code)
                 jsonb_build_object('code', k.ksb_code, 'title', k.title, 'description', k.description,
                                    'sort', k.sort_order) as x
            from public.apprenticeship_ksbs k
            join public.qualifications kq on kq.id = k.qualification_id
            join public.standard_qualifications sq on sq.standard_id = v_std.id and sq.qualification_code = kq.code
           where k.ksb_type = 'behaviour'
           order by k.ksb_code, k.created_at
        ) b;
      if coalesce(jsonb_array_length(v_beh), 0) = 0 then
        v_gaps := array_append(v_gaps, 'behaviours_missing');
        v_beh := null;
      end if;
    end if;
  end if;

  return jsonb_build_object(
    'college_student_id', v_st.id,
    'learner_id', v_st.user_id,
    'college_id', v_st.college_id,
    'learner_name', v_st.name,
    'start_date', v_st.start_date,
    'as_of', v_as_of,
    'qualification_code', q.code,
    'standard', case when v_std.id is null then null else jsonb_build_object(
        'id', v_std.id, 'code', v_std.code, 'version', v_std.version, 'title', v_std.title,
        'effective_from', v_std.effective_from, 'effective_to', v_std.effective_to,
        'version_match', v_match, 'source', v_std.source) end,
    'behaviours', v_beh,
    'behaviours_hash', case when v_beh is null then null
                            else encode(extensions.digest(v_beh::text, 'sha256'), 'hex') end,
    'gaps', to_jsonb(v_gaps));
end; $$;
revoke all on function public._behaviour_catalogue(uuid) from public, anon, authenticated;

create or replace function public._behaviour_current(p_student uuid, p_code text, p_version text)
returns jsonb
language sql
stable
security definer
set search_path to 'public'
as $$
  select to_jsonb(v) - 'signature_image' - 'learner_id' - 'token_id'
    from public.epa_behaviour_verifications v
   where v.college_student_id = p_student and v.standard_code = p_code and v.standard_version = p_version
     and v.superseded_at is null
   order by v.signed_at desc
   limit 1;
$$;
revoke all on function public._behaviour_current(uuid, text, text) from public, anon, authenticated;

-- ── Employer portal (no account, token-checked) ────────────────────────────
create or replace function public._employer_portal_student(p_token text, p_student uuid)
returns table (employer_id uuid, token_id uuid, company text)
language sql
stable
security definer
set search_path to 'public'
as $$
  select t.employer_id, t.id, e.company_name
    from public.college_employer_tokens t
    join public.college_employers e on e.id = t.employer_id
    join public.college_students s on s.employer_id = t.employer_id and s.id = p_student
   where t.token = p_token and t.revoked_at is null and t.expires_at > now()
     and coalesce(s.status, 'Active') = 'Active'
   limit 1;
$$;
revoke all on function public._employer_portal_student(text, uuid) from public, anon, authenticated;

create or replace function public.employer_portal_behaviours(p_token text, p_student uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  t record;
  c jsonb;
  v_gateway date;
begin
  select * into t from public._employer_portal_student(p_token, p_student);
  if t.employer_id is null then
    return jsonb_build_object('error', 'This link is not valid.');
  end if;
  c := public._behaviour_catalogue(p_student);
  select e.gateway_date into v_gateway from public.college_epa e where e.student_id = p_student
   order by e.updated_at desc nulls last limit 1;
  return jsonb_build_object(
    'ok', true,
    'learner_name', c->>'learner_name',
    'company', t.company,
    'standard', c->'standard',
    'behaviours', c->'behaviours',
    'behaviours_hash', c->>'behaviours_hash',
    'gaps', c->'gaps',
    'gateway_date', v_gateway,
    'current', case when c->'standard' is null then null
                    else public._behaviour_current(p_student, c#>>'{standard,code}', c#>>'{standard,version}') end,
    'scale', jsonb_build_array(
      jsonb_build_object('value', 'not_yet', 'label', 'Not yet'),
      jsonb_build_object('value', 'developing', 'label', 'Developing'),
      jsonb_build_object('value', 'consistent', 'label', 'Consistently demonstrated')),
    'guidance_url', 'https://www.gov.uk/government/publications/verifying-apprenticeship-behaviours/apprenticeship-behaviour-verification-guidance-for-employers');
end; $$;
revoke all on function public.employer_portal_behaviours(text, uuid) from public;
grant execute on function public.employer_portal_behaviours(text, uuid) to anon, authenticated;

create or replace function public.employer_portal_sign_behaviours(
  p_token text,
  p_student uuid,
  p_behaviours_hash text,
  p_items jsonb,
  p_name text,
  p_role text,
  p_signature text)
returns jsonb
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
declare
  t record;
  c jsonb;
  v_codes text[];
  v_given text[];
  v_items jsonb;
  v_bad text;
  v_all boolean;
  v_at timestamptz := now();
  v_hash text;
  v_id uuid;
begin
  select * into t from public._employer_portal_student(p_token, p_student);
  if t.employer_id is null then
    return jsonb_build_object('error', 'This link is not valid.');
  end if;
  c := public._behaviour_catalogue(p_student);
  if c->'behaviours' is null or jsonb_typeof(c->'behaviours') <> 'array' then
    return jsonb_build_object('error', 'The behaviours for this apprentice''s standard are not loaded yet. The college has been told.');
  end if;
  if coalesce(p_behaviours_hash, '') <> coalesce(c->>'behaviours_hash', '') then
    return jsonb_build_object('error', 'The list of behaviours has changed since you opened this page. Reload it and check again.');
  end if;
  if length(trim(coalesce(p_name, ''))) < 2 or length(trim(coalesce(p_role, ''))) < 2 then
    return jsonb_build_object('error', 'Type your name and your role.');
  end if;
  if coalesce(p_signature, '') not like 'data:image/png;base64,%' or length(p_signature) > 400000 then
    return jsonb_build_object('error', 'Sign in the box.');
  end if;
  if jsonb_typeof(p_items) <> 'array' then
    return jsonb_build_object('error', 'Rate every behaviour.');
  end if;

  select array_agg(b->>'code' order by b->>'code') into v_codes from jsonb_array_elements(c->'behaviours') b;
  select array_agg(i->>'code' order by i->>'code') into v_given from jsonb_array_elements(p_items) i;
  if v_given is distinct from v_codes then
    return jsonb_build_object('error', 'Rate every behaviour, once each.');
  end if;
  select i->>'code' into v_bad from jsonb_array_elements(p_items) i
   where coalesce(i->>'rating', '') not in ('not_yet', 'developing', 'consistent') limit 1;
  if v_bad is not null then
    return jsonb_build_object('error', 'Choose a rating for ' || v_bad || '.');
  end if;
  select i->>'code' into v_bad from jsonb_array_elements(p_items) i
   where length(trim(coalesce(i->>'evidence', ''))) < 15 limit 1;
  if v_bad is not null then
    return jsonb_build_object('error', 'Give a short example for ' || v_bad || ': something you saw them do.');
  end if;

  select jsonb_agg(jsonb_build_object('code', i->>'code', 'rating', i->>'rating',
                                      'evidence', left(trim(i->>'evidence'), 1000)) order by i->>'code'),
         bool_and(i->>'rating' = 'consistent')
    into v_items, v_all
    from jsonb_array_elements(p_items) i;

  v_hash := encode(extensions.digest(concat_ws('|', p_student, c#>>'{standard,code}', c#>>'{standard,version}',
                                               c->>'behaviours_hash', v_items::text, trim(p_name), trim(p_role),
                                               t.company, v_at), 'sha256'), 'hex');

  insert into public.epa_behaviour_verifications
    (learner_id, college_student_id, college_id, employer_id, standard_id, standard_code, standard_version,
     standard_title, behaviours, behaviours_hash, items, all_consistent, signer_name, signer_role, signer_company,
     signature_image, signed_at, snapshot_hash, via, token_id)
  values ((c->>'learner_id')::uuid, p_student, (c->>'college_id')::uuid, t.employer_id,
          (c#>>'{standard,id}')::uuid, c#>>'{standard,code}', c#>>'{standard,version}', c#>>'{standard,title}',
          c->'behaviours', c->>'behaviours_hash', v_items, v_all, left(trim(p_name), 120), left(trim(p_role), 120),
          t.company, p_signature, v_at, v_hash, 'employer_portal', t.token_id)
  returning id into v_id;

  update public.epa_behaviour_verifications
     set superseded_at = v_at, superseded_by = v_id
   where college_student_id = p_student and standard_code = c#>>'{standard,code}'
     and standard_version = c#>>'{standard,version}' and superseded_at is null and id <> v_id;

  return jsonb_build_object('success', true, 'id', v_id, 'snapshot_hash', v_hash, 'all_consistent', v_all,
                            'signed_at', v_at);
end; $$;
revoke all on function public.employer_portal_sign_behaviours(text, uuid, text, jsonb, text, text, text) from public;
grant execute on function public.employer_portal_sign_behaviours(text, uuid, text, jsonb, text, text, text) to anon, authenticated;

-- ── College and learner read ───────────────────────────────────────────────
create or replace function public.get_behaviour_verification(p_student uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_college uuid;
  v_user uuid;
  c jsonb;
begin
  select college_id, user_id into v_college, v_user from public.college_students where id = p_student;
  if auth.uid() is null or v_college is null
     or not (public._review_staff_can(v_college) or v_user = auth.uid()) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  c := public._behaviour_catalogue(p_student);
  return c - 'learner_id' || jsonb_build_object(
    'current', case when c->'standard' is null then null
                    else public._behaviour_current(p_student, c#>>'{standard,code}', c#>>'{standard,version}') end,
    'history', coalesce((select jsonb_agg(jsonb_build_object(
                 'id', v.id, 'standard_code', v.standard_code, 'standard_version', v.standard_version,
                 'signer_name', v.signer_name, 'signer_role', v.signer_role, 'signed_at', v.signed_at,
                 'all_consistent', v.all_consistent, 'superseded_at', v.superseded_at) order by v.signed_at desc)
               from public.epa_behaviour_verifications v where v.college_student_id = p_student), '[]'::jsonb));
end; $$;
revoke all on function public.get_behaviour_verification(uuid) from public, anon;
grant execute on function public.get_behaviour_verification(uuid) to authenticated;
