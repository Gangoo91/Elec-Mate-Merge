-- ELE-1908 Live evidence pack (funding rules 2025/26, paras 309–318 and every
-- "Evidence requirements" box that applies to an employed apprentice).
-- Applied live as migration learner_evidence_pack.
--
--  1. college_learner_evidence — the documents the rules ask a provider to
--     hold (ID/residency, contract, agreement, training plan, initial
--     assessment, wage, care-leaver notice, EPA statements…). Versions are
--     kept, never overwritten (para 312); a new version supersedes the old.
--  2. A few facts on the learner record (DOB, NI, weekly hours, delivery
--     model, actual end date) and college_learner_episodes for breaks,
--     employer changes, withdrawal and completion (paras 266–277).
--  3. get_otj_monthly — active learning per calendar month (paras 88–89).
--  4. get_learner_evidence_pack — the checklist for one learner, computed
--     from the real record: ok / missing / attention / due / not yet due.
--     get_evidence_pack_board — every learner at a college, with the gaps.
-- Documents live in the private bucket college-learner-evidence, under
-- <college_id>/<student_id>/…, readable only by that college's staff.

-- ── 1. Learner facts ─────────────────────────────────────────────────
alter table public.college_students
  add column if not exists date_of_birth date,
  add column if not exists ni_number text,
  add column if not exists weekly_contracted_hours numeric,
  add column if not exists delivery_model text,
  add column if not exists learning_actual_end_date date,
  add column if not exists english_maths_opted_in boolean;
alter table public.college_students drop constraint if exists college_students_delivery_model_chk;
alter table public.college_students add constraint college_students_delivery_model_chk
  check (delivery_model is null or delivery_model in ('day_release', 'block_release', 'front_loaded'));

-- ── 2. Evidence documents ────────────────────────────────────────────
create table if not exists public.college_learner_evidence (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null,
  student_id uuid references public.college_students(id) on delete cascade,
  employer_id uuid references public.college_employers(id) on delete cascade,
  kind text not null check (kind in (
    'id_residency', 'employment_contract', 'employer_declaration', 'apprenticeship_agreement',
    'training_plan', 'initial_assessment', 'rpl_summary', 'fs_decision', 'fs_exemption',
    'learning_support_plan', 'care_leaver_info', 'care_leaver_la_letter', 'contract_for_services',
    'wage_confirmation', 'epao_agreement', 'epa_employment_statement', 'epa_certificate',
    'break_return_revision', 'eligibility_declaration', 'epa_result', 'custom', 'other')),
  title text,
  file_path text,
  file_name text,
  file_hash text,
  document_date date,
  valid_from date,
  valid_to date,
  evidence_type_seen text,
  structured jsonb not null default '{}'::jsonb,
  signatures jsonb not null default '[]'::jsonb,   -- [{role: apprentice|employer|provider, name, signed_on}]
  notes text,
  requirement_id uuid,
  version int not null default 1,
  supersedes_id uuid references public.college_learner_evidence(id) on delete set null,
  superseded_at timestamptz,
  superseded_reason text,
  uploaded_by uuid default auth.uid(),
  uploaded_by_name text,
  verified_by uuid,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  check (student_id is not null or employer_id is not null)
);
create index if not exists college_learner_evidence_student_idx on public.college_learner_evidence(student_id, kind) where superseded_at is null;
create index if not exists college_learner_evidence_employer_idx on public.college_learner_evidence(employer_id, kind) where superseded_at is null;
alter table public.college_learner_evidence enable row level security;
comment on table public.college_learner_evidence is
  '[COLLEGE] Funding evidence documents per learner (or per employer for contracts for services): ID/residency, contract, agreement, training plan, initial assessment, wage, EPA statements. Scope: one college. Used by: College Hub evidence pack. Rule: versions are never overwritten (funding rules para 312) — supersede, never update or delete.';

drop policy if exists "learner_evidence_staff_read" on public.college_learner_evidence;
drop policy if exists "learner_evidence_staff_insert" on public.college_learner_evidence;
drop policy if exists "learner_evidence_staff_update" on public.college_learner_evidence;
create policy "learner_evidence_staff_read" on public.college_learner_evidence for select to authenticated
  using (public._review_staff_can(college_id));
create policy "learner_evidence_staff_insert" on public.college_learner_evidence for insert to authenticated
  with check (public._review_staff_can_write(college_id));
create policy "learner_evidence_staff_update" on public.college_learner_evidence for update to authenticated
  using (public._review_staff_can_write(college_id)) with check (public._review_staff_can_write(college_id));

