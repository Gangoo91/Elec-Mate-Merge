-- Site Safety in both hubs, phase 2 (follow-up): a child row written by the
-- service role (an edge function) follows its parent's firm, as a child written
-- by a signed-in user already does. Same function as 20261008191000 otherwise.

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
    -- A child filed by an edge function follows its parent, as below.
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
      elsif tg_table_name = 'method_statements' and new.rams_document_id is not null then
        select d.employer_id, d.employer_job_id into new.employer_id, new.employer_job_id
          from public.rams_documents d where d.id = new.rams_document_id;
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
