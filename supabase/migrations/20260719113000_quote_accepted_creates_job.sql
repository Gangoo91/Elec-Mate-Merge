-- S2: quote accepted → job auto-created (Jobs redesign slice 2) — applied to prod 2026-07-19 via MCP

-- Shared helper: create a spark_project prefilled from a quote row
create or replace function public.create_project_from_quote(q public.quotes)
returns uuid
language plpgsql security definer set search_path = ''
as $$
declare
  v_id uuid;
  v_start date;
begin
  if (q.job_details->>'workStartDate') ~ '^\d{4}-\d{2}-\d{2}' then
    v_start := (q.job_details->>'workStartDate')::date;
  end if;

  insert into public.spark_projects
    (user_id, title, description, customer_id, location, estimated_value, start_date, status, priority)
  values (
    q.user_id,
    coalesce(nullif(trim(q.job_details->>'title'), ''),
             'Job — ' || coalesce(nullif(trim(q.client_data->>'name'), ''), 'customer')),
    nullif(trim(q.job_details->>'description'), ''),
    q.customer_id,
    coalesce(nullif(trim(q.job_details->>'location'), ''),
             nullif(trim(q.client_data->>'address'), '')),
    q.total,
    v_start,
    'open',
    'normal'
  )
  returning id into v_id;
  return v_id;
end $$;

-- Trigger: acceptance (incl. pending-deposit) creates the job and pulls the quote's chain in.
-- Job-creation failures must NEVER block a client accepting a quote — swallow and warn.
create or replace function public.handle_quote_acceptance()
returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  if new.acceptance_status in ('accepted', 'accepted_pending_deposit')
     and (old.acceptance_status is null
          or old.acceptance_status not in ('accepted', 'accepted_pending_deposit'))
     and new.project_id is null then
    begin
      new.project_id := public.create_project_from_quote(new);
      update public.invoices set project_id = new.project_id
        where quote_id = new.id and project_id is null;
      update public.site_visits set project_id = new.project_id
        where quote_id = new.id and project_id is null;
      update public.quotes set project_id = new.project_id
        where parent_quote_id = new.id and project_id is null;
    exception when others then
      raise warning 'quote acceptance job auto-create failed for quote %: %', new.id, sqlerrm;
      new.project_id := null;
    end;
  end if;
  return new;
end $$;

drop trigger if exists trg_quote_acceptance_creates_job on public.quotes;
create trigger trg_quote_acceptance_creates_job
  before update of acceptance_status on public.quotes
  for each row execute function public.handle_quote_acceptance();

-- RPC: manual "Convert to job" from any quote (FE button)
create or replace function public.convert_quote_to_project(p_quote_id uuid)
returns uuid
language plpgsql security definer set search_path = ''
as $$
declare
  q public.quotes;
  v_id uuid;
begin
  select * into q from public.quotes
    where id = p_quote_id and user_id = auth.uid();
  if not found then
    raise exception 'Quote not found';
  end if;
  if q.project_id is not null then
    return q.project_id;
  end if;
  v_id := public.create_project_from_quote(q);
  -- Setting project_id here fires the S1 cascade, pulling invoices/visits/variations in
  update public.quotes set project_id = v_id where id = p_quote_id;
  return v_id;
end $$;

revoke execute on function public.convert_quote_to_project(uuid) from public, anon;
grant execute on function public.convert_quote_to_project(uuid) to authenticated;
