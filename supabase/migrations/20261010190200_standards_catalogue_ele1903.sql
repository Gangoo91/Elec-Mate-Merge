-- ELE-1903: versioned standards catalogue — standard → qualification → unit →
-- LO → AC, with effective dates, aliases across awarding bodies, and ONE read
-- API: catalogue_for().
--
-- STRUCTURE AND READ API ONLY. No criteria are written here. The 2,581 rows in
-- qualification_requirements stay exactly as they are; the new date columns
-- are empty (null = "no version recorded", treated as open-ended) until a
-- person fills them from the awarding body's published specification.
--
-- The only rows inserted are structural facts with a cited source:
--   ST0152 v1.2 (Skills England): approved for starts 21 Jul 2025 – 16 Dec 2026.
--   Its gateway qualifications, as NET lists them for the AM2S v1:
--     C&G 5357 and EAL 601/7345/2 (netservices.org.uk/am2s-v1, read 6 Oct 2026).
--   Its end assessment: AM2S v1 for apprentices registered from Sept 2023 (same page).
-- KSB → criterion links are NOT inserted: no source mapping is held. The
-- table exists, empty, for a person to fill (see ksb_criteria_links).
-- Aliases stay where they are: qualification_requirement_mappings (e.g. 3529 →
-- 2365-03, EAL apprenticeship codes → 601/7345/2). EAL and City & Guilds are
-- never cross-linked.

/* ── Versions on what already exists ─────────────────────────────────── */

alter table public.qualifications
  add column if not exists version_label text,
  add column if not exists effective_from date,
  add column if not exists effective_to date;

comment on column public.qualifications.version_label is
  '[COLLEGE] ELE-1903. The specification version the criteria rows are transcribed from (e.g. "Issue 8"). Null = not recorded.';
comment on column public.qualifications.effective_from is
  '[COLLEGE] ELE-1903. First registration date this version applies to. Null = open-ended.';
comment on column public.qualifications.effective_to is
  '[COLLEGE] ELE-1903. Last registration date this version applies to. Null = open-ended.';

alter table public.qualification_requirements
  add column if not exists version_label text,
  add column if not exists effective_from date,
  add column if not exists effective_to date;

comment on column public.qualification_requirements.effective_from is
  '[COLLEGE] ELE-1903. A criterion added in a later issue: the first registration date it applies to. Null = applies to every version.';
comment on column public.qualification_requirements.effective_to is
  '[COLLEGE] ELE-1903. A criterion withdrawn in a later issue: the last registration date it applies to. Null = still current.';
comment on column public.qualification_requirements.version_label is
  '[COLLEGE] ELE-1903. The issue this criterion row comes from, when it differs from its qualification''s version_label.';

/* ── The apprenticeship standard as a first-class row ────────────────── */

create table if not exists public.apprenticeship_standards (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  version text not null,
  title text not null,
  level text,
  nation text,
  effective_from date,
  effective_to date,
  source text not null,
  source_url text,
  created_at timestamptz not null default now(),
  unique (code, version)
);

comment on table public.apprenticeship_standards is
  '[COLLEGE] ELE-1903. An apprenticeship standard version (e.g. ST0152 v1.2) with the start dates it is approved for. Only sourced facts; read through catalogue_for().';

create table if not exists public.standard_qualifications (
  id uuid primary key default gen_random_uuid(),
  standard_id uuid not null references public.apprenticeship_standards(id) on delete cascade,
  qualification_code text not null,
  role text not null default 'gateway_qualification',
  source text not null,
  created_at timestamptz not null default now(),
  unique (standard_id, qualification_code)
);

comment on table public.standard_qualifications is
  '[COLLEGE] ELE-1903. Which qualifications a standard version requires (e.g. ST0152 → C&G 5357 or EAL 601/7345/2). Codes as in qualifications.code.';

create table if not exists public.standard_end_assessments (
  id uuid primary key default gen_random_uuid(),
  standard_code text not null,
  assessment_code text not null,
  assessment_version text,
  registered_from date,
  registered_to date,
  source text not null,
  source_url text,
  created_at timestamptz not null default now(),
  unique (standard_code, assessment_code, assessment_version)
);

comment on table public.standard_end_assessments is
  '[COLLEGE] ELE-1903. The end assessment a standard leads to, by the apprentice''s registration date (e.g. ST0152 → AM2S v1 from Sept 2023). AM2, AM2S, AM2D, AM2E and FICA are different assessments and are never merged.';

