-- Phone search for the Employer Hub (ELE-1939): one firm-scoped call behind
-- the full-screen search sheet. Sections are matched in the browser; this
-- returns people, jobs, clients, quotes and invoices for the acting firm.
--
-- Guard: p_firm in my_employer_scope() (owner, admins, office managers).
-- No money: quotes and invoices come back as number, client and state only,
-- so an office manager's search shows the same rows as the owner's.

create or replace function public.search_employer_hub(
  p_firm uuid,
  p_q text,
  p_limit integer default 5
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $function$
declare
  v_q text := btrim(coalesce(p_q, ''));
  v_like text;
  v_n integer := least(greatest(coalesce(p_limit, 5), 1), 20);
begin
  if auth.uid() is null or p_firm is null
     or p_firm not in (select public.my_employer_scope()) then
    raise exception 'Not allowed' using errcode = '42501';
  end if;
  if length(v_q) < 2 then
    return jsonb_build_object('people', '[]'::jsonb, 'jobs', '[]'::jsonb, 'clients', '[]'::jsonb,
                              'quotes', '[]'::jsonb, 'invoices', '[]'::jsonb);
  end if;
  v_like := '%' || replace(replace(replace(v_q, '\', ''), '%', ''), '_', '') || '%';

  return jsonb_build_object(
    'people', coalesce((
      select jsonb_agg(jsonb_build_object('id', e.id, 'name', e.name,
               'role', coalesce(nullif(e.team_role, ''), e.role),
               'joined', e.user_id is not null) order by lower(e.name))
        from (select * from public.employer_employees e
               where e.employer_id = p_firm
                 and lower(coalesce(e.status, 'active')) <> 'archived'
                 and (e.name ilike v_like or coalesce(e.email, '') ilike v_like
                      or coalesce(e.role, '') ilike v_like or coalesce(e.team_role, '') ilike v_like)
               order by (e.name ilike v_q || '%') desc, lower(e.name) limit v_n) e), '[]'::jsonb),

    'jobs', coalesce((
      select jsonb_agg(jsonb_build_object('id', j.id, 'title', j.title, 'client', j.client,
               'location', j.location, 'status', j.status, 'start_date', j.start_date)
             order by j.rank, j.start_date desc nulls last)
        from (select j.*, case when j.title ilike v_q || '%' then 0 else 1 end as rank
                from public.employer_jobs j
               where j.user_id = p_firm
                 and j.archived_at is null
                 and not coalesce(j.is_template, false)
                 and (j.title ilike v_like or coalesce(j.client, '') ilike v_like
                      or coalesce(j.location, '') ilike v_like)
               order by rank, j.start_date desc nulls last limit v_n) j), '[]'::jsonb),

    'clients', coalesce((
      select jsonb_agg(jsonb_build_object('id', c.id, 'name', c.name, 'company', c.company_name,
               'postcode', c.postcode) order by lower(c.name))
        from (select * from public.customers c
               where c.user_id = p_firm
                 and (c.name ilike v_like or coalesce(c.company_name, '') ilike v_like
                      or coalesce(c.email, '') ilike v_like or coalesce(c.phone, '') ilike v_like
                      or coalesce(c.postcode, '') ilike v_like or coalesce(c.address, '') ilike v_like)
               order by (c.name ilike v_q || '%') desc, lower(c.name) limit v_n) c), '[]'::jsonb),

    'quotes', coalesce((
      select jsonb_agg(jsonb_build_object('id', q.id, 'number', q.quote_number,
               'client', q.client_data ->> 'name', 'title', q.job_details ->> 'title',
               'state', coalesce(nullif(q.acceptance_status, ''), q.status))
             order by q.created_at desc)
        from (select * from public.quotes q
               where q.user_id = p_firm and q.deleted_at is null
                 and not coalesce(q.invoice_raised, false)
                 and coalesce(q.is_active_version, true)
                 and (coalesce(q.quote_number, '') ilike v_like
                      or coalesce(q.client_data ->> 'name', '') ilike v_like
                      or coalesce(q.client_data ->> 'postcode', '') ilike v_like
                      or coalesce(q.job_details ->> 'title', '') ilike v_like)
               order by q.created_at desc limit v_n) q), '[]'::jsonb),

    'invoices', coalesce((
      select jsonb_agg(jsonb_build_object('id', q.id,
               'number', coalesce(q.invoice_number, q.quote_number),
               'client', q.client_data ->> 'name', 'title', q.job_details ->> 'title',
               'state', coalesce(q.invoice_status, 'draft'), 'due', q.invoice_due_date)
             order by q.created_at desc)
        from (select * from public.quotes q
               where q.user_id = p_firm and q.deleted_at is null
                 and coalesce(q.invoice_raised, false)
                 and (coalesce(q.invoice_number, '') ilike v_like
                      or coalesce(q.quote_number, '') ilike v_like
                      or coalesce(q.client_data ->> 'name', '') ilike v_like
                      or coalesce(q.client_data ->> 'postcode', '') ilike v_like
                      or coalesce(q.job_details ->> 'title', '') ilike v_like)
               order by q.created_at desc limit v_n) q), '[]'::jsonb)
  );
end;
$function$;

comment on function public.search_employer_hub(uuid, text, integer) is
  'Employer Hub phone search (ELE-1939): people, jobs, clients, quotes, invoices for the acting firm, no money. Guard: p_firm in my_employer_scope().';

revoke all on function public.search_employer_hub(uuid, text, integer) from public, anon;
grant execute on function public.search_employer_hub(uuid, text, integer) to authenticated;
