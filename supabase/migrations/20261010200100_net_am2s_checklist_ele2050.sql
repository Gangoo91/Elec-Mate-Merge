-- ELE-2050 — NET's AM2S v1 Candidate Checklist, filled and signed in the app.
--
-- NET requires its checklist, the awarding-body qualification and Level 2
-- maths and English before an AM2S booking
-- (netservices.org.uk/booking-and-admin-help/). The checklist is NET's own
-- form: "Readiness for Assessment: Candidate Self-Assessment Checklist,
-- AM2S v1, for apprentices registered on the Electrotechnical Apprenticeship
-- Standard in England (1.1, 1.2) from Sept 2023", December 2025 (25.12):
-- https://www.netservices.org.uk/wp-content/uploads/2025/11/NET-AM2S-v1-Candidate-Checklist-25-12-WE2.pdf
--
-- What is stored here is the ANSWERS, not NET's wording: per item a
-- Knowledge and an Experience rating (Limited / Adequate / Extensive /
-- Unsure), the registered version (1.1 or 1.2), NI number, ULN, the action
-- plan for gaps, and where the completion certificate goes. The item
-- wording lives in src/data/net/am2sV1Checklist.ts, transcribed from NET's
-- form; the export fills NET's own PDF.
--
-- The three declarations are NET's words, verbatim (_net_am2s_statement).
-- Each signature is bound to a hash of the answers it was given. A change to
-- the answers leaves earlier signatures in place but marks them as made on
-- different answers ("stale"), so the pack shows who must sign again.
-- NET's own rules, applied as written on the form:
--   - every person declares a minimum of "adequate" in every area, so a
--     signature needs every item rated and none Limited or Unsure;
--   - "NET will only accept dated signatures within 6 months of the
--     gateway application" (apply_by = earliest signature + 6 months).
--
-- Only the AM2S v1 checklist is loaded. The original AM2S (registered
-- before September 2023), AM2, AM2E and AM2D checklists are different forms
-- and are not; for those the existing "upload the signed copy" path stays.

create table if not exists public.net_am2s_checklists (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references auth.users(id) on delete cascade,
  college_student_id uuid references public.college_students(id) on delete set null,
  college_id uuid references public.colleges(id) on delete set null,
  form_version text not null default '25.12',
  registered_version text check (registered_version in ('1.1', '1.2')),
  ni_number text,
  uln text,
  ratings jsonb not null default '{}'::jsonb,
  action_plan text,
  cert_delivery text check (cert_delivery in ('employer', 'apprentice')),
  cert_recipient_name text,
  cert_organisation text,
  cert_address text,
  cert_postcode text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  unique (learner_id, form_version)
);

comment on table public.net_am2s_checklists is
  '[COLLEGE ↔ APPRENTICE ↔ EMPLOYER] ELE-2050. The answers on NET''s AM2S v1 Candidate Checklist (form 25.12) for one apprentice: Knowledge and Experience rating per item, registered version, NI number, ULN, action plan, completion-certificate delivery. Scope: learner_id = the apprentice''s auth user. Used by: NetChecklistEditor (learner /apprentice/net-checklist, staff /college/net-checklist/:id), public /net-checklist-sign/:token, the NET booking pack PDF, get_gateway_readiness. Rule: written only through save_net_am2s_checklist; NET''s wording is never stored here.';

alter table public.net_am2s_checklists enable row level security;

drop policy if exists "net_am2s_checklists: learner or their college staff read" on public.net_am2s_checklists;
create policy "net_am2s_checklists: learner or their college staff read"
  on public.net_am2s_checklists for select to authenticated
  using (learner_id = auth.uid() or public._can_assess(learner_id) or public.is_staff_for_learner_user(learner_id));

revoke all on public.net_am2s_checklists from anon;
revoke insert, update, delete on public.net_am2s_checklists from authenticated;
grant select on public.net_am2s_checklists to authenticated;

create table if not exists public.net_am2s_checklist_signatures (
  id uuid primary key default gen_random_uuid(),
  checklist_id uuid not null references public.net_am2s_checklists(id) on delete cascade,
  learner_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('candidate', 'employer', 'provider')),
  statement text not null,
  snapshot jsonb not null default '{}'::jsonb,
  snapshot_hash text,
  signer_id uuid references auth.users(id) on delete set null,
  signer_name text,
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

create index if not exists net_am2s_checklist_signatures_idx
  on public.net_am2s_checklist_signatures (checklist_id, kind, created_at desc);

