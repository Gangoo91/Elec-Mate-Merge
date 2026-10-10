-- ELE-1974 Bring evidence across from another e-portfolio's export. ADDITIVE.
--
-- A generic import: a CSV (one row per evidence item) plus, optionally, the
-- files it names (uploaded from the vendor's ZIP). Staff map the CSV columns
-- in the browser, match each row to a learner, and stage the rows here. The
-- LEARNER reviews each item before it joins their record: accepting creates a
-- portfolio item in their own portfolio with the provenance attached. Staff
-- then record the carried-over decision ("imported", previously assessed by X
-- on date) for accepted items whose original outcome was a pass; the decision
-- log names the member of staff who recorded the carry-over, and its feedback
-- carries the original assessor, date, outcome and source file.
--
-- No vendor API is involved and none is claimed: OneFile, Bud, Smart Assessor
-- and Aptem appear only as labels for where an export came from.

create table if not exists public.college_evidence_imports (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  source text not null check (source in ('onefile', 'bud', 'smart_assessor', 'aptem', 'other')),
  source_label text,
  file_name text,
  column_map jsonb not null default '{}'::jsonb,
  item_count integer not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists college_evidence_imports_college_idx on public.college_evidence_imports (college_id, created_at desc);
alter table public.college_evidence_imports enable row level security;
drop policy if exists "College staff read evidence imports" on public.college_evidence_imports;
create policy "College staff read evidence imports" on public.college_evidence_imports
  for select to authenticated using (public.college_can('learners.edit', college_id));
comment on table public.college_evidence_imports is
  '[COLLEGE] One evidence import from another e-portfolio export (CSV plus files), with the column mapping used. Scope: per college. Used by: Bring evidence across page. Rule: written by create_evidence_import(); source is a label only, never a claim of vendor integration.';

create table if not exists public.college_evidence_import_items (
  id uuid primary key default gen_random_uuid(),
  import_id uuid not null references public.college_evidence_imports(id) on delete cascade,
  college_id uuid not null references public.colleges(id) on delete cascade,
  student_id uuid not null references public.college_students(id) on delete cascade,
  learner_user_id uuid references auth.users(id) on delete set null,
  title text not null check (length(trim(title)) between 1 and 300),
  description text,
  criteria_raw text[] not null default '{}',
  criteria jsonb not null default '[]'::jsonb,
  qualification_code text,
  original_assessor text,
  original_assessed_on date,
  original_outcome text,
  original_ref text,
  files jsonb not null default '[]'::jsonb,
  status text not null default 'awaiting_learner'
    check (status in ('awaiting_learner', 'accepted', 'declined', 'recorded')),
  learner_note text,
  learner_decided_at timestamptz,
  portfolio_item_id uuid references public.portfolio_items(id) on delete set null,
  recorded_at timestamptz,
  recorded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists ceii_import_idx on public.college_evidence_import_items (import_id);
create index if not exists ceii_learner_idx on public.college_evidence_import_items (learner_user_id, status);
alter table public.college_evidence_import_items enable row level security;
drop policy if exists "College staff read import items" on public.college_evidence_import_items;
create policy "College staff read import items" on public.college_evidence_import_items
  for select to authenticated using (public.college_can('learners.edit', college_id));
drop policy if exists "Learner reads own import items" on public.college_evidence_import_items;
create policy "Learner reads own import items" on public.college_evidence_import_items
  for select to authenticated using (learner_user_id = auth.uid());
comment on table public.college_evidence_import_items is
  '[COLLEGE] One imported evidence item awaiting the learner, with its original assessor, date, outcome and the criteria it was mapped to (checked against the learner''s qualification). Scope: one learner. Used by: Bring evidence across page, apprentice review card. Rule: learner accepts or declines (review_imported_evidence); staff record carried-over decisions (record_imported_decisions).';

-- The learner can read the files staged for them:
-- college-learner-evidence/<college>/imports/<import>/<learner user id>/<file>
drop policy if exists "learner_reads_own_imported_evidence" on storage.objects;
create policy "learner_reads_own_imported_evidence" on storage.objects
  for select to authenticated using (
    bucket_id = 'college-learner-evidence'
    and (storage.foldername(name))[2] = 'imports'
    and (storage.foldername(name))[4] = (select auth.uid())::text);

-- ── Stage an import ───────────────────────────────────────────────────────
-- p_items: [{student_id, title, description, criteria_raw:[..], criteria:[{unit_code, ac_code}],
--            original_assessor, original_assessed_on, original_outcome, original_ref, files:[{path,name,size,type}]}]
create or replace function public.create_evidence_import(
  p_import_id uuid, p_college uuid, p_source text, p_source_label text, p_file_name text,
  p_column_map jsonb, p_items jsonb)
returns jsonb
language plpgsql volatile security definer set search_path to 'public'
as $$
declare
  it jsonb;
  cs record;
  v_code text;
  v_crit jsonb;
  c jsonb;
  n int := 0;
  n_crit int := 0;
  n_found int := 0;
begin
  if auth.uid() is null or not public.college_can('learners.edit', p_college) then
    raise exception 'you cannot import evidence for this college' using errcode = '42501';
  end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'nothing to import' using errcode = '22023';
  end if;
  if jsonb_array_length(p_items) > 2000 then
    raise exception 'import at most 2000 items at a time' using errcode = '22023';
  end if;

  insert into public.college_evidence_imports (id, college_id, source, source_label, file_name, column_map, created_by)
  values (coalesce(p_import_id, gen_random_uuid()), p_college, p_source, nullif(trim(p_source_label), ''),
          p_file_name, coalesce(p_column_map, '{}'::jsonb), auth.uid())
  returning id into p_import_id;

  for it in select * from jsonb_array_elements(p_items) loop
    select s.id, s.user_id into cs from public.college_students s
     where s.id = (it->>'student_id')::uuid and s.college_id = p_college;
    if cs.id is null then
      raise exception 'row % names a learner who is not at this college', n + 1 using errcode = '22023';
    end if;
    v_code := null;
    if cs.user_id is not null then
      select requirement_code into v_code from public._resolve_qualification(cs.user_id, null);
    end if;
    -- Check every mapped criterion against the learner's qualification.
    v_crit := '[]'::jsonb;
    for c in select * from jsonb_array_elements(coalesce(it->'criteria', '[]'::jsonb)) loop
      n_crit := n_crit + 1;
      if v_code is not null and exists (
           select 1 from public.qualification_requirements q
            where q.qualification_code = v_code and q.unit_code = c->>'unit_code' and q.ac_code = c->>'ac_code') then
        n_found := n_found + 1;
        v_crit := v_crit || jsonb_build_object('unit_code', c->>'unit_code', 'ac_code', c->>'ac_code', 'found', true);
      else
        v_crit := v_crit || jsonb_build_object('unit_code', c->>'unit_code', 'ac_code', c->>'ac_code', 'found', false);
      end if;
    end loop;

    insert into public.college_evidence_import_items (
      import_id, college_id, student_id, learner_user_id, title, description, criteria_raw, criteria,
      qualification_code, original_assessor, original_assessed_on, original_outcome, original_ref, files)
    values (
      p_import_id, p_college, cs.id, cs.user_id, left(trim(it->>'title'), 300), nullif(trim(it->>'description'), ''),
      coalesce((select array_agg(x) from jsonb_array_elements_text(coalesce(it->'criteria_raw', '[]'::jsonb)) x), '{}'),
      v_crit, v_code, nullif(trim(it->>'original_assessor'), ''),
      nullif(it->>'original_assessed_on', '')::date, nullif(trim(it->>'original_outcome'), ''),
      nullif(trim(it->>'original_ref'), ''), coalesce(it->'files', '[]'::jsonb));
    n := n + 1;
  end loop;

  update public.college_evidence_imports set item_count = n where id = p_import_id;
  return jsonb_build_object('import_id', p_import_id, 'items', n, 'criteria', n_crit, 'criteria_found', n_found);
end;
$$;
revoke all on function public.create_evidence_import(uuid, uuid, text, text, text, jsonb, jsonb) from public, anon;
grant execute on function public.create_evidence_import(uuid, uuid, text, text, text, jsonb, jsonb) to authenticated;

-- ── The learner accepts or declines ───────────────────────────────────────
-- p_storage: the files as copied into the learner's own portfolio (same shape as portfolio_items.storage_urls).
create or replace function public.review_imported_evidence(
  p_item uuid, p_accept boolean, p_note text default null, p_storage jsonb default '[]'::jsonb)
returns jsonb
language plpgsql volatile security definer set search_path to 'public'
as $$
declare
  i public.college_evidence_import_items%rowtype;
  imp public.college_evidence_imports%rowtype;
  v_item uuid;
  v_refs text[];
begin
  select * into i from public.college_evidence_import_items where id = p_item;
  if i.id is null or i.learner_user_id is distinct from auth.uid() then
    raise exception 'that item is not yours to review' using errcode = '42501';
  end if;
  if i.status <> 'awaiting_learner' then
    raise exception 'that item has already been reviewed' using errcode = 'P0001';
  end if;
  select * into imp from public.college_evidence_imports where id = i.import_id;

  if not p_accept then
    update public.college_evidence_import_items
       set status = 'declined', learner_note = nullif(trim(p_note), ''), learner_decided_at = now()
     where id = p_item;
    return jsonb_build_object('status', 'declined');
  end if;

  select coalesce(array_agg('Unit ' || (c->>'unit_code') || ' AC ' || (c->>'ac_code')), '{}') into v_refs
    from jsonb_array_elements(i.criteria) c where (c->>'found')::boolean;

  insert into public.portfolio_items (
    user_id, title, description, category, status, assessment_criteria_met, storage_urls,
    evidence_count, date_completed, tags, metadata)
  values (
    i.learner_user_id, i.title, i.description, 'imported-evidence', 'completed', v_refs,
    coalesce(p_storage, '[]'::jsonb), coalesce(jsonb_array_length(p_storage), 0),
    i.original_assessed_on::timestamptz, array['imported'],
    jsonb_build_object('imported', jsonb_build_object(
      'import_id', i.import_id, 'item_id', i.id,
      'source', imp.source, 'source_label', imp.source_label, 'file_name', imp.file_name,
      'original_assessor', i.original_assessor, 'original_assessed_on', i.original_assessed_on,
      'original_outcome', i.original_outcome, 'original_ref', i.original_ref,
      'criteria_raw', to_jsonb(i.criteria_raw), 'learner_confirmed_at', now())))
  returning id into v_item;

  update public.college_evidence_import_items
     set status = 'accepted', learner_note = nullif(trim(p_note), ''), learner_decided_at = now(),
         portfolio_item_id = v_item
   where id = p_item;
  return jsonb_build_object('status', 'accepted', 'portfolio_item_id', v_item);
end;
$$;
revoke all on function public.review_imported_evidence(uuid, boolean, text, jsonb) from public, anon;
grant execute on function public.review_imported_evidence(uuid, boolean, text, jsonb) to authenticated;

-- ── Staff record the carried-over decisions ──────────────────────────────
-- For each accepted item whose original outcome reads as a pass, one
-- 'imported' decision per criterion found in the learner's qualification.
-- auth.uid() is the member of staff, so the decision names them as recorder.
create or replace function public.record_imported_decisions(p_import uuid)
returns jsonb
language plpgsql volatile security definer set search_path to 'public'
as $$
declare
  imp public.college_evidence_imports%rowtype;
  i record;
  c jsonb;
  v_fb text;
  n_items int := 0;
  n_dec int := 0;
  n_skip int := 0;
begin
  select * into imp from public.college_evidence_imports where id = p_import;
  if imp.id is null or not public.college_can('assess.decide', imp.college_id) then
    raise exception 'only an assessor at this college can record carried-over decisions' using errcode = '42501';
  end if;

  for i in
    select * from public.college_evidence_import_items
     where import_id = p_import and status = 'accepted' and learner_user_id is not null
  loop
    if not public._can_assess(i.learner_user_id) or i.learner_user_id = auth.uid() or i.qualification_code is null
       or coalesce(lower(i.original_outcome), '') !~ '(pass|achiev|met|competent|complete|signed|accept|sufficient|^yes$|^y$)'
       or coalesce(lower(i.original_outcome), '') ~ '(not yet|not met|refer|insufficient|fail|^no$)' then
      n_skip := n_skip + 1;
      update public.college_evidence_import_items set status = 'recorded', recorded_at = now(), recorded_by = auth.uid()
       where id = i.id;
      continue;
    end if;
    v_fb := 'Carried over from ' || coalesce(imp.source_label, initcap(replace(imp.source, '_', ' '))) || ' export'
      || coalesce(' (' || imp.file_name || ')', '') || ': previously assessed by '
      || coalesce(i.original_assessor, 'an unnamed assessor')
      || coalesce(' on ' || to_char(i.original_assessed_on, 'FMDD Mon YYYY'), '')
      || ', outcome "' || i.original_outcome || '"'
      || coalesce(', reference ' || i.original_ref, '')
      || '. Confirmed by the learner on ' || to_char(i.learner_decided_at at time zone 'Europe/London', 'FMDD Mon YYYY') || '.';
    for c in select * from jsonb_array_elements(i.criteria) loop
      if (c->>'found')::boolean then
        insert into public.portfolio_assessment_decisions
          (learner_id, qualification_code, unit_code, ac_code, decision, feedback, feedback_source,
           evidence_item_ids, method, assessor_id)
        values (i.learner_user_id, i.qualification_code, c->>'unit_code', c->>'ac_code', 'passed', v_fb, 'assessor',
                case when i.portfolio_item_id is not null then array[i.portfolio_item_id] else '{}'::uuid[] end,
                'imported', auth.uid());
        n_dec := n_dec + 1;
      end if;
    end loop;
    update public.college_evidence_import_items set status = 'recorded', recorded_at = now(), recorded_by = auth.uid()
     where id = i.id;
    n_items := n_items + 1;
  end loop;
  return jsonb_build_object('items', n_items, 'decisions', n_dec, 'evidence_only', n_skip);
end;
$$;
revoke all on function public.record_imported_decisions(uuid) from public, anon;
grant execute on function public.record_imported_decisions(uuid) to authenticated;