create or replace function public.tg_learner_evidence_guard()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if tg_op = 'INSERT' then
    -- The record belongs to the college the learner (or employer) is at.
    if new.student_id is not null and not exists (
         select 1 from college_students s where s.id = new.student_id and s.college_id = new.college_id) then
      raise exception 'Learner is not at this college.' using errcode = 'check_violation';
    end if;
    if new.employer_id is not null and not exists (
         select 1 from college_employers e where e.id = new.employer_id and e.college_id = new.college_id) then
      raise exception 'Employer is not at this college.' using errcode = 'check_violation';
    end if;
    if new.requirement_id is not null and not exists (
         select 1 from college_evidence_requirements q where q.id = new.requirement_id and q.college_id = new.college_id) then
      raise exception 'Requirement is not at this college.' using errcode = 'check_violation';
    end if;
    if new.kind = 'custom' and new.requirement_id is null then
      raise exception 'Say which college requirement this is for.' using errcode = 'check_violation';
    end if;
    new.uploaded_by := coalesce(auth.uid(), new.uploaded_by);
    new.uploaded_by_name := coalesce((select full_name from profiles where id = auth.uid()), new.uploaded_by_name);
    new.verified_by := null;
    new.verified_at := null;
    new.superseded_at := null;
    if new.supersedes_id is not null then
      select coalesce(max(version), 0) + 1 into new.version from college_learner_evidence
       where id = new.supersedes_id;
    end if;
    return new;
  end if;
  if tg_op = 'DELETE' then
    raise exception 'Evidence is kept. Replace it with a new version instead.' using errcode = 'check_violation';
  end if;
  -- UPDATE: only supersede (once) or verify; the document itself never changes.
  if (to_jsonb(new) - 'superseded_at' - 'superseded_reason' - 'verified_by' - 'verified_at')
     is distinct from (to_jsonb(old) - 'superseded_at' - 'superseded_reason' - 'verified_by' - 'verified_at') then
    raise exception 'Evidence is kept as it was filed. Add a new version instead.' using errcode = 'check_violation';
  end if;
  if old.superseded_at is not null and new.superseded_at is distinct from old.superseded_at then
    raise exception 'Already replaced.' using errcode = 'check_violation';
  end if;
  if new.verified_at is distinct from old.verified_at then
    new.verified_by := auth.uid();
  end if;
  return new;
end; $$;
drop trigger if exists trg_learner_evidence_guard on public.college_learner_evidence;
create trigger trg_learner_evidence_guard before insert or update or delete on public.college_learner_evidence
  for each row execute function public.tg_learner_evidence_guard();

-- A new version retires the one it replaces.
create or replace function public.tg_learner_evidence_supersede()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if new.supersedes_id is not null then
    update college_learner_evidence set superseded_at = now(), superseded_reason = 'Replaced by version ' || new.version
     where id = new.supersedes_id and superseded_at is null;
  end if;
  return new;
end; $$;
drop trigger if exists trg_learner_evidence_supersede on public.college_learner_evidence;
create trigger trg_learner_evidence_supersede after insert on public.college_learner_evidence
  for each row execute function public.tg_learner_evidence_supersede();

-- ── 2b. The college's own requirements ──────────────────────────────
-- Anything else a college wants on every learner's pack (a site induction, a
-- DBS check, a PPE issue record, a safeguarding briefing…), shown and chased
-- exactly like the funding items.
create table if not exists public.college_evidence_requirements (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null,
  title text not null check (length(trim(title)) between 3 and 120),
  description text,
  stage text not null default 'start' check (stage in ('start', 'during', 'end')),
  cohort_id uuid references public.college_cohorts(id) on delete cascade,
  course_id uuid references public.college_courses(id) on delete cascade,
  renew_months int check (renew_months is null or renew_months between 1 and 60),
  due_within_days int check (due_within_days is null or due_within_days between 0 and 365),
  needs_signature_from text[] not null default '{}',
  active boolean not null default true,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now()
);
alter table public.college_evidence_requirements enable row level security;
comment on table public.college_evidence_requirements is
  '[COLLEGE] A college''s own evidence requirements, added to every matching learner''s evidence pack (optionally one cohort or course; optional renewal). Scope: one college. Used by: evidence pack. Rule: retire with active=false, never delete once evidence is filed against it.';
drop policy if exists "evidence_requirements_read" on public.college_evidence_requirements;
drop policy if exists "evidence_requirements_write" on public.college_evidence_requirements;
create policy "evidence_requirements_read" on public.college_evidence_requirements for select to authenticated
  using (public._review_staff_can(college_id));
create policy "evidence_requirements_write" on public.college_evidence_requirements for all to authenticated
  using (public._review_staff_can_write(college_id)) with check (public._review_staff_can_write(college_id));
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'college_learner_evidence_requirement_fk') then
    alter table public.college_learner_evidence add constraint college_learner_evidence_requirement_fk
      foreign key (requirement_id) references public.college_evidence_requirements(id) on delete restrict;
  end if;
end $$;

-- ── 3. Episodes: breaks, employer changes, withdrawal, completion ────
create table if not exists public.college_learner_episodes (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null,
  student_id uuid not null references public.college_students(id) on delete cascade,
  kind text not null check (kind in ('start', 'break', 'return', 'employer_change', 'withdrawal', 'completion')),
  effective_date date not null,
  last_evidenced_learning_date date,
  reason text,
  employer_id uuid references public.college_employers(id) on delete set null,
  evidence_id uuid references public.college_learner_evidence(id) on delete set null,
  recorded_by uuid default auth.uid(),
  created_at timestamptz not null default now()
);
create index if not exists college_learner_episodes_student_idx on public.college_learner_episodes(student_id, effective_date);
alter table public.college_learner_episodes enable row level security;
comment on table public.college_learner_episodes is
  '[COLLEGE] A learner''s programme history: start, breaks in learning, returns, employer changes, withdrawal, completion (funding rules paras 266–277). Scope: one college. Used by: evidence pack, Student 360. Rule: append only.';
