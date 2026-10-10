-- ELE-2039 — training plan builder: para 100 contents, three-party irrefutable
-- e-signature, version history with dates in force, and the end-of-programme
-- "plan delivered" agreement.
--
-- 2026/27 funding rules (v3), verified against the PDF:
--   99     the provider develops and agrees the plan with the apprentice and employer;
--   99.1.1 a fully signed plan by the end of the 42-day qualifying period;
--   99.4   the provider IS a signatory to the training plan;
--   100    what the plan must include (100.1 to 100.14);
--   101    "At the end of the programme, the employer, provider and learner must
--           agree that the content of the training plan has been delivered."
--   103.4.1 re-signed by the employer when content, the planned end date or
--           re-planned off-the-job training changes;
--   346–347 electronic signatures accepted; "providers must ensure it is
--           irrefutable ... Where any document needs to be renewed and a new
--           signature taken, it must be clear from when the new document takes
--           effect and both must be held."
--   89     planned off-the-job hours on the agreement, the plan AND the ILR (HRS1).
--
-- Irrefutable here means:
--   * a version's content is frozen when it is issued for signature (trigger);
--   * each signature stores the SHA-256 of the exact content signed, and a
--     signature hash chaining plan hash + role + name + time + the previous
--     signature's hash, so any later edit to content or signatures shows;
--   * signatures can never be updated or deleted by anyone (trigger);
--   * the provider signs signed in; the apprentice signs signed in to their own
--     account when they have one (or by their personal link if not); the
--     employer signs through a personal link, like the hours statement;
--   * a new version supersedes the old one, which is kept with its dates in force.

create table if not exists public.college_training_plans (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  student_id uuid not null references public.college_students(id) on delete cascade,
  version integer not null,
  status text not null default 'draft' check (status in ('draft', 'awaiting_signatures', 'in_force', 'superseded', 'withdrawn')),
  content jsonb not null default '{}'::jsonb,
  content_hash text,
  planned_otj_hours numeric,
  change_reason text,
  created_by uuid references auth.users(id) on delete set null,
  created_by_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  issued_at timestamptz,
  in_force_from timestamptz,
  superseded_at timestamptz,
  superseded_by uuid references public.college_training_plans(id) on delete set null,
  delivered_requested_at timestamptz,
  delivered_at timestamptz,
  unique (student_id, version)
);
create index if not exists college_training_plans_student_idx on public.college_training_plans (student_id, version desc);

comment on table public.college_training_plans is
  '[COLLEGE ↔ APPRENTICE ↔ EMPLOYER] Versioned training plans built to funding rules 2026/27 para 100 (ELE-2039). Scope: one row per version per college_students row. Used by: Student 360 training plan card and builder, public /training-plan/sign/:token, evidence pack (training_plan, training_plan_delivered), ILR HRS1. Rule: written only through the training plan functions; content is frozen at issue (content_hash); a new version supersedes the old, which is kept with its dates in force (para 347).';

create table if not exists public.college_training_plan_signatures (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.college_training_plans(id) on delete cascade,
  purpose text not null check (purpose in ('plan', 'delivered')),
  role text not null check (role in ('apprentice', 'employer', 'provider')),
  signer_name text not null check (length(trim(signer_name)) between 2 and 200),
  signer_title text,
  signer_company text,
  signer_user_id uuid references auth.users(id) on delete set null,
  method text not null check (method in ('signed_in', 'personal_link')),
  statement text not null,
  content_hash text not null,
  prev_signature_hash text,
  signature_hash text not null,
  user_agent text,
  signed_at timestamptz not null default now(),
  unique (plan_id, purpose, role)
);

comment on table public.college_training_plan_signatures is
  '[COLLEGE ↔ APPRENTICE ↔ EMPLOYER] Signatures on a training plan version: the plan itself (paras 99, 103.4.1) and the end-of-programme agreement it was delivered (para 101). Scope: one per plan, purpose and role. Used by: training plan card, signing page, evidence pack. Rule: insert only via sign functions; never updated or deleted (trigger); each binds content_hash and chains signature_hash (para 347).';