create table if not exists public.ksb_criteria_links (
  id uuid primary key default gen_random_uuid(),
  ksb_id uuid not null references public.apprenticeship_ksbs(id) on delete cascade,
  requirement_id uuid not null references public.qualification_requirements(id) on delete cascade,
  source text not null,
  created_by uuid,
  created_at timestamptz not null default now(),
  unique (ksb_id, requirement_id)
);

comment on table public.ksb_criteria_links is
  '[COLLEGE] ELE-1903. KSB → the qualification criteria that evidence it. EMPTY by design: filled by a person from the awarding body''s published KSB mapping, never generated.';

do $$
declare t text;
begin
  foreach t in array array['apprenticeship_standards', 'standard_qualifications',
                           'standard_end_assessments', 'ksb_criteria_links'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "Signed-in users read the catalogue" on public.%I', t);
    execute format('create policy "Signed-in users read the catalogue" on public.%I for select to authenticated using (true)', t);
    execute format('revoke all on public.%I from anon', t);
    execute format('revoke insert, update, delete on public.%I from authenticated', t);
    execute format('grant select on public.%I to authenticated', t);
  end loop;
end $$;

/* ── Sourced structural rows ─────────────────────────────────────────── */

insert into public.apprenticeship_standards
  (code, version, title, level, nation, effective_from, effective_to, source, source_url)
values
  ('ST0152', '1.2', 'Installation and maintenance electrician', 'Level 3', 'England',
   '2025-07-21', '2026-12-16',
   'Skills England occupational standard page for ST0152 v1.2: approved for starts 21/07/2025 to 16/12/2026 (read 8 Oct 2026). Earlier versions and the revised plan from 17/12/2026 are not recorded yet.',
   null)
on conflict (code, version) do nothing;

insert into public.standard_qualifications (standard_id, qualification_code, role, source)
select s.id, q.code, 'gateway_qualification',
       'NET AM2S v1 gateway documents: C&G 5357-23/94 or EAL 601/7345/2 (netservices.org.uk/am2s-v1, read 6 Oct 2026)'
  from public.apprenticeship_standards s
  cross join (values ('5357'), ('601/7345/2')) as q(code)
 where s.code = 'ST0152' and s.version = '1.2'
on conflict (standard_id, qualification_code) do nothing;

insert into public.standard_end_assessments
  (standard_code, assessment_code, assessment_version, registered_from, registered_to, source, source_url)
values
  ('ST0152', 'AM2S', 'v1', '2023-09-01', null,
   'NET: AM2S v1 is for apprentices registered on the standard from September 2023 (Pre-Assessment Manual v2025.03).',
   'https://www.netservices.org.uk/am2s-v1/')
on conflict (standard_code, assessment_code, assessment_version) do nothing;

/* ── The one read API ────────────────────────────────────────────────── */

create or replace function public.catalogue_for(
  p_student_id uuid default null,
  p_user_id uuid default null,
  p_qualification_code text default null,
  p_as_of date default null
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_resolved jsonb;
  v_code text;
  v_req text;
  v_start date;
  v_as_of date;
  v_q public.qualifications%rowtype;
  v_std public.apprenticeship_standards%rowtype;
  v_std_match text := 'none';
  v_q_match text;
  v_assess jsonb;
  v_ksbs jsonb;
  v_units jsonb;
  v_counts jsonb;
  v_aliases jsonb;
  v_gaps text[] := '{}';
begin
  if auth.uid() is null then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  if p_student_id is not null or p_user_id is not null or p_qualification_code is null then
    -- A learner's catalogue. resolve_learner_qualification enforces who may
    -- look (the learner, their college staff, platform admin) and raises otherwise.
    v_resolved := public.resolve_learner_qualification(p_user_id, p_student_id);
    v_code := coalesce(p_qualification_code, v_resolved ->> 'code');
    if (v_resolved ->> 'college_student_id') is not null then
      select start_date into v_start
        from public.college_students
       where id = (v_resolved ->> 'college_student_id')::uuid;
    end if;
  else
    -- A qualification on its own: not personal, any signed-in user.
    v_code := p_qualification_code;
  end if;

  v_as_of := coalesce(p_as_of, v_start, current_date);

  if v_code is null then
    return jsonb_build_object(
      'as_of', v_as_of, 'resolved', v_resolved, 'qualification', null,
      'standard', null, 'units', '[]'::jsonb,
      'gaps', to_jsonb(array['no_qualification']));
  end if;

  select * into v_q from public.qualifications where code = v_code limit 1;
  select m.requirement_code into v_req
    from public.qualification_requirement_mappings m
   where m.qualification_code = v_code
   order by m.is_primary desc nulls last
   limit 1;
  v_req := coalesce(v_req, v_code);

  -- Every code that shares these criteria rows (awarding-body aliases).
  select coalesce(jsonb_agg(distinct m.qualification_code order by m.qualification_code), '[]'::jsonb)
    into v_aliases
    from public.qualification_requirement_mappings m
   where m.requirement_code = v_req and m.qualification_code <> v_code;

  v_q_match := case
    when v_q.id is null then 'unknown_code'
    when v_q.effective_from is null and v_q.effective_to is null then 'no_version_recorded'
    when (v_q.effective_from is null or v_q.effective_from <= v_as_of)
     and (v_q.effective_to is null or v_q.effective_to >= v_as_of) then 'in_range'
    else 'outside_range'
  end;
  if v_q_match = 'no_version_recorded' then v_gaps := array_append(v_gaps, 'qualification_version_dates'); end if;

  -- The standard this qualification evidences: the version whose start
  -- window holds the learner's start date, else the latest recorded one.
  select s.* into v_std
    from public.apprenticeship_standards s
    join public.standard_qualifications sq on sq.standard_id = s.id
   where sq.qualification_code in (v_code, v_req)
   order by ((s.effective_from is null or s.effective_from <= v_as_of)
             and (s.effective_to is null or s.effective_to >= v_as_of)) desc,
            s.effective_from desc nulls last
   limit 1;
  if v_std.id is not null then
    v_std_match := case
      when (v_std.effective_from is null or v_std.effective_from <= v_as_of)
       and (v_std.effective_to is null or v_std.effective_to >= v_as_of) then 'in_range'
      else 'no_version_for_date'
    end;
    if v_std_match <> 'in_range' then v_gaps := array_append(v_gaps, 'standard_version_for_date'); end if;

    select to_jsonb(a) - 'id' - 'created_at' into v_assess
      from public.standard_end_assessments a
     where a.standard_code = v_std.code
       and (a.registered_from is null or a.registered_from <= v_as_of)
       and (a.registered_to is null or a.registered_to >= v_as_of)
     order by a.registered_from desc nulls last
     limit 1;
    if v_assess is null then v_gaps := array_append(v_gaps, 'end_assessment_for_date'); end if;

    select coalesce(jsonb_agg(x order by x ->> 'type', (x ->> 'sort')::int), '[]'::jsonb) into v_ksbs
      from (
        select distinct on (k.ksb_code)
               jsonb_build_object(
                 'id', k.id, 'type', k.ksb_type, 'code', k.ksb_code, 'title', k.title,
                 'sort', k.sort_order,
                 'criteria', coalesce((select jsonb_agg(l.requirement_id)
                                         from public.ksb_criteria_links l
                                        where l.ksb_id = k.id), '[]'::jsonb)) as x
          from public.apprenticeship_ksbs k
          join public.qualifications kq on kq.id = k.qualification_id
          join public.standard_qualifications sq
            on sq.standard_id = v_std.id and sq.qualification_code = kq.code
         order by k.ksb_code, k.created_at
      ) s;
    if not exists (
      select 1 from public.ksb_criteria_links l
        join public.apprenticeship_ksbs k on k.id = l.ksb_id
        join public.qualifications kq on kq.id = k.qualification_id
        join public.standard_qualifications sq on sq.standard_id = v_std.id and sq.qualification_code = kq.code
    ) then
      v_gaps := array_append(v_gaps, 'ksb_criteria_links');
    end if;
  end if;

  -- Units → LOs → ACs in force on the date, each AC with its Study/Practise links.
  with acs as (
    select r.id, r.unit_code, r.unit_title, r.lo_number, r.lo_text, r.ac_code, r.ac_text,
           r.canonical_ac_id, r.effective_from, r.effective_to
      from public.qualification_requirements r
     where r.qualification_code = v_req
       and (r.effective_from is null or r.effective_from <= v_as_of)
       and (r.effective_to is null or r.effective_to >= v_as_of)
  ),
  links as (
    select l.requirement_id,
           jsonb_agg(jsonb_build_object(
             'kind', l.kind, 'route', l.route, 'title', l.title, 'minutes', l.minutes,
             'question_count', l.question_count, 'bank_slug', l.bank_slug,
             'via', l.via, 'via_qualification', l.via_qualification)
             order by l.kind, (l.via = 'direct') desc, l.route) as items
      from public._ac_study_links_for(v_req) l
     group by l.requirement_id
  ),
  ac_json as (
    select a.unit_code, a.unit_title, a.lo_number, a.lo_text, a.ac_code,
           jsonb_build_object(
             'id', a.id, 'ac_code', a.ac_code, 'ac_text', a.ac_text,
             'canonical_ac_id', a.canonical_ac_id,
             'effective_from', a.effective_from, 'effective_to', a.effective_to,
             'links', coalesce(l.items, '[]'::jsonb)) as j,
           l.items is not null and l.items @> '[{"kind":"study"}]' as has_study,
           l.items is not null and l.items @> '[{"kind":"practise"}]' as has_practise
      from acs a left join links l on l.requirement_id = a.id
  ),
  los as (
    select unit_code, unit_title, lo_number, max(lo_text) as lo_text,
           jsonb_agg(j order by (case when ac_code ~ '^[0-9]+(\.[0-9]+)*$' then string_to_array(ac_code, '.')::int[] end), ac_code) as acs
      from ac_json
     group by unit_code, unit_title, lo_number
  ),
  units as (
    select unit_code, max(unit_title) as unit_title,
           jsonb_agg(jsonb_build_object('lo_number', lo_number, 'lo_text', lo_text, 'acs', acs)
                     order by lo_number) as los
      from los
     group by unit_code
  )
  select coalesce(jsonb_agg(jsonb_build_object('unit_code', unit_code, 'unit_title', unit_title, 'los', los)
                            order by unit_code), '[]'::jsonb),
         (select jsonb_build_object(
                   'units', count(distinct unit_code),
                   'los', count(distinct (unit_code, lo_number)),
                   'acs', count(*),
                   'acs_with_study', count(*) filter (where has_study),
                   'acs_with_practise', count(*) filter (where has_practise))
            from ac_json)
    into v_units, v_counts
    from units;

  if coalesce((v_counts ->> 'acs')::int, 0) = 0 then v_gaps := array_append(v_gaps, 'no_criteria_loaded'); end if;

  return jsonb_build_object(
    'as_of', v_as_of,
    'learner_start_date', v_start,
    'resolved', v_resolved,
    'qualification', jsonb_build_object(
      'code', v_code,
      'requirement_code', v_req,
      'aliases', v_aliases,
      'title', v_q.title,
      'awarding_body', v_q.awarding_body,
      'level', v_q.level,
      'version_label', v_q.version_label,
      'effective_from', v_q.effective_from,
      'effective_to', v_q.effective_to,
      'version_match', v_q_match),
    'standard', case when v_std.id is null then null else jsonb_build_object(
      'code', v_std.code,
      'version', v_std.version,
      'title', v_std.title,
      'level', v_std.level,
      'nation', v_std.nation,
      'effective_from', v_std.effective_from,
      'effective_to', v_std.effective_to,
      'version_match', v_std_match,
      'source', v_std.source,
      'end_assessment', v_assess,
      'ksbs', coalesce(v_ksbs, '[]'::jsonb)) end,
    'units', v_units,
    'counts', v_counts,
    'gaps', to_jsonb(v_gaps));
end;
$$;

revoke all on function public.catalogue_for(uuid, uuid, text, date) from public, anon;
grant execute on function public.catalogue_for(uuid, uuid, text, date) to authenticated;

comment on function public.catalogue_for(uuid, uuid, text, date) is
  '[COLLEGE] ELE-1903. THE read API for the standards catalogue: standard (version by start date, end assessment, KSBs) → qualification (version, aliases) → units → LOs → ACs in force on the date, each AC with its Study/Practise links (ELE-1904). Pass a learner (student id or user id; their start date picks the version) or a qualification code alone. "gaps" lists what a person still has to supply. Learner reads are checked by resolve_learner_qualification.';
