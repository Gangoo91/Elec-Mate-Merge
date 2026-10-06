-- Retiring employer_quotes / employer_invoices (Andrew, 6 Oct: "yes").
-- Before the tables can go, every reader moves to the shared `quotes` table:
--
-- 1. quotes.employer_job_id — the firm job a quote/invoice belongs to. It had
--    no column, so a quote raised against a job in the hub lost the link and
--    job money (quoted / invoiced / paid) could never add up. Backfilled from
--    job_details->>'jobId' where that pointed at a real job.
-- 2. employer_invoices_unified(): quotes only (feeds the Overview).
-- 3. get_employer_bridged_quotes / _invoices: return the job link.
-- 4. get_job_hub_summary(): quotes/invoices from `quotes`, and scoped to the
--    firm (owner + co-admins) instead of the owner only.
-- 5. get_signature_request_by_token(): quote/invoice documents from `quotes`.

alter table public.quotes
  add column if not exists employer_job_id uuid references public.employer_jobs(id) on delete set null;
create index if not exists idx_quotes_employer_job_id on public.quotes(employer_job_id) where employer_job_id is not null;
comment on column public.quotes.employer_job_id is
  'Employer Hub job this quote/invoice belongs to (null for Electrical Hub work). Drives job money in get_job_hub_summary.';

update public.quotes q
   set employer_job_id = j.id
  from public.employer_jobs j
 where q.employer_job_id is null
   and q.job_details ? 'jobId'
   and q.job_details->>'jobId' ~* '^[0-9a-f-]{36}$'
   and j.id = (q.job_details->>'jobId')::uuid
   and j.user_id = q.user_id;

create or replace function public.employer_invoices_unified()
returns table(id uuid, employer_id uuid, invoice_number text, client text, project text, amount numeric,
              status text, due_date date, paid_date date, job_id uuid, cis_amount numeric, created_at timestamptz)
language sql
stable security definer
set search_path to 'public'
as $function$
  select q.id, q.user_id,
         coalesce(q.invoice_number, q.quote_number),
         coalesce(nullif(q.client_data->>'name',''), 'Client'),
         nullif(q.job_details->>'title',''),
         coalesce(q.total, 0),
         initcap(coalesce(q.invoice_status, 'draft')),
         q.invoice_due_date::date,
         q.invoice_paid_at::date,
         q.employer_job_id,
         0::numeric,
         coalesce(q.invoice_date, q.created_at)
  from public.quotes q
  where q.user_id in (select public.my_employer_scope())
    and q.deleted_at is null
    and coalesce(q.invoice_raised, false);
$function$;

do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.get_employer_bridged_quotes()'::regprocedure);
  if position('employer_job_id' in v_def) = 0 then
    if position('q.expiry_date, null::uuid,' in v_def) = 0 then raise exception 'bridged quotes: job slot not found'; end if;
    execute replace(v_def, 'q.expiry_date, null::uuid,', 'q.expiry_date, q.employer_job_id,');
  end if;
  v_def := pg_get_functiondef('public.get_employer_bridged_invoices()'::regprocedure);
  if position('employer_job_id' in v_def) = 0 then
    if position('q.invoice_paid_at, null::uuid,' in v_def) = 0 then raise exception 'bridged invoices: job slot not found'; end if;
    execute replace(v_def, 'q.invoice_paid_at, null::uuid,', 'q.invoice_paid_at, q.employer_job_id,');
  end if;
end $$;

create or replace function public.get_job_hub_summary(p_job_id uuid)
returns jsonb
language plpgsql
stable security definer
set search_path to 'public'
as $function$
declare
  v_job employer_jobs;
