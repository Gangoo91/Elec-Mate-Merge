-- ELE-1943: the circuit designer in the Employer Hub designs for a job. The
-- design is the firm's (co-admins see it), sits on the job, and the crew on
-- that job can read it.
--
-- Additive only, built so the live designer (web HEAD and iOS build 49) cannot
-- notice:
--   * two nullable columns on circuit_design_jobs, null for every existing row;
--   * NO trigger and NO new RLS policy on circuit_design_jobs. Every existing
--     read of the table still returns exactly the caller's own rows.
--   * the firm and crew read designs only through the definer functions below,
--     each of which checks who is asking.

alter table public.circuit_design_jobs
  add column if not exists employer_id uuid,
  add column if not exists employer_job_id uuid
    references public.employer_jobs (id) on delete set null;

create index if not exists circuit_design_jobs_employer_idx
  on public.circuit_design_jobs (employer_id) where employer_id is not null;
create index if not exists circuit_design_jobs_employer_job_idx
  on public.circuit_design_jobs (employer_job_id) where employer_job_id is not null;

-- File the caller's own design with their firm, and a firm job when given.
-- p_employer_id and p_job both null: take it back to the caller's own (undo).
create or replace function public.design_file_with_firm(
  p_design uuid,
  p_employer_id uuid,
  p_job uuid default null
)
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_owner uuid;
  v_employer uuid := p_employer_id;
begin
  if v_uid is null then
    raise exception 'Not signed in' using errcode = '42501';
  end if;
  if not exists (select 1 from public.circuit_design_jobs d where d.id = p_design and d.user_id = v_uid) then
    raise exception 'Design not found' using errcode = '42501';
  end if;

  if p_job is not null then
    select j.user_id into v_owner from public.employer_jobs j where j.id = p_job;
    if v_owner is null then
      raise exception 'That firm job does not exist' using errcode = '23503';
    end if;
    if v_employer is not null and v_employer <> v_owner then
      raise exception 'That job belongs to another firm' using errcode = '42501';
    end if;
    v_employer := v_owner;
  end if;

  if v_employer is not null and not (
       v_employer in (select public.my_employer_scope())
       and public.safety_is_firm_creator(v_employer, v_uid)) then
    raise exception 'Only the firm''s owner or an admin can file a design with the firm'
      using errcode = '42501';
  end if;

  update public.circuit_design_jobs
     set employer_id = v_employer, employer_job_id = p_job
   where id = p_design and user_id = v_uid;

  return jsonb_build_object('id', p_design, 'employer_id', v_employer, 'employer_job_id', p_job);
end;
$$;

-- The firm's designs (managers), newest first; one job's when p_job is given.
create or replace function public.get_firm_designs(p_job uuid default null, p_limit integer default 30)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_owners uuid[] := array(select public.my_employer_scope());
  v_limit int := greatest(1, least(coalesce(p_limit, 30), 100));
begin
  if auth.uid() is null then
    raise exception 'Not signed in' using errcode = '42501';
  end if;
  if p_job is not null and not exists (
    select 1 from public.employer_jobs j where j.id = p_job and j.user_id = any (v_owners)
  ) then
    raise exception 'Job not found' using errcode = '42501';
  end if;

  return coalesce((
    select jsonb_agg(to_jsonb(x) order by x.created_at desc)
      from (
        select d.id,
               coalesce(nullif(d.job_inputs -> 'projectInfo' ->> 'projectName', ''), 'Design') as title,
               nullif(d.job_inputs -> 'projectInfo' ->> 'location', '') as location,
               d.status, d.created_at, d.completed_at,
               d.employer_job_id as job_id, j.title as job_title,
               coalesce(jsonb_array_length(case when jsonb_typeof(d.design_data -> 'circuits') = 'array'
                                                then d.design_data -> 'circuits' end), 0) as circuits,
               coalesce(nullif(p.full_name, ''), 'Someone at the firm') as made_by,
               d.user_id = auth.uid() as mine
          from public.circuit_design_jobs d
          left join public.employer_jobs j on j.id = d.employer_job_id
          left join public.profiles p on p.id = d.user_id
         where d.employer_id = any (v_owners)
           and d.employer_id is not null
           and (p_job is null or d.employer_job_id = p_job)
         order by d.created_at desc
         limit v_limit
      ) x
  ), '[]'::jsonb);
end;
$$;

-- The completed designs on one job, for its crew (Worker Tools) or managers.
create or replace function public.get_job_designs(p_job uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_owner uuid;
begin
  select j.user_id into v_owner from public.employer_jobs j where j.id = p_job;
  if v_owner is null or not (
       v_owner in (select public.my_employer_scope()) or public.is_assigned_to_job(p_job)) then
    raise exception 'Job not found' using errcode = '42501';
  end if;

  return coalesce((
    select jsonb_agg(to_jsonb(x) order by x.created_at desc)
      from (
        select d.id,
               coalesce(nullif(d.job_inputs -> 'projectInfo' ->> 'projectName', ''), 'Design') as title,
               d.created_at,
               coalesce(jsonb_array_length(case when jsonb_typeof(d.design_data -> 'circuits') = 'array'
                                                then d.design_data -> 'circuits' end), 0) as circuits
          from public.circuit_design_jobs d
         where d.employer_job_id = p_job
           and d.employer_id = v_owner
           and d.status = 'complete'
           and d.design_data is not null
         order by d.created_at desc
         limit 20
      ) x
  ), '[]'::jsonb);
end;
$$;

-- One design in full: its maker, the firm's managers, or the crew on its job.
create or replace function public.get_design_detail(p_design uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_row public.circuit_design_jobs%rowtype;
begin
  select * into v_row from public.circuit_design_jobs d where d.id = p_design;
  if v_row.id is null or not (
       v_row.user_id = auth.uid()
       or (v_row.employer_id is not null and v_row.employer_id in (select public.my_employer_scope()))
       or (v_row.employer_id is not null and v_row.employer_job_id is not null
           and public.is_assigned_to_job(v_row.employer_job_id))) then
    raise exception 'Design not found' using errcode = '42501';
  end if;

  return jsonb_build_object(
    'id', v_row.id,
    'status', v_row.status,
    'created_at', v_row.created_at,
    'job_id', v_row.employer_job_id,
    'job_title', (select j.title from public.employer_jobs j where j.id = v_row.employer_job_id),
    'mine', v_row.user_id = auth.uid(),
    'job_inputs', v_row.job_inputs,
    'design_data', v_row.design_data
  );
end;
$$;

revoke all on function public.design_file_with_firm(uuid, uuid, uuid) from public, anon;
revoke all on function public.get_firm_designs(uuid, integer) from public, anon;
revoke all on function public.get_job_designs(uuid) from public, anon;
revoke all on function public.get_design_detail(uuid) from public, anon;
grant execute on function public.design_file_with_firm(uuid, uuid, uuid) to authenticated;
grant execute on function public.get_firm_designs(uuid, integer) to authenticated;
grant execute on function public.get_job_designs(uuid) to authenticated;
grant execute on function public.get_design_detail(uuid) to authenticated;
