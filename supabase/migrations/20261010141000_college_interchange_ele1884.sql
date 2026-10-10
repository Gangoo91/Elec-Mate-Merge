-- ELE-1884 College interchange: per-college exports, a read API behind scoped
-- keys, and ILR identity fields on the learner record. ADDITIVE ONLY.
--
-- 1. colleges.ukprn                       (ILR LearningProvider.UKPRN)
-- 2. college_student_ilr                  ILR fields a learner record lacks
-- 3. college_api_keys                     hashed at rest, per college, revocable
-- 4. college_data_access_log              every export and API call
-- 5. _college_interchange()               the one row shape behind CSV, JSON and the API
-- 6. college_export()                     signed-in staff export (capability 'exports')
-- 7. college_api_key_mint / _revoke / _list / college_data_access_recent
-- 8. save_learner_ilr()                   writes the ILR fields atomically
--
-- ILR field names, lengths and codes follow the ILR specification 2026 to 2027
-- (v1, DfE "Submit learner data" guidance):
--   https://guidance.submit-learner-data.service.gov.uk/26-27/ilr/overview
--   https://guidance.submit-learner-data.service.gov.uk/26-27/ilr/summaryofchanges
-- 2026/27 removed PHours and OTJActHours; off-the-job hours now go in the new
-- HRSRecord entity (HRS1 planned, HRS3 actual, HRS4 planned reduction for prior
-- learning). AgreemId is new on LearnerEmploymentStatus; EPAOrgID is now 8 chars.
-- This is NOT an ILR submission and NOT validated against the ILR XSD: it is a
-- flat export an MIS team can import into their own ILR return.

-- 1 ───────────────────────────────────────────────────────────────────────
alter table public.colleges add column if not exists ukprn text;
do $$ begin
  alter table public.colleges add constraint colleges_ukprn_fmt
    check (ukprn is null or ukprn ~ '^[1-9][0-9]{7}$');
exception when duplicate_object then null; end $$;
comment on column public.colleges.ukprn is
  'ILR LearningProvider.UKPRN: 8 digits, 10000000-99999999 (ILR 2026/27). Set by a college admin.';

