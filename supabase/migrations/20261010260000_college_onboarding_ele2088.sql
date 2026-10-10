-- ELE-2088 — enrolment and eligibility in one guided onboarding flow.
--
-- The learner confirms their eligibility and residency and uploads their ID on
-- their phone; the employer confirms the employment details, signs the
-- apprenticeship agreement and confirms the contract for services by a
-- personal link with no account; the college checks the ID, and sees one
-- "ready to start" checklist per learner that also pulls in the initial
-- assessment, prior learning (ELE-2042) and the training plan (ELE-2039).
--
-- Every paragraph below was located by exact quote in the 2026/27 rules (v3,
-- pdftotext -layout of
-- https://assets.publishing.service.gov.uk/media/6a68cabe229c578debc1a78c/Funding_Rules_2627_Version_3_Final.pdf):
--   29     "The provider must check the eligibility of the individual for
--           apprenticeship funding at the start of their apprenticeship."
--   29.1   "...only claim funding for an individual who meets the residency
--           eligibility criteria set out in Annex A"
--   30.2–30.5 able to complete in the time available; no student loan; no
--           duplicated funding; at least 50% of working hours in England
--   34.1–34.8 individuals who are not eligible (sole trader, IR35, director with
--           no separate line manager, another apprenticeship, Skills Bootcamp,
--           ASF/devolved training, other DfE funding, sandwich placement)
--   Evidence box after 34: "Confirmation that they have seen the learner's
--           identity documents and / or immigration status / permissions ...";
--           "Confirmation that the provider has checked the learner's ordinary
--           residency status and that it is in line with Annex A"; employment
--           "can be a relevant extract from a contract of employment or a
--           signed declaration by the employer"
--   24, 71.2 a separate identifiable line manager undertaking the role of the employer
--   69, 69.2 employed for long enough to complete including EPA; on the PAYE
--           scheme declared in the apprenticeship service account
--   70–72  the apprenticeship agreement: evidence of it (70), signed by both
--           the employer and the apprentice (71), "prohibited for someone to
--           sign ... as both the apprentice and as the employer" (71.1), what it
--           must include (72.1–72.6)
--   99.4   the provider is not a signatory to the apprenticeship agreement
--   208, 208.1 the contract for services: funding band (or total price if
--           less), the co-investment policy, and a statement that the funding
--           band will only be used directly on eligible costs; evidence box
--           after 211: "signed and dated by both parties"
--   345.2  "The apprentice and / or employer must confirm the information they
--           provide is correct when it is collected."
--   346–347 electronic signatures accepted; must be irrefutable; renewals keep both
--   353    "Where a self-declaration is needed, this must state the apprentice
--           or employer's details and describe what is being confirmed."
--   354–355 valid residency status and the right to work in England; ordinarily resident
--   358, 361, 364, 366–375 Annex A categories
--
-- Irrefutable (346–347) reuses ELE-2039's pattern: each record stores the
-- SHA-256 of exactly what was confirmed (statement + answers, and for the
-- agreement the frozen agreement's fingerprint), and a signature hash chaining
-- that with item, role, name, user, time and the previous record's hash.
-- Records are never updated or deleted (trigger). The agreement is frozen when
-- issued; a renewal is a new version and both are kept (347).
--
-- Personal data: ID copies go to the existing private bucket
-- college-learner-evidence under <college_id>/onboarding/<student_id>/…, which
-- only staff of that college can read (policy learner_evidence_files_read). No
-- new storage policy. Only the document TYPE is stored in the database, never
-- document numbers. The upload is written by the college-onboarding-upload
-- edge function after a token check.

-- ── Tables ─────────────────────────────────────────────────────────────
create table if not exists public.college_onboarding (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  student_id uuid not null unique references public.college_students(id) on delete cascade,
  agreement_content jsonb not null default '{}'::jsonb,
  agreement_version integer not null default 1,
  agreement_hash text,
  agreement_issued_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  ready_at timestamptz
);

comment on table public.college_onboarding is
  '[COLLEGE ↔ APPRENTICE ↔ EMPLOYER] One guided onboarding per learner (ELE-2088): eligibility and residency self-declarations, ID and right to work, employer confirmation, the apprenticeship agreement (frozen at issue, agreement_hash) and the contract for services reference. Scope: one row per college_students row. Used by: Student 360 onboarding card, /college/onboarding list, public /start/:token, evidence pack (onb_* items). Rule: written only through the onboarding functions; the agreement content cannot change once issued, a renewal is a new version (para 347).';

create table if not exists public.college_onboarding_links (
  id uuid primary key default gen_random_uuid(),
  onboarding_id uuid not null references public.college_onboarding(id) on delete cascade,
  role text not null check (role in ('apprentice', 'employer')),
  token text not null unique,
  created_at timestamptz not null default now(),
  revoked_at timestamptz,
  unique (onboarding_id, role)
);

comment on table public.college_onboarding_links is
  '[COLLEGE] Personal onboarding links for the apprentice and the employer (ELE-2088). Scope: one per onboarding and role. Used by: Student 360 onboarding card (copy link), public /start/:token, college-onboarding-upload. Rule: never selectable by any client; staff fetch links through get_onboarding().';

create table if not exists public.college_onboarding_records (
  id uuid primary key default gen_random_uuid(),
  onboarding_id uuid not null references public.college_onboarding(id) on delete cascade,
  college_id uuid not null references public.colleges(id) on delete cascade,
  student_id uuid not null references public.college_students(id) on delete cascade,
  item text not null check (item in ('eligibility', 'residency', 'id_upload', 'id_seen',
                                     'employer_eligibility', 'agreement', 'contract_for_services')),
  role text not null check (role in ('apprentice', 'employer', 'provider')),
  version integer not null default 1,
  signer_name text not null check (length(trim(signer_name)) between 2 and 200),
  signer_title text,
  signer_company text,
  signer_user_id uuid references auth.users(id) on delete set null,
  method text not null check (method in ('signed_in', 'personal_link')),
  statement text not null,
  answers jsonb not null default '{}'::jsonb,
  content_hash text not null,
  prev_signature_hash text,
  signature_hash text not null,
  file_path text,
  file_name text,
  file_hash text,
  evidence_id uuid references public.college_learner_evidence(id) on delete set null,
  user_agent text,
  signed_at timestamptz not null default now()
);
create unique index if not exists college_onboarding_records_once
  on public.college_onboarding_records (onboarding_id, item, role, version) where item <> 'id_upload';
create index if not exists college_onboarding_records_onb_idx
  on public.college_onboarding_records (onboarding_id, signed_at);

comment on table public.college_onboarding_records is
  '[COLLEGE ↔ APPRENTICE ↔ EMPLOYER] Each confirmation, upload and signature in a learner''s onboarding (ELE-2088): what was confirmed (statement, answers), by whom, how, when, and its hash-chained fingerprint (paras 346–347, 353). Personal data: ID uploads are referenced by path in the private college-learner-evidence bucket; only the document type is stored, never document numbers. Scope: per onboarding. Used by: onboarding checklist, evidence pack. Rule: insert only via onboarding functions; never updated or deleted (trigger).';

alter table public.college_onboarding enable row level security;
alter table public.college_onboarding_links enable row level security;
alter table public.college_onboarding_records enable row level security;

drop policy if exists "college_onboarding: staff read" on public.college_onboarding;
create policy "college_onboarding: staff read"
  on public.college_onboarding for select to authenticated
  using (public._review_staff_can(college_id));

drop policy if exists "college_onboarding_records: staff read" on public.college_onboarding_records;
create policy "college_onboarding_records: staff read"
  on public.college_onboarding_records for select to authenticated
  using (public._review_staff_can(college_id));

revoke all on public.college_onboarding from anon;
revoke all on public.college_onboarding_records from anon;
revoke all on public.college_onboarding_links from anon, authenticated;
revoke insert, update, delete on public.college_onboarding from authenticated;
revoke insert, update, delete on public.college_onboarding_records from authenticated;
grant select on public.college_onboarding to authenticated;
grant select on public.college_onboarding_records to authenticated;

-- Records are permanent (para 347).
create or replace function public.tg_onboarding_record_immutable()
returns trigger language plpgsql set search_path = public as $$
begin
  -- The only removal allowed is the cascade when the onboarding itself is
  -- erased (the learner record deleted); by then the parent row is gone.
  if tg_op = 'DELETE' and not exists (select 1 from public.college_onboarding where id = old.onboarding_id) then
    return old;
  end if;
  raise exception 'onboarding records cannot be changed or removed (funding rules para 347)' using errcode = '42501';
end; $$;
drop trigger if exists onboarding_record_immutable on public.college_onboarding_records;
create trigger onboarding_record_immutable
  before update or delete on public.college_onboarding_records
  for each row execute function public.tg_onboarding_record_immutable();

-- An issued agreement is frozen.
create or replace function public.tg_onboarding_agreement_frozen()
returns trigger language plpgsql set search_path = public as $$
begin
  if old.agreement_issued_at is not null and new.agreement_version = old.agreement_version
     and (new.agreement_content is distinct from old.agreement_content
          or new.agreement_hash is distinct from old.agreement_hash) then
    raise exception 'an issued apprenticeship agreement cannot be edited; issue a new version' using errcode = '42501';
  end if;
  return new;
end; $$;
drop trigger if exists onboarding_agreement_frozen on public.college_onboarding;
create trigger onboarding_agreement_frozen
  before update on public.college_onboarding
  for each row execute function public.tg_onboarding_agreement_frozen();

-- ── Paragraph map rows (ELE-2038 table) ─────────────────────────────────
insert into public.college_funding_rule_refs (rule_key, funding_year, paras, verified, note) values
  ('onb_eligibility', '2026/27', '29; 30.2–30.4; 34; 345.2; 353', true, null),
  ('onb_residency', '2026/27', '29.1; 354–355; Annex A (358–375); 353', true, null),
  ('onb_id_rtw', '2026/27', 'box after 34; 30.2; 354', true, null),
  ('onb_employer_eligibility', '2026/27', '24; 30.5; 69; 69.2; 71.2; box after 34; 353', true, null),
  ('onb_agreement', '2026/27', '70–72; 99.4; 346–347', true, null),
  ('onb_contract_for_services', '2026/27', '208; 208.1; box after 211', true,
   'The box after 211 says "complies with paragraph 180"; in the 2026/27 text para 180 is the summary of training, so 208 is cited.'),
  ('onb_eligibility', '2025/26', null, false, 'Onboarding wording was checked against the 2026/27 rules only.'),
  ('onb_residency', '2025/26', null, false, 'Onboarding wording was checked against the 2026/27 rules only.'),
  ('onb_id_rtw', '2025/26', null, false, 'Onboarding wording was checked against the 2026/27 rules only.'),
  ('onb_employer_eligibility', '2025/26', null, false, 'Onboarding wording was checked against the 2026/27 rules only.'),
  ('onb_agreement', '2025/26', null, false, 'Onboarding wording was checked against the 2026/27 rules only.'),
  ('onb_contract_for_services', '2025/26', null, false, 'Onboarding wording was checked against the 2026/27 rules only.'),
  ('onb_eligibility', '2024/25', null, false, 'Onboarding wording was checked against the 2026/27 rules only.'),
  ('onb_residency', '2024/25', null, false, 'Onboarding wording was checked against the 2026/27 rules only.'),
  ('onb_id_rtw', '2024/25', null, false, 'Onboarding wording was checked against the 2026/27 rules only.'),
  ('onb_employer_eligibility', '2024/25', null, false, 'Onboarding wording was checked against the 2026/27 rules only.'),
  ('onb_agreement', '2024/25', null, false, 'Onboarding wording was checked against the 2026/27 rules only.'),
  ('onb_contract_for_services', '2024/25', null, false, 'Onboarding wording was checked against the 2026/27 rules only.')
on conflict (rule_key, funding_year) do update
  set paras = excluded.paras, verified = excluded.verified, note = excluded.note;

-- ── Helpers ────────────────────────────────────────────────────────────
create or replace function public._onb_token()
returns text language sql volatile set search_path = public as $$
  select replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '');
$$;
revoke all on function public._onb_token() from public, anon, authenticated;

-- What the learner and employer see about the learner (their details, para 353).
create or replace function public._onb_details(p_student uuid)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'learner', s.name,
    'date_of_birth', s.date_of_birth,
    'college', (select name from colleges where id = s.college_id),
    'employer', (select company_name from college_employers where id = s.employer_id),
    'start_date', s.start_date,
    'expected_end_date', s.expected_end_date,
    'course', (select cc.name from college_courses cc
                where cc.id = coalesce(s.course_id, (select c.course_id from college_cohorts c where c.id = s.cohort_id))))
  from college_students s where s.id = p_student;