comment on table public.net_am2s_checklist_signatures is
  '[COLLEGE ↔ APPRENTICE ↔ EMPLOYER] ELE-2050. Signatures on NET''s AM2S v1 checklist: the apprentice''s, the employer''s (behaviours statement and declaration, through a no-account link) and the training provider''s, each with NET''s declaration wording and a hash of the answers signed. Scope: per learner. Used by: NetChecklistEditor, /net-checklist-sign/:token, the booking pack PDF. Rule: written only through the sign_/request_ functions; a new signature supersedes the old one, nothing is edited.';

alter table public.net_am2s_checklist_signatures enable row level security;

drop policy if exists "net_am2s_checklist_signatures: learner or their college staff read" on public.net_am2s_checklist_signatures;
create policy "net_am2s_checklist_signatures: learner or their college staff read"
  on public.net_am2s_checklist_signatures for select to authenticated
  using (learner_id = auth.uid() or public._can_assess(learner_id) or public.is_staff_for_learner_user(learner_id));

revoke all on public.net_am2s_checklist_signatures from anon;
revoke insert, update, delete on public.net_am2s_checklist_signatures from authenticated;
grant select on public.net_am2s_checklist_signatures to authenticated;

insert into public.notification_types (type, category, push, importance)
values ('net_checklist_signed', 'college_reviews', true, 1)
on conflict (type) do nothing;

/* ── NET's structure: the 53 item keys of form 25.12 ─────────────────── */
-- A1 3 · A2–A6 22 · B 13 · C 3 · D 5 · E 7. Keys only; wording is NET's, in
-- src/data/net/am2sV1Checklist.ts.
create or replace function public._net_am2s_keys()
returns text[]
language sql
immutable
set search_path = public
as $$
  select array(
    select s || '.' || n
      from (values ('A1', 3, 1), ('A2', 22, 2), ('B', 13, 3), ('C', 3, 4), ('D', 5, 5), ('E', 7, 6)) t(s, c, o),
           generate_series(1, c) n
     order by o, n);
$$;

revoke all on function public._net_am2s_keys() from public, anon;
grant execute on function public._net_am2s_keys() to authenticated, service_role;

/* ── NET's declaration wording, verbatim from form 25.12 ─────────────── */
create or replace function public._net_am2s_statement(p_kind text, p_learner_name text default null)
returns text
language sql
immutable
set search_path = public
as $$
  select case p_kind
    when 'candidate' then
      'As the apprentice, I formally confirm that I believe I am consistently demonstrating a minimum of “adequate “ in every area of Knowledge and Skill detailed in this checklist and that I do not require additional training or experience in any area to become occupationally competent.'
      || E'\n\n' || 'By signing below, I formally confirm that I am ready to undertake Apprenticeship Assessment.'
    when 'employer' then
      'I confirm that (enter apprentice’s name): ' || coalesce(nullif(trim(p_learner_name), ''), '') || E'\n'
      || 'has consistently demonstrated the following behaviours to the standard I require:' || E'\n'
      || '• Acts responsibly, ethically and contributes to safe outcomes. Puts health and safety first for themselves and others. Embeds a health and safety culture and is always hazard and risk aware during work. Challenges any unsafe practices and demonstrates personal accountability.' || E'\n'
      || '• Embraces a sustainable working culture, taking responsibility for the careful use of resources and correct disposal of work waste demonstrating consideration of the environmental impact.' || E'\n'
      || '• Demonstrates commitment to quality, commercial awareness, and continuous improvement by complying with health, safety and welfare requirements, industry standards, statutory regulation and legislation, policies, and codes of practice.' || E'\n'
      || '• Focuses on the requirements of the customer (internal and external) or client, seeking to provide outstanding customer service.' || E'\n'
      || '• Manages own time efficiently to complete work operations and effectively schedule work within the confines of job responsibility and awareness of the limits of their own competence.' || E'\n'
      || '• Committed to keeping up to date with industry best practice, relevant legislation and technical standards and undertaking personal CPD in line with industry best practice.' || E'\n'
      || '• Works productively and cooperatively with co-workers, customers, vendors, people from other trades and other people external to their own company using effective communication skills.' || E'\n'
      || '• Promote green technologies when appropriate, meeting, or exceeding customer requirements, including customers with diverse needs and those transitioning to green technologies'
      || E'\n\n'
      || 'As the apprentice’s employer, I am fully satisfied that my apprentice is consistently demonstrating a minimum of “adequate” in every area of Knowledge and Skill detailed in this checklist and is therefore occupationally competent. No further learning or experience in any area is required. I confirm that all specified qualifications have been achieved, and certificates submitted before assessment.'
      || E'\n\n' || 'By signing below, I formally confirm that my apprentice is ready to undertake Apprenticeship Assessment.'
    when 'provider' then
      'As the apprentice’s training provider, I formally confirm that the apprentice has received training and on/off the job experience and development as specified within the apprenticeship standard and assessment plan, covering the full range of Knowledge and Skills specified within this checklist. In my opinion the apprentice is able to consistently demonstrate a minimum of “adequate” in each of these areas and no further training or experience in any area is required. I confirm that all specified qualifications have been achieved and certificates submitted before assessment.'
      || E'\n\n' || 'By signing below, I formally confirm that the apprentice is ready to undertake Apprenticeship Assessment.'
  end;