drop policy if exists "learner_episodes_staff_read" on public.college_learner_episodes;
drop policy if exists "learner_episodes_staff_insert" on public.college_learner_episodes;
create policy "learner_episodes_staff_read" on public.college_learner_episodes for select to authenticated
  using (public._review_staff_can(college_id));
create policy "learner_episodes_staff_insert" on public.college_learner_episodes for insert to authenticated
  with check (public._review_staff_can_write(college_id)
              and exists (select 1 from college_students s where s.id = student_id and s.college_id = college_learner_episodes.college_id));

-- ── 4. Storage: private, per college ────────────────────────────────
-- Policies on storage.objects are evaluated for every bucket, and SQL does not
-- promise to short-circuit; a plain ::uuid cast on another bucket's folder
-- name could make unrelated storage reads fail. This never raises.
create or replace function public._safe_uuid(p text)
returns uuid language sql immutable as $$
  select case when p ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then p::uuid end;
$$;

insert into storage.buckets (id, name, public)
values ('college-learner-evidence', 'college-learner-evidence', false)
on conflict (id) do update set public = false;

drop policy if exists "learner_evidence_files_read" on storage.objects;
drop policy if exists "learner_evidence_files_insert" on storage.objects;
create policy "learner_evidence_files_read" on storage.objects for select to authenticated
  using (bucket_id = 'college-learner-evidence'
         and public._review_staff_can(public._safe_uuid((storage.foldername(name))[1])));
create policy "learner_evidence_files_insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'college-learner-evidence'
              and public._review_staff_can_write(public._safe_uuid((storage.foldername(name))[1])));

-- One evidence row as a list for the pack (empty when there is none).
create or replace function public._ev_list(p jsonb)
returns jsonb language sql immutable as $$
  select case when p is null then '[]'::jsonb else jsonb_build_array(p - 'structured') end;
$$;

-- ── 5. Active learning per calendar month (paras 88–89) ─────────────
create or replace function public._otj_monthly(p_student uuid)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  s college_students;
  v_from date;
  v_to date;
begin
  select * into s from college_students where id = p_student;
  if s.id is null then return '[]'::jsonb; end if;
  v_from := date_trunc('month', coalesce(s.start_date, public._lon(s.created_at)))::date;
  v_to := date_trunc('month', least(coalesce(s.learning_actual_end_date, public._lon(now())), public._lon(now())))::date;
  return coalesce((
    select jsonb_agg(jsonb_build_object('month', m.month, 'minutes', coalesce(m.minutes, 0)) order by m.month)
      from (
        select g.month::date as month,
               (select coalesce(sum(o.duration_minutes), 0) from college_otj_entries o
                 where o.student_id = s.user_id
                   and o.verification_status in ('verified', 'verified_by_employer', 'pending')
                   and date_trunc('month', o.activity_date) = g.month)
             + (select coalesce(sum(t.duration), 0) from time_entries t
                 where t.user_id = s.user_id and public._otj_is_measured(t.is_automatic, t.notes)
                   and date_trunc('month', t.date) = g.month
                   and not exists (select 1 from otj_capture_links l
                                     join college_otj_entries e on e.id = l.otj_entry_id
                                    where l.time_entry_id = t.id)) as minutes
          from generate_series(v_from, v_to, interval '1 month') g(month)
      ) m), '[]'::jsonb);
end; $$;
revoke all on function public._otj_monthly(uuid) from public, anon, authenticated;

-- ── 6. The checklist for one learner ────────────────────────────────
create or replace function public._learner_evidence_pack(p_student uuid)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  s college_students;
  v_today date := public._lon(now());
  v_items jsonb := '[]'::jsonb;
  v_otj jsonb;
  v_ev jsonb;
  v_ev2 jsonb;
  v_months jsonb;
  v_due date;
  v_last record;
  v_n int;
  v_att int;
  v_age int;
  v_gap_run int := 0;
  v_max_run int := 0;
  v_gap_months text[] := '{}';
  v_window int;
  v_status text;
  v_detail text;
  v_end_phase boolean;
  v_gateway_phase boolean;
  v_support boolean;
  v_plan record;
  m jsonb;
  i int;
  v_n_months int;