$$;
revoke all on function public._onb_details(uuid) from public, anon, authenticated;

create or replace function public._onb_date(p date)
returns text language sql immutable set search_path = public as $$
  select case when p is null then 'the planned end date' else to_char(p, 'FMDD FMMonth YYYY') end;
$$;

-- Residency categories (Annex A), as the sentence the learner confirms.
create or replace function public._onb_residency_sentence(p_category text)
returns text language sql immutable set search_path = public as $$
  select case p_category
    when 'uk_3yrs' then 'I am a UK national, or have the right of abode, and have been ordinarily resident in the UK and Islands or the British Overseas Territories for at least the 3 years before the first day of my apprenticeship (Annex A, para 358).'
    when 'non_uk_3yrs' then 'I am not a UK national. I have been ordinarily resident in the UK and Islands for at least the 3 years before the first day of my apprenticeship, not wholly or mainly to receive full-time education, and I have permission from the UK government to live in the UK that is not for education only (Annex A, para 361).'
    when 'euss' then 'I am an EEA or Swiss national with pre-settled or settled status under the EU Settlement Scheme, and have lived in the EEA, Switzerland, Gibraltar or the UK for at least the 3 years before the first day of my apprenticeship (Annex A, para 364).'
    when 'other' then 'My residency is covered by another part of Annex A, for example Irish citizenship, refugee status or being the family member of an eligible person. The college will check which part applies (Annex A, paras 366 to 375).'
  end;
$$;

-- The exact words confirmed, built here so the client cannot change them.
create or replace function public._onb_statement(p_item text, p_role text, d jsonb, a jsonb)
returns text
language plpgsql
immutable
set search_path = public
as $$
declare
  v_name text := trim(coalesce(a->>'signer_name', ''));
  v_learner text := coalesce(d->>'learner', 'the apprentice');
  v_college text := coalesce(d->>'college', 'the college');
  v_employer text := coalesce(nullif(trim(coalesce(a->>'signer_company', '')), ''), d->>'employer', 'the employer');
  v_end text := public._onb_date((d->>'expected_end_date')::date);
  v_dob text := coalesce(to_char(coalesce((a->>'date_of_birth')::date, (d->>'date_of_birth')::date), 'FMDD FMMonth YYYY'), null);