-- 2 ───────────────────────────────────────────────────────────────────────
create table if not exists public.college_student_ilr (
  student_id uuid primary key references public.college_students(id) on delete cascade,
  college_id uuid not null references public.colleges(id) on delete cascade,
  learn_ref_number text check (learn_ref_number is null or learn_ref_number ~ '^[A-Za-z0-9 ]{1,12}$'),
  family_name text check (family_name is null or length(family_name) <= 100),
  given_names text check (given_names is null or length(given_names) <= 100),
  sex text check (sex is null or sex in ('F', 'M')),
  ethnicity smallint check (ethnicity is null or ethnicity between 31 and 47 or ethnicity in (98, 99)),
  lldd_health_prob smallint check (lldd_health_prob is null or lldd_health_prob in (1, 2, 9)),
  prior_level smallint check (prior_level is null or prior_level between 1 and 10 or prior_level in (97, 98, 99)),
  postcode_prior text check (postcode_prior is null or length(postcode_prior) <= 8),
  postcode text check (postcode is null or length(postcode) <= 8),
  learn_aim_ref text check (learn_aim_ref is null or learn_aim_ref ~ '^[A-Za-z0-9]{1,8}$'),
  aim_type smallint check (aim_type is null or aim_type in (1, 3, 4, 5)),
  prog_type smallint check (prog_type is null or prog_type in (25, 30, 31, 32, 33, 34)),
  std_code integer check (std_code is null or std_code between 1 and 99999),
  fund_model smallint check (fund_model is null or fund_model in (11, 25, 35, 36, 37, 38, 39, 81, 82, 99)),
  orig_learn_start_date date,
  comp_status smallint check (comp_status is null or comp_status in (1, 2, 3, 6)),
  outcome smallint check (outcome is null or outcome in (1, 2, 3, 8)),
  withdraw_reason smallint check (withdraw_reason is null or withdraw_reason in (2, 3, 7, 29, 40, 41, 42, 43, 44, 45, 46, 47, 48, 97, 98)),
  ach_date date,
  del_loc_postcode text check (del_loc_postcode is null or length(del_loc_postcode) <= 8),
  epa_org_id text check (epa_org_id is null or epa_org_id ~ '^[A-Za-z0-9]{1,8}$'),
  emp_stat smallint check (emp_stat is null or emp_stat in (10, 11, 12, 98)),
  emp_id integer check (emp_id is null or emp_id between 100000000 and 999999999),
  agreem_id text check (agreem_id is null or agreem_id ~ '^[A-Za-z0-9]{1,7}$'),
  hrs_planned_reduction integer check (hrs_planned_reduction is null or hrs_planned_reduction between 0 and 9999),
  tnp1_price integer check (tnp1_price is null or tnp1_price between 0 and 999999),
  tnp2_price integer check (tnp2_price is null or tnp2_price between 0 and 999999),
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create unique index if not exists college_student_ilr_learnref_uq
  on public.college_student_ilr (college_id, upper(learn_ref_number)) where learn_ref_number is not null;
alter table public.college_student_ilr enable row level security;
drop policy if exists "College staff read ILR fields" on public.college_student_ilr;
create policy "College staff read ILR fields" on public.college_student_ilr
  for select to authenticated using (public.college_can('learners.view_all', college_id));
-- Writes go through save_learner_ilr() only.
comment on table public.college_student_ilr is
  '[COLLEGE] ILR 2026/27 fields a learner record lacks (LearnRefNumber, Sex, Ethnicity, LLDDHealthProb, PriorLevel, LearnAimRef, ProgType, StdCode, FundModel, CompStatus, Outcome, WithdrawReason, EPAOrgID, EmpStat, EmpId, AgreemId, HRS4, TNP1/TNP2). ULN, DateOfBirth, NINumber, LearnStartDate, LearnPlanEndDate, LearnActEndDate and planned OTJ hours stay on college_students. Scope: one row per college_students row. Used by: Data and API page, college_export ilr dataset, college-data-api. Rule: write via save_learner_ilr(); this is an export for the MIS, never an ILR submission.';

-- 3 ───────────────────────────────────────────────────────────────────────
create table if not exists public.college_api_keys (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  label text not null check (length(trim(label)) between 2 and 80),
  key_prefix text not null,
  key_hash text not null unique,
  scopes text[] not null check (
    cardinality(scopes) > 0
    and scopes <@ array['learners', 'hours', 'decisions', 'attendance', 'reviews', 'ilr']::text[]),
  rate_limit_per_minute integer not null default 60 check (rate_limit_per_minute between 1 and 600),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  last_used_at timestamptz,
  expires_at timestamptz,
  revoked_at timestamptz,
  revoked_by uuid references auth.users(id) on delete set null
);
create index if not exists college_api_keys_college_idx on public.college_api_keys (college_id, created_at desc);
alter table public.college_api_keys enable row level security;
-- No client policies: the hash never leaves the database. Listing, minting and
-- revoking go through the security-definer functions below.
comment on table public.college_api_keys is
  '[COLLEGE] Read-only API keys a college admin mints for their MIS. Only a SHA-256 hash and a short display prefix are stored; the key is shown once at minting. Scope: one college per key, dataset scopes, per-minute rate limit. Used by: Data and API page, college-data-api edge function. Rule: never select key_hash to a client; revoke, never delete.';

-- 4 ───────────────────────────────────────────────────────────────────────
create table if not exists public.college_data_access_log (
  id bigint generated always as identity primary key,
  college_id uuid not null references public.colleges(id) on delete cascade,
  key_id uuid references public.college_api_keys(id) on delete set null,
  actor_id uuid references auth.users(id) on delete set null,
  channel text not null check (channel in ('api', 'export')),
  dataset text,
  status_code integer not null,
  row_count integer,
  detail text,
  ip_hash text,
  created_at timestamptz not null default now()
);
create index if not exists college_data_access_log_key_idx
  on public.college_data_access_log (key_id, created_at desc) where key_id is not null;
create index if not exists college_data_access_log_college_idx
  on public.college_data_access_log (college_id, created_at desc);
alter table public.college_data_access_log enable row level security;
drop policy if exists "College admins read the data access log" on public.college_data_access_log;
create policy "College admins read the data access log" on public.college_data_access_log
  for select to authenticated using (public.college_can('settings.manage', college_id));
comment on table public.college_data_access_log is
  '[COLLEGE] Audit trail of every data export and API call: who or which key, dataset, status, rows. Never holds a key or a raw IP (ip_hash is a salted SHA-256). Scope: per college. Used by: Data and API page, college-data-api rate limiting. Rule: append-only; written by college_export() and the edge function.';

-- 5 ───────────────────────────────────────────────────────────────────────
-- The one shape. json (not jsonb) keeps the documented column order.
create or replace function public._college_interchange(
  p_college uuid, p_dataset text, p_since timestamptz default null,
  p_limit integer default 1000, p_offset integer default 0)
returns json
language plpgsql stable security definer set search_path to 'public'
as $$
declare
  v_limit int := least(greatest(coalesce(p_limit, 1000), 1), 50000);
  v_offset int := greatest(coalesce(p_offset, 0), 0);
  v_out json;
begin
  if p_college is null then raise exception 'college required' using errcode = '22023'; end if;

  if p_dataset = 'learners' then
    select coalesce(json_agg(r order by r_sort, r_id), '[]'::json) into v_out from (
      select cs.created_at as r_sort, cs.id as r_id, json_build_object(
        'learner_id', cs.id,
        'learner_reference', ilr.learn_ref_number,
        'uln', cs.uln,
        'name', cs.name,
        'email', cs.email,
        'date_of_birth', cs.date_of_birth,
        'status', cs.status,
        'cohort_code', co.code,
        'cohort_name', co.name,
        'course_code', cc.code,
        'course_name', cc.name,
        'qualification_code', q.code,
        'start_date', cs.start_date,
        'planned_end_date', cs.expected_end_date,
        'actual_end_date', cs.learning_actual_end_date,
        'employer_name', ce.company_name,
        'otj_required_hours', cs.otj_required_hours,
        'otj_verified_hours', round(coalesce(otj.minutes, 0) / 60.0, 1),
        -- Learning measured in the app, kept SEPARATE from verified hours: whether
        -- it counts as eligible off-the-job time is a college decision (ELE-2037).
        'otj_app_learning_hours', case when cs.user_id is not null
                                   then (public._otj_summary_core(cs.user_id)->>'app_learning_hours')::numeric end,
        'risk_level', cs.risk_level,
        'updated_at', cs.updated_at) as r
      from college_students cs
      left join college_student_ilr ilr on ilr.student_id = cs.id
      left join college_cohorts co on co.id = cs.cohort_id
      left join college_courses cc on cc.id = coalesce(cs.course_id, co.course_id)
      left join qualifications q on q.id = cc.qualification_id
      left join college_employers ce on ce.id = cs.employer_id
      left join lateral (
        select sum(o.duration_minutes) as minutes from college_otj_entries o
         where cs.user_id is not null and o.student_id = cs.user_id
           and o.verification_status in ('verified', 'verified_by_employer')) otj on true
      where cs.college_id = p_college
        and (p_since is null or cs.updated_at >= p_since)
      order by cs.created_at, cs.id
      limit v_limit offset v_offset) x;

  elsif p_dataset = 'hours' then
    select coalesce(json_agg(r order by r_sort, r_id), '[]'::json) into v_out from (
      select o.activity_date as r_sort, o.id as r_id, json_build_object(
        'entry_id', o.id,
        'learner_id', cs.id,
        'uln', cs.uln,
        'activity_date', o.activity_date,
        'minutes', o.duration_minutes,
        'hours', round(o.duration_minutes / 60.0, 2),
        'activity_type', o.activity_type,
        'title', o.title,
        'source', o.source_kind,
        'verification_status', o.verification_status,
        'verified_at', o.verified_at,
        'attested_by_name', o.attested_by_name,
        'in_working_hours', o.in_working_hours,
        'iqa_verdict', o.iqa_verdict,
        'created_at', o.created_at,
        'updated_at', o.updated_at) as r
      from college_otj_entries o
      join college_students cs on cs.user_id = o.student_id and cs.college_id = p_college
      where (p_since is null or o.updated_at >= p_since)
      order by o.activity_date, o.id
      limit v_limit offset v_offset) x;

  elsif p_dataset = 'decisions' then
    select coalesce(json_agg(r order by r_sort, r_id), '[]'::json) into v_out from (
      select d.decided_at as r_sort, d.id as r_id, json_build_object(
        'decision_id', d.id,
        'learner_id', cs.id,
        'uln', cs.uln,
        'qualification_code', d.qualification_code,
        'unit_code', d.unit_code,
        'ac_code', d.ac_code,
        'decision', d.decision,
        'method', d.method,
        'assessor_name', d.assessor_name,
        'decided_at', d.decided_at,
        'evidence_count', coalesce(cardinality(d.evidence_item_ids), 0),
        'iqa_verdict', d.iqa_verdict,
        'iqa_at', d.iqa_at,
        'superseded_at', d.superseded_at,
        'content_hash', d.content_hash) as r
      from portfolio_assessment_decisions d
      join college_students cs on cs.user_id = d.learner_id and cs.college_id = p_college
      where (p_since is null or greatest(d.created_at, coalesce(d.iqa_at, d.created_at),
                                         coalesce(d.superseded_at, d.created_at)) >= p_since)
      order by d.decided_at, d.id
      limit v_limit offset v_offset) x;

  elsif p_dataset = 'attendance' then
    select coalesce(json_agg(r order by r_sort, r_id), '[]'::json) into v_out from (
      select a.date as r_sort, a.id as r_id, json_build_object(
        'attendance_id', a.id,
        'learner_id', cs.id,
        'uln', cs.uln,
        'date', a.date,
        'session', a.session,
        'status', a.status,
        'cohort_code', co.code,
        'recorded_at', a.created_at) as r
      from college_attendance a
      join college_students cs on cs.id = a.student_id and cs.college_id = p_college
      left join college_cohorts co on co.id = a.cohort_id
      where (p_since is null or a.created_at >= p_since)
      order by a.date, a.id
      limit v_limit offset v_offset) x;

  elsif p_dataset = 'reviews' then
    select coalesce(json_agg(r order by r_sort, r_id), '[]'::json) into v_out from (
      select coalesce(t.held_on::timestamptz, t.scheduled_at, t.created_at) as r_sort, t.id as r_id, json_build_object(
        'review_id', t.id,
        'learner_id', cs.id,
        'uln', cs.uln,
        'status', t.status,
        'scheduled_at', t.scheduled_at,
        'held_on', t.held_on,
        'completed_at', t.completed_at,
        'mode', t.mode,
        'employer_attendance', t.employer_attendance,
        'employer_contact_name', t.employer_contact_name,
        'signed_and_locked_at', t.locked_at,
        'content_hash', t.content_hash,
        'updated_at', t.updated_at) as r
      from college_tripartite_reviews t
      join college_students cs on cs.id = t.student_id
      where t.college_id = p_college
        and (p_since is null or t.updated_at >= p_since)
      order by coalesce(t.held_on::timestamptz, t.scheduled_at, t.created_at), t.id
      limit v_limit offset v_offset) x;

  elsif p_dataset = 'ilr' then
    -- Column names are the ILR 2026/27 XML element names, so an MIS team can
    -- map them one to one. HRS1/HRS3 replace PHours/OTJActHours from 2026/27.
    select coalesce(json_agg(r order by r_sort, r_id), '[]'::json) into v_out from (
      select cs.created_at as r_sort, cs.id as r_id, json_build_object(
        'UKPRN', c.ukprn,
        'LearnRefNumber', ilr.learn_ref_number,
        'ULN', cs.uln,
        -- Split from the display name only when the ILR names are not set;
        -- a trailing "(...)" note is not part of a legal name.
        'FamilyName', coalesce(ilr.family_name,
                        nullif(regexp_replace(nm.clean, '^.*\s', ''), '')),
        'GivenNames', coalesce(ilr.given_names,
                        nullif(trim(regexp_replace(nm.clean, '\s*\S+$', '')), '')),
        'DateOfBirth', cs.date_of_birth,
        'Sex', ilr.sex,
        'Ethnicity', ilr.ethnicity,
        'LLDDHealthProb', ilr.lldd_health_prob,
        'NINumber', upper(replace(cs.ni_number, ' ', '')),
        'PriorLevel', ilr.prior_level,
        'PostcodePrior', upper(ilr.postcode_prior),
        'Postcode', upper(ilr.postcode),
        'LearnAimRef', ilr.learn_aim_ref,
        'AimType', ilr.aim_type,
        'ProgType', ilr.prog_type,
        'StdCode', ilr.std_code,
        'FundModel', ilr.fund_model,
        'LearnStartDate', cs.start_date,
        'OrigLearnStartDate', ilr.orig_learn_start_date,
        'LearnPlanEndDate', cs.expected_end_date,
        'LearnActEndDate', cs.learning_actual_end_date,
        'CompStatus', ilr.comp_status,
        'Outcome', ilr.outcome,
        'WithdrawReason', ilr.withdraw_reason,
        'AchDate', ilr.ach_date,
        'DelLocPostCode', upper(ilr.del_loc_postcode),
        'EPAOrgID', ilr.epa_org_id,
        'EmpStat', ilr.emp_stat,
        'EmpId', ilr.emp_id,
        'AgreemId', ilr.agreem_id,
        'HRS1_PlannedOTJHours', round(cs.otj_required_hours)::int,
        'HRS3_ActualOTJHours', round(coalesce(otj.minutes, 0) / 60.0)::int,
        'HRS4_PlannedReductionHours', ilr.hrs_planned_reduction,
        'TNP1', ilr.tnp1_price,
        'TNP2', ilr.tnp2_price,
        -- Not ILR fields: the evidence behind HRS3. HRS3 is verified and
        -- employer-attested entries only; app learning is never folded in.
        'elecmate_verified_otj_hours', round(coalesce(otj.minutes, 0) / 60.0, 1),
        'elecmate_app_learning_hours', case when cs.user_id is not null
                                        then (public._otj_summary_core(cs.user_id)->>'app_learning_hours')::numeric end,
        'elecmate_learner_id', cs.id) as r
      from college_students cs
      join colleges c on c.id = cs.college_id
      left join college_student_ilr ilr on ilr.student_id = cs.id
      cross join lateral (select trim(regexp_replace(coalesce(cs.name, ''), '\s*\([^)]*\)\s*$', '')) as clean) nm
      left join lateral (
        select sum(o.duration_minutes) as minutes from college_otj_entries o
         where cs.user_id is not null and o.student_id = cs.user_id
           and o.verification_status in ('verified', 'verified_by_employer')) otj on true
      where cs.college_id = p_college
        and (p_since is null or greatest(cs.updated_at, coalesce(ilr.updated_at, cs.updated_at)) >= p_since)
      order by cs.created_at, cs.id
      limit v_limit offset v_offset) x;

  else
    raise exception 'unknown dataset %', p_dataset using errcode = '22023';
  end if;

  return v_out;
end;
$$;
revoke all on function public._college_interchange(uuid, text, timestamptz, integer, integer) from public, anon, authenticated;
grant execute on function public._college_interchange(uuid, text, timestamptz, integer, integer) to service_role;

-- 6 ───────────────────────────────────────────────────────────────────────
create or replace function public.college_export(
  p_college uuid, p_dataset text, p_since timestamptz default null)
returns json
language plpgsql volatile security definer set search_path to 'public'
as $$
declare v_rows json;
begin
  if auth.uid() is null or not public.college_can('exports', p_college) then
    raise exception 'you cannot export this college''s data' using errcode = '42501';
  end if;
  v_rows := public._college_interchange(p_college, p_dataset, p_since, 50000, 0);
  insert into public.college_data_access_log (college_id, actor_id, channel, dataset, status_code, row_count)
  values (p_college, auth.uid(), 'export', p_dataset, 200, json_array_length(v_rows));
  return v_rows;
end;
$$;
revoke all on function public.college_export(uuid, text, timestamptz) from public, anon;
grant execute on function public.college_export(uuid, text, timestamptz) to authenticated;

-- 7 ───────────────────────────────────────────────────────────────────────
-- Internal creator, shared by the RPC below and the e2e harness (owner SQL).
create or replace function public._college_api_key_create(
  p_college uuid, p_label text, p_scopes text[], p_rate integer, p_created_by uuid)
returns json
language plpgsql volatile security definer set search_path to 'public'
as $$
declare
  v_key text := 'emk_' || encode(extensions.gen_random_bytes(24), 'hex');
  v_id uuid;
begin
  insert into public.college_api_keys (college_id, label, key_prefix, key_hash, scopes, rate_limit_per_minute, created_by)
  values (p_college, trim(p_label), left(v_key, 12),
          encode(extensions.digest(v_key, 'sha256'), 'hex'),
          (select array_agg(distinct s order by s) from unnest(p_scopes) s),
          coalesce(p_rate, 60), p_created_by)
  returning id into v_id;
  return json_build_object('id', v_id, 'key', v_key, 'prefix', left(v_key, 12));
end;
$$;
revoke all on function public._college_api_key_create(uuid, text, text[], integer, uuid) from public, anon, authenticated;

create or replace function public.college_api_key_mint(
  p_college uuid, p_label text, p_scopes text[], p_rate integer default 60)
returns json
language plpgsql volatile security definer set search_path to 'public'
as $$
begin
  if auth.uid() is null or not public.college_can('settings.manage', p_college) then
    raise exception 'only a college admin or head of department can create API keys' using errcode = '42501';
  end if;
  if (select count(*) from public.college_api_keys where college_id = p_college and revoked_at is null) >= 10 then
    raise exception 'a college can hold 10 live keys; revoke one first' using errcode = 'P0001';
  end if;
  return public._college_api_key_create(p_college, p_label, p_scopes, p_rate, auth.uid());
end;
$$;
revoke all on function public.college_api_key_mint(uuid, text, text[], integer) from public, anon;
grant execute on function public.college_api_key_mint(uuid, text, text[], integer) to authenticated;

create or replace function public.college_api_key_revoke(p_key uuid)
returns void
language plpgsql volatile security definer set search_path to 'public'
as $$
declare v_college uuid;
begin
  select college_id into v_college from public.college_api_keys where id = p_key;
  if v_college is null or not public.college_can('settings.manage', v_college) then
    raise exception 'you cannot revoke this key' using errcode = '42501';
  end if;
  update public.college_api_keys set revoked_at = now(), revoked_by = auth.uid()
   where id = p_key and revoked_at is null;
end;
$$;
revoke all on function public.college_api_key_revoke(uuid) from public, anon;
grant execute on function public.college_api_key_revoke(uuid) to authenticated;

create or replace function public.college_api_keys_list(p_college uuid)
returns table (id uuid, label text, key_prefix text, scopes text[], rate_limit_per_minute integer,
               created_at timestamptz, created_by_name text, last_used_at timestamptz,
               revoked_at timestamptz, calls_24h bigint)
language sql stable security definer set search_path to 'public'
as $$
  select k.id, k.label, k.key_prefix, k.scopes, k.rate_limit_per_minute, k.created_at,
         p.full_name, k.last_used_at, k.revoked_at,
         (select count(*) from public.college_data_access_log l
           where l.key_id = k.id and l.created_at > now() - interval '24 hours')
    from public.college_api_keys k
    left join public.profiles p on p.id = k.created_by
   where k.college_id = p_college and public.college_can('settings.manage', p_college)
   order by k.revoked_at nulls first, k.created_at desc;
$$;
revoke all on function public.college_api_keys_list(uuid) from public, anon;
grant execute on function public.college_api_keys_list(uuid) to authenticated;

-- 8 ───────────────────────────────────────────────────────────────────────
create or replace function public.save_learner_ilr(p_student uuid, p_fields jsonb)
returns void
language plpgsql volatile security definer set search_path to 'public'
as $$
declare
  v_college uuid;
  f jsonb := coalesce(p_fields, '{}'::jsonb);
  -- '' clears a field; an absent key leaves it alone.
begin
  select college_id into v_college from public.college_students where id = p_student;
  if v_college is null or not public.college_can('learners.edit', v_college) then
    raise exception 'you cannot edit this learner' using errcode = '42501';
  end if;

  if f ? 'uln' and nullif(trim(f->>'uln'), '') is not null and trim(f->>'uln') !~ '^[1-9][0-9]{9}$' then
    raise exception 'a ULN is 10 digits' using errcode = '22023';
  end if;

  -- Fields that already live on the learner record.
  update public.college_students set
    uln = case when f ? 'uln' then nullif(trim(f->>'uln'), '') else uln end,
    ni_number = case when f ? 'ni_number' then nullif(upper(replace(f->>'ni_number', ' ', '')), '') else ni_number end,
    date_of_birth = case when f ? 'date_of_birth' then nullif(f->>'date_of_birth', '')::date else date_of_birth end,
    updated_at = now()
  where id = p_student
    and (f ? 'uln' or f ? 'ni_number' or f ? 'date_of_birth');

  insert into public.college_student_ilr (student_id, college_id) values (p_student, v_college)
  on conflict (student_id) do nothing;

  update public.college_student_ilr set
    learn_ref_number = case when f ? 'learn_ref_number' then nullif(trim(f->>'learn_ref_number'), '') else learn_ref_number end,
    family_name = case when f ? 'family_name' then nullif(trim(f->>'family_name'), '') else family_name end,
    given_names = case when f ? 'given_names' then nullif(trim(f->>'given_names'), '') else given_names end,
    sex = case when f ? 'sex' then nullif(upper(f->>'sex'), '') else sex end,
    ethnicity = case when f ? 'ethnicity' then nullif(f->>'ethnicity', '')::smallint else ethnicity end,
    lldd_health_prob = case when f ? 'lldd_health_prob' then nullif(f->>'lldd_health_prob', '')::smallint else lldd_health_prob end,
    prior_level = case when f ? 'prior_level' then nullif(f->>'prior_level', '')::smallint else prior_level end,
    postcode_prior = case when f ? 'postcode_prior' then nullif(upper(trim(f->>'postcode_prior')), '') else postcode_prior end,
    postcode = case when f ? 'postcode' then nullif(upper(trim(f->>'postcode')), '') else postcode end,
    learn_aim_ref = case when f ? 'learn_aim_ref' then nullif(upper(trim(f->>'learn_aim_ref')), '') else learn_aim_ref end,
    aim_type = case when f ? 'aim_type' then nullif(f->>'aim_type', '')::smallint else aim_type end,
    prog_type = case when f ? 'prog_type' then nullif(f->>'prog_type', '')::smallint else prog_type end,
    std_code = case when f ? 'std_code' then nullif(f->>'std_code', '')::int else std_code end,
    fund_model = case when f ? 'fund_model' then nullif(f->>'fund_model', '')::smallint else fund_model end,
    orig_learn_start_date = case when f ? 'orig_learn_start_date' then nullif(f->>'orig_learn_start_date', '')::date else orig_learn_start_date end,
    comp_status = case when f ? 'comp_status' then nullif(f->>'comp_status', '')::smallint else comp_status end,
    outcome = case when f ? 'outcome' then nullif(f->>'outcome', '')::smallint else outcome end,
    withdraw_reason = case when f ? 'withdraw_reason' then nullif(f->>'withdraw_reason', '')::smallint else withdraw_reason end,
    ach_date = case when f ? 'ach_date' then nullif(f->>'ach_date', '')::date else ach_date end,
    del_loc_postcode = case when f ? 'del_loc_postcode' then nullif(upper(trim(f->>'del_loc_postcode')), '') else del_loc_postcode end,
    epa_org_id = case when f ? 'epa_org_id' then nullif(upper(trim(f->>'epa_org_id')), '') else epa_org_id end,
    emp_stat = case when f ? 'emp_stat' then nullif(f->>'emp_stat', '')::smallint else emp_stat end,
    emp_id = case when f ? 'emp_id' then nullif(f->>'emp_id', '')::int else emp_id end,
    agreem_id = case when f ? 'agreem_id' then nullif(trim(f->>'agreem_id'), '') else agreem_id end,
    hrs_planned_reduction = case when f ? 'hrs_planned_reduction' then nullif(f->>'hrs_planned_reduction', '')::int else hrs_planned_reduction end,
    tnp1_price = case when f ? 'tnp1_price' then nullif(f->>'tnp1_price', '')::int else tnp1_price end,
    tnp2_price = case when f ? 'tnp2_price' then nullif(f->>'tnp2_price', '')::int else tnp2_price end,
    updated_by = auth.uid(),
    updated_at = now()
  where student_id = p_student;
end;
$$;
revoke all on function public.save_learner_ilr(uuid, jsonb) from public, anon;
grant execute on function public.save_learner_ilr(uuid, jsonb) to authenticated;

create or replace function public.set_college_ukprn(p_college uuid, p_ukprn text)
returns void
language plpgsql volatile security definer set search_path to 'public'
as $$
begin
  if auth.uid() is null or not public.college_can('settings.manage', p_college) then
    raise exception 'only a college admin can set the UKPRN' using errcode = '42501';
  end if;
  update public.colleges set ukprn = nullif(trim(p_ukprn), '') where id = p_college;
end;
$$;
revoke all on function public.set_college_ukprn(uuid, text) from public, anon;
grant execute on function public.set_college_ukprn(uuid, text) to authenticated;

-- 9 ───────────────────────────────────────────────────────────────────────
-- The ILR format check reads the ILR rows without counting as an export, so
-- "changes since the last ILR export" keeps meaning the last real export.
create or replace function public.college_ilr_check_rows(p_college uuid)
returns json
language plpgsql volatile security definer set search_path to 'public'
as $$
declare v_rows json;
begin
  if auth.uid() is null or not public.college_can('exports', p_college) then
    raise exception 'you cannot read this college''s ILR fields' using errcode = '42501';
  end if;
  v_rows := public._college_interchange(p_college, 'ilr', null, 50000, 0);
  insert into public.college_data_access_log (college_id, actor_id, channel, dataset, status_code, row_count, detail)
  values (p_college, auth.uid(), 'export', 'ilr', 200, json_array_length(v_rows), 'format_check');
  return v_rows;
end;
$$;
revoke all on function public.college_ilr_check_rows(uuid) from public, anon;
grant execute on function public.college_ilr_check_rows(uuid) to authenticated;