$$;

revoke all on function public._net_am2s_statement(text, text) from public, anon;
grant execute on function public._net_am2s_statement(text, text) to authenticated, service_role;

/* ── Who the learner is, and whether this form is theirs ─────────────── */
create or replace function public._net_am2s_context(p_learner uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  q record;
  st record;
  cs record;
  v_name text;
begin
  select * into q from public._resolve_qualification(p_learner, null) limit 1;
  select * into st from public._gateway_standard(coalesce(q.course_code, q.code, q.requirement_code));
  select s.id, s.college_id, s.name, s.uln, s.ni_number, s.start_date, c.name as college_name,
         e.company_name, e.contact_name
    into cs
    from public.college_students s
    left join public.colleges c on c.id = s.college_id
    left join public.college_employers e on e.id = s.employer_id
   where s.user_id = p_learner
   order by (lower(coalesce(s.status, '')) in ('withdrawn', 'completed', 'archived')), s.created_at desc
   limit 1;
  v_name := coalesce(nullif(trim(cs.name), ''), (select nullif(trim(full_name), '') from public.profiles where id = p_learner));
  return jsonb_build_object(
    'route', st.route,
    'assessment', st.assessment,
    'standard_code', st.standard_code,
    'college_student_id', cs.id,
    'college_id', cs.college_id,
    'college_name', cs.college_name,
    'learner_name', v_name,
    'uln', cs.uln,
    'ni_number', cs.ni_number,
    'start_date', cs.start_date,
    'employer_name', cs.company_name,
    'employer_contact', cs.contact_name,
    -- NET: AM2S v1 is for apprentices registered on the standard from Sept 2023.
    'applicable', st.route = 'am2s' and (cs.start_date is null or cs.start_date >= date '2023-09-01'),
    'not_applicable_reason', case
      when st.route <> 'am2s' then 'This checklist is NET''s AM2S v1 form. Your course leads to '
        || coalesce(st.assessment, 'a different assessment') || ', which has its own NET checklist.'
      when cs.start_date < date '2023-09-01' then 'Registered before September 2023: NET''s original AM2S checklist applies, not the AM2S v1 form.'
    end);
end;
$$;

revoke all on function public._net_am2s_context(uuid) from public, anon, authenticated;

-- The answers a signature is bound to.
create or replace function public._net_am2s_snapshot(c public.net_am2s_checklists, p_learner_name text)
returns jsonb
language sql
immutable
set search_path = public
as $$
  select jsonb_build_object('form_version', c.form_version, 'registered_version', c.registered_version,
                            'learner_name', p_learner_name, 'ratings', c.ratings);
$$;

revoke all on function public._net_am2s_snapshot(public.net_am2s_checklists, text) from public, anon, authenticated;

-- Items not yet at "adequate" for both Knowledge and Experience.
create or replace function public._net_am2s_gaps(p_ratings jsonb)
returns jsonb
language sql
immutable
set search_path = public
as $$
  select jsonb_build_object(
    'unrated', coalesce(jsonb_agg(k) filter (where coalesce(p_ratings #>> array[k, 'k'], '') = ''
                                              or coalesce(p_ratings #>> array[k, 'e'], '') = ''), '[]'::jsonb),
    'below', coalesce(jsonb_agg(k) filter (where p_ratings #>> array[k, 'k'] in ('limited', 'unsure')
                                            or p_ratings #>> array[k, 'e'] in ('limited', 'unsure')), '[]'::jsonb))
  from unnest(public._net_am2s_keys()) k;
$$;

revoke all on function public._net_am2s_gaps(jsonb) from public, anon;
grant execute on function public._net_am2s_gaps(jsonb) to authenticated, service_role;

create or replace function public._net_am2s_ensure(p_learner uuid)
returns public.net_am2s_checklists
language plpgsql
security definer
set search_path = public
as $$
declare
  c public.net_am2s_checklists;
  ctx jsonb;
begin
  select * into c from public.net_am2s_checklists where learner_id = p_learner and form_version = '25.12';
  if c.id is null then
    ctx := public._net_am2s_context(p_learner);
    insert into public.net_am2s_checklists (learner_id, college_student_id, college_id, uln, ni_number, updated_by)
    values (p_learner, (ctx->>'college_student_id')::uuid, (ctx->>'college_id')::uuid,
            ctx->>'uln', ctx->>'ni_number', auth.uid())
    on conflict (learner_id, form_version) do nothing;
    select * into c from public.net_am2s_checklists where learner_id = p_learner and form_version = '25.12';
  end if;
  return c;
end;
$$;

revoke all on function public._net_am2s_ensure(uuid) from public, anon, authenticated;

/* ── Read ────────────────────────────────────────────────────────────── */
create or replace function public.get_net_am2s_checklist(p_learner uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  u uuid := coalesce(p_learner, auth.uid());
  ctx jsonb;
  c public.net_am2s_checklists;
  v_hash text;
  v_sigs jsonb;
  v_gaps jsonb;
  v_first timestamptz;
  v_all boolean;
begin
  if auth.uid() is null or not (auth.uid() = u or public._can_assess(u) or public.is_staff_for_learner_user(u)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  ctx := public._net_am2s_context(u);
  select * into c from public.net_am2s_checklists where learner_id = u and form_version = '25.12';

  if c.id is not null then
    v_hash := encode(extensions.digest(public._net_am2s_snapshot(c, ctx->>'learner_name')::text, 'sha256'), 'hex');
    select coalesce(jsonb_object_agg(kind, j), '{}'::jsonb), min(signed_at) filter (where not stale)
      into v_sigs, v_first
      from (
        select distinct on (s.kind) s.kind, s.signed_at, (s.snapshot_hash is distinct from v_hash) as stale,
               jsonb_build_object('id', s.id, 'signer_name', s.signer_name, 'signer_company', s.signer_company,
                                  'signed_at', s.signed_at, 'signature_image', s.signature_image,
                                  'stale', s.snapshot_hash is distinct from v_hash,
                                  'pending_link', s.signed_at is null and s.token is not null and s.token_expires_at > now(),
                                  'token', case when s.signed_at is null and auth.uid() <> u then s.token end,
                                  'token_expires_at', s.token_expires_at,
                                  'requested_by_name', s.requested_by_name) as j
          from public.net_am2s_checklist_signatures s
         where s.checklist_id = c.id and s.superseded_at is null
         order by s.kind, s.signed_at desc nulls first, s.created_at desc
      ) x;
  end if;

  v_gaps := public._net_am2s_gaps(coalesce(c.ratings, '{}'::jsonb));
  v_all := c.id is not null and (
    select count(*) = 3 from jsonb_each(coalesce(v_sigs, '{}'::jsonb)) e
     where e.value->>'signed_at' is not null and (e.value->>'stale')::boolean = false);

  return jsonb_build_object(
    'context', ctx,
    'checklist', case when c.id is null then null else to_jsonb(c) end,
    'signatures', coalesce(v_sigs, '{}'::jsonb),
    'gaps', v_gaps,
    'ready_to_sign', jsonb_array_length(v_gaps->'unrated') = 0 and jsonb_array_length(v_gaps->'below') = 0
                     and c.registered_version is not null,
    'all_signed', coalesce(v_all, false),
    'apply_by', case when v_first is null then null else (v_first + interval '6 months')::date end,
    'statements', jsonb_build_object(
      'candidate', public._net_am2s_statement('candidate'),
      'employer', public._net_am2s_statement('employer', ctx->>'learner_name'),
      'provider', public._net_am2s_statement('provider')),
    'viewer', case when auth.uid() = u then 'learner' else 'staff' end,
    'can_sign_provider', auth.uid() <> u and public._can_assess(u));
end;
$$;

revoke all on function public.get_net_am2s_checklist(uuid) from public, anon;
grant execute on function public.get_net_am2s_checklist(uuid) to authenticated;

/* ── Save answers ────────────────────────────────────────────────────── */
-- p_patch: { registered_version, ni_number, uln, action_plan,
--            ratings: { "A1.1": { "k": "adequate", "e": "limited" }, … },
--            cert_delivery, cert_recipient_name, cert_organisation, cert_address, cert_postcode }
-- Ratings merge item by item; an item value of null clears it.
create or replace function public.save_net_am2s_checklist(p_learner uuid, p_patch jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  u uuid := coalesce(p_learner, auth.uid());
  c public.net_am2s_checklists;
  v_staff boolean;
  k text;
  v jsonb;
  v_ratings jsonb;
  v_keys text[] := public._net_am2s_keys();
begin
  if auth.uid() is null then raise exception 'not allowed' using errcode = '42501'; end if;
  v_staff := auth.uid() <> u;
  if v_staff and not (public._can_assess(u) or public.is_staff_for_learner_user(u)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if not coalesce((public._net_am2s_context(u)->>'applicable')::boolean, false) then
    return jsonb_build_object('error', public._net_am2s_context(u)->>'not_applicable_reason');
  end if;

  c := public._net_am2s_ensure(u);
  v_ratings := c.ratings;

  if p_patch ? 'ratings' then
    for k, v in select * from jsonb_each(coalesce(p_patch->'ratings', '{}'::jsonb)) loop
      if not k = any (v_keys) then
        return jsonb_build_object('error', 'Unknown checklist item ' || k);
      end if;
      if v is null or v = 'null'::jsonb then
        v_ratings := v_ratings - k;
      else
        if coalesce(v->>'k', 'limited') not in ('limited', 'adequate', 'extensive', 'unsure')
           or coalesce(v->>'e', 'limited') not in ('limited', 'adequate', 'extensive', 'unsure') then
          return jsonb_build_object('error', 'Ratings are Limited, Adequate, Extensive or Unsure.');
        end if;
        v_ratings := jsonb_set(v_ratings, array[k], jsonb_strip_nulls(jsonb_build_object(
          'k', coalesce(v->'k', v_ratings #> array[k, 'k']),
          'e', coalesce(v->'e', v_ratings #> array[k, 'e']))));
      end if;
    end loop;
  end if;

  if p_patch ? 'cert_delivery' and not v_staff then
    return jsonb_build_object('error', 'Where the completion certificate goes is for the training provider to fill in.');
  end if;
  if p_patch ? 'registered_version' and coalesce(p_patch->>'registered_version', '') not in ('', '1.1', '1.2') then
    return jsonb_build_object('error', 'The registered version is 1.1 or 1.2.');
  end if;
  if p_patch ? 'cert_delivery' and coalesce(p_patch->>'cert_delivery', '') not in ('', 'employer', 'apprentice') then
    return jsonb_build_object('error', 'Choose the employer or the apprentice.');
  end if;

  update public.net_am2s_checklists set
    ratings = v_ratings,
    registered_version = case when p_patch ? 'registered_version' then nullif(p_patch->>'registered_version', '') else registered_version end,
    ni_number = case when p_patch ? 'ni_number' then nullif(upper(trim(p_patch->>'ni_number')), '') else ni_number end,
    uln = case when p_patch ? 'uln' then nullif(trim(p_patch->>'uln'), '') else uln end,
    action_plan = case when p_patch ? 'action_plan' then nullif(trim(p_patch->>'action_plan'), '') else action_plan end,
    cert_delivery = case when v_staff and p_patch ? 'cert_delivery' then nullif(p_patch->>'cert_delivery', '') else cert_delivery end,
    cert_recipient_name = case when v_staff and p_patch ? 'cert_recipient_name' then nullif(trim(p_patch->>'cert_recipient_name'), '') else cert_recipient_name end,
    cert_organisation = case when v_staff and p_patch ? 'cert_organisation' then nullif(trim(p_patch->>'cert_organisation'), '') else cert_organisation end,
    cert_address = case when v_staff and p_patch ? 'cert_address' then nullif(trim(p_patch->>'cert_address'), '') else cert_address end,
    cert_postcode = case when v_staff and p_patch ? 'cert_postcode' then nullif(upper(trim(p_patch->>'cert_postcode')), '') else cert_postcode end,
    updated_at = now(),
    updated_by = auth.uid()
  where id = c.id;

  return jsonb_build_object('success', true);
end;
$$;

revoke all on function public.save_net_am2s_checklist(uuid, jsonb) from public, anon;
grant execute on function public.save_net_am2s_checklist(uuid, jsonb) to authenticated;

/* ── Sign in the app: the apprentice, or the training provider ───────── */
create or replace function public.sign_net_am2s_checklist(
  p_learner uuid, p_kind text, p_name text, p_signature text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  u uuid := coalesce(p_learner, auth.uid());
  ctx jsonb;
  c public.net_am2s_checklists;
  snap jsonb;
  v_hash text;
  v_gaps jsonb;
  v_id uuid;
  v_tutor uuid;
begin
  if auth.uid() is null then raise exception 'not allowed' using errcode = '42501'; end if;
  if p_kind = 'candidate' then
    if auth.uid() <> u then raise exception 'Only the apprentice can sign the apprentice declaration' using errcode = '42501'; end if;
  elsif p_kind = 'provider' then
    if auth.uid() = u or not public._can_assess(u) then
      raise exception 'Only the training provider can sign the training provider declaration' using errcode = '42501';
    end if;
  else
    raise exception 'Unknown declaration' using errcode = '22023';
  end if;
  if length(trim(coalesce(p_name, ''))) < 2 then
    return jsonb_build_object('error', 'Print your full name to sign.');
  end if;
  if p_signature is null or left(p_signature, 22) <> 'data:image/png;base64,' or length(p_signature) > 400000 then
    return jsonb_build_object('error', 'Draw your signature to sign.');
  end if;

  ctx := public._net_am2s_context(u);
  if not coalesce((ctx->>'applicable')::boolean, false) then
    return jsonb_build_object('error', ctx->>'not_applicable_reason');
  end if;
  select * into c from public.net_am2s_checklists where learner_id = u and form_version = '25.12';
  if c.id is null then return jsonb_build_object('error', 'Fill in the checklist first.'); end if;
  if c.registered_version is null then
    return jsonb_build_object('error', 'Tick the version registered with the Apprenticeship Service (1.1 or 1.2) first.');
  end if;
  v_gaps := public._net_am2s_gaps(c.ratings);
  if jsonb_array_length(v_gaps->'unrated') > 0 then
    return jsonb_build_object('error', 'Rate every item for Knowledge and Experience first. '
      || jsonb_array_length(v_gaps->'unrated') || ' to go.');
  end if;
  if jsonb_array_length(v_gaps->'below') > 0 then
    return jsonb_build_object('error', 'The declaration confirms at least Adequate in every area. '
      || jsonb_array_length(v_gaps->'below') || ' item(s) are Limited or Unsure: agree an action plan and come back when they are at Adequate.');
  end if;

  snap := public._net_am2s_snapshot(c, ctx->>'learner_name');
  v_hash := encode(extensions.digest(snap::text, 'sha256'), 'hex');

  update public.net_am2s_checklist_signatures set superseded_at = now()
   where checklist_id = c.id and kind = p_kind and superseded_at is null;

  insert into public.net_am2s_checklist_signatures
    (checklist_id, learner_id, kind, statement, snapshot, snapshot_hash, signer_id, signer_name, signature_image, signed_at)
  values (c.id, u, p_kind, public._net_am2s_statement(p_kind), snap, v_hash, auth.uid(), trim(p_name), p_signature, now())
  returning id into v_id;

  insert into public.portfolio_audit_events (learner_id, actor_id, actor_role, action, object_type, object_id, summary, content_hash)
  values (u, auth.uid(), case when p_kind = 'candidate' then 'learner' else 'staff' end,
          'net_checklist_signed', 'net_am2s_checklist', v_id,
          jsonb_build_object('kind', p_kind, 'signer_name', trim(p_name), 'form', 'AM2S v1 ' || c.form_version), v_hash);

  if p_kind = 'candidate' and c.college_student_id is not null then
    for v_tutor in
      select distinct t from (
        select st.user_id as t from public.college_students cs
          join public.college_cohorts co on co.id = cs.cohort_id
          join public.college_staff st on st.id = co.tutor_id
         where cs.id = c.college_student_id and st.archived_at is null
        union
        select a.tutor_id from public.college_student_assignments a where a.student_id = u
      ) q where t is not null
    loop
      perform public.notify_user(v_tutor, 'net_checklist_signed',
        coalesce(ctx->>'learner_name', 'Your learner') || ' signed NET''s AM2S checklist',
        'Their apprentice declaration is signed. The training provider and employer declarations come next.',
        jsonb_build_object('route', '/college/net-checklist/' || c.college_student_id, 'learner_id', u));
    end loop;
  end if;

  return jsonb_build_object('success', true, 'id', v_id);
end;
$$;

revoke all on function public.sign_net_am2s_checklist(uuid, text, text, text) from public, anon;
grant execute on function public.sign_net_am2s_checklist(uuid, text, text, text) to authenticated;

/* ── The employer's link: staff ask, the employer signs with no account ─ */
create or replace function public.request_net_am2s_employer_signature(p_learner uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  c public.net_am2s_checklists;
  v_token text := encode(extensions.gen_random_bytes(24), 'hex');
  v_name text;
  v_email text;
  v_id uuid;
  ctx jsonb;
begin
  if auth.uid() is null or auth.uid() = p_learner or not (public._can_assess(p_learner) or public.is_staff_for_learner_user(p_learner)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  ctx := public._net_am2s_context(p_learner);
  if not coalesce((ctx->>'applicable')::boolean, false) then
    return jsonb_build_object('error', ctx->>'not_applicable_reason');
  end if;
  c := public._net_am2s_ensure(p_learner);
  select coalesce(nullif(trim(full_name), ''), 'Tutor') into v_name from public.profiles where id = auth.uid();
  select e.contact_email into v_email from public.college_students cs
    join public.college_employers e on e.id = cs.employer_id
   where cs.id = (ctx->>'college_student_id')::uuid;

  -- An unsigned link already out is replaced by this one.
  update public.net_am2s_checklist_signatures set superseded_at = now()
   where checklist_id = c.id and kind = 'employer' and signed_at is null and superseded_at is null;

  insert into public.net_am2s_checklist_signatures
    (checklist_id, learner_id, kind, statement, token, token_expires_at, requested_by, requested_by_name)
  values (c.id, p_learner, 'employer', public._net_am2s_statement('employer', ctx->>'learner_name'),
          v_token, now() + interval '30 days', auth.uid(), v_name)
  returning id into v_id;

  return jsonb_build_object('success', true, 'id', v_id, 'token', v_token, 'employer_email', v_email);
end;
$$;

revoke all on function public.request_net_am2s_employer_signature(uuid) from public, anon;
grant execute on function public.request_net_am2s_employer_signature(uuid) to authenticated;

create or replace function public.get_net_am2s_checklist_public(p_token text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  s public.net_am2s_checklist_signatures;
  c public.net_am2s_checklists;
  ctx jsonb;
begin
  if coalesce(length(p_token), 0) < 32 then return jsonb_build_object('error', 'This link is not valid.'); end if;
  select * into s from public.net_am2s_checklist_signatures where token = p_token and kind = 'employer';
  if s.id is null then return jsonb_build_object('error', 'This link is not valid.'); end if;
  if s.superseded_at is not null and s.signed_at is null then
    return jsonb_build_object('error', 'This link has been replaced by a newer one. Ask the college for the latest link.');
  end if;
  if s.signed_at is null and s.token_expires_at < now() then
    return jsonb_build_object('error', 'This link has expired. Ask the college for a new one.');
  end if;
  select * into c from public.net_am2s_checklists where id = s.checklist_id;
  ctx := public._net_am2s_context(s.learner_id);
  return jsonb_build_object(
    'learner_name', ctx->>'learner_name',
    'college_name', ctx->>'college_name',
    'employer_name', ctx->>'employer_name',
    'registered_version', case when s.signed_at is null then c.registered_version else s.snapshot->>'registered_version' end,
    'ratings', case when s.signed_at is null then c.ratings else s.snapshot->'ratings' end,
    'gaps', public._net_am2s_gaps(case when s.signed_at is null then c.ratings else s.snapshot->'ratings' end),
    'statement', case when s.signed_at is null then public._net_am2s_statement('employer', ctx->>'learner_name') else s.statement end,
    'requested_by_name', s.requested_by_name,
    'signed_at', s.signed_at,
    'signer_name', s.signer_name,
    'signer_company', s.signer_company);
end;
$$;

revoke all on function public.get_net_am2s_checklist_public(text) from public;
grant execute on function public.get_net_am2s_checklist_public(text) to anon, authenticated;

create or replace function public.sign_net_am2s_checklist_employer(
  p_token text, p_name text, p_company text, p_signature text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  s public.net_am2s_checklist_signatures;
  c public.net_am2s_checklists;
  ctx jsonb;
  snap jsonb;
  v_hash text;
  v_gaps jsonb;
begin
  if coalesce(length(p_token), 0) < 32 then return jsonb_build_object('error', 'This link is not valid.'); end if;
  select * into s from public.net_am2s_checklist_signatures where token = p_token and kind = 'employer' for update;
  if s.id is null or s.superseded_at is not null then
    return jsonb_build_object('error', 'This link is not valid any more. Ask the college for the latest link.');
  end if;
  if s.signed_at is not null then return jsonb_build_object('error', 'This checklist has already been signed.'); end if;
  if s.token_expires_at < now() then return jsonb_build_object('error', 'This link has expired. Ask the college for a new one.'); end if;
  if length(trim(coalesce(p_name, ''))) < 2 then return jsonb_build_object('error', 'Print your full name to sign.'); end if;
  if length(trim(coalesce(p_company, ''))) < 2 then return jsonb_build_object('error', 'Add the company name.'); end if;
  if p_signature is null or left(p_signature, 22) <> 'data:image/png;base64,' or length(p_signature) > 400000 then
    return jsonb_build_object('error', 'Draw your signature to sign.');
  end if;

  select * into c from public.net_am2s_checklists where id = s.checklist_id;
  v_gaps := public._net_am2s_gaps(c.ratings);
  if c.registered_version is null or jsonb_array_length(v_gaps->'unrated') > 0 or jsonb_array_length(v_gaps->'below') > 0 then
    return jsonb_build_object('error', 'The checklist is not finished yet: every item must be at least Adequate before it is signed. The college will send the link again when it is ready.');
  end if;
  ctx := public._net_am2s_context(s.learner_id);
  snap := public._net_am2s_snapshot(c, ctx->>'learner_name');
  v_hash := encode(extensions.digest(snap::text, 'sha256'), 'hex');

  update public.net_am2s_checklist_signatures set superseded_at = now()
   where checklist_id = c.id and kind = 'employer' and signed_at is not null and superseded_at is null;

  update public.net_am2s_checklist_signatures
     set statement = public._net_am2s_statement('employer', ctx->>'learner_name'),
         snapshot = snap, snapshot_hash = v_hash,
         signer_name = trim(p_name), signer_company = trim(p_company),
         signature_image = p_signature, signed_at = now()
   where id = s.id;

  insert into public.portfolio_audit_events (learner_id, actor_id, actor_role, action, object_type, object_id, summary, content_hash)
  values (s.learner_id, null, 'employer', 'net_checklist_signed', 'net_am2s_checklist', s.id,
          jsonb_build_object('kind', 'employer', 'signer_name', trim(p_name), 'signer_company', trim(p_company),
                             'form', 'AM2S v1 ' || c.form_version), v_hash);

  if s.requested_by is not null then
    perform public.notify_user(s.requested_by, 'net_checklist_signed',
      'Employer signed NET''s AM2S checklist',
      trim(p_name) || ' (' || trim(p_company) || ') signed the behaviours statement and employer declaration for '
        || coalesce(ctx->>'learner_name', 'your learner') || '.',
      jsonb_build_object('route', '/college/net-checklist/' || c.college_student_id, 'learner_id', s.learner_id));
  end if;

  return jsonb_build_object('success', true);
end;
$$;

revoke all on function public.sign_net_am2s_checklist_employer(text, text, text, text) from public;
grant execute on function public.sign_net_am2s_checklist_employer(text, text, text, text) to anon, authenticated;

-- For the gateway gate: is there a current, fully signed AM2S v1 checklist?
create or replace function public._net_am2s_fully_signed(p_learner uuid)
returns timestamptz
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  c public.net_am2s_checklists;
  v_hash text;
  v_n int;
  v_last timestamptz;
begin
  select * into c from public.net_am2s_checklists where learner_id = p_learner and form_version = '25.12';
  if c.id is null then return null; end if;
  v_hash := encode(extensions.digest(
    public._net_am2s_snapshot(c, public._net_am2s_context(p_learner)->>'learner_name')::text, 'sha256'), 'hex');
  select count(distinct kind), max(signed_at) into v_n, v_last
    from public.net_am2s_checklist_signatures
   where checklist_id = c.id and superseded_at is null and signed_at is not null and snapshot_hash = v_hash;
  return case when v_n = 3 then v_last end;
end;
$$;

revoke all on function public._net_am2s_fully_signed(uuid) from public, anon, authenticated;
grant execute on function public._net_am2s_fully_signed(uuid) to service_role;