begin
  if p_item = 'eligibility' then
    return 'I, ' || v_name || coalesce(', born ' || v_dob, '') || ', confirm for my apprenticeship with ' || v_college
      || ' and my employer ' || coalesce(d->>'employer', 'my employer') || ':' || E'\n'
      || '1. I am not self-employed as a sole trader, I am not working under IR35, and I am not a shareholder, director or person of significant control without a separate line manager (funding rules 34.1 to 34.3).' || E'\n'
      || '2. I am not doing another apprenticeship or apprenticeship unit, or a government-funded Skills Bootcamp (34.4, 34.5).' || E'\n'
      || '3. I am not doing training funded by the Adult Skills Fund or a devolved authority that repeats this apprenticeship, conflicts with it or takes place in my working hours, other than a course I finish within four weeks (34.6).' || E'\n'
      || '4. I am not receiving other DfE funding for a further or higher education programme, including student finance, and I am not on a sandwich placement as part of a degree (34.7, 34.8).' || E'\n'
      || '5. I am not using a student loan to pay for this apprenticeship (30.3), and I have not already had training from anywhere else that this apprenticeship would repeat (30.4).' || E'\n'
      || '6. I know of nothing, such as a visa or a fixed-term contract ending, that would stop me finishing the apprenticeship and its assessment by ' || v_end || ' (30.2).' || E'\n'
      || '7. The information I have given is correct (345.2).';
  elsif p_item = 'residency' then
    return 'I, ' || v_name || coalesce(', born ' || v_dob, '') || ', confirm my residency for apprenticeship funding with ' || v_college || ':' || E'\n'
      || '1. ' || coalesce(public._onb_residency_sentence(a->>'category'), '') || E'\n'
      || '2. I have the right to work in England (para 354).' || E'\n'
      || '3. The information I have given is correct (345.2).';
  elsif p_item = 'id_upload' then
    return 'I, ' || v_name || ', have uploaded a copy of my ' || coalesce(a->>'document_type', 'identity document')
      || ' so ' || v_college || ' can check my identity and right to work (evidence box after para 34; para 354).';
  elsif p_item = 'id_seen' then
    return 'I, ' || v_name || ', for ' || v_college || ', have seen ' || v_learner || '''s identity documents: '
      || coalesce(a->>'document_type', 'identity document')
      || coalesce('. Their permission to stay runs to ' || to_char((a->>'permission_until')::date, 'FMDD FMMonth YYYY'), '')
      || '. They show ' || v_learner || ' has enough time to complete the apprenticeship, including assessment (30.2), and I have checked their ordinary residency status is in line with Annex A (evidence box after para 34).';
  elsif p_item = 'employer_eligibility' then
    return 'I, ' || v_name || coalesce(', ' || nullif(trim(coalesce(a->>'signer_title', '')), ''), '') || ' at ' || v_employer
      || ', confirm for ' || v_learner || '''s apprenticeship with ' || v_college || ':' || E'\n'
      || '1. ' || v_learner || ' is employed by ' || v_employer || ', or a connected company or charity, under a contract of employment that lasts long enough to complete the apprenticeship, including the end-point assessment, planned to end ' || v_end || ' (para 69; evidence box after para 34).' || E'\n'
      || '2. They are on the PAYE scheme declared in our apprenticeship service account, and we will keep that information up to date (69.2).' || E'\n'
      || '3. They will spend at least 50% of their working hours in England over the apprenticeship (30.5).' || E'\n'
      || '4. Their line manager, ' || coalesce(nullif(trim(coalesce(a->>'line_manager', '')), ''), 'named here') || ', is a separate, identifiable person who undertakes the role of the employer (24, 71.2).' || E'\n'
      || '5. The information I have given is correct (345.2).';
  elsif p_item = 'agreement' and p_role = 'employer' then
    return 'I, ' || v_name || coalesce(', ' || nullif(trim(coalesce(a->>'signer_title', '')), ''), '') || ', sign this apprenticeship agreement for '
      || v_employer || ', the employer. I have read it and its details are correct, and I am not also the apprentice (funding rules 71, 71.1, 72).';
  elsif p_item = 'agreement' then
    return 'I, ' || v_name || ', sign this apprenticeship agreement as the apprentice. I have read it and its details are correct (funding rules 71, 72).';
  elsif p_item = 'contract_for_services' then
    return 'I, ' || v_name || coalesce(', ' || nullif(trim(coalesce(a->>'signer_title', '')), ''), '') || ' at ' || v_employer
      || ', confirm that ' || v_employer || ' and ' || v_college || ' have a contract for services, reference '
      || coalesce(nullif(trim(coalesce(a->>'reference', '')), ''), 'not given')
      || ', signed and dated by both parties on ' || coalesce(to_char((a->>'signed_on')::date, 'FMDD FMMonth YYYY'), 'a date not given')
      || ', that covers ' || v_learner || '''s apprenticeship. It includes the funding band (or the total price if less) and the co-investment policy that applies, and a statement that the funding band will only be used directly on eligible costs (funding rules 208, 208.1).';
  end if;
  return null;
end;
$$;
revoke all on function public._onb_statement(text, text, jsonb, jsonb) from public, anon;

-- What para 72 still needs in the agreement.
create or replace function public._onb_agreement_missing(c jsonb)
returns text[]
language plpgsql
immutable
set search_path = public
as $$
declare m text[] := '{}';
begin
  if coalesce(trim(c->>'apprentice_name'), '') = '' then m := array_append(m, 'The apprentice''s name (72.1)'::text); end if;
  if coalesce(trim(c->>'place_of_work'), '') = '' then m := array_append(m, 'Their place of work (72.1)'::text); end if;
  if coalesce(trim(c->>'standard'), '') = '' or coalesce(trim(c->>'level'), '') = '' then
    m := array_append(m, 'The apprenticeship standard and level (72.2)'::text); end if;
  if (c->>'start_date') is null or (c->>'end_date') is null then
    m := array_append(m, 'Start and end dates of the apprenticeship, including the end-point assessment (72.3)'::text); end if;
  if (c->>'practical_start') is null or (c->>'practical_end') is null then
    m := array_append(m, 'Start and end dates of the practical period (72.4)'::text); end if;
  if (c->>'practical_start') is not null and (c->>'practical_end') is not null
     and (c->>'practical_end')::date <= (c->>'practical_start')::date then
    m := array_append(m, 'The practical period must end after it starts (72.4)'::text); end if;
  if coalesce((c->>'otj_hours')::numeric, 0) <= 0 then
    m := array_append(m, 'The off-the-job training hours (72.6)'::text); end if;
  return m;
end;
$$;

-- The agreement as issued: practical period duration (72.5) worked out from the dates.
create or replace function public._onb_agreement_complete(c jsonb)
returns jsonb language sql immutable set search_path = public as $$
  select c || jsonb_build_object('practical_duration_months',
    case when (c->>'practical_start') is not null and (c->>'practical_end') is not null then
      (extract(year from age((c->>'practical_end')::date, (c->>'practical_start')::date)) * 12
       + extract(month from age((c->>'practical_end')::date, (c->>'practical_start')::date)))::int end);
$$;

create or replace function public._onb_agreement_prefill(p_student uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  s college_students;
  v_course record;
  v_tp college_training_plans;
begin
  select * into s from college_students where id = p_student;
  select cc.name, cc.level, cc.otj_required_hours into v_course
    from college_courses cc
   where cc.id = coalesce(s.course_id, (select c.course_id from college_cohorts c where c.id = s.cohort_id));
  select * into v_tp from college_training_plans p
   where p.student_id = p_student and p.status in ('in_force', 'awaiting_signatures', 'draft')
   order by (p.status = 'in_force') desc, p.version desc limit 1;
  return jsonb_build_object(
    'apprentice_name', s.name,
    'place_of_work', null,
    'standard', coalesce(v_tp.content#>>'{programme,standard}', v_course.name),
    'level', coalesce(v_tp.content#>>'{programme,level}', v_course.level::text),
    'start_date', coalesce(v_tp.content#>>'{programme,start_date}', s.start_date::text),
    'end_date', v_tp.content#>>'{programme,end_date}',
    'practical_start', coalesce(v_tp.content#>>'{programme,practical_start}', s.start_date::text),
    'practical_end', coalesce(v_tp.content#>>'{programme,practical_end}', s.expected_end_date::text),
    'otj_hours', coalesce(v_tp.planned_otj_hours, s.otj_required_hours, v_course.otj_required_hours));
end;
$$;
revoke all on function public._onb_agreement_prefill(uuid) from public, anon, authenticated;

-- The checklist: one place that decides every item's status.
create or replace function public._onboarding_state(p_student uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  s college_students;
  o college_onboarding;
  sp college_learner_starting_points;
  v_year text;
  v_items jsonb := '[]'::jsonb;
  r_elig college_onboarding_records;
  r_res college_onboarding_records;
  r_seen college_onboarding_records;
  r_emp college_onboarding_records;
  r_cfs college_onboarding_records;
  r_ag_a college_onboarding_records;
  r_ag_e college_onboarding_records;
  v_uploads jsonb;
  v_tp college_training_plans;
  v_tp_wait college_training_plans;
  v_status text;
  v_ready boolean;
  v_today date := public._lon(now());
  v_sig jsonb;
begin
  select * into s from college_students where id = p_student;
  select * into o from college_onboarding where student_id = p_student;
  select * into sp from college_learner_starting_points where student_id = p_student;
  v_year := public._funding_year_for(s.start_date);

  if o.id is not null then
    select * into r_elig from college_onboarding_records where onboarding_id = o.id and item = 'eligibility' order by signed_at desc limit 1;
    select * into r_res from college_onboarding_records where onboarding_id = o.id and item = 'residency' order by signed_at desc limit 1;
    select * into r_seen from college_onboarding_records where onboarding_id = o.id and item = 'id_seen' order by signed_at desc limit 1;
    select * into r_emp from college_onboarding_records where onboarding_id = o.id and item = 'employer_eligibility' order by signed_at desc limit 1;
    select * into r_cfs from college_onboarding_records where onboarding_id = o.id and item = 'contract_for_services' order by signed_at desc limit 1;
    select * into r_ag_a from college_onboarding_records where onboarding_id = o.id and item = 'agreement' and role = 'apprentice' and version = o.agreement_version limit 1;
    select * into r_ag_e from college_onboarding_records where onboarding_id = o.id and item = 'agreement' and role = 'employer' and version = o.agreement_version limit 1;
    select coalesce(jsonb_agg(jsonb_build_object('id', u.id, 'document_type', u.answers->>'document_type', 'file_name', u.file_name,
                                                 'file_path', u.file_path, 'signed_at', u.signed_at, 'signer_name', u.signer_name)
                              order by u.signed_at desc), '[]'::jsonb)
      into v_uploads from college_onboarding_records u where u.onboarding_id = o.id and u.item = 'id_upload';
  else
    v_uploads := '[]'::jsonb;
  end if;

  -- 1 Eligibility self-declaration (learner)
  v_items := v_items || jsonb_build_object('key', 'eligibility', 'rule_key', 'onb_eligibility', 'who', 'apprentice',
    'title', 'Eligibility declaration',
    'status', case when r_elig.id is not null then 'done' else 'waiting' end,
    'waiting_on', case when r_elig.id is null then 'the apprentice' end,
    'record', case when r_elig.id is not null then jsonb_build_object('signer_name', r_elig.signer_name, 'role', r_elig.role,
                    'signed_at', r_elig.signed_at, 'method', r_elig.method, 'signature_hash', r_elig.signature_hash, 'statement', r_elig.statement) end);

  -- 2 Residency self-declaration (learner)
  v_items := v_items || jsonb_build_object('key', 'residency', 'rule_key', 'onb_residency', 'who', 'apprentice',
    'title', 'Residency and right to work declaration',
    'status', case when r_res.id is null then 'waiting'
                   when r_res.answers->>'category' = 'other' and r_seen.id is null then 'to_check'
                   else 'done' end,
    'waiting_on', case when r_res.id is null then 'the apprentice'
                       when r_res.answers->>'category' = 'other' and r_seen.id is null then 'the college' end,
    'detail', case when r_res.answers->>'category' = 'other' and r_seen.id is null
                   then 'Another Annex A category: the college checks which applies when it checks the ID.' end,
    'record', case when r_res.id is not null then jsonb_build_object('signer_name', r_res.signer_name, 'role', r_res.role,
                    'signed_at', r_res.signed_at, 'method', r_res.method, 'signature_hash', r_res.signature_hash,
                    'statement', r_res.statement, 'category', r_res.answers->>'category') end);

  -- 3 ID and right to work: the learner uploads, the college confirms it has seen them
  v_items := v_items || jsonb_build_object('key', 'id_rtw', 'rule_key', 'onb_id_rtw', 'who', 'provider',
    'title', 'ID and right to work checked',
    'status', case when r_seen.id is not null then 'done'
                   when jsonb_array_length(v_uploads) > 0 then 'to_check'
                   else 'waiting' end,
    'waiting_on', case when r_seen.id is not null then null
                       when jsonb_array_length(v_uploads) > 0 then 'the college'
                       else 'the apprentice to upload, or the college to see the originals' end,
    'uploads', v_uploads,
    'record', case when r_seen.id is not null then jsonb_build_object('signer_name', r_seen.signer_name, 'role', r_seen.role,
                    'signed_at', r_seen.signed_at, 'method', r_seen.method, 'signature_hash', r_seen.signature_hash,
                    'statement', r_seen.statement, 'document_type', r_seen.answers->>'document_type',
                    'permission_until', r_seen.answers->>'permission_until') end);

  -- 4 Employer confirms employment, PAYE, 50% in England, line manager
  v_items := v_items || jsonb_build_object('key', 'employer_eligibility', 'rule_key', 'onb_employer_eligibility', 'who', 'employer',
    'title', 'Employer confirms the employment',
    'status', case when r_emp.id is not null then 'done' else 'waiting' end,
    'waiting_on', case when r_emp.id is null then 'the employer' end,
    'record', case when r_emp.id is not null then jsonb_build_object('signer_name', r_emp.signer_name, 'role', r_emp.role,
                    'signer_title', r_emp.signer_title, 'signer_company', r_emp.signer_company,
                    'signed_at', r_emp.signed_at, 'method', r_emp.method, 'signature_hash', r_emp.signature_hash,
                    'statement', r_emp.statement, 'line_manager', r_emp.answers->>'line_manager') end);

  -- 5 Apprenticeship agreement, signed by the apprentice and the employer
  v_sig := '[]'::jsonb;
  if r_ag_a.id is not null then v_sig := v_sig || jsonb_build_object('role', 'apprentice', 'signer_name', r_ag_a.signer_name, 'signed_at', r_ag_a.signed_at, 'signature_hash', r_ag_a.signature_hash, 'method', r_ag_a.method); end if;
  if r_ag_e.id is not null then v_sig := v_sig || jsonb_build_object('role', 'employer', 'signer_name', r_ag_e.signer_name, 'signer_company', r_ag_e.signer_company, 'signed_at', r_ag_e.signed_at, 'signature_hash', r_ag_e.signature_hash, 'method', r_ag_e.method); end if;
  v_items := v_items || jsonb_build_object('key', 'agreement', 'rule_key', 'onb_agreement', 'who', 'both',
    'title', 'Apprenticeship agreement signed',
    'status', case when o.agreement_issued_at is null then 'to_do'
                   when r_ag_a.id is not null and r_ag_e.id is not null then 'done'
                   else 'waiting' end,
    'waiting_on', case when o.agreement_issued_at is null then 'the college to prepare it'
                       when r_ag_a.id is null and r_ag_e.id is null then 'the apprentice and the employer'
                       when r_ag_a.id is null then 'the apprentice'
                       when r_ag_e.id is null then 'the employer' end,
    'version', o.agreement_version, 'agreement_hash', o.agreement_hash, 'issued_at', o.agreement_issued_at,
    'signatures', v_sig);

  -- 6 Contract for services reference, confirmed by the employer
  v_items := v_items || jsonb_build_object('key', 'contract_for_services', 'rule_key', 'onb_contract_for_services', 'who', 'employer',
    'title', 'Contract for services confirmed',
    'status', case when r_cfs.id is not null then 'done' else 'waiting' end,
    'waiting_on', case when r_cfs.id is null then 'the employer' end,
    'record', case when r_cfs.id is not null then jsonb_build_object('signer_name', r_cfs.signer_name, 'role', r_cfs.role,
                    'signer_company', r_cfs.signer_company, 'signed_at', r_cfs.signed_at, 'method', r_cfs.method,
                    'signature_hash', r_cfs.signature_hash, 'statement', r_cfs.statement,
                    'reference', r_cfs.answers->>'reference', 'signed_on', r_cfs.answers->>'signed_on') end);

  -- 7 Initial assessment (Student 360: starting point)
  v_items := v_items || jsonb_build_object('key', 'initial_assessment', 'rule_key', 'initial_assessment', 'who', 'provider',
    'title', 'Initial assessment', 'link', 'starting-point',
    'status', case when sp.assessed_on is not null then 'done' else 'to_do' end,
    'waiting_on', case when sp.assessed_on is null then 'the college' end,
    'detail', case when sp.assessed_on is not null then 'Assessed ' || to_char(sp.assessed_on, 'DD Mon YYYY') end);

  -- 8 Prior learning (Student 360: skills scan and price, ELE-2042)
  v_items := v_items || jsonb_build_object('key', 'prior_learning', 'rule_key', 'prior_learning', 'who', 'provider',
    'title', 'Prior learning recognised', 'link', 'starting-point',
    'status', case when sp.rpl_decision is not null then 'done' else 'to_do' end,
    'waiting_on', case when sp.rpl_decision is null then 'the college' end,
    'detail', case when sp.rpl_decision = 'none' then 'No relevant prior learning found'
                   when sp.rpl_decision is not null then coalesce(round(sp.rpl_hours_reduced) || ' hours recognised', 'Recorded') end);

  -- 9 Training plan (ELE-2039). Broad content agreed before training; fully
  -- signed by day 42 (99.1, 99.1.1): an issued plan within 42 days counts.
  select * into v_tp from college_training_plans where student_id = p_student and status = 'in_force' order by version desc limit 1;
  select * into v_tp_wait from college_training_plans where student_id = p_student and status = 'awaiting_signatures' order by version desc limit 1;
  v_status := case
    when v_tp.id is not null then 'done'
    when v_tp_wait.id is not null and coalesce(s.start_date, v_today) + 42 >= v_today then 'due'
    when v_tp_wait.id is not null then 'waiting'
    else 'to_do' end;
  v_items := v_items || jsonb_build_object('key', 'training_plan', 'rule_key', 'training_plan', 'who', 'all',
    'title', 'Training plan', 'link', 'training-plan',
    'status', v_status,
    'waiting_on', case when v_status = 'to_do' then 'the college to build and issue it'
                       when v_status in ('due', 'waiting') then 'signatures' end,
    'detail', case when v_tp.id is not null then 'Version ' || v_tp.version || ' in force since ' || to_char(v_tp.in_force_from, 'DD Mon YYYY')
                   when v_tp_wait.id is not null then 'Version ' || v_tp_wait.version || ' issued; all three must sign by '
                        || to_char(coalesce(s.start_date, v_today) + 42, 'DD Mon YYYY') || ' (day 42, para 99.1.1)' end);

  -- Paragraphs for the learner's start year.
  select coalesce(jsonb_agg(x || jsonb_build_object(
           'para', case when (public._fr_ref(x->>'rule_key', v_year)->>'verified')::boolean then public._fr_ref(x->>'rule_key', v_year)->>'para' end,
           'para_note', public._fr_ref(x->>'rule_key', v_year)->>'note')), '[]'::jsonb)
    into v_items from jsonb_array_elements(v_items) x;

  v_ready := o.id is not null and not exists (
    select 1 from jsonb_array_elements(v_items) x where x->>'status' not in ('done', 'due'));

  return jsonb_build_object(
    'started', o.id is not null,
    'onboarding_id', o.id,
    'ready', v_ready,
    'ready_at', o.ready_at,
    'rules_year', v_year,
    'done', (select count(*) from jsonb_array_elements(v_items) x where x->>'status' in ('done', 'due')),
    'total', jsonb_array_length(v_items),
    'items', v_items);
end;
$$;
revoke all on function public._onboarding_state(uuid) from public, anon, authenticated;

-- File the onboarding record as evidence the pack already looks for.
create or replace function public._onb_file_evidence(
  p_student uuid, p_kind text, p_title text, p_type_seen text, p_signatures jsonb, p_structured jsonb,
  p_file_path text default null, p_file_name text default null, p_file_hash text default null)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  s college_students;
  v_prev uuid;
  v_id uuid;
begin
  select * into s from college_students where id = p_student;
  select id into v_prev from college_learner_evidence
   where student_id = p_student and kind = p_kind and superseded_at is null order by created_at desc limit 1;
  insert into college_learner_evidence (college_id, student_id, kind, title, file_path, file_name, file_hash,
                                        document_date, evidence_type_seen, signatures, notes, structured, supersedes_id,
                                        uploaded_by_name)
  values (s.college_id, p_student, p_kind, p_title, p_file_path, p_file_name, p_file_hash,
          public._lon(now()), p_type_seen, coalesce(p_signatures, '[]'::jsonb),
          'Recorded in Elec-Mate onboarding (ELE-2088).', coalesce(p_structured, '{}'::jsonb), v_prev, 'Elec-Mate onboarding')
  returning id into v_id;
  return v_id;
end;
$$;
revoke all on function public._onb_file_evidence(uuid, text, text, text, jsonb, jsonb, text, text, text) from public, anon, authenticated;

-- The one place a record is written.
create or replace function public._onb_record(
  p_onb uuid, p_item text, p_role text, p_answers jsonb, p_user uuid, p_method text, p_user_agent text,
  p_file_path text default null, p_file_name text default null, p_file_hash text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  o college_onboarding;
  s college_students;
  d jsonb;
  a jsonb := coalesce(p_answers, '{}'::jsonb);
  v_name text := trim(coalesce(p_answers->>'signer_name', ''));
  v_statement text;
  v_content text;
  v_prev text;
  v_at timestamptz := now();
  v_sig text;
  v_version int := 1;
  v_rec_id uuid;
  v_other college_onboarding_records;
  v_ev uuid;
  v_state jsonb;
begin
  select * into o from college_onboarding where id = p_onb for update;
  if o.id is null then raise exception 'onboarding not found' using errcode = 'P0002'; end if;
  select * into s from college_students where id = o.student_id;
  d := public._onb_details(o.student_id);

  if length(v_name) < 2 then return jsonb_build_object('error', 'Type your full name.'); end if;
  if p_item = 'residency' and public._onb_residency_sentence(a->>'category') is null then
    return jsonb_build_object('error', 'Choose which statement describes you.');
  end if;
  if p_item in ('employer_eligibility', 'agreement', 'contract_for_services') and p_role = 'employer'
     and length(trim(coalesce(a->>'signer_company', d->>'employer', ''))) < 2 then
    return jsonb_build_object('error', 'Give the employer''s name.');
  end if;
  if p_item = 'employer_eligibility' and length(trim(coalesce(a->>'line_manager', ''))) < 2 then
    return jsonb_build_object('error', 'Name the apprentice''s line manager (para 71.2).');
  end if;
  if p_item = 'employer_eligibility' and lower(trim(a->>'line_manager')) = lower(trim(coalesce(s.name, ''))) then
    return jsonb_build_object('error', 'The line manager must be a separate person from the apprentice (para 71.2).');
  end if;
  if p_item = 'contract_for_services' and (length(trim(coalesce(a->>'reference', ''))) < 2 or (a->>'signed_on') is null) then
    return jsonb_build_object('error', 'Give the contract reference and the date it was signed.');
  end if;
  if p_item = 'contract_for_services' and (a->>'signed_on')::date > public._lon(now()) then
    return jsonb_build_object('error', 'The date signed cannot be in the future.');
  end if;
  if p_item = 'id_upload' and coalesce(p_file_path, '') = '' then
    return jsonb_build_object('error', 'No file was uploaded.');
  end if;
  if p_item in ('id_upload', 'id_seen') and length(trim(coalesce(a->>'document_type', ''))) < 2 then
    return jsonb_build_object('error', 'Say which document it is.');
  end if;

  if p_item = 'agreement' then
    if o.agreement_issued_at is null then
      return jsonb_build_object('error', 'The college has not issued the apprenticeship agreement yet.');
    end if;
    v_version := o.agreement_version;
    -- 71.1: nobody signs as both the apprentice and the employer.
    select * into v_other from college_onboarding_records
     where onboarding_id = o.id and item = 'agreement' and version = v_version and role <> p_role limit 1;
    if v_other.id is not null and (lower(trim(v_other.signer_name)) = lower(v_name)
         or (p_user is not null and v_other.signer_user_id = p_user)) then
      return jsonb_build_object('error', 'The same person cannot sign as both the apprentice and the employer (para 71.1).');
    end if;
    if p_role = 'employer' and lower(v_name) = lower(trim(coalesce(s.name, ''))) then
      return jsonb_build_object('error', 'The same person cannot sign as both the apprentice and the employer (para 71.1).');
    end if;
  end if;

  if p_item <> 'id_upload' and exists (select 1 from college_onboarding_records
                                        where onboarding_id = o.id and item = p_item and role = p_role and version = v_version) then
    return jsonb_build_object('error', 'Already done.');
  end if;

  v_statement := public._onb_statement(p_item, p_role, d, a);
  if v_statement is null then return jsonb_build_object('error', 'Unknown step.'); end if;
  -- What was confirmed: the words, the answers, and for the agreement the frozen agreement.
  v_content := concat_ws('|', v_statement, (a - 'signer_name')::text, case when p_item = 'agreement' then o.agreement_hash end, p_file_hash);
  select signature_hash into v_prev from college_onboarding_records
   where onboarding_id = o.id order by signed_at desc, id desc limit 1;
  v_sig := public._tp_hash(concat_ws('|', public._tp_hash(v_content), p_item, p_role, v_version::text, v_name,
                                     coalesce(p_user::text, ''),
                                     to_char(v_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'), coalesce(v_prev, '')));

  v_rec_id := gen_random_uuid();

  -- File as evidence the pack already looks for (box after 34; 69; 70–72),
  -- first, so the permanent record can point at it.
  if p_item = 'eligibility' then
    v_ev := public._onb_file_evidence(o.student_id, 'eligibility_declaration', 'Eligibility declaration (onboarding)', null,
              jsonb_build_array(jsonb_build_object('role', 'apprentice', 'name', v_name, 'signed_on', public._lon(v_at))),
              jsonb_build_object('onboarding_record', v_rec_id, 'statement', v_statement, 'signature_hash', v_sig));
  elsif p_item = 'employer_eligibility' then
    v_ev := public._onb_file_evidence(o.student_id, 'employer_declaration', 'Employer declaration of employment (onboarding)', null,
              jsonb_build_array(jsonb_build_object('role', 'employer', 'name', v_name, 'signed_on', public._lon(v_at))),
              jsonb_build_object('onboarding_record', v_rec_id, 'statement', v_statement, 'signature_hash', v_sig));
  elsif p_item = 'id_seen' then
    select * into v_other from college_onboarding_records
     where onboarding_id = o.id and item = 'id_upload' order by signed_at desc limit 1;
    v_ev := public._onb_file_evidence(o.student_id, 'id_residency', 'Identity and residency checked (onboarding)', a->>'document_type',
              jsonb_build_array(jsonb_build_object('role', 'provider', 'name', v_name, 'signed_on', public._lon(v_at))),
              jsonb_build_object('onboarding_record', v_rec_id, 'statement', v_statement, 'signature_hash', v_sig,
                                 'residency_record', (select r.id from college_onboarding_records r
                                                       where r.onboarding_id = o.id and r.item = 'residency' order by r.signed_at desc limit 1)),
              v_other.file_path, v_other.file_name, v_other.file_hash);
  elsif p_item = 'agreement' and v_other.id is not null then
    v_ev := public._onb_file_evidence(o.student_id, 'apprenticeship_agreement', 'Apprenticeship agreement v' || v_version || ' (onboarding)', null,
              jsonb_build_array(
                jsonb_build_object('role', v_other.role, 'name', v_other.signer_name, 'signed_on', public._lon(v_other.signed_at)),
                jsonb_build_object('role', p_role, 'name', v_name, 'signed_on', public._lon(v_at))),
              jsonb_build_object('onboarding_id', o.id, 'agreement', o.agreement_content, 'agreement_hash', o.agreement_hash,
                                 'version', v_version, 'signature_hashes', jsonb_build_array(v_other.signature_hash, v_sig)));
  end if;

  insert into college_onboarding_records (id, onboarding_id, college_id, student_id, item, role, version, signer_name, signer_title,
                                          signer_company, signer_user_id, method, statement, answers, content_hash,
                                          prev_signature_hash, signature_hash, file_path, file_name, file_hash, evidence_id,
                                          user_agent, signed_at)
  values (v_rec_id, o.id, o.college_id, o.student_id, p_item, p_role, v_version, v_name,
          nullif(trim(coalesce(a->>'signer_title', '')), ''),
          case when p_role = 'employer' then coalesce(nullif(trim(coalesce(a->>'signer_company', '')), ''), d->>'employer')
               when p_role = 'provider' then d->>'college' end,
          p_user, p_method, v_statement, a - 'signer_name' - 'signer_title' - 'signer_company',
          public._tp_hash(v_content), v_prev, v_sig, p_file_path, left(p_file_name, 120), p_file_hash, v_ev,
          left(p_user_agent, 300), v_at);

  v_state := public._onboarding_state(o.student_id);
  if (v_state->>'ready')::boolean and o.ready_at is null then
    update college_onboarding set ready_at = v_at, updated_at = now() where id = o.id;
  end if;
  return jsonb_build_object('ok', true, 'signature_hash', v_sig, 'evidence_id', v_ev, 'ready', (v_state->>'ready')::boolean);
end;
$$;
revoke all on function public._onb_record(uuid, text, text, jsonb, uuid, text, text, text, text, text) from public, anon, authenticated;

-- ── Staff ──────────────────────────────────────────────────────────────
create or replace function public.start_onboarding(p_student uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  s college_students;
  o college_onboarding;
begin
  select * into s from college_students where id = p_student;
  if s.id is null then raise exception 'learner not found' using errcode = 'P0002'; end if;
  if not public.college_can('learners.edit', s.college_id, p_student) then
    raise exception 'you cannot edit this learner' using errcode = '42501';
  end if;
  insert into college_onboarding (college_id, student_id, agreement_content, created_by)
  values (s.college_id, p_student, public._onb_agreement_prefill(p_student), auth.uid())
  on conflict (student_id) do nothing;
  select * into o from college_onboarding where student_id = p_student;
  insert into college_onboarding_links (onboarding_id, role, token)
  values (o.id, 'apprentice', public._onb_token()), (o.id, 'employer', public._onb_token())
  on conflict (onboarding_id, role) do nothing;

  begin
    insert into user_notifications (user_id, type, title, message, link, metadata)
    select s.user_id, 'onboarding', 'Get ready to start your apprenticeship',
           'Your college has a few things for you to confirm and sign before you start.',
           '/start/' || l.token, jsonb_build_object('onboarding_id', o.id)
      from college_onboarding_links l
     where l.onboarding_id = o.id and l.role = 'apprentice' and s.user_id is not null
       and not exists (select 1 from user_notifications n where n.user_id = s.user_id and n.type = 'onboarding'
                         and n.metadata->>'onboarding_id' = o.id::text);
  exception when others then null;
  end;
  return jsonb_build_object('ok', true, 'id', o.id);
end;
$$;
revoke all on function public.start_onboarding(uuid) from public, anon;
grant execute on function public.start_onboarding(uuid) to authenticated;

create or replace function public.get_onboarding(p_student uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  s college_students;
  o college_onboarding;
  v_can boolean;
begin
  select * into s from college_students where id = p_student;
  if s.id is null or not public._review_staff_can(s.college_id) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  select * into o from college_onboarding where student_id = p_student;
  v_can := public.college_can('learners.edit', s.college_id, p_student);
  return public._onboarding_state(p_student) || jsonb_build_object(
    'can_edit', v_can,
    'learner', jsonb_build_object('id', s.id, 'name', s.name, 'has_account', s.user_id is not null,
                                  'employer', (select company_name from college_employers where id = s.employer_id)),
    'agreement', case when o.id is not null then jsonb_build_object(
        'content', o.agreement_content, 'version', o.agreement_version, 'hash', o.agreement_hash,
        'issued_at', o.agreement_issued_at, 'missing', to_jsonb(public._onb_agreement_missing(o.agreement_content))) end,
    'links', case when v_can and o.id is not null then coalesce((
        select jsonb_object_agg(l.role, l.token) from college_onboarding_links l
         where l.onboarding_id = o.id and l.revoked_at is null), '{}'::jsonb) end);
end;
$$;
revoke all on function public.get_onboarding(uuid) from public, anon;
grant execute on function public.get_onboarding(uuid) to authenticated;

-- Staff: save the agreement draft, or issue it (freezes it; a renewal is a new version).
create or replace function public.save_onboarding_agreement(p_student uuid, p_content jsonb, p_issue boolean default false)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  s college_students;
  o college_onboarding;
  v_missing text[];
  v_content jsonb;
  v_new_version boolean;
begin
  select * into s from college_students where id = p_student;
  if s.id is null or not public.college_can('learners.edit', s.college_id, p_student) then
    raise exception 'you cannot edit this learner' using errcode = '42501';
  end if;
  select * into o from college_onboarding where student_id = p_student for update;
  if o.id is null then raise exception 'start onboarding first' using errcode = '22023'; end if;
  if p_content is null or jsonb_typeof(p_content) <> 'object' then
    raise exception 'the agreement is missing' using errcode = '22023';
  end if;
  v_content := jsonb_build_object(
    'apprentice_name', nullif(trim(coalesce(p_content->>'apprentice_name', '')), ''),
    'place_of_work', nullif(trim(coalesce(p_content->>'place_of_work', '')), ''),
    'standard', nullif(trim(coalesce(p_content->>'standard', '')), ''),
    'level', nullif(trim(coalesce(p_content->>'level', '')), ''),
    'start_date', nullif(p_content->>'start_date', ''),
    'end_date', nullif(p_content->>'end_date', ''),
    'practical_start', nullif(p_content->>'practical_start', ''),
    'practical_end', nullif(p_content->>'practical_end', ''),
    'otj_hours', nullif(p_content->>'otj_hours', '')::numeric);
  v_new_version := o.agreement_issued_at is not null;
  if p_issue then
    v_missing := public._onb_agreement_missing(v_content);
    if coalesce(array_length(v_missing, 1), 0) > 0 then
      return jsonb_build_object('error', 'The agreement is missing what para 72 requires.', 'missing', to_jsonb(v_missing));
    end if;
    v_content := public._onb_agreement_complete(v_content);
    update college_onboarding
       set agreement_version = case when v_new_version then agreement_version + 1 else agreement_version end,
           agreement_content = v_content,
           agreement_hash = public._tp_hash(v_content::text),
           agreement_issued_at = now(), updated_at = now()
     where id = o.id returning * into o;
    return jsonb_build_object('ok', true, 'version', o.agreement_version, 'hash', o.agreement_hash);
  end if;
  if v_new_version then
    return jsonb_build_object('error', 'This agreement has been issued. Issue a new version to change it (para 347).');
  end if;
  update college_onboarding set agreement_content = v_content, updated_at = now() where id = o.id;
  return jsonb_build_object('ok', true, 'missing', to_jsonb(public._onb_agreement_missing(v_content)));
end;
$$;
revoke all on function public.save_onboarding_agreement(uuid, jsonb, boolean) from public, anon;
grant execute on function public.save_onboarding_agreement(uuid, jsonb, boolean) to authenticated;

-- Staff: confirm the ID was seen (box after 34). Files the identity and residency evidence.
create or replace function public.confirm_onboarding_id_seen(
  p_student uuid, p_document_type text, p_permission_until date default null, p_name text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  s college_students;
  o college_onboarding;
  v_name text;
begin
  select * into s from college_students where id = p_student;
  if s.id is null or not public.college_can('learners.edit', s.college_id, p_student) then
    raise exception 'you cannot edit this learner' using errcode = '42501';
  end if;
  select * into o from college_onboarding where student_id = p_student;
  if o.id is null then raise exception 'start onboarding first' using errcode = '22023'; end if;
  if p_permission_until is not null and s.expected_end_date is not null and p_permission_until < s.expected_end_date then
    return jsonb_build_object('error', 'Their permission to stay ends before the planned end, so they cannot be funded (para 30.2).');
  end if;
  v_name := coalesce(nullif(trim(coalesce(p_name, '')), ''), (select nullif(trim(full_name), '') from profiles where id = auth.uid()), 'College staff');
  return public._onb_record(o.id, 'id_seen', 'provider',
    jsonb_build_object('signer_name', v_name, 'document_type', trim(coalesce(p_document_type, '')),
                       'permission_until', p_permission_until),
    auth.uid(), 'signed_in', null);
end;
$$;
revoke all on function public.confirm_onboarding_id_seen(uuid, text, date, text) from public, anon;
grant execute on function public.confirm_onboarding_id_seen(uuid, text, date, text) to authenticated;

-- Staff: every learner at the college with where their onboarding is.
create or replace function public.list_college_onboarding(p_college uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public._review_staff_can(p_college) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return coalesce((
    select jsonb_agg(jsonb_build_object(
             'student_id', s.id, 'name', s.name, 'start_date', s.start_date, 'status', s.status,
             'cohort_id', s.cohort_id,
             'cohort', (select c.name from college_cohorts c where c.id = s.cohort_id),
             'employer', (select e.company_name from college_employers e where e.id = s.employer_id),
             'started', st->'started', 'ready', st->'ready', 'done', st->'done', 'total', st->'total',
             'waiting', (select coalesce(jsonb_agg(jsonb_build_object('key', x->>'key', 'title', x->>'title', 'waiting_on', x->>'waiting_on')), '[]'::jsonb)
                           from jsonb_array_elements(st->'items') x where x->>'status' not in ('done', 'due')))
           order by (st->>'started')::boolean desc, (st->>'ready')::boolean, s.start_date nulls last, s.name)
      from college_students s
      cross join lateral (select public._onboarding_state(s.id) st) z
     where s.college_id = p_college
       and lower(coalesce(s.status, 'active')) not in ('withdrawn', 'completed', 'archived')), '[]'::jsonb);
end;
$$;
revoke all on function public.list_college_onboarding(uuid) from public, anon;
grant execute on function public.list_college_onboarding(uuid) to authenticated;

-- Anyone allowed to see the onboarding can check nothing has been altered.
create or replace function public.verify_onboarding(p_student uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  o college_onboarding;
  g record;
  v_prev text := null;
  v_ok boolean := true;
  v_n int := 0;
begin
  select * into o from college_onboarding where student_id = p_student;
  if o.id is null then return jsonb_build_object('records', 0, 'signatures_intact', true); end if;
  if not public._review_staff_can(o.college_id) then raise exception 'not authorised' using errcode = '42501'; end if;
  for g in select * from college_onboarding_records where onboarding_id = o.id order by signed_at, id loop
    v_n := v_n + 1;
    if coalesce(g.prev_signature_hash, '') <> coalesce(v_prev, '')
       or g.signature_hash <> public._tp_hash(concat_ws('|', g.content_hash, g.item, g.role, g.version::text, g.signer_name,
                                 coalesce(g.signer_user_id::text, ''),
                                 to_char(g.signed_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'), coalesce(v_prev, ''))) then
      v_ok := false;
    end if;
    v_prev := g.signature_hash;
  end loop;
  return jsonb_build_object('records', v_n, 'signatures_intact', v_ok,
                            'agreement_unchanged', o.agreement_hash is null or o.agreement_hash = public._tp_hash(o.agreement_content::text));
end;
$$;
revoke all on function public.verify_onboarding(uuid) from public, anon;
grant execute on function public.verify_onboarding(uuid) to authenticated;

-- ── Public: the personal links ──────────────────────────────────────────
create or replace function public.get_onboarding_for_link(p_token text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  l college_onboarding_links;
  o college_onboarding;
  s college_students;
  d jsonb;
  st jsonb;
  v_steps jsonb;
begin
  select * into l from college_onboarding_links where token = p_token and revoked_at is null;
  if l.id is null then return jsonb_build_object('error', 'This link is not valid.'); end if;
  select * into o from college_onboarding where id = l.onboarding_id;
  select * into s from college_students where id = o.student_id;
  d := public._onb_details(o.student_id);
  st := public._onboarding_state(o.student_id);
  -- Only what this person does, and whether it is done. Never the other party's answers.
  select coalesce(jsonb_agg(jsonb_build_object(
           'key', x->>'key', 'title', x->>'title', 'para', x->>'para',
           'done', case
             when x->>'key' = 'agreement' then exists (select 1 from jsonb_array_elements(x->'signatures') g where g->>'role' = l.role)
             when x->>'key' = 'id_rtw' then jsonb_array_length(x->'uploads') > 0 or x->>'status' = 'done'
             else x->>'status' in ('done', 'to_check') end,
           'open', x->>'key' <> 'agreement' or o.agreement_issued_at is not null)), '[]'::jsonb)
    into v_steps
    from jsonb_array_elements(st->'items') x
   where (l.role = 'apprentice' and x->>'key' in ('eligibility', 'residency', 'id_rtw', 'agreement'))
      or (l.role = 'employer' and x->>'key' in ('employer_eligibility', 'agreement', 'contract_for_services'));
  return jsonb_build_object(
    'role', l.role,
    'details', d - 'date_of_birth' || jsonb_build_object('has_date_of_birth', s.date_of_birth is not null),
    'needs_sign_in', l.role = 'apprentice' and s.user_id is not null,
    'signed_in_as_learner', s.user_id is not null and s.user_id = auth.uid(),
    'steps', v_steps,
    'agreement', case when o.agreement_issued_at is not null then jsonb_build_object(
        'content', o.agreement_content, 'version', o.agreement_version, 'hash', o.agreement_hash, 'issued_at', o.agreement_issued_at) end,
    'statements', jsonb_build_object(
        'eligibility', public._onb_statement('eligibility', 'apprentice', d, jsonb_build_object('signer_name', '[your name]')),
        'residency_intro', 'Choose the statement that describes you (Annex A).',
        'residency', jsonb_build_object(
            'uk_3yrs', public._onb_residency_sentence('uk_3yrs'),
            'non_uk_3yrs', public._onb_residency_sentence('non_uk_3yrs'),
            'euss', public._onb_residency_sentence('euss'),
            'other', public._onb_residency_sentence('other')),
        'employer_eligibility', public._onb_statement('employer_eligibility', 'employer', d,
            jsonb_build_object('signer_name', '[your name]', 'line_manager', '[line manager]')),
        'agreement', public._onb_statement('agreement', l.role, d, jsonb_build_object('signer_name', '[your name]')),
        'contract_for_services', public._onb_statement('contract_for_services', 'employer', d,
            jsonb_build_object('signer_name', '[your name]', 'reference', '[reference]'))),
    'ready', (st->>'ready')::boolean);
end;
$$;
revoke all on function public.get_onboarding_for_link(text) from public;
grant execute on function public.get_onboarding_for_link(text) to anon, authenticated;

-- The exact statement a person is about to confirm, with their answers filled in.
create or replace function public.preview_onboarding_statement(p_token text, p_item text, p_answers jsonb)
returns text
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  l college_onboarding_links;
  o college_onboarding;
begin
  select * into l from college_onboarding_links where token = p_token and revoked_at is null;
  if l.id is null then return null; end if;
  select * into o from college_onboarding where id = l.onboarding_id;
  return public._onb_statement(p_item, l.role, public._onb_details(o.student_id), coalesce(p_answers, '{}'::jsonb));
end;
$$;
revoke all on function public.preview_onboarding_statement(text, text, jsonb) from public;
grant execute on function public.preview_onboarding_statement(text, text, jsonb) to anon, authenticated;

create or replace function public.submit_onboarding_step(p_token text, p_item text, p_answers jsonb, p_user_agent text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  l college_onboarding_links;
  o college_onboarding;
  s college_students;
begin
  select * into l from college_onboarding_links where token = p_token and revoked_at is null;
  if l.id is null then return jsonb_build_object('error', 'This link is not valid.'); end if;
  select * into o from college_onboarding where id = l.onboarding_id;
  select * into s from college_students where id = o.student_id;
  if not ((l.role = 'apprentice' and p_item in ('eligibility', 'residency', 'agreement'))
          or (l.role = 'employer' and p_item in ('employer_eligibility', 'agreement', 'contract_for_services'))) then
    return jsonb_build_object('error', 'This step is not yours to complete.');
  end if;
  if l.role = 'apprentice' and s.user_id is not null and s.user_id is distinct from auth.uid() then
    return jsonb_build_object('error', 'Sign in to Elec-Mate as ' || s.name || ' to continue.', 'needs_sign_in', true);
  end if;
  return public._onb_record(o.id, p_item, l.role, p_answers,
                            case when l.role = 'apprentice' then auth.uid() end,
                            case when l.role = 'apprentice' and auth.uid() is not null then 'signed_in' else 'personal_link' end,
                            p_user_agent);
end;
$$;
revoke all on function public.submit_onboarding_step(text, text, jsonb, text) from public;
grant execute on function public.submit_onboarding_step(text, text, jsonb, text) to anon, authenticated;

-- Edge function only (service role): where an upload goes, and recording it.
create or replace function public.onboarding_upload_target(p_token text, p_user uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  l college_onboarding_links;
  o college_onboarding;
  s college_students;
begin
  select * into l from college_onboarding_links where token = p_token and revoked_at is null and role = 'apprentice';
  if l.id is null then return jsonb_build_object('error', 'This link is not valid.'); end if;
  select * into o from college_onboarding where id = l.onboarding_id;
  select * into s from college_students where id = o.student_id;
  if s.user_id is not null and s.user_id is distinct from p_user then
    return jsonb_build_object('error', 'Sign in to Elec-Mate as ' || s.name || ' to upload.', 'needs_sign_in', true);
  end if;
  if (select count(*) from college_onboarding_records where onboarding_id = o.id and item = 'id_upload') >= 6 then
    return jsonb_build_object('error', 'Six files have been uploaded already. Ask the college if you need to add more.');
  end if;
  return jsonb_build_object('ok', true, 'folder', o.college_id || '/onboarding/' || o.student_id);
end;
$$;
revoke all on function public.onboarding_upload_target(text, uuid) from public, anon, authenticated;
grant execute on function public.onboarding_upload_target(text, uuid) to service_role;

create or replace function public.record_onboarding_upload(
  p_token text, p_user uuid, p_signer_name text, p_document_type text, p_path text, p_file_name text, p_file_hash text, p_user_agent text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  l college_onboarding_links;
  o college_onboarding;
  v_t jsonb;
begin
  v_t := public.onboarding_upload_target(p_token, p_user);
  if v_t ? 'error' then return v_t; end if;
  select * into l from college_onboarding_links where token = p_token;
  select * into o from college_onboarding where id = l.onboarding_id;
  if p_path not like (v_t->>'folder') || '/%' then
    return jsonb_build_object('error', 'Upload path does not match.');
  end if;
  return public._onb_record(o.id, 'id_upload', 'apprentice',
    jsonb_build_object('signer_name', p_signer_name, 'document_type', p_document_type),
    p_user, case when p_user is not null then 'signed_in' else 'personal_link' end, p_user_agent,
    p_path, p_file_name, p_file_hash);
end;
$$;
revoke all on function public.record_onboarding_upload(text, uuid, text, text, text, text, text, text) from public, anon, authenticated;
grant execute on function public.record_onboarding_upload(text, uuid, text, text, text, text, text, text) to service_role;
