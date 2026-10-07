-- ELE-1990: job types listed once whatever their case ("Consumer unit" = "consumer unit").
create or replace function public.get_ai_quote_context(
  p_firm uuid,
  p_job uuid default null,
  p_job_type text default null
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_role text;
  v_job jsonb;
  v_type text;
  v_firm jsonb;
  v_history jsonb;
  v_types jsonb;
begin
  if auth.uid() is null or p_firm is null then
    raise exception 'Not signed in' using errcode = '42501';
  end if;

  v_role := public.my_employer_role(p_firm);
  -- Managers draft quotes (the same people the quotes RLS lets insert).
  if v_role is null or v_role not in ('owner', 'admin', 'office') then
    raise exception 'Only the owner and office managers can draft quotes' using errcode = '42501';
  end if;

  if p_job is not null then
    select jsonb_build_object(
             'id', j.id, 'title', j.title, 'client', j.client,
             'client_email', j.client_email, 'client_phone', j.client_phone,
             'location', j.location, 'description', j.description,
             'job_type', j.job_type, 'quoted_hours', j.quoted_hours,
             'status', j.status, 'access_notes', j.access_notes)
      into v_job
      from public.employer_jobs j
     where j.id = p_job and j.user_id = p_firm;
    if v_job is null then
      raise exception 'Job not found' using errcode = 'P0002';
    end if;
  end if;

  v_type := nullif(btrim(coalesce(p_job_type, v_job ->> 'job_type', '')), '');

  select jsonb_build_object(
           'company_name', cp.company_name,
           'hourly_rate', cp.hourly_rate,
           'vat_registered', coalesce(cp.default_vat_registered,
                                      nullif(btrim(coalesce(cp.vat_number, '')), '') is not null),
           'reverse_charge', coalesce(cp.default_reverse_charge, false),
           'cis_enabled', coalesce(cp.default_cis_enabled, false),
           'validity_days', coalesce(cp.quote_validity_days, 30),
           'deposit_percentage', cp.deposit_percentage)
    into v_firm
    from public.company_profiles cp
   where cp.user_id = p_firm
   limit 1;

  -- The firm's own last five finished jobs of this type (approved timesheet
  -- hours), scoped to THIS firm rather than every firm the caller manages.
  if v_type is not null then
    with jobs as (
      select j.id, j.title, j.quoted_hours,
             coalesce(j.completed_at, j.updated_at) as closed_at,
             (select sum(greatest(coalesce(t.total_hours, 0), 0))
                from public.employer_timesheets t
               where t.job_id = j.id and lower(coalesce(t.status, '')) = 'approved') as hours
        from public.employer_jobs j
       where j.user_id = p_firm
         and lower(j.job_type) = lower(v_type)
         and (p_job is null or j.id <> p_job)
         and not coalesce(j.is_template, false)
         and (j.completed_at is not null or lower(coalesce(j.status, '')) = 'completed')
    ),
    last5 as (
      select * from jobs where coalesce(hours, 0) > 0 order by closed_at desc limit 5
    )
    select jsonb_build_object(
             'job_type', v_type,
             'count', (select count(*) from last5),
             'avg_hours', (select round(avg(hours), 1) from last5),
             'avg_quoted_hours', (select round(avg(quoted_hours), 1) from last5 where quoted_hours is not null),
             'quoted_count', (select count(*) from last5 where quoted_hours is not null),
             'jobs', coalesce((select jsonb_agg(jsonb_build_object(
                        'title', title, 'hours', round(hours, 1), 'quoted_hours', quoted_hours)
                        order by closed_at desc) from last5), '[]'::jsonb))
      into v_history;
  end if;

  select coalesce(jsonb_agg(t.job_type order by t.n desc, t.job_type), '[]'::jsonb)
    into v_types
    from (select min(btrim(j.job_type)) as job_type, count(*) as n
            from public.employer_jobs j
           where j.user_id = p_firm and nullif(btrim(coalesce(j.job_type, '')), '') is not null
           group by lower(btrim(j.job_type))
           order by count(*) desc
           limit 30) t;

  return jsonb_build_object(
    'role', v_role,
    'money_visible', public.can_see_firm_money(p_firm),
    'firm', coalesce(v_firm, '{}'::jsonb),
    'job', v_job,
    'job_type', v_type,
    'history', v_history,
    'job_types', v_types
  );
end;
$$;