create table if not exists public.college_training_plan_links (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.college_training_plans(id) on delete cascade,
  purpose text not null check (purpose in ('plan', 'delivered')),
  role text not null check (role in ('apprentice', 'employer')),
  token text not null unique,
  created_at timestamptz not null default now(),
  revoked_at timestamptz,
  unique (plan_id, purpose, role)
);

comment on table public.college_training_plan_links is
  '[COLLEGE] Personal signing links for a training plan version (apprentice and employer). Scope: per plan, purpose and role. Used by: training plan card (copy link), public signing page. Rule: never selectable by any client; staff fetch links through get_training_plan_links().';

alter table public.college_training_plans enable row level security;
alter table public.college_training_plan_signatures enable row level security;
alter table public.college_training_plan_links enable row level security;

drop policy if exists "college_training_plans: staff or the apprentice read" on public.college_training_plans;
create policy "college_training_plans: staff or the apprentice read"
  on public.college_training_plans for select to authenticated
  using (public._review_staff_can(college_id)
         or (status <> 'draft' and exists (select 1 from public.college_students cs
                                           where cs.id = student_id and cs.user_id = auth.uid())));

drop policy if exists "college_training_plan_signatures: staff or the apprentice read" on public.college_training_plan_signatures;
create policy "college_training_plan_signatures: staff or the apprentice read"
  on public.college_training_plan_signatures for select to authenticated
  using (exists (select 1 from public.college_training_plans p
                  join public.college_students cs on cs.id = p.student_id
                 where p.id = plan_id
                   and (public._review_staff_can(p.college_id) or cs.user_id = auth.uid())));

revoke all on public.college_training_plans from anon;
revoke all on public.college_training_plan_signatures from anon;
revoke all on public.college_training_plan_links from anon, authenticated;
revoke insert, update, delete on public.college_training_plans from authenticated;
revoke insert, update, delete on public.college_training_plan_signatures from authenticated;
grant select on public.college_training_plans to authenticated;
grant select on public.college_training_plan_signatures to authenticated;

-- Signatures are permanent.
create or replace function public.tg_training_plan_signature_immutable()
returns trigger language plpgsql set search_path = public as $$
begin
  -- The only removal allowed is the cascade when the plan itself is erased
  -- (the learner record deleted); by then the plan row is already gone.
  if tg_op = 'DELETE' and not exists (select 1 from public.college_training_plans where id = old.plan_id) then
    return old;
  end if;
  raise exception 'training plan signatures cannot be changed or removed (funding rules para 347)' using errcode = '42501';
end; $$;
drop trigger if exists training_plan_signature_immutable on public.college_training_plan_signatures;
create trigger training_plan_signature_immutable
  before update or delete on public.college_training_plan_signatures
  for each row execute function public.tg_training_plan_signature_immutable();

-- Issued content is frozen.
create or replace function public.tg_training_plan_frozen()
returns trigger language plpgsql set search_path = public as $$
begin
  if old.issued_at is not null and (new.content is distinct from old.content
       or new.content_hash is distinct from old.content_hash
       or new.planned_otj_hours is distinct from old.planned_otj_hours
       or new.version is distinct from old.version
       or new.student_id is distinct from old.student_id) then
    raise exception 'an issued training plan cannot be edited; start a new version' using errcode = '42501';
  end if;
  return new;
end; $$;
drop trigger if exists training_plan_frozen on public.college_training_plans;
create trigger training_plan_frozen
  before update on public.college_training_plans
  for each row execute function public.tg_training_plan_frozen();

create or replace function public._tp_hash(p text)
returns text language sql immutable set search_path = public as $$
  select encode(sha256(convert_to(coalesce(p, ''), 'UTF8')), 'hex');
$$;

-- What para 100 still needs, as plain sentences with the paragraph.
create or replace function public._training_plan_missing(p_content jsonb, p_student uuid)
returns text[]
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  c jsonb := coalesce(p_content, '{}'::jsonb);
  m text[] := '{}';
  s college_students;
  v_blank boolean;
