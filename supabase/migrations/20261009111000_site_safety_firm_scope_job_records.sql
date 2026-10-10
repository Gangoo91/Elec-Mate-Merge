-- Site Safety in both hubs, phase 3: the job records (ELE-2031).
--
-- Permits to work, COSHH, safe isolation, fire watch, pre-use checks,
-- inspections, observations and the site diary get the same nullable firm as
-- RAMS (20261008191000): employer_id + employer_job_id, set and checked by
-- safety_set_employer_scope(). Their children (permit revisions, signing links,
-- the audit trail, corrective actions) follow the parent through EXISTS.
--
-- Adds a firm countersignature: a manager signs off a worker's record without
-- being able to edit it.
--
-- Additive only: new nullable columns, indexes, functions, triggers that pass
-- untouched rows through, and NEW permissive policies. No existing policy,
-- column or FK is altered or dropped, and nothing is backfilled.
--
-- Not here, by decision: safety_equipment (the firm's kit lives in the Kit
-- register, employer_company_tools) and safety_photos / photo_projects (the
-- firm's job photos live in job_photos). The Employer Hub links to those
-- instead of keeping a second register.

-- ── Columns ──────────────────────────────────────────────────────────────
do $cols$
declare
  t text;
begin
  foreach t in array array[
    'permits_to_work', 'coshh_assessments', 'safe_isolation_records',
    'fire_watch_records', 'pre_use_checks', 'inspection_records',
    'safety_observations', 'electrician_site_diary'
  ] loop
    execute format(
      'alter table public.%I
         add column if not exists employer_id uuid references public.profiles(id) on delete set null,
         add column if not exists employer_job_id uuid references public.employer_jobs(id) on delete set null',
      t);
    execute format(
      'create index if not exists %I on public.%I (employer_id) where employer_id is not null',
      t || '_employer_id_idx', t);
    execute format(
      'create index if not exists %I on public.%I (employer_job_id) where employer_job_id is not null',
      t || '_employer_job_id_idx', t);
    execute format(
      'comment on column public.%I.employer_id is %L', t,
      'Firm (owner profiles.id) this record belongs to. Null = personal. Set and checked by safety_set_employer_scope().');
    execute format(
      'comment on column public.%I.employer_job_id is %L', t,
      'Firm job (employer_jobs) this record is filed against. Shares it with the firm.');
  end loop;

  -- The countersignature: who at the firm signed the record off, and when.
  foreach t in array array[
    'permits_to_work', 'coshh_assessments', 'safe_isolation_records',
    'fire_watch_records', 'pre_use_checks', 'inspection_records',
    'safety_observations', 'electrician_site_diary', 'rams_documents'
  ] loop
    execute format(
      'alter table public.%I
         add column if not exists firm_countersigned_by uuid references public.profiles(id) on delete set null,
         add column if not exists firm_countersigned_name text,
         add column if not exists firm_countersigned_at timestamptz',
      t);
    execute format(
      'comment on column public.%I.firm_countersigned_by is %L', t,
      'Firm manager who countersigned this record. Written only by safety_countersign().');
  end loop;
end
$cols$;

-- ── Helpers ──────────────────────────────────────────────────────────────

-- The people who act for a firm: its owner and active co-admins. Records they
-- make are the firm's (editable by any of them); anyone else's are read-only.
create or replace function public.safety_firm_manager_ids(p_employer_id uuid)
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select p_employer_id
   where p_employer_id in (select public.my_employer_scope())
  union
  select a.user_id
    from public.employer_admins a
   where a.employer_id = p_employer_id
     and a.status = 'active'
     and p_employer_id in (select public.my_employer_scope());
$$;

revoke all on function public.safety_firm_manager_ids(uuid) from public, anon;
grant execute on function public.safety_firm_manager_ids(uuid) to authenticated, service_role;

-- Is a Site Safety record that is shared with a firm visible to the caller?
-- SECURITY INVOKER: the lookup runs under the caller's own RLS, so this is true
-- exactly when the caller may read the parent. Used by child-table policies.
create or replace function public.safety_shared_record_visible(p_type text, p_id uuid)
returns boolean
language plpgsql
stable
security invoker
set search_path = public
as $$
declare
  v_table text;
  v_found boolean;
begin
  v_table := case p_type
    when 'permit' then 'permits_to_work'
    when 'coshh' then 'coshh_assessments'
    when 'isolation' then 'safe_isolation_records'
    when 'safe-isolation' then 'safe_isolation_records'
    when 'fire_watch' then 'fire_watch_records'
    when 'pre_use_check' then 'pre_use_checks'
    when 'inspection' then 'inspection_records'
    when 'observation' then 'safety_observations'
    when 'site_diary' then 'electrician_site_diary'
    when 'rams' then 'rams_documents'
    when 'rams_generated' then 'rams_generation_jobs'
    else null
  end;
  if v_table is null or p_id is null then
    return false;
  end if;
  execute format(
    'select exists (select 1 from public.%I where id = $1 and employer_id is not null)', v_table)
    into v_found using p_id;
  return coalesce(v_found, false);
end;
$$;

revoke all on function public.safety_shared_record_visible(text, uuid) from public, anon;
grant execute on function public.safety_shared_record_visible(text, uuid) to authenticated, service_role;

-- The countersignature columns are written only by safety_countersign(): a
-- record's owner can update their own row, so without this they could sign it
-- off on the firm's behalf.
create or replace function public.safety_guard_countersign()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if coalesce(current_setting('safety.countersign', true), '') = 'on' then
    return new;
  end if;
  if tg_op = 'INSERT' then
    new.firm_countersigned_by := null;
    new.firm_countersigned_name := null;
    new.firm_countersigned_at := null;
  else
    new.firm_countersigned_by := old.firm_countersigned_by;
    new.firm_countersigned_name := old.firm_countersigned_name;
    new.firm_countersigned_at := old.firm_countersigned_at;
  end if;
  return new;
end;
$$;

do $guard$
declare
  t text;
begin
  foreach t in array array[
    'permits_to_work', 'coshh_assessments', 'safe_isolation_records',
    'fire_watch_records', 'pre_use_checks', 'inspection_records',
    'safety_observations', 'electrician_site_diary', 'rams_documents'
  ] loop
    execute format('drop trigger if exists trg_safety_countersign_guard on public.%I', t);
    execute format(
      'create trigger trg_safety_countersign_guard
         before insert or update on public.%I
         for each row execute function public.safety_guard_countersign()', t);
  end loop;
end
$guard$;

-- A firm manager countersigns (or withdraws a countersignature on) a record
-- shared with their firm. They cannot edit the record itself.
create or replace function public.safety_countersign(
  p_table text,
  p_id uuid,
  p_withdraw boolean default false
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_employer uuid;
  v_name text;
  v_at timestamptz;
begin
  if v_uid is null then
    raise exception 'Sign in to countersign' using errcode = '42501';
  end if;
  if p_table not in (
    'permits_to_work', 'coshh_assessments', 'safe_isolation_records',
    'fire_watch_records', 'pre_use_checks', 'inspection_records',
    'safety_observations', 'electrician_site_diary', 'rams_documents'
  ) then
    raise exception 'That record cannot be countersigned' using errcode = '22023';
  end if;

  execute format('select employer_id from public.%I where id = $1', p_table)
    into v_employer using p_id;
  if v_employer is null or v_employer not in (select public.my_employer_scope()) then
    raise exception 'Only a manager at the firm can countersign this record'
      using errcode = '42501';
  end if;

  select coalesce(nullif(trim(p.full_name), ''), 'Firm manager') into v_name
    from public.profiles p where p.id = v_uid;
  v_at := case when p_withdraw then null else now() end;

  perform set_config('safety.countersign', 'on', true);
  execute format(
    'update public.%I
        set firm_countersigned_by = $1,
            firm_countersigned_name = $2,
            firm_countersigned_at = $3
      where id = $4', p_table)
    using case when p_withdraw then null else v_uid end,
          case when p_withdraw then null else coalesce(v_name, 'Firm manager') end,
          v_at, p_id;
  perform set_config('safety.countersign', 'off', true);

  return jsonb_build_object(
    'countersigned_by', case when p_withdraw then null else v_uid end,
    'countersigned_name', case when p_withdraw then null else coalesce(v_name, 'Firm manager') end,
    'countersigned_at', v_at
  );
end;
$$;

revoke all on function public.safety_countersign(text, uuid, boolean) from public, anon;
grant execute on function public.safety_countersign(text, uuid, boolean) to authenticated;

-- ── Trigger: the server decides the firm ─────────────────────────────────
-- Same rules as 20261009110000, plus:
--   * a firm can be named directly (employer_id without a job) only by the
--     firm's own managers. A worker shares a record by filing it against a
--     firm job they are on, never by naming the firm (Andrew, 8 Oct);
--   * fire watch and safe isolation records follow the permit they are under.
create or replace function public.safety_set_employer_scope()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_owner uuid;
  v_parent_employer uuid;
  v_parent_job uuid;
  v_gen_id uuid;
begin
  -- An update that leaves the firm and the firm job alone needs no check. This
  -- is every progress write the RAMS worker makes, and every write the
  -- existing client makes.
  if tg_op = 'UPDATE'
     and new.employer_id is not distinct from old.employer_id
     and new.employer_job_id is not distinct from old.employer_job_id then
    return new;
  end if;

  -- Service role / migrations: trusted. Still derive the firm from the job,
  -- and a child filed by an edge function follows its parent.
  if v_uid is null and coalesce(auth.role(), 'service_role') = 'service_role' then
    if new.employer_job_id is not null and new.employer_id is null then
      select j.user_id into v_owner from public.employer_jobs j where j.id = new.employer_job_id;
      new.employer_id := v_owner;
    end if;
    if tg_op = 'INSERT' and new.employer_id is null and new.employer_job_id is null then
      if tg_table_name = 'rams_documents' then
        begin
          v_gen_id := nullif(new.ai_generation_metadata ->> 'generation_job_id', '')::uuid;
        exception when others then
          v_gen_id := null;
        end;
        if v_gen_id is not null then
          select g.employer_id, g.employer_job_id into new.employer_id, new.employer_job_id
            from public.rams_generation_jobs g where g.id = v_gen_id;
        end if;
      elsif tg_table_name = 'method_statements' then
        if new.rams_document_id is not null then
          select d.employer_id, d.employer_job_id into new.employer_id, new.employer_job_id
            from public.rams_documents d where d.id = new.rams_document_id;
        end if;
      elsif tg_table_name in ('fire_watch_records', 'safe_isolation_records') then
        if new.permit_id is not null then
          select p.employer_id, p.employer_job_id into new.employer_id, new.employer_job_id
            from public.permits_to_work p where p.id = new.permit_id;
        end if;
      end if;
    end if;
    return new;
  end if;

  -- Anyone else without a uid can never tag a firm.
  if v_uid is null then
    new.employer_id := null;
    new.employer_job_id := null;
    return new;
  end if;

  -- Unlinking a worker's record from the firm job makes it personal again;
  -- a record the firm made stays the firm's.
  if tg_op = 'UPDATE'
     and old.employer_job_id is not null and new.employer_job_id is null
     and new.employer_id is not distinct from old.employer_id
     and not public.safety_is_firm_creator(old.employer_id, new.user_id) then
    new.employer_id := null;
    return new;
  end if;

  if new.employer_job_id is not null then
    select j.user_id into v_owner from public.employer_jobs j where j.id = new.employer_job_id;
    if v_owner is null then
      raise exception 'That firm job does not exist' using errcode = '23503';
    end if;
    if not (v_owner in (select public.my_employer_scope())
            or public.is_assigned_to_job(new.employer_job_id)) then
      raise exception 'You can only file a safety record against a job at your own firm'
        using errcode = '42501';
    end if;
    new.employer_id := v_owner;
    return new;
  end if;

  if new.employer_id is not null then
    if new.employer_id not in (select public.my_employer_scope()) then
      raise exception 'You can only file a safety record with a firm you manage'
        using errcode = '42501';
    end if;
    return new;
  end if;

  -- Inherit from the parent on insert only.
  if tg_op = 'INSERT' then
    if tg_table_name = 'rams_documents' then
      begin
        v_gen_id := nullif(new.ai_generation_metadata ->> 'generation_job_id', '')::uuid;
      exception when others then
        v_gen_id := null;
      end;
      if v_gen_id is not null then
        select g.employer_id, g.employer_job_id into v_parent_employer, v_parent_job
          from public.rams_generation_jobs g where g.id = v_gen_id;
      end if;
    elsif tg_table_name = 'method_statements' then
      if new.rams_document_id is not null then
        select d.employer_id, d.employer_job_id into v_parent_employer, v_parent_job
          from public.rams_documents d where d.id = new.rams_document_id;
      end if;
    elsif tg_table_name in ('fire_watch_records', 'safe_isolation_records') then
      if new.permit_id is not null then
        select p.employer_id, p.employer_job_id into v_parent_employer, v_parent_job
          from public.permits_to_work p where p.id = new.permit_id;
      end if;
    end if;

    if v_parent_employer is not null and (
         v_parent_employer in (select public.my_employer_scope())
         or (v_parent_job is not null and public.is_assigned_to_job(v_parent_job))) then
      new.employer_id := v_parent_employer;
      new.employer_job_id := v_parent_job;
    end if;
  end if;

  return new;
end;
$$;

revoke all on function public.safety_set_employer_scope() from public, anon, authenticated;

do $trg$
declare
  t text;
begin
  foreach t in array array[
    'permits_to_work', 'coshh_assessments', 'safe_isolation_records',
    'fire_watch_records', 'pre_use_checks', 'inspection_records',
    'safety_observations', 'electrician_site_diary'
  ] loop
    execute format('drop trigger if exists trg_safety_employer_scope on public.%I', t);
    execute format(
      'create trigger trg_safety_employer_scope
         before insert or update on public.%I
         for each row execute function public.safety_set_employer_scope()', t);
  end loop;
end
$trg$;

-- ── Policies (new, permissive) ───────────────────────────────────────────
-- Owners keep their existing "own" policies untouched.
do $pol$
declare
  t text;
  label text;
begin
  -- Firm managers read everything shared with the firm; edit what the firm made.
  foreach t in array array[
    'permits_to_work', 'coshh_assessments', 'safe_isolation_records',
    'fire_watch_records', 'pre_use_checks', 'inspection_records',
    'safety_observations', 'electrician_site_diary'
  ] loop
    label := replace(t, '_', ' ');
    execute format(
      'create policy %I on public.%I for select to authenticated
         using (employer_id is not null and employer_id in (select public.my_employer_scope()))',
      'Firm managers read firm ' || label, t);
    execute format(
      'create policy %I on public.%I for update to authenticated
         using (employer_id in (select public.my_employer_scope())
                and public.safety_is_firm_creator(employer_id, user_id))
         with check (employer_id in (select public.my_employer_scope())
                     and public.safety_is_firm_creator(employer_id, user_id))',
      'Firm managers edit firm-made ' || label, t);
  end loop;

  -- Where the owner may delete, so may the firm, for what the firm made.
  foreach t in array array['permits_to_work', 'coshh_assessments', 'inspection_records'] loop
    label := replace(t, '_', ' ');
    execute format(
      'create policy %I on public.%I for delete to authenticated
         using (employer_id in (select public.my_employer_scope())
                and public.safety_is_firm_creator(employer_id, user_id))',
      'Firm managers delete firm-made ' || label, t);
  end loop;

  -- Controls everyone on the job must know about: the crew reads every one
  -- filed against their job, whoever filed it.
  foreach t in array array[
    'permits_to_work', 'coshh_assessments', 'safe_isolation_records', 'fire_watch_records'
  ] loop
    label := replace(t, '_', ' ');
    execute format(
      'create policy %I on public.%I for select to authenticated
         using (employer_id is not null and employer_job_id is not null
                and public.is_assigned_to_job(employer_job_id))',
      'Crew read ' || label || ' for their jobs', t);
  end loop;

  -- A person's own checks and notes: the crew reads only what the firm issued.
  foreach t in array array[
    'pre_use_checks', 'inspection_records', 'safety_observations', 'electrician_site_diary'
  ] loop
    label := replace(t, '_', ' ');
    execute format(
      'create policy %I on public.%I for select to authenticated
         using (employer_id is not null and employer_job_id is not null
                and public.is_assigned_to_job(employer_job_id)
                and public.safety_is_firm_creator(employer_id, user_id))',
      'Crew read firm-issued ' || label || ' for their jobs', t);
  end loop;
end
$pol$;

-- Children follow the parent.
create policy "Read revisions of visible firm permits"
  on public.permit_revisions for select to authenticated
  using (exists (
    select 1 from public.permits_to_work p
     where p.id = permit_revisions.permit_id and p.employer_id is not null
  ));

create policy "Firm managers read signing links for firm permits"
  on public.permit_signing_tokens for select to authenticated
  using (exists (
    select 1 from public.permits_to_work p
     where p.id = permit_signing_tokens.permit_id
       and p.employer_id in (select public.my_employer_scope())
  ));

create policy "Firm managers create signing links for firm-made permits"
  on public.permit_signing_tokens for insert to authenticated
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.permits_to_work p
       where p.id = permit_signing_tokens.permit_id
         and p.employer_id in (select public.my_employer_scope())
         and public.safety_is_firm_creator(p.employer_id, p.user_id)
    )
  );

create policy "Read signing links of visible firm safety records"
  on public.safety_signing_tokens for select to authenticated
  using (public.safety_shared_record_visible(document_type, record_id));

create policy "Read audit trail of visible firm safety records"
  on public.safety_audit_trail for select to authenticated
  using (public.safety_shared_record_visible(record_type, record_id));

create policy "Read corrective actions of visible firm safety records"
  on public.safety_corrective_actions for select to authenticated
  using (public.safety_shared_record_visible(source_type, source_id));
