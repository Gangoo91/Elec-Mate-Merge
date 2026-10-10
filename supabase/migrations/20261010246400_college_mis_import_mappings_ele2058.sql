-- ELE-2058 MIS sync, step 1: saved, re-runnable import mappings for MIS
-- export files. ADDITIVE ONLY.
--
-- What the market research found (10 Oct 2026): ProSolution and UNIT-e have
-- no public API and both export ILR XML and CSV; Tribal ebs documents REST
-- services; Tribal Maytas has an OData API and webhooks behind a Power
-- Platform connector, 100 calls a minute. So step 1 reads the files every MIS
-- can produce: a CSV export (any of ebs, ProSolution, UNIT-e or another
-- system), mapped column by column once and saved, or the ILR XML file, whose
-- field names are fixed by the ILR specification. Step 2 (Maytas and ebs
-- connectors) is a documented design that waits for a college's credentials:
-- see src/lib/college/misConnectors.ts. Nothing here talks to an MIS.
--
-- A run never creates logins itself: rows that match nobody are handed back
-- to the existing roster import (college-roster-import), which creates or
-- invites them, then the dates are applied on a second pass.
--
-- 1. college_mis_mappings     a named mapping: system, file kind, columns, cohort codes
-- 2. college_mis_runs         every real run: who, file, counts, row outcomes
-- 3. college_mis_mapping_save() / _delete()
-- 4. college_mis_apply()      match rows to learners; plan (dry run) or apply

-- 1 ───────────────────────────────────────────────────────────────────────
create table if not exists public.college_mis_mappings (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  name text not null check (length(trim(name)) between 2 and 80),
  mis_system text not null check (mis_system in ('ebs', 'prosolution', 'unit_e', 'maytas', 'other')),
  file_kind text not null default 'csv' check (file_kind in ('csv', 'ilr_xml')),
  column_map jsonb not null default '{}'::jsonb,
  date_order text not null default 'dmy' check (date_order in ('dmy', 'ymd', 'mdy')),
  cohort_map jsonb not null default '{}'::jsonb,
  options jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now(),
  last_run_at timestamptz,
  last_run_summary jsonb
);
create unique index if not exists college_mis_mappings_name_uq
  on public.college_mis_mappings (college_id, lower(name));
alter table public.college_mis_mappings enable row level security;
drop policy if exists "College staff read MIS mappings" on public.college_mis_mappings;
create policy "College staff read MIS mappings" on public.college_mis_mappings
  for select to authenticated using (public.college_can('learners.edit', college_id));
comment on table public.college_mis_mappings is
  '[COLLEGE] A saved import mapping for an MIS export file (ebs, ProSolution, UNIT-e, Maytas or other): which column holds which learner field, the date order, and MIS group codes to cohorts. Holds no credentials and no learner data. Scope: per college. Used by: MIS sync page. Rule: write via college_mis_mapping_save(); re-run with college_mis_apply().';