begin
  select * into s from college_students where id = p_student;
  if coalesce(trim(c#>>'{apprentice,name}'), '') = '' then m := array_append(m, 'The apprentice''s name (100.1)'::text); end if;
  if coalesce(trim(c#>>'{apprentice,job_role}'), '') = '' then m := array_append(m, 'Their job role (100.1)'::text); end if;
  if coalesce((c#>>'{apprentice,weekly_hours}')::numeric, 0) <= 0 then m := array_append(m, 'Their normal weekly paid hours, excluding overtime (100.1)'::text); end if;
  if coalesce(trim(c#>>'{parties,provider}'), '') = '' then m := array_append(m, 'The provider (100.2)'::text); end if;
  if coalesce(trim(c#>>'{parties,employer}'), '') = '' then m := array_append(m, 'The employer (100.2)'::text); end if;
  -- 100.2.1: the EPAO may be unknown at the start, but no later than 6 months before the planned end.
  if coalesce(trim(c#>>'{parties,epao}'), '') = ''
     and coalesce((c#>>'{programme,practical_end}')::date, s.expected_end_date) is not null
     and (coalesce((c#>>'{programme,practical_end}')::date, s.expected_end_date) - interval '6 months')::date <= public._lon(now()) then
    m := array_append(m, 'The end-point assessment organisation: due no later than 6 months before the planned end (100.2.1)'::text);
  end if;
  if coalesce(trim(c->>'initial_assessment_summary'), '') = '' then m := array_append(m, 'A summary of the initial assessment (100.3)'::text); end if;
  if coalesce(trim(c#>>'{programme,standard}'), '') = '' then m := array_append(m, 'The apprenticeship standard (100.4)'::text); end if;
  if coalesce(trim(c#>>'{programme,level}'), '') = '' then m := array_append(m, 'The level (100.4)'::text); end if;
  if (c#>>'{programme,start_date}') is null or (c#>>'{programme,end_date}') is null then
    m := array_append(m, 'Start and end dates of the apprenticeship (100.4)'::text); end if;
  if (c#>>'{programme,practical_start}') is null or (c#>>'{programme,practical_end}') is null then
    m := array_append(m, 'Start and end dates of the practical period (100.4)'::text); end if;
  if coalesce((c->>'planned_otj_hours')::numeric, 0) <= 0 then m := array_append(m, 'Total planned off-the-job hours (100.5)'::text); end if;
  if coalesce(trim(c->>'delivery_model'), '') = '' then m := array_append(m, 'The delivery model (100.6)'::text); end if;
  if jsonb_array_length(coalesce(c->'occupational_training', '[]'::jsonb)) = 0 then
    m := array_append(m, 'The occupational training to be delivered (100.7)'::text);
  else
    select bool_or(coalesce(trim(x->>'content'), '') = '' or coalesce(trim(x->>'when'), '') = '' or coalesce(trim(x->>'who'), '') = ''
                   or (x->>'in_otj') is null)
      into v_blank from jsonb_array_elements(c->'occupational_training') x;
    if v_blank then
      m := array_append(m, 'Each training row needs what, when, who delivers it and whether it counts as off-the-job (100.7.1, 100.10, 100.11)'::text);
    end if;
  end if;
  if coalesce(trim(c#>>'{english_maths,english}'), '') = '' or coalesce(trim(c#>>'{english_maths,maths}'), '') = '' then
    m := array_append(m, 'English and maths: exempt, already achieved or to be delivered (100.8)'::text); end if;
  if (c#>>'{english_maths,english}' = 'to_deliver' or c#>>'{english_maths,maths}' = 'to_deliver')
     and coalesce((c#>>'{english_maths,not_in_otj}')::boolean, false) is not true then
    m := array_append(m, 'Confirm English and maths are not in the planned off-the-job hours (100.8.1)'::text); end if;
  if (c#>>'{prior_learning,recorded}') is null then
    m := array_append(m, 'Prior learning: what was found and left out of the plan, or that none was found (100.9)'::text); end if;
  if coalesce((c->>'employer_otj_confirmation')::boolean, false) is not true then
    m := array_append(m, 'The employer''s written confirmation of off-the-job time within normal working hours (100.12)'::text); end if;
  if coalesce((c#>>'{reviews,frequency_months}')::numeric, 0) <= 0 or coalesce(trim(c#>>'{reviews,format}'), '') = '' then
    m := array_append(m, 'Progress reviews: how often and in what format (100.13)'::text); end if;
  if coalesce(trim(c->>'complaints'), '') = '' then
    m := array_append(m, 'How to raise a query or complaint, with the escalation route (100.14)'::text); end if;
  return m;
end;
$$;
revoke all on function public._training_plan_missing(jsonb, uuid) from public, anon, authenticated;

-- A starting draft from what the hub already knows.
create or replace function public._training_plan_prefill(p_student uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  s college_students;
  sp college_learner_starting_points;
  e college_learner_epao;
  v_course record;
  v_college text;
  v_employer text;
  v_hours numeric;
begin
  select * into s from college_students where id = p_student;
  select * into sp from college_learner_starting_points where student_id = p_student;
  select * into e from college_learner_epao where student_id = p_student;
  select cc.name, cc.level, cc.code, cc.otj_required_hours into v_course
    from college_courses cc
   where cc.id = coalesce(s.course_id, (select c.course_id from college_cohorts c where c.id = s.cohort_id));
  select name into v_college from colleges where id = s.college_id;
  select company_name into v_employer from college_employers where id = s.employer_id;
  v_hours := coalesce(s.otj_required_hours, v_course.otj_required_hours);
  return jsonb_build_object(
    'apprentice', jsonb_build_object('name', s.name, 'job_role', null, 'weekly_hours', s.weekly_contracted_hours),
    'parties', jsonb_build_object('provider', v_college, 'employer', v_employer, 'subcontractors', '',
                                  'epao', e.epao_name),
    'initial_assessment_summary', nullif(concat_ws(' · ',
        case when sp.english_level is not null then 'English ' || sp.english_level end,
        case when sp.maths_level is not null then 'Maths ' || sp.maths_level end,
        case when sp.digital_level is not null then 'Digital ' || sp.digital_level end,
        sp.assessment_notes), ''),
    'programme', jsonb_build_object('standard', v_course.name, 'level', v_course.level,
                                    'start_date', s.start_date, 'end_date', null,
                                    'practical_start', s.start_date, 'practical_end', s.expected_end_date),
    'planned_otj_hours', v_hours,
    'delivery_model', case s.delivery_model when 'block_release' then 'Block release' when 'front_loaded' then 'Front-loaded'
                                            when 'day_release' then 'Day release' else s.delivery_model end,
    'occupational_training', '[]'::jsonb,
    'english_maths', jsonb_build_object('english', null, 'maths', null, 'not_in_otj', null, 'details', null),
    'prior_learning', jsonb_build_object(
        'recorded', case when sp.rpl_decision is not null then true end,
        'hours_reduced', coalesce(sp.rpl_hours_reduced, 0),
        'summary', coalesce(sp.rpl_reason, sp.prior_learning)),
    'support', null,
    'employer_otj_confirmation', null,
    'reviews', jsonb_build_object('frequency_months', coalesce(s.review_frequency_months, 3),
                                  'format', 'Three-way review with the apprentice, employer and tutor, face to face or online'),
    'complaints', 'Raise any query or complaint with your tutor first, then the apprenticeship manager at '
                  || coalesce(v_college, 'the college') || '. If it is not resolved, contact Apprenticeship Service Support on 08000 150 600 or helpdesk@manage-apprenticeships.service.gov.uk.');
end;
$$;
revoke all on function public._training_plan_prefill(uuid) from public, anon, authenticated;

-- Staff: every version with its signatures and what is missing.
create or replace function public.get_training_plans(p_student uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare v_college uuid;
begin
  select college_id into v_college from college_students where id = p_student;
  if v_college is null or not public._review_staff_can(v_college) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return jsonb_build_object(
    'can_edit', public.college_can('learners.edit', v_college, p_student),
    'prefill', public._training_plan_prefill(p_student),
    'versions', coalesce((
      select jsonb_agg(to_jsonb(p) || jsonb_build_object(
               'missing', to_jsonb(public._training_plan_missing(p.content, p.student_id)),
               'signatures', coalesce((select jsonb_agg(to_jsonb(g) - 'user_agent' order by g.signed_at)
                                         from college_training_plan_signatures g where g.plan_id = p.id), '[]'::jsonb))
             order by p.version desc)
        from college_training_plans p where p.student_id = p_student), '[]'::jsonb));
end;
$$;
revoke all on function public.get_training_plans(uuid) from public, anon;
grant execute on function public.get_training_plans(uuid) to authenticated;

-- Staff: save the draft (creates the next version's draft if none is open).
create or replace function public.save_training_plan_draft(p_student uuid, p_content jsonb, p_change_reason text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  s college_students;
  d college_training_plans;
  v_name text;
  v_next int;
  v_has_prev boolean;
begin
  select * into s from college_students where id = p_student;
  if s.id is null then raise exception 'learner not found' using errcode = 'P0002'; end if;
  if not public.college_can('learners.edit', s.college_id, p_student) then
    raise exception 'you cannot edit this learner' using errcode = '42501';
  end if;
  if p_content is null or jsonb_typeof(p_content) <> 'object' then
    raise exception 'the plan content is missing' using errcode = '22023';
  end if;
  select coalesce(nullif(trim(full_name), ''), 'Staff') into v_name from profiles where id = auth.uid();
  v_has_prev := exists (select 1 from college_training_plans where student_id = p_student and status in ('in_force', 'awaiting_signatures', 'superseded'));
  if v_has_prev and coalesce(trim(p_change_reason), '') = '' then
    raise exception 'say what changed in this version (para 103.4.1)' using errcode = '22023';
  end if;

  select * into d from college_training_plans where student_id = p_student and status = 'draft' order by version desc limit 1;
  if d.id is null then
    select coalesce(max(version), 0) + 1 into v_next from college_training_plans where student_id = p_student;
    insert into college_training_plans (college_id, student_id, version, status, content, planned_otj_hours,
                                        change_reason, created_by, created_by_name)
    values (s.college_id, p_student, v_next, 'draft', p_content, nullif((p_content->>'planned_otj_hours')::numeric, 0),
            nullif(trim(coalesce(p_change_reason, '')), ''), auth.uid(), v_name)
    returning * into d;
  else
    update college_training_plans
       set content = p_content, planned_otj_hours = nullif((p_content->>'planned_otj_hours')::numeric, 0),
           change_reason = coalesce(nullif(trim(coalesce(p_change_reason, '')), ''), change_reason), updated_at = now()
     where id = d.id returning * into d;
  end if;
  return jsonb_build_object('ok', true, 'id', d.id, 'version', d.version,
                            'missing', to_jsonb(public._training_plan_missing(d.content, p_student)));
end;
$$;
revoke all on function public.save_training_plan_draft(uuid, jsonb, text) from public, anon;
grant execute on function public.save_training_plan_draft(uuid, jsonb, text) to authenticated;

create or replace function public.discard_training_plan_draft(p_plan uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare p college_training_plans;
begin
  select * into p from college_training_plans where id = p_plan;
  if p.id is null or p.status <> 'draft' then raise exception 'only a draft can be discarded' using errcode = '22023'; end if;
  if not public.college_can('learners.edit', p.college_id, p.student_id) then
    raise exception 'you cannot edit this learner' using errcode = '42501';
  end if;
  delete from college_training_plans where id = p_plan;
  return jsonb_build_object('ok', true);
end;
$$;
revoke all on function public.discard_training_plan_draft(uuid) from public, anon;
grant execute on function public.discard_training_plan_draft(uuid) to authenticated;

-- Staff: freeze the draft and open it for the three signatures.
create or replace function public.issue_training_plan(p_plan uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  p college_training_plans;
  v_missing text[];
begin
  select * into p from college_training_plans where id = p_plan;
  if p.id is null then raise exception 'plan not found' using errcode = 'P0002'; end if;
  if not public.college_can('learners.edit', p.college_id, p.student_id) then
    raise exception 'you cannot edit this learner' using errcode = '42501';
  end if;
  if p.status <> 'draft' then raise exception 'this version has already been issued' using errcode = '22023'; end if;
  v_missing := public._training_plan_missing(p.content, p.student_id);
  if coalesce(array_length(v_missing, 1), 0) > 0 then
    return jsonb_build_object('error', 'The plan is missing what para 100 requires.', 'missing', to_jsonb(v_missing));
  end if;
  -- Only one version at a time waits for signatures.
  update college_training_plans set status = 'withdrawn', updated_at = now()
   where student_id = p.student_id and status = 'awaiting_signatures';

  update college_training_plans
     set status = 'awaiting_signatures', issued_at = now(), content_hash = public._tp_hash(p.content::text), updated_at = now()
   where id = p.id returning * into p;

  insert into college_training_plan_links (plan_id, purpose, role, token)
  values (p.id, 'plan', 'apprentice', replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '')),
         (p.id, 'plan', 'employer', replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', ''))
  on conflict (plan_id, purpose, role) do nothing;

  begin
    insert into user_notifications (user_id, type, title, message, link, metadata)
    select cs.user_id, 'training_plan', 'Sign your training plan',
           'Your college has issued version ' || p.version || ' of your training plan. Read it and sign.',
           '/training-plan/sign/' || l.token, jsonb_build_object('plan_id', p.id)
      from college_students cs join college_training_plan_links l on l.plan_id = p.id and l.role = 'apprentice' and l.purpose = 'plan'
     where cs.id = p.student_id and cs.user_id is not null;
  exception when others then null;
  end;

  return jsonb_build_object('ok', true, 'id', p.id, 'content_hash', p.content_hash);
end;
$$;
revoke all on function public.issue_training_plan(uuid) from public, anon;
grant execute on function public.issue_training_plan(uuid) to authenticated;

-- Staff: ask for the end-of-programme agreement that the plan was delivered (para 101).
create or replace function public.request_training_plan_delivered(p_plan uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare p college_training_plans;
begin
  select * into p from college_training_plans where id = p_plan;
  if p.id is null then raise exception 'plan not found' using errcode = 'P0002'; end if;
  if not public.college_can('learners.edit', p.college_id, p.student_id) then
    raise exception 'you cannot edit this learner' using errcode = '42501';
  end if;
  if p.status <> 'in_force' then
    raise exception 'only the plan in force can be confirmed as delivered' using errcode = '22023';
  end if;
  update college_training_plans set delivered_requested_at = coalesce(delivered_requested_at, now()), updated_at = now() where id = p.id;
  insert into college_training_plan_links (plan_id, purpose, role, token)
  values (p.id, 'delivered', 'apprentice', replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '')),
         (p.id, 'delivered', 'employer', replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', ''))
  on conflict (plan_id, purpose, role) do nothing;
  return jsonb_build_object('ok', true);
end;
$$;
revoke all on function public.request_training_plan_delivered(uuid) from public, anon;
grant execute on function public.request_training_plan_delivered(uuid) to authenticated;

-- Staff: the personal links for the apprentice and employer.
create or replace function public.get_training_plan_links(p_plan uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare p college_training_plans;
begin
  select * into p from college_training_plans where id = p_plan;
  if p.id is null or not public.college_can('learners.edit', p.college_id, p.student_id) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return coalesce((select jsonb_agg(jsonb_build_object('purpose', l.purpose, 'role', l.role, 'token', l.token))
                     from college_training_plan_links l where l.plan_id = p_plan and l.revoked_at is null), '[]'::jsonb);
end;
$$;
revoke all on function public.get_training_plan_links(uuid) from public, anon;
grant execute on function public.get_training_plan_links(uuid) to authenticated;

create or replace function public._training_plan_statement(p_purpose text, p_role text)
returns text language sql immutable set search_path = public as $$
  select case
    when p_purpose = 'delivered' then
      'I agree that the content of this training plan has been delivered (funding rules para 101).'
    when p_role = 'employer' then
      'I have read this training plan and agree to it. I confirm the apprentice will be allowed to do their off-the-job training, and any English and maths named in it, within their normal working hours (para 100.12).'
    when p_role = 'apprentice' then
      'I have read this training plan, had the chance to contribute to it, and agree to it.'
    else
      'On behalf of the provider, I agree this training plan with the apprentice and the employer.'
  end;
$$;

-- The one place a signature is written.
create or replace function public._sign_training_plan(
  p_plan uuid, p_purpose text, p_role text, p_name text, p_title text, p_company text,
  p_user uuid, p_method text, p_user_agent text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  p college_training_plans;
  v_prev text;
  v_at timestamptz := now();
  v_sig text;
  v_count int;
  v_old uuid;
  v_hours int;
begin
  select * into p from college_training_plans where id = p_plan for update;
  if p.id is null then raise exception 'plan not found' using errcode = 'P0002'; end if;
  if p_purpose = 'plan' and p.status <> 'awaiting_signatures' then
    return jsonb_build_object('error', 'This version is no longer waiting for signatures.');
  end if;
  if p_purpose = 'delivered' and (p.status <> 'in_force' or p.delivered_requested_at is null) then
    return jsonb_build_object('error', 'This plan is not waiting for the delivered agreement.');
  end if;
  if coalesce(length(trim(p_name)), 0) < 2 then
    return jsonb_build_object('error', 'Type your full name to sign.');
  end if;
  if exists (select 1 from college_training_plan_signatures where plan_id = p.id and purpose = p_purpose and role = p_role) then
    return jsonb_build_object('error', 'Already signed.');
  end if;

  select signature_hash into v_prev from college_training_plan_signatures
   where plan_id = p.id order by signed_at desc, id desc limit 1;
  v_sig := public._tp_hash(concat_ws('|', p.content_hash, p_purpose, p_role, trim(p_name), coalesce(p_user::text, ''),
                                     to_char(v_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'), coalesce(v_prev, '')));
  insert into college_training_plan_signatures (plan_id, purpose, role, signer_name, signer_title, signer_company, signer_user_id,
                                                method, statement, content_hash, prev_signature_hash, signature_hash, user_agent, signed_at)
  values (p.id, p_purpose, p_role, trim(p_name), nullif(trim(coalesce(p_title, '')), ''), nullif(trim(coalesce(p_company, '')), ''),
          p_user, p_method, public._training_plan_statement(p_purpose, p_role), p.content_hash, v_prev, v_sig,
          left(p_user_agent, 300), v_at);

  select count(*) into v_count from college_training_plan_signatures where plan_id = p.id and purpose = p_purpose;
  if v_count = 3 and p_purpose = 'plan' then
    select id into v_old from college_training_plans where student_id = p.student_id and status = 'in_force' and id <> p.id;
    update college_training_plans set status = 'superseded', superseded_at = v_at, superseded_by = p.id, updated_at = now()
     where id = v_old;
    update college_training_plans set status = 'in_force', in_force_from = v_at, updated_at = now() where id = p.id;
    -- Para 89: the planned hours on the plan are the planned hours on the ILR (HRS1).
    v_hours := round(p.planned_otj_hours);
    if v_hours is not null and v_hours > 0 then
      update college_students set otj_required_hours = v_hours where id = p.student_id;
    end if;
  elsif v_count = 3 and p_purpose = 'delivered' then
    update college_training_plans set delivered_at = v_at, updated_at = now() where id = p.id;
  end if;
  return jsonb_build_object('ok', true, 'signature_hash', v_sig, 'complete', v_count = 3);
end;
$$;
revoke all on function public._sign_training_plan(uuid, text, text, text, text, text, uuid, text, text) from public, anon, authenticated;

-- Staff sign for the provider, signed in.
create or replace function public.sign_training_plan_as_provider(p_plan uuid, p_purpose text, p_name text, p_title text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare p college_training_plans; v_college text;
begin
  select * into p from college_training_plans where id = p_plan;
  if p.id is null or not public.college_can('learners.edit', p.college_id, p.student_id) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  if p_purpose not in ('plan', 'delivered') then raise exception 'unknown purpose' using errcode = '22023'; end if;
  select name into v_college from colleges where id = p.college_id;
  return public._sign_training_plan(p_plan, p_purpose, 'provider', p_name, p_title, v_college, auth.uid(), 'signed_in', null);
end;
$$;
revoke all on function public.sign_training_plan_as_provider(uuid, text, text, text) from public, anon;
grant execute on function public.sign_training_plan_as_provider(uuid, text, text, text) to authenticated;

-- Public: what a personal link shows.
create or replace function public.get_training_plan_for_signing(p_token text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  l college_training_plan_links;
  p college_training_plans;
  s college_students;
begin
  select * into l from college_training_plan_links where token = p_token and revoked_at is null;
  if l.id is null then return jsonb_build_object('error', 'This link is not valid.'); end if;
  select * into p from college_training_plans where id = l.plan_id;
  select * into s from college_students where id = p.student_id;
  return jsonb_build_object(
    'purpose', l.purpose, 'role', l.role,
    'plan', jsonb_build_object('id', p.id, 'version', p.version, 'status', p.status, 'content', p.content,
                               'content_hash', p.content_hash, 'issued_at', p.issued_at, 'in_force_from', p.in_force_from,
                               'change_reason', p.change_reason, 'delivered_at', p.delivered_at),
    'learner', s.name,
    'college', (select name from colleges where id = p.college_id),
    'needs_sign_in', l.role = 'apprentice' and s.user_id is not null,
    'signed_in_as_learner', s.user_id is not null and s.user_id = auth.uid(),
    'statement', public._training_plan_statement(l.purpose, l.role),
    'open', case when l.purpose = 'plan' then p.status = 'awaiting_signatures'
                 else p.status = 'in_force' and p.delivered_requested_at is not null end,
    'signatures', coalesce((select jsonb_agg(jsonb_build_object('role', g.role, 'signer_name', g.signer_name,
                                                                'signed_at', g.signed_at, 'signature_hash', g.signature_hash)
                                             order by g.signed_at)
                              from college_training_plan_signatures g where g.plan_id = p.id and g.purpose = l.purpose), '[]'::jsonb));
end;
$$;
revoke all on function public.get_training_plan_for_signing(text) from public;
grant execute on function public.get_training_plan_for_signing(text) to anon, authenticated;

-- Public: sign by personal link. The apprentice must be signed in to their own
-- account when they have one.
create or replace function public.sign_training_plan_by_link(
  p_token text, p_name text, p_title text default null, p_company text default null, p_user_agent text default null)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  l college_training_plan_links;
  p college_training_plans;
  s college_students;
begin
  select * into l from college_training_plan_links where token = p_token and revoked_at is null;
  if l.id is null then return jsonb_build_object('error', 'This link is not valid.'); end if;
  select * into p from college_training_plans where id = l.plan_id;
  select * into s from college_students where id = p.student_id;
  if l.role = 'apprentice' and s.user_id is not null and s.user_id is distinct from auth.uid() then
    return jsonb_build_object('error', 'Sign in to Elec-Mate as ' || s.name || ' to sign.', 'needs_sign_in', true);
  end if;
  return public._sign_training_plan(p.id, l.purpose, l.role, p_name, p_title, p_company,
                                    case when l.role = 'apprentice' then auth.uid() end,
                                    case when l.role = 'apprentice' and auth.uid() is not null then 'signed_in' else 'personal_link' end,
                                    p_user_agent);
end;
$$;
revoke all on function public.sign_training_plan_by_link(text, text, text, text, text) from public;
grant execute on function public.sign_training_plan_by_link(text, text, text, text, text) to anon, authenticated;

-- Anyone holding the plan can check it has not been altered since signing.
create or replace function public.verify_training_plan(p_plan uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  p college_training_plans;
  g record;
  v_prev text := null;
  v_ok boolean := true;
  v_content_ok boolean;
begin
  select * into p from college_training_plans where id = p_plan;
  if p.id is null then raise exception 'plan not found' using errcode = 'P0002'; end if;
  if not (public._review_staff_can(p.college_id)
          or exists (select 1 from college_students cs where cs.id = p.student_id and cs.user_id = auth.uid())) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  v_content_ok := p.content_hash is null or p.content_hash = public._tp_hash(p.content::text);
  for g in select * from college_training_plan_signatures where plan_id = p.id order by signed_at, id loop
    if g.content_hash <> p.content_hash or coalesce(g.prev_signature_hash, '') <> coalesce(v_prev, '')
       or g.signature_hash <> public._tp_hash(concat_ws('|', g.content_hash, g.purpose, g.role, g.signer_name,
                                 coalesce(g.signer_user_id::text, ''),
                                 to_char(g.signed_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'), coalesce(v_prev, ''))) then
      v_ok := false;
    end if;
    v_prev := g.signature_hash;
  end loop;
  return jsonb_build_object('content_unchanged', v_content_ok, 'signatures_intact', v_ok, 'content_hash', p.content_hash);
end;
$$;
revoke all on function public.verify_training_plan(uuid) from public, anon;
grant execute on function public.verify_training_plan(uuid) to authenticated;