begin
  select * into v_job from employer_jobs
   where id = p_job_id and user_id in (select public.my_employer_scope());
  if v_job is null then
    return jsonb_build_object('error', 'not_found');
  end if;

  return jsonb_build_object(
    'job_value', v_job.value,
    'quote', (
      select case when count(*) = 0 then null else jsonb_build_object(
        'count', count(*),
        'value', coalesce(sum(q.total), 0),
        'status', (array_agg(initcap(coalesce(q.status, 'draft')) order by q.created_at desc))[1],
        'quote_number', (array_agg(q.quote_number order by q.created_at desc))[1],
        'id', (array_agg(q.id order by q.created_at desc))[1]
      ) end
      from quotes q
      where q.employer_job_id = p_job_id and q.deleted_at is null and not coalesce(q.invoice_raised, false)
    ),
    'quotes', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', q.id, 'quote_number', q.quote_number, 'status', initcap(coalesce(q.status, 'draft')), 'value', coalesce(q.total, 0)
      ) order by q.created_at desc)
      from quotes q
      where q.employer_job_id = p_job_id and q.deleted_at is null and not coalesce(q.invoice_raised, false)
    ), '[]'::jsonb),
    'invoiced', coalesce((
      select sum(q.total) from quotes q
       where q.employer_job_id = p_job_id and q.deleted_at is null and coalesce(q.invoice_raised, false)
         and lower(coalesce(q.invoice_status, '')) not in ('draft', 'cancelled', 'void')), 0),
    'paid', coalesce((
      select sum(q.total) from quotes q
       where q.employer_job_id = p_job_id and q.deleted_at is null and coalesce(q.invoice_raised, false)
         and q.invoice_paid_at is not null), 0),
    'invoice_count', (
      select count(*) from quotes q
       where q.employer_job_id = p_job_id and q.deleted_at is null and coalesce(q.invoice_raised, false)),
    'invoices', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', q.id, 'invoice_number', coalesce(q.invoice_number, q.quote_number),
        'status', initcap(coalesce(q.invoice_status, 'draft')),
        'amount', coalesce(q.total, 0), 'paid', q.invoice_paid_at is not null
      ) order by q.created_at desc)
      from quotes q
      where q.employer_job_id = p_job_id and q.deleted_at is null and coalesce(q.invoice_raised, false)
    ), '[]'::jsonb),
    'labour_hours', coalesce((select sum(total_hours) from employer_timesheets where job_id = p_job_id), 0),
    'labour_cost', coalesce((
      select sum(t.total_hours * coalesce(e.hourly_rate, 0))
      from employer_timesheets t
      left join employer_employees e on e.id = t.employee_id
      where t.job_id = p_job_id), 0),
    'tests_total', (select count(*) from job_tests where job_id = p_job_id),
    'tests_passed', (select count(*) from job_tests where job_id = p_job_id and result ilike 'pass%'),
    'tests_failed', (select count(*) from job_tests where job_id = p_job_id and result ilike 'fail%'),
    'issues_open', (select count(*) from job_issues where job_id = p_job_id
                    and lower(coalesce(status, '')) not in ('resolved', 'closed')),
    'issues_critical', (select count(*) from job_issues where job_id = p_job_id
                        and lower(coalesce(status, '')) not in ('resolved', 'closed')
                        and lower(coalesce(severity, '')) in ('critical', 'high')),
    'budget_total', (select budget_total from job_financials where job_id = p_job_id limit 1),
    'actual_total', (select actual_total from job_financials where job_id = p_job_id limit 1)
  );
end;
$function$;

do $$
declare
  v_def text;
  v_q_old text := 'from employer_quotes q
      where q.id = v_row.document_id and q.employer_id = v_row.user_id;';
  v_i_old text := 'from employer_invoices i
      where i.id = v_row.document_id and i.employer_id = v_row.user_id;';
begin
  v_def := pg_get_functiondef('public.get_signature_request_by_token(text)'::regprocedure);
  if position('employer_quotes' in v_def) = 0 then return; end if;
  -- Quote branch: same output keys, read from `quotes`.
  v_def := replace(v_def,
$a$select jsonb_build_object(
               'kind', 'quote',
               'number', q.quote_number,
               'client', q.client,
               'description', q.description,
               'line_items', coalesce(q.line_items, '[]'::jsonb),
               'subtotal', q.subtotal,
               'vat_rate', q.vat_rate,
               'vat_amount', q.vat_amount,
               'reverse_charge', q.reverse_charge,
               'cis_amount', q.cis_amount,
               'total', q.value,
               'valid_until', q.valid_until)$a$,
$b$select jsonb_build_object(
               'kind', 'quote',
               'number', q.quote_number,
               'client', q.client_data->>'name',
               'description', coalesce(q.job_details->>'description', q.job_details->>'title'),
               'line_items', coalesce(q.items, '[]'::jsonb),
               'subtotal', q.subtotal,
               'vat_rate', null,
               'vat_amount', q.vat_amount,
               'reverse_charge', null,
               'cis_amount', null,
               'total', q.total,
               'valid_until', q.expiry_date)$b$);
  v_def := replace(v_def, v_q_old,
    'from quotes q
      where q.id = v_row.document_id and q.user_id = v_row.user_id and not coalesce(q.invoice_raised, false);');
  v_def := replace(v_def,
$a$select jsonb_build_object(
               'kind', 'invoice',
               'number', i.invoice_number,
               'client', i.client,
               'description', i.project,
               'line_items', coalesce(i.line_items, '[]'::jsonb),
               'subtotal', i.subtotal,
               'vat_rate', i.vat_rate,
               'vat_amount', i.vat_amount,
               'reverse_charge', i.reverse_charge,
               'cis_amount', i.cis_amount,
               'total', i.amount,
               'due_date', i.due_date)$a$,
$b$select jsonb_build_object(
               'kind', 'invoice',
               'number', coalesce(i.invoice_number, i.quote_number),
               'client', i.client_data->>'name',
               'description', i.job_details->>'title',
               'line_items', coalesce(i.items, '[]'::jsonb),
               'subtotal', i.subtotal,
               'vat_rate', null,
               'vat_amount', i.vat_amount,
               'reverse_charge', null,
               'cis_amount', null,
               'total', i.total,
               'due_date', i.invoice_due_date)$b$);
  v_def := replace(v_def, v_i_old,
    'from quotes i
      where i.id = v_row.document_id and i.user_id = v_row.user_id and coalesce(i.invoice_raised, false);');
  if position('employer_quotes' in v_def) > 0 or position('employer_invoices' in v_def) > 0 then
    raise exception 'get_signature_request_by_token: rewrite incomplete';
  end if;
  execute v_def;
end $$;