-- 2 ───────────────────────────────────────────────────────────────────────
create table if not exists public.college_mis_runs (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  mapping_id uuid references public.college_mis_mappings(id) on delete set null,
  run_by uuid references auth.users(id) on delete set null,
  file_name text,
  rows_total integer not null default 0,
  matched integer not null default 0,
  updated integer not null default 0,
  unchanged integer not null default 0,
  new_learners integer not null default 0,
  skipped integer not null default 0,
  items jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists college_mis_runs_college_idx on public.college_mis_runs (college_id, created_at desc);
alter table public.college_mis_runs enable row level security;
drop policy if exists "College staff read MIS runs" on public.college_mis_runs;
create policy "College staff read MIS runs" on public.college_mis_runs
  for select to authenticated using (public.college_can('learners.edit', college_id));
comment on table public.college_mis_runs is
  '[COLLEGE] One real run of an MIS import: who ran it, the file name, counts and each row''s outcome (row number, learner id, fields changed; never the raw file). Scope: per college. Used by: MIS sync page history. Rule: append-only, written by college_mis_apply().';

-- 3 ───────────────────────────────────────────────────────────────────────
create or replace function public.college_mis_mapping_save(
  p_college uuid, p_id uuid, p_name text, p_system text, p_file_kind text,
  p_column_map jsonb, p_date_order text, p_cohort_map jsonb, p_options jsonb)
returns uuid
language plpgsql volatile security definer set search_path to 'public'
as $$
declare v_id uuid; k text; v text;
begin
  if not public.college_can('learners.edit', p_college) then
    raise exception 'you cannot import learners for this college' using errcode = '42501';
  end if;
  if jsonb_typeof(coalesce(p_column_map, '{}'::jsonb)) <> 'object'
     or jsonb_typeof(coalesce(p_cohort_map, '{}'::jsonb)) <> 'object' then
    raise exception 'mapping must be an object' using errcode = '22023';
  end if;
  for k in select jsonb_object_keys(coalesce(p_column_map, '{}'::jsonb)) loop
    if k not in ('learner_ref', 'uln', 'email', 'name', 'given_names', 'family_name', 'date_of_birth',
                 'ni_number', 'start_date', 'planned_end_date', 'actual_end_date', 'cohort_code', 'phone') then
      raise exception 'unknown field %', k using errcode = '22023';
    end if;
  end loop;
  -- Cohort codes must point at this college's cohorts.
  for k, v in select key, value #>> '{}' from jsonb_each(coalesce(p_cohort_map, '{}'::jsonb)) loop
    if not exists (select 1 from public.college_cohorts c where c.id::text = v and c.college_id = p_college) then
      raise exception 'cohort for code % is not in your college', k using errcode = '22023';
    end if;
  end loop;
  if p_id is null then
    insert into public.college_mis_mappings (college_id, name, mis_system, file_kind, column_map, date_order,
                                             cohort_map, options, created_by, updated_by)
    values (p_college, trim(p_name), p_system, coalesce(p_file_kind, 'csv'), coalesce(p_column_map, '{}'),
            coalesce(p_date_order, 'dmy'), coalesce(p_cohort_map, '{}'), coalesce(p_options, '{}'),
            auth.uid(), auth.uid())
    returning id into v_id;
  else
    update public.college_mis_mappings set
      name = trim(p_name), mis_system = p_system, file_kind = coalesce(p_file_kind, file_kind),
      column_map = coalesce(p_column_map, column_map), date_order = coalesce(p_date_order, date_order),
      cohort_map = coalesce(p_cohort_map, cohort_map), options = coalesce(p_options, options),
      updated_by = auth.uid(), updated_at = now()
    where id = p_id and college_id = p_college
    returning id into v_id;
    if v_id is null then raise exception 'mapping not found' using errcode = '22023'; end if;
  end if;
  return v_id;
end;
$$;
revoke all on function public.college_mis_mapping_save(uuid, uuid, text, text, text, jsonb, text, jsonb, jsonb) from public, anon;
grant execute on function public.college_mis_mapping_save(uuid, uuid, text, text, text, jsonb, text, jsonb, jsonb) to authenticated;

create or replace function public.college_mis_mapping_delete(p_id uuid)
returns void
language plpgsql volatile security definer set search_path to 'public'
as $$
declare v_college uuid;
begin
  select college_id into v_college from public.college_mis_mappings where id = p_id;
  if v_college is null or not public.college_can('learners.edit', v_college) then
    raise exception 'mapping not found' using errcode = '42501';
  end if;
  delete from public.college_mis_mappings where id = p_id;
end;
$$;
revoke all on function public.college_mis_mapping_delete(uuid) from public, anon;
grant execute on function public.college_mis_mapping_delete(uuid) to authenticated;

-- 4 ───────────────────────────────────────────────────────────────────────
-- p_rows: [{row, learner_ref, uln, email, name, date_of_birth, ni_number,
--           start_date, planned_end_date, actual_end_date, cohort_code, cohort_id?}],
-- already mapped and dates normalised to YYYY-MM-DD by the page (and checked
-- again here). Match order: learner reference, then ULN, then email.
-- Applies only fields the file has a value for and that differ; a cohort is
-- filled only when the learner has none (a different cohort is reported, not
-- moved). Unmatched rows come back as `new` for the roster import.
create or replace function public.college_mis_apply(
  p_college uuid, p_mapping uuid, p_rows jsonb, p_dry_run boolean, p_file_name text)
returns json
language plpgsql volatile security definer set search_path to 'public'
as $$
declare
  r jsonb;
  v_items jsonb := '[]'::jsonb;
  v_item jsonb;
  v_changes jsonb;
  v_notes text[];
  s public.college_students%rowtype;
  v_ref text; v_uln text; v_email text; v_dob date; v_start date; v_plan date; v_act date;
  v_ni text; v_cohort uuid; v_code text; v_map jsonb := '{}'::jsonb;
  v_has_ref text;
  n_total int := 0; n_matched int := 0; n_updated int := 0; n_unchanged int := 0; n_new int := 0; n_skip int := 0;
  v_run uuid;
  iso constant text := '^\d{4}-\d{2}-\d{2}$';
begin
  if not public.college_can('learners.edit', p_college) then
    raise exception 'you cannot import learners for this college' using errcode = '42501';
  end if;
  if jsonb_typeof(p_rows) <> 'array' then raise exception 'rows must be a list' using errcode = '22023'; end if;
  if jsonb_array_length(p_rows) > 5000 then
    raise exception 'up to 5000 rows at a time; split the file' using errcode = '22023';
  end if;
  if p_mapping is not null then
    select cohort_map into v_map from public.college_mis_mappings where id = p_mapping and college_id = p_college;
    if not found then raise exception 'mapping not found' using errcode = '22023'; end if;
  end if;

  for r in select value from jsonb_array_elements(p_rows) loop
    n_total := n_total + 1;
    v_notes := '{}';
    v_changes := '{}'::jsonb;
    v_ref := nullif(upper(trim(coalesce(r->>'learner_ref', ''))), '');
    v_uln := nullif(regexp_replace(coalesce(r->>'uln', ''), '\s', '', 'g'), '');
    v_email := nullif(lower(trim(coalesce(r->>'email', ''))), '');
    v_ni := nullif(upper(regexp_replace(coalesce(r->>'ni_number', ''), '\s', '', 'g')), '');
    v_dob := null; v_start := null; v_plan := null; v_act := null; v_cohort := null;
    v_code := nullif(trim(coalesce(r->>'cohort_code', '')), '');

    if v_uln is not null and v_uln !~ '^[1-9][0-9]{9}$' then
      v_notes := v_notes || ('ULN "' || left(v_uln, 12) || '" is not 10 digits, left out');
      v_uln := null;
    end if;
    if v_ref is not null and v_ref !~ '^[A-Z0-9 ]{1,12}$' then
      v_notes := v_notes || 'Learner reference is not up to 12 letters or digits, left out';
      v_ref := null;
    end if;
    if v_ni is not null and v_ni !~ '^[A-Z]{2}[0-9]{6}[A-D]$' then
      v_notes := v_notes || 'NI number format not recognised, left out';
      v_ni := null;
    end if;
    begin
      if coalesce(r->>'date_of_birth', '') ~ iso then v_dob := (r->>'date_of_birth')::date; end if;
      if coalesce(r->>'start_date', '') ~ iso then v_start := (r->>'start_date')::date; end if;
      if coalesce(r->>'planned_end_date', '') ~ iso then v_plan := (r->>'planned_end_date')::date; end if;
      if coalesce(r->>'actual_end_date', '') ~ iso then v_act := (r->>'actual_end_date')::date; end if;
    exception when others then
      v_notes := v_notes || 'A date could not be read, left out';
    end;
    if v_start is not null and v_plan is not null and v_plan < v_start then
      v_notes := v_notes || 'Planned end is before the start, left out';
      v_plan := null;
    end if;
    -- The page may resolve the cohort itself (a code mapped on screen, not yet saved).
    if coalesce(r->>'cohort_id', '') ~ '^[0-9a-f-]{36}$' then
      select c.id into v_cohort from public.college_cohorts c
       where c.id = (r->>'cohort_id')::uuid and c.college_id = p_college;
    end if;
    if v_cohort is null and v_code is not null then
      select c.id into v_cohort from public.college_cohorts c
       where c.college_id = p_college
         and (c.id::text = (v_map->>v_code) or (v_map->>v_code is null and upper(c.code) = upper(v_code)))
       limit 1;
      if v_cohort is null then v_notes := v_notes || ('Group code "' || left(v_code, 30) || '" is not mapped to a cohort'); end if;
    end if;

    -- Match.
    s := null;
    if v_ref is not null then
      select cs.* into s from public.college_students cs join public.college_student_ilr i on i.student_id = cs.id
       where cs.college_id = p_college and upper(i.learn_ref_number) = v_ref limit 1;
    end if;
    if s.id is null and v_uln is not null then
      select * into s from public.college_students where college_id = p_college and uln = v_uln limit 1;
    end if;
    if s.id is null and v_email is not null then
      select * into s from public.college_students where college_id = p_college and lower(email) = v_email limit 1;
    end if;

    if s.id is null then
      if v_email is null or nullif(trim(coalesce(r->>'name', '')), '') is null then
        n_skip := n_skip + 1;
        v_item := jsonb_build_object('row', r->'row', 'outcome', 'skipped',
                    'detail', 'Matches nobody, and a new learner needs a name and an email');
      else
        n_new := n_new + 1;
        v_item := jsonb_build_object('row', r->'row', 'outcome', 'new', 'email', v_email,
                    'name', left(trim(r->>'name'), 120), 'uln', v_uln, 'cohort_id', v_cohort,
                    'planned_end_date', v_plan);
      end if;
      if cardinality(v_notes) > 0 then v_item := v_item || jsonb_build_object('notes', to_jsonb(v_notes)); end if;
      v_items := v_items || v_item;
      continue;
    end if;

    n_matched := n_matched + 1;
    select learn_ref_number into v_has_ref from public.college_student_ilr where student_id = s.id;
    if v_uln is not null and v_uln is distinct from s.uln then
      if exists (select 1 from public.college_students o where o.college_id = p_college and o.uln = v_uln and o.id <> s.id) then
        v_notes := v_notes || 'That ULN is already on another learner, left out';
      else v_changes := v_changes || jsonb_build_object('uln', jsonb_build_array(s.uln, v_uln)); end if;
    end if;
    if v_dob is not null and v_dob is distinct from s.date_of_birth then
      v_changes := v_changes || jsonb_build_object('date_of_birth', jsonb_build_array(s.date_of_birth, v_dob)); end if;
    if v_ni is not null and v_ni is distinct from upper(replace(coalesce(s.ni_number, ''), ' ', '')) then
      v_changes := v_changes || jsonb_build_object('ni_number', jsonb_build_array(case when s.ni_number is null then null else 'on file' end, 'from file')); end if;
    if v_start is not null and v_start is distinct from s.start_date then
      v_changes := v_changes || jsonb_build_object('start_date', jsonb_build_array(s.start_date, v_start)); end if;
    if v_plan is not null and v_plan is distinct from s.expected_end_date then
      v_changes := v_changes || jsonb_build_object('planned_end_date', jsonb_build_array(s.expected_end_date, v_plan)); end if;
    if v_act is not null and v_act is distinct from s.learning_actual_end_date then
      v_changes := v_changes || jsonb_build_object('actual_end_date', jsonb_build_array(s.learning_actual_end_date, v_act)); end if;
    if v_ref is not null and v_has_ref is null then
      if exists (select 1 from public.college_student_ilr i where i.college_id = p_college and upper(i.learn_ref_number) = v_ref) then
        v_notes := v_notes || 'That learner reference is already on another learner, left out';
      else v_changes := v_changes || jsonb_build_object('learner_ref', jsonb_build_array(null, v_ref)); end if;
    end if;
    if v_cohort is not null and s.cohort_id is null then
      v_changes := v_changes || jsonb_build_object('cohort', jsonb_build_array(null, v_code));
    elsif v_cohort is not null and s.cohort_id is distinct from v_cohort then
      v_notes := v_notes || 'In a different cohort here; not moved (move them on their profile if that is right)';
    end if;

    if v_changes = '{}'::jsonb then
      n_unchanged := n_unchanged + 1;
    else
      n_updated := n_updated + 1;
      if not coalesce(p_dry_run, true) then
        update public.college_students set
          uln = case when v_changes ? 'uln' then v_uln else uln end,
          date_of_birth = case when v_changes ? 'date_of_birth' then v_dob else date_of_birth end,
          ni_number = case when v_changes ? 'ni_number' then v_ni else ni_number end,
          start_date = case when v_changes ? 'start_date' then v_start else start_date end,
          expected_end_date = case when v_changes ? 'planned_end_date' then v_plan else expected_end_date end,
          learning_actual_end_date = case when v_changes ? 'actual_end_date' then v_act else learning_actual_end_date end,
          cohort_id = case when v_changes ? 'cohort' then v_cohort else cohort_id end,
          updated_at = now()
        where id = s.id;
        if v_changes ? 'learner_ref' then
          insert into public.college_student_ilr (student_id, college_id, learn_ref_number, updated_by, updated_at)
          values (s.id, p_college, v_ref, auth.uid(), now())
          on conflict (student_id) do update set learn_ref_number = excluded.learn_ref_number,
            updated_by = auth.uid(), updated_at = now();
        end if;
      end if;
    end if;
    v_item := jsonb_build_object('row', r->'row', 'outcome', case when v_changes = '{}'::jsonb then 'unchanged' else 'updated' end,
                                 'student_id', s.id, 'name', s.name, 'changes', v_changes);
    if cardinality(v_notes) > 0 then v_item := v_item || jsonb_build_object('notes', to_jsonb(v_notes)); end if;
    v_items := v_items || v_item;
  end loop;

  if not coalesce(p_dry_run, true) then
    insert into public.college_mis_runs (college_id, mapping_id, run_by, file_name, rows_total, matched, updated,
                                         unchanged, new_learners, skipped, items)
    values (p_college, p_mapping, auth.uid(), left(p_file_name, 200), n_total, n_matched, n_updated, n_unchanged,
            n_new, n_skip,
            -- The audit keeps outcomes and changed field names, not the values.
            (select coalesce(jsonb_agg(jsonb_build_object('row', i->'row', 'outcome', i->>'outcome',
                       'student_id', i->'student_id',
                       'fields', (select coalesce(jsonb_agg(k), '[]'::jsonb) from jsonb_object_keys(coalesce(i->'changes', '{}'::jsonb)) k),
                       'notes', i->'notes')), '[]'::jsonb) from jsonb_array_elements(v_items) i))
    returning id into v_run;
    if p_mapping is not null then
      update public.college_mis_mappings set last_run_at = now(),
        last_run_summary = jsonb_build_object('rows', n_total, 'updated', n_updated, 'unchanged', n_unchanged,
                                              'new', n_new, 'skipped', n_skip, 'file', left(p_file_name, 200))
      where id = p_mapping;
    end if;
  end if;

  return json_build_object('dry_run', coalesce(p_dry_run, true), 'run_id', v_run,
    'summary', json_build_object('rows', n_total, 'matched', n_matched, 'updated', n_updated,
                                 'unchanged', n_unchanged, 'new', n_new, 'skipped', n_skip),
    'items', v_items);
end;
$$;
revoke all on function public.college_mis_apply(uuid, uuid, jsonb, boolean, text) from public, anon;
grant execute on function public.college_mis_apply(uuid, uuid, jsonb, boolean, text) to authenticated;