begin
  select * into s from college_students where id = p_student;
  if s.id is null then raise exception 'not found' using errcode = 'P0002'; end if;
  v_end_phase := lower(coalesce(s.status, '')) in ('completed', 'withdrawn')
                 or (s.expected_end_date is not null and s.expected_end_date < v_today)
                 or s.learning_actual_end_date is not null;
  v_gateway_phase := v_end_phase or (s.expected_end_date is not null and s.expected_end_date <= v_today + 90);

  -- helper: current (not superseded) evidence of a kind, as jsonb
  -- (inline subqueries below; plpgsql has no local functions)

  -- 1 Identity and residency (Annex A; box after 29.8)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'id_residency' and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'id_residency', 'group', 'start', 'title', 'Identity and residency',
    'para', 'Annex A; 29.8', 'kind', 'id_residency',
    'status', case when v_ev is null then 'missing' else 'ok' end,
    'detail', case when v_ev is null then 'Record the documents you saw that prove identity and the right to live and work in England.'
                   else coalesce(v_ev->>'evidence_type_seen', 'Seen') || ' · filed ' || to_char((v_ev->>'created_at')::timestamptz, 'DD Mon YYYY') end,
    'evidence', public._ev_list(v_ev));

  -- 2 ULN, NI number, date of birth (309, 315)
  v_detail := concat_ws(', ',
    case when s.uln is null or s.uln = '' then 'ULN' end,
    case when s.ni_number is null or s.ni_number = '' then 'National Insurance number' end,
    case when s.date_of_birth is null then 'date of birth' end);
  v_items := v_items || jsonb_build_object('key', 'identifiers', 'group', 'start', 'title', 'ULN, NI number and date of birth',
    'para', '309; 315', 'field', true,
    'status', case when v_detail = '' then 'ok' else 'missing' end,
    'detail', case when v_detail = '' then 'ULN ' || s.uln || ' · NI on record · born ' || to_char(s.date_of_birth, 'DD Mon YYYY')
                   else 'Missing: ' || v_detail || '.' end);

  -- 2b Eligibility self-declaration (29.4–29.7; 310.2; 317)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'eligibility_declaration' and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'eligibility', 'group', 'start', 'title', 'Eligibility declaration',
    'para', '29.4–29.7; 310.2; 317', 'kind', 'eligibility_declaration',
    'status', case when v_ev is null then 'missing' else 'ok' end,
    'detail', case when v_ev is null then 'The apprentice confirms they are not on another funded programme and that the details they gave are correct, naming what they confirm.'
                   else 'Signed ' || coalesce(to_char((v_ev->>'document_date')::date, 'DD Mon YYYY'), 'and filed') || '.' end,
    'evidence', public._ev_list(v_ev));

  -- 3 Employment for the whole programme (65; 120)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind in ('employment_contract', 'employer_declaration') and e.superseded_at is null
   order by e.created_at desc limit 1;
  v_status := case when v_ev is null then 'missing'
                   when (v_ev->>'valid_to') is not null and s.expected_end_date is not null
                        and (v_ev->>'valid_to')::date < s.expected_end_date + 90 then 'attention'
                   else 'ok' end;
  v_items := v_items || jsonb_build_object('key', 'employment', 'group', 'start', 'title', 'Employed for the whole apprenticeship',
    'para', '65; 120', 'kind', 'employment_contract',
    'status', v_status,
    'detail', case v_status
      when 'missing' then 'An extract of the contract of employment, or a signed employer declaration, covering the programme and the end-point assessment.'
      when 'attention' then 'The contract ends ' || to_char((v_ev->>'valid_to')::date, 'DD Mon YYYY') || ', before the end-point assessment is likely to finish.'
      else 'On file' || coalesce(' · runs to ' || to_char((v_ev->>'valid_to')::date, 'DD Mon YYYY'), ' · no end date') end,
    'evidence', public._ev_list(v_ev));

  -- 4 Apprenticeship agreement (66–68)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'apprenticeship_agreement' and e.superseded_at is null order by e.created_at desc limit 1;
  v_status := case when v_ev is null then 'missing'
                   when jsonb_array_length(coalesce(v_ev->'signatures', '[]'::jsonb)) < 2 then 'attention'
                   else 'ok' end;
  v_items := v_items || jsonb_build_object('key', 'agreement', 'group', 'start', 'title', 'Apprenticeship agreement',
    'para', '66–68', 'kind', 'apprenticeship_agreement', 'status', v_status,
    'detail', case v_status when 'missing' then 'A signed copy of the complete agreement between the employer and apprentice, with any revisions.'
                            when 'attention' then 'Filed, but not signed by both the employer and the apprentice.'
                            else 'Signed and filed · version ' || (v_ev->>'version') end,
    'evidence', public._ev_list(v_ev));

  -- 5 Training plan signed by all parties, re-signed after a change (95–96; 98.4.1)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'training_plan' and e.superseded_at is null order by e.created_at desc limit 1;
  select r.held_on, r.outcomes->>'plan_change' as change into v_plan
    from college_tripartite_reviews r
   where r.student_id = s.id and r.locked_at is not null
     and r.outcomes->>'plan_change' in ('content', 'end_date', 'otj_release')
   order by r.held_on desc limit 1;
  v_status := case
    when v_ev is null and coalesce(s.start_date, v_today) + 42 >= v_today then 'due'
    when v_ev is null then 'missing'
    when (select count(distinct x->>'role') from jsonb_array_elements(coalesce(v_ev->'signatures', '[]'::jsonb)) x
           where x->>'role' in ('apprentice', 'employer', 'provider')) < 3 then 'attention'
    when v_plan.held_on is not null and coalesce((v_ev->>'document_date')::date, (v_ev->>'created_at')::date) < v_plan.held_on then 'attention'
    else 'ok' end;
  v_items := v_items || jsonb_build_object('key', 'training_plan', 'group', 'start', 'title', 'Training plan, signed by all three',
    'para', '95–96; 98.4.1', 'kind', 'training_plan', 'status', v_status,
    'due_date', case when v_ev is null then coalesce(s.start_date, v_today) + 42 end,
    'detail', case
      when v_status = 'due' then 'Agree and sign it by ' || to_char(coalesce(s.start_date, v_today) + 42, 'DD Mon YYYY') || ' (day 42).'
      when v_status = 'missing' then 'The current training plan, signed and dated by the apprentice, employer and college, with previous versions.'
      when v_plan.held_on is not null and coalesce((v_ev->>'document_date')::date, (v_ev->>'created_at')::date) < v_plan.held_on
        then 'The review on ' || to_char(v_plan.held_on, 'DD Mon YYYY') || ' changed the plan; the employer must re-sign a new version.'
      when v_status = 'attention' then 'Filed, but not signed by all three parties.'
      else 'Signed by all three · version ' || (v_ev->>'version') end,
    'evidence', public._ev_list(v_ev));

  -- 6 Initial assessment and prior learning (35.2; 62.4)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'initial_assessment' and e.superseded_at is null order by e.created_at desc limit 1;
  select to_jsonb(e) into v_ev2 from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'rpl_summary' and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'initial_assessment', 'group', 'start', 'title', 'Initial assessment and prior learning',
    'para', '35.2; 62.4', 'kind', 'initial_assessment',
    'status', case when v_ev is null then 'missing' else 'ok' end,
    'detail', case when v_ev is null then 'The skills scan, prior-learning check and how the content, price and off-the-job hours were adjusted (or why not), agreed with the employer.'
                   else 'On file' || case when v_ev2 is not null then ' · prior learning summary filed' else ' · no prior-learning reduction recorded' end end,
    'evidence', public._ev_list(v_ev) || public._ev_list(v_ev2));

  -- 7 Planned off-the-job hours (80; box after 94)
  if s.user_id is not null then v_otj := public._otj_summary_core(s.user_id); end if;
  v_items := v_items || jsonb_build_object('key', 'planned_otj', 'group', 'start', 'title', 'Planned off-the-job hours',
    'para', '80; 94', 'field', true,
    'status', case when v_otj is null then 'missing' when (v_otj->>'required_hours') is null then 'missing' else 'ok' end,
    'detail', case when v_otj is null then 'The learner has not joined Elec-Mate, so no hours record exists yet.'
                   when (v_otj->>'required_hours') is null then 'Set the planned hours for this learner or their course.'
                   else round((v_otj->>'required_hours')::numeric) || 'h planned (' || replace(v_otj->>'required_source', '_', ' ') || '). Must match the training plan and the ILR.' end);

  -- 8 Active learning every calendar month (88–89)
  v_months := public._otj_monthly(s.id);
  v_window := case when s.delivery_model in ('block_release', 'front_loaded') then 3 else 2 end;
  v_n_months := jsonb_array_length(v_months);
  for i in 0 .. v_n_months - 1 loop
    m := v_months->i;
    -- the current month is not over: only judge complete months
    if (m->>'month')::date = date_trunc('month', v_today)::date then continue; end if;
    if (m->>'minutes')::int = 0 then
      v_gap_run := v_gap_run + 1;
      v_gap_months := v_gap_months || to_char((m->>'month')::date, 'Mon YYYY');
      v_max_run := greatest(v_max_run, v_gap_run);
    else
      v_gap_run := 0;
    end if;
  end loop;
  v_items := v_items || jsonb_build_object('key', 'monthly_otj', 'group', 'during', 'title', 'Training every month',
    'para', case when v_window = 3 then '88' else '89' end,
    'status', case when s.user_id is null then 'missing'
                   when v_max_run >= v_window then 'attention'
                   when array_length(v_gap_months, 1) > 0 then 'attention'
                   else 'ok' end,
    'detail', case when s.user_id is null then 'No hours record: the learner has not joined Elec-Mate.'
                   when v_max_run >= v_window then 'No training in ' || array_to_string(v_gap_months, ', ')
                        || '. ' || v_window || ' months running without any means a break in learning has to be recorded.'
                   when array_length(v_gap_months, 1) > 0 then 'No training in ' || array_to_string(v_gap_months, ', ') || '.'
                   else 'Training recorded in every complete month since the start.' end,
    'months', v_months);

  -- 9 Progress reviews (97–98)
  v_due := public.tripartite_due_by(s.id);
  select count(*), count(*) filter (where r.employer_attendance = 'attended') into v_n, v_att
    from college_tripartite_reviews r where r.student_id = s.id and r.locked_at is not null;
  select r.held_on, r.employer_attendance, r.employer_invited_at, r.signatures into v_last
    from college_tripartite_reviews r where r.student_id = s.id and r.locked_at is not null
   order by r.held_on desc limit 1;
  v_status := case
    when v_due < v_today then 'missing'
    when v_last.held_on is not null and not (v_last.signatures ? 'student_signed_at') then 'attention'
    when v_n >= 2 and v_att * 2 <= v_n then 'attention'
    when v_due <= v_today + 21 then 'due'
    else 'ok' end;
  v_items := v_items || jsonb_build_object('key', 'reviews', 'group', 'during', 'title', 'Progress review every 3 months',
    'para', '97–98', 'status', v_status, 'due_date', v_due, 'link', 'reviews',
    'detail', case
      when v_due < v_today then 'Overdue: the next review was due by ' || to_char(v_due, 'DD Mon YYYY') || '.'
      when v_last.held_on is not null and not (v_last.signatures ? 'student_signed_at')
        then 'The review on ' || to_char(v_last.held_on, 'DD Mon YYYY') || ' is not signed by the apprentice yet.'
      when v_n >= 2 and v_att * 2 <= v_n then 'The employer attended ' || v_att || ' of ' || v_n || ' reviews; it must be most of them.'
      else coalesce('Last held ' || to_char(v_last.held_on, 'DD Mon YYYY') || ' · ', 'None held yet · ')
           || 'next due by ' || to_char(v_due, 'DD Mon YYYY')
           || case when v_n > 0 then ' · employer attended ' || v_att || ' of ' || v_n else '' end end);

  -- 10 Learning support check every 3 months (40.5; 97.3)
  v_support := coalesce(array_length(s.send_flags, 1), 0) > 0 or s.ehcp_ref is not null
    or exists (select 1 from college_ilps i where i.student_id = s.id and i.is_current
                and length(trim(coalesce(i.support_needs, ''))) > 0);
  if v_support then
    select r.held_on into v_last from college_tripartite_reviews r
     where r.student_id = s.id and r.locked_at is not null
       and coalesce((r.outcomes->'learning_support'->>'discussed')::boolean, false)
     order by r.held_on desc limit 1;
    v_items := v_items || jsonb_build_object('key', 'learning_support', 'group', 'during', 'title', 'Learning support reviewed every 3 months',
      'para', '40.5; 97.3', 'kind', 'learning_support_plan',
      'status', case when v_last.held_on is null then 'missing'
                     when (date_trunc('month', v_last.held_on) + interval '4 months - 1 day')::date < v_today then 'missing'
                     else 'ok' end,
      'detail', case when v_last.held_on is null then 'Support needs are recorded but no learning support review is on file.'
                     else 'Last reviewed ' || to_char(v_last.held_on, 'DD Mon YYYY') || '.' end);
  else
    v_items := v_items || jsonb_build_object('key', 'learning_support', 'group', 'during', 'title', 'Learning support reviewed every 3 months',
      'para', '40.5', 'status', 'not_applicable', 'detail', 'No support needs recorded.');
  end if;

  -- 11 English and maths (box after 58; 45.4)
  select count(*) filter (where lower(f.subject) like 'english%'),
         count(*) filter (where lower(f.subject) like 'math%')
    into v_n, v_att from college_functional_skills f where f.student_id = s.id;
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind in ('fs_decision', 'fs_exemption') and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'english_maths', 'group', 'start', 'title', 'English and maths decision',
    'para', '45.4; box after 58', 'kind', 'fs_decision',
    'status', case when v_n > 0 and v_att > 0 then 'ok' when v_ev is not null then 'ok' else 'missing' end,
    'detail', case when v_n > 0 and v_att > 0 then 'English and maths recorded (achieved, exempt or in progress).'
                   when v_ev is not null then 'Decision on file.'
                   else 'Record prior attainment or the decision on English and maths, and any exemption.' end,
    'evidence', public._ev_list(v_ev));

  -- 12 Minimum duration and working hours (76; 70)
  v_status := case
    when s.start_date is null or s.expected_end_date is null then 'missing'
    when s.expected_end_date < (s.start_date + interval '8 months')::date then 'attention'
    when s.weekly_contracted_hours is null then 'missing'
    when s.weekly_contracted_hours < 30 then 'attention'
    else 'ok' end;
  v_items := v_items || jsonb_build_object('key', 'duration', 'group', 'start', 'title', 'Duration and working hours',
    'para', '70; 76', 'field', true, 'status', v_status,
    'detail', case
      when s.start_date is null or s.expected_end_date is null then 'Set the start and planned end dates.'
      when s.expected_end_date < (s.start_date + interval '8 months')::date then 'Shorter than the 8-month minimum.'
      when s.weekly_contracted_hours is null then 'Record the apprentice''s contracted weekly hours.'
      when s.weekly_contracted_hours < 30 then s.weekly_contracted_hours || ' hours a week: keep evidence that the duration was extended to match.'
      else to_char(s.start_date, 'DD Mon YYYY') || ' to ' || to_char(s.expected_end_date, 'DD Mon YYYY') || ' · '
           || s.weekly_contracted_hours || ' hours a week' end);

  -- 13 Lawful wage (box after 72.3)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.superseded_at is null
     and (e.kind = 'wage_confirmation' or (e.kind = 'training_plan' and e.structured ? 'wage_statement'))
   order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'wage', 'group', 'start', 'title', 'Paid a lawful wage',
    'para', '72.3', 'kind', 'wage_confirmation',
    'status', case when v_ev is null then 'missing' else 'ok' end,
    'detail', case when v_ev is null then 'A copy of the employment terms or a written statement about wages.' else 'On file.' end,
    'evidence', public._ev_list(v_ev));

  -- 14 Care leavers' bursary information, 24 or younger (box after 62.4)
  v_age := case when s.date_of_birth is null then null
                else extract(year from age(coalesce(s.start_date, v_today), s.date_of_birth))::int end;
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'care_leaver_info' and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'care_leaver', 'group', 'start', 'title', 'Told about the care leavers'' bursary',
    'para', '62.4; 113', 'kind', 'care_leaver_info',
    'status', case when v_age is null then 'missing' when v_age > 24 then 'not_applicable'
                   when v_ev is null then 'missing' else 'ok' end,
    'detail', case when v_age is null then 'Record the date of birth to know whether this applies.'
                   when v_age > 24 then 'Not applicable: ' || v_age || ' at the start.'
                   when v_ev is null then 'Record that the apprentice was told about the bursary.'
                   else 'Recorded.' end,
    'evidence', public._ev_list(v_ev));

  -- 15 Contract for services with the employer (181; 190)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.employer_id = s.employer_id and s.employer_id is not null and e.kind = 'contract_for_services'
     and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'contract_for_services', 'group', 'start', 'title', 'Contract for services with the employer',
    'para', '181; 190', 'kind', 'contract_for_services', 'employer_level', true,
    'status', case when s.employer_id is null then 'missing' when v_ev is null then 'missing' else 'ok' end,
    'detail', case when s.employer_id is null then 'No employer recorded for this learner.'
                   when v_ev is null then 'The signed contract with the employer, including the no-contribution statement.'
                   else 'On file for the employer.' end,
    'evidence', public._ev_list(v_ev));

  -- 16 Gateway (119)
  v_items := v_items || jsonb_build_object('key', 'gateway', 'group', 'end', 'title', 'Gateway: ready for assessment',
    'para', '119',
    'status', case when not v_gateway_phase then 'not_yet_due'
                   when exists (select 1 from epa_gateway_checklist g where g.user_id = s.user_id and g.gateway_passed)
                     or exists (select 1 from college_epa e where e.student_id = s.id and e.gateway_date is not null)
                     then 'ok'
                   else 'due' end,
    'detail', case when not v_gateway_phase then 'From 3 months before the planned end.'
                   else 'Minimum duration met, gateway requirements met and the employer content the apprentice is ready.' end);

  -- 17 Statement that the apprentice stays employed through EPA (box after 129)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'epa_employment_statement' and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'epa_employment', 'group', 'end', 'title', 'Employed until the assessment ends',
    'para', '129', 'kind', 'epa_employment_statement',
    'status', case when not v_gateway_phase then 'not_yet_due' when v_ev is null then 'due' else 'ok' end,
    'detail', case when not v_gateway_phase then 'At gateway.'
                   when v_ev is null then 'A statement signed by the employer and college that the apprentice stays employed until the assessment is complete.'
                   else 'On file.' end,
    'evidence', public._ev_list(v_ev));

  -- 17b Agreement with the end-point assessment organisation (box after 129)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'epao_agreement' and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'epao_agreement', 'group', 'end', 'title', 'Agreement with the assessment organisation',
    'para', '129', 'kind', 'epao_agreement',
    'status', case when not v_gateway_phase then 'not_yet_due' when v_ev is null then 'due' else 'ok' end,
    'detail', case when not v_gateway_phase then 'Before gateway.'
                   when v_ev is null then 'The written agreement with the end-point assessment organisation.'
                   else 'On file.' end,
    'evidence', public._ev_list(v_ev));

  -- 17c The assessment result (box after 129)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind in ('epa_result', 'epa_certificate') and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'epa_result', 'group', 'end', 'title', 'Assessment result',
    'para', '129', 'kind', 'epa_result',
    'status', case when lower(coalesce(s.status, '')) <> 'completed' and not exists (
                     select 1 from college_epa e where e.student_id = s.id and e.result is not null) then 'not_yet_due'
                   when v_ev is null then 'due' else 'ok' end,
    'detail', case when v_ev is null then 'The assessment organisation''s evidence of the result or the certificate.' else 'On file.' end,
    'evidence', public._ev_list(v_ev));

  -- 18 Planned versus actual hours at the end (92–94)
  v_items := v_items || jsonb_build_object('key', 'otj_statement', 'group', 'end', 'title', 'Planned and actual hours at the end',
    'para', '92–94', 'link', 'otj',
    'status', case when not v_end_phase then 'not_yet_due'
                   when v_otj is not null and coalesce((v_otj->>'counted_hours')::numeric, 0) >= coalesce((v_otj->>'required_hours')::numeric, 0) then 'ok'
                   when exists (select 1 from otj_hours_statements h where h.college_student_id = s.id and h.superseded_at is null
                                  and h.learner_signed_at is not null and h.employer_signed_at is not null) then 'ok'
                   else 'due' end,
    'detail', case when not v_end_phase then 'At the end of the practical period.'
                   else 'Where fewer hours were delivered than planned, a statement signed by the apprentice and employer.' end);

  -- 19 Breaks and changes recorded (266–277)
  select count(*) into v_n from college_learner_episodes p where p.student_id = s.id and p.kind = 'break';
  v_items := v_items || jsonb_build_object('key', 'episodes', 'group', 'during', 'title', 'Breaks and changes recorded',
    'para', '266–277', 'link', 'episodes',
    'status', case when v_max_run >= v_window and v_n = 0 then 'attention' else 'ok' end,
    'detail', case when v_max_run >= v_window and v_n = 0
                     then 'A gap of ' || v_max_run || ' months with no training and no break in learning recorded.'
                   when v_n > 0 then v_n || ' break' || case when v_n > 1 then 's' else '' end || ' in learning recorded.'
                   else 'No breaks or changes.' end);

  -- 20 The college's own requirements
  for v_plan in
    select q.* from college_evidence_requirements q
     where q.college_id = s.college_id and q.active
       and (q.cohort_id is null or q.cohort_id = s.cohort_id)
       and (q.course_id is null or q.course_id = s.course_id)
     order by q.stage, q.created_at
  loop
    select to_jsonb(e) into v_ev from college_learner_evidence e
     where e.student_id = s.id and e.requirement_id = v_plan.id and e.superseded_at is null
     order by e.created_at desc limit 1;
    v_status := case
      when v_plan.stage = 'end' and not v_gateway_phase then 'not_yet_due'
      when v_ev is null and v_plan.due_within_days is not null
           and coalesce(s.start_date, v_today) + v_plan.due_within_days >= v_today then 'due'
      when v_ev is null then 'missing'
      when v_plan.renew_months is not null
           and (coalesce((v_ev->>'document_date')::date, (v_ev->>'created_at')::date)
                + make_interval(months => v_plan.renew_months))::date < v_today then 'attention'
      when coalesce(array_length(v_plan.needs_signature_from, 1), 0) > 0
           and exists (select 1 from unnest(v_plan.needs_signature_from) r
                        where not exists (select 1 from jsonb_array_elements(coalesce(v_ev->'signatures', '[]'::jsonb)) x
                                           where x->>'role' = r)) then 'attention'
      else 'ok' end;
    v_items := v_items || jsonb_build_object('key', 'custom:' || v_plan.id, 'group', v_plan.stage, 'title', v_plan.title,
      'para', 'College requirement', 'kind', 'custom', 'requirement_id', v_plan.id, 'custom', true,
      'status', v_status,
      'due_date', case when v_ev is null and v_plan.due_within_days is not null then coalesce(s.start_date, v_today) + v_plan.due_within_days end,
      'detail', case
        when v_status = 'not_yet_due' then coalesce(v_plan.description, 'At the end of the programme.')
        when v_status = 'attention' and v_plan.renew_months is not null and v_ev is not null
             and (coalesce((v_ev->>'document_date')::date, (v_ev->>'created_at')::date) + make_interval(months => v_plan.renew_months))::date < v_today
          then 'Expired: renew every ' || v_plan.renew_months || ' months.'
        when v_status = 'attention' then 'Filed, but not signed by everyone it needs.'
        when v_ev is null then coalesce(v_plan.description, 'Required by the college.')
        else 'On file' || case when v_plan.renew_months is not null then ' · renew by ' || to_char(
               (coalesce((v_ev->>'document_date')::date, (v_ev->>'created_at')::date) + make_interval(months => v_plan.renew_months))::date,
               'DD Mon YYYY') else '' end end,
      'evidence', public._ev_list(v_ev));
  end loop;

  return jsonb_build_object(
    'learner', jsonb_build_object(
      'id', s.id, 'name', s.name, 'uln', s.uln, 'status', s.status, 'start_date', s.start_date,
      'expected_end_date', s.expected_end_date, 'date_of_birth', s.date_of_birth, 'ni_number', s.ni_number,
      'weekly_contracted_hours', s.weekly_contracted_hours, 'delivery_model', s.delivery_model,
      'learning_actual_end_date', s.learning_actual_end_date, 'employer_id', s.employer_id, 'college_id', s.college_id,
      'course', (select c.name from college_courses c where c.id = s.course_id),
      'cohort', (select c.name from college_cohorts c where c.id = s.cohort_id),
      'employer', (select e.company_name from college_employers e where e.id = s.employer_id)),
    'generated_at', now(),
    'items', v_items,
    'counts', (select jsonb_object_agg(st, n) from (
                 select x->>'status' st, count(*) n from jsonb_array_elements(v_items) x group by 1) c),
    'episodes', coalesce((select jsonb_agg(to_jsonb(p) order by p.effective_date)
                            from college_learner_episodes p where p.student_id = s.id), '[]'::jsonb),
    'history', coalesce((select jsonb_agg(to_jsonb(e) - 'structured' order by e.kind, e.version desc)
                           from college_learner_evidence e where e.student_id = s.id), '[]'::jsonb));
