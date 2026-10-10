-- Site Safety in both hubs, phase 2: RAMS, method statements, AI RAMS.
--
-- One system for the Electrical Hub and the Employer Hub: the same rows, with a
-- nullable firm on each. A record belongs to a firm when
--   * it was made in the Employer Hub (employer_id = the firm), or
--   * a worker filed it against a firm job (employer_job_id -> employer_jobs).
-- Personal records keep employer_id null and stay private.
--
-- Additive only: new nullable columns, indexes, one trigger function, NEW
-- permissive policies. No existing policy, column or FK is altered or dropped,
-- and nothing is backfilled.

-- ── Columns ──────────────────────────────────────────────────────────────
alter table public.rams_documents
  add column if not exists employer_id uuid references public.profiles(id) on delete set null;
-- rams_documents.employer_job_id already exists (FK employer_jobs, on delete set null).

alter table public.method_statements
  add column if not exists employer_id uuid references public.profiles(id) on delete set null,
  add column if not exists employer_job_id uuid references public.employer_jobs(id) on delete set null;

alter table public.rams_generation_jobs
  add column if not exists employer_id uuid references public.profiles(id) on delete set null,
  add column if not exists employer_job_id uuid references public.employer_jobs(id) on delete set null;

-- rams_partials holds generation output (payload) but is a pure child of
-- rams_generation_jobs: it follows its parent through an EXISTS policy below.

create index if not exists rams_documents_employer_id_idx
  on public.rams_documents (employer_id) where employer_id is not null;
create index if not exists rams_documents_employer_job_id_idx
  on public.rams_documents (employer_job_id) where employer_job_id is not null;
create index if not exists method_statements_employer_id_idx
  on public.method_statements (employer_id) where employer_id is not null;
create index if not exists method_statements_employer_job_id_idx
  on public.method_statements (employer_job_id) where employer_job_id is not null;
create index if not exists rams_generation_jobs_employer_id_idx
  on public.rams_generation_jobs (employer_id) where employer_id is not null;
create index if not exists rams_generation_jobs_employer_job_id_idx
  on public.rams_generation_jobs (employer_job_id) where employer_job_id is not null;

comment on column public.rams_documents.employer_id is
  'Firm (owner profiles.id) this RAMS belongs to. Null = personal. Set and checked by safety_set_employer_scope().';
comment on column public.method_statements.employer_id is
  'Firm (owner profiles.id) this method statement belongs to. Null = personal. Set and checked by safety_set_employer_scope().';
comment on column public.method_statements.employer_job_id is
  'Firm job (employer_jobs) this method statement is filed against. Shares it with the firm.';
comment on column public.rams_generation_jobs.employer_id is
  'Firm (owner profiles.id) this generated RAMS belongs to. Null = personal. Set and checked by safety_set_employer_scope().';
comment on column public.rams_generation_jobs.employer_job_id is
  'Firm job (employer_jobs) this generated RAMS is filed against. Shares it with the firm.';

-- ── Helpers ──────────────────────────────────────────────────────────────

