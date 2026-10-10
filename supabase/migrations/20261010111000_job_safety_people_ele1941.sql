-- ELE-1941: "Safety documents for this job" fills in the firm's real people.
--
-- One read for the Employer Hub's generator: the job (site, client, dates, site
-- contact), the firm's company name (the contractor), the supervisor and a
-- first-aider from the job's crew and their competence records, and the crew.
-- Firm managers only (the job's owner in my_employer_scope). Read-only, new
-- function, nothing existing changes.

create or replace function public.get_job_safety_people(p_job uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_owner uuid;
  v_out jsonb;
begin
  select j.user_id into v_owner from public.employer_jobs j where j.id = p_job;
  if v_owner is null or v_owner not in (select public.my_employer_scope()) then
    raise exception 'Job not found' using errcode = '42501';
  end if;

  with crew as (
    select e.id, e.name, e.phone, e.team_role, a.role_on_job, e.supervisor_employee_id
      from public.employer_job_assignments a
      join public.employer_employees e on e.id = a.employee_id
     where a.job_id = p_job
       and e.employer_id = v_owner
       and lower(coalesce(a.status, 'assigned')) not in ('removed', 'cancelled', 'ended')
       and coalesce(e.status, 'active') ilike 'active'
  ), first_aid as (
    -- In-date first aid on the crew: the firm's certification records, then
    -- the worker's Elec-ID qualifications and training.
    select c.name, c.phone, ce.name as cert, ce.expiry_date, 1 as rank
      from crew c
      join public.employer_certifications ce on ce.employee_id = c.id
     where ce.name ~* 'first[ -]?aid|\mFAW\M|\mEFAW\M'
       and (ce.expiry_date is null or ce.expiry_date >= current_date)
    union all
    select c.name, c.phone, q.qualification_name, q.expiry_date, 2
      from crew c
      join public.employer_elec_id_profiles p on p.employee_id = c.id
      join public.employer_elec_id_qualifications q on q.profile_id = p.id
     where q.qualification_name ~* 'first[ -]?aid|\mFAW\M|\mEFAW\M'
       and (q.expiry_date is null or q.expiry_date >= current_date)
    union all
    select c.name, c.phone, t.training_name, t.expiry_date, 3
      from crew c
      join public.employer_elec_id_profiles p on p.employee_id = c.id
      join public.employer_elec_id_training t on t.profile_id = p.id
     where t.training_name ~* 'first[ -]?aid|\mFAW\M|\mEFAW\M'
       and (t.expiry_date is null or t.expiry_date >= current_date)
  ), supervisor as (
    -- Named on the job first, then by team role, then a crew member's line
    -- supervisor.
    select c.name, c.phone, 'Named supervisor on this job' as why, 1 as rank
      from crew c where coalesce(c.role_on_job, '') ~* 'supervis|lead|charge|foreman|manager'
    union all
    select c.name, c.phone, 'Supervisor on the team', 2
      from crew c where coalesce(c.team_role, '') ~* 'supervis|lead|charge|foreman|manager'
    union all
    select e.name, e.phone, 'Supervises someone on the crew', 3
      from public.employer_employees e
     where e.employer_id = v_owner
       and e.id in (select c.supervisor_employee_id from crew c)
  )
  select jsonb_build_object(
    'job', (
      select jsonb_build_object(
        'id', j.id, 'title', j.title, 'client', j.client, 'location', j.location,
        'start_date', j.start_date, 'end_date', j.end_date, 'description', j.description,
        'site_contact_name', j.site_contact_name, 'site_contact_phone', j.site_contact_phone)
        from public.employer_jobs j where j.id = p_job),
    'contractor', (select nullif(trim(cp.company_name), '') from public.company_profiles cp
                    where cp.user_id = v_owner limit 1),
    'supervisor', (select jsonb_build_object('name', s.name, 'phone', s.phone, 'why', s.why)
                     from supervisor s where coalesce(s.name, '') <> ''
                    order by s.rank, s.name limit 1),
    'first_aider', (select jsonb_build_object('name', f.name, 'phone', f.phone, 'cert', f.cert,
                                              'expires', f.expiry_date)
                      from first_aid f where coalesce(f.name, '') <> ''
                     order by f.rank, f.expiry_date desc nulls last limit 1),
    'crew', coalesce((select jsonb_agg(jsonb_build_object(
                         'name', c.name, 'role', coalesce(nullif(c.role_on_job, ''), c.team_role))
                       order by c.name) from crew c), '[]'::jsonb),
    'pack', (select jsonb_build_object('id', p.id, 'title', p.title, 'scope', p.scope,
                                       'hazards', p.hazards)
               from public.employer_job_packs p
              where p.job_id = p_job and p.employer_id = v_owner
              order by p.updated_at desc nulls last, p.created_at desc limit 1)
  ) into v_out;

  return v_out;
end;
$$;

revoke all on function public.get_job_safety_people(uuid) from public, anon;
grant execute on function public.get_job_safety_people(uuid) to authenticated;