end; $$;
revoke all on function public._learner_evidence_pack(uuid) from public, anon, authenticated;

create or replace function public.get_learner_evidence_pack(p_student uuid)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare v_college uuid;
begin
  select college_id into v_college from college_students where id = p_student;
  if v_college is null or not public._review_staff_can(v_college) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return public._learner_evidence_pack(p_student);
end; $$;

-- Every learner at a college: status counts and the items that need doing.
create or replace function public.get_evidence_pack_board(p_college uuid default null)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_college uuid := p_college;
begin
  if v_college is null then
    select st.college_id into v_college from college_staff st
     where st.user_id = auth.uid() and st.archived_at is null order by st.created_at desc limit 1;
  end if;
  if v_college is null or not public._review_staff_can(v_college) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return jsonb_build_object('rows', coalesce((
    select jsonb_agg(jsonb_build_object(
             'student_id', s.id, 'name', s.name,
             'cohort', (select c.name from college_cohorts c where c.id = s.cohort_id),
             'cohort_id', s.cohort_id,
             'items', (select jsonb_agg(jsonb_build_object('key', x->>'key', 'title', x->>'title', 'status', x->>'status',
                                                           'detail', x->>'detail', 'due_date', x->>'due_date'))
                         from jsonb_array_elements(p->'items') x
                        where x->>'status' in ('missing', 'attention', 'due')),
             'counts', p->'counts')
           order by s.name)
      from college_students s
      cross join lateral (select public._learner_evidence_pack(s.id) p) pk
     where s.college_id = v_college
       and lower(coalesce(s.status, '')) not in ('archived')), '[]'::jsonb));
end; $$;

do $$
declare f text;
begin
  foreach f in array array['public.get_learner_evidence_pack(uuid)', 'public.get_evidence_pack_board(uuid)'] loop
    execute format('revoke all on function %s from public, anon', f);
    execute format('grant execute on function %s to authenticated, service_role', f);
  end loop;
end $$;