-- Was this record made by the firm itself — its owner or an active co-admin?
-- Those records are the firm's to edit; a worker's shared record is not.
create or replace function public.safety_is_firm_creator(p_employer_id uuid, p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select p_employer_id is not null and p_user_id is not null and (
    p_user_id = p_employer_id
    or exists (
      select 1 from public.employer_admins a
       where a.employer_id = p_employer_id
         and a.user_id = p_user_id
         and a.status = 'active'
    )
  );
$$;

revoke all on function public.safety_is_firm_creator(uuid, uuid) from public, anon;
grant execute on function public.safety_is_firm_creator(uuid, uuid) to authenticated, service_role;

-- ── Trigger: the server decides the firm ─────────────────────────────────
--
-- BEFORE INSERT / UPDATE on each table. Never trusts the client's employer_id:
--   employer_job_id set -> employer_id = employer_jobs.user_id, and the caller
--                          must be in that firm (my_employer_scope) or on the
--                          job's crew (is_assigned_to_job);
--   employer_id set     -> must be a firm the caller manages (my_employer_scope)
--                          or works for (my_employer_ids);
--   neither             -> inherit from the parent (a RAMS filed from a
--                          generated RAMS, a method statement filed with a
--                          RAMS) when the caller could tag it themselves; else
--                          null.
-- Service-role writes (edge functions) are trusted, as RLS already trusts them.
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
  -- is every progress write the RAMS worker makes.
  if tg_op = 'UPDATE'
     and new.employer_id is not distinct from old.employer_id
     and new.employer_job_id is not distinct from old.employer_job_id then
    return new;
  end if;

  -- Service role / migrations: trusted. Still derive the firm from the job.
  if v_uid is null and coalesce(auth.role(), 'service_role') = 'service_role' then
    if new.employer_job_id is not null and new.employer_id is null then
      select j.user_id into v_owner from public.employer_jobs j where j.id = new.employer_job_id;
      new.employer_id := v_owner;
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
    if not (new.employer_id in (select public.my_employer_scope())
            or new.employer_id in (select public.my_employer_ids())) then
      raise exception 'You can only file a safety record with a firm you belong to'
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
    elsif tg_table_name = 'method_statements' and new.rams_document_id is not null then
      select d.employer_id, d.employer_job_id into v_parent_employer, v_parent_job
        from public.rams_documents d where d.id = new.rams_document_id;
    end if;

    if v_parent_employer is not null and (
         v_parent_employer in (select public.my_employer_scope())
         or v_parent_employer in (select public.my_employer_ids())
         or (v_parent_job is not null and public.is_assigned_to_job(v_parent_job))) then
      new.employer_id := v_parent_employer;
      new.employer_job_id := v_parent_job;
    end if;
  end if;

  return new;
end;
$$;

revoke all on function public.safety_set_employer_scope() from public, anon, authenticated;

drop trigger if exists trg_safety_employer_scope on public.rams_documents;
create trigger trg_safety_employer_scope
  before insert or update on public.rams_documents
  for each row execute function public.safety_set_employer_scope();

drop trigger if exists trg_safety_employer_scope on public.method_statements;
create trigger trg_safety_employer_scope
  before insert or update on public.method_statements
  for each row execute function public.safety_set_employer_scope();

drop trigger if exists trg_safety_employer_scope on public.rams_generation_jobs;
create trigger trg_safety_employer_scope
  before insert or update on public.rams_generation_jobs
  for each row execute function public.safety_set_employer_scope();

-- ── Policies (new, permissive) ───────────────────────────────────────────
-- Owners keep their existing "manage own" policies untouched.

-- rams_documents
create policy "Firm managers read firm RAMS documents"
  on public.rams_documents for select to authenticated
  using (employer_id is not null and employer_id in (select public.my_employer_scope()));

create policy "Crew read RAMS documents for their jobs"
  on public.rams_documents for select to authenticated
  using (employer_id is not null and employer_job_id is not null
         and public.is_assigned_to_job(employer_job_id));

create policy "Firm managers edit firm-made RAMS documents"
  on public.rams_documents for update to authenticated
  using (employer_id in (select public.my_employer_scope())
         and public.safety_is_firm_creator(employer_id, user_id))
  with check (employer_id in (select public.my_employer_scope())
              and public.safety_is_firm_creator(employer_id, user_id));

create policy "Firm managers delete firm-made RAMS documents"
  on public.rams_documents for delete to authenticated
  using (employer_id in (select public.my_employer_scope())
         and public.safety_is_firm_creator(employer_id, user_id));

-- method_statements
create policy "Firm managers read firm method statements"
  on public.method_statements for select to authenticated
  using (employer_id is not null and employer_id in (select public.my_employer_scope()));

create policy "Crew read method statements for their jobs"
  on public.method_statements for select to authenticated
  using (employer_id is not null and employer_job_id is not null
         and public.is_assigned_to_job(employer_job_id));

create policy "Firm managers edit firm-made method statements"
  on public.method_statements for update to authenticated
  using (employer_id in (select public.my_employer_scope())
         and public.safety_is_firm_creator(employer_id, user_id))
  with check (employer_id in (select public.my_employer_scope())
              and public.safety_is_firm_creator(employer_id, user_id));

create policy "Firm managers delete firm-made method statements"
  on public.method_statements for delete to authenticated
  using (employer_id in (select public.my_employer_scope())
         and public.safety_is_firm_creator(employer_id, user_id));

-- rams_generation_jobs
create policy "Firm managers read firm generated RAMS"
  on public.rams_generation_jobs for select to authenticated
  using (employer_id is not null and employer_id in (select public.my_employer_scope()));

create policy "Crew read generated RAMS for their jobs"
  on public.rams_generation_jobs for select to authenticated
  using (employer_id is not null and employer_job_id is not null
         and public.is_assigned_to_job(employer_job_id));

create policy "Firm managers edit firm-made generated RAMS"
  on public.rams_generation_jobs for update to authenticated
  using (employer_id in (select public.my_employer_scope())
         and public.safety_is_firm_creator(employer_id, user_id))
  with check (employer_id in (select public.my_employer_scope())
              and public.safety_is_firm_creator(employer_id, user_id));

-- rams_partials: follow the parent generation job (under the caller's RLS).
create policy "Read rams partials of visible firm generated RAMS"
  on public.rams_partials for select to authenticated
  using (exists (
    select 1 from public.rams_generation_jobs g
     where g.id = rams_partials.job_id and g.employer_id is not null
  ));
